
var expect = require('chai').expect;
var sinon = require('sinon');

 
var routes = require('../accounts/meme.routes');
var Meme = require('../accounts/meme.model');
 
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
        Meme.find.yields(null, expectedModels);
        var req = { params: { } };
        var res = {
            send: sinon.stub()
        };
 
        routes.allMemes(req, res);
 
        sinon.assert.calledWith(res.send, expectedModels);
    });
});