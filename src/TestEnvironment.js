"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const jest_environment_node_1 = tslib_1.__importDefault(require("jest-environment-node"));
const setupGlobals_1 = tslib_1.__importDefault(require("./setupGlobals"));
const mocking_1 = require("./mocking");
class TestEnvironment extends jest_environment_node_1.default {
    async setup() {
        await super.setup();
        setupGlobals_1.default(this.global);
        mocking_1.mockRoomPositionConstructor(this.global);
    }
}
exports.default = TestEnvironment;
