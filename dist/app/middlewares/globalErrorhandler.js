"use strict";
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-expressions */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandler = void 0;
const env_1 = require("../config/env");
const AppError_1 = __importDefault(require("../errorHelpers/AppError"));
const handleDuplicateError_1 = require("../helperFunction/handleDuplicateError");
const handleCastError_1 = require("../helperFunction/handleCastError");
const handleZodError_1 = require("../helperFunction/handleZodError");
const handleValidationError_1 = require("../helperFunction/handleValidationError");
// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
const globalErrorHandler = (err, req, res, next) => {
    if (env_1.envVars.NODE_ENV === "development") {
        console.log(err);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let errorsSoursc = [
    //   {
    //   path : "isDeleted",
    //   message: "Cast Failed"
    // }
    ];
    let statusCode = 500;
    let message = `something went wrong`;
    //  mongoose error
    // 1.duplicate error
    // 2.castError 
    // 3.Validation Error
    //  duplicate error 
    if (err.code === 11000) {
        const simplifiedError = (0, handleDuplicateError_1.handleDuplicateError)(err);
        statusCode = simplifiedError.statusCode,
            message = simplifiedError.message;
    }
    //  castError  or objectId error 
    else if (err.name === "CastError") {
        const simplifiedError = (0, handleCastError_1.handleCastError)(err);
        statusCode = simplifiedError.statusCode,
            message = simplifiedError.message;
    }
    //  zod error
    else if (err.name === "ZodError") {
        const simplifiedError = (0, handleZodError_1.handleZodError)(err);
        statusCode = simplifiedError.statusCode,
            message = simplifiedError.message,
            errorsSoursc = simplifiedError.errorsSoursc;
    }
    //  Mongoose validation error
    else if (err.name === "ValidationError") {
        const simplifiedError = (0, handleValidationError_1.handleValidationError)(err);
        statusCode = simplifiedError.statusCode;
        errorsSoursc = simplifiedError.errorsSoursc;
        message = simplifiedError.message;
    }
    else if (err instanceof AppError_1.default) {
        statusCode = err.statusCode;
        message = err.message;
    }
    else if (err instanceof Error) {
        statusCode = 500;
        message = err.message;
    }
    res.status(statusCode).json({
        success: false,
        message,
        errorsSoursc,
        err: env_1.envVars.NODE_ENV === "development" ? err : null,
        stack: env_1.envVars.NODE_ENV === "development" ? err.stack : null
    });
};
exports.globalErrorHandler = globalErrorHandler;
