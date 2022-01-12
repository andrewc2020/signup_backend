var expect = require('chai').expect;
var sinon = require('sinon');
import factories from './factories'

 
var routes = require('../accounts/meme.routes');
import Meme from '../accounts/meme.model';
 
describe('routes', function() {
    beforeEach(function() {
        sinon.stub(Meme, 'find');
    });
 
 
    afterEach(function() {
        Meme.find.restore();
    });
 
    it('should send all memes', function() {
        var a = { name: 'a' };
        var b = { name: 'b' };
        var expectedModels = [a, b];
        Meme.find.yields(null, expectedModels);//?
        var req = { params: { } };
        var res = {
            send: sinon.stub()
        };
 
        routes.allMemes(req, res);
 
        sinon.assert.calledWith(res.send, expectedModels); 
    });

    it('should send all memes using data', function() {
        var a = factories.validMeme();
        var b = factories.validMeme();
        var expectedModels = [a, b];
        Meme.find.yields(null, expectedModels);
        var req = { params: { } };
        var res = {
          send: sinon.stub()
        };
       
        routes.allMemes(req, res);
        console.log(expectedModels) //?
        sinon.assert.calledWith(res.send, expectedModels);
      });
});