"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountRepository = void 0;
const db_1 = __importDefault(require("../_helpers/db"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const crypto_1 = __importDefault(require("crypto"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_json_1 = __importDefault(require("../config.json"));
const send_email_1 = __importDefault(require("../_helpers/send-email"));
const role_1 = __importDefault(require("../_helpers/role"));
const inversify_1 = require("inversify");
let AccountRepository = class AccountRepository {
    constructior() {
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const accounts = yield db_1.default.Account.find();
            return accounts.map(x => this.basicDetails(x));
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const account = yield this.getAccount(id);
            return this.basicDetails(account);
            return;
        });
    }
    create(params) {
        return __awaiter(this, void 0, void 0, function* () {
            // validate
            if (yield db_1.default.Account.findOne({ email: params.email })) {
                throw 'Email "' + params.email + '" is already registered';
            }
            const account = new db_1.default.Account(params);
            account.verified = Date.now();
            // hash password
            account.passwordHash = this.hash(params.password);
            // save account
            yield account.save();
            return this.basicDetails(account);
        });
    }
    update(id, params) {
        return __awaiter(this, void 0, void 0, function* () {
            const account = yield this.getAccount(id);
            // validate (if email was changed)
            if (params.email && account.email !== params.email && (yield db_1.default.Account.findOne({ email: params.email }))) {
                throw 'Email "' + params.email + '" is already taken';
            }
            // hash password if it was entered
            if (params.password) {
                params.passwordHash = this.hash(params.password);
            }
            // copy params to account and save
            Object.assign(account, params);
            account.updated = Date.now();
            yield account.save();
            return this.basicDetails(account);
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const account = yield this.getAccount(id);
            yield account.remove();
        });
    }
    basicDetails(account) {
        const { id, title, firstName, lastName, email, role, created, updated, isVerified } = account;
        return { id, title, firstName, lastName, email, role, created, updated, isVerified };
    }
    getAccount(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!db_1.default.isValidId(id))
                throw 'Account not found';
            const account = yield db_1.default.Account.findById(id);
            if (!account)
                throw 'Account not found';
            return account;
        });
    }
    authenticate({ email, password, ipAddress }) {
        return __awaiter(this, void 0, void 0, function* () {
            const account = yield db_1.default.Account.findOne({ email });
            if (!account || !account.isVerified || !bcryptjs_1.default.compareSync(password, account.passwordHash)) {
                throw 'Email or password is incorrect';
            }
            // authentication successful so generate jwt and refresh tokens
            const jwtToken = this.generateJwtToken(account);
            const refreshToken = this.generateRefreshToken(account, ipAddress);
            // save refresh token
            yield refreshToken.save();
            // return basic details and tokens
            return Object.assign(Object.assign({}, this.basicDetails(account)), { jwtToken, refreshToken: refreshToken.token });
        });
    }
    refreshToken({ token, ipAddress }) {
        return __awaiter(this, void 0, void 0, function* () {
            const refreshToken = yield this.getRefreshToken(token);
            const { account } = refreshToken;
            // replace old refresh token with a new one and save
            const newRefreshToken = this.generateRefreshToken(account, ipAddress);
            refreshToken.revoked = Date.now();
            refreshToken.revokedByIp = ipAddress;
            refreshToken.replacedByToken = newRefreshToken.token;
            yield refreshToken.save();
            yield newRefreshToken.save();
            // generate new jwt
            const jwtToken = this.generateJwtToken(account);
            // return basic details and tokens
            return Object.assign(Object.assign({}, this.basicDetails(account)), { jwtToken, refreshToken: newRefreshToken.token });
        });
    }
    revokeToken({ token, ipAddress }) {
        return __awaiter(this, void 0, void 0, function* () {
            const refreshToken = yield this.getRefreshToken(token);
            // revoke token and save
            refreshToken.revoked = Date.now();
            refreshToken.revokedByIp = ipAddress;
            yield refreshToken.save();
        });
    }
    register(params, origin) {
        return __awaiter(this, void 0, void 0, function* () {
            // validate
            if (yield db_1.default.Account.findOne({ email: params.email })) {
                // send already registered error in email to prevent account enumeration
                return yield this.sendAlreadyRegisteredEmail(params.email, origin);
            }
            // create account object
            const account = new db_1.default.Account(params);
            // first registered account is an admin
            const isFirstAccount = (yield db_1.default.Account.countDocuments({})) === 0;
            account.role = isFirstAccount ? role_1.default.Admin : role_1.default.User;
            account.verificationToken = this.randomTokenString();
            // hash password
            account.passwordHash = this.hash(params.password);
            // save account
            yield account.save();
            // send email
            yield this.sendVerificationEmail(account, origin);
        });
    }
    sendVerificationEmail(account, origin) {
        return __awaiter(this, void 0, void 0, function* () {
            let message;
            if (origin) {
                const verifyUrl = `${origin}/account/verify-email?token=${account.verificationToken}`;
                message = `<p>Please click the below link to verify your email address:</p>
                       <p><a href="${verifyUrl}">${verifyUrl}</a></p>`;
            }
            else {
                message = `<p>Please use the below token to verify your email address with the <code>/account/verify-email</code> api route:</p>
                       <p><code>${account.verificationToken}</code></p>`;
            }
            yield (0, send_email_1.default)({
                to: account.email,
                subject: 'Sign-up Verification API - Verify Email',
                html: `<h4>Verify Email</h4>
                   <p>Thanks for registering!</p>
                   ${message}`
            });
        });
    }
    verifyEmail({ token }) {
        return __awaiter(this, void 0, void 0, function* () {
            const account = yield db_1.default.Account.findOne({ verificationToken: token });
            if (!account)
                throw 'Verification failed';
            account.verified = Date.now();
            account.verificationToken = undefined;
            yield account.save();
        });
    }
    forgotPassword({ email }, origin) {
        return __awaiter(this, void 0, void 0, function* () {
            const account = yield db_1.default.Account.findOne({ email });
            // always return ok response to prevent email enumeration
            if (!account)
                return;
            // create reset token that expires after 24 hours
            account.resetToken = {
                token: this.randomTokenString(),
                expires: new Date(Date.now() + 24 * 60 * 60 * 1000)
            };
            yield account.save();
            // send email
            yield this.sendPasswordResetEmail(account, origin);
        });
    }
    validateResetToken({ token }) {
        return __awaiter(this, void 0, void 0, function* () {
            const account = yield db_1.default.Account.findOne({
                'resetToken.token': token,
                'resetToken.expires': { $gt: Date.now() }
            });
            if (!account)
                throw 'Invalid token';
        });
    }
    resetPassword({ token, password }) {
        return __awaiter(this, void 0, void 0, function* () {
            const account = yield db_1.default.Account.findOne({
                'resetToken.token': token,
                'resetToken.expires': { $gt: Date.now() }
            });
            if (!account)
                throw 'Invalid token';
            // update password and remove reset token
            account.passwordHash = this.hash(password);
            account.passwordReset = Date.now();
            account.resetToken = undefined;
            yield account.save();
        });
    }
    sendPasswordResetEmail(account, origin) {
        return __awaiter(this, void 0, void 0, function* () {
            let message;
            if (origin) {
                const resetUrl = `${origin}/account/reset-password?token=${account.resetToken.token}`;
                message = `<p>Please click the below link to reset your password, the link will be valid for 1 day:</p>
                       <p><a href="${resetUrl}">${resetUrl}</a></p>`;
            }
            else {
                message = `<p>Please use the below token to reset your password with the <code>/account/reset-password</code> api route:</p>
                       <p><code>${account.resetToken.token}</code></p>`;
            }
            yield (0, send_email_1.default)({
                to: account.email,
                subject: 'Sign-up Verification API - Reset Password',
                html: `<h4>Reset Password Email</h4>
                   ${message}`
            });
        });
    }
    sendAlreadyRegisteredEmail(email, origin) {
        return __awaiter(this, void 0, void 0, function* () {
            let message;
            if (origin) {
                message = `<p>If you don't know your password please visit the <a href="${origin}/account/forgot-password">forgot password</a> page.</p>`;
            }
            else {
                message = `<p>If you don't know your password you can reset it via the <code>/account/forgot-password</code> api route.</p>`;
            }
            yield (0, send_email_1.default)({
                to: email,
                subject: 'Sign-up Verification API - Email Already Registered',
                html: `<h4>Email Already Registered</h4>
                   <p>Your email <strong>${email}</strong> is already registered.</p>
                   ${message}`
            });
        });
    }
    getRefreshToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const refreshToken = yield db_1.default.RefreshToken.findOne({ token }).populate('account');
            if (!refreshToken || !refreshToken.isActive)
                throw 'Invalid token';
            return refreshToken;
        });
    }
    generateJwtToken(account) {
        // create a jwt token containing the account id that expires in 15 minutes
        return jsonwebtoken_1.default.sign({ sub: account.id, id: account.id }, config_json_1.default.secret, { expiresIn: '15m' });
    }
    generateRefreshToken(account, ipAddress) {
        // create a refresh token that expires in 7 days
        return new db_1.default.RefreshToken({
            account: account.id,
            token: this.randomTokenString(),
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            createdByIp: ipAddress
        });
    }
    randomTokenString() {
        return crypto_1.default.randomBytes(40).toString('hex');
    }
    hash(password) {
        return bcryptjs_1.default.hashSync(password, 10);
    }
};
AccountRepository = __decorate([
    (0, inversify_1.injectable)()
], AccountRepository);
exports.AccountRepository = AccountRepository;
//# sourceMappingURL=Account.Repository.js.map