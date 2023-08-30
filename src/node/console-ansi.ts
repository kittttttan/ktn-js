/**
 * ANSIエスケープシーケンス チートシート
 * https://qiita.com/PruneMazui/items/8a023347772620025ad6
 */
const ESC = '\x1b';
const ANSI = '[';

/**
 * @param c シーケンス識別文字
 * @param a 引数1
 * @param b 引数2
 */
function printCode(c: string, a?: number, b?: number) {
  let args = '';
  if (a) {
    args += `${a}`;
  }
  if (b) {
    args += `;${b}`;
  }
  process.stdout.write(`${ESC}${ANSI}${args}${c}`);
}

export function clear() {
  printCode('J', 2);
}

export function clearLine() {
  printCode('K', 2);
}

export function clearRight() {
  printCode('K');
}

/**
 * @param n 
 */
export function moveUp(n = 1) {
  printCode('A', n);
}

/**
 * @param n 
 */
export function moveDown(n = 1) {
  printCode('B', n);
}

/**
 * @param n 
 */
export function moveRight(n = 1) {
  printCode('C', n);
}

/**
 * @param n 
 */
export function moveLeft(n = 1) {
  printCode('D', n);
}

/**
 * @param n 
 */
export function moveLineDown(n = 1) {
  printCode('E', n);
}

/**
 * @param n 
 */
export function moveLineUp(n = 1) {
  printCode('F', n);
}

/**
 * @param n 
 */
export function moveLinetop(n = 0) {
  printCode('G', n);
}

/**
 * @param x 
 * @param y 
 */
export function moveTo(x = 0, y = 0) {
  printCode('H', x, y);
}
