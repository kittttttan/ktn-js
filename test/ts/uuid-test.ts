/// <reference path="typings/jasmine.d.ts"/>
import Uuid from '../../src/ts/uuid';

describe("uuid", ()=> {

  it("uuid", ()=> {
    const u = Uuid.uuid();
    expect(u.version).toEqual(4);
    expect(u.variant).toEqual(8);

    const str = u.toString();
    expect(str.length).toEqual(36);

    const ns = '74c45628-1bd5-4bf8-8df7-0315dd66987d';
    const n = u.fromString(ns);
    expect(n.version).toEqual(4);
    expect(n.variant).toEqual(8);
    expect(n.toString()).toEqual(ns);
  });

});
