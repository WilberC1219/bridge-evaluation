"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uuidWithPrefix = exports.uuid = void 0;
const uuid_1 = require("uuid");
const uuid = (removeDashes = false) => {
    if (removeDashes) {
        return (0, uuid_1.v4)().replace(/-/g, "");
    }
    return (0, uuid_1.v4)();
};
exports.uuid = uuid;
const uuidWithPrefix = (removeDashes = false, prefix) => `${prefix}_${(0, exports.uuid)(removeDashes)}`;
exports.uuidWithPrefix = uuidWithPrefix;
