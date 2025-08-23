import AppError from "../../errorHelpers/AppError"
import { IUser } from "../user/user.interface"
import { User } from "../user/user.model"
import  httpStatus  from 'http-status-codes';
import bcryptjs from "bcryptjs"
import { createAccessTokenWithRefreshToken, createUserToken } from "../../utils/userTokens";
import { JwtPayload } from "jsonwebtoken";
import { envVars } from "../../config/env";


const credentialLogin = async(payload: Partial<IUser>)=>{
  const {email,password} = payload
  const isExist = await User.findOne({email})
  if(!isExist){
    throw new AppError(httpStatus.BAD_REQUEST,"user dose not exits")

  }

  const isPasswordMatch = await bcryptjs.compare(password as string,isExist.password as string)
  
    if(!isPasswordMatch){
          throw new AppError(httpStatus.BAD_REQUEST,"Incorrect password")

        }
     

   const userTokens = createUserToken(isExist)
   

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
     const {password:pass,...rest} = isExist.toObject()
        return {
           accessToken:userTokens.accessToken,
           refreshToken:userTokens.refreshToken,
           user: rest
        }

}
const getNewAccessToken = async(refreshToken:string)=>{
     
  const newAccessToken = await createAccessTokenWithRefreshToken(refreshToken)

  return {
     accessToken: newAccessToken
  }

}


const resetPassword = async(oldPassword:string, newPassword:string,decodedToken:JwtPayload) => {
    const user = await User.findById(decodedToken.userId)
    
    if(!user){
      throw new AppError(httpStatus.UNAUTHORIZED, 'user not found')

    }
    const isOldPasswordMatch = await bcryptjs.compare(oldPassword, user?.password as string)

    if(!isOldPasswordMatch){
      throw new AppError(httpStatus.UNAUTHORIZED, 'old password dose not match')

    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-non-null-assertion
    user!.password = await bcryptjs.hash(newPassword,Number(envVars.BCRYPT_SALT_ROUND))
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    user!.save()
          
      return true;

}




export const AuthServices = {
    credentialLogin,
    getNewAccessToken,
    resetPassword
}