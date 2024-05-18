import { Request, Response } from 'express';
import { User } from '../../models/user.model';
import { uploadOnCloudinary } from '../../utils/cloudinary';
import { createResponse } from '../../utils/response';
import createHttpError from 'http-errors';

interface Idata{
  username:string,
  email:string,
  password:string,
  profilePicture?:string

}


const register = async (req: Request, res: Response) => {

  // validation

  const {username,email,password} = req.body;

  // all fields required
  if(!username || !email || !password){
    throw createHttpError(400,"Incomplete Fields")
  }

  // username should be unique

  const isUniqueUsername = await User.aggregate([
    {
      $match:{
        username:username
      }
    }
  ])

  console.log('there are the usernames',isUniqueUsername);
  

  // email should be unique

  const isUniqueEmail = await User.aggregate([
    {
      $match:{
        email:email
      }
    }
  ])

  if(isUniqueUsername.length>0){
    throw createHttpError(406,"Username should be unique!")
  }

  if(isUniqueEmail.length>0){
    throw createHttpError(406,"Email should be unique!")
  }


  const localFilePathProfilePicture = req.file?.path;


  let profilePicture;
  if(localFilePathProfilePicture){
    profilePicture = await uploadOnCloudinary(localFilePathProfilePicture);
  }

  if(!profilePicture){
    throw createHttpError(406,"Failed to Upload Profile Picture")
  }
  

  const user = new User({
    username:username,
    email:email,
    password:password,
    profilePicture:profilePicture
  })

  user.save();


  res.send(createResponse({},"registration successfull"))

};

export { register };
