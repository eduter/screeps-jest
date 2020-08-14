"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const TestEnvironment_1 = __importDefault(require("./src/TestEnvironment"));
var mocking_1 = require("./src/mocking");
Object.defineProperty(exports, "mockGlobal", { enumerable: true, get: function () { return mocking_1.mockGlobal; } });
Object.defineProperty(exports, "mockInstanceOf", { enumerable: true, get: function () { return mocking_1.mockInstanceOf; } });
Object.defineProperty(exports, "mockStructure", { enumerable: true, get: function () { return mocking_1.mockStructure; } });
exports.default = TestEnvironment_1.default;
