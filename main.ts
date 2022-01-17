import {IAccountRepository} from "./repositories/IAccountRepository";
import container from "./_helpers/installer";
import SERVICE_IDENTIFIER from "./Constants/Identifiers";
import { AccountService } from './accounts/account.service';


// Composition root
let accountRepo = container.get<IAccountRepository>(SERVICE_IDENTIFIER.IAccountRepository);
let service= new AccountService(accountRepo);

console.log(service.getAll());