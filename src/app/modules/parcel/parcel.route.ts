import { Router } from "express";
import { parcelController } from "./parcel.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";



const router = Router()

// admin and sender route
router.post("/create-parcel",checkAuth(Role.Sender),parcelController.createParcel)
router.get("/:id",checkAuth(Role.Sender),parcelController.getASingleParcel)
router.patch("/cancel/:id",checkAuth(Role.Sender),parcelController.cancelParcelBySender)
router.get("/all-parcel",checkAuth(Role.Super_Admin,Role.Admin),parcelController.getAllParcel)

// receiver route
router.get("/incoming/:id",checkAuth(Role.Receiver),parcelController.incomingParcelByReceiver)
router.patch("/conform/:id",checkAuth(Role.Receiver),parcelController.conformParcelByReceiver)






export const parcelRoute = router 