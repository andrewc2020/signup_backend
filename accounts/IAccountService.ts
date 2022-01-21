export interface IAccountService{
    authenticate({email,password,ipAddress}: any):any
    refreshToken({ token, ipAddress }: any) : any
    revokeToken({ token, ipAddress }: any) : any
    register(params:any, origin :any) : any
    verifyEmail({token}:any) : boolean
    forgotPassword({ email }: { email : string} , origin : any) : any
    validateResetToken({ token }: { token: string}) : any
    resetPassword({ token, password}: {token: string, password: string}) : void
    getAll() : any
    getById(id:string, params: any): any
    create(params: any): any
    update(id:string, params: any) : any
    delete(id:string): any
}