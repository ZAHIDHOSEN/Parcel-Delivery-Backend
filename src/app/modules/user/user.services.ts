import { JwtPayload } from "jsonwebtoken";
import AppError from "../../errorHelpers/AppError";
import { IAuthProvider, IUser, Role } from "./user.interface";
import { User } from "./user.model";
import bcryptjs from "bcryptjs"
import  httpStatus  from 'http-status-codes';
import { envVars } from "../../config/env";

const createUser = async(payload: Partial<IUser>)=>{
    const {email,password,...rest} = payload

     const isExits = await User.findOne({email})
     if(isExits){
       throw new AppError(httpStatus.BAD_REQUEST,"user already exits")
     }
    
    const hashPassword = await bcryptjs.hash(password as string,10)
    const authProvider: IAuthProvider = {provider:"credential",providerId: email as string}

    const user = await User.create({
        email,
        auth: [authProvider],
         password:hashPassword,
       
        ...rest
    })
    return user
}

const updateUser = async(userId:string,payload:Partial<IUser>,decodedToken: JwtPayload)=>{

 const isUserExits = await User.findById(userId)
  if(!isUserExits){
    throw new AppError(httpStatus.NOT_FOUND, "User Not Found")
  }


if(payload.role === Role.Sender || decodedToken.role === Role.Receiver){
  throw new AppError(httpStatus.FORBIDDEN, "You are not authorize")
  
}

if(payload.role ===Role.Super_Admin && decodedToken.role === Role.Admin){
    throw new AppError(httpStatus.FORBIDDEN, "You are not authorize")
}

if(payload.isActive || payload.isDeleted || payload.isVerified){
  if(decodedToken.role === Role.Sender || decodedToken.role ===Role.Receiver){
    throw new AppError(httpStatus.FORBIDDEN, "You are not authorize")

  }
}
if(payload.password){
  payload.password = await bcryptjs.hash(payload.password,envVars.BCRYPT_SALT_ROUND)

}

const newUpdatedUser = await User.findByIdAndUpdate(userId,payload,{new: true,runValidators:true})

return newUpdatedUser


}

const getAllUser = async() =>{
    const users = await User.find({})
    const totalUsers = await User.countDocuments()
    return {
        data: users,
        meta:{
            total:totalUsers
        }
    }
}


export const userServices = {
    createUser,
    getAllUser,
    updateUser
}