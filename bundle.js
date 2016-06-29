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

var mapDiv = document.createElement('div');
mapDiv.classList.add('map-container');
var map = new google.maps.Map(mapDiv, {
  center: { lat: 42.33012354634199, lng: -70.95623016357422 },
  zoom: 5,
  styles: _mapStyles2.default
});

function mapView(params, state, send) {
  var tree = html(_templateObject);

  //onload(tree, () => {
  loadMap(tree, state, send);
  //});

  return tree;
}

function loadMap(tree, state, send) {
  var stores = state.stores.visibleStores;
  tree.appendChild(mapDiv);

  stores.forEach(function (store) {
    store.marker = new google.maps.Marker({
      position: { lat: store.lat, lng: store.lng },
      title: store.name,
      label: 'P'
    });
    store.marker.addListener('click', function () {
      return send('stores:select', { payload: store });
    });
  });

  stores.forEach(function (store) {
    return store.marker.setMap(map);
  });
  setTimeout(function () {
    google.maps.event.trigger(map, 'resize');
  }, 500);
  state.stores.map = map;
}

},{"../map-styles.json":5,"choo":12,"on-load":34}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _templateObject = _taggedTemplateLiteral(['\n    <side-bar>\n      ', '\n      <button onclick=', '>All Locations</button>\n      <button onclick=', '>Closest Locations</button>\n      <ul>\n        ', '\n      </ul>\n    </side-bar>\n  '], ['\n    <side-bar>\n      ', '\n      <button onclick=', '>All Locations</button>\n      <button onclick=', '>Closest Locations</button>\n      <ul>\n        ', '\n      </ul>\n    </side-bar>\n  ']),
    _templateObject2 = _taggedTemplateLiteral(['\n              <li>\n                <a onclick=', '>\n                  ', '', '\n                </a>\n              </li>\n            '], ['\n              <li>\n                <a onclick=', '>\n                  ', '', '\n                </a>\n              </li>\n            ']);

exports.default = sideBarView;

var _choo = require('choo');

var _choo2 = _interopRequireDefault(_choo);

var _userLocation = require('./user-location');

var _userLocation2 = _interopRequireDefault(_userLocation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var html = _choo2.default.view;
function sideBarView(params, state, send) {
  var allStores = state.stores.visibleStores;

  var tree = html(_templateObject, (0, _userLocation2.default)(params, state, send), function () {
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

},{"./user-location":3,"choo":12}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _templateObject = _taggedTemplateLiteral(['\n      <p>\n        You are located at: ', '\n      </p>\n    '], ['\n      <p>\n        You are located at: ', '\n      </p>\n    ']),
    _templateObject2 = _taggedTemplateLiteral(['<span></span>'], ['<span></span>']);

exports.default = userLocationView;

var _choo = require('choo');

var _choo2 = _interopRequireDefault(_choo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var html = _choo2.default.view;
function userLocationView(params, state, send) {
  var tree = void 0;

  if (state.stores.location) {
    tree = html(_templateObject, state.stores.location);
  } else {
    tree = html(_templateObject2);
  }

  return tree;
}

},{"choo":12}],4:[function(require,module,exports){
'use strict';

var _templateObject = _taggedTemplateLiteral(['\n    <main class="app">\n      ', '\n      ', '\n    </main>\n  '], ['\n    <main class="app">\n      ', '\n      ', '\n    </main>\n  ']);

var _choo = require('choo');

var _choo2 = _interopRequireDefault(_choo);

var _javascriptNaturalSort = require('javascript-natural-sort');

var _javascriptNaturalSort2 = _interopRequireDefault(_javascriptNaturalSort);

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
var geocoder = new google.maps.Geocoder();
var userMarker = new google.maps.Marker({
  animation: google.maps.Animation.DROP,
  icon: {
    path: google.maps.SymbolPath.CIRCLE,
    strokeColor: '#4285f4',
    scale: 5
  }
});

app.model({
  namespace: 'stores',
  state: {
    visibleStores: _stores2.default.sort(function (a, b) {
      return (0, _javascriptNaturalSort2.default)(a.name, b.name);
    }),
    userLocation: { lat: 42.33012354634199, lng: -70.95623016357422 },
    location: ''
  },

  reducers: {
    showAll: function showAll(action, state) {
      state.visibleStores = _stores2.default;
      userMarker.setMap(null);
      return state;
    },
    updateVisible: function updateVisible(action, state) {
      state.visibleStores.forEach(function (store) {
        if (store.marker) {
          store.marker.setMap(null);
        }
      });
      state.visibleStores = action.payload;
      state.userLocation = action.location.toJSON();
      return state;
    },
    updateLocation: function updateLocation(action, state) {
      state.location = action.location;
      return state;
    }
  },

  effects: {
    select: function select(action, state, send) {
      var store = action.payload;

      iw.setPosition({ lat: store.lat, lng: store.lng });
      iw.setContent('<b>' + store.name + '</b><br/>' + store.address);
      iw.open(state.map, store.marker);
    },
    showClosest: function showClosest(action, state, send) {
      navigator.geolocation.getCurrentPosition(function (position) {
        var userLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        var closest = _stores2.default.map(function (store) {
          var distance = computeDistanceBetween(new google.maps.LatLng(store.lat, store.lng), userLocation);
          // convert meters to miles, rounded up
          store.distance = Math.ceil(distance * 0.000621371);
          return store;
        }).filter(function (store) {
          return store.distance < 100;
        }).sort(function (a, b) {
          return (0, _javascriptNaturalSort2.default)(a.distance, b.distance);
        });

        if (state.map) {
          state.map.panTo(userLocation);
          state.map.setZoom(10);
          userMarker.setPosition(userLocation);
          userMarker.setMap(state.map);
        }

        send('stores:updateVisible', { payload: closest, location: userLocation });
        send('stores:geocodeLocation');
      });
    },
    geocodeLocation: function geocodeLocation(action, state, send) {
      geocoder.geocode({ location: state.userLocation }, function (results, status) {
        if (status === 'OK') {
          send('stores:updateLocation', { location: results[0].formatted_address });
        }
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

},{"./components/google-map":1,"./components/side-bar":2,"./stores":37,"choo":12,"javascript-natural-sort":33}],5:[function(require,module,exports){
module.exports=[{"featureType":"all","elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#000000"},{"lightness":40}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#000000"},{"lightness":16}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":17},{"weight":1.2}]},{"featureType":"administrative.locality","elementType":"labels.text.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":21}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":16}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":19}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":17}]}]

},{}],6:[function(require,module,exports){
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

},{"util/":11}],7:[function(require,module,exports){

},{}],8:[function(require,module,exports){
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

},{}],9:[function(require,module,exports){
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

},{}],10:[function(require,module,exports){
module.exports = function isBuffer(arg) {
  return arg && typeof arg === 'object'
    && typeof arg.copy === 'function'
    && typeof arg.fill === 'function'
    && typeof arg.readUInt8 === 'function';
}
},{}],11:[function(require,module,exports){
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

},{"./support/isBuffer":10,"_process":9,"inherits":8}],12:[function(require,module,exports){
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

},{"assert":6,"global/document":13,"hash-match":15,"send-action":16,"sheet-router":20,"sheet-router/hash":17,"sheet-router/history":18,"sheet-router/href":19,"xtend":25,"xtend/mutable":26,"yo-yo":27}],13:[function(require,module,exports){
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

},{"min-document":7}],14:[function(require,module,exports){
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

},{}],15:[function(require,module,exports){
module.exports = function hashMatch (hash, prefix) {
  var pre = prefix || '/';
  if (hash.length === 0) return pre;
  hash = hash.replace('#', '');
  hash = hash.replace(/\/$/, '')
  if (hash.indexOf('/') != 0) hash = '/' + hash;
  if (pre == '/') return hash;
  else return hash.replace(pre, '');
}

},{}],16:[function(require,module,exports){
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

},{"_process":9,"xtend":25}],17:[function(require,module,exports){
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

},{"assert":6,"global/window":14}],18:[function(require,module,exports){
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

},{"assert":6,"global/document":13,"global/window":14}],19:[function(require,module,exports){
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

},{"assert":6,"global/window":14}],20:[function(require,module,exports){
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

},{"assert":6,"pathname-match":21,"wayfarer":23}],21:[function(require,module,exports){
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

},{"assert":6}],22:[function(require,module,exports){

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


},{}],23:[function(require,module,exports){
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

},{"./trie":24,"assert":6,"sliced":22}],24:[function(require,module,exports){
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

},{"assert":6,"xtend":25,"xtend/mutable":26}],25:[function(require,module,exports){
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

},{}],26:[function(require,module,exports){
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

},{}],27:[function(require,module,exports){
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

},{"./update-events.js":32,"bel":28,"morphdom":31}],28:[function(require,module,exports){
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

},{"global/document":13,"hyperx":29}],29:[function(require,module,exports){
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

},{"hyperscript-attribute-to-property":30}],30:[function(require,module,exports){
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

},{}],31:[function(require,module,exports){
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

},{}],32:[function(require,module,exports){
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

},{}],33:[function(require,module,exports){
/*
 * Natural Sort algorithm for Javascript - Version 0.7 - Released under MIT license
 * Author: Jim Palmer (based on chunking idea from Dave Koelle)
 */
/*jshint unused:false */
module.exports = function naturalSort (a, b) {
	"use strict";
	var re = /(^([+\-]?(?:0|[1-9]\d*)(?:\.\d*)?(?:[eE][+\-]?\d+)?)?$|^0x[0-9a-f]+$|\d+)/gi,
		sre = /(^[ ]*|[ ]*$)/g,
		dre = /(^([\w ]+,?[\w ]+)?[\w ]+,?[\w ]+\d+:\d+(:\d+)?[\w ]?|^\d{1,4}[\/\-]\d{1,4}[\/\-]\d{1,4}|^\w+, \w+ \d+, \d{4})/,
		hre = /^0x[0-9a-f]+$/i,
		ore = /^0/,
		i = function(s) { return naturalSort.insensitive && ('' + s).toLowerCase() || '' + s; },
		// convert all to strings strip whitespace
		x = i(a).replace(sre, '') || '',
		y = i(b).replace(sre, '') || '',
		// chunk/tokenize
		xN = x.replace(re, '\0$1\0').replace(/\0$/,'').replace(/^\0/,'').split('\0'),
		yN = y.replace(re, '\0$1\0').replace(/\0$/,'').replace(/^\0/,'').split('\0'),
		// numeric, hex or date detection
		xD = parseInt(x.match(hre), 16) || (xN.length !== 1 && x.match(dre) && Date.parse(x)),
		yD = parseInt(y.match(hre), 16) || xD && y.match(dre) && Date.parse(y) || null,
		oFxNcL, oFyNcL;
	// first try and sort Hex codes or Dates
	if (yD) {
		if ( xD < yD ) { return -1; }
		else if ( xD > yD ) { return 1; }
	}
	// natural sorting through split numeric strings and default strings
	for(var cLoc=0, numS=Math.max(xN.length, yN.length); cLoc < numS; cLoc++) {
		// find floats not starting with '0', string or 0 if not defined (Clint Priest)
		oFxNcL = !(xN[cLoc] || '').match(ore) && parseFloat(xN[cLoc]) || xN[cLoc] || 0;
		oFyNcL = !(yN[cLoc] || '').match(ore) && parseFloat(yN[cLoc]) || yN[cLoc] || 0;
		// handle numeric vs string comparison - number < string - (Kyle Adams)
		if (isNaN(oFxNcL) !== isNaN(oFyNcL)) { return (isNaN(oFxNcL)) ? 1 : -1; }
		// rely on string comparison if different types - i.e. '02' < 2 != '02' < '2'
		else if (typeof oFxNcL !== typeof oFyNcL) {
			oFxNcL += '';
			oFyNcL += '';
		}
		if (oFxNcL < oFyNcL) { return -1; }
		if (oFxNcL > oFyNcL) { return 1; }
	}
	return 0;
};

},{}],34:[function(require,module,exports){
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

},{"global/document":35,"global/window":36}],35:[function(require,module,exports){
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

},{"min-document":7}],36:[function(require,module,exports){
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

},{}],37:[function(require,module,exports){
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

},{}]},{},[4])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJjb21wb25lbnRzL2dvb2dsZS1tYXAuanMiLCJjb21wb25lbnRzL3NpZGUtYmFyLmpzIiwiY29tcG9uZW50cy91c2VyLWxvY2F0aW9uLmpzIiwiaW5kZXguanMiLCJtYXAtc3R5bGVzLmpzb24iLCJub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYXNzZXJ0L2Fzc2VydC5qcyIsIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXJlc29sdmUvZW1wdHkuanMiLCJub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvaW5oZXJpdHMvaW5oZXJpdHNfYnJvd3Nlci5qcyIsIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9wcm9jZXNzL2Jyb3dzZXIuanMiLCJub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvdXRpbC9zdXBwb3J0L2lzQnVmZmVyQnJvd3Nlci5qcyIsIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy91dGlsL3V0aWwuanMiLCJub2RlX21vZHVsZXMvY2hvby9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9jaG9vL25vZGVfbW9kdWxlcy9nbG9iYWwvZG9jdW1lbnQuanMiLCJub2RlX21vZHVsZXMvY2hvby9ub2RlX21vZHVsZXMvZ2xvYmFsL3dpbmRvdy5qcyIsIm5vZGVfbW9kdWxlcy9jaG9vL25vZGVfbW9kdWxlcy9oYXNoLW1hdGNoL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2Nob28vbm9kZV9tb2R1bGVzL3NlbmQtYWN0aW9uL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2Nob28vbm9kZV9tb2R1bGVzL3NoZWV0LXJvdXRlci9oYXNoLmpzIiwibm9kZV9tb2R1bGVzL2Nob28vbm9kZV9tb2R1bGVzL3NoZWV0LXJvdXRlci9oaXN0b3J5LmpzIiwibm9kZV9tb2R1bGVzL2Nob28vbm9kZV9tb2R1bGVzL3NoZWV0LXJvdXRlci9ocmVmLmpzIiwibm9kZV9tb2R1bGVzL2Nob28vbm9kZV9tb2R1bGVzL3NoZWV0LXJvdXRlci9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9jaG9vL25vZGVfbW9kdWxlcy9zaGVldC1yb3V0ZXIvbm9kZV9tb2R1bGVzL3BhdGhuYW1lLW1hdGNoL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2Nob28vbm9kZV9tb2R1bGVzL3NoZWV0LXJvdXRlci9ub2RlX21vZHVsZXMvc2xpY2VkL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2Nob28vbm9kZV9tb2R1bGVzL3NoZWV0LXJvdXRlci9ub2RlX21vZHVsZXMvd2F5ZmFyZXIvaW5kZXguanMiLCJub2RlX21vZHVsZXMvY2hvby9ub2RlX21vZHVsZXMvc2hlZXQtcm91dGVyL25vZGVfbW9kdWxlcy93YXlmYXJlci90cmllLmpzIiwibm9kZV9tb2R1bGVzL2Nob28vbm9kZV9tb2R1bGVzL3h0ZW5kL2ltbXV0YWJsZS5qcyIsIm5vZGVfbW9kdWxlcy9jaG9vL25vZGVfbW9kdWxlcy94dGVuZC9tdXRhYmxlLmpzIiwibm9kZV9tb2R1bGVzL2Nob28vbm9kZV9tb2R1bGVzL3lvLXlvL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2Nob28vbm9kZV9tb2R1bGVzL3lvLXlvL25vZGVfbW9kdWxlcy9iZWwvaW5kZXguanMiLCJub2RlX21vZHVsZXMvY2hvby9ub2RlX21vZHVsZXMveW8teW8vbm9kZV9tb2R1bGVzL2JlbC9ub2RlX21vZHVsZXMvaHlwZXJ4L2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2Nob28vbm9kZV9tb2R1bGVzL3lvLXlvL25vZGVfbW9kdWxlcy9iZWwvbm9kZV9tb2R1bGVzL2h5cGVyeC9ub2RlX21vZHVsZXMvaHlwZXJzY3JpcHQtYXR0cmlidXRlLXRvLXByb3BlcnR5L2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2Nob28vbm9kZV9tb2R1bGVzL3lvLXlvL25vZGVfbW9kdWxlcy9tb3JwaGRvbS9saWIvaW5kZXguanMiLCJub2RlX21vZHVsZXMvY2hvby9ub2RlX21vZHVsZXMveW8teW8vdXBkYXRlLWV2ZW50cy5qcyIsIm5vZGVfbW9kdWxlcy9qYXZhc2NyaXB0LW5hdHVyYWwtc29ydC9uYXR1cmFsU29ydC5qcyIsIm5vZGVfbW9kdWxlcy9vbi1sb2FkL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL29uLWxvYWQvbm9kZV9tb2R1bGVzL2dsb2JhbC9kb2N1bWVudC5qcyIsIm5vZGVfbW9kdWxlcy9vbi1sb2FkL25vZGVfbW9kdWxlcy9nbG9iYWwvd2luZG93LmpzIiwic3RvcmVzLmpzb24iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7OztrQkNhd0IsTzs7QUFieEI7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7OztJQUVjLEksa0JBQU4sSTs7QUFDUixJQUFJLFNBQVMsU0FBUyxhQUFULENBQXVCLEtBQXZCLENBQWI7QUFDQSxPQUFPLFNBQVAsQ0FBaUIsR0FBakIsQ0FBcUIsZUFBckI7QUFDQSxJQUFJLE1BQU0sSUFBSSxPQUFPLElBQVAsQ0FBWSxHQUFoQixDQUFvQixNQUFwQixFQUE0QjtBQUNwQyxVQUFRLEVBQUUsS0FBSyxpQkFBUCxFQUEwQixLQUFLLENBQUMsaUJBQWhDLEVBRDRCO0FBRXBDLFFBQU0sQ0FGOEI7QUFHcEM7QUFIb0MsQ0FBNUIsQ0FBVjs7QUFNZSxTQUFTLE9BQVQsQ0FBaUIsTUFBakIsRUFBeUIsS0FBekIsRUFBZ0MsSUFBaEMsRUFBc0M7QUFDbkQsTUFBSSxPQUFPLElBQVAsaUJBQUo7OztBQU1FLFVBQVEsSUFBUixFQUFjLEtBQWQsRUFBcUIsSUFBckI7OztBQUdGLFNBQU8sSUFBUDtBQUNEOztBQUVELFNBQVMsT0FBVCxDQUFpQixJQUFqQixFQUF1QixLQUF2QixFQUE4QixJQUE5QixFQUFvQztBQUNsQyxNQUFJLFNBQVMsTUFBTSxNQUFOLENBQWEsYUFBMUI7QUFDQSxPQUFLLFdBQUwsQ0FBaUIsTUFBakI7O0FBRUEsU0FBTyxPQUFQLENBQWUsaUJBQVM7QUFDdEIsVUFBTSxNQUFOLEdBQWUsSUFBSSxPQUFPLElBQVAsQ0FBWSxNQUFoQixDQUF1QjtBQUNwQyxnQkFBVSxFQUFFLEtBQUssTUFBTSxHQUFiLEVBQWtCLEtBQUssTUFBTSxHQUE3QixFQUQwQjtBQUVwQyxhQUFPLE1BQU0sSUFGdUI7QUFHcEMsYUFBTztBQUg2QixLQUF2QixDQUFmO0FBS0EsVUFBTSxNQUFOLENBQWEsV0FBYixDQUF5QixPQUF6QixFQUFrQztBQUFBLGFBQU0sS0FBSyxlQUFMLEVBQXNCLEVBQUUsU0FBUyxLQUFYLEVBQXRCLENBQU47QUFBQSxLQUFsQztBQUNELEdBUEQ7O0FBU0EsU0FBTyxPQUFQLENBQWU7QUFBQSxXQUFTLE1BQU0sTUFBTixDQUFhLE1BQWIsQ0FBb0IsR0FBcEIsQ0FBVDtBQUFBLEdBQWY7QUFDQSxhQUFXLFlBQU07QUFDZixXQUFPLElBQVAsQ0FBWSxLQUFaLENBQWtCLE9BQWxCLENBQTBCLEdBQTFCLEVBQStCLFFBQS9CO0FBQ0QsR0FGRCxFQUVHLEdBRkg7QUFHQSxRQUFNLE1BQU4sQ0FBYSxHQUFiLEdBQW1CLEdBQW5CO0FBQ0Q7Ozs7Ozs7Ozs7OztrQkN2Q3VCLFc7O0FBTHhCOzs7O0FBQ0E7Ozs7Ozs7O0lBRWMsSSxrQkFBTixJO0FBRU8sU0FBUyxXQUFULENBQXFCLE1BQXJCLEVBQTZCLEtBQTdCLEVBQW9DLElBQXBDLEVBQTBDO0FBQ3ZELE1BQUksWUFBWSxNQUFNLE1BQU4sQ0FBYSxhQUE3Qjs7QUFFQSxNQUFJLE9BQU8sSUFBUCxrQkFFRSw0QkFBYSxNQUFiLEVBQXFCLEtBQXJCLEVBQTRCLElBQTVCLENBRkYsRUFHa0I7QUFBQSxXQUFNLEtBQUssZ0JBQUwsQ0FBTjtBQUFBLEdBSGxCLEVBSWtCO0FBQUEsV0FBTSxLQUFLLG9CQUFMLENBQU47QUFBQSxHQUpsQixFQU9JLFVBQVUsR0FBVixDQUFjLGdCQUFRO0FBQ3BCLFdBQU8sSUFBUCxtQkFFaUI7QUFBQSxhQUFNLEtBQUssZUFBTCxFQUFzQixFQUFFLFNBQVMsSUFBWCxFQUF0QixDQUFOO0FBQUEsS0FGakIsRUFHUSxLQUFLLElBSGIsRUFHb0IsS0FBSyxRQUFMLEdBQWdCLE9BQU8sS0FBSyxRQUFaLEdBQXVCLElBQXZDLEdBQThDLEVBSGxFO0FBT0QsR0FSRCxDQVBKLENBQUo7O0FBcUJBLFNBQU8sSUFBUDtBQUNEOzs7Ozs7Ozs7Ozs7a0JDMUJ1QixnQjs7QUFKeEI7Ozs7Ozs7O0lBRWMsSSxrQkFBTixJO0FBRU8sU0FBUyxnQkFBVCxDQUEwQixNQUExQixFQUFrQyxLQUFsQyxFQUF5QyxJQUF6QyxFQUErQztBQUM1RCxNQUFJLGFBQUo7O0FBRUEsTUFBSSxNQUFNLE1BQU4sQ0FBYSxRQUFqQixFQUEyQjtBQUN6QixXQUFPLElBQVAsa0JBRTBCLE1BQU0sTUFBTixDQUFhLFFBRnZDO0FBS0QsR0FORCxNQU1PO0FBQ0wsV0FBTyxJQUFQO0FBQ0Q7O0FBRUQsU0FBTyxJQUFQO0FBQ0Q7Ozs7Ozs7QUNsQkQ7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7QUFFQSxJQUFNLE1BQU0scUJBQVo7SUFDUSxzQixHQUEyQixPQUFPLElBQVAsQ0FBWSxRQUFaLENBQXFCLFMsQ0FBaEQsc0I7O0FBQ1IsSUFBTSxLQUFLLElBQUksT0FBTyxJQUFQLENBQVksVUFBaEIsRUFBWDtBQUNBLElBQU0sV0FBVyxJQUFJLE9BQU8sSUFBUCxDQUFZLFFBQWhCLEVBQWpCO0FBQ0EsSUFBTSxhQUFhLElBQUksT0FBTyxJQUFQLENBQVksTUFBaEIsQ0FBdUI7QUFDeEMsYUFBVyxPQUFPLElBQVAsQ0FBWSxTQUFaLENBQXNCLElBRE87QUFFeEMsUUFBTTtBQUNKLFVBQU0sT0FBTyxJQUFQLENBQVksVUFBWixDQUF1QixNQUR6QjtBQUVKLGlCQUFhLFNBRlQ7QUFHSixXQUFPO0FBSEg7QUFGa0MsQ0FBdkIsQ0FBbkI7O0FBU0EsSUFBSSxLQUFKLENBQVU7QUFDUixhQUFXLFFBREg7QUFFUixTQUFPO0FBQ0wsbUJBQWUsaUJBQU8sSUFBUCxDQUFZLFVBQUMsQ0FBRCxFQUFJLENBQUo7QUFBQSxhQUFVLHFDQUFZLEVBQUUsSUFBZCxFQUFvQixFQUFFLElBQXRCLENBQVY7QUFBQSxLQUFaLENBRFY7QUFFTCxrQkFBYyxFQUFFLEtBQUssaUJBQVAsRUFBMEIsS0FBSyxDQUFDLGlCQUFoQyxFQUZUO0FBR0wsY0FBVTtBQUhMLEdBRkM7O0FBUVIsWUFBVTtBQUNSLFdBRFEsbUJBQ0EsTUFEQSxFQUNRLEtBRFIsRUFDZTtBQUNyQixZQUFNLGFBQU47QUFDQSxpQkFBVyxNQUFYLENBQWtCLElBQWxCO0FBQ0EsYUFBTyxLQUFQO0FBQ0QsS0FMTztBQU9SLGlCQVBRLHlCQU9NLE1BUE4sRUFPYyxLQVBkLEVBT3FCO0FBQzNCLFlBQU0sYUFBTixDQUFvQixPQUFwQixDQUE0QixpQkFBUztBQUNuQyxZQUFJLE1BQU0sTUFBVixFQUFrQjtBQUNoQixnQkFBTSxNQUFOLENBQWEsTUFBYixDQUFvQixJQUFwQjtBQUNEO0FBQ0YsT0FKRDtBQUtBLFlBQU0sYUFBTixHQUFzQixPQUFPLE9BQTdCO0FBQ0EsWUFBTSxZQUFOLEdBQXFCLE9BQU8sUUFBUCxDQUFnQixNQUFoQixFQUFyQjtBQUNBLGFBQU8sS0FBUDtBQUNELEtBaEJPO0FBa0JSLGtCQWxCUSwwQkFrQk8sTUFsQlAsRUFrQmUsS0FsQmYsRUFrQnNCO0FBQzVCLFlBQU0sUUFBTixHQUFpQixPQUFPLFFBQXhCO0FBQ0EsYUFBTyxLQUFQO0FBQ0Q7QUFyQk8sR0FSRjs7QUFnQ1IsV0FBUztBQUNQLFVBRE8sa0JBQ0EsTUFEQSxFQUNRLEtBRFIsRUFDZSxJQURmLEVBQ3FCO0FBQzFCLFVBQUksUUFBUSxPQUFPLE9BQW5COztBQUVBLFNBQUcsV0FBSCxDQUFlLEVBQUUsS0FBSyxNQUFNLEdBQWIsRUFBa0IsS0FBSyxNQUFNLEdBQTdCLEVBQWY7QUFDQSxTQUFHLFVBQUgsU0FBb0IsTUFBTSxJQUExQixpQkFBMEMsTUFBTSxPQUFoRDtBQUNBLFNBQUcsSUFBSCxDQUFRLE1BQU0sR0FBZCxFQUFtQixNQUFNLE1BQXpCO0FBQ0QsS0FQTTtBQVNQLGVBVE8sdUJBU0ssTUFUTCxFQVNhLEtBVGIsRUFTb0IsSUFUcEIsRUFTMEI7QUFDL0IsZ0JBQVUsV0FBVixDQUFzQixrQkFBdEIsQ0FBeUMsVUFBUyxRQUFULEVBQW1CO0FBQzFELFlBQUksZUFBZSxJQUFJLE9BQU8sSUFBUCxDQUFZLE1BQWhCLENBQXVCLFNBQVMsTUFBVCxDQUFnQixRQUF2QyxFQUFpRCxTQUFTLE1BQVQsQ0FBZ0IsU0FBakUsQ0FBbkI7QUFDQSxZQUFJLFVBQVUsaUJBQU8sR0FBUCxDQUFXLGlCQUFTO0FBQ2hDLGNBQUksV0FBVyx1QkFBdUIsSUFBSSxPQUFPLElBQVAsQ0FBWSxNQUFoQixDQUF1QixNQUFNLEdBQTdCLEVBQWtDLE1BQU0sR0FBeEMsQ0FBdkIsRUFBcUUsWUFBckUsQ0FBZjs7QUFFQSxnQkFBTSxRQUFOLEdBQWlCLEtBQUssSUFBTCxDQUFVLFdBQVcsV0FBckIsQ0FBakI7QUFDQSxpQkFBTyxLQUFQO0FBQ0QsU0FMYSxFQU1YLE1BTlcsQ0FNSjtBQUFBLGlCQUFTLE1BQU0sUUFBTixHQUFpQixHQUExQjtBQUFBLFNBTkksRUFPWCxJQVBXLENBT04sVUFBQyxDQUFELEVBQUksQ0FBSjtBQUFBLGlCQUFVLHFDQUFZLEVBQUUsUUFBZCxFQUF3QixFQUFFLFFBQTFCLENBQVY7QUFBQSxTQVBNLENBQWQ7O0FBU0EsWUFBSSxNQUFNLEdBQVYsRUFBZTtBQUNiLGdCQUFNLEdBQU4sQ0FBVSxLQUFWLENBQWdCLFlBQWhCO0FBQ0EsZ0JBQU0sR0FBTixDQUFVLE9BQVYsQ0FBa0IsRUFBbEI7QUFDQSxxQkFBVyxXQUFYLENBQXVCLFlBQXZCO0FBQ0EscUJBQVcsTUFBWCxDQUFrQixNQUFNLEdBQXhCO0FBQ0Q7O0FBRUQsYUFBSyxzQkFBTCxFQUE2QixFQUFFLFNBQVMsT0FBWCxFQUFvQixVQUFVLFlBQTlCLEVBQTdCO0FBQ0EsYUFBSyx3QkFBTDtBQUNELE9BcEJEO0FBcUJELEtBL0JNO0FBaUNQLG1CQWpDTywyQkFpQ1MsTUFqQ1QsRUFpQ2lCLEtBakNqQixFQWlDd0IsSUFqQ3hCLEVBaUM4QjtBQUNuQyxlQUFTLE9BQVQsQ0FBaUIsRUFBRSxVQUFVLE1BQU0sWUFBbEIsRUFBakIsRUFBbUQsVUFBVSxPQUFWLEVBQW1CLE1BQW5CLEVBQTJCO0FBQzVFLFlBQUksV0FBVyxJQUFmLEVBQXFCO0FBQ25CLGVBQUssdUJBQUwsRUFBOEIsRUFBRSxVQUFVLFFBQVEsQ0FBUixFQUFXLGlCQUF2QixFQUE5QjtBQUNEO0FBQ0YsT0FKRDtBQUtEO0FBdkNNO0FBaENELENBQVY7O0FBNEVBLElBQU0sV0FBVyxTQUFYLFFBQVcsQ0FBQyxNQUFELEVBQVMsS0FBVCxFQUFnQixJQUFoQixFQUF5QjtBQUN4QyxTQUFPLGVBQUssSUFBWixrQkFFTSx5QkFBVSxNQUFWLEVBQWtCLEtBQWxCLEVBQXlCLElBQXpCLENBRk4sRUFHTSx1QkFBUSxNQUFSLEVBQWdCLEtBQWhCLEVBQXVCLElBQXZCLENBSE47QUFNRCxDQVBEOztBQVVBLElBQUksTUFBSixDQUFXLFVBQUMsS0FBRCxFQUFXO0FBQ3BCLFNBQU8sQ0FDTCxNQUFNLEdBQU4sRUFBVyxRQUFYLENBREssQ0FBUDtBQUdELENBSkQ7O0FBTUEsSUFBTSxPQUFPLElBQUksS0FBSixFQUFiOztBQUVBLFNBQVMsSUFBVCxDQUFjLFdBQWQsQ0FBMEIsSUFBMUI7OztBQ2pIQTtBQUNBOztBQ0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2V0E7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQzFrQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQy9QQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDM0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2UUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVqQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUMvRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FDZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IGNob28gZnJvbSAnY2hvbyc7XG5pbXBvcnQgb25sb2FkIGZyb20gJ29uLWxvYWQnO1xuaW1wb3J0IHN0eWxlcyBmcm9tICcuLi9tYXAtc3R5bGVzLmpzb24nO1xuXG5jb25zdCB7IHZpZXc6IGh0bWwgfSA9IGNob287XG5sZXQgbWFwRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5tYXBEaXYuY2xhc3NMaXN0LmFkZCgnbWFwLWNvbnRhaW5lcicpO1xubGV0IG1hcCA9IG5ldyBnb29nbGUubWFwcy5NYXAobWFwRGl2LCB7XG4gIGNlbnRlcjogeyBsYXQ6IDQyLjMzMDEyMzU0NjM0MTk5LCBsbmc6IC03MC45NTYyMzAxNjM1NzQyMiB9LFxuICB6b29tOiA1LFxuICBzdHlsZXNcbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBtYXBWaWV3KHBhcmFtcywgc3RhdGUsIHNlbmQpIHtcbiAgbGV0IHRyZWUgPSBodG1sYFxuICAgIDxnb29nbGUtbWFwPlxuICAgIDwvZ29vZ2xlLW1hcD5cbiAgYDtcblxuICAvL29ubG9hZCh0cmVlLCAoKSA9PiB7XG4gICAgbG9hZE1hcCh0cmVlLCBzdGF0ZSwgc2VuZCk7XG4gIC8vfSk7XG5cbiAgcmV0dXJuIHRyZWU7XG59XG5cbmZ1bmN0aW9uIGxvYWRNYXAodHJlZSwgc3RhdGUsIHNlbmQpIHtcbiAgbGV0IHN0b3JlcyA9IHN0YXRlLnN0b3Jlcy52aXNpYmxlU3RvcmVzO1xuICB0cmVlLmFwcGVuZENoaWxkKG1hcERpdik7XG5cbiAgc3RvcmVzLmZvckVhY2goc3RvcmUgPT4ge1xuICAgIHN0b3JlLm1hcmtlciA9IG5ldyBnb29nbGUubWFwcy5NYXJrZXIoe1xuICAgICAgcG9zaXRpb246IHsgbGF0OiBzdG9yZS5sYXQsIGxuZzogc3RvcmUubG5nIH0sXG4gICAgICB0aXRsZTogc3RvcmUubmFtZSxcbiAgICAgIGxhYmVsOiAnUCdcbiAgICB9KTtcbiAgICBzdG9yZS5tYXJrZXIuYWRkTGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gc2VuZCgnc3RvcmVzOnNlbGVjdCcsIHsgcGF5bG9hZDogc3RvcmUgfSkpO1xuICB9KTtcblxuICBzdG9yZXMuZm9yRWFjaChzdG9yZSA9PiBzdG9yZS5tYXJrZXIuc2V0TWFwKG1hcCkpO1xuICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICBnb29nbGUubWFwcy5ldmVudC50cmlnZ2VyKG1hcCwgJ3Jlc2l6ZScpO1xuICB9LCA1MDApO1xuICBzdGF0ZS5zdG9yZXMubWFwID0gbWFwO1xufVxuIiwiaW1wb3J0IGNob28gZnJvbSAnY2hvbyc7XG5pbXBvcnQgVXNlckxvY2F0aW9uIGZyb20gJy4vdXNlci1sb2NhdGlvbic7XG5cbmNvbnN0IHsgdmlldzogaHRtbCB9ID0gY2hvbztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc2lkZUJhclZpZXcocGFyYW1zLCBzdGF0ZSwgc2VuZCkge1xuICB2YXIgYWxsU3RvcmVzID0gc3RhdGUuc3RvcmVzLnZpc2libGVTdG9yZXM7XG5cbiAgbGV0IHRyZWUgPSBodG1sYFxuICAgIDxzaWRlLWJhcj5cbiAgICAgICR7VXNlckxvY2F0aW9uKHBhcmFtcywgc3RhdGUsIHNlbmQpfVxuICAgICAgPGJ1dHRvbiBvbmNsaWNrPSR7KCkgPT4gc2VuZCgnc3RvcmVzOnNob3dBbGwnKX0+QWxsIExvY2F0aW9uczwvYnV0dG9uPlxuICAgICAgPGJ1dHRvbiBvbmNsaWNrPSR7KCkgPT4gc2VuZCgnc3RvcmVzOnNob3dDbG9zZXN0Jyl9PkNsb3Nlc3QgTG9jYXRpb25zPC9idXR0b24+XG4gICAgICA8dWw+XG4gICAgICAgICR7XG4gICAgICAgICAgYWxsU3RvcmVzLm1hcChpdGVtID0+IHtcbiAgICAgICAgICAgIHJldHVybiBodG1sYFxuICAgICAgICAgICAgICA8bGk+XG4gICAgICAgICAgICAgICAgPGEgb25jbGljaz0keygpID0+IHNlbmQoJ3N0b3JlczpzZWxlY3QnLCB7IHBheWxvYWQ6IGl0ZW0gfSl9PlxuICAgICAgICAgICAgICAgICAgJHtpdGVtLm5hbWV9JHtpdGVtLmRpc3RhbmNlID8gJzogJyArIGl0ZW0uZGlzdGFuY2UgKyAnbWknIDogJyd9XG4gICAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgYDtcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICA8L3VsPlxuICAgIDwvc2lkZS1iYXI+XG4gIGA7XG5cbiAgcmV0dXJuIHRyZWU7XG59XG4iLCJpbXBvcnQgY2hvbyBmcm9tICdjaG9vJztcblxuY29uc3QgeyB2aWV3OiBodG1sIH0gPSBjaG9vO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB1c2VyTG9jYXRpb25WaWV3KHBhcmFtcywgc3RhdGUsIHNlbmQpIHtcbiAgbGV0IHRyZWU7XG5cbiAgaWYgKHN0YXRlLnN0b3Jlcy5sb2NhdGlvbikge1xuICAgIHRyZWUgPSBodG1sYFxuICAgICAgPHA+XG4gICAgICAgIFlvdSBhcmUgbG9jYXRlZCBhdDogJHtzdGF0ZS5zdG9yZXMubG9jYXRpb259XG4gICAgICA8L3A+XG4gICAgYDtcbiAgfSBlbHNlIHtcbiAgICB0cmVlID0gaHRtbGA8c3Bhbj48L3NwYW4+YDtcbiAgfVxuXG4gIHJldHVybiB0cmVlO1xufVxuIiwiaW1wb3J0IGNob28gZnJvbSAnY2hvbyc7XG5pbXBvcnQgbmF0dXJhbFNvcnQgZnJvbSAnamF2YXNjcmlwdC1uYXR1cmFsLXNvcnQnO1xuaW1wb3J0IHN0b3JlcyBmcm9tICcuL3N0b3Jlcyc7XG5pbXBvcnQgR29vZ2xlTWFwIGZyb20gJy4vY29tcG9uZW50cy9nb29nbGUtbWFwJztcbmltcG9ydCBTaWRlQmFyIGZyb20gJy4vY29tcG9uZW50cy9zaWRlLWJhcic7XG5cbmNvbnN0IGFwcCA9IGNob28oKTtcbmNvbnN0IHsgY29tcHV0ZURpc3RhbmNlQmV0d2VlbiB9ID0gZ29vZ2xlLm1hcHMuZ2VvbWV0cnkuc3BoZXJpY2FsO1xuY29uc3QgaXcgPSBuZXcgZ29vZ2xlLm1hcHMuSW5mb1dpbmRvdygpO1xuY29uc3QgZ2VvY29kZXIgPSBuZXcgZ29vZ2xlLm1hcHMuR2VvY29kZXIoKTtcbmNvbnN0IHVzZXJNYXJrZXIgPSBuZXcgZ29vZ2xlLm1hcHMuTWFya2VyKHtcbiAgYW5pbWF0aW9uOiBnb29nbGUubWFwcy5BbmltYXRpb24uRFJPUCxcbiAgaWNvbjoge1xuICAgIHBhdGg6IGdvb2dsZS5tYXBzLlN5bWJvbFBhdGguQ0lSQ0xFLFxuICAgIHN0cm9rZUNvbG9yOiAnIzQyODVmNCcsXG4gICAgc2NhbGU6IDVcbiAgfVxufSk7XG5cbmFwcC5tb2RlbCh7XG4gIG5hbWVzcGFjZTogJ3N0b3JlcycsXG4gIHN0YXRlOiB7XG4gICAgdmlzaWJsZVN0b3Jlczogc3RvcmVzLnNvcnQoKGEsIGIpID0+IG5hdHVyYWxTb3J0KGEubmFtZSwgYi5uYW1lKSksXG4gICAgdXNlckxvY2F0aW9uOiB7IGxhdDogNDIuMzMwMTIzNTQ2MzQxOTksIGxuZzogLTcwLjk1NjIzMDE2MzU3NDIyIH0sXG4gICAgbG9jYXRpb246ICcnXG4gIH0sXG5cbiAgcmVkdWNlcnM6IHtcbiAgICBzaG93QWxsKGFjdGlvbiwgc3RhdGUpIHtcbiAgICAgIHN0YXRlLnZpc2libGVTdG9yZXMgPSBzdG9yZXM7XG4gICAgICB1c2VyTWFya2VyLnNldE1hcChudWxsKTtcbiAgICAgIHJldHVybiBzdGF0ZTtcbiAgICB9LFxuXG4gICAgdXBkYXRlVmlzaWJsZShhY3Rpb24sIHN0YXRlKSB7XG4gICAgICBzdGF0ZS52aXNpYmxlU3RvcmVzLmZvckVhY2goc3RvcmUgPT4ge1xuICAgICAgICBpZiAoc3RvcmUubWFya2VyKSB7XG4gICAgICAgICAgc3RvcmUubWFya2VyLnNldE1hcChudWxsKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBzdGF0ZS52aXNpYmxlU3RvcmVzID0gYWN0aW9uLnBheWxvYWQ7XG4gICAgICBzdGF0ZS51c2VyTG9jYXRpb24gPSBhY3Rpb24ubG9jYXRpb24udG9KU09OKCk7XG4gICAgICByZXR1cm4gc3RhdGU7XG4gICAgfSxcblxuICAgIHVwZGF0ZUxvY2F0aW9uKGFjdGlvbiwgc3RhdGUpIHtcbiAgICAgIHN0YXRlLmxvY2F0aW9uID0gYWN0aW9uLmxvY2F0aW9uO1xuICAgICAgcmV0dXJuIHN0YXRlO1xuICAgIH1cbiAgfSxcblxuICBlZmZlY3RzOiB7XG4gICAgc2VsZWN0KGFjdGlvbiwgc3RhdGUsIHNlbmQpIHtcbiAgICAgIHZhciBzdG9yZSA9IGFjdGlvbi5wYXlsb2FkO1xuXG4gICAgICBpdy5zZXRQb3NpdGlvbih7IGxhdDogc3RvcmUubGF0LCBsbmc6IHN0b3JlLmxuZyB9KTtcbiAgICAgIGl3LnNldENvbnRlbnQoYDxiPiR7c3RvcmUubmFtZX08L2I+PGJyLz4ke3N0b3JlLmFkZHJlc3N9YCk7XG4gICAgICBpdy5vcGVuKHN0YXRlLm1hcCwgc3RvcmUubWFya2VyKTtcbiAgICB9LFxuXG4gICAgc2hvd0Nsb3Nlc3QoYWN0aW9uLCBzdGF0ZSwgc2VuZCkge1xuICAgICAgbmF2aWdhdG9yLmdlb2xvY2F0aW9uLmdldEN1cnJlbnRQb3NpdGlvbihmdW5jdGlvbihwb3NpdGlvbikge1xuICAgICAgICB2YXIgdXNlckxvY2F0aW9uID0gbmV3IGdvb2dsZS5tYXBzLkxhdExuZyhwb3NpdGlvbi5jb29yZHMubGF0aXR1ZGUsIHBvc2l0aW9uLmNvb3Jkcy5sb25naXR1ZGUpO1xuICAgICAgICB2YXIgY2xvc2VzdCA9IHN0b3Jlcy5tYXAoc3RvcmUgPT4ge1xuICAgICAgICAgIGxldCBkaXN0YW5jZSA9IGNvbXB1dGVEaXN0YW5jZUJldHdlZW4obmV3IGdvb2dsZS5tYXBzLkxhdExuZyhzdG9yZS5sYXQsIHN0b3JlLmxuZyksIHVzZXJMb2NhdGlvbik7XG4gICAgICAgICAgLy8gY29udmVydCBtZXRlcnMgdG8gbWlsZXMsIHJvdW5kZWQgdXBcbiAgICAgICAgICBzdG9yZS5kaXN0YW5jZSA9IE1hdGguY2VpbChkaXN0YW5jZSAqIDAuMDAwNjIxMzcxKTtcbiAgICAgICAgICByZXR1cm4gc3RvcmU7XG4gICAgICAgIH0pXG4gICAgICAgICAgLmZpbHRlcihzdG9yZSA9PiBzdG9yZS5kaXN0YW5jZSA8IDEwMClcbiAgICAgICAgICAuc29ydCgoYSwgYikgPT4gbmF0dXJhbFNvcnQoYS5kaXN0YW5jZSwgYi5kaXN0YW5jZSkpO1xuXG4gICAgICAgIGlmIChzdGF0ZS5tYXApIHtcbiAgICAgICAgICBzdGF0ZS5tYXAucGFuVG8odXNlckxvY2F0aW9uKTtcbiAgICAgICAgICBzdGF0ZS5tYXAuc2V0Wm9vbSgxMCk7XG4gICAgICAgICAgdXNlck1hcmtlci5zZXRQb3NpdGlvbih1c2VyTG9jYXRpb24pO1xuICAgICAgICAgIHVzZXJNYXJrZXIuc2V0TWFwKHN0YXRlLm1hcCk7XG4gICAgICAgIH1cblxuICAgICAgICBzZW5kKCdzdG9yZXM6dXBkYXRlVmlzaWJsZScsIHsgcGF5bG9hZDogY2xvc2VzdCwgbG9jYXRpb246IHVzZXJMb2NhdGlvbiB9KTtcbiAgICAgICAgc2VuZCgnc3RvcmVzOmdlb2NvZGVMb2NhdGlvbicpO1xuICAgICAgfSk7XG4gICAgfSxcblxuICAgIGdlb2NvZGVMb2NhdGlvbihhY3Rpb24sIHN0YXRlLCBzZW5kKSB7XG4gICAgICBnZW9jb2Rlci5nZW9jb2RlKHsgbG9jYXRpb246IHN0YXRlLnVzZXJMb2NhdGlvbiB9LCBmdW5jdGlvbiAocmVzdWx0cywgc3RhdHVzKSB7XG4gICAgICAgIGlmIChzdGF0dXMgPT09ICdPSycpIHtcbiAgICAgICAgICBzZW5kKCdzdG9yZXM6dXBkYXRlTG9jYXRpb24nLCB7IGxvY2F0aW9uOiByZXN1bHRzWzBdLmZvcm1hdHRlZF9hZGRyZXNzIH0pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cbn0pO1xuXG5cbmNvbnN0IG1haW5WaWV3ID0gKHBhcmFtcywgc3RhdGUsIHNlbmQpID0+IHtcbiAgcmV0dXJuIGNob28udmlld2BcbiAgICA8bWFpbiBjbGFzcz1cImFwcFwiPlxuICAgICAgJHtHb29nbGVNYXAocGFyYW1zLCBzdGF0ZSwgc2VuZCl9XG4gICAgICAke1NpZGVCYXIocGFyYW1zLCBzdGF0ZSwgc2VuZCl9XG4gICAgPC9tYWluPlxuICBgO1xufTtcblxuXG5hcHAucm91dGVyKChyb3V0ZSkgPT4ge1xuICByZXR1cm4gW1xuICAgIHJvdXRlKCcvJywgbWFpblZpZXcpXG4gIF07XG59KTtcblxuY29uc3QgdHJlZSA9IGFwcC5zdGFydCgpO1xuXG5kb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRyZWUpO1xuIiwibW9kdWxlLmV4cG9ydHM9W3tcImZlYXR1cmVUeXBlXCI6XCJhbGxcIixcImVsZW1lbnRUeXBlXCI6XCJsYWJlbHMudGV4dC5maWxsXCIsXCJzdHlsZXJzXCI6W3tcInNhdHVyYXRpb25cIjozNn0se1wiY29sb3JcIjpcIiMwMDAwMDBcIn0se1wibGlnaHRuZXNzXCI6NDB9XX0se1wiZmVhdHVyZVR5cGVcIjpcImFsbFwiLFwiZWxlbWVudFR5cGVcIjpcImxhYmVscy50ZXh0LnN0cm9rZVwiLFwic3R5bGVyc1wiOlt7XCJ2aXNpYmlsaXR5XCI6XCJvblwifSx7XCJjb2xvclwiOlwiIzAwMDAwMFwifSx7XCJsaWdodG5lc3NcIjoxNn1dfSx7XCJmZWF0dXJlVHlwZVwiOlwiYWxsXCIsXCJlbGVtZW50VHlwZVwiOlwibGFiZWxzLmljb25cIixcInN0eWxlcnNcIjpbe1widmlzaWJpbGl0eVwiOlwib2ZmXCJ9XX0se1wiZmVhdHVyZVR5cGVcIjpcImFkbWluaXN0cmF0aXZlXCIsXCJlbGVtZW50VHlwZVwiOlwiZ2VvbWV0cnkuZmlsbFwiLFwic3R5bGVyc1wiOlt7XCJjb2xvclwiOlwiIzAwMDAwMFwifSx7XCJsaWdodG5lc3NcIjoyMH1dfSx7XCJmZWF0dXJlVHlwZVwiOlwiYWRtaW5pc3RyYXRpdmVcIixcImVsZW1lbnRUeXBlXCI6XCJnZW9tZXRyeS5zdHJva2VcIixcInN0eWxlcnNcIjpbe1wiY29sb3JcIjpcIiMwMDAwMDBcIn0se1wibGlnaHRuZXNzXCI6MTd9LHtcIndlaWdodFwiOjEuMn1dfSx7XCJmZWF0dXJlVHlwZVwiOlwiYWRtaW5pc3RyYXRpdmUubG9jYWxpdHlcIixcImVsZW1lbnRUeXBlXCI6XCJsYWJlbHMudGV4dC5maWxsXCIsXCJzdHlsZXJzXCI6W3tcImNvbG9yXCI6XCIjZmZmZmZmXCJ9XX0se1wiZmVhdHVyZVR5cGVcIjpcImxhbmRzY2FwZVwiLFwiZWxlbWVudFR5cGVcIjpcImdlb21ldHJ5XCIsXCJzdHlsZXJzXCI6W3tcImNvbG9yXCI6XCIjMDAwMDAwXCJ9LHtcImxpZ2h0bmVzc1wiOjIwfV19LHtcImZlYXR1cmVUeXBlXCI6XCJwb2lcIixcImVsZW1lbnRUeXBlXCI6XCJnZW9tZXRyeVwiLFwic3R5bGVyc1wiOlt7XCJjb2xvclwiOlwiIzAwMDAwMFwifSx7XCJsaWdodG5lc3NcIjoyMX1dfSx7XCJmZWF0dXJlVHlwZVwiOlwicm9hZC5oaWdod2F5XCIsXCJlbGVtZW50VHlwZVwiOlwiZ2VvbWV0cnkuZmlsbFwiLFwic3R5bGVyc1wiOlt7XCJjb2xvclwiOlwiIzAwMDAwMFwifSx7XCJsaWdodG5lc3NcIjoxN31dfSx7XCJmZWF0dXJlVHlwZVwiOlwicm9hZC5oaWdod2F5XCIsXCJlbGVtZW50VHlwZVwiOlwiZ2VvbWV0cnkuc3Ryb2tlXCIsXCJzdHlsZXJzXCI6W3tcImNvbG9yXCI6XCIjMDAwMDAwXCJ9LHtcImxpZ2h0bmVzc1wiOjI5fSx7XCJ3ZWlnaHRcIjowLjJ9XX0se1wiZmVhdHVyZVR5cGVcIjpcInJvYWQuYXJ0ZXJpYWxcIixcImVsZW1lbnRUeXBlXCI6XCJnZW9tZXRyeVwiLFwic3R5bGVyc1wiOlt7XCJjb2xvclwiOlwiIzAwMDAwMFwifSx7XCJsaWdodG5lc3NcIjoxOH1dfSx7XCJmZWF0dXJlVHlwZVwiOlwicm9hZC5sb2NhbFwiLFwiZWxlbWVudFR5cGVcIjpcImdlb21ldHJ5XCIsXCJzdHlsZXJzXCI6W3tcImNvbG9yXCI6XCIjMDAwMDAwXCJ9LHtcImxpZ2h0bmVzc1wiOjE2fV19LHtcImZlYXR1cmVUeXBlXCI6XCJ0cmFuc2l0XCIsXCJlbGVtZW50VHlwZVwiOlwiZ2VvbWV0cnlcIixcInN0eWxlcnNcIjpbe1wiY29sb3JcIjpcIiMwMDAwMDBcIn0se1wibGlnaHRuZXNzXCI6MTl9XX0se1wiZmVhdHVyZVR5cGVcIjpcIndhdGVyXCIsXCJlbGVtZW50VHlwZVwiOlwiZ2VvbWV0cnlcIixcInN0eWxlcnNcIjpbe1wiY29sb3JcIjpcIiMwMDAwMDBcIn0se1wibGlnaHRuZXNzXCI6MTd9XX1dXG4iLCIvLyBodHRwOi8vd2lraS5jb21tb25qcy5vcmcvd2lraS9Vbml0X1Rlc3RpbmcvMS4wXG4vL1xuLy8gVEhJUyBJUyBOT1QgVEVTVEVEIE5PUiBMSUtFTFkgVE8gV09SSyBPVVRTSURFIFY4IVxuLy9cbi8vIE9yaWdpbmFsbHkgZnJvbSBuYXJ3aGFsLmpzIChodHRwOi8vbmFyd2hhbGpzLm9yZylcbi8vIENvcHlyaWdodCAoYykgMjAwOSBUaG9tYXMgUm9iaW5zb24gPDI4MG5vcnRoLmNvbT5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4vLyBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSAnU29mdHdhcmUnKSwgdG9cbi8vIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlXG4vLyByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Jcbi8vIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4vLyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4vLyBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgJ0FTIElTJywgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbi8vIEFVVEhPUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSIElOIEFOXG4vLyBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OXG4vLyBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cblxuLy8gd2hlbiB1c2VkIGluIG5vZGUsIHRoaXMgd2lsbCBhY3R1YWxseSBsb2FkIHRoZSB1dGlsIG1vZHVsZSB3ZSBkZXBlbmQgb25cbi8vIHZlcnN1cyBsb2FkaW5nIHRoZSBidWlsdGluIHV0aWwgbW9kdWxlIGFzIGhhcHBlbnMgb3RoZXJ3aXNlXG4vLyB0aGlzIGlzIGEgYnVnIGluIG5vZGUgbW9kdWxlIGxvYWRpbmcgYXMgZmFyIGFzIEkgYW0gY29uY2VybmVkXG52YXIgdXRpbCA9IHJlcXVpcmUoJ3V0aWwvJyk7XG5cbnZhciBwU2xpY2UgPSBBcnJheS5wcm90b3R5cGUuc2xpY2U7XG52YXIgaGFzT3duID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcblxuLy8gMS4gVGhlIGFzc2VydCBtb2R1bGUgcHJvdmlkZXMgZnVuY3Rpb25zIHRoYXQgdGhyb3dcbi8vIEFzc2VydGlvbkVycm9yJ3Mgd2hlbiBwYXJ0aWN1bGFyIGNvbmRpdGlvbnMgYXJlIG5vdCBtZXQuIFRoZVxuLy8gYXNzZXJ0IG1vZHVsZSBtdXN0IGNvbmZvcm0gdG8gdGhlIGZvbGxvd2luZyBpbnRlcmZhY2UuXG5cbnZhciBhc3NlcnQgPSBtb2R1bGUuZXhwb3J0cyA9IG9rO1xuXG4vLyAyLiBUaGUgQXNzZXJ0aW9uRXJyb3IgaXMgZGVmaW5lZCBpbiBhc3NlcnQuXG4vLyBuZXcgYXNzZXJ0LkFzc2VydGlvbkVycm9yKHsgbWVzc2FnZTogbWVzc2FnZSxcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3R1YWw6IGFjdHVhbCxcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICBleHBlY3RlZDogZXhwZWN0ZWQgfSlcblxuYXNzZXJ0LkFzc2VydGlvbkVycm9yID0gZnVuY3Rpb24gQXNzZXJ0aW9uRXJyb3Iob3B0aW9ucykge1xuICB0aGlzLm5hbWUgPSAnQXNzZXJ0aW9uRXJyb3InO1xuICB0aGlzLmFjdHVhbCA9IG9wdGlvbnMuYWN0dWFsO1xuICB0aGlzLmV4cGVjdGVkID0gb3B0aW9ucy5leHBlY3RlZDtcbiAgdGhpcy5vcGVyYXRvciA9IG9wdGlvbnMub3BlcmF0b3I7XG4gIGlmIChvcHRpb25zLm1lc3NhZ2UpIHtcbiAgICB0aGlzLm1lc3NhZ2UgPSBvcHRpb25zLm1lc3NhZ2U7XG4gICAgdGhpcy5nZW5lcmF0ZWRNZXNzYWdlID0gZmFsc2U7XG4gIH0gZWxzZSB7XG4gICAgdGhpcy5tZXNzYWdlID0gZ2V0TWVzc2FnZSh0aGlzKTtcbiAgICB0aGlzLmdlbmVyYXRlZE1lc3NhZ2UgPSB0cnVlO1xuICB9XG4gIHZhciBzdGFja1N0YXJ0RnVuY3Rpb24gPSBvcHRpb25zLnN0YWNrU3RhcnRGdW5jdGlvbiB8fCBmYWlsO1xuXG4gIGlmIChFcnJvci5jYXB0dXJlU3RhY2tUcmFjZSkge1xuICAgIEVycm9yLmNhcHR1cmVTdGFja1RyYWNlKHRoaXMsIHN0YWNrU3RhcnRGdW5jdGlvbik7XG4gIH1cbiAgZWxzZSB7XG4gICAgLy8gbm9uIHY4IGJyb3dzZXJzIHNvIHdlIGNhbiBoYXZlIGEgc3RhY2t0cmFjZVxuICAgIHZhciBlcnIgPSBuZXcgRXJyb3IoKTtcbiAgICBpZiAoZXJyLnN0YWNrKSB7XG4gICAgICB2YXIgb3V0ID0gZXJyLnN0YWNrO1xuXG4gICAgICAvLyB0cnkgdG8gc3RyaXAgdXNlbGVzcyBmcmFtZXNcbiAgICAgIHZhciBmbl9uYW1lID0gc3RhY2tTdGFydEZ1bmN0aW9uLm5hbWU7XG4gICAgICB2YXIgaWR4ID0gb3V0LmluZGV4T2YoJ1xcbicgKyBmbl9uYW1lKTtcbiAgICAgIGlmIChpZHggPj0gMCkge1xuICAgICAgICAvLyBvbmNlIHdlIGhhdmUgbG9jYXRlZCB0aGUgZnVuY3Rpb24gZnJhbWVcbiAgICAgICAgLy8gd2UgbmVlZCB0byBzdHJpcCBvdXQgZXZlcnl0aGluZyBiZWZvcmUgaXQgKGFuZCBpdHMgbGluZSlcbiAgICAgICAgdmFyIG5leHRfbGluZSA9IG91dC5pbmRleE9mKCdcXG4nLCBpZHggKyAxKTtcbiAgICAgICAgb3V0ID0gb3V0LnN1YnN0cmluZyhuZXh0X2xpbmUgKyAxKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5zdGFjayA9IG91dDtcbiAgICB9XG4gIH1cbn07XG5cbi8vIGFzc2VydC5Bc3NlcnRpb25FcnJvciBpbnN0YW5jZW9mIEVycm9yXG51dGlsLmluaGVyaXRzKGFzc2VydC5Bc3NlcnRpb25FcnJvciwgRXJyb3IpO1xuXG5mdW5jdGlvbiByZXBsYWNlcihrZXksIHZhbHVlKSB7XG4gIGlmICh1dGlsLmlzVW5kZWZpbmVkKHZhbHVlKSkge1xuICAgIHJldHVybiAnJyArIHZhbHVlO1xuICB9XG4gIGlmICh1dGlsLmlzTnVtYmVyKHZhbHVlKSAmJiAhaXNGaW5pdGUodmFsdWUpKSB7XG4gICAgcmV0dXJuIHZhbHVlLnRvU3RyaW5nKCk7XG4gIH1cbiAgaWYgKHV0aWwuaXNGdW5jdGlvbih2YWx1ZSkgfHwgdXRpbC5pc1JlZ0V4cCh2YWx1ZSkpIHtcbiAgICByZXR1cm4gdmFsdWUudG9TdHJpbmcoKTtcbiAgfVxuICByZXR1cm4gdmFsdWU7XG59XG5cbmZ1bmN0aW9uIHRydW5jYXRlKHMsIG4pIHtcbiAgaWYgKHV0aWwuaXNTdHJpbmcocykpIHtcbiAgICByZXR1cm4gcy5sZW5ndGggPCBuID8gcyA6IHMuc2xpY2UoMCwgbik7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHM7XG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0TWVzc2FnZShzZWxmKSB7XG4gIHJldHVybiB0cnVuY2F0ZShKU09OLnN0cmluZ2lmeShzZWxmLmFjdHVhbCwgcmVwbGFjZXIpLCAxMjgpICsgJyAnICtcbiAgICAgICAgIHNlbGYub3BlcmF0b3IgKyAnICcgK1xuICAgICAgICAgdHJ1bmNhdGUoSlNPTi5zdHJpbmdpZnkoc2VsZi5leHBlY3RlZCwgcmVwbGFjZXIpLCAxMjgpO1xufVxuXG4vLyBBdCBwcmVzZW50IG9ubHkgdGhlIHRocmVlIGtleXMgbWVudGlvbmVkIGFib3ZlIGFyZSB1c2VkIGFuZFxuLy8gdW5kZXJzdG9vZCBieSB0aGUgc3BlYy4gSW1wbGVtZW50YXRpb25zIG9yIHN1YiBtb2R1bGVzIGNhbiBwYXNzXG4vLyBvdGhlciBrZXlzIHRvIHRoZSBBc3NlcnRpb25FcnJvcidzIGNvbnN0cnVjdG9yIC0gdGhleSB3aWxsIGJlXG4vLyBpZ25vcmVkLlxuXG4vLyAzLiBBbGwgb2YgdGhlIGZvbGxvd2luZyBmdW5jdGlvbnMgbXVzdCB0aHJvdyBhbiBBc3NlcnRpb25FcnJvclxuLy8gd2hlbiBhIGNvcnJlc3BvbmRpbmcgY29uZGl0aW9uIGlzIG5vdCBtZXQsIHdpdGggYSBtZXNzYWdlIHRoYXRcbi8vIG1heSBiZSB1bmRlZmluZWQgaWYgbm90IHByb3ZpZGVkLiAgQWxsIGFzc2VydGlvbiBtZXRob2RzIHByb3ZpZGVcbi8vIGJvdGggdGhlIGFjdHVhbCBhbmQgZXhwZWN0ZWQgdmFsdWVzIHRvIHRoZSBhc3NlcnRpb24gZXJyb3IgZm9yXG4vLyBkaXNwbGF5IHB1cnBvc2VzLlxuXG5mdW5jdGlvbiBmYWlsKGFjdHVhbCwgZXhwZWN0ZWQsIG1lc3NhZ2UsIG9wZXJhdG9yLCBzdGFja1N0YXJ0RnVuY3Rpb24pIHtcbiAgdGhyb3cgbmV3IGFzc2VydC5Bc3NlcnRpb25FcnJvcih7XG4gICAgbWVzc2FnZTogbWVzc2FnZSxcbiAgICBhY3R1YWw6IGFjdHVhbCxcbiAgICBleHBlY3RlZDogZXhwZWN0ZWQsXG4gICAgb3BlcmF0b3I6IG9wZXJhdG9yLFxuICAgIHN0YWNrU3RhcnRGdW5jdGlvbjogc3RhY2tTdGFydEZ1bmN0aW9uXG4gIH0pO1xufVxuXG4vLyBFWFRFTlNJT04hIGFsbG93cyBmb3Igd2VsbCBiZWhhdmVkIGVycm9ycyBkZWZpbmVkIGVsc2V3aGVyZS5cbmFzc2VydC5mYWlsID0gZmFpbDtcblxuLy8gNC4gUHVyZSBhc3NlcnRpb24gdGVzdHMgd2hldGhlciBhIHZhbHVlIGlzIHRydXRoeSwgYXMgZGV0ZXJtaW5lZFxuLy8gYnkgISFndWFyZC5cbi8vIGFzc2VydC5vayhndWFyZCwgbWVzc2FnZV9vcHQpO1xuLy8gVGhpcyBzdGF0ZW1lbnQgaXMgZXF1aXZhbGVudCB0byBhc3NlcnQuZXF1YWwodHJ1ZSwgISFndWFyZCxcbi8vIG1lc3NhZ2Vfb3B0KTsuIFRvIHRlc3Qgc3RyaWN0bHkgZm9yIHRoZSB2YWx1ZSB0cnVlLCB1c2Vcbi8vIGFzc2VydC5zdHJpY3RFcXVhbCh0cnVlLCBndWFyZCwgbWVzc2FnZV9vcHQpOy5cblxuZnVuY3Rpb24gb2sodmFsdWUsIG1lc3NhZ2UpIHtcbiAgaWYgKCF2YWx1ZSkgZmFpbCh2YWx1ZSwgdHJ1ZSwgbWVzc2FnZSwgJz09JywgYXNzZXJ0Lm9rKTtcbn1cbmFzc2VydC5vayA9IG9rO1xuXG4vLyA1LiBUaGUgZXF1YWxpdHkgYXNzZXJ0aW9uIHRlc3RzIHNoYWxsb3csIGNvZXJjaXZlIGVxdWFsaXR5IHdpdGhcbi8vID09LlxuLy8gYXNzZXJ0LmVxdWFsKGFjdHVhbCwgZXhwZWN0ZWQsIG1lc3NhZ2Vfb3B0KTtcblxuYXNzZXJ0LmVxdWFsID0gZnVuY3Rpb24gZXF1YWwoYWN0dWFsLCBleHBlY3RlZCwgbWVzc2FnZSkge1xuICBpZiAoYWN0dWFsICE9IGV4cGVjdGVkKSBmYWlsKGFjdHVhbCwgZXhwZWN0ZWQsIG1lc3NhZ2UsICc9PScsIGFzc2VydC5lcXVhbCk7XG59O1xuXG4vLyA2LiBUaGUgbm9uLWVxdWFsaXR5IGFzc2VydGlvbiB0ZXN0cyBmb3Igd2hldGhlciB0d28gb2JqZWN0cyBhcmUgbm90IGVxdWFsXG4vLyB3aXRoICE9IGFzc2VydC5ub3RFcXVhbChhY3R1YWwsIGV4cGVjdGVkLCBtZXNzYWdlX29wdCk7XG5cbmFzc2VydC5ub3RFcXVhbCA9IGZ1bmN0aW9uIG5vdEVxdWFsKGFjdHVhbCwgZXhwZWN0ZWQsIG1lc3NhZ2UpIHtcbiAgaWYgKGFjdHVhbCA9PSBleHBlY3RlZCkge1xuICAgIGZhaWwoYWN0dWFsLCBleHBlY3RlZCwgbWVzc2FnZSwgJyE9JywgYXNzZXJ0Lm5vdEVxdWFsKTtcbiAgfVxufTtcblxuLy8gNy4gVGhlIGVxdWl2YWxlbmNlIGFzc2VydGlvbiB0ZXN0cyBhIGRlZXAgZXF1YWxpdHkgcmVsYXRpb24uXG4vLyBhc3NlcnQuZGVlcEVxdWFsKGFjdHVhbCwgZXhwZWN0ZWQsIG1lc3NhZ2Vfb3B0KTtcblxuYXNzZXJ0LmRlZXBFcXVhbCA9IGZ1bmN0aW9uIGRlZXBFcXVhbChhY3R1YWwsIGV4cGVjdGVkLCBtZXNzYWdlKSB7XG4gIGlmICghX2RlZXBFcXVhbChhY3R1YWwsIGV4cGVjdGVkKSkge1xuICAgIGZhaWwoYWN0dWFsLCBleHBlY3RlZCwgbWVzc2FnZSwgJ2RlZXBFcXVhbCcsIGFzc2VydC5kZWVwRXF1YWwpO1xuICB9XG59O1xuXG5mdW5jdGlvbiBfZGVlcEVxdWFsKGFjdHVhbCwgZXhwZWN0ZWQpIHtcbiAgLy8gNy4xLiBBbGwgaWRlbnRpY2FsIHZhbHVlcyBhcmUgZXF1aXZhbGVudCwgYXMgZGV0ZXJtaW5lZCBieSA9PT0uXG4gIGlmIChhY3R1YWwgPT09IGV4cGVjdGVkKSB7XG4gICAgcmV0dXJuIHRydWU7XG5cbiAgfSBlbHNlIGlmICh1dGlsLmlzQnVmZmVyKGFjdHVhbCkgJiYgdXRpbC5pc0J1ZmZlcihleHBlY3RlZCkpIHtcbiAgICBpZiAoYWN0dWFsLmxlbmd0aCAhPSBleHBlY3RlZC5sZW5ndGgpIHJldHVybiBmYWxzZTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYWN0dWFsLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoYWN0dWFsW2ldICE9PSBleHBlY3RlZFtpXSkgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHJldHVybiB0cnVlO1xuXG4gIC8vIDcuMi4gSWYgdGhlIGV4cGVjdGVkIHZhbHVlIGlzIGEgRGF0ZSBvYmplY3QsIHRoZSBhY3R1YWwgdmFsdWUgaXNcbiAgLy8gZXF1aXZhbGVudCBpZiBpdCBpcyBhbHNvIGEgRGF0ZSBvYmplY3QgdGhhdCByZWZlcnMgdG8gdGhlIHNhbWUgdGltZS5cbiAgfSBlbHNlIGlmICh1dGlsLmlzRGF0ZShhY3R1YWwpICYmIHV0aWwuaXNEYXRlKGV4cGVjdGVkKSkge1xuICAgIHJldHVybiBhY3R1YWwuZ2V0VGltZSgpID09PSBleHBlY3RlZC5nZXRUaW1lKCk7XG5cbiAgLy8gNy4zIElmIHRoZSBleHBlY3RlZCB2YWx1ZSBpcyBhIFJlZ0V4cCBvYmplY3QsIHRoZSBhY3R1YWwgdmFsdWUgaXNcbiAgLy8gZXF1aXZhbGVudCBpZiBpdCBpcyBhbHNvIGEgUmVnRXhwIG9iamVjdCB3aXRoIHRoZSBzYW1lIHNvdXJjZSBhbmRcbiAgLy8gcHJvcGVydGllcyAoYGdsb2JhbGAsIGBtdWx0aWxpbmVgLCBgbGFzdEluZGV4YCwgYGlnbm9yZUNhc2VgKS5cbiAgfSBlbHNlIGlmICh1dGlsLmlzUmVnRXhwKGFjdHVhbCkgJiYgdXRpbC5pc1JlZ0V4cChleHBlY3RlZCkpIHtcbiAgICByZXR1cm4gYWN0dWFsLnNvdXJjZSA9PT0gZXhwZWN0ZWQuc291cmNlICYmXG4gICAgICAgICAgIGFjdHVhbC5nbG9iYWwgPT09IGV4cGVjdGVkLmdsb2JhbCAmJlxuICAgICAgICAgICBhY3R1YWwubXVsdGlsaW5lID09PSBleHBlY3RlZC5tdWx0aWxpbmUgJiZcbiAgICAgICAgICAgYWN0dWFsLmxhc3RJbmRleCA9PT0gZXhwZWN0ZWQubGFzdEluZGV4ICYmXG4gICAgICAgICAgIGFjdHVhbC5pZ25vcmVDYXNlID09PSBleHBlY3RlZC5pZ25vcmVDYXNlO1xuXG4gIC8vIDcuNC4gT3RoZXIgcGFpcnMgdGhhdCBkbyBub3QgYm90aCBwYXNzIHR5cGVvZiB2YWx1ZSA9PSAnb2JqZWN0JyxcbiAgLy8gZXF1aXZhbGVuY2UgaXMgZGV0ZXJtaW5lZCBieSA9PS5cbiAgfSBlbHNlIGlmICghdXRpbC5pc09iamVjdChhY3R1YWwpICYmICF1dGlsLmlzT2JqZWN0KGV4cGVjdGVkKSkge1xuICAgIHJldHVybiBhY3R1YWwgPT0gZXhwZWN0ZWQ7XG5cbiAgLy8gNy41IEZvciBhbGwgb3RoZXIgT2JqZWN0IHBhaXJzLCBpbmNsdWRpbmcgQXJyYXkgb2JqZWN0cywgZXF1aXZhbGVuY2UgaXNcbiAgLy8gZGV0ZXJtaW5lZCBieSBoYXZpbmcgdGhlIHNhbWUgbnVtYmVyIG9mIG93bmVkIHByb3BlcnRpZXMgKGFzIHZlcmlmaWVkXG4gIC8vIHdpdGggT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKSwgdGhlIHNhbWUgc2V0IG9mIGtleXNcbiAgLy8gKGFsdGhvdWdoIG5vdCBuZWNlc3NhcmlseSB0aGUgc2FtZSBvcmRlciksIGVxdWl2YWxlbnQgdmFsdWVzIGZvciBldmVyeVxuICAvLyBjb3JyZXNwb25kaW5nIGtleSwgYW5kIGFuIGlkZW50aWNhbCAncHJvdG90eXBlJyBwcm9wZXJ0eS4gTm90ZTogdGhpc1xuICAvLyBhY2NvdW50cyBmb3IgYm90aCBuYW1lZCBhbmQgaW5kZXhlZCBwcm9wZXJ0aWVzIG9uIEFycmF5cy5cbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gb2JqRXF1aXYoYWN0dWFsLCBleHBlY3RlZCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gaXNBcmd1bWVudHMob2JqZWN0KSB7XG4gIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwob2JqZWN0KSA9PSAnW29iamVjdCBBcmd1bWVudHNdJztcbn1cblxuZnVuY3Rpb24gb2JqRXF1aXYoYSwgYikge1xuICBpZiAodXRpbC5pc051bGxPclVuZGVmaW5lZChhKSB8fCB1dGlsLmlzTnVsbE9yVW5kZWZpbmVkKGIpKVxuICAgIHJldHVybiBmYWxzZTtcbiAgLy8gYW4gaWRlbnRpY2FsICdwcm90b3R5cGUnIHByb3BlcnR5LlxuICBpZiAoYS5wcm90b3R5cGUgIT09IGIucHJvdG90eXBlKSByZXR1cm4gZmFsc2U7XG4gIC8vIGlmIG9uZSBpcyBhIHByaW1pdGl2ZSwgdGhlIG90aGVyIG11c3QgYmUgc2FtZVxuICBpZiAodXRpbC5pc1ByaW1pdGl2ZShhKSB8fCB1dGlsLmlzUHJpbWl0aXZlKGIpKSB7XG4gICAgcmV0dXJuIGEgPT09IGI7XG4gIH1cbiAgdmFyIGFJc0FyZ3MgPSBpc0FyZ3VtZW50cyhhKSxcbiAgICAgIGJJc0FyZ3MgPSBpc0FyZ3VtZW50cyhiKTtcbiAgaWYgKChhSXNBcmdzICYmICFiSXNBcmdzKSB8fCAoIWFJc0FyZ3MgJiYgYklzQXJncykpXG4gICAgcmV0dXJuIGZhbHNlO1xuICBpZiAoYUlzQXJncykge1xuICAgIGEgPSBwU2xpY2UuY2FsbChhKTtcbiAgICBiID0gcFNsaWNlLmNhbGwoYik7XG4gICAgcmV0dXJuIF9kZWVwRXF1YWwoYSwgYik7XG4gIH1cbiAgdmFyIGthID0gb2JqZWN0S2V5cyhhKSxcbiAgICAgIGtiID0gb2JqZWN0S2V5cyhiKSxcbiAgICAgIGtleSwgaTtcbiAgLy8gaGF2aW5nIHRoZSBzYW1lIG51bWJlciBvZiBvd25lZCBwcm9wZXJ0aWVzIChrZXlzIGluY29ycG9yYXRlc1xuICAvLyBoYXNPd25Qcm9wZXJ0eSlcbiAgaWYgKGthLmxlbmd0aCAhPSBrYi5sZW5ndGgpXG4gICAgcmV0dXJuIGZhbHNlO1xuICAvL3RoZSBzYW1lIHNldCBvZiBrZXlzIChhbHRob3VnaCBub3QgbmVjZXNzYXJpbHkgdGhlIHNhbWUgb3JkZXIpLFxuICBrYS5zb3J0KCk7XG4gIGtiLnNvcnQoKTtcbiAgLy9+fn5jaGVhcCBrZXkgdGVzdFxuICBmb3IgKGkgPSBrYS5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgIGlmIChrYVtpXSAhPSBrYltpXSlcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICAvL2VxdWl2YWxlbnQgdmFsdWVzIGZvciBldmVyeSBjb3JyZXNwb25kaW5nIGtleSwgYW5kXG4gIC8vfn5+cG9zc2libHkgZXhwZW5zaXZlIGRlZXAgdGVzdFxuICBmb3IgKGkgPSBrYS5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgIGtleSA9IGthW2ldO1xuICAgIGlmICghX2RlZXBFcXVhbChhW2tleV0sIGJba2V5XSkpIHJldHVybiBmYWxzZTtcbiAgfVxuICByZXR1cm4gdHJ1ZTtcbn1cblxuLy8gOC4gVGhlIG5vbi1lcXVpdmFsZW5jZSBhc3NlcnRpb24gdGVzdHMgZm9yIGFueSBkZWVwIGluZXF1YWxpdHkuXG4vLyBhc3NlcnQubm90RGVlcEVxdWFsKGFjdHVhbCwgZXhwZWN0ZWQsIG1lc3NhZ2Vfb3B0KTtcblxuYXNzZXJ0Lm5vdERlZXBFcXVhbCA9IGZ1bmN0aW9uIG5vdERlZXBFcXVhbChhY3R1YWwsIGV4cGVjdGVkLCBtZXNzYWdlKSB7XG4gIGlmIChfZGVlcEVxdWFsKGFjdHVhbCwgZXhwZWN0ZWQpKSB7XG4gICAgZmFpbChhY3R1YWwsIGV4cGVjdGVkLCBtZXNzYWdlLCAnbm90RGVlcEVxdWFsJywgYXNzZXJ0Lm5vdERlZXBFcXVhbCk7XG4gIH1cbn07XG5cbi8vIDkuIFRoZSBzdHJpY3QgZXF1YWxpdHkgYXNzZXJ0aW9uIHRlc3RzIHN0cmljdCBlcXVhbGl0eSwgYXMgZGV0ZXJtaW5lZCBieSA9PT0uXG4vLyBhc3NlcnQuc3RyaWN0RXF1YWwoYWN0dWFsLCBleHBlY3RlZCwgbWVzc2FnZV9vcHQpO1xuXG5hc3NlcnQuc3RyaWN0RXF1YWwgPSBmdW5jdGlvbiBzdHJpY3RFcXVhbChhY3R1YWwsIGV4cGVjdGVkLCBtZXNzYWdlKSB7XG4gIGlmIChhY3R1YWwgIT09IGV4cGVjdGVkKSB7XG4gICAgZmFpbChhY3R1YWwsIGV4cGVjdGVkLCBtZXNzYWdlLCAnPT09JywgYXNzZXJ0LnN0cmljdEVxdWFsKTtcbiAgfVxufTtcblxuLy8gMTAuIFRoZSBzdHJpY3Qgbm9uLWVxdWFsaXR5IGFzc2VydGlvbiB0ZXN0cyBmb3Igc3RyaWN0IGluZXF1YWxpdHksIGFzXG4vLyBkZXRlcm1pbmVkIGJ5ICE9PS4gIGFzc2VydC5ub3RTdHJpY3RFcXVhbChhY3R1YWwsIGV4cGVjdGVkLCBtZXNzYWdlX29wdCk7XG5cbmFzc2VydC5ub3RTdHJpY3RFcXVhbCA9IGZ1bmN0aW9uIG5vdFN0cmljdEVxdWFsKGFjdHVhbCwgZXhwZWN0ZWQsIG1lc3NhZ2UpIHtcbiAgaWYgKGFjdHVhbCA9PT0gZXhwZWN0ZWQpIHtcbiAgICBmYWlsKGFjdHVhbCwgZXhwZWN0ZWQsIG1lc3NhZ2UsICchPT0nLCBhc3NlcnQubm90U3RyaWN0RXF1YWwpO1xuICB9XG59O1xuXG5mdW5jdGlvbiBleHBlY3RlZEV4Y2VwdGlvbihhY3R1YWwsIGV4cGVjdGVkKSB7XG4gIGlmICghYWN0dWFsIHx8ICFleHBlY3RlZCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGlmIChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoZXhwZWN0ZWQpID09ICdbb2JqZWN0IFJlZ0V4cF0nKSB7XG4gICAgcmV0dXJuIGV4cGVjdGVkLnRlc3QoYWN0dWFsKTtcbiAgfSBlbHNlIGlmIChhY3R1YWwgaW5zdGFuY2VvZiBleHBlY3RlZCkge1xuICAgIHJldHVybiB0cnVlO1xuICB9IGVsc2UgaWYgKGV4cGVjdGVkLmNhbGwoe30sIGFjdHVhbCkgPT09IHRydWUpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIHJldHVybiBmYWxzZTtcbn1cblxuZnVuY3Rpb24gX3Rocm93cyhzaG91bGRUaHJvdywgYmxvY2ssIGV4cGVjdGVkLCBtZXNzYWdlKSB7XG4gIHZhciBhY3R1YWw7XG5cbiAgaWYgKHV0aWwuaXNTdHJpbmcoZXhwZWN0ZWQpKSB7XG4gICAgbWVzc2FnZSA9IGV4cGVjdGVkO1xuICAgIGV4cGVjdGVkID0gbnVsbDtcbiAgfVxuXG4gIHRyeSB7XG4gICAgYmxvY2soKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIGFjdHVhbCA9IGU7XG4gIH1cblxuICBtZXNzYWdlID0gKGV4cGVjdGVkICYmIGV4cGVjdGVkLm5hbWUgPyAnICgnICsgZXhwZWN0ZWQubmFtZSArICcpLicgOiAnLicpICtcbiAgICAgICAgICAgIChtZXNzYWdlID8gJyAnICsgbWVzc2FnZSA6ICcuJyk7XG5cbiAgaWYgKHNob3VsZFRocm93ICYmICFhY3R1YWwpIHtcbiAgICBmYWlsKGFjdHVhbCwgZXhwZWN0ZWQsICdNaXNzaW5nIGV4cGVjdGVkIGV4Y2VwdGlvbicgKyBtZXNzYWdlKTtcbiAgfVxuXG4gIGlmICghc2hvdWxkVGhyb3cgJiYgZXhwZWN0ZWRFeGNlcHRpb24oYWN0dWFsLCBleHBlY3RlZCkpIHtcbiAgICBmYWlsKGFjdHVhbCwgZXhwZWN0ZWQsICdHb3QgdW53YW50ZWQgZXhjZXB0aW9uJyArIG1lc3NhZ2UpO1xuICB9XG5cbiAgaWYgKChzaG91bGRUaHJvdyAmJiBhY3R1YWwgJiYgZXhwZWN0ZWQgJiZcbiAgICAgICFleHBlY3RlZEV4Y2VwdGlvbihhY3R1YWwsIGV4cGVjdGVkKSkgfHwgKCFzaG91bGRUaHJvdyAmJiBhY3R1YWwpKSB7XG4gICAgdGhyb3cgYWN0dWFsO1xuICB9XG59XG5cbi8vIDExLiBFeHBlY3RlZCB0byB0aHJvdyBhbiBlcnJvcjpcbi8vIGFzc2VydC50aHJvd3MoYmxvY2ssIEVycm9yX29wdCwgbWVzc2FnZV9vcHQpO1xuXG5hc3NlcnQudGhyb3dzID0gZnVuY3Rpb24oYmxvY2ssIC8qb3B0aW9uYWwqL2Vycm9yLCAvKm9wdGlvbmFsKi9tZXNzYWdlKSB7XG4gIF90aHJvd3MuYXBwbHkodGhpcywgW3RydWVdLmNvbmNhdChwU2xpY2UuY2FsbChhcmd1bWVudHMpKSk7XG59O1xuXG4vLyBFWFRFTlNJT04hIFRoaXMgaXMgYW5ub3lpbmcgdG8gd3JpdGUgb3V0c2lkZSB0aGlzIG1vZHVsZS5cbmFzc2VydC5kb2VzTm90VGhyb3cgPSBmdW5jdGlvbihibG9jaywgLypvcHRpb25hbCovbWVzc2FnZSkge1xuICBfdGhyb3dzLmFwcGx5KHRoaXMsIFtmYWxzZV0uY29uY2F0KHBTbGljZS5jYWxsKGFyZ3VtZW50cykpKTtcbn07XG5cbmFzc2VydC5pZkVycm9yID0gZnVuY3Rpb24oZXJyKSB7IGlmIChlcnIpIHt0aHJvdyBlcnI7fX07XG5cbnZhciBvYmplY3RLZXlzID0gT2JqZWN0LmtleXMgfHwgZnVuY3Rpb24gKG9iaikge1xuICB2YXIga2V5cyA9IFtdO1xuICBmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG4gICAgaWYgKGhhc093bi5jYWxsKG9iaiwga2V5KSkga2V5cy5wdXNoKGtleSk7XG4gIH1cbiAgcmV0dXJuIGtleXM7XG59O1xuIiwiIiwiaWYgKHR5cGVvZiBPYmplY3QuY3JlYXRlID09PSAnZnVuY3Rpb24nKSB7XG4gIC8vIGltcGxlbWVudGF0aW9uIGZyb20gc3RhbmRhcmQgbm9kZS5qcyAndXRpbCcgbW9kdWxlXG4gIG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaW5oZXJpdHMoY3Rvciwgc3VwZXJDdG9yKSB7XG4gICAgY3Rvci5zdXBlcl8gPSBzdXBlckN0b3JcbiAgICBjdG9yLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDdG9yLnByb3RvdHlwZSwge1xuICAgICAgY29uc3RydWN0b3I6IHtcbiAgICAgICAgdmFsdWU6IGN0b3IsXG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgICB9XG4gICAgfSk7XG4gIH07XG59IGVsc2Uge1xuICAvLyBvbGQgc2Nob29sIHNoaW0gZm9yIG9sZCBicm93c2Vyc1xuICBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGluaGVyaXRzKGN0b3IsIHN1cGVyQ3Rvcikge1xuICAgIGN0b3Iuc3VwZXJfID0gc3VwZXJDdG9yXG4gICAgdmFyIFRlbXBDdG9yID0gZnVuY3Rpb24gKCkge31cbiAgICBUZW1wQ3Rvci5wcm90b3R5cGUgPSBzdXBlckN0b3IucHJvdG90eXBlXG4gICAgY3Rvci5wcm90b3R5cGUgPSBuZXcgVGVtcEN0b3IoKVxuICAgIGN0b3IucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gY3RvclxuICB9XG59XG4iLCIvLyBzaGltIGZvciB1c2luZyBwcm9jZXNzIGluIGJyb3dzZXJcblxudmFyIHByb2Nlc3MgPSBtb2R1bGUuZXhwb3J0cyA9IHt9O1xuXG4vLyBjYWNoZWQgZnJvbSB3aGF0ZXZlciBnbG9iYWwgaXMgcHJlc2VudCBzbyB0aGF0IHRlc3QgcnVubmVycyB0aGF0IHN0dWIgaXRcbi8vIGRvbid0IGJyZWFrIHRoaW5ncy4gIEJ1dCB3ZSBuZWVkIHRvIHdyYXAgaXQgaW4gYSB0cnkgY2F0Y2ggaW4gY2FzZSBpdCBpc1xuLy8gd3JhcHBlZCBpbiBzdHJpY3QgbW9kZSBjb2RlIHdoaWNoIGRvZXNuJ3QgZGVmaW5lIGFueSBnbG9iYWxzLiAgSXQncyBpbnNpZGUgYVxuLy8gZnVuY3Rpb24gYmVjYXVzZSB0cnkvY2F0Y2hlcyBkZW9wdGltaXplIGluIGNlcnRhaW4gZW5naW5lcy5cblxudmFyIGNhY2hlZFNldFRpbWVvdXQ7XG52YXIgY2FjaGVkQ2xlYXJUaW1lb3V0O1xuXG4oZnVuY3Rpb24gKCkge1xuICB0cnkge1xuICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICB9IGNhdGNoIChlKSB7XG4gICAgY2FjaGVkU2V0VGltZW91dCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignc2V0VGltZW91dCBpcyBub3QgZGVmaW5lZCcpO1xuICAgIH1cbiAgfVxuICB0cnkge1xuICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgfSBjYXRjaCAoZSkge1xuICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignY2xlYXJUaW1lb3V0IGlzIG5vdCBkZWZpbmVkJyk7XG4gICAgfVxuICB9XG59ICgpKVxudmFyIHF1ZXVlID0gW107XG52YXIgZHJhaW5pbmcgPSBmYWxzZTtcbnZhciBjdXJyZW50UXVldWU7XG52YXIgcXVldWVJbmRleCA9IC0xO1xuXG5mdW5jdGlvbiBjbGVhblVwTmV4dFRpY2soKSB7XG4gICAgaWYgKCFkcmFpbmluZyB8fCAhY3VycmVudFF1ZXVlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBpZiAoY3VycmVudFF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBxdWV1ZSA9IGN1cnJlbnRRdWV1ZS5jb25jYXQocXVldWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICB9XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBkcmFpblF1ZXVlKCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBkcmFpblF1ZXVlKCkge1xuICAgIGlmIChkcmFpbmluZykge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciB0aW1lb3V0ID0gY2FjaGVkU2V0VGltZW91dChjbGVhblVwTmV4dFRpY2spO1xuICAgIGRyYWluaW5nID0gdHJ1ZTtcblxuICAgIHZhciBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgd2hpbGUobGVuKSB7XG4gICAgICAgIGN1cnJlbnRRdWV1ZSA9IHF1ZXVlO1xuICAgICAgICBxdWV1ZSA9IFtdO1xuICAgICAgICB3aGlsZSAoKytxdWV1ZUluZGV4IDwgbGVuKSB7XG4gICAgICAgICAgICBpZiAoY3VycmVudFF1ZXVlKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudFF1ZXVlW3F1ZXVlSW5kZXhdLnJ1bigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICAgICAgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIH1cbiAgICBjdXJyZW50UXVldWUgPSBudWxsO1xuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgY2FjaGVkQ2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xufVxuXG5wcm9jZXNzLm5leHRUaWNrID0gZnVuY3Rpb24gKGZ1bikge1xuICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGggLSAxKTtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGFyZ3NbaSAtIDFdID0gYXJndW1lbnRzW2ldO1xuICAgICAgICB9XG4gICAgfVxuICAgIHF1ZXVlLnB1c2gobmV3IEl0ZW0oZnVuLCBhcmdzKSk7XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCA9PT0gMSAmJiAhZHJhaW5pbmcpIHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dChkcmFpblF1ZXVlLCAwKTtcbiAgICB9XG59O1xuXG4vLyB2OCBsaWtlcyBwcmVkaWN0aWJsZSBvYmplY3RzXG5mdW5jdGlvbiBJdGVtKGZ1biwgYXJyYXkpIHtcbiAgICB0aGlzLmZ1biA9IGZ1bjtcbiAgICB0aGlzLmFycmF5ID0gYXJyYXk7XG59XG5JdGVtLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5mdW4uYXBwbHkobnVsbCwgdGhpcy5hcnJheSk7XG59O1xucHJvY2Vzcy50aXRsZSA9ICdicm93c2VyJztcbnByb2Nlc3MuYnJvd3NlciA9IHRydWU7XG5wcm9jZXNzLmVudiA9IHt9O1xucHJvY2Vzcy5hcmd2ID0gW107XG5wcm9jZXNzLnZlcnNpb24gPSAnJzsgLy8gZW1wdHkgc3RyaW5nIHRvIGF2b2lkIHJlZ2V4cCBpc3N1ZXNcbnByb2Nlc3MudmVyc2lvbnMgPSB7fTtcblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbnByb2Nlc3Mub24gPSBub29wO1xucHJvY2Vzcy5hZGRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLm9uY2UgPSBub29wO1xucHJvY2Vzcy5vZmYgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUFsbExpc3RlbmVycyA9IG5vb3A7XG5wcm9jZXNzLmVtaXQgPSBub29wO1xuXG5wcm9jZXNzLmJpbmRpbmcgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5iaW5kaW5nIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5cbnByb2Nlc3MuY3dkID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gJy8nIH07XG5wcm9jZXNzLmNoZGlyID0gZnVuY3Rpb24gKGRpcikge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5jaGRpciBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xucHJvY2Vzcy51bWFzayA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gMDsgfTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaXNCdWZmZXIoYXJnKSB7XG4gIHJldHVybiBhcmcgJiYgdHlwZW9mIGFyZyA9PT0gJ29iamVjdCdcbiAgICAmJiB0eXBlb2YgYXJnLmNvcHkgPT09ICdmdW5jdGlvbidcbiAgICAmJiB0eXBlb2YgYXJnLmZpbGwgPT09ICdmdW5jdGlvbidcbiAgICAmJiB0eXBlb2YgYXJnLnJlYWRVSW50OCA9PT0gJ2Z1bmN0aW9uJztcbn0iLCIvLyBDb3B5cmlnaHQgSm95ZW50LCBJbmMuIGFuZCBvdGhlciBOb2RlIGNvbnRyaWJ1dG9ycy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYVxuLy8gY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZVxuLy8gXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nXG4vLyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsXG4vLyBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0XG4vLyBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGVcbi8vIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkXG4vLyBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTXG4vLyBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GXG4vLyBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOXG4vLyBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSxcbi8vIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUlxuLy8gT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRVxuLy8gVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cblxudmFyIGZvcm1hdFJlZ0V4cCA9IC8lW3NkaiVdL2c7XG5leHBvcnRzLmZvcm1hdCA9IGZ1bmN0aW9uKGYpIHtcbiAgaWYgKCFpc1N0cmluZyhmKSkge1xuICAgIHZhciBvYmplY3RzID0gW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIG9iamVjdHMucHVzaChpbnNwZWN0KGFyZ3VtZW50c1tpXSkpO1xuICAgIH1cbiAgICByZXR1cm4gb2JqZWN0cy5qb2luKCcgJyk7XG4gIH1cblxuICB2YXIgaSA9IDE7XG4gIHZhciBhcmdzID0gYXJndW1lbnRzO1xuICB2YXIgbGVuID0gYXJncy5sZW5ndGg7XG4gIHZhciBzdHIgPSBTdHJpbmcoZikucmVwbGFjZShmb3JtYXRSZWdFeHAsIGZ1bmN0aW9uKHgpIHtcbiAgICBpZiAoeCA9PT0gJyUlJykgcmV0dXJuICclJztcbiAgICBpZiAoaSA+PSBsZW4pIHJldHVybiB4O1xuICAgIHN3aXRjaCAoeCkge1xuICAgICAgY2FzZSAnJXMnOiByZXR1cm4gU3RyaW5nKGFyZ3NbaSsrXSk7XG4gICAgICBjYXNlICclZCc6IHJldHVybiBOdW1iZXIoYXJnc1tpKytdKTtcbiAgICAgIGNhc2UgJyVqJzpcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoYXJnc1tpKytdKTtcbiAgICAgICAgfSBjYXRjaCAoXykge1xuICAgICAgICAgIHJldHVybiAnW0NpcmN1bGFyXSc7XG4gICAgICAgIH1cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiB4O1xuICAgIH1cbiAgfSk7XG4gIGZvciAodmFyIHggPSBhcmdzW2ldOyBpIDwgbGVuOyB4ID0gYXJnc1srK2ldKSB7XG4gICAgaWYgKGlzTnVsbCh4KSB8fCAhaXNPYmplY3QoeCkpIHtcbiAgICAgIHN0ciArPSAnICcgKyB4O1xuICAgIH0gZWxzZSB7XG4gICAgICBzdHIgKz0gJyAnICsgaW5zcGVjdCh4KTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHN0cjtcbn07XG5cblxuLy8gTWFyayB0aGF0IGEgbWV0aG9kIHNob3VsZCBub3QgYmUgdXNlZC5cbi8vIFJldHVybnMgYSBtb2RpZmllZCBmdW5jdGlvbiB3aGljaCB3YXJucyBvbmNlIGJ5IGRlZmF1bHQuXG4vLyBJZiAtLW5vLWRlcHJlY2F0aW9uIGlzIHNldCwgdGhlbiBpdCBpcyBhIG5vLW9wLlxuZXhwb3J0cy5kZXByZWNhdGUgPSBmdW5jdGlvbihmbiwgbXNnKSB7XG4gIC8vIEFsbG93IGZvciBkZXByZWNhdGluZyB0aGluZ3MgaW4gdGhlIHByb2Nlc3Mgb2Ygc3RhcnRpbmcgdXAuXG4gIGlmIChpc1VuZGVmaW5lZChnbG9iYWwucHJvY2VzcykpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gZXhwb3J0cy5kZXByZWNhdGUoZm4sIG1zZykuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9O1xuICB9XG5cbiAgaWYgKHByb2Nlc3Mubm9EZXByZWNhdGlvbiA9PT0gdHJ1ZSkge1xuICAgIHJldHVybiBmbjtcbiAgfVxuXG4gIHZhciB3YXJuZWQgPSBmYWxzZTtcbiAgZnVuY3Rpb24gZGVwcmVjYXRlZCgpIHtcbiAgICBpZiAoIXdhcm5lZCkge1xuICAgICAgaWYgKHByb2Nlc3MudGhyb3dEZXByZWNhdGlvbikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IobXNnKTtcbiAgICAgIH0gZWxzZSBpZiAocHJvY2Vzcy50cmFjZURlcHJlY2F0aW9uKSB7XG4gICAgICAgIGNvbnNvbGUudHJhY2UobXNnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IobXNnKTtcbiAgICAgIH1cbiAgICAgIHdhcm5lZCA9IHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICB9XG5cbiAgcmV0dXJuIGRlcHJlY2F0ZWQ7XG59O1xuXG5cbnZhciBkZWJ1Z3MgPSB7fTtcbnZhciBkZWJ1Z0Vudmlyb247XG5leHBvcnRzLmRlYnVnbG9nID0gZnVuY3Rpb24oc2V0KSB7XG4gIGlmIChpc1VuZGVmaW5lZChkZWJ1Z0Vudmlyb24pKVxuICAgIGRlYnVnRW52aXJvbiA9IHByb2Nlc3MuZW52Lk5PREVfREVCVUcgfHwgJyc7XG4gIHNldCA9IHNldC50b1VwcGVyQ2FzZSgpO1xuICBpZiAoIWRlYnVnc1tzZXRdKSB7XG4gICAgaWYgKG5ldyBSZWdFeHAoJ1xcXFxiJyArIHNldCArICdcXFxcYicsICdpJykudGVzdChkZWJ1Z0Vudmlyb24pKSB7XG4gICAgICB2YXIgcGlkID0gcHJvY2Vzcy5waWQ7XG4gICAgICBkZWJ1Z3Nbc2V0XSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgbXNnID0gZXhwb3J0cy5mb3JtYXQuYXBwbHkoZXhwb3J0cywgYXJndW1lbnRzKTtcbiAgICAgICAgY29uc29sZS5lcnJvcignJXMgJWQ6ICVzJywgc2V0LCBwaWQsIG1zZyk7XG4gICAgICB9O1xuICAgIH0gZWxzZSB7XG4gICAgICBkZWJ1Z3Nbc2V0XSA9IGZ1bmN0aW9uKCkge307XG4gICAgfVxuICB9XG4gIHJldHVybiBkZWJ1Z3Nbc2V0XTtcbn07XG5cblxuLyoqXG4gKiBFY2hvcyB0aGUgdmFsdWUgb2YgYSB2YWx1ZS4gVHJ5cyB0byBwcmludCB0aGUgdmFsdWUgb3V0XG4gKiBpbiB0aGUgYmVzdCB3YXkgcG9zc2libGUgZ2l2ZW4gdGhlIGRpZmZlcmVudCB0eXBlcy5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqIFRoZSBvYmplY3QgdG8gcHJpbnQgb3V0LlxuICogQHBhcmFtIHtPYmplY3R9IG9wdHMgT3B0aW9uYWwgb3B0aW9ucyBvYmplY3QgdGhhdCBhbHRlcnMgdGhlIG91dHB1dC5cbiAqL1xuLyogbGVnYWN5OiBvYmosIHNob3dIaWRkZW4sIGRlcHRoLCBjb2xvcnMqL1xuZnVuY3Rpb24gaW5zcGVjdChvYmosIG9wdHMpIHtcbiAgLy8gZGVmYXVsdCBvcHRpb25zXG4gIHZhciBjdHggPSB7XG4gICAgc2VlbjogW10sXG4gICAgc3R5bGl6ZTogc3R5bGl6ZU5vQ29sb3JcbiAgfTtcbiAgLy8gbGVnYWN5Li4uXG4gIGlmIChhcmd1bWVudHMubGVuZ3RoID49IDMpIGN0eC5kZXB0aCA9IGFyZ3VtZW50c1syXTtcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPj0gNCkgY3R4LmNvbG9ycyA9IGFyZ3VtZW50c1szXTtcbiAgaWYgKGlzQm9vbGVhbihvcHRzKSkge1xuICAgIC8vIGxlZ2FjeS4uLlxuICAgIGN0eC5zaG93SGlkZGVuID0gb3B0cztcbiAgfSBlbHNlIGlmIChvcHRzKSB7XG4gICAgLy8gZ290IGFuIFwib3B0aW9uc1wiIG9iamVjdFxuICAgIGV4cG9ydHMuX2V4dGVuZChjdHgsIG9wdHMpO1xuICB9XG4gIC8vIHNldCBkZWZhdWx0IG9wdGlvbnNcbiAgaWYgKGlzVW5kZWZpbmVkKGN0eC5zaG93SGlkZGVuKSkgY3R4LnNob3dIaWRkZW4gPSBmYWxzZTtcbiAgaWYgKGlzVW5kZWZpbmVkKGN0eC5kZXB0aCkpIGN0eC5kZXB0aCA9IDI7XG4gIGlmIChpc1VuZGVmaW5lZChjdHguY29sb3JzKSkgY3R4LmNvbG9ycyA9IGZhbHNlO1xuICBpZiAoaXNVbmRlZmluZWQoY3R4LmN1c3RvbUluc3BlY3QpKSBjdHguY3VzdG9tSW5zcGVjdCA9IHRydWU7XG4gIGlmIChjdHguY29sb3JzKSBjdHguc3R5bGl6ZSA9IHN0eWxpemVXaXRoQ29sb3I7XG4gIHJldHVybiBmb3JtYXRWYWx1ZShjdHgsIG9iaiwgY3R4LmRlcHRoKTtcbn1cbmV4cG9ydHMuaW5zcGVjdCA9IGluc3BlY3Q7XG5cblxuLy8gaHR0cDovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9BTlNJX2VzY2FwZV9jb2RlI2dyYXBoaWNzXG5pbnNwZWN0LmNvbG9ycyA9IHtcbiAgJ2JvbGQnIDogWzEsIDIyXSxcbiAgJ2l0YWxpYycgOiBbMywgMjNdLFxuICAndW5kZXJsaW5lJyA6IFs0LCAyNF0sXG4gICdpbnZlcnNlJyA6IFs3LCAyN10sXG4gICd3aGl0ZScgOiBbMzcsIDM5XSxcbiAgJ2dyZXknIDogWzkwLCAzOV0sXG4gICdibGFjaycgOiBbMzAsIDM5XSxcbiAgJ2JsdWUnIDogWzM0LCAzOV0sXG4gICdjeWFuJyA6IFszNiwgMzldLFxuICAnZ3JlZW4nIDogWzMyLCAzOV0sXG4gICdtYWdlbnRhJyA6IFszNSwgMzldLFxuICAncmVkJyA6IFszMSwgMzldLFxuICAneWVsbG93JyA6IFszMywgMzldXG59O1xuXG4vLyBEb24ndCB1c2UgJ2JsdWUnIG5vdCB2aXNpYmxlIG9uIGNtZC5leGVcbmluc3BlY3Quc3R5bGVzID0ge1xuICAnc3BlY2lhbCc6ICdjeWFuJyxcbiAgJ251bWJlcic6ICd5ZWxsb3cnLFxuICAnYm9vbGVhbic6ICd5ZWxsb3cnLFxuICAndW5kZWZpbmVkJzogJ2dyZXknLFxuICAnbnVsbCc6ICdib2xkJyxcbiAgJ3N0cmluZyc6ICdncmVlbicsXG4gICdkYXRlJzogJ21hZ2VudGEnLFxuICAvLyBcIm5hbWVcIjogaW50ZW50aW9uYWxseSBub3Qgc3R5bGluZ1xuICAncmVnZXhwJzogJ3JlZCdcbn07XG5cblxuZnVuY3Rpb24gc3R5bGl6ZVdpdGhDb2xvcihzdHIsIHN0eWxlVHlwZSkge1xuICB2YXIgc3R5bGUgPSBpbnNwZWN0LnN0eWxlc1tzdHlsZVR5cGVdO1xuXG4gIGlmIChzdHlsZSkge1xuICAgIHJldHVybiAnXFx1MDAxYlsnICsgaW5zcGVjdC5jb2xvcnNbc3R5bGVdWzBdICsgJ20nICsgc3RyICtcbiAgICAgICAgICAgJ1xcdTAwMWJbJyArIGluc3BlY3QuY29sb3JzW3N0eWxlXVsxXSArICdtJztcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gc3RyO1xuICB9XG59XG5cblxuZnVuY3Rpb24gc3R5bGl6ZU5vQ29sb3Ioc3RyLCBzdHlsZVR5cGUpIHtcbiAgcmV0dXJuIHN0cjtcbn1cblxuXG5mdW5jdGlvbiBhcnJheVRvSGFzaChhcnJheSkge1xuICB2YXIgaGFzaCA9IHt9O1xuXG4gIGFycmF5LmZvckVhY2goZnVuY3Rpb24odmFsLCBpZHgpIHtcbiAgICBoYXNoW3ZhbF0gPSB0cnVlO1xuICB9KTtcblxuICByZXR1cm4gaGFzaDtcbn1cblxuXG5mdW5jdGlvbiBmb3JtYXRWYWx1ZShjdHgsIHZhbHVlLCByZWN1cnNlVGltZXMpIHtcbiAgLy8gUHJvdmlkZSBhIGhvb2sgZm9yIHVzZXItc3BlY2lmaWVkIGluc3BlY3QgZnVuY3Rpb25zLlxuICAvLyBDaGVjayB0aGF0IHZhbHVlIGlzIGFuIG9iamVjdCB3aXRoIGFuIGluc3BlY3QgZnVuY3Rpb24gb24gaXRcbiAgaWYgKGN0eC5jdXN0b21JbnNwZWN0ICYmXG4gICAgICB2YWx1ZSAmJlxuICAgICAgaXNGdW5jdGlvbih2YWx1ZS5pbnNwZWN0KSAmJlxuICAgICAgLy8gRmlsdGVyIG91dCB0aGUgdXRpbCBtb2R1bGUsIGl0J3MgaW5zcGVjdCBmdW5jdGlvbiBpcyBzcGVjaWFsXG4gICAgICB2YWx1ZS5pbnNwZWN0ICE9PSBleHBvcnRzLmluc3BlY3QgJiZcbiAgICAgIC8vIEFsc28gZmlsdGVyIG91dCBhbnkgcHJvdG90eXBlIG9iamVjdHMgdXNpbmcgdGhlIGNpcmN1bGFyIGNoZWNrLlxuICAgICAgISh2YWx1ZS5jb25zdHJ1Y3RvciAmJiB2YWx1ZS5jb25zdHJ1Y3Rvci5wcm90b3R5cGUgPT09IHZhbHVlKSkge1xuICAgIHZhciByZXQgPSB2YWx1ZS5pbnNwZWN0KHJlY3Vyc2VUaW1lcywgY3R4KTtcbiAgICBpZiAoIWlzU3RyaW5nKHJldCkpIHtcbiAgICAgIHJldCA9IGZvcm1hdFZhbHVlKGN0eCwgcmV0LCByZWN1cnNlVGltZXMpO1xuICAgIH1cbiAgICByZXR1cm4gcmV0O1xuICB9XG5cbiAgLy8gUHJpbWl0aXZlIHR5cGVzIGNhbm5vdCBoYXZlIHByb3BlcnRpZXNcbiAgdmFyIHByaW1pdGl2ZSA9IGZvcm1hdFByaW1pdGl2ZShjdHgsIHZhbHVlKTtcbiAgaWYgKHByaW1pdGl2ZSkge1xuICAgIHJldHVybiBwcmltaXRpdmU7XG4gIH1cblxuICAvLyBMb29rIHVwIHRoZSBrZXlzIG9mIHRoZSBvYmplY3QuXG4gIHZhciBrZXlzID0gT2JqZWN0LmtleXModmFsdWUpO1xuICB2YXIgdmlzaWJsZUtleXMgPSBhcnJheVRvSGFzaChrZXlzKTtcblxuICBpZiAoY3R4LnNob3dIaWRkZW4pIHtcbiAgICBrZXlzID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModmFsdWUpO1xuICB9XG5cbiAgLy8gSUUgZG9lc24ndCBtYWtlIGVycm9yIGZpZWxkcyBub24tZW51bWVyYWJsZVxuICAvLyBodHRwOi8vbXNkbi5taWNyb3NvZnQuY29tL2VuLXVzL2xpYnJhcnkvaWUvZHd3NTJzYnQodj12cy45NCkuYXNweFxuICBpZiAoaXNFcnJvcih2YWx1ZSlcbiAgICAgICYmIChrZXlzLmluZGV4T2YoJ21lc3NhZ2UnKSA+PSAwIHx8IGtleXMuaW5kZXhPZignZGVzY3JpcHRpb24nKSA+PSAwKSkge1xuICAgIHJldHVybiBmb3JtYXRFcnJvcih2YWx1ZSk7XG4gIH1cblxuICAvLyBTb21lIHR5cGUgb2Ygb2JqZWN0IHdpdGhvdXQgcHJvcGVydGllcyBjYW4gYmUgc2hvcnRjdXR0ZWQuXG4gIGlmIChrZXlzLmxlbmd0aCA9PT0gMCkge1xuICAgIGlmIChpc0Z1bmN0aW9uKHZhbHVlKSkge1xuICAgICAgdmFyIG5hbWUgPSB2YWx1ZS5uYW1lID8gJzogJyArIHZhbHVlLm5hbWUgOiAnJztcbiAgICAgIHJldHVybiBjdHguc3R5bGl6ZSgnW0Z1bmN0aW9uJyArIG5hbWUgKyAnXScsICdzcGVjaWFsJyk7XG4gICAgfVxuICAgIGlmIChpc1JlZ0V4cCh2YWx1ZSkpIHtcbiAgICAgIHJldHVybiBjdHguc3R5bGl6ZShSZWdFeHAucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodmFsdWUpLCAncmVnZXhwJyk7XG4gICAgfVxuICAgIGlmIChpc0RhdGUodmFsdWUpKSB7XG4gICAgICByZXR1cm4gY3R4LnN0eWxpemUoRGF0ZS5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh2YWx1ZSksICdkYXRlJyk7XG4gICAgfVxuICAgIGlmIChpc0Vycm9yKHZhbHVlKSkge1xuICAgICAgcmV0dXJuIGZvcm1hdEVycm9yKHZhbHVlKTtcbiAgICB9XG4gIH1cblxuICB2YXIgYmFzZSA9ICcnLCBhcnJheSA9IGZhbHNlLCBicmFjZXMgPSBbJ3snLCAnfSddO1xuXG4gIC8vIE1ha2UgQXJyYXkgc2F5IHRoYXQgdGhleSBhcmUgQXJyYXlcbiAgaWYgKGlzQXJyYXkodmFsdWUpKSB7XG4gICAgYXJyYXkgPSB0cnVlO1xuICAgIGJyYWNlcyA9IFsnWycsICddJ107XG4gIH1cblxuICAvLyBNYWtlIGZ1bmN0aW9ucyBzYXkgdGhhdCB0aGV5IGFyZSBmdW5jdGlvbnNcbiAgaWYgKGlzRnVuY3Rpb24odmFsdWUpKSB7XG4gICAgdmFyIG4gPSB2YWx1ZS5uYW1lID8gJzogJyArIHZhbHVlLm5hbWUgOiAnJztcbiAgICBiYXNlID0gJyBbRnVuY3Rpb24nICsgbiArICddJztcbiAgfVxuXG4gIC8vIE1ha2UgUmVnRXhwcyBzYXkgdGhhdCB0aGV5IGFyZSBSZWdFeHBzXG4gIGlmIChpc1JlZ0V4cCh2YWx1ZSkpIHtcbiAgICBiYXNlID0gJyAnICsgUmVnRXhwLnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHZhbHVlKTtcbiAgfVxuXG4gIC8vIE1ha2UgZGF0ZXMgd2l0aCBwcm9wZXJ0aWVzIGZpcnN0IHNheSB0aGUgZGF0ZVxuICBpZiAoaXNEYXRlKHZhbHVlKSkge1xuICAgIGJhc2UgPSAnICcgKyBEYXRlLnByb3RvdHlwZS50b1VUQ1N0cmluZy5jYWxsKHZhbHVlKTtcbiAgfVxuXG4gIC8vIE1ha2UgZXJyb3Igd2l0aCBtZXNzYWdlIGZpcnN0IHNheSB0aGUgZXJyb3JcbiAgaWYgKGlzRXJyb3IodmFsdWUpKSB7XG4gICAgYmFzZSA9ICcgJyArIGZvcm1hdEVycm9yKHZhbHVlKTtcbiAgfVxuXG4gIGlmIChrZXlzLmxlbmd0aCA9PT0gMCAmJiAoIWFycmF5IHx8IHZhbHVlLmxlbmd0aCA9PSAwKSkge1xuICAgIHJldHVybiBicmFjZXNbMF0gKyBiYXNlICsgYnJhY2VzWzFdO1xuICB9XG5cbiAgaWYgKHJlY3Vyc2VUaW1lcyA8IDApIHtcbiAgICBpZiAoaXNSZWdFeHAodmFsdWUpKSB7XG4gICAgICByZXR1cm4gY3R4LnN0eWxpemUoUmVnRXhwLnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHZhbHVlKSwgJ3JlZ2V4cCcpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gY3R4LnN0eWxpemUoJ1tPYmplY3RdJywgJ3NwZWNpYWwnKTtcbiAgICB9XG4gIH1cblxuICBjdHguc2Vlbi5wdXNoKHZhbHVlKTtcblxuICB2YXIgb3V0cHV0O1xuICBpZiAoYXJyYXkpIHtcbiAgICBvdXRwdXQgPSBmb3JtYXRBcnJheShjdHgsIHZhbHVlLCByZWN1cnNlVGltZXMsIHZpc2libGVLZXlzLCBrZXlzKTtcbiAgfSBlbHNlIHtcbiAgICBvdXRwdXQgPSBrZXlzLm1hcChmdW5jdGlvbihrZXkpIHtcbiAgICAgIHJldHVybiBmb3JtYXRQcm9wZXJ0eShjdHgsIHZhbHVlLCByZWN1cnNlVGltZXMsIHZpc2libGVLZXlzLCBrZXksIGFycmF5KTtcbiAgICB9KTtcbiAgfVxuXG4gIGN0eC5zZWVuLnBvcCgpO1xuXG4gIHJldHVybiByZWR1Y2VUb1NpbmdsZVN0cmluZyhvdXRwdXQsIGJhc2UsIGJyYWNlcyk7XG59XG5cblxuZnVuY3Rpb24gZm9ybWF0UHJpbWl0aXZlKGN0eCwgdmFsdWUpIHtcbiAgaWYgKGlzVW5kZWZpbmVkKHZhbHVlKSlcbiAgICByZXR1cm4gY3R4LnN0eWxpemUoJ3VuZGVmaW5lZCcsICd1bmRlZmluZWQnKTtcbiAgaWYgKGlzU3RyaW5nKHZhbHVlKSkge1xuICAgIHZhciBzaW1wbGUgPSAnXFwnJyArIEpTT04uc3RyaW5naWZ5KHZhbHVlKS5yZXBsYWNlKC9eXCJ8XCIkL2csICcnKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoLycvZywgXCJcXFxcJ1wiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoL1xcXFxcIi9nLCAnXCInKSArICdcXCcnO1xuICAgIHJldHVybiBjdHguc3R5bGl6ZShzaW1wbGUsICdzdHJpbmcnKTtcbiAgfVxuICBpZiAoaXNOdW1iZXIodmFsdWUpKVxuICAgIHJldHVybiBjdHguc3R5bGl6ZSgnJyArIHZhbHVlLCAnbnVtYmVyJyk7XG4gIGlmIChpc0Jvb2xlYW4odmFsdWUpKVxuICAgIHJldHVybiBjdHguc3R5bGl6ZSgnJyArIHZhbHVlLCAnYm9vbGVhbicpO1xuICAvLyBGb3Igc29tZSByZWFzb24gdHlwZW9mIG51bGwgaXMgXCJvYmplY3RcIiwgc28gc3BlY2lhbCBjYXNlIGhlcmUuXG4gIGlmIChpc051bGwodmFsdWUpKVxuICAgIHJldHVybiBjdHguc3R5bGl6ZSgnbnVsbCcsICdudWxsJyk7XG59XG5cblxuZnVuY3Rpb24gZm9ybWF0RXJyb3IodmFsdWUpIHtcbiAgcmV0dXJuICdbJyArIEVycm9yLnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHZhbHVlKSArICddJztcbn1cblxuXG5mdW5jdGlvbiBmb3JtYXRBcnJheShjdHgsIHZhbHVlLCByZWN1cnNlVGltZXMsIHZpc2libGVLZXlzLCBrZXlzKSB7XG4gIHZhciBvdXRwdXQgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDAsIGwgPSB2YWx1ZS5sZW5ndGg7IGkgPCBsOyArK2kpIHtcbiAgICBpZiAoaGFzT3duUHJvcGVydHkodmFsdWUsIFN0cmluZyhpKSkpIHtcbiAgICAgIG91dHB1dC5wdXNoKGZvcm1hdFByb3BlcnR5KGN0eCwgdmFsdWUsIHJlY3Vyc2VUaW1lcywgdmlzaWJsZUtleXMsXG4gICAgICAgICAgU3RyaW5nKGkpLCB0cnVlKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG91dHB1dC5wdXNoKCcnKTtcbiAgICB9XG4gIH1cbiAga2V5cy5mb3JFYWNoKGZ1bmN0aW9uKGtleSkge1xuICAgIGlmICgha2V5Lm1hdGNoKC9eXFxkKyQvKSkge1xuICAgICAgb3V0cHV0LnB1c2goZm9ybWF0UHJvcGVydHkoY3R4LCB2YWx1ZSwgcmVjdXJzZVRpbWVzLCB2aXNpYmxlS2V5cyxcbiAgICAgICAgICBrZXksIHRydWUpKTtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gb3V0cHV0O1xufVxuXG5cbmZ1bmN0aW9uIGZvcm1hdFByb3BlcnR5KGN0eCwgdmFsdWUsIHJlY3Vyc2VUaW1lcywgdmlzaWJsZUtleXMsIGtleSwgYXJyYXkpIHtcbiAgdmFyIG5hbWUsIHN0ciwgZGVzYztcbiAgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodmFsdWUsIGtleSkgfHwgeyB2YWx1ZTogdmFsdWVba2V5XSB9O1xuICBpZiAoZGVzYy5nZXQpIHtcbiAgICBpZiAoZGVzYy5zZXQpIHtcbiAgICAgIHN0ciA9IGN0eC5zdHlsaXplKCdbR2V0dGVyL1NldHRlcl0nLCAnc3BlY2lhbCcpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdHIgPSBjdHguc3R5bGl6ZSgnW0dldHRlcl0nLCAnc3BlY2lhbCcpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBpZiAoZGVzYy5zZXQpIHtcbiAgICAgIHN0ciA9IGN0eC5zdHlsaXplKCdbU2V0dGVyXScsICdzcGVjaWFsJyk7XG4gICAgfVxuICB9XG4gIGlmICghaGFzT3duUHJvcGVydHkodmlzaWJsZUtleXMsIGtleSkpIHtcbiAgICBuYW1lID0gJ1snICsga2V5ICsgJ10nO1xuICB9XG4gIGlmICghc3RyKSB7XG4gICAgaWYgKGN0eC5zZWVuLmluZGV4T2YoZGVzYy52YWx1ZSkgPCAwKSB7XG4gICAgICBpZiAoaXNOdWxsKHJlY3Vyc2VUaW1lcykpIHtcbiAgICAgICAgc3RyID0gZm9ybWF0VmFsdWUoY3R4LCBkZXNjLnZhbHVlLCBudWxsKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHN0ciA9IGZvcm1hdFZhbHVlKGN0eCwgZGVzYy52YWx1ZSwgcmVjdXJzZVRpbWVzIC0gMSk7XG4gICAgICB9XG4gICAgICBpZiAoc3RyLmluZGV4T2YoJ1xcbicpID4gLTEpIHtcbiAgICAgICAgaWYgKGFycmF5KSB7XG4gICAgICAgICAgc3RyID0gc3RyLnNwbGl0KCdcXG4nKS5tYXAoZnVuY3Rpb24obGluZSkge1xuICAgICAgICAgICAgcmV0dXJuICcgICcgKyBsaW5lO1xuICAgICAgICAgIH0pLmpvaW4oJ1xcbicpLnN1YnN0cigyKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzdHIgPSAnXFxuJyArIHN0ci5zcGxpdCgnXFxuJykubWFwKGZ1bmN0aW9uKGxpbmUpIHtcbiAgICAgICAgICAgIHJldHVybiAnICAgJyArIGxpbmU7XG4gICAgICAgICAgfSkuam9pbignXFxuJyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgc3RyID0gY3R4LnN0eWxpemUoJ1tDaXJjdWxhcl0nLCAnc3BlY2lhbCcpO1xuICAgIH1cbiAgfVxuICBpZiAoaXNVbmRlZmluZWQobmFtZSkpIHtcbiAgICBpZiAoYXJyYXkgJiYga2V5Lm1hdGNoKC9eXFxkKyQvKSkge1xuICAgICAgcmV0dXJuIHN0cjtcbiAgICB9XG4gICAgbmFtZSA9IEpTT04uc3RyaW5naWZ5KCcnICsga2V5KTtcbiAgICBpZiAobmFtZS5tYXRjaCgvXlwiKFthLXpBLVpfXVthLXpBLVpfMC05XSopXCIkLykpIHtcbiAgICAgIG5hbWUgPSBuYW1lLnN1YnN0cigxLCBuYW1lLmxlbmd0aCAtIDIpO1xuICAgICAgbmFtZSA9IGN0eC5zdHlsaXplKG5hbWUsICduYW1lJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG5hbWUgPSBuYW1lLnJlcGxhY2UoLycvZywgXCJcXFxcJ1wiKVxuICAgICAgICAgICAgICAgICAucmVwbGFjZSgvXFxcXFwiL2csICdcIicpXG4gICAgICAgICAgICAgICAgIC5yZXBsYWNlKC8oXlwifFwiJCkvZywgXCInXCIpO1xuICAgICAgbmFtZSA9IGN0eC5zdHlsaXplKG5hbWUsICdzdHJpbmcnKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gbmFtZSArICc6ICcgKyBzdHI7XG59XG5cblxuZnVuY3Rpb24gcmVkdWNlVG9TaW5nbGVTdHJpbmcob3V0cHV0LCBiYXNlLCBicmFjZXMpIHtcbiAgdmFyIG51bUxpbmVzRXN0ID0gMDtcbiAgdmFyIGxlbmd0aCA9IG91dHB1dC5yZWR1Y2UoZnVuY3Rpb24ocHJldiwgY3VyKSB7XG4gICAgbnVtTGluZXNFc3QrKztcbiAgICBpZiAoY3VyLmluZGV4T2YoJ1xcbicpID49IDApIG51bUxpbmVzRXN0Kys7XG4gICAgcmV0dXJuIHByZXYgKyBjdXIucmVwbGFjZSgvXFx1MDAxYlxcW1xcZFxcZD9tL2csICcnKS5sZW5ndGggKyAxO1xuICB9LCAwKTtcblxuICBpZiAobGVuZ3RoID4gNjApIHtcbiAgICByZXR1cm4gYnJhY2VzWzBdICtcbiAgICAgICAgICAgKGJhc2UgPT09ICcnID8gJycgOiBiYXNlICsgJ1xcbiAnKSArXG4gICAgICAgICAgICcgJyArXG4gICAgICAgICAgIG91dHB1dC5qb2luKCcsXFxuICAnKSArXG4gICAgICAgICAgICcgJyArXG4gICAgICAgICAgIGJyYWNlc1sxXTtcbiAgfVxuXG4gIHJldHVybiBicmFjZXNbMF0gKyBiYXNlICsgJyAnICsgb3V0cHV0LmpvaW4oJywgJykgKyAnICcgKyBicmFjZXNbMV07XG59XG5cblxuLy8gTk9URTogVGhlc2UgdHlwZSBjaGVja2luZyBmdW5jdGlvbnMgaW50ZW50aW9uYWxseSBkb24ndCB1c2UgYGluc3RhbmNlb2ZgXG4vLyBiZWNhdXNlIGl0IGlzIGZyYWdpbGUgYW5kIGNhbiBiZSBlYXNpbHkgZmFrZWQgd2l0aCBgT2JqZWN0LmNyZWF0ZSgpYC5cbmZ1bmN0aW9uIGlzQXJyYXkoYXIpIHtcbiAgcmV0dXJuIEFycmF5LmlzQXJyYXkoYXIpO1xufVxuZXhwb3J0cy5pc0FycmF5ID0gaXNBcnJheTtcblxuZnVuY3Rpb24gaXNCb29sZWFuKGFyZykge1xuICByZXR1cm4gdHlwZW9mIGFyZyA9PT0gJ2Jvb2xlYW4nO1xufVxuZXhwb3J0cy5pc0Jvb2xlYW4gPSBpc0Jvb2xlYW47XG5cbmZ1bmN0aW9uIGlzTnVsbChhcmcpIHtcbiAgcmV0dXJuIGFyZyA9PT0gbnVsbDtcbn1cbmV4cG9ydHMuaXNOdWxsID0gaXNOdWxsO1xuXG5mdW5jdGlvbiBpc051bGxPclVuZGVmaW5lZChhcmcpIHtcbiAgcmV0dXJuIGFyZyA9PSBudWxsO1xufVxuZXhwb3J0cy5pc051bGxPclVuZGVmaW5lZCA9IGlzTnVsbE9yVW5kZWZpbmVkO1xuXG5mdW5jdGlvbiBpc051bWJlcihhcmcpIHtcbiAgcmV0dXJuIHR5cGVvZiBhcmcgPT09ICdudW1iZXInO1xufVxuZXhwb3J0cy5pc051bWJlciA9IGlzTnVtYmVyO1xuXG5mdW5jdGlvbiBpc1N0cmluZyhhcmcpIHtcbiAgcmV0dXJuIHR5cGVvZiBhcmcgPT09ICdzdHJpbmcnO1xufVxuZXhwb3J0cy5pc1N0cmluZyA9IGlzU3RyaW5nO1xuXG5mdW5jdGlvbiBpc1N5bWJvbChhcmcpIHtcbiAgcmV0dXJuIHR5cGVvZiBhcmcgPT09ICdzeW1ib2wnO1xufVxuZXhwb3J0cy5pc1N5bWJvbCA9IGlzU3ltYm9sO1xuXG5mdW5jdGlvbiBpc1VuZGVmaW5lZChhcmcpIHtcbiAgcmV0dXJuIGFyZyA9PT0gdm9pZCAwO1xufVxuZXhwb3J0cy5pc1VuZGVmaW5lZCA9IGlzVW5kZWZpbmVkO1xuXG5mdW5jdGlvbiBpc1JlZ0V4cChyZSkge1xuICByZXR1cm4gaXNPYmplY3QocmUpICYmIG9iamVjdFRvU3RyaW5nKHJlKSA9PT0gJ1tvYmplY3QgUmVnRXhwXSc7XG59XG5leHBvcnRzLmlzUmVnRXhwID0gaXNSZWdFeHA7XG5cbmZ1bmN0aW9uIGlzT2JqZWN0KGFyZykge1xuICByZXR1cm4gdHlwZW9mIGFyZyA9PT0gJ29iamVjdCcgJiYgYXJnICE9PSBudWxsO1xufVxuZXhwb3J0cy5pc09iamVjdCA9IGlzT2JqZWN0O1xuXG5mdW5jdGlvbiBpc0RhdGUoZCkge1xuICByZXR1cm4gaXNPYmplY3QoZCkgJiYgb2JqZWN0VG9TdHJpbmcoZCkgPT09ICdbb2JqZWN0IERhdGVdJztcbn1cbmV4cG9ydHMuaXNEYXRlID0gaXNEYXRlO1xuXG5mdW5jdGlvbiBpc0Vycm9yKGUpIHtcbiAgcmV0dXJuIGlzT2JqZWN0KGUpICYmXG4gICAgICAob2JqZWN0VG9TdHJpbmcoZSkgPT09ICdbb2JqZWN0IEVycm9yXScgfHwgZSBpbnN0YW5jZW9mIEVycm9yKTtcbn1cbmV4cG9ydHMuaXNFcnJvciA9IGlzRXJyb3I7XG5cbmZ1bmN0aW9uIGlzRnVuY3Rpb24oYXJnKSB7XG4gIHJldHVybiB0eXBlb2YgYXJnID09PSAnZnVuY3Rpb24nO1xufVxuZXhwb3J0cy5pc0Z1bmN0aW9uID0gaXNGdW5jdGlvbjtcblxuZnVuY3Rpb24gaXNQcmltaXRpdmUoYXJnKSB7XG4gIHJldHVybiBhcmcgPT09IG51bGwgfHxcbiAgICAgICAgIHR5cGVvZiBhcmcgPT09ICdib29sZWFuJyB8fFxuICAgICAgICAgdHlwZW9mIGFyZyA9PT0gJ251bWJlcicgfHxcbiAgICAgICAgIHR5cGVvZiBhcmcgPT09ICdzdHJpbmcnIHx8XG4gICAgICAgICB0eXBlb2YgYXJnID09PSAnc3ltYm9sJyB8fCAgLy8gRVM2IHN5bWJvbFxuICAgICAgICAgdHlwZW9mIGFyZyA9PT0gJ3VuZGVmaW5lZCc7XG59XG5leHBvcnRzLmlzUHJpbWl0aXZlID0gaXNQcmltaXRpdmU7XG5cbmV4cG9ydHMuaXNCdWZmZXIgPSByZXF1aXJlKCcuL3N1cHBvcnQvaXNCdWZmZXInKTtcblxuZnVuY3Rpb24gb2JqZWN0VG9TdHJpbmcobykge1xuICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG8pO1xufVxuXG5cbmZ1bmN0aW9uIHBhZChuKSB7XG4gIHJldHVybiBuIDwgMTAgPyAnMCcgKyBuLnRvU3RyaW5nKDEwKSA6IG4udG9TdHJpbmcoMTApO1xufVxuXG5cbnZhciBtb250aHMgPSBbJ0phbicsICdGZWInLCAnTWFyJywgJ0FwcicsICdNYXknLCAnSnVuJywgJ0p1bCcsICdBdWcnLCAnU2VwJyxcbiAgICAgICAgICAgICAgJ09jdCcsICdOb3YnLCAnRGVjJ107XG5cbi8vIDI2IEZlYiAxNjoxOTozNFxuZnVuY3Rpb24gdGltZXN0YW1wKCkge1xuICB2YXIgZCA9IG5ldyBEYXRlKCk7XG4gIHZhciB0aW1lID0gW3BhZChkLmdldEhvdXJzKCkpLFxuICAgICAgICAgICAgICBwYWQoZC5nZXRNaW51dGVzKCkpLFxuICAgICAgICAgICAgICBwYWQoZC5nZXRTZWNvbmRzKCkpXS5qb2luKCc6Jyk7XG4gIHJldHVybiBbZC5nZXREYXRlKCksIG1vbnRoc1tkLmdldE1vbnRoKCldLCB0aW1lXS5qb2luKCcgJyk7XG59XG5cblxuLy8gbG9nIGlzIGp1c3QgYSB0aGluIHdyYXBwZXIgdG8gY29uc29sZS5sb2cgdGhhdCBwcmVwZW5kcyBhIHRpbWVzdGFtcFxuZXhwb3J0cy5sb2cgPSBmdW5jdGlvbigpIHtcbiAgY29uc29sZS5sb2coJyVzIC0gJXMnLCB0aW1lc3RhbXAoKSwgZXhwb3J0cy5mb3JtYXQuYXBwbHkoZXhwb3J0cywgYXJndW1lbnRzKSk7XG59O1xuXG5cbi8qKlxuICogSW5oZXJpdCB0aGUgcHJvdG90eXBlIG1ldGhvZHMgZnJvbSBvbmUgY29uc3RydWN0b3IgaW50byBhbm90aGVyLlxuICpcbiAqIFRoZSBGdW5jdGlvbi5wcm90b3R5cGUuaW5oZXJpdHMgZnJvbSBsYW5nLmpzIHJld3JpdHRlbiBhcyBhIHN0YW5kYWxvbmVcbiAqIGZ1bmN0aW9uIChub3Qgb24gRnVuY3Rpb24ucHJvdG90eXBlKS4gTk9URTogSWYgdGhpcyBmaWxlIGlzIHRvIGJlIGxvYWRlZFxuICogZHVyaW5nIGJvb3RzdHJhcHBpbmcgdGhpcyBmdW5jdGlvbiBuZWVkcyB0byBiZSByZXdyaXR0ZW4gdXNpbmcgc29tZSBuYXRpdmVcbiAqIGZ1bmN0aW9ucyBhcyBwcm90b3R5cGUgc2V0dXAgdXNpbmcgbm9ybWFsIEphdmFTY3JpcHQgZG9lcyBub3Qgd29yayBhc1xuICogZXhwZWN0ZWQgZHVyaW5nIGJvb3RzdHJhcHBpbmcgKHNlZSBtaXJyb3IuanMgaW4gcjExNDkwMykuXG4gKlxuICogQHBhcmFtIHtmdW5jdGlvbn0gY3RvciBDb25zdHJ1Y3RvciBmdW5jdGlvbiB3aGljaCBuZWVkcyB0byBpbmhlcml0IHRoZVxuICogICAgIHByb3RvdHlwZS5cbiAqIEBwYXJhbSB7ZnVuY3Rpb259IHN1cGVyQ3RvciBDb25zdHJ1Y3RvciBmdW5jdGlvbiB0byBpbmhlcml0IHByb3RvdHlwZSBmcm9tLlxuICovXG5leHBvcnRzLmluaGVyaXRzID0gcmVxdWlyZSgnaW5oZXJpdHMnKTtcblxuZXhwb3J0cy5fZXh0ZW5kID0gZnVuY3Rpb24ob3JpZ2luLCBhZGQpIHtcbiAgLy8gRG9uJ3QgZG8gYW55dGhpbmcgaWYgYWRkIGlzbid0IGFuIG9iamVjdFxuICBpZiAoIWFkZCB8fCAhaXNPYmplY3QoYWRkKSkgcmV0dXJuIG9yaWdpbjtcblxuICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKGFkZCk7XG4gIHZhciBpID0ga2V5cy5sZW5ndGg7XG4gIHdoaWxlIChpLS0pIHtcbiAgICBvcmlnaW5ba2V5c1tpXV0gPSBhZGRba2V5c1tpXV07XG4gIH1cbiAgcmV0dXJuIG9yaWdpbjtcbn07XG5cbmZ1bmN0aW9uIGhhc093blByb3BlcnR5KG9iaiwgcHJvcCkge1xuICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCk7XG59XG4iLCJjb25zdCBoaXN0b3J5ID0gcmVxdWlyZSgnc2hlZXQtcm91dGVyL2hpc3RvcnknKVxuY29uc3Qgc2hlZXRSb3V0ZXIgPSByZXF1aXJlKCdzaGVldC1yb3V0ZXInKVxuY29uc3QgZG9jdW1lbnQgPSByZXF1aXJlKCdnbG9iYWwvZG9jdW1lbnQnKVxuY29uc3QgaHJlZiA9IHJlcXVpcmUoJ3NoZWV0LXJvdXRlci9ocmVmJylcbmNvbnN0IGhhc2ggPSByZXF1aXJlKCdzaGVldC1yb3V0ZXIvaGFzaCcpXG5jb25zdCBoYXNoTWF0Y2ggPSByZXF1aXJlKCdoYXNoLW1hdGNoJylcbmNvbnN0IHNlbmRBY3Rpb24gPSByZXF1aXJlKCdzZW5kLWFjdGlvbicpXG5jb25zdCBtdXRhdGUgPSByZXF1aXJlKCd4dGVuZC9tdXRhYmxlJylcbmNvbnN0IGFzc2VydCA9IHJlcXVpcmUoJ2Fzc2VydCcpXG5jb25zdCB4dGVuZCA9IHJlcXVpcmUoJ3h0ZW5kJylcbmNvbnN0IHlvID0gcmVxdWlyZSgneW8teW8nKVxuXG5jaG9vLnZpZXcgPSB5b1xubW9kdWxlLmV4cG9ydHMgPSBjaG9vXG5cbi8vIGZyYW1ld29yayBmb3IgY3JlYXRpbmcgc3R1cmR5IHdlYiBhcHBsaWNhdGlvbnNcbi8vIG51bGwgLT4gZm5cbmZ1bmN0aW9uIGNob28gKCkge1xuICBjb25zdCBfbW9kZWxzID0gW11cbiAgdmFyIF9yb3V0ZXIgPSBudWxsXG5cbiAgc3RhcnQudG9TdHJpbmcgPSB0b1N0cmluZ1xuICBzdGFydC5yb3V0ZXIgPSByb3V0ZXJcbiAgc3RhcnQubW9kZWwgPSBtb2RlbFxuICBzdGFydC5zdGFydCA9IHN0YXJ0XG5cbiAgcmV0dXJuIHN0YXJ0XG5cbiAgLy8gcmVuZGVyIHRoZSBhcHBsaWNhdGlvbiB0byBhIHN0cmluZ1xuICAvLyAoc3RyLCBvYmopIC0+IHN0clxuICBmdW5jdGlvbiB0b1N0cmluZyAocm91dGUsIHNlcnZlclN0YXRlKSB7XG4gICAgY29uc3QgaW5pdGlhbFN0YXRlID0ge31cbiAgICBjb25zdCBuc1N0YXRlID0ge31cblxuICAgIF9tb2RlbHMuZm9yRWFjaChmdW5jdGlvbiAobW9kZWwpIHtcbiAgICAgIGNvbnN0IG5zID0gbW9kZWwubmFtZXNwYWNlXG4gICAgICBpZiAobnMpIHtcbiAgICAgICAgaWYgKCFuc1N0YXRlW25zXSkgbnNTdGF0ZVtuc10gPSB7fVxuICAgICAgICBhcHBseShucywgbW9kZWwuc3RhdGUsIG5zU3RhdGUpXG4gICAgICAgIG5zU3RhdGVbbnNdID0geHRlbmQobnNTdGF0ZVtuc10sIHNlcnZlclN0YXRlW25zXSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGFwcGx5KG1vZGVsLm5hbWVzcGFjZSwgbW9kZWwuc3RhdGUsIGluaXRpYWxTdGF0ZSlcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgY29uc3Qgc3RhdGUgPSB4dGVuZChpbml0aWFsU3RhdGUsIHh0ZW5kKHNlcnZlclN0YXRlLCBuc1N0YXRlKSlcbiAgICBjb25zdCB0cmVlID0gX3JvdXRlcihyb3V0ZSwgc3RhdGUsIGZ1bmN0aW9uICgpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignc2VuZCgpIGNhbm5vdCBiZSBjYWxsZWQgb24gdGhlIHNlcnZlcicpXG4gICAgfSlcblxuICAgIHJldHVybiB0cmVlLnRvU3RyaW5nKClcbiAgfVxuXG4gIC8vIHN0YXJ0IHRoZSBhcHBsaWNhdGlvblxuICAvLyAoc3RyPywgb2JqPykgLT4gRE9NTm9kZVxuICBmdW5jdGlvbiBzdGFydCAocm9vdElkLCBvcHRzKSB7XG4gICAgaWYgKCFvcHRzICYmIHR5cGVvZiByb290SWQgIT09ICdzdHJpbmcnKSB7XG4gICAgICBvcHRzID0gcm9vdElkXG4gICAgICByb290SWQgPSBudWxsXG4gICAgfVxuICAgIG9wdHMgPSBvcHRzIHx8IHt9XG4gICAgY29uc3QgbmFtZSA9IG9wdHMubmFtZSB8fCAnY2hvbydcbiAgICBjb25zdCBpbml0aWFsU3RhdGUgPSB7fVxuICAgIGNvbnN0IHJlZHVjZXJzID0ge31cbiAgICBjb25zdCBlZmZlY3RzID0ge31cblxuICAgIF9tb2RlbHMucHVzaChhcHBJbml0KG9wdHMpKVxuICAgIF9tb2RlbHMuZm9yRWFjaChmdW5jdGlvbiAobW9kZWwpIHtcbiAgICAgIGlmIChtb2RlbC5zdGF0ZSkgYXBwbHkobW9kZWwubmFtZXNwYWNlLCBtb2RlbC5zdGF0ZSwgaW5pdGlhbFN0YXRlKVxuICAgICAgaWYgKG1vZGVsLnJlZHVjZXJzKSBhcHBseShtb2RlbC5uYW1lc3BhY2UsIG1vZGVsLnJlZHVjZXJzLCByZWR1Y2VycylcbiAgICAgIGlmIChtb2RlbC5lZmZlY3RzKSBhcHBseShtb2RlbC5uYW1lc3BhY2UsIG1vZGVsLmVmZmVjdHMsIGVmZmVjdHMpXG4gICAgfSlcblxuICAgIC8vIHNlbmQoKSBpcyB1c2VkIHRvIHRyaWdnZXIgYWN0aW9ucyBpbnNpZGVcbiAgICAvLyB2aWV3cywgZWZmZWN0cyBhbmQgc3Vic2NyaXB0aW9uc1xuICAgIGNvbnN0IHNlbmQgPSBzZW5kQWN0aW9uKHtcbiAgICAgIG9uYWN0aW9uOiBoYW5kbGVBY3Rpb24sXG4gICAgICBvbmNoYW5nZTogb25jaGFuZ2UsXG4gICAgICBzdGF0ZTogaW5pdGlhbFN0YXRlXG4gICAgfSlcblxuICAgIC8vIHN1YnNjcmlwdGlvbnMgYXJlIGxvYWRlZCBhZnRlciBzZW5kQWN0aW9uKCkgaXMgY2FsbGVkXG4gICAgLy8gYmVjYXVzZSB0aGV5IGJvdGggbmVlZCBhY2Nlc3MgdG8gc2VuZCgpIGFuZCBjYW4ndFxuICAgIC8vIHJlYWN0IHRvIGFjdGlvbnMgKHJlYWQtb25seSkgLSBhbHNvIHdhaXQgb24gRE9NIHRvXG4gICAgLy8gYmUgbG9hZGVkXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgIF9tb2RlbHMuZm9yRWFjaChmdW5jdGlvbiAobW9kZWwpIHtcbiAgICAgICAgaWYgKG1vZGVsLnN1YnNjcmlwdGlvbnMpIHtcbiAgICAgICAgICBhc3NlcnQub2soQXJyYXkuaXNBcnJheShtb2RlbC5zdWJzY3JpcHRpb25zKSwgJ3N1YnMgbXVzdCBiZSBhbiBhcnInKVxuICAgICAgICAgIG1vZGVsLnN1YnNjcmlwdGlvbnMuZm9yRWFjaChmdW5jdGlvbiAoc3ViKSB7XG4gICAgICAgICAgICBzdWIoc2VuZClcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0pXG5cbiAgICAvLyBJZiBhbiBpZCBpcyBwcm92aWRlZCwgdGhlIGFwcGxpY2F0aW9uIHdpbGwgcmVoeWRyYXRlXG4gICAgLy8gb24gdGhlIG5vZGUuIElmIG5vIGlkIGlzIHByb3ZpZGVkIGl0IHdpbGwgcmV0dXJuXG4gICAgLy8gYSB0cmVlIHRoYXQncyByZWFkeSB0byBiZSBhcHBlbmRlZCB0byB0aGUgRE9NLlxuICAgIC8vXG4gICAgLy8gVGhlIHJvb3RJZCBpcyBkZXRlcm1pbmVkIHRvIGZpbmQgdGhlIGFwcGxpY2F0aW9uIHJvb3RcbiAgICAvLyBvbiB1cGRhdGUuIFNpbmNlIHRoZSBET00gbm9kZXMgY2hhbmdlIGJldHdlZW4gdXBkYXRlcyxcbiAgICAvLyB3ZSBtdXN0IGNhbGwgZG9jdW1lbnQucXVlcnlTZWxlY3RvcigpIHRvIGZpbmQgdGhlIHJvb3QuXG4gICAgLy8gVXNlIGRpZmZlcmVudCBuYW1lcyB3aGVuIGxvYWRpbmcgbXVsdGlwbGUgY2hvbyBhcHBsaWNhdGlvbnNcbiAgICAvLyBvbiB0aGUgc2FtZSBwYWdlXG4gICAgaWYgKHJvb3RJZCkge1xuICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICByb290SWQgPSByb290SWQucmVwbGFjZSgvXiMvLCAnJylcblxuICAgICAgICBjb25zdCBvbGRUcmVlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignIycgKyByb290SWQpXG4gICAgICAgIGFzc2VydC5vayhvbGRUcmVlLCAnY291bGQgbm90IGZpbmQgbm9kZSAjJyArIHJvb3RJZClcblxuICAgICAgICBjb25zdCBuZXdUcmVlID0gX3JvdXRlcihzZW5kLnN0YXRlKCkuYXBwLmxvY2F0aW9uLCBzZW5kLnN0YXRlKCksIHNlbmQpXG5cbiAgICAgICAgeW8udXBkYXRlKG9sZFRyZWUsIG5ld1RyZWUpXG4gICAgICB9KVxuICAgIH0gZWxzZSB7XG4gICAgICByb290SWQgPSBuYW1lICsgJy1yb290J1xuICAgICAgY29uc3QgdHJlZSA9IF9yb3V0ZXIoc2VuZC5zdGF0ZSgpLmFwcC5sb2NhdGlvbiwgc2VuZC5zdGF0ZSgpLCBzZW5kKVxuICAgICAgdHJlZS5zZXRBdHRyaWJ1dGUoJ2lkJywgcm9vdElkKVxuICAgICAgcmV0dXJuIHRyZWVcbiAgICB9XG5cbiAgICAvLyBoYW5kbGUgYW4gYWN0aW9uIGJ5IGVpdGhlciByZWR1Y2VycywgZWZmZWN0c1xuICAgIC8vIG9yIGJvdGggLSByZXR1cm4gdGhlIG5ldyBzdGF0ZSB3aGVuIGRvbmVcbiAgICAvLyAob2JqLCBvYmosIGZuKSAtPiBvYmpcbiAgICBmdW5jdGlvbiBoYW5kbGVBY3Rpb24gKGFjdGlvbiwgc3RhdGUsIHNlbmQpIHtcbiAgICAgIHZhciByZWR1Y2Vyc0NhbGxlZCA9IGZhbHNlXG4gICAgICB2YXIgZWZmZWN0c0NhbGxlZCA9IGZhbHNlXG4gICAgICBjb25zdCBuZXdTdGF0ZSA9IHh0ZW5kKHN0YXRlKVxuXG4gICAgICAvLyB2YWxpZGF0ZSBpZiBhIG5hbWVzcGFjZSBleGlzdHMuIE5hbWVzcGFjZXNcbiAgICAgIC8vIGFyZSBkZWxpbWl0ZWQgYnkgdGhlIGZpcnN0ICc6Jy4gUGVyaGFwc1xuICAgICAgLy8gd2UnbGwgYWxsb3cgcmVjdXJzaXZlIG5hbWVzcGFjZXMgaW4gdGhlXG4gICAgICAvLyBmdXR1cmUgLSB3aG8ga25vd3NcbiAgICAgIGlmICgvOi8udGVzdChhY3Rpb24udHlwZSkpIHtcbiAgICAgICAgY29uc3QgYXJyID0gYWN0aW9uLnR5cGUuc3BsaXQoJzonKVxuICAgICAgICB2YXIgbnMgPSBhcnIuc2hpZnQoKVxuICAgICAgICBhY3Rpb24udHlwZSA9IGFyci5qb2luKCc6JylcbiAgICAgIH1cblxuICAgICAgY29uc3QgX3JlZHVjZXJzID0gbnMgPyByZWR1Y2Vyc1tuc10gOiByZWR1Y2Vyc1xuICAgICAgaWYgKF9yZWR1Y2VycyAmJiBfcmVkdWNlcnNbYWN0aW9uLnR5cGVdKSB7XG4gICAgICAgIGlmIChucykge1xuICAgICAgICAgIGNvbnN0IHJlZHVjZWRTdGF0ZSA9IF9yZWR1Y2Vyc1thY3Rpb24udHlwZV0oYWN0aW9uLCBzdGF0ZVtuc10pXG4gICAgICAgICAgaWYgKCFuZXdTdGF0ZVtuc10pIG5ld1N0YXRlW25zXSA9IHt9XG4gICAgICAgICAgbXV0YXRlKG5ld1N0YXRlW25zXSwgeHRlbmQoc3RhdGVbbnNdLCByZWR1Y2VkU3RhdGUpKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG11dGF0ZShuZXdTdGF0ZSwgcmVkdWNlcnNbYWN0aW9uLnR5cGVdKGFjdGlvbiwgc3RhdGUpKVxuICAgICAgICB9XG4gICAgICAgIHJlZHVjZXJzQ2FsbGVkID0gdHJ1ZVxuICAgICAgfVxuXG4gICAgICBjb25zdCBfZWZmZWN0cyA9IG5zID8gZWZmZWN0c1tuc10gOiBlZmZlY3RzXG4gICAgICBpZiAoX2VmZmVjdHMgJiYgX2VmZmVjdHNbYWN0aW9uLnR5cGVdKSB7XG4gICAgICAgIGlmIChucykgX2VmZmVjdHNbYWN0aW9uLnR5cGVdKGFjdGlvbiwgc3RhdGVbbnNdLCBzZW5kKVxuICAgICAgICBlbHNlIF9lZmZlY3RzW2FjdGlvbi50eXBlXShhY3Rpb24sIHN0YXRlLCBzZW5kKVxuICAgICAgICBlZmZlY3RzQ2FsbGVkID0gdHJ1ZVxuICAgICAgfVxuXG4gICAgICBpZiAoIXJlZHVjZXJzQ2FsbGVkICYmICFlZmZlY3RzQ2FsbGVkKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignQ291bGQgbm90IGZpbmQgYWN0aW9uICcgKyBhY3Rpb24udHlwZSlcbiAgICAgIH1cblxuICAgICAgLy8gYWxsb3dzIChuZXdTdGF0ZSA9PT0gb2xkU3RhdGUpIGNoZWNrc1xuICAgICAgcmV0dXJuIChyZWR1Y2Vyc0NhbGxlZCkgPyBuZXdTdGF0ZSA6IHN0YXRlXG4gICAgfVxuXG4gICAgLy8gdXBkYXRlIHRoZSBET00gYWZ0ZXIgZXZlcnkgc3RhdGUgbXV0YXRpb25cbiAgICAvLyAob2JqLCBvYmopIC0+IG51bGxcbiAgICBmdW5jdGlvbiBvbmNoYW5nZSAoYWN0aW9uLCBuZXdTdGF0ZSwgb2xkU3RhdGUpIHtcbiAgICAgIGlmIChuZXdTdGF0ZSA9PT0gb2xkU3RhdGUpIHJldHVyblxuICAgICAgY29uc3Qgb2xkVHJlZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyMnICsgcm9vdElkKVxuICAgICAgYXNzZXJ0Lm9rKG9sZFRyZWUsIFwiQ291bGQgbm90IGZpbmQgRE9NIG5vZGUgJyNcIiArIHJvb3RJZCArIFwiJyB0byB1cGRhdGVcIilcbiAgICAgIGNvbnN0IG5ld1RyZWUgPSBfcm91dGVyKG5ld1N0YXRlLmFwcC5sb2NhdGlvbiwgbmV3U3RhdGUsIHNlbmQsIG9sZFN0YXRlKVxuICAgICAgbmV3VHJlZS5zZXRBdHRyaWJ1dGUoJ2lkJywgcm9vdElkKVxuICAgICAgeW8udXBkYXRlKG9sZFRyZWUsIG5ld1RyZWUpXG4gICAgfVxuICB9XG5cbiAgLy8gcmVnaXN0ZXIgYWxsIHJvdXRlcyBvbiB0aGUgcm91dGVyXG4gIC8vIChzdHI/LCBbZm58W2ZuXV0pIC0+IG9ialxuICBmdW5jdGlvbiByb3V0ZXIgKGRlZmF1bHRSb3V0ZSwgY2IpIHtcbiAgICBfcm91dGVyID0gc2hlZXRSb3V0ZXIoZGVmYXVsdFJvdXRlLCBjYilcbiAgICByZXR1cm4gX3JvdXRlclxuICB9XG5cbiAgLy8gY3JlYXRlIGEgbmV3IG1vZGVsXG4gIC8vIChzdHI/LCBvYmopIC0+IG51bGxcbiAgZnVuY3Rpb24gbW9kZWwgKG1vZGVsKSB7XG4gICAgX21vZGVscy5wdXNoKG1vZGVsKVxuICB9XG59XG5cbi8vIGluaXRpYWwgYXBwbGljYXRpb24gc3RhdGUgbW9kZWxcbi8vIG9iaiAtPiBvYmpcbmZ1bmN0aW9uIGFwcEluaXQgKG9wdHMpIHtcbiAgY29uc3QgaW5pdGlhbExvY2F0aW9uID0gKG9wdHMuaGFzaCA9PT0gdHJ1ZSlcbiAgICA/IGhhc2hNYXRjaChkb2N1bWVudC5sb2NhdGlvbi5oYXNoKVxuICAgIDogZG9jdW1lbnQubG9jYXRpb24uaHJlZlxuXG4gIGNvbnN0IG1vZGVsID0ge1xuICAgIG5hbWVzcGFjZTogJ2FwcCcsXG4gICAgc3RhdGU6IHsgbG9jYXRpb246IGluaXRpYWxMb2NhdGlvbiB9LFxuICAgIHN1YnNjcmlwdGlvbnM6IFtdLFxuICAgIHJlZHVjZXJzOiB7XG4gICAgICAvLyBoYW5kbGUgaHJlZiBsaW5rc1xuICAgICAgbG9jYXRpb246IGZ1bmN0aW9uIHNldExvY2F0aW9uIChhY3Rpb24sIHN0YXRlKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgbG9jYXRpb246IGFjdGlvbi5sb2NhdGlvbi5yZXBsYWNlKC8jLiovLCAnJylcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vIGlmIGhhc2ggcm91dGluZyBleHBsaWNpdGx5IGVuYWJsZWQsIHN1YnNjcmliZSB0byBpdFxuICBpZiAob3B0cy5oYXNoID09PSB0cnVlKSB7XG4gICAgcHVzaExvY2F0aW9uU3ViKGZ1bmN0aW9uIChuYXZpZ2F0ZSkge1xuICAgICAgaGFzaChmdW5jdGlvbiAoZnJhZ21lbnQpIHtcbiAgICAgICAgbmF2aWdhdGUoaGFzaE1hdGNoKGZyYWdtZW50KSlcbiAgICAgIH0pXG4gICAgfSlcbiAgLy8gb3RoZXJ3aXNlLCBzdWJzY3JpYmUgdG8gSFRNTDUgaGlzdG9yeSBBUElcbiAgfSBlbHNlIHtcbiAgICBpZiAob3B0cy5oaXN0b3J5ICE9PSBmYWxzZSkgcHVzaExvY2F0aW9uU3ViKGhpc3RvcnkpXG4gICAgLy8gZW5hYmxlIGNhdGNoaW5nIDxhIGhyZWY9XCJcIj48L2E+IGxpbmtzXG4gICAgaWYgKG9wdHMuaHJlZiAhPT0gZmFsc2UpIHB1c2hMb2NhdGlvblN1YihocmVmKVxuICB9XG5cbiAgcmV0dXJuIG1vZGVsXG5cbiAgLy8gY3JlYXRlIGEgbmV3IHN1YnNjcmlwdGlvbiB0aGF0IG1vZGlmaWVzXG4gIC8vICdhcHA6bG9jYXRpb24nIGFuZCBwdXNoIGl0IHRvIGJlIGxvYWRlZFxuICAvLyBmbiAtPiBudWxsXG4gIGZ1bmN0aW9uIHB1c2hMb2NhdGlvblN1YiAoY2IpIHtcbiAgICBtb2RlbC5zdWJzY3JpcHRpb25zLnB1c2goZnVuY3Rpb24gKHNlbmQpIHtcbiAgICAgIGNiKGZ1bmN0aW9uIChocmVmKSB7XG4gICAgICAgIHNlbmQoJ2FwcDpsb2NhdGlvbicsIHsgbG9jYXRpb246IGhyZWYgfSlcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxufVxuXG4vLyBjb21wb3NlIGFuIG9iamVjdCBjb25kaXRpb25hbGx5XG4vLyBvcHRpb25hbGx5IGNvbnRhaW5zIGEgbmFtZXNwYWNlXG4vLyB3aGljaCBpcyB1c2VkIHRvIG5lc3QgcHJvcGVydGllcy5cbi8vIChzdHIsIG9iaiwgb2JqKSAtPiBudWxsXG5mdW5jdGlvbiBhcHBseSAobnMsIHNvdXJjZSwgdGFyZ2V0KSB7XG4gIE9iamVjdC5rZXlzKHNvdXJjZSkuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgaWYgKG5zKSB7XG4gICAgICBpZiAoIXRhcmdldFtuc10pIHRhcmdldFtuc10gPSB7fVxuICAgICAgdGFyZ2V0W25zXVtrZXldID0gc291cmNlW2tleV1cbiAgICB9IGVsc2UgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XVxuICB9KVxufVxuIiwidmFyIHRvcExldmVsID0gdHlwZW9mIGdsb2JhbCAhPT0gJ3VuZGVmaW5lZCcgPyBnbG9iYWwgOlxuICAgIHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnID8gd2luZG93IDoge31cbnZhciBtaW5Eb2MgPSByZXF1aXJlKCdtaW4tZG9jdW1lbnQnKTtcblxuaWYgKHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IGRvY3VtZW50O1xufSBlbHNlIHtcbiAgICB2YXIgZG9jY3kgPSB0b3BMZXZlbFsnX19HTE9CQUxfRE9DVU1FTlRfQ0FDSEVANCddO1xuXG4gICAgaWYgKCFkb2NjeSkge1xuICAgICAgICBkb2NjeSA9IHRvcExldmVsWydfX0dMT0JBTF9ET0NVTUVOVF9DQUNIRUA0J10gPSBtaW5Eb2M7XG4gICAgfVxuXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBkb2NjeTtcbn1cbiIsImlmICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSB3aW5kb3c7XG59IGVsc2UgaWYgKHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IGdsb2JhbDtcbn0gZWxzZSBpZiAodHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIpe1xuICAgIG1vZHVsZS5leHBvcnRzID0gc2VsZjtcbn0gZWxzZSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSB7fTtcbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaGFzaE1hdGNoIChoYXNoLCBwcmVmaXgpIHtcbiAgdmFyIHByZSA9IHByZWZpeCB8fCAnLyc7XG4gIGlmIChoYXNoLmxlbmd0aCA9PT0gMCkgcmV0dXJuIHByZTtcbiAgaGFzaCA9IGhhc2gucmVwbGFjZSgnIycsICcnKTtcbiAgaGFzaCA9IGhhc2gucmVwbGFjZSgvXFwvJC8sICcnKVxuICBpZiAoaGFzaC5pbmRleE9mKCcvJykgIT0gMCkgaGFzaCA9ICcvJyArIGhhc2g7XG4gIGlmIChwcmUgPT0gJy8nKSByZXR1cm4gaGFzaDtcbiAgZWxzZSByZXR1cm4gaGFzaC5yZXBsYWNlKHByZSwgJycpO1xufVxuIiwidmFyIGV4dGVuZCA9IHJlcXVpcmUoJ3h0ZW5kJylcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBzZW5kQWN0aW9uIChvcHRpb25zKSB7XG4gIGlmICghb3B0aW9ucykgdGhyb3cgbmV3IEVycm9yKCdvcHRpb25zIHJlcXVpcmVkJylcbiAgaWYgKCFvcHRpb25zLm9uYWN0aW9uKSB0aHJvdyBuZXcgRXJyb3IoJ29wdGlvbnMub25hY3Rpb24gcmVxdWlyZWQnKVxuICBpZiAoIW9wdGlvbnMub25jaGFuZ2UpIHRocm93IG5ldyBFcnJvcignb3B0aW9ucy5vbmNoYW5nZSByZXF1aXJlZCcpXG4gIHZhciBzdGF0ZSA9IG9wdGlvbnMuc3RhdGUgfHwge31cblxuICBmdW5jdGlvbiBzZW5kIChhY3Rpb24sIHBhcmFtcykge1xuICAgIHByb2Nlc3MubmV4dFRpY2soZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKHR5cGVvZiBhY3Rpb24gPT09ICdvYmplY3QnKSB7XG4gICAgICAgIHBhcmFtcyA9IGFjdGlvblxuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgYWN0aW9uID09PSAnc3RyaW5nJykge1xuICAgICAgICBwYXJhbXMgPSBleHRlbmQoeyB0eXBlOiBhY3Rpb24gfSwgcGFyYW1zKVxuICAgICAgfVxuXG4gICAgICB2YXIgc3RhdGVVcGRhdGVzID0gb3B0aW9ucy5vbmFjdGlvbihwYXJhbXMsIHN0YXRlLCBzZW5kKVxuICAgICAgaWYgKHN0YXRlICE9PSBzdGF0ZVVwZGF0ZXMpIHtcbiAgICAgICAgdXBkYXRlKHBhcmFtcywgc3RhdGVVcGRhdGVzKVxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICBmdW5jdGlvbiB1cGRhdGUgKHBhcmFtcywgc3RhdGVVcGRhdGVzKSB7XG4gICAgdmFyIG9sZFN0YXRlID0gc3RhdGVcbiAgICBzdGF0ZSA9IGV4dGVuZChzdGF0ZSwgc3RhdGVVcGRhdGVzKVxuICAgIG9wdGlvbnMub25jaGFuZ2UocGFyYW1zLCBzdGF0ZSwgb2xkU3RhdGUpXG4gIH1cblxuICBzZW5kLmV2ZW50ID0gZnVuY3Rpb24gc2VuZEFjdGlvbl9ldmVudCAoYWN0aW9uLCBwYXJhbXMsIGZsYWcpIHtcbiAgICBpZiAodHlwZW9mIGZsYWcgPT09IHVuZGVmaW5lZCkgZmxhZyA9IHRydWVcbiAgICByZXR1cm4gZnVuY3Rpb24gc2VuZEFjdGlvbl9zZW5kX3RodW5rIChlKSB7XG4gICAgICBpZiAoZmxhZyAmJiBlICYmIGUucHJldmVudERlZmF1bHQpIGUucHJldmVudERlZmF1bHQoKVxuICAgICAgc2VuZChhY3Rpb24sIHBhcmFtcywgZmxhZylcbiAgICB9XG4gIH1cblxuICBzZW5kLnN0YXRlID0gZnVuY3Rpb24gc2VuZEFjdGlvbl9zdGF0ZSAoKSB7XG4gICAgcmV0dXJuIHN0YXRlXG4gIH1cblxuICByZXR1cm4gc2VuZFxufVxuIiwiY29uc3Qgd2luZG93ID0gcmVxdWlyZSgnZ2xvYmFsL3dpbmRvdycpXG5jb25zdCBhc3NlcnQgPSByZXF1aXJlKCdhc3NlcnQnKVxuXG5tb2R1bGUuZXhwb3J0cyA9IGhhc2hcblxuLy8gbGlzdGVuIHRvIHdpbmRvdyBoYXNoY2hhbmdlIGV2ZW50c1xuLy8gYW5kIHVwZGF0ZSByb3V0ZXIgYWNjb3JkaW5nbHlcbi8vIGZuKGNiKSAtPiBudWxsXG5mdW5jdGlvbiBoYXNoIChjYikge1xuICBhc3NlcnQuZXF1YWwodHlwZW9mIGNiLCAnZnVuY3Rpb24nLCAnY2IgbXVzdCBiZSBhIGZ1bmN0aW9uJylcbiAgd2luZG93Lm9uaGFzaGNoYW5nZSA9IGZ1bmN0aW9uIChlKSB7XG4gICAgY2Iod2luZG93LmxvY2F0aW9uLmhhc2gpXG4gIH1cbn1cbiIsImNvbnN0IGRvY3VtZW50ID0gcmVxdWlyZSgnZ2xvYmFsL2RvY3VtZW50JylcbmNvbnN0IHdpbmRvdyA9IHJlcXVpcmUoJ2dsb2JhbC93aW5kb3cnKVxuY29uc3QgYXNzZXJ0ID0gcmVxdWlyZSgnYXNzZXJ0JylcblxubW9kdWxlLmV4cG9ydHMgPSBoaXN0b3J5XG5cbi8vIGxpc3RlbiB0byBodG1sNSBwdXNoc3RhdGUgZXZlbnRzXG4vLyBhbmQgdXBkYXRlIHJvdXRlciBhY2NvcmRpbmdseVxuLy8gZm4oc3RyKSAtPiBudWxsXG5mdW5jdGlvbiBoaXN0b3J5IChjYikge1xuICBhc3NlcnQuZXF1YWwodHlwZW9mIGNiLCAnZnVuY3Rpb24nLCAnY2IgbXVzdCBiZSBhIGZ1bmN0aW9uJylcbiAgd2luZG93Lm9ucG9wc3RhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgY2IoZG9jdW1lbnQubG9jYXRpb24uaHJlZilcbiAgfVxufVxuIiwiY29uc3Qgd2luZG93ID0gcmVxdWlyZSgnZ2xvYmFsL3dpbmRvdycpXG5jb25zdCBhc3NlcnQgPSByZXF1aXJlKCdhc3NlcnQnKVxuXG5tb2R1bGUuZXhwb3J0cyA9IGhyZWZcblxuLy8gaGFuZGxlIGEgY2xpY2sgaWYgaXMgYW5jaG9yIHRhZyB3aXRoIGFuIGhyZWZcbi8vIGFuZCB1cmwgbGl2ZXMgb24gdGhlIHNhbWUgZG9tYWluLiBSZXBsYWNlc1xuLy8gdHJhaWxpbmcgJyMnIHNvIGVtcHR5IGxpbmtzIHdvcmsgYXMgZXhwZWN0ZWQuXG4vLyBmbihzdHIpIC0+IG51bGxcbmZ1bmN0aW9uIGhyZWYgKGNiKSB7XG4gIGFzc2VydC5lcXVhbCh0eXBlb2YgY2IsICdmdW5jdGlvbicsICdjYiBtdXN0IGJlIGEgZnVuY3Rpb24nKVxuXG4gIHdpbmRvdy5vbmNsaWNrID0gZnVuY3Rpb24gKGUpIHtcbiAgICBjb25zdCBub2RlID0gKGZ1bmN0aW9uIHRyYXZlcnNlIChub2RlKSB7XG4gICAgICBpZiAoIW5vZGUpIHJldHVyblxuICAgICAgaWYgKG5vZGUubG9jYWxOYW1lICE9PSAnYScpIHJldHVybiB0cmF2ZXJzZShub2RlLnBhcmVudE5vZGUpXG4gICAgICBpZiAobm9kZS5ocmVmID09PSB1bmRlZmluZWQpIHJldHVybiB0cmF2ZXJzZShub2RlLnBhcmVudE5vZGUpXG4gICAgICBpZiAod2luZG93LmxvY2F0aW9uLmhvc3QgIT09IG5vZGUuaG9zdCkgcmV0dXJuIHRyYXZlcnNlKG5vZGUucGFyZW50Tm9kZSlcbiAgICAgIHJldHVybiBub2RlXG4gICAgfSkoZS50YXJnZXQpXG5cbiAgICBpZiAoIW5vZGUpIHJldHVyblxuXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgY29uc3QgaHJlZiA9IG5vZGUuaHJlZi5yZXBsYWNlKC8jJC8sICcnKVxuICAgIGNiKGhyZWYpXG4gICAgd2luZG93Lmhpc3RvcnkucHVzaFN0YXRlKHt9LCBudWxsLCBocmVmKVxuICB9XG59XG4iLCJjb25zdCBwYXRobmFtZSA9IHJlcXVpcmUoJ3BhdGhuYW1lLW1hdGNoJylcbmNvbnN0IHdheWZhcmVyID0gcmVxdWlyZSgnd2F5ZmFyZXInKVxuY29uc3QgYXNzZXJ0ID0gcmVxdWlyZSgnYXNzZXJ0JylcblxubW9kdWxlLmV4cG9ydHMgPSBzaGVldFJvdXRlclxuXG4vLyBGYXN0LCBtb2R1bGFyIGNsaWVudCByb3V0ZXJcbi8vIGZuKHN0ciwgYW55Wy4uXSwgZm4/KSAtPiBmbihzdHIsIGFueVsuLl0pXG5mdW5jdGlvbiBzaGVldFJvdXRlciAoZGZ0LCBjcmVhdGVUcmVlLCBjcmVhdGVSb3V0ZSkge1xuICBjcmVhdGVSb3V0ZSA9IGNyZWF0ZVJvdXRlID8gY3JlYXRlUm91dGUocikgOiByXG4gIGlmICghY3JlYXRlVHJlZSkge1xuICAgIGNyZWF0ZVRyZWUgPSBkZnRcbiAgICBkZnQgPSAnJ1xuICB9XG5cbiAgYXNzZXJ0LmVxdWFsKHR5cGVvZiBkZnQsICdzdHJpbmcnLCAnZGZ0IG11c3QgYmUgYSBzdHJpbmcnKVxuICBhc3NlcnQuZXF1YWwodHlwZW9mIGNyZWF0ZVRyZWUsICdmdW5jdGlvbicsICdjcmVhdGVUcmVlIG11c3QgYmUgYSBmdW5jdGlvbicpXG5cbiAgY29uc3Qgcm91dGVyID0gd2F5ZmFyZXIoZGZ0KVxuICBjb25zdCB0cmVlID0gY3JlYXRlVHJlZShjcmVhdGVSb3V0ZSlcblxuICAvLyByZWdpc3RlciB0cmVlIGluIHJvdXRlclxuICA7KGZ1bmN0aW9uIHdhbGsgKHRyZWUsIHJvdXRlKSB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkodHJlZVswXSkpIHtcbiAgICAgIC8vIHdhbGsgb3ZlciBhbGwgcm91dGVzIGF0IHRoZSByb290IG9mIHRoZSB0cmVlXG4gICAgICB0cmVlLmZvckVhY2goZnVuY3Rpb24gKG5vZGUpIHtcbiAgICAgICAgd2Fsayhub2RlLCByb3V0ZSlcbiAgICAgIH0pXG4gICAgfSBlbHNlIGlmICh0cmVlWzFdKSB7XG4gICAgICAvLyBoYW5kbGUgaW5saW5lIGZ1bmN0aW9ucyBhcyBhcmdzXG4gICAgICBjb25zdCBpbm5lclJvdXRlID0gdHJlZVswXVxuICAgICAgICA/IHJvdXRlLmNvbmNhdCh0cmVlWzBdKS5qb2luKCcvJylcbiAgICAgICAgOiByb3V0ZS5sZW5ndGggPyByb3V0ZS5qb2luKCcvJykgOiB0cmVlWzBdXG4gICAgICByb3V0ZXIub24oaW5uZXJSb3V0ZSwgdHJlZVsxXSlcbiAgICAgIHdhbGsodHJlZVsyXSwgcm91dGUuY29uY2F0KHRyZWVbMF0pKVxuICAgIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheSh0cmVlWzJdKSkge1xuICAgICAgLy8gdHJhdmVyc2UgYW5kIGFwcGVuZCByb3V0ZVxuICAgICAgd2Fsayh0cmVlWzJdLCByb3V0ZS5jb25jYXQodHJlZVswXSkpXG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIHJlZ2lzdGVyIHBhdGggaW4gcm91dGVyXG4gICAgICBjb25zdCBud1JvdXRlID0gdHJlZVswXVxuICAgICAgICA/IHJvdXRlLmNvbmNhdCh0cmVlWzBdKS5qb2luKCcvJylcbiAgICAgICAgOiByb3V0ZS5sZW5ndGggPyByb3V0ZS5qb2luKCcvJykgOiB0cmVlWzBdXG4gICAgICByb3V0ZXIub24obndSb3V0ZSwgdHJlZVsyXSlcbiAgICB9XG4gIH0pKHRyZWUsIFtdKVxuXG4gIC8vIG1hdGNoIGEgcm91dGUgb24gdGhlIHJvdXRlclxuICByZXR1cm4gZnVuY3Rpb24gbWF0Y2ggKHJvdXRlKSB7XG4gICAgYXNzZXJ0LmVxdWFsKHR5cGVvZiByb3V0ZSwgJ3N0cmluZycsICdyb3V0ZSBtdXN0IGJlIGEgc3RyaW5nJylcbiAgICBjb25zdCBhcmdzID0gW10uc2xpY2UuY2FsbChhcmd1bWVudHMpXG4gICAgYXJnc1swXSA9IHBhdGhuYW1lKGFyZ3NbMF0pXG4gICAgcmV0dXJuIHJvdXRlci5hcHBseShudWxsLCBhcmdzKVxuICB9XG59XG5cbi8vIHJlZ2lzdGVyIHJlZ3VsYXIgcm91dGVcbmZ1bmN0aW9uIHIgKHJvdXRlLCBpbmxpbmUsIGNoaWxkKSB7XG4gIGlmICghY2hpbGQpIHtcbiAgICBjaGlsZCA9IGlubGluZVxuICAgIGlubGluZSA9IG51bGxcbiAgfVxuICBhc3NlcnQuZXF1YWwodHlwZW9mIHJvdXRlLCAnc3RyaW5nJywgJ3JvdXRlIG11c3QgYmUgYSBzdHJpbmcnKVxuICBhc3NlcnQub2soY2hpbGQsICdjaGlsZCBleGlzdHMnKVxuICByb3V0ZSA9IHJvdXRlLnJlcGxhY2UoL15cXC8vLCAnJylcbiAgcmV0dXJuIFsgcm91dGUsIGlubGluZSwgY2hpbGQgXVxufVxuIiwiY29uc3QgYXNzZXJ0ID0gcmVxdWlyZSgnYXNzZXJ0JylcblxubW9kdWxlLmV4cG9ydHMgPSBtYXRjaFxuXG4vLyBnZXQgdXJsIHBhdGggc2VjdGlvbiBmcm9tIGEgdXJsXG4vLyBzdHJpcCBxdWVyeXN0cmluZ3MgLyBoYXNoZXNcbi8vIHN0cmlwIHByb3RvY29sXG4vLyBzdHJpcCBob3N0bmFtZSBhbmQgcG9ydCAoYm90aCBpcCBhbmQgcm91dGUpXG4vLyBzdHIgLT4gc3RyXG5mdW5jdGlvbiBtYXRjaCAocm91dGUpIHtcbiAgYXNzZXJ0LmVxdWFsKHR5cGVvZiByb3V0ZSwgJ3N0cmluZycpXG5cbiAgcmV0dXJuIHJvdXRlLnRyaW0oKVxuICAgIC5yZXBsYWNlKC9bXFw/fCNdLiokLywgJycpXG4gICAgLnJlcGxhY2UoL14oPzpodHRwcz9cXDopXFwvXFwvLywgJycpXG4gICAgLnJlcGxhY2UoL14oPzpbXFx3Kyg/Oi1cXHcrKSsuXSkrKD86W1xcOjAtOV17NCw1fSk/LywgJycpXG4gICAgLnJlcGxhY2UoL1xcLyQvLCAnJylcbn1cbiIsIlxuLyoqXG4gKiBBbiBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpIGFsdGVybmF0aXZlXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGFyZ3Mgc29tZXRoaW5nIHdpdGggYSBsZW5ndGhcbiAqIEBwYXJhbSB7TnVtYmVyfSBzbGljZVxuICogQHBhcmFtIHtOdW1iZXJ9IHNsaWNlRW5kXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGFyZ3MsIHNsaWNlLCBzbGljZUVuZCkge1xuICB2YXIgcmV0ID0gW107XG4gIHZhciBsZW4gPSBhcmdzLmxlbmd0aDtcblxuICBpZiAoMCA9PT0gbGVuKSByZXR1cm4gcmV0O1xuXG4gIHZhciBzdGFydCA9IHNsaWNlIDwgMFxuICAgID8gTWF0aC5tYXgoMCwgc2xpY2UgKyBsZW4pXG4gICAgOiBzbGljZSB8fCAwO1xuXG4gIGlmIChzbGljZUVuZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgbGVuID0gc2xpY2VFbmQgPCAwXG4gICAgICA/IHNsaWNlRW5kICsgbGVuXG4gICAgICA6IHNsaWNlRW5kXG4gIH1cblxuICB3aGlsZSAobGVuLS0gPiBzdGFydCkge1xuICAgIHJldFtsZW4gLSBzdGFydF0gPSBhcmdzW2xlbl07XG4gIH1cblxuICByZXR1cm4gcmV0O1xufVxuXG4iLCJjb25zdCBhc3NlcnQgPSByZXF1aXJlKCdhc3NlcnQnKVxuY29uc3Qgc2xpY2VkID0gcmVxdWlyZSgnc2xpY2VkJylcbmNvbnN0IHRyaWUgPSByZXF1aXJlKCcuL3RyaWUnKVxuXG5tb2R1bGUuZXhwb3J0cyA9IFdheWZhcmVyXG5cbi8vIGNyZWF0ZSBhIHJvdXRlclxuLy8gc3RyIC0+IG9ialxuZnVuY3Rpb24gV2F5ZmFyZXIgKGRmdCkge1xuICBpZiAoISh0aGlzIGluc3RhbmNlb2YgV2F5ZmFyZXIpKSByZXR1cm4gbmV3IFdheWZhcmVyKGRmdClcblxuICBjb25zdCBfZGVmYXVsdCA9IChkZnQgfHwgJycpLnJlcGxhY2UoL15cXC8vLCAnJylcbiAgY29uc3QgX3RyaWUgPSB0cmllKClcblxuICBlbWl0Ll90cmllID0gX3RyaWVcbiAgZW1pdC5lbWl0ID0gZW1pdFxuICBlbWl0Lm9uID0gb25cbiAgZW1pdC5fd2F5ZmFyZXIgPSB0cnVlXG5cbiAgcmV0dXJuIGVtaXRcblxuICAvLyBkZWZpbmUgYSByb3V0ZVxuICAvLyAoc3RyLCBmbikgLT4gb2JqXG4gIGZ1bmN0aW9uIG9uIChyb3V0ZSwgY2IpIHtcbiAgICBhc3NlcnQuZXF1YWwodHlwZW9mIHJvdXRlLCAnc3RyaW5nJylcbiAgICBhc3NlcnQuZXF1YWwodHlwZW9mIGNiLCAnZnVuY3Rpb24nKVxuXG4gICAgcm91dGUgPSByb3V0ZSB8fCAnLydcblxuICAgIGlmIChjYiAmJiBjYi5fd2F5ZmFyZXIgJiYgY2IuX3RyaWUpIHtcbiAgICAgIF90cmllLm1vdW50KHJvdXRlLCBjYi5fdHJpZS50cmllKVxuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBub2RlID0gX3RyaWUuY3JlYXRlKHJvdXRlKVxuICAgICAgbm9kZS5jYiA9IGNiXG4gICAgfVxuXG4gICAgcmV0dXJuIGVtaXRcbiAgfVxuXG4gIC8vIG1hdGNoIGFuZCBjYWxsIGEgcm91dGVcbiAgLy8gKHN0ciwgb2JqPykgLT4gbnVsbFxuICBmdW5jdGlvbiBlbWl0IChyb3V0ZSkge1xuICAgIGFzc2VydC5ub3RFcXVhbChyb3V0ZSwgdW5kZWZpbmVkLCBcIidyb3V0ZScgbXVzdCBiZSBkZWZpbmVkXCIpXG4gICAgY29uc3QgYXJncyA9IHNsaWNlZChhcmd1bWVudHMpXG5cbiAgICBjb25zdCBub2RlID0gX3RyaWUubWF0Y2gocm91dGUpXG4gICAgaWYgKG5vZGUgJiYgbm9kZS5jYikge1xuICAgICAgYXJnc1swXSA9IG5vZGUucGFyYW1zXG4gICAgICByZXR1cm4gbm9kZS5jYi5hcHBseShudWxsLCBhcmdzKVxuICAgIH1cblxuICAgIGNvbnN0IGRmdCA9IF90cmllLm1hdGNoKF9kZWZhdWx0KVxuICAgIGlmIChkZnQgJiYgZGZ0LmNiKSB7XG4gICAgICBhcmdzWzBdID0gZGZ0LnBhcmFtc1xuICAgICAgcmV0dXJuIGRmdC5jYi5hcHBseShudWxsLCBhcmdzKVxuICAgIH1cblxuICAgIHRocm93IG5ldyBFcnJvcihcInJvdXRlICdcIiArIHJvdXRlICsgXCInIGRpZCBub3QgbWF0Y2hcIilcbiAgfVxufVxuIiwiY29uc3QgbXV0YXRlID0gcmVxdWlyZSgneHRlbmQvbXV0YWJsZScpXG5jb25zdCBhc3NlcnQgPSByZXF1aXJlKCdhc3NlcnQnKVxuY29uc3QgeHRlbmQgPSByZXF1aXJlKCd4dGVuZCcpXG5cbm1vZHVsZS5leHBvcnRzID0gVHJpZVxuXG4vLyBjcmVhdGUgYSBuZXcgdHJpZVxuLy8gbnVsbCAtPiBvYmpcbmZ1bmN0aW9uIFRyaWUgKCkge1xuICBpZiAoISh0aGlzIGluc3RhbmNlb2YgVHJpZSkpIHJldHVybiBuZXcgVHJpZSgpXG4gIHRoaXMudHJpZSA9IHsgbm9kZXM6IHt9IH1cbn1cblxuLy8gY3JlYXRlIGEgbm9kZSBvbiB0aGUgdHJpZSBhdCByb3V0ZVxuLy8gYW5kIHJldHVybiBhIG5vZGVcbi8vIHN0ciAtPiBudWxsXG5UcmllLnByb3RvdHlwZS5jcmVhdGUgPSBmdW5jdGlvbiAocm91dGUpIHtcbiAgYXNzZXJ0LmVxdWFsKHR5cGVvZiByb3V0ZSwgJ3N0cmluZycsICdyb3V0ZSBzaG91bGQgYmUgYSBzdHJpbmcnKVxuICAvLyBzdHJpcCBsZWFkaW5nICcvJyBhbmQgc3BsaXQgcm91dGVzXG4gIGNvbnN0IHJvdXRlcyA9IHJvdXRlLnJlcGxhY2UoL15cXC8vLCAnJykuc3BsaXQoJy8nKVxuICByZXR1cm4gKGZ1bmN0aW9uIGNyZWF0ZU5vZGUgKGluZGV4LCB0cmllLCByb3V0ZXMpIHtcbiAgICBjb25zdCByb3V0ZSA9IHJvdXRlc1tpbmRleF1cblxuICAgIGlmIChyb3V0ZSA9PT0gdW5kZWZpbmVkKSByZXR1cm4gdHJpZVxuXG4gICAgdmFyIG5vZGUgPSBudWxsXG4gICAgaWYgKC9eOi8udGVzdChyb3V0ZSkpIHtcbiAgICAgIC8vIGlmIG5vZGUgaXMgYSBuYW1lIG1hdGNoLCBzZXQgbmFtZSBhbmQgYXBwZW5kIHRvICc6JyBub2RlXG4gICAgICBpZiAoIXRyaWUubm9kZXNbJyQkJ10pIHtcbiAgICAgICAgbm9kZSA9IHsgbm9kZXM6IHt9IH1cbiAgICAgICAgdHJpZS5ub2Rlc1snJCQnXSA9IG5vZGVcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG5vZGUgPSB0cmllLm5vZGVzWyckJCddXG4gICAgICB9XG4gICAgICB0cmllLm5hbWUgPSByb3V0ZS5yZXBsYWNlKC9eOi8sICcnKVxuICAgIH0gZWxzZSBpZiAoIXRyaWUubm9kZXNbcm91dGVdKSB7XG4gICAgICBub2RlID0geyBub2Rlczoge30gfVxuICAgICAgdHJpZS5ub2Rlc1tyb3V0ZV0gPSBub2RlXG4gICAgfSBlbHNlIHtcbiAgICAgIG5vZGUgPSB0cmllLm5vZGVzW3JvdXRlXVxuICAgIH1cblxuICAgIC8vIHdlIG11c3QgcmVjdXJzZSBkZWVwZXJcbiAgICByZXR1cm4gY3JlYXRlTm9kZShpbmRleCArIDEsIG5vZGUsIHJvdXRlcylcbiAgfSkoMCwgdGhpcy50cmllLCByb3V0ZXMpXG59XG5cbi8vIG1hdGNoIGEgcm91dGUgb24gdGhlIHRyaWVcbi8vIGFuZCByZXR1cm4gdGhlIG5vZGVcbi8vIHN0ciAtPiBvYmpcblRyaWUucHJvdG90eXBlLm1hdGNoID0gZnVuY3Rpb24gKHJvdXRlKSB7XG4gIGFzc2VydC5lcXVhbCh0eXBlb2Ygcm91dGUsICdzdHJpbmcnLCAncm91dGUgc2hvdWxkIGJlIGEgc3RyaW5nJylcblxuICBjb25zdCByb3V0ZXMgPSByb3V0ZS5yZXBsYWNlKC9eXFwvLywgJycpLnNwbGl0KCcvJylcbiAgY29uc3QgcGFyYW1zID0ge31cblxuICB2YXIgbm9kZSA9IChmdW5jdGlvbiBzZWFyY2ggKGluZGV4LCB0cmllKSB7XG4gICAgLy8gZWl0aGVyIHRoZXJlJ3Mgbm8gbWF0Y2gsIG9yIHdlJ3JlIGRvbmUgc2VhcmNoaW5nXG4gICAgaWYgKHRyaWUgPT09IHVuZGVmaW5lZCkgcmV0dXJuIHVuZGVmaW5lZFxuICAgIGNvbnN0IHJvdXRlID0gcm91dGVzW2luZGV4XVxuICAgIGlmIChyb3V0ZSA9PT0gdW5kZWZpbmVkKSByZXR1cm4gdHJpZVxuXG4gICAgaWYgKHRyaWUubm9kZXNbcm91dGVdKSB7XG4gICAgICAvLyBtYXRjaCByZWd1bGFyIHJvdXRlcyBmaXJzdFxuICAgICAgcmV0dXJuIHNlYXJjaChpbmRleCArIDEsIHRyaWUubm9kZXNbcm91dGVdKVxuICAgIH0gZWxzZSBpZiAodHJpZS5uYW1lKSB7XG4gICAgICAvLyBtYXRjaCBuYW1lZCByb3V0ZXNcbiAgICAgIHBhcmFtc1t0cmllLm5hbWVdID0gcm91dGVcbiAgICAgIHJldHVybiBzZWFyY2goaW5kZXggKyAxLCB0cmllLm5vZGVzWyckJCddKVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBubyBtYXRjaGVzIGZvdW5kXG4gICAgICByZXR1cm4gc2VhcmNoKGluZGV4ICsgMSlcbiAgICB9XG4gIH0pKDAsIHRoaXMudHJpZSlcblxuICBpZiAoIW5vZGUpIHJldHVybiB1bmRlZmluZWRcbiAgbm9kZSA9IHh0ZW5kKG5vZGUpXG4gIG5vZGUucGFyYW1zID0gcGFyYW1zXG4gIHJldHVybiBub2RlXG59XG5cbi8vIG1vdW50IGEgdHJpZSBvbnRvIGEgbm9kZSBhdCByb3V0ZVxuLy8gKHN0ciwgb2JqKSAtPiBudWxsXG5UcmllLnByb3RvdHlwZS5tb3VudCA9IGZ1bmN0aW9uIChyb3V0ZSwgdHJpZSkge1xuICBhc3NlcnQuZXF1YWwodHlwZW9mIHJvdXRlLCAnc3RyaW5nJywgJ3JvdXRlIHNob3VsZCBiZSBhIHN0cmluZycpXG4gIGFzc2VydC5lcXVhbCh0eXBlb2YgdHJpZSwgJ29iamVjdCcsICd0cmllIHNob3VsZCBiZSBhIG9iamVjdCcpXG5cbiAgY29uc3Qgc3BsaXQgPSByb3V0ZS5yZXBsYWNlKC9eXFwvLywgJycpLnNwbGl0KCcvJylcbiAgdmFyIG5vZGUgPSBudWxsXG4gIHZhciBrZXkgPSBudWxsXG5cbiAgaWYgKHNwbGl0Lmxlbmd0aCA9PT0gMSkge1xuICAgIGtleSA9IHNwbGl0WzBdXG4gICAgbm9kZSA9IHRoaXMuY3JlYXRlKGtleSlcbiAgfSBlbHNlIHtcbiAgICBjb25zdCBoZWFkQXJyID0gc3BsaXQuc3BsaWNlKDAsIHNwbGl0Lmxlbmd0aCAtIDEpXG4gICAgY29uc3QgaGVhZCA9IGhlYWRBcnIuam9pbignLycpXG4gICAga2V5ID0gc3BsaXRbMF1cbiAgICBub2RlID0gdGhpcy5jcmVhdGUoaGVhZClcbiAgfVxuXG4gIG11dGF0ZShub2RlLm5vZGVzLCB0cmllLm5vZGVzKVxuICBpZiAodHJpZS5uYW1lKSBub2RlLm5hbWUgPSB0cmllLm5hbWVcblxuICAvLyBkZWxlZ2F0ZSBwcm9wZXJ0aWVzIGZyb20gJy8nIHRvIHRoZSBuZXcgbm9kZVxuICAvLyAnLycgY2Fubm90IGJlIHJlYWNoZWQgb25jZSBtb3VudGVkXG4gIGlmIChub2RlLm5vZGVzWycnXSkge1xuICAgIE9iamVjdC5rZXlzKG5vZGUubm9kZXNbJyddKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgIGlmIChrZXkgPT09ICdub2RlcycpIHJldHVyblxuICAgICAgbm9kZVtrZXldID0gbm9kZS5ub2Rlc1snJ11ba2V5XVxuICAgIH0pXG4gICAgbXV0YXRlKG5vZGUubm9kZXMsIG5vZGUubm9kZXNbJyddLm5vZGVzKVxuICAgIGRlbGV0ZSBub2RlLm5vZGVzWycnXS5ub2Rlc1xuICB9XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGV4dGVuZFxuXG52YXIgaGFzT3duUHJvcGVydHkgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xuXG5mdW5jdGlvbiBleHRlbmQoKSB7XG4gICAgdmFyIHRhcmdldCA9IHt9XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldXG5cbiAgICAgICAgZm9yICh2YXIga2V5IGluIHNvdXJjZSkge1xuICAgICAgICAgICAgaWYgKGhhc093blByb3BlcnR5LmNhbGwoc291cmNlLCBrZXkpKSB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRhcmdldFxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSBleHRlbmRcblxudmFyIGhhc093blByb3BlcnR5ID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcblxuZnVuY3Rpb24gZXh0ZW5kKHRhcmdldCkge1xuICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV1cblxuICAgICAgICBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7XG4gICAgICAgICAgICBpZiAoaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHtcbiAgICAgICAgICAgICAgICB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdGFyZ2V0XG59XG4iLCJ2YXIgYmVsID0gcmVxdWlyZSgnYmVsJykgLy8gdHVybnMgdGVtcGxhdGUgdGFnIGludG8gRE9NIGVsZW1lbnRzXG52YXIgbW9ycGhkb20gPSByZXF1aXJlKCdtb3JwaGRvbScpIC8vIGVmZmljaWVudGx5IGRpZmZzICsgbW9ycGhzIHR3byBET00gZWxlbWVudHNcbnZhciBkZWZhdWx0RXZlbnRzID0gcmVxdWlyZSgnLi91cGRhdGUtZXZlbnRzLmpzJykgLy8gZGVmYXVsdCBldmVudHMgdG8gYmUgY29waWVkIHdoZW4gZG9tIGVsZW1lbnRzIHVwZGF0ZVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJlbFxuXG4vLyBUT0RPIG1vdmUgdGhpcyArIGRlZmF1bHRFdmVudHMgdG8gYSBuZXcgbW9kdWxlIG9uY2Ugd2UgcmVjZWl2ZSBtb3JlIGZlZWRiYWNrXG5tb2R1bGUuZXhwb3J0cy51cGRhdGUgPSBmdW5jdGlvbiAoZnJvbU5vZGUsIHRvTm9kZSwgb3B0cykge1xuICBpZiAoIW9wdHMpIG9wdHMgPSB7fVxuICBpZiAob3B0cy5ldmVudHMgIT09IGZhbHNlKSB7XG4gICAgaWYgKCFvcHRzLm9uQmVmb3JlTW9ycGhFbCkgb3B0cy5vbkJlZm9yZU1vcnBoRWwgPSBjb3BpZXJcbiAgfVxuXG4gIHJldHVybiBtb3JwaGRvbShmcm9tTm9kZSwgdG9Ob2RlLCBvcHRzKVxuXG4gIC8vIG1vcnBoZG9tIG9ubHkgY29waWVzIGF0dHJpYnV0ZXMuIHdlIGRlY2lkZWQgd2UgYWxzbyB3YW50ZWQgdG8gY29weSBldmVudHNcbiAgLy8gdGhhdCBjYW4gYmUgc2V0IHZpYSBhdHRyaWJ1dGVzXG4gIGZ1bmN0aW9uIGNvcGllciAoZiwgdCkge1xuICAgIC8vIGNvcHkgZXZlbnRzOlxuICAgIHZhciBldmVudHMgPSBvcHRzLmV2ZW50cyB8fCBkZWZhdWx0RXZlbnRzXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBldmVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBldiA9IGV2ZW50c1tpXVxuICAgICAgaWYgKHRbZXZdKSB7IC8vIGlmIG5ldyBlbGVtZW50IGhhcyBhIHdoaXRlbGlzdGVkIGF0dHJpYnV0ZVxuICAgICAgICBmW2V2XSA9IHRbZXZdIC8vIHVwZGF0ZSBleGlzdGluZyBlbGVtZW50XG4gICAgICB9IGVsc2UgaWYgKGZbZXZdKSB7IC8vIGlmIGV4aXN0aW5nIGVsZW1lbnQgaGFzIGl0IGFuZCBuZXcgb25lIGRvZXNudFxuICAgICAgICBmW2V2XSA9IHVuZGVmaW5lZCAvLyByZW1vdmUgaXQgZnJvbSBleGlzdGluZyBlbGVtZW50XG4gICAgICB9XG4gICAgfVxuICAgIC8vIGNvcHkgdmFsdWVzIGZvciBmb3JtIGVsZW1lbnRzXG4gICAgaWYgKChmLm5vZGVOYW1lID09PSAnSU5QVVQnICYmIGYudHlwZSAhPT0gJ2ZpbGUnKSB8fCBmLm5vZGVOYW1lID09PSAnVEVYVEFSRUEnIHx8IGYubm9kZU5hbWUgPT09ICdTRUxFQ1QnKSB7XG4gICAgICBpZiAodC5nZXRBdHRyaWJ1dGUoJ3ZhbHVlJykgPT09IG51bGwpIHQudmFsdWUgPSBmLnZhbHVlXG4gICAgfVxuICB9XG59XG4iLCJ2YXIgZG9jdW1lbnQgPSByZXF1aXJlKCdnbG9iYWwvZG9jdW1lbnQnKVxudmFyIGh5cGVyeCA9IHJlcXVpcmUoJ2h5cGVyeCcpXG5cbnZhciBTVkdOUyA9ICdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZydcbnZhciBCT09MX1BST1BTID0ge1xuICBhdXRvZm9jdXM6IDEsXG4gIGNoZWNrZWQ6IDEsXG4gIGRlZmF1bHRjaGVja2VkOiAxLFxuICBkaXNhYmxlZDogMSxcbiAgZm9ybW5vdmFsaWRhdGU6IDEsXG4gIGluZGV0ZXJtaW5hdGU6IDEsXG4gIHJlYWRvbmx5OiAxLFxuICByZXF1aXJlZDogMSxcbiAgd2lsbHZhbGlkYXRlOiAxXG59XG52YXIgU1ZHX1RBR1MgPSBbXG4gICdzdmcnLFxuICAnYWx0R2x5cGgnLCAnYWx0R2x5cGhEZWYnLCAnYWx0R2x5cGhJdGVtJywgJ2FuaW1hdGUnLCAnYW5pbWF0ZUNvbG9yJyxcbiAgJ2FuaW1hdGVNb3Rpb24nLCAnYW5pbWF0ZVRyYW5zZm9ybScsICdjaXJjbGUnLCAnY2xpcFBhdGgnLCAnY29sb3ItcHJvZmlsZScsXG4gICdjdXJzb3InLCAnZGVmcycsICdkZXNjJywgJ2VsbGlwc2UnLCAnZmVCbGVuZCcsICdmZUNvbG9yTWF0cml4JyxcbiAgJ2ZlQ29tcG9uZW50VHJhbnNmZXInLCAnZmVDb21wb3NpdGUnLCAnZmVDb252b2x2ZU1hdHJpeCcsICdmZURpZmZ1c2VMaWdodGluZycsXG4gICdmZURpc3BsYWNlbWVudE1hcCcsICdmZURpc3RhbnRMaWdodCcsICdmZUZsb29kJywgJ2ZlRnVuY0EnLCAnZmVGdW5jQicsXG4gICdmZUZ1bmNHJywgJ2ZlRnVuY1InLCAnZmVHYXVzc2lhbkJsdXInLCAnZmVJbWFnZScsICdmZU1lcmdlJywgJ2ZlTWVyZ2VOb2RlJyxcbiAgJ2ZlTW9ycGhvbG9neScsICdmZU9mZnNldCcsICdmZVBvaW50TGlnaHQnLCAnZmVTcGVjdWxhckxpZ2h0aW5nJyxcbiAgJ2ZlU3BvdExpZ2h0JywgJ2ZlVGlsZScsICdmZVR1cmJ1bGVuY2UnLCAnZmlsdGVyJywgJ2ZvbnQnLCAnZm9udC1mYWNlJyxcbiAgJ2ZvbnQtZmFjZS1mb3JtYXQnLCAnZm9udC1mYWNlLW5hbWUnLCAnZm9udC1mYWNlLXNyYycsICdmb250LWZhY2UtdXJpJyxcbiAgJ2ZvcmVpZ25PYmplY3QnLCAnZycsICdnbHlwaCcsICdnbHlwaFJlZicsICdoa2VybicsICdpbWFnZScsICdsaW5lJyxcbiAgJ2xpbmVhckdyYWRpZW50JywgJ21hcmtlcicsICdtYXNrJywgJ21ldGFkYXRhJywgJ21pc3NpbmctZ2x5cGgnLCAnbXBhdGgnLFxuICAncGF0aCcsICdwYXR0ZXJuJywgJ3BvbHlnb24nLCAncG9seWxpbmUnLCAncmFkaWFsR3JhZGllbnQnLCAncmVjdCcsXG4gICdzZXQnLCAnc3RvcCcsICdzd2l0Y2gnLCAnc3ltYm9sJywgJ3RleHQnLCAndGV4dFBhdGgnLCAndGl0bGUnLCAndHJlZicsXG4gICd0c3BhbicsICd1c2UnLCAndmlldycsICd2a2Vybidcbl1cblxuZnVuY3Rpb24gYmVsQ3JlYXRlRWxlbWVudCAodGFnLCBwcm9wcywgY2hpbGRyZW4pIHtcbiAgdmFyIGVsXG5cbiAgLy8gSWYgYW4gc3ZnIHRhZywgaXQgbmVlZHMgYSBuYW1lc3BhY2VcbiAgaWYgKFNWR19UQUdTLmluZGV4T2YodGFnKSAhPT0gLTEpIHtcbiAgICBwcm9wcy5uYW1lc3BhY2UgPSBTVkdOU1xuICB9XG5cbiAgLy8gSWYgd2UgYXJlIHVzaW5nIGEgbmFtZXNwYWNlXG4gIHZhciBucyA9IGZhbHNlXG4gIGlmIChwcm9wcy5uYW1lc3BhY2UpIHtcbiAgICBucyA9IHByb3BzLm5hbWVzcGFjZVxuICAgIGRlbGV0ZSBwcm9wcy5uYW1lc3BhY2VcbiAgfVxuXG4gIC8vIENyZWF0ZSB0aGUgZWxlbWVudFxuICBpZiAobnMpIHtcbiAgICBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhucywgdGFnKVxuICB9IGVsc2Uge1xuICAgIGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0YWcpXG4gIH1cblxuICAvLyBDcmVhdGUgdGhlIHByb3BlcnRpZXNcbiAgZm9yICh2YXIgcCBpbiBwcm9wcykge1xuICAgIGlmIChwcm9wcy5oYXNPd25Qcm9wZXJ0eShwKSkge1xuICAgICAgdmFyIGtleSA9IHAudG9Mb3dlckNhc2UoKVxuICAgICAgdmFyIHZhbCA9IHByb3BzW3BdXG4gICAgICAvLyBOb3JtYWxpemUgY2xhc3NOYW1lXG4gICAgICBpZiAoa2V5ID09PSAnY2xhc3NuYW1lJykge1xuICAgICAgICBrZXkgPSAnY2xhc3MnXG4gICAgICAgIHAgPSAnY2xhc3MnXG4gICAgICB9XG4gICAgICAvLyBUaGUgZm9yIGF0dHJpYnV0ZSBnZXRzIHRyYW5zZm9ybWVkIHRvIGh0bWxGb3IsIGJ1dCB3ZSBqdXN0IHNldCBhcyBmb3JcbiAgICAgIGlmIChwID09PSAnaHRtbEZvcicpIHtcbiAgICAgICAgcCA9ICdmb3InXG4gICAgICB9XG4gICAgICAvLyBJZiBhIHByb3BlcnR5IGlzIGJvb2xlYW4sIHNldCBpdHNlbGYgdG8gdGhlIGtleVxuICAgICAgaWYgKEJPT0xfUFJPUFNba2V5XSkge1xuICAgICAgICBpZiAodmFsID09PSAndHJ1ZScpIHZhbCA9IGtleVxuICAgICAgICBlbHNlIGlmICh2YWwgPT09ICdmYWxzZScpIGNvbnRpbnVlXG4gICAgICB9XG4gICAgICAvLyBJZiBhIHByb3BlcnR5IHByZWZlcnMgYmVpbmcgc2V0IGRpcmVjdGx5IHZzIHNldEF0dHJpYnV0ZVxuICAgICAgaWYgKGtleS5zbGljZSgwLCAyKSA9PT0gJ29uJykge1xuICAgICAgICBlbFtwXSA9IHZhbFxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKG5zKSB7XG4gICAgICAgICAgZWwuc2V0QXR0cmlidXRlTlMobnVsbCwgcCwgdmFsKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGVsLnNldEF0dHJpYnV0ZShwLCB2YWwpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBhcHBlbmRDaGlsZCAoY2hpbGRzKSB7XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KGNoaWxkcykpIHJldHVyblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2hpbGRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgbm9kZSA9IGNoaWxkc1tpXVxuICAgICAgaWYgKEFycmF5LmlzQXJyYXkobm9kZSkpIHtcbiAgICAgICAgYXBwZW5kQ2hpbGQobm9kZSlcbiAgICAgICAgY29udGludWVcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiBub2RlID09PSAnbnVtYmVyJyB8fFxuICAgICAgICB0eXBlb2Ygbm9kZSA9PT0gJ2Jvb2xlYW4nIHx8XG4gICAgICAgIG5vZGUgaW5zdGFuY2VvZiBEYXRlIHx8XG4gICAgICAgIG5vZGUgaW5zdGFuY2VvZiBSZWdFeHApIHtcbiAgICAgICAgbm9kZSA9IG5vZGUudG9TdHJpbmcoKVxuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIG5vZGUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIGlmIChlbC5sYXN0Q2hpbGQgJiYgZWwubGFzdENoaWxkLm5vZGVOYW1lID09PSAnI3RleHQnKSB7XG4gICAgICAgICAgZWwubGFzdENoaWxkLm5vZGVWYWx1ZSArPSBub2RlXG4gICAgICAgICAgY29udGludWVcbiAgICAgICAgfVxuICAgICAgICBub2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUobm9kZSlcbiAgICAgIH1cblxuICAgICAgaWYgKG5vZGUgJiYgbm9kZS5ub2RlVHlwZSkge1xuICAgICAgICBlbC5hcHBlbmRDaGlsZChub2RlKVxuICAgICAgfVxuICAgIH1cbiAgfVxuICBhcHBlbmRDaGlsZChjaGlsZHJlbilcblxuICByZXR1cm4gZWxcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBoeXBlcngoYmVsQ3JlYXRlRWxlbWVudClcbm1vZHVsZS5leHBvcnRzLmNyZWF0ZUVsZW1lbnQgPSBiZWxDcmVhdGVFbGVtZW50XG4iLCJ2YXIgYXR0clRvUHJvcCA9IHJlcXVpcmUoJ2h5cGVyc2NyaXB0LWF0dHJpYnV0ZS10by1wcm9wZXJ0eScpXG5cbnZhciBWQVIgPSAwLCBURVhUID0gMSwgT1BFTiA9IDIsIENMT1NFID0gMywgQVRUUiA9IDRcbnZhciBBVFRSX0tFWSA9IDUsIEFUVFJfS0VZX1cgPSA2XG52YXIgQVRUUl9WQUxVRV9XID0gNywgQVRUUl9WQUxVRSA9IDhcbnZhciBBVFRSX1ZBTFVFX1NRID0gOSwgQVRUUl9WQUxVRV9EUSA9IDEwXG52YXIgQVRUUl9FUSA9IDExLCBBVFRSX0JSRUFLID0gMTJcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaCwgb3B0cykge1xuICBoID0gYXR0clRvUHJvcChoKVxuICBpZiAoIW9wdHMpIG9wdHMgPSB7fVxuICB2YXIgY29uY2F0ID0gb3B0cy5jb25jYXQgfHwgZnVuY3Rpb24gKGEsIGIpIHtcbiAgICByZXR1cm4gU3RyaW5nKGEpICsgU3RyaW5nKGIpXG4gIH1cblxuICByZXR1cm4gZnVuY3Rpb24gKHN0cmluZ3MpIHtcbiAgICB2YXIgc3RhdGUgPSBURVhULCByZWcgPSAnJ1xuICAgIHZhciBhcmdsZW4gPSBhcmd1bWVudHMubGVuZ3RoXG4gICAgdmFyIHBhcnRzID0gW11cblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc3RyaW5ncy5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKGkgPCBhcmdsZW4gLSAxKSB7XG4gICAgICAgIHZhciBhcmcgPSBhcmd1bWVudHNbaSsxXVxuICAgICAgICB2YXIgcCA9IHBhcnNlKHN0cmluZ3NbaV0pXG4gICAgICAgIHZhciB4c3RhdGUgPSBzdGF0ZVxuICAgICAgICBpZiAoeHN0YXRlID09PSBBVFRSX1ZBTFVFX0RRKSB4c3RhdGUgPSBBVFRSX1ZBTFVFXG4gICAgICAgIGlmICh4c3RhdGUgPT09IEFUVFJfVkFMVUVfU1EpIHhzdGF0ZSA9IEFUVFJfVkFMVUVcbiAgICAgICAgaWYgKHhzdGF0ZSA9PT0gQVRUUl9WQUxVRV9XKSB4c3RhdGUgPSBBVFRSX1ZBTFVFXG4gICAgICAgIGlmICh4c3RhdGUgPT09IEFUVFIpIHhzdGF0ZSA9IEFUVFJfS0VZXG4gICAgICAgIHAucHVzaChbIFZBUiwgeHN0YXRlLCBhcmcgXSlcbiAgICAgICAgcGFydHMucHVzaC5hcHBseShwYXJ0cywgcClcbiAgICAgIH0gZWxzZSBwYXJ0cy5wdXNoLmFwcGx5KHBhcnRzLCBwYXJzZShzdHJpbmdzW2ldKSlcbiAgICB9XG5cbiAgICB2YXIgdHJlZSA9IFtudWxsLHt9LFtdXVxuICAgIHZhciBzdGFjayA9IFtbdHJlZSwtMV1dXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwYXJ0cy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGN1ciA9IHN0YWNrW3N0YWNrLmxlbmd0aC0xXVswXVxuICAgICAgdmFyIHAgPSBwYXJ0c1tpXSwgcyA9IHBbMF1cbiAgICAgIGlmIChzID09PSBPUEVOICYmIC9eXFwvLy50ZXN0KHBbMV0pKSB7XG4gICAgICAgIHZhciBpeCA9IHN0YWNrW3N0YWNrLmxlbmd0aC0xXVsxXVxuICAgICAgICBpZiAoc3RhY2subGVuZ3RoID4gMSkge1xuICAgICAgICAgIHN0YWNrLnBvcCgpXG4gICAgICAgICAgc3RhY2tbc3RhY2subGVuZ3RoLTFdWzBdWzJdW2l4XSA9IGgoXG4gICAgICAgICAgICBjdXJbMF0sIGN1clsxXSwgY3VyWzJdLmxlbmd0aCA/IGN1clsyXSA6IHVuZGVmaW5lZFxuICAgICAgICAgIClcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChzID09PSBPUEVOKSB7XG4gICAgICAgIHZhciBjID0gW3BbMV0se30sW11dXG4gICAgICAgIGN1clsyXS5wdXNoKGMpXG4gICAgICAgIHN0YWNrLnB1c2goW2MsY3VyWzJdLmxlbmd0aC0xXSlcbiAgICAgIH0gZWxzZSBpZiAocyA9PT0gQVRUUl9LRVkgfHwgKHMgPT09IFZBUiAmJiBwWzFdID09PSBBVFRSX0tFWSkpIHtcbiAgICAgICAgdmFyIGtleSA9ICcnXG4gICAgICAgIHZhciBjb3B5S2V5XG4gICAgICAgIGZvciAoOyBpIDwgcGFydHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBpZiAocGFydHNbaV1bMF0gPT09IEFUVFJfS0VZKSB7XG4gICAgICAgICAgICBrZXkgPSBjb25jYXQoa2V5LCBwYXJ0c1tpXVsxXSlcbiAgICAgICAgICB9IGVsc2UgaWYgKHBhcnRzW2ldWzBdID09PSBWQVIgJiYgcGFydHNbaV1bMV0gPT09IEFUVFJfS0VZKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHBhcnRzW2ldWzJdID09PSAnb2JqZWN0JyAmJiAha2V5KSB7XG4gICAgICAgICAgICAgIGZvciAoY29weUtleSBpbiBwYXJ0c1tpXVsyXSkge1xuICAgICAgICAgICAgICAgIGlmIChwYXJ0c1tpXVsyXS5oYXNPd25Qcm9wZXJ0eShjb3B5S2V5KSAmJiAhY3VyWzFdW2NvcHlLZXldKSB7XG4gICAgICAgICAgICAgICAgICBjdXJbMV1bY29weUtleV0gPSBwYXJ0c1tpXVsyXVtjb3B5S2V5XVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAga2V5ID0gY29uY2F0KGtleSwgcGFydHNbaV1bMl0pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIGJyZWFrXG4gICAgICAgIH1cbiAgICAgICAgaWYgKHBhcnRzW2ldWzBdID09PSBBVFRSX0VRKSBpKytcbiAgICAgICAgdmFyIGogPSBpXG4gICAgICAgIGZvciAoOyBpIDwgcGFydHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBpZiAocGFydHNbaV1bMF0gPT09IEFUVFJfVkFMVUUgfHwgcGFydHNbaV1bMF0gPT09IEFUVFJfS0VZKSB7XG4gICAgICAgICAgICBpZiAoIWN1clsxXVtrZXldKSBjdXJbMV1ba2V5XSA9IHN0cmZuKHBhcnRzW2ldWzFdKVxuICAgICAgICAgICAgZWxzZSBjdXJbMV1ba2V5XSA9IGNvbmNhdChjdXJbMV1ba2V5XSwgcGFydHNbaV1bMV0pXG4gICAgICAgICAgfSBlbHNlIGlmIChwYXJ0c1tpXVswXSA9PT0gVkFSXG4gICAgICAgICAgJiYgKHBhcnRzW2ldWzFdID09PSBBVFRSX1ZBTFVFIHx8IHBhcnRzW2ldWzFdID09PSBBVFRSX0tFWSkpIHtcbiAgICAgICAgICAgIGlmICghY3VyWzFdW2tleV0pIGN1clsxXVtrZXldID0gc3RyZm4ocGFydHNbaV1bMl0pXG4gICAgICAgICAgICBlbHNlIGN1clsxXVtrZXldID0gY29uY2F0KGN1clsxXVtrZXldLCBwYXJ0c1tpXVsyXSlcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKGtleS5sZW5ndGggJiYgIWN1clsxXVtrZXldICYmIGkgPT09IGpcbiAgICAgICAgICAgICYmIChwYXJ0c1tpXVswXSA9PT0gQ0xPU0UgfHwgcGFydHNbaV1bMF0gPT09IEFUVFJfQlJFQUspKSB7XG4gICAgICAgICAgICAgIC8vIGh0dHBzOi8vaHRtbC5zcGVjLndoYXR3Zy5vcmcvbXVsdGlwYWdlL2luZnJhc3RydWN0dXJlLmh0bWwjYm9vbGVhbi1hdHRyaWJ1dGVzXG4gICAgICAgICAgICAgIC8vIGVtcHR5IHN0cmluZyBpcyBmYWxzeSwgbm90IHdlbGwgYmVoYXZlZCB2YWx1ZSBpbiBicm93c2VyXG4gICAgICAgICAgICAgIGN1clsxXVtrZXldID0ga2V5LnRvTG93ZXJDYXNlKClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHMgPT09IEFUVFJfS0VZKSB7XG4gICAgICAgIGN1clsxXVtwWzFdXSA9IHRydWVcbiAgICAgIH0gZWxzZSBpZiAocyA9PT0gVkFSICYmIHBbMV0gPT09IEFUVFJfS0VZKSB7XG4gICAgICAgIGN1clsxXVtwWzJdXSA9IHRydWVcbiAgICAgIH0gZWxzZSBpZiAocyA9PT0gQ0xPU0UpIHtcbiAgICAgICAgaWYgKHNlbGZDbG9zaW5nKGN1clswXSkgJiYgc3RhY2subGVuZ3RoKSB7XG4gICAgICAgICAgdmFyIGl4ID0gc3RhY2tbc3RhY2subGVuZ3RoLTFdWzFdXG4gICAgICAgICAgc3RhY2sucG9wKClcbiAgICAgICAgICBzdGFja1tzdGFjay5sZW5ndGgtMV1bMF1bMl1baXhdID0gaChcbiAgICAgICAgICAgIGN1clswXSwgY3VyWzFdLCBjdXJbMl0ubGVuZ3RoID8gY3VyWzJdIDogdW5kZWZpbmVkXG4gICAgICAgICAgKVxuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHMgPT09IFZBUiAmJiBwWzFdID09PSBURVhUKSB7XG4gICAgICAgIGlmIChwWzJdID09PSB1bmRlZmluZWQgfHwgcFsyXSA9PT0gbnVsbCkgcFsyXSA9ICcnXG4gICAgICAgIGVsc2UgaWYgKCFwWzJdKSBwWzJdID0gY29uY2F0KCcnLCBwWzJdKVxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShwWzJdWzBdKSkge1xuICAgICAgICAgIGN1clsyXS5wdXNoLmFwcGx5KGN1clsyXSwgcFsyXSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjdXJbMl0ucHVzaChwWzJdKVxuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHMgPT09IFRFWFQpIHtcbiAgICAgICAgY3VyWzJdLnB1c2gocFsxXSlcbiAgICAgIH0gZWxzZSBpZiAocyA9PT0gQVRUUl9FUSB8fCBzID09PSBBVFRSX0JSRUFLKSB7XG4gICAgICAgIC8vIG5vLW9wXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3VuaGFuZGxlZDogJyArIHMpXG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHRyZWVbMl0ubGVuZ3RoID4gMSAmJiAvXlxccyokLy50ZXN0KHRyZWVbMl1bMF0pKSB7XG4gICAgICB0cmVlWzJdLnNoaWZ0KClcbiAgICB9XG5cbiAgICBpZiAodHJlZVsyXS5sZW5ndGggPiAyXG4gICAgfHwgKHRyZWVbMl0ubGVuZ3RoID09PSAyICYmIC9cXFMvLnRlc3QodHJlZVsyXVsxXSkpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICdtdWx0aXBsZSByb290IGVsZW1lbnRzIG11c3QgYmUgd3JhcHBlZCBpbiBhbiBlbmNsb3NpbmcgdGFnJ1xuICAgICAgKVxuICAgIH1cbiAgICBpZiAoQXJyYXkuaXNBcnJheSh0cmVlWzJdWzBdKSAmJiB0eXBlb2YgdHJlZVsyXVswXVswXSA9PT0gJ3N0cmluZydcbiAgICAmJiBBcnJheS5pc0FycmF5KHRyZWVbMl1bMF1bMl0pKSB7XG4gICAgICB0cmVlWzJdWzBdID0gaCh0cmVlWzJdWzBdWzBdLCB0cmVlWzJdWzBdWzFdLCB0cmVlWzJdWzBdWzJdKVxuICAgIH1cbiAgICByZXR1cm4gdHJlZVsyXVswXVxuXG4gICAgZnVuY3Rpb24gcGFyc2UgKHN0cikge1xuICAgICAgdmFyIHJlcyA9IFtdXG4gICAgICBpZiAoc3RhdGUgPT09IEFUVFJfVkFMVUVfVykgc3RhdGUgPSBBVFRSXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHN0ci5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgYyA9IHN0ci5jaGFyQXQoaSlcbiAgICAgICAgaWYgKHN0YXRlID09PSBURVhUICYmIGMgPT09ICc8Jykge1xuICAgICAgICAgIGlmIChyZWcubGVuZ3RoKSByZXMucHVzaChbVEVYVCwgcmVnXSlcbiAgICAgICAgICByZWcgPSAnJ1xuICAgICAgICAgIHN0YXRlID0gT1BFTlxuICAgICAgICB9IGVsc2UgaWYgKGMgPT09ICc+JyAmJiAhcXVvdChzdGF0ZSkpIHtcbiAgICAgICAgICBpZiAoc3RhdGUgPT09IE9QRU4pIHtcbiAgICAgICAgICAgIHJlcy5wdXNoKFtPUEVOLHJlZ10pXG4gICAgICAgICAgfSBlbHNlIGlmIChzdGF0ZSA9PT0gQVRUUl9LRVkpIHtcbiAgICAgICAgICAgIHJlcy5wdXNoKFtBVFRSX0tFWSxyZWddKVxuICAgICAgICAgIH0gZWxzZSBpZiAoc3RhdGUgPT09IEFUVFJfVkFMVUUgJiYgcmVnLmxlbmd0aCkge1xuICAgICAgICAgICAgcmVzLnB1c2goW0FUVFJfVkFMVUUscmVnXSlcbiAgICAgICAgICB9XG4gICAgICAgICAgcmVzLnB1c2goW0NMT1NFXSlcbiAgICAgICAgICByZWcgPSAnJ1xuICAgICAgICAgIHN0YXRlID0gVEVYVFxuICAgICAgICB9IGVsc2UgaWYgKHN0YXRlID09PSBURVhUKSB7XG4gICAgICAgICAgcmVnICs9IGNcbiAgICAgICAgfSBlbHNlIGlmIChzdGF0ZSA9PT0gT1BFTiAmJiAvXFxzLy50ZXN0KGMpKSB7XG4gICAgICAgICAgcmVzLnB1c2goW09QRU4sIHJlZ10pXG4gICAgICAgICAgcmVnID0gJydcbiAgICAgICAgICBzdGF0ZSA9IEFUVFJcbiAgICAgICAgfSBlbHNlIGlmIChzdGF0ZSA9PT0gT1BFTikge1xuICAgICAgICAgIHJlZyArPSBjXG4gICAgICAgIH0gZWxzZSBpZiAoc3RhdGUgPT09IEFUVFIgJiYgL1tcXHctXS8udGVzdChjKSkge1xuICAgICAgICAgIHN0YXRlID0gQVRUUl9LRVlcbiAgICAgICAgICByZWcgPSBjXG4gICAgICAgIH0gZWxzZSBpZiAoc3RhdGUgPT09IEFUVFIgJiYgL1xccy8udGVzdChjKSkge1xuICAgICAgICAgIGlmIChyZWcubGVuZ3RoKSByZXMucHVzaChbQVRUUl9LRVkscmVnXSlcbiAgICAgICAgICByZXMucHVzaChbQVRUUl9CUkVBS10pXG4gICAgICAgIH0gZWxzZSBpZiAoc3RhdGUgPT09IEFUVFJfS0VZICYmIC9cXHMvLnRlc3QoYykpIHtcbiAgICAgICAgICByZXMucHVzaChbQVRUUl9LRVkscmVnXSlcbiAgICAgICAgICByZWcgPSAnJ1xuICAgICAgICAgIHN0YXRlID0gQVRUUl9LRVlfV1xuICAgICAgICB9IGVsc2UgaWYgKHN0YXRlID09PSBBVFRSX0tFWSAmJiBjID09PSAnPScpIHtcbiAgICAgICAgICByZXMucHVzaChbQVRUUl9LRVkscmVnXSxbQVRUUl9FUV0pXG4gICAgICAgICAgcmVnID0gJydcbiAgICAgICAgICBzdGF0ZSA9IEFUVFJfVkFMVUVfV1xuICAgICAgICB9IGVsc2UgaWYgKHN0YXRlID09PSBBVFRSX0tFWSkge1xuICAgICAgICAgIHJlZyArPSBjXG4gICAgICAgIH0gZWxzZSBpZiAoKHN0YXRlID09PSBBVFRSX0tFWV9XIHx8IHN0YXRlID09PSBBVFRSKSAmJiBjID09PSAnPScpIHtcbiAgICAgICAgICByZXMucHVzaChbQVRUUl9FUV0pXG4gICAgICAgICAgc3RhdGUgPSBBVFRSX1ZBTFVFX1dcbiAgICAgICAgfSBlbHNlIGlmICgoc3RhdGUgPT09IEFUVFJfS0VZX1cgfHwgc3RhdGUgPT09IEFUVFIpICYmICEvXFxzLy50ZXN0KGMpKSB7XG4gICAgICAgICAgcmVzLnB1c2goW0FUVFJfQlJFQUtdKVxuICAgICAgICAgIGlmICgvW1xcdy1dLy50ZXN0KGMpKSB7XG4gICAgICAgICAgICByZWcgKz0gY1xuICAgICAgICAgICAgc3RhdGUgPSBBVFRSX0tFWVxuICAgICAgICAgIH0gZWxzZSBzdGF0ZSA9IEFUVFJcbiAgICAgICAgfSBlbHNlIGlmIChzdGF0ZSA9PT0gQVRUUl9WQUxVRV9XICYmIGMgPT09ICdcIicpIHtcbiAgICAgICAgICBzdGF0ZSA9IEFUVFJfVkFMVUVfRFFcbiAgICAgICAgfSBlbHNlIGlmIChzdGF0ZSA9PT0gQVRUUl9WQUxVRV9XICYmIGMgPT09IFwiJ1wiKSB7XG4gICAgICAgICAgc3RhdGUgPSBBVFRSX1ZBTFVFX1NRXG4gICAgICAgIH0gZWxzZSBpZiAoc3RhdGUgPT09IEFUVFJfVkFMVUVfRFEgJiYgYyA9PT0gJ1wiJykge1xuICAgICAgICAgIHJlcy5wdXNoKFtBVFRSX1ZBTFVFLHJlZ10sW0FUVFJfQlJFQUtdKVxuICAgICAgICAgIHJlZyA9ICcnXG4gICAgICAgICAgc3RhdGUgPSBBVFRSXG4gICAgICAgIH0gZWxzZSBpZiAoc3RhdGUgPT09IEFUVFJfVkFMVUVfU1EgJiYgYyA9PT0gXCInXCIpIHtcbiAgICAgICAgICByZXMucHVzaChbQVRUUl9WQUxVRSxyZWddLFtBVFRSX0JSRUFLXSlcbiAgICAgICAgICByZWcgPSAnJ1xuICAgICAgICAgIHN0YXRlID0gQVRUUlxuICAgICAgICB9IGVsc2UgaWYgKHN0YXRlID09PSBBVFRSX1ZBTFVFX1cgJiYgIS9cXHMvLnRlc3QoYykpIHtcbiAgICAgICAgICBzdGF0ZSA9IEFUVFJfVkFMVUVcbiAgICAgICAgICBpLS1cbiAgICAgICAgfSBlbHNlIGlmIChzdGF0ZSA9PT0gQVRUUl9WQUxVRSAmJiAvXFxzLy50ZXN0KGMpKSB7XG4gICAgICAgICAgcmVzLnB1c2goW0FUVFJfVkFMVUUscmVnXSxbQVRUUl9CUkVBS10pXG4gICAgICAgICAgcmVnID0gJydcbiAgICAgICAgICBzdGF0ZSA9IEFUVFJcbiAgICAgICAgfSBlbHNlIGlmIChzdGF0ZSA9PT0gQVRUUl9WQUxVRSB8fCBzdGF0ZSA9PT0gQVRUUl9WQUxVRV9TUVxuICAgICAgICB8fCBzdGF0ZSA9PT0gQVRUUl9WQUxVRV9EUSkge1xuICAgICAgICAgIHJlZyArPSBjXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChzdGF0ZSA9PT0gVEVYVCAmJiByZWcubGVuZ3RoKSB7XG4gICAgICAgIHJlcy5wdXNoKFtURVhULHJlZ10pXG4gICAgICAgIHJlZyA9ICcnXG4gICAgICB9IGVsc2UgaWYgKHN0YXRlID09PSBBVFRSX1ZBTFVFICYmIHJlZy5sZW5ndGgpIHtcbiAgICAgICAgcmVzLnB1c2goW0FUVFJfVkFMVUUscmVnXSlcbiAgICAgICAgcmVnID0gJydcbiAgICAgIH0gZWxzZSBpZiAoc3RhdGUgPT09IEFUVFJfVkFMVUVfRFEgJiYgcmVnLmxlbmd0aCkge1xuICAgICAgICByZXMucHVzaChbQVRUUl9WQUxVRSxyZWddKVxuICAgICAgICByZWcgPSAnJ1xuICAgICAgfSBlbHNlIGlmIChzdGF0ZSA9PT0gQVRUUl9WQUxVRV9TUSAmJiByZWcubGVuZ3RoKSB7XG4gICAgICAgIHJlcy5wdXNoKFtBVFRSX1ZBTFVFLHJlZ10pXG4gICAgICAgIHJlZyA9ICcnXG4gICAgICB9IGVsc2UgaWYgKHN0YXRlID09PSBBVFRSX0tFWSkge1xuICAgICAgICByZXMucHVzaChbQVRUUl9LRVkscmVnXSlcbiAgICAgICAgcmVnID0gJydcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXNcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBzdHJmbiAoeCkge1xuICAgIGlmICh0eXBlb2YgeCA9PT0gJ2Z1bmN0aW9uJykgcmV0dXJuIHhcbiAgICBlbHNlIGlmICh0eXBlb2YgeCA9PT0gJ3N0cmluZycpIHJldHVybiB4XG4gICAgZWxzZSBpZiAoeCAmJiB0eXBlb2YgeCA9PT0gJ29iamVjdCcpIHJldHVybiB4XG4gICAgZWxzZSByZXR1cm4gY29uY2F0KCcnLCB4KVxuICB9XG59XG5cbmZ1bmN0aW9uIHF1b3QgKHN0YXRlKSB7XG4gIHJldHVybiBzdGF0ZSA9PT0gQVRUUl9WQUxVRV9TUSB8fCBzdGF0ZSA9PT0gQVRUUl9WQUxVRV9EUVxufVxuXG52YXIgaGFzT3duID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eVxuZnVuY3Rpb24gaGFzIChvYmosIGtleSkgeyByZXR1cm4gaGFzT3duLmNhbGwob2JqLCBrZXkpIH1cblxudmFyIGNsb3NlUkUgPSBSZWdFeHAoJ14oJyArIFtcbiAgJ2FyZWEnLCAnYmFzZScsICdiYXNlZm9udCcsICdiZ3NvdW5kJywgJ2JyJywgJ2NvbCcsICdjb21tYW5kJywgJ2VtYmVkJyxcbiAgJ2ZyYW1lJywgJ2hyJywgJ2ltZycsICdpbnB1dCcsICdpc2luZGV4JywgJ2tleWdlbicsICdsaW5rJywgJ21ldGEnLCAncGFyYW0nLFxuICAnc291cmNlJywgJ3RyYWNrJywgJ3dicicsXG4gIC8vIFNWRyBUQUdTXG4gICdhbmltYXRlJywgJ2FuaW1hdGVUcmFuc2Zvcm0nLCAnY2lyY2xlJywgJ2N1cnNvcicsICdkZXNjJywgJ2VsbGlwc2UnLFxuICAnZmVCbGVuZCcsICdmZUNvbG9yTWF0cml4JywgJ2ZlQ29tcG9uZW50VHJhbnNmZXInLCAnZmVDb21wb3NpdGUnLFxuICAnZmVDb252b2x2ZU1hdHJpeCcsICdmZURpZmZ1c2VMaWdodGluZycsICdmZURpc3BsYWNlbWVudE1hcCcsXG4gICdmZURpc3RhbnRMaWdodCcsICdmZUZsb29kJywgJ2ZlRnVuY0EnLCAnZmVGdW5jQicsICdmZUZ1bmNHJywgJ2ZlRnVuY1InLFxuICAnZmVHYXVzc2lhbkJsdXInLCAnZmVJbWFnZScsICdmZU1lcmdlTm9kZScsICdmZU1vcnBob2xvZ3knLFxuICAnZmVPZmZzZXQnLCAnZmVQb2ludExpZ2h0JywgJ2ZlU3BlY3VsYXJMaWdodGluZycsICdmZVNwb3RMaWdodCcsICdmZVRpbGUnLFxuICAnZmVUdXJidWxlbmNlJywgJ2ZvbnQtZmFjZS1mb3JtYXQnLCAnZm9udC1mYWNlLW5hbWUnLCAnZm9udC1mYWNlLXVyaScsXG4gICdnbHlwaCcsICdnbHlwaFJlZicsICdoa2VybicsICdpbWFnZScsICdsaW5lJywgJ21pc3NpbmctZ2x5cGgnLCAnbXBhdGgnLFxuICAncGF0aCcsICdwb2x5Z29uJywgJ3BvbHlsaW5lJywgJ3JlY3QnLCAnc2V0JywgJ3N0b3AnLCAndHJlZicsICd1c2UnLCAndmlldycsXG4gICd2a2Vybidcbl0uam9pbignfCcpICsgJykoPzpbXFwuI11bYS16QS1aMC05XFx1MDA3Ri1cXHVGRkZGXzotXSspKiQnKVxuZnVuY3Rpb24gc2VsZkNsb3NpbmcgKHRhZykgeyByZXR1cm4gY2xvc2VSRS50ZXN0KHRhZykgfVxuIiwibW9kdWxlLmV4cG9ydHMgPSBhdHRyaWJ1dGVUb1Byb3BlcnR5XG5cbnZhciB0cmFuc2Zvcm0gPSB7XG4gICdjbGFzcyc6ICdjbGFzc05hbWUnLFxuICAnZm9yJzogJ2h0bWxGb3InLFxuICAnaHR0cC1lcXVpdic6ICdodHRwRXF1aXYnXG59XG5cbmZ1bmN0aW9uIGF0dHJpYnV0ZVRvUHJvcGVydHkgKGgpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICh0YWdOYW1lLCBhdHRycywgY2hpbGRyZW4pIHtcbiAgICBmb3IgKHZhciBhdHRyIGluIGF0dHJzKSB7XG4gICAgICBpZiAoYXR0ciBpbiB0cmFuc2Zvcm0pIHtcbiAgICAgICAgYXR0cnNbdHJhbnNmb3JtW2F0dHJdXSA9IGF0dHJzW2F0dHJdXG4gICAgICAgIGRlbGV0ZSBhdHRyc1thdHRyXVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gaCh0YWdOYW1lLCBhdHRycywgY2hpbGRyZW4pXG4gIH1cbn1cbiIsIi8vIENyZWF0ZSBhIHJhbmdlIG9iamVjdCBmb3IgZWZmaWNlbnRseSByZW5kZXJpbmcgc3RyaW5ncyB0byBlbGVtZW50cy5cbnZhciByYW5nZTtcblxudmFyIHRlc3RFbCA9ICh0eXBlb2YgZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnKSA/XG4gICAgZG9jdW1lbnQuYm9keSB8fCBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSA6XG4gICAge307XG5cbnZhciBYSFRNTCA9ICdodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hodG1sJztcbnZhciBFTEVNRU5UX05PREUgPSAxO1xudmFyIFRFWFRfTk9ERSA9IDM7XG52YXIgQ09NTUVOVF9OT0RFID0gODtcblxuLy8gRml4ZXMgPGh0dHBzOi8vZ2l0aHViLmNvbS9wYXRyaWNrLXN0ZWVsZS1pZGVtL21vcnBoZG9tL2lzc3Vlcy8zMj5cbi8vIChJRTcrIHN1cHBvcnQpIDw9SUU3IGRvZXMgbm90IHN1cHBvcnQgZWwuaGFzQXR0cmlidXRlKG5hbWUpXG52YXIgaGFzQXR0cmlidXRlTlM7XG5cbmlmICh0ZXN0RWwuaGFzQXR0cmlidXRlTlMpIHtcbiAgICBoYXNBdHRyaWJ1dGVOUyA9IGZ1bmN0aW9uKGVsLCBuYW1lc3BhY2VVUkksIG5hbWUpIHtcbiAgICAgICAgcmV0dXJuIGVsLmhhc0F0dHJpYnV0ZU5TKG5hbWVzcGFjZVVSSSwgbmFtZSk7XG4gICAgfTtcbn0gZWxzZSBpZiAodGVzdEVsLmhhc0F0dHJpYnV0ZSkge1xuICAgIGhhc0F0dHJpYnV0ZU5TID0gZnVuY3Rpb24oZWwsIG5hbWVzcGFjZVVSSSwgbmFtZSkge1xuICAgICAgICByZXR1cm4gZWwuaGFzQXR0cmlidXRlKG5hbWUpO1xuICAgIH07XG59IGVsc2Uge1xuICAgIGhhc0F0dHJpYnV0ZU5TID0gZnVuY3Rpb24oZWwsIG5hbWVzcGFjZVVSSSwgbmFtZSkge1xuICAgICAgICByZXR1cm4gISFlbC5nZXRBdHRyaWJ1dGVOb2RlKG5hbWUpO1xuICAgIH07XG59XG5cbmZ1bmN0aW9uIGVtcHR5KG8pIHtcbiAgICBmb3IgKHZhciBrIGluIG8pIHtcbiAgICAgICAgaWYgKG8uaGFzT3duUHJvcGVydHkoaykpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gdG9FbGVtZW50KHN0cikge1xuICAgIGlmICghcmFuZ2UgJiYgZG9jdW1lbnQuY3JlYXRlUmFuZ2UpIHtcbiAgICAgICAgcmFuZ2UgPSBkb2N1bWVudC5jcmVhdGVSYW5nZSgpO1xuICAgICAgICByYW5nZS5zZWxlY3ROb2RlKGRvY3VtZW50LmJvZHkpO1xuICAgIH1cblxuICAgIHZhciBmcmFnbWVudDtcbiAgICBpZiAocmFuZ2UgJiYgcmFuZ2UuY3JlYXRlQ29udGV4dHVhbEZyYWdtZW50KSB7XG4gICAgICAgIGZyYWdtZW50ID0gcmFuZ2UuY3JlYXRlQ29udGV4dHVhbEZyYWdtZW50KHN0cik7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgZnJhZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdib2R5Jyk7XG4gICAgICAgIGZyYWdtZW50LmlubmVySFRNTCA9IHN0cjtcbiAgICB9XG4gICAgcmV0dXJuIGZyYWdtZW50LmNoaWxkTm9kZXNbMF07XG59XG5cbnZhciBzcGVjaWFsRWxIYW5kbGVycyA9IHtcbiAgICAvKipcbiAgICAgKiBOZWVkZWQgZm9yIElFLiBBcHBhcmVudGx5IElFIGRvZXNuJ3QgdGhpbmsgdGhhdCBcInNlbGVjdGVkXCIgaXMgYW5cbiAgICAgKiBhdHRyaWJ1dGUgd2hlbiByZWFkaW5nIG92ZXIgdGhlIGF0dHJpYnV0ZXMgdXNpbmcgc2VsZWN0RWwuYXR0cmlidXRlc1xuICAgICAqL1xuICAgIE9QVElPTjogZnVuY3Rpb24oZnJvbUVsLCB0b0VsKSB7XG4gICAgICAgIGZyb21FbC5zZWxlY3RlZCA9IHRvRWwuc2VsZWN0ZWQ7XG4gICAgICAgIGlmIChmcm9tRWwuc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgIGZyb21FbC5zZXRBdHRyaWJ1dGUoJ3NlbGVjdGVkJywgJycpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZnJvbUVsLnJlbW92ZUF0dHJpYnV0ZSgnc2VsZWN0ZWQnLCAnJyk7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIC8qKlxuICAgICAqIFRoZSBcInZhbHVlXCIgYXR0cmlidXRlIGlzIHNwZWNpYWwgZm9yIHRoZSA8aW5wdXQ+IGVsZW1lbnQgc2luY2UgaXQgc2V0c1xuICAgICAqIHRoZSBpbml0aWFsIHZhbHVlLiBDaGFuZ2luZyB0aGUgXCJ2YWx1ZVwiIGF0dHJpYnV0ZSB3aXRob3V0IGNoYW5naW5nIHRoZVxuICAgICAqIFwidmFsdWVcIiBwcm9wZXJ0eSB3aWxsIGhhdmUgbm8gZWZmZWN0IHNpbmNlIGl0IGlzIG9ubHkgdXNlZCB0byB0aGUgc2V0IHRoZVxuICAgICAqIGluaXRpYWwgdmFsdWUuICBTaW1pbGFyIGZvciB0aGUgXCJjaGVja2VkXCIgYXR0cmlidXRlLCBhbmQgXCJkaXNhYmxlZFwiLlxuICAgICAqL1xuICAgIElOUFVUOiBmdW5jdGlvbihmcm9tRWwsIHRvRWwpIHtcbiAgICAgICAgZnJvbUVsLmNoZWNrZWQgPSB0b0VsLmNoZWNrZWQ7XG4gICAgICAgIGlmIChmcm9tRWwuY2hlY2tlZCkge1xuICAgICAgICAgICAgZnJvbUVsLnNldEF0dHJpYnV0ZSgnY2hlY2tlZCcsICcnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGZyb21FbC5yZW1vdmVBdHRyaWJ1dGUoJ2NoZWNrZWQnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChmcm9tRWwudmFsdWUgIT09IHRvRWwudmFsdWUpIHtcbiAgICAgICAgICAgIGZyb21FbC52YWx1ZSA9IHRvRWwudmFsdWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIWhhc0F0dHJpYnV0ZU5TKHRvRWwsIG51bGwsICd2YWx1ZScpKSB7XG4gICAgICAgICAgICBmcm9tRWwucmVtb3ZlQXR0cmlidXRlKCd2YWx1ZScpO1xuICAgICAgICB9XG5cbiAgICAgICAgZnJvbUVsLmRpc2FibGVkID0gdG9FbC5kaXNhYmxlZDtcbiAgICAgICAgaWYgKGZyb21FbC5kaXNhYmxlZCkge1xuICAgICAgICAgICAgZnJvbUVsLnNldEF0dHJpYnV0ZSgnZGlzYWJsZWQnLCAnJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBmcm9tRWwucmVtb3ZlQXR0cmlidXRlKCdkaXNhYmxlZCcpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIFRFWFRBUkVBOiBmdW5jdGlvbihmcm9tRWwsIHRvRWwpIHtcbiAgICAgICAgdmFyIG5ld1ZhbHVlID0gdG9FbC52YWx1ZTtcbiAgICAgICAgaWYgKGZyb21FbC52YWx1ZSAhPT0gbmV3VmFsdWUpIHtcbiAgICAgICAgICAgIGZyb21FbC52YWx1ZSA9IG5ld1ZhbHVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGZyb21FbC5maXJzdENoaWxkKSB7XG4gICAgICAgICAgICBmcm9tRWwuZmlyc3RDaGlsZC5ub2RlVmFsdWUgPSBuZXdWYWx1ZTtcbiAgICAgICAgfVxuICAgIH1cbn07XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG4vKipcbiAqIFJldHVybnMgdHJ1ZSBpZiB0d28gbm9kZSdzIG5hbWVzIGFuZCBuYW1lc3BhY2UgVVJJcyBhcmUgdGhlIHNhbWUuXG4gKlxuICogQHBhcmFtIHtFbGVtZW50fSBhXG4gKiBAcGFyYW0ge0VsZW1lbnR9IGJcbiAqIEByZXR1cm4ge2Jvb2xlYW59XG4gKi9cbnZhciBjb21wYXJlTm9kZU5hbWVzID0gZnVuY3Rpb24oYSwgYikge1xuICAgIHJldHVybiBhLm5vZGVOYW1lID09PSBiLm5vZGVOYW1lICYmXG4gICAgICAgICAgIGEubmFtZXNwYWNlVVJJID09PSBiLm5hbWVzcGFjZVVSSTtcbn07XG5cbi8qKlxuICogQ3JlYXRlIGFuIGVsZW1lbnQsIG9wdGlvbmFsbHkgd2l0aCBhIGtub3duIG5hbWVzcGFjZSBVUkkuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgdGhlIGVsZW1lbnQgbmFtZSwgZS5nLiAnZGl2JyBvciAnc3ZnJ1xuICogQHBhcmFtIHtzdHJpbmd9IFtuYW1lc3BhY2VVUkldIHRoZSBlbGVtZW50J3MgbmFtZXNwYWNlIFVSSSwgaS5lLiB0aGUgdmFsdWUgb2ZcbiAqIGl0cyBgeG1sbnNgIGF0dHJpYnV0ZSBvciBpdHMgaW5mZXJyZWQgbmFtZXNwYWNlLlxuICpcbiAqIEByZXR1cm4ge0VsZW1lbnR9XG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnROUyhuYW1lLCBuYW1lc3BhY2VVUkkpIHtcbiAgICByZXR1cm4gIW5hbWVzcGFjZVVSSSB8fCBuYW1lc3BhY2VVUkkgPT09IFhIVE1MID9cbiAgICAgICAgZG9jdW1lbnQuY3JlYXRlRWxlbWVudChuYW1lKSA6XG4gICAgICAgIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhuYW1lc3BhY2VVUkksIG5hbWUpO1xufVxuXG4vKipcbiAqIExvb3Agb3ZlciBhbGwgb2YgdGhlIGF0dHJpYnV0ZXMgb24gdGhlIHRhcmdldCBub2RlIGFuZCBtYWtlIHN1cmUgdGhlIG9yaWdpbmFsXG4gKiBET00gbm9kZSBoYXMgdGhlIHNhbWUgYXR0cmlidXRlcy4gSWYgYW4gYXR0cmlidXRlIGZvdW5kIG9uIHRoZSBvcmlnaW5hbCBub2RlXG4gKiBpcyBub3Qgb24gdGhlIG5ldyBub2RlIHRoZW4gcmVtb3ZlIGl0IGZyb20gdGhlIG9yaWdpbmFsIG5vZGUuXG4gKlxuICogQHBhcmFtICB7RWxlbWVudH0gZnJvbU5vZGVcbiAqIEBwYXJhbSAge0VsZW1lbnR9IHRvTm9kZVxuICovXG5mdW5jdGlvbiBtb3JwaEF0dHJzKGZyb21Ob2RlLCB0b05vZGUpIHtcbiAgICB2YXIgYXR0cnMgPSB0b05vZGUuYXR0cmlidXRlcztcbiAgICB2YXIgaTtcbiAgICB2YXIgYXR0cjtcbiAgICB2YXIgYXR0ck5hbWU7XG4gICAgdmFyIGF0dHJOYW1lc3BhY2VVUkk7XG4gICAgdmFyIGF0dHJWYWx1ZTtcbiAgICB2YXIgZnJvbVZhbHVlO1xuXG4gICAgZm9yIChpID0gYXR0cnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgYXR0ciA9IGF0dHJzW2ldO1xuICAgICAgICBhdHRyTmFtZSA9IGF0dHIubmFtZTtcbiAgICAgICAgYXR0clZhbHVlID0gYXR0ci52YWx1ZTtcbiAgICAgICAgYXR0ck5hbWVzcGFjZVVSSSA9IGF0dHIubmFtZXNwYWNlVVJJO1xuXG4gICAgICAgIGlmIChhdHRyTmFtZXNwYWNlVVJJKSB7XG4gICAgICAgICAgICBhdHRyTmFtZSA9IGF0dHIubG9jYWxOYW1lIHx8IGF0dHJOYW1lO1xuICAgICAgICAgICAgZnJvbVZhbHVlID0gZnJvbU5vZGUuZ2V0QXR0cmlidXRlTlMoYXR0ck5hbWVzcGFjZVVSSSwgYXR0ck5hbWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZnJvbVZhbHVlID0gZnJvbU5vZGUuZ2V0QXR0cmlidXRlKGF0dHJOYW1lKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChmcm9tVmFsdWUgIT09IGF0dHJWYWx1ZSkge1xuICAgICAgICAgICAgaWYgKGF0dHJOYW1lc3BhY2VVUkkpIHtcbiAgICAgICAgICAgICAgICBmcm9tTm9kZS5zZXRBdHRyaWJ1dGVOUyhhdHRyTmFtZXNwYWNlVVJJLCBhdHRyTmFtZSwgYXR0clZhbHVlKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZnJvbU5vZGUuc2V0QXR0cmlidXRlKGF0dHJOYW1lLCBhdHRyVmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gUmVtb3ZlIGFueSBleHRyYSBhdHRyaWJ1dGVzIGZvdW5kIG9uIHRoZSBvcmlnaW5hbCBET00gZWxlbWVudCB0aGF0XG4gICAgLy8gd2VyZW4ndCBmb3VuZCBvbiB0aGUgdGFyZ2V0IGVsZW1lbnQuXG4gICAgYXR0cnMgPSBmcm9tTm9kZS5hdHRyaWJ1dGVzO1xuXG4gICAgZm9yIChpID0gYXR0cnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgYXR0ciA9IGF0dHJzW2ldO1xuICAgICAgICBpZiAoYXR0ci5zcGVjaWZpZWQgIT09IGZhbHNlKSB7XG4gICAgICAgICAgICBhdHRyTmFtZSA9IGF0dHIubmFtZTtcbiAgICAgICAgICAgIGF0dHJOYW1lc3BhY2VVUkkgPSBhdHRyLm5hbWVzcGFjZVVSSTtcblxuICAgICAgICAgICAgaWYgKCFoYXNBdHRyaWJ1dGVOUyh0b05vZGUsIGF0dHJOYW1lc3BhY2VVUkksIGF0dHJOYW1lc3BhY2VVUkkgPyBhdHRyTmFtZSA9IGF0dHIubG9jYWxOYW1lIHx8IGF0dHJOYW1lIDogYXR0ck5hbWUpKSB7XG4gICAgICAgICAgICAgICAgZnJvbU5vZGUucmVtb3ZlQXR0cmlidXRlTm9kZShhdHRyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cblxuLyoqXG4gKiBDb3BpZXMgdGhlIGNoaWxkcmVuIG9mIG9uZSBET00gZWxlbWVudCB0byBhbm90aGVyIERPTSBlbGVtZW50XG4gKi9cbmZ1bmN0aW9uIG1vdmVDaGlsZHJlbihmcm9tRWwsIHRvRWwpIHtcbiAgICB2YXIgY3VyQ2hpbGQgPSBmcm9tRWwuZmlyc3RDaGlsZDtcbiAgICB3aGlsZSAoY3VyQ2hpbGQpIHtcbiAgICAgICAgdmFyIG5leHRDaGlsZCA9IGN1ckNoaWxkLm5leHRTaWJsaW5nO1xuICAgICAgICB0b0VsLmFwcGVuZENoaWxkKGN1ckNoaWxkKTtcbiAgICAgICAgY3VyQ2hpbGQgPSBuZXh0Q2hpbGQ7XG4gICAgfVxuICAgIHJldHVybiB0b0VsO1xufVxuXG5mdW5jdGlvbiBkZWZhdWx0R2V0Tm9kZUtleShub2RlKSB7XG4gICAgcmV0dXJuIG5vZGUuaWQ7XG59XG5cbmZ1bmN0aW9uIG1vcnBoZG9tKGZyb21Ob2RlLCB0b05vZGUsIG9wdGlvbnMpIHtcbiAgICBpZiAoIW9wdGlvbnMpIHtcbiAgICAgICAgb3B0aW9ucyA9IHt9O1xuICAgIH1cblxuICAgIGlmICh0eXBlb2YgdG9Ob2RlID09PSAnc3RyaW5nJykge1xuICAgICAgICBpZiAoZnJvbU5vZGUubm9kZU5hbWUgPT09ICcjZG9jdW1lbnQnIHx8IGZyb21Ob2RlLm5vZGVOYW1lID09PSAnSFRNTCcpIHtcbiAgICAgICAgICAgIHZhciB0b05vZGVIdG1sID0gdG9Ob2RlO1xuICAgICAgICAgICAgdG9Ob2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaHRtbCcpO1xuICAgICAgICAgICAgdG9Ob2RlLmlubmVySFRNTCA9IHRvTm9kZUh0bWw7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0b05vZGUgPSB0b0VsZW1lbnQodG9Ob2RlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIFhYWCBvcHRpbWl6YXRpb246IGlmIHRoZSBub2RlcyBhcmUgZXF1YWwsIGRvbid0IG1vcnBoIHRoZW1cbiAgICAvKlxuICAgIGlmIChmcm9tTm9kZS5pc0VxdWFsTm9kZSh0b05vZGUpKSB7XG4gICAgICByZXR1cm4gZnJvbU5vZGU7XG4gICAgfVxuICAgICovXG5cbiAgICB2YXIgc2F2ZWRFbHMgPSB7fTsgLy8gVXNlZCB0byBzYXZlIG9mZiBET00gZWxlbWVudHMgd2l0aCBJRHNcbiAgICB2YXIgdW5tYXRjaGVkRWxzID0ge307XG4gICAgdmFyIGdldE5vZGVLZXkgPSBvcHRpb25zLmdldE5vZGVLZXkgfHwgZGVmYXVsdEdldE5vZGVLZXk7XG4gICAgdmFyIG9uQmVmb3JlTm9kZUFkZGVkID0gb3B0aW9ucy5vbkJlZm9yZU5vZGVBZGRlZCB8fCBub29wO1xuICAgIHZhciBvbk5vZGVBZGRlZCA9IG9wdGlvbnMub25Ob2RlQWRkZWQgfHwgbm9vcDtcbiAgICB2YXIgb25CZWZvcmVFbFVwZGF0ZWQgPSBvcHRpb25zLm9uQmVmb3JlRWxVcGRhdGVkIHx8IG9wdGlvbnMub25CZWZvcmVNb3JwaEVsIHx8IG5vb3A7XG4gICAgdmFyIG9uRWxVcGRhdGVkID0gb3B0aW9ucy5vbkVsVXBkYXRlZCB8fCBub29wO1xuICAgIHZhciBvbkJlZm9yZU5vZGVEaXNjYXJkZWQgPSBvcHRpb25zLm9uQmVmb3JlTm9kZURpc2NhcmRlZCB8fCBub29wO1xuICAgIHZhciBvbk5vZGVEaXNjYXJkZWQgPSBvcHRpb25zLm9uTm9kZURpc2NhcmRlZCB8fCBub29wO1xuICAgIHZhciBvbkJlZm9yZUVsQ2hpbGRyZW5VcGRhdGVkID0gb3B0aW9ucy5vbkJlZm9yZUVsQ2hpbGRyZW5VcGRhdGVkIHx8IG9wdGlvbnMub25CZWZvcmVNb3JwaEVsQ2hpbGRyZW4gfHwgbm9vcDtcbiAgICB2YXIgY2hpbGRyZW5Pbmx5ID0gb3B0aW9ucy5jaGlsZHJlbk9ubHkgPT09IHRydWU7XG4gICAgdmFyIG1vdmVkRWxzID0gW107XG5cbiAgICBmdW5jdGlvbiByZW1vdmVOb2RlSGVscGVyKG5vZGUsIG5lc3RlZEluU2F2ZWRFbCkge1xuICAgICAgICB2YXIgaWQgPSBnZXROb2RlS2V5KG5vZGUpO1xuICAgICAgICAvLyBJZiB0aGUgbm9kZSBoYXMgYW4gSUQgdGhlbiBzYXZlIGl0IG9mZiBzaW5jZSB3ZSB3aWxsIHdhbnRcbiAgICAgICAgLy8gdG8gcmV1c2UgaXQgaW4gY2FzZSB0aGUgdGFyZ2V0IERPTSB0cmVlIGhhcyBhIERPTSBlbGVtZW50XG4gICAgICAgIC8vIHdpdGggdGhlIHNhbWUgSURcbiAgICAgICAgaWYgKGlkKSB7XG4gICAgICAgICAgICBzYXZlZEVsc1tpZF0gPSBub2RlO1xuICAgICAgICB9IGVsc2UgaWYgKCFuZXN0ZWRJblNhdmVkRWwpIHtcbiAgICAgICAgICAgIC8vIElmIHdlIGFyZSBub3QgbmVzdGVkIGluIGEgc2F2ZWQgZWxlbWVudCB0aGVuIHdlIGtub3cgdGhhdCB0aGlzIG5vZGUgaGFzIGJlZW5cbiAgICAgICAgICAgIC8vIGNvbXBsZXRlbHkgZGlzY2FyZGVkIGFuZCB3aWxsIG5vdCBleGlzdCBpbiB0aGUgZmluYWwgRE9NLlxuICAgICAgICAgICAgb25Ob2RlRGlzY2FyZGVkKG5vZGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG5vZGUubm9kZVR5cGUgPT09IEVMRU1FTlRfTk9ERSkge1xuICAgICAgICAgICAgdmFyIGN1ckNoaWxkID0gbm9kZS5maXJzdENoaWxkO1xuICAgICAgICAgICAgd2hpbGUgKGN1ckNoaWxkKSB7XG4gICAgICAgICAgICAgICAgcmVtb3ZlTm9kZUhlbHBlcihjdXJDaGlsZCwgbmVzdGVkSW5TYXZlZEVsIHx8IGlkKTtcbiAgICAgICAgICAgICAgICBjdXJDaGlsZCA9IGN1ckNoaWxkLm5leHRTaWJsaW5nO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gd2Fsa0Rpc2NhcmRlZENoaWxkTm9kZXMobm9kZSkge1xuICAgICAgICBpZiAobm9kZS5ub2RlVHlwZSA9PT0gRUxFTUVOVF9OT0RFKSB7XG4gICAgICAgICAgICB2YXIgY3VyQ2hpbGQgPSBub2RlLmZpcnN0Q2hpbGQ7XG4gICAgICAgICAgICB3aGlsZSAoY3VyQ2hpbGQpIHtcblxuXG4gICAgICAgICAgICAgICAgaWYgKCFnZXROb2RlS2V5KGN1ckNoaWxkKSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBXZSBvbmx5IHdhbnQgdG8gaGFuZGxlIG5vZGVzIHRoYXQgZG9uJ3QgaGF2ZSBhbiBJRCB0byBhdm9pZCBkb3VibGVcbiAgICAgICAgICAgICAgICAgICAgLy8gd2Fsa2luZyB0aGUgc2FtZSBzYXZlZCBlbGVtZW50LlxuXG4gICAgICAgICAgICAgICAgICAgIG9uTm9kZURpc2NhcmRlZChjdXJDaGlsZCk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gV2FsayByZWN1cnNpdmVseVxuICAgICAgICAgICAgICAgICAgICB3YWxrRGlzY2FyZGVkQ2hpbGROb2RlcyhjdXJDaGlsZCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgY3VyQ2hpbGQgPSBjdXJDaGlsZC5uZXh0U2libGluZztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlbW92ZU5vZGUobm9kZSwgcGFyZW50Tm9kZSwgYWxyZWFkeVZpc2l0ZWQpIHtcbiAgICAgICAgaWYgKG9uQmVmb3JlTm9kZURpc2NhcmRlZChub2RlKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHBhcmVudE5vZGUucmVtb3ZlQ2hpbGQobm9kZSk7XG4gICAgICAgIGlmIChhbHJlYWR5VmlzaXRlZCkge1xuICAgICAgICAgICAgaWYgKCFnZXROb2RlS2V5KG5vZGUpKSB7XG4gICAgICAgICAgICAgICAgb25Ob2RlRGlzY2FyZGVkKG5vZGUpO1xuICAgICAgICAgICAgICAgIHdhbGtEaXNjYXJkZWRDaGlsZE5vZGVzKG5vZGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVtb3ZlTm9kZUhlbHBlcihub2RlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG1vcnBoRWwoZnJvbUVsLCB0b0VsLCBhbHJlYWR5VmlzaXRlZCwgY2hpbGRyZW5Pbmx5KSB7XG4gICAgICAgIHZhciB0b0VsS2V5ID0gZ2V0Tm9kZUtleSh0b0VsKTtcbiAgICAgICAgaWYgKHRvRWxLZXkpIHtcbiAgICAgICAgICAgIC8vIElmIGFuIGVsZW1lbnQgd2l0aCBhbiBJRCBpcyBiZWluZyBtb3JwaGVkIHRoZW4gaXQgaXMgd2lsbCBiZSBpbiB0aGUgZmluYWxcbiAgICAgICAgICAgIC8vIERPTSBzbyBjbGVhciBpdCBvdXQgb2YgdGhlIHNhdmVkIGVsZW1lbnRzIGNvbGxlY3Rpb25cbiAgICAgICAgICAgIGRlbGV0ZSBzYXZlZEVsc1t0b0VsS2V5XTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghY2hpbGRyZW5Pbmx5KSB7XG4gICAgICAgICAgICBpZiAob25CZWZvcmVFbFVwZGF0ZWQoZnJvbUVsLCB0b0VsKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIG1vcnBoQXR0cnMoZnJvbUVsLCB0b0VsKTtcbiAgICAgICAgICAgIG9uRWxVcGRhdGVkKGZyb21FbCk7XG5cbiAgICAgICAgICAgIGlmIChvbkJlZm9yZUVsQ2hpbGRyZW5VcGRhdGVkKGZyb21FbCwgdG9FbCkgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGZyb21FbC5ub2RlTmFtZSAhPT0gJ1RFWFRBUkVBJykge1xuICAgICAgICAgICAgdmFyIGN1clRvTm9kZUNoaWxkID0gdG9FbC5maXJzdENoaWxkO1xuICAgICAgICAgICAgdmFyIGN1ckZyb21Ob2RlQ2hpbGQgPSBmcm9tRWwuZmlyc3RDaGlsZDtcbiAgICAgICAgICAgIHZhciBjdXJUb05vZGVJZDtcblxuICAgICAgICAgICAgdmFyIGZyb21OZXh0U2libGluZztcbiAgICAgICAgICAgIHZhciB0b05leHRTaWJsaW5nO1xuICAgICAgICAgICAgdmFyIHNhdmVkRWw7XG4gICAgICAgICAgICB2YXIgdW5tYXRjaGVkRWw7XG5cbiAgICAgICAgICAgIG91dGVyOiB3aGlsZSAoY3VyVG9Ob2RlQ2hpbGQpIHtcbiAgICAgICAgICAgICAgICB0b05leHRTaWJsaW5nID0gY3VyVG9Ob2RlQ2hpbGQubmV4dFNpYmxpbmc7XG4gICAgICAgICAgICAgICAgY3VyVG9Ob2RlSWQgPSBnZXROb2RlS2V5KGN1clRvTm9kZUNoaWxkKTtcblxuICAgICAgICAgICAgICAgIHdoaWxlIChjdXJGcm9tTm9kZUNoaWxkKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBjdXJGcm9tTm9kZUlkID0gZ2V0Tm9kZUtleShjdXJGcm9tTm9kZUNoaWxkKTtcbiAgICAgICAgICAgICAgICAgICAgZnJvbU5leHRTaWJsaW5nID0gY3VyRnJvbU5vZGVDaGlsZC5uZXh0U2libGluZztcblxuICAgICAgICAgICAgICAgICAgICBpZiAoIWFscmVhZHlWaXNpdGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY3VyRnJvbU5vZGVJZCAmJiAodW5tYXRjaGVkRWwgPSB1bm1hdGNoZWRFbHNbY3VyRnJvbU5vZGVJZF0pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdW5tYXRjaGVkRWwucGFyZW50Tm9kZS5yZXBsYWNlQ2hpbGQoY3VyRnJvbU5vZGVDaGlsZCwgdW5tYXRjaGVkRWwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vcnBoRWwoY3VyRnJvbU5vZGVDaGlsZCwgdW5tYXRjaGVkRWwsIGFscmVhZHlWaXNpdGVkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJGcm9tTm9kZUNoaWxkID0gZnJvbU5leHRTaWJsaW5nO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIGN1ckZyb21Ob2RlVHlwZSA9IGN1ckZyb21Ob2RlQ2hpbGQubm9kZVR5cGU7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGN1ckZyb21Ob2RlVHlwZSA9PT0gY3VyVG9Ob2RlQ2hpbGQubm9kZVR5cGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpc0NvbXBhdGlibGUgPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gQm90aCBub2RlcyBiZWluZyBjb21wYXJlZCBhcmUgRWxlbWVudCBub2Rlc1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGN1ckZyb21Ob2RlVHlwZSA9PT0gRUxFTUVOVF9OT0RFKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvbXBhcmVOb2RlTmFtZXMoY3VyRnJvbU5vZGVDaGlsZCwgY3VyVG9Ob2RlQ2hpbGQpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFdlIGhhdmUgY29tcGF0aWJsZSBET00gZWxlbWVudHNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGN1ckZyb21Ob2RlSWQgfHwgY3VyVG9Ob2RlSWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIElmIGVpdGhlciBET00gZWxlbWVudCBoYXMgYW4gSUQgdGhlbiB3ZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gaGFuZGxlIHRob3NlIGRpZmZlcmVudGx5IHNpbmNlIHdlIHdhbnQgdG9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIG1hdGNoIHVwIGJ5IElEXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY3VyVG9Ob2RlSWQgPT09IGN1ckZyb21Ob2RlSWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc0NvbXBhdGlibGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNDb21wYXRpYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpc0NvbXBhdGlibGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gV2UgZm91bmQgY29tcGF0aWJsZSBET00gZWxlbWVudHMgc28gdHJhbnNmb3JtXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRoZSBjdXJyZW50IFwiZnJvbVwiIG5vZGUgdG8gbWF0Y2ggdGhlIGN1cnJlbnRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdGFyZ2V0IERPTSBub2RlLlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb3JwaEVsKGN1ckZyb21Ob2RlQ2hpbGQsIGN1clRvTm9kZUNoaWxkLCBhbHJlYWR5VmlzaXRlZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gQm90aCBub2RlcyBiZWluZyBjb21wYXJlZCBhcmUgVGV4dCBvciBDb21tZW50IG5vZGVzXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoY3VyRnJvbU5vZGVUeXBlID09PSBURVhUX05PREUgfHwgY3VyRnJvbU5vZGVUeXBlID09IENPTU1FTlRfTk9ERSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzQ29tcGF0aWJsZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gU2ltcGx5IHVwZGF0ZSBub2RlVmFsdWUgb24gdGhlIG9yaWdpbmFsIG5vZGUgdG9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBjaGFuZ2UgdGhlIHRleHQgdmFsdWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJGcm9tTm9kZUNoaWxkLm5vZGVWYWx1ZSA9IGN1clRvTm9kZUNoaWxkLm5vZGVWYWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlzQ29tcGF0aWJsZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1clRvTm9kZUNoaWxkID0gdG9OZXh0U2libGluZztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJGcm9tTm9kZUNoaWxkID0gZnJvbU5leHRTaWJsaW5nO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlIG91dGVyO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gTm8gY29tcGF0aWJsZSBtYXRjaCBzbyByZW1vdmUgdGhlIG9sZCBub2RlIGZyb20gdGhlIERPTVxuICAgICAgICAgICAgICAgICAgICAvLyBhbmQgY29udGludWUgdHJ5aW5nIHRvIGZpbmQgYSBtYXRjaCBpbiB0aGUgb3JpZ2luYWwgRE9NXG4gICAgICAgICAgICAgICAgICAgIHJlbW92ZU5vZGUoY3VyRnJvbU5vZGVDaGlsZCwgZnJvbUVsLCBhbHJlYWR5VmlzaXRlZCk7XG4gICAgICAgICAgICAgICAgICAgIGN1ckZyb21Ob2RlQ2hpbGQgPSBmcm9tTmV4dFNpYmxpbmc7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKGN1clRvTm9kZUlkKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICgoc2F2ZWRFbCA9IHNhdmVkRWxzW2N1clRvTm9kZUlkXSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vcnBoRWwoc2F2ZWRFbCwgY3VyVG9Ob2RlQ2hpbGQsIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gV2Ugd2FudCB0byBhcHBlbmQgdGhlIHNhdmVkIGVsZW1lbnQgaW5zdGVhZFxuICAgICAgICAgICAgICAgICAgICAgICAgY3VyVG9Ob2RlQ2hpbGQgPSBzYXZlZEVsO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gVGhlIGN1cnJlbnQgRE9NIGVsZW1lbnQgaW4gdGhlIHRhcmdldCB0cmVlIGhhcyBhbiBJRFxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gYnV0IHdlIGRpZCBub3QgZmluZCBhIG1hdGNoIGluIGFueSBvZiB0aGVcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvcnJlc3BvbmRpbmcgc2libGluZ3MuIFdlIGp1c3QgcHV0IHRoZSB0YXJnZXRcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGVsZW1lbnQgaW4gdGhlIG9sZCBET00gdHJlZSBidXQgaWYgd2UgbGF0ZXIgZmluZCBhblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gZWxlbWVudCBpbiB0aGUgb2xkIERPTSB0cmVlIHRoYXQgaGFzIGEgbWF0Y2hpbmcgSURcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRoZW4gd2Ugd2lsbCByZXBsYWNlIHRoZSB0YXJnZXQgZWxlbWVudCB3aXRoIHRoZVxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29ycmVzcG9uZGluZyBvbGQgZWxlbWVudCBhbmQgbW9ycGggdGhlIG9sZCBlbGVtZW50XG4gICAgICAgICAgICAgICAgICAgICAgICB1bm1hdGNoZWRFbHNbY3VyVG9Ob2RlSWRdID0gY3VyVG9Ob2RlQ2hpbGQ7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBJZiB3ZSBnb3QgdGhpcyBmYXIgdGhlbiB3ZSBkaWQgbm90IGZpbmQgYSBjYW5kaWRhdGUgbWF0Y2ggZm9yXG4gICAgICAgICAgICAgICAgLy8gb3VyIFwidG8gbm9kZVwiIGFuZCB3ZSBleGhhdXN0ZWQgYWxsIG9mIHRoZSBjaGlsZHJlbiBcImZyb21cIlxuICAgICAgICAgICAgICAgIC8vIG5vZGVzLiBUaGVyZWZvcmUsIHdlIHdpbGwganVzdCBhcHBlbmQgdGhlIGN1cnJlbnQgXCJ0byBub2RlXCJcbiAgICAgICAgICAgICAgICAvLyB0byB0aGUgZW5kXG4gICAgICAgICAgICAgICAgaWYgKG9uQmVmb3JlTm9kZUFkZGVkKGN1clRvTm9kZUNoaWxkKSAhPT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgZnJvbUVsLmFwcGVuZENoaWxkKGN1clRvTm9kZUNoaWxkKTtcbiAgICAgICAgICAgICAgICAgICAgb25Ob2RlQWRkZWQoY3VyVG9Ob2RlQ2hpbGQpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChjdXJUb05vZGVDaGlsZC5ub2RlVHlwZSA9PT0gRUxFTUVOVF9OT0RFICYmXG4gICAgICAgICAgICAgICAgICAgIChjdXJUb05vZGVJZCB8fCBjdXJUb05vZGVDaGlsZC5maXJzdENoaWxkKSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBUaGUgZWxlbWVudCB0aGF0IHdhcyBqdXN0IGFkZGVkIHRvIHRoZSBvcmlnaW5hbCBET00gbWF5XG4gICAgICAgICAgICAgICAgICAgIC8vIGhhdmUgc29tZSBuZXN0ZWQgZWxlbWVudHMgd2l0aCBhIGtleS9JRCB0aGF0IG5lZWRzIHRvIGJlXG4gICAgICAgICAgICAgICAgICAgIC8vIG1hdGNoZWQgdXAgd2l0aCBvdGhlciBlbGVtZW50cy4gV2UnbGwgYWRkIHRoZSBlbGVtZW50IHRvXG4gICAgICAgICAgICAgICAgICAgIC8vIGEgbGlzdCBzbyB0aGF0IHdlIGNhbiBsYXRlciBwcm9jZXNzIHRoZSBuZXN0ZWQgZWxlbWVudHNcbiAgICAgICAgICAgICAgICAgICAgLy8gaWYgdGhlcmUgYXJlIGFueSB1bm1hdGNoZWQga2V5ZWQgZWxlbWVudHMgdGhhdCB3ZXJlXG4gICAgICAgICAgICAgICAgICAgIC8vIGRpc2NhcmRlZFxuICAgICAgICAgICAgICAgICAgICBtb3ZlZEVscy5wdXNoKGN1clRvTm9kZUNoaWxkKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBjdXJUb05vZGVDaGlsZCA9IHRvTmV4dFNpYmxpbmc7XG4gICAgICAgICAgICAgICAgY3VyRnJvbU5vZGVDaGlsZCA9IGZyb21OZXh0U2libGluZztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gV2UgaGF2ZSBwcm9jZXNzZWQgYWxsIG9mIHRoZSBcInRvIG5vZGVzXCIuIElmIGN1ckZyb21Ob2RlQ2hpbGQgaXNcbiAgICAgICAgICAgIC8vIG5vbi1udWxsIHRoZW4gd2Ugc3RpbGwgaGF2ZSBzb21lIGZyb20gbm9kZXMgbGVmdCBvdmVyIHRoYXQgbmVlZFxuICAgICAgICAgICAgLy8gdG8gYmUgcmVtb3ZlZFxuICAgICAgICAgICAgd2hpbGUgKGN1ckZyb21Ob2RlQ2hpbGQpIHtcbiAgICAgICAgICAgICAgICBmcm9tTmV4dFNpYmxpbmcgPSBjdXJGcm9tTm9kZUNoaWxkLm5leHRTaWJsaW5nO1xuICAgICAgICAgICAgICAgIHJlbW92ZU5vZGUoY3VyRnJvbU5vZGVDaGlsZCwgZnJvbUVsLCBhbHJlYWR5VmlzaXRlZCk7XG4gICAgICAgICAgICAgICAgY3VyRnJvbU5vZGVDaGlsZCA9IGZyb21OZXh0U2libGluZztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBzcGVjaWFsRWxIYW5kbGVyID0gc3BlY2lhbEVsSGFuZGxlcnNbZnJvbUVsLm5vZGVOYW1lXTtcbiAgICAgICAgaWYgKHNwZWNpYWxFbEhhbmRsZXIpIHtcbiAgICAgICAgICAgIHNwZWNpYWxFbEhhbmRsZXIoZnJvbUVsLCB0b0VsKTtcbiAgICAgICAgfVxuICAgIH0gLy8gRU5EOiBtb3JwaEVsKC4uLilcblxuICAgIHZhciBtb3JwaGVkTm9kZSA9IGZyb21Ob2RlO1xuICAgIHZhciBtb3JwaGVkTm9kZVR5cGUgPSBtb3JwaGVkTm9kZS5ub2RlVHlwZTtcbiAgICB2YXIgdG9Ob2RlVHlwZSA9IHRvTm9kZS5ub2RlVHlwZTtcblxuICAgIGlmICghY2hpbGRyZW5Pbmx5KSB7XG4gICAgICAgIC8vIEhhbmRsZSB0aGUgY2FzZSB3aGVyZSB3ZSBhcmUgZ2l2ZW4gdHdvIERPTSBub2RlcyB0aGF0IGFyZSBub3RcbiAgICAgICAgLy8gY29tcGF0aWJsZSAoZS5nLiA8ZGl2PiAtLT4gPHNwYW4+IG9yIDxkaXY+IC0tPiBURVhUKVxuICAgICAgICBpZiAobW9ycGhlZE5vZGVUeXBlID09PSBFTEVNRU5UX05PREUpIHtcbiAgICAgICAgICAgIGlmICh0b05vZGVUeXBlID09PSBFTEVNRU5UX05PREUpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWNvbXBhcmVOb2RlTmFtZXMoZnJvbU5vZGUsIHRvTm9kZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgb25Ob2RlRGlzY2FyZGVkKGZyb21Ob2RlKTtcbiAgICAgICAgICAgICAgICAgICAgbW9ycGhlZE5vZGUgPSBtb3ZlQ2hpbGRyZW4oZnJvbU5vZGUsIGNyZWF0ZUVsZW1lbnROUyh0b05vZGUubm9kZU5hbWUsIHRvTm9kZS5uYW1lc3BhY2VVUkkpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIEdvaW5nIGZyb20gYW4gZWxlbWVudCBub2RlIHRvIGEgdGV4dCBub2RlXG4gICAgICAgICAgICAgICAgbW9ycGhlZE5vZGUgPSB0b05vZGU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAobW9ycGhlZE5vZGVUeXBlID09PSBURVhUX05PREUgfHwgbW9ycGhlZE5vZGVUeXBlID09PSBDT01NRU5UX05PREUpIHsgLy8gVGV4dCBvciBjb21tZW50IG5vZGVcbiAgICAgICAgICAgIGlmICh0b05vZGVUeXBlID09PSBtb3JwaGVkTm9kZVR5cGUpIHtcbiAgICAgICAgICAgICAgICBtb3JwaGVkTm9kZS5ub2RlVmFsdWUgPSB0b05vZGUubm9kZVZhbHVlO1xuICAgICAgICAgICAgICAgIHJldHVybiBtb3JwaGVkTm9kZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gVGV4dCBub2RlIHRvIHNvbWV0aGluZyBlbHNlXG4gICAgICAgICAgICAgICAgbW9ycGhlZE5vZGUgPSB0b05vZGU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAobW9ycGhlZE5vZGUgPT09IHRvTm9kZSkge1xuICAgICAgICAvLyBUaGUgXCJ0byBub2RlXCIgd2FzIG5vdCBjb21wYXRpYmxlIHdpdGggdGhlIFwiZnJvbSBub2RlXCIgc28gd2UgaGFkIHRvXG4gICAgICAgIC8vIHRvc3Mgb3V0IHRoZSBcImZyb20gbm9kZVwiIGFuZCB1c2UgdGhlIFwidG8gbm9kZVwiXG4gICAgICAgIG9uTm9kZURpc2NhcmRlZChmcm9tTm9kZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgbW9ycGhFbChtb3JwaGVkTm9kZSwgdG9Ob2RlLCBmYWxzZSwgY2hpbGRyZW5Pbmx5KTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogV2hhdCB3ZSB3aWxsIGRvIGhlcmUgaXMgd2FsayB0aGUgdHJlZSBmb3IgdGhlIERPTSBlbGVtZW50IHRoYXQgd2FzXG4gICAgICAgICAqIG1vdmVkIGZyb20gdGhlIHRhcmdldCBET00gdHJlZSB0byB0aGUgb3JpZ2luYWwgRE9NIHRyZWUgYW5kIHdlIHdpbGxcbiAgICAgICAgICogbG9vayBmb3Iga2V5ZWQgZWxlbWVudHMgdGhhdCBjb3VsZCBiZSBtYXRjaGVkIHRvIGtleWVkIGVsZW1lbnRzIHRoYXRcbiAgICAgICAgICogd2VyZSBlYXJsaWVyIGRpc2NhcmRlZC4gIElmIHdlIGZpbmQgYSBtYXRjaCB0aGVuIHdlIHdpbGwgbW92ZSB0aGVcbiAgICAgICAgICogc2F2ZWQgZWxlbWVudCBpbnRvIHRoZSBmaW5hbCBET00gdHJlZS5cbiAgICAgICAgICovXG4gICAgICAgIHZhciBoYW5kbGVNb3ZlZEVsID0gZnVuY3Rpb24oZWwpIHtcbiAgICAgICAgICAgIHZhciBjdXJDaGlsZCA9IGVsLmZpcnN0Q2hpbGQ7XG4gICAgICAgICAgICB3aGlsZSAoY3VyQ2hpbGQpIHtcbiAgICAgICAgICAgICAgICB2YXIgbmV4dFNpYmxpbmcgPSBjdXJDaGlsZC5uZXh0U2libGluZztcblxuICAgICAgICAgICAgICAgIHZhciBrZXkgPSBnZXROb2RlS2V5KGN1ckNoaWxkKTtcbiAgICAgICAgICAgICAgICBpZiAoa2V5KSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBzYXZlZEVsID0gc2F2ZWRFbHNba2V5XTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNhdmVkRWwgJiYgY29tcGFyZU5vZGVOYW1lcyhjdXJDaGlsZCwgc2F2ZWRFbCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1ckNoaWxkLnBhcmVudE5vZGUucmVwbGFjZUNoaWxkKHNhdmVkRWwsIGN1ckNoaWxkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRydWU6IGFscmVhZHkgdmlzaXRlZCB0aGUgc2F2ZWQgZWwgdHJlZVxuICAgICAgICAgICAgICAgICAgICAgICAgbW9ycGhFbChzYXZlZEVsLCBjdXJDaGlsZCwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJDaGlsZCA9IG5leHRTaWJsaW5nO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVtcHR5KHNhdmVkRWxzKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKGN1ckNoaWxkLm5vZGVUeXBlID09PSBFTEVNRU5UX05PREUpIHtcbiAgICAgICAgICAgICAgICAgICAgaGFuZGxlTW92ZWRFbChjdXJDaGlsZCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgY3VyQ2hpbGQgPSBuZXh0U2libGluZztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICAvLyBUaGUgbG9vcCBiZWxvdyBpcyB1c2VkIHRvIHBvc3NpYmx5IG1hdGNoIHVwIGFueSBkaXNjYXJkZWRcbiAgICAgICAgLy8gZWxlbWVudHMgaW4gdGhlIG9yaWdpbmFsIERPTSB0cmVlIHdpdGggZWxlbWVuZXRzIGZyb20gdGhlXG4gICAgICAgIC8vIHRhcmdldCB0cmVlIHRoYXQgd2VyZSBtb3ZlZCBvdmVyIHdpdGhvdXQgdmlzaXRpbmcgdGhlaXJcbiAgICAgICAgLy8gY2hpbGRyZW5cbiAgICAgICAgaWYgKCFlbXB0eShzYXZlZEVscykpIHtcbiAgICAgICAgICAgIGhhbmRsZU1vdmVkRWxzTG9vcDpcbiAgICAgICAgICAgIHdoaWxlIChtb3ZlZEVscy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICB2YXIgbW92ZWRFbHNUZW1wID0gbW92ZWRFbHM7XG4gICAgICAgICAgICAgICAgbW92ZWRFbHMgPSBbXTtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpPTA7IGk8bW92ZWRFbHNUZW1wLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChoYW5kbGVNb3ZlZEVsKG1vdmVkRWxzVGVtcFtpXSkgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBUaGVyZSBhcmUgbm8gbW9yZSB1bm1hdGNoZWQgZWxlbWVudHMgc28gY29tcGxldGVseSBlbmRcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRoZSBsb29wXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhayBoYW5kbGVNb3ZlZEVsc0xvb3A7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBGaXJlIHRoZSBcIm9uTm9kZURpc2NhcmRlZFwiIGV2ZW50IGZvciBhbnkgc2F2ZWQgZWxlbWVudHNcbiAgICAgICAgLy8gdGhhdCBuZXZlciBmb3VuZCBhIG5ldyBob21lIGluIHRoZSBtb3JwaGVkIERPTVxuICAgICAgICBmb3IgKHZhciBzYXZlZEVsSWQgaW4gc2F2ZWRFbHMpIHtcbiAgICAgICAgICAgIGlmIChzYXZlZEVscy5oYXNPd25Qcm9wZXJ0eShzYXZlZEVsSWQpKSB7XG4gICAgICAgICAgICAgICAgdmFyIHNhdmVkRWwgPSBzYXZlZEVsc1tzYXZlZEVsSWRdO1xuICAgICAgICAgICAgICAgIG9uTm9kZURpc2NhcmRlZChzYXZlZEVsKTtcbiAgICAgICAgICAgICAgICB3YWxrRGlzY2FyZGVkQ2hpbGROb2RlcyhzYXZlZEVsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlmICghY2hpbGRyZW5Pbmx5ICYmIG1vcnBoZWROb2RlICE9PSBmcm9tTm9kZSAmJiBmcm9tTm9kZS5wYXJlbnROb2RlKSB7XG4gICAgICAgIC8vIElmIHdlIGhhZCB0byBzd2FwIG91dCB0aGUgZnJvbSBub2RlIHdpdGggYSBuZXcgbm9kZSBiZWNhdXNlIHRoZSBvbGRcbiAgICAgICAgLy8gbm9kZSB3YXMgbm90IGNvbXBhdGlibGUgd2l0aCB0aGUgdGFyZ2V0IG5vZGUgdGhlbiB3ZSBuZWVkIHRvXG4gICAgICAgIC8vIHJlcGxhY2UgdGhlIG9sZCBET00gbm9kZSBpbiB0aGUgb3JpZ2luYWwgRE9NIHRyZWUuIFRoaXMgaXMgb25seVxuICAgICAgICAvLyBwb3NzaWJsZSBpZiB0aGUgb3JpZ2luYWwgRE9NIG5vZGUgd2FzIHBhcnQgb2YgYSBET00gdHJlZSB3aGljaFxuICAgICAgICAvLyB3ZSBrbm93IGlzIHRoZSBjYXNlIGlmIGl0IGhhcyBhIHBhcmVudCBub2RlLlxuICAgICAgICBmcm9tTm9kZS5wYXJlbnROb2RlLnJlcGxhY2VDaGlsZChtb3JwaGVkTm9kZSwgZnJvbU5vZGUpO1xuICAgIH1cblxuICAgIHJldHVybiBtb3JwaGVkTm9kZTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBtb3JwaGRvbTtcbiIsIm1vZHVsZS5leHBvcnRzID0gW1xuICAvLyBhdHRyaWJ1dGUgZXZlbnRzIChjYW4gYmUgc2V0IHdpdGggYXR0cmlidXRlcylcbiAgJ29uY2xpY2snLFxuICAnb25kYmxjbGljaycsXG4gICdvbm1vdXNlZG93bicsXG4gICdvbm1vdXNldXAnLFxuICAnb25tb3VzZW92ZXInLFxuICAnb25tb3VzZW1vdmUnLFxuICAnb25tb3VzZW91dCcsXG4gICdvbmRyYWdzdGFydCcsXG4gICdvbmRyYWcnLFxuICAnb25kcmFnZW50ZXInLFxuICAnb25kcmFnbGVhdmUnLFxuICAnb25kcmFnb3ZlcicsXG4gICdvbmRyb3AnLFxuICAnb25kcmFnZW5kJyxcbiAgJ29ua2V5ZG93bicsXG4gICdvbmtleXByZXNzJyxcbiAgJ29ua2V5dXAnLFxuICAnb251bmxvYWQnLFxuICAnb25hYm9ydCcsXG4gICdvbmVycm9yJyxcbiAgJ29ucmVzaXplJyxcbiAgJ29uc2Nyb2xsJyxcbiAgJ29uc2VsZWN0JyxcbiAgJ29uY2hhbmdlJyxcbiAgJ29uc3VibWl0JyxcbiAgJ29ucmVzZXQnLFxuICAnb25mb2N1cycsXG4gICdvbmJsdXInLFxuICAnb25pbnB1dCcsXG4gIC8vIG90aGVyIGNvbW1vbiBldmVudHNcbiAgJ29uY29udGV4dG1lbnUnLFxuICAnb25mb2N1c2luJyxcbiAgJ29uZm9jdXNvdXQnXG5dXG4iLCIvKlxyXG4gKiBOYXR1cmFsIFNvcnQgYWxnb3JpdGhtIGZvciBKYXZhc2NyaXB0IC0gVmVyc2lvbiAwLjcgLSBSZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZVxyXG4gKiBBdXRob3I6IEppbSBQYWxtZXIgKGJhc2VkIG9uIGNodW5raW5nIGlkZWEgZnJvbSBEYXZlIEtvZWxsZSlcclxuICovXHJcbi8qanNoaW50IHVudXNlZDpmYWxzZSAqL1xyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIG5hdHVyYWxTb3J0IChhLCBiKSB7XHJcblx0XCJ1c2Ugc3RyaWN0XCI7XHJcblx0dmFyIHJlID0gLyheKFsrXFwtXT8oPzowfFsxLTldXFxkKikoPzpcXC5cXGQqKT8oPzpbZUVdWytcXC1dP1xcZCspPyk/JHxeMHhbMC05YS1mXSskfFxcZCspL2dpLFxyXG5cdFx0c3JlID0gLyheWyBdKnxbIF0qJCkvZyxcclxuXHRcdGRyZSA9IC8oXihbXFx3IF0rLD9bXFx3IF0rKT9bXFx3IF0rLD9bXFx3IF0rXFxkKzpcXGQrKDpcXGQrKT9bXFx3IF0/fF5cXGR7MSw0fVtcXC9cXC1dXFxkezEsNH1bXFwvXFwtXVxcZHsxLDR9fF5cXHcrLCBcXHcrIFxcZCssIFxcZHs0fSkvLFxyXG5cdFx0aHJlID0gL14weFswLTlhLWZdKyQvaSxcclxuXHRcdG9yZSA9IC9eMC8sXHJcblx0XHRpID0gZnVuY3Rpb24ocykgeyByZXR1cm4gbmF0dXJhbFNvcnQuaW5zZW5zaXRpdmUgJiYgKCcnICsgcykudG9Mb3dlckNhc2UoKSB8fCAnJyArIHM7IH0sXHJcblx0XHQvLyBjb252ZXJ0IGFsbCB0byBzdHJpbmdzIHN0cmlwIHdoaXRlc3BhY2VcclxuXHRcdHggPSBpKGEpLnJlcGxhY2Uoc3JlLCAnJykgfHwgJycsXHJcblx0XHR5ID0gaShiKS5yZXBsYWNlKHNyZSwgJycpIHx8ICcnLFxyXG5cdFx0Ly8gY2h1bmsvdG9rZW5pemVcclxuXHRcdHhOID0geC5yZXBsYWNlKHJlLCAnXFwwJDFcXDAnKS5yZXBsYWNlKC9cXDAkLywnJykucmVwbGFjZSgvXlxcMC8sJycpLnNwbGl0KCdcXDAnKSxcclxuXHRcdHlOID0geS5yZXBsYWNlKHJlLCAnXFwwJDFcXDAnKS5yZXBsYWNlKC9cXDAkLywnJykucmVwbGFjZSgvXlxcMC8sJycpLnNwbGl0KCdcXDAnKSxcclxuXHRcdC8vIG51bWVyaWMsIGhleCBvciBkYXRlIGRldGVjdGlvblxyXG5cdFx0eEQgPSBwYXJzZUludCh4Lm1hdGNoKGhyZSksIDE2KSB8fCAoeE4ubGVuZ3RoICE9PSAxICYmIHgubWF0Y2goZHJlKSAmJiBEYXRlLnBhcnNlKHgpKSxcclxuXHRcdHlEID0gcGFyc2VJbnQoeS5tYXRjaChocmUpLCAxNikgfHwgeEQgJiYgeS5tYXRjaChkcmUpICYmIERhdGUucGFyc2UoeSkgfHwgbnVsbCxcclxuXHRcdG9GeE5jTCwgb0Z5TmNMO1xyXG5cdC8vIGZpcnN0IHRyeSBhbmQgc29ydCBIZXggY29kZXMgb3IgRGF0ZXNcclxuXHRpZiAoeUQpIHtcclxuXHRcdGlmICggeEQgPCB5RCApIHsgcmV0dXJuIC0xOyB9XHJcblx0XHRlbHNlIGlmICggeEQgPiB5RCApIHsgcmV0dXJuIDE7IH1cclxuXHR9XHJcblx0Ly8gbmF0dXJhbCBzb3J0aW5nIHRocm91Z2ggc3BsaXQgbnVtZXJpYyBzdHJpbmdzIGFuZCBkZWZhdWx0IHN0cmluZ3NcclxuXHRmb3IodmFyIGNMb2M9MCwgbnVtUz1NYXRoLm1heCh4Ti5sZW5ndGgsIHlOLmxlbmd0aCk7IGNMb2MgPCBudW1TOyBjTG9jKyspIHtcclxuXHRcdC8vIGZpbmQgZmxvYXRzIG5vdCBzdGFydGluZyB3aXRoICcwJywgc3RyaW5nIG9yIDAgaWYgbm90IGRlZmluZWQgKENsaW50IFByaWVzdClcclxuXHRcdG9GeE5jTCA9ICEoeE5bY0xvY10gfHwgJycpLm1hdGNoKG9yZSkgJiYgcGFyc2VGbG9hdCh4TltjTG9jXSkgfHwgeE5bY0xvY10gfHwgMDtcclxuXHRcdG9GeU5jTCA9ICEoeU5bY0xvY10gfHwgJycpLm1hdGNoKG9yZSkgJiYgcGFyc2VGbG9hdCh5TltjTG9jXSkgfHwgeU5bY0xvY10gfHwgMDtcclxuXHRcdC8vIGhhbmRsZSBudW1lcmljIHZzIHN0cmluZyBjb21wYXJpc29uIC0gbnVtYmVyIDwgc3RyaW5nIC0gKEt5bGUgQWRhbXMpXHJcblx0XHRpZiAoaXNOYU4ob0Z4TmNMKSAhPT0gaXNOYU4ob0Z5TmNMKSkgeyByZXR1cm4gKGlzTmFOKG9GeE5jTCkpID8gMSA6IC0xOyB9XHJcblx0XHQvLyByZWx5IG9uIHN0cmluZyBjb21wYXJpc29uIGlmIGRpZmZlcmVudCB0eXBlcyAtIGkuZS4gJzAyJyA8IDIgIT0gJzAyJyA8ICcyJ1xyXG5cdFx0ZWxzZSBpZiAodHlwZW9mIG9GeE5jTCAhPT0gdHlwZW9mIG9GeU5jTCkge1xyXG5cdFx0XHRvRnhOY0wgKz0gJyc7XHJcblx0XHRcdG9GeU5jTCArPSAnJztcclxuXHRcdH1cclxuXHRcdGlmIChvRnhOY0wgPCBvRnlOY0wpIHsgcmV0dXJuIC0xOyB9XHJcblx0XHRpZiAob0Z4TmNMID4gb0Z5TmNMKSB7IHJldHVybiAxOyB9XHJcblx0fVxyXG5cdHJldHVybiAwO1xyXG59O1xyXG4iLCIvKiBnbG9iYWwgTXV0YXRpb25PYnNlcnZlciAqL1xudmFyIGRvY3VtZW50ID0gcmVxdWlyZSgnZ2xvYmFsL2RvY3VtZW50JylcbnZhciB3aW5kb3cgPSByZXF1aXJlKCdnbG9iYWwvd2luZG93JylcbnZhciB3YXRjaCA9IE9iamVjdC5jcmVhdGUobnVsbClcbnZhciBLRVlfSUQgPSAnb25sb2FkaWQnICsgKG5ldyBEYXRlKCkgJSA5ZTYpLnRvU3RyaW5nKDM2KVxudmFyIEtFWV9BVFRSID0gJ2RhdGEtJyArIEtFWV9JRFxudmFyIElOREVYID0gMFxuXG5pZiAod2luZG93ICYmIHdpbmRvdy5NdXRhdGlvbk9ic2VydmVyKSB7XG4gIHZhciBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKGZ1bmN0aW9uIChtdXRhdGlvbnMpIHtcbiAgICBpZiAod2F0Y2gubGVuZ3RoIDwgMSkgcmV0dXJuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBtdXRhdGlvbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChtdXRhdGlvbnNbaV0uYXR0cmlidXRlTmFtZSA9PT0gS0VZX0FUVFIpIHtcbiAgICAgICAgZWFjaEF0dHIobXV0YXRpb25zW2ldLCB0dXJub24sIHR1cm5vZmYpXG4gICAgICAgIGNvbnRpbnVlXG4gICAgICB9XG4gICAgICBlYWNoTXV0YXRpb24obXV0YXRpb25zW2ldLnJlbW92ZWROb2RlcywgdHVybm9mZilcbiAgICAgIGVhY2hNdXRhdGlvbihtdXRhdGlvbnNbaV0uYWRkZWROb2RlcywgdHVybm9uKVxuICAgIH1cbiAgfSlcbiAgb2JzZXJ2ZXIub2JzZXJ2ZShkb2N1bWVudC5ib2R5LCB7XG4gICAgY2hpbGRMaXN0OiB0cnVlLFxuICAgIHN1YnRyZWU6IHRydWUsXG4gICAgYXR0cmlidXRlczogdHJ1ZSxcbiAgICBhdHRyaWJ1dGVPbGRWYWx1ZTogdHJ1ZSxcbiAgICBhdHRyaWJ1dGVGaWx0ZXI6IFtLRVlfQVRUUl1cbiAgfSlcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBvbmxvYWQgKGVsLCBvbiwgb2ZmKSB7XG4gIG9uID0gb24gfHwgZnVuY3Rpb24gKCkge31cbiAgb2ZmID0gb2ZmIHx8IGZ1bmN0aW9uICgpIHt9XG4gIGVsLnNldEF0dHJpYnV0ZShLRVlfQVRUUiwgJ28nICsgSU5ERVgpXG4gIHdhdGNoWydvJyArIElOREVYXSA9IFtvbiwgb2ZmLCAwXVxuICBJTkRFWCArPSAxXG59XG5cbmZ1bmN0aW9uIHR1cm5vbiAoaW5kZXgpIHtcbiAgaWYgKHdhdGNoW2luZGV4XVswXSAmJiB3YXRjaFtpbmRleF1bMl0gPT09IDApIHtcbiAgICB3YXRjaFtpbmRleF1bMF0oKVxuICAgIHdhdGNoW2luZGV4XVsyXSA9IDFcbiAgfVxufVxuXG5mdW5jdGlvbiB0dXJub2ZmIChpbmRleCkge1xuICBpZiAod2F0Y2hbaW5kZXhdWzFdICYmIHdhdGNoW2luZGV4XVsyXSA9PT0gMSkge1xuICAgIHdhdGNoW2luZGV4XVsxXSgpXG4gICAgd2F0Y2hbaW5kZXhdWzJdID0gMFxuICB9XG59XG5cbmZ1bmN0aW9uIGVhY2hBdHRyIChtdXRhdGlvbiwgb24sIG9mZikge1xuICB2YXIgbmV3VmFsdWUgPSBtdXRhdGlvbi50YXJnZXQuZ2V0QXR0cmlidXRlKEtFWV9BVFRSKVxuICBPYmplY3Qua2V5cyh3YXRjaCkuZm9yRWFjaChmdW5jdGlvbiAoaykge1xuICAgIGlmIChtdXRhdGlvbi5vbGRWYWx1ZSA9PT0gaykge1xuICAgICAgb2ZmKGspXG4gICAgfVxuICAgIGlmIChuZXdWYWx1ZSA9PT0gaykge1xuICAgICAgb24oaylcbiAgICB9XG4gIH0pXG59XG5cbmZ1bmN0aW9uIGVhY2hNdXRhdGlvbiAobm9kZXMsIGZuKSB7XG4gIHZhciBrZXlzID0gT2JqZWN0LmtleXMod2F0Y2gpXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbm9kZXMubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAobm9kZXNbaV0gJiYgbm9kZXNbaV0uZ2V0QXR0cmlidXRlICYmIG5vZGVzW2ldLmdldEF0dHJpYnV0ZShLRVlfQVRUUikpIHtcbiAgICAgIHZhciBvbmxvYWRpZCA9IG5vZGVzW2ldLmdldEF0dHJpYnV0ZShLRVlfQVRUUilcbiAgICAgIGtleXMuZm9yRWFjaChmdW5jdGlvbiAoaykge1xuICAgICAgICBpZiAob25sb2FkaWQgPT09IGspIHtcbiAgICAgICAgICBmbihrKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cbiAgICBpZiAobm9kZXNbaV0uY2hpbGROb2Rlcy5sZW5ndGggPiAwKSB7XG4gICAgICBlYWNoTXV0YXRpb24obm9kZXNbaV0uY2hpbGROb2RlcywgZm4pXG4gICAgfVxuICB9XG59XG4iLCJ2YXIgdG9wTGV2ZWwgPSB0eXBlb2YgZ2xvYmFsICE9PSAndW5kZWZpbmVkJyA/IGdsb2JhbCA6XG4gICAgdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgPyB3aW5kb3cgOiB7fVxudmFyIG1pbkRvYyA9IHJlcXVpcmUoJ21pbi1kb2N1bWVudCcpO1xuXG5pZiAodHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJykge1xuICAgIG1vZHVsZS5leHBvcnRzID0gZG9jdW1lbnQ7XG59IGVsc2Uge1xuICAgIHZhciBkb2NjeSA9IHRvcExldmVsWydfX0dMT0JBTF9ET0NVTUVOVF9DQUNIRUA0J107XG5cbiAgICBpZiAoIWRvY2N5KSB7XG4gICAgICAgIGRvY2N5ID0gdG9wTGV2ZWxbJ19fR0xPQkFMX0RPQ1VNRU5UX0NBQ0hFQDQnXSA9IG1pbkRvYztcbiAgICB9XG5cbiAgICBtb2R1bGUuZXhwb3J0cyA9IGRvY2N5O1xufVxuIiwiaWYgKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IHdpbmRvdztcbn0gZWxzZSBpZiAodHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIG1vZHVsZS5leHBvcnRzID0gZ2xvYmFsO1xufSBlbHNlIGlmICh0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIil7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBzZWxmO1xufSBlbHNlIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IHt9O1xufVxuIiwibW9kdWxlLmV4cG9ydHM9W1xuICB7XG4gICAgXCJuYW1lXCI6IFwiRnJhbmtpZSBKb2hubmllICYgTHVpZ28gVG9vXCIsXG4gICAgXCJhZGRyZXNzXCI6IFwiOTM5IFcgRWwgQ2FtaW5vIFJlYWwsIE1vdW50YWluIFZpZXcsIENBXCIsXG4gICAgXCJsYXRcIjogMzcuMzg2MzM5LFxuICAgIFwibG5nXCI6IC0xMjIuMDg1ODIzXG4gIH0sXG4gIHtcbiAgICBcIm5hbWVcIjogXCJBbWljaSdzIEVhc3QgQ29hc3QgUGl6emVyaWFcIixcbiAgICBcImFkZHJlc3NcIjogXCI3OTAgQ2FzdHJvIFN0LCBNb3VudGFpbiBWaWV3LCBDQVwiLFxuICAgIFwibGF0XCI6IDM3LjM4NzE0LFxuICAgIFwibG5nXCI6IC0xMjIuMDgzMjM1XG4gIH0sXG4gIHtcbiAgICBcIm5hbWVcIjogXCJLYXBwJ3MgUGl6emEgQmFyICYgR3JpbGxcIixcbiAgICBcImFkZHJlc3NcIjogXCIxOTEgQ2FzdHJvIFN0LCBNb3VudGFpbiBWaWV3LCBDQVwiLFxuICAgIFwibGF0XCI6IDM3LjM5Mzg4NSxcbiAgICBcImxuZ1wiOiAtMTIyLjA3ODkxNlxuICB9LFxuICB7XG4gICAgXCJuYW1lXCI6IFwiUm91bmQgVGFibGUgUGl6emE6IE1vdW50YWluIFZpZXdcIixcbiAgICBcImFkZHJlc3NcIjogXCI1NzAgTiBTaG9yZWxpbmUgQmx2ZCwgTW91bnRhaW4gVmlldywgQ0FcIixcbiAgICBcImxhdFwiOiAzNy40MDI2NTMsXG4gICAgXCJsbmdcIjogLTEyMi4wNzkzNTRcbiAgfSxcbiAge1xuICAgIFwibmFtZVwiOiBcIlRvbnkgJiBBbGJhJ3MgUGl6emEgJiBQYXN0YVwiLFxuICAgIFwiYWRkcmVzc1wiOiBcIjYxOSBFc2N1ZWxhIEF2ZSwgTW91bnRhaW4gVmlldywgQ0FcIixcbiAgICBcImxhdFwiOiAzNy4zOTQwMTEsXG4gICAgXCJsbmdcIjogLTEyMi4wOTU1MjhcbiAgfSxcbiAge1xuICAgIFwibmFtZVwiOiBcIk9yZWdhbm8ncyBXb29kLUZpcmVkIFBpenphXCIsXG4gICAgXCJhZGRyZXNzXCI6IFwiNDU0NiBFbCBDYW1pbm8gUmVhbCwgTG9zIEFsdG9zLCBDQVwiLFxuICAgIFwibGF0XCI6IDM3LjQwMTcyNCxcbiAgICBcImxuZ1wiOiAtMTIyLjExNDY0NlxuICB9LFxuICB7XG4gICAgXCJuYW1lXCI6IFwiUm91bmQgVGFibGUgUGl6emE6IFN1bm55dmFsZS1NYXJ5LUNlbnRyYWwgRXhweVwiLFxuICAgIFwiYWRkcmVzc1wiOiBcIjQxNSBOIE1hcnkgQXZlLCBTdW5ueXZhbGUsIENBXCIsXG4gICAgXCJsYXRcIjogMzcuMzkwMDM4LFxuICAgIFwibG5nXCI6IC0xMjIuMDQyMDM0XG4gIH0sXG4gIHtcbiAgICBcIm5hbWVcIjogXCJHaW9yZGFubydzXCIsXG4gICAgXCJhZGRyZXNzXCI6IFwiNzMwIE4gUnVzaCBTdCwgQ2hpY2FnbywgSUxcIixcbiAgICBcImxhdFwiOiA0MS44OTU3MjksXG4gICAgXCJsbmdcIjogLTg3LjYyNTQxMVxuICB9LFxuICB7XG4gICAgXCJuYW1lXCI6IFwiRmlsaXBwaSdzIFBpenphIEdyb3R0b1wiLFxuICAgIFwiYWRkcmVzc1wiOiBcIjE3NDcgSW5kaWEgU3QsIFNhbiBEaWVnbywgQ0FcIixcbiAgICBcImxhdFwiOiAzMi43MjM4MzEsXG4gICAgXCJsbmdcIjogLTExNy4xNjgzMjZcbiAgfSxcbiAge1xuICAgIFwibmFtZVwiOiBcIlBpenplcmlhIFBhcmFkaXNvXCIsXG4gICAgXCJhZGRyZXNzXCI6IFwiMjAyOSBQIFN0IE5XLCBXYXNoaW5ndG9uLCBEQ1wiLFxuICAgIFwibGF0XCI6IDM4LjkwOTY1LFxuICAgIFwibG5nXCI6IC03Ny4wNDU5XG4gIH0sXG4gIHtcbiAgICBcIm5hbWVcIjogXCJUdXR0YSBCZWxsYSBOZWFwb2xpdGFuIFBpenplcmFcIixcbiAgICBcImFkZHJlc3NcIjogXCI0OTE4IFJhaW5pZXIgQXZlIFMsIFNlYXR0bGUsIFdBXCIsXG4gICAgXCJsYXRcIjogNDcuNTU3NzA0LFxuICAgIFwibG5nXCI6IC0xMjIuMjg0OTg1XG4gIH0sXG4gIHtcbiAgICBcIm5hbWVcIjogXCJUb3VjaGUgUGFzdGEgUGl6emEgUG9vbFwiLFxuICAgIFwiYWRkcmVzc1wiOiBcIjE0MjUgTlcgR2xpc2FuIFN0LCBQb3J0bGFuZCwgT1JcIixcbiAgICBcImxhdFwiOiA0NS41MjY0NjUsXG4gICAgXCJsbmdcIjogLTEyMi42ODU1OFxuICB9LFxuICB7XG4gICAgXCJuYW1lXCI6IFwiUGllY29yYSdzIE5ldyBZb3JrIFBpenphXCIsXG4gICAgXCJhZGRyZXNzXCI6IFwiMTQwMSBFIE1hZGlzb24gU3QsIFNlYXR0bGUsIFdBXCIsXG4gICAgXCJsYXRcIjogNDcuNjE0MDA1LFxuICAgIFwibG5nXCI6IC0xMjIuMzEzOTg1XG4gIH0sXG4gIHtcbiAgICBcIm5hbWVcIjogXCJQYWdsaWFjY2kgUGl6emFcIixcbiAgICBcImFkZHJlc3NcIjogXCI1NTAgUXVlZW4gQW5uZSBBdmUgTiwgU2VhdHRsZSwgV0FcIixcbiAgICBcImxhdFwiOiA0Ny42MjM5NDIsXG4gICAgXCJsbmdcIjogLTEyMi4zNTY3MTlcbiAgfSxcbiAge1xuICAgIFwibmFtZVwiOiBcIlplZWtzIFBpenphIC0gUGhpbm5leSBSaWRnZVwiLFxuICAgIFwiYWRkcmVzc1wiOiBcIjYwMDAgUGhpbm5leSBBdmUgTiwgU2VhdHRsZSwgV0FcIixcbiAgICBcImxhdFwiOiA0Ny42NzI2NyxcbiAgICBcImxuZ1wiOiAtMTIyLjM1NDA5MlxuICB9LFxuICB7XG4gICAgXCJuYW1lXCI6IFwiT2xkIFRvd24gUGl6emFcIixcbiAgICBcImFkZHJlc3NcIjogXCIyMjYgTlcgRGF2aXMgU3QsIFBvcnRsYW5kLCBPUlwiLFxuICAgIFwibGF0XCI6IDQ1LjUyNDU1NyxcbiAgICBcImxuZ1wiOiAtMTIyLjY3MjY4XG4gIH0sXG4gIHtcbiAgICBcIm5hbWVcIjogXCJaZWVrcyBQaXp6YSAtIEJlbGx0b3duXCIsXG4gICAgXCJhZGRyZXNzXCI6IFwiNDE5IERlbm55IFdheSwgU2VhdHRsZSwgV0FcIixcbiAgICBcImxhdFwiOiA0Ny42MTgzMTQsXG4gICAgXCJsbmdcIjogLTEyMi4zNDc5OThcbiAgfSxcbiAge1xuICAgIFwibmFtZVwiOiBcIkVzY2FwZSBGcm9tIE5ldyBZb3JrIFBpenphXCIsXG4gICAgXCJhZGRyZXNzXCI6IFwiNjIyIE5XIDIzcmQgQXZlLCBQb3J0bGFuZCwgT1JcIixcbiAgICBcImxhdFwiOiA0NS41MjcxMDUsXG4gICAgXCJsbmdcIjogLTEyMi42OTg1MDlcbiAgfSxcbiAge1xuICAgIFwibmFtZVwiOiBcIkJpZyBGcmVkJ3MgUGl6emEgR2FyZGVuXCIsXG4gICAgXCJhZGRyZXNzXCI6IFwiMTEwMSBTIDExOXRoIFN0LCBPbWFoYSwgTkVcIixcbiAgICBcImxhdFwiOiA0MS4yNDg2NjIsXG4gICAgXCJsbmdcIjogLTk2LjA5ODc2XG4gIH0sXG4gIHtcbiAgICBcIm5hbWVcIjogXCJPbGQgQ2hpY2Fnb1wiLFxuICAgIFwiYWRkcmVzc1wiOiBcIjExMTEgSGFybmV5IFN0LCBPbWFoYSwgTkVcIixcbiAgICBcImxhdFwiOiA0MS4yNTY1MixcbiAgICBcImxuZ1wiOiAtOTUuOTMwNjgzXG4gIH0sXG4gIHtcbiAgICBcIm5hbWVcIjogXCJTZ3QgUGVmZmVyJ3MgQ2FmZSBJdGFsaWFuXCIsXG4gICAgXCJhZGRyZXNzXCI6IFwiMTUwMSBOIFNhZGRsZSBDcmVlayBSZCwgT21haGEsIE5FXCIsXG4gICAgXCJsYXRcIjogNDEuMjczMDg0LFxuICAgIFwibG5nXCI6IC05NS45ODc4MTZcbiAgfSxcbiAge1xuICAgIFwibmFtZVwiOiBcIk1hbWEncyBQaXp6YVwiLFxuICAgIFwiYWRkcmVzc1wiOiBcIjcxNSBOIFNhZGRsZSBDcmVlayBSZCwgT21haGEsIE5FXCIsXG4gICAgXCJsYXRcIjogNDEuMjY1ODgzLFxuICAgIFwibG5nXCI6IC05NS45ODA2ODJcbiAgfSxcbiAge1xuICAgIFwibmFtZVwiOiBcIlppbydzIE5ldyBZb3JrIFN0eWxlIFBpenplcmlhXCIsXG4gICAgXCJhZGRyZXNzXCI6IFwiMTIxMyBIb3dhcmQgU3QsIE9tYWhhLCBORVwiLFxuICAgIFwibGF0XCI6IDQxLjI1NTQ1LFxuICAgIFwibG5nXCI6IC05NS45MzIwMjJcbiAgfSxcbiAge1xuICAgIFwibmFtZVwiOiBcIlppbydzIE5ldyBZb3JrIFN0eWxlIFBpenplcmlhXCIsXG4gICAgXCJhZGRyZXNzXCI6IFwiNzgzNCBXIERvZGdlIFJkLCBPbWFoYSwgTkVcIixcbiAgICBcImxhdFwiOiA0MS4yNjMyNSxcbiAgICBcImxuZ1wiOiAtOTYuMDU2NFxuICB9LFxuICB7XG4gICAgXCJuYW1lXCI6IFwiTGEgQ2FzYSBQaXp6YXJpYVwiLFxuICAgIFwiYWRkcmVzc1wiOiBcIjQ0MzIgTGVhdmVud29ydGggU3QsIE9tYWhhLCBORVwiLFxuICAgIFwibGF0XCI6IDQxLjI1MjQsXG4gICAgXCJsbmdcIjogLTk1Ljk3OTU3OFxuICB9LFxuICB7XG4gICAgXCJuYW1lXCI6IFwiTG91IE1hbG5hdGkncyBQaXp6ZXJpYVwiLFxuICAgIFwiYWRkcmVzc1wiOiBcIjQzOSBOIFdlbGxzIFN0LCBDaGljYWdvLCBJTFwiLFxuICAgIFwibGF0XCI6IDQxLjg5MDM0NixcbiAgICBcImxuZ1wiOiAtODcuNjMzOTI3XG4gIH0sXG4gIHtcbiAgICBcIm5hbWVcIjogXCJQaWVjZSBSZXN0YXVyYW50XCIsXG4gICAgXCJhZGRyZXNzXCI6IFwiMTkyNyBXIE5vcnRoIEF2ZSwgQ2hpY2FnbywgSUxcIixcbiAgICBcImxhdFwiOiA0MS45MTA0OTMsXG4gICAgXCJsbmdcIjogLTg3LjY3NjEyN1xuICB9LFxuICB7XG4gICAgXCJuYW1lXCI6IFwiQ29ubmllJ3MgUGl6emEgSW5jXCIsXG4gICAgXCJhZGRyZXNzXCI6IFwiMjM3MyBTIEFyY2hlciBBdmUsIENoaWNhZ28sIElMXCIsXG4gICAgXCJsYXRcIjogNDEuODQ5MjEzLFxuICAgIFwibG5nXCI6IC04Ny42NDE2ODFcbiAgfSxcbiAge1xuICAgIFwibmFtZVwiOiBcIkV4Y2hlcXVlciBSZXN0YXVyYW50XCIsXG4gICAgXCJhZGRyZXNzXCI6IFwiMjI2IFMgV2FiYXNoIEF2ZSwgQ2hpY2FnbywgSUxcIixcbiAgICBcImxhdFwiOiA0MS44NzkxODksXG4gICAgXCJsbmdcIjogLTg3LjYyNjA3OVxuICB9LFxuICB7XG4gICAgXCJuYW1lXCI6IFwiQ29jbydzIEJ5IFRoZSBGYWxsc1wiLFxuICAgIFwiYWRkcmVzc1wiOiBcIjUzMzkgTXVycmF5IFN0cmVldCwgTmlhZ2FyYSBGYWxscywgT250YXJpb1wiLFxuICAgIFwibGF0XCI6IDQzLjA4MzU1NSxcbiAgICBcImxuZ1wiOiAtNzkuMDgyNzA2XG4gIH0sXG4gIHtcbiAgICBcIm5hbWVcIjogXCJQb21wZWlcIixcbiAgICBcImFkZHJlc3NcIjogXCIxNTMxIFcgVGF5bG9yIFN0LCBDaGljYWdvLCBJTFwiLFxuICAgIFwibGF0XCI6IDQxLjg2OTMwMSxcbiAgICBcImxuZ1wiOiAtODcuNjY0Nzc5XG4gIH0sXG4gIHtcbiAgICBcIm5hbWVcIjogXCJMeW5uJ3MgUGFyYWRpc2UgQ2FmZVwiLFxuICAgIFwiYWRkcmVzc1wiOiBcIjk4NCBCYXJyZXQgQXZlLCBMb3Vpc3ZpbGxlLCBLWVwiLFxuICAgIFwibGF0XCI6IDM4LjIzNjkzLFxuICAgIFwibG5nXCI6IC04NS43Mjg1NFxuICB9LFxuICB7XG4gICAgXCJuYW1lXCI6IFwiT3R0byBSZXN0YXVyYW50IEVub3RlY2EgUGl6emFcIixcbiAgICBcImFkZHJlc3NcIjogXCIxIDV0aCBBdmUsIE5ldyBZb3JrLCBOWVwiLFxuICAgIFwibGF0XCI6IDQwLjczMjE2MSxcbiAgICBcImxuZ1wiOiAtNzMuOTk2MzIxXG4gIH0sXG4gIHtcbiAgICBcIm5hbWVcIjogXCJHcmltYWxkaSdzXCIsXG4gICAgXCJhZGRyZXNzXCI6IFwiMTkgT2xkIEZ1bHRvbiBTdCwgQnJvb2tseW4sIE5ZXCIsXG4gICAgXCJsYXRcIjogNDAuNzAyNTE1LFxuICAgIFwibG5nXCI6IC03My45OTM3MzNcbiAgfSxcbiAge1xuICAgIFwibmFtZVwiOiBcIkxvbWJhcmRpJ3NcIixcbiAgICBcImFkZHJlc3NcIjogXCIzMiBTcHJpbmcgU3QsIE5ldyBZb3JrLCBOWVwiLFxuICAgIFwibGF0XCI6IDQwLjcyMTY3NSxcbiAgICBcImxuZ1wiOiAtNzMuOTk1NTk1XG4gIH0sXG4gIHtcbiAgICBcIm5hbWVcIjogXCJKb2huJ3MgUGl6emVyaWFcIixcbiAgICBcImFkZHJlc3NcIjogXCIyNzggQmxlZWNrZXIgU3QsIE5ldyBZb3JrLCBOWVwiLFxuICAgIFwibGF0XCI6IDQwLjczMTcwNixcbiAgICBcImxuZ1wiOiAtNzQuMDAzMjcxXG4gIH0sXG4gIHtcbiAgICBcIm5hbWVcIjogXCJKb2huJ3MgUGl6emVyaWFcIixcbiAgICBcImFkZHJlc3NcIjogXCIyNjAgVyA0NHRoIFN0LCBOZXcgWW9yaywgTllcIixcbiAgICBcImxhdFwiOiA0MC43NTgwNzIsXG4gICAgXCJsbmdcIjogLTczLjk4NzczNlxuICB9LFxuICB7XG4gICAgXCJuYW1lXCI6IFwiQnVyZ2VyIEpvaW50XCIsXG4gICAgXCJhZGRyZXNzXCI6IFwiMjE3NSBCcm9hZHdheSwgTmV3IFlvcmssIE5ZXCIsXG4gICAgXCJsYXRcIjogNDAuNzgyMzk4LFxuICAgIFwibG5nXCI6IC03My45ODFcbiAgfSxcbiAge1xuICAgIFwibmFtZVwiOiBcIkZyYW5rIFBlcGUgUGl6emVyaWEgTmFwb2xldGFuYVwiLFxuICAgIFwiYWRkcmVzc1wiOiBcIjE1NyBXb29zdGVyIFN0LCBOZXcgSGF2ZW4sIENUXCIsXG4gICAgXCJsYXRcIjogNDEuMzAyODAzLFxuICAgIFwibG5nXCI6IC03Mi45MTcwNDJcbiAgfSxcbiAge1xuICAgIFwibmFtZVwiOiBcIkFkcmlhbm5lJ3MgUGl6emEgQmFyXCIsXG4gICAgXCJhZGRyZXNzXCI6IFwiNTQgU3RvbmUgU3QsIE5ldyBZb3JrLCBOWVwiLFxuICAgIFwibGF0XCI6IDQwLjcwNDQ4LFxuICAgIFwibG5nXCI6IC03NC4wMTAxMzdcbiAgfSxcbiAge1xuICAgIFwibmFtZVwiOiBcIlBpenplcmlhIFJlZ2luYTogUmVnaW5hIFBpenphXCIsXG4gICAgXCJhZGRyZXNzXCI6IFwiMTEgMS8yIFRoYWNoZXIgU3QsIEJvc3RvbiwgTUFcIixcbiAgICBcImxhdFwiOiA0Mi4zNjUzMzgsXG4gICAgXCJsbmdcIjogLTcxLjA1NjgzMlxuICB9LFxuICB7XG4gICAgXCJuYW1lXCI6IFwiVXBwZXIgQ3J1c3RcIixcbiAgICBcImFkZHJlc3NcIjogXCIyMCBDaGFybGVzIFN0LCBCb3N0b24sIE1BXCIsXG4gICAgXCJsYXRcIjogNDIuMzU2NjA3LFxuICAgIFwibG5nXCI6IC03MS4wNjk2ODFcbiAgfSxcbiAge1xuICAgIFwibmFtZVwiOiBcIkJlcnR1Y2NpJ3MgQnJpY2sgT3ZlbiBSc3RybnRcIixcbiAgICBcImFkZHJlc3NcIjogXCI0IEJyb29rbGluZSBQbCwgQnJvb2tsaW5lLCBNQVwiLFxuICAgIFwibGF0XCI6IDQyLjMzMTkxNyxcbiAgICBcImxuZ1wiOiAtNzEuMTE1MzExXG4gIH0sXG4gIHtcbiAgICBcIm5hbWVcIjogXCJBcXVpdGFpbmVcIixcbiAgICBcImFkZHJlc3NcIjogXCI1NjkgVHJlbW9udCBTdCwgQm9zdG9uLCBNQVwiLFxuICAgIFwibGF0XCI6IDQyLjM0MzYzNyxcbiAgICBcImxuZ1wiOiAtNzEuMDcyMjY1XG4gIH0sXG4gIHtcbiAgICBcIm5hbWVcIjogXCJCZXJ0dWNjaSdzIEJyaWNrIE92ZW4gUnN0cm50XCIsXG4gICAgXCJhZGRyZXNzXCI6IFwiNDMgU3RhbmhvcGUgU3QsIEJvc3RvbiwgTUFcIixcbiAgICBcImxhdFwiOiA0Mi4zNDgyOTksXG4gICAgXCJsbmdcIjogLTcxLjA3MzI0OVxuICB9LFxuICB7XG4gICAgXCJuYW1lXCI6IFwiVXBwZXIgQ3J1c3RcIixcbiAgICBcImFkZHJlc3NcIjogXCIyODYgSGFydmFyZCBTdCwgQnJvb2tsaW5lLCBNQVwiLFxuICAgIFwibGF0XCI6IDQyLjM0Mjg1NixcbiAgICBcImxuZ1wiOiAtNzEuMTIyMzExXG4gIH0sXG4gIHtcbiAgICBcIm5hbWVcIjogXCJCZXJ0dWNjaSdzIEJyaWNrIE92ZW4gUnN0cm50XCIsXG4gICAgXCJhZGRyZXNzXCI6IFwiNzk5IE1haW4gU3QsIENhbWJyaWRnZSwgTUFcIixcbiAgICBcImxhdFwiOiA0Mi4zNjMyNTksXG4gICAgXCJsbmdcIjogLTcxLjA5NzIxXG4gIH0sXG4gIHtcbiAgICBcIm5hbWVcIjogXCJCZXJ0dWNjaSdzIEJyaWNrIE92ZW4gUnN0cm50XCIsXG4gICAgXCJhZGRyZXNzXCI6IFwiMjIgTWVyY2hhbnRzIFJvdywgQm9zdG9uLCBNQVwiLFxuICAgIFwibGF0XCI6IDQyLjM1OTE0NixcbiAgICBcImxuZ1wiOiAtNzEuMDU1NDc3XG4gIH0sXG4gIHtcbiAgICBcIm5hbWVcIjogXCJWaW5uaWUgVmFuIEdvLUdvJ3NcIixcbiAgICBcImFkZHJlc3NcIjogXCIzMTcgVyBCcnlhbiBTdCwgU2F2YW5uYWgsIEdBXCIsXG4gICAgXCJsYXRcIjogMzIuMDgxMTUyLFxuICAgIFwibG5nXCI6IC04MS4wOTQ5OTJcbiAgfSxcbiAge1xuICAgIFwibmFtZVwiOiBcIkRvbWlubydzIFBpenphOiBNeXJ0bGUgQmVhY2hcIixcbiAgICBcImFkZHJlc3NcIjogXCIxNzA2IFMgS2luZ3MgSHd5ICMgQSwgTXlydGxlIEJlYWNoLCBTQ1wiLFxuICAgIFwibGF0XCI6IDMzLjY3NDg4LFxuICAgIFwibG5nXCI6IC03OC45MDUxNDNcbiAgfSxcbiAge1xuICAgIFwibmFtZVwiOiBcIkVhc3Qgb2YgQ2hpY2FnbyBQaXp6YSBDb21wYW55XCIsXG4gICAgXCJhZGRyZXNzXCI6IFwiMzkwMSBOb3J0aCBLaW5ncyBIaWdod2F5IFN1aXRlIDEsIE15cnRsZSBCZWFjaCwgU0NcIixcbiAgICBcImxhdFwiOiAzMy43MTYwOTcsXG4gICAgXCJsbmdcIjogLTc4Ljg1NTU4MlxuICB9LFxuICB7XG4gICAgXCJuYW1lXCI6IFwiVmlsbGEgVHJvbmNvIEl0YWxpYW4gUnN0cm50XCIsXG4gICAgXCJhZGRyZXNzXCI6IFwiMTIxMyBCbGFuZGluZyBTdCwgQ29sdW1iaWEsIFNDXCIsXG4gICAgXCJsYXRcIjogMzQuMDA4MDQ4LFxuICAgIFwibG5nXCI6IC04MS4wMzYzMTRcbiAgfSxcbiAge1xuICAgIFwibmFtZVwiOiBcIk1lbGxvdyBNdXNocm9vbSBQaXp6YSBCYWtlcnNcIixcbiAgICBcImFkZHJlc3NcIjogXCIxMSBXIExpYmVydHkgU3QsIFNhdmFubmFoLCBHQVwiLFxuICAgIFwibGF0XCI6IDMyLjA3NDY3MyxcbiAgICBcImxuZ1wiOiAtODEuMDkzNjk5XG4gIH0sXG4gIHtcbiAgICBcIm5hbWVcIjogXCJBbmRvbGluaXMgUGl6emFcIixcbiAgICBcImFkZHJlc3NcIjogXCI4MiBXZW50d29ydGggU3QsIENoYXJsZXN0b24sIFNDXCIsXG4gICAgXCJsYXRcIjogMzIuNzgyMzMsXG4gICAgXCJsbmdcIjogLTc5LjkzNDIzNlxuICB9LFxuICB7XG4gICAgXCJuYW1lXCI6IFwiTWVsbG93IE11c2hyb29tIFBpenphIEJha2Vyc1wiLFxuICAgIFwiYWRkcmVzc1wiOiBcIjI1OSBFIEJyb2FkIFN0LCBBdGhlbnMsIEdBXCIsXG4gICAgXCJsYXRcIjogMzMuOTU3OCxcbiAgICBcImxuZ1wiOiAtODMuMzc0NjZcbiAgfSxcbiAge1xuICAgIFwibmFtZVwiOiBcIkJ1Y2tzIFBpenphIG9mIEVkaXN0byBCZWFjaCBJbmNcIixcbiAgICBcImFkZHJlc3NcIjogXCIxMTQgSnVuZ2xlIFJkLCBFZGlzdG8gSXNsYW5kLCBTQ1wiLFxuICAgIFwibGF0XCI6IDMyLjUwMzk3MyxcbiAgICBcImxuZ1wiOiAtODAuMjk3OTQ3XG4gIH0sXG4gIHtcbiAgICBcIm5hbWVcIjogXCJBbnRob255J3MgQ29hbCBGaXJlZCBQaXp6YVwiLFxuICAgIFwiYWRkcmVzc1wiOiBcIjIyMDMgUyBGZWRlcmFsIEh3eSwgRm9ydCBMYXVkZXJkYWxlLCBGTFwiLFxuICAgIFwibGF0XCI6IDI2LjA5NDY3MSxcbiAgICBcImxuZ1wiOiAtODAuMTM2Njg5XG4gIH0sXG4gIHtcbiAgICBcIm5hbWVcIjogXCJHaW9yZGFubydzXCIsXG4gICAgXCJhZGRyZXNzXCI6IFwiMTIxNTEgUyBBcG9wa2EgVmluZWxhbmQgUmQsIE9ybGFuZG8sIEZMXCIsXG4gICAgXCJsYXRcIjogMjguMzg5MzY3LFxuICAgIFwibG5nXCI6IC04MS41MDYyMjJcbiAgfSxcbiAge1xuICAgIFwibmFtZVwiOiBcIlBpenphIFJ1c3RpY2FcIixcbiAgICBcImFkZHJlc3NcIjogXCI4NjMgV2FzaGluZ3RvbiBBdmUsIE1pYW1pIEJlYWNoLCBGTFwiLFxuICAgIFwibGF0XCI6IDI1Ljc3OTA1OSxcbiAgICBcImxuZ1wiOiAtODAuMTMzMTA3XG4gIH0sXG4gIHtcbiAgICBcIm5hbWVcIjogXCJNYW1hIEplbm5pZSdzIEl0YWxpYW4gUmVzdGF1cmFudFwiLFxuICAgIFwiYWRkcmVzc1wiOiBcIjExNzIwIE5lIDJuZCBBdmUsIE5vcnRoIE1pYW1pLCBGTFwiLFxuICAgIFwibGF0XCI6IDI1Ljg4Mjc4MixcbiAgICBcImxuZ1wiOiAtODAuMTk0MjlcbiAgfSxcbiAge1xuICAgIFwibmFtZVwiOiBcIkFudGhvbnkncyBDb2FsIEZpcmVkIFBpenphXCIsXG4gICAgXCJhZGRyZXNzXCI6IFwiMTc5MDEgQmlzY2F5bmUgQmx2ZCwgQXZlbnR1cmEsIEZMXCIsXG4gICAgXCJsYXRcIjogMjUuOTQxMTE2LFxuICAgIFwibG5nXCI6IC04MC4xNDg4MjZcbiAgfSxcbiAge1xuICAgIFwibmFtZVwiOiBcIkFudGhvbnkncyBDb2FsIEZpcmVkIFBpenphXCIsXG4gICAgXCJhZGRyZXNzXCI6IFwiNDUyNyBXZXN0b24gUmQsIFdlc3RvbiwgRkxcIixcbiAgICBcImxhdFwiOiAyNi4wNjUzOTUsXG4gICAgXCJsbmdcIjogLTgwLjM2MjQ0MlxuICB9LFxuICB7XG4gICAgXCJuYW1lXCI6IFwiTWFyaW8gdGhlIEJha2VyIFBpenphICYgSXRhbGlhbiBSZXN0YXVyYW50XCIsXG4gICAgXCJhZGRyZXNzXCI6IFwiMTM2OTUgVyBEaXhpZSBId3ksIE5vcnRoIE1pYW1pLCBGTFwiLFxuICAgIFwibGF0XCI6IDI1LjkyOTc0LFxuICAgIFwibG5nXCI6IC04MC4xNTYwOVxuICB9LFxuICB7XG4gICAgXCJuYW1lXCI6IFwiQmlnIENoZWVzZSBQaXp6YVwiLFxuICAgIFwiYWRkcmVzc1wiOiBcIjgwODAgU1cgNjd0aCBBdmUsIE1pYW1pLCBGTFwiLFxuICAgIFwibGF0XCI6IDI1LjY5NjAyNSxcbiAgICBcImxuZ1wiOiAtODAuMzAxMTEzXG4gIH0sXG4gIHtcbiAgICBcIm5hbWVcIjogXCJJbmdsZXNpZGUgVmlsbGFnZSBQaXp6YVwiLFxuICAgIFwiYWRkcmVzc1wiOiBcIjIzOTYgSW5nbGVzaWRlIEF2ZSwgTWFjb24sIEdBXCIsXG4gICAgXCJsYXRcIjogMzIuODUzNzYsXG4gICAgXCJsbmdcIjogLTgzLjY1NzQwNlxuICB9LFxuICB7XG4gICAgXCJuYW1lXCI6IFwiQ2lhbyBCZWxsYSBQaXp6YSBEYSBHdWdsaWVsbW9cIixcbiAgICBcImFkZHJlc3NcIjogXCIyOSBIaWdod2F5IDk4IEUsIERlc3RpbiwgRkxcIixcbiAgICBcImxhdFwiOiAzMC4zOTU1NTYsXG4gICAgXCJsbmdcIjogLTg2LjUxMjA5M1xuICB9LFxuICB7XG4gICAgXCJuYW1lXCI6IFwiUGFwYSBKb2huJ3MgUGl6emFcIixcbiAgICBcImFkZHJlc3NcIjogXCI4MTAgUnVzc2VsbCBQa3d5LCBXYXJuZXIgUm9iaW5zLCBHQVwiLFxuICAgIFwibGF0XCI6IDMyLjU5MzkxMSxcbiAgICBcImxuZ1wiOiAtODMuNjM3MDc1XG4gIH0sXG4gIHtcbiAgICBcIm5hbWVcIjogXCJQYXBhIEpvaG4ncyBQaXp6YTogRWFzdCBDZW50cmFsIE1vbnRnb21lcnlcIixcbiAgICBcImFkZHJlc3NcIjogXCIyNTI1IE1hZGlzb24gQXZlLCBNb250Z29tZXJ5LCBBTFwiLFxuICAgIFwibGF0XCI6IDMyLjM4MTEyMSxcbiAgICBcImxuZ1wiOiAtODYuMjczMDM1XG4gIH0sXG4gIHtcbiAgICBcIm5hbWVcIjogXCJDaWNpJ3MgUGl6emFcIixcbiAgICBcImFkZHJlc3NcIjogXCI2MjY4IEF0bGFudGEgSHd5LCBNb250Z29tZXJ5LCBBTFwiLFxuICAgIFwibGF0XCI6IDMyLjM4MjIwNSxcbiAgICBcImxuZ1wiOiAtODYuMTkwNjc1XG4gIH0sXG4gIHtcbiAgICBcIm5hbWVcIjogXCJQYXBhIEpvaG4ncyBQaXp6YVwiLFxuICAgIFwiYWRkcmVzc1wiOiBcIjEyMTAgRSBKYWNrc29uIFN0LCBUaG9tYXN2aWxsZSwgR0FcIixcbiAgICBcImxhdFwiOiAzMC44NDkxMjksXG4gICAgXCJsbmdcIjogLTgzLjk2MzQyOFxuICB9LFxuICB7XG4gICAgXCJuYW1lXCI6IFwiUGFwYSBKb2huJ3MgUGl6emFcIixcbiAgICBcImFkZHJlc3NcIjogXCI3MTEgTiBXZXN0b3ZlciBCbHZkICMgRywgQWxiYW55LCBHQVwiLFxuICAgIFwibGF0XCI6IDMxLjYxMzk3LFxuICAgIFwibG5nXCI6IC04NC4yMjMwOFxuICB9LFxuICB7XG4gICAgXCJuYW1lXCI6IFwiTWVsbG93IE11c2hyb29tIFBpenphIEJha2Vyc1wiLFxuICAgIFwiYWRkcmVzc1wiOiBcIjYxMDAgVmV0ZXJhbnMgUGt3eSwgQ29sdW1idXMsIEdBXCIsXG4gICAgXCJsYXRcIjogMzIuNTMyMDc4LFxuICAgIFwibG5nXCI6IC04NC45NTU4OTRcbiAgfSxcbiAge1xuICAgIFwibmFtZVwiOiBcIlN0YXIgUGl6emFcIixcbiAgICBcImFkZHJlc3NcIjogXCIyMTExIE5vcmZvbGsgU3QsIEhvdXN0b24sIFRYXCIsXG4gICAgXCJsYXRcIjogMjkuNzMyNDUyLFxuICAgIFwibG5nXCI6IC05NS40MTEwNThcbiAgfSxcbiAge1xuICAgIFwibmFtZVwiOiBcIlN0YXIgUGl6emEgSUlcIixcbiAgICBcImFkZHJlc3NcIjogXCI3NyBIYXJ2YXJkIFN0LCBIb3VzdG9uLCBUWFwiLFxuICAgIFwibGF0XCI6IDI5Ljc3MDc1MSxcbiAgICBcImxuZ1wiOiAtOTUuMzk2MDQyXG4gIH0sXG4gIHtcbiAgICBcIm5hbWVcIjogXCJCcm90aGVycyBQaXp6ZXJpYVwiLFxuICAgIFwiYWRkcmVzc1wiOiBcIjEwMjkgSGlnaHdheSA2IE4gIyAxMDAsIEhvdXN0b24sIFRYXCIsXG4gICAgXCJsYXRcIjogMjkuNzY4MzM3LFxuICAgIFwibG5nXCI6IC05NS42NDM1OTRcbiAgfSxcbiAge1xuICAgIFwibmFtZVwiOiBcIjExdGggU3RyZWV0IENhZmUgSW5jXCIsXG4gICAgXCJhZGRyZXNzXCI6IFwiNzQ4IEUgMTF0aCBTdCwgSG91c3RvbiwgVFhcIixcbiAgICBcImxhdFwiOiAyOS43OTA3OTQsXG4gICAgXCJsbmdcIjogLTk1LjM4ODkyMVxuICB9LFxuICB7XG4gICAgXCJuYW1lXCI6IFwiQ2FsaWZvcm5pYSBQaXp6YSBLaXRjaGVuXCIsXG4gICAgXCJhZGRyZXNzXCI6IFwiMTcwNSBQb3N0IE9hayBCbHZkICMgQSwgSG91c3RvbiwgVFhcIixcbiAgICBcImxhdFwiOiAyOS43NTAxNzIsXG4gICAgXCJsbmdcIjogLTk1LjQ2MTE5OVxuICB9LFxuICB7XG4gICAgXCJuYW1lXCI6IFwiQ29sbGluYSdzIEl0YWxpYW4gQ2FmZVwiLFxuICAgIFwiYWRkcmVzc1wiOiBcIjM4MzUgUmljaG1vbmQgQXZlLCBIb3VzdG9uLCBUWFwiLFxuICAgIFwibGF0XCI6IDI5LjczMjYyLFxuICAgIFwibG5nXCI6IC05NS40Mzg5NjRcbiAgfSxcbiAge1xuICAgIFwibmFtZVwiOiBcIkJhcnJ5J3MgUGl6emEgJiBJdGFsaWFuIERpbmVyXCIsXG4gICAgXCJhZGRyZXNzXCI6IFwiNjAwMyBSaWNobW9uZCBBdmUsIEhvdXN0b24sIFRYXCIsXG4gICAgXCJsYXRcIjogMjkuNzMxNDMsXG4gICAgXCJsbmdcIjogLTk1LjQ4NDM4MlxuICB9LFxuICB7XG4gICAgXCJuYW1lXCI6IFwiTWFyaW8ncyBTZWF3YWxsIEl0YWxpYW4gUmVzdGF1cmFudFwiLFxuICAgIFwiYWRkcmVzc1wiOiBcIjYyOCBTZWF3YWxsIEJsdmQsIEdhbHZlc3RvbiwgVFhcIixcbiAgICBcImxhdFwiOiAyOS4zMDQ1NDIsXG4gICAgXCJsbmdcIjogLTk0Ljc3MjU5OFxuICB9LFxuICB7XG4gICAgXCJuYW1lXCI6IFwiQ2FtcGlzaSdzIEVneXB0aWFuIFJlc3RhdXJhbnRcIixcbiAgICBcImFkZHJlc3NcIjogXCI1NjEwIEUgTW9ja2luZ2JpcmQgTG4sIERhbGxhcywgVFhcIixcbiAgICBcImxhdFwiOiAzMi44MzY1MSxcbiAgICBcImxuZ1wiOiAtOTYuNzcxNzgxXG4gIH0sXG4gIHtcbiAgICBcIm5hbWVcIjogXCJGYXQgSm9lJ3MgUGl6emEgUGFzdGEgJiBCYXJcIixcbiAgICBcImFkZHJlc3NcIjogXCI0NzIxIFcgUGFyayBCbHZkICMgMTAxLCBQbGFubywgVFhcIixcbiAgICBcImxhdFwiOiAzMy4wMjcwNTUsXG4gICAgXCJsbmdcIjogLTk2Ljc4ODkxMlxuICB9LFxuICB7XG4gICAgXCJuYW1lXCI6IFwiU2FjY29uZSdzIFBpenphXCIsXG4gICAgXCJhZGRyZXNzXCI6IFwiMTM4MTIgTiBIaWdod2F5IDE4MywgQXVzdGluLCBUWFwiLFxuICAgIFwibGF0XCI6IDI5LjU2OTUwNyxcbiAgICBcImxuZ1wiOiAtOTcuOTY0NjYzXG4gIH0sXG4gIHtcbiAgICBcIm5hbWVcIjogXCJGaXJlc2lkZSBQaWVzXCIsXG4gICAgXCJhZGRyZXNzXCI6IFwiMjgyMCBOIEhlbmRlcnNvbiBBdmUsIERhbGxhcywgVFhcIixcbiAgICBcImxhdFwiOiAzMi44MTk3NjIsXG4gICAgXCJsbmdcIjogLTk2Ljc4NDE0OFxuICB9LFxuICB7XG4gICAgXCJuYW1lXCI6IFwiUm9tZW8nc1wiLFxuICAgIFwiYWRkcmVzc1wiOiBcIjE1MDAgQmFydG9uIFNwcmluZ3MgUmQsIEF1c3RpbiwgVFhcIixcbiAgICBcImxhdFwiOiAzMC4yNjE1MjYsXG4gICAgXCJsbmdcIjogLTk3Ljc2MDAyMlxuICB9LFxuICB7XG4gICAgXCJuYW1lXCI6IFwiU2FuZGVsbGEncyBDYWZlXCIsXG4gICAgXCJhZGRyZXNzXCI6IFwiNTkxMCBOIE1hY2FydGh1ciBCbHZkLCBJcnZpbmcsIFRYXCIsXG4gICAgXCJsYXRcIjogMzIuODkyMDAyLFxuICAgIFwibG5nXCI6IC05Ni45NjExODhcbiAgfSxcbiAge1xuICAgIFwibmFtZVwiOiBcIk1hbmdpYSBDaGljYWdvIFN0dWZmZWQgUGl6emFcIixcbiAgICBcImFkZHJlc3NcIjogXCIzNTAwIEd1YWRhbHVwZSBTdCwgQXVzdGluLCBUWFwiLFxuICAgIFwibGF0XCI6IDMwLjMwMTU0MyxcbiAgICBcImxuZ1wiOiAtOTcuNzM5MTEyXG4gIH0sXG4gIHtcbiAgICBcIm5hbWVcIjogXCJGcmFuayAmIEFuZ2llJ3NcIixcbiAgICBcImFkZHJlc3NcIjogXCI1MDggV2VzdCBBdmUsIEF1c3RpbiwgVFhcIixcbiAgICBcImxhdFwiOiAzMC4yNjkzOTMsXG4gICAgXCJsbmdcIjogLTk3Ljc1MDg4OVxuICB9LFxuICB7XG4gICAgXCJuYW1lXCI6IFwiUGl6emVyaWEgQmlhbmNvXCIsXG4gICAgXCJhZGRyZXNzXCI6IFwiNjIzIEUgQWRhbXMgU3QsIFBob2VuaXgsIEFaXCIsXG4gICAgXCJsYXRcIjogMzMuNDQ5Mzc3LFxuICAgIFwibG5nXCI6IC0xMTIuMDY1NTIxXG4gIH0sXG4gIHtcbiAgICBcIm5hbWVcIjogXCJTYW1teSdzIFdvb2RmaXJlZCBQaXp6YVwiLFxuICAgIFwiYWRkcmVzc1wiOiBcIjc3MCA0dGggQXZlLCBTYW4gRGllZ28sIENBXCIsXG4gICAgXCJsYXRcIjogMzIuNzEzMzgyLFxuICAgIFwibG5nXCI6IC0xMTcuMTYxMThcbiAgfSxcbiAge1xuICAgIFwibmFtZVwiOiBcIkNhc2EgQmlhbmNhIFBpenphIFBpZVwiLFxuICAgIFwiYWRkcmVzc1wiOiBcIjE2NTAgQ29sb3JhZG8gQmx2ZCwgTG9zIEFuZ2VsZXMsIENBXCIsXG4gICAgXCJsYXRcIjogMzQuMTM5MTU5LFxuICAgIFwibG5nXCI6IC0xMTguMjA0NjA4XG4gIH0sXG4gIHtcbiAgICBcIm5hbWVcIjogXCJQYXJrd2F5IEdyaWxsXCIsXG4gICAgXCJhZGRyZXNzXCI6IFwiNTEwIFMgQXJyb3lvIFBrd3ksIFBhc2FkZW5hLCBDQVwiLFxuICAgIFwibGF0XCI6IDM0LjEzNzAwMyxcbiAgICBcImxuZ1wiOiAtMTE4LjE0NzMwM1xuICB9LFxuICB7XG4gICAgXCJuYW1lXCI6IFwiQ2FsaWZvcm5pYSBQaXp6YSBLaXRjaGVuXCIsXG4gICAgXCJhZGRyZXNzXCI6IFwiMzMwIFMgSG9wZSBTdCwgTG9zIEFuZ2VsZXMsIENBXCIsXG4gICAgXCJsYXRcIjogMzQuMDUzMzMsXG4gICAgXCJsbmdcIjogLTExOC4yNTI2ODNcbiAgfSxcbiAge1xuICAgIFwibmFtZVwiOiBcIkIgSidzIFBpenphICYgR3JpbGxcIixcbiAgICBcImFkZHJlc3NcIjogXCIyMDAgTWFpbiBTdCAjIDEwMSwgSHVudGluZ3RvbiBCZWFjaCwgQ0FcIixcbiAgICBcImxhdFwiOiAzMy42NTgwNTgsXG4gICAgXCJsbmdcIjogLTExOC4wMDExMDFcbiAgfSxcbiAge1xuICAgIFwibmFtZVwiOiBcIkIgSidzIFJlc3RhdXJhbnQgJiBCcmV3aG91c2VcIixcbiAgICBcImFkZHJlc3NcIjogXCIyODAgUyBDb2FzdCBId3ksIExhZ3VuYSBCZWFjaCwgQ0FcIixcbiAgICBcImxhdFwiOiAzMy41NDIwOSxcbiAgICBcImxuZ1wiOiAtMTE3Ljc4MzUxNlxuICB9LFxuICB7XG4gICAgXCJuYW1lXCI6IFwiQmVhdSBKbydzIFBpenphXCIsXG4gICAgXCJhZGRyZXNzXCI6IFwiMjcxMCBTIENvbG9yYWRvIEJsdmQsIERlbnZlciwgQ09cIixcbiAgICBcImxhdFwiOiAzOS42NjczNDIsXG4gICAgXCJsbmdcIjogLTEwNC45NDA3MDhcbiAgfSxcbiAge1xuICAgIFwibmFtZVwiOiBcIlBhc3F1aW5pJ3MgUGl6emVyaWFcIixcbiAgICBcImFkZHJlc3NcIjogXCIxMzEwIFMgQnJvYWR3YXksIERlbnZlciwgQ09cIixcbiAgICBcImxhdFwiOiAzOS42OTI4MjQsXG4gICAgXCJsbmdcIjogLTEwNC45ODc0NjNcbiAgfSxcbiAge1xuICAgIFwibmFtZVwiOiBcIkZhcmdvcyBQaXp6YSBDb1wiLFxuICAgIFwiYWRkcmVzc1wiOiBcIjI5MTAgRSBQbGF0dGUgQXZlLCBDb2xvcmFkbyBTcHJpbmdzLCBDT1wiLFxuICAgIFwibGF0XCI6IDM4LjgzOTg0NyxcbiAgICBcImxuZ1wiOiAtMTA0Ljc3NDQyM1xuICB9LFxuICB7XG4gICAgXCJuYW1lXCI6IFwiT2xkIENoaWNhZ29cIixcbiAgICBcImFkZHJlc3NcIjogXCIxNDE1IE1hcmtldCBTdCwgRGVudmVyLCBDT1wiLFxuICAgIFwibGF0XCI6IDM5Ljc0ODE3NyxcbiAgICBcImxuZ1wiOiAtMTA1LjAwMDUwMVxuICB9LFxuICB7XG4gICAgXCJuYW1lXCI6IFwiU2lua1wiLFxuICAgIFwiYWRkcmVzc1wiOiBcIjExNjUgMTN0aCBTdCwgQm91bGRlciwgQ09cIixcbiAgICBcImxhdFwiOiA0MC4wMDgyMSxcbiAgICBcImxuZ1wiOiAtMTA1LjI3NjIzNlxuICB9LFxuICB7XG4gICAgXCJuYW1lXCI6IFwiTGlnb3JpJ3MgUGl6emEgJiBQYXN0YVwiLFxuICAgIFwiYWRkcmVzc1wiOiBcIjQ0MjEgSGFycmlzb24gQmx2ZCwgT2dkZW4sIFVUXCIsXG4gICAgXCJsYXRcIjogNDEuMTgyNzMyLFxuICAgIFwibG5nXCI6IC0xMTEuOTQ5MTk5XG4gIH0sXG4gIHtcbiAgICBcIm5hbWVcIjogXCJPbGQgQ2hpY2Fnb1wiLFxuICAgIFwiYWRkcmVzc1wiOiBcIjExMDIgUGVhcmwgU3QsIEJvdWxkZXIsIENPXCIsXG4gICAgXCJsYXRcIjogNDAuMDE3NTkxLFxuICAgIFwibG5nXCI6IC0xMDUuMjgwOTlcbiAgfSxcbiAge1xuICAgIFwibmFtZVwiOiBcIkJvc3RvbidzIFJlc3RhdXJhbnQgJiBTcG9ydHNcIixcbiAgICBcImFkZHJlc3NcIjogXCI2MjAgRSBEaXNrIERyLCBSYXBpZCBDaXR5LCBTRFwiLFxuICAgIFwibGF0XCI6IDQ0LjEwNjkzOCxcbiAgICBcImxuZ1wiOiAtMTAzLjIwNTIyNlxuICB9LFxuICB7XG4gICAgXCJuYW1lXCI6IFwiQ2h1Y2sgRSBDaGVlc2UncyBQaXp6YVwiLFxuICAgIFwiYWRkcmVzc1wiOiBcIjEwMCAyNHRoIFN0IFcgIyBCLCBCaWxsaW5ncywgTVRcIixcbiAgICBcImxhdFwiOiA0NS43NzEzNTUsXG4gICAgXCJsbmdcIjogLTEwOC41NzYyOVxuICB9LFxuICB7XG4gICAgXCJuYW1lXCI6IFwiU3BhY2UgQWxpZW5zIEdyaWxsICYgQmFyXCIsXG4gICAgXCJhZGRyZXNzXCI6IFwiMTMwNCBFIENlbnR1cnkgQXZlLCBCaXNtYXJjaywgTkRcIixcbiAgICBcImxhdFwiOiA0Ni44MzgwOCxcbiAgICBcImxuZ1wiOiAtMTAwLjc3MTczNFxuICB9LFxuICB7XG4gICAgXCJuYW1lXCI6IFwiMm5kIFN0cmVldCBCaXN0cm9cIixcbiAgICBcImFkZHJlc3NcIjogXCIxMjMgTm9ydGggMm5kIFN0cmVldCwgTGl2aW5nc3RvbiwgTVRcIixcbiAgICBcImxhdFwiOiA0NS42NjEwMTQsXG4gICAgXCJsbmdcIjogLTExMC41NjE0MjJcbiAgfSxcbiAge1xuICAgIFwibmFtZVwiOiBcIkRvbWlubydzIFBpenphXCIsXG4gICAgXCJhZGRyZXNzXCI6IFwiMTUyNCBTIEJyb2Fkd2F5ICMgMSwgTWlub3QsIE5EXCIsXG4gICAgXCJsYXRcIjogNDguMjE5NjU3LFxuICAgIFwibG5nXCI6IC0xMDEuMjk2MDM3XG4gIH0sXG4gIHtcbiAgICBcIm5hbWVcIjogXCJBbWVyaWNhbiBDbGFzc2ljIFBpenplcmlhXCIsXG4gICAgXCJhZGRyZXNzXCI6IFwiMTc0NCBHcmFuZCBBdmUsIEJpbGxpbmdzLCBNVFwiLFxuICAgIFwibGF0XCI6IDQ1Ljc4NDEyLFxuICAgIFwibG5nXCI6IC0xMDguNTYwMjA1XG4gIH0sXG4gIHtcbiAgICBcIm5hbWVcIjogXCJHb2RmYXRoZXIncyBQaXp6YVwiLFxuICAgIFwiYWRkcmVzc1wiOiBcIjkwNSBNYWluIFN0LCBCaWxsaW5ncywgTVRcIixcbiAgICBcImxhdFwiOiA0NS44MTUwOCxcbiAgICBcImxuZ1wiOiAtMTA4LjQ3MDc1OFxuICB9LFxuICB7XG4gICAgXCJuYW1lXCI6IFwiUGFwYSBKb2huJ3MgUGl6emFcIixcbiAgICBcImFkZHJlc3NcIjogXCI2MDUgTWFpbiBTdCwgQmlsbGluZ3MsIE1UXCIsXG4gICAgXCJsYXRcIjogNDUuODEwMjIyLFxuICAgIFwibG5nXCI6IC0xMDguNDcyMTI1XG4gIH0sXG4gIHtcbiAgICBcIm5hbWVcIjogXCJBYXJkdmFyayBQaXp6YSAmIFN1YlwiLFxuICAgIFwiYWRkcmVzc1wiOiBcIjMwNEEgQ2FyaWJvdSBTdCwgQmFuZmYsIEFCXCIsXG4gICAgXCJsYXRcIjogNTEuMTc2NDg4LFxuICAgIFwibG5nXCI6IC0xMTUuNTcwNzUxXG4gIH0sXG4gIHtcbiAgICBcIm5hbWVcIjogXCJKYXNwZXIgUGl6emEgUGxhY2VcIixcbiAgICBcImFkZHJlc3NcIjogXCI0MDIgQ29ubmF1Z2h0IERyLCBKYXNwZXIsIEFCXCIsXG4gICAgXCJsYXRcIjogNTIuODc5MDg1LFxuICAgIFwibG5nXCI6IC0xMTguMDc5MzE5XG4gIH0sXG4gIHtcbiAgICBcIm5hbWVcIjogXCJPZHlzc2V5IFBpenphICYgU3RlYWsgSG91c2VcIixcbiAgICBcImFkZHJlc3NcIjogXCIzLTM4MTQgQm93IFRyYWlsIFNXLCBDYWxnYXJ5LCBBQlwiLFxuICAgIFwibGF0XCI6IDUxLjA0NTIzMyxcbiAgICBcImxuZ1wiOiAtMTE0LjE0MTI0OVxuICB9LFxuICB7XG4gICAgXCJuYW1lXCI6IFwiQmFzaWwncyBQaXp6YVwiLFxuICAgIFwiYWRkcmVzc1wiOiBcIjIxMTggMzMgQXZlbnVlIFNXLCBDYWxnYXJ5LCBBQlwiLFxuICAgIFwibGF0XCI6IDUxLjAyMzk4MSxcbiAgICBcImxuZ1wiOiAtMTE0LjEwOTkwM1xuICB9LFxuICB7XG4gICAgXCJuYW1lXCI6IFwiQ2FzdGxlIFBpenphICYgRG9uYWlyXCIsXG4gICAgXCJhZGRyZXNzXCI6IFwiNzcyNCBFbGJvdyBEcml2ZSBTVywgQ2FsZ2FyeSwgQUJcIixcbiAgICBcImxhdFwiOiA1MC45ODQ0OTcsXG4gICAgXCJsbmdcIjogLTExNC4wODMxNVxuICB9LFxuICB7XG4gICAgXCJuYW1lXCI6IFwiU2FudGEgTHVjaWEgSXRhbGlhbiBSZXN0YXVyYW50XCIsXG4gICAgXCJhZGRyZXNzXCI6IFwiNzE0IDggU3QsIENhbm1vcmUsIEFCXCIsXG4gICAgXCJsYXRcIjogNTEuMDg5MTk1LFxuICAgIFwibG5nXCI6IC0xMTUuMzU4NzMzXG4gIH0sXG4gIHtcbiAgICBcIm5hbWVcIjogXCJUb3BzIFBpenphICYgU3RlYWsgSG91c2UgTm8gM1wiLFxuICAgIFwiYWRkcmVzc1wiOiBcIjctNTYwMiA0IFN0cmVldCBOVywgQ2FsZ2FyeSwgQUJcIixcbiAgICBcImxhdFwiOiA1MS4xMDEyMDUsXG4gICAgXCJsbmdcIjogLTExNC4wNzE0NThcbiAgfSxcbiAge1xuICAgIFwibmFtZVwiOiBcIkV2dmlhIFJlc3RhdXJhbnRcIixcbiAgICBcImFkZHJlc3NcIjogXCI4MzcgTWFpbiBTdCwgQ2FubW9yZSwgQUJcIixcbiAgICBcImxhdFwiOiA1MS4wODkxNzcsXG4gICAgXCJsbmdcIjogLTExNS4zNjE3NjdcbiAgfSxcbiAge1xuICAgIFwibmFtZVwiOiBcIkQmIzM5O0Jyb254XCIsXG4gICAgXCJhZGRyZXNzXCI6IFwiMzkwNCBCZWxsIFN0LCBLYW5zYXMgQ2l0eSwgTU9cIixcbiAgICBcImxhdFwiOiAzOS4wNTcxODIsXG4gICAgXCJsbmdcIjogLTk0LjYwNjEwNVxuICB9LFxuICB7XG4gICAgXCJuYW1lXCI6IFwiQ2ljZXJvJ3MgUmVzdGF1cmFudCAmIEVudHJ0bm10XCIsXG4gICAgXCJhZGRyZXNzXCI6IFwiNjY5MSBEZWxtYXIgQmx2ZCwgU3QgTG91aXMsIE1PXCIsXG4gICAgXCJsYXRcIjogMzguNjU2MzA4LFxuICAgIFwibG5nXCI6IC05MC4zMDg0MzlcbiAgfSxcbiAge1xuICAgIFwibmFtZVwiOiBcIkhpZGVhd2F5IFBpenphXCIsXG4gICAgXCJhZGRyZXNzXCI6IFwiNjYxNiBOIFdlc3Rlcm4gQXZlLCBPa2xhaG9tYSBDaXR5LCBPS1wiLFxuICAgIFwibGF0XCI6IDM1LjUzOTExNCxcbiAgICBcImxuZ1wiOiAtOTcuNTI5NzZcbiAgfSxcbiAge1xuICAgIFwibmFtZVwiOiBcIkZvcnRlbCdzIFBpenphIERlblwiLFxuICAgIFwiYWRkcmVzc1wiOiBcIjc5MzIgTWFja2VuemllIFJkLCBTdCBMb3VpcywgTU9cIixcbiAgICBcImxhdFwiOiAzOC41NjY0NDEsXG4gICAgXCJsbmdcIjogLTkwLjMyMDc5MlxuICB9LFxuICB7XG4gICAgXCJuYW1lXCI6IFwiSGlkZWF3YXkgUGl6emFcIixcbiAgICBcImFkZHJlc3NcIjogXCI3ODc3IEUgNTFzdCBTdCwgVHVsc2EsIE9LXCIsXG4gICAgXCJsYXRcIjogMzYuMDg5ODk3LFxuICAgIFwibG5nXCI6IC05NS44ODkyNDFcbiAgfSxcbiAge1xuICAgIFwibmFtZVwiOiBcIkZhcm90dG8ncyBDYXRlcmluZ1wiLFxuICAgIFwiYWRkcmVzc1wiOiBcIjk1MjUgTWFuY2hlc3RlciBSZCwgV2Vic3RlciBHcm92ZXMsIE1PXCIsXG4gICAgXCJsYXRcIjogMzguNjA5MzI3LFxuICAgIFwibG5nXCI6IC05MC4zNjQ0MzVcbiAgfSxcbiAge1xuICAgIFwibmFtZVwiOiBcIkNhbGlmb3JuaWEgUGl6emEgS2l0Y2hlblwiLFxuICAgIFwiYWRkcmVzc1wiOiBcIjE0OTMgU2FpbnQgTG91aXMgR2FsbGVyaWEsIFN0IExvdWlzLCBNT1wiLFxuICAgIFwibGF0XCI6IDM4LjYzMzYxMyxcbiAgICBcImxuZ1wiOiAtOTAuMzQ1OTQ5XG4gIH0sXG4gIHtcbiAgICBcIm5hbWVcIjogXCJEJ0Jyb254XCIsXG4gICAgXCJhZGRyZXNzXCI6IFwiMjQ1MCBHcmFuZCBCbHZkICMgMTI0LCBLYW5zYXMgQ2l0eSwgTU9cIixcbiAgICBcImxhdFwiOiAzOS4wODI3MjMsXG4gICAgXCJsbmdcIjogLTk0LjU4MTc4XG4gIH0sXG4gIHtcbiAgICBcIm5hbWVcIjogXCJHaXVzZXBwZSdzIERlcG90IFJlc3RhdXJhbnRcIixcbiAgICBcImFkZHJlc3NcIjogXCIxMCBTIFNpZXJyYSBNYWRyZSBTdCwgQ29sb3JhZG8gU3ByaW5ncywgQ09cIixcbiAgICBcImxhdFwiOiAzOC44MzQ1NDgsXG4gICAgXCJsbmdcIjogLTEwNC44MjgyOTdcbiAgfSxcbiAge1xuICAgIFwibmFtZVwiOiBcIk9sZCBDaGljYWdvXCIsXG4gICAgXCJhZGRyZXNzXCI6IFwiMTQxNSBNYXJrZXQgU3QsIERlbnZlciwgQ09cIixcbiAgICBcImxhdFwiOiAzOS43NDgxNzcsXG4gICAgXCJsbmdcIjogLTEwNS4wMDA1MDFcbiAgfSxcbiAge1xuICAgIFwibmFtZVwiOiBcIkJyaWNrIE92ZW4gUmVzdGF1cmFudFwiLFxuICAgIFwiYWRkcmVzc1wiOiBcIjExMSBFIDgwMCBOLCBQcm92bywgVVRcIixcbiAgICBcImxhdFwiOiA0MC4yNDQ0OTMsXG4gICAgXCJsbmdcIjogLTExMS42NTYzMjJcbiAgfSxcbiAge1xuICAgIFwibmFtZVwiOiBcIlphY2hhcnkncyBDaGljYWdvIFBpenphXCIsXG4gICAgXCJhZGRyZXNzXCI6IFwiNTgwMSBDb2xsZWdlIEF2ZSwgT2FrbGFuZCwgQ0FcIixcbiAgICBcImxhdFwiOiAzNy44NDYxNzksXG4gICAgXCJsbmdcIjogLTEyMi4yNTE5NTFcbiAgfSxcbiAge1xuICAgIFwibmFtZVwiOiBcIlphY2hhcnkncyBDaGljYWdvIFBpenphXCIsXG4gICAgXCJhZGRyZXNzXCI6IFwiMTg1MyBTb2xhbm8gQXZlLCBCZXJrZWxleSwgQ0FcIixcbiAgICBcImxhdFwiOiAzNy44OTE0MDcsXG4gICAgXCJsbmdcIjogLTEyMi4yNzg0M1xuICB9LFxuICB7XG4gICAgXCJuYW1lXCI6IFwiQ2hlZXNlIEJvYXJkIFBpenphXCIsXG4gICAgXCJhZGRyZXNzXCI6IFwiMTUxMiBTaGF0dHVjayBBdmUsIEJlcmtlbGV5LCBDQVwiLFxuICAgIFwibGF0XCI6IDM3Ljg3OTk3NixcbiAgICBcImxuZ1wiOiAtMTIyLjI2OTI3NVxuICB9LFxuICB7XG4gICAgXCJuYW1lXCI6IFwiR29hdCBIaWxsIFBpenphXCIsXG4gICAgXCJhZGRyZXNzXCI6IFwiMzAwIENvbm5lY3RpY3V0IFN0LCBTYW4gRnJhbmNpc2NvLCBDQVwiLFxuICAgIFwibGF0XCI6IDM3Ljc2MjQzMSxcbiAgICBcImxuZ1wiOiAtMTIyLjM5NzYxN1xuICB9LFxuICB7XG4gICAgXCJuYW1lXCI6IFwiVG9tbWFzbyBSaXN0b3JhbnRlIEl0YWxpYW5vXCIsXG4gICAgXCJhZGRyZXNzXCI6IFwiMTA0MiBLZWFybnkgU3QsIFNhbiBGcmFuY2lzY28sIENBXCIsXG4gICAgXCJsYXRcIjogMzcuNzk3Mzg4LFxuICAgIFwibG5nXCI6IC0xMjIuNDA1Mzc0XG4gIH0sXG4gIHtcbiAgICBcIm5hbWVcIjogXCJMaXR0bGUgU3RhciBQaXp6YSBMTENcIixcbiAgICBcImFkZHJlc3NcIjogXCI4NDYgRGl2aXNhZGVybyBTdCwgU2FuIEZyYW5jaXNjbywgQ0FcIixcbiAgICBcImxhdFwiOiAzNy43Nzc1MixcbiAgICBcImxuZ1wiOiAtMTIyLjQzODIxNVxuICB9LFxuICB7XG4gICAgXCJuYW1lXCI6IFwiUGF1bGluZSdzIFBpenphXCIsXG4gICAgXCJhZGRyZXNzXCI6IFwiMjYwIFZhbGVuY2lhLCBTYW4gRnJhbmNpc2NvLCBDQVwiLFxuICAgIFwibGF0XCI6IDM3Ljc2ODcyNSxcbiAgICBcImxuZ1wiOiAtMTIyLjQyMjI0NVxuICB9LFxuICB7XG4gICAgXCJuYW1lXCI6IFwiVmlsbGEgUm9tYW5hIFBpenplcmlhICYgUnN0cm50XCIsXG4gICAgXCJhZGRyZXNzXCI6IFwiNzMxIElydmluZyBTdCwgU2FuIEZyYW5jaXNjbywgQ0FcIixcbiAgICBcImxhdFwiOiAzNy43NjQwNzQsXG4gICAgXCJsbmdcIjogLTEyMi40NjU1ODFcbiAgfSxcbiAge1xuICAgIFwibmFtZVwiOiBcIkFtaWNpJ3MgRWFzdCBDb2FzdCBQaXp6ZXJpYVwiLFxuICAgIFwiYWRkcmVzc1wiOiBcIjY5IEUgM3JkIEF2ZSwgU2FuIE1hdGVvLCBDQVwiLFxuICAgIFwibGF0XCI6IDM3LjU2Mzg5NixcbiAgICBcImxuZ1wiOiAtMTIyLjMyNDcyXG4gIH0sXG4gIHtcbiAgICBcIm5hbWVcIjogXCJBbWljaSdzIEVhc3QgQ29hc3QgUGl6emVyaWFcIixcbiAgICBcImFkZHJlc3NcIjogXCIyMjYgUmVkd29vZCBTaG9yZXMgUGt3eSwgUmVkd29vZCBDaXR5LCBDQVwiLFxuICAgIFwibGF0XCI6IDM3LjUyMDUxNixcbiAgICBcImxuZ1wiOiAtMTIyLjI1MjI1NVxuICB9LFxuICB7XG4gICAgXCJuYW1lXCI6IFwiTm9ydGggQmVhY2ggUGl6emFcIixcbiAgICBcImFkZHJlc3NcIjogXCIyNDAgRSAzcmQgQXZlLCBTYW4gTWF0ZW8sIENBXCIsXG4gICAgXCJsYXRcIjogMzcuNTY1MzI1LFxuICAgIFwibG5nXCI6IC0xMjIuMzIyNjQzXG4gIH0sXG4gIHtcbiAgICBcIm5hbWVcIjogXCJQYXR4aSdzIENoaWNhZ28gUGl6emFcIixcbiAgICBcImFkZHJlc3NcIjogXCI0NDEgRW1lcnNvbiBTdCwgUGFsbyBBbHRvLCBDQVwiLFxuICAgIFwibGF0XCI6IDM3LjQ0NTE0OCxcbiAgICBcImxuZ1wiOiAtMTIyLjE2MzU1M1xuICB9LFxuICB7XG4gICAgXCJuYW1lXCI6IFwiUGl6eidhIENoaWNhZ29cIixcbiAgICBcImFkZHJlc3NcIjogXCI0MTE1IEVsIENhbWlubyBSZWFsLCBQYWxvIEFsdG8sIENBXCIsXG4gICAgXCJsYXRcIjogMzcuNDE0MTA2LFxuICAgIFwibG5nXCI6IC0xMjIuMTI2MjIzXG4gIH0sXG4gIHtcbiAgICBcIm5hbWVcIjogXCJDYWxpZm9ybmlhIFBpenphIEtpdGNoZW5cIixcbiAgICBcImFkZHJlc3NcIjogXCI1MzEgQ293cGVyIFN0LCBQYWxvIEFsdG8sIENBXCIsXG4gICAgXCJsYXRcIjogMzcuNDQ4MDc1LFxuICAgIFwibG5nXCI6IC0xMjIuMTU4ODEzXG4gIH0sXG4gIHtcbiAgICBcIm5hbWVcIjogXCJXaW5keSBDaXR5IFBpenphXCIsXG4gICAgXCJhZGRyZXNzXCI6IFwiMzUgQm92ZXQgUmQsIFNhbiBNYXRlbywgQ0FcIixcbiAgICBcImxhdFwiOiAzNy41NTE1NjIsXG4gICAgXCJsbmdcIjogLTEyMi4zMTQ1MjVcbiAgfSxcbiAge1xuICAgIFwibmFtZVwiOiBcIkFwcGxld29vZCBQaXp6YSAyIEdvXCIsXG4gICAgXCJhZGRyZXNzXCI6IFwiMTAwMSBFbCBDYW1pbm8gUmVhbCwgTWVubG8gUGFyaywgQ0FcIixcbiAgICBcImxhdFwiOiAzNy40NTI5NjYsXG4gICAgXCJsbmdcIjogLTEyMi4xODE3MjJcbiAgfSxcbiAge1xuICAgIFwibmFtZVwiOiBcIlBpenphIEFudGljYVwiLFxuICAgIFwiYWRkcmVzc1wiOiBcIjMzNCBTYW50YW5hIFJvdyAjIDEwNjUsIFNhbiBKb3NlLCBDQVwiLFxuICAgIFwibGF0XCI6IDM3LjMyMTc5MixcbiAgICBcImxuZ1wiOiAtMTIxLjk0NzczNVxuICB9LFxuICB7XG4gICAgXCJuYW1lXCI6IFwiUGl6eidhIENoaWNhZ29cIixcbiAgICBcImFkZHJlc3NcIjogXCIxNTUgVyBTYW4gRmVybmFuZG8gU3QsIFNhbiBKb3NlLCBDQVwiLFxuICAgIFwibGF0XCI6IDM3LjMzMzI3NyxcbiAgICBcImxuZ1wiOiAtMTIxLjg5MTY3N1xuICB9LFxuICB7XG4gICAgXCJuYW1lXCI6IFwiSG91c2Ugb2YgUGl6emFcIixcbiAgICBcImFkZHJlc3NcIjogXCI1MjcgUyBBbG1hZGVuIEF2ZSwgU2FuIEpvc2UsIENBXCIsXG4gICAgXCJsYXRcIjogMzcuMzI2MzUzLFxuICAgIFwibG5nXCI6IC0xMjEuODg4MTY1XG4gIH0sXG4gIHtcbiAgICBcIm5hbWVcIjogXCJBbWljaSdzIEVhc3QgQ29hc3QgUGl6emVyaWFcIixcbiAgICBcImFkZHJlc3NcIjogXCIyMjUgVyBTYW50YSBDbGFyYSBTdCwgU2FuIEpvc2UsIENBXCIsXG4gICAgXCJsYXRcIjogMzcuMzM0NzAyLFxuICAgIFwibG5nXCI6IC0xMjEuODk0MDQ1XG4gIH0sXG4gIHtcbiAgICBcIm5hbWVcIjogXCJGaW9yaWxsbydzIFJlc3RhdXJhbnRcIixcbiAgICBcImFkZHJlc3NcIjogXCI2MzggRWwgQ2FtaW5vIFJlYWwsIFNhbnRhIENsYXJhLCBDQVwiLFxuICAgIFwibGF0XCI6IDM3LjM1NDYwMyxcbiAgICBcImxuZ1wiOiAtMTIxLjk0MjU3N1xuICB9LFxuICB7XG4gICAgXCJuYW1lXCI6IFwiVG9ueSAmIEFsYmEncyBQaXp6YSAmIFBhc3RhXCIsXG4gICAgXCJhZGRyZXNzXCI6IFwiMzEzNyBTdGV2ZW5zIENyZWVrIEJsdmQsIFNhbiBKb3NlLCBDQVwiLFxuICAgIFwibGF0XCI6IDM3LjMyMzI5NyxcbiAgICBcImxuZ1wiOiAtMTIxLjk1MTY0NlxuICB9LFxuICB7XG4gICAgXCJuYW1lXCI6IFwiR2lvcmdpbydzXCIsXG4gICAgXCJhZGRyZXNzXCI6IFwiMTQ0NSBGb3h3b3J0aHkgQXZlLCBTYW4gSm9zZSwgQ0FcIixcbiAgICBcImxhdFwiOiAzNy4yNzQ2NDgsXG4gICAgXCJsbmdcIjogLTEyMS44OTI4OTNcbiAgfSxcbiAge1xuICAgIFwibmFtZVwiOiBcIlJvdW5kIFRhYmxlIFBpenphXCIsXG4gICAgXCJhZGRyZXNzXCI6IFwiNDMwMiBNb29ycGFyayBBdmUsIFNhbiBKb3NlLCBDQVwiLFxuICAgIFwibGF0XCI6IDM3LjMxNTkwMyxcbiAgICBcImxuZ1wiOiAtMTIxLjk3NzkyNVxuICB9XG5dXG4iXX0=
