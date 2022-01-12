"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _calculateAge_1 = require("./_calculateAge");
describe.only('age from dob', () => {
    test.only('should return age in years from dob provided in us format mm/dd/yyyy ', () => {
        return expect((0, _calculateAge_1._calculateAge)(new Date('12/05/1955'))).toBe(66);
    });
    test.only('should return expected age in years from dob ', () => {
        return expect((0, _calculateAge_1._calculateAge)(new Date('11/29/2015'))).toBe(6);
    });
    test.only('should return expected age of wife in years from dob ', () => {
        return expect((0, _calculateAge_1._calculateAge)(new Date('10/14/1959'))).toBe(62);
    });
    test.only('should fail ', () => {
        return expect((0, _calculateAge_1._calculateAge)(new Date('29/11/1959'))).toBe(NaN);
    });
});
//# sourceMappingURL=calculateAge.test.js.map