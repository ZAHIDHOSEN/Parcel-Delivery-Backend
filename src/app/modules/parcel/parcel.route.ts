import { Router } from "express";
import { parcelController } from "./parcel.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";



const router = Router()

// sender route
router.post("/create-parcel",checkAuth(Role.Sender),parcelController.createParcel)
router.get("/:id",checkAuth(Role.Sender),parcelController.getASingleParcel)
router.patch("/cancel/:id",checkAuth(Role.Sender),parcelController.cancelParcelBySender)




export const parcelRoute = router 