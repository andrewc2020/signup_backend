export interface IAccountService{
    authenticate({email,password,ipAddress}: any):any
    refreshToken({ token, ipAddress }: any)
    revokeToken({ token, ipAddress }: any)
    register(params:any, origin :any)
    verifyEmail({token}:any)
    forgotPassword({ email }, origin)
    validateResetToken({ token })
    resetPassword({ token, password })
    getAll()
    getById(id:string, params)
    create(params: any)
    update(id:string, params: any)
    delete(id:string)
}