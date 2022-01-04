"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_json_1 = __importDefault(require("../config.json"));
const mongoose_1 = __importDefault(require("mongoose"));
const connectionOptions = { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false };
mongoose_1.default.connect(process.env.MONGODB_URI || config_json_1.default.connectionString, connectionOptions);
console.log(config_json_1.default.connectionString);
mongoose_1.default.Promise = global.Promise;
exports.default = {
    Account: require('../accounts/account.model'),
    RefreshToken: require('../accounts/refresh-token.model'),
    isValidId
};
function isValidId(id) {
    return mongoose_1.default.Types.ObjectId.isValid(id);
}
//# sourceMappingURL=db.js.map