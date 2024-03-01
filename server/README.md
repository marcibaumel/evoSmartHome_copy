# Instructions
install packages:
pip install -r requirements.txt

Run and debug:
uvicorn server:app --reload 

# api
smart.evodevopshub.com/devices
- send a GET http request to smart.evodevopshub.com/api/devices without parameters

smart.evodevopshub.com/devices/{deviceid}
- send a GET http request to smart.evodevopshub.com/api/devices/{deviceid} with id (string) parameter

# db
- devices
    - name
    - description
    - action
    - status

- logs
    - deviceid
    - action
    - time