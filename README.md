# Screeps-Jest
Environment and helper functions for unit testing your [Screeps](https://screeps.com) bot with Jest.

Features:
* All game constants and lodash automatically available in the global scope, when running unit tests
* Functions for mocking instances of game objects and globals
* Constructor of `RoomPosition` already mocked
* If you're using TypeScript (why wouldn't you?), mocks have fully inferred types and your IDE should autocomplete property names while creating your mocks

## How to install it?
```
yarn add screeps-jest --dev
```
or
```
npm install screeps-jest --save-dev
```

## How to set it up?
```javascript
// jest.config.js
module.exports = {
  // ...
  testEnvironment: "screeps-jest"
  // ...
};
```

## How to use it?
```typescript
// *.spec.ts
import { mockGlobal, mockInstanceOf, mockStructure } from "screeps-jest";

mockGlobal<Game>('Game', {
  time: 123
});

const creep = mockInstanceOf<Creep>({
  moveTo: () => OK,
  store: {
    getFreeCapacity: () => 0
  },
  transfer: () => ERR_NOT_IN_RANGE
});

const spawn = mockStructure(STRUCTURE_SPAWN, {
  hits: 5000,
  hitsMax: 5000
});
```

## More...
Check [screeps-typescript-jest-starter](https://github.com/eduter/screeps-typescript-jest-starter) for a more complete example of how to use [screeps-jest](https://github.com/eduter/screeps-jest) to unit test a Screeps bot in TypeScript.

If you find a bug or have a feature request, please [create an issue](https://github.com/eduter/screeps-jest/issues/new). If you have trouble using `screeps-jest`, ask on [#typescript](https://discord.com/channels/860665589738635336/865970767346925588) channel on Screeps' Discord server. I hang out there often, and someone else there might be able to help you also.
