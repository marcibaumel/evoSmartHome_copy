from config.db import db_devices
from bson import ObjectId

too_humid = False

async def checkthermo(id, sendaction):
    global too_humid
    device = db_devices.find_one({"_id": ObjectId(id)})
    if(device["device_type"] != "thermostat"):
        return
    if device["own_properties"]["humidity"] > 70:
        if not too_humid:
            print("High humidity!")
            await sendaction("655a0a49d7ffa77e98ddda31", "state", "on")
            await sendaction("655a0a49d7ffa77e98ddda31", "color", "ff0000")
        too_humid = True
    else:
        too_humid = False