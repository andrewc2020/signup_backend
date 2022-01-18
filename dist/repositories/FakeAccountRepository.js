"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FakeAccountRepository = void 0;
const inversify_1 = require("inversify");
let FakeAccountRepository = class FakeAccountRepository {
    constructor() {
    }
    getAll() {
        throw new Error("Method not implemented.");
    }
    getById(id) {
        throw new Error("Method not implemented.");
    }
    create(params) {
        throw new Error("Method not implemented.");
    }
    update(id, params) {
        throw new Error("Method not implemented.");
    }
    delete(id) {
        throw new Error("Method not implemented.");
    }
    basicDetails(account) {
        throw new Error("Method not implemented.");
    }
    authenticate({ email, password, ipAddress }) {
        throw new Error("Method not implemented.");
    }
    refreshToken({ token, ipAddress }) {
        throw new Error("Method not implemented.");
    }
    revokeToken({ token, ipAddress }) {
        throw new Error("Method not implemented.");
    }
    register(params, origin) {
        throw new Error("Method not implemented.");
    }
    verifyEmail({ token }) {
        throw new Error("Method not implemented.");
    }
    forgotPassword({ email }, origin) {
        throw new Error("Method not implemented.");
    }
    validateResetToken({ token }) {
        throw new Error("Method not implemented.");
    }
    resetPassword({ token, password }) {
        throw new Error("Method not implemented.");
    }
};
FakeAccountRepository = __decorate([
    (0, inversify_1.injectable)(),
    __metadata("design:paramtypes", [])
], FakeAccountRepository);
exports.FakeAccountRepository = FakeAccountRepository;
//# sourceMappingURL=FakeAccountRepository.js.map