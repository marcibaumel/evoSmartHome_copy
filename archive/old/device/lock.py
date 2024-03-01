state = "open"

def setLockState(newstate):
    global state
    state = newstate
    print(state)

def getLockState():
    global state
    return state