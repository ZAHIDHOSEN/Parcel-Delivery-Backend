"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleValidationError = void 0;
const handleValidationError = (err) => {
    const errorsSoursc = [];
    const errors = Object.values(err.errors);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    errors.forEach((errorObject) => errorsSoursc.push({
        path: errorObject.path,
        message: errorObject.message
    }));
    return {
        statusCode: 400,
        message: "validation Error",
        errorsSoursc
    };
};
exports.handleValidationError = handleValidationError;
