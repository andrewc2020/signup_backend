import sinon from 'sinon'
import sinonChai from 'sinon-chai';
import chai, {expect} from 'chai';

chai.should()
chai.use(sinonChai)

function hello(name : string, cb : (name: string) => string){
    cb("hello " + name);
    

}

describe("hello", () =>{
 it("should call callback with correct greeting", () =>{
     let cb = sinon.spy();
     hello("foo", cb);
     cb.should.have.been.calledWith('hello foo');
     
 })
 it("should call callback with correct greeting using expect", () =>{
    let cb = sinon.spy();
    hello("foo", cb);
    
    expect(cb).to.have.been.calledWith('hello foo');
    
})


})


