"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const meme_model_1 = __importDefault(require("../accounts/meme.model"));
describe('meme', function () {
    it('should be invalid if name is empty', function (done) {
        var m = new meme_model_1.default();
        m.validate(function (err) {
            (0, chai_1.expect)(err.errors.name).to.exist;
            done();
        });
    });
});
//# sourceMappingURL=meme.model.test.js.map