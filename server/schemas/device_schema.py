def device_serializer(device) -> dict:
    return {
        'id':str(device["_id"]),
        'device_type':device["device_type"],
        'tasmota_id':device["tasmota_id"],
        'name':device["name"],
        'connected':device["connected"],
        'change_date':device["change_date"],
        'own_properties':device["own_properties"]
    }

def devices_serializer(devices) -> list:
    return [device_serializer(device) for device in devices]