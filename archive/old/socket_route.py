import socketio
from config.db import mongodevices
from bson import ObjectId

sio = socketio.AsyncServer(async_mode='asgi')

connected_devices = []

mongodevices.update_many( 
    {'connected': False},
    {"$set": {'connected': False}}
)

def request_properties():
    sio.emit('request_properties')

async def sendinstruction(id, action):
    device = [device for device in connected_devices if device['_id'] == id]
    if(device):
        print(f"sending instruction: {action} to {device[0]['sid']}")
        await sio.emit('action', action, room=device[0]['sid'])
        return True
    return False

@sio.event
async def connect(sid, environ):
    print('connect ', sid)

@sio.event
async def id(sid, data):
    
    connected_devices.append({
        'sid': sid,
        '_id': data
    })

    mongodevices.find_one_and_update(
            {"_id": ObjectId(data)}, 
            {"$set": {'connected': True} }
        )
    
    print(f'authenticated: {sid} as {data}')

@sio.event
async def state(sid, id):
    print('state:', id)
    device = [device for device in connected_devices if device['sid'] == sid]
    if(device):
        mongodevices.find_one_and_update(
            {"_id": ObjectId(device[0]['_id'])}, 
            {"$set": {'state': id} }
        )

@sio.event
async def sentdeviceproperties(sid, data):
    print(data)

@sio.event
async def disconnect(sid):
    deviceindex = [i for i in range(len(connected_devices)) if connected_devices[i]['sid'] == sid][0]

    mongodevices.find_one_and_update(
            {"_id": ObjectId(connected_devices[deviceindex]['_id'])}, 
            {"$set": {'connected': False} }
        )
    
    connected_devices.pop(deviceindex)

    print('disconnect ', sid)