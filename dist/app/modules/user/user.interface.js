"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isActive = exports.Role = void 0;
var Role;
(function (Role) {
    Role["Super_Admin"] = "Super_Admin";
    Role["Admin"] = "Admin";
    Role["Sender"] = "Sender";
    Role["Receiver"] = "Receiver";
})(Role || (exports.Role = Role = {}));
var isActive;
(function (isActive) {
    isActive["ACTIVE"] = "ACTIVE";
    isActive["INACTIVE"] = "INACTIVE";
    isActive["BLOCKED"] = "BLOCKED";
})(isActive || (exports.isActive = isActive = {}));
