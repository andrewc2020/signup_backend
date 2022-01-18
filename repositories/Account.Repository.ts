import { IAccountRepository } from "./IAccountRepository";
import db from '../_helpers/db'
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import  config  from '../config.json';
import sendEmail from '../_helpers/send-email';
import Role from '../_helpers/role';

import { injectable } from 'inversify';


@injectable()


export class AccountRepository implements IAccountRepository {
    
    constructior() {
        db.run().then(() => console.log('db connected'),() => console.log('connection failed'))
    }
    async getAll() {
        const accounts = await db.Account.find();
        return accounts.map(x => this.basicDetails(x));
    }
    async getById(id: string) {

        const account = await this.getAccount(id);
        return this.basicDetails(account);

        return
    }
    async create(params) {
        // validate
        if (await db.Account.findOne({ email: params.email })) {
            throw 'Email "' + params.email + '" is already registered';
        }
        const account = new db.Account(params);
        account.verified = new Date(Date.now());

        // hash password
        account.passwordHash = this.hash(params.password);

        // save account
        await account.save();

        return this.basicDetails(account);

    }
    async update(id: string, params: any) {
        const account = await this.getAccount(id);

        // validate (if email was changed)
        if (params.email && account.email !== params.email && await db.Account.findOne({ email: params.email })) {
            throw 'Email "' + params.email + '" is already taken';
        }

        // hash password if it was entered
        if (params.password) {
            params.passwordHash = this.hash(params.password);
        }

        // copy params to account and save
        Object.assign(account, params);
        account.updated = new Date(Date.now());
        await account.save();

        return this.basicDetails(account);

    }
    async delete(id: string) {
        const account = await this.getAccount(id);
        await account.remove();

    }

    basicDetails(account) {
        const { id, title, firstName, lastName, email, role, created, updated, isVerified } = account;
        return { id, title, firstName, lastName, email, role, created, updated, isVerified };
    }

    async getAccount(id: string) {
        if (!db.isValidId(id)) throw 'Account not found';
        const account = await db.Account.findById(id);
        if (!account) throw 'Account not found';
        return account;
    }

    async authenticate({email,password,ipAddress}: any){
       
        const account = await db.Account.findOne({ email });

        if (!account || !account.isVerified || !bcrypt.compareSync(password, account.passwordHash)) {
            throw 'Email or password is incorrect';
        }
    
        // authentication successful so generate jwt and refresh tokens
        const jwtToken = this.generateJwtToken(account);
        const refreshToken = this.generateRefreshToken(account, ipAddress);
    
        // save refresh token
        await refreshToken.save();
    
        // return basic details and tokens
        return {
            ...this.basicDetails(account),
            jwtToken,
            refreshToken: refreshToken.token
        };

    }

    async refreshToken({ token, ipAddress }: { token: any; ipAddress: any; }) {
        const refreshToken = await this.getRefreshToken(token);
        const { account } = refreshToken;
    
        // replace old refresh token with a new one and save
        const newRefreshToken = this.generateRefreshToken(account, ipAddress);
        refreshToken.revoked = new Date(Date.now());
        refreshToken.revokedByIp = ipAddress;
        refreshToken.replacedByToken = newRefreshToken.token;
        await refreshToken.save();
        await newRefreshToken.save();
    
        // generate new jwt
        const jwtToken = this.generateJwtToken(account);
    
        // return basic details and tokens
        return {
            ...this.basicDetails(account),
            jwtToken,
            refreshToken: newRefreshToken.token
        };
    }

    async revokeToken({ token, ipAddress }: { token: any; ipAddress: any; }) {
        const refreshToken = await this.getRefreshToken(token);

        // revoke token and save
        refreshToken.revoked = new Date(Date.now());
        refreshToken.revokedByIp = ipAddress;
        await refreshToken.save();
        
    }
    async register(params, origin) {
        // validate
        if (await db.Account.findOne({ email: params.email })) {
            // send already registered error in email to prevent account enumeration
            return await this.sendAlreadyRegisteredEmail(params.email, origin);
        }
    
        // create account object
        const account = new db.Account(params);
    
        // first registered account is an admin
        const isFirstAccount = (await db.Account.countDocuments({})) === 0;
        account.role = isFirstAccount ? Role.Admin : Role.User;
        account.verificationToken = this.randomTokenString();
    
        // hash password
        account.passwordHash = this.hash(params.password);
    
        // save account
        await account.save();
    
        // send email
        await this.sendVerificationEmail(account, origin);
    }
    
    private async sendVerificationEmail(account, origin) {
        let message;
        if (origin) {
            const verifyUrl = `${origin}/account/verify-email?token=${account.verificationToken}`;
            message = `<p>Please click the below link to verify your email address:</p>
                       <p><a href="${verifyUrl}">${verifyUrl}</a></p>`;
        } else {
            message = `<p>Please use the below token to verify your email address with the <code>/account/verify-email</code> api route:</p>
                       <p><code>${account.verificationToken}</code></p>`;
        }
    
        await sendEmail({
            to: account.email,
            subject: 'Sign-up Verification API - Verify Email',
            html: `<h4>Verify Email</h4>
                   <p>Thanks for registering!</p>
                   ${message}`
        });
    }

    async verifyEmail({ token }) {
        const account = await db.Account.findOne({ verificationToken: token });
    
        if (!account) throw 'Verification failed';
    
        account.verified = new Date(Date.now());
        account.verificationToken = undefined;
        await account.save();
    }

    async forgotPassword({ email }, origin) {
        const account = await db.Account.findOne({ email });
    
        // always return ok response to prevent email enumeration
        if (!account) return;
    
        // create reset token that expires after 24 hours
        account.resetToken = {
            token: this.randomTokenString(),
            expires: new Date(Date.now() + 24*60*60*1000)
        };
        await account.save();
    
        // send email
        await this.sendPasswordResetEmail(account, origin);
    }

    async validateResetToken({ token }) {
        const account = await db.Account.findOne({
            'resetToken.token': token,
            'resetToken.expires': { $gt: Date.now() }
        });
    
        if (!account) throw 'Invalid token';
    }

    async resetPassword({ token, password }) {
        const account = await db.Account.findOne({
            'resetToken.token': token,
            'resetToken.expires': { $gt: Date.now() }
        });
    
        if (!account) throw 'Invalid token';
    
        // update password and remove reset token
        account.passwordHash = this.hash(password);
        account.passwordReset = new Date(Date.now());
        account.resetToken = undefined;
        await account.save();
    }
    

    private async sendPasswordResetEmail(account, origin) {
        let message;
        if (origin) {
            const resetUrl = `${origin}/account/reset-password?token=${account.resetToken.token}`;
            message = `<p>Please click the below link to reset your password, the link will be valid for 1 day:</p>
                       <p><a href="${resetUrl}">${resetUrl}</a></p>`;
        } else {
            message = `<p>Please use the below token to reset your password with the <code>/account/reset-password</code> api route:</p>
                       <p><code>${account.resetToken.token}</code></p>`;
        }
    
        await sendEmail({
            to: account.email,
            subject: 'Sign-up Verification API - Reset Password',
            html: `<h4>Reset Password Email</h4>
                   ${message}`
        });
    }
    
    
    private async sendAlreadyRegisteredEmail(email, origin) {
        let message;
        if (origin) {
            message = `<p>If you don't know your password please visit the <a href="${origin}/account/forgot-password">forgot password</a> page.</p>`;
        } else {
            message = `<p>If you don't know your password you can reset it via the <code>/account/forgot-password</code> api route.</p>`;
        }
    
        await sendEmail({
            to: email,
            subject: 'Sign-up Verification API - Email Already Registered',
            html: `<h4>Email Already Registered</h4>
                   <p>Your email <strong>${email}</strong> is already registered.</p>
                   ${message}`
        });
    }
    private async getRefreshToken(token) {
        const refreshToken = await db.RefreshToken.findOne({ token }).populate('account');
        if (!refreshToken || !refreshToken.isActive) throw 'Invalid token';
        return refreshToken;
    }

    private generateJwtToken(account) {
        // create a jwt token containing the account id that expires in 15 minutes
        return jwt.sign({ sub: account.id, id: account.id }, config.secret, { expiresIn: '15m' });
    }

    private generateRefreshToken(account, ipAddress) {
        // create a refresh token that expires in 7 days
        return new db.RefreshToken({
            account: account.id,
            token: this.randomTokenString(),
            expires: new Date(Date.now() + 7*24*60*60*1000),
            createdByIp: ipAddress
        });
    }

    private randomTokenString() {
        return crypto.randomBytes(40).toString('hex');
    }
    
    private hash(password: any): any {
        return bcrypt.hashSync(password, 10);
    }


}


