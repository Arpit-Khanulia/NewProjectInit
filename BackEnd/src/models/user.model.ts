import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePicture:{
      type:String
    },
    refreshToken:{
      type:String
    }
  },
  { timestamps: true }
);


// hash password before save
userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// compare password
userSchema.methods.isCorrectPassword =  async function(password:string){
  return await bcrypt.compare(password,this.password);
}


// generate access token

userSchema.methods.generateAccessToken = function(){
  const accessToken = jwt.sign({_id:this.id,username:this.username,email:this.email},process.env.ACCESS_SECRET||"ACCESS_SECRET",{expiresIn:process.env.ACCESS_TOKEN_EXPIRY})
  return accessToken;
}

// generate refresh token

userSchema.methods.generateRefreshToken = function(){
  const refreshToken = jwt.sign({_id:this.id},process.env.REFRESH_SECRET||"REFRESH_SECRET",{expiresIn:process.env.REFRESH_TOKEN_EXPIRY})
  return refreshToken;
}





const User = mongoose.model('User', userSchema);
export {User}; 
