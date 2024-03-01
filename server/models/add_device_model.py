from pydantic import BaseModel 

class Add_device(BaseModel):
    name: str
    type: str
    id: str
    properties: dict