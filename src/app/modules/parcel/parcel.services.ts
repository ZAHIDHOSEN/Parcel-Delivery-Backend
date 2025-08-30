import AppError from "../../errorHelpers/AppError";
import { IParcel, ParcelStatus } from "./parcel.interface";
import { Parcel } from "./parcel.model";
import  httpStatus  from 'http-status-codes';

// admin and sender
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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const cancelParcelBySender = async(id:string, payload: Partial<IParcel>) => {
  const parcel = await Parcel.findById(id)
  if (!parcel) throw new AppError(httpStatus.NOT_FOUND, "parcel not found")

  if (parcel.status === ParcelStatus.Dispatched || parcel.status === ParcelStatus.Delivered) {
    throw new AppError(httpStatus.CONFLICT, "parcel cannot be canceled after dispatch")
  }

  parcel.status = ParcelStatus.Canceled
  parcel.statusLog.push({ status: ParcelStatus.Canceled, note: "Canceled by sender" })
  return await parcel.save()
}


const getAllParcel = async() =>{
    const parcel = await Parcel.find({})
    const totalParcel = await Parcel.countDocuments()
    return {
        data:parcel,
        meta: {
            total: totalParcel
        }
    }
}

// Receiver route
const incomingParcelByReceiver = async(id:string)=>{
       const parcel = await Parcel.findById(id)
       
    return {
        data: parcel
    }
    
}

const conformParcelByReceiver = async(id:string,payload:Partial<IParcel>)=>{
    const isParcelExists = await Parcel.findById(id)
    if(!isParcelExists){
        throw new AppError(httpStatus.NOT_FOUND,"parcel not found")

    }
    if(payload.status !== ParcelStatus.Delivered){
        throw new AppError(httpStatus.BAD_REQUEST,"parcel didnot delivered")
    }

    isParcelExists.statusLog.push({status: ParcelStatus.Delivered,note:"receiver conform",location: ""})

      isParcelExists.status = ParcelStatus.Delivered

      const conformedParcel = await isParcelExists.save()

        return conformedParcel

}









export const parcelServices = {
    createParcel,
    getASingleParcel,
    cancelParcelBySender,
    incomingParcelByReceiver,
    conformParcelByReceiver,
    getAllParcel
}