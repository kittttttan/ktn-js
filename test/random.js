import {Random} from '../es6/random.js';

describe("Random", ()=> {

  it("random", ()=> {
    const r = new Random();

    r.init(0);
    expect(r.int32()).toEqual(2357136044);
    expect(r.int32()).toEqual(2546248239);
    expect(r.int32()).toEqual(3071714933);

    r.init(1);
    expect(r.int31()).toEqual(895547922);
    expect(r.int31()).toEqual(2141438069);
    expect(r.int31()).toEqual(1546885062);

    r.initByArray([2]);
    expect(r.real1()).toEqual(0.9560342701049601);
    expect(r.real2()).toEqual(0.8631093262229115);
    expect(r.real3()).toEqual(0.9478274871362373);
  });

});
