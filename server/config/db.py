import pymongo
from os import environ

try:
    # Establish a connection to MongoDB
    mongo = pymongo.MongoClient("mongodb://localhost:27017/")

    # Create or access the "smart" database
    smart_db = mongo["evosmarthome"]

    # Access or create the "devices", "users" collection within the "smart" database
    db_devices = smart_db["devices"]
    db_tasmota = smart_db["tasmota"]
    db_users = smart_db["users"]

    '''
    # Insert a dummy document into the collection
    dummy_user = { 
        "id": "65ca14cf078ce06477b81432",
        "name": "Marci",
        "email": "email@email.com",
        "password": "password"
    }
    
    dummy_device = {
        "id": "65ca12b7078ce06477b81430",
        "tasmota_id": "ffssf",
        "name": "sfsf",
        "connected": "sffs",
        "change_date": "sfsf",
        "own_properties": "sffs"
    }
    db_devices.insert_one(dummy_device)
    db_users.insert_one(dummy_user)
    '''

    print("Database and collection created successfully.")

except Exception as e:
    print("An error occurred:", e)
    
