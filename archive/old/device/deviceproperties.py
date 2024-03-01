from lock import getLockState

properties = {
    "name": "Lock #1",
    "description": "A lock description",
    "actions": ["close", "open"],
    "state": getLockState()
}