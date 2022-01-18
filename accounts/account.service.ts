import {IAccountRepository} from '../repositories/IAccountRepository'
import { IAccountService } from './IAccountService';


export class AccountService implements IAccountService{
    
    private repository : IAccountRepository;
    
        constructor(repository:IAccountRepository){
            this.repository= repository;
        }
   
    async register(params: any, origin: any) {
        try{
        return await this.repository.register(params, origin);
        }
        catch(err){
            throw new Error('Method not implemented.');
        }
    }
    verifyEmail({ token }: any) {
       return this.repository.verifyEmail({token})
    }
    forgotPassword({ email }: { email: any; }, origin: any) {
        return this.repository.forgotPassword({email}, origin)
    }
    validateResetToken({ token }: { token: any; }) {
       return this.repository.validateResetToken({token})
    }
    resetPassword({ token, password }: { token: any; password: any; }) {
        try{
           return this.repository.resetPassword({token, password})
        }
        catch(err){
            throw new Error('Method not implemented.');

        }
        
    }
    getAll() {

        try{

            return this.repository.getAll()

        }
        catch{
            throw new Error('Method not implemented.');

        }
       
    }
    getById(id: string, params: any) {

        try{
            return this.repository.getById(id)
        }
        catch{

            throw new Error('Method not implemented.');

        }
        
    }
    create(params: any) {
        try{
            return this.repository.create(params)
        }
        catch{
        throw new Error('Method not implemented.');


        }
    }

    update(id: string, params: any) {
        try{
            return this.repository.update(id, params)
        }
        catch{
            throw new Error('Method not implemented.');
        }
        
    }

    
    delete(id: string) {
        try{
            return this.repository.delete(id)
        }
        catch{

            throw new Error('Method not implemented.');
        }
        
    }

    async authenticate({email,password,ipAddress}: any){
       
    
        // return basic details and tokens
        return this.repository.authenticate({email,password,ipAddress})

    }

    async refreshToken({ token, ipAddress }) {
        return this.repository.refreshToken({token, ipAddress})
    }

    async revokeToken({ token, ipAddress }: { token: any; ipAddress: any; }) {
       return this.repository.revokeToken({token, ipAddress})
    }





       
    
    }