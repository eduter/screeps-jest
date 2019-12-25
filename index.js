"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var mocking_1 = require("./src/mocking");
exports.mockGlobal = mocking_1.mockGlobal;
exports.mockInstanceOf = mocking_1.mockInstanceOf;
exports.mockStructure = mocking_1.mockStructure;
__export(require("./src/TestEnvironment"));
