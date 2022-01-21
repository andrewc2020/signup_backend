import IAccount from '../accounts/IAccount';
import Account from '../accounts/IAccount'
export interface IAccountRepository{
    getAll() : any
    getById(id : string) : any
    create(params: IAccount) : any
    update(id: string, params: any) : any
    delete(id: string) : any
    basicDetails(account : Account ) : any
    authenticate({email,password,ipAddress}:{email: string, password: string, ipAddress: string}) : any
    refreshToken({ token, ipAddress }:{ token: string, ipAddress: string}) : any
    revokeToken({ token, ipAddress }: { token: string, ipAddress: string}) : any
    register(params: { email: string; password: string; }, origin: any) : any
    verifyEmail({ token }: {token: string}) : any
    forgotPassword({ email }: { email: string}, origin : any) : any
    validateResetToken({ token }: { token: string; }) : any
    resetPassword({ token, password }: {token: string, password: string} ) : any
    start(): void




        

}

