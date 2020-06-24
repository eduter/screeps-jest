import {mockGlobal, mockInstanceOf, mockRoomPositionConstructor, mockStructure} from "./mocking";

describe('mockInstanceOf', () => {

  it('allows partial mocking of objects', () => {
    const mockCreep = mockInstanceOf<Creep>({ fatigue: 2 });
    expect(mockCreep.fatigue).toEqual(2);
  });

  it('throws if you access an unmocked field', () => {
    const mockCreep = mockInstanceOf<Creep>();
    expect(() => mockCreep.fatigue).toThrow('Unexpected access to unmocked property "fatigue".');
  });

  it('allows deep partial mocking of objects', () => {
    const mockCreep = mockInstanceOf<Creep>({
      body: [
        {
          hits: 100
        },
        {
          type: WORK
        }
      ],
      room: {
        controller: {
          owner: {
            username: "some-user"
          }
        }
      },
      build: () => OK
    });
    expect(mockCreep.body[1].type).toEqual(WORK);
    expect(mockCreep.room.controller?.owner.username).toEqual('some-user');
    expect(mockCreep.build(mockInstanceOf<ConstructionSite>())).toEqual(OK);
  });

  it('throws if you access an unmocked field of a deep partial mock', () => {
    const mockCreep = mockInstanceOf<Creep>({
      body: [
        {
          hits: 100
        },
        {
          type: WORK
        }
      ]
    });
    expect(() => mockCreep.body[1].hits).toThrow('Unexpected access to unmocked property "body[1].hits".');
  });

  it('allows access to unmocked fields, when allowUndefinedAccess is set to true', () => {
    const mockCreep = mockInstanceOf<Creep>({
      body: [
        {
          hits: 100
        }
      ]
    }, true);
    expect(mockCreep.body[0].boost).toBeUndefined();
  });

  it('respects the values of "allowUndefinedAccess" of nested mocks', () => {
    // allow outside, don't allow inside
    const mockCreep1 = mockInstanceOf<Creep>({
      body: [
        {
          hits: 100
        }
      ],
      room: mockInstanceOf<Room>({
        controller: {}
      }, false)
    }, true);
    expect(mockCreep1.body[0].boost).toBeUndefined();
    expect(() => mockCreep1.room.controller?.owner).toThrow('Unexpected access to unmocked property "controller.owner".');

    // allow inside, don't allow outside
    const mockCreep2 = mockInstanceOf<Creep>({
      body: [
        {
          hits: 100
        }
      ],
      room: mockInstanceOf<Room>({
        controller: {}
      }, true)
    }, false);
    expect(() => mockCreep2.body[0].boost).toThrow('Unexpected access to unmocked property "body[0].boost".');
    expect(mockCreep2.room.controller?.owner).toBeUndefined();
  });

});

describe('mockGlobal', () => {

  it('allows partial mocking of global objects', () => {
    expect(() => Game).toThrow('Game is not defined');
    mockGlobal<Game>('Game');
    expect(Game).toBeInstanceOf(Object);
    mockGlobal<Game>('Game', {
      cpu: {
        bucket: 7500
      }
    });
    expect(Game.cpu.bucket).toEqual(7500);
  });

  it('throws if you access an unmocked field', () => {
    mockGlobal<Game>('Game', {
      market: {
        orders: {
          someOrder: {
            active: true
          }
        }
      }
    });
    expect(() => Game.market.orders.someOrder.roomName).toThrow('Unexpected access to unmocked property "Game.market.orders.someOrder.roomName".');
  });

  it.skip('allows access to unmocked fields, when allowUndefinedAccess is set to true', () => {
    mockGlobal<Game>('Game', {
      market: {
        orders: {
          someOrder: {
            active: true
          }
        }
      }
    }, true);
    expect(Game.market.orders.someOrder.roomName).toBeUndefined();
  });

});

describe('mockStructure', () => {

  it('mocks a structure, based on a structure constant', () => {
    const expectedId = 'observer1';
    const mockObserver = mockStructure(STRUCTURE_OBSERVER, {
      observeRoom: () => OK
    });
    expect(mockObserver.structureType).toEqual(STRUCTURE_OBSERVER);
    expect(mockObserver.id).toEqual(expectedId);
    expect(mockObserver.observeRoom('sim')).toEqual(OK);
    expect(JSON.parse(JSON.stringify(mockObserver)).id).toEqual(expectedId);
  });

  it('generates unique IDs for mocked structures', () => {
    expect(mockStructure(STRUCTURE_SPAWN).id).toEqual('spawn1');
    expect(mockStructure(STRUCTURE_SPAWN).id).toEqual('spawn2');
    expect(mockStructure(STRUCTURE_CONTAINER).id).toEqual('container1');
    expect(mockStructure(STRUCTURE_SPAWN).id).toEqual('spawn3');
    expect(mockStructure(STRUCTURE_EXTENSION).id).toEqual('extension1');
  });

});

describe('mockRoomPositionConstructor', () => {

  it('mocks the constructor of RoomPosition', () => {
    const x = 10;
    const y = 20;
    const roomName = 'W1N1';

    if ('RoomPosition' in global) {
      delete global['RoomPosition'];
    }
    expect(() => RoomPosition).toThrow('RoomPosition is not defined');
    mockRoomPositionConstructor(global);
    expect(RoomPosition).toBeDefined();
    const pos = new RoomPosition(x, y, roomName);
    expect(pos.x).toEqual(10);
    expect(pos.y).toEqual(20);
    expect(pos.roomName).toEqual('W1N1');
    expect(JSON.parse(JSON.stringify(pos))).toEqual({ x, y, roomName });
  });

});
