import { Response, Request, NextFunction } from 'express';
import createHttpError from 'http-errors';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { User } from '../models/user.model';
import { createResponse } from '../utils/response';
import asyncHandler from 'express-async-handler';
import { generateAccessAndRefreshToken } from '../controllers/auth/login.controller';


declare global {
    namespace Express {
      interface Request {
        user: {
          username: string;
          id: string;
          email: string;
        };
      }
    }
  }


const auth = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const accessToken = req.cookies.accesstoken;
    const refreshToken = req.cookies.refreshtoken;

    console.log('this is accesstoken and refreshtoken',accessToken," ",refreshToken);
    
    if (!accessToken) {
      res.status(420).send(createHttpError(420, 'Unauthorize'));
    }

    if (!refreshToken) {
      res.status(420).send(createHttpError(420, 'Unauthorize'));
    }


    let decode;
    try {
      
        decode = jwt.verify(
        accessToken,
        process.env.ACCESS_SECRET as jwt.Secret
      )as jwt.JwtPayload;
      
    } catch (error) {

      const refreshDecode = jwt.verify(refreshToken,process.env.REFRESH_SECRET as jwt.Secret) as jwt.JwtPayload
      const user = await User.findById(refreshDecode._id);
      if(!user){
        res.status(420).send(createResponse({},'Unauthorize'));
      }  

      if(user.refreshToken !== refreshToken){
        res.status(420).send(createResponse({},"Unauthorize"));
      }

      const tokens = await generateAccessAndRefreshToken(user._id);
      res.cookie("accesstoken",tokens.accessToken);
      res.cookie("refreshtoken",tokens.refreshToken);

      req.user = {
        username:user.username,
        id:user._id,
        email:user.email
      }

      next();
      
    }

    const user = await User.findById(decode?._id).select("-password -refreshToken");

    
    if (!user) {
      res
        .status(420)
        .send(createResponse({}, 'Unauthorize, access token expired!'));
    }

    req.user = {
        username:decode?.username,
        id:decode?._id,
        email:decode?.email
    }

    next();
  }
);

export {auth};
