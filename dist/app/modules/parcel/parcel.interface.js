"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParcelType = exports.ParcelStatus = void 0;
var ParcelStatus;
(function (ParcelStatus) {
    ParcelStatus["Requested"] = "Requested";
    ParcelStatus["Approved"] = "Approved";
    ParcelStatus["Dispatched"] = "Dispatched";
    ParcelStatus["InTransit"] = "In Transit";
    ParcelStatus["Delivered"] = "Delivered";
    ParcelStatus["Canceled"] = "Canceled";
})(ParcelStatus || (exports.ParcelStatus = ParcelStatus = {}));
var ParcelType;
(function (ParcelType) {
    ParcelType["Document"] = "Document";
    ParcelType["SmallBox"] = "SmallBox";
    ParcelType["LargeBox"] = "LargeBox";
    ParcelType["Other"] = "Other";
})(ParcelType || (exports.ParcelType = ParcelType = {}));
