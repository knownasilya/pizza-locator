(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _templateObject = _taggedTemplateLiteral(['\n    <google-map>\n    </google-map>\n  '], ['\n    <google-map>\n    </google-map>\n  ']);

exports.default = mapView;

var _choo = require('choo');

var _choo2 = _interopRequireDefault(_choo);

var _onLoad = require('on-load');

var _onLoad2 = _interopRequireDefault(_onLoad);

var _mapStyles = require('../map-styles.json');

var _mapStyles2 = _interopRequireDefault(_mapStyles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var html = _choo2.default.view;
function mapView(params, state, send) {
  var tree = html(_templateObject);

  (0, _onLoad2.default)(tree, function () {
    loadMap(tree, state);
  });

  return tree;
}

function loadMap(tree, state) {
  var map = new google.maps.Map(tree, {
    center: state.stores.userLocation,
    zoom: 5,
    styles: _mapStyles2.default
  });
  var stores = state.stores.visibleStores;

  stores.forEach(function (store) {
    store.marker = new google.maps.Marker({
      position: { lat: store.lat, lng: store.lng },
      title: store.name,
      label: 'P'
    });
  });

  stores.forEach(function (store) {
    return store.marker.setMap(map);
  });
  google.maps.event.trigger(map, 'resize');
  state.stores.map = map;
}

},{"../map-styles.json":4,"choo":11,"on-load":32}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _templateObject = _taggedTemplateLiteral(['\n    <side-bar>\n      <button onclick=', '>All Locations</button>\n      <button onclick=', '>Closest Locations</button>\n      <ul>\n        ', '\n      </ul>\n    </side-bar>\n  '], ['\n    <side-bar>\n      <button onclick=', '>All Locations</button>\n      <button onclick=', '>Closest Locations</button>\n      <ul>\n        ', '\n      </ul>\n    </side-bar>\n  ']),
    _templateObject2 = _taggedTemplateLiteral(['\n              <li onclick=', '>\n                ', '', '\n              </li>\n            '], ['\n              <li onclick=', '>\n                ', '', '\n              </li>\n            ']);

exports.default = sideBarView;

var _choo = require('choo');

var _choo2 = _interopRequireDefault(_choo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var html = _choo2.default.view;
function sideBarView(params, state, send) {
  var allStores = state.stores.visibleStores;

  var tree = html(_templateObject, function () {
    return send('stores:showAll');
  }, function () {
    return send('stores:showClosest');
  }, allStores.map(function (item) {
    return html(_templateObject2, function () {
      return send('stores:select', { payload: item });
    }, item.name, item.distance ? ': ' + item.distance + 'mi' : '');
  }));

  return tree;
}

},{"choo":11}],3:[function(require,module,exports){
'use strict';

var _templateObject = _taggedTemplateLiteral(['\n    <main class="app">\n      ', '\n      ', '\n    </main>\n  '], ['\n    <main class="app">\n      ', '\n      ', '\n    </main>\n  ']);

var _choo = require('choo');

var _choo2 = _interopRequireDefault(_choo);

var _stores = require('./stores');

var _stores2 = _interopRequireDefault(_stores);

var _googleMap = require('./components/google-map');

var _googleMap2 = _interopRequireDefault(_googleMap);

var _sideBar = require('./components/side-bar');

var _sideBar2 = _interopRequireDefault(_sideBar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var app = (0, _choo2.default)();
var computeDistanceBetween = google.maps.geometry.spherical.computeDistanceBetween;

var iw = new google.maps.InfoWindow();

app.model({
  namespace: 'stores',
  state: {
    visibleStores: _stores2.default,
    userLocation: { lat: 42.33012354634199, lng: -70.95623016357422 }
  },

  reducers: {
    showAll: function showAll(action, state) {
      state.visibleStores = _stores2.default;
      return state;
    },
    updateVisible: function updateVisible(action, state) {
      state.visibleStores = action.payload;
      state.userLocation = action.location;
      return state;
    }
  },

  effects: {
    select: function select(action, state, send) {
      var store = action.payload;
      iw.setPosition({ lat: store.lat, lng: store.lng });
      iw.setContent(store.name);
      iw.open(state.map, store.marker);
    },
    showClosest: function showClosest(action, state, send) {
      navigator.geolocation.getCurrentPosition(function (position) {
        var userLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        var closest = _stores2.default.map(function (store) {
          var distance = computeDistanceBetween(new google.maps.LatLng(store.lat, store.lng), userLocation);
          store.distance = Math.ceil(distance * 0.000621371);
          return store;
        }).filter(function (store) {
          return store.distance < 100;
        });
        send('stores:updateVisible', { payload: closest, location: userLocation });
      });
    }
  }
});

var mainView = function mainView(params, state, send) {
  return _choo2.default.view(_templateObject, (0, _googleMap2.default)(params, state, send), (0, _sideBar2.default)(params, state, send));
};

app.router(function (route) {
  return [route('/', mainView)];
});

var tree = app.start();

document.body.appendChild(tree);

},{"./components/google-map":1,"./components/side-bar":2,"./stores":35,"choo":11}],4:[function(require,module,exports){
module.exports=[{"featureType":"all","elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#000000"},{"lightness":40}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#000000"},{"lightness":16}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":17},{"weight":1.2}]},{"featureType":"administrative.locality","elementType":"labels.text.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":21}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":16}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":19}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":17}]}]

},{}],5:[function(require,module,exports){
// http://wiki.commonjs.org/wiki/Unit_Testing/1.0
//
// THIS IS NOT TESTED NOR LIKELY TO WORK OUTSIDE V8!
//
// Originally from narwhal.js (http://narwhaljs.org)
// Copyright (c) 2009 Thomas Robinson <280north.com>
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the 'Software'), to
// deal in the Software without restriction, including without limitation the
// rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
// sell copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
// ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

// when used in node, this will actually load the util module we depend on
// versus loading the builtin util module as happens otherwise
// this is a bug in node module loading as far as I am concerned
var util = require('util/');

var pSlice = Array.prototype.slice;
var hasOwn = Object.prototype.hasOwnProperty;

// 1. The assert module provides functions that throw
// AssertionError's when particular conditions are not met. The
// assert module must conform to the following interface.

var assert = module.exports = ok;

// 2. The AssertionError is defined in assert.
// new assert.AssertionError({ message: message,
//                             actual: actual,
//                             expected: expected })

assert.AssertionError = function AssertionError(options) {
  this.name = 'AssertionError';
  this.actual = options.actual;
  this.expected = options.expected;
  this.operator = options.operator;
  if (options.message) {
    this.message = options.message;
    this.generatedMessage = false;
  } else {
    this.message = getMessage(this);
    this.generatedMessage = true;
  }
  var stackStartFunction = options.stackStartFunction || fail;

  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, stackStartFunction);
  }
  else {
    // non v8 browsers so we can have a stacktrace
    var err = new Error();
    if (err.stack) {
      var out = err.stack;

      // try to strip useless frames
      var fn_name = stackStartFunction.name;
      var idx = out.indexOf('\n' + fn_name);
      if (idx >= 0) {
        // once we have located the function frame
        // we need to strip out everything before it (and its line)
        var next_line = out.indexOf('\n', idx + 1);
        out = out.substring(next_line + 1);
      }

      this.stack = out;
    }
  }
};

// assert.AssertionError instanceof Error
util.inherits(assert.AssertionError, Error);

function replacer(key, value) {
  if (util.isUndefined(value)) {
    return '' + value;
  }
  if (util.isNumber(value) && !isFinite(value)) {
    return value.toString();
  }
  if (util.isFunction(value) || util.isRegExp(value)) {
    return value.toString();
  }
  return value;
}

function truncate(s, n) {
  if (util.isString(s)) {
    return s.length < n ? s : s.slice(0, n);
  } else {
    return s;
  }
}

function getMessage(self) {
  return truncate(JSON.stringify(self.actual, replacer), 128) + ' ' +
         self.operator + ' ' +
         truncate(JSON.stringify(self.expected, replacer), 128);
}

// At present only the three keys mentioned above are used and
// understood by the spec. Implementations or sub modules can pass
// other keys to the AssertionError's constructor - they will be
// ignored.

// 3. All of the following functions must throw an AssertionError
// when a corresponding condition is not met, with a message that
// may be undefined if not provided.  All assertion methods provide
// both the actual and expected values to the assertion error for
// display purposes.

function fail(actual, expected, message, operator, stackStartFunction) {
  throw new assert.AssertionError({
    message: message,
    actual: actual,
    expected: expected,
    operator: operator,
    stackStartFunction: stackStartFunction
  });
}

// EXTENSION! allows for well behaved errors defined elsewhere.
assert.fail = fail;

// 4. Pure assertion tests whether a value is truthy, as determined
// by !!guard.
// assert.ok(guard, message_opt);
// This statement is equivalent to assert.equal(true, !!guard,
// message_opt);. To test strictly for the value true, use
// assert.strictEqual(true, guard, message_opt);.

function ok(value, message) {
  if (!value) fail(value, true, message, '==', assert.ok);
}
assert.ok = ok;

// 5. The equality assertion tests shallow, coercive equality with
// ==.
// assert.equal(actual, expected, message_opt);

assert.equal = function equal(actual, expected, message) {
  if (actual != expected) fail(actual, expected, message, '==', assert.equal);
};

// 6. The non-equality assertion tests for whether two objects are not equal
// with != assert.notEqual(actual, expected, message_opt);

assert.notEqual = function notEqual(actual, expected, message) {
  if (actual == expected) {
    fail(actual, expected, message, '!=', assert.notEqual);
  }
};

// 7. The equivalence assertion tests a deep equality relation.
// assert.deepEqual(actual, expected, message_opt);

assert.deepEqual = function deepEqual(actual, expected, message) {
  if (!_deepEqual(actual, expected)) {
    fail(actual, expected, message, 'deepEqual', assert.deepEqual);
  }
};

function _deepEqual(actual, expected) {
  // 7.1. All identical values are equivalent, as determined by ===.
  if (actual === expected) {
    return true;

  } else if (util.isBuffer(actual) && util.isBuffer(expected)) {
    if (actual.length != expected.length) return false;

    for (var i = 0; i < actual.length; i++) {
      if (actual[i] !== expected[i]) return false;
    }

    return true;

  // 7.2. If the expected value is a Date object, the actual value is
  // equivalent if it is also a Date object that refers to the same time.
  } else if (util.isDate(actual) && util.isDate(expected)) {
    return actual.getTime() === expected.getTime();

  // 7.3 If the expected value is a RegExp object, the actual value is
  // equivalent if it is also a RegExp object with the same source and
  // properties (`global`, `multiline`, `lastIndex`, `ignoreCase`).
  } else if (util.isRegExp(actual) && util.isRegExp(expected)) {
    return actual.source === expected.source &&
           actual.global === expected.global &&
           actual.multiline === expected.multiline &&
           actual.lastIndex === expected.lastIndex &&
           actual.ignoreCase === expected.ignoreCase;

  // 7.4. Other pairs that do not both pass typeof value == 'object',
  // equivalence is determined by ==.
  } else if (!util.isObject(actual) && !util.isObject(expected)) {
    return actual == expected;

  // 7.5 For all other Object pairs, including Array objects, equivalence is
  // determined by having the same number of owned properties (as verified
  // with Object.prototype.hasOwnProperty.call), the same set of keys
  // (although not necessarily the same order), equivalent values for every
  // corresponding key, and an identical 'prototype' property. Note: this
  // accounts for both named and indexed properties on Arrays.
  } else {
    return objEquiv(actual, expected);
  }
}

function isArguments(object) {
  return Object.prototype.toString.call(object) == '[object Arguments]';
}

function objEquiv(a, b) {
  if (util.isNullOrUndefined(a) || util.isNullOrUndefined(b))
    return false;
  // an identical 'prototype' property.
  if (a.prototype !== b.prototype) return false;
  // if one is a primitive, the other must be same
  if (util.isPrimitive(a) || util.isPrimitive(b)) {
    return a === b;
  }
  var aIsArgs = isArguments(a),
      bIsArgs = isArguments(b);
  if ((aIsArgs && !bIsArgs) || (!aIsArgs && bIsArgs))
    return false;
  if (aIsArgs) {
    a = pSlice.call(a);
    b = pSlice.call(b);
    return _deepEqual(a, b);
  }
  var ka = objectKeys(a),
      kb = objectKeys(b),
      key, i;
  // having the same number of owned properties (keys incorporates
  // hasOwnProperty)
  if (ka.length != kb.length)
    return false;
  //the same set of keys (although not necessarily the same order),
  ka.sort();
  kb.sort();
  //~~~cheap key test
  for (i = ka.length - 1; i >= 0; i--) {
    if (ka[i] != kb[i])
      return false;
  }
  //equivalent values for every corresponding key, and
  //~~~possibly expensive deep test
  for (i = ka.length - 1; i >= 0; i--) {
    key = ka[i];
    if (!_deepEqual(a[key], b[key])) return false;
  }
  return true;
}

// 8. The non-equivalence assertion tests for any deep inequality.
// assert.notDeepEqual(actual, expected, message_opt);

assert.notDeepEqual = function notDeepEqual(actual, expected, message) {
  if (_deepEqual(actual, expected)) {
    fail(actual, expected, message, 'notDeepEqual', assert.notDeepEqual);
  }
};

// 9. The strict equality assertion tests strict equality, as determined by ===.
// assert.strictEqual(actual, expected, message_opt);

assert.strictEqual = function strictEqual(actual, expected, message) {
  if (actual !== expected) {
    fail(actual, expected, message, '===', assert.strictEqual);
  }
};

// 10. The strict non-equality assertion tests for strict inequality, as
// determined by !==.  assert.notStrictEqual(actual, expected, message_opt);

assert.notStrictEqual = function notStrictEqual(actual, expected, message) {
  if (actual === expected) {
    fail(actual, expected, message, '!==', assert.notStrictEqual);
  }
};

function expectedException(actual, expected) {
  if (!actual || !expected) {
    return false;
  }

  if (Object.prototype.toString.call(expected) == '[object RegExp]') {
    return expected.test(actual);
  } else if (actual instanceof expected) {
    return true;
  } else if (expected.call({}, actual) === true) {
    return true;
  }

  return false;
}

function _throws(shouldThrow, block, expected, message) {
  var actual;

  if (util.isString(expected)) {
    message = expected;
    expected = null;
  }

  try {
    block();
  } catch (e) {
    actual = e;
  }

  message = (expected && expected.name ? ' (' + expected.name + ').' : '.') +
            (message ? ' ' + message : '.');

  if (shouldThrow && !actual) {
    fail(actual, expected, 'Missing expected exception' + message);
  }

  if (!shouldThrow && expectedException(actual, expected)) {
    fail(actual, expected, 'Got unwanted exception' + message);
  }

  if ((shouldThrow && actual && expected &&
      !expectedException(actual, expected)) || (!shouldThrow && actual)) {
    throw actual;
  }
}

// 11. Expected to throw an error:
// assert.throws(block, Error_opt, message_opt);

assert.throws = function(block, /*optional*/error, /*optional*/message) {
  _throws.apply(this, [true].concat(pSlice.call(arguments)));
};

// EXTENSION! This is annoying to write outside this module.
assert.doesNotThrow = function(block, /*optional*/message) {
  _throws.apply(this, [false].concat(pSlice.call(arguments)));
};

assert.ifError = function(err) { if (err) {throw err;}};

var objectKeys = Object.keys || function (obj) {
  var keys = [];
  for (var key in obj) {
    if (hasOwn.call(obj, key)) keys.push(key);
  }
  return keys;
};

},{"util/":10}],6:[function(require,module,exports){

},{}],7:[function(require,module,exports){
if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}

},{}],8:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

(function () {
  try {
    cachedSetTimeout = setTimeout;
  } catch (e) {
    cachedSetTimeout = function () {
      throw new Error('setTimeout is not defined');
    }
  }
  try {
    cachedClearTimeout = clearTimeout;
  } catch (e) {
    cachedClearTimeout = function () {
      throw new Error('clearTimeout is not defined');
    }
  }
} ())
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = cachedSetTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    cachedClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        cachedSetTimeout(drainQueue, 0);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],9:[function(require,module,exports){
module.exports = function isBuffer(arg) {
  return arg && typeof arg === 'object'
    && typeof arg.copy === 'function'
    && typeof arg.fill === 'function'
    && typeof arg.readUInt8 === 'function';
}
},{}],10:[function(require,module,exports){
(function (process,global){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var formatRegExp = /%[sdj%]/g;
exports.format = function(f) {
  if (!isString(f)) {
    var objects = [];
    for (var i = 0; i < arguments.length; i++) {
      objects.push(inspect(arguments[i]));
    }
    return objects.join(' ');
  }

  var i = 1;
  var args = arguments;
  var len = args.length;
  var str = String(f).replace(formatRegExp, function(x) {
    if (x === '%%') return '%';
    if (i >= len) return x;
    switch (x) {
      case '%s': return String(args[i++]);
      case '%d': return Number(args[i++]);
      case '%j':
        try {
          return JSON.stringify(args[i++]);
        } catch (_) {
          return '[Circular]';
        }
      default:
        return x;
    }
  });
  for (var x = args[i]; i < len; x = args[++i]) {
    if (isNull(x) || !isObject(x)) {
      str += ' ' + x;
    } else {
      str += ' ' + inspect(x);
    }
  }
  return str;
};


// Mark that a method should not be used.
// Returns a modified function which warns once by default.
// If --no-deprecation is set, then it is a no-op.
exports.deprecate = function(fn, msg) {
  // Allow for deprecating things in the process of starting up.
  if (isUndefined(global.process)) {
    return function() {
      return exports.deprecate(fn, msg).apply(this, arguments);
    };
  }

  if (process.noDeprecation === true) {
    return fn;
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (process.throwDeprecation) {
        throw new Error(msg);
      } else if (process.traceDeprecation) {
        console.trace(msg);
      } else {
        console.error(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
};


var debugs = {};
var debugEnviron;
exports.debuglog = function(set) {
  if (isUndefined(debugEnviron))
    debugEnviron = process.env.NODE_DEBUG || '';
  set = set.toUpperCase();
  if (!debugs[set]) {
    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
      var pid = process.pid;
      debugs[set] = function() {
        var msg = exports.format.apply(exports, arguments);
        console.error('%s %d: %s', set, pid, msg);
      };
    } else {
      debugs[set] = function() {};
    }
  }
  return debugs[set];
};


/**
 * Echos the value of a value. Trys to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Object} opts Optional options object that alters the output.
 */
/* legacy: obj, showHidden, depth, colors*/
function inspect(obj, opts) {
  // default options
  var ctx = {
    seen: [],
    stylize: stylizeNoColor
  };
  // legacy...
  if (arguments.length >= 3) ctx.depth = arguments[2];
  if (arguments.length >= 4) ctx.colors = arguments[3];
  if (isBoolean(opts)) {
    // legacy...
    ctx.showHidden = opts;
  } else if (opts) {
    // got an "options" object
    exports._extend(ctx, opts);
  }
  // set default options
  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
  if (isUndefined(ctx.depth)) ctx.depth = 2;
  if (isUndefined(ctx.colors)) ctx.colors = false;
  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
  if (ctx.colors) ctx.stylize = stylizeWithColor;
  return formatValue(ctx, obj, ctx.depth);
}
exports.inspect = inspect;


// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
inspect.colors = {
  'bold' : [1, 22],
  'italic' : [3, 23],
  'underline' : [4, 24],
  'inverse' : [7, 27],
  'white' : [37, 39],
  'grey' : [90, 39],
  'black' : [30, 39],
  'blue' : [34, 39],
  'cyan' : [36, 39],
  'green' : [32, 39],
  'magenta' : [35, 39],
  'red' : [31, 39],
  'yellow' : [33, 39]
};

// Don't use 'blue' not visible on cmd.exe
inspect.styles = {
  'special': 'cyan',
  'number': 'yellow',
  'boolean': 'yellow',
  'undefined': 'grey',
  'null': 'bold',
  'string': 'green',
  'date': 'magenta',
  // "name": intentionally not styling
  'regexp': 'red'
};


function stylizeWithColor(str, styleType) {
  var style = inspect.styles[styleType];

  if (style) {
    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
           '\u001b[' + inspect.colors[style][1] + 'm';
  } else {
    return str;
  }
}


function stylizeNoColor(str, styleType) {
  return str;
}


function arrayToHash(array) {
  var hash = {};

  array.forEach(function(val, idx) {
    hash[val] = true;
  });

  return hash;
}


function formatValue(ctx, value, recurseTimes) {
  // Provide a hook for user-specified inspect functions.
  // Check that value is an object with an inspect function on it
  if (ctx.customInspect &&
      value &&
      isFunction(value.inspect) &&
      // Filter out the util module, it's inspect function is special
      value.inspect !== exports.inspect &&
      // Also filter out any prototype objects using the circular check.
      !(value.constructor && value.constructor.prototype === value)) {
    var ret = value.inspect(recurseTimes, ctx);
    if (!isString(ret)) {
      ret = formatValue(ctx, ret, recurseTimes);
    }
    return ret;
  }

  // Primitive types cannot have properties
  var primitive = formatPrimitive(ctx, value);
  if (primitive) {
    return primitive;
  }

  // Look up the keys of the object.
  var keys = Object.keys(value);
  var visibleKeys = arrayToHash(keys);

  if (ctx.showHidden) {
    keys = Object.getOwnPropertyNames(value);
  }

  // IE doesn't make error fields non-enumerable
  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
  if (isError(value)
      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
    return formatError(value);
  }

  // Some type of object without properties can be shortcutted.
  if (keys.length === 0) {
    if (isFunction(value)) {
      var name = value.name ? ': ' + value.name : '';
      return ctx.stylize('[Function' + name + ']', 'special');
    }
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    }
    if (isDate(value)) {
      return ctx.stylize(Date.prototype.toString.call(value), 'date');
    }
    if (isError(value)) {
      return formatError(value);
    }
  }

  var base = '', array = false, braces = ['{', '}'];

  // Make Array say that they are Array
  if (isArray(value)) {
    array = true;
    braces = ['[', ']'];
  }

  // Make functions say that they are functions
  if (isFunction(value)) {
    var n = value.name ? ': ' + value.name : '';
    base = ' [Function' + n + ']';
  }

  // Make RegExps say that they are RegExps
  if (isRegExp(value)) {
    base = ' ' + RegExp.prototype.toString.call(value);
  }

  // Make dates with properties first say the date
  if (isDate(value)) {
    base = ' ' + Date.prototype.toUTCString.call(value);
  }

  // Make error with message first say the error
  if (isError(value)) {
    base = ' ' + formatError(value);
  }

  if (keys.length === 0 && (!array || value.length == 0)) {
    return braces[0] + base + braces[1];
  }

  if (recurseTimes < 0) {
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    } else {
      return ctx.stylize('[Object]', 'special');
    }
  }

  ctx.seen.push(value);

  var output;
  if (array) {
    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
  } else {
    output = keys.map(function(key) {
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
  }

  ctx.seen.pop();

  return reduceToSingleString(output, base, braces);
}


function formatPrimitive(ctx, value) {
  if (isUndefined(value))
    return ctx.stylize('undefined', 'undefined');
  if (isString(value)) {
    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
                                             .replace(/'/g, "\\'")
                                             .replace(/\\"/g, '"') + '\'';
    return ctx.stylize(simple, 'string');
  }
  if (isNumber(value))
    return ctx.stylize('' + value, 'number');
  if (isBoolean(value))
    return ctx.stylize('' + value, 'boolean');
  // For some reason typeof null is "object", so special case here.
  if (isNull(value))
    return ctx.stylize('null', 'null');
}


function formatError(value) {
  return '[' + Error.prototype.toString.call(value) + ']';
}


function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
  var output = [];
  for (var i = 0, l = value.length; i < l; ++i) {
    if (hasOwnProperty(value, String(i))) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          String(i), true));
    } else {
      output.push('');
    }
  }
  keys.forEach(function(key) {
    if (!key.match(/^\d+$/)) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          key, true));
    }
  });
  return output;
}


function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name, str, desc;
  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
  if (desc.get) {
    if (desc.set) {
      str = ctx.stylize('[Getter/Setter]', 'special');
    } else {
      str = ctx.stylize('[Getter]', 'special');
    }
  } else {
    if (desc.set) {
      str = ctx.stylize('[Setter]', 'special');
    }
  }
  if (!hasOwnProperty(visibleKeys, key)) {
    name = '[' + key + ']';
  }
  if (!str) {
    if (ctx.seen.indexOf(desc.value) < 0) {
      if (isNull(recurseTimes)) {
        str = formatValue(ctx, desc.value, null);
      } else {
        str = formatValue(ctx, desc.value, recurseTimes - 1);
      }
      if (str.indexOf('\n') > -1) {
        if (array) {
          str = str.split('\n').map(function(line) {
            return '  ' + line;
          }).join('\n').substr(2);
        } else {
          str = '\n' + str.split('\n').map(function(line) {
            return '   ' + line;
          }).join('\n');
        }
      }
    } else {
      str = ctx.stylize('[Circular]', 'special');
    }
  }
  if (isUndefined(name)) {
    if (array && key.match(/^\d+$/)) {
      return str;
    }
    name = JSON.stringify('' + key);
    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
      name = name.substr(1, name.length - 2);
      name = ctx.stylize(name, 'name');
    } else {
      name = name.replace(/'/g, "\\'")
                 .replace(/\\"/g, '"')
                 .replace(/(^"|"$)/g, "'");
      name = ctx.stylize(name, 'string');
    }
  }

  return name + ': ' + str;
}


function reduceToSingleString(output, base, braces) {
  var numLinesEst = 0;
  var length = output.reduce(function(prev, cur) {
    numLinesEst++;
    if (cur.indexOf('\n') >= 0) numLinesEst++;
    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
  }, 0);

  if (length > 60) {
    return braces[0] +
           (base === '' ? '' : base + '\n ') +
           ' ' +
           output.join(',\n  ') +
           ' ' +
           braces[1];
  }

  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
}


// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.
function isArray(ar) {
  return Array.isArray(ar);
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return isObject(re) && objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return isObject(d) && objectToString(d) === '[object Date]';
}
exports.isDate = isDate;

function isError(e) {
  return isObject(e) &&
      (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = require('./support/isBuffer');

function objectToString(o) {
  return Object.prototype.toString.call(o);
}


function pad(n) {
  return n < 10 ? '0' + n.toString(10) : n.toString(10);
}


var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
              'Oct', 'Nov', 'Dec'];

// 26 Feb 16:19:34
function timestamp() {
  var d = new Date();
  var time = [pad(d.getHours()),
              pad(d.getMinutes()),
              pad(d.getSeconds())].join(':');
  return [d.getDate(), months[d.getMonth()], time].join(' ');
}


// log is just a thin wrapper to console.log that prepends a timestamp
exports.log = function() {
  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
};


/**
 * Inherit the prototype methods from one constructor into another.
 *
 * The Function.prototype.inherits from lang.js rewritten as a standalone
 * function (not on Function.prototype). NOTE: If this file is to be loaded
 * during bootstrapping this function needs to be rewritten using some native
 * functions as prototype setup using normal JavaScript does not work as
 * expected during bootstrapping (see mirror.js in r114903).
 *
 * @param {function} ctor Constructor function which needs to inherit the
 *     prototype.
 * @param {function} superCtor Constructor function to inherit prototype from.
 */
exports.inherits = require('inherits');

exports._extend = function(origin, add) {
  // Don't do anything if add isn't an object
  if (!add || !isObject(add)) return origin;

  var keys = Object.keys(add);
  var i = keys.length;
  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }
  return origin;
};

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./support/isBuffer":9,"_process":8,"inherits":7}],11:[function(require,module,exports){
const history = require('sheet-router/history')
const sheetRouter = require('sheet-router')
const document = require('global/document')
const href = require('sheet-router/href')
const hash = require('sheet-router/hash')
const hashMatch = require('hash-match')
const sendAction = require('send-action')
const mutate = require('xtend/mutable')
const assert = require('assert')
const xtend = require('xtend')
const yo = require('yo-yo')

choo.view = yo
module.exports = choo

// framework for creating sturdy web applications
// null -> fn
function choo () {
  const _models = []
  var _router = null

  start.toString = toString
  start.router = router
  start.model = model
  start.start = start

  return start

  // render the application to a string
  // (str, obj) -> str
  function toString (route, serverState) {
    const initialState = {}
    const nsState = {}

    _models.forEach(function (model) {
      const ns = model.namespace
      if (ns) {
        if (!nsState[ns]) nsState[ns] = {}
        apply(ns, model.state, nsState)
        nsState[ns] = xtend(nsState[ns], serverState[ns])
      } else {
        apply(model.namespace, model.state, initialState)
      }
    })

    const state = xtend(initialState, xtend(serverState, nsState))
    const tree = _router(route, state, function () {
      throw new Error('send() cannot be called on the server')
    })

    return tree.toString()
  }

  // start the application
  // (str?, obj?) -> DOMNode
  function start (rootId, opts) {
    if (!opts && typeof rootId !== 'string') {
      opts = rootId
      rootId = null
    }
    opts = opts || {}
    const name = opts.name || 'choo'
    const initialState = {}
    const reducers = {}
    const effects = {}

    _models.push(appInit(opts))
    _models.forEach(function (model) {
      if (model.state) apply(model.namespace, model.state, initialState)
      if (model.reducers) apply(model.namespace, model.reducers, reducers)
      if (model.effects) apply(model.namespace, model.effects, effects)
    })

    // send() is used to trigger actions inside
    // views, effects and subscriptions
    const send = sendAction({
      onaction: handleAction,
      onchange: onchange,
      state: initialState
    })

    // subscriptions are loaded after sendAction() is called
    // because they both need access to send() and can't
    // react to actions (read-only) - also wait on DOM to
    // be loaded
    document.addEventListener('DOMContentLoaded', function () {
      _models.forEach(function (model) {
        if (model.subscriptions) {
          assert.ok(Array.isArray(model.subscriptions), 'subs must be an arr')
          model.subscriptions.forEach(function (sub) {
            sub(send)
          })
        }
      })
    })

    // If an id is provided, the application will rehydrate
    // on the node. If no id is provided it will return
    // a tree that's ready to be appended to the DOM.
    //
    // The rootId is determined to find the application root
    // on update. Since the DOM nodes change between updates,
    // we must call document.querySelector() to find the root.
    // Use different names when loading multiple choo applications
    // on the same page
    if (rootId) {
      document.addEventListener('DOMContentLoaded', function (event) {
        rootId = rootId.replace(/^#/, '')

        const oldTree = document.querySelector('#' + rootId)
        assert.ok(oldTree, 'could not find node #' + rootId)

        const newTree = _router(send.state().app.location, send.state(), send)

        yo.update(oldTree, newTree)
      })
    } else {
      rootId = name + '-root'
      const tree = _router(send.state().app.location, send.state(), send)
      tree.setAttribute('id', rootId)
      return tree
    }

    // handle an action by either reducers, effects
    // or both - return the new state when done
    // (obj, obj, fn) -> obj
    function handleAction (action, state, send) {
      var reducersCalled = false
      var effectsCalled = false
      const newState = xtend(state)

      // validate if a namespace exists. Namespaces
      // are delimited by the first ':'. Perhaps
      // we'll allow recursive namespaces in the
      // future - who knows
      if (/:/.test(action.type)) {
        const arr = action.type.split(':')
        var ns = arr.shift()
        action.type = arr.join(':')
      }

      const _reducers = ns ? reducers[ns] : reducers
      if (_reducers && _reducers[action.type]) {
        if (ns) {
          const reducedState = _reducers[action.type](action, state[ns])
          if (!newState[ns]) newState[ns] = {}
          mutate(newState[ns], xtend(state[ns], reducedState))
        } else {
          mutate(newState, reducers[action.type](action, state))
        }
        reducersCalled = true
      }

      const _effects = ns ? effects[ns] : effects
      if (_effects && _effects[action.type]) {
        if (ns) _effects[action.type](action, state[ns], send)
        else _effects[action.type](action, state, send)
        effectsCalled = true
      }

      if (!reducersCalled && !effectsCalled) {
        throw new Error('Could not find action ' + action.type)
      }

      // allows (newState === oldState) checks
      return (reducersCalled) ? newState : state
    }

    // update the DOM after every state mutation
    // (obj, obj) -> null
    function onchange (action, newState, oldState) {
      if (newState === oldState) return
      const oldTree = document.querySelector('#' + rootId)
      assert.ok(oldTree, "Could not find DOM node '#" + rootId + "' to update")
      const newTree = _router(newState.app.location, newState, send, oldState)
      newTree.setAttribute('id', rootId)
      yo.update(oldTree, newTree)
    }
  }

  // register all routes on the router
  // (str?, [fn|[fn]]) -> obj
  function router (defaultRoute, cb) {
    _router = sheetRouter(defaultRoute, cb)
    return _router
  }

  // create a new model
  // (str?, obj) -> null
  function model (model) {
    _models.push(model)
  }
}

// initial application state model
// obj -> obj
function appInit (opts) {
  const initialLocation = (opts.hash === true)
    ? hashMatch(document.location.hash)
    : document.location.href

  const model = {
    namespace: 'app',
    state: { location: initialLocation },
    subscriptions: [],
    reducers: {
      // handle href links
      location: function setLocation (action, state) {
        return {
          location: action.location.replace(/#.*/, '')
        }
      }
    }
  }

  // if hash routing explicitly enabled, subscribe to it
  if (opts.hash === true) {
    pushLocationSub(function (navigate) {
      hash(function (fragment) {
        navigate(hashMatch(fragment))
      })
    })
  // otherwise, subscribe to HTML5 history API
  } else {
    if (opts.history !== false) pushLocationSub(history)
    // enable catching <a href=""></a> links
    if (opts.href !== false) pushLocationSub(href)
  }

  return model

  // create a new subscription that modifies
  // 'app:location' and push it to be loaded
  // fn -> null
  function pushLocationSub (cb) {
    model.subscriptions.push(function (send) {
      cb(function (href) {
        send('app:location', { location: href })
      })
    })
  }
}

// compose an object conditionally
// optionally contains a namespace
// which is used to nest properties.
// (str, obj, obj) -> null
function apply (ns, source, target) {
  Object.keys(source).forEach(function (key) {
    if (ns) {
      if (!target[ns]) target[ns] = {}
      target[ns][key] = source[key]
    } else target[key] = source[key]
  })
}

},{"assert":5,"global/document":12,"hash-match":14,"send-action":15,"sheet-router":19,"sheet-router/hash":16,"sheet-router/history":17,"sheet-router/href":18,"xtend":24,"xtend/mutable":25,"yo-yo":26}],12:[function(require,module,exports){
(function (global){
var topLevel = typeof global !== 'undefined' ? global :
    typeof window !== 'undefined' ? window : {}
var minDoc = require('min-document');

if (typeof document !== 'undefined') {
    module.exports = document;
} else {
    var doccy = topLevel['__GLOBAL_DOCUMENT_CACHE@4'];

    if (!doccy) {
        doccy = topLevel['__GLOBAL_DOCUMENT_CACHE@4'] = minDoc;
    }

    module.exports = doccy;
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"min-document":6}],13:[function(require,module,exports){
(function (global){
if (typeof window !== "undefined") {
    module.exports = window;
} else if (typeof global !== "undefined") {
    module.exports = global;
} else if (typeof self !== "undefined"){
    module.exports = self;
} else {
    module.exports = {};
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],14:[function(require,module,exports){
module.exports = function hashMatch (hash, prefix) {
  var pre = prefix || '/';
  if (hash.length === 0) return pre;
  hash = hash.replace('#', '');
  hash = hash.replace(/\/$/, '')
  if (hash.indexOf('/') != 0) hash = '/' + hash;
  if (pre == '/') return hash;
  else return hash.replace(pre, '');
}

},{}],15:[function(require,module,exports){
(function (process){
var extend = require('xtend')

module.exports = function sendAction (options) {
  if (!options) throw new Error('options required')
  if (!options.onaction) throw new Error('options.onaction required')
  if (!options.onchange) throw new Error('options.onchange required')
  var state = options.state || {}

  function send (action, params) {
    process.nextTick(function () {
      if (typeof action === 'object') {
        params = action
      } else if (typeof action === 'string') {
        params = extend({ type: action }, params)
      }

      var stateUpdates = options.onaction(params, state, send)
      if (state !== stateUpdates) {
        update(params, stateUpdates)
      }
    })
  }

  function update (params, stateUpdates) {
    var oldState = state
    state = extend(state, stateUpdates)
    options.onchange(params, state, oldState)
  }

  send.event = function sendAction_event (action, params, flag) {
    if (typeof flag === undefined) flag = true
    return function sendAction_send_thunk (e) {
      if (flag && e && e.preventDefault) e.preventDefault()
      send(action, params, flag)
    }
  }

  send.state = function sendAction_state () {
    return state
  }

  return send
}

}).call(this,require('_process'))

},{"_process":8,"xtend":24}],16:[function(require,module,exports){
const window = require('global/window')
const assert = require('assert')

module.exports = hash

// listen to window hashchange events
// and update router accordingly
// fn(cb) -> null
function hash (cb) {
  assert.equal(typeof cb, 'function', 'cb must be a function')
  window.onhashchange = function (e) {
    cb(window.location.hash)
  }
}

},{"assert":5,"global/window":13}],17:[function(require,module,exports){
const document = require('global/document')
const window = require('global/window')
const assert = require('assert')

module.exports = history

// listen to html5 pushstate events
// and update router accordingly
// fn(str) -> null
function history (cb) {
  assert.equal(typeof cb, 'function', 'cb must be a function')
  window.onpopstate = function () {
    cb(document.location.href)
  }
}

},{"assert":5,"global/document":12,"global/window":13}],18:[function(require,module,exports){
const window = require('global/window')
const assert = require('assert')

module.exports = href

// handle a click if is anchor tag with an href
// and url lives on the same domain. Replaces
// trailing '#' so empty links work as expected.
// fn(str) -> null
function href (cb) {
  assert.equal(typeof cb, 'function', 'cb must be a function')

  window.onclick = function (e) {
    const node = (function traverse (node) {
      if (!node) return
      if (node.localName !== 'a') return traverse(node.parentNode)
      if (node.href === undefined) return traverse(node.parentNode)
      if (window.location.host !== node.host) return traverse(node.parentNode)
      return node
    })(e.target)

    if (!node) return

    e.preventDefault()
    const href = node.href.replace(/#$/, '')
    cb(href)
    window.history.pushState({}, null, href)
  }
}

},{"assert":5,"global/window":13}],19:[function(require,module,exports){
const pathname = require('pathname-match')
const wayfarer = require('wayfarer')
const assert = require('assert')

module.exports = sheetRouter

// Fast, modular client router
// fn(str, any[..], fn?) -> fn(str, any[..])
function sheetRouter (dft, createTree, createRoute) {
  createRoute = createRoute ? createRoute(r) : r
  if (!createTree) {
    createTree = dft
    dft = ''
  }

  assert.equal(typeof dft, 'string', 'dft must be a string')
  assert.equal(typeof createTree, 'function', 'createTree must be a function')

  const router = wayfarer(dft)
  const tree = createTree(createRoute)

  // register tree in router
  ;(function walk (tree, route) {
    if (Array.isArray(tree[0])) {
      // walk over all routes at the root of the tree
      tree.forEach(function (node) {
        walk(node, route)
      })
    } else if (tree[1]) {
      // handle inline functions as args
      const innerRoute = tree[0]
        ? route.concat(tree[0]).join('/')
        : route.length ? route.join('/') : tree[0]
      router.on(innerRoute, tree[1])
      walk(tree[2], route.concat(tree[0]))
    } else if (Array.isArray(tree[2])) {
      // traverse and append route
      walk(tree[2], route.concat(tree[0]))
    } else {
      // register path in router
      const nwRoute = tree[0]
        ? route.concat(tree[0]).join('/')
        : route.length ? route.join('/') : tree[0]
      router.on(nwRoute, tree[2])
    }
  })(tree, [])

  // match a route on the router
  return function match (route) {
    assert.equal(typeof route, 'string', 'route must be a string')
    const args = [].slice.call(arguments)
    args[0] = pathname(args[0])
    return router.apply(null, args)
  }
}

// register regular route
function r (route, inline, child) {
  if (!child) {
    child = inline
    inline = null
  }
  assert.equal(typeof route, 'string', 'route must be a string')
  assert.ok(child, 'child exists')
  route = route.replace(/^\//, '')
  return [ route, inline, child ]
}

},{"assert":5,"pathname-match":20,"wayfarer":22}],20:[function(require,module,exports){
const assert = require('assert')

module.exports = match

// get url path section from a url
// strip querystrings / hashes
// strip protocol
// strip hostname and port (both ip and route)
// str -> str
function match (route) {
  assert.equal(typeof route, 'string')

  return route.trim()
    .replace(/[\?|#].*$/, '')
    .replace(/^(?:https?\:)\/\//, '')
    .replace(/^(?:[\w+(?:-\w+)+.])+(?:[\:0-9]{4,5})?/, '')
    .replace(/\/$/, '')
}

},{"assert":5}],21:[function(require,module,exports){

/**
 * An Array.prototype.slice.call(arguments) alternative
 *
 * @param {Object} args something with a length
 * @param {Number} slice
 * @param {Number} sliceEnd
 * @api public
 */

module.exports = function (args, slice, sliceEnd) {
  var ret = [];
  var len = args.length;

  if (0 === len) return ret;

  var start = slice < 0
    ? Math.max(0, slice + len)
    : slice || 0;

  if (sliceEnd !== undefined) {
    len = sliceEnd < 0
      ? sliceEnd + len
      : sliceEnd
  }

  while (len-- > start) {
    ret[len - start] = args[len];
  }

  return ret;
}


},{}],22:[function(require,module,exports){
const assert = require('assert')
const sliced = require('sliced')
const trie = require('./trie')

module.exports = Wayfarer

// create a router
// str -> obj
function Wayfarer (dft) {
  if (!(this instanceof Wayfarer)) return new Wayfarer(dft)

  const _default = (dft || '').replace(/^\//, '')
  const _trie = trie()

  emit._trie = _trie
  emit.emit = emit
  emit.on = on
  emit._wayfarer = true

  return emit

  // define a route
  // (str, fn) -> obj
  function on (route, cb) {
    assert.equal(typeof route, 'string')
    assert.equal(typeof cb, 'function')

    route = route || '/'

    if (cb && cb._wayfarer && cb._trie) {
      _trie.mount(route, cb._trie.trie)
    } else {
      const node = _trie.create(route)
      node.cb = cb
    }

    return emit
  }

  // match and call a route
  // (str, obj?) -> null
  function emit (route) {
    assert.notEqual(route, undefined, "'route' must be defined")
    const args = sliced(arguments)

    const node = _trie.match(route)
    if (node && node.cb) {
      args[0] = node.params
      return node.cb.apply(null, args)
    }

    const dft = _trie.match(_default)
    if (dft && dft.cb) {
      args[0] = dft.params
      return dft.cb.apply(null, args)
    }

    throw new Error("route '" + route + "' did not match")
  }
}

},{"./trie":23,"assert":5,"sliced":21}],23:[function(require,module,exports){
const mutate = require('xtend/mutable')
const assert = require('assert')
const xtend = require('xtend')

module.exports = Trie

// create a new trie
// null -> obj
function Trie () {
  if (!(this instanceof Trie)) return new Trie()
  this.trie = { nodes: {} }
}

// create a node on the trie at route
// and return a node
// str -> null
Trie.prototype.create = function (route) {
  assert.equal(typeof route, 'string', 'route should be a string')
  // strip leading '/' and split routes
  const routes = route.replace(/^\//, '').split('/')
  return (function createNode (index, trie, routes) {
    const route = routes[index]

    if (route === undefined) return trie

    var node = null
    if (/^:/.test(route)) {
      // if node is a name match, set name and append to ':' node
      if (!trie.nodes['$$']) {
        node = { nodes: {} }
        trie.nodes['$$'] = node
      } else {
        node = trie.nodes['$$']
      }
      trie.name = route.replace(/^:/, '')
    } else if (!trie.nodes[route]) {
      node = { nodes: {} }
      trie.nodes[route] = node
    } else {
      node = trie.nodes[route]
    }

    // we must recurse deeper
    return createNode(index + 1, node, routes)
  })(0, this.trie, routes)
}

// match a route on the trie
// and return the node
// str -> obj
Trie.prototype.match = function (route) {
  assert.equal(typeof route, 'string', 'route should be a string')

  const routes = route.replace(/^\//, '').split('/')
  const params = {}

  var node = (function search (index, trie) {
    // either there's no match, or we're done searching
    if (trie === undefined) return undefined
    const route = routes[index]
    if (route === undefined) return trie

    if (trie.nodes[route]) {
      // match regular routes first
      return search(index + 1, trie.nodes[route])
    } else if (trie.name) {
      // match named routes
      params[trie.name] = route
      return search(index + 1, trie.nodes['$$'])
    } else {
      // no matches found
      return search(index + 1)
    }
  })(0, this.trie)

  if (!node) return undefined
  node = xtend(node)
  node.params = params
  return node
}

// mount a trie onto a node at route
// (str, obj) -> null
Trie.prototype.mount = function (route, trie) {
  assert.equal(typeof route, 'string', 'route should be a string')
  assert.equal(typeof trie, 'object', 'trie should be a object')

  const split = route.replace(/^\//, '').split('/')
  var node = null
  var key = null

  if (split.length === 1) {
    key = split[0]
    node = this.create(key)
  } else {
    const headArr = split.splice(0, split.length - 1)
    const head = headArr.join('/')
    key = split[0]
    node = this.create(head)
  }

  mutate(node.nodes, trie.nodes)
  if (trie.name) node.name = trie.name

  // delegate properties from '/' to the new node
  // '/' cannot be reached once mounted
  if (node.nodes['']) {
    Object.keys(node.nodes['']).forEach(function (key) {
      if (key === 'nodes') return
      node[key] = node.nodes[''][key]
    })
    mutate(node.nodes, node.nodes[''].nodes)
    delete node.nodes[''].nodes
  }
}

},{"assert":5,"xtend":24,"xtend/mutable":25}],24:[function(require,module,exports){
module.exports = extend

var hasOwnProperty = Object.prototype.hasOwnProperty;

function extend() {
    var target = {}

    for (var i = 0; i < arguments.length; i++) {
        var source = arguments[i]

        for (var key in source) {
            if (hasOwnProperty.call(source, key)) {
                target[key] = source[key]
            }
        }
    }

    return target
}

},{}],25:[function(require,module,exports){
module.exports = extend

var hasOwnProperty = Object.prototype.hasOwnProperty;

function extend(target) {
    for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i]

        for (var key in source) {
            if (hasOwnProperty.call(source, key)) {
                target[key] = source[key]
            }
        }
    }

    return target
}

},{}],26:[function(require,module,exports){
var bel = require('bel') // turns template tag into DOM elements
var morphdom = require('morphdom') // efficiently diffs + morphs two DOM elements
var defaultEvents = require('./update-events.js') // default events to be copied when dom elements update

module.exports = bel

// TODO move this + defaultEvents to a new module once we receive more feedback
module.exports.update = function (fromNode, toNode, opts) {
  if (!opts) opts = {}
  if (opts.events !== false) {
    if (!opts.onBeforeMorphEl) opts.onBeforeMorphEl = copier
  }

  return morphdom(fromNode, toNode, opts)

  // morphdom only copies attributes. we decided we also wanted to copy events
  // that can be set via attributes
  function copier (f, t) {
    // copy events:
    var events = opts.events || defaultEvents
    for (var i = 0; i < events.length; i++) {
      var ev = events[i]
      if (t[ev]) { // if new element has a whitelisted attribute
        f[ev] = t[ev] // update existing element
      } else if (f[ev]) { // if existing element has it and new one doesnt
        f[ev] = undefined // remove it from existing element
      }
    }
    // copy values for form elements
    if ((f.nodeName === 'INPUT' && f.type !== 'file') || f.nodeName === 'TEXTAREA' || f.nodeName === 'SELECT') {
      if (t.getAttribute('value') === null) t.value = f.value
    }
  }
}

},{"./update-events.js":31,"bel":27,"morphdom":30}],27:[function(require,module,exports){
var document = require('global/document')
var hyperx = require('hyperx')

var SVGNS = 'http://www.w3.org/2000/svg'
var BOOL_PROPS = {
  autofocus: 1,
  checked: 1,
  defaultchecked: 1,
  disabled: 1,
  formnovalidate: 1,
  indeterminate: 1,
  readonly: 1,
  required: 1,
  willvalidate: 1
}
var SVG_TAGS = [
  'svg',
  'altGlyph', 'altGlyphDef', 'altGlyphItem', 'animate', 'animateColor',
  'animateMotion', 'animateTransform', 'circle', 'clipPath', 'color-profile',
  'cursor', 'defs', 'desc', 'ellipse', 'feBlend', 'feColorMatrix',
  'feComponentTransfer', 'feComposite', 'feConvolveMatrix', 'feDiffuseLighting',
  'feDisplacementMap', 'feDistantLight', 'feFlood', 'feFuncA', 'feFuncB',
  'feFuncG', 'feFuncR', 'feGaussianBlur', 'feImage', 'feMerge', 'feMergeNode',
  'feMorphology', 'feOffset', 'fePointLight', 'feSpecularLighting',
  'feSpotLight', 'feTile', 'feTurbulence', 'filter', 'font', 'font-face',
  'font-face-format', 'font-face-name', 'font-face-src', 'font-face-uri',
  'foreignObject', 'g', 'glyph', 'glyphRef', 'hkern', 'image', 'line',
  'linearGradient', 'marker', 'mask', 'metadata', 'missing-glyph', 'mpath',
  'path', 'pattern', 'polygon', 'polyline', 'radialGradient', 'rect',
  'set', 'stop', 'switch', 'symbol', 'text', 'textPath', 'title', 'tref',
  'tspan', 'use', 'view', 'vkern'
]

function belCreateElement (tag, props, children) {
  var el

  // If an svg tag, it needs a namespace
  if (SVG_TAGS.indexOf(tag) !== -1) {
    props.namespace = SVGNS
  }

  // If we are using a namespace
  var ns = false
  if (props.namespace) {
    ns = props.namespace
    delete props.namespace
  }

  // Create the element
  if (ns) {
    el = document.createElementNS(ns, tag)
  } else {
    el = document.createElement(tag)
  }

  // Create the properties
  for (var p in props) {
    if (props.hasOwnProperty(p)) {
      var key = p.toLowerCase()
      var val = props[p]
      // Normalize className
      if (key === 'classname') {
        key = 'class'
        p = 'class'
      }
      // The for attribute gets transformed to htmlFor, but we just set as for
      if (p === 'htmlFor') {
        p = 'for'
      }
      // If a property is boolean, set itself to the key
      if (BOOL_PROPS[key]) {
        if (val === 'true') val = key
        else if (val === 'false') continue
      }
      // If a property prefers being set directly vs setAttribute
      if (key.slice(0, 2) === 'on') {
        el[p] = val
      } else {
        if (ns) {
          el.setAttributeNS(null, p, val)
        } else {
          el.setAttribute(p, val)
        }
      }
    }
  }

  function appendChild (childs) {
    if (!Array.isArray(childs)) return
    for (var i = 0; i < childs.length; i++) {
      var node = childs[i]
      if (Array.isArray(node)) {
        appendChild(node)
        continue
      }

      if (typeof node === 'number' ||
        typeof node === 'boolean' ||
        node instanceof Date ||
        node instanceof RegExp) {
        node = node.toString()
      }

      if (typeof node === 'string') {
        if (el.lastChild && el.lastChild.nodeName === '#text') {
          el.lastChild.nodeValue += node
          continue
        }
        node = document.createTextNode(node)
      }

      if (node && node.nodeType) {
        el.appendChild(node)
      }
    }
  }
  appendChild(children)

  return el
}

module.exports = hyperx(belCreateElement)
module.exports.createElement = belCreateElement

},{"global/document":12,"hyperx":28}],28:[function(require,module,exports){
var attrToProp = require('hyperscript-attribute-to-property')

var VAR = 0, TEXT = 1, OPEN = 2, CLOSE = 3, ATTR = 4
var ATTR_KEY = 5, ATTR_KEY_W = 6
var ATTR_VALUE_W = 7, ATTR_VALUE = 8
var ATTR_VALUE_SQ = 9, ATTR_VALUE_DQ = 10
var ATTR_EQ = 11, ATTR_BREAK = 12

module.exports = function (h, opts) {
  h = attrToProp(h)
  if (!opts) opts = {}
  var concat = opts.concat || function (a, b) {
    return String(a) + String(b)
  }

  return function (strings) {
    var state = TEXT, reg = ''
    var arglen = arguments.length
    var parts = []

    for (var i = 0; i < strings.length; i++) {
      if (i < arglen - 1) {
        var arg = arguments[i+1]
        var p = parse(strings[i])
        var xstate = state
        if (xstate === ATTR_VALUE_DQ) xstate = ATTR_VALUE
        if (xstate === ATTR_VALUE_SQ) xstate = ATTR_VALUE
        if (xstate === ATTR_VALUE_W) xstate = ATTR_VALUE
        if (xstate === ATTR) xstate = ATTR_KEY
        p.push([ VAR, xstate, arg ])
        parts.push.apply(parts, p)
      } else parts.push.apply(parts, parse(strings[i]))
    }

    var tree = [null,{},[]]
    var stack = [[tree,-1]]
    for (var i = 0; i < parts.length; i++) {
      var cur = stack[stack.length-1][0]
      var p = parts[i], s = p[0]
      if (s === OPEN && /^\//.test(p[1])) {
        var ix = stack[stack.length-1][1]
        if (stack.length > 1) {
          stack.pop()
          stack[stack.length-1][0][2][ix] = h(
            cur[0], cur[1], cur[2].length ? cur[2] : undefined
          )
        }
      } else if (s === OPEN) {
        var c = [p[1],{},[]]
        cur[2].push(c)
        stack.push([c,cur[2].length-1])
      } else if (s === ATTR_KEY || (s === VAR && p[1] === ATTR_KEY)) {
        var key = ''
        var copyKey
        for (; i < parts.length; i++) {
          if (parts[i][0] === ATTR_KEY) {
            key = concat(key, parts[i][1])
          } else if (parts[i][0] === VAR && parts[i][1] === ATTR_KEY) {
            if (typeof parts[i][2] === 'object' && !key) {
              for (copyKey in parts[i][2]) {
                if (parts[i][2].hasOwnProperty(copyKey) && !cur[1][copyKey]) {
                  cur[1][copyKey] = parts[i][2][copyKey]
                }
              }
            } else {
              key = concat(key, parts[i][2])
            }
          } else break
        }
        if (parts[i][0] === ATTR_EQ) i++
        var j = i
        for (; i < parts.length; i++) {
          if (parts[i][0] === ATTR_VALUE || parts[i][0] === ATTR_KEY) {
            if (!cur[1][key]) cur[1][key] = strfn(parts[i][1])
            else cur[1][key] = concat(cur[1][key], parts[i][1])
          } else if (parts[i][0] === VAR
          && (parts[i][1] === ATTR_VALUE || parts[i][1] === ATTR_KEY)) {
            if (!cur[1][key]) cur[1][key] = strfn(parts[i][2])
            else cur[1][key] = concat(cur[1][key], parts[i][2])
          } else {
            if (key.length && !cur[1][key] && i === j
            && (parts[i][0] === CLOSE || parts[i][0] === ATTR_BREAK)) {
              // https://html.spec.whatwg.org/multipage/infrastructure.html#boolean-attributes
              // empty string is falsy, not well behaved value in browser
              cur[1][key] = key.toLowerCase()
            }
            break
          }
        }
      } else if (s === ATTR_KEY) {
        cur[1][p[1]] = true
      } else if (s === VAR && p[1] === ATTR_KEY) {
        cur[1][p[2]] = true
      } else if (s === CLOSE) {
        if (selfClosing(cur[0]) && stack.length) {
          var ix = stack[stack.length-1][1]
          stack.pop()
          stack[stack.length-1][0][2][ix] = h(
            cur[0], cur[1], cur[2].length ? cur[2] : undefined
          )
        }
      } else if (s === VAR && p[1] === TEXT) {
        if (p[2] === undefined || p[2] === null) p[2] = ''
        else if (!p[2]) p[2] = concat('', p[2])
        if (Array.isArray(p[2][0])) {
          cur[2].push.apply(cur[2], p[2])
        } else {
          cur[2].push(p[2])
        }
      } else if (s === TEXT) {
        cur[2].push(p[1])
      } else if (s === ATTR_EQ || s === ATTR_BREAK) {
        // no-op
      } else {
        throw new Error('unhandled: ' + s)
      }
    }

    if (tree[2].length > 1 && /^\s*$/.test(tree[2][0])) {
      tree[2].shift()
    }

    if (tree[2].length > 2
    || (tree[2].length === 2 && /\S/.test(tree[2][1]))) {
      throw new Error(
        'multiple root elements must be wrapped in an enclosing tag'
      )
    }
    if (Array.isArray(tree[2][0]) && typeof tree[2][0][0] === 'string'
    && Array.isArray(tree[2][0][2])) {
      tree[2][0] = h(tree[2][0][0], tree[2][0][1], tree[2][0][2])
    }
    return tree[2][0]

    function parse (str) {
      var res = []
      if (state === ATTR_VALUE_W) state = ATTR
      for (var i = 0; i < str.length; i++) {
        var c = str.charAt(i)
        if (state === TEXT && c === '<') {
          if (reg.length) res.push([TEXT, reg])
          reg = ''
          state = OPEN
        } else if (c === '>' && !quot(state)) {
          if (state === OPEN) {
            res.push([OPEN,reg])
          } else if (state === ATTR_KEY) {
            res.push([ATTR_KEY,reg])
          } else if (state === ATTR_VALUE && reg.length) {
            res.push([ATTR_VALUE,reg])
          }
          res.push([CLOSE])
          reg = ''
          state = TEXT
        } else if (state === TEXT) {
          reg += c
        } else if (state === OPEN && /\s/.test(c)) {
          res.push([OPEN, reg])
          reg = ''
          state = ATTR
        } else if (state === OPEN) {
          reg += c
        } else if (state === ATTR && /[\w-]/.test(c)) {
          state = ATTR_KEY
          reg = c
        } else if (state === ATTR && /\s/.test(c)) {
          if (reg.length) res.push([ATTR_KEY,reg])
          res.push([ATTR_BREAK])
        } else if (state === ATTR_KEY && /\s/.test(c)) {
          res.push([ATTR_KEY,reg])
          reg = ''
          state = ATTR_KEY_W
        } else if (state === ATTR_KEY && c === '=') {
          res.push([ATTR_KEY,reg],[ATTR_EQ])
          reg = ''
          state = ATTR_VALUE_W
        } else if (state === ATTR_KEY) {
          reg += c
        } else if ((state === ATTR_KEY_W || state === ATTR) && c === '=') {
          res.push([ATTR_EQ])
          state = ATTR_VALUE_W
        } else if ((state === ATTR_KEY_W || state === ATTR) && !/\s/.test(c)) {
          res.push([ATTR_BREAK])
          if (/[\w-]/.test(c)) {
            reg += c
            state = ATTR_KEY
          } else state = ATTR
        } else if (state === ATTR_VALUE_W && c === '"') {
          state = ATTR_VALUE_DQ
        } else if (state === ATTR_VALUE_W && c === "'") {
          state = ATTR_VALUE_SQ
        } else if (state === ATTR_VALUE_DQ && c === '"') {
          res.push([ATTR_VALUE,reg],[ATTR_BREAK])
          reg = ''
          state = ATTR
        } else if (state === ATTR_VALUE_SQ && c === "'") {
          res.push([ATTR_VALUE,reg],[ATTR_BREAK])
          reg = ''
          state = ATTR
        } else if (state === ATTR_VALUE_W && !/\s/.test(c)) {
          state = ATTR_VALUE
          i--
        } else if (state === ATTR_VALUE && /\s/.test(c)) {
          res.push([ATTR_VALUE,reg],[ATTR_BREAK])
          reg = ''
          state = ATTR
        } else if (state === ATTR_VALUE || state === ATTR_VALUE_SQ
        || state === ATTR_VALUE_DQ) {
          reg += c
        }
      }
      if (state === TEXT && reg.length) {
        res.push([TEXT,reg])
        reg = ''
      } else if (state === ATTR_VALUE && reg.length) {
        res.push([ATTR_VALUE,reg])
        reg = ''
      } else if (state === ATTR_VALUE_DQ && reg.length) {
        res.push([ATTR_VALUE,reg])
        reg = ''
      } else if (state === ATTR_VALUE_SQ && reg.length) {
        res.push([ATTR_VALUE,reg])
        reg = ''
      } else if (state === ATTR_KEY) {
        res.push([ATTR_KEY,reg])
        reg = ''
      }
      return res
    }
  }

  function strfn (x) {
    if (typeof x === 'function') return x
    else if (typeof x === 'string') return x
    else if (x && typeof x === 'object') return x
    else return concat('', x)
  }
}

function quot (state) {
  return state === ATTR_VALUE_SQ || state === ATTR_VALUE_DQ
}

var hasOwn = Object.prototype.hasOwnProperty
function has (obj, key) { return hasOwn.call(obj, key) }

var closeRE = RegExp('^(' + [
  'area', 'base', 'basefont', 'bgsound', 'br', 'col', 'command', 'embed',
  'frame', 'hr', 'img', 'input', 'isindex', 'keygen', 'link', 'meta', 'param',
  'source', 'track', 'wbr',
  // SVG TAGS
  'animate', 'animateTransform', 'circle', 'cursor', 'desc', 'ellipse',
  'feBlend', 'feColorMatrix', 'feComponentTransfer', 'feComposite',
  'feConvolveMatrix', 'feDiffuseLighting', 'feDisplacementMap',
  'feDistantLight', 'feFlood', 'feFuncA', 'feFuncB', 'feFuncG', 'feFuncR',
  'feGaussianBlur', 'feImage', 'feMergeNode', 'feMorphology',
  'feOffset', 'fePointLight', 'feSpecularLighting', 'feSpotLight', 'feTile',
  'feTurbulence', 'font-face-format', 'font-face-name', 'font-face-uri',
  'glyph', 'glyphRef', 'hkern', 'image', 'line', 'missing-glyph', 'mpath',
  'path', 'polygon', 'polyline', 'rect', 'set', 'stop', 'tref', 'use', 'view',
  'vkern'
].join('|') + ')(?:[\.#][a-zA-Z0-9\u007F-\uFFFF_:-]+)*$')
function selfClosing (tag) { return closeRE.test(tag) }

},{"hyperscript-attribute-to-property":29}],29:[function(require,module,exports){
module.exports = attributeToProperty

var transform = {
  'class': 'className',
  'for': 'htmlFor',
  'http-equiv': 'httpEquiv'
}

function attributeToProperty (h) {
  return function (tagName, attrs, children) {
    for (var attr in attrs) {
      if (attr in transform) {
        attrs[transform[attr]] = attrs[attr]
        delete attrs[attr]
      }
    }
    return h(tagName, attrs, children)
  }
}

},{}],30:[function(require,module,exports){
// Create a range object for efficently rendering strings to elements.
var range;

var testEl = (typeof document !== 'undefined') ?
    document.body || document.createElement('div') :
    {};

var XHTML = 'http://www.w3.org/1999/xhtml';
var ELEMENT_NODE = 1;
var TEXT_NODE = 3;
var COMMENT_NODE = 8;

// Fixes <https://github.com/patrick-steele-idem/morphdom/issues/32>
// (IE7+ support) <=IE7 does not support el.hasAttribute(name)
var hasAttributeNS;

if (testEl.hasAttributeNS) {
    hasAttributeNS = function(el, namespaceURI, name) {
        return el.hasAttributeNS(namespaceURI, name);
    };
} else if (testEl.hasAttribute) {
    hasAttributeNS = function(el, namespaceURI, name) {
        return el.hasAttribute(name);
    };
} else {
    hasAttributeNS = function(el, namespaceURI, name) {
        return !!el.getAttributeNode(name);
    };
}

function empty(o) {
    for (var k in o) {
        if (o.hasOwnProperty(k)) {
            return false;
        }
    }
    return true;
}

function toElement(str) {
    if (!range && document.createRange) {
        range = document.createRange();
        range.selectNode(document.body);
    }

    var fragment;
    if (range && range.createContextualFragment) {
        fragment = range.createContextualFragment(str);
    } else {
        fragment = document.createElement('body');
        fragment.innerHTML = str;
    }
    return fragment.childNodes[0];
}

var specialElHandlers = {
    /**
     * Needed for IE. Apparently IE doesn't think that "selected" is an
     * attribute when reading over the attributes using selectEl.attributes
     */
    OPTION: function(fromEl, toEl) {
        fromEl.selected = toEl.selected;
        if (fromEl.selected) {
            fromEl.setAttribute('selected', '');
        } else {
            fromEl.removeAttribute('selected', '');
        }
    },
    /**
     * The "value" attribute is special for the <input> element since it sets
     * the initial value. Changing the "value" attribute without changing the
     * "value" property will have no effect since it is only used to the set the
     * initial value.  Similar for the "checked" attribute, and "disabled".
     */
    INPUT: function(fromEl, toEl) {
        fromEl.checked = toEl.checked;
        if (fromEl.checked) {
            fromEl.setAttribute('checked', '');
        } else {
            fromEl.removeAttribute('checked');
        }

        if (fromEl.value !== toEl.value) {
            fromEl.value = toEl.value;
        }

        if (!hasAttributeNS(toEl, null, 'value')) {
            fromEl.removeAttribute('value');
        }

        fromEl.disabled = toEl.disabled;
        if (fromEl.disabled) {
            fromEl.setAttribute('disabled', '');
        } else {
            fromEl.removeAttribute('disabled');
        }
    },

    TEXTAREA: function(fromEl, toEl) {
        var newValue = toEl.value;
        if (fromEl.value !== newValue) {
            fromEl.value = newValue;
        }

        if (fromEl.firstChild) {
            fromEl.firstChild.nodeValue = newValue;
        }
    }
};

function noop() {}

/**
 * Returns true if two node's names and namespace URIs are the same.
 *
 * @param {Element} a
 * @param {Element} b
 * @return {boolean}
 */
var compareNodeNames = function(a, b) {
    return a.nodeName === b.nodeName &&
           a.namespaceURI === b.namespaceURI;
};

/**
 * Create an element, optionally with a known namespace URI.
 *
 * @param {string} name the element name, e.g. 'div' or 'svg'
 * @param {string} [namespaceURI] the element's namespace URI, i.e. the value of
 * its `xmlns` attribute or its inferred namespace.
 *
 * @return {Element}
 */
function createElementNS(name, namespaceURI) {
    return !namespaceURI || namespaceURI === XHTML ?
        document.createElement(name) :
        document.createElementNS(namespaceURI, name);
}

/**
 * Loop over all of the attributes on the target node and make sure the original
 * DOM node has the same attributes. If an attribute found on the original node
 * is not on the new node then remove it from the original node.
 *
 * @param  {Element} fromNode
 * @param  {Element} toNode
 */
function morphAttrs(fromNode, toNode) {
    var attrs = toNode.attributes;
    var i;
    var attr;
    var attrName;
    var attrNamespaceURI;
    var attrValue;
    var fromValue;

    for (i = attrs.length - 1; i >= 0; i--) {
        attr = attrs[i];
        attrName = attr.name;
        attrValue = attr.value;
        attrNamespaceURI = attr.namespaceURI;

        if (attrNamespaceURI) {
            attrName = attr.localName || attrName;
            fromValue = fromNode.getAttributeNS(attrNamespaceURI, attrName);
        } else {
            fromValue = fromNode.getAttribute(attrName);
        }

        if (fromValue !== attrValue) {
            if (attrNamespaceURI) {
                fromNode.setAttributeNS(attrNamespaceURI, attrName, attrValue);
            } else {
                fromNode.setAttribute(attrName, attrValue);
            }
        }
    }

    // Remove any extra attributes found on the original DOM element that
    // weren't found on the target element.
    attrs = fromNode.attributes;

    for (i = attrs.length - 1; i >= 0; i--) {
        attr = attrs[i];
        if (attr.specified !== false) {
            attrName = attr.name;
            attrNamespaceURI = attr.namespaceURI;

            if (!hasAttributeNS(toNode, attrNamespaceURI, attrNamespaceURI ? attrName = attr.localName || attrName : attrName)) {
                fromNode.removeAttributeNode(attr);
            }
        }
    }
}

/**
 * Copies the children of one DOM element to another DOM element
 */
function moveChildren(fromEl, toEl) {
    var curChild = fromEl.firstChild;
    while (curChild) {
        var nextChild = curChild.nextSibling;
        toEl.appendChild(curChild);
        curChild = nextChild;
    }
    return toEl;
}

function defaultGetNodeKey(node) {
    return node.id;
}

function morphdom(fromNode, toNode, options) {
    if (!options) {
        options = {};
    }

    if (typeof toNode === 'string') {
        if (fromNode.nodeName === '#document' || fromNode.nodeName === 'HTML') {
            var toNodeHtml = toNode;
            toNode = document.createElement('html');
            toNode.innerHTML = toNodeHtml;
        } else {
            toNode = toElement(toNode);
        }
    }

    // XXX optimization: if the nodes are equal, don't morph them
    /*
    if (fromNode.isEqualNode(toNode)) {
      return fromNode;
    }
    */

    var savedEls = {}; // Used to save off DOM elements with IDs
    var unmatchedEls = {};
    var getNodeKey = options.getNodeKey || defaultGetNodeKey;
    var onBeforeNodeAdded = options.onBeforeNodeAdded || noop;
    var onNodeAdded = options.onNodeAdded || noop;
    var onBeforeElUpdated = options.onBeforeElUpdated || options.onBeforeMorphEl || noop;
    var onElUpdated = options.onElUpdated || noop;
    var onBeforeNodeDiscarded = options.onBeforeNodeDiscarded || noop;
    var onNodeDiscarded = options.onNodeDiscarded || noop;
    var onBeforeElChildrenUpdated = options.onBeforeElChildrenUpdated || options.onBeforeMorphElChildren || noop;
    var childrenOnly = options.childrenOnly === true;
    var movedEls = [];

    function removeNodeHelper(node, nestedInSavedEl) {
        var id = getNodeKey(node);
        // If the node has an ID then save it off since we will want
        // to reuse it in case the target DOM tree has a DOM element
        // with the same ID
        if (id) {
            savedEls[id] = node;
        } else if (!nestedInSavedEl) {
            // If we are not nested in a saved element then we know that this node has been
            // completely discarded and will not exist in the final DOM.
            onNodeDiscarded(node);
        }

        if (node.nodeType === ELEMENT_NODE) {
            var curChild = node.firstChild;
            while (curChild) {
                removeNodeHelper(curChild, nestedInSavedEl || id);
                curChild = curChild.nextSibling;
            }
        }
    }

    function walkDiscardedChildNodes(node) {
        if (node.nodeType === ELEMENT_NODE) {
            var curChild = node.firstChild;
            while (curChild) {


                if (!getNodeKey(curChild)) {
                    // We only want to handle nodes that don't have an ID to avoid double
                    // walking the same saved element.

                    onNodeDiscarded(curChild);

                    // Walk recursively
                    walkDiscardedChildNodes(curChild);
                }

                curChild = curChild.nextSibling;
            }
        }
    }

    function removeNode(node, parentNode, alreadyVisited) {
        if (onBeforeNodeDiscarded(node) === false) {
            return;
        }

        parentNode.removeChild(node);
        if (alreadyVisited) {
            if (!getNodeKey(node)) {
                onNodeDiscarded(node);
                walkDiscardedChildNodes(node);
            }
        } else {
            removeNodeHelper(node);
        }
    }

    function morphEl(fromEl, toEl, alreadyVisited, childrenOnly) {
        var toElKey = getNodeKey(toEl);
        if (toElKey) {
            // If an element with an ID is being morphed then it is will be in the final
            // DOM so clear it out of the saved elements collection
            delete savedEls[toElKey];
        }

        if (!childrenOnly) {
            if (onBeforeElUpdated(fromEl, toEl) === false) {
                return;
            }

            morphAttrs(fromEl, toEl);
            onElUpdated(fromEl);

            if (onBeforeElChildrenUpdated(fromEl, toEl) === false) {
                return;
            }
        }

        if (fromEl.nodeName !== 'TEXTAREA') {
            var curToNodeChild = toEl.firstChild;
            var curFromNodeChild = fromEl.firstChild;
            var curToNodeId;

            var fromNextSibling;
            var toNextSibling;
            var savedEl;
            var unmatchedEl;

            outer: while (curToNodeChild) {
                toNextSibling = curToNodeChild.nextSibling;
                curToNodeId = getNodeKey(curToNodeChild);

                while (curFromNodeChild) {
                    var curFromNodeId = getNodeKey(curFromNodeChild);
                    fromNextSibling = curFromNodeChild.nextSibling;

                    if (!alreadyVisited) {
                        if (curFromNodeId && (unmatchedEl = unmatchedEls[curFromNodeId])) {
                            unmatchedEl.parentNode.replaceChild(curFromNodeChild, unmatchedEl);
                            morphEl(curFromNodeChild, unmatchedEl, alreadyVisited);
                            curFromNodeChild = fromNextSibling;
                            continue;
                        }
                    }

                    var curFromNodeType = curFromNodeChild.nodeType;

                    if (curFromNodeType === curToNodeChild.nodeType) {
                        var isCompatible = false;

                        // Both nodes being compared are Element nodes
                        if (curFromNodeType === ELEMENT_NODE) {
                            if (compareNodeNames(curFromNodeChild, curToNodeChild)) {
                                // We have compatible DOM elements
                                if (curFromNodeId || curToNodeId) {
                                    // If either DOM element has an ID then we
                                    // handle those differently since we want to
                                    // match up by ID
                                    if (curToNodeId === curFromNodeId) {
                                        isCompatible = true;
                                    }
                                } else {
                                    isCompatible = true;
                                }
                            }

                            if (isCompatible) {
                                // We found compatible DOM elements so transform
                                // the current "from" node to match the current
                                // target DOM node.
                                morphEl(curFromNodeChild, curToNodeChild, alreadyVisited);
                            }
                        // Both nodes being compared are Text or Comment nodes
                    } else if (curFromNodeType === TEXT_NODE || curFromNodeType == COMMENT_NODE) {
                            isCompatible = true;
                            // Simply update nodeValue on the original node to
                            // change the text value
                            curFromNodeChild.nodeValue = curToNodeChild.nodeValue;
                        }

                        if (isCompatible) {
                            curToNodeChild = toNextSibling;
                            curFromNodeChild = fromNextSibling;
                            continue outer;
                        }
                    }

                    // No compatible match so remove the old node from the DOM
                    // and continue trying to find a match in the original DOM
                    removeNode(curFromNodeChild, fromEl, alreadyVisited);
                    curFromNodeChild = fromNextSibling;
                }

                if (curToNodeId) {
                    if ((savedEl = savedEls[curToNodeId])) {
                        morphEl(savedEl, curToNodeChild, true);
                        // We want to append the saved element instead
                        curToNodeChild = savedEl;
                    } else {
                        // The current DOM element in the target tree has an ID
                        // but we did not find a match in any of the
                        // corresponding siblings. We just put the target
                        // element in the old DOM tree but if we later find an
                        // element in the old DOM tree that has a matching ID
                        // then we will replace the target element with the
                        // corresponding old element and morph the old element
                        unmatchedEls[curToNodeId] = curToNodeChild;
                    }
                }

                // If we got this far then we did not find a candidate match for
                // our "to node" and we exhausted all of the children "from"
                // nodes. Therefore, we will just append the current "to node"
                // to the end
                if (onBeforeNodeAdded(curToNodeChild) !== false) {
                    fromEl.appendChild(curToNodeChild);
                    onNodeAdded(curToNodeChild);
                }

                if (curToNodeChild.nodeType === ELEMENT_NODE &&
                    (curToNodeId || curToNodeChild.firstChild)) {
                    // The element that was just added to the original DOM may
                    // have some nested elements with a key/ID that needs to be
                    // matched up with other elements. We'll add the element to
                    // a list so that we can later process the nested elements
                    // if there are any unmatched keyed elements that were
                    // discarded
                    movedEls.push(curToNodeChild);
                }

                curToNodeChild = toNextSibling;
                curFromNodeChild = fromNextSibling;
            }

            // We have processed all of the "to nodes". If curFromNodeChild is
            // non-null then we still have some from nodes left over that need
            // to be removed
            while (curFromNodeChild) {
                fromNextSibling = curFromNodeChild.nextSibling;
                removeNode(curFromNodeChild, fromEl, alreadyVisited);
                curFromNodeChild = fromNextSibling;
            }
        }

        var specialElHandler = specialElHandlers[fromEl.nodeName];
        if (specialElHandler) {
            specialElHandler(fromEl, toEl);
        }
    } // END: morphEl(...)

    var morphedNode = fromNode;
    var morphedNodeType = morphedNode.nodeType;
    var toNodeType = toNode.nodeType;

    if (!childrenOnly) {
        // Handle the case where we are given two DOM nodes that are not
        // compatible (e.g. <div> --> <span> or <div> --> TEXT)
        if (morphedNodeType === ELEMENT_NODE) {
            if (toNodeType === ELEMENT_NODE) {
                if (!compareNodeNames(fromNode, toNode)) {
                    onNodeDiscarded(fromNode);
                    morphedNode = moveChildren(fromNode, createElementNS(toNode.nodeName, toNode.namespaceURI));
                }
            } else {
                // Going from an element node to a text node
                morphedNode = toNode;
            }
        } else if (morphedNodeType === TEXT_NODE || morphedNodeType === COMMENT_NODE) { // Text or comment node
            if (toNodeType === morphedNodeType) {
                morphedNode.nodeValue = toNode.nodeValue;
                return morphedNode;
            } else {
                // Text node to something else
                morphedNode = toNode;
            }
        }
    }

    if (morphedNode === toNode) {
        // The "to node" was not compatible with the "from node" so we had to
        // toss out the "from node" and use the "to node"
        onNodeDiscarded(fromNode);
    } else {
        morphEl(morphedNode, toNode, false, childrenOnly);

        /**
         * What we will do here is walk the tree for the DOM element that was
         * moved from the target DOM tree to the original DOM tree and we will
         * look for keyed elements that could be matched to keyed elements that
         * were earlier discarded.  If we find a match then we will move the
         * saved element into the final DOM tree.
         */
        var handleMovedEl = function(el) {
            var curChild = el.firstChild;
            while (curChild) {
                var nextSibling = curChild.nextSibling;

                var key = getNodeKey(curChild);
                if (key) {
                    var savedEl = savedEls[key];
                    if (savedEl && compareNodeNames(curChild, savedEl)) {
                        curChild.parentNode.replaceChild(savedEl, curChild);
                        // true: already visited the saved el tree
                        morphEl(savedEl, curChild, true);
                        curChild = nextSibling;
                        if (empty(savedEls)) {
                            return false;
                        }
                        continue;
                    }
                }

                if (curChild.nodeType === ELEMENT_NODE) {
                    handleMovedEl(curChild);
                }

                curChild = nextSibling;
            }
        };

        // The loop below is used to possibly match up any discarded
        // elements in the original DOM tree with elemenets from the
        // target tree that were moved over without visiting their
        // children
        if (!empty(savedEls)) {
            handleMovedElsLoop:
            while (movedEls.length) {
                var movedElsTemp = movedEls;
                movedEls = [];
                for (var i=0; i<movedElsTemp.length; i++) {
                    if (handleMovedEl(movedElsTemp[i]) === false) {
                        // There are no more unmatched elements so completely end
                        // the loop
                        break handleMovedElsLoop;
                    }
                }
            }
        }

        // Fire the "onNodeDiscarded" event for any saved elements
        // that never found a new home in the morphed DOM
        for (var savedElId in savedEls) {
            if (savedEls.hasOwnProperty(savedElId)) {
                var savedEl = savedEls[savedElId];
                onNodeDiscarded(savedEl);
                walkDiscardedChildNodes(savedEl);
            }
        }
    }

    if (!childrenOnly && morphedNode !== fromNode && fromNode.parentNode) {
        // If we had to swap out the from node with a new node because the old
        // node was not compatible with the target node then we need to
        // replace the old DOM node in the original DOM tree. This is only
        // possible if the original DOM node was part of a DOM tree which
        // we know is the case if it has a parent node.
        fromNode.parentNode.replaceChild(morphedNode, fromNode);
    }

    return morphedNode;
}

module.exports = morphdom;

},{}],31:[function(require,module,exports){
module.exports = [
  // attribute events (can be set with attributes)
  'onclick',
  'ondblclick',
  'onmousedown',
  'onmouseup',
  'onmouseover',
  'onmousemove',
  'onmouseout',
  'ondragstart',
  'ondrag',
  'ondragenter',
  'ondragleave',
  'ondragover',
  'ondrop',
  'ondragend',
  'onkeydown',
  'onkeypress',
  'onkeyup',
  'onunload',
  'onabort',
  'onerror',
  'onresize',
  'onscroll',
  'onselect',
  'onchange',
  'onsubmit',
  'onreset',
  'onfocus',
  'onblur',
  'oninput',
  // other common events
  'oncontextmenu',
  'onfocusin',
  'onfocusout'
]

},{}],32:[function(require,module,exports){
/* global MutationObserver */
var document = require('global/document')
var window = require('global/window')
var watch = Object.create(null)
var KEY_ID = 'onloadid' + (new Date() % 9e6).toString(36)
var KEY_ATTR = 'data-' + KEY_ID
var INDEX = 0

if (window && window.MutationObserver) {
  var observer = new MutationObserver(function (mutations) {
    if (watch.length < 1) return
    for (var i = 0; i < mutations.length; i++) {
      if (mutations[i].attributeName === KEY_ATTR) {
        eachAttr(mutations[i], turnon, turnoff)
        continue
      }
      eachMutation(mutations[i].removedNodes, turnoff)
      eachMutation(mutations[i].addedNodes, turnon)
    }
  })
  observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeOldValue: true,
    attributeFilter: [KEY_ATTR]
  })
}

module.exports = function onload (el, on, off) {
  on = on || function () {}
  off = off || function () {}
  el.setAttribute(KEY_ATTR, 'o' + INDEX)
  watch['o' + INDEX] = [on, off, 0]
  INDEX += 1
}

function turnon (index) {
  if (watch[index][0] && watch[index][2] === 0) {
    watch[index][0]()
    watch[index][2] = 1
  }
}

function turnoff (index) {
  if (watch[index][1] && watch[index][2] === 1) {
    watch[index][1]()
    watch[index][2] = 0
  }
}

function eachAttr (mutation, on, off) {
  var newValue = mutation.target.getAttribute(KEY_ATTR)
  Object.keys(watch).forEach(function (k) {
    if (mutation.oldValue === k) {
      off(k)
    }
    if (newValue === k) {
      on(k)
    }
  })
}

function eachMutation (nodes, fn) {
  var keys = Object.keys(watch)
  for (var i = 0; i < nodes.length; i++) {
    if (nodes[i] && nodes[i].getAttribute && nodes[i].getAttribute(KEY_ATTR)) {
      var onloadid = nodes[i].getAttribute(KEY_ATTR)
      keys.forEach(function (k) {
        if (onloadid === k) {
          fn(k)
        }
      })
    }
    if (nodes[i].childNodes.length > 0) {
      eachMutation(nodes[i].childNodes, fn)
    }
  }
}

},{"global/document":33,"global/window":34}],33:[function(require,module,exports){
(function (global){
var topLevel = typeof global !== 'undefined' ? global :
    typeof window !== 'undefined' ? window : {}
var minDoc = require('min-document');

if (typeof document !== 'undefined') {
    module.exports = document;
} else {
    var doccy = topLevel['__GLOBAL_DOCUMENT_CACHE@4'];

    if (!doccy) {
        doccy = topLevel['__GLOBAL_DOCUMENT_CACHE@4'] = minDoc;
    }

    module.exports = doccy;
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"min-document":6}],34:[function(require,module,exports){
(function (global){
if (typeof window !== "undefined") {
    module.exports = window;
} else if (typeof global !== "undefined") {
    module.exports = global;
} else if (typeof self !== "undefined"){
    module.exports = self;
} else {
    module.exports = {};
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],35:[function(require,module,exports){
module.exports=[
  {
    "name": "Frankie Johnnie & Luigo Too",
    "address": "939 W El Camino Real, Mountain View, CA",
    "lat": 37.386339,
    "lng": -122.085823
  },
  {
    "name": "Amici's East Coast Pizzeria",
    "address": "790 Castro St, Mountain View, CA",
    "lat": 37.38714,
    "lng": -122.083235
  },
  {
    "name": "Kapp's Pizza Bar & Grill",
    "address": "191 Castro St, Mountain View, CA",
    "lat": 37.393885,
    "lng": -122.078916
  },
  {
    "name": "Round Table Pizza: Mountain View",
    "address": "570 N Shoreline Blvd, Mountain View, CA",
    "lat": 37.402653,
    "lng": -122.079354
  },
  {
    "name": "Tony & Alba's Pizza & Pasta",
    "address": "619 Escuela Ave, Mountain View, CA",
    "lat": 37.394011,
    "lng": -122.095528
  },
  {
    "name": "Oregano's Wood-Fired Pizza",
    "address": "4546 El Camino Real, Los Altos, CA",
    "lat": 37.401724,
    "lng": -122.114646
  },
  {
    "name": "Round Table Pizza: Sunnyvale-Mary-Central Expy",
    "address": "415 N Mary Ave, Sunnyvale, CA",
    "lat": 37.390038,
    "lng": -122.042034
  },
  {
    "name": "Giordano's",
    "address": "730 N Rush St, Chicago, IL",
    "lat": 41.895729,
    "lng": -87.625411
  },
  {
    "name": "Filippi's Pizza Grotto",
    "address": "1747 India St, San Diego, CA",
    "lat": 32.723831,
    "lng": -117.168326
  },
  {
    "name": "Pizzeria Paradiso",
    "address": "2029 P St NW, Washington, DC",
    "lat": 38.90965,
    "lng": -77.0459
  },
  {
    "name": "Tutta Bella Neapolitan Pizzera",
    "address": "4918 Rainier Ave S, Seattle, WA",
    "lat": 47.557704,
    "lng": -122.284985
  },
  {
    "name": "Touche Pasta Pizza Pool",
    "address": "1425 NW Glisan St, Portland, OR",
    "lat": 45.526465,
    "lng": -122.68558
  },
  {
    "name": "Piecora's New York Pizza",
    "address": "1401 E Madison St, Seattle, WA",
    "lat": 47.614005,
    "lng": -122.313985
  },
  {
    "name": "Pagliacci Pizza",
    "address": "550 Queen Anne Ave N, Seattle, WA",
    "lat": 47.623942,
    "lng": -122.356719
  },
  {
    "name": "Zeeks Pizza - Phinney Ridge",
    "address": "6000 Phinney Ave N, Seattle, WA",
    "lat": 47.67267,
    "lng": -122.354092
  },
  {
    "name": "Old Town Pizza",
    "address": "226 NW Davis St, Portland, OR",
    "lat": 45.524557,
    "lng": -122.67268
  },
  {
    "name": "Zeeks Pizza - Belltown",
    "address": "419 Denny Way, Seattle, WA",
    "lat": 47.618314,
    "lng": -122.347998
  },
  {
    "name": "Escape From New York Pizza",
    "address": "622 NW 23rd Ave, Portland, OR",
    "lat": 45.527105,
    "lng": -122.698509
  },
  {
    "name": "Big Fred's Pizza Garden",
    "address": "1101 S 119th St, Omaha, NE",
    "lat": 41.248662,
    "lng": -96.09876
  },
  {
    "name": "Old Chicago",
    "address": "1111 Harney St, Omaha, NE",
    "lat": 41.25652,
    "lng": -95.930683
  },
  {
    "name": "Sgt Peffer's Cafe Italian",
    "address": "1501 N Saddle Creek Rd, Omaha, NE",
    "lat": 41.273084,
    "lng": -95.987816
  },
  {
    "name": "Mama's Pizza",
    "address": "715 N Saddle Creek Rd, Omaha, NE",
    "lat": 41.265883,
    "lng": -95.980682
  },
  {
    "name": "Zio's New York Style Pizzeria",
    "address": "1213 Howard St, Omaha, NE",
    "lat": 41.25545,
    "lng": -95.932022
  },
  {
    "name": "Zio's New York Style Pizzeria",
    "address": "7834 W Dodge Rd, Omaha, NE",
    "lat": 41.26325,
    "lng": -96.0564
  },
  {
    "name": "La Casa Pizzaria",
    "address": "4432 Leavenworth St, Omaha, NE",
    "lat": 41.2524,
    "lng": -95.979578
  },
  {
    "name": "Lou Malnati's Pizzeria",
    "address": "439 N Wells St, Chicago, IL",
    "lat": 41.890346,
    "lng": -87.633927
  },
  {
    "name": "Piece Restaurant",
    "address": "1927 W North Ave, Chicago, IL",
    "lat": 41.910493,
    "lng": -87.676127
  },
  {
    "name": "Connie's Pizza Inc",
    "address": "2373 S Archer Ave, Chicago, IL",
    "lat": 41.849213,
    "lng": -87.641681
  },
  {
    "name": "Exchequer Restaurant",
    "address": "226 S Wabash Ave, Chicago, IL",
    "lat": 41.879189,
    "lng": -87.626079
  },
  {
    "name": "Coco's By The Falls",
    "address": "5339 Murray Street, Niagara Falls, Ontario",
    "lat": 43.083555,
    "lng": -79.082706
  },
  {
    "name": "Pompei",
    "address": "1531 W Taylor St, Chicago, IL",
    "lat": 41.869301,
    "lng": -87.664779
  },
  {
    "name": "Lynn's Paradise Cafe",
    "address": "984 Barret Ave, Louisville, KY",
    "lat": 38.23693,
    "lng": -85.72854
  },
  {
    "name": "Otto Restaurant Enoteca Pizza",
    "address": "1 5th Ave, New York, NY",
    "lat": 40.732161,
    "lng": -73.996321
  },
  {
    "name": "Grimaldi's",
    "address": "19 Old Fulton St, Brooklyn, NY",
    "lat": 40.702515,
    "lng": -73.993733
  },
  {
    "name": "Lombardi's",
    "address": "32 Spring St, New York, NY",
    "lat": 40.721675,
    "lng": -73.995595
  },
  {
    "name": "John's Pizzeria",
    "address": "278 Bleecker St, New York, NY",
    "lat": 40.731706,
    "lng": -74.003271
  },
  {
    "name": "John's Pizzeria",
    "address": "260 W 44th St, New York, NY",
    "lat": 40.758072,
    "lng": -73.987736
  },
  {
    "name": "Burger Joint",
    "address": "2175 Broadway, New York, NY",
    "lat": 40.782398,
    "lng": -73.981
  },
  {
    "name": "Frank Pepe Pizzeria Napoletana",
    "address": "157 Wooster St, New Haven, CT",
    "lat": 41.302803,
    "lng": -72.917042
  },
  {
    "name": "Adrianne's Pizza Bar",
    "address": "54 Stone St, New York, NY",
    "lat": 40.70448,
    "lng": -74.010137
  },
  {
    "name": "Pizzeria Regina: Regina Pizza",
    "address": "11 1/2 Thacher St, Boston, MA",
    "lat": 42.365338,
    "lng": -71.056832
  },
  {
    "name": "Upper Crust",
    "address": "20 Charles St, Boston, MA",
    "lat": 42.356607,
    "lng": -71.069681
  },
  {
    "name": "Bertucci's Brick Oven Rstrnt",
    "address": "4 Brookline Pl, Brookline, MA",
    "lat": 42.331917,
    "lng": -71.115311
  },
  {
    "name": "Aquitaine",
    "address": "569 Tremont St, Boston, MA",
    "lat": 42.343637,
    "lng": -71.072265
  },
  {
    "name": "Bertucci's Brick Oven Rstrnt",
    "address": "43 Stanhope St, Boston, MA",
    "lat": 42.348299,
    "lng": -71.073249
  },
  {
    "name": "Upper Crust",
    "address": "286 Harvard St, Brookline, MA",
    "lat": 42.342856,
    "lng": -71.122311
  },
  {
    "name": "Bertucci's Brick Oven Rstrnt",
    "address": "799 Main St, Cambridge, MA",
    "lat": 42.363259,
    "lng": -71.09721
  },
  {
    "name": "Bertucci's Brick Oven Rstrnt",
    "address": "22 Merchants Row, Boston, MA",
    "lat": 42.359146,
    "lng": -71.055477
  },
  {
    "name": "Vinnie Van Go-Go's",
    "address": "317 W Bryan St, Savannah, GA",
    "lat": 32.081152,
    "lng": -81.094992
  },
  {
    "name": "Domino's Pizza: Myrtle Beach",
    "address": "1706 S Kings Hwy # A, Myrtle Beach, SC",
    "lat": 33.67488,
    "lng": -78.905143
  },
  {
    "name": "East of Chicago Pizza Company",
    "address": "3901 North Kings Highway Suite 1, Myrtle Beach, SC",
    "lat": 33.716097,
    "lng": -78.855582
  },
  {
    "name": "Villa Tronco Italian Rstrnt",
    "address": "1213 Blanding St, Columbia, SC",
    "lat": 34.008048,
    "lng": -81.036314
  },
  {
    "name": "Mellow Mushroom Pizza Bakers",
    "address": "11 W Liberty St, Savannah, GA",
    "lat": 32.074673,
    "lng": -81.093699
  },
  {
    "name": "Andolinis Pizza",
    "address": "82 Wentworth St, Charleston, SC",
    "lat": 32.78233,
    "lng": -79.934236
  },
  {
    "name": "Mellow Mushroom Pizza Bakers",
    "address": "259 E Broad St, Athens, GA",
    "lat": 33.9578,
    "lng": -83.37466
  },
  {
    "name": "Bucks Pizza of Edisto Beach Inc",
    "address": "114 Jungle Rd, Edisto Island, SC",
    "lat": 32.503973,
    "lng": -80.297947
  },
  {
    "name": "Anthony's Coal Fired Pizza",
    "address": "2203 S Federal Hwy, Fort Lauderdale, FL",
    "lat": 26.094671,
    "lng": -80.136689
  },
  {
    "name": "Giordano's",
    "address": "12151 S Apopka Vineland Rd, Orlando, FL",
    "lat": 28.389367,
    "lng": -81.506222
  },
  {
    "name": "Pizza Rustica",
    "address": "863 Washington Ave, Miami Beach, FL",
    "lat": 25.779059,
    "lng": -80.133107
  },
  {
    "name": "Mama Jennie's Italian Restaurant",
    "address": "11720 Ne 2nd Ave, North Miami, FL",
    "lat": 25.882782,
    "lng": -80.19429
  },
  {
    "name": "Anthony's Coal Fired Pizza",
    "address": "17901 Biscayne Blvd, Aventura, FL",
    "lat": 25.941116,
    "lng": -80.148826
  },
  {
    "name": "Anthony's Coal Fired Pizza",
    "address": "4527 Weston Rd, Weston, FL",
    "lat": 26.065395,
    "lng": -80.362442
  },
  {
    "name": "Mario the Baker Pizza & Italian Restaurant",
    "address": "13695 W Dixie Hwy, North Miami, FL",
    "lat": 25.92974,
    "lng": -80.15609
  },
  {
    "name": "Big Cheese Pizza",
    "address": "8080 SW 67th Ave, Miami, FL",
    "lat": 25.696025,
    "lng": -80.301113
  },
  {
    "name": "Ingleside Village Pizza",
    "address": "2396 Ingleside Ave, Macon, GA",
    "lat": 32.85376,
    "lng": -83.657406
  },
  {
    "name": "Ciao Bella Pizza Da Guglielmo",
    "address": "29 Highway 98 E, Destin, FL",
    "lat": 30.395556,
    "lng": -86.512093
  },
  {
    "name": "Papa John's Pizza",
    "address": "810 Russell Pkwy, Warner Robins, GA",
    "lat": 32.593911,
    "lng": -83.637075
  },
  {
    "name": "Papa John's Pizza: East Central Montgomery",
    "address": "2525 Madison Ave, Montgomery, AL",
    "lat": 32.381121,
    "lng": -86.273035
  },
  {
    "name": "Cici's Pizza",
    "address": "6268 Atlanta Hwy, Montgomery, AL",
    "lat": 32.382205,
    "lng": -86.190675
  },
  {
    "name": "Papa John's Pizza",
    "address": "1210 E Jackson St, Thomasville, GA",
    "lat": 30.849129,
    "lng": -83.963428
  },
  {
    "name": "Papa John's Pizza",
    "address": "711 N Westover Blvd # G, Albany, GA",
    "lat": 31.61397,
    "lng": -84.22308
  },
  {
    "name": "Mellow Mushroom Pizza Bakers",
    "address": "6100 Veterans Pkwy, Columbus, GA",
    "lat": 32.532078,
    "lng": -84.955894
  },
  {
    "name": "Star Pizza",
    "address": "2111 Norfolk St, Houston, TX",
    "lat": 29.732452,
    "lng": -95.411058
  },
  {
    "name": "Star Pizza II",
    "address": "77 Harvard St, Houston, TX",
    "lat": 29.770751,
    "lng": -95.396042
  },
  {
    "name": "Brothers Pizzeria",
    "address": "1029 Highway 6 N # 100, Houston, TX",
    "lat": 29.768337,
    "lng": -95.643594
  },
  {
    "name": "11th Street Cafe Inc",
    "address": "748 E 11th St, Houston, TX",
    "lat": 29.790794,
    "lng": -95.388921
  },
  {
    "name": "California Pizza Kitchen",
    "address": "1705 Post Oak Blvd # A, Houston, TX",
    "lat": 29.750172,
    "lng": -95.461199
  },
  {
    "name": "Collina's Italian Cafe",
    "address": "3835 Richmond Ave, Houston, TX",
    "lat": 29.73262,
    "lng": -95.438964
  },
  {
    "name": "Barry's Pizza & Italian Diner",
    "address": "6003 Richmond Ave, Houston, TX",
    "lat": 29.73143,
    "lng": -95.484382
  },
  {
    "name": "Mario's Seawall Italian Restaurant",
    "address": "628 Seawall Blvd, Galveston, TX",
    "lat": 29.304542,
    "lng": -94.772598
  },
  {
    "name": "Campisi's Egyptian Restaurant",
    "address": "5610 E Mockingbird Ln, Dallas, TX",
    "lat": 32.83651,
    "lng": -96.771781
  },
  {
    "name": "Fat Joe's Pizza Pasta & Bar",
    "address": "4721 W Park Blvd # 101, Plano, TX",
    "lat": 33.027055,
    "lng": -96.788912
  },
  {
    "name": "Saccone's Pizza",
    "address": "13812 N Highway 183, Austin, TX",
    "lat": 29.569507,
    "lng": -97.964663
  },
  {
    "name": "Fireside Pies",
    "address": "2820 N Henderson Ave, Dallas, TX",
    "lat": 32.819762,
    "lng": -96.784148
  },
  {
    "name": "Romeo's",
    "address": "1500 Barton Springs Rd, Austin, TX",
    "lat": 30.261526,
    "lng": -97.760022
  },
  {
    "name": "Sandella's Cafe",
    "address": "5910 N Macarthur Blvd, Irving, TX",
    "lat": 32.892002,
    "lng": -96.961188
  },
  {
    "name": "Mangia Chicago Stuffed Pizza",
    "address": "3500 Guadalupe St, Austin, TX",
    "lat": 30.301543,
    "lng": -97.739112
  },
  {
    "name": "Frank & Angie's",
    "address": "508 West Ave, Austin, TX",
    "lat": 30.269393,
    "lng": -97.750889
  },
  {
    "name": "Pizzeria Bianco",
    "address": "623 E Adams St, Phoenix, AZ",
    "lat": 33.449377,
    "lng": -112.065521
  },
  {
    "name": "Sammy's Woodfired Pizza",
    "address": "770 4th Ave, San Diego, CA",
    "lat": 32.713382,
    "lng": -117.16118
  },
  {
    "name": "Casa Bianca Pizza Pie",
    "address": "1650 Colorado Blvd, Los Angeles, CA",
    "lat": 34.139159,
    "lng": -118.204608
  },
  {
    "name": "Parkway Grill",
    "address": "510 S Arroyo Pkwy, Pasadena, CA",
    "lat": 34.137003,
    "lng": -118.147303
  },
  {
    "name": "California Pizza Kitchen",
    "address": "330 S Hope St, Los Angeles, CA",
    "lat": 34.05333,
    "lng": -118.252683
  },
  {
    "name": "B J's Pizza & Grill",
    "address": "200 Main St # 101, Huntington Beach, CA",
    "lat": 33.658058,
    "lng": -118.001101
  },
  {
    "name": "B J's Restaurant & Brewhouse",
    "address": "280 S Coast Hwy, Laguna Beach, CA",
    "lat": 33.54209,
    "lng": -117.783516
  },
  {
    "name": "Beau Jo's Pizza",
    "address": "2710 S Colorado Blvd, Denver, CO",
    "lat": 39.667342,
    "lng": -104.940708
  },
  {
    "name": "Pasquini's Pizzeria",
    "address": "1310 S Broadway, Denver, CO",
    "lat": 39.692824,
    "lng": -104.987463
  },
  {
    "name": "Fargos Pizza Co",
    "address": "2910 E Platte Ave, Colorado Springs, CO",
    "lat": 38.839847,
    "lng": -104.774423
  },
  {
    "name": "Old Chicago",
    "address": "1415 Market St, Denver, CO",
    "lat": 39.748177,
    "lng": -105.000501
  },
  {
    "name": "Sink",
    "address": "1165 13th St, Boulder, CO",
    "lat": 40.00821,
    "lng": -105.276236
  },
  {
    "name": "Ligori's Pizza & Pasta",
    "address": "4421 Harrison Blvd, Ogden, UT",
    "lat": 41.182732,
    "lng": -111.949199
  },
  {
    "name": "Old Chicago",
    "address": "1102 Pearl St, Boulder, CO",
    "lat": 40.017591,
    "lng": -105.28099
  },
  {
    "name": "Boston's Restaurant & Sports",
    "address": "620 E Disk Dr, Rapid City, SD",
    "lat": 44.106938,
    "lng": -103.205226
  },
  {
    "name": "Chuck E Cheese's Pizza",
    "address": "100 24th St W # B, Billings, MT",
    "lat": 45.771355,
    "lng": -108.57629
  },
  {
    "name": "Space Aliens Grill & Bar",
    "address": "1304 E Century Ave, Bismarck, ND",
    "lat": 46.83808,
    "lng": -100.771734
  },
  {
    "name": "2nd Street Bistro",
    "address": "123 North 2nd Street, Livingston, MT",
    "lat": 45.661014,
    "lng": -110.561422
  },
  {
    "name": "Domino's Pizza",
    "address": "1524 S Broadway # 1, Minot, ND",
    "lat": 48.219657,
    "lng": -101.296037
  },
  {
    "name": "American Classic Pizzeria",
    "address": "1744 Grand Ave, Billings, MT",
    "lat": 45.78412,
    "lng": -108.560205
  },
  {
    "name": "Godfather's Pizza",
    "address": "905 Main St, Billings, MT",
    "lat": 45.81508,
    "lng": -108.470758
  },
  {
    "name": "Papa John's Pizza",
    "address": "605 Main St, Billings, MT",
    "lat": 45.810222,
    "lng": -108.472125
  },
  {
    "name": "Aardvark Pizza & Sub",
    "address": "304A Caribou St, Banff, AB",
    "lat": 51.176488,
    "lng": -115.570751
  },
  {
    "name": "Jasper Pizza Place",
    "address": "402 Connaught Dr, Jasper, AB",
    "lat": 52.879085,
    "lng": -118.079319
  },
  {
    "name": "Odyssey Pizza & Steak House",
    "address": "3-3814 Bow Trail SW, Calgary, AB",
    "lat": 51.045233,
    "lng": -114.141249
  },
  {
    "name": "Basil's Pizza",
    "address": "2118 33 Avenue SW, Calgary, AB",
    "lat": 51.023981,
    "lng": -114.109903
  },
  {
    "name": "Castle Pizza & Donair",
    "address": "7724 Elbow Drive SW, Calgary, AB",
    "lat": 50.984497,
    "lng": -114.08315
  },
  {
    "name": "Santa Lucia Italian Restaurant",
    "address": "714 8 St, Canmore, AB",
    "lat": 51.089195,
    "lng": -115.358733
  },
  {
    "name": "Tops Pizza & Steak House No 3",
    "address": "7-5602 4 Street NW, Calgary, AB",
    "lat": 51.101205,
    "lng": -114.071458
  },
  {
    "name": "Evvia Restaurant",
    "address": "837 Main St, Canmore, AB",
    "lat": 51.089177,
    "lng": -115.361767
  },
  {
    "name": "D&#39;Bronx",
    "address": "3904 Bell St, Kansas City, MO",
    "lat": 39.057182,
    "lng": -94.606105
  },
  {
    "name": "Cicero's Restaurant & Entrtnmt",
    "address": "6691 Delmar Blvd, St Louis, MO",
    "lat": 38.656308,
    "lng": -90.308439
  },
  {
    "name": "Hideaway Pizza",
    "address": "6616 N Western Ave, Oklahoma City, OK",
    "lat": 35.539114,
    "lng": -97.52976
  },
  {
    "name": "Fortel's Pizza Den",
    "address": "7932 Mackenzie Rd, St Louis, MO",
    "lat": 38.566441,
    "lng": -90.320792
  },
  {
    "name": "Hideaway Pizza",
    "address": "7877 E 51st St, Tulsa, OK",
    "lat": 36.089897,
    "lng": -95.889241
  },
  {
    "name": "Farotto's Catering",
    "address": "9525 Manchester Rd, Webster Groves, MO",
    "lat": 38.609327,
    "lng": -90.364435
  },
  {
    "name": "California Pizza Kitchen",
    "address": "1493 Saint Louis Galleria, St Louis, MO",
    "lat": 38.633613,
    "lng": -90.345949
  },
  {
    "name": "D'Bronx",
    "address": "2450 Grand Blvd # 124, Kansas City, MO",
    "lat": 39.082723,
    "lng": -94.58178
  },
  {
    "name": "Giuseppe's Depot Restaurant",
    "address": "10 S Sierra Madre St, Colorado Springs, CO",
    "lat": 38.834548,
    "lng": -104.828297
  },
  {
    "name": "Old Chicago",
    "address": "1415 Market St, Denver, CO",
    "lat": 39.748177,
    "lng": -105.000501
  },
  {
    "name": "Brick Oven Restaurant",
    "address": "111 E 800 N, Provo, UT",
    "lat": 40.244493,
    "lng": -111.656322
  },
  {
    "name": "Zachary's Chicago Pizza",
    "address": "5801 College Ave, Oakland, CA",
    "lat": 37.846179,
    "lng": -122.251951
  },
  {
    "name": "Zachary's Chicago Pizza",
    "address": "1853 Solano Ave, Berkeley, CA",
    "lat": 37.891407,
    "lng": -122.27843
  },
  {
    "name": "Cheese Board Pizza",
    "address": "1512 Shattuck Ave, Berkeley, CA",
    "lat": 37.879976,
    "lng": -122.269275
  },
  {
    "name": "Goat Hill Pizza",
    "address": "300 Connecticut St, San Francisco, CA",
    "lat": 37.762431,
    "lng": -122.397617
  },
  {
    "name": "Tommaso Ristorante Italiano",
    "address": "1042 Kearny St, San Francisco, CA",
    "lat": 37.797388,
    "lng": -122.405374
  },
  {
    "name": "Little Star Pizza LLC",
    "address": "846 Divisadero St, San Francisco, CA",
    "lat": 37.77752,
    "lng": -122.438215
  },
  {
    "name": "Pauline's Pizza",
    "address": "260 Valencia, San Francisco, CA",
    "lat": 37.768725,
    "lng": -122.422245
  },
  {
    "name": "Villa Romana Pizzeria & Rstrnt",
    "address": "731 Irving St, San Francisco, CA",
    "lat": 37.764074,
    "lng": -122.465581
  },
  {
    "name": "Amici's East Coast Pizzeria",
    "address": "69 E 3rd Ave, San Mateo, CA",
    "lat": 37.563896,
    "lng": -122.32472
  },
  {
    "name": "Amici's East Coast Pizzeria",
    "address": "226 Redwood Shores Pkwy, Redwood City, CA",
    "lat": 37.520516,
    "lng": -122.252255
  },
  {
    "name": "North Beach Pizza",
    "address": "240 E 3rd Ave, San Mateo, CA",
    "lat": 37.565325,
    "lng": -122.322643
  },
  {
    "name": "Patxi's Chicago Pizza",
    "address": "441 Emerson St, Palo Alto, CA",
    "lat": 37.445148,
    "lng": -122.163553
  },
  {
    "name": "Pizz'a Chicago",
    "address": "4115 El Camino Real, Palo Alto, CA",
    "lat": 37.414106,
    "lng": -122.126223
  },
  {
    "name": "California Pizza Kitchen",
    "address": "531 Cowper St, Palo Alto, CA",
    "lat": 37.448075,
    "lng": -122.158813
  },
  {
    "name": "Windy City Pizza",
    "address": "35 Bovet Rd, San Mateo, CA",
    "lat": 37.551562,
    "lng": -122.314525
  },
  {
    "name": "Applewood Pizza 2 Go",
    "address": "1001 El Camino Real, Menlo Park, CA",
    "lat": 37.452966,
    "lng": -122.181722
  },
  {
    "name": "Pizza Antica",
    "address": "334 Santana Row # 1065, San Jose, CA",
    "lat": 37.321792,
    "lng": -121.947735
  },
  {
    "name": "Pizz'a Chicago",
    "address": "155 W San Fernando St, San Jose, CA",
    "lat": 37.333277,
    "lng": -121.891677
  },
  {
    "name": "House of Pizza",
    "address": "527 S Almaden Ave, San Jose, CA",
    "lat": 37.326353,
    "lng": -121.888165
  },
  {
    "name": "Amici's East Coast Pizzeria",
    "address": "225 W Santa Clara St, San Jose, CA",
    "lat": 37.334702,
    "lng": -121.894045
  },
  {
    "name": "Fiorillo's Restaurant",
    "address": "638 El Camino Real, Santa Clara, CA",
    "lat": 37.354603,
    "lng": -121.942577
  },
  {
    "name": "Tony & Alba's Pizza & Pasta",
    "address": "3137 Stevens Creek Blvd, San Jose, CA",
    "lat": 37.323297,
    "lng": -121.951646
  },
  {
    "name": "Giorgio's",
    "address": "1445 Foxworthy Ave, San Jose, CA",
    "lat": 37.274648,
    "lng": -121.892893
  },
  {
    "name": "Round Table Pizza",
    "address": "4302 Moorpark Ave, San Jose, CA",
    "lat": 37.315903,
    "lng": -121.977925
  }
]

},{}]},{},[3])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJjb21wb25lbnRzL2dvb2dsZS1tYXAuanMiLCJjb21wb25lbnRzL3NpZGUtYmFyLmpzIiwiaW5kZXguanMiLCJtYXAtc3R5bGVzLmpzb24iLCJub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYXNzZXJ0L2Fzc2VydC5qcyIsIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXJlc29sdmUvZW1wdHkuanMiLCJub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvaW5oZXJpdHMvaW5oZXJpdHNfYnJvd3Nlci5qcyIsIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9wcm9jZXNzL2Jyb3dzZXIuanMiLCJub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvdXRpbC9zdXBwb3J0L2lzQnVmZmVyQnJvd3Nlci5qcyIsIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy91dGlsL3V0aWwuanMiLCJub2RlX21vZHVsZXMvY2hvby9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9jaG9vL25vZGVfbW9kdWxlcy9nbG9iYWwvZG9jdW1lbnQuanMiLCJub2RlX21vZHVsZXMvY2hvby9ub2RlX21vZHVsZXMvZ2xvYmFsL3dpbmRvdy5qcyIsIm5vZGVfbW9kdWxlcy9jaG9vL25vZGVfbW9kdWxlcy9oYXNoLW1hdGNoL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2Nob28vbm9kZV9tb2R1bGVzL3NlbmQtYWN0aW9uL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2Nob28vbm9kZV9tb2R1bGVzL3NoZWV0LXJvdXRlci9oYXNoLmpzIiwibm9kZV9tb2R1bGVzL2Nob28vbm9kZV9tb2R1bGVzL3NoZWV0LXJvdXRlci9oaXN0b3J5LmpzIiwibm9kZV9tb2R1bGVzL2Nob28vbm9kZV9tb2R1bGVzL3NoZWV0LXJvdXRlci9ocmVmLmpzIiwibm9kZV9tb2R1bGVzL2Nob28vbm9kZV9tb2R1bGVzL3NoZWV0LXJvdXRlci9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9jaG9vL25vZGVfbW9kdWxlcy9zaGVldC1yb3V0ZXIvbm9kZV9tb2R1bGVzL3BhdGhuYW1lLW1hdGNoL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2Nob28vbm9kZV9tb2R1bGVzL3NoZWV0LXJvdXRlci9ub2RlX21vZHVsZXMvc2xpY2VkL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2Nob28vbm9kZV9tb2R1bGVzL3NoZWV0LXJvdXRlci9ub2RlX21vZHVsZXMvd2F5ZmFyZXIvaW5kZXguanMiLCJub2RlX21vZHVsZXMvY2hvby9ub2RlX21vZHVsZXMvc2hlZXQtcm91dGVyL25vZGVfbW9kdWxlcy93YXlmYXJlci90cmllLmpzIiwibm9kZV9tb2R1bGVzL2Nob28vbm9kZV9tb2R1bGVzL3h0ZW5kL2ltbXV0YWJsZS5qcyIsIm5vZGVfbW9kdWxlcy9jaG9vL25vZGVfbW9kdWxlcy94dGVuZC9tdXRhYmxlLmpzIiwibm9kZV9tb2R1bGVzL2Nob28vbm9kZV9tb2R1bGVzL3lvLXlvL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2Nob28vbm9kZV9tb2R1bGVzL3lvLXlvL25vZGVfbW9kdWxlcy9iZWwvaW5kZXguanMiLCJub2RlX21vZHVsZXMvY2hvby9ub2RlX21vZHVsZXMveW8teW8vbm9kZV9tb2R1bGVzL2JlbC9ub2RlX21vZHVsZXMvaHlwZXJ4L2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2Nob28vbm9kZV9tb2R1bGVzL3lvLXlvL25vZGVfbW9kdWxlcy9iZWwvbm9kZV9tb2R1bGVzL2h5cGVyeC9ub2RlX21vZHVsZXMvaHlwZXJzY3JpcHQtYXR0cmlidXRlLXRvLXByb3BlcnR5L2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2Nob28vbm9kZV9tb2R1bGVzL3lvLXlvL25vZGVfbW9kdWxlcy9tb3JwaGRvbS9saWIvaW5kZXguanMiLCJub2RlX21vZHVsZXMvY2hvby9ub2RlX21vZHVsZXMveW8teW8vdXBkYXRlLWV2ZW50cy5qcyIsIm5vZGVfbW9kdWxlcy9vbi1sb2FkL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL29uLWxvYWQvbm9kZV9tb2R1bGVzL2dsb2JhbC9kb2N1bWVudC5qcyIsIm5vZGVfbW9kdWxlcy9vbi1sb2FkL25vZGVfbW9kdWxlcy9nbG9iYWwvd2luZG93LmpzIiwic3RvcmVzLmpzb24iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7OztrQkNNd0IsTzs7QUFOeEI7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7OztJQUVjLEksa0JBQU4sSTtBQUVPLFNBQVMsT0FBVCxDQUFpQixNQUFqQixFQUF5QixLQUF6QixFQUFnQyxJQUFoQyxFQUFzQztBQUNuRCxNQUFJLE9BQU8sSUFBUCxpQkFBSjs7QUFLQSx3QkFBTyxJQUFQLEVBQWEsWUFBTTtBQUNqQixZQUFRLElBQVIsRUFBYyxLQUFkO0FBQ0QsR0FGRDs7QUFJQSxTQUFPLElBQVA7QUFDRDs7QUFFRCxTQUFTLE9BQVQsQ0FBaUIsSUFBakIsRUFBdUIsS0FBdkIsRUFBOEI7QUFDNUIsTUFBSSxNQUFNLElBQUksT0FBTyxJQUFQLENBQVksR0FBaEIsQ0FBb0IsSUFBcEIsRUFBMEI7QUFDbEMsWUFBUSxNQUFNLE1BQU4sQ0FBYSxZQURhO0FBRWxDLFVBQU0sQ0FGNEI7QUFHbEM7QUFIa0MsR0FBMUIsQ0FBVjtBQUtBLE1BQUksU0FBUyxNQUFNLE1BQU4sQ0FBYSxhQUExQjs7QUFFQSxTQUFPLE9BQVAsQ0FBZSxpQkFBUztBQUN0QixVQUFNLE1BQU4sR0FBZSxJQUFJLE9BQU8sSUFBUCxDQUFZLE1BQWhCLENBQXVCO0FBQ3BDLGdCQUFVLEVBQUUsS0FBSyxNQUFNLEdBQWIsRUFBa0IsS0FBSyxNQUFNLEdBQTdCLEVBRDBCO0FBRXBDLGFBQU8sTUFBTSxJQUZ1QjtBQUdwQyxhQUFPO0FBSDZCLEtBQXZCLENBQWY7QUFLRCxHQU5EOztBQVFBLFNBQU8sT0FBUCxDQUFlO0FBQUEsV0FBUyxNQUFNLE1BQU4sQ0FBYSxNQUFiLENBQW9CLEdBQXBCLENBQVQ7QUFBQSxHQUFmO0FBQ0EsU0FBTyxJQUFQLENBQVksS0FBWixDQUFrQixPQUFsQixDQUEwQixHQUExQixFQUErQixRQUEvQjtBQUNBLFFBQU0sTUFBTixDQUFhLEdBQWIsR0FBbUIsR0FBbkI7QUFDRDs7Ozs7Ozs7Ozs7O2tCQ2xDdUIsVzs7QUFKeEI7Ozs7Ozs7O0lBRWMsSSxrQkFBTixJO0FBRU8sU0FBUyxXQUFULENBQXFCLE1BQXJCLEVBQTZCLEtBQTdCLEVBQW9DLElBQXBDLEVBQTBDO0FBQ3ZELE1BQUksWUFBWSxNQUFNLE1BQU4sQ0FBYSxhQUE3Qjs7QUFFQSxNQUFJLE9BQU8sSUFBUCxrQkFFa0I7QUFBQSxXQUFNLEtBQUssZ0JBQUwsQ0FBTjtBQUFBLEdBRmxCLEVBR2tCO0FBQUEsV0FBTSxLQUFLLG9CQUFMLENBQU47QUFBQSxHQUhsQixFQU1JLFVBQVUsR0FBVixDQUFjLGdCQUFRO0FBQ3BCLFdBQU8sSUFBUCxtQkFDZ0I7QUFBQSxhQUFNLEtBQUssZUFBTCxFQUFzQixFQUFFLFNBQVMsSUFBWCxFQUF0QixDQUFOO0FBQUEsS0FEaEIsRUFFTSxLQUFLLElBRlgsRUFFa0IsS0FBSyxRQUFMLEdBQWdCLE9BQU8sS0FBSyxRQUFaLEdBQXVCLElBQXZDLEdBQThDLEVBRmhFO0FBS0QsR0FORCxDQU5KLENBQUo7O0FBa0JBLFNBQU8sSUFBUDtBQUNEOzs7Ozs7O0FDMUJEOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7OztBQUVBLElBQU0sTUFBTSxxQkFBWjtJQUNRLHNCLEdBQTJCLE9BQU8sSUFBUCxDQUFZLFFBQVosQ0FBcUIsUyxDQUFoRCxzQjs7QUFDUixJQUFNLEtBQUssSUFBSSxPQUFPLElBQVAsQ0FBWSxVQUFoQixFQUFYOztBQUVBLElBQUksS0FBSixDQUFVO0FBQ1IsYUFBVyxRQURIO0FBRVIsU0FBTztBQUNMLG1DQURLO0FBRUwsa0JBQWMsRUFBRSxLQUFLLGlCQUFQLEVBQTBCLEtBQUssQ0FBQyxpQkFBaEM7QUFGVCxHQUZDOztBQU9SLFlBQVU7QUFDUixXQURRLG1CQUNBLE1BREEsRUFDUSxLQURSLEVBQ2U7QUFDckIsWUFBTSxhQUFOO0FBQ0EsYUFBTyxLQUFQO0FBQ0QsS0FKTztBQU1SLGlCQU5RLHlCQU1NLE1BTk4sRUFNYyxLQU5kLEVBTXFCO0FBQzNCLFlBQU0sYUFBTixHQUFzQixPQUFPLE9BQTdCO0FBQ0EsWUFBTSxZQUFOLEdBQXFCLE9BQU8sUUFBNUI7QUFDQSxhQUFPLEtBQVA7QUFDRDtBQVZPLEdBUEY7O0FBb0JSLFdBQVM7QUFDUCxVQURPLGtCQUNBLE1BREEsRUFDUSxLQURSLEVBQ2UsSUFEZixFQUNxQjtBQUMxQixVQUFJLFFBQVEsT0FBTyxPQUFuQjtBQUNBLFNBQUcsV0FBSCxDQUFlLEVBQUUsS0FBSyxNQUFNLEdBQWIsRUFBa0IsS0FBSyxNQUFNLEdBQTdCLEVBQWY7QUFDQSxTQUFHLFVBQUgsQ0FBYyxNQUFNLElBQXBCO0FBQ0EsU0FBRyxJQUFILENBQVEsTUFBTSxHQUFkLEVBQW1CLE1BQU0sTUFBekI7QUFDRCxLQU5NO0FBUVAsZUFSTyx1QkFRSyxNQVJMLEVBUWEsS0FSYixFQVFvQixJQVJwQixFQVEwQjtBQUMvQixnQkFBVSxXQUFWLENBQXNCLGtCQUF0QixDQUF5QyxVQUFTLFFBQVQsRUFBbUI7QUFDMUQsWUFBSSxlQUFlLElBQUksT0FBTyxJQUFQLENBQVksTUFBaEIsQ0FBdUIsU0FBUyxNQUFULENBQWdCLFFBQXZDLEVBQWlELFNBQVMsTUFBVCxDQUFnQixTQUFqRSxDQUFuQjtBQUNBLFlBQUksVUFBVSxpQkFBTyxHQUFQLENBQVcsaUJBQVM7QUFDaEMsY0FBSSxXQUFXLHVCQUF1QixJQUFJLE9BQU8sSUFBUCxDQUFZLE1BQWhCLENBQXVCLE1BQU0sR0FBN0IsRUFBa0MsTUFBTSxHQUF4QyxDQUF2QixFQUFxRSxZQUFyRSxDQUFmO0FBQ0EsZ0JBQU0sUUFBTixHQUFpQixLQUFLLElBQUwsQ0FBVSxXQUFXLFdBQXJCLENBQWpCO0FBQ0EsaUJBQU8sS0FBUDtBQUNELFNBSmEsRUFJWCxNQUpXLENBSUo7QUFBQSxpQkFBUyxNQUFNLFFBQU4sR0FBaUIsR0FBMUI7QUFBQSxTQUpJLENBQWQ7QUFLQSxhQUFLLHNCQUFMLEVBQTZCLEVBQUUsU0FBUyxPQUFYLEVBQW9CLFVBQVUsWUFBOUIsRUFBN0I7QUFDRCxPQVJEO0FBU0Q7QUFsQk07QUFwQkQsQ0FBVjs7QUEyQ0EsSUFBTSxXQUFXLFNBQVgsUUFBVyxDQUFDLE1BQUQsRUFBUyxLQUFULEVBQWdCLElBQWhCLEVBQXlCO0FBQ3hDLFNBQU8sZUFBSyxJQUFaLGtCQUVNLHlCQUFVLE1BQVYsRUFBa0IsS0FBbEIsRUFBeUIsSUFBekIsQ0FGTixFQUdNLHVCQUFRLE1BQVIsRUFBZ0IsS0FBaEIsRUFBdUIsSUFBdkIsQ0FITjtBQU1ELENBUEQ7O0FBVUEsSUFBSSxNQUFKLENBQVcsVUFBQyxLQUFELEVBQVc7QUFDcEIsU0FBTyxDQUNMLE1BQU0sR0FBTixFQUFXLFFBQVgsQ0FESyxDQUFQO0FBR0QsQ0FKRDs7QUFNQSxJQUFNLE9BQU8sSUFBSSxLQUFKLEVBQWI7O0FBRUEsU0FBUyxJQUFULENBQWMsV0FBZCxDQUEwQixJQUExQjs7O0FDdEVBO0FBQ0E7O0FDREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZXQTs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2SEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDMWtCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDL1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUMzQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZRQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNWpCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDL0VBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCBjaG9vIGZyb20gJ2Nob28nO1xuaW1wb3J0IG9ubG9hZCBmcm9tICdvbi1sb2FkJztcbmltcG9ydCBzdHlsZXMgZnJvbSAnLi4vbWFwLXN0eWxlcy5qc29uJztcblxuY29uc3QgeyB2aWV3OiBodG1sIH0gPSBjaG9vO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBtYXBWaWV3KHBhcmFtcywgc3RhdGUsIHNlbmQpIHtcbiAgbGV0IHRyZWUgPSBodG1sYFxuICAgIDxnb29nbGUtbWFwPlxuICAgIDwvZ29vZ2xlLW1hcD5cbiAgYDtcblxuICBvbmxvYWQodHJlZSwgKCkgPT4ge1xuICAgIGxvYWRNYXAodHJlZSwgc3RhdGUpO1xuICB9KTtcblxuICByZXR1cm4gdHJlZTtcbn1cblxuZnVuY3Rpb24gbG9hZE1hcCh0cmVlLCBzdGF0ZSkge1xuICBsZXQgbWFwID0gbmV3IGdvb2dsZS5tYXBzLk1hcCh0cmVlLCB7XG4gICAgY2VudGVyOiBzdGF0ZS5zdG9yZXMudXNlckxvY2F0aW9uLFxuICAgIHpvb206IDUsXG4gICAgc3R5bGVzXG4gIH0pO1xuICBsZXQgc3RvcmVzID0gc3RhdGUuc3RvcmVzLnZpc2libGVTdG9yZXM7XG5cbiAgc3RvcmVzLmZvckVhY2goc3RvcmUgPT4ge1xuICAgIHN0b3JlLm1hcmtlciA9IG5ldyBnb29nbGUubWFwcy5NYXJrZXIoe1xuICAgICAgcG9zaXRpb246IHsgbGF0OiBzdG9yZS5sYXQsIGxuZzogc3RvcmUubG5nIH0sXG4gICAgICB0aXRsZTogc3RvcmUubmFtZSxcbiAgICAgIGxhYmVsOiAnUCdcbiAgICB9KTtcbiAgfSk7XG5cbiAgc3RvcmVzLmZvckVhY2goc3RvcmUgPT4gc3RvcmUubWFya2VyLnNldE1hcChtYXApKTtcbiAgZ29vZ2xlLm1hcHMuZXZlbnQudHJpZ2dlcihtYXAsICdyZXNpemUnKTtcbiAgc3RhdGUuc3RvcmVzLm1hcCA9IG1hcDtcbn1cbiIsImltcG9ydCBjaG9vIGZyb20gJ2Nob28nO1xuXG5jb25zdCB7IHZpZXc6IGh0bWwgfSA9IGNob287XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHNpZGVCYXJWaWV3KHBhcmFtcywgc3RhdGUsIHNlbmQpIHtcbiAgdmFyIGFsbFN0b3JlcyA9IHN0YXRlLnN0b3Jlcy52aXNpYmxlU3RvcmVzO1xuXG4gIGxldCB0cmVlID0gaHRtbGBcbiAgICA8c2lkZS1iYXI+XG4gICAgICA8YnV0dG9uIG9uY2xpY2s9JHsoKSA9PiBzZW5kKCdzdG9yZXM6c2hvd0FsbCcpfT5BbGwgTG9jYXRpb25zPC9idXR0b24+XG4gICAgICA8YnV0dG9uIG9uY2xpY2s9JHsoKSA9PiBzZW5kKCdzdG9yZXM6c2hvd0Nsb3Nlc3QnKX0+Q2xvc2VzdCBMb2NhdGlvbnM8L2J1dHRvbj5cbiAgICAgIDx1bD5cbiAgICAgICAgJHtcbiAgICAgICAgICBhbGxTdG9yZXMubWFwKGl0ZW0gPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGh0bWxgXG4gICAgICAgICAgICAgIDxsaSBvbmNsaWNrPSR7KCkgPT4gc2VuZCgnc3RvcmVzOnNlbGVjdCcsIHsgcGF5bG9hZDogaXRlbSB9KX0+XG4gICAgICAgICAgICAgICAgJHtpdGVtLm5hbWV9JHtpdGVtLmRpc3RhbmNlID8gJzogJyArIGl0ZW0uZGlzdGFuY2UgKyAnbWknIDogJyd9XG4gICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICBgO1xuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIDwvdWw+XG4gICAgPC9zaWRlLWJhcj5cbiAgYDtcblxuICByZXR1cm4gdHJlZTtcbn1cbiIsImltcG9ydCBjaG9vIGZyb20gJ2Nob28nO1xuaW1wb3J0IHN0b3JlcyBmcm9tICcuL3N0b3Jlcyc7XG5pbXBvcnQgR29vZ2xlTWFwIGZyb20gJy4vY29tcG9uZW50cy9nb29nbGUtbWFwJztcbmltcG9ydCBTaWRlQmFyIGZyb20gJy4vY29tcG9uZW50cy9zaWRlLWJhcic7XG5cbmNvbnN0IGFwcCA9IGNob28oKTtcbmNvbnN0IHsgY29tcHV0ZURpc3RhbmNlQmV0d2VlbiB9ID0gZ29vZ2xlLm1hcHMuZ2VvbWV0cnkuc3BoZXJpY2FsO1xuY29uc3QgaXcgPSBuZXcgZ29vZ2xlLm1hcHMuSW5mb1dpbmRvdygpO1xuXG5hcHAubW9kZWwoe1xuICBuYW1lc3BhY2U6ICdzdG9yZXMnLFxuICBzdGF0ZToge1xuICAgIHZpc2libGVTdG9yZXM6IHN0b3JlcyxcbiAgICB1c2VyTG9jYXRpb246IHsgbGF0OiA0Mi4zMzAxMjM1NDYzNDE5OSwgbG5nOiAtNzAuOTU2MjMwMTYzNTc0MjIgfVxuICB9LFxuXG4gIHJlZHVjZXJzOiB7XG4gICAgc2hvd0FsbChhY3Rpb24sIHN0YXRlKSB7XG4gICAgICBzdGF0ZS52aXNpYmxlU3RvcmVzID0gc3RvcmVzO1xuICAgICAgcmV0dXJuIHN0YXRlO1xuICAgIH0sXG5cbiAgICB1cGRhdGVWaXNpYmxlKGFjdGlvbiwgc3RhdGUpIHtcbiAgICAgIHN0YXRlLnZpc2libGVTdG9yZXMgPSBhY3Rpb24ucGF5bG9hZDtcbiAgICAgIHN0YXRlLnVzZXJMb2NhdGlvbiA9IGFjdGlvbi5sb2NhdGlvbjtcbiAgICAgIHJldHVybiBzdGF0ZTtcbiAgICB9XG4gIH0sXG5cbiAgZWZmZWN0czoge1xuICAgIHNlbGVjdChhY3Rpb24sIHN0YXRlLCBzZW5kKSB7XG4gICAgICB2YXIgc3RvcmUgPSBhY3Rpb24ucGF5bG9hZDtcbiAgICAgIGl3LnNldFBvc2l0aW9uKHsgbGF0OiBzdG9yZS5sYXQsIGxuZzogc3RvcmUubG5nIH0pO1xuICAgICAgaXcuc2V0Q29udGVudChzdG9yZS5uYW1lKTtcbiAgICAgIGl3Lm9wZW4oc3RhdGUubWFwLCBzdG9yZS5tYXJrZXIpO1xuICAgIH0sXG5cbiAgICBzaG93Q2xvc2VzdChhY3Rpb24sIHN0YXRlLCBzZW5kKSB7XG4gICAgICBuYXZpZ2F0b3IuZ2VvbG9jYXRpb24uZ2V0Q3VycmVudFBvc2l0aW9uKGZ1bmN0aW9uKHBvc2l0aW9uKSB7XG4gICAgICAgIHZhciB1c2VyTG9jYXRpb24gPSBuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nKHBvc2l0aW9uLmNvb3Jkcy5sYXRpdHVkZSwgcG9zaXRpb24uY29vcmRzLmxvbmdpdHVkZSk7XG4gICAgICAgIHZhciBjbG9zZXN0ID0gc3RvcmVzLm1hcChzdG9yZSA9PiB7XG4gICAgICAgICAgbGV0IGRpc3RhbmNlID0gY29tcHV0ZURpc3RhbmNlQmV0d2VlbihuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nKHN0b3JlLmxhdCwgc3RvcmUubG5nKSwgdXNlckxvY2F0aW9uKTtcbiAgICAgICAgICBzdG9yZS5kaXN0YW5jZSA9IE1hdGguY2VpbChkaXN0YW5jZSAqIDAuMDAwNjIxMzcxKTtcbiAgICAgICAgICByZXR1cm4gc3RvcmU7XG4gICAgICAgIH0pLmZpbHRlcihzdG9yZSA9PiBzdG9yZS5kaXN0YW5jZSA8IDEwMCk7XG4gICAgICAgIHNlbmQoJ3N0b3Jlczp1cGRhdGVWaXNpYmxlJywgeyBwYXlsb2FkOiBjbG9zZXN0LCBsb2NhdGlvbjogdXNlckxvY2F0aW9uIH0pO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG59KTtcblxuXG5jb25zdCBtYWluVmlldyA9IChwYXJhbXMsIHN0YXRlLCBzZW5kKSA9PiB7XG4gIHJldHVybiBjaG9vLnZpZXdgXG4gICAgPG1haW4gY2xhc3M9XCJhcHBcIj5cbiAgICAgICR7R29vZ2xlTWFwKHBhcmFtcywgc3RhdGUsIHNlbmQpfVxuICAgICAgJHtTaWRlQmFyKHBhcmFtcywgc3RhdGUsIHNlbmQpfVxuICAgIDwvbWFpbj5cbiAgYDtcbn07XG5cblxuYXBwLnJvdXRlcigocm91dGUpID0+IHtcbiAgcmV0dXJuIFtcbiAgICByb3V0ZSgnLycsIG1haW5WaWV3KVxuICBdO1xufSk7XG5cbmNvbnN0IHRyZWUgPSBhcHAuc3RhcnQoKTtcblxuZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0cmVlKTtcbiIsIm1vZHVsZS5leHBvcnRzPVt7XCJmZWF0dXJlVHlwZVwiOlwiYWxsXCIsXCJlbGVtZW50VHlwZVwiOlwibGFiZWxzLnRleHQuZmlsbFwiLFwic3R5bGVyc1wiOlt7XCJzYXR1cmF0aW9uXCI6MzZ9LHtcImNvbG9yXCI6XCIjMDAwMDAwXCJ9LHtcImxpZ2h0bmVzc1wiOjQwfV19LHtcImZlYXR1cmVUeXBlXCI6XCJhbGxcIixcImVsZW1lbnRUeXBlXCI6XCJsYWJlbHMudGV4dC5zdHJva2VcIixcInN0eWxlcnNcIjpbe1widmlzaWJpbGl0eVwiOlwib25cIn0se1wiY29sb3JcIjpcIiMwMDAwMDBcIn0se1wibGlnaHRuZXNzXCI6MTZ9XX0se1wiZmVhdHVyZVR5cGVcIjpcImFsbFwiLFwiZWxlbWVudFR5cGVcIjpcImxhYmVscy5pY29uXCIsXCJzdHlsZXJzXCI6W3tcInZpc2liaWxpdHlcIjpcIm9mZlwifV19LHtcImZlYXR1cmVUeXBlXCI6XCJhZG1pbmlzdHJhdGl2ZVwiLFwiZWxlbWVudFR5cGVcIjpcImdlb21ldHJ5LmZpbGxcIixcInN0eWxlcnNcIjpbe1wiY29sb3JcIjpcIiMwMDAwMDBcIn0se1wibGlnaHRuZXNzXCI6MjB9XX0se1wiZmVhdHVyZVR5cGVcIjpcImFkbWluaXN0cmF0aXZlXCIsXCJlbGVtZW50VHlwZVwiOlwiZ2VvbWV0cnkuc3Ryb2tlXCIsXCJzdHlsZXJzXCI6W3tcImNvbG9yXCI6XCIjMDAwMDAwXCJ9LHtcImxpZ2h0bmVzc1wiOjE3fSx7XCJ3ZWlnaHRcIjoxLjJ9XX0se1wiZmVhdHVyZVR5cGVcIjpcImFkbWluaXN0cmF0aXZlLmxvY2FsaXR5XCIsXCJlbGVtZW50VHlwZVwiOlwibGFiZWxzLnRleHQuZmlsbFwiLFwic3R5bGVyc1wiOlt7XCJjb2xvclwiOlwiI2ZmZmZmZlwifV19LHtcImZlYXR1cmVUeXBlXCI6XCJsYW5kc2NhcGVcIixcImVsZW1lbnRUeXBlXCI6XCJnZW9tZXRyeVwiLFwic3R5bGVyc1wiOlt7XCJjb2xvclwiOlwiIzAwMDAwMFwifSx7XCJsaWdodG5lc3NcIjoyMH1dfSx7XCJmZWF0dXJlVHlwZVwiOlwicG9pXCIsXCJlbGVtZW50VHlwZVwiOlwiZ2VvbWV0cnlcIixcInN0eWxlcnNcIjpbe1wiY29sb3JcIjpcIiMwMDAwMDBcIn0se1wibGlnaHRuZXNzXCI6MjF9XX0se1wiZmVhdHVyZVR5cGVcIjpcInJvYWQuaGlnaHdheVwiLFwiZWxlbWVudFR5cGVcIjpcImdlb21ldHJ5LmZpbGxcIixcInN0eWxlcnNcIjpbe1wiY29sb3JcIjpcIiMwMDAwMDBcIn0se1wibGlnaHRuZXNzXCI6MTd9XX0se1wiZmVhdHVyZVR5cGVcIjpcInJvYWQuaGlnaHdheVwiLFwiZWxlbWVudFR5cGVcIjpcImdlb21ldHJ5LnN0cm9rZVwiLFwic3R5bGVyc1wiOlt7XCJjb2xvclwiOlwiIzAwMDAwMFwifSx7XCJsaWdodG5lc3NcIjoyOX0se1wid2VpZ2h0XCI6MC4yfV19LHtcImZlYXR1cmVUeXBlXCI6XCJyb2FkLmFydGVyaWFsXCIsXCJlbGVtZW50VHlwZVwiOlwiZ2VvbWV0cnlcIixcInN0eWxlcnNcIjpbe1wiY29sb3JcIjpcIiMwMDAwMDBcIn0se1wibGlnaHRuZXNzXCI6MTh9XX0se1wiZmVhdHVyZVR5cGVcIjpcInJvYWQubG9jYWxcIixcImVsZW1lbnRUeXBlXCI6XCJnZW9tZXRyeVwiLFwic3R5bGVyc1wiOlt7XCJjb2xvclwiOlwiIzAwMDAwMFwifSx7XCJsaWdodG5lc3NcIjoxNn1dfSx7XCJmZWF0dXJlVHlwZVwiOlwidHJhbnNpdFwiLFwiZWxlbWVudFR5cGVcIjpcImdlb21ldHJ5XCIsXCJzdHlsZXJzXCI6W3tcImNvbG9yXCI6XCIjMDAwMDAwXCJ9LHtcImxpZ2h0bmVzc1wiOjE5fV19LHtcImZlYXR1cmVUeXBlXCI6XCJ3YXRlclwiLFwiZWxlbWVudFR5cGVcIjpcImdlb21ldHJ5XCIsXCJzdHlsZXJzXCI6W3tcImNvbG9yXCI6XCIjMDAwMDAwXCJ9LHtcImxpZ2h0bmVzc1wiOjE3fV19XVxuIiwiLy8gaHR0cDovL3dpa2kuY29tbW9uanMub3JnL3dpa2kvVW5pdF9UZXN0aW5nLzEuMFxuLy9cbi8vIFRISVMgSVMgTk9UIFRFU1RFRCBOT1IgTElLRUxZIFRPIFdPUksgT1VUU0lERSBWOCFcbi8vXG4vLyBPcmlnaW5hbGx5IGZyb20gbmFyd2hhbC5qcyAoaHR0cDovL25hcndoYWxqcy5vcmcpXG4vLyBDb3B5cmlnaHQgKGMpIDIwMDkgVGhvbWFzIFJvYmluc29uIDwyODBub3J0aC5jb20+XG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuLy8gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgJ1NvZnR3YXJlJyksIHRvXG4vLyBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZVxuLy8gcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yXG4vLyBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuLy8gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuLy8gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEICdBUyBJUycsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuLy8gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4vLyBBVVRIT1JTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTlxuLy8gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTlxuLy8gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG5cbi8vIHdoZW4gdXNlZCBpbiBub2RlLCB0aGlzIHdpbGwgYWN0dWFsbHkgbG9hZCB0aGUgdXRpbCBtb2R1bGUgd2UgZGVwZW5kIG9uXG4vLyB2ZXJzdXMgbG9hZGluZyB0aGUgYnVpbHRpbiB1dGlsIG1vZHVsZSBhcyBoYXBwZW5zIG90aGVyd2lzZVxuLy8gdGhpcyBpcyBhIGJ1ZyBpbiBub2RlIG1vZHVsZSBsb2FkaW5nIGFzIGZhciBhcyBJIGFtIGNvbmNlcm5lZFxudmFyIHV0aWwgPSByZXF1aXJlKCd1dGlsLycpO1xuXG52YXIgcFNsaWNlID0gQXJyYXkucHJvdG90eXBlLnNsaWNlO1xudmFyIGhhc093biA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG5cbi8vIDEuIFRoZSBhc3NlcnQgbW9kdWxlIHByb3ZpZGVzIGZ1bmN0aW9ucyB0aGF0IHRocm93XG4vLyBBc3NlcnRpb25FcnJvcidzIHdoZW4gcGFydGljdWxhciBjb25kaXRpb25zIGFyZSBub3QgbWV0LiBUaGVcbi8vIGFzc2VydCBtb2R1bGUgbXVzdCBjb25mb3JtIHRvIHRoZSBmb2xsb3dpbmcgaW50ZXJmYWNlLlxuXG52YXIgYXNzZXJ0ID0gbW9kdWxlLmV4cG9ydHMgPSBvaztcblxuLy8gMi4gVGhlIEFzc2VydGlvbkVycm9yIGlzIGRlZmluZWQgaW4gYXNzZXJ0LlxuLy8gbmV3IGFzc2VydC5Bc3NlcnRpb25FcnJvcih7IG1lc3NhZ2U6IG1lc3NhZ2UsXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0dWFsOiBhY3R1YWwsXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXhwZWN0ZWQ6IGV4cGVjdGVkIH0pXG5cbmFzc2VydC5Bc3NlcnRpb25FcnJvciA9IGZ1bmN0aW9uIEFzc2VydGlvbkVycm9yKG9wdGlvbnMpIHtcbiAgdGhpcy5uYW1lID0gJ0Fzc2VydGlvbkVycm9yJztcbiAgdGhpcy5hY3R1YWwgPSBvcHRpb25zLmFjdHVhbDtcbiAgdGhpcy5leHBlY3RlZCA9IG9wdGlvbnMuZXhwZWN0ZWQ7XG4gIHRoaXMub3BlcmF0b3IgPSBvcHRpb25zLm9wZXJhdG9yO1xuICBpZiAob3B0aW9ucy5tZXNzYWdlKSB7XG4gICAgdGhpcy5tZXNzYWdlID0gb3B0aW9ucy5tZXNzYWdlO1xuICAgIHRoaXMuZ2VuZXJhdGVkTWVzc2FnZSA9IGZhbHNlO1xuICB9IGVsc2Uge1xuICAgIHRoaXMubWVzc2FnZSA9IGdldE1lc3NhZ2UodGhpcyk7XG4gICAgdGhpcy5nZW5lcmF0ZWRNZXNzYWdlID0gdHJ1ZTtcbiAgfVxuICB2YXIgc3RhY2tTdGFydEZ1bmN0aW9uID0gb3B0aW9ucy5zdGFja1N0YXJ0RnVuY3Rpb24gfHwgZmFpbDtcblxuICBpZiAoRXJyb3IuY2FwdHVyZVN0YWNrVHJhY2UpIHtcbiAgICBFcnJvci5jYXB0dXJlU3RhY2tUcmFjZSh0aGlzLCBzdGFja1N0YXJ0RnVuY3Rpb24pO1xuICB9XG4gIGVsc2Uge1xuICAgIC8vIG5vbiB2OCBicm93c2VycyBzbyB3ZSBjYW4gaGF2ZSBhIHN0YWNrdHJhY2VcbiAgICB2YXIgZXJyID0gbmV3IEVycm9yKCk7XG4gICAgaWYgKGVyci5zdGFjaykge1xuICAgICAgdmFyIG91dCA9IGVyci5zdGFjaztcblxuICAgICAgLy8gdHJ5IHRvIHN0cmlwIHVzZWxlc3MgZnJhbWVzXG4gICAgICB2YXIgZm5fbmFtZSA9IHN0YWNrU3RhcnRGdW5jdGlvbi5uYW1lO1xuICAgICAgdmFyIGlkeCA9IG91dC5pbmRleE9mKCdcXG4nICsgZm5fbmFtZSk7XG4gICAgICBpZiAoaWR4ID49IDApIHtcbiAgICAgICAgLy8gb25jZSB3ZSBoYXZlIGxvY2F0ZWQgdGhlIGZ1bmN0aW9uIGZyYW1lXG4gICAgICAgIC8vIHdlIG5lZWQgdG8gc3RyaXAgb3V0IGV2ZXJ5dGhpbmcgYmVmb3JlIGl0IChhbmQgaXRzIGxpbmUpXG4gICAgICAgIHZhciBuZXh0X2xpbmUgPSBvdXQuaW5kZXhPZignXFxuJywgaWR4ICsgMSk7XG4gICAgICAgIG91dCA9IG91dC5zdWJzdHJpbmcobmV4dF9saW5lICsgMSk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuc3RhY2sgPSBvdXQ7XG4gICAgfVxuICB9XG59O1xuXG4vLyBhc3NlcnQuQXNzZXJ0aW9uRXJyb3IgaW5zdGFuY2VvZiBFcnJvclxudXRpbC5pbmhlcml0cyhhc3NlcnQuQXNzZXJ0aW9uRXJyb3IsIEVycm9yKTtcblxuZnVuY3Rpb24gcmVwbGFjZXIoa2V5LCB2YWx1ZSkge1xuICBpZiAodXRpbC5pc1VuZGVmaW5lZCh2YWx1ZSkpIHtcbiAgICByZXR1cm4gJycgKyB2YWx1ZTtcbiAgfVxuICBpZiAodXRpbC5pc051bWJlcih2YWx1ZSkgJiYgIWlzRmluaXRlKHZhbHVlKSkge1xuICAgIHJldHVybiB2YWx1ZS50b1N0cmluZygpO1xuICB9XG4gIGlmICh1dGlsLmlzRnVuY3Rpb24odmFsdWUpIHx8IHV0aWwuaXNSZWdFeHAodmFsdWUpKSB7XG4gICAgcmV0dXJuIHZhbHVlLnRvU3RyaW5nKCk7XG4gIH1cbiAgcmV0dXJuIHZhbHVlO1xufVxuXG5mdW5jdGlvbiB0cnVuY2F0ZShzLCBuKSB7XG4gIGlmICh1dGlsLmlzU3RyaW5nKHMpKSB7XG4gICAgcmV0dXJuIHMubGVuZ3RoIDwgbiA/IHMgOiBzLnNsaWNlKDAsIG4pO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBzO1xuICB9XG59XG5cbmZ1bmN0aW9uIGdldE1lc3NhZ2Uoc2VsZikge1xuICByZXR1cm4gdHJ1bmNhdGUoSlNPTi5zdHJpbmdpZnkoc2VsZi5hY3R1YWwsIHJlcGxhY2VyKSwgMTI4KSArICcgJyArXG4gICAgICAgICBzZWxmLm9wZXJhdG9yICsgJyAnICtcbiAgICAgICAgIHRydW5jYXRlKEpTT04uc3RyaW5naWZ5KHNlbGYuZXhwZWN0ZWQsIHJlcGxhY2VyKSwgMTI4KTtcbn1cblxuLy8gQXQgcHJlc2VudCBvbmx5IHRoZSB0aHJlZSBrZXlzIG1lbnRpb25lZCBhYm92ZSBhcmUgdXNlZCBhbmRcbi8vIHVuZGVyc3Rvb2QgYnkgdGhlIHNwZWMuIEltcGxlbWVudGF0aW9ucyBvciBzdWIgbW9kdWxlcyBjYW4gcGFzc1xuLy8gb3RoZXIga2V5cyB0byB0aGUgQXNzZXJ0aW9uRXJyb3IncyBjb25zdHJ1Y3RvciAtIHRoZXkgd2lsbCBiZVxuLy8gaWdub3JlZC5cblxuLy8gMy4gQWxsIG9mIHRoZSBmb2xsb3dpbmcgZnVuY3Rpb25zIG11c3QgdGhyb3cgYW4gQXNzZXJ0aW9uRXJyb3Jcbi8vIHdoZW4gYSBjb3JyZXNwb25kaW5nIGNvbmRpdGlvbiBpcyBub3QgbWV0LCB3aXRoIGEgbWVzc2FnZSB0aGF0XG4vLyBtYXkgYmUgdW5kZWZpbmVkIGlmIG5vdCBwcm92aWRlZC4gIEFsbCBhc3NlcnRpb24gbWV0aG9kcyBwcm92aWRlXG4vLyBib3RoIHRoZSBhY3R1YWwgYW5kIGV4cGVjdGVkIHZhbHVlcyB0byB0aGUgYXNzZXJ0aW9uIGVycm9yIGZvclxuLy8gZGlzcGxheSBwdXJwb3Nlcy5cblxuZnVuY3Rpb24gZmFpbChhY3R1YWwsIGV4cGVjdGVkLCBtZXNzYWdlLCBvcGVyYXRvciwgc3RhY2tTdGFydEZ1bmN0aW9uKSB7XG4gIHRocm93IG5ldyBhc3NlcnQuQXNzZXJ0aW9uRXJyb3Ioe1xuICAgIG1lc3NhZ2U6IG1lc3NhZ2UsXG4gICAgYWN0dWFsOiBhY3R1YWwsXG4gICAgZXhwZWN0ZWQ6IGV4cGVjdGVkLFxuICAgIG9wZXJhdG9yOiBvcGVyYXRvcixcbiAgICBzdGFja1N0YXJ0RnVuY3Rpb246IHN0YWNrU3RhcnRGdW5jdGlvblxuICB9KTtcbn1cblxuLy8gRVhURU5TSU9OISBhbGxvd3MgZm9yIHdlbGwgYmVoYXZlZCBlcnJvcnMgZGVmaW5lZCBlbHNld2hlcmUuXG5hc3NlcnQuZmFpbCA9IGZhaWw7XG5cbi8vIDQuIFB1cmUgYXNzZXJ0aW9uIHRlc3RzIHdoZXRoZXIgYSB2YWx1ZSBpcyB0cnV0aHksIGFzIGRldGVybWluZWRcbi8vIGJ5ICEhZ3VhcmQuXG4vLyBhc3NlcnQub2soZ3VhcmQsIG1lc3NhZ2Vfb3B0KTtcbi8vIFRoaXMgc3RhdGVtZW50IGlzIGVxdWl2YWxlbnQgdG8gYXNzZXJ0LmVxdWFsKHRydWUsICEhZ3VhcmQsXG4vLyBtZXNzYWdlX29wdCk7LiBUbyB0ZXN0IHN0cmljdGx5IGZvciB0aGUgdmFsdWUgdHJ1ZSwgdXNlXG4vLyBhc3NlcnQuc3RyaWN0RXF1YWwodHJ1ZSwgZ3VhcmQsIG1lc3NhZ2Vfb3B0KTsuXG5cbmZ1bmN0aW9uIG9rKHZhbHVlLCBtZXNzYWdlKSB7XG4gIGlmICghdmFsdWUpIGZhaWwodmFsdWUsIHRydWUsIG1lc3NhZ2UsICc9PScsIGFzc2VydC5vayk7XG59XG5hc3NlcnQub2sgPSBvaztcblxuLy8gNS4gVGhlIGVxdWFsaXR5IGFzc2VydGlvbiB0ZXN0cyBzaGFsbG93LCBjb2VyY2l2ZSBlcXVhbGl0eSB3aXRoXG4vLyA9PS5cbi8vIGFzc2VydC5lcXVhbChhY3R1YWwsIGV4cGVjdGVkLCBtZXNzYWdlX29wdCk7XG5cbmFzc2VydC5lcXVhbCA9IGZ1bmN0aW9uIGVxdWFsKGFjdHVhbCwgZXhwZWN0ZWQsIG1lc3NhZ2UpIHtcbiAgaWYgKGFjdHVhbCAhPSBleHBlY3RlZCkgZmFpbChhY3R1YWwsIGV4cGVjdGVkLCBtZXNzYWdlLCAnPT0nLCBhc3NlcnQuZXF1YWwpO1xufTtcblxuLy8gNi4gVGhlIG5vbi1lcXVhbGl0eSBhc3NlcnRpb24gdGVzdHMgZm9yIHdoZXRoZXIgdHdvIG9iamVjdHMgYXJlIG5vdCBlcXVhbFxuLy8gd2l0aCAhPSBhc3NlcnQubm90RXF1YWwoYWN0dWFsLCBleHBlY3RlZCwgbWVzc2FnZV9vcHQpO1xuXG5hc3NlcnQubm90RXF1YWwgPSBmdW5jdGlvbiBub3RFcXVhbChhY3R1YWwsIGV4cGVjdGVkLCBtZXNzYWdlKSB7XG4gIGlmIChhY3R1YWwgPT0gZXhwZWN0ZWQpIHtcbiAgICBmYWlsKGFjdHVhbCwgZXhwZWN0ZWQsIG1lc3NhZ2UsICchPScsIGFzc2VydC5ub3RFcXVhbCk7XG4gIH1cbn07XG5cbi8vIDcuIFRoZSBlcXVpdmFsZW5jZSBhc3NlcnRpb24gdGVzdHMgYSBkZWVwIGVxdWFsaXR5IHJlbGF0aW9uLlxuLy8gYXNzZXJ0LmRlZXBFcXVhbChhY3R1YWwsIGV4cGVjdGVkLCBtZXNzYWdlX29wdCk7XG5cbmFzc2VydC5kZWVwRXF1YWwgPSBmdW5jdGlvbiBkZWVwRXF1YWwoYWN0dWFsLCBleHBlY3RlZCwgbWVzc2FnZSkge1xuICBpZiAoIV9kZWVwRXF1YWwoYWN0dWFsLCBleHBlY3RlZCkpIHtcbiAgICBmYWlsKGFjdHVhbCwgZXhwZWN0ZWQsIG1lc3NhZ2UsICdkZWVwRXF1YWwnLCBhc3NlcnQuZGVlcEVxdWFsKTtcbiAgfVxufTtcblxuZnVuY3Rpb24gX2RlZXBFcXVhbChhY3R1YWwsIGV4cGVjdGVkKSB7XG4gIC8vIDcuMS4gQWxsIGlkZW50aWNhbCB2YWx1ZXMgYXJlIGVxdWl2YWxlbnQsIGFzIGRldGVybWluZWQgYnkgPT09LlxuICBpZiAoYWN0dWFsID09PSBleHBlY3RlZCkge1xuICAgIHJldHVybiB0cnVlO1xuXG4gIH0gZWxzZSBpZiAodXRpbC5pc0J1ZmZlcihhY3R1YWwpICYmIHV0aWwuaXNCdWZmZXIoZXhwZWN0ZWQpKSB7XG4gICAgaWYgKGFjdHVhbC5sZW5ndGggIT0gZXhwZWN0ZWQubGVuZ3RoKSByZXR1cm4gZmFsc2U7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFjdHVhbC5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKGFjdHVhbFtpXSAhPT0gZXhwZWN0ZWRbaV0pIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICByZXR1cm4gdHJ1ZTtcblxuICAvLyA3LjIuIElmIHRoZSBleHBlY3RlZCB2YWx1ZSBpcyBhIERhdGUgb2JqZWN0LCB0aGUgYWN0dWFsIHZhbHVlIGlzXG4gIC8vIGVxdWl2YWxlbnQgaWYgaXQgaXMgYWxzbyBhIERhdGUgb2JqZWN0IHRoYXQgcmVmZXJzIHRvIHRoZSBzYW1lIHRpbWUuXG4gIH0gZWxzZSBpZiAodXRpbC5pc0RhdGUoYWN0dWFsKSAmJiB1dGlsLmlzRGF0ZShleHBlY3RlZCkpIHtcbiAgICByZXR1cm4gYWN0dWFsLmdldFRpbWUoKSA9PT0gZXhwZWN0ZWQuZ2V0VGltZSgpO1xuXG4gIC8vIDcuMyBJZiB0aGUgZXhwZWN0ZWQgdmFsdWUgaXMgYSBSZWdFeHAgb2JqZWN0LCB0aGUgYWN0dWFsIHZhbHVlIGlzXG4gIC8vIGVxdWl2YWxlbnQgaWYgaXQgaXMgYWxzbyBhIFJlZ0V4cCBvYmplY3Qgd2l0aCB0aGUgc2FtZSBzb3VyY2UgYW5kXG4gIC8vIHByb3BlcnRpZXMgKGBnbG9iYWxgLCBgbXVsdGlsaW5lYCwgYGxhc3RJbmRleGAsIGBpZ25vcmVDYXNlYCkuXG4gIH0gZWxzZSBpZiAodXRpbC5pc1JlZ0V4cChhY3R1YWwpICYmIHV0aWwuaXNSZWdFeHAoZXhwZWN0ZWQpKSB7XG4gICAgcmV0dXJuIGFjdHVhbC5zb3VyY2UgPT09IGV4cGVjdGVkLnNvdXJjZSAmJlxuICAgICAgICAgICBhY3R1YWwuZ2xvYmFsID09PSBleHBlY3RlZC5nbG9iYWwgJiZcbiAgICAgICAgICAgYWN0dWFsLm11bHRpbGluZSA9PT0gZXhwZWN0ZWQubXVsdGlsaW5lICYmXG4gICAgICAgICAgIGFjdHVhbC5sYXN0SW5kZXggPT09IGV4cGVjdGVkLmxhc3RJbmRleCAmJlxuICAgICAgICAgICBhY3R1YWwuaWdub3JlQ2FzZSA9PT0gZXhwZWN0ZWQuaWdub3JlQ2FzZTtcblxuICAvLyA3LjQuIE90aGVyIHBhaXJzIHRoYXQgZG8gbm90IGJvdGggcGFzcyB0eXBlb2YgdmFsdWUgPT0gJ29iamVjdCcsXG4gIC8vIGVxdWl2YWxlbmNlIGlzIGRldGVybWluZWQgYnkgPT0uXG4gIH0gZWxzZSBpZiAoIXV0aWwuaXNPYmplY3QoYWN0dWFsKSAmJiAhdXRpbC5pc09iamVjdChleHBlY3RlZCkpIHtcbiAgICByZXR1cm4gYWN0dWFsID09IGV4cGVjdGVkO1xuXG4gIC8vIDcuNSBGb3IgYWxsIG90aGVyIE9iamVjdCBwYWlycywgaW5jbHVkaW5nIEFycmF5IG9iamVjdHMsIGVxdWl2YWxlbmNlIGlzXG4gIC8vIGRldGVybWluZWQgYnkgaGF2aW5nIHRoZSBzYW1lIG51bWJlciBvZiBvd25lZCBwcm9wZXJ0aWVzIChhcyB2ZXJpZmllZFxuICAvLyB3aXRoIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbCksIHRoZSBzYW1lIHNldCBvZiBrZXlzXG4gIC8vIChhbHRob3VnaCBub3QgbmVjZXNzYXJpbHkgdGhlIHNhbWUgb3JkZXIpLCBlcXVpdmFsZW50IHZhbHVlcyBmb3IgZXZlcnlcbiAgLy8gY29ycmVzcG9uZGluZyBrZXksIGFuZCBhbiBpZGVudGljYWwgJ3Byb3RvdHlwZScgcHJvcGVydHkuIE5vdGU6IHRoaXNcbiAgLy8gYWNjb3VudHMgZm9yIGJvdGggbmFtZWQgYW5kIGluZGV4ZWQgcHJvcGVydGllcyBvbiBBcnJheXMuXG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIG9iakVxdWl2KGFjdHVhbCwgZXhwZWN0ZWQpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGlzQXJndW1lbnRzKG9iamVjdCkge1xuICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9iamVjdCkgPT0gJ1tvYmplY3QgQXJndW1lbnRzXSc7XG59XG5cbmZ1bmN0aW9uIG9iakVxdWl2KGEsIGIpIHtcbiAgaWYgKHV0aWwuaXNOdWxsT3JVbmRlZmluZWQoYSkgfHwgdXRpbC5pc051bGxPclVuZGVmaW5lZChiKSlcbiAgICByZXR1cm4gZmFsc2U7XG4gIC8vIGFuIGlkZW50aWNhbCAncHJvdG90eXBlJyBwcm9wZXJ0eS5cbiAgaWYgKGEucHJvdG90eXBlICE9PSBiLnByb3RvdHlwZSkgcmV0dXJuIGZhbHNlO1xuICAvLyBpZiBvbmUgaXMgYSBwcmltaXRpdmUsIHRoZSBvdGhlciBtdXN0IGJlIHNhbWVcbiAgaWYgKHV0aWwuaXNQcmltaXRpdmUoYSkgfHwgdXRpbC5pc1ByaW1pdGl2ZShiKSkge1xuICAgIHJldHVybiBhID09PSBiO1xuICB9XG4gIHZhciBhSXNBcmdzID0gaXNBcmd1bWVudHMoYSksXG4gICAgICBiSXNBcmdzID0gaXNBcmd1bWVudHMoYik7XG4gIGlmICgoYUlzQXJncyAmJiAhYklzQXJncykgfHwgKCFhSXNBcmdzICYmIGJJc0FyZ3MpKVxuICAgIHJldHVybiBmYWxzZTtcbiAgaWYgKGFJc0FyZ3MpIHtcbiAgICBhID0gcFNsaWNlLmNhbGwoYSk7XG4gICAgYiA9IHBTbGljZS5jYWxsKGIpO1xuICAgIHJldHVybiBfZGVlcEVxdWFsKGEsIGIpO1xuICB9XG4gIHZhciBrYSA9IG9iamVjdEtleXMoYSksXG4gICAgICBrYiA9IG9iamVjdEtleXMoYiksXG4gICAgICBrZXksIGk7XG4gIC8vIGhhdmluZyB0aGUgc2FtZSBudW1iZXIgb2Ygb3duZWQgcHJvcGVydGllcyAoa2V5cyBpbmNvcnBvcmF0ZXNcbiAgLy8gaGFzT3duUHJvcGVydHkpXG4gIGlmIChrYS5sZW5ndGggIT0ga2IubGVuZ3RoKVxuICAgIHJldHVybiBmYWxzZTtcbiAgLy90aGUgc2FtZSBzZXQgb2Yga2V5cyAoYWx0aG91Z2ggbm90IG5lY2Vzc2FyaWx5IHRoZSBzYW1lIG9yZGVyKSxcbiAga2Euc29ydCgpO1xuICBrYi5zb3J0KCk7XG4gIC8vfn5+Y2hlYXAga2V5IHRlc3RcbiAgZm9yIChpID0ga2EubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICBpZiAoa2FbaV0gIT0ga2JbaV0pXG4gICAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgLy9lcXVpdmFsZW50IHZhbHVlcyBmb3IgZXZlcnkgY29ycmVzcG9uZGluZyBrZXksIGFuZFxuICAvL35+fnBvc3NpYmx5IGV4cGVuc2l2ZSBkZWVwIHRlc3RcbiAgZm9yIChpID0ga2EubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICBrZXkgPSBrYVtpXTtcbiAgICBpZiAoIV9kZWVwRXF1YWwoYVtrZXldLCBiW2tleV0pKSByZXR1cm4gZmFsc2U7XG4gIH1cbiAgcmV0dXJuIHRydWU7XG59XG5cbi8vIDguIFRoZSBub24tZXF1aXZhbGVuY2UgYXNzZXJ0aW9uIHRlc3RzIGZvciBhbnkgZGVlcCBpbmVxdWFsaXR5LlxuLy8gYXNzZXJ0Lm5vdERlZXBFcXVhbChhY3R1YWwsIGV4cGVjdGVkLCBtZXNzYWdlX29wdCk7XG5cbmFzc2VydC5ub3REZWVwRXF1YWwgPSBmdW5jdGlvbiBub3REZWVwRXF1YWwoYWN0dWFsLCBleHBlY3RlZCwgbWVzc2FnZSkge1xuICBpZiAoX2RlZXBFcXVhbChhY3R1YWwsIGV4cGVjdGVkKSkge1xuICAgIGZhaWwoYWN0dWFsLCBleHBlY3RlZCwgbWVzc2FnZSwgJ25vdERlZXBFcXVhbCcsIGFzc2VydC5ub3REZWVwRXF1YWwpO1xuICB9XG59O1xuXG4vLyA5LiBUaGUgc3RyaWN0IGVxdWFsaXR5IGFzc2VydGlvbiB0ZXN0cyBzdHJpY3QgZXF1YWxpdHksIGFzIGRldGVybWluZWQgYnkgPT09LlxuLy8gYXNzZXJ0LnN0cmljdEVxdWFsKGFjdHVhbCwgZXhwZWN0ZWQsIG1lc3NhZ2Vfb3B0KTtcblxuYXNzZXJ0LnN0cmljdEVxdWFsID0gZnVuY3Rpb24gc3RyaWN0RXF1YWwoYWN0dWFsLCBleHBlY3RlZCwgbWVzc2FnZSkge1xuICBpZiAoYWN0dWFsICE9PSBleHBlY3RlZCkge1xuICAgIGZhaWwoYWN0dWFsLCBleHBlY3RlZCwgbWVzc2FnZSwgJz09PScsIGFzc2VydC5zdHJpY3RFcXVhbCk7XG4gIH1cbn07XG5cbi8vIDEwLiBUaGUgc3RyaWN0IG5vbi1lcXVhbGl0eSBhc3NlcnRpb24gdGVzdHMgZm9yIHN0cmljdCBpbmVxdWFsaXR5LCBhc1xuLy8gZGV0ZXJtaW5lZCBieSAhPT0uICBhc3NlcnQubm90U3RyaWN0RXF1YWwoYWN0dWFsLCBleHBlY3RlZCwgbWVzc2FnZV9vcHQpO1xuXG5hc3NlcnQubm90U3RyaWN0RXF1YWwgPSBmdW5jdGlvbiBub3RTdHJpY3RFcXVhbChhY3R1YWwsIGV4cGVjdGVkLCBtZXNzYWdlKSB7XG4gIGlmIChhY3R1YWwgPT09IGV4cGVjdGVkKSB7XG4gICAgZmFpbChhY3R1YWwsIGV4cGVjdGVkLCBtZXNzYWdlLCAnIT09JywgYXNzZXJ0Lm5vdFN0cmljdEVxdWFsKTtcbiAgfVxufTtcblxuZnVuY3Rpb24gZXhwZWN0ZWRFeGNlcHRpb24oYWN0dWFsLCBleHBlY3RlZCkge1xuICBpZiAoIWFjdHVhbCB8fCAhZXhwZWN0ZWQpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBpZiAoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGV4cGVjdGVkKSA9PSAnW29iamVjdCBSZWdFeHBdJykge1xuICAgIHJldHVybiBleHBlY3RlZC50ZXN0KGFjdHVhbCk7XG4gIH0gZWxzZSBpZiAoYWN0dWFsIGluc3RhbmNlb2YgZXhwZWN0ZWQpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSBlbHNlIGlmIChleHBlY3RlZC5jYWxsKHt9LCBhY3R1YWwpID09PSB0cnVlKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICByZXR1cm4gZmFsc2U7XG59XG5cbmZ1bmN0aW9uIF90aHJvd3Moc2hvdWxkVGhyb3csIGJsb2NrLCBleHBlY3RlZCwgbWVzc2FnZSkge1xuICB2YXIgYWN0dWFsO1xuXG4gIGlmICh1dGlsLmlzU3RyaW5nKGV4cGVjdGVkKSkge1xuICAgIG1lc3NhZ2UgPSBleHBlY3RlZDtcbiAgICBleHBlY3RlZCA9IG51bGw7XG4gIH1cblxuICB0cnkge1xuICAgIGJsb2NrKCk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBhY3R1YWwgPSBlO1xuICB9XG5cbiAgbWVzc2FnZSA9IChleHBlY3RlZCAmJiBleHBlY3RlZC5uYW1lID8gJyAoJyArIGV4cGVjdGVkLm5hbWUgKyAnKS4nIDogJy4nKSArXG4gICAgICAgICAgICAobWVzc2FnZSA/ICcgJyArIG1lc3NhZ2UgOiAnLicpO1xuXG4gIGlmIChzaG91bGRUaHJvdyAmJiAhYWN0dWFsKSB7XG4gICAgZmFpbChhY3R1YWwsIGV4cGVjdGVkLCAnTWlzc2luZyBleHBlY3RlZCBleGNlcHRpb24nICsgbWVzc2FnZSk7XG4gIH1cblxuICBpZiAoIXNob3VsZFRocm93ICYmIGV4cGVjdGVkRXhjZXB0aW9uKGFjdHVhbCwgZXhwZWN0ZWQpKSB7XG4gICAgZmFpbChhY3R1YWwsIGV4cGVjdGVkLCAnR290IHVud2FudGVkIGV4Y2VwdGlvbicgKyBtZXNzYWdlKTtcbiAgfVxuXG4gIGlmICgoc2hvdWxkVGhyb3cgJiYgYWN0dWFsICYmIGV4cGVjdGVkICYmXG4gICAgICAhZXhwZWN0ZWRFeGNlcHRpb24oYWN0dWFsLCBleHBlY3RlZCkpIHx8ICghc2hvdWxkVGhyb3cgJiYgYWN0dWFsKSkge1xuICAgIHRocm93IGFjdHVhbDtcbiAgfVxufVxuXG4vLyAxMS4gRXhwZWN0ZWQgdG8gdGhyb3cgYW4gZXJyb3I6XG4vLyBhc3NlcnQudGhyb3dzKGJsb2NrLCBFcnJvcl9vcHQsIG1lc3NhZ2Vfb3B0KTtcblxuYXNzZXJ0LnRocm93cyA9IGZ1bmN0aW9uKGJsb2NrLCAvKm9wdGlvbmFsKi9lcnJvciwgLypvcHRpb25hbCovbWVzc2FnZSkge1xuICBfdGhyb3dzLmFwcGx5KHRoaXMsIFt0cnVlXS5jb25jYXQocFNsaWNlLmNhbGwoYXJndW1lbnRzKSkpO1xufTtcblxuLy8gRVhURU5TSU9OISBUaGlzIGlzIGFubm95aW5nIHRvIHdyaXRlIG91dHNpZGUgdGhpcyBtb2R1bGUuXG5hc3NlcnQuZG9lc05vdFRocm93ID0gZnVuY3Rpb24oYmxvY2ssIC8qb3B0aW9uYWwqL21lc3NhZ2UpIHtcbiAgX3Rocm93cy5hcHBseSh0aGlzLCBbZmFsc2VdLmNvbmNhdChwU2xpY2UuY2FsbChhcmd1bWVudHMpKSk7XG59O1xuXG5hc3NlcnQuaWZFcnJvciA9IGZ1bmN0aW9uKGVycikgeyBpZiAoZXJyKSB7dGhyb3cgZXJyO319O1xuXG52YXIgb2JqZWN0S2V5cyA9IE9iamVjdC5rZXlzIHx8IGZ1bmN0aW9uIChvYmopIHtcbiAgdmFyIGtleXMgPSBbXTtcbiAgZm9yICh2YXIga2V5IGluIG9iaikge1xuICAgIGlmIChoYXNPd24uY2FsbChvYmosIGtleSkpIGtleXMucHVzaChrZXkpO1xuICB9XG4gIHJldHVybiBrZXlzO1xufTtcbiIsIiIsImlmICh0eXBlb2YgT2JqZWN0LmNyZWF0ZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAvLyBpbXBsZW1lbnRhdGlvbiBmcm9tIHN0YW5kYXJkIG5vZGUuanMgJ3V0aWwnIG1vZHVsZVxuICBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGluaGVyaXRzKGN0b3IsIHN1cGVyQ3Rvcikge1xuICAgIGN0b3Iuc3VwZXJfID0gc3VwZXJDdG9yXG4gICAgY3Rvci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ3Rvci5wcm90b3R5cGUsIHtcbiAgICAgIGNvbnN0cnVjdG9yOiB7XG4gICAgICAgIHZhbHVlOiBjdG9yLFxuICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgICAgfVxuICAgIH0pO1xuICB9O1xufSBlbHNlIHtcbiAgLy8gb2xkIHNjaG9vbCBzaGltIGZvciBvbGQgYnJvd3NlcnNcbiAgbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpbmhlcml0cyhjdG9yLCBzdXBlckN0b3IpIHtcbiAgICBjdG9yLnN1cGVyXyA9IHN1cGVyQ3RvclxuICAgIHZhciBUZW1wQ3RvciA9IGZ1bmN0aW9uICgpIHt9XG4gICAgVGVtcEN0b3IucHJvdG90eXBlID0gc3VwZXJDdG9yLnByb3RvdHlwZVxuICAgIGN0b3IucHJvdG90eXBlID0gbmV3IFRlbXBDdG9yKClcbiAgICBjdG9yLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IGN0b3JcbiAgfVxufVxuIiwiLy8gc2hpbSBmb3IgdXNpbmcgcHJvY2VzcyBpbiBicm93c2VyXG5cbnZhciBwcm9jZXNzID0gbW9kdWxlLmV4cG9ydHMgPSB7fTtcblxuLy8gY2FjaGVkIGZyb20gd2hhdGV2ZXIgZ2xvYmFsIGlzIHByZXNlbnQgc28gdGhhdCB0ZXN0IHJ1bm5lcnMgdGhhdCBzdHViIGl0XG4vLyBkb24ndCBicmVhayB0aGluZ3MuICBCdXQgd2UgbmVlZCB0byB3cmFwIGl0IGluIGEgdHJ5IGNhdGNoIGluIGNhc2UgaXQgaXNcbi8vIHdyYXBwZWQgaW4gc3RyaWN0IG1vZGUgY29kZSB3aGljaCBkb2Vzbid0IGRlZmluZSBhbnkgZ2xvYmFscy4gIEl0J3MgaW5zaWRlIGFcbi8vIGZ1bmN0aW9uIGJlY2F1c2UgdHJ5L2NhdGNoZXMgZGVvcHRpbWl6ZSBpbiBjZXJ0YWluIGVuZ2luZXMuXG5cbnZhciBjYWNoZWRTZXRUaW1lb3V0O1xudmFyIGNhY2hlZENsZWFyVGltZW91dDtcblxuKGZ1bmN0aW9uICgpIHtcbiAgdHJ5IHtcbiAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgfSBjYXRjaCAoZSkge1xuICAgIGNhY2hlZFNldFRpbWVvdXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ3NldFRpbWVvdXQgaXMgbm90IGRlZmluZWQnKTtcbiAgICB9XG4gIH1cbiAgdHJ5IHtcbiAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2NsZWFyVGltZW91dCBpcyBub3QgZGVmaW5lZCcpO1xuICAgIH1cbiAgfVxufSAoKSlcbnZhciBxdWV1ZSA9IFtdO1xudmFyIGRyYWluaW5nID0gZmFsc2U7XG52YXIgY3VycmVudFF1ZXVlO1xudmFyIHF1ZXVlSW5kZXggPSAtMTtcblxuZnVuY3Rpb24gY2xlYW5VcE5leHRUaWNrKCkge1xuICAgIGlmICghZHJhaW5pbmcgfHwgIWN1cnJlbnRRdWV1ZSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgaWYgKGN1cnJlbnRRdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgcXVldWUgPSBjdXJyZW50UXVldWUuY29uY2F0KHF1ZXVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgfVxuICAgIGlmIChxdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgZHJhaW5RdWV1ZSgpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZHJhaW5RdWV1ZSgpIHtcbiAgICBpZiAoZHJhaW5pbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgdGltZW91dCA9IGNhY2hlZFNldFRpbWVvdXQoY2xlYW5VcE5leHRUaWNrKTtcbiAgICBkcmFpbmluZyA9IHRydWU7XG5cbiAgICB2YXIgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIHdoaWxlKGxlbikge1xuICAgICAgICBjdXJyZW50UXVldWUgPSBxdWV1ZTtcbiAgICAgICAgcXVldWUgPSBbXTtcbiAgICAgICAgd2hpbGUgKCsrcXVldWVJbmRleCA8IGxlbikge1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRRdWV1ZSkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRRdWV1ZVtxdWV1ZUluZGV4XS5ydW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgICAgIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB9XG4gICAgY3VycmVudFF1ZXVlID0gbnVsbDtcbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIGNhY2hlZENsZWFyVGltZW91dCh0aW1lb3V0KTtcbn1cblxucHJvY2Vzcy5uZXh0VGljayA9IGZ1bmN0aW9uIChmdW4pIHtcbiAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoIC0gMSk7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBhcmdzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBxdWV1ZS5wdXNoKG5ldyBJdGVtKGZ1biwgYXJncykpO1xuICAgIGlmIChxdWV1ZS5sZW5ndGggPT09IDEgJiYgIWRyYWluaW5nKSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQoZHJhaW5RdWV1ZSwgMCk7XG4gICAgfVxufTtcblxuLy8gdjggbGlrZXMgcHJlZGljdGlibGUgb2JqZWN0c1xuZnVuY3Rpb24gSXRlbShmdW4sIGFycmF5KSB7XG4gICAgdGhpcy5mdW4gPSBmdW47XG4gICAgdGhpcy5hcnJheSA9IGFycmF5O1xufVxuSXRlbS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZnVuLmFwcGx5KG51bGwsIHRoaXMuYXJyYXkpO1xufTtcbnByb2Nlc3MudGl0bGUgPSAnYnJvd3Nlcic7XG5wcm9jZXNzLmJyb3dzZXIgPSB0cnVlO1xucHJvY2Vzcy5lbnYgPSB7fTtcbnByb2Nlc3MuYXJndiA9IFtdO1xucHJvY2Vzcy52ZXJzaW9uID0gJyc7IC8vIGVtcHR5IHN0cmluZyB0byBhdm9pZCByZWdleHAgaXNzdWVzXG5wcm9jZXNzLnZlcnNpb25zID0ge307XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG5wcm9jZXNzLm9uID0gbm9vcDtcbnByb2Nlc3MuYWRkTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5vbmNlID0gbm9vcDtcbnByb2Nlc3Mub2ZmID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBub29wO1xucHJvY2Vzcy5lbWl0ID0gbm9vcDtcblxucHJvY2Vzcy5iaW5kaW5nID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuYmluZGluZyBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xuXG5wcm9jZXNzLmN3ZCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuICcvJyB9O1xucHJvY2Vzcy5jaGRpciA9IGZ1bmN0aW9uIChkaXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuY2hkaXIgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcbnByb2Nlc3MudW1hc2sgPSBmdW5jdGlvbigpIHsgcmV0dXJuIDA7IH07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGlzQnVmZmVyKGFyZykge1xuICByZXR1cm4gYXJnICYmIHR5cGVvZiBhcmcgPT09ICdvYmplY3QnXG4gICAgJiYgdHlwZW9mIGFyZy5jb3B5ID09PSAnZnVuY3Rpb24nXG4gICAgJiYgdHlwZW9mIGFyZy5maWxsID09PSAnZnVuY3Rpb24nXG4gICAgJiYgdHlwZW9mIGFyZy5yZWFkVUludDggPT09ICdmdW5jdGlvbic7XG59IiwiLy8gQ29weXJpZ2h0IEpveWVudCwgSW5jLiBhbmQgb3RoZXIgTm9kZSBjb250cmlidXRvcnMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGFcbi8vIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGVcbi8vIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZ1xuLy8gd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLFxuLy8gZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdFxuLy8gcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlXG4vLyBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZFxuLy8gaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTU1xuLy8gT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRlxuLy8gTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTlxuLy8gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sXG4vLyBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1Jcbi8vIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEVcbi8vIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG5cbnZhciBmb3JtYXRSZWdFeHAgPSAvJVtzZGolXS9nO1xuZXhwb3J0cy5mb3JtYXQgPSBmdW5jdGlvbihmKSB7XG4gIGlmICghaXNTdHJpbmcoZikpIHtcbiAgICB2YXIgb2JqZWN0cyA9IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBvYmplY3RzLnB1c2goaW5zcGVjdChhcmd1bWVudHNbaV0pKTtcbiAgICB9XG4gICAgcmV0dXJuIG9iamVjdHMuam9pbignICcpO1xuICB9XG5cbiAgdmFyIGkgPSAxO1xuICB2YXIgYXJncyA9IGFyZ3VtZW50cztcbiAgdmFyIGxlbiA9IGFyZ3MubGVuZ3RoO1xuICB2YXIgc3RyID0gU3RyaW5nKGYpLnJlcGxhY2UoZm9ybWF0UmVnRXhwLCBmdW5jdGlvbih4KSB7XG4gICAgaWYgKHggPT09ICclJScpIHJldHVybiAnJSc7XG4gICAgaWYgKGkgPj0gbGVuKSByZXR1cm4geDtcbiAgICBzd2l0Y2ggKHgpIHtcbiAgICAgIGNhc2UgJyVzJzogcmV0dXJuIFN0cmluZyhhcmdzW2krK10pO1xuICAgICAgY2FzZSAnJWQnOiByZXR1cm4gTnVtYmVyKGFyZ3NbaSsrXSk7XG4gICAgICBjYXNlICclaic6XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KGFyZ3NbaSsrXSk7XG4gICAgICAgIH0gY2F0Y2ggKF8pIHtcbiAgICAgICAgICByZXR1cm4gJ1tDaXJjdWxhcl0nO1xuICAgICAgICB9XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4geDtcbiAgICB9XG4gIH0pO1xuICBmb3IgKHZhciB4ID0gYXJnc1tpXTsgaSA8IGxlbjsgeCA9IGFyZ3NbKytpXSkge1xuICAgIGlmIChpc051bGwoeCkgfHwgIWlzT2JqZWN0KHgpKSB7XG4gICAgICBzdHIgKz0gJyAnICsgeDtcbiAgICB9IGVsc2Uge1xuICAgICAgc3RyICs9ICcgJyArIGluc3BlY3QoeCk7XG4gICAgfVxuICB9XG4gIHJldHVybiBzdHI7XG59O1xuXG5cbi8vIE1hcmsgdGhhdCBhIG1ldGhvZCBzaG91bGQgbm90IGJlIHVzZWQuXG4vLyBSZXR1cm5zIGEgbW9kaWZpZWQgZnVuY3Rpb24gd2hpY2ggd2FybnMgb25jZSBieSBkZWZhdWx0LlxuLy8gSWYgLS1uby1kZXByZWNhdGlvbiBpcyBzZXQsIHRoZW4gaXQgaXMgYSBuby1vcC5cbmV4cG9ydHMuZGVwcmVjYXRlID0gZnVuY3Rpb24oZm4sIG1zZykge1xuICAvLyBBbGxvdyBmb3IgZGVwcmVjYXRpbmcgdGhpbmdzIGluIHRoZSBwcm9jZXNzIG9mIHN0YXJ0aW5nIHVwLlxuICBpZiAoaXNVbmRlZmluZWQoZ2xvYmFsLnByb2Nlc3MpKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIGV4cG9ydHMuZGVwcmVjYXRlKGZuLCBtc2cpLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfTtcbiAgfVxuXG4gIGlmIChwcm9jZXNzLm5vRGVwcmVjYXRpb24gPT09IHRydWUpIHtcbiAgICByZXR1cm4gZm47XG4gIH1cblxuICB2YXIgd2FybmVkID0gZmFsc2U7XG4gIGZ1bmN0aW9uIGRlcHJlY2F0ZWQoKSB7XG4gICAgaWYgKCF3YXJuZWQpIHtcbiAgICAgIGlmIChwcm9jZXNzLnRocm93RGVwcmVjYXRpb24pIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKG1zZyk7XG4gICAgICB9IGVsc2UgaWYgKHByb2Nlc3MudHJhY2VEZXByZWNhdGlvbikge1xuICAgICAgICBjb25zb2xlLnRyYWNlKG1zZyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zb2xlLmVycm9yKG1zZyk7XG4gICAgICB9XG4gICAgICB3YXJuZWQgPSB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgfVxuXG4gIHJldHVybiBkZXByZWNhdGVkO1xufTtcblxuXG52YXIgZGVidWdzID0ge307XG52YXIgZGVidWdFbnZpcm9uO1xuZXhwb3J0cy5kZWJ1Z2xvZyA9IGZ1bmN0aW9uKHNldCkge1xuICBpZiAoaXNVbmRlZmluZWQoZGVidWdFbnZpcm9uKSlcbiAgICBkZWJ1Z0Vudmlyb24gPSBwcm9jZXNzLmVudi5OT0RFX0RFQlVHIHx8ICcnO1xuICBzZXQgPSBzZXQudG9VcHBlckNhc2UoKTtcbiAgaWYgKCFkZWJ1Z3Nbc2V0XSkge1xuICAgIGlmIChuZXcgUmVnRXhwKCdcXFxcYicgKyBzZXQgKyAnXFxcXGInLCAnaScpLnRlc3QoZGVidWdFbnZpcm9uKSkge1xuICAgICAgdmFyIHBpZCA9IHByb2Nlc3MucGlkO1xuICAgICAgZGVidWdzW3NldF0gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIG1zZyA9IGV4cG9ydHMuZm9ybWF0LmFwcGx5KGV4cG9ydHMsIGFyZ3VtZW50cyk7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJyVzICVkOiAlcycsIHNldCwgcGlkLCBtc2cpO1xuICAgICAgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgZGVidWdzW3NldF0gPSBmdW5jdGlvbigpIHt9O1xuICAgIH1cbiAgfVxuICByZXR1cm4gZGVidWdzW3NldF07XG59O1xuXG5cbi8qKlxuICogRWNob3MgdGhlIHZhbHVlIG9mIGEgdmFsdWUuIFRyeXMgdG8gcHJpbnQgdGhlIHZhbHVlIG91dFxuICogaW4gdGhlIGJlc3Qgd2F5IHBvc3NpYmxlIGdpdmVuIHRoZSBkaWZmZXJlbnQgdHlwZXMuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9iaiBUaGUgb2JqZWN0IHRvIHByaW50IG91dC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRzIE9wdGlvbmFsIG9wdGlvbnMgb2JqZWN0IHRoYXQgYWx0ZXJzIHRoZSBvdXRwdXQuXG4gKi9cbi8qIGxlZ2FjeTogb2JqLCBzaG93SGlkZGVuLCBkZXB0aCwgY29sb3JzKi9cbmZ1bmN0aW9uIGluc3BlY3Qob2JqLCBvcHRzKSB7XG4gIC8vIGRlZmF1bHQgb3B0aW9uc1xuICB2YXIgY3R4ID0ge1xuICAgIHNlZW46IFtdLFxuICAgIHN0eWxpemU6IHN0eWxpemVOb0NvbG9yXG4gIH07XG4gIC8vIGxlZ2FjeS4uLlxuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+PSAzKSBjdHguZGVwdGggPSBhcmd1bWVudHNbMl07XG4gIGlmIChhcmd1bWVudHMubGVuZ3RoID49IDQpIGN0eC5jb2xvcnMgPSBhcmd1bWVudHNbM107XG4gIGlmIChpc0Jvb2xlYW4ob3B0cykpIHtcbiAgICAvLyBsZWdhY3kuLi5cbiAgICBjdHguc2hvd0hpZGRlbiA9IG9wdHM7XG4gIH0gZWxzZSBpZiAob3B0cykge1xuICAgIC8vIGdvdCBhbiBcIm9wdGlvbnNcIiBvYmplY3RcbiAgICBleHBvcnRzLl9leHRlbmQoY3R4LCBvcHRzKTtcbiAgfVxuICAvLyBzZXQgZGVmYXVsdCBvcHRpb25zXG4gIGlmIChpc1VuZGVmaW5lZChjdHguc2hvd0hpZGRlbikpIGN0eC5zaG93SGlkZGVuID0gZmFsc2U7XG4gIGlmIChpc1VuZGVmaW5lZChjdHguZGVwdGgpKSBjdHguZGVwdGggPSAyO1xuICBpZiAoaXNVbmRlZmluZWQoY3R4LmNvbG9ycykpIGN0eC5jb2xvcnMgPSBmYWxzZTtcbiAgaWYgKGlzVW5kZWZpbmVkKGN0eC5jdXN0b21JbnNwZWN0KSkgY3R4LmN1c3RvbUluc3BlY3QgPSB0cnVlO1xuICBpZiAoY3R4LmNvbG9ycykgY3R4LnN0eWxpemUgPSBzdHlsaXplV2l0aENvbG9yO1xuICByZXR1cm4gZm9ybWF0VmFsdWUoY3R4LCBvYmosIGN0eC5kZXB0aCk7XG59XG5leHBvcnRzLmluc3BlY3QgPSBpbnNwZWN0O1xuXG5cbi8vIGh0dHA6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvQU5TSV9lc2NhcGVfY29kZSNncmFwaGljc1xuaW5zcGVjdC5jb2xvcnMgPSB7XG4gICdib2xkJyA6IFsxLCAyMl0sXG4gICdpdGFsaWMnIDogWzMsIDIzXSxcbiAgJ3VuZGVybGluZScgOiBbNCwgMjRdLFxuICAnaW52ZXJzZScgOiBbNywgMjddLFxuICAnd2hpdGUnIDogWzM3LCAzOV0sXG4gICdncmV5JyA6IFs5MCwgMzldLFxuICAnYmxhY2snIDogWzMwLCAzOV0sXG4gICdibHVlJyA6IFszNCwgMzldLFxuICAnY3lhbicgOiBbMzYsIDM5XSxcbiAgJ2dyZWVuJyA6IFszMiwgMzldLFxuICAnbWFnZW50YScgOiBbMzUsIDM5XSxcbiAgJ3JlZCcgOiBbMzEsIDM5XSxcbiAgJ3llbGxvdycgOiBbMzMsIDM5XVxufTtcblxuLy8gRG9uJ3QgdXNlICdibHVlJyBub3QgdmlzaWJsZSBvbiBjbWQuZXhlXG5pbnNwZWN0LnN0eWxlcyA9IHtcbiAgJ3NwZWNpYWwnOiAnY3lhbicsXG4gICdudW1iZXInOiAneWVsbG93JyxcbiAgJ2Jvb2xlYW4nOiAneWVsbG93JyxcbiAgJ3VuZGVmaW5lZCc6ICdncmV5JyxcbiAgJ251bGwnOiAnYm9sZCcsXG4gICdzdHJpbmcnOiAnZ3JlZW4nLFxuICAnZGF0ZSc6ICdtYWdlbnRhJyxcbiAgLy8gXCJuYW1lXCI6IGludGVudGlvbmFsbHkgbm90IHN0eWxpbmdcbiAgJ3JlZ2V4cCc6ICdyZWQnXG59O1xuXG5cbmZ1bmN0aW9uIHN0eWxpemVXaXRoQ29sb3Ioc3RyLCBzdHlsZVR5cGUpIHtcbiAgdmFyIHN0eWxlID0gaW5zcGVjdC5zdHlsZXNbc3R5bGVUeXBlXTtcblxuICBpZiAoc3R5bGUpIHtcbiAgICByZXR1cm4gJ1xcdTAwMWJbJyArIGluc3BlY3QuY29sb3JzW3N0eWxlXVswXSArICdtJyArIHN0ciArXG4gICAgICAgICAgICdcXHUwMDFiWycgKyBpbnNwZWN0LmNvbG9yc1tzdHlsZV1bMV0gKyAnbSc7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHN0cjtcbiAgfVxufVxuXG5cbmZ1bmN0aW9uIHN0eWxpemVOb0NvbG9yKHN0ciwgc3R5bGVUeXBlKSB7XG4gIHJldHVybiBzdHI7XG59XG5cblxuZnVuY3Rpb24gYXJyYXlUb0hhc2goYXJyYXkpIHtcbiAgdmFyIGhhc2ggPSB7fTtcblxuICBhcnJheS5mb3JFYWNoKGZ1bmN0aW9uKHZhbCwgaWR4KSB7XG4gICAgaGFzaFt2YWxdID0gdHJ1ZTtcbiAgfSk7XG5cbiAgcmV0dXJuIGhhc2g7XG59XG5cblxuZnVuY3Rpb24gZm9ybWF0VmFsdWUoY3R4LCB2YWx1ZSwgcmVjdXJzZVRpbWVzKSB7XG4gIC8vIFByb3ZpZGUgYSBob29rIGZvciB1c2VyLXNwZWNpZmllZCBpbnNwZWN0IGZ1bmN0aW9ucy5cbiAgLy8gQ2hlY2sgdGhhdCB2YWx1ZSBpcyBhbiBvYmplY3Qgd2l0aCBhbiBpbnNwZWN0IGZ1bmN0aW9uIG9uIGl0XG4gIGlmIChjdHguY3VzdG9tSW5zcGVjdCAmJlxuICAgICAgdmFsdWUgJiZcbiAgICAgIGlzRnVuY3Rpb24odmFsdWUuaW5zcGVjdCkgJiZcbiAgICAgIC8vIEZpbHRlciBvdXQgdGhlIHV0aWwgbW9kdWxlLCBpdCdzIGluc3BlY3QgZnVuY3Rpb24gaXMgc3BlY2lhbFxuICAgICAgdmFsdWUuaW5zcGVjdCAhPT0gZXhwb3J0cy5pbnNwZWN0ICYmXG4gICAgICAvLyBBbHNvIGZpbHRlciBvdXQgYW55IHByb3RvdHlwZSBvYmplY3RzIHVzaW5nIHRoZSBjaXJjdWxhciBjaGVjay5cbiAgICAgICEodmFsdWUuY29uc3RydWN0b3IgJiYgdmFsdWUuY29uc3RydWN0b3IucHJvdG90eXBlID09PSB2YWx1ZSkpIHtcbiAgICB2YXIgcmV0ID0gdmFsdWUuaW5zcGVjdChyZWN1cnNlVGltZXMsIGN0eCk7XG4gICAgaWYgKCFpc1N0cmluZyhyZXQpKSB7XG4gICAgICByZXQgPSBmb3JtYXRWYWx1ZShjdHgsIHJldCwgcmVjdXJzZVRpbWVzKTtcbiAgICB9XG4gICAgcmV0dXJuIHJldDtcbiAgfVxuXG4gIC8vIFByaW1pdGl2ZSB0eXBlcyBjYW5ub3QgaGF2ZSBwcm9wZXJ0aWVzXG4gIHZhciBwcmltaXRpdmUgPSBmb3JtYXRQcmltaXRpdmUoY3R4LCB2YWx1ZSk7XG4gIGlmIChwcmltaXRpdmUpIHtcbiAgICByZXR1cm4gcHJpbWl0aXZlO1xuICB9XG5cbiAgLy8gTG9vayB1cCB0aGUga2V5cyBvZiB0aGUgb2JqZWN0LlxuICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKHZhbHVlKTtcbiAgdmFyIHZpc2libGVLZXlzID0gYXJyYXlUb0hhc2goa2V5cyk7XG5cbiAgaWYgKGN0eC5zaG93SGlkZGVuKSB7XG4gICAga2V5cyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHZhbHVlKTtcbiAgfVxuXG4gIC8vIElFIGRvZXNuJ3QgbWFrZSBlcnJvciBmaWVsZHMgbm9uLWVudW1lcmFibGVcbiAgLy8gaHR0cDovL21zZG4ubWljcm9zb2Z0LmNvbS9lbi11cy9saWJyYXJ5L2llL2R3dzUyc2J0KHY9dnMuOTQpLmFzcHhcbiAgaWYgKGlzRXJyb3IodmFsdWUpXG4gICAgICAmJiAoa2V5cy5pbmRleE9mKCdtZXNzYWdlJykgPj0gMCB8fCBrZXlzLmluZGV4T2YoJ2Rlc2NyaXB0aW9uJykgPj0gMCkpIHtcbiAgICByZXR1cm4gZm9ybWF0RXJyb3IodmFsdWUpO1xuICB9XG5cbiAgLy8gU29tZSB0eXBlIG9mIG9iamVjdCB3aXRob3V0IHByb3BlcnRpZXMgY2FuIGJlIHNob3J0Y3V0dGVkLlxuICBpZiAoa2V5cy5sZW5ndGggPT09IDApIHtcbiAgICBpZiAoaXNGdW5jdGlvbih2YWx1ZSkpIHtcbiAgICAgIHZhciBuYW1lID0gdmFsdWUubmFtZSA/ICc6ICcgKyB2YWx1ZS5uYW1lIDogJyc7XG4gICAgICByZXR1cm4gY3R4LnN0eWxpemUoJ1tGdW5jdGlvbicgKyBuYW1lICsgJ10nLCAnc3BlY2lhbCcpO1xuICAgIH1cbiAgICBpZiAoaXNSZWdFeHAodmFsdWUpKSB7XG4gICAgICByZXR1cm4gY3R4LnN0eWxpemUoUmVnRXhwLnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHZhbHVlKSwgJ3JlZ2V4cCcpO1xuICAgIH1cbiAgICBpZiAoaXNEYXRlKHZhbHVlKSkge1xuICAgICAgcmV0dXJuIGN0eC5zdHlsaXplKERhdGUucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodmFsdWUpLCAnZGF0ZScpO1xuICAgIH1cbiAgICBpZiAoaXNFcnJvcih2YWx1ZSkpIHtcbiAgICAgIHJldHVybiBmb3JtYXRFcnJvcih2YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgdmFyIGJhc2UgPSAnJywgYXJyYXkgPSBmYWxzZSwgYnJhY2VzID0gWyd7JywgJ30nXTtcblxuICAvLyBNYWtlIEFycmF5IHNheSB0aGF0IHRoZXkgYXJlIEFycmF5XG4gIGlmIChpc0FycmF5KHZhbHVlKSkge1xuICAgIGFycmF5ID0gdHJ1ZTtcbiAgICBicmFjZXMgPSBbJ1snLCAnXSddO1xuICB9XG5cbiAgLy8gTWFrZSBmdW5jdGlvbnMgc2F5IHRoYXQgdGhleSBhcmUgZnVuY3Rpb25zXG4gIGlmIChpc0Z1bmN0aW9uKHZhbHVlKSkge1xuICAgIHZhciBuID0gdmFsdWUubmFtZSA/ICc6ICcgKyB2YWx1ZS5uYW1lIDogJyc7XG4gICAgYmFzZSA9ICcgW0Z1bmN0aW9uJyArIG4gKyAnXSc7XG4gIH1cblxuICAvLyBNYWtlIFJlZ0V4cHMgc2F5IHRoYXQgdGhleSBhcmUgUmVnRXhwc1xuICBpZiAoaXNSZWdFeHAodmFsdWUpKSB7XG4gICAgYmFzZSA9ICcgJyArIFJlZ0V4cC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh2YWx1ZSk7XG4gIH1cblxuICAvLyBNYWtlIGRhdGVzIHdpdGggcHJvcGVydGllcyBmaXJzdCBzYXkgdGhlIGRhdGVcbiAgaWYgKGlzRGF0ZSh2YWx1ZSkpIHtcbiAgICBiYXNlID0gJyAnICsgRGF0ZS5wcm90b3R5cGUudG9VVENTdHJpbmcuY2FsbCh2YWx1ZSk7XG4gIH1cblxuICAvLyBNYWtlIGVycm9yIHdpdGggbWVzc2FnZSBmaXJzdCBzYXkgdGhlIGVycm9yXG4gIGlmIChpc0Vycm9yKHZhbHVlKSkge1xuICAgIGJhc2UgPSAnICcgKyBmb3JtYXRFcnJvcih2YWx1ZSk7XG4gIH1cblxuICBpZiAoa2V5cy5sZW5ndGggPT09IDAgJiYgKCFhcnJheSB8fCB2YWx1ZS5sZW5ndGggPT0gMCkpIHtcbiAgICByZXR1cm4gYnJhY2VzWzBdICsgYmFzZSArIGJyYWNlc1sxXTtcbiAgfVxuXG4gIGlmIChyZWN1cnNlVGltZXMgPCAwKSB7XG4gICAgaWYgKGlzUmVnRXhwKHZhbHVlKSkge1xuICAgICAgcmV0dXJuIGN0eC5zdHlsaXplKFJlZ0V4cC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh2YWx1ZSksICdyZWdleHAnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGN0eC5zdHlsaXplKCdbT2JqZWN0XScsICdzcGVjaWFsJyk7XG4gICAgfVxuICB9XG5cbiAgY3R4LnNlZW4ucHVzaCh2YWx1ZSk7XG5cbiAgdmFyIG91dHB1dDtcbiAgaWYgKGFycmF5KSB7XG4gICAgb3V0cHV0ID0gZm9ybWF0QXJyYXkoY3R4LCB2YWx1ZSwgcmVjdXJzZVRpbWVzLCB2aXNpYmxlS2V5cywga2V5cyk7XG4gIH0gZWxzZSB7XG4gICAgb3V0cHV0ID0ga2V5cy5tYXAoZnVuY3Rpb24oa2V5KSB7XG4gICAgICByZXR1cm4gZm9ybWF0UHJvcGVydHkoY3R4LCB2YWx1ZSwgcmVjdXJzZVRpbWVzLCB2aXNpYmxlS2V5cywga2V5LCBhcnJheSk7XG4gICAgfSk7XG4gIH1cblxuICBjdHguc2Vlbi5wb3AoKTtcblxuICByZXR1cm4gcmVkdWNlVG9TaW5nbGVTdHJpbmcob3V0cHV0LCBiYXNlLCBicmFjZXMpO1xufVxuXG5cbmZ1bmN0aW9uIGZvcm1hdFByaW1pdGl2ZShjdHgsIHZhbHVlKSB7XG4gIGlmIChpc1VuZGVmaW5lZCh2YWx1ZSkpXG4gICAgcmV0dXJuIGN0eC5zdHlsaXplKCd1bmRlZmluZWQnLCAndW5kZWZpbmVkJyk7XG4gIGlmIChpc1N0cmluZyh2YWx1ZSkpIHtcbiAgICB2YXIgc2ltcGxlID0gJ1xcJycgKyBKU09OLnN0cmluZ2lmeSh2YWx1ZSkucmVwbGFjZSgvXlwifFwiJC9nLCAnJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKC8nL2csIFwiXFxcXCdcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9cXFxcXCIvZywgJ1wiJykgKyAnXFwnJztcbiAgICByZXR1cm4gY3R4LnN0eWxpemUoc2ltcGxlLCAnc3RyaW5nJyk7XG4gIH1cbiAgaWYgKGlzTnVtYmVyKHZhbHVlKSlcbiAgICByZXR1cm4gY3R4LnN0eWxpemUoJycgKyB2YWx1ZSwgJ251bWJlcicpO1xuICBpZiAoaXNCb29sZWFuKHZhbHVlKSlcbiAgICByZXR1cm4gY3R4LnN0eWxpemUoJycgKyB2YWx1ZSwgJ2Jvb2xlYW4nKTtcbiAgLy8gRm9yIHNvbWUgcmVhc29uIHR5cGVvZiBudWxsIGlzIFwib2JqZWN0XCIsIHNvIHNwZWNpYWwgY2FzZSBoZXJlLlxuICBpZiAoaXNOdWxsKHZhbHVlKSlcbiAgICByZXR1cm4gY3R4LnN0eWxpemUoJ251bGwnLCAnbnVsbCcpO1xufVxuXG5cbmZ1bmN0aW9uIGZvcm1hdEVycm9yKHZhbHVlKSB7XG4gIHJldHVybiAnWycgKyBFcnJvci5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh2YWx1ZSkgKyAnXSc7XG59XG5cblxuZnVuY3Rpb24gZm9ybWF0QXJyYXkoY3R4LCB2YWx1ZSwgcmVjdXJzZVRpbWVzLCB2aXNpYmxlS2V5cywga2V5cykge1xuICB2YXIgb3V0cHV0ID0gW107XG4gIGZvciAodmFyIGkgPSAwLCBsID0gdmFsdWUubGVuZ3RoOyBpIDwgbDsgKytpKSB7XG4gICAgaWYgKGhhc093blByb3BlcnR5KHZhbHVlLCBTdHJpbmcoaSkpKSB7XG4gICAgICBvdXRwdXQucHVzaChmb3JtYXRQcm9wZXJ0eShjdHgsIHZhbHVlLCByZWN1cnNlVGltZXMsIHZpc2libGVLZXlzLFxuICAgICAgICAgIFN0cmluZyhpKSwgdHJ1ZSkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBvdXRwdXQucHVzaCgnJyk7XG4gICAgfVxuICB9XG4gIGtleXMuZm9yRWFjaChmdW5jdGlvbihrZXkpIHtcbiAgICBpZiAoIWtleS5tYXRjaCgvXlxcZCskLykpIHtcbiAgICAgIG91dHB1dC5wdXNoKGZvcm1hdFByb3BlcnR5KGN0eCwgdmFsdWUsIHJlY3Vyc2VUaW1lcywgdmlzaWJsZUtleXMsXG4gICAgICAgICAga2V5LCB0cnVlKSk7XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIG91dHB1dDtcbn1cblxuXG5mdW5jdGlvbiBmb3JtYXRQcm9wZXJ0eShjdHgsIHZhbHVlLCByZWN1cnNlVGltZXMsIHZpc2libGVLZXlzLCBrZXksIGFycmF5KSB7XG4gIHZhciBuYW1lLCBzdHIsIGRlc2M7XG4gIGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHZhbHVlLCBrZXkpIHx8IHsgdmFsdWU6IHZhbHVlW2tleV0gfTtcbiAgaWYgKGRlc2MuZ2V0KSB7XG4gICAgaWYgKGRlc2Muc2V0KSB7XG4gICAgICBzdHIgPSBjdHguc3R5bGl6ZSgnW0dldHRlci9TZXR0ZXJdJywgJ3NwZWNpYWwnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3RyID0gY3R4LnN0eWxpemUoJ1tHZXR0ZXJdJywgJ3NwZWNpYWwnKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgaWYgKGRlc2Muc2V0KSB7XG4gICAgICBzdHIgPSBjdHguc3R5bGl6ZSgnW1NldHRlcl0nLCAnc3BlY2lhbCcpO1xuICAgIH1cbiAgfVxuICBpZiAoIWhhc093blByb3BlcnR5KHZpc2libGVLZXlzLCBrZXkpKSB7XG4gICAgbmFtZSA9ICdbJyArIGtleSArICddJztcbiAgfVxuICBpZiAoIXN0cikge1xuICAgIGlmIChjdHguc2Vlbi5pbmRleE9mKGRlc2MudmFsdWUpIDwgMCkge1xuICAgICAgaWYgKGlzTnVsbChyZWN1cnNlVGltZXMpKSB7XG4gICAgICAgIHN0ciA9IGZvcm1hdFZhbHVlKGN0eCwgZGVzYy52YWx1ZSwgbnVsbCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzdHIgPSBmb3JtYXRWYWx1ZShjdHgsIGRlc2MudmFsdWUsIHJlY3Vyc2VUaW1lcyAtIDEpO1xuICAgICAgfVxuICAgICAgaWYgKHN0ci5pbmRleE9mKCdcXG4nKSA+IC0xKSB7XG4gICAgICAgIGlmIChhcnJheSkge1xuICAgICAgICAgIHN0ciA9IHN0ci5zcGxpdCgnXFxuJykubWFwKGZ1bmN0aW9uKGxpbmUpIHtcbiAgICAgICAgICAgIHJldHVybiAnICAnICsgbGluZTtcbiAgICAgICAgICB9KS5qb2luKCdcXG4nKS5zdWJzdHIoMik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc3RyID0gJ1xcbicgKyBzdHIuc3BsaXQoJ1xcbicpLm1hcChmdW5jdGlvbihsaW5lKSB7XG4gICAgICAgICAgICByZXR1cm4gJyAgICcgKyBsaW5lO1xuICAgICAgICAgIH0pLmpvaW4oJ1xcbicpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHN0ciA9IGN0eC5zdHlsaXplKCdbQ2lyY3VsYXJdJywgJ3NwZWNpYWwnKTtcbiAgICB9XG4gIH1cbiAgaWYgKGlzVW5kZWZpbmVkKG5hbWUpKSB7XG4gICAgaWYgKGFycmF5ICYmIGtleS5tYXRjaCgvXlxcZCskLykpIHtcbiAgICAgIHJldHVybiBzdHI7XG4gICAgfVxuICAgIG5hbWUgPSBKU09OLnN0cmluZ2lmeSgnJyArIGtleSk7XG4gICAgaWYgKG5hbWUubWF0Y2goL15cIihbYS16QS1aX11bYS16QS1aXzAtOV0qKVwiJC8pKSB7XG4gICAgICBuYW1lID0gbmFtZS5zdWJzdHIoMSwgbmFtZS5sZW5ndGggLSAyKTtcbiAgICAgIG5hbWUgPSBjdHguc3R5bGl6ZShuYW1lLCAnbmFtZScpO1xuICAgIH0gZWxzZSB7XG4gICAgICBuYW1lID0gbmFtZS5yZXBsYWNlKC8nL2csIFwiXFxcXCdcIilcbiAgICAgICAgICAgICAgICAgLnJlcGxhY2UoL1xcXFxcIi9nLCAnXCInKVxuICAgICAgICAgICAgICAgICAucmVwbGFjZSgvKF5cInxcIiQpL2csIFwiJ1wiKTtcbiAgICAgIG5hbWUgPSBjdHguc3R5bGl6ZShuYW1lLCAnc3RyaW5nJyk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG5hbWUgKyAnOiAnICsgc3RyO1xufVxuXG5cbmZ1bmN0aW9uIHJlZHVjZVRvU2luZ2xlU3RyaW5nKG91dHB1dCwgYmFzZSwgYnJhY2VzKSB7XG4gIHZhciBudW1MaW5lc0VzdCA9IDA7XG4gIHZhciBsZW5ndGggPSBvdXRwdXQucmVkdWNlKGZ1bmN0aW9uKHByZXYsIGN1cikge1xuICAgIG51bUxpbmVzRXN0Kys7XG4gICAgaWYgKGN1ci5pbmRleE9mKCdcXG4nKSA+PSAwKSBudW1MaW5lc0VzdCsrO1xuICAgIHJldHVybiBwcmV2ICsgY3VyLnJlcGxhY2UoL1xcdTAwMWJcXFtcXGRcXGQ/bS9nLCAnJykubGVuZ3RoICsgMTtcbiAgfSwgMCk7XG5cbiAgaWYgKGxlbmd0aCA+IDYwKSB7XG4gICAgcmV0dXJuIGJyYWNlc1swXSArXG4gICAgICAgICAgIChiYXNlID09PSAnJyA/ICcnIDogYmFzZSArICdcXG4gJykgK1xuICAgICAgICAgICAnICcgK1xuICAgICAgICAgICBvdXRwdXQuam9pbignLFxcbiAgJykgK1xuICAgICAgICAgICAnICcgK1xuICAgICAgICAgICBicmFjZXNbMV07XG4gIH1cblxuICByZXR1cm4gYnJhY2VzWzBdICsgYmFzZSArICcgJyArIG91dHB1dC5qb2luKCcsICcpICsgJyAnICsgYnJhY2VzWzFdO1xufVxuXG5cbi8vIE5PVEU6IFRoZXNlIHR5cGUgY2hlY2tpbmcgZnVuY3Rpb25zIGludGVudGlvbmFsbHkgZG9uJ3QgdXNlIGBpbnN0YW5jZW9mYFxuLy8gYmVjYXVzZSBpdCBpcyBmcmFnaWxlIGFuZCBjYW4gYmUgZWFzaWx5IGZha2VkIHdpdGggYE9iamVjdC5jcmVhdGUoKWAuXG5mdW5jdGlvbiBpc0FycmF5KGFyKSB7XG4gIHJldHVybiBBcnJheS5pc0FycmF5KGFyKTtcbn1cbmV4cG9ydHMuaXNBcnJheSA9IGlzQXJyYXk7XG5cbmZ1bmN0aW9uIGlzQm9vbGVhbihhcmcpIHtcbiAgcmV0dXJuIHR5cGVvZiBhcmcgPT09ICdib29sZWFuJztcbn1cbmV4cG9ydHMuaXNCb29sZWFuID0gaXNCb29sZWFuO1xuXG5mdW5jdGlvbiBpc051bGwoYXJnKSB7XG4gIHJldHVybiBhcmcgPT09IG51bGw7XG59XG5leHBvcnRzLmlzTnVsbCA9IGlzTnVsbDtcblxuZnVuY3Rpb24gaXNOdWxsT3JVbmRlZmluZWQoYXJnKSB7XG4gIHJldHVybiBhcmcgPT0gbnVsbDtcbn1cbmV4cG9ydHMuaXNOdWxsT3JVbmRlZmluZWQgPSBpc051bGxPclVuZGVmaW5lZDtcblxuZnVuY3Rpb24gaXNOdW1iZXIoYXJnKSB7XG4gIHJldHVybiB0eXBlb2YgYXJnID09PSAnbnVtYmVyJztcbn1cbmV4cG9ydHMuaXNOdW1iZXIgPSBpc051bWJlcjtcblxuZnVuY3Rpb24gaXNTdHJpbmcoYXJnKSB7XG4gIHJldHVybiB0eXBlb2YgYXJnID09PSAnc3RyaW5nJztcbn1cbmV4cG9ydHMuaXNTdHJpbmcgPSBpc1N0cmluZztcblxuZnVuY3Rpb24gaXNTeW1ib2woYXJnKSB7XG4gIHJldHVybiB0eXBlb2YgYXJnID09PSAnc3ltYm9sJztcbn1cbmV4cG9ydHMuaXNTeW1ib2wgPSBpc1N5bWJvbDtcblxuZnVuY3Rpb24gaXNVbmRlZmluZWQoYXJnKSB7XG4gIHJldHVybiBhcmcgPT09IHZvaWQgMDtcbn1cbmV4cG9ydHMuaXNVbmRlZmluZWQgPSBpc1VuZGVmaW5lZDtcblxuZnVuY3Rpb24gaXNSZWdFeHAocmUpIHtcbiAgcmV0dXJuIGlzT2JqZWN0KHJlKSAmJiBvYmplY3RUb1N0cmluZyhyZSkgPT09ICdbb2JqZWN0IFJlZ0V4cF0nO1xufVxuZXhwb3J0cy5pc1JlZ0V4cCA9IGlzUmVnRXhwO1xuXG5mdW5jdGlvbiBpc09iamVjdChhcmcpIHtcbiAgcmV0dXJuIHR5cGVvZiBhcmcgPT09ICdvYmplY3QnICYmIGFyZyAhPT0gbnVsbDtcbn1cbmV4cG9ydHMuaXNPYmplY3QgPSBpc09iamVjdDtcblxuZnVuY3Rpb24gaXNEYXRlKGQpIHtcbiAgcmV0dXJuIGlzT2JqZWN0KGQpICYmIG9iamVjdFRvU3RyaW5nKGQpID09PSAnW29iamVjdCBEYXRlXSc7XG59XG5leHBvcnRzLmlzRGF0ZSA9IGlzRGF0ZTtcblxuZnVuY3Rpb24gaXNFcnJvcihlKSB7XG4gIHJldHVybiBpc09iamVjdChlKSAmJlxuICAgICAgKG9iamVjdFRvU3RyaW5nKGUpID09PSAnW29iamVjdCBFcnJvcl0nIHx8IGUgaW5zdGFuY2VvZiBFcnJvcik7XG59XG5leHBvcnRzLmlzRXJyb3IgPSBpc0Vycm9yO1xuXG5mdW5jdGlvbiBpc0Z1bmN0aW9uKGFyZykge1xuICByZXR1cm4gdHlwZW9mIGFyZyA9PT0gJ2Z1bmN0aW9uJztcbn1cbmV4cG9ydHMuaXNGdW5jdGlvbiA9IGlzRnVuY3Rpb247XG5cbmZ1bmN0aW9uIGlzUHJpbWl0aXZlKGFyZykge1xuICByZXR1cm4gYXJnID09PSBudWxsIHx8XG4gICAgICAgICB0eXBlb2YgYXJnID09PSAnYm9vbGVhbicgfHxcbiAgICAgICAgIHR5cGVvZiBhcmcgPT09ICdudW1iZXInIHx8XG4gICAgICAgICB0eXBlb2YgYXJnID09PSAnc3RyaW5nJyB8fFxuICAgICAgICAgdHlwZW9mIGFyZyA9PT0gJ3N5bWJvbCcgfHwgIC8vIEVTNiBzeW1ib2xcbiAgICAgICAgIHR5cGVvZiBhcmcgPT09ICd1bmRlZmluZWQnO1xufVxuZXhwb3J0cy5pc1ByaW1pdGl2ZSA9IGlzUHJpbWl0aXZlO1xuXG5leHBvcnRzLmlzQnVmZmVyID0gcmVxdWlyZSgnLi9zdXBwb3J0L2lzQnVmZmVyJyk7XG5cbmZ1bmN0aW9uIG9iamVjdFRvU3RyaW5nKG8pIHtcbiAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvKTtcbn1cblxuXG5mdW5jdGlvbiBwYWQobikge1xuICByZXR1cm4gbiA8IDEwID8gJzAnICsgbi50b1N0cmluZygxMCkgOiBuLnRvU3RyaW5nKDEwKTtcbn1cblxuXG52YXIgbW9udGhzID0gWydKYW4nLCAnRmViJywgJ01hcicsICdBcHInLCAnTWF5JywgJ0p1bicsICdKdWwnLCAnQXVnJywgJ1NlcCcsXG4gICAgICAgICAgICAgICdPY3QnLCAnTm92JywgJ0RlYyddO1xuXG4vLyAyNiBGZWIgMTY6MTk6MzRcbmZ1bmN0aW9uIHRpbWVzdGFtcCgpIHtcbiAgdmFyIGQgPSBuZXcgRGF0ZSgpO1xuICB2YXIgdGltZSA9IFtwYWQoZC5nZXRIb3VycygpKSxcbiAgICAgICAgICAgICAgcGFkKGQuZ2V0TWludXRlcygpKSxcbiAgICAgICAgICAgICAgcGFkKGQuZ2V0U2Vjb25kcygpKV0uam9pbignOicpO1xuICByZXR1cm4gW2QuZ2V0RGF0ZSgpLCBtb250aHNbZC5nZXRNb250aCgpXSwgdGltZV0uam9pbignICcpO1xufVxuXG5cbi8vIGxvZyBpcyBqdXN0IGEgdGhpbiB3cmFwcGVyIHRvIGNvbnNvbGUubG9nIHRoYXQgcHJlcGVuZHMgYSB0aW1lc3RhbXBcbmV4cG9ydHMubG9nID0gZnVuY3Rpb24oKSB7XG4gIGNvbnNvbGUubG9nKCclcyAtICVzJywgdGltZXN0YW1wKCksIGV4cG9ydHMuZm9ybWF0LmFwcGx5KGV4cG9ydHMsIGFyZ3VtZW50cykpO1xufTtcblxuXG4vKipcbiAqIEluaGVyaXQgdGhlIHByb3RvdHlwZSBtZXRob2RzIGZyb20gb25lIGNvbnN0cnVjdG9yIGludG8gYW5vdGhlci5cbiAqXG4gKiBUaGUgRnVuY3Rpb24ucHJvdG90eXBlLmluaGVyaXRzIGZyb20gbGFuZy5qcyByZXdyaXR0ZW4gYXMgYSBzdGFuZGFsb25lXG4gKiBmdW5jdGlvbiAobm90IG9uIEZ1bmN0aW9uLnByb3RvdHlwZSkuIE5PVEU6IElmIHRoaXMgZmlsZSBpcyB0byBiZSBsb2FkZWRcbiAqIGR1cmluZyBib290c3RyYXBwaW5nIHRoaXMgZnVuY3Rpb24gbmVlZHMgdG8gYmUgcmV3cml0dGVuIHVzaW5nIHNvbWUgbmF0aXZlXG4gKiBmdW5jdGlvbnMgYXMgcHJvdG90eXBlIHNldHVwIHVzaW5nIG5vcm1hbCBKYXZhU2NyaXB0IGRvZXMgbm90IHdvcmsgYXNcbiAqIGV4cGVjdGVkIGR1cmluZyBib290c3RyYXBwaW5nIChzZWUgbWlycm9yLmpzIGluIHIxMTQ5MDMpLlxuICpcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGN0b3IgQ29uc3RydWN0b3IgZnVuY3Rpb24gd2hpY2ggbmVlZHMgdG8gaW5oZXJpdCB0aGVcbiAqICAgICBwcm90b3R5cGUuXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBzdXBlckN0b3IgQ29uc3RydWN0b3IgZnVuY3Rpb24gdG8gaW5oZXJpdCBwcm90b3R5cGUgZnJvbS5cbiAqL1xuZXhwb3J0cy5pbmhlcml0cyA9IHJlcXVpcmUoJ2luaGVyaXRzJyk7XG5cbmV4cG9ydHMuX2V4dGVuZCA9IGZ1bmN0aW9uKG9yaWdpbiwgYWRkKSB7XG4gIC8vIERvbid0IGRvIGFueXRoaW5nIGlmIGFkZCBpc24ndCBhbiBvYmplY3RcbiAgaWYgKCFhZGQgfHwgIWlzT2JqZWN0KGFkZCkpIHJldHVybiBvcmlnaW47XG5cbiAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhhZGQpO1xuICB2YXIgaSA9IGtleXMubGVuZ3RoO1xuICB3aGlsZSAoaS0tKSB7XG4gICAgb3JpZ2luW2tleXNbaV1dID0gYWRkW2tleXNbaV1dO1xuICB9XG4gIHJldHVybiBvcmlnaW47XG59O1xuXG5mdW5jdGlvbiBoYXNPd25Qcm9wZXJ0eShvYmosIHByb3ApIHtcbiAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApO1xufVxuIiwiY29uc3QgaGlzdG9yeSA9IHJlcXVpcmUoJ3NoZWV0LXJvdXRlci9oaXN0b3J5JylcbmNvbnN0IHNoZWV0Um91dGVyID0gcmVxdWlyZSgnc2hlZXQtcm91dGVyJylcbmNvbnN0IGRvY3VtZW50ID0gcmVxdWlyZSgnZ2xvYmFsL2RvY3VtZW50JylcbmNvbnN0IGhyZWYgPSByZXF1aXJlKCdzaGVldC1yb3V0ZXIvaHJlZicpXG5jb25zdCBoYXNoID0gcmVxdWlyZSgnc2hlZXQtcm91dGVyL2hhc2gnKVxuY29uc3QgaGFzaE1hdGNoID0gcmVxdWlyZSgnaGFzaC1tYXRjaCcpXG5jb25zdCBzZW5kQWN0aW9uID0gcmVxdWlyZSgnc2VuZC1hY3Rpb24nKVxuY29uc3QgbXV0YXRlID0gcmVxdWlyZSgneHRlbmQvbXV0YWJsZScpXG5jb25zdCBhc3NlcnQgPSByZXF1aXJlKCdhc3NlcnQnKVxuY29uc3QgeHRlbmQgPSByZXF1aXJlKCd4dGVuZCcpXG5jb25zdCB5byA9IHJlcXVpcmUoJ3lvLXlvJylcblxuY2hvby52aWV3ID0geW9cbm1vZHVsZS5leHBvcnRzID0gY2hvb1xuXG4vLyBmcmFtZXdvcmsgZm9yIGNyZWF0aW5nIHN0dXJkeSB3ZWIgYXBwbGljYXRpb25zXG4vLyBudWxsIC0+IGZuXG5mdW5jdGlvbiBjaG9vICgpIHtcbiAgY29uc3QgX21vZGVscyA9IFtdXG4gIHZhciBfcm91dGVyID0gbnVsbFxuXG4gIHN0YXJ0LnRvU3RyaW5nID0gdG9TdHJpbmdcbiAgc3RhcnQucm91dGVyID0gcm91dGVyXG4gIHN0YXJ0Lm1vZGVsID0gbW9kZWxcbiAgc3RhcnQuc3RhcnQgPSBzdGFydFxuXG4gIHJldHVybiBzdGFydFxuXG4gIC8vIHJlbmRlciB0aGUgYXBwbGljYXRpb24gdG8gYSBzdHJpbmdcbiAgLy8gKHN0ciwgb2JqKSAtPiBzdHJcbiAgZnVuY3Rpb24gdG9TdHJpbmcgKHJvdXRlLCBzZXJ2ZXJTdGF0ZSkge1xuICAgIGNvbnN0IGluaXRpYWxTdGF0ZSA9IHt9XG4gICAgY29uc3QgbnNTdGF0ZSA9IHt9XG5cbiAgICBfbW9kZWxzLmZvckVhY2goZnVuY3Rpb24gKG1vZGVsKSB7XG4gICAgICBjb25zdCBucyA9IG1vZGVsLm5hbWVzcGFjZVxuICAgICAgaWYgKG5zKSB7XG4gICAgICAgIGlmICghbnNTdGF0ZVtuc10pIG5zU3RhdGVbbnNdID0ge31cbiAgICAgICAgYXBwbHkobnMsIG1vZGVsLnN0YXRlLCBuc1N0YXRlKVxuICAgICAgICBuc1N0YXRlW25zXSA9IHh0ZW5kKG5zU3RhdGVbbnNdLCBzZXJ2ZXJTdGF0ZVtuc10pXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhcHBseShtb2RlbC5uYW1lc3BhY2UsIG1vZGVsLnN0YXRlLCBpbml0aWFsU3RhdGUpXG4gICAgICB9XG4gICAgfSlcblxuICAgIGNvbnN0IHN0YXRlID0geHRlbmQoaW5pdGlhbFN0YXRlLCB4dGVuZChzZXJ2ZXJTdGF0ZSwgbnNTdGF0ZSkpXG4gICAgY29uc3QgdHJlZSA9IF9yb3V0ZXIocm91dGUsIHN0YXRlLCBmdW5jdGlvbiAoKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ3NlbmQoKSBjYW5ub3QgYmUgY2FsbGVkIG9uIHRoZSBzZXJ2ZXInKVxuICAgIH0pXG5cbiAgICByZXR1cm4gdHJlZS50b1N0cmluZygpXG4gIH1cblxuICAvLyBzdGFydCB0aGUgYXBwbGljYXRpb25cbiAgLy8gKHN0cj8sIG9iaj8pIC0+IERPTU5vZGVcbiAgZnVuY3Rpb24gc3RhcnQgKHJvb3RJZCwgb3B0cykge1xuICAgIGlmICghb3B0cyAmJiB0eXBlb2Ygcm9vdElkICE9PSAnc3RyaW5nJykge1xuICAgICAgb3B0cyA9IHJvb3RJZFxuICAgICAgcm9vdElkID0gbnVsbFxuICAgIH1cbiAgICBvcHRzID0gb3B0cyB8fCB7fVxuICAgIGNvbnN0IG5hbWUgPSBvcHRzLm5hbWUgfHwgJ2Nob28nXG4gICAgY29uc3QgaW5pdGlhbFN0YXRlID0ge31cbiAgICBjb25zdCByZWR1Y2VycyA9IHt9XG4gICAgY29uc3QgZWZmZWN0cyA9IHt9XG5cbiAgICBfbW9kZWxzLnB1c2goYXBwSW5pdChvcHRzKSlcbiAgICBfbW9kZWxzLmZvckVhY2goZnVuY3Rpb24gKG1vZGVsKSB7XG4gICAgICBpZiAobW9kZWwuc3RhdGUpIGFwcGx5KG1vZGVsLm5hbWVzcGFjZSwgbW9kZWwuc3RhdGUsIGluaXRpYWxTdGF0ZSlcbiAgICAgIGlmIChtb2RlbC5yZWR1Y2VycykgYXBwbHkobW9kZWwubmFtZXNwYWNlLCBtb2RlbC5yZWR1Y2VycywgcmVkdWNlcnMpXG4gICAgICBpZiAobW9kZWwuZWZmZWN0cykgYXBwbHkobW9kZWwubmFtZXNwYWNlLCBtb2RlbC5lZmZlY3RzLCBlZmZlY3RzKVxuICAgIH0pXG5cbiAgICAvLyBzZW5kKCkgaXMgdXNlZCB0byB0cmlnZ2VyIGFjdGlvbnMgaW5zaWRlXG4gICAgLy8gdmlld3MsIGVmZmVjdHMgYW5kIHN1YnNjcmlwdGlvbnNcbiAgICBjb25zdCBzZW5kID0gc2VuZEFjdGlvbih7XG4gICAgICBvbmFjdGlvbjogaGFuZGxlQWN0aW9uLFxuICAgICAgb25jaGFuZ2U6IG9uY2hhbmdlLFxuICAgICAgc3RhdGU6IGluaXRpYWxTdGF0ZVxuICAgIH0pXG5cbiAgICAvLyBzdWJzY3JpcHRpb25zIGFyZSBsb2FkZWQgYWZ0ZXIgc2VuZEFjdGlvbigpIGlzIGNhbGxlZFxuICAgIC8vIGJlY2F1c2UgdGhleSBib3RoIG5lZWQgYWNjZXNzIHRvIHNlbmQoKSBhbmQgY2FuJ3RcbiAgICAvLyByZWFjdCB0byBhY3Rpb25zIChyZWFkLW9ubHkpIC0gYWxzbyB3YWl0IG9uIERPTSB0b1xuICAgIC8vIGJlIGxvYWRlZFxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICBfbW9kZWxzLmZvckVhY2goZnVuY3Rpb24gKG1vZGVsKSB7XG4gICAgICAgIGlmIChtb2RlbC5zdWJzY3JpcHRpb25zKSB7XG4gICAgICAgICAgYXNzZXJ0Lm9rKEFycmF5LmlzQXJyYXkobW9kZWwuc3Vic2NyaXB0aW9ucyksICdzdWJzIG11c3QgYmUgYW4gYXJyJylcbiAgICAgICAgICBtb2RlbC5zdWJzY3JpcHRpb25zLmZvckVhY2goZnVuY3Rpb24gKHN1Yikge1xuICAgICAgICAgICAgc3ViKHNlbmQpXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9KVxuXG4gICAgLy8gSWYgYW4gaWQgaXMgcHJvdmlkZWQsIHRoZSBhcHBsaWNhdGlvbiB3aWxsIHJlaHlkcmF0ZVxuICAgIC8vIG9uIHRoZSBub2RlLiBJZiBubyBpZCBpcyBwcm92aWRlZCBpdCB3aWxsIHJldHVyblxuICAgIC8vIGEgdHJlZSB0aGF0J3MgcmVhZHkgdG8gYmUgYXBwZW5kZWQgdG8gdGhlIERPTS5cbiAgICAvL1xuICAgIC8vIFRoZSByb290SWQgaXMgZGV0ZXJtaW5lZCB0byBmaW5kIHRoZSBhcHBsaWNhdGlvbiByb290XG4gICAgLy8gb24gdXBkYXRlLiBTaW5jZSB0aGUgRE9NIG5vZGVzIGNoYW5nZSBiZXR3ZWVuIHVwZGF0ZXMsXG4gICAgLy8gd2UgbXVzdCBjYWxsIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoKSB0byBmaW5kIHRoZSByb290LlxuICAgIC8vIFVzZSBkaWZmZXJlbnQgbmFtZXMgd2hlbiBsb2FkaW5nIG11bHRpcGxlIGNob28gYXBwbGljYXRpb25zXG4gICAgLy8gb24gdGhlIHNhbWUgcGFnZVxuICAgIGlmIChyb290SWQpIHtcbiAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgcm9vdElkID0gcm9vdElkLnJlcGxhY2UoL14jLywgJycpXG5cbiAgICAgICAgY29uc3Qgb2xkVHJlZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyMnICsgcm9vdElkKVxuICAgICAgICBhc3NlcnQub2sob2xkVHJlZSwgJ2NvdWxkIG5vdCBmaW5kIG5vZGUgIycgKyByb290SWQpXG5cbiAgICAgICAgY29uc3QgbmV3VHJlZSA9IF9yb3V0ZXIoc2VuZC5zdGF0ZSgpLmFwcC5sb2NhdGlvbiwgc2VuZC5zdGF0ZSgpLCBzZW5kKVxuXG4gICAgICAgIHlvLnVwZGF0ZShvbGRUcmVlLCBuZXdUcmVlKVxuICAgICAgfSlcbiAgICB9IGVsc2Uge1xuICAgICAgcm9vdElkID0gbmFtZSArICctcm9vdCdcbiAgICAgIGNvbnN0IHRyZWUgPSBfcm91dGVyKHNlbmQuc3RhdGUoKS5hcHAubG9jYXRpb24sIHNlbmQuc3RhdGUoKSwgc2VuZClcbiAgICAgIHRyZWUuc2V0QXR0cmlidXRlKCdpZCcsIHJvb3RJZClcbiAgICAgIHJldHVybiB0cmVlXG4gICAgfVxuXG4gICAgLy8gaGFuZGxlIGFuIGFjdGlvbiBieSBlaXRoZXIgcmVkdWNlcnMsIGVmZmVjdHNcbiAgICAvLyBvciBib3RoIC0gcmV0dXJuIHRoZSBuZXcgc3RhdGUgd2hlbiBkb25lXG4gICAgLy8gKG9iaiwgb2JqLCBmbikgLT4gb2JqXG4gICAgZnVuY3Rpb24gaGFuZGxlQWN0aW9uIChhY3Rpb24sIHN0YXRlLCBzZW5kKSB7XG4gICAgICB2YXIgcmVkdWNlcnNDYWxsZWQgPSBmYWxzZVxuICAgICAgdmFyIGVmZmVjdHNDYWxsZWQgPSBmYWxzZVxuICAgICAgY29uc3QgbmV3U3RhdGUgPSB4dGVuZChzdGF0ZSlcblxuICAgICAgLy8gdmFsaWRhdGUgaWYgYSBuYW1lc3BhY2UgZXhpc3RzLiBOYW1lc3BhY2VzXG4gICAgICAvLyBhcmUgZGVsaW1pdGVkIGJ5IHRoZSBmaXJzdCAnOicuIFBlcmhhcHNcbiAgICAgIC8vIHdlJ2xsIGFsbG93IHJlY3Vyc2l2ZSBuYW1lc3BhY2VzIGluIHRoZVxuICAgICAgLy8gZnV0dXJlIC0gd2hvIGtub3dzXG4gICAgICBpZiAoLzovLnRlc3QoYWN0aW9uLnR5cGUpKSB7XG4gICAgICAgIGNvbnN0IGFyciA9IGFjdGlvbi50eXBlLnNwbGl0KCc6JylcbiAgICAgICAgdmFyIG5zID0gYXJyLnNoaWZ0KClcbiAgICAgICAgYWN0aW9uLnR5cGUgPSBhcnIuam9pbignOicpXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IF9yZWR1Y2VycyA9IG5zID8gcmVkdWNlcnNbbnNdIDogcmVkdWNlcnNcbiAgICAgIGlmIChfcmVkdWNlcnMgJiYgX3JlZHVjZXJzW2FjdGlvbi50eXBlXSkge1xuICAgICAgICBpZiAobnMpIHtcbiAgICAgICAgICBjb25zdCByZWR1Y2VkU3RhdGUgPSBfcmVkdWNlcnNbYWN0aW9uLnR5cGVdKGFjdGlvbiwgc3RhdGVbbnNdKVxuICAgICAgICAgIGlmICghbmV3U3RhdGVbbnNdKSBuZXdTdGF0ZVtuc10gPSB7fVxuICAgICAgICAgIG11dGF0ZShuZXdTdGF0ZVtuc10sIHh0ZW5kKHN0YXRlW25zXSwgcmVkdWNlZFN0YXRlKSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBtdXRhdGUobmV3U3RhdGUsIHJlZHVjZXJzW2FjdGlvbi50eXBlXShhY3Rpb24sIHN0YXRlKSlcbiAgICAgICAgfVxuICAgICAgICByZWR1Y2Vyc0NhbGxlZCA9IHRydWVcbiAgICAgIH1cblxuICAgICAgY29uc3QgX2VmZmVjdHMgPSBucyA/IGVmZmVjdHNbbnNdIDogZWZmZWN0c1xuICAgICAgaWYgKF9lZmZlY3RzICYmIF9lZmZlY3RzW2FjdGlvbi50eXBlXSkge1xuICAgICAgICBpZiAobnMpIF9lZmZlY3RzW2FjdGlvbi50eXBlXShhY3Rpb24sIHN0YXRlW25zXSwgc2VuZClcbiAgICAgICAgZWxzZSBfZWZmZWN0c1thY3Rpb24udHlwZV0oYWN0aW9uLCBzdGF0ZSwgc2VuZClcbiAgICAgICAgZWZmZWN0c0NhbGxlZCA9IHRydWVcbiAgICAgIH1cblxuICAgICAgaWYgKCFyZWR1Y2Vyc0NhbGxlZCAmJiAhZWZmZWN0c0NhbGxlZCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NvdWxkIG5vdCBmaW5kIGFjdGlvbiAnICsgYWN0aW9uLnR5cGUpXG4gICAgICB9XG5cbiAgICAgIC8vIGFsbG93cyAobmV3U3RhdGUgPT09IG9sZFN0YXRlKSBjaGVja3NcbiAgICAgIHJldHVybiAocmVkdWNlcnNDYWxsZWQpID8gbmV3U3RhdGUgOiBzdGF0ZVxuICAgIH1cblxuICAgIC8vIHVwZGF0ZSB0aGUgRE9NIGFmdGVyIGV2ZXJ5IHN0YXRlIG11dGF0aW9uXG4gICAgLy8gKG9iaiwgb2JqKSAtPiBudWxsXG4gICAgZnVuY3Rpb24gb25jaGFuZ2UgKGFjdGlvbiwgbmV3U3RhdGUsIG9sZFN0YXRlKSB7XG4gICAgICBpZiAobmV3U3RhdGUgPT09IG9sZFN0YXRlKSByZXR1cm5cbiAgICAgIGNvbnN0IG9sZFRyZWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjJyArIHJvb3RJZClcbiAgICAgIGFzc2VydC5vayhvbGRUcmVlLCBcIkNvdWxkIG5vdCBmaW5kIERPTSBub2RlICcjXCIgKyByb290SWQgKyBcIicgdG8gdXBkYXRlXCIpXG4gICAgICBjb25zdCBuZXdUcmVlID0gX3JvdXRlcihuZXdTdGF0ZS5hcHAubG9jYXRpb24sIG5ld1N0YXRlLCBzZW5kLCBvbGRTdGF0ZSlcbiAgICAgIG5ld1RyZWUuc2V0QXR0cmlidXRlKCdpZCcsIHJvb3RJZClcbiAgICAgIHlvLnVwZGF0ZShvbGRUcmVlLCBuZXdUcmVlKVxuICAgIH1cbiAgfVxuXG4gIC8vIHJlZ2lzdGVyIGFsbCByb3V0ZXMgb24gdGhlIHJvdXRlclxuICAvLyAoc3RyPywgW2ZufFtmbl1dKSAtPiBvYmpcbiAgZnVuY3Rpb24gcm91dGVyIChkZWZhdWx0Um91dGUsIGNiKSB7XG4gICAgX3JvdXRlciA9IHNoZWV0Um91dGVyKGRlZmF1bHRSb3V0ZSwgY2IpXG4gICAgcmV0dXJuIF9yb3V0ZXJcbiAgfVxuXG4gIC8vIGNyZWF0ZSBhIG5ldyBtb2RlbFxuICAvLyAoc3RyPywgb2JqKSAtPiBudWxsXG4gIGZ1bmN0aW9uIG1vZGVsIChtb2RlbCkge1xuICAgIF9tb2RlbHMucHVzaChtb2RlbClcbiAgfVxufVxuXG4vLyBpbml0aWFsIGFwcGxpY2F0aW9uIHN0YXRlIG1vZGVsXG4vLyBvYmogLT4gb2JqXG5mdW5jdGlvbiBhcHBJbml0IChvcHRzKSB7XG4gIGNvbnN0IGluaXRpYWxMb2NhdGlvbiA9IChvcHRzLmhhc2ggPT09IHRydWUpXG4gICAgPyBoYXNoTWF0Y2goZG9jdW1lbnQubG9jYXRpb24uaGFzaClcbiAgICA6IGRvY3VtZW50LmxvY2F0aW9uLmhyZWZcblxuICBjb25zdCBtb2RlbCA9IHtcbiAgICBuYW1lc3BhY2U6ICdhcHAnLFxuICAgIHN0YXRlOiB7IGxvY2F0aW9uOiBpbml0aWFsTG9jYXRpb24gfSxcbiAgICBzdWJzY3JpcHRpb25zOiBbXSxcbiAgICByZWR1Y2Vyczoge1xuICAgICAgLy8gaGFuZGxlIGhyZWYgbGlua3NcbiAgICAgIGxvY2F0aW9uOiBmdW5jdGlvbiBzZXRMb2NhdGlvbiAoYWN0aW9uLCBzdGF0ZSkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGxvY2F0aW9uOiBhY3Rpb24ubG9jYXRpb24ucmVwbGFjZSgvIy4qLywgJycpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyBpZiBoYXNoIHJvdXRpbmcgZXhwbGljaXRseSBlbmFibGVkLCBzdWJzY3JpYmUgdG8gaXRcbiAgaWYgKG9wdHMuaGFzaCA9PT0gdHJ1ZSkge1xuICAgIHB1c2hMb2NhdGlvblN1YihmdW5jdGlvbiAobmF2aWdhdGUpIHtcbiAgICAgIGhhc2goZnVuY3Rpb24gKGZyYWdtZW50KSB7XG4gICAgICAgIG5hdmlnYXRlKGhhc2hNYXRjaChmcmFnbWVudCkpXG4gICAgICB9KVxuICAgIH0pXG4gIC8vIG90aGVyd2lzZSwgc3Vic2NyaWJlIHRvIEhUTUw1IGhpc3RvcnkgQVBJXG4gIH0gZWxzZSB7XG4gICAgaWYgKG9wdHMuaGlzdG9yeSAhPT0gZmFsc2UpIHB1c2hMb2NhdGlvblN1YihoaXN0b3J5KVxuICAgIC8vIGVuYWJsZSBjYXRjaGluZyA8YSBocmVmPVwiXCI+PC9hPiBsaW5rc1xuICAgIGlmIChvcHRzLmhyZWYgIT09IGZhbHNlKSBwdXNoTG9jYXRpb25TdWIoaHJlZilcbiAgfVxuXG4gIHJldHVybiBtb2RlbFxuXG4gIC8vIGNyZWF0ZSBhIG5ldyBzdWJzY3JpcHRpb24gdGhhdCBtb2RpZmllc1xuICAvLyAnYXBwOmxvY2F0aW9uJyBhbmQgcHVzaCBpdCB0byBiZSBsb2FkZWRcbiAgLy8gZm4gLT4gbnVsbFxuICBmdW5jdGlvbiBwdXNoTG9jYXRpb25TdWIgKGNiKSB7XG4gICAgbW9kZWwuc3Vic2NyaXB0aW9ucy5wdXNoKGZ1bmN0aW9uIChzZW5kKSB7XG4gICAgICBjYihmdW5jdGlvbiAoaHJlZikge1xuICAgICAgICBzZW5kKCdhcHA6bG9jYXRpb24nLCB7IGxvY2F0aW9uOiBocmVmIH0pXG4gICAgICB9KVxuICAgIH0pXG4gIH1cbn1cblxuLy8gY29tcG9zZSBhbiBvYmplY3QgY29uZGl0aW9uYWxseVxuLy8gb3B0aW9uYWxseSBjb250YWlucyBhIG5hbWVzcGFjZVxuLy8gd2hpY2ggaXMgdXNlZCB0byBuZXN0IHByb3BlcnRpZXMuXG4vLyAoc3RyLCBvYmosIG9iaikgLT4gbnVsbFxuZnVuY3Rpb24gYXBwbHkgKG5zLCBzb3VyY2UsIHRhcmdldCkge1xuICBPYmplY3Qua2V5cyhzb3VyY2UpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgIGlmIChucykge1xuICAgICAgaWYgKCF0YXJnZXRbbnNdKSB0YXJnZXRbbnNdID0ge31cbiAgICAgIHRhcmdldFtuc11ba2V5XSA9IHNvdXJjZVtrZXldXG4gICAgfSBlbHNlIHRhcmdldFtrZXldID0gc291cmNlW2tleV1cbiAgfSlcbn1cbiIsInZhciB0b3BMZXZlbCA9IHR5cGVvZiBnbG9iYWwgIT09ICd1bmRlZmluZWQnID8gZ2xvYmFsIDpcbiAgICB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyA/IHdpbmRvdyA6IHt9XG52YXIgbWluRG9jID0gcmVxdWlyZSgnbWluLWRvY3VtZW50Jyk7XG5cbmlmICh0eXBlb2YgZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBkb2N1bWVudDtcbn0gZWxzZSB7XG4gICAgdmFyIGRvY2N5ID0gdG9wTGV2ZWxbJ19fR0xPQkFMX0RPQ1VNRU5UX0NBQ0hFQDQnXTtcblxuICAgIGlmICghZG9jY3kpIHtcbiAgICAgICAgZG9jY3kgPSB0b3BMZXZlbFsnX19HTE9CQUxfRE9DVU1FTlRfQ0FDSEVANCddID0gbWluRG9jO1xuICAgIH1cblxuICAgIG1vZHVsZS5leHBvcnRzID0gZG9jY3k7XG59XG4iLCJpZiAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIG1vZHVsZS5leHBvcnRzID0gd2luZG93O1xufSBlbHNlIGlmICh0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBnbG9iYWw7XG59IGVsc2UgaWYgKHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiKXtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IHNlbGY7XG59IGVsc2Uge1xuICAgIG1vZHVsZS5leHBvcnRzID0ge307XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGhhc2hNYXRjaCAoaGFzaCwgcHJlZml4KSB7XG4gIHZhciBwcmUgPSBwcmVmaXggfHwgJy8nO1xuICBpZiAoaGFzaC5sZW5ndGggPT09IDApIHJldHVybiBwcmU7XG4gIGhhc2ggPSBoYXNoLnJlcGxhY2UoJyMnLCAnJyk7XG4gIGhhc2ggPSBoYXNoLnJlcGxhY2UoL1xcLyQvLCAnJylcbiAgaWYgKGhhc2guaW5kZXhPZignLycpICE9IDApIGhhc2ggPSAnLycgKyBoYXNoO1xuICBpZiAocHJlID09ICcvJykgcmV0dXJuIGhhc2g7XG4gIGVsc2UgcmV0dXJuIGhhc2gucmVwbGFjZShwcmUsICcnKTtcbn1cbiIsInZhciBleHRlbmQgPSByZXF1aXJlKCd4dGVuZCcpXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gc2VuZEFjdGlvbiAob3B0aW9ucykge1xuICBpZiAoIW9wdGlvbnMpIHRocm93IG5ldyBFcnJvcignb3B0aW9ucyByZXF1aXJlZCcpXG4gIGlmICghb3B0aW9ucy5vbmFjdGlvbikgdGhyb3cgbmV3IEVycm9yKCdvcHRpb25zLm9uYWN0aW9uIHJlcXVpcmVkJylcbiAgaWYgKCFvcHRpb25zLm9uY2hhbmdlKSB0aHJvdyBuZXcgRXJyb3IoJ29wdGlvbnMub25jaGFuZ2UgcmVxdWlyZWQnKVxuICB2YXIgc3RhdGUgPSBvcHRpb25zLnN0YXRlIHx8IHt9XG5cbiAgZnVuY3Rpb24gc2VuZCAoYWN0aW9uLCBwYXJhbXMpIHtcbiAgICBwcm9jZXNzLm5leHRUaWNrKGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmICh0eXBlb2YgYWN0aW9uID09PSAnb2JqZWN0Jykge1xuICAgICAgICBwYXJhbXMgPSBhY3Rpb25cbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGFjdGlvbiA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgcGFyYW1zID0gZXh0ZW5kKHsgdHlwZTogYWN0aW9uIH0sIHBhcmFtcylcbiAgICAgIH1cblxuICAgICAgdmFyIHN0YXRlVXBkYXRlcyA9IG9wdGlvbnMub25hY3Rpb24ocGFyYW1zLCBzdGF0ZSwgc2VuZClcbiAgICAgIGlmIChzdGF0ZSAhPT0gc3RhdGVVcGRhdGVzKSB7XG4gICAgICAgIHVwZGF0ZShwYXJhbXMsIHN0YXRlVXBkYXRlcylcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgZnVuY3Rpb24gdXBkYXRlIChwYXJhbXMsIHN0YXRlVXBkYXRlcykge1xuICAgIHZhciBvbGRTdGF0ZSA9IHN0YXRlXG4gICAgc3RhdGUgPSBleHRlbmQoc3RhdGUsIHN0YXRlVXBkYXRlcylcbiAgICBvcHRpb25zLm9uY2hhbmdlKHBhcmFtcywgc3RhdGUsIG9sZFN0YXRlKVxuICB9XG5cbiAgc2VuZC5ldmVudCA9IGZ1bmN0aW9uIHNlbmRBY3Rpb25fZXZlbnQgKGFjdGlvbiwgcGFyYW1zLCBmbGFnKSB7XG4gICAgaWYgKHR5cGVvZiBmbGFnID09PSB1bmRlZmluZWQpIGZsYWcgPSB0cnVlXG4gICAgcmV0dXJuIGZ1bmN0aW9uIHNlbmRBY3Rpb25fc2VuZF90aHVuayAoZSkge1xuICAgICAgaWYgKGZsYWcgJiYgZSAmJiBlLnByZXZlbnREZWZhdWx0KSBlLnByZXZlbnREZWZhdWx0KClcbiAgICAgIHNlbmQoYWN0aW9uLCBwYXJhbXMsIGZsYWcpXG4gICAgfVxuICB9XG5cbiAgc2VuZC5zdGF0ZSA9IGZ1bmN0aW9uIHNlbmRBY3Rpb25fc3RhdGUgKCkge1xuICAgIHJldHVybiBzdGF0ZVxuICB9XG5cbiAgcmV0dXJuIHNlbmRcbn1cbiIsImNvbnN0IHdpbmRvdyA9IHJlcXVpcmUoJ2dsb2JhbC93aW5kb3cnKVxuY29uc3QgYXNzZXJ0ID0gcmVxdWlyZSgnYXNzZXJ0JylcblxubW9kdWxlLmV4cG9ydHMgPSBoYXNoXG5cbi8vIGxpc3RlbiB0byB3aW5kb3cgaGFzaGNoYW5nZSBldmVudHNcbi8vIGFuZCB1cGRhdGUgcm91dGVyIGFjY29yZGluZ2x5XG4vLyBmbihjYikgLT4gbnVsbFxuZnVuY3Rpb24gaGFzaCAoY2IpIHtcbiAgYXNzZXJ0LmVxdWFsKHR5cGVvZiBjYiwgJ2Z1bmN0aW9uJywgJ2NiIG11c3QgYmUgYSBmdW5jdGlvbicpXG4gIHdpbmRvdy5vbmhhc2hjaGFuZ2UgPSBmdW5jdGlvbiAoZSkge1xuICAgIGNiKHdpbmRvdy5sb2NhdGlvbi5oYXNoKVxuICB9XG59XG4iLCJjb25zdCBkb2N1bWVudCA9IHJlcXVpcmUoJ2dsb2JhbC9kb2N1bWVudCcpXG5jb25zdCB3aW5kb3cgPSByZXF1aXJlKCdnbG9iYWwvd2luZG93JylcbmNvbnN0IGFzc2VydCA9IHJlcXVpcmUoJ2Fzc2VydCcpXG5cbm1vZHVsZS5leHBvcnRzID0gaGlzdG9yeVxuXG4vLyBsaXN0ZW4gdG8gaHRtbDUgcHVzaHN0YXRlIGV2ZW50c1xuLy8gYW5kIHVwZGF0ZSByb3V0ZXIgYWNjb3JkaW5nbHlcbi8vIGZuKHN0cikgLT4gbnVsbFxuZnVuY3Rpb24gaGlzdG9yeSAoY2IpIHtcbiAgYXNzZXJ0LmVxdWFsKHR5cGVvZiBjYiwgJ2Z1bmN0aW9uJywgJ2NiIG11c3QgYmUgYSBmdW5jdGlvbicpXG4gIHdpbmRvdy5vbnBvcHN0YXRlID0gZnVuY3Rpb24gKCkge1xuICAgIGNiKGRvY3VtZW50LmxvY2F0aW9uLmhyZWYpXG4gIH1cbn1cbiIsImNvbnN0IHdpbmRvdyA9IHJlcXVpcmUoJ2dsb2JhbC93aW5kb3cnKVxuY29uc3QgYXNzZXJ0ID0gcmVxdWlyZSgnYXNzZXJ0JylcblxubW9kdWxlLmV4cG9ydHMgPSBocmVmXG5cbi8vIGhhbmRsZSBhIGNsaWNrIGlmIGlzIGFuY2hvciB0YWcgd2l0aCBhbiBocmVmXG4vLyBhbmQgdXJsIGxpdmVzIG9uIHRoZSBzYW1lIGRvbWFpbi4gUmVwbGFjZXNcbi8vIHRyYWlsaW5nICcjJyBzbyBlbXB0eSBsaW5rcyB3b3JrIGFzIGV4cGVjdGVkLlxuLy8gZm4oc3RyKSAtPiBudWxsXG5mdW5jdGlvbiBocmVmIChjYikge1xuICBhc3NlcnQuZXF1YWwodHlwZW9mIGNiLCAnZnVuY3Rpb24nLCAnY2IgbXVzdCBiZSBhIGZ1bmN0aW9uJylcblxuICB3aW5kb3cub25jbGljayA9IGZ1bmN0aW9uIChlKSB7XG4gICAgY29uc3Qgbm9kZSA9IChmdW5jdGlvbiB0cmF2ZXJzZSAobm9kZSkge1xuICAgICAgaWYgKCFub2RlKSByZXR1cm5cbiAgICAgIGlmIChub2RlLmxvY2FsTmFtZSAhPT0gJ2EnKSByZXR1cm4gdHJhdmVyc2Uobm9kZS5wYXJlbnROb2RlKVxuICAgICAgaWYgKG5vZGUuaHJlZiA9PT0gdW5kZWZpbmVkKSByZXR1cm4gdHJhdmVyc2Uobm9kZS5wYXJlbnROb2RlKVxuICAgICAgaWYgKHdpbmRvdy5sb2NhdGlvbi5ob3N0ICE9PSBub2RlLmhvc3QpIHJldHVybiB0cmF2ZXJzZShub2RlLnBhcmVudE5vZGUpXG4gICAgICByZXR1cm4gbm9kZVxuICAgIH0pKGUudGFyZ2V0KVxuXG4gICAgaWYgKCFub2RlKSByZXR1cm5cblxuICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgIGNvbnN0IGhyZWYgPSBub2RlLmhyZWYucmVwbGFjZSgvIyQvLCAnJylcbiAgICBjYihocmVmKVxuICAgIHdpbmRvdy5oaXN0b3J5LnB1c2hTdGF0ZSh7fSwgbnVsbCwgaHJlZilcbiAgfVxufVxuIiwiY29uc3QgcGF0aG5hbWUgPSByZXF1aXJlKCdwYXRobmFtZS1tYXRjaCcpXG5jb25zdCB3YXlmYXJlciA9IHJlcXVpcmUoJ3dheWZhcmVyJylcbmNvbnN0IGFzc2VydCA9IHJlcXVpcmUoJ2Fzc2VydCcpXG5cbm1vZHVsZS5leHBvcnRzID0gc2hlZXRSb3V0ZXJcblxuLy8gRmFzdCwgbW9kdWxhciBjbGllbnQgcm91dGVyXG4vLyBmbihzdHIsIGFueVsuLl0sIGZuPykgLT4gZm4oc3RyLCBhbnlbLi5dKVxuZnVuY3Rpb24gc2hlZXRSb3V0ZXIgKGRmdCwgY3JlYXRlVHJlZSwgY3JlYXRlUm91dGUpIHtcbiAgY3JlYXRlUm91dGUgPSBjcmVhdGVSb3V0ZSA/IGNyZWF0ZVJvdXRlKHIpIDogclxuICBpZiAoIWNyZWF0ZVRyZWUpIHtcbiAgICBjcmVhdGVUcmVlID0gZGZ0XG4gICAgZGZ0ID0gJydcbiAgfVxuXG4gIGFzc2VydC5lcXVhbCh0eXBlb2YgZGZ0LCAnc3RyaW5nJywgJ2RmdCBtdXN0IGJlIGEgc3RyaW5nJylcbiAgYXNzZXJ0LmVxdWFsKHR5cGVvZiBjcmVhdGVUcmVlLCAnZnVuY3Rpb24nLCAnY3JlYXRlVHJlZSBtdXN0IGJlIGEgZnVuY3Rpb24nKVxuXG4gIGNvbnN0IHJvdXRlciA9IHdheWZhcmVyKGRmdClcbiAgY29uc3QgdHJlZSA9IGNyZWF0ZVRyZWUoY3JlYXRlUm91dGUpXG5cbiAgLy8gcmVnaXN0ZXIgdHJlZSBpbiByb3V0ZXJcbiAgOyhmdW5jdGlvbiB3YWxrICh0cmVlLCByb3V0ZSkge1xuICAgIGlmIChBcnJheS5pc0FycmF5KHRyZWVbMF0pKSB7XG4gICAgICAvLyB3YWxrIG92ZXIgYWxsIHJvdXRlcyBhdCB0aGUgcm9vdCBvZiB0aGUgdHJlZVxuICAgICAgdHJlZS5mb3JFYWNoKGZ1bmN0aW9uIChub2RlKSB7XG4gICAgICAgIHdhbGsobm9kZSwgcm91dGUpXG4gICAgICB9KVxuICAgIH0gZWxzZSBpZiAodHJlZVsxXSkge1xuICAgICAgLy8gaGFuZGxlIGlubGluZSBmdW5jdGlvbnMgYXMgYXJnc1xuICAgICAgY29uc3QgaW5uZXJSb3V0ZSA9IHRyZWVbMF1cbiAgICAgICAgPyByb3V0ZS5jb25jYXQodHJlZVswXSkuam9pbignLycpXG4gICAgICAgIDogcm91dGUubGVuZ3RoID8gcm91dGUuam9pbignLycpIDogdHJlZVswXVxuICAgICAgcm91dGVyLm9uKGlubmVyUm91dGUsIHRyZWVbMV0pXG4gICAgICB3YWxrKHRyZWVbMl0sIHJvdXRlLmNvbmNhdCh0cmVlWzBdKSlcbiAgICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkodHJlZVsyXSkpIHtcbiAgICAgIC8vIHRyYXZlcnNlIGFuZCBhcHBlbmQgcm91dGVcbiAgICAgIHdhbGsodHJlZVsyXSwgcm91dGUuY29uY2F0KHRyZWVbMF0pKVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyByZWdpc3RlciBwYXRoIGluIHJvdXRlclxuICAgICAgY29uc3QgbndSb3V0ZSA9IHRyZWVbMF1cbiAgICAgICAgPyByb3V0ZS5jb25jYXQodHJlZVswXSkuam9pbignLycpXG4gICAgICAgIDogcm91dGUubGVuZ3RoID8gcm91dGUuam9pbignLycpIDogdHJlZVswXVxuICAgICAgcm91dGVyLm9uKG53Um91dGUsIHRyZWVbMl0pXG4gICAgfVxuICB9KSh0cmVlLCBbXSlcblxuICAvLyBtYXRjaCBhIHJvdXRlIG9uIHRoZSByb3V0ZXJcbiAgcmV0dXJuIGZ1bmN0aW9uIG1hdGNoIChyb3V0ZSkge1xuICAgIGFzc2VydC5lcXVhbCh0eXBlb2Ygcm91dGUsICdzdHJpbmcnLCAncm91dGUgbXVzdCBiZSBhIHN0cmluZycpXG4gICAgY29uc3QgYXJncyA9IFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzKVxuICAgIGFyZ3NbMF0gPSBwYXRobmFtZShhcmdzWzBdKVxuICAgIHJldHVybiByb3V0ZXIuYXBwbHkobnVsbCwgYXJncylcbiAgfVxufVxuXG4vLyByZWdpc3RlciByZWd1bGFyIHJvdXRlXG5mdW5jdGlvbiByIChyb3V0ZSwgaW5saW5lLCBjaGlsZCkge1xuICBpZiAoIWNoaWxkKSB7XG4gICAgY2hpbGQgPSBpbmxpbmVcbiAgICBpbmxpbmUgPSBudWxsXG4gIH1cbiAgYXNzZXJ0LmVxdWFsKHR5cGVvZiByb3V0ZSwgJ3N0cmluZycsICdyb3V0ZSBtdXN0IGJlIGEgc3RyaW5nJylcbiAgYXNzZXJ0Lm9rKGNoaWxkLCAnY2hpbGQgZXhpc3RzJylcbiAgcm91dGUgPSByb3V0ZS5yZXBsYWNlKC9eXFwvLywgJycpXG4gIHJldHVybiBbIHJvdXRlLCBpbmxpbmUsIGNoaWxkIF1cbn1cbiIsImNvbnN0IGFzc2VydCA9IHJlcXVpcmUoJ2Fzc2VydCcpXG5cbm1vZHVsZS5leHBvcnRzID0gbWF0Y2hcblxuLy8gZ2V0IHVybCBwYXRoIHNlY3Rpb24gZnJvbSBhIHVybFxuLy8gc3RyaXAgcXVlcnlzdHJpbmdzIC8gaGFzaGVzXG4vLyBzdHJpcCBwcm90b2NvbFxuLy8gc3RyaXAgaG9zdG5hbWUgYW5kIHBvcnQgKGJvdGggaXAgYW5kIHJvdXRlKVxuLy8gc3RyIC0+IHN0clxuZnVuY3Rpb24gbWF0Y2ggKHJvdXRlKSB7XG4gIGFzc2VydC5lcXVhbCh0eXBlb2Ygcm91dGUsICdzdHJpbmcnKVxuXG4gIHJldHVybiByb3V0ZS50cmltKClcbiAgICAucmVwbGFjZSgvW1xcP3wjXS4qJC8sICcnKVxuICAgIC5yZXBsYWNlKC9eKD86aHR0cHM/XFw6KVxcL1xcLy8sICcnKVxuICAgIC5yZXBsYWNlKC9eKD86W1xcdysoPzotXFx3KykrLl0pKyg/OltcXDowLTldezQsNX0pPy8sICcnKVxuICAgIC5yZXBsYWNlKC9cXC8kLywgJycpXG59XG4iLCJcbi8qKlxuICogQW4gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKSBhbHRlcm5hdGl2ZVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBhcmdzIHNvbWV0aGluZyB3aXRoIGEgbGVuZ3RoXG4gKiBAcGFyYW0ge051bWJlcn0gc2xpY2VcbiAqIEBwYXJhbSB7TnVtYmVyfSBzbGljZUVuZFxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChhcmdzLCBzbGljZSwgc2xpY2VFbmQpIHtcbiAgdmFyIHJldCA9IFtdO1xuICB2YXIgbGVuID0gYXJncy5sZW5ndGg7XG5cbiAgaWYgKDAgPT09IGxlbikgcmV0dXJuIHJldDtcblxuICB2YXIgc3RhcnQgPSBzbGljZSA8IDBcbiAgICA/IE1hdGgubWF4KDAsIHNsaWNlICsgbGVuKVxuICAgIDogc2xpY2UgfHwgMDtcblxuICBpZiAoc2xpY2VFbmQgIT09IHVuZGVmaW5lZCkge1xuICAgIGxlbiA9IHNsaWNlRW5kIDwgMFxuICAgICAgPyBzbGljZUVuZCArIGxlblxuICAgICAgOiBzbGljZUVuZFxuICB9XG5cbiAgd2hpbGUgKGxlbi0tID4gc3RhcnQpIHtcbiAgICByZXRbbGVuIC0gc3RhcnRdID0gYXJnc1tsZW5dO1xuICB9XG5cbiAgcmV0dXJuIHJldDtcbn1cblxuIiwiY29uc3QgYXNzZXJ0ID0gcmVxdWlyZSgnYXNzZXJ0JylcbmNvbnN0IHNsaWNlZCA9IHJlcXVpcmUoJ3NsaWNlZCcpXG5jb25zdCB0cmllID0gcmVxdWlyZSgnLi90cmllJylcblxubW9kdWxlLmV4cG9ydHMgPSBXYXlmYXJlclxuXG4vLyBjcmVhdGUgYSByb3V0ZXJcbi8vIHN0ciAtPiBvYmpcbmZ1bmN0aW9uIFdheWZhcmVyIChkZnQpIHtcbiAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIFdheWZhcmVyKSkgcmV0dXJuIG5ldyBXYXlmYXJlcihkZnQpXG5cbiAgY29uc3QgX2RlZmF1bHQgPSAoZGZ0IHx8ICcnKS5yZXBsYWNlKC9eXFwvLywgJycpXG4gIGNvbnN0IF90cmllID0gdHJpZSgpXG5cbiAgZW1pdC5fdHJpZSA9IF90cmllXG4gIGVtaXQuZW1pdCA9IGVtaXRcbiAgZW1pdC5vbiA9IG9uXG4gIGVtaXQuX3dheWZhcmVyID0gdHJ1ZVxuXG4gIHJldHVybiBlbWl0XG5cbiAgLy8gZGVmaW5lIGEgcm91dGVcbiAgLy8gKHN0ciwgZm4pIC0+IG9ialxuICBmdW5jdGlvbiBvbiAocm91dGUsIGNiKSB7XG4gICAgYXNzZXJ0LmVxdWFsKHR5cGVvZiByb3V0ZSwgJ3N0cmluZycpXG4gICAgYXNzZXJ0LmVxdWFsKHR5cGVvZiBjYiwgJ2Z1bmN0aW9uJylcblxuICAgIHJvdXRlID0gcm91dGUgfHwgJy8nXG5cbiAgICBpZiAoY2IgJiYgY2IuX3dheWZhcmVyICYmIGNiLl90cmllKSB7XG4gICAgICBfdHJpZS5tb3VudChyb3V0ZSwgY2IuX3RyaWUudHJpZSlcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3Qgbm9kZSA9IF90cmllLmNyZWF0ZShyb3V0ZSlcbiAgICAgIG5vZGUuY2IgPSBjYlxuICAgIH1cblxuICAgIHJldHVybiBlbWl0XG4gIH1cblxuICAvLyBtYXRjaCBhbmQgY2FsbCBhIHJvdXRlXG4gIC8vIChzdHIsIG9iaj8pIC0+IG51bGxcbiAgZnVuY3Rpb24gZW1pdCAocm91dGUpIHtcbiAgICBhc3NlcnQubm90RXF1YWwocm91dGUsIHVuZGVmaW5lZCwgXCIncm91dGUnIG11c3QgYmUgZGVmaW5lZFwiKVxuICAgIGNvbnN0IGFyZ3MgPSBzbGljZWQoYXJndW1lbnRzKVxuXG4gICAgY29uc3Qgbm9kZSA9IF90cmllLm1hdGNoKHJvdXRlKVxuICAgIGlmIChub2RlICYmIG5vZGUuY2IpIHtcbiAgICAgIGFyZ3NbMF0gPSBub2RlLnBhcmFtc1xuICAgICAgcmV0dXJuIG5vZGUuY2IuYXBwbHkobnVsbCwgYXJncylcbiAgICB9XG5cbiAgICBjb25zdCBkZnQgPSBfdHJpZS5tYXRjaChfZGVmYXVsdClcbiAgICBpZiAoZGZ0ICYmIGRmdC5jYikge1xuICAgICAgYXJnc1swXSA9IGRmdC5wYXJhbXNcbiAgICAgIHJldHVybiBkZnQuY2IuYXBwbHkobnVsbCwgYXJncylcbiAgICB9XG5cbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJyb3V0ZSAnXCIgKyByb3V0ZSArIFwiJyBkaWQgbm90IG1hdGNoXCIpXG4gIH1cbn1cbiIsImNvbnN0IG11dGF0ZSA9IHJlcXVpcmUoJ3h0ZW5kL211dGFibGUnKVxuY29uc3QgYXNzZXJ0ID0gcmVxdWlyZSgnYXNzZXJ0JylcbmNvbnN0IHh0ZW5kID0gcmVxdWlyZSgneHRlbmQnKVxuXG5tb2R1bGUuZXhwb3J0cyA9IFRyaWVcblxuLy8gY3JlYXRlIGEgbmV3IHRyaWVcbi8vIG51bGwgLT4gb2JqXG5mdW5jdGlvbiBUcmllICgpIHtcbiAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIFRyaWUpKSByZXR1cm4gbmV3IFRyaWUoKVxuICB0aGlzLnRyaWUgPSB7IG5vZGVzOiB7fSB9XG59XG5cbi8vIGNyZWF0ZSBhIG5vZGUgb24gdGhlIHRyaWUgYXQgcm91dGVcbi8vIGFuZCByZXR1cm4gYSBub2RlXG4vLyBzdHIgLT4gbnVsbFxuVHJpZS5wcm90b3R5cGUuY3JlYXRlID0gZnVuY3Rpb24gKHJvdXRlKSB7XG4gIGFzc2VydC5lcXVhbCh0eXBlb2Ygcm91dGUsICdzdHJpbmcnLCAncm91dGUgc2hvdWxkIGJlIGEgc3RyaW5nJylcbiAgLy8gc3RyaXAgbGVhZGluZyAnLycgYW5kIHNwbGl0IHJvdXRlc1xuICBjb25zdCByb3V0ZXMgPSByb3V0ZS5yZXBsYWNlKC9eXFwvLywgJycpLnNwbGl0KCcvJylcbiAgcmV0dXJuIChmdW5jdGlvbiBjcmVhdGVOb2RlIChpbmRleCwgdHJpZSwgcm91dGVzKSB7XG4gICAgY29uc3Qgcm91dGUgPSByb3V0ZXNbaW5kZXhdXG5cbiAgICBpZiAocm91dGUgPT09IHVuZGVmaW5lZCkgcmV0dXJuIHRyaWVcblxuICAgIHZhciBub2RlID0gbnVsbFxuICAgIGlmICgvXjovLnRlc3Qocm91dGUpKSB7XG4gICAgICAvLyBpZiBub2RlIGlzIGEgbmFtZSBtYXRjaCwgc2V0IG5hbWUgYW5kIGFwcGVuZCB0byAnOicgbm9kZVxuICAgICAgaWYgKCF0cmllLm5vZGVzWyckJCddKSB7XG4gICAgICAgIG5vZGUgPSB7IG5vZGVzOiB7fSB9XG4gICAgICAgIHRyaWUubm9kZXNbJyQkJ10gPSBub2RlXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBub2RlID0gdHJpZS5ub2Rlc1snJCQnXVxuICAgICAgfVxuICAgICAgdHJpZS5uYW1lID0gcm91dGUucmVwbGFjZSgvXjovLCAnJylcbiAgICB9IGVsc2UgaWYgKCF0cmllLm5vZGVzW3JvdXRlXSkge1xuICAgICAgbm9kZSA9IHsgbm9kZXM6IHt9IH1cbiAgICAgIHRyaWUubm9kZXNbcm91dGVdID0gbm9kZVxuICAgIH0gZWxzZSB7XG4gICAgICBub2RlID0gdHJpZS5ub2Rlc1tyb3V0ZV1cbiAgICB9XG5cbiAgICAvLyB3ZSBtdXN0IHJlY3Vyc2UgZGVlcGVyXG4gICAgcmV0dXJuIGNyZWF0ZU5vZGUoaW5kZXggKyAxLCBub2RlLCByb3V0ZXMpXG4gIH0pKDAsIHRoaXMudHJpZSwgcm91dGVzKVxufVxuXG4vLyBtYXRjaCBhIHJvdXRlIG9uIHRoZSB0cmllXG4vLyBhbmQgcmV0dXJuIHRoZSBub2RlXG4vLyBzdHIgLT4gb2JqXG5UcmllLnByb3RvdHlwZS5tYXRjaCA9IGZ1bmN0aW9uIChyb3V0ZSkge1xuICBhc3NlcnQuZXF1YWwodHlwZW9mIHJvdXRlLCAnc3RyaW5nJywgJ3JvdXRlIHNob3VsZCBiZSBhIHN0cmluZycpXG5cbiAgY29uc3Qgcm91dGVzID0gcm91dGUucmVwbGFjZSgvXlxcLy8sICcnKS5zcGxpdCgnLycpXG4gIGNvbnN0IHBhcmFtcyA9IHt9XG5cbiAgdmFyIG5vZGUgPSAoZnVuY3Rpb24gc2VhcmNoIChpbmRleCwgdHJpZSkge1xuICAgIC8vIGVpdGhlciB0aGVyZSdzIG5vIG1hdGNoLCBvciB3ZSdyZSBkb25lIHNlYXJjaGluZ1xuICAgIGlmICh0cmllID09PSB1bmRlZmluZWQpIHJldHVybiB1bmRlZmluZWRcbiAgICBjb25zdCByb3V0ZSA9IHJvdXRlc1tpbmRleF1cbiAgICBpZiAocm91dGUgPT09IHVuZGVmaW5lZCkgcmV0dXJuIHRyaWVcblxuICAgIGlmICh0cmllLm5vZGVzW3JvdXRlXSkge1xuICAgICAgLy8gbWF0Y2ggcmVndWxhciByb3V0ZXMgZmlyc3RcbiAgICAgIHJldHVybiBzZWFyY2goaW5kZXggKyAxLCB0cmllLm5vZGVzW3JvdXRlXSlcbiAgICB9IGVsc2UgaWYgKHRyaWUubmFtZSkge1xuICAgICAgLy8gbWF0Y2ggbmFtZWQgcm91dGVzXG4gICAgICBwYXJhbXNbdHJpZS5uYW1lXSA9IHJvdXRlXG4gICAgICByZXR1cm4gc2VhcmNoKGluZGV4ICsgMSwgdHJpZS5ub2Rlc1snJCQnXSlcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gbm8gbWF0Y2hlcyBmb3VuZFxuICAgICAgcmV0dXJuIHNlYXJjaChpbmRleCArIDEpXG4gICAgfVxuICB9KSgwLCB0aGlzLnRyaWUpXG5cbiAgaWYgKCFub2RlKSByZXR1cm4gdW5kZWZpbmVkXG4gIG5vZGUgPSB4dGVuZChub2RlKVxuICBub2RlLnBhcmFtcyA9IHBhcmFtc1xuICByZXR1cm4gbm9kZVxufVxuXG4vLyBtb3VudCBhIHRyaWUgb250byBhIG5vZGUgYXQgcm91dGVcbi8vIChzdHIsIG9iaikgLT4gbnVsbFxuVHJpZS5wcm90b3R5cGUubW91bnQgPSBmdW5jdGlvbiAocm91dGUsIHRyaWUpIHtcbiAgYXNzZXJ0LmVxdWFsKHR5cGVvZiByb3V0ZSwgJ3N0cmluZycsICdyb3V0ZSBzaG91bGQgYmUgYSBzdHJpbmcnKVxuICBhc3NlcnQuZXF1YWwodHlwZW9mIHRyaWUsICdvYmplY3QnLCAndHJpZSBzaG91bGQgYmUgYSBvYmplY3QnKVxuXG4gIGNvbnN0IHNwbGl0ID0gcm91dGUucmVwbGFjZSgvXlxcLy8sICcnKS5zcGxpdCgnLycpXG4gIHZhciBub2RlID0gbnVsbFxuICB2YXIga2V5ID0gbnVsbFxuXG4gIGlmIChzcGxpdC5sZW5ndGggPT09IDEpIHtcbiAgICBrZXkgPSBzcGxpdFswXVxuICAgIG5vZGUgPSB0aGlzLmNyZWF0ZShrZXkpXG4gIH0gZWxzZSB7XG4gICAgY29uc3QgaGVhZEFyciA9IHNwbGl0LnNwbGljZSgwLCBzcGxpdC5sZW5ndGggLSAxKVxuICAgIGNvbnN0IGhlYWQgPSBoZWFkQXJyLmpvaW4oJy8nKVxuICAgIGtleSA9IHNwbGl0WzBdXG4gICAgbm9kZSA9IHRoaXMuY3JlYXRlKGhlYWQpXG4gIH1cblxuICBtdXRhdGUobm9kZS5ub2RlcywgdHJpZS5ub2RlcylcbiAgaWYgKHRyaWUubmFtZSkgbm9kZS5uYW1lID0gdHJpZS5uYW1lXG5cbiAgLy8gZGVsZWdhdGUgcHJvcGVydGllcyBmcm9tICcvJyB0byB0aGUgbmV3IG5vZGVcbiAgLy8gJy8nIGNhbm5vdCBiZSByZWFjaGVkIG9uY2UgbW91bnRlZFxuICBpZiAobm9kZS5ub2Rlc1snJ10pIHtcbiAgICBPYmplY3Qua2V5cyhub2RlLm5vZGVzWycnXSkuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgICBpZiAoa2V5ID09PSAnbm9kZXMnKSByZXR1cm5cbiAgICAgIG5vZGVba2V5XSA9IG5vZGUubm9kZXNbJyddW2tleV1cbiAgICB9KVxuICAgIG11dGF0ZShub2RlLm5vZGVzLCBub2RlLm5vZGVzWycnXS5ub2RlcylcbiAgICBkZWxldGUgbm9kZS5ub2Rlc1snJ10ubm9kZXNcbiAgfVxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSBleHRlbmRcblxudmFyIGhhc093blByb3BlcnR5ID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcblxuZnVuY3Rpb24gZXh0ZW5kKCkge1xuICAgIHZhciB0YXJnZXQgPSB7fVxuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXVxuXG4gICAgICAgIGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHtcbiAgICAgICAgICAgIGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKHNvdXJjZSwga2V5KSkge1xuICAgICAgICAgICAgICAgIHRhcmdldFtrZXldID0gc291cmNlW2tleV1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0YXJnZXRcbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gZXh0ZW5kXG5cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG5cbmZ1bmN0aW9uIGV4dGVuZCh0YXJnZXQpIHtcbiAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldXG5cbiAgICAgICAgZm9yICh2YXIga2V5IGluIHNvdXJjZSkge1xuICAgICAgICAgICAgaWYgKGhhc093blByb3BlcnR5LmNhbGwoc291cmNlLCBrZXkpKSB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRhcmdldFxufVxuIiwidmFyIGJlbCA9IHJlcXVpcmUoJ2JlbCcpIC8vIHR1cm5zIHRlbXBsYXRlIHRhZyBpbnRvIERPTSBlbGVtZW50c1xudmFyIG1vcnBoZG9tID0gcmVxdWlyZSgnbW9ycGhkb20nKSAvLyBlZmZpY2llbnRseSBkaWZmcyArIG1vcnBocyB0d28gRE9NIGVsZW1lbnRzXG52YXIgZGVmYXVsdEV2ZW50cyA9IHJlcXVpcmUoJy4vdXBkYXRlLWV2ZW50cy5qcycpIC8vIGRlZmF1bHQgZXZlbnRzIHRvIGJlIGNvcGllZCB3aGVuIGRvbSBlbGVtZW50cyB1cGRhdGVcblxubW9kdWxlLmV4cG9ydHMgPSBiZWxcblxuLy8gVE9ETyBtb3ZlIHRoaXMgKyBkZWZhdWx0RXZlbnRzIHRvIGEgbmV3IG1vZHVsZSBvbmNlIHdlIHJlY2VpdmUgbW9yZSBmZWVkYmFja1xubW9kdWxlLmV4cG9ydHMudXBkYXRlID0gZnVuY3Rpb24gKGZyb21Ob2RlLCB0b05vZGUsIG9wdHMpIHtcbiAgaWYgKCFvcHRzKSBvcHRzID0ge31cbiAgaWYgKG9wdHMuZXZlbnRzICE9PSBmYWxzZSkge1xuICAgIGlmICghb3B0cy5vbkJlZm9yZU1vcnBoRWwpIG9wdHMub25CZWZvcmVNb3JwaEVsID0gY29waWVyXG4gIH1cblxuICByZXR1cm4gbW9ycGhkb20oZnJvbU5vZGUsIHRvTm9kZSwgb3B0cylcblxuICAvLyBtb3JwaGRvbSBvbmx5IGNvcGllcyBhdHRyaWJ1dGVzLiB3ZSBkZWNpZGVkIHdlIGFsc28gd2FudGVkIHRvIGNvcHkgZXZlbnRzXG4gIC8vIHRoYXQgY2FuIGJlIHNldCB2aWEgYXR0cmlidXRlc1xuICBmdW5jdGlvbiBjb3BpZXIgKGYsIHQpIHtcbiAgICAvLyBjb3B5IGV2ZW50czpcbiAgICB2YXIgZXZlbnRzID0gb3B0cy5ldmVudHMgfHwgZGVmYXVsdEV2ZW50c1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZXZlbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgZXYgPSBldmVudHNbaV1cbiAgICAgIGlmICh0W2V2XSkgeyAvLyBpZiBuZXcgZWxlbWVudCBoYXMgYSB3aGl0ZWxpc3RlZCBhdHRyaWJ1dGVcbiAgICAgICAgZltldl0gPSB0W2V2XSAvLyB1cGRhdGUgZXhpc3RpbmcgZWxlbWVudFxuICAgICAgfSBlbHNlIGlmIChmW2V2XSkgeyAvLyBpZiBleGlzdGluZyBlbGVtZW50IGhhcyBpdCBhbmQgbmV3IG9uZSBkb2VzbnRcbiAgICAgICAgZltldl0gPSB1bmRlZmluZWQgLy8gcmVtb3ZlIGl0IGZyb20gZXhpc3RpbmcgZWxlbWVudFxuICAgICAgfVxuICAgIH1cbiAgICAvLyBjb3B5IHZhbHVlcyBmb3IgZm9ybSBlbGVtZW50c1xuICAgIGlmICgoZi5ub2RlTmFtZSA9PT0gJ0lOUFVUJyAmJiBmLnR5cGUgIT09ICdmaWxlJykgfHwgZi5ub2RlTmFtZSA9PT0gJ1RFWFRBUkVBJyB8fCBmLm5vZGVOYW1lID09PSAnU0VMRUNUJykge1xuICAgICAgaWYgKHQuZ2V0QXR0cmlidXRlKCd2YWx1ZScpID09PSBudWxsKSB0LnZhbHVlID0gZi52YWx1ZVxuICAgIH1cbiAgfVxufVxuIiwidmFyIGRvY3VtZW50ID0gcmVxdWlyZSgnZ2xvYmFsL2RvY3VtZW50JylcbnZhciBoeXBlcnggPSByZXF1aXJlKCdoeXBlcngnKVxuXG52YXIgU1ZHTlMgPSAnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnXG52YXIgQk9PTF9QUk9QUyA9IHtcbiAgYXV0b2ZvY3VzOiAxLFxuICBjaGVja2VkOiAxLFxuICBkZWZhdWx0Y2hlY2tlZDogMSxcbiAgZGlzYWJsZWQ6IDEsXG4gIGZvcm1ub3ZhbGlkYXRlOiAxLFxuICBpbmRldGVybWluYXRlOiAxLFxuICByZWFkb25seTogMSxcbiAgcmVxdWlyZWQ6IDEsXG4gIHdpbGx2YWxpZGF0ZTogMVxufVxudmFyIFNWR19UQUdTID0gW1xuICAnc3ZnJyxcbiAgJ2FsdEdseXBoJywgJ2FsdEdseXBoRGVmJywgJ2FsdEdseXBoSXRlbScsICdhbmltYXRlJywgJ2FuaW1hdGVDb2xvcicsXG4gICdhbmltYXRlTW90aW9uJywgJ2FuaW1hdGVUcmFuc2Zvcm0nLCAnY2lyY2xlJywgJ2NsaXBQYXRoJywgJ2NvbG9yLXByb2ZpbGUnLFxuICAnY3Vyc29yJywgJ2RlZnMnLCAnZGVzYycsICdlbGxpcHNlJywgJ2ZlQmxlbmQnLCAnZmVDb2xvck1hdHJpeCcsXG4gICdmZUNvbXBvbmVudFRyYW5zZmVyJywgJ2ZlQ29tcG9zaXRlJywgJ2ZlQ29udm9sdmVNYXRyaXgnLCAnZmVEaWZmdXNlTGlnaHRpbmcnLFxuICAnZmVEaXNwbGFjZW1lbnRNYXAnLCAnZmVEaXN0YW50TGlnaHQnLCAnZmVGbG9vZCcsICdmZUZ1bmNBJywgJ2ZlRnVuY0InLFxuICAnZmVGdW5jRycsICdmZUZ1bmNSJywgJ2ZlR2F1c3NpYW5CbHVyJywgJ2ZlSW1hZ2UnLCAnZmVNZXJnZScsICdmZU1lcmdlTm9kZScsXG4gICdmZU1vcnBob2xvZ3knLCAnZmVPZmZzZXQnLCAnZmVQb2ludExpZ2h0JywgJ2ZlU3BlY3VsYXJMaWdodGluZycsXG4gICdmZVNwb3RMaWdodCcsICdmZVRpbGUnLCAnZmVUdXJidWxlbmNlJywgJ2ZpbHRlcicsICdmb250JywgJ2ZvbnQtZmFjZScsXG4gICdmb250LWZhY2UtZm9ybWF0JywgJ2ZvbnQtZmFjZS1uYW1lJywgJ2ZvbnQtZmFjZS1zcmMnLCAnZm9udC1mYWNlLXVyaScsXG4gICdmb3JlaWduT2JqZWN0JywgJ2cnLCAnZ2x5cGgnLCAnZ2x5cGhSZWYnLCAnaGtlcm4nLCAnaW1hZ2UnLCAnbGluZScsXG4gICdsaW5lYXJHcmFkaWVudCcsICdtYXJrZXInLCAnbWFzaycsICdtZXRhZGF0YScsICdtaXNzaW5nLWdseXBoJywgJ21wYXRoJyxcbiAgJ3BhdGgnLCAncGF0dGVybicsICdwb2x5Z29uJywgJ3BvbHlsaW5lJywgJ3JhZGlhbEdyYWRpZW50JywgJ3JlY3QnLFxuICAnc2V0JywgJ3N0b3AnLCAnc3dpdGNoJywgJ3N5bWJvbCcsICd0ZXh0JywgJ3RleHRQYXRoJywgJ3RpdGxlJywgJ3RyZWYnLFxuICAndHNwYW4nLCAndXNlJywgJ3ZpZXcnLCAndmtlcm4nXG5dXG5cbmZ1bmN0aW9uIGJlbENyZWF0ZUVsZW1lbnQgKHRhZywgcHJvcHMsIGNoaWxkcmVuKSB7XG4gIHZhciBlbFxuXG4gIC8vIElmIGFuIHN2ZyB0YWcsIGl0IG5lZWRzIGEgbmFtZXNwYWNlXG4gIGlmIChTVkdfVEFHUy5pbmRleE9mKHRhZykgIT09IC0xKSB7XG4gICAgcHJvcHMubmFtZXNwYWNlID0gU1ZHTlNcbiAgfVxuXG4gIC8vIElmIHdlIGFyZSB1c2luZyBhIG5hbWVzcGFjZVxuICB2YXIgbnMgPSBmYWxzZVxuICBpZiAocHJvcHMubmFtZXNwYWNlKSB7XG4gICAgbnMgPSBwcm9wcy5uYW1lc3BhY2VcbiAgICBkZWxldGUgcHJvcHMubmFtZXNwYWNlXG4gIH1cblxuICAvLyBDcmVhdGUgdGhlIGVsZW1lbnRcbiAgaWYgKG5zKSB7XG4gICAgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMobnMsIHRhZylcbiAgfSBlbHNlIHtcbiAgICBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnKVxuICB9XG5cbiAgLy8gQ3JlYXRlIHRoZSBwcm9wZXJ0aWVzXG4gIGZvciAodmFyIHAgaW4gcHJvcHMpIHtcbiAgICBpZiAocHJvcHMuaGFzT3duUHJvcGVydHkocCkpIHtcbiAgICAgIHZhciBrZXkgPSBwLnRvTG93ZXJDYXNlKClcbiAgICAgIHZhciB2YWwgPSBwcm9wc1twXVxuICAgICAgLy8gTm9ybWFsaXplIGNsYXNzTmFtZVxuICAgICAgaWYgKGtleSA9PT0gJ2NsYXNzbmFtZScpIHtcbiAgICAgICAga2V5ID0gJ2NsYXNzJ1xuICAgICAgICBwID0gJ2NsYXNzJ1xuICAgICAgfVxuICAgICAgLy8gVGhlIGZvciBhdHRyaWJ1dGUgZ2V0cyB0cmFuc2Zvcm1lZCB0byBodG1sRm9yLCBidXQgd2UganVzdCBzZXQgYXMgZm9yXG4gICAgICBpZiAocCA9PT0gJ2h0bWxGb3InKSB7XG4gICAgICAgIHAgPSAnZm9yJ1xuICAgICAgfVxuICAgICAgLy8gSWYgYSBwcm9wZXJ0eSBpcyBib29sZWFuLCBzZXQgaXRzZWxmIHRvIHRoZSBrZXlcbiAgICAgIGlmIChCT09MX1BST1BTW2tleV0pIHtcbiAgICAgICAgaWYgKHZhbCA9PT0gJ3RydWUnKSB2YWwgPSBrZXlcbiAgICAgICAgZWxzZSBpZiAodmFsID09PSAnZmFsc2UnKSBjb250aW51ZVxuICAgICAgfVxuICAgICAgLy8gSWYgYSBwcm9wZXJ0eSBwcmVmZXJzIGJlaW5nIHNldCBkaXJlY3RseSB2cyBzZXRBdHRyaWJ1dGVcbiAgICAgIGlmIChrZXkuc2xpY2UoMCwgMikgPT09ICdvbicpIHtcbiAgICAgICAgZWxbcF0gPSB2YWxcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChucykge1xuICAgICAgICAgIGVsLnNldEF0dHJpYnV0ZU5TKG51bGwsIHAsIHZhbClcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBlbC5zZXRBdHRyaWJ1dGUocCwgdmFsKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gYXBwZW5kQ2hpbGQgKGNoaWxkcykge1xuICAgIGlmICghQXJyYXkuaXNBcnJheShjaGlsZHMpKSByZXR1cm5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNoaWxkcy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIG5vZGUgPSBjaGlsZHNbaV1cbiAgICAgIGlmIChBcnJheS5pc0FycmF5KG5vZGUpKSB7XG4gICAgICAgIGFwcGVuZENoaWxkKG5vZGUpXG4gICAgICAgIGNvbnRpbnVlXG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2Ygbm9kZSA9PT0gJ251bWJlcicgfHxcbiAgICAgICAgdHlwZW9mIG5vZGUgPT09ICdib29sZWFuJyB8fFxuICAgICAgICBub2RlIGluc3RhbmNlb2YgRGF0ZSB8fFxuICAgICAgICBub2RlIGluc3RhbmNlb2YgUmVnRXhwKSB7XG4gICAgICAgIG5vZGUgPSBub2RlLnRvU3RyaW5nKClcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiBub2RlID09PSAnc3RyaW5nJykge1xuICAgICAgICBpZiAoZWwubGFzdENoaWxkICYmIGVsLmxhc3RDaGlsZC5ub2RlTmFtZSA9PT0gJyN0ZXh0Jykge1xuICAgICAgICAgIGVsLmxhc3RDaGlsZC5ub2RlVmFsdWUgKz0gbm9kZVxuICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgIH1cbiAgICAgICAgbm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKG5vZGUpXG4gICAgICB9XG5cbiAgICAgIGlmIChub2RlICYmIG5vZGUubm9kZVR5cGUpIHtcbiAgICAgICAgZWwuYXBwZW5kQ2hpbGQobm9kZSlcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgYXBwZW5kQ2hpbGQoY2hpbGRyZW4pXG5cbiAgcmV0dXJuIGVsXG59XG5cbm1vZHVsZS5leHBvcnRzID0gaHlwZXJ4KGJlbENyZWF0ZUVsZW1lbnQpXG5tb2R1bGUuZXhwb3J0cy5jcmVhdGVFbGVtZW50ID0gYmVsQ3JlYXRlRWxlbWVudFxuIiwidmFyIGF0dHJUb1Byb3AgPSByZXF1aXJlKCdoeXBlcnNjcmlwdC1hdHRyaWJ1dGUtdG8tcHJvcGVydHknKVxuXG52YXIgVkFSID0gMCwgVEVYVCA9IDEsIE9QRU4gPSAyLCBDTE9TRSA9IDMsIEFUVFIgPSA0XG52YXIgQVRUUl9LRVkgPSA1LCBBVFRSX0tFWV9XID0gNlxudmFyIEFUVFJfVkFMVUVfVyA9IDcsIEFUVFJfVkFMVUUgPSA4XG52YXIgQVRUUl9WQUxVRV9TUSA9IDksIEFUVFJfVkFMVUVfRFEgPSAxMFxudmFyIEFUVFJfRVEgPSAxMSwgQVRUUl9CUkVBSyA9IDEyXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGgsIG9wdHMpIHtcbiAgaCA9IGF0dHJUb1Byb3AoaClcbiAgaWYgKCFvcHRzKSBvcHRzID0ge31cbiAgdmFyIGNvbmNhdCA9IG9wdHMuY29uY2F0IHx8IGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgcmV0dXJuIFN0cmluZyhhKSArIFN0cmluZyhiKVxuICB9XG5cbiAgcmV0dXJuIGZ1bmN0aW9uIChzdHJpbmdzKSB7XG4gICAgdmFyIHN0YXRlID0gVEVYVCwgcmVnID0gJydcbiAgICB2YXIgYXJnbGVuID0gYXJndW1lbnRzLmxlbmd0aFxuICAgIHZhciBwYXJ0cyA9IFtdXG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHN0cmluZ3MubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChpIDwgYXJnbGVuIC0gMSkge1xuICAgICAgICB2YXIgYXJnID0gYXJndW1lbnRzW2krMV1cbiAgICAgICAgdmFyIHAgPSBwYXJzZShzdHJpbmdzW2ldKVxuICAgICAgICB2YXIgeHN0YXRlID0gc3RhdGVcbiAgICAgICAgaWYgKHhzdGF0ZSA9PT0gQVRUUl9WQUxVRV9EUSkgeHN0YXRlID0gQVRUUl9WQUxVRVxuICAgICAgICBpZiAoeHN0YXRlID09PSBBVFRSX1ZBTFVFX1NRKSB4c3RhdGUgPSBBVFRSX1ZBTFVFXG4gICAgICAgIGlmICh4c3RhdGUgPT09IEFUVFJfVkFMVUVfVykgeHN0YXRlID0gQVRUUl9WQUxVRVxuICAgICAgICBpZiAoeHN0YXRlID09PSBBVFRSKSB4c3RhdGUgPSBBVFRSX0tFWVxuICAgICAgICBwLnB1c2goWyBWQVIsIHhzdGF0ZSwgYXJnIF0pXG4gICAgICAgIHBhcnRzLnB1c2guYXBwbHkocGFydHMsIHApXG4gICAgICB9IGVsc2UgcGFydHMucHVzaC5hcHBseShwYXJ0cywgcGFyc2Uoc3RyaW5nc1tpXSkpXG4gICAgfVxuXG4gICAgdmFyIHRyZWUgPSBbbnVsbCx7fSxbXV1cbiAgICB2YXIgc3RhY2sgPSBbW3RyZWUsLTFdXVxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcGFydHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBjdXIgPSBzdGFja1tzdGFjay5sZW5ndGgtMV1bMF1cbiAgICAgIHZhciBwID0gcGFydHNbaV0sIHMgPSBwWzBdXG4gICAgICBpZiAocyA9PT0gT1BFTiAmJiAvXlxcLy8udGVzdChwWzFdKSkge1xuICAgICAgICB2YXIgaXggPSBzdGFja1tzdGFjay5sZW5ndGgtMV1bMV1cbiAgICAgICAgaWYgKHN0YWNrLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICBzdGFjay5wb3AoKVxuICAgICAgICAgIHN0YWNrW3N0YWNrLmxlbmd0aC0xXVswXVsyXVtpeF0gPSBoKFxuICAgICAgICAgICAgY3VyWzBdLCBjdXJbMV0sIGN1clsyXS5sZW5ndGggPyBjdXJbMl0gOiB1bmRlZmluZWRcbiAgICAgICAgICApXG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAocyA9PT0gT1BFTikge1xuICAgICAgICB2YXIgYyA9IFtwWzFdLHt9LFtdXVxuICAgICAgICBjdXJbMl0ucHVzaChjKVxuICAgICAgICBzdGFjay5wdXNoKFtjLGN1clsyXS5sZW5ndGgtMV0pXG4gICAgICB9IGVsc2UgaWYgKHMgPT09IEFUVFJfS0VZIHx8IChzID09PSBWQVIgJiYgcFsxXSA9PT0gQVRUUl9LRVkpKSB7XG4gICAgICAgIHZhciBrZXkgPSAnJ1xuICAgICAgICB2YXIgY29weUtleVxuICAgICAgICBmb3IgKDsgaSA8IHBhcnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgaWYgKHBhcnRzW2ldWzBdID09PSBBVFRSX0tFWSkge1xuICAgICAgICAgICAga2V5ID0gY29uY2F0KGtleSwgcGFydHNbaV1bMV0pXG4gICAgICAgICAgfSBlbHNlIGlmIChwYXJ0c1tpXVswXSA9PT0gVkFSICYmIHBhcnRzW2ldWzFdID09PSBBVFRSX0tFWSkge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBwYXJ0c1tpXVsyXSA9PT0gJ29iamVjdCcgJiYgIWtleSkge1xuICAgICAgICAgICAgICBmb3IgKGNvcHlLZXkgaW4gcGFydHNbaV1bMl0pIHtcbiAgICAgICAgICAgICAgICBpZiAocGFydHNbaV1bMl0uaGFzT3duUHJvcGVydHkoY29weUtleSkgJiYgIWN1clsxXVtjb3B5S2V5XSkge1xuICAgICAgICAgICAgICAgICAgY3VyWzFdW2NvcHlLZXldID0gcGFydHNbaV1bMl1bY29weUtleV1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGtleSA9IGNvbmNhdChrZXksIHBhcnRzW2ldWzJdKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSBicmVha1xuICAgICAgICB9XG4gICAgICAgIGlmIChwYXJ0c1tpXVswXSA9PT0gQVRUUl9FUSkgaSsrXG4gICAgICAgIHZhciBqID0gaVxuICAgICAgICBmb3IgKDsgaSA8IHBhcnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgaWYgKHBhcnRzW2ldWzBdID09PSBBVFRSX1ZBTFVFIHx8IHBhcnRzW2ldWzBdID09PSBBVFRSX0tFWSkge1xuICAgICAgICAgICAgaWYgKCFjdXJbMV1ba2V5XSkgY3VyWzFdW2tleV0gPSBzdHJmbihwYXJ0c1tpXVsxXSlcbiAgICAgICAgICAgIGVsc2UgY3VyWzFdW2tleV0gPSBjb25jYXQoY3VyWzFdW2tleV0sIHBhcnRzW2ldWzFdKVxuICAgICAgICAgIH0gZWxzZSBpZiAocGFydHNbaV1bMF0gPT09IFZBUlxuICAgICAgICAgICYmIChwYXJ0c1tpXVsxXSA9PT0gQVRUUl9WQUxVRSB8fCBwYXJ0c1tpXVsxXSA9PT0gQVRUUl9LRVkpKSB7XG4gICAgICAgICAgICBpZiAoIWN1clsxXVtrZXldKSBjdXJbMV1ba2V5XSA9IHN0cmZuKHBhcnRzW2ldWzJdKVxuICAgICAgICAgICAgZWxzZSBjdXJbMV1ba2V5XSA9IGNvbmNhdChjdXJbMV1ba2V5XSwgcGFydHNbaV1bMl0pXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChrZXkubGVuZ3RoICYmICFjdXJbMV1ba2V5XSAmJiBpID09PSBqXG4gICAgICAgICAgICAmJiAocGFydHNbaV1bMF0gPT09IENMT1NFIHx8IHBhcnRzW2ldWzBdID09PSBBVFRSX0JSRUFLKSkge1xuICAgICAgICAgICAgICAvLyBodHRwczovL2h0bWwuc3BlYy53aGF0d2cub3JnL211bHRpcGFnZS9pbmZyYXN0cnVjdHVyZS5odG1sI2Jvb2xlYW4tYXR0cmlidXRlc1xuICAgICAgICAgICAgICAvLyBlbXB0eSBzdHJpbmcgaXMgZmFsc3ksIG5vdCB3ZWxsIGJlaGF2ZWQgdmFsdWUgaW4gYnJvd3NlclxuICAgICAgICAgICAgICBjdXJbMV1ba2V5XSA9IGtleS50b0xvd2VyQ2FzZSgpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVha1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChzID09PSBBVFRSX0tFWSkge1xuICAgICAgICBjdXJbMV1bcFsxXV0gPSB0cnVlXG4gICAgICB9IGVsc2UgaWYgKHMgPT09IFZBUiAmJiBwWzFdID09PSBBVFRSX0tFWSkge1xuICAgICAgICBjdXJbMV1bcFsyXV0gPSB0cnVlXG4gICAgICB9IGVsc2UgaWYgKHMgPT09IENMT1NFKSB7XG4gICAgICAgIGlmIChzZWxmQ2xvc2luZyhjdXJbMF0pICYmIHN0YWNrLmxlbmd0aCkge1xuICAgICAgICAgIHZhciBpeCA9IHN0YWNrW3N0YWNrLmxlbmd0aC0xXVsxXVxuICAgICAgICAgIHN0YWNrLnBvcCgpXG4gICAgICAgICAgc3RhY2tbc3RhY2subGVuZ3RoLTFdWzBdWzJdW2l4XSA9IGgoXG4gICAgICAgICAgICBjdXJbMF0sIGN1clsxXSwgY3VyWzJdLmxlbmd0aCA/IGN1clsyXSA6IHVuZGVmaW5lZFxuICAgICAgICAgIClcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChzID09PSBWQVIgJiYgcFsxXSA9PT0gVEVYVCkge1xuICAgICAgICBpZiAocFsyXSA9PT0gdW5kZWZpbmVkIHx8IHBbMl0gPT09IG51bGwpIHBbMl0gPSAnJ1xuICAgICAgICBlbHNlIGlmICghcFsyXSkgcFsyXSA9IGNvbmNhdCgnJywgcFsyXSlcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkocFsyXVswXSkpIHtcbiAgICAgICAgICBjdXJbMl0ucHVzaC5hcHBseShjdXJbMl0sIHBbMl0pXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY3VyWzJdLnB1c2gocFsyXSlcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChzID09PSBURVhUKSB7XG4gICAgICAgIGN1clsyXS5wdXNoKHBbMV0pXG4gICAgICB9IGVsc2UgaWYgKHMgPT09IEFUVFJfRVEgfHwgcyA9PT0gQVRUUl9CUkVBSykge1xuICAgICAgICAvLyBuby1vcFxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCd1bmhhbmRsZWQ6ICcgKyBzKVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0cmVlWzJdLmxlbmd0aCA+IDEgJiYgL15cXHMqJC8udGVzdCh0cmVlWzJdWzBdKSkge1xuICAgICAgdHJlZVsyXS5zaGlmdCgpXG4gICAgfVxuXG4gICAgaWYgKHRyZWVbMl0ubGVuZ3RoID4gMlxuICAgIHx8ICh0cmVlWzJdLmxlbmd0aCA9PT0gMiAmJiAvXFxTLy50ZXN0KHRyZWVbMl1bMV0pKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAnbXVsdGlwbGUgcm9vdCBlbGVtZW50cyBtdXN0IGJlIHdyYXBwZWQgaW4gYW4gZW5jbG9zaW5nIHRhZydcbiAgICAgIClcbiAgICB9XG4gICAgaWYgKEFycmF5LmlzQXJyYXkodHJlZVsyXVswXSkgJiYgdHlwZW9mIHRyZWVbMl1bMF1bMF0gPT09ICdzdHJpbmcnXG4gICAgJiYgQXJyYXkuaXNBcnJheSh0cmVlWzJdWzBdWzJdKSkge1xuICAgICAgdHJlZVsyXVswXSA9IGgodHJlZVsyXVswXVswXSwgdHJlZVsyXVswXVsxXSwgdHJlZVsyXVswXVsyXSlcbiAgICB9XG4gICAgcmV0dXJuIHRyZWVbMl1bMF1cblxuICAgIGZ1bmN0aW9uIHBhcnNlIChzdHIpIHtcbiAgICAgIHZhciByZXMgPSBbXVxuICAgICAgaWYgKHN0YXRlID09PSBBVFRSX1ZBTFVFX1cpIHN0YXRlID0gQVRUUlxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIGMgPSBzdHIuY2hhckF0KGkpXG4gICAgICAgIGlmIChzdGF0ZSA9PT0gVEVYVCAmJiBjID09PSAnPCcpIHtcbiAgICAgICAgICBpZiAocmVnLmxlbmd0aCkgcmVzLnB1c2goW1RFWFQsIHJlZ10pXG4gICAgICAgICAgcmVnID0gJydcbiAgICAgICAgICBzdGF0ZSA9IE9QRU5cbiAgICAgICAgfSBlbHNlIGlmIChjID09PSAnPicgJiYgIXF1b3Qoc3RhdGUpKSB7XG4gICAgICAgICAgaWYgKHN0YXRlID09PSBPUEVOKSB7XG4gICAgICAgICAgICByZXMucHVzaChbT1BFTixyZWddKVxuICAgICAgICAgIH0gZWxzZSBpZiAoc3RhdGUgPT09IEFUVFJfS0VZKSB7XG4gICAgICAgICAgICByZXMucHVzaChbQVRUUl9LRVkscmVnXSlcbiAgICAgICAgICB9IGVsc2UgaWYgKHN0YXRlID09PSBBVFRSX1ZBTFVFICYmIHJlZy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJlcy5wdXNoKFtBVFRSX1ZBTFVFLHJlZ10pXG4gICAgICAgICAgfVxuICAgICAgICAgIHJlcy5wdXNoKFtDTE9TRV0pXG4gICAgICAgICAgcmVnID0gJydcbiAgICAgICAgICBzdGF0ZSA9IFRFWFRcbiAgICAgICAgfSBlbHNlIGlmIChzdGF0ZSA9PT0gVEVYVCkge1xuICAgICAgICAgIHJlZyArPSBjXG4gICAgICAgIH0gZWxzZSBpZiAoc3RhdGUgPT09IE9QRU4gJiYgL1xccy8udGVzdChjKSkge1xuICAgICAgICAgIHJlcy5wdXNoKFtPUEVOLCByZWddKVxuICAgICAgICAgIHJlZyA9ICcnXG4gICAgICAgICAgc3RhdGUgPSBBVFRSXG4gICAgICAgIH0gZWxzZSBpZiAoc3RhdGUgPT09IE9QRU4pIHtcbiAgICAgICAgICByZWcgKz0gY1xuICAgICAgICB9IGVsc2UgaWYgKHN0YXRlID09PSBBVFRSICYmIC9bXFx3LV0vLnRlc3QoYykpIHtcbiAgICAgICAgICBzdGF0ZSA9IEFUVFJfS0VZXG4gICAgICAgICAgcmVnID0gY1xuICAgICAgICB9IGVsc2UgaWYgKHN0YXRlID09PSBBVFRSICYmIC9cXHMvLnRlc3QoYykpIHtcbiAgICAgICAgICBpZiAocmVnLmxlbmd0aCkgcmVzLnB1c2goW0FUVFJfS0VZLHJlZ10pXG4gICAgICAgICAgcmVzLnB1c2goW0FUVFJfQlJFQUtdKVxuICAgICAgICB9IGVsc2UgaWYgKHN0YXRlID09PSBBVFRSX0tFWSAmJiAvXFxzLy50ZXN0KGMpKSB7XG4gICAgICAgICAgcmVzLnB1c2goW0FUVFJfS0VZLHJlZ10pXG4gICAgICAgICAgcmVnID0gJydcbiAgICAgICAgICBzdGF0ZSA9IEFUVFJfS0VZX1dcbiAgICAgICAgfSBlbHNlIGlmIChzdGF0ZSA9PT0gQVRUUl9LRVkgJiYgYyA9PT0gJz0nKSB7XG4gICAgICAgICAgcmVzLnB1c2goW0FUVFJfS0VZLHJlZ10sW0FUVFJfRVFdKVxuICAgICAgICAgIHJlZyA9ICcnXG4gICAgICAgICAgc3RhdGUgPSBBVFRSX1ZBTFVFX1dcbiAgICAgICAgfSBlbHNlIGlmIChzdGF0ZSA9PT0gQVRUUl9LRVkpIHtcbiAgICAgICAgICByZWcgKz0gY1xuICAgICAgICB9IGVsc2UgaWYgKChzdGF0ZSA9PT0gQVRUUl9LRVlfVyB8fCBzdGF0ZSA9PT0gQVRUUikgJiYgYyA9PT0gJz0nKSB7XG4gICAgICAgICAgcmVzLnB1c2goW0FUVFJfRVFdKVxuICAgICAgICAgIHN0YXRlID0gQVRUUl9WQUxVRV9XXG4gICAgICAgIH0gZWxzZSBpZiAoKHN0YXRlID09PSBBVFRSX0tFWV9XIHx8IHN0YXRlID09PSBBVFRSKSAmJiAhL1xccy8udGVzdChjKSkge1xuICAgICAgICAgIHJlcy5wdXNoKFtBVFRSX0JSRUFLXSlcbiAgICAgICAgICBpZiAoL1tcXHctXS8udGVzdChjKSkge1xuICAgICAgICAgICAgcmVnICs9IGNcbiAgICAgICAgICAgIHN0YXRlID0gQVRUUl9LRVlcbiAgICAgICAgICB9IGVsc2Ugc3RhdGUgPSBBVFRSXG4gICAgICAgIH0gZWxzZSBpZiAoc3RhdGUgPT09IEFUVFJfVkFMVUVfVyAmJiBjID09PSAnXCInKSB7XG4gICAgICAgICAgc3RhdGUgPSBBVFRSX1ZBTFVFX0RRXG4gICAgICAgIH0gZWxzZSBpZiAoc3RhdGUgPT09IEFUVFJfVkFMVUVfVyAmJiBjID09PSBcIidcIikge1xuICAgICAgICAgIHN0YXRlID0gQVRUUl9WQUxVRV9TUVxuICAgICAgICB9IGVsc2UgaWYgKHN0YXRlID09PSBBVFRSX1ZBTFVFX0RRICYmIGMgPT09ICdcIicpIHtcbiAgICAgICAgICByZXMucHVzaChbQVRUUl9WQUxVRSxyZWddLFtBVFRSX0JSRUFLXSlcbiAgICAgICAgICByZWcgPSAnJ1xuICAgICAgICAgIHN0YXRlID0gQVRUUlxuICAgICAgICB9IGVsc2UgaWYgKHN0YXRlID09PSBBVFRSX1ZBTFVFX1NRICYmIGMgPT09IFwiJ1wiKSB7XG4gICAgICAgICAgcmVzLnB1c2goW0FUVFJfVkFMVUUscmVnXSxbQVRUUl9CUkVBS10pXG4gICAgICAgICAgcmVnID0gJydcbiAgICAgICAgICBzdGF0ZSA9IEFUVFJcbiAgICAgICAgfSBlbHNlIGlmIChzdGF0ZSA9PT0gQVRUUl9WQUxVRV9XICYmICEvXFxzLy50ZXN0KGMpKSB7XG4gICAgICAgICAgc3RhdGUgPSBBVFRSX1ZBTFVFXG4gICAgICAgICAgaS0tXG4gICAgICAgIH0gZWxzZSBpZiAoc3RhdGUgPT09IEFUVFJfVkFMVUUgJiYgL1xccy8udGVzdChjKSkge1xuICAgICAgICAgIHJlcy5wdXNoKFtBVFRSX1ZBTFVFLHJlZ10sW0FUVFJfQlJFQUtdKVxuICAgICAgICAgIHJlZyA9ICcnXG4gICAgICAgICAgc3RhdGUgPSBBVFRSXG4gICAgICAgIH0gZWxzZSBpZiAoc3RhdGUgPT09IEFUVFJfVkFMVUUgfHwgc3RhdGUgPT09IEFUVFJfVkFMVUVfU1FcbiAgICAgICAgfHwgc3RhdGUgPT09IEFUVFJfVkFMVUVfRFEpIHtcbiAgICAgICAgICByZWcgKz0gY1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoc3RhdGUgPT09IFRFWFQgJiYgcmVnLmxlbmd0aCkge1xuICAgICAgICByZXMucHVzaChbVEVYVCxyZWddKVxuICAgICAgICByZWcgPSAnJ1xuICAgICAgfSBlbHNlIGlmIChzdGF0ZSA9PT0gQVRUUl9WQUxVRSAmJiByZWcubGVuZ3RoKSB7XG4gICAgICAgIHJlcy5wdXNoKFtBVFRSX1ZBTFVFLHJlZ10pXG4gICAgICAgIHJlZyA9ICcnXG4gICAgICB9IGVsc2UgaWYgKHN0YXRlID09PSBBVFRSX1ZBTFVFX0RRICYmIHJlZy5sZW5ndGgpIHtcbiAgICAgICAgcmVzLnB1c2goW0FUVFJfVkFMVUUscmVnXSlcbiAgICAgICAgcmVnID0gJydcbiAgICAgIH0gZWxzZSBpZiAoc3RhdGUgPT09IEFUVFJfVkFMVUVfU1EgJiYgcmVnLmxlbmd0aCkge1xuICAgICAgICByZXMucHVzaChbQVRUUl9WQUxVRSxyZWddKVxuICAgICAgICByZWcgPSAnJ1xuICAgICAgfSBlbHNlIGlmIChzdGF0ZSA9PT0gQVRUUl9LRVkpIHtcbiAgICAgICAgcmVzLnB1c2goW0FUVFJfS0VZLHJlZ10pXG4gICAgICAgIHJlZyA9ICcnXG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gc3RyZm4gKHgpIHtcbiAgICBpZiAodHlwZW9mIHggPT09ICdmdW5jdGlvbicpIHJldHVybiB4XG4gICAgZWxzZSBpZiAodHlwZW9mIHggPT09ICdzdHJpbmcnKSByZXR1cm4geFxuICAgIGVsc2UgaWYgKHggJiYgdHlwZW9mIHggPT09ICdvYmplY3QnKSByZXR1cm4geFxuICAgIGVsc2UgcmV0dXJuIGNvbmNhdCgnJywgeClcbiAgfVxufVxuXG5mdW5jdGlvbiBxdW90IChzdGF0ZSkge1xuICByZXR1cm4gc3RhdGUgPT09IEFUVFJfVkFMVUVfU1EgfHwgc3RhdGUgPT09IEFUVFJfVkFMVUVfRFFcbn1cblxudmFyIGhhc093biA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHlcbmZ1bmN0aW9uIGhhcyAob2JqLCBrZXkpIHsgcmV0dXJuIGhhc093bi5jYWxsKG9iaiwga2V5KSB9XG5cbnZhciBjbG9zZVJFID0gUmVnRXhwKCdeKCcgKyBbXG4gICdhcmVhJywgJ2Jhc2UnLCAnYmFzZWZvbnQnLCAnYmdzb3VuZCcsICdicicsICdjb2wnLCAnY29tbWFuZCcsICdlbWJlZCcsXG4gICdmcmFtZScsICdocicsICdpbWcnLCAnaW5wdXQnLCAnaXNpbmRleCcsICdrZXlnZW4nLCAnbGluaycsICdtZXRhJywgJ3BhcmFtJyxcbiAgJ3NvdXJjZScsICd0cmFjaycsICd3YnInLFxuICAvLyBTVkcgVEFHU1xuICAnYW5pbWF0ZScsICdhbmltYXRlVHJhbnNmb3JtJywgJ2NpcmNsZScsICdjdXJzb3InLCAnZGVzYycsICdlbGxpcHNlJyxcbiAgJ2ZlQmxlbmQnLCAnZmVDb2xvck1hdHJpeCcsICdmZUNvbXBvbmVudFRyYW5zZmVyJywgJ2ZlQ29tcG9zaXRlJyxcbiAgJ2ZlQ29udm9sdmVNYXRyaXgnLCAnZmVEaWZmdXNlTGlnaHRpbmcnLCAnZmVEaXNwbGFjZW1lbnRNYXAnLFxuICAnZmVEaXN0YW50TGlnaHQnLCAnZmVGbG9vZCcsICdmZUZ1bmNBJywgJ2ZlRnVuY0InLCAnZmVGdW5jRycsICdmZUZ1bmNSJyxcbiAgJ2ZlR2F1c3NpYW5CbHVyJywgJ2ZlSW1hZ2UnLCAnZmVNZXJnZU5vZGUnLCAnZmVNb3JwaG9sb2d5JyxcbiAgJ2ZlT2Zmc2V0JywgJ2ZlUG9pbnRMaWdodCcsICdmZVNwZWN1bGFyTGlnaHRpbmcnLCAnZmVTcG90TGlnaHQnLCAnZmVUaWxlJyxcbiAgJ2ZlVHVyYnVsZW5jZScsICdmb250LWZhY2UtZm9ybWF0JywgJ2ZvbnQtZmFjZS1uYW1lJywgJ2ZvbnQtZmFjZS11cmknLFxuICAnZ2x5cGgnLCAnZ2x5cGhSZWYnLCAnaGtlcm4nLCAnaW1hZ2UnLCAnbGluZScsICdtaXNzaW5nLWdseXBoJywgJ21wYXRoJyxcbiAgJ3BhdGgnLCAncG9seWdvbicsICdwb2x5bGluZScsICdyZWN0JywgJ3NldCcsICdzdG9wJywgJ3RyZWYnLCAndXNlJywgJ3ZpZXcnLFxuICAndmtlcm4nXG5dLmpvaW4oJ3wnKSArICcpKD86W1xcLiNdW2EtekEtWjAtOVxcdTAwN0YtXFx1RkZGRl86LV0rKSokJylcbmZ1bmN0aW9uIHNlbGZDbG9zaW5nICh0YWcpIHsgcmV0dXJuIGNsb3NlUkUudGVzdCh0YWcpIH1cbiIsIm1vZHVsZS5leHBvcnRzID0gYXR0cmlidXRlVG9Qcm9wZXJ0eVxuXG52YXIgdHJhbnNmb3JtID0ge1xuICAnY2xhc3MnOiAnY2xhc3NOYW1lJyxcbiAgJ2Zvcic6ICdodG1sRm9yJyxcbiAgJ2h0dHAtZXF1aXYnOiAnaHR0cEVxdWl2J1xufVxuXG5mdW5jdGlvbiBhdHRyaWJ1dGVUb1Byb3BlcnR5IChoKSB7XG4gIHJldHVybiBmdW5jdGlvbiAodGFnTmFtZSwgYXR0cnMsIGNoaWxkcmVuKSB7XG4gICAgZm9yICh2YXIgYXR0ciBpbiBhdHRycykge1xuICAgICAgaWYgKGF0dHIgaW4gdHJhbnNmb3JtKSB7XG4gICAgICAgIGF0dHJzW3RyYW5zZm9ybVthdHRyXV0gPSBhdHRyc1thdHRyXVxuICAgICAgICBkZWxldGUgYXR0cnNbYXR0cl1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGgodGFnTmFtZSwgYXR0cnMsIGNoaWxkcmVuKVxuICB9XG59XG4iLCIvLyBDcmVhdGUgYSByYW5nZSBvYmplY3QgZm9yIGVmZmljZW50bHkgcmVuZGVyaW5nIHN0cmluZ3MgdG8gZWxlbWVudHMuXG52YXIgcmFuZ2U7XG5cbnZhciB0ZXN0RWwgPSAodHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJykgP1xuICAgIGRvY3VtZW50LmJvZHkgfHwgZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JykgOlxuICAgIHt9O1xuXG52YXIgWEhUTUwgPSAnaHR0cDovL3d3dy53My5vcmcvMTk5OS94aHRtbCc7XG52YXIgRUxFTUVOVF9OT0RFID0gMTtcbnZhciBURVhUX05PREUgPSAzO1xudmFyIENPTU1FTlRfTk9ERSA9IDg7XG5cbi8vIEZpeGVzIDxodHRwczovL2dpdGh1Yi5jb20vcGF0cmljay1zdGVlbGUtaWRlbS9tb3JwaGRvbS9pc3N1ZXMvMzI+XG4vLyAoSUU3KyBzdXBwb3J0KSA8PUlFNyBkb2VzIG5vdCBzdXBwb3J0IGVsLmhhc0F0dHJpYnV0ZShuYW1lKVxudmFyIGhhc0F0dHJpYnV0ZU5TO1xuXG5pZiAodGVzdEVsLmhhc0F0dHJpYnV0ZU5TKSB7XG4gICAgaGFzQXR0cmlidXRlTlMgPSBmdW5jdGlvbihlbCwgbmFtZXNwYWNlVVJJLCBuYW1lKSB7XG4gICAgICAgIHJldHVybiBlbC5oYXNBdHRyaWJ1dGVOUyhuYW1lc3BhY2VVUkksIG5hbWUpO1xuICAgIH07XG59IGVsc2UgaWYgKHRlc3RFbC5oYXNBdHRyaWJ1dGUpIHtcbiAgICBoYXNBdHRyaWJ1dGVOUyA9IGZ1bmN0aW9uKGVsLCBuYW1lc3BhY2VVUkksIG5hbWUpIHtcbiAgICAgICAgcmV0dXJuIGVsLmhhc0F0dHJpYnV0ZShuYW1lKTtcbiAgICB9O1xufSBlbHNlIHtcbiAgICBoYXNBdHRyaWJ1dGVOUyA9IGZ1bmN0aW9uKGVsLCBuYW1lc3BhY2VVUkksIG5hbWUpIHtcbiAgICAgICAgcmV0dXJuICEhZWwuZ2V0QXR0cmlidXRlTm9kZShuYW1lKTtcbiAgICB9O1xufVxuXG5mdW5jdGlvbiBlbXB0eShvKSB7XG4gICAgZm9yICh2YXIgayBpbiBvKSB7XG4gICAgICAgIGlmIChvLmhhc093blByb3BlcnR5KGspKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG59XG5cbmZ1bmN0aW9uIHRvRWxlbWVudChzdHIpIHtcbiAgICBpZiAoIXJhbmdlICYmIGRvY3VtZW50LmNyZWF0ZVJhbmdlKSB7XG4gICAgICAgIHJhbmdlID0gZG9jdW1lbnQuY3JlYXRlUmFuZ2UoKTtcbiAgICAgICAgcmFuZ2Uuc2VsZWN0Tm9kZShkb2N1bWVudC5ib2R5KTtcbiAgICB9XG5cbiAgICB2YXIgZnJhZ21lbnQ7XG4gICAgaWYgKHJhbmdlICYmIHJhbmdlLmNyZWF0ZUNvbnRleHR1YWxGcmFnbWVudCkge1xuICAgICAgICBmcmFnbWVudCA9IHJhbmdlLmNyZWF0ZUNvbnRleHR1YWxGcmFnbWVudChzdHIpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYm9keScpO1xuICAgICAgICBmcmFnbWVudC5pbm5lckhUTUwgPSBzdHI7XG4gICAgfVxuICAgIHJldHVybiBmcmFnbWVudC5jaGlsZE5vZGVzWzBdO1xufVxuXG52YXIgc3BlY2lhbEVsSGFuZGxlcnMgPSB7XG4gICAgLyoqXG4gICAgICogTmVlZGVkIGZvciBJRS4gQXBwYXJlbnRseSBJRSBkb2Vzbid0IHRoaW5rIHRoYXQgXCJzZWxlY3RlZFwiIGlzIGFuXG4gICAgICogYXR0cmlidXRlIHdoZW4gcmVhZGluZyBvdmVyIHRoZSBhdHRyaWJ1dGVzIHVzaW5nIHNlbGVjdEVsLmF0dHJpYnV0ZXNcbiAgICAgKi9cbiAgICBPUFRJT046IGZ1bmN0aW9uKGZyb21FbCwgdG9FbCkge1xuICAgICAgICBmcm9tRWwuc2VsZWN0ZWQgPSB0b0VsLnNlbGVjdGVkO1xuICAgICAgICBpZiAoZnJvbUVsLnNlbGVjdGVkKSB7XG4gICAgICAgICAgICBmcm9tRWwuc2V0QXR0cmlidXRlKCdzZWxlY3RlZCcsICcnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGZyb21FbC5yZW1vdmVBdHRyaWJ1dGUoJ3NlbGVjdGVkJywgJycpO1xuICAgICAgICB9XG4gICAgfSxcbiAgICAvKipcbiAgICAgKiBUaGUgXCJ2YWx1ZVwiIGF0dHJpYnV0ZSBpcyBzcGVjaWFsIGZvciB0aGUgPGlucHV0PiBlbGVtZW50IHNpbmNlIGl0IHNldHNcbiAgICAgKiB0aGUgaW5pdGlhbCB2YWx1ZS4gQ2hhbmdpbmcgdGhlIFwidmFsdWVcIiBhdHRyaWJ1dGUgd2l0aG91dCBjaGFuZ2luZyB0aGVcbiAgICAgKiBcInZhbHVlXCIgcHJvcGVydHkgd2lsbCBoYXZlIG5vIGVmZmVjdCBzaW5jZSBpdCBpcyBvbmx5IHVzZWQgdG8gdGhlIHNldCB0aGVcbiAgICAgKiBpbml0aWFsIHZhbHVlLiAgU2ltaWxhciBmb3IgdGhlIFwiY2hlY2tlZFwiIGF0dHJpYnV0ZSwgYW5kIFwiZGlzYWJsZWRcIi5cbiAgICAgKi9cbiAgICBJTlBVVDogZnVuY3Rpb24oZnJvbUVsLCB0b0VsKSB7XG4gICAgICAgIGZyb21FbC5jaGVja2VkID0gdG9FbC5jaGVja2VkO1xuICAgICAgICBpZiAoZnJvbUVsLmNoZWNrZWQpIHtcbiAgICAgICAgICAgIGZyb21FbC5zZXRBdHRyaWJ1dGUoJ2NoZWNrZWQnLCAnJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBmcm9tRWwucmVtb3ZlQXR0cmlidXRlKCdjaGVja2VkJyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZnJvbUVsLnZhbHVlICE9PSB0b0VsLnZhbHVlKSB7XG4gICAgICAgICAgICBmcm9tRWwudmFsdWUgPSB0b0VsLnZhbHVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFoYXNBdHRyaWJ1dGVOUyh0b0VsLCBudWxsLCAndmFsdWUnKSkge1xuICAgICAgICAgICAgZnJvbUVsLnJlbW92ZUF0dHJpYnV0ZSgndmFsdWUnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZyb21FbC5kaXNhYmxlZCA9IHRvRWwuZGlzYWJsZWQ7XG4gICAgICAgIGlmIChmcm9tRWwuZGlzYWJsZWQpIHtcbiAgICAgICAgICAgIGZyb21FbC5zZXRBdHRyaWJ1dGUoJ2Rpc2FibGVkJywgJycpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZnJvbUVsLnJlbW92ZUF0dHJpYnV0ZSgnZGlzYWJsZWQnKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBURVhUQVJFQTogZnVuY3Rpb24oZnJvbUVsLCB0b0VsKSB7XG4gICAgICAgIHZhciBuZXdWYWx1ZSA9IHRvRWwudmFsdWU7XG4gICAgICAgIGlmIChmcm9tRWwudmFsdWUgIT09IG5ld1ZhbHVlKSB7XG4gICAgICAgICAgICBmcm9tRWwudmFsdWUgPSBuZXdWYWx1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChmcm9tRWwuZmlyc3RDaGlsZCkge1xuICAgICAgICAgICAgZnJvbUVsLmZpcnN0Q2hpbGQubm9kZVZhbHVlID0gbmV3VmFsdWU7XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG5mdW5jdGlvbiBub29wKCkge31cblxuLyoqXG4gKiBSZXR1cm5zIHRydWUgaWYgdHdvIG5vZGUncyBuYW1lcyBhbmQgbmFtZXNwYWNlIFVSSXMgYXJlIHRoZSBzYW1lLlxuICpcbiAqIEBwYXJhbSB7RWxlbWVudH0gYVxuICogQHBhcmFtIHtFbGVtZW50fSBiXG4gKiBAcmV0dXJuIHtib29sZWFufVxuICovXG52YXIgY29tcGFyZU5vZGVOYW1lcyA9IGZ1bmN0aW9uKGEsIGIpIHtcbiAgICByZXR1cm4gYS5ub2RlTmFtZSA9PT0gYi5ub2RlTmFtZSAmJlxuICAgICAgICAgICBhLm5hbWVzcGFjZVVSSSA9PT0gYi5uYW1lc3BhY2VVUkk7XG59O1xuXG4vKipcbiAqIENyZWF0ZSBhbiBlbGVtZW50LCBvcHRpb25hbGx5IHdpdGggYSBrbm93biBuYW1lc3BhY2UgVVJJLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIHRoZSBlbGVtZW50IG5hbWUsIGUuZy4gJ2Rpdicgb3IgJ3N2ZydcbiAqIEBwYXJhbSB7c3RyaW5nfSBbbmFtZXNwYWNlVVJJXSB0aGUgZWxlbWVudCdzIG5hbWVzcGFjZSBVUkksIGkuZS4gdGhlIHZhbHVlIG9mXG4gKiBpdHMgYHhtbG5zYCBhdHRyaWJ1dGUgb3IgaXRzIGluZmVycmVkIG5hbWVzcGFjZS5cbiAqXG4gKiBAcmV0dXJuIHtFbGVtZW50fVxuICovXG5mdW5jdGlvbiBjcmVhdGVFbGVtZW50TlMobmFtZSwgbmFtZXNwYWNlVVJJKSB7XG4gICAgcmV0dXJuICFuYW1lc3BhY2VVUkkgfHwgbmFtZXNwYWNlVVJJID09PSBYSFRNTCA/XG4gICAgICAgIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQobmFtZSkgOlxuICAgICAgICBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMobmFtZXNwYWNlVVJJLCBuYW1lKTtcbn1cblxuLyoqXG4gKiBMb29wIG92ZXIgYWxsIG9mIHRoZSBhdHRyaWJ1dGVzIG9uIHRoZSB0YXJnZXQgbm9kZSBhbmQgbWFrZSBzdXJlIHRoZSBvcmlnaW5hbFxuICogRE9NIG5vZGUgaGFzIHRoZSBzYW1lIGF0dHJpYnV0ZXMuIElmIGFuIGF0dHJpYnV0ZSBmb3VuZCBvbiB0aGUgb3JpZ2luYWwgbm9kZVxuICogaXMgbm90IG9uIHRoZSBuZXcgbm9kZSB0aGVuIHJlbW92ZSBpdCBmcm9tIHRoZSBvcmlnaW5hbCBub2RlLlxuICpcbiAqIEBwYXJhbSAge0VsZW1lbnR9IGZyb21Ob2RlXG4gKiBAcGFyYW0gIHtFbGVtZW50fSB0b05vZGVcbiAqL1xuZnVuY3Rpb24gbW9ycGhBdHRycyhmcm9tTm9kZSwgdG9Ob2RlKSB7XG4gICAgdmFyIGF0dHJzID0gdG9Ob2RlLmF0dHJpYnV0ZXM7XG4gICAgdmFyIGk7XG4gICAgdmFyIGF0dHI7XG4gICAgdmFyIGF0dHJOYW1lO1xuICAgIHZhciBhdHRyTmFtZXNwYWNlVVJJO1xuICAgIHZhciBhdHRyVmFsdWU7XG4gICAgdmFyIGZyb21WYWx1ZTtcblxuICAgIGZvciAoaSA9IGF0dHJzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgIGF0dHIgPSBhdHRyc1tpXTtcbiAgICAgICAgYXR0ck5hbWUgPSBhdHRyLm5hbWU7XG4gICAgICAgIGF0dHJWYWx1ZSA9IGF0dHIudmFsdWU7XG4gICAgICAgIGF0dHJOYW1lc3BhY2VVUkkgPSBhdHRyLm5hbWVzcGFjZVVSSTtcblxuICAgICAgICBpZiAoYXR0ck5hbWVzcGFjZVVSSSkge1xuICAgICAgICAgICAgYXR0ck5hbWUgPSBhdHRyLmxvY2FsTmFtZSB8fCBhdHRyTmFtZTtcbiAgICAgICAgICAgIGZyb21WYWx1ZSA9IGZyb21Ob2RlLmdldEF0dHJpYnV0ZU5TKGF0dHJOYW1lc3BhY2VVUkksIGF0dHJOYW1lKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGZyb21WYWx1ZSA9IGZyb21Ob2RlLmdldEF0dHJpYnV0ZShhdHRyTmFtZSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZnJvbVZhbHVlICE9PSBhdHRyVmFsdWUpIHtcbiAgICAgICAgICAgIGlmIChhdHRyTmFtZXNwYWNlVVJJKSB7XG4gICAgICAgICAgICAgICAgZnJvbU5vZGUuc2V0QXR0cmlidXRlTlMoYXR0ck5hbWVzcGFjZVVSSSwgYXR0ck5hbWUsIGF0dHJWYWx1ZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGZyb21Ob2RlLnNldEF0dHJpYnV0ZShhdHRyTmFtZSwgYXR0clZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIFJlbW92ZSBhbnkgZXh0cmEgYXR0cmlidXRlcyBmb3VuZCBvbiB0aGUgb3JpZ2luYWwgRE9NIGVsZW1lbnQgdGhhdFxuICAgIC8vIHdlcmVuJ3QgZm91bmQgb24gdGhlIHRhcmdldCBlbGVtZW50LlxuICAgIGF0dHJzID0gZnJvbU5vZGUuYXR0cmlidXRlcztcblxuICAgIGZvciAoaSA9IGF0dHJzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgIGF0dHIgPSBhdHRyc1tpXTtcbiAgICAgICAgaWYgKGF0dHIuc3BlY2lmaWVkICE9PSBmYWxzZSkge1xuICAgICAgICAgICAgYXR0ck5hbWUgPSBhdHRyLm5hbWU7XG4gICAgICAgICAgICBhdHRyTmFtZXNwYWNlVVJJID0gYXR0ci5uYW1lc3BhY2VVUkk7XG5cbiAgICAgICAgICAgIGlmICghaGFzQXR0cmlidXRlTlModG9Ob2RlLCBhdHRyTmFtZXNwYWNlVVJJLCBhdHRyTmFtZXNwYWNlVVJJID8gYXR0ck5hbWUgPSBhdHRyLmxvY2FsTmFtZSB8fCBhdHRyTmFtZSA6IGF0dHJOYW1lKSkge1xuICAgICAgICAgICAgICAgIGZyb21Ob2RlLnJlbW92ZUF0dHJpYnV0ZU5vZGUoYXR0cik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5cbi8qKlxuICogQ29waWVzIHRoZSBjaGlsZHJlbiBvZiBvbmUgRE9NIGVsZW1lbnQgdG8gYW5vdGhlciBET00gZWxlbWVudFxuICovXG5mdW5jdGlvbiBtb3ZlQ2hpbGRyZW4oZnJvbUVsLCB0b0VsKSB7XG4gICAgdmFyIGN1ckNoaWxkID0gZnJvbUVsLmZpcnN0Q2hpbGQ7XG4gICAgd2hpbGUgKGN1ckNoaWxkKSB7XG4gICAgICAgIHZhciBuZXh0Q2hpbGQgPSBjdXJDaGlsZC5uZXh0U2libGluZztcbiAgICAgICAgdG9FbC5hcHBlbmRDaGlsZChjdXJDaGlsZCk7XG4gICAgICAgIGN1ckNoaWxkID0gbmV4dENoaWxkO1xuICAgIH1cbiAgICByZXR1cm4gdG9FbDtcbn1cblxuZnVuY3Rpb24gZGVmYXVsdEdldE5vZGVLZXkobm9kZSkge1xuICAgIHJldHVybiBub2RlLmlkO1xufVxuXG5mdW5jdGlvbiBtb3JwaGRvbShmcm9tTm9kZSwgdG9Ob2RlLCBvcHRpb25zKSB7XG4gICAgaWYgKCFvcHRpb25zKSB7XG4gICAgICAgIG9wdGlvbnMgPSB7fTtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIHRvTm9kZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgaWYgKGZyb21Ob2RlLm5vZGVOYW1lID09PSAnI2RvY3VtZW50JyB8fCBmcm9tTm9kZS5ub2RlTmFtZSA9PT0gJ0hUTUwnKSB7XG4gICAgICAgICAgICB2YXIgdG9Ob2RlSHRtbCA9IHRvTm9kZTtcbiAgICAgICAgICAgIHRvTm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2h0bWwnKTtcbiAgICAgICAgICAgIHRvTm9kZS5pbm5lckhUTUwgPSB0b05vZGVIdG1sO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdG9Ob2RlID0gdG9FbGVtZW50KHRvTm9kZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBYWFggb3B0aW1pemF0aW9uOiBpZiB0aGUgbm9kZXMgYXJlIGVxdWFsLCBkb24ndCBtb3JwaCB0aGVtXG4gICAgLypcbiAgICBpZiAoZnJvbU5vZGUuaXNFcXVhbE5vZGUodG9Ob2RlKSkge1xuICAgICAgcmV0dXJuIGZyb21Ob2RlO1xuICAgIH1cbiAgICAqL1xuXG4gICAgdmFyIHNhdmVkRWxzID0ge307IC8vIFVzZWQgdG8gc2F2ZSBvZmYgRE9NIGVsZW1lbnRzIHdpdGggSURzXG4gICAgdmFyIHVubWF0Y2hlZEVscyA9IHt9O1xuICAgIHZhciBnZXROb2RlS2V5ID0gb3B0aW9ucy5nZXROb2RlS2V5IHx8IGRlZmF1bHRHZXROb2RlS2V5O1xuICAgIHZhciBvbkJlZm9yZU5vZGVBZGRlZCA9IG9wdGlvbnMub25CZWZvcmVOb2RlQWRkZWQgfHwgbm9vcDtcbiAgICB2YXIgb25Ob2RlQWRkZWQgPSBvcHRpb25zLm9uTm9kZUFkZGVkIHx8IG5vb3A7XG4gICAgdmFyIG9uQmVmb3JlRWxVcGRhdGVkID0gb3B0aW9ucy5vbkJlZm9yZUVsVXBkYXRlZCB8fCBvcHRpb25zLm9uQmVmb3JlTW9ycGhFbCB8fCBub29wO1xuICAgIHZhciBvbkVsVXBkYXRlZCA9IG9wdGlvbnMub25FbFVwZGF0ZWQgfHwgbm9vcDtcbiAgICB2YXIgb25CZWZvcmVOb2RlRGlzY2FyZGVkID0gb3B0aW9ucy5vbkJlZm9yZU5vZGVEaXNjYXJkZWQgfHwgbm9vcDtcbiAgICB2YXIgb25Ob2RlRGlzY2FyZGVkID0gb3B0aW9ucy5vbk5vZGVEaXNjYXJkZWQgfHwgbm9vcDtcbiAgICB2YXIgb25CZWZvcmVFbENoaWxkcmVuVXBkYXRlZCA9IG9wdGlvbnMub25CZWZvcmVFbENoaWxkcmVuVXBkYXRlZCB8fCBvcHRpb25zLm9uQmVmb3JlTW9ycGhFbENoaWxkcmVuIHx8IG5vb3A7XG4gICAgdmFyIGNoaWxkcmVuT25seSA9IG9wdGlvbnMuY2hpbGRyZW5Pbmx5ID09PSB0cnVlO1xuICAgIHZhciBtb3ZlZEVscyA9IFtdO1xuXG4gICAgZnVuY3Rpb24gcmVtb3ZlTm9kZUhlbHBlcihub2RlLCBuZXN0ZWRJblNhdmVkRWwpIHtcbiAgICAgICAgdmFyIGlkID0gZ2V0Tm9kZUtleShub2RlKTtcbiAgICAgICAgLy8gSWYgdGhlIG5vZGUgaGFzIGFuIElEIHRoZW4gc2F2ZSBpdCBvZmYgc2luY2Ugd2Ugd2lsbCB3YW50XG4gICAgICAgIC8vIHRvIHJldXNlIGl0IGluIGNhc2UgdGhlIHRhcmdldCBET00gdHJlZSBoYXMgYSBET00gZWxlbWVudFxuICAgICAgICAvLyB3aXRoIHRoZSBzYW1lIElEXG4gICAgICAgIGlmIChpZCkge1xuICAgICAgICAgICAgc2F2ZWRFbHNbaWRdID0gbm9kZTtcbiAgICAgICAgfSBlbHNlIGlmICghbmVzdGVkSW5TYXZlZEVsKSB7XG4gICAgICAgICAgICAvLyBJZiB3ZSBhcmUgbm90IG5lc3RlZCBpbiBhIHNhdmVkIGVsZW1lbnQgdGhlbiB3ZSBrbm93IHRoYXQgdGhpcyBub2RlIGhhcyBiZWVuXG4gICAgICAgICAgICAvLyBjb21wbGV0ZWx5IGRpc2NhcmRlZCBhbmQgd2lsbCBub3QgZXhpc3QgaW4gdGhlIGZpbmFsIERPTS5cbiAgICAgICAgICAgIG9uTm9kZURpc2NhcmRlZChub2RlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChub2RlLm5vZGVUeXBlID09PSBFTEVNRU5UX05PREUpIHtcbiAgICAgICAgICAgIHZhciBjdXJDaGlsZCA9IG5vZGUuZmlyc3RDaGlsZDtcbiAgICAgICAgICAgIHdoaWxlIChjdXJDaGlsZCkge1xuICAgICAgICAgICAgICAgIHJlbW92ZU5vZGVIZWxwZXIoY3VyQ2hpbGQsIG5lc3RlZEluU2F2ZWRFbCB8fCBpZCk7XG4gICAgICAgICAgICAgICAgY3VyQ2hpbGQgPSBjdXJDaGlsZC5uZXh0U2libGluZztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHdhbGtEaXNjYXJkZWRDaGlsZE5vZGVzKG5vZGUpIHtcbiAgICAgICAgaWYgKG5vZGUubm9kZVR5cGUgPT09IEVMRU1FTlRfTk9ERSkge1xuICAgICAgICAgICAgdmFyIGN1ckNoaWxkID0gbm9kZS5maXJzdENoaWxkO1xuICAgICAgICAgICAgd2hpbGUgKGN1ckNoaWxkKSB7XG5cblxuICAgICAgICAgICAgICAgIGlmICghZ2V0Tm9kZUtleShjdXJDaGlsZCkpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gV2Ugb25seSB3YW50IHRvIGhhbmRsZSBub2RlcyB0aGF0IGRvbid0IGhhdmUgYW4gSUQgdG8gYXZvaWQgZG91YmxlXG4gICAgICAgICAgICAgICAgICAgIC8vIHdhbGtpbmcgdGhlIHNhbWUgc2F2ZWQgZWxlbWVudC5cblxuICAgICAgICAgICAgICAgICAgICBvbk5vZGVEaXNjYXJkZWQoY3VyQ2hpbGQpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIFdhbGsgcmVjdXJzaXZlbHlcbiAgICAgICAgICAgICAgICAgICAgd2Fsa0Rpc2NhcmRlZENoaWxkTm9kZXMoY3VyQ2hpbGQpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGN1ckNoaWxkID0gY3VyQ2hpbGQubmV4dFNpYmxpbmc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZW1vdmVOb2RlKG5vZGUsIHBhcmVudE5vZGUsIGFscmVhZHlWaXNpdGVkKSB7XG4gICAgICAgIGlmIChvbkJlZm9yZU5vZGVEaXNjYXJkZWQobm9kZSkgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBwYXJlbnROb2RlLnJlbW92ZUNoaWxkKG5vZGUpO1xuICAgICAgICBpZiAoYWxyZWFkeVZpc2l0ZWQpIHtcbiAgICAgICAgICAgIGlmICghZ2V0Tm9kZUtleShub2RlKSkge1xuICAgICAgICAgICAgICAgIG9uTm9kZURpc2NhcmRlZChub2RlKTtcbiAgICAgICAgICAgICAgICB3YWxrRGlzY2FyZGVkQ2hpbGROb2Rlcyhub2RlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlbW92ZU5vZGVIZWxwZXIobm9kZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBtb3JwaEVsKGZyb21FbCwgdG9FbCwgYWxyZWFkeVZpc2l0ZWQsIGNoaWxkcmVuT25seSkge1xuICAgICAgICB2YXIgdG9FbEtleSA9IGdldE5vZGVLZXkodG9FbCk7XG4gICAgICAgIGlmICh0b0VsS2V5KSB7XG4gICAgICAgICAgICAvLyBJZiBhbiBlbGVtZW50IHdpdGggYW4gSUQgaXMgYmVpbmcgbW9ycGhlZCB0aGVuIGl0IGlzIHdpbGwgYmUgaW4gdGhlIGZpbmFsXG4gICAgICAgICAgICAvLyBET00gc28gY2xlYXIgaXQgb3V0IG9mIHRoZSBzYXZlZCBlbGVtZW50cyBjb2xsZWN0aW9uXG4gICAgICAgICAgICBkZWxldGUgc2F2ZWRFbHNbdG9FbEtleV07XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIWNoaWxkcmVuT25seSkge1xuICAgICAgICAgICAgaWYgKG9uQmVmb3JlRWxVcGRhdGVkKGZyb21FbCwgdG9FbCkgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBtb3JwaEF0dHJzKGZyb21FbCwgdG9FbCk7XG4gICAgICAgICAgICBvbkVsVXBkYXRlZChmcm9tRWwpO1xuXG4gICAgICAgICAgICBpZiAob25CZWZvcmVFbENoaWxkcmVuVXBkYXRlZChmcm9tRWwsIHRvRWwpID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChmcm9tRWwubm9kZU5hbWUgIT09ICdURVhUQVJFQScpIHtcbiAgICAgICAgICAgIHZhciBjdXJUb05vZGVDaGlsZCA9IHRvRWwuZmlyc3RDaGlsZDtcbiAgICAgICAgICAgIHZhciBjdXJGcm9tTm9kZUNoaWxkID0gZnJvbUVsLmZpcnN0Q2hpbGQ7XG4gICAgICAgICAgICB2YXIgY3VyVG9Ob2RlSWQ7XG5cbiAgICAgICAgICAgIHZhciBmcm9tTmV4dFNpYmxpbmc7XG4gICAgICAgICAgICB2YXIgdG9OZXh0U2libGluZztcbiAgICAgICAgICAgIHZhciBzYXZlZEVsO1xuICAgICAgICAgICAgdmFyIHVubWF0Y2hlZEVsO1xuXG4gICAgICAgICAgICBvdXRlcjogd2hpbGUgKGN1clRvTm9kZUNoaWxkKSB7XG4gICAgICAgICAgICAgICAgdG9OZXh0U2libGluZyA9IGN1clRvTm9kZUNoaWxkLm5leHRTaWJsaW5nO1xuICAgICAgICAgICAgICAgIGN1clRvTm9kZUlkID0gZ2V0Tm9kZUtleShjdXJUb05vZGVDaGlsZCk7XG5cbiAgICAgICAgICAgICAgICB3aGlsZSAoY3VyRnJvbU5vZGVDaGlsZCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgY3VyRnJvbU5vZGVJZCA9IGdldE5vZGVLZXkoY3VyRnJvbU5vZGVDaGlsZCk7XG4gICAgICAgICAgICAgICAgICAgIGZyb21OZXh0U2libGluZyA9IGN1ckZyb21Ob2RlQ2hpbGQubmV4dFNpYmxpbmc7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKCFhbHJlYWR5VmlzaXRlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGN1ckZyb21Ob2RlSWQgJiYgKHVubWF0Y2hlZEVsID0gdW5tYXRjaGVkRWxzW2N1ckZyb21Ob2RlSWRdKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVubWF0Y2hlZEVsLnBhcmVudE5vZGUucmVwbGFjZUNoaWxkKGN1ckZyb21Ob2RlQ2hpbGQsIHVubWF0Y2hlZEVsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb3JwaEVsKGN1ckZyb21Ob2RlQ2hpbGQsIHVubWF0Y2hlZEVsLCBhbHJlYWR5VmlzaXRlZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VyRnJvbU5vZGVDaGlsZCA9IGZyb21OZXh0U2libGluZztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHZhciBjdXJGcm9tTm9kZVR5cGUgPSBjdXJGcm9tTm9kZUNoaWxkLm5vZGVUeXBlO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChjdXJGcm9tTm9kZVR5cGUgPT09IGN1clRvTm9kZUNoaWxkLm5vZGVUeXBlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgaXNDb21wYXRpYmxlID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEJvdGggbm9kZXMgYmVpbmcgY29tcGFyZWQgYXJlIEVsZW1lbnQgbm9kZXNcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjdXJGcm9tTm9kZVR5cGUgPT09IEVMRU1FTlRfTk9ERSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjb21wYXJlTm9kZU5hbWVzKGN1ckZyb21Ob2RlQ2hpbGQsIGN1clRvTm9kZUNoaWxkKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBXZSBoYXZlIGNvbXBhdGlibGUgRE9NIGVsZW1lbnRzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjdXJGcm9tTm9kZUlkIHx8IGN1clRvTm9kZUlkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBJZiBlaXRoZXIgRE9NIGVsZW1lbnQgaGFzIGFuIElEIHRoZW4gd2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGhhbmRsZSB0aG9zZSBkaWZmZXJlbnRseSBzaW5jZSB3ZSB3YW50IHRvXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBtYXRjaCB1cCBieSBJRFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGN1clRvTm9kZUlkID09PSBjdXJGcm9tTm9kZUlkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNDb21wYXRpYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzQ29tcGF0aWJsZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXNDb21wYXRpYmxlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFdlIGZvdW5kIGNvbXBhdGlibGUgRE9NIGVsZW1lbnRzIHNvIHRyYW5zZm9ybVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB0aGUgY3VycmVudCBcImZyb21cIiBub2RlIHRvIG1hdGNoIHRoZSBjdXJyZW50XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRhcmdldCBET00gbm9kZS5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9ycGhFbChjdXJGcm9tTm9kZUNoaWxkLCBjdXJUb05vZGVDaGlsZCwgYWxyZWFkeVZpc2l0ZWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEJvdGggbm9kZXMgYmVpbmcgY29tcGFyZWQgYXJlIFRleHQgb3IgQ29tbWVudCBub2Rlc1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGN1ckZyb21Ob2RlVHlwZSA9PT0gVEVYVF9OT0RFIHx8IGN1ckZyb21Ob2RlVHlwZSA9PSBDT01NRU5UX05PREUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc0NvbXBhdGlibGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFNpbXBseSB1cGRhdGUgbm9kZVZhbHVlIG9uIHRoZSBvcmlnaW5hbCBub2RlIHRvXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gY2hhbmdlIHRoZSB0ZXh0IHZhbHVlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VyRnJvbU5vZGVDaGlsZC5ub2RlVmFsdWUgPSBjdXJUb05vZGVDaGlsZC5ub2RlVmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpc0NvbXBhdGlibGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJUb05vZGVDaGlsZCA9IHRvTmV4dFNpYmxpbmc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VyRnJvbU5vZGVDaGlsZCA9IGZyb21OZXh0U2libGluZztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZSBvdXRlcjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIC8vIE5vIGNvbXBhdGlibGUgbWF0Y2ggc28gcmVtb3ZlIHRoZSBvbGQgbm9kZSBmcm9tIHRoZSBET01cbiAgICAgICAgICAgICAgICAgICAgLy8gYW5kIGNvbnRpbnVlIHRyeWluZyB0byBmaW5kIGEgbWF0Y2ggaW4gdGhlIG9yaWdpbmFsIERPTVxuICAgICAgICAgICAgICAgICAgICByZW1vdmVOb2RlKGN1ckZyb21Ob2RlQ2hpbGQsIGZyb21FbCwgYWxyZWFkeVZpc2l0ZWQpO1xuICAgICAgICAgICAgICAgICAgICBjdXJGcm9tTm9kZUNoaWxkID0gZnJvbU5leHRTaWJsaW5nO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChjdXJUb05vZGVJZCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoKHNhdmVkRWwgPSBzYXZlZEVsc1tjdXJUb05vZGVJZF0pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBtb3JwaEVsKHNhdmVkRWwsIGN1clRvTm9kZUNoaWxkLCB0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFdlIHdhbnQgdG8gYXBwZW5kIHRoZSBzYXZlZCBlbGVtZW50IGluc3RlYWRcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1clRvTm9kZUNoaWxkID0gc2F2ZWRFbDtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRoZSBjdXJyZW50IERPTSBlbGVtZW50IGluIHRoZSB0YXJnZXQgdHJlZSBoYXMgYW4gSURcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGJ1dCB3ZSBkaWQgbm90IGZpbmQgYSBtYXRjaCBpbiBhbnkgb2YgdGhlXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjb3JyZXNwb25kaW5nIHNpYmxpbmdzLiBXZSBqdXN0IHB1dCB0aGUgdGFyZ2V0XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBlbGVtZW50IGluIHRoZSBvbGQgRE9NIHRyZWUgYnV0IGlmIHdlIGxhdGVyIGZpbmQgYW5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGVsZW1lbnQgaW4gdGhlIG9sZCBET00gdHJlZSB0aGF0IGhhcyBhIG1hdGNoaW5nIElEXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB0aGVuIHdlIHdpbGwgcmVwbGFjZSB0aGUgdGFyZ2V0IGVsZW1lbnQgd2l0aCB0aGVcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvcnJlc3BvbmRpbmcgb2xkIGVsZW1lbnQgYW5kIG1vcnBoIHRoZSBvbGQgZWxlbWVudFxuICAgICAgICAgICAgICAgICAgICAgICAgdW5tYXRjaGVkRWxzW2N1clRvTm9kZUlkXSA9IGN1clRvTm9kZUNoaWxkO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gSWYgd2UgZ290IHRoaXMgZmFyIHRoZW4gd2UgZGlkIG5vdCBmaW5kIGEgY2FuZGlkYXRlIG1hdGNoIGZvclxuICAgICAgICAgICAgICAgIC8vIG91ciBcInRvIG5vZGVcIiBhbmQgd2UgZXhoYXVzdGVkIGFsbCBvZiB0aGUgY2hpbGRyZW4gXCJmcm9tXCJcbiAgICAgICAgICAgICAgICAvLyBub2Rlcy4gVGhlcmVmb3JlLCB3ZSB3aWxsIGp1c3QgYXBwZW5kIHRoZSBjdXJyZW50IFwidG8gbm9kZVwiXG4gICAgICAgICAgICAgICAgLy8gdG8gdGhlIGVuZFxuICAgICAgICAgICAgICAgIGlmIChvbkJlZm9yZU5vZGVBZGRlZChjdXJUb05vZGVDaGlsZCkgIT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgICAgIGZyb21FbC5hcHBlbmRDaGlsZChjdXJUb05vZGVDaGlsZCk7XG4gICAgICAgICAgICAgICAgICAgIG9uTm9kZUFkZGVkKGN1clRvTm9kZUNoaWxkKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoY3VyVG9Ob2RlQ2hpbGQubm9kZVR5cGUgPT09IEVMRU1FTlRfTk9ERSAmJlxuICAgICAgICAgICAgICAgICAgICAoY3VyVG9Ob2RlSWQgfHwgY3VyVG9Ob2RlQ2hpbGQuZmlyc3RDaGlsZCkpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gVGhlIGVsZW1lbnQgdGhhdCB3YXMganVzdCBhZGRlZCB0byB0aGUgb3JpZ2luYWwgRE9NIG1heVxuICAgICAgICAgICAgICAgICAgICAvLyBoYXZlIHNvbWUgbmVzdGVkIGVsZW1lbnRzIHdpdGggYSBrZXkvSUQgdGhhdCBuZWVkcyB0byBiZVxuICAgICAgICAgICAgICAgICAgICAvLyBtYXRjaGVkIHVwIHdpdGggb3RoZXIgZWxlbWVudHMuIFdlJ2xsIGFkZCB0aGUgZWxlbWVudCB0b1xuICAgICAgICAgICAgICAgICAgICAvLyBhIGxpc3Qgc28gdGhhdCB3ZSBjYW4gbGF0ZXIgcHJvY2VzcyB0aGUgbmVzdGVkIGVsZW1lbnRzXG4gICAgICAgICAgICAgICAgICAgIC8vIGlmIHRoZXJlIGFyZSBhbnkgdW5tYXRjaGVkIGtleWVkIGVsZW1lbnRzIHRoYXQgd2VyZVxuICAgICAgICAgICAgICAgICAgICAvLyBkaXNjYXJkZWRcbiAgICAgICAgICAgICAgICAgICAgbW92ZWRFbHMucHVzaChjdXJUb05vZGVDaGlsZCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgY3VyVG9Ob2RlQ2hpbGQgPSB0b05leHRTaWJsaW5nO1xuICAgICAgICAgICAgICAgIGN1ckZyb21Ob2RlQ2hpbGQgPSBmcm9tTmV4dFNpYmxpbmc7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIFdlIGhhdmUgcHJvY2Vzc2VkIGFsbCBvZiB0aGUgXCJ0byBub2Rlc1wiLiBJZiBjdXJGcm9tTm9kZUNoaWxkIGlzXG4gICAgICAgICAgICAvLyBub24tbnVsbCB0aGVuIHdlIHN0aWxsIGhhdmUgc29tZSBmcm9tIG5vZGVzIGxlZnQgb3ZlciB0aGF0IG5lZWRcbiAgICAgICAgICAgIC8vIHRvIGJlIHJlbW92ZWRcbiAgICAgICAgICAgIHdoaWxlIChjdXJGcm9tTm9kZUNoaWxkKSB7XG4gICAgICAgICAgICAgICAgZnJvbU5leHRTaWJsaW5nID0gY3VyRnJvbU5vZGVDaGlsZC5uZXh0U2libGluZztcbiAgICAgICAgICAgICAgICByZW1vdmVOb2RlKGN1ckZyb21Ob2RlQ2hpbGQsIGZyb21FbCwgYWxyZWFkeVZpc2l0ZWQpO1xuICAgICAgICAgICAgICAgIGN1ckZyb21Ob2RlQ2hpbGQgPSBmcm9tTmV4dFNpYmxpbmc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgc3BlY2lhbEVsSGFuZGxlciA9IHNwZWNpYWxFbEhhbmRsZXJzW2Zyb21FbC5ub2RlTmFtZV07XG4gICAgICAgIGlmIChzcGVjaWFsRWxIYW5kbGVyKSB7XG4gICAgICAgICAgICBzcGVjaWFsRWxIYW5kbGVyKGZyb21FbCwgdG9FbCk7XG4gICAgICAgIH1cbiAgICB9IC8vIEVORDogbW9ycGhFbCguLi4pXG5cbiAgICB2YXIgbW9ycGhlZE5vZGUgPSBmcm9tTm9kZTtcbiAgICB2YXIgbW9ycGhlZE5vZGVUeXBlID0gbW9ycGhlZE5vZGUubm9kZVR5cGU7XG4gICAgdmFyIHRvTm9kZVR5cGUgPSB0b05vZGUubm9kZVR5cGU7XG5cbiAgICBpZiAoIWNoaWxkcmVuT25seSkge1xuICAgICAgICAvLyBIYW5kbGUgdGhlIGNhc2Ugd2hlcmUgd2UgYXJlIGdpdmVuIHR3byBET00gbm9kZXMgdGhhdCBhcmUgbm90XG4gICAgICAgIC8vIGNvbXBhdGlibGUgKGUuZy4gPGRpdj4gLS0+IDxzcGFuPiBvciA8ZGl2PiAtLT4gVEVYVClcbiAgICAgICAgaWYgKG1vcnBoZWROb2RlVHlwZSA9PT0gRUxFTUVOVF9OT0RFKSB7XG4gICAgICAgICAgICBpZiAodG9Ob2RlVHlwZSA9PT0gRUxFTUVOVF9OT0RFKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFjb21wYXJlTm9kZU5hbWVzKGZyb21Ob2RlLCB0b05vZGUpKSB7XG4gICAgICAgICAgICAgICAgICAgIG9uTm9kZURpc2NhcmRlZChmcm9tTm9kZSk7XG4gICAgICAgICAgICAgICAgICAgIG1vcnBoZWROb2RlID0gbW92ZUNoaWxkcmVuKGZyb21Ob2RlLCBjcmVhdGVFbGVtZW50TlModG9Ob2RlLm5vZGVOYW1lLCB0b05vZGUubmFtZXNwYWNlVVJJKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBHb2luZyBmcm9tIGFuIGVsZW1lbnQgbm9kZSB0byBhIHRleHQgbm9kZVxuICAgICAgICAgICAgICAgIG1vcnBoZWROb2RlID0gdG9Ob2RlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKG1vcnBoZWROb2RlVHlwZSA9PT0gVEVYVF9OT0RFIHx8IG1vcnBoZWROb2RlVHlwZSA9PT0gQ09NTUVOVF9OT0RFKSB7IC8vIFRleHQgb3IgY29tbWVudCBub2RlXG4gICAgICAgICAgICBpZiAodG9Ob2RlVHlwZSA9PT0gbW9ycGhlZE5vZGVUeXBlKSB7XG4gICAgICAgICAgICAgICAgbW9ycGhlZE5vZGUubm9kZVZhbHVlID0gdG9Ob2RlLm5vZGVWYWx1ZTtcbiAgICAgICAgICAgICAgICByZXR1cm4gbW9ycGhlZE5vZGU7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIFRleHQgbm9kZSB0byBzb21ldGhpbmcgZWxzZVxuICAgICAgICAgICAgICAgIG1vcnBoZWROb2RlID0gdG9Ob2RlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgaWYgKG1vcnBoZWROb2RlID09PSB0b05vZGUpIHtcbiAgICAgICAgLy8gVGhlIFwidG8gbm9kZVwiIHdhcyBub3QgY29tcGF0aWJsZSB3aXRoIHRoZSBcImZyb20gbm9kZVwiIHNvIHdlIGhhZCB0b1xuICAgICAgICAvLyB0b3NzIG91dCB0aGUgXCJmcm9tIG5vZGVcIiBhbmQgdXNlIHRoZSBcInRvIG5vZGVcIlxuICAgICAgICBvbk5vZGVEaXNjYXJkZWQoZnJvbU5vZGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIG1vcnBoRWwobW9ycGhlZE5vZGUsIHRvTm9kZSwgZmFsc2UsIGNoaWxkcmVuT25seSk7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFdoYXQgd2Ugd2lsbCBkbyBoZXJlIGlzIHdhbGsgdGhlIHRyZWUgZm9yIHRoZSBET00gZWxlbWVudCB0aGF0IHdhc1xuICAgICAgICAgKiBtb3ZlZCBmcm9tIHRoZSB0YXJnZXQgRE9NIHRyZWUgdG8gdGhlIG9yaWdpbmFsIERPTSB0cmVlIGFuZCB3ZSB3aWxsXG4gICAgICAgICAqIGxvb2sgZm9yIGtleWVkIGVsZW1lbnRzIHRoYXQgY291bGQgYmUgbWF0Y2hlZCB0byBrZXllZCBlbGVtZW50cyB0aGF0XG4gICAgICAgICAqIHdlcmUgZWFybGllciBkaXNjYXJkZWQuICBJZiB3ZSBmaW5kIGEgbWF0Y2ggdGhlbiB3ZSB3aWxsIG1vdmUgdGhlXG4gICAgICAgICAqIHNhdmVkIGVsZW1lbnQgaW50byB0aGUgZmluYWwgRE9NIHRyZWUuXG4gICAgICAgICAqL1xuICAgICAgICB2YXIgaGFuZGxlTW92ZWRFbCA9IGZ1bmN0aW9uKGVsKSB7XG4gICAgICAgICAgICB2YXIgY3VyQ2hpbGQgPSBlbC5maXJzdENoaWxkO1xuICAgICAgICAgICAgd2hpbGUgKGN1ckNoaWxkKSB7XG4gICAgICAgICAgICAgICAgdmFyIG5leHRTaWJsaW5nID0gY3VyQ2hpbGQubmV4dFNpYmxpbmc7XG5cbiAgICAgICAgICAgICAgICB2YXIga2V5ID0gZ2V0Tm9kZUtleShjdXJDaGlsZCk7XG4gICAgICAgICAgICAgICAgaWYgKGtleSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgc2F2ZWRFbCA9IHNhdmVkRWxzW2tleV07XG4gICAgICAgICAgICAgICAgICAgIGlmIChzYXZlZEVsICYmIGNvbXBhcmVOb2RlTmFtZXMoY3VyQ2hpbGQsIHNhdmVkRWwpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJDaGlsZC5wYXJlbnROb2RlLnJlcGxhY2VDaGlsZChzYXZlZEVsLCBjdXJDaGlsZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB0cnVlOiBhbHJlYWR5IHZpc2l0ZWQgdGhlIHNhdmVkIGVsIHRyZWVcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vcnBoRWwoc2F2ZWRFbCwgY3VyQ2hpbGQsIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY3VyQ2hpbGQgPSBuZXh0U2libGluZztcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlbXB0eShzYXZlZEVscykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChjdXJDaGlsZC5ub2RlVHlwZSA9PT0gRUxFTUVOVF9OT0RFKSB7XG4gICAgICAgICAgICAgICAgICAgIGhhbmRsZU1vdmVkRWwoY3VyQ2hpbGQpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGN1ckNoaWxkID0gbmV4dFNpYmxpbmc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gVGhlIGxvb3AgYmVsb3cgaXMgdXNlZCB0byBwb3NzaWJseSBtYXRjaCB1cCBhbnkgZGlzY2FyZGVkXG4gICAgICAgIC8vIGVsZW1lbnRzIGluIHRoZSBvcmlnaW5hbCBET00gdHJlZSB3aXRoIGVsZW1lbmV0cyBmcm9tIHRoZVxuICAgICAgICAvLyB0YXJnZXQgdHJlZSB0aGF0IHdlcmUgbW92ZWQgb3ZlciB3aXRob3V0IHZpc2l0aW5nIHRoZWlyXG4gICAgICAgIC8vIGNoaWxkcmVuXG4gICAgICAgIGlmICghZW1wdHkoc2F2ZWRFbHMpKSB7XG4gICAgICAgICAgICBoYW5kbGVNb3ZlZEVsc0xvb3A6XG4gICAgICAgICAgICB3aGlsZSAobW92ZWRFbHMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgdmFyIG1vdmVkRWxzVGVtcCA9IG1vdmVkRWxzO1xuICAgICAgICAgICAgICAgIG1vdmVkRWxzID0gW107XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaT0wOyBpPG1vdmVkRWxzVGVtcC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoaGFuZGxlTW92ZWRFbChtb3ZlZEVsc1RlbXBbaV0pID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gVGhlcmUgYXJlIG5vIG1vcmUgdW5tYXRjaGVkIGVsZW1lbnRzIHNvIGNvbXBsZXRlbHkgZW5kXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB0aGUgbG9vcFxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWsgaGFuZGxlTW92ZWRFbHNMb29wO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gRmlyZSB0aGUgXCJvbk5vZGVEaXNjYXJkZWRcIiBldmVudCBmb3IgYW55IHNhdmVkIGVsZW1lbnRzXG4gICAgICAgIC8vIHRoYXQgbmV2ZXIgZm91bmQgYSBuZXcgaG9tZSBpbiB0aGUgbW9ycGhlZCBET01cbiAgICAgICAgZm9yICh2YXIgc2F2ZWRFbElkIGluIHNhdmVkRWxzKSB7XG4gICAgICAgICAgICBpZiAoc2F2ZWRFbHMuaGFzT3duUHJvcGVydHkoc2F2ZWRFbElkKSkge1xuICAgICAgICAgICAgICAgIHZhciBzYXZlZEVsID0gc2F2ZWRFbHNbc2F2ZWRFbElkXTtcbiAgICAgICAgICAgICAgICBvbk5vZGVEaXNjYXJkZWQoc2F2ZWRFbCk7XG4gICAgICAgICAgICAgICAgd2Fsa0Rpc2NhcmRlZENoaWxkTm9kZXMoc2F2ZWRFbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoIWNoaWxkcmVuT25seSAmJiBtb3JwaGVkTm9kZSAhPT0gZnJvbU5vZGUgJiYgZnJvbU5vZGUucGFyZW50Tm9kZSkge1xuICAgICAgICAvLyBJZiB3ZSBoYWQgdG8gc3dhcCBvdXQgdGhlIGZyb20gbm9kZSB3aXRoIGEgbmV3IG5vZGUgYmVjYXVzZSB0aGUgb2xkXG4gICAgICAgIC8vIG5vZGUgd2FzIG5vdCBjb21wYXRpYmxlIHdpdGggdGhlIHRhcmdldCBub2RlIHRoZW4gd2UgbmVlZCB0b1xuICAgICAgICAvLyByZXBsYWNlIHRoZSBvbGQgRE9NIG5vZGUgaW4gdGhlIG9yaWdpbmFsIERPTSB0cmVlLiBUaGlzIGlzIG9ubHlcbiAgICAgICAgLy8gcG9zc2libGUgaWYgdGhlIG9yaWdpbmFsIERPTSBub2RlIHdhcyBwYXJ0IG9mIGEgRE9NIHRyZWUgd2hpY2hcbiAgICAgICAgLy8gd2Uga25vdyBpcyB0aGUgY2FzZSBpZiBpdCBoYXMgYSBwYXJlbnQgbm9kZS5cbiAgICAgICAgZnJvbU5vZGUucGFyZW50Tm9kZS5yZXBsYWNlQ2hpbGQobW9ycGhlZE5vZGUsIGZyb21Ob2RlKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbW9ycGhlZE5vZGU7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gbW9ycGhkb207XG4iLCJtb2R1bGUuZXhwb3J0cyA9IFtcbiAgLy8gYXR0cmlidXRlIGV2ZW50cyAoY2FuIGJlIHNldCB3aXRoIGF0dHJpYnV0ZXMpXG4gICdvbmNsaWNrJyxcbiAgJ29uZGJsY2xpY2snLFxuICAnb25tb3VzZWRvd24nLFxuICAnb25tb3VzZXVwJyxcbiAgJ29ubW91c2VvdmVyJyxcbiAgJ29ubW91c2Vtb3ZlJyxcbiAgJ29ubW91c2VvdXQnLFxuICAnb25kcmFnc3RhcnQnLFxuICAnb25kcmFnJyxcbiAgJ29uZHJhZ2VudGVyJyxcbiAgJ29uZHJhZ2xlYXZlJyxcbiAgJ29uZHJhZ292ZXInLFxuICAnb25kcm9wJyxcbiAgJ29uZHJhZ2VuZCcsXG4gICdvbmtleWRvd24nLFxuICAnb25rZXlwcmVzcycsXG4gICdvbmtleXVwJyxcbiAgJ29udW5sb2FkJyxcbiAgJ29uYWJvcnQnLFxuICAnb25lcnJvcicsXG4gICdvbnJlc2l6ZScsXG4gICdvbnNjcm9sbCcsXG4gICdvbnNlbGVjdCcsXG4gICdvbmNoYW5nZScsXG4gICdvbnN1Ym1pdCcsXG4gICdvbnJlc2V0JyxcbiAgJ29uZm9jdXMnLFxuICAnb25ibHVyJyxcbiAgJ29uaW5wdXQnLFxuICAvLyBvdGhlciBjb21tb24gZXZlbnRzXG4gICdvbmNvbnRleHRtZW51JyxcbiAgJ29uZm9jdXNpbicsXG4gICdvbmZvY3Vzb3V0J1xuXVxuIiwiLyogZ2xvYmFsIE11dGF0aW9uT2JzZXJ2ZXIgKi9cbnZhciBkb2N1bWVudCA9IHJlcXVpcmUoJ2dsb2JhbC9kb2N1bWVudCcpXG52YXIgd2luZG93ID0gcmVxdWlyZSgnZ2xvYmFsL3dpbmRvdycpXG52YXIgd2F0Y2ggPSBPYmplY3QuY3JlYXRlKG51bGwpXG52YXIgS0VZX0lEID0gJ29ubG9hZGlkJyArIChuZXcgRGF0ZSgpICUgOWU2KS50b1N0cmluZygzNilcbnZhciBLRVlfQVRUUiA9ICdkYXRhLScgKyBLRVlfSURcbnZhciBJTkRFWCA9IDBcblxuaWYgKHdpbmRvdyAmJiB3aW5kb3cuTXV0YXRpb25PYnNlcnZlcikge1xuICB2YXIgb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcihmdW5jdGlvbiAobXV0YXRpb25zKSB7XG4gICAgaWYgKHdhdGNoLmxlbmd0aCA8IDEpIHJldHVyblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbXV0YXRpb25zLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAobXV0YXRpb25zW2ldLmF0dHJpYnV0ZU5hbWUgPT09IEtFWV9BVFRSKSB7XG4gICAgICAgIGVhY2hBdHRyKG11dGF0aW9uc1tpXSwgdHVybm9uLCB0dXJub2ZmKVxuICAgICAgICBjb250aW51ZVxuICAgICAgfVxuICAgICAgZWFjaE11dGF0aW9uKG11dGF0aW9uc1tpXS5yZW1vdmVkTm9kZXMsIHR1cm5vZmYpXG4gICAgICBlYWNoTXV0YXRpb24obXV0YXRpb25zW2ldLmFkZGVkTm9kZXMsIHR1cm5vbilcbiAgICB9XG4gIH0pXG4gIG9ic2VydmVyLm9ic2VydmUoZG9jdW1lbnQuYm9keSwge1xuICAgIGNoaWxkTGlzdDogdHJ1ZSxcbiAgICBzdWJ0cmVlOiB0cnVlLFxuICAgIGF0dHJpYnV0ZXM6IHRydWUsXG4gICAgYXR0cmlidXRlT2xkVmFsdWU6IHRydWUsXG4gICAgYXR0cmlidXRlRmlsdGVyOiBbS0VZX0FUVFJdXG4gIH0pXG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gb25sb2FkIChlbCwgb24sIG9mZikge1xuICBvbiA9IG9uIHx8IGZ1bmN0aW9uICgpIHt9XG4gIG9mZiA9IG9mZiB8fCBmdW5jdGlvbiAoKSB7fVxuICBlbC5zZXRBdHRyaWJ1dGUoS0VZX0FUVFIsICdvJyArIElOREVYKVxuICB3YXRjaFsnbycgKyBJTkRFWF0gPSBbb24sIG9mZiwgMF1cbiAgSU5ERVggKz0gMVxufVxuXG5mdW5jdGlvbiB0dXJub24gKGluZGV4KSB7XG4gIGlmICh3YXRjaFtpbmRleF1bMF0gJiYgd2F0Y2hbaW5kZXhdWzJdID09PSAwKSB7XG4gICAgd2F0Y2hbaW5kZXhdWzBdKClcbiAgICB3YXRjaFtpbmRleF1bMl0gPSAxXG4gIH1cbn1cblxuZnVuY3Rpb24gdHVybm9mZiAoaW5kZXgpIHtcbiAgaWYgKHdhdGNoW2luZGV4XVsxXSAmJiB3YXRjaFtpbmRleF1bMl0gPT09IDEpIHtcbiAgICB3YXRjaFtpbmRleF1bMV0oKVxuICAgIHdhdGNoW2luZGV4XVsyXSA9IDBcbiAgfVxufVxuXG5mdW5jdGlvbiBlYWNoQXR0ciAobXV0YXRpb24sIG9uLCBvZmYpIHtcbiAgdmFyIG5ld1ZhbHVlID0gbXV0YXRpb24udGFyZ2V0LmdldEF0dHJpYnV0ZShLRVlfQVRUUilcbiAgT2JqZWN0LmtleXMod2F0Y2gpLmZvckVhY2goZnVuY3Rpb24gKGspIHtcbiAgICBpZiAobXV0YXRpb24ub2xkVmFsdWUgPT09IGspIHtcbiAgICAgIG9mZihrKVxuICAgIH1cbiAgICBpZiAobmV3VmFsdWUgPT09IGspIHtcbiAgICAgIG9uKGspXG4gICAgfVxuICB9KVxufVxuXG5mdW5jdGlvbiBlYWNoTXV0YXRpb24gKG5vZGVzLCBmbikge1xuICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKHdhdGNoKVxuICBmb3IgKHZhciBpID0gMDsgaSA8IG5vZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKG5vZGVzW2ldICYmIG5vZGVzW2ldLmdldEF0dHJpYnV0ZSAmJiBub2Rlc1tpXS5nZXRBdHRyaWJ1dGUoS0VZX0FUVFIpKSB7XG4gICAgICB2YXIgb25sb2FkaWQgPSBub2Rlc1tpXS5nZXRBdHRyaWJ1dGUoS0VZX0FUVFIpXG4gICAgICBrZXlzLmZvckVhY2goZnVuY3Rpb24gKGspIHtcbiAgICAgICAgaWYgKG9ubG9hZGlkID09PSBrKSB7XG4gICAgICAgICAgZm4oaylcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG4gICAgaWYgKG5vZGVzW2ldLmNoaWxkTm9kZXMubGVuZ3RoID4gMCkge1xuICAgICAgZWFjaE11dGF0aW9uKG5vZGVzW2ldLmNoaWxkTm9kZXMsIGZuKVxuICAgIH1cbiAgfVxufVxuIiwidmFyIHRvcExldmVsID0gdHlwZW9mIGdsb2JhbCAhPT0gJ3VuZGVmaW5lZCcgPyBnbG9iYWwgOlxuICAgIHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnID8gd2luZG93IDoge31cbnZhciBtaW5Eb2MgPSByZXF1aXJlKCdtaW4tZG9jdW1lbnQnKTtcblxuaWYgKHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IGRvY3VtZW50O1xufSBlbHNlIHtcbiAgICB2YXIgZG9jY3kgPSB0b3BMZXZlbFsnX19HTE9CQUxfRE9DVU1FTlRfQ0FDSEVANCddO1xuXG4gICAgaWYgKCFkb2NjeSkge1xuICAgICAgICBkb2NjeSA9IHRvcExldmVsWydfX0dMT0JBTF9ET0NVTUVOVF9DQUNIRUA0J10gPSBtaW5Eb2M7XG4gICAgfVxuXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBkb2NjeTtcbn1cbiIsImlmICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSB3aW5kb3c7XG59IGVsc2UgaWYgKHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IGdsb2JhbDtcbn0gZWxzZSBpZiAodHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIpe1xuICAgIG1vZHVsZS5leHBvcnRzID0gc2VsZjtcbn0gZWxzZSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSB7fTtcbn1cbiIsIm1vZHVsZS5leHBvcnRzPVtcbiAge1xuICAgIFwibmFtZVwiOiBcIkZyYW5raWUgSm9obm5pZSAmIEx1aWdvIFRvb1wiLFxuICAgIFwiYWRkcmVzc1wiOiBcIjkzOSBXIEVsIENhbWlubyBSZWFsLCBNb3VudGFpbiBWaWV3LCBDQVwiLFxuICAgIFwibGF0XCI6IDM3LjM4NjMzOSxcbiAgICBcImxuZ1wiOiAtMTIyLjA4NTgyM1xuICB9LFxuICB7XG4gICAgXCJuYW1lXCI6IFwiQW1pY2kncyBFYXN0IENvYXN0IFBpenplcmlhXCIsXG4gICAgXCJhZGRyZXNzXCI6IFwiNzkwIENhc3RybyBTdCwgTW91bnRhaW4gVmlldywgQ0FcIixcbiAgICBcImxhdFwiOiAzNy4zODcxNCxcbiAgICBcImxuZ1wiOiAtMTIyLjA4MzIzNVxuICB9LFxuICB7XG4gICAgXCJuYW1lXCI6IFwiS2FwcCdzIFBpenphIEJhciAmIEdyaWxsXCIsXG4gICAgXCJhZGRyZXNzXCI6IFwiMTkxIENhc3RybyBTdCwgTW91bnRhaW4gVmlldywgQ0FcIixcbiAgICBcImxhdFwiOiAzNy4zOTM4ODUsXG4gICAgXCJsbmdcIjogLTEyMi4wNzg5MTZcbiAgfSxcbiAge1xuICAgIFwibmFtZVwiOiBcIlJvdW5kIFRhYmxlIFBpenphOiBNb3VudGFpbiBWaWV3XCIsXG4gICAgXCJhZGRyZXNzXCI6IFwiNTcwIE4gU2hvcmVsaW5lIEJsdmQsIE1vdW50YWluIFZpZXcsIENBXCIsXG4gICAgXCJsYXRcIjogMzcuNDAyNjUzLFxuICAgIFwibG5nXCI6IC0xMjIuMDc5MzU0XG4gIH0sXG4gIHtcbiAgICBcIm5hbWVcIjogXCJUb255ICYgQWxiYSdzIFBpenphICYgUGFzdGFcIixcbiAgICBcImFkZHJlc3NcIjogXCI2MTkgRXNjdWVsYSBBdmUsIE1vdW50YWluIFZpZXcsIENBXCIsXG4gICAgXCJsYXRcIjogMzcuMzk0MDExLFxuICAgIFwibG5nXCI6IC0xMjIuMDk1NTI4XG4gIH0sXG4gIHtcbiAgICBcIm5hbWVcIjogXCJPcmVnYW5vJ3MgV29vZC1GaXJlZCBQaXp6YVwiLFxuICAgIFwiYWRkcmVzc1wiOiBcIjQ1NDYgRWwgQ2FtaW5vIFJlYWwsIExvcyBBbHRvcywgQ0FcIixcbiAgICBcImxhdFwiOiAzNy40MDE3MjQsXG4gICAgXCJsbmdcIjogLTEyMi4xMTQ2NDZcbiAgfSxcbiAge1xuICAgIFwibmFtZVwiOiBcIlJvdW5kIFRhYmxlIFBpenphOiBTdW5ueXZhbGUtTWFyeS1DZW50cmFsIEV4cHlcIixcbiAgICBcImFkZHJlc3NcIjogXCI0MTUgTiBNYXJ5IEF2ZSwgU3Vubnl2YWxlLCBDQVwiLFxuICAgIFwibGF0XCI6IDM3LjM5MDAzOCxcbiAgICBcImxuZ1wiOiAtMTIyLjA0MjAzNFxuICB9LFxuICB7XG4gICAgXCJuYW1lXCI6IFwiR2lvcmRhbm8nc1wiLFxuICAgIFwiYWRkcmVzc1wiOiBcIjczMCBOIFJ1c2ggU3QsIENoaWNhZ28sIElMXCIsXG4gICAgXCJsYXRcIjogNDEuODk1NzI5LFxuICAgIFwibG5nXCI6IC04Ny42MjU0MTFcbiAgfSxcbiAge1xuICAgIFwibmFtZVwiOiBcIkZpbGlwcGkncyBQaXp6YSBHcm90dG9cIixcbiAgICBcImFkZHJlc3NcIjogXCIxNzQ3IEluZGlhIFN0LCBTYW4gRGllZ28sIENBXCIsXG4gICAgXCJsYXRcIjogMzIuNzIzODMxLFxuICAgIFwibG5nXCI6IC0xMTcuMTY4MzI2XG4gIH0sXG4gIHtcbiAgICBcIm5hbWVcIjogXCJQaXp6ZXJpYSBQYXJhZGlzb1wiLFxuICAgIFwiYWRkcmVzc1wiOiBcIjIwMjkgUCBTdCBOVywgV2FzaGluZ3RvbiwgRENcIixcbiAgICBcImxhdFwiOiAzOC45MDk2NSxcbiAgICBcImxuZ1wiOiAtNzcuMDQ1OVxuICB9LFxuICB7XG4gICAgXCJuYW1lXCI6IFwiVHV0dGEgQmVsbGEgTmVhcG9saXRhbiBQaXp6ZXJhXCIsXG4gICAgXCJhZGRyZXNzXCI6IFwiNDkxOCBSYWluaWVyIEF2ZSBTLCBTZWF0dGxlLCBXQVwiLFxuICAgIFwibGF0XCI6IDQ3LjU1NzcwNCxcbiAgICBcImxuZ1wiOiAtMTIyLjI4NDk4NVxuICB9LFxuICB7XG4gICAgXCJuYW1lXCI6IFwiVG91Y2hlIFBhc3RhIFBpenphIFBvb2xcIixcbiAgICBcImFkZHJlc3NcIjogXCIxNDI1IE5XIEdsaXNhbiBTdCwgUG9ydGxhbmQsIE9SXCIsXG4gICAgXCJsYXRcIjogNDUuNTI2NDY1LFxuICAgIFwibG5nXCI6IC0xMjIuNjg1NThcbiAgfSxcbiAge1xuICAgIFwibmFtZVwiOiBcIlBpZWNvcmEncyBOZXcgWW9yayBQaXp6YVwiLFxuICAgIFwiYWRkcmVzc1wiOiBcIjE0MDEgRSBNYWRpc29uIFN0LCBTZWF0dGxlLCBXQVwiLFxuICAgIFwibGF0XCI6IDQ3LjYxNDAwNSxcbiAgICBcImxuZ1wiOiAtMTIyLjMxMzk4NVxuICB9LFxuICB7XG4gICAgXCJuYW1lXCI6IFwiUGFnbGlhY2NpIFBpenphXCIsXG4gICAgXCJhZGRyZXNzXCI6IFwiNTUwIFF1ZWVuIEFubmUgQXZlIE4sIFNlYXR0bGUsIFdBXCIsXG4gICAgXCJsYXRcIjogNDcuNjIzOTQyLFxuICAgIFwibG5nXCI6IC0xMjIuMzU2NzE5XG4gIH0sXG4gIHtcbiAgICBcIm5hbWVcIjogXCJaZWVrcyBQaXp6YSAtIFBoaW5uZXkgUmlkZ2VcIixcbiAgICBcImFkZHJlc3NcIjogXCI2MDAwIFBoaW5uZXkgQXZlIE4sIFNlYXR0bGUsIFdBXCIsXG4gICAgXCJsYXRcIjogNDcuNjcyNjcsXG4gICAgXCJsbmdcIjogLTEyMi4zNTQwOTJcbiAgfSxcbiAge1xuICAgIFwibmFtZVwiOiBcIk9sZCBUb3duIFBpenphXCIsXG4gICAgXCJhZGRyZXNzXCI6IFwiMjI2IE5XIERhdmlzIFN0LCBQb3J0bGFuZCwgT1JcIixcbiAgICBcImxhdFwiOiA0NS41MjQ1NTcsXG4gICAgXCJsbmdcIjogLTEyMi42NzI2OFxuICB9LFxuICB7XG4gICAgXCJuYW1lXCI6IFwiWmVla3MgUGl6emEgLSBCZWxsdG93blwiLFxuICAgIFwiYWRkcmVzc1wiOiBcIjQxOSBEZW5ueSBXYXksIFNlYXR0bGUsIFdBXCIsXG4gICAgXCJsYXRcIjogNDcuNjE4MzE0LFxuICAgIFwibG5nXCI6IC0xMjIuMzQ3OTk4XG4gIH0sXG4gIHtcbiAgICBcIm5hbWVcIjogXCJFc2NhcGUgRnJvbSBOZXcgWW9yayBQaXp6YVwiLFxuICAgIFwiYWRkcmVzc1wiOiBcIjYyMiBOVyAyM3JkIEF2ZSwgUG9ydGxhbmQsIE9SXCIsXG4gICAgXCJsYXRcIjogNDUuNTI3MTA1LFxuICAgIFwibG5nXCI6IC0xMjIuNjk4NTA5XG4gIH0sXG4gIHtcbiAgICBcIm5hbWVcIjogXCJCaWcgRnJlZCdzIFBpenphIEdhcmRlblwiLFxuICAgIFwiYWRkcmVzc1wiOiBcIjExMDEgUyAxMTl0aCBTdCwgT21haGEsIE5FXCIsXG4gICAgXCJsYXRcIjogNDEuMjQ4NjYyLFxuICAgIFwibG5nXCI6IC05Ni4wOTg3NlxuICB9LFxuICB7XG4gICAgXCJuYW1lXCI6IFwiT2xkIENoaWNhZ29cIixcbiAgICBcImFkZHJlc3NcIjogXCIxMTExIEhhcm5leSBTdCwgT21haGEsIE5FXCIsXG4gICAgXCJsYXRcIjogNDEuMjU2NTIsXG4gICAgXCJsbmdcIjogLTk1LjkzMDY4M1xuICB9LFxuICB7XG4gICAgXCJuYW1lXCI6IFwiU2d0IFBlZmZlcidzIENhZmUgSXRhbGlhblwiLFxuICAgIFwiYWRkcmVzc1wiOiBcIjE1MDEgTiBTYWRkbGUgQ3JlZWsgUmQsIE9tYWhhLCBORVwiLFxuICAgIFwibGF0XCI6IDQxLjI3MzA4NCxcbiAgICBcImxuZ1wiOiAtOTUuOTg3ODE2XG4gIH0sXG4gIHtcbiAgICBcIm5hbWVcIjogXCJNYW1hJ3MgUGl6emFcIixcbiAgICBcImFkZHJlc3NcIjogXCI3MTUgTiBTYWRkbGUgQ3JlZWsgUmQsIE9tYWhhLCBORVwiLFxuICAgIFwibGF0XCI6IDQxLjI2NTg4MyxcbiAgICBcImxuZ1wiOiAtOTUuOTgwNjgyXG4gIH0sXG4gIHtcbiAgICBcIm5hbWVcIjogXCJaaW8ncyBOZXcgWW9yayBTdHlsZSBQaXp6ZXJpYVwiLFxuICAgIFwiYWRkcmVzc1wiOiBcIjEyMTMgSG93YXJkIFN0LCBPbWFoYSwgTkVcIixcbiAgICBcImxhdFwiOiA0MS4yNTU0NSxcbiAgICBcImxuZ1wiOiAtOTUuOTMyMDIyXG4gIH0sXG4gIHtcbiAgICBcIm5hbWVcIjogXCJaaW8ncyBOZXcgWW9yayBTdHlsZSBQaXp6ZXJpYVwiLFxuICAgIFwiYWRkcmVzc1wiOiBcIjc4MzQgVyBEb2RnZSBSZCwgT21haGEsIE5FXCIsXG4gICAgXCJsYXRcIjogNDEuMjYzMjUsXG4gICAgXCJsbmdcIjogLTk2LjA1NjRcbiAgfSxcbiAge1xuICAgIFwibmFtZVwiOiBcIkxhIENhc2EgUGl6emFyaWFcIixcbiAgICBcImFkZHJlc3NcIjogXCI0NDMyIExlYXZlbndvcnRoIFN0LCBPbWFoYSwgTkVcIixcbiAgICBcImxhdFwiOiA0MS4yNTI0LFxuICAgIFwibG5nXCI6IC05NS45Nzk1NzhcbiAgfSxcbiAge1xuICAgIFwibmFtZVwiOiBcIkxvdSBNYWxuYXRpJ3MgUGl6emVyaWFcIixcbiAgICBcImFkZHJlc3NcIjogXCI0MzkgTiBXZWxscyBTdCwgQ2hpY2FnbywgSUxcIixcbiAgICBcImxhdFwiOiA0MS44OTAzNDYsXG4gICAgXCJsbmdcIjogLTg3LjYzMzkyN1xuICB9LFxuICB7XG4gICAgXCJuYW1lXCI6IFwiUGllY2UgUmVzdGF1cmFudFwiLFxuICAgIFwiYWRkcmVzc1wiOiBcIjE5MjcgVyBOb3J0aCBBdmUsIENoaWNhZ28sIElMXCIsXG4gICAgXCJsYXRcIjogNDEuOTEwNDkzLFxuICAgIFwibG5nXCI6IC04Ny42NzYxMjdcbiAgfSxcbiAge1xuICAgIFwibmFtZVwiOiBcIkNvbm5pZSdzIFBpenphIEluY1wiLFxuICAgIFwiYWRkcmVzc1wiOiBcIjIzNzMgUyBBcmNoZXIgQXZlLCBDaGljYWdvLCBJTFwiLFxuICAgIFwibGF0XCI6IDQxLjg0OTIxMyxcbiAgICBcImxuZ1wiOiAtODcuNjQxNjgxXG4gIH0sXG4gIHtcbiAgICBcIm5hbWVcIjogXCJFeGNoZXF1ZXIgUmVzdGF1cmFudFwiLFxuICAgIFwiYWRkcmVzc1wiOiBcIjIyNiBTIFdhYmFzaCBBdmUsIENoaWNhZ28sIElMXCIsXG4gICAgXCJsYXRcIjogNDEuODc5MTg5LFxuICAgIFwibG5nXCI6IC04Ny42MjYwNzlcbiAgfSxcbiAge1xuICAgIFwibmFtZVwiOiBcIkNvY28ncyBCeSBUaGUgRmFsbHNcIixcbiAgICBcImFkZHJlc3NcIjogXCI1MzM5IE11cnJheSBTdHJlZXQsIE5pYWdhcmEgRmFsbHMsIE9udGFyaW9cIixcbiAgICBcImxhdFwiOiA0My4wODM1NTUsXG4gICAgXCJsbmdcIjogLTc5LjA4MjcwNlxuICB9LFxuICB7XG4gICAgXCJuYW1lXCI6IFwiUG9tcGVpXCIsXG4gICAgXCJhZGRyZXNzXCI6IFwiMTUzMSBXIFRheWxvciBTdCwgQ2hpY2FnbywgSUxcIixcbiAgICBcImxhdFwiOiA0MS44NjkzMDEsXG4gICAgXCJsbmdcIjogLTg3LjY2NDc3OVxuICB9LFxuICB7XG4gICAgXCJuYW1lXCI6IFwiTHlubidzIFBhcmFkaXNlIENhZmVcIixcbiAgICBcImFkZHJlc3NcIjogXCI5ODQgQmFycmV0IEF2ZSwgTG91aXN2aWxsZSwgS1lcIixcbiAgICBcImxhdFwiOiAzOC4yMzY5MyxcbiAgICBcImxuZ1wiOiAtODUuNzI4NTRcbiAgfSxcbiAge1xuICAgIFwibmFtZVwiOiBcIk90dG8gUmVzdGF1cmFudCBFbm90ZWNhIFBpenphXCIsXG4gICAgXCJhZGRyZXNzXCI6IFwiMSA1dGggQXZlLCBOZXcgWW9yaywgTllcIixcbiAgICBcImxhdFwiOiA0MC43MzIxNjEsXG4gICAgXCJsbmdcIjogLTczLjk5NjMyMVxuICB9LFxuICB7XG4gICAgXCJuYW1lXCI6IFwiR3JpbWFsZGknc1wiLFxuICAgIFwiYWRkcmVzc1wiOiBcIjE5IE9sZCBGdWx0b24gU3QsIEJyb29rbHluLCBOWVwiLFxuICAgIFwibGF0XCI6IDQwLjcwMjUxNSxcbiAgICBcImxuZ1wiOiAtNzMuOTkzNzMzXG4gIH0sXG4gIHtcbiAgICBcIm5hbWVcIjogXCJMb21iYXJkaSdzXCIsXG4gICAgXCJhZGRyZXNzXCI6IFwiMzIgU3ByaW5nIFN0LCBOZXcgWW9yaywgTllcIixcbiAgICBcImxhdFwiOiA0MC43MjE2NzUsXG4gICAgXCJsbmdcIjogLTczLjk5NTU5NVxuICB9LFxuICB7XG4gICAgXCJuYW1lXCI6IFwiSm9obidzIFBpenplcmlhXCIsXG4gICAgXCJhZGRyZXNzXCI6IFwiMjc4IEJsZWVja2VyIFN0LCBOZXcgWW9yaywgTllcIixcbiAgICBcImxhdFwiOiA0MC43MzE3MDYsXG4gICAgXCJsbmdcIjogLTc0LjAwMzI3MVxuICB9LFxuICB7XG4gICAgXCJuYW1lXCI6IFwiSm9obidzIFBpenplcmlhXCIsXG4gICAgXCJhZGRyZXNzXCI6IFwiMjYwIFcgNDR0aCBTdCwgTmV3IFlvcmssIE5ZXCIsXG4gICAgXCJsYXRcIjogNDAuNzU4MDcyLFxuICAgIFwibG5nXCI6IC03My45ODc3MzZcbiAgfSxcbiAge1xuICAgIFwibmFtZVwiOiBcIkJ1cmdlciBKb2ludFwiLFxuICAgIFwiYWRkcmVzc1wiOiBcIjIxNzUgQnJvYWR3YXksIE5ldyBZb3JrLCBOWVwiLFxuICAgIFwibGF0XCI6IDQwLjc4MjM5OCxcbiAgICBcImxuZ1wiOiAtNzMuOTgxXG4gIH0sXG4gIHtcbiAgICBcIm5hbWVcIjogXCJGcmFuayBQZXBlIFBpenplcmlhIE5hcG9sZXRhbmFcIixcbiAgICBcImFkZHJlc3NcIjogXCIxNTcgV29vc3RlciBTdCwgTmV3IEhhdmVuLCBDVFwiLFxuICAgIFwibGF0XCI6IDQxLjMwMjgwMyxcbiAgICBcImxuZ1wiOiAtNzIuOTE3MDQyXG4gIH0sXG4gIHtcbiAgICBcIm5hbWVcIjogXCJBZHJpYW5uZSdzIFBpenphIEJhclwiLFxuICAgIFwiYWRkcmVzc1wiOiBcIjU0IFN0b25lIFN0LCBOZXcgWW9yaywgTllcIixcbiAgICBcImxhdFwiOiA0MC43MDQ0OCxcbiAgICBcImxuZ1wiOiAtNzQuMDEwMTM3XG4gIH0sXG4gIHtcbiAgICBcIm5hbWVcIjogXCJQaXp6ZXJpYSBSZWdpbmE6IFJlZ2luYSBQaXp6YVwiLFxuICAgIFwiYWRkcmVzc1wiOiBcIjExIDEvMiBUaGFjaGVyIFN0LCBCb3N0b24sIE1BXCIsXG4gICAgXCJsYXRcIjogNDIuMzY1MzM4LFxuICAgIFwibG5nXCI6IC03MS4wNTY4MzJcbiAgfSxcbiAge1xuICAgIFwibmFtZVwiOiBcIlVwcGVyIENydXN0XCIsXG4gICAgXCJhZGRyZXNzXCI6IFwiMjAgQ2hhcmxlcyBTdCwgQm9zdG9uLCBNQVwiLFxuICAgIFwibGF0XCI6IDQyLjM1NjYwNyxcbiAgICBcImxuZ1wiOiAtNzEuMDY5NjgxXG4gIH0sXG4gIHtcbiAgICBcIm5hbWVcIjogXCJCZXJ0dWNjaSdzIEJyaWNrIE92ZW4gUnN0cm50XCIsXG4gICAgXCJhZGRyZXNzXCI6IFwiNCBCcm9va2xpbmUgUGwsIEJyb29rbGluZSwgTUFcIixcbiAgICBcImxhdFwiOiA0Mi4zMzE5MTcsXG4gICAgXCJsbmdcIjogLTcxLjExNTMxMVxuICB9LFxuICB7XG4gICAgXCJuYW1lXCI6IFwiQXF1aXRhaW5lXCIsXG4gICAgXCJhZGRyZXNzXCI6IFwiNTY5IFRyZW1vbnQgU3QsIEJvc3RvbiwgTUFcIixcbiAgICBcImxhdFwiOiA0Mi4zNDM2MzcsXG4gICAgXCJsbmdcIjogLTcxLjA3MjI2NVxuICB9LFxuICB7XG4gICAgXCJuYW1lXCI6IFwiQmVydHVjY2kncyBCcmljayBPdmVuIFJzdHJudFwiLFxuICAgIFwiYWRkcmVzc1wiOiBcIjQzIFN0YW5ob3BlIFN0LCBCb3N0b24sIE1BXCIsXG4gICAgXCJsYXRcIjogNDIuMzQ4Mjk5LFxuICAgIFwibG5nXCI6IC03MS4wNzMyNDlcbiAgfSxcbiAge1xuICAgIFwibmFtZVwiOiBcIlVwcGVyIENydXN0XCIsXG4gICAgXCJhZGRyZXNzXCI6IFwiMjg2IEhhcnZhcmQgU3QsIEJyb29rbGluZSwgTUFcIixcbiAgICBcImxhdFwiOiA0Mi4zNDI4NTYsXG4gICAgXCJsbmdcIjogLTcxLjEyMjMxMVxuICB9LFxuICB7XG4gICAgXCJuYW1lXCI6IFwiQmVydHVjY2kncyBCcmljayBPdmVuIFJzdHJudFwiLFxuICAgIFwiYWRkcmVzc1wiOiBcIjc5OSBNYWluIFN0LCBDYW1icmlkZ2UsIE1BXCIsXG4gICAgXCJsYXRcIjogNDIuMzYzMjU5LFxuICAgIFwibG5nXCI6IC03MS4wOTcyMVxuICB9LFxuICB7XG4gICAgXCJuYW1lXCI6IFwiQmVydHVjY2kncyBCcmljayBPdmVuIFJzdHJudFwiLFxuICAgIFwiYWRkcmVzc1wiOiBcIjIyIE1lcmNoYW50cyBSb3csIEJvc3RvbiwgTUFcIixcbiAgICBcImxhdFwiOiA0Mi4zNTkxNDYsXG4gICAgXCJsbmdcIjogLTcxLjA1NTQ3N1xuICB9LFxuICB7XG4gICAgXCJuYW1lXCI6IFwiVmlubmllIFZhbiBHby1HbydzXCIsXG4gICAgXCJhZGRyZXNzXCI6IFwiMzE3IFcgQnJ5YW4gU3QsIFNhdmFubmFoLCBHQVwiLFxuICAgIFwibGF0XCI6IDMyLjA4MTE1MixcbiAgICBcImxuZ1wiOiAtODEuMDk0OTkyXG4gIH0sXG4gIHtcbiAgICBcIm5hbWVcIjogXCJEb21pbm8ncyBQaXp6YTogTXlydGxlIEJlYWNoXCIsXG4gICAgXCJhZGRyZXNzXCI6IFwiMTcwNiBTIEtpbmdzIEh3eSAjIEEsIE15cnRsZSBCZWFjaCwgU0NcIixcbiAgICBcImxhdFwiOiAzMy42NzQ4OCxcbiAgICBcImxuZ1wiOiAtNzguOTA1MTQzXG4gIH0sXG4gIHtcbiAgICBcIm5hbWVcIjogXCJFYXN0IG9mIENoaWNhZ28gUGl6emEgQ29tcGFueVwiLFxuICAgIFwiYWRkcmVzc1wiOiBcIjM5MDEgTm9ydGggS2luZ3MgSGlnaHdheSBTdWl0ZSAxLCBNeXJ0bGUgQmVhY2gsIFNDXCIsXG4gICAgXCJsYXRcIjogMzMuNzE2MDk3LFxuICAgIFwibG5nXCI6IC03OC44NTU1ODJcbiAgfSxcbiAge1xuICAgIFwibmFtZVwiOiBcIlZpbGxhIFRyb25jbyBJdGFsaWFuIFJzdHJudFwiLFxuICAgIFwiYWRkcmVzc1wiOiBcIjEyMTMgQmxhbmRpbmcgU3QsIENvbHVtYmlhLCBTQ1wiLFxuICAgIFwibGF0XCI6IDM0LjAwODA0OCxcbiAgICBcImxuZ1wiOiAtODEuMDM2MzE0XG4gIH0sXG4gIHtcbiAgICBcIm5hbWVcIjogXCJNZWxsb3cgTXVzaHJvb20gUGl6emEgQmFrZXJzXCIsXG4gICAgXCJhZGRyZXNzXCI6IFwiMTEgVyBMaWJlcnR5IFN0LCBTYXZhbm5haCwgR0FcIixcbiAgICBcImxhdFwiOiAzMi4wNzQ2NzMsXG4gICAgXCJsbmdcIjogLTgxLjA5MzY5OVxuICB9LFxuICB7XG4gICAgXCJuYW1lXCI6IFwiQW5kb2xpbmlzIFBpenphXCIsXG4gICAgXCJhZGRyZXNzXCI6IFwiODIgV2VudHdvcnRoIFN0LCBDaGFybGVzdG9uLCBTQ1wiLFxuICAgIFwibGF0XCI6IDMyLjc4MjMzLFxuICAgIFwibG5nXCI6IC03OS45MzQyMzZcbiAgfSxcbiAge1xuICAgIFwibmFtZVwiOiBcIk1lbGxvdyBNdXNocm9vbSBQaXp6YSBCYWtlcnNcIixcbiAgICBcImFkZHJlc3NcIjogXCIyNTkgRSBCcm9hZCBTdCwgQXRoZW5zLCBHQVwiLFxuICAgIFwibGF0XCI6IDMzLjk1NzgsXG4gICAgXCJsbmdcIjogLTgzLjM3NDY2XG4gIH0sXG4gIHtcbiAgICBcIm5hbWVcIjogXCJCdWNrcyBQaXp6YSBvZiBFZGlzdG8gQmVhY2ggSW5jXCIsXG4gICAgXCJhZGRyZXNzXCI6IFwiMTE0IEp1bmdsZSBSZCwgRWRpc3RvIElzbGFuZCwgU0NcIixcbiAgICBcImxhdFwiOiAzMi41MDM5NzMsXG4gICAgXCJsbmdcIjogLTgwLjI5Nzk0N1xuICB9LFxuICB7XG4gICAgXCJuYW1lXCI6IFwiQW50aG9ueSdzIENvYWwgRmlyZWQgUGl6emFcIixcbiAgICBcImFkZHJlc3NcIjogXCIyMjAzIFMgRmVkZXJhbCBId3ksIEZvcnQgTGF1ZGVyZGFsZSwgRkxcIixcbiAgICBcImxhdFwiOiAyNi4wOTQ2NzEsXG4gICAgXCJsbmdcIjogLTgwLjEzNjY4OVxuICB9LFxuICB7XG4gICAgXCJuYW1lXCI6IFwiR2lvcmRhbm8nc1wiLFxuICAgIFwiYWRkcmVzc1wiOiBcIjEyMTUxIFMgQXBvcGthIFZpbmVsYW5kIFJkLCBPcmxhbmRvLCBGTFwiLFxuICAgIFwibGF0XCI6IDI4LjM4OTM2NyxcbiAgICBcImxuZ1wiOiAtODEuNTA2MjIyXG4gIH0sXG4gIHtcbiAgICBcIm5hbWVcIjogXCJQaXp6YSBSdXN0aWNhXCIsXG4gICAgXCJhZGRyZXNzXCI6IFwiODYzIFdhc2hpbmd0b24gQXZlLCBNaWFtaSBCZWFjaCwgRkxcIixcbiAgICBcImxhdFwiOiAyNS43NzkwNTksXG4gICAgXCJsbmdcIjogLTgwLjEzMzEwN1xuICB9LFxuICB7XG4gICAgXCJuYW1lXCI6IFwiTWFtYSBKZW5uaWUncyBJdGFsaWFuIFJlc3RhdXJhbnRcIixcbiAgICBcImFkZHJlc3NcIjogXCIxMTcyMCBOZSAybmQgQXZlLCBOb3J0aCBNaWFtaSwgRkxcIixcbiAgICBcImxhdFwiOiAyNS44ODI3ODIsXG4gICAgXCJsbmdcIjogLTgwLjE5NDI5XG4gIH0sXG4gIHtcbiAgICBcIm5hbWVcIjogXCJBbnRob255J3MgQ29hbCBGaXJlZCBQaXp6YVwiLFxuICAgIFwiYWRkcmVzc1wiOiBcIjE3OTAxIEJpc2NheW5lIEJsdmQsIEF2ZW50dXJhLCBGTFwiLFxuICAgIFwibGF0XCI6IDI1Ljk0MTExNixcbiAgICBcImxuZ1wiOiAtODAuMTQ4ODI2XG4gIH0sXG4gIHtcbiAgICBcIm5hbWVcIjogXCJBbnRob255J3MgQ29hbCBGaXJlZCBQaXp6YVwiLFxuICAgIFwiYWRkcmVzc1wiOiBcIjQ1MjcgV2VzdG9uIFJkLCBXZXN0b24sIEZMXCIsXG4gICAgXCJsYXRcIjogMjYuMDY1Mzk1LFxuICAgIFwibG5nXCI6IC04MC4zNjI0NDJcbiAgfSxcbiAge1xuICAgIFwibmFtZVwiOiBcIk1hcmlvIHRoZSBCYWtlciBQaXp6YSAmIEl0YWxpYW4gUmVzdGF1cmFudFwiLFxuICAgIFwiYWRkcmVzc1wiOiBcIjEzNjk1IFcgRGl4aWUgSHd5LCBOb3J0aCBNaWFtaSwgRkxcIixcbiAgICBcImxhdFwiOiAyNS45Mjk3NCxcbiAgICBcImxuZ1wiOiAtODAuMTU2MDlcbiAgfSxcbiAge1xuICAgIFwibmFtZVwiOiBcIkJpZyBDaGVlc2UgUGl6emFcIixcbiAgICBcImFkZHJlc3NcIjogXCI4MDgwIFNXIDY3dGggQXZlLCBNaWFtaSwgRkxcIixcbiAgICBcImxhdFwiOiAyNS42OTYwMjUsXG4gICAgXCJsbmdcIjogLTgwLjMwMTExM1xuICB9LFxuICB7XG4gICAgXCJuYW1lXCI6IFwiSW5nbGVzaWRlIFZpbGxhZ2UgUGl6emFcIixcbiAgICBcImFkZHJlc3NcIjogXCIyMzk2IEluZ2xlc2lkZSBBdmUsIE1hY29uLCBHQVwiLFxuICAgIFwibGF0XCI6IDMyLjg1Mzc2LFxuICAgIFwibG5nXCI6IC04My42NTc0MDZcbiAgfSxcbiAge1xuICAgIFwibmFtZVwiOiBcIkNpYW8gQmVsbGEgUGl6emEgRGEgR3VnbGllbG1vXCIsXG4gICAgXCJhZGRyZXNzXCI6IFwiMjkgSGlnaHdheSA5OCBFLCBEZXN0aW4sIEZMXCIsXG4gICAgXCJsYXRcIjogMzAuMzk1NTU2LFxuICAgIFwibG5nXCI6IC04Ni41MTIwOTNcbiAgfSxcbiAge1xuICAgIFwibmFtZVwiOiBcIlBhcGEgSm9obidzIFBpenphXCIsXG4gICAgXCJhZGRyZXNzXCI6IFwiODEwIFJ1c3NlbGwgUGt3eSwgV2FybmVyIFJvYmlucywgR0FcIixcbiAgICBcImxhdFwiOiAzMi41OTM5MTEsXG4gICAgXCJsbmdcIjogLTgzLjYzNzA3NVxuICB9LFxuICB7XG4gICAgXCJuYW1lXCI6IFwiUGFwYSBKb2huJ3MgUGl6emE6IEVhc3QgQ2VudHJhbCBNb250Z29tZXJ5XCIsXG4gICAgXCJhZGRyZXNzXCI6IFwiMjUyNSBNYWRpc29uIEF2ZSwgTW9udGdvbWVyeSwgQUxcIixcbiAgICBcImxhdFwiOiAzMi4zODExMjEsXG4gICAgXCJsbmdcIjogLTg2LjI3MzAzNVxuICB9LFxuICB7XG4gICAgXCJuYW1lXCI6IFwiQ2ljaSdzIFBpenphXCIsXG4gICAgXCJhZGRyZXNzXCI6IFwiNjI2OCBBdGxhbnRhIEh3eSwgTW9udGdvbWVyeSwgQUxcIixcbiAgICBcImxhdFwiOiAzMi4zODIyMDUsXG4gICAgXCJsbmdcIjogLTg2LjE5MDY3NVxuICB9LFxuICB7XG4gICAgXCJuYW1lXCI6IFwiUGFwYSBKb2huJ3MgUGl6emFcIixcbiAgICBcImFkZHJlc3NcIjogXCIxMjEwIEUgSmFja3NvbiBTdCwgVGhvbWFzdmlsbGUsIEdBXCIsXG4gICAgXCJsYXRcIjogMzAuODQ5MTI5LFxuICAgIFwibG5nXCI6IC04My45NjM0MjhcbiAgfSxcbiAge1xuICAgIFwibmFtZVwiOiBcIlBhcGEgSm9obidzIFBpenphXCIsXG4gICAgXCJhZGRyZXNzXCI6IFwiNzExIE4gV2VzdG92ZXIgQmx2ZCAjIEcsIEFsYmFueSwgR0FcIixcbiAgICBcImxhdFwiOiAzMS42MTM5NyxcbiAgICBcImxuZ1wiOiAtODQuMjIzMDhcbiAgfSxcbiAge1xuICAgIFwibmFtZVwiOiBcIk1lbGxvdyBNdXNocm9vbSBQaXp6YSBCYWtlcnNcIixcbiAgICBcImFkZHJlc3NcIjogXCI2MTAwIFZldGVyYW5zIFBrd3ksIENvbHVtYnVzLCBHQVwiLFxuICAgIFwibGF0XCI6IDMyLjUzMjA3OCxcbiAgICBcImxuZ1wiOiAtODQuOTU1ODk0XG4gIH0sXG4gIHtcbiAgICBcIm5hbWVcIjogXCJTdGFyIFBpenphXCIsXG4gICAgXCJhZGRyZXNzXCI6IFwiMjExMSBOb3Jmb2xrIFN0LCBIb3VzdG9uLCBUWFwiLFxuICAgIFwibGF0XCI6IDI5LjczMjQ1MixcbiAgICBcImxuZ1wiOiAtOTUuNDExMDU4XG4gIH0sXG4gIHtcbiAgICBcIm5hbWVcIjogXCJTdGFyIFBpenphIElJXCIsXG4gICAgXCJhZGRyZXNzXCI6IFwiNzcgSGFydmFyZCBTdCwgSG91c3RvbiwgVFhcIixcbiAgICBcImxhdFwiOiAyOS43NzA3NTEsXG4gICAgXCJsbmdcIjogLTk1LjM5NjA0MlxuICB9LFxuICB7XG4gICAgXCJuYW1lXCI6IFwiQnJvdGhlcnMgUGl6emVyaWFcIixcbiAgICBcImFkZHJlc3NcIjogXCIxMDI5IEhpZ2h3YXkgNiBOICMgMTAwLCBIb3VzdG9uLCBUWFwiLFxuICAgIFwibGF0XCI6IDI5Ljc2ODMzNyxcbiAgICBcImxuZ1wiOiAtOTUuNjQzNTk0XG4gIH0sXG4gIHtcbiAgICBcIm5hbWVcIjogXCIxMXRoIFN0cmVldCBDYWZlIEluY1wiLFxuICAgIFwiYWRkcmVzc1wiOiBcIjc0OCBFIDExdGggU3QsIEhvdXN0b24sIFRYXCIsXG4gICAgXCJsYXRcIjogMjkuNzkwNzk0LFxuICAgIFwibG5nXCI6IC05NS4zODg5MjFcbiAgfSxcbiAge1xuICAgIFwibmFtZVwiOiBcIkNhbGlmb3JuaWEgUGl6emEgS2l0Y2hlblwiLFxuICAgIFwiYWRkcmVzc1wiOiBcIjE3MDUgUG9zdCBPYWsgQmx2ZCAjIEEsIEhvdXN0b24sIFRYXCIsXG4gICAgXCJsYXRcIjogMjkuNzUwMTcyLFxuICAgIFwibG5nXCI6IC05NS40NjExOTlcbiAgfSxcbiAge1xuICAgIFwibmFtZVwiOiBcIkNvbGxpbmEncyBJdGFsaWFuIENhZmVcIixcbiAgICBcImFkZHJlc3NcIjogXCIzODM1IFJpY2htb25kIEF2ZSwgSG91c3RvbiwgVFhcIixcbiAgICBcImxhdFwiOiAyOS43MzI2MixcbiAgICBcImxuZ1wiOiAtOTUuNDM4OTY0XG4gIH0sXG4gIHtcbiAgICBcIm5hbWVcIjogXCJCYXJyeSdzIFBpenphICYgSXRhbGlhbiBEaW5lclwiLFxuICAgIFwiYWRkcmVzc1wiOiBcIjYwMDMgUmljaG1vbmQgQXZlLCBIb3VzdG9uLCBUWFwiLFxuICAgIFwibGF0XCI6IDI5LjczMTQzLFxuICAgIFwibG5nXCI6IC05NS40ODQzODJcbiAgfSxcbiAge1xuICAgIFwibmFtZVwiOiBcIk1hcmlvJ3MgU2Vhd2FsbCBJdGFsaWFuIFJlc3RhdXJhbnRcIixcbiAgICBcImFkZHJlc3NcIjogXCI2MjggU2Vhd2FsbCBCbHZkLCBHYWx2ZXN0b24sIFRYXCIsXG4gICAgXCJsYXRcIjogMjkuMzA0NTQyLFxuICAgIFwibG5nXCI6IC05NC43NzI1OThcbiAgfSxcbiAge1xuICAgIFwibmFtZVwiOiBcIkNhbXBpc2kncyBFZ3lwdGlhbiBSZXN0YXVyYW50XCIsXG4gICAgXCJhZGRyZXNzXCI6IFwiNTYxMCBFIE1vY2tpbmdiaXJkIExuLCBEYWxsYXMsIFRYXCIsXG4gICAgXCJsYXRcIjogMzIuODM2NTEsXG4gICAgXCJsbmdcIjogLTk2Ljc3MTc4MVxuICB9LFxuICB7XG4gICAgXCJuYW1lXCI6IFwiRmF0IEpvZSdzIFBpenphIFBhc3RhICYgQmFyXCIsXG4gICAgXCJhZGRyZXNzXCI6IFwiNDcyMSBXIFBhcmsgQmx2ZCAjIDEwMSwgUGxhbm8sIFRYXCIsXG4gICAgXCJsYXRcIjogMzMuMDI3MDU1LFxuICAgIFwibG5nXCI6IC05Ni43ODg5MTJcbiAgfSxcbiAge1xuICAgIFwibmFtZVwiOiBcIlNhY2NvbmUncyBQaXp6YVwiLFxuICAgIFwiYWRkcmVzc1wiOiBcIjEzODEyIE4gSGlnaHdheSAxODMsIEF1c3RpbiwgVFhcIixcbiAgICBcImxhdFwiOiAyOS41Njk1MDcsXG4gICAgXCJsbmdcIjogLTk3Ljk2NDY2M1xuICB9LFxuICB7XG4gICAgXCJuYW1lXCI6IFwiRmlyZXNpZGUgUGllc1wiLFxuICAgIFwiYWRkcmVzc1wiOiBcIjI4MjAgTiBIZW5kZXJzb24gQXZlLCBEYWxsYXMsIFRYXCIsXG4gICAgXCJsYXRcIjogMzIuODE5NzYyLFxuICAgIFwibG5nXCI6IC05Ni43ODQxNDhcbiAgfSxcbiAge1xuICAgIFwibmFtZVwiOiBcIlJvbWVvJ3NcIixcbiAgICBcImFkZHJlc3NcIjogXCIxNTAwIEJhcnRvbiBTcHJpbmdzIFJkLCBBdXN0aW4sIFRYXCIsXG4gICAgXCJsYXRcIjogMzAuMjYxNTI2LFxuICAgIFwibG5nXCI6IC05Ny43NjAwMjJcbiAgfSxcbiAge1xuICAgIFwibmFtZVwiOiBcIlNhbmRlbGxhJ3MgQ2FmZVwiLFxuICAgIFwiYWRkcmVzc1wiOiBcIjU5MTAgTiBNYWNhcnRodXIgQmx2ZCwgSXJ2aW5nLCBUWFwiLFxuICAgIFwibGF0XCI6IDMyLjg5MjAwMixcbiAgICBcImxuZ1wiOiAtOTYuOTYxMTg4XG4gIH0sXG4gIHtcbiAgICBcIm5hbWVcIjogXCJNYW5naWEgQ2hpY2FnbyBTdHVmZmVkIFBpenphXCIsXG4gICAgXCJhZGRyZXNzXCI6IFwiMzUwMCBHdWFkYWx1cGUgU3QsIEF1c3RpbiwgVFhcIixcbiAgICBcImxhdFwiOiAzMC4zMDE1NDMsXG4gICAgXCJsbmdcIjogLTk3LjczOTExMlxuICB9LFxuICB7XG4gICAgXCJuYW1lXCI6IFwiRnJhbmsgJiBBbmdpZSdzXCIsXG4gICAgXCJhZGRyZXNzXCI6IFwiNTA4IFdlc3QgQXZlLCBBdXN0aW4sIFRYXCIsXG4gICAgXCJsYXRcIjogMzAuMjY5MzkzLFxuICAgIFwibG5nXCI6IC05Ny43NTA4ODlcbiAgfSxcbiAge1xuICAgIFwibmFtZVwiOiBcIlBpenplcmlhIEJpYW5jb1wiLFxuICAgIFwiYWRkcmVzc1wiOiBcIjYyMyBFIEFkYW1zIFN0LCBQaG9lbml4LCBBWlwiLFxuICAgIFwibGF0XCI6IDMzLjQ0OTM3NyxcbiAgICBcImxuZ1wiOiAtMTEyLjA2NTUyMVxuICB9LFxuICB7XG4gICAgXCJuYW1lXCI6IFwiU2FtbXkncyBXb29kZmlyZWQgUGl6emFcIixcbiAgICBcImFkZHJlc3NcIjogXCI3NzAgNHRoIEF2ZSwgU2FuIERpZWdvLCBDQVwiLFxuICAgIFwibGF0XCI6IDMyLjcxMzM4MixcbiAgICBcImxuZ1wiOiAtMTE3LjE2MTE4XG4gIH0sXG4gIHtcbiAgICBcIm5hbWVcIjogXCJDYXNhIEJpYW5jYSBQaXp6YSBQaWVcIixcbiAgICBcImFkZHJlc3NcIjogXCIxNjUwIENvbG9yYWRvIEJsdmQsIExvcyBBbmdlbGVzLCBDQVwiLFxuICAgIFwibGF0XCI6IDM0LjEzOTE1OSxcbiAgICBcImxuZ1wiOiAtMTE4LjIwNDYwOFxuICB9LFxuICB7XG4gICAgXCJuYW1lXCI6IFwiUGFya3dheSBHcmlsbFwiLFxuICAgIFwiYWRkcmVzc1wiOiBcIjUxMCBTIEFycm95byBQa3d5LCBQYXNhZGVuYSwgQ0FcIixcbiAgICBcImxhdFwiOiAzNC4xMzcwMDMsXG4gICAgXCJsbmdcIjogLTExOC4xNDczMDNcbiAgfSxcbiAge1xuICAgIFwibmFtZVwiOiBcIkNhbGlmb3JuaWEgUGl6emEgS2l0Y2hlblwiLFxuICAgIFwiYWRkcmVzc1wiOiBcIjMzMCBTIEhvcGUgU3QsIExvcyBBbmdlbGVzLCBDQVwiLFxuICAgIFwibGF0XCI6IDM0LjA1MzMzLFxuICAgIFwibG5nXCI6IC0xMTguMjUyNjgzXG4gIH0sXG4gIHtcbiAgICBcIm5hbWVcIjogXCJCIEoncyBQaXp6YSAmIEdyaWxsXCIsXG4gICAgXCJhZGRyZXNzXCI6IFwiMjAwIE1haW4gU3QgIyAxMDEsIEh1bnRpbmd0b24gQmVhY2gsIENBXCIsXG4gICAgXCJsYXRcIjogMzMuNjU4MDU4LFxuICAgIFwibG5nXCI6IC0xMTguMDAxMTAxXG4gIH0sXG4gIHtcbiAgICBcIm5hbWVcIjogXCJCIEoncyBSZXN0YXVyYW50ICYgQnJld2hvdXNlXCIsXG4gICAgXCJhZGRyZXNzXCI6IFwiMjgwIFMgQ29hc3QgSHd5LCBMYWd1bmEgQmVhY2gsIENBXCIsXG4gICAgXCJsYXRcIjogMzMuNTQyMDksXG4gICAgXCJsbmdcIjogLTExNy43ODM1MTZcbiAgfSxcbiAge1xuICAgIFwibmFtZVwiOiBcIkJlYXUgSm8ncyBQaXp6YVwiLFxuICAgIFwiYWRkcmVzc1wiOiBcIjI3MTAgUyBDb2xvcmFkbyBCbHZkLCBEZW52ZXIsIENPXCIsXG4gICAgXCJsYXRcIjogMzkuNjY3MzQyLFxuICAgIFwibG5nXCI6IC0xMDQuOTQwNzA4XG4gIH0sXG4gIHtcbiAgICBcIm5hbWVcIjogXCJQYXNxdWluaSdzIFBpenplcmlhXCIsXG4gICAgXCJhZGRyZXNzXCI6IFwiMTMxMCBTIEJyb2Fkd2F5LCBEZW52ZXIsIENPXCIsXG4gICAgXCJsYXRcIjogMzkuNjkyODI0LFxuICAgIFwibG5nXCI6IC0xMDQuOTg3NDYzXG4gIH0sXG4gIHtcbiAgICBcIm5hbWVcIjogXCJGYXJnb3MgUGl6emEgQ29cIixcbiAgICBcImFkZHJlc3NcIjogXCIyOTEwIEUgUGxhdHRlIEF2ZSwgQ29sb3JhZG8gU3ByaW5ncywgQ09cIixcbiAgICBcImxhdFwiOiAzOC44Mzk4NDcsXG4gICAgXCJsbmdcIjogLTEwNC43NzQ0MjNcbiAgfSxcbiAge1xuICAgIFwibmFtZVwiOiBcIk9sZCBDaGljYWdvXCIsXG4gICAgXCJhZGRyZXNzXCI6IFwiMTQxNSBNYXJrZXQgU3QsIERlbnZlciwgQ09cIixcbiAgICBcImxhdFwiOiAzOS43NDgxNzcsXG4gICAgXCJsbmdcIjogLTEwNS4wMDA1MDFcbiAgfSxcbiAge1xuICAgIFwibmFtZVwiOiBcIlNpbmtcIixcbiAgICBcImFkZHJlc3NcIjogXCIxMTY1IDEzdGggU3QsIEJvdWxkZXIsIENPXCIsXG4gICAgXCJsYXRcIjogNDAuMDA4MjEsXG4gICAgXCJsbmdcIjogLTEwNS4yNzYyMzZcbiAgfSxcbiAge1xuICAgIFwibmFtZVwiOiBcIkxpZ29yaSdzIFBpenphICYgUGFzdGFcIixcbiAgICBcImFkZHJlc3NcIjogXCI0NDIxIEhhcnJpc29uIEJsdmQsIE9nZGVuLCBVVFwiLFxuICAgIFwibGF0XCI6IDQxLjE4MjczMixcbiAgICBcImxuZ1wiOiAtMTExLjk0OTE5OVxuICB9LFxuICB7XG4gICAgXCJuYW1lXCI6IFwiT2xkIENoaWNhZ29cIixcbiAgICBcImFkZHJlc3NcIjogXCIxMTAyIFBlYXJsIFN0LCBCb3VsZGVyLCBDT1wiLFxuICAgIFwibGF0XCI6IDQwLjAxNzU5MSxcbiAgICBcImxuZ1wiOiAtMTA1LjI4MDk5XG4gIH0sXG4gIHtcbiAgICBcIm5hbWVcIjogXCJCb3N0b24ncyBSZXN0YXVyYW50ICYgU3BvcnRzXCIsXG4gICAgXCJhZGRyZXNzXCI6IFwiNjIwIEUgRGlzayBEciwgUmFwaWQgQ2l0eSwgU0RcIixcbiAgICBcImxhdFwiOiA0NC4xMDY5MzgsXG4gICAgXCJsbmdcIjogLTEwMy4yMDUyMjZcbiAgfSxcbiAge1xuICAgIFwibmFtZVwiOiBcIkNodWNrIEUgQ2hlZXNlJ3MgUGl6emFcIixcbiAgICBcImFkZHJlc3NcIjogXCIxMDAgMjR0aCBTdCBXICMgQiwgQmlsbGluZ3MsIE1UXCIsXG4gICAgXCJsYXRcIjogNDUuNzcxMzU1LFxuICAgIFwibG5nXCI6IC0xMDguNTc2MjlcbiAgfSxcbiAge1xuICAgIFwibmFtZVwiOiBcIlNwYWNlIEFsaWVucyBHcmlsbCAmIEJhclwiLFxuICAgIFwiYWRkcmVzc1wiOiBcIjEzMDQgRSBDZW50dXJ5IEF2ZSwgQmlzbWFyY2ssIE5EXCIsXG4gICAgXCJsYXRcIjogNDYuODM4MDgsXG4gICAgXCJsbmdcIjogLTEwMC43NzE3MzRcbiAgfSxcbiAge1xuICAgIFwibmFtZVwiOiBcIjJuZCBTdHJlZXQgQmlzdHJvXCIsXG4gICAgXCJhZGRyZXNzXCI6IFwiMTIzIE5vcnRoIDJuZCBTdHJlZXQsIExpdmluZ3N0b24sIE1UXCIsXG4gICAgXCJsYXRcIjogNDUuNjYxMDE0LFxuICAgIFwibG5nXCI6IC0xMTAuNTYxNDIyXG4gIH0sXG4gIHtcbiAgICBcIm5hbWVcIjogXCJEb21pbm8ncyBQaXp6YVwiLFxuICAgIFwiYWRkcmVzc1wiOiBcIjE1MjQgUyBCcm9hZHdheSAjIDEsIE1pbm90LCBORFwiLFxuICAgIFwibGF0XCI6IDQ4LjIxOTY1NyxcbiAgICBcImxuZ1wiOiAtMTAxLjI5NjAzN1xuICB9LFxuICB7XG4gICAgXCJuYW1lXCI6IFwiQW1lcmljYW4gQ2xhc3NpYyBQaXp6ZXJpYVwiLFxuICAgIFwiYWRkcmVzc1wiOiBcIjE3NDQgR3JhbmQgQXZlLCBCaWxsaW5ncywgTVRcIixcbiAgICBcImxhdFwiOiA0NS43ODQxMixcbiAgICBcImxuZ1wiOiAtMTA4LjU2MDIwNVxuICB9LFxuICB7XG4gICAgXCJuYW1lXCI6IFwiR29kZmF0aGVyJ3MgUGl6emFcIixcbiAgICBcImFkZHJlc3NcIjogXCI5MDUgTWFpbiBTdCwgQmlsbGluZ3MsIE1UXCIsXG4gICAgXCJsYXRcIjogNDUuODE1MDgsXG4gICAgXCJsbmdcIjogLTEwOC40NzA3NThcbiAgfSxcbiAge1xuICAgIFwibmFtZVwiOiBcIlBhcGEgSm9obidzIFBpenphXCIsXG4gICAgXCJhZGRyZXNzXCI6IFwiNjA1IE1haW4gU3QsIEJpbGxpbmdzLCBNVFwiLFxuICAgIFwibGF0XCI6IDQ1LjgxMDIyMixcbiAgICBcImxuZ1wiOiAtMTA4LjQ3MjEyNVxuICB9LFxuICB7XG4gICAgXCJuYW1lXCI6IFwiQWFyZHZhcmsgUGl6emEgJiBTdWJcIixcbiAgICBcImFkZHJlc3NcIjogXCIzMDRBIENhcmlib3UgU3QsIEJhbmZmLCBBQlwiLFxuICAgIFwibGF0XCI6IDUxLjE3NjQ4OCxcbiAgICBcImxuZ1wiOiAtMTE1LjU3MDc1MVxuICB9LFxuICB7XG4gICAgXCJuYW1lXCI6IFwiSmFzcGVyIFBpenphIFBsYWNlXCIsXG4gICAgXCJhZGRyZXNzXCI6IFwiNDAyIENvbm5hdWdodCBEciwgSmFzcGVyLCBBQlwiLFxuICAgIFwibGF0XCI6IDUyLjg3OTA4NSxcbiAgICBcImxuZ1wiOiAtMTE4LjA3OTMxOVxuICB9LFxuICB7XG4gICAgXCJuYW1lXCI6IFwiT2R5c3NleSBQaXp6YSAmIFN0ZWFrIEhvdXNlXCIsXG4gICAgXCJhZGRyZXNzXCI6IFwiMy0zODE0IEJvdyBUcmFpbCBTVywgQ2FsZ2FyeSwgQUJcIixcbiAgICBcImxhdFwiOiA1MS4wNDUyMzMsXG4gICAgXCJsbmdcIjogLTExNC4xNDEyNDlcbiAgfSxcbiAge1xuICAgIFwibmFtZVwiOiBcIkJhc2lsJ3MgUGl6emFcIixcbiAgICBcImFkZHJlc3NcIjogXCIyMTE4IDMzIEF2ZW51ZSBTVywgQ2FsZ2FyeSwgQUJcIixcbiAgICBcImxhdFwiOiA1MS4wMjM5ODEsXG4gICAgXCJsbmdcIjogLTExNC4xMDk5MDNcbiAgfSxcbiAge1xuICAgIFwibmFtZVwiOiBcIkNhc3RsZSBQaXp6YSAmIERvbmFpclwiLFxuICAgIFwiYWRkcmVzc1wiOiBcIjc3MjQgRWxib3cgRHJpdmUgU1csIENhbGdhcnksIEFCXCIsXG4gICAgXCJsYXRcIjogNTAuOTg0NDk3LFxuICAgIFwibG5nXCI6IC0xMTQuMDgzMTVcbiAgfSxcbiAge1xuICAgIFwibmFtZVwiOiBcIlNhbnRhIEx1Y2lhIEl0YWxpYW4gUmVzdGF1cmFudFwiLFxuICAgIFwiYWRkcmVzc1wiOiBcIjcxNCA4IFN0LCBDYW5tb3JlLCBBQlwiLFxuICAgIFwibGF0XCI6IDUxLjA4OTE5NSxcbiAgICBcImxuZ1wiOiAtMTE1LjM1ODczM1xuICB9LFxuICB7XG4gICAgXCJuYW1lXCI6IFwiVG9wcyBQaXp6YSAmIFN0ZWFrIEhvdXNlIE5vIDNcIixcbiAgICBcImFkZHJlc3NcIjogXCI3LTU2MDIgNCBTdHJlZXQgTlcsIENhbGdhcnksIEFCXCIsXG4gICAgXCJsYXRcIjogNTEuMTAxMjA1LFxuICAgIFwibG5nXCI6IC0xMTQuMDcxNDU4XG4gIH0sXG4gIHtcbiAgICBcIm5hbWVcIjogXCJFdnZpYSBSZXN0YXVyYW50XCIsXG4gICAgXCJhZGRyZXNzXCI6IFwiODM3IE1haW4gU3QsIENhbm1vcmUsIEFCXCIsXG4gICAgXCJsYXRcIjogNTEuMDg5MTc3LFxuICAgIFwibG5nXCI6IC0xMTUuMzYxNzY3XG4gIH0sXG4gIHtcbiAgICBcIm5hbWVcIjogXCJEJiMzOTtCcm9ueFwiLFxuICAgIFwiYWRkcmVzc1wiOiBcIjM5MDQgQmVsbCBTdCwgS2Fuc2FzIENpdHksIE1PXCIsXG4gICAgXCJsYXRcIjogMzkuMDU3MTgyLFxuICAgIFwibG5nXCI6IC05NC42MDYxMDVcbiAgfSxcbiAge1xuICAgIFwibmFtZVwiOiBcIkNpY2VybydzIFJlc3RhdXJhbnQgJiBFbnRydG5tdFwiLFxuICAgIFwiYWRkcmVzc1wiOiBcIjY2OTEgRGVsbWFyIEJsdmQsIFN0IExvdWlzLCBNT1wiLFxuICAgIFwibGF0XCI6IDM4LjY1NjMwOCxcbiAgICBcImxuZ1wiOiAtOTAuMzA4NDM5XG4gIH0sXG4gIHtcbiAgICBcIm5hbWVcIjogXCJIaWRlYXdheSBQaXp6YVwiLFxuICAgIFwiYWRkcmVzc1wiOiBcIjY2MTYgTiBXZXN0ZXJuIEF2ZSwgT2tsYWhvbWEgQ2l0eSwgT0tcIixcbiAgICBcImxhdFwiOiAzNS41MzkxMTQsXG4gICAgXCJsbmdcIjogLTk3LjUyOTc2XG4gIH0sXG4gIHtcbiAgICBcIm5hbWVcIjogXCJGb3J0ZWwncyBQaXp6YSBEZW5cIixcbiAgICBcImFkZHJlc3NcIjogXCI3OTMyIE1hY2tlbnppZSBSZCwgU3QgTG91aXMsIE1PXCIsXG4gICAgXCJsYXRcIjogMzguNTY2NDQxLFxuICAgIFwibG5nXCI6IC05MC4zMjA3OTJcbiAgfSxcbiAge1xuICAgIFwibmFtZVwiOiBcIkhpZGVhd2F5IFBpenphXCIsXG4gICAgXCJhZGRyZXNzXCI6IFwiNzg3NyBFIDUxc3QgU3QsIFR1bHNhLCBPS1wiLFxuICAgIFwibGF0XCI6IDM2LjA4OTg5NyxcbiAgICBcImxuZ1wiOiAtOTUuODg5MjQxXG4gIH0sXG4gIHtcbiAgICBcIm5hbWVcIjogXCJGYXJvdHRvJ3MgQ2F0ZXJpbmdcIixcbiAgICBcImFkZHJlc3NcIjogXCI5NTI1IE1hbmNoZXN0ZXIgUmQsIFdlYnN0ZXIgR3JvdmVzLCBNT1wiLFxuICAgIFwibGF0XCI6IDM4LjYwOTMyNyxcbiAgICBcImxuZ1wiOiAtOTAuMzY0NDM1XG4gIH0sXG4gIHtcbiAgICBcIm5hbWVcIjogXCJDYWxpZm9ybmlhIFBpenphIEtpdGNoZW5cIixcbiAgICBcImFkZHJlc3NcIjogXCIxNDkzIFNhaW50IExvdWlzIEdhbGxlcmlhLCBTdCBMb3VpcywgTU9cIixcbiAgICBcImxhdFwiOiAzOC42MzM2MTMsXG4gICAgXCJsbmdcIjogLTkwLjM0NTk0OVxuICB9LFxuICB7XG4gICAgXCJuYW1lXCI6IFwiRCdCcm9ueFwiLFxuICAgIFwiYWRkcmVzc1wiOiBcIjI0NTAgR3JhbmQgQmx2ZCAjIDEyNCwgS2Fuc2FzIENpdHksIE1PXCIsXG4gICAgXCJsYXRcIjogMzkuMDgyNzIzLFxuICAgIFwibG5nXCI6IC05NC41ODE3OFxuICB9LFxuICB7XG4gICAgXCJuYW1lXCI6IFwiR2l1c2VwcGUncyBEZXBvdCBSZXN0YXVyYW50XCIsXG4gICAgXCJhZGRyZXNzXCI6IFwiMTAgUyBTaWVycmEgTWFkcmUgU3QsIENvbG9yYWRvIFNwcmluZ3MsIENPXCIsXG4gICAgXCJsYXRcIjogMzguODM0NTQ4LFxuICAgIFwibG5nXCI6IC0xMDQuODI4Mjk3XG4gIH0sXG4gIHtcbiAgICBcIm5hbWVcIjogXCJPbGQgQ2hpY2Fnb1wiLFxuICAgIFwiYWRkcmVzc1wiOiBcIjE0MTUgTWFya2V0IFN0LCBEZW52ZXIsIENPXCIsXG4gICAgXCJsYXRcIjogMzkuNzQ4MTc3LFxuICAgIFwibG5nXCI6IC0xMDUuMDAwNTAxXG4gIH0sXG4gIHtcbiAgICBcIm5hbWVcIjogXCJCcmljayBPdmVuIFJlc3RhdXJhbnRcIixcbiAgICBcImFkZHJlc3NcIjogXCIxMTEgRSA4MDAgTiwgUHJvdm8sIFVUXCIsXG4gICAgXCJsYXRcIjogNDAuMjQ0NDkzLFxuICAgIFwibG5nXCI6IC0xMTEuNjU2MzIyXG4gIH0sXG4gIHtcbiAgICBcIm5hbWVcIjogXCJaYWNoYXJ5J3MgQ2hpY2FnbyBQaXp6YVwiLFxuICAgIFwiYWRkcmVzc1wiOiBcIjU4MDEgQ29sbGVnZSBBdmUsIE9ha2xhbmQsIENBXCIsXG4gICAgXCJsYXRcIjogMzcuODQ2MTc5LFxuICAgIFwibG5nXCI6IC0xMjIuMjUxOTUxXG4gIH0sXG4gIHtcbiAgICBcIm5hbWVcIjogXCJaYWNoYXJ5J3MgQ2hpY2FnbyBQaXp6YVwiLFxuICAgIFwiYWRkcmVzc1wiOiBcIjE4NTMgU29sYW5vIEF2ZSwgQmVya2VsZXksIENBXCIsXG4gICAgXCJsYXRcIjogMzcuODkxNDA3LFxuICAgIFwibG5nXCI6IC0xMjIuMjc4NDNcbiAgfSxcbiAge1xuICAgIFwibmFtZVwiOiBcIkNoZWVzZSBCb2FyZCBQaXp6YVwiLFxuICAgIFwiYWRkcmVzc1wiOiBcIjE1MTIgU2hhdHR1Y2sgQXZlLCBCZXJrZWxleSwgQ0FcIixcbiAgICBcImxhdFwiOiAzNy44Nzk5NzYsXG4gICAgXCJsbmdcIjogLTEyMi4yNjkyNzVcbiAgfSxcbiAge1xuICAgIFwibmFtZVwiOiBcIkdvYXQgSGlsbCBQaXp6YVwiLFxuICAgIFwiYWRkcmVzc1wiOiBcIjMwMCBDb25uZWN0aWN1dCBTdCwgU2FuIEZyYW5jaXNjbywgQ0FcIixcbiAgICBcImxhdFwiOiAzNy43NjI0MzEsXG4gICAgXCJsbmdcIjogLTEyMi4zOTc2MTdcbiAgfSxcbiAge1xuICAgIFwibmFtZVwiOiBcIlRvbW1hc28gUmlzdG9yYW50ZSBJdGFsaWFub1wiLFxuICAgIFwiYWRkcmVzc1wiOiBcIjEwNDIgS2Vhcm55IFN0LCBTYW4gRnJhbmNpc2NvLCBDQVwiLFxuICAgIFwibGF0XCI6IDM3Ljc5NzM4OCxcbiAgICBcImxuZ1wiOiAtMTIyLjQwNTM3NFxuICB9LFxuICB7XG4gICAgXCJuYW1lXCI6IFwiTGl0dGxlIFN0YXIgUGl6emEgTExDXCIsXG4gICAgXCJhZGRyZXNzXCI6IFwiODQ2IERpdmlzYWRlcm8gU3QsIFNhbiBGcmFuY2lzY28sIENBXCIsXG4gICAgXCJsYXRcIjogMzcuNzc3NTIsXG4gICAgXCJsbmdcIjogLTEyMi40MzgyMTVcbiAgfSxcbiAge1xuICAgIFwibmFtZVwiOiBcIlBhdWxpbmUncyBQaXp6YVwiLFxuICAgIFwiYWRkcmVzc1wiOiBcIjI2MCBWYWxlbmNpYSwgU2FuIEZyYW5jaXNjbywgQ0FcIixcbiAgICBcImxhdFwiOiAzNy43Njg3MjUsXG4gICAgXCJsbmdcIjogLTEyMi40MjIyNDVcbiAgfSxcbiAge1xuICAgIFwibmFtZVwiOiBcIlZpbGxhIFJvbWFuYSBQaXp6ZXJpYSAmIFJzdHJudFwiLFxuICAgIFwiYWRkcmVzc1wiOiBcIjczMSBJcnZpbmcgU3QsIFNhbiBGcmFuY2lzY28sIENBXCIsXG4gICAgXCJsYXRcIjogMzcuNzY0MDc0LFxuICAgIFwibG5nXCI6IC0xMjIuNDY1NTgxXG4gIH0sXG4gIHtcbiAgICBcIm5hbWVcIjogXCJBbWljaSdzIEVhc3QgQ29hc3QgUGl6emVyaWFcIixcbiAgICBcImFkZHJlc3NcIjogXCI2OSBFIDNyZCBBdmUsIFNhbiBNYXRlbywgQ0FcIixcbiAgICBcImxhdFwiOiAzNy41NjM4OTYsXG4gICAgXCJsbmdcIjogLTEyMi4zMjQ3MlxuICB9LFxuICB7XG4gICAgXCJuYW1lXCI6IFwiQW1pY2kncyBFYXN0IENvYXN0IFBpenplcmlhXCIsXG4gICAgXCJhZGRyZXNzXCI6IFwiMjI2IFJlZHdvb2QgU2hvcmVzIFBrd3ksIFJlZHdvb2QgQ2l0eSwgQ0FcIixcbiAgICBcImxhdFwiOiAzNy41MjA1MTYsXG4gICAgXCJsbmdcIjogLTEyMi4yNTIyNTVcbiAgfSxcbiAge1xuICAgIFwibmFtZVwiOiBcIk5vcnRoIEJlYWNoIFBpenphXCIsXG4gICAgXCJhZGRyZXNzXCI6IFwiMjQwIEUgM3JkIEF2ZSwgU2FuIE1hdGVvLCBDQVwiLFxuICAgIFwibGF0XCI6IDM3LjU2NTMyNSxcbiAgICBcImxuZ1wiOiAtMTIyLjMyMjY0M1xuICB9LFxuICB7XG4gICAgXCJuYW1lXCI6IFwiUGF0eGkncyBDaGljYWdvIFBpenphXCIsXG4gICAgXCJhZGRyZXNzXCI6IFwiNDQxIEVtZXJzb24gU3QsIFBhbG8gQWx0bywgQ0FcIixcbiAgICBcImxhdFwiOiAzNy40NDUxNDgsXG4gICAgXCJsbmdcIjogLTEyMi4xNjM1NTNcbiAgfSxcbiAge1xuICAgIFwibmFtZVwiOiBcIlBpenonYSBDaGljYWdvXCIsXG4gICAgXCJhZGRyZXNzXCI6IFwiNDExNSBFbCBDYW1pbm8gUmVhbCwgUGFsbyBBbHRvLCBDQVwiLFxuICAgIFwibGF0XCI6IDM3LjQxNDEwNixcbiAgICBcImxuZ1wiOiAtMTIyLjEyNjIyM1xuICB9LFxuICB7XG4gICAgXCJuYW1lXCI6IFwiQ2FsaWZvcm5pYSBQaXp6YSBLaXRjaGVuXCIsXG4gICAgXCJhZGRyZXNzXCI6IFwiNTMxIENvd3BlciBTdCwgUGFsbyBBbHRvLCBDQVwiLFxuICAgIFwibGF0XCI6IDM3LjQ0ODA3NSxcbiAgICBcImxuZ1wiOiAtMTIyLjE1ODgxM1xuICB9LFxuICB7XG4gICAgXCJuYW1lXCI6IFwiV2luZHkgQ2l0eSBQaXp6YVwiLFxuICAgIFwiYWRkcmVzc1wiOiBcIjM1IEJvdmV0IFJkLCBTYW4gTWF0ZW8sIENBXCIsXG4gICAgXCJsYXRcIjogMzcuNTUxNTYyLFxuICAgIFwibG5nXCI6IC0xMjIuMzE0NTI1XG4gIH0sXG4gIHtcbiAgICBcIm5hbWVcIjogXCJBcHBsZXdvb2QgUGl6emEgMiBHb1wiLFxuICAgIFwiYWRkcmVzc1wiOiBcIjEwMDEgRWwgQ2FtaW5vIFJlYWwsIE1lbmxvIFBhcmssIENBXCIsXG4gICAgXCJsYXRcIjogMzcuNDUyOTY2LFxuICAgIFwibG5nXCI6IC0xMjIuMTgxNzIyXG4gIH0sXG4gIHtcbiAgICBcIm5hbWVcIjogXCJQaXp6YSBBbnRpY2FcIixcbiAgICBcImFkZHJlc3NcIjogXCIzMzQgU2FudGFuYSBSb3cgIyAxMDY1LCBTYW4gSm9zZSwgQ0FcIixcbiAgICBcImxhdFwiOiAzNy4zMjE3OTIsXG4gICAgXCJsbmdcIjogLTEyMS45NDc3MzVcbiAgfSxcbiAge1xuICAgIFwibmFtZVwiOiBcIlBpenonYSBDaGljYWdvXCIsXG4gICAgXCJhZGRyZXNzXCI6IFwiMTU1IFcgU2FuIEZlcm5hbmRvIFN0LCBTYW4gSm9zZSwgQ0FcIixcbiAgICBcImxhdFwiOiAzNy4zMzMyNzcsXG4gICAgXCJsbmdcIjogLTEyMS44OTE2NzdcbiAgfSxcbiAge1xuICAgIFwibmFtZVwiOiBcIkhvdXNlIG9mIFBpenphXCIsXG4gICAgXCJhZGRyZXNzXCI6IFwiNTI3IFMgQWxtYWRlbiBBdmUsIFNhbiBKb3NlLCBDQVwiLFxuICAgIFwibGF0XCI6IDM3LjMyNjM1MyxcbiAgICBcImxuZ1wiOiAtMTIxLjg4ODE2NVxuICB9LFxuICB7XG4gICAgXCJuYW1lXCI6IFwiQW1pY2kncyBFYXN0IENvYXN0IFBpenplcmlhXCIsXG4gICAgXCJhZGRyZXNzXCI6IFwiMjI1IFcgU2FudGEgQ2xhcmEgU3QsIFNhbiBKb3NlLCBDQVwiLFxuICAgIFwibGF0XCI6IDM3LjMzNDcwMixcbiAgICBcImxuZ1wiOiAtMTIxLjg5NDA0NVxuICB9LFxuICB7XG4gICAgXCJuYW1lXCI6IFwiRmlvcmlsbG8ncyBSZXN0YXVyYW50XCIsXG4gICAgXCJhZGRyZXNzXCI6IFwiNjM4IEVsIENhbWlubyBSZWFsLCBTYW50YSBDbGFyYSwgQ0FcIixcbiAgICBcImxhdFwiOiAzNy4zNTQ2MDMsXG4gICAgXCJsbmdcIjogLTEyMS45NDI1NzdcbiAgfSxcbiAge1xuICAgIFwibmFtZVwiOiBcIlRvbnkgJiBBbGJhJ3MgUGl6emEgJiBQYXN0YVwiLFxuICAgIFwiYWRkcmVzc1wiOiBcIjMxMzcgU3RldmVucyBDcmVlayBCbHZkLCBTYW4gSm9zZSwgQ0FcIixcbiAgICBcImxhdFwiOiAzNy4zMjMyOTcsXG4gICAgXCJsbmdcIjogLTEyMS45NTE2NDZcbiAgfSxcbiAge1xuICAgIFwibmFtZVwiOiBcIkdpb3JnaW8nc1wiLFxuICAgIFwiYWRkcmVzc1wiOiBcIjE0NDUgRm94d29ydGh5IEF2ZSwgU2FuIEpvc2UsIENBXCIsXG4gICAgXCJsYXRcIjogMzcuMjc0NjQ4LFxuICAgIFwibG5nXCI6IC0xMjEuODkyODkzXG4gIH0sXG4gIHtcbiAgICBcIm5hbWVcIjogXCJSb3VuZCBUYWJsZSBQaXp6YVwiLFxuICAgIFwiYWRkcmVzc1wiOiBcIjQzMDIgTW9vcnBhcmsgQXZlLCBTYW4gSm9zZSwgQ0FcIixcbiAgICBcImxhdFwiOiAzNy4zMTU5MDMsXG4gICAgXCJsbmdcIjogLTEyMS45Nzc5MjVcbiAgfVxuXVxuIl19
