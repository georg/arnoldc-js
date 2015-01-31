var arnoldC = require('./arnoldc');

function evalScripts() {
  document.removeEventListener('DOMContentLoaded', evalScripts);

  _.filter(document.getElementsByTagName('script'), function(script) {
    return script.type === 'application/arnoldc';
  }).forEach(function(script) {
    script.insertAdjacentHTML('afterend', '<pre>' + arnoldC.exec(script.text) + '</pre>');
  });
}

document.addEventListener('DOMContentLoaded', evalScripts);
