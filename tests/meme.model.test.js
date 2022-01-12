import {expect}  from 'chai';
import sinon, {test} from 'sinon';

 
import Meme from '../accounts/meme.model';
 

    it('should be invalid if name is empty', function(done) {
        
            var m = new Meme();
     
            m.validate(function(err) {
                expect(err.errors.name).to.exist;
                done();
            });
        
    });

    it('should have validation error for repost if not dank', function(done) {
        //1. set up the model in a way the validation should fail
        var m = new Meme({ repost: true });
     
        //2. run validate
        m.validate(function(err) {
            //3. check for the error property we need
            expect(err.errors.repost).to.exist;
            done();
        });
    });
     
    