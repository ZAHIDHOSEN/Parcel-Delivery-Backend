"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parcelServices = void 0;
const AppError_1 = __importDefault(require("../../errorHelpers/AppError"));
const parcel_interface_1 = require("./parcel.interface");
const parcel_model_1 = require("./parcel.model");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
// admin and sender
const createParcel = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { type, status, statusLog } = payload, rest = __rest(payload, ["type", "status", "statusLog"]);
    const parcel = yield parcel_model_1.Parcel.create(Object.assign({ type,
        status,
        statusLog }, rest));
    return parcel;
});
const getASingleParcel = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const parcel = yield parcel_model_1.Parcel.findById(id);
    return {
        data: parcel
    };
});
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const cancelParcelBySender = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const parcel = yield parcel_model_1.Parcel.findById(id);
    if (!parcel)
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "parcel not found");
    if (parcel.status === parcel_interface_1.ParcelStatus.Dispatched || parcel.status === parcel_interface_1.ParcelStatus.Delivered) {
        throw new AppError_1.default(http_status_codes_1.default.CONFLICT, "parcel cannot be canceled after dispatch");
    }
    parcel.status = parcel_interface_1.ParcelStatus.Canceled;
    parcel.statusLog.push({ status: parcel_interface_1.ParcelStatus.Canceled, note: "Canceled by sender" });
    return yield parcel.save();
});
const getAllParcel = () => __awaiter(void 0, void 0, void 0, function* () {
    const parcel = yield parcel_model_1.Parcel.find({});
    const totalParcel = yield parcel_model_1.Parcel.countDocuments();
    return {
        data: parcel,
        meta: {
            total: totalParcel
        }
    };
});
// Receiver route
const incomingParcelByReceiver = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const parcel = yield parcel_model_1.Parcel.findById(id);
    return {
        data: parcel
    };
});
const conformParcelByReceiver = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isParcelExists = yield parcel_model_1.Parcel.findById(id);
    if (!isParcelExists) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "parcel not found");
    }
    if (payload.status !== parcel_interface_1.ParcelStatus.Delivered) {
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, "parcel didnot delivered");
    }
    isParcelExists.statusLog.push({ status: parcel_interface_1.ParcelStatus.Delivered, note: "receiver conform", location: "" });
    isParcelExists.status = parcel_interface_1.ParcelStatus.Delivered;
    const conformedParcel = yield isParcelExists.save();
    return conformedParcel;
});
exports.parcelServices = {
    createParcel,
    getASingleParcel,
    cancelParcelBySender,
    incomingParcelByReceiver,
    conformParcelByReceiver,
    getAllParcel
};
