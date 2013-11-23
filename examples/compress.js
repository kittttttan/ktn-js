var fs = require('fs'),
    fname,
    res = '';

function rename(name) {
  var i = name.lastIndexOf('.');
  return i < 0 ?
      name + '_' :
      name.substring(0, i) + '_' + name.substring(i);
}

try {
  var argv = process.argv;
  if (argv.length <= 2) {
    console.log('  node compress.js input [output]');
    return;
  }
  src = argv[2]
  out = argv.length <= 3 ? rename(src) : argv[3];
  res = fs.readFileSync(src, 'utf8');
  res = res.replace(/[ \t]+/g, ' ').replace(/[\r\n]+/g, '');
  fs.writeFile(out, res, function(err) {
    if (err) throw err;
  });
} catch (e) {
  console.log(e);
}