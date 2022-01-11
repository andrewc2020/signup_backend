"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const role_1 = __importDefault(require("../../_helpers/role"));
test('contains student', () => {
    expect(role_1.default.Student).toBe(2);
});
test('contains teacher', () => {
    expect(role_1.default.Teacher).toBe(3);
});
//# sourceMappingURL=role.test.js.map