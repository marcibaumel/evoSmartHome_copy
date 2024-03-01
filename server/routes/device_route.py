from fastapi import APIRouter, HTTPException
from config.db import db_devices
from models.device_model import Device
from models.add_device_model import Add_device
from schemas.device_schema import devices_serializer
from bson import ObjectId
from fastmqtt import sendaction, refreshdevice
from services.add_device_service import register_device

device_api_router = APIRouter()

@device_api_router.get("/devices")
async def get_devices():
    devices = devices_serializer(db_devices.find())
    return {
        "status": "ok",
        "data": devices
    }

@device_api_router.get("/devices/{id}")
async def get_one_device(id: str):
    device = db_devices.find_one({"id": id})
    print(devices_serializer(db_devices.find()));
    for device in devices_serializer(db_devices.find()):
        if device["id"] == id:
            return device
    raise HTTPException(status_code=404, detail="Device not found")
    '''
    return devices_serializer(db_devices.find_one({"_id": ObjectId(id)}))
    print(db_devices.find_one({"_id": id}));
    if device:
        return device
    else:
        raise HTTPException(status_code=404, detail="Device not found")
    '''

@device_api_router.get("/{id}/update/{propertie}")
async def get_one_device(id, propertie):
    await refreshdevice(id, propertie)
    return devices_serializer(db_devices.find_one({"_id": ObjectId(id)}))
    return {"status": "ok"}

@device_api_router.post("/")
async def create_device(device: Device):
    db_devices.insert_one(dict(device))
    devices = devices_serializer(db_devices.find())
    return {
        "status": "ok",
        "data": devices
    }

@device_api_router.put("/{id}")
async def update_device(id, device: Device):
    db_devices.find_one_and_update({"_id": ObjectId(id)}, {"$set": dict(device)})
    return devices_serializer(db_devices.find_one({"_id": ObjectId(id)}))

@device_api_router.delete("/{id}")
async def update_device(id):
    return devices_serializer(db_devices.find_one_and_delete({"_id": ObjectId(id)}))


@device_api_router.post("/{id}/set/{propertie}/{value}")
async def send_instruction(id, propertie, value):
    return await sendaction(id, propertie, value)

@device_api_router.post("/add-device")
async def add_device(add_device: Add_device):
    return await register_device(add_device)
