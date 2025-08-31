"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserZodSchema = exports.createUserZodSchema = void 0;
const zod_1 = __importDefault(require("zod"));
const user_interface_1 = require("./user.interface");
exports.createUserZodSchema = zod_1.default.object({
    name: zod_1.default.string()
        .min(2, { message: "name minimum 2 charactor" }).max(50, { message: "Name to long" }),
    email: zod_1.default.string().email({ message: "Invalid email address" }),
    password: zod_1.default.string()
        .min(8, { message: "Password must be at least 8 characters" })
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,}$/, {
        message: "Password must contain uppercase, lowercase, number, and special character"
    }),
    phoneNumber: zod_1.default.string().regex(/^(?:\+88|88)?01[3-9]\d{8}$/, { message: "must be bangladeshi phone number" })
        .optional(),
    address: zod_1.default.string().max(200, { message: "address Content must be 200 charactor" })
        .optional()
});
exports.updateUserZodSchema = zod_1.default.object({
    name: zod_1.default.string()
        .min(2, { message: "name minimum 2 charactor" }).max(50, { message: "Name to long" }).optional(),
    password: zod_1.default.string()
        .min(8, { message: "Password must be at least 8 characters" })
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,}$/, {
        message: "Password must contain uppercase, lowercase, number, and special character"
    }).optional(),
    phoneNumber: zod_1.default.string().regex(/^(?:\+88|88)?01[3-9]\d{8}$/, { message: "must be bangladeshi phone number" })
        .optional(),
    address: zod_1.default.string().max(200, { message: "address Content must be 200 charactor" })
        .optional(),
    role: zod_1.default.enum(Object.values(user_interface_1.Role)).optional(),
    isActive: zod_1.default.enum(Object.values(user_interface_1.isActive)).optional(),
    isDeleted: zod_1.default.boolean().optional(),
    isVerified: zod_1.default.boolean().optional()
});
