import "reflect-metadata";
import { Container } from "inversify";

import SERVICE_IDENTIFIER from "../constants/identifiers";
import {IAccountRepository} from "../repositories/IAccountRepository";
import {AccountRepository} from "../Repositories/VinylCatalog";

let container = new Container();
container.bind<IAccountRepository>(SERVICE_IDENTIFIER.IAccountRepository).to(VinylCatalog);

export default container;
