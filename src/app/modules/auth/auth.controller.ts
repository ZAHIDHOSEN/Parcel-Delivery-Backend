import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { AuthServices } from "./auth.services";
import { sendResponse } from "../../utils/sendResponse";
import  httpStatus  from 'http-status-codes';


// eslint-disable-next-line @typescript-eslint/no-unused-vars
const credentialLogin = catchAsync(async(req:Request, res:Response, next: NextFunction)=>{
   
    const loginInfo = await AuthServices.credentialLogin(req.body)

     
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
    const tokenInfo = await AuthServices.getNewAccessToken(refreshToken)

     
     sendResponse(res,{
            success: true,
            statusCode: httpStatus.OK,
            message: "token Info get Successfully",
            data: tokenInfo,
    
    
         })
})



export const AuthController ={
    credentialLogin,
    getNewAccessToken
}