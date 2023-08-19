export function toZenkaku(str: string): string {
  return str
    .replace(/\\/g, '¥')
    .replace(/[ ]/g, '　')
    .replace(/'/g, '’')
    .replace(/"/g, '”')
    .replace(/[\u0021-\u007e]/g, (a: string): string =>
      String.fromCharCode(a.charCodeAt(0) + 0xfee0)
    );
}

export function toZenkakuKatakana(str: string): string {
  const conv: string[] = [];
  const zen: string[] = '。「」、ヲァィゥェォャュョッアイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワン゛゜'.split('');
  const han: string[] = '｡｢｣､ｦｧｨｩｪｫｬｭｮｯｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝﾞﾟ'.split('');
  for (let i = 0, ref: number = str.length; i < ref; ++i) {
    let c: string = str.charAt(i);
    const n: number = han.indexOf(c);
    if (n > -1) {
      c = zen[n];
    }
    conv.push(c);
  }
  return conv.join('');
}

export function toHankaku(str: string): string {
  /* eslint no-irregular-whitespace: 0 */
  return str
    .replace(/¥/g, '\\')
    .replace(/[　]/g, ' ')
    .replace(/’/g, '\'')
    .replace(/”/g, '"')
    .replace(/[\uff01-\uff5e]/g, (a: string): string =>
      String.fromCharCode(a.charCodeAt(0) - 0xfee0)
    );
}

export function toHankakuKatakana(str: string): string {
  const conv: string[] = [];
  const zen: string[] = '。「」、ヲァィゥェォャュョッアイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワン゛゜'.split('');
  const han: string[] = '｡｢｣､ｦｧｨｩｪｫｬｭｮｯｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝﾞﾟ'.split('');
  for (let i = 0, ref: number = str.length; i < ref; ++i) {
    let c: string = str.charAt(i);
    const n: number = zen.indexOf(c);
    if (n > -1) {
      c = han[n];
    }
    conv.push(c);
  }
  return conv.join('');
}

export function toKatakana(str: string): string {
  return str.replace(/[\u3041-\u3096]/g, (a: string): string =>
    String.fromCharCode(a.charCodeAt(0) + 0x60)
  );
}

export function toHiragana(str: string): string {
  return str.replace(/[\u30A1-\u30F6]/g, (a: string): string =>
    String.fromCharCode(a.charCodeAt(0) - 0x60)
  );
}

export function proper(str: string): string {
  return str.replace(/(\w+)/g, (a: string): string =>
    a.charAt(0).toUpperCase() + a.substring(1).toLowerCase()
  );
}

/**
 * Convert string format
 * <pre>
 *   0 to upper
 *   1 to lower
 *   2 to zenkaku
 *   3 to hankaku
 *   4 to katakana
 *   5 to hiragana
 *   6 proper
 * </pre>
 * @return {string}
 */
export function convert(str: string, option: number): string {
  switch (option) {
    case 0:
      return str.toUpperCase();
    case 1:
      return str.toLowerCase();
    case 2:
      return toZenkakuKatakana(toZenkaku(str));
    case 3:
      return toHankakuKatakana(toHankaku(str));
    case 4:
      return toKatakana(str);
    case 5:
      return toHiragana(str);
    case 6:
      return proper(str);
    default:
      break;
  }
  return str;
}
