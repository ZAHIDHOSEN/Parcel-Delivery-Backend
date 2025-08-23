/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";

import httpStatus from "http-status-codes" 
import { catchAsync } from "../../utils/catchAsync";
import { userServices } from "./user.services";
import { sendResponse } from "../../utils/sendResponse";
import { JwtPayload } from "jsonwebtoken";



const createUser = catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
   
    const user = await userServices.createUser(req.body)

      sendResponse(res,{
        success: true,
        statusCode: httpStatus.CREATED,
        message: "userCreated Successfully",
        data: user,


     })

})

const updateUser = catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
    const userId = req.params.id

    const verifiedToken = req.user
    const payload = req.body
    const user = await userServices.updateUser(userId,payload,verifiedToken as JwtPayload)
    

     sendResponse(res,{
        success: true,
        statusCode: httpStatus.CREATED,
        message: "userUpdated Successfully",
        data: user,


     })

})


const getAllUser = catchAsync(async(req:Request,res:Response, next:NextFunction)=>{
    const users = await userServices.getAllUser()
        sendResponse(res,{
        success: true,
        statusCode: httpStatus.OK,
        message: "all users get Successfully",
        data: users,


     })
})
export const userController = {
    createUser,
    updateUser,
    getAllUser
}