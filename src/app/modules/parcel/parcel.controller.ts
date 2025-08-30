import { NextFunction, Request, Response,} from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { parcelServices } from "./parcel.services";
import httpStatus from "http-status-codes"


// eslint-disable-next-line @typescript-eslint/no-unused-vars
const createParcel = catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
     
     const payload = req.body
    const parcel = await parcelServices.createParcel(payload)


      sendResponse(res,{
        success: true,
        statusCode: httpStatus.CREATED,
        message: "Parcel created  Successfully",
        data: parcel,


     })

})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getASingleParcel = catchAsync(async(req:Request,res:Response,next: NextFunction)=>{
   const id = req.params.id;
   const result = await parcelServices.getASingleParcel(id)

     sendResponse(res,{
        success: true,
        statusCode: httpStatus.OK,
        message: "single parcel by sender",
        data: result.data,


     })

})
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const cancelParcelBySender = catchAsync(async(req:Request,res:Response,next: NextFunction)=>{
   const id = req.params.id;
   const payload = req.body;
   const result = await parcelServices.cancelParcelBySender(id,payload)

     sendResponse(res,{
        success: true,
        statusCode: httpStatus.CREATED,
        message: "parcel cancelled by sender",
        data: result,


     })

})


// eslint-disable-next-line @typescript-eslint/no-unused-vars
const incomingParcelByReceiver = catchAsync(async(req:Request,res:Response,next: NextFunction)=>{
   const id = req.params.id;
   const result = await parcelServices.incomingParcelByReceiver(id)

     sendResponse(res,{
        success: true,
        statusCode: httpStatus.CREATED,
        message: "receiver incoming parcel",
        data: result.data,


     })

})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const conformParcelByReceiver = catchAsync(async(req:Request,res:Response,next: NextFunction)=>{
   const id = req.params.id;
   const payload = req.body;
   const result = await parcelServices.conformParcelByReceiver(id,payload)

     sendResponse(res,{
        success: true,
        statusCode: httpStatus.CREATED,
        message: "receiver parcel delivered",
        data: result


     })

})


// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getAllParcel = catchAsync(async(req:Request,res:Response,next: NextFunction)=>{
  
   const result = await parcelServices.getAllParcel()

     sendResponse(res,{
        success: true,
        statusCode: httpStatus.OK,
        message: "All parcel here",
        data: result


     })

})


export const parcelController = {
    createParcel,
    getASingleParcel,
    cancelParcelBySender,
    incomingParcelByReceiver,
    conformParcelByReceiver,
    getAllParcel
    
}