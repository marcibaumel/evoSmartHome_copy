from fastapi import APIRouter, HTTPException
from services.auth_service import AuthHandler
from models.user_model import LoginDetails, RegisterDetails
from schemas.user_schema import users_serializer
from bcrypt import gensalt, hashpw, checkpw
from config.db import db_users

auth_api_router = APIRouter()
auth_handler = AuthHandler()

@auth_api_router.get('/auth/status')
def getAuthStatus():
    return{'status': 'working'}

@auth_api_router.get('/auth/users')
async def get_users():
    users = users_serializer(db_users.find());
    return{
        "status": "ok",
        "data": users
    }

@auth_api_router.post('/auth/login')
def login(auth_details : LoginDetails):
    user = db_users.find_one({"email": auth_details.email})
    print(user)
    passbytes = auth_details.password.encode('utf-8')
    if user == None:
        print(f"No user with email: {auth_details.email}")
        raise HTTPException(status_code=401, detail='Invalid email and/or password')
    elif not checkpw(passbytes, user['password']):
        print(f"Invalid password for user: {user['email']}")
        raise HTTPException(status_code=401, detail='Invalid email and/or password')
    else:
        token = auth_handler.encode_token(user['email'])
        print(f"user logged in: {user['email']}")
        return {'token': token}

@auth_api_router.post('/auth/register')
async def registration(auth_details : RegisterDetails):
    if(len(auth_details.password) < 8):
        raise HTTPException(status_code=401, detail='Password should be longer than 8 characters')
    bytes = auth_details.password.encode('utf-8')
    if db_users.find_one({"email": auth_details.email}):
        raise HTTPException(status_code=401, detail='email already registered')
    user = {
        "name": auth_details.name,
        "email": auth_details.email,
        "password": hashpw(bytes, gensalt()) 
    }
    db_users.insert_one(dict(user))
    return {'status': 'done'}