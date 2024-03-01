from umqtt.simple import MQTTClient
from time import sleep
from machine import reset

from lock import getLockState, setLockState
from config import BROKER_ADDR, STATE_REFRESH_TIME

objid = open('id.txt').readline()
print("id: " + objid)

mqttc = MQTTClient(objid, BROKER_ADDR, keepalive=60)

def updatestate(topic, msg):
    setLockState(msg.decode())
    mqttc.publish('state/'+objid, getLockState() )

def connect_and_subscribe():
    mqttc.connect()
    mqttc.set_callback(updatestate)
    mqttc.subscribe('action/'+objid)
    print('Connected to MQTT broker: ' + BROKER_ADDR)

def restart_and_reconnect():
  print('Failed to connect to MQTT broker. Reseting...')
  sleep(10)
  reset()

try:
  client = connect_and_subscribe()
except OSError:
  restart_and_reconnect()

while True:
    try:
        mqttc.check_msg()
        mqttc.publish('state/'+objid, getLockState() )
        print('sent state ' + getLockState())
        sleep(STATE_REFRESH_TIME)
    except OSError:
        restart_and_reconnect()