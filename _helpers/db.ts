import config from '../config.json';
import  mongoose from 'mongoose';
const connectionOptions = { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false };
mongoose.connect(process.env.MONGODB_URI || config.connectionString, connectionOptions);
console.log(config.connectionString)
mongoose.Promise = global.Promise;

export default {
    Account: require('../accounts/account.model'),
    RefreshToken: require('../accounts/refresh-token.model'),
    isValidId
    
};

function isValidId(id) {
    return mongoose.Types.ObjectId.isValid(id);
}

