/**
 * コンソールの文字色制御
 */

const RESET = 0;
const BOLD = 1;
const FAINT = 2;
const ITALIC = 3;
const UNDERLINE = 4;
const BLINK = 5;
const RAPID_BLINK = 6;
const INVERSE = 7;
const CONCEAL = 8;
const STRIKE = 9;

const FONT_COLOR = 30;
const LIGHT_FONT_COLOR = 90;
const BG_COLOR = 40;
const LIGHT_BG_COLOR = 100;

const BLACK = 0;
const RED = 1;
const GREEN = 2;
const YELLOW = 3;
const BLUE = 4;
const MAGENTA = 5;
const CYAN = 6;
const WHITE = 7;
const COLOR_CODE = 8;
const DEFAULT = 9;

/**
 * 黒
 */
export function black(text: string, bold = false) {
  const styles: number[] = [];
  if (bold) {
    styles.push(BOLD);
  }
  styles.push(FONT_COLOR + BLACK);

  return wrap(text, styles);
}

/**
 * 赤
 */
export function red(text: string, bold = false) {
  const styles: number[] = [];
  if (bold) {
    styles.push(BOLD);
  }
  styles.push(FONT_COLOR + RED);

  return wrap(text, styles);
}

/**
 * 緑
 */
export function green(text: string, bold = false) {
  const styles: number[] = [];
  if (bold) {
    styles.push(BOLD);
  }
  styles.push(FONT_COLOR + GREEN);

  return wrap(text, styles);
}

/**
 * 黄
 */
export function yellow(text: string, bold = false) {
  const styles: number[] = [];
  if (bold) {
    styles.push(BOLD);
  }
  styles.push(FONT_COLOR + YELLOW);

  return wrap(text, styles);
}

/**
 * 青
 */
export function blue(text: string, bold = false) {
  const styles: number[] = [];
  if (bold) {
    styles.push(BOLD);
  }
  styles.push(FONT_COLOR + BLUE);

  return wrap(text, styles);
}

/**
 * 紫
 */
export function magenta(text: string, bold = false) {
  const styles: number[] = [];
  if (bold) {
    styles.push(BOLD);
  }
  styles.push(FONT_COLOR + MAGENTA);

  return wrap(text, styles);
}

/**
 * 水色
 */
export function cyan(text: string, bold = false) {
  const styles: number[] = [];
  if (bold) {
    styles.push(BOLD);
  }
  styles.push(FONT_COLOR + CYAN);

  return wrap(text, styles);
}

/**
 * 白
 */
export function white(text: string, bold = false) {
  const styles: number[] = [];
  if (bold) {
    styles.push(BOLD);
  }
  styles.push(FONT_COLOR + WHITE);

  return wrap(text, styles);
}

/**
 * 色指定
 */
export function color(text: string, colorCode, bold = false) {
  const styles: number[] = [];
  if (bold) {
    styles.push(BOLD);
  }
  styles.push(FONT_COLOR + COLOR_CODE);
  styles.push(5);
  styles.push(colorCode);

  return wrap(text, styles);
}

/**
 * 背景赤
 */
export function bgRed(text: string) {
  const styles: number[] = [];
  styles.push(BG_COLOR + RED);

  return wrap(text, styles);
}

/**
 * 背景白
 */
export function bgWhite(text: string) {
  const styles: number[] = [];
  styles.push(BG_COLOR + WHITE);

  return wrap(text, styles);
}

/**
 * 色指定
 */
export function bgColor(text: string, colorCode: number) {
  const styles: number[] = [];
  styles.push(BG_COLOR + COLOR_CODE);
  styles.push(5);
  styles.push(colorCode);

  return wrap(text, styles);
}

function wrap(text: string, styles: number[]) {
  return `\x1b[${styles.join(';')}m${text}\x1b[${RESET}m`;
}
