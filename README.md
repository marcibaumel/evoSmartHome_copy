# evoSmartHome

see example mongodb structure in mongodbstructuredescription.jsonc in docs
or the files in docs/mongodbexport

## Device Properties
- lamp properties: 
    - status: boolean
- rgb properties:
    - status: boolean
    - color: string (hex value)
- termostat properties:
    - temperature: number
    - humidity: number
    - battery: number
  
## Requests for devices
- lamp requests:
    - state: on / off
- rgb requests:
    - state: on / off
    - color: hex value


## stack

|  App              | Tech           |
| --------          | -------        |
|   Backend         |   FastApi      |
|   Frontend        |   React        |
|   DB              |   Mongo        |
