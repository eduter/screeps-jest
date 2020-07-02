"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
var mocking_1 = require("./src/mocking");
Object.defineProperty(exports, "mockGlobal", { enumerable: true, get: function () { return mocking_1.mockGlobal; } });
Object.defineProperty(exports, "mockInstanceOf", { enumerable: true, get: function () { return mocking_1.mockInstanceOf; } });
Object.defineProperty(exports, "mockStructure", { enumerable: true, get: function () { return mocking_1.mockStructure; } });
__exportStar(require("./src/TestEnvironment"), exports);
