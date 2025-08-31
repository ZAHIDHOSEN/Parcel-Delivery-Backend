"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Parcel = void 0;
const mongoose_1 = require("mongoose");
const parcel_interface_1 = require("./parcel.interface");
const AddressSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true }
}, { _id: false });
const StatusLogSchema = new mongoose_1.Schema({
    status: { type: String, enum: Object.values(parcel_interface_1.ParcelStatus), required: true },
    note: { type: String },
    location: { type: String }
}, { _id: false });
const ParcelSchema = new mongoose_1.Schema({
    trackingId: { type: String },
    sender: { type: mongoose_1.Schema.Types.ObjectId, ref: "User" },
    receiver: { type: mongoose_1.Schema.Types.ObjectId, ref: "User" },
    type: {
        type: String,
        enum: Object.values(parcel_interface_1.ParcelType),
        required: true
    },
    weight: { type: String },
    from: { type: AddressSchema, required: true },
    to: { type: AddressSchema, required: true },
    status: { type: String, enum: Object.values(parcel_interface_1.ParcelStatus),
        default: parcel_interface_1.ParcelStatus.Requested
    },
    statusLog: { type: [StatusLogSchema], default: [] }
}, { timestamps: true });
exports.Parcel = (0, mongoose_1.model)("Parcel", ParcelSchema);
