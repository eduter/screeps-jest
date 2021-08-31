"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockStructure = exports.mockInstanceOf = exports.mockRoomPositionConstructor = exports.mockGlobal = void 0;
const util = __importStar(require("util"));
const jestMock = __importStar(require("jest-mock"));
const pathToString_1 = require("./pathToString");
/**
 * Properties I've seen having been accessed internally by Jest's matchers and message formatters (there may be others).
 */
const jestInternalStuff = [
    Symbol.iterator,
    Symbol.toStringTag,
    "asymmetricMatch",
    "$$typeof",
    "nodeType",
    "@@__IMMUTABLE_ITERABLE__@@",
    "@@__IMMUTABLE_RECORD__@@",
    "_isMockFunction",
    "mockClear",
    "tagName",
    "hasAttribute",
];
/**
 * Mocks a global object instance, like Game or Memory.
 *
 * @param name - the name of the global
 * @param mockedProps - the properties you need to mock for your test
 * @param allowUndefinedAccess - if false, accessing a property not present in mockProps, will throw an exception
 */
function mockGlobal(name, mockedProps = {}, allowUndefinedAccess = false) {
    const g = global;
    const finalMockedProps = { ...mockedProps, mockClear: () => { } };
    g[name] = createMock(finalMockedProps, allowUndefinedAccess, [name]);
}
exports.mockGlobal = mockGlobal;
/**
 * Creates a mock instance of a class/interface.
 *
 * @param mockedProps - the properties you need to mock for your test
 * @param allowUndefinedAccess - if false, accessing a property not present in mockProps, will throw an exception
 */
function mockInstanceOf(mockedProps = {}, allowUndefinedAccess = false) {
    return createMock(mockedProps, allowUndefinedAccess, []);
}
exports.mockInstanceOf = mockInstanceOf;
function createMock(mockedProps, allowUndefinedAccess, path) {
    const target = {};
    if (typeof mockedProps === 'object' && mockedProps !== null) {
        Object.entries(mockedProps).forEach(([propName, mockedValue]) => {
            target[propName] =
                typeof mockedValue === 'function' ? jestMock.fn(mockedValue)
                    : Array.isArray(mockedValue) ? mockedValue.map((element, index) => createMock(element, allowUndefinedAccess, [...path, propName, index]))
                        : typeof mockedValue === 'object' && shouldMockObject(mockedValue) ? createMock(mockedValue, allowUndefinedAccess, [...path, propName])
                            : mockedValue;
        });
        return new Proxy(target, {
            get(t, p) {
                if (p in target) {
                    return target[p.toString()];
                }
                else if (!allowUndefinedAccess && !jestInternalStuff.includes(p)) {
                    throw new Error(`Unexpected access to unmocked property "${pathToString_1.pathToString([...path, p])}".\n` +
                        'Did you forget to mock it?\n' +
                        'If you intended for it to be undefined, you can explicitly set it to undefined (recommended) or set "allowUndefinedAccess" argument to true.');
                }
                else {
                    return undefined;
                }
            }
        });
    }
    return mockedProps;
}
function shouldMockObject(value) {
    return (value !== null
        && Object.getPrototypeOf(value) === Object.prototype
        && !util.types.isProxy(value));
}
/**
 * Keeps counters for each structure type, to generate unique IDs for them.
 */
const structureCounters = {};
/**
 * Creates a mock instance of a structure, with a unique ID, structure type and toJSON.
 * The unique IDs allow Jest's matcher (deep equality) to tell them apart.
 *
 * @param structureType
 * @param mockedProps - the additional properties you need to mock for your test
 */
function mockStructure(structureType, mockedProps = {}) {
    var _a;
    const count = ((_a = structureCounters[structureType]) !== null && _a !== void 0 ? _a : 0) + 1;
    structureCounters[structureType] = count;
    const id = `${structureType}${count}`;
    return mockInstanceOf({
        id,
        structureType,
        toJSON() {
            return { id, structureType };
        },
        ...mockedProps
    });
}
exports.mockStructure = mockStructure;
/**
 * Call this once before running tests that create new instances of RoomPosition.
 */
function mockRoomPositionConstructor(globalObject) {
    globalObject.RoomPosition = jestMock.fn(mockRoomPosition);
}
exports.mockRoomPositionConstructor = mockRoomPositionConstructor;
/**
 * Creates a mock instance of RoomPosition.
 */
function mockRoomPosition(x, y, roomName) {
    return mockInstanceOf({
        x,
        y,
        roomName,
        toJSON: () => ({ x, y, roomName })
    });
}
