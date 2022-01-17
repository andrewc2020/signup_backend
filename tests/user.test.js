import chai, {expect} from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import Account from '../accounts/account.model'
import {IAccountRepository} from "../repositories/IAccountRepository";
import { AccountRepository } from '../repositories/Account.Repository';
import container from "../_helpers/installer";
import SERVICE_IDENTIFIER from "../constants/identifiers";
import { AccountService } from '../accounts/account.service';
import ValidateRequest from '../_middleware/validate-request'
import factories from './factories'
import Role from '../_helpers/role'
import Types from '../_helpers/types'





chai.should();
chai.use(sinonChai);



describe('example tests',() =>{

    // beforeEach(function() {
    //     sinon.stub(AccountService, 'async register');
    // });



    // afterEach(function() {
    //     AccountService.restore();
    // });

    it('should be invalid if email is empty', function(done) {
        
        var m = new Account({  title: "Ms", firstName: "Mary", lastName: "Gaylord", acceptTerms: true, role:"Admin"});
       
      
       
        m.save((function(err) {
            expect(err.errors.email).to.exist;
            console.log(err.errors.email);
            done();
        }));
    
});

   it('should allow role to be an enum',(done) =>{
    var m = new Account({ email:"marygaylord@somewhere.com", title: "Ms", firstName: "Mary", lastName: "Gaylord", acceptTerms: true, role: Role.Admin});
    expect(m.role).to.equal('Admin')

    m.save((function(err) {
        expect(err.errors.role).not.to.exist;
       
        done();
    }));

   })
 
   describe("create", function() {
    it("should add a new user to the db", async function() {
          // Composition root
         
let accountRepo = container.get<IAccountRepository>(SERVICE_IDENTIFIER.IAccountRepository);
let service= new AccountService(accountRepo);
const stub = sinon.stub(service, "register").returns(stubValue); //?
      const stubValue =  new Account({ id:"rtiwptiwttpwt2850285", email:"marygaylord@somewhere.com", title: "Ms", firstName: "Mary", lastName: "Gaylord", acceptTerms: true, role: Role.Admin, passwordHash: "qiprqr9339"});
      // Composition root


      
      
      const user = service.register(stubValue.email, stubValue.passwordHash);
      expect(stub.calledOnce).to.be.true;
      expect(user.id).to.equal(stubValue.id);
      expect(user.firstName).to.equal(stubValue.firstName);
      expect(user.lastName).to.equal(stubValue.lastName);
      expect(user.email).to.equal(stubValue.email);
      expect(user.role).to.equal(stubValue.role)
      expect(user.createdAt).to.equal(stubValue.createdAt);
      expect(user.updatedAt).to.equal(stubValue.updatedAt);
      AccountService.register.restore()
    });
  });

})

