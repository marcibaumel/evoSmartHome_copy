import socketio
import lock
import deviceproperties
from time import sleep

sio = socketio.Client()

STATE_REFRESH_TIME = 3

objid = open('id.txt').readline()
print(objid)

def sendState():
    if sio.connected:
        state = lock.getLockState()
        sio.emit('state', state)      # send message
        print(f"sent state: {state}")

@sio.event
def connect():
    print('connection established')
    sio.emit('id', objid)

@sio.event
def request_properties():
    print('sending properties!')
    sio.emit('sentdeviceproperties', deviceproperties.properties)

@sio.event
def action(data):
    print(f"action: {data}")
    if(data == "open"):
        lock.setLockState("open")
    if(data == "close"):
        lock.setLockState("close")
    sendState()

@sio.event
def disconnect():
    print('disconnected from server')

sio.connect('http://localhost:8000', wait_timeout = 10)
while True: 
    sendState()
    sio.sleep(STATE_REFRESH_TIME)
sio.wait()