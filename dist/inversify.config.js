"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
require("reflect-metadata");
const inversify_1 = require("inversify");
const identifiers_1 = __importDefault(require("./constants/identifiers"));
const Account_Repository_1 = require("./repositories/Account.Repository");
let container = new inversify_1.Container();
container.bind(identifiers_1.default.IAccountRepository).to(Account_Repository_1.AccountRepository);
exports.default = container;
//# sourceMappingURL=inversify.config.js.map