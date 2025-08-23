import AppError from "../../errorHelpers/AppError"
import { IUser } from "../user/user.interface"
import { User } from "../user/user.model"
import  httpStatus  from 'http-status-codes';
import bcryptjs from "bcryptjs"
import { createAccessTokenWithRefreshToken, createUserToken } from "../../utils/userTokens";


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




export const AuthServices = {
    credentialLogin,
    getNewAccessToken
}