"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_route_1 = require("./app/modules/user/user.route");
const cors_1 = __importDefault(require("cors"));
const notFound_1 = require("./app/middlewares/notFound");
const auth_route_1 = require("./app/modules/auth/auth.route");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const globalErrorhandler_1 = require("./app/middlewares/globalErrorhandler");
const parcel_route_1 = require("./app/modules/parcel/parcel.route");
const app = (0, express_1.default)();
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use("/api/v1/user", user_route_1.userRoutes);
app.use("/api/v1/auth", auth_route_1.AuthRoutes);
app.use("/api/v1/parcel", parcel_route_1.parcelRoute);
app.get("/", (req, res) => {
    res.send("welcome to parcel delivery backend");
});
app.use(globalErrorhandler_1.globalErrorHandler);
app.use(notFound_1.notFound);
exports.default = app;
