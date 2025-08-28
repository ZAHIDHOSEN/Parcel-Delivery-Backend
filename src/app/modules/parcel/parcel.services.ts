import AppError from "../../errorHelpers/AppError";
import { IParcel, ParcelStatus } from "./parcel.interface";
import { Parcel } from "./parcel.model";
import  httpStatus  from 'http-status-codes';


const createParcel = async(payload: Partial<IParcel>)=>{
   const {type,status,statusLog, ...rest} = payload

   const parcel = await Parcel.create({
    type,
    status,
    statusLog,
    ...rest
   })

   return parcel
}


const getASingleParcel = async(id: string) =>{
    const parcel = await Parcel.findById(id)
    return {
        data: parcel
    }

}

const cancelParcelBySender = async(id:string, payload: Partial<IParcel>) =>{
   if(payload.status === ParcelStatus.Dispatched){
    throw new AppError(httpStatus.CONFLICT, "parcel already dispatch")

   }

const cancelParcel = await Parcel.findByIdAndUpdate(id,payload,{new:true,runValidators:true})

return cancelParcel
}

const incomingParcelByReceiver = async(id:string)=>{
       const parcel = await Parcel.findById(id)
       
    return {
        data: parcel
    }
    
}



export const parcelServices = {
    createParcel,
    getASingleParcel,
    cancelParcelBySender,
    incomingParcelByReceiver
}