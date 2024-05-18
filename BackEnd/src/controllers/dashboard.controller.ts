import { Response,Request } from "express";
import { createResponse } from "../utils/response";
const dashboard = (req:Request,res:Response)=>{

    console.log('welcome to dashboard');
    res.send(createResponse({},"Welcome to Dashboard"));

}

export {dashboard};