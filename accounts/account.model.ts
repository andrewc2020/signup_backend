//const mongoose = require('mongoose');
import { Schema, model, connect } from 'mongoose';

// Document interface
interface Account {
   
    email: string;
    passwordHash: string;
    title: string,
    firstName : string,
    lastName : string,
    acceptTerms: boolean,
    role: string,
    verificationToken: string,
    verified: Date,
    resetToken: {
        token: String,
        expires: Date
    },
    passwordReset: Date,
    created: Date ,
    updated: Date
  }

const schema = new Schema<Account>({
    email: { type: String, unique: true, required: true },
    passwordHash: { type: String, required: true },
    title: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    acceptTerms: Boolean,
    role: { type: String, required: true },
    verificationToken: String,
    verified: Date,
    resetToken: {
        token: String,
        expires: Date
    },
    passwordReset: Date,
    created: { type: Date, default: Date.now },
    updated: Date
});

schema.virtual('isVerified').get(function () {
    return !!(this.verified || this.passwordReset);
});

schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        // remove these props when object is serialized
        delete ret._id;
        delete ret.passwordHash;
    }
});
const AccountModel = model<Account>('Account', schema);

export default AccountModel