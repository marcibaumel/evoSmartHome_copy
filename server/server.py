from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware
from routes.auth_route import auth_api_router
from routes.device_route import device_api_router
#from fastmqtt import mqtt
#from fastapi_mqtt import FastMQTT, MQTTConfig

app = FastAPI()
app.include_router(auth_api_router)
app.include_router(device_api_router)

origins = [
    "http://localhost:3000",
    "localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)   

#mqtt.init_app(app)
