import {connect, Types} from 'mongoose'
import config from '../config.json';
import Account from '../accounts/account.model'
import RefreshToken from '../accounts/refresh-token.model'

async function run(): Promise<void> {
    // 4. Connect to MongoDB
    await connect(config.connectionString);

    console.log('connected to database')
  
    
  }
  function isValidId(id) {
    return Types.ObjectId.isValid(id);
}

  export default {Account, run, isValidId, RefreshToken}