export default interface IAccount{
    [x: string]: any;
    id: any;
    email: { type: String, unique: true, required: true },
    passwordHash: { type: String, required: true },
    title: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    acceptTerms: Boolean,
    role: { type: String, required: true },
    created: any; 
    updated: any; 
    isVerified: any; 
    


}