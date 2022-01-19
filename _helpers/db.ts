import {connect, Types, ObjectId} from 'mongoose'



import Account from '../accounts/account.model'
import RefreshToken from '../accounts/refresh-token.model'

async function run(): Promise<void> {
    // 4. Connect to MongoDB
    await connect(process.env.DB_CONN_STRING);

    console.log('connecting to database ...')
  
    
  }
  function isValidId(id) {
    
     
  return true;
}

  export default {Account, run, isValidId, RefreshToken}