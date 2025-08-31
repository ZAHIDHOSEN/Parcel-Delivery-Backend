"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parcelRoute = void 0;
const express_1 = require("express");
const parcel_controller_1 = require("./parcel.controller");
const checkAuth_1 = require("../../middlewares/checkAuth");
const user_interface_1 = require("../user/user.interface");
const router = (0, express_1.Router)();
// admin and sender route
router.post("/create-parcel", (0, checkAuth_1.checkAuth)(user_interface_1.Role.Sender), parcel_controller_1.parcelController.createParcel);
router.get("/:id", (0, checkAuth_1.checkAuth)(user_interface_1.Role.Sender), parcel_controller_1.parcelController.getASingleParcel);
router.patch("/cancel/:id", (0, checkAuth_1.checkAuth)(user_interface_1.Role.Sender), parcel_controller_1.parcelController.cancelParcelBySender);
router.get("/all-parcel", (0, checkAuth_1.checkAuth)(user_interface_1.Role.Super_Admin, user_interface_1.Role.Admin), parcel_controller_1.parcelController.getAllParcel);
// receiver route
router.get("/incoming/:id", (0, checkAuth_1.checkAuth)(user_interface_1.Role.Receiver), parcel_controller_1.parcelController.incomingParcelByReceiver);
router.patch("/conform/:id", (0, checkAuth_1.checkAuth)(user_interface_1.Role.Receiver), parcel_controller_1.parcelController.conformParcelByReceiver);
exports.parcelRoute = router;
