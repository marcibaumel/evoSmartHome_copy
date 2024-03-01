from machine import Pin

led = Pin(0, Pin.OUT)

state = "close"

def getLockState():
    global state
    return state

def setLockState(newstate):
    global state
    state = newstate
    print("updated state: "+state)
    if(state == "open"):
        led.value(1)
    elif(state == "close"):
        led.value(0)

setLockState("close")