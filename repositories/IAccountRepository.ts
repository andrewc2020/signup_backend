import Account from '../accounts/IAccount'
export interface IAccountRepository{
    getAll() 
    getById(id : string) 
    create(params: string[])
    update(id: string, params: any)
    delete(id: string)
    basicDetails(account : Account )

}

