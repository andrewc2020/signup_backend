import { IAccountRepository } from "./IAccountRepository";
import db from '../_helpers/db'
import bcrypt from 'bcryptjs';
import crypto from 'crypto';


export class AccountRepository implements IAccountRepository {
    constructior() {

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
        account.verified = Date.now();

        // hash password
        account.passwordHash = hash(params.password);

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
            params.passwordHash = hash(params.password);
        }

        // copy params to account and save
        Object.assign(account, params);
        account.updated = Date.now();
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


}

function hash(password: any): any {
    return bcrypt.hashSync(password, 10);
}
