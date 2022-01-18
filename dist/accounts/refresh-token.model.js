"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    account: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Account' },
    token: String,
    expires: Date,
    created: { type: Date, default: Date.now },
    createdByIp: String,
    revoked: Date,
    revokedByIp: String,
    replacedByToken: String
});
schema.virtual('isExpired').get(function () {
    return new Date() >= this.expires;
});
schema.virtual('isActive').get(function () {
    return !this.revoked && !this.isExpired;
});
const RefreshTokenModel = (0, mongoose_1.model)('RefreshToken', schema);
exports.default = RefreshTokenModel;
//# sourceMappingURL=refresh-token.model.js.map