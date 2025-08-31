"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleZodError = void 0;
const handleZodError = (err) => {
    const errorsSoursc = [];
    err.issues.forEach((issue) => {
        errorsSoursc.push({
            path: issue.path[issue.path.length - 1],
            message: issue.message
        });
    });
    return {
        statusCode: 400,
        message: "Zod Error",
        errorsSoursc
    };
};
exports.handleZodError = handleZodError;
