import { Schema, model, connect, Document } from 'mongoose';

interface RefreshToken extends Document{
    account: Schema.Types.ObjectId,
    token: string,
    expires: Date,
    created: Date,
    createdByIp: string,
    revoked: Date,
    revokedByIp: string,
    replacedByToken: string,
    isExpired: boolean,
    isActive: boolean

}

const schema = new Schema<RefreshToken>({
    account: { type: Schema.Types.ObjectId, ref: 'Account' },
    token: String,
    expires: Date,
    created: { type: Date, default: Date.now },
    createdByIp: String,
    revoked: Date,
    revokedByIp: String,
    replacedByToken: String
});

schema.virtual('isExpired').get(function (this: RefreshToken) : boolean {
    return new Date() >= this.expires;
});

schema.virtual('isActive').get(function (this : RefreshToken): boolean {
    return !this.revoked && !this.isExpired;
});


const RefreshTokenModel = model<RefreshToken>('RefreshToken', schema);
export default RefreshTokenModel