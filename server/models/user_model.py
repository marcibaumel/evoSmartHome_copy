from pydantic import BaseModel

class LoginDetails(BaseModel):
    email: str
    password: str

class RegisterDetails(BaseModel):
    name: str
    email: str
    password: str