var transpileArnoldC = require('./transpile')

function execArnoldC(program) {
  let output = ''
  function print(s) {
    output += s + "\n";
  }
  eval(transpileArnoldC(program));
  return output;
}

module.exports = {
  exec: execArnoldC,
  js: transpileArnoldC
}
