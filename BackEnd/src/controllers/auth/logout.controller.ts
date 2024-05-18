import { Response,Request } from "express"
import { User } from "../../models/user.model"
import { createResponse } from "../../utils/response";

const logout = async (req:Request,res:Response)=>{

    console.log("from logout",req.user);
    

    await User.findOneAndUpdate({_id:req.user.id},{refreshToken:""});

    const options = {
        httpOnly:true,
        secure:true
    }
    res
    .status(200)
    .clearCookie("accesstoken",options)
    .clearCookie("refreshtoken",options)
    .send(createResponse({},"user logged out...")) 

}

export {logout};