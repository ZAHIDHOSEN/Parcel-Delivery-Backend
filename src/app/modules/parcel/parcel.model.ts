import { model, Schema } from "mongoose";
import { IAddress, IParcel, IStatusLog, ParcelStatus, ParcelType } from "./parcel.interface";



const AddressSchema = new Schema<IAddress>({
    name: {type: String,required:true},
    phone: {type: String, required: true},
    address: {type: String, required: true},
    city: {type: String, required: true}

},{_id: false})



const StatusLogSchema = new Schema<IStatusLog>({
    status: {type: String, enum:Object.values(ParcelStatus),required:true},
    note: {type:String},
    location:{type:String}

},{_id:false})


const ParcelSchema = new Schema<IParcel>({
    trackingId: {type: String},
    sender: {type: Schema.Types.ObjectId,ref:"User"},
    receiver: {type: Schema.Types.ObjectId, ref:"User"},
    type: {
        type:String,
        enum:Object.values(ParcelType),
        required:true
    },
    weight: {type: String},
    from: {type: AddressSchema, required:true},
    to: {type: AddressSchema, required:true},
    status: {type: String,enum:Object.values(ParcelStatus),
        default:ParcelStatus.Requested
    },
    statusLog: {type: [StatusLogSchema],default: []}


},{timestamps:true})


export const Parcel = model<IParcel>("Parcel",ParcelSchema)