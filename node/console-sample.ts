import {moveLinetop, clearRight, clear, moveTo, moveLineUp, moveRight} from '../src/node/console-ansi.ts';
import {red, color} from '../src/node/console-color.ts';

clear();
moveTo();
console.log('starting...');
moveLineUp(1);
moveRight(11);

setTimeout(() => {
  moveLinetop();
  clearRight();
  process.stdout.write(red('test1'));
}, 1000);

setTimeout(() => {
  moveLinetop();
  clearRight();
  process.stdout.write(color('test2', 0x2F));
}, 2000);
