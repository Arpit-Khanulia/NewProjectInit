import { Request, Response } from 'express';
import createHttpError from 'http-errors';
import { createResponse } from '../../utils/response';
import { User } from '../../models/user.model';



const generateAccessAndRefreshToken = async (userid:string)=>{

  try{
    const user = await User.findById(userid);
    const accessToken = await user.generateAccessToken()
    const refreshToken  = await user.generateRefreshToken()
  
    user.refreshToken = refreshToken;
    await user.save();
    return {accessToken,refreshToken};

  }catch(err){
    throw createHttpError(500,"token generation failed");
  }


}

const login = async(req: Request, res: Response) => {
  
  const {email,username,password} = req.body;

  if(!email || !username|| !password){
    throw createHttpError(400,"Incomplete Fields"); 
  }

  // check if user exists
  const user = await User.aggregate([
    {
      $match:{
        username:username
      }
    }
  ])

  // const  user = await User.findOne({username})
  
  console.log('this is user',user);
  
  if(!user){
    res.status(400).send(createResponse({},"user do not exists!"));
  }
  
  const newobj = new User(user[0]);
  
  // check password
  const isValidPassword = await newobj.isCorrectPassword(password);
  console.log('isvalidPassword => ',isValidPassword);
  
  if(!isValidPassword){
    res.status(400).send(createResponse({},"Incorect Password"));
  }

  const {accessToken,refreshToken} = await generateAccessAndRefreshToken(newobj._id);

  console.log('access and refresh token', accessToken,refreshToken);
  
  const data = {
    username:username,
    email:email,
    id:newobj._id,
    profilePicture:newobj.profilePicture
  }

  const options = {
    httpOnly:true,
    secure:true
  } 

  
  // login success
  res
  .status(200)
  .cookie("accesstoken",accessToken)
  .cookie("refreshtoken",refreshToken)
  .send(createResponse(data,"User Logged In.."));

};

export { login,generateAccessAndRefreshToken };
