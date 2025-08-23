/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { AuthServices } from "./auth.services";
import { sendResponse } from "../../utils/sendResponse";
import  httpStatus  from 'http-status-codes';
import { setAuthCookie } from "../../utils/setCookie";
import AppError from "../../errorHelpers/AppError";
import { JwtPayload } from "jsonwebtoken";


// eslint-disable-next-line @typescript-eslint/no-unused-vars
const credentialLogin = catchAsync(async(req:Request, res:Response, next: NextFunction)=>{
   
    const loginInfo = await AuthServices.credentialLogin(req.body)

     setAuthCookie(res,loginInfo)

     sendResponse(res,{
            success: true,
            statusCode: httpStatus.OK,
            message: "Login Successfully",
            data: loginInfo,
    
    
         })
})
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getNewAccessToken = catchAsync(async(req:Request, res:Response, next: NextFunction)=>{
    const refreshToken = req.cookies.refreshToken
    if(!refreshToken){
        throw new AppError(httpStatus.BAD_REQUEST,"No refresh token received")
    }
    const tokenInfo = await AuthServices.getNewAccessToken(refreshToken)

    setAuthCookie(res,tokenInfo)

     
     sendResponse(res,{
            success: true,
            statusCode: httpStatus.OK,
            message: "token Info get Successfully",
            data: tokenInfo,
    
    
         })
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const resetPassword = catchAsync(async(req:Request, res:Response, next: NextFunction)=>{
    
  
  
   const newPassword = req.body.newSetPassword
   
   const oldPassword = req.body.oldPassword
   
    const decodedToken = req.user
   const newSetPassword = await AuthServices.resetPassword(oldPassword,newPassword,decodedToken as JwtPayload) 
  
       sendResponse(res,{
        success: true,
        statusCode: httpStatus.CREATED,
        message: "password changed successfully",
        data: null


     })
})
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const logout = catchAsync(async(req:Request, res:Response, next: NextFunction)=>{
     
   res.clearCookie("accessToken",{
    httpOnly:true,
    secure: false,
    sameSite:"lax"
   })
   res.clearCookie("refreshToken",{
    httpOnly:true,
    secure: false,
    sameSite:"lax"
   })
     
     sendResponse(res,{
            success: true,
            statusCode: httpStatus.OK,
            message: "logout Successfully",
            data: null,
    
    
         })
})



export const AuthController ={
    credentialLogin,
    getNewAccessToken,
    resetPassword,
    logout
}