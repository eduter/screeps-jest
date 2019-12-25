# Screeps-Jest
Environment and helper functions for unit testing your Screeps code with Jest.

Features:
* All game constants and lodash automatically available in the global scope, when running unit tests
* Functions for mocking instances of game objects and globals
* Constructor of `RoomPosition` already mocked
* If you're using TypeScript (why wouldn't you?), mocks have fully inferred types and your IDE should autocomplete property names while creating your mocks

## How to install it?
```
yarn add eduter/screeps-jest#1.0.0 --dev
```
or
```
npm install eduter/screeps-jest#1.0.0 --save-dev
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

If you find a bug or have a feature request, please [create an issue](https://github.com/eduter/screeps-jest/issues/new). If you have trouble using `screeps-jest`, ask on [channel #typescript on Screeps Slack](https://screeps.slack.com/?redir=%2Fgantry%2Fauth%3Fapp%3Dclient%26lc%3D1577313194%26return_to%3D%252Fclient%252FT0HJCPP9T%252FC1NF1JV4P%26teams%3D). I usually hang out there and someone else there might be able to help you.
