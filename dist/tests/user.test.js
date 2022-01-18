"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const chai_1 = __importStar(require("chai"));
const sinon_1 = __importDefault(require("sinon"));
const sinon_chai_1 = __importDefault(require("sinon-chai"));
const account_model_1 = __importDefault(require("../accounts/account.model"));
const installer_1 = __importDefault(require("../_helpers/installer"));
const identifiers_1 = __importDefault(require("../constants/identifiers"));
const account_service_1 = require("../accounts/account.service");
const role_1 = __importDefault(require("../_helpers/role"));
chai_1.default.should();
chai_1.default.use(sinon_chai_1.default);
describe('example tests', () => {
    // beforeEach(function() {
    //     sinon.stub(AccountService, 'async register');
    // });
    // afterEach(function() {
    //     AccountService.restore();
    // });
    it('should be invalid if email is empty', function (done) {
        var m = new account_model_1.default({ title: "Ms", firstName: "Mary", lastName: "Gaylord", acceptTerms: true, role: "Admin" });
        m.save((function (err) {
            (0, chai_1.expect)(err.errors.email).to.exist;
            console.log(err.errors.email);
            done();
        }));
    });
    it('should allow role to be an enum', (done) => {
        var m = new account_model_1.default({ email: "marygaylord@somewhere.com", title: "Ms", firstName: "Mary", lastName: "Gaylord", acceptTerms: true, role: role_1.default.Admin });
        (0, chai_1.expect)(m.role).to.equal('Admin');
        m.save((function (err) {
            (0, chai_1.expect)(err.errors.role).not.to.exist;
            done();
        }));
    });
    describe("create", function () {
        it("should add a new user to the db", function () {
            return __awaiter(this, void 0, void 0, function* () {
                const stubValue = new account_model_1.default({ email: "marygaylord@somewhere.com", title: "Ms", firstName: "Mary", lastName: "Gaylord", acceptTerms: true, role: role_1.default.Admin, passwordHash: "qiprqr9339" });
                let accountRepo = installer_1.default.get(identifiers_1.default.IAccountRepository);
                let service = new account_service_1.AccountService(accountRepo);
                let methodStub;
                methodStub = sinon_1.default.stub(service, 'register');
                const stub = methodStub.resolves(stubValue);
                const user = yield service.register(stubValue.email, stubValue.passwordHash);
                (0, chai_1.expect)(stub.calledOnce).to.be.true;
                (0, chai_1.expect)(user.id).to.equal(stubValue.id);
                (0, chai_1.expect)(user.firstName).to.equal(stubValue.firstName);
                (0, chai_1.expect)(user.lastName).to.equal(stubValue.lastName);
                (0, chai_1.expect)(user.email).to.equal(stubValue.email);
                (0, chai_1.expect)(user.role).to.equal(stubValue.role);
                stub.restore();
            });
        });
    });
});
//# sourceMappingURL=user.test.js.map