import NodeEnvironment from "jest-environment-node";
declare class TestEnvironment extends NodeEnvironment {
    setup(): Promise<void>;
}
export default TestEnvironment;
