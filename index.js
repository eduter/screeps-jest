"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
var mocking_1 = require("./src/mocking");
exports.mockGlobal = mocking_1.mockGlobal;
exports.mockInstanceOf = mocking_1.mockInstanceOf;
exports.mockStructure = mocking_1.mockStructure;
tslib_1.__exportStar(require("./src/TestEnvironment"), exports);
