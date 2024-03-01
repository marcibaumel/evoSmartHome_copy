# boot.py -- run on boot-up
import network
from config import SSID, PASSWD
from lock import setLockState

setLockState("close")

def connect():
    sta_if = network.WLAN(network.STA_IF)
    if not sta_if.isconnected():
        print("Connecting to WiFi network: " + SSID)
        sta_if.active(True)
        sta_if.connect(SSID, PASSWD)
        while not sta_if.isconnected():
            pass # wait till connection
    print('WiFi connection successful\nnetwork config:', sta_if.ifconfig())
    
connect()