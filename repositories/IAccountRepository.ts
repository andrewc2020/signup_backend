import Account from '../accounts/IAccount'
export interface IAccountRepository{
    getAll() 
    getById(id : string) 
    create(params: string[])
    update(id: string, params: any) 
    delete(id: string)
    basicDetails(account : Account )
    authenticate({email,password,ipAddress}) 
    refreshToken({ token, ipAddress })
    revokeToken({ token, ipAddress }) 
    register(params, origin)
    verifyEmail({ token })
    forgotPassword({ email }, origin) 
    validateResetToken({ token }: { token: any; })
    resetPassword({ token, password }) 




        

}

