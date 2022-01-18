import "reflect-metadata";
import chai, {expect} from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import Account from '../accounts/account.model'
import {IAccountRepository} from "../repositories/IAccountRepository";
import container from "../_helpers/installer";
import SERVICE_IDENTIFIER from "../constants/identifiers";
import { AccountService } from '../accounts/account.service';
import Role from '../_helpers/role'





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
       
      
       
        m.save((function(err : any) {
            expect(err.errors.email).to.exist;
            console.log(err.errors.email);
            done();
        }));
    
});

   it('should allow role to be an enum',(done) =>{
    var m = new Account({ email:"marygaylord@somewhere.com", title: "Ms", firstName: "Mary", lastName: "Gaylord", acceptTerms: true, role: Role.Admin});
    expect(m.role).to.equal('Admin')

    m.save((function(err : any) {
        expect(err.errors.role).not.to.exist;
       
        done();
    }));

   })
 
   describe("create", function() {
    it("should add a new user to the db", async function() {
      const stubValue  =  new Account({ email:"marygaylord@somewhere.com", title: "Ms", firstName: "Mary", lastName: "Gaylord", acceptTerms: true, role: Role.Admin, passwordHash: "qiprqr9339"});
      let accountRepo = container.get<IAccountRepository>(SERVICE_IDENTIFIER.IAccountRepository);
      let service = new AccountService(accountRepo);
      let methodStub: sinon.SinonStubbedMember<typeof service.register>;
      methodStub = sinon.stub(service, 'register');
      const stub = methodStub.resolves(stubValue)
      
      const user = await service.register(stubValue.email, stubValue.passwordHash);
      expect(stub.calledOnce).to.be.true;
      expect(user.id).to.equal(stubValue.id);
      expect(user.firstName).to.equal(stubValue.firstName);
      expect(user.lastName).to.equal(stubValue.lastName);
      expect(user.email).to.equal(stubValue.email);
      expect(user.role).to.equal(stubValue.role)
     
      stub.restore()
    });
  });

})

