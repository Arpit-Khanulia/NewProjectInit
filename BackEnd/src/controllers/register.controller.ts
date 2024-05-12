import { Request,Response } from "express";

const register = (req:Request,res:Response)=>{
    console.log('this is register page');
    res.send({message:"this is register"});
}

export {register};