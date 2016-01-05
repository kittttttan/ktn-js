import {range} from '../../es6/range';

function testRange() {
  console.log('range(3)');
  for (let n of range(3)) {
    console.log(n);
  }
  console.log('range(1,3)');
  for (let n of range(1,3)) {
    console.log(n);
  }
  console.log('range(1,10,3)');
  for (let n of range(1,10,3)) {
    console.log(n);
  }
  console.log('range(10,0,-2)');
  for (let n of range(10,0,-2)) {
    console.log(n);
  }
  console.log('range(-1)');
  for (let n of range(-1)) {
    console.log(n);
  }
  console.log('range(1,0)');
  for (let n of range(1,0)) {
    console.log(n);
  }
  console.log('range(1,2,-1)');
  for (let n of range(1,2,-1)) {
    console.log(n);
  }
}

testRange();
