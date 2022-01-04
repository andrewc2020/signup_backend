"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const schema = new Schema({
    account: { type: Schema.Types.ObjectId, ref: 'Account' },
    token: String,
    expires: Date,
    created: { type: Date, default: Date.now },
    createdByIp: String,
    revoked: Date,
    revokedByIp: String,
    replacedByToken: String
});
schema.virtual('isExpired').get(function () {
    return Date.now() >= this.expires;
});
schema.virtual('isActive').get(function () {
    return !this.revoked && !this.isExpired;
});
module.exports = mongoose_1.default.model('RefreshToken', schema);
//# sourceMappingURL=refresh-token.model.js.map