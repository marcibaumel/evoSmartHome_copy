start cmd /C "title Mosquitto & "C:\Program Files\mosquitto\mosquitto.exe" -c .\mosquitto_lan.conf -v & pause"
start cmd /C "title uvicorn & cd .\server & uvicorn server:app & pause"
start cmd /C "title Node & cd .\lock-log-app & npm run test:e2e:run & pause"