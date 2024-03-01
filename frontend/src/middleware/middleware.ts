import { NextRequest } from "next/server"
import updateSession from "../services/UpdateSession";


const middleware = async (request : NextRequest) =>  {
    return await updateSession(request);
}