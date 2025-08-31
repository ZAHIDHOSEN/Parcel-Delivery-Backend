import  { Types } from "mongoose";

export enum Role{
    Super_Admin = "Super_Admin",
    Admin = "Admin",
    Sender = "Sender",
    Receiver = "Receiver"
}



export interface IAuthProvider {
    provider: "google" | "credential"
    providerId : string
}

export enum isActive {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE",
    BLOCKED = "BLOCKED",

}

export interface IUser{
    _id ?: Types.ObjectId
    name: string;
    email: string;
    password ?:string;
    phone ?:string;
    picture ?: string;
    isDeleted ?: boolean;
    isActive ?: isActive;
    isVerified ?: boolean;
    role ?: Role;
    auth ?: IAuthProvider[];
    parcel ?: Types.ObjectId[]


    

}