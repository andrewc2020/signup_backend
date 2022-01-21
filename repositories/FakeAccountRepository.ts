import { injectable } from 'inversify';
import IAccount from "../accounts/IAccount";
import { IAccountRepository } from "./IAccountRepository";


@injectable()


export class FakeAccountRepository implements IAccountRepository {
    constructor(){

    }
    start() {
        throw new Error('Method not implemented.');
    }
    getAll() {
        throw new Error("Method not implemented.");
    }
    getById(id: string) {
        throw new Error("Method not implemented.");
    }
    create(params: IAccount) {
        throw new Error("Method not implemented.");
    }
    update(id: string, params: any) {
        throw new Error("Method not implemented.");
    }
    delete(id: string) {
        throw new Error("Method not implemented.");
    }
    basicDetails(account: IAccount) {
        throw new Error("Method not implemented.");
    }
    authenticate({ email, password, ipAddress }: { email: any; password: any; ipAddress: any; }) {
        throw new Error("Method not implemented.");
    }
    refreshToken({ token, ipAddress }: { token: any; ipAddress: any; }) {
        throw new Error("Method not implemented.");
    }
    revokeToken({ token, ipAddress }: { token: any; ipAddress: any; }) {
        throw new Error("Method not implemented.");
    }
    register(params:  { email: string; password: string; }, origin: any) {
        throw new Error("Method not implemented.");
    }
    verifyEmail({ token }: { token: any; }) {
        throw new Error("Method not implemented.");
    }
    forgotPassword({ email }: { email: any; }, origin: any) {
        throw new Error("Method not implemented.");
    }
    validateResetToken({ token }: { token: any; }) {
        throw new Error("Method not implemented.");
    }
    resetPassword({ token, password }: { token: any; password: any; }) {
        throw new Error("Method not implemented.");
    }
}