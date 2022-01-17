"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const role_1 = __importDefault(require("../_helpers/role"));
const router = express_1.default.Router();
const Joi = require('joi');
const validateRequest = require('../_middleware/validate-request');
const authorize = require('../_middleware/authorize');
const installer_1 = __importDefault(require("../_helpers/installer"));
const identifiers_1 = __importDefault(require("../constants/identifiers"));
const account_service_1 = require("../accounts/account.service");
// routes
router.post('/authenticate', authenticateSchema, authenticate);
router.post('/refresh-token', refreshToken);
router.post('/revoke-token', authorize(), revokeTokenSchema, revokeToken);
router.post('/register', registerSchema, register);
router.post('/verify-email', verifyEmailSchema, verifyEmail);
router.post('/forgot-password', forgotPasswordSchema, forgotPassword);
router.post('/validate-reset-token', validateResetTokenSchema, validateResetToken);
router.post('/reset-password', resetPasswordSchema, resetPassword);
router.get('/', authorize(role_1.default.Admin), getAll);
router.get('/:id', authorize(), getById);
router.post('/', authorize(role_1.default.Admin), createSchema, create);
router.put('/:id', authorize(), updateSchema, update);
router.delete('/:id', authorize(), _delete);
module.exports = router;
// Composition root
let accountRepo = installer_1.default.get(identifiers_1.default.IAccountRepository);
let service = new account_service_1.AccountService(accountRepo);
function authenticateSchema(req, res, next) {
    const schema = Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required()
    });
    validateRequest(req, next, schema);
}
function authenticate(req, res, next) {
    const { email, password } = req.body;
    const ipAddress = req.ip;
    service.authenticate({ email, password, ipAddress })
        .then((_a) => {
        var { refreshToken } = _a, account = __rest(_a, ["refreshToken"]);
        setTokenCookie(res, refreshToken);
        res.json(account);
    })
        .catch(next);
}
function refreshToken(req, res, next) {
    const token = req.cookies.refreshToken;
    const ipAddress = req.ip;
    service.refreshToken({ token, ipAddress })
        .then((_a) => {
        var { refreshToken } = _a, account = __rest(_a, ["refreshToken"]);
        setTokenCookie(res, refreshToken);
        res.json(account);
    })
        .catch(next);
}
function revokeTokenSchema(req, res, next) {
    const schema = Joi.object({
        token: Joi.string().empty('')
    });
    validateRequest(req, next, schema);
}
function revokeToken(req, res, next) {
    // accept token from request body or cookie
    const token = req.body.token || req.cookies.refreshToken;
    const ipAddress = req.ip;
    if (!token)
        return res.status(400).json({ message: 'Token is required' });
    // users can revoke their own tokens and admins can revoke any tokens
    if (!req.user.ownsToken(token) && req.user.role !== role_1.default.Admin) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    service.revokeToken({ token, ipAddress })
        .then(() => res.json({ message: 'Token revoked' }))
        .catch(next);
}
function registerSchema(req, res, next) {
    const schema = Joi.object({
        title: Joi.string().required(),
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
        confirmPassword: Joi.string().valid(Joi.ref('password')).required(),
        acceptTerms: Joi.boolean().valid(true).required()
    });
    validateRequest(req, next, schema);
}
function register(req, res, next) {
    service.register(req.body, req.get('origin'))
        .then(() => res.json({ message: 'Registration successful, please check your email for verification instructions' }))
        .catch(next);
}
function verifyEmailSchema(req, res, next) {
    const schema = Joi.object({
        token: Joi.string().required()
    });
    validateRequest(req, next, schema);
}
function verifyEmail(req, res, next) {
    service.verifyEmail(req.body)
        .then(() => res.json({ message: 'Verification successful, you can now login' }))
        .catch(next);
}
function forgotPasswordSchema(req, res, next) {
    const schema = Joi.object({
        email: Joi.string().email().required()
    });
    validateRequest(req, next, schema);
}
function forgotPassword(req, res, next) {
    service.forgotPassword(req.body, req.get('origin'))
        .then(() => res.json({ message: 'Please check your email for password reset instructions' }))
        .catch(next);
}
function validateResetTokenSchema(req, res, next) {
    const schema = Joi.object({
        token: Joi.string().required()
    });
    validateRequest(req, next, schema);
}
function validateResetToken(req, res, next) {
    service.validateResetToken(req.body)
        .then(() => res.json({ message: 'Token is valid' }))
        .catch(next);
}
function resetPasswordSchema(req, res, next) {
    const schema = Joi.object({
        token: Joi.string().required(),
        password: Joi.string().min(6).required(),
        confirmPassword: Joi.string().valid(Joi.ref('password')).required()
    });
    validateRequest(req, next, schema);
}
function resetPassword(req, res, next) {
    service.resetPassword(req.body)
        .then(() => res.json({ message: 'Password reset successful, you can now login' }))
        .catch(next);
}
function getAll(req, res, next) {
    service.getAll()
        .then(accounts => res.json(accounts))
        .catch(next);
}
function getById(req, res, next) {
    // users can get their own account and admins can get any account
    if (req.params.id !== req.user.id && req.user.role !== role_1.default.Admin) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    service.getById(req.params.id, req.params)
        .then(account => account ? res.json(account) : res.sendStatus(404))
        .catch(next);
}
function createSchema(req, res, next) {
    const schema = Joi.object({
        title: Joi.string().required(),
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
        confirmPassword: Joi.string().valid(Joi.ref('password')).required(),
        role: Joi.string().valid(role_1.default.Admin, role_1.default.User).required()
    });
    validateRequest(req, next, schema);
}
function create(req, res, next) {
    service.create(req.body)
        .then(account => res.json(account))
        .catch(next);
}
function updateSchema(req, res, next) {
    const schemaRules = {
        title: Joi.string().empty(''),
        firstName: Joi.string().empty(''),
        lastName: Joi.string().empty(''),
        email: Joi.string().email().empty(''),
        password: Joi.string().min(6).empty(''),
        confirmPassword: Joi.string().valid(Joi.ref('password')).empty(''),
        role: role_1.default.User
    };
    // only admins can update role
    if (req.user.role === role_1.default.Admin) {
        schemaRules.role = Joi.string().valid(role_1.default.Admin, role_1.default.User).empty('');
    }
    const schema = Joi.object(schemaRules).with('password', 'confirmPassword');
    validateRequest(req, next, schema);
}
function update(req, res, next) {
    // users can update their own account and admins can update any account
    if (req.params.id !== req.user.id && req.user.role !== role_1.default.Admin) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    service.update(req.params.id, req.body)
        .then(account => res.json(account))
        .catch(next);
}
function _delete(req, res, next) {
    // users can delete their own account and admins can delete any account
    if (req.params.id !== req.user.id && req.user.role !== role_1.default.Admin) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    service.delete(req.params.id)
        .then(() => res.json({ message: 'Account deleted successfully' }))
        .catch(next);
}
// helper functions
function setTokenCookie(res, token) {
    // create cookie with refresh token that expires in 7 days
    const cookieOptions = {
        httpOnly: true,
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    };
    res.cookie('refreshToken', token, cookieOptions);
}
//# sourceMappingURL=accounts.controller.js.map