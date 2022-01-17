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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountService = void 0;
class AccountService {
    constructor(repository) {
        this.repository = repository;
    }
    register(params, origin) {
        try {
            return this.repository.register(params, origin);
        }
        catch (err) {
            throw new Error('Method not implemented.');
        }
    }
    verifyEmail({ token }) {
        return this.repository.verifyEmail({ token });
    }
    forgotPassword({ email }, origin) {
        return this.repository.forgotPassword({ email }, origin);
    }
    validateResetToken({ token }) {
        return this.repository.validateResetToken({ token });
    }
    resetPassword({ token, password }) {
        try {
            return this.repository.resetPassword({ token, password });
        }
        catch (err) {
            throw new Error('Method not implemented.');
        }
    }
    getAll() {
        try {
            return this.repository.getAll();
        }
        catch (_a) {
            throw new Error('Method not implemented.');
        }
    }
    getById(id, params) {
        try {
            return this.repository.getById(id);
        }
        catch (_a) {
            throw new Error('Method not implemented.');
        }
    }
    create(params) {
        try {
            return this.repository.create(params);
        }
        catch (_a) {
            throw new Error('Method not implemented.');
        }
    }
    update(id, params) {
        try {
            return this.repository.update(id, params);
        }
        catch (_a) {
            throw new Error('Method not implemented.');
        }
    }
    delete(id) {
        try {
            return this.repository.delete(id);
        }
        catch (_a) {
            throw new Error('Method not implemented.');
        }
    }
    authenticate({ email, password, ipAddress }) {
        return __awaiter(this, void 0, void 0, function* () {
            // return basic details and tokens
            return this.repository.authenticate({ email, password, ipAddress });
        });
    }
    refreshToken({ token, ipAddress }) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.repository.refreshToken({ token, ipAddress });
        });
    }
    revokeToken({ token, ipAddress }) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.repository.revokeToken({ token, ipAddress });
        });
    }
}
exports.AccountService = AccountService;
//# sourceMappingURL=account.service.js.map