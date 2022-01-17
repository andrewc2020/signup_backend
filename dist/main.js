"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const installer_1 = __importDefault(require("./_helpers/installer"));
const Identifiers_1 = __importDefault(require("./Constants/Identifiers"));
const account_service_1 = require("./accounts/account.service");
// Composition root
let accountRepo = installer_1.default.get(Identifiers_1.default.IAccountRepository);
let service = new account_service_1.AccountService(accountRepo);
console.log(service.getAll());
//# sourceMappingURL=main.js.map