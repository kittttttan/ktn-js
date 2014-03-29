###
StringConverter
###
class @StringConverter
  ###
  @method StringConverter.toZenkaku
  @param {string} str
  @return {string}
  ###
  @toZenkaku: (str) ->
    str
      .replace /\\/g, '¥'
      .replace /[ ]/g, '　'
      .replace /'/g, '’'
      .replace /"/g, '”'
      .replace /[\u0021-\u007e]/g, (a) ->
        String.fromCharCode a.charCodeAt(0) + 0xfee0

  ###
  @method StringConverter.toZenkakuKatakana
  @param {string} str
  @return {string}
  ###
  @toZenkakuKatakana: (str) ->
    conv = []
    c = ''
    n = 0
    zen = '。「」、ヲァィゥェォャュョッアイウエオカキクケコサシスセソ'+
          'タチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロ'+
          'ワン゛゜'
          .split ''
    han = '｡｢｣､ｦｧｨｩｪｫｬｭｮｯｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛ'+
          'ﾜﾝﾞﾟ'
          .split ''
    for i in [0...str.length] by 1
      c = str.charAt i
      n = han.indexOf c
      if n > -1
        c = zen[n]
      conv.push c
    conv.join ''

  ###
  @method StringConverter.toHankaku
  @param {string} str
  @return {string}
  ###
  @toHankaku: (str) ->
    str
      .replace /¥/g, '\\'
      .replace /[　]/g, ' '
      .replace /’/g, '\''
      .replace /”/g, '"'
      .replace /[\uff01-\uff5e]/g, (a) ->
        String.fromCharCode a.charCodeAt(0) - 0xfee0

  ###
  @method StringConverter.toHankakuKatakana
  @param {string} str
  @return {string}
  ###
  @toHankakuKatakana: (str) ->
    conv = []
    c = ''
    n = 0
    zen = '。「」、ヲァィゥェォャュョッアイウエオカキクケコサシスセソ'+
          'タチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロ'+
          'ワン゛゜'
          .split ''
    han = '｡｢｣､ｦｧｨｩｪｫｬｭｮｯｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛ'+
          'ﾜﾝﾞﾟ'
          .split ''
    for i in [0...str.length] by 1
      c = str.charAt i
      n = zen.indexOf c
      if n > -1
        c = han[n]
      conv.push c
    conv.join ''

  ###
  @method StringConverter.toKatakana
  @param {string} str
  @return {string}
  ###
  @toKatakana: (str) ->
    str
      .replace /[\u3041-\u3096]/g, (a) ->
        String.fromCharCode a.charCodeAt(0) + 0x60

  ###
  @method StringConverter.toHiragana
  @param {string} str
  @return {string}
  ###
  @toHiragana: (str) ->
    str.replace /[\u30A1-\u30F6]/g, (a) ->
      String.fromCharCode a.charCodeAt(0) - 0x60

  ###
  @method StringConverter.proper
  @param {string} str
  @return {string}
  ###
  @proper: (str) ->
    str.replace /(\w+)/g, (a) ->
      a
        .charAt 0
        .toUpperCase() +
      a
        .substring 1
        .toLowerCase()

  ###
  Convert string format
  @method StringConverter.format
  @param {string} str
  @param {number} option
  <pre>
    0 to upper
    1 to lower
    2 to zenkaku
    3 to hankaku
    4 to katakana
    5 to hiragana
    6 proper
  </pre>
  @return {string}
  ###
  @convert: (str, option) ->
    switch option
      when 0
        return str.toUpperCase()
      when 1
        return str.toLowerCase()
      when 2
        return @toZenkakuKatakana @toZenkaku str
      when 3
        return @toHankakuKatakana @toHankaku str
      when 4
        return @toKatakana str
      when 5
        return @toHiragana str
      when 6
        return @proper str
      else
        break
    str

# @nodoc
exports.StringConverter = @StringConverter
