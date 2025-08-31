"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthServices = void 0;
const AppError_1 = __importDefault(require("../../errorHelpers/AppError"));
const user_model_1 = require("../user/user.model");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const userTokens_1 = require("../../utils/userTokens");
const env_1 = require("../../config/env");
const credentialLogin = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = payload;
    const isExist = yield user_model_1.User.findOne({ email });
    if (!isExist) {
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, "user dose not exits");
    }
    const isPasswordMatch = yield bcryptjs_1.default.compare(password, isExist.password);
    if (!isPasswordMatch) {
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, "Incorrect password");
    }
    const userTokens = (0, userTokens_1.createUserToken)(isExist);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const _a = isExist.toObject(), { password: pass } = _a, rest = __rest(_a, ["password"]);
    return {
        accessToken: userTokens.accessToken,
        refreshToken: userTokens.refreshToken,
        user: rest
    };
});
const getNewAccessToken = (refreshToken) => __awaiter(void 0, void 0, void 0, function* () {
    const newAccessToken = yield (0, userTokens_1.createAccessTokenWithRefreshToken)(refreshToken);
    return {
        accessToken: newAccessToken
    };
});
const resetPassword = (oldPassword, newPassword, decodedToken) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findById(decodedToken.userId);
    if (!user) {
        throw new AppError_1.default(http_status_codes_1.default.UNAUTHORIZED, 'user not found');
    }
    const isOldPasswordMatch = yield bcryptjs_1.default.compare(oldPassword, user === null || user === void 0 ? void 0 : user.password);
    if (!isOldPasswordMatch) {
        throw new AppError_1.default(http_status_codes_1.default.UNAUTHORIZED, 'old password dose not match');
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-non-null-assertion
    user.password = yield bcryptjs_1.default.hash(newPassword, Number(env_1.envVars.BCRYPT_SALT_ROUND));
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    user.save();
    return true;
});
exports.AuthServices = {
    credentialLogin,
    getNewAccessToken,
    resetPassword
};
