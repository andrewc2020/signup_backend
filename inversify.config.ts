
import "reflect-metadata";
import "reflect-metadata";
import { Container } from 'inversify';

import SERVICE_IDENTIFIER from "./constants/identifiers";
import {IAccountRepository} from "./repositories/IAccountRepository";
import {AccountRepository} from "./repositories/Account.Repository"

let container = new Container();
container.bind<IAccountRepository>(SERVICE_IDENTIFIER.IAccountRepository).to(AccountRepository);

export default container;
