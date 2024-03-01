from fastapi_mqtt import FastMQTT, MQTTConfig
from config.db import db_devices, db_tasmota
from bson import ObjectId
from time import time
from asyncio import sleep, create_task, CancelledError
from json import loads
from os import environ
from checkthermo import checkthermo

KEEPALIVE = 5
MQTTHOST = environ.get("MQTT_URL", "localhost")
print(MQTTHOST)
mqtt_config = MQTTConfig(host=MQTTHOST, keepalive=60)
mqtt = FastMQTT(
    config=mqtt_config
)

#Sets connected propertie to false in mongo because the program is just starting up
db_devices.update_many( 
    {'connected': True},
    {"$set": {'connected': False}}
)


async def sendaction(id, property, value):
    device = db_devices.find_one({"_id": ObjectId(id)})
    devid = device["tasmota_id"]
    valid_requests = db_tasmota.find_one({"tasmota_id": devid})["valid_requests"]
    
    if(not device["connected"]):
        return {"result": False,"message":"Not connected" }
    if(not id in valid_requests):
        return {"result": False,"message":"Device doesn't have settable properties" }
    if(not property in valid_requests[id]):
        return {"result": False,"message":"That property isn't settable" }

    command = valid_requests[id][property]
    mqtt.publish(f"cmnd/{devid}/{command}", value) #publishing mqtt topic
    print(f"sent action: {property}:{value} to {id} with command {command}")
    return {"result": True,"message":"Published" }

async def refreshdevice(id, property):
    mqtt.publish(f"cmnd/{id}/{property}")

@mqtt.on_connect()
def connect(client, flags, rc, properties):
    #mqtt.client.subscribe("stat/#") #subscribing mqtt topic
    print("Connected: ", client, flags, rc, properties)

@mqtt.subscribe("tele/#")
async def updateconnectionstate(client, topic, payload, qos, properties):
    #print("tele: ", topic, payload.decode(), qos, properties)
    topics = topic.split('/')
    devid = topics[1]
    
    if(db_devices.find_one({"tasmota_id": devid}, limit = 1) == None):
        return
    
    devtype = db_devices.find_one({"tasmota_id": devid}, limit = 1)["device_type"]

    if(topics[2] == "LWT"):
        print(topics[1], payload.decode())
        if(payload.decode() == "Online"):
            db_devices.update_many(
                {"tasmota_id": devid},
                {"$set": {'connected': True}}
            )
        elif(payload.decode() == "Offline"):
            db_devices.update_many(
                {"tasmota_id": devid}, 
                {"$set": {'connected': False}}
            )

    """ if(devtype == "thermo" and topic[2] == "SENSOR"):
        data = loads(payload.decode())
        db_devices.find_one_and_update(
            {"tasmota_id": devid, "device_type": "termostat"}, 
            {"$set": {'own_properties': {
                "Temperature": data["Temperature"],
                "Humidity": data["Humidity"],
                "Battery": data["Battery"]
                }, 'connected': True}}
        )
        print(data) """

@mqtt.subscribe("#")
async def updateproperty(client, topic, payload, qos, properties):
    #print("state: ", topic, payload.decode(), qos, properties)
    topics = topic.split('/')
    devid = topics[1]
    
    if(db_tasmota.find_one({"tasmota_id": devid}, limit = 1) == None):
        return

    mqttidentifications = db_tasmota.find_one({"tasmota_id": devid}, limit = 1)["mqtt"]

    for id in mqttidentifications:    
        if(topics[0] != id["prefix"] or topics[2] != id["topic"]):
            continue
        
        fieldname = id['fieldname']
        payloadkey = id['payload']
        await checkthermo(id["id"], sendaction)
        if(payloadkey == None):
            db_devices.find_one_and_update(
                {"_id": ObjectId(id["id"])}, 
                {"$set": {f'own_properties.{fieldname}': payload.decode(), 'connected': True}}
            )
            print(topics, payload.decode())
            continue

        data = loads(payload.decode())
        if(type(payloadkey) == list and len(payloadkey) > 1 and payloadkey[0] in data and payloadkey[1] in data[payloadkey[0]]):
            db_devices.find_one_and_update(
                {"_id": ObjectId(id["id"])}, 
                {"$set": {f'own_properties.{fieldname}': data[payloadkey[0]][payloadkey[1]], 'connected': True}}
            )
            continue

        if(payloadkey in data):
            db_devices.find_one_and_update(
                {"_id": ObjectId(id["id"])}, 
                {"$set": {f'own_properties.{fieldname}': data[payloadkey], 'connected': True}}
            )
            print(topics, payload.decode())
            continue


mqtt.on_disconnect()
def disconnect(client, packet, exc=None):
    print("Disconnected")

@mqtt.on_subscribe()
def subscribe(client, mid, qos, properties):
    #print("subscribed", client, mid, qos, properties)
    return

if(__name__ == "__main__"):
    mqtt.init_app()