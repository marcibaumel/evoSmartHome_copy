from pydantic import BaseModel 

class Device(BaseModel):
    device_type: str
    tasmota_id: str
    name: str
    connected: str
    #change_date: int
    #own_properties: dict