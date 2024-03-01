from fastapi import HTTPException
from models.add_device_model import Add_device
from config.db import db_devices, db_tasmota
from bson import ObjectId

async def register_device(device: Add_device):
    """ if(db_devices.find_one({"tasmota_id": device.id}, limit = 1) != None):
        return {"result": False, "message": "Device with that ID already exists"} """
    newdevice = {
        "tasmota_id": device.id,
        "device_type": device.type,
        "name": device.name,
        "change_date": None,
        "own_properties": {},
        "connected": False
    }
    mongoid = db_devices.insert_one(newdevice).inserted_id
    
    if(device.type == "lamp"): newtasmota = genLampTasmota(device.properties, str(mongoid))
    elif(device.type == "rgbLamp"): newtasmota = genRgbLampTasmota(device.properties, str(mongoid))
    elif(device.type == "thermostat"): newtasmota = genThermostatTasmota(device.properties, str(mongoid))
    else:
        raise HTTPException(status_code=401, detail='Invalid device type')

    search_tasmota_device = db_tasmota.find_one({"tasmota_id": device.id}, limit = 1)
    if(search_tasmota_device == None):
        db_tasmota.insert_one(genNewTasmota(device.id)).inserted_id
    
    for mqtt in newtasmota[0]:
        db_tasmota.update_one({'tasmota_id': device.id}, {'$push': {'mqtt': mqtt}})
    if(newtasmota[1]):
        db_tasmota.update_one({'tasmota_id': device.id}, {'$set': {'valid_requests': newtasmota[1]}})
    return {"result": True}

def genLampTasmota(properties, mongoid):
    mqtt = [
        {
        "prefix": "stat",
        "topic": "RESULT",
        "payload": properties['state'],
        "fieldname": "state",
        "id": mongoid
        }
    ]
    
    valid_requests = {
        mongoid: {
            "state": properties['state']
        }
    }
    return mqtt, valid_requests

def genRgbLampTasmota(properties, mongoid):
    mqtt = [
        {
            "prefix": "stat",
            "topic": "RESULT",
            "payload": properties['state'],
            "fieldname": "state",
            "id": mongoid
        },
        {
            "prefix": "stat",
            "topic": "RESULT",
            "payload": properties['color'],
            "fieldname": "color",
            "id": mongoid
        }
    ]
    valid_requests = {
        mongoid: {
            "state": properties['state'],
            "color": properties['color']
        },
    }
    return mqtt, valid_requests

def genThermostatTasmota(properties, mongoid):
    mqtt = [
        {
            "prefix": "tele",
            "topic": "SENSOR",
            "payload": [
                "ATCd0d167",
                "Temperature"
            ],
            "fieldname": "temperature",
            "id": mongoid
        },
        {
            "prefix": "tele",
            "topic": "SENSOR",
            "payload": [
                "ATCd0d167",
                "Humidity"
            ],
            "fieldname": "humidity",
            "id": mongoid
        },
        {
            "prefix": "tele",
            "topic": "SENSOR",
            "payload": [
                "ATCd0d167",
                "Battery"
            ],
            "fieldname": "battery",
            "id": mongoid
        }
    ]

    valid_requests = None
    return mqtt, valid_requests

def genNewTasmota(id):
    newtasmota = {
    "tasmota_id": id,
        "mqtt": [],
        "valid_requests": {}
    }
    return newtasmota