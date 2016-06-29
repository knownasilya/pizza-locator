import Ember from 'ember';

export default function () {
  var args = argsToArray(arguments);
  var argsLength = args.length;
  var funcIndex, keys, throttled;

  if (typeof args[argsLength - 2] === 'function') {
    funcIndex = argsLength - 2;
  }
  else if (typeof args[argsLength - 3] === 'function') {
    funcIndex = argsLength - 3;
  }
  else {
    throw Error('Invalid arguments');
  }

  throttled = args.slice(funcIndex);
  keys = args.slice(0, funcIndex);

  return Ember.observer.apply(Ember, keys.concat(function() {
    Ember.run.throttle(this, throttled[0], throttled[1], throttled[2] || false);
  }));
}

function argsToArray(args) {
  var len = args.length;
  var arr = new Array(len);
  var i = -1;

  while (++i < len) {
    arr[i] = args[i];
  }

  return arr;
}
