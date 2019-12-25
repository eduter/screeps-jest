"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jest_environment_node_1 = __importDefault(require("jest-environment-node"));
const setupGlobals_1 = __importDefault(require("./setupGlobals"));
const mocking_1 = require("./mocking");
class TestEnvironment extends jest_environment_node_1.default {
    async setup() {
        await super.setup();
        setupGlobals_1.default(this.global);
        mocking_1.mockRoomPositionConstructor(this.global);
    }
}
exports.default = TestEnvironment;
