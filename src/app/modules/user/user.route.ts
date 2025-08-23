import { Router } from "express";
import { userController } from "./user.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { createUserZodSchema, updateUserZodSchema } from "./user.validation";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "./user.interface";


const router = Router()

router.post("/register",validateRequest(createUserZodSchema),userController.createUser)
router.get("/all-user",checkAuth(Role.Admin),userController.getAllUser)
router.patch("/:id",validateRequest(updateUserZodSchema),checkAuth(Role.Admin,Role.Super_Admin),userController.updateUser)


export const userRoutes = router