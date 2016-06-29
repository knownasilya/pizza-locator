(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _templateObject = _taggedTemplateLiteral(['\n    <directions-panel>\n    </directions-panel>\n  '], ['\n    <directions-panel>\n    </directions-panel>\n  ']);

exports.default = directionsPanelView;

var _choo = require('choo');

var _choo2 = _interopRequireDefault(_choo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var html = _choo2.default.view;
function directionsPanelView(params, state, send) {
  var tree = html(_templateObject);

  return tree;
}

},{"choo":14}],2:[function(require,module,exports){
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
    if (!store.marker) {
      store.marker = new google.maps.Marker({
        position: { lat: store.lat, lng: store.lng },
        title: store.name,
        label: 'P'
      });
      store.marker.addListener('click', function () {
        return send('stores:select', { payload: store });
      });
    }
  });

  stores.forEach(function (store) {
    return store.marker.setMap(map);
  });
  setTimeout(function () {
    google.maps.event.trigger(map, 'resize');
  }, 500);
  state.stores.map = map;
}

},{"../map-styles.json":6,"choo":14,"on-load":36}],3:[function(require,module,exports){
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

},{"./user-location":4,"choo":14}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _templateObject = _taggedTemplateLiteral(['\n    <p>\n      ', '\n      <br>\n      <label>\n        Distance: <input type="number" value=', ' oninput=', ' placeholder="distance (miles)">\n      </label>\n    </p>\n  '], ['\n    <p>\n      ', '\n      <br>\n      <label>\n        Distance: <input type="number" value=', ' oninput=', ' placeholder="distance (miles)">\n      </label>\n    </p>\n  ']);

exports.default = userLocationView;

var _choo = require('choo');

var _choo2 = _interopRequireDefault(_choo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var html = _choo2.default.view;
function userLocationView(params, state, send) {
  var tree = html(_templateObject, state.stores.location ? 'You are located at: ' + state.stores.location : '', state.stores.distance, function (e) {
    return send('stores:showClosest', { distance: e.target.value });
  });

  return tree;
}

},{"choo":14}],5:[function(require,module,exports){
'use strict';

var _templateObject = _taggedTemplateLiteral(['\n    <main class="app">\n      ', '\n      ', '\n      ', '\n    </main>\n  '], ['\n    <main class="app">\n      ', '\n      ', '\n      ', '\n    </main>\n  ']);

var _choo = require('choo');

var _choo2 = _interopRequireDefault(_choo);

var _javascriptNaturalSort = require('javascript-natural-sort');

var _javascriptNaturalSort2 = _interopRequireDefault(_javascriptNaturalSort);

var _async = require('async');

var _async2 = _interopRequireDefault(_async);

var _stores = require('./stores');

var _stores2 = _interopRequireDefault(_stores);

var _googleMap = require('./components/google-map');

var _googleMap2 = _interopRequireDefault(_googleMap);

var _sideBar = require('./components/side-bar');

var _sideBar2 = _interopRequireDefault(_sideBar);

var _directionsPanel = require('./components/directions-panel');

var _directionsPanel2 = _interopRequireDefault(_directionsPanel);

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
var geocoded = false;

app.model({
  namespace: 'stores',
  state: {
    visibleStores: _stores2.default.sort(function (a, b) {
      return (0, _javascriptNaturalSort2.default)(a.name, b.name);
    }),
    userLocation: { lat: 42.33012354634199, lng: -70.95623016357422 },
    location: '',
    distance: 100,
    directions: false
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
      if (action.location) {
        state.userLocation = action.location.toJSON();
      }
      return state;
    },
    updateLocation: function updateLocation(action, state) {
      state.location = action.location;
      return state;
    },
    updateDistance: function updateDistance(action, state) {
      state.distance = action.payload;
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
      if (action.distance) {
        send('stores:updateDistance', { payload: action.distance });
        state.distance = action.distance;
      }

      navigator.geolocation.getCurrentPosition(function (position) {
        var userLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        var closest = _stores2.default.map(function (store) {
          var distance = computeDistanceBetween(new google.maps.LatLng(store.lat, store.lng), userLocation);
          // convert meters to miles, rounded up
          store.distance = Math.ceil(distance * 0.000621371);
          return store;
        }).filter(function (store) {
          return store.distance < state.distance;
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
  if (!geocoded) {
    _async2.default.map(state.stores.visibleStores, geocodeStore, function (err, results) {
      if (err) {
        return console.warn(err);
      }
      geocoded = true;
      send('stores:updateVisible', { payload: results });
    });
  }

  return _choo2.default.view(_templateObject, (0, _googleMap2.default)(params, state, send), state.stores.directions ? (0, _directionsPanel2.default)(params, state, send) : '', (0, _sideBar2.default)(params, state, send));
};

function geocodeStore(store, cb) {
  setTimeout(function () {
    geocoder.geocode({ address: store.address }, function (results, status) {
      cb(status === 'OK' ? undefined : status, results && results.length ? results[0].geometry.location : undefined);
    });
  }, 50);
}

app.router(function (route) {
  return [route('/', mainView)];
});

var tree = app.start();

document.body.appendChild(tree);

},{"./components/directions-panel":1,"./components/google-map":2,"./components/side-bar":3,"./stores":39,"async":7,"choo":14,"javascript-natural-sort":35}],6:[function(require,module,exports){
module.exports=[{"featureType":"all","elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#000000"},{"lightness":40}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#000000"},{"lightness":16}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":17},{"weight":1.2}]},{"featureType":"administrative.locality","elementType":"labels.text.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":21}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":16}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":19}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":17}]}]

},{}],7:[function(require,module,exports){
(function (process,global){
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (factory((global.async = global.async || {})));
}(this, function (exports) { 'use strict';

    /**
     * A faster alternative to `Function#apply`, this function invokes `func`
     * with the `this` binding of `thisArg` and the arguments of `args`.
     *
     * @private
     * @param {Function} func The function to invoke.
     * @param {*} thisArg The `this` binding of `func`.
     * @param {Array} args The arguments to invoke `func` with.
     * @returns {*} Returns the result of `func`.
     */
    function apply(func, thisArg, args) {
      var length = args.length;
      switch (length) {
        case 0: return func.call(thisArg);
        case 1: return func.call(thisArg, args[0]);
        case 2: return func.call(thisArg, args[0], args[1]);
        case 3: return func.call(thisArg, args[0], args[1], args[2]);
      }
      return func.apply(thisArg, args);
    }

    /**
     * Checks if `value` is the
     * [language type](http://www.ecma-international.org/ecma-262/6.0/#sec-ecmascript-language-types)
     * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an object, else `false`.
     * @example
     *
     * _.isObject({});
     * // => true
     *
     * _.isObject([1, 2, 3]);
     * // => true
     *
     * _.isObject(_.noop);
     * // => true
     *
     * _.isObject(null);
     * // => false
     */
    function isObject(value) {
      var type = typeof value;
      return !!value && (type == 'object' || type == 'function');
    }

    var funcTag = '[object Function]';
    var genTag = '[object GeneratorFunction]';
    /** Used for built-in method references. */
    var objectProto = Object.prototype;

    /**
     * Used to resolve the
     * [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
     * of values.
     */
    var objectToString = objectProto.toString;

    /**
     * Checks if `value` is classified as a `Function` object.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is correctly classified,
     *  else `false`.
     * @example
     *
     * _.isFunction(_);
     * // => true
     *
     * _.isFunction(/abc/);
     * // => false
     */
    function isFunction(value) {
      // The use of `Object#toString` avoids issues with the `typeof` operator
      // in Safari 8 which returns 'object' for typed array and weak map constructors,
      // and PhantomJS 1.9 which returns 'function' for `NodeList` instances.
      var tag = isObject(value) ? objectToString.call(value) : '';
      return tag == funcTag || tag == genTag;
    }

    /**
     * Checks if `value` is object-like. A value is object-like if it's not `null`
     * and has a `typeof` result of "object".
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
     * @example
     *
     * _.isObjectLike({});
     * // => true
     *
     * _.isObjectLike([1, 2, 3]);
     * // => true
     *
     * _.isObjectLike(_.noop);
     * // => false
     *
     * _.isObjectLike(null);
     * // => false
     */
    function isObjectLike(value) {
      return !!value && typeof value == 'object';
    }

    /** `Object#toString` result references. */
    var symbolTag = '[object Symbol]';

    /** Used for built-in method references. */
    var objectProto$1 = Object.prototype;

    /**
     * Used to resolve the
     * [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
     * of values.
     */
    var objectToString$1 = objectProto$1.toString;

    /**
     * Checks if `value` is classified as a `Symbol` primitive or object.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is correctly classified,
     *  else `false`.
     * @example
     *
     * _.isSymbol(Symbol.iterator);
     * // => true
     *
     * _.isSymbol('abc');
     * // => false
     */
    function isSymbol(value) {
      return typeof value == 'symbol' ||
        (isObjectLike(value) && objectToString$1.call(value) == symbolTag);
    }

    /** Used as references for various `Number` constants. */
    var NAN = 0 / 0;

    /** Used to match leading and trailing whitespace. */
    var reTrim = /^\s+|\s+$/g;

    /** Used to detect bad signed hexadecimal string values. */
    var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

    /** Used to detect binary string values. */
    var reIsBinary = /^0b[01]+$/i;

    /** Used to detect octal string values. */
    var reIsOctal = /^0o[0-7]+$/i;

    /** Built-in method references without a dependency on `root`. */
    var freeParseInt = parseInt;

    /**
     * Converts `value` to a number.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to process.
     * @returns {number} Returns the number.
     * @example
     *
     * _.toNumber(3.2);
     * // => 3.2
     *
     * _.toNumber(Number.MIN_VALUE);
     * // => 5e-324
     *
     * _.toNumber(Infinity);
     * // => Infinity
     *
     * _.toNumber('3.2');
     * // => 3.2
     */
    function toNumber(value) {
      if (typeof value == 'number') {
        return value;
      }
      if (isSymbol(value)) {
        return NAN;
      }
      if (isObject(value)) {
        var other = isFunction(value.valueOf) ? value.valueOf() : value;
        value = isObject(other) ? (other + '') : other;
      }
      if (typeof value != 'string') {
        return value === 0 ? value : +value;
      }
      value = value.replace(reTrim, '');
      var isBinary = reIsBinary.test(value);
      return (isBinary || reIsOctal.test(value))
        ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
        : (reIsBadHex.test(value) ? NAN : +value);
    }

    var INFINITY = 1 / 0;
    var MAX_INTEGER = 1.7976931348623157e+308;
    /**
     * Converts `value` to a finite number.
     *
     * @static
     * @memberOf _
     * @since 4.12.0
     * @category Lang
     * @param {*} value The value to convert.
     * @returns {number} Returns the converted number.
     * @example
     *
     * _.toFinite(3.2);
     * // => 3.2
     *
     * _.toFinite(Number.MIN_VALUE);
     * // => 5e-324
     *
     * _.toFinite(Infinity);
     * // => 1.7976931348623157e+308
     *
     * _.toFinite('3.2');
     * // => 3.2
     */
    function toFinite(value) {
      if (!value) {
        return value === 0 ? value : 0;
      }
      value = toNumber(value);
      if (value === INFINITY || value === -INFINITY) {
        var sign = (value < 0 ? -1 : 1);
        return sign * MAX_INTEGER;
      }
      return value === value ? value : 0;
    }

    /**
     * Converts `value` to an integer.
     *
     * **Note:** This method is loosely based on
     * [`ToInteger`](http://www.ecma-international.org/ecma-262/6.0/#sec-tointeger).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to convert.
     * @returns {number} Returns the converted integer.
     * @example
     *
     * _.toInteger(3.2);
     * // => 3
     *
     * _.toInteger(Number.MIN_VALUE);
     * // => 0
     *
     * _.toInteger(Infinity);
     * // => 1.7976931348623157e+308
     *
     * _.toInteger('3.2');
     * // => 3
     */
    function toInteger(value) {
      var result = toFinite(value),
          remainder = result % 1;

      return result === result ? (remainder ? result - remainder : result) : 0;
    }

    /** Used as the `TypeError` message for "Functions" methods. */
    var FUNC_ERROR_TEXT = 'Expected a function';

    /* Built-in method references for those with the same name as other `lodash` methods. */
    var nativeMax = Math.max;

    /**
     * Creates a function that invokes `func` with the `this` binding of the
     * created function and arguments from `start` and beyond provided as
     * an array.
     *
     * **Note:** This method is based on the
     * [rest parameter](https://mdn.io/rest_parameters).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Function
     * @param {Function} func The function to apply a rest parameter to.
     * @param {number} [start=func.length-1] The start position of the rest parameter.
     * @returns {Function} Returns the new function.
     * @example
     *
     * var say = _.rest(function(what, names) {
     *   return what + ' ' + _.initial(names).join(', ') +
     *     (_.size(names) > 1 ? ', & ' : '') + _.last(names);
     * });
     *
     * say('hello', 'fred', 'barney', 'pebbles');
     * // => 'hello fred, barney, & pebbles'
     */
    function rest(func, start) {
      if (typeof func != 'function') {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      start = nativeMax(start === undefined ? (func.length - 1) : toInteger(start), 0);
      return function() {
        var args = arguments,
            index = -1,
            length = nativeMax(args.length - start, 0),
            array = Array(length);

        while (++index < length) {
          array[index] = args[start + index];
        }
        switch (start) {
          case 0: return func.call(this, array);
          case 1: return func.call(this, args[0], array);
          case 2: return func.call(this, args[0], args[1], array);
        }
        var otherArgs = Array(start + 1);
        index = -1;
        while (++index < start) {
          otherArgs[index] = args[index];
        }
        otherArgs[start] = array;
        return apply(func, this, otherArgs);
      };
    }

    function initialParams (fn) {
        return rest(function (args /*..., callback*/) {
            var callback = args.pop();
            fn.call(this, args, callback);
        });
    }

    function applyEach$1(eachfn) {
        return rest(function (fns, args) {
            var go = initialParams(function (args, callback) {
                var that = this;
                return eachfn(fns, function (fn, cb) {
                    fn.apply(that, args.concat([cb]));
                }, callback);
            });
            if (args.length) {
                return go.apply(this, args);
            } else {
                return go;
            }
        });
    }

    /**
     * A method that returns `undefined`.
     *
     * @static
     * @memberOf _
     * @since 2.3.0
     * @category Util
     * @example
     *
     * _.times(2, _.noop);
     * // => [undefined, undefined]
     */
    function noop() {
      // No operation performed.
    }

    function once(fn) {
        return function () {
            if (fn === null) return;
            var callFn = fn;
            fn = null;
            callFn.apply(this, arguments);
        };
    }

    /**
     * The base implementation of `_.property` without support for deep paths.
     *
     * @private
     * @param {string} key The key of the property to get.
     * @returns {Function} Returns the new accessor function.
     */
    function baseProperty(key) {
      return function(object) {
        return object == null ? undefined : object[key];
      };
    }

    /**
     * Gets the "length" property value of `object`.
     *
     * **Note:** This function is used to avoid a
     * [JIT bug](https://bugs.webkit.org/show_bug.cgi?id=142792) that affects
     * Safari on at least iOS 8.1-8.3 ARM64.
     *
     * @private
     * @param {Object} object The object to query.
     * @returns {*} Returns the "length" value.
     */
    var getLength = baseProperty('length');

    /** Used as references for various `Number` constants. */
    var MAX_SAFE_INTEGER = 9007199254740991;

    /**
     * Checks if `value` is a valid array-like length.
     *
     * **Note:** This function is loosely based on
     * [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a valid length,
     *  else `false`.
     * @example
     *
     * _.isLength(3);
     * // => true
     *
     * _.isLength(Number.MIN_VALUE);
     * // => false
     *
     * _.isLength(Infinity);
     * // => false
     *
     * _.isLength('3');
     * // => false
     */
    function isLength(value) {
      return typeof value == 'number' &&
        value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
    }

    /**
     * Checks if `value` is array-like. A value is considered array-like if it's
     * not a function and has a `value.length` that's an integer greater than or
     * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
     * @example
     *
     * _.isArrayLike([1, 2, 3]);
     * // => true
     *
     * _.isArrayLike(document.body.children);
     * // => true
     *
     * _.isArrayLike('abc');
     * // => true
     *
     * _.isArrayLike(_.noop);
     * // => false
     */
    function isArrayLike(value) {
      return value != null && isLength(getLength(value)) && !isFunction(value);
    }

    var iteratorSymbol = typeof Symbol === 'function' && Symbol.iterator;

    function getIterator (coll) {
        return iteratorSymbol && coll[iteratorSymbol] && coll[iteratorSymbol]();
    }

    /* Built-in method references for those with the same name as other `lodash` methods. */
    var nativeGetPrototype = Object.getPrototypeOf;

    /**
     * Gets the `[[Prototype]]` of `value`.
     *
     * @private
     * @param {*} value The value to query.
     * @returns {null|Object} Returns the `[[Prototype]]`.
     */
    function getPrototype(value) {
      return nativeGetPrototype(Object(value));
    }

    /** Used for built-in method references. */
    var objectProto$2 = Object.prototype;

    /** Used to check objects for own properties. */
    var hasOwnProperty = objectProto$2.hasOwnProperty;

    /**
     * The base implementation of `_.has` without support for deep paths.
     *
     * @private
     * @param {Object} [object] The object to query.
     * @param {Array|string} key The key to check.
     * @returns {boolean} Returns `true` if `key` exists, else `false`.
     */
    function baseHas(object, key) {
      // Avoid a bug in IE 10-11 where objects with a [[Prototype]] of `null`,
      // that are composed entirely of index properties, return `false` for
      // `hasOwnProperty` checks of them.
      return object != null &&
        (hasOwnProperty.call(object, key) ||
          (typeof object == 'object' && key in object && getPrototype(object) === null));
    }

    /* Built-in method references for those with the same name as other `lodash` methods. */
    var nativeKeys = Object.keys;

    /**
     * The base implementation of `_.keys` which doesn't skip the constructor
     * property of prototypes or treat sparse arrays as dense.
     *
     * @private
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property names.
     */
    function baseKeys(object) {
      return nativeKeys(Object(object));
    }

    /**
     * The base implementation of `_.times` without support for iteratee shorthands
     * or max array length checks.
     *
     * @private
     * @param {number} n The number of times to invoke `iteratee`.
     * @param {Function} iteratee The function invoked per iteration.
     * @returns {Array} Returns the array of results.
     */
    function baseTimes(n, iteratee) {
      var index = -1,
          result = Array(n);

      while (++index < n) {
        result[index] = iteratee(index);
      }
      return result;
    }

    /**
     * This method is like `_.isArrayLike` except that it also checks if `value`
     * is an object.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an array-like object,
     *  else `false`.
     * @example
     *
     * _.isArrayLikeObject([1, 2, 3]);
     * // => true
     *
     * _.isArrayLikeObject(document.body.children);
     * // => true
     *
     * _.isArrayLikeObject('abc');
     * // => false
     *
     * _.isArrayLikeObject(_.noop);
     * // => false
     */
    function isArrayLikeObject(value) {
      return isObjectLike(value) && isArrayLike(value);
    }

    /** `Object#toString` result references. */
    var argsTag = '[object Arguments]';

    /** Used for built-in method references. */
    var objectProto$3 = Object.prototype;

    /** Used to check objects for own properties. */
    var hasOwnProperty$1 = objectProto$3.hasOwnProperty;

    /**
     * Used to resolve the
     * [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
     * of values.
     */
    var objectToString$2 = objectProto$3.toString;

    /** Built-in value references. */
    var propertyIsEnumerable = objectProto$3.propertyIsEnumerable;

    /**
     * Checks if `value` is likely an `arguments` object.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is correctly classified,
     *  else `false`.
     * @example
     *
     * _.isArguments(function() { return arguments; }());
     * // => true
     *
     * _.isArguments([1, 2, 3]);
     * // => false
     */
    function isArguments(value) {
      // Safari 8.1 incorrectly makes `arguments.callee` enumerable in strict mode.
      return isArrayLikeObject(value) && hasOwnProperty$1.call(value, 'callee') &&
        (!propertyIsEnumerable.call(value, 'callee') || objectToString$2.call(value) == argsTag);
    }

    /**
     * Checks if `value` is classified as an `Array` object.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @type {Function}
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is correctly classified,
     *  else `false`.
     * @example
     *
     * _.isArray([1, 2, 3]);
     * // => true
     *
     * _.isArray(document.body.children);
     * // => false
     *
     * _.isArray('abc');
     * // => false
     *
     * _.isArray(_.noop);
     * // => false
     */
    var isArray = Array.isArray;

    /** `Object#toString` result references. */
    var stringTag = '[object String]';

    /** Used for built-in method references. */
    var objectProto$4 = Object.prototype;

    /**
     * Used to resolve the
     * [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
     * of values.
     */
    var objectToString$3 = objectProto$4.toString;

    /**
     * Checks if `value` is classified as a `String` primitive or object.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is correctly classified,
     *  else `false`.
     * @example
     *
     * _.isString('abc');
     * // => true
     *
     * _.isString(1);
     * // => false
     */
    function isString(value) {
      return typeof value == 'string' ||
        (!isArray(value) && isObjectLike(value) && objectToString$3.call(value) == stringTag);
    }

    /**
     * Creates an array of index keys for `object` values of arrays,
     * `arguments` objects, and strings, otherwise `null` is returned.
     *
     * @private
     * @param {Object} object The object to query.
     * @returns {Array|null} Returns index keys, else `null`.
     */
    function indexKeys(object) {
      var length = object ? object.length : undefined;
      if (isLength(length) &&
          (isArray(object) || isString(object) || isArguments(object))) {
        return baseTimes(length, String);
      }
      return null;
    }

    /** Used as references for various `Number` constants. */
    var MAX_SAFE_INTEGER$1 = 9007199254740991;

    /** Used to detect unsigned integer values. */
    var reIsUint = /^(?:0|[1-9]\d*)$/;

    /**
     * Checks if `value` is a valid array-like index.
     *
     * @private
     * @param {*} value The value to check.
     * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
     * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
     */
    function isIndex(value, length) {
      length = length == null ? MAX_SAFE_INTEGER$1 : length;
      return !!length &&
        (typeof value == 'number' || reIsUint.test(value)) &&
        (value > -1 && value % 1 == 0 && value < length);
    }

    /** Used for built-in method references. */
    var objectProto$5 = Object.prototype;

    /**
     * Checks if `value` is likely a prototype object.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
     */
    function isPrototype(value) {
      var Ctor = value && value.constructor,
          proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto$5;

      return value === proto;
    }

    /**
     * Creates an array of the own enumerable property names of `object`.
     *
     * **Note:** Non-object values are coerced to objects. See the
     * [ES spec](http://ecma-international.org/ecma-262/6.0/#sec-object.keys)
     * for more details.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Object
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property names.
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     *   this.b = 2;
     * }
     *
     * Foo.prototype.c = 3;
     *
     * _.keys(new Foo);
     * // => ['a', 'b'] (iteration order is not guaranteed)
     *
     * _.keys('hi');
     * // => ['0', '1']
     */
    function keys(object) {
      var isProto = isPrototype(object);
      if (!(isProto || isArrayLike(object))) {
        return baseKeys(object);
      }
      var indexes = indexKeys(object),
          skipIndexes = !!indexes,
          result = indexes || [],
          length = result.length;

      for (var key in object) {
        if (baseHas(object, key) &&
            !(skipIndexes && (key == 'length' || isIndex(key, length))) &&
            !(isProto && key == 'constructor')) {
          result.push(key);
        }
      }
      return result;
    }

    function iterator(coll) {
        var i = -1;
        var len;
        if (isArrayLike(coll)) {
            len = coll.length;
            return function next() {
                i++;
                return i < len ? { value: coll[i], key: i } : null;
            };
        }

        var iterate = getIterator(coll);
        if (iterate) {
            return function next() {
                var item = iterate.next();
                if (item.done) return null;
                i++;
                return { value: item.value, key: i };
            };
        }

        var okeys = keys(coll);
        len = okeys.length;
        return function next() {
            i++;
            var key = okeys[i];
            return i < len ? { value: coll[key], key: key } : null;
        };
    }

    function onlyOnce(fn) {
        return function () {
            if (fn === null) throw new Error("Callback was already called.");
            var callFn = fn;
            fn = null;
            callFn.apply(this, arguments);
        };
    }

    function _eachOfLimit(limit) {
        return function (obj, iteratee, callback) {
            callback = once(callback || noop);
            obj = obj || [];
            var nextElem = iterator(obj);
            if (limit <= 0) {
                return callback(null);
            }
            var done = false;
            var running = 0;
            var errored = false;

            (function replenish() {
                if (done && running <= 0) {
                    return callback(null);
                }

                while (running < limit && !errored) {
                    var elem = nextElem();
                    if (elem === null) {
                        done = true;
                        if (running <= 0) {
                            callback(null);
                        }
                        return;
                    }
                    running += 1;
                    iteratee(elem.value, elem.key, onlyOnce(function (err) {
                        running -= 1;
                        if (err) {
                            callback(err);
                            errored = true;
                        } else {
                            replenish();
                        }
                    }));
                }
            })();
        };
    }

    function doParallelLimit(fn) {
        return function (obj, limit, iteratee, callback) {
            return fn(_eachOfLimit(limit), obj, iteratee, callback);
        };
    }

    function _asyncMap(eachfn, arr, iteratee, callback) {
        callback = once(callback || noop);
        arr = arr || [];
        var results = [];
        var counter = 0;

        eachfn(arr, function (value, _, callback) {
            var index = counter++;
            iteratee(value, function (err, v) {
                results[index] = v;
                callback(err);
            });
        }, function (err) {
            callback(err, results);
        });
    }

    /**
     * The same as `map` but runs a maximum of `limit` async operations at a time.
     *
     * @name mapLimit
     * @static
     * @memberOf async
     * @see async.map
     * @category Collection
     * @param {Array|Object} coll - A collection to iterate over.
     * @param {number} limit - The maximum number of async operations at a time.
     * @param {Function} iteratee - A function to apply to each item in `coll`.
     * The iteratee is passed a `callback(err, transformed)` which must be called
     * once it has completed with an error (which can be `null`) and a transformed
     * item. Invoked with (item, callback).
     * @param {Function} [callback] - A callback which is called when all `iteratee`
     * functions have finished, or an error occurs. Results is an array of the
     * transformed items from the `coll`. Invoked with (err, results).
     */
    var mapLimit = doParallelLimit(_asyncMap);

    function doLimit(fn, limit) {
        return function (iterable, iteratee, callback) {
            return fn(iterable, limit, iteratee, callback);
        };
    }

    /**
     * Produces a new collection of values by mapping each value in `coll` through
     * the `iteratee` function. The `iteratee` is called with an item from `coll`
     * and a callback for when it has finished processing. Each of these callback
     * takes 2 arguments: an `error`, and the transformed item from `coll`. If
     * `iteratee` passes an error to its callback, the main `callback` (for the
     * `map` function) is immediately called with the error.
     *
     * Note, that since this function applies the `iteratee` to each item in
     * parallel, there is no guarantee that the `iteratee` functions will complete
     * in order. However, the results array will be in the same order as the
     * original `coll`.
     *
     * If `map` is passed an Object, the results will be an Array.  The results
     * will roughly be in the order of the original Objects' keys (but this can
     * vary across JavaScript engines)
     *
     * @name map
     * @static
     * @memberOf async
     * @category Collection
     * @param {Array|Object} coll - A collection to iterate over.
     * @param {Function} iteratee - A function to apply to each item in `coll`.
     * The iteratee is passed a `callback(err, transformed)` which must be called
     * once it has completed with an error (which can be `null`) and a
     * transformed item. Invoked with (item, callback).
     * @param {Function} [callback] - A callback which is called when all `iteratee`
     * functions have finished, or an error occurs. Results is an Array of the
     * transformed items from the `coll`. Invoked with (err, results).
     * @example
     *
     * async.map(['file1','file2','file3'], fs.stat, function(err, results) {
     *     // results is now an array of stats for each file
     * });
     */
    var map = doLimit(mapLimit, Infinity);

    /**
     * Applies the provided arguments to each function in the array, calling
     * `callback` after all functions have completed. If you only provide the first
     * argument, then it will return a function which lets you pass in the
     * arguments as if it were a single function call.
     *
     * @name applyEach
     * @static
     * @memberOf async
     * @category Control Flow
     * @param {Array|Object} fns - A collection of asynchronous functions to all
     * call with the same arguments
     * @param {...*} [args] - any number of separate arguments to pass to the
     * function.
     * @param {Function} [callback] - the final argument should be the callback,
     * called when all functions have completed processing.
     * @returns {Function} - If only the first argument is provided, it will return
     * a function which lets you pass in the arguments as if it were a single
     * function call.
     * @example
     *
     * async.applyEach([enableSearch, updateSchema], 'bucket', callback);
     *
     * // partial application example:
     * async.each(
     *     buckets,
     *     async.applyEach([enableSearch, updateSchema]),
     *     callback
     * );
     */
    var applyEach = applyEach$1(map);

    /**
     * The same as `map` but runs only a single async operation at a time.
     *
     * @name mapSeries
     * @static
     * @memberOf async
     * @see async.map
     * @category Collection
     * @param {Array|Object} coll - A collection to iterate over.
     * @param {Function} iteratee - A function to apply to each item in `coll`.
     * The iteratee is passed a `callback(err, transformed)` which must be called
     * once it has completed with an error (which can be `null`) and a
     * transformed item. Invoked with (item, callback).
     * @param {Function} [callback] - A callback which is called when all `iteratee`
     * functions have finished, or an error occurs. Results is an array of the
     * transformed items from the `coll`. Invoked with (err, results).
     */
    var mapSeries = doLimit(mapLimit, 1);

    /**
     * The same as `applyEach` but runs only a single async operation at a time.
     *
     * @name applyEachSeries
     * @static
     * @memberOf async
     * @see async.applyEach
     * @category Control Flow
     * @param {Array|Object} fns - A collection of asynchronous functions to all
     * call with the same arguments
     * @param {...*} [args] - any number of separate arguments to pass to the
     * function.
     * @param {Function} [callback] - the final argument should be the callback,
     * called when all functions have completed processing.
     * @returns {Function} - If only the first argument is provided, it will return
     * a function which lets you pass in the arguments as if it were a single
     * function call.
     */
    var applyEachSeries = applyEach$1(mapSeries);

    /**
     * Creates a continuation function with some arguments already applied.
     *
     * Useful as a shorthand when combined with other control flow functions. Any
     * arguments passed to the returned function are added to the arguments
     * originally passed to apply.
     *
     * @name apply
     * @static
     * @memberOf async
     * @category Util
     * @param {Function} function - The function you want to eventually apply all
     * arguments to. Invokes with (arguments...).
     * @param {...*} arguments... - Any number of arguments to automatically apply
     * when the continuation is called.
     * @example
     *
     * // using apply
     * async.parallel([
     *     async.apply(fs.writeFile, 'testfile1', 'test1'),
     *     async.apply(fs.writeFile, 'testfile2', 'test2')
     * ]);
     *
     *
     * // the same process without using apply
     * async.parallel([
     *     function(callback) {
     *         fs.writeFile('testfile1', 'test1', callback);
     *     },
     *     function(callback) {
     *         fs.writeFile('testfile2', 'test2', callback);
     *     }
     * ]);
     *
     * // It's possible to pass any number of additional arguments when calling the
     * // continuation:
     *
     * node> var fn = async.apply(sys.puts, 'one');
     * node> fn('two', 'three');
     * one
     * two
     * three
     */
    var apply$1 = rest(function (fn, args) {
        return rest(function (callArgs) {
            return fn.apply(null, args.concat(callArgs));
        });
    });

    /**
     * Take a sync function and make it async, passing its return value to a
     * callback. This is useful for plugging sync functions into a waterfall,
     * series, or other async functions. Any arguments passed to the generated
     * function will be passed to the wrapped function (except for the final
     * callback argument). Errors thrown will be passed to the callback.
     *
     * If the function passed to `asyncify` returns a Promise, that promises's
     * resolved/rejected state will be used to call the callback, rather than simply
     * the synchronous return value.
     *
     * This also means you can asyncify ES2016 `async` functions.
     *
     * @name asyncify
     * @static
     * @memberOf async
     * @alias wrapSync
     * @category Util
     * @param {Function} func - The synchronous function to convert to an
     * asynchronous function.
     * @returns {Function} An asynchronous wrapper of the `func`. To be invoked with
     * (callback).
     * @example
     *
     * // passing a regular synchronous function
     * async.waterfall([
     *     async.apply(fs.readFile, filename, "utf8"),
     *     async.asyncify(JSON.parse),
     *     function (data, next) {
     *         // data is the result of parsing the text.
     *         // If there was a parsing error, it would have been caught.
     *     }
     * ], callback);
     *
     * // passing a function returning a promise
     * async.waterfall([
     *     async.apply(fs.readFile, filename, "utf8"),
     *     async.asyncify(function (contents) {
     *         return db.model.create(contents);
     *     }),
     *     function (model, next) {
     *         // `model` is the instantiated model object.
     *         // If there was an error, this function would be skipped.
     *     }
     * ], callback);
     *
     * // es6 example
     * var q = async.queue(async.asyncify(async function(file) {
     *     var intermediateStep = await processFile(file);
     *     return await somePromise(intermediateStep)
     * }));
     *
     * q.push(files);
     */
    function asyncify(func) {
        return initialParams(function (args, callback) {
            var result;
            try {
                result = func.apply(this, args);
            } catch (e) {
                return callback(e);
            }
            // if result is Promise object
            if (isObject(result) && typeof result.then === 'function') {
                result.then(function (value) {
                    callback(null, value);
                })['catch'](function (err) {
                    callback(err.message ? err : new Error(err));
                });
            } else {
                callback(null, result);
            }
        });
    }

    /**
     * A specialized version of `_.forEach` for arrays without support for
     * iteratee shorthands.
     *
     * @private
     * @param {Array} [array] The array to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @returns {Array} Returns `array`.
     */
    function arrayEach(array, iteratee) {
      var index = -1,
          length = array ? array.length : 0;

      while (++index < length) {
        if (iteratee(array[index], index, array) === false) {
          break;
        }
      }
      return array;
    }

    /**
     * Creates a base function for methods like `_.forIn` and `_.forOwn`.
     *
     * @private
     * @param {boolean} [fromRight] Specify iterating from right to left.
     * @returns {Function} Returns the new base function.
     */
    function createBaseFor(fromRight) {
      return function(object, iteratee, keysFunc) {
        var index = -1,
            iterable = Object(object),
            props = keysFunc(object),
            length = props.length;

        while (length--) {
          var key = props[fromRight ? length : ++index];
          if (iteratee(iterable[key], key, iterable) === false) {
            break;
          }
        }
        return object;
      };
    }

    /**
     * The base implementation of `baseForOwn` which iterates over `object`
     * properties returned by `keysFunc` and invokes `iteratee` for each property.
     * Iteratee functions may exit iteration early by explicitly returning `false`.
     *
     * @private
     * @param {Object} object The object to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @param {Function} keysFunc The function to get the keys of `object`.
     * @returns {Object} Returns `object`.
     */
    var baseFor = createBaseFor();

    /**
     * The base implementation of `_.forOwn` without support for iteratee shorthands.
     *
     * @private
     * @param {Object} object The object to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @returns {Object} Returns `object`.
     */
    function baseForOwn(object, iteratee) {
      return object && baseFor(object, iteratee, keys);
    }

    /**
     * Removes all key-value entries from the list cache.
     *
     * @private
     * @name clear
     * @memberOf ListCache
     */
    function listCacheClear() {
      this.__data__ = [];
    }

    /**
     * Performs a
     * [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
     * comparison between two values to determine if they are equivalent.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to compare.
     * @param {*} other The other value to compare.
     * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
     * @example
     *
     * var object = { 'user': 'fred' };
     * var other = { 'user': 'fred' };
     *
     * _.eq(object, object);
     * // => true
     *
     * _.eq(object, other);
     * // => false
     *
     * _.eq('a', 'a');
     * // => true
     *
     * _.eq('a', Object('a'));
     * // => false
     *
     * _.eq(NaN, NaN);
     * // => true
     */
    function eq(value, other) {
      return value === other || (value !== value && other !== other);
    }

    /**
     * Gets the index at which the `key` is found in `array` of key-value pairs.
     *
     * @private
     * @param {Array} array The array to search.
     * @param {*} key The key to search for.
     * @returns {number} Returns the index of the matched value, else `-1`.
     */
    function assocIndexOf(array, key) {
      var length = array.length;
      while (length--) {
        if (eq(array[length][0], key)) {
          return length;
        }
      }
      return -1;
    }

    /** Used for built-in method references. */
    var arrayProto = Array.prototype;

    /** Built-in value references. */
    var splice = arrayProto.splice;

    /**
     * Removes `key` and its value from the list cache.
     *
     * @private
     * @name delete
     * @memberOf ListCache
     * @param {string} key The key of the value to remove.
     * @returns {boolean} Returns `true` if the entry was removed, else `false`.
     */
    function listCacheDelete(key) {
      var data = this.__data__,
          index = assocIndexOf(data, key);

      if (index < 0) {
        return false;
      }
      var lastIndex = data.length - 1;
      if (index == lastIndex) {
        data.pop();
      } else {
        splice.call(data, index, 1);
      }
      return true;
    }

    /**
     * Gets the list cache value for `key`.
     *
     * @private
     * @name get
     * @memberOf ListCache
     * @param {string} key The key of the value to get.
     * @returns {*} Returns the entry value.
     */
    function listCacheGet(key) {
      var data = this.__data__,
          index = assocIndexOf(data, key);

      return index < 0 ? undefined : data[index][1];
    }

    /**
     * Checks if a list cache value for `key` exists.
     *
     * @private
     * @name has
     * @memberOf ListCache
     * @param {string} key The key of the entry to check.
     * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
     */
    function listCacheHas(key) {
      return assocIndexOf(this.__data__, key) > -1;
    }

    /**
     * Sets the list cache `key` to `value`.
     *
     * @private
     * @name set
     * @memberOf ListCache
     * @param {string} key The key of the value to set.
     * @param {*} value The value to set.
     * @returns {Object} Returns the list cache instance.
     */
    function listCacheSet(key, value) {
      var data = this.__data__,
          index = assocIndexOf(data, key);

      if (index < 0) {
        data.push([key, value]);
      } else {
        data[index][1] = value;
      }
      return this;
    }

    /**
     * Creates an list cache object.
     *
     * @private
     * @constructor
     * @param {Array} [entries] The key-value pairs to cache.
     */
    function ListCache(entries) {
      var index = -1,
          length = entries ? entries.length : 0;

      this.clear();
      while (++index < length) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
      }
    }

    // Add methods to `ListCache`.
    ListCache.prototype.clear = listCacheClear;
    ListCache.prototype['delete'] = listCacheDelete;
    ListCache.prototype.get = listCacheGet;
    ListCache.prototype.has = listCacheHas;
    ListCache.prototype.set = listCacheSet;

    /**
     * Removes all key-value entries from the stack.
     *
     * @private
     * @name clear
     * @memberOf Stack
     */
    function stackClear() {
      this.__data__ = new ListCache;
    }

    /**
     * Removes `key` and its value from the stack.
     *
     * @private
     * @name delete
     * @memberOf Stack
     * @param {string} key The key of the value to remove.
     * @returns {boolean} Returns `true` if the entry was removed, else `false`.
     */
    function stackDelete(key) {
      return this.__data__['delete'](key);
    }

    /**
     * Gets the stack value for `key`.
     *
     * @private
     * @name get
     * @memberOf Stack
     * @param {string} key The key of the value to get.
     * @returns {*} Returns the entry value.
     */
    function stackGet(key) {
      return this.__data__.get(key);
    }

    /**
     * Checks if a stack value for `key` exists.
     *
     * @private
     * @name has
     * @memberOf Stack
     * @param {string} key The key of the entry to check.
     * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
     */
    function stackHas(key) {
      return this.__data__.has(key);
    }

    /**
     * Checks if `value` is a host object in IE < 9.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
     */
    function isHostObject(value) {
      // Many host objects are `Object` objects that can coerce to strings
      // despite having improperly defined `toString` methods.
      var result = false;
      if (value != null && typeof value.toString != 'function') {
        try {
          result = !!(value + '');
        } catch (e) {}
      }
      return result;
    }

    /**
     * Checks if `value` is a global object.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {null|Object} Returns `value` if it's a global object, else `null`.
     */
    function checkGlobal(value) {
      return (value && value.Object === Object) ? value : null;
    }

    /** Detect free variable `global` from Node.js. */
    var freeGlobal = checkGlobal(typeof global == 'object' && global);

    /** Detect free variable `self`. */
    var freeSelf = checkGlobal(typeof self == 'object' && self);

    /** Detect `this` as the global object. */
    var thisGlobal = checkGlobal(typeof this == 'object' && this);

    /** Used as a reference to the global object. */
    var root = freeGlobal || freeSelf || thisGlobal || Function('return this')();

    /** Used to detect overreaching core-js shims. */
    var coreJsData = root['__core-js_shared__'];

    /** Used to detect methods masquerading as native. */
    var maskSrcKey = (function() {
      var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
      return uid ? ('Symbol(src)_1.' + uid) : '';
    }());

    /**
     * Checks if `func` has its source masked.
     *
     * @private
     * @param {Function} func The function to check.
     * @returns {boolean} Returns `true` if `func` is masked, else `false`.
     */
    function isMasked(func) {
      return !!maskSrcKey && (maskSrcKey in func);
    }

    /** Used to resolve the decompiled source of functions. */
    var funcToString$1 = Function.prototype.toString;

    /**
     * Converts `func` to its source code.
     *
     * @private
     * @param {Function} func The function to process.
     * @returns {string} Returns the source code.
     */
    function toSource(func) {
      if (func != null) {
        try {
          return funcToString$1.call(func);
        } catch (e) {}
        try {
          return (func + '');
        } catch (e) {}
      }
      return '';
    }

    /**
     * Used to match `RegExp`
     * [syntax characters](http://ecma-international.org/ecma-262/6.0/#sec-patterns).
     */
    var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

    /** Used to detect host constructors (Safari). */
    var reIsHostCtor = /^\[object .+?Constructor\]$/;

    /** Used for built-in method references. */
    var objectProto$6 = Object.prototype;

    /** Used to resolve the decompiled source of functions. */
    var funcToString = Function.prototype.toString;

    /** Used to check objects for own properties. */
    var hasOwnProperty$2 = objectProto$6.hasOwnProperty;

    /** Used to detect if a method is native. */
    var reIsNative = RegExp('^' +
      funcToString.call(hasOwnProperty$2).replace(reRegExpChar, '\\$&')
      .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
    );

    /**
     * The base implementation of `_.isNative` without bad shim checks.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a native function,
     *  else `false`.
     */
    function baseIsNative(value) {
      if (!isObject(value) || isMasked(value)) {
        return false;
      }
      var pattern = (isFunction(value) || isHostObject(value)) ? reIsNative : reIsHostCtor;
      return pattern.test(toSource(value));
    }

    /**
     * Gets the value at `key` of `object`.
     *
     * @private
     * @param {Object} [object] The object to query.
     * @param {string} key The key of the property to get.
     * @returns {*} Returns the property value.
     */
    function getValue(object, key) {
      return object == null ? undefined : object[key];
    }

    /**
     * Gets the native function at `key` of `object`.
     *
     * @private
     * @param {Object} object The object to query.
     * @param {string} key The key of the method to get.
     * @returns {*} Returns the function if it's native, else `undefined`.
     */
    function getNative(object, key) {
      var value = getValue(object, key);
      return baseIsNative(value) ? value : undefined;
    }

    /* Built-in method references that are verified to be native. */
    var nativeCreate = getNative(Object, 'create');

    /**
     * Removes all key-value entries from the hash.
     *
     * @private
     * @name clear
     * @memberOf Hash
     */
    function hashClear() {
      this.__data__ = nativeCreate ? nativeCreate(null) : {};
    }

    /**
     * Removes `key` and its value from the hash.
     *
     * @private
     * @name delete
     * @memberOf Hash
     * @param {Object} hash The hash to modify.
     * @param {string} key The key of the value to remove.
     * @returns {boolean} Returns `true` if the entry was removed, else `false`.
     */
    function hashDelete(key) {
      return this.has(key) && delete this.__data__[key];
    }

    /** Used to stand-in for `undefined` hash values. */
    var HASH_UNDEFINED = '__lodash_hash_undefined__';

    /** Used for built-in method references. */
    var objectProto$7 = Object.prototype;

    /** Used to check objects for own properties. */
    var hasOwnProperty$3 = objectProto$7.hasOwnProperty;

    /**
     * Gets the hash value for `key`.
     *
     * @private
     * @name get
     * @memberOf Hash
     * @param {string} key The key of the value to get.
     * @returns {*} Returns the entry value.
     */
    function hashGet(key) {
      var data = this.__data__;
      if (nativeCreate) {
        var result = data[key];
        return result === HASH_UNDEFINED ? undefined : result;
      }
      return hasOwnProperty$3.call(data, key) ? data[key] : undefined;
    }

    /** Used for built-in method references. */
    var objectProto$8 = Object.prototype;

    /** Used to check objects for own properties. */
    var hasOwnProperty$4 = objectProto$8.hasOwnProperty;

    /**
     * Checks if a hash value for `key` exists.
     *
     * @private
     * @name has
     * @memberOf Hash
     * @param {string} key The key of the entry to check.
     * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
     */
    function hashHas(key) {
      var data = this.__data__;
      return nativeCreate ? data[key] !== undefined : hasOwnProperty$4.call(data, key);
    }

    /** Used to stand-in for `undefined` hash values. */
    var HASH_UNDEFINED$1 = '__lodash_hash_undefined__';

    /**
     * Sets the hash `key` to `value`.
     *
     * @private
     * @name set
     * @memberOf Hash
     * @param {string} key The key of the value to set.
     * @param {*} value The value to set.
     * @returns {Object} Returns the hash instance.
     */
    function hashSet(key, value) {
      var data = this.__data__;
      data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED$1 : value;
      return this;
    }

    /**
     * Creates a hash object.
     *
     * @private
     * @constructor
     * @param {Array} [entries] The key-value pairs to cache.
     */
    function Hash(entries) {
      var index = -1,
          length = entries ? entries.length : 0;

      this.clear();
      while (++index < length) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
      }
    }

    // Add methods to `Hash`.
    Hash.prototype.clear = hashClear;
    Hash.prototype['delete'] = hashDelete;
    Hash.prototype.get = hashGet;
    Hash.prototype.has = hashHas;
    Hash.prototype.set = hashSet;

    /* Built-in method references that are verified to be native. */
    var Map = getNative(root, 'Map');

    /**
     * Removes all key-value entries from the map.
     *
     * @private
     * @name clear
     * @memberOf MapCache
     */
    function mapCacheClear() {
      this.__data__ = {
        'hash': new Hash,
        'map': new (Map || ListCache),
        'string': new Hash
      };
    }

    /**
     * Checks if `value` is suitable for use as unique object key.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
     */
    function isKeyable(value) {
      var type = typeof value;
      return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
        ? (value !== '__proto__')
        : (value === null);
    }

    /**
     * Gets the data for `map`.
     *
     * @private
     * @param {Object} map The map to query.
     * @param {string} key The reference key.
     * @returns {*} Returns the map data.
     */
    function getMapData(map, key) {
      var data = map.__data__;
      return isKeyable(key)
        ? data[typeof key == 'string' ? 'string' : 'hash']
        : data.map;
    }

    /**
     * Removes `key` and its value from the map.
     *
     * @private
     * @name delete
     * @memberOf MapCache
     * @param {string} key The key of the value to remove.
     * @returns {boolean} Returns `true` if the entry was removed, else `false`.
     */
    function mapCacheDelete(key) {
      return getMapData(this, key)['delete'](key);
    }

    /**
     * Gets the map value for `key`.
     *
     * @private
     * @name get
     * @memberOf MapCache
     * @param {string} key The key of the value to get.
     * @returns {*} Returns the entry value.
     */
    function mapCacheGet(key) {
      return getMapData(this, key).get(key);
    }

    /**
     * Checks if a map value for `key` exists.
     *
     * @private
     * @name has
     * @memberOf MapCache
     * @param {string} key The key of the entry to check.
     * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
     */
    function mapCacheHas(key) {
      return getMapData(this, key).has(key);
    }

    /**
     * Sets the map `key` to `value`.
     *
     * @private
     * @name set
     * @memberOf MapCache
     * @param {string} key The key of the value to set.
     * @param {*} value The value to set.
     * @returns {Object} Returns the map cache instance.
     */
    function mapCacheSet(key, value) {
      getMapData(this, key).set(key, value);
      return this;
    }

    /**
     * Creates a map cache object to store key-value pairs.
     *
     * @private
     * @constructor
     * @param {Array} [entries] The key-value pairs to cache.
     */
    function MapCache(entries) {
      var index = -1,
          length = entries ? entries.length : 0;

      this.clear();
      while (++index < length) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
      }
    }

    // Add methods to `MapCache`.
    MapCache.prototype.clear = mapCacheClear;
    MapCache.prototype['delete'] = mapCacheDelete;
    MapCache.prototype.get = mapCacheGet;
    MapCache.prototype.has = mapCacheHas;
    MapCache.prototype.set = mapCacheSet;

    /** Used as the size to enable large array optimizations. */
    var LARGE_ARRAY_SIZE = 200;

    /**
     * Sets the stack `key` to `value`.
     *
     * @private
     * @name set
     * @memberOf Stack
     * @param {string} key The key of the value to set.
     * @param {*} value The value to set.
     * @returns {Object} Returns the stack cache instance.
     */
    function stackSet(key, value) {
      var cache = this.__data__;
      if (cache instanceof ListCache && cache.__data__.length == LARGE_ARRAY_SIZE) {
        cache = this.__data__ = new MapCache(cache.__data__);
      }
      cache.set(key, value);
      return this;
    }

    /**
     * Creates a stack cache object to store key-value pairs.
     *
     * @private
     * @constructor
     * @param {Array} [entries] The key-value pairs to cache.
     */
    function Stack(entries) {
      this.__data__ = new ListCache(entries);
    }

    // Add methods to `Stack`.
    Stack.prototype.clear = stackClear;
    Stack.prototype['delete'] = stackDelete;
    Stack.prototype.get = stackGet;
    Stack.prototype.has = stackHas;
    Stack.prototype.set = stackSet;

    /** Used to stand-in for `undefined` hash values. */
    var HASH_UNDEFINED$2 = '__lodash_hash_undefined__';

    /**
     * Adds `value` to the array cache.
     *
     * @private
     * @name add
     * @memberOf SetCache
     * @alias push
     * @param {*} value The value to cache.
     * @returns {Object} Returns the cache instance.
     */
    function setCacheAdd(value) {
      this.__data__.set(value, HASH_UNDEFINED$2);
      return this;
    }

    /**
     * Checks if `value` is in the array cache.
     *
     * @private
     * @name has
     * @memberOf SetCache
     * @param {*} value The value to search for.
     * @returns {number} Returns `true` if `value` is found, else `false`.
     */
    function setCacheHas(value) {
      return this.__data__.has(value);
    }

    /**
     *
     * Creates an array cache object to store unique values.
     *
     * @private
     * @constructor
     * @param {Array} [values] The values to cache.
     */
    function SetCache(values) {
      var index = -1,
          length = values ? values.length : 0;

      this.__data__ = new MapCache;
      while (++index < length) {
        this.add(values[index]);
      }
    }

    // Add methods to `SetCache`.
    SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
    SetCache.prototype.has = setCacheHas;

    /**
     * A specialized version of `_.some` for arrays without support for iteratee
     * shorthands.
     *
     * @private
     * @param {Array} [array] The array to iterate over.
     * @param {Function} predicate The function invoked per iteration.
     * @returns {boolean} Returns `true` if any element passes the predicate check,
     *  else `false`.
     */
    function arraySome(array, predicate) {
      var index = -1,
          length = array ? array.length : 0;

      while (++index < length) {
        if (predicate(array[index], index, array)) {
          return true;
        }
      }
      return false;
    }

    var UNORDERED_COMPARE_FLAG$1 = 1;
    var PARTIAL_COMPARE_FLAG$2 = 2;
    /**
     * A specialized version of `baseIsEqualDeep` for arrays with support for
     * partial deep comparisons.
     *
     * @private
     * @param {Array} array The array to compare.
     * @param {Array} other The other array to compare.
     * @param {Function} equalFunc The function to determine equivalents of values.
     * @param {Function} customizer The function to customize comparisons.
     * @param {number} bitmask The bitmask of comparison flags. See `baseIsEqual`
     *  for more details.
     * @param {Object} stack Tracks traversed `array` and `other` objects.
     * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
     */
    function equalArrays(array, other, equalFunc, customizer, bitmask, stack) {
      var isPartial = bitmask & PARTIAL_COMPARE_FLAG$2,
          arrLength = array.length,
          othLength = other.length;

      if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
        return false;
      }
      // Assume cyclic values are equal.
      var stacked = stack.get(array);
      if (stacked) {
        return stacked == other;
      }
      var index = -1,
          result = true,
          seen = (bitmask & UNORDERED_COMPARE_FLAG$1) ? new SetCache : undefined;

      stack.set(array, other);

      // Ignore non-index properties.
      while (++index < arrLength) {
        var arrValue = array[index],
            othValue = other[index];

        if (customizer) {
          var compared = isPartial
            ? customizer(othValue, arrValue, index, other, array, stack)
            : customizer(arrValue, othValue, index, array, other, stack);
        }
        if (compared !== undefined) {
          if (compared) {
            continue;
          }
          result = false;
          break;
        }
        // Recursively compare arrays (susceptible to call stack limits).
        if (seen) {
          if (!arraySome(other, function(othValue, othIndex) {
                if (!seen.has(othIndex) &&
                    (arrValue === othValue || equalFunc(arrValue, othValue, customizer, bitmask, stack))) {
                  return seen.add(othIndex);
                }
              })) {
            result = false;
            break;
          }
        } else if (!(
              arrValue === othValue ||
                equalFunc(arrValue, othValue, customizer, bitmask, stack)
            )) {
          result = false;
          break;
        }
      }
      stack['delete'](array);
      return result;
    }

    /** Built-in value references. */
    var Symbol$1 = root.Symbol;

    /** Built-in value references. */
    var Uint8Array = root.Uint8Array;

    /**
     * Converts `map` to its key-value pairs.
     *
     * @private
     * @param {Object} map The map to convert.
     * @returns {Array} Returns the key-value pairs.
     */
    function mapToArray(map) {
      var index = -1,
          result = Array(map.size);

      map.forEach(function(value, key) {
        result[++index] = [key, value];
      });
      return result;
    }

    /**
     * Converts `set` to an array of its values.
     *
     * @private
     * @param {Object} set The set to convert.
     * @returns {Array} Returns the values.
     */
    function setToArray(set) {
      var index = -1,
          result = Array(set.size);

      set.forEach(function(value) {
        result[++index] = value;
      });
      return result;
    }

    var UNORDERED_COMPARE_FLAG$2 = 1;
    var PARTIAL_COMPARE_FLAG$3 = 2;
    var boolTag = '[object Boolean]';
    var dateTag = '[object Date]';
    var errorTag = '[object Error]';
    var mapTag = '[object Map]';
    var numberTag = '[object Number]';
    var regexpTag = '[object RegExp]';
    var setTag = '[object Set]';
    var stringTag$1 = '[object String]';
    var symbolTag$1 = '[object Symbol]';
    var arrayBufferTag = '[object ArrayBuffer]';
    var dataViewTag = '[object DataView]';
    var symbolProto = Symbol$1 ? Symbol$1.prototype : undefined;
    var symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;
    /**
     * A specialized version of `baseIsEqualDeep` for comparing objects of
     * the same `toStringTag`.
     *
     * **Note:** This function only supports comparing values with tags of
     * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
     *
     * @private
     * @param {Object} object The object to compare.
     * @param {Object} other The other object to compare.
     * @param {string} tag The `toStringTag` of the objects to compare.
     * @param {Function} equalFunc The function to determine equivalents of values.
     * @param {Function} customizer The function to customize comparisons.
     * @param {number} bitmask The bitmask of comparison flags. See `baseIsEqual`
     *  for more details.
     * @param {Object} stack Tracks traversed `object` and `other` objects.
     * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
     */
    function equalByTag(object, other, tag, equalFunc, customizer, bitmask, stack) {
      switch (tag) {
        case dataViewTag:
          if ((object.byteLength != other.byteLength) ||
              (object.byteOffset != other.byteOffset)) {
            return false;
          }
          object = object.buffer;
          other = other.buffer;

        case arrayBufferTag:
          if ((object.byteLength != other.byteLength) ||
              !equalFunc(new Uint8Array(object), new Uint8Array(other))) {
            return false;
          }
          return true;

        case boolTag:
        case dateTag:
          // Coerce dates and booleans to numbers, dates to milliseconds and
          // booleans to `1` or `0` treating invalid dates coerced to `NaN` as
          // not equal.
          return +object == +other;

        case errorTag:
          return object.name == other.name && object.message == other.message;

        case numberTag:
          // Treat `NaN` vs. `NaN` as equal.
          return (object != +object) ? other != +other : object == +other;

        case regexpTag:
        case stringTag$1:
          // Coerce regexes to strings and treat strings, primitives and objects,
          // as equal. See http://www.ecma-international.org/ecma-262/6.0/#sec-regexp.prototype.tostring
          // for more details.
          return object == (other + '');

        case mapTag:
          var convert = mapToArray;

        case setTag:
          var isPartial = bitmask & PARTIAL_COMPARE_FLAG$3;
          convert || (convert = setToArray);

          if (object.size != other.size && !isPartial) {
            return false;
          }
          // Assume cyclic values are equal.
          var stacked = stack.get(object);
          if (stacked) {
            return stacked == other;
          }
          bitmask |= UNORDERED_COMPARE_FLAG$2;
          stack.set(object, other);

          // Recursively compare objects (susceptible to call stack limits).
          return equalArrays(convert(object), convert(other), equalFunc, customizer, bitmask, stack);

        case symbolTag$1:
          if (symbolValueOf) {
            return symbolValueOf.call(object) == symbolValueOf.call(other);
          }
      }
      return false;
    }

    /** Used to compose bitmasks for comparison styles. */
    var PARTIAL_COMPARE_FLAG$4 = 2;

    /**
     * A specialized version of `baseIsEqualDeep` for objects with support for
     * partial deep comparisons.
     *
     * @private
     * @param {Object} object The object to compare.
     * @param {Object} other The other object to compare.
     * @param {Function} equalFunc The function to determine equivalents of values.
     * @param {Function} customizer The function to customize comparisons.
     * @param {number} bitmask The bitmask of comparison flags. See `baseIsEqual`
     *  for more details.
     * @param {Object} stack Tracks traversed `object` and `other` objects.
     * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
     */
    function equalObjects(object, other, equalFunc, customizer, bitmask, stack) {
      var isPartial = bitmask & PARTIAL_COMPARE_FLAG$4,
          objProps = keys(object),
          objLength = objProps.length,
          othProps = keys(other),
          othLength = othProps.length;

      if (objLength != othLength && !isPartial) {
        return false;
      }
      var index = objLength;
      while (index--) {
        var key = objProps[index];
        if (!(isPartial ? key in other : baseHas(other, key))) {
          return false;
        }
      }
      // Assume cyclic values are equal.
      var stacked = stack.get(object);
      if (stacked) {
        return stacked == other;
      }
      var result = true;
      stack.set(object, other);

      var skipCtor = isPartial;
      while (++index < objLength) {
        key = objProps[index];
        var objValue = object[key],
            othValue = other[key];

        if (customizer) {
          var compared = isPartial
            ? customizer(othValue, objValue, key, other, object, stack)
            : customizer(objValue, othValue, key, object, other, stack);
        }
        // Recursively compare objects (susceptible to call stack limits).
        if (!(compared === undefined
              ? (objValue === othValue || equalFunc(objValue, othValue, customizer, bitmask, stack))
              : compared
            )) {
          result = false;
          break;
        }
        skipCtor || (skipCtor = key == 'constructor');
      }
      if (result && !skipCtor) {
        var objCtor = object.constructor,
            othCtor = other.constructor;

        // Non `Object` object instances with different constructors are not equal.
        if (objCtor != othCtor &&
            ('constructor' in object && 'constructor' in other) &&
            !(typeof objCtor == 'function' && objCtor instanceof objCtor &&
              typeof othCtor == 'function' && othCtor instanceof othCtor)) {
          result = false;
        }
      }
      stack['delete'](object);
      return result;
    }

    /* Built-in method references that are verified to be native. */
    var DataView = getNative(root, 'DataView');

    /* Built-in method references that are verified to be native. */
    var Promise = getNative(root, 'Promise');

    /* Built-in method references that are verified to be native. */
    var Set = getNative(root, 'Set');

    /* Built-in method references that are verified to be native. */
    var WeakMap = getNative(root, 'WeakMap');

    var mapTag$1 = '[object Map]';
    var objectTag$1 = '[object Object]';
    var promiseTag = '[object Promise]';
    var setTag$1 = '[object Set]';
    var weakMapTag = '[object WeakMap]';
    var dataViewTag$1 = '[object DataView]';

    /** Used for built-in method references. */
    var objectProto$10 = Object.prototype;

    /**
     * Used to resolve the
     * [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
     * of values.
     */
    var objectToString$4 = objectProto$10.toString;

    /** Used to detect maps, sets, and weakmaps. */
    var dataViewCtorString = toSource(DataView);
    var mapCtorString = toSource(Map);
    var promiseCtorString = toSource(Promise);
    var setCtorString = toSource(Set);
    var weakMapCtorString = toSource(WeakMap);
    /**
     * Gets the `toStringTag` of `value`.
     *
     * @private
     * @param {*} value The value to query.
     * @returns {string} Returns the `toStringTag`.
     */
    function getTag(value) {
      return objectToString$4.call(value);
    }

    // Fallback for data views, maps, sets, and weak maps in IE 11,
    // for data views in Edge, and promises in Node.js.
    if ((DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag$1) ||
        (Map && getTag(new Map) != mapTag$1) ||
        (Promise && getTag(Promise.resolve()) != promiseTag) ||
        (Set && getTag(new Set) != setTag$1) ||
        (WeakMap && getTag(new WeakMap) != weakMapTag)) {
      getTag = function(value) {
        var result = objectToString$4.call(value),
            Ctor = result == objectTag$1 ? value.constructor : undefined,
            ctorString = Ctor ? toSource(Ctor) : undefined;

        if (ctorString) {
          switch (ctorString) {
            case dataViewCtorString: return dataViewTag$1;
            case mapCtorString: return mapTag$1;
            case promiseCtorString: return promiseTag;
            case setCtorString: return setTag$1;
            case weakMapCtorString: return weakMapTag;
          }
        }
        return result;
      };
    }

    var getTag$1 = getTag;

    var argsTag$2 = '[object Arguments]';
    var arrayTag$1 = '[object Array]';
    var boolTag$1 = '[object Boolean]';
    var dateTag$1 = '[object Date]';
    var errorTag$1 = '[object Error]';
    var funcTag$1 = '[object Function]';
    var mapTag$2 = '[object Map]';
    var numberTag$1 = '[object Number]';
    var objectTag$2 = '[object Object]';
    var regexpTag$1 = '[object RegExp]';
    var setTag$2 = '[object Set]';
    var stringTag$2 = '[object String]';
    var weakMapTag$1 = '[object WeakMap]';
    var arrayBufferTag$1 = '[object ArrayBuffer]';
    var dataViewTag$2 = '[object DataView]';
    var float32Tag = '[object Float32Array]';
    var float64Tag = '[object Float64Array]';
    var int8Tag = '[object Int8Array]';
    var int16Tag = '[object Int16Array]';
    var int32Tag = '[object Int32Array]';
    var uint8Tag = '[object Uint8Array]';
    var uint8ClampedTag = '[object Uint8ClampedArray]';
    var uint16Tag = '[object Uint16Array]';
    var uint32Tag = '[object Uint32Array]';
    /** Used to identify `toStringTag` values of typed arrays. */
    var typedArrayTags = {};
    typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
    typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
    typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
    typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
    typedArrayTags[uint32Tag] = true;
    typedArrayTags[argsTag$2] = typedArrayTags[arrayTag$1] =
    typedArrayTags[arrayBufferTag$1] = typedArrayTags[boolTag$1] =
    typedArrayTags[dataViewTag$2] = typedArrayTags[dateTag$1] =
    typedArrayTags[errorTag$1] = typedArrayTags[funcTag$1] =
    typedArrayTags[mapTag$2] = typedArrayTags[numberTag$1] =
    typedArrayTags[objectTag$2] = typedArrayTags[regexpTag$1] =
    typedArrayTags[setTag$2] = typedArrayTags[stringTag$2] =
    typedArrayTags[weakMapTag$1] = false;

    /** Used for built-in method references. */
    var objectProto$11 = Object.prototype;

    /**
     * Used to resolve the
     * [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
     * of values.
     */
    var objectToString$5 = objectProto$11.toString;

    /**
     * Checks if `value` is classified as a typed array.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is correctly classified,
     *  else `false`.
     * @example
     *
     * _.isTypedArray(new Uint8Array);
     * // => true
     *
     * _.isTypedArray([]);
     * // => false
     */
    function isTypedArray(value) {
      return isObjectLike(value) &&
        isLength(value.length) && !!typedArrayTags[objectToString$5.call(value)];
    }

    /** Used to compose bitmasks for comparison styles. */
    var PARTIAL_COMPARE_FLAG$1 = 2;

    /** `Object#toString` result references. */
    var argsTag$1 = '[object Arguments]';
    var arrayTag = '[object Array]';
    var objectTag = '[object Object]';
    /** Used for built-in method references. */
    var objectProto$9 = Object.prototype;

    /** Used to check objects for own properties. */
    var hasOwnProperty$5 = objectProto$9.hasOwnProperty;

    /**
     * A specialized version of `baseIsEqual` for arrays and objects which performs
     * deep comparisons and tracks traversed objects enabling objects with circular
     * references to be compared.
     *
     * @private
     * @param {Object} object The object to compare.
     * @param {Object} other The other object to compare.
     * @param {Function} equalFunc The function to determine equivalents of values.
     * @param {Function} [customizer] The function to customize comparisons.
     * @param {number} [bitmask] The bitmask of comparison flags. See `baseIsEqual`
     *  for more details.
     * @param {Object} [stack] Tracks traversed `object` and `other` objects.
     * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
     */
    function baseIsEqualDeep(object, other, equalFunc, customizer, bitmask, stack) {
      var objIsArr = isArray(object),
          othIsArr = isArray(other),
          objTag = arrayTag,
          othTag = arrayTag;

      if (!objIsArr) {
        objTag = getTag$1(object);
        objTag = objTag == argsTag$1 ? objectTag : objTag;
      }
      if (!othIsArr) {
        othTag = getTag$1(other);
        othTag = othTag == argsTag$1 ? objectTag : othTag;
      }
      var objIsObj = objTag == objectTag && !isHostObject(object),
          othIsObj = othTag == objectTag && !isHostObject(other),
          isSameTag = objTag == othTag;

      if (isSameTag && !objIsObj) {
        stack || (stack = new Stack);
        return (objIsArr || isTypedArray(object))
          ? equalArrays(object, other, equalFunc, customizer, bitmask, stack)
          : equalByTag(object, other, objTag, equalFunc, customizer, bitmask, stack);
      }
      if (!(bitmask & PARTIAL_COMPARE_FLAG$1)) {
        var objIsWrapped = objIsObj && hasOwnProperty$5.call(object, '__wrapped__'),
            othIsWrapped = othIsObj && hasOwnProperty$5.call(other, '__wrapped__');

        if (objIsWrapped || othIsWrapped) {
          var objUnwrapped = objIsWrapped ? object.value() : object,
              othUnwrapped = othIsWrapped ? other.value() : other;

          stack || (stack = new Stack);
          return equalFunc(objUnwrapped, othUnwrapped, customizer, bitmask, stack);
        }
      }
      if (!isSameTag) {
        return false;
      }
      stack || (stack = new Stack);
      return equalObjects(object, other, equalFunc, customizer, bitmask, stack);
    }

    /**
     * The base implementation of `_.isEqual` which supports partial comparisons
     * and tracks traversed objects.
     *
     * @private
     * @param {*} value The value to compare.
     * @param {*} other The other value to compare.
     * @param {Function} [customizer] The function to customize comparisons.
     * @param {boolean} [bitmask] The bitmask of comparison flags.
     *  The bitmask may be composed of the following flags:
     *     1 - Unordered comparison
     *     2 - Partial comparison
     * @param {Object} [stack] Tracks traversed `value` and `other` objects.
     * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
     */
    function baseIsEqual(value, other, customizer, bitmask, stack) {
      if (value === other) {
        return true;
      }
      if (value == null || other == null || (!isObject(value) && !isObjectLike(other))) {
        return value !== value && other !== other;
      }
      return baseIsEqualDeep(value, other, baseIsEqual, customizer, bitmask, stack);
    }

    var UNORDERED_COMPARE_FLAG = 1;
    var PARTIAL_COMPARE_FLAG = 2;
    /**
     * The base implementation of `_.isMatch` without support for iteratee shorthands.
     *
     * @private
     * @param {Object} object The object to inspect.
     * @param {Object} source The object of property values to match.
     * @param {Array} matchData The property names, values, and compare flags to match.
     * @param {Function} [customizer] The function to customize comparisons.
     * @returns {boolean} Returns `true` if `object` is a match, else `false`.
     */
    function baseIsMatch(object, source, matchData, customizer) {
      var index = matchData.length,
          length = index,
          noCustomizer = !customizer;

      if (object == null) {
        return !length;
      }
      object = Object(object);
      while (index--) {
        var data = matchData[index];
        if ((noCustomizer && data[2])
              ? data[1] !== object[data[0]]
              : !(data[0] in object)
            ) {
          return false;
        }
      }
      while (++index < length) {
        data = matchData[index];
        var key = data[0],
            objValue = object[key],
            srcValue = data[1];

        if (noCustomizer && data[2]) {
          if (objValue === undefined && !(key in object)) {
            return false;
          }
        } else {
          var stack = new Stack;
          if (customizer) {
            var result = customizer(objValue, srcValue, key, object, source, stack);
          }
          if (!(result === undefined
                ? baseIsEqual(srcValue, objValue, customizer, UNORDERED_COMPARE_FLAG | PARTIAL_COMPARE_FLAG, stack)
                : result
              )) {
            return false;
          }
        }
      }
      return true;
    }

    /**
     * Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` if suitable for strict
     *  equality comparisons, else `false`.
     */
    function isStrictComparable(value) {
      return value === value && !isObject(value);
    }

    /**
     * Gets the property names, values, and compare flags of `object`.
     *
     * @private
     * @param {Object} object The object to query.
     * @returns {Array} Returns the match data of `object`.
     */
    function getMatchData(object) {
      var result = keys(object),
          length = result.length;

      while (length--) {
        var key = result[length],
            value = object[key];

        result[length] = [key, value, isStrictComparable(value)];
      }
      return result;
    }

    /**
     * A specialized version of `matchesProperty` for source values suitable
     * for strict equality comparisons, i.e. `===`.
     *
     * @private
     * @param {string} key The key of the property to get.
     * @param {*} srcValue The value to match.
     * @returns {Function} Returns the new spec function.
     */
    function matchesStrictComparable(key, srcValue) {
      return function(object) {
        if (object == null) {
          return false;
        }
        return object[key] === srcValue &&
          (srcValue !== undefined || (key in Object(object)));
      };
    }

    /**
     * The base implementation of `_.matches` which doesn't clone `source`.
     *
     * @private
     * @param {Object} source The object of property values to match.
     * @returns {Function} Returns the new spec function.
     */
    function baseMatches(source) {
      var matchData = getMatchData(source);
      if (matchData.length == 1 && matchData[0][2]) {
        return matchesStrictComparable(matchData[0][0], matchData[0][1]);
      }
      return function(object) {
        return object === source || baseIsMatch(object, source, matchData);
      };
    }

    /** Used as the `TypeError` message for "Functions" methods. */
    var FUNC_ERROR_TEXT$1 = 'Expected a function';

    /**
     * Creates a function that memoizes the result of `func`. If `resolver` is
     * provided, it determines the cache key for storing the result based on the
     * arguments provided to the memoized function. By default, the first argument
     * provided to the memoized function is used as the map cache key. The `func`
     * is invoked with the `this` binding of the memoized function.
     *
     * **Note:** The cache is exposed as the `cache` property on the memoized
     * function. Its creation may be customized by replacing the `_.memoize.Cache`
     * constructor with one whose instances implement the
     * [`Map`](http://ecma-international.org/ecma-262/6.0/#sec-properties-of-the-map-prototype-object)
     * method interface of `delete`, `get`, `has`, and `set`.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Function
     * @param {Function} func The function to have its output memoized.
     * @param {Function} [resolver] The function to resolve the cache key.
     * @returns {Function} Returns the new memoized function.
     * @example
     *
     * var object = { 'a': 1, 'b': 2 };
     * var other = { 'c': 3, 'd': 4 };
     *
     * var values = _.memoize(_.values);
     * values(object);
     * // => [1, 2]
     *
     * values(other);
     * // => [3, 4]
     *
     * object.a = 2;
     * values(object);
     * // => [1, 2]
     *
     * // Modify the result cache.
     * values.cache.set(object, ['a', 'b']);
     * values(object);
     * // => ['a', 'b']
     *
     * // Replace `_.memoize.Cache`.
     * _.memoize.Cache = WeakMap;
     */
    function memoize(func, resolver) {
      if (typeof func != 'function' || (resolver && typeof resolver != 'function')) {
        throw new TypeError(FUNC_ERROR_TEXT$1);
      }
      var memoized = function() {
        var args = arguments,
            key = resolver ? resolver.apply(this, args) : args[0],
            cache = memoized.cache;

        if (cache.has(key)) {
          return cache.get(key);
        }
        var result = func.apply(this, args);
        memoized.cache = cache.set(key, result);
        return result;
      };
      memoized.cache = new (memoize.Cache || MapCache);
      return memoized;
    }

    // Assign cache to `_.memoize`.
    memoize.Cache = MapCache;

    /** Used as references for various `Number` constants. */
    var INFINITY$1 = 1 / 0;

    /** Used to convert symbols to primitives and strings. */
    var symbolProto$1 = Symbol$1 ? Symbol$1.prototype : undefined;
    var symbolToString = symbolProto$1 ? symbolProto$1.toString : undefined;
    /**
     * The base implementation of `_.toString` which doesn't convert nullish
     * values to empty strings.
     *
     * @private
     * @param {*} value The value to process.
     * @returns {string} Returns the string.
     */
    function baseToString(value) {
      // Exit early for strings to avoid a performance hit in some environments.
      if (typeof value == 'string') {
        return value;
      }
      if (isSymbol(value)) {
        return symbolToString ? symbolToString.call(value) : '';
      }
      var result = (value + '');
      return (result == '0' && (1 / value) == -INFINITY$1) ? '-0' : result;
    }

    /**
     * Converts `value` to a string. An empty string is returned for `null`
     * and `undefined` values. The sign of `-0` is preserved.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to process.
     * @returns {string} Returns the string.
     * @example
     *
     * _.toString(null);
     * // => ''
     *
     * _.toString(-0);
     * // => '-0'
     *
     * _.toString([1, 2, 3]);
     * // => '1,2,3'
     */
    function toString(value) {
      return value == null ? '' : baseToString(value);
    }

    /** Used to match property names within property paths. */
    var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(\.|\[\])(?:\4|$))/g;

    /** Used to match backslashes in property paths. */
    var reEscapeChar = /\\(\\)?/g;

    /**
     * Converts `string` to a property path array.
     *
     * @private
     * @param {string} string The string to convert.
     * @returns {Array} Returns the property path array.
     */
    var stringToPath = memoize(function(string) {
      var result = [];
      toString(string).replace(rePropName, function(match, number, quote, string) {
        result.push(quote ? string.replace(reEscapeChar, '$1') : (number || match));
      });
      return result;
    });

    /**
     * Casts `value` to a path array if it's not one.
     *
     * @private
     * @param {*} value The value to inspect.
     * @returns {Array} Returns the cast property path array.
     */
    function castPath(value) {
      return isArray(value) ? value : stringToPath(value);
    }

    var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/;
    var reIsPlainProp = /^\w*$/;
    /**
     * Checks if `value` is a property name and not a property path.
     *
     * @private
     * @param {*} value The value to check.
     * @param {Object} [object] The object to query keys on.
     * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
     */
    function isKey(value, object) {
      if (isArray(value)) {
        return false;
      }
      var type = typeof value;
      if (type == 'number' || type == 'symbol' || type == 'boolean' ||
          value == null || isSymbol(value)) {
        return true;
      }
      return reIsPlainProp.test(value) || !reIsDeepProp.test(value) ||
        (object != null && value in Object(object));
    }

    /** Used as references for various `Number` constants. */
    var INFINITY$2 = 1 / 0;

    /**
     * Converts `value` to a string key if it's not a string or symbol.
     *
     * @private
     * @param {*} value The value to inspect.
     * @returns {string|symbol} Returns the key.
     */
    function toKey(value) {
      if (typeof value == 'string' || isSymbol(value)) {
        return value;
      }
      var result = (value + '');
      return (result == '0' && (1 / value) == -INFINITY$2) ? '-0' : result;
    }

    /**
     * The base implementation of `_.get` without support for default values.
     *
     * @private
     * @param {Object} object The object to query.
     * @param {Array|string} path The path of the property to get.
     * @returns {*} Returns the resolved value.
     */
    function baseGet(object, path) {
      path = isKey(path, object) ? [path] : castPath(path);

      var index = 0,
          length = path.length;

      while (object != null && index < length) {
        object = object[toKey(path[index++])];
      }
      return (index && index == length) ? object : undefined;
    }

    /**
     * Gets the value at `path` of `object`. If the resolved value is
     * `undefined`, the `defaultValue` is used in its place.
     *
     * @static
     * @memberOf _
     * @since 3.7.0
     * @category Object
     * @param {Object} object The object to query.
     * @param {Array|string} path The path of the property to get.
     * @param {*} [defaultValue] The value returned for `undefined` resolved values.
     * @returns {*} Returns the resolved value.
     * @example
     *
     * var object = { 'a': [{ 'b': { 'c': 3 } }] };
     *
     * _.get(object, 'a[0].b.c');
     * // => 3
     *
     * _.get(object, ['a', '0', 'b', 'c']);
     * // => 3
     *
     * _.get(object, 'a.b.c', 'default');
     * // => 'default'
     */
    function get(object, path, defaultValue) {
      var result = object == null ? undefined : baseGet(object, path);
      return result === undefined ? defaultValue : result;
    }

    /**
     * The base implementation of `_.hasIn` without support for deep paths.
     *
     * @private
     * @param {Object} [object] The object to query.
     * @param {Array|string} key The key to check.
     * @returns {boolean} Returns `true` if `key` exists, else `false`.
     */
    function baseHasIn(object, key) {
      return object != null && key in Object(object);
    }

    /**
     * Checks if `path` exists on `object`.
     *
     * @private
     * @param {Object} object The object to query.
     * @param {Array|string} path The path to check.
     * @param {Function} hasFunc The function to check properties.
     * @returns {boolean} Returns `true` if `path` exists, else `false`.
     */
    function hasPath(object, path, hasFunc) {
      path = isKey(path, object) ? [path] : castPath(path);

      var result,
          index = -1,
          length = path.length;

      while (++index < length) {
        var key = toKey(path[index]);
        if (!(result = object != null && hasFunc(object, key))) {
          break;
        }
        object = object[key];
      }
      if (result) {
        return result;
      }
      var length = object ? object.length : 0;
      return !!length && isLength(length) && isIndex(key, length) &&
        (isArray(object) || isString(object) || isArguments(object));
    }

    /**
     * Checks if `path` is a direct or inherited property of `object`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Object
     * @param {Object} object The object to query.
     * @param {Array|string} path The path to check.
     * @returns {boolean} Returns `true` if `path` exists, else `false`.
     * @example
     *
     * var object = _.create({ 'a': _.create({ 'b': 2 }) });
     *
     * _.hasIn(object, 'a');
     * // => true
     *
     * _.hasIn(object, 'a.b');
     * // => true
     *
     * _.hasIn(object, ['a', 'b']);
     * // => true
     *
     * _.hasIn(object, 'b');
     * // => false
     */
    function hasIn(object, path) {
      return object != null && hasPath(object, path, baseHasIn);
    }

    var UNORDERED_COMPARE_FLAG$3 = 1;
    var PARTIAL_COMPARE_FLAG$5 = 2;
    /**
     * The base implementation of `_.matchesProperty` which doesn't clone `srcValue`.
     *
     * @private
     * @param {string} path The path of the property to get.
     * @param {*} srcValue The value to match.
     * @returns {Function} Returns the new spec function.
     */
    function baseMatchesProperty(path, srcValue) {
      if (isKey(path) && isStrictComparable(srcValue)) {
        return matchesStrictComparable(toKey(path), srcValue);
      }
      return function(object) {
        var objValue = get(object, path);
        return (objValue === undefined && objValue === srcValue)
          ? hasIn(object, path)
          : baseIsEqual(srcValue, objValue, undefined, UNORDERED_COMPARE_FLAG$3 | PARTIAL_COMPARE_FLAG$5);
      };
    }

    /**
     * This method returns the first argument given to it.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Util
     * @param {*} value Any value.
     * @returns {*} Returns `value`.
     * @example
     *
     * var object = { 'user': 'fred' };
     *
     * console.log(_.identity(object) === object);
     * // => true
     */
    function identity(value) {
      return value;
    }

    /**
     * A specialized version of `baseProperty` which supports deep paths.
     *
     * @private
     * @param {Array|string} path The path of the property to get.
     * @returns {Function} Returns the new accessor function.
     */
    function basePropertyDeep(path) {
      return function(object) {
        return baseGet(object, path);
      };
    }

    /**
     * Creates a function that returns the value at `path` of a given object.
     *
     * @static
     * @memberOf _
     * @since 2.4.0
     * @category Util
     * @param {Array|string} path The path of the property to get.
     * @returns {Function} Returns the new accessor function.
     * @example
     *
     * var objects = [
     *   { 'a': { 'b': 2 } },
     *   { 'a': { 'b': 1 } }
     * ];
     *
     * _.map(objects, _.property('a.b'));
     * // => [2, 1]
     *
     * _.map(_.sortBy(objects, _.property(['a', 'b'])), 'a.b');
     * // => [1, 2]
     */
    function property(path) {
      return isKey(path) ? baseProperty(toKey(path)) : basePropertyDeep(path);
    }

    /**
     * The base implementation of `_.iteratee`.
     *
     * @private
     * @param {*} [value=_.identity] The value to convert to an iteratee.
     * @returns {Function} Returns the iteratee.
     */
    function baseIteratee(value) {
      // Don't store the `typeof` result in a variable to avoid a JIT bug in Safari 9.
      // See https://bugs.webkit.org/show_bug.cgi?id=156034 for more details.
      if (typeof value == 'function') {
        return value;
      }
      if (value == null) {
        return identity;
      }
      if (typeof value == 'object') {
        return isArray(value)
          ? baseMatchesProperty(value[0], value[1])
          : baseMatches(value);
      }
      return property(value);
    }

    /**
     * Iterates over own enumerable string keyed properties of an object and
     * invokes `iteratee` for each property. The iteratee is invoked with three
     * arguments: (value, key, object). Iteratee functions may exit iteration
     * early by explicitly returning `false`.
     *
     * @static
     * @memberOf _
     * @since 0.3.0
     * @category Object
     * @param {Object} object The object to iterate over.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @returns {Object} Returns `object`.
     * @see _.forOwnRight
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     *   this.b = 2;
     * }
     *
     * Foo.prototype.c = 3;
     *
     * _.forOwn(new Foo, function(value, key) {
     *   console.log(key);
     * });
     * // => Logs 'a' then 'b' (iteration order is not guaranteed).
     */
    function forOwn(object, iteratee) {
      return object && baseForOwn(object, baseIteratee(iteratee, 3));
    }

    /**
     * Gets the index at which the first occurrence of `NaN` is found in `array`.
     *
     * @private
     * @param {Array} array The array to search.
     * @param {number} fromIndex The index to search from.
     * @param {boolean} [fromRight] Specify iterating from right to left.
     * @returns {number} Returns the index of the matched `NaN`, else `-1`.
     */
    function indexOfNaN(array, fromIndex, fromRight) {
      var length = array.length,
          index = fromIndex + (fromRight ? 1 : -1);

      while ((fromRight ? index-- : ++index < length)) {
        var other = array[index];
        if (other !== other) {
          return index;
        }
      }
      return -1;
    }

    /**
     * The base implementation of `_.indexOf` without `fromIndex` bounds checks.
     *
     * @private
     * @param {Array} array The array to search.
     * @param {*} value The value to search for.
     * @param {number} fromIndex The index to search from.
     * @returns {number} Returns the index of the matched value, else `-1`.
     */
    function baseIndexOf(array, value, fromIndex) {
      if (value !== value) {
        return indexOfNaN(array, fromIndex);
      }
      var index = fromIndex - 1,
          length = array.length;

      while (++index < length) {
        if (array[index] === value) {
          return index;
        }
      }
      return -1;
    }

    /**
     * Determines the best order for running the functions in `tasks`, based on
     * their requirements. Each function can optionally depend on other functions
     * being completed first, and each function is run as soon as its requirements
     * are satisfied.
     *
     * If any of the functions pass an error to their callback, the `auto` sequence
     * will stop. Further tasks will not execute (so any other functions depending
     * on it will not run), and the main `callback` is immediately called with the
     * error.
     *
     * Functions also receive an object containing the results of functions which
     * have completed so far as the first argument, if they have dependencies. If a
     * task function has no dependencies, it will only be passed a callback.
     *
     * @name auto
     * @static
     * @memberOf async
     * @category Control Flow
     * @param {Object} tasks - An object. Each of its properties is either a
     * function or an array of requirements, with the function itself the last item
     * in the array. The object's key of a property serves as the name of the task
     * defined by that property, i.e. can be used when specifying requirements for
     * other tasks. The function receives one or two arguments:
     * * a `results` object, containing the results of the previously executed
     *   functions, only passed if the task has any dependencies,
     * * a `callback(err, result)` function, which must be called when finished,
     *   passing an `error` (which can be `null`) and the result of the function's
     *   execution.
     * @param {number} [concurrency=Infinity] - An optional `integer` for
     * determining the maximum number of tasks that can be run in parallel. By
     * default, as many as possible.
     * @param {Function} [callback] - An optional callback which is called when all
     * the tasks have been completed. It receives the `err` argument if any `tasks`
     * pass an error to their callback. Results are always returned; however, if an
     * error occurs, no further `tasks` will be performed, and the results object
     * will only contain partial results. Invoked with (err, results).
     * @example
     *
     * async.auto({
     *     // this function will just be passed a callback
     *     readData: async.apply(fs.readFile, 'data.txt', 'utf-8'),
     *     showData: ['readData', function(results, cb) {
     *         // results.readData is the file's contents
     *         // ...
     *     }]
     * }, callback);
     *
     * async.auto({
     *     get_data: function(callback) {
     *         console.log('in get_data');
     *         // async code to get some data
     *         callback(null, 'data', 'converted to array');
     *     },
     *     make_folder: function(callback) {
     *         console.log('in make_folder');
     *         // async code to create a directory to store a file in
     *         // this is run at the same time as getting the data
     *         callback(null, 'folder');
     *     },
     *     write_file: ['get_data', 'make_folder', function(results, callback) {
     *         console.log('in write_file', JSON.stringify(results));
     *         // once there is some data and the directory exists,
     *         // write the data to a file in the directory
     *         callback(null, 'filename');
     *     }],
     *     email_link: ['write_file', function(results, callback) {
     *         console.log('in email_link', JSON.stringify(results));
     *         // once the file is written let's email a link to it...
     *         // results.write_file contains the filename returned by write_file.
     *         callback(null, {'file':results.write_file, 'email':'user@example.com'});
     *     }]
     * }, function(err, results) {
     *     console.log('err = ', err);
     *     console.log('results = ', results);
     * });
     */
    function auto (tasks, concurrency, callback) {
        if (typeof concurrency === 'function') {
            // concurrency is optional, shift the args.
            callback = concurrency;
            concurrency = null;
        }
        callback = once(callback || noop);
        var keys$$ = keys(tasks);
        var numTasks = keys$$.length;
        if (!numTasks) {
            return callback(null);
        }
        if (!concurrency) {
            concurrency = numTasks;
        }

        var results = {};
        var runningTasks = 0;
        var hasError = false;

        var listeners = {};

        var readyTasks = [];

        // for cycle detection:
        var readyToCheck = []; // tasks that have been identified as reachable
        // without the possibility of returning to an ancestor task
        var uncheckedDependencies = {};

        forOwn(tasks, function (task, key) {
            if (!isArray(task)) {
                // no dependencies
                enqueueTask(key, [task]);
                readyToCheck.push(key);
                return;
            }

            var dependencies = task.slice(0, task.length - 1);
            var remainingDependencies = dependencies.length;
            if (remainingDependencies === 0) {
                enqueueTask(key, task);
                readyToCheck.push(key);
                return;
            }
            uncheckedDependencies[key] = remainingDependencies;

            arrayEach(dependencies, function (dependencyName) {
                if (!tasks[dependencyName]) {
                    throw new Error('async.auto task `' + key + '` has a non-existent dependency in ' + dependencies.join(', '));
                }
                addListener(dependencyName, function () {
                    remainingDependencies--;
                    if (remainingDependencies === 0) {
                        enqueueTask(key, task);
                    }
                });
            });
        });

        checkForDeadlocks();
        processQueue();

        function enqueueTask(key, task) {
            readyTasks.push(function () {
                runTask(key, task);
            });
        }

        function processQueue() {
            if (readyTasks.length === 0 && runningTasks === 0) {
                return callback(null, results);
            }
            while (readyTasks.length && runningTasks < concurrency) {
                var run = readyTasks.shift();
                run();
            }
        }

        function addListener(taskName, fn) {
            var taskListeners = listeners[taskName];
            if (!taskListeners) {
                taskListeners = listeners[taskName] = [];
            }

            taskListeners.push(fn);
        }

        function taskComplete(taskName) {
            var taskListeners = listeners[taskName] || [];
            arrayEach(taskListeners, function (fn) {
                fn();
            });
            processQueue();
        }

        function runTask(key, task) {
            if (hasError) return;

            var taskCallback = onlyOnce(rest(function (err, args) {
                runningTasks--;
                if (args.length <= 1) {
                    args = args[0];
                }
                if (err) {
                    var safeResults = {};
                    forOwn(results, function (val, rkey) {
                        safeResults[rkey] = val;
                    });
                    safeResults[key] = args;
                    hasError = true;
                    listeners = [];

                    callback(err, safeResults);
                } else {
                    results[key] = args;
                    taskComplete(key);
                }
            }));

            runningTasks++;
            var taskFn = task[task.length - 1];
            if (task.length > 1) {
                taskFn(results, taskCallback);
            } else {
                taskFn(taskCallback);
            }
        }

        function checkForDeadlocks() {
            // Kahn's algorithm
            // https://en.wikipedia.org/wiki/Topological_sorting#Kahn.27s_algorithm
            // http://connalle.blogspot.com/2013/10/topological-sortingkahn-algorithm.html
            var currentTask;
            var counter = 0;
            while (readyToCheck.length) {
                currentTask = readyToCheck.pop();
                counter++;
                arrayEach(getDependents(currentTask), function (dependent) {
                    if (! --uncheckedDependencies[dependent]) {
                        readyToCheck.push(dependent);
                    }
                });
            }

            if (counter !== numTasks) {
                throw new Error('async.auto cannot execute tasks due to a recursive dependency');
            }
        }

        function getDependents(taskName) {
            var result = [];
            forOwn(tasks, function (task, key) {
                if (isArray(task) && baseIndexOf(task, taskName, 0) >= 0) {
                    result.push(key);
                }
            });
            return result;
        }
    }

    /**
     * A specialized version of `_.map` for arrays without support for iteratee
     * shorthands.
     *
     * @private
     * @param {Array} [array] The array to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @returns {Array} Returns the new mapped array.
     */
    function arrayMap(array, iteratee) {
      var index = -1,
          length = array ? array.length : 0,
          result = Array(length);

      while (++index < length) {
        result[index] = iteratee(array[index], index, array);
      }
      return result;
    }

    /**
     * Copies the values of `source` to `array`.
     *
     * @private
     * @param {Array} source The array to copy values from.
     * @param {Array} [array=[]] The array to copy values to.
     * @returns {Array} Returns `array`.
     */
    function copyArray(source, array) {
      var index = -1,
          length = source.length;

      array || (array = Array(length));
      while (++index < length) {
        array[index] = source[index];
      }
      return array;
    }

    /**
     * The base implementation of `_.slice` without an iteratee call guard.
     *
     * @private
     * @param {Array} array The array to slice.
     * @param {number} [start=0] The start position.
     * @param {number} [end=array.length] The end position.
     * @returns {Array} Returns the slice of `array`.
     */
    function baseSlice(array, start, end) {
      var index = -1,
          length = array.length;

      if (start < 0) {
        start = -start > length ? 0 : (length + start);
      }
      end = end > length ? length : end;
      if (end < 0) {
        end += length;
      }
      length = start > end ? 0 : ((end - start) >>> 0);
      start >>>= 0;

      var result = Array(length);
      while (++index < length) {
        result[index] = array[index + start];
      }
      return result;
    }

    /**
     * Casts `array` to a slice if it's needed.
     *
     * @private
     * @param {Array} array The array to inspect.
     * @param {number} start The start position.
     * @param {number} [end=array.length] The end position.
     * @returns {Array} Returns the cast slice.
     */
    function castSlice(array, start, end) {
      var length = array.length;
      end = end === undefined ? length : end;
      return (!start && end >= length) ? array : baseSlice(array, start, end);
    }

    /**
     * Used by `_.trim` and `_.trimEnd` to get the index of the last string symbol
     * that is not found in the character symbols.
     *
     * @private
     * @param {Array} strSymbols The string symbols to inspect.
     * @param {Array} chrSymbols The character symbols to find.
     * @returns {number} Returns the index of the last unmatched string symbol.
     */
    function charsEndIndex(strSymbols, chrSymbols) {
      var index = strSymbols.length;

      while (index-- && baseIndexOf(chrSymbols, strSymbols[index], 0) > -1) {}
      return index;
    }

    /**
     * Used by `_.trim` and `_.trimStart` to get the index of the first string symbol
     * that is not found in the character symbols.
     *
     * @private
     * @param {Array} strSymbols The string symbols to inspect.
     * @param {Array} chrSymbols The character symbols to find.
     * @returns {number} Returns the index of the first unmatched string symbol.
     */
    function charsStartIndex(strSymbols, chrSymbols) {
      var index = -1,
          length = strSymbols.length;

      while (++index < length && baseIndexOf(chrSymbols, strSymbols[index], 0) > -1) {}
      return index;
    }

    /** Used to compose unicode character classes. */
    var rsAstralRange = '\\ud800-\\udfff';
    var rsComboMarksRange = '\\u0300-\\u036f\\ufe20-\\ufe23';
    var rsComboSymbolsRange = '\\u20d0-\\u20f0';
    var rsVarRange = '\\ufe0e\\ufe0f';
    var rsAstral = '[' + rsAstralRange + ']';
    var rsCombo = '[' + rsComboMarksRange + rsComboSymbolsRange + ']';
    var rsFitz = '\\ud83c[\\udffb-\\udfff]';
    var rsModifier = '(?:' + rsCombo + '|' + rsFitz + ')';
    var rsNonAstral = '[^' + rsAstralRange + ']';
    var rsRegional = '(?:\\ud83c[\\udde6-\\uddff]){2}';
    var rsSurrPair = '[\\ud800-\\udbff][\\udc00-\\udfff]';
    var rsZWJ = '\\u200d';
    var reOptMod = rsModifier + '?';
    var rsOptVar = '[' + rsVarRange + ']?';
    var rsOptJoin = '(?:' + rsZWJ + '(?:' + [rsNonAstral, rsRegional, rsSurrPair].join('|') + ')' + rsOptVar + reOptMod + ')*';
    var rsSeq = rsOptVar + reOptMod + rsOptJoin;
    var rsSymbol = '(?:' + [rsNonAstral + rsCombo + '?', rsCombo, rsRegional, rsSurrPair, rsAstral].join('|') + ')';
    /** Used to match [string symbols](https://mathiasbynens.be/notes/javascript-unicode). */
    var reComplexSymbol = RegExp(rsFitz + '(?=' + rsFitz + ')|' + rsSymbol + rsSeq, 'g');

    /**
     * Converts `string` to an array.
     *
     * @private
     * @param {string} string The string to convert.
     * @returns {Array} Returns the converted array.
     */
    function stringToArray(string) {
      return string.match(reComplexSymbol);
    }

    /** Used to match leading and trailing whitespace. */
    var reTrim$1 = /^\s+|\s+$/g;

    /**
     * Removes leading and trailing whitespace or specified characters from `string`.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category String
     * @param {string} [string=''] The string to trim.
     * @param {string} [chars=whitespace] The characters to trim.
     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
     * @returns {string} Returns the trimmed string.
     * @example
     *
     * _.trim('  abc  ');
     * // => 'abc'
     *
     * _.trim('-_-abc-_-', '_-');
     * // => 'abc'
     *
     * _.map(['  foo  ', '  bar  '], _.trim);
     * // => ['foo', 'bar']
     */
    function trim(string, chars, guard) {
      string = toString(string);
      if (string && (guard || chars === undefined)) {
        return string.replace(reTrim$1, '');
      }
      if (!string || !(chars = baseToString(chars))) {
        return string;
      }
      var strSymbols = stringToArray(string),
          chrSymbols = stringToArray(chars),
          start = charsStartIndex(strSymbols, chrSymbols),
          end = charsEndIndex(strSymbols, chrSymbols) + 1;

      return castSlice(strSymbols, start, end).join('');
    }

    var argsRegex = /^(function[^\(]*)?\(?\s*([^\)=]*)/m;

    function parseParams(func) {
        return trim(func.toString().match(argsRegex)[2]).split(/\s*\,\s*/);
    }

    /**
     * A dependency-injected version of the {@link async.auto} function. Dependent
     * tasks are specified as parameters to the function, after the usual callback
     * parameter, with the parameter names matching the names of the tasks it
     * depends on. This can provide even more readable task graphs which can be
     * easier to maintain.
     *
     * If a final callback is specified, the task results are similarly injected,
     * specified as named parameters after the initial error parameter.
     *
     * The autoInject function is purely syntactic sugar and its semantics are
     * otherwise equivalent to {@link async.auto}.
     *
     * @name autoInject
     * @static
     * @memberOf async
     * @see async.auto
     * @category Control Flow
     * @param {Object} tasks - An object, each of whose properties is a function of
     * the form 'func([dependencies...], callback). The object's key of a property
     * serves as the name of the task defined by that property, i.e. can be used
     * when specifying requirements for other tasks.
     * * The `callback` parameter is a `callback(err, result)` which must be called
     *   when finished, passing an `error` (which can be `null`) and the result of
     *   the function's execution. The remaining parameters name other tasks on
     *   which the task is dependent, and the results from those tasks are the
     *   arguments of those parameters.
     * @param {Function} [callback] - An optional callback which is called when all
     * the tasks have been completed. It receives the `err` argument if any `tasks`
     * pass an error to their callback. The remaining parameters are task names
     * whose results you are interested in. This callback will only be called when
     * all tasks have finished or an error has occurred, and so do not specify
     * dependencies in the same way as `tasks` do. If an error occurs, no further
     * `tasks` will be performed, and `results` will only be valid for those tasks
     * which managed to complete. Invoked with (err, [results...]).
     * @example
     *
     * //  The example from `auto` can be rewritten as follows:
     * async.autoInject({
     *     get_data: function(callback) {
     *         // async code to get some data
     *         callback(null, 'data', 'converted to array');
     *     },
     *     make_folder: function(callback) {
     *         // async code to create a directory to store a file in
     *         // this is run at the same time as getting the data
     *         callback(null, 'folder');
     *     },
     *     write_file: function(get_data, make_folder, callback) {
     *         // once there is some data and the directory exists,
     *         // write the data to a file in the directory
     *         callback(null, 'filename');
     *     },
     *     email_link: function(write_file, callback) {
     *         // once the file is written let's email a link to it...
     *         // write_file contains the filename returned by write_file.
     *         callback(null, {'file':write_file, 'email':'user@example.com'});
     *     }
     * }, function(err, email_link) {
     *     console.log('err = ', err);
     *     console.log('email_link = ', email_link);
     * });
     *
     * // If you are using a JS minifier that mangles parameter names, `autoInject`
     * // will not work with plain functions, since the parameter names will be
     * // collapsed to a single letter identifier.  To work around this, you can
     * // explicitly specify the names of the parameters your task function needs
     * // in an array, similar to Angular.js dependency injection.  The final
     * // results callback can be provided as an array in the same way.
     *
     * // This still has an advantage over plain `auto`, since the results a task
     * // depends on are still spread into arguments.
     * async.autoInject({
     *     //...
     *     write_file: ['get_data', 'make_folder', function(get_data, make_folder, callback) {
     *         callback(null, 'filename');
     *     }],
     *     email_link: ['write_file', function(write_file, callback) {
     *         callback(null, {'file':write_file, 'email':'user@example.com'});
     *     }]
     *     //...
     * }, ['email_link', function(err, email_link) {
     *     console.log('err = ', err);
     *     console.log('email_link = ', email_link);
     * }]);
     */
    function autoInject(tasks, callback) {
        var newTasks = {};

        forOwn(tasks, function (taskFn, key) {
            var params;

            if (isArray(taskFn)) {
                params = copyArray(taskFn);
                taskFn = params.pop();

                newTasks[key] = params.concat(params.length > 0 ? newTask : taskFn);
            } else if (taskFn.length === 0) {
                throw new Error("autoInject task functions require explicit parameters.");
            } else if (taskFn.length === 1) {
                // no dependencies, use the function as-is
                newTasks[key] = taskFn;
            } else {
                params = parseParams(taskFn);
                params.pop();

                newTasks[key] = params.concat(newTask);
            }

            function newTask(results, taskCb) {
                var newArgs = arrayMap(params, function (name) {
                    return results[name];
                });
                newArgs.push(taskCb);
                taskFn.apply(null, newArgs);
            }
        });

        auto(newTasks, callback);
    }

    var hasSetImmediate = typeof setImmediate === 'function' && setImmediate;
    var hasNextTick = typeof process === 'object' && typeof process.nextTick === 'function';

    function fallback(fn) {
        setTimeout(fn, 0);
    }

    function wrap(defer) {
        return rest(function (fn, args) {
            defer(function () {
                fn.apply(null, args);
            });
        });
    }

    var _defer;

    if (hasSetImmediate) {
        _defer = setImmediate;
    } else if (hasNextTick) {
        _defer = process.nextTick;
    } else {
        _defer = fallback;
    }

    var setImmediate$1 = wrap(_defer);

    function queue(worker, concurrency, payload) {
        if (concurrency == null) {
            concurrency = 1;
        } else if (concurrency === 0) {
            throw new Error('Concurrency must not be zero');
        }
        function _insert(q, data, pos, callback) {
            if (callback != null && typeof callback !== 'function') {
                throw new Error('task callback must be a function');
            }
            q.started = true;
            if (!isArray(data)) {
                data = [data];
            }
            if (data.length === 0 && q.idle()) {
                // call drain immediately if there are no tasks
                return setImmediate$1(function () {
                    q.drain();
                });
            }
            arrayEach(data, function (task) {
                var item = {
                    data: task,
                    callback: callback || noop
                };

                if (pos) {
                    q.tasks.unshift(item);
                } else {
                    q.tasks.push(item);
                }
            });
            setImmediate$1(q.process);
        }
        function _next(q, tasks) {
            return function () {
                workers -= 1;

                var removed = false;
                var args = arguments;
                arrayEach(tasks, function (task) {
                    arrayEach(workersList, function (worker, index) {
                        if (worker === task && !removed) {
                            workersList.splice(index, 1);
                            removed = true;
                        }
                    });

                    task.callback.apply(task, args);

                    if (args[0] != null) {
                        q.error(args[0], task.data);
                    }
                });

                if (workers <= q.concurrency - q.buffer) {
                    q.unsaturated();
                }

                if (q.tasks.length + workers === 0) {
                    q.drain();
                }
                q.process();
            };
        }

        var workers = 0;
        var workersList = [];
        var q = {
            tasks: [],
            concurrency: concurrency,
            payload: payload,
            saturated: noop,
            unsaturated: noop,
            buffer: concurrency / 4,
            empty: noop,
            drain: noop,
            error: noop,
            started: false,
            paused: false,
            push: function (data, callback) {
                _insert(q, data, false, callback);
            },
            kill: function () {
                q.drain = noop;
                q.tasks = [];
            },
            unshift: function (data, callback) {
                _insert(q, data, true, callback);
            },
            process: function () {
                while (!q.paused && workers < q.concurrency && q.tasks.length) {

                    var tasks = q.payload ? q.tasks.splice(0, q.payload) : q.tasks.splice(0, q.tasks.length);

                    var data = arrayMap(tasks, baseProperty('data'));

                    if (q.tasks.length === 0) {
                        q.empty();
                    }
                    workers += 1;
                    workersList.push(tasks[0]);

                    if (workers === q.concurrency) {
                        q.saturated();
                    }

                    var cb = onlyOnce(_next(q, tasks));
                    worker(data, cb);
                }
            },
            length: function () {
                return q.tasks.length;
            },
            running: function () {
                return workers;
            },
            workersList: function () {
                return workersList;
            },
            idle: function () {
                return q.tasks.length + workers === 0;
            },
            pause: function () {
                q.paused = true;
            },
            resume: function () {
                if (q.paused === false) {
                    return;
                }
                q.paused = false;
                var resumeCount = Math.min(q.concurrency, q.tasks.length);
                // Need to call q.process once per concurrent
                // worker to preserve full concurrency after pause
                for (var w = 1; w <= resumeCount; w++) {
                    setImmediate$1(q.process);
                }
            }
        };
        return q;
    }

    /**
     * A cargo of tasks for the worker function to complete. Cargo inherits all of
     * the same methods and event callbacks as {@link async.queue}.
     * @typedef {Object} cargo
     * @property {Function} length - A function returning the number of items
     * waiting to be processed. Invoke with ().
     * @property {number} payload - An `integer` for determining how many tasks
     * should be process per round. This property can be changed after a `cargo` is
     * created to alter the payload on-the-fly.
     * @property {Function} push - Adds `task` to the `queue`. The callback is
     * called once the `worker` has finished processing the task. Instead of a
     * single task, an array of `tasks` can be submitted. The respective callback is
     * used for every task in the list. Invoke with (task, [callback]).
     * @property {Function} saturated - A callback that is called when the
     * `queue.length()` hits the concurrency and further tasks will be queued.
     * @property {Function} empty - A callback that is called when the last item
     * from the `queue` is given to a `worker`.
     * @property {Function} drain - A callback that is called when the last item
     * from the `queue` has returned from the `worker`.
     * @property {Function} idle - a function returning false if there are items
     * waiting or being processed, or true if not. Invoke with ().
     * @property {Function} pause - a function that pauses the processing of tasks
     * until `resume()` is called. Invoke with ().
     * @property {Function} resume - a function that resumes the processing of
     * queued tasks when the queue is paused. Invoke with ().
     * @property {Function} kill - a function that removes the `drain` callback and
     * empties remaining tasks from the queue forcing it to go idle. Invoke with ().
     */

    /**
     * Creates a `cargo` object with the specified payload. Tasks added to the
     * cargo will be processed altogether (up to the `payload` limit). If the
     * `worker` is in progress, the task is queued until it becomes available. Once
     * the `worker` has completed some tasks, each callback of those tasks is
     * called. Check out [these](https://camo.githubusercontent.com/6bbd36f4cf5b35a0f11a96dcd2e97711ffc2fb37/68747470733a2f2f662e636c6f75642e6769746875622e636f6d2f6173736574732f313637363837312f36383130382f62626330636662302d356632392d313165322d393734662d3333393763363464633835382e676966) [animations](https://camo.githubusercontent.com/f4810e00e1c5f5f8addbe3e9f49064fd5d102699/68747470733a2f2f662e636c6f75642e6769746875622e636f6d2f6173736574732f313637363837312f36383130312f38346339323036362d356632392d313165322d383134662d3964336430323431336266642e676966)
     * for how `cargo` and `queue` work.
     *
     * While [queue](#queue) passes only one task to one of a group of workers
     * at a time, cargo passes an array of tasks to a single worker, repeating
     * when the worker is finished.
     *
     * @name cargo
     * @static
     * @memberOf async
     * @see async.queue
     * @category Control Flow
     * @param {Function} worker - An asynchronous function for processing an array
     * of queued tasks, which must call its `callback(err)` argument when finished,
     * with an optional `err` argument. Invoked with (tasks, callback).
     * @param {number} [payload=Infinity] - An optional `integer` for determining
     * how many tasks should be processed per round; if omitted, the default is
     * unlimited.
     * @returns {cargo} A cargo object to manage the tasks. Callbacks can
     * attached as certain properties to listen for specific events during the
     * lifecycle of the cargo and inner queue.
     * @example
     *
     * // create a cargo object with payload 2
     * var cargo = async.cargo(function(tasks, callback) {
     *     for (var i=0; i<tasks.length; i++) {
     *         console.log('hello ' + tasks[i].name);
     *     }
     *     callback();
     * }, 2);
     *
     * // add some items
     * cargo.push({name: 'foo'}, function(err) {
     *     console.log('finished processing foo');
     * });
     * cargo.push({name: 'bar'}, function(err) {
     *     console.log('finished processing bar');
     * });
     * cargo.push({name: 'baz'}, function(err) {
     *     console.log('finished processing baz');
     * });
     */
    function cargo(worker, payload) {
      return queue(worker, 1, payload);
    }

    /**
     * The same as `eachOf` but runs a maximum of `limit` async operations at a
     * time.
     *
     * @name eachOfLimit
     * @static
     * @memberOf async
     * @see async.eachOf
     * @alias forEachOfLimit
     * @category Collection
     * @param {Array|Object} coll - A collection to iterate over.
     * @param {number} limit - The maximum number of async operations at a time.
     * @param {Function} iteratee - A function to apply to each
     * item in `coll`. The `key` is the item's key, or index in the case of an
     * array. The iteratee is passed a `callback(err)` which must be called once it
     * has completed. If no error has occurred, the callback should be run without
     * arguments or with an explicit `null` argument. Invoked with
     * (item, key, callback).
     * @param {Function} [callback] - A callback which is called when all
     * `iteratee` functions have finished, or an error occurs. Invoked with (err).
     */
    function eachOfLimit(obj, limit, iteratee, cb) {
      _eachOfLimit(limit)(obj, iteratee, cb);
    }

    /**
     * The same as `eachOf` but runs only a single async operation at a time.
     *
     * @name eachOfSeries
     * @static
     * @memberOf async
     * @see async.eachOf
     * @alias forEachOfSeries
     * @category Collection
     * @param {Array|Object} coll - A collection to iterate over.
     * @param {Function} iteratee - A function to apply to each item in `coll`. The
     * `key` is the item's key, or index in the case of an array. The iteratee is
     * passed a `callback(err)` which must be called once it has completed. If no
     * error has occurred, the callback should be run without arguments or with an
     * explicit `null` argument. Invoked with (item, key, callback).
     * @param {Function} [callback] - A callback which is called when all `iteratee`
     * functions have finished, or an error occurs. Invoked with (err).
     */
    var eachOfSeries = doLimit(eachOfLimit, 1);

    /**
     * Reduces `coll` into a single value using an async `iteratee` to return each
     * successive step. `memo` is the initial state of the reduction. This function
     * only operates in series.
     *
     * For performance reasons, it may make sense to split a call to this function
     * into a parallel map, and then use the normal `Array.prototype.reduce` on the
     * results. This function is for situations where each step in the reduction
     * needs to be async; if you can get the data before reducing it, then it's
     * probably a good idea to do so.
     *
     * @name reduce
     * @static
     * @memberOf async
     * @alias inject, foldl
     * @category Collection
     * @param {Array|Object} coll - A collection to iterate over.
     * @param {*} memo - The initial state of the reduction.
     * @param {Function} iteratee - A function applied to each item in the
     * array to produce the next step in the reduction. The `iteratee` is passed a
     * `callback(err, reduction)` which accepts an optional error as its first
     * argument, and the state of the reduction as the second. If an error is
     * passed to the callback, the reduction is stopped and the main `callback` is
     * immediately called with the error. Invoked with (memo, item, callback).
     * @param {Function} [callback] - A callback which is called after all the
     * `iteratee` functions have finished. Result is the reduced value. Invoked with
     * (err, result).
     * @example
     *
     * async.reduce([1,2,3], 0, function(memo, item, callback) {
     *     // pointless async:
     *     process.nextTick(function() {
     *         callback(null, memo + item)
     *     });
     * }, function(err, result) {
     *     // result is now equal to the last value of memo, which is 6
     * });
     */
    function reduce(arr, memo, iteratee, cb) {
        eachOfSeries(arr, function (x, i, cb) {
            iteratee(memo, x, function (err, v) {
                memo = v;
                cb(err);
            });
        }, function (err) {
            cb(err, memo);
        });
    }

    /**
     * Version of the compose function that is more natural to read. Each function
     * consumes the return value of the previous function. It is the equivalent of
     * {@link async.compose} with the arguments reversed.
     *
     * Each function is executed with the `this` binding of the composed function.
     *
     * @name seq
     * @static
     * @memberOf async
     * @see async.compose
     * @category Control Flow
     * @param {...Function} functions - the asynchronous functions to compose
     * @example
     *
     * // Requires lodash (or underscore), express3 and dresende's orm2.
     * // Part of an app, that fetches cats of the logged user.
     * // This example uses `seq` function to avoid overnesting and error
     * // handling clutter.
     * app.get('/cats', function(request, response) {
     *     var User = request.models.User;
     *     async.seq(
     *         _.bind(User.get, User),  // 'User.get' has signature (id, callback(err, data))
     *         function(user, fn) {
     *             user.getCats(fn);      // 'getCats' has signature (callback(err, data))
     *         }
     *     )(req.session.user_id, function (err, cats) {
     *         if (err) {
     *             console.error(err);
     *             response.json({ status: 'error', message: err.message });
     *         } else {
     *             response.json({ status: 'ok', message: 'Cats found', data: cats });
     *         }
     *     });
     * });
     */
    function seq() /* functions... */{
        var fns = arguments;
        return rest(function (args) {
            var that = this;

            var cb = args[args.length - 1];
            if (typeof cb == 'function') {
                args.pop();
            } else {
                cb = noop;
            }

            reduce(fns, args, function (newargs, fn, cb) {
                fn.apply(that, newargs.concat([rest(function (err, nextargs) {
                    cb(err, nextargs);
                })]));
            }, function (err, results) {
                cb.apply(that, [err].concat(results));
            });
        });
    }

    var reverse = Array.prototype.reverse;

    /**
     * Creates a function which is a composition of the passed asynchronous
     * functions. Each function consumes the return value of the function that
     * follows. Composing functions `f()`, `g()`, and `h()` would produce the result
     * of `f(g(h()))`, only this version uses callbacks to obtain the return values.
     *
     * Each function is executed with the `this` binding of the composed function.
     *
     * @name compose
     * @static
     * @memberOf async
     * @category Control Flow
     * @param {...Function} functions - the asynchronous functions to compose
     * @example
     *
     * function add1(n, callback) {
     *     setTimeout(function () {
     *         callback(null, n + 1);
     *     }, 10);
     * }
     *
     * function mul3(n, callback) {
     *     setTimeout(function () {
     *         callback(null, n * 3);
     *     }, 10);
     * }
     *
     * var add1mul3 = async.compose(mul3, add1);
     * add1mul3(4, function (err, result) {
     *     // result now equals 15
     * });
     */
    function compose() /* functions... */{
      return seq.apply(null, reverse.call(arguments));
    }

    function concat$1(eachfn, arr, fn, callback) {
        var result = [];
        eachfn(arr, function (x, index, cb) {
            fn(x, function (err, y) {
                result = result.concat(y || []);
                cb(err);
            });
        }, function (err) {
            callback(err, result);
        });
    }

    /**
     * Like `each`, except that it passes the key (or index) as the second argument
     * to the iteratee.
     *
     * @name eachOf
     * @static
     * @memberOf async
     * @alias forEachOf
     * @category Collection
     * @param {Array|Object} coll - A collection to iterate over.
     * @param {Function} iteratee - A function to apply to each
     * item in `coll`. The `key` is the item's key, or index in the case of an
     * array. The iteratee is passed a `callback(err)` which must be called once it
     * has completed. If no error has occurred, the callback should be run without
     * arguments or with an explicit `null` argument. Invoked with
     * (item, key, callback).
     * @param {Function} [callback] - A callback which is called when all
     * `iteratee` functions have finished, or an error occurs. Invoked with (err).
     * @example
     *
     * var obj = {dev: "/dev.json", test: "/test.json", prod: "/prod.json"};
     * var configs = {};
     *
     * async.forEachOf(obj, function (value, key, callback) {
     *     fs.readFile(__dirname + value, "utf8", function (err, data) {
     *         if (err) return callback(err);
     *         try {
     *             configs[key] = JSON.parse(data);
     *         } catch (e) {
     *             return callback(e);
     *         }
     *         callback();
     *     });
     * }, function (err) {
     *     if (err) console.error(err.message);
     *     // configs is now a map of JSON data
     *     doSomethingWith(configs);
     * });
     */
    var eachOf = doLimit(eachOfLimit, Infinity);

    function doParallel(fn) {
        return function (obj, iteratee, callback) {
            return fn(eachOf, obj, iteratee, callback);
        };
    }

    /**
     * Applies `iteratee` to each item in `coll`, concatenating the results. Returns
     * the concatenated list. The `iteratee`s are called in parallel, and the
     * results are concatenated as they return. There is no guarantee that the
     * results array will be returned in the original order of `coll` passed to the
     * `iteratee` function.
     *
     * @name concat
     * @static
     * @memberOf async
     * @category Collection
     * @param {Array|Object} coll - A collection to iterate over.
     * @param {Function} iteratee - A function to apply to each item in `coll`.
     * The iteratee is passed a `callback(err, results)` which must be called once
     * it has completed with an error (which can be `null`) and an array of results.
     * Invoked with (item, callback).
     * @param {Function} [callback(err)] - A callback which is called after all the
     * `iteratee` functions have finished, or an error occurs. Results is an array
     * containing the concatenated results of the `iteratee` function. Invoked with
     * (err, results).
     * @example
     *
     * async.concat(['dir1','dir2','dir3'], fs.readdir, function(err, files) {
     *     // files is now a list of filenames that exist in the 3 directories
     * });
     */
    var concat = doParallel(concat$1);

    function doSeries(fn) {
        return function (obj, iteratee, callback) {
            return fn(eachOfSeries, obj, iteratee, callback);
        };
    }

    /**
     * The same as `concat` but runs only a single async operation at a time.
     *
     * @name concatSeries
     * @static
     * @memberOf async
     * @see async.concat
     * @category Collection
     * @param {Array|Object} coll - A collection to iterate over.
     * @param {Function} iteratee - A function to apply to each item in `coll`.
     * The iteratee is passed a `callback(err, results)` which must be called once
     * it has completed with an error (which can be `null`) and an array of results.
     * Invoked with (item, callback).
     * @param {Function} [callback(err)] - A callback which is called after all the
     * `iteratee` functions have finished, or an error occurs. Results is an array
     * containing the concatenated results of the `iteratee` function. Invoked with
     * (err, results).
     */
    var concatSeries = doSeries(concat$1);

    /**
     * Returns a function that when called, calls-back with the values provided.
     * Useful as the first function in a `waterfall`, or for plugging values in to
     * `auto`.
     *
     * @name constant
     * @static
     * @memberOf async
     * @category Util
     * @param {...*} arguments... - Any number of arguments to automatically invoke
     * callback with.
     * @returns {Function} Returns a function that when invoked, automatically
     * invokes the callback with the previous given arguments.
     * @example
     *
     * async.waterfall([
     *     async.constant(42),
     *     function (value, next) {
     *         // value === 42
     *     },
     *     //...
     * ], callback);
     *
     * async.waterfall([
     *     async.constant(filename, "utf8"),
     *     fs.readFile,
     *     function (fileData, next) {
     *         //...
     *     }
     *     //...
     * ], callback);
     *
     * async.auto({
     *     hostname: async.constant("https://server.net/"),
     *     port: findFreePort,
     *     launchServer: ["hostname", "port", function (options, cb) {
     *         startServer(options, cb);
     *     }],
     *     //...
     * }, callback);
     */
    var constant = rest(function (values) {
        var args = [null].concat(values);
        return initialParams(function (ignoredArgs, callback) {
            return callback.apply(this, args);
        });
    });

    function _createTester(eachfn, check, getResult) {
        return function (arr, limit, iteratee, cb) {
            function done(err) {
                if (cb) {
                    if (err) {
                        cb(err);
                    } else {
                        cb(null, getResult(false));
                    }
                }
            }
            function wrappedIteratee(x, _, callback) {
                if (!cb) return callback();
                iteratee(x, function (err, v) {
                    if (cb) {
                        if (err) {
                            cb(err);
                            cb = iteratee = false;
                        } else if (check(v)) {
                            cb(null, getResult(true, x));
                            cb = iteratee = false;
                        }
                    }
                    callback();
                });
            }
            if (arguments.length > 3) {
                cb = cb || noop;
                eachfn(arr, limit, wrappedIteratee, done);
            } else {
                cb = iteratee;
                cb = cb || noop;
                iteratee = limit;
                eachfn(arr, wrappedIteratee, done);
            }
        };
    }

    function _findGetResult(v, x) {
        return x;
    }

    /**
     * Returns the first value in `coll` that passes an async truth test. The
     * `iteratee` is applied in parallel, meaning the first iteratee to return
     * `true` will fire the detect `callback` with that result. That means the
     * result might not be the first item in the original `coll` (in terms of order)
     * that passes the test.

     * If order within the original `coll` is important, then look at
     * `detectSeries`.
     *
     * @name detect
     * @static
     * @memberOf async
     * @alias find
     * @category Collection
     * @param {Array|Object} coll - A collection to iterate over.
     * @param {Function} iteratee - A truth test to apply to each item in `coll`.
     * The iteratee is passed a `callback(err, truthValue)` which must be called
     * with a boolean argument once it has completed. Invoked with (item, callback).
     * @param {Function} [callback] - A callback which is called as soon as any
     * iteratee returns `true`, or after all the `iteratee` functions have finished.
     * Result will be the first item in the array that passes the truth test
     * (iteratee) or the value `undefined` if none passed. Invoked with
     * (err, result).
     * @example
     *
     * async.detect(['file1','file2','file3'], function(filePath, callback) {
     *     fs.access(filePath, function(err) {
     *         callback(null, !err)
     *     });
     * }, function(err, result) {
     *     // result now equals the first file in the list that exists
     * });
     */
    var detect = _createTester(eachOf, identity, _findGetResult);

    /**
     * The same as `detect` but runs a maximum of `limit` async operations at a
     * time.
     *
     * @name detectLimit
     * @static
     * @memberOf async
     * @see async.detect
     * @alias findLimit
     * @category Collection
     * @param {Array|Object} coll - A collection to iterate over.
     * @param {number} limit - The maximum number of async operations at a time.
     * @param {Function} iteratee - A truth test to apply to each item in `coll`.
     * The iteratee is passed a `callback(err, truthValue)` which must be called
     * with a boolean argument once it has completed. Invoked with (item, callback).
     * @param {Function} [callback] - A callback which is called as soon as any
     * iteratee returns `true`, or after all the `iteratee` functions have finished.
     * Result will be the first item in the array that passes the truth test
     * (iteratee) or the value `undefined` if none passed. Invoked with
     * (err, result).
     */
    var detectLimit = _createTester(eachOfLimit, identity, _findGetResult);

    /**
     * The same as `detect` but runs only a single async operation at a time.
     *
     * @name detectSeries
     * @static
     * @memberOf async
     * @see async.detect
     * @alias findSeries
     * @category Collection
     * @param {Array|Object} coll - A collection to iterate over.
     * @param {Function} iteratee - A truth test to apply to each item in `coll`.
     * The iteratee is passed a `callback(err, truthValue)` which must be called
     * with a boolean argument once it has completed. Invoked with (item, callback).
     * @param {Function} [callback] - A callback which is called as soon as any
     * iteratee returns `true`, or after all the `iteratee` functions have finished.
     * Result will be the first item in the array that passes the truth test
     * (iteratee) or the value `undefined` if none passed. Invoked with
     * (err, result).
     */
    var detectSeries = _createTester(eachOfSeries, identity, _findGetResult);

    function consoleFunc(name) {
        return rest(function (fn, args) {
            fn.apply(null, args.concat([rest(function (err, args) {
                if (typeof console === 'object') {
                    if (err) {
                        if (console.error) {
                            console.error(err);
                        }
                    } else if (console[name]) {
                        arrayEach(args, function (x) {
                            console[name](x);
                        });
                    }
                }
            })]));
        });
    }

    /**
     * Logs the result of an `async` function to the `console` using `console.dir`
     * to display the properties of the resulting object. Only works in Node.js or
     * in browsers that support `console.dir` and `console.error` (such as FF and
     * Chrome). If multiple arguments are returned from the async function,
     * `console.dir` is called on each argument in order.
     *
     * @name log
     * @static
     * @memberOf async
     * @category Util
     * @param {Function} function - The function you want to eventually apply all
     * arguments to.
     * @param {...*} arguments... - Any number of arguments to apply to the function.
     * @example
     *
     * // in a module
     * var hello = function(name, callback) {
     *     setTimeout(function() {
     *         callback(null, {hello: name});
     *     }, 1000);
     * };
     *
     * // in the node repl
     * node> async.dir(hello, 'world');
     * {hello: 'world'}
     */
    var dir = consoleFunc('dir');

    /**
     * Like {@link async.whilst}, except the `test` is an asynchronous function that
     * is passed a callback in the form of `function (err, truth)`. If error is
     * passed to `test` or `fn`, the main callback is immediately called with the
     * value of the error.
     *
     * @name during
     * @static
     * @memberOf async
     * @see async.whilst
     * @category Control Flow
     * @param {Function} test - asynchronous truth test to perform before each
     * execution of `fn`. Invoked with (callback).
     * @param {Function} fn - A function which is called each time `test` passes.
     * The function is passed a `callback(err)`, which must be called once it has
     * completed with an optional `err` argument. Invoked with (callback).
     * @param {Function} [callback] - A callback which is called after the test
     * function has failed and repeated execution of `fn` has stopped. `callback`
     * will be passed an error and any arguments passed to the final `fn`'s
     * callback. Invoked with (err, [results]);
     * @example
     *
     * var count = 0;
     *
     * async.during(
     *     function (callback) {
     *         return callback(null, count < 5);
     *     },
     *     function (callback) {
     *         count++;
     *         setTimeout(callback, 1000);
     *     },
     *     function (err) {
     *         // 5 seconds have passed
     *     }
     * );
     */
    function during(test, iteratee, cb) {
        cb = cb || noop;

        var next = rest(function (err, args) {
            if (err) {
                cb(err);
            } else {
                args.push(check);
                test.apply(this, args);
            }
        });

        var check = function (err, truth) {
            if (err) return cb(err);
            if (!truth) return cb(null);
            iteratee(next);
        };

        test(check);
    }

    /**
     * The post-check version of {@link async.during}. To reflect the difference in
     * the order of operations, the arguments `test` and `fn` are switched.
     *
     * Also a version of {@link async.doWhilst} with asynchronous `test` function.
     * @name doDuring
     * @static
     * @memberOf async
     * @see async.during
     * @category Control Flow
     * @param {Function} fn - A function which is called each time `test` passes.
     * The function is passed a `callback(err)`, which must be called once it has
     * completed with an optional `err` argument. Invoked with (callback).
     * @param {Function} test - asynchronous truth test to perform before each
     * execution of `fn`. Invoked with (callback).
     * @param {Function} [callback] - A callback which is called after the test
     * function has failed and repeated execution of `fn` has stopped. `callback`
     * will be passed an error and any arguments passed to the final `fn`'s
     * callback. Invoked with (err, [results]);
     */
    function doDuring(iteratee, test, cb) {
        var calls = 0;

        during(function (next) {
            if (calls++ < 1) return next(null, true);
            test.apply(this, arguments);
        }, iteratee, cb);
    }

    /**
     * Repeatedly call `fn`, while `test` returns `true`. Calls `callback` when
     * stopped, or an error occurs.
     *
     * @name whilst
     * @static
     * @memberOf async
     * @category Control Flow
     * @param {Function} test - synchronous truth test to perform before each
     * execution of `fn`. Invoked with ().
     * @param {Function} fn - A function which is called each time `test` passes.
     * The function is passed a `callback(err)`, which must be called once it has
     * completed with an optional `err` argument. Invoked with (callback).
     * @param {Function} [callback] - A callback which is called after the test
     * function has failed and repeated execution of `fn` has stopped. `callback`
     * will be passed an error and any arguments passed to the final `fn`'s
     * callback. Invoked with (err, [results]);
     * @example
     *
     * var count = 0;
     * async.whilst(
     *     function() { return count < 5; },
     *     function(callback) {
     *         count++;
     *         setTimeout(function() {
     *             callback(null, count);
     *         }, 1000);
     *     },
     *     function (err, n) {
     *         // 5 seconds have passed, n = 5
     *     }
     * );
     */
    function whilst(test, iteratee, cb) {
        cb = cb || noop;
        if (!test()) return cb(null);
        var next = rest(function (err, args) {
            if (err) return cb(err);
            if (test.apply(this, args)) return iteratee(next);
            cb.apply(null, [null].concat(args));
        });
        iteratee(next);
    }

    /**
     * The post-check version of {@link async.whilst}. To reflect the difference in
     * the order of operations, the arguments `test` and `fn` are switched.
     *
     * `doWhilst` is to `whilst` as `do while` is to `while` in plain JavaScript.
     *
     * @name doWhilst
     * @static
     * @memberOf async
     * @see async.whilst
     * @category Control Flow
     * @param {Function} fn - A function which is called each time `test` passes.
     * The function is passed a `callback(err)`, which must be called once it has
     * completed with an optional `err` argument. Invoked with (callback).
     * @param {Function} test - synchronous truth test to perform after each
     * execution of `fn`. Invoked with Invoked with the non-error callback results
     * of `fn`.
     * @param {Function} [callback] - A callback which is called after the test
     * function has failed and repeated execution of `fn` has stopped. `callback`
     * will be passed an error and any arguments passed to the final `fn`'s
     * callback. Invoked with (err, [results]);
     */
    function doWhilst(iteratee, test, cb) {
        var calls = 0;
        return whilst(function () {
            return ++calls <= 1 || test.apply(this, arguments);
        }, iteratee, cb);
    }

    /**
     * Like {@link async.doWhilst}, except the `test` is inverted. Note the
     * argument ordering differs from `until`.
     *
     * @name doUntil
     * @static
     * @memberOf async
     * @see async.doWhilst
     * @category Control Flow
     * @param {Function} fn - A function which is called each time `test` fails.
     * The function is passed a `callback(err)`, which must be called once it has
     * completed with an optional `err` argument. Invoked with (callback).
     * @param {Function} test - synchronous truth test to perform after each
     * execution of `fn`. Invoked with the non-error callback results of `fn`.
     * @param {Function} [callback] - A callback which is called after the test
     * function has passed and repeated execution of `fn` has stopped. `callback`
     * will be passed an error and any arguments passed to the final `fn`'s
     * callback. Invoked with (err, [results]);
     */
    function doUntil(iteratee, test, cb) {
        return doWhilst(iteratee, function () {
            return !test.apply(this, arguments);
        }, cb);
    }

    function _withoutIndex(iteratee) {
        return function (value, index, callback) {
            return iteratee(value, callback);
        };
    }

    /**
     * The same as `each` but runs a maximum of `limit` async operations at a time.
     *
     * @name eachLimit
     * @static
     * @memberOf async
     * @see async.each
     * @alias forEachLimit
     * @category Collection
     * @param {Array|Object} coll - A colleciton to iterate over.
     * @param {number} limit - The maximum number of async operations at a time.
     * @param {Function} iteratee - A function to apply to each item in `coll`. The
     * iteratee is passed a `callback(err)` which must be called once it has
     * completed. If no error has occurred, the `callback` should be run without
     * arguments or with an explicit `null` argument. The array index is not passed
     * to the iteratee. Invoked with (item, callback). If you need the index, use
     * `eachOfLimit`.
     * @param {Function} [callback] - A callback which is called when all
     * `iteratee` functions have finished, or an error occurs. Invoked with (err).
     */
    function eachLimit(arr, limit, iteratee, cb) {
      return _eachOfLimit(limit)(arr, _withoutIndex(iteratee), cb);
    }

    /**
     * Applies the function `iteratee` to each item in `coll`, in parallel.
     * The `iteratee` is called with an item from the list, and a callback for when
     * it has finished. If the `iteratee` passes an error to its `callback`, the
     * main `callback` (for the `each` function) is immediately called with the
     * error.
     *
     * Note, that since this function applies `iteratee` to each item in parallel,
     * there is no guarantee that the iteratee functions will complete in order.
     *
     * @name each
     * @static
     * @memberOf async
     * @alias forEach
     * @category Collection
     * @param {Array|Object} coll - A collection to iterate over.
     * @param {Function} iteratee - A function to apply to each item
     * in `coll`. The iteratee is passed a `callback(err)` which must be called once
     * it has completed. If no error has occurred, the `callback` should be run
     * without arguments or with an explicit `null` argument. The array index is not
     * passed to the iteratee. Invoked with (item, callback). If you need the index,
     * use `eachOf`.
     * @param {Function} [callback] - A callback which is called when all
     * `iteratee` functions have finished, or an error occurs. Invoked with (err).
     * @example
     *
     * // assuming openFiles is an array of file names and saveFile is a function
     * // to save the modified contents of that file:
     *
     * async.each(openFiles, saveFile, function(err){
     *   // if any of the saves produced an error, err would equal that error
     * });
     *
     * // assuming openFiles is an array of file names
     * async.each(openFiles, function(file, callback) {
     *
     *     // Perform operation on file here.
     *     console.log('Processing file ' + file);
     *
     *     if( file.length > 32 ) {
     *       console.log('This file name is too long');
     *       callback('File name too long');
     *     } else {
     *       // Do work to process file here
     *       console.log('File processed');
     *       callback();
     *     }
     * }, function(err) {
     *     // if any of the file processing produced an error, err would equal that error
     *     if( err ) {
     *       // One of the iterations produced an error.
     *       // All processing will now stop.
     *       console.log('A file failed to process');
     *     } else {
     *       console.log('All files have been processed successfully');
     *     }
     * });
     */
    var each = doLimit(eachLimit, Infinity);

    /**
     * The same as `each` but runs only a single async operation at a time.
     *
     * @name eachSeries
     * @static
     * @memberOf async
     * @see async.each
     * @alias forEachSeries
     * @category Collection
     * @param {Array|Object} coll - A collection to iterate over.
     * @param {Function} iteratee - A function to apply to each
     * item in `coll`. The iteratee is passed a `callback(err)` which must be called
     * once it has completed. If no error has occurred, the `callback` should be run
     * without arguments or with an explicit `null` argument. The array index is
     * not passed to the iteratee. Invoked with (item, callback). If you need the
     * index, use `eachOfSeries`.
     * @param {Function} [callback] - A callback which is called when all
     * `iteratee` functions have finished, or an error occurs. Invoked with (err).
     */
    var eachSeries = doLimit(eachLimit, 1);

    /**
     * Wrap an async function and ensure it calls its callback on a later tick of
     * the event loop.  If the function already calls its callback on a next tick,
     * no extra deferral is added. This is useful for preventing stack overflows
     * (`RangeError: Maximum call stack size exceeded`) and generally keeping
     * [Zalgo](http://blog.izs.me/post/59142742143/designing-apis-for-asynchrony)
     * contained.
     *
     * @name ensureAsync
     * @static
     * @memberOf async
     * @category Util
     * @param {Function} fn - an async function, one that expects a node-style
     * callback as its last argument.
     * @returns {Function} Returns a wrapped function with the exact same call
     * signature as the function passed in.
     * @example
     *
     * function sometimesAsync(arg, callback) {
     *     if (cache[arg]) {
     *         return callback(null, cache[arg]); // this would be synchronous!!
     *     } else {
     *         doSomeIO(arg, callback); // this IO would be asynchronous
     *     }
     * }
     *
     * // this has a risk of stack overflows if many results are cached in a row
     * async.mapSeries(args, sometimesAsync, done);
     *
     * // this will defer sometimesAsync's callback if necessary,
     * // preventing stack overflows
     * async.mapSeries(args, async.ensureAsync(sometimesAsync), done);
     */
    function ensureAsync(fn) {
        return initialParams(function (args, callback) {
            var sync = true;
            args.push(function () {
                var innerArgs = arguments;
                if (sync) {
                    setImmediate$1(function () {
                        callback.apply(null, innerArgs);
                    });
                } else {
                    callback.apply(null, innerArgs);
                }
            });
            fn.apply(this, args);
            sync = false;
        });
    }

    function notId(v) {
        return !v;
    }

    /**
     * The same as `every` but runs a maximum of `limit` async operations at a time.
     *
     * @name everyLimit
     * @static
     * @memberOf async
     * @see async.every
     * @alias allLimit
     * @category Collection
     * @param {Array|Object} coll - A collection to iterate over.
     * @param {number} limit - The maximum number of async operations at a time.
     * @param {Function} iteratee - A truth test to apply to each item in the
     * collection in parallel. The iteratee is passed a `callback(err, truthValue)`
     * which must be called with a  boolean argument once it has completed. Invoked
     * with (item, callback).
     * @param {Function} [callback] - A callback which is called after all the
     * `iteratee` functions have finished. Result will be either `true` or `false`
     * depending on the values of the async tests. Invoked with (err, result).
     */
    var everyLimit = _createTester(eachOfLimit, notId, notId);

    /**
     * Returns `true` if every element in `coll` satisfies an async test. If any
     * iteratee call returns `false`, the main `callback` is immediately called.
     *
     * @name every
     * @static
     * @memberOf async
     * @alias all
     * @category Collection
     * @param {Array|Object} coll - A collection to iterate over.
     * @param {Function} iteratee - A truth test to apply to each item in the
     * collection in parallel. The iteratee is passed a `callback(err, truthValue)`
     * which must be called with a  boolean argument once it has completed. Invoked
     * with (item, callback).
     * @param {Function} [callback] - A callback which is called after all the
     * `iteratee` functions have finished. Result will be either `true` or `false`
     * depending on the values of the async tests. Invoked with (err, result).
     * @example
     *
     * async.every(['file1','file2','file3'], function(filePath, callback) {
     *     fs.access(filePath, function(err) {
     *         callback(null, !err)
     *     });
     * }, function(err, result) {
     *     // if result is true then every file exists
     * });
     */
    var every = doLimit(everyLimit, Infinity);

    /**
     * The same as `every` but runs only a single async operation at a time.
     *
     * @name everySeries
     * @static
     * @memberOf async
     * @see async.every
     * @alias allSeries
     * @category Collection
     * @param {Array|Object} coll - A collection to iterate over.
     * @param {Function} iteratee - A truth test to apply to each item in the
     * collection in parallel. The iteratee is passed a `callback(err, truthValue)`
     * which must be called with a  boolean argument once it has completed. Invoked
     * with (item, callback).
     * @param {Function} [callback] - A callback which is called after all the
     * `iteratee` functions have finished. Result will be either `true` or `false`
     * depending on the values of the async tests. Invoked with (err, result).
     */
    var everySeries = doLimit(everyLimit, 1);

    function _filter(eachfn, arr, iteratee, callback) {
        var results = [];
        eachfn(arr, function (x, index, callback) {
            iteratee(x, function (err, v) {
                if (err) {
                    callback(err);
                } else {
                    if (v) {
                        results.push({ index: index, value: x });
                    }
                    callback();
                }
            });
        }, function (err) {
            if (err) {
                callback(err);
            } else {
                callback(null, arrayMap(results.sort(function (a, b) {
                    return a.index - b.index;
                }), baseProperty('value')));
            }
        });
    }

    /**
     * The same as `filter` but runs a maximum of `limit` async operations at a
     * time.
     *
     * @name filterLimit
     * @static
     * @memberOf async
     * @see async.filter
     * @alias selectLimit
     * @category Collection
     * @param {Array|Object} coll - A collection to iterate over.
     * @param {number} limit - The maximum number of async operations at a time.
     * @param {Function} iteratee - A truth test to apply to each item in `coll`.
     * The `iteratee` is passed a `callback(err, truthValue)`, which must be called
     * with a boolean argument once it has completed. Invoked with (item, callback).
     * @param {Function} [callback] - A callback which is called after all the
     * `iteratee` functions have finished. Invoked with (err, results).
     */
    var filterLimit = doParallelLimit(_filter);

    /**
     * Returns a new array of all the values in `coll` which pass an async truth
     * test. This operation is performed in parallel, but the results array will be
     * in the same order as the original.
     *
     * @name filter
     * @static
     * @memberOf async
     * @alias select
     * @category Collection
     * @param {Array|Object} coll - A collection to iterate over.
     * @param {Function} iteratee - A truth test to apply to each item in `coll`.
     * The `iteratee` is passed a `callback(err, truthValue)`, which must be called
     * with a boolean argument once it has completed. Invoked with (item, callback).
     * @param {Function} [callback] - A callback which is called after all the
     * `iteratee` functions have finished. Invoked with (err, results).
     * @example
     *
     * async.filter(['file1','file2','file3'], function(filePath, callback) {
     *     fs.access(filePath, function(err) {
     *         callback(null, !err)
     *     });
     * }, function(err, results) {
     *     // results now equals an array of the existing files
     * });
     */
    var filter = doLimit(filterLimit, Infinity);

    /**
     * The same as `filter` but runs only a single async operation at a time.
     *
     * @name filterSeries
     * @static
     * @memberOf async
     * @see async.filter
     * @alias selectSeries
     * @category Collection
     * @param {Array|Object} coll - A collection to iterate over.
     * @param {Function} iteratee - A truth test to apply to each item in `coll`.
     * The `iteratee` is passed a `callback(err, truthValue)`, which must be called
     * with a boolean argument once it has completed. Invoked with (item, callback).
     * @param {Function} [callback] - A callback which is called after all the
     * `iteratee` functions have finished. Invoked with (err, results)
     */
    var filterSeries = doLimit(filterLimit, 1);

    /**
     * Calls the asynchronous function `fn` with a callback parameter that allows it
     * to call itself again, in series, indefinitely.

     * If an error is passed to the
     * callback then `errback` is called with the error, and execution stops,
     * otherwise it will never be called.
     *
     * @name forever
     * @static
     * @memberOf async
     * @category Control Flow
     * @param {Function} fn - a function to call repeatedly. Invoked with (next).
     * @param {Function} [errback] - when `fn` passes an error to it's callback,
     * this function will be called, and execution stops. Invoked with (err).
     * @example
     *
     * async.forever(
     *     function(next) {
     *         // next is suitable for passing to things that need a callback(err [, whatever]);
     *         // it will result in this function being called again.
     *     },
     *     function(err) {
     *         // if next is called with a value in its first parameter, it will appear
     *         // in here as 'err', and execution will stop.
     *     }
     * );
     */
    function forever(fn, cb) {
        var done = onlyOnce(cb || noop);
        var task = ensureAsync(fn);

        function next(err) {
            if (err) return done(err);
            task(next);
        }
        next();
    }

    /**
     * Creates an iterator function which calls the next function in the `tasks`
     * array, returning a continuation to call the next one after that. It's also
     * possible to “peek” at the next iterator with `iterator.next()`.
     *
     * This function is used internally by the `async` module, but can be useful
     * when you want to manually control the flow of functions in series.
     *
     * @name iterator
     * @static
     * @memberOf async
     * @category Control Flow
     * @param {Array} tasks - An array of functions to run.
     * @returns The next function to run in the series.
     * @example
     *
     * var iterator = async.iterator([
     *     function() { sys.p('one'); },
     *     function() { sys.p('two'); },
     *     function() { sys.p('three'); }
     * ]);
     *
     * node> var iterator2 = iterator();
     * 'one'
     * node> var iterator3 = iterator2();
     * 'two'
     * node> iterator3();
     * 'three'
     * node> var nextfn = iterator2.next();
     * node> nextfn();
     * 'three'
     */
    function iterator$1 (tasks) {
        function makeCallback(index) {
            function fn() {
                if (tasks.length) {
                    tasks[index].apply(null, arguments);
                }
                return fn.next();
            }
            fn.next = function () {
                return index < tasks.length - 1 ? makeCallback(index + 1) : null;
            };
            return fn;
        }
        return makeCallback(0);
    }

    /**
     * Logs the result of an `async` function to the `console`. Only works in
     * Node.js or in browsers that support `console.log` and `console.error` (such
     * as FF and Chrome). If multiple arguments are returned from the async
     * function, `console.log` is called on each argument in order.
     *
     * @name log
     * @static
     * @memberOf async
     * @category Util
     * @param {Function} function - The function you want to eventually apply all
     * arguments to.
     * @param {...*} arguments... - Any number of arguments to apply to the function.
     * @example
     *
     * // in a module
     * var hello = function(name, callback) {
     *     setTimeout(function() {
     *         callback(null, 'hello ' + name);
     *     }, 1000);
     * };
     *
     * // in the node repl
     * node> async.log(hello, 'world');
     * 'hello world'
     */
    var log = consoleFunc('log');

    /**
     * The same as `mapValues` but runs a maximum of `limit` async operations at a
     * time.
     *
     * @name mapValuesLimit
     * @static
     * @memberOf async
     * @see async.mapValues
     * @category Collection
     * @param {Object} obj - A collection to iterate over.
     * @param {number} limit - The maximum number of async operations at a time.
     * @param {Function} iteratee - A function to apply to each value in `obj`.
     * The iteratee is passed a `callback(err, transformed)` which must be called
     * once it has completed with an error (which can be `null`) and a
     * transformed value. Invoked with (value, key, callback).
     * @param {Function} [callback] - A callback which is called when all `iteratee`
     * functions have finished, or an error occurs. Result is an object of the
     * transformed values from the `obj`. Invoked with (err, result).
     */
    function mapValuesLimit(obj, limit, iteratee, callback) {
        var newObj = {};
        eachOfLimit(obj, limit, function (val, key, next) {
            iteratee(val, key, function (err, result) {
                if (err) return next(err);
                newObj[key] = result;
                next();
            });
        }, function (err) {
            callback(err, newObj);
        });
    }

    /**
     * A relative of `map`, designed for use with objects.
     *
     * Produces a new Object by mapping each value of `obj` through the `iteratee`
     * function. The `iteratee` is called each `value` and `key` from `obj` and a
     * callback for when it has finished processing. Each of these callbacks takes
     * two arguments: an `error`, and the transformed item from `obj`. If `iteratee`
     * passes an error to its callback, the main `callback` (for the `mapValues`
     * function) is immediately called with the error.
     *
     * Note, the order of the keys in the result is not guaranteed.  The keys will
     * be roughly in the order they complete, (but this is very engine-specific)
     *
     * @name mapValues
     * @static
     * @memberOf async
     * @category Collection
     * @param {Object} obj - A collection to iterate over.
     * @param {Function} iteratee - A function to apply to each value and key in
     * `coll`. The iteratee is passed a `callback(err, transformed)` which must be
     * called once it has completed with an error (which can be `null`) and a
     * transformed value. Invoked with (value, key, callback).
     * @param {Function} [callback] - A callback which is called when all `iteratee`
     * functions have finished, or an error occurs. Results is an array of the
     * transformed items from the `obj`. Invoked with (err, result).
     * @example
     *
     * async.mapValues({
     *     f1: 'file1',
     *     f2: 'file2',
     *     f3: 'file3'
     * }, fs.stat, function(err, result) {
     *     // results is now a map of stats for each file, e.g.
     *     // {
     *     //     f1: [stats for file1],
     *     //     f2: [stats for file2],
     *     //     f3: [stats for file3]
     *     // }
     * });
     */

    var mapValues = doLimit(mapValuesLimit, Infinity);

    /**
     * The same as `mapValues` but runs only a single async operation at a time.
     *
     * @name mapValuesSeries
     * @static
     * @memberOf async
     * @see async.mapValues
     * @category Collection
     * @param {Object} obj - A collection to iterate over.
     * @param {Function} iteratee - A function to apply to each value in `obj`.
     * The iteratee is passed a `callback(err, transformed)` which must be called
     * once it has completed with an error (which can be `null`) and a
     * transformed value. Invoked with (value, key, callback).
     * @param {Function} [callback] - A callback which is called when all `iteratee`
     * functions have finished, or an error occurs. Result is an object of the
     * transformed values from the `obj`. Invoked with (err, result).
     */
    var mapValuesSeries = doLimit(mapValuesLimit, 1);

    function has(obj, key) {
        return key in obj;
    }

    /**
     * Caches the results of an `async` function. When creating a hash to store
     * function results against, the callback is omitted from the hash and an
     * optional hash function can be used.
     *
     * If no hash function is specified, the first argument is used as a hash key,
     * which may work reasonably if it is a string or a data type that converts to a
     * distinct string. Note that objects and arrays will not behave reasonably.
     * Neither will cases where the other arguments are significant. In such cases,
     * specify your own hash function.
     *
     * The cache of results is exposed as the `memo` property of the function
     * returned by `memoize`.
     *
     * @name memoize
     * @static
     * @memberOf async
     * @category Util
     * @param {Function} fn - The function to proxy and cache results from.
     * @param {Function} hasher - An optional function for generating a custom hash
     * for storing results. It has all the arguments applied to it apart from the
     * callback, and must be synchronous.
     * @example
     *
     * var slow_fn = function(name, callback) {
     *     // do something
     *     callback(null, result);
     * };
     * var fn = async.memoize(slow_fn);
     *
     * // fn can now be used as if it were slow_fn
     * fn('some name', function() {
     *     // callback
     * });
     */
    function memoize$1(fn, hasher) {
        var memo = Object.create(null);
        var queues = Object.create(null);
        hasher = hasher || identity;
        var memoized = initialParams(function memoized(args, callback) {
            var key = hasher.apply(null, args);
            if (has(memo, key)) {
                setImmediate$1(function () {
                    callback.apply(null, memo[key]);
                });
            } else if (has(queues, key)) {
                queues[key].push(callback);
            } else {
                queues[key] = [callback];
                fn.apply(null, args.concat([rest(function (args) {
                    memo[key] = args;
                    var q = queues[key];
                    delete queues[key];
                    for (var i = 0, l = q.length; i < l; i++) {
                        q[i].apply(null, args);
                    }
                })]));
            }
        });
        memoized.memo = memo;
        memoized.unmemoized = fn;
        return memoized;
    }

    /**
     * Calls `callback` on a later loop around the event loop. In Node.js this just
     * calls `setImmediate`.  In the browser it will use `setImmediate` if
     * available, otherwise `setTimeout(callback, 0)`, which means other higher
     * priority events may precede the execution of `callback`.
     *
     * This is used internally for browser-compatibility purposes.
     *
     * @name nextTick
     * @static
     * @memberOf async
     * @alias setImmediate
     * @category Util
     * @param {Function} callback - The function to call on a later loop around
     * the event loop. Invoked with (args...).
     * @param {...*} args... - any number of additional arguments to pass to the
     * callback on the next tick.
     * @example
     *
     * var call_order = [];
     * async.nextTick(function() {
     *     call_order.push('two');
     *     // call_order now equals ['one','two']
     * });
     * call_order.push('one');
     *
     * async.setImmediate(function (a, b, c) {
     *     // a, b, and c equal 1, 2, and 3
     * }, 1, 2, 3);
     */
    var _defer$1;

    if (hasNextTick) {
        _defer$1 = process.nextTick;
    } else if (hasSetImmediate) {
        _defer$1 = setImmediate;
    } else {
        _defer$1 = fallback;
    }

    var nextTick = wrap(_defer$1);

    function _parallel(eachfn, tasks, callback) {
        callback = callback || noop;
        var results = isArrayLike(tasks) ? [] : {};

        eachfn(tasks, function (task, key, callback) {
            task(rest(function (err, args) {
                if (args.length <= 1) {
                    args = args[0];
                }
                results[key] = args;
                callback(err);
            }));
        }, function (err) {
            callback(err, results);
        });
    }

    /**
     * The same as `parallel` but runs a maximum of `limit` async operations at a
     * time.
     *
     * @name parallel
     * @static
     * @memberOf async
     * @see async.parallel
     * @category Control Flow
     * @param {Array|Collection} tasks - A collection containing functions to run.
     * Each function is passed a `callback(err, result)` which it must call on
     * completion with an error `err` (which can be `null`) and an optional `result`
     * value.
     * @param {number} limit - The maximum number of async operations at a time.
     * @param {Function} [callback] - An optional callback to run once all the
     * functions have completed successfully. This function gets a results array
     * (or object) containing all the result arguments passed to the task callbacks.
     * Invoked with (err, results).
     */
    function parallelLimit(tasks, limit, cb) {
      return _parallel(_eachOfLimit(limit), tasks, cb);
    }

    /**
     * Run the `tasks` collection of functions in parallel, without waiting until
     * the previous function has completed. If any of the functions pass an error to
     * its callback, the main `callback` is immediately called with the value of the
     * error. Once the `tasks` have completed, the results are passed to the final
     * `callback` as an array.
     *
     * **Note:** `parallel` is about kicking-off I/O tasks in parallel, not about
     * parallel execution of code.  If your tasks do not use any timers or perform
     * any I/O, they will actually be executed in series.  Any synchronous setup
     * sections for each task will happen one after the other.  JavaScript remains
     * single-threaded.
     *
     * It is also possible to use an object instead of an array. Each property will
     * be run as a function and the results will be passed to the final `callback`
     * as an object instead of an array. This can be a more readable way of handling
     * results from {@link async.parallel}.
     *
     * @name parallel
     * @static
     * @memberOf async
     * @category Control Flow
     * @param {Array|Object} tasks - A collection containing functions to run.
     * Each function is passed a `callback(err, result)` which it must call on
     * completion with an error `err` (which can be `null`) and an optional `result`
     * value.
     * @param {Function} [callback] - An optional callback to run once all the
     * functions have completed successfully. This function gets a results array
     * (or object) containing all the result arguments passed to the task callbacks.
     * Invoked with (err, results).
     * @example
     * async.parallel([
     *     function(callback) {
     *         setTimeout(function() {
     *             callback(null, 'one');
     *         }, 200);
     *     },
     *     function(callback) {
     *         setTimeout(function() {
     *             callback(null, 'two');
     *         }, 100);
     *     }
     * ],
     * // optional callback
     * function(err, results) {
     *     // the results array will equal ['one','two'] even though
     *     // the second function had a shorter timeout.
     * });
     *
     * // an example using an object instead of an array
     * async.parallel({
     *     one: function(callback) {
     *         setTimeout(function() {
     *             callback(null, 1);
     *         }, 200);
     *     },
     *     two: function(callback) {
     *         setTimeout(function() {
     *             callback(null, 2);
     *         }, 100);
     *     }
     * }, function(err, results) {
     *     // results is now equals to: {one: 1, two: 2}
     * });
     */
    var parallel = doLimit(parallelLimit, Infinity);

    /**
     * A queue of tasks for the worker function to complete.
     * @typedef {Object} queue
     * @property {Function} length - a function returning the number of items
     * waiting to be processed. Invoke with ().
     * @property {Function} started - a function returning whether or not any
     * items have been pushed and processed by the queue. Invoke with ().
     * @property {Function} running - a function returning the number of items
     * currently being processed. Invoke with ().
     * @property {Function} workersList - a function returning the array of items
     * currently being processed. Invoke with ().
     * @property {Function} idle - a function returning false if there are items
     * waiting or being processed, or true if not. Invoke with ().
     * @property {number} concurrency - an integer for determining how many `worker`
     * functions should be run in parallel. This property can be changed after a
     * `queue` is created to alter the concurrency on-the-fly.
     * @property {Function} push - add a new task to the `queue`. Calls `callback`
     * once the `worker` has finished processing the task. Instead of a single task,
     * a `tasks` array can be submitted. The respective callback is used for every
     * task in the list. Invoke with (task, [callback]),
     * @property {Function} unshift - add a new task to the front of the `queue`.
     * Invoke with (task, [callback]).
     * @property {Function} saturated - a callback that is called when the number of
     * running workers hits the `concurrency` limit, and further tasks will be
     * queued.
     * @property {Function} unsaturated - a callback that is called when the number
     * of running workers is less than the `concurrency` & `buffer` limits, and
     * further tasks will not be queued.
     * @property {number} buffer - A minimum threshold buffer in order to say that
     * the `queue` is `unsaturated`.
     * @property {Function} empty - a callback that is called when the last item
     * from the `queue` is given to a `worker`.
     * @property {Function} drain - a callback that is called when the last item
     * from the `queue` has returned from the `worker`.
     * @property {Function} error - a callback that is called when a task errors.
     * Has the signature `function(error, task)`.
     * @property {boolean} paused - a boolean for determining whether the queue is
     * in a paused state.
     * @property {Function} pause - a function that pauses the processing of tasks
     * until `resume()` is called. Invoke with ().
     * @property {Function} resume - a function that resumes the processing of
     * queued tasks when the queue is paused. Invoke with ().
     * @property {Function} kill - a function that removes the `drain` callback and
     * empties remaining tasks from the queue forcing it to go idle. Invoke with ().
     */

    /**
     * Creates a `queue` object with the specified `concurrency`. Tasks added to the
     * `queue` are processed in parallel (up to the `concurrency` limit). If all
     * `worker`s are in progress, the task is queued until one becomes available.
     * Once a `worker` completes a `task`, that `task`'s callback is called.
     *
     * @name queue
     * @static
     * @memberOf async
     * @category Control Flow
     * @param {Function} worker - An asynchronous function for processing a queued
     * task, which must call its `callback(err)` argument when finished, with an
     * optional `error` as an argument.  If you want to handle errors from an
     * individual task, pass a callback to `q.push()`. Invoked with
     * (task, callback).
     * @param {number} [concurrency=1] - An `integer` for determining how many
     * `worker` functions should be run in parallel.  If omitted, the concurrency
     * defaults to `1`.  If the concurrency is `0`, an error is thrown.
     * @returns {queue} A queue object to manage the tasks. Callbacks can
     * attached as certain properties to listen for specific events during the
     * lifecycle of the queue.
     * @example
     *
     * // create a queue object with concurrency 2
     * var q = async.queue(function(task, callback) {
     *     console.log('hello ' + task.name);
     *     callback();
     * }, 2);
     *
     * // assign a callback
     * q.drain = function() {
     *     console.log('all items have been processed');
     * };
     *
     * // add some items to the queue
     * q.push({name: 'foo'}, function(err) {
     *     console.log('finished processing foo');
     * });
     * q.push({name: 'bar'}, function (err) {
     *     console.log('finished processing bar');
     * });
     *
     * // add some items to the queue (batch-wise)
     * q.push([{name: 'baz'},{name: 'bay'},{name: 'bax'}], function(err) {
     *     console.log('finished processing item');
     * });
     *
     * // add some items to the front of the queue
     * q.unshift({name: 'bar'}, function (err) {
     *     console.log('finished processing bar');
     * });
     */
    function queue$1 (worker, concurrency) {
      return queue(function (items, cb) {
        worker(items[0], cb);
      }, concurrency, 1);
    }

    /**
     * The same as {@link async.queue} only tasks are assigned a priority and
     * completed in ascending priority order.
     *
     * @name priorityQueue
     * @static
     * @memberOf async
     * @see async.queue
     * @category Control Flow
     * @param {Function} worker - An asynchronous function for processing a queued
     * task, which must call its `callback(err)` argument when finished, with an
     * optional `error` as an argument.  If you want to handle errors from an
     * individual task, pass a callback to `q.push()`. Invoked with
     * (task, callback).
     * @param {number} concurrency - An `integer` for determining how many `worker`
     * functions should be run in parallel.  If omitted, the concurrency defaults to
     * `1`.  If the concurrency is `0`, an error is thrown.
     * @returns {queue} A priorityQueue object to manage the tasks. There are two
     * differences between `queue` and `priorityQueue` objects:
     * * `push(task, priority, [callback])` - `priority` should be a number. If an
     *   array of `tasks` is given, all tasks will be assigned the same priority.
     * * The `unshift` method was removed.
     */
    function priorityQueue (worker, concurrency) {
        function _compareTasks(a, b) {
            return a.priority - b.priority;
        }

        function _binarySearch(sequence, item, compare) {
            var beg = -1,
                end = sequence.length - 1;
            while (beg < end) {
                var mid = beg + (end - beg + 1 >>> 1);
                if (compare(item, sequence[mid]) >= 0) {
                    beg = mid;
                } else {
                    end = mid - 1;
                }
            }
            return beg;
        }

        function _insert(q, data, priority, callback) {
            if (callback != null && typeof callback !== 'function') {
                throw new Error('task callback must be a function');
            }
            q.started = true;
            if (!isArray(data)) {
                data = [data];
            }
            if (data.length === 0) {
                // call drain immediately if there are no tasks
                return setImmediate$1(function () {
                    q.drain();
                });
            }
            arrayEach(data, function (task) {
                var item = {
                    data: task,
                    priority: priority,
                    callback: typeof callback === 'function' ? callback : noop
                };

                q.tasks.splice(_binarySearch(q.tasks, item, _compareTasks) + 1, 0, item);

                setImmediate$1(q.process);
            });
        }

        // Start with a normal queue
        var q = queue$1(worker, concurrency);

        // Override push to accept second parameter representing priority
        q.push = function (data, priority, callback) {
            _insert(q, data, priority, callback);
        };

        // Remove unshift function
        delete q.unshift;

        return q;
    }

    /**
     * Creates a `baseEach` or `baseEachRight` function.
     *
     * @private
     * @param {Function} eachFunc The function to iterate over a collection.
     * @param {boolean} [fromRight] Specify iterating from right to left.
     * @returns {Function} Returns the new base function.
     */
    function createBaseEach(eachFunc, fromRight) {
      return function(collection, iteratee) {
        if (collection == null) {
          return collection;
        }
        if (!isArrayLike(collection)) {
          return eachFunc(collection, iteratee);
        }
        var length = collection.length,
            index = fromRight ? length : -1,
            iterable = Object(collection);

        while ((fromRight ? index-- : ++index < length)) {
          if (iteratee(iterable[index], index, iterable) === false) {
            break;
          }
        }
        return collection;
      };
    }

    /**
     * The base implementation of `_.forEach` without support for iteratee shorthands.
     *
     * @private
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @returns {Array|Object} Returns `collection`.
     */
    var baseEach = createBaseEach(baseForOwn);

    /**
     * Iterates over elements of `collection` and invokes `iteratee` for each element.
     * The iteratee is invoked with three arguments: (value, index|key, collection).
     * Iteratee functions may exit iteration early by explicitly returning `false`.
     *
     * **Note:** As with other "Collections" methods, objects with a "length"
     * property are iterated like arrays. To avoid this behavior use `_.forIn`
     * or `_.forOwn` for object iteration.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @alias each
     * @category Collection
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @returns {Array|Object} Returns `collection`.
     * @see _.forEachRight
     * @example
     *
     * _([1, 2]).forEach(function(value) {
     *   console.log(value);
     * });
     * // => Logs `1` then `2`.
     *
     * _.forEach({ 'a': 1, 'b': 2 }, function(value, key) {
     *   console.log(key);
     * });
     * // => Logs 'a' then 'b' (iteration order is not guaranteed).
     */
    function forEach(collection, iteratee) {
      var func = isArray(collection) ? arrayEach : baseEach;
      return func(collection, baseIteratee(iteratee, 3));
    }

    /**
     * Runs the `tasks` array of functions in parallel, without waiting until the
     * previous function has completed. Once any the `tasks` completed or pass an
     * error to its callback, the main `callback` is immediately called. It's
     * equivalent to `Promise.race()`.
     *
     * @name race
     * @static
     * @memberOf async
     * @category Control Flow
     * @param {Array} tasks - An array containing functions to run. Each function
     * is passed a `callback(err, result)` which it must call on completion with an
     * error `err` (which can be `null`) and an optional `result` value.
     * @param {Function} callback - A callback to run once any of the functions have
     * completed. This function gets an error or result from the first function that
     * completed. Invoked with (err, result).
     * @example
     *
     * async.race([
     *     function(callback) {
     *         setTimeout(function() {
     *             callback(null, 'one');
     *         }, 200);
     *     },
     *     function(callback) {
     *         setTimeout(function() {
     *             callback(null, 'two');
     *         }, 100);
     *     }
     * ],
     * // main callback
     * function(err, result) {
     *     // the result will be equal to 'two' as it finishes earlier
     * });
     */
    function race(tasks, cb) {
        cb = once(cb || noop);
        if (!isArray(tasks)) return cb(new TypeError('First argument to race must be an array of functions'));
        if (!tasks.length) return cb();
        forEach(tasks, function (task) {
            task(cb);
        });
    }

    var slice = Array.prototype.slice;

    /**
     * Same as `reduce`, only operates on `coll` in reverse order.
     *
     * @name reduceRight
     * @static
     * @memberOf async
     * @see async.reduce
     * @alias foldr
     * @category Collection
     * @param {Array|Object} coll - A collection to iterate over.
     * @param {*} memo - The initial state of the reduction.
     * @param {Function} iteratee - A function applied to each item in the
     * array to produce the next step in the reduction. The `iteratee` is passed a
     * `callback(err, reduction)` which accepts an optional error as its first
     * argument, and the state of the reduction as the second. If an error is
     * passed to the callback, the reduction is stopped and the main `callback` is
     * immediately called with the error. Invoked with (memo, item, callback).
     * @param {Function} [callback] - A callback which is called after all the
     * `iteratee` functions have finished. Result is the reduced value. Invoked with
     * (err, result).
     */
    function reduceRight(arr, memo, iteratee, cb) {
      var reversed = slice.call(arr).reverse();
      reduce(reversed, memo, iteratee, cb);
    }

    /**
     * Wraps the function in another function that always returns data even when it
     * errors.
     *
     * The object returned has either the property `error` or `value`.
     *
     * @name reflect
     * @static
     * @memberOf async
     * @category Util
     * @param {Function} function - The function you want to wrap
     * @returns {Function} - A function that always passes null to it's callback as
     * the error. The second argument to the callback will be an `object` with
     * either an `error` or a `value` property.
     * @example
     *
     * async.parallel([
     *     async.reflect(function(callback) {
     *         // do some stuff ...
     *         callback(null, 'one');
     *     }),
     *     async.reflect(function(callback) {
     *         // do some more stuff but error ...
     *         callback('bad stuff happened');
     *     }),
     *     async.reflect(function(callback) {
     *         // do some more stuff ...
     *         callback(null, 'two');
     *     })
     * ],
     * // optional callback
     * function(err, results) {
     *     // values
     *     // results[0].value = 'one'
     *     // results[1].error = 'bad stuff happened'
     *     // results[2].value = 'two'
     * });
     */
    function reflect(fn) {
        return initialParams(function reflectOn(args, reflectCallback) {
            args.push(rest(function callback(err, cbArgs) {
                if (err) {
                    reflectCallback(null, {
                        error: err
                    });
                } else {
                    var value = null;
                    if (cbArgs.length === 1) {
                        value = cbArgs[0];
                    } else if (cbArgs.length > 1) {
                        value = cbArgs;
                    }
                    reflectCallback(null, {
                        value: value
                    });
                }
            }));

            return fn.apply(this, args);
        });
    }

    function reject$1(eachfn, arr, iteratee, callback) {
        _filter(eachfn, arr, function (value, cb) {
            iteratee(value, function (err, v) {
                if (err) {
                    cb(err);
                } else {
                    cb(null, !v);
                }
            });
        }, callback);
    }

    /**
     * The same as `reject` but runs a maximum of `limit` async operations at a
     * time.
     *
     * @name rejectLimit
     * @static
     * @memberOf async
     * @see async.reject
     * @category Collection
     * @param {Array|Object} coll - A collection to iterate over.
     * @param {number} limit - The maximum number of async operations at a time.
     * @param {Function} iteratee - A truth test to apply to each item in `coll`.
     * The `iteratee` is passed a `callback(err, truthValue)`, which must be called
     * with a boolean argument once it has completed. Invoked with (item, callback).
     * @param {Function} [callback] - A callback which is called after all the
     * `iteratee` functions have finished. Invoked with (err, results).
     */
    var rejectLimit = doParallelLimit(reject$1);

    /**
     * The opposite of `filter`. Removes values that pass an `async` truth test.
     *
     * @name reject
     * @static
     * @memberOf async
     * @see async.filter
     * @category Collection
     * @param {Array|Object} coll - A collection to iterate over.
     * @param {Function} iteratee - A truth test to apply to each item in `coll`.
     * The `iteratee` is passed a `callback(err, truthValue)`, which must be called
     * with a boolean argument once it has completed. Invoked with (item, callback).
     * @param {Function} [callback] - A callback which is called after all the
     * `iteratee` functions have finished. Invoked with (err, results).
     * @example
     *
     * async.reject(['file1','file2','file3'], function(filePath, callback) {
     *     fs.access(filePath, function(err) {
     *         callback(null, !err)
     *     });
     * }, function(err, results) {
     *     // results now equals an array of missing files
     *     createFiles(results);
     * });
     */
    var reject = doLimit(rejectLimit, Infinity);

    /**
     * A helper function that wraps an array of functions with reflect.
     *
     * @name reflectAll
     * @static
     * @memberOf async
     * @see async.reflect
     * @category Util
     * @param {Array} tasks - The array of functions to wrap in `async.reflect`.
     * @returns {Array} Returns an array of functions, each function wrapped in
     * `async.reflect`
     * @example
     *
     * let tasks = [
     *     function(callback) {
     *         setTimeout(function() {
     *             callback(null, 'one');
     *         }, 200);
     *     },
     *     function(callback) {
     *         // do some more stuff but error ...
     *         callback(new Error('bad stuff happened'));
     *     },
     *     function(callback) {
     *         setTimeout(function() {
     *             callback(null, 'two');
     *         }, 100);
     *     }
     * ];
     *
     * async.parallel(async.reflectAll(tasks),
     * // optional callback
     * function(err, results) {
     *     // values
     *     // results[0].value = 'one'
     *     // results[1].error = Error('bad stuff happened')
     *     // results[2].value = 'two'
     * });
     */
    function reflectAll(tasks) {
      return tasks.map(reflect);
    }

    /**
     * The same as `reject` but runs only a single async operation at a time.
     *
     * @name rejectSeries
     * @static
     * @memberOf async
     * @see async.reject
     * @category Collection
     * @param {Array|Object} coll - A collection to iterate over.
     * @param {Function} iteratee - A truth test to apply to each item in `coll`.
     * The `iteratee` is passed a `callback(err, truthValue)`, which must be called
     * with a boolean argument once it has completed. Invoked with (item, callback).
     * @param {Function} [callback] - A callback which is called after all the
     * `iteratee` functions have finished. Invoked with (err, results).
     */
    var rejectSeries = doLimit(rejectLimit, 1);

    /**
     * Run the functions in the `tasks` collection in series, each one running once
     * the previous function has completed. If any functions in the series pass an
     * error to its callback, no more functions are run, and `callback` is
     * immediately called with the value of the error. Otherwise, `callback`
     * receives an array of results when `tasks` have completed.
     *
     * It is also possible to use an object instead of an array. Each property will
     * be run as a function, and the results will be passed to the final `callback`
     * as an object instead of an array. This can be a more readable way of handling
     *  results from {@link async.series}.
     *
     * **Note** that while many implementations preserve the order of object
     * properties, the [ECMAScript Language Specification](http://www.ecma-international.org/ecma-262/5.1/#sec-8.6)
     * explicitly states that
     *
     * > The mechanics and order of enumerating the properties is not specified.
     *
     * So if you rely on the order in which your series of functions are executed,
     * and want this to work on all platforms, consider using an array.
     *
     * @name series
     * @static
     * @memberOf async
     * @category Control Flow
     * @param {Array|Object} tasks - A collection containing functions to run, each
     * function is passed a `callback(err, result)` it must call on completion with
     * an error `err` (which can be `null`) and an optional `result` value.
     * @param {Function} [callback] - An optional callback to run once all the
     * functions have completed. This function gets a results array (or object)
     * containing all the result arguments passed to the `task` callbacks. Invoked
     * with (err, result).
     * @example
     * async.series([
     *     function(callback) {
     *         // do some stuff ...
     *         callback(null, 'one');
     *     },
     *     function(callback) {
     *         // do some more stuff ...
     *         callback(null, 'two');
     *     }
     * ],
     * // optional callback
     * function(err, results) {
     *     // results is now equal to ['one', 'two']
     * });
     *
     * async.series({
     *     one: function(callback) {
     *         setTimeout(function() {
     *             callback(null, 1);
     *         }, 200);
     *     },
     *     two: function(callback){
     *         setTimeout(function() {
     *             callback(null, 2);
     *         }, 100);
     *     }
     * }, function(err, results) {
     *     // results is now equal to: {one: 1, two: 2}
     * });
     */
    function series(tasks, cb) {
      return _parallel(eachOfSeries, tasks, cb);
    }

    /**
     * Creates a function that returns `value`.
     *
     * @static
     * @memberOf _
     * @since 2.4.0
     * @category Util
     * @param {*} value The value to return from the new function.
     * @returns {Function} Returns the new constant function.
     * @example
     *
     * var objects = _.times(2, _.constant({ 'a': 1 }));
     *
     * console.log(objects);
     * // => [{ 'a': 1 }, { 'a': 1 }]
     *
     * console.log(objects[0] === objects[1]);
     * // => true
     */
    function constant$1(value) {
      return function() {
        return value;
      };
    }

    /**
     * Attempts to get a successful response from `task` no more than `times` times
     * before returning an error. If the task is successful, the `callback` will be
     * passed the result of the successful task. If all attempts fail, the callback
     * will be passed the error and result (if any) of the final attempt.
     *
     * @name retry
     * @static
     * @memberOf async
     * @category Control Flow
     * @param {Object|number} [opts = {times: 5, interval: 0}| 5] - Can be either an
     * object with `times` and `interval` or a number.
     * * `times` - The number of attempts to make before giving up.  The default
     *   is `5`.
     * * `interval` - The time to wait between retries, in milliseconds.  The
     *   default is `0`. The interval may also be specified as a function of the
     *   retry count (see example).
     * * If `opts` is a number, the number specifies the number of times to retry,
     *   with the default interval of `0`.
     * @param {Function} task - A function which receives two arguments: (1) a
     * `callback(err, result)` which must be called when finished, passing `err`
     * (which can be `null`) and the `result` of the function's execution, and (2)
     * a `results` object, containing the results of the previously executed
     * functions (if nested inside another control flow). Invoked with
     * (callback, results).
     * @param {Function} [callback] - An optional callback which is called when the
     * task has succeeded, or after the final failed attempt. It receives the `err`
     * and `result` arguments of the last attempt at completing the `task`. Invoked
     * with (err, results).
     * @example
     *
     * // The `retry` function can be used as a stand-alone control flow by passing
     * // a callback, as shown below:
     *
     * // try calling apiMethod 3 times
     * async.retry(3, apiMethod, function(err, result) {
     *     // do something with the result
     * });
     *
     * // try calling apiMethod 3 times, waiting 200 ms between each retry
     * async.retry({times: 3, interval: 200}, apiMethod, function(err, result) {
     *     // do something with the result
     * });
     *
     * // try calling apiMethod 10 times with exponential backoff
     * // (i.e. intervals of 100, 200, 400, 800, 1600, ... milliseconds)
     * async.retry({
     *   times: 10,
     *   interval: function(retryCount) {
     *     return 50 * Math.pow(2, retryCount);
     *   }
     * }, apiMethod, function(err, result) {
     *     // do something with the result
     * });
     *
     * // try calling apiMethod the default 5 times no delay between each retry
     * async.retry(apiMethod, function(err, result) {
     *     // do something with the result
     * });
     *
     * // It can also be embedded within other control flow functions to retry
     * // individual methods that are not as reliable, like this:
     * async.auto({
     *     users: api.getUsers.bind(api),
     *     payments: async.retry(3, api.getPayments.bind(api))
     * }, function(err, results) {
     *     // do something with the results
     * });
     */
    function retry(times, task, callback) {
        var DEFAULT_TIMES = 5;
        var DEFAULT_INTERVAL = 0;

        var opts = {
            times: DEFAULT_TIMES,
            intervalFunc: constant$1(DEFAULT_INTERVAL)
        };

        function parseTimes(acc, t) {
            if (typeof t === 'object') {
                acc.times = +t.times || DEFAULT_TIMES;

                acc.intervalFunc = typeof t.interval === 'function' ? t.interval : constant$1(+t.interval || DEFAULT_INTERVAL);
            } else if (typeof t === 'number' || typeof t === 'string') {
                acc.times = +t || DEFAULT_TIMES;
            } else {
                throw new Error("Invalid arguments for async.retry");
            }
        }

        if (arguments.length < 3 && typeof times === 'function') {
            callback = task || noop;
            task = times;
        } else {
            parseTimes(opts, times);
            callback = callback || noop;
        }

        if (typeof task !== 'function') {
            throw new Error("Invalid arguments for async.retry");
        }

        var attempts = [];
        for (var i = 1; i < opts.times + 1; i++) {
            var isFinalAttempt = i == opts.times;
            attempts.push(retryAttempt(isFinalAttempt));
            var interval = opts.intervalFunc(i);
            if (!isFinalAttempt && interval > 0) {
                attempts.push(retryInterval(interval));
            }
        }

        series(attempts, function (done, data) {
            data = data[data.length - 1];
            callback(data.err, data.result);
        });

        function retryAttempt(isFinalAttempt) {
            return function (seriesCallback) {
                task(function (err, result) {
                    seriesCallback(!err || isFinalAttempt, {
                        err: err,
                        result: result
                    });
                });
            };
        }

        function retryInterval(interval) {
            return function (seriesCallback) {
                setTimeout(function () {
                    seriesCallback(null);
                }, interval);
            };
        }
    }

    /**
     * A close relative of `retry`.  This method wraps a task and makes it
     * retryable, rather than immediately calling it with retries.
     *
     * @name retryable
     * @static
     * @memberOf async
     * @see async.retry
     * @category Control Flow
     * @param {Object|number} [opts = {times: 5, interval: 0}| 5] - optional
     * options, exactly the same as from `retry`
     * @param {Function} task - the asynchronous function to wrap
     * @returns {Functions} The wrapped function, which when invoked, will retry on
     * an error, based on the parameters specified in `opts`.
     * @example
     *
     * async.auto({
     *     dep1: async.retryable(3, getFromFlakyService),
     *     process: ["dep1", async.retryable(3, function (results, cb) {
     *         maybeProcessData(results.dep1, cb);
     *     })]
     * }, callback);
     */
    function retryable (opts, task) {
        if (!task) {
            task = opts;
            opts = null;
        }
        return initialParams(function (args, callback) {
            function taskFn(cb) {
                task.apply(null, args.concat([cb]));
            }

            if (opts) retry(opts, taskFn, callback);else retry(taskFn, callback);
        });
    }

    /**
     * The same as `some` but runs a maximum of `limit` async operations at a time.
     *
     * @name someLimit
     * @static
     * @memberOf async
     * @see async.some
     * @alias anyLimit
     * @category Collection
     * @param {Array|Object} coll - A collection to iterate over.
     * @param {number} limit - The maximum number of async operations at a time.
     * @param {Function} iteratee - A truth test to apply to each item in the array
     * in parallel. The iteratee is passed a `callback(err, truthValue)` which must
     * be called with a boolean argument once it has completed. Invoked with
     * (item, callback).
     * @param {Function} [callback] - A callback which is called as soon as any
     * iteratee returns `true`, or after all the iteratee functions have finished.
     * Result will be either `true` or `false` depending on the values of the async
     * tests. Invoked with (err, result).
     */
    var someLimit = _createTester(eachOfLimit, Boolean, identity);

    /**
     * Returns `true` if at least one element in the `coll` satisfies an async test.
     * If any iteratee call returns `true`, the main `callback` is immediately
     * called.
     *
     * @name some
     * @static
     * @memberOf async
     * @alias any
     * @category Collection
     * @param {Array|Object} coll - A collection to iterate over.
     * @param {Function} iteratee - A truth test to apply to each item in the array
     * in parallel. The iteratee is passed a `callback(err, truthValue)` which must
     * be called with a boolean argument once it has completed. Invoked with
     * (item, callback).
     * @param {Function} [callback] - A callback which is called as soon as any
     * iteratee returns `true`, or after all the iteratee functions have finished.
     * Result will be either `true` or `false` depending on the values of the async
     * tests. Invoked with (err, result).
     * @example
     *
     * async.some(['file1','file2','file3'], function(filePath, callback) {
     *     fs.access(filePath, function(err) {
     *         callback(null, !err)
     *     });
     * }, function(err, result) {
     *     // if result is true then at least one of the files exists
     * });
     */
    var some = doLimit(someLimit, Infinity);

    /**
     * The same as `some` but runs only a single async operation at a time.
     *
     * @name someSeries
     * @static
     * @memberOf async
     * @see async.some
     * @alias anySeries
     * @category Collection
     * @param {Array|Object} coll - A collection to iterate over.
     * @param {Function} iteratee - A truth test to apply to each item in the array
     * in parallel. The iteratee is passed a `callback(err, truthValue)` which must
     * be called with a boolean argument once it has completed. Invoked with
     * (item, callback).
     * @param {Function} [callback] - A callback which is called as soon as any
     * iteratee returns `true`, or after all the iteratee functions have finished.
     * Result will be either `true` or `false` depending on the values of the async
     * tests. Invoked with (err, result).
     */
    var someSeries = doLimit(someLimit, 1);

    /**
     * Sorts a list by the results of running each `coll` value through an async
     * `iteratee`.
     *
     * @name sortBy
     * @static
     * @memberOf async
     * @category Collection
     * @param {Array|Object} coll - A collection to iterate over.
     * @param {Function} iteratee - A function to apply to each item in `coll`.
     * The iteratee is passed a `callback(err, sortValue)` which must be called once
     * it has completed with an error (which can be `null`) and a value to use as
     * the sort criteria. Invoked with (item, callback).
     * @param {Function} [callback] - A callback which is called after all the
     * `iteratee` functions have finished, or an error occurs. Results is the items
     * from the original `coll` sorted by the values returned by the `iteratee`
     * calls. Invoked with (err, results).
     * @example
     *
     * async.sortBy(['file1','file2','file3'], function(file, callback) {
     *     fs.stat(file, function(err, stats) {
     *         callback(err, stats.mtime);
     *     });
     * }, function(err, results) {
     *     // results is now the original array of files sorted by
     *     // modified date
     * });
     *
     * // By modifying the callback parameter the
     * // sorting order can be influenced:
     *
     * // ascending order
     * async.sortBy([1,9,3,5], function(x, callback) {
     *     callback(null, x);
     * }, function(err,result) {
     *     // result callback
     * });
     *
     * // descending order
     * async.sortBy([1,9,3,5], function(x, callback) {
     *     callback(null, x*-1);    //<- x*-1 instead of x, turns the order around
     * }, function(err,result) {
     *     // result callback
     * });
     */
    function sortBy(arr, iteratee, cb) {
        map(arr, function (x, cb) {
            iteratee(x, function (err, criteria) {
                if (err) return cb(err);
                cb(null, { value: x, criteria: criteria });
            });
        }, function (err, results) {
            if (err) return cb(err);
            cb(null, arrayMap(results.sort(comparator), baseProperty('value')));
        });

        function comparator(left, right) {
            var a = left.criteria,
                b = right.criteria;
            return a < b ? -1 : a > b ? 1 : 0;
        }
    }

    /**
     * Sets a time limit on an asynchronous function. If the function does not call
     * its callback within the specified miliseconds, it will be called with a
     * timeout error. The code property for the error object will be `'ETIMEDOUT'`.
     *
     * @name timeout
     * @static
     * @memberOf async
     * @category Util
     * @param {Function} function - The asynchronous function you want to set the
     * time limit.
     * @param {number} miliseconds - The specified time limit.
     * @param {*} [info] - Any variable you want attached (`string`, `object`, etc)
     * to timeout Error for more information..
     * @returns {Function} Returns a wrapped function that can be used with any of
     * the control flow functions.
     * @example
     *
     * async.timeout(function(callback) {
     *     doAsyncTask(callback);
     * }, 1000);
     */
    function timeout(asyncFn, miliseconds, info) {
        var originalCallback, timer;
        var timedOut = false;

        function injectedCallback() {
            if (!timedOut) {
                originalCallback.apply(null, arguments);
                clearTimeout(timer);
            }
        }

        function timeoutCallback() {
            var name = asyncFn.name || 'anonymous';
            var error = new Error('Callback function "' + name + '" timed out.');
            error.code = 'ETIMEDOUT';
            if (info) {
                error.info = info;
            }
            timedOut = true;
            originalCallback(error);
        }

        return initialParams(function (args, origCallback) {
            originalCallback = origCallback;
            // setup timer and call original function
            timer = setTimeout(timeoutCallback, miliseconds);
            asyncFn.apply(null, args.concat(injectedCallback));
        });
    }

    /* Built-in method references for those with the same name as other `lodash` methods. */
    var nativeCeil = Math.ceil;
    var nativeMax$1 = Math.max;
    /**
     * The base implementation of `_.range` and `_.rangeRight` which doesn't
     * coerce arguments to numbers.
     *
     * @private
     * @param {number} start The start of the range.
     * @param {number} end The end of the range.
     * @param {number} step The value to increment or decrement by.
     * @param {boolean} [fromRight] Specify iterating from right to left.
     * @returns {Array} Returns the range of numbers.
     */
    function baseRange(start, end, step, fromRight) {
      var index = -1,
          length = nativeMax$1(nativeCeil((end - start) / (step || 1)), 0),
          result = Array(length);

      while (length--) {
        result[fromRight ? length : ++index] = start;
        start += step;
      }
      return result;
    }

    /**
    * The same as {@link times} but runs a maximum of `limit` async operations at a
    * time.
     *
     * @name timesLimit
     * @static
     * @memberOf async
     * @see async.times
     * @category Control Flow
     * @param {number} n - The number of times to run the function.
     * @param {number} limit - The maximum number of async operations at a time.
     * @param {Function} iteratee - The function to call `n` times. Invoked with the
     * iteration index and a callback (n, next).
     * @param {Function} callback - see {@link async.map}.
     */
    function timeLimit(count, limit, iteratee, cb) {
      return mapLimit(baseRange(0, count, 1), limit, iteratee, cb);
    }

    /**
     * Calls the `iteratee` function `n` times, and accumulates results in the same
     * manner you would use with {@link async.map}.
     *
     * @name times
     * @static
     * @memberOf async
     * @see async.map
     * @category Control Flow
     * @param {number} n - The number of times to run the function.
     * @param {Function} iteratee - The function to call `n` times. Invoked with the
     * iteration index and a callback (n, next).
     * @param {Function} callback - see {@link async.map}.
     * @example
     *
     * // Pretend this is some complicated async factory
     * var createUser = function(id, callback) {
     *     callback(null, {
     *         id: 'user' + id
     *     });
     * };
     *
     * // generate 5 users
     * async.times(5, function(n, next) {
     *     createUser(n, function(err, user) {
     *         next(err, user);
     *     });
     * }, function(err, users) {
     *     // we should now have 5 users
     * });
     */
    var times = doLimit(timeLimit, Infinity);

    /**
     * The same as {@link async.times} but runs only a single async operation at a time.
     *
     * @name timesSeries
     * @static
     * @memberOf async
     * @see async.times
     * @category Control Flow
     * @param {number} n - The number of times to run the function.
     * @param {Function} iteratee - The function to call `n` times. Invoked with the
     * iteration index and a callback (n, next).
     * @param {Function} callback - see {@link async.map}.
     */
    var timesSeries = doLimit(timeLimit, 1);

    /**
     * A relative of `reduce`.  Takes an Object or Array, and iterates over each
     * element in series, each step potentially mutating an `accumulator` value.
     * The type of the accumulator defaults to the type of collection passed in.
     *
     * @name transform
     * @static
     * @memberOf async
     * @category Collection
     * @param {Array|Object} coll - A collection to iterate over.
     * @param {*} [accumulator] - The initial state of the transform.  If omitted,
     * it will default to an empty Object or Array, depending on the type of `coll`
     * @param {Function} iteratee - A function applied to each item in the
     * collection that potentially modifies the accumulator. The `iteratee` is
     * passed a `callback(err)` which accepts an optional error as its first
     * argument. If an error is passed to the callback, the transform is stopped
     * and the main `callback` is immediately called with the error.
     * Invoked with (accumulator, item, key, callback).
     * @param {Function} [callback] - A callback which is called after all the
     * `iteratee` functions have finished. Result is the transformed accumulator.
     * Invoked with (err, result).
     * @example
     *
     * async.transform([1,2,3], function(acc, item, index, callback) {
     *     // pointless async:
     *     process.nextTick(function() {
     *         acc.push(item * 2)
     *         callback(null)
     *     });
     * }, function(err, result) {
     *     // result is now equal to [2, 4, 6]
     * });
     *
     * @example
     *
     * async.transform({a: 1, b: 2, c: 3}, function (obj, val, key, callback) {
     *     setImmediate(function () {
     *         obj[key] = val * 2;
     *         callback();
     *     })
     * }, function (err, result) {
     *     // result is equal to {a: 2, b: 4, c: 6}
     * })
     */
    function transform(arr, acc, iteratee, callback) {
        if (arguments.length === 3) {
            callback = iteratee;
            iteratee = acc;
            acc = isArray(arr) ? [] : {};
        }

        eachOf(arr, function (v, k, cb) {
            iteratee(acc, v, k, cb);
        }, function (err) {
            callback(err, acc);
        });
    }

    /**
     * Undoes a {@link async.memoize}d function, reverting it to the original,
     * unmemoized form. Handy for testing.
     *
     * @name unmemoize
     * @static
     * @memberOf async
     * @see async.memoize
     * @category Util
     * @param {Function} fn - the memoized function
     */
    function unmemoize(fn) {
        return function () {
            return (fn.unmemoized || fn).apply(null, arguments);
        };
    }

    /**
     * Repeatedly call `fn` until `test` returns `true`. Calls `callback` when
     * stopped, or an error occurs. `callback` will be passed an error and any
     * arguments passed to the final `fn`'s callback.
     *
     * The inverse of {@link async.whilst}.
     *
     * @name until
     * @static
     * @memberOf async
     * @see async.whilst
     * @category Control Flow
     * @param {Function} test - synchronous truth test to perform before each
     * execution of `fn`. Invoked with ().
     * @param {Function} fn - A function which is called each time `test` fails.
     * The function is passed a `callback(err)`, which must be called once it has
     * completed with an optional `err` argument. Invoked with (callback).
     * @param {Function} [callback] - A callback which is called after the test
     * function has passed and repeated execution of `fn` has stopped. `callback`
     * will be passed an error and any arguments passed to the final `fn`'s
     * callback. Invoked with (err, [results]);
     */
    function until(test, iteratee, cb) {
        return whilst(function () {
            return !test.apply(this, arguments);
        }, iteratee, cb);
    }

    /**
     * Runs the `tasks` array of functions in series, each passing their results to
     * the next in the array. However, if any of the `tasks` pass an error to their
     * own callback, the next function is not executed, and the main `callback` is
     * immediately called with the error.
     *
     * @name waterfall
     * @static
     * @memberOf async
     * @category Control Flow
     * @param {Array} tasks - An array of functions to run, each function is passed
     * a `callback(err, result1, result2, ...)` it must call on completion. The
     * first argument is an error (which can be `null`) and any further arguments
     * will be passed as arguments in order to the next task.
     * @param {Function} [callback] - An optional callback to run once all the
     * functions have completed. This will be passed the results of the last task's
     * callback. Invoked with (err, [results]).
     * @example
     *
     * async.waterfall([
     *     function(callback) {
     *         callback(null, 'one', 'two');
     *     },
     *     function(arg1, arg2, callback) {
     *         // arg1 now equals 'one' and arg2 now equals 'two'
     *         callback(null, 'three');
     *     },
     *     function(arg1, callback) {
     *         // arg1 now equals 'three'
     *         callback(null, 'done');
     *     }
     * ], function (err, result) {
     *     // result now equals 'done'
     * });
     *
     * // Or, with named functions:
     * async.waterfall([
     *     myFirstFunction,
     *     mySecondFunction,
     *     myLastFunction,
     * ], function (err, result) {
     *     // result now equals 'done'
     * });
     * function myFirstFunction(callback) {
     *     callback(null, 'one', 'two');
     * }
     * function mySecondFunction(arg1, arg2, callback) {
     *     // arg1 now equals 'one' and arg2 now equals 'two'
     *     callback(null, 'three');
     * }
     * function myLastFunction(arg1, callback) {
     *     // arg1 now equals 'three'
     *     callback(null, 'done');
     * }
     */
    function waterfall (tasks, cb) {
        cb = once(cb || noop);
        if (!isArray(tasks)) return cb(new Error('First argument to waterfall must be an array of functions'));
        if (!tasks.length) return cb();
        var taskIndex = 0;

        function nextTask(args) {
            if (taskIndex === tasks.length) {
                return cb.apply(null, [null].concat(args));
            }

            var taskCallback = onlyOnce(rest(function (err, args) {
                if (err) {
                    return cb.apply(null, [err].concat(args));
                }
                nextTask(args);
            }));

            args.push(taskCallback);

            var task = tasks[taskIndex++];
            task.apply(null, args);
        }

        nextTask([]);
    }

    var index = {
        applyEach: applyEach,
        applyEachSeries: applyEachSeries,
        apply: apply$1,
        asyncify: asyncify,
        auto: auto,
        autoInject: autoInject,
        cargo: cargo,
        compose: compose,
        concat: concat,
        concatSeries: concatSeries,
        constant: constant,
        detect: detect,
        detectLimit: detectLimit,
        detectSeries: detectSeries,
        dir: dir,
        doDuring: doDuring,
        doUntil: doUntil,
        doWhilst: doWhilst,
        during: during,
        each: each,
        eachLimit: eachLimit,
        eachOf: eachOf,
        eachOfLimit: eachOfLimit,
        eachOfSeries: eachOfSeries,
        eachSeries: eachSeries,
        ensureAsync: ensureAsync,
        every: every,
        everyLimit: everyLimit,
        everySeries: everySeries,
        filter: filter,
        filterLimit: filterLimit,
        filterSeries: filterSeries,
        forever: forever,
        iterator: iterator$1,
        log: log,
        map: map,
        mapLimit: mapLimit,
        mapSeries: mapSeries,
        mapValues: mapValues,
        mapValuesLimit: mapValuesLimit,
        mapValuesSeries: mapValuesSeries,
        memoize: memoize$1,
        nextTick: nextTick,
        parallel: parallel,
        parallelLimit: parallelLimit,
        priorityQueue: priorityQueue,
        queue: queue$1,
        race: race,
        reduce: reduce,
        reduceRight: reduceRight,
        reflect: reflect,
        reflectAll: reflectAll,
        reject: reject,
        rejectLimit: rejectLimit,
        rejectSeries: rejectSeries,
        retry: retry,
        retryable: retryable,
        seq: seq,
        series: series,
        setImmediate: setImmediate$1,
        some: some,
        someLimit: someLimit,
        someSeries: someSeries,
        sortBy: sortBy,
        timeout: timeout,
        times: times,
        timesLimit: timeLimit,
        timesSeries: timesSeries,
        transform: transform,
        unmemoize: unmemoize,
        until: until,
        waterfall: waterfall,
        whilst: whilst,

        // aliases
        all: every,
        any: some,
        forEach: each,
        forEachSeries: eachSeries,
        forEachLimit: eachLimit,
        forEachOf: eachOf,
        forEachOfSeries: eachOfSeries,
        forEachOfLimit: eachOfLimit,
        inject: reduce,
        foldl: reduce,
        foldr: reduceRight,
        select: filter,
        selectLimit: filterLimit,
        selectSeries: filterSeries,
        wrapSync: asyncify
    };

    exports['default'] = index;
    exports.applyEach = applyEach;
    exports.applyEachSeries = applyEachSeries;
    exports.apply = apply$1;
    exports.asyncify = asyncify;
    exports.auto = auto;
    exports.autoInject = autoInject;
    exports.cargo = cargo;
    exports.compose = compose;
    exports.concat = concat;
    exports.concatSeries = concatSeries;
    exports.constant = constant;
    exports.detect = detect;
    exports.detectLimit = detectLimit;
    exports.detectSeries = detectSeries;
    exports.dir = dir;
    exports.doDuring = doDuring;
    exports.doUntil = doUntil;
    exports.doWhilst = doWhilst;
    exports.during = during;
    exports.each = each;
    exports.eachLimit = eachLimit;
    exports.eachOf = eachOf;
    exports.eachOfLimit = eachOfLimit;
    exports.eachOfSeries = eachOfSeries;
    exports.eachSeries = eachSeries;
    exports.ensureAsync = ensureAsync;
    exports.every = every;
    exports.everyLimit = everyLimit;
    exports.everySeries = everySeries;
    exports.filter = filter;
    exports.filterLimit = filterLimit;
    exports.filterSeries = filterSeries;
    exports.forever = forever;
    exports.iterator = iterator$1;
    exports.log = log;
    exports.map = map;
    exports.mapLimit = mapLimit;
    exports.mapSeries = mapSeries;
    exports.mapValues = mapValues;
    exports.mapValuesLimit = mapValuesLimit;
    exports.mapValuesSeries = mapValuesSeries;
    exports.memoize = memoize$1;
    exports.nextTick = nextTick;
    exports.parallel = parallel;
    exports.parallelLimit = parallelLimit;
    exports.priorityQueue = priorityQueue;
    exports.queue = queue$1;
    exports.race = race;
    exports.reduce = reduce;
    exports.reduceRight = reduceRight;
    exports.reflect = reflect;
    exports.reflectAll = reflectAll;
    exports.reject = reject;
    exports.rejectLimit = rejectLimit;
    exports.rejectSeries = rejectSeries;
    exports.retry = retry;
    exports.retryable = retryable;
    exports.seq = seq;
    exports.series = series;
    exports.setImmediate = setImmediate$1;
    exports.some = some;
    exports.someLimit = someLimit;
    exports.someSeries = someSeries;
    exports.sortBy = sortBy;
    exports.timeout = timeout;
    exports.times = times;
    exports.timesLimit = timeLimit;
    exports.timesSeries = timesSeries;
    exports.transform = transform;
    exports.unmemoize = unmemoize;
    exports.until = until;
    exports.waterfall = waterfall;
    exports.whilst = whilst;
    exports.all = every;
    exports.allLimit = everyLimit;
    exports.allSeries = everySeries;
    exports.any = some;
    exports.anyLimit = someLimit;
    exports.anySeries = someSeries;
    exports.find = detect;
    exports.findLimit = detectLimit;
    exports.findSeries = detectSeries;
    exports.forEach = each;
    exports.forEachSeries = eachSeries;
    exports.forEachLimit = eachLimit;
    exports.forEachOf = eachOf;
    exports.forEachOfSeries = eachOfSeries;
    exports.forEachOfLimit = eachOfLimit;
    exports.inject = reduce;
    exports.foldl = reduce;
    exports.foldr = reduceRight;
    exports.select = filter;
    exports.selectLimit = filterLimit;
    exports.selectSeries = filterSeries;
    exports.wrapSync = asyncify;

}));
}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"_process":11}],8:[function(require,module,exports){
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

},{"util/":13}],9:[function(require,module,exports){

},{}],10:[function(require,module,exports){
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

},{}],11:[function(require,module,exports){
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

},{}],12:[function(require,module,exports){
module.exports = function isBuffer(arg) {
  return arg && typeof arg === 'object'
    && typeof arg.copy === 'function'
    && typeof arg.fill === 'function'
    && typeof arg.readUInt8 === 'function';
}
},{}],13:[function(require,module,exports){
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

},{"./support/isBuffer":12,"_process":11,"inherits":10}],14:[function(require,module,exports){
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

},{"assert":8,"global/document":15,"hash-match":17,"send-action":18,"sheet-router":22,"sheet-router/hash":19,"sheet-router/history":20,"sheet-router/href":21,"xtend":27,"xtend/mutable":28,"yo-yo":29}],15:[function(require,module,exports){
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

},{"min-document":9}],16:[function(require,module,exports){
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

},{}],17:[function(require,module,exports){
module.exports = function hashMatch (hash, prefix) {
  var pre = prefix || '/';
  if (hash.length === 0) return pre;
  hash = hash.replace('#', '');
  hash = hash.replace(/\/$/, '')
  if (hash.indexOf('/') != 0) hash = '/' + hash;
  if (pre == '/') return hash;
  else return hash.replace(pre, '');
}

},{}],18:[function(require,module,exports){
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

},{"_process":11,"xtend":27}],19:[function(require,module,exports){
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

},{"assert":8,"global/window":16}],20:[function(require,module,exports){
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

},{"assert":8,"global/document":15,"global/window":16}],21:[function(require,module,exports){
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

},{"assert":8,"global/window":16}],22:[function(require,module,exports){
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

},{"assert":8,"pathname-match":23,"wayfarer":25}],23:[function(require,module,exports){
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

},{"assert":8}],24:[function(require,module,exports){

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


},{}],25:[function(require,module,exports){
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

},{"./trie":26,"assert":8,"sliced":24}],26:[function(require,module,exports){
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

},{"assert":8,"xtend":27,"xtend/mutable":28}],27:[function(require,module,exports){
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

},{}],28:[function(require,module,exports){
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

},{}],29:[function(require,module,exports){
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

},{"./update-events.js":34,"bel":30,"morphdom":33}],30:[function(require,module,exports){
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

},{"global/document":15,"hyperx":31}],31:[function(require,module,exports){
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

},{"hyperscript-attribute-to-property":32}],32:[function(require,module,exports){
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

},{}],33:[function(require,module,exports){
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

},{}],34:[function(require,module,exports){
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

},{}],35:[function(require,module,exports){
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

},{}],36:[function(require,module,exports){
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

},{"global/document":37,"global/window":38}],37:[function(require,module,exports){
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

},{"min-document":9}],38:[function(require,module,exports){
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

},{}],39:[function(require,module,exports){
module.exports=[
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

},{}]},{},[5])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJjb21wb25lbnRzL2RpcmVjdGlvbnMtcGFuZWwuanMiLCJjb21wb25lbnRzL2dvb2dsZS1tYXAuanMiLCJjb21wb25lbnRzL3NpZGUtYmFyLmpzIiwiY29tcG9uZW50cy91c2VyLWxvY2F0aW9uLmpzIiwiaW5kZXguanMiLCJtYXAtc3R5bGVzLmpzb24iLCJub2RlX21vZHVsZXMvYXN5bmMvZGlzdC9hc3luYy5qcyIsIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9hc3NlcnQvYXNzZXJ0LmpzIiwibm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcmVzb2x2ZS9lbXB0eS5qcyIsIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9pbmhlcml0cy9pbmhlcml0c19icm93c2VyLmpzIiwibm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL3Byb2Nlc3MvYnJvd3Nlci5qcyIsIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy91dGlsL3N1cHBvcnQvaXNCdWZmZXJCcm93c2VyLmpzIiwibm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL3V0aWwvdXRpbC5qcyIsIm5vZGVfbW9kdWxlcy9jaG9vL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2Nob28vbm9kZV9tb2R1bGVzL2dsb2JhbC9kb2N1bWVudC5qcyIsIm5vZGVfbW9kdWxlcy9jaG9vL25vZGVfbW9kdWxlcy9nbG9iYWwvd2luZG93LmpzIiwibm9kZV9tb2R1bGVzL2Nob28vbm9kZV9tb2R1bGVzL2hhc2gtbWF0Y2gvaW5kZXguanMiLCJub2RlX21vZHVsZXMvY2hvby9ub2RlX21vZHVsZXMvc2VuZC1hY3Rpb24vaW5kZXguanMiLCJub2RlX21vZHVsZXMvY2hvby9ub2RlX21vZHVsZXMvc2hlZXQtcm91dGVyL2hhc2guanMiLCJub2RlX21vZHVsZXMvY2hvby9ub2RlX21vZHVsZXMvc2hlZXQtcm91dGVyL2hpc3RvcnkuanMiLCJub2RlX21vZHVsZXMvY2hvby9ub2RlX21vZHVsZXMvc2hlZXQtcm91dGVyL2hyZWYuanMiLCJub2RlX21vZHVsZXMvY2hvby9ub2RlX21vZHVsZXMvc2hlZXQtcm91dGVyL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2Nob28vbm9kZV9tb2R1bGVzL3NoZWV0LXJvdXRlci9ub2RlX21vZHVsZXMvcGF0aG5hbWUtbWF0Y2gvaW5kZXguanMiLCJub2RlX21vZHVsZXMvY2hvby9ub2RlX21vZHVsZXMvc2hlZXQtcm91dGVyL25vZGVfbW9kdWxlcy9zbGljZWQvaW5kZXguanMiLCJub2RlX21vZHVsZXMvY2hvby9ub2RlX21vZHVsZXMvc2hlZXQtcm91dGVyL25vZGVfbW9kdWxlcy93YXlmYXJlci9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9jaG9vL25vZGVfbW9kdWxlcy9zaGVldC1yb3V0ZXIvbm9kZV9tb2R1bGVzL3dheWZhcmVyL3RyaWUuanMiLCJub2RlX21vZHVsZXMvY2hvby9ub2RlX21vZHVsZXMveHRlbmQvaW1tdXRhYmxlLmpzIiwibm9kZV9tb2R1bGVzL2Nob28vbm9kZV9tb2R1bGVzL3h0ZW5kL211dGFibGUuanMiLCJub2RlX21vZHVsZXMvY2hvby9ub2RlX21vZHVsZXMveW8teW8vaW5kZXguanMiLCJub2RlX21vZHVsZXMvY2hvby9ub2RlX21vZHVsZXMveW8teW8vbm9kZV9tb2R1bGVzL2JlbC9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9jaG9vL25vZGVfbW9kdWxlcy95by15by9ub2RlX21vZHVsZXMvYmVsL25vZGVfbW9kdWxlcy9oeXBlcngvaW5kZXguanMiLCJub2RlX21vZHVsZXMvY2hvby9ub2RlX21vZHVsZXMveW8teW8vbm9kZV9tb2R1bGVzL2JlbC9ub2RlX21vZHVsZXMvaHlwZXJ4L25vZGVfbW9kdWxlcy9oeXBlcnNjcmlwdC1hdHRyaWJ1dGUtdG8tcHJvcGVydHkvaW5kZXguanMiLCJub2RlX21vZHVsZXMvY2hvby9ub2RlX21vZHVsZXMveW8teW8vbm9kZV9tb2R1bGVzL21vcnBoZG9tL2xpYi9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9jaG9vL25vZGVfbW9kdWxlcy95by15by91cGRhdGUtZXZlbnRzLmpzIiwibm9kZV9tb2R1bGVzL2phdmFzY3JpcHQtbmF0dXJhbC1zb3J0L25hdHVyYWxTb3J0LmpzIiwibm9kZV9tb2R1bGVzL29uLWxvYWQvaW5kZXguanMiLCJub2RlX21vZHVsZXMvb24tbG9hZC9ub2RlX21vZHVsZXMvZ2xvYmFsL2RvY3VtZW50LmpzIiwibm9kZV9tb2R1bGVzL29uLWxvYWQvbm9kZV9tb2R1bGVzL2dsb2JhbC93aW5kb3cuanMiLCJzdG9yZXMuanNvbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7O2tCQ0l3QixtQjs7QUFKeEI7Ozs7Ozs7O0lBRWMsSSxrQkFBTixJO0FBRU8sU0FBUyxtQkFBVCxDQUE2QixNQUE3QixFQUFxQyxLQUFyQyxFQUE0QyxJQUE1QyxFQUFrRDtBQUMvRCxNQUFJLE9BQU8sSUFBUCxpQkFBSjs7QUFLQSxTQUFPLElBQVA7QUFDRDs7Ozs7Ozs7Ozs7a0JDRXVCLE87O0FBYnhCOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7SUFFYyxJLGtCQUFOLEk7O0FBQ1IsSUFBSSxTQUFTLFNBQVMsYUFBVCxDQUF1QixLQUF2QixDQUFiO0FBQ0EsT0FBTyxTQUFQLENBQWlCLEdBQWpCLENBQXFCLGVBQXJCO0FBQ0EsSUFBSSxNQUFNLElBQUksT0FBTyxJQUFQLENBQVksR0FBaEIsQ0FBb0IsTUFBcEIsRUFBNEI7QUFDcEMsVUFBUSxFQUFFLEtBQUssaUJBQVAsRUFBMEIsS0FBSyxDQUFDLGlCQUFoQyxFQUQ0QjtBQUVwQyxRQUFNLENBRjhCO0FBR3BDO0FBSG9DLENBQTVCLENBQVY7O0FBTWUsU0FBUyxPQUFULENBQWlCLE1BQWpCLEVBQXlCLEtBQXpCLEVBQWdDLElBQWhDLEVBQXNDO0FBQ25ELE1BQUksT0FBTyxJQUFQLGlCQUFKOzs7QUFNRSxVQUFRLElBQVIsRUFBYyxLQUFkLEVBQXFCLElBQXJCOzs7QUFHRixTQUFPLElBQVA7QUFDRDs7QUFFRCxTQUFTLE9BQVQsQ0FBaUIsSUFBakIsRUFBdUIsS0FBdkIsRUFBOEIsSUFBOUIsRUFBb0M7QUFDbEMsTUFBSSxTQUFTLE1BQU0sTUFBTixDQUFhLGFBQTFCO0FBQ0EsT0FBSyxXQUFMLENBQWlCLE1BQWpCOztBQUVBLFNBQU8sT0FBUCxDQUFlLGlCQUFTO0FBQ3RCLFFBQUksQ0FBQyxNQUFNLE1BQVgsRUFBbUI7QUFDakIsWUFBTSxNQUFOLEdBQWUsSUFBSSxPQUFPLElBQVAsQ0FBWSxNQUFoQixDQUF1QjtBQUNwQyxrQkFBVSxFQUFFLEtBQUssTUFBTSxHQUFiLEVBQWtCLEtBQUssTUFBTSxHQUE3QixFQUQwQjtBQUVwQyxlQUFPLE1BQU0sSUFGdUI7QUFHcEMsZUFBTztBQUg2QixPQUF2QixDQUFmO0FBS0EsWUFBTSxNQUFOLENBQWEsV0FBYixDQUF5QixPQUF6QixFQUFrQztBQUFBLGVBQU0sS0FBSyxlQUFMLEVBQXNCLEVBQUUsU0FBUyxLQUFYLEVBQXRCLENBQU47QUFBQSxPQUFsQztBQUNEO0FBQ0YsR0FURDs7QUFXQSxTQUFPLE9BQVAsQ0FBZTtBQUFBLFdBQVMsTUFBTSxNQUFOLENBQWEsTUFBYixDQUFvQixHQUFwQixDQUFUO0FBQUEsR0FBZjtBQUNBLGFBQVcsWUFBTTtBQUNmLFdBQU8sSUFBUCxDQUFZLEtBQVosQ0FBa0IsT0FBbEIsQ0FBMEIsR0FBMUIsRUFBK0IsUUFBL0I7QUFDRCxHQUZELEVBRUcsR0FGSDtBQUdBLFFBQU0sTUFBTixDQUFhLEdBQWIsR0FBbUIsR0FBbkI7QUFDRDs7Ozs7Ozs7Ozs7O2tCQ3pDdUIsVzs7QUFMeEI7Ozs7QUFDQTs7Ozs7Ozs7SUFFYyxJLGtCQUFOLEk7QUFFTyxTQUFTLFdBQVQsQ0FBcUIsTUFBckIsRUFBNkIsS0FBN0IsRUFBb0MsSUFBcEMsRUFBMEM7QUFDdkQsTUFBSSxZQUFZLE1BQU0sTUFBTixDQUFhLGFBQTdCOztBQUVBLE1BQUksT0FBTyxJQUFQLGtCQUVFLDRCQUFhLE1BQWIsRUFBcUIsS0FBckIsRUFBNEIsSUFBNUIsQ0FGRixFQUdrQjtBQUFBLFdBQU0sS0FBSyxnQkFBTCxDQUFOO0FBQUEsR0FIbEIsRUFJa0I7QUFBQSxXQUFNLEtBQUssb0JBQUwsQ0FBTjtBQUFBLEdBSmxCLEVBT0ksVUFBVSxHQUFWLENBQWMsZ0JBQVE7QUFDcEIsV0FBTyxJQUFQLG1CQUVpQjtBQUFBLGFBQU0sS0FBSyxlQUFMLEVBQXNCLEVBQUUsU0FBUyxJQUFYLEVBQXRCLENBQU47QUFBQSxLQUZqQixFQUdRLEtBQUssSUFIYixFQUdvQixLQUFLLFFBQUwsR0FBZ0IsT0FBTyxLQUFLLFFBQVosR0FBdUIsSUFBdkMsR0FBOEMsRUFIbEU7QUFPRCxHQVJELENBUEosQ0FBSjs7QUFxQkEsU0FBTyxJQUFQO0FBQ0Q7Ozs7Ozs7Ozs7O2tCQzFCdUIsZ0I7O0FBSnhCOzs7Ozs7OztJQUVjLEksa0JBQU4sSTtBQUVPLFNBQVMsZ0JBQVQsQ0FBMEIsTUFBMUIsRUFBa0MsS0FBbEMsRUFBeUMsSUFBekMsRUFBK0M7QUFDNUQsTUFBSSxPQUFPLElBQVAsa0JBRUUsTUFBTSxNQUFOLENBQWEsUUFBYiw0QkFBK0MsTUFBTSxNQUFOLENBQWEsUUFBNUQsR0FBeUUsRUFGM0UsRUFLeUMsTUFBTSxNQUFOLENBQWEsUUFMdEQsRUFLMEUsVUFBQyxDQUFEO0FBQUEsV0FBTyxLQUFLLG9CQUFMLEVBQTJCLEVBQUUsVUFBVSxFQUFFLE1BQUYsQ0FBUyxLQUFyQixFQUEzQixDQUFQO0FBQUEsR0FMMUUsQ0FBSjs7QUFVQSxTQUFPLElBQVA7QUFDRDs7Ozs7OztBQ2hCRDs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7QUFFQSxJQUFNLE1BQU0scUJBQVo7SUFDUSxzQixHQUEyQixPQUFPLElBQVAsQ0FBWSxRQUFaLENBQXFCLFMsQ0FBaEQsc0I7O0FBQ1IsSUFBTSxLQUFLLElBQUksT0FBTyxJQUFQLENBQVksVUFBaEIsRUFBWDtBQUNBLElBQU0sV0FBVyxJQUFJLE9BQU8sSUFBUCxDQUFZLFFBQWhCLEVBQWpCO0FBQ0EsSUFBTSxhQUFhLElBQUksT0FBTyxJQUFQLENBQVksTUFBaEIsQ0FBdUI7QUFDeEMsYUFBVyxPQUFPLElBQVAsQ0FBWSxTQUFaLENBQXNCLElBRE87QUFFeEMsUUFBTTtBQUNKLFVBQU0sT0FBTyxJQUFQLENBQVksVUFBWixDQUF1QixNQUR6QjtBQUVKLGlCQUFhLFNBRlQ7QUFHSixXQUFPO0FBSEg7QUFGa0MsQ0FBdkIsQ0FBbkI7QUFRQSxJQUFJLFdBQVcsS0FBZjs7QUFFQSxJQUFJLEtBQUosQ0FBVTtBQUNSLGFBQVcsUUFESDtBQUVSLFNBQU87QUFDTCxtQkFBZSxpQkFBTyxJQUFQLENBQVksVUFBQyxDQUFELEVBQUksQ0FBSjtBQUFBLGFBQVUscUNBQVksRUFBRSxJQUFkLEVBQW9CLEVBQUUsSUFBdEIsQ0FBVjtBQUFBLEtBQVosQ0FEVjtBQUVMLGtCQUFjLEVBQUUsS0FBSyxpQkFBUCxFQUEwQixLQUFLLENBQUMsaUJBQWhDLEVBRlQ7QUFHTCxjQUFVLEVBSEw7QUFJTCxjQUFVLEdBSkw7QUFLTCxnQkFBWTtBQUxQLEdBRkM7O0FBVVIsWUFBVTtBQUNSLFdBRFEsbUJBQ0EsTUFEQSxFQUNRLEtBRFIsRUFDZTtBQUNyQixZQUFNLGFBQU47QUFDQSxpQkFBVyxNQUFYLENBQWtCLElBQWxCO0FBQ0EsYUFBTyxLQUFQO0FBQ0QsS0FMTztBQU9SLGlCQVBRLHlCQU9NLE1BUE4sRUFPYyxLQVBkLEVBT3FCO0FBQzNCLFlBQU0sYUFBTixDQUFvQixPQUFwQixDQUE0QixpQkFBUztBQUNuQyxZQUFJLE1BQU0sTUFBVixFQUFrQjtBQUNoQixnQkFBTSxNQUFOLENBQWEsTUFBYixDQUFvQixJQUFwQjtBQUNEO0FBQ0YsT0FKRDtBQUtBLFlBQU0sYUFBTixHQUFzQixPQUFPLE9BQTdCO0FBQ0EsVUFBSSxPQUFPLFFBQVgsRUFBcUI7QUFDbkIsY0FBTSxZQUFOLEdBQXFCLE9BQU8sUUFBUCxDQUFnQixNQUFoQixFQUFyQjtBQUNEO0FBQ0QsYUFBTyxLQUFQO0FBQ0QsS0FsQk87QUFvQlIsa0JBcEJRLDBCQW9CTyxNQXBCUCxFQW9CZSxLQXBCZixFQW9Cc0I7QUFDNUIsWUFBTSxRQUFOLEdBQWlCLE9BQU8sUUFBeEI7QUFDQSxhQUFPLEtBQVA7QUFDRCxLQXZCTztBQXlCUixrQkF6QlEsMEJBeUJPLE1BekJQLEVBeUJlLEtBekJmLEVBeUJzQjtBQUM1QixZQUFNLFFBQU4sR0FBaUIsT0FBTyxPQUF4QjtBQUNBLGFBQU8sS0FBUDtBQUNEO0FBNUJPLEdBVkY7O0FBeUNSLFdBQVM7QUFDUCxVQURPLGtCQUNBLE1BREEsRUFDUSxLQURSLEVBQ2UsSUFEZixFQUNxQjtBQUMxQixVQUFJLFFBQVEsT0FBTyxPQUFuQjs7QUFFQSxTQUFHLFdBQUgsQ0FBZSxFQUFFLEtBQUssTUFBTSxHQUFiLEVBQWtCLEtBQUssTUFBTSxHQUE3QixFQUFmO0FBQ0EsU0FBRyxVQUFILFNBQW9CLE1BQU0sSUFBMUIsaUJBQTBDLE1BQU0sT0FBaEQ7QUFDQSxTQUFHLElBQUgsQ0FBUSxNQUFNLEdBQWQsRUFBbUIsTUFBTSxNQUF6QjtBQUNELEtBUE07QUFTUCxlQVRPLHVCQVNLLE1BVEwsRUFTYSxLQVRiLEVBU29CLElBVHBCLEVBUzBCO0FBQy9CLFVBQUksT0FBTyxRQUFYLEVBQXFCO0FBQ25CLGFBQUssdUJBQUwsRUFBOEIsRUFBRSxTQUFTLE9BQU8sUUFBbEIsRUFBOUI7QUFDQSxjQUFNLFFBQU4sR0FBaUIsT0FBTyxRQUF4QjtBQUNEOztBQUVELGdCQUFVLFdBQVYsQ0FBc0Isa0JBQXRCLENBQXlDLFVBQVMsUUFBVCxFQUFtQjtBQUMxRCxZQUFJLGVBQWUsSUFBSSxPQUFPLElBQVAsQ0FBWSxNQUFoQixDQUF1QixTQUFTLE1BQVQsQ0FBZ0IsUUFBdkMsRUFBaUQsU0FBUyxNQUFULENBQWdCLFNBQWpFLENBQW5CO0FBQ0EsWUFBSSxVQUFVLGlCQUFPLEdBQVAsQ0FBVyxpQkFBUztBQUNoQyxjQUFJLFdBQVcsdUJBQXVCLElBQUksT0FBTyxJQUFQLENBQVksTUFBaEIsQ0FBdUIsTUFBTSxHQUE3QixFQUFrQyxNQUFNLEdBQXhDLENBQXZCLEVBQXFFLFlBQXJFLENBQWY7O0FBRUEsZ0JBQU0sUUFBTixHQUFpQixLQUFLLElBQUwsQ0FBVSxXQUFXLFdBQXJCLENBQWpCO0FBQ0EsaUJBQU8sS0FBUDtBQUNELFNBTGEsRUFNWCxNQU5XLENBTUo7QUFBQSxpQkFBUyxNQUFNLFFBQU4sR0FBaUIsTUFBTSxRQUFoQztBQUFBLFNBTkksRUFPWCxJQVBXLENBT04sVUFBQyxDQUFELEVBQUksQ0FBSjtBQUFBLGlCQUFVLHFDQUFZLEVBQUUsUUFBZCxFQUF3QixFQUFFLFFBQTFCLENBQVY7QUFBQSxTQVBNLENBQWQ7O0FBU0EsWUFBSSxNQUFNLEdBQVYsRUFBZTtBQUNiLGdCQUFNLEdBQU4sQ0FBVSxLQUFWLENBQWdCLFlBQWhCO0FBQ0EsZ0JBQU0sR0FBTixDQUFVLE9BQVYsQ0FBa0IsRUFBbEI7QUFDQSxxQkFBVyxXQUFYLENBQXVCLFlBQXZCO0FBQ0EscUJBQVcsTUFBWCxDQUFrQixNQUFNLEdBQXhCO0FBQ0Q7O0FBRUQsYUFBSyxzQkFBTCxFQUE2QixFQUFFLFNBQVMsT0FBWCxFQUFvQixVQUFVLFlBQTlCLEVBQTdCO0FBQ0EsYUFBSyx3QkFBTDtBQUNELE9BcEJEO0FBcUJELEtBcENNO0FBc0NQLG1CQXRDTywyQkFzQ1MsTUF0Q1QsRUFzQ2lCLEtBdENqQixFQXNDd0IsSUF0Q3hCLEVBc0M4QjtBQUNuQyxlQUFTLE9BQVQsQ0FBaUIsRUFBRSxVQUFVLE1BQU0sWUFBbEIsRUFBakIsRUFBbUQsVUFBVSxPQUFWLEVBQW1CLE1BQW5CLEVBQTJCO0FBQzVFLFlBQUksV0FBVyxJQUFmLEVBQXFCO0FBQ25CLGVBQUssdUJBQUwsRUFBOEIsRUFBRSxVQUFVLFFBQVEsQ0FBUixFQUFXLGlCQUF2QixFQUE5QjtBQUNEO0FBQ0YsT0FKRDtBQUtEO0FBNUNNO0FBekNELENBQVY7O0FBMEZBLElBQU0sV0FBVyxTQUFYLFFBQVcsQ0FBQyxNQUFELEVBQVMsS0FBVCxFQUFnQixJQUFoQixFQUF5QjtBQUN4QyxNQUFJLENBQUMsUUFBTCxFQUFlO0FBQ2Isb0JBQU0sR0FBTixDQUFVLE1BQU0sTUFBTixDQUFhLGFBQXZCLEVBQXNDLFlBQXRDLEVBQW9ELFVBQVUsR0FBVixFQUFlLE9BQWYsRUFBd0I7QUFDMUUsVUFBSSxHQUFKLEVBQVM7QUFDUCxlQUFPLFFBQVEsSUFBUixDQUFhLEdBQWIsQ0FBUDtBQUNEO0FBQ0QsaUJBQVcsSUFBWDtBQUNBLFdBQUssc0JBQUwsRUFBNkIsRUFBRSxTQUFTLE9BQVgsRUFBN0I7QUFDRCxLQU5EO0FBT0Q7O0FBRUQsU0FBTyxlQUFLLElBQVosa0JBRU0seUJBQVUsTUFBVixFQUFrQixLQUFsQixFQUF5QixJQUF6QixDQUZOLEVBSVEsTUFBTSxNQUFOLENBQWEsVUFBYixHQUEwQiwrQkFBZ0IsTUFBaEIsRUFBd0IsS0FBeEIsRUFBK0IsSUFBL0IsQ0FBMUIsR0FBaUUsRUFKekUsRUFNTSx1QkFBUSxNQUFSLEVBQWdCLEtBQWhCLEVBQXVCLElBQXZCLENBTk47QUFTRCxDQXBCRDs7QUFzQkEsU0FBUyxZQUFULENBQXNCLEtBQXRCLEVBQTZCLEVBQTdCLEVBQWlDO0FBQy9CLGFBQVcsWUFBTTtBQUNmLGFBQVMsT0FBVCxDQUFpQixFQUFFLFNBQVMsTUFBTSxPQUFqQixFQUFqQixFQUE2QyxVQUFVLE9BQVYsRUFBbUIsTUFBbkIsRUFBMkI7QUFDdEUsU0FBRyxXQUFXLElBQVgsR0FBa0IsU0FBbEIsR0FBOEIsTUFBakMsRUFBeUMsV0FBVyxRQUFRLE1BQW5CLEdBQTRCLFFBQVEsQ0FBUixFQUFXLFFBQVgsQ0FBb0IsUUFBaEQsR0FBMkQsU0FBcEc7QUFDRCxLQUZEO0FBR0QsR0FKRCxFQUlHLEVBSkg7QUFLRDs7QUFHRCxJQUFJLE1BQUosQ0FBVyxVQUFDLEtBQUQsRUFBVztBQUNwQixTQUFPLENBQ0wsTUFBTSxHQUFOLEVBQVcsUUFBWCxDQURLLENBQVA7QUFHRCxDQUpEOztBQU1BLElBQU0sT0FBTyxJQUFJLEtBQUosRUFBYjs7QUFFQSxTQUFTLElBQVQsQ0FBYyxXQUFkLENBQTBCLElBQTFCOzs7QUN2SkE7QUFDQTs7O0FDREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUN0cU5BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2V0E7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQzFrQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQy9QQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDM0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2UUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVqQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUMvRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FDZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IGNob28gZnJvbSAnY2hvbyc7XG5cbmNvbnN0IHsgdmlldzogaHRtbCB9ID0gY2hvbztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZGlyZWN0aW9uc1BhbmVsVmlldyhwYXJhbXMsIHN0YXRlLCBzZW5kKSB7XG4gIGxldCB0cmVlID0gaHRtbGBcbiAgICA8ZGlyZWN0aW9ucy1wYW5lbD5cbiAgICA8L2RpcmVjdGlvbnMtcGFuZWw+XG4gIGA7XG5cbiAgcmV0dXJuIHRyZWU7XG59XG4iLCJpbXBvcnQgY2hvbyBmcm9tICdjaG9vJztcbmltcG9ydCBvbmxvYWQgZnJvbSAnb24tbG9hZCc7XG5pbXBvcnQgc3R5bGVzIGZyb20gJy4uL21hcC1zdHlsZXMuanNvbic7XG5cbmNvbnN0IHsgdmlldzogaHRtbCB9ID0gY2hvbztcbmxldCBtYXBEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbm1hcERpdi5jbGFzc0xpc3QuYWRkKCdtYXAtY29udGFpbmVyJyk7XG5sZXQgbWFwID0gbmV3IGdvb2dsZS5tYXBzLk1hcChtYXBEaXYsIHtcbiAgY2VudGVyOiB7IGxhdDogNDIuMzMwMTIzNTQ2MzQxOTksIGxuZzogLTcwLjk1NjIzMDE2MzU3NDIyIH0sXG4gIHpvb206IDUsXG4gIHN0eWxlc1xufSk7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG1hcFZpZXcocGFyYW1zLCBzdGF0ZSwgc2VuZCkge1xuICBsZXQgdHJlZSA9IGh0bWxgXG4gICAgPGdvb2dsZS1tYXA+XG4gICAgPC9nb29nbGUtbWFwPlxuICBgO1xuXG4gIC8vb25sb2FkKHRyZWUsICgpID0+IHtcbiAgICBsb2FkTWFwKHRyZWUsIHN0YXRlLCBzZW5kKTtcbiAgLy99KTtcblxuICByZXR1cm4gdHJlZTtcbn1cblxuZnVuY3Rpb24gbG9hZE1hcCh0cmVlLCBzdGF0ZSwgc2VuZCkge1xuICBsZXQgc3RvcmVzID0gc3RhdGUuc3RvcmVzLnZpc2libGVTdG9yZXM7XG4gIHRyZWUuYXBwZW5kQ2hpbGQobWFwRGl2KTtcblxuICBzdG9yZXMuZm9yRWFjaChzdG9yZSA9PiB7XG4gICAgaWYgKCFzdG9yZS5tYXJrZXIpIHtcbiAgICAgIHN0b3JlLm1hcmtlciA9IG5ldyBnb29nbGUubWFwcy5NYXJrZXIoe1xuICAgICAgICBwb3NpdGlvbjogeyBsYXQ6IHN0b3JlLmxhdCwgbG5nOiBzdG9yZS5sbmcgfSxcbiAgICAgICAgdGl0bGU6IHN0b3JlLm5hbWUsXG4gICAgICAgIGxhYmVsOiAnUCdcbiAgICAgIH0pO1xuICAgICAgc3RvcmUubWFya2VyLmFkZExpc3RlbmVyKCdjbGljaycsICgpID0+IHNlbmQoJ3N0b3JlczpzZWxlY3QnLCB7IHBheWxvYWQ6IHN0b3JlIH0pKTtcbiAgICB9XG4gIH0pO1xuXG4gIHN0b3Jlcy5mb3JFYWNoKHN0b3JlID0+IHN0b3JlLm1hcmtlci5zZXRNYXAobWFwKSk7XG4gIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgIGdvb2dsZS5tYXBzLmV2ZW50LnRyaWdnZXIobWFwLCAncmVzaXplJyk7XG4gIH0sIDUwMCk7XG4gIHN0YXRlLnN0b3Jlcy5tYXAgPSBtYXA7XG59XG4iLCJpbXBvcnQgY2hvbyBmcm9tICdjaG9vJztcbmltcG9ydCBVc2VyTG9jYXRpb24gZnJvbSAnLi91c2VyLWxvY2F0aW9uJztcblxuY29uc3QgeyB2aWV3OiBodG1sIH0gPSBjaG9vO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzaWRlQmFyVmlldyhwYXJhbXMsIHN0YXRlLCBzZW5kKSB7XG4gIHZhciBhbGxTdG9yZXMgPSBzdGF0ZS5zdG9yZXMudmlzaWJsZVN0b3JlcztcblxuICBsZXQgdHJlZSA9IGh0bWxgXG4gICAgPHNpZGUtYmFyPlxuICAgICAgJHtVc2VyTG9jYXRpb24ocGFyYW1zLCBzdGF0ZSwgc2VuZCl9XG4gICAgICA8YnV0dG9uIG9uY2xpY2s9JHsoKSA9PiBzZW5kKCdzdG9yZXM6c2hvd0FsbCcpfT5BbGwgTG9jYXRpb25zPC9idXR0b24+XG4gICAgICA8YnV0dG9uIG9uY2xpY2s9JHsoKSA9PiBzZW5kKCdzdG9yZXM6c2hvd0Nsb3Nlc3QnKX0+Q2xvc2VzdCBMb2NhdGlvbnM8L2J1dHRvbj5cbiAgICAgIDx1bD5cbiAgICAgICAgJHtcbiAgICAgICAgICBhbGxTdG9yZXMubWFwKGl0ZW0gPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGh0bWxgXG4gICAgICAgICAgICAgIDxsaT5cbiAgICAgICAgICAgICAgICA8YSBvbmNsaWNrPSR7KCkgPT4gc2VuZCgnc3RvcmVzOnNlbGVjdCcsIHsgcGF5bG9hZDogaXRlbSB9KX0+XG4gICAgICAgICAgICAgICAgICAke2l0ZW0ubmFtZX0ke2l0ZW0uZGlzdGFuY2UgPyAnOiAnICsgaXRlbS5kaXN0YW5jZSArICdtaScgOiAnJ31cbiAgICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICBgO1xuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIDwvdWw+XG4gICAgPC9zaWRlLWJhcj5cbiAgYDtcblxuICByZXR1cm4gdHJlZTtcbn1cbiIsImltcG9ydCBjaG9vIGZyb20gJ2Nob28nO1xuXG5jb25zdCB7IHZpZXc6IGh0bWwgfSA9IGNob287XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHVzZXJMb2NhdGlvblZpZXcocGFyYW1zLCBzdGF0ZSwgc2VuZCkge1xuICBsZXQgdHJlZSA9IGh0bWxgXG4gICAgPHA+XG4gICAgICAke3N0YXRlLnN0b3Jlcy5sb2NhdGlvbiA/IGBZb3UgYXJlIGxvY2F0ZWQgYXQ6ICR7c3RhdGUuc3RvcmVzLmxvY2F0aW9ufWAgOiAnJ31cbiAgICAgIDxicj5cbiAgICAgIDxsYWJlbD5cbiAgICAgICAgRGlzdGFuY2U6IDxpbnB1dCB0eXBlPVwibnVtYmVyXCIgdmFsdWU9JHtzdGF0ZS5zdG9yZXMuZGlzdGFuY2V9IG9uaW5wdXQ9JHsoZSkgPT4gc2VuZCgnc3RvcmVzOnNob3dDbG9zZXN0JywgeyBkaXN0YW5jZTogZS50YXJnZXQudmFsdWUgfSl9IHBsYWNlaG9sZGVyPVwiZGlzdGFuY2UgKG1pbGVzKVwiPlxuICAgICAgPC9sYWJlbD5cbiAgICA8L3A+XG4gIGA7XG5cbiAgcmV0dXJuIHRyZWU7XG59XG4iLCJpbXBvcnQgY2hvbyBmcm9tICdjaG9vJztcbmltcG9ydCBuYXR1cmFsU29ydCBmcm9tICdqYXZhc2NyaXB0LW5hdHVyYWwtc29ydCc7XG5pbXBvcnQgYXN5bmMgZnJvbSAnYXN5bmMnO1xuaW1wb3J0IHN0b3JlcyBmcm9tICcuL3N0b3Jlcyc7XG5pbXBvcnQgR29vZ2xlTWFwIGZyb20gJy4vY29tcG9uZW50cy9nb29nbGUtbWFwJztcbmltcG9ydCBTaWRlQmFyIGZyb20gJy4vY29tcG9uZW50cy9zaWRlLWJhcic7XG5pbXBvcnQgRGlyZWN0aW9uc1BhbmVsIGZyb20gJy4vY29tcG9uZW50cy9kaXJlY3Rpb25zLXBhbmVsJztcblxuY29uc3QgYXBwID0gY2hvbygpO1xuY29uc3QgeyBjb21wdXRlRGlzdGFuY2VCZXR3ZWVuIH0gPSBnb29nbGUubWFwcy5nZW9tZXRyeS5zcGhlcmljYWw7XG5jb25zdCBpdyA9IG5ldyBnb29nbGUubWFwcy5JbmZvV2luZG93KCk7XG5jb25zdCBnZW9jb2RlciA9IG5ldyBnb29nbGUubWFwcy5HZW9jb2RlcigpO1xuY29uc3QgdXNlck1hcmtlciA9IG5ldyBnb29nbGUubWFwcy5NYXJrZXIoe1xuICBhbmltYXRpb246IGdvb2dsZS5tYXBzLkFuaW1hdGlvbi5EUk9QLFxuICBpY29uOiB7XG4gICAgcGF0aDogZ29vZ2xlLm1hcHMuU3ltYm9sUGF0aC5DSVJDTEUsXG4gICAgc3Ryb2tlQ29sb3I6ICcjNDI4NWY0JyxcbiAgICBzY2FsZTogNVxuICB9XG59KTtcbnZhciBnZW9jb2RlZCA9IGZhbHNlO1xuXG5hcHAubW9kZWwoe1xuICBuYW1lc3BhY2U6ICdzdG9yZXMnLFxuICBzdGF0ZToge1xuICAgIHZpc2libGVTdG9yZXM6IHN0b3Jlcy5zb3J0KChhLCBiKSA9PiBuYXR1cmFsU29ydChhLm5hbWUsIGIubmFtZSkpLFxuICAgIHVzZXJMb2NhdGlvbjogeyBsYXQ6IDQyLjMzMDEyMzU0NjM0MTk5LCBsbmc6IC03MC45NTYyMzAxNjM1NzQyMiB9LFxuICAgIGxvY2F0aW9uOiAnJyxcbiAgICBkaXN0YW5jZTogMTAwLFxuICAgIGRpcmVjdGlvbnM6IGZhbHNlXG4gIH0sXG5cbiAgcmVkdWNlcnM6IHtcbiAgICBzaG93QWxsKGFjdGlvbiwgc3RhdGUpIHtcbiAgICAgIHN0YXRlLnZpc2libGVTdG9yZXMgPSBzdG9yZXM7XG4gICAgICB1c2VyTWFya2VyLnNldE1hcChudWxsKTtcbiAgICAgIHJldHVybiBzdGF0ZTtcbiAgICB9LFxuXG4gICAgdXBkYXRlVmlzaWJsZShhY3Rpb24sIHN0YXRlKSB7XG4gICAgICBzdGF0ZS52aXNpYmxlU3RvcmVzLmZvckVhY2goc3RvcmUgPT4ge1xuICAgICAgICBpZiAoc3RvcmUubWFya2VyKSB7XG4gICAgICAgICAgc3RvcmUubWFya2VyLnNldE1hcChudWxsKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBzdGF0ZS52aXNpYmxlU3RvcmVzID0gYWN0aW9uLnBheWxvYWQ7XG4gICAgICBpZiAoYWN0aW9uLmxvY2F0aW9uKSB7XG4gICAgICAgIHN0YXRlLnVzZXJMb2NhdGlvbiA9IGFjdGlvbi5sb2NhdGlvbi50b0pTT04oKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBzdGF0ZTtcbiAgICB9LFxuXG4gICAgdXBkYXRlTG9jYXRpb24oYWN0aW9uLCBzdGF0ZSkge1xuICAgICAgc3RhdGUubG9jYXRpb24gPSBhY3Rpb24ubG9jYXRpb247XG4gICAgICByZXR1cm4gc3RhdGU7XG4gICAgfSxcblxuICAgIHVwZGF0ZURpc3RhbmNlKGFjdGlvbiwgc3RhdGUpIHtcbiAgICAgIHN0YXRlLmRpc3RhbmNlID0gYWN0aW9uLnBheWxvYWQ7XG4gICAgICByZXR1cm4gc3RhdGU7XG4gICAgfVxuICB9LFxuXG4gIGVmZmVjdHM6IHtcbiAgICBzZWxlY3QoYWN0aW9uLCBzdGF0ZSwgc2VuZCkge1xuICAgICAgdmFyIHN0b3JlID0gYWN0aW9uLnBheWxvYWQ7XG5cbiAgICAgIGl3LnNldFBvc2l0aW9uKHsgbGF0OiBzdG9yZS5sYXQsIGxuZzogc3RvcmUubG5nIH0pO1xuICAgICAgaXcuc2V0Q29udGVudChgPGI+JHtzdG9yZS5uYW1lfTwvYj48YnIvPiR7c3RvcmUuYWRkcmVzc31gKTtcbiAgICAgIGl3Lm9wZW4oc3RhdGUubWFwLCBzdG9yZS5tYXJrZXIpO1xuICAgIH0sXG5cbiAgICBzaG93Q2xvc2VzdChhY3Rpb24sIHN0YXRlLCBzZW5kKSB7XG4gICAgICBpZiAoYWN0aW9uLmRpc3RhbmNlKSB7XG4gICAgICAgIHNlbmQoJ3N0b3Jlczp1cGRhdGVEaXN0YW5jZScsIHsgcGF5bG9hZDogYWN0aW9uLmRpc3RhbmNlIH0pO1xuICAgICAgICBzdGF0ZS5kaXN0YW5jZSA9IGFjdGlvbi5kaXN0YW5jZTtcbiAgICAgIH1cblxuICAgICAgbmF2aWdhdG9yLmdlb2xvY2F0aW9uLmdldEN1cnJlbnRQb3NpdGlvbihmdW5jdGlvbihwb3NpdGlvbikge1xuICAgICAgICB2YXIgdXNlckxvY2F0aW9uID0gbmV3IGdvb2dsZS5tYXBzLkxhdExuZyhwb3NpdGlvbi5jb29yZHMubGF0aXR1ZGUsIHBvc2l0aW9uLmNvb3Jkcy5sb25naXR1ZGUpO1xuICAgICAgICB2YXIgY2xvc2VzdCA9IHN0b3Jlcy5tYXAoc3RvcmUgPT4ge1xuICAgICAgICAgIGxldCBkaXN0YW5jZSA9IGNvbXB1dGVEaXN0YW5jZUJldHdlZW4obmV3IGdvb2dsZS5tYXBzLkxhdExuZyhzdG9yZS5sYXQsIHN0b3JlLmxuZyksIHVzZXJMb2NhdGlvbik7XG4gICAgICAgICAgLy8gY29udmVydCBtZXRlcnMgdG8gbWlsZXMsIHJvdW5kZWQgdXBcbiAgICAgICAgICBzdG9yZS5kaXN0YW5jZSA9IE1hdGguY2VpbChkaXN0YW5jZSAqIDAuMDAwNjIxMzcxKTtcbiAgICAgICAgICByZXR1cm4gc3RvcmU7XG4gICAgICAgIH0pXG4gICAgICAgICAgLmZpbHRlcihzdG9yZSA9PiBzdG9yZS5kaXN0YW5jZSA8IHN0YXRlLmRpc3RhbmNlKVxuICAgICAgICAgIC5zb3J0KChhLCBiKSA9PiBuYXR1cmFsU29ydChhLmRpc3RhbmNlLCBiLmRpc3RhbmNlKSk7XG5cbiAgICAgICAgaWYgKHN0YXRlLm1hcCkge1xuICAgICAgICAgIHN0YXRlLm1hcC5wYW5Ubyh1c2VyTG9jYXRpb24pO1xuICAgICAgICAgIHN0YXRlLm1hcC5zZXRab29tKDEwKTtcbiAgICAgICAgICB1c2VyTWFya2VyLnNldFBvc2l0aW9uKHVzZXJMb2NhdGlvbik7XG4gICAgICAgICAgdXNlck1hcmtlci5zZXRNYXAoc3RhdGUubWFwKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHNlbmQoJ3N0b3Jlczp1cGRhdGVWaXNpYmxlJywgeyBwYXlsb2FkOiBjbG9zZXN0LCBsb2NhdGlvbjogdXNlckxvY2F0aW9uIH0pO1xuICAgICAgICBzZW5kKCdzdG9yZXM6Z2VvY29kZUxvY2F0aW9uJyk7XG4gICAgICB9KTtcbiAgICB9LFxuXG4gICAgZ2VvY29kZUxvY2F0aW9uKGFjdGlvbiwgc3RhdGUsIHNlbmQpIHtcbiAgICAgIGdlb2NvZGVyLmdlb2NvZGUoeyBsb2NhdGlvbjogc3RhdGUudXNlckxvY2F0aW9uIH0sIGZ1bmN0aW9uIChyZXN1bHRzLCBzdGF0dXMpIHtcbiAgICAgICAgaWYgKHN0YXR1cyA9PT0gJ09LJykge1xuICAgICAgICAgIHNlbmQoJ3N0b3Jlczp1cGRhdGVMb2NhdGlvbicsIHsgbG9jYXRpb246IHJlc3VsdHNbMF0uZm9ybWF0dGVkX2FkZHJlc3MgfSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxufSk7XG5cblxuY29uc3QgbWFpblZpZXcgPSAocGFyYW1zLCBzdGF0ZSwgc2VuZCkgPT4ge1xuICBpZiAoIWdlb2NvZGVkKSB7XG4gICAgYXN5bmMubWFwKHN0YXRlLnN0b3Jlcy52aXNpYmxlU3RvcmVzLCBnZW9jb2RlU3RvcmUsIGZ1bmN0aW9uIChlcnIsIHJlc3VsdHMpIHtcbiAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgcmV0dXJuIGNvbnNvbGUud2FybihlcnIpO1xuICAgICAgfVxuICAgICAgZ2VvY29kZWQgPSB0cnVlO1xuICAgICAgc2VuZCgnc3RvcmVzOnVwZGF0ZVZpc2libGUnLCB7IHBheWxvYWQ6IHJlc3VsdHMgfSk7XG4gICAgfSk7XG4gIH1cblxuICByZXR1cm4gY2hvby52aWV3YFxuICAgIDxtYWluIGNsYXNzPVwiYXBwXCI+XG4gICAgICAke0dvb2dsZU1hcChwYXJhbXMsIHN0YXRlLCBzZW5kKX1cbiAgICAgICR7XG4gICAgICAgICAgc3RhdGUuc3RvcmVzLmRpcmVjdGlvbnMgPyBEaXJlY3Rpb25zUGFuZWwocGFyYW1zLCBzdGF0ZSwgc2VuZCkgOiAnJ1xuICAgICAgfVxuICAgICAgJHtTaWRlQmFyKHBhcmFtcywgc3RhdGUsIHNlbmQpfVxuICAgIDwvbWFpbj5cbiAgYDtcbn07XG5cbmZ1bmN0aW9uIGdlb2NvZGVTdG9yZShzdG9yZSwgY2IpIHtcbiAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgZ2VvY29kZXIuZ2VvY29kZSh7IGFkZHJlc3M6IHN0b3JlLmFkZHJlc3MgfSwgZnVuY3Rpb24gKHJlc3VsdHMsIHN0YXR1cykge1xuICAgICAgY2Ioc3RhdHVzID09PSAnT0snID8gdW5kZWZpbmVkIDogc3RhdHVzLCByZXN1bHRzICYmIHJlc3VsdHMubGVuZ3RoID8gcmVzdWx0c1swXS5nZW9tZXRyeS5sb2NhdGlvbiA6IHVuZGVmaW5lZCk7XG4gICAgfSk7XG4gIH0sIDUwKTtcbn1cblxuXG5hcHAucm91dGVyKChyb3V0ZSkgPT4ge1xuICByZXR1cm4gW1xuICAgIHJvdXRlKCcvJywgbWFpblZpZXcpXG4gIF07XG59KTtcblxuY29uc3QgdHJlZSA9IGFwcC5zdGFydCgpO1xuXG5kb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRyZWUpO1xuIiwibW9kdWxlLmV4cG9ydHM9W3tcImZlYXR1cmVUeXBlXCI6XCJhbGxcIixcImVsZW1lbnRUeXBlXCI6XCJsYWJlbHMudGV4dC5maWxsXCIsXCJzdHlsZXJzXCI6W3tcInNhdHVyYXRpb25cIjozNn0se1wiY29sb3JcIjpcIiMwMDAwMDBcIn0se1wibGlnaHRuZXNzXCI6NDB9XX0se1wiZmVhdHVyZVR5cGVcIjpcImFsbFwiLFwiZWxlbWVudFR5cGVcIjpcImxhYmVscy50ZXh0LnN0cm9rZVwiLFwic3R5bGVyc1wiOlt7XCJ2aXNpYmlsaXR5XCI6XCJvblwifSx7XCJjb2xvclwiOlwiIzAwMDAwMFwifSx7XCJsaWdodG5lc3NcIjoxNn1dfSx7XCJmZWF0dXJlVHlwZVwiOlwiYWxsXCIsXCJlbGVtZW50VHlwZVwiOlwibGFiZWxzLmljb25cIixcInN0eWxlcnNcIjpbe1widmlzaWJpbGl0eVwiOlwib2ZmXCJ9XX0se1wiZmVhdHVyZVR5cGVcIjpcImFkbWluaXN0cmF0aXZlXCIsXCJlbGVtZW50VHlwZVwiOlwiZ2VvbWV0cnkuZmlsbFwiLFwic3R5bGVyc1wiOlt7XCJjb2xvclwiOlwiIzAwMDAwMFwifSx7XCJsaWdodG5lc3NcIjoyMH1dfSx7XCJmZWF0dXJlVHlwZVwiOlwiYWRtaW5pc3RyYXRpdmVcIixcImVsZW1lbnRUeXBlXCI6XCJnZW9tZXRyeS5zdHJva2VcIixcInN0eWxlcnNcIjpbe1wiY29sb3JcIjpcIiMwMDAwMDBcIn0se1wibGlnaHRuZXNzXCI6MTd9LHtcIndlaWdodFwiOjEuMn1dfSx7XCJmZWF0dXJlVHlwZVwiOlwiYWRtaW5pc3RyYXRpdmUubG9jYWxpdHlcIixcImVsZW1lbnRUeXBlXCI6XCJsYWJlbHMudGV4dC5maWxsXCIsXCJzdHlsZXJzXCI6W3tcImNvbG9yXCI6XCIjZmZmZmZmXCJ9XX0se1wiZmVhdHVyZVR5cGVcIjpcImxhbmRzY2FwZVwiLFwiZWxlbWVudFR5cGVcIjpcImdlb21ldHJ5XCIsXCJzdHlsZXJzXCI6W3tcImNvbG9yXCI6XCIjMDAwMDAwXCJ9LHtcImxpZ2h0bmVzc1wiOjIwfV19LHtcImZlYXR1cmVUeXBlXCI6XCJwb2lcIixcImVsZW1lbnRUeXBlXCI6XCJnZW9tZXRyeVwiLFwic3R5bGVyc1wiOlt7XCJjb2xvclwiOlwiIzAwMDAwMFwifSx7XCJsaWdodG5lc3NcIjoyMX1dfSx7XCJmZWF0dXJlVHlwZVwiOlwicm9hZC5oaWdod2F5XCIsXCJlbGVtZW50VHlwZVwiOlwiZ2VvbWV0cnkuZmlsbFwiLFwic3R5bGVyc1wiOlt7XCJjb2xvclwiOlwiIzAwMDAwMFwifSx7XCJsaWdodG5lc3NcIjoxN31dfSx7XCJmZWF0dXJlVHlwZVwiOlwicm9hZC5oaWdod2F5XCIsXCJlbGVtZW50VHlwZVwiOlwiZ2VvbWV0cnkuc3Ryb2tlXCIsXCJzdHlsZXJzXCI6W3tcImNvbG9yXCI6XCIjMDAwMDAwXCJ9LHtcImxpZ2h0bmVzc1wiOjI5fSx7XCJ3ZWlnaHRcIjowLjJ9XX0se1wiZmVhdHVyZVR5cGVcIjpcInJvYWQuYXJ0ZXJpYWxcIixcImVsZW1lbnRUeXBlXCI6XCJnZW9tZXRyeVwiLFwic3R5bGVyc1wiOlt7XCJjb2xvclwiOlwiIzAwMDAwMFwifSx7XCJsaWdodG5lc3NcIjoxOH1dfSx7XCJmZWF0dXJlVHlwZVwiOlwicm9hZC5sb2NhbFwiLFwiZWxlbWVudFR5cGVcIjpcImdlb21ldHJ5XCIsXCJzdHlsZXJzXCI6W3tcImNvbG9yXCI6XCIjMDAwMDAwXCJ9LHtcImxpZ2h0bmVzc1wiOjE2fV19LHtcImZlYXR1cmVUeXBlXCI6XCJ0cmFuc2l0XCIsXCJlbGVtZW50VHlwZVwiOlwiZ2VvbWV0cnlcIixcInN0eWxlcnNcIjpbe1wiY29sb3JcIjpcIiMwMDAwMDBcIn0se1wibGlnaHRuZXNzXCI6MTl9XX0se1wiZmVhdHVyZVR5cGVcIjpcIndhdGVyXCIsXCJlbGVtZW50VHlwZVwiOlwiZ2VvbWV0cnlcIixcInN0eWxlcnNcIjpbe1wiY29sb3JcIjpcIiMwMDAwMDBcIn0se1wibGlnaHRuZXNzXCI6MTd9XX1dXG4iLCIoZnVuY3Rpb24gKGdsb2JhbCwgZmFjdG9yeSkge1xuICAgIHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyA/IGZhY3RvcnkoZXhwb3J0cykgOlxuICAgIHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCA/IGRlZmluZShbJ2V4cG9ydHMnXSwgZmFjdG9yeSkgOlxuICAgIChmYWN0b3J5KChnbG9iYWwuYXN5bmMgPSBnbG9iYWwuYXN5bmMgfHwge30pKSk7XG59KHRoaXMsIGZ1bmN0aW9uIChleHBvcnRzKSB7ICd1c2Ugc3RyaWN0JztcblxuICAgIC8qKlxuICAgICAqIEEgZmFzdGVyIGFsdGVybmF0aXZlIHRvIGBGdW5jdGlvbiNhcHBseWAsIHRoaXMgZnVuY3Rpb24gaW52b2tlcyBgZnVuY2BcbiAgICAgKiB3aXRoIHRoZSBgdGhpc2AgYmluZGluZyBvZiBgdGhpc0FyZ2AgYW5kIHRoZSBhcmd1bWVudHMgb2YgYGFyZ3NgLlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBpbnZva2UuXG4gICAgICogQHBhcmFtIHsqfSB0aGlzQXJnIFRoZSBgdGhpc2AgYmluZGluZyBvZiBgZnVuY2AuXG4gICAgICogQHBhcmFtIHtBcnJheX0gYXJncyBUaGUgYXJndW1lbnRzIHRvIGludm9rZSBgZnVuY2Agd2l0aC5cbiAgICAgKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgcmVzdWx0IG9mIGBmdW5jYC5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBhcHBseShmdW5jLCB0aGlzQXJnLCBhcmdzKSB7XG4gICAgICB2YXIgbGVuZ3RoID0gYXJncy5sZW5ndGg7XG4gICAgICBzd2l0Y2ggKGxlbmd0aCkge1xuICAgICAgICBjYXNlIDA6IHJldHVybiBmdW5jLmNhbGwodGhpc0FyZyk7XG4gICAgICAgIGNhc2UgMTogcmV0dXJuIGZ1bmMuY2FsbCh0aGlzQXJnLCBhcmdzWzBdKTtcbiAgICAgICAgY2FzZSAyOiByZXR1cm4gZnVuYy5jYWxsKHRoaXNBcmcsIGFyZ3NbMF0sIGFyZ3NbMV0pO1xuICAgICAgICBjYXNlIDM6IHJldHVybiBmdW5jLmNhbGwodGhpc0FyZywgYXJnc1swXSwgYXJnc1sxXSwgYXJnc1syXSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gZnVuYy5hcHBseSh0aGlzQXJnLCBhcmdzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDaGVja3MgaWYgYHZhbHVlYCBpcyB0aGVcbiAgICAgKiBbbGFuZ3VhZ2UgdHlwZV0oaHR0cDovL3d3dy5lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzYuMC8jc2VjLWVjbWFzY3JpcHQtbGFuZ3VhZ2UtdHlwZXMpXG4gICAgICogb2YgYE9iamVjdGAuIChlLmcuIGFycmF5cywgZnVuY3Rpb25zLCBvYmplY3RzLCByZWdleGVzLCBgbmV3IE51bWJlcigwKWAsIGFuZCBgbmV3IFN0cmluZygnJylgKVxuICAgICAqXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBtZW1iZXJPZiBfXG4gICAgICogQHNpbmNlIDAuMS4wXG4gICAgICogQGNhdGVnb3J5IExhbmdcbiAgICAgKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhbiBvYmplY3QsIGVsc2UgYGZhbHNlYC5cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogXy5pc09iamVjdCh7fSk7XG4gICAgICogLy8gPT4gdHJ1ZVxuICAgICAqXG4gICAgICogXy5pc09iamVjdChbMSwgMiwgM10pO1xuICAgICAqIC8vID0+IHRydWVcbiAgICAgKlxuICAgICAqIF8uaXNPYmplY3QoXy5ub29wKTtcbiAgICAgKiAvLyA9PiB0cnVlXG4gICAgICpcbiAgICAgKiBfLmlzT2JqZWN0KG51bGwpO1xuICAgICAqIC8vID0+IGZhbHNlXG4gICAgICovXG4gICAgZnVuY3Rpb24gaXNPYmplY3QodmFsdWUpIHtcbiAgICAgIHZhciB0eXBlID0gdHlwZW9mIHZhbHVlO1xuICAgICAgcmV0dXJuICEhdmFsdWUgJiYgKHR5cGUgPT0gJ29iamVjdCcgfHwgdHlwZSA9PSAnZnVuY3Rpb24nKTtcbiAgICB9XG5cbiAgICB2YXIgZnVuY1RhZyA9ICdbb2JqZWN0IEZ1bmN0aW9uXSc7XG4gICAgdmFyIGdlblRhZyA9ICdbb2JqZWN0IEdlbmVyYXRvckZ1bmN0aW9uXSc7XG4gICAgLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xuICAgIHZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbiAgICAvKipcbiAgICAgKiBVc2VkIHRvIHJlc29sdmUgdGhlXG4gICAgICogW2B0b1N0cmluZ1RhZ2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzYuMC8jc2VjLW9iamVjdC5wcm90b3R5cGUudG9zdHJpbmcpXG4gICAgICogb2YgdmFsdWVzLlxuICAgICAqL1xuICAgIHZhciBvYmplY3RUb1N0cmluZyA9IG9iamVjdFByb3RvLnRvU3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgY2xhc3NpZmllZCBhcyBhIGBGdW5jdGlvbmAgb2JqZWN0LlxuICAgICAqXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBtZW1iZXJPZiBfXG4gICAgICogQHNpbmNlIDAuMS4wXG4gICAgICogQGNhdGVnb3J5IExhbmdcbiAgICAgKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBjb3JyZWN0bHkgY2xhc3NpZmllZCxcbiAgICAgKiAgZWxzZSBgZmFsc2VgLlxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiBfLmlzRnVuY3Rpb24oXyk7XG4gICAgICogLy8gPT4gdHJ1ZVxuICAgICAqXG4gICAgICogXy5pc0Z1bmN0aW9uKC9hYmMvKTtcbiAgICAgKiAvLyA9PiBmYWxzZVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGlzRnVuY3Rpb24odmFsdWUpIHtcbiAgICAgIC8vIFRoZSB1c2Ugb2YgYE9iamVjdCN0b1N0cmluZ2AgYXZvaWRzIGlzc3VlcyB3aXRoIHRoZSBgdHlwZW9mYCBvcGVyYXRvclxuICAgICAgLy8gaW4gU2FmYXJpIDggd2hpY2ggcmV0dXJucyAnb2JqZWN0JyBmb3IgdHlwZWQgYXJyYXkgYW5kIHdlYWsgbWFwIGNvbnN0cnVjdG9ycyxcbiAgICAgIC8vIGFuZCBQaGFudG9tSlMgMS45IHdoaWNoIHJldHVybnMgJ2Z1bmN0aW9uJyBmb3IgYE5vZGVMaXN0YCBpbnN0YW5jZXMuXG4gICAgICB2YXIgdGFnID0gaXNPYmplY3QodmFsdWUpID8gb2JqZWN0VG9TdHJpbmcuY2FsbCh2YWx1ZSkgOiAnJztcbiAgICAgIHJldHVybiB0YWcgPT0gZnVuY1RhZyB8fCB0YWcgPT0gZ2VuVGFnO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIG9iamVjdC1saWtlLiBBIHZhbHVlIGlzIG9iamVjdC1saWtlIGlmIGl0J3Mgbm90IGBudWxsYFxuICAgICAqIGFuZCBoYXMgYSBgdHlwZW9mYCByZXN1bHQgb2YgXCJvYmplY3RcIi5cbiAgICAgKlxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAbWVtYmVyT2YgX1xuICAgICAqIEBzaW5jZSA0LjAuMFxuICAgICAqIEBjYXRlZ29yeSBMYW5nXG4gICAgICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UsIGVsc2UgYGZhbHNlYC5cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogXy5pc09iamVjdExpa2Uoe30pO1xuICAgICAqIC8vID0+IHRydWVcbiAgICAgKlxuICAgICAqIF8uaXNPYmplY3RMaWtlKFsxLCAyLCAzXSk7XG4gICAgICogLy8gPT4gdHJ1ZVxuICAgICAqXG4gICAgICogXy5pc09iamVjdExpa2UoXy5ub29wKTtcbiAgICAgKiAvLyA9PiBmYWxzZVxuICAgICAqXG4gICAgICogXy5pc09iamVjdExpa2UobnVsbCk7XG4gICAgICogLy8gPT4gZmFsc2VcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBpc09iamVjdExpa2UodmFsdWUpIHtcbiAgICAgIHJldHVybiAhIXZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PSAnb2JqZWN0JztcbiAgICB9XG5cbiAgICAvKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG4gICAgdmFyIHN5bWJvbFRhZyA9ICdbb2JqZWN0IFN5bWJvbF0nO1xuXG4gICAgLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xuICAgIHZhciBvYmplY3RQcm90byQxID0gT2JqZWN0LnByb3RvdHlwZTtcblxuICAgIC8qKlxuICAgICAqIFVzZWQgdG8gcmVzb2x2ZSB0aGVcbiAgICAgKiBbYHRvU3RyaW5nVGFnYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNi4wLyNzZWMtb2JqZWN0LnByb3RvdHlwZS50b3N0cmluZylcbiAgICAgKiBvZiB2YWx1ZXMuXG4gICAgICovXG4gICAgdmFyIG9iamVjdFRvU3RyaW5nJDEgPSBvYmplY3RQcm90byQxLnRvU3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgY2xhc3NpZmllZCBhcyBhIGBTeW1ib2xgIHByaW1pdGl2ZSBvciBvYmplY3QuXG4gICAgICpcbiAgICAgKiBAc3RhdGljXG4gICAgICogQG1lbWJlck9mIF9cbiAgICAgKiBAc2luY2UgNC4wLjBcbiAgICAgKiBAY2F0ZWdvcnkgTGFuZ1xuICAgICAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICAgICAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGNvcnJlY3RseSBjbGFzc2lmaWVkLFxuICAgICAqICBlbHNlIGBmYWxzZWAuXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqIF8uaXNTeW1ib2woU3ltYm9sLml0ZXJhdG9yKTtcbiAgICAgKiAvLyA9PiB0cnVlXG4gICAgICpcbiAgICAgKiBfLmlzU3ltYm9sKCdhYmMnKTtcbiAgICAgKiAvLyA9PiBmYWxzZVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGlzU3ltYm9sKHZhbHVlKSB7XG4gICAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09ICdzeW1ib2wnIHx8XG4gICAgICAgIChpc09iamVjdExpa2UodmFsdWUpICYmIG9iamVjdFRvU3RyaW5nJDEuY2FsbCh2YWx1ZSkgPT0gc3ltYm9sVGFnKTtcbiAgICB9XG5cbiAgICAvKiogVXNlZCBhcyByZWZlcmVuY2VzIGZvciB2YXJpb3VzIGBOdW1iZXJgIGNvbnN0YW50cy4gKi9cbiAgICB2YXIgTkFOID0gMCAvIDA7XG5cbiAgICAvKiogVXNlZCB0byBtYXRjaCBsZWFkaW5nIGFuZCB0cmFpbGluZyB3aGl0ZXNwYWNlLiAqL1xuICAgIHZhciByZVRyaW0gPSAvXlxccyt8XFxzKyQvZztcblxuICAgIC8qKiBVc2VkIHRvIGRldGVjdCBiYWQgc2lnbmVkIGhleGFkZWNpbWFsIHN0cmluZyB2YWx1ZXMuICovXG4gICAgdmFyIHJlSXNCYWRIZXggPSAvXlstK10weFswLTlhLWZdKyQvaTtcblxuICAgIC8qKiBVc2VkIHRvIGRldGVjdCBiaW5hcnkgc3RyaW5nIHZhbHVlcy4gKi9cbiAgICB2YXIgcmVJc0JpbmFyeSA9IC9eMGJbMDFdKyQvaTtcblxuICAgIC8qKiBVc2VkIHRvIGRldGVjdCBvY3RhbCBzdHJpbmcgdmFsdWVzLiAqL1xuICAgIHZhciByZUlzT2N0YWwgPSAvXjBvWzAtN10rJC9pO1xuXG4gICAgLyoqIEJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzIHdpdGhvdXQgYSBkZXBlbmRlbmN5IG9uIGByb290YC4gKi9cbiAgICB2YXIgZnJlZVBhcnNlSW50ID0gcGFyc2VJbnQ7XG5cbiAgICAvKipcbiAgICAgKiBDb252ZXJ0cyBgdmFsdWVgIHRvIGEgbnVtYmVyLlxuICAgICAqXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBtZW1iZXJPZiBfXG4gICAgICogQHNpbmNlIDQuMC4wXG4gICAgICogQGNhdGVnb3J5IExhbmdcbiAgICAgKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBwcm9jZXNzLlxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9IFJldHVybnMgdGhlIG51bWJlci5cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogXy50b051bWJlcigzLjIpO1xuICAgICAqIC8vID0+IDMuMlxuICAgICAqXG4gICAgICogXy50b051bWJlcihOdW1iZXIuTUlOX1ZBTFVFKTtcbiAgICAgKiAvLyA9PiA1ZS0zMjRcbiAgICAgKlxuICAgICAqIF8udG9OdW1iZXIoSW5maW5pdHkpO1xuICAgICAqIC8vID0+IEluZmluaXR5XG4gICAgICpcbiAgICAgKiBfLnRvTnVtYmVyKCczLjInKTtcbiAgICAgKiAvLyA9PiAzLjJcbiAgICAgKi9cbiAgICBmdW5jdGlvbiB0b051bWJlcih2YWx1ZSkge1xuICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PSAnbnVtYmVyJykge1xuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICB9XG4gICAgICBpZiAoaXNTeW1ib2wodmFsdWUpKSB7XG4gICAgICAgIHJldHVybiBOQU47XG4gICAgICB9XG4gICAgICBpZiAoaXNPYmplY3QodmFsdWUpKSB7XG4gICAgICAgIHZhciBvdGhlciA9IGlzRnVuY3Rpb24odmFsdWUudmFsdWVPZikgPyB2YWx1ZS52YWx1ZU9mKCkgOiB2YWx1ZTtcbiAgICAgICAgdmFsdWUgPSBpc09iamVjdChvdGhlcikgPyAob3RoZXIgKyAnJykgOiBvdGhlcjtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlID09PSAwID8gdmFsdWUgOiArdmFsdWU7XG4gICAgICB9XG4gICAgICB2YWx1ZSA9IHZhbHVlLnJlcGxhY2UocmVUcmltLCAnJyk7XG4gICAgICB2YXIgaXNCaW5hcnkgPSByZUlzQmluYXJ5LnRlc3QodmFsdWUpO1xuICAgICAgcmV0dXJuIChpc0JpbmFyeSB8fCByZUlzT2N0YWwudGVzdCh2YWx1ZSkpXG4gICAgICAgID8gZnJlZVBhcnNlSW50KHZhbHVlLnNsaWNlKDIpLCBpc0JpbmFyeSA/IDIgOiA4KVxuICAgICAgICA6IChyZUlzQmFkSGV4LnRlc3QodmFsdWUpID8gTkFOIDogK3ZhbHVlKTtcbiAgICB9XG5cbiAgICB2YXIgSU5GSU5JVFkgPSAxIC8gMDtcbiAgICB2YXIgTUFYX0lOVEVHRVIgPSAxLjc5NzY5MzEzNDg2MjMxNTdlKzMwODtcbiAgICAvKipcbiAgICAgKiBDb252ZXJ0cyBgdmFsdWVgIHRvIGEgZmluaXRlIG51bWJlci5cbiAgICAgKlxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAbWVtYmVyT2YgX1xuICAgICAqIEBzaW5jZSA0LjEyLjBcbiAgICAgKiBAY2F0ZWdvcnkgTGFuZ1xuICAgICAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNvbnZlcnQuXG4gICAgICogQHJldHVybnMge251bWJlcn0gUmV0dXJucyB0aGUgY29udmVydGVkIG51bWJlci5cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogXy50b0Zpbml0ZSgzLjIpO1xuICAgICAqIC8vID0+IDMuMlxuICAgICAqXG4gICAgICogXy50b0Zpbml0ZShOdW1iZXIuTUlOX1ZBTFVFKTtcbiAgICAgKiAvLyA9PiA1ZS0zMjRcbiAgICAgKlxuICAgICAqIF8udG9GaW5pdGUoSW5maW5pdHkpO1xuICAgICAqIC8vID0+IDEuNzk3NjkzMTM0ODYyMzE1N2UrMzA4XG4gICAgICpcbiAgICAgKiBfLnRvRmluaXRlKCczLjInKTtcbiAgICAgKiAvLyA9PiAzLjJcbiAgICAgKi9cbiAgICBmdW5jdGlvbiB0b0Zpbml0ZSh2YWx1ZSkge1xuICAgICAgaWYgKCF2YWx1ZSkge1xuICAgICAgICByZXR1cm4gdmFsdWUgPT09IDAgPyB2YWx1ZSA6IDA7XG4gICAgICB9XG4gICAgICB2YWx1ZSA9IHRvTnVtYmVyKHZhbHVlKTtcbiAgICAgIGlmICh2YWx1ZSA9PT0gSU5GSU5JVFkgfHwgdmFsdWUgPT09IC1JTkZJTklUWSkge1xuICAgICAgICB2YXIgc2lnbiA9ICh2YWx1ZSA8IDAgPyAtMSA6IDEpO1xuICAgICAgICByZXR1cm4gc2lnbiAqIE1BWF9JTlRFR0VSO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHZhbHVlID09PSB2YWx1ZSA/IHZhbHVlIDogMDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDb252ZXJ0cyBgdmFsdWVgIHRvIGFuIGludGVnZXIuXG4gICAgICpcbiAgICAgKiAqKk5vdGU6KiogVGhpcyBtZXRob2QgaXMgbG9vc2VseSBiYXNlZCBvblxuICAgICAqIFtgVG9JbnRlZ2VyYF0oaHR0cDovL3d3dy5lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzYuMC8jc2VjLXRvaW50ZWdlcikuXG4gICAgICpcbiAgICAgKiBAc3RhdGljXG4gICAgICogQG1lbWJlck9mIF9cbiAgICAgKiBAc2luY2UgNC4wLjBcbiAgICAgKiBAY2F0ZWdvcnkgTGFuZ1xuICAgICAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNvbnZlcnQuXG4gICAgICogQHJldHVybnMge251bWJlcn0gUmV0dXJucyB0aGUgY29udmVydGVkIGludGVnZXIuXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqIF8udG9JbnRlZ2VyKDMuMik7XG4gICAgICogLy8gPT4gM1xuICAgICAqXG4gICAgICogXy50b0ludGVnZXIoTnVtYmVyLk1JTl9WQUxVRSk7XG4gICAgICogLy8gPT4gMFxuICAgICAqXG4gICAgICogXy50b0ludGVnZXIoSW5maW5pdHkpO1xuICAgICAqIC8vID0+IDEuNzk3NjkzMTM0ODYyMzE1N2UrMzA4XG4gICAgICpcbiAgICAgKiBfLnRvSW50ZWdlcignMy4yJyk7XG4gICAgICogLy8gPT4gM1xuICAgICAqL1xuICAgIGZ1bmN0aW9uIHRvSW50ZWdlcih2YWx1ZSkge1xuICAgICAgdmFyIHJlc3VsdCA9IHRvRmluaXRlKHZhbHVlKSxcbiAgICAgICAgICByZW1haW5kZXIgPSByZXN1bHQgJSAxO1xuXG4gICAgICByZXR1cm4gcmVzdWx0ID09PSByZXN1bHQgPyAocmVtYWluZGVyID8gcmVzdWx0IC0gcmVtYWluZGVyIDogcmVzdWx0KSA6IDA7XG4gICAgfVxuXG4gICAgLyoqIFVzZWQgYXMgdGhlIGBUeXBlRXJyb3JgIG1lc3NhZ2UgZm9yIFwiRnVuY3Rpb25zXCIgbWV0aG9kcy4gKi9cbiAgICB2YXIgRlVOQ19FUlJPUl9URVhUID0gJ0V4cGVjdGVkIGEgZnVuY3Rpb24nO1xuXG4gICAgLyogQnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMgZm9yIHRob3NlIHdpdGggdGhlIHNhbWUgbmFtZSBhcyBvdGhlciBgbG9kYXNoYCBtZXRob2RzLiAqL1xuICAgIHZhciBuYXRpdmVNYXggPSBNYXRoLm1heDtcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBmdW5jdGlvbiB0aGF0IGludm9rZXMgYGZ1bmNgIHdpdGggdGhlIGB0aGlzYCBiaW5kaW5nIG9mIHRoZVxuICAgICAqIGNyZWF0ZWQgZnVuY3Rpb24gYW5kIGFyZ3VtZW50cyBmcm9tIGBzdGFydGAgYW5kIGJleW9uZCBwcm92aWRlZCBhc1xuICAgICAqIGFuIGFycmF5LlxuICAgICAqXG4gICAgICogKipOb3RlOioqIFRoaXMgbWV0aG9kIGlzIGJhc2VkIG9uIHRoZVxuICAgICAqIFtyZXN0IHBhcmFtZXRlcl0oaHR0cHM6Ly9tZG4uaW8vcmVzdF9wYXJhbWV0ZXJzKS5cbiAgICAgKlxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAbWVtYmVyT2YgX1xuICAgICAqIEBzaW5jZSA0LjAuMFxuICAgICAqIEBjYXRlZ29yeSBGdW5jdGlvblxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGFwcGx5IGEgcmVzdCBwYXJhbWV0ZXIgdG8uXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IFtzdGFydD1mdW5jLmxlbmd0aC0xXSBUaGUgc3RhcnQgcG9zaXRpb24gb2YgdGhlIHJlc3QgcGFyYW1ldGVyLlxuICAgICAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGZ1bmN0aW9uLlxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiB2YXIgc2F5ID0gXy5yZXN0KGZ1bmN0aW9uKHdoYXQsIG5hbWVzKSB7XG4gICAgICogICByZXR1cm4gd2hhdCArICcgJyArIF8uaW5pdGlhbChuYW1lcykuam9pbignLCAnKSArXG4gICAgICogICAgIChfLnNpemUobmFtZXMpID4gMSA/ICcsICYgJyA6ICcnKSArIF8ubGFzdChuYW1lcyk7XG4gICAgICogfSk7XG4gICAgICpcbiAgICAgKiBzYXkoJ2hlbGxvJywgJ2ZyZWQnLCAnYmFybmV5JywgJ3BlYmJsZXMnKTtcbiAgICAgKiAvLyA9PiAnaGVsbG8gZnJlZCwgYmFybmV5LCAmIHBlYmJsZXMnXG4gICAgICovXG4gICAgZnVuY3Rpb24gcmVzdChmdW5jLCBzdGFydCkge1xuICAgICAgaWYgKHR5cGVvZiBmdW5jICE9ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihGVU5DX0VSUk9SX1RFWFQpO1xuICAgICAgfVxuICAgICAgc3RhcnQgPSBuYXRpdmVNYXgoc3RhcnQgPT09IHVuZGVmaW5lZCA/IChmdW5jLmxlbmd0aCAtIDEpIDogdG9JbnRlZ2VyKHN0YXJ0KSwgMCk7XG4gICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBhcmdzID0gYXJndW1lbnRzLFxuICAgICAgICAgICAgaW5kZXggPSAtMSxcbiAgICAgICAgICAgIGxlbmd0aCA9IG5hdGl2ZU1heChhcmdzLmxlbmd0aCAtIHN0YXJ0LCAwKSxcbiAgICAgICAgICAgIGFycmF5ID0gQXJyYXkobGVuZ3RoKTtcblxuICAgICAgICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgICAgICAgIGFycmF5W2luZGV4XSA9IGFyZ3Nbc3RhcnQgKyBpbmRleF07XG4gICAgICAgIH1cbiAgICAgICAgc3dpdGNoIChzdGFydCkge1xuICAgICAgICAgIGNhc2UgMDogcmV0dXJuIGZ1bmMuY2FsbCh0aGlzLCBhcnJheSk7XG4gICAgICAgICAgY2FzZSAxOiByZXR1cm4gZnVuYy5jYWxsKHRoaXMsIGFyZ3NbMF0sIGFycmF5KTtcbiAgICAgICAgICBjYXNlIDI6IHJldHVybiBmdW5jLmNhbGwodGhpcywgYXJnc1swXSwgYXJnc1sxXSwgYXJyYXkpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBvdGhlckFyZ3MgPSBBcnJheShzdGFydCArIDEpO1xuICAgICAgICBpbmRleCA9IC0xO1xuICAgICAgICB3aGlsZSAoKytpbmRleCA8IHN0YXJ0KSB7XG4gICAgICAgICAgb3RoZXJBcmdzW2luZGV4XSA9IGFyZ3NbaW5kZXhdO1xuICAgICAgICB9XG4gICAgICAgIG90aGVyQXJnc1tzdGFydF0gPSBhcnJheTtcbiAgICAgICAgcmV0dXJuIGFwcGx5KGZ1bmMsIHRoaXMsIG90aGVyQXJncyk7XG4gICAgICB9O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGluaXRpYWxQYXJhbXMgKGZuKSB7XG4gICAgICAgIHJldHVybiByZXN0KGZ1bmN0aW9uIChhcmdzIC8qLi4uLCBjYWxsYmFjayovKSB7XG4gICAgICAgICAgICB2YXIgY2FsbGJhY2sgPSBhcmdzLnBvcCgpO1xuICAgICAgICAgICAgZm4uY2FsbCh0aGlzLCBhcmdzLCBjYWxsYmFjayk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFwcGx5RWFjaCQxKGVhY2hmbikge1xuICAgICAgICByZXR1cm4gcmVzdChmdW5jdGlvbiAoZm5zLCBhcmdzKSB7XG4gICAgICAgICAgICB2YXIgZ28gPSBpbml0aWFsUGFyYW1zKGZ1bmN0aW9uIChhcmdzLCBjYWxsYmFjaykge1xuICAgICAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgICAgICAgICAgICByZXR1cm4gZWFjaGZuKGZucywgZnVuY3Rpb24gKGZuLCBjYikge1xuICAgICAgICAgICAgICAgICAgICBmbi5hcHBseSh0aGF0LCBhcmdzLmNvbmNhdChbY2JdKSk7XG4gICAgICAgICAgICAgICAgfSwgY2FsbGJhY2spO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAoYXJncy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZ28uYXBwbHkodGhpcywgYXJncyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBnbztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQSBtZXRob2QgdGhhdCByZXR1cm5zIGB1bmRlZmluZWRgLlxuICAgICAqXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBtZW1iZXJPZiBfXG4gICAgICogQHNpbmNlIDIuMy4wXG4gICAgICogQGNhdGVnb3J5IFV0aWxcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogXy50aW1lcygyLCBfLm5vb3ApO1xuICAgICAqIC8vID0+IFt1bmRlZmluZWQsIHVuZGVmaW5lZF1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBub29wKCkge1xuICAgICAgLy8gTm8gb3BlcmF0aW9uIHBlcmZvcm1lZC5cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbmNlKGZuKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoZm4gPT09IG51bGwpIHJldHVybjtcbiAgICAgICAgICAgIHZhciBjYWxsRm4gPSBmbjtcbiAgICAgICAgICAgIGZuID0gbnVsbDtcbiAgICAgICAgICAgIGNhbGxGbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLnByb3BlcnR5YCB3aXRob3V0IHN1cHBvcnQgZm9yIGRlZXAgcGF0aHMuXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgcHJvcGVydHkgdG8gZ2V0LlxuICAgICAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGFjY2Vzc29yIGZ1bmN0aW9uLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGJhc2VQcm9wZXJ0eShrZXkpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbihvYmplY3QpIHtcbiAgICAgICAgcmV0dXJuIG9iamVjdCA9PSBudWxsID8gdW5kZWZpbmVkIDogb2JqZWN0W2tleV07XG4gICAgICB9O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIFwibGVuZ3RoXCIgcHJvcGVydHkgdmFsdWUgb2YgYG9iamVjdGAuXG4gICAgICpcbiAgICAgKiAqKk5vdGU6KiogVGhpcyBmdW5jdGlvbiBpcyB1c2VkIHRvIGF2b2lkIGFcbiAgICAgKiBbSklUIGJ1Z10oaHR0cHM6Ly9idWdzLndlYmtpdC5vcmcvc2hvd19idWcuY2dpP2lkPTE0Mjc5MikgdGhhdCBhZmZlY3RzXG4gICAgICogU2FmYXJpIG9uIGF0IGxlYXN0IGlPUyA4LjEtOC4zIEFSTTY0LlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gICAgICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIFwibGVuZ3RoXCIgdmFsdWUuXG4gICAgICovXG4gICAgdmFyIGdldExlbmd0aCA9IGJhc2VQcm9wZXJ0eSgnbGVuZ3RoJyk7XG5cbiAgICAvKiogVXNlZCBhcyByZWZlcmVuY2VzIGZvciB2YXJpb3VzIGBOdW1iZXJgIGNvbnN0YW50cy4gKi9cbiAgICB2YXIgTUFYX1NBRkVfSU5URUdFUiA9IDkwMDcxOTkyNTQ3NDA5OTE7XG5cbiAgICAvKipcbiAgICAgKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIHZhbGlkIGFycmF5LWxpa2UgbGVuZ3RoLlxuICAgICAqXG4gICAgICogKipOb3RlOioqIFRoaXMgZnVuY3Rpb24gaXMgbG9vc2VseSBiYXNlZCBvblxuICAgICAqIFtgVG9MZW5ndGhgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi82LjAvI3NlYy10b2xlbmd0aCkuXG4gICAgICpcbiAgICAgKiBAc3RhdGljXG4gICAgICogQG1lbWJlck9mIF9cbiAgICAgKiBAc2luY2UgNC4wLjBcbiAgICAgKiBAY2F0ZWdvcnkgTGFuZ1xuICAgICAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICAgICAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgbGVuZ3RoLFxuICAgICAqICBlbHNlIGBmYWxzZWAuXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqIF8uaXNMZW5ndGgoMyk7XG4gICAgICogLy8gPT4gdHJ1ZVxuICAgICAqXG4gICAgICogXy5pc0xlbmd0aChOdW1iZXIuTUlOX1ZBTFVFKTtcbiAgICAgKiAvLyA9PiBmYWxzZVxuICAgICAqXG4gICAgICogXy5pc0xlbmd0aChJbmZpbml0eSk7XG4gICAgICogLy8gPT4gZmFsc2VcbiAgICAgKlxuICAgICAqIF8uaXNMZW5ndGgoJzMnKTtcbiAgICAgKiAvLyA9PiBmYWxzZVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGlzTGVuZ3RoKHZhbHVlKSB7XG4gICAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09ICdudW1iZXInICYmXG4gICAgICAgIHZhbHVlID4gLTEgJiYgdmFsdWUgJSAxID09IDAgJiYgdmFsdWUgPD0gTUFYX1NBRkVfSU5URUdFUjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhcnJheS1saWtlLiBBIHZhbHVlIGlzIGNvbnNpZGVyZWQgYXJyYXktbGlrZSBpZiBpdCdzXG4gICAgICogbm90IGEgZnVuY3Rpb24gYW5kIGhhcyBhIGB2YWx1ZS5sZW5ndGhgIHRoYXQncyBhbiBpbnRlZ2VyIGdyZWF0ZXIgdGhhbiBvclxuICAgICAqIGVxdWFsIHRvIGAwYCBhbmQgbGVzcyB0aGFuIG9yIGVxdWFsIHRvIGBOdW1iZXIuTUFYX1NBRkVfSU5URUdFUmAuXG4gICAgICpcbiAgICAgKiBAc3RhdGljXG4gICAgICogQG1lbWJlck9mIF9cbiAgICAgKiBAc2luY2UgNC4wLjBcbiAgICAgKiBAY2F0ZWdvcnkgTGFuZ1xuICAgICAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICAgICAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFycmF5LWxpa2UsIGVsc2UgYGZhbHNlYC5cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogXy5pc0FycmF5TGlrZShbMSwgMiwgM10pO1xuICAgICAqIC8vID0+IHRydWVcbiAgICAgKlxuICAgICAqIF8uaXNBcnJheUxpa2UoZG9jdW1lbnQuYm9keS5jaGlsZHJlbik7XG4gICAgICogLy8gPT4gdHJ1ZVxuICAgICAqXG4gICAgICogXy5pc0FycmF5TGlrZSgnYWJjJyk7XG4gICAgICogLy8gPT4gdHJ1ZVxuICAgICAqXG4gICAgICogXy5pc0FycmF5TGlrZShfLm5vb3ApO1xuICAgICAqIC8vID0+IGZhbHNlXG4gICAgICovXG4gICAgZnVuY3Rpb24gaXNBcnJheUxpa2UodmFsdWUpIHtcbiAgICAgIHJldHVybiB2YWx1ZSAhPSBudWxsICYmIGlzTGVuZ3RoKGdldExlbmd0aCh2YWx1ZSkpICYmICFpc0Z1bmN0aW9uKHZhbHVlKTtcbiAgICB9XG5cbiAgICB2YXIgaXRlcmF0b3JTeW1ib2wgPSB0eXBlb2YgU3ltYm9sID09PSAnZnVuY3Rpb24nICYmIFN5bWJvbC5pdGVyYXRvcjtcblxuICAgIGZ1bmN0aW9uIGdldEl0ZXJhdG9yIChjb2xsKSB7XG4gICAgICAgIHJldHVybiBpdGVyYXRvclN5bWJvbCAmJiBjb2xsW2l0ZXJhdG9yU3ltYm9sXSAmJiBjb2xsW2l0ZXJhdG9yU3ltYm9sXSgpO1xuICAgIH1cblxuICAgIC8qIEJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzIGZvciB0aG9zZSB3aXRoIHRoZSBzYW1lIG5hbWUgYXMgb3RoZXIgYGxvZGFzaGAgbWV0aG9kcy4gKi9cbiAgICB2YXIgbmF0aXZlR2V0UHJvdG90eXBlID0gT2JqZWN0LmdldFByb3RvdHlwZU9mO1xuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgYFtbUHJvdG90eXBlXV1gIG9mIGB2YWx1ZWAuXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHF1ZXJ5LlxuICAgICAqIEByZXR1cm5zIHtudWxsfE9iamVjdH0gUmV0dXJucyB0aGUgYFtbUHJvdG90eXBlXV1gLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGdldFByb3RvdHlwZSh2YWx1ZSkge1xuICAgICAgcmV0dXJuIG5hdGl2ZUdldFByb3RvdHlwZShPYmplY3QodmFsdWUpKTtcbiAgICB9XG5cbiAgICAvKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG4gICAgdmFyIG9iamVjdFByb3RvJDIgPSBPYmplY3QucHJvdG90eXBlO1xuXG4gICAgLyoqIFVzZWQgdG8gY2hlY2sgb2JqZWN0cyBmb3Igb3duIHByb3BlcnRpZXMuICovXG4gICAgdmFyIGhhc093blByb3BlcnR5ID0gb2JqZWN0UHJvdG8kMi5oYXNPd25Qcm9wZXJ0eTtcblxuICAgIC8qKlxuICAgICAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmhhc2Agd2l0aG91dCBzdXBwb3J0IGZvciBkZWVwIHBhdGhzLlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gW29iamVjdF0gVGhlIG9iamVjdCB0byBxdWVyeS5cbiAgICAgKiBAcGFyYW0ge0FycmF5fHN0cmluZ30ga2V5IFRoZSBrZXkgdG8gY2hlY2suXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGBrZXlgIGV4aXN0cywgZWxzZSBgZmFsc2VgLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGJhc2VIYXMob2JqZWN0LCBrZXkpIHtcbiAgICAgIC8vIEF2b2lkIGEgYnVnIGluIElFIDEwLTExIHdoZXJlIG9iamVjdHMgd2l0aCBhIFtbUHJvdG90eXBlXV0gb2YgYG51bGxgLFxuICAgICAgLy8gdGhhdCBhcmUgY29tcG9zZWQgZW50aXJlbHkgb2YgaW5kZXggcHJvcGVydGllcywgcmV0dXJuIGBmYWxzZWAgZm9yXG4gICAgICAvLyBgaGFzT3duUHJvcGVydHlgIGNoZWNrcyBvZiB0aGVtLlxuICAgICAgcmV0dXJuIG9iamVjdCAhPSBudWxsICYmXG4gICAgICAgIChoYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwga2V5KSB8fFxuICAgICAgICAgICh0eXBlb2Ygb2JqZWN0ID09ICdvYmplY3QnICYmIGtleSBpbiBvYmplY3QgJiYgZ2V0UHJvdG90eXBlKG9iamVjdCkgPT09IG51bGwpKTtcbiAgICB9XG5cbiAgICAvKiBCdWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcyBmb3IgdGhvc2Ugd2l0aCB0aGUgc2FtZSBuYW1lIGFzIG90aGVyIGBsb2Rhc2hgIG1ldGhvZHMuICovXG4gICAgdmFyIG5hdGl2ZUtleXMgPSBPYmplY3Qua2V5cztcblxuICAgIC8qKlxuICAgICAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmtleXNgIHdoaWNoIGRvZXNuJ3Qgc2tpcCB0aGUgY29uc3RydWN0b3JcbiAgICAgKiBwcm9wZXJ0eSBvZiBwcm90b3R5cGVzIG9yIHRyZWF0IHNwYXJzZSBhcnJheXMgYXMgZGVuc2UuXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAgICAgKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGFycmF5IG9mIHByb3BlcnR5IG5hbWVzLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGJhc2VLZXlzKG9iamVjdCkge1xuICAgICAgcmV0dXJuIG5hdGl2ZUtleXMoT2JqZWN0KG9iamVjdCkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLnRpbWVzYCB3aXRob3V0IHN1cHBvcnQgZm9yIGl0ZXJhdGVlIHNob3J0aGFuZHNcbiAgICAgKiBvciBtYXggYXJyYXkgbGVuZ3RoIGNoZWNrcy5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IG4gVGhlIG51bWJlciBvZiB0aW1lcyB0byBpbnZva2UgYGl0ZXJhdGVlYC5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBpdGVyYXRlZSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICAgICAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcmVzdWx0cy5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBiYXNlVGltZXMobiwgaXRlcmF0ZWUpIHtcbiAgICAgIHZhciBpbmRleCA9IC0xLFxuICAgICAgICAgIHJlc3VsdCA9IEFycmF5KG4pO1xuXG4gICAgICB3aGlsZSAoKytpbmRleCA8IG4pIHtcbiAgICAgICAgcmVzdWx0W2luZGV4XSA9IGl0ZXJhdGVlKGluZGV4KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVGhpcyBtZXRob2QgaXMgbGlrZSBgXy5pc0FycmF5TGlrZWAgZXhjZXB0IHRoYXQgaXQgYWxzbyBjaGVja3MgaWYgYHZhbHVlYFxuICAgICAqIGlzIGFuIG9iamVjdC5cbiAgICAgKlxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAbWVtYmVyT2YgX1xuICAgICAqIEBzaW5jZSA0LjAuMFxuICAgICAqIEBjYXRlZ29yeSBMYW5nXG4gICAgICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYW4gYXJyYXktbGlrZSBvYmplY3QsXG4gICAgICogIGVsc2UgYGZhbHNlYC5cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogXy5pc0FycmF5TGlrZU9iamVjdChbMSwgMiwgM10pO1xuICAgICAqIC8vID0+IHRydWVcbiAgICAgKlxuICAgICAqIF8uaXNBcnJheUxpa2VPYmplY3QoZG9jdW1lbnQuYm9keS5jaGlsZHJlbik7XG4gICAgICogLy8gPT4gdHJ1ZVxuICAgICAqXG4gICAgICogXy5pc0FycmF5TGlrZU9iamVjdCgnYWJjJyk7XG4gICAgICogLy8gPT4gZmFsc2VcbiAgICAgKlxuICAgICAqIF8uaXNBcnJheUxpa2VPYmplY3QoXy5ub29wKTtcbiAgICAgKiAvLyA9PiBmYWxzZVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGlzQXJyYXlMaWtlT2JqZWN0KHZhbHVlKSB7XG4gICAgICByZXR1cm4gaXNPYmplY3RMaWtlKHZhbHVlKSAmJiBpc0FycmF5TGlrZSh2YWx1ZSk7XG4gICAgfVxuXG4gICAgLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xuICAgIHZhciBhcmdzVGFnID0gJ1tvYmplY3QgQXJndW1lbnRzXSc7XG5cbiAgICAvKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG4gICAgdmFyIG9iamVjdFByb3RvJDMgPSBPYmplY3QucHJvdG90eXBlO1xuXG4gICAgLyoqIFVzZWQgdG8gY2hlY2sgb2JqZWN0cyBmb3Igb3duIHByb3BlcnRpZXMuICovXG4gICAgdmFyIGhhc093blByb3BlcnR5JDEgPSBvYmplY3RQcm90byQzLmhhc093blByb3BlcnR5O1xuXG4gICAgLyoqXG4gICAgICogVXNlZCB0byByZXNvbHZlIHRoZVxuICAgICAqIFtgdG9TdHJpbmdUYWdgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi82LjAvI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICAgICAqIG9mIHZhbHVlcy5cbiAgICAgKi9cbiAgICB2YXIgb2JqZWN0VG9TdHJpbmckMiA9IG9iamVjdFByb3RvJDMudG9TdHJpbmc7XG5cbiAgICAvKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cbiAgICB2YXIgcHJvcGVydHlJc0VudW1lcmFibGUgPSBvYmplY3RQcm90byQzLnByb3BlcnR5SXNFbnVtZXJhYmxlO1xuXG4gICAgLyoqXG4gICAgICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgbGlrZWx5IGFuIGBhcmd1bWVudHNgIG9iamVjdC5cbiAgICAgKlxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAbWVtYmVyT2YgX1xuICAgICAqIEBzaW5jZSAwLjEuMFxuICAgICAqIEBjYXRlZ29yeSBMYW5nXG4gICAgICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgY29ycmVjdGx5IGNsYXNzaWZpZWQsXG4gICAgICogIGVsc2UgYGZhbHNlYC5cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogXy5pc0FyZ3VtZW50cyhmdW5jdGlvbigpIHsgcmV0dXJuIGFyZ3VtZW50czsgfSgpKTtcbiAgICAgKiAvLyA9PiB0cnVlXG4gICAgICpcbiAgICAgKiBfLmlzQXJndW1lbnRzKFsxLCAyLCAzXSk7XG4gICAgICogLy8gPT4gZmFsc2VcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBpc0FyZ3VtZW50cyh2YWx1ZSkge1xuICAgICAgLy8gU2FmYXJpIDguMSBpbmNvcnJlY3RseSBtYWtlcyBgYXJndW1lbnRzLmNhbGxlZWAgZW51bWVyYWJsZSBpbiBzdHJpY3QgbW9kZS5cbiAgICAgIHJldHVybiBpc0FycmF5TGlrZU9iamVjdCh2YWx1ZSkgJiYgaGFzT3duUHJvcGVydHkkMS5jYWxsKHZhbHVlLCAnY2FsbGVlJykgJiZcbiAgICAgICAgKCFwcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKHZhbHVlLCAnY2FsbGVlJykgfHwgb2JqZWN0VG9TdHJpbmckMi5jYWxsKHZhbHVlKSA9PSBhcmdzVGFnKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBjbGFzc2lmaWVkIGFzIGFuIGBBcnJheWAgb2JqZWN0LlxuICAgICAqXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBtZW1iZXJPZiBfXG4gICAgICogQHNpbmNlIDAuMS4wXG4gICAgICogQHR5cGUge0Z1bmN0aW9ufVxuICAgICAqIEBjYXRlZ29yeSBMYW5nXG4gICAgICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgY29ycmVjdGx5IGNsYXNzaWZpZWQsXG4gICAgICogIGVsc2UgYGZhbHNlYC5cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogXy5pc0FycmF5KFsxLCAyLCAzXSk7XG4gICAgICogLy8gPT4gdHJ1ZVxuICAgICAqXG4gICAgICogXy5pc0FycmF5KGRvY3VtZW50LmJvZHkuY2hpbGRyZW4pO1xuICAgICAqIC8vID0+IGZhbHNlXG4gICAgICpcbiAgICAgKiBfLmlzQXJyYXkoJ2FiYycpO1xuICAgICAqIC8vID0+IGZhbHNlXG4gICAgICpcbiAgICAgKiBfLmlzQXJyYXkoXy5ub29wKTtcbiAgICAgKiAvLyA9PiBmYWxzZVxuICAgICAqL1xuICAgIHZhciBpc0FycmF5ID0gQXJyYXkuaXNBcnJheTtcblxuICAgIC8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbiAgICB2YXIgc3RyaW5nVGFnID0gJ1tvYmplY3QgU3RyaW5nXSc7XG5cbiAgICAvKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG4gICAgdmFyIG9iamVjdFByb3RvJDQgPSBPYmplY3QucHJvdG90eXBlO1xuXG4gICAgLyoqXG4gICAgICogVXNlZCB0byByZXNvbHZlIHRoZVxuICAgICAqIFtgdG9TdHJpbmdUYWdgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi82LjAvI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICAgICAqIG9mIHZhbHVlcy5cbiAgICAgKi9cbiAgICB2YXIgb2JqZWN0VG9TdHJpbmckMyA9IG9iamVjdFByb3RvJDQudG9TdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBjbGFzc2lmaWVkIGFzIGEgYFN0cmluZ2AgcHJpbWl0aXZlIG9yIG9iamVjdC5cbiAgICAgKlxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAc2luY2UgMC4xLjBcbiAgICAgKiBAbWVtYmVyT2YgX1xuICAgICAqIEBjYXRlZ29yeSBMYW5nXG4gICAgICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgY29ycmVjdGx5IGNsYXNzaWZpZWQsXG4gICAgICogIGVsc2UgYGZhbHNlYC5cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogXy5pc1N0cmluZygnYWJjJyk7XG4gICAgICogLy8gPT4gdHJ1ZVxuICAgICAqXG4gICAgICogXy5pc1N0cmluZygxKTtcbiAgICAgKiAvLyA9PiBmYWxzZVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGlzU3RyaW5nKHZhbHVlKSB7XG4gICAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09ICdzdHJpbmcnIHx8XG4gICAgICAgICghaXNBcnJheSh2YWx1ZSkgJiYgaXNPYmplY3RMaWtlKHZhbHVlKSAmJiBvYmplY3RUb1N0cmluZyQzLmNhbGwodmFsdWUpID09IHN0cmluZ1RhZyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhbiBhcnJheSBvZiBpbmRleCBrZXlzIGZvciBgb2JqZWN0YCB2YWx1ZXMgb2YgYXJyYXlzLFxuICAgICAqIGBhcmd1bWVudHNgIG9iamVjdHMsIGFuZCBzdHJpbmdzLCBvdGhlcndpc2UgYG51bGxgIGlzIHJldHVybmVkLlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gICAgICogQHJldHVybnMge0FycmF5fG51bGx9IFJldHVybnMgaW5kZXgga2V5cywgZWxzZSBgbnVsbGAuXG4gICAgICovXG4gICAgZnVuY3Rpb24gaW5kZXhLZXlzKG9iamVjdCkge1xuICAgICAgdmFyIGxlbmd0aCA9IG9iamVjdCA/IG9iamVjdC5sZW5ndGggOiB1bmRlZmluZWQ7XG4gICAgICBpZiAoaXNMZW5ndGgobGVuZ3RoKSAmJlxuICAgICAgICAgIChpc0FycmF5KG9iamVjdCkgfHwgaXNTdHJpbmcob2JqZWN0KSB8fCBpc0FyZ3VtZW50cyhvYmplY3QpKSkge1xuICAgICAgICByZXR1cm4gYmFzZVRpbWVzKGxlbmd0aCwgU3RyaW5nKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIC8qKiBVc2VkIGFzIHJlZmVyZW5jZXMgZm9yIHZhcmlvdXMgYE51bWJlcmAgY29uc3RhbnRzLiAqL1xuICAgIHZhciBNQVhfU0FGRV9JTlRFR0VSJDEgPSA5MDA3MTk5MjU0NzQwOTkxO1xuXG4gICAgLyoqIFVzZWQgdG8gZGV0ZWN0IHVuc2lnbmVkIGludGVnZXIgdmFsdWVzLiAqL1xuICAgIHZhciByZUlzVWludCA9IC9eKD86MHxbMS05XVxcZCopJC87XG5cbiAgICAvKipcbiAgICAgKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIHZhbGlkIGFycmF5LWxpa2UgaW5kZXguXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbbGVuZ3RoPU1BWF9TQUZFX0lOVEVHRVJdIFRoZSB1cHBlciBib3VuZHMgb2YgYSB2YWxpZCBpbmRleC5cbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHZhbGlkIGluZGV4LCBlbHNlIGBmYWxzZWAuXG4gICAgICovXG4gICAgZnVuY3Rpb24gaXNJbmRleCh2YWx1ZSwgbGVuZ3RoKSB7XG4gICAgICBsZW5ndGggPSBsZW5ndGggPT0gbnVsbCA/IE1BWF9TQUZFX0lOVEVHRVIkMSA6IGxlbmd0aDtcbiAgICAgIHJldHVybiAhIWxlbmd0aCAmJlxuICAgICAgICAodHlwZW9mIHZhbHVlID09ICdudW1iZXInIHx8IHJlSXNVaW50LnRlc3QodmFsdWUpKSAmJlxuICAgICAgICAodmFsdWUgPiAtMSAmJiB2YWx1ZSAlIDEgPT0gMCAmJiB2YWx1ZSA8IGxlbmd0aCk7XG4gICAgfVxuXG4gICAgLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xuICAgIHZhciBvYmplY3RQcm90byQ1ID0gT2JqZWN0LnByb3RvdHlwZTtcblxuICAgIC8qKlxuICAgICAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGxpa2VseSBhIHByb3RvdHlwZSBvYmplY3QuXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICAgICAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgcHJvdG90eXBlLCBlbHNlIGBmYWxzZWAuXG4gICAgICovXG4gICAgZnVuY3Rpb24gaXNQcm90b3R5cGUodmFsdWUpIHtcbiAgICAgIHZhciBDdG9yID0gdmFsdWUgJiYgdmFsdWUuY29uc3RydWN0b3IsXG4gICAgICAgICAgcHJvdG8gPSAodHlwZW9mIEN0b3IgPT0gJ2Z1bmN0aW9uJyAmJiBDdG9yLnByb3RvdHlwZSkgfHwgb2JqZWN0UHJvdG8kNTtcblxuICAgICAgcmV0dXJuIHZhbHVlID09PSBwcm90bztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGFuIGFycmF5IG9mIHRoZSBvd24gZW51bWVyYWJsZSBwcm9wZXJ0eSBuYW1lcyBvZiBgb2JqZWN0YC5cbiAgICAgKlxuICAgICAqICoqTm90ZToqKiBOb24tb2JqZWN0IHZhbHVlcyBhcmUgY29lcmNlZCB0byBvYmplY3RzLiBTZWUgdGhlXG4gICAgICogW0VTIHNwZWNdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzYuMC8jc2VjLW9iamVjdC5rZXlzKVxuICAgICAqIGZvciBtb3JlIGRldGFpbHMuXG4gICAgICpcbiAgICAgKiBAc3RhdGljXG4gICAgICogQHNpbmNlIDAuMS4wXG4gICAgICogQG1lbWJlck9mIF9cbiAgICAgKiBAY2F0ZWdvcnkgT2JqZWN0XG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICAgICAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcHJvcGVydHkgbmFtZXMuXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqIGZ1bmN0aW9uIEZvbygpIHtcbiAgICAgKiAgIHRoaXMuYSA9IDE7XG4gICAgICogICB0aGlzLmIgPSAyO1xuICAgICAqIH1cbiAgICAgKlxuICAgICAqIEZvby5wcm90b3R5cGUuYyA9IDM7XG4gICAgICpcbiAgICAgKiBfLmtleXMobmV3IEZvbyk7XG4gICAgICogLy8gPT4gWydhJywgJ2InXSAoaXRlcmF0aW9uIG9yZGVyIGlzIG5vdCBndWFyYW50ZWVkKVxuICAgICAqXG4gICAgICogXy5rZXlzKCdoaScpO1xuICAgICAqIC8vID0+IFsnMCcsICcxJ11cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBrZXlzKG9iamVjdCkge1xuICAgICAgdmFyIGlzUHJvdG8gPSBpc1Byb3RvdHlwZShvYmplY3QpO1xuICAgICAgaWYgKCEoaXNQcm90byB8fCBpc0FycmF5TGlrZShvYmplY3QpKSkge1xuICAgICAgICByZXR1cm4gYmFzZUtleXMob2JqZWN0KTtcbiAgICAgIH1cbiAgICAgIHZhciBpbmRleGVzID0gaW5kZXhLZXlzKG9iamVjdCksXG4gICAgICAgICAgc2tpcEluZGV4ZXMgPSAhIWluZGV4ZXMsXG4gICAgICAgICAgcmVzdWx0ID0gaW5kZXhlcyB8fCBbXSxcbiAgICAgICAgICBsZW5ndGggPSByZXN1bHQubGVuZ3RoO1xuXG4gICAgICBmb3IgKHZhciBrZXkgaW4gb2JqZWN0KSB7XG4gICAgICAgIGlmIChiYXNlSGFzKG9iamVjdCwga2V5KSAmJlxuICAgICAgICAgICAgIShza2lwSW5kZXhlcyAmJiAoa2V5ID09ICdsZW5ndGgnIHx8IGlzSW5kZXgoa2V5LCBsZW5ndGgpKSkgJiZcbiAgICAgICAgICAgICEoaXNQcm90byAmJiBrZXkgPT0gJ2NvbnN0cnVjdG9yJykpIHtcbiAgICAgICAgICByZXN1bHQucHVzaChrZXkpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGl0ZXJhdG9yKGNvbGwpIHtcbiAgICAgICAgdmFyIGkgPSAtMTtcbiAgICAgICAgdmFyIGxlbjtcbiAgICAgICAgaWYgKGlzQXJyYXlMaWtlKGNvbGwpKSB7XG4gICAgICAgICAgICBsZW4gPSBjb2xsLmxlbmd0aDtcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiBuZXh0KCkge1xuICAgICAgICAgICAgICAgIGkrKztcbiAgICAgICAgICAgICAgICByZXR1cm4gaSA8IGxlbiA/IHsgdmFsdWU6IGNvbGxbaV0sIGtleTogaSB9IDogbnVsbDtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgaXRlcmF0ZSA9IGdldEl0ZXJhdG9yKGNvbGwpO1xuICAgICAgICBpZiAoaXRlcmF0ZSkge1xuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIG5leHQoKSB7XG4gICAgICAgICAgICAgICAgdmFyIGl0ZW0gPSBpdGVyYXRlLm5leHQoKTtcbiAgICAgICAgICAgICAgICBpZiAoaXRlbS5kb25lKSByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgICAgICBpKys7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgdmFsdWU6IGl0ZW0udmFsdWUsIGtleTogaSB9O1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBva2V5cyA9IGtleXMoY29sbCk7XG4gICAgICAgIGxlbiA9IG9rZXlzLmxlbmd0aDtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIG5leHQoKSB7XG4gICAgICAgICAgICBpKys7XG4gICAgICAgICAgICB2YXIga2V5ID0gb2tleXNbaV07XG4gICAgICAgICAgICByZXR1cm4gaSA8IGxlbiA/IHsgdmFsdWU6IGNvbGxba2V5XSwga2V5OiBrZXkgfSA6IG51bGw7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25seU9uY2UoZm4pIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmIChmbiA9PT0gbnVsbCkgdGhyb3cgbmV3IEVycm9yKFwiQ2FsbGJhY2sgd2FzIGFscmVhZHkgY2FsbGVkLlwiKTtcbiAgICAgICAgICAgIHZhciBjYWxsRm4gPSBmbjtcbiAgICAgICAgICAgIGZuID0gbnVsbDtcbiAgICAgICAgICAgIGNhbGxGbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIF9lYWNoT2ZMaW1pdChsaW1pdCkge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKG9iaiwgaXRlcmF0ZWUsIGNhbGxiYWNrKSB7XG4gICAgICAgICAgICBjYWxsYmFjayA9IG9uY2UoY2FsbGJhY2sgfHwgbm9vcCk7XG4gICAgICAgICAgICBvYmogPSBvYmogfHwgW107XG4gICAgICAgICAgICB2YXIgbmV4dEVsZW0gPSBpdGVyYXRvcihvYmopO1xuICAgICAgICAgICAgaWYgKGxpbWl0IDw9IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY2FsbGJhY2sobnVsbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgZG9uZSA9IGZhbHNlO1xuICAgICAgICAgICAgdmFyIHJ1bm5pbmcgPSAwO1xuICAgICAgICAgICAgdmFyIGVycm9yZWQgPSBmYWxzZTtcblxuICAgICAgICAgICAgKGZ1bmN0aW9uIHJlcGxlbmlzaCgpIHtcbiAgICAgICAgICAgICAgICBpZiAoZG9uZSAmJiBydW5uaW5nIDw9IDApIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNhbGxiYWNrKG51bGwpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHdoaWxlIChydW5uaW5nIDwgbGltaXQgJiYgIWVycm9yZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGVsZW0gPSBuZXh0RWxlbSgpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZWxlbSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZG9uZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocnVubmluZyA8PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2sobnVsbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcnVubmluZyArPSAxO1xuICAgICAgICAgICAgICAgICAgICBpdGVyYXRlZShlbGVtLnZhbHVlLCBlbGVtLmtleSwgb25seU9uY2UoZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcnVubmluZyAtPSAxO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKGVycik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3JlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcGxlbmlzaCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSkoKTtcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBkb1BhcmFsbGVsTGltaXQoZm4pIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChvYmosIGxpbWl0LCBpdGVyYXRlZSwgY2FsbGJhY2spIHtcbiAgICAgICAgICAgIHJldHVybiBmbihfZWFjaE9mTGltaXQobGltaXQpLCBvYmosIGl0ZXJhdGVlLCBjYWxsYmFjayk7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gX2FzeW5jTWFwKGVhY2hmbiwgYXJyLCBpdGVyYXRlZSwgY2FsbGJhY2spIHtcbiAgICAgICAgY2FsbGJhY2sgPSBvbmNlKGNhbGxiYWNrIHx8IG5vb3ApO1xuICAgICAgICBhcnIgPSBhcnIgfHwgW107XG4gICAgICAgIHZhciByZXN1bHRzID0gW107XG4gICAgICAgIHZhciBjb3VudGVyID0gMDtcblxuICAgICAgICBlYWNoZm4oYXJyLCBmdW5jdGlvbiAodmFsdWUsIF8sIGNhbGxiYWNrKSB7XG4gICAgICAgICAgICB2YXIgaW5kZXggPSBjb3VudGVyKys7XG4gICAgICAgICAgICBpdGVyYXRlZSh2YWx1ZSwgZnVuY3Rpb24gKGVyciwgdikge1xuICAgICAgICAgICAgICAgIHJlc3VsdHNbaW5kZXhdID0gdjtcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhlcnIpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgIGNhbGxiYWNrKGVyciwgcmVzdWx0cyk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRoZSBzYW1lIGFzIGBtYXBgIGJ1dCBydW5zIGEgbWF4aW11bSBvZiBgbGltaXRgIGFzeW5jIG9wZXJhdGlvbnMgYXQgYSB0aW1lLlxuICAgICAqXG4gICAgICogQG5hbWUgbWFwTGltaXRcbiAgICAgKiBAc3RhdGljXG4gICAgICogQG1lbWJlck9mIGFzeW5jXG4gICAgICogQHNlZSBhc3luYy5tYXBcbiAgICAgKiBAY2F0ZWdvcnkgQ29sbGVjdGlvblxuICAgICAqIEBwYXJhbSB7QXJyYXl8T2JqZWN0fSBjb2xsIC0gQSBjb2xsZWN0aW9uIHRvIGl0ZXJhdGUgb3Zlci5cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gbGltaXQgLSBUaGUgbWF4aW11bSBudW1iZXIgb2YgYXN5bmMgb3BlcmF0aW9ucyBhdCBhIHRpbWUuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gaXRlcmF0ZWUgLSBBIGZ1bmN0aW9uIHRvIGFwcGx5IHRvIGVhY2ggaXRlbSBpbiBgY29sbGAuXG4gICAgICogVGhlIGl0ZXJhdGVlIGlzIHBhc3NlZCBhIGBjYWxsYmFjayhlcnIsIHRyYW5zZm9ybWVkKWAgd2hpY2ggbXVzdCBiZSBjYWxsZWRcbiAgICAgKiBvbmNlIGl0IGhhcyBjb21wbGV0ZWQgd2l0aCBhbiBlcnJvciAod2hpY2ggY2FuIGJlIGBudWxsYCkgYW5kIGEgdHJhbnNmb3JtZWRcbiAgICAgKiBpdGVtLiBJbnZva2VkIHdpdGggKGl0ZW0sIGNhbGxiYWNrKS5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY2FsbGJhY2tdIC0gQSBjYWxsYmFjayB3aGljaCBpcyBjYWxsZWQgd2hlbiBhbGwgYGl0ZXJhdGVlYFxuICAgICAqIGZ1bmN0aW9ucyBoYXZlIGZpbmlzaGVkLCBvciBhbiBlcnJvciBvY2N1cnMuIFJlc3VsdHMgaXMgYW4gYXJyYXkgb2YgdGhlXG4gICAgICogdHJhbnNmb3JtZWQgaXRlbXMgZnJvbSB0aGUgYGNvbGxgLiBJbnZva2VkIHdpdGggKGVyciwgcmVzdWx0cykuXG4gICAgICovXG4gICAgdmFyIG1hcExpbWl0ID0gZG9QYXJhbGxlbExpbWl0KF9hc3luY01hcCk7XG5cbiAgICBmdW5jdGlvbiBkb0xpbWl0KGZuLCBsaW1pdCkge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGl0ZXJhYmxlLCBpdGVyYXRlZSwgY2FsbGJhY2spIHtcbiAgICAgICAgICAgIHJldHVybiBmbihpdGVyYWJsZSwgbGltaXQsIGl0ZXJhdGVlLCBjYWxsYmFjayk7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUHJvZHVjZXMgYSBuZXcgY29sbGVjdGlvbiBvZiB2YWx1ZXMgYnkgbWFwcGluZyBlYWNoIHZhbHVlIGluIGBjb2xsYCB0aHJvdWdoXG4gICAgICogdGhlIGBpdGVyYXRlZWAgZnVuY3Rpb24uIFRoZSBgaXRlcmF0ZWVgIGlzIGNhbGxlZCB3aXRoIGFuIGl0ZW0gZnJvbSBgY29sbGBcbiAgICAgKiBhbmQgYSBjYWxsYmFjayBmb3Igd2hlbiBpdCBoYXMgZmluaXNoZWQgcHJvY2Vzc2luZy4gRWFjaCBvZiB0aGVzZSBjYWxsYmFja1xuICAgICAqIHRha2VzIDIgYXJndW1lbnRzOiBhbiBgZXJyb3JgLCBhbmQgdGhlIHRyYW5zZm9ybWVkIGl0ZW0gZnJvbSBgY29sbGAuIElmXG4gICAgICogYGl0ZXJhdGVlYCBwYXNzZXMgYW4gZXJyb3IgdG8gaXRzIGNhbGxiYWNrLCB0aGUgbWFpbiBgY2FsbGJhY2tgIChmb3IgdGhlXG4gICAgICogYG1hcGAgZnVuY3Rpb24pIGlzIGltbWVkaWF0ZWx5IGNhbGxlZCB3aXRoIHRoZSBlcnJvci5cbiAgICAgKlxuICAgICAqIE5vdGUsIHRoYXQgc2luY2UgdGhpcyBmdW5jdGlvbiBhcHBsaWVzIHRoZSBgaXRlcmF0ZWVgIHRvIGVhY2ggaXRlbSBpblxuICAgICAqIHBhcmFsbGVsLCB0aGVyZSBpcyBubyBndWFyYW50ZWUgdGhhdCB0aGUgYGl0ZXJhdGVlYCBmdW5jdGlvbnMgd2lsbCBjb21wbGV0ZVxuICAgICAqIGluIG9yZGVyLiBIb3dldmVyLCB0aGUgcmVzdWx0cyBhcnJheSB3aWxsIGJlIGluIHRoZSBzYW1lIG9yZGVyIGFzIHRoZVxuICAgICAqIG9yaWdpbmFsIGBjb2xsYC5cbiAgICAgKlxuICAgICAqIElmIGBtYXBgIGlzIHBhc3NlZCBhbiBPYmplY3QsIHRoZSByZXN1bHRzIHdpbGwgYmUgYW4gQXJyYXkuICBUaGUgcmVzdWx0c1xuICAgICAqIHdpbGwgcm91Z2hseSBiZSBpbiB0aGUgb3JkZXIgb2YgdGhlIG9yaWdpbmFsIE9iamVjdHMnIGtleXMgKGJ1dCB0aGlzIGNhblxuICAgICAqIHZhcnkgYWNyb3NzIEphdmFTY3JpcHQgZW5naW5lcylcbiAgICAgKlxuICAgICAqIEBuYW1lIG1hcFxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAbWVtYmVyT2YgYXN5bmNcbiAgICAgKiBAY2F0ZWdvcnkgQ29sbGVjdGlvblxuICAgICAqIEBwYXJhbSB7QXJyYXl8T2JqZWN0fSBjb2xsIC0gQSBjb2xsZWN0aW9uIHRvIGl0ZXJhdGUgb3Zlci5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBpdGVyYXRlZSAtIEEgZnVuY3Rpb24gdG8gYXBwbHkgdG8gZWFjaCBpdGVtIGluIGBjb2xsYC5cbiAgICAgKiBUaGUgaXRlcmF0ZWUgaXMgcGFzc2VkIGEgYGNhbGxiYWNrKGVyciwgdHJhbnNmb3JtZWQpYCB3aGljaCBtdXN0IGJlIGNhbGxlZFxuICAgICAqIG9uY2UgaXQgaGFzIGNvbXBsZXRlZCB3aXRoIGFuIGVycm9yICh3aGljaCBjYW4gYmUgYG51bGxgKSBhbmQgYVxuICAgICAqIHRyYW5zZm9ybWVkIGl0ZW0uIEludm9rZWQgd2l0aCAoaXRlbSwgY2FsbGJhY2spLlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IFtjYWxsYmFja10gLSBBIGNhbGxiYWNrIHdoaWNoIGlzIGNhbGxlZCB3aGVuIGFsbCBgaXRlcmF0ZWVgXG4gICAgICogZnVuY3Rpb25zIGhhdmUgZmluaXNoZWQsIG9yIGFuIGVycm9yIG9jY3Vycy4gUmVzdWx0cyBpcyBhbiBBcnJheSBvZiB0aGVcbiAgICAgKiB0cmFuc2Zvcm1lZCBpdGVtcyBmcm9tIHRoZSBgY29sbGAuIEludm9rZWQgd2l0aCAoZXJyLCByZXN1bHRzKS5cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogYXN5bmMubWFwKFsnZmlsZTEnLCdmaWxlMicsJ2ZpbGUzJ10sIGZzLnN0YXQsIGZ1bmN0aW9uKGVyciwgcmVzdWx0cykge1xuICAgICAqICAgICAvLyByZXN1bHRzIGlzIG5vdyBhbiBhcnJheSBvZiBzdGF0cyBmb3IgZWFjaCBmaWxlXG4gICAgICogfSk7XG4gICAgICovXG4gICAgdmFyIG1hcCA9IGRvTGltaXQobWFwTGltaXQsIEluZmluaXR5KTtcblxuICAgIC8qKlxuICAgICAqIEFwcGxpZXMgdGhlIHByb3ZpZGVkIGFyZ3VtZW50cyB0byBlYWNoIGZ1bmN0aW9uIGluIHRoZSBhcnJheSwgY2FsbGluZ1xuICAgICAqIGBjYWxsYmFja2AgYWZ0ZXIgYWxsIGZ1bmN0aW9ucyBoYXZlIGNvbXBsZXRlZC4gSWYgeW91IG9ubHkgcHJvdmlkZSB0aGUgZmlyc3RcbiAgICAgKiBhcmd1bWVudCwgdGhlbiBpdCB3aWxsIHJldHVybiBhIGZ1bmN0aW9uIHdoaWNoIGxldHMgeW91IHBhc3MgaW4gdGhlXG4gICAgICogYXJndW1lbnRzIGFzIGlmIGl0IHdlcmUgYSBzaW5nbGUgZnVuY3Rpb24gY2FsbC5cbiAgICAgKlxuICAgICAqIEBuYW1lIGFwcGx5RWFjaFxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAbWVtYmVyT2YgYXN5bmNcbiAgICAgKiBAY2F0ZWdvcnkgQ29udHJvbCBGbG93XG4gICAgICogQHBhcmFtIHtBcnJheXxPYmplY3R9IGZucyAtIEEgY29sbGVjdGlvbiBvZiBhc3luY2hyb25vdXMgZnVuY3Rpb25zIHRvIGFsbFxuICAgICAqIGNhbGwgd2l0aCB0aGUgc2FtZSBhcmd1bWVudHNcbiAgICAgKiBAcGFyYW0gey4uLip9IFthcmdzXSAtIGFueSBudW1iZXIgb2Ygc2VwYXJhdGUgYXJndW1lbnRzIHRvIHBhc3MgdG8gdGhlXG4gICAgICogZnVuY3Rpb24uXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gW2NhbGxiYWNrXSAtIHRoZSBmaW5hbCBhcmd1bWVudCBzaG91bGQgYmUgdGhlIGNhbGxiYWNrLFxuICAgICAqIGNhbGxlZCB3aGVuIGFsbCBmdW5jdGlvbnMgaGF2ZSBjb21wbGV0ZWQgcHJvY2Vzc2luZy5cbiAgICAgKiBAcmV0dXJucyB7RnVuY3Rpb259IC0gSWYgb25seSB0aGUgZmlyc3QgYXJndW1lbnQgaXMgcHJvdmlkZWQsIGl0IHdpbGwgcmV0dXJuXG4gICAgICogYSBmdW5jdGlvbiB3aGljaCBsZXRzIHlvdSBwYXNzIGluIHRoZSBhcmd1bWVudHMgYXMgaWYgaXQgd2VyZSBhIHNpbmdsZVxuICAgICAqIGZ1bmN0aW9uIGNhbGwuXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqIGFzeW5jLmFwcGx5RWFjaChbZW5hYmxlU2VhcmNoLCB1cGRhdGVTY2hlbWFdLCAnYnVja2V0JywgY2FsbGJhY2spO1xuICAgICAqXG4gICAgICogLy8gcGFydGlhbCBhcHBsaWNhdGlvbiBleGFtcGxlOlxuICAgICAqIGFzeW5jLmVhY2goXG4gICAgICogICAgIGJ1Y2tldHMsXG4gICAgICogICAgIGFzeW5jLmFwcGx5RWFjaChbZW5hYmxlU2VhcmNoLCB1cGRhdGVTY2hlbWFdKSxcbiAgICAgKiAgICAgY2FsbGJhY2tcbiAgICAgKiApO1xuICAgICAqL1xuICAgIHZhciBhcHBseUVhY2ggPSBhcHBseUVhY2gkMShtYXApO1xuXG4gICAgLyoqXG4gICAgICogVGhlIHNhbWUgYXMgYG1hcGAgYnV0IHJ1bnMgb25seSBhIHNpbmdsZSBhc3luYyBvcGVyYXRpb24gYXQgYSB0aW1lLlxuICAgICAqXG4gICAgICogQG5hbWUgbWFwU2VyaWVzXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBtZW1iZXJPZiBhc3luY1xuICAgICAqIEBzZWUgYXN5bmMubWFwXG4gICAgICogQGNhdGVnb3J5IENvbGxlY3Rpb25cbiAgICAgKiBAcGFyYW0ge0FycmF5fE9iamVjdH0gY29sbCAtIEEgY29sbGVjdGlvbiB0byBpdGVyYXRlIG92ZXIuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gaXRlcmF0ZWUgLSBBIGZ1bmN0aW9uIHRvIGFwcGx5IHRvIGVhY2ggaXRlbSBpbiBgY29sbGAuXG4gICAgICogVGhlIGl0ZXJhdGVlIGlzIHBhc3NlZCBhIGBjYWxsYmFjayhlcnIsIHRyYW5zZm9ybWVkKWAgd2hpY2ggbXVzdCBiZSBjYWxsZWRcbiAgICAgKiBvbmNlIGl0IGhhcyBjb21wbGV0ZWQgd2l0aCBhbiBlcnJvciAod2hpY2ggY2FuIGJlIGBudWxsYCkgYW5kIGFcbiAgICAgKiB0cmFuc2Zvcm1lZCBpdGVtLiBJbnZva2VkIHdpdGggKGl0ZW0sIGNhbGxiYWNrKS5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY2FsbGJhY2tdIC0gQSBjYWxsYmFjayB3aGljaCBpcyBjYWxsZWQgd2hlbiBhbGwgYGl0ZXJhdGVlYFxuICAgICAqIGZ1bmN0aW9ucyBoYXZlIGZpbmlzaGVkLCBvciBhbiBlcnJvciBvY2N1cnMuIFJlc3VsdHMgaXMgYW4gYXJyYXkgb2YgdGhlXG4gICAgICogdHJhbnNmb3JtZWQgaXRlbXMgZnJvbSB0aGUgYGNvbGxgLiBJbnZva2VkIHdpdGggKGVyciwgcmVzdWx0cykuXG4gICAgICovXG4gICAgdmFyIG1hcFNlcmllcyA9IGRvTGltaXQobWFwTGltaXQsIDEpO1xuXG4gICAgLyoqXG4gICAgICogVGhlIHNhbWUgYXMgYGFwcGx5RWFjaGAgYnV0IHJ1bnMgb25seSBhIHNpbmdsZSBhc3luYyBvcGVyYXRpb24gYXQgYSB0aW1lLlxuICAgICAqXG4gICAgICogQG5hbWUgYXBwbHlFYWNoU2VyaWVzXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBtZW1iZXJPZiBhc3luY1xuICAgICAqIEBzZWUgYXN5bmMuYXBwbHlFYWNoXG4gICAgICogQGNhdGVnb3J5IENvbnRyb2wgRmxvd1xuICAgICAqIEBwYXJhbSB7QXJyYXl8T2JqZWN0fSBmbnMgLSBBIGNvbGxlY3Rpb24gb2YgYXN5bmNocm9ub3VzIGZ1bmN0aW9ucyB0byBhbGxcbiAgICAgKiBjYWxsIHdpdGggdGhlIHNhbWUgYXJndW1lbnRzXG4gICAgICogQHBhcmFtIHsuLi4qfSBbYXJnc10gLSBhbnkgbnVtYmVyIG9mIHNlcGFyYXRlIGFyZ3VtZW50cyB0byBwYXNzIHRvIHRoZVxuICAgICAqIGZ1bmN0aW9uLlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IFtjYWxsYmFja10gLSB0aGUgZmluYWwgYXJndW1lbnQgc2hvdWxkIGJlIHRoZSBjYWxsYmFjayxcbiAgICAgKiBjYWxsZWQgd2hlbiBhbGwgZnVuY3Rpb25zIGhhdmUgY29tcGxldGVkIHByb2Nlc3NpbmcuXG4gICAgICogQHJldHVybnMge0Z1bmN0aW9ufSAtIElmIG9ubHkgdGhlIGZpcnN0IGFyZ3VtZW50IGlzIHByb3ZpZGVkLCBpdCB3aWxsIHJldHVyblxuICAgICAqIGEgZnVuY3Rpb24gd2hpY2ggbGV0cyB5b3UgcGFzcyBpbiB0aGUgYXJndW1lbnRzIGFzIGlmIGl0IHdlcmUgYSBzaW5nbGVcbiAgICAgKiBmdW5jdGlvbiBjYWxsLlxuICAgICAqL1xuICAgIHZhciBhcHBseUVhY2hTZXJpZXMgPSBhcHBseUVhY2gkMShtYXBTZXJpZXMpO1xuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIGNvbnRpbnVhdGlvbiBmdW5jdGlvbiB3aXRoIHNvbWUgYXJndW1lbnRzIGFscmVhZHkgYXBwbGllZC5cbiAgICAgKlxuICAgICAqIFVzZWZ1bCBhcyBhIHNob3J0aGFuZCB3aGVuIGNvbWJpbmVkIHdpdGggb3RoZXIgY29udHJvbCBmbG93IGZ1bmN0aW9ucy4gQW55XG4gICAgICogYXJndW1lbnRzIHBhc3NlZCB0byB0aGUgcmV0dXJuZWQgZnVuY3Rpb24gYXJlIGFkZGVkIHRvIHRoZSBhcmd1bWVudHNcbiAgICAgKiBvcmlnaW5hbGx5IHBhc3NlZCB0byBhcHBseS5cbiAgICAgKlxuICAgICAqIEBuYW1lIGFwcGx5XG4gICAgICogQHN0YXRpY1xuICAgICAqIEBtZW1iZXJPZiBhc3luY1xuICAgICAqIEBjYXRlZ29yeSBVdGlsXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuY3Rpb24gLSBUaGUgZnVuY3Rpb24geW91IHdhbnQgdG8gZXZlbnR1YWxseSBhcHBseSBhbGxcbiAgICAgKiBhcmd1bWVudHMgdG8uIEludm9rZXMgd2l0aCAoYXJndW1lbnRzLi4uKS5cbiAgICAgKiBAcGFyYW0gey4uLip9IGFyZ3VtZW50cy4uLiAtIEFueSBudW1iZXIgb2YgYXJndW1lbnRzIHRvIGF1dG9tYXRpY2FsbHkgYXBwbHlcbiAgICAgKiB3aGVuIHRoZSBjb250aW51YXRpb24gaXMgY2FsbGVkLlxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiAvLyB1c2luZyBhcHBseVxuICAgICAqIGFzeW5jLnBhcmFsbGVsKFtcbiAgICAgKiAgICAgYXN5bmMuYXBwbHkoZnMud3JpdGVGaWxlLCAndGVzdGZpbGUxJywgJ3Rlc3QxJyksXG4gICAgICogICAgIGFzeW5jLmFwcGx5KGZzLndyaXRlRmlsZSwgJ3Rlc3RmaWxlMicsICd0ZXN0MicpXG4gICAgICogXSk7XG4gICAgICpcbiAgICAgKlxuICAgICAqIC8vIHRoZSBzYW1lIHByb2Nlc3Mgd2l0aG91dCB1c2luZyBhcHBseVxuICAgICAqIGFzeW5jLnBhcmFsbGVsKFtcbiAgICAgKiAgICAgZnVuY3Rpb24oY2FsbGJhY2spIHtcbiAgICAgKiAgICAgICAgIGZzLndyaXRlRmlsZSgndGVzdGZpbGUxJywgJ3Rlc3QxJywgY2FsbGJhY2spO1xuICAgICAqICAgICB9LFxuICAgICAqICAgICBmdW5jdGlvbihjYWxsYmFjaykge1xuICAgICAqICAgICAgICAgZnMud3JpdGVGaWxlKCd0ZXN0ZmlsZTInLCAndGVzdDInLCBjYWxsYmFjayk7XG4gICAgICogICAgIH1cbiAgICAgKiBdKTtcbiAgICAgKlxuICAgICAqIC8vIEl0J3MgcG9zc2libGUgdG8gcGFzcyBhbnkgbnVtYmVyIG9mIGFkZGl0aW9uYWwgYXJndW1lbnRzIHdoZW4gY2FsbGluZyB0aGVcbiAgICAgKiAvLyBjb250aW51YXRpb246XG4gICAgICpcbiAgICAgKiBub2RlPiB2YXIgZm4gPSBhc3luYy5hcHBseShzeXMucHV0cywgJ29uZScpO1xuICAgICAqIG5vZGU+IGZuKCd0d28nLCAndGhyZWUnKTtcbiAgICAgKiBvbmVcbiAgICAgKiB0d29cbiAgICAgKiB0aHJlZVxuICAgICAqL1xuICAgIHZhciBhcHBseSQxID0gcmVzdChmdW5jdGlvbiAoZm4sIGFyZ3MpIHtcbiAgICAgICAgcmV0dXJuIHJlc3QoZnVuY3Rpb24gKGNhbGxBcmdzKSB7XG4gICAgICAgICAgICByZXR1cm4gZm4uYXBwbHkobnVsbCwgYXJncy5jb25jYXQoY2FsbEFyZ3MpKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICAvKipcbiAgICAgKiBUYWtlIGEgc3luYyBmdW5jdGlvbiBhbmQgbWFrZSBpdCBhc3luYywgcGFzc2luZyBpdHMgcmV0dXJuIHZhbHVlIHRvIGFcbiAgICAgKiBjYWxsYmFjay4gVGhpcyBpcyB1c2VmdWwgZm9yIHBsdWdnaW5nIHN5bmMgZnVuY3Rpb25zIGludG8gYSB3YXRlcmZhbGwsXG4gICAgICogc2VyaWVzLCBvciBvdGhlciBhc3luYyBmdW5jdGlvbnMuIEFueSBhcmd1bWVudHMgcGFzc2VkIHRvIHRoZSBnZW5lcmF0ZWRcbiAgICAgKiBmdW5jdGlvbiB3aWxsIGJlIHBhc3NlZCB0byB0aGUgd3JhcHBlZCBmdW5jdGlvbiAoZXhjZXB0IGZvciB0aGUgZmluYWxcbiAgICAgKiBjYWxsYmFjayBhcmd1bWVudCkuIEVycm9ycyB0aHJvd24gd2lsbCBiZSBwYXNzZWQgdG8gdGhlIGNhbGxiYWNrLlxuICAgICAqXG4gICAgICogSWYgdGhlIGZ1bmN0aW9uIHBhc3NlZCB0byBgYXN5bmNpZnlgIHJldHVybnMgYSBQcm9taXNlLCB0aGF0IHByb21pc2VzJ3NcbiAgICAgKiByZXNvbHZlZC9yZWplY3RlZCBzdGF0ZSB3aWxsIGJlIHVzZWQgdG8gY2FsbCB0aGUgY2FsbGJhY2ssIHJhdGhlciB0aGFuIHNpbXBseVxuICAgICAqIHRoZSBzeW5jaHJvbm91cyByZXR1cm4gdmFsdWUuXG4gICAgICpcbiAgICAgKiBUaGlzIGFsc28gbWVhbnMgeW91IGNhbiBhc3luY2lmeSBFUzIwMTYgYGFzeW5jYCBmdW5jdGlvbnMuXG4gICAgICpcbiAgICAgKiBAbmFtZSBhc3luY2lmeVxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAbWVtYmVyT2YgYXN5bmNcbiAgICAgKiBAYWxpYXMgd3JhcFN5bmNcbiAgICAgKiBAY2F0ZWdvcnkgVXRpbFxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgLSBUaGUgc3luY2hyb25vdXMgZnVuY3Rpb24gdG8gY29udmVydCB0byBhblxuICAgICAqIGFzeW5jaHJvbm91cyBmdW5jdGlvbi5cbiAgICAgKiBAcmV0dXJucyB7RnVuY3Rpb259IEFuIGFzeW5jaHJvbm91cyB3cmFwcGVyIG9mIHRoZSBgZnVuY2AuIFRvIGJlIGludm9rZWQgd2l0aFxuICAgICAqIChjYWxsYmFjaykuXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqIC8vIHBhc3NpbmcgYSByZWd1bGFyIHN5bmNocm9ub3VzIGZ1bmN0aW9uXG4gICAgICogYXN5bmMud2F0ZXJmYWxsKFtcbiAgICAgKiAgICAgYXN5bmMuYXBwbHkoZnMucmVhZEZpbGUsIGZpbGVuYW1lLCBcInV0ZjhcIiksXG4gICAgICogICAgIGFzeW5jLmFzeW5jaWZ5KEpTT04ucGFyc2UpLFxuICAgICAqICAgICBmdW5jdGlvbiAoZGF0YSwgbmV4dCkge1xuICAgICAqICAgICAgICAgLy8gZGF0YSBpcyB0aGUgcmVzdWx0IG9mIHBhcnNpbmcgdGhlIHRleHQuXG4gICAgICogICAgICAgICAvLyBJZiB0aGVyZSB3YXMgYSBwYXJzaW5nIGVycm9yLCBpdCB3b3VsZCBoYXZlIGJlZW4gY2F1Z2h0LlxuICAgICAqICAgICB9XG4gICAgICogXSwgY2FsbGJhY2spO1xuICAgICAqXG4gICAgICogLy8gcGFzc2luZyBhIGZ1bmN0aW9uIHJldHVybmluZyBhIHByb21pc2VcbiAgICAgKiBhc3luYy53YXRlcmZhbGwoW1xuICAgICAqICAgICBhc3luYy5hcHBseShmcy5yZWFkRmlsZSwgZmlsZW5hbWUsIFwidXRmOFwiKSxcbiAgICAgKiAgICAgYXN5bmMuYXN5bmNpZnkoZnVuY3Rpb24gKGNvbnRlbnRzKSB7XG4gICAgICogICAgICAgICByZXR1cm4gZGIubW9kZWwuY3JlYXRlKGNvbnRlbnRzKTtcbiAgICAgKiAgICAgfSksXG4gICAgICogICAgIGZ1bmN0aW9uIChtb2RlbCwgbmV4dCkge1xuICAgICAqICAgICAgICAgLy8gYG1vZGVsYCBpcyB0aGUgaW5zdGFudGlhdGVkIG1vZGVsIG9iamVjdC5cbiAgICAgKiAgICAgICAgIC8vIElmIHRoZXJlIHdhcyBhbiBlcnJvciwgdGhpcyBmdW5jdGlvbiB3b3VsZCBiZSBza2lwcGVkLlxuICAgICAqICAgICB9XG4gICAgICogXSwgY2FsbGJhY2spO1xuICAgICAqXG4gICAgICogLy8gZXM2IGV4YW1wbGVcbiAgICAgKiB2YXIgcSA9IGFzeW5jLnF1ZXVlKGFzeW5jLmFzeW5jaWZ5KGFzeW5jIGZ1bmN0aW9uKGZpbGUpIHtcbiAgICAgKiAgICAgdmFyIGludGVybWVkaWF0ZVN0ZXAgPSBhd2FpdCBwcm9jZXNzRmlsZShmaWxlKTtcbiAgICAgKiAgICAgcmV0dXJuIGF3YWl0IHNvbWVQcm9taXNlKGludGVybWVkaWF0ZVN0ZXApXG4gICAgICogfSkpO1xuICAgICAqXG4gICAgICogcS5wdXNoKGZpbGVzKTtcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBhc3luY2lmeShmdW5jKSB7XG4gICAgICAgIHJldHVybiBpbml0aWFsUGFyYW1zKGZ1bmN0aW9uIChhcmdzLCBjYWxsYmFjaykge1xuICAgICAgICAgICAgdmFyIHJlc3VsdDtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gZnVuYy5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY2FsbGJhY2soZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBpZiByZXN1bHQgaXMgUHJvbWlzZSBvYmplY3RcbiAgICAgICAgICAgIGlmIChpc09iamVjdChyZXN1bHQpICYmIHR5cGVvZiByZXN1bHQudGhlbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgIHJlc3VsdC50aGVuKGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayhudWxsLCB2YWx1ZSk7XG4gICAgICAgICAgICAgICAgfSlbJ2NhdGNoJ10oZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayhlcnIubWVzc2FnZSA/IGVyciA6IG5ldyBFcnJvcihlcnIpKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2sobnVsbCwgcmVzdWx0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBfLmZvckVhY2hgIGZvciBhcnJheXMgd2l0aG91dCBzdXBwb3J0IGZvclxuICAgICAqIGl0ZXJhdGVlIHNob3J0aGFuZHMuXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBwYXJhbSB7QXJyYXl9IFthcnJheV0gVGhlIGFycmF5IHRvIGl0ZXJhdGUgb3Zlci5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBpdGVyYXRlZSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICAgICAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyBgYXJyYXlgLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGFycmF5RWFjaChhcnJheSwgaXRlcmF0ZWUpIHtcbiAgICAgIHZhciBpbmRleCA9IC0xLFxuICAgICAgICAgIGxlbmd0aCA9IGFycmF5ID8gYXJyYXkubGVuZ3RoIDogMDtcblxuICAgICAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICAgICAgaWYgKGl0ZXJhdGVlKGFycmF5W2luZGV4XSwgaW5kZXgsIGFycmF5KSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIGFycmF5O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBiYXNlIGZ1bmN0aW9uIGZvciBtZXRob2RzIGxpa2UgYF8uZm9ySW5gIGFuZCBgXy5mb3JPd25gLlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtmcm9tUmlnaHRdIFNwZWNpZnkgaXRlcmF0aW5nIGZyb20gcmlnaHQgdG8gbGVmdC5cbiAgICAgKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBiYXNlIGZ1bmN0aW9uLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGNyZWF0ZUJhc2VGb3IoZnJvbVJpZ2h0KSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24ob2JqZWN0LCBpdGVyYXRlZSwga2V5c0Z1bmMpIHtcbiAgICAgICAgdmFyIGluZGV4ID0gLTEsXG4gICAgICAgICAgICBpdGVyYWJsZSA9IE9iamVjdChvYmplY3QpLFxuICAgICAgICAgICAgcHJvcHMgPSBrZXlzRnVuYyhvYmplY3QpLFxuICAgICAgICAgICAgbGVuZ3RoID0gcHJvcHMubGVuZ3RoO1xuXG4gICAgICAgIHdoaWxlIChsZW5ndGgtLSkge1xuICAgICAgICAgIHZhciBrZXkgPSBwcm9wc1tmcm9tUmlnaHQgPyBsZW5ndGggOiArK2luZGV4XTtcbiAgICAgICAgICBpZiAoaXRlcmF0ZWUoaXRlcmFibGVba2V5XSwga2V5LCBpdGVyYWJsZSkgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG9iamVjdDtcbiAgICAgIH07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYGJhc2VGb3JPd25gIHdoaWNoIGl0ZXJhdGVzIG92ZXIgYG9iamVjdGBcbiAgICAgKiBwcm9wZXJ0aWVzIHJldHVybmVkIGJ5IGBrZXlzRnVuY2AgYW5kIGludm9rZXMgYGl0ZXJhdGVlYCBmb3IgZWFjaCBwcm9wZXJ0eS5cbiAgICAgKiBJdGVyYXRlZSBmdW5jdGlvbnMgbWF5IGV4aXQgaXRlcmF0aW9uIGVhcmx5IGJ5IGV4cGxpY2l0bHkgcmV0dXJuaW5nIGBmYWxzZWAuXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBpdGVyYXRlIG92ZXIuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gaXRlcmF0ZWUgVGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIGl0ZXJhdGlvbi5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBrZXlzRnVuYyBUaGUgZnVuY3Rpb24gdG8gZ2V0IHRoZSBrZXlzIG9mIGBvYmplY3RgLlxuICAgICAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgYG9iamVjdGAuXG4gICAgICovXG4gICAgdmFyIGJhc2VGb3IgPSBjcmVhdGVCYXNlRm9yKCk7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5mb3JPd25gIHdpdGhvdXQgc3VwcG9ydCBmb3IgaXRlcmF0ZWUgc2hvcnRoYW5kcy5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIGl0ZXJhdGUgb3Zlci5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBpdGVyYXRlZSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICAgICAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgYG9iamVjdGAuXG4gICAgICovXG4gICAgZnVuY3Rpb24gYmFzZUZvck93bihvYmplY3QsIGl0ZXJhdGVlKSB7XG4gICAgICByZXR1cm4gb2JqZWN0ICYmIGJhc2VGb3Iob2JqZWN0LCBpdGVyYXRlZSwga2V5cyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyBhbGwga2V5LXZhbHVlIGVudHJpZXMgZnJvbSB0aGUgbGlzdCBjYWNoZS5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICogQG5hbWUgY2xlYXJcbiAgICAgKiBAbWVtYmVyT2YgTGlzdENhY2hlXG4gICAgICovXG4gICAgZnVuY3Rpb24gbGlzdENhY2hlQ2xlYXIoKSB7XG4gICAgICB0aGlzLl9fZGF0YV9fID0gW107XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUGVyZm9ybXMgYVxuICAgICAqIFtgU2FtZVZhbHVlWmVyb2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzYuMC8jc2VjLXNhbWV2YWx1ZXplcm8pXG4gICAgICogY29tcGFyaXNvbiBiZXR3ZWVuIHR3byB2YWx1ZXMgdG8gZGV0ZXJtaW5lIGlmIHRoZXkgYXJlIGVxdWl2YWxlbnQuXG4gICAgICpcbiAgICAgKiBAc3RhdGljXG4gICAgICogQG1lbWJlck9mIF9cbiAgICAgKiBAc2luY2UgNC4wLjBcbiAgICAgKiBAY2F0ZWdvcnkgTGFuZ1xuICAgICAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNvbXBhcmUuXG4gICAgICogQHBhcmFtIHsqfSBvdGhlciBUaGUgb3RoZXIgdmFsdWUgdG8gY29tcGFyZS5cbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIHZhbHVlcyBhcmUgZXF1aXZhbGVudCwgZWxzZSBgZmFsc2VgLlxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiB2YXIgb2JqZWN0ID0geyAndXNlcic6ICdmcmVkJyB9O1xuICAgICAqIHZhciBvdGhlciA9IHsgJ3VzZXInOiAnZnJlZCcgfTtcbiAgICAgKlxuICAgICAqIF8uZXEob2JqZWN0LCBvYmplY3QpO1xuICAgICAqIC8vID0+IHRydWVcbiAgICAgKlxuICAgICAqIF8uZXEob2JqZWN0LCBvdGhlcik7XG4gICAgICogLy8gPT4gZmFsc2VcbiAgICAgKlxuICAgICAqIF8uZXEoJ2EnLCAnYScpO1xuICAgICAqIC8vID0+IHRydWVcbiAgICAgKlxuICAgICAqIF8uZXEoJ2EnLCBPYmplY3QoJ2EnKSk7XG4gICAgICogLy8gPT4gZmFsc2VcbiAgICAgKlxuICAgICAqIF8uZXEoTmFOLCBOYU4pO1xuICAgICAqIC8vID0+IHRydWVcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBlcSh2YWx1ZSwgb3RoZXIpIHtcbiAgICAgIHJldHVybiB2YWx1ZSA9PT0gb3RoZXIgfHwgKHZhbHVlICE9PSB2YWx1ZSAmJiBvdGhlciAhPT0gb3RoZXIpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIGluZGV4IGF0IHdoaWNoIHRoZSBga2V5YCBpcyBmb3VuZCBpbiBgYXJyYXlgIG9mIGtleS12YWx1ZSBwYWlycy5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIHNlYXJjaC5cbiAgICAgKiBAcGFyYW0geyp9IGtleSBUaGUga2V5IHRvIHNlYXJjaCBmb3IuXG4gICAgICogQHJldHVybnMge251bWJlcn0gUmV0dXJucyB0aGUgaW5kZXggb2YgdGhlIG1hdGNoZWQgdmFsdWUsIGVsc2UgYC0xYC5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBhc3NvY0luZGV4T2YoYXJyYXksIGtleSkge1xuICAgICAgdmFyIGxlbmd0aCA9IGFycmF5Lmxlbmd0aDtcbiAgICAgIHdoaWxlIChsZW5ndGgtLSkge1xuICAgICAgICBpZiAoZXEoYXJyYXlbbGVuZ3RoXVswXSwga2V5KSkge1xuICAgICAgICAgIHJldHVybiBsZW5ndGg7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiAtMTtcbiAgICB9XG5cbiAgICAvKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG4gICAgdmFyIGFycmF5UHJvdG8gPSBBcnJheS5wcm90b3R5cGU7XG5cbiAgICAvKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cbiAgICB2YXIgc3BsaWNlID0gYXJyYXlQcm90by5zcGxpY2U7XG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIGBrZXlgIGFuZCBpdHMgdmFsdWUgZnJvbSB0aGUgbGlzdCBjYWNoZS5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICogQG5hbWUgZGVsZXRlXG4gICAgICogQG1lbWJlck9mIExpc3RDYWNoZVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gcmVtb3ZlLlxuICAgICAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgZW50cnkgd2FzIHJlbW92ZWQsIGVsc2UgYGZhbHNlYC5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBsaXN0Q2FjaGVEZWxldGUoa2V5KSB7XG4gICAgICB2YXIgZGF0YSA9IHRoaXMuX19kYXRhX18sXG4gICAgICAgICAgaW5kZXggPSBhc3NvY0luZGV4T2YoZGF0YSwga2V5KTtcblxuICAgICAgaWYgKGluZGV4IDwgMCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICB2YXIgbGFzdEluZGV4ID0gZGF0YS5sZW5ndGggLSAxO1xuICAgICAgaWYgKGluZGV4ID09IGxhc3RJbmRleCkge1xuICAgICAgICBkYXRhLnBvcCgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc3BsaWNlLmNhbGwoZGF0YSwgaW5kZXgsIDEpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgbGlzdCBjYWNoZSB2YWx1ZSBmb3IgYGtleWAuXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBuYW1lIGdldFxuICAgICAqIEBtZW1iZXJPZiBMaXN0Q2FjaGVcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIGdldC5cbiAgICAgKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgZW50cnkgdmFsdWUuXG4gICAgICovXG4gICAgZnVuY3Rpb24gbGlzdENhY2hlR2V0KGtleSkge1xuICAgICAgdmFyIGRhdGEgPSB0aGlzLl9fZGF0YV9fLFxuICAgICAgICAgIGluZGV4ID0gYXNzb2NJbmRleE9mKGRhdGEsIGtleSk7XG5cbiAgICAgIHJldHVybiBpbmRleCA8IDAgPyB1bmRlZmluZWQgOiBkYXRhW2luZGV4XVsxXTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDaGVja3MgaWYgYSBsaXN0IGNhY2hlIHZhbHVlIGZvciBga2V5YCBleGlzdHMuXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBuYW1lIGhhc1xuICAgICAqIEBtZW1iZXJPZiBMaXN0Q2FjaGVcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIGVudHJ5IHRvIGNoZWNrLlxuICAgICAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBhbiBlbnRyeSBmb3IgYGtleWAgZXhpc3RzLCBlbHNlIGBmYWxzZWAuXG4gICAgICovXG4gICAgZnVuY3Rpb24gbGlzdENhY2hlSGFzKGtleSkge1xuICAgICAgcmV0dXJuIGFzc29jSW5kZXhPZih0aGlzLl9fZGF0YV9fLCBrZXkpID4gLTE7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgbGlzdCBjYWNoZSBga2V5YCB0byBgdmFsdWVgLlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAbmFtZSBzZXRcbiAgICAgKiBAbWVtYmVyT2YgTGlzdENhY2hlXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byBzZXQuXG4gICAgICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gc2V0LlxuICAgICAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIGxpc3QgY2FjaGUgaW5zdGFuY2UuXG4gICAgICovXG4gICAgZnVuY3Rpb24gbGlzdENhY2hlU2V0KGtleSwgdmFsdWUpIHtcbiAgICAgIHZhciBkYXRhID0gdGhpcy5fX2RhdGFfXyxcbiAgICAgICAgICBpbmRleCA9IGFzc29jSW5kZXhPZihkYXRhLCBrZXkpO1xuXG4gICAgICBpZiAoaW5kZXggPCAwKSB7XG4gICAgICAgIGRhdGEucHVzaChba2V5LCB2YWx1ZV0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZGF0YVtpbmRleF1bMV0gPSB2YWx1ZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYW4gbGlzdCBjYWNoZSBvYmplY3QuXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBjb25zdHJ1Y3RvclxuICAgICAqIEBwYXJhbSB7QXJyYXl9IFtlbnRyaWVzXSBUaGUga2V5LXZhbHVlIHBhaXJzIHRvIGNhY2hlLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIExpc3RDYWNoZShlbnRyaWVzKSB7XG4gICAgICB2YXIgaW5kZXggPSAtMSxcbiAgICAgICAgICBsZW5ndGggPSBlbnRyaWVzID8gZW50cmllcy5sZW5ndGggOiAwO1xuXG4gICAgICB0aGlzLmNsZWFyKCk7XG4gICAgICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgICAgICB2YXIgZW50cnkgPSBlbnRyaWVzW2luZGV4XTtcbiAgICAgICAgdGhpcy5zZXQoZW50cnlbMF0sIGVudHJ5WzFdKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBBZGQgbWV0aG9kcyB0byBgTGlzdENhY2hlYC5cbiAgICBMaXN0Q2FjaGUucHJvdG90eXBlLmNsZWFyID0gbGlzdENhY2hlQ2xlYXI7XG4gICAgTGlzdENhY2hlLnByb3RvdHlwZVsnZGVsZXRlJ10gPSBsaXN0Q2FjaGVEZWxldGU7XG4gICAgTGlzdENhY2hlLnByb3RvdHlwZS5nZXQgPSBsaXN0Q2FjaGVHZXQ7XG4gICAgTGlzdENhY2hlLnByb3RvdHlwZS5oYXMgPSBsaXN0Q2FjaGVIYXM7XG4gICAgTGlzdENhY2hlLnByb3RvdHlwZS5zZXQgPSBsaXN0Q2FjaGVTZXQ7XG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIGFsbCBrZXktdmFsdWUgZW50cmllcyBmcm9tIHRoZSBzdGFjay5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICogQG5hbWUgY2xlYXJcbiAgICAgKiBAbWVtYmVyT2YgU3RhY2tcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBzdGFja0NsZWFyKCkge1xuICAgICAgdGhpcy5fX2RhdGFfXyA9IG5ldyBMaXN0Q2FjaGU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyBga2V5YCBhbmQgaXRzIHZhbHVlIGZyb20gdGhlIHN0YWNrLlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAbmFtZSBkZWxldGVcbiAgICAgKiBAbWVtYmVyT2YgU3RhY2tcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIHJlbW92ZS5cbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIGVudHJ5IHdhcyByZW1vdmVkLCBlbHNlIGBmYWxzZWAuXG4gICAgICovXG4gICAgZnVuY3Rpb24gc3RhY2tEZWxldGUoa2V5KSB7XG4gICAgICByZXR1cm4gdGhpcy5fX2RhdGFfX1snZGVsZXRlJ10oa2V5KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBzdGFjayB2YWx1ZSBmb3IgYGtleWAuXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBuYW1lIGdldFxuICAgICAqIEBtZW1iZXJPZiBTdGFja1xuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gZ2V0LlxuICAgICAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBlbnRyeSB2YWx1ZS5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBzdGFja0dldChrZXkpIHtcbiAgICAgIHJldHVybiB0aGlzLl9fZGF0YV9fLmdldChrZXkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENoZWNrcyBpZiBhIHN0YWNrIHZhbHVlIGZvciBga2V5YCBleGlzdHMuXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBuYW1lIGhhc1xuICAgICAqIEBtZW1iZXJPZiBTdGFja1xuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgZW50cnkgdG8gY2hlY2suXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGFuIGVudHJ5IGZvciBga2V5YCBleGlzdHMsIGVsc2UgYGZhbHNlYC5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBzdGFja0hhcyhrZXkpIHtcbiAgICAgIHJldHVybiB0aGlzLl9fZGF0YV9fLmhhcyhrZXkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgaG9zdCBvYmplY3QgaW4gSUUgPCA5LlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIGhvc3Qgb2JqZWN0LCBlbHNlIGBmYWxzZWAuXG4gICAgICovXG4gICAgZnVuY3Rpb24gaXNIb3N0T2JqZWN0KHZhbHVlKSB7XG4gICAgICAvLyBNYW55IGhvc3Qgb2JqZWN0cyBhcmUgYE9iamVjdGAgb2JqZWN0cyB0aGF0IGNhbiBjb2VyY2UgdG8gc3RyaW5nc1xuICAgICAgLy8gZGVzcGl0ZSBoYXZpbmcgaW1wcm9wZXJseSBkZWZpbmVkIGB0b1N0cmluZ2AgbWV0aG9kcy5cbiAgICAgIHZhciByZXN1bHQgPSBmYWxzZTtcbiAgICAgIGlmICh2YWx1ZSAhPSBudWxsICYmIHR5cGVvZiB2YWx1ZS50b1N0cmluZyAhPSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgcmVzdWx0ID0gISEodmFsdWUgKyAnJyk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHt9XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgZ2xvYmFsIG9iamVjdC5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gICAgICogQHJldHVybnMge251bGx8T2JqZWN0fSBSZXR1cm5zIGB2YWx1ZWAgaWYgaXQncyBhIGdsb2JhbCBvYmplY3QsIGVsc2UgYG51bGxgLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGNoZWNrR2xvYmFsKHZhbHVlKSB7XG4gICAgICByZXR1cm4gKHZhbHVlICYmIHZhbHVlLk9iamVjdCA9PT0gT2JqZWN0KSA/IHZhbHVlIDogbnVsbDtcbiAgICB9XG5cbiAgICAvKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYGdsb2JhbGAgZnJvbSBOb2RlLmpzLiAqL1xuICAgIHZhciBmcmVlR2xvYmFsID0gY2hlY2tHbG9iYWwodHlwZW9mIGdsb2JhbCA9PSAnb2JqZWN0JyAmJiBnbG9iYWwpO1xuXG4gICAgLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBzZWxmYC4gKi9cbiAgICB2YXIgZnJlZVNlbGYgPSBjaGVja0dsb2JhbCh0eXBlb2Ygc2VsZiA9PSAnb2JqZWN0JyAmJiBzZWxmKTtcblxuICAgIC8qKiBEZXRlY3QgYHRoaXNgIGFzIHRoZSBnbG9iYWwgb2JqZWN0LiAqL1xuICAgIHZhciB0aGlzR2xvYmFsID0gY2hlY2tHbG9iYWwodHlwZW9mIHRoaXMgPT0gJ29iamVjdCcgJiYgdGhpcyk7XG5cbiAgICAvKiogVXNlZCBhcyBhIHJlZmVyZW5jZSB0byB0aGUgZ2xvYmFsIG9iamVjdC4gKi9cbiAgICB2YXIgcm9vdCA9IGZyZWVHbG9iYWwgfHwgZnJlZVNlbGYgfHwgdGhpc0dsb2JhbCB8fCBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXG4gICAgLyoqIFVzZWQgdG8gZGV0ZWN0IG92ZXJyZWFjaGluZyBjb3JlLWpzIHNoaW1zLiAqL1xuICAgIHZhciBjb3JlSnNEYXRhID0gcm9vdFsnX19jb3JlLWpzX3NoYXJlZF9fJ107XG5cbiAgICAvKiogVXNlZCB0byBkZXRlY3QgbWV0aG9kcyBtYXNxdWVyYWRpbmcgYXMgbmF0aXZlLiAqL1xuICAgIHZhciBtYXNrU3JjS2V5ID0gKGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIHVpZCA9IC9bXi5dKyQvLmV4ZWMoY29yZUpzRGF0YSAmJiBjb3JlSnNEYXRhLmtleXMgJiYgY29yZUpzRGF0YS5rZXlzLklFX1BST1RPIHx8ICcnKTtcbiAgICAgIHJldHVybiB1aWQgPyAoJ1N5bWJvbChzcmMpXzEuJyArIHVpZCkgOiAnJztcbiAgICB9KCkpO1xuXG4gICAgLyoqXG4gICAgICogQ2hlY2tzIGlmIGBmdW5jYCBoYXMgaXRzIHNvdXJjZSBtYXNrZWQuXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGNoZWNrLlxuICAgICAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgZnVuY2AgaXMgbWFza2VkLCBlbHNlIGBmYWxzZWAuXG4gICAgICovXG4gICAgZnVuY3Rpb24gaXNNYXNrZWQoZnVuYykge1xuICAgICAgcmV0dXJuICEhbWFza1NyY0tleSAmJiAobWFza1NyY0tleSBpbiBmdW5jKTtcbiAgICB9XG5cbiAgICAvKiogVXNlZCB0byByZXNvbHZlIHRoZSBkZWNvbXBpbGVkIHNvdXJjZSBvZiBmdW5jdGlvbnMuICovXG4gICAgdmFyIGZ1bmNUb1N0cmluZyQxID0gRnVuY3Rpb24ucHJvdG90eXBlLnRvU3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogQ29udmVydHMgYGZ1bmNgIHRvIGl0cyBzb3VyY2UgY29kZS5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gcHJvY2Vzcy5cbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBzb3VyY2UgY29kZS5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiB0b1NvdXJjZShmdW5jKSB7XG4gICAgICBpZiAoZnVuYyAhPSBudWxsKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgcmV0dXJuIGZ1bmNUb1N0cmluZyQxLmNhbGwoZnVuYyk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHt9XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgcmV0dXJuIChmdW5jICsgJycpO1xuICAgICAgICB9IGNhdGNoIChlKSB7fVxuICAgICAgfVxuICAgICAgcmV0dXJuICcnO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFVzZWQgdG8gbWF0Y2ggYFJlZ0V4cGBcbiAgICAgKiBbc3ludGF4IGNoYXJhY3RlcnNdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzYuMC8jc2VjLXBhdHRlcm5zKS5cbiAgICAgKi9cbiAgICB2YXIgcmVSZWdFeHBDaGFyID0gL1tcXFxcXiQuKis/KClbXFxde318XS9nO1xuXG4gICAgLyoqIFVzZWQgdG8gZGV0ZWN0IGhvc3QgY29uc3RydWN0b3JzIChTYWZhcmkpLiAqL1xuICAgIHZhciByZUlzSG9zdEN0b3IgPSAvXlxcW29iamVjdCAuKz9Db25zdHJ1Y3RvclxcXSQvO1xuXG4gICAgLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xuICAgIHZhciBvYmplY3RQcm90byQ2ID0gT2JqZWN0LnByb3RvdHlwZTtcblxuICAgIC8qKiBVc2VkIHRvIHJlc29sdmUgdGhlIGRlY29tcGlsZWQgc291cmNlIG9mIGZ1bmN0aW9ucy4gKi9cbiAgICB2YXIgZnVuY1RvU3RyaW5nID0gRnVuY3Rpb24ucHJvdG90eXBlLnRvU3RyaW5nO1xuXG4gICAgLyoqIFVzZWQgdG8gY2hlY2sgb2JqZWN0cyBmb3Igb3duIHByb3BlcnRpZXMuICovXG4gICAgdmFyIGhhc093blByb3BlcnR5JDIgPSBvYmplY3RQcm90byQ2Lmhhc093blByb3BlcnR5O1xuXG4gICAgLyoqIFVzZWQgdG8gZGV0ZWN0IGlmIGEgbWV0aG9kIGlzIG5hdGl2ZS4gKi9cbiAgICB2YXIgcmVJc05hdGl2ZSA9IFJlZ0V4cCgnXicgK1xuICAgICAgZnVuY1RvU3RyaW5nLmNhbGwoaGFzT3duUHJvcGVydHkkMikucmVwbGFjZShyZVJlZ0V4cENoYXIsICdcXFxcJCYnKVxuICAgICAgLnJlcGxhY2UoL2hhc093blByb3BlcnR5fChmdW5jdGlvbikuKj8oPz1cXFxcXFwoKXwgZm9yIC4rPyg/PVxcXFxcXF0pL2csICckMS4qPycpICsgJyQnXG4gICAgKTtcblxuICAgIC8qKlxuICAgICAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmlzTmF0aXZlYCB3aXRob3V0IGJhZCBzaGltIGNoZWNrcy5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBuYXRpdmUgZnVuY3Rpb24sXG4gICAgICogIGVsc2UgYGZhbHNlYC5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBiYXNlSXNOYXRpdmUodmFsdWUpIHtcbiAgICAgIGlmICghaXNPYmplY3QodmFsdWUpIHx8IGlzTWFza2VkKHZhbHVlKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICB2YXIgcGF0dGVybiA9IChpc0Z1bmN0aW9uKHZhbHVlKSB8fCBpc0hvc3RPYmplY3QodmFsdWUpKSA/IHJlSXNOYXRpdmUgOiByZUlzSG9zdEN0b3I7XG4gICAgICByZXR1cm4gcGF0dGVybi50ZXN0KHRvU291cmNlKHZhbHVlKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgdmFsdWUgYXQgYGtleWAgb2YgYG9iamVjdGAuXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBbb2JqZWN0XSBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgcHJvcGVydHkgdG8gZ2V0LlxuICAgICAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBwcm9wZXJ0eSB2YWx1ZS5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBnZXRWYWx1ZShvYmplY3QsIGtleSkge1xuICAgICAgcmV0dXJuIG9iamVjdCA9PSBudWxsID8gdW5kZWZpbmVkIDogb2JqZWN0W2tleV07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgbmF0aXZlIGZ1bmN0aW9uIGF0IGBrZXlgIG9mIGBvYmplY3RgLlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBtZXRob2QgdG8gZ2V0LlxuICAgICAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBmdW5jdGlvbiBpZiBpdCdzIG5hdGl2ZSwgZWxzZSBgdW5kZWZpbmVkYC5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBnZXROYXRpdmUob2JqZWN0LCBrZXkpIHtcbiAgICAgIHZhciB2YWx1ZSA9IGdldFZhbHVlKG9iamVjdCwga2V5KTtcbiAgICAgIHJldHVybiBiYXNlSXNOYXRpdmUodmFsdWUpID8gdmFsdWUgOiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgLyogQnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMgdGhhdCBhcmUgdmVyaWZpZWQgdG8gYmUgbmF0aXZlLiAqL1xuICAgIHZhciBuYXRpdmVDcmVhdGUgPSBnZXROYXRpdmUoT2JqZWN0LCAnY3JlYXRlJyk7XG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIGFsbCBrZXktdmFsdWUgZW50cmllcyBmcm9tIHRoZSBoYXNoLlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAbmFtZSBjbGVhclxuICAgICAqIEBtZW1iZXJPZiBIYXNoXG4gICAgICovXG4gICAgZnVuY3Rpb24gaGFzaENsZWFyKCkge1xuICAgICAgdGhpcy5fX2RhdGFfXyA9IG5hdGl2ZUNyZWF0ZSA/IG5hdGl2ZUNyZWF0ZShudWxsKSA6IHt9O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgYGtleWAgYW5kIGl0cyB2YWx1ZSBmcm9tIHRoZSBoYXNoLlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAbmFtZSBkZWxldGVcbiAgICAgKiBAbWVtYmVyT2YgSGFzaFxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBoYXNoIFRoZSBoYXNoIHRvIG1vZGlmeS5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIHJlbW92ZS5cbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIGVudHJ5IHdhcyByZW1vdmVkLCBlbHNlIGBmYWxzZWAuXG4gICAgICovXG4gICAgZnVuY3Rpb24gaGFzaERlbGV0ZShrZXkpIHtcbiAgICAgIHJldHVybiB0aGlzLmhhcyhrZXkpICYmIGRlbGV0ZSB0aGlzLl9fZGF0YV9fW2tleV07XG4gICAgfVxuXG4gICAgLyoqIFVzZWQgdG8gc3RhbmQtaW4gZm9yIGB1bmRlZmluZWRgIGhhc2ggdmFsdWVzLiAqL1xuICAgIHZhciBIQVNIX1VOREVGSU5FRCA9ICdfX2xvZGFzaF9oYXNoX3VuZGVmaW5lZF9fJztcblxuICAgIC8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbiAgICB2YXIgb2JqZWN0UHJvdG8kNyA9IE9iamVjdC5wcm90b3R5cGU7XG5cbiAgICAvKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbiAgICB2YXIgaGFzT3duUHJvcGVydHkkMyA9IG9iamVjdFByb3RvJDcuaGFzT3duUHJvcGVydHk7XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBoYXNoIHZhbHVlIGZvciBga2V5YC5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICogQG5hbWUgZ2V0XG4gICAgICogQG1lbWJlck9mIEhhc2hcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIGdldC5cbiAgICAgKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgZW50cnkgdmFsdWUuXG4gICAgICovXG4gICAgZnVuY3Rpb24gaGFzaEdldChrZXkpIHtcbiAgICAgIHZhciBkYXRhID0gdGhpcy5fX2RhdGFfXztcbiAgICAgIGlmIChuYXRpdmVDcmVhdGUpIHtcbiAgICAgICAgdmFyIHJlc3VsdCA9IGRhdGFba2V5XTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdCA9PT0gSEFTSF9VTkRFRklORUQgPyB1bmRlZmluZWQgOiByZXN1bHQ7XG4gICAgICB9XG4gICAgICByZXR1cm4gaGFzT3duUHJvcGVydHkkMy5jYWxsKGRhdGEsIGtleSkgPyBkYXRhW2tleV0gOiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xuICAgIHZhciBvYmplY3RQcm90byQ4ID0gT2JqZWN0LnByb3RvdHlwZTtcblxuICAgIC8qKiBVc2VkIHRvIGNoZWNrIG9iamVjdHMgZm9yIG93biBwcm9wZXJ0aWVzLiAqL1xuICAgIHZhciBoYXNPd25Qcm9wZXJ0eSQ0ID0gb2JqZWN0UHJvdG8kOC5oYXNPd25Qcm9wZXJ0eTtcblxuICAgIC8qKlxuICAgICAqIENoZWNrcyBpZiBhIGhhc2ggdmFsdWUgZm9yIGBrZXlgIGV4aXN0cy5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICogQG5hbWUgaGFzXG4gICAgICogQG1lbWJlck9mIEhhc2hcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIGVudHJ5IHRvIGNoZWNrLlxuICAgICAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBhbiBlbnRyeSBmb3IgYGtleWAgZXhpc3RzLCBlbHNlIGBmYWxzZWAuXG4gICAgICovXG4gICAgZnVuY3Rpb24gaGFzaEhhcyhrZXkpIHtcbiAgICAgIHZhciBkYXRhID0gdGhpcy5fX2RhdGFfXztcbiAgICAgIHJldHVybiBuYXRpdmVDcmVhdGUgPyBkYXRhW2tleV0gIT09IHVuZGVmaW5lZCA6IGhhc093blByb3BlcnR5JDQuY2FsbChkYXRhLCBrZXkpO1xuICAgIH1cblxuICAgIC8qKiBVc2VkIHRvIHN0YW5kLWluIGZvciBgdW5kZWZpbmVkYCBoYXNoIHZhbHVlcy4gKi9cbiAgICB2YXIgSEFTSF9VTkRFRklORUQkMSA9ICdfX2xvZGFzaF9oYXNoX3VuZGVmaW5lZF9fJztcblxuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIGhhc2ggYGtleWAgdG8gYHZhbHVlYC5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICogQG5hbWUgc2V0XG4gICAgICogQG1lbWJlck9mIEhhc2hcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIHNldC5cbiAgICAgKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBzZXQuXG4gICAgICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgaGFzaCBpbnN0YW5jZS5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBoYXNoU2V0KGtleSwgdmFsdWUpIHtcbiAgICAgIHZhciBkYXRhID0gdGhpcy5fX2RhdGFfXztcbiAgICAgIGRhdGFba2V5XSA9IChuYXRpdmVDcmVhdGUgJiYgdmFsdWUgPT09IHVuZGVmaW5lZCkgPyBIQVNIX1VOREVGSU5FRCQxIDogdmFsdWU7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgaGFzaCBvYmplY3QuXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBjb25zdHJ1Y3RvclxuICAgICAqIEBwYXJhbSB7QXJyYXl9IFtlbnRyaWVzXSBUaGUga2V5LXZhbHVlIHBhaXJzIHRvIGNhY2hlLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIEhhc2goZW50cmllcykge1xuICAgICAgdmFyIGluZGV4ID0gLTEsXG4gICAgICAgICAgbGVuZ3RoID0gZW50cmllcyA/IGVudHJpZXMubGVuZ3RoIDogMDtcblxuICAgICAgdGhpcy5jbGVhcigpO1xuICAgICAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gZW50cmllc1tpbmRleF07XG4gICAgICAgIHRoaXMuc2V0KGVudHJ5WzBdLCBlbnRyeVsxXSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gQWRkIG1ldGhvZHMgdG8gYEhhc2hgLlxuICAgIEhhc2gucHJvdG90eXBlLmNsZWFyID0gaGFzaENsZWFyO1xuICAgIEhhc2gucHJvdG90eXBlWydkZWxldGUnXSA9IGhhc2hEZWxldGU7XG4gICAgSGFzaC5wcm90b3R5cGUuZ2V0ID0gaGFzaEdldDtcbiAgICBIYXNoLnByb3RvdHlwZS5oYXMgPSBoYXNoSGFzO1xuICAgIEhhc2gucHJvdG90eXBlLnNldCA9IGhhc2hTZXQ7XG5cbiAgICAvKiBCdWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcyB0aGF0IGFyZSB2ZXJpZmllZCB0byBiZSBuYXRpdmUuICovXG4gICAgdmFyIE1hcCA9IGdldE5hdGl2ZShyb290LCAnTWFwJyk7XG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIGFsbCBrZXktdmFsdWUgZW50cmllcyBmcm9tIHRoZSBtYXAuXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBuYW1lIGNsZWFyXG4gICAgICogQG1lbWJlck9mIE1hcENhY2hlXG4gICAgICovXG4gICAgZnVuY3Rpb24gbWFwQ2FjaGVDbGVhcigpIHtcbiAgICAgIHRoaXMuX19kYXRhX18gPSB7XG4gICAgICAgICdoYXNoJzogbmV3IEhhc2gsXG4gICAgICAgICdtYXAnOiBuZXcgKE1hcCB8fCBMaXN0Q2FjaGUpLFxuICAgICAgICAnc3RyaW5nJzogbmV3IEhhc2hcbiAgICAgIH07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgc3VpdGFibGUgZm9yIHVzZSBhcyB1bmlxdWUgb2JqZWN0IGtleS5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgc3VpdGFibGUsIGVsc2UgYGZhbHNlYC5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBpc0tleWFibGUodmFsdWUpIHtcbiAgICAgIHZhciB0eXBlID0gdHlwZW9mIHZhbHVlO1xuICAgICAgcmV0dXJuICh0eXBlID09ICdzdHJpbmcnIHx8IHR5cGUgPT0gJ251bWJlcicgfHwgdHlwZSA9PSAnc3ltYm9sJyB8fCB0eXBlID09ICdib29sZWFuJylcbiAgICAgICAgPyAodmFsdWUgIT09ICdfX3Byb3RvX18nKVxuICAgICAgICA6ICh2YWx1ZSA9PT0gbnVsbCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgZGF0YSBmb3IgYG1hcGAuXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBtYXAgVGhlIG1hcCB0byBxdWVyeS5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSByZWZlcmVuY2Uga2V5LlxuICAgICAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBtYXAgZGF0YS5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBnZXRNYXBEYXRhKG1hcCwga2V5KSB7XG4gICAgICB2YXIgZGF0YSA9IG1hcC5fX2RhdGFfXztcbiAgICAgIHJldHVybiBpc0tleWFibGUoa2V5KVxuICAgICAgICA/IGRhdGFbdHlwZW9mIGtleSA9PSAnc3RyaW5nJyA/ICdzdHJpbmcnIDogJ2hhc2gnXVxuICAgICAgICA6IGRhdGEubWFwO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgYGtleWAgYW5kIGl0cyB2YWx1ZSBmcm9tIHRoZSBtYXAuXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBuYW1lIGRlbGV0ZVxuICAgICAqIEBtZW1iZXJPZiBNYXBDYWNoZVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gcmVtb3ZlLlxuICAgICAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgZW50cnkgd2FzIHJlbW92ZWQsIGVsc2UgYGZhbHNlYC5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBtYXBDYWNoZURlbGV0ZShrZXkpIHtcbiAgICAgIHJldHVybiBnZXRNYXBEYXRhKHRoaXMsIGtleSlbJ2RlbGV0ZSddKGtleSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgbWFwIHZhbHVlIGZvciBga2V5YC5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICogQG5hbWUgZ2V0XG4gICAgICogQG1lbWJlck9mIE1hcENhY2hlXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byBnZXQuXG4gICAgICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIGVudHJ5IHZhbHVlLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIG1hcENhY2hlR2V0KGtleSkge1xuICAgICAgcmV0dXJuIGdldE1hcERhdGEodGhpcywga2V5KS5nZXQoa2V5KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDaGVja3MgaWYgYSBtYXAgdmFsdWUgZm9yIGBrZXlgIGV4aXN0cy5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICogQG5hbWUgaGFzXG4gICAgICogQG1lbWJlck9mIE1hcENhY2hlXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBlbnRyeSB0byBjaGVjay5cbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYW4gZW50cnkgZm9yIGBrZXlgIGV4aXN0cywgZWxzZSBgZmFsc2VgLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIG1hcENhY2hlSGFzKGtleSkge1xuICAgICAgcmV0dXJuIGdldE1hcERhdGEodGhpcywga2V5KS5oYXMoa2V5KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBtYXAgYGtleWAgdG8gYHZhbHVlYC5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICogQG5hbWUgc2V0XG4gICAgICogQG1lbWJlck9mIE1hcENhY2hlXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byBzZXQuXG4gICAgICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gc2V0LlxuICAgICAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIG1hcCBjYWNoZSBpbnN0YW5jZS5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBtYXBDYWNoZVNldChrZXksIHZhbHVlKSB7XG4gICAgICBnZXRNYXBEYXRhKHRoaXMsIGtleSkuc2V0KGtleSwgdmFsdWUpO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIG1hcCBjYWNoZSBvYmplY3QgdG8gc3RvcmUga2V5LXZhbHVlIHBhaXJzLlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAY29uc3RydWN0b3JcbiAgICAgKiBAcGFyYW0ge0FycmF5fSBbZW50cmllc10gVGhlIGtleS12YWx1ZSBwYWlycyB0byBjYWNoZS5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBNYXBDYWNoZShlbnRyaWVzKSB7XG4gICAgICB2YXIgaW5kZXggPSAtMSxcbiAgICAgICAgICBsZW5ndGggPSBlbnRyaWVzID8gZW50cmllcy5sZW5ndGggOiAwO1xuXG4gICAgICB0aGlzLmNsZWFyKCk7XG4gICAgICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgICAgICB2YXIgZW50cnkgPSBlbnRyaWVzW2luZGV4XTtcbiAgICAgICAgdGhpcy5zZXQoZW50cnlbMF0sIGVudHJ5WzFdKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBBZGQgbWV0aG9kcyB0byBgTWFwQ2FjaGVgLlxuICAgIE1hcENhY2hlLnByb3RvdHlwZS5jbGVhciA9IG1hcENhY2hlQ2xlYXI7XG4gICAgTWFwQ2FjaGUucHJvdG90eXBlWydkZWxldGUnXSA9IG1hcENhY2hlRGVsZXRlO1xuICAgIE1hcENhY2hlLnByb3RvdHlwZS5nZXQgPSBtYXBDYWNoZUdldDtcbiAgICBNYXBDYWNoZS5wcm90b3R5cGUuaGFzID0gbWFwQ2FjaGVIYXM7XG4gICAgTWFwQ2FjaGUucHJvdG90eXBlLnNldCA9IG1hcENhY2hlU2V0O1xuXG4gICAgLyoqIFVzZWQgYXMgdGhlIHNpemUgdG8gZW5hYmxlIGxhcmdlIGFycmF5IG9wdGltaXphdGlvbnMuICovXG4gICAgdmFyIExBUkdFX0FSUkFZX1NJWkUgPSAyMDA7XG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBzdGFjayBga2V5YCB0byBgdmFsdWVgLlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAbmFtZSBzZXRcbiAgICAgKiBAbWVtYmVyT2YgU3RhY2tcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIHNldC5cbiAgICAgKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBzZXQuXG4gICAgICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgc3RhY2sgY2FjaGUgaW5zdGFuY2UuXG4gICAgICovXG4gICAgZnVuY3Rpb24gc3RhY2tTZXQoa2V5LCB2YWx1ZSkge1xuICAgICAgdmFyIGNhY2hlID0gdGhpcy5fX2RhdGFfXztcbiAgICAgIGlmIChjYWNoZSBpbnN0YW5jZW9mIExpc3RDYWNoZSAmJiBjYWNoZS5fX2RhdGFfXy5sZW5ndGggPT0gTEFSR0VfQVJSQVlfU0laRSkge1xuICAgICAgICBjYWNoZSA9IHRoaXMuX19kYXRhX18gPSBuZXcgTWFwQ2FjaGUoY2FjaGUuX19kYXRhX18pO1xuICAgICAgfVxuICAgICAgY2FjaGUuc2V0KGtleSwgdmFsdWUpO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIHN0YWNrIGNhY2hlIG9iamVjdCB0byBzdG9yZSBrZXktdmFsdWUgcGFpcnMuXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBjb25zdHJ1Y3RvclxuICAgICAqIEBwYXJhbSB7QXJyYXl9IFtlbnRyaWVzXSBUaGUga2V5LXZhbHVlIHBhaXJzIHRvIGNhY2hlLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIFN0YWNrKGVudHJpZXMpIHtcbiAgICAgIHRoaXMuX19kYXRhX18gPSBuZXcgTGlzdENhY2hlKGVudHJpZXMpO1xuICAgIH1cblxuICAgIC8vIEFkZCBtZXRob2RzIHRvIGBTdGFja2AuXG4gICAgU3RhY2sucHJvdG90eXBlLmNsZWFyID0gc3RhY2tDbGVhcjtcbiAgICBTdGFjay5wcm90b3R5cGVbJ2RlbGV0ZSddID0gc3RhY2tEZWxldGU7XG4gICAgU3RhY2sucHJvdG90eXBlLmdldCA9IHN0YWNrR2V0O1xuICAgIFN0YWNrLnByb3RvdHlwZS5oYXMgPSBzdGFja0hhcztcbiAgICBTdGFjay5wcm90b3R5cGUuc2V0ID0gc3RhY2tTZXQ7XG5cbiAgICAvKiogVXNlZCB0byBzdGFuZC1pbiBmb3IgYHVuZGVmaW5lZGAgaGFzaCB2YWx1ZXMuICovXG4gICAgdmFyIEhBU0hfVU5ERUZJTkVEJDIgPSAnX19sb2Rhc2hfaGFzaF91bmRlZmluZWRfXyc7XG5cbiAgICAvKipcbiAgICAgKiBBZGRzIGB2YWx1ZWAgdG8gdGhlIGFycmF5IGNhY2hlLlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAbmFtZSBhZGRcbiAgICAgKiBAbWVtYmVyT2YgU2V0Q2FjaGVcbiAgICAgKiBAYWxpYXMgcHVzaFxuICAgICAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNhY2hlLlxuICAgICAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIGNhY2hlIGluc3RhbmNlLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIHNldENhY2hlQWRkKHZhbHVlKSB7XG4gICAgICB0aGlzLl9fZGF0YV9fLnNldCh2YWx1ZSwgSEFTSF9VTkRFRklORUQkMik7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBpbiB0aGUgYXJyYXkgY2FjaGUuXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBuYW1lIGhhc1xuICAgICAqIEBtZW1iZXJPZiBTZXRDYWNoZVxuICAgICAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHNlYXJjaCBmb3IuXG4gICAgICogQHJldHVybnMge251bWJlcn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBmb3VuZCwgZWxzZSBgZmFsc2VgLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIHNldENhY2hlSGFzKHZhbHVlKSB7XG4gICAgICByZXR1cm4gdGhpcy5fX2RhdGFfXy5oYXModmFsdWUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQ3JlYXRlcyBhbiBhcnJheSBjYWNoZSBvYmplY3QgdG8gc3RvcmUgdW5pcXVlIHZhbHVlcy5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICogQGNvbnN0cnVjdG9yXG4gICAgICogQHBhcmFtIHtBcnJheX0gW3ZhbHVlc10gVGhlIHZhbHVlcyB0byBjYWNoZS5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBTZXRDYWNoZSh2YWx1ZXMpIHtcbiAgICAgIHZhciBpbmRleCA9IC0xLFxuICAgICAgICAgIGxlbmd0aCA9IHZhbHVlcyA/IHZhbHVlcy5sZW5ndGggOiAwO1xuXG4gICAgICB0aGlzLl9fZGF0YV9fID0gbmV3IE1hcENhY2hlO1xuICAgICAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICAgICAgdGhpcy5hZGQodmFsdWVzW2luZGV4XSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gQWRkIG1ldGhvZHMgdG8gYFNldENhY2hlYC5cbiAgICBTZXRDYWNoZS5wcm90b3R5cGUuYWRkID0gU2V0Q2FjaGUucHJvdG90eXBlLnB1c2ggPSBzZXRDYWNoZUFkZDtcbiAgICBTZXRDYWNoZS5wcm90b3R5cGUuaGFzID0gc2V0Q2FjaGVIYXM7XG5cbiAgICAvKipcbiAgICAgKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYF8uc29tZWAgZm9yIGFycmF5cyB3aXRob3V0IHN1cHBvcnQgZm9yIGl0ZXJhdGVlXG4gICAgICogc2hvcnRoYW5kcy5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHBhcmFtIHtBcnJheX0gW2FycmF5XSBUaGUgYXJyYXkgdG8gaXRlcmF0ZSBvdmVyLlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IHByZWRpY2F0ZSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICAgICAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBhbnkgZWxlbWVudCBwYXNzZXMgdGhlIHByZWRpY2F0ZSBjaGVjayxcbiAgICAgKiAgZWxzZSBgZmFsc2VgLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGFycmF5U29tZShhcnJheSwgcHJlZGljYXRlKSB7XG4gICAgICB2YXIgaW5kZXggPSAtMSxcbiAgICAgICAgICBsZW5ndGggPSBhcnJheSA/IGFycmF5Lmxlbmd0aCA6IDA7XG5cbiAgICAgIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgICAgIGlmIChwcmVkaWNhdGUoYXJyYXlbaW5kZXhdLCBpbmRleCwgYXJyYXkpKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICB2YXIgVU5PUkRFUkVEX0NPTVBBUkVfRkxBRyQxID0gMTtcbiAgICB2YXIgUEFSVElBTF9DT01QQVJFX0ZMQUckMiA9IDI7XG4gICAgLyoqXG4gICAgICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBiYXNlSXNFcXVhbERlZXBgIGZvciBhcnJheXMgd2l0aCBzdXBwb3J0IGZvclxuICAgICAqIHBhcnRpYWwgZGVlcCBjb21wYXJpc29ucy5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIGNvbXBhcmUuXG4gICAgICogQHBhcmFtIHtBcnJheX0gb3RoZXIgVGhlIG90aGVyIGFycmF5IHRvIGNvbXBhcmUuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gZXF1YWxGdW5jIFRoZSBmdW5jdGlvbiB0byBkZXRlcm1pbmUgZXF1aXZhbGVudHMgb2YgdmFsdWVzLlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGN1c3RvbWl6ZXIgVGhlIGZ1bmN0aW9uIHRvIGN1c3RvbWl6ZSBjb21wYXJpc29ucy5cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gYml0bWFzayBUaGUgYml0bWFzayBvZiBjb21wYXJpc29uIGZsYWdzLiBTZWUgYGJhc2VJc0VxdWFsYFxuICAgICAqICBmb3IgbW9yZSBkZXRhaWxzLlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBzdGFjayBUcmFja3MgdHJhdmVyc2VkIGBhcnJheWAgYW5kIGBvdGhlcmAgb2JqZWN0cy5cbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIGFycmF5cyBhcmUgZXF1aXZhbGVudCwgZWxzZSBgZmFsc2VgLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGVxdWFsQXJyYXlzKGFycmF5LCBvdGhlciwgZXF1YWxGdW5jLCBjdXN0b21pemVyLCBiaXRtYXNrLCBzdGFjaykge1xuICAgICAgdmFyIGlzUGFydGlhbCA9IGJpdG1hc2sgJiBQQVJUSUFMX0NPTVBBUkVfRkxBRyQyLFxuICAgICAgICAgIGFyckxlbmd0aCA9IGFycmF5Lmxlbmd0aCxcbiAgICAgICAgICBvdGhMZW5ndGggPSBvdGhlci5sZW5ndGg7XG5cbiAgICAgIGlmIChhcnJMZW5ndGggIT0gb3RoTGVuZ3RoICYmICEoaXNQYXJ0aWFsICYmIG90aExlbmd0aCA+IGFyckxlbmd0aCkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgLy8gQXNzdW1lIGN5Y2xpYyB2YWx1ZXMgYXJlIGVxdWFsLlxuICAgICAgdmFyIHN0YWNrZWQgPSBzdGFjay5nZXQoYXJyYXkpO1xuICAgICAgaWYgKHN0YWNrZWQpIHtcbiAgICAgICAgcmV0dXJuIHN0YWNrZWQgPT0gb3RoZXI7XG4gICAgICB9XG4gICAgICB2YXIgaW5kZXggPSAtMSxcbiAgICAgICAgICByZXN1bHQgPSB0cnVlLFxuICAgICAgICAgIHNlZW4gPSAoYml0bWFzayAmIFVOT1JERVJFRF9DT01QQVJFX0ZMQUckMSkgPyBuZXcgU2V0Q2FjaGUgOiB1bmRlZmluZWQ7XG5cbiAgICAgIHN0YWNrLnNldChhcnJheSwgb3RoZXIpO1xuXG4gICAgICAvLyBJZ25vcmUgbm9uLWluZGV4IHByb3BlcnRpZXMuXG4gICAgICB3aGlsZSAoKytpbmRleCA8IGFyckxlbmd0aCkge1xuICAgICAgICB2YXIgYXJyVmFsdWUgPSBhcnJheVtpbmRleF0sXG4gICAgICAgICAgICBvdGhWYWx1ZSA9IG90aGVyW2luZGV4XTtcblxuICAgICAgICBpZiAoY3VzdG9taXplcikge1xuICAgICAgICAgIHZhciBjb21wYXJlZCA9IGlzUGFydGlhbFxuICAgICAgICAgICAgPyBjdXN0b21pemVyKG90aFZhbHVlLCBhcnJWYWx1ZSwgaW5kZXgsIG90aGVyLCBhcnJheSwgc3RhY2spXG4gICAgICAgICAgICA6IGN1c3RvbWl6ZXIoYXJyVmFsdWUsIG90aFZhbHVlLCBpbmRleCwgYXJyYXksIG90aGVyLCBzdGFjayk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNvbXBhcmVkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBpZiAoY29tcGFyZWQpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXN1bHQgPSBmYWxzZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICAvLyBSZWN1cnNpdmVseSBjb21wYXJlIGFycmF5cyAoc3VzY2VwdGlibGUgdG8gY2FsbCBzdGFjayBsaW1pdHMpLlxuICAgICAgICBpZiAoc2Vlbikge1xuICAgICAgICAgIGlmICghYXJyYXlTb21lKG90aGVyLCBmdW5jdGlvbihvdGhWYWx1ZSwgb3RoSW5kZXgpIHtcbiAgICAgICAgICAgICAgICBpZiAoIXNlZW4uaGFzKG90aEluZGV4KSAmJlxuICAgICAgICAgICAgICAgICAgICAoYXJyVmFsdWUgPT09IG90aFZhbHVlIHx8IGVxdWFsRnVuYyhhcnJWYWx1ZSwgb3RoVmFsdWUsIGN1c3RvbWl6ZXIsIGJpdG1hc2ssIHN0YWNrKSkpIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBzZWVuLmFkZChvdGhJbmRleCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KSkge1xuICAgICAgICAgICAgcmVzdWx0ID0gZmFsc2U7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoIShcbiAgICAgICAgICAgICAgYXJyVmFsdWUgPT09IG90aFZhbHVlIHx8XG4gICAgICAgICAgICAgICAgZXF1YWxGdW5jKGFyclZhbHVlLCBvdGhWYWx1ZSwgY3VzdG9taXplciwgYml0bWFzaywgc3RhY2spXG4gICAgICAgICAgICApKSB7XG4gICAgICAgICAgcmVzdWx0ID0gZmFsc2U7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHN0YWNrWydkZWxldGUnXShhcnJheSk7XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIC8qKiBCdWlsdC1pbiB2YWx1ZSByZWZlcmVuY2VzLiAqL1xuICAgIHZhciBTeW1ib2wkMSA9IHJvb3QuU3ltYm9sO1xuXG4gICAgLyoqIEJ1aWx0LWluIHZhbHVlIHJlZmVyZW5jZXMuICovXG4gICAgdmFyIFVpbnQ4QXJyYXkgPSByb290LlVpbnQ4QXJyYXk7XG5cbiAgICAvKipcbiAgICAgKiBDb252ZXJ0cyBgbWFwYCB0byBpdHMga2V5LXZhbHVlIHBhaXJzLlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gbWFwIFRoZSBtYXAgdG8gY29udmVydC5cbiAgICAgKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGtleS12YWx1ZSBwYWlycy5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBtYXBUb0FycmF5KG1hcCkge1xuICAgICAgdmFyIGluZGV4ID0gLTEsXG4gICAgICAgICAgcmVzdWx0ID0gQXJyYXkobWFwLnNpemUpO1xuXG4gICAgICBtYXAuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSwga2V5KSB7XG4gICAgICAgIHJlc3VsdFsrK2luZGV4XSA9IFtrZXksIHZhbHVlXTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDb252ZXJ0cyBgc2V0YCB0byBhbiBhcnJheSBvZiBpdHMgdmFsdWVzLlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gc2V0IFRoZSBzZXQgdG8gY29udmVydC5cbiAgICAgKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIHZhbHVlcy5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBzZXRUb0FycmF5KHNldCkge1xuICAgICAgdmFyIGluZGV4ID0gLTEsXG4gICAgICAgICAgcmVzdWx0ID0gQXJyYXkoc2V0LnNpemUpO1xuXG4gICAgICBzZXQuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICByZXN1bHRbKytpbmRleF0gPSB2YWx1ZTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICB2YXIgVU5PUkRFUkVEX0NPTVBBUkVfRkxBRyQyID0gMTtcbiAgICB2YXIgUEFSVElBTF9DT01QQVJFX0ZMQUckMyA9IDI7XG4gICAgdmFyIGJvb2xUYWcgPSAnW29iamVjdCBCb29sZWFuXSc7XG4gICAgdmFyIGRhdGVUYWcgPSAnW29iamVjdCBEYXRlXSc7XG4gICAgdmFyIGVycm9yVGFnID0gJ1tvYmplY3QgRXJyb3JdJztcbiAgICB2YXIgbWFwVGFnID0gJ1tvYmplY3QgTWFwXSc7XG4gICAgdmFyIG51bWJlclRhZyA9ICdbb2JqZWN0IE51bWJlcl0nO1xuICAgIHZhciByZWdleHBUYWcgPSAnW29iamVjdCBSZWdFeHBdJztcbiAgICB2YXIgc2V0VGFnID0gJ1tvYmplY3QgU2V0XSc7XG4gICAgdmFyIHN0cmluZ1RhZyQxID0gJ1tvYmplY3QgU3RyaW5nXSc7XG4gICAgdmFyIHN5bWJvbFRhZyQxID0gJ1tvYmplY3QgU3ltYm9sXSc7XG4gICAgdmFyIGFycmF5QnVmZmVyVGFnID0gJ1tvYmplY3QgQXJyYXlCdWZmZXJdJztcbiAgICB2YXIgZGF0YVZpZXdUYWcgPSAnW29iamVjdCBEYXRhVmlld10nO1xuICAgIHZhciBzeW1ib2xQcm90byA9IFN5bWJvbCQxID8gU3ltYm9sJDEucHJvdG90eXBlIDogdW5kZWZpbmVkO1xuICAgIHZhciBzeW1ib2xWYWx1ZU9mID0gc3ltYm9sUHJvdG8gPyBzeW1ib2xQcm90by52YWx1ZU9mIDogdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgYmFzZUlzRXF1YWxEZWVwYCBmb3IgY29tcGFyaW5nIG9iamVjdHMgb2ZcbiAgICAgKiB0aGUgc2FtZSBgdG9TdHJpbmdUYWdgLlxuICAgICAqXG4gICAgICogKipOb3RlOioqIFRoaXMgZnVuY3Rpb24gb25seSBzdXBwb3J0cyBjb21wYXJpbmcgdmFsdWVzIHdpdGggdGFncyBvZlxuICAgICAqIGBCb29sZWFuYCwgYERhdGVgLCBgRXJyb3JgLCBgTnVtYmVyYCwgYFJlZ0V4cGAsIG9yIGBTdHJpbmdgLlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gY29tcGFyZS5cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb3RoZXIgVGhlIG90aGVyIG9iamVjdCB0byBjb21wYXJlLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB0YWcgVGhlIGB0b1N0cmluZ1RhZ2Agb2YgdGhlIG9iamVjdHMgdG8gY29tcGFyZS5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBlcXVhbEZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGRldGVybWluZSBlcXVpdmFsZW50cyBvZiB2YWx1ZXMuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gY3VzdG9taXplciBUaGUgZnVuY3Rpb24gdG8gY3VzdG9taXplIGNvbXBhcmlzb25zLlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBiaXRtYXNrIFRoZSBiaXRtYXNrIG9mIGNvbXBhcmlzb24gZmxhZ3MuIFNlZSBgYmFzZUlzRXF1YWxgXG4gICAgICogIGZvciBtb3JlIGRldGFpbHMuXG4gICAgICogQHBhcmFtIHtPYmplY3R9IHN0YWNrIFRyYWNrcyB0cmF2ZXJzZWQgYG9iamVjdGAgYW5kIGBvdGhlcmAgb2JqZWN0cy5cbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIG9iamVjdHMgYXJlIGVxdWl2YWxlbnQsIGVsc2UgYGZhbHNlYC5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBlcXVhbEJ5VGFnKG9iamVjdCwgb3RoZXIsIHRhZywgZXF1YWxGdW5jLCBjdXN0b21pemVyLCBiaXRtYXNrLCBzdGFjaykge1xuICAgICAgc3dpdGNoICh0YWcpIHtcbiAgICAgICAgY2FzZSBkYXRhVmlld1RhZzpcbiAgICAgICAgICBpZiAoKG9iamVjdC5ieXRlTGVuZ3RoICE9IG90aGVyLmJ5dGVMZW5ndGgpIHx8XG4gICAgICAgICAgICAgIChvYmplY3QuYnl0ZU9mZnNldCAhPSBvdGhlci5ieXRlT2Zmc2V0KSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgICBvYmplY3QgPSBvYmplY3QuYnVmZmVyO1xuICAgICAgICAgIG90aGVyID0gb3RoZXIuYnVmZmVyO1xuXG4gICAgICAgIGNhc2UgYXJyYXlCdWZmZXJUYWc6XG4gICAgICAgICAgaWYgKChvYmplY3QuYnl0ZUxlbmd0aCAhPSBvdGhlci5ieXRlTGVuZ3RoKSB8fFxuICAgICAgICAgICAgICAhZXF1YWxGdW5jKG5ldyBVaW50OEFycmF5KG9iamVjdCksIG5ldyBVaW50OEFycmF5KG90aGVyKSkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG5cbiAgICAgICAgY2FzZSBib29sVGFnOlxuICAgICAgICBjYXNlIGRhdGVUYWc6XG4gICAgICAgICAgLy8gQ29lcmNlIGRhdGVzIGFuZCBib29sZWFucyB0byBudW1iZXJzLCBkYXRlcyB0byBtaWxsaXNlY29uZHMgYW5kXG4gICAgICAgICAgLy8gYm9vbGVhbnMgdG8gYDFgIG9yIGAwYCB0cmVhdGluZyBpbnZhbGlkIGRhdGVzIGNvZXJjZWQgdG8gYE5hTmAgYXNcbiAgICAgICAgICAvLyBub3QgZXF1YWwuXG4gICAgICAgICAgcmV0dXJuICtvYmplY3QgPT0gK290aGVyO1xuXG4gICAgICAgIGNhc2UgZXJyb3JUYWc6XG4gICAgICAgICAgcmV0dXJuIG9iamVjdC5uYW1lID09IG90aGVyLm5hbWUgJiYgb2JqZWN0Lm1lc3NhZ2UgPT0gb3RoZXIubWVzc2FnZTtcblxuICAgICAgICBjYXNlIG51bWJlclRhZzpcbiAgICAgICAgICAvLyBUcmVhdCBgTmFOYCB2cy4gYE5hTmAgYXMgZXF1YWwuXG4gICAgICAgICAgcmV0dXJuIChvYmplY3QgIT0gK29iamVjdCkgPyBvdGhlciAhPSArb3RoZXIgOiBvYmplY3QgPT0gK290aGVyO1xuXG4gICAgICAgIGNhc2UgcmVnZXhwVGFnOlxuICAgICAgICBjYXNlIHN0cmluZ1RhZyQxOlxuICAgICAgICAgIC8vIENvZXJjZSByZWdleGVzIHRvIHN0cmluZ3MgYW5kIHRyZWF0IHN0cmluZ3MsIHByaW1pdGl2ZXMgYW5kIG9iamVjdHMsXG4gICAgICAgICAgLy8gYXMgZXF1YWwuIFNlZSBodHRwOi8vd3d3LmVjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNi4wLyNzZWMtcmVnZXhwLnByb3RvdHlwZS50b3N0cmluZ1xuICAgICAgICAgIC8vIGZvciBtb3JlIGRldGFpbHMuXG4gICAgICAgICAgcmV0dXJuIG9iamVjdCA9PSAob3RoZXIgKyAnJyk7XG5cbiAgICAgICAgY2FzZSBtYXBUYWc6XG4gICAgICAgICAgdmFyIGNvbnZlcnQgPSBtYXBUb0FycmF5O1xuXG4gICAgICAgIGNhc2Ugc2V0VGFnOlxuICAgICAgICAgIHZhciBpc1BhcnRpYWwgPSBiaXRtYXNrICYgUEFSVElBTF9DT01QQVJFX0ZMQUckMztcbiAgICAgICAgICBjb252ZXJ0IHx8IChjb252ZXJ0ID0gc2V0VG9BcnJheSk7XG5cbiAgICAgICAgICBpZiAob2JqZWN0LnNpemUgIT0gb3RoZXIuc2l6ZSAmJiAhaXNQYXJ0aWFsKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIEFzc3VtZSBjeWNsaWMgdmFsdWVzIGFyZSBlcXVhbC5cbiAgICAgICAgICB2YXIgc3RhY2tlZCA9IHN0YWNrLmdldChvYmplY3QpO1xuICAgICAgICAgIGlmIChzdGFja2VkKSB7XG4gICAgICAgICAgICByZXR1cm4gc3RhY2tlZCA9PSBvdGhlcjtcbiAgICAgICAgICB9XG4gICAgICAgICAgYml0bWFzayB8PSBVTk9SREVSRURfQ09NUEFSRV9GTEFHJDI7XG4gICAgICAgICAgc3RhY2suc2V0KG9iamVjdCwgb3RoZXIpO1xuXG4gICAgICAgICAgLy8gUmVjdXJzaXZlbHkgY29tcGFyZSBvYmplY3RzIChzdXNjZXB0aWJsZSB0byBjYWxsIHN0YWNrIGxpbWl0cykuXG4gICAgICAgICAgcmV0dXJuIGVxdWFsQXJyYXlzKGNvbnZlcnQob2JqZWN0KSwgY29udmVydChvdGhlciksIGVxdWFsRnVuYywgY3VzdG9taXplciwgYml0bWFzaywgc3RhY2spO1xuXG4gICAgICAgIGNhc2Ugc3ltYm9sVGFnJDE6XG4gICAgICAgICAgaWYgKHN5bWJvbFZhbHVlT2YpIHtcbiAgICAgICAgICAgIHJldHVybiBzeW1ib2xWYWx1ZU9mLmNhbGwob2JqZWN0KSA9PSBzeW1ib2xWYWx1ZU9mLmNhbGwob3RoZXIpO1xuICAgICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICAvKiogVXNlZCB0byBjb21wb3NlIGJpdG1hc2tzIGZvciBjb21wYXJpc29uIHN0eWxlcy4gKi9cbiAgICB2YXIgUEFSVElBTF9DT01QQVJFX0ZMQUckNCA9IDI7XG5cbiAgICAvKipcbiAgICAgKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYGJhc2VJc0VxdWFsRGVlcGAgZm9yIG9iamVjdHMgd2l0aCBzdXBwb3J0IGZvclxuICAgICAqIHBhcnRpYWwgZGVlcCBjb21wYXJpc29ucy5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIGNvbXBhcmUuXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG90aGVyIFRoZSBvdGhlciBvYmplY3QgdG8gY29tcGFyZS5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBlcXVhbEZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGRldGVybWluZSBlcXVpdmFsZW50cyBvZiB2YWx1ZXMuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gY3VzdG9taXplciBUaGUgZnVuY3Rpb24gdG8gY3VzdG9taXplIGNvbXBhcmlzb25zLlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBiaXRtYXNrIFRoZSBiaXRtYXNrIG9mIGNvbXBhcmlzb24gZmxhZ3MuIFNlZSBgYmFzZUlzRXF1YWxgXG4gICAgICogIGZvciBtb3JlIGRldGFpbHMuXG4gICAgICogQHBhcmFtIHtPYmplY3R9IHN0YWNrIFRyYWNrcyB0cmF2ZXJzZWQgYG9iamVjdGAgYW5kIGBvdGhlcmAgb2JqZWN0cy5cbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIG9iamVjdHMgYXJlIGVxdWl2YWxlbnQsIGVsc2UgYGZhbHNlYC5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBlcXVhbE9iamVjdHMob2JqZWN0LCBvdGhlciwgZXF1YWxGdW5jLCBjdXN0b21pemVyLCBiaXRtYXNrLCBzdGFjaykge1xuICAgICAgdmFyIGlzUGFydGlhbCA9IGJpdG1hc2sgJiBQQVJUSUFMX0NPTVBBUkVfRkxBRyQ0LFxuICAgICAgICAgIG9ialByb3BzID0ga2V5cyhvYmplY3QpLFxuICAgICAgICAgIG9iakxlbmd0aCA9IG9ialByb3BzLmxlbmd0aCxcbiAgICAgICAgICBvdGhQcm9wcyA9IGtleXMob3RoZXIpLFxuICAgICAgICAgIG90aExlbmd0aCA9IG90aFByb3BzLmxlbmd0aDtcblxuICAgICAgaWYgKG9iakxlbmd0aCAhPSBvdGhMZW5ndGggJiYgIWlzUGFydGlhbCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICB2YXIgaW5kZXggPSBvYmpMZW5ndGg7XG4gICAgICB3aGlsZSAoaW5kZXgtLSkge1xuICAgICAgICB2YXIga2V5ID0gb2JqUHJvcHNbaW5kZXhdO1xuICAgICAgICBpZiAoIShpc1BhcnRpYWwgPyBrZXkgaW4gb3RoZXIgOiBiYXNlSGFzKG90aGVyLCBrZXkpKSkge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgLy8gQXNzdW1lIGN5Y2xpYyB2YWx1ZXMgYXJlIGVxdWFsLlxuICAgICAgdmFyIHN0YWNrZWQgPSBzdGFjay5nZXQob2JqZWN0KTtcbiAgICAgIGlmIChzdGFja2VkKSB7XG4gICAgICAgIHJldHVybiBzdGFja2VkID09IG90aGVyO1xuICAgICAgfVxuICAgICAgdmFyIHJlc3VsdCA9IHRydWU7XG4gICAgICBzdGFjay5zZXQob2JqZWN0LCBvdGhlcik7XG5cbiAgICAgIHZhciBza2lwQ3RvciA9IGlzUGFydGlhbDtcbiAgICAgIHdoaWxlICgrK2luZGV4IDwgb2JqTGVuZ3RoKSB7XG4gICAgICAgIGtleSA9IG9ialByb3BzW2luZGV4XTtcbiAgICAgICAgdmFyIG9ialZhbHVlID0gb2JqZWN0W2tleV0sXG4gICAgICAgICAgICBvdGhWYWx1ZSA9IG90aGVyW2tleV07XG5cbiAgICAgICAgaWYgKGN1c3RvbWl6ZXIpIHtcbiAgICAgICAgICB2YXIgY29tcGFyZWQgPSBpc1BhcnRpYWxcbiAgICAgICAgICAgID8gY3VzdG9taXplcihvdGhWYWx1ZSwgb2JqVmFsdWUsIGtleSwgb3RoZXIsIG9iamVjdCwgc3RhY2spXG4gICAgICAgICAgICA6IGN1c3RvbWl6ZXIob2JqVmFsdWUsIG90aFZhbHVlLCBrZXksIG9iamVjdCwgb3RoZXIsIHN0YWNrKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBSZWN1cnNpdmVseSBjb21wYXJlIG9iamVjdHMgKHN1c2NlcHRpYmxlIHRvIGNhbGwgc3RhY2sgbGltaXRzKS5cbiAgICAgICAgaWYgKCEoY29tcGFyZWQgPT09IHVuZGVmaW5lZFxuICAgICAgICAgICAgICA/IChvYmpWYWx1ZSA9PT0gb3RoVmFsdWUgfHwgZXF1YWxGdW5jKG9ialZhbHVlLCBvdGhWYWx1ZSwgY3VzdG9taXplciwgYml0bWFzaywgc3RhY2spKVxuICAgICAgICAgICAgICA6IGNvbXBhcmVkXG4gICAgICAgICAgICApKSB7XG4gICAgICAgICAgcmVzdWx0ID0gZmFsc2U7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgc2tpcEN0b3IgfHwgKHNraXBDdG9yID0ga2V5ID09ICdjb25zdHJ1Y3RvcicpO1xuICAgICAgfVxuICAgICAgaWYgKHJlc3VsdCAmJiAhc2tpcEN0b3IpIHtcbiAgICAgICAgdmFyIG9iakN0b3IgPSBvYmplY3QuY29uc3RydWN0b3IsXG4gICAgICAgICAgICBvdGhDdG9yID0gb3RoZXIuY29uc3RydWN0b3I7XG5cbiAgICAgICAgLy8gTm9uIGBPYmplY3RgIG9iamVjdCBpbnN0YW5jZXMgd2l0aCBkaWZmZXJlbnQgY29uc3RydWN0b3JzIGFyZSBub3QgZXF1YWwuXG4gICAgICAgIGlmIChvYmpDdG9yICE9IG90aEN0b3IgJiZcbiAgICAgICAgICAgICgnY29uc3RydWN0b3InIGluIG9iamVjdCAmJiAnY29uc3RydWN0b3InIGluIG90aGVyKSAmJlxuICAgICAgICAgICAgISh0eXBlb2Ygb2JqQ3RvciA9PSAnZnVuY3Rpb24nICYmIG9iakN0b3IgaW5zdGFuY2VvZiBvYmpDdG9yICYmXG4gICAgICAgICAgICAgIHR5cGVvZiBvdGhDdG9yID09ICdmdW5jdGlvbicgJiYgb3RoQ3RvciBpbnN0YW5jZW9mIG90aEN0b3IpKSB7XG4gICAgICAgICAgcmVzdWx0ID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHN0YWNrWydkZWxldGUnXShvYmplY3QpO1xuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICAvKiBCdWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcyB0aGF0IGFyZSB2ZXJpZmllZCB0byBiZSBuYXRpdmUuICovXG4gICAgdmFyIERhdGFWaWV3ID0gZ2V0TmF0aXZlKHJvb3QsICdEYXRhVmlldycpO1xuXG4gICAgLyogQnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMgdGhhdCBhcmUgdmVyaWZpZWQgdG8gYmUgbmF0aXZlLiAqL1xuICAgIHZhciBQcm9taXNlID0gZ2V0TmF0aXZlKHJvb3QsICdQcm9taXNlJyk7XG5cbiAgICAvKiBCdWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcyB0aGF0IGFyZSB2ZXJpZmllZCB0byBiZSBuYXRpdmUuICovXG4gICAgdmFyIFNldCA9IGdldE5hdGl2ZShyb290LCAnU2V0Jyk7XG5cbiAgICAvKiBCdWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcyB0aGF0IGFyZSB2ZXJpZmllZCB0byBiZSBuYXRpdmUuICovXG4gICAgdmFyIFdlYWtNYXAgPSBnZXROYXRpdmUocm9vdCwgJ1dlYWtNYXAnKTtcblxuICAgIHZhciBtYXBUYWckMSA9ICdbb2JqZWN0IE1hcF0nO1xuICAgIHZhciBvYmplY3RUYWckMSA9ICdbb2JqZWN0IE9iamVjdF0nO1xuICAgIHZhciBwcm9taXNlVGFnID0gJ1tvYmplY3QgUHJvbWlzZV0nO1xuICAgIHZhciBzZXRUYWckMSA9ICdbb2JqZWN0IFNldF0nO1xuICAgIHZhciB3ZWFrTWFwVGFnID0gJ1tvYmplY3QgV2Vha01hcF0nO1xuICAgIHZhciBkYXRhVmlld1RhZyQxID0gJ1tvYmplY3QgRGF0YVZpZXddJztcblxuICAgIC8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbiAgICB2YXIgb2JqZWN0UHJvdG8kMTAgPSBPYmplY3QucHJvdG90eXBlO1xuXG4gICAgLyoqXG4gICAgICogVXNlZCB0byByZXNvbHZlIHRoZVxuICAgICAqIFtgdG9TdHJpbmdUYWdgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi82LjAvI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICAgICAqIG9mIHZhbHVlcy5cbiAgICAgKi9cbiAgICB2YXIgb2JqZWN0VG9TdHJpbmckNCA9IG9iamVjdFByb3RvJDEwLnRvU3RyaW5nO1xuXG4gICAgLyoqIFVzZWQgdG8gZGV0ZWN0IG1hcHMsIHNldHMsIGFuZCB3ZWFrbWFwcy4gKi9cbiAgICB2YXIgZGF0YVZpZXdDdG9yU3RyaW5nID0gdG9Tb3VyY2UoRGF0YVZpZXcpO1xuICAgIHZhciBtYXBDdG9yU3RyaW5nID0gdG9Tb3VyY2UoTWFwKTtcbiAgICB2YXIgcHJvbWlzZUN0b3JTdHJpbmcgPSB0b1NvdXJjZShQcm9taXNlKTtcbiAgICB2YXIgc2V0Q3RvclN0cmluZyA9IHRvU291cmNlKFNldCk7XG4gICAgdmFyIHdlYWtNYXBDdG9yU3RyaW5nID0gdG9Tb3VyY2UoV2Vha01hcCk7XG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgYHRvU3RyaW5nVGFnYCBvZiBgdmFsdWVgLlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBxdWVyeS5cbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBgdG9TdHJpbmdUYWdgLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGdldFRhZyh2YWx1ZSkge1xuICAgICAgcmV0dXJuIG9iamVjdFRvU3RyaW5nJDQuY2FsbCh2YWx1ZSk7XG4gICAgfVxuXG4gICAgLy8gRmFsbGJhY2sgZm9yIGRhdGEgdmlld3MsIG1hcHMsIHNldHMsIGFuZCB3ZWFrIG1hcHMgaW4gSUUgMTEsXG4gICAgLy8gZm9yIGRhdGEgdmlld3MgaW4gRWRnZSwgYW5kIHByb21pc2VzIGluIE5vZGUuanMuXG4gICAgaWYgKChEYXRhVmlldyAmJiBnZXRUYWcobmV3IERhdGFWaWV3KG5ldyBBcnJheUJ1ZmZlcigxKSkpICE9IGRhdGFWaWV3VGFnJDEpIHx8XG4gICAgICAgIChNYXAgJiYgZ2V0VGFnKG5ldyBNYXApICE9IG1hcFRhZyQxKSB8fFxuICAgICAgICAoUHJvbWlzZSAmJiBnZXRUYWcoUHJvbWlzZS5yZXNvbHZlKCkpICE9IHByb21pc2VUYWcpIHx8XG4gICAgICAgIChTZXQgJiYgZ2V0VGFnKG5ldyBTZXQpICE9IHNldFRhZyQxKSB8fFxuICAgICAgICAoV2Vha01hcCAmJiBnZXRUYWcobmV3IFdlYWtNYXApICE9IHdlYWtNYXBUYWcpKSB7XG4gICAgICBnZXRUYWcgPSBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICB2YXIgcmVzdWx0ID0gb2JqZWN0VG9TdHJpbmckNC5jYWxsKHZhbHVlKSxcbiAgICAgICAgICAgIEN0b3IgPSByZXN1bHQgPT0gb2JqZWN0VGFnJDEgPyB2YWx1ZS5jb25zdHJ1Y3RvciA6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIGN0b3JTdHJpbmcgPSBDdG9yID8gdG9Tb3VyY2UoQ3RvcikgOiB1bmRlZmluZWQ7XG5cbiAgICAgICAgaWYgKGN0b3JTdHJpbmcpIHtcbiAgICAgICAgICBzd2l0Y2ggKGN0b3JTdHJpbmcpIHtcbiAgICAgICAgICAgIGNhc2UgZGF0YVZpZXdDdG9yU3RyaW5nOiByZXR1cm4gZGF0YVZpZXdUYWckMTtcbiAgICAgICAgICAgIGNhc2UgbWFwQ3RvclN0cmluZzogcmV0dXJuIG1hcFRhZyQxO1xuICAgICAgICAgICAgY2FzZSBwcm9taXNlQ3RvclN0cmluZzogcmV0dXJuIHByb21pc2VUYWc7XG4gICAgICAgICAgICBjYXNlIHNldEN0b3JTdHJpbmc6IHJldHVybiBzZXRUYWckMTtcbiAgICAgICAgICAgIGNhc2Ugd2Vha01hcEN0b3JTdHJpbmc6IHJldHVybiB3ZWFrTWFwVGFnO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgfTtcbiAgICB9XG5cbiAgICB2YXIgZ2V0VGFnJDEgPSBnZXRUYWc7XG5cbiAgICB2YXIgYXJnc1RhZyQyID0gJ1tvYmplY3QgQXJndW1lbnRzXSc7XG4gICAgdmFyIGFycmF5VGFnJDEgPSAnW29iamVjdCBBcnJheV0nO1xuICAgIHZhciBib29sVGFnJDEgPSAnW29iamVjdCBCb29sZWFuXSc7XG4gICAgdmFyIGRhdGVUYWckMSA9ICdbb2JqZWN0IERhdGVdJztcbiAgICB2YXIgZXJyb3JUYWckMSA9ICdbb2JqZWN0IEVycm9yXSc7XG4gICAgdmFyIGZ1bmNUYWckMSA9ICdbb2JqZWN0IEZ1bmN0aW9uXSc7XG4gICAgdmFyIG1hcFRhZyQyID0gJ1tvYmplY3QgTWFwXSc7XG4gICAgdmFyIG51bWJlclRhZyQxID0gJ1tvYmplY3QgTnVtYmVyXSc7XG4gICAgdmFyIG9iamVjdFRhZyQyID0gJ1tvYmplY3QgT2JqZWN0XSc7XG4gICAgdmFyIHJlZ2V4cFRhZyQxID0gJ1tvYmplY3QgUmVnRXhwXSc7XG4gICAgdmFyIHNldFRhZyQyID0gJ1tvYmplY3QgU2V0XSc7XG4gICAgdmFyIHN0cmluZ1RhZyQyID0gJ1tvYmplY3QgU3RyaW5nXSc7XG4gICAgdmFyIHdlYWtNYXBUYWckMSA9ICdbb2JqZWN0IFdlYWtNYXBdJztcbiAgICB2YXIgYXJyYXlCdWZmZXJUYWckMSA9ICdbb2JqZWN0IEFycmF5QnVmZmVyXSc7XG4gICAgdmFyIGRhdGFWaWV3VGFnJDIgPSAnW29iamVjdCBEYXRhVmlld10nO1xuICAgIHZhciBmbG9hdDMyVGFnID0gJ1tvYmplY3QgRmxvYXQzMkFycmF5XSc7XG4gICAgdmFyIGZsb2F0NjRUYWcgPSAnW29iamVjdCBGbG9hdDY0QXJyYXldJztcbiAgICB2YXIgaW50OFRhZyA9ICdbb2JqZWN0IEludDhBcnJheV0nO1xuICAgIHZhciBpbnQxNlRhZyA9ICdbb2JqZWN0IEludDE2QXJyYXldJztcbiAgICB2YXIgaW50MzJUYWcgPSAnW29iamVjdCBJbnQzMkFycmF5XSc7XG4gICAgdmFyIHVpbnQ4VGFnID0gJ1tvYmplY3QgVWludDhBcnJheV0nO1xuICAgIHZhciB1aW50OENsYW1wZWRUYWcgPSAnW29iamVjdCBVaW50OENsYW1wZWRBcnJheV0nO1xuICAgIHZhciB1aW50MTZUYWcgPSAnW29iamVjdCBVaW50MTZBcnJheV0nO1xuICAgIHZhciB1aW50MzJUYWcgPSAnW29iamVjdCBVaW50MzJBcnJheV0nO1xuICAgIC8qKiBVc2VkIHRvIGlkZW50aWZ5IGB0b1N0cmluZ1RhZ2AgdmFsdWVzIG9mIHR5cGVkIGFycmF5cy4gKi9cbiAgICB2YXIgdHlwZWRBcnJheVRhZ3MgPSB7fTtcbiAgICB0eXBlZEFycmF5VGFnc1tmbG9hdDMyVGFnXSA9IHR5cGVkQXJyYXlUYWdzW2Zsb2F0NjRUYWddID1cbiAgICB0eXBlZEFycmF5VGFnc1tpbnQ4VGFnXSA9IHR5cGVkQXJyYXlUYWdzW2ludDE2VGFnXSA9XG4gICAgdHlwZWRBcnJheVRhZ3NbaW50MzJUYWddID0gdHlwZWRBcnJheVRhZ3NbdWludDhUYWddID1cbiAgICB0eXBlZEFycmF5VGFnc1t1aW50OENsYW1wZWRUYWddID0gdHlwZWRBcnJheVRhZ3NbdWludDE2VGFnXSA9XG4gICAgdHlwZWRBcnJheVRhZ3NbdWludDMyVGFnXSA9IHRydWU7XG4gICAgdHlwZWRBcnJheVRhZ3NbYXJnc1RhZyQyXSA9IHR5cGVkQXJyYXlUYWdzW2FycmF5VGFnJDFdID1cbiAgICB0eXBlZEFycmF5VGFnc1thcnJheUJ1ZmZlclRhZyQxXSA9IHR5cGVkQXJyYXlUYWdzW2Jvb2xUYWckMV0gPVxuICAgIHR5cGVkQXJyYXlUYWdzW2RhdGFWaWV3VGFnJDJdID0gdHlwZWRBcnJheVRhZ3NbZGF0ZVRhZyQxXSA9XG4gICAgdHlwZWRBcnJheVRhZ3NbZXJyb3JUYWckMV0gPSB0eXBlZEFycmF5VGFnc1tmdW5jVGFnJDFdID1cbiAgICB0eXBlZEFycmF5VGFnc1ttYXBUYWckMl0gPSB0eXBlZEFycmF5VGFnc1tudW1iZXJUYWckMV0gPVxuICAgIHR5cGVkQXJyYXlUYWdzW29iamVjdFRhZyQyXSA9IHR5cGVkQXJyYXlUYWdzW3JlZ2V4cFRhZyQxXSA9XG4gICAgdHlwZWRBcnJheVRhZ3Nbc2V0VGFnJDJdID0gdHlwZWRBcnJheVRhZ3Nbc3RyaW5nVGFnJDJdID1cbiAgICB0eXBlZEFycmF5VGFnc1t3ZWFrTWFwVGFnJDFdID0gZmFsc2U7XG5cbiAgICAvKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG4gICAgdmFyIG9iamVjdFByb3RvJDExID0gT2JqZWN0LnByb3RvdHlwZTtcblxuICAgIC8qKlxuICAgICAqIFVzZWQgdG8gcmVzb2x2ZSB0aGVcbiAgICAgKiBbYHRvU3RyaW5nVGFnYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNi4wLyNzZWMtb2JqZWN0LnByb3RvdHlwZS50b3N0cmluZylcbiAgICAgKiBvZiB2YWx1ZXMuXG4gICAgICovXG4gICAgdmFyIG9iamVjdFRvU3RyaW5nJDUgPSBvYmplY3RQcm90byQxMS50b1N0cmluZztcblxuICAgIC8qKlxuICAgICAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGNsYXNzaWZpZWQgYXMgYSB0eXBlZCBhcnJheS5cbiAgICAgKlxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAbWVtYmVyT2YgX1xuICAgICAqIEBzaW5jZSAzLjAuMFxuICAgICAqIEBjYXRlZ29yeSBMYW5nXG4gICAgICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgY29ycmVjdGx5IGNsYXNzaWZpZWQsXG4gICAgICogIGVsc2UgYGZhbHNlYC5cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogXy5pc1R5cGVkQXJyYXkobmV3IFVpbnQ4QXJyYXkpO1xuICAgICAqIC8vID0+IHRydWVcbiAgICAgKlxuICAgICAqIF8uaXNUeXBlZEFycmF5KFtdKTtcbiAgICAgKiAvLyA9PiBmYWxzZVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGlzVHlwZWRBcnJheSh2YWx1ZSkge1xuICAgICAgcmV0dXJuIGlzT2JqZWN0TGlrZSh2YWx1ZSkgJiZcbiAgICAgICAgaXNMZW5ndGgodmFsdWUubGVuZ3RoKSAmJiAhIXR5cGVkQXJyYXlUYWdzW29iamVjdFRvU3RyaW5nJDUuY2FsbCh2YWx1ZSldO1xuICAgIH1cblxuICAgIC8qKiBVc2VkIHRvIGNvbXBvc2UgYml0bWFza3MgZm9yIGNvbXBhcmlzb24gc3R5bGVzLiAqL1xuICAgIHZhciBQQVJUSUFMX0NPTVBBUkVfRkxBRyQxID0gMjtcblxuICAgIC8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbiAgICB2YXIgYXJnc1RhZyQxID0gJ1tvYmplY3QgQXJndW1lbnRzXSc7XG4gICAgdmFyIGFycmF5VGFnID0gJ1tvYmplY3QgQXJyYXldJztcbiAgICB2YXIgb2JqZWN0VGFnID0gJ1tvYmplY3QgT2JqZWN0XSc7XG4gICAgLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xuICAgIHZhciBvYmplY3RQcm90byQ5ID0gT2JqZWN0LnByb3RvdHlwZTtcblxuICAgIC8qKiBVc2VkIHRvIGNoZWNrIG9iamVjdHMgZm9yIG93biBwcm9wZXJ0aWVzLiAqL1xuICAgIHZhciBoYXNPd25Qcm9wZXJ0eSQ1ID0gb2JqZWN0UHJvdG8kOS5oYXNPd25Qcm9wZXJ0eTtcblxuICAgIC8qKlxuICAgICAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgYmFzZUlzRXF1YWxgIGZvciBhcnJheXMgYW5kIG9iamVjdHMgd2hpY2ggcGVyZm9ybXNcbiAgICAgKiBkZWVwIGNvbXBhcmlzb25zIGFuZCB0cmFja3MgdHJhdmVyc2VkIG9iamVjdHMgZW5hYmxpbmcgb2JqZWN0cyB3aXRoIGNpcmN1bGFyXG4gICAgICogcmVmZXJlbmNlcyB0byBiZSBjb21wYXJlZC5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIGNvbXBhcmUuXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG90aGVyIFRoZSBvdGhlciBvYmplY3QgdG8gY29tcGFyZS5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBlcXVhbEZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGRldGVybWluZSBlcXVpdmFsZW50cyBvZiB2YWx1ZXMuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gW2N1c3RvbWl6ZXJdIFRoZSBmdW5jdGlvbiB0byBjdXN0b21pemUgY29tcGFyaXNvbnMuXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IFtiaXRtYXNrXSBUaGUgYml0bWFzayBvZiBjb21wYXJpc29uIGZsYWdzLiBTZWUgYGJhc2VJc0VxdWFsYFxuICAgICAqICBmb3IgbW9yZSBkZXRhaWxzLlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBbc3RhY2tdIFRyYWNrcyB0cmF2ZXJzZWQgYG9iamVjdGAgYW5kIGBvdGhlcmAgb2JqZWN0cy5cbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIG9iamVjdHMgYXJlIGVxdWl2YWxlbnQsIGVsc2UgYGZhbHNlYC5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBiYXNlSXNFcXVhbERlZXAob2JqZWN0LCBvdGhlciwgZXF1YWxGdW5jLCBjdXN0b21pemVyLCBiaXRtYXNrLCBzdGFjaykge1xuICAgICAgdmFyIG9iaklzQXJyID0gaXNBcnJheShvYmplY3QpLFxuICAgICAgICAgIG90aElzQXJyID0gaXNBcnJheShvdGhlciksXG4gICAgICAgICAgb2JqVGFnID0gYXJyYXlUYWcsXG4gICAgICAgICAgb3RoVGFnID0gYXJyYXlUYWc7XG5cbiAgICAgIGlmICghb2JqSXNBcnIpIHtcbiAgICAgICAgb2JqVGFnID0gZ2V0VGFnJDEob2JqZWN0KTtcbiAgICAgICAgb2JqVGFnID0gb2JqVGFnID09IGFyZ3NUYWckMSA/IG9iamVjdFRhZyA6IG9ialRhZztcbiAgICAgIH1cbiAgICAgIGlmICghb3RoSXNBcnIpIHtcbiAgICAgICAgb3RoVGFnID0gZ2V0VGFnJDEob3RoZXIpO1xuICAgICAgICBvdGhUYWcgPSBvdGhUYWcgPT0gYXJnc1RhZyQxID8gb2JqZWN0VGFnIDogb3RoVGFnO1xuICAgICAgfVxuICAgICAgdmFyIG9iaklzT2JqID0gb2JqVGFnID09IG9iamVjdFRhZyAmJiAhaXNIb3N0T2JqZWN0KG9iamVjdCksXG4gICAgICAgICAgb3RoSXNPYmogPSBvdGhUYWcgPT0gb2JqZWN0VGFnICYmICFpc0hvc3RPYmplY3Qob3RoZXIpLFxuICAgICAgICAgIGlzU2FtZVRhZyA9IG9ialRhZyA9PSBvdGhUYWc7XG5cbiAgICAgIGlmIChpc1NhbWVUYWcgJiYgIW9iaklzT2JqKSB7XG4gICAgICAgIHN0YWNrIHx8IChzdGFjayA9IG5ldyBTdGFjayk7XG4gICAgICAgIHJldHVybiAob2JqSXNBcnIgfHwgaXNUeXBlZEFycmF5KG9iamVjdCkpXG4gICAgICAgICAgPyBlcXVhbEFycmF5cyhvYmplY3QsIG90aGVyLCBlcXVhbEZ1bmMsIGN1c3RvbWl6ZXIsIGJpdG1hc2ssIHN0YWNrKVxuICAgICAgICAgIDogZXF1YWxCeVRhZyhvYmplY3QsIG90aGVyLCBvYmpUYWcsIGVxdWFsRnVuYywgY3VzdG9taXplciwgYml0bWFzaywgc3RhY2spO1xuICAgICAgfVxuICAgICAgaWYgKCEoYml0bWFzayAmIFBBUlRJQUxfQ09NUEFSRV9GTEFHJDEpKSB7XG4gICAgICAgIHZhciBvYmpJc1dyYXBwZWQgPSBvYmpJc09iaiAmJiBoYXNPd25Qcm9wZXJ0eSQ1LmNhbGwob2JqZWN0LCAnX193cmFwcGVkX18nKSxcbiAgICAgICAgICAgIG90aElzV3JhcHBlZCA9IG90aElzT2JqICYmIGhhc093blByb3BlcnR5JDUuY2FsbChvdGhlciwgJ19fd3JhcHBlZF9fJyk7XG5cbiAgICAgICAgaWYgKG9iaklzV3JhcHBlZCB8fCBvdGhJc1dyYXBwZWQpIHtcbiAgICAgICAgICB2YXIgb2JqVW53cmFwcGVkID0gb2JqSXNXcmFwcGVkID8gb2JqZWN0LnZhbHVlKCkgOiBvYmplY3QsXG4gICAgICAgICAgICAgIG90aFVud3JhcHBlZCA9IG90aElzV3JhcHBlZCA/IG90aGVyLnZhbHVlKCkgOiBvdGhlcjtcblxuICAgICAgICAgIHN0YWNrIHx8IChzdGFjayA9IG5ldyBTdGFjayk7XG4gICAgICAgICAgcmV0dXJuIGVxdWFsRnVuYyhvYmpVbndyYXBwZWQsIG90aFVud3JhcHBlZCwgY3VzdG9taXplciwgYml0bWFzaywgc3RhY2spO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoIWlzU2FtZVRhZykge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICBzdGFjayB8fCAoc3RhY2sgPSBuZXcgU3RhY2spO1xuICAgICAgcmV0dXJuIGVxdWFsT2JqZWN0cyhvYmplY3QsIG90aGVyLCBlcXVhbEZ1bmMsIGN1c3RvbWl6ZXIsIGJpdG1hc2ssIHN0YWNrKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5pc0VxdWFsYCB3aGljaCBzdXBwb3J0cyBwYXJ0aWFsIGNvbXBhcmlzb25zXG4gICAgICogYW5kIHRyYWNrcyB0cmF2ZXJzZWQgb2JqZWN0cy5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY29tcGFyZS5cbiAgICAgKiBAcGFyYW0geyp9IG90aGVyIFRoZSBvdGhlciB2YWx1ZSB0byBjb21wYXJlLlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IFtjdXN0b21pemVyXSBUaGUgZnVuY3Rpb24gdG8gY3VzdG9taXplIGNvbXBhcmlzb25zLlxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gW2JpdG1hc2tdIFRoZSBiaXRtYXNrIG9mIGNvbXBhcmlzb24gZmxhZ3MuXG4gICAgICogIFRoZSBiaXRtYXNrIG1heSBiZSBjb21wb3NlZCBvZiB0aGUgZm9sbG93aW5nIGZsYWdzOlxuICAgICAqICAgICAxIC0gVW5vcmRlcmVkIGNvbXBhcmlzb25cbiAgICAgKiAgICAgMiAtIFBhcnRpYWwgY29tcGFyaXNvblxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBbc3RhY2tdIFRyYWNrcyB0cmF2ZXJzZWQgYHZhbHVlYCBhbmQgYG90aGVyYCBvYmplY3RzLlxuICAgICAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgdmFsdWVzIGFyZSBlcXVpdmFsZW50LCBlbHNlIGBmYWxzZWAuXG4gICAgICovXG4gICAgZnVuY3Rpb24gYmFzZUlzRXF1YWwodmFsdWUsIG90aGVyLCBjdXN0b21pemVyLCBiaXRtYXNrLCBzdGFjaykge1xuICAgICAgaWYgKHZhbHVlID09PSBvdGhlcikge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGlmICh2YWx1ZSA9PSBudWxsIHx8IG90aGVyID09IG51bGwgfHwgKCFpc09iamVjdCh2YWx1ZSkgJiYgIWlzT2JqZWN0TGlrZShvdGhlcikpKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZSAhPT0gdmFsdWUgJiYgb3RoZXIgIT09IG90aGVyO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGJhc2VJc0VxdWFsRGVlcCh2YWx1ZSwgb3RoZXIsIGJhc2VJc0VxdWFsLCBjdXN0b21pemVyLCBiaXRtYXNrLCBzdGFjayk7XG4gICAgfVxuXG4gICAgdmFyIFVOT1JERVJFRF9DT01QQVJFX0ZMQUcgPSAxO1xuICAgIHZhciBQQVJUSUFMX0NPTVBBUkVfRkxBRyA9IDI7XG4gICAgLyoqXG4gICAgICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uaXNNYXRjaGAgd2l0aG91dCBzdXBwb3J0IGZvciBpdGVyYXRlZSBzaG9ydGhhbmRzLlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gaW5zcGVjdC5cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gc291cmNlIFRoZSBvYmplY3Qgb2YgcHJvcGVydHkgdmFsdWVzIHRvIG1hdGNoLlxuICAgICAqIEBwYXJhbSB7QXJyYXl9IG1hdGNoRGF0YSBUaGUgcHJvcGVydHkgbmFtZXMsIHZhbHVlcywgYW5kIGNvbXBhcmUgZmxhZ3MgdG8gbWF0Y2guXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gW2N1c3RvbWl6ZXJdIFRoZSBmdW5jdGlvbiB0byBjdXN0b21pemUgY29tcGFyaXNvbnMuXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGBvYmplY3RgIGlzIGEgbWF0Y2gsIGVsc2UgYGZhbHNlYC5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBiYXNlSXNNYXRjaChvYmplY3QsIHNvdXJjZSwgbWF0Y2hEYXRhLCBjdXN0b21pemVyKSB7XG4gICAgICB2YXIgaW5kZXggPSBtYXRjaERhdGEubGVuZ3RoLFxuICAgICAgICAgIGxlbmd0aCA9IGluZGV4LFxuICAgICAgICAgIG5vQ3VzdG9taXplciA9ICFjdXN0b21pemVyO1xuXG4gICAgICBpZiAob2JqZWN0ID09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuICFsZW5ndGg7XG4gICAgICB9XG4gICAgICBvYmplY3QgPSBPYmplY3Qob2JqZWN0KTtcbiAgICAgIHdoaWxlIChpbmRleC0tKSB7XG4gICAgICAgIHZhciBkYXRhID0gbWF0Y2hEYXRhW2luZGV4XTtcbiAgICAgICAgaWYgKChub0N1c3RvbWl6ZXIgJiYgZGF0YVsyXSlcbiAgICAgICAgICAgICAgPyBkYXRhWzFdICE9PSBvYmplY3RbZGF0YVswXV1cbiAgICAgICAgICAgICAgOiAhKGRhdGFbMF0gaW4gb2JqZWN0KVxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgICAgICBkYXRhID0gbWF0Y2hEYXRhW2luZGV4XTtcbiAgICAgICAgdmFyIGtleSA9IGRhdGFbMF0sXG4gICAgICAgICAgICBvYmpWYWx1ZSA9IG9iamVjdFtrZXldLFxuICAgICAgICAgICAgc3JjVmFsdWUgPSBkYXRhWzFdO1xuXG4gICAgICAgIGlmIChub0N1c3RvbWl6ZXIgJiYgZGF0YVsyXSkge1xuICAgICAgICAgIGlmIChvYmpWYWx1ZSA9PT0gdW5kZWZpbmVkICYmICEoa2V5IGluIG9iamVjdCkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdmFyIHN0YWNrID0gbmV3IFN0YWNrO1xuICAgICAgICAgIGlmIChjdXN0b21pemVyKSB7XG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0gY3VzdG9taXplcihvYmpWYWx1ZSwgc3JjVmFsdWUsIGtleSwgb2JqZWN0LCBzb3VyY2UsIHN0YWNrKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKCEocmVzdWx0ID09PSB1bmRlZmluZWRcbiAgICAgICAgICAgICAgICA/IGJhc2VJc0VxdWFsKHNyY1ZhbHVlLCBvYmpWYWx1ZSwgY3VzdG9taXplciwgVU5PUkRFUkVEX0NPTVBBUkVfRkxBRyB8IFBBUlRJQUxfQ09NUEFSRV9GTEFHLCBzdGFjaylcbiAgICAgICAgICAgICAgICA6IHJlc3VsdFxuICAgICAgICAgICAgICApKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBzdWl0YWJsZSBmb3Igc3RyaWN0IGVxdWFsaXR5IGNvbXBhcmlzb25zLCBpLmUuIGA9PT1gLlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpZiBzdWl0YWJsZSBmb3Igc3RyaWN0XG4gICAgICogIGVxdWFsaXR5IGNvbXBhcmlzb25zLCBlbHNlIGBmYWxzZWAuXG4gICAgICovXG4gICAgZnVuY3Rpb24gaXNTdHJpY3RDb21wYXJhYmxlKHZhbHVlKSB7XG4gICAgICByZXR1cm4gdmFsdWUgPT09IHZhbHVlICYmICFpc09iamVjdCh2YWx1ZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgcHJvcGVydHkgbmFtZXMsIHZhbHVlcywgYW5kIGNvbXBhcmUgZmxhZ3Mgb2YgYG9iamVjdGAuXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAgICAgKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIG1hdGNoIGRhdGEgb2YgYG9iamVjdGAuXG4gICAgICovXG4gICAgZnVuY3Rpb24gZ2V0TWF0Y2hEYXRhKG9iamVjdCkge1xuICAgICAgdmFyIHJlc3VsdCA9IGtleXMob2JqZWN0KSxcbiAgICAgICAgICBsZW5ndGggPSByZXN1bHQubGVuZ3RoO1xuXG4gICAgICB3aGlsZSAobGVuZ3RoLS0pIHtcbiAgICAgICAgdmFyIGtleSA9IHJlc3VsdFtsZW5ndGhdLFxuICAgICAgICAgICAgdmFsdWUgPSBvYmplY3Rba2V5XTtcblxuICAgICAgICByZXN1bHRbbGVuZ3RoXSA9IFtrZXksIHZhbHVlLCBpc1N0cmljdENvbXBhcmFibGUodmFsdWUpXTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBtYXRjaGVzUHJvcGVydHlgIGZvciBzb3VyY2UgdmFsdWVzIHN1aXRhYmxlXG4gICAgICogZm9yIHN0cmljdCBlcXVhbGl0eSBjb21wYXJpc29ucywgaS5lLiBgPT09YC5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBwcm9wZXJ0eSB0byBnZXQuXG4gICAgICogQHBhcmFtIHsqfSBzcmNWYWx1ZSBUaGUgdmFsdWUgdG8gbWF0Y2guXG4gICAgICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgc3BlYyBmdW5jdGlvbi5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBtYXRjaGVzU3RyaWN0Q29tcGFyYWJsZShrZXksIHNyY1ZhbHVlKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24ob2JqZWN0KSB7XG4gICAgICAgIGlmIChvYmplY3QgPT0gbnVsbCkge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gb2JqZWN0W2tleV0gPT09IHNyY1ZhbHVlICYmXG4gICAgICAgICAgKHNyY1ZhbHVlICE9PSB1bmRlZmluZWQgfHwgKGtleSBpbiBPYmplY3Qob2JqZWN0KSkpO1xuICAgICAgfTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5tYXRjaGVzYCB3aGljaCBkb2Vzbid0IGNsb25lIGBzb3VyY2VgLlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gc291cmNlIFRoZSBvYmplY3Qgb2YgcHJvcGVydHkgdmFsdWVzIHRvIG1hdGNoLlxuICAgICAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IHNwZWMgZnVuY3Rpb24uXG4gICAgICovXG4gICAgZnVuY3Rpb24gYmFzZU1hdGNoZXMoc291cmNlKSB7XG4gICAgICB2YXIgbWF0Y2hEYXRhID0gZ2V0TWF0Y2hEYXRhKHNvdXJjZSk7XG4gICAgICBpZiAobWF0Y2hEYXRhLmxlbmd0aCA9PSAxICYmIG1hdGNoRGF0YVswXVsyXSkge1xuICAgICAgICByZXR1cm4gbWF0Y2hlc1N0cmljdENvbXBhcmFibGUobWF0Y2hEYXRhWzBdWzBdLCBtYXRjaERhdGFbMF1bMV0pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGZ1bmN0aW9uKG9iamVjdCkge1xuICAgICAgICByZXR1cm4gb2JqZWN0ID09PSBzb3VyY2UgfHwgYmFzZUlzTWF0Y2gob2JqZWN0LCBzb3VyY2UsIG1hdGNoRGF0YSk7XG4gICAgICB9O1xuICAgIH1cblxuICAgIC8qKiBVc2VkIGFzIHRoZSBgVHlwZUVycm9yYCBtZXNzYWdlIGZvciBcIkZ1bmN0aW9uc1wiIG1ldGhvZHMuICovXG4gICAgdmFyIEZVTkNfRVJST1JfVEVYVCQxID0gJ0V4cGVjdGVkIGEgZnVuY3Rpb24nO1xuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIGZ1bmN0aW9uIHRoYXQgbWVtb2l6ZXMgdGhlIHJlc3VsdCBvZiBgZnVuY2AuIElmIGByZXNvbHZlcmAgaXNcbiAgICAgKiBwcm92aWRlZCwgaXQgZGV0ZXJtaW5lcyB0aGUgY2FjaGUga2V5IGZvciBzdG9yaW5nIHRoZSByZXN1bHQgYmFzZWQgb24gdGhlXG4gICAgICogYXJndW1lbnRzIHByb3ZpZGVkIHRvIHRoZSBtZW1vaXplZCBmdW5jdGlvbi4gQnkgZGVmYXVsdCwgdGhlIGZpcnN0IGFyZ3VtZW50XG4gICAgICogcHJvdmlkZWQgdG8gdGhlIG1lbW9pemVkIGZ1bmN0aW9uIGlzIHVzZWQgYXMgdGhlIG1hcCBjYWNoZSBrZXkuIFRoZSBgZnVuY2BcbiAgICAgKiBpcyBpbnZva2VkIHdpdGggdGhlIGB0aGlzYCBiaW5kaW5nIG9mIHRoZSBtZW1vaXplZCBmdW5jdGlvbi5cbiAgICAgKlxuICAgICAqICoqTm90ZToqKiBUaGUgY2FjaGUgaXMgZXhwb3NlZCBhcyB0aGUgYGNhY2hlYCBwcm9wZXJ0eSBvbiB0aGUgbWVtb2l6ZWRcbiAgICAgKiBmdW5jdGlvbi4gSXRzIGNyZWF0aW9uIG1heSBiZSBjdXN0b21pemVkIGJ5IHJlcGxhY2luZyB0aGUgYF8ubWVtb2l6ZS5DYWNoZWBcbiAgICAgKiBjb25zdHJ1Y3RvciB3aXRoIG9uZSB3aG9zZSBpbnN0YW5jZXMgaW1wbGVtZW50IHRoZVxuICAgICAqIFtgTWFwYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNi4wLyNzZWMtcHJvcGVydGllcy1vZi10aGUtbWFwLXByb3RvdHlwZS1vYmplY3QpXG4gICAgICogbWV0aG9kIGludGVyZmFjZSBvZiBgZGVsZXRlYCwgYGdldGAsIGBoYXNgLCBhbmQgYHNldGAuXG4gICAgICpcbiAgICAgKiBAc3RhdGljXG4gICAgICogQG1lbWJlck9mIF9cbiAgICAgKiBAc2luY2UgMC4xLjBcbiAgICAgKiBAY2F0ZWdvcnkgRnVuY3Rpb25cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBoYXZlIGl0cyBvdXRwdXQgbWVtb2l6ZWQuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gW3Jlc29sdmVyXSBUaGUgZnVuY3Rpb24gdG8gcmVzb2x2ZSB0aGUgY2FjaGUga2V5LlxuICAgICAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IG1lbW9pemVkIGZ1bmN0aW9uLlxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiB2YXIgb2JqZWN0ID0geyAnYSc6IDEsICdiJzogMiB9O1xuICAgICAqIHZhciBvdGhlciA9IHsgJ2MnOiAzLCAnZCc6IDQgfTtcbiAgICAgKlxuICAgICAqIHZhciB2YWx1ZXMgPSBfLm1lbW9pemUoXy52YWx1ZXMpO1xuICAgICAqIHZhbHVlcyhvYmplY3QpO1xuICAgICAqIC8vID0+IFsxLCAyXVxuICAgICAqXG4gICAgICogdmFsdWVzKG90aGVyKTtcbiAgICAgKiAvLyA9PiBbMywgNF1cbiAgICAgKlxuICAgICAqIG9iamVjdC5hID0gMjtcbiAgICAgKiB2YWx1ZXMob2JqZWN0KTtcbiAgICAgKiAvLyA9PiBbMSwgMl1cbiAgICAgKlxuICAgICAqIC8vIE1vZGlmeSB0aGUgcmVzdWx0IGNhY2hlLlxuICAgICAqIHZhbHVlcy5jYWNoZS5zZXQob2JqZWN0LCBbJ2EnLCAnYiddKTtcbiAgICAgKiB2YWx1ZXMob2JqZWN0KTtcbiAgICAgKiAvLyA9PiBbJ2EnLCAnYiddXG4gICAgICpcbiAgICAgKiAvLyBSZXBsYWNlIGBfLm1lbW9pemUuQ2FjaGVgLlxuICAgICAqIF8ubWVtb2l6ZS5DYWNoZSA9IFdlYWtNYXA7XG4gICAgICovXG4gICAgZnVuY3Rpb24gbWVtb2l6ZShmdW5jLCByZXNvbHZlcikge1xuICAgICAgaWYgKHR5cGVvZiBmdW5jICE9ICdmdW5jdGlvbicgfHwgKHJlc29sdmVyICYmIHR5cGVvZiByZXNvbHZlciAhPSAnZnVuY3Rpb24nKSkge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKEZVTkNfRVJST1JfVEVYVCQxKTtcbiAgICAgIH1cbiAgICAgIHZhciBtZW1vaXplZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgYXJncyA9IGFyZ3VtZW50cyxcbiAgICAgICAgICAgIGtleSA9IHJlc29sdmVyID8gcmVzb2x2ZXIuYXBwbHkodGhpcywgYXJncykgOiBhcmdzWzBdLFxuICAgICAgICAgICAgY2FjaGUgPSBtZW1vaXplZC5jYWNoZTtcblxuICAgICAgICBpZiAoY2FjaGUuaGFzKGtleSkpIHtcbiAgICAgICAgICByZXR1cm4gY2FjaGUuZ2V0KGtleSk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHJlc3VsdCA9IGZ1bmMuYXBwbHkodGhpcywgYXJncyk7XG4gICAgICAgIG1lbW9pemVkLmNhY2hlID0gY2FjaGUuc2V0KGtleSwgcmVzdWx0KTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgIH07XG4gICAgICBtZW1vaXplZC5jYWNoZSA9IG5ldyAobWVtb2l6ZS5DYWNoZSB8fCBNYXBDYWNoZSk7XG4gICAgICByZXR1cm4gbWVtb2l6ZWQ7XG4gICAgfVxuXG4gICAgLy8gQXNzaWduIGNhY2hlIHRvIGBfLm1lbW9pemVgLlxuICAgIG1lbW9pemUuQ2FjaGUgPSBNYXBDYWNoZTtcblxuICAgIC8qKiBVc2VkIGFzIHJlZmVyZW5jZXMgZm9yIHZhcmlvdXMgYE51bWJlcmAgY29uc3RhbnRzLiAqL1xuICAgIHZhciBJTkZJTklUWSQxID0gMSAvIDA7XG5cbiAgICAvKiogVXNlZCB0byBjb252ZXJ0IHN5bWJvbHMgdG8gcHJpbWl0aXZlcyBhbmQgc3RyaW5ncy4gKi9cbiAgICB2YXIgc3ltYm9sUHJvdG8kMSA9IFN5bWJvbCQxID8gU3ltYm9sJDEucHJvdG90eXBlIDogdW5kZWZpbmVkO1xuICAgIHZhciBzeW1ib2xUb1N0cmluZyA9IHN5bWJvbFByb3RvJDEgPyBzeW1ib2xQcm90byQxLnRvU3RyaW5nIDogdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLnRvU3RyaW5nYCB3aGljaCBkb2Vzbid0IGNvbnZlcnQgbnVsbGlzaFxuICAgICAqIHZhbHVlcyB0byBlbXB0eSBzdHJpbmdzLlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBwcm9jZXNzLlxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIHN0cmluZy5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBiYXNlVG9TdHJpbmcodmFsdWUpIHtcbiAgICAgIC8vIEV4aXQgZWFybHkgZm9yIHN0cmluZ3MgdG8gYXZvaWQgYSBwZXJmb3JtYW5jZSBoaXQgaW4gc29tZSBlbnZpcm9ubWVudHMuXG4gICAgICBpZiAodHlwZW9mIHZhbHVlID09ICdzdHJpbmcnKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgIH1cbiAgICAgIGlmIChpc1N5bWJvbCh2YWx1ZSkpIHtcbiAgICAgICAgcmV0dXJuIHN5bWJvbFRvU3RyaW5nID8gc3ltYm9sVG9TdHJpbmcuY2FsbCh2YWx1ZSkgOiAnJztcbiAgICAgIH1cbiAgICAgIHZhciByZXN1bHQgPSAodmFsdWUgKyAnJyk7XG4gICAgICByZXR1cm4gKHJlc3VsdCA9PSAnMCcgJiYgKDEgLyB2YWx1ZSkgPT0gLUlORklOSVRZJDEpID8gJy0wJyA6IHJlc3VsdDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDb252ZXJ0cyBgdmFsdWVgIHRvIGEgc3RyaW5nLiBBbiBlbXB0eSBzdHJpbmcgaXMgcmV0dXJuZWQgZm9yIGBudWxsYFxuICAgICAqIGFuZCBgdW5kZWZpbmVkYCB2YWx1ZXMuIFRoZSBzaWduIG9mIGAtMGAgaXMgcHJlc2VydmVkLlxuICAgICAqXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBtZW1iZXJPZiBfXG4gICAgICogQHNpbmNlIDQuMC4wXG4gICAgICogQGNhdGVnb3J5IExhbmdcbiAgICAgKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBwcm9jZXNzLlxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIHN0cmluZy5cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogXy50b1N0cmluZyhudWxsKTtcbiAgICAgKiAvLyA9PiAnJ1xuICAgICAqXG4gICAgICogXy50b1N0cmluZygtMCk7XG4gICAgICogLy8gPT4gJy0wJ1xuICAgICAqXG4gICAgICogXy50b1N0cmluZyhbMSwgMiwgM10pO1xuICAgICAqIC8vID0+ICcxLDIsMydcbiAgICAgKi9cbiAgICBmdW5jdGlvbiB0b1N0cmluZyh2YWx1ZSkge1xuICAgICAgcmV0dXJuIHZhbHVlID09IG51bGwgPyAnJyA6IGJhc2VUb1N0cmluZyh2YWx1ZSk7XG4gICAgfVxuXG4gICAgLyoqIFVzZWQgdG8gbWF0Y2ggcHJvcGVydHkgbmFtZXMgd2l0aGluIHByb3BlcnR5IHBhdGhzLiAqL1xuICAgIHZhciByZVByb3BOYW1lID0gL1teLltcXF1dK3xcXFsoPzooLT9cXGQrKD86XFwuXFxkKyk/KXwoW1wiJ10pKCg/Oig/IVxcMilbXlxcXFxdfFxcXFwuKSo/KVxcMilcXF18KD89KFxcLnxcXFtcXF0pKD86XFw0fCQpKS9nO1xuXG4gICAgLyoqIFVzZWQgdG8gbWF0Y2ggYmFja3NsYXNoZXMgaW4gcHJvcGVydHkgcGF0aHMuICovXG4gICAgdmFyIHJlRXNjYXBlQ2hhciA9IC9cXFxcKFxcXFwpPy9nO1xuXG4gICAgLyoqXG4gICAgICogQ29udmVydHMgYHN0cmluZ2AgdG8gYSBwcm9wZXJ0eSBwYXRoIGFycmF5LlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc3RyaW5nIFRoZSBzdHJpbmcgdG8gY29udmVydC5cbiAgICAgKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIHByb3BlcnR5IHBhdGggYXJyYXkuXG4gICAgICovXG4gICAgdmFyIHN0cmluZ1RvUGF0aCA9IG1lbW9pemUoZnVuY3Rpb24oc3RyaW5nKSB7XG4gICAgICB2YXIgcmVzdWx0ID0gW107XG4gICAgICB0b1N0cmluZyhzdHJpbmcpLnJlcGxhY2UocmVQcm9wTmFtZSwgZnVuY3Rpb24obWF0Y2gsIG51bWJlciwgcXVvdGUsIHN0cmluZykge1xuICAgICAgICByZXN1bHQucHVzaChxdW90ZSA/IHN0cmluZy5yZXBsYWNlKHJlRXNjYXBlQ2hhciwgJyQxJykgOiAobnVtYmVyIHx8IG1hdGNoKSk7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfSk7XG5cbiAgICAvKipcbiAgICAgKiBDYXN0cyBgdmFsdWVgIHRvIGEgcGF0aCBhcnJheSBpZiBpdCdzIG5vdCBvbmUuXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGluc3BlY3QuXG4gICAgICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBjYXN0IHByb3BlcnR5IHBhdGggYXJyYXkuXG4gICAgICovXG4gICAgZnVuY3Rpb24gY2FzdFBhdGgodmFsdWUpIHtcbiAgICAgIHJldHVybiBpc0FycmF5KHZhbHVlKSA/IHZhbHVlIDogc3RyaW5nVG9QYXRoKHZhbHVlKTtcbiAgICB9XG5cbiAgICB2YXIgcmVJc0RlZXBQcm9wID0gL1xcLnxcXFsoPzpbXltcXF1dKnwoW1wiJ10pKD86KD8hXFwxKVteXFxcXF18XFxcXC4pKj9cXDEpXFxdLztcbiAgICB2YXIgcmVJc1BsYWluUHJvcCA9IC9eXFx3KiQvO1xuICAgIC8qKlxuICAgICAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgcHJvcGVydHkgbmFtZSBhbmQgbm90IGEgcHJvcGVydHkgcGF0aC5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gICAgICogQHBhcmFtIHtPYmplY3R9IFtvYmplY3RdIFRoZSBvYmplY3QgdG8gcXVlcnkga2V5cyBvbi5cbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHByb3BlcnR5IG5hbWUsIGVsc2UgYGZhbHNlYC5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBpc0tleSh2YWx1ZSwgb2JqZWN0KSB7XG4gICAgICBpZiAoaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgdmFyIHR5cGUgPSB0eXBlb2YgdmFsdWU7XG4gICAgICBpZiAodHlwZSA9PSAnbnVtYmVyJyB8fCB0eXBlID09ICdzeW1ib2wnIHx8IHR5cGUgPT0gJ2Jvb2xlYW4nIHx8XG4gICAgICAgICAgdmFsdWUgPT0gbnVsbCB8fCBpc1N5bWJvbCh2YWx1ZSkpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVJc1BsYWluUHJvcC50ZXN0KHZhbHVlKSB8fCAhcmVJc0RlZXBQcm9wLnRlc3QodmFsdWUpIHx8XG4gICAgICAgIChvYmplY3QgIT0gbnVsbCAmJiB2YWx1ZSBpbiBPYmplY3Qob2JqZWN0KSk7XG4gICAgfVxuXG4gICAgLyoqIFVzZWQgYXMgcmVmZXJlbmNlcyBmb3IgdmFyaW91cyBgTnVtYmVyYCBjb25zdGFudHMuICovXG4gICAgdmFyIElORklOSVRZJDIgPSAxIC8gMDtcblxuICAgIC8qKlxuICAgICAqIENvbnZlcnRzIGB2YWx1ZWAgdG8gYSBzdHJpbmcga2V5IGlmIGl0J3Mgbm90IGEgc3RyaW5nIG9yIHN5bWJvbC5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gaW5zcGVjdC5cbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfHN5bWJvbH0gUmV0dXJucyB0aGUga2V5LlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIHRvS2V5KHZhbHVlKSB7XG4gICAgICBpZiAodHlwZW9mIHZhbHVlID09ICdzdHJpbmcnIHx8IGlzU3ltYm9sKHZhbHVlKSkge1xuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICB9XG4gICAgICB2YXIgcmVzdWx0ID0gKHZhbHVlICsgJycpO1xuICAgICAgcmV0dXJuIChyZXN1bHQgPT0gJzAnICYmICgxIC8gdmFsdWUpID09IC1JTkZJTklUWSQyKSA/ICctMCcgOiByZXN1bHQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uZ2V0YCB3aXRob3V0IHN1cHBvcnQgZm9yIGRlZmF1bHQgdmFsdWVzLlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gICAgICogQHBhcmFtIHtBcnJheXxzdHJpbmd9IHBhdGggVGhlIHBhdGggb2YgdGhlIHByb3BlcnR5IHRvIGdldC5cbiAgICAgKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgcmVzb2x2ZWQgdmFsdWUuXG4gICAgICovXG4gICAgZnVuY3Rpb24gYmFzZUdldChvYmplY3QsIHBhdGgpIHtcbiAgICAgIHBhdGggPSBpc0tleShwYXRoLCBvYmplY3QpID8gW3BhdGhdIDogY2FzdFBhdGgocGF0aCk7XG5cbiAgICAgIHZhciBpbmRleCA9IDAsXG4gICAgICAgICAgbGVuZ3RoID0gcGF0aC5sZW5ndGg7XG5cbiAgICAgIHdoaWxlIChvYmplY3QgIT0gbnVsbCAmJiBpbmRleCA8IGxlbmd0aCkge1xuICAgICAgICBvYmplY3QgPSBvYmplY3RbdG9LZXkocGF0aFtpbmRleCsrXSldO1xuICAgICAgfVxuICAgICAgcmV0dXJuIChpbmRleCAmJiBpbmRleCA9PSBsZW5ndGgpID8gb2JqZWN0IDogdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIHZhbHVlIGF0IGBwYXRoYCBvZiBgb2JqZWN0YC4gSWYgdGhlIHJlc29sdmVkIHZhbHVlIGlzXG4gICAgICogYHVuZGVmaW5lZGAsIHRoZSBgZGVmYXVsdFZhbHVlYCBpcyB1c2VkIGluIGl0cyBwbGFjZS5cbiAgICAgKlxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAbWVtYmVyT2YgX1xuICAgICAqIEBzaW5jZSAzLjcuMFxuICAgICAqIEBjYXRlZ29yeSBPYmplY3RcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gICAgICogQHBhcmFtIHtBcnJheXxzdHJpbmd9IHBhdGggVGhlIHBhdGggb2YgdGhlIHByb3BlcnR5IHRvIGdldC5cbiAgICAgKiBAcGFyYW0geyp9IFtkZWZhdWx0VmFsdWVdIFRoZSB2YWx1ZSByZXR1cm5lZCBmb3IgYHVuZGVmaW5lZGAgcmVzb2x2ZWQgdmFsdWVzLlxuICAgICAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSByZXNvbHZlZCB2YWx1ZS5cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogdmFyIG9iamVjdCA9IHsgJ2EnOiBbeyAnYic6IHsgJ2MnOiAzIH0gfV0gfTtcbiAgICAgKlxuICAgICAqIF8uZ2V0KG9iamVjdCwgJ2FbMF0uYi5jJyk7XG4gICAgICogLy8gPT4gM1xuICAgICAqXG4gICAgICogXy5nZXQob2JqZWN0LCBbJ2EnLCAnMCcsICdiJywgJ2MnXSk7XG4gICAgICogLy8gPT4gM1xuICAgICAqXG4gICAgICogXy5nZXQob2JqZWN0LCAnYS5iLmMnLCAnZGVmYXVsdCcpO1xuICAgICAqIC8vID0+ICdkZWZhdWx0J1xuICAgICAqL1xuICAgIGZ1bmN0aW9uIGdldChvYmplY3QsIHBhdGgsIGRlZmF1bHRWYWx1ZSkge1xuICAgICAgdmFyIHJlc3VsdCA9IG9iamVjdCA9PSBudWxsID8gdW5kZWZpbmVkIDogYmFzZUdldChvYmplY3QsIHBhdGgpO1xuICAgICAgcmV0dXJuIHJlc3VsdCA9PT0gdW5kZWZpbmVkID8gZGVmYXVsdFZhbHVlIDogcmVzdWx0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmhhc0luYCB3aXRob3V0IHN1cHBvcnQgZm9yIGRlZXAgcGF0aHMuXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBbb2JqZWN0XSBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICAgICAqIEBwYXJhbSB7QXJyYXl8c3RyaW5nfSBrZXkgVGhlIGtleSB0byBjaGVjay5cbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYGtleWAgZXhpc3RzLCBlbHNlIGBmYWxzZWAuXG4gICAgICovXG4gICAgZnVuY3Rpb24gYmFzZUhhc0luKG9iamVjdCwga2V5KSB7XG4gICAgICByZXR1cm4gb2JqZWN0ICE9IG51bGwgJiYga2V5IGluIE9iamVjdChvYmplY3QpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENoZWNrcyBpZiBgcGF0aGAgZXhpc3RzIG9uIGBvYmplY3RgLlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gICAgICogQHBhcmFtIHtBcnJheXxzdHJpbmd9IHBhdGggVGhlIHBhdGggdG8gY2hlY2suXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gaGFzRnVuYyBUaGUgZnVuY3Rpb24gdG8gY2hlY2sgcHJvcGVydGllcy5cbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHBhdGhgIGV4aXN0cywgZWxzZSBgZmFsc2VgLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGhhc1BhdGgob2JqZWN0LCBwYXRoLCBoYXNGdW5jKSB7XG4gICAgICBwYXRoID0gaXNLZXkocGF0aCwgb2JqZWN0KSA/IFtwYXRoXSA6IGNhc3RQYXRoKHBhdGgpO1xuXG4gICAgICB2YXIgcmVzdWx0LFxuICAgICAgICAgIGluZGV4ID0gLTEsXG4gICAgICAgICAgbGVuZ3RoID0gcGF0aC5sZW5ndGg7XG5cbiAgICAgIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgICAgIHZhciBrZXkgPSB0b0tleShwYXRoW2luZGV4XSk7XG4gICAgICAgIGlmICghKHJlc3VsdCA9IG9iamVjdCAhPSBudWxsICYmIGhhc0Z1bmMob2JqZWN0LCBrZXkpKSkge1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIG9iamVjdCA9IG9iamVjdFtrZXldO1xuICAgICAgfVxuICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgfVxuICAgICAgdmFyIGxlbmd0aCA9IG9iamVjdCA/IG9iamVjdC5sZW5ndGggOiAwO1xuICAgICAgcmV0dXJuICEhbGVuZ3RoICYmIGlzTGVuZ3RoKGxlbmd0aCkgJiYgaXNJbmRleChrZXksIGxlbmd0aCkgJiZcbiAgICAgICAgKGlzQXJyYXkob2JqZWN0KSB8fCBpc1N0cmluZyhvYmplY3QpIHx8IGlzQXJndW1lbnRzKG9iamVjdCkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENoZWNrcyBpZiBgcGF0aGAgaXMgYSBkaXJlY3Qgb3IgaW5oZXJpdGVkIHByb3BlcnR5IG9mIGBvYmplY3RgLlxuICAgICAqXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBtZW1iZXJPZiBfXG4gICAgICogQHNpbmNlIDQuMC4wXG4gICAgICogQGNhdGVnb3J5IE9iamVjdFxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAgICAgKiBAcGFyYW0ge0FycmF5fHN0cmluZ30gcGF0aCBUaGUgcGF0aCB0byBjaGVjay5cbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHBhdGhgIGV4aXN0cywgZWxzZSBgZmFsc2VgLlxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiB2YXIgb2JqZWN0ID0gXy5jcmVhdGUoeyAnYSc6IF8uY3JlYXRlKHsgJ2InOiAyIH0pIH0pO1xuICAgICAqXG4gICAgICogXy5oYXNJbihvYmplY3QsICdhJyk7XG4gICAgICogLy8gPT4gdHJ1ZVxuICAgICAqXG4gICAgICogXy5oYXNJbihvYmplY3QsICdhLmInKTtcbiAgICAgKiAvLyA9PiB0cnVlXG4gICAgICpcbiAgICAgKiBfLmhhc0luKG9iamVjdCwgWydhJywgJ2InXSk7XG4gICAgICogLy8gPT4gdHJ1ZVxuICAgICAqXG4gICAgICogXy5oYXNJbihvYmplY3QsICdiJyk7XG4gICAgICogLy8gPT4gZmFsc2VcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBoYXNJbihvYmplY3QsIHBhdGgpIHtcbiAgICAgIHJldHVybiBvYmplY3QgIT0gbnVsbCAmJiBoYXNQYXRoKG9iamVjdCwgcGF0aCwgYmFzZUhhc0luKTtcbiAgICB9XG5cbiAgICB2YXIgVU5PUkRFUkVEX0NPTVBBUkVfRkxBRyQzID0gMTtcbiAgICB2YXIgUEFSVElBTF9DT01QQVJFX0ZMQUckNSA9IDI7XG4gICAgLyoqXG4gICAgICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8ubWF0Y2hlc1Byb3BlcnR5YCB3aGljaCBkb2Vzbid0IGNsb25lIGBzcmNWYWx1ZWAuXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwYXRoIFRoZSBwYXRoIG9mIHRoZSBwcm9wZXJ0eSB0byBnZXQuXG4gICAgICogQHBhcmFtIHsqfSBzcmNWYWx1ZSBUaGUgdmFsdWUgdG8gbWF0Y2guXG4gICAgICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgc3BlYyBmdW5jdGlvbi5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBiYXNlTWF0Y2hlc1Byb3BlcnR5KHBhdGgsIHNyY1ZhbHVlKSB7XG4gICAgICBpZiAoaXNLZXkocGF0aCkgJiYgaXNTdHJpY3RDb21wYXJhYmxlKHNyY1ZhbHVlKSkge1xuICAgICAgICByZXR1cm4gbWF0Y2hlc1N0cmljdENvbXBhcmFibGUodG9LZXkocGF0aCksIHNyY1ZhbHVlKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBmdW5jdGlvbihvYmplY3QpIHtcbiAgICAgICAgdmFyIG9ialZhbHVlID0gZ2V0KG9iamVjdCwgcGF0aCk7XG4gICAgICAgIHJldHVybiAob2JqVmFsdWUgPT09IHVuZGVmaW5lZCAmJiBvYmpWYWx1ZSA9PT0gc3JjVmFsdWUpXG4gICAgICAgICAgPyBoYXNJbihvYmplY3QsIHBhdGgpXG4gICAgICAgICAgOiBiYXNlSXNFcXVhbChzcmNWYWx1ZSwgb2JqVmFsdWUsIHVuZGVmaW5lZCwgVU5PUkRFUkVEX0NPTVBBUkVfRkxBRyQzIHwgUEFSVElBTF9DT01QQVJFX0ZMQUckNSk7XG4gICAgICB9O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRoaXMgbWV0aG9kIHJldHVybnMgdGhlIGZpcnN0IGFyZ3VtZW50IGdpdmVuIHRvIGl0LlxuICAgICAqXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBzaW5jZSAwLjEuMFxuICAgICAqIEBtZW1iZXJPZiBfXG4gICAgICogQGNhdGVnb3J5IFV0aWxcbiAgICAgKiBAcGFyYW0geyp9IHZhbHVlIEFueSB2YWx1ZS5cbiAgICAgKiBAcmV0dXJucyB7Kn0gUmV0dXJucyBgdmFsdWVgLlxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiB2YXIgb2JqZWN0ID0geyAndXNlcic6ICdmcmVkJyB9O1xuICAgICAqXG4gICAgICogY29uc29sZS5sb2coXy5pZGVudGl0eShvYmplY3QpID09PSBvYmplY3QpO1xuICAgICAqIC8vID0+IHRydWVcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBpZGVudGl0eSh2YWx1ZSkge1xuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgYmFzZVByb3BlcnR5YCB3aGljaCBzdXBwb3J0cyBkZWVwIHBhdGhzLlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAcGFyYW0ge0FycmF5fHN0cmluZ30gcGF0aCBUaGUgcGF0aCBvZiB0aGUgcHJvcGVydHkgdG8gZ2V0LlxuICAgICAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGFjY2Vzc29yIGZ1bmN0aW9uLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGJhc2VQcm9wZXJ0eURlZXAocGF0aCkge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uKG9iamVjdCkge1xuICAgICAgICByZXR1cm4gYmFzZUdldChvYmplY3QsIHBhdGgpO1xuICAgICAgfTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgZnVuY3Rpb24gdGhhdCByZXR1cm5zIHRoZSB2YWx1ZSBhdCBgcGF0aGAgb2YgYSBnaXZlbiBvYmplY3QuXG4gICAgICpcbiAgICAgKiBAc3RhdGljXG4gICAgICogQG1lbWJlck9mIF9cbiAgICAgKiBAc2luY2UgMi40LjBcbiAgICAgKiBAY2F0ZWdvcnkgVXRpbFxuICAgICAqIEBwYXJhbSB7QXJyYXl8c3RyaW5nfSBwYXRoIFRoZSBwYXRoIG9mIHRoZSBwcm9wZXJ0eSB0byBnZXQuXG4gICAgICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgYWNjZXNzb3IgZnVuY3Rpb24uXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqIHZhciBvYmplY3RzID0gW1xuICAgICAqICAgeyAnYSc6IHsgJ2InOiAyIH0gfSxcbiAgICAgKiAgIHsgJ2EnOiB7ICdiJzogMSB9IH1cbiAgICAgKiBdO1xuICAgICAqXG4gICAgICogXy5tYXAob2JqZWN0cywgXy5wcm9wZXJ0eSgnYS5iJykpO1xuICAgICAqIC8vID0+IFsyLCAxXVxuICAgICAqXG4gICAgICogXy5tYXAoXy5zb3J0Qnkob2JqZWN0cywgXy5wcm9wZXJ0eShbJ2EnLCAnYiddKSksICdhLmInKTtcbiAgICAgKiAvLyA9PiBbMSwgMl1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBwcm9wZXJ0eShwYXRoKSB7XG4gICAgICByZXR1cm4gaXNLZXkocGF0aCkgPyBiYXNlUHJvcGVydHkodG9LZXkocGF0aCkpIDogYmFzZVByb3BlcnR5RGVlcChwYXRoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5pdGVyYXRlZWAuXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBwYXJhbSB7Kn0gW3ZhbHVlPV8uaWRlbnRpdHldIFRoZSB2YWx1ZSB0byBjb252ZXJ0IHRvIGFuIGl0ZXJhdGVlLlxuICAgICAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgaXRlcmF0ZWUuXG4gICAgICovXG4gICAgZnVuY3Rpb24gYmFzZUl0ZXJhdGVlKHZhbHVlKSB7XG4gICAgICAvLyBEb24ndCBzdG9yZSB0aGUgYHR5cGVvZmAgcmVzdWx0IGluIGEgdmFyaWFibGUgdG8gYXZvaWQgYSBKSVQgYnVnIGluIFNhZmFyaSA5LlxuICAgICAgLy8gU2VlIGh0dHBzOi8vYnVncy53ZWJraXQub3JnL3Nob3dfYnVnLmNnaT9pZD0xNTYwMzQgZm9yIG1vcmUgZGV0YWlscy5cbiAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICB9XG4gICAgICBpZiAodmFsdWUgPT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gaWRlbnRpdHk7XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIHZhbHVlID09ICdvYmplY3QnKSB7XG4gICAgICAgIHJldHVybiBpc0FycmF5KHZhbHVlKVxuICAgICAgICAgID8gYmFzZU1hdGNoZXNQcm9wZXJ0eSh2YWx1ZVswXSwgdmFsdWVbMV0pXG4gICAgICAgICAgOiBiYXNlTWF0Y2hlcyh2YWx1ZSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcHJvcGVydHkodmFsdWUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEl0ZXJhdGVzIG92ZXIgb3duIGVudW1lcmFibGUgc3RyaW5nIGtleWVkIHByb3BlcnRpZXMgb2YgYW4gb2JqZWN0IGFuZFxuICAgICAqIGludm9rZXMgYGl0ZXJhdGVlYCBmb3IgZWFjaCBwcm9wZXJ0eS4gVGhlIGl0ZXJhdGVlIGlzIGludm9rZWQgd2l0aCB0aHJlZVxuICAgICAqIGFyZ3VtZW50czogKHZhbHVlLCBrZXksIG9iamVjdCkuIEl0ZXJhdGVlIGZ1bmN0aW9ucyBtYXkgZXhpdCBpdGVyYXRpb25cbiAgICAgKiBlYXJseSBieSBleHBsaWNpdGx5IHJldHVybmluZyBgZmFsc2VgLlxuICAgICAqXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBtZW1iZXJPZiBfXG4gICAgICogQHNpbmNlIDAuMy4wXG4gICAgICogQGNhdGVnb3J5IE9iamVjdFxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBpdGVyYXRlIG92ZXIuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gW2l0ZXJhdGVlPV8uaWRlbnRpdHldIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBpdGVyYXRpb24uXG4gICAgICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyBgb2JqZWN0YC5cbiAgICAgKiBAc2VlIF8uZm9yT3duUmlnaHRcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogZnVuY3Rpb24gRm9vKCkge1xuICAgICAqICAgdGhpcy5hID0gMTtcbiAgICAgKiAgIHRoaXMuYiA9IDI7XG4gICAgICogfVxuICAgICAqXG4gICAgICogRm9vLnByb3RvdHlwZS5jID0gMztcbiAgICAgKlxuICAgICAqIF8uZm9yT3duKG5ldyBGb28sIGZ1bmN0aW9uKHZhbHVlLCBrZXkpIHtcbiAgICAgKiAgIGNvbnNvbGUubG9nKGtleSk7XG4gICAgICogfSk7XG4gICAgICogLy8gPT4gTG9ncyAnYScgdGhlbiAnYicgKGl0ZXJhdGlvbiBvcmRlciBpcyBub3QgZ3VhcmFudGVlZCkuXG4gICAgICovXG4gICAgZnVuY3Rpb24gZm9yT3duKG9iamVjdCwgaXRlcmF0ZWUpIHtcbiAgICAgIHJldHVybiBvYmplY3QgJiYgYmFzZUZvck93bihvYmplY3QsIGJhc2VJdGVyYXRlZShpdGVyYXRlZSwgMykpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIGluZGV4IGF0IHdoaWNoIHRoZSBmaXJzdCBvY2N1cnJlbmNlIG9mIGBOYU5gIGlzIGZvdW5kIGluIGBhcnJheWAuXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBzZWFyY2guXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGZyb21JbmRleCBUaGUgaW5kZXggdG8gc2VhcmNoIGZyb20uXG4gICAgICogQHBhcmFtIHtib29sZWFufSBbZnJvbVJpZ2h0XSBTcGVjaWZ5IGl0ZXJhdGluZyBmcm9tIHJpZ2h0IHRvIGxlZnQuXG4gICAgICogQHJldHVybnMge251bWJlcn0gUmV0dXJucyB0aGUgaW5kZXggb2YgdGhlIG1hdGNoZWQgYE5hTmAsIGVsc2UgYC0xYC5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBpbmRleE9mTmFOKGFycmF5LCBmcm9tSW5kZXgsIGZyb21SaWdodCkge1xuICAgICAgdmFyIGxlbmd0aCA9IGFycmF5Lmxlbmd0aCxcbiAgICAgICAgICBpbmRleCA9IGZyb21JbmRleCArIChmcm9tUmlnaHQgPyAxIDogLTEpO1xuXG4gICAgICB3aGlsZSAoKGZyb21SaWdodCA/IGluZGV4LS0gOiArK2luZGV4IDwgbGVuZ3RoKSkge1xuICAgICAgICB2YXIgb3RoZXIgPSBhcnJheVtpbmRleF07XG4gICAgICAgIGlmIChvdGhlciAhPT0gb3RoZXIpIHtcbiAgICAgICAgICByZXR1cm4gaW5kZXg7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiAtMTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5pbmRleE9mYCB3aXRob3V0IGBmcm9tSW5kZXhgIGJvdW5kcyBjaGVja3MuXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBzZWFyY2guXG4gICAgICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gc2VhcmNoIGZvci5cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gZnJvbUluZGV4IFRoZSBpbmRleCB0byBzZWFyY2ggZnJvbS5cbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfSBSZXR1cm5zIHRoZSBpbmRleCBvZiB0aGUgbWF0Y2hlZCB2YWx1ZSwgZWxzZSBgLTFgLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGJhc2VJbmRleE9mKGFycmF5LCB2YWx1ZSwgZnJvbUluZGV4KSB7XG4gICAgICBpZiAodmFsdWUgIT09IHZhbHVlKSB7XG4gICAgICAgIHJldHVybiBpbmRleE9mTmFOKGFycmF5LCBmcm9tSW5kZXgpO1xuICAgICAgfVxuICAgICAgdmFyIGluZGV4ID0gZnJvbUluZGV4IC0gMSxcbiAgICAgICAgICBsZW5ndGggPSBhcnJheS5sZW5ndGg7XG5cbiAgICAgIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgICAgIGlmIChhcnJheVtpbmRleF0gPT09IHZhbHVlKSB7XG4gICAgICAgICAgcmV0dXJuIGluZGV4O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gLTE7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRGV0ZXJtaW5lcyB0aGUgYmVzdCBvcmRlciBmb3IgcnVubmluZyB0aGUgZnVuY3Rpb25zIGluIGB0YXNrc2AsIGJhc2VkIG9uXG4gICAgICogdGhlaXIgcmVxdWlyZW1lbnRzLiBFYWNoIGZ1bmN0aW9uIGNhbiBvcHRpb25hbGx5IGRlcGVuZCBvbiBvdGhlciBmdW5jdGlvbnNcbiAgICAgKiBiZWluZyBjb21wbGV0ZWQgZmlyc3QsIGFuZCBlYWNoIGZ1bmN0aW9uIGlzIHJ1biBhcyBzb29uIGFzIGl0cyByZXF1aXJlbWVudHNcbiAgICAgKiBhcmUgc2F0aXNmaWVkLlxuICAgICAqXG4gICAgICogSWYgYW55IG9mIHRoZSBmdW5jdGlvbnMgcGFzcyBhbiBlcnJvciB0byB0aGVpciBjYWxsYmFjaywgdGhlIGBhdXRvYCBzZXF1ZW5jZVxuICAgICAqIHdpbGwgc3RvcC4gRnVydGhlciB0YXNrcyB3aWxsIG5vdCBleGVjdXRlIChzbyBhbnkgb3RoZXIgZnVuY3Rpb25zIGRlcGVuZGluZ1xuICAgICAqIG9uIGl0IHdpbGwgbm90IHJ1biksIGFuZCB0aGUgbWFpbiBgY2FsbGJhY2tgIGlzIGltbWVkaWF0ZWx5IGNhbGxlZCB3aXRoIHRoZVxuICAgICAqIGVycm9yLlxuICAgICAqXG4gICAgICogRnVuY3Rpb25zIGFsc28gcmVjZWl2ZSBhbiBvYmplY3QgY29udGFpbmluZyB0aGUgcmVzdWx0cyBvZiBmdW5jdGlvbnMgd2hpY2hcbiAgICAgKiBoYXZlIGNvbXBsZXRlZCBzbyBmYXIgYXMgdGhlIGZpcnN0IGFyZ3VtZW50LCBpZiB0aGV5IGhhdmUgZGVwZW5kZW5jaWVzLiBJZiBhXG4gICAgICogdGFzayBmdW5jdGlvbiBoYXMgbm8gZGVwZW5kZW5jaWVzLCBpdCB3aWxsIG9ubHkgYmUgcGFzc2VkIGEgY2FsbGJhY2suXG4gICAgICpcbiAgICAgKiBAbmFtZSBhdXRvXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBtZW1iZXJPZiBhc3luY1xuICAgICAqIEBjYXRlZ29yeSBDb250cm9sIEZsb3dcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gdGFza3MgLSBBbiBvYmplY3QuIEVhY2ggb2YgaXRzIHByb3BlcnRpZXMgaXMgZWl0aGVyIGFcbiAgICAgKiBmdW5jdGlvbiBvciBhbiBhcnJheSBvZiByZXF1aXJlbWVudHMsIHdpdGggdGhlIGZ1bmN0aW9uIGl0c2VsZiB0aGUgbGFzdCBpdGVtXG4gICAgICogaW4gdGhlIGFycmF5LiBUaGUgb2JqZWN0J3Mga2V5IG9mIGEgcHJvcGVydHkgc2VydmVzIGFzIHRoZSBuYW1lIG9mIHRoZSB0YXNrXG4gICAgICogZGVmaW5lZCBieSB0aGF0IHByb3BlcnR5LCBpLmUuIGNhbiBiZSB1c2VkIHdoZW4gc3BlY2lmeWluZyByZXF1aXJlbWVudHMgZm9yXG4gICAgICogb3RoZXIgdGFza3MuIFRoZSBmdW5jdGlvbiByZWNlaXZlcyBvbmUgb3IgdHdvIGFyZ3VtZW50czpcbiAgICAgKiAqIGEgYHJlc3VsdHNgIG9iamVjdCwgY29udGFpbmluZyB0aGUgcmVzdWx0cyBvZiB0aGUgcHJldmlvdXNseSBleGVjdXRlZFxuICAgICAqICAgZnVuY3Rpb25zLCBvbmx5IHBhc3NlZCBpZiB0aGUgdGFzayBoYXMgYW55IGRlcGVuZGVuY2llcyxcbiAgICAgKiAqIGEgYGNhbGxiYWNrKGVyciwgcmVzdWx0KWAgZnVuY3Rpb24sIHdoaWNoIG11c3QgYmUgY2FsbGVkIHdoZW4gZmluaXNoZWQsXG4gICAgICogICBwYXNzaW5nIGFuIGBlcnJvcmAgKHdoaWNoIGNhbiBiZSBgbnVsbGApIGFuZCB0aGUgcmVzdWx0IG9mIHRoZSBmdW5jdGlvbidzXG4gICAgICogICBleGVjdXRpb24uXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IFtjb25jdXJyZW5jeT1JbmZpbml0eV0gLSBBbiBvcHRpb25hbCBgaW50ZWdlcmAgZm9yXG4gICAgICogZGV0ZXJtaW5pbmcgdGhlIG1heGltdW0gbnVtYmVyIG9mIHRhc2tzIHRoYXQgY2FuIGJlIHJ1biBpbiBwYXJhbGxlbC4gQnlcbiAgICAgKiBkZWZhdWx0LCBhcyBtYW55IGFzIHBvc3NpYmxlLlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IFtjYWxsYmFja10gLSBBbiBvcHRpb25hbCBjYWxsYmFjayB3aGljaCBpcyBjYWxsZWQgd2hlbiBhbGxcbiAgICAgKiB0aGUgdGFza3MgaGF2ZSBiZWVuIGNvbXBsZXRlZC4gSXQgcmVjZWl2ZXMgdGhlIGBlcnJgIGFyZ3VtZW50IGlmIGFueSBgdGFza3NgXG4gICAgICogcGFzcyBhbiBlcnJvciB0byB0aGVpciBjYWxsYmFjay4gUmVzdWx0cyBhcmUgYWx3YXlzIHJldHVybmVkOyBob3dldmVyLCBpZiBhblxuICAgICAqIGVycm9yIG9jY3Vycywgbm8gZnVydGhlciBgdGFza3NgIHdpbGwgYmUgcGVyZm9ybWVkLCBhbmQgdGhlIHJlc3VsdHMgb2JqZWN0XG4gICAgICogd2lsbCBvbmx5IGNvbnRhaW4gcGFydGlhbCByZXN1bHRzLiBJbnZva2VkIHdpdGggKGVyciwgcmVzdWx0cykuXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqIGFzeW5jLmF1dG8oe1xuICAgICAqICAgICAvLyB0aGlzIGZ1bmN0aW9uIHdpbGwganVzdCBiZSBwYXNzZWQgYSBjYWxsYmFja1xuICAgICAqICAgICByZWFkRGF0YTogYXN5bmMuYXBwbHkoZnMucmVhZEZpbGUsICdkYXRhLnR4dCcsICd1dGYtOCcpLFxuICAgICAqICAgICBzaG93RGF0YTogWydyZWFkRGF0YScsIGZ1bmN0aW9uKHJlc3VsdHMsIGNiKSB7XG4gICAgICogICAgICAgICAvLyByZXN1bHRzLnJlYWREYXRhIGlzIHRoZSBmaWxlJ3MgY29udGVudHNcbiAgICAgKiAgICAgICAgIC8vIC4uLlxuICAgICAqICAgICB9XVxuICAgICAqIH0sIGNhbGxiYWNrKTtcbiAgICAgKlxuICAgICAqIGFzeW5jLmF1dG8oe1xuICAgICAqICAgICBnZXRfZGF0YTogZnVuY3Rpb24oY2FsbGJhY2spIHtcbiAgICAgKiAgICAgICAgIGNvbnNvbGUubG9nKCdpbiBnZXRfZGF0YScpO1xuICAgICAqICAgICAgICAgLy8gYXN5bmMgY29kZSB0byBnZXQgc29tZSBkYXRhXG4gICAgICogICAgICAgICBjYWxsYmFjayhudWxsLCAnZGF0YScsICdjb252ZXJ0ZWQgdG8gYXJyYXknKTtcbiAgICAgKiAgICAgfSxcbiAgICAgKiAgICAgbWFrZV9mb2xkZXI6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gICAgICogICAgICAgICBjb25zb2xlLmxvZygnaW4gbWFrZV9mb2xkZXInKTtcbiAgICAgKiAgICAgICAgIC8vIGFzeW5jIGNvZGUgdG8gY3JlYXRlIGEgZGlyZWN0b3J5IHRvIHN0b3JlIGEgZmlsZSBpblxuICAgICAqICAgICAgICAgLy8gdGhpcyBpcyBydW4gYXQgdGhlIHNhbWUgdGltZSBhcyBnZXR0aW5nIHRoZSBkYXRhXG4gICAgICogICAgICAgICBjYWxsYmFjayhudWxsLCAnZm9sZGVyJyk7XG4gICAgICogICAgIH0sXG4gICAgICogICAgIHdyaXRlX2ZpbGU6IFsnZ2V0X2RhdGEnLCAnbWFrZV9mb2xkZXInLCBmdW5jdGlvbihyZXN1bHRzLCBjYWxsYmFjaykge1xuICAgICAqICAgICAgICAgY29uc29sZS5sb2coJ2luIHdyaXRlX2ZpbGUnLCBKU09OLnN0cmluZ2lmeShyZXN1bHRzKSk7XG4gICAgICogICAgICAgICAvLyBvbmNlIHRoZXJlIGlzIHNvbWUgZGF0YSBhbmQgdGhlIGRpcmVjdG9yeSBleGlzdHMsXG4gICAgICogICAgICAgICAvLyB3cml0ZSB0aGUgZGF0YSB0byBhIGZpbGUgaW4gdGhlIGRpcmVjdG9yeVxuICAgICAqICAgICAgICAgY2FsbGJhY2sobnVsbCwgJ2ZpbGVuYW1lJyk7XG4gICAgICogICAgIH1dLFxuICAgICAqICAgICBlbWFpbF9saW5rOiBbJ3dyaXRlX2ZpbGUnLCBmdW5jdGlvbihyZXN1bHRzLCBjYWxsYmFjaykge1xuICAgICAqICAgICAgICAgY29uc29sZS5sb2coJ2luIGVtYWlsX2xpbmsnLCBKU09OLnN0cmluZ2lmeShyZXN1bHRzKSk7XG4gICAgICogICAgICAgICAvLyBvbmNlIHRoZSBmaWxlIGlzIHdyaXR0ZW4gbGV0J3MgZW1haWwgYSBsaW5rIHRvIGl0Li4uXG4gICAgICogICAgICAgICAvLyByZXN1bHRzLndyaXRlX2ZpbGUgY29udGFpbnMgdGhlIGZpbGVuYW1lIHJldHVybmVkIGJ5IHdyaXRlX2ZpbGUuXG4gICAgICogICAgICAgICBjYWxsYmFjayhudWxsLCB7J2ZpbGUnOnJlc3VsdHMud3JpdGVfZmlsZSwgJ2VtYWlsJzondXNlckBleGFtcGxlLmNvbSd9KTtcbiAgICAgKiAgICAgfV1cbiAgICAgKiB9LCBmdW5jdGlvbihlcnIsIHJlc3VsdHMpIHtcbiAgICAgKiAgICAgY29uc29sZS5sb2coJ2VyciA9ICcsIGVycik7XG4gICAgICogICAgIGNvbnNvbGUubG9nKCdyZXN1bHRzID0gJywgcmVzdWx0cyk7XG4gICAgICogfSk7XG4gICAgICovXG4gICAgZnVuY3Rpb24gYXV0byAodGFza3MsIGNvbmN1cnJlbmN5LCBjYWxsYmFjaykge1xuICAgICAgICBpZiAodHlwZW9mIGNvbmN1cnJlbmN5ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAvLyBjb25jdXJyZW5jeSBpcyBvcHRpb25hbCwgc2hpZnQgdGhlIGFyZ3MuXG4gICAgICAgICAgICBjYWxsYmFjayA9IGNvbmN1cnJlbmN5O1xuICAgICAgICAgICAgY29uY3VycmVuY3kgPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGNhbGxiYWNrID0gb25jZShjYWxsYmFjayB8fCBub29wKTtcbiAgICAgICAgdmFyIGtleXMkJCA9IGtleXModGFza3MpO1xuICAgICAgICB2YXIgbnVtVGFza3MgPSBrZXlzJCQubGVuZ3RoO1xuICAgICAgICBpZiAoIW51bVRhc2tzKSB7XG4gICAgICAgICAgICByZXR1cm4gY2FsbGJhY2sobnVsbCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFjb25jdXJyZW5jeSkge1xuICAgICAgICAgICAgY29uY3VycmVuY3kgPSBudW1UYXNrcztcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciByZXN1bHRzID0ge307XG4gICAgICAgIHZhciBydW5uaW5nVGFza3MgPSAwO1xuICAgICAgICB2YXIgaGFzRXJyb3IgPSBmYWxzZTtcblxuICAgICAgICB2YXIgbGlzdGVuZXJzID0ge307XG5cbiAgICAgICAgdmFyIHJlYWR5VGFza3MgPSBbXTtcblxuICAgICAgICAvLyBmb3IgY3ljbGUgZGV0ZWN0aW9uOlxuICAgICAgICB2YXIgcmVhZHlUb0NoZWNrID0gW107IC8vIHRhc2tzIHRoYXQgaGF2ZSBiZWVuIGlkZW50aWZpZWQgYXMgcmVhY2hhYmxlXG4gICAgICAgIC8vIHdpdGhvdXQgdGhlIHBvc3NpYmlsaXR5IG9mIHJldHVybmluZyB0byBhbiBhbmNlc3RvciB0YXNrXG4gICAgICAgIHZhciB1bmNoZWNrZWREZXBlbmRlbmNpZXMgPSB7fTtcblxuICAgICAgICBmb3JPd24odGFza3MsIGZ1bmN0aW9uICh0YXNrLCBrZXkpIHtcbiAgICAgICAgICAgIGlmICghaXNBcnJheSh0YXNrKSkge1xuICAgICAgICAgICAgICAgIC8vIG5vIGRlcGVuZGVuY2llc1xuICAgICAgICAgICAgICAgIGVucXVldWVUYXNrKGtleSwgW3Rhc2tdKTtcbiAgICAgICAgICAgICAgICByZWFkeVRvQ2hlY2sucHVzaChrZXkpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIGRlcGVuZGVuY2llcyA9IHRhc2suc2xpY2UoMCwgdGFzay5sZW5ndGggLSAxKTtcbiAgICAgICAgICAgIHZhciByZW1haW5pbmdEZXBlbmRlbmNpZXMgPSBkZXBlbmRlbmNpZXMubGVuZ3RoO1xuICAgICAgICAgICAgaWYgKHJlbWFpbmluZ0RlcGVuZGVuY2llcyA9PT0gMCkge1xuICAgICAgICAgICAgICAgIGVucXVldWVUYXNrKGtleSwgdGFzayk7XG4gICAgICAgICAgICAgICAgcmVhZHlUb0NoZWNrLnB1c2goa2V5KTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB1bmNoZWNrZWREZXBlbmRlbmNpZXNba2V5XSA9IHJlbWFpbmluZ0RlcGVuZGVuY2llcztcblxuICAgICAgICAgICAgYXJyYXlFYWNoKGRlcGVuZGVuY2llcywgZnVuY3Rpb24gKGRlcGVuZGVuY3lOYW1lKSB7XG4gICAgICAgICAgICAgICAgaWYgKCF0YXNrc1tkZXBlbmRlbmN5TmFtZV0pIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdhc3luYy5hdXRvIHRhc2sgYCcgKyBrZXkgKyAnYCBoYXMgYSBub24tZXhpc3RlbnQgZGVwZW5kZW5jeSBpbiAnICsgZGVwZW5kZW5jaWVzLmpvaW4oJywgJykpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBhZGRMaXN0ZW5lcihkZXBlbmRlbmN5TmFtZSwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICByZW1haW5pbmdEZXBlbmRlbmNpZXMtLTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlbWFpbmluZ0RlcGVuZGVuY2llcyA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZW5xdWV1ZVRhc2soa2V5LCB0YXNrKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNoZWNrRm9yRGVhZGxvY2tzKCk7XG4gICAgICAgIHByb2Nlc3NRdWV1ZSgpO1xuXG4gICAgICAgIGZ1bmN0aW9uIGVucXVldWVUYXNrKGtleSwgdGFzaykge1xuICAgICAgICAgICAgcmVhZHlUYXNrcy5wdXNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBydW5UYXNrKGtleSwgdGFzayk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIHByb2Nlc3NRdWV1ZSgpIHtcbiAgICAgICAgICAgIGlmIChyZWFkeVRhc2tzLmxlbmd0aCA9PT0gMCAmJiBydW5uaW5nVGFza3MgPT09IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY2FsbGJhY2sobnVsbCwgcmVzdWx0cyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB3aGlsZSAocmVhZHlUYXNrcy5sZW5ndGggJiYgcnVubmluZ1Rhc2tzIDwgY29uY3VycmVuY3kpIHtcbiAgICAgICAgICAgICAgICB2YXIgcnVuID0gcmVhZHlUYXNrcy5zaGlmdCgpO1xuICAgICAgICAgICAgICAgIHJ1bigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gYWRkTGlzdGVuZXIodGFza05hbWUsIGZuKSB7XG4gICAgICAgICAgICB2YXIgdGFza0xpc3RlbmVycyA9IGxpc3RlbmVyc1t0YXNrTmFtZV07XG4gICAgICAgICAgICBpZiAoIXRhc2tMaXN0ZW5lcnMpIHtcbiAgICAgICAgICAgICAgICB0YXNrTGlzdGVuZXJzID0gbGlzdGVuZXJzW3Rhc2tOYW1lXSA9IFtdO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0YXNrTGlzdGVuZXJzLnB1c2goZm4pO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gdGFza0NvbXBsZXRlKHRhc2tOYW1lKSB7XG4gICAgICAgICAgICB2YXIgdGFza0xpc3RlbmVycyA9IGxpc3RlbmVyc1t0YXNrTmFtZV0gfHwgW107XG4gICAgICAgICAgICBhcnJheUVhY2godGFza0xpc3RlbmVycywgZnVuY3Rpb24gKGZuKSB7XG4gICAgICAgICAgICAgICAgZm4oKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcHJvY2Vzc1F1ZXVlKCk7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBydW5UYXNrKGtleSwgdGFzaykge1xuICAgICAgICAgICAgaWYgKGhhc0Vycm9yKSByZXR1cm47XG5cbiAgICAgICAgICAgIHZhciB0YXNrQ2FsbGJhY2sgPSBvbmx5T25jZShyZXN0KGZ1bmN0aW9uIChlcnIsIGFyZ3MpIHtcbiAgICAgICAgICAgICAgICBydW5uaW5nVGFza3MtLTtcbiAgICAgICAgICAgICAgICBpZiAoYXJncy5sZW5ndGggPD0gMSkge1xuICAgICAgICAgICAgICAgICAgICBhcmdzID0gYXJnc1swXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgICAgICB2YXIgc2FmZVJlc3VsdHMgPSB7fTtcbiAgICAgICAgICAgICAgICAgICAgZm9yT3duKHJlc3VsdHMsIGZ1bmN0aW9uICh2YWwsIHJrZXkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNhZmVSZXN1bHRzW3JrZXldID0gdmFsO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgc2FmZVJlc3VsdHNba2V5XSA9IGFyZ3M7XG4gICAgICAgICAgICAgICAgICAgIGhhc0Vycm9yID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgbGlzdGVuZXJzID0gW107XG5cbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2soZXJyLCBzYWZlUmVzdWx0cyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0c1trZXldID0gYXJncztcbiAgICAgICAgICAgICAgICAgICAgdGFza0NvbXBsZXRlKGtleSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSkpO1xuXG4gICAgICAgICAgICBydW5uaW5nVGFza3MrKztcbiAgICAgICAgICAgIHZhciB0YXNrRm4gPSB0YXNrW3Rhc2subGVuZ3RoIC0gMV07XG4gICAgICAgICAgICBpZiAodGFzay5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICAgICAgdGFza0ZuKHJlc3VsdHMsIHRhc2tDYWxsYmFjayk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRhc2tGbih0YXNrQ2FsbGJhY2spO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gY2hlY2tGb3JEZWFkbG9ja3MoKSB7XG4gICAgICAgICAgICAvLyBLYWhuJ3MgYWxnb3JpdGhtXG4gICAgICAgICAgICAvLyBodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9Ub3BvbG9naWNhbF9zb3J0aW5nI0thaG4uMjdzX2FsZ29yaXRobVxuICAgICAgICAgICAgLy8gaHR0cDovL2Nvbm5hbGxlLmJsb2dzcG90LmNvbS8yMDEzLzEwL3RvcG9sb2dpY2FsLXNvcnRpbmdrYWhuLWFsZ29yaXRobS5odG1sXG4gICAgICAgICAgICB2YXIgY3VycmVudFRhc2s7XG4gICAgICAgICAgICB2YXIgY291bnRlciA9IDA7XG4gICAgICAgICAgICB3aGlsZSAocmVhZHlUb0NoZWNrLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRUYXNrID0gcmVhZHlUb0NoZWNrLnBvcCgpO1xuICAgICAgICAgICAgICAgIGNvdW50ZXIrKztcbiAgICAgICAgICAgICAgICBhcnJheUVhY2goZ2V0RGVwZW5kZW50cyhjdXJyZW50VGFzayksIGZ1bmN0aW9uIChkZXBlbmRlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEgLS11bmNoZWNrZWREZXBlbmRlbmNpZXNbZGVwZW5kZW50XSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVhZHlUb0NoZWNrLnB1c2goZGVwZW5kZW50KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoY291bnRlciAhPT0gbnVtVGFza3MpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2FzeW5jLmF1dG8gY2Fubm90IGV4ZWN1dGUgdGFza3MgZHVlIHRvIGEgcmVjdXJzaXZlIGRlcGVuZGVuY3knKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIGdldERlcGVuZGVudHModGFza05hbWUpIHtcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSBbXTtcbiAgICAgICAgICAgIGZvck93bih0YXNrcywgZnVuY3Rpb24gKHRhc2ssIGtleSkge1xuICAgICAgICAgICAgICAgIGlmIChpc0FycmF5KHRhc2spICYmIGJhc2VJbmRleE9mKHRhc2ssIHRhc2tOYW1lLCAwKSA+PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKGtleSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBfLm1hcGAgZm9yIGFycmF5cyB3aXRob3V0IHN1cHBvcnQgZm9yIGl0ZXJhdGVlXG4gICAgICogc2hvcnRoYW5kcy5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHBhcmFtIHtBcnJheX0gW2FycmF5XSBUaGUgYXJyYXkgdG8gaXRlcmF0ZSBvdmVyLlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGl0ZXJhdGVlIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBpdGVyYXRpb24uXG4gICAgICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBuZXcgbWFwcGVkIGFycmF5LlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGFycmF5TWFwKGFycmF5LCBpdGVyYXRlZSkge1xuICAgICAgdmFyIGluZGV4ID0gLTEsXG4gICAgICAgICAgbGVuZ3RoID0gYXJyYXkgPyBhcnJheS5sZW5ndGggOiAwLFxuICAgICAgICAgIHJlc3VsdCA9IEFycmF5KGxlbmd0aCk7XG5cbiAgICAgIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgICAgIHJlc3VsdFtpbmRleF0gPSBpdGVyYXRlZShhcnJheVtpbmRleF0sIGluZGV4LCBhcnJheSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENvcGllcyB0aGUgdmFsdWVzIG9mIGBzb3VyY2VgIHRvIGBhcnJheWAuXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBwYXJhbSB7QXJyYXl9IHNvdXJjZSBUaGUgYXJyYXkgdG8gY29weSB2YWx1ZXMgZnJvbS5cbiAgICAgKiBAcGFyYW0ge0FycmF5fSBbYXJyYXk9W11dIFRoZSBhcnJheSB0byBjb3B5IHZhbHVlcyB0by5cbiAgICAgKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgYGFycmF5YC5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBjb3B5QXJyYXkoc291cmNlLCBhcnJheSkge1xuICAgICAgdmFyIGluZGV4ID0gLTEsXG4gICAgICAgICAgbGVuZ3RoID0gc291cmNlLmxlbmd0aDtcblxuICAgICAgYXJyYXkgfHwgKGFycmF5ID0gQXJyYXkobGVuZ3RoKSk7XG4gICAgICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgICAgICBhcnJheVtpbmRleF0gPSBzb3VyY2VbaW5kZXhdO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGFycmF5O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLnNsaWNlYCB3aXRob3V0IGFuIGl0ZXJhdGVlIGNhbGwgZ3VhcmQuXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBzbGljZS5cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gW3N0YXJ0PTBdIFRoZSBzdGFydCBwb3NpdGlvbi5cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gW2VuZD1hcnJheS5sZW5ndGhdIFRoZSBlbmQgcG9zaXRpb24uXG4gICAgICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBzbGljZSBvZiBgYXJyYXlgLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGJhc2VTbGljZShhcnJheSwgc3RhcnQsIGVuZCkge1xuICAgICAgdmFyIGluZGV4ID0gLTEsXG4gICAgICAgICAgbGVuZ3RoID0gYXJyYXkubGVuZ3RoO1xuXG4gICAgICBpZiAoc3RhcnQgPCAwKSB7XG4gICAgICAgIHN0YXJ0ID0gLXN0YXJ0ID4gbGVuZ3RoID8gMCA6IChsZW5ndGggKyBzdGFydCk7XG4gICAgICB9XG4gICAgICBlbmQgPSBlbmQgPiBsZW5ndGggPyBsZW5ndGggOiBlbmQ7XG4gICAgICBpZiAoZW5kIDwgMCkge1xuICAgICAgICBlbmQgKz0gbGVuZ3RoO1xuICAgICAgfVxuICAgICAgbGVuZ3RoID0gc3RhcnQgPiBlbmQgPyAwIDogKChlbmQgLSBzdGFydCkgPj4+IDApO1xuICAgICAgc3RhcnQgPj4+PSAwO1xuXG4gICAgICB2YXIgcmVzdWx0ID0gQXJyYXkobGVuZ3RoKTtcbiAgICAgIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgICAgIHJlc3VsdFtpbmRleF0gPSBhcnJheVtpbmRleCArIHN0YXJ0XTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2FzdHMgYGFycmF5YCB0byBhIHNsaWNlIGlmIGl0J3MgbmVlZGVkLlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gaW5zcGVjdC5cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gc3RhcnQgVGhlIHN0YXJ0IHBvc2l0aW9uLlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbZW5kPWFycmF5Lmxlbmd0aF0gVGhlIGVuZCBwb3NpdGlvbi5cbiAgICAgKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGNhc3Qgc2xpY2UuXG4gICAgICovXG4gICAgZnVuY3Rpb24gY2FzdFNsaWNlKGFycmF5LCBzdGFydCwgZW5kKSB7XG4gICAgICB2YXIgbGVuZ3RoID0gYXJyYXkubGVuZ3RoO1xuICAgICAgZW5kID0gZW5kID09PSB1bmRlZmluZWQgPyBsZW5ndGggOiBlbmQ7XG4gICAgICByZXR1cm4gKCFzdGFydCAmJiBlbmQgPj0gbGVuZ3RoKSA/IGFycmF5IDogYmFzZVNsaWNlKGFycmF5LCBzdGFydCwgZW5kKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBVc2VkIGJ5IGBfLnRyaW1gIGFuZCBgXy50cmltRW5kYCB0byBnZXQgdGhlIGluZGV4IG9mIHRoZSBsYXN0IHN0cmluZyBzeW1ib2xcbiAgICAgKiB0aGF0IGlzIG5vdCBmb3VuZCBpbiB0aGUgY2hhcmFjdGVyIHN5bWJvbHMuXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBwYXJhbSB7QXJyYXl9IHN0clN5bWJvbHMgVGhlIHN0cmluZyBzeW1ib2xzIHRvIGluc3BlY3QuXG4gICAgICogQHBhcmFtIHtBcnJheX0gY2hyU3ltYm9scyBUaGUgY2hhcmFjdGVyIHN5bWJvbHMgdG8gZmluZC5cbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfSBSZXR1cm5zIHRoZSBpbmRleCBvZiB0aGUgbGFzdCB1bm1hdGNoZWQgc3RyaW5nIHN5bWJvbC5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBjaGFyc0VuZEluZGV4KHN0clN5bWJvbHMsIGNoclN5bWJvbHMpIHtcbiAgICAgIHZhciBpbmRleCA9IHN0clN5bWJvbHMubGVuZ3RoO1xuXG4gICAgICB3aGlsZSAoaW5kZXgtLSAmJiBiYXNlSW5kZXhPZihjaHJTeW1ib2xzLCBzdHJTeW1ib2xzW2luZGV4XSwgMCkgPiAtMSkge31cbiAgICAgIHJldHVybiBpbmRleDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBVc2VkIGJ5IGBfLnRyaW1gIGFuZCBgXy50cmltU3RhcnRgIHRvIGdldCB0aGUgaW5kZXggb2YgdGhlIGZpcnN0IHN0cmluZyBzeW1ib2xcbiAgICAgKiB0aGF0IGlzIG5vdCBmb3VuZCBpbiB0aGUgY2hhcmFjdGVyIHN5bWJvbHMuXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBwYXJhbSB7QXJyYXl9IHN0clN5bWJvbHMgVGhlIHN0cmluZyBzeW1ib2xzIHRvIGluc3BlY3QuXG4gICAgICogQHBhcmFtIHtBcnJheX0gY2hyU3ltYm9scyBUaGUgY2hhcmFjdGVyIHN5bWJvbHMgdG8gZmluZC5cbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfSBSZXR1cm5zIHRoZSBpbmRleCBvZiB0aGUgZmlyc3QgdW5tYXRjaGVkIHN0cmluZyBzeW1ib2wuXG4gICAgICovXG4gICAgZnVuY3Rpb24gY2hhcnNTdGFydEluZGV4KHN0clN5bWJvbHMsIGNoclN5bWJvbHMpIHtcbiAgICAgIHZhciBpbmRleCA9IC0xLFxuICAgICAgICAgIGxlbmd0aCA9IHN0clN5bWJvbHMubGVuZ3RoO1xuXG4gICAgICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCAmJiBiYXNlSW5kZXhPZihjaHJTeW1ib2xzLCBzdHJTeW1ib2xzW2luZGV4XSwgMCkgPiAtMSkge31cbiAgICAgIHJldHVybiBpbmRleDtcbiAgICB9XG5cbiAgICAvKiogVXNlZCB0byBjb21wb3NlIHVuaWNvZGUgY2hhcmFjdGVyIGNsYXNzZXMuICovXG4gICAgdmFyIHJzQXN0cmFsUmFuZ2UgPSAnXFxcXHVkODAwLVxcXFx1ZGZmZic7XG4gICAgdmFyIHJzQ29tYm9NYXJrc1JhbmdlID0gJ1xcXFx1MDMwMC1cXFxcdTAzNmZcXFxcdWZlMjAtXFxcXHVmZTIzJztcbiAgICB2YXIgcnNDb21ib1N5bWJvbHNSYW5nZSA9ICdcXFxcdTIwZDAtXFxcXHUyMGYwJztcbiAgICB2YXIgcnNWYXJSYW5nZSA9ICdcXFxcdWZlMGVcXFxcdWZlMGYnO1xuICAgIHZhciByc0FzdHJhbCA9ICdbJyArIHJzQXN0cmFsUmFuZ2UgKyAnXSc7XG4gICAgdmFyIHJzQ29tYm8gPSAnWycgKyByc0NvbWJvTWFya3NSYW5nZSArIHJzQ29tYm9TeW1ib2xzUmFuZ2UgKyAnXSc7XG4gICAgdmFyIHJzRml0eiA9ICdcXFxcdWQ4M2NbXFxcXHVkZmZiLVxcXFx1ZGZmZl0nO1xuICAgIHZhciByc01vZGlmaWVyID0gJyg/OicgKyByc0NvbWJvICsgJ3wnICsgcnNGaXR6ICsgJyknO1xuICAgIHZhciByc05vbkFzdHJhbCA9ICdbXicgKyByc0FzdHJhbFJhbmdlICsgJ10nO1xuICAgIHZhciByc1JlZ2lvbmFsID0gJyg/OlxcXFx1ZDgzY1tcXFxcdWRkZTYtXFxcXHVkZGZmXSl7Mn0nO1xuICAgIHZhciByc1N1cnJQYWlyID0gJ1tcXFxcdWQ4MDAtXFxcXHVkYmZmXVtcXFxcdWRjMDAtXFxcXHVkZmZmXSc7XG4gICAgdmFyIHJzWldKID0gJ1xcXFx1MjAwZCc7XG4gICAgdmFyIHJlT3B0TW9kID0gcnNNb2RpZmllciArICc/JztcbiAgICB2YXIgcnNPcHRWYXIgPSAnWycgKyByc1ZhclJhbmdlICsgJ10/JztcbiAgICB2YXIgcnNPcHRKb2luID0gJyg/OicgKyByc1pXSiArICcoPzonICsgW3JzTm9uQXN0cmFsLCByc1JlZ2lvbmFsLCByc1N1cnJQYWlyXS5qb2luKCd8JykgKyAnKScgKyByc09wdFZhciArIHJlT3B0TW9kICsgJykqJztcbiAgICB2YXIgcnNTZXEgPSByc09wdFZhciArIHJlT3B0TW9kICsgcnNPcHRKb2luO1xuICAgIHZhciByc1N5bWJvbCA9ICcoPzonICsgW3JzTm9uQXN0cmFsICsgcnNDb21ibyArICc/JywgcnNDb21ibywgcnNSZWdpb25hbCwgcnNTdXJyUGFpciwgcnNBc3RyYWxdLmpvaW4oJ3wnKSArICcpJztcbiAgICAvKiogVXNlZCB0byBtYXRjaCBbc3RyaW5nIHN5bWJvbHNdKGh0dHBzOi8vbWF0aGlhc2J5bmVucy5iZS9ub3Rlcy9qYXZhc2NyaXB0LXVuaWNvZGUpLiAqL1xuICAgIHZhciByZUNvbXBsZXhTeW1ib2wgPSBSZWdFeHAocnNGaXR6ICsgJyg/PScgKyByc0ZpdHogKyAnKXwnICsgcnNTeW1ib2wgKyByc1NlcSwgJ2cnKTtcblxuICAgIC8qKlxuICAgICAqIENvbnZlcnRzIGBzdHJpbmdgIHRvIGFuIGFycmF5LlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc3RyaW5nIFRoZSBzdHJpbmcgdG8gY29udmVydC5cbiAgICAgKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGNvbnZlcnRlZCBhcnJheS5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBzdHJpbmdUb0FycmF5KHN0cmluZykge1xuICAgICAgcmV0dXJuIHN0cmluZy5tYXRjaChyZUNvbXBsZXhTeW1ib2wpO1xuICAgIH1cblxuICAgIC8qKiBVc2VkIHRvIG1hdGNoIGxlYWRpbmcgYW5kIHRyYWlsaW5nIHdoaXRlc3BhY2UuICovXG4gICAgdmFyIHJlVHJpbSQxID0gL15cXHMrfFxccyskL2c7XG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIGxlYWRpbmcgYW5kIHRyYWlsaW5nIHdoaXRlc3BhY2Ugb3Igc3BlY2lmaWVkIGNoYXJhY3RlcnMgZnJvbSBgc3RyaW5nYC5cbiAgICAgKlxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAbWVtYmVyT2YgX1xuICAgICAqIEBzaW5jZSAzLjAuMFxuICAgICAqIEBjYXRlZ29yeSBTdHJpbmdcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gW3N0cmluZz0nJ10gVGhlIHN0cmluZyB0byB0cmltLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBbY2hhcnM9d2hpdGVzcGFjZV0gVGhlIGNoYXJhY3RlcnMgdG8gdHJpbS5cbiAgICAgKiBAcGFyYW0tIHtPYmplY3R9IFtndWFyZF0gRW5hYmxlcyB1c2UgYXMgYW4gaXRlcmF0ZWUgZm9yIG1ldGhvZHMgbGlrZSBgXy5tYXBgLlxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIHRyaW1tZWQgc3RyaW5nLlxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiBfLnRyaW0oJyAgYWJjICAnKTtcbiAgICAgKiAvLyA9PiAnYWJjJ1xuICAgICAqXG4gICAgICogXy50cmltKCctXy1hYmMtXy0nLCAnXy0nKTtcbiAgICAgKiAvLyA9PiAnYWJjJ1xuICAgICAqXG4gICAgICogXy5tYXAoWycgIGZvbyAgJywgJyAgYmFyICAnXSwgXy50cmltKTtcbiAgICAgKiAvLyA9PiBbJ2ZvbycsICdiYXInXVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIHRyaW0oc3RyaW5nLCBjaGFycywgZ3VhcmQpIHtcbiAgICAgIHN0cmluZyA9IHRvU3RyaW5nKHN0cmluZyk7XG4gICAgICBpZiAoc3RyaW5nICYmIChndWFyZCB8fCBjaGFycyA9PT0gdW5kZWZpbmVkKSkge1xuICAgICAgICByZXR1cm4gc3RyaW5nLnJlcGxhY2UocmVUcmltJDEsICcnKTtcbiAgICAgIH1cbiAgICAgIGlmICghc3RyaW5nIHx8ICEoY2hhcnMgPSBiYXNlVG9TdHJpbmcoY2hhcnMpKSkge1xuICAgICAgICByZXR1cm4gc3RyaW5nO1xuICAgICAgfVxuICAgICAgdmFyIHN0clN5bWJvbHMgPSBzdHJpbmdUb0FycmF5KHN0cmluZyksXG4gICAgICAgICAgY2hyU3ltYm9scyA9IHN0cmluZ1RvQXJyYXkoY2hhcnMpLFxuICAgICAgICAgIHN0YXJ0ID0gY2hhcnNTdGFydEluZGV4KHN0clN5bWJvbHMsIGNoclN5bWJvbHMpLFxuICAgICAgICAgIGVuZCA9IGNoYXJzRW5kSW5kZXgoc3RyU3ltYm9scywgY2hyU3ltYm9scykgKyAxO1xuXG4gICAgICByZXR1cm4gY2FzdFNsaWNlKHN0clN5bWJvbHMsIHN0YXJ0LCBlbmQpLmpvaW4oJycpO1xuICAgIH1cblxuICAgIHZhciBhcmdzUmVnZXggPSAvXihmdW5jdGlvblteXFwoXSopP1xcKD9cXHMqKFteXFwpPV0qKS9tO1xuXG4gICAgZnVuY3Rpb24gcGFyc2VQYXJhbXMoZnVuYykge1xuICAgICAgICByZXR1cm4gdHJpbShmdW5jLnRvU3RyaW5nKCkubWF0Y2goYXJnc1JlZ2V4KVsyXSkuc3BsaXQoL1xccypcXCxcXHMqLyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQSBkZXBlbmRlbmN5LWluamVjdGVkIHZlcnNpb24gb2YgdGhlIHtAbGluayBhc3luYy5hdXRvfSBmdW5jdGlvbi4gRGVwZW5kZW50XG4gICAgICogdGFza3MgYXJlIHNwZWNpZmllZCBhcyBwYXJhbWV0ZXJzIHRvIHRoZSBmdW5jdGlvbiwgYWZ0ZXIgdGhlIHVzdWFsIGNhbGxiYWNrXG4gICAgICogcGFyYW1ldGVyLCB3aXRoIHRoZSBwYXJhbWV0ZXIgbmFtZXMgbWF0Y2hpbmcgdGhlIG5hbWVzIG9mIHRoZSB0YXNrcyBpdFxuICAgICAqIGRlcGVuZHMgb24uIFRoaXMgY2FuIHByb3ZpZGUgZXZlbiBtb3JlIHJlYWRhYmxlIHRhc2sgZ3JhcGhzIHdoaWNoIGNhbiBiZVxuICAgICAqIGVhc2llciB0byBtYWludGFpbi5cbiAgICAgKlxuICAgICAqIElmIGEgZmluYWwgY2FsbGJhY2sgaXMgc3BlY2lmaWVkLCB0aGUgdGFzayByZXN1bHRzIGFyZSBzaW1pbGFybHkgaW5qZWN0ZWQsXG4gICAgICogc3BlY2lmaWVkIGFzIG5hbWVkIHBhcmFtZXRlcnMgYWZ0ZXIgdGhlIGluaXRpYWwgZXJyb3IgcGFyYW1ldGVyLlxuICAgICAqXG4gICAgICogVGhlIGF1dG9JbmplY3QgZnVuY3Rpb24gaXMgcHVyZWx5IHN5bnRhY3RpYyBzdWdhciBhbmQgaXRzIHNlbWFudGljcyBhcmVcbiAgICAgKiBvdGhlcndpc2UgZXF1aXZhbGVudCB0byB7QGxpbmsgYXN5bmMuYXV0b30uXG4gICAgICpcbiAgICAgKiBAbmFtZSBhdXRvSW5qZWN0XG4gICAgICogQHN0YXRpY1xuICAgICAqIEBtZW1iZXJPZiBhc3luY1xuICAgICAqIEBzZWUgYXN5bmMuYXV0b1xuICAgICAqIEBjYXRlZ29yeSBDb250cm9sIEZsb3dcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gdGFza3MgLSBBbiBvYmplY3QsIGVhY2ggb2Ygd2hvc2UgcHJvcGVydGllcyBpcyBhIGZ1bmN0aW9uIG9mXG4gICAgICogdGhlIGZvcm0gJ2Z1bmMoW2RlcGVuZGVuY2llcy4uLl0sIGNhbGxiYWNrKS4gVGhlIG9iamVjdCdzIGtleSBvZiBhIHByb3BlcnR5XG4gICAgICogc2VydmVzIGFzIHRoZSBuYW1lIG9mIHRoZSB0YXNrIGRlZmluZWQgYnkgdGhhdCBwcm9wZXJ0eSwgaS5lLiBjYW4gYmUgdXNlZFxuICAgICAqIHdoZW4gc3BlY2lmeWluZyByZXF1aXJlbWVudHMgZm9yIG90aGVyIHRhc2tzLlxuICAgICAqICogVGhlIGBjYWxsYmFja2AgcGFyYW1ldGVyIGlzIGEgYGNhbGxiYWNrKGVyciwgcmVzdWx0KWAgd2hpY2ggbXVzdCBiZSBjYWxsZWRcbiAgICAgKiAgIHdoZW4gZmluaXNoZWQsIHBhc3NpbmcgYW4gYGVycm9yYCAod2hpY2ggY2FuIGJlIGBudWxsYCkgYW5kIHRoZSByZXN1bHQgb2ZcbiAgICAgKiAgIHRoZSBmdW5jdGlvbidzIGV4ZWN1dGlvbi4gVGhlIHJlbWFpbmluZyBwYXJhbWV0ZXJzIG5hbWUgb3RoZXIgdGFza3Mgb25cbiAgICAgKiAgIHdoaWNoIHRoZSB0YXNrIGlzIGRlcGVuZGVudCwgYW5kIHRoZSByZXN1bHRzIGZyb20gdGhvc2UgdGFza3MgYXJlIHRoZVxuICAgICAqICAgYXJndW1lbnRzIG9mIHRob3NlIHBhcmFtZXRlcnMuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gW2NhbGxiYWNrXSAtIEFuIG9wdGlvbmFsIGNhbGxiYWNrIHdoaWNoIGlzIGNhbGxlZCB3aGVuIGFsbFxuICAgICAqIHRoZSB0YXNrcyBoYXZlIGJlZW4gY29tcGxldGVkLiBJdCByZWNlaXZlcyB0aGUgYGVycmAgYXJndW1lbnQgaWYgYW55IGB0YXNrc2BcbiAgICAgKiBwYXNzIGFuIGVycm9yIHRvIHRoZWlyIGNhbGxiYWNrLiBUaGUgcmVtYWluaW5nIHBhcmFtZXRlcnMgYXJlIHRhc2sgbmFtZXNcbiAgICAgKiB3aG9zZSByZXN1bHRzIHlvdSBhcmUgaW50ZXJlc3RlZCBpbi4gVGhpcyBjYWxsYmFjayB3aWxsIG9ubHkgYmUgY2FsbGVkIHdoZW5cbiAgICAgKiBhbGwgdGFza3MgaGF2ZSBmaW5pc2hlZCBvciBhbiBlcnJvciBoYXMgb2NjdXJyZWQsIGFuZCBzbyBkbyBub3Qgc3BlY2lmeVxuICAgICAqIGRlcGVuZGVuY2llcyBpbiB0aGUgc2FtZSB3YXkgYXMgYHRhc2tzYCBkby4gSWYgYW4gZXJyb3Igb2NjdXJzLCBubyBmdXJ0aGVyXG4gICAgICogYHRhc2tzYCB3aWxsIGJlIHBlcmZvcm1lZCwgYW5kIGByZXN1bHRzYCB3aWxsIG9ubHkgYmUgdmFsaWQgZm9yIHRob3NlIHRhc2tzXG4gICAgICogd2hpY2ggbWFuYWdlZCB0byBjb21wbGV0ZS4gSW52b2tlZCB3aXRoIChlcnIsIFtyZXN1bHRzLi4uXSkuXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqIC8vICBUaGUgZXhhbXBsZSBmcm9tIGBhdXRvYCBjYW4gYmUgcmV3cml0dGVuIGFzIGZvbGxvd3M6XG4gICAgICogYXN5bmMuYXV0b0luamVjdCh7XG4gICAgICogICAgIGdldF9kYXRhOiBmdW5jdGlvbihjYWxsYmFjaykge1xuICAgICAqICAgICAgICAgLy8gYXN5bmMgY29kZSB0byBnZXQgc29tZSBkYXRhXG4gICAgICogICAgICAgICBjYWxsYmFjayhudWxsLCAnZGF0YScsICdjb252ZXJ0ZWQgdG8gYXJyYXknKTtcbiAgICAgKiAgICAgfSxcbiAgICAgKiAgICAgbWFrZV9mb2xkZXI6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gICAgICogICAgICAgICAvLyBhc3luYyBjb2RlIHRvIGNyZWF0ZSBhIGRpcmVjdG9yeSB0byBzdG9yZSBhIGZpbGUgaW5cbiAgICAgKiAgICAgICAgIC8vIHRoaXMgaXMgcnVuIGF0IHRoZSBzYW1lIHRpbWUgYXMgZ2V0dGluZyB0aGUgZGF0YVxuICAgICAqICAgICAgICAgY2FsbGJhY2sobnVsbCwgJ2ZvbGRlcicpO1xuICAgICAqICAgICB9LFxuICAgICAqICAgICB3cml0ZV9maWxlOiBmdW5jdGlvbihnZXRfZGF0YSwgbWFrZV9mb2xkZXIsIGNhbGxiYWNrKSB7XG4gICAgICogICAgICAgICAvLyBvbmNlIHRoZXJlIGlzIHNvbWUgZGF0YSBhbmQgdGhlIGRpcmVjdG9yeSBleGlzdHMsXG4gICAgICogICAgICAgICAvLyB3cml0ZSB0aGUgZGF0YSB0byBhIGZpbGUgaW4gdGhlIGRpcmVjdG9yeVxuICAgICAqICAgICAgICAgY2FsbGJhY2sobnVsbCwgJ2ZpbGVuYW1lJyk7XG4gICAgICogICAgIH0sXG4gICAgICogICAgIGVtYWlsX2xpbms6IGZ1bmN0aW9uKHdyaXRlX2ZpbGUsIGNhbGxiYWNrKSB7XG4gICAgICogICAgICAgICAvLyBvbmNlIHRoZSBmaWxlIGlzIHdyaXR0ZW4gbGV0J3MgZW1haWwgYSBsaW5rIHRvIGl0Li4uXG4gICAgICogICAgICAgICAvLyB3cml0ZV9maWxlIGNvbnRhaW5zIHRoZSBmaWxlbmFtZSByZXR1cm5lZCBieSB3cml0ZV9maWxlLlxuICAgICAqICAgICAgICAgY2FsbGJhY2sobnVsbCwgeydmaWxlJzp3cml0ZV9maWxlLCAnZW1haWwnOid1c2VyQGV4YW1wbGUuY29tJ30pO1xuICAgICAqICAgICB9XG4gICAgICogfSwgZnVuY3Rpb24oZXJyLCBlbWFpbF9saW5rKSB7XG4gICAgICogICAgIGNvbnNvbGUubG9nKCdlcnIgPSAnLCBlcnIpO1xuICAgICAqICAgICBjb25zb2xlLmxvZygnZW1haWxfbGluayA9ICcsIGVtYWlsX2xpbmspO1xuICAgICAqIH0pO1xuICAgICAqXG4gICAgICogLy8gSWYgeW91IGFyZSB1c2luZyBhIEpTIG1pbmlmaWVyIHRoYXQgbWFuZ2xlcyBwYXJhbWV0ZXIgbmFtZXMsIGBhdXRvSW5qZWN0YFxuICAgICAqIC8vIHdpbGwgbm90IHdvcmsgd2l0aCBwbGFpbiBmdW5jdGlvbnMsIHNpbmNlIHRoZSBwYXJhbWV0ZXIgbmFtZXMgd2lsbCBiZVxuICAgICAqIC8vIGNvbGxhcHNlZCB0byBhIHNpbmdsZSBsZXR0ZXIgaWRlbnRpZmllci4gIFRvIHdvcmsgYXJvdW5kIHRoaXMsIHlvdSBjYW5cbiAgICAgKiAvLyBleHBsaWNpdGx5IHNwZWNpZnkgdGhlIG5hbWVzIG9mIHRoZSBwYXJhbWV0ZXJzIHlvdXIgdGFzayBmdW5jdGlvbiBuZWVkc1xuICAgICAqIC8vIGluIGFuIGFycmF5LCBzaW1pbGFyIHRvIEFuZ3VsYXIuanMgZGVwZW5kZW5jeSBpbmplY3Rpb24uICBUaGUgZmluYWxcbiAgICAgKiAvLyByZXN1bHRzIGNhbGxiYWNrIGNhbiBiZSBwcm92aWRlZCBhcyBhbiBhcnJheSBpbiB0aGUgc2FtZSB3YXkuXG4gICAgICpcbiAgICAgKiAvLyBUaGlzIHN0aWxsIGhhcyBhbiBhZHZhbnRhZ2Ugb3ZlciBwbGFpbiBgYXV0b2AsIHNpbmNlIHRoZSByZXN1bHRzIGEgdGFza1xuICAgICAqIC8vIGRlcGVuZHMgb24gYXJlIHN0aWxsIHNwcmVhZCBpbnRvIGFyZ3VtZW50cy5cbiAgICAgKiBhc3luYy5hdXRvSW5qZWN0KHtcbiAgICAgKiAgICAgLy8uLi5cbiAgICAgKiAgICAgd3JpdGVfZmlsZTogWydnZXRfZGF0YScsICdtYWtlX2ZvbGRlcicsIGZ1bmN0aW9uKGdldF9kYXRhLCBtYWtlX2ZvbGRlciwgY2FsbGJhY2spIHtcbiAgICAgKiAgICAgICAgIGNhbGxiYWNrKG51bGwsICdmaWxlbmFtZScpO1xuICAgICAqICAgICB9XSxcbiAgICAgKiAgICAgZW1haWxfbGluazogWyd3cml0ZV9maWxlJywgZnVuY3Rpb24od3JpdGVfZmlsZSwgY2FsbGJhY2spIHtcbiAgICAgKiAgICAgICAgIGNhbGxiYWNrKG51bGwsIHsnZmlsZSc6d3JpdGVfZmlsZSwgJ2VtYWlsJzondXNlckBleGFtcGxlLmNvbSd9KTtcbiAgICAgKiAgICAgfV1cbiAgICAgKiAgICAgLy8uLi5cbiAgICAgKiB9LCBbJ2VtYWlsX2xpbmsnLCBmdW5jdGlvbihlcnIsIGVtYWlsX2xpbmspIHtcbiAgICAgKiAgICAgY29uc29sZS5sb2coJ2VyciA9ICcsIGVycik7XG4gICAgICogICAgIGNvbnNvbGUubG9nKCdlbWFpbF9saW5rID0gJywgZW1haWxfbGluayk7XG4gICAgICogfV0pO1xuICAgICAqL1xuICAgIGZ1bmN0aW9uIGF1dG9JbmplY3QodGFza3MsIGNhbGxiYWNrKSB7XG4gICAgICAgIHZhciBuZXdUYXNrcyA9IHt9O1xuXG4gICAgICAgIGZvck93bih0YXNrcywgZnVuY3Rpb24gKHRhc2tGbiwga2V5KSB7XG4gICAgICAgICAgICB2YXIgcGFyYW1zO1xuXG4gICAgICAgICAgICBpZiAoaXNBcnJheSh0YXNrRm4pKSB7XG4gICAgICAgICAgICAgICAgcGFyYW1zID0gY29weUFycmF5KHRhc2tGbik7XG4gICAgICAgICAgICAgICAgdGFza0ZuID0gcGFyYW1zLnBvcCgpO1xuXG4gICAgICAgICAgICAgICAgbmV3VGFza3Nba2V5XSA9IHBhcmFtcy5jb25jYXQocGFyYW1zLmxlbmd0aCA+IDAgPyBuZXdUYXNrIDogdGFza0ZuKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGFza0ZuLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcImF1dG9JbmplY3QgdGFzayBmdW5jdGlvbnMgcmVxdWlyZSBleHBsaWNpdCBwYXJhbWV0ZXJzLlwiKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGFza0ZuLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgICAgIC8vIG5vIGRlcGVuZGVuY2llcywgdXNlIHRoZSBmdW5jdGlvbiBhcy1pc1xuICAgICAgICAgICAgICAgIG5ld1Rhc2tzW2tleV0gPSB0YXNrRm47XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHBhcmFtcyA9IHBhcnNlUGFyYW1zKHRhc2tGbik7XG4gICAgICAgICAgICAgICAgcGFyYW1zLnBvcCgpO1xuXG4gICAgICAgICAgICAgICAgbmV3VGFza3Nba2V5XSA9IHBhcmFtcy5jb25jYXQobmV3VGFzayk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIG5ld1Rhc2socmVzdWx0cywgdGFza0NiKSB7XG4gICAgICAgICAgICAgICAgdmFyIG5ld0FyZ3MgPSBhcnJheU1hcChwYXJhbXMsIGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHRzW25hbWVdO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIG5ld0FyZ3MucHVzaCh0YXNrQ2IpO1xuICAgICAgICAgICAgICAgIHRhc2tGbi5hcHBseShudWxsLCBuZXdBcmdzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgYXV0byhuZXdUYXNrcywgY2FsbGJhY2spO1xuICAgIH1cblxuICAgIHZhciBoYXNTZXRJbW1lZGlhdGUgPSB0eXBlb2Ygc2V0SW1tZWRpYXRlID09PSAnZnVuY3Rpb24nICYmIHNldEltbWVkaWF0ZTtcbiAgICB2YXIgaGFzTmV4dFRpY2sgPSB0eXBlb2YgcHJvY2VzcyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIHByb2Nlc3MubmV4dFRpY2sgPT09ICdmdW5jdGlvbic7XG5cbiAgICBmdW5jdGlvbiBmYWxsYmFjayhmbikge1xuICAgICAgICBzZXRUaW1lb3V0KGZuLCAwKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB3cmFwKGRlZmVyKSB7XG4gICAgICAgIHJldHVybiByZXN0KGZ1bmN0aW9uIChmbiwgYXJncykge1xuICAgICAgICAgICAgZGVmZXIoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGZuLmFwcGx5KG51bGwsIGFyZ3MpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHZhciBfZGVmZXI7XG5cbiAgICBpZiAoaGFzU2V0SW1tZWRpYXRlKSB7XG4gICAgICAgIF9kZWZlciA9IHNldEltbWVkaWF0ZTtcbiAgICB9IGVsc2UgaWYgKGhhc05leHRUaWNrKSB7XG4gICAgICAgIF9kZWZlciA9IHByb2Nlc3MubmV4dFRpY2s7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgX2RlZmVyID0gZmFsbGJhY2s7XG4gICAgfVxuXG4gICAgdmFyIHNldEltbWVkaWF0ZSQxID0gd3JhcChfZGVmZXIpO1xuXG4gICAgZnVuY3Rpb24gcXVldWUod29ya2VyLCBjb25jdXJyZW5jeSwgcGF5bG9hZCkge1xuICAgICAgICBpZiAoY29uY3VycmVuY3kgPT0gbnVsbCkge1xuICAgICAgICAgICAgY29uY3VycmVuY3kgPSAxO1xuICAgICAgICB9IGVsc2UgaWYgKGNvbmN1cnJlbmN5ID09PSAwKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NvbmN1cnJlbmN5IG11c3Qgbm90IGJlIHplcm8nKTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBfaW5zZXJ0KHEsIGRhdGEsIHBvcywgY2FsbGJhY2spIHtcbiAgICAgICAgICAgIGlmIChjYWxsYmFjayAhPSBudWxsICYmIHR5cGVvZiBjYWxsYmFjayAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcigndGFzayBjYWxsYmFjayBtdXN0IGJlIGEgZnVuY3Rpb24nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHEuc3RhcnRlZCA9IHRydWU7XG4gICAgICAgICAgICBpZiAoIWlzQXJyYXkoZGF0YSkpIHtcbiAgICAgICAgICAgICAgICBkYXRhID0gW2RhdGFdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGRhdGEubGVuZ3RoID09PSAwICYmIHEuaWRsZSgpKSB7XG4gICAgICAgICAgICAgICAgLy8gY2FsbCBkcmFpbiBpbW1lZGlhdGVseSBpZiB0aGVyZSBhcmUgbm8gdGFza3NcbiAgICAgICAgICAgICAgICByZXR1cm4gc2V0SW1tZWRpYXRlJDEoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBxLmRyYWluKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBhcnJheUVhY2goZGF0YSwgZnVuY3Rpb24gKHRhc2spIHtcbiAgICAgICAgICAgICAgICB2YXIgaXRlbSA9IHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogdGFzayxcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2s6IGNhbGxiYWNrIHx8IG5vb3BcbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgaWYgKHBvcykge1xuICAgICAgICAgICAgICAgICAgICBxLnRhc2tzLnVuc2hpZnQoaXRlbSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcS50YXNrcy5wdXNoKGl0ZW0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgc2V0SW1tZWRpYXRlJDEocS5wcm9jZXNzKTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBfbmV4dChxLCB0YXNrcykge1xuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB3b3JrZXJzIC09IDE7XG5cbiAgICAgICAgICAgICAgICB2YXIgcmVtb3ZlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHZhciBhcmdzID0gYXJndW1lbnRzO1xuICAgICAgICAgICAgICAgIGFycmF5RWFjaCh0YXNrcywgZnVuY3Rpb24gKHRhc2spIHtcbiAgICAgICAgICAgICAgICAgICAgYXJyYXlFYWNoKHdvcmtlcnNMaXN0LCBmdW5jdGlvbiAod29ya2VyLCBpbmRleCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHdvcmtlciA9PT0gdGFzayAmJiAhcmVtb3ZlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdvcmtlcnNMaXN0LnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVtb3ZlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgIHRhc2suY2FsbGJhY2suYXBwbHkodGFzaywgYXJncyk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGFyZ3NbMF0gIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcS5lcnJvcihhcmdzWzBdLCB0YXNrLmRhdGEpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBpZiAod29ya2VycyA8PSBxLmNvbmN1cnJlbmN5IC0gcS5idWZmZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgcS51bnNhdHVyYXRlZCgpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChxLnRhc2tzLmxlbmd0aCArIHdvcmtlcnMgPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgcS5kcmFpbigpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBxLnByb2Nlc3MoKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgd29ya2VycyA9IDA7XG4gICAgICAgIHZhciB3b3JrZXJzTGlzdCA9IFtdO1xuICAgICAgICB2YXIgcSA9IHtcbiAgICAgICAgICAgIHRhc2tzOiBbXSxcbiAgICAgICAgICAgIGNvbmN1cnJlbmN5OiBjb25jdXJyZW5jeSxcbiAgICAgICAgICAgIHBheWxvYWQ6IHBheWxvYWQsXG4gICAgICAgICAgICBzYXR1cmF0ZWQ6IG5vb3AsXG4gICAgICAgICAgICB1bnNhdHVyYXRlZDogbm9vcCxcbiAgICAgICAgICAgIGJ1ZmZlcjogY29uY3VycmVuY3kgLyA0LFxuICAgICAgICAgICAgZW1wdHk6IG5vb3AsXG4gICAgICAgICAgICBkcmFpbjogbm9vcCxcbiAgICAgICAgICAgIGVycm9yOiBub29wLFxuICAgICAgICAgICAgc3RhcnRlZDogZmFsc2UsXG4gICAgICAgICAgICBwYXVzZWQ6IGZhbHNlLFxuICAgICAgICAgICAgcHVzaDogZnVuY3Rpb24gKGRhdGEsIGNhbGxiYWNrKSB7XG4gICAgICAgICAgICAgICAgX2luc2VydChxLCBkYXRhLCBmYWxzZSwgY2FsbGJhY2spO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGtpbGw6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBxLmRyYWluID0gbm9vcDtcbiAgICAgICAgICAgICAgICBxLnRhc2tzID0gW107XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdW5zaGlmdDogZnVuY3Rpb24gKGRhdGEsIGNhbGxiYWNrKSB7XG4gICAgICAgICAgICAgICAgX2luc2VydChxLCBkYXRhLCB0cnVlLCBjYWxsYmFjayk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcHJvY2VzczogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHdoaWxlICghcS5wYXVzZWQgJiYgd29ya2VycyA8IHEuY29uY3VycmVuY3kgJiYgcS50YXNrcy5sZW5ndGgpIHtcblxuICAgICAgICAgICAgICAgICAgICB2YXIgdGFza3MgPSBxLnBheWxvYWQgPyBxLnRhc2tzLnNwbGljZSgwLCBxLnBheWxvYWQpIDogcS50YXNrcy5zcGxpY2UoMCwgcS50YXNrcy5sZW5ndGgpO1xuXG4gICAgICAgICAgICAgICAgICAgIHZhciBkYXRhID0gYXJyYXlNYXAodGFza3MsIGJhc2VQcm9wZXJ0eSgnZGF0YScpKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAocS50YXNrcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHEuZW1wdHkoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB3b3JrZXJzICs9IDE7XG4gICAgICAgICAgICAgICAgICAgIHdvcmtlcnNMaXN0LnB1c2godGFza3NbMF0pO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICh3b3JrZXJzID09PSBxLmNvbmN1cnJlbmN5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBxLnNhdHVyYXRlZCgpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIGNiID0gb25seU9uY2UoX25leHQocSwgdGFza3MpKTtcbiAgICAgICAgICAgICAgICAgICAgd29ya2VyKGRhdGEsIGNiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbGVuZ3RoOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHEudGFza3MubGVuZ3RoO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHJ1bm5pbmc6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gd29ya2VycztcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB3b3JrZXJzTGlzdDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB3b3JrZXJzTGlzdDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpZGxlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHEudGFza3MubGVuZ3RoICsgd29ya2VycyA9PT0gMDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBwYXVzZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHEucGF1c2VkID0gdHJ1ZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICByZXN1bWU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBpZiAocS5wYXVzZWQgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcS5wYXVzZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB2YXIgcmVzdW1lQ291bnQgPSBNYXRoLm1pbihxLmNvbmN1cnJlbmN5LCBxLnRhc2tzLmxlbmd0aCk7XG4gICAgICAgICAgICAgICAgLy8gTmVlZCB0byBjYWxsIHEucHJvY2VzcyBvbmNlIHBlciBjb25jdXJyZW50XG4gICAgICAgICAgICAgICAgLy8gd29ya2VyIHRvIHByZXNlcnZlIGZ1bGwgY29uY3VycmVuY3kgYWZ0ZXIgcGF1c2VcbiAgICAgICAgICAgICAgICBmb3IgKHZhciB3ID0gMTsgdyA8PSByZXN1bWVDb3VudDsgdysrKSB7XG4gICAgICAgICAgICAgICAgICAgIHNldEltbWVkaWF0ZSQxKHEucHJvY2Vzcyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gcTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBIGNhcmdvIG9mIHRhc2tzIGZvciB0aGUgd29ya2VyIGZ1bmN0aW9uIHRvIGNvbXBsZXRlLiBDYXJnbyBpbmhlcml0cyBhbGwgb2ZcbiAgICAgKiB0aGUgc2FtZSBtZXRob2RzIGFuZCBldmVudCBjYWxsYmFja3MgYXMge0BsaW5rIGFzeW5jLnF1ZXVlfS5cbiAgICAgKiBAdHlwZWRlZiB7T2JqZWN0fSBjYXJnb1xuICAgICAqIEBwcm9wZXJ0eSB7RnVuY3Rpb259IGxlbmd0aCAtIEEgZnVuY3Rpb24gcmV0dXJuaW5nIHRoZSBudW1iZXIgb2YgaXRlbXNcbiAgICAgKiB3YWl0aW5nIHRvIGJlIHByb2Nlc3NlZC4gSW52b2tlIHdpdGggKCkuXG4gICAgICogQHByb3BlcnR5IHtudW1iZXJ9IHBheWxvYWQgLSBBbiBgaW50ZWdlcmAgZm9yIGRldGVybWluaW5nIGhvdyBtYW55IHRhc2tzXG4gICAgICogc2hvdWxkIGJlIHByb2Nlc3MgcGVyIHJvdW5kLiBUaGlzIHByb3BlcnR5IGNhbiBiZSBjaGFuZ2VkIGFmdGVyIGEgYGNhcmdvYCBpc1xuICAgICAqIGNyZWF0ZWQgdG8gYWx0ZXIgdGhlIHBheWxvYWQgb24tdGhlLWZseS5cbiAgICAgKiBAcHJvcGVydHkge0Z1bmN0aW9ufSBwdXNoIC0gQWRkcyBgdGFza2AgdG8gdGhlIGBxdWV1ZWAuIFRoZSBjYWxsYmFjayBpc1xuICAgICAqIGNhbGxlZCBvbmNlIHRoZSBgd29ya2VyYCBoYXMgZmluaXNoZWQgcHJvY2Vzc2luZyB0aGUgdGFzay4gSW5zdGVhZCBvZiBhXG4gICAgICogc2luZ2xlIHRhc2ssIGFuIGFycmF5IG9mIGB0YXNrc2AgY2FuIGJlIHN1Ym1pdHRlZC4gVGhlIHJlc3BlY3RpdmUgY2FsbGJhY2sgaXNcbiAgICAgKiB1c2VkIGZvciBldmVyeSB0YXNrIGluIHRoZSBsaXN0LiBJbnZva2Ugd2l0aCAodGFzaywgW2NhbGxiYWNrXSkuXG4gICAgICogQHByb3BlcnR5IHtGdW5jdGlvbn0gc2F0dXJhdGVkIC0gQSBjYWxsYmFjayB0aGF0IGlzIGNhbGxlZCB3aGVuIHRoZVxuICAgICAqIGBxdWV1ZS5sZW5ndGgoKWAgaGl0cyB0aGUgY29uY3VycmVuY3kgYW5kIGZ1cnRoZXIgdGFza3Mgd2lsbCBiZSBxdWV1ZWQuXG4gICAgICogQHByb3BlcnR5IHtGdW5jdGlvbn0gZW1wdHkgLSBBIGNhbGxiYWNrIHRoYXQgaXMgY2FsbGVkIHdoZW4gdGhlIGxhc3QgaXRlbVxuICAgICAqIGZyb20gdGhlIGBxdWV1ZWAgaXMgZ2l2ZW4gdG8gYSBgd29ya2VyYC5cbiAgICAgKiBAcHJvcGVydHkge0Z1bmN0aW9ufSBkcmFpbiAtIEEgY2FsbGJhY2sgdGhhdCBpcyBjYWxsZWQgd2hlbiB0aGUgbGFzdCBpdGVtXG4gICAgICogZnJvbSB0aGUgYHF1ZXVlYCBoYXMgcmV0dXJuZWQgZnJvbSB0aGUgYHdvcmtlcmAuXG4gICAgICogQHByb3BlcnR5IHtGdW5jdGlvbn0gaWRsZSAtIGEgZnVuY3Rpb24gcmV0dXJuaW5nIGZhbHNlIGlmIHRoZXJlIGFyZSBpdGVtc1xuICAgICAqIHdhaXRpbmcgb3IgYmVpbmcgcHJvY2Vzc2VkLCBvciB0cnVlIGlmIG5vdC4gSW52b2tlIHdpdGggKCkuXG4gICAgICogQHByb3BlcnR5IHtGdW5jdGlvbn0gcGF1c2UgLSBhIGZ1bmN0aW9uIHRoYXQgcGF1c2VzIHRoZSBwcm9jZXNzaW5nIG9mIHRhc2tzXG4gICAgICogdW50aWwgYHJlc3VtZSgpYCBpcyBjYWxsZWQuIEludm9rZSB3aXRoICgpLlxuICAgICAqIEBwcm9wZXJ0eSB7RnVuY3Rpb259IHJlc3VtZSAtIGEgZnVuY3Rpb24gdGhhdCByZXN1bWVzIHRoZSBwcm9jZXNzaW5nIG9mXG4gICAgICogcXVldWVkIHRhc2tzIHdoZW4gdGhlIHF1ZXVlIGlzIHBhdXNlZC4gSW52b2tlIHdpdGggKCkuXG4gICAgICogQHByb3BlcnR5IHtGdW5jdGlvbn0ga2lsbCAtIGEgZnVuY3Rpb24gdGhhdCByZW1vdmVzIHRoZSBgZHJhaW5gIGNhbGxiYWNrIGFuZFxuICAgICAqIGVtcHRpZXMgcmVtYWluaW5nIHRhc2tzIGZyb20gdGhlIHF1ZXVlIGZvcmNpbmcgaXQgdG8gZ28gaWRsZS4gSW52b2tlIHdpdGggKCkuXG4gICAgICovXG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgYGNhcmdvYCBvYmplY3Qgd2l0aCB0aGUgc3BlY2lmaWVkIHBheWxvYWQuIFRhc2tzIGFkZGVkIHRvIHRoZVxuICAgICAqIGNhcmdvIHdpbGwgYmUgcHJvY2Vzc2VkIGFsdG9nZXRoZXIgKHVwIHRvIHRoZSBgcGF5bG9hZGAgbGltaXQpLiBJZiB0aGVcbiAgICAgKiBgd29ya2VyYCBpcyBpbiBwcm9ncmVzcywgdGhlIHRhc2sgaXMgcXVldWVkIHVudGlsIGl0IGJlY29tZXMgYXZhaWxhYmxlLiBPbmNlXG4gICAgICogdGhlIGB3b3JrZXJgIGhhcyBjb21wbGV0ZWQgc29tZSB0YXNrcywgZWFjaCBjYWxsYmFjayBvZiB0aG9zZSB0YXNrcyBpc1xuICAgICAqIGNhbGxlZC4gQ2hlY2sgb3V0IFt0aGVzZV0oaHR0cHM6Ly9jYW1vLmdpdGh1YnVzZXJjb250ZW50LmNvbS82YmJkMzZmNGNmNWIzNWEwZjExYTk2ZGNkMmU5NzcxMWZmYzJmYjM3LzY4NzQ3NDcwNzMzYTJmMmY2NjJlNjM2YzZmNzU2NDJlNjc2OTc0Njg3NTYyMmU2MzZmNmQyZjYxNzM3MzY1NzQ3MzJmMzEzNjM3MzYzODM3MzEyZjM2MzgzMTMwMzgyZjYyNjI2MzMwNjM2NjYyMzAyZDM1NjYzMjM5MmQzMTMxNjUzMjJkMzkzNzM0NjYyZDMzMzMzOTM3NjMzNjM0NjQ2MzM4MzUzODJlNjc2OTY2KSBbYW5pbWF0aW9uc10oaHR0cHM6Ly9jYW1vLmdpdGh1YnVzZXJjb250ZW50LmNvbS9mNDgxMGUwMGUxYzVmNWY4YWRkYmUzZTlmNDkwNjRmZDVkMTAyNjk5LzY4NzQ3NDcwNzMzYTJmMmY2NjJlNjM2YzZmNzU2NDJlNjc2OTc0Njg3NTYyMmU2MzZmNmQyZjYxNzM3MzY1NzQ3MzJmMzEzNjM3MzYzODM3MzEyZjM2MzgzMTMwMzEyZjM4MzQ2MzM5MzIzMDM2MzYyZDM1NjYzMjM5MmQzMTMxNjUzMjJkMzgzMTM0NjYyZDM5NjQzMzY0MzAzMjM0MzEzMzYyNjY2NDJlNjc2OTY2KVxuICAgICAqIGZvciBob3cgYGNhcmdvYCBhbmQgYHF1ZXVlYCB3b3JrLlxuICAgICAqXG4gICAgICogV2hpbGUgW3F1ZXVlXSgjcXVldWUpIHBhc3NlcyBvbmx5IG9uZSB0YXNrIHRvIG9uZSBvZiBhIGdyb3VwIG9mIHdvcmtlcnNcbiAgICAgKiBhdCBhIHRpbWUsIGNhcmdvIHBhc3NlcyBhbiBhcnJheSBvZiB0YXNrcyB0byBhIHNpbmdsZSB3b3JrZXIsIHJlcGVhdGluZ1xuICAgICAqIHdoZW4gdGhlIHdvcmtlciBpcyBmaW5pc2hlZC5cbiAgICAgKlxuICAgICAqIEBuYW1lIGNhcmdvXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBtZW1iZXJPZiBhc3luY1xuICAgICAqIEBzZWUgYXN5bmMucXVldWVcbiAgICAgKiBAY2F0ZWdvcnkgQ29udHJvbCBGbG93XG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gd29ya2VyIC0gQW4gYXN5bmNocm9ub3VzIGZ1bmN0aW9uIGZvciBwcm9jZXNzaW5nIGFuIGFycmF5XG4gICAgICogb2YgcXVldWVkIHRhc2tzLCB3aGljaCBtdXN0IGNhbGwgaXRzIGBjYWxsYmFjayhlcnIpYCBhcmd1bWVudCB3aGVuIGZpbmlzaGVkLFxuICAgICAqIHdpdGggYW4gb3B0aW9uYWwgYGVycmAgYXJndW1lbnQuIEludm9rZWQgd2l0aCAodGFza3MsIGNhbGxiYWNrKS5cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gW3BheWxvYWQ9SW5maW5pdHldIC0gQW4gb3B0aW9uYWwgYGludGVnZXJgIGZvciBkZXRlcm1pbmluZ1xuICAgICAqIGhvdyBtYW55IHRhc2tzIHNob3VsZCBiZSBwcm9jZXNzZWQgcGVyIHJvdW5kOyBpZiBvbWl0dGVkLCB0aGUgZGVmYXVsdCBpc1xuICAgICAqIHVubGltaXRlZC5cbiAgICAgKiBAcmV0dXJucyB7Y2FyZ299IEEgY2FyZ28gb2JqZWN0IHRvIG1hbmFnZSB0aGUgdGFza3MuIENhbGxiYWNrcyBjYW5cbiAgICAgKiBhdHRhY2hlZCBhcyBjZXJ0YWluIHByb3BlcnRpZXMgdG8gbGlzdGVuIGZvciBzcGVjaWZpYyBldmVudHMgZHVyaW5nIHRoZVxuICAgICAqIGxpZmVjeWNsZSBvZiB0aGUgY2FyZ28gYW5kIGlubmVyIHF1ZXVlLlxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiAvLyBjcmVhdGUgYSBjYXJnbyBvYmplY3Qgd2l0aCBwYXlsb2FkIDJcbiAgICAgKiB2YXIgY2FyZ28gPSBhc3luYy5jYXJnbyhmdW5jdGlvbih0YXNrcywgY2FsbGJhY2spIHtcbiAgICAgKiAgICAgZm9yICh2YXIgaT0wOyBpPHRhc2tzLmxlbmd0aDsgaSsrKSB7XG4gICAgICogICAgICAgICBjb25zb2xlLmxvZygnaGVsbG8gJyArIHRhc2tzW2ldLm5hbWUpO1xuICAgICAqICAgICB9XG4gICAgICogICAgIGNhbGxiYWNrKCk7XG4gICAgICogfSwgMik7XG4gICAgICpcbiAgICAgKiAvLyBhZGQgc29tZSBpdGVtc1xuICAgICAqIGNhcmdvLnB1c2goe25hbWU6ICdmb28nfSwgZnVuY3Rpb24oZXJyKSB7XG4gICAgICogICAgIGNvbnNvbGUubG9nKCdmaW5pc2hlZCBwcm9jZXNzaW5nIGZvbycpO1xuICAgICAqIH0pO1xuICAgICAqIGNhcmdvLnB1c2goe25hbWU6ICdiYXInfSwgZnVuY3Rpb24oZXJyKSB7XG4gICAgICogICAgIGNvbnNvbGUubG9nKCdmaW5pc2hlZCBwcm9jZXNzaW5nIGJhcicpO1xuICAgICAqIH0pO1xuICAgICAqIGNhcmdvLnB1c2goe25hbWU6ICdiYXonfSwgZnVuY3Rpb24oZXJyKSB7XG4gICAgICogICAgIGNvbnNvbGUubG9nKCdmaW5pc2hlZCBwcm9jZXNzaW5nIGJheicpO1xuICAgICAqIH0pO1xuICAgICAqL1xuICAgIGZ1bmN0aW9uIGNhcmdvKHdvcmtlciwgcGF5bG9hZCkge1xuICAgICAgcmV0dXJuIHF1ZXVlKHdvcmtlciwgMSwgcGF5bG9hZCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVGhlIHNhbWUgYXMgYGVhY2hPZmAgYnV0IHJ1bnMgYSBtYXhpbXVtIG9mIGBsaW1pdGAgYXN5bmMgb3BlcmF0aW9ucyBhdCBhXG4gICAgICogdGltZS5cbiAgICAgKlxuICAgICAqIEBuYW1lIGVhY2hPZkxpbWl0XG4gICAgICogQHN0YXRpY1xuICAgICAqIEBtZW1iZXJPZiBhc3luY1xuICAgICAqIEBzZWUgYXN5bmMuZWFjaE9mXG4gICAgICogQGFsaWFzIGZvckVhY2hPZkxpbWl0XG4gICAgICogQGNhdGVnb3J5IENvbGxlY3Rpb25cbiAgICAgKiBAcGFyYW0ge0FycmF5fE9iamVjdH0gY29sbCAtIEEgY29sbGVjdGlvbiB0byBpdGVyYXRlIG92ZXIuXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGxpbWl0IC0gVGhlIG1heGltdW0gbnVtYmVyIG9mIGFzeW5jIG9wZXJhdGlvbnMgYXQgYSB0aW1lLlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGl0ZXJhdGVlIC0gQSBmdW5jdGlvbiB0byBhcHBseSB0byBlYWNoXG4gICAgICogaXRlbSBpbiBgY29sbGAuIFRoZSBga2V5YCBpcyB0aGUgaXRlbSdzIGtleSwgb3IgaW5kZXggaW4gdGhlIGNhc2Ugb2YgYW5cbiAgICAgKiBhcnJheS4gVGhlIGl0ZXJhdGVlIGlzIHBhc3NlZCBhIGBjYWxsYmFjayhlcnIpYCB3aGljaCBtdXN0IGJlIGNhbGxlZCBvbmNlIGl0XG4gICAgICogaGFzIGNvbXBsZXRlZC4gSWYgbm8gZXJyb3IgaGFzIG9jY3VycmVkLCB0aGUgY2FsbGJhY2sgc2hvdWxkIGJlIHJ1biB3aXRob3V0XG4gICAgICogYXJndW1lbnRzIG9yIHdpdGggYW4gZXhwbGljaXQgYG51bGxgIGFyZ3VtZW50LiBJbnZva2VkIHdpdGhcbiAgICAgKiAoaXRlbSwga2V5LCBjYWxsYmFjaykuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gW2NhbGxiYWNrXSAtIEEgY2FsbGJhY2sgd2hpY2ggaXMgY2FsbGVkIHdoZW4gYWxsXG4gICAgICogYGl0ZXJhdGVlYCBmdW5jdGlvbnMgaGF2ZSBmaW5pc2hlZCwgb3IgYW4gZXJyb3Igb2NjdXJzLiBJbnZva2VkIHdpdGggKGVycikuXG4gICAgICovXG4gICAgZnVuY3Rpb24gZWFjaE9mTGltaXQob2JqLCBsaW1pdCwgaXRlcmF0ZWUsIGNiKSB7XG4gICAgICBfZWFjaE9mTGltaXQobGltaXQpKG9iaiwgaXRlcmF0ZWUsIGNiKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUaGUgc2FtZSBhcyBgZWFjaE9mYCBidXQgcnVucyBvbmx5IGEgc2luZ2xlIGFzeW5jIG9wZXJhdGlvbiBhdCBhIHRpbWUuXG4gICAgICpcbiAgICAgKiBAbmFtZSBlYWNoT2ZTZXJpZXNcbiAgICAgKiBAc3RhdGljXG4gICAgICogQG1lbWJlck9mIGFzeW5jXG4gICAgICogQHNlZSBhc3luYy5lYWNoT2ZcbiAgICAgKiBAYWxpYXMgZm9yRWFjaE9mU2VyaWVzXG4gICAgICogQGNhdGVnb3J5IENvbGxlY3Rpb25cbiAgICAgKiBAcGFyYW0ge0FycmF5fE9iamVjdH0gY29sbCAtIEEgY29sbGVjdGlvbiB0byBpdGVyYXRlIG92ZXIuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gaXRlcmF0ZWUgLSBBIGZ1bmN0aW9uIHRvIGFwcGx5IHRvIGVhY2ggaXRlbSBpbiBgY29sbGAuIFRoZVxuICAgICAqIGBrZXlgIGlzIHRoZSBpdGVtJ3Mga2V5LCBvciBpbmRleCBpbiB0aGUgY2FzZSBvZiBhbiBhcnJheS4gVGhlIGl0ZXJhdGVlIGlzXG4gICAgICogcGFzc2VkIGEgYGNhbGxiYWNrKGVycilgIHdoaWNoIG11c3QgYmUgY2FsbGVkIG9uY2UgaXQgaGFzIGNvbXBsZXRlZC4gSWYgbm9cbiAgICAgKiBlcnJvciBoYXMgb2NjdXJyZWQsIHRoZSBjYWxsYmFjayBzaG91bGQgYmUgcnVuIHdpdGhvdXQgYXJndW1lbnRzIG9yIHdpdGggYW5cbiAgICAgKiBleHBsaWNpdCBgbnVsbGAgYXJndW1lbnQuIEludm9rZWQgd2l0aCAoaXRlbSwga2V5LCBjYWxsYmFjaykuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gW2NhbGxiYWNrXSAtIEEgY2FsbGJhY2sgd2hpY2ggaXMgY2FsbGVkIHdoZW4gYWxsIGBpdGVyYXRlZWBcbiAgICAgKiBmdW5jdGlvbnMgaGF2ZSBmaW5pc2hlZCwgb3IgYW4gZXJyb3Igb2NjdXJzLiBJbnZva2VkIHdpdGggKGVycikuXG4gICAgICovXG4gICAgdmFyIGVhY2hPZlNlcmllcyA9IGRvTGltaXQoZWFjaE9mTGltaXQsIDEpO1xuXG4gICAgLyoqXG4gICAgICogUmVkdWNlcyBgY29sbGAgaW50byBhIHNpbmdsZSB2YWx1ZSB1c2luZyBhbiBhc3luYyBgaXRlcmF0ZWVgIHRvIHJldHVybiBlYWNoXG4gICAgICogc3VjY2Vzc2l2ZSBzdGVwLiBgbWVtb2AgaXMgdGhlIGluaXRpYWwgc3RhdGUgb2YgdGhlIHJlZHVjdGlvbi4gVGhpcyBmdW5jdGlvblxuICAgICAqIG9ubHkgb3BlcmF0ZXMgaW4gc2VyaWVzLlxuICAgICAqXG4gICAgICogRm9yIHBlcmZvcm1hbmNlIHJlYXNvbnMsIGl0IG1heSBtYWtlIHNlbnNlIHRvIHNwbGl0IGEgY2FsbCB0byB0aGlzIGZ1bmN0aW9uXG4gICAgICogaW50byBhIHBhcmFsbGVsIG1hcCwgYW5kIHRoZW4gdXNlIHRoZSBub3JtYWwgYEFycmF5LnByb3RvdHlwZS5yZWR1Y2VgIG9uIHRoZVxuICAgICAqIHJlc3VsdHMuIFRoaXMgZnVuY3Rpb24gaXMgZm9yIHNpdHVhdGlvbnMgd2hlcmUgZWFjaCBzdGVwIGluIHRoZSByZWR1Y3Rpb25cbiAgICAgKiBuZWVkcyB0byBiZSBhc3luYzsgaWYgeW91IGNhbiBnZXQgdGhlIGRhdGEgYmVmb3JlIHJlZHVjaW5nIGl0LCB0aGVuIGl0J3NcbiAgICAgKiBwcm9iYWJseSBhIGdvb2QgaWRlYSB0byBkbyBzby5cbiAgICAgKlxuICAgICAqIEBuYW1lIHJlZHVjZVxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAbWVtYmVyT2YgYXN5bmNcbiAgICAgKiBAYWxpYXMgaW5qZWN0LCBmb2xkbFxuICAgICAqIEBjYXRlZ29yeSBDb2xsZWN0aW9uXG4gICAgICogQHBhcmFtIHtBcnJheXxPYmplY3R9IGNvbGwgLSBBIGNvbGxlY3Rpb24gdG8gaXRlcmF0ZSBvdmVyLlxuICAgICAqIEBwYXJhbSB7Kn0gbWVtbyAtIFRoZSBpbml0aWFsIHN0YXRlIG9mIHRoZSByZWR1Y3Rpb24uXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gaXRlcmF0ZWUgLSBBIGZ1bmN0aW9uIGFwcGxpZWQgdG8gZWFjaCBpdGVtIGluIHRoZVxuICAgICAqIGFycmF5IHRvIHByb2R1Y2UgdGhlIG5leHQgc3RlcCBpbiB0aGUgcmVkdWN0aW9uLiBUaGUgYGl0ZXJhdGVlYCBpcyBwYXNzZWQgYVxuICAgICAqIGBjYWxsYmFjayhlcnIsIHJlZHVjdGlvbilgIHdoaWNoIGFjY2VwdHMgYW4gb3B0aW9uYWwgZXJyb3IgYXMgaXRzIGZpcnN0XG4gICAgICogYXJndW1lbnQsIGFuZCB0aGUgc3RhdGUgb2YgdGhlIHJlZHVjdGlvbiBhcyB0aGUgc2Vjb25kLiBJZiBhbiBlcnJvciBpc1xuICAgICAqIHBhc3NlZCB0byB0aGUgY2FsbGJhY2ssIHRoZSByZWR1Y3Rpb24gaXMgc3RvcHBlZCBhbmQgdGhlIG1haW4gYGNhbGxiYWNrYCBpc1xuICAgICAqIGltbWVkaWF0ZWx5IGNhbGxlZCB3aXRoIHRoZSBlcnJvci4gSW52b2tlZCB3aXRoIChtZW1vLCBpdGVtLCBjYWxsYmFjaykuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gW2NhbGxiYWNrXSAtIEEgY2FsbGJhY2sgd2hpY2ggaXMgY2FsbGVkIGFmdGVyIGFsbCB0aGVcbiAgICAgKiBgaXRlcmF0ZWVgIGZ1bmN0aW9ucyBoYXZlIGZpbmlzaGVkLiBSZXN1bHQgaXMgdGhlIHJlZHVjZWQgdmFsdWUuIEludm9rZWQgd2l0aFxuICAgICAqIChlcnIsIHJlc3VsdCkuXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqIGFzeW5jLnJlZHVjZShbMSwyLDNdLCAwLCBmdW5jdGlvbihtZW1vLCBpdGVtLCBjYWxsYmFjaykge1xuICAgICAqICAgICAvLyBwb2ludGxlc3MgYXN5bmM6XG4gICAgICogICAgIHByb2Nlc3MubmV4dFRpY2soZnVuY3Rpb24oKSB7XG4gICAgICogICAgICAgICBjYWxsYmFjayhudWxsLCBtZW1vICsgaXRlbSlcbiAgICAgKiAgICAgfSk7XG4gICAgICogfSwgZnVuY3Rpb24oZXJyLCByZXN1bHQpIHtcbiAgICAgKiAgICAgLy8gcmVzdWx0IGlzIG5vdyBlcXVhbCB0byB0aGUgbGFzdCB2YWx1ZSBvZiBtZW1vLCB3aGljaCBpcyA2XG4gICAgICogfSk7XG4gICAgICovXG4gICAgZnVuY3Rpb24gcmVkdWNlKGFyciwgbWVtbywgaXRlcmF0ZWUsIGNiKSB7XG4gICAgICAgIGVhY2hPZlNlcmllcyhhcnIsIGZ1bmN0aW9uICh4LCBpLCBjYikge1xuICAgICAgICAgICAgaXRlcmF0ZWUobWVtbywgeCwgZnVuY3Rpb24gKGVyciwgdikge1xuICAgICAgICAgICAgICAgIG1lbW8gPSB2O1xuICAgICAgICAgICAgICAgIGNiKGVycik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSwgZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgY2IoZXJyLCBtZW1vKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVmVyc2lvbiBvZiB0aGUgY29tcG9zZSBmdW5jdGlvbiB0aGF0IGlzIG1vcmUgbmF0dXJhbCB0byByZWFkLiBFYWNoIGZ1bmN0aW9uXG4gICAgICogY29uc3VtZXMgdGhlIHJldHVybiB2YWx1ZSBvZiB0aGUgcHJldmlvdXMgZnVuY3Rpb24uIEl0IGlzIHRoZSBlcXVpdmFsZW50IG9mXG4gICAgICoge0BsaW5rIGFzeW5jLmNvbXBvc2V9IHdpdGggdGhlIGFyZ3VtZW50cyByZXZlcnNlZC5cbiAgICAgKlxuICAgICAqIEVhY2ggZnVuY3Rpb24gaXMgZXhlY3V0ZWQgd2l0aCB0aGUgYHRoaXNgIGJpbmRpbmcgb2YgdGhlIGNvbXBvc2VkIGZ1bmN0aW9uLlxuICAgICAqXG4gICAgICogQG5hbWUgc2VxXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBtZW1iZXJPZiBhc3luY1xuICAgICAqIEBzZWUgYXN5bmMuY29tcG9zZVxuICAgICAqIEBjYXRlZ29yeSBDb250cm9sIEZsb3dcbiAgICAgKiBAcGFyYW0gey4uLkZ1bmN0aW9ufSBmdW5jdGlvbnMgLSB0aGUgYXN5bmNocm9ub3VzIGZ1bmN0aW9ucyB0byBjb21wb3NlXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqIC8vIFJlcXVpcmVzIGxvZGFzaCAob3IgdW5kZXJzY29yZSksIGV4cHJlc3MzIGFuZCBkcmVzZW5kZSdzIG9ybTIuXG4gICAgICogLy8gUGFydCBvZiBhbiBhcHAsIHRoYXQgZmV0Y2hlcyBjYXRzIG9mIHRoZSBsb2dnZWQgdXNlci5cbiAgICAgKiAvLyBUaGlzIGV4YW1wbGUgdXNlcyBgc2VxYCBmdW5jdGlvbiB0byBhdm9pZCBvdmVybmVzdGluZyBhbmQgZXJyb3JcbiAgICAgKiAvLyBoYW5kbGluZyBjbHV0dGVyLlxuICAgICAqIGFwcC5nZXQoJy9jYXRzJywgZnVuY3Rpb24ocmVxdWVzdCwgcmVzcG9uc2UpIHtcbiAgICAgKiAgICAgdmFyIFVzZXIgPSByZXF1ZXN0Lm1vZGVscy5Vc2VyO1xuICAgICAqICAgICBhc3luYy5zZXEoXG4gICAgICogICAgICAgICBfLmJpbmQoVXNlci5nZXQsIFVzZXIpLCAgLy8gJ1VzZXIuZ2V0JyBoYXMgc2lnbmF0dXJlIChpZCwgY2FsbGJhY2soZXJyLCBkYXRhKSlcbiAgICAgKiAgICAgICAgIGZ1bmN0aW9uKHVzZXIsIGZuKSB7XG4gICAgICogICAgICAgICAgICAgdXNlci5nZXRDYXRzKGZuKTsgICAgICAvLyAnZ2V0Q2F0cycgaGFzIHNpZ25hdHVyZSAoY2FsbGJhY2soZXJyLCBkYXRhKSlcbiAgICAgKiAgICAgICAgIH1cbiAgICAgKiAgICAgKShyZXEuc2Vzc2lvbi51c2VyX2lkLCBmdW5jdGlvbiAoZXJyLCBjYXRzKSB7XG4gICAgICogICAgICAgICBpZiAoZXJyKSB7XG4gICAgICogICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xuICAgICAqICAgICAgICAgICAgIHJlc3BvbnNlLmpzb24oeyBzdGF0dXM6ICdlcnJvcicsIG1lc3NhZ2U6IGVyci5tZXNzYWdlIH0pO1xuICAgICAqICAgICAgICAgfSBlbHNlIHtcbiAgICAgKiAgICAgICAgICAgICByZXNwb25zZS5qc29uKHsgc3RhdHVzOiAnb2snLCBtZXNzYWdlOiAnQ2F0cyBmb3VuZCcsIGRhdGE6IGNhdHMgfSk7XG4gICAgICogICAgICAgICB9XG4gICAgICogICAgIH0pO1xuICAgICAqIH0pO1xuICAgICAqL1xuICAgIGZ1bmN0aW9uIHNlcSgpIC8qIGZ1bmN0aW9ucy4uLiAqL3tcbiAgICAgICAgdmFyIGZucyA9IGFyZ3VtZW50cztcbiAgICAgICAgcmV0dXJuIHJlc3QoZnVuY3Rpb24gKGFyZ3MpIHtcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcblxuICAgICAgICAgICAgdmFyIGNiID0gYXJnc1thcmdzLmxlbmd0aCAtIDFdO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBjYiA9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgYXJncy5wb3AoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY2IgPSBub29wO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZWR1Y2UoZm5zLCBhcmdzLCBmdW5jdGlvbiAobmV3YXJncywgZm4sIGNiKSB7XG4gICAgICAgICAgICAgICAgZm4uYXBwbHkodGhhdCwgbmV3YXJncy5jb25jYXQoW3Jlc3QoZnVuY3Rpb24gKGVyciwgbmV4dGFyZ3MpIHtcbiAgICAgICAgICAgICAgICAgICAgY2IoZXJyLCBuZXh0YXJncyk7XG4gICAgICAgICAgICAgICAgfSldKSk7XG4gICAgICAgICAgICB9LCBmdW5jdGlvbiAoZXJyLCByZXN1bHRzKSB7XG4gICAgICAgICAgICAgICAgY2IuYXBwbHkodGhhdCwgW2Vycl0uY29uY2F0KHJlc3VsdHMpKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICB2YXIgcmV2ZXJzZSA9IEFycmF5LnByb3RvdHlwZS5yZXZlcnNlO1xuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIGZ1bmN0aW9uIHdoaWNoIGlzIGEgY29tcG9zaXRpb24gb2YgdGhlIHBhc3NlZCBhc3luY2hyb25vdXNcbiAgICAgKiBmdW5jdGlvbnMuIEVhY2ggZnVuY3Rpb24gY29uc3VtZXMgdGhlIHJldHVybiB2YWx1ZSBvZiB0aGUgZnVuY3Rpb24gdGhhdFxuICAgICAqIGZvbGxvd3MuIENvbXBvc2luZyBmdW5jdGlvbnMgYGYoKWAsIGBnKClgLCBhbmQgYGgoKWAgd291bGQgcHJvZHVjZSB0aGUgcmVzdWx0XG4gICAgICogb2YgYGYoZyhoKCkpKWAsIG9ubHkgdGhpcyB2ZXJzaW9uIHVzZXMgY2FsbGJhY2tzIHRvIG9idGFpbiB0aGUgcmV0dXJuIHZhbHVlcy5cbiAgICAgKlxuICAgICAqIEVhY2ggZnVuY3Rpb24gaXMgZXhlY3V0ZWQgd2l0aCB0aGUgYHRoaXNgIGJpbmRpbmcgb2YgdGhlIGNvbXBvc2VkIGZ1bmN0aW9uLlxuICAgICAqXG4gICAgICogQG5hbWUgY29tcG9zZVxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAbWVtYmVyT2YgYXN5bmNcbiAgICAgKiBAY2F0ZWdvcnkgQ29udHJvbCBGbG93XG4gICAgICogQHBhcmFtIHsuLi5GdW5jdGlvbn0gZnVuY3Rpb25zIC0gdGhlIGFzeW5jaHJvbm91cyBmdW5jdGlvbnMgdG8gY29tcG9zZVxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiBmdW5jdGlvbiBhZGQxKG4sIGNhbGxiYWNrKSB7XG4gICAgICogICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAqICAgICAgICAgY2FsbGJhY2sobnVsbCwgbiArIDEpO1xuICAgICAqICAgICB9LCAxMCk7XG4gICAgICogfVxuICAgICAqXG4gICAgICogZnVuY3Rpb24gbXVsMyhuLCBjYWxsYmFjaykge1xuICAgICAqICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgKiAgICAgICAgIGNhbGxiYWNrKG51bGwsIG4gKiAzKTtcbiAgICAgKiAgICAgfSwgMTApO1xuICAgICAqIH1cbiAgICAgKlxuICAgICAqIHZhciBhZGQxbXVsMyA9IGFzeW5jLmNvbXBvc2UobXVsMywgYWRkMSk7XG4gICAgICogYWRkMW11bDMoNCwgZnVuY3Rpb24gKGVyciwgcmVzdWx0KSB7XG4gICAgICogICAgIC8vIHJlc3VsdCBub3cgZXF1YWxzIDE1XG4gICAgICogfSk7XG4gICAgICovXG4gICAgZnVuY3Rpb24gY29tcG9zZSgpIC8qIGZ1bmN0aW9ucy4uLiAqL3tcbiAgICAgIHJldHVybiBzZXEuYXBwbHkobnVsbCwgcmV2ZXJzZS5jYWxsKGFyZ3VtZW50cykpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNvbmNhdCQxKGVhY2hmbiwgYXJyLCBmbiwgY2FsbGJhY2spIHtcbiAgICAgICAgdmFyIHJlc3VsdCA9IFtdO1xuICAgICAgICBlYWNoZm4oYXJyLCBmdW5jdGlvbiAoeCwgaW5kZXgsIGNiKSB7XG4gICAgICAgICAgICBmbih4LCBmdW5jdGlvbiAoZXJyLCB5KSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gcmVzdWx0LmNvbmNhdCh5IHx8IFtdKTtcbiAgICAgICAgICAgICAgICBjYihlcnIpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgIGNhbGxiYWNrKGVyciwgcmVzdWx0KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTGlrZSBgZWFjaGAsIGV4Y2VwdCB0aGF0IGl0IHBhc3NlcyB0aGUga2V5IChvciBpbmRleCkgYXMgdGhlIHNlY29uZCBhcmd1bWVudFxuICAgICAqIHRvIHRoZSBpdGVyYXRlZS5cbiAgICAgKlxuICAgICAqIEBuYW1lIGVhY2hPZlxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAbWVtYmVyT2YgYXN5bmNcbiAgICAgKiBAYWxpYXMgZm9yRWFjaE9mXG4gICAgICogQGNhdGVnb3J5IENvbGxlY3Rpb25cbiAgICAgKiBAcGFyYW0ge0FycmF5fE9iamVjdH0gY29sbCAtIEEgY29sbGVjdGlvbiB0byBpdGVyYXRlIG92ZXIuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gaXRlcmF0ZWUgLSBBIGZ1bmN0aW9uIHRvIGFwcGx5IHRvIGVhY2hcbiAgICAgKiBpdGVtIGluIGBjb2xsYC4gVGhlIGBrZXlgIGlzIHRoZSBpdGVtJ3Mga2V5LCBvciBpbmRleCBpbiB0aGUgY2FzZSBvZiBhblxuICAgICAqIGFycmF5LiBUaGUgaXRlcmF0ZWUgaXMgcGFzc2VkIGEgYGNhbGxiYWNrKGVycilgIHdoaWNoIG11c3QgYmUgY2FsbGVkIG9uY2UgaXRcbiAgICAgKiBoYXMgY29tcGxldGVkLiBJZiBubyBlcnJvciBoYXMgb2NjdXJyZWQsIHRoZSBjYWxsYmFjayBzaG91bGQgYmUgcnVuIHdpdGhvdXRcbiAgICAgKiBhcmd1bWVudHMgb3Igd2l0aCBhbiBleHBsaWNpdCBgbnVsbGAgYXJndW1lbnQuIEludm9rZWQgd2l0aFxuICAgICAqIChpdGVtLCBrZXksIGNhbGxiYWNrKS5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY2FsbGJhY2tdIC0gQSBjYWxsYmFjayB3aGljaCBpcyBjYWxsZWQgd2hlbiBhbGxcbiAgICAgKiBgaXRlcmF0ZWVgIGZ1bmN0aW9ucyBoYXZlIGZpbmlzaGVkLCBvciBhbiBlcnJvciBvY2N1cnMuIEludm9rZWQgd2l0aCAoZXJyKS5cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogdmFyIG9iaiA9IHtkZXY6IFwiL2Rldi5qc29uXCIsIHRlc3Q6IFwiL3Rlc3QuanNvblwiLCBwcm9kOiBcIi9wcm9kLmpzb25cIn07XG4gICAgICogdmFyIGNvbmZpZ3MgPSB7fTtcbiAgICAgKlxuICAgICAqIGFzeW5jLmZvckVhY2hPZihvYmosIGZ1bmN0aW9uICh2YWx1ZSwga2V5LCBjYWxsYmFjaykge1xuICAgICAqICAgICBmcy5yZWFkRmlsZShfX2Rpcm5hbWUgKyB2YWx1ZSwgXCJ1dGY4XCIsIGZ1bmN0aW9uIChlcnIsIGRhdGEpIHtcbiAgICAgKiAgICAgICAgIGlmIChlcnIpIHJldHVybiBjYWxsYmFjayhlcnIpO1xuICAgICAqICAgICAgICAgdHJ5IHtcbiAgICAgKiAgICAgICAgICAgICBjb25maWdzW2tleV0gPSBKU09OLnBhcnNlKGRhdGEpO1xuICAgICAqICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAqICAgICAgICAgICAgIHJldHVybiBjYWxsYmFjayhlKTtcbiAgICAgKiAgICAgICAgIH1cbiAgICAgKiAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICogICAgIH0pO1xuICAgICAqIH0sIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgKiAgICAgaWYgKGVycikgY29uc29sZS5lcnJvcihlcnIubWVzc2FnZSk7XG4gICAgICogICAgIC8vIGNvbmZpZ3MgaXMgbm93IGEgbWFwIG9mIEpTT04gZGF0YVxuICAgICAqICAgICBkb1NvbWV0aGluZ1dpdGgoY29uZmlncyk7XG4gICAgICogfSk7XG4gICAgICovXG4gICAgdmFyIGVhY2hPZiA9IGRvTGltaXQoZWFjaE9mTGltaXQsIEluZmluaXR5KTtcblxuICAgIGZ1bmN0aW9uIGRvUGFyYWxsZWwoZm4pIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChvYmosIGl0ZXJhdGVlLCBjYWxsYmFjaykge1xuICAgICAgICAgICAgcmV0dXJuIGZuKGVhY2hPZiwgb2JqLCBpdGVyYXRlZSwgY2FsbGJhY2spO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFwcGxpZXMgYGl0ZXJhdGVlYCB0byBlYWNoIGl0ZW0gaW4gYGNvbGxgLCBjb25jYXRlbmF0aW5nIHRoZSByZXN1bHRzLiBSZXR1cm5zXG4gICAgICogdGhlIGNvbmNhdGVuYXRlZCBsaXN0LiBUaGUgYGl0ZXJhdGVlYHMgYXJlIGNhbGxlZCBpbiBwYXJhbGxlbCwgYW5kIHRoZVxuICAgICAqIHJlc3VsdHMgYXJlIGNvbmNhdGVuYXRlZCBhcyB0aGV5IHJldHVybi4gVGhlcmUgaXMgbm8gZ3VhcmFudGVlIHRoYXQgdGhlXG4gICAgICogcmVzdWx0cyBhcnJheSB3aWxsIGJlIHJldHVybmVkIGluIHRoZSBvcmlnaW5hbCBvcmRlciBvZiBgY29sbGAgcGFzc2VkIHRvIHRoZVxuICAgICAqIGBpdGVyYXRlZWAgZnVuY3Rpb24uXG4gICAgICpcbiAgICAgKiBAbmFtZSBjb25jYXRcbiAgICAgKiBAc3RhdGljXG4gICAgICogQG1lbWJlck9mIGFzeW5jXG4gICAgICogQGNhdGVnb3J5IENvbGxlY3Rpb25cbiAgICAgKiBAcGFyYW0ge0FycmF5fE9iamVjdH0gY29sbCAtIEEgY29sbGVjdGlvbiB0byBpdGVyYXRlIG92ZXIuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gaXRlcmF0ZWUgLSBBIGZ1bmN0aW9uIHRvIGFwcGx5IHRvIGVhY2ggaXRlbSBpbiBgY29sbGAuXG4gICAgICogVGhlIGl0ZXJhdGVlIGlzIHBhc3NlZCBhIGBjYWxsYmFjayhlcnIsIHJlc3VsdHMpYCB3aGljaCBtdXN0IGJlIGNhbGxlZCBvbmNlXG4gICAgICogaXQgaGFzIGNvbXBsZXRlZCB3aXRoIGFuIGVycm9yICh3aGljaCBjYW4gYmUgYG51bGxgKSBhbmQgYW4gYXJyYXkgb2YgcmVzdWx0cy5cbiAgICAgKiBJbnZva2VkIHdpdGggKGl0ZW0sIGNhbGxiYWNrKS5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY2FsbGJhY2soZXJyKV0gLSBBIGNhbGxiYWNrIHdoaWNoIGlzIGNhbGxlZCBhZnRlciBhbGwgdGhlXG4gICAgICogYGl0ZXJhdGVlYCBmdW5jdGlvbnMgaGF2ZSBmaW5pc2hlZCwgb3IgYW4gZXJyb3Igb2NjdXJzLiBSZXN1bHRzIGlzIGFuIGFycmF5XG4gICAgICogY29udGFpbmluZyB0aGUgY29uY2F0ZW5hdGVkIHJlc3VsdHMgb2YgdGhlIGBpdGVyYXRlZWAgZnVuY3Rpb24uIEludm9rZWQgd2l0aFxuICAgICAqIChlcnIsIHJlc3VsdHMpLlxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiBhc3luYy5jb25jYXQoWydkaXIxJywnZGlyMicsJ2RpcjMnXSwgZnMucmVhZGRpciwgZnVuY3Rpb24oZXJyLCBmaWxlcykge1xuICAgICAqICAgICAvLyBmaWxlcyBpcyBub3cgYSBsaXN0IG9mIGZpbGVuYW1lcyB0aGF0IGV4aXN0IGluIHRoZSAzIGRpcmVjdG9yaWVzXG4gICAgICogfSk7XG4gICAgICovXG4gICAgdmFyIGNvbmNhdCA9IGRvUGFyYWxsZWwoY29uY2F0JDEpO1xuXG4gICAgZnVuY3Rpb24gZG9TZXJpZXMoZm4pIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChvYmosIGl0ZXJhdGVlLCBjYWxsYmFjaykge1xuICAgICAgICAgICAgcmV0dXJuIGZuKGVhY2hPZlNlcmllcywgb2JqLCBpdGVyYXRlZSwgY2FsbGJhY2spO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRoZSBzYW1lIGFzIGBjb25jYXRgIGJ1dCBydW5zIG9ubHkgYSBzaW5nbGUgYXN5bmMgb3BlcmF0aW9uIGF0IGEgdGltZS5cbiAgICAgKlxuICAgICAqIEBuYW1lIGNvbmNhdFNlcmllc1xuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAbWVtYmVyT2YgYXN5bmNcbiAgICAgKiBAc2VlIGFzeW5jLmNvbmNhdFxuICAgICAqIEBjYXRlZ29yeSBDb2xsZWN0aW9uXG4gICAgICogQHBhcmFtIHtBcnJheXxPYmplY3R9IGNvbGwgLSBBIGNvbGxlY3Rpb24gdG8gaXRlcmF0ZSBvdmVyLlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGl0ZXJhdGVlIC0gQSBmdW5jdGlvbiB0byBhcHBseSB0byBlYWNoIGl0ZW0gaW4gYGNvbGxgLlxuICAgICAqIFRoZSBpdGVyYXRlZSBpcyBwYXNzZWQgYSBgY2FsbGJhY2soZXJyLCByZXN1bHRzKWAgd2hpY2ggbXVzdCBiZSBjYWxsZWQgb25jZVxuICAgICAqIGl0IGhhcyBjb21wbGV0ZWQgd2l0aCBhbiBlcnJvciAod2hpY2ggY2FuIGJlIGBudWxsYCkgYW5kIGFuIGFycmF5IG9mIHJlc3VsdHMuXG4gICAgICogSW52b2tlZCB3aXRoIChpdGVtLCBjYWxsYmFjaykuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gW2NhbGxiYWNrKGVycildIC0gQSBjYWxsYmFjayB3aGljaCBpcyBjYWxsZWQgYWZ0ZXIgYWxsIHRoZVxuICAgICAqIGBpdGVyYXRlZWAgZnVuY3Rpb25zIGhhdmUgZmluaXNoZWQsIG9yIGFuIGVycm9yIG9jY3Vycy4gUmVzdWx0cyBpcyBhbiBhcnJheVxuICAgICAqIGNvbnRhaW5pbmcgdGhlIGNvbmNhdGVuYXRlZCByZXN1bHRzIG9mIHRoZSBgaXRlcmF0ZWVgIGZ1bmN0aW9uLiBJbnZva2VkIHdpdGhcbiAgICAgKiAoZXJyLCByZXN1bHRzKS5cbiAgICAgKi9cbiAgICB2YXIgY29uY2F0U2VyaWVzID0gZG9TZXJpZXMoY29uY2F0JDEpO1xuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhIGZ1bmN0aW9uIHRoYXQgd2hlbiBjYWxsZWQsIGNhbGxzLWJhY2sgd2l0aCB0aGUgdmFsdWVzIHByb3ZpZGVkLlxuICAgICAqIFVzZWZ1bCBhcyB0aGUgZmlyc3QgZnVuY3Rpb24gaW4gYSBgd2F0ZXJmYWxsYCwgb3IgZm9yIHBsdWdnaW5nIHZhbHVlcyBpbiB0b1xuICAgICAqIGBhdXRvYC5cbiAgICAgKlxuICAgICAqIEBuYW1lIGNvbnN0YW50XG4gICAgICogQHN0YXRpY1xuICAgICAqIEBtZW1iZXJPZiBhc3luY1xuICAgICAqIEBjYXRlZ29yeSBVdGlsXG4gICAgICogQHBhcmFtIHsuLi4qfSBhcmd1bWVudHMuLi4gLSBBbnkgbnVtYmVyIG9mIGFyZ3VtZW50cyB0byBhdXRvbWF0aWNhbGx5IGludm9rZVxuICAgICAqIGNhbGxiYWNrIHdpdGguXG4gICAgICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIGEgZnVuY3Rpb24gdGhhdCB3aGVuIGludm9rZWQsIGF1dG9tYXRpY2FsbHlcbiAgICAgKiBpbnZva2VzIHRoZSBjYWxsYmFjayB3aXRoIHRoZSBwcmV2aW91cyBnaXZlbiBhcmd1bWVudHMuXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqIGFzeW5jLndhdGVyZmFsbChbXG4gICAgICogICAgIGFzeW5jLmNvbnN0YW50KDQyKSxcbiAgICAgKiAgICAgZnVuY3Rpb24gKHZhbHVlLCBuZXh0KSB7XG4gICAgICogICAgICAgICAvLyB2YWx1ZSA9PT0gNDJcbiAgICAgKiAgICAgfSxcbiAgICAgKiAgICAgLy8uLi5cbiAgICAgKiBdLCBjYWxsYmFjayk7XG4gICAgICpcbiAgICAgKiBhc3luYy53YXRlcmZhbGwoW1xuICAgICAqICAgICBhc3luYy5jb25zdGFudChmaWxlbmFtZSwgXCJ1dGY4XCIpLFxuICAgICAqICAgICBmcy5yZWFkRmlsZSxcbiAgICAgKiAgICAgZnVuY3Rpb24gKGZpbGVEYXRhLCBuZXh0KSB7XG4gICAgICogICAgICAgICAvLy4uLlxuICAgICAqICAgICB9XG4gICAgICogICAgIC8vLi4uXG4gICAgICogXSwgY2FsbGJhY2spO1xuICAgICAqXG4gICAgICogYXN5bmMuYXV0byh7XG4gICAgICogICAgIGhvc3RuYW1lOiBhc3luYy5jb25zdGFudChcImh0dHBzOi8vc2VydmVyLm5ldC9cIiksXG4gICAgICogICAgIHBvcnQ6IGZpbmRGcmVlUG9ydCxcbiAgICAgKiAgICAgbGF1bmNoU2VydmVyOiBbXCJob3N0bmFtZVwiLCBcInBvcnRcIiwgZnVuY3Rpb24gKG9wdGlvbnMsIGNiKSB7XG4gICAgICogICAgICAgICBzdGFydFNlcnZlcihvcHRpb25zLCBjYik7XG4gICAgICogICAgIH1dLFxuICAgICAqICAgICAvLy4uLlxuICAgICAqIH0sIGNhbGxiYWNrKTtcbiAgICAgKi9cbiAgICB2YXIgY29uc3RhbnQgPSByZXN0KGZ1bmN0aW9uICh2YWx1ZXMpIHtcbiAgICAgICAgdmFyIGFyZ3MgPSBbbnVsbF0uY29uY2F0KHZhbHVlcyk7XG4gICAgICAgIHJldHVybiBpbml0aWFsUGFyYW1zKGZ1bmN0aW9uIChpZ25vcmVkQXJncywgY2FsbGJhY2spIHtcbiAgICAgICAgICAgIHJldHVybiBjYWxsYmFjay5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBmdW5jdGlvbiBfY3JlYXRlVGVzdGVyKGVhY2hmbiwgY2hlY2ssIGdldFJlc3VsdCkge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGFyciwgbGltaXQsIGl0ZXJhdGVlLCBjYikge1xuICAgICAgICAgICAgZnVuY3Rpb24gZG9uZShlcnIpIHtcbiAgICAgICAgICAgICAgICBpZiAoY2IpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2IoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNiKG51bGwsIGdldFJlc3VsdChmYWxzZSkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZnVuY3Rpb24gd3JhcHBlZEl0ZXJhdGVlKHgsIF8sIGNhbGxiYWNrKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFjYikgcmV0dXJuIGNhbGxiYWNrKCk7XG4gICAgICAgICAgICAgICAgaXRlcmF0ZWUoeCwgZnVuY3Rpb24gKGVyciwgdikge1xuICAgICAgICAgICAgICAgICAgICBpZiAoY2IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYihlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNiID0gaXRlcmF0ZWUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoY2hlY2sodikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYihudWxsLCBnZXRSZXN1bHQodHJ1ZSwgeCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNiID0gaXRlcmF0ZWUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAzKSB7XG4gICAgICAgICAgICAgICAgY2IgPSBjYiB8fCBub29wO1xuICAgICAgICAgICAgICAgIGVhY2hmbihhcnIsIGxpbWl0LCB3cmFwcGVkSXRlcmF0ZWUsIGRvbmUpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjYiA9IGl0ZXJhdGVlO1xuICAgICAgICAgICAgICAgIGNiID0gY2IgfHwgbm9vcDtcbiAgICAgICAgICAgICAgICBpdGVyYXRlZSA9IGxpbWl0O1xuICAgICAgICAgICAgICAgIGVhY2hmbihhcnIsIHdyYXBwZWRJdGVyYXRlZSwgZG9uZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gX2ZpbmRHZXRSZXN1bHQodiwgeCkge1xuICAgICAgICByZXR1cm4geDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBmaXJzdCB2YWx1ZSBpbiBgY29sbGAgdGhhdCBwYXNzZXMgYW4gYXN5bmMgdHJ1dGggdGVzdC4gVGhlXG4gICAgICogYGl0ZXJhdGVlYCBpcyBhcHBsaWVkIGluIHBhcmFsbGVsLCBtZWFuaW5nIHRoZSBmaXJzdCBpdGVyYXRlZSB0byByZXR1cm5cbiAgICAgKiBgdHJ1ZWAgd2lsbCBmaXJlIHRoZSBkZXRlY3QgYGNhbGxiYWNrYCB3aXRoIHRoYXQgcmVzdWx0LiBUaGF0IG1lYW5zIHRoZVxuICAgICAqIHJlc3VsdCBtaWdodCBub3QgYmUgdGhlIGZpcnN0IGl0ZW0gaW4gdGhlIG9yaWdpbmFsIGBjb2xsYCAoaW4gdGVybXMgb2Ygb3JkZXIpXG4gICAgICogdGhhdCBwYXNzZXMgdGhlIHRlc3QuXG5cbiAgICAgKiBJZiBvcmRlciB3aXRoaW4gdGhlIG9yaWdpbmFsIGBjb2xsYCBpcyBpbXBvcnRhbnQsIHRoZW4gbG9vayBhdFxuICAgICAqIGBkZXRlY3RTZXJpZXNgLlxuICAgICAqXG4gICAgICogQG5hbWUgZGV0ZWN0XG4gICAgICogQHN0YXRpY1xuICAgICAqIEBtZW1iZXJPZiBhc3luY1xuICAgICAqIEBhbGlhcyBmaW5kXG4gICAgICogQGNhdGVnb3J5IENvbGxlY3Rpb25cbiAgICAgKiBAcGFyYW0ge0FycmF5fE9iamVjdH0gY29sbCAtIEEgY29sbGVjdGlvbiB0byBpdGVyYXRlIG92ZXIuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gaXRlcmF0ZWUgLSBBIHRydXRoIHRlc3QgdG8gYXBwbHkgdG8gZWFjaCBpdGVtIGluIGBjb2xsYC5cbiAgICAgKiBUaGUgaXRlcmF0ZWUgaXMgcGFzc2VkIGEgYGNhbGxiYWNrKGVyciwgdHJ1dGhWYWx1ZSlgIHdoaWNoIG11c3QgYmUgY2FsbGVkXG4gICAgICogd2l0aCBhIGJvb2xlYW4gYXJndW1lbnQgb25jZSBpdCBoYXMgY29tcGxldGVkLiBJbnZva2VkIHdpdGggKGl0ZW0sIGNhbGxiYWNrKS5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY2FsbGJhY2tdIC0gQSBjYWxsYmFjayB3aGljaCBpcyBjYWxsZWQgYXMgc29vbiBhcyBhbnlcbiAgICAgKiBpdGVyYXRlZSByZXR1cm5zIGB0cnVlYCwgb3IgYWZ0ZXIgYWxsIHRoZSBgaXRlcmF0ZWVgIGZ1bmN0aW9ucyBoYXZlIGZpbmlzaGVkLlxuICAgICAqIFJlc3VsdCB3aWxsIGJlIHRoZSBmaXJzdCBpdGVtIGluIHRoZSBhcnJheSB0aGF0IHBhc3NlcyB0aGUgdHJ1dGggdGVzdFxuICAgICAqIChpdGVyYXRlZSkgb3IgdGhlIHZhbHVlIGB1bmRlZmluZWRgIGlmIG5vbmUgcGFzc2VkLiBJbnZva2VkIHdpdGhcbiAgICAgKiAoZXJyLCByZXN1bHQpLlxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiBhc3luYy5kZXRlY3QoWydmaWxlMScsJ2ZpbGUyJywnZmlsZTMnXSwgZnVuY3Rpb24oZmlsZVBhdGgsIGNhbGxiYWNrKSB7XG4gICAgICogICAgIGZzLmFjY2VzcyhmaWxlUGF0aCwgZnVuY3Rpb24oZXJyKSB7XG4gICAgICogICAgICAgICBjYWxsYmFjayhudWxsLCAhZXJyKVxuICAgICAqICAgICB9KTtcbiAgICAgKiB9LCBmdW5jdGlvbihlcnIsIHJlc3VsdCkge1xuICAgICAqICAgICAvLyByZXN1bHQgbm93IGVxdWFscyB0aGUgZmlyc3QgZmlsZSBpbiB0aGUgbGlzdCB0aGF0IGV4aXN0c1xuICAgICAqIH0pO1xuICAgICAqL1xuICAgIHZhciBkZXRlY3QgPSBfY3JlYXRlVGVzdGVyKGVhY2hPZiwgaWRlbnRpdHksIF9maW5kR2V0UmVzdWx0KTtcblxuICAgIC8qKlxuICAgICAqIFRoZSBzYW1lIGFzIGBkZXRlY3RgIGJ1dCBydW5zIGEgbWF4aW11bSBvZiBgbGltaXRgIGFzeW5jIG9wZXJhdGlvbnMgYXQgYVxuICAgICAqIHRpbWUuXG4gICAgICpcbiAgICAgKiBAbmFtZSBkZXRlY3RMaW1pdFxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAbWVtYmVyT2YgYXN5bmNcbiAgICAgKiBAc2VlIGFzeW5jLmRldGVjdFxuICAgICAqIEBhbGlhcyBmaW5kTGltaXRcbiAgICAgKiBAY2F0ZWdvcnkgQ29sbGVjdGlvblxuICAgICAqIEBwYXJhbSB7QXJyYXl8T2JqZWN0fSBjb2xsIC0gQSBjb2xsZWN0aW9uIHRvIGl0ZXJhdGUgb3Zlci5cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gbGltaXQgLSBUaGUgbWF4aW11bSBudW1iZXIgb2YgYXN5bmMgb3BlcmF0aW9ucyBhdCBhIHRpbWUuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gaXRlcmF0ZWUgLSBBIHRydXRoIHRlc3QgdG8gYXBwbHkgdG8gZWFjaCBpdGVtIGluIGBjb2xsYC5cbiAgICAgKiBUaGUgaXRlcmF0ZWUgaXMgcGFzc2VkIGEgYGNhbGxiYWNrKGVyciwgdHJ1dGhWYWx1ZSlgIHdoaWNoIG11c3QgYmUgY2FsbGVkXG4gICAgICogd2l0aCBhIGJvb2xlYW4gYXJndW1lbnQgb25jZSBpdCBoYXMgY29tcGxldGVkLiBJbnZva2VkIHdpdGggKGl0ZW0sIGNhbGxiYWNrKS5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY2FsbGJhY2tdIC0gQSBjYWxsYmFjayB3aGljaCBpcyBjYWxsZWQgYXMgc29vbiBhcyBhbnlcbiAgICAgKiBpdGVyYXRlZSByZXR1cm5zIGB0cnVlYCwgb3IgYWZ0ZXIgYWxsIHRoZSBgaXRlcmF0ZWVgIGZ1bmN0aW9ucyBoYXZlIGZpbmlzaGVkLlxuICAgICAqIFJlc3VsdCB3aWxsIGJlIHRoZSBmaXJzdCBpdGVtIGluIHRoZSBhcnJheSB0aGF0IHBhc3NlcyB0aGUgdHJ1dGggdGVzdFxuICAgICAqIChpdGVyYXRlZSkgb3IgdGhlIHZhbHVlIGB1bmRlZmluZWRgIGlmIG5vbmUgcGFzc2VkLiBJbnZva2VkIHdpdGhcbiAgICAgKiAoZXJyLCByZXN1bHQpLlxuICAgICAqL1xuICAgIHZhciBkZXRlY3RMaW1pdCA9IF9jcmVhdGVUZXN0ZXIoZWFjaE9mTGltaXQsIGlkZW50aXR5LCBfZmluZEdldFJlc3VsdCk7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgc2FtZSBhcyBgZGV0ZWN0YCBidXQgcnVucyBvbmx5IGEgc2luZ2xlIGFzeW5jIG9wZXJhdGlvbiBhdCBhIHRpbWUuXG4gICAgICpcbiAgICAgKiBAbmFtZSBkZXRlY3RTZXJpZXNcbiAgICAgKiBAc3RhdGljXG4gICAgICogQG1lbWJlck9mIGFzeW5jXG4gICAgICogQHNlZSBhc3luYy5kZXRlY3RcbiAgICAgKiBAYWxpYXMgZmluZFNlcmllc1xuICAgICAqIEBjYXRlZ29yeSBDb2xsZWN0aW9uXG4gICAgICogQHBhcmFtIHtBcnJheXxPYmplY3R9IGNvbGwgLSBBIGNvbGxlY3Rpb24gdG8gaXRlcmF0ZSBvdmVyLlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGl0ZXJhdGVlIC0gQSB0cnV0aCB0ZXN0IHRvIGFwcGx5IHRvIGVhY2ggaXRlbSBpbiBgY29sbGAuXG4gICAgICogVGhlIGl0ZXJhdGVlIGlzIHBhc3NlZCBhIGBjYWxsYmFjayhlcnIsIHRydXRoVmFsdWUpYCB3aGljaCBtdXN0IGJlIGNhbGxlZFxuICAgICAqIHdpdGggYSBib29sZWFuIGFyZ3VtZW50IG9uY2UgaXQgaGFzIGNvbXBsZXRlZC4gSW52b2tlZCB3aXRoIChpdGVtLCBjYWxsYmFjaykuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gW2NhbGxiYWNrXSAtIEEgY2FsbGJhY2sgd2hpY2ggaXMgY2FsbGVkIGFzIHNvb24gYXMgYW55XG4gICAgICogaXRlcmF0ZWUgcmV0dXJucyBgdHJ1ZWAsIG9yIGFmdGVyIGFsbCB0aGUgYGl0ZXJhdGVlYCBmdW5jdGlvbnMgaGF2ZSBmaW5pc2hlZC5cbiAgICAgKiBSZXN1bHQgd2lsbCBiZSB0aGUgZmlyc3QgaXRlbSBpbiB0aGUgYXJyYXkgdGhhdCBwYXNzZXMgdGhlIHRydXRoIHRlc3RcbiAgICAgKiAoaXRlcmF0ZWUpIG9yIHRoZSB2YWx1ZSBgdW5kZWZpbmVkYCBpZiBub25lIHBhc3NlZC4gSW52b2tlZCB3aXRoXG4gICAgICogKGVyciwgcmVzdWx0KS5cbiAgICAgKi9cbiAgICB2YXIgZGV0ZWN0U2VyaWVzID0gX2NyZWF0ZVRlc3RlcihlYWNoT2ZTZXJpZXMsIGlkZW50aXR5LCBfZmluZEdldFJlc3VsdCk7XG5cbiAgICBmdW5jdGlvbiBjb25zb2xlRnVuYyhuYW1lKSB7XG4gICAgICAgIHJldHVybiByZXN0KGZ1bmN0aW9uIChmbiwgYXJncykge1xuICAgICAgICAgICAgZm4uYXBwbHkobnVsbCwgYXJncy5jb25jYXQoW3Jlc3QoZnVuY3Rpb24gKGVyciwgYXJncykge1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgY29uc29sZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvbnNvbGUuZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoY29uc29sZVtuYW1lXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYXJyYXlFYWNoKGFyZ3MsIGZ1bmN0aW9uICh4KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZVtuYW1lXSh4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSldKSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIExvZ3MgdGhlIHJlc3VsdCBvZiBhbiBgYXN5bmNgIGZ1bmN0aW9uIHRvIHRoZSBgY29uc29sZWAgdXNpbmcgYGNvbnNvbGUuZGlyYFxuICAgICAqIHRvIGRpc3BsYXkgdGhlIHByb3BlcnRpZXMgb2YgdGhlIHJlc3VsdGluZyBvYmplY3QuIE9ubHkgd29ya3MgaW4gTm9kZS5qcyBvclxuICAgICAqIGluIGJyb3dzZXJzIHRoYXQgc3VwcG9ydCBgY29uc29sZS5kaXJgIGFuZCBgY29uc29sZS5lcnJvcmAgKHN1Y2ggYXMgRkYgYW5kXG4gICAgICogQ2hyb21lKS4gSWYgbXVsdGlwbGUgYXJndW1lbnRzIGFyZSByZXR1cm5lZCBmcm9tIHRoZSBhc3luYyBmdW5jdGlvbixcbiAgICAgKiBgY29uc29sZS5kaXJgIGlzIGNhbGxlZCBvbiBlYWNoIGFyZ3VtZW50IGluIG9yZGVyLlxuICAgICAqXG4gICAgICogQG5hbWUgbG9nXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBtZW1iZXJPZiBhc3luY1xuICAgICAqIEBjYXRlZ29yeSBVdGlsXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuY3Rpb24gLSBUaGUgZnVuY3Rpb24geW91IHdhbnQgdG8gZXZlbnR1YWxseSBhcHBseSBhbGxcbiAgICAgKiBhcmd1bWVudHMgdG8uXG4gICAgICogQHBhcmFtIHsuLi4qfSBhcmd1bWVudHMuLi4gLSBBbnkgbnVtYmVyIG9mIGFyZ3VtZW50cyB0byBhcHBseSB0byB0aGUgZnVuY3Rpb24uXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqIC8vIGluIGEgbW9kdWxlXG4gICAgICogdmFyIGhlbGxvID0gZnVuY3Rpb24obmFtZSwgY2FsbGJhY2spIHtcbiAgICAgKiAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgKiAgICAgICAgIGNhbGxiYWNrKG51bGwsIHtoZWxsbzogbmFtZX0pO1xuICAgICAqICAgICB9LCAxMDAwKTtcbiAgICAgKiB9O1xuICAgICAqXG4gICAgICogLy8gaW4gdGhlIG5vZGUgcmVwbFxuICAgICAqIG5vZGU+IGFzeW5jLmRpcihoZWxsbywgJ3dvcmxkJyk7XG4gICAgICoge2hlbGxvOiAnd29ybGQnfVxuICAgICAqL1xuICAgIHZhciBkaXIgPSBjb25zb2xlRnVuYygnZGlyJyk7XG5cbiAgICAvKipcbiAgICAgKiBMaWtlIHtAbGluayBhc3luYy53aGlsc3R9LCBleGNlcHQgdGhlIGB0ZXN0YCBpcyBhbiBhc3luY2hyb25vdXMgZnVuY3Rpb24gdGhhdFxuICAgICAqIGlzIHBhc3NlZCBhIGNhbGxiYWNrIGluIHRoZSBmb3JtIG9mIGBmdW5jdGlvbiAoZXJyLCB0cnV0aClgLiBJZiBlcnJvciBpc1xuICAgICAqIHBhc3NlZCB0byBgdGVzdGAgb3IgYGZuYCwgdGhlIG1haW4gY2FsbGJhY2sgaXMgaW1tZWRpYXRlbHkgY2FsbGVkIHdpdGggdGhlXG4gICAgICogdmFsdWUgb2YgdGhlIGVycm9yLlxuICAgICAqXG4gICAgICogQG5hbWUgZHVyaW5nXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBtZW1iZXJPZiBhc3luY1xuICAgICAqIEBzZWUgYXN5bmMud2hpbHN0XG4gICAgICogQGNhdGVnb3J5IENvbnRyb2wgRmxvd1xuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IHRlc3QgLSBhc3luY2hyb25vdXMgdHJ1dGggdGVzdCB0byBwZXJmb3JtIGJlZm9yZSBlYWNoXG4gICAgICogZXhlY3V0aW9uIG9mIGBmbmAuIEludm9rZWQgd2l0aCAoY2FsbGJhY2spLlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIC0gQSBmdW5jdGlvbiB3aGljaCBpcyBjYWxsZWQgZWFjaCB0aW1lIGB0ZXN0YCBwYXNzZXMuXG4gICAgICogVGhlIGZ1bmN0aW9uIGlzIHBhc3NlZCBhIGBjYWxsYmFjayhlcnIpYCwgd2hpY2ggbXVzdCBiZSBjYWxsZWQgb25jZSBpdCBoYXNcbiAgICAgKiBjb21wbGV0ZWQgd2l0aCBhbiBvcHRpb25hbCBgZXJyYCBhcmd1bWVudC4gSW52b2tlZCB3aXRoIChjYWxsYmFjaykuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gW2NhbGxiYWNrXSAtIEEgY2FsbGJhY2sgd2hpY2ggaXMgY2FsbGVkIGFmdGVyIHRoZSB0ZXN0XG4gICAgICogZnVuY3Rpb24gaGFzIGZhaWxlZCBhbmQgcmVwZWF0ZWQgZXhlY3V0aW9uIG9mIGBmbmAgaGFzIHN0b3BwZWQuIGBjYWxsYmFja2BcbiAgICAgKiB3aWxsIGJlIHBhc3NlZCBhbiBlcnJvciBhbmQgYW55IGFyZ3VtZW50cyBwYXNzZWQgdG8gdGhlIGZpbmFsIGBmbmAnc1xuICAgICAqIGNhbGxiYWNrLiBJbnZva2VkIHdpdGggKGVyciwgW3Jlc3VsdHNdKTtcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogdmFyIGNvdW50ID0gMDtcbiAgICAgKlxuICAgICAqIGFzeW5jLmR1cmluZyhcbiAgICAgKiAgICAgZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gICAgICogICAgICAgICByZXR1cm4gY2FsbGJhY2sobnVsbCwgY291bnQgPCA1KTtcbiAgICAgKiAgICAgfSxcbiAgICAgKiAgICAgZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gICAgICogICAgICAgICBjb3VudCsrO1xuICAgICAqICAgICAgICAgc2V0VGltZW91dChjYWxsYmFjaywgMTAwMCk7XG4gICAgICogICAgIH0sXG4gICAgICogICAgIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgKiAgICAgICAgIC8vIDUgc2Vjb25kcyBoYXZlIHBhc3NlZFxuICAgICAqICAgICB9XG4gICAgICogKTtcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBkdXJpbmcodGVzdCwgaXRlcmF0ZWUsIGNiKSB7XG4gICAgICAgIGNiID0gY2IgfHwgbm9vcDtcblxuICAgICAgICB2YXIgbmV4dCA9IHJlc3QoZnVuY3Rpb24gKGVyciwgYXJncykge1xuICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgIGNiKGVycik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGFyZ3MucHVzaChjaGVjayk7XG4gICAgICAgICAgICAgICAgdGVzdC5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdmFyIGNoZWNrID0gZnVuY3Rpb24gKGVyciwgdHJ1dGgpIHtcbiAgICAgICAgICAgIGlmIChlcnIpIHJldHVybiBjYihlcnIpO1xuICAgICAgICAgICAgaWYgKCF0cnV0aCkgcmV0dXJuIGNiKG51bGwpO1xuICAgICAgICAgICAgaXRlcmF0ZWUobmV4dCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgdGVzdChjaGVjayk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVGhlIHBvc3QtY2hlY2sgdmVyc2lvbiBvZiB7QGxpbmsgYXN5bmMuZHVyaW5nfS4gVG8gcmVmbGVjdCB0aGUgZGlmZmVyZW5jZSBpblxuICAgICAqIHRoZSBvcmRlciBvZiBvcGVyYXRpb25zLCB0aGUgYXJndW1lbnRzIGB0ZXN0YCBhbmQgYGZuYCBhcmUgc3dpdGNoZWQuXG4gICAgICpcbiAgICAgKiBBbHNvIGEgdmVyc2lvbiBvZiB7QGxpbmsgYXN5bmMuZG9XaGlsc3R9IHdpdGggYXN5bmNocm9ub3VzIGB0ZXN0YCBmdW5jdGlvbi5cbiAgICAgKiBAbmFtZSBkb0R1cmluZ1xuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAbWVtYmVyT2YgYXN5bmNcbiAgICAgKiBAc2VlIGFzeW5jLmR1cmluZ1xuICAgICAqIEBjYXRlZ29yeSBDb250cm9sIEZsb3dcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiAtIEEgZnVuY3Rpb24gd2hpY2ggaXMgY2FsbGVkIGVhY2ggdGltZSBgdGVzdGAgcGFzc2VzLlxuICAgICAqIFRoZSBmdW5jdGlvbiBpcyBwYXNzZWQgYSBgY2FsbGJhY2soZXJyKWAsIHdoaWNoIG11c3QgYmUgY2FsbGVkIG9uY2UgaXQgaGFzXG4gICAgICogY29tcGxldGVkIHdpdGggYW4gb3B0aW9uYWwgYGVycmAgYXJndW1lbnQuIEludm9rZWQgd2l0aCAoY2FsbGJhY2spLlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IHRlc3QgLSBhc3luY2hyb25vdXMgdHJ1dGggdGVzdCB0byBwZXJmb3JtIGJlZm9yZSBlYWNoXG4gICAgICogZXhlY3V0aW9uIG9mIGBmbmAuIEludm9rZWQgd2l0aCAoY2FsbGJhY2spLlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IFtjYWxsYmFja10gLSBBIGNhbGxiYWNrIHdoaWNoIGlzIGNhbGxlZCBhZnRlciB0aGUgdGVzdFxuICAgICAqIGZ1bmN0aW9uIGhhcyBmYWlsZWQgYW5kIHJlcGVhdGVkIGV4ZWN1dGlvbiBvZiBgZm5gIGhhcyBzdG9wcGVkLiBgY2FsbGJhY2tgXG4gICAgICogd2lsbCBiZSBwYXNzZWQgYW4gZXJyb3IgYW5kIGFueSBhcmd1bWVudHMgcGFzc2VkIHRvIHRoZSBmaW5hbCBgZm5gJ3NcbiAgICAgKiBjYWxsYmFjay4gSW52b2tlZCB3aXRoIChlcnIsIFtyZXN1bHRzXSk7XG4gICAgICovXG4gICAgZnVuY3Rpb24gZG9EdXJpbmcoaXRlcmF0ZWUsIHRlc3QsIGNiKSB7XG4gICAgICAgIHZhciBjYWxscyA9IDA7XG5cbiAgICAgICAgZHVyaW5nKGZ1bmN0aW9uIChuZXh0KSB7XG4gICAgICAgICAgICBpZiAoY2FsbHMrKyA8IDEpIHJldHVybiBuZXh0KG51bGwsIHRydWUpO1xuICAgICAgICAgICAgdGVzdC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICB9LCBpdGVyYXRlZSwgY2IpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlcGVhdGVkbHkgY2FsbCBgZm5gLCB3aGlsZSBgdGVzdGAgcmV0dXJucyBgdHJ1ZWAuIENhbGxzIGBjYWxsYmFja2Agd2hlblxuICAgICAqIHN0b3BwZWQsIG9yIGFuIGVycm9yIG9jY3Vycy5cbiAgICAgKlxuICAgICAqIEBuYW1lIHdoaWxzdFxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAbWVtYmVyT2YgYXN5bmNcbiAgICAgKiBAY2F0ZWdvcnkgQ29udHJvbCBGbG93XG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gdGVzdCAtIHN5bmNocm9ub3VzIHRydXRoIHRlc3QgdG8gcGVyZm9ybSBiZWZvcmUgZWFjaFxuICAgICAqIGV4ZWN1dGlvbiBvZiBgZm5gLiBJbnZva2VkIHdpdGggKCkuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gLSBBIGZ1bmN0aW9uIHdoaWNoIGlzIGNhbGxlZCBlYWNoIHRpbWUgYHRlc3RgIHBhc3Nlcy5cbiAgICAgKiBUaGUgZnVuY3Rpb24gaXMgcGFzc2VkIGEgYGNhbGxiYWNrKGVycilgLCB3aGljaCBtdXN0IGJlIGNhbGxlZCBvbmNlIGl0IGhhc1xuICAgICAqIGNvbXBsZXRlZCB3aXRoIGFuIG9wdGlvbmFsIGBlcnJgIGFyZ3VtZW50LiBJbnZva2VkIHdpdGggKGNhbGxiYWNrKS5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY2FsbGJhY2tdIC0gQSBjYWxsYmFjayB3aGljaCBpcyBjYWxsZWQgYWZ0ZXIgdGhlIHRlc3RcbiAgICAgKiBmdW5jdGlvbiBoYXMgZmFpbGVkIGFuZCByZXBlYXRlZCBleGVjdXRpb24gb2YgYGZuYCBoYXMgc3RvcHBlZC4gYGNhbGxiYWNrYFxuICAgICAqIHdpbGwgYmUgcGFzc2VkIGFuIGVycm9yIGFuZCBhbnkgYXJndW1lbnRzIHBhc3NlZCB0byB0aGUgZmluYWwgYGZuYCdzXG4gICAgICogY2FsbGJhY2suIEludm9rZWQgd2l0aCAoZXJyLCBbcmVzdWx0c10pO1xuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiB2YXIgY291bnQgPSAwO1xuICAgICAqIGFzeW5jLndoaWxzdChcbiAgICAgKiAgICAgZnVuY3Rpb24oKSB7IHJldHVybiBjb3VudCA8IDU7IH0sXG4gICAgICogICAgIGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gICAgICogICAgICAgICBjb3VudCsrO1xuICAgICAqICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgKiAgICAgICAgICAgICBjYWxsYmFjayhudWxsLCBjb3VudCk7XG4gICAgICogICAgICAgICB9LCAxMDAwKTtcbiAgICAgKiAgICAgfSxcbiAgICAgKiAgICAgZnVuY3Rpb24gKGVyciwgbikge1xuICAgICAqICAgICAgICAgLy8gNSBzZWNvbmRzIGhhdmUgcGFzc2VkLCBuID0gNVxuICAgICAqICAgICB9XG4gICAgICogKTtcbiAgICAgKi9cbiAgICBmdW5jdGlvbiB3aGlsc3QodGVzdCwgaXRlcmF0ZWUsIGNiKSB7XG4gICAgICAgIGNiID0gY2IgfHwgbm9vcDtcbiAgICAgICAgaWYgKCF0ZXN0KCkpIHJldHVybiBjYihudWxsKTtcbiAgICAgICAgdmFyIG5leHQgPSByZXN0KGZ1bmN0aW9uIChlcnIsIGFyZ3MpIHtcbiAgICAgICAgICAgIGlmIChlcnIpIHJldHVybiBjYihlcnIpO1xuICAgICAgICAgICAgaWYgKHRlc3QuYXBwbHkodGhpcywgYXJncykpIHJldHVybiBpdGVyYXRlZShuZXh0KTtcbiAgICAgICAgICAgIGNiLmFwcGx5KG51bGwsIFtudWxsXS5jb25jYXQoYXJncykpO1xuICAgICAgICB9KTtcbiAgICAgICAgaXRlcmF0ZWUobmV4dCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVGhlIHBvc3QtY2hlY2sgdmVyc2lvbiBvZiB7QGxpbmsgYXN5bmMud2hpbHN0fS4gVG8gcmVmbGVjdCB0aGUgZGlmZmVyZW5jZSBpblxuICAgICAqIHRoZSBvcmRlciBvZiBvcGVyYXRpb25zLCB0aGUgYXJndW1lbnRzIGB0ZXN0YCBhbmQgYGZuYCBhcmUgc3dpdGNoZWQuXG4gICAgICpcbiAgICAgKiBgZG9XaGlsc3RgIGlzIHRvIGB3aGlsc3RgIGFzIGBkbyB3aGlsZWAgaXMgdG8gYHdoaWxlYCBpbiBwbGFpbiBKYXZhU2NyaXB0LlxuICAgICAqXG4gICAgICogQG5hbWUgZG9XaGlsc3RcbiAgICAgKiBAc3RhdGljXG4gICAgICogQG1lbWJlck9mIGFzeW5jXG4gICAgICogQHNlZSBhc3luYy53aGlsc3RcbiAgICAgKiBAY2F0ZWdvcnkgQ29udHJvbCBGbG93XG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gLSBBIGZ1bmN0aW9uIHdoaWNoIGlzIGNhbGxlZCBlYWNoIHRpbWUgYHRlc3RgIHBhc3Nlcy5cbiAgICAgKiBUaGUgZnVuY3Rpb24gaXMgcGFzc2VkIGEgYGNhbGxiYWNrKGVycilgLCB3aGljaCBtdXN0IGJlIGNhbGxlZCBvbmNlIGl0IGhhc1xuICAgICAqIGNvbXBsZXRlZCB3aXRoIGFuIG9wdGlvbmFsIGBlcnJgIGFyZ3VtZW50LiBJbnZva2VkIHdpdGggKGNhbGxiYWNrKS5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSB0ZXN0IC0gc3luY2hyb25vdXMgdHJ1dGggdGVzdCB0byBwZXJmb3JtIGFmdGVyIGVhY2hcbiAgICAgKiBleGVjdXRpb24gb2YgYGZuYC4gSW52b2tlZCB3aXRoIEludm9rZWQgd2l0aCB0aGUgbm9uLWVycm9yIGNhbGxiYWNrIHJlc3VsdHNcbiAgICAgKiBvZiBgZm5gLlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IFtjYWxsYmFja10gLSBBIGNhbGxiYWNrIHdoaWNoIGlzIGNhbGxlZCBhZnRlciB0aGUgdGVzdFxuICAgICAqIGZ1bmN0aW9uIGhhcyBmYWlsZWQgYW5kIHJlcGVhdGVkIGV4ZWN1dGlvbiBvZiBgZm5gIGhhcyBzdG9wcGVkLiBgY2FsbGJhY2tgXG4gICAgICogd2lsbCBiZSBwYXNzZWQgYW4gZXJyb3IgYW5kIGFueSBhcmd1bWVudHMgcGFzc2VkIHRvIHRoZSBmaW5hbCBgZm5gJ3NcbiAgICAgKiBjYWxsYmFjay4gSW52b2tlZCB3aXRoIChlcnIsIFtyZXN1bHRzXSk7XG4gICAgICovXG4gICAgZnVuY3Rpb24gZG9XaGlsc3QoaXRlcmF0ZWUsIHRlc3QsIGNiKSB7XG4gICAgICAgIHZhciBjYWxscyA9IDA7XG4gICAgICAgIHJldHVybiB3aGlsc3QoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuICsrY2FsbHMgPD0gMSB8fCB0ZXN0LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgIH0sIGl0ZXJhdGVlLCBjYik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTGlrZSB7QGxpbmsgYXN5bmMuZG9XaGlsc3R9LCBleGNlcHQgdGhlIGB0ZXN0YCBpcyBpbnZlcnRlZC4gTm90ZSB0aGVcbiAgICAgKiBhcmd1bWVudCBvcmRlcmluZyBkaWZmZXJzIGZyb20gYHVudGlsYC5cbiAgICAgKlxuICAgICAqIEBuYW1lIGRvVW50aWxcbiAgICAgKiBAc3RhdGljXG4gICAgICogQG1lbWJlck9mIGFzeW5jXG4gICAgICogQHNlZSBhc3luYy5kb1doaWxzdFxuICAgICAqIEBjYXRlZ29yeSBDb250cm9sIEZsb3dcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiAtIEEgZnVuY3Rpb24gd2hpY2ggaXMgY2FsbGVkIGVhY2ggdGltZSBgdGVzdGAgZmFpbHMuXG4gICAgICogVGhlIGZ1bmN0aW9uIGlzIHBhc3NlZCBhIGBjYWxsYmFjayhlcnIpYCwgd2hpY2ggbXVzdCBiZSBjYWxsZWQgb25jZSBpdCBoYXNcbiAgICAgKiBjb21wbGV0ZWQgd2l0aCBhbiBvcHRpb25hbCBgZXJyYCBhcmd1bWVudC4gSW52b2tlZCB3aXRoIChjYWxsYmFjaykuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gdGVzdCAtIHN5bmNocm9ub3VzIHRydXRoIHRlc3QgdG8gcGVyZm9ybSBhZnRlciBlYWNoXG4gICAgICogZXhlY3V0aW9uIG9mIGBmbmAuIEludm9rZWQgd2l0aCB0aGUgbm9uLWVycm9yIGNhbGxiYWNrIHJlc3VsdHMgb2YgYGZuYC5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY2FsbGJhY2tdIC0gQSBjYWxsYmFjayB3aGljaCBpcyBjYWxsZWQgYWZ0ZXIgdGhlIHRlc3RcbiAgICAgKiBmdW5jdGlvbiBoYXMgcGFzc2VkIGFuZCByZXBlYXRlZCBleGVjdXRpb24gb2YgYGZuYCBoYXMgc3RvcHBlZC4gYGNhbGxiYWNrYFxuICAgICAqIHdpbGwgYmUgcGFzc2VkIGFuIGVycm9yIGFuZCBhbnkgYXJndW1lbnRzIHBhc3NlZCB0byB0aGUgZmluYWwgYGZuYCdzXG4gICAgICogY2FsbGJhY2suIEludm9rZWQgd2l0aCAoZXJyLCBbcmVzdWx0c10pO1xuICAgICAqL1xuICAgIGZ1bmN0aW9uIGRvVW50aWwoaXRlcmF0ZWUsIHRlc3QsIGNiKSB7XG4gICAgICAgIHJldHVybiBkb1doaWxzdChpdGVyYXRlZSwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuICF0ZXN0LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgIH0sIGNiKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBfd2l0aG91dEluZGV4KGl0ZXJhdGVlKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAodmFsdWUsIGluZGV4LCBjYWxsYmFjaykge1xuICAgICAgICAgICAgcmV0dXJuIGl0ZXJhdGVlKHZhbHVlLCBjYWxsYmFjayk7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVGhlIHNhbWUgYXMgYGVhY2hgIGJ1dCBydW5zIGEgbWF4aW11bSBvZiBgbGltaXRgIGFzeW5jIG9wZXJhdGlvbnMgYXQgYSB0aW1lLlxuICAgICAqXG4gICAgICogQG5hbWUgZWFjaExpbWl0XG4gICAgICogQHN0YXRpY1xuICAgICAqIEBtZW1iZXJPZiBhc3luY1xuICAgICAqIEBzZWUgYXN5bmMuZWFjaFxuICAgICAqIEBhbGlhcyBmb3JFYWNoTGltaXRcbiAgICAgKiBAY2F0ZWdvcnkgQ29sbGVjdGlvblxuICAgICAqIEBwYXJhbSB7QXJyYXl8T2JqZWN0fSBjb2xsIC0gQSBjb2xsZWNpdG9uIHRvIGl0ZXJhdGUgb3Zlci5cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gbGltaXQgLSBUaGUgbWF4aW11bSBudW1iZXIgb2YgYXN5bmMgb3BlcmF0aW9ucyBhdCBhIHRpbWUuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gaXRlcmF0ZWUgLSBBIGZ1bmN0aW9uIHRvIGFwcGx5IHRvIGVhY2ggaXRlbSBpbiBgY29sbGAuIFRoZVxuICAgICAqIGl0ZXJhdGVlIGlzIHBhc3NlZCBhIGBjYWxsYmFjayhlcnIpYCB3aGljaCBtdXN0IGJlIGNhbGxlZCBvbmNlIGl0IGhhc1xuICAgICAqIGNvbXBsZXRlZC4gSWYgbm8gZXJyb3IgaGFzIG9jY3VycmVkLCB0aGUgYGNhbGxiYWNrYCBzaG91bGQgYmUgcnVuIHdpdGhvdXRcbiAgICAgKiBhcmd1bWVudHMgb3Igd2l0aCBhbiBleHBsaWNpdCBgbnVsbGAgYXJndW1lbnQuIFRoZSBhcnJheSBpbmRleCBpcyBub3QgcGFzc2VkXG4gICAgICogdG8gdGhlIGl0ZXJhdGVlLiBJbnZva2VkIHdpdGggKGl0ZW0sIGNhbGxiYWNrKS4gSWYgeW91IG5lZWQgdGhlIGluZGV4LCB1c2VcbiAgICAgKiBgZWFjaE9mTGltaXRgLlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IFtjYWxsYmFja10gLSBBIGNhbGxiYWNrIHdoaWNoIGlzIGNhbGxlZCB3aGVuIGFsbFxuICAgICAqIGBpdGVyYXRlZWAgZnVuY3Rpb25zIGhhdmUgZmluaXNoZWQsIG9yIGFuIGVycm9yIG9jY3Vycy4gSW52b2tlZCB3aXRoIChlcnIpLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGVhY2hMaW1pdChhcnIsIGxpbWl0LCBpdGVyYXRlZSwgY2IpIHtcbiAgICAgIHJldHVybiBfZWFjaE9mTGltaXQobGltaXQpKGFyciwgX3dpdGhvdXRJbmRleChpdGVyYXRlZSksIGNiKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBcHBsaWVzIHRoZSBmdW5jdGlvbiBgaXRlcmF0ZWVgIHRvIGVhY2ggaXRlbSBpbiBgY29sbGAsIGluIHBhcmFsbGVsLlxuICAgICAqIFRoZSBgaXRlcmF0ZWVgIGlzIGNhbGxlZCB3aXRoIGFuIGl0ZW0gZnJvbSB0aGUgbGlzdCwgYW5kIGEgY2FsbGJhY2sgZm9yIHdoZW5cbiAgICAgKiBpdCBoYXMgZmluaXNoZWQuIElmIHRoZSBgaXRlcmF0ZWVgIHBhc3NlcyBhbiBlcnJvciB0byBpdHMgYGNhbGxiYWNrYCwgdGhlXG4gICAgICogbWFpbiBgY2FsbGJhY2tgIChmb3IgdGhlIGBlYWNoYCBmdW5jdGlvbikgaXMgaW1tZWRpYXRlbHkgY2FsbGVkIHdpdGggdGhlXG4gICAgICogZXJyb3IuXG4gICAgICpcbiAgICAgKiBOb3RlLCB0aGF0IHNpbmNlIHRoaXMgZnVuY3Rpb24gYXBwbGllcyBgaXRlcmF0ZWVgIHRvIGVhY2ggaXRlbSBpbiBwYXJhbGxlbCxcbiAgICAgKiB0aGVyZSBpcyBubyBndWFyYW50ZWUgdGhhdCB0aGUgaXRlcmF0ZWUgZnVuY3Rpb25zIHdpbGwgY29tcGxldGUgaW4gb3JkZXIuXG4gICAgICpcbiAgICAgKiBAbmFtZSBlYWNoXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBtZW1iZXJPZiBhc3luY1xuICAgICAqIEBhbGlhcyBmb3JFYWNoXG4gICAgICogQGNhdGVnb3J5IENvbGxlY3Rpb25cbiAgICAgKiBAcGFyYW0ge0FycmF5fE9iamVjdH0gY29sbCAtIEEgY29sbGVjdGlvbiB0byBpdGVyYXRlIG92ZXIuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gaXRlcmF0ZWUgLSBBIGZ1bmN0aW9uIHRvIGFwcGx5IHRvIGVhY2ggaXRlbVxuICAgICAqIGluIGBjb2xsYC4gVGhlIGl0ZXJhdGVlIGlzIHBhc3NlZCBhIGBjYWxsYmFjayhlcnIpYCB3aGljaCBtdXN0IGJlIGNhbGxlZCBvbmNlXG4gICAgICogaXQgaGFzIGNvbXBsZXRlZC4gSWYgbm8gZXJyb3IgaGFzIG9jY3VycmVkLCB0aGUgYGNhbGxiYWNrYCBzaG91bGQgYmUgcnVuXG4gICAgICogd2l0aG91dCBhcmd1bWVudHMgb3Igd2l0aCBhbiBleHBsaWNpdCBgbnVsbGAgYXJndW1lbnQuIFRoZSBhcnJheSBpbmRleCBpcyBub3RcbiAgICAgKiBwYXNzZWQgdG8gdGhlIGl0ZXJhdGVlLiBJbnZva2VkIHdpdGggKGl0ZW0sIGNhbGxiYWNrKS4gSWYgeW91IG5lZWQgdGhlIGluZGV4LFxuICAgICAqIHVzZSBgZWFjaE9mYC5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY2FsbGJhY2tdIC0gQSBjYWxsYmFjayB3aGljaCBpcyBjYWxsZWQgd2hlbiBhbGxcbiAgICAgKiBgaXRlcmF0ZWVgIGZ1bmN0aW9ucyBoYXZlIGZpbmlzaGVkLCBvciBhbiBlcnJvciBvY2N1cnMuIEludm9rZWQgd2l0aCAoZXJyKS5cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogLy8gYXNzdW1pbmcgb3BlbkZpbGVzIGlzIGFuIGFycmF5IG9mIGZpbGUgbmFtZXMgYW5kIHNhdmVGaWxlIGlzIGEgZnVuY3Rpb25cbiAgICAgKiAvLyB0byBzYXZlIHRoZSBtb2RpZmllZCBjb250ZW50cyBvZiB0aGF0IGZpbGU6XG4gICAgICpcbiAgICAgKiBhc3luYy5lYWNoKG9wZW5GaWxlcywgc2F2ZUZpbGUsIGZ1bmN0aW9uKGVycil7XG4gICAgICogICAvLyBpZiBhbnkgb2YgdGhlIHNhdmVzIHByb2R1Y2VkIGFuIGVycm9yLCBlcnIgd291bGQgZXF1YWwgdGhhdCBlcnJvclxuICAgICAqIH0pO1xuICAgICAqXG4gICAgICogLy8gYXNzdW1pbmcgb3BlbkZpbGVzIGlzIGFuIGFycmF5IG9mIGZpbGUgbmFtZXNcbiAgICAgKiBhc3luYy5lYWNoKG9wZW5GaWxlcywgZnVuY3Rpb24oZmlsZSwgY2FsbGJhY2spIHtcbiAgICAgKlxuICAgICAqICAgICAvLyBQZXJmb3JtIG9wZXJhdGlvbiBvbiBmaWxlIGhlcmUuXG4gICAgICogICAgIGNvbnNvbGUubG9nKCdQcm9jZXNzaW5nIGZpbGUgJyArIGZpbGUpO1xuICAgICAqXG4gICAgICogICAgIGlmKCBmaWxlLmxlbmd0aCA+IDMyICkge1xuICAgICAqICAgICAgIGNvbnNvbGUubG9nKCdUaGlzIGZpbGUgbmFtZSBpcyB0b28gbG9uZycpO1xuICAgICAqICAgICAgIGNhbGxiYWNrKCdGaWxlIG5hbWUgdG9vIGxvbmcnKTtcbiAgICAgKiAgICAgfSBlbHNlIHtcbiAgICAgKiAgICAgICAvLyBEbyB3b3JrIHRvIHByb2Nlc3MgZmlsZSBoZXJlXG4gICAgICogICAgICAgY29uc29sZS5sb2coJ0ZpbGUgcHJvY2Vzc2VkJyk7XG4gICAgICogICAgICAgY2FsbGJhY2soKTtcbiAgICAgKiAgICAgfVxuICAgICAqIH0sIGZ1bmN0aW9uKGVycikge1xuICAgICAqICAgICAvLyBpZiBhbnkgb2YgdGhlIGZpbGUgcHJvY2Vzc2luZyBwcm9kdWNlZCBhbiBlcnJvciwgZXJyIHdvdWxkIGVxdWFsIHRoYXQgZXJyb3JcbiAgICAgKiAgICAgaWYoIGVyciApIHtcbiAgICAgKiAgICAgICAvLyBPbmUgb2YgdGhlIGl0ZXJhdGlvbnMgcHJvZHVjZWQgYW4gZXJyb3IuXG4gICAgICogICAgICAgLy8gQWxsIHByb2Nlc3Npbmcgd2lsbCBub3cgc3RvcC5cbiAgICAgKiAgICAgICBjb25zb2xlLmxvZygnQSBmaWxlIGZhaWxlZCB0byBwcm9jZXNzJyk7XG4gICAgICogICAgIH0gZWxzZSB7XG4gICAgICogICAgICAgY29uc29sZS5sb2coJ0FsbCBmaWxlcyBoYXZlIGJlZW4gcHJvY2Vzc2VkIHN1Y2Nlc3NmdWxseScpO1xuICAgICAqICAgICB9XG4gICAgICogfSk7XG4gICAgICovXG4gICAgdmFyIGVhY2ggPSBkb0xpbWl0KGVhY2hMaW1pdCwgSW5maW5pdHkpO1xuXG4gICAgLyoqXG4gICAgICogVGhlIHNhbWUgYXMgYGVhY2hgIGJ1dCBydW5zIG9ubHkgYSBzaW5nbGUgYXN5bmMgb3BlcmF0aW9uIGF0IGEgdGltZS5cbiAgICAgKlxuICAgICAqIEBuYW1lIGVhY2hTZXJpZXNcbiAgICAgKiBAc3RhdGljXG4gICAgICogQG1lbWJlck9mIGFzeW5jXG4gICAgICogQHNlZSBhc3luYy5lYWNoXG4gICAgICogQGFsaWFzIGZvckVhY2hTZXJpZXNcbiAgICAgKiBAY2F0ZWdvcnkgQ29sbGVjdGlvblxuICAgICAqIEBwYXJhbSB7QXJyYXl8T2JqZWN0fSBjb2xsIC0gQSBjb2xsZWN0aW9uIHRvIGl0ZXJhdGUgb3Zlci5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBpdGVyYXRlZSAtIEEgZnVuY3Rpb24gdG8gYXBwbHkgdG8gZWFjaFxuICAgICAqIGl0ZW0gaW4gYGNvbGxgLiBUaGUgaXRlcmF0ZWUgaXMgcGFzc2VkIGEgYGNhbGxiYWNrKGVycilgIHdoaWNoIG11c3QgYmUgY2FsbGVkXG4gICAgICogb25jZSBpdCBoYXMgY29tcGxldGVkLiBJZiBubyBlcnJvciBoYXMgb2NjdXJyZWQsIHRoZSBgY2FsbGJhY2tgIHNob3VsZCBiZSBydW5cbiAgICAgKiB3aXRob3V0IGFyZ3VtZW50cyBvciB3aXRoIGFuIGV4cGxpY2l0IGBudWxsYCBhcmd1bWVudC4gVGhlIGFycmF5IGluZGV4IGlzXG4gICAgICogbm90IHBhc3NlZCB0byB0aGUgaXRlcmF0ZWUuIEludm9rZWQgd2l0aCAoaXRlbSwgY2FsbGJhY2spLiBJZiB5b3UgbmVlZCB0aGVcbiAgICAgKiBpbmRleCwgdXNlIGBlYWNoT2ZTZXJpZXNgLlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IFtjYWxsYmFja10gLSBBIGNhbGxiYWNrIHdoaWNoIGlzIGNhbGxlZCB3aGVuIGFsbFxuICAgICAqIGBpdGVyYXRlZWAgZnVuY3Rpb25zIGhhdmUgZmluaXNoZWQsIG9yIGFuIGVycm9yIG9jY3Vycy4gSW52b2tlZCB3aXRoIChlcnIpLlxuICAgICAqL1xuICAgIHZhciBlYWNoU2VyaWVzID0gZG9MaW1pdChlYWNoTGltaXQsIDEpO1xuXG4gICAgLyoqXG4gICAgICogV3JhcCBhbiBhc3luYyBmdW5jdGlvbiBhbmQgZW5zdXJlIGl0IGNhbGxzIGl0cyBjYWxsYmFjayBvbiBhIGxhdGVyIHRpY2sgb2ZcbiAgICAgKiB0aGUgZXZlbnQgbG9vcC4gIElmIHRoZSBmdW5jdGlvbiBhbHJlYWR5IGNhbGxzIGl0cyBjYWxsYmFjayBvbiBhIG5leHQgdGljayxcbiAgICAgKiBubyBleHRyYSBkZWZlcnJhbCBpcyBhZGRlZC4gVGhpcyBpcyB1c2VmdWwgZm9yIHByZXZlbnRpbmcgc3RhY2sgb3ZlcmZsb3dzXG4gICAgICogKGBSYW5nZUVycm9yOiBNYXhpbXVtIGNhbGwgc3RhY2sgc2l6ZSBleGNlZWRlZGApIGFuZCBnZW5lcmFsbHkga2VlcGluZ1xuICAgICAqIFtaYWxnb10oaHR0cDovL2Jsb2cuaXpzLm1lL3Bvc3QvNTkxNDI3NDIxNDMvZGVzaWduaW5nLWFwaXMtZm9yLWFzeW5jaHJvbnkpXG4gICAgICogY29udGFpbmVkLlxuICAgICAqXG4gICAgICogQG5hbWUgZW5zdXJlQXN5bmNcbiAgICAgKiBAc3RhdGljXG4gICAgICogQG1lbWJlck9mIGFzeW5jXG4gICAgICogQGNhdGVnb3J5IFV0aWxcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiAtIGFuIGFzeW5jIGZ1bmN0aW9uLCBvbmUgdGhhdCBleHBlY3RzIGEgbm9kZS1zdHlsZVxuICAgICAqIGNhbGxiYWNrIGFzIGl0cyBsYXN0IGFyZ3VtZW50LlxuICAgICAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyBhIHdyYXBwZWQgZnVuY3Rpb24gd2l0aCB0aGUgZXhhY3Qgc2FtZSBjYWxsXG4gICAgICogc2lnbmF0dXJlIGFzIHRoZSBmdW5jdGlvbiBwYXNzZWQgaW4uXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqIGZ1bmN0aW9uIHNvbWV0aW1lc0FzeW5jKGFyZywgY2FsbGJhY2spIHtcbiAgICAgKiAgICAgaWYgKGNhY2hlW2FyZ10pIHtcbiAgICAgKiAgICAgICAgIHJldHVybiBjYWxsYmFjayhudWxsLCBjYWNoZVthcmddKTsgLy8gdGhpcyB3b3VsZCBiZSBzeW5jaHJvbm91cyEhXG4gICAgICogICAgIH0gZWxzZSB7XG4gICAgICogICAgICAgICBkb1NvbWVJTyhhcmcsIGNhbGxiYWNrKTsgLy8gdGhpcyBJTyB3b3VsZCBiZSBhc3luY2hyb25vdXNcbiAgICAgKiAgICAgfVxuICAgICAqIH1cbiAgICAgKlxuICAgICAqIC8vIHRoaXMgaGFzIGEgcmlzayBvZiBzdGFjayBvdmVyZmxvd3MgaWYgbWFueSByZXN1bHRzIGFyZSBjYWNoZWQgaW4gYSByb3dcbiAgICAgKiBhc3luYy5tYXBTZXJpZXMoYXJncywgc29tZXRpbWVzQXN5bmMsIGRvbmUpO1xuICAgICAqXG4gICAgICogLy8gdGhpcyB3aWxsIGRlZmVyIHNvbWV0aW1lc0FzeW5jJ3MgY2FsbGJhY2sgaWYgbmVjZXNzYXJ5LFxuICAgICAqIC8vIHByZXZlbnRpbmcgc3RhY2sgb3ZlcmZsb3dzXG4gICAgICogYXN5bmMubWFwU2VyaWVzKGFyZ3MsIGFzeW5jLmVuc3VyZUFzeW5jKHNvbWV0aW1lc0FzeW5jKSwgZG9uZSk7XG4gICAgICovXG4gICAgZnVuY3Rpb24gZW5zdXJlQXN5bmMoZm4pIHtcbiAgICAgICAgcmV0dXJuIGluaXRpYWxQYXJhbXMoZnVuY3Rpb24gKGFyZ3MsIGNhbGxiYWNrKSB7XG4gICAgICAgICAgICB2YXIgc3luYyA9IHRydWU7XG4gICAgICAgICAgICBhcmdzLnB1c2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciBpbm5lckFyZ3MgPSBhcmd1bWVudHM7XG4gICAgICAgICAgICAgICAgaWYgKHN5bmMpIHtcbiAgICAgICAgICAgICAgICAgICAgc2V0SW1tZWRpYXRlJDEoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2suYXBwbHkobnVsbCwgaW5uZXJBcmdzKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2suYXBwbHkobnVsbCwgaW5uZXJBcmdzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGZuLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgICAgICAgICAgc3luYyA9IGZhbHNlO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBub3RJZCh2KSB7XG4gICAgICAgIHJldHVybiAhdjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUaGUgc2FtZSBhcyBgZXZlcnlgIGJ1dCBydW5zIGEgbWF4aW11bSBvZiBgbGltaXRgIGFzeW5jIG9wZXJhdGlvbnMgYXQgYSB0aW1lLlxuICAgICAqXG4gICAgICogQG5hbWUgZXZlcnlMaW1pdFxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAbWVtYmVyT2YgYXN5bmNcbiAgICAgKiBAc2VlIGFzeW5jLmV2ZXJ5XG4gICAgICogQGFsaWFzIGFsbExpbWl0XG4gICAgICogQGNhdGVnb3J5IENvbGxlY3Rpb25cbiAgICAgKiBAcGFyYW0ge0FycmF5fE9iamVjdH0gY29sbCAtIEEgY29sbGVjdGlvbiB0byBpdGVyYXRlIG92ZXIuXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGxpbWl0IC0gVGhlIG1heGltdW0gbnVtYmVyIG9mIGFzeW5jIG9wZXJhdGlvbnMgYXQgYSB0aW1lLlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGl0ZXJhdGVlIC0gQSB0cnV0aCB0ZXN0IHRvIGFwcGx5IHRvIGVhY2ggaXRlbSBpbiB0aGVcbiAgICAgKiBjb2xsZWN0aW9uIGluIHBhcmFsbGVsLiBUaGUgaXRlcmF0ZWUgaXMgcGFzc2VkIGEgYGNhbGxiYWNrKGVyciwgdHJ1dGhWYWx1ZSlgXG4gICAgICogd2hpY2ggbXVzdCBiZSBjYWxsZWQgd2l0aCBhICBib29sZWFuIGFyZ3VtZW50IG9uY2UgaXQgaGFzIGNvbXBsZXRlZC4gSW52b2tlZFxuICAgICAqIHdpdGggKGl0ZW0sIGNhbGxiYWNrKS5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY2FsbGJhY2tdIC0gQSBjYWxsYmFjayB3aGljaCBpcyBjYWxsZWQgYWZ0ZXIgYWxsIHRoZVxuICAgICAqIGBpdGVyYXRlZWAgZnVuY3Rpb25zIGhhdmUgZmluaXNoZWQuIFJlc3VsdCB3aWxsIGJlIGVpdGhlciBgdHJ1ZWAgb3IgYGZhbHNlYFxuICAgICAqIGRlcGVuZGluZyBvbiB0aGUgdmFsdWVzIG9mIHRoZSBhc3luYyB0ZXN0cy4gSW52b2tlZCB3aXRoIChlcnIsIHJlc3VsdCkuXG4gICAgICovXG4gICAgdmFyIGV2ZXJ5TGltaXQgPSBfY3JlYXRlVGVzdGVyKGVhY2hPZkxpbWl0LCBub3RJZCwgbm90SWQpO1xuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBgdHJ1ZWAgaWYgZXZlcnkgZWxlbWVudCBpbiBgY29sbGAgc2F0aXNmaWVzIGFuIGFzeW5jIHRlc3QuIElmIGFueVxuICAgICAqIGl0ZXJhdGVlIGNhbGwgcmV0dXJucyBgZmFsc2VgLCB0aGUgbWFpbiBgY2FsbGJhY2tgIGlzIGltbWVkaWF0ZWx5IGNhbGxlZC5cbiAgICAgKlxuICAgICAqIEBuYW1lIGV2ZXJ5XG4gICAgICogQHN0YXRpY1xuICAgICAqIEBtZW1iZXJPZiBhc3luY1xuICAgICAqIEBhbGlhcyBhbGxcbiAgICAgKiBAY2F0ZWdvcnkgQ29sbGVjdGlvblxuICAgICAqIEBwYXJhbSB7QXJyYXl8T2JqZWN0fSBjb2xsIC0gQSBjb2xsZWN0aW9uIHRvIGl0ZXJhdGUgb3Zlci5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBpdGVyYXRlZSAtIEEgdHJ1dGggdGVzdCB0byBhcHBseSB0byBlYWNoIGl0ZW0gaW4gdGhlXG4gICAgICogY29sbGVjdGlvbiBpbiBwYXJhbGxlbC4gVGhlIGl0ZXJhdGVlIGlzIHBhc3NlZCBhIGBjYWxsYmFjayhlcnIsIHRydXRoVmFsdWUpYFxuICAgICAqIHdoaWNoIG11c3QgYmUgY2FsbGVkIHdpdGggYSAgYm9vbGVhbiBhcmd1bWVudCBvbmNlIGl0IGhhcyBjb21wbGV0ZWQuIEludm9rZWRcbiAgICAgKiB3aXRoIChpdGVtLCBjYWxsYmFjaykuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gW2NhbGxiYWNrXSAtIEEgY2FsbGJhY2sgd2hpY2ggaXMgY2FsbGVkIGFmdGVyIGFsbCB0aGVcbiAgICAgKiBgaXRlcmF0ZWVgIGZ1bmN0aW9ucyBoYXZlIGZpbmlzaGVkLiBSZXN1bHQgd2lsbCBiZSBlaXRoZXIgYHRydWVgIG9yIGBmYWxzZWBcbiAgICAgKiBkZXBlbmRpbmcgb24gdGhlIHZhbHVlcyBvZiB0aGUgYXN5bmMgdGVzdHMuIEludm9rZWQgd2l0aCAoZXJyLCByZXN1bHQpLlxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiBhc3luYy5ldmVyeShbJ2ZpbGUxJywnZmlsZTInLCdmaWxlMyddLCBmdW5jdGlvbihmaWxlUGF0aCwgY2FsbGJhY2spIHtcbiAgICAgKiAgICAgZnMuYWNjZXNzKGZpbGVQYXRoLCBmdW5jdGlvbihlcnIpIHtcbiAgICAgKiAgICAgICAgIGNhbGxiYWNrKG51bGwsICFlcnIpXG4gICAgICogICAgIH0pO1xuICAgICAqIH0sIGZ1bmN0aW9uKGVyciwgcmVzdWx0KSB7XG4gICAgICogICAgIC8vIGlmIHJlc3VsdCBpcyB0cnVlIHRoZW4gZXZlcnkgZmlsZSBleGlzdHNcbiAgICAgKiB9KTtcbiAgICAgKi9cbiAgICB2YXIgZXZlcnkgPSBkb0xpbWl0KGV2ZXJ5TGltaXQsIEluZmluaXR5KTtcblxuICAgIC8qKlxuICAgICAqIFRoZSBzYW1lIGFzIGBldmVyeWAgYnV0IHJ1bnMgb25seSBhIHNpbmdsZSBhc3luYyBvcGVyYXRpb24gYXQgYSB0aW1lLlxuICAgICAqXG4gICAgICogQG5hbWUgZXZlcnlTZXJpZXNcbiAgICAgKiBAc3RhdGljXG4gICAgICogQG1lbWJlck9mIGFzeW5jXG4gICAgICogQHNlZSBhc3luYy5ldmVyeVxuICAgICAqIEBhbGlhcyBhbGxTZXJpZXNcbiAgICAgKiBAY2F0ZWdvcnkgQ29sbGVjdGlvblxuICAgICAqIEBwYXJhbSB7QXJyYXl8T2JqZWN0fSBjb2xsIC0gQSBjb2xsZWN0aW9uIHRvIGl0ZXJhdGUgb3Zlci5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBpdGVyYXRlZSAtIEEgdHJ1dGggdGVzdCB0byBhcHBseSB0byBlYWNoIGl0ZW0gaW4gdGhlXG4gICAgICogY29sbGVjdGlvbiBpbiBwYXJhbGxlbC4gVGhlIGl0ZXJhdGVlIGlzIHBhc3NlZCBhIGBjYWxsYmFjayhlcnIsIHRydXRoVmFsdWUpYFxuICAgICAqIHdoaWNoIG11c3QgYmUgY2FsbGVkIHdpdGggYSAgYm9vbGVhbiBhcmd1bWVudCBvbmNlIGl0IGhhcyBjb21wbGV0ZWQuIEludm9rZWRcbiAgICAgKiB3aXRoIChpdGVtLCBjYWxsYmFjaykuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gW2NhbGxiYWNrXSAtIEEgY2FsbGJhY2sgd2hpY2ggaXMgY2FsbGVkIGFmdGVyIGFsbCB0aGVcbiAgICAgKiBgaXRlcmF0ZWVgIGZ1bmN0aW9ucyBoYXZlIGZpbmlzaGVkLiBSZXN1bHQgd2lsbCBiZSBlaXRoZXIgYHRydWVgIG9yIGBmYWxzZWBcbiAgICAgKiBkZXBlbmRpbmcgb24gdGhlIHZhbHVlcyBvZiB0aGUgYXN5bmMgdGVzdHMuIEludm9rZWQgd2l0aCAoZXJyLCByZXN1bHQpLlxuICAgICAqL1xuICAgIHZhciBldmVyeVNlcmllcyA9IGRvTGltaXQoZXZlcnlMaW1pdCwgMSk7XG5cbiAgICBmdW5jdGlvbiBfZmlsdGVyKGVhY2hmbiwgYXJyLCBpdGVyYXRlZSwgY2FsbGJhY2spIHtcbiAgICAgICAgdmFyIHJlc3VsdHMgPSBbXTtcbiAgICAgICAgZWFjaGZuKGFyciwgZnVuY3Rpb24gKHgsIGluZGV4LCBjYWxsYmFjaykge1xuICAgICAgICAgICAgaXRlcmF0ZWUoeCwgZnVuY3Rpb24gKGVyciwgdikge1xuICAgICAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2soZXJyKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpZiAodikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0cy5wdXNoKHsgaW5kZXg6IGluZGV4LCB2YWx1ZTogeCB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2soZXJyKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2sobnVsbCwgYXJyYXlNYXAocmVzdWx0cy5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBhLmluZGV4IC0gYi5pbmRleDtcbiAgICAgICAgICAgICAgICB9KSwgYmFzZVByb3BlcnR5KCd2YWx1ZScpKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRoZSBzYW1lIGFzIGBmaWx0ZXJgIGJ1dCBydW5zIGEgbWF4aW11bSBvZiBgbGltaXRgIGFzeW5jIG9wZXJhdGlvbnMgYXQgYVxuICAgICAqIHRpbWUuXG4gICAgICpcbiAgICAgKiBAbmFtZSBmaWx0ZXJMaW1pdFxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAbWVtYmVyT2YgYXN5bmNcbiAgICAgKiBAc2VlIGFzeW5jLmZpbHRlclxuICAgICAqIEBhbGlhcyBzZWxlY3RMaW1pdFxuICAgICAqIEBjYXRlZ29yeSBDb2xsZWN0aW9uXG4gICAgICogQHBhcmFtIHtBcnJheXxPYmplY3R9IGNvbGwgLSBBIGNvbGxlY3Rpb24gdG8gaXRlcmF0ZSBvdmVyLlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBsaW1pdCAtIFRoZSBtYXhpbXVtIG51bWJlciBvZiBhc3luYyBvcGVyYXRpb25zIGF0IGEgdGltZS5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBpdGVyYXRlZSAtIEEgdHJ1dGggdGVzdCB0byBhcHBseSB0byBlYWNoIGl0ZW0gaW4gYGNvbGxgLlxuICAgICAqIFRoZSBgaXRlcmF0ZWVgIGlzIHBhc3NlZCBhIGBjYWxsYmFjayhlcnIsIHRydXRoVmFsdWUpYCwgd2hpY2ggbXVzdCBiZSBjYWxsZWRcbiAgICAgKiB3aXRoIGEgYm9vbGVhbiBhcmd1bWVudCBvbmNlIGl0IGhhcyBjb21wbGV0ZWQuIEludm9rZWQgd2l0aCAoaXRlbSwgY2FsbGJhY2spLlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IFtjYWxsYmFja10gLSBBIGNhbGxiYWNrIHdoaWNoIGlzIGNhbGxlZCBhZnRlciBhbGwgdGhlXG4gICAgICogYGl0ZXJhdGVlYCBmdW5jdGlvbnMgaGF2ZSBmaW5pc2hlZC4gSW52b2tlZCB3aXRoIChlcnIsIHJlc3VsdHMpLlxuICAgICAqL1xuICAgIHZhciBmaWx0ZXJMaW1pdCA9IGRvUGFyYWxsZWxMaW1pdChfZmlsdGVyKTtcblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSBuZXcgYXJyYXkgb2YgYWxsIHRoZSB2YWx1ZXMgaW4gYGNvbGxgIHdoaWNoIHBhc3MgYW4gYXN5bmMgdHJ1dGhcbiAgICAgKiB0ZXN0LiBUaGlzIG9wZXJhdGlvbiBpcyBwZXJmb3JtZWQgaW4gcGFyYWxsZWwsIGJ1dCB0aGUgcmVzdWx0cyBhcnJheSB3aWxsIGJlXG4gICAgICogaW4gdGhlIHNhbWUgb3JkZXIgYXMgdGhlIG9yaWdpbmFsLlxuICAgICAqXG4gICAgICogQG5hbWUgZmlsdGVyXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBtZW1iZXJPZiBhc3luY1xuICAgICAqIEBhbGlhcyBzZWxlY3RcbiAgICAgKiBAY2F0ZWdvcnkgQ29sbGVjdGlvblxuICAgICAqIEBwYXJhbSB7QXJyYXl8T2JqZWN0fSBjb2xsIC0gQSBjb2xsZWN0aW9uIHRvIGl0ZXJhdGUgb3Zlci5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBpdGVyYXRlZSAtIEEgdHJ1dGggdGVzdCB0byBhcHBseSB0byBlYWNoIGl0ZW0gaW4gYGNvbGxgLlxuICAgICAqIFRoZSBgaXRlcmF0ZWVgIGlzIHBhc3NlZCBhIGBjYWxsYmFjayhlcnIsIHRydXRoVmFsdWUpYCwgd2hpY2ggbXVzdCBiZSBjYWxsZWRcbiAgICAgKiB3aXRoIGEgYm9vbGVhbiBhcmd1bWVudCBvbmNlIGl0IGhhcyBjb21wbGV0ZWQuIEludm9rZWQgd2l0aCAoaXRlbSwgY2FsbGJhY2spLlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IFtjYWxsYmFja10gLSBBIGNhbGxiYWNrIHdoaWNoIGlzIGNhbGxlZCBhZnRlciBhbGwgdGhlXG4gICAgICogYGl0ZXJhdGVlYCBmdW5jdGlvbnMgaGF2ZSBmaW5pc2hlZC4gSW52b2tlZCB3aXRoIChlcnIsIHJlc3VsdHMpLlxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiBhc3luYy5maWx0ZXIoWydmaWxlMScsJ2ZpbGUyJywnZmlsZTMnXSwgZnVuY3Rpb24oZmlsZVBhdGgsIGNhbGxiYWNrKSB7XG4gICAgICogICAgIGZzLmFjY2VzcyhmaWxlUGF0aCwgZnVuY3Rpb24oZXJyKSB7XG4gICAgICogICAgICAgICBjYWxsYmFjayhudWxsLCAhZXJyKVxuICAgICAqICAgICB9KTtcbiAgICAgKiB9LCBmdW5jdGlvbihlcnIsIHJlc3VsdHMpIHtcbiAgICAgKiAgICAgLy8gcmVzdWx0cyBub3cgZXF1YWxzIGFuIGFycmF5IG9mIHRoZSBleGlzdGluZyBmaWxlc1xuICAgICAqIH0pO1xuICAgICAqL1xuICAgIHZhciBmaWx0ZXIgPSBkb0xpbWl0KGZpbHRlckxpbWl0LCBJbmZpbml0eSk7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgc2FtZSBhcyBgZmlsdGVyYCBidXQgcnVucyBvbmx5IGEgc2luZ2xlIGFzeW5jIG9wZXJhdGlvbiBhdCBhIHRpbWUuXG4gICAgICpcbiAgICAgKiBAbmFtZSBmaWx0ZXJTZXJpZXNcbiAgICAgKiBAc3RhdGljXG4gICAgICogQG1lbWJlck9mIGFzeW5jXG4gICAgICogQHNlZSBhc3luYy5maWx0ZXJcbiAgICAgKiBAYWxpYXMgc2VsZWN0U2VyaWVzXG4gICAgICogQGNhdGVnb3J5IENvbGxlY3Rpb25cbiAgICAgKiBAcGFyYW0ge0FycmF5fE9iamVjdH0gY29sbCAtIEEgY29sbGVjdGlvbiB0byBpdGVyYXRlIG92ZXIuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gaXRlcmF0ZWUgLSBBIHRydXRoIHRlc3QgdG8gYXBwbHkgdG8gZWFjaCBpdGVtIGluIGBjb2xsYC5cbiAgICAgKiBUaGUgYGl0ZXJhdGVlYCBpcyBwYXNzZWQgYSBgY2FsbGJhY2soZXJyLCB0cnV0aFZhbHVlKWAsIHdoaWNoIG11c3QgYmUgY2FsbGVkXG4gICAgICogd2l0aCBhIGJvb2xlYW4gYXJndW1lbnQgb25jZSBpdCBoYXMgY29tcGxldGVkLiBJbnZva2VkIHdpdGggKGl0ZW0sIGNhbGxiYWNrKS5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY2FsbGJhY2tdIC0gQSBjYWxsYmFjayB3aGljaCBpcyBjYWxsZWQgYWZ0ZXIgYWxsIHRoZVxuICAgICAqIGBpdGVyYXRlZWAgZnVuY3Rpb25zIGhhdmUgZmluaXNoZWQuIEludm9rZWQgd2l0aCAoZXJyLCByZXN1bHRzKVxuICAgICAqL1xuICAgIHZhciBmaWx0ZXJTZXJpZXMgPSBkb0xpbWl0KGZpbHRlckxpbWl0LCAxKTtcblxuICAgIC8qKlxuICAgICAqIENhbGxzIHRoZSBhc3luY2hyb25vdXMgZnVuY3Rpb24gYGZuYCB3aXRoIGEgY2FsbGJhY2sgcGFyYW1ldGVyIHRoYXQgYWxsb3dzIGl0XG4gICAgICogdG8gY2FsbCBpdHNlbGYgYWdhaW4sIGluIHNlcmllcywgaW5kZWZpbml0ZWx5LlxuXG4gICAgICogSWYgYW4gZXJyb3IgaXMgcGFzc2VkIHRvIHRoZVxuICAgICAqIGNhbGxiYWNrIHRoZW4gYGVycmJhY2tgIGlzIGNhbGxlZCB3aXRoIHRoZSBlcnJvciwgYW5kIGV4ZWN1dGlvbiBzdG9wcyxcbiAgICAgKiBvdGhlcndpc2UgaXQgd2lsbCBuZXZlciBiZSBjYWxsZWQuXG4gICAgICpcbiAgICAgKiBAbmFtZSBmb3JldmVyXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBtZW1iZXJPZiBhc3luY1xuICAgICAqIEBjYXRlZ29yeSBDb250cm9sIEZsb3dcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiAtIGEgZnVuY3Rpb24gdG8gY2FsbCByZXBlYXRlZGx5LiBJbnZva2VkIHdpdGggKG5leHQpLlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IFtlcnJiYWNrXSAtIHdoZW4gYGZuYCBwYXNzZXMgYW4gZXJyb3IgdG8gaXQncyBjYWxsYmFjayxcbiAgICAgKiB0aGlzIGZ1bmN0aW9uIHdpbGwgYmUgY2FsbGVkLCBhbmQgZXhlY3V0aW9uIHN0b3BzLiBJbnZva2VkIHdpdGggKGVycikuXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqIGFzeW5jLmZvcmV2ZXIoXG4gICAgICogICAgIGZ1bmN0aW9uKG5leHQpIHtcbiAgICAgKiAgICAgICAgIC8vIG5leHQgaXMgc3VpdGFibGUgZm9yIHBhc3NpbmcgdG8gdGhpbmdzIHRoYXQgbmVlZCBhIGNhbGxiYWNrKGVyciBbLCB3aGF0ZXZlcl0pO1xuICAgICAqICAgICAgICAgLy8gaXQgd2lsbCByZXN1bHQgaW4gdGhpcyBmdW5jdGlvbiBiZWluZyBjYWxsZWQgYWdhaW4uXG4gICAgICogICAgIH0sXG4gICAgICogICAgIGZ1bmN0aW9uKGVycikge1xuICAgICAqICAgICAgICAgLy8gaWYgbmV4dCBpcyBjYWxsZWQgd2l0aCBhIHZhbHVlIGluIGl0cyBmaXJzdCBwYXJhbWV0ZXIsIGl0IHdpbGwgYXBwZWFyXG4gICAgICogICAgICAgICAvLyBpbiBoZXJlIGFzICdlcnInLCBhbmQgZXhlY3V0aW9uIHdpbGwgc3RvcC5cbiAgICAgKiAgICAgfVxuICAgICAqICk7XG4gICAgICovXG4gICAgZnVuY3Rpb24gZm9yZXZlcihmbiwgY2IpIHtcbiAgICAgICAgdmFyIGRvbmUgPSBvbmx5T25jZShjYiB8fCBub29wKTtcbiAgICAgICAgdmFyIHRhc2sgPSBlbnN1cmVBc3luYyhmbik7XG5cbiAgICAgICAgZnVuY3Rpb24gbmV4dChlcnIpIHtcbiAgICAgICAgICAgIGlmIChlcnIpIHJldHVybiBkb25lKGVycik7XG4gICAgICAgICAgICB0YXNrKG5leHQpO1xuICAgICAgICB9XG4gICAgICAgIG5leHQoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGFuIGl0ZXJhdG9yIGZ1bmN0aW9uIHdoaWNoIGNhbGxzIHRoZSBuZXh0IGZ1bmN0aW9uIGluIHRoZSBgdGFza3NgXG4gICAgICogYXJyYXksIHJldHVybmluZyBhIGNvbnRpbnVhdGlvbiB0byBjYWxsIHRoZSBuZXh0IG9uZSBhZnRlciB0aGF0LiBJdCdzIGFsc29cbiAgICAgKiBwb3NzaWJsZSB0byDigJxwZWVr4oCdIGF0IHRoZSBuZXh0IGl0ZXJhdG9yIHdpdGggYGl0ZXJhdG9yLm5leHQoKWAuXG4gICAgICpcbiAgICAgKiBUaGlzIGZ1bmN0aW9uIGlzIHVzZWQgaW50ZXJuYWxseSBieSB0aGUgYGFzeW5jYCBtb2R1bGUsIGJ1dCBjYW4gYmUgdXNlZnVsXG4gICAgICogd2hlbiB5b3Ugd2FudCB0byBtYW51YWxseSBjb250cm9sIHRoZSBmbG93IG9mIGZ1bmN0aW9ucyBpbiBzZXJpZXMuXG4gICAgICpcbiAgICAgKiBAbmFtZSBpdGVyYXRvclxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAbWVtYmVyT2YgYXN5bmNcbiAgICAgKiBAY2F0ZWdvcnkgQ29udHJvbCBGbG93XG4gICAgICogQHBhcmFtIHtBcnJheX0gdGFza3MgLSBBbiBhcnJheSBvZiBmdW5jdGlvbnMgdG8gcnVuLlxuICAgICAqIEByZXR1cm5zIFRoZSBuZXh0IGZ1bmN0aW9uIHRvIHJ1biBpbiB0aGUgc2VyaWVzLlxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiB2YXIgaXRlcmF0b3IgPSBhc3luYy5pdGVyYXRvcihbXG4gICAgICogICAgIGZ1bmN0aW9uKCkgeyBzeXMucCgnb25lJyk7IH0sXG4gICAgICogICAgIGZ1bmN0aW9uKCkgeyBzeXMucCgndHdvJyk7IH0sXG4gICAgICogICAgIGZ1bmN0aW9uKCkgeyBzeXMucCgndGhyZWUnKTsgfVxuICAgICAqIF0pO1xuICAgICAqXG4gICAgICogbm9kZT4gdmFyIGl0ZXJhdG9yMiA9IGl0ZXJhdG9yKCk7XG4gICAgICogJ29uZSdcbiAgICAgKiBub2RlPiB2YXIgaXRlcmF0b3IzID0gaXRlcmF0b3IyKCk7XG4gICAgICogJ3R3bydcbiAgICAgKiBub2RlPiBpdGVyYXRvcjMoKTtcbiAgICAgKiAndGhyZWUnXG4gICAgICogbm9kZT4gdmFyIG5leHRmbiA9IGl0ZXJhdG9yMi5uZXh0KCk7XG4gICAgICogbm9kZT4gbmV4dGZuKCk7XG4gICAgICogJ3RocmVlJ1xuICAgICAqL1xuICAgIGZ1bmN0aW9uIGl0ZXJhdG9yJDEgKHRhc2tzKSB7XG4gICAgICAgIGZ1bmN0aW9uIG1ha2VDYWxsYmFjayhpbmRleCkge1xuICAgICAgICAgICAgZnVuY3Rpb24gZm4oKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRhc2tzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICB0YXNrc1tpbmRleF0uYXBwbHkobnVsbCwgYXJndW1lbnRzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZuLm5leHQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZuLm5leHQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGluZGV4IDwgdGFza3MubGVuZ3RoIC0gMSA/IG1ha2VDYWxsYmFjayhpbmRleCArIDEpIDogbnVsbDtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICByZXR1cm4gZm47XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG1ha2VDYWxsYmFjaygwKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBMb2dzIHRoZSByZXN1bHQgb2YgYW4gYGFzeW5jYCBmdW5jdGlvbiB0byB0aGUgYGNvbnNvbGVgLiBPbmx5IHdvcmtzIGluXG4gICAgICogTm9kZS5qcyBvciBpbiBicm93c2VycyB0aGF0IHN1cHBvcnQgYGNvbnNvbGUubG9nYCBhbmQgYGNvbnNvbGUuZXJyb3JgIChzdWNoXG4gICAgICogYXMgRkYgYW5kIENocm9tZSkuIElmIG11bHRpcGxlIGFyZ3VtZW50cyBhcmUgcmV0dXJuZWQgZnJvbSB0aGUgYXN5bmNcbiAgICAgKiBmdW5jdGlvbiwgYGNvbnNvbGUubG9nYCBpcyBjYWxsZWQgb24gZWFjaCBhcmd1bWVudCBpbiBvcmRlci5cbiAgICAgKlxuICAgICAqIEBuYW1lIGxvZ1xuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAbWVtYmVyT2YgYXN5bmNcbiAgICAgKiBAY2F0ZWdvcnkgVXRpbFxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmN0aW9uIC0gVGhlIGZ1bmN0aW9uIHlvdSB3YW50IHRvIGV2ZW50dWFsbHkgYXBwbHkgYWxsXG4gICAgICogYXJndW1lbnRzIHRvLlxuICAgICAqIEBwYXJhbSB7Li4uKn0gYXJndW1lbnRzLi4uIC0gQW55IG51bWJlciBvZiBhcmd1bWVudHMgdG8gYXBwbHkgdG8gdGhlIGZ1bmN0aW9uLlxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiAvLyBpbiBhIG1vZHVsZVxuICAgICAqIHZhciBoZWxsbyA9IGZ1bmN0aW9uKG5hbWUsIGNhbGxiYWNrKSB7XG4gICAgICogICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICogICAgICAgICBjYWxsYmFjayhudWxsLCAnaGVsbG8gJyArIG5hbWUpO1xuICAgICAqICAgICB9LCAxMDAwKTtcbiAgICAgKiB9O1xuICAgICAqXG4gICAgICogLy8gaW4gdGhlIG5vZGUgcmVwbFxuICAgICAqIG5vZGU+IGFzeW5jLmxvZyhoZWxsbywgJ3dvcmxkJyk7XG4gICAgICogJ2hlbGxvIHdvcmxkJ1xuICAgICAqL1xuICAgIHZhciBsb2cgPSBjb25zb2xlRnVuYygnbG9nJyk7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgc2FtZSBhcyBgbWFwVmFsdWVzYCBidXQgcnVucyBhIG1heGltdW0gb2YgYGxpbWl0YCBhc3luYyBvcGVyYXRpb25zIGF0IGFcbiAgICAgKiB0aW1lLlxuICAgICAqXG4gICAgICogQG5hbWUgbWFwVmFsdWVzTGltaXRcbiAgICAgKiBAc3RhdGljXG4gICAgICogQG1lbWJlck9mIGFzeW5jXG4gICAgICogQHNlZSBhc3luYy5tYXBWYWx1ZXNcbiAgICAgKiBAY2F0ZWdvcnkgQ29sbGVjdGlvblxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvYmogLSBBIGNvbGxlY3Rpb24gdG8gaXRlcmF0ZSBvdmVyLlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBsaW1pdCAtIFRoZSBtYXhpbXVtIG51bWJlciBvZiBhc3luYyBvcGVyYXRpb25zIGF0IGEgdGltZS5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBpdGVyYXRlZSAtIEEgZnVuY3Rpb24gdG8gYXBwbHkgdG8gZWFjaCB2YWx1ZSBpbiBgb2JqYC5cbiAgICAgKiBUaGUgaXRlcmF0ZWUgaXMgcGFzc2VkIGEgYGNhbGxiYWNrKGVyciwgdHJhbnNmb3JtZWQpYCB3aGljaCBtdXN0IGJlIGNhbGxlZFxuICAgICAqIG9uY2UgaXQgaGFzIGNvbXBsZXRlZCB3aXRoIGFuIGVycm9yICh3aGljaCBjYW4gYmUgYG51bGxgKSBhbmQgYVxuICAgICAqIHRyYW5zZm9ybWVkIHZhbHVlLiBJbnZva2VkIHdpdGggKHZhbHVlLCBrZXksIGNhbGxiYWNrKS5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY2FsbGJhY2tdIC0gQSBjYWxsYmFjayB3aGljaCBpcyBjYWxsZWQgd2hlbiBhbGwgYGl0ZXJhdGVlYFxuICAgICAqIGZ1bmN0aW9ucyBoYXZlIGZpbmlzaGVkLCBvciBhbiBlcnJvciBvY2N1cnMuIFJlc3VsdCBpcyBhbiBvYmplY3Qgb2YgdGhlXG4gICAgICogdHJhbnNmb3JtZWQgdmFsdWVzIGZyb20gdGhlIGBvYmpgLiBJbnZva2VkIHdpdGggKGVyciwgcmVzdWx0KS5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBtYXBWYWx1ZXNMaW1pdChvYmosIGxpbWl0LCBpdGVyYXRlZSwgY2FsbGJhY2spIHtcbiAgICAgICAgdmFyIG5ld09iaiA9IHt9O1xuICAgICAgICBlYWNoT2ZMaW1pdChvYmosIGxpbWl0LCBmdW5jdGlvbiAodmFsLCBrZXksIG5leHQpIHtcbiAgICAgICAgICAgIGl0ZXJhdGVlKHZhbCwga2V5LCBmdW5jdGlvbiAoZXJyLCByZXN1bHQpIHtcbiAgICAgICAgICAgICAgICBpZiAoZXJyKSByZXR1cm4gbmV4dChlcnIpO1xuICAgICAgICAgICAgICAgIG5ld09ialtrZXldID0gcmVzdWx0O1xuICAgICAgICAgICAgICAgIG5leHQoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICBjYWxsYmFjayhlcnIsIG5ld09iaik7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEEgcmVsYXRpdmUgb2YgYG1hcGAsIGRlc2lnbmVkIGZvciB1c2Ugd2l0aCBvYmplY3RzLlxuICAgICAqXG4gICAgICogUHJvZHVjZXMgYSBuZXcgT2JqZWN0IGJ5IG1hcHBpbmcgZWFjaCB2YWx1ZSBvZiBgb2JqYCB0aHJvdWdoIHRoZSBgaXRlcmF0ZWVgXG4gICAgICogZnVuY3Rpb24uIFRoZSBgaXRlcmF0ZWVgIGlzIGNhbGxlZCBlYWNoIGB2YWx1ZWAgYW5kIGBrZXlgIGZyb20gYG9iamAgYW5kIGFcbiAgICAgKiBjYWxsYmFjayBmb3Igd2hlbiBpdCBoYXMgZmluaXNoZWQgcHJvY2Vzc2luZy4gRWFjaCBvZiB0aGVzZSBjYWxsYmFja3MgdGFrZXNcbiAgICAgKiB0d28gYXJndW1lbnRzOiBhbiBgZXJyb3JgLCBhbmQgdGhlIHRyYW5zZm9ybWVkIGl0ZW0gZnJvbSBgb2JqYC4gSWYgYGl0ZXJhdGVlYFxuICAgICAqIHBhc3NlcyBhbiBlcnJvciB0byBpdHMgY2FsbGJhY2ssIHRoZSBtYWluIGBjYWxsYmFja2AgKGZvciB0aGUgYG1hcFZhbHVlc2BcbiAgICAgKiBmdW5jdGlvbikgaXMgaW1tZWRpYXRlbHkgY2FsbGVkIHdpdGggdGhlIGVycm9yLlxuICAgICAqXG4gICAgICogTm90ZSwgdGhlIG9yZGVyIG9mIHRoZSBrZXlzIGluIHRoZSByZXN1bHQgaXMgbm90IGd1YXJhbnRlZWQuICBUaGUga2V5cyB3aWxsXG4gICAgICogYmUgcm91Z2hseSBpbiB0aGUgb3JkZXIgdGhleSBjb21wbGV0ZSwgKGJ1dCB0aGlzIGlzIHZlcnkgZW5naW5lLXNwZWNpZmljKVxuICAgICAqXG4gICAgICogQG5hbWUgbWFwVmFsdWVzXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBtZW1iZXJPZiBhc3luY1xuICAgICAqIEBjYXRlZ29yeSBDb2xsZWN0aW9uXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9iaiAtIEEgY29sbGVjdGlvbiB0byBpdGVyYXRlIG92ZXIuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gaXRlcmF0ZWUgLSBBIGZ1bmN0aW9uIHRvIGFwcGx5IHRvIGVhY2ggdmFsdWUgYW5kIGtleSBpblxuICAgICAqIGBjb2xsYC4gVGhlIGl0ZXJhdGVlIGlzIHBhc3NlZCBhIGBjYWxsYmFjayhlcnIsIHRyYW5zZm9ybWVkKWAgd2hpY2ggbXVzdCBiZVxuICAgICAqIGNhbGxlZCBvbmNlIGl0IGhhcyBjb21wbGV0ZWQgd2l0aCBhbiBlcnJvciAod2hpY2ggY2FuIGJlIGBudWxsYCkgYW5kIGFcbiAgICAgKiB0cmFuc2Zvcm1lZCB2YWx1ZS4gSW52b2tlZCB3aXRoICh2YWx1ZSwga2V5LCBjYWxsYmFjaykuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gW2NhbGxiYWNrXSAtIEEgY2FsbGJhY2sgd2hpY2ggaXMgY2FsbGVkIHdoZW4gYWxsIGBpdGVyYXRlZWBcbiAgICAgKiBmdW5jdGlvbnMgaGF2ZSBmaW5pc2hlZCwgb3IgYW4gZXJyb3Igb2NjdXJzLiBSZXN1bHRzIGlzIGFuIGFycmF5IG9mIHRoZVxuICAgICAqIHRyYW5zZm9ybWVkIGl0ZW1zIGZyb20gdGhlIGBvYmpgLiBJbnZva2VkIHdpdGggKGVyciwgcmVzdWx0KS5cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogYXN5bmMubWFwVmFsdWVzKHtcbiAgICAgKiAgICAgZjE6ICdmaWxlMScsXG4gICAgICogICAgIGYyOiAnZmlsZTInLFxuICAgICAqICAgICBmMzogJ2ZpbGUzJ1xuICAgICAqIH0sIGZzLnN0YXQsIGZ1bmN0aW9uKGVyciwgcmVzdWx0KSB7XG4gICAgICogICAgIC8vIHJlc3VsdHMgaXMgbm93IGEgbWFwIG9mIHN0YXRzIGZvciBlYWNoIGZpbGUsIGUuZy5cbiAgICAgKiAgICAgLy8ge1xuICAgICAqICAgICAvLyAgICAgZjE6IFtzdGF0cyBmb3IgZmlsZTFdLFxuICAgICAqICAgICAvLyAgICAgZjI6IFtzdGF0cyBmb3IgZmlsZTJdLFxuICAgICAqICAgICAvLyAgICAgZjM6IFtzdGF0cyBmb3IgZmlsZTNdXG4gICAgICogICAgIC8vIH1cbiAgICAgKiB9KTtcbiAgICAgKi9cblxuICAgIHZhciBtYXBWYWx1ZXMgPSBkb0xpbWl0KG1hcFZhbHVlc0xpbWl0LCBJbmZpbml0eSk7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgc2FtZSBhcyBgbWFwVmFsdWVzYCBidXQgcnVucyBvbmx5IGEgc2luZ2xlIGFzeW5jIG9wZXJhdGlvbiBhdCBhIHRpbWUuXG4gICAgICpcbiAgICAgKiBAbmFtZSBtYXBWYWx1ZXNTZXJpZXNcbiAgICAgKiBAc3RhdGljXG4gICAgICogQG1lbWJlck9mIGFzeW5jXG4gICAgICogQHNlZSBhc3luYy5tYXBWYWx1ZXNcbiAgICAgKiBAY2F0ZWdvcnkgQ29sbGVjdGlvblxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvYmogLSBBIGNvbGxlY3Rpb24gdG8gaXRlcmF0ZSBvdmVyLlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGl0ZXJhdGVlIC0gQSBmdW5jdGlvbiB0byBhcHBseSB0byBlYWNoIHZhbHVlIGluIGBvYmpgLlxuICAgICAqIFRoZSBpdGVyYXRlZSBpcyBwYXNzZWQgYSBgY2FsbGJhY2soZXJyLCB0cmFuc2Zvcm1lZClgIHdoaWNoIG11c3QgYmUgY2FsbGVkXG4gICAgICogb25jZSBpdCBoYXMgY29tcGxldGVkIHdpdGggYW4gZXJyb3IgKHdoaWNoIGNhbiBiZSBgbnVsbGApIGFuZCBhXG4gICAgICogdHJhbnNmb3JtZWQgdmFsdWUuIEludm9rZWQgd2l0aCAodmFsdWUsIGtleSwgY2FsbGJhY2spLlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IFtjYWxsYmFja10gLSBBIGNhbGxiYWNrIHdoaWNoIGlzIGNhbGxlZCB3aGVuIGFsbCBgaXRlcmF0ZWVgXG4gICAgICogZnVuY3Rpb25zIGhhdmUgZmluaXNoZWQsIG9yIGFuIGVycm9yIG9jY3Vycy4gUmVzdWx0IGlzIGFuIG9iamVjdCBvZiB0aGVcbiAgICAgKiB0cmFuc2Zvcm1lZCB2YWx1ZXMgZnJvbSB0aGUgYG9iamAuIEludm9rZWQgd2l0aCAoZXJyLCByZXN1bHQpLlxuICAgICAqL1xuICAgIHZhciBtYXBWYWx1ZXNTZXJpZXMgPSBkb0xpbWl0KG1hcFZhbHVlc0xpbWl0LCAxKTtcblxuICAgIGZ1bmN0aW9uIGhhcyhvYmosIGtleSkge1xuICAgICAgICByZXR1cm4ga2V5IGluIG9iajtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDYWNoZXMgdGhlIHJlc3VsdHMgb2YgYW4gYGFzeW5jYCBmdW5jdGlvbi4gV2hlbiBjcmVhdGluZyBhIGhhc2ggdG8gc3RvcmVcbiAgICAgKiBmdW5jdGlvbiByZXN1bHRzIGFnYWluc3QsIHRoZSBjYWxsYmFjayBpcyBvbWl0dGVkIGZyb20gdGhlIGhhc2ggYW5kIGFuXG4gICAgICogb3B0aW9uYWwgaGFzaCBmdW5jdGlvbiBjYW4gYmUgdXNlZC5cbiAgICAgKlxuICAgICAqIElmIG5vIGhhc2ggZnVuY3Rpb24gaXMgc3BlY2lmaWVkLCB0aGUgZmlyc3QgYXJndW1lbnQgaXMgdXNlZCBhcyBhIGhhc2gga2V5LFxuICAgICAqIHdoaWNoIG1heSB3b3JrIHJlYXNvbmFibHkgaWYgaXQgaXMgYSBzdHJpbmcgb3IgYSBkYXRhIHR5cGUgdGhhdCBjb252ZXJ0cyB0byBhXG4gICAgICogZGlzdGluY3Qgc3RyaW5nLiBOb3RlIHRoYXQgb2JqZWN0cyBhbmQgYXJyYXlzIHdpbGwgbm90IGJlaGF2ZSByZWFzb25hYmx5LlxuICAgICAqIE5laXRoZXIgd2lsbCBjYXNlcyB3aGVyZSB0aGUgb3RoZXIgYXJndW1lbnRzIGFyZSBzaWduaWZpY2FudC4gSW4gc3VjaCBjYXNlcyxcbiAgICAgKiBzcGVjaWZ5IHlvdXIgb3duIGhhc2ggZnVuY3Rpb24uXG4gICAgICpcbiAgICAgKiBUaGUgY2FjaGUgb2YgcmVzdWx0cyBpcyBleHBvc2VkIGFzIHRoZSBgbWVtb2AgcHJvcGVydHkgb2YgdGhlIGZ1bmN0aW9uXG4gICAgICogcmV0dXJuZWQgYnkgYG1lbW9pemVgLlxuICAgICAqXG4gICAgICogQG5hbWUgbWVtb2l6ZVxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAbWVtYmVyT2YgYXN5bmNcbiAgICAgKiBAY2F0ZWdvcnkgVXRpbFxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIC0gVGhlIGZ1bmN0aW9uIHRvIHByb3h5IGFuZCBjYWNoZSByZXN1bHRzIGZyb20uXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gaGFzaGVyIC0gQW4gb3B0aW9uYWwgZnVuY3Rpb24gZm9yIGdlbmVyYXRpbmcgYSBjdXN0b20gaGFzaFxuICAgICAqIGZvciBzdG9yaW5nIHJlc3VsdHMuIEl0IGhhcyBhbGwgdGhlIGFyZ3VtZW50cyBhcHBsaWVkIHRvIGl0IGFwYXJ0IGZyb20gdGhlXG4gICAgICogY2FsbGJhY2ssIGFuZCBtdXN0IGJlIHN5bmNocm9ub3VzLlxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiB2YXIgc2xvd19mbiA9IGZ1bmN0aW9uKG5hbWUsIGNhbGxiYWNrKSB7XG4gICAgICogICAgIC8vIGRvIHNvbWV0aGluZ1xuICAgICAqICAgICBjYWxsYmFjayhudWxsLCByZXN1bHQpO1xuICAgICAqIH07XG4gICAgICogdmFyIGZuID0gYXN5bmMubWVtb2l6ZShzbG93X2ZuKTtcbiAgICAgKlxuICAgICAqIC8vIGZuIGNhbiBub3cgYmUgdXNlZCBhcyBpZiBpdCB3ZXJlIHNsb3dfZm5cbiAgICAgKiBmbignc29tZSBuYW1lJywgZnVuY3Rpb24oKSB7XG4gICAgICogICAgIC8vIGNhbGxiYWNrXG4gICAgICogfSk7XG4gICAgICovXG4gICAgZnVuY3Rpb24gbWVtb2l6ZSQxKGZuLCBoYXNoZXIpIHtcbiAgICAgICAgdmFyIG1lbW8gPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgICAgICB2YXIgcXVldWVzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICAgICAgaGFzaGVyID0gaGFzaGVyIHx8IGlkZW50aXR5O1xuICAgICAgICB2YXIgbWVtb2l6ZWQgPSBpbml0aWFsUGFyYW1zKGZ1bmN0aW9uIG1lbW9pemVkKGFyZ3MsIGNhbGxiYWNrKSB7XG4gICAgICAgICAgICB2YXIga2V5ID0gaGFzaGVyLmFwcGx5KG51bGwsIGFyZ3MpO1xuICAgICAgICAgICAgaWYgKGhhcyhtZW1vLCBrZXkpKSB7XG4gICAgICAgICAgICAgICAgc2V0SW1tZWRpYXRlJDEoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjay5hcHBseShudWxsLCBtZW1vW2tleV0pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChoYXMocXVldWVzLCBrZXkpKSB7XG4gICAgICAgICAgICAgICAgcXVldWVzW2tleV0ucHVzaChjYWxsYmFjayk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHF1ZXVlc1trZXldID0gW2NhbGxiYWNrXTtcbiAgICAgICAgICAgICAgICBmbi5hcHBseShudWxsLCBhcmdzLmNvbmNhdChbcmVzdChmdW5jdGlvbiAoYXJncykge1xuICAgICAgICAgICAgICAgICAgICBtZW1vW2tleV0gPSBhcmdzO1xuICAgICAgICAgICAgICAgICAgICB2YXIgcSA9IHF1ZXVlc1trZXldO1xuICAgICAgICAgICAgICAgICAgICBkZWxldGUgcXVldWVzW2tleV07XG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBsID0gcS5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHFbaV0uYXBwbHkobnVsbCwgYXJncyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KV0pKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIG1lbW9pemVkLm1lbW8gPSBtZW1vO1xuICAgICAgICBtZW1vaXplZC51bm1lbW9pemVkID0gZm47XG4gICAgICAgIHJldHVybiBtZW1vaXplZDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDYWxscyBgY2FsbGJhY2tgIG9uIGEgbGF0ZXIgbG9vcCBhcm91bmQgdGhlIGV2ZW50IGxvb3AuIEluIE5vZGUuanMgdGhpcyBqdXN0XG4gICAgICogY2FsbHMgYHNldEltbWVkaWF0ZWAuICBJbiB0aGUgYnJvd3NlciBpdCB3aWxsIHVzZSBgc2V0SW1tZWRpYXRlYCBpZlxuICAgICAqIGF2YWlsYWJsZSwgb3RoZXJ3aXNlIGBzZXRUaW1lb3V0KGNhbGxiYWNrLCAwKWAsIHdoaWNoIG1lYW5zIG90aGVyIGhpZ2hlclxuICAgICAqIHByaW9yaXR5IGV2ZW50cyBtYXkgcHJlY2VkZSB0aGUgZXhlY3V0aW9uIG9mIGBjYWxsYmFja2AuXG4gICAgICpcbiAgICAgKiBUaGlzIGlzIHVzZWQgaW50ZXJuYWxseSBmb3IgYnJvd3Nlci1jb21wYXRpYmlsaXR5IHB1cnBvc2VzLlxuICAgICAqXG4gICAgICogQG5hbWUgbmV4dFRpY2tcbiAgICAgKiBAc3RhdGljXG4gICAgICogQG1lbWJlck9mIGFzeW5jXG4gICAgICogQGFsaWFzIHNldEltbWVkaWF0ZVxuICAgICAqIEBjYXRlZ29yeSBVdGlsXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgLSBUaGUgZnVuY3Rpb24gdG8gY2FsbCBvbiBhIGxhdGVyIGxvb3AgYXJvdW5kXG4gICAgICogdGhlIGV2ZW50IGxvb3AuIEludm9rZWQgd2l0aCAoYXJncy4uLikuXG4gICAgICogQHBhcmFtIHsuLi4qfSBhcmdzLi4uIC0gYW55IG51bWJlciBvZiBhZGRpdGlvbmFsIGFyZ3VtZW50cyB0byBwYXNzIHRvIHRoZVxuICAgICAqIGNhbGxiYWNrIG9uIHRoZSBuZXh0IHRpY2suXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqIHZhciBjYWxsX29yZGVyID0gW107XG4gICAgICogYXN5bmMubmV4dFRpY2soZnVuY3Rpb24oKSB7XG4gICAgICogICAgIGNhbGxfb3JkZXIucHVzaCgndHdvJyk7XG4gICAgICogICAgIC8vIGNhbGxfb3JkZXIgbm93IGVxdWFscyBbJ29uZScsJ3R3byddXG4gICAgICogfSk7XG4gICAgICogY2FsbF9vcmRlci5wdXNoKCdvbmUnKTtcbiAgICAgKlxuICAgICAqIGFzeW5jLnNldEltbWVkaWF0ZShmdW5jdGlvbiAoYSwgYiwgYykge1xuICAgICAqICAgICAvLyBhLCBiLCBhbmQgYyBlcXVhbCAxLCAyLCBhbmQgM1xuICAgICAqIH0sIDEsIDIsIDMpO1xuICAgICAqL1xuICAgIHZhciBfZGVmZXIkMTtcblxuICAgIGlmIChoYXNOZXh0VGljaykge1xuICAgICAgICBfZGVmZXIkMSA9IHByb2Nlc3MubmV4dFRpY2s7XG4gICAgfSBlbHNlIGlmIChoYXNTZXRJbW1lZGlhdGUpIHtcbiAgICAgICAgX2RlZmVyJDEgPSBzZXRJbW1lZGlhdGU7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgX2RlZmVyJDEgPSBmYWxsYmFjaztcbiAgICB9XG5cbiAgICB2YXIgbmV4dFRpY2sgPSB3cmFwKF9kZWZlciQxKTtcblxuICAgIGZ1bmN0aW9uIF9wYXJhbGxlbChlYWNoZm4sIHRhc2tzLCBjYWxsYmFjaykge1xuICAgICAgICBjYWxsYmFjayA9IGNhbGxiYWNrIHx8IG5vb3A7XG4gICAgICAgIHZhciByZXN1bHRzID0gaXNBcnJheUxpa2UodGFza3MpID8gW10gOiB7fTtcblxuICAgICAgICBlYWNoZm4odGFza3MsIGZ1bmN0aW9uICh0YXNrLCBrZXksIGNhbGxiYWNrKSB7XG4gICAgICAgICAgICB0YXNrKHJlc3QoZnVuY3Rpb24gKGVyciwgYXJncykge1xuICAgICAgICAgICAgICAgIGlmIChhcmdzLmxlbmd0aCA8PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIGFyZ3MgPSBhcmdzWzBdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXN1bHRzW2tleV0gPSBhcmdzO1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrKGVycik7XG4gICAgICAgICAgICB9KSk7XG4gICAgICAgIH0sIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgIGNhbGxiYWNrKGVyciwgcmVzdWx0cyk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRoZSBzYW1lIGFzIGBwYXJhbGxlbGAgYnV0IHJ1bnMgYSBtYXhpbXVtIG9mIGBsaW1pdGAgYXN5bmMgb3BlcmF0aW9ucyBhdCBhXG4gICAgICogdGltZS5cbiAgICAgKlxuICAgICAqIEBuYW1lIHBhcmFsbGVsXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBtZW1iZXJPZiBhc3luY1xuICAgICAqIEBzZWUgYXN5bmMucGFyYWxsZWxcbiAgICAgKiBAY2F0ZWdvcnkgQ29udHJvbCBGbG93XG4gICAgICogQHBhcmFtIHtBcnJheXxDb2xsZWN0aW9ufSB0YXNrcyAtIEEgY29sbGVjdGlvbiBjb250YWluaW5nIGZ1bmN0aW9ucyB0byBydW4uXG4gICAgICogRWFjaCBmdW5jdGlvbiBpcyBwYXNzZWQgYSBgY2FsbGJhY2soZXJyLCByZXN1bHQpYCB3aGljaCBpdCBtdXN0IGNhbGwgb25cbiAgICAgKiBjb21wbGV0aW9uIHdpdGggYW4gZXJyb3IgYGVycmAgKHdoaWNoIGNhbiBiZSBgbnVsbGApIGFuZCBhbiBvcHRpb25hbCBgcmVzdWx0YFxuICAgICAqIHZhbHVlLlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBsaW1pdCAtIFRoZSBtYXhpbXVtIG51bWJlciBvZiBhc3luYyBvcGVyYXRpb25zIGF0IGEgdGltZS5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY2FsbGJhY2tdIC0gQW4gb3B0aW9uYWwgY2FsbGJhY2sgdG8gcnVuIG9uY2UgYWxsIHRoZVxuICAgICAqIGZ1bmN0aW9ucyBoYXZlIGNvbXBsZXRlZCBzdWNjZXNzZnVsbHkuIFRoaXMgZnVuY3Rpb24gZ2V0cyBhIHJlc3VsdHMgYXJyYXlcbiAgICAgKiAob3Igb2JqZWN0KSBjb250YWluaW5nIGFsbCB0aGUgcmVzdWx0IGFyZ3VtZW50cyBwYXNzZWQgdG8gdGhlIHRhc2sgY2FsbGJhY2tzLlxuICAgICAqIEludm9rZWQgd2l0aCAoZXJyLCByZXN1bHRzKS5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBwYXJhbGxlbExpbWl0KHRhc2tzLCBsaW1pdCwgY2IpIHtcbiAgICAgIHJldHVybiBfcGFyYWxsZWwoX2VhY2hPZkxpbWl0KGxpbWl0KSwgdGFza3MsIGNiKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSdW4gdGhlIGB0YXNrc2AgY29sbGVjdGlvbiBvZiBmdW5jdGlvbnMgaW4gcGFyYWxsZWwsIHdpdGhvdXQgd2FpdGluZyB1bnRpbFxuICAgICAqIHRoZSBwcmV2aW91cyBmdW5jdGlvbiBoYXMgY29tcGxldGVkLiBJZiBhbnkgb2YgdGhlIGZ1bmN0aW9ucyBwYXNzIGFuIGVycm9yIHRvXG4gICAgICogaXRzIGNhbGxiYWNrLCB0aGUgbWFpbiBgY2FsbGJhY2tgIGlzIGltbWVkaWF0ZWx5IGNhbGxlZCB3aXRoIHRoZSB2YWx1ZSBvZiB0aGVcbiAgICAgKiBlcnJvci4gT25jZSB0aGUgYHRhc2tzYCBoYXZlIGNvbXBsZXRlZCwgdGhlIHJlc3VsdHMgYXJlIHBhc3NlZCB0byB0aGUgZmluYWxcbiAgICAgKiBgY2FsbGJhY2tgIGFzIGFuIGFycmF5LlxuICAgICAqXG4gICAgICogKipOb3RlOioqIGBwYXJhbGxlbGAgaXMgYWJvdXQga2lja2luZy1vZmYgSS9PIHRhc2tzIGluIHBhcmFsbGVsLCBub3QgYWJvdXRcbiAgICAgKiBwYXJhbGxlbCBleGVjdXRpb24gb2YgY29kZS4gIElmIHlvdXIgdGFza3MgZG8gbm90IHVzZSBhbnkgdGltZXJzIG9yIHBlcmZvcm1cbiAgICAgKiBhbnkgSS9PLCB0aGV5IHdpbGwgYWN0dWFsbHkgYmUgZXhlY3V0ZWQgaW4gc2VyaWVzLiAgQW55IHN5bmNocm9ub3VzIHNldHVwXG4gICAgICogc2VjdGlvbnMgZm9yIGVhY2ggdGFzayB3aWxsIGhhcHBlbiBvbmUgYWZ0ZXIgdGhlIG90aGVyLiAgSmF2YVNjcmlwdCByZW1haW5zXG4gICAgICogc2luZ2xlLXRocmVhZGVkLlxuICAgICAqXG4gICAgICogSXQgaXMgYWxzbyBwb3NzaWJsZSB0byB1c2UgYW4gb2JqZWN0IGluc3RlYWQgb2YgYW4gYXJyYXkuIEVhY2ggcHJvcGVydHkgd2lsbFxuICAgICAqIGJlIHJ1biBhcyBhIGZ1bmN0aW9uIGFuZCB0aGUgcmVzdWx0cyB3aWxsIGJlIHBhc3NlZCB0byB0aGUgZmluYWwgYGNhbGxiYWNrYFxuICAgICAqIGFzIGFuIG9iamVjdCBpbnN0ZWFkIG9mIGFuIGFycmF5LiBUaGlzIGNhbiBiZSBhIG1vcmUgcmVhZGFibGUgd2F5IG9mIGhhbmRsaW5nXG4gICAgICogcmVzdWx0cyBmcm9tIHtAbGluayBhc3luYy5wYXJhbGxlbH0uXG4gICAgICpcbiAgICAgKiBAbmFtZSBwYXJhbGxlbFxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAbWVtYmVyT2YgYXN5bmNcbiAgICAgKiBAY2F0ZWdvcnkgQ29udHJvbCBGbG93XG4gICAgICogQHBhcmFtIHtBcnJheXxPYmplY3R9IHRhc2tzIC0gQSBjb2xsZWN0aW9uIGNvbnRhaW5pbmcgZnVuY3Rpb25zIHRvIHJ1bi5cbiAgICAgKiBFYWNoIGZ1bmN0aW9uIGlzIHBhc3NlZCBhIGBjYWxsYmFjayhlcnIsIHJlc3VsdClgIHdoaWNoIGl0IG11c3QgY2FsbCBvblxuICAgICAqIGNvbXBsZXRpb24gd2l0aCBhbiBlcnJvciBgZXJyYCAod2hpY2ggY2FuIGJlIGBudWxsYCkgYW5kIGFuIG9wdGlvbmFsIGByZXN1bHRgXG4gICAgICogdmFsdWUuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gW2NhbGxiYWNrXSAtIEFuIG9wdGlvbmFsIGNhbGxiYWNrIHRvIHJ1biBvbmNlIGFsbCB0aGVcbiAgICAgKiBmdW5jdGlvbnMgaGF2ZSBjb21wbGV0ZWQgc3VjY2Vzc2Z1bGx5LiBUaGlzIGZ1bmN0aW9uIGdldHMgYSByZXN1bHRzIGFycmF5XG4gICAgICogKG9yIG9iamVjdCkgY29udGFpbmluZyBhbGwgdGhlIHJlc3VsdCBhcmd1bWVudHMgcGFzc2VkIHRvIHRoZSB0YXNrIGNhbGxiYWNrcy5cbiAgICAgKiBJbnZva2VkIHdpdGggKGVyciwgcmVzdWx0cykuXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiBhc3luYy5wYXJhbGxlbChbXG4gICAgICogICAgIGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gICAgICogICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAqICAgICAgICAgICAgIGNhbGxiYWNrKG51bGwsICdvbmUnKTtcbiAgICAgKiAgICAgICAgIH0sIDIwMCk7XG4gICAgICogICAgIH0sXG4gICAgICogICAgIGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gICAgICogICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAqICAgICAgICAgICAgIGNhbGxiYWNrKG51bGwsICd0d28nKTtcbiAgICAgKiAgICAgICAgIH0sIDEwMCk7XG4gICAgICogICAgIH1cbiAgICAgKiBdLFxuICAgICAqIC8vIG9wdGlvbmFsIGNhbGxiYWNrXG4gICAgICogZnVuY3Rpb24oZXJyLCByZXN1bHRzKSB7XG4gICAgICogICAgIC8vIHRoZSByZXN1bHRzIGFycmF5IHdpbGwgZXF1YWwgWydvbmUnLCd0d28nXSBldmVuIHRob3VnaFxuICAgICAqICAgICAvLyB0aGUgc2Vjb25kIGZ1bmN0aW9uIGhhZCBhIHNob3J0ZXIgdGltZW91dC5cbiAgICAgKiB9KTtcbiAgICAgKlxuICAgICAqIC8vIGFuIGV4YW1wbGUgdXNpbmcgYW4gb2JqZWN0IGluc3RlYWQgb2YgYW4gYXJyYXlcbiAgICAgKiBhc3luYy5wYXJhbGxlbCh7XG4gICAgICogICAgIG9uZTogZnVuY3Rpb24oY2FsbGJhY2spIHtcbiAgICAgKiAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICogICAgICAgICAgICAgY2FsbGJhY2sobnVsbCwgMSk7XG4gICAgICogICAgICAgICB9LCAyMDApO1xuICAgICAqICAgICB9LFxuICAgICAqICAgICB0d286IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gICAgICogICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAqICAgICAgICAgICAgIGNhbGxiYWNrKG51bGwsIDIpO1xuICAgICAqICAgICAgICAgfSwgMTAwKTtcbiAgICAgKiAgICAgfVxuICAgICAqIH0sIGZ1bmN0aW9uKGVyciwgcmVzdWx0cykge1xuICAgICAqICAgICAvLyByZXN1bHRzIGlzIG5vdyBlcXVhbHMgdG86IHtvbmU6IDEsIHR3bzogMn1cbiAgICAgKiB9KTtcbiAgICAgKi9cbiAgICB2YXIgcGFyYWxsZWwgPSBkb0xpbWl0KHBhcmFsbGVsTGltaXQsIEluZmluaXR5KTtcblxuICAgIC8qKlxuICAgICAqIEEgcXVldWUgb2YgdGFza3MgZm9yIHRoZSB3b3JrZXIgZnVuY3Rpb24gdG8gY29tcGxldGUuXG4gICAgICogQHR5cGVkZWYge09iamVjdH0gcXVldWVcbiAgICAgKiBAcHJvcGVydHkge0Z1bmN0aW9ufSBsZW5ndGggLSBhIGZ1bmN0aW9uIHJldHVybmluZyB0aGUgbnVtYmVyIG9mIGl0ZW1zXG4gICAgICogd2FpdGluZyB0byBiZSBwcm9jZXNzZWQuIEludm9rZSB3aXRoICgpLlxuICAgICAqIEBwcm9wZXJ0eSB7RnVuY3Rpb259IHN0YXJ0ZWQgLSBhIGZ1bmN0aW9uIHJldHVybmluZyB3aGV0aGVyIG9yIG5vdCBhbnlcbiAgICAgKiBpdGVtcyBoYXZlIGJlZW4gcHVzaGVkIGFuZCBwcm9jZXNzZWQgYnkgdGhlIHF1ZXVlLiBJbnZva2Ugd2l0aCAoKS5cbiAgICAgKiBAcHJvcGVydHkge0Z1bmN0aW9ufSBydW5uaW5nIC0gYSBmdW5jdGlvbiByZXR1cm5pbmcgdGhlIG51bWJlciBvZiBpdGVtc1xuICAgICAqIGN1cnJlbnRseSBiZWluZyBwcm9jZXNzZWQuIEludm9rZSB3aXRoICgpLlxuICAgICAqIEBwcm9wZXJ0eSB7RnVuY3Rpb259IHdvcmtlcnNMaXN0IC0gYSBmdW5jdGlvbiByZXR1cm5pbmcgdGhlIGFycmF5IG9mIGl0ZW1zXG4gICAgICogY3VycmVudGx5IGJlaW5nIHByb2Nlc3NlZC4gSW52b2tlIHdpdGggKCkuXG4gICAgICogQHByb3BlcnR5IHtGdW5jdGlvbn0gaWRsZSAtIGEgZnVuY3Rpb24gcmV0dXJuaW5nIGZhbHNlIGlmIHRoZXJlIGFyZSBpdGVtc1xuICAgICAqIHdhaXRpbmcgb3IgYmVpbmcgcHJvY2Vzc2VkLCBvciB0cnVlIGlmIG5vdC4gSW52b2tlIHdpdGggKCkuXG4gICAgICogQHByb3BlcnR5IHtudW1iZXJ9IGNvbmN1cnJlbmN5IC0gYW4gaW50ZWdlciBmb3IgZGV0ZXJtaW5pbmcgaG93IG1hbnkgYHdvcmtlcmBcbiAgICAgKiBmdW5jdGlvbnMgc2hvdWxkIGJlIHJ1biBpbiBwYXJhbGxlbC4gVGhpcyBwcm9wZXJ0eSBjYW4gYmUgY2hhbmdlZCBhZnRlciBhXG4gICAgICogYHF1ZXVlYCBpcyBjcmVhdGVkIHRvIGFsdGVyIHRoZSBjb25jdXJyZW5jeSBvbi10aGUtZmx5LlxuICAgICAqIEBwcm9wZXJ0eSB7RnVuY3Rpb259IHB1c2ggLSBhZGQgYSBuZXcgdGFzayB0byB0aGUgYHF1ZXVlYC4gQ2FsbHMgYGNhbGxiYWNrYFxuICAgICAqIG9uY2UgdGhlIGB3b3JrZXJgIGhhcyBmaW5pc2hlZCBwcm9jZXNzaW5nIHRoZSB0YXNrLiBJbnN0ZWFkIG9mIGEgc2luZ2xlIHRhc2ssXG4gICAgICogYSBgdGFza3NgIGFycmF5IGNhbiBiZSBzdWJtaXR0ZWQuIFRoZSByZXNwZWN0aXZlIGNhbGxiYWNrIGlzIHVzZWQgZm9yIGV2ZXJ5XG4gICAgICogdGFzayBpbiB0aGUgbGlzdC4gSW52b2tlIHdpdGggKHRhc2ssIFtjYWxsYmFja10pLFxuICAgICAqIEBwcm9wZXJ0eSB7RnVuY3Rpb259IHVuc2hpZnQgLSBhZGQgYSBuZXcgdGFzayB0byB0aGUgZnJvbnQgb2YgdGhlIGBxdWV1ZWAuXG4gICAgICogSW52b2tlIHdpdGggKHRhc2ssIFtjYWxsYmFja10pLlxuICAgICAqIEBwcm9wZXJ0eSB7RnVuY3Rpb259IHNhdHVyYXRlZCAtIGEgY2FsbGJhY2sgdGhhdCBpcyBjYWxsZWQgd2hlbiB0aGUgbnVtYmVyIG9mXG4gICAgICogcnVubmluZyB3b3JrZXJzIGhpdHMgdGhlIGBjb25jdXJyZW5jeWAgbGltaXQsIGFuZCBmdXJ0aGVyIHRhc2tzIHdpbGwgYmVcbiAgICAgKiBxdWV1ZWQuXG4gICAgICogQHByb3BlcnR5IHtGdW5jdGlvbn0gdW5zYXR1cmF0ZWQgLSBhIGNhbGxiYWNrIHRoYXQgaXMgY2FsbGVkIHdoZW4gdGhlIG51bWJlclxuICAgICAqIG9mIHJ1bm5pbmcgd29ya2VycyBpcyBsZXNzIHRoYW4gdGhlIGBjb25jdXJyZW5jeWAgJiBgYnVmZmVyYCBsaW1pdHMsIGFuZFxuICAgICAqIGZ1cnRoZXIgdGFza3Mgd2lsbCBub3QgYmUgcXVldWVkLlxuICAgICAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBidWZmZXIgLSBBIG1pbmltdW0gdGhyZXNob2xkIGJ1ZmZlciBpbiBvcmRlciB0byBzYXkgdGhhdFxuICAgICAqIHRoZSBgcXVldWVgIGlzIGB1bnNhdHVyYXRlZGAuXG4gICAgICogQHByb3BlcnR5IHtGdW5jdGlvbn0gZW1wdHkgLSBhIGNhbGxiYWNrIHRoYXQgaXMgY2FsbGVkIHdoZW4gdGhlIGxhc3QgaXRlbVxuICAgICAqIGZyb20gdGhlIGBxdWV1ZWAgaXMgZ2l2ZW4gdG8gYSBgd29ya2VyYC5cbiAgICAgKiBAcHJvcGVydHkge0Z1bmN0aW9ufSBkcmFpbiAtIGEgY2FsbGJhY2sgdGhhdCBpcyBjYWxsZWQgd2hlbiB0aGUgbGFzdCBpdGVtXG4gICAgICogZnJvbSB0aGUgYHF1ZXVlYCBoYXMgcmV0dXJuZWQgZnJvbSB0aGUgYHdvcmtlcmAuXG4gICAgICogQHByb3BlcnR5IHtGdW5jdGlvbn0gZXJyb3IgLSBhIGNhbGxiYWNrIHRoYXQgaXMgY2FsbGVkIHdoZW4gYSB0YXNrIGVycm9ycy5cbiAgICAgKiBIYXMgdGhlIHNpZ25hdHVyZSBgZnVuY3Rpb24oZXJyb3IsIHRhc2spYC5cbiAgICAgKiBAcHJvcGVydHkge2Jvb2xlYW59IHBhdXNlZCAtIGEgYm9vbGVhbiBmb3IgZGV0ZXJtaW5pbmcgd2hldGhlciB0aGUgcXVldWUgaXNcbiAgICAgKiBpbiBhIHBhdXNlZCBzdGF0ZS5cbiAgICAgKiBAcHJvcGVydHkge0Z1bmN0aW9ufSBwYXVzZSAtIGEgZnVuY3Rpb24gdGhhdCBwYXVzZXMgdGhlIHByb2Nlc3Npbmcgb2YgdGFza3NcbiAgICAgKiB1bnRpbCBgcmVzdW1lKClgIGlzIGNhbGxlZC4gSW52b2tlIHdpdGggKCkuXG4gICAgICogQHByb3BlcnR5IHtGdW5jdGlvbn0gcmVzdW1lIC0gYSBmdW5jdGlvbiB0aGF0IHJlc3VtZXMgdGhlIHByb2Nlc3Npbmcgb2ZcbiAgICAgKiBxdWV1ZWQgdGFza3Mgd2hlbiB0aGUgcXVldWUgaXMgcGF1c2VkLiBJbnZva2Ugd2l0aCAoKS5cbiAgICAgKiBAcHJvcGVydHkge0Z1bmN0aW9ufSBraWxsIC0gYSBmdW5jdGlvbiB0aGF0IHJlbW92ZXMgdGhlIGBkcmFpbmAgY2FsbGJhY2sgYW5kXG4gICAgICogZW1wdGllcyByZW1haW5pbmcgdGFza3MgZnJvbSB0aGUgcXVldWUgZm9yY2luZyBpdCB0byBnbyBpZGxlLiBJbnZva2Ugd2l0aCAoKS5cbiAgICAgKi9cblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBgcXVldWVgIG9iamVjdCB3aXRoIHRoZSBzcGVjaWZpZWQgYGNvbmN1cnJlbmN5YC4gVGFza3MgYWRkZWQgdG8gdGhlXG4gICAgICogYHF1ZXVlYCBhcmUgcHJvY2Vzc2VkIGluIHBhcmFsbGVsICh1cCB0byB0aGUgYGNvbmN1cnJlbmN5YCBsaW1pdCkuIElmIGFsbFxuICAgICAqIGB3b3JrZXJgcyBhcmUgaW4gcHJvZ3Jlc3MsIHRoZSB0YXNrIGlzIHF1ZXVlZCB1bnRpbCBvbmUgYmVjb21lcyBhdmFpbGFibGUuXG4gICAgICogT25jZSBhIGB3b3JrZXJgIGNvbXBsZXRlcyBhIGB0YXNrYCwgdGhhdCBgdGFza2AncyBjYWxsYmFjayBpcyBjYWxsZWQuXG4gICAgICpcbiAgICAgKiBAbmFtZSBxdWV1ZVxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAbWVtYmVyT2YgYXN5bmNcbiAgICAgKiBAY2F0ZWdvcnkgQ29udHJvbCBGbG93XG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gd29ya2VyIC0gQW4gYXN5bmNocm9ub3VzIGZ1bmN0aW9uIGZvciBwcm9jZXNzaW5nIGEgcXVldWVkXG4gICAgICogdGFzaywgd2hpY2ggbXVzdCBjYWxsIGl0cyBgY2FsbGJhY2soZXJyKWAgYXJndW1lbnQgd2hlbiBmaW5pc2hlZCwgd2l0aCBhblxuICAgICAqIG9wdGlvbmFsIGBlcnJvcmAgYXMgYW4gYXJndW1lbnQuICBJZiB5b3Ugd2FudCB0byBoYW5kbGUgZXJyb3JzIGZyb20gYW5cbiAgICAgKiBpbmRpdmlkdWFsIHRhc2ssIHBhc3MgYSBjYWxsYmFjayB0byBgcS5wdXNoKClgLiBJbnZva2VkIHdpdGhcbiAgICAgKiAodGFzaywgY2FsbGJhY2spLlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbY29uY3VycmVuY3k9MV0gLSBBbiBgaW50ZWdlcmAgZm9yIGRldGVybWluaW5nIGhvdyBtYW55XG4gICAgICogYHdvcmtlcmAgZnVuY3Rpb25zIHNob3VsZCBiZSBydW4gaW4gcGFyYWxsZWwuICBJZiBvbWl0dGVkLCB0aGUgY29uY3VycmVuY3lcbiAgICAgKiBkZWZhdWx0cyB0byBgMWAuICBJZiB0aGUgY29uY3VycmVuY3kgaXMgYDBgLCBhbiBlcnJvciBpcyB0aHJvd24uXG4gICAgICogQHJldHVybnMge3F1ZXVlfSBBIHF1ZXVlIG9iamVjdCB0byBtYW5hZ2UgdGhlIHRhc2tzLiBDYWxsYmFja3MgY2FuXG4gICAgICogYXR0YWNoZWQgYXMgY2VydGFpbiBwcm9wZXJ0aWVzIHRvIGxpc3RlbiBmb3Igc3BlY2lmaWMgZXZlbnRzIGR1cmluZyB0aGVcbiAgICAgKiBsaWZlY3ljbGUgb2YgdGhlIHF1ZXVlLlxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiAvLyBjcmVhdGUgYSBxdWV1ZSBvYmplY3Qgd2l0aCBjb25jdXJyZW5jeSAyXG4gICAgICogdmFyIHEgPSBhc3luYy5xdWV1ZShmdW5jdGlvbih0YXNrLCBjYWxsYmFjaykge1xuICAgICAqICAgICBjb25zb2xlLmxvZygnaGVsbG8gJyArIHRhc2submFtZSk7XG4gICAgICogICAgIGNhbGxiYWNrKCk7XG4gICAgICogfSwgMik7XG4gICAgICpcbiAgICAgKiAvLyBhc3NpZ24gYSBjYWxsYmFja1xuICAgICAqIHEuZHJhaW4gPSBmdW5jdGlvbigpIHtcbiAgICAgKiAgICAgY29uc29sZS5sb2coJ2FsbCBpdGVtcyBoYXZlIGJlZW4gcHJvY2Vzc2VkJyk7XG4gICAgICogfTtcbiAgICAgKlxuICAgICAqIC8vIGFkZCBzb21lIGl0ZW1zIHRvIHRoZSBxdWV1ZVxuICAgICAqIHEucHVzaCh7bmFtZTogJ2Zvbyd9LCBmdW5jdGlvbihlcnIpIHtcbiAgICAgKiAgICAgY29uc29sZS5sb2coJ2ZpbmlzaGVkIHByb2Nlc3NpbmcgZm9vJyk7XG4gICAgICogfSk7XG4gICAgICogcS5wdXNoKHtuYW1lOiAnYmFyJ30sIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgKiAgICAgY29uc29sZS5sb2coJ2ZpbmlzaGVkIHByb2Nlc3NpbmcgYmFyJyk7XG4gICAgICogfSk7XG4gICAgICpcbiAgICAgKiAvLyBhZGQgc29tZSBpdGVtcyB0byB0aGUgcXVldWUgKGJhdGNoLXdpc2UpXG4gICAgICogcS5wdXNoKFt7bmFtZTogJ2Jheid9LHtuYW1lOiAnYmF5J30se25hbWU6ICdiYXgnfV0sIGZ1bmN0aW9uKGVycikge1xuICAgICAqICAgICBjb25zb2xlLmxvZygnZmluaXNoZWQgcHJvY2Vzc2luZyBpdGVtJyk7XG4gICAgICogfSk7XG4gICAgICpcbiAgICAgKiAvLyBhZGQgc29tZSBpdGVtcyB0byB0aGUgZnJvbnQgb2YgdGhlIHF1ZXVlXG4gICAgICogcS51bnNoaWZ0KHtuYW1lOiAnYmFyJ30sIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgKiAgICAgY29uc29sZS5sb2coJ2ZpbmlzaGVkIHByb2Nlc3NpbmcgYmFyJyk7XG4gICAgICogfSk7XG4gICAgICovXG4gICAgZnVuY3Rpb24gcXVldWUkMSAod29ya2VyLCBjb25jdXJyZW5jeSkge1xuICAgICAgcmV0dXJuIHF1ZXVlKGZ1bmN0aW9uIChpdGVtcywgY2IpIHtcbiAgICAgICAgd29ya2VyKGl0ZW1zWzBdLCBjYik7XG4gICAgICB9LCBjb25jdXJyZW5jeSwgMSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVGhlIHNhbWUgYXMge0BsaW5rIGFzeW5jLnF1ZXVlfSBvbmx5IHRhc2tzIGFyZSBhc3NpZ25lZCBhIHByaW9yaXR5IGFuZFxuICAgICAqIGNvbXBsZXRlZCBpbiBhc2NlbmRpbmcgcHJpb3JpdHkgb3JkZXIuXG4gICAgICpcbiAgICAgKiBAbmFtZSBwcmlvcml0eVF1ZXVlXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBtZW1iZXJPZiBhc3luY1xuICAgICAqIEBzZWUgYXN5bmMucXVldWVcbiAgICAgKiBAY2F0ZWdvcnkgQ29udHJvbCBGbG93XG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gd29ya2VyIC0gQW4gYXN5bmNocm9ub3VzIGZ1bmN0aW9uIGZvciBwcm9jZXNzaW5nIGEgcXVldWVkXG4gICAgICogdGFzaywgd2hpY2ggbXVzdCBjYWxsIGl0cyBgY2FsbGJhY2soZXJyKWAgYXJndW1lbnQgd2hlbiBmaW5pc2hlZCwgd2l0aCBhblxuICAgICAqIG9wdGlvbmFsIGBlcnJvcmAgYXMgYW4gYXJndW1lbnQuICBJZiB5b3Ugd2FudCB0byBoYW5kbGUgZXJyb3JzIGZyb20gYW5cbiAgICAgKiBpbmRpdmlkdWFsIHRhc2ssIHBhc3MgYSBjYWxsYmFjayB0byBgcS5wdXNoKClgLiBJbnZva2VkIHdpdGhcbiAgICAgKiAodGFzaywgY2FsbGJhY2spLlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBjb25jdXJyZW5jeSAtIEFuIGBpbnRlZ2VyYCBmb3IgZGV0ZXJtaW5pbmcgaG93IG1hbnkgYHdvcmtlcmBcbiAgICAgKiBmdW5jdGlvbnMgc2hvdWxkIGJlIHJ1biBpbiBwYXJhbGxlbC4gIElmIG9taXR0ZWQsIHRoZSBjb25jdXJyZW5jeSBkZWZhdWx0cyB0b1xuICAgICAqIGAxYC4gIElmIHRoZSBjb25jdXJyZW5jeSBpcyBgMGAsIGFuIGVycm9yIGlzIHRocm93bi5cbiAgICAgKiBAcmV0dXJucyB7cXVldWV9IEEgcHJpb3JpdHlRdWV1ZSBvYmplY3QgdG8gbWFuYWdlIHRoZSB0YXNrcy4gVGhlcmUgYXJlIHR3b1xuICAgICAqIGRpZmZlcmVuY2VzIGJldHdlZW4gYHF1ZXVlYCBhbmQgYHByaW9yaXR5UXVldWVgIG9iamVjdHM6XG4gICAgICogKiBgcHVzaCh0YXNrLCBwcmlvcml0eSwgW2NhbGxiYWNrXSlgIC0gYHByaW9yaXR5YCBzaG91bGQgYmUgYSBudW1iZXIuIElmIGFuXG4gICAgICogICBhcnJheSBvZiBgdGFza3NgIGlzIGdpdmVuLCBhbGwgdGFza3Mgd2lsbCBiZSBhc3NpZ25lZCB0aGUgc2FtZSBwcmlvcml0eS5cbiAgICAgKiAqIFRoZSBgdW5zaGlmdGAgbWV0aG9kIHdhcyByZW1vdmVkLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIHByaW9yaXR5UXVldWUgKHdvcmtlciwgY29uY3VycmVuY3kpIHtcbiAgICAgICAgZnVuY3Rpb24gX2NvbXBhcmVUYXNrcyhhLCBiKSB7XG4gICAgICAgICAgICByZXR1cm4gYS5wcmlvcml0eSAtIGIucHJpb3JpdHk7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBfYmluYXJ5U2VhcmNoKHNlcXVlbmNlLCBpdGVtLCBjb21wYXJlKSB7XG4gICAgICAgICAgICB2YXIgYmVnID0gLTEsXG4gICAgICAgICAgICAgICAgZW5kID0gc2VxdWVuY2UubGVuZ3RoIC0gMTtcbiAgICAgICAgICAgIHdoaWxlIChiZWcgPCBlbmQpIHtcbiAgICAgICAgICAgICAgICB2YXIgbWlkID0gYmVnICsgKGVuZCAtIGJlZyArIDEgPj4+IDEpO1xuICAgICAgICAgICAgICAgIGlmIChjb21wYXJlKGl0ZW0sIHNlcXVlbmNlW21pZF0pID49IDApIHtcbiAgICAgICAgICAgICAgICAgICAgYmVnID0gbWlkO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGVuZCA9IG1pZCAtIDE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGJlZztcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIF9pbnNlcnQocSwgZGF0YSwgcHJpb3JpdHksIGNhbGxiYWNrKSB7XG4gICAgICAgICAgICBpZiAoY2FsbGJhY2sgIT0gbnVsbCAmJiB0eXBlb2YgY2FsbGJhY2sgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3Rhc2sgY2FsbGJhY2sgbXVzdCBiZSBhIGZ1bmN0aW9uJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBxLnN0YXJ0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgaWYgKCFpc0FycmF5KGRhdGEpKSB7XG4gICAgICAgICAgICAgICAgZGF0YSA9IFtkYXRhXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChkYXRhLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIC8vIGNhbGwgZHJhaW4gaW1tZWRpYXRlbHkgaWYgdGhlcmUgYXJlIG5vIHRhc2tzXG4gICAgICAgICAgICAgICAgcmV0dXJuIHNldEltbWVkaWF0ZSQxKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgcS5kcmFpbigpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYXJyYXlFYWNoKGRhdGEsIGZ1bmN0aW9uICh0YXNrKSB7XG4gICAgICAgICAgICAgICAgdmFyIGl0ZW0gPSB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IHRhc2ssXG4gICAgICAgICAgICAgICAgICAgIHByaW9yaXR5OiBwcmlvcml0eSxcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2s6IHR5cGVvZiBjYWxsYmFjayA9PT0gJ2Z1bmN0aW9uJyA/IGNhbGxiYWNrIDogbm9vcFxuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICBxLnRhc2tzLnNwbGljZShfYmluYXJ5U2VhcmNoKHEudGFza3MsIGl0ZW0sIF9jb21wYXJlVGFza3MpICsgMSwgMCwgaXRlbSk7XG5cbiAgICAgICAgICAgICAgICBzZXRJbW1lZGlhdGUkMShxLnByb2Nlc3MpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBTdGFydCB3aXRoIGEgbm9ybWFsIHF1ZXVlXG4gICAgICAgIHZhciBxID0gcXVldWUkMSh3b3JrZXIsIGNvbmN1cnJlbmN5KTtcblxuICAgICAgICAvLyBPdmVycmlkZSBwdXNoIHRvIGFjY2VwdCBzZWNvbmQgcGFyYW1ldGVyIHJlcHJlc2VudGluZyBwcmlvcml0eVxuICAgICAgICBxLnB1c2ggPSBmdW5jdGlvbiAoZGF0YSwgcHJpb3JpdHksIGNhbGxiYWNrKSB7XG4gICAgICAgICAgICBfaW5zZXJ0KHEsIGRhdGEsIHByaW9yaXR5LCBjYWxsYmFjayk7XG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gUmVtb3ZlIHVuc2hpZnQgZnVuY3Rpb25cbiAgICAgICAgZGVsZXRlIHEudW5zaGlmdDtcblxuICAgICAgICByZXR1cm4gcTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgYGJhc2VFYWNoYCBvciBgYmFzZUVhY2hSaWdodGAgZnVuY3Rpb24uXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGVhY2hGdW5jIFRoZSBmdW5jdGlvbiB0byBpdGVyYXRlIG92ZXIgYSBjb2xsZWN0aW9uLlxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gW2Zyb21SaWdodF0gU3BlY2lmeSBpdGVyYXRpbmcgZnJvbSByaWdodCB0byBsZWZ0LlxuICAgICAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGJhc2UgZnVuY3Rpb24uXG4gICAgICovXG4gICAgZnVuY3Rpb24gY3JlYXRlQmFzZUVhY2goZWFjaEZ1bmMsIGZyb21SaWdodCkge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uKGNvbGxlY3Rpb24sIGl0ZXJhdGVlKSB7XG4gICAgICAgIGlmIChjb2xsZWN0aW9uID09IG51bGwpIHtcbiAgICAgICAgICByZXR1cm4gY29sbGVjdGlvbjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWlzQXJyYXlMaWtlKGNvbGxlY3Rpb24pKSB7XG4gICAgICAgICAgcmV0dXJuIGVhY2hGdW5jKGNvbGxlY3Rpb24sIGl0ZXJhdGVlKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgbGVuZ3RoID0gY29sbGVjdGlvbi5sZW5ndGgsXG4gICAgICAgICAgICBpbmRleCA9IGZyb21SaWdodCA/IGxlbmd0aCA6IC0xLFxuICAgICAgICAgICAgaXRlcmFibGUgPSBPYmplY3QoY29sbGVjdGlvbik7XG5cbiAgICAgICAgd2hpbGUgKChmcm9tUmlnaHQgPyBpbmRleC0tIDogKytpbmRleCA8IGxlbmd0aCkpIHtcbiAgICAgICAgICBpZiAoaXRlcmF0ZWUoaXRlcmFibGVbaW5kZXhdLCBpbmRleCwgaXRlcmFibGUpID09PSBmYWxzZSkge1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjb2xsZWN0aW9uO1xuICAgICAgfTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5mb3JFYWNoYCB3aXRob3V0IHN1cHBvcnQgZm9yIGl0ZXJhdGVlIHNob3J0aGFuZHMuXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBwYXJhbSB7QXJyYXl8T2JqZWN0fSBjb2xsZWN0aW9uIFRoZSBjb2xsZWN0aW9uIHRvIGl0ZXJhdGUgb3Zlci5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBpdGVyYXRlZSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICAgICAqIEByZXR1cm5zIHtBcnJheXxPYmplY3R9IFJldHVybnMgYGNvbGxlY3Rpb25gLlxuICAgICAqL1xuICAgIHZhciBiYXNlRWFjaCA9IGNyZWF0ZUJhc2VFYWNoKGJhc2VGb3JPd24pO1xuXG4gICAgLyoqXG4gICAgICogSXRlcmF0ZXMgb3ZlciBlbGVtZW50cyBvZiBgY29sbGVjdGlvbmAgYW5kIGludm9rZXMgYGl0ZXJhdGVlYCBmb3IgZWFjaCBlbGVtZW50LlxuICAgICAqIFRoZSBpdGVyYXRlZSBpcyBpbnZva2VkIHdpdGggdGhyZWUgYXJndW1lbnRzOiAodmFsdWUsIGluZGV4fGtleSwgY29sbGVjdGlvbikuXG4gICAgICogSXRlcmF0ZWUgZnVuY3Rpb25zIG1heSBleGl0IGl0ZXJhdGlvbiBlYXJseSBieSBleHBsaWNpdGx5IHJldHVybmluZyBgZmFsc2VgLlxuICAgICAqXG4gICAgICogKipOb3RlOioqIEFzIHdpdGggb3RoZXIgXCJDb2xsZWN0aW9uc1wiIG1ldGhvZHMsIG9iamVjdHMgd2l0aCBhIFwibGVuZ3RoXCJcbiAgICAgKiBwcm9wZXJ0eSBhcmUgaXRlcmF0ZWQgbGlrZSBhcnJheXMuIFRvIGF2b2lkIHRoaXMgYmVoYXZpb3IgdXNlIGBfLmZvckluYFxuICAgICAqIG9yIGBfLmZvck93bmAgZm9yIG9iamVjdCBpdGVyYXRpb24uXG4gICAgICpcbiAgICAgKiBAc3RhdGljXG4gICAgICogQG1lbWJlck9mIF9cbiAgICAgKiBAc2luY2UgMC4xLjBcbiAgICAgKiBAYWxpYXMgZWFjaFxuICAgICAqIEBjYXRlZ29yeSBDb2xsZWN0aW9uXG4gICAgICogQHBhcmFtIHtBcnJheXxPYmplY3R9IGNvbGxlY3Rpb24gVGhlIGNvbGxlY3Rpb24gdG8gaXRlcmF0ZSBvdmVyLlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IFtpdGVyYXRlZT1fLmlkZW50aXR5XSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICAgICAqIEByZXR1cm5zIHtBcnJheXxPYmplY3R9IFJldHVybnMgYGNvbGxlY3Rpb25gLlxuICAgICAqIEBzZWUgXy5mb3JFYWNoUmlnaHRcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogXyhbMSwgMl0pLmZvckVhY2goZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgKiAgIGNvbnNvbGUubG9nKHZhbHVlKTtcbiAgICAgKiB9KTtcbiAgICAgKiAvLyA9PiBMb2dzIGAxYCB0aGVuIGAyYC5cbiAgICAgKlxuICAgICAqIF8uZm9yRWFjaCh7ICdhJzogMSwgJ2InOiAyIH0sIGZ1bmN0aW9uKHZhbHVlLCBrZXkpIHtcbiAgICAgKiAgIGNvbnNvbGUubG9nKGtleSk7XG4gICAgICogfSk7XG4gICAgICogLy8gPT4gTG9ncyAnYScgdGhlbiAnYicgKGl0ZXJhdGlvbiBvcmRlciBpcyBub3QgZ3VhcmFudGVlZCkuXG4gICAgICovXG4gICAgZnVuY3Rpb24gZm9yRWFjaChjb2xsZWN0aW9uLCBpdGVyYXRlZSkge1xuICAgICAgdmFyIGZ1bmMgPSBpc0FycmF5KGNvbGxlY3Rpb24pID8gYXJyYXlFYWNoIDogYmFzZUVhY2g7XG4gICAgICByZXR1cm4gZnVuYyhjb2xsZWN0aW9uLCBiYXNlSXRlcmF0ZWUoaXRlcmF0ZWUsIDMpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSdW5zIHRoZSBgdGFza3NgIGFycmF5IG9mIGZ1bmN0aW9ucyBpbiBwYXJhbGxlbCwgd2l0aG91dCB3YWl0aW5nIHVudGlsIHRoZVxuICAgICAqIHByZXZpb3VzIGZ1bmN0aW9uIGhhcyBjb21wbGV0ZWQuIE9uY2UgYW55IHRoZSBgdGFza3NgIGNvbXBsZXRlZCBvciBwYXNzIGFuXG4gICAgICogZXJyb3IgdG8gaXRzIGNhbGxiYWNrLCB0aGUgbWFpbiBgY2FsbGJhY2tgIGlzIGltbWVkaWF0ZWx5IGNhbGxlZC4gSXQnc1xuICAgICAqIGVxdWl2YWxlbnQgdG8gYFByb21pc2UucmFjZSgpYC5cbiAgICAgKlxuICAgICAqIEBuYW1lIHJhY2VcbiAgICAgKiBAc3RhdGljXG4gICAgICogQG1lbWJlck9mIGFzeW5jXG4gICAgICogQGNhdGVnb3J5IENvbnRyb2wgRmxvd1xuICAgICAqIEBwYXJhbSB7QXJyYXl9IHRhc2tzIC0gQW4gYXJyYXkgY29udGFpbmluZyBmdW5jdGlvbnMgdG8gcnVuLiBFYWNoIGZ1bmN0aW9uXG4gICAgICogaXMgcGFzc2VkIGEgYGNhbGxiYWNrKGVyciwgcmVzdWx0KWAgd2hpY2ggaXQgbXVzdCBjYWxsIG9uIGNvbXBsZXRpb24gd2l0aCBhblxuICAgICAqIGVycm9yIGBlcnJgICh3aGljaCBjYW4gYmUgYG51bGxgKSBhbmQgYW4gb3B0aW9uYWwgYHJlc3VsdGAgdmFsdWUuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgLSBBIGNhbGxiYWNrIHRvIHJ1biBvbmNlIGFueSBvZiB0aGUgZnVuY3Rpb25zIGhhdmVcbiAgICAgKiBjb21wbGV0ZWQuIFRoaXMgZnVuY3Rpb24gZ2V0cyBhbiBlcnJvciBvciByZXN1bHQgZnJvbSB0aGUgZmlyc3QgZnVuY3Rpb24gdGhhdFxuICAgICAqIGNvbXBsZXRlZC4gSW52b2tlZCB3aXRoIChlcnIsIHJlc3VsdCkuXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqIGFzeW5jLnJhY2UoW1xuICAgICAqICAgICBmdW5jdGlvbihjYWxsYmFjaykge1xuICAgICAqICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgKiAgICAgICAgICAgICBjYWxsYmFjayhudWxsLCAnb25lJyk7XG4gICAgICogICAgICAgICB9LCAyMDApO1xuICAgICAqICAgICB9LFxuICAgICAqICAgICBmdW5jdGlvbihjYWxsYmFjaykge1xuICAgICAqICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgKiAgICAgICAgICAgICBjYWxsYmFjayhudWxsLCAndHdvJyk7XG4gICAgICogICAgICAgICB9LCAxMDApO1xuICAgICAqICAgICB9XG4gICAgICogXSxcbiAgICAgKiAvLyBtYWluIGNhbGxiYWNrXG4gICAgICogZnVuY3Rpb24oZXJyLCByZXN1bHQpIHtcbiAgICAgKiAgICAgLy8gdGhlIHJlc3VsdCB3aWxsIGJlIGVxdWFsIHRvICd0d28nIGFzIGl0IGZpbmlzaGVzIGVhcmxpZXJcbiAgICAgKiB9KTtcbiAgICAgKi9cbiAgICBmdW5jdGlvbiByYWNlKHRhc2tzLCBjYikge1xuICAgICAgICBjYiA9IG9uY2UoY2IgfHwgbm9vcCk7XG4gICAgICAgIGlmICghaXNBcnJheSh0YXNrcykpIHJldHVybiBjYihuZXcgVHlwZUVycm9yKCdGaXJzdCBhcmd1bWVudCB0byByYWNlIG11c3QgYmUgYW4gYXJyYXkgb2YgZnVuY3Rpb25zJykpO1xuICAgICAgICBpZiAoIXRhc2tzLmxlbmd0aCkgcmV0dXJuIGNiKCk7XG4gICAgICAgIGZvckVhY2godGFza3MsIGZ1bmN0aW9uICh0YXNrKSB7XG4gICAgICAgICAgICB0YXNrKGNiKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgdmFyIHNsaWNlID0gQXJyYXkucHJvdG90eXBlLnNsaWNlO1xuXG4gICAgLyoqXG4gICAgICogU2FtZSBhcyBgcmVkdWNlYCwgb25seSBvcGVyYXRlcyBvbiBgY29sbGAgaW4gcmV2ZXJzZSBvcmRlci5cbiAgICAgKlxuICAgICAqIEBuYW1lIHJlZHVjZVJpZ2h0XG4gICAgICogQHN0YXRpY1xuICAgICAqIEBtZW1iZXJPZiBhc3luY1xuICAgICAqIEBzZWUgYXN5bmMucmVkdWNlXG4gICAgICogQGFsaWFzIGZvbGRyXG4gICAgICogQGNhdGVnb3J5IENvbGxlY3Rpb25cbiAgICAgKiBAcGFyYW0ge0FycmF5fE9iamVjdH0gY29sbCAtIEEgY29sbGVjdGlvbiB0byBpdGVyYXRlIG92ZXIuXG4gICAgICogQHBhcmFtIHsqfSBtZW1vIC0gVGhlIGluaXRpYWwgc3RhdGUgb2YgdGhlIHJlZHVjdGlvbi5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBpdGVyYXRlZSAtIEEgZnVuY3Rpb24gYXBwbGllZCB0byBlYWNoIGl0ZW0gaW4gdGhlXG4gICAgICogYXJyYXkgdG8gcHJvZHVjZSB0aGUgbmV4dCBzdGVwIGluIHRoZSByZWR1Y3Rpb24uIFRoZSBgaXRlcmF0ZWVgIGlzIHBhc3NlZCBhXG4gICAgICogYGNhbGxiYWNrKGVyciwgcmVkdWN0aW9uKWAgd2hpY2ggYWNjZXB0cyBhbiBvcHRpb25hbCBlcnJvciBhcyBpdHMgZmlyc3RcbiAgICAgKiBhcmd1bWVudCwgYW5kIHRoZSBzdGF0ZSBvZiB0aGUgcmVkdWN0aW9uIGFzIHRoZSBzZWNvbmQuIElmIGFuIGVycm9yIGlzXG4gICAgICogcGFzc2VkIHRvIHRoZSBjYWxsYmFjaywgdGhlIHJlZHVjdGlvbiBpcyBzdG9wcGVkIGFuZCB0aGUgbWFpbiBgY2FsbGJhY2tgIGlzXG4gICAgICogaW1tZWRpYXRlbHkgY2FsbGVkIHdpdGggdGhlIGVycm9yLiBJbnZva2VkIHdpdGggKG1lbW8sIGl0ZW0sIGNhbGxiYWNrKS5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY2FsbGJhY2tdIC0gQSBjYWxsYmFjayB3aGljaCBpcyBjYWxsZWQgYWZ0ZXIgYWxsIHRoZVxuICAgICAqIGBpdGVyYXRlZWAgZnVuY3Rpb25zIGhhdmUgZmluaXNoZWQuIFJlc3VsdCBpcyB0aGUgcmVkdWNlZCB2YWx1ZS4gSW52b2tlZCB3aXRoXG4gICAgICogKGVyciwgcmVzdWx0KS5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiByZWR1Y2VSaWdodChhcnIsIG1lbW8sIGl0ZXJhdGVlLCBjYikge1xuICAgICAgdmFyIHJldmVyc2VkID0gc2xpY2UuY2FsbChhcnIpLnJldmVyc2UoKTtcbiAgICAgIHJlZHVjZShyZXZlcnNlZCwgbWVtbywgaXRlcmF0ZWUsIGNiKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBXcmFwcyB0aGUgZnVuY3Rpb24gaW4gYW5vdGhlciBmdW5jdGlvbiB0aGF0IGFsd2F5cyByZXR1cm5zIGRhdGEgZXZlbiB3aGVuIGl0XG4gICAgICogZXJyb3JzLlxuICAgICAqXG4gICAgICogVGhlIG9iamVjdCByZXR1cm5lZCBoYXMgZWl0aGVyIHRoZSBwcm9wZXJ0eSBgZXJyb3JgIG9yIGB2YWx1ZWAuXG4gICAgICpcbiAgICAgKiBAbmFtZSByZWZsZWN0XG4gICAgICogQHN0YXRpY1xuICAgICAqIEBtZW1iZXJPZiBhc3luY1xuICAgICAqIEBjYXRlZ29yeSBVdGlsXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuY3Rpb24gLSBUaGUgZnVuY3Rpb24geW91IHdhbnQgdG8gd3JhcFxuICAgICAqIEByZXR1cm5zIHtGdW5jdGlvbn0gLSBBIGZ1bmN0aW9uIHRoYXQgYWx3YXlzIHBhc3NlcyBudWxsIHRvIGl0J3MgY2FsbGJhY2sgYXNcbiAgICAgKiB0aGUgZXJyb3IuIFRoZSBzZWNvbmQgYXJndW1lbnQgdG8gdGhlIGNhbGxiYWNrIHdpbGwgYmUgYW4gYG9iamVjdGAgd2l0aFxuICAgICAqIGVpdGhlciBhbiBgZXJyb3JgIG9yIGEgYHZhbHVlYCBwcm9wZXJ0eS5cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogYXN5bmMucGFyYWxsZWwoW1xuICAgICAqICAgICBhc3luYy5yZWZsZWN0KGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gICAgICogICAgICAgICAvLyBkbyBzb21lIHN0dWZmIC4uLlxuICAgICAqICAgICAgICAgY2FsbGJhY2sobnVsbCwgJ29uZScpO1xuICAgICAqICAgICB9KSxcbiAgICAgKiAgICAgYXN5bmMucmVmbGVjdChmdW5jdGlvbihjYWxsYmFjaykge1xuICAgICAqICAgICAgICAgLy8gZG8gc29tZSBtb3JlIHN0dWZmIGJ1dCBlcnJvciAuLi5cbiAgICAgKiAgICAgICAgIGNhbGxiYWNrKCdiYWQgc3R1ZmYgaGFwcGVuZWQnKTtcbiAgICAgKiAgICAgfSksXG4gICAgICogICAgIGFzeW5jLnJlZmxlY3QoZnVuY3Rpb24oY2FsbGJhY2spIHtcbiAgICAgKiAgICAgICAgIC8vIGRvIHNvbWUgbW9yZSBzdHVmZiAuLi5cbiAgICAgKiAgICAgICAgIGNhbGxiYWNrKG51bGwsICd0d28nKTtcbiAgICAgKiAgICAgfSlcbiAgICAgKiBdLFxuICAgICAqIC8vIG9wdGlvbmFsIGNhbGxiYWNrXG4gICAgICogZnVuY3Rpb24oZXJyLCByZXN1bHRzKSB7XG4gICAgICogICAgIC8vIHZhbHVlc1xuICAgICAqICAgICAvLyByZXN1bHRzWzBdLnZhbHVlID0gJ29uZSdcbiAgICAgKiAgICAgLy8gcmVzdWx0c1sxXS5lcnJvciA9ICdiYWQgc3R1ZmYgaGFwcGVuZWQnXG4gICAgICogICAgIC8vIHJlc3VsdHNbMl0udmFsdWUgPSAndHdvJ1xuICAgICAqIH0pO1xuICAgICAqL1xuICAgIGZ1bmN0aW9uIHJlZmxlY3QoZm4pIHtcbiAgICAgICAgcmV0dXJuIGluaXRpYWxQYXJhbXMoZnVuY3Rpb24gcmVmbGVjdE9uKGFyZ3MsIHJlZmxlY3RDYWxsYmFjaykge1xuICAgICAgICAgICAgYXJncy5wdXNoKHJlc3QoZnVuY3Rpb24gY2FsbGJhY2soZXJyLCBjYkFyZ3MpIHtcbiAgICAgICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlZmxlY3RDYWxsYmFjayhudWxsLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlcnJvcjogZXJyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciB2YWx1ZSA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjYkFyZ3MubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IGNiQXJnc1swXTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChjYkFyZ3MubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSBjYkFyZ3M7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmVmbGVjdENhbGxiYWNrKG51bGwsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiB2YWx1ZVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KSk7XG5cbiAgICAgICAgICAgIHJldHVybiBmbi5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVqZWN0JDEoZWFjaGZuLCBhcnIsIGl0ZXJhdGVlLCBjYWxsYmFjaykge1xuICAgICAgICBfZmlsdGVyKGVhY2hmbiwgYXJyLCBmdW5jdGlvbiAodmFsdWUsIGNiKSB7XG4gICAgICAgICAgICBpdGVyYXRlZSh2YWx1ZSwgZnVuY3Rpb24gKGVyciwgdikge1xuICAgICAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgY2IoZXJyKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjYihudWxsLCAhdik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sIGNhbGxiYWNrKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUaGUgc2FtZSBhcyBgcmVqZWN0YCBidXQgcnVucyBhIG1heGltdW0gb2YgYGxpbWl0YCBhc3luYyBvcGVyYXRpb25zIGF0IGFcbiAgICAgKiB0aW1lLlxuICAgICAqXG4gICAgICogQG5hbWUgcmVqZWN0TGltaXRcbiAgICAgKiBAc3RhdGljXG4gICAgICogQG1lbWJlck9mIGFzeW5jXG4gICAgICogQHNlZSBhc3luYy5yZWplY3RcbiAgICAgKiBAY2F0ZWdvcnkgQ29sbGVjdGlvblxuICAgICAqIEBwYXJhbSB7QXJyYXl8T2JqZWN0fSBjb2xsIC0gQSBjb2xsZWN0aW9uIHRvIGl0ZXJhdGUgb3Zlci5cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gbGltaXQgLSBUaGUgbWF4aW11bSBudW1iZXIgb2YgYXN5bmMgb3BlcmF0aW9ucyBhdCBhIHRpbWUuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gaXRlcmF0ZWUgLSBBIHRydXRoIHRlc3QgdG8gYXBwbHkgdG8gZWFjaCBpdGVtIGluIGBjb2xsYC5cbiAgICAgKiBUaGUgYGl0ZXJhdGVlYCBpcyBwYXNzZWQgYSBgY2FsbGJhY2soZXJyLCB0cnV0aFZhbHVlKWAsIHdoaWNoIG11c3QgYmUgY2FsbGVkXG4gICAgICogd2l0aCBhIGJvb2xlYW4gYXJndW1lbnQgb25jZSBpdCBoYXMgY29tcGxldGVkLiBJbnZva2VkIHdpdGggKGl0ZW0sIGNhbGxiYWNrKS5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY2FsbGJhY2tdIC0gQSBjYWxsYmFjayB3aGljaCBpcyBjYWxsZWQgYWZ0ZXIgYWxsIHRoZVxuICAgICAqIGBpdGVyYXRlZWAgZnVuY3Rpb25zIGhhdmUgZmluaXNoZWQuIEludm9rZWQgd2l0aCAoZXJyLCByZXN1bHRzKS5cbiAgICAgKi9cbiAgICB2YXIgcmVqZWN0TGltaXQgPSBkb1BhcmFsbGVsTGltaXQocmVqZWN0JDEpO1xuXG4gICAgLyoqXG4gICAgICogVGhlIG9wcG9zaXRlIG9mIGBmaWx0ZXJgLiBSZW1vdmVzIHZhbHVlcyB0aGF0IHBhc3MgYW4gYGFzeW5jYCB0cnV0aCB0ZXN0LlxuICAgICAqXG4gICAgICogQG5hbWUgcmVqZWN0XG4gICAgICogQHN0YXRpY1xuICAgICAqIEBtZW1iZXJPZiBhc3luY1xuICAgICAqIEBzZWUgYXN5bmMuZmlsdGVyXG4gICAgICogQGNhdGVnb3J5IENvbGxlY3Rpb25cbiAgICAgKiBAcGFyYW0ge0FycmF5fE9iamVjdH0gY29sbCAtIEEgY29sbGVjdGlvbiB0byBpdGVyYXRlIG92ZXIuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gaXRlcmF0ZWUgLSBBIHRydXRoIHRlc3QgdG8gYXBwbHkgdG8gZWFjaCBpdGVtIGluIGBjb2xsYC5cbiAgICAgKiBUaGUgYGl0ZXJhdGVlYCBpcyBwYXNzZWQgYSBgY2FsbGJhY2soZXJyLCB0cnV0aFZhbHVlKWAsIHdoaWNoIG11c3QgYmUgY2FsbGVkXG4gICAgICogd2l0aCBhIGJvb2xlYW4gYXJndW1lbnQgb25jZSBpdCBoYXMgY29tcGxldGVkLiBJbnZva2VkIHdpdGggKGl0ZW0sIGNhbGxiYWNrKS5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY2FsbGJhY2tdIC0gQSBjYWxsYmFjayB3aGljaCBpcyBjYWxsZWQgYWZ0ZXIgYWxsIHRoZVxuICAgICAqIGBpdGVyYXRlZWAgZnVuY3Rpb25zIGhhdmUgZmluaXNoZWQuIEludm9rZWQgd2l0aCAoZXJyLCByZXN1bHRzKS5cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogYXN5bmMucmVqZWN0KFsnZmlsZTEnLCdmaWxlMicsJ2ZpbGUzJ10sIGZ1bmN0aW9uKGZpbGVQYXRoLCBjYWxsYmFjaykge1xuICAgICAqICAgICBmcy5hY2Nlc3MoZmlsZVBhdGgsIGZ1bmN0aW9uKGVycikge1xuICAgICAqICAgICAgICAgY2FsbGJhY2sobnVsbCwgIWVycilcbiAgICAgKiAgICAgfSk7XG4gICAgICogfSwgZnVuY3Rpb24oZXJyLCByZXN1bHRzKSB7XG4gICAgICogICAgIC8vIHJlc3VsdHMgbm93IGVxdWFscyBhbiBhcnJheSBvZiBtaXNzaW5nIGZpbGVzXG4gICAgICogICAgIGNyZWF0ZUZpbGVzKHJlc3VsdHMpO1xuICAgICAqIH0pO1xuICAgICAqL1xuICAgIHZhciByZWplY3QgPSBkb0xpbWl0KHJlamVjdExpbWl0LCBJbmZpbml0eSk7XG5cbiAgICAvKipcbiAgICAgKiBBIGhlbHBlciBmdW5jdGlvbiB0aGF0IHdyYXBzIGFuIGFycmF5IG9mIGZ1bmN0aW9ucyB3aXRoIHJlZmxlY3QuXG4gICAgICpcbiAgICAgKiBAbmFtZSByZWZsZWN0QWxsXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBtZW1iZXJPZiBhc3luY1xuICAgICAqIEBzZWUgYXN5bmMucmVmbGVjdFxuICAgICAqIEBjYXRlZ29yeSBVdGlsXG4gICAgICogQHBhcmFtIHtBcnJheX0gdGFza3MgLSBUaGUgYXJyYXkgb2YgZnVuY3Rpb25zIHRvIHdyYXAgaW4gYGFzeW5jLnJlZmxlY3RgLlxuICAgICAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyBhbiBhcnJheSBvZiBmdW5jdGlvbnMsIGVhY2ggZnVuY3Rpb24gd3JhcHBlZCBpblxuICAgICAqIGBhc3luYy5yZWZsZWN0YFxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiBsZXQgdGFza3MgPSBbXG4gICAgICogICAgIGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gICAgICogICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAqICAgICAgICAgICAgIGNhbGxiYWNrKG51bGwsICdvbmUnKTtcbiAgICAgKiAgICAgICAgIH0sIDIwMCk7XG4gICAgICogICAgIH0sXG4gICAgICogICAgIGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gICAgICogICAgICAgICAvLyBkbyBzb21lIG1vcmUgc3R1ZmYgYnV0IGVycm9yIC4uLlxuICAgICAqICAgICAgICAgY2FsbGJhY2sobmV3IEVycm9yKCdiYWQgc3R1ZmYgaGFwcGVuZWQnKSk7XG4gICAgICogICAgIH0sXG4gICAgICogICAgIGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gICAgICogICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAqICAgICAgICAgICAgIGNhbGxiYWNrKG51bGwsICd0d28nKTtcbiAgICAgKiAgICAgICAgIH0sIDEwMCk7XG4gICAgICogICAgIH1cbiAgICAgKiBdO1xuICAgICAqXG4gICAgICogYXN5bmMucGFyYWxsZWwoYXN5bmMucmVmbGVjdEFsbCh0YXNrcyksXG4gICAgICogLy8gb3B0aW9uYWwgY2FsbGJhY2tcbiAgICAgKiBmdW5jdGlvbihlcnIsIHJlc3VsdHMpIHtcbiAgICAgKiAgICAgLy8gdmFsdWVzXG4gICAgICogICAgIC8vIHJlc3VsdHNbMF0udmFsdWUgPSAnb25lJ1xuICAgICAqICAgICAvLyByZXN1bHRzWzFdLmVycm9yID0gRXJyb3IoJ2JhZCBzdHVmZiBoYXBwZW5lZCcpXG4gICAgICogICAgIC8vIHJlc3VsdHNbMl0udmFsdWUgPSAndHdvJ1xuICAgICAqIH0pO1xuICAgICAqL1xuICAgIGZ1bmN0aW9uIHJlZmxlY3RBbGwodGFza3MpIHtcbiAgICAgIHJldHVybiB0YXNrcy5tYXAocmVmbGVjdCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVGhlIHNhbWUgYXMgYHJlamVjdGAgYnV0IHJ1bnMgb25seSBhIHNpbmdsZSBhc3luYyBvcGVyYXRpb24gYXQgYSB0aW1lLlxuICAgICAqXG4gICAgICogQG5hbWUgcmVqZWN0U2VyaWVzXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBtZW1iZXJPZiBhc3luY1xuICAgICAqIEBzZWUgYXN5bmMucmVqZWN0XG4gICAgICogQGNhdGVnb3J5IENvbGxlY3Rpb25cbiAgICAgKiBAcGFyYW0ge0FycmF5fE9iamVjdH0gY29sbCAtIEEgY29sbGVjdGlvbiB0byBpdGVyYXRlIG92ZXIuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gaXRlcmF0ZWUgLSBBIHRydXRoIHRlc3QgdG8gYXBwbHkgdG8gZWFjaCBpdGVtIGluIGBjb2xsYC5cbiAgICAgKiBUaGUgYGl0ZXJhdGVlYCBpcyBwYXNzZWQgYSBgY2FsbGJhY2soZXJyLCB0cnV0aFZhbHVlKWAsIHdoaWNoIG11c3QgYmUgY2FsbGVkXG4gICAgICogd2l0aCBhIGJvb2xlYW4gYXJndW1lbnQgb25jZSBpdCBoYXMgY29tcGxldGVkLiBJbnZva2VkIHdpdGggKGl0ZW0sIGNhbGxiYWNrKS5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY2FsbGJhY2tdIC0gQSBjYWxsYmFjayB3aGljaCBpcyBjYWxsZWQgYWZ0ZXIgYWxsIHRoZVxuICAgICAqIGBpdGVyYXRlZWAgZnVuY3Rpb25zIGhhdmUgZmluaXNoZWQuIEludm9rZWQgd2l0aCAoZXJyLCByZXN1bHRzKS5cbiAgICAgKi9cbiAgICB2YXIgcmVqZWN0U2VyaWVzID0gZG9MaW1pdChyZWplY3RMaW1pdCwgMSk7XG5cbiAgICAvKipcbiAgICAgKiBSdW4gdGhlIGZ1bmN0aW9ucyBpbiB0aGUgYHRhc2tzYCBjb2xsZWN0aW9uIGluIHNlcmllcywgZWFjaCBvbmUgcnVubmluZyBvbmNlXG4gICAgICogdGhlIHByZXZpb3VzIGZ1bmN0aW9uIGhhcyBjb21wbGV0ZWQuIElmIGFueSBmdW5jdGlvbnMgaW4gdGhlIHNlcmllcyBwYXNzIGFuXG4gICAgICogZXJyb3IgdG8gaXRzIGNhbGxiYWNrLCBubyBtb3JlIGZ1bmN0aW9ucyBhcmUgcnVuLCBhbmQgYGNhbGxiYWNrYCBpc1xuICAgICAqIGltbWVkaWF0ZWx5IGNhbGxlZCB3aXRoIHRoZSB2YWx1ZSBvZiB0aGUgZXJyb3IuIE90aGVyd2lzZSwgYGNhbGxiYWNrYFxuICAgICAqIHJlY2VpdmVzIGFuIGFycmF5IG9mIHJlc3VsdHMgd2hlbiBgdGFza3NgIGhhdmUgY29tcGxldGVkLlxuICAgICAqXG4gICAgICogSXQgaXMgYWxzbyBwb3NzaWJsZSB0byB1c2UgYW4gb2JqZWN0IGluc3RlYWQgb2YgYW4gYXJyYXkuIEVhY2ggcHJvcGVydHkgd2lsbFxuICAgICAqIGJlIHJ1biBhcyBhIGZ1bmN0aW9uLCBhbmQgdGhlIHJlc3VsdHMgd2lsbCBiZSBwYXNzZWQgdG8gdGhlIGZpbmFsIGBjYWxsYmFja2BcbiAgICAgKiBhcyBhbiBvYmplY3QgaW5zdGVhZCBvZiBhbiBhcnJheS4gVGhpcyBjYW4gYmUgYSBtb3JlIHJlYWRhYmxlIHdheSBvZiBoYW5kbGluZ1xuICAgICAqICByZXN1bHRzIGZyb20ge0BsaW5rIGFzeW5jLnNlcmllc30uXG4gICAgICpcbiAgICAgKiAqKk5vdGUqKiB0aGF0IHdoaWxlIG1hbnkgaW1wbGVtZW50YXRpb25zIHByZXNlcnZlIHRoZSBvcmRlciBvZiBvYmplY3RcbiAgICAgKiBwcm9wZXJ0aWVzLCB0aGUgW0VDTUFTY3JpcHQgTGFuZ3VhZ2UgU3BlY2lmaWNhdGlvbl0oaHR0cDovL3d3dy5lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzUuMS8jc2VjLTguNilcbiAgICAgKiBleHBsaWNpdGx5IHN0YXRlcyB0aGF0XG4gICAgICpcbiAgICAgKiA+IFRoZSBtZWNoYW5pY3MgYW5kIG9yZGVyIG9mIGVudW1lcmF0aW5nIHRoZSBwcm9wZXJ0aWVzIGlzIG5vdCBzcGVjaWZpZWQuXG4gICAgICpcbiAgICAgKiBTbyBpZiB5b3UgcmVseSBvbiB0aGUgb3JkZXIgaW4gd2hpY2ggeW91ciBzZXJpZXMgb2YgZnVuY3Rpb25zIGFyZSBleGVjdXRlZCxcbiAgICAgKiBhbmQgd2FudCB0aGlzIHRvIHdvcmsgb24gYWxsIHBsYXRmb3JtcywgY29uc2lkZXIgdXNpbmcgYW4gYXJyYXkuXG4gICAgICpcbiAgICAgKiBAbmFtZSBzZXJpZXNcbiAgICAgKiBAc3RhdGljXG4gICAgICogQG1lbWJlck9mIGFzeW5jXG4gICAgICogQGNhdGVnb3J5IENvbnRyb2wgRmxvd1xuICAgICAqIEBwYXJhbSB7QXJyYXl8T2JqZWN0fSB0YXNrcyAtIEEgY29sbGVjdGlvbiBjb250YWluaW5nIGZ1bmN0aW9ucyB0byBydW4sIGVhY2hcbiAgICAgKiBmdW5jdGlvbiBpcyBwYXNzZWQgYSBgY2FsbGJhY2soZXJyLCByZXN1bHQpYCBpdCBtdXN0IGNhbGwgb24gY29tcGxldGlvbiB3aXRoXG4gICAgICogYW4gZXJyb3IgYGVycmAgKHdoaWNoIGNhbiBiZSBgbnVsbGApIGFuZCBhbiBvcHRpb25hbCBgcmVzdWx0YCB2YWx1ZS5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY2FsbGJhY2tdIC0gQW4gb3B0aW9uYWwgY2FsbGJhY2sgdG8gcnVuIG9uY2UgYWxsIHRoZVxuICAgICAqIGZ1bmN0aW9ucyBoYXZlIGNvbXBsZXRlZC4gVGhpcyBmdW5jdGlvbiBnZXRzIGEgcmVzdWx0cyBhcnJheSAob3Igb2JqZWN0KVxuICAgICAqIGNvbnRhaW5pbmcgYWxsIHRoZSByZXN1bHQgYXJndW1lbnRzIHBhc3NlZCB0byB0aGUgYHRhc2tgIGNhbGxiYWNrcy4gSW52b2tlZFxuICAgICAqIHdpdGggKGVyciwgcmVzdWx0KS5cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIGFzeW5jLnNlcmllcyhbXG4gICAgICogICAgIGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gICAgICogICAgICAgICAvLyBkbyBzb21lIHN0dWZmIC4uLlxuICAgICAqICAgICAgICAgY2FsbGJhY2sobnVsbCwgJ29uZScpO1xuICAgICAqICAgICB9LFxuICAgICAqICAgICBmdW5jdGlvbihjYWxsYmFjaykge1xuICAgICAqICAgICAgICAgLy8gZG8gc29tZSBtb3JlIHN0dWZmIC4uLlxuICAgICAqICAgICAgICAgY2FsbGJhY2sobnVsbCwgJ3R3bycpO1xuICAgICAqICAgICB9XG4gICAgICogXSxcbiAgICAgKiAvLyBvcHRpb25hbCBjYWxsYmFja1xuICAgICAqIGZ1bmN0aW9uKGVyciwgcmVzdWx0cykge1xuICAgICAqICAgICAvLyByZXN1bHRzIGlzIG5vdyBlcXVhbCB0byBbJ29uZScsICd0d28nXVxuICAgICAqIH0pO1xuICAgICAqXG4gICAgICogYXN5bmMuc2VyaWVzKHtcbiAgICAgKiAgICAgb25lOiBmdW5jdGlvbihjYWxsYmFjaykge1xuICAgICAqICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgKiAgICAgICAgICAgICBjYWxsYmFjayhudWxsLCAxKTtcbiAgICAgKiAgICAgICAgIH0sIDIwMCk7XG4gICAgICogICAgIH0sXG4gICAgICogICAgIHR3bzogZnVuY3Rpb24oY2FsbGJhY2spe1xuICAgICAqICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgKiAgICAgICAgICAgICBjYWxsYmFjayhudWxsLCAyKTtcbiAgICAgKiAgICAgICAgIH0sIDEwMCk7XG4gICAgICogICAgIH1cbiAgICAgKiB9LCBmdW5jdGlvbihlcnIsIHJlc3VsdHMpIHtcbiAgICAgKiAgICAgLy8gcmVzdWx0cyBpcyBub3cgZXF1YWwgdG86IHtvbmU6IDEsIHR3bzogMn1cbiAgICAgKiB9KTtcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBzZXJpZXModGFza3MsIGNiKSB7XG4gICAgICByZXR1cm4gX3BhcmFsbGVsKGVhY2hPZlNlcmllcywgdGFza3MsIGNiKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgZnVuY3Rpb24gdGhhdCByZXR1cm5zIGB2YWx1ZWAuXG4gICAgICpcbiAgICAgKiBAc3RhdGljXG4gICAgICogQG1lbWJlck9mIF9cbiAgICAgKiBAc2luY2UgMi40LjBcbiAgICAgKiBAY2F0ZWdvcnkgVXRpbFxuICAgICAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHJldHVybiBmcm9tIHRoZSBuZXcgZnVuY3Rpb24uXG4gICAgICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgY29uc3RhbnQgZnVuY3Rpb24uXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqIHZhciBvYmplY3RzID0gXy50aW1lcygyLCBfLmNvbnN0YW50KHsgJ2EnOiAxIH0pKTtcbiAgICAgKlxuICAgICAqIGNvbnNvbGUubG9nKG9iamVjdHMpO1xuICAgICAqIC8vID0+IFt7ICdhJzogMSB9LCB7ICdhJzogMSB9XVxuICAgICAqXG4gICAgICogY29uc29sZS5sb2cob2JqZWN0c1swXSA9PT0gb2JqZWN0c1sxXSk7XG4gICAgICogLy8gPT4gdHJ1ZVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGNvbnN0YW50JDEodmFsdWUpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgfTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBdHRlbXB0cyB0byBnZXQgYSBzdWNjZXNzZnVsIHJlc3BvbnNlIGZyb20gYHRhc2tgIG5vIG1vcmUgdGhhbiBgdGltZXNgIHRpbWVzXG4gICAgICogYmVmb3JlIHJldHVybmluZyBhbiBlcnJvci4gSWYgdGhlIHRhc2sgaXMgc3VjY2Vzc2Z1bCwgdGhlIGBjYWxsYmFja2Agd2lsbCBiZVxuICAgICAqIHBhc3NlZCB0aGUgcmVzdWx0IG9mIHRoZSBzdWNjZXNzZnVsIHRhc2suIElmIGFsbCBhdHRlbXB0cyBmYWlsLCB0aGUgY2FsbGJhY2tcbiAgICAgKiB3aWxsIGJlIHBhc3NlZCB0aGUgZXJyb3IgYW5kIHJlc3VsdCAoaWYgYW55KSBvZiB0aGUgZmluYWwgYXR0ZW1wdC5cbiAgICAgKlxuICAgICAqIEBuYW1lIHJldHJ5XG4gICAgICogQHN0YXRpY1xuICAgICAqIEBtZW1iZXJPZiBhc3luY1xuICAgICAqIEBjYXRlZ29yeSBDb250cm9sIEZsb3dcbiAgICAgKiBAcGFyYW0ge09iamVjdHxudW1iZXJ9IFtvcHRzID0ge3RpbWVzOiA1LCBpbnRlcnZhbDogMH18IDVdIC0gQ2FuIGJlIGVpdGhlciBhblxuICAgICAqIG9iamVjdCB3aXRoIGB0aW1lc2AgYW5kIGBpbnRlcnZhbGAgb3IgYSBudW1iZXIuXG4gICAgICogKiBgdGltZXNgIC0gVGhlIG51bWJlciBvZiBhdHRlbXB0cyB0byBtYWtlIGJlZm9yZSBnaXZpbmcgdXAuICBUaGUgZGVmYXVsdFxuICAgICAqICAgaXMgYDVgLlxuICAgICAqICogYGludGVydmFsYCAtIFRoZSB0aW1lIHRvIHdhaXQgYmV0d2VlbiByZXRyaWVzLCBpbiBtaWxsaXNlY29uZHMuICBUaGVcbiAgICAgKiAgIGRlZmF1bHQgaXMgYDBgLiBUaGUgaW50ZXJ2YWwgbWF5IGFsc28gYmUgc3BlY2lmaWVkIGFzIGEgZnVuY3Rpb24gb2YgdGhlXG4gICAgICogICByZXRyeSBjb3VudCAoc2VlIGV4YW1wbGUpLlxuICAgICAqICogSWYgYG9wdHNgIGlzIGEgbnVtYmVyLCB0aGUgbnVtYmVyIHNwZWNpZmllcyB0aGUgbnVtYmVyIG9mIHRpbWVzIHRvIHJldHJ5LFxuICAgICAqICAgd2l0aCB0aGUgZGVmYXVsdCBpbnRlcnZhbCBvZiBgMGAuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gdGFzayAtIEEgZnVuY3Rpb24gd2hpY2ggcmVjZWl2ZXMgdHdvIGFyZ3VtZW50czogKDEpIGFcbiAgICAgKiBgY2FsbGJhY2soZXJyLCByZXN1bHQpYCB3aGljaCBtdXN0IGJlIGNhbGxlZCB3aGVuIGZpbmlzaGVkLCBwYXNzaW5nIGBlcnJgXG4gICAgICogKHdoaWNoIGNhbiBiZSBgbnVsbGApIGFuZCB0aGUgYHJlc3VsdGAgb2YgdGhlIGZ1bmN0aW9uJ3MgZXhlY3V0aW9uLCBhbmQgKDIpXG4gICAgICogYSBgcmVzdWx0c2Agb2JqZWN0LCBjb250YWluaW5nIHRoZSByZXN1bHRzIG9mIHRoZSBwcmV2aW91c2x5IGV4ZWN1dGVkXG4gICAgICogZnVuY3Rpb25zIChpZiBuZXN0ZWQgaW5zaWRlIGFub3RoZXIgY29udHJvbCBmbG93KS4gSW52b2tlZCB3aXRoXG4gICAgICogKGNhbGxiYWNrLCByZXN1bHRzKS5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY2FsbGJhY2tdIC0gQW4gb3B0aW9uYWwgY2FsbGJhY2sgd2hpY2ggaXMgY2FsbGVkIHdoZW4gdGhlXG4gICAgICogdGFzayBoYXMgc3VjY2VlZGVkLCBvciBhZnRlciB0aGUgZmluYWwgZmFpbGVkIGF0dGVtcHQuIEl0IHJlY2VpdmVzIHRoZSBgZXJyYFxuICAgICAqIGFuZCBgcmVzdWx0YCBhcmd1bWVudHMgb2YgdGhlIGxhc3QgYXR0ZW1wdCBhdCBjb21wbGV0aW5nIHRoZSBgdGFza2AuIEludm9rZWRcbiAgICAgKiB3aXRoIChlcnIsIHJlc3VsdHMpLlxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiAvLyBUaGUgYHJldHJ5YCBmdW5jdGlvbiBjYW4gYmUgdXNlZCBhcyBhIHN0YW5kLWFsb25lIGNvbnRyb2wgZmxvdyBieSBwYXNzaW5nXG4gICAgICogLy8gYSBjYWxsYmFjaywgYXMgc2hvd24gYmVsb3c6XG4gICAgICpcbiAgICAgKiAvLyB0cnkgY2FsbGluZyBhcGlNZXRob2QgMyB0aW1lc1xuICAgICAqIGFzeW5jLnJldHJ5KDMsIGFwaU1ldGhvZCwgZnVuY3Rpb24oZXJyLCByZXN1bHQpIHtcbiAgICAgKiAgICAgLy8gZG8gc29tZXRoaW5nIHdpdGggdGhlIHJlc3VsdFxuICAgICAqIH0pO1xuICAgICAqXG4gICAgICogLy8gdHJ5IGNhbGxpbmcgYXBpTWV0aG9kIDMgdGltZXMsIHdhaXRpbmcgMjAwIG1zIGJldHdlZW4gZWFjaCByZXRyeVxuICAgICAqIGFzeW5jLnJldHJ5KHt0aW1lczogMywgaW50ZXJ2YWw6IDIwMH0sIGFwaU1ldGhvZCwgZnVuY3Rpb24oZXJyLCByZXN1bHQpIHtcbiAgICAgKiAgICAgLy8gZG8gc29tZXRoaW5nIHdpdGggdGhlIHJlc3VsdFxuICAgICAqIH0pO1xuICAgICAqXG4gICAgICogLy8gdHJ5IGNhbGxpbmcgYXBpTWV0aG9kIDEwIHRpbWVzIHdpdGggZXhwb25lbnRpYWwgYmFja29mZlxuICAgICAqIC8vIChpLmUuIGludGVydmFscyBvZiAxMDAsIDIwMCwgNDAwLCA4MDAsIDE2MDAsIC4uLiBtaWxsaXNlY29uZHMpXG4gICAgICogYXN5bmMucmV0cnkoe1xuICAgICAqICAgdGltZXM6IDEwLFxuICAgICAqICAgaW50ZXJ2YWw6IGZ1bmN0aW9uKHJldHJ5Q291bnQpIHtcbiAgICAgKiAgICAgcmV0dXJuIDUwICogTWF0aC5wb3coMiwgcmV0cnlDb3VudCk7XG4gICAgICogICB9XG4gICAgICogfSwgYXBpTWV0aG9kLCBmdW5jdGlvbihlcnIsIHJlc3VsdCkge1xuICAgICAqICAgICAvLyBkbyBzb21ldGhpbmcgd2l0aCB0aGUgcmVzdWx0XG4gICAgICogfSk7XG4gICAgICpcbiAgICAgKiAvLyB0cnkgY2FsbGluZyBhcGlNZXRob2QgdGhlIGRlZmF1bHQgNSB0aW1lcyBubyBkZWxheSBiZXR3ZWVuIGVhY2ggcmV0cnlcbiAgICAgKiBhc3luYy5yZXRyeShhcGlNZXRob2QsIGZ1bmN0aW9uKGVyciwgcmVzdWx0KSB7XG4gICAgICogICAgIC8vIGRvIHNvbWV0aGluZyB3aXRoIHRoZSByZXN1bHRcbiAgICAgKiB9KTtcbiAgICAgKlxuICAgICAqIC8vIEl0IGNhbiBhbHNvIGJlIGVtYmVkZGVkIHdpdGhpbiBvdGhlciBjb250cm9sIGZsb3cgZnVuY3Rpb25zIHRvIHJldHJ5XG4gICAgICogLy8gaW5kaXZpZHVhbCBtZXRob2RzIHRoYXQgYXJlIG5vdCBhcyByZWxpYWJsZSwgbGlrZSB0aGlzOlxuICAgICAqIGFzeW5jLmF1dG8oe1xuICAgICAqICAgICB1c2VyczogYXBpLmdldFVzZXJzLmJpbmQoYXBpKSxcbiAgICAgKiAgICAgcGF5bWVudHM6IGFzeW5jLnJldHJ5KDMsIGFwaS5nZXRQYXltZW50cy5iaW5kKGFwaSkpXG4gICAgICogfSwgZnVuY3Rpb24oZXJyLCByZXN1bHRzKSB7XG4gICAgICogICAgIC8vIGRvIHNvbWV0aGluZyB3aXRoIHRoZSByZXN1bHRzXG4gICAgICogfSk7XG4gICAgICovXG4gICAgZnVuY3Rpb24gcmV0cnkodGltZXMsIHRhc2ssIGNhbGxiYWNrKSB7XG4gICAgICAgIHZhciBERUZBVUxUX1RJTUVTID0gNTtcbiAgICAgICAgdmFyIERFRkFVTFRfSU5URVJWQUwgPSAwO1xuXG4gICAgICAgIHZhciBvcHRzID0ge1xuICAgICAgICAgICAgdGltZXM6IERFRkFVTFRfVElNRVMsXG4gICAgICAgICAgICBpbnRlcnZhbEZ1bmM6IGNvbnN0YW50JDEoREVGQVVMVF9JTlRFUlZBTClcbiAgICAgICAgfTtcblxuICAgICAgICBmdW5jdGlvbiBwYXJzZVRpbWVzKGFjYywgdCkge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiB0ID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgICAgIGFjYy50aW1lcyA9ICt0LnRpbWVzIHx8IERFRkFVTFRfVElNRVM7XG5cbiAgICAgICAgICAgICAgICBhY2MuaW50ZXJ2YWxGdW5jID0gdHlwZW9mIHQuaW50ZXJ2YWwgPT09ICdmdW5jdGlvbicgPyB0LmludGVydmFsIDogY29uc3RhbnQkMSgrdC5pbnRlcnZhbCB8fCBERUZBVUxUX0lOVEVSVkFMKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHQgPT09ICdudW1iZXInIHx8IHR5cGVvZiB0ID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgIGFjYy50aW1lcyA9ICt0IHx8IERFRkFVTFRfVElNRVM7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgYXJndW1lbnRzIGZvciBhc3luYy5yZXRyeVwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoIDwgMyAmJiB0eXBlb2YgdGltZXMgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhbGxiYWNrID0gdGFzayB8fCBub29wO1xuICAgICAgICAgICAgdGFzayA9IHRpbWVzO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcGFyc2VUaW1lcyhvcHRzLCB0aW1lcyk7XG4gICAgICAgICAgICBjYWxsYmFjayA9IGNhbGxiYWNrIHx8IG5vb3A7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZW9mIHRhc2sgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgYXJndW1lbnRzIGZvciBhc3luYy5yZXRyeVwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBhdHRlbXB0cyA9IFtdO1xuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IG9wdHMudGltZXMgKyAxOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBpc0ZpbmFsQXR0ZW1wdCA9IGkgPT0gb3B0cy50aW1lcztcbiAgICAgICAgICAgIGF0dGVtcHRzLnB1c2gocmV0cnlBdHRlbXB0KGlzRmluYWxBdHRlbXB0KSk7XG4gICAgICAgICAgICB2YXIgaW50ZXJ2YWwgPSBvcHRzLmludGVydmFsRnVuYyhpKTtcbiAgICAgICAgICAgIGlmICghaXNGaW5hbEF0dGVtcHQgJiYgaW50ZXJ2YWwgPiAwKSB7XG4gICAgICAgICAgICAgICAgYXR0ZW1wdHMucHVzaChyZXRyeUludGVydmFsKGludGVydmFsKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBzZXJpZXMoYXR0ZW1wdHMsIGZ1bmN0aW9uIChkb25lLCBkYXRhKSB7XG4gICAgICAgICAgICBkYXRhID0gZGF0YVtkYXRhLmxlbmd0aCAtIDFdO1xuICAgICAgICAgICAgY2FsbGJhY2soZGF0YS5lcnIsIGRhdGEucmVzdWx0KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZnVuY3Rpb24gcmV0cnlBdHRlbXB0KGlzRmluYWxBdHRlbXB0KSB7XG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHNlcmllc0NhbGxiYWNrKSB7XG4gICAgICAgICAgICAgICAgdGFzayhmdW5jdGlvbiAoZXJyLCByZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VyaWVzQ2FsbGJhY2soIWVyciB8fCBpc0ZpbmFsQXR0ZW1wdCwge1xuICAgICAgICAgICAgICAgICAgICAgICAgZXJyOiBlcnIsXG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQ6IHJlc3VsdFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiByZXRyeUludGVydmFsKGludGVydmFsKSB7XG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHNlcmllc0NhbGxiYWNrKSB7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlcmllc0NhbGxiYWNrKG51bGwpO1xuICAgICAgICAgICAgICAgIH0sIGludGVydmFsKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBIGNsb3NlIHJlbGF0aXZlIG9mIGByZXRyeWAuICBUaGlzIG1ldGhvZCB3cmFwcyBhIHRhc2sgYW5kIG1ha2VzIGl0XG4gICAgICogcmV0cnlhYmxlLCByYXRoZXIgdGhhbiBpbW1lZGlhdGVseSBjYWxsaW5nIGl0IHdpdGggcmV0cmllcy5cbiAgICAgKlxuICAgICAqIEBuYW1lIHJldHJ5YWJsZVxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAbWVtYmVyT2YgYXN5bmNcbiAgICAgKiBAc2VlIGFzeW5jLnJldHJ5XG4gICAgICogQGNhdGVnb3J5IENvbnRyb2wgRmxvd1xuICAgICAqIEBwYXJhbSB7T2JqZWN0fG51bWJlcn0gW29wdHMgPSB7dGltZXM6IDUsIGludGVydmFsOiAwfXwgNV0gLSBvcHRpb25hbFxuICAgICAqIG9wdGlvbnMsIGV4YWN0bHkgdGhlIHNhbWUgYXMgZnJvbSBgcmV0cnlgXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gdGFzayAtIHRoZSBhc3luY2hyb25vdXMgZnVuY3Rpb24gdG8gd3JhcFxuICAgICAqIEByZXR1cm5zIHtGdW5jdGlvbnN9IFRoZSB3cmFwcGVkIGZ1bmN0aW9uLCB3aGljaCB3aGVuIGludm9rZWQsIHdpbGwgcmV0cnkgb25cbiAgICAgKiBhbiBlcnJvciwgYmFzZWQgb24gdGhlIHBhcmFtZXRlcnMgc3BlY2lmaWVkIGluIGBvcHRzYC5cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogYXN5bmMuYXV0byh7XG4gICAgICogICAgIGRlcDE6IGFzeW5jLnJldHJ5YWJsZSgzLCBnZXRGcm9tRmxha3lTZXJ2aWNlKSxcbiAgICAgKiAgICAgcHJvY2VzczogW1wiZGVwMVwiLCBhc3luYy5yZXRyeWFibGUoMywgZnVuY3Rpb24gKHJlc3VsdHMsIGNiKSB7XG4gICAgICogICAgICAgICBtYXliZVByb2Nlc3NEYXRhKHJlc3VsdHMuZGVwMSwgY2IpO1xuICAgICAqICAgICB9KV1cbiAgICAgKiB9LCBjYWxsYmFjayk7XG4gICAgICovXG4gICAgZnVuY3Rpb24gcmV0cnlhYmxlIChvcHRzLCB0YXNrKSB7XG4gICAgICAgIGlmICghdGFzaykge1xuICAgICAgICAgICAgdGFzayA9IG9wdHM7XG4gICAgICAgICAgICBvcHRzID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaW5pdGlhbFBhcmFtcyhmdW5jdGlvbiAoYXJncywgY2FsbGJhY2spIHtcbiAgICAgICAgICAgIGZ1bmN0aW9uIHRhc2tGbihjYikge1xuICAgICAgICAgICAgICAgIHRhc2suYXBwbHkobnVsbCwgYXJncy5jb25jYXQoW2NiXSkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAob3B0cykgcmV0cnkob3B0cywgdGFza0ZuLCBjYWxsYmFjayk7ZWxzZSByZXRyeSh0YXNrRm4sIGNhbGxiYWNrKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVGhlIHNhbWUgYXMgYHNvbWVgIGJ1dCBydW5zIGEgbWF4aW11bSBvZiBgbGltaXRgIGFzeW5jIG9wZXJhdGlvbnMgYXQgYSB0aW1lLlxuICAgICAqXG4gICAgICogQG5hbWUgc29tZUxpbWl0XG4gICAgICogQHN0YXRpY1xuICAgICAqIEBtZW1iZXJPZiBhc3luY1xuICAgICAqIEBzZWUgYXN5bmMuc29tZVxuICAgICAqIEBhbGlhcyBhbnlMaW1pdFxuICAgICAqIEBjYXRlZ29yeSBDb2xsZWN0aW9uXG4gICAgICogQHBhcmFtIHtBcnJheXxPYmplY3R9IGNvbGwgLSBBIGNvbGxlY3Rpb24gdG8gaXRlcmF0ZSBvdmVyLlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBsaW1pdCAtIFRoZSBtYXhpbXVtIG51bWJlciBvZiBhc3luYyBvcGVyYXRpb25zIGF0IGEgdGltZS5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBpdGVyYXRlZSAtIEEgdHJ1dGggdGVzdCB0byBhcHBseSB0byBlYWNoIGl0ZW0gaW4gdGhlIGFycmF5XG4gICAgICogaW4gcGFyYWxsZWwuIFRoZSBpdGVyYXRlZSBpcyBwYXNzZWQgYSBgY2FsbGJhY2soZXJyLCB0cnV0aFZhbHVlKWAgd2hpY2ggbXVzdFxuICAgICAqIGJlIGNhbGxlZCB3aXRoIGEgYm9vbGVhbiBhcmd1bWVudCBvbmNlIGl0IGhhcyBjb21wbGV0ZWQuIEludm9rZWQgd2l0aFxuICAgICAqIChpdGVtLCBjYWxsYmFjaykuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gW2NhbGxiYWNrXSAtIEEgY2FsbGJhY2sgd2hpY2ggaXMgY2FsbGVkIGFzIHNvb24gYXMgYW55XG4gICAgICogaXRlcmF0ZWUgcmV0dXJucyBgdHJ1ZWAsIG9yIGFmdGVyIGFsbCB0aGUgaXRlcmF0ZWUgZnVuY3Rpb25zIGhhdmUgZmluaXNoZWQuXG4gICAgICogUmVzdWx0IHdpbGwgYmUgZWl0aGVyIGB0cnVlYCBvciBgZmFsc2VgIGRlcGVuZGluZyBvbiB0aGUgdmFsdWVzIG9mIHRoZSBhc3luY1xuICAgICAqIHRlc3RzLiBJbnZva2VkIHdpdGggKGVyciwgcmVzdWx0KS5cbiAgICAgKi9cbiAgICB2YXIgc29tZUxpbWl0ID0gX2NyZWF0ZVRlc3RlcihlYWNoT2ZMaW1pdCwgQm9vbGVhbiwgaWRlbnRpdHkpO1xuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBgdHJ1ZWAgaWYgYXQgbGVhc3Qgb25lIGVsZW1lbnQgaW4gdGhlIGBjb2xsYCBzYXRpc2ZpZXMgYW4gYXN5bmMgdGVzdC5cbiAgICAgKiBJZiBhbnkgaXRlcmF0ZWUgY2FsbCByZXR1cm5zIGB0cnVlYCwgdGhlIG1haW4gYGNhbGxiYWNrYCBpcyBpbW1lZGlhdGVseVxuICAgICAqIGNhbGxlZC5cbiAgICAgKlxuICAgICAqIEBuYW1lIHNvbWVcbiAgICAgKiBAc3RhdGljXG4gICAgICogQG1lbWJlck9mIGFzeW5jXG4gICAgICogQGFsaWFzIGFueVxuICAgICAqIEBjYXRlZ29yeSBDb2xsZWN0aW9uXG4gICAgICogQHBhcmFtIHtBcnJheXxPYmplY3R9IGNvbGwgLSBBIGNvbGxlY3Rpb24gdG8gaXRlcmF0ZSBvdmVyLlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGl0ZXJhdGVlIC0gQSB0cnV0aCB0ZXN0IHRvIGFwcGx5IHRvIGVhY2ggaXRlbSBpbiB0aGUgYXJyYXlcbiAgICAgKiBpbiBwYXJhbGxlbC4gVGhlIGl0ZXJhdGVlIGlzIHBhc3NlZCBhIGBjYWxsYmFjayhlcnIsIHRydXRoVmFsdWUpYCB3aGljaCBtdXN0XG4gICAgICogYmUgY2FsbGVkIHdpdGggYSBib29sZWFuIGFyZ3VtZW50IG9uY2UgaXQgaGFzIGNvbXBsZXRlZC4gSW52b2tlZCB3aXRoXG4gICAgICogKGl0ZW0sIGNhbGxiYWNrKS5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY2FsbGJhY2tdIC0gQSBjYWxsYmFjayB3aGljaCBpcyBjYWxsZWQgYXMgc29vbiBhcyBhbnlcbiAgICAgKiBpdGVyYXRlZSByZXR1cm5zIGB0cnVlYCwgb3IgYWZ0ZXIgYWxsIHRoZSBpdGVyYXRlZSBmdW5jdGlvbnMgaGF2ZSBmaW5pc2hlZC5cbiAgICAgKiBSZXN1bHQgd2lsbCBiZSBlaXRoZXIgYHRydWVgIG9yIGBmYWxzZWAgZGVwZW5kaW5nIG9uIHRoZSB2YWx1ZXMgb2YgdGhlIGFzeW5jXG4gICAgICogdGVzdHMuIEludm9rZWQgd2l0aCAoZXJyLCByZXN1bHQpLlxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiBhc3luYy5zb21lKFsnZmlsZTEnLCdmaWxlMicsJ2ZpbGUzJ10sIGZ1bmN0aW9uKGZpbGVQYXRoLCBjYWxsYmFjaykge1xuICAgICAqICAgICBmcy5hY2Nlc3MoZmlsZVBhdGgsIGZ1bmN0aW9uKGVycikge1xuICAgICAqICAgICAgICAgY2FsbGJhY2sobnVsbCwgIWVycilcbiAgICAgKiAgICAgfSk7XG4gICAgICogfSwgZnVuY3Rpb24oZXJyLCByZXN1bHQpIHtcbiAgICAgKiAgICAgLy8gaWYgcmVzdWx0IGlzIHRydWUgdGhlbiBhdCBsZWFzdCBvbmUgb2YgdGhlIGZpbGVzIGV4aXN0c1xuICAgICAqIH0pO1xuICAgICAqL1xuICAgIHZhciBzb21lID0gZG9MaW1pdChzb21lTGltaXQsIEluZmluaXR5KTtcblxuICAgIC8qKlxuICAgICAqIFRoZSBzYW1lIGFzIGBzb21lYCBidXQgcnVucyBvbmx5IGEgc2luZ2xlIGFzeW5jIG9wZXJhdGlvbiBhdCBhIHRpbWUuXG4gICAgICpcbiAgICAgKiBAbmFtZSBzb21lU2VyaWVzXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBtZW1iZXJPZiBhc3luY1xuICAgICAqIEBzZWUgYXN5bmMuc29tZVxuICAgICAqIEBhbGlhcyBhbnlTZXJpZXNcbiAgICAgKiBAY2F0ZWdvcnkgQ29sbGVjdGlvblxuICAgICAqIEBwYXJhbSB7QXJyYXl8T2JqZWN0fSBjb2xsIC0gQSBjb2xsZWN0aW9uIHRvIGl0ZXJhdGUgb3Zlci5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBpdGVyYXRlZSAtIEEgdHJ1dGggdGVzdCB0byBhcHBseSB0byBlYWNoIGl0ZW0gaW4gdGhlIGFycmF5XG4gICAgICogaW4gcGFyYWxsZWwuIFRoZSBpdGVyYXRlZSBpcyBwYXNzZWQgYSBgY2FsbGJhY2soZXJyLCB0cnV0aFZhbHVlKWAgd2hpY2ggbXVzdFxuICAgICAqIGJlIGNhbGxlZCB3aXRoIGEgYm9vbGVhbiBhcmd1bWVudCBvbmNlIGl0IGhhcyBjb21wbGV0ZWQuIEludm9rZWQgd2l0aFxuICAgICAqIChpdGVtLCBjYWxsYmFjaykuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gW2NhbGxiYWNrXSAtIEEgY2FsbGJhY2sgd2hpY2ggaXMgY2FsbGVkIGFzIHNvb24gYXMgYW55XG4gICAgICogaXRlcmF0ZWUgcmV0dXJucyBgdHJ1ZWAsIG9yIGFmdGVyIGFsbCB0aGUgaXRlcmF0ZWUgZnVuY3Rpb25zIGhhdmUgZmluaXNoZWQuXG4gICAgICogUmVzdWx0IHdpbGwgYmUgZWl0aGVyIGB0cnVlYCBvciBgZmFsc2VgIGRlcGVuZGluZyBvbiB0aGUgdmFsdWVzIG9mIHRoZSBhc3luY1xuICAgICAqIHRlc3RzLiBJbnZva2VkIHdpdGggKGVyciwgcmVzdWx0KS5cbiAgICAgKi9cbiAgICB2YXIgc29tZVNlcmllcyA9IGRvTGltaXQoc29tZUxpbWl0LCAxKTtcblxuICAgIC8qKlxuICAgICAqIFNvcnRzIGEgbGlzdCBieSB0aGUgcmVzdWx0cyBvZiBydW5uaW5nIGVhY2ggYGNvbGxgIHZhbHVlIHRocm91Z2ggYW4gYXN5bmNcbiAgICAgKiBgaXRlcmF0ZWVgLlxuICAgICAqXG4gICAgICogQG5hbWUgc29ydEJ5XG4gICAgICogQHN0YXRpY1xuICAgICAqIEBtZW1iZXJPZiBhc3luY1xuICAgICAqIEBjYXRlZ29yeSBDb2xsZWN0aW9uXG4gICAgICogQHBhcmFtIHtBcnJheXxPYmplY3R9IGNvbGwgLSBBIGNvbGxlY3Rpb24gdG8gaXRlcmF0ZSBvdmVyLlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGl0ZXJhdGVlIC0gQSBmdW5jdGlvbiB0byBhcHBseSB0byBlYWNoIGl0ZW0gaW4gYGNvbGxgLlxuICAgICAqIFRoZSBpdGVyYXRlZSBpcyBwYXNzZWQgYSBgY2FsbGJhY2soZXJyLCBzb3J0VmFsdWUpYCB3aGljaCBtdXN0IGJlIGNhbGxlZCBvbmNlXG4gICAgICogaXQgaGFzIGNvbXBsZXRlZCB3aXRoIGFuIGVycm9yICh3aGljaCBjYW4gYmUgYG51bGxgKSBhbmQgYSB2YWx1ZSB0byB1c2UgYXNcbiAgICAgKiB0aGUgc29ydCBjcml0ZXJpYS4gSW52b2tlZCB3aXRoIChpdGVtLCBjYWxsYmFjaykuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gW2NhbGxiYWNrXSAtIEEgY2FsbGJhY2sgd2hpY2ggaXMgY2FsbGVkIGFmdGVyIGFsbCB0aGVcbiAgICAgKiBgaXRlcmF0ZWVgIGZ1bmN0aW9ucyBoYXZlIGZpbmlzaGVkLCBvciBhbiBlcnJvciBvY2N1cnMuIFJlc3VsdHMgaXMgdGhlIGl0ZW1zXG4gICAgICogZnJvbSB0aGUgb3JpZ2luYWwgYGNvbGxgIHNvcnRlZCBieSB0aGUgdmFsdWVzIHJldHVybmVkIGJ5IHRoZSBgaXRlcmF0ZWVgXG4gICAgICogY2FsbHMuIEludm9rZWQgd2l0aCAoZXJyLCByZXN1bHRzKS5cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogYXN5bmMuc29ydEJ5KFsnZmlsZTEnLCdmaWxlMicsJ2ZpbGUzJ10sIGZ1bmN0aW9uKGZpbGUsIGNhbGxiYWNrKSB7XG4gICAgICogICAgIGZzLnN0YXQoZmlsZSwgZnVuY3Rpb24oZXJyLCBzdGF0cykge1xuICAgICAqICAgICAgICAgY2FsbGJhY2soZXJyLCBzdGF0cy5tdGltZSk7XG4gICAgICogICAgIH0pO1xuICAgICAqIH0sIGZ1bmN0aW9uKGVyciwgcmVzdWx0cykge1xuICAgICAqICAgICAvLyByZXN1bHRzIGlzIG5vdyB0aGUgb3JpZ2luYWwgYXJyYXkgb2YgZmlsZXMgc29ydGVkIGJ5XG4gICAgICogICAgIC8vIG1vZGlmaWVkIGRhdGVcbiAgICAgKiB9KTtcbiAgICAgKlxuICAgICAqIC8vIEJ5IG1vZGlmeWluZyB0aGUgY2FsbGJhY2sgcGFyYW1ldGVyIHRoZVxuICAgICAqIC8vIHNvcnRpbmcgb3JkZXIgY2FuIGJlIGluZmx1ZW5jZWQ6XG4gICAgICpcbiAgICAgKiAvLyBhc2NlbmRpbmcgb3JkZXJcbiAgICAgKiBhc3luYy5zb3J0QnkoWzEsOSwzLDVdLCBmdW5jdGlvbih4LCBjYWxsYmFjaykge1xuICAgICAqICAgICBjYWxsYmFjayhudWxsLCB4KTtcbiAgICAgKiB9LCBmdW5jdGlvbihlcnIscmVzdWx0KSB7XG4gICAgICogICAgIC8vIHJlc3VsdCBjYWxsYmFja1xuICAgICAqIH0pO1xuICAgICAqXG4gICAgICogLy8gZGVzY2VuZGluZyBvcmRlclxuICAgICAqIGFzeW5jLnNvcnRCeShbMSw5LDMsNV0sIGZ1bmN0aW9uKHgsIGNhbGxiYWNrKSB7XG4gICAgICogICAgIGNhbGxiYWNrKG51bGwsIHgqLTEpOyAgICAvLzwtIHgqLTEgaW5zdGVhZCBvZiB4LCB0dXJucyB0aGUgb3JkZXIgYXJvdW5kXG4gICAgICogfSwgZnVuY3Rpb24oZXJyLHJlc3VsdCkge1xuICAgICAqICAgICAvLyByZXN1bHQgY2FsbGJhY2tcbiAgICAgKiB9KTtcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBzb3J0QnkoYXJyLCBpdGVyYXRlZSwgY2IpIHtcbiAgICAgICAgbWFwKGFyciwgZnVuY3Rpb24gKHgsIGNiKSB7XG4gICAgICAgICAgICBpdGVyYXRlZSh4LCBmdW5jdGlvbiAoZXJyLCBjcml0ZXJpYSkge1xuICAgICAgICAgICAgICAgIGlmIChlcnIpIHJldHVybiBjYihlcnIpO1xuICAgICAgICAgICAgICAgIGNiKG51bGwsIHsgdmFsdWU6IHgsIGNyaXRlcmlhOiBjcml0ZXJpYSB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LCBmdW5jdGlvbiAoZXJyLCByZXN1bHRzKSB7XG4gICAgICAgICAgICBpZiAoZXJyKSByZXR1cm4gY2IoZXJyKTtcbiAgICAgICAgICAgIGNiKG51bGwsIGFycmF5TWFwKHJlc3VsdHMuc29ydChjb21wYXJhdG9yKSwgYmFzZVByb3BlcnR5KCd2YWx1ZScpKSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGZ1bmN0aW9uIGNvbXBhcmF0b3IobGVmdCwgcmlnaHQpIHtcbiAgICAgICAgICAgIHZhciBhID0gbGVmdC5jcml0ZXJpYSxcbiAgICAgICAgICAgICAgICBiID0gcmlnaHQuY3JpdGVyaWE7XG4gICAgICAgICAgICByZXR1cm4gYSA8IGIgPyAtMSA6IGEgPiBiID8gMSA6IDA7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXRzIGEgdGltZSBsaW1pdCBvbiBhbiBhc3luY2hyb25vdXMgZnVuY3Rpb24uIElmIHRoZSBmdW5jdGlvbiBkb2VzIG5vdCBjYWxsXG4gICAgICogaXRzIGNhbGxiYWNrIHdpdGhpbiB0aGUgc3BlY2lmaWVkIG1pbGlzZWNvbmRzLCBpdCB3aWxsIGJlIGNhbGxlZCB3aXRoIGFcbiAgICAgKiB0aW1lb3V0IGVycm9yLiBUaGUgY29kZSBwcm9wZXJ0eSBmb3IgdGhlIGVycm9yIG9iamVjdCB3aWxsIGJlIGAnRVRJTUVET1VUJ2AuXG4gICAgICpcbiAgICAgKiBAbmFtZSB0aW1lb3V0XG4gICAgICogQHN0YXRpY1xuICAgICAqIEBtZW1iZXJPZiBhc3luY1xuICAgICAqIEBjYXRlZ29yeSBVdGlsXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuY3Rpb24gLSBUaGUgYXN5bmNocm9ub3VzIGZ1bmN0aW9uIHlvdSB3YW50IHRvIHNldCB0aGVcbiAgICAgKiB0aW1lIGxpbWl0LlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBtaWxpc2Vjb25kcyAtIFRoZSBzcGVjaWZpZWQgdGltZSBsaW1pdC5cbiAgICAgKiBAcGFyYW0geyp9IFtpbmZvXSAtIEFueSB2YXJpYWJsZSB5b3Ugd2FudCBhdHRhY2hlZCAoYHN0cmluZ2AsIGBvYmplY3RgLCBldGMpXG4gICAgICogdG8gdGltZW91dCBFcnJvciBmb3IgbW9yZSBpbmZvcm1hdGlvbi4uXG4gICAgICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIGEgd3JhcHBlZCBmdW5jdGlvbiB0aGF0IGNhbiBiZSB1c2VkIHdpdGggYW55IG9mXG4gICAgICogdGhlIGNvbnRyb2wgZmxvdyBmdW5jdGlvbnMuXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqIGFzeW5jLnRpbWVvdXQoZnVuY3Rpb24oY2FsbGJhY2spIHtcbiAgICAgKiAgICAgZG9Bc3luY1Rhc2soY2FsbGJhY2spO1xuICAgICAqIH0sIDEwMDApO1xuICAgICAqL1xuICAgIGZ1bmN0aW9uIHRpbWVvdXQoYXN5bmNGbiwgbWlsaXNlY29uZHMsIGluZm8pIHtcbiAgICAgICAgdmFyIG9yaWdpbmFsQ2FsbGJhY2ssIHRpbWVyO1xuICAgICAgICB2YXIgdGltZWRPdXQgPSBmYWxzZTtcblxuICAgICAgICBmdW5jdGlvbiBpbmplY3RlZENhbGxiYWNrKCkge1xuICAgICAgICAgICAgaWYgKCF0aW1lZE91dCkge1xuICAgICAgICAgICAgICAgIG9yaWdpbmFsQ2FsbGJhY2suYXBwbHkobnVsbCwgYXJndW1lbnRzKTtcbiAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQodGltZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gdGltZW91dENhbGxiYWNrKCkge1xuICAgICAgICAgICAgdmFyIG5hbWUgPSBhc3luY0ZuLm5hbWUgfHwgJ2Fub255bW91cyc7XG4gICAgICAgICAgICB2YXIgZXJyb3IgPSBuZXcgRXJyb3IoJ0NhbGxiYWNrIGZ1bmN0aW9uIFwiJyArIG5hbWUgKyAnXCIgdGltZWQgb3V0LicpO1xuICAgICAgICAgICAgZXJyb3IuY29kZSA9ICdFVElNRURPVVQnO1xuICAgICAgICAgICAgaWYgKGluZm8pIHtcbiAgICAgICAgICAgICAgICBlcnJvci5pbmZvID0gaW5mbztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRpbWVkT3V0ID0gdHJ1ZTtcbiAgICAgICAgICAgIG9yaWdpbmFsQ2FsbGJhY2soZXJyb3IpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGluaXRpYWxQYXJhbXMoZnVuY3Rpb24gKGFyZ3MsIG9yaWdDYWxsYmFjaykge1xuICAgICAgICAgICAgb3JpZ2luYWxDYWxsYmFjayA9IG9yaWdDYWxsYmFjaztcbiAgICAgICAgICAgIC8vIHNldHVwIHRpbWVyIGFuZCBjYWxsIG9yaWdpbmFsIGZ1bmN0aW9uXG4gICAgICAgICAgICB0aW1lciA9IHNldFRpbWVvdXQodGltZW91dENhbGxiYWNrLCBtaWxpc2Vjb25kcyk7XG4gICAgICAgICAgICBhc3luY0ZuLmFwcGx5KG51bGwsIGFyZ3MuY29uY2F0KGluamVjdGVkQ2FsbGJhY2spKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyogQnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMgZm9yIHRob3NlIHdpdGggdGhlIHNhbWUgbmFtZSBhcyBvdGhlciBgbG9kYXNoYCBtZXRob2RzLiAqL1xuICAgIHZhciBuYXRpdmVDZWlsID0gTWF0aC5jZWlsO1xuICAgIHZhciBuYXRpdmVNYXgkMSA9IE1hdGgubWF4O1xuICAgIC8qKlxuICAgICAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLnJhbmdlYCBhbmQgYF8ucmFuZ2VSaWdodGAgd2hpY2ggZG9lc24ndFxuICAgICAqIGNvZXJjZSBhcmd1bWVudHMgdG8gbnVtYmVycy5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHN0YXJ0IFRoZSBzdGFydCBvZiB0aGUgcmFuZ2UuXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGVuZCBUaGUgZW5kIG9mIHRoZSByYW5nZS5cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gc3RlcCBUaGUgdmFsdWUgdG8gaW5jcmVtZW50IG9yIGRlY3JlbWVudCBieS5cbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtmcm9tUmlnaHRdIFNwZWNpZnkgaXRlcmF0aW5nIGZyb20gcmlnaHQgdG8gbGVmdC5cbiAgICAgKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIHJhbmdlIG9mIG51bWJlcnMuXG4gICAgICovXG4gICAgZnVuY3Rpb24gYmFzZVJhbmdlKHN0YXJ0LCBlbmQsIHN0ZXAsIGZyb21SaWdodCkge1xuICAgICAgdmFyIGluZGV4ID0gLTEsXG4gICAgICAgICAgbGVuZ3RoID0gbmF0aXZlTWF4JDEobmF0aXZlQ2VpbCgoZW5kIC0gc3RhcnQpIC8gKHN0ZXAgfHwgMSkpLCAwKSxcbiAgICAgICAgICByZXN1bHQgPSBBcnJheShsZW5ndGgpO1xuXG4gICAgICB3aGlsZSAobGVuZ3RoLS0pIHtcbiAgICAgICAgcmVzdWx0W2Zyb21SaWdodCA/IGxlbmd0aCA6ICsraW5kZXhdID0gc3RhcnQ7XG4gICAgICAgIHN0YXJ0ICs9IHN0ZXA7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICogVGhlIHNhbWUgYXMge0BsaW5rIHRpbWVzfSBidXQgcnVucyBhIG1heGltdW0gb2YgYGxpbWl0YCBhc3luYyBvcGVyYXRpb25zIGF0IGFcbiAgICAqIHRpbWUuXG4gICAgICpcbiAgICAgKiBAbmFtZSB0aW1lc0xpbWl0XG4gICAgICogQHN0YXRpY1xuICAgICAqIEBtZW1iZXJPZiBhc3luY1xuICAgICAqIEBzZWUgYXN5bmMudGltZXNcbiAgICAgKiBAY2F0ZWdvcnkgQ29udHJvbCBGbG93XG4gICAgICogQHBhcmFtIHtudW1iZXJ9IG4gLSBUaGUgbnVtYmVyIG9mIHRpbWVzIHRvIHJ1biB0aGUgZnVuY3Rpb24uXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGxpbWl0IC0gVGhlIG1heGltdW0gbnVtYmVyIG9mIGFzeW5jIG9wZXJhdGlvbnMgYXQgYSB0aW1lLlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGl0ZXJhdGVlIC0gVGhlIGZ1bmN0aW9uIHRvIGNhbGwgYG5gIHRpbWVzLiBJbnZva2VkIHdpdGggdGhlXG4gICAgICogaXRlcmF0aW9uIGluZGV4IGFuZCBhIGNhbGxiYWNrIChuLCBuZXh0KS5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayAtIHNlZSB7QGxpbmsgYXN5bmMubWFwfS5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiB0aW1lTGltaXQoY291bnQsIGxpbWl0LCBpdGVyYXRlZSwgY2IpIHtcbiAgICAgIHJldHVybiBtYXBMaW1pdChiYXNlUmFuZ2UoMCwgY291bnQsIDEpLCBsaW1pdCwgaXRlcmF0ZWUsIGNiKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDYWxscyB0aGUgYGl0ZXJhdGVlYCBmdW5jdGlvbiBgbmAgdGltZXMsIGFuZCBhY2N1bXVsYXRlcyByZXN1bHRzIGluIHRoZSBzYW1lXG4gICAgICogbWFubmVyIHlvdSB3b3VsZCB1c2Ugd2l0aCB7QGxpbmsgYXN5bmMubWFwfS5cbiAgICAgKlxuICAgICAqIEBuYW1lIHRpbWVzXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBtZW1iZXJPZiBhc3luY1xuICAgICAqIEBzZWUgYXN5bmMubWFwXG4gICAgICogQGNhdGVnb3J5IENvbnRyb2wgRmxvd1xuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBuIC0gVGhlIG51bWJlciBvZiB0aW1lcyB0byBydW4gdGhlIGZ1bmN0aW9uLlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGl0ZXJhdGVlIC0gVGhlIGZ1bmN0aW9uIHRvIGNhbGwgYG5gIHRpbWVzLiBJbnZva2VkIHdpdGggdGhlXG4gICAgICogaXRlcmF0aW9uIGluZGV4IGFuZCBhIGNhbGxiYWNrIChuLCBuZXh0KS5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayAtIHNlZSB7QGxpbmsgYXN5bmMubWFwfS5cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogLy8gUHJldGVuZCB0aGlzIGlzIHNvbWUgY29tcGxpY2F0ZWQgYXN5bmMgZmFjdG9yeVxuICAgICAqIHZhciBjcmVhdGVVc2VyID0gZnVuY3Rpb24oaWQsIGNhbGxiYWNrKSB7XG4gICAgICogICAgIGNhbGxiYWNrKG51bGwsIHtcbiAgICAgKiAgICAgICAgIGlkOiAndXNlcicgKyBpZFxuICAgICAqICAgICB9KTtcbiAgICAgKiB9O1xuICAgICAqXG4gICAgICogLy8gZ2VuZXJhdGUgNSB1c2Vyc1xuICAgICAqIGFzeW5jLnRpbWVzKDUsIGZ1bmN0aW9uKG4sIG5leHQpIHtcbiAgICAgKiAgICAgY3JlYXRlVXNlcihuLCBmdW5jdGlvbihlcnIsIHVzZXIpIHtcbiAgICAgKiAgICAgICAgIG5leHQoZXJyLCB1c2VyKTtcbiAgICAgKiAgICAgfSk7XG4gICAgICogfSwgZnVuY3Rpb24oZXJyLCB1c2Vycykge1xuICAgICAqICAgICAvLyB3ZSBzaG91bGQgbm93IGhhdmUgNSB1c2Vyc1xuICAgICAqIH0pO1xuICAgICAqL1xuICAgIHZhciB0aW1lcyA9IGRvTGltaXQodGltZUxpbWl0LCBJbmZpbml0eSk7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgc2FtZSBhcyB7QGxpbmsgYXN5bmMudGltZXN9IGJ1dCBydW5zIG9ubHkgYSBzaW5nbGUgYXN5bmMgb3BlcmF0aW9uIGF0IGEgdGltZS5cbiAgICAgKlxuICAgICAqIEBuYW1lIHRpbWVzU2VyaWVzXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBtZW1iZXJPZiBhc3luY1xuICAgICAqIEBzZWUgYXN5bmMudGltZXNcbiAgICAgKiBAY2F0ZWdvcnkgQ29udHJvbCBGbG93XG4gICAgICogQHBhcmFtIHtudW1iZXJ9IG4gLSBUaGUgbnVtYmVyIG9mIHRpbWVzIHRvIHJ1biB0aGUgZnVuY3Rpb24uXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gaXRlcmF0ZWUgLSBUaGUgZnVuY3Rpb24gdG8gY2FsbCBgbmAgdGltZXMuIEludm9rZWQgd2l0aCB0aGVcbiAgICAgKiBpdGVyYXRpb24gaW5kZXggYW5kIGEgY2FsbGJhY2sgKG4sIG5leHQpLlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIC0gc2VlIHtAbGluayBhc3luYy5tYXB9LlxuICAgICAqL1xuICAgIHZhciB0aW1lc1NlcmllcyA9IGRvTGltaXQodGltZUxpbWl0LCAxKTtcblxuICAgIC8qKlxuICAgICAqIEEgcmVsYXRpdmUgb2YgYHJlZHVjZWAuICBUYWtlcyBhbiBPYmplY3Qgb3IgQXJyYXksIGFuZCBpdGVyYXRlcyBvdmVyIGVhY2hcbiAgICAgKiBlbGVtZW50IGluIHNlcmllcywgZWFjaCBzdGVwIHBvdGVudGlhbGx5IG11dGF0aW5nIGFuIGBhY2N1bXVsYXRvcmAgdmFsdWUuXG4gICAgICogVGhlIHR5cGUgb2YgdGhlIGFjY3VtdWxhdG9yIGRlZmF1bHRzIHRvIHRoZSB0eXBlIG9mIGNvbGxlY3Rpb24gcGFzc2VkIGluLlxuICAgICAqXG4gICAgICogQG5hbWUgdHJhbnNmb3JtXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBtZW1iZXJPZiBhc3luY1xuICAgICAqIEBjYXRlZ29yeSBDb2xsZWN0aW9uXG4gICAgICogQHBhcmFtIHtBcnJheXxPYmplY3R9IGNvbGwgLSBBIGNvbGxlY3Rpb24gdG8gaXRlcmF0ZSBvdmVyLlxuICAgICAqIEBwYXJhbSB7Kn0gW2FjY3VtdWxhdG9yXSAtIFRoZSBpbml0aWFsIHN0YXRlIG9mIHRoZSB0cmFuc2Zvcm0uICBJZiBvbWl0dGVkLFxuICAgICAqIGl0IHdpbGwgZGVmYXVsdCB0byBhbiBlbXB0eSBPYmplY3Qgb3IgQXJyYXksIGRlcGVuZGluZyBvbiB0aGUgdHlwZSBvZiBgY29sbGBcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBpdGVyYXRlZSAtIEEgZnVuY3Rpb24gYXBwbGllZCB0byBlYWNoIGl0ZW0gaW4gdGhlXG4gICAgICogY29sbGVjdGlvbiB0aGF0IHBvdGVudGlhbGx5IG1vZGlmaWVzIHRoZSBhY2N1bXVsYXRvci4gVGhlIGBpdGVyYXRlZWAgaXNcbiAgICAgKiBwYXNzZWQgYSBgY2FsbGJhY2soZXJyKWAgd2hpY2ggYWNjZXB0cyBhbiBvcHRpb25hbCBlcnJvciBhcyBpdHMgZmlyc3RcbiAgICAgKiBhcmd1bWVudC4gSWYgYW4gZXJyb3IgaXMgcGFzc2VkIHRvIHRoZSBjYWxsYmFjaywgdGhlIHRyYW5zZm9ybSBpcyBzdG9wcGVkXG4gICAgICogYW5kIHRoZSBtYWluIGBjYWxsYmFja2AgaXMgaW1tZWRpYXRlbHkgY2FsbGVkIHdpdGggdGhlIGVycm9yLlxuICAgICAqIEludm9rZWQgd2l0aCAoYWNjdW11bGF0b3IsIGl0ZW0sIGtleSwgY2FsbGJhY2spLlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IFtjYWxsYmFja10gLSBBIGNhbGxiYWNrIHdoaWNoIGlzIGNhbGxlZCBhZnRlciBhbGwgdGhlXG4gICAgICogYGl0ZXJhdGVlYCBmdW5jdGlvbnMgaGF2ZSBmaW5pc2hlZC4gUmVzdWx0IGlzIHRoZSB0cmFuc2Zvcm1lZCBhY2N1bXVsYXRvci5cbiAgICAgKiBJbnZva2VkIHdpdGggKGVyciwgcmVzdWx0KS5cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogYXN5bmMudHJhbnNmb3JtKFsxLDIsM10sIGZ1bmN0aW9uKGFjYywgaXRlbSwgaW5kZXgsIGNhbGxiYWNrKSB7XG4gICAgICogICAgIC8vIHBvaW50bGVzcyBhc3luYzpcbiAgICAgKiAgICAgcHJvY2Vzcy5uZXh0VGljayhmdW5jdGlvbigpIHtcbiAgICAgKiAgICAgICAgIGFjYy5wdXNoKGl0ZW0gKiAyKVxuICAgICAqICAgICAgICAgY2FsbGJhY2sobnVsbClcbiAgICAgKiAgICAgfSk7XG4gICAgICogfSwgZnVuY3Rpb24oZXJyLCByZXN1bHQpIHtcbiAgICAgKiAgICAgLy8gcmVzdWx0IGlzIG5vdyBlcXVhbCB0byBbMiwgNCwgNl1cbiAgICAgKiB9KTtcbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiBhc3luYy50cmFuc2Zvcm0oe2E6IDEsIGI6IDIsIGM6IDN9LCBmdW5jdGlvbiAob2JqLCB2YWwsIGtleSwgY2FsbGJhY2spIHtcbiAgICAgKiAgICAgc2V0SW1tZWRpYXRlKGZ1bmN0aW9uICgpIHtcbiAgICAgKiAgICAgICAgIG9ialtrZXldID0gdmFsICogMjtcbiAgICAgKiAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICogICAgIH0pXG4gICAgICogfSwgZnVuY3Rpb24gKGVyciwgcmVzdWx0KSB7XG4gICAgICogICAgIC8vIHJlc3VsdCBpcyBlcXVhbCB0byB7YTogMiwgYjogNCwgYzogNn1cbiAgICAgKiB9KVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIHRyYW5zZm9ybShhcnIsIGFjYywgaXRlcmF0ZWUsIGNhbGxiYWNrKSB7XG4gICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAzKSB7XG4gICAgICAgICAgICBjYWxsYmFjayA9IGl0ZXJhdGVlO1xuICAgICAgICAgICAgaXRlcmF0ZWUgPSBhY2M7XG4gICAgICAgICAgICBhY2MgPSBpc0FycmF5KGFycikgPyBbXSA6IHt9O1xuICAgICAgICB9XG5cbiAgICAgICAgZWFjaE9mKGFyciwgZnVuY3Rpb24gKHYsIGssIGNiKSB7XG4gICAgICAgICAgICBpdGVyYXRlZShhY2MsIHYsIGssIGNiKTtcbiAgICAgICAgfSwgZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgY2FsbGJhY2soZXJyLCBhY2MpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBVbmRvZXMgYSB7QGxpbmsgYXN5bmMubWVtb2l6ZX1kIGZ1bmN0aW9uLCByZXZlcnRpbmcgaXQgdG8gdGhlIG9yaWdpbmFsLFxuICAgICAqIHVubWVtb2l6ZWQgZm9ybS4gSGFuZHkgZm9yIHRlc3RpbmcuXG4gICAgICpcbiAgICAgKiBAbmFtZSB1bm1lbW9pemVcbiAgICAgKiBAc3RhdGljXG4gICAgICogQG1lbWJlck9mIGFzeW5jXG4gICAgICogQHNlZSBhc3luYy5tZW1vaXplXG4gICAgICogQGNhdGVnb3J5IFV0aWxcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiAtIHRoZSBtZW1vaXplZCBmdW5jdGlvblxuICAgICAqL1xuICAgIGZ1bmN0aW9uIHVubWVtb2l6ZShmbikge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIChmbi51bm1lbW9pemVkIHx8IGZuKS5hcHBseShudWxsLCBhcmd1bWVudHMpO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlcGVhdGVkbHkgY2FsbCBgZm5gIHVudGlsIGB0ZXN0YCByZXR1cm5zIGB0cnVlYC4gQ2FsbHMgYGNhbGxiYWNrYCB3aGVuXG4gICAgICogc3RvcHBlZCwgb3IgYW4gZXJyb3Igb2NjdXJzLiBgY2FsbGJhY2tgIHdpbGwgYmUgcGFzc2VkIGFuIGVycm9yIGFuZCBhbnlcbiAgICAgKiBhcmd1bWVudHMgcGFzc2VkIHRvIHRoZSBmaW5hbCBgZm5gJ3MgY2FsbGJhY2suXG4gICAgICpcbiAgICAgKiBUaGUgaW52ZXJzZSBvZiB7QGxpbmsgYXN5bmMud2hpbHN0fS5cbiAgICAgKlxuICAgICAqIEBuYW1lIHVudGlsXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBtZW1iZXJPZiBhc3luY1xuICAgICAqIEBzZWUgYXN5bmMud2hpbHN0XG4gICAgICogQGNhdGVnb3J5IENvbnRyb2wgRmxvd1xuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IHRlc3QgLSBzeW5jaHJvbm91cyB0cnV0aCB0ZXN0IHRvIHBlcmZvcm0gYmVmb3JlIGVhY2hcbiAgICAgKiBleGVjdXRpb24gb2YgYGZuYC4gSW52b2tlZCB3aXRoICgpLlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIC0gQSBmdW5jdGlvbiB3aGljaCBpcyBjYWxsZWQgZWFjaCB0aW1lIGB0ZXN0YCBmYWlscy5cbiAgICAgKiBUaGUgZnVuY3Rpb24gaXMgcGFzc2VkIGEgYGNhbGxiYWNrKGVycilgLCB3aGljaCBtdXN0IGJlIGNhbGxlZCBvbmNlIGl0IGhhc1xuICAgICAqIGNvbXBsZXRlZCB3aXRoIGFuIG9wdGlvbmFsIGBlcnJgIGFyZ3VtZW50LiBJbnZva2VkIHdpdGggKGNhbGxiYWNrKS5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY2FsbGJhY2tdIC0gQSBjYWxsYmFjayB3aGljaCBpcyBjYWxsZWQgYWZ0ZXIgdGhlIHRlc3RcbiAgICAgKiBmdW5jdGlvbiBoYXMgcGFzc2VkIGFuZCByZXBlYXRlZCBleGVjdXRpb24gb2YgYGZuYCBoYXMgc3RvcHBlZC4gYGNhbGxiYWNrYFxuICAgICAqIHdpbGwgYmUgcGFzc2VkIGFuIGVycm9yIGFuZCBhbnkgYXJndW1lbnRzIHBhc3NlZCB0byB0aGUgZmluYWwgYGZuYCdzXG4gICAgICogY2FsbGJhY2suIEludm9rZWQgd2l0aCAoZXJyLCBbcmVzdWx0c10pO1xuICAgICAqL1xuICAgIGZ1bmN0aW9uIHVudGlsKHRlc3QsIGl0ZXJhdGVlLCBjYikge1xuICAgICAgICByZXR1cm4gd2hpbHN0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiAhdGVzdC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICB9LCBpdGVyYXRlZSwgY2IpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJ1bnMgdGhlIGB0YXNrc2AgYXJyYXkgb2YgZnVuY3Rpb25zIGluIHNlcmllcywgZWFjaCBwYXNzaW5nIHRoZWlyIHJlc3VsdHMgdG9cbiAgICAgKiB0aGUgbmV4dCBpbiB0aGUgYXJyYXkuIEhvd2V2ZXIsIGlmIGFueSBvZiB0aGUgYHRhc2tzYCBwYXNzIGFuIGVycm9yIHRvIHRoZWlyXG4gICAgICogb3duIGNhbGxiYWNrLCB0aGUgbmV4dCBmdW5jdGlvbiBpcyBub3QgZXhlY3V0ZWQsIGFuZCB0aGUgbWFpbiBgY2FsbGJhY2tgIGlzXG4gICAgICogaW1tZWRpYXRlbHkgY2FsbGVkIHdpdGggdGhlIGVycm9yLlxuICAgICAqXG4gICAgICogQG5hbWUgd2F0ZXJmYWxsXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBtZW1iZXJPZiBhc3luY1xuICAgICAqIEBjYXRlZ29yeSBDb250cm9sIEZsb3dcbiAgICAgKiBAcGFyYW0ge0FycmF5fSB0YXNrcyAtIEFuIGFycmF5IG9mIGZ1bmN0aW9ucyB0byBydW4sIGVhY2ggZnVuY3Rpb24gaXMgcGFzc2VkXG4gICAgICogYSBgY2FsbGJhY2soZXJyLCByZXN1bHQxLCByZXN1bHQyLCAuLi4pYCBpdCBtdXN0IGNhbGwgb24gY29tcGxldGlvbi4gVGhlXG4gICAgICogZmlyc3QgYXJndW1lbnQgaXMgYW4gZXJyb3IgKHdoaWNoIGNhbiBiZSBgbnVsbGApIGFuZCBhbnkgZnVydGhlciBhcmd1bWVudHNcbiAgICAgKiB3aWxsIGJlIHBhc3NlZCBhcyBhcmd1bWVudHMgaW4gb3JkZXIgdG8gdGhlIG5leHQgdGFzay5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY2FsbGJhY2tdIC0gQW4gb3B0aW9uYWwgY2FsbGJhY2sgdG8gcnVuIG9uY2UgYWxsIHRoZVxuICAgICAqIGZ1bmN0aW9ucyBoYXZlIGNvbXBsZXRlZC4gVGhpcyB3aWxsIGJlIHBhc3NlZCB0aGUgcmVzdWx0cyBvZiB0aGUgbGFzdCB0YXNrJ3NcbiAgICAgKiBjYWxsYmFjay4gSW52b2tlZCB3aXRoIChlcnIsIFtyZXN1bHRzXSkuXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqIGFzeW5jLndhdGVyZmFsbChbXG4gICAgICogICAgIGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gICAgICogICAgICAgICBjYWxsYmFjayhudWxsLCAnb25lJywgJ3R3bycpO1xuICAgICAqICAgICB9LFxuICAgICAqICAgICBmdW5jdGlvbihhcmcxLCBhcmcyLCBjYWxsYmFjaykge1xuICAgICAqICAgICAgICAgLy8gYXJnMSBub3cgZXF1YWxzICdvbmUnIGFuZCBhcmcyIG5vdyBlcXVhbHMgJ3R3bydcbiAgICAgKiAgICAgICAgIGNhbGxiYWNrKG51bGwsICd0aHJlZScpO1xuICAgICAqICAgICB9LFxuICAgICAqICAgICBmdW5jdGlvbihhcmcxLCBjYWxsYmFjaykge1xuICAgICAqICAgICAgICAgLy8gYXJnMSBub3cgZXF1YWxzICd0aHJlZSdcbiAgICAgKiAgICAgICAgIGNhbGxiYWNrKG51bGwsICdkb25lJyk7XG4gICAgICogICAgIH1cbiAgICAgKiBdLCBmdW5jdGlvbiAoZXJyLCByZXN1bHQpIHtcbiAgICAgKiAgICAgLy8gcmVzdWx0IG5vdyBlcXVhbHMgJ2RvbmUnXG4gICAgICogfSk7XG4gICAgICpcbiAgICAgKiAvLyBPciwgd2l0aCBuYW1lZCBmdW5jdGlvbnM6XG4gICAgICogYXN5bmMud2F0ZXJmYWxsKFtcbiAgICAgKiAgICAgbXlGaXJzdEZ1bmN0aW9uLFxuICAgICAqICAgICBteVNlY29uZEZ1bmN0aW9uLFxuICAgICAqICAgICBteUxhc3RGdW5jdGlvbixcbiAgICAgKiBdLCBmdW5jdGlvbiAoZXJyLCByZXN1bHQpIHtcbiAgICAgKiAgICAgLy8gcmVzdWx0IG5vdyBlcXVhbHMgJ2RvbmUnXG4gICAgICogfSk7XG4gICAgICogZnVuY3Rpb24gbXlGaXJzdEZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gICAgICogICAgIGNhbGxiYWNrKG51bGwsICdvbmUnLCAndHdvJyk7XG4gICAgICogfVxuICAgICAqIGZ1bmN0aW9uIG15U2Vjb25kRnVuY3Rpb24oYXJnMSwgYXJnMiwgY2FsbGJhY2spIHtcbiAgICAgKiAgICAgLy8gYXJnMSBub3cgZXF1YWxzICdvbmUnIGFuZCBhcmcyIG5vdyBlcXVhbHMgJ3R3bydcbiAgICAgKiAgICAgY2FsbGJhY2sobnVsbCwgJ3RocmVlJyk7XG4gICAgICogfVxuICAgICAqIGZ1bmN0aW9uIG15TGFzdEZ1bmN0aW9uKGFyZzEsIGNhbGxiYWNrKSB7XG4gICAgICogICAgIC8vIGFyZzEgbm93IGVxdWFscyAndGhyZWUnXG4gICAgICogICAgIGNhbGxiYWNrKG51bGwsICdkb25lJyk7XG4gICAgICogfVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIHdhdGVyZmFsbCAodGFza3MsIGNiKSB7XG4gICAgICAgIGNiID0gb25jZShjYiB8fCBub29wKTtcbiAgICAgICAgaWYgKCFpc0FycmF5KHRhc2tzKSkgcmV0dXJuIGNiKG5ldyBFcnJvcignRmlyc3QgYXJndW1lbnQgdG8gd2F0ZXJmYWxsIG11c3QgYmUgYW4gYXJyYXkgb2YgZnVuY3Rpb25zJykpO1xuICAgICAgICBpZiAoIXRhc2tzLmxlbmd0aCkgcmV0dXJuIGNiKCk7XG4gICAgICAgIHZhciB0YXNrSW5kZXggPSAwO1xuXG4gICAgICAgIGZ1bmN0aW9uIG5leHRUYXNrKGFyZ3MpIHtcbiAgICAgICAgICAgIGlmICh0YXNrSW5kZXggPT09IHRhc2tzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBjYi5hcHBseShudWxsLCBbbnVsbF0uY29uY2F0KGFyZ3MpKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIHRhc2tDYWxsYmFjayA9IG9ubHlPbmNlKHJlc3QoZnVuY3Rpb24gKGVyciwgYXJncykge1xuICAgICAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNiLmFwcGx5KG51bGwsIFtlcnJdLmNvbmNhdChhcmdzKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIG5leHRUYXNrKGFyZ3MpO1xuICAgICAgICAgICAgfSkpO1xuXG4gICAgICAgICAgICBhcmdzLnB1c2godGFza0NhbGxiYWNrKTtcblxuICAgICAgICAgICAgdmFyIHRhc2sgPSB0YXNrc1t0YXNrSW5kZXgrK107XG4gICAgICAgICAgICB0YXNrLmFwcGx5KG51bGwsIGFyZ3MpO1xuICAgICAgICB9XG5cbiAgICAgICAgbmV4dFRhc2soW10pO1xuICAgIH1cblxuICAgIHZhciBpbmRleCA9IHtcbiAgICAgICAgYXBwbHlFYWNoOiBhcHBseUVhY2gsXG4gICAgICAgIGFwcGx5RWFjaFNlcmllczogYXBwbHlFYWNoU2VyaWVzLFxuICAgICAgICBhcHBseTogYXBwbHkkMSxcbiAgICAgICAgYXN5bmNpZnk6IGFzeW5jaWZ5LFxuICAgICAgICBhdXRvOiBhdXRvLFxuICAgICAgICBhdXRvSW5qZWN0OiBhdXRvSW5qZWN0LFxuICAgICAgICBjYXJnbzogY2FyZ28sXG4gICAgICAgIGNvbXBvc2U6IGNvbXBvc2UsXG4gICAgICAgIGNvbmNhdDogY29uY2F0LFxuICAgICAgICBjb25jYXRTZXJpZXM6IGNvbmNhdFNlcmllcyxcbiAgICAgICAgY29uc3RhbnQ6IGNvbnN0YW50LFxuICAgICAgICBkZXRlY3Q6IGRldGVjdCxcbiAgICAgICAgZGV0ZWN0TGltaXQ6IGRldGVjdExpbWl0LFxuICAgICAgICBkZXRlY3RTZXJpZXM6IGRldGVjdFNlcmllcyxcbiAgICAgICAgZGlyOiBkaXIsXG4gICAgICAgIGRvRHVyaW5nOiBkb0R1cmluZyxcbiAgICAgICAgZG9VbnRpbDogZG9VbnRpbCxcbiAgICAgICAgZG9XaGlsc3Q6IGRvV2hpbHN0LFxuICAgICAgICBkdXJpbmc6IGR1cmluZyxcbiAgICAgICAgZWFjaDogZWFjaCxcbiAgICAgICAgZWFjaExpbWl0OiBlYWNoTGltaXQsXG4gICAgICAgIGVhY2hPZjogZWFjaE9mLFxuICAgICAgICBlYWNoT2ZMaW1pdDogZWFjaE9mTGltaXQsXG4gICAgICAgIGVhY2hPZlNlcmllczogZWFjaE9mU2VyaWVzLFxuICAgICAgICBlYWNoU2VyaWVzOiBlYWNoU2VyaWVzLFxuICAgICAgICBlbnN1cmVBc3luYzogZW5zdXJlQXN5bmMsXG4gICAgICAgIGV2ZXJ5OiBldmVyeSxcbiAgICAgICAgZXZlcnlMaW1pdDogZXZlcnlMaW1pdCxcbiAgICAgICAgZXZlcnlTZXJpZXM6IGV2ZXJ5U2VyaWVzLFxuICAgICAgICBmaWx0ZXI6IGZpbHRlcixcbiAgICAgICAgZmlsdGVyTGltaXQ6IGZpbHRlckxpbWl0LFxuICAgICAgICBmaWx0ZXJTZXJpZXM6IGZpbHRlclNlcmllcyxcbiAgICAgICAgZm9yZXZlcjogZm9yZXZlcixcbiAgICAgICAgaXRlcmF0b3I6IGl0ZXJhdG9yJDEsXG4gICAgICAgIGxvZzogbG9nLFxuICAgICAgICBtYXA6IG1hcCxcbiAgICAgICAgbWFwTGltaXQ6IG1hcExpbWl0LFxuICAgICAgICBtYXBTZXJpZXM6IG1hcFNlcmllcyxcbiAgICAgICAgbWFwVmFsdWVzOiBtYXBWYWx1ZXMsXG4gICAgICAgIG1hcFZhbHVlc0xpbWl0OiBtYXBWYWx1ZXNMaW1pdCxcbiAgICAgICAgbWFwVmFsdWVzU2VyaWVzOiBtYXBWYWx1ZXNTZXJpZXMsXG4gICAgICAgIG1lbW9pemU6IG1lbW9pemUkMSxcbiAgICAgICAgbmV4dFRpY2s6IG5leHRUaWNrLFxuICAgICAgICBwYXJhbGxlbDogcGFyYWxsZWwsXG4gICAgICAgIHBhcmFsbGVsTGltaXQ6IHBhcmFsbGVsTGltaXQsXG4gICAgICAgIHByaW9yaXR5UXVldWU6IHByaW9yaXR5UXVldWUsXG4gICAgICAgIHF1ZXVlOiBxdWV1ZSQxLFxuICAgICAgICByYWNlOiByYWNlLFxuICAgICAgICByZWR1Y2U6IHJlZHVjZSxcbiAgICAgICAgcmVkdWNlUmlnaHQ6IHJlZHVjZVJpZ2h0LFxuICAgICAgICByZWZsZWN0OiByZWZsZWN0LFxuICAgICAgICByZWZsZWN0QWxsOiByZWZsZWN0QWxsLFxuICAgICAgICByZWplY3Q6IHJlamVjdCxcbiAgICAgICAgcmVqZWN0TGltaXQ6IHJlamVjdExpbWl0LFxuICAgICAgICByZWplY3RTZXJpZXM6IHJlamVjdFNlcmllcyxcbiAgICAgICAgcmV0cnk6IHJldHJ5LFxuICAgICAgICByZXRyeWFibGU6IHJldHJ5YWJsZSxcbiAgICAgICAgc2VxOiBzZXEsXG4gICAgICAgIHNlcmllczogc2VyaWVzLFxuICAgICAgICBzZXRJbW1lZGlhdGU6IHNldEltbWVkaWF0ZSQxLFxuICAgICAgICBzb21lOiBzb21lLFxuICAgICAgICBzb21lTGltaXQ6IHNvbWVMaW1pdCxcbiAgICAgICAgc29tZVNlcmllczogc29tZVNlcmllcyxcbiAgICAgICAgc29ydEJ5OiBzb3J0QnksXG4gICAgICAgIHRpbWVvdXQ6IHRpbWVvdXQsXG4gICAgICAgIHRpbWVzOiB0aW1lcyxcbiAgICAgICAgdGltZXNMaW1pdDogdGltZUxpbWl0LFxuICAgICAgICB0aW1lc1NlcmllczogdGltZXNTZXJpZXMsXG4gICAgICAgIHRyYW5zZm9ybTogdHJhbnNmb3JtLFxuICAgICAgICB1bm1lbW9pemU6IHVubWVtb2l6ZSxcbiAgICAgICAgdW50aWw6IHVudGlsLFxuICAgICAgICB3YXRlcmZhbGw6IHdhdGVyZmFsbCxcbiAgICAgICAgd2hpbHN0OiB3aGlsc3QsXG5cbiAgICAgICAgLy8gYWxpYXNlc1xuICAgICAgICBhbGw6IGV2ZXJ5LFxuICAgICAgICBhbnk6IHNvbWUsXG4gICAgICAgIGZvckVhY2g6IGVhY2gsXG4gICAgICAgIGZvckVhY2hTZXJpZXM6IGVhY2hTZXJpZXMsXG4gICAgICAgIGZvckVhY2hMaW1pdDogZWFjaExpbWl0LFxuICAgICAgICBmb3JFYWNoT2Y6IGVhY2hPZixcbiAgICAgICAgZm9yRWFjaE9mU2VyaWVzOiBlYWNoT2ZTZXJpZXMsXG4gICAgICAgIGZvckVhY2hPZkxpbWl0OiBlYWNoT2ZMaW1pdCxcbiAgICAgICAgaW5qZWN0OiByZWR1Y2UsXG4gICAgICAgIGZvbGRsOiByZWR1Y2UsXG4gICAgICAgIGZvbGRyOiByZWR1Y2VSaWdodCxcbiAgICAgICAgc2VsZWN0OiBmaWx0ZXIsXG4gICAgICAgIHNlbGVjdExpbWl0OiBmaWx0ZXJMaW1pdCxcbiAgICAgICAgc2VsZWN0U2VyaWVzOiBmaWx0ZXJTZXJpZXMsXG4gICAgICAgIHdyYXBTeW5jOiBhc3luY2lmeVxuICAgIH07XG5cbiAgICBleHBvcnRzWydkZWZhdWx0J10gPSBpbmRleDtcbiAgICBleHBvcnRzLmFwcGx5RWFjaCA9IGFwcGx5RWFjaDtcbiAgICBleHBvcnRzLmFwcGx5RWFjaFNlcmllcyA9IGFwcGx5RWFjaFNlcmllcztcbiAgICBleHBvcnRzLmFwcGx5ID0gYXBwbHkkMTtcbiAgICBleHBvcnRzLmFzeW5jaWZ5ID0gYXN5bmNpZnk7XG4gICAgZXhwb3J0cy5hdXRvID0gYXV0bztcbiAgICBleHBvcnRzLmF1dG9JbmplY3QgPSBhdXRvSW5qZWN0O1xuICAgIGV4cG9ydHMuY2FyZ28gPSBjYXJnbztcbiAgICBleHBvcnRzLmNvbXBvc2UgPSBjb21wb3NlO1xuICAgIGV4cG9ydHMuY29uY2F0ID0gY29uY2F0O1xuICAgIGV4cG9ydHMuY29uY2F0U2VyaWVzID0gY29uY2F0U2VyaWVzO1xuICAgIGV4cG9ydHMuY29uc3RhbnQgPSBjb25zdGFudDtcbiAgICBleHBvcnRzLmRldGVjdCA9IGRldGVjdDtcbiAgICBleHBvcnRzLmRldGVjdExpbWl0ID0gZGV0ZWN0TGltaXQ7XG4gICAgZXhwb3J0cy5kZXRlY3RTZXJpZXMgPSBkZXRlY3RTZXJpZXM7XG4gICAgZXhwb3J0cy5kaXIgPSBkaXI7XG4gICAgZXhwb3J0cy5kb0R1cmluZyA9IGRvRHVyaW5nO1xuICAgIGV4cG9ydHMuZG9VbnRpbCA9IGRvVW50aWw7XG4gICAgZXhwb3J0cy5kb1doaWxzdCA9IGRvV2hpbHN0O1xuICAgIGV4cG9ydHMuZHVyaW5nID0gZHVyaW5nO1xuICAgIGV4cG9ydHMuZWFjaCA9IGVhY2g7XG4gICAgZXhwb3J0cy5lYWNoTGltaXQgPSBlYWNoTGltaXQ7XG4gICAgZXhwb3J0cy5lYWNoT2YgPSBlYWNoT2Y7XG4gICAgZXhwb3J0cy5lYWNoT2ZMaW1pdCA9IGVhY2hPZkxpbWl0O1xuICAgIGV4cG9ydHMuZWFjaE9mU2VyaWVzID0gZWFjaE9mU2VyaWVzO1xuICAgIGV4cG9ydHMuZWFjaFNlcmllcyA9IGVhY2hTZXJpZXM7XG4gICAgZXhwb3J0cy5lbnN1cmVBc3luYyA9IGVuc3VyZUFzeW5jO1xuICAgIGV4cG9ydHMuZXZlcnkgPSBldmVyeTtcbiAgICBleHBvcnRzLmV2ZXJ5TGltaXQgPSBldmVyeUxpbWl0O1xuICAgIGV4cG9ydHMuZXZlcnlTZXJpZXMgPSBldmVyeVNlcmllcztcbiAgICBleHBvcnRzLmZpbHRlciA9IGZpbHRlcjtcbiAgICBleHBvcnRzLmZpbHRlckxpbWl0ID0gZmlsdGVyTGltaXQ7XG4gICAgZXhwb3J0cy5maWx0ZXJTZXJpZXMgPSBmaWx0ZXJTZXJpZXM7XG4gICAgZXhwb3J0cy5mb3JldmVyID0gZm9yZXZlcjtcbiAgICBleHBvcnRzLml0ZXJhdG9yID0gaXRlcmF0b3IkMTtcbiAgICBleHBvcnRzLmxvZyA9IGxvZztcbiAgICBleHBvcnRzLm1hcCA9IG1hcDtcbiAgICBleHBvcnRzLm1hcExpbWl0ID0gbWFwTGltaXQ7XG4gICAgZXhwb3J0cy5tYXBTZXJpZXMgPSBtYXBTZXJpZXM7XG4gICAgZXhwb3J0cy5tYXBWYWx1ZXMgPSBtYXBWYWx1ZXM7XG4gICAgZXhwb3J0cy5tYXBWYWx1ZXNMaW1pdCA9IG1hcFZhbHVlc0xpbWl0O1xuICAgIGV4cG9ydHMubWFwVmFsdWVzU2VyaWVzID0gbWFwVmFsdWVzU2VyaWVzO1xuICAgIGV4cG9ydHMubWVtb2l6ZSA9IG1lbW9pemUkMTtcbiAgICBleHBvcnRzLm5leHRUaWNrID0gbmV4dFRpY2s7XG4gICAgZXhwb3J0cy5wYXJhbGxlbCA9IHBhcmFsbGVsO1xuICAgIGV4cG9ydHMucGFyYWxsZWxMaW1pdCA9IHBhcmFsbGVsTGltaXQ7XG4gICAgZXhwb3J0cy5wcmlvcml0eVF1ZXVlID0gcHJpb3JpdHlRdWV1ZTtcbiAgICBleHBvcnRzLnF1ZXVlID0gcXVldWUkMTtcbiAgICBleHBvcnRzLnJhY2UgPSByYWNlO1xuICAgIGV4cG9ydHMucmVkdWNlID0gcmVkdWNlO1xuICAgIGV4cG9ydHMucmVkdWNlUmlnaHQgPSByZWR1Y2VSaWdodDtcbiAgICBleHBvcnRzLnJlZmxlY3QgPSByZWZsZWN0O1xuICAgIGV4cG9ydHMucmVmbGVjdEFsbCA9IHJlZmxlY3RBbGw7XG4gICAgZXhwb3J0cy5yZWplY3QgPSByZWplY3Q7XG4gICAgZXhwb3J0cy5yZWplY3RMaW1pdCA9IHJlamVjdExpbWl0O1xuICAgIGV4cG9ydHMucmVqZWN0U2VyaWVzID0gcmVqZWN0U2VyaWVzO1xuICAgIGV4cG9ydHMucmV0cnkgPSByZXRyeTtcbiAgICBleHBvcnRzLnJldHJ5YWJsZSA9IHJldHJ5YWJsZTtcbiAgICBleHBvcnRzLnNlcSA9IHNlcTtcbiAgICBleHBvcnRzLnNlcmllcyA9IHNlcmllcztcbiAgICBleHBvcnRzLnNldEltbWVkaWF0ZSA9IHNldEltbWVkaWF0ZSQxO1xuICAgIGV4cG9ydHMuc29tZSA9IHNvbWU7XG4gICAgZXhwb3J0cy5zb21lTGltaXQgPSBzb21lTGltaXQ7XG4gICAgZXhwb3J0cy5zb21lU2VyaWVzID0gc29tZVNlcmllcztcbiAgICBleHBvcnRzLnNvcnRCeSA9IHNvcnRCeTtcbiAgICBleHBvcnRzLnRpbWVvdXQgPSB0aW1lb3V0O1xuICAgIGV4cG9ydHMudGltZXMgPSB0aW1lcztcbiAgICBleHBvcnRzLnRpbWVzTGltaXQgPSB0aW1lTGltaXQ7XG4gICAgZXhwb3J0cy50aW1lc1NlcmllcyA9IHRpbWVzU2VyaWVzO1xuICAgIGV4cG9ydHMudHJhbnNmb3JtID0gdHJhbnNmb3JtO1xuICAgIGV4cG9ydHMudW5tZW1vaXplID0gdW5tZW1vaXplO1xuICAgIGV4cG9ydHMudW50aWwgPSB1bnRpbDtcbiAgICBleHBvcnRzLndhdGVyZmFsbCA9IHdhdGVyZmFsbDtcbiAgICBleHBvcnRzLndoaWxzdCA9IHdoaWxzdDtcbiAgICBleHBvcnRzLmFsbCA9IGV2ZXJ5O1xuICAgIGV4cG9ydHMuYWxsTGltaXQgPSBldmVyeUxpbWl0O1xuICAgIGV4cG9ydHMuYWxsU2VyaWVzID0gZXZlcnlTZXJpZXM7XG4gICAgZXhwb3J0cy5hbnkgPSBzb21lO1xuICAgIGV4cG9ydHMuYW55TGltaXQgPSBzb21lTGltaXQ7XG4gICAgZXhwb3J0cy5hbnlTZXJpZXMgPSBzb21lU2VyaWVzO1xuICAgIGV4cG9ydHMuZmluZCA9IGRldGVjdDtcbiAgICBleHBvcnRzLmZpbmRMaW1pdCA9IGRldGVjdExpbWl0O1xuICAgIGV4cG9ydHMuZmluZFNlcmllcyA9IGRldGVjdFNlcmllcztcbiAgICBleHBvcnRzLmZvckVhY2ggPSBlYWNoO1xuICAgIGV4cG9ydHMuZm9yRWFjaFNlcmllcyA9IGVhY2hTZXJpZXM7XG4gICAgZXhwb3J0cy5mb3JFYWNoTGltaXQgPSBlYWNoTGltaXQ7XG4gICAgZXhwb3J0cy5mb3JFYWNoT2YgPSBlYWNoT2Y7XG4gICAgZXhwb3J0cy5mb3JFYWNoT2ZTZXJpZXMgPSBlYWNoT2ZTZXJpZXM7XG4gICAgZXhwb3J0cy5mb3JFYWNoT2ZMaW1pdCA9IGVhY2hPZkxpbWl0O1xuICAgIGV4cG9ydHMuaW5qZWN0ID0gcmVkdWNlO1xuICAgIGV4cG9ydHMuZm9sZGwgPSByZWR1Y2U7XG4gICAgZXhwb3J0cy5mb2xkciA9IHJlZHVjZVJpZ2h0O1xuICAgIGV4cG9ydHMuc2VsZWN0ID0gZmlsdGVyO1xuICAgIGV4cG9ydHMuc2VsZWN0TGltaXQgPSBmaWx0ZXJMaW1pdDtcbiAgICBleHBvcnRzLnNlbGVjdFNlcmllcyA9IGZpbHRlclNlcmllcztcbiAgICBleHBvcnRzLndyYXBTeW5jID0gYXN5bmNpZnk7XG5cbn0pKTsiLCIvLyBodHRwOi8vd2lraS5jb21tb25qcy5vcmcvd2lraS9Vbml0X1Rlc3RpbmcvMS4wXG4vL1xuLy8gVEhJUyBJUyBOT1QgVEVTVEVEIE5PUiBMSUtFTFkgVE8gV09SSyBPVVRTSURFIFY4IVxuLy9cbi8vIE9yaWdpbmFsbHkgZnJvbSBuYXJ3aGFsLmpzIChodHRwOi8vbmFyd2hhbGpzLm9yZylcbi8vIENvcHlyaWdodCAoYykgMjAwOSBUaG9tYXMgUm9iaW5zb24gPDI4MG5vcnRoLmNvbT5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4vLyBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSAnU29mdHdhcmUnKSwgdG9cbi8vIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlXG4vLyByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Jcbi8vIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4vLyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4vLyBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgJ0FTIElTJywgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbi8vIEFVVEhPUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSIElOIEFOXG4vLyBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OXG4vLyBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cblxuLy8gd2hlbiB1c2VkIGluIG5vZGUsIHRoaXMgd2lsbCBhY3R1YWxseSBsb2FkIHRoZSB1dGlsIG1vZHVsZSB3ZSBkZXBlbmQgb25cbi8vIHZlcnN1cyBsb2FkaW5nIHRoZSBidWlsdGluIHV0aWwgbW9kdWxlIGFzIGhhcHBlbnMgb3RoZXJ3aXNlXG4vLyB0aGlzIGlzIGEgYnVnIGluIG5vZGUgbW9kdWxlIGxvYWRpbmcgYXMgZmFyIGFzIEkgYW0gY29uY2VybmVkXG52YXIgdXRpbCA9IHJlcXVpcmUoJ3V0aWwvJyk7XG5cbnZhciBwU2xpY2UgPSBBcnJheS5wcm90b3R5cGUuc2xpY2U7XG52YXIgaGFzT3duID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcblxuLy8gMS4gVGhlIGFzc2VydCBtb2R1bGUgcHJvdmlkZXMgZnVuY3Rpb25zIHRoYXQgdGhyb3dcbi8vIEFzc2VydGlvbkVycm9yJ3Mgd2hlbiBwYXJ0aWN1bGFyIGNvbmRpdGlvbnMgYXJlIG5vdCBtZXQuIFRoZVxuLy8gYXNzZXJ0IG1vZHVsZSBtdXN0IGNvbmZvcm0gdG8gdGhlIGZvbGxvd2luZyBpbnRlcmZhY2UuXG5cbnZhciBhc3NlcnQgPSBtb2R1bGUuZXhwb3J0cyA9IG9rO1xuXG4vLyAyLiBUaGUgQXNzZXJ0aW9uRXJyb3IgaXMgZGVmaW5lZCBpbiBhc3NlcnQuXG4vLyBuZXcgYXNzZXJ0LkFzc2VydGlvbkVycm9yKHsgbWVzc2FnZTogbWVzc2FnZSxcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3R1YWw6IGFjdHVhbCxcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICBleHBlY3RlZDogZXhwZWN0ZWQgfSlcblxuYXNzZXJ0LkFzc2VydGlvbkVycm9yID0gZnVuY3Rpb24gQXNzZXJ0aW9uRXJyb3Iob3B0aW9ucykge1xuICB0aGlzLm5hbWUgPSAnQXNzZXJ0aW9uRXJyb3InO1xuICB0aGlzLmFjdHVhbCA9IG9wdGlvbnMuYWN0dWFsO1xuICB0aGlzLmV4cGVjdGVkID0gb3B0aW9ucy5leHBlY3RlZDtcbiAgdGhpcy5vcGVyYXRvciA9IG9wdGlvbnMub3BlcmF0b3I7XG4gIGlmIChvcHRpb25zLm1lc3NhZ2UpIHtcbiAgICB0aGlzLm1lc3NhZ2UgPSBvcHRpb25zLm1lc3NhZ2U7XG4gICAgdGhpcy5nZW5lcmF0ZWRNZXNzYWdlID0gZmFsc2U7XG4gIH0gZWxzZSB7XG4gICAgdGhpcy5tZXNzYWdlID0gZ2V0TWVzc2FnZSh0aGlzKTtcbiAgICB0aGlzLmdlbmVyYXRlZE1lc3NhZ2UgPSB0cnVlO1xuICB9XG4gIHZhciBzdGFja1N0YXJ0RnVuY3Rpb24gPSBvcHRpb25zLnN0YWNrU3RhcnRGdW5jdGlvbiB8fCBmYWlsO1xuXG4gIGlmIChFcnJvci5jYXB0dXJlU3RhY2tUcmFjZSkge1xuICAgIEVycm9yLmNhcHR1cmVTdGFja1RyYWNlKHRoaXMsIHN0YWNrU3RhcnRGdW5jdGlvbik7XG4gIH1cbiAgZWxzZSB7XG4gICAgLy8gbm9uIHY4IGJyb3dzZXJzIHNvIHdlIGNhbiBoYXZlIGEgc3RhY2t0cmFjZVxuICAgIHZhciBlcnIgPSBuZXcgRXJyb3IoKTtcbiAgICBpZiAoZXJyLnN0YWNrKSB7XG4gICAgICB2YXIgb3V0ID0gZXJyLnN0YWNrO1xuXG4gICAgICAvLyB0cnkgdG8gc3RyaXAgdXNlbGVzcyBmcmFtZXNcbiAgICAgIHZhciBmbl9uYW1lID0gc3RhY2tTdGFydEZ1bmN0aW9uLm5hbWU7XG4gICAgICB2YXIgaWR4ID0gb3V0LmluZGV4T2YoJ1xcbicgKyBmbl9uYW1lKTtcbiAgICAgIGlmIChpZHggPj0gMCkge1xuICAgICAgICAvLyBvbmNlIHdlIGhhdmUgbG9jYXRlZCB0aGUgZnVuY3Rpb24gZnJhbWVcbiAgICAgICAgLy8gd2UgbmVlZCB0byBzdHJpcCBvdXQgZXZlcnl0aGluZyBiZWZvcmUgaXQgKGFuZCBpdHMgbGluZSlcbiAgICAgICAgdmFyIG5leHRfbGluZSA9IG91dC5pbmRleE9mKCdcXG4nLCBpZHggKyAxKTtcbiAgICAgICAgb3V0ID0gb3V0LnN1YnN0cmluZyhuZXh0X2xpbmUgKyAxKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5zdGFjayA9IG91dDtcbiAgICB9XG4gIH1cbn07XG5cbi8vIGFzc2VydC5Bc3NlcnRpb25FcnJvciBpbnN0YW5jZW9mIEVycm9yXG51dGlsLmluaGVyaXRzKGFzc2VydC5Bc3NlcnRpb25FcnJvciwgRXJyb3IpO1xuXG5mdW5jdGlvbiByZXBsYWNlcihrZXksIHZhbHVlKSB7XG4gIGlmICh1dGlsLmlzVW5kZWZpbmVkKHZhbHVlKSkge1xuICAgIHJldHVybiAnJyArIHZhbHVlO1xuICB9XG4gIGlmICh1dGlsLmlzTnVtYmVyKHZhbHVlKSAmJiAhaXNGaW5pdGUodmFsdWUpKSB7XG4gICAgcmV0dXJuIHZhbHVlLnRvU3RyaW5nKCk7XG4gIH1cbiAgaWYgKHV0aWwuaXNGdW5jdGlvbih2YWx1ZSkgfHwgdXRpbC5pc1JlZ0V4cCh2YWx1ZSkpIHtcbiAgICByZXR1cm4gdmFsdWUudG9TdHJpbmcoKTtcbiAgfVxuICByZXR1cm4gdmFsdWU7XG59XG5cbmZ1bmN0aW9uIHRydW5jYXRlKHMsIG4pIHtcbiAgaWYgKHV0aWwuaXNTdHJpbmcocykpIHtcbiAgICByZXR1cm4gcy5sZW5ndGggPCBuID8gcyA6IHMuc2xpY2UoMCwgbik7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHM7XG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0TWVzc2FnZShzZWxmKSB7XG4gIHJldHVybiB0cnVuY2F0ZShKU09OLnN0cmluZ2lmeShzZWxmLmFjdHVhbCwgcmVwbGFjZXIpLCAxMjgpICsgJyAnICtcbiAgICAgICAgIHNlbGYub3BlcmF0b3IgKyAnICcgK1xuICAgICAgICAgdHJ1bmNhdGUoSlNPTi5zdHJpbmdpZnkoc2VsZi5leHBlY3RlZCwgcmVwbGFjZXIpLCAxMjgpO1xufVxuXG4vLyBBdCBwcmVzZW50IG9ubHkgdGhlIHRocmVlIGtleXMgbWVudGlvbmVkIGFib3ZlIGFyZSB1c2VkIGFuZFxuLy8gdW5kZXJzdG9vZCBieSB0aGUgc3BlYy4gSW1wbGVtZW50YXRpb25zIG9yIHN1YiBtb2R1bGVzIGNhbiBwYXNzXG4vLyBvdGhlciBrZXlzIHRvIHRoZSBBc3NlcnRpb25FcnJvcidzIGNvbnN0cnVjdG9yIC0gdGhleSB3aWxsIGJlXG4vLyBpZ25vcmVkLlxuXG4vLyAzLiBBbGwgb2YgdGhlIGZvbGxvd2luZyBmdW5jdGlvbnMgbXVzdCB0aHJvdyBhbiBBc3NlcnRpb25FcnJvclxuLy8gd2hlbiBhIGNvcnJlc3BvbmRpbmcgY29uZGl0aW9uIGlzIG5vdCBtZXQsIHdpdGggYSBtZXNzYWdlIHRoYXRcbi8vIG1heSBiZSB1bmRlZmluZWQgaWYgbm90IHByb3ZpZGVkLiAgQWxsIGFzc2VydGlvbiBtZXRob2RzIHByb3ZpZGVcbi8vIGJvdGggdGhlIGFjdHVhbCBhbmQgZXhwZWN0ZWQgdmFsdWVzIHRvIHRoZSBhc3NlcnRpb24gZXJyb3IgZm9yXG4vLyBkaXNwbGF5IHB1cnBvc2VzLlxuXG5mdW5jdGlvbiBmYWlsKGFjdHVhbCwgZXhwZWN0ZWQsIG1lc3NhZ2UsIG9wZXJhdG9yLCBzdGFja1N0YXJ0RnVuY3Rpb24pIHtcbiAgdGhyb3cgbmV3IGFzc2VydC5Bc3NlcnRpb25FcnJvcih7XG4gICAgbWVzc2FnZTogbWVzc2FnZSxcbiAgICBhY3R1YWw6IGFjdHVhbCxcbiAgICBleHBlY3RlZDogZXhwZWN0ZWQsXG4gICAgb3BlcmF0b3I6IG9wZXJhdG9yLFxuICAgIHN0YWNrU3RhcnRGdW5jdGlvbjogc3RhY2tTdGFydEZ1bmN0aW9uXG4gIH0pO1xufVxuXG4vLyBFWFRFTlNJT04hIGFsbG93cyBmb3Igd2VsbCBiZWhhdmVkIGVycm9ycyBkZWZpbmVkIGVsc2V3aGVyZS5cbmFzc2VydC5mYWlsID0gZmFpbDtcblxuLy8gNC4gUHVyZSBhc3NlcnRpb24gdGVzdHMgd2hldGhlciBhIHZhbHVlIGlzIHRydXRoeSwgYXMgZGV0ZXJtaW5lZFxuLy8gYnkgISFndWFyZC5cbi8vIGFzc2VydC5vayhndWFyZCwgbWVzc2FnZV9vcHQpO1xuLy8gVGhpcyBzdGF0ZW1lbnQgaXMgZXF1aXZhbGVudCB0byBhc3NlcnQuZXF1YWwodHJ1ZSwgISFndWFyZCxcbi8vIG1lc3NhZ2Vfb3B0KTsuIFRvIHRlc3Qgc3RyaWN0bHkgZm9yIHRoZSB2YWx1ZSB0cnVlLCB1c2Vcbi8vIGFzc2VydC5zdHJpY3RFcXVhbCh0cnVlLCBndWFyZCwgbWVzc2FnZV9vcHQpOy5cblxuZnVuY3Rpb24gb2sodmFsdWUsIG1lc3NhZ2UpIHtcbiAgaWYgKCF2YWx1ZSkgZmFpbCh2YWx1ZSwgdHJ1ZSwgbWVzc2FnZSwgJz09JywgYXNzZXJ0Lm9rKTtcbn1cbmFzc2VydC5vayA9IG9rO1xuXG4vLyA1LiBUaGUgZXF1YWxpdHkgYXNzZXJ0aW9uIHRlc3RzIHNoYWxsb3csIGNvZXJjaXZlIGVxdWFsaXR5IHdpdGhcbi8vID09LlxuLy8gYXNzZXJ0LmVxdWFsKGFjdHVhbCwgZXhwZWN0ZWQsIG1lc3NhZ2Vfb3B0KTtcblxuYXNzZXJ0LmVxdWFsID0gZnVuY3Rpb24gZXF1YWwoYWN0dWFsLCBleHBlY3RlZCwgbWVzc2FnZSkge1xuICBpZiAoYWN0dWFsICE9IGV4cGVjdGVkKSBmYWlsKGFjdHVhbCwgZXhwZWN0ZWQsIG1lc3NhZ2UsICc9PScsIGFzc2VydC5lcXVhbCk7XG59O1xuXG4vLyA2LiBUaGUgbm9uLWVxdWFsaXR5IGFzc2VydGlvbiB0ZXN0cyBmb3Igd2hldGhlciB0d28gb2JqZWN0cyBhcmUgbm90IGVxdWFsXG4vLyB3aXRoICE9IGFzc2VydC5ub3RFcXVhbChhY3R1YWwsIGV4cGVjdGVkLCBtZXNzYWdlX29wdCk7XG5cbmFzc2VydC5ub3RFcXVhbCA9IGZ1bmN0aW9uIG5vdEVxdWFsKGFjdHVhbCwgZXhwZWN0ZWQsIG1lc3NhZ2UpIHtcbiAgaWYgKGFjdHVhbCA9PSBleHBlY3RlZCkge1xuICAgIGZhaWwoYWN0dWFsLCBleHBlY3RlZCwgbWVzc2FnZSwgJyE9JywgYXNzZXJ0Lm5vdEVxdWFsKTtcbiAgfVxufTtcblxuLy8gNy4gVGhlIGVxdWl2YWxlbmNlIGFzc2VydGlvbiB0ZXN0cyBhIGRlZXAgZXF1YWxpdHkgcmVsYXRpb24uXG4vLyBhc3NlcnQuZGVlcEVxdWFsKGFjdHVhbCwgZXhwZWN0ZWQsIG1lc3NhZ2Vfb3B0KTtcblxuYXNzZXJ0LmRlZXBFcXVhbCA9IGZ1bmN0aW9uIGRlZXBFcXVhbChhY3R1YWwsIGV4cGVjdGVkLCBtZXNzYWdlKSB7XG4gIGlmICghX2RlZXBFcXVhbChhY3R1YWwsIGV4cGVjdGVkKSkge1xuICAgIGZhaWwoYWN0dWFsLCBleHBlY3RlZCwgbWVzc2FnZSwgJ2RlZXBFcXVhbCcsIGFzc2VydC5kZWVwRXF1YWwpO1xuICB9XG59O1xuXG5mdW5jdGlvbiBfZGVlcEVxdWFsKGFjdHVhbCwgZXhwZWN0ZWQpIHtcbiAgLy8gNy4xLiBBbGwgaWRlbnRpY2FsIHZhbHVlcyBhcmUgZXF1aXZhbGVudCwgYXMgZGV0ZXJtaW5lZCBieSA9PT0uXG4gIGlmIChhY3R1YWwgPT09IGV4cGVjdGVkKSB7XG4gICAgcmV0dXJuIHRydWU7XG5cbiAgfSBlbHNlIGlmICh1dGlsLmlzQnVmZmVyKGFjdHVhbCkgJiYgdXRpbC5pc0J1ZmZlcihleHBlY3RlZCkpIHtcbiAgICBpZiAoYWN0dWFsLmxlbmd0aCAhPSBleHBlY3RlZC5sZW5ndGgpIHJldHVybiBmYWxzZTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYWN0dWFsLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoYWN0dWFsW2ldICE9PSBleHBlY3RlZFtpXSkgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHJldHVybiB0cnVlO1xuXG4gIC8vIDcuMi4gSWYgdGhlIGV4cGVjdGVkIHZhbHVlIGlzIGEgRGF0ZSBvYmplY3QsIHRoZSBhY3R1YWwgdmFsdWUgaXNcbiAgLy8gZXF1aXZhbGVudCBpZiBpdCBpcyBhbHNvIGEgRGF0ZSBvYmplY3QgdGhhdCByZWZlcnMgdG8gdGhlIHNhbWUgdGltZS5cbiAgfSBlbHNlIGlmICh1dGlsLmlzRGF0ZShhY3R1YWwpICYmIHV0aWwuaXNEYXRlKGV4cGVjdGVkKSkge1xuICAgIHJldHVybiBhY3R1YWwuZ2V0VGltZSgpID09PSBleHBlY3RlZC5nZXRUaW1lKCk7XG5cbiAgLy8gNy4zIElmIHRoZSBleHBlY3RlZCB2YWx1ZSBpcyBhIFJlZ0V4cCBvYmplY3QsIHRoZSBhY3R1YWwgdmFsdWUgaXNcbiAgLy8gZXF1aXZhbGVudCBpZiBpdCBpcyBhbHNvIGEgUmVnRXhwIG9iamVjdCB3aXRoIHRoZSBzYW1lIHNvdXJjZSBhbmRcbiAgLy8gcHJvcGVydGllcyAoYGdsb2JhbGAsIGBtdWx0aWxpbmVgLCBgbGFzdEluZGV4YCwgYGlnbm9yZUNhc2VgKS5cbiAgfSBlbHNlIGlmICh1dGlsLmlzUmVnRXhwKGFjdHVhbCkgJiYgdXRpbC5pc1JlZ0V4cChleHBlY3RlZCkpIHtcbiAgICByZXR1cm4gYWN0dWFsLnNvdXJjZSA9PT0gZXhwZWN0ZWQuc291cmNlICYmXG4gICAgICAgICAgIGFjdHVhbC5nbG9iYWwgPT09IGV4cGVjdGVkLmdsb2JhbCAmJlxuICAgICAgICAgICBhY3R1YWwubXVsdGlsaW5lID09PSBleHBlY3RlZC5tdWx0aWxpbmUgJiZcbiAgICAgICAgICAgYWN0dWFsLmxhc3RJbmRleCA9PT0gZXhwZWN0ZWQubGFzdEluZGV4ICYmXG4gICAgICAgICAgIGFjdHVhbC5pZ25vcmVDYXNlID09PSBleHBlY3RlZC5pZ25vcmVDYXNlO1xuXG4gIC8vIDcuNC4gT3RoZXIgcGFpcnMgdGhhdCBkbyBub3QgYm90aCBwYXNzIHR5cGVvZiB2YWx1ZSA9PSAnb2JqZWN0JyxcbiAgLy8gZXF1aXZhbGVuY2UgaXMgZGV0ZXJtaW5lZCBieSA9PS5cbiAgfSBlbHNlIGlmICghdXRpbC5pc09iamVjdChhY3R1YWwpICYmICF1dGlsLmlzT2JqZWN0KGV4cGVjdGVkKSkge1xuICAgIHJldHVybiBhY3R1YWwgPT0gZXhwZWN0ZWQ7XG5cbiAgLy8gNy41IEZvciBhbGwgb3RoZXIgT2JqZWN0IHBhaXJzLCBpbmNsdWRpbmcgQXJyYXkgb2JqZWN0cywgZXF1aXZhbGVuY2UgaXNcbiAgLy8gZGV0ZXJtaW5lZCBieSBoYXZpbmcgdGhlIHNhbWUgbnVtYmVyIG9mIG93bmVkIHByb3BlcnRpZXMgKGFzIHZlcmlmaWVkXG4gIC8vIHdpdGggT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKSwgdGhlIHNhbWUgc2V0IG9mIGtleXNcbiAgLy8gKGFsdGhvdWdoIG5vdCBuZWNlc3NhcmlseSB0aGUgc2FtZSBvcmRlciksIGVxdWl2YWxlbnQgdmFsdWVzIGZvciBldmVyeVxuICAvLyBjb3JyZXNwb25kaW5nIGtleSwgYW5kIGFuIGlkZW50aWNhbCAncHJvdG90eXBlJyBwcm9wZXJ0eS4gTm90ZTogdGhpc1xuICAvLyBhY2NvdW50cyBmb3IgYm90aCBuYW1lZCBhbmQgaW5kZXhlZCBwcm9wZXJ0aWVzIG9uIEFycmF5cy5cbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gb2JqRXF1aXYoYWN0dWFsLCBleHBlY3RlZCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gaXNBcmd1bWVudHMob2JqZWN0KSB7XG4gIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwob2JqZWN0KSA9PSAnW29iamVjdCBBcmd1bWVudHNdJztcbn1cblxuZnVuY3Rpb24gb2JqRXF1aXYoYSwgYikge1xuICBpZiAodXRpbC5pc051bGxPclVuZGVmaW5lZChhKSB8fCB1dGlsLmlzTnVsbE9yVW5kZWZpbmVkKGIpKVxuICAgIHJldHVybiBmYWxzZTtcbiAgLy8gYW4gaWRlbnRpY2FsICdwcm90b3R5cGUnIHByb3BlcnR5LlxuICBpZiAoYS5wcm90b3R5cGUgIT09IGIucHJvdG90eXBlKSByZXR1cm4gZmFsc2U7XG4gIC8vIGlmIG9uZSBpcyBhIHByaW1pdGl2ZSwgdGhlIG90aGVyIG11c3QgYmUgc2FtZVxuICBpZiAodXRpbC5pc1ByaW1pdGl2ZShhKSB8fCB1dGlsLmlzUHJpbWl0aXZlKGIpKSB7XG4gICAgcmV0dXJuIGEgPT09IGI7XG4gIH1cbiAgdmFyIGFJc0FyZ3MgPSBpc0FyZ3VtZW50cyhhKSxcbiAgICAgIGJJc0FyZ3MgPSBpc0FyZ3VtZW50cyhiKTtcbiAgaWYgKChhSXNBcmdzICYmICFiSXNBcmdzKSB8fCAoIWFJc0FyZ3MgJiYgYklzQXJncykpXG4gICAgcmV0dXJuIGZhbHNlO1xuICBpZiAoYUlzQXJncykge1xuICAgIGEgPSBwU2xpY2UuY2FsbChhKTtcbiAgICBiID0gcFNsaWNlLmNhbGwoYik7XG4gICAgcmV0dXJuIF9kZWVwRXF1YWwoYSwgYik7XG4gIH1cbiAgdmFyIGthID0gb2JqZWN0S2V5cyhhKSxcbiAgICAgIGtiID0gb2JqZWN0S2V5cyhiKSxcbiAgICAgIGtleSwgaTtcbiAgLy8gaGF2aW5nIHRoZSBzYW1lIG51bWJlciBvZiBvd25lZCBwcm9wZXJ0aWVzIChrZXlzIGluY29ycG9yYXRlc1xuICAvLyBoYXNPd25Qcm9wZXJ0eSlcbiAgaWYgKGthLmxlbmd0aCAhPSBrYi5sZW5ndGgpXG4gICAgcmV0dXJuIGZhbHNlO1xuICAvL3RoZSBzYW1lIHNldCBvZiBrZXlzIChhbHRob3VnaCBub3QgbmVjZXNzYXJpbHkgdGhlIHNhbWUgb3JkZXIpLFxuICBrYS5zb3J0KCk7XG4gIGtiLnNvcnQoKTtcbiAgLy9+fn5jaGVhcCBrZXkgdGVzdFxuICBmb3IgKGkgPSBrYS5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgIGlmIChrYVtpXSAhPSBrYltpXSlcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICAvL2VxdWl2YWxlbnQgdmFsdWVzIGZvciBldmVyeSBjb3JyZXNwb25kaW5nIGtleSwgYW5kXG4gIC8vfn5+cG9zc2libHkgZXhwZW5zaXZlIGRlZXAgdGVzdFxuICBmb3IgKGkgPSBrYS5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgIGtleSA9IGthW2ldO1xuICAgIGlmICghX2RlZXBFcXVhbChhW2tleV0sIGJba2V5XSkpIHJldHVybiBmYWxzZTtcbiAgfVxuICByZXR1cm4gdHJ1ZTtcbn1cblxuLy8gOC4gVGhlIG5vbi1lcXVpdmFsZW5jZSBhc3NlcnRpb24gdGVzdHMgZm9yIGFueSBkZWVwIGluZXF1YWxpdHkuXG4vLyBhc3NlcnQubm90RGVlcEVxdWFsKGFjdHVhbCwgZXhwZWN0ZWQsIG1lc3NhZ2Vfb3B0KTtcblxuYXNzZXJ0Lm5vdERlZXBFcXVhbCA9IGZ1bmN0aW9uIG5vdERlZXBFcXVhbChhY3R1YWwsIGV4cGVjdGVkLCBtZXNzYWdlKSB7XG4gIGlmIChfZGVlcEVxdWFsKGFjdHVhbCwgZXhwZWN0ZWQpKSB7XG4gICAgZmFpbChhY3R1YWwsIGV4cGVjdGVkLCBtZXNzYWdlLCAnbm90RGVlcEVxdWFsJywgYXNzZXJ0Lm5vdERlZXBFcXVhbCk7XG4gIH1cbn07XG5cbi8vIDkuIFRoZSBzdHJpY3QgZXF1YWxpdHkgYXNzZXJ0aW9uIHRlc3RzIHN0cmljdCBlcXVhbGl0eSwgYXMgZGV0ZXJtaW5lZCBieSA9PT0uXG4vLyBhc3NlcnQuc3RyaWN0RXF1YWwoYWN0dWFsLCBleHBlY3RlZCwgbWVzc2FnZV9vcHQpO1xuXG5hc3NlcnQuc3RyaWN0RXF1YWwgPSBmdW5jdGlvbiBzdHJpY3RFcXVhbChhY3R1YWwsIGV4cGVjdGVkLCBtZXNzYWdlKSB7XG4gIGlmIChhY3R1YWwgIT09IGV4cGVjdGVkKSB7XG4gICAgZmFpbChhY3R1YWwsIGV4cGVjdGVkLCBtZXNzYWdlLCAnPT09JywgYXNzZXJ0LnN0cmljdEVxdWFsKTtcbiAgfVxufTtcblxuLy8gMTAuIFRoZSBzdHJpY3Qgbm9uLWVxdWFsaXR5IGFzc2VydGlvbiB0ZXN0cyBmb3Igc3RyaWN0IGluZXF1YWxpdHksIGFzXG4vLyBkZXRlcm1pbmVkIGJ5ICE9PS4gIGFzc2VydC5ub3RTdHJpY3RFcXVhbChhY3R1YWwsIGV4cGVjdGVkLCBtZXNzYWdlX29wdCk7XG5cbmFzc2VydC5ub3RTdHJpY3RFcXVhbCA9IGZ1bmN0aW9uIG5vdFN0cmljdEVxdWFsKGFjdHVhbCwgZXhwZWN0ZWQsIG1lc3NhZ2UpIHtcbiAgaWYgKGFjdHVhbCA9PT0gZXhwZWN0ZWQpIHtcbiAgICBmYWlsKGFjdHVhbCwgZXhwZWN0ZWQsIG1lc3NhZ2UsICchPT0nLCBhc3NlcnQubm90U3RyaWN0RXF1YWwpO1xuICB9XG59O1xuXG5mdW5jdGlvbiBleHBlY3RlZEV4Y2VwdGlvbihhY3R1YWwsIGV4cGVjdGVkKSB7XG4gIGlmICghYWN0dWFsIHx8ICFleHBlY3RlZCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGlmIChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoZXhwZWN0ZWQpID09ICdbb2JqZWN0IFJlZ0V4cF0nKSB7XG4gICAgcmV0dXJuIGV4cGVjdGVkLnRlc3QoYWN0dWFsKTtcbiAgfSBlbHNlIGlmIChhY3R1YWwgaW5zdGFuY2VvZiBleHBlY3RlZCkge1xuICAgIHJldHVybiB0cnVlO1xuICB9IGVsc2UgaWYgKGV4cGVjdGVkLmNhbGwoe30sIGFjdHVhbCkgPT09IHRydWUpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIHJldHVybiBmYWxzZTtcbn1cblxuZnVuY3Rpb24gX3Rocm93cyhzaG91bGRUaHJvdywgYmxvY2ssIGV4cGVjdGVkLCBtZXNzYWdlKSB7XG4gIHZhciBhY3R1YWw7XG5cbiAgaWYgKHV0aWwuaXNTdHJpbmcoZXhwZWN0ZWQpKSB7XG4gICAgbWVzc2FnZSA9IGV4cGVjdGVkO1xuICAgIGV4cGVjdGVkID0gbnVsbDtcbiAgfVxuXG4gIHRyeSB7XG4gICAgYmxvY2soKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIGFjdHVhbCA9IGU7XG4gIH1cblxuICBtZXNzYWdlID0gKGV4cGVjdGVkICYmIGV4cGVjdGVkLm5hbWUgPyAnICgnICsgZXhwZWN0ZWQubmFtZSArICcpLicgOiAnLicpICtcbiAgICAgICAgICAgIChtZXNzYWdlID8gJyAnICsgbWVzc2FnZSA6ICcuJyk7XG5cbiAgaWYgKHNob3VsZFRocm93ICYmICFhY3R1YWwpIHtcbiAgICBmYWlsKGFjdHVhbCwgZXhwZWN0ZWQsICdNaXNzaW5nIGV4cGVjdGVkIGV4Y2VwdGlvbicgKyBtZXNzYWdlKTtcbiAgfVxuXG4gIGlmICghc2hvdWxkVGhyb3cgJiYgZXhwZWN0ZWRFeGNlcHRpb24oYWN0dWFsLCBleHBlY3RlZCkpIHtcbiAgICBmYWlsKGFjdHVhbCwgZXhwZWN0ZWQsICdHb3QgdW53YW50ZWQgZXhjZXB0aW9uJyArIG1lc3NhZ2UpO1xuICB9XG5cbiAgaWYgKChzaG91bGRUaHJvdyAmJiBhY3R1YWwgJiYgZXhwZWN0ZWQgJiZcbiAgICAgICFleHBlY3RlZEV4Y2VwdGlvbihhY3R1YWwsIGV4cGVjdGVkKSkgfHwgKCFzaG91bGRUaHJvdyAmJiBhY3R1YWwpKSB7XG4gICAgdGhyb3cgYWN0dWFsO1xuICB9XG59XG5cbi8vIDExLiBFeHBlY3RlZCB0byB0aHJvdyBhbiBlcnJvcjpcbi8vIGFzc2VydC50aHJvd3MoYmxvY2ssIEVycm9yX29wdCwgbWVzc2FnZV9vcHQpO1xuXG5hc3NlcnQudGhyb3dzID0gZnVuY3Rpb24oYmxvY2ssIC8qb3B0aW9uYWwqL2Vycm9yLCAvKm9wdGlvbmFsKi9tZXNzYWdlKSB7XG4gIF90aHJvd3MuYXBwbHkodGhpcywgW3RydWVdLmNvbmNhdChwU2xpY2UuY2FsbChhcmd1bWVudHMpKSk7XG59O1xuXG4vLyBFWFRFTlNJT04hIFRoaXMgaXMgYW5ub3lpbmcgdG8gd3JpdGUgb3V0c2lkZSB0aGlzIG1vZHVsZS5cbmFzc2VydC5kb2VzTm90VGhyb3cgPSBmdW5jdGlvbihibG9jaywgLypvcHRpb25hbCovbWVzc2FnZSkge1xuICBfdGhyb3dzLmFwcGx5KHRoaXMsIFtmYWxzZV0uY29uY2F0KHBTbGljZS5jYWxsKGFyZ3VtZW50cykpKTtcbn07XG5cbmFzc2VydC5pZkVycm9yID0gZnVuY3Rpb24oZXJyKSB7IGlmIChlcnIpIHt0aHJvdyBlcnI7fX07XG5cbnZhciBvYmplY3RLZXlzID0gT2JqZWN0LmtleXMgfHwgZnVuY3Rpb24gKG9iaikge1xuICB2YXIga2V5cyA9IFtdO1xuICBmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG4gICAgaWYgKGhhc093bi5jYWxsKG9iaiwga2V5KSkga2V5cy5wdXNoKGtleSk7XG4gIH1cbiAgcmV0dXJuIGtleXM7XG59O1xuIiwiIiwiaWYgKHR5cGVvZiBPYmplY3QuY3JlYXRlID09PSAnZnVuY3Rpb24nKSB7XG4gIC8vIGltcGxlbWVudGF0aW9uIGZyb20gc3RhbmRhcmQgbm9kZS5qcyAndXRpbCcgbW9kdWxlXG4gIG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaW5oZXJpdHMoY3Rvciwgc3VwZXJDdG9yKSB7XG4gICAgY3Rvci5zdXBlcl8gPSBzdXBlckN0b3JcbiAgICBjdG9yLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDdG9yLnByb3RvdHlwZSwge1xuICAgICAgY29uc3RydWN0b3I6IHtcbiAgICAgICAgdmFsdWU6IGN0b3IsXG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgICB9XG4gICAgfSk7XG4gIH07XG59IGVsc2Uge1xuICAvLyBvbGQgc2Nob29sIHNoaW0gZm9yIG9sZCBicm93c2Vyc1xuICBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGluaGVyaXRzKGN0b3IsIHN1cGVyQ3Rvcikge1xuICAgIGN0b3Iuc3VwZXJfID0gc3VwZXJDdG9yXG4gICAgdmFyIFRlbXBDdG9yID0gZnVuY3Rpb24gKCkge31cbiAgICBUZW1wQ3Rvci5wcm90b3R5cGUgPSBzdXBlckN0b3IucHJvdG90eXBlXG4gICAgY3Rvci5wcm90b3R5cGUgPSBuZXcgVGVtcEN0b3IoKVxuICAgIGN0b3IucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gY3RvclxuICB9XG59XG4iLCIvLyBzaGltIGZvciB1c2luZyBwcm9jZXNzIGluIGJyb3dzZXJcblxudmFyIHByb2Nlc3MgPSBtb2R1bGUuZXhwb3J0cyA9IHt9O1xuXG4vLyBjYWNoZWQgZnJvbSB3aGF0ZXZlciBnbG9iYWwgaXMgcHJlc2VudCBzbyB0aGF0IHRlc3QgcnVubmVycyB0aGF0IHN0dWIgaXRcbi8vIGRvbid0IGJyZWFrIHRoaW5ncy4gIEJ1dCB3ZSBuZWVkIHRvIHdyYXAgaXQgaW4gYSB0cnkgY2F0Y2ggaW4gY2FzZSBpdCBpc1xuLy8gd3JhcHBlZCBpbiBzdHJpY3QgbW9kZSBjb2RlIHdoaWNoIGRvZXNuJ3QgZGVmaW5lIGFueSBnbG9iYWxzLiAgSXQncyBpbnNpZGUgYVxuLy8gZnVuY3Rpb24gYmVjYXVzZSB0cnkvY2F0Y2hlcyBkZW9wdGltaXplIGluIGNlcnRhaW4gZW5naW5lcy5cblxudmFyIGNhY2hlZFNldFRpbWVvdXQ7XG52YXIgY2FjaGVkQ2xlYXJUaW1lb3V0O1xuXG4oZnVuY3Rpb24gKCkge1xuICB0cnkge1xuICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICB9IGNhdGNoIChlKSB7XG4gICAgY2FjaGVkU2V0VGltZW91dCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignc2V0VGltZW91dCBpcyBub3QgZGVmaW5lZCcpO1xuICAgIH1cbiAgfVxuICB0cnkge1xuICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgfSBjYXRjaCAoZSkge1xuICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignY2xlYXJUaW1lb3V0IGlzIG5vdCBkZWZpbmVkJyk7XG4gICAgfVxuICB9XG59ICgpKVxudmFyIHF1ZXVlID0gW107XG52YXIgZHJhaW5pbmcgPSBmYWxzZTtcbnZhciBjdXJyZW50UXVldWU7XG52YXIgcXVldWVJbmRleCA9IC0xO1xuXG5mdW5jdGlvbiBjbGVhblVwTmV4dFRpY2soKSB7XG4gICAgaWYgKCFkcmFpbmluZyB8fCAhY3VycmVudFF1ZXVlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBpZiAoY3VycmVudFF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBxdWV1ZSA9IGN1cnJlbnRRdWV1ZS5jb25jYXQocXVldWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICB9XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBkcmFpblF1ZXVlKCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBkcmFpblF1ZXVlKCkge1xuICAgIGlmIChkcmFpbmluZykge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciB0aW1lb3V0ID0gY2FjaGVkU2V0VGltZW91dChjbGVhblVwTmV4dFRpY2spO1xuICAgIGRyYWluaW5nID0gdHJ1ZTtcblxuICAgIHZhciBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgd2hpbGUobGVuKSB7XG4gICAgICAgIGN1cnJlbnRRdWV1ZSA9IHF1ZXVlO1xuICAgICAgICBxdWV1ZSA9IFtdO1xuICAgICAgICB3aGlsZSAoKytxdWV1ZUluZGV4IDwgbGVuKSB7XG4gICAgICAgICAgICBpZiAoY3VycmVudFF1ZXVlKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudFF1ZXVlW3F1ZXVlSW5kZXhdLnJ1bigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICAgICAgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIH1cbiAgICBjdXJyZW50UXVldWUgPSBudWxsO1xuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgY2FjaGVkQ2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xufVxuXG5wcm9jZXNzLm5leHRUaWNrID0gZnVuY3Rpb24gKGZ1bikge1xuICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGggLSAxKTtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGFyZ3NbaSAtIDFdID0gYXJndW1lbnRzW2ldO1xuICAgICAgICB9XG4gICAgfVxuICAgIHF1ZXVlLnB1c2gobmV3IEl0ZW0oZnVuLCBhcmdzKSk7XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCA9PT0gMSAmJiAhZHJhaW5pbmcpIHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dChkcmFpblF1ZXVlLCAwKTtcbiAgICB9XG59O1xuXG4vLyB2OCBsaWtlcyBwcmVkaWN0aWJsZSBvYmplY3RzXG5mdW5jdGlvbiBJdGVtKGZ1biwgYXJyYXkpIHtcbiAgICB0aGlzLmZ1biA9IGZ1bjtcbiAgICB0aGlzLmFycmF5ID0gYXJyYXk7XG59XG5JdGVtLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5mdW4uYXBwbHkobnVsbCwgdGhpcy5hcnJheSk7XG59O1xucHJvY2Vzcy50aXRsZSA9ICdicm93c2VyJztcbnByb2Nlc3MuYnJvd3NlciA9IHRydWU7XG5wcm9jZXNzLmVudiA9IHt9O1xucHJvY2Vzcy5hcmd2ID0gW107XG5wcm9jZXNzLnZlcnNpb24gPSAnJzsgLy8gZW1wdHkgc3RyaW5nIHRvIGF2b2lkIHJlZ2V4cCBpc3N1ZXNcbnByb2Nlc3MudmVyc2lvbnMgPSB7fTtcblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbnByb2Nlc3Mub24gPSBub29wO1xucHJvY2Vzcy5hZGRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLm9uY2UgPSBub29wO1xucHJvY2Vzcy5vZmYgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUFsbExpc3RlbmVycyA9IG5vb3A7XG5wcm9jZXNzLmVtaXQgPSBub29wO1xuXG5wcm9jZXNzLmJpbmRpbmcgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5iaW5kaW5nIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5cbnByb2Nlc3MuY3dkID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gJy8nIH07XG5wcm9jZXNzLmNoZGlyID0gZnVuY3Rpb24gKGRpcikge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5jaGRpciBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xucHJvY2Vzcy51bWFzayA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gMDsgfTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaXNCdWZmZXIoYXJnKSB7XG4gIHJldHVybiBhcmcgJiYgdHlwZW9mIGFyZyA9PT0gJ29iamVjdCdcbiAgICAmJiB0eXBlb2YgYXJnLmNvcHkgPT09ICdmdW5jdGlvbidcbiAgICAmJiB0eXBlb2YgYXJnLmZpbGwgPT09ICdmdW5jdGlvbidcbiAgICAmJiB0eXBlb2YgYXJnLnJlYWRVSW50OCA9PT0gJ2Z1bmN0aW9uJztcbn0iLCIvLyBDb3B5cmlnaHQgSm95ZW50LCBJbmMuIGFuZCBvdGhlciBOb2RlIGNvbnRyaWJ1dG9ycy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYVxuLy8gY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZVxuLy8gXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nXG4vLyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsXG4vLyBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0XG4vLyBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGVcbi8vIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkXG4vLyBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTXG4vLyBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GXG4vLyBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOXG4vLyBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSxcbi8vIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUlxuLy8gT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRVxuLy8gVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cblxudmFyIGZvcm1hdFJlZ0V4cCA9IC8lW3NkaiVdL2c7XG5leHBvcnRzLmZvcm1hdCA9IGZ1bmN0aW9uKGYpIHtcbiAgaWYgKCFpc1N0cmluZyhmKSkge1xuICAgIHZhciBvYmplY3RzID0gW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIG9iamVjdHMucHVzaChpbnNwZWN0KGFyZ3VtZW50c1tpXSkpO1xuICAgIH1cbiAgICByZXR1cm4gb2JqZWN0cy5qb2luKCcgJyk7XG4gIH1cblxuICB2YXIgaSA9IDE7XG4gIHZhciBhcmdzID0gYXJndW1lbnRzO1xuICB2YXIgbGVuID0gYXJncy5sZW5ndGg7XG4gIHZhciBzdHIgPSBTdHJpbmcoZikucmVwbGFjZShmb3JtYXRSZWdFeHAsIGZ1bmN0aW9uKHgpIHtcbiAgICBpZiAoeCA9PT0gJyUlJykgcmV0dXJuICclJztcbiAgICBpZiAoaSA+PSBsZW4pIHJldHVybiB4O1xuICAgIHN3aXRjaCAoeCkge1xuICAgICAgY2FzZSAnJXMnOiByZXR1cm4gU3RyaW5nKGFyZ3NbaSsrXSk7XG4gICAgICBjYXNlICclZCc6IHJldHVybiBOdW1iZXIoYXJnc1tpKytdKTtcbiAgICAgIGNhc2UgJyVqJzpcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoYXJnc1tpKytdKTtcbiAgICAgICAgfSBjYXRjaCAoXykge1xuICAgICAgICAgIHJldHVybiAnW0NpcmN1bGFyXSc7XG4gICAgICAgIH1cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiB4O1xuICAgIH1cbiAgfSk7XG4gIGZvciAodmFyIHggPSBhcmdzW2ldOyBpIDwgbGVuOyB4ID0gYXJnc1srK2ldKSB7XG4gICAgaWYgKGlzTnVsbCh4KSB8fCAhaXNPYmplY3QoeCkpIHtcbiAgICAgIHN0ciArPSAnICcgKyB4O1xuICAgIH0gZWxzZSB7XG4gICAgICBzdHIgKz0gJyAnICsgaW5zcGVjdCh4KTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHN0cjtcbn07XG5cblxuLy8gTWFyayB0aGF0IGEgbWV0aG9kIHNob3VsZCBub3QgYmUgdXNlZC5cbi8vIFJldHVybnMgYSBtb2RpZmllZCBmdW5jdGlvbiB3aGljaCB3YXJucyBvbmNlIGJ5IGRlZmF1bHQuXG4vLyBJZiAtLW5vLWRlcHJlY2F0aW9uIGlzIHNldCwgdGhlbiBpdCBpcyBhIG5vLW9wLlxuZXhwb3J0cy5kZXByZWNhdGUgPSBmdW5jdGlvbihmbiwgbXNnKSB7XG4gIC8vIEFsbG93IGZvciBkZXByZWNhdGluZyB0aGluZ3MgaW4gdGhlIHByb2Nlc3Mgb2Ygc3RhcnRpbmcgdXAuXG4gIGlmIChpc1VuZGVmaW5lZChnbG9iYWwucHJvY2VzcykpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gZXhwb3J0cy5kZXByZWNhdGUoZm4sIG1zZykuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9O1xuICB9XG5cbiAgaWYgKHByb2Nlc3Mubm9EZXByZWNhdGlvbiA9PT0gdHJ1ZSkge1xuICAgIHJldHVybiBmbjtcbiAgfVxuXG4gIHZhciB3YXJuZWQgPSBmYWxzZTtcbiAgZnVuY3Rpb24gZGVwcmVjYXRlZCgpIHtcbiAgICBpZiAoIXdhcm5lZCkge1xuICAgICAgaWYgKHByb2Nlc3MudGhyb3dEZXByZWNhdGlvbikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IobXNnKTtcbiAgICAgIH0gZWxzZSBpZiAocHJvY2Vzcy50cmFjZURlcHJlY2F0aW9uKSB7XG4gICAgICAgIGNvbnNvbGUudHJhY2UobXNnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IobXNnKTtcbiAgICAgIH1cbiAgICAgIHdhcm5lZCA9IHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICB9XG5cbiAgcmV0dXJuIGRlcHJlY2F0ZWQ7XG59O1xuXG5cbnZhciBkZWJ1Z3MgPSB7fTtcbnZhciBkZWJ1Z0Vudmlyb247XG5leHBvcnRzLmRlYnVnbG9nID0gZnVuY3Rpb24oc2V0KSB7XG4gIGlmIChpc1VuZGVmaW5lZChkZWJ1Z0Vudmlyb24pKVxuICAgIGRlYnVnRW52aXJvbiA9IHByb2Nlc3MuZW52Lk5PREVfREVCVUcgfHwgJyc7XG4gIHNldCA9IHNldC50b1VwcGVyQ2FzZSgpO1xuICBpZiAoIWRlYnVnc1tzZXRdKSB7XG4gICAgaWYgKG5ldyBSZWdFeHAoJ1xcXFxiJyArIHNldCArICdcXFxcYicsICdpJykudGVzdChkZWJ1Z0Vudmlyb24pKSB7XG4gICAgICB2YXIgcGlkID0gcHJvY2Vzcy5waWQ7XG4gICAgICBkZWJ1Z3Nbc2V0XSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgbXNnID0gZXhwb3J0cy5mb3JtYXQuYXBwbHkoZXhwb3J0cywgYXJndW1lbnRzKTtcbiAgICAgICAgY29uc29sZS5lcnJvcignJXMgJWQ6ICVzJywgc2V0LCBwaWQsIG1zZyk7XG4gICAgICB9O1xuICAgIH0gZWxzZSB7XG4gICAgICBkZWJ1Z3Nbc2V0XSA9IGZ1bmN0aW9uKCkge307XG4gICAgfVxuICB9XG4gIHJldHVybiBkZWJ1Z3Nbc2V0XTtcbn07XG5cblxuLyoqXG4gKiBFY2hvcyB0aGUgdmFsdWUgb2YgYSB2YWx1ZS4gVHJ5cyB0byBwcmludCB0aGUgdmFsdWUgb3V0XG4gKiBpbiB0aGUgYmVzdCB3YXkgcG9zc2libGUgZ2l2ZW4gdGhlIGRpZmZlcmVudCB0eXBlcy5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqIFRoZSBvYmplY3QgdG8gcHJpbnQgb3V0LlxuICogQHBhcmFtIHtPYmplY3R9IG9wdHMgT3B0aW9uYWwgb3B0aW9ucyBvYmplY3QgdGhhdCBhbHRlcnMgdGhlIG91dHB1dC5cbiAqL1xuLyogbGVnYWN5OiBvYmosIHNob3dIaWRkZW4sIGRlcHRoLCBjb2xvcnMqL1xuZnVuY3Rpb24gaW5zcGVjdChvYmosIG9wdHMpIHtcbiAgLy8gZGVmYXVsdCBvcHRpb25zXG4gIHZhciBjdHggPSB7XG4gICAgc2VlbjogW10sXG4gICAgc3R5bGl6ZTogc3R5bGl6ZU5vQ29sb3JcbiAgfTtcbiAgLy8gbGVnYWN5Li4uXG4gIGlmIChhcmd1bWVudHMubGVuZ3RoID49IDMpIGN0eC5kZXB0aCA9IGFyZ3VtZW50c1syXTtcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPj0gNCkgY3R4LmNvbG9ycyA9IGFyZ3VtZW50c1szXTtcbiAgaWYgKGlzQm9vbGVhbihvcHRzKSkge1xuICAgIC8vIGxlZ2FjeS4uLlxuICAgIGN0eC5zaG93SGlkZGVuID0gb3B0cztcbiAgfSBlbHNlIGlmIChvcHRzKSB7XG4gICAgLy8gZ290IGFuIFwib3B0aW9uc1wiIG9iamVjdFxuICAgIGV4cG9ydHMuX2V4dGVuZChjdHgsIG9wdHMpO1xuICB9XG4gIC8vIHNldCBkZWZhdWx0IG9wdGlvbnNcbiAgaWYgKGlzVW5kZWZpbmVkKGN0eC5zaG93SGlkZGVuKSkgY3R4LnNob3dIaWRkZW4gPSBmYWxzZTtcbiAgaWYgKGlzVW5kZWZpbmVkKGN0eC5kZXB0aCkpIGN0eC5kZXB0aCA9IDI7XG4gIGlmIChpc1VuZGVmaW5lZChjdHguY29sb3JzKSkgY3R4LmNvbG9ycyA9IGZhbHNlO1xuICBpZiAoaXNVbmRlZmluZWQoY3R4LmN1c3RvbUluc3BlY3QpKSBjdHguY3VzdG9tSW5zcGVjdCA9IHRydWU7XG4gIGlmIChjdHguY29sb3JzKSBjdHguc3R5bGl6ZSA9IHN0eWxpemVXaXRoQ29sb3I7XG4gIHJldHVybiBmb3JtYXRWYWx1ZShjdHgsIG9iaiwgY3R4LmRlcHRoKTtcbn1cbmV4cG9ydHMuaW5zcGVjdCA9IGluc3BlY3Q7XG5cblxuLy8gaHR0cDovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9BTlNJX2VzY2FwZV9jb2RlI2dyYXBoaWNzXG5pbnNwZWN0LmNvbG9ycyA9IHtcbiAgJ2JvbGQnIDogWzEsIDIyXSxcbiAgJ2l0YWxpYycgOiBbMywgMjNdLFxuICAndW5kZXJsaW5lJyA6IFs0LCAyNF0sXG4gICdpbnZlcnNlJyA6IFs3LCAyN10sXG4gICd3aGl0ZScgOiBbMzcsIDM5XSxcbiAgJ2dyZXknIDogWzkwLCAzOV0sXG4gICdibGFjaycgOiBbMzAsIDM5XSxcbiAgJ2JsdWUnIDogWzM0LCAzOV0sXG4gICdjeWFuJyA6IFszNiwgMzldLFxuICAnZ3JlZW4nIDogWzMyLCAzOV0sXG4gICdtYWdlbnRhJyA6IFszNSwgMzldLFxuICAncmVkJyA6IFszMSwgMzldLFxuICAneWVsbG93JyA6IFszMywgMzldXG59O1xuXG4vLyBEb24ndCB1c2UgJ2JsdWUnIG5vdCB2aXNpYmxlIG9uIGNtZC5leGVcbmluc3BlY3Quc3R5bGVzID0ge1xuICAnc3BlY2lhbCc6ICdjeWFuJyxcbiAgJ251bWJlcic6ICd5ZWxsb3cnLFxuICAnYm9vbGVhbic6ICd5ZWxsb3cnLFxuICAndW5kZWZpbmVkJzogJ2dyZXknLFxuICAnbnVsbCc6ICdib2xkJyxcbiAgJ3N0cmluZyc6ICdncmVlbicsXG4gICdkYXRlJzogJ21hZ2VudGEnLFxuICAvLyBcIm5hbWVcIjogaW50ZW50aW9uYWxseSBub3Qgc3R5bGluZ1xuICAncmVnZXhwJzogJ3JlZCdcbn07XG5cblxuZnVuY3Rpb24gc3R5bGl6ZVdpdGhDb2xvcihzdHIsIHN0eWxlVHlwZSkge1xuICB2YXIgc3R5bGUgPSBpbnNwZWN0LnN0eWxlc1tzdHlsZVR5cGVdO1xuXG4gIGlmIChzdHlsZSkge1xuICAgIHJldHVybiAnXFx1MDAxYlsnICsgaW5zcGVjdC5jb2xvcnNbc3R5bGVdWzBdICsgJ20nICsgc3RyICtcbiAgICAgICAgICAgJ1xcdTAwMWJbJyArIGluc3BlY3QuY29sb3JzW3N0eWxlXVsxXSArICdtJztcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gc3RyO1xuICB9XG59XG5cblxuZnVuY3Rpb24gc3R5bGl6ZU5vQ29sb3Ioc3RyLCBzdHlsZVR5cGUpIHtcbiAgcmV0dXJuIHN0cjtcbn1cblxuXG5mdW5jdGlvbiBhcnJheVRvSGFzaChhcnJheSkge1xuICB2YXIgaGFzaCA9IHt9O1xuXG4gIGFycmF5LmZvckVhY2goZnVuY3Rpb24odmFsLCBpZHgpIHtcbiAgICBoYXNoW3ZhbF0gPSB0cnVlO1xuICB9KTtcblxuICByZXR1cm4gaGFzaDtcbn1cblxuXG5mdW5jdGlvbiBmb3JtYXRWYWx1ZShjdHgsIHZhbHVlLCByZWN1cnNlVGltZXMpIHtcbiAgLy8gUHJvdmlkZSBhIGhvb2sgZm9yIHVzZXItc3BlY2lmaWVkIGluc3BlY3QgZnVuY3Rpb25zLlxuICAvLyBDaGVjayB0aGF0IHZhbHVlIGlzIGFuIG9iamVjdCB3aXRoIGFuIGluc3BlY3QgZnVuY3Rpb24gb24gaXRcbiAgaWYgKGN0eC5jdXN0b21JbnNwZWN0ICYmXG4gICAgICB2YWx1ZSAmJlxuICAgICAgaXNGdW5jdGlvbih2YWx1ZS5pbnNwZWN0KSAmJlxuICAgICAgLy8gRmlsdGVyIG91dCB0aGUgdXRpbCBtb2R1bGUsIGl0J3MgaW5zcGVjdCBmdW5jdGlvbiBpcyBzcGVjaWFsXG4gICAgICB2YWx1ZS5pbnNwZWN0ICE9PSBleHBvcnRzLmluc3BlY3QgJiZcbiAgICAgIC8vIEFsc28gZmlsdGVyIG91dCBhbnkgcHJvdG90eXBlIG9iamVjdHMgdXNpbmcgdGhlIGNpcmN1bGFyIGNoZWNrLlxuICAgICAgISh2YWx1ZS5jb25zdHJ1Y3RvciAmJiB2YWx1ZS5jb25zdHJ1Y3Rvci5wcm90b3R5cGUgPT09IHZhbHVlKSkge1xuICAgIHZhciByZXQgPSB2YWx1ZS5pbnNwZWN0KHJlY3Vyc2VUaW1lcywgY3R4KTtcbiAgICBpZiAoIWlzU3RyaW5nKHJldCkpIHtcbiAgICAgIHJldCA9IGZvcm1hdFZhbHVlKGN0eCwgcmV0LCByZWN1cnNlVGltZXMpO1xuICAgIH1cbiAgICByZXR1cm4gcmV0O1xuICB9XG5cbiAgLy8gUHJpbWl0aXZlIHR5cGVzIGNhbm5vdCBoYXZlIHByb3BlcnRpZXNcbiAgdmFyIHByaW1pdGl2ZSA9IGZvcm1hdFByaW1pdGl2ZShjdHgsIHZhbHVlKTtcbiAgaWYgKHByaW1pdGl2ZSkge1xuICAgIHJldHVybiBwcmltaXRpdmU7XG4gIH1cblxuICAvLyBMb29rIHVwIHRoZSBrZXlzIG9mIHRoZSBvYmplY3QuXG4gIHZhciBrZXlzID0gT2JqZWN0LmtleXModmFsdWUpO1xuICB2YXIgdmlzaWJsZUtleXMgPSBhcnJheVRvSGFzaChrZXlzKTtcblxuICBpZiAoY3R4LnNob3dIaWRkZW4pIHtcbiAgICBrZXlzID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModmFsdWUpO1xuICB9XG5cbiAgLy8gSUUgZG9lc24ndCBtYWtlIGVycm9yIGZpZWxkcyBub24tZW51bWVyYWJsZVxuICAvLyBodHRwOi8vbXNkbi5taWNyb3NvZnQuY29tL2VuLXVzL2xpYnJhcnkvaWUvZHd3NTJzYnQodj12cy45NCkuYXNweFxuICBpZiAoaXNFcnJvcih2YWx1ZSlcbiAgICAgICYmIChrZXlzLmluZGV4T2YoJ21lc3NhZ2UnKSA+PSAwIHx8IGtleXMuaW5kZXhPZignZGVzY3JpcHRpb24nKSA+PSAwKSkge1xuICAgIHJldHVybiBmb3JtYXRFcnJvcih2YWx1ZSk7XG4gIH1cblxuICAvLyBTb21lIHR5cGUgb2Ygb2JqZWN0IHdpdGhvdXQgcHJvcGVydGllcyBjYW4gYmUgc2hvcnRjdXR0ZWQuXG4gIGlmIChrZXlzLmxlbmd0aCA9PT0gMCkge1xuICAgIGlmIChpc0Z1bmN0aW9uKHZhbHVlKSkge1xuICAgICAgdmFyIG5hbWUgPSB2YWx1ZS5uYW1lID8gJzogJyArIHZhbHVlLm5hbWUgOiAnJztcbiAgICAgIHJldHVybiBjdHguc3R5bGl6ZSgnW0Z1bmN0aW9uJyArIG5hbWUgKyAnXScsICdzcGVjaWFsJyk7XG4gICAgfVxuICAgIGlmIChpc1JlZ0V4cCh2YWx1ZSkpIHtcbiAgICAgIHJldHVybiBjdHguc3R5bGl6ZShSZWdFeHAucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodmFsdWUpLCAncmVnZXhwJyk7XG4gICAgfVxuICAgIGlmIChpc0RhdGUodmFsdWUpKSB7XG4gICAgICByZXR1cm4gY3R4LnN0eWxpemUoRGF0ZS5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh2YWx1ZSksICdkYXRlJyk7XG4gICAgfVxuICAgIGlmIChpc0Vycm9yKHZhbHVlKSkge1xuICAgICAgcmV0dXJuIGZvcm1hdEVycm9yKHZhbHVlKTtcbiAgICB9XG4gIH1cblxuICB2YXIgYmFzZSA9ICcnLCBhcnJheSA9IGZhbHNlLCBicmFjZXMgPSBbJ3snLCAnfSddO1xuXG4gIC8vIE1ha2UgQXJyYXkgc2F5IHRoYXQgdGhleSBhcmUgQXJyYXlcbiAgaWYgKGlzQXJyYXkodmFsdWUpKSB7XG4gICAgYXJyYXkgPSB0cnVlO1xuICAgIGJyYWNlcyA9IFsnWycsICddJ107XG4gIH1cblxuICAvLyBNYWtlIGZ1bmN0aW9ucyBzYXkgdGhhdCB0aGV5IGFyZSBmdW5jdGlvbnNcbiAgaWYgKGlzRnVuY3Rpb24odmFsdWUpKSB7XG4gICAgdmFyIG4gPSB2YWx1ZS5uYW1lID8gJzogJyArIHZhbHVlLm5hbWUgOiAnJztcbiAgICBiYXNlID0gJyBbRnVuY3Rpb24nICsgbiArICddJztcbiAgfVxuXG4gIC8vIE1ha2UgUmVnRXhwcyBzYXkgdGhhdCB0aGV5IGFyZSBSZWdFeHBzXG4gIGlmIChpc1JlZ0V4cCh2YWx1ZSkpIHtcbiAgICBiYXNlID0gJyAnICsgUmVnRXhwLnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHZhbHVlKTtcbiAgfVxuXG4gIC8vIE1ha2UgZGF0ZXMgd2l0aCBwcm9wZXJ0aWVzIGZpcnN0IHNheSB0aGUgZGF0ZVxuICBpZiAoaXNEYXRlKHZhbHVlKSkge1xuICAgIGJhc2UgPSAnICcgKyBEYXRlLnByb3RvdHlwZS50b1VUQ1N0cmluZy5jYWxsKHZhbHVlKTtcbiAgfVxuXG4gIC8vIE1ha2UgZXJyb3Igd2l0aCBtZXNzYWdlIGZpcnN0IHNheSB0aGUgZXJyb3JcbiAgaWYgKGlzRXJyb3IodmFsdWUpKSB7XG4gICAgYmFzZSA9ICcgJyArIGZvcm1hdEVycm9yKHZhbHVlKTtcbiAgfVxuXG4gIGlmIChrZXlzLmxlbmd0aCA9PT0gMCAmJiAoIWFycmF5IHx8IHZhbHVlLmxlbmd0aCA9PSAwKSkge1xuICAgIHJldHVybiBicmFjZXNbMF0gKyBiYXNlICsgYnJhY2VzWzFdO1xuICB9XG5cbiAgaWYgKHJlY3Vyc2VUaW1lcyA8IDApIHtcbiAgICBpZiAoaXNSZWdFeHAodmFsdWUpKSB7XG4gICAgICByZXR1cm4gY3R4LnN0eWxpemUoUmVnRXhwLnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHZhbHVlKSwgJ3JlZ2V4cCcpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gY3R4LnN0eWxpemUoJ1tPYmplY3RdJywgJ3NwZWNpYWwnKTtcbiAgICB9XG4gIH1cblxuICBjdHguc2Vlbi5wdXNoKHZhbHVlKTtcblxuICB2YXIgb3V0cHV0O1xuICBpZiAoYXJyYXkpIHtcbiAgICBvdXRwdXQgPSBmb3JtYXRBcnJheShjdHgsIHZhbHVlLCByZWN1cnNlVGltZXMsIHZpc2libGVLZXlzLCBrZXlzKTtcbiAgfSBlbHNlIHtcbiAgICBvdXRwdXQgPSBrZXlzLm1hcChmdW5jdGlvbihrZXkpIHtcbiAgICAgIHJldHVybiBmb3JtYXRQcm9wZXJ0eShjdHgsIHZhbHVlLCByZWN1cnNlVGltZXMsIHZpc2libGVLZXlzLCBrZXksIGFycmF5KTtcbiAgICB9KTtcbiAgfVxuXG4gIGN0eC5zZWVuLnBvcCgpO1xuXG4gIHJldHVybiByZWR1Y2VUb1NpbmdsZVN0cmluZyhvdXRwdXQsIGJhc2UsIGJyYWNlcyk7XG59XG5cblxuZnVuY3Rpb24gZm9ybWF0UHJpbWl0aXZlKGN0eCwgdmFsdWUpIHtcbiAgaWYgKGlzVW5kZWZpbmVkKHZhbHVlKSlcbiAgICByZXR1cm4gY3R4LnN0eWxpemUoJ3VuZGVmaW5lZCcsICd1bmRlZmluZWQnKTtcbiAgaWYgKGlzU3RyaW5nKHZhbHVlKSkge1xuICAgIHZhciBzaW1wbGUgPSAnXFwnJyArIEpTT04uc3RyaW5naWZ5KHZhbHVlKS5yZXBsYWNlKC9eXCJ8XCIkL2csICcnKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoLycvZywgXCJcXFxcJ1wiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoL1xcXFxcIi9nLCAnXCInKSArICdcXCcnO1xuICAgIHJldHVybiBjdHguc3R5bGl6ZShzaW1wbGUsICdzdHJpbmcnKTtcbiAgfVxuICBpZiAoaXNOdW1iZXIodmFsdWUpKVxuICAgIHJldHVybiBjdHguc3R5bGl6ZSgnJyArIHZhbHVlLCAnbnVtYmVyJyk7XG4gIGlmIChpc0Jvb2xlYW4odmFsdWUpKVxuICAgIHJldHVybiBjdHguc3R5bGl6ZSgnJyArIHZhbHVlLCAnYm9vbGVhbicpO1xuICAvLyBGb3Igc29tZSByZWFzb24gdHlwZW9mIG51bGwgaXMgXCJvYmplY3RcIiwgc28gc3BlY2lhbCBjYXNlIGhlcmUuXG4gIGlmIChpc051bGwodmFsdWUpKVxuICAgIHJldHVybiBjdHguc3R5bGl6ZSgnbnVsbCcsICdudWxsJyk7XG59XG5cblxuZnVuY3Rpb24gZm9ybWF0RXJyb3IodmFsdWUpIHtcbiAgcmV0dXJuICdbJyArIEVycm9yLnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHZhbHVlKSArICddJztcbn1cblxuXG5mdW5jdGlvbiBmb3JtYXRBcnJheShjdHgsIHZhbHVlLCByZWN1cnNlVGltZXMsIHZpc2libGVLZXlzLCBrZXlzKSB7XG4gIHZhciBvdXRwdXQgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDAsIGwgPSB2YWx1ZS5sZW5ndGg7IGkgPCBsOyArK2kpIHtcbiAgICBpZiAoaGFzT3duUHJvcGVydHkodmFsdWUsIFN0cmluZyhpKSkpIHtcbiAgICAgIG91dHB1dC5wdXNoKGZvcm1hdFByb3BlcnR5KGN0eCwgdmFsdWUsIHJlY3Vyc2VUaW1lcywgdmlzaWJsZUtleXMsXG4gICAgICAgICAgU3RyaW5nKGkpLCB0cnVlKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG91dHB1dC5wdXNoKCcnKTtcbiAgICB9XG4gIH1cbiAga2V5cy5mb3JFYWNoKGZ1bmN0aW9uKGtleSkge1xuICAgIGlmICgha2V5Lm1hdGNoKC9eXFxkKyQvKSkge1xuICAgICAgb3V0cHV0LnB1c2goZm9ybWF0UHJvcGVydHkoY3R4LCB2YWx1ZSwgcmVjdXJzZVRpbWVzLCB2aXNpYmxlS2V5cyxcbiAgICAgICAgICBrZXksIHRydWUpKTtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gb3V0cHV0O1xufVxuXG5cbmZ1bmN0aW9uIGZvcm1hdFByb3BlcnR5KGN0eCwgdmFsdWUsIHJlY3Vyc2VUaW1lcywgdmlzaWJsZUtleXMsIGtleSwgYXJyYXkpIHtcbiAgdmFyIG5hbWUsIHN0ciwgZGVzYztcbiAgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodmFsdWUsIGtleSkgfHwgeyB2YWx1ZTogdmFsdWVba2V5XSB9O1xuICBpZiAoZGVzYy5nZXQpIHtcbiAgICBpZiAoZGVzYy5zZXQpIHtcbiAgICAgIHN0ciA9IGN0eC5zdHlsaXplKCdbR2V0dGVyL1NldHRlcl0nLCAnc3BlY2lhbCcpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdHIgPSBjdHguc3R5bGl6ZSgnW0dldHRlcl0nLCAnc3BlY2lhbCcpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBpZiAoZGVzYy5zZXQpIHtcbiAgICAgIHN0ciA9IGN0eC5zdHlsaXplKCdbU2V0dGVyXScsICdzcGVjaWFsJyk7XG4gICAgfVxuICB9XG4gIGlmICghaGFzT3duUHJvcGVydHkodmlzaWJsZUtleXMsIGtleSkpIHtcbiAgICBuYW1lID0gJ1snICsga2V5ICsgJ10nO1xuICB9XG4gIGlmICghc3RyKSB7XG4gICAgaWYgKGN0eC5zZWVuLmluZGV4T2YoZGVzYy52YWx1ZSkgPCAwKSB7XG4gICAgICBpZiAoaXNOdWxsKHJlY3Vyc2VUaW1lcykpIHtcbiAgICAgICAgc3RyID0gZm9ybWF0VmFsdWUoY3R4LCBkZXNjLnZhbHVlLCBudWxsKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHN0ciA9IGZvcm1hdFZhbHVlKGN0eCwgZGVzYy52YWx1ZSwgcmVjdXJzZVRpbWVzIC0gMSk7XG4gICAgICB9XG4gICAgICBpZiAoc3RyLmluZGV4T2YoJ1xcbicpID4gLTEpIHtcbiAgICAgICAgaWYgKGFycmF5KSB7XG4gICAgICAgICAgc3RyID0gc3RyLnNwbGl0KCdcXG4nKS5tYXAoZnVuY3Rpb24obGluZSkge1xuICAgICAgICAgICAgcmV0dXJuICcgICcgKyBsaW5lO1xuICAgICAgICAgIH0pLmpvaW4oJ1xcbicpLnN1YnN0cigyKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzdHIgPSAnXFxuJyArIHN0ci5zcGxpdCgnXFxuJykubWFwKGZ1bmN0aW9uKGxpbmUpIHtcbiAgICAgICAgICAgIHJldHVybiAnICAgJyArIGxpbmU7XG4gICAgICAgICAgfSkuam9pbignXFxuJyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgc3RyID0gY3R4LnN0eWxpemUoJ1tDaXJjdWxhcl0nLCAnc3BlY2lhbCcpO1xuICAgIH1cbiAgfVxuICBpZiAoaXNVbmRlZmluZWQobmFtZSkpIHtcbiAgICBpZiAoYXJyYXkgJiYga2V5Lm1hdGNoKC9eXFxkKyQvKSkge1xuICAgICAgcmV0dXJuIHN0cjtcbiAgICB9XG4gICAgbmFtZSA9IEpTT04uc3RyaW5naWZ5KCcnICsga2V5KTtcbiAgICBpZiAobmFtZS5tYXRjaCgvXlwiKFthLXpBLVpfXVthLXpBLVpfMC05XSopXCIkLykpIHtcbiAgICAgIG5hbWUgPSBuYW1lLnN1YnN0cigxLCBuYW1lLmxlbmd0aCAtIDIpO1xuICAgICAgbmFtZSA9IGN0eC5zdHlsaXplKG5hbWUsICduYW1lJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG5hbWUgPSBuYW1lLnJlcGxhY2UoLycvZywgXCJcXFxcJ1wiKVxuICAgICAgICAgICAgICAgICAucmVwbGFjZSgvXFxcXFwiL2csICdcIicpXG4gICAgICAgICAgICAgICAgIC5yZXBsYWNlKC8oXlwifFwiJCkvZywgXCInXCIpO1xuICAgICAgbmFtZSA9IGN0eC5zdHlsaXplKG5hbWUsICdzdHJpbmcnKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gbmFtZSArICc6ICcgKyBzdHI7XG59XG5cblxuZnVuY3Rpb24gcmVkdWNlVG9TaW5nbGVTdHJpbmcob3V0cHV0LCBiYXNlLCBicmFjZXMpIHtcbiAgdmFyIG51bUxpbmVzRXN0ID0gMDtcbiAgdmFyIGxlbmd0aCA9IG91dHB1dC5yZWR1Y2UoZnVuY3Rpb24ocHJldiwgY3VyKSB7XG4gICAgbnVtTGluZXNFc3QrKztcbiAgICBpZiAoY3VyLmluZGV4T2YoJ1xcbicpID49IDApIG51bUxpbmVzRXN0Kys7XG4gICAgcmV0dXJuIHByZXYgKyBjdXIucmVwbGFjZSgvXFx1MDAxYlxcW1xcZFxcZD9tL2csICcnKS5sZW5ndGggKyAxO1xuICB9LCAwKTtcblxuICBpZiAobGVuZ3RoID4gNjApIHtcbiAgICByZXR1cm4gYnJhY2VzWzBdICtcbiAgICAgICAgICAgKGJhc2UgPT09ICcnID8gJycgOiBiYXNlICsgJ1xcbiAnKSArXG4gICAgICAgICAgICcgJyArXG4gICAgICAgICAgIG91dHB1dC5qb2luKCcsXFxuICAnKSArXG4gICAgICAgICAgICcgJyArXG4gICAgICAgICAgIGJyYWNlc1sxXTtcbiAgfVxuXG4gIHJldHVybiBicmFjZXNbMF0gKyBiYXNlICsgJyAnICsgb3V0cHV0LmpvaW4oJywgJykgKyAnICcgKyBicmFjZXNbMV07XG59XG5cblxuLy8gTk9URTogVGhlc2UgdHlwZSBjaGVja2luZyBmdW5jdGlvbnMgaW50ZW50aW9uYWxseSBkb24ndCB1c2UgYGluc3RhbmNlb2ZgXG4vLyBiZWNhdXNlIGl0IGlzIGZyYWdpbGUgYW5kIGNhbiBiZSBlYXNpbHkgZmFrZWQgd2l0aCBgT2JqZWN0LmNyZWF0ZSgpYC5cbmZ1bmN0aW9uIGlzQXJyYXkoYXIpIHtcbiAgcmV0dXJuIEFycmF5LmlzQXJyYXkoYXIpO1xufVxuZXhwb3J0cy5pc0FycmF5ID0gaXNBcnJheTtcblxuZnVuY3Rpb24gaXNCb29sZWFuKGFyZykge1xuICByZXR1cm4gdHlwZW9mIGFyZyA9PT0gJ2Jvb2xlYW4nO1xufVxuZXhwb3J0cy5pc0Jvb2xlYW4gPSBpc0Jvb2xlYW47XG5cbmZ1bmN0aW9uIGlzTnVsbChhcmcpIHtcbiAgcmV0dXJuIGFyZyA9PT0gbnVsbDtcbn1cbmV4cG9ydHMuaXNOdWxsID0gaXNOdWxsO1xuXG5mdW5jdGlvbiBpc051bGxPclVuZGVmaW5lZChhcmcpIHtcbiAgcmV0dXJuIGFyZyA9PSBudWxsO1xufVxuZXhwb3J0cy5pc051bGxPclVuZGVmaW5lZCA9IGlzTnVsbE9yVW5kZWZpbmVkO1xuXG5mdW5jdGlvbiBpc051bWJlcihhcmcpIHtcbiAgcmV0dXJuIHR5cGVvZiBhcmcgPT09ICdudW1iZXInO1xufVxuZXhwb3J0cy5pc051bWJlciA9IGlzTnVtYmVyO1xuXG5mdW5jdGlvbiBpc1N0cmluZyhhcmcpIHtcbiAgcmV0dXJuIHR5cGVvZiBhcmcgPT09ICdzdHJpbmcnO1xufVxuZXhwb3J0cy5pc1N0cmluZyA9IGlzU3RyaW5nO1xuXG5mdW5jdGlvbiBpc1N5bWJvbChhcmcpIHtcbiAgcmV0dXJuIHR5cGVvZiBhcmcgPT09ICdzeW1ib2wnO1xufVxuZXhwb3J0cy5pc1N5bWJvbCA9IGlzU3ltYm9sO1xuXG5mdW5jdGlvbiBpc1VuZGVmaW5lZChhcmcpIHtcbiAgcmV0dXJuIGFyZyA9PT0gdm9pZCAwO1xufVxuZXhwb3J0cy5pc1VuZGVmaW5lZCA9IGlzVW5kZWZpbmVkO1xuXG5mdW5jdGlvbiBpc1JlZ0V4cChyZSkge1xuICByZXR1cm4gaXNPYmplY3QocmUpICYmIG9iamVjdFRvU3RyaW5nKHJlKSA9PT0gJ1tvYmplY3QgUmVnRXhwXSc7XG59XG5leHBvcnRzLmlzUmVnRXhwID0gaXNSZWdFeHA7XG5cbmZ1bmN0aW9uIGlzT2JqZWN0KGFyZykge1xuICByZXR1cm4gdHlwZW9mIGFyZyA9PT0gJ29iamVjdCcgJiYgYXJnICE9PSBudWxsO1xufVxuZXhwb3J0cy5pc09iamVjdCA9IGlzT2JqZWN0O1xuXG5mdW5jdGlvbiBpc0RhdGUoZCkge1xuICByZXR1cm4gaXNPYmplY3QoZCkgJiYgb2JqZWN0VG9TdHJpbmcoZCkgPT09ICdbb2JqZWN0IERhdGVdJztcbn1cbmV4cG9ydHMuaXNEYXRlID0gaXNEYXRlO1xuXG5mdW5jdGlvbiBpc0Vycm9yKGUpIHtcbiAgcmV0dXJuIGlzT2JqZWN0KGUpICYmXG4gICAgICAob2JqZWN0VG9TdHJpbmcoZSkgPT09ICdbb2JqZWN0IEVycm9yXScgfHwgZSBpbnN0YW5jZW9mIEVycm9yKTtcbn1cbmV4cG9ydHMuaXNFcnJvciA9IGlzRXJyb3I7XG5cbmZ1bmN0aW9uIGlzRnVuY3Rpb24oYXJnKSB7XG4gIHJldHVybiB0eXBlb2YgYXJnID09PSAnZnVuY3Rpb24nO1xufVxuZXhwb3J0cy5pc0Z1bmN0aW9uID0gaXNGdW5jdGlvbjtcblxuZnVuY3Rpb24gaXNQcmltaXRpdmUoYXJnKSB7XG4gIHJldHVybiBhcmcgPT09IG51bGwgfHxcbiAgICAgICAgIHR5cGVvZiBhcmcgPT09ICdib29sZWFuJyB8fFxuICAgICAgICAgdHlwZW9mIGFyZyA9PT0gJ251bWJlcicgfHxcbiAgICAgICAgIHR5cGVvZiBhcmcgPT09ICdzdHJpbmcnIHx8XG4gICAgICAgICB0eXBlb2YgYXJnID09PSAnc3ltYm9sJyB8fCAgLy8gRVM2IHN5bWJvbFxuICAgICAgICAgdHlwZW9mIGFyZyA9PT0gJ3VuZGVmaW5lZCc7XG59XG5leHBvcnRzLmlzUHJpbWl0aXZlID0gaXNQcmltaXRpdmU7XG5cbmV4cG9ydHMuaXNCdWZmZXIgPSByZXF1aXJlKCcuL3N1cHBvcnQvaXNCdWZmZXInKTtcblxuZnVuY3Rpb24gb2JqZWN0VG9TdHJpbmcobykge1xuICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG8pO1xufVxuXG5cbmZ1bmN0aW9uIHBhZChuKSB7XG4gIHJldHVybiBuIDwgMTAgPyAnMCcgKyBuLnRvU3RyaW5nKDEwKSA6IG4udG9TdHJpbmcoMTApO1xufVxuXG5cbnZhciBtb250aHMgPSBbJ0phbicsICdGZWInLCAnTWFyJywgJ0FwcicsICdNYXknLCAnSnVuJywgJ0p1bCcsICdBdWcnLCAnU2VwJyxcbiAgICAgICAgICAgICAgJ09jdCcsICdOb3YnLCAnRGVjJ107XG5cbi8vIDI2IEZlYiAxNjoxOTozNFxuZnVuY3Rpb24gdGltZXN0YW1wKCkge1xuICB2YXIgZCA9IG5ldyBEYXRlKCk7XG4gIHZhciB0aW1lID0gW3BhZChkLmdldEhvdXJzKCkpLFxuICAgICAgICAgICAgICBwYWQoZC5nZXRNaW51dGVzKCkpLFxuICAgICAgICAgICAgICBwYWQoZC5nZXRTZWNvbmRzKCkpXS5qb2luKCc6Jyk7XG4gIHJldHVybiBbZC5nZXREYXRlKCksIG1vbnRoc1tkLmdldE1vbnRoKCldLCB0aW1lXS5qb2luKCcgJyk7XG59XG5cblxuLy8gbG9nIGlzIGp1c3QgYSB0aGluIHdyYXBwZXIgdG8gY29uc29sZS5sb2cgdGhhdCBwcmVwZW5kcyBhIHRpbWVzdGFtcFxuZXhwb3J0cy5sb2cgPSBmdW5jdGlvbigpIHtcbiAgY29uc29sZS5sb2coJyVzIC0gJXMnLCB0aW1lc3RhbXAoKSwgZXhwb3J0cy5mb3JtYXQuYXBwbHkoZXhwb3J0cywgYXJndW1lbnRzKSk7XG59O1xuXG5cbi8qKlxuICogSW5oZXJpdCB0aGUgcHJvdG90eXBlIG1ldGhvZHMgZnJvbSBvbmUgY29uc3RydWN0b3IgaW50byBhbm90aGVyLlxuICpcbiAqIFRoZSBGdW5jdGlvbi5wcm90b3R5cGUuaW5oZXJpdHMgZnJvbSBsYW5nLmpzIHJld3JpdHRlbiBhcyBhIHN0YW5kYWxvbmVcbiAqIGZ1bmN0aW9uIChub3Qgb24gRnVuY3Rpb24ucHJvdG90eXBlKS4gTk9URTogSWYgdGhpcyBmaWxlIGlzIHRvIGJlIGxvYWRlZFxuICogZHVyaW5nIGJvb3RzdHJhcHBpbmcgdGhpcyBmdW5jdGlvbiBuZWVkcyB0byBiZSByZXdyaXR0ZW4gdXNpbmcgc29tZSBuYXRpdmVcbiAqIGZ1bmN0aW9ucyBhcyBwcm90b3R5cGUgc2V0dXAgdXNpbmcgbm9ybWFsIEphdmFTY3JpcHQgZG9lcyBub3Qgd29yayBhc1xuICogZXhwZWN0ZWQgZHVyaW5nIGJvb3RzdHJhcHBpbmcgKHNlZSBtaXJyb3IuanMgaW4gcjExNDkwMykuXG4gKlxuICogQHBhcmFtIHtmdW5jdGlvbn0gY3RvciBDb25zdHJ1Y3RvciBmdW5jdGlvbiB3aGljaCBuZWVkcyB0byBpbmhlcml0IHRoZVxuICogICAgIHByb3RvdHlwZS5cbiAqIEBwYXJhbSB7ZnVuY3Rpb259IHN1cGVyQ3RvciBDb25zdHJ1Y3RvciBmdW5jdGlvbiB0byBpbmhlcml0IHByb3RvdHlwZSBmcm9tLlxuICovXG5leHBvcnRzLmluaGVyaXRzID0gcmVxdWlyZSgnaW5oZXJpdHMnKTtcblxuZXhwb3J0cy5fZXh0ZW5kID0gZnVuY3Rpb24ob3JpZ2luLCBhZGQpIHtcbiAgLy8gRG9uJ3QgZG8gYW55dGhpbmcgaWYgYWRkIGlzbid0IGFuIG9iamVjdFxuICBpZiAoIWFkZCB8fCAhaXNPYmplY3QoYWRkKSkgcmV0dXJuIG9yaWdpbjtcblxuICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKGFkZCk7XG4gIHZhciBpID0ga2V5cy5sZW5ndGg7XG4gIHdoaWxlIChpLS0pIHtcbiAgICBvcmlnaW5ba2V5c1tpXV0gPSBhZGRba2V5c1tpXV07XG4gIH1cbiAgcmV0dXJuIG9yaWdpbjtcbn07XG5cbmZ1bmN0aW9uIGhhc093blByb3BlcnR5KG9iaiwgcHJvcCkge1xuICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCk7XG59XG4iLCJjb25zdCBoaXN0b3J5ID0gcmVxdWlyZSgnc2hlZXQtcm91dGVyL2hpc3RvcnknKVxuY29uc3Qgc2hlZXRSb3V0ZXIgPSByZXF1aXJlKCdzaGVldC1yb3V0ZXInKVxuY29uc3QgZG9jdW1lbnQgPSByZXF1aXJlKCdnbG9iYWwvZG9jdW1lbnQnKVxuY29uc3QgaHJlZiA9IHJlcXVpcmUoJ3NoZWV0LXJvdXRlci9ocmVmJylcbmNvbnN0IGhhc2ggPSByZXF1aXJlKCdzaGVldC1yb3V0ZXIvaGFzaCcpXG5jb25zdCBoYXNoTWF0Y2ggPSByZXF1aXJlKCdoYXNoLW1hdGNoJylcbmNvbnN0IHNlbmRBY3Rpb24gPSByZXF1aXJlKCdzZW5kLWFjdGlvbicpXG5jb25zdCBtdXRhdGUgPSByZXF1aXJlKCd4dGVuZC9tdXRhYmxlJylcbmNvbnN0IGFzc2VydCA9IHJlcXVpcmUoJ2Fzc2VydCcpXG5jb25zdCB4dGVuZCA9IHJlcXVpcmUoJ3h0ZW5kJylcbmNvbnN0IHlvID0gcmVxdWlyZSgneW8teW8nKVxuXG5jaG9vLnZpZXcgPSB5b1xubW9kdWxlLmV4cG9ydHMgPSBjaG9vXG5cbi8vIGZyYW1ld29yayBmb3IgY3JlYXRpbmcgc3R1cmR5IHdlYiBhcHBsaWNhdGlvbnNcbi8vIG51bGwgLT4gZm5cbmZ1bmN0aW9uIGNob28gKCkge1xuICBjb25zdCBfbW9kZWxzID0gW11cbiAgdmFyIF9yb3V0ZXIgPSBudWxsXG5cbiAgc3RhcnQudG9TdHJpbmcgPSB0b1N0cmluZ1xuICBzdGFydC5yb3V0ZXIgPSByb3V0ZXJcbiAgc3RhcnQubW9kZWwgPSBtb2RlbFxuICBzdGFydC5zdGFydCA9IHN0YXJ0XG5cbiAgcmV0dXJuIHN0YXJ0XG5cbiAgLy8gcmVuZGVyIHRoZSBhcHBsaWNhdGlvbiB0byBhIHN0cmluZ1xuICAvLyAoc3RyLCBvYmopIC0+IHN0clxuICBmdW5jdGlvbiB0b1N0cmluZyAocm91dGUsIHNlcnZlclN0YXRlKSB7XG4gICAgY29uc3QgaW5pdGlhbFN0YXRlID0ge31cbiAgICBjb25zdCBuc1N0YXRlID0ge31cblxuICAgIF9tb2RlbHMuZm9yRWFjaChmdW5jdGlvbiAobW9kZWwpIHtcbiAgICAgIGNvbnN0IG5zID0gbW9kZWwubmFtZXNwYWNlXG4gICAgICBpZiAobnMpIHtcbiAgICAgICAgaWYgKCFuc1N0YXRlW25zXSkgbnNTdGF0ZVtuc10gPSB7fVxuICAgICAgICBhcHBseShucywgbW9kZWwuc3RhdGUsIG5zU3RhdGUpXG4gICAgICAgIG5zU3RhdGVbbnNdID0geHRlbmQobnNTdGF0ZVtuc10sIHNlcnZlclN0YXRlW25zXSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGFwcGx5KG1vZGVsLm5hbWVzcGFjZSwgbW9kZWwuc3RhdGUsIGluaXRpYWxTdGF0ZSlcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgY29uc3Qgc3RhdGUgPSB4dGVuZChpbml0aWFsU3RhdGUsIHh0ZW5kKHNlcnZlclN0YXRlLCBuc1N0YXRlKSlcbiAgICBjb25zdCB0cmVlID0gX3JvdXRlcihyb3V0ZSwgc3RhdGUsIGZ1bmN0aW9uICgpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignc2VuZCgpIGNhbm5vdCBiZSBjYWxsZWQgb24gdGhlIHNlcnZlcicpXG4gICAgfSlcblxuICAgIHJldHVybiB0cmVlLnRvU3RyaW5nKClcbiAgfVxuXG4gIC8vIHN0YXJ0IHRoZSBhcHBsaWNhdGlvblxuICAvLyAoc3RyPywgb2JqPykgLT4gRE9NTm9kZVxuICBmdW5jdGlvbiBzdGFydCAocm9vdElkLCBvcHRzKSB7XG4gICAgaWYgKCFvcHRzICYmIHR5cGVvZiByb290SWQgIT09ICdzdHJpbmcnKSB7XG4gICAgICBvcHRzID0gcm9vdElkXG4gICAgICByb290SWQgPSBudWxsXG4gICAgfVxuICAgIG9wdHMgPSBvcHRzIHx8IHt9XG4gICAgY29uc3QgbmFtZSA9IG9wdHMubmFtZSB8fCAnY2hvbydcbiAgICBjb25zdCBpbml0aWFsU3RhdGUgPSB7fVxuICAgIGNvbnN0IHJlZHVjZXJzID0ge31cbiAgICBjb25zdCBlZmZlY3RzID0ge31cblxuICAgIF9tb2RlbHMucHVzaChhcHBJbml0KG9wdHMpKVxuICAgIF9tb2RlbHMuZm9yRWFjaChmdW5jdGlvbiAobW9kZWwpIHtcbiAgICAgIGlmIChtb2RlbC5zdGF0ZSkgYXBwbHkobW9kZWwubmFtZXNwYWNlLCBtb2RlbC5zdGF0ZSwgaW5pdGlhbFN0YXRlKVxuICAgICAgaWYgKG1vZGVsLnJlZHVjZXJzKSBhcHBseShtb2RlbC5uYW1lc3BhY2UsIG1vZGVsLnJlZHVjZXJzLCByZWR1Y2VycylcbiAgICAgIGlmIChtb2RlbC5lZmZlY3RzKSBhcHBseShtb2RlbC5uYW1lc3BhY2UsIG1vZGVsLmVmZmVjdHMsIGVmZmVjdHMpXG4gICAgfSlcblxuICAgIC8vIHNlbmQoKSBpcyB1c2VkIHRvIHRyaWdnZXIgYWN0aW9ucyBpbnNpZGVcbiAgICAvLyB2aWV3cywgZWZmZWN0cyBhbmQgc3Vic2NyaXB0aW9uc1xuICAgIGNvbnN0IHNlbmQgPSBzZW5kQWN0aW9uKHtcbiAgICAgIG9uYWN0aW9uOiBoYW5kbGVBY3Rpb24sXG4gICAgICBvbmNoYW5nZTogb25jaGFuZ2UsXG4gICAgICBzdGF0ZTogaW5pdGlhbFN0YXRlXG4gICAgfSlcblxuICAgIC8vIHN1YnNjcmlwdGlvbnMgYXJlIGxvYWRlZCBhZnRlciBzZW5kQWN0aW9uKCkgaXMgY2FsbGVkXG4gICAgLy8gYmVjYXVzZSB0aGV5IGJvdGggbmVlZCBhY2Nlc3MgdG8gc2VuZCgpIGFuZCBjYW4ndFxuICAgIC8vIHJlYWN0IHRvIGFjdGlvbnMgKHJlYWQtb25seSkgLSBhbHNvIHdhaXQgb24gRE9NIHRvXG4gICAgLy8gYmUgbG9hZGVkXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgIF9tb2RlbHMuZm9yRWFjaChmdW5jdGlvbiAobW9kZWwpIHtcbiAgICAgICAgaWYgKG1vZGVsLnN1YnNjcmlwdGlvbnMpIHtcbiAgICAgICAgICBhc3NlcnQub2soQXJyYXkuaXNBcnJheShtb2RlbC5zdWJzY3JpcHRpb25zKSwgJ3N1YnMgbXVzdCBiZSBhbiBhcnInKVxuICAgICAgICAgIG1vZGVsLnN1YnNjcmlwdGlvbnMuZm9yRWFjaChmdW5jdGlvbiAoc3ViKSB7XG4gICAgICAgICAgICBzdWIoc2VuZClcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0pXG5cbiAgICAvLyBJZiBhbiBpZCBpcyBwcm92aWRlZCwgdGhlIGFwcGxpY2F0aW9uIHdpbGwgcmVoeWRyYXRlXG4gICAgLy8gb24gdGhlIG5vZGUuIElmIG5vIGlkIGlzIHByb3ZpZGVkIGl0IHdpbGwgcmV0dXJuXG4gICAgLy8gYSB0cmVlIHRoYXQncyByZWFkeSB0byBiZSBhcHBlbmRlZCB0byB0aGUgRE9NLlxuICAgIC8vXG4gICAgLy8gVGhlIHJvb3RJZCBpcyBkZXRlcm1pbmVkIHRvIGZpbmQgdGhlIGFwcGxpY2F0aW9uIHJvb3RcbiAgICAvLyBvbiB1cGRhdGUuIFNpbmNlIHRoZSBET00gbm9kZXMgY2hhbmdlIGJldHdlZW4gdXBkYXRlcyxcbiAgICAvLyB3ZSBtdXN0IGNhbGwgZG9jdW1lbnQucXVlcnlTZWxlY3RvcigpIHRvIGZpbmQgdGhlIHJvb3QuXG4gICAgLy8gVXNlIGRpZmZlcmVudCBuYW1lcyB3aGVuIGxvYWRpbmcgbXVsdGlwbGUgY2hvbyBhcHBsaWNhdGlvbnNcbiAgICAvLyBvbiB0aGUgc2FtZSBwYWdlXG4gICAgaWYgKHJvb3RJZCkge1xuICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICByb290SWQgPSByb290SWQucmVwbGFjZSgvXiMvLCAnJylcblxuICAgICAgICBjb25zdCBvbGRUcmVlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignIycgKyByb290SWQpXG4gICAgICAgIGFzc2VydC5vayhvbGRUcmVlLCAnY291bGQgbm90IGZpbmQgbm9kZSAjJyArIHJvb3RJZClcblxuICAgICAgICBjb25zdCBuZXdUcmVlID0gX3JvdXRlcihzZW5kLnN0YXRlKCkuYXBwLmxvY2F0aW9uLCBzZW5kLnN0YXRlKCksIHNlbmQpXG5cbiAgICAgICAgeW8udXBkYXRlKG9sZFRyZWUsIG5ld1RyZWUpXG4gICAgICB9KVxuICAgIH0gZWxzZSB7XG4gICAgICByb290SWQgPSBuYW1lICsgJy1yb290J1xuICAgICAgY29uc3QgdHJlZSA9IF9yb3V0ZXIoc2VuZC5zdGF0ZSgpLmFwcC5sb2NhdGlvbiwgc2VuZC5zdGF0ZSgpLCBzZW5kKVxuICAgICAgdHJlZS5zZXRBdHRyaWJ1dGUoJ2lkJywgcm9vdElkKVxuICAgICAgcmV0dXJuIHRyZWVcbiAgICB9XG5cbiAgICAvLyBoYW5kbGUgYW4gYWN0aW9uIGJ5IGVpdGhlciByZWR1Y2VycywgZWZmZWN0c1xuICAgIC8vIG9yIGJvdGggLSByZXR1cm4gdGhlIG5ldyBzdGF0ZSB3aGVuIGRvbmVcbiAgICAvLyAob2JqLCBvYmosIGZuKSAtPiBvYmpcbiAgICBmdW5jdGlvbiBoYW5kbGVBY3Rpb24gKGFjdGlvbiwgc3RhdGUsIHNlbmQpIHtcbiAgICAgIHZhciByZWR1Y2Vyc0NhbGxlZCA9IGZhbHNlXG4gICAgICB2YXIgZWZmZWN0c0NhbGxlZCA9IGZhbHNlXG4gICAgICBjb25zdCBuZXdTdGF0ZSA9IHh0ZW5kKHN0YXRlKVxuXG4gICAgICAvLyB2YWxpZGF0ZSBpZiBhIG5hbWVzcGFjZSBleGlzdHMuIE5hbWVzcGFjZXNcbiAgICAgIC8vIGFyZSBkZWxpbWl0ZWQgYnkgdGhlIGZpcnN0ICc6Jy4gUGVyaGFwc1xuICAgICAgLy8gd2UnbGwgYWxsb3cgcmVjdXJzaXZlIG5hbWVzcGFjZXMgaW4gdGhlXG4gICAgICAvLyBmdXR1cmUgLSB3aG8ga25vd3NcbiAgICAgIGlmICgvOi8udGVzdChhY3Rpb24udHlwZSkpIHtcbiAgICAgICAgY29uc3QgYXJyID0gYWN0aW9uLnR5cGUuc3BsaXQoJzonKVxuICAgICAgICB2YXIgbnMgPSBhcnIuc2hpZnQoKVxuICAgICAgICBhY3Rpb24udHlwZSA9IGFyci5qb2luKCc6JylcbiAgICAgIH1cblxuICAgICAgY29uc3QgX3JlZHVjZXJzID0gbnMgPyByZWR1Y2Vyc1tuc10gOiByZWR1Y2Vyc1xuICAgICAgaWYgKF9yZWR1Y2VycyAmJiBfcmVkdWNlcnNbYWN0aW9uLnR5cGVdKSB7XG4gICAgICAgIGlmIChucykge1xuICAgICAgICAgIGNvbnN0IHJlZHVjZWRTdGF0ZSA9IF9yZWR1Y2Vyc1thY3Rpb24udHlwZV0oYWN0aW9uLCBzdGF0ZVtuc10pXG4gICAgICAgICAgaWYgKCFuZXdTdGF0ZVtuc10pIG5ld1N0YXRlW25zXSA9IHt9XG4gICAgICAgICAgbXV0YXRlKG5ld1N0YXRlW25zXSwgeHRlbmQoc3RhdGVbbnNdLCByZWR1Y2VkU3RhdGUpKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG11dGF0ZShuZXdTdGF0ZSwgcmVkdWNlcnNbYWN0aW9uLnR5cGVdKGFjdGlvbiwgc3RhdGUpKVxuICAgICAgICB9XG4gICAgICAgIHJlZHVjZXJzQ2FsbGVkID0gdHJ1ZVxuICAgICAgfVxuXG4gICAgICBjb25zdCBfZWZmZWN0cyA9IG5zID8gZWZmZWN0c1tuc10gOiBlZmZlY3RzXG4gICAgICBpZiAoX2VmZmVjdHMgJiYgX2VmZmVjdHNbYWN0aW9uLnR5cGVdKSB7XG4gICAgICAgIGlmIChucykgX2VmZmVjdHNbYWN0aW9uLnR5cGVdKGFjdGlvbiwgc3RhdGVbbnNdLCBzZW5kKVxuICAgICAgICBlbHNlIF9lZmZlY3RzW2FjdGlvbi50eXBlXShhY3Rpb24sIHN0YXRlLCBzZW5kKVxuICAgICAgICBlZmZlY3RzQ2FsbGVkID0gdHJ1ZVxuICAgICAgfVxuXG4gICAgICBpZiAoIXJlZHVjZXJzQ2FsbGVkICYmICFlZmZlY3RzQ2FsbGVkKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignQ291bGQgbm90IGZpbmQgYWN0aW9uICcgKyBhY3Rpb24udHlwZSlcbiAgICAgIH1cblxuICAgICAgLy8gYWxsb3dzIChuZXdTdGF0ZSA9PT0gb2xkU3RhdGUpIGNoZWNrc1xuICAgICAgcmV0dXJuIChyZWR1Y2Vyc0NhbGxlZCkgPyBuZXdTdGF0ZSA6IHN0YXRlXG4gICAgfVxuXG4gICAgLy8gdXBkYXRlIHRoZSBET00gYWZ0ZXIgZXZlcnkgc3RhdGUgbXV0YXRpb25cbiAgICAvLyAob2JqLCBvYmopIC0+IG51bGxcbiAgICBmdW5jdGlvbiBvbmNoYW5nZSAoYWN0aW9uLCBuZXdTdGF0ZSwgb2xkU3RhdGUpIHtcbiAgICAgIGlmIChuZXdTdGF0ZSA9PT0gb2xkU3RhdGUpIHJldHVyblxuICAgICAgY29uc3Qgb2xkVHJlZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyMnICsgcm9vdElkKVxuICAgICAgYXNzZXJ0Lm9rKG9sZFRyZWUsIFwiQ291bGQgbm90IGZpbmQgRE9NIG5vZGUgJyNcIiArIHJvb3RJZCArIFwiJyB0byB1cGRhdGVcIilcbiAgICAgIGNvbnN0IG5ld1RyZWUgPSBfcm91dGVyKG5ld1N0YXRlLmFwcC5sb2NhdGlvbiwgbmV3U3RhdGUsIHNlbmQsIG9sZFN0YXRlKVxuICAgICAgbmV3VHJlZS5zZXRBdHRyaWJ1dGUoJ2lkJywgcm9vdElkKVxuICAgICAgeW8udXBkYXRlKG9sZFRyZWUsIG5ld1RyZWUpXG4gICAgfVxuICB9XG5cbiAgLy8gcmVnaXN0ZXIgYWxsIHJvdXRlcyBvbiB0aGUgcm91dGVyXG4gIC8vIChzdHI/LCBbZm58W2ZuXV0pIC0+IG9ialxuICBmdW5jdGlvbiByb3V0ZXIgKGRlZmF1bHRSb3V0ZSwgY2IpIHtcbiAgICBfcm91dGVyID0gc2hlZXRSb3V0ZXIoZGVmYXVsdFJvdXRlLCBjYilcbiAgICByZXR1cm4gX3JvdXRlclxuICB9XG5cbiAgLy8gY3JlYXRlIGEgbmV3IG1vZGVsXG4gIC8vIChzdHI/LCBvYmopIC0+IG51bGxcbiAgZnVuY3Rpb24gbW9kZWwgKG1vZGVsKSB7XG4gICAgX21vZGVscy5wdXNoKG1vZGVsKVxuICB9XG59XG5cbi8vIGluaXRpYWwgYXBwbGljYXRpb24gc3RhdGUgbW9kZWxcbi8vIG9iaiAtPiBvYmpcbmZ1bmN0aW9uIGFwcEluaXQgKG9wdHMpIHtcbiAgY29uc3QgaW5pdGlhbExvY2F0aW9uID0gKG9wdHMuaGFzaCA9PT0gdHJ1ZSlcbiAgICA/IGhhc2hNYXRjaChkb2N1bWVudC5sb2NhdGlvbi5oYXNoKVxuICAgIDogZG9jdW1lbnQubG9jYXRpb24uaHJlZlxuXG4gIGNvbnN0IG1vZGVsID0ge1xuICAgIG5hbWVzcGFjZTogJ2FwcCcsXG4gICAgc3RhdGU6IHsgbG9jYXRpb246IGluaXRpYWxMb2NhdGlvbiB9LFxuICAgIHN1YnNjcmlwdGlvbnM6IFtdLFxuICAgIHJlZHVjZXJzOiB7XG4gICAgICAvLyBoYW5kbGUgaHJlZiBsaW5rc1xuICAgICAgbG9jYXRpb246IGZ1bmN0aW9uIHNldExvY2F0aW9uIChhY3Rpb24sIHN0YXRlKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgbG9jYXRpb246IGFjdGlvbi5sb2NhdGlvbi5yZXBsYWNlKC8jLiovLCAnJylcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vIGlmIGhhc2ggcm91dGluZyBleHBsaWNpdGx5IGVuYWJsZWQsIHN1YnNjcmliZSB0byBpdFxuICBpZiAob3B0cy5oYXNoID09PSB0cnVlKSB7XG4gICAgcHVzaExvY2F0aW9uU3ViKGZ1bmN0aW9uIChuYXZpZ2F0ZSkge1xuICAgICAgaGFzaChmdW5jdGlvbiAoZnJhZ21lbnQpIHtcbiAgICAgICAgbmF2aWdhdGUoaGFzaE1hdGNoKGZyYWdtZW50KSlcbiAgICAgIH0pXG4gICAgfSlcbiAgLy8gb3RoZXJ3aXNlLCBzdWJzY3JpYmUgdG8gSFRNTDUgaGlzdG9yeSBBUElcbiAgfSBlbHNlIHtcbiAgICBpZiAob3B0cy5oaXN0b3J5ICE9PSBmYWxzZSkgcHVzaExvY2F0aW9uU3ViKGhpc3RvcnkpXG4gICAgLy8gZW5hYmxlIGNhdGNoaW5nIDxhIGhyZWY9XCJcIj48L2E+IGxpbmtzXG4gICAgaWYgKG9wdHMuaHJlZiAhPT0gZmFsc2UpIHB1c2hMb2NhdGlvblN1YihocmVmKVxuICB9XG5cbiAgcmV0dXJuIG1vZGVsXG5cbiAgLy8gY3JlYXRlIGEgbmV3IHN1YnNjcmlwdGlvbiB0aGF0IG1vZGlmaWVzXG4gIC8vICdhcHA6bG9jYXRpb24nIGFuZCBwdXNoIGl0IHRvIGJlIGxvYWRlZFxuICAvLyBmbiAtPiBudWxsXG4gIGZ1bmN0aW9uIHB1c2hMb2NhdGlvblN1YiAoY2IpIHtcbiAgICBtb2RlbC5zdWJzY3JpcHRpb25zLnB1c2goZnVuY3Rpb24gKHNlbmQpIHtcbiAgICAgIGNiKGZ1bmN0aW9uIChocmVmKSB7XG4gICAgICAgIHNlbmQoJ2FwcDpsb2NhdGlvbicsIHsgbG9jYXRpb246IGhyZWYgfSlcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxufVxuXG4vLyBjb21wb3NlIGFuIG9iamVjdCBjb25kaXRpb25hbGx5XG4vLyBvcHRpb25hbGx5IGNvbnRhaW5zIGEgbmFtZXNwYWNlXG4vLyB3aGljaCBpcyB1c2VkIHRvIG5lc3QgcHJvcGVydGllcy5cbi8vIChzdHIsIG9iaiwgb2JqKSAtPiBudWxsXG5mdW5jdGlvbiBhcHBseSAobnMsIHNvdXJjZSwgdGFyZ2V0KSB7XG4gIE9iamVjdC5rZXlzKHNvdXJjZSkuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgaWYgKG5zKSB7XG4gICAgICBpZiAoIXRhcmdldFtuc10pIHRhcmdldFtuc10gPSB7fVxuICAgICAgdGFyZ2V0W25zXVtrZXldID0gc291cmNlW2tleV1cbiAgICB9IGVsc2UgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XVxuICB9KVxufVxuIiwidmFyIHRvcExldmVsID0gdHlwZW9mIGdsb2JhbCAhPT0gJ3VuZGVmaW5lZCcgPyBnbG9iYWwgOlxuICAgIHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnID8gd2luZG93IDoge31cbnZhciBtaW5Eb2MgPSByZXF1aXJlKCdtaW4tZG9jdW1lbnQnKTtcblxuaWYgKHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IGRvY3VtZW50O1xufSBlbHNlIHtcbiAgICB2YXIgZG9jY3kgPSB0b3BMZXZlbFsnX19HTE9CQUxfRE9DVU1FTlRfQ0FDSEVANCddO1xuXG4gICAgaWYgKCFkb2NjeSkge1xuICAgICAgICBkb2NjeSA9IHRvcExldmVsWydfX0dMT0JBTF9ET0NVTUVOVF9DQUNIRUA0J10gPSBtaW5Eb2M7XG4gICAgfVxuXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBkb2NjeTtcbn1cbiIsImlmICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSB3aW5kb3c7XG59IGVsc2UgaWYgKHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IGdsb2JhbDtcbn0gZWxzZSBpZiAodHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIpe1xuICAgIG1vZHVsZS5leHBvcnRzID0gc2VsZjtcbn0gZWxzZSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSB7fTtcbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaGFzaE1hdGNoIChoYXNoLCBwcmVmaXgpIHtcbiAgdmFyIHByZSA9IHByZWZpeCB8fCAnLyc7XG4gIGlmIChoYXNoLmxlbmd0aCA9PT0gMCkgcmV0dXJuIHByZTtcbiAgaGFzaCA9IGhhc2gucmVwbGFjZSgnIycsICcnKTtcbiAgaGFzaCA9IGhhc2gucmVwbGFjZSgvXFwvJC8sICcnKVxuICBpZiAoaGFzaC5pbmRleE9mKCcvJykgIT0gMCkgaGFzaCA9ICcvJyArIGhhc2g7XG4gIGlmIChwcmUgPT0gJy8nKSByZXR1cm4gaGFzaDtcbiAgZWxzZSByZXR1cm4gaGFzaC5yZXBsYWNlKHByZSwgJycpO1xufVxuIiwidmFyIGV4dGVuZCA9IHJlcXVpcmUoJ3h0ZW5kJylcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBzZW5kQWN0aW9uIChvcHRpb25zKSB7XG4gIGlmICghb3B0aW9ucykgdGhyb3cgbmV3IEVycm9yKCdvcHRpb25zIHJlcXVpcmVkJylcbiAgaWYgKCFvcHRpb25zLm9uYWN0aW9uKSB0aHJvdyBuZXcgRXJyb3IoJ29wdGlvbnMub25hY3Rpb24gcmVxdWlyZWQnKVxuICBpZiAoIW9wdGlvbnMub25jaGFuZ2UpIHRocm93IG5ldyBFcnJvcignb3B0aW9ucy5vbmNoYW5nZSByZXF1aXJlZCcpXG4gIHZhciBzdGF0ZSA9IG9wdGlvbnMuc3RhdGUgfHwge31cblxuICBmdW5jdGlvbiBzZW5kIChhY3Rpb24sIHBhcmFtcykge1xuICAgIHByb2Nlc3MubmV4dFRpY2soZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKHR5cGVvZiBhY3Rpb24gPT09ICdvYmplY3QnKSB7XG4gICAgICAgIHBhcmFtcyA9IGFjdGlvblxuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgYWN0aW9uID09PSAnc3RyaW5nJykge1xuICAgICAgICBwYXJhbXMgPSBleHRlbmQoeyB0eXBlOiBhY3Rpb24gfSwgcGFyYW1zKVxuICAgICAgfVxuXG4gICAgICB2YXIgc3RhdGVVcGRhdGVzID0gb3B0aW9ucy5vbmFjdGlvbihwYXJhbXMsIHN0YXRlLCBzZW5kKVxuICAgICAgaWYgKHN0YXRlICE9PSBzdGF0ZVVwZGF0ZXMpIHtcbiAgICAgICAgdXBkYXRlKHBhcmFtcywgc3RhdGVVcGRhdGVzKVxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICBmdW5jdGlvbiB1cGRhdGUgKHBhcmFtcywgc3RhdGVVcGRhdGVzKSB7XG4gICAgdmFyIG9sZFN0YXRlID0gc3RhdGVcbiAgICBzdGF0ZSA9IGV4dGVuZChzdGF0ZSwgc3RhdGVVcGRhdGVzKVxuICAgIG9wdGlvbnMub25jaGFuZ2UocGFyYW1zLCBzdGF0ZSwgb2xkU3RhdGUpXG4gIH1cblxuICBzZW5kLmV2ZW50ID0gZnVuY3Rpb24gc2VuZEFjdGlvbl9ldmVudCAoYWN0aW9uLCBwYXJhbXMsIGZsYWcpIHtcbiAgICBpZiAodHlwZW9mIGZsYWcgPT09IHVuZGVmaW5lZCkgZmxhZyA9IHRydWVcbiAgICByZXR1cm4gZnVuY3Rpb24gc2VuZEFjdGlvbl9zZW5kX3RodW5rIChlKSB7XG4gICAgICBpZiAoZmxhZyAmJiBlICYmIGUucHJldmVudERlZmF1bHQpIGUucHJldmVudERlZmF1bHQoKVxuICAgICAgc2VuZChhY3Rpb24sIHBhcmFtcywgZmxhZylcbiAgICB9XG4gIH1cblxuICBzZW5kLnN0YXRlID0gZnVuY3Rpb24gc2VuZEFjdGlvbl9zdGF0ZSAoKSB7XG4gICAgcmV0dXJuIHN0YXRlXG4gIH1cblxuICByZXR1cm4gc2VuZFxufVxuIiwiY29uc3Qgd2luZG93ID0gcmVxdWlyZSgnZ2xvYmFsL3dpbmRvdycpXG5jb25zdCBhc3NlcnQgPSByZXF1aXJlKCdhc3NlcnQnKVxuXG5tb2R1bGUuZXhwb3J0cyA9IGhhc2hcblxuLy8gbGlzdGVuIHRvIHdpbmRvdyBoYXNoY2hhbmdlIGV2ZW50c1xuLy8gYW5kIHVwZGF0ZSByb3V0ZXIgYWNjb3JkaW5nbHlcbi8vIGZuKGNiKSAtPiBudWxsXG5mdW5jdGlvbiBoYXNoIChjYikge1xuICBhc3NlcnQuZXF1YWwodHlwZW9mIGNiLCAnZnVuY3Rpb24nLCAnY2IgbXVzdCBiZSBhIGZ1bmN0aW9uJylcbiAgd2luZG93Lm9uaGFzaGNoYW5nZSA9IGZ1bmN0aW9uIChlKSB7XG4gICAgY2Iod2luZG93LmxvY2F0aW9uLmhhc2gpXG4gIH1cbn1cbiIsImNvbnN0IGRvY3VtZW50ID0gcmVxdWlyZSgnZ2xvYmFsL2RvY3VtZW50JylcbmNvbnN0IHdpbmRvdyA9IHJlcXVpcmUoJ2dsb2JhbC93aW5kb3cnKVxuY29uc3QgYXNzZXJ0ID0gcmVxdWlyZSgnYXNzZXJ0JylcblxubW9kdWxlLmV4cG9ydHMgPSBoaXN0b3J5XG5cbi8vIGxpc3RlbiB0byBodG1sNSBwdXNoc3RhdGUgZXZlbnRzXG4vLyBhbmQgdXBkYXRlIHJvdXRlciBhY2NvcmRpbmdseVxuLy8gZm4oc3RyKSAtPiBudWxsXG5mdW5jdGlvbiBoaXN0b3J5IChjYikge1xuICBhc3NlcnQuZXF1YWwodHlwZW9mIGNiLCAnZnVuY3Rpb24nLCAnY2IgbXVzdCBiZSBhIGZ1bmN0aW9uJylcbiAgd2luZG93Lm9ucG9wc3RhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgY2IoZG9jdW1lbnQubG9jYXRpb24uaHJlZilcbiAgfVxufVxuIiwiY29uc3Qgd2luZG93ID0gcmVxdWlyZSgnZ2xvYmFsL3dpbmRvdycpXG5jb25zdCBhc3NlcnQgPSByZXF1aXJlKCdhc3NlcnQnKVxuXG5tb2R1bGUuZXhwb3J0cyA9IGhyZWZcblxuLy8gaGFuZGxlIGEgY2xpY2sgaWYgaXMgYW5jaG9yIHRhZyB3aXRoIGFuIGhyZWZcbi8vIGFuZCB1cmwgbGl2ZXMgb24gdGhlIHNhbWUgZG9tYWluLiBSZXBsYWNlc1xuLy8gdHJhaWxpbmcgJyMnIHNvIGVtcHR5IGxpbmtzIHdvcmsgYXMgZXhwZWN0ZWQuXG4vLyBmbihzdHIpIC0+IG51bGxcbmZ1bmN0aW9uIGhyZWYgKGNiKSB7XG4gIGFzc2VydC5lcXVhbCh0eXBlb2YgY2IsICdmdW5jdGlvbicsICdjYiBtdXN0IGJlIGEgZnVuY3Rpb24nKVxuXG4gIHdpbmRvdy5vbmNsaWNrID0gZnVuY3Rpb24gKGUpIHtcbiAgICBjb25zdCBub2RlID0gKGZ1bmN0aW9uIHRyYXZlcnNlIChub2RlKSB7XG4gICAgICBpZiAoIW5vZGUpIHJldHVyblxuICAgICAgaWYgKG5vZGUubG9jYWxOYW1lICE9PSAnYScpIHJldHVybiB0cmF2ZXJzZShub2RlLnBhcmVudE5vZGUpXG4gICAgICBpZiAobm9kZS5ocmVmID09PSB1bmRlZmluZWQpIHJldHVybiB0cmF2ZXJzZShub2RlLnBhcmVudE5vZGUpXG4gICAgICBpZiAod2luZG93LmxvY2F0aW9uLmhvc3QgIT09IG5vZGUuaG9zdCkgcmV0dXJuIHRyYXZlcnNlKG5vZGUucGFyZW50Tm9kZSlcbiAgICAgIHJldHVybiBub2RlXG4gICAgfSkoZS50YXJnZXQpXG5cbiAgICBpZiAoIW5vZGUpIHJldHVyblxuXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgY29uc3QgaHJlZiA9IG5vZGUuaHJlZi5yZXBsYWNlKC8jJC8sICcnKVxuICAgIGNiKGhyZWYpXG4gICAgd2luZG93Lmhpc3RvcnkucHVzaFN0YXRlKHt9LCBudWxsLCBocmVmKVxuICB9XG59XG4iLCJjb25zdCBwYXRobmFtZSA9IHJlcXVpcmUoJ3BhdGhuYW1lLW1hdGNoJylcbmNvbnN0IHdheWZhcmVyID0gcmVxdWlyZSgnd2F5ZmFyZXInKVxuY29uc3QgYXNzZXJ0ID0gcmVxdWlyZSgnYXNzZXJ0JylcblxubW9kdWxlLmV4cG9ydHMgPSBzaGVldFJvdXRlclxuXG4vLyBGYXN0LCBtb2R1bGFyIGNsaWVudCByb3V0ZXJcbi8vIGZuKHN0ciwgYW55Wy4uXSwgZm4/KSAtPiBmbihzdHIsIGFueVsuLl0pXG5mdW5jdGlvbiBzaGVldFJvdXRlciAoZGZ0LCBjcmVhdGVUcmVlLCBjcmVhdGVSb3V0ZSkge1xuICBjcmVhdGVSb3V0ZSA9IGNyZWF0ZVJvdXRlID8gY3JlYXRlUm91dGUocikgOiByXG4gIGlmICghY3JlYXRlVHJlZSkge1xuICAgIGNyZWF0ZVRyZWUgPSBkZnRcbiAgICBkZnQgPSAnJ1xuICB9XG5cbiAgYXNzZXJ0LmVxdWFsKHR5cGVvZiBkZnQsICdzdHJpbmcnLCAnZGZ0IG11c3QgYmUgYSBzdHJpbmcnKVxuICBhc3NlcnQuZXF1YWwodHlwZW9mIGNyZWF0ZVRyZWUsICdmdW5jdGlvbicsICdjcmVhdGVUcmVlIG11c3QgYmUgYSBmdW5jdGlvbicpXG5cbiAgY29uc3Qgcm91dGVyID0gd2F5ZmFyZXIoZGZ0KVxuICBjb25zdCB0cmVlID0gY3JlYXRlVHJlZShjcmVhdGVSb3V0ZSlcblxuICAvLyByZWdpc3RlciB0cmVlIGluIHJvdXRlclxuICA7KGZ1bmN0aW9uIHdhbGsgKHRyZWUsIHJvdXRlKSB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkodHJlZVswXSkpIHtcbiAgICAgIC8vIHdhbGsgb3ZlciBhbGwgcm91dGVzIGF0IHRoZSByb290IG9mIHRoZSB0cmVlXG4gICAgICB0cmVlLmZvckVhY2goZnVuY3Rpb24gKG5vZGUpIHtcbiAgICAgICAgd2Fsayhub2RlLCByb3V0ZSlcbiAgICAgIH0pXG4gICAgfSBlbHNlIGlmICh0cmVlWzFdKSB7XG4gICAgICAvLyBoYW5kbGUgaW5saW5lIGZ1bmN0aW9ucyBhcyBhcmdzXG4gICAgICBjb25zdCBpbm5lclJvdXRlID0gdHJlZVswXVxuICAgICAgICA/IHJvdXRlLmNvbmNhdCh0cmVlWzBdKS5qb2luKCcvJylcbiAgICAgICAgOiByb3V0ZS5sZW5ndGggPyByb3V0ZS5qb2luKCcvJykgOiB0cmVlWzBdXG4gICAgICByb3V0ZXIub24oaW5uZXJSb3V0ZSwgdHJlZVsxXSlcbiAgICAgIHdhbGsodHJlZVsyXSwgcm91dGUuY29uY2F0KHRyZWVbMF0pKVxuICAgIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheSh0cmVlWzJdKSkge1xuICAgICAgLy8gdHJhdmVyc2UgYW5kIGFwcGVuZCByb3V0ZVxuICAgICAgd2Fsayh0cmVlWzJdLCByb3V0ZS5jb25jYXQodHJlZVswXSkpXG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIHJlZ2lzdGVyIHBhdGggaW4gcm91dGVyXG4gICAgICBjb25zdCBud1JvdXRlID0gdHJlZVswXVxuICAgICAgICA/IHJvdXRlLmNvbmNhdCh0cmVlWzBdKS5qb2luKCcvJylcbiAgICAgICAgOiByb3V0ZS5sZW5ndGggPyByb3V0ZS5qb2luKCcvJykgOiB0cmVlWzBdXG4gICAgICByb3V0ZXIub24obndSb3V0ZSwgdHJlZVsyXSlcbiAgICB9XG4gIH0pKHRyZWUsIFtdKVxuXG4gIC8vIG1hdGNoIGEgcm91dGUgb24gdGhlIHJvdXRlclxuICByZXR1cm4gZnVuY3Rpb24gbWF0Y2ggKHJvdXRlKSB7XG4gICAgYXNzZXJ0LmVxdWFsKHR5cGVvZiByb3V0ZSwgJ3N0cmluZycsICdyb3V0ZSBtdXN0IGJlIGEgc3RyaW5nJylcbiAgICBjb25zdCBhcmdzID0gW10uc2xpY2UuY2FsbChhcmd1bWVudHMpXG4gICAgYXJnc1swXSA9IHBhdGhuYW1lKGFyZ3NbMF0pXG4gICAgcmV0dXJuIHJvdXRlci5hcHBseShudWxsLCBhcmdzKVxuICB9XG59XG5cbi8vIHJlZ2lzdGVyIHJlZ3VsYXIgcm91dGVcbmZ1bmN0aW9uIHIgKHJvdXRlLCBpbmxpbmUsIGNoaWxkKSB7XG4gIGlmICghY2hpbGQpIHtcbiAgICBjaGlsZCA9IGlubGluZVxuICAgIGlubGluZSA9IG51bGxcbiAgfVxuICBhc3NlcnQuZXF1YWwodHlwZW9mIHJvdXRlLCAnc3RyaW5nJywgJ3JvdXRlIG11c3QgYmUgYSBzdHJpbmcnKVxuICBhc3NlcnQub2soY2hpbGQsICdjaGlsZCBleGlzdHMnKVxuICByb3V0ZSA9IHJvdXRlLnJlcGxhY2UoL15cXC8vLCAnJylcbiAgcmV0dXJuIFsgcm91dGUsIGlubGluZSwgY2hpbGQgXVxufVxuIiwiY29uc3QgYXNzZXJ0ID0gcmVxdWlyZSgnYXNzZXJ0JylcblxubW9kdWxlLmV4cG9ydHMgPSBtYXRjaFxuXG4vLyBnZXQgdXJsIHBhdGggc2VjdGlvbiBmcm9tIGEgdXJsXG4vLyBzdHJpcCBxdWVyeXN0cmluZ3MgLyBoYXNoZXNcbi8vIHN0cmlwIHByb3RvY29sXG4vLyBzdHJpcCBob3N0bmFtZSBhbmQgcG9ydCAoYm90aCBpcCBhbmQgcm91dGUpXG4vLyBzdHIgLT4gc3RyXG5mdW5jdGlvbiBtYXRjaCAocm91dGUpIHtcbiAgYXNzZXJ0LmVxdWFsKHR5cGVvZiByb3V0ZSwgJ3N0cmluZycpXG5cbiAgcmV0dXJuIHJvdXRlLnRyaW0oKVxuICAgIC5yZXBsYWNlKC9bXFw/fCNdLiokLywgJycpXG4gICAgLnJlcGxhY2UoL14oPzpodHRwcz9cXDopXFwvXFwvLywgJycpXG4gICAgLnJlcGxhY2UoL14oPzpbXFx3Kyg/Oi1cXHcrKSsuXSkrKD86W1xcOjAtOV17NCw1fSk/LywgJycpXG4gICAgLnJlcGxhY2UoL1xcLyQvLCAnJylcbn1cbiIsIlxuLyoqXG4gKiBBbiBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpIGFsdGVybmF0aXZlXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGFyZ3Mgc29tZXRoaW5nIHdpdGggYSBsZW5ndGhcbiAqIEBwYXJhbSB7TnVtYmVyfSBzbGljZVxuICogQHBhcmFtIHtOdW1iZXJ9IHNsaWNlRW5kXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGFyZ3MsIHNsaWNlLCBzbGljZUVuZCkge1xuICB2YXIgcmV0ID0gW107XG4gIHZhciBsZW4gPSBhcmdzLmxlbmd0aDtcblxuICBpZiAoMCA9PT0gbGVuKSByZXR1cm4gcmV0O1xuXG4gIHZhciBzdGFydCA9IHNsaWNlIDwgMFxuICAgID8gTWF0aC5tYXgoMCwgc2xpY2UgKyBsZW4pXG4gICAgOiBzbGljZSB8fCAwO1xuXG4gIGlmIChzbGljZUVuZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgbGVuID0gc2xpY2VFbmQgPCAwXG4gICAgICA/IHNsaWNlRW5kICsgbGVuXG4gICAgICA6IHNsaWNlRW5kXG4gIH1cblxuICB3aGlsZSAobGVuLS0gPiBzdGFydCkge1xuICAgIHJldFtsZW4gLSBzdGFydF0gPSBhcmdzW2xlbl07XG4gIH1cblxuICByZXR1cm4gcmV0O1xufVxuXG4iLCJjb25zdCBhc3NlcnQgPSByZXF1aXJlKCdhc3NlcnQnKVxuY29uc3Qgc2xpY2VkID0gcmVxdWlyZSgnc2xpY2VkJylcbmNvbnN0IHRyaWUgPSByZXF1aXJlKCcuL3RyaWUnKVxuXG5tb2R1bGUuZXhwb3J0cyA9IFdheWZhcmVyXG5cbi8vIGNyZWF0ZSBhIHJvdXRlclxuLy8gc3RyIC0+IG9ialxuZnVuY3Rpb24gV2F5ZmFyZXIgKGRmdCkge1xuICBpZiAoISh0aGlzIGluc3RhbmNlb2YgV2F5ZmFyZXIpKSByZXR1cm4gbmV3IFdheWZhcmVyKGRmdClcblxuICBjb25zdCBfZGVmYXVsdCA9IChkZnQgfHwgJycpLnJlcGxhY2UoL15cXC8vLCAnJylcbiAgY29uc3QgX3RyaWUgPSB0cmllKClcblxuICBlbWl0Ll90cmllID0gX3RyaWVcbiAgZW1pdC5lbWl0ID0gZW1pdFxuICBlbWl0Lm9uID0gb25cbiAgZW1pdC5fd2F5ZmFyZXIgPSB0cnVlXG5cbiAgcmV0dXJuIGVtaXRcblxuICAvLyBkZWZpbmUgYSByb3V0ZVxuICAvLyAoc3RyLCBmbikgLT4gb2JqXG4gIGZ1bmN0aW9uIG9uIChyb3V0ZSwgY2IpIHtcbiAgICBhc3NlcnQuZXF1YWwodHlwZW9mIHJvdXRlLCAnc3RyaW5nJylcbiAgICBhc3NlcnQuZXF1YWwodHlwZW9mIGNiLCAnZnVuY3Rpb24nKVxuXG4gICAgcm91dGUgPSByb3V0ZSB8fCAnLydcblxuICAgIGlmIChjYiAmJiBjYi5fd2F5ZmFyZXIgJiYgY2IuX3RyaWUpIHtcbiAgICAgIF90cmllLm1vdW50KHJvdXRlLCBjYi5fdHJpZS50cmllKVxuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBub2RlID0gX3RyaWUuY3JlYXRlKHJvdXRlKVxuICAgICAgbm9kZS5jYiA9IGNiXG4gICAgfVxuXG4gICAgcmV0dXJuIGVtaXRcbiAgfVxuXG4gIC8vIG1hdGNoIGFuZCBjYWxsIGEgcm91dGVcbiAgLy8gKHN0ciwgb2JqPykgLT4gbnVsbFxuICBmdW5jdGlvbiBlbWl0IChyb3V0ZSkge1xuICAgIGFzc2VydC5ub3RFcXVhbChyb3V0ZSwgdW5kZWZpbmVkLCBcIidyb3V0ZScgbXVzdCBiZSBkZWZpbmVkXCIpXG4gICAgY29uc3QgYXJncyA9IHNsaWNlZChhcmd1bWVudHMpXG5cbiAgICBjb25zdCBub2RlID0gX3RyaWUubWF0Y2gocm91dGUpXG4gICAgaWYgKG5vZGUgJiYgbm9kZS5jYikge1xuICAgICAgYXJnc1swXSA9IG5vZGUucGFyYW1zXG4gICAgICByZXR1cm4gbm9kZS5jYi5hcHBseShudWxsLCBhcmdzKVxuICAgIH1cblxuICAgIGNvbnN0IGRmdCA9IF90cmllLm1hdGNoKF9kZWZhdWx0KVxuICAgIGlmIChkZnQgJiYgZGZ0LmNiKSB7XG4gICAgICBhcmdzWzBdID0gZGZ0LnBhcmFtc1xuICAgICAgcmV0dXJuIGRmdC5jYi5hcHBseShudWxsLCBhcmdzKVxuICAgIH1cblxuICAgIHRocm93IG5ldyBFcnJvcihcInJvdXRlICdcIiArIHJvdXRlICsgXCInIGRpZCBub3QgbWF0Y2hcIilcbiAgfVxufVxuIiwiY29uc3QgbXV0YXRlID0gcmVxdWlyZSgneHRlbmQvbXV0YWJsZScpXG5jb25zdCBhc3NlcnQgPSByZXF1aXJlKCdhc3NlcnQnKVxuY29uc3QgeHRlbmQgPSByZXF1aXJlKCd4dGVuZCcpXG5cbm1vZHVsZS5leHBvcnRzID0gVHJpZVxuXG4vLyBjcmVhdGUgYSBuZXcgdHJpZVxuLy8gbnVsbCAtPiBvYmpcbmZ1bmN0aW9uIFRyaWUgKCkge1xuICBpZiAoISh0aGlzIGluc3RhbmNlb2YgVHJpZSkpIHJldHVybiBuZXcgVHJpZSgpXG4gIHRoaXMudHJpZSA9IHsgbm9kZXM6IHt9IH1cbn1cblxuLy8gY3JlYXRlIGEgbm9kZSBvbiB0aGUgdHJpZSBhdCByb3V0ZVxuLy8gYW5kIHJldHVybiBhIG5vZGVcbi8vIHN0ciAtPiBudWxsXG5UcmllLnByb3RvdHlwZS5jcmVhdGUgPSBmdW5jdGlvbiAocm91dGUpIHtcbiAgYXNzZXJ0LmVxdWFsKHR5cGVvZiByb3V0ZSwgJ3N0cmluZycsICdyb3V0ZSBzaG91bGQgYmUgYSBzdHJpbmcnKVxuICAvLyBzdHJpcCBsZWFkaW5nICcvJyBhbmQgc3BsaXQgcm91dGVzXG4gIGNvbnN0IHJvdXRlcyA9IHJvdXRlLnJlcGxhY2UoL15cXC8vLCAnJykuc3BsaXQoJy8nKVxuICByZXR1cm4gKGZ1bmN0aW9uIGNyZWF0ZU5vZGUgKGluZGV4LCB0cmllLCByb3V0ZXMpIHtcbiAgICBjb25zdCByb3V0ZSA9IHJvdXRlc1tpbmRleF1cblxuICAgIGlmIChyb3V0ZSA9PT0gdW5kZWZpbmVkKSByZXR1cm4gdHJpZVxuXG4gICAgdmFyIG5vZGUgPSBudWxsXG4gICAgaWYgKC9eOi8udGVzdChyb3V0ZSkpIHtcbiAgICAgIC8vIGlmIG5vZGUgaXMgYSBuYW1lIG1hdGNoLCBzZXQgbmFtZSBhbmQgYXBwZW5kIHRvICc6JyBub2RlXG4gICAgICBpZiAoIXRyaWUubm9kZXNbJyQkJ10pIHtcbiAgICAgICAgbm9kZSA9IHsgbm9kZXM6IHt9IH1cbiAgICAgICAgdHJpZS5ub2Rlc1snJCQnXSA9IG5vZGVcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG5vZGUgPSB0cmllLm5vZGVzWyckJCddXG4gICAgICB9XG4gICAgICB0cmllLm5hbWUgPSByb3V0ZS5yZXBsYWNlKC9eOi8sICcnKVxuICAgIH0gZWxzZSBpZiAoIXRyaWUubm9kZXNbcm91dGVdKSB7XG4gICAgICBub2RlID0geyBub2Rlczoge30gfVxuICAgICAgdHJpZS5ub2Rlc1tyb3V0ZV0gPSBub2RlXG4gICAgfSBlbHNlIHtcbiAgICAgIG5vZGUgPSB0cmllLm5vZGVzW3JvdXRlXVxuICAgIH1cblxuICAgIC8vIHdlIG11c3QgcmVjdXJzZSBkZWVwZXJcbiAgICByZXR1cm4gY3JlYXRlTm9kZShpbmRleCArIDEsIG5vZGUsIHJvdXRlcylcbiAgfSkoMCwgdGhpcy50cmllLCByb3V0ZXMpXG59XG5cbi8vIG1hdGNoIGEgcm91dGUgb24gdGhlIHRyaWVcbi8vIGFuZCByZXR1cm4gdGhlIG5vZGVcbi8vIHN0ciAtPiBvYmpcblRyaWUucHJvdG90eXBlLm1hdGNoID0gZnVuY3Rpb24gKHJvdXRlKSB7XG4gIGFzc2VydC5lcXVhbCh0eXBlb2Ygcm91dGUsICdzdHJpbmcnLCAncm91dGUgc2hvdWxkIGJlIGEgc3RyaW5nJylcblxuICBjb25zdCByb3V0ZXMgPSByb3V0ZS5yZXBsYWNlKC9eXFwvLywgJycpLnNwbGl0KCcvJylcbiAgY29uc3QgcGFyYW1zID0ge31cblxuICB2YXIgbm9kZSA9IChmdW5jdGlvbiBzZWFyY2ggKGluZGV4LCB0cmllKSB7XG4gICAgLy8gZWl0aGVyIHRoZXJlJ3Mgbm8gbWF0Y2gsIG9yIHdlJ3JlIGRvbmUgc2VhcmNoaW5nXG4gICAgaWYgKHRyaWUgPT09IHVuZGVmaW5lZCkgcmV0dXJuIHVuZGVmaW5lZFxuICAgIGNvbnN0IHJvdXRlID0gcm91dGVzW2luZGV4XVxuICAgIGlmIChyb3V0ZSA9PT0gdW5kZWZpbmVkKSByZXR1cm4gdHJpZVxuXG4gICAgaWYgKHRyaWUubm9kZXNbcm91dGVdKSB7XG4gICAgICAvLyBtYXRjaCByZWd1bGFyIHJvdXRlcyBmaXJzdFxuICAgICAgcmV0dXJuIHNlYXJjaChpbmRleCArIDEsIHRyaWUubm9kZXNbcm91dGVdKVxuICAgIH0gZWxzZSBpZiAodHJpZS5uYW1lKSB7XG4gICAgICAvLyBtYXRjaCBuYW1lZCByb3V0ZXNcbiAgICAgIHBhcmFtc1t0cmllLm5hbWVdID0gcm91dGVcbiAgICAgIHJldHVybiBzZWFyY2goaW5kZXggKyAxLCB0cmllLm5vZGVzWyckJCddKVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBubyBtYXRjaGVzIGZvdW5kXG4gICAgICByZXR1cm4gc2VhcmNoKGluZGV4ICsgMSlcbiAgICB9XG4gIH0pKDAsIHRoaXMudHJpZSlcblxuICBpZiAoIW5vZGUpIHJldHVybiB1bmRlZmluZWRcbiAgbm9kZSA9IHh0ZW5kKG5vZGUpXG4gIG5vZGUucGFyYW1zID0gcGFyYW1zXG4gIHJldHVybiBub2RlXG59XG5cbi8vIG1vdW50IGEgdHJpZSBvbnRvIGEgbm9kZSBhdCByb3V0ZVxuLy8gKHN0ciwgb2JqKSAtPiBudWxsXG5UcmllLnByb3RvdHlwZS5tb3VudCA9IGZ1bmN0aW9uIChyb3V0ZSwgdHJpZSkge1xuICBhc3NlcnQuZXF1YWwodHlwZW9mIHJvdXRlLCAnc3RyaW5nJywgJ3JvdXRlIHNob3VsZCBiZSBhIHN0cmluZycpXG4gIGFzc2VydC5lcXVhbCh0eXBlb2YgdHJpZSwgJ29iamVjdCcsICd0cmllIHNob3VsZCBiZSBhIG9iamVjdCcpXG5cbiAgY29uc3Qgc3BsaXQgPSByb3V0ZS5yZXBsYWNlKC9eXFwvLywgJycpLnNwbGl0KCcvJylcbiAgdmFyIG5vZGUgPSBudWxsXG4gIHZhciBrZXkgPSBudWxsXG5cbiAgaWYgKHNwbGl0Lmxlbmd0aCA9PT0gMSkge1xuICAgIGtleSA9IHNwbGl0WzBdXG4gICAgbm9kZSA9IHRoaXMuY3JlYXRlKGtleSlcbiAgfSBlbHNlIHtcbiAgICBjb25zdCBoZWFkQXJyID0gc3BsaXQuc3BsaWNlKDAsIHNwbGl0Lmxlbmd0aCAtIDEpXG4gICAgY29uc3QgaGVhZCA9IGhlYWRBcnIuam9pbignLycpXG4gICAga2V5ID0gc3BsaXRbMF1cbiAgICBub2RlID0gdGhpcy5jcmVhdGUoaGVhZClcbiAgfVxuXG4gIG11dGF0ZShub2RlLm5vZGVzLCB0cmllLm5vZGVzKVxuICBpZiAodHJpZS5uYW1lKSBub2RlLm5hbWUgPSB0cmllLm5hbWVcblxuICAvLyBkZWxlZ2F0ZSBwcm9wZXJ0aWVzIGZyb20gJy8nIHRvIHRoZSBuZXcgbm9kZVxuICAvLyAnLycgY2Fubm90IGJlIHJlYWNoZWQgb25jZSBtb3VudGVkXG4gIGlmIChub2RlLm5vZGVzWycnXSkge1xuICAgIE9iamVjdC5rZXlzKG5vZGUubm9kZXNbJyddKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgIGlmIChrZXkgPT09ICdub2RlcycpIHJldHVyblxuICAgICAgbm9kZVtrZXldID0gbm9kZS5ub2Rlc1snJ11ba2V5XVxuICAgIH0pXG4gICAgbXV0YXRlKG5vZGUubm9kZXMsIG5vZGUubm9kZXNbJyddLm5vZGVzKVxuICAgIGRlbGV0ZSBub2RlLm5vZGVzWycnXS5ub2Rlc1xuICB9XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGV4dGVuZFxuXG52YXIgaGFzT3duUHJvcGVydHkgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xuXG5mdW5jdGlvbiBleHRlbmQoKSB7XG4gICAgdmFyIHRhcmdldCA9IHt9XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldXG5cbiAgICAgICAgZm9yICh2YXIga2V5IGluIHNvdXJjZSkge1xuICAgICAgICAgICAgaWYgKGhhc093blByb3BlcnR5LmNhbGwoc291cmNlLCBrZXkpKSB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRhcmdldFxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSBleHRlbmRcblxudmFyIGhhc093blByb3BlcnR5ID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcblxuZnVuY3Rpb24gZXh0ZW5kKHRhcmdldCkge1xuICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV1cblxuICAgICAgICBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7XG4gICAgICAgICAgICBpZiAoaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHtcbiAgICAgICAgICAgICAgICB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdGFyZ2V0XG59XG4iLCJ2YXIgYmVsID0gcmVxdWlyZSgnYmVsJykgLy8gdHVybnMgdGVtcGxhdGUgdGFnIGludG8gRE9NIGVsZW1lbnRzXG52YXIgbW9ycGhkb20gPSByZXF1aXJlKCdtb3JwaGRvbScpIC8vIGVmZmljaWVudGx5IGRpZmZzICsgbW9ycGhzIHR3byBET00gZWxlbWVudHNcbnZhciBkZWZhdWx0RXZlbnRzID0gcmVxdWlyZSgnLi91cGRhdGUtZXZlbnRzLmpzJykgLy8gZGVmYXVsdCBldmVudHMgdG8gYmUgY29waWVkIHdoZW4gZG9tIGVsZW1lbnRzIHVwZGF0ZVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJlbFxuXG4vLyBUT0RPIG1vdmUgdGhpcyArIGRlZmF1bHRFdmVudHMgdG8gYSBuZXcgbW9kdWxlIG9uY2Ugd2UgcmVjZWl2ZSBtb3JlIGZlZWRiYWNrXG5tb2R1bGUuZXhwb3J0cy51cGRhdGUgPSBmdW5jdGlvbiAoZnJvbU5vZGUsIHRvTm9kZSwgb3B0cykge1xuICBpZiAoIW9wdHMpIG9wdHMgPSB7fVxuICBpZiAob3B0cy5ldmVudHMgIT09IGZhbHNlKSB7XG4gICAgaWYgKCFvcHRzLm9uQmVmb3JlTW9ycGhFbCkgb3B0cy5vbkJlZm9yZU1vcnBoRWwgPSBjb3BpZXJcbiAgfVxuXG4gIHJldHVybiBtb3JwaGRvbShmcm9tTm9kZSwgdG9Ob2RlLCBvcHRzKVxuXG4gIC8vIG1vcnBoZG9tIG9ubHkgY29waWVzIGF0dHJpYnV0ZXMuIHdlIGRlY2lkZWQgd2UgYWxzbyB3YW50ZWQgdG8gY29weSBldmVudHNcbiAgLy8gdGhhdCBjYW4gYmUgc2V0IHZpYSBhdHRyaWJ1dGVzXG4gIGZ1bmN0aW9uIGNvcGllciAoZiwgdCkge1xuICAgIC8vIGNvcHkgZXZlbnRzOlxuICAgIHZhciBldmVudHMgPSBvcHRzLmV2ZW50cyB8fCBkZWZhdWx0RXZlbnRzXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBldmVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBldiA9IGV2ZW50c1tpXVxuICAgICAgaWYgKHRbZXZdKSB7IC8vIGlmIG5ldyBlbGVtZW50IGhhcyBhIHdoaXRlbGlzdGVkIGF0dHJpYnV0ZVxuICAgICAgICBmW2V2XSA9IHRbZXZdIC8vIHVwZGF0ZSBleGlzdGluZyBlbGVtZW50XG4gICAgICB9IGVsc2UgaWYgKGZbZXZdKSB7IC8vIGlmIGV4aXN0aW5nIGVsZW1lbnQgaGFzIGl0IGFuZCBuZXcgb25lIGRvZXNudFxuICAgICAgICBmW2V2XSA9IHVuZGVmaW5lZCAvLyByZW1vdmUgaXQgZnJvbSBleGlzdGluZyBlbGVtZW50XG4gICAgICB9XG4gICAgfVxuICAgIC8vIGNvcHkgdmFsdWVzIGZvciBmb3JtIGVsZW1lbnRzXG4gICAgaWYgKChmLm5vZGVOYW1lID09PSAnSU5QVVQnICYmIGYudHlwZSAhPT0gJ2ZpbGUnKSB8fCBmLm5vZGVOYW1lID09PSAnVEVYVEFSRUEnIHx8IGYubm9kZU5hbWUgPT09ICdTRUxFQ1QnKSB7XG4gICAgICBpZiAodC5nZXRBdHRyaWJ1dGUoJ3ZhbHVlJykgPT09IG51bGwpIHQudmFsdWUgPSBmLnZhbHVlXG4gICAgfVxuICB9XG59XG4iLCJ2YXIgZG9jdW1lbnQgPSByZXF1aXJlKCdnbG9iYWwvZG9jdW1lbnQnKVxudmFyIGh5cGVyeCA9IHJlcXVpcmUoJ2h5cGVyeCcpXG5cbnZhciBTVkdOUyA9ICdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZydcbnZhciBCT09MX1BST1BTID0ge1xuICBhdXRvZm9jdXM6IDEsXG4gIGNoZWNrZWQ6IDEsXG4gIGRlZmF1bHRjaGVja2VkOiAxLFxuICBkaXNhYmxlZDogMSxcbiAgZm9ybW5vdmFsaWRhdGU6IDEsXG4gIGluZGV0ZXJtaW5hdGU6IDEsXG4gIHJlYWRvbmx5OiAxLFxuICByZXF1aXJlZDogMSxcbiAgd2lsbHZhbGlkYXRlOiAxXG59XG52YXIgU1ZHX1RBR1MgPSBbXG4gICdzdmcnLFxuICAnYWx0R2x5cGgnLCAnYWx0R2x5cGhEZWYnLCAnYWx0R2x5cGhJdGVtJywgJ2FuaW1hdGUnLCAnYW5pbWF0ZUNvbG9yJyxcbiAgJ2FuaW1hdGVNb3Rpb24nLCAnYW5pbWF0ZVRyYW5zZm9ybScsICdjaXJjbGUnLCAnY2xpcFBhdGgnLCAnY29sb3ItcHJvZmlsZScsXG4gICdjdXJzb3InLCAnZGVmcycsICdkZXNjJywgJ2VsbGlwc2UnLCAnZmVCbGVuZCcsICdmZUNvbG9yTWF0cml4JyxcbiAgJ2ZlQ29tcG9uZW50VHJhbnNmZXInLCAnZmVDb21wb3NpdGUnLCAnZmVDb252b2x2ZU1hdHJpeCcsICdmZURpZmZ1c2VMaWdodGluZycsXG4gICdmZURpc3BsYWNlbWVudE1hcCcsICdmZURpc3RhbnRMaWdodCcsICdmZUZsb29kJywgJ2ZlRnVuY0EnLCAnZmVGdW5jQicsXG4gICdmZUZ1bmNHJywgJ2ZlRnVuY1InLCAnZmVHYXVzc2lhbkJsdXInLCAnZmVJbWFnZScsICdmZU1lcmdlJywgJ2ZlTWVyZ2VOb2RlJyxcbiAgJ2ZlTW9ycGhvbG9neScsICdmZU9mZnNldCcsICdmZVBvaW50TGlnaHQnLCAnZmVTcGVjdWxhckxpZ2h0aW5nJyxcbiAgJ2ZlU3BvdExpZ2h0JywgJ2ZlVGlsZScsICdmZVR1cmJ1bGVuY2UnLCAnZmlsdGVyJywgJ2ZvbnQnLCAnZm9udC1mYWNlJyxcbiAgJ2ZvbnQtZmFjZS1mb3JtYXQnLCAnZm9udC1mYWNlLW5hbWUnLCAnZm9udC1mYWNlLXNyYycsICdmb250LWZhY2UtdXJpJyxcbiAgJ2ZvcmVpZ25PYmplY3QnLCAnZycsICdnbHlwaCcsICdnbHlwaFJlZicsICdoa2VybicsICdpbWFnZScsICdsaW5lJyxcbiAgJ2xpbmVhckdyYWRpZW50JywgJ21hcmtlcicsICdtYXNrJywgJ21ldGFkYXRhJywgJ21pc3NpbmctZ2x5cGgnLCAnbXBhdGgnLFxuICAncGF0aCcsICdwYXR0ZXJuJywgJ3BvbHlnb24nLCAncG9seWxpbmUnLCAncmFkaWFsR3JhZGllbnQnLCAncmVjdCcsXG4gICdzZXQnLCAnc3RvcCcsICdzd2l0Y2gnLCAnc3ltYm9sJywgJ3RleHQnLCAndGV4dFBhdGgnLCAndGl0bGUnLCAndHJlZicsXG4gICd0c3BhbicsICd1c2UnLCAndmlldycsICd2a2Vybidcbl1cblxuZnVuY3Rpb24gYmVsQ3JlYXRlRWxlbWVudCAodGFnLCBwcm9wcywgY2hpbGRyZW4pIHtcbiAgdmFyIGVsXG5cbiAgLy8gSWYgYW4gc3ZnIHRhZywgaXQgbmVlZHMgYSBuYW1lc3BhY2VcbiAgaWYgKFNWR19UQUdTLmluZGV4T2YodGFnKSAhPT0gLTEpIHtcbiAgICBwcm9wcy5uYW1lc3BhY2UgPSBTVkdOU1xuICB9XG5cbiAgLy8gSWYgd2UgYXJlIHVzaW5nIGEgbmFtZXNwYWNlXG4gIHZhciBucyA9IGZhbHNlXG4gIGlmIChwcm9wcy5uYW1lc3BhY2UpIHtcbiAgICBucyA9IHByb3BzLm5hbWVzcGFjZVxuICAgIGRlbGV0ZSBwcm9wcy5uYW1lc3BhY2VcbiAgfVxuXG4gIC8vIENyZWF0ZSB0aGUgZWxlbWVudFxuICBpZiAobnMpIHtcbiAgICBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhucywgdGFnKVxuICB9IGVsc2Uge1xuICAgIGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0YWcpXG4gIH1cblxuICAvLyBDcmVhdGUgdGhlIHByb3BlcnRpZXNcbiAgZm9yICh2YXIgcCBpbiBwcm9wcykge1xuICAgIGlmIChwcm9wcy5oYXNPd25Qcm9wZXJ0eShwKSkge1xuICAgICAgdmFyIGtleSA9IHAudG9Mb3dlckNhc2UoKVxuICAgICAgdmFyIHZhbCA9IHByb3BzW3BdXG4gICAgICAvLyBOb3JtYWxpemUgY2xhc3NOYW1lXG4gICAgICBpZiAoa2V5ID09PSAnY2xhc3NuYW1lJykge1xuICAgICAgICBrZXkgPSAnY2xhc3MnXG4gICAgICAgIHAgPSAnY2xhc3MnXG4gICAgICB9XG4gICAgICAvLyBUaGUgZm9yIGF0dHJpYnV0ZSBnZXRzIHRyYW5zZm9ybWVkIHRvIGh0bWxGb3IsIGJ1dCB3ZSBqdXN0IHNldCBhcyBmb3JcbiAgICAgIGlmIChwID09PSAnaHRtbEZvcicpIHtcbiAgICAgICAgcCA9ICdmb3InXG4gICAgICB9XG4gICAgICAvLyBJZiBhIHByb3BlcnR5IGlzIGJvb2xlYW4sIHNldCBpdHNlbGYgdG8gdGhlIGtleVxuICAgICAgaWYgKEJPT0xfUFJPUFNba2V5XSkge1xuICAgICAgICBpZiAodmFsID09PSAndHJ1ZScpIHZhbCA9IGtleVxuICAgICAgICBlbHNlIGlmICh2YWwgPT09ICdmYWxzZScpIGNvbnRpbnVlXG4gICAgICB9XG4gICAgICAvLyBJZiBhIHByb3BlcnR5IHByZWZlcnMgYmVpbmcgc2V0IGRpcmVjdGx5IHZzIHNldEF0dHJpYnV0ZVxuICAgICAgaWYgKGtleS5zbGljZSgwLCAyKSA9PT0gJ29uJykge1xuICAgICAgICBlbFtwXSA9IHZhbFxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKG5zKSB7XG4gICAgICAgICAgZWwuc2V0QXR0cmlidXRlTlMobnVsbCwgcCwgdmFsKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGVsLnNldEF0dHJpYnV0ZShwLCB2YWwpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBhcHBlbmRDaGlsZCAoY2hpbGRzKSB7XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KGNoaWxkcykpIHJldHVyblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2hpbGRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgbm9kZSA9IGNoaWxkc1tpXVxuICAgICAgaWYgKEFycmF5LmlzQXJyYXkobm9kZSkpIHtcbiAgICAgICAgYXBwZW5kQ2hpbGQobm9kZSlcbiAgICAgICAgY29udGludWVcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiBub2RlID09PSAnbnVtYmVyJyB8fFxuICAgICAgICB0eXBlb2Ygbm9kZSA9PT0gJ2Jvb2xlYW4nIHx8XG4gICAgICAgIG5vZGUgaW5zdGFuY2VvZiBEYXRlIHx8XG4gICAgICAgIG5vZGUgaW5zdGFuY2VvZiBSZWdFeHApIHtcbiAgICAgICAgbm9kZSA9IG5vZGUudG9TdHJpbmcoKVxuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIG5vZGUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIGlmIChlbC5sYXN0Q2hpbGQgJiYgZWwubGFzdENoaWxkLm5vZGVOYW1lID09PSAnI3RleHQnKSB7XG4gICAgICAgICAgZWwubGFzdENoaWxkLm5vZGVWYWx1ZSArPSBub2RlXG4gICAgICAgICAgY29udGludWVcbiAgICAgICAgfVxuICAgICAgICBub2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUobm9kZSlcbiAgICAgIH1cblxuICAgICAgaWYgKG5vZGUgJiYgbm9kZS5ub2RlVHlwZSkge1xuICAgICAgICBlbC5hcHBlbmRDaGlsZChub2RlKVxuICAgICAgfVxuICAgIH1cbiAgfVxuICBhcHBlbmRDaGlsZChjaGlsZHJlbilcblxuICByZXR1cm4gZWxcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBoeXBlcngoYmVsQ3JlYXRlRWxlbWVudClcbm1vZHVsZS5leHBvcnRzLmNyZWF0ZUVsZW1lbnQgPSBiZWxDcmVhdGVFbGVtZW50XG4iLCJ2YXIgYXR0clRvUHJvcCA9IHJlcXVpcmUoJ2h5cGVyc2NyaXB0LWF0dHJpYnV0ZS10by1wcm9wZXJ0eScpXG5cbnZhciBWQVIgPSAwLCBURVhUID0gMSwgT1BFTiA9IDIsIENMT1NFID0gMywgQVRUUiA9IDRcbnZhciBBVFRSX0tFWSA9IDUsIEFUVFJfS0VZX1cgPSA2XG52YXIgQVRUUl9WQUxVRV9XID0gNywgQVRUUl9WQUxVRSA9IDhcbnZhciBBVFRSX1ZBTFVFX1NRID0gOSwgQVRUUl9WQUxVRV9EUSA9IDEwXG52YXIgQVRUUl9FUSA9IDExLCBBVFRSX0JSRUFLID0gMTJcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaCwgb3B0cykge1xuICBoID0gYXR0clRvUHJvcChoKVxuICBpZiAoIW9wdHMpIG9wdHMgPSB7fVxuICB2YXIgY29uY2F0ID0gb3B0cy5jb25jYXQgfHwgZnVuY3Rpb24gKGEsIGIpIHtcbiAgICByZXR1cm4gU3RyaW5nKGEpICsgU3RyaW5nKGIpXG4gIH1cblxuICByZXR1cm4gZnVuY3Rpb24gKHN0cmluZ3MpIHtcbiAgICB2YXIgc3RhdGUgPSBURVhULCByZWcgPSAnJ1xuICAgIHZhciBhcmdsZW4gPSBhcmd1bWVudHMubGVuZ3RoXG4gICAgdmFyIHBhcnRzID0gW11cblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc3RyaW5ncy5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKGkgPCBhcmdsZW4gLSAxKSB7XG4gICAgICAgIHZhciBhcmcgPSBhcmd1bWVudHNbaSsxXVxuICAgICAgICB2YXIgcCA9IHBhcnNlKHN0cmluZ3NbaV0pXG4gICAgICAgIHZhciB4c3RhdGUgPSBzdGF0ZVxuICAgICAgICBpZiAoeHN0YXRlID09PSBBVFRSX1ZBTFVFX0RRKSB4c3RhdGUgPSBBVFRSX1ZBTFVFXG4gICAgICAgIGlmICh4c3RhdGUgPT09IEFUVFJfVkFMVUVfU1EpIHhzdGF0ZSA9IEFUVFJfVkFMVUVcbiAgICAgICAgaWYgKHhzdGF0ZSA9PT0gQVRUUl9WQUxVRV9XKSB4c3RhdGUgPSBBVFRSX1ZBTFVFXG4gICAgICAgIGlmICh4c3RhdGUgPT09IEFUVFIpIHhzdGF0ZSA9IEFUVFJfS0VZXG4gICAgICAgIHAucHVzaChbIFZBUiwgeHN0YXRlLCBhcmcgXSlcbiAgICAgICAgcGFydHMucHVzaC5hcHBseShwYXJ0cywgcClcbiAgICAgIH0gZWxzZSBwYXJ0cy5wdXNoLmFwcGx5KHBhcnRzLCBwYXJzZShzdHJpbmdzW2ldKSlcbiAgICB9XG5cbiAgICB2YXIgdHJlZSA9IFtudWxsLHt9LFtdXVxuICAgIHZhciBzdGFjayA9IFtbdHJlZSwtMV1dXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwYXJ0cy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGN1ciA9IHN0YWNrW3N0YWNrLmxlbmd0aC0xXVswXVxuICAgICAgdmFyIHAgPSBwYXJ0c1tpXSwgcyA9IHBbMF1cbiAgICAgIGlmIChzID09PSBPUEVOICYmIC9eXFwvLy50ZXN0KHBbMV0pKSB7XG4gICAgICAgIHZhciBpeCA9IHN0YWNrW3N0YWNrLmxlbmd0aC0xXVsxXVxuICAgICAgICBpZiAoc3RhY2subGVuZ3RoID4gMSkge1xuICAgICAgICAgIHN0YWNrLnBvcCgpXG4gICAgICAgICAgc3RhY2tbc3RhY2subGVuZ3RoLTFdWzBdWzJdW2l4XSA9IGgoXG4gICAgICAgICAgICBjdXJbMF0sIGN1clsxXSwgY3VyWzJdLmxlbmd0aCA/IGN1clsyXSA6IHVuZGVmaW5lZFxuICAgICAgICAgIClcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChzID09PSBPUEVOKSB7XG4gICAgICAgIHZhciBjID0gW3BbMV0se30sW11dXG4gICAgICAgIGN1clsyXS5wdXNoKGMpXG4gICAgICAgIHN0YWNrLnB1c2goW2MsY3VyWzJdLmxlbmd0aC0xXSlcbiAgICAgIH0gZWxzZSBpZiAocyA9PT0gQVRUUl9LRVkgfHwgKHMgPT09IFZBUiAmJiBwWzFdID09PSBBVFRSX0tFWSkpIHtcbiAgICAgICAgdmFyIGtleSA9ICcnXG4gICAgICAgIHZhciBjb3B5S2V5XG4gICAgICAgIGZvciAoOyBpIDwgcGFydHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBpZiAocGFydHNbaV1bMF0gPT09IEFUVFJfS0VZKSB7XG4gICAgICAgICAgICBrZXkgPSBjb25jYXQoa2V5LCBwYXJ0c1tpXVsxXSlcbiAgICAgICAgICB9IGVsc2UgaWYgKHBhcnRzW2ldWzBdID09PSBWQVIgJiYgcGFydHNbaV1bMV0gPT09IEFUVFJfS0VZKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHBhcnRzW2ldWzJdID09PSAnb2JqZWN0JyAmJiAha2V5KSB7XG4gICAgICAgICAgICAgIGZvciAoY29weUtleSBpbiBwYXJ0c1tpXVsyXSkge1xuICAgICAgICAgICAgICAgIGlmIChwYXJ0c1tpXVsyXS5oYXNPd25Qcm9wZXJ0eShjb3B5S2V5KSAmJiAhY3VyWzFdW2NvcHlLZXldKSB7XG4gICAgICAgICAgICAgICAgICBjdXJbMV1bY29weUtleV0gPSBwYXJ0c1tpXVsyXVtjb3B5S2V5XVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAga2V5ID0gY29uY2F0KGtleSwgcGFydHNbaV1bMl0pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIGJyZWFrXG4gICAgICAgIH1cbiAgICAgICAgaWYgKHBhcnRzW2ldWzBdID09PSBBVFRSX0VRKSBpKytcbiAgICAgICAgdmFyIGogPSBpXG4gICAgICAgIGZvciAoOyBpIDwgcGFydHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBpZiAocGFydHNbaV1bMF0gPT09IEFUVFJfVkFMVUUgfHwgcGFydHNbaV1bMF0gPT09IEFUVFJfS0VZKSB7XG4gICAgICAgICAgICBpZiAoIWN1clsxXVtrZXldKSBjdXJbMV1ba2V5XSA9IHN0cmZuKHBhcnRzW2ldWzFdKVxuICAgICAgICAgICAgZWxzZSBjdXJbMV1ba2V5XSA9IGNvbmNhdChjdXJbMV1ba2V5XSwgcGFydHNbaV1bMV0pXG4gICAgICAgICAgfSBlbHNlIGlmIChwYXJ0c1tpXVswXSA9PT0gVkFSXG4gICAgICAgICAgJiYgKHBhcnRzW2ldWzFdID09PSBBVFRSX1ZBTFVFIHx8IHBhcnRzW2ldWzFdID09PSBBVFRSX0tFWSkpIHtcbiAgICAgICAgICAgIGlmICghY3VyWzFdW2tleV0pIGN1clsxXVtrZXldID0gc3RyZm4ocGFydHNbaV1bMl0pXG4gICAgICAgICAgICBlbHNlIGN1clsxXVtrZXldID0gY29uY2F0KGN1clsxXVtrZXldLCBwYXJ0c1tpXVsyXSlcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKGtleS5sZW5ndGggJiYgIWN1clsxXVtrZXldICYmIGkgPT09IGpcbiAgICAgICAgICAgICYmIChwYXJ0c1tpXVswXSA9PT0gQ0xPU0UgfHwgcGFydHNbaV1bMF0gPT09IEFUVFJfQlJFQUspKSB7XG4gICAgICAgICAgICAgIC8vIGh0dHBzOi8vaHRtbC5zcGVjLndoYXR3Zy5vcmcvbXVsdGlwYWdlL2luZnJhc3RydWN0dXJlLmh0bWwjYm9vbGVhbi1hdHRyaWJ1dGVzXG4gICAgICAgICAgICAgIC8vIGVtcHR5IHN0cmluZyBpcyBmYWxzeSwgbm90IHdlbGwgYmVoYXZlZCB2YWx1ZSBpbiBicm93c2VyXG4gICAgICAgICAgICAgIGN1clsxXVtrZXldID0ga2V5LnRvTG93ZXJDYXNlKClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHMgPT09IEFUVFJfS0VZKSB7XG4gICAgICAgIGN1clsxXVtwWzFdXSA9IHRydWVcbiAgICAgIH0gZWxzZSBpZiAocyA9PT0gVkFSICYmIHBbMV0gPT09IEFUVFJfS0VZKSB7XG4gICAgICAgIGN1clsxXVtwWzJdXSA9IHRydWVcbiAgICAgIH0gZWxzZSBpZiAocyA9PT0gQ0xPU0UpIHtcbiAgICAgICAgaWYgKHNlbGZDbG9zaW5nKGN1clswXSkgJiYgc3RhY2subGVuZ3RoKSB7XG4gICAgICAgICAgdmFyIGl4ID0gc3RhY2tbc3RhY2subGVuZ3RoLTFdWzFdXG4gICAgICAgICAgc3RhY2sucG9wKClcbiAgICAgICAgICBzdGFja1tzdGFjay5sZW5ndGgtMV1bMF1bMl1baXhdID0gaChcbiAgICAgICAgICAgIGN1clswXSwgY3VyWzFdLCBjdXJbMl0ubGVuZ3RoID8gY3VyWzJdIDogdW5kZWZpbmVkXG4gICAgICAgICAgKVxuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHMgPT09IFZBUiAmJiBwWzFdID09PSBURVhUKSB7XG4gICAgICAgIGlmIChwWzJdID09PSB1bmRlZmluZWQgfHwgcFsyXSA9PT0gbnVsbCkgcFsyXSA9ICcnXG4gICAgICAgIGVsc2UgaWYgKCFwWzJdKSBwWzJdID0gY29uY2F0KCcnLCBwWzJdKVxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShwWzJdWzBdKSkge1xuICAgICAgICAgIGN1clsyXS5wdXNoLmFwcGx5KGN1clsyXSwgcFsyXSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjdXJbMl0ucHVzaChwWzJdKVxuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHMgPT09IFRFWFQpIHtcbiAgICAgICAgY3VyWzJdLnB1c2gocFsxXSlcbiAgICAgIH0gZWxzZSBpZiAocyA9PT0gQVRUUl9FUSB8fCBzID09PSBBVFRSX0JSRUFLKSB7XG4gICAgICAgIC8vIG5vLW9wXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3VuaGFuZGxlZDogJyArIHMpXG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHRyZWVbMl0ubGVuZ3RoID4gMSAmJiAvXlxccyokLy50ZXN0KHRyZWVbMl1bMF0pKSB7XG4gICAgICB0cmVlWzJdLnNoaWZ0KClcbiAgICB9XG5cbiAgICBpZiAodHJlZVsyXS5sZW5ndGggPiAyXG4gICAgfHwgKHRyZWVbMl0ubGVuZ3RoID09PSAyICYmIC9cXFMvLnRlc3QodHJlZVsyXVsxXSkpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICdtdWx0aXBsZSByb290IGVsZW1lbnRzIG11c3QgYmUgd3JhcHBlZCBpbiBhbiBlbmNsb3NpbmcgdGFnJ1xuICAgICAgKVxuICAgIH1cbiAgICBpZiAoQXJyYXkuaXNBcnJheSh0cmVlWzJdWzBdKSAmJiB0eXBlb2YgdHJlZVsyXVswXVswXSA9PT0gJ3N0cmluZydcbiAgICAmJiBBcnJheS5pc0FycmF5KHRyZWVbMl1bMF1bMl0pKSB7XG4gICAgICB0cmVlWzJdWzBdID0gaCh0cmVlWzJdWzBdWzBdLCB0cmVlWzJdWzBdWzFdLCB0cmVlWzJdWzBdWzJdKVxuICAgIH1cbiAgICByZXR1cm4gdHJlZVsyXVswXVxuXG4gICAgZnVuY3Rpb24gcGFyc2UgKHN0cikge1xuICAgICAgdmFyIHJlcyA9IFtdXG4gICAgICBpZiAoc3RhdGUgPT09IEFUVFJfVkFMVUVfVykgc3RhdGUgPSBBVFRSXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHN0ci5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgYyA9IHN0ci5jaGFyQXQoaSlcbiAgICAgICAgaWYgKHN0YXRlID09PSBURVhUICYmIGMgPT09ICc8Jykge1xuICAgICAgICAgIGlmIChyZWcubGVuZ3RoKSByZXMucHVzaChbVEVYVCwgcmVnXSlcbiAgICAgICAgICByZWcgPSAnJ1xuICAgICAgICAgIHN0YXRlID0gT1BFTlxuICAgICAgICB9IGVsc2UgaWYgKGMgPT09ICc+JyAmJiAhcXVvdChzdGF0ZSkpIHtcbiAgICAgICAgICBpZiAoc3RhdGUgPT09IE9QRU4pIHtcbiAgICAgICAgICAgIHJlcy5wdXNoKFtPUEVOLHJlZ10pXG4gICAgICAgICAgfSBlbHNlIGlmIChzdGF0ZSA9PT0gQVRUUl9LRVkpIHtcbiAgICAgICAgICAgIHJlcy5wdXNoKFtBVFRSX0tFWSxyZWddKVxuICAgICAgICAgIH0gZWxzZSBpZiAoc3RhdGUgPT09IEFUVFJfVkFMVUUgJiYgcmVnLmxlbmd0aCkge1xuICAgICAgICAgICAgcmVzLnB1c2goW0FUVFJfVkFMVUUscmVnXSlcbiAgICAgICAgICB9XG4gICAgICAgICAgcmVzLnB1c2goW0NMT1NFXSlcbiAgICAgICAgICByZWcgPSAnJ1xuICAgICAgICAgIHN0YXRlID0gVEVYVFxuICAgICAgICB9IGVsc2UgaWYgKHN0YXRlID09PSBURVhUKSB7XG4gICAgICAgICAgcmVnICs9IGNcbiAgICAgICAgfSBlbHNlIGlmIChzdGF0ZSA9PT0gT1BFTiAmJiAvXFxzLy50ZXN0KGMpKSB7XG4gICAgICAgICAgcmVzLnB1c2goW09QRU4sIHJlZ10pXG4gICAgICAgICAgcmVnID0gJydcbiAgICAgICAgICBzdGF0ZSA9IEFUVFJcbiAgICAgICAgfSBlbHNlIGlmIChzdGF0ZSA9PT0gT1BFTikge1xuICAgICAgICAgIHJlZyArPSBjXG4gICAgICAgIH0gZWxzZSBpZiAoc3RhdGUgPT09IEFUVFIgJiYgL1tcXHctXS8udGVzdChjKSkge1xuICAgICAgICAgIHN0YXRlID0gQVRUUl9LRVlcbiAgICAgICAgICByZWcgPSBjXG4gICAgICAgIH0gZWxzZSBpZiAoc3RhdGUgPT09IEFUVFIgJiYgL1xccy8udGVzdChjKSkge1xuICAgICAgICAgIGlmIChyZWcubGVuZ3RoKSByZXMucHVzaChbQVRUUl9LRVkscmVnXSlcbiAgICAgICAgICByZXMucHVzaChbQVRUUl9CUkVBS10pXG4gICAgICAgIH0gZWxzZSBpZiAoc3RhdGUgPT09IEFUVFJfS0VZICYmIC9cXHMvLnRlc3QoYykpIHtcbiAgICAgICAgICByZXMucHVzaChbQVRUUl9LRVkscmVnXSlcbiAgICAgICAgICByZWcgPSAnJ1xuICAgICAgICAgIHN0YXRlID0gQVRUUl9LRVlfV1xuICAgICAgICB9IGVsc2UgaWYgKHN0YXRlID09PSBBVFRSX0tFWSAmJiBjID09PSAnPScpIHtcbiAgICAgICAgICByZXMucHVzaChbQVRUUl9LRVkscmVnXSxbQVRUUl9FUV0pXG4gICAgICAgICAgcmVnID0gJydcbiAgICAgICAgICBzdGF0ZSA9IEFUVFJfVkFMVUVfV1xuICAgICAgICB9IGVsc2UgaWYgKHN0YXRlID09PSBBVFRSX0tFWSkge1xuICAgICAgICAgIHJlZyArPSBjXG4gICAgICAgIH0gZWxzZSBpZiAoKHN0YXRlID09PSBBVFRSX0tFWV9XIHx8IHN0YXRlID09PSBBVFRSKSAmJiBjID09PSAnPScpIHtcbiAgICAgICAgICByZXMucHVzaChbQVRUUl9FUV0pXG4gICAgICAgICAgc3RhdGUgPSBBVFRSX1ZBTFVFX1dcbiAgICAgICAgfSBlbHNlIGlmICgoc3RhdGUgPT09IEFUVFJfS0VZX1cgfHwgc3RhdGUgPT09IEFUVFIpICYmICEvXFxzLy50ZXN0KGMpKSB7XG4gICAgICAgICAgcmVzLnB1c2goW0FUVFJfQlJFQUtdKVxuICAgICAgICAgIGlmICgvW1xcdy1dLy50ZXN0KGMpKSB7XG4gICAgICAgICAgICByZWcgKz0gY1xuICAgICAgICAgICAgc3RhdGUgPSBBVFRSX0tFWVxuICAgICAgICAgIH0gZWxzZSBzdGF0ZSA9IEFUVFJcbiAgICAgICAgfSBlbHNlIGlmIChzdGF0ZSA9PT0gQVRUUl9WQUxVRV9XICYmIGMgPT09ICdcIicpIHtcbiAgICAgICAgICBzdGF0ZSA9IEFUVFJfVkFMVUVfRFFcbiAgICAgICAgfSBlbHNlIGlmIChzdGF0ZSA9PT0gQVRUUl9WQUxVRV9XICYmIGMgPT09IFwiJ1wiKSB7XG4gICAgICAgICAgc3RhdGUgPSBBVFRSX1ZBTFVFX1NRXG4gICAgICAgIH0gZWxzZSBpZiAoc3RhdGUgPT09IEFUVFJfVkFMVUVfRFEgJiYgYyA9PT0gJ1wiJykge1xuICAgICAgICAgIHJlcy5wdXNoKFtBVFRSX1ZBTFVFLHJlZ10sW0FUVFJfQlJFQUtdKVxuICAgICAgICAgIHJlZyA9ICcnXG4gICAgICAgICAgc3RhdGUgPSBBVFRSXG4gICAgICAgIH0gZWxzZSBpZiAoc3RhdGUgPT09IEFUVFJfVkFMVUVfU1EgJiYgYyA9PT0gXCInXCIpIHtcbiAgICAgICAgICByZXMucHVzaChbQVRUUl9WQUxVRSxyZWddLFtBVFRSX0JSRUFLXSlcbiAgICAgICAgICByZWcgPSAnJ1xuICAgICAgICAgIHN0YXRlID0gQVRUUlxuICAgICAgICB9IGVsc2UgaWYgKHN0YXRlID09PSBBVFRSX1ZBTFVFX1cgJiYgIS9cXHMvLnRlc3QoYykpIHtcbiAgICAgICAgICBzdGF0ZSA9IEFUVFJfVkFMVUVcbiAgICAgICAgICBpLS1cbiAgICAgICAgfSBlbHNlIGlmIChzdGF0ZSA9PT0gQVRUUl9WQUxVRSAmJiAvXFxzLy50ZXN0KGMpKSB7XG4gICAgICAgICAgcmVzLnB1c2goW0FUVFJfVkFMVUUscmVnXSxbQVRUUl9CUkVBS10pXG4gICAgICAgICAgcmVnID0gJydcbiAgICAgICAgICBzdGF0ZSA9IEFUVFJcbiAgICAgICAgfSBlbHNlIGlmIChzdGF0ZSA9PT0gQVRUUl9WQUxVRSB8fCBzdGF0ZSA9PT0gQVRUUl9WQUxVRV9TUVxuICAgICAgICB8fCBzdGF0ZSA9PT0gQVRUUl9WQUxVRV9EUSkge1xuICAgICAgICAgIHJlZyArPSBjXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChzdGF0ZSA9PT0gVEVYVCAmJiByZWcubGVuZ3RoKSB7XG4gICAgICAgIHJlcy5wdXNoKFtURVhULHJlZ10pXG4gICAgICAgIHJlZyA9ICcnXG4gICAgICB9IGVsc2UgaWYgKHN0YXRlID09PSBBVFRSX1ZBTFVFICYmIHJlZy5sZW5ndGgpIHtcbiAgICAgICAgcmVzLnB1c2goW0FUVFJfVkFMVUUscmVnXSlcbiAgICAgICAgcmVnID0gJydcbiAgICAgIH0gZWxzZSBpZiAoc3RhdGUgPT09IEFUVFJfVkFMVUVfRFEgJiYgcmVnLmxlbmd0aCkge1xuICAgICAgICByZXMucHVzaChbQVRUUl9WQUxVRSxyZWddKVxuICAgICAgICByZWcgPSAnJ1xuICAgICAgfSBlbHNlIGlmIChzdGF0ZSA9PT0gQVRUUl9WQUxVRV9TUSAmJiByZWcubGVuZ3RoKSB7XG4gICAgICAgIHJlcy5wdXNoKFtBVFRSX1ZBTFVFLHJlZ10pXG4gICAgICAgIHJlZyA9ICcnXG4gICAgICB9IGVsc2UgaWYgKHN0YXRlID09PSBBVFRSX0tFWSkge1xuICAgICAgICByZXMucHVzaChbQVRUUl9LRVkscmVnXSlcbiAgICAgICAgcmVnID0gJydcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXNcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBzdHJmbiAoeCkge1xuICAgIGlmICh0eXBlb2YgeCA9PT0gJ2Z1bmN0aW9uJykgcmV0dXJuIHhcbiAgICBlbHNlIGlmICh0eXBlb2YgeCA9PT0gJ3N0cmluZycpIHJldHVybiB4XG4gICAgZWxzZSBpZiAoeCAmJiB0eXBlb2YgeCA9PT0gJ29iamVjdCcpIHJldHVybiB4XG4gICAgZWxzZSByZXR1cm4gY29uY2F0KCcnLCB4KVxuICB9XG59XG5cbmZ1bmN0aW9uIHF1b3QgKHN0YXRlKSB7XG4gIHJldHVybiBzdGF0ZSA9PT0gQVRUUl9WQUxVRV9TUSB8fCBzdGF0ZSA9PT0gQVRUUl9WQUxVRV9EUVxufVxuXG52YXIgaGFzT3duID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eVxuZnVuY3Rpb24gaGFzIChvYmosIGtleSkgeyByZXR1cm4gaGFzT3duLmNhbGwob2JqLCBrZXkpIH1cblxudmFyIGNsb3NlUkUgPSBSZWdFeHAoJ14oJyArIFtcbiAgJ2FyZWEnLCAnYmFzZScsICdiYXNlZm9udCcsICdiZ3NvdW5kJywgJ2JyJywgJ2NvbCcsICdjb21tYW5kJywgJ2VtYmVkJyxcbiAgJ2ZyYW1lJywgJ2hyJywgJ2ltZycsICdpbnB1dCcsICdpc2luZGV4JywgJ2tleWdlbicsICdsaW5rJywgJ21ldGEnLCAncGFyYW0nLFxuICAnc291cmNlJywgJ3RyYWNrJywgJ3dicicsXG4gIC8vIFNWRyBUQUdTXG4gICdhbmltYXRlJywgJ2FuaW1hdGVUcmFuc2Zvcm0nLCAnY2lyY2xlJywgJ2N1cnNvcicsICdkZXNjJywgJ2VsbGlwc2UnLFxuICAnZmVCbGVuZCcsICdmZUNvbG9yTWF0cml4JywgJ2ZlQ29tcG9uZW50VHJhbnNmZXInLCAnZmVDb21wb3NpdGUnLFxuICAnZmVDb252b2x2ZU1hdHJpeCcsICdmZURpZmZ1c2VMaWdodGluZycsICdmZURpc3BsYWNlbWVudE1hcCcsXG4gICdmZURpc3RhbnRMaWdodCcsICdmZUZsb29kJywgJ2ZlRnVuY0EnLCAnZmVGdW5jQicsICdmZUZ1bmNHJywgJ2ZlRnVuY1InLFxuICAnZmVHYXVzc2lhbkJsdXInLCAnZmVJbWFnZScsICdmZU1lcmdlTm9kZScsICdmZU1vcnBob2xvZ3knLFxuICAnZmVPZmZzZXQnLCAnZmVQb2ludExpZ2h0JywgJ2ZlU3BlY3VsYXJMaWdodGluZycsICdmZVNwb3RMaWdodCcsICdmZVRpbGUnLFxuICAnZmVUdXJidWxlbmNlJywgJ2ZvbnQtZmFjZS1mb3JtYXQnLCAnZm9udC1mYWNlLW5hbWUnLCAnZm9udC1mYWNlLXVyaScsXG4gICdnbHlwaCcsICdnbHlwaFJlZicsICdoa2VybicsICdpbWFnZScsICdsaW5lJywgJ21pc3NpbmctZ2x5cGgnLCAnbXBhdGgnLFxuICAncGF0aCcsICdwb2x5Z29uJywgJ3BvbHlsaW5lJywgJ3JlY3QnLCAnc2V0JywgJ3N0b3AnLCAndHJlZicsICd1c2UnLCAndmlldycsXG4gICd2a2Vybidcbl0uam9pbignfCcpICsgJykoPzpbXFwuI11bYS16QS1aMC05XFx1MDA3Ri1cXHVGRkZGXzotXSspKiQnKVxuZnVuY3Rpb24gc2VsZkNsb3NpbmcgKHRhZykgeyByZXR1cm4gY2xvc2VSRS50ZXN0KHRhZykgfVxuIiwibW9kdWxlLmV4cG9ydHMgPSBhdHRyaWJ1dGVUb1Byb3BlcnR5XG5cbnZhciB0cmFuc2Zvcm0gPSB7XG4gICdjbGFzcyc6ICdjbGFzc05hbWUnLFxuICAnZm9yJzogJ2h0bWxGb3InLFxuICAnaHR0cC1lcXVpdic6ICdodHRwRXF1aXYnXG59XG5cbmZ1bmN0aW9uIGF0dHJpYnV0ZVRvUHJvcGVydHkgKGgpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICh0YWdOYW1lLCBhdHRycywgY2hpbGRyZW4pIHtcbiAgICBmb3IgKHZhciBhdHRyIGluIGF0dHJzKSB7XG4gICAgICBpZiAoYXR0ciBpbiB0cmFuc2Zvcm0pIHtcbiAgICAgICAgYXR0cnNbdHJhbnNmb3JtW2F0dHJdXSA9IGF0dHJzW2F0dHJdXG4gICAgICAgIGRlbGV0ZSBhdHRyc1thdHRyXVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gaCh0YWdOYW1lLCBhdHRycywgY2hpbGRyZW4pXG4gIH1cbn1cbiIsIi8vIENyZWF0ZSBhIHJhbmdlIG9iamVjdCBmb3IgZWZmaWNlbnRseSByZW5kZXJpbmcgc3RyaW5ncyB0byBlbGVtZW50cy5cbnZhciByYW5nZTtcblxudmFyIHRlc3RFbCA9ICh0eXBlb2YgZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnKSA/XG4gICAgZG9jdW1lbnQuYm9keSB8fCBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSA6XG4gICAge307XG5cbnZhciBYSFRNTCA9ICdodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hodG1sJztcbnZhciBFTEVNRU5UX05PREUgPSAxO1xudmFyIFRFWFRfTk9ERSA9IDM7XG52YXIgQ09NTUVOVF9OT0RFID0gODtcblxuLy8gRml4ZXMgPGh0dHBzOi8vZ2l0aHViLmNvbS9wYXRyaWNrLXN0ZWVsZS1pZGVtL21vcnBoZG9tL2lzc3Vlcy8zMj5cbi8vIChJRTcrIHN1cHBvcnQpIDw9SUU3IGRvZXMgbm90IHN1cHBvcnQgZWwuaGFzQXR0cmlidXRlKG5hbWUpXG52YXIgaGFzQXR0cmlidXRlTlM7XG5cbmlmICh0ZXN0RWwuaGFzQXR0cmlidXRlTlMpIHtcbiAgICBoYXNBdHRyaWJ1dGVOUyA9IGZ1bmN0aW9uKGVsLCBuYW1lc3BhY2VVUkksIG5hbWUpIHtcbiAgICAgICAgcmV0dXJuIGVsLmhhc0F0dHJpYnV0ZU5TKG5hbWVzcGFjZVVSSSwgbmFtZSk7XG4gICAgfTtcbn0gZWxzZSBpZiAodGVzdEVsLmhhc0F0dHJpYnV0ZSkge1xuICAgIGhhc0F0dHJpYnV0ZU5TID0gZnVuY3Rpb24oZWwsIG5hbWVzcGFjZVVSSSwgbmFtZSkge1xuICAgICAgICByZXR1cm4gZWwuaGFzQXR0cmlidXRlKG5hbWUpO1xuICAgIH07XG59IGVsc2Uge1xuICAgIGhhc0F0dHJpYnV0ZU5TID0gZnVuY3Rpb24oZWwsIG5hbWVzcGFjZVVSSSwgbmFtZSkge1xuICAgICAgICByZXR1cm4gISFlbC5nZXRBdHRyaWJ1dGVOb2RlKG5hbWUpO1xuICAgIH07XG59XG5cbmZ1bmN0aW9uIGVtcHR5KG8pIHtcbiAgICBmb3IgKHZhciBrIGluIG8pIHtcbiAgICAgICAgaWYgKG8uaGFzT3duUHJvcGVydHkoaykpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gdG9FbGVtZW50KHN0cikge1xuICAgIGlmICghcmFuZ2UgJiYgZG9jdW1lbnQuY3JlYXRlUmFuZ2UpIHtcbiAgICAgICAgcmFuZ2UgPSBkb2N1bWVudC5jcmVhdGVSYW5nZSgpO1xuICAgICAgICByYW5nZS5zZWxlY3ROb2RlKGRvY3VtZW50LmJvZHkpO1xuICAgIH1cblxuICAgIHZhciBmcmFnbWVudDtcbiAgICBpZiAocmFuZ2UgJiYgcmFuZ2UuY3JlYXRlQ29udGV4dHVhbEZyYWdtZW50KSB7XG4gICAgICAgIGZyYWdtZW50ID0gcmFuZ2UuY3JlYXRlQ29udGV4dHVhbEZyYWdtZW50KHN0cik7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgZnJhZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdib2R5Jyk7XG4gICAgICAgIGZyYWdtZW50LmlubmVySFRNTCA9IHN0cjtcbiAgICB9XG4gICAgcmV0dXJuIGZyYWdtZW50LmNoaWxkTm9kZXNbMF07XG59XG5cbnZhciBzcGVjaWFsRWxIYW5kbGVycyA9IHtcbiAgICAvKipcbiAgICAgKiBOZWVkZWQgZm9yIElFLiBBcHBhcmVudGx5IElFIGRvZXNuJ3QgdGhpbmsgdGhhdCBcInNlbGVjdGVkXCIgaXMgYW5cbiAgICAgKiBhdHRyaWJ1dGUgd2hlbiByZWFkaW5nIG92ZXIgdGhlIGF0dHJpYnV0ZXMgdXNpbmcgc2VsZWN0RWwuYXR0cmlidXRlc1xuICAgICAqL1xuICAgIE9QVElPTjogZnVuY3Rpb24oZnJvbUVsLCB0b0VsKSB7XG4gICAgICAgIGZyb21FbC5zZWxlY3RlZCA9IHRvRWwuc2VsZWN0ZWQ7XG4gICAgICAgIGlmIChmcm9tRWwuc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgIGZyb21FbC5zZXRBdHRyaWJ1dGUoJ3NlbGVjdGVkJywgJycpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZnJvbUVsLnJlbW92ZUF0dHJpYnV0ZSgnc2VsZWN0ZWQnLCAnJyk7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIC8qKlxuICAgICAqIFRoZSBcInZhbHVlXCIgYXR0cmlidXRlIGlzIHNwZWNpYWwgZm9yIHRoZSA8aW5wdXQ+IGVsZW1lbnQgc2luY2UgaXQgc2V0c1xuICAgICAqIHRoZSBpbml0aWFsIHZhbHVlLiBDaGFuZ2luZyB0aGUgXCJ2YWx1ZVwiIGF0dHJpYnV0ZSB3aXRob3V0IGNoYW5naW5nIHRoZVxuICAgICAqIFwidmFsdWVcIiBwcm9wZXJ0eSB3aWxsIGhhdmUgbm8gZWZmZWN0IHNpbmNlIGl0IGlzIG9ubHkgdXNlZCB0byB0aGUgc2V0IHRoZVxuICAgICAqIGluaXRpYWwgdmFsdWUuICBTaW1pbGFyIGZvciB0aGUgXCJjaGVja2VkXCIgYXR0cmlidXRlLCBhbmQgXCJkaXNhYmxlZFwiLlxuICAgICAqL1xuICAgIElOUFVUOiBmdW5jdGlvbihmcm9tRWwsIHRvRWwpIHtcbiAgICAgICAgZnJvbUVsLmNoZWNrZWQgPSB0b0VsLmNoZWNrZWQ7XG4gICAgICAgIGlmIChmcm9tRWwuY2hlY2tlZCkge1xuICAgICAgICAgICAgZnJvbUVsLnNldEF0dHJpYnV0ZSgnY2hlY2tlZCcsICcnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGZyb21FbC5yZW1vdmVBdHRyaWJ1dGUoJ2NoZWNrZWQnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChmcm9tRWwudmFsdWUgIT09IHRvRWwudmFsdWUpIHtcbiAgICAgICAgICAgIGZyb21FbC52YWx1ZSA9IHRvRWwudmFsdWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIWhhc0F0dHJpYnV0ZU5TKHRvRWwsIG51bGwsICd2YWx1ZScpKSB7XG4gICAgICAgICAgICBmcm9tRWwucmVtb3ZlQXR0cmlidXRlKCd2YWx1ZScpO1xuICAgICAgICB9XG5cbiAgICAgICAgZnJvbUVsLmRpc2FibGVkID0gdG9FbC5kaXNhYmxlZDtcbiAgICAgICAgaWYgKGZyb21FbC5kaXNhYmxlZCkge1xuICAgICAgICAgICAgZnJvbUVsLnNldEF0dHJpYnV0ZSgnZGlzYWJsZWQnLCAnJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBmcm9tRWwucmVtb3ZlQXR0cmlidXRlKCdkaXNhYmxlZCcpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIFRFWFRBUkVBOiBmdW5jdGlvbihmcm9tRWwsIHRvRWwpIHtcbiAgICAgICAgdmFyIG5ld1ZhbHVlID0gdG9FbC52YWx1ZTtcbiAgICAgICAgaWYgKGZyb21FbC52YWx1ZSAhPT0gbmV3VmFsdWUpIHtcbiAgICAgICAgICAgIGZyb21FbC52YWx1ZSA9IG5ld1ZhbHVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGZyb21FbC5maXJzdENoaWxkKSB7XG4gICAgICAgICAgICBmcm9tRWwuZmlyc3RDaGlsZC5ub2RlVmFsdWUgPSBuZXdWYWx1ZTtcbiAgICAgICAgfVxuICAgIH1cbn07XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG4vKipcbiAqIFJldHVybnMgdHJ1ZSBpZiB0d28gbm9kZSdzIG5hbWVzIGFuZCBuYW1lc3BhY2UgVVJJcyBhcmUgdGhlIHNhbWUuXG4gKlxuICogQHBhcmFtIHtFbGVtZW50fSBhXG4gKiBAcGFyYW0ge0VsZW1lbnR9IGJcbiAqIEByZXR1cm4ge2Jvb2xlYW59XG4gKi9cbnZhciBjb21wYXJlTm9kZU5hbWVzID0gZnVuY3Rpb24oYSwgYikge1xuICAgIHJldHVybiBhLm5vZGVOYW1lID09PSBiLm5vZGVOYW1lICYmXG4gICAgICAgICAgIGEubmFtZXNwYWNlVVJJID09PSBiLm5hbWVzcGFjZVVSSTtcbn07XG5cbi8qKlxuICogQ3JlYXRlIGFuIGVsZW1lbnQsIG9wdGlvbmFsbHkgd2l0aCBhIGtub3duIG5hbWVzcGFjZSBVUkkuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgdGhlIGVsZW1lbnQgbmFtZSwgZS5nLiAnZGl2JyBvciAnc3ZnJ1xuICogQHBhcmFtIHtzdHJpbmd9IFtuYW1lc3BhY2VVUkldIHRoZSBlbGVtZW50J3MgbmFtZXNwYWNlIFVSSSwgaS5lLiB0aGUgdmFsdWUgb2ZcbiAqIGl0cyBgeG1sbnNgIGF0dHJpYnV0ZSBvciBpdHMgaW5mZXJyZWQgbmFtZXNwYWNlLlxuICpcbiAqIEByZXR1cm4ge0VsZW1lbnR9XG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnROUyhuYW1lLCBuYW1lc3BhY2VVUkkpIHtcbiAgICByZXR1cm4gIW5hbWVzcGFjZVVSSSB8fCBuYW1lc3BhY2VVUkkgPT09IFhIVE1MID9cbiAgICAgICAgZG9jdW1lbnQuY3JlYXRlRWxlbWVudChuYW1lKSA6XG4gICAgICAgIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhuYW1lc3BhY2VVUkksIG5hbWUpO1xufVxuXG4vKipcbiAqIExvb3Agb3ZlciBhbGwgb2YgdGhlIGF0dHJpYnV0ZXMgb24gdGhlIHRhcmdldCBub2RlIGFuZCBtYWtlIHN1cmUgdGhlIG9yaWdpbmFsXG4gKiBET00gbm9kZSBoYXMgdGhlIHNhbWUgYXR0cmlidXRlcy4gSWYgYW4gYXR0cmlidXRlIGZvdW5kIG9uIHRoZSBvcmlnaW5hbCBub2RlXG4gKiBpcyBub3Qgb24gdGhlIG5ldyBub2RlIHRoZW4gcmVtb3ZlIGl0IGZyb20gdGhlIG9yaWdpbmFsIG5vZGUuXG4gKlxuICogQHBhcmFtICB7RWxlbWVudH0gZnJvbU5vZGVcbiAqIEBwYXJhbSAge0VsZW1lbnR9IHRvTm9kZVxuICovXG5mdW5jdGlvbiBtb3JwaEF0dHJzKGZyb21Ob2RlLCB0b05vZGUpIHtcbiAgICB2YXIgYXR0cnMgPSB0b05vZGUuYXR0cmlidXRlcztcbiAgICB2YXIgaTtcbiAgICB2YXIgYXR0cjtcbiAgICB2YXIgYXR0ck5hbWU7XG4gICAgdmFyIGF0dHJOYW1lc3BhY2VVUkk7XG4gICAgdmFyIGF0dHJWYWx1ZTtcbiAgICB2YXIgZnJvbVZhbHVlO1xuXG4gICAgZm9yIChpID0gYXR0cnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgYXR0ciA9IGF0dHJzW2ldO1xuICAgICAgICBhdHRyTmFtZSA9IGF0dHIubmFtZTtcbiAgICAgICAgYXR0clZhbHVlID0gYXR0ci52YWx1ZTtcbiAgICAgICAgYXR0ck5hbWVzcGFjZVVSSSA9IGF0dHIubmFtZXNwYWNlVVJJO1xuXG4gICAgICAgIGlmIChhdHRyTmFtZXNwYWNlVVJJKSB7XG4gICAgICAgICAgICBhdHRyTmFtZSA9IGF0dHIubG9jYWxOYW1lIHx8IGF0dHJOYW1lO1xuICAgICAgICAgICAgZnJvbVZhbHVlID0gZnJvbU5vZGUuZ2V0QXR0cmlidXRlTlMoYXR0ck5hbWVzcGFjZVVSSSwgYXR0ck5hbWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZnJvbVZhbHVlID0gZnJvbU5vZGUuZ2V0QXR0cmlidXRlKGF0dHJOYW1lKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChmcm9tVmFsdWUgIT09IGF0dHJWYWx1ZSkge1xuICAgICAgICAgICAgaWYgKGF0dHJOYW1lc3BhY2VVUkkpIHtcbiAgICAgICAgICAgICAgICBmcm9tTm9kZS5zZXRBdHRyaWJ1dGVOUyhhdHRyTmFtZXNwYWNlVVJJLCBhdHRyTmFtZSwgYXR0clZhbHVlKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZnJvbU5vZGUuc2V0QXR0cmlidXRlKGF0dHJOYW1lLCBhdHRyVmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gUmVtb3ZlIGFueSBleHRyYSBhdHRyaWJ1dGVzIGZvdW5kIG9uIHRoZSBvcmlnaW5hbCBET00gZWxlbWVudCB0aGF0XG4gICAgLy8gd2VyZW4ndCBmb3VuZCBvbiB0aGUgdGFyZ2V0IGVsZW1lbnQuXG4gICAgYXR0cnMgPSBmcm9tTm9kZS5hdHRyaWJ1dGVzO1xuXG4gICAgZm9yIChpID0gYXR0cnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgYXR0ciA9IGF0dHJzW2ldO1xuICAgICAgICBpZiAoYXR0ci5zcGVjaWZpZWQgIT09IGZhbHNlKSB7XG4gICAgICAgICAgICBhdHRyTmFtZSA9IGF0dHIubmFtZTtcbiAgICAgICAgICAgIGF0dHJOYW1lc3BhY2VVUkkgPSBhdHRyLm5hbWVzcGFjZVVSSTtcblxuICAgICAgICAgICAgaWYgKCFoYXNBdHRyaWJ1dGVOUyh0b05vZGUsIGF0dHJOYW1lc3BhY2VVUkksIGF0dHJOYW1lc3BhY2VVUkkgPyBhdHRyTmFtZSA9IGF0dHIubG9jYWxOYW1lIHx8IGF0dHJOYW1lIDogYXR0ck5hbWUpKSB7XG4gICAgICAgICAgICAgICAgZnJvbU5vZGUucmVtb3ZlQXR0cmlidXRlTm9kZShhdHRyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cblxuLyoqXG4gKiBDb3BpZXMgdGhlIGNoaWxkcmVuIG9mIG9uZSBET00gZWxlbWVudCB0byBhbm90aGVyIERPTSBlbGVtZW50XG4gKi9cbmZ1bmN0aW9uIG1vdmVDaGlsZHJlbihmcm9tRWwsIHRvRWwpIHtcbiAgICB2YXIgY3VyQ2hpbGQgPSBmcm9tRWwuZmlyc3RDaGlsZDtcbiAgICB3aGlsZSAoY3VyQ2hpbGQpIHtcbiAgICAgICAgdmFyIG5leHRDaGlsZCA9IGN1ckNoaWxkLm5leHRTaWJsaW5nO1xuICAgICAgICB0b0VsLmFwcGVuZENoaWxkKGN1ckNoaWxkKTtcbiAgICAgICAgY3VyQ2hpbGQgPSBuZXh0Q2hpbGQ7XG4gICAgfVxuICAgIHJldHVybiB0b0VsO1xufVxuXG5mdW5jdGlvbiBkZWZhdWx0R2V0Tm9kZUtleShub2RlKSB7XG4gICAgcmV0dXJuIG5vZGUuaWQ7XG59XG5cbmZ1bmN0aW9uIG1vcnBoZG9tKGZyb21Ob2RlLCB0b05vZGUsIG9wdGlvbnMpIHtcbiAgICBpZiAoIW9wdGlvbnMpIHtcbiAgICAgICAgb3B0aW9ucyA9IHt9O1xuICAgIH1cblxuICAgIGlmICh0eXBlb2YgdG9Ob2RlID09PSAnc3RyaW5nJykge1xuICAgICAgICBpZiAoZnJvbU5vZGUubm9kZU5hbWUgPT09ICcjZG9jdW1lbnQnIHx8IGZyb21Ob2RlLm5vZGVOYW1lID09PSAnSFRNTCcpIHtcbiAgICAgICAgICAgIHZhciB0b05vZGVIdG1sID0gdG9Ob2RlO1xuICAgICAgICAgICAgdG9Ob2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaHRtbCcpO1xuICAgICAgICAgICAgdG9Ob2RlLmlubmVySFRNTCA9IHRvTm9kZUh0bWw7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0b05vZGUgPSB0b0VsZW1lbnQodG9Ob2RlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIFhYWCBvcHRpbWl6YXRpb246IGlmIHRoZSBub2RlcyBhcmUgZXF1YWwsIGRvbid0IG1vcnBoIHRoZW1cbiAgICAvKlxuICAgIGlmIChmcm9tTm9kZS5pc0VxdWFsTm9kZSh0b05vZGUpKSB7XG4gICAgICByZXR1cm4gZnJvbU5vZGU7XG4gICAgfVxuICAgICovXG5cbiAgICB2YXIgc2F2ZWRFbHMgPSB7fTsgLy8gVXNlZCB0byBzYXZlIG9mZiBET00gZWxlbWVudHMgd2l0aCBJRHNcbiAgICB2YXIgdW5tYXRjaGVkRWxzID0ge307XG4gICAgdmFyIGdldE5vZGVLZXkgPSBvcHRpb25zLmdldE5vZGVLZXkgfHwgZGVmYXVsdEdldE5vZGVLZXk7XG4gICAgdmFyIG9uQmVmb3JlTm9kZUFkZGVkID0gb3B0aW9ucy5vbkJlZm9yZU5vZGVBZGRlZCB8fCBub29wO1xuICAgIHZhciBvbk5vZGVBZGRlZCA9IG9wdGlvbnMub25Ob2RlQWRkZWQgfHwgbm9vcDtcbiAgICB2YXIgb25CZWZvcmVFbFVwZGF0ZWQgPSBvcHRpb25zLm9uQmVmb3JlRWxVcGRhdGVkIHx8IG9wdGlvbnMub25CZWZvcmVNb3JwaEVsIHx8IG5vb3A7XG4gICAgdmFyIG9uRWxVcGRhdGVkID0gb3B0aW9ucy5vbkVsVXBkYXRlZCB8fCBub29wO1xuICAgIHZhciBvbkJlZm9yZU5vZGVEaXNjYXJkZWQgPSBvcHRpb25zLm9uQmVmb3JlTm9kZURpc2NhcmRlZCB8fCBub29wO1xuICAgIHZhciBvbk5vZGVEaXNjYXJkZWQgPSBvcHRpb25zLm9uTm9kZURpc2NhcmRlZCB8fCBub29wO1xuICAgIHZhciBvbkJlZm9yZUVsQ2hpbGRyZW5VcGRhdGVkID0gb3B0aW9ucy5vbkJlZm9yZUVsQ2hpbGRyZW5VcGRhdGVkIHx8IG9wdGlvbnMub25CZWZvcmVNb3JwaEVsQ2hpbGRyZW4gfHwgbm9vcDtcbiAgICB2YXIgY2hpbGRyZW5Pbmx5ID0gb3B0aW9ucy5jaGlsZHJlbk9ubHkgPT09IHRydWU7XG4gICAgdmFyIG1vdmVkRWxzID0gW107XG5cbiAgICBmdW5jdGlvbiByZW1vdmVOb2RlSGVscGVyKG5vZGUsIG5lc3RlZEluU2F2ZWRFbCkge1xuICAgICAgICB2YXIgaWQgPSBnZXROb2RlS2V5KG5vZGUpO1xuICAgICAgICAvLyBJZiB0aGUgbm9kZSBoYXMgYW4gSUQgdGhlbiBzYXZlIGl0IG9mZiBzaW5jZSB3ZSB3aWxsIHdhbnRcbiAgICAgICAgLy8gdG8gcmV1c2UgaXQgaW4gY2FzZSB0aGUgdGFyZ2V0IERPTSB0cmVlIGhhcyBhIERPTSBlbGVtZW50XG4gICAgICAgIC8vIHdpdGggdGhlIHNhbWUgSURcbiAgICAgICAgaWYgKGlkKSB7XG4gICAgICAgICAgICBzYXZlZEVsc1tpZF0gPSBub2RlO1xuICAgICAgICB9IGVsc2UgaWYgKCFuZXN0ZWRJblNhdmVkRWwpIHtcbiAgICAgICAgICAgIC8vIElmIHdlIGFyZSBub3QgbmVzdGVkIGluIGEgc2F2ZWQgZWxlbWVudCB0aGVuIHdlIGtub3cgdGhhdCB0aGlzIG5vZGUgaGFzIGJlZW5cbiAgICAgICAgICAgIC8vIGNvbXBsZXRlbHkgZGlzY2FyZGVkIGFuZCB3aWxsIG5vdCBleGlzdCBpbiB0aGUgZmluYWwgRE9NLlxuICAgICAgICAgICAgb25Ob2RlRGlzY2FyZGVkKG5vZGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG5vZGUubm9kZVR5cGUgPT09IEVMRU1FTlRfTk9ERSkge1xuICAgICAgICAgICAgdmFyIGN1ckNoaWxkID0gbm9kZS5maXJzdENoaWxkO1xuICAgICAgICAgICAgd2hpbGUgKGN1ckNoaWxkKSB7XG4gICAgICAgICAgICAgICAgcmVtb3ZlTm9kZUhlbHBlcihjdXJDaGlsZCwgbmVzdGVkSW5TYXZlZEVsIHx8IGlkKTtcbiAgICAgICAgICAgICAgICBjdXJDaGlsZCA9IGN1ckNoaWxkLm5leHRTaWJsaW5nO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gd2Fsa0Rpc2NhcmRlZENoaWxkTm9kZXMobm9kZSkge1xuICAgICAgICBpZiAobm9kZS5ub2RlVHlwZSA9PT0gRUxFTUVOVF9OT0RFKSB7XG4gICAgICAgICAgICB2YXIgY3VyQ2hpbGQgPSBub2RlLmZpcnN0Q2hpbGQ7XG4gICAgICAgICAgICB3aGlsZSAoY3VyQ2hpbGQpIHtcblxuXG4gICAgICAgICAgICAgICAgaWYgKCFnZXROb2RlS2V5KGN1ckNoaWxkKSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBXZSBvbmx5IHdhbnQgdG8gaGFuZGxlIG5vZGVzIHRoYXQgZG9uJ3QgaGF2ZSBhbiBJRCB0byBhdm9pZCBkb3VibGVcbiAgICAgICAgICAgICAgICAgICAgLy8gd2Fsa2luZyB0aGUgc2FtZSBzYXZlZCBlbGVtZW50LlxuXG4gICAgICAgICAgICAgICAgICAgIG9uTm9kZURpc2NhcmRlZChjdXJDaGlsZCk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gV2FsayByZWN1cnNpdmVseVxuICAgICAgICAgICAgICAgICAgICB3YWxrRGlzY2FyZGVkQ2hpbGROb2RlcyhjdXJDaGlsZCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgY3VyQ2hpbGQgPSBjdXJDaGlsZC5uZXh0U2libGluZztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlbW92ZU5vZGUobm9kZSwgcGFyZW50Tm9kZSwgYWxyZWFkeVZpc2l0ZWQpIHtcbiAgICAgICAgaWYgKG9uQmVmb3JlTm9kZURpc2NhcmRlZChub2RlKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHBhcmVudE5vZGUucmVtb3ZlQ2hpbGQobm9kZSk7XG4gICAgICAgIGlmIChhbHJlYWR5VmlzaXRlZCkge1xuICAgICAgICAgICAgaWYgKCFnZXROb2RlS2V5KG5vZGUpKSB7XG4gICAgICAgICAgICAgICAgb25Ob2RlRGlzY2FyZGVkKG5vZGUpO1xuICAgICAgICAgICAgICAgIHdhbGtEaXNjYXJkZWRDaGlsZE5vZGVzKG5vZGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVtb3ZlTm9kZUhlbHBlcihub2RlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG1vcnBoRWwoZnJvbUVsLCB0b0VsLCBhbHJlYWR5VmlzaXRlZCwgY2hpbGRyZW5Pbmx5KSB7XG4gICAgICAgIHZhciB0b0VsS2V5ID0gZ2V0Tm9kZUtleSh0b0VsKTtcbiAgICAgICAgaWYgKHRvRWxLZXkpIHtcbiAgICAgICAgICAgIC8vIElmIGFuIGVsZW1lbnQgd2l0aCBhbiBJRCBpcyBiZWluZyBtb3JwaGVkIHRoZW4gaXQgaXMgd2lsbCBiZSBpbiB0aGUgZmluYWxcbiAgICAgICAgICAgIC8vIERPTSBzbyBjbGVhciBpdCBvdXQgb2YgdGhlIHNhdmVkIGVsZW1lbnRzIGNvbGxlY3Rpb25cbiAgICAgICAgICAgIGRlbGV0ZSBzYXZlZEVsc1t0b0VsS2V5XTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghY2hpbGRyZW5Pbmx5KSB7XG4gICAgICAgICAgICBpZiAob25CZWZvcmVFbFVwZGF0ZWQoZnJvbUVsLCB0b0VsKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIG1vcnBoQXR0cnMoZnJvbUVsLCB0b0VsKTtcbiAgICAgICAgICAgIG9uRWxVcGRhdGVkKGZyb21FbCk7XG5cbiAgICAgICAgICAgIGlmIChvbkJlZm9yZUVsQ2hpbGRyZW5VcGRhdGVkKGZyb21FbCwgdG9FbCkgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGZyb21FbC5ub2RlTmFtZSAhPT0gJ1RFWFRBUkVBJykge1xuICAgICAgICAgICAgdmFyIGN1clRvTm9kZUNoaWxkID0gdG9FbC5maXJzdENoaWxkO1xuICAgICAgICAgICAgdmFyIGN1ckZyb21Ob2RlQ2hpbGQgPSBmcm9tRWwuZmlyc3RDaGlsZDtcbiAgICAgICAgICAgIHZhciBjdXJUb05vZGVJZDtcblxuICAgICAgICAgICAgdmFyIGZyb21OZXh0U2libGluZztcbiAgICAgICAgICAgIHZhciB0b05leHRTaWJsaW5nO1xuICAgICAgICAgICAgdmFyIHNhdmVkRWw7XG4gICAgICAgICAgICB2YXIgdW5tYXRjaGVkRWw7XG5cbiAgICAgICAgICAgIG91dGVyOiB3aGlsZSAoY3VyVG9Ob2RlQ2hpbGQpIHtcbiAgICAgICAgICAgICAgICB0b05leHRTaWJsaW5nID0gY3VyVG9Ob2RlQ2hpbGQubmV4dFNpYmxpbmc7XG4gICAgICAgICAgICAgICAgY3VyVG9Ob2RlSWQgPSBnZXROb2RlS2V5KGN1clRvTm9kZUNoaWxkKTtcblxuICAgICAgICAgICAgICAgIHdoaWxlIChjdXJGcm9tTm9kZUNoaWxkKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBjdXJGcm9tTm9kZUlkID0gZ2V0Tm9kZUtleShjdXJGcm9tTm9kZUNoaWxkKTtcbiAgICAgICAgICAgICAgICAgICAgZnJvbU5leHRTaWJsaW5nID0gY3VyRnJvbU5vZGVDaGlsZC5uZXh0U2libGluZztcblxuICAgICAgICAgICAgICAgICAgICBpZiAoIWFscmVhZHlWaXNpdGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY3VyRnJvbU5vZGVJZCAmJiAodW5tYXRjaGVkRWwgPSB1bm1hdGNoZWRFbHNbY3VyRnJvbU5vZGVJZF0pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdW5tYXRjaGVkRWwucGFyZW50Tm9kZS5yZXBsYWNlQ2hpbGQoY3VyRnJvbU5vZGVDaGlsZCwgdW5tYXRjaGVkRWwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vcnBoRWwoY3VyRnJvbU5vZGVDaGlsZCwgdW5tYXRjaGVkRWwsIGFscmVhZHlWaXNpdGVkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJGcm9tTm9kZUNoaWxkID0gZnJvbU5leHRTaWJsaW5nO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIGN1ckZyb21Ob2RlVHlwZSA9IGN1ckZyb21Ob2RlQ2hpbGQubm9kZVR5cGU7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGN1ckZyb21Ob2RlVHlwZSA9PT0gY3VyVG9Ob2RlQ2hpbGQubm9kZVR5cGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpc0NvbXBhdGlibGUgPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gQm90aCBub2RlcyBiZWluZyBjb21wYXJlZCBhcmUgRWxlbWVudCBub2Rlc1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGN1ckZyb21Ob2RlVHlwZSA9PT0gRUxFTUVOVF9OT0RFKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvbXBhcmVOb2RlTmFtZXMoY3VyRnJvbU5vZGVDaGlsZCwgY3VyVG9Ob2RlQ2hpbGQpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFdlIGhhdmUgY29tcGF0aWJsZSBET00gZWxlbWVudHNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGN1ckZyb21Ob2RlSWQgfHwgY3VyVG9Ob2RlSWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIElmIGVpdGhlciBET00gZWxlbWVudCBoYXMgYW4gSUQgdGhlbiB3ZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gaGFuZGxlIHRob3NlIGRpZmZlcmVudGx5IHNpbmNlIHdlIHdhbnQgdG9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIG1hdGNoIHVwIGJ5IElEXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY3VyVG9Ob2RlSWQgPT09IGN1ckZyb21Ob2RlSWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc0NvbXBhdGlibGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNDb21wYXRpYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpc0NvbXBhdGlibGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gV2UgZm91bmQgY29tcGF0aWJsZSBET00gZWxlbWVudHMgc28gdHJhbnNmb3JtXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRoZSBjdXJyZW50IFwiZnJvbVwiIG5vZGUgdG8gbWF0Y2ggdGhlIGN1cnJlbnRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdGFyZ2V0IERPTSBub2RlLlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb3JwaEVsKGN1ckZyb21Ob2RlQ2hpbGQsIGN1clRvTm9kZUNoaWxkLCBhbHJlYWR5VmlzaXRlZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gQm90aCBub2RlcyBiZWluZyBjb21wYXJlZCBhcmUgVGV4dCBvciBDb21tZW50IG5vZGVzXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoY3VyRnJvbU5vZGVUeXBlID09PSBURVhUX05PREUgfHwgY3VyRnJvbU5vZGVUeXBlID09IENPTU1FTlRfTk9ERSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzQ29tcGF0aWJsZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gU2ltcGx5IHVwZGF0ZSBub2RlVmFsdWUgb24gdGhlIG9yaWdpbmFsIG5vZGUgdG9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBjaGFuZ2UgdGhlIHRleHQgdmFsdWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJGcm9tTm9kZUNoaWxkLm5vZGVWYWx1ZSA9IGN1clRvTm9kZUNoaWxkLm5vZGVWYWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlzQ29tcGF0aWJsZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1clRvTm9kZUNoaWxkID0gdG9OZXh0U2libGluZztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJGcm9tTm9kZUNoaWxkID0gZnJvbU5leHRTaWJsaW5nO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlIG91dGVyO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gTm8gY29tcGF0aWJsZSBtYXRjaCBzbyByZW1vdmUgdGhlIG9sZCBub2RlIGZyb20gdGhlIERPTVxuICAgICAgICAgICAgICAgICAgICAvLyBhbmQgY29udGludWUgdHJ5aW5nIHRvIGZpbmQgYSBtYXRjaCBpbiB0aGUgb3JpZ2luYWwgRE9NXG4gICAgICAgICAgICAgICAgICAgIHJlbW92ZU5vZGUoY3VyRnJvbU5vZGVDaGlsZCwgZnJvbUVsLCBhbHJlYWR5VmlzaXRlZCk7XG4gICAgICAgICAgICAgICAgICAgIGN1ckZyb21Ob2RlQ2hpbGQgPSBmcm9tTmV4dFNpYmxpbmc7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKGN1clRvTm9kZUlkKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICgoc2F2ZWRFbCA9IHNhdmVkRWxzW2N1clRvTm9kZUlkXSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vcnBoRWwoc2F2ZWRFbCwgY3VyVG9Ob2RlQ2hpbGQsIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gV2Ugd2FudCB0byBhcHBlbmQgdGhlIHNhdmVkIGVsZW1lbnQgaW5zdGVhZFxuICAgICAgICAgICAgICAgICAgICAgICAgY3VyVG9Ob2RlQ2hpbGQgPSBzYXZlZEVsO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gVGhlIGN1cnJlbnQgRE9NIGVsZW1lbnQgaW4gdGhlIHRhcmdldCB0cmVlIGhhcyBhbiBJRFxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gYnV0IHdlIGRpZCBub3QgZmluZCBhIG1hdGNoIGluIGFueSBvZiB0aGVcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvcnJlc3BvbmRpbmcgc2libGluZ3MuIFdlIGp1c3QgcHV0IHRoZSB0YXJnZXRcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGVsZW1lbnQgaW4gdGhlIG9sZCBET00gdHJlZSBidXQgaWYgd2UgbGF0ZXIgZmluZCBhblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gZWxlbWVudCBpbiB0aGUgb2xkIERPTSB0cmVlIHRoYXQgaGFzIGEgbWF0Y2hpbmcgSURcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRoZW4gd2Ugd2lsbCByZXBsYWNlIHRoZSB0YXJnZXQgZWxlbWVudCB3aXRoIHRoZVxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29ycmVzcG9uZGluZyBvbGQgZWxlbWVudCBhbmQgbW9ycGggdGhlIG9sZCBlbGVtZW50XG4gICAgICAgICAgICAgICAgICAgICAgICB1bm1hdGNoZWRFbHNbY3VyVG9Ob2RlSWRdID0gY3VyVG9Ob2RlQ2hpbGQ7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBJZiB3ZSBnb3QgdGhpcyBmYXIgdGhlbiB3ZSBkaWQgbm90IGZpbmQgYSBjYW5kaWRhdGUgbWF0Y2ggZm9yXG4gICAgICAgICAgICAgICAgLy8gb3VyIFwidG8gbm9kZVwiIGFuZCB3ZSBleGhhdXN0ZWQgYWxsIG9mIHRoZSBjaGlsZHJlbiBcImZyb21cIlxuICAgICAgICAgICAgICAgIC8vIG5vZGVzLiBUaGVyZWZvcmUsIHdlIHdpbGwganVzdCBhcHBlbmQgdGhlIGN1cnJlbnQgXCJ0byBub2RlXCJcbiAgICAgICAgICAgICAgICAvLyB0byB0aGUgZW5kXG4gICAgICAgICAgICAgICAgaWYgKG9uQmVmb3JlTm9kZUFkZGVkKGN1clRvTm9kZUNoaWxkKSAhPT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgZnJvbUVsLmFwcGVuZENoaWxkKGN1clRvTm9kZUNoaWxkKTtcbiAgICAgICAgICAgICAgICAgICAgb25Ob2RlQWRkZWQoY3VyVG9Ob2RlQ2hpbGQpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChjdXJUb05vZGVDaGlsZC5ub2RlVHlwZSA9PT0gRUxFTUVOVF9OT0RFICYmXG4gICAgICAgICAgICAgICAgICAgIChjdXJUb05vZGVJZCB8fCBjdXJUb05vZGVDaGlsZC5maXJzdENoaWxkKSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBUaGUgZWxlbWVudCB0aGF0IHdhcyBqdXN0IGFkZGVkIHRvIHRoZSBvcmlnaW5hbCBET00gbWF5XG4gICAgICAgICAgICAgICAgICAgIC8vIGhhdmUgc29tZSBuZXN0ZWQgZWxlbWVudHMgd2l0aCBhIGtleS9JRCB0aGF0IG5lZWRzIHRvIGJlXG4gICAgICAgICAgICAgICAgICAgIC8vIG1hdGNoZWQgdXAgd2l0aCBvdGhlciBlbGVtZW50cy4gV2UnbGwgYWRkIHRoZSBlbGVtZW50IHRvXG4gICAgICAgICAgICAgICAgICAgIC8vIGEgbGlzdCBzbyB0aGF0IHdlIGNhbiBsYXRlciBwcm9jZXNzIHRoZSBuZXN0ZWQgZWxlbWVudHNcbiAgICAgICAgICAgICAgICAgICAgLy8gaWYgdGhlcmUgYXJlIGFueSB1bm1hdGNoZWQga2V5ZWQgZWxlbWVudHMgdGhhdCB3ZXJlXG4gICAgICAgICAgICAgICAgICAgIC8vIGRpc2NhcmRlZFxuICAgICAgICAgICAgICAgICAgICBtb3ZlZEVscy5wdXNoKGN1clRvTm9kZUNoaWxkKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBjdXJUb05vZGVDaGlsZCA9IHRvTmV4dFNpYmxpbmc7XG4gICAgICAgICAgICAgICAgY3VyRnJvbU5vZGVDaGlsZCA9IGZyb21OZXh0U2libGluZztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gV2UgaGF2ZSBwcm9jZXNzZWQgYWxsIG9mIHRoZSBcInRvIG5vZGVzXCIuIElmIGN1ckZyb21Ob2RlQ2hpbGQgaXNcbiAgICAgICAgICAgIC8vIG5vbi1udWxsIHRoZW4gd2Ugc3RpbGwgaGF2ZSBzb21lIGZyb20gbm9kZXMgbGVmdCBvdmVyIHRoYXQgbmVlZFxuICAgICAgICAgICAgLy8gdG8gYmUgcmVtb3ZlZFxuICAgICAgICAgICAgd2hpbGUgKGN1ckZyb21Ob2RlQ2hpbGQpIHtcbiAgICAgICAgICAgICAgICBmcm9tTmV4dFNpYmxpbmcgPSBjdXJGcm9tTm9kZUNoaWxkLm5leHRTaWJsaW5nO1xuICAgICAgICAgICAgICAgIHJlbW92ZU5vZGUoY3VyRnJvbU5vZGVDaGlsZCwgZnJvbUVsLCBhbHJlYWR5VmlzaXRlZCk7XG4gICAgICAgICAgICAgICAgY3VyRnJvbU5vZGVDaGlsZCA9IGZyb21OZXh0U2libGluZztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBzcGVjaWFsRWxIYW5kbGVyID0gc3BlY2lhbEVsSGFuZGxlcnNbZnJvbUVsLm5vZGVOYW1lXTtcbiAgICAgICAgaWYgKHNwZWNpYWxFbEhhbmRsZXIpIHtcbiAgICAgICAgICAgIHNwZWNpYWxFbEhhbmRsZXIoZnJvbUVsLCB0b0VsKTtcbiAgICAgICAgfVxuICAgIH0gLy8gRU5EOiBtb3JwaEVsKC4uLilcblxuICAgIHZhciBtb3JwaGVkTm9kZSA9IGZyb21Ob2RlO1xuICAgIHZhciBtb3JwaGVkTm9kZVR5cGUgPSBtb3JwaGVkTm9kZS5ub2RlVHlwZTtcbiAgICB2YXIgdG9Ob2RlVHlwZSA9IHRvTm9kZS5ub2RlVHlwZTtcblxuICAgIGlmICghY2hpbGRyZW5Pbmx5KSB7XG4gICAgICAgIC8vIEhhbmRsZSB0aGUgY2FzZSB3aGVyZSB3ZSBhcmUgZ2l2ZW4gdHdvIERPTSBub2RlcyB0aGF0IGFyZSBub3RcbiAgICAgICAgLy8gY29tcGF0aWJsZSAoZS5nLiA8ZGl2PiAtLT4gPHNwYW4+IG9yIDxkaXY+IC0tPiBURVhUKVxuICAgICAgICBpZiAobW9ycGhlZE5vZGVUeXBlID09PSBFTEVNRU5UX05PREUpIHtcbiAgICAgICAgICAgIGlmICh0b05vZGVUeXBlID09PSBFTEVNRU5UX05PREUpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWNvbXBhcmVOb2RlTmFtZXMoZnJvbU5vZGUsIHRvTm9kZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgb25Ob2RlRGlzY2FyZGVkKGZyb21Ob2RlKTtcbiAgICAgICAgICAgICAgICAgICAgbW9ycGhlZE5vZGUgPSBtb3ZlQ2hpbGRyZW4oZnJvbU5vZGUsIGNyZWF0ZUVsZW1lbnROUyh0b05vZGUubm9kZU5hbWUsIHRvTm9kZS5uYW1lc3BhY2VVUkkpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIEdvaW5nIGZyb20gYW4gZWxlbWVudCBub2RlIHRvIGEgdGV4dCBub2RlXG4gICAgICAgICAgICAgICAgbW9ycGhlZE5vZGUgPSB0b05vZGU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAobW9ycGhlZE5vZGVUeXBlID09PSBURVhUX05PREUgfHwgbW9ycGhlZE5vZGVUeXBlID09PSBDT01NRU5UX05PREUpIHsgLy8gVGV4dCBvciBjb21tZW50IG5vZGVcbiAgICAgICAgICAgIGlmICh0b05vZGVUeXBlID09PSBtb3JwaGVkTm9kZVR5cGUpIHtcbiAgICAgICAgICAgICAgICBtb3JwaGVkTm9kZS5ub2RlVmFsdWUgPSB0b05vZGUubm9kZVZhbHVlO1xuICAgICAgICAgICAgICAgIHJldHVybiBtb3JwaGVkTm9kZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gVGV4dCBub2RlIHRvIHNvbWV0aGluZyBlbHNlXG4gICAgICAgICAgICAgICAgbW9ycGhlZE5vZGUgPSB0b05vZGU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAobW9ycGhlZE5vZGUgPT09IHRvTm9kZSkge1xuICAgICAgICAvLyBUaGUgXCJ0byBub2RlXCIgd2FzIG5vdCBjb21wYXRpYmxlIHdpdGggdGhlIFwiZnJvbSBub2RlXCIgc28gd2UgaGFkIHRvXG4gICAgICAgIC8vIHRvc3Mgb3V0IHRoZSBcImZyb20gbm9kZVwiIGFuZCB1c2UgdGhlIFwidG8gbm9kZVwiXG4gICAgICAgIG9uTm9kZURpc2NhcmRlZChmcm9tTm9kZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgbW9ycGhFbChtb3JwaGVkTm9kZSwgdG9Ob2RlLCBmYWxzZSwgY2hpbGRyZW5Pbmx5KTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogV2hhdCB3ZSB3aWxsIGRvIGhlcmUgaXMgd2FsayB0aGUgdHJlZSBmb3IgdGhlIERPTSBlbGVtZW50IHRoYXQgd2FzXG4gICAgICAgICAqIG1vdmVkIGZyb20gdGhlIHRhcmdldCBET00gdHJlZSB0byB0aGUgb3JpZ2luYWwgRE9NIHRyZWUgYW5kIHdlIHdpbGxcbiAgICAgICAgICogbG9vayBmb3Iga2V5ZWQgZWxlbWVudHMgdGhhdCBjb3VsZCBiZSBtYXRjaGVkIHRvIGtleWVkIGVsZW1lbnRzIHRoYXRcbiAgICAgICAgICogd2VyZSBlYXJsaWVyIGRpc2NhcmRlZC4gIElmIHdlIGZpbmQgYSBtYXRjaCB0aGVuIHdlIHdpbGwgbW92ZSB0aGVcbiAgICAgICAgICogc2F2ZWQgZWxlbWVudCBpbnRvIHRoZSBmaW5hbCBET00gdHJlZS5cbiAgICAgICAgICovXG4gICAgICAgIHZhciBoYW5kbGVNb3ZlZEVsID0gZnVuY3Rpb24oZWwpIHtcbiAgICAgICAgICAgIHZhciBjdXJDaGlsZCA9IGVsLmZpcnN0Q2hpbGQ7XG4gICAgICAgICAgICB3aGlsZSAoY3VyQ2hpbGQpIHtcbiAgICAgICAgICAgICAgICB2YXIgbmV4dFNpYmxpbmcgPSBjdXJDaGlsZC5uZXh0U2libGluZztcblxuICAgICAgICAgICAgICAgIHZhciBrZXkgPSBnZXROb2RlS2V5KGN1ckNoaWxkKTtcbiAgICAgICAgICAgICAgICBpZiAoa2V5KSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBzYXZlZEVsID0gc2F2ZWRFbHNba2V5XTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNhdmVkRWwgJiYgY29tcGFyZU5vZGVOYW1lcyhjdXJDaGlsZCwgc2F2ZWRFbCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1ckNoaWxkLnBhcmVudE5vZGUucmVwbGFjZUNoaWxkKHNhdmVkRWwsIGN1ckNoaWxkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRydWU6IGFscmVhZHkgdmlzaXRlZCB0aGUgc2F2ZWQgZWwgdHJlZVxuICAgICAgICAgICAgICAgICAgICAgICAgbW9ycGhFbChzYXZlZEVsLCBjdXJDaGlsZCwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJDaGlsZCA9IG5leHRTaWJsaW5nO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVtcHR5KHNhdmVkRWxzKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKGN1ckNoaWxkLm5vZGVUeXBlID09PSBFTEVNRU5UX05PREUpIHtcbiAgICAgICAgICAgICAgICAgICAgaGFuZGxlTW92ZWRFbChjdXJDaGlsZCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgY3VyQ2hpbGQgPSBuZXh0U2libGluZztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICAvLyBUaGUgbG9vcCBiZWxvdyBpcyB1c2VkIHRvIHBvc3NpYmx5IG1hdGNoIHVwIGFueSBkaXNjYXJkZWRcbiAgICAgICAgLy8gZWxlbWVudHMgaW4gdGhlIG9yaWdpbmFsIERPTSB0cmVlIHdpdGggZWxlbWVuZXRzIGZyb20gdGhlXG4gICAgICAgIC8vIHRhcmdldCB0cmVlIHRoYXQgd2VyZSBtb3ZlZCBvdmVyIHdpdGhvdXQgdmlzaXRpbmcgdGhlaXJcbiAgICAgICAgLy8gY2hpbGRyZW5cbiAgICAgICAgaWYgKCFlbXB0eShzYXZlZEVscykpIHtcbiAgICAgICAgICAgIGhhbmRsZU1vdmVkRWxzTG9vcDpcbiAgICAgICAgICAgIHdoaWxlIChtb3ZlZEVscy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICB2YXIgbW92ZWRFbHNUZW1wID0gbW92ZWRFbHM7XG4gICAgICAgICAgICAgICAgbW92ZWRFbHMgPSBbXTtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpPTA7IGk8bW92ZWRFbHNUZW1wLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChoYW5kbGVNb3ZlZEVsKG1vdmVkRWxzVGVtcFtpXSkgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBUaGVyZSBhcmUgbm8gbW9yZSB1bm1hdGNoZWQgZWxlbWVudHMgc28gY29tcGxldGVseSBlbmRcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRoZSBsb29wXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhayBoYW5kbGVNb3ZlZEVsc0xvb3A7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBGaXJlIHRoZSBcIm9uTm9kZURpc2NhcmRlZFwiIGV2ZW50IGZvciBhbnkgc2F2ZWQgZWxlbWVudHNcbiAgICAgICAgLy8gdGhhdCBuZXZlciBmb3VuZCBhIG5ldyBob21lIGluIHRoZSBtb3JwaGVkIERPTVxuICAgICAgICBmb3IgKHZhciBzYXZlZEVsSWQgaW4gc2F2ZWRFbHMpIHtcbiAgICAgICAgICAgIGlmIChzYXZlZEVscy5oYXNPd25Qcm9wZXJ0eShzYXZlZEVsSWQpKSB7XG4gICAgICAgICAgICAgICAgdmFyIHNhdmVkRWwgPSBzYXZlZEVsc1tzYXZlZEVsSWRdO1xuICAgICAgICAgICAgICAgIG9uTm9kZURpc2NhcmRlZChzYXZlZEVsKTtcbiAgICAgICAgICAgICAgICB3YWxrRGlzY2FyZGVkQ2hpbGROb2RlcyhzYXZlZEVsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlmICghY2hpbGRyZW5Pbmx5ICYmIG1vcnBoZWROb2RlICE9PSBmcm9tTm9kZSAmJiBmcm9tTm9kZS5wYXJlbnROb2RlKSB7XG4gICAgICAgIC8vIElmIHdlIGhhZCB0byBzd2FwIG91dCB0aGUgZnJvbSBub2RlIHdpdGggYSBuZXcgbm9kZSBiZWNhdXNlIHRoZSBvbGRcbiAgICAgICAgLy8gbm9kZSB3YXMgbm90IGNvbXBhdGlibGUgd2l0aCB0aGUgdGFyZ2V0IG5vZGUgdGhlbiB3ZSBuZWVkIHRvXG4gICAgICAgIC8vIHJlcGxhY2UgdGhlIG9sZCBET00gbm9kZSBpbiB0aGUgb3JpZ2luYWwgRE9NIHRyZWUuIFRoaXMgaXMgb25seVxuICAgICAgICAvLyBwb3NzaWJsZSBpZiB0aGUgb3JpZ2luYWwgRE9NIG5vZGUgd2FzIHBhcnQgb2YgYSBET00gdHJlZSB3aGljaFxuICAgICAgICAvLyB3ZSBrbm93IGlzIHRoZSBjYXNlIGlmIGl0IGhhcyBhIHBhcmVudCBub2RlLlxuICAgICAgICBmcm9tTm9kZS5wYXJlbnROb2RlLnJlcGxhY2VDaGlsZChtb3JwaGVkTm9kZSwgZnJvbU5vZGUpO1xuICAgIH1cblxuICAgIHJldHVybiBtb3JwaGVkTm9kZTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBtb3JwaGRvbTtcbiIsIm1vZHVsZS5leHBvcnRzID0gW1xuICAvLyBhdHRyaWJ1dGUgZXZlbnRzIChjYW4gYmUgc2V0IHdpdGggYXR0cmlidXRlcylcbiAgJ29uY2xpY2snLFxuICAnb25kYmxjbGljaycsXG4gICdvbm1vdXNlZG93bicsXG4gICdvbm1vdXNldXAnLFxuICAnb25tb3VzZW92ZXInLFxuICAnb25tb3VzZW1vdmUnLFxuICAnb25tb3VzZW91dCcsXG4gICdvbmRyYWdzdGFydCcsXG4gICdvbmRyYWcnLFxuICAnb25kcmFnZW50ZXInLFxuICAnb25kcmFnbGVhdmUnLFxuICAnb25kcmFnb3ZlcicsXG4gICdvbmRyb3AnLFxuICAnb25kcmFnZW5kJyxcbiAgJ29ua2V5ZG93bicsXG4gICdvbmtleXByZXNzJyxcbiAgJ29ua2V5dXAnLFxuICAnb251bmxvYWQnLFxuICAnb25hYm9ydCcsXG4gICdvbmVycm9yJyxcbiAgJ29ucmVzaXplJyxcbiAgJ29uc2Nyb2xsJyxcbiAgJ29uc2VsZWN0JyxcbiAgJ29uY2hhbmdlJyxcbiAgJ29uc3VibWl0JyxcbiAgJ29ucmVzZXQnLFxuICAnb25mb2N1cycsXG4gICdvbmJsdXInLFxuICAnb25pbnB1dCcsXG4gIC8vIG90aGVyIGNvbW1vbiBldmVudHNcbiAgJ29uY29udGV4dG1lbnUnLFxuICAnb25mb2N1c2luJyxcbiAgJ29uZm9jdXNvdXQnXG5dXG4iLCIvKlxyXG4gKiBOYXR1cmFsIFNvcnQgYWxnb3JpdGhtIGZvciBKYXZhc2NyaXB0IC0gVmVyc2lvbiAwLjcgLSBSZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZVxyXG4gKiBBdXRob3I6IEppbSBQYWxtZXIgKGJhc2VkIG9uIGNodW5raW5nIGlkZWEgZnJvbSBEYXZlIEtvZWxsZSlcclxuICovXHJcbi8qanNoaW50IHVudXNlZDpmYWxzZSAqL1xyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIG5hdHVyYWxTb3J0IChhLCBiKSB7XHJcblx0XCJ1c2Ugc3RyaWN0XCI7XHJcblx0dmFyIHJlID0gLyheKFsrXFwtXT8oPzowfFsxLTldXFxkKikoPzpcXC5cXGQqKT8oPzpbZUVdWytcXC1dP1xcZCspPyk/JHxeMHhbMC05YS1mXSskfFxcZCspL2dpLFxyXG5cdFx0c3JlID0gLyheWyBdKnxbIF0qJCkvZyxcclxuXHRcdGRyZSA9IC8oXihbXFx3IF0rLD9bXFx3IF0rKT9bXFx3IF0rLD9bXFx3IF0rXFxkKzpcXGQrKDpcXGQrKT9bXFx3IF0/fF5cXGR7MSw0fVtcXC9cXC1dXFxkezEsNH1bXFwvXFwtXVxcZHsxLDR9fF5cXHcrLCBcXHcrIFxcZCssIFxcZHs0fSkvLFxyXG5cdFx0aHJlID0gL14weFswLTlhLWZdKyQvaSxcclxuXHRcdG9yZSA9IC9eMC8sXHJcblx0XHRpID0gZnVuY3Rpb24ocykgeyByZXR1cm4gbmF0dXJhbFNvcnQuaW5zZW5zaXRpdmUgJiYgKCcnICsgcykudG9Mb3dlckNhc2UoKSB8fCAnJyArIHM7IH0sXHJcblx0XHQvLyBjb252ZXJ0IGFsbCB0byBzdHJpbmdzIHN0cmlwIHdoaXRlc3BhY2VcclxuXHRcdHggPSBpKGEpLnJlcGxhY2Uoc3JlLCAnJykgfHwgJycsXHJcblx0XHR5ID0gaShiKS5yZXBsYWNlKHNyZSwgJycpIHx8ICcnLFxyXG5cdFx0Ly8gY2h1bmsvdG9rZW5pemVcclxuXHRcdHhOID0geC5yZXBsYWNlKHJlLCAnXFwwJDFcXDAnKS5yZXBsYWNlKC9cXDAkLywnJykucmVwbGFjZSgvXlxcMC8sJycpLnNwbGl0KCdcXDAnKSxcclxuXHRcdHlOID0geS5yZXBsYWNlKHJlLCAnXFwwJDFcXDAnKS5yZXBsYWNlKC9cXDAkLywnJykucmVwbGFjZSgvXlxcMC8sJycpLnNwbGl0KCdcXDAnKSxcclxuXHRcdC8vIG51bWVyaWMsIGhleCBvciBkYXRlIGRldGVjdGlvblxyXG5cdFx0eEQgPSBwYXJzZUludCh4Lm1hdGNoKGhyZSksIDE2KSB8fCAoeE4ubGVuZ3RoICE9PSAxICYmIHgubWF0Y2goZHJlKSAmJiBEYXRlLnBhcnNlKHgpKSxcclxuXHRcdHlEID0gcGFyc2VJbnQoeS5tYXRjaChocmUpLCAxNikgfHwgeEQgJiYgeS5tYXRjaChkcmUpICYmIERhdGUucGFyc2UoeSkgfHwgbnVsbCxcclxuXHRcdG9GeE5jTCwgb0Z5TmNMO1xyXG5cdC8vIGZpcnN0IHRyeSBhbmQgc29ydCBIZXggY29kZXMgb3IgRGF0ZXNcclxuXHRpZiAoeUQpIHtcclxuXHRcdGlmICggeEQgPCB5RCApIHsgcmV0dXJuIC0xOyB9XHJcblx0XHRlbHNlIGlmICggeEQgPiB5RCApIHsgcmV0dXJuIDE7IH1cclxuXHR9XHJcblx0Ly8gbmF0dXJhbCBzb3J0aW5nIHRocm91Z2ggc3BsaXQgbnVtZXJpYyBzdHJpbmdzIGFuZCBkZWZhdWx0IHN0cmluZ3NcclxuXHRmb3IodmFyIGNMb2M9MCwgbnVtUz1NYXRoLm1heCh4Ti5sZW5ndGgsIHlOLmxlbmd0aCk7IGNMb2MgPCBudW1TOyBjTG9jKyspIHtcclxuXHRcdC8vIGZpbmQgZmxvYXRzIG5vdCBzdGFydGluZyB3aXRoICcwJywgc3RyaW5nIG9yIDAgaWYgbm90IGRlZmluZWQgKENsaW50IFByaWVzdClcclxuXHRcdG9GeE5jTCA9ICEoeE5bY0xvY10gfHwgJycpLm1hdGNoKG9yZSkgJiYgcGFyc2VGbG9hdCh4TltjTG9jXSkgfHwgeE5bY0xvY10gfHwgMDtcclxuXHRcdG9GeU5jTCA9ICEoeU5bY0xvY10gfHwgJycpLm1hdGNoKG9yZSkgJiYgcGFyc2VGbG9hdCh5TltjTG9jXSkgfHwgeU5bY0xvY10gfHwgMDtcclxuXHRcdC8vIGhhbmRsZSBudW1lcmljIHZzIHN0cmluZyBjb21wYXJpc29uIC0gbnVtYmVyIDwgc3RyaW5nIC0gKEt5bGUgQWRhbXMpXHJcblx0XHRpZiAoaXNOYU4ob0Z4TmNMKSAhPT0gaXNOYU4ob0Z5TmNMKSkgeyByZXR1cm4gKGlzTmFOKG9GeE5jTCkpID8gMSA6IC0xOyB9XHJcblx0XHQvLyByZWx5IG9uIHN0cmluZyBjb21wYXJpc29uIGlmIGRpZmZlcmVudCB0eXBlcyAtIGkuZS4gJzAyJyA8IDIgIT0gJzAyJyA8ICcyJ1xyXG5cdFx0ZWxzZSBpZiAodHlwZW9mIG9GeE5jTCAhPT0gdHlwZW9mIG9GeU5jTCkge1xyXG5cdFx0XHRvRnhOY0wgKz0gJyc7XHJcblx0XHRcdG9GeU5jTCArPSAnJztcclxuXHRcdH1cclxuXHRcdGlmIChvRnhOY0wgPCBvRnlOY0wpIHsgcmV0dXJuIC0xOyB9XHJcblx0XHRpZiAob0Z4TmNMID4gb0Z5TmNMKSB7IHJldHVybiAxOyB9XHJcblx0fVxyXG5cdHJldHVybiAwO1xyXG59O1xyXG4iLCIvKiBnbG9iYWwgTXV0YXRpb25PYnNlcnZlciAqL1xudmFyIGRvY3VtZW50ID0gcmVxdWlyZSgnZ2xvYmFsL2RvY3VtZW50JylcbnZhciB3aW5kb3cgPSByZXF1aXJlKCdnbG9iYWwvd2luZG93JylcbnZhciB3YXRjaCA9IE9iamVjdC5jcmVhdGUobnVsbClcbnZhciBLRVlfSUQgPSAnb25sb2FkaWQnICsgKG5ldyBEYXRlKCkgJSA5ZTYpLnRvU3RyaW5nKDM2KVxudmFyIEtFWV9BVFRSID0gJ2RhdGEtJyArIEtFWV9JRFxudmFyIElOREVYID0gMFxuXG5pZiAod2luZG93ICYmIHdpbmRvdy5NdXRhdGlvbk9ic2VydmVyKSB7XG4gIHZhciBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKGZ1bmN0aW9uIChtdXRhdGlvbnMpIHtcbiAgICBpZiAod2F0Y2gubGVuZ3RoIDwgMSkgcmV0dXJuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBtdXRhdGlvbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChtdXRhdGlvbnNbaV0uYXR0cmlidXRlTmFtZSA9PT0gS0VZX0FUVFIpIHtcbiAgICAgICAgZWFjaEF0dHIobXV0YXRpb25zW2ldLCB0dXJub24sIHR1cm5vZmYpXG4gICAgICAgIGNvbnRpbnVlXG4gICAgICB9XG4gICAgICBlYWNoTXV0YXRpb24obXV0YXRpb25zW2ldLnJlbW92ZWROb2RlcywgdHVybm9mZilcbiAgICAgIGVhY2hNdXRhdGlvbihtdXRhdGlvbnNbaV0uYWRkZWROb2RlcywgdHVybm9uKVxuICAgIH1cbiAgfSlcbiAgb2JzZXJ2ZXIub2JzZXJ2ZShkb2N1bWVudC5ib2R5LCB7XG4gICAgY2hpbGRMaXN0OiB0cnVlLFxuICAgIHN1YnRyZWU6IHRydWUsXG4gICAgYXR0cmlidXRlczogdHJ1ZSxcbiAgICBhdHRyaWJ1dGVPbGRWYWx1ZTogdHJ1ZSxcbiAgICBhdHRyaWJ1dGVGaWx0ZXI6IFtLRVlfQVRUUl1cbiAgfSlcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBvbmxvYWQgKGVsLCBvbiwgb2ZmKSB7XG4gIG9uID0gb24gfHwgZnVuY3Rpb24gKCkge31cbiAgb2ZmID0gb2ZmIHx8IGZ1bmN0aW9uICgpIHt9XG4gIGVsLnNldEF0dHJpYnV0ZShLRVlfQVRUUiwgJ28nICsgSU5ERVgpXG4gIHdhdGNoWydvJyArIElOREVYXSA9IFtvbiwgb2ZmLCAwXVxuICBJTkRFWCArPSAxXG59XG5cbmZ1bmN0aW9uIHR1cm5vbiAoaW5kZXgpIHtcbiAgaWYgKHdhdGNoW2luZGV4XVswXSAmJiB3YXRjaFtpbmRleF1bMl0gPT09IDApIHtcbiAgICB3YXRjaFtpbmRleF1bMF0oKVxuICAgIHdhdGNoW2luZGV4XVsyXSA9IDFcbiAgfVxufVxuXG5mdW5jdGlvbiB0dXJub2ZmIChpbmRleCkge1xuICBpZiAod2F0Y2hbaW5kZXhdWzFdICYmIHdhdGNoW2luZGV4XVsyXSA9PT0gMSkge1xuICAgIHdhdGNoW2luZGV4XVsxXSgpXG4gICAgd2F0Y2hbaW5kZXhdWzJdID0gMFxuICB9XG59XG5cbmZ1bmN0aW9uIGVhY2hBdHRyIChtdXRhdGlvbiwgb24sIG9mZikge1xuICB2YXIgbmV3VmFsdWUgPSBtdXRhdGlvbi50YXJnZXQuZ2V0QXR0cmlidXRlKEtFWV9BVFRSKVxuICBPYmplY3Qua2V5cyh3YXRjaCkuZm9yRWFjaChmdW5jdGlvbiAoaykge1xuICAgIGlmIChtdXRhdGlvbi5vbGRWYWx1ZSA9PT0gaykge1xuICAgICAgb2ZmKGspXG4gICAgfVxuICAgIGlmIChuZXdWYWx1ZSA9PT0gaykge1xuICAgICAgb24oaylcbiAgICB9XG4gIH0pXG59XG5cbmZ1bmN0aW9uIGVhY2hNdXRhdGlvbiAobm9kZXMsIGZuKSB7XG4gIHZhciBrZXlzID0gT2JqZWN0LmtleXMod2F0Y2gpXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbm9kZXMubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAobm9kZXNbaV0gJiYgbm9kZXNbaV0uZ2V0QXR0cmlidXRlICYmIG5vZGVzW2ldLmdldEF0dHJpYnV0ZShLRVlfQVRUUikpIHtcbiAgICAgIHZhciBvbmxvYWRpZCA9IG5vZGVzW2ldLmdldEF0dHJpYnV0ZShLRVlfQVRUUilcbiAgICAgIGtleXMuZm9yRWFjaChmdW5jdGlvbiAoaykge1xuICAgICAgICBpZiAob25sb2FkaWQgPT09IGspIHtcbiAgICAgICAgICBmbihrKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cbiAgICBpZiAobm9kZXNbaV0uY2hpbGROb2Rlcy5sZW5ndGggPiAwKSB7XG4gICAgICBlYWNoTXV0YXRpb24obm9kZXNbaV0uY2hpbGROb2RlcywgZm4pXG4gICAgfVxuICB9XG59XG4iLCJ2YXIgdG9wTGV2ZWwgPSB0eXBlb2YgZ2xvYmFsICE9PSAndW5kZWZpbmVkJyA/IGdsb2JhbCA6XG4gICAgdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgPyB3aW5kb3cgOiB7fVxudmFyIG1pbkRvYyA9IHJlcXVpcmUoJ21pbi1kb2N1bWVudCcpO1xuXG5pZiAodHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJykge1xuICAgIG1vZHVsZS5leHBvcnRzID0gZG9jdW1lbnQ7XG59IGVsc2Uge1xuICAgIHZhciBkb2NjeSA9IHRvcExldmVsWydfX0dMT0JBTF9ET0NVTUVOVF9DQUNIRUA0J107XG5cbiAgICBpZiAoIWRvY2N5KSB7XG4gICAgICAgIGRvY2N5ID0gdG9wTGV2ZWxbJ19fR0xPQkFMX0RPQ1VNRU5UX0NBQ0hFQDQnXSA9IG1pbkRvYztcbiAgICB9XG5cbiAgICBtb2R1bGUuZXhwb3J0cyA9IGRvY2N5O1xufVxuIiwiaWYgKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IHdpbmRvdztcbn0gZWxzZSBpZiAodHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIG1vZHVsZS5leHBvcnRzID0gZ2xvYmFsO1xufSBlbHNlIGlmICh0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIil7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBzZWxmO1xufSBlbHNlIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IHt9O1xufVxuIiwibW9kdWxlLmV4cG9ydHM9W1xuICB7XG4gICAgXCJuYW1lXCI6IFwiUGl6emVyaWEgUmVnaW5hOiBSZWdpbmEgUGl6emFcIixcbiAgICBcImFkZHJlc3NcIjogXCIxMSAxLzIgVGhhY2hlciBTdCwgQm9zdG9uLCBNQVwiLFxuICAgIFwibGF0XCI6IDQyLjM2NTMzOCxcbiAgICBcImxuZ1wiOiAtNzEuMDU2ODMyXG4gIH0sXG4gIHtcbiAgICBcIm5hbWVcIjogXCJVcHBlciBDcnVzdFwiLFxuICAgIFwiYWRkcmVzc1wiOiBcIjIwIENoYXJsZXMgU3QsIEJvc3RvbiwgTUFcIixcbiAgICBcImxhdFwiOiA0Mi4zNTY2MDcsXG4gICAgXCJsbmdcIjogLTcxLjA2OTY4MVxuICB9LFxuICB7XG4gICAgXCJuYW1lXCI6IFwiQmVydHVjY2kncyBCcmljayBPdmVuIFJzdHJudFwiLFxuICAgIFwiYWRkcmVzc1wiOiBcIjQgQnJvb2tsaW5lIFBsLCBCcm9va2xpbmUsIE1BXCIsXG4gICAgXCJsYXRcIjogNDIuMzMxOTE3LFxuICAgIFwibG5nXCI6IC03MS4xMTUzMTFcbiAgfSxcbiAge1xuICAgIFwibmFtZVwiOiBcIkFxdWl0YWluZVwiLFxuICAgIFwiYWRkcmVzc1wiOiBcIjU2OSBUcmVtb250IFN0LCBCb3N0b24sIE1BXCIsXG4gICAgXCJsYXRcIjogNDIuMzQzNjM3LFxuICAgIFwibG5nXCI6IC03MS4wNzIyNjVcbiAgfSxcbiAge1xuICAgIFwibmFtZVwiOiBcIkJlcnR1Y2NpJ3MgQnJpY2sgT3ZlbiBSc3RybnRcIixcbiAgICBcImFkZHJlc3NcIjogXCI0MyBTdGFuaG9wZSBTdCwgQm9zdG9uLCBNQVwiLFxuICAgIFwibGF0XCI6IDQyLjM0ODI5OSxcbiAgICBcImxuZ1wiOiAtNzEuMDczMjQ5XG4gIH0sXG4gIHtcbiAgICBcIm5hbWVcIjogXCJVcHBlciBDcnVzdFwiLFxuICAgIFwiYWRkcmVzc1wiOiBcIjI4NiBIYXJ2YXJkIFN0LCBCcm9va2xpbmUsIE1BXCIsXG4gICAgXCJsYXRcIjogNDIuMzQyODU2LFxuICAgIFwibG5nXCI6IC03MS4xMjIzMTFcbiAgfSxcbiAge1xuICAgIFwibmFtZVwiOiBcIkJlcnR1Y2NpJ3MgQnJpY2sgT3ZlbiBSc3RybnRcIixcbiAgICBcImFkZHJlc3NcIjogXCI3OTkgTWFpbiBTdCwgQ2FtYnJpZGdlLCBNQVwiLFxuICAgIFwibGF0XCI6IDQyLjM2MzI1OSxcbiAgICBcImxuZ1wiOiAtNzEuMDk3MjFcbiAgfSxcbiAge1xuICAgIFwibmFtZVwiOiBcIkJlcnR1Y2NpJ3MgQnJpY2sgT3ZlbiBSc3RybnRcIixcbiAgICBcImFkZHJlc3NcIjogXCIyMiBNZXJjaGFudHMgUm93LCBCb3N0b24sIE1BXCIsXG4gICAgXCJsYXRcIjogNDIuMzU5MTQ2LFxuICAgIFwibG5nXCI6IC03MS4wNTU0NzdcbiAgfSxcbiAge1xuICAgIFwibmFtZVwiOiBcIlZpbm5pZSBWYW4gR28tR28nc1wiLFxuICAgIFwiYWRkcmVzc1wiOiBcIjMxNyBXIEJyeWFuIFN0LCBTYXZhbm5haCwgR0FcIixcbiAgICBcImxhdFwiOiAzMi4wODExNTIsXG4gICAgXCJsbmdcIjogLTgxLjA5NDk5MlxuICB9LFxuICB7XG4gICAgXCJuYW1lXCI6IFwiRG9taW5vJ3MgUGl6emE6IE15cnRsZSBCZWFjaFwiLFxuICAgIFwiYWRkcmVzc1wiOiBcIjE3MDYgUyBLaW5ncyBId3kgIyBBLCBNeXJ0bGUgQmVhY2gsIFNDXCIsXG4gICAgXCJsYXRcIjogMzMuNjc0ODgsXG4gICAgXCJsbmdcIjogLTc4LjkwNTE0M1xuICB9LFxuICB7XG4gICAgXCJuYW1lXCI6IFwiRWFzdCBvZiBDaGljYWdvIFBpenphIENvbXBhbnlcIixcbiAgICBcImFkZHJlc3NcIjogXCIzOTAxIE5vcnRoIEtpbmdzIEhpZ2h3YXkgU3VpdGUgMSwgTXlydGxlIEJlYWNoLCBTQ1wiLFxuICAgIFwibGF0XCI6IDMzLjcxNjA5NyxcbiAgICBcImxuZ1wiOiAtNzguODU1NTgyXG4gIH0sXG4gIHtcbiAgICBcIm5hbWVcIjogXCJWaWxsYSBUcm9uY28gSXRhbGlhbiBSc3RybnRcIixcbiAgICBcImFkZHJlc3NcIjogXCIxMjEzIEJsYW5kaW5nIFN0LCBDb2x1bWJpYSwgU0NcIixcbiAgICBcImxhdFwiOiAzNC4wMDgwNDgsXG4gICAgXCJsbmdcIjogLTgxLjAzNjMxNFxuICB9LFxuICB7XG4gICAgXCJuYW1lXCI6IFwiTWVsbG93IE11c2hyb29tIFBpenphIEJha2Vyc1wiLFxuICAgIFwiYWRkcmVzc1wiOiBcIjExIFcgTGliZXJ0eSBTdCwgU2F2YW5uYWgsIEdBXCIsXG4gICAgXCJsYXRcIjogMzIuMDc0NjczLFxuICAgIFwibG5nXCI6IC04MS4wOTM2OTlcbiAgfSxcbiAge1xuICAgIFwibmFtZVwiOiBcIkFuZG9saW5pcyBQaXp6YVwiLFxuICAgIFwiYWRkcmVzc1wiOiBcIjgyIFdlbnR3b3J0aCBTdCwgQ2hhcmxlc3RvbiwgU0NcIixcbiAgICBcImxhdFwiOiAzMi43ODIzMyxcbiAgICBcImxuZ1wiOiAtNzkuOTM0MjM2XG4gIH0sXG4gIHtcbiAgICBcIm5hbWVcIjogXCJNZWxsb3cgTXVzaHJvb20gUGl6emEgQmFrZXJzXCIsXG4gICAgXCJhZGRyZXNzXCI6IFwiMjU5IEUgQnJvYWQgU3QsIEF0aGVucywgR0FcIixcbiAgICBcImxhdFwiOiAzMy45NTc4LFxuICAgIFwibG5nXCI6IC04My4zNzQ2NlxuICB9LFxuICB7XG4gICAgXCJuYW1lXCI6IFwiQnVja3MgUGl6emEgb2YgRWRpc3RvIEJlYWNoIEluY1wiLFxuICAgIFwiYWRkcmVzc1wiOiBcIjExNCBKdW5nbGUgUmQsIEVkaXN0byBJc2xhbmQsIFNDXCIsXG4gICAgXCJsYXRcIjogMzIuNTAzOTczLFxuICAgIFwibG5nXCI6IC04MC4yOTc5NDdcbiAgfSxcbiAge1xuICAgIFwibmFtZVwiOiBcIkFudGhvbnkncyBDb2FsIEZpcmVkIFBpenphXCIsXG4gICAgXCJhZGRyZXNzXCI6IFwiMjIwMyBTIEZlZGVyYWwgSHd5LCBGb3J0IExhdWRlcmRhbGUsIEZMXCIsXG4gICAgXCJsYXRcIjogMjYuMDk0NjcxLFxuICAgIFwibG5nXCI6IC04MC4xMzY2ODlcbiAgfSxcbiAge1xuICAgIFwibmFtZVwiOiBcIkdpb3JkYW5vJ3NcIixcbiAgICBcImFkZHJlc3NcIjogXCIxMjE1MSBTIEFwb3BrYSBWaW5lbGFuZCBSZCwgT3JsYW5kbywgRkxcIixcbiAgICBcImxhdFwiOiAyOC4zODkzNjcsXG4gICAgXCJsbmdcIjogLTgxLjUwNjIyMlxuICB9LFxuICB7XG4gICAgXCJuYW1lXCI6IFwiUGl6emEgUnVzdGljYVwiLFxuICAgIFwiYWRkcmVzc1wiOiBcIjg2MyBXYXNoaW5ndG9uIEF2ZSwgTWlhbWkgQmVhY2gsIEZMXCIsXG4gICAgXCJsYXRcIjogMjUuNzc5MDU5LFxuICAgIFwibG5nXCI6IC04MC4xMzMxMDdcbiAgfSxcbiAge1xuICAgIFwibmFtZVwiOiBcIk1hbWEgSmVubmllJ3MgSXRhbGlhbiBSZXN0YXVyYW50XCIsXG4gICAgXCJhZGRyZXNzXCI6IFwiMTE3MjAgTmUgMm5kIEF2ZSwgTm9ydGggTWlhbWksIEZMXCIsXG4gICAgXCJsYXRcIjogMjUuODgyNzgyLFxuICAgIFwibG5nXCI6IC04MC4xOTQyOVxuICB9LFxuICB7XG4gICAgXCJuYW1lXCI6IFwiQW50aG9ueSdzIENvYWwgRmlyZWQgUGl6emFcIixcbiAgICBcImFkZHJlc3NcIjogXCIxNzkwMSBCaXNjYXluZSBCbHZkLCBBdmVudHVyYSwgRkxcIixcbiAgICBcImxhdFwiOiAyNS45NDExMTYsXG4gICAgXCJsbmdcIjogLTgwLjE0ODgyNlxuICB9LFxuICB7XG4gICAgXCJuYW1lXCI6IFwiQW50aG9ueSdzIENvYWwgRmlyZWQgUGl6emFcIixcbiAgICBcImFkZHJlc3NcIjogXCI0NTI3IFdlc3RvbiBSZCwgV2VzdG9uLCBGTFwiLFxuICAgIFwibGF0XCI6IDI2LjA2NTM5NSxcbiAgICBcImxuZ1wiOiAtODAuMzYyNDQyXG4gIH0sXG4gIHtcbiAgICBcIm5hbWVcIjogXCJNYXJpbyB0aGUgQmFrZXIgUGl6emEgJiBJdGFsaWFuIFJlc3RhdXJhbnRcIixcbiAgICBcImFkZHJlc3NcIjogXCIxMzY5NSBXIERpeGllIEh3eSwgTm9ydGggTWlhbWksIEZMXCIsXG4gICAgXCJsYXRcIjogMjUuOTI5NzQsXG4gICAgXCJsbmdcIjogLTgwLjE1NjA5XG4gIH0sXG4gIHtcbiAgICBcIm5hbWVcIjogXCJCaWcgQ2hlZXNlIFBpenphXCIsXG4gICAgXCJhZGRyZXNzXCI6IFwiODA4MCBTVyA2N3RoIEF2ZSwgTWlhbWksIEZMXCIsXG4gICAgXCJsYXRcIjogMjUuNjk2MDI1LFxuICAgIFwibG5nXCI6IC04MC4zMDExMTNcbiAgfSxcbiAge1xuICAgIFwibmFtZVwiOiBcIkluZ2xlc2lkZSBWaWxsYWdlIFBpenphXCIsXG4gICAgXCJhZGRyZXNzXCI6IFwiMjM5NiBJbmdsZXNpZGUgQXZlLCBNYWNvbiwgR0FcIixcbiAgICBcImxhdFwiOiAzMi44NTM3NixcbiAgICBcImxuZ1wiOiAtODMuNjU3NDA2XG4gIH0sXG4gIHtcbiAgICBcIm5hbWVcIjogXCJDaWFvIEJlbGxhIFBpenphIERhIEd1Z2xpZWxtb1wiLFxuICAgIFwiYWRkcmVzc1wiOiBcIjI5IEhpZ2h3YXkgOTggRSwgRGVzdGluLCBGTFwiLFxuICAgIFwibGF0XCI6IDMwLjM5NTU1NixcbiAgICBcImxuZ1wiOiAtODYuNTEyMDkzXG4gIH0sXG4gIHtcbiAgICBcIm5hbWVcIjogXCJQYXBhIEpvaG4ncyBQaXp6YVwiLFxuICAgIFwiYWRkcmVzc1wiOiBcIjgxMCBSdXNzZWxsIFBrd3ksIFdhcm5lciBSb2JpbnMsIEdBXCIsXG4gICAgXCJsYXRcIjogMzIuNTkzOTExLFxuICAgIFwibG5nXCI6IC04My42MzcwNzVcbiAgfSxcbiAge1xuICAgIFwibmFtZVwiOiBcIlBhcGEgSm9obidzIFBpenphOiBFYXN0IENlbnRyYWwgTW9udGdvbWVyeVwiLFxuICAgIFwiYWRkcmVzc1wiOiBcIjI1MjUgTWFkaXNvbiBBdmUsIE1vbnRnb21lcnksIEFMXCIsXG4gICAgXCJsYXRcIjogMzIuMzgxMTIxLFxuICAgIFwibG5nXCI6IC04Ni4yNzMwMzVcbiAgfSxcbiAge1xuICAgIFwibmFtZVwiOiBcIkNpY2kncyBQaXp6YVwiLFxuICAgIFwiYWRkcmVzc1wiOiBcIjYyNjggQXRsYW50YSBId3ksIE1vbnRnb21lcnksIEFMXCIsXG4gICAgXCJsYXRcIjogMzIuMzgyMjA1LFxuICAgIFwibG5nXCI6IC04Ni4xOTA2NzVcbiAgfSxcbiAge1xuICAgIFwibmFtZVwiOiBcIlBhcGEgSm9obidzIFBpenphXCIsXG4gICAgXCJhZGRyZXNzXCI6IFwiMTIxMCBFIEphY2tzb24gU3QsIFRob21hc3ZpbGxlLCBHQVwiLFxuICAgIFwibGF0XCI6IDMwLjg0OTEyOSxcbiAgICBcImxuZ1wiOiAtODMuOTYzNDI4XG4gIH0sXG4gIHtcbiAgICBcIm5hbWVcIjogXCJQYXBhIEpvaG4ncyBQaXp6YVwiLFxuICAgIFwiYWRkcmVzc1wiOiBcIjcxMSBOIFdlc3RvdmVyIEJsdmQgIyBHLCBBbGJhbnksIEdBXCIsXG4gICAgXCJsYXRcIjogMzEuNjEzOTcsXG4gICAgXCJsbmdcIjogLTg0LjIyMzA4XG4gIH0sXG4gIHtcbiAgICBcIm5hbWVcIjogXCJNZWxsb3cgTXVzaHJvb20gUGl6emEgQmFrZXJzXCIsXG4gICAgXCJhZGRyZXNzXCI6IFwiNjEwMCBWZXRlcmFucyBQa3d5LCBDb2x1bWJ1cywgR0FcIixcbiAgICBcImxhdFwiOiAzMi41MzIwNzgsXG4gICAgXCJsbmdcIjogLTg0Ljk1NTg5NFxuICB9LFxuICB7XG4gICAgXCJuYW1lXCI6IFwiU3RhciBQaXp6YVwiLFxuICAgIFwiYWRkcmVzc1wiOiBcIjIxMTEgTm9yZm9sayBTdCwgSG91c3RvbiwgVFhcIixcbiAgICBcImxhdFwiOiAyOS43MzI0NTIsXG4gICAgXCJsbmdcIjogLTk1LjQxMTA1OFxuICB9LFxuICB7XG4gICAgXCJuYW1lXCI6IFwiU3RhciBQaXp6YSBJSVwiLFxuICAgIFwiYWRkcmVzc1wiOiBcIjc3IEhhcnZhcmQgU3QsIEhvdXN0b24sIFRYXCIsXG4gICAgXCJsYXRcIjogMjkuNzcwNzUxLFxuICAgIFwibG5nXCI6IC05NS4zOTYwNDJcbiAgfSxcbiAge1xuICAgIFwibmFtZVwiOiBcIkJyb3RoZXJzIFBpenplcmlhXCIsXG4gICAgXCJhZGRyZXNzXCI6IFwiMTAyOSBIaWdod2F5IDYgTiAjIDEwMCwgSG91c3RvbiwgVFhcIixcbiAgICBcImxhdFwiOiAyOS43NjgzMzcsXG4gICAgXCJsbmdcIjogLTk1LjY0MzU5NFxuICB9LFxuICB7XG4gICAgXCJuYW1lXCI6IFwiMTF0aCBTdHJlZXQgQ2FmZSBJbmNcIixcbiAgICBcImFkZHJlc3NcIjogXCI3NDggRSAxMXRoIFN0LCBIb3VzdG9uLCBUWFwiLFxuICAgIFwibGF0XCI6IDI5Ljc5MDc5NCxcbiAgICBcImxuZ1wiOiAtOTUuMzg4OTIxXG4gIH0sXG4gIHtcbiAgICBcIm5hbWVcIjogXCJDYWxpZm9ybmlhIFBpenphIEtpdGNoZW5cIixcbiAgICBcImFkZHJlc3NcIjogXCIxNzA1IFBvc3QgT2FrIEJsdmQgIyBBLCBIb3VzdG9uLCBUWFwiLFxuICAgIFwibGF0XCI6IDI5Ljc1MDE3MixcbiAgICBcImxuZ1wiOiAtOTUuNDYxMTk5XG4gIH0sXG4gIHtcbiAgICBcIm5hbWVcIjogXCJDb2xsaW5hJ3MgSXRhbGlhbiBDYWZlXCIsXG4gICAgXCJhZGRyZXNzXCI6IFwiMzgzNSBSaWNobW9uZCBBdmUsIEhvdXN0b24sIFRYXCIsXG4gICAgXCJsYXRcIjogMjkuNzMyNjIsXG4gICAgXCJsbmdcIjogLTk1LjQzODk2NFxuICB9LFxuICB7XG4gICAgXCJuYW1lXCI6IFwiQmFycnkncyBQaXp6YSAmIEl0YWxpYW4gRGluZXJcIixcbiAgICBcImFkZHJlc3NcIjogXCI2MDAzIFJpY2htb25kIEF2ZSwgSG91c3RvbiwgVFhcIixcbiAgICBcImxhdFwiOiAyOS43MzE0MyxcbiAgICBcImxuZ1wiOiAtOTUuNDg0MzgyXG4gIH0sXG4gIHtcbiAgICBcIm5hbWVcIjogXCJNYXJpbydzIFNlYXdhbGwgSXRhbGlhbiBSZXN0YXVyYW50XCIsXG4gICAgXCJhZGRyZXNzXCI6IFwiNjI4IFNlYXdhbGwgQmx2ZCwgR2FsdmVzdG9uLCBUWFwiLFxuICAgIFwibGF0XCI6IDI5LjMwNDU0MixcbiAgICBcImxuZ1wiOiAtOTQuNzcyNTk4XG4gIH0sXG4gIHtcbiAgICBcIm5hbWVcIjogXCJDYW1waXNpJ3MgRWd5cHRpYW4gUmVzdGF1cmFudFwiLFxuICAgIFwiYWRkcmVzc1wiOiBcIjU2MTAgRSBNb2NraW5nYmlyZCBMbiwgRGFsbGFzLCBUWFwiLFxuICAgIFwibGF0XCI6IDMyLjgzNjUxLFxuICAgIFwibG5nXCI6IC05Ni43NzE3ODFcbiAgfSxcbiAge1xuICAgIFwibmFtZVwiOiBcIkZhdCBKb2UncyBQaXp6YSBQYXN0YSAmIEJhclwiLFxuICAgIFwiYWRkcmVzc1wiOiBcIjQ3MjEgVyBQYXJrIEJsdmQgIyAxMDEsIFBsYW5vLCBUWFwiLFxuICAgIFwibGF0XCI6IDMzLjAyNzA1NSxcbiAgICBcImxuZ1wiOiAtOTYuNzg4OTEyXG4gIH0sXG4gIHtcbiAgICBcIm5hbWVcIjogXCJTYWNjb25lJ3MgUGl6emFcIixcbiAgICBcImFkZHJlc3NcIjogXCIxMzgxMiBOIEhpZ2h3YXkgMTgzLCBBdXN0aW4sIFRYXCIsXG4gICAgXCJsYXRcIjogMjkuNTY5NTA3LFxuICAgIFwibG5nXCI6IC05Ny45NjQ2NjNcbiAgfSxcbiAge1xuICAgIFwibmFtZVwiOiBcIkZpcmVzaWRlIFBpZXNcIixcbiAgICBcImFkZHJlc3NcIjogXCIyODIwIE4gSGVuZGVyc29uIEF2ZSwgRGFsbGFzLCBUWFwiLFxuICAgIFwibGF0XCI6IDMyLjgxOTc2MixcbiAgICBcImxuZ1wiOiAtOTYuNzg0MTQ4XG4gIH0sXG4gIHtcbiAgICBcIm5hbWVcIjogXCJSb21lbydzXCIsXG4gICAgXCJhZGRyZXNzXCI6IFwiMTUwMCBCYXJ0b24gU3ByaW5ncyBSZCwgQXVzdGluLCBUWFwiLFxuICAgIFwibGF0XCI6IDMwLjI2MTUyNixcbiAgICBcImxuZ1wiOiAtOTcuNzYwMDIyXG4gIH0sXG4gIHtcbiAgICBcIm5hbWVcIjogXCJTYW5kZWxsYSdzIENhZmVcIixcbiAgICBcImFkZHJlc3NcIjogXCI1OTEwIE4gTWFjYXJ0aHVyIEJsdmQsIElydmluZywgVFhcIixcbiAgICBcImxhdFwiOiAzMi44OTIwMDIsXG4gICAgXCJsbmdcIjogLTk2Ljk2MTE4OFxuICB9LFxuICB7XG4gICAgXCJuYW1lXCI6IFwiTWFuZ2lhIENoaWNhZ28gU3R1ZmZlZCBQaXp6YVwiLFxuICAgIFwiYWRkcmVzc1wiOiBcIjM1MDAgR3VhZGFsdXBlIFN0LCBBdXN0aW4sIFRYXCIsXG4gICAgXCJsYXRcIjogMzAuMzAxNTQzLFxuICAgIFwibG5nXCI6IC05Ny43MzkxMTJcbiAgfSxcbiAge1xuICAgIFwibmFtZVwiOiBcIkZyYW5rICYgQW5naWUnc1wiLFxuICAgIFwiYWRkcmVzc1wiOiBcIjUwOCBXZXN0IEF2ZSwgQXVzdGluLCBUWFwiLFxuICAgIFwibGF0XCI6IDMwLjI2OTM5MyxcbiAgICBcImxuZ1wiOiAtOTcuNzUwODg5XG4gIH0sXG4gIHtcbiAgICBcIm5hbWVcIjogXCJaYWNoYXJ5J3MgQ2hpY2FnbyBQaXp6YVwiLFxuICAgIFwiYWRkcmVzc1wiOiBcIjU4MDEgQ29sbGVnZSBBdmUsIE9ha2xhbmQsIENBXCIsXG4gICAgXCJsYXRcIjogMzcuODQ2MTc5LFxuICAgIFwibG5nXCI6IC0xMjIuMjUxOTUxXG4gIH0sXG4gIHtcbiAgICBcIm5hbWVcIjogXCJaYWNoYXJ5J3MgQ2hpY2FnbyBQaXp6YVwiLFxuICAgIFwiYWRkcmVzc1wiOiBcIjE4NTMgU29sYW5vIEF2ZSwgQmVya2VsZXksIENBXCIsXG4gICAgXCJsYXRcIjogMzcuODkxNDA3LFxuICAgIFwibG5nXCI6IC0xMjIuMjc4NDNcbiAgfSxcbiAge1xuICAgIFwibmFtZVwiOiBcIkNoZWVzZSBCb2FyZCBQaXp6YVwiLFxuICAgIFwiYWRkcmVzc1wiOiBcIjE1MTIgU2hhdHR1Y2sgQXZlLCBCZXJrZWxleSwgQ0FcIixcbiAgICBcImxhdFwiOiAzNy44Nzk5NzYsXG4gICAgXCJsbmdcIjogLTEyMi4yNjkyNzVcbiAgfSxcbiAge1xuICAgIFwibmFtZVwiOiBcIkdvYXQgSGlsbCBQaXp6YVwiLFxuICAgIFwiYWRkcmVzc1wiOiBcIjMwMCBDb25uZWN0aWN1dCBTdCwgU2FuIEZyYW5jaXNjbywgQ0FcIixcbiAgICBcImxhdFwiOiAzNy43NjI0MzEsXG4gICAgXCJsbmdcIjogLTEyMi4zOTc2MTdcbiAgfSxcbiAge1xuICAgIFwibmFtZVwiOiBcIlRvbW1hc28gUmlzdG9yYW50ZSBJdGFsaWFub1wiLFxuICAgIFwiYWRkcmVzc1wiOiBcIjEwNDIgS2Vhcm55IFN0LCBTYW4gRnJhbmNpc2NvLCBDQVwiLFxuICAgIFwibGF0XCI6IDM3Ljc5NzM4OCxcbiAgICBcImxuZ1wiOiAtMTIyLjQwNTM3NFxuICB9LFxuICB7XG4gICAgXCJuYW1lXCI6IFwiTGl0dGxlIFN0YXIgUGl6emEgTExDXCIsXG4gICAgXCJhZGRyZXNzXCI6IFwiODQ2IERpdmlzYWRlcm8gU3QsIFNhbiBGcmFuY2lzY28sIENBXCIsXG4gICAgXCJsYXRcIjogMzcuNzc3NTIsXG4gICAgXCJsbmdcIjogLTEyMi40MzgyMTVcbiAgfSxcbiAge1xuICAgIFwibmFtZVwiOiBcIlBhdWxpbmUncyBQaXp6YVwiLFxuICAgIFwiYWRkcmVzc1wiOiBcIjI2MCBWYWxlbmNpYSwgU2FuIEZyYW5jaXNjbywgQ0FcIixcbiAgICBcImxhdFwiOiAzNy43Njg3MjUsXG4gICAgXCJsbmdcIjogLTEyMi40MjIyNDVcbiAgfSxcbiAge1xuICAgIFwibmFtZVwiOiBcIlZpbGxhIFJvbWFuYSBQaXp6ZXJpYSAmIFJzdHJudFwiLFxuICAgIFwiYWRkcmVzc1wiOiBcIjczMSBJcnZpbmcgU3QsIFNhbiBGcmFuY2lzY28sIENBXCIsXG4gICAgXCJsYXRcIjogMzcuNzY0MDc0LFxuICAgIFwibG5nXCI6IC0xMjIuNDY1NTgxXG4gIH0sXG4gIHtcbiAgICBcIm5hbWVcIjogXCJBbWljaSdzIEVhc3QgQ29hc3QgUGl6emVyaWFcIixcbiAgICBcImFkZHJlc3NcIjogXCI2OSBFIDNyZCBBdmUsIFNhbiBNYXRlbywgQ0FcIixcbiAgICBcImxhdFwiOiAzNy41NjM4OTYsXG4gICAgXCJsbmdcIjogLTEyMi4zMjQ3MlxuICB9LFxuICB7XG4gICAgXCJuYW1lXCI6IFwiQW1pY2kncyBFYXN0IENvYXN0IFBpenplcmlhXCIsXG4gICAgXCJhZGRyZXNzXCI6IFwiMjI2IFJlZHdvb2QgU2hvcmVzIFBrd3ksIFJlZHdvb2QgQ2l0eSwgQ0FcIixcbiAgICBcImxhdFwiOiAzNy41MjA1MTYsXG4gICAgXCJsbmdcIjogLTEyMi4yNTIyNTVcbiAgfSxcbiAge1xuICAgIFwibmFtZVwiOiBcIk5vcnRoIEJlYWNoIFBpenphXCIsXG4gICAgXCJhZGRyZXNzXCI6IFwiMjQwIEUgM3JkIEF2ZSwgU2FuIE1hdGVvLCBDQVwiLFxuICAgIFwibGF0XCI6IDM3LjU2NTMyNSxcbiAgICBcImxuZ1wiOiAtMTIyLjMyMjY0M1xuICB9LFxuICB7XG4gICAgXCJuYW1lXCI6IFwiUGF0eGkncyBDaGljYWdvIFBpenphXCIsXG4gICAgXCJhZGRyZXNzXCI6IFwiNDQxIEVtZXJzb24gU3QsIFBhbG8gQWx0bywgQ0FcIixcbiAgICBcImxhdFwiOiAzNy40NDUxNDgsXG4gICAgXCJsbmdcIjogLTEyMi4xNjM1NTNcbiAgfSxcbiAge1xuICAgIFwibmFtZVwiOiBcIlBpenonYSBDaGljYWdvXCIsXG4gICAgXCJhZGRyZXNzXCI6IFwiNDExNSBFbCBDYW1pbm8gUmVhbCwgUGFsbyBBbHRvLCBDQVwiLFxuICAgIFwibGF0XCI6IDM3LjQxNDEwNixcbiAgICBcImxuZ1wiOiAtMTIyLjEyNjIyM1xuICB9LFxuICB7XG4gICAgXCJuYW1lXCI6IFwiQ2FsaWZvcm5pYSBQaXp6YSBLaXRjaGVuXCIsXG4gICAgXCJhZGRyZXNzXCI6IFwiNTMxIENvd3BlciBTdCwgUGFsbyBBbHRvLCBDQVwiLFxuICAgIFwibGF0XCI6IDM3LjQ0ODA3NSxcbiAgICBcImxuZ1wiOiAtMTIyLjE1ODgxM1xuICB9LFxuICB7XG4gICAgXCJuYW1lXCI6IFwiV2luZHkgQ2l0eSBQaXp6YVwiLFxuICAgIFwiYWRkcmVzc1wiOiBcIjM1IEJvdmV0IFJkLCBTYW4gTWF0ZW8sIENBXCIsXG4gICAgXCJsYXRcIjogMzcuNTUxNTYyLFxuICAgIFwibG5nXCI6IC0xMjIuMzE0NTI1XG4gIH0sXG4gIHtcbiAgICBcIm5hbWVcIjogXCJBcHBsZXdvb2QgUGl6emEgMiBHb1wiLFxuICAgIFwiYWRkcmVzc1wiOiBcIjEwMDEgRWwgQ2FtaW5vIFJlYWwsIE1lbmxvIFBhcmssIENBXCIsXG4gICAgXCJsYXRcIjogMzcuNDUyOTY2LFxuICAgIFwibG5nXCI6IC0xMjIuMTgxNzIyXG4gIH0sXG4gIHtcbiAgICBcIm5hbWVcIjogXCJQaXp6YSBBbnRpY2FcIixcbiAgICBcImFkZHJlc3NcIjogXCIzMzQgU2FudGFuYSBSb3cgIyAxMDY1LCBTYW4gSm9zZSwgQ0FcIixcbiAgICBcImxhdFwiOiAzNy4zMjE3OTIsXG4gICAgXCJsbmdcIjogLTEyMS45NDc3MzVcbiAgfSxcbiAge1xuICAgIFwibmFtZVwiOiBcIlBpenonYSBDaGljYWdvXCIsXG4gICAgXCJhZGRyZXNzXCI6IFwiMTU1IFcgU2FuIEZlcm5hbmRvIFN0LCBTYW4gSm9zZSwgQ0FcIixcbiAgICBcImxhdFwiOiAzNy4zMzMyNzcsXG4gICAgXCJsbmdcIjogLTEyMS44OTE2NzdcbiAgfSxcbiAge1xuICAgIFwibmFtZVwiOiBcIkhvdXNlIG9mIFBpenphXCIsXG4gICAgXCJhZGRyZXNzXCI6IFwiNTI3IFMgQWxtYWRlbiBBdmUsIFNhbiBKb3NlLCBDQVwiLFxuICAgIFwibGF0XCI6IDM3LjMyNjM1MyxcbiAgICBcImxuZ1wiOiAtMTIxLjg4ODE2NVxuICB9LFxuICB7XG4gICAgXCJuYW1lXCI6IFwiQW1pY2kncyBFYXN0IENvYXN0IFBpenplcmlhXCIsXG4gICAgXCJhZGRyZXNzXCI6IFwiMjI1IFcgU2FudGEgQ2xhcmEgU3QsIFNhbiBKb3NlLCBDQVwiLFxuICAgIFwibGF0XCI6IDM3LjMzNDcwMixcbiAgICBcImxuZ1wiOiAtMTIxLjg5NDA0NVxuICB9LFxuICB7XG4gICAgXCJuYW1lXCI6IFwiRmlvcmlsbG8ncyBSZXN0YXVyYW50XCIsXG4gICAgXCJhZGRyZXNzXCI6IFwiNjM4IEVsIENhbWlubyBSZWFsLCBTYW50YSBDbGFyYSwgQ0FcIixcbiAgICBcImxhdFwiOiAzNy4zNTQ2MDMsXG4gICAgXCJsbmdcIjogLTEyMS45NDI1NzdcbiAgfSxcbiAge1xuICAgIFwibmFtZVwiOiBcIlRvbnkgJiBBbGJhJ3MgUGl6emEgJiBQYXN0YVwiLFxuICAgIFwiYWRkcmVzc1wiOiBcIjMxMzcgU3RldmVucyBDcmVlayBCbHZkLCBTYW4gSm9zZSwgQ0FcIixcbiAgICBcImxhdFwiOiAzNy4zMjMyOTcsXG4gICAgXCJsbmdcIjogLTEyMS45NTE2NDZcbiAgfSxcbiAge1xuICAgIFwibmFtZVwiOiBcIkdpb3JnaW8nc1wiLFxuICAgIFwiYWRkcmVzc1wiOiBcIjE0NDUgRm94d29ydGh5IEF2ZSwgU2FuIEpvc2UsIENBXCIsXG4gICAgXCJsYXRcIjogMzcuMjc0NjQ4LFxuICAgIFwibG5nXCI6IC0xMjEuODkyODkzXG4gIH0sXG4gIHtcbiAgICBcIm5hbWVcIjogXCJSb3VuZCBUYWJsZSBQaXp6YVwiLFxuICAgIFwiYWRkcmVzc1wiOiBcIjQzMDIgTW9vcnBhcmsgQXZlLCBTYW4gSm9zZSwgQ0FcIixcbiAgICBcImxhdFwiOiAzNy4zMTU5MDMsXG4gICAgXCJsbmdcIjogLTEyMS45Nzc5MjVcbiAgfVxuXVxuIl19
