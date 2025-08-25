import { Types } from "mongoose";



export enum ParcelStatus {
  Requested = 'Requested',
  Approved = 'Approved',
  Dispatched = 'Dispatched',
  InTransit = 'In Transit',
  Delivered = 'Delivered',

}

export interface statusLog {
    status: ParcelStatus;
    note ?: string;
    location ?: string;
}


export interface Address {
  name: string; 
  phone: string;
  addressLine: string;
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
    from?: Address;
    to?: Address;
    statusLog : statusLog[]

}