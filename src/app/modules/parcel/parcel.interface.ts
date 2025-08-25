import { Types } from "mongoose";



export enum ParcelStatus {
  Requested = 'Requested',
  Approved = 'Approved',
  Dispatched = 'Dispatched',
  InTransit = 'In Transit',
  Delivered = 'Delivered',

}

export interface IStatusLog {
    status: ParcelStatus;
    note ?: string;
    location ?: string;
}


export interface IAddress {
  name: string; 
  phone: string;
  address: string;
  city: string;
}

export enum ParcelType {
 Document = 'Document',
  SmallBox = 'SmallBox',
  LargeBox = 'LargeBox',
  Other = 'Other',
}


export interface IParcel {
    _id ?: Types.ObjectId
    trackingId?: string;
    sender?: string;
    receiver?: string;
    type: ParcelType;
    weight ?: string;
    from?: IAddress;
    to?: IAddress;
    status: ParcelStatus;
    statusLog : IStatusLog[]

}