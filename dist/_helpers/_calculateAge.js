"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._calculateAge = void 0;
function _calculateAge(birthday) {
    var ageDifMs = Date.now() - birthday.getTime(); /*?*/
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1971);
}
exports._calculateAge = _calculateAge;
//# sourceMappingURL=_calculateAge.js.map