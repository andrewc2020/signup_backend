import config from '../config.json';
import  mongoose from 'mongoose';
const connectionOptions = { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false };
//mongoose.connect(process.env.MONGODB_URI || config.connectionString);

mongoose.connect(config.connectionString, {
    serverSelectionTimeoutMS: 5000
  }).catch(err => console.log(err.reason));

mongoose.Promise = global.Promise;

export default {
    Account: require('../accounts/account.model'),
    RefreshToken: require('../accounts/refresh-token.model'),
    isValidId
    
};

function isValidId(id) {
    return mongoose.Types.ObjectId.isValid(id);
}

