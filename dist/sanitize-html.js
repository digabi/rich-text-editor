(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.I = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

exports.byteLength = byteLength;
exports.toByteArray = toByteArray;
exports.fromByteArray = fromByteArray;

var lookup = [];
var revLookup = [];
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array;

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i];
  revLookup[code.charCodeAt(i)] = i;
}

revLookup['-'.charCodeAt(0)] = 62;
revLookup['_'.charCodeAt(0)] = 63;

function placeHoldersCount(b64) {
  var len = b64.length;
  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4');
  }

  // the number of equal signs (place holders)
  // if there are two placeholders, than the two characters before it
  // represent one byte
  // if there is only one, then the three characters before it represent 2 bytes
  // this is just a cheap hack to not do indexOf twice
  return b64[len - 2] === '=' ? 2 : b64[len - 1] === '=' ? 1 : 0;
}

function byteLength(b64) {
  // base64 is 4/3 + up to two characters of the original data
  return b64.length * 3 / 4 - placeHoldersCount(b64);
}

function toByteArray(b64) {
  var i, j, l, tmp, placeHolders, arr;
  var len = b64.length;
  placeHolders = placeHoldersCount(b64);

  arr = new Arr(len * 3 / 4 - placeHolders);

  // if there are placeholders, only get up to the last complete 4 chars
  l = placeHolders > 0 ? len - 4 : len;

  var L = 0;

  for (i = 0, j = 0; i < l; i += 4, j += 3) {
    tmp = revLookup[b64.charCodeAt(i)] << 18 | revLookup[b64.charCodeAt(i + 1)] << 12 | revLookup[b64.charCodeAt(i + 2)] << 6 | revLookup[b64.charCodeAt(i + 3)];
    arr[L++] = tmp >> 16 & 0xFF;
    arr[L++] = tmp >> 8 & 0xFF;
    arr[L++] = tmp & 0xFF;
  }

  if (placeHolders === 2) {
    tmp = revLookup[b64.charCodeAt(i)] << 2 | revLookup[b64.charCodeAt(i + 1)] >> 4;
    arr[L++] = tmp & 0xFF;
  } else if (placeHolders === 1) {
    tmp = revLookup[b64.charCodeAt(i)] << 10 | revLookup[b64.charCodeAt(i + 1)] << 4 | revLookup[b64.charCodeAt(i + 2)] >> 2;
    arr[L++] = tmp >> 8 & 0xFF;
    arr[L++] = tmp & 0xFF;
  }

  return arr;
}

function tripletToBase64(num) {
  return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F];
}

function encodeChunk(uint8, start, end) {
  var tmp;
  var output = [];
  for (var i = start; i < end; i += 3) {
    tmp = (uint8[i] << 16) + (uint8[i + 1] << 8) + uint8[i + 2];
    output.push(tripletToBase64(tmp));
  }
  return output.join('');
}

function fromByteArray(uint8) {
  var tmp;
  var len = uint8.length;
  var extraBytes = len % 3; // if we have 1 byte left, pad 2 bytes
  var output = '';
  var parts = [];
  var maxChunkLength = 16383; // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, i + maxChunkLength > len2 ? len2 : i + maxChunkLength));
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1];
    output += lookup[tmp >> 2];
    output += lookup[tmp << 4 & 0x3F];
    output += '==';
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1];
    output += lookup[tmp >> 10];
    output += lookup[tmp >> 4 & 0x3F];
    output += lookup[tmp << 2 & 0x3F];
    output += '=';
  }

  parts.push(output);

  return parts.join('');
}

},{}],2:[function(require,module,exports){
"use strict";

},{}],3:[function(require,module,exports){
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

var Buffer = require('buffer').Buffer;

var isBufferEncoding = Buffer.isEncoding
  || function(encoding) {
       switch (encoding && encoding.toLowerCase()) {
         case 'hex': case 'utf8': case 'utf-8': case 'ascii': case 'binary': case 'base64': case 'ucs2': case 'ucs-2': case 'utf16le': case 'utf-16le': case 'raw': return true;
         default: return false;
       }
     }


function assertEncoding(encoding) {
  if (encoding && !isBufferEncoding(encoding)) {
    throw new Error('Unknown encoding: ' + encoding);
  }
}

// StringDecoder provides an interface for efficiently splitting a series of
// buffers into a series of JS strings without breaking apart multi-byte
// characters. CESU-8 is handled as part of the UTF-8 encoding.
//
// @TODO Handling all encodings inside a single object makes it very difficult
// to reason about this code, so it should be split up in the future.
// @TODO There should be a utf8-strict encoding that rejects invalid UTF-8 code
// points as used by CESU-8.
var StringDecoder = exports.StringDecoder = function(encoding) {
  this.encoding = (encoding || 'utf8').toLowerCase().replace(/[-_]/, '');
  assertEncoding(encoding);
  switch (this.encoding) {
    case 'utf8':
      // CESU-8 represents each of Surrogate Pair by 3-bytes
      this.surrogateSize = 3;
      break;
    case 'ucs2':
    case 'utf16le':
      // UTF-16 represents each of Surrogate Pair by 2-bytes
      this.surrogateSize = 2;
      this.detectIncompleteChar = utf16DetectIncompleteChar;
      break;
    case 'base64':
      // Base-64 stores 3 bytes in 4 chars, and pads the remainder.
      this.surrogateSize = 3;
      this.detectIncompleteChar = base64DetectIncompleteChar;
      break;
    default:
      this.write = passThroughWrite;
      return;
  }

  // Enough space to store all bytes of a single character. UTF-8 needs 4
  // bytes, but CESU-8 may require up to 6 (3 bytes per surrogate).
  this.charBuffer = new Buffer(6);
  // Number of bytes received for the current incomplete multi-byte character.
  this.charReceived = 0;
  // Number of bytes expected for the current incomplete multi-byte character.
  this.charLength = 0;
};


// write decodes the given buffer and returns it as JS string that is
// guaranteed to not contain any partial multi-byte characters. Any partial
// character found at the end of the buffer is buffered up, and will be
// returned when calling write again with the remaining bytes.
//
// Note: Converting a Buffer containing an orphan surrogate to a String
// currently works, but converting a String to a Buffer (via `new Buffer`, or
// Buffer#write) will replace incomplete surrogates with the unicode
// replacement character. See https://codereview.chromium.org/121173009/ .
StringDecoder.prototype.write = function(buffer) {
  var charStr = '';
  // if our last write ended with an incomplete multibyte character
  while (this.charLength) {
    // determine how many remaining bytes this buffer has to offer for this char
    var available = (buffer.length >= this.charLength - this.charReceived) ?
        this.charLength - this.charReceived :
        buffer.length;

    // add the new bytes to the char buffer
    buffer.copy(this.charBuffer, this.charReceived, 0, available);
    this.charReceived += available;

    if (this.charReceived < this.charLength) {
      // still not enough chars in this buffer? wait for more ...
      return '';
    }

    // remove bytes belonging to the current character from the buffer
    buffer = buffer.slice(available, buffer.length);

    // get the character that was split
    charStr = this.charBuffer.slice(0, this.charLength).toString(this.encoding);

    // CESU-8: lead surrogate (D800-DBFF) is also the incomplete character
    var charCode = charStr.charCodeAt(charStr.length - 1);
    if (charCode >= 0xD800 && charCode <= 0xDBFF) {
      this.charLength += this.surrogateSize;
      charStr = '';
      continue;
    }
    this.charReceived = this.charLength = 0;

    // if there are no more bytes in this buffer, just emit our char
    if (buffer.length === 0) {
      return charStr;
    }
    break;
  }

  // determine and set charLength / charReceived
  this.detectIncompleteChar(buffer);

  var end = buffer.length;
  if (this.charLength) {
    // buffer the incomplete character bytes we got
    buffer.copy(this.charBuffer, 0, buffer.length - this.charReceived, end);
    end -= this.charReceived;
  }

  charStr += buffer.toString(this.encoding, 0, end);

  var end = charStr.length - 1;
  var charCode = charStr.charCodeAt(end);
  // CESU-8: lead surrogate (D800-DBFF) is also the incomplete character
  if (charCode >= 0xD800 && charCode <= 0xDBFF) {
    var size = this.surrogateSize;
    this.charLength += size;
    this.charReceived += size;
    this.charBuffer.copy(this.charBuffer, size, 0, size);
    buffer.copy(this.charBuffer, 0, 0, size);
    return charStr.substring(0, end);
  }

  // or just emit the charStr
  return charStr;
};

// detectIncompleteChar determines if there is an incomplete UTF-8 character at
// the end of the given buffer. If so, it sets this.charLength to the byte
// length that character, and sets this.charReceived to the number of bytes
// that are available for this character.
StringDecoder.prototype.detectIncompleteChar = function(buffer) {
  // determine how many bytes we have to check at the end of this buffer
  var i = (buffer.length >= 3) ? 3 : buffer.length;

  // Figure out if one of the last i bytes of our buffer announces an
  // incomplete char.
  for (; i > 0; i--) {
    var c = buffer[buffer.length - i];

    // See http://en.wikipedia.org/wiki/UTF-8#Description

    // 110XXXXX
    if (i == 1 && c >> 5 == 0x06) {
      this.charLength = 2;
      break;
    }

    // 1110XXXX
    if (i <= 2 && c >> 4 == 0x0E) {
      this.charLength = 3;
      break;
    }

    // 11110XXX
    if (i <= 3 && c >> 3 == 0x1E) {
      this.charLength = 4;
      break;
    }
  }
  this.charReceived = i;
};

StringDecoder.prototype.end = function(buffer) {
  var res = '';
  if (buffer && buffer.length)
    res = this.write(buffer);

  if (this.charReceived) {
    var cr = this.charReceived;
    var buf = this.charBuffer;
    var enc = this.encoding;
    res += buf.slice(0, cr).toString(enc);
  }

  return res;
};

function passThroughWrite(buffer) {
  return buffer.toString(this.encoding);
}

function utf16DetectIncompleteChar(buffer) {
  this.charReceived = buffer.length % 2;
  this.charLength = this.charReceived ? 2 : 0;
}

function base64DetectIncompleteChar(buffer) {
  this.charReceived = buffer.length % 3;
  this.charLength = this.charReceived ? 3 : 0;
}

},{"buffer":5}],4:[function(require,module,exports){
(function (global){
'use strict';

var buffer = require('buffer');
var Buffer = buffer.Buffer;
var SlowBuffer = buffer.SlowBuffer;
var MAX_LEN = buffer.kMaxLength || 2147483647;
exports.alloc = function alloc(size, fill, encoding) {
  if (typeof Buffer.alloc === 'function') {
    return Buffer.alloc(size, fill, encoding);
  }
  if (typeof encoding === 'number') {
    throw new TypeError('encoding must not be number');
  }
  if (typeof size !== 'number') {
    throw new TypeError('size must be a number');
  }
  if (size > MAX_LEN) {
    throw new RangeError('size is too large');
  }
  var enc = encoding;
  var _fill = fill;
  if (_fill === undefined) {
    enc = undefined;
    _fill = 0;
  }
  var buf = new Buffer(size);
  if (typeof _fill === 'string') {
    var fillBuf = new Buffer(_fill, enc);
    var flen = fillBuf.length;
    var i = -1;
    while (++i < size) {
      buf[i] = fillBuf[i % flen];
    }
  } else {
    buf.fill(_fill);
  }
  return buf;
};
exports.allocUnsafe = function allocUnsafe(size) {
  if (typeof Buffer.allocUnsafe === 'function') {
    return Buffer.allocUnsafe(size);
  }
  if (typeof size !== 'number') {
    throw new TypeError('size must be a number');
  }
  if (size > MAX_LEN) {
    throw new RangeError('size is too large');
  }
  return new Buffer(size);
};
exports.from = function from(value, encodingOrOffset, length) {
  if (typeof Buffer.from === 'function' && (!global.Uint8Array || Uint8Array.from !== Buffer.from)) {
    return Buffer.from(value, encodingOrOffset, length);
  }
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number');
  }
  if (typeof value === 'string') {
    return new Buffer(value, encodingOrOffset);
  }
  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    var offset = encodingOrOffset;
    if (arguments.length === 1) {
      return new Buffer(value);
    }
    if (typeof offset === 'undefined') {
      offset = 0;
    }
    var len = length;
    if (typeof len === 'undefined') {
      len = value.byteLength - offset;
    }
    if (offset >= value.byteLength) {
      throw new RangeError('\'offset\' is out of bounds');
    }
    if (len > value.byteLength - offset) {
      throw new RangeError('\'length\' is out of bounds');
    }
    return new Buffer(value.slice(offset, offset + len));
  }
  if (Buffer.isBuffer(value)) {
    var out = new Buffer(value.length);
    value.copy(out, 0, 0, value.length);
    return out;
  }
  if (value) {
    if (Array.isArray(value) || typeof ArrayBuffer !== 'undefined' && value.buffer instanceof ArrayBuffer || 'length' in value) {
      return new Buffer(value);
    }
    if (value.type === 'Buffer' && Array.isArray(value.data)) {
      return new Buffer(value.data);
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ' + 'ArrayBuffer, Array, or array-like object.');
};
exports.allocUnsafeSlow = function allocUnsafeSlow(size) {
  if (typeof Buffer.allocUnsafeSlow === 'function') {
    return Buffer.allocUnsafeSlow(size);
  }
  if (typeof size !== 'number') {
    throw new TypeError('size must be a number');
  }
  if (size >= MAX_LEN) {
    throw new RangeError('size is too large');
  }
  return new SlowBuffer(size);
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"buffer":5}],5:[function(require,module,exports){
(function (global){
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */

'use strict'

var base64 = require('base64-js')
var ieee754 = require('ieee754')
var isArray = require('isarray')

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
  ? global.TYPED_ARRAY_SUPPORT
  : typedArraySupport()

/*
 * Export kMaxLength after typed array support is determined.
 */
exports.kMaxLength = kMaxLength()

function typedArraySupport () {
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
    return arr.foo() === 42 && // typed array instances can be augmented
        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
  } catch (e) {
    return false
  }
}

function kMaxLength () {
  return Buffer.TYPED_ARRAY_SUPPORT
    ? 0x7fffffff
    : 0x3fffffff
}

function createBuffer (that, length) {
  if (kMaxLength() < length) {
    throw new RangeError('Invalid typed array length')
  }
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length)
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    if (that === null) {
      that = new Buffer(length)
    }
    that.length = length
  }

  return that
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
    return new Buffer(arg, encodingOrOffset, length)
  }

  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error(
        'If encoding is specified then the first argument must be a string'
      )
    }
    return allocUnsafe(this, arg)
  }
  return from(this, arg, encodingOrOffset, length)
}

Buffer.poolSize = 8192 // not used by this implementation

// TODO: Legacy, not needed anymore. Remove in next major version.
Buffer._augment = function (arr) {
  arr.__proto__ = Buffer.prototype
  return arr
}

function from (that, value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number')
  }

  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length)
  }

  if (typeof value === 'string') {
    return fromString(that, value, encodingOrOffset)
  }

  return fromObject(that, value)
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(null, value, encodingOrOffset, length)
}

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype
  Buffer.__proto__ = Uint8Array
  if (typeof Symbol !== 'undefined' && Symbol.species &&
      Buffer[Symbol.species] === Buffer) {
    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
    Object.defineProperty(Buffer, Symbol.species, {
      value: null,
      configurable: true
    })
  }
}

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number')
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative')
  }
}

function alloc (that, size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(that, size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(that, size).fill(fill, encoding)
      : createBuffer(that, size).fill(fill)
  }
  return createBuffer(that, size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(null, size, fill, encoding)
}

function allocUnsafe (that, size) {
  assertSize(size)
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      that[i] = 0
    }
  }
  return that
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(null, size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(null, size)
}

function fromString (that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding')
  }

  var length = byteLength(string, encoding) | 0
  that = createBuffer(that, length)

  var actual = that.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    that = that.slice(0, actual)
  }

  return that
}

function fromArrayLike (that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  that = createBuffer(that, length)
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

function fromArrayBuffer (that, array, byteOffset, length) {
  array.byteLength // this throws if `array` is not a valid ArrayBuffer

  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds')
  }

  if (byteOffset === undefined && length === undefined) {
    array = new Uint8Array(array)
  } else if (length === undefined) {
    array = new Uint8Array(array, byteOffset)
  } else {
    array = new Uint8Array(array, byteOffset, length)
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = array
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromArrayLike(that, array)
  }
  return that
}

function fromObject (that, obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    that = createBuffer(that, len)

    if (that.length === 0) {
      return that
    }

    obj.copy(that, 0, 0, len)
    return that
  }

  if (obj) {
    if ((typeof ArrayBuffer !== 'undefined' &&
        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(that, 0)
      }
      return fromArrayLike(that, obj)
    }

    if (obj.type === 'Buffer' && isArray(obj.data)) {
      return fromArrayLike(that, obj.data)
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
}

function checked (length) {
  // Note: cannot use `length < kMaxLength()` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return !!(b != null && b._isBuffer)
}

Buffer.compare = function compare (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    string = '' + string
  }

  var len = string.length
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length | 0
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max) str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (!Buffer.isBuffer(target)) {
    throw new TypeError('Argument must be a Buffer')
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset  // Coerce to Number.
  if (isNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (Buffer.TYPED_ARRAY_SUPPORT &&
        typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (isNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0
    if (isFinite(length)) {
      length = length | 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  // legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end)
    newBuf.__proto__ = Buffer.prototype
  } else {
    var sliceLen = end - start
    newBuf = new Buffer(sliceLen, undefined)
    for (var i = 0; i < sliceLen; ++i) {
      newBuf[i] = this[i + start]
    }
  }

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  this[offset] = (value & 0xff)
  return offset + 1
}

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24)
    this[offset + 2] = (value >>> 16)
    this[offset + 1] = (value >>> 8)
    this[offset] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
    this[offset + 2] = (value >>> 16)
    this[offset + 3] = (value >>> 24)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start
  var i

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, start + len),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if (code < 256) {
        val = code
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : utf8ToBytes(new Buffer(val, encoding).toString())
    var len = bytes.length
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

function isnan (val) {
  return val !== val // eslint-disable-line no-self-compare
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"base64-js":1,"ieee754":37,"isarray":40}],6:[function(require,module,exports){
(function (Buffer){
'use strict';

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

// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.

function isArray(arg) {
  if (Array.isArray) {
    return Array.isArray(arg);
  }
  return objectToString(arg) === '[object Array]';
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
  return objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return objectToString(d) === '[object Date]';
}
exports.isDate = isDate;

function isError(e) {
  return objectToString(e) === '[object Error]' || e instanceof Error;
}
exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null || typeof arg === 'boolean' || typeof arg === 'number' || typeof arg === 'string' || typeof arg === 'symbol' || // ES6 symbol
  typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = Buffer.isBuffer;

function objectToString(o) {
  return Object.prototype.toString.call(o);
}

}).call(this,{"isBuffer":require("../../is-buffer/index.js")})

},{"../../is-buffer/index.js":39}],7:[function(require,module,exports){
'use strict';

/*
  Module dependencies
*/
var ElementType = require('domelementtype');
var entities = require('entities');

/*
  Boolean Attributes
*/
var booleanAttributes = {
  __proto__: null,
  allowfullscreen: true,
  async: true,
  autofocus: true,
  autoplay: true,
  checked: true,
  controls: true,
  default: true,
  defer: true,
  disabled: true,
  hidden: true,
  ismap: true,
  loop: true,
  multiple: true,
  muted: true,
  open: true,
  readonly: true,
  required: true,
  reversed: true,
  scoped: true,
  seamless: true,
  selected: true,
  typemustmatch: true
};

var unencodedElements = {
  __proto__: null,
  style: true,
  script: true,
  xmp: true,
  iframe: true,
  noembed: true,
  noframes: true,
  plaintext: true,
  noscript: true
};

/*
  Format attributes
*/
function formatAttrs(attributes, opts) {
  if (!attributes) return;

  var output = '',
      value;

  // Loop through the attributes
  for (var key in attributes) {
    value = attributes[key];
    if (output) {
      output += ' ';
    }

    if (!value && booleanAttributes[key]) {
      output += key;
    } else {
      output += key + '="' + (opts.decodeEntities ? entities.encodeXML(value) : value) + '"';
    }
  }

  return output;
}

/*
  Self-enclosing tags (stolen from node-htmlparser)
*/
var singleTag = {
  __proto__: null,
  area: true,
  base: true,
  basefont: true,
  br: true,
  col: true,
  command: true,
  embed: true,
  frame: true,
  hr: true,
  img: true,
  input: true,
  isindex: true,
  keygen: true,
  link: true,
  meta: true,
  param: true,
  source: true,
  track: true,
  wbr: true
};

var render = module.exports = function (dom, opts) {
  if (!Array.isArray(dom) && !dom.cheerio) dom = [dom];
  opts = opts || {};

  var output = '';

  for (var i = 0; i < dom.length; i++) {
    var elem = dom[i];

    if (elem.type === 'root') output += render(elem.children, opts);else if (ElementType.isTag(elem)) output += renderTag(elem, opts);else if (elem.type === ElementType.Directive) output += renderDirective(elem);else if (elem.type === ElementType.Comment) output += renderComment(elem);else if (elem.type === ElementType.CDATA) output += renderCdata(elem);else output += renderText(elem, opts);
  }

  return output;
};

function renderTag(elem, opts) {
  // Handle SVG
  if (elem.name === "svg") opts = { decodeEntities: opts.decodeEntities, xmlMode: true };

  var tag = '<' + elem.name,
      attribs = formatAttrs(elem.attribs, opts);

  if (attribs) {
    tag += ' ' + attribs;
  }

  if (opts.xmlMode && (!elem.children || elem.children.length === 0)) {
    tag += '/>';
  } else {
    tag += '>';
    if (elem.children) {
      tag += render(elem.children, opts);
    }

    if (!singleTag[elem.name] || opts.xmlMode) {
      tag += '</' + elem.name + '>';
    }
  }

  return tag;
}

function renderDirective(elem) {
  return '<' + elem.data + '>';
}

function renderText(elem, opts) {
  var data = elem.data || '';

  // if entities weren't decoded, no need to encode them back
  if (opts.decodeEntities && !(elem.parent && elem.parent.name in unencodedElements)) {
    data = entities.encodeXML(data);
  }

  return data;
}

function renderCdata(elem) {
  return '<![CDATA[' + elem.children[0].data + ']]>';
}

function renderComment(elem) {
  return '<!--' + elem.data + '-->';
}

},{"domelementtype":8,"entities":20}],8:[function(require,module,exports){
//Types of elements found in the DOM
module.exports = {
	Text: "text", //Text
	Directive: "directive", //<? ... ?>
	Comment: "comment", //<!-- ... -->
	Script: "script", //<script> tags
	Style: "style", //<style> tags
	Tag: "tag", //Any tag
	CDATA: "cdata", //<![CDATA[ ... ]]>

	isTag: function(elem){
		return elem.type === "tag" || elem.type === "script" || elem.type === "style";
	}
};
},{}],9:[function(require,module,exports){
"use strict";

//Types of elements found in the DOM
module.exports = {
	Text: "text", //Text
	Directive: "directive", //<? ... ?>
	Comment: "comment", //<!-- ... -->
	Script: "script", //<script> tags
	Style: "style", //<style> tags
	Tag: "tag", //Any tag
	CDATA: "cdata", //<![CDATA[ ... ]]>
	Doctype: "doctype",

	isTag: function isTag(elem) {
		return elem.type === "tag" || elem.type === "script" || elem.type === "style";
	}
};

},{}],10:[function(require,module,exports){
"use strict";

var ElementType = require("domelementtype");

var re_whitespace = /\s+/g;
var NodePrototype = require("./lib/node");
var ElementPrototype = require("./lib/element");

function DomHandler(callback, options, elementCB) {
	if (typeof callback === "object") {
		elementCB = options;
		options = callback;
		callback = null;
	} else if (typeof options === "function") {
		elementCB = options;
		options = defaultOpts;
	}
	this._callback = callback;
	this._options = options || defaultOpts;
	this._elementCB = elementCB;
	this.dom = [];
	this._done = false;
	this._tagStack = [];
	this._parser = this._parser || null;
}

//default options
var defaultOpts = {
	normalizeWhitespace: false, //Replace all whitespace with single spaces
	withStartIndices: false };

DomHandler.prototype.onparserinit = function (parser) {
	this._parser = parser;
};

//Resets the handler back to starting state
DomHandler.prototype.onreset = function () {
	DomHandler.call(this, this._callback, this._options, this._elementCB);
};

//Signals the handler that parsing is done
DomHandler.prototype.onend = function () {
	if (this._done) return;
	this._done = true;
	this._parser = null;
	this._handleCallback(null);
};

DomHandler.prototype._handleCallback = DomHandler.prototype.onerror = function (error) {
	if (typeof this._callback === "function") {
		this._callback(error, this.dom);
	} else {
		if (error) throw error;
	}
};

DomHandler.prototype.onclosetag = function () {
	//if(this._tagStack.pop().name !== name) this._handleCallback(Error("Tagname didn't match!"));
	var elem = this._tagStack.pop();
	if (this._elementCB) this._elementCB(elem);
};

DomHandler.prototype._addDomElement = function (element) {
	var parent = this._tagStack[this._tagStack.length - 1];
	var siblings = parent ? parent.children : this.dom;
	var previousSibling = siblings[siblings.length - 1];

	element.next = null;

	if (this._options.withStartIndices) {
		element.startIndex = this._parser.startIndex;
	}

	if (this._options.withDomLvl1) {
		element.__proto__ = element.type === "tag" ? ElementPrototype : NodePrototype;
	}

	if (previousSibling) {
		element.prev = previousSibling;
		previousSibling.next = element;
	} else {
		element.prev = null;
	}

	siblings.push(element);
	element.parent = parent || null;
};

DomHandler.prototype.onopentag = function (name, attribs) {
	var element = {
		type: name === "script" ? ElementType.Script : name === "style" ? ElementType.Style : ElementType.Tag,
		name: name,
		attribs: attribs,
		children: []
	};

	this._addDomElement(element);

	this._tagStack.push(element);
};

DomHandler.prototype.ontext = function (data) {
	//the ignoreWhitespace is officially dropped, but for now,
	//it's an alias for normalizeWhitespace
	var normalize = this._options.normalizeWhitespace || this._options.ignoreWhitespace;

	var lastTag;

	if (!this._tagStack.length && this.dom.length && (lastTag = this.dom[this.dom.length - 1]).type === ElementType.Text) {
		if (normalize) {
			lastTag.data = (lastTag.data + data).replace(re_whitespace, " ");
		} else {
			lastTag.data += data;
		}
	} else {
		if (this._tagStack.length && (lastTag = this._tagStack[this._tagStack.length - 1]) && (lastTag = lastTag.children[lastTag.children.length - 1]) && lastTag.type === ElementType.Text) {
			if (normalize) {
				lastTag.data = (lastTag.data + data).replace(re_whitespace, " ");
			} else {
				lastTag.data += data;
			}
		} else {
			if (normalize) {
				data = data.replace(re_whitespace, " ");
			}

			this._addDomElement({
				data: data,
				type: ElementType.Text
			});
		}
	}
};

DomHandler.prototype.oncomment = function (data) {
	var lastTag = this._tagStack[this._tagStack.length - 1];

	if (lastTag && lastTag.type === ElementType.Comment) {
		lastTag.data += data;
		return;
	}

	var element = {
		data: data,
		type: ElementType.Comment
	};

	this._addDomElement(element);
	this._tagStack.push(element);
};

DomHandler.prototype.oncdatastart = function () {
	var element = {
		children: [{
			data: "",
			type: ElementType.Text
		}],
		type: ElementType.CDATA
	};

	this._addDomElement(element);
	this._tagStack.push(element);
};

DomHandler.prototype.oncommentend = DomHandler.prototype.oncdataend = function () {
	this._tagStack.pop();
};

DomHandler.prototype.onprocessinginstruction = function (name, data) {
	this._addDomElement({
		name: name,
		data: data,
		type: ElementType.Directive
	});
};

module.exports = DomHandler;

},{"./lib/element":11,"./lib/node":12,"domelementtype":9}],11:[function(require,module,exports){
"use strict";

// DOM-Level-1-compliant structure
var NodePrototype = require('./node');
var ElementPrototype = module.exports = Object.create(NodePrototype);

var domLvl1 = {
	tagName: "name"
};

Object.keys(domLvl1).forEach(function (key) {
	var shorthand = domLvl1[key];
	Object.defineProperty(ElementPrototype, key, {
		get: function get() {
			return this[shorthand] || null;
		},
		set: function set(val) {
			this[shorthand] = val;
			return val;
		}
	});
});

},{"./node":12}],12:[function(require,module,exports){
"use strict";

// This object will be used as the prototype for Nodes when creating a
// DOM-Level-1-compliant structure.
var NodePrototype = module.exports = {
	get firstChild() {
		var children = this.children;
		return children && children[0] || null;
	},
	get lastChild() {
		var children = this.children;
		return children && children[children.length - 1] || null;
	},
	get nodeType() {
		return nodeTypes[this.type] || nodeTypes.element;
	}
};

var domLvl1 = {
	tagName: "name",
	childNodes: "children",
	parentNode: "parent",
	previousSibling: "prev",
	nextSibling: "next",
	nodeValue: "data"
};

var nodeTypes = {
	element: 1,
	text: 3,
	cdata: 4,
	comment: 8
};

Object.keys(domLvl1).forEach(function (key) {
	var shorthand = domLvl1[key];
	Object.defineProperty(NodePrototype, key, {
		get: function get() {
			return this[shorthand] || null;
		},
		set: function set(val) {
			this[shorthand] = val;
			return val;
		}
	});
});

},{}],13:[function(require,module,exports){
"use strict";

var DomUtils = module.exports;

[require("./lib/stringify"), require("./lib/traversal"), require("./lib/manipulation"), require("./lib/querying"), require("./lib/legacy"), require("./lib/helpers")].forEach(function (ext) {
	Object.keys(ext).forEach(function (key) {
		DomUtils[key] = ext[key].bind(DomUtils);
	});
});

},{"./lib/helpers":14,"./lib/legacy":15,"./lib/manipulation":16,"./lib/querying":17,"./lib/stringify":18,"./lib/traversal":19}],14:[function(require,module,exports){
"use strict";

// removeSubsets
// Given an array of nodes, remove any member that is contained by another.
exports.removeSubsets = function (nodes) {
	var idx = nodes.length,
	    node,
	    ancestor,
	    replace;

	// Check if each node (or one of its ancestors) is already contained in the
	// array.
	while (--idx > -1) {
		node = ancestor = nodes[idx];

		// Temporarily remove the node under consideration
		nodes[idx] = null;
		replace = true;

		while (ancestor) {
			if (nodes.indexOf(ancestor) > -1) {
				replace = false;
				nodes.splice(idx, 1);
				break;
			}
			ancestor = ancestor.parent;
		}

		// If the node has been found to be unique, re-insert it.
		if (replace) {
			nodes[idx] = node;
		}
	}

	return nodes;
};

// Source: http://dom.spec.whatwg.org/#dom-node-comparedocumentposition
var POSITION = {
	DISCONNECTED: 1,
	PRECEDING: 2,
	FOLLOWING: 4,
	CONTAINS: 8,
	CONTAINED_BY: 16
};

// Compare the position of one node against another node in any other document.
// The return value is a bitmask with the following values:
//
// document order:
// > There is an ordering, document order, defined on all the nodes in the
// > document corresponding to the order in which the first character of the
// > XML representation of each node occurs in the XML representation of the
// > document after expansion of general entities. Thus, the document element
// > node will be the first node. Element nodes occur before their children.
// > Thus, document order orders element nodes in order of the occurrence of
// > their start-tag in the XML (after expansion of entities). The attribute
// > nodes of an element occur after the element and before its children. The
// > relative order of attribute nodes is implementation-dependent./
// Source:
// http://www.w3.org/TR/DOM-Level-3-Core/glossary.html#dt-document-order
//
// @argument {Node} nodaA The first node to use in the comparison
// @argument {Node} nodeB The second node to use in the comparison
//
// @return {Number} A bitmask describing the input nodes' relative position.
//         See http://dom.spec.whatwg.org/#dom-node-comparedocumentposition for
//         a description of these values.
var comparePos = exports.compareDocumentPosition = function (nodeA, nodeB) {
	var aParents = [];
	var bParents = [];
	var current, sharedParent, siblings, aSibling, bSibling, idx;

	if (nodeA === nodeB) {
		return 0;
	}

	current = nodeA;
	while (current) {
		aParents.unshift(current);
		current = current.parent;
	}
	current = nodeB;
	while (current) {
		bParents.unshift(current);
		current = current.parent;
	}

	idx = 0;
	while (aParents[idx] === bParents[idx]) {
		idx++;
	}

	if (idx === 0) {
		return POSITION.DISCONNECTED;
	}

	sharedParent = aParents[idx - 1];
	siblings = sharedParent.children;
	aSibling = aParents[idx];
	bSibling = bParents[idx];

	if (siblings.indexOf(aSibling) > siblings.indexOf(bSibling)) {
		if (sharedParent === nodeB) {
			return POSITION.FOLLOWING | POSITION.CONTAINED_BY;
		}
		return POSITION.FOLLOWING;
	} else {
		if (sharedParent === nodeA) {
			return POSITION.PRECEDING | POSITION.CONTAINS;
		}
		return POSITION.PRECEDING;
	}
};

// Sort an array of nodes based on their relative position in the document and
// remove any duplicate nodes. If the array contains nodes that do not belong
// to the same document, sort order is unspecified.
//
// @argument {Array} nodes Array of DOM nodes
//
// @returns {Array} collection of unique nodes, sorted in document order
exports.uniqueSort = function (nodes) {
	var idx = nodes.length,
	    node,
	    position;

	nodes = nodes.slice();

	while (--idx > -1) {
		node = nodes[idx];
		position = nodes.indexOf(node);
		if (position > -1 && position < idx) {
			nodes.splice(idx, 1);
		}
	}
	nodes.sort(function (a, b) {
		var relative = comparePos(a, b);
		if (relative & POSITION.PRECEDING) {
			return -1;
		} else if (relative & POSITION.FOLLOWING) {
			return 1;
		}
		return 0;
	});

	return nodes;
};

},{}],15:[function(require,module,exports){
"use strict";

var ElementType = require("domelementtype");
var isTag = exports.isTag = ElementType.isTag;

exports.testElement = function (options, element) {
	for (var key in options) {
		if (!options.hasOwnProperty(key)) ;else if (key === "tag_name") {
			if (!isTag(element) || !options.tag_name(element.name)) {
				return false;
			}
		} else if (key === "tag_type") {
			if (!options.tag_type(element.type)) return false;
		} else if (key === "tag_contains") {
			if (isTag(element) || !options.tag_contains(element.data)) {
				return false;
			}
		} else if (!element.attribs || !options[key](element.attribs[key])) {
			return false;
		}
	}
	return true;
};

var Checks = {
	tag_name: function tag_name(name) {
		if (typeof name === "function") {
			return function (elem) {
				return isTag(elem) && name(elem.name);
			};
		} else if (name === "*") {
			return isTag;
		} else {
			return function (elem) {
				return isTag(elem) && elem.name === name;
			};
		}
	},
	tag_type: function tag_type(type) {
		if (typeof type === "function") {
			return function (elem) {
				return type(elem.type);
			};
		} else {
			return function (elem) {
				return elem.type === type;
			};
		}
	},
	tag_contains: function tag_contains(data) {
		if (typeof data === "function") {
			return function (elem) {
				return !isTag(elem) && data(elem.data);
			};
		} else {
			return function (elem) {
				return !isTag(elem) && elem.data === data;
			};
		}
	}
};

function getAttribCheck(attrib, value) {
	if (typeof value === "function") {
		return function (elem) {
			return elem.attribs && value(elem.attribs[attrib]);
		};
	} else {
		return function (elem) {
			return elem.attribs && elem.attribs[attrib] === value;
		};
	}
}

function combineFuncs(a, b) {
	return function (elem) {
		return a(elem) || b(elem);
	};
}

exports.getElements = function (options, element, recurse, limit) {
	var funcs = Object.keys(options).map(function (key) {
		var value = options[key];
		return key in Checks ? Checks[key](value) : getAttribCheck(key, value);
	});

	return funcs.length === 0 ? [] : this.filter(funcs.reduce(combineFuncs), element, recurse, limit);
};

exports.getElementById = function (id, element, recurse) {
	if (!Array.isArray(element)) element = [element];
	return this.findOne(getAttribCheck("id", id), element, recurse !== false);
};

exports.getElementsByTagName = function (name, element, recurse, limit) {
	return this.filter(Checks.tag_name(name), element, recurse, limit);
};

exports.getElementsByTagType = function (type, element, recurse, limit) {
	return this.filter(Checks.tag_type(type), element, recurse, limit);
};

},{"domelementtype":9}],16:[function(require,module,exports){
"use strict";

exports.removeElement = function (elem) {
	if (elem.prev) elem.prev.next = elem.next;
	if (elem.next) elem.next.prev = elem.prev;

	if (elem.parent) {
		var childs = elem.parent.children;
		childs.splice(childs.lastIndexOf(elem), 1);
	}
};

exports.replaceElement = function (elem, replacement) {
	var prev = replacement.prev = elem.prev;
	if (prev) {
		prev.next = replacement;
	}

	var next = replacement.next = elem.next;
	if (next) {
		next.prev = replacement;
	}

	var parent = replacement.parent = elem.parent;
	if (parent) {
		var childs = parent.children;
		childs[childs.lastIndexOf(elem)] = replacement;
	}
};

exports.appendChild = function (elem, child) {
	child.parent = elem;

	if (elem.children.push(child) !== 1) {
		var sibling = elem.children[elem.children.length - 2];
		sibling.next = child;
		child.prev = sibling;
		child.next = null;
	}
};

exports.append = function (elem, next) {
	var parent = elem.parent,
	    currNext = elem.next;

	next.next = currNext;
	next.prev = elem;
	elem.next = next;
	next.parent = parent;

	if (currNext) {
		currNext.prev = next;
		if (parent) {
			var childs = parent.children;
			childs.splice(childs.lastIndexOf(currNext), 0, next);
		}
	} else if (parent) {
		parent.children.push(next);
	}
};

exports.prepend = function (elem, prev) {
	var parent = elem.parent;
	if (parent) {
		var childs = parent.children;
		childs.splice(childs.lastIndexOf(elem), 0, prev);
	}

	if (elem.prev) {
		elem.prev.next = prev;
	}

	prev.parent = parent;
	prev.prev = elem.prev;
	prev.next = elem;
	elem.prev = prev;
};

},{}],17:[function(require,module,exports){
"use strict";

var isTag = require("domelementtype").isTag;

module.exports = {
	filter: filter,
	find: find,
	findOneChild: findOneChild,
	findOne: findOne,
	existsOne: existsOne,
	findAll: findAll
};

function filter(test, element, recurse, limit) {
	if (!Array.isArray(element)) element = [element];

	if (typeof limit !== "number" || !isFinite(limit)) {
		limit = Infinity;
	}
	return find(test, element, recurse !== false, limit);
}

function find(test, elems, recurse, limit) {
	var result = [],
	    childs;

	for (var i = 0, j = elems.length; i < j; i++) {
		if (test(elems[i])) {
			result.push(elems[i]);
			if (--limit <= 0) break;
		}

		childs = elems[i].children;
		if (recurse && childs && childs.length > 0) {
			childs = find(test, childs, recurse, limit);
			result = result.concat(childs);
			limit -= childs.length;
			if (limit <= 0) break;
		}
	}

	return result;
}

function findOneChild(test, elems) {
	for (var i = 0, l = elems.length; i < l; i++) {
		if (test(elems[i])) return elems[i];
	}

	return null;
}

function findOne(test, elems) {
	var elem = null;

	for (var i = 0, l = elems.length; i < l && !elem; i++) {
		if (!isTag(elems[i])) {
			continue;
		} else if (test(elems[i])) {
			elem = elems[i];
		} else if (elems[i].children.length > 0) {
			elem = findOne(test, elems[i].children);
		}
	}

	return elem;
}

function existsOne(test, elems) {
	for (var i = 0, l = elems.length; i < l; i++) {
		if (isTag(elems[i]) && (test(elems[i]) || elems[i].children.length > 0 && existsOne(test, elems[i].children))) {
			return true;
		}
	}

	return false;
}

function findAll(test, elems) {
	var result = [];
	for (var i = 0, j = elems.length; i < j; i++) {
		if (!isTag(elems[i])) continue;
		if (test(elems[i])) result.push(elems[i]);

		if (elems[i].children.length > 0) {
			result = result.concat(findAll(test, elems[i].children));
		}
	}
	return result;
}

},{"domelementtype":9}],18:[function(require,module,exports){
"use strict";

var ElementType = require("domelementtype"),
    getOuterHTML = require("dom-serializer"),
    isTag = ElementType.isTag;

module.exports = {
	getInnerHTML: getInnerHTML,
	getOuterHTML: getOuterHTML,
	getText: getText
};

function getInnerHTML(elem, opts) {
	return elem.children ? elem.children.map(function (elem) {
		return getOuterHTML(elem, opts);
	}).join("") : "";
}

function getText(elem) {
	if (Array.isArray(elem)) return elem.map(getText).join("");
	if (isTag(elem) || elem.type === ElementType.CDATA) return getText(elem.children);
	if (elem.type === ElementType.Text) return elem.data;
	return "";
}

},{"dom-serializer":7,"domelementtype":9}],19:[function(require,module,exports){
"use strict";

var getChildren = exports.getChildren = function (elem) {
	return elem.children;
};

var getParent = exports.getParent = function (elem) {
	return elem.parent;
};

exports.getSiblings = function (elem) {
	var parent = getParent(elem);
	return parent ? getChildren(parent) : [elem];
};

exports.getAttributeValue = function (elem, name) {
	return elem.attribs && elem.attribs[name];
};

exports.hasAttrib = function (elem, name) {
	return !!elem.attribs && hasOwnProperty.call(elem.attribs, name);
};

exports.getName = function (elem) {
	return elem.name;
};

},{}],20:[function(require,module,exports){
"use strict";

var encode = require("./lib/encode.js"),
    decode = require("./lib/decode.js");

exports.decode = function (data, level) {
	return (!level || level <= 0 ? decode.XML : decode.HTML)(data);
};

exports.decodeStrict = function (data, level) {
	return (!level || level <= 0 ? decode.XML : decode.HTMLStrict)(data);
};

exports.encode = function (data, level) {
	return (!level || level <= 0 ? encode.XML : encode.HTML)(data);
};

exports.encodeXML = encode.XML;

exports.encodeHTML4 = exports.encodeHTML5 = exports.encodeHTML = encode.HTML;

exports.decodeXML = exports.decodeXMLStrict = decode.XML;

exports.decodeHTML4 = exports.decodeHTML5 = exports.decodeHTML = decode.HTML;

exports.decodeHTML4Strict = exports.decodeHTML5Strict = exports.decodeHTMLStrict = decode.HTMLStrict;

exports.escape = encode.escape;

},{"./lib/decode.js":21,"./lib/encode.js":23}],21:[function(require,module,exports){
"use strict";

var entityMap = require("../maps/entities.json"),
    legacyMap = require("../maps/legacy.json"),
    xmlMap = require("../maps/xml.json"),
    decodeCodePoint = require("./decode_codepoint.js");

var decodeXMLStrict = getStrictDecoder(xmlMap),
    decodeHTMLStrict = getStrictDecoder(entityMap);

function getStrictDecoder(map) {
	var keys = Object.keys(map).join("|"),
	    replace = getReplacer(map);

	keys += "|#[xX][\\da-fA-F]+|#\\d+";

	var re = new RegExp("&(?:" + keys + ");", "g");

	return function (str) {
		return String(str).replace(re, replace);
	};
}

var decodeHTML = function () {
	var legacy = Object.keys(legacyMap).sort(sorter);

	var keys = Object.keys(entityMap).sort(sorter);

	for (var i = 0, j = 0; i < keys.length; i++) {
		if (legacy[j] === keys[i]) {
			keys[i] += ";?";
			j++;
		} else {
			keys[i] += ";";
		}
	}

	var re = new RegExp("&(?:" + keys.join("|") + "|#[xX][\\da-fA-F]+;?|#\\d+;?)", "g"),
	    replace = getReplacer(entityMap);

	function replacer(str) {
		if (str.substr(-1) !== ";") str += ";";
		return replace(str);
	}

	//TODO consider creating a merged map
	return function (str) {
		return String(str).replace(re, replacer);
	};
}();

function sorter(a, b) {
	return a < b ? 1 : -1;
}

function getReplacer(map) {
	return function replace(str) {
		if (str.charAt(1) === "#") {
			if (str.charAt(2) === "X" || str.charAt(2) === "x") {
				return decodeCodePoint(parseInt(str.substr(3), 16));
			}
			return decodeCodePoint(parseInt(str.substr(2), 10));
		}
		return map[str.slice(1, -1)];
	};
}

module.exports = {
	XML: decodeXMLStrict,
	HTML: decodeHTML,
	HTMLStrict: decodeHTMLStrict
};

},{"../maps/entities.json":25,"../maps/legacy.json":26,"../maps/xml.json":27,"./decode_codepoint.js":22}],22:[function(require,module,exports){
"use strict";

var decodeMap = require("../maps/decode.json");

module.exports = decodeCodePoint;

// modified version of https://github.com/mathiasbynens/he/blob/master/src/he.js#L94-L119
function decodeCodePoint(codePoint) {

	if (codePoint >= 0xD800 && codePoint <= 0xDFFF || codePoint > 0x10FFFF) {
		return "\uFFFD";
	}

	if (codePoint in decodeMap) {
		codePoint = decodeMap[codePoint];
	}

	var output = "";

	if (codePoint > 0xFFFF) {
		codePoint -= 0x10000;
		output += String.fromCharCode(codePoint >>> 10 & 0x3FF | 0xD800);
		codePoint = 0xDC00 | codePoint & 0x3FF;
	}

	output += String.fromCharCode(codePoint);
	return output;
}

},{"../maps/decode.json":24}],23:[function(require,module,exports){
"use strict";

var inverseXML = getInverseObj(require("../maps/xml.json")),
    xmlReplacer = getInverseReplacer(inverseXML);

exports.XML = getInverse(inverseXML, xmlReplacer);

var inverseHTML = getInverseObj(require("../maps/entities.json")),
    htmlReplacer = getInverseReplacer(inverseHTML);

exports.HTML = getInverse(inverseHTML, htmlReplacer);

function getInverseObj(obj) {
	return Object.keys(obj).sort().reduce(function (inverse, name) {
		inverse[obj[name]] = "&" + name + ";";
		return inverse;
	}, {});
}

function getInverseReplacer(inverse) {
	var single = [],
	    multiple = [];

	Object.keys(inverse).forEach(function (k) {
		if (k.length === 1) {
			single.push("\\" + k);
		} else {
			multiple.push(k);
		}
	});

	//TODO add ranges
	multiple.unshift("[" + single.join("") + "]");

	return new RegExp(multiple.join("|"), "g");
}

var re_nonASCII = /[^\0-\x7F]/g,
    re_astralSymbols = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;

function singleCharReplacer(c) {
	return "&#x" + c.charCodeAt(0).toString(16).toUpperCase() + ";";
}

function astralReplacer(c) {
	// http://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
	var high = c.charCodeAt(0);
	var low = c.charCodeAt(1);
	var codePoint = (high - 0xD800) * 0x400 + low - 0xDC00 + 0x10000;
	return "&#x" + codePoint.toString(16).toUpperCase() + ";";
}

function getInverse(inverse, re) {
	function func(name) {
		return inverse[name];
	}

	return function (data) {
		return data.replace(re, func).replace(re_astralSymbols, astralReplacer).replace(re_nonASCII, singleCharReplacer);
	};
}

var re_xmlChars = getInverseReplacer(inverseXML);

function escapeXML(data) {
	return data.replace(re_xmlChars, singleCharReplacer).replace(re_astralSymbols, astralReplacer).replace(re_nonASCII, singleCharReplacer);
}

exports.escape = escapeXML;

},{"../maps/entities.json":25,"../maps/xml.json":27}],24:[function(require,module,exports){
module.exports={"0":65533,"128":8364,"130":8218,"131":402,"132":8222,"133":8230,"134":8224,"135":8225,"136":710,"137":8240,"138":352,"139":8249,"140":338,"142":381,"145":8216,"146":8217,"147":8220,"148":8221,"149":8226,"150":8211,"151":8212,"152":732,"153":8482,"154":353,"155":8250,"156":339,"158":382,"159":376}
},{}],25:[function(require,module,exports){
module.exports={"Aacute":"\u00C1","aacute":"\u00E1","Abreve":"\u0102","abreve":"\u0103","ac":"\u223E","acd":"\u223F","acE":"\u223E\u0333","Acirc":"\u00C2","acirc":"\u00E2","acute":"\u00B4","Acy":"\u0410","acy":"\u0430","AElig":"\u00C6","aelig":"\u00E6","af":"\u2061","Afr":"\uD835\uDD04","afr":"\uD835\uDD1E","Agrave":"\u00C0","agrave":"\u00E0","alefsym":"\u2135","aleph":"\u2135","Alpha":"\u0391","alpha":"\u03B1","Amacr":"\u0100","amacr":"\u0101","amalg":"\u2A3F","amp":"&","AMP":"&","andand":"\u2A55","And":"\u2A53","and":"\u2227","andd":"\u2A5C","andslope":"\u2A58","andv":"\u2A5A","ang":"\u2220","ange":"\u29A4","angle":"\u2220","angmsdaa":"\u29A8","angmsdab":"\u29A9","angmsdac":"\u29AA","angmsdad":"\u29AB","angmsdae":"\u29AC","angmsdaf":"\u29AD","angmsdag":"\u29AE","angmsdah":"\u29AF","angmsd":"\u2221","angrt":"\u221F","angrtvb":"\u22BE","angrtvbd":"\u299D","angsph":"\u2222","angst":"\u00C5","angzarr":"\u237C","Aogon":"\u0104","aogon":"\u0105","Aopf":"\uD835\uDD38","aopf":"\uD835\uDD52","apacir":"\u2A6F","ap":"\u2248","apE":"\u2A70","ape":"\u224A","apid":"\u224B","apos":"'","ApplyFunction":"\u2061","approx":"\u2248","approxeq":"\u224A","Aring":"\u00C5","aring":"\u00E5","Ascr":"\uD835\uDC9C","ascr":"\uD835\uDCB6","Assign":"\u2254","ast":"*","asymp":"\u2248","asympeq":"\u224D","Atilde":"\u00C3","atilde":"\u00E3","Auml":"\u00C4","auml":"\u00E4","awconint":"\u2233","awint":"\u2A11","backcong":"\u224C","backepsilon":"\u03F6","backprime":"\u2035","backsim":"\u223D","backsimeq":"\u22CD","Backslash":"\u2216","Barv":"\u2AE7","barvee":"\u22BD","barwed":"\u2305","Barwed":"\u2306","barwedge":"\u2305","bbrk":"\u23B5","bbrktbrk":"\u23B6","bcong":"\u224C","Bcy":"\u0411","bcy":"\u0431","bdquo":"\u201E","becaus":"\u2235","because":"\u2235","Because":"\u2235","bemptyv":"\u29B0","bepsi":"\u03F6","bernou":"\u212C","Bernoullis":"\u212C","Beta":"\u0392","beta":"\u03B2","beth":"\u2136","between":"\u226C","Bfr":"\uD835\uDD05","bfr":"\uD835\uDD1F","bigcap":"\u22C2","bigcirc":"\u25EF","bigcup":"\u22C3","bigodot":"\u2A00","bigoplus":"\u2A01","bigotimes":"\u2A02","bigsqcup":"\u2A06","bigstar":"\u2605","bigtriangledown":"\u25BD","bigtriangleup":"\u25B3","biguplus":"\u2A04","bigvee":"\u22C1","bigwedge":"\u22C0","bkarow":"\u290D","blacklozenge":"\u29EB","blacksquare":"\u25AA","blacktriangle":"\u25B4","blacktriangledown":"\u25BE","blacktriangleleft":"\u25C2","blacktriangleright":"\u25B8","blank":"\u2423","blk12":"\u2592","blk14":"\u2591","blk34":"\u2593","block":"\u2588","bne":"=\u20E5","bnequiv":"\u2261\u20E5","bNot":"\u2AED","bnot":"\u2310","Bopf":"\uD835\uDD39","bopf":"\uD835\uDD53","bot":"\u22A5","bottom":"\u22A5","bowtie":"\u22C8","boxbox":"\u29C9","boxdl":"\u2510","boxdL":"\u2555","boxDl":"\u2556","boxDL":"\u2557","boxdr":"\u250C","boxdR":"\u2552","boxDr":"\u2553","boxDR":"\u2554","boxh":"\u2500","boxH":"\u2550","boxhd":"\u252C","boxHd":"\u2564","boxhD":"\u2565","boxHD":"\u2566","boxhu":"\u2534","boxHu":"\u2567","boxhU":"\u2568","boxHU":"\u2569","boxminus":"\u229F","boxplus":"\u229E","boxtimes":"\u22A0","boxul":"\u2518","boxuL":"\u255B","boxUl":"\u255C","boxUL":"\u255D","boxur":"\u2514","boxuR":"\u2558","boxUr":"\u2559","boxUR":"\u255A","boxv":"\u2502","boxV":"\u2551","boxvh":"\u253C","boxvH":"\u256A","boxVh":"\u256B","boxVH":"\u256C","boxvl":"\u2524","boxvL":"\u2561","boxVl":"\u2562","boxVL":"\u2563","boxvr":"\u251C","boxvR":"\u255E","boxVr":"\u255F","boxVR":"\u2560","bprime":"\u2035","breve":"\u02D8","Breve":"\u02D8","brvbar":"\u00A6","bscr":"\uD835\uDCB7","Bscr":"\u212C","bsemi":"\u204F","bsim":"\u223D","bsime":"\u22CD","bsolb":"\u29C5","bsol":"\\","bsolhsub":"\u27C8","bull":"\u2022","bullet":"\u2022","bump":"\u224E","bumpE":"\u2AAE","bumpe":"\u224F","Bumpeq":"\u224E","bumpeq":"\u224F","Cacute":"\u0106","cacute":"\u0107","capand":"\u2A44","capbrcup":"\u2A49","capcap":"\u2A4B","cap":"\u2229","Cap":"\u22D2","capcup":"\u2A47","capdot":"\u2A40","CapitalDifferentialD":"\u2145","caps":"\u2229\uFE00","caret":"\u2041","caron":"\u02C7","Cayleys":"\u212D","ccaps":"\u2A4D","Ccaron":"\u010C","ccaron":"\u010D","Ccedil":"\u00C7","ccedil":"\u00E7","Ccirc":"\u0108","ccirc":"\u0109","Cconint":"\u2230","ccups":"\u2A4C","ccupssm":"\u2A50","Cdot":"\u010A","cdot":"\u010B","cedil":"\u00B8","Cedilla":"\u00B8","cemptyv":"\u29B2","cent":"\u00A2","centerdot":"\u00B7","CenterDot":"\u00B7","cfr":"\uD835\uDD20","Cfr":"\u212D","CHcy":"\u0427","chcy":"\u0447","check":"\u2713","checkmark":"\u2713","Chi":"\u03A7","chi":"\u03C7","circ":"\u02C6","circeq":"\u2257","circlearrowleft":"\u21BA","circlearrowright":"\u21BB","circledast":"\u229B","circledcirc":"\u229A","circleddash":"\u229D","CircleDot":"\u2299","circledR":"\u00AE","circledS":"\u24C8","CircleMinus":"\u2296","CirclePlus":"\u2295","CircleTimes":"\u2297","cir":"\u25CB","cirE":"\u29C3","cire":"\u2257","cirfnint":"\u2A10","cirmid":"\u2AEF","cirscir":"\u29C2","ClockwiseContourIntegral":"\u2232","CloseCurlyDoubleQuote":"\u201D","CloseCurlyQuote":"\u2019","clubs":"\u2663","clubsuit":"\u2663","colon":":","Colon":"\u2237","Colone":"\u2A74","colone":"\u2254","coloneq":"\u2254","comma":",","commat":"@","comp":"\u2201","compfn":"\u2218","complement":"\u2201","complexes":"\u2102","cong":"\u2245","congdot":"\u2A6D","Congruent":"\u2261","conint":"\u222E","Conint":"\u222F","ContourIntegral":"\u222E","copf":"\uD835\uDD54","Copf":"\u2102","coprod":"\u2210","Coproduct":"\u2210","copy":"\u00A9","COPY":"\u00A9","copysr":"\u2117","CounterClockwiseContourIntegral":"\u2233","crarr":"\u21B5","cross":"\u2717","Cross":"\u2A2F","Cscr":"\uD835\uDC9E","cscr":"\uD835\uDCB8","csub":"\u2ACF","csube":"\u2AD1","csup":"\u2AD0","csupe":"\u2AD2","ctdot":"\u22EF","cudarrl":"\u2938","cudarrr":"\u2935","cuepr":"\u22DE","cuesc":"\u22DF","cularr":"\u21B6","cularrp":"\u293D","cupbrcap":"\u2A48","cupcap":"\u2A46","CupCap":"\u224D","cup":"\u222A","Cup":"\u22D3","cupcup":"\u2A4A","cupdot":"\u228D","cupor":"\u2A45","cups":"\u222A\uFE00","curarr":"\u21B7","curarrm":"\u293C","curlyeqprec":"\u22DE","curlyeqsucc":"\u22DF","curlyvee":"\u22CE","curlywedge":"\u22CF","curren":"\u00A4","curvearrowleft":"\u21B6","curvearrowright":"\u21B7","cuvee":"\u22CE","cuwed":"\u22CF","cwconint":"\u2232","cwint":"\u2231","cylcty":"\u232D","dagger":"\u2020","Dagger":"\u2021","daleth":"\u2138","darr":"\u2193","Darr":"\u21A1","dArr":"\u21D3","dash":"\u2010","Dashv":"\u2AE4","dashv":"\u22A3","dbkarow":"\u290F","dblac":"\u02DD","Dcaron":"\u010E","dcaron":"\u010F","Dcy":"\u0414","dcy":"\u0434","ddagger":"\u2021","ddarr":"\u21CA","DD":"\u2145","dd":"\u2146","DDotrahd":"\u2911","ddotseq":"\u2A77","deg":"\u00B0","Del":"\u2207","Delta":"\u0394","delta":"\u03B4","demptyv":"\u29B1","dfisht":"\u297F","Dfr":"\uD835\uDD07","dfr":"\uD835\uDD21","dHar":"\u2965","dharl":"\u21C3","dharr":"\u21C2","DiacriticalAcute":"\u00B4","DiacriticalDot":"\u02D9","DiacriticalDoubleAcute":"\u02DD","DiacriticalGrave":"`","DiacriticalTilde":"\u02DC","diam":"\u22C4","diamond":"\u22C4","Diamond":"\u22C4","diamondsuit":"\u2666","diams":"\u2666","die":"\u00A8","DifferentialD":"\u2146","digamma":"\u03DD","disin":"\u22F2","div":"\u00F7","divide":"\u00F7","divideontimes":"\u22C7","divonx":"\u22C7","DJcy":"\u0402","djcy":"\u0452","dlcorn":"\u231E","dlcrop":"\u230D","dollar":"$","Dopf":"\uD835\uDD3B","dopf":"\uD835\uDD55","Dot":"\u00A8","dot":"\u02D9","DotDot":"\u20DC","doteq":"\u2250","doteqdot":"\u2251","DotEqual":"\u2250","dotminus":"\u2238","dotplus":"\u2214","dotsquare":"\u22A1","doublebarwedge":"\u2306","DoubleContourIntegral":"\u222F","DoubleDot":"\u00A8","DoubleDownArrow":"\u21D3","DoubleLeftArrow":"\u21D0","DoubleLeftRightArrow":"\u21D4","DoubleLeftTee":"\u2AE4","DoubleLongLeftArrow":"\u27F8","DoubleLongLeftRightArrow":"\u27FA","DoubleLongRightArrow":"\u27F9","DoubleRightArrow":"\u21D2","DoubleRightTee":"\u22A8","DoubleUpArrow":"\u21D1","DoubleUpDownArrow":"\u21D5","DoubleVerticalBar":"\u2225","DownArrowBar":"\u2913","downarrow":"\u2193","DownArrow":"\u2193","Downarrow":"\u21D3","DownArrowUpArrow":"\u21F5","DownBreve":"\u0311","downdownarrows":"\u21CA","downharpoonleft":"\u21C3","downharpoonright":"\u21C2","DownLeftRightVector":"\u2950","DownLeftTeeVector":"\u295E","DownLeftVectorBar":"\u2956","DownLeftVector":"\u21BD","DownRightTeeVector":"\u295F","DownRightVectorBar":"\u2957","DownRightVector":"\u21C1","DownTeeArrow":"\u21A7","DownTee":"\u22A4","drbkarow":"\u2910","drcorn":"\u231F","drcrop":"\u230C","Dscr":"\uD835\uDC9F","dscr":"\uD835\uDCB9","DScy":"\u0405","dscy":"\u0455","dsol":"\u29F6","Dstrok":"\u0110","dstrok":"\u0111","dtdot":"\u22F1","dtri":"\u25BF","dtrif":"\u25BE","duarr":"\u21F5","duhar":"\u296F","dwangle":"\u29A6","DZcy":"\u040F","dzcy":"\u045F","dzigrarr":"\u27FF","Eacute":"\u00C9","eacute":"\u00E9","easter":"\u2A6E","Ecaron":"\u011A","ecaron":"\u011B","Ecirc":"\u00CA","ecirc":"\u00EA","ecir":"\u2256","ecolon":"\u2255","Ecy":"\u042D","ecy":"\u044D","eDDot":"\u2A77","Edot":"\u0116","edot":"\u0117","eDot":"\u2251","ee":"\u2147","efDot":"\u2252","Efr":"\uD835\uDD08","efr":"\uD835\uDD22","eg":"\u2A9A","Egrave":"\u00C8","egrave":"\u00E8","egs":"\u2A96","egsdot":"\u2A98","el":"\u2A99","Element":"\u2208","elinters":"\u23E7","ell":"\u2113","els":"\u2A95","elsdot":"\u2A97","Emacr":"\u0112","emacr":"\u0113","empty":"\u2205","emptyset":"\u2205","EmptySmallSquare":"\u25FB","emptyv":"\u2205","EmptyVerySmallSquare":"\u25AB","emsp13":"\u2004","emsp14":"\u2005","emsp":"\u2003","ENG":"\u014A","eng":"\u014B","ensp":"\u2002","Eogon":"\u0118","eogon":"\u0119","Eopf":"\uD835\uDD3C","eopf":"\uD835\uDD56","epar":"\u22D5","eparsl":"\u29E3","eplus":"\u2A71","epsi":"\u03B5","Epsilon":"\u0395","epsilon":"\u03B5","epsiv":"\u03F5","eqcirc":"\u2256","eqcolon":"\u2255","eqsim":"\u2242","eqslantgtr":"\u2A96","eqslantless":"\u2A95","Equal":"\u2A75","equals":"=","EqualTilde":"\u2242","equest":"\u225F","Equilibrium":"\u21CC","equiv":"\u2261","equivDD":"\u2A78","eqvparsl":"\u29E5","erarr":"\u2971","erDot":"\u2253","escr":"\u212F","Escr":"\u2130","esdot":"\u2250","Esim":"\u2A73","esim":"\u2242","Eta":"\u0397","eta":"\u03B7","ETH":"\u00D0","eth":"\u00F0","Euml":"\u00CB","euml":"\u00EB","euro":"\u20AC","excl":"!","exist":"\u2203","Exists":"\u2203","expectation":"\u2130","exponentiale":"\u2147","ExponentialE":"\u2147","fallingdotseq":"\u2252","Fcy":"\u0424","fcy":"\u0444","female":"\u2640","ffilig":"\uFB03","fflig":"\uFB00","ffllig":"\uFB04","Ffr":"\uD835\uDD09","ffr":"\uD835\uDD23","filig":"\uFB01","FilledSmallSquare":"\u25FC","FilledVerySmallSquare":"\u25AA","fjlig":"fj","flat":"\u266D","fllig":"\uFB02","fltns":"\u25B1","fnof":"\u0192","Fopf":"\uD835\uDD3D","fopf":"\uD835\uDD57","forall":"\u2200","ForAll":"\u2200","fork":"\u22D4","forkv":"\u2AD9","Fouriertrf":"\u2131","fpartint":"\u2A0D","frac12":"\u00BD","frac13":"\u2153","frac14":"\u00BC","frac15":"\u2155","frac16":"\u2159","frac18":"\u215B","frac23":"\u2154","frac25":"\u2156","frac34":"\u00BE","frac35":"\u2157","frac38":"\u215C","frac45":"\u2158","frac56":"\u215A","frac58":"\u215D","frac78":"\u215E","frasl":"\u2044","frown":"\u2322","fscr":"\uD835\uDCBB","Fscr":"\u2131","gacute":"\u01F5","Gamma":"\u0393","gamma":"\u03B3","Gammad":"\u03DC","gammad":"\u03DD","gap":"\u2A86","Gbreve":"\u011E","gbreve":"\u011F","Gcedil":"\u0122","Gcirc":"\u011C","gcirc":"\u011D","Gcy":"\u0413","gcy":"\u0433","Gdot":"\u0120","gdot":"\u0121","ge":"\u2265","gE":"\u2267","gEl":"\u2A8C","gel":"\u22DB","geq":"\u2265","geqq":"\u2267","geqslant":"\u2A7E","gescc":"\u2AA9","ges":"\u2A7E","gesdot":"\u2A80","gesdoto":"\u2A82","gesdotol":"\u2A84","gesl":"\u22DB\uFE00","gesles":"\u2A94","Gfr":"\uD835\uDD0A","gfr":"\uD835\uDD24","gg":"\u226B","Gg":"\u22D9","ggg":"\u22D9","gimel":"\u2137","GJcy":"\u0403","gjcy":"\u0453","gla":"\u2AA5","gl":"\u2277","glE":"\u2A92","glj":"\u2AA4","gnap":"\u2A8A","gnapprox":"\u2A8A","gne":"\u2A88","gnE":"\u2269","gneq":"\u2A88","gneqq":"\u2269","gnsim":"\u22E7","Gopf":"\uD835\uDD3E","gopf":"\uD835\uDD58","grave":"`","GreaterEqual":"\u2265","GreaterEqualLess":"\u22DB","GreaterFullEqual":"\u2267","GreaterGreater":"\u2AA2","GreaterLess":"\u2277","GreaterSlantEqual":"\u2A7E","GreaterTilde":"\u2273","Gscr":"\uD835\uDCA2","gscr":"\u210A","gsim":"\u2273","gsime":"\u2A8E","gsiml":"\u2A90","gtcc":"\u2AA7","gtcir":"\u2A7A","gt":">","GT":">","Gt":"\u226B","gtdot":"\u22D7","gtlPar":"\u2995","gtquest":"\u2A7C","gtrapprox":"\u2A86","gtrarr":"\u2978","gtrdot":"\u22D7","gtreqless":"\u22DB","gtreqqless":"\u2A8C","gtrless":"\u2277","gtrsim":"\u2273","gvertneqq":"\u2269\uFE00","gvnE":"\u2269\uFE00","Hacek":"\u02C7","hairsp":"\u200A","half":"\u00BD","hamilt":"\u210B","HARDcy":"\u042A","hardcy":"\u044A","harrcir":"\u2948","harr":"\u2194","hArr":"\u21D4","harrw":"\u21AD","Hat":"^","hbar":"\u210F","Hcirc":"\u0124","hcirc":"\u0125","hearts":"\u2665","heartsuit":"\u2665","hellip":"\u2026","hercon":"\u22B9","hfr":"\uD835\uDD25","Hfr":"\u210C","HilbertSpace":"\u210B","hksearow":"\u2925","hkswarow":"\u2926","hoarr":"\u21FF","homtht":"\u223B","hookleftarrow":"\u21A9","hookrightarrow":"\u21AA","hopf":"\uD835\uDD59","Hopf":"\u210D","horbar":"\u2015","HorizontalLine":"\u2500","hscr":"\uD835\uDCBD","Hscr":"\u210B","hslash":"\u210F","Hstrok":"\u0126","hstrok":"\u0127","HumpDownHump":"\u224E","HumpEqual":"\u224F","hybull":"\u2043","hyphen":"\u2010","Iacute":"\u00CD","iacute":"\u00ED","ic":"\u2063","Icirc":"\u00CE","icirc":"\u00EE","Icy":"\u0418","icy":"\u0438","Idot":"\u0130","IEcy":"\u0415","iecy":"\u0435","iexcl":"\u00A1","iff":"\u21D4","ifr":"\uD835\uDD26","Ifr":"\u2111","Igrave":"\u00CC","igrave":"\u00EC","ii":"\u2148","iiiint":"\u2A0C","iiint":"\u222D","iinfin":"\u29DC","iiota":"\u2129","IJlig":"\u0132","ijlig":"\u0133","Imacr":"\u012A","imacr":"\u012B","image":"\u2111","ImaginaryI":"\u2148","imagline":"\u2110","imagpart":"\u2111","imath":"\u0131","Im":"\u2111","imof":"\u22B7","imped":"\u01B5","Implies":"\u21D2","incare":"\u2105","in":"\u2208","infin":"\u221E","infintie":"\u29DD","inodot":"\u0131","intcal":"\u22BA","int":"\u222B","Int":"\u222C","integers":"\u2124","Integral":"\u222B","intercal":"\u22BA","Intersection":"\u22C2","intlarhk":"\u2A17","intprod":"\u2A3C","InvisibleComma":"\u2063","InvisibleTimes":"\u2062","IOcy":"\u0401","iocy":"\u0451","Iogon":"\u012E","iogon":"\u012F","Iopf":"\uD835\uDD40","iopf":"\uD835\uDD5A","Iota":"\u0399","iota":"\u03B9","iprod":"\u2A3C","iquest":"\u00BF","iscr":"\uD835\uDCBE","Iscr":"\u2110","isin":"\u2208","isindot":"\u22F5","isinE":"\u22F9","isins":"\u22F4","isinsv":"\u22F3","isinv":"\u2208","it":"\u2062","Itilde":"\u0128","itilde":"\u0129","Iukcy":"\u0406","iukcy":"\u0456","Iuml":"\u00CF","iuml":"\u00EF","Jcirc":"\u0134","jcirc":"\u0135","Jcy":"\u0419","jcy":"\u0439","Jfr":"\uD835\uDD0D","jfr":"\uD835\uDD27","jmath":"\u0237","Jopf":"\uD835\uDD41","jopf":"\uD835\uDD5B","Jscr":"\uD835\uDCA5","jscr":"\uD835\uDCBF","Jsercy":"\u0408","jsercy":"\u0458","Jukcy":"\u0404","jukcy":"\u0454","Kappa":"\u039A","kappa":"\u03BA","kappav":"\u03F0","Kcedil":"\u0136","kcedil":"\u0137","Kcy":"\u041A","kcy":"\u043A","Kfr":"\uD835\uDD0E","kfr":"\uD835\uDD28","kgreen":"\u0138","KHcy":"\u0425","khcy":"\u0445","KJcy":"\u040C","kjcy":"\u045C","Kopf":"\uD835\uDD42","kopf":"\uD835\uDD5C","Kscr":"\uD835\uDCA6","kscr":"\uD835\uDCC0","lAarr":"\u21DA","Lacute":"\u0139","lacute":"\u013A","laemptyv":"\u29B4","lagran":"\u2112","Lambda":"\u039B","lambda":"\u03BB","lang":"\u27E8","Lang":"\u27EA","langd":"\u2991","langle":"\u27E8","lap":"\u2A85","Laplacetrf":"\u2112","laquo":"\u00AB","larrb":"\u21E4","larrbfs":"\u291F","larr":"\u2190","Larr":"\u219E","lArr":"\u21D0","larrfs":"\u291D","larrhk":"\u21A9","larrlp":"\u21AB","larrpl":"\u2939","larrsim":"\u2973","larrtl":"\u21A2","latail":"\u2919","lAtail":"\u291B","lat":"\u2AAB","late":"\u2AAD","lates":"\u2AAD\uFE00","lbarr":"\u290C","lBarr":"\u290E","lbbrk":"\u2772","lbrace":"{","lbrack":"[","lbrke":"\u298B","lbrksld":"\u298F","lbrkslu":"\u298D","Lcaron":"\u013D","lcaron":"\u013E","Lcedil":"\u013B","lcedil":"\u013C","lceil":"\u2308","lcub":"{","Lcy":"\u041B","lcy":"\u043B","ldca":"\u2936","ldquo":"\u201C","ldquor":"\u201E","ldrdhar":"\u2967","ldrushar":"\u294B","ldsh":"\u21B2","le":"\u2264","lE":"\u2266","LeftAngleBracket":"\u27E8","LeftArrowBar":"\u21E4","leftarrow":"\u2190","LeftArrow":"\u2190","Leftarrow":"\u21D0","LeftArrowRightArrow":"\u21C6","leftarrowtail":"\u21A2","LeftCeiling":"\u2308","LeftDoubleBracket":"\u27E6","LeftDownTeeVector":"\u2961","LeftDownVectorBar":"\u2959","LeftDownVector":"\u21C3","LeftFloor":"\u230A","leftharpoondown":"\u21BD","leftharpoonup":"\u21BC","leftleftarrows":"\u21C7","leftrightarrow":"\u2194","LeftRightArrow":"\u2194","Leftrightarrow":"\u21D4","leftrightarrows":"\u21C6","leftrightharpoons":"\u21CB","leftrightsquigarrow":"\u21AD","LeftRightVector":"\u294E","LeftTeeArrow":"\u21A4","LeftTee":"\u22A3","LeftTeeVector":"\u295A","leftthreetimes":"\u22CB","LeftTriangleBar":"\u29CF","LeftTriangle":"\u22B2","LeftTriangleEqual":"\u22B4","LeftUpDownVector":"\u2951","LeftUpTeeVector":"\u2960","LeftUpVectorBar":"\u2958","LeftUpVector":"\u21BF","LeftVectorBar":"\u2952","LeftVector":"\u21BC","lEg":"\u2A8B","leg":"\u22DA","leq":"\u2264","leqq":"\u2266","leqslant":"\u2A7D","lescc":"\u2AA8","les":"\u2A7D","lesdot":"\u2A7F","lesdoto":"\u2A81","lesdotor":"\u2A83","lesg":"\u22DA\uFE00","lesges":"\u2A93","lessapprox":"\u2A85","lessdot":"\u22D6","lesseqgtr":"\u22DA","lesseqqgtr":"\u2A8B","LessEqualGreater":"\u22DA","LessFullEqual":"\u2266","LessGreater":"\u2276","lessgtr":"\u2276","LessLess":"\u2AA1","lesssim":"\u2272","LessSlantEqual":"\u2A7D","LessTilde":"\u2272","lfisht":"\u297C","lfloor":"\u230A","Lfr":"\uD835\uDD0F","lfr":"\uD835\uDD29","lg":"\u2276","lgE":"\u2A91","lHar":"\u2962","lhard":"\u21BD","lharu":"\u21BC","lharul":"\u296A","lhblk":"\u2584","LJcy":"\u0409","ljcy":"\u0459","llarr":"\u21C7","ll":"\u226A","Ll":"\u22D8","llcorner":"\u231E","Lleftarrow":"\u21DA","llhard":"\u296B","lltri":"\u25FA","Lmidot":"\u013F","lmidot":"\u0140","lmoustache":"\u23B0","lmoust":"\u23B0","lnap":"\u2A89","lnapprox":"\u2A89","lne":"\u2A87","lnE":"\u2268","lneq":"\u2A87","lneqq":"\u2268","lnsim":"\u22E6","loang":"\u27EC","loarr":"\u21FD","lobrk":"\u27E6","longleftarrow":"\u27F5","LongLeftArrow":"\u27F5","Longleftarrow":"\u27F8","longleftrightarrow":"\u27F7","LongLeftRightArrow":"\u27F7","Longleftrightarrow":"\u27FA","longmapsto":"\u27FC","longrightarrow":"\u27F6","LongRightArrow":"\u27F6","Longrightarrow":"\u27F9","looparrowleft":"\u21AB","looparrowright":"\u21AC","lopar":"\u2985","Lopf":"\uD835\uDD43","lopf":"\uD835\uDD5D","loplus":"\u2A2D","lotimes":"\u2A34","lowast":"\u2217","lowbar":"_","LowerLeftArrow":"\u2199","LowerRightArrow":"\u2198","loz":"\u25CA","lozenge":"\u25CA","lozf":"\u29EB","lpar":"(","lparlt":"\u2993","lrarr":"\u21C6","lrcorner":"\u231F","lrhar":"\u21CB","lrhard":"\u296D","lrm":"\u200E","lrtri":"\u22BF","lsaquo":"\u2039","lscr":"\uD835\uDCC1","Lscr":"\u2112","lsh":"\u21B0","Lsh":"\u21B0","lsim":"\u2272","lsime":"\u2A8D","lsimg":"\u2A8F","lsqb":"[","lsquo":"\u2018","lsquor":"\u201A","Lstrok":"\u0141","lstrok":"\u0142","ltcc":"\u2AA6","ltcir":"\u2A79","lt":"<","LT":"<","Lt":"\u226A","ltdot":"\u22D6","lthree":"\u22CB","ltimes":"\u22C9","ltlarr":"\u2976","ltquest":"\u2A7B","ltri":"\u25C3","ltrie":"\u22B4","ltrif":"\u25C2","ltrPar":"\u2996","lurdshar":"\u294A","luruhar":"\u2966","lvertneqq":"\u2268\uFE00","lvnE":"\u2268\uFE00","macr":"\u00AF","male":"\u2642","malt":"\u2720","maltese":"\u2720","Map":"\u2905","map":"\u21A6","mapsto":"\u21A6","mapstodown":"\u21A7","mapstoleft":"\u21A4","mapstoup":"\u21A5","marker":"\u25AE","mcomma":"\u2A29","Mcy":"\u041C","mcy":"\u043C","mdash":"\u2014","mDDot":"\u223A","measuredangle":"\u2221","MediumSpace":"\u205F","Mellintrf":"\u2133","Mfr":"\uD835\uDD10","mfr":"\uD835\uDD2A","mho":"\u2127","micro":"\u00B5","midast":"*","midcir":"\u2AF0","mid":"\u2223","middot":"\u00B7","minusb":"\u229F","minus":"\u2212","minusd":"\u2238","minusdu":"\u2A2A","MinusPlus":"\u2213","mlcp":"\u2ADB","mldr":"\u2026","mnplus":"\u2213","models":"\u22A7","Mopf":"\uD835\uDD44","mopf":"\uD835\uDD5E","mp":"\u2213","mscr":"\uD835\uDCC2","Mscr":"\u2133","mstpos":"\u223E","Mu":"\u039C","mu":"\u03BC","multimap":"\u22B8","mumap":"\u22B8","nabla":"\u2207","Nacute":"\u0143","nacute":"\u0144","nang":"\u2220\u20D2","nap":"\u2249","napE":"\u2A70\u0338","napid":"\u224B\u0338","napos":"\u0149","napprox":"\u2249","natural":"\u266E","naturals":"\u2115","natur":"\u266E","nbsp":"\u00A0","nbump":"\u224E\u0338","nbumpe":"\u224F\u0338","ncap":"\u2A43","Ncaron":"\u0147","ncaron":"\u0148","Ncedil":"\u0145","ncedil":"\u0146","ncong":"\u2247","ncongdot":"\u2A6D\u0338","ncup":"\u2A42","Ncy":"\u041D","ncy":"\u043D","ndash":"\u2013","nearhk":"\u2924","nearr":"\u2197","neArr":"\u21D7","nearrow":"\u2197","ne":"\u2260","nedot":"\u2250\u0338","NegativeMediumSpace":"\u200B","NegativeThickSpace":"\u200B","NegativeThinSpace":"\u200B","NegativeVeryThinSpace":"\u200B","nequiv":"\u2262","nesear":"\u2928","nesim":"\u2242\u0338","NestedGreaterGreater":"\u226B","NestedLessLess":"\u226A","NewLine":"\n","nexist":"\u2204","nexists":"\u2204","Nfr":"\uD835\uDD11","nfr":"\uD835\uDD2B","ngE":"\u2267\u0338","nge":"\u2271","ngeq":"\u2271","ngeqq":"\u2267\u0338","ngeqslant":"\u2A7E\u0338","nges":"\u2A7E\u0338","nGg":"\u22D9\u0338","ngsim":"\u2275","nGt":"\u226B\u20D2","ngt":"\u226F","ngtr":"\u226F","nGtv":"\u226B\u0338","nharr":"\u21AE","nhArr":"\u21CE","nhpar":"\u2AF2","ni":"\u220B","nis":"\u22FC","nisd":"\u22FA","niv":"\u220B","NJcy":"\u040A","njcy":"\u045A","nlarr":"\u219A","nlArr":"\u21CD","nldr":"\u2025","nlE":"\u2266\u0338","nle":"\u2270","nleftarrow":"\u219A","nLeftarrow":"\u21CD","nleftrightarrow":"\u21AE","nLeftrightarrow":"\u21CE","nleq":"\u2270","nleqq":"\u2266\u0338","nleqslant":"\u2A7D\u0338","nles":"\u2A7D\u0338","nless":"\u226E","nLl":"\u22D8\u0338","nlsim":"\u2274","nLt":"\u226A\u20D2","nlt":"\u226E","nltri":"\u22EA","nltrie":"\u22EC","nLtv":"\u226A\u0338","nmid":"\u2224","NoBreak":"\u2060","NonBreakingSpace":"\u00A0","nopf":"\uD835\uDD5F","Nopf":"\u2115","Not":"\u2AEC","not":"\u00AC","NotCongruent":"\u2262","NotCupCap":"\u226D","NotDoubleVerticalBar":"\u2226","NotElement":"\u2209","NotEqual":"\u2260","NotEqualTilde":"\u2242\u0338","NotExists":"\u2204","NotGreater":"\u226F","NotGreaterEqual":"\u2271","NotGreaterFullEqual":"\u2267\u0338","NotGreaterGreater":"\u226B\u0338","NotGreaterLess":"\u2279","NotGreaterSlantEqual":"\u2A7E\u0338","NotGreaterTilde":"\u2275","NotHumpDownHump":"\u224E\u0338","NotHumpEqual":"\u224F\u0338","notin":"\u2209","notindot":"\u22F5\u0338","notinE":"\u22F9\u0338","notinva":"\u2209","notinvb":"\u22F7","notinvc":"\u22F6","NotLeftTriangleBar":"\u29CF\u0338","NotLeftTriangle":"\u22EA","NotLeftTriangleEqual":"\u22EC","NotLess":"\u226E","NotLessEqual":"\u2270","NotLessGreater":"\u2278","NotLessLess":"\u226A\u0338","NotLessSlantEqual":"\u2A7D\u0338","NotLessTilde":"\u2274","NotNestedGreaterGreater":"\u2AA2\u0338","NotNestedLessLess":"\u2AA1\u0338","notni":"\u220C","notniva":"\u220C","notnivb":"\u22FE","notnivc":"\u22FD","NotPrecedes":"\u2280","NotPrecedesEqual":"\u2AAF\u0338","NotPrecedesSlantEqual":"\u22E0","NotReverseElement":"\u220C","NotRightTriangleBar":"\u29D0\u0338","NotRightTriangle":"\u22EB","NotRightTriangleEqual":"\u22ED","NotSquareSubset":"\u228F\u0338","NotSquareSubsetEqual":"\u22E2","NotSquareSuperset":"\u2290\u0338","NotSquareSupersetEqual":"\u22E3","NotSubset":"\u2282\u20D2","NotSubsetEqual":"\u2288","NotSucceeds":"\u2281","NotSucceedsEqual":"\u2AB0\u0338","NotSucceedsSlantEqual":"\u22E1","NotSucceedsTilde":"\u227F\u0338","NotSuperset":"\u2283\u20D2","NotSupersetEqual":"\u2289","NotTilde":"\u2241","NotTildeEqual":"\u2244","NotTildeFullEqual":"\u2247","NotTildeTilde":"\u2249","NotVerticalBar":"\u2224","nparallel":"\u2226","npar":"\u2226","nparsl":"\u2AFD\u20E5","npart":"\u2202\u0338","npolint":"\u2A14","npr":"\u2280","nprcue":"\u22E0","nprec":"\u2280","npreceq":"\u2AAF\u0338","npre":"\u2AAF\u0338","nrarrc":"\u2933\u0338","nrarr":"\u219B","nrArr":"\u21CF","nrarrw":"\u219D\u0338","nrightarrow":"\u219B","nRightarrow":"\u21CF","nrtri":"\u22EB","nrtrie":"\u22ED","nsc":"\u2281","nsccue":"\u22E1","nsce":"\u2AB0\u0338","Nscr":"\uD835\uDCA9","nscr":"\uD835\uDCC3","nshortmid":"\u2224","nshortparallel":"\u2226","nsim":"\u2241","nsime":"\u2244","nsimeq":"\u2244","nsmid":"\u2224","nspar":"\u2226","nsqsube":"\u22E2","nsqsupe":"\u22E3","nsub":"\u2284","nsubE":"\u2AC5\u0338","nsube":"\u2288","nsubset":"\u2282\u20D2","nsubseteq":"\u2288","nsubseteqq":"\u2AC5\u0338","nsucc":"\u2281","nsucceq":"\u2AB0\u0338","nsup":"\u2285","nsupE":"\u2AC6\u0338","nsupe":"\u2289","nsupset":"\u2283\u20D2","nsupseteq":"\u2289","nsupseteqq":"\u2AC6\u0338","ntgl":"\u2279","Ntilde":"\u00D1","ntilde":"\u00F1","ntlg":"\u2278","ntriangleleft":"\u22EA","ntrianglelefteq":"\u22EC","ntriangleright":"\u22EB","ntrianglerighteq":"\u22ED","Nu":"\u039D","nu":"\u03BD","num":"#","numero":"\u2116","numsp":"\u2007","nvap":"\u224D\u20D2","nvdash":"\u22AC","nvDash":"\u22AD","nVdash":"\u22AE","nVDash":"\u22AF","nvge":"\u2265\u20D2","nvgt":">\u20D2","nvHarr":"\u2904","nvinfin":"\u29DE","nvlArr":"\u2902","nvle":"\u2264\u20D2","nvlt":"<\u20D2","nvltrie":"\u22B4\u20D2","nvrArr":"\u2903","nvrtrie":"\u22B5\u20D2","nvsim":"\u223C\u20D2","nwarhk":"\u2923","nwarr":"\u2196","nwArr":"\u21D6","nwarrow":"\u2196","nwnear":"\u2927","Oacute":"\u00D3","oacute":"\u00F3","oast":"\u229B","Ocirc":"\u00D4","ocirc":"\u00F4","ocir":"\u229A","Ocy":"\u041E","ocy":"\u043E","odash":"\u229D","Odblac":"\u0150","odblac":"\u0151","odiv":"\u2A38","odot":"\u2299","odsold":"\u29BC","OElig":"\u0152","oelig":"\u0153","ofcir":"\u29BF","Ofr":"\uD835\uDD12","ofr":"\uD835\uDD2C","ogon":"\u02DB","Ograve":"\u00D2","ograve":"\u00F2","ogt":"\u29C1","ohbar":"\u29B5","ohm":"\u03A9","oint":"\u222E","olarr":"\u21BA","olcir":"\u29BE","olcross":"\u29BB","oline":"\u203E","olt":"\u29C0","Omacr":"\u014C","omacr":"\u014D","Omega":"\u03A9","omega":"\u03C9","Omicron":"\u039F","omicron":"\u03BF","omid":"\u29B6","ominus":"\u2296","Oopf":"\uD835\uDD46","oopf":"\uD835\uDD60","opar":"\u29B7","OpenCurlyDoubleQuote":"\u201C","OpenCurlyQuote":"\u2018","operp":"\u29B9","oplus":"\u2295","orarr":"\u21BB","Or":"\u2A54","or":"\u2228","ord":"\u2A5D","order":"\u2134","orderof":"\u2134","ordf":"\u00AA","ordm":"\u00BA","origof":"\u22B6","oror":"\u2A56","orslope":"\u2A57","orv":"\u2A5B","oS":"\u24C8","Oscr":"\uD835\uDCAA","oscr":"\u2134","Oslash":"\u00D8","oslash":"\u00F8","osol":"\u2298","Otilde":"\u00D5","otilde":"\u00F5","otimesas":"\u2A36","Otimes":"\u2A37","otimes":"\u2297","Ouml":"\u00D6","ouml":"\u00F6","ovbar":"\u233D","OverBar":"\u203E","OverBrace":"\u23DE","OverBracket":"\u23B4","OverParenthesis":"\u23DC","para":"\u00B6","parallel":"\u2225","par":"\u2225","parsim":"\u2AF3","parsl":"\u2AFD","part":"\u2202","PartialD":"\u2202","Pcy":"\u041F","pcy":"\u043F","percnt":"%","period":".","permil":"\u2030","perp":"\u22A5","pertenk":"\u2031","Pfr":"\uD835\uDD13","pfr":"\uD835\uDD2D","Phi":"\u03A6","phi":"\u03C6","phiv":"\u03D5","phmmat":"\u2133","phone":"\u260E","Pi":"\u03A0","pi":"\u03C0","pitchfork":"\u22D4","piv":"\u03D6","planck":"\u210F","planckh":"\u210E","plankv":"\u210F","plusacir":"\u2A23","plusb":"\u229E","pluscir":"\u2A22","plus":"+","plusdo":"\u2214","plusdu":"\u2A25","pluse":"\u2A72","PlusMinus":"\u00B1","plusmn":"\u00B1","plussim":"\u2A26","plustwo":"\u2A27","pm":"\u00B1","Poincareplane":"\u210C","pointint":"\u2A15","popf":"\uD835\uDD61","Popf":"\u2119","pound":"\u00A3","prap":"\u2AB7","Pr":"\u2ABB","pr":"\u227A","prcue":"\u227C","precapprox":"\u2AB7","prec":"\u227A","preccurlyeq":"\u227C","Precedes":"\u227A","PrecedesEqual":"\u2AAF","PrecedesSlantEqual":"\u227C","PrecedesTilde":"\u227E","preceq":"\u2AAF","precnapprox":"\u2AB9","precneqq":"\u2AB5","precnsim":"\u22E8","pre":"\u2AAF","prE":"\u2AB3","precsim":"\u227E","prime":"\u2032","Prime":"\u2033","primes":"\u2119","prnap":"\u2AB9","prnE":"\u2AB5","prnsim":"\u22E8","prod":"\u220F","Product":"\u220F","profalar":"\u232E","profline":"\u2312","profsurf":"\u2313","prop":"\u221D","Proportional":"\u221D","Proportion":"\u2237","propto":"\u221D","prsim":"\u227E","prurel":"\u22B0","Pscr":"\uD835\uDCAB","pscr":"\uD835\uDCC5","Psi":"\u03A8","psi":"\u03C8","puncsp":"\u2008","Qfr":"\uD835\uDD14","qfr":"\uD835\uDD2E","qint":"\u2A0C","qopf":"\uD835\uDD62","Qopf":"\u211A","qprime":"\u2057","Qscr":"\uD835\uDCAC","qscr":"\uD835\uDCC6","quaternions":"\u210D","quatint":"\u2A16","quest":"?","questeq":"\u225F","quot":"\"","QUOT":"\"","rAarr":"\u21DB","race":"\u223D\u0331","Racute":"\u0154","racute":"\u0155","radic":"\u221A","raemptyv":"\u29B3","rang":"\u27E9","Rang":"\u27EB","rangd":"\u2992","range":"\u29A5","rangle":"\u27E9","raquo":"\u00BB","rarrap":"\u2975","rarrb":"\u21E5","rarrbfs":"\u2920","rarrc":"\u2933","rarr":"\u2192","Rarr":"\u21A0","rArr":"\u21D2","rarrfs":"\u291E","rarrhk":"\u21AA","rarrlp":"\u21AC","rarrpl":"\u2945","rarrsim":"\u2974","Rarrtl":"\u2916","rarrtl":"\u21A3","rarrw":"\u219D","ratail":"\u291A","rAtail":"\u291C","ratio":"\u2236","rationals":"\u211A","rbarr":"\u290D","rBarr":"\u290F","RBarr":"\u2910","rbbrk":"\u2773","rbrace":"}","rbrack":"]","rbrke":"\u298C","rbrksld":"\u298E","rbrkslu":"\u2990","Rcaron":"\u0158","rcaron":"\u0159","Rcedil":"\u0156","rcedil":"\u0157","rceil":"\u2309","rcub":"}","Rcy":"\u0420","rcy":"\u0440","rdca":"\u2937","rdldhar":"\u2969","rdquo":"\u201D","rdquor":"\u201D","rdsh":"\u21B3","real":"\u211C","realine":"\u211B","realpart":"\u211C","reals":"\u211D","Re":"\u211C","rect":"\u25AD","reg":"\u00AE","REG":"\u00AE","ReverseElement":"\u220B","ReverseEquilibrium":"\u21CB","ReverseUpEquilibrium":"\u296F","rfisht":"\u297D","rfloor":"\u230B","rfr":"\uD835\uDD2F","Rfr":"\u211C","rHar":"\u2964","rhard":"\u21C1","rharu":"\u21C0","rharul":"\u296C","Rho":"\u03A1","rho":"\u03C1","rhov":"\u03F1","RightAngleBracket":"\u27E9","RightArrowBar":"\u21E5","rightarrow":"\u2192","RightArrow":"\u2192","Rightarrow":"\u21D2","RightArrowLeftArrow":"\u21C4","rightarrowtail":"\u21A3","RightCeiling":"\u2309","RightDoubleBracket":"\u27E7","RightDownTeeVector":"\u295D","RightDownVectorBar":"\u2955","RightDownVector":"\u21C2","RightFloor":"\u230B","rightharpoondown":"\u21C1","rightharpoonup":"\u21C0","rightleftarrows":"\u21C4","rightleftharpoons":"\u21CC","rightrightarrows":"\u21C9","rightsquigarrow":"\u219D","RightTeeArrow":"\u21A6","RightTee":"\u22A2","RightTeeVector":"\u295B","rightthreetimes":"\u22CC","RightTriangleBar":"\u29D0","RightTriangle":"\u22B3","RightTriangleEqual":"\u22B5","RightUpDownVector":"\u294F","RightUpTeeVector":"\u295C","RightUpVectorBar":"\u2954","RightUpVector":"\u21BE","RightVectorBar":"\u2953","RightVector":"\u21C0","ring":"\u02DA","risingdotseq":"\u2253","rlarr":"\u21C4","rlhar":"\u21CC","rlm":"\u200F","rmoustache":"\u23B1","rmoust":"\u23B1","rnmid":"\u2AEE","roang":"\u27ED","roarr":"\u21FE","robrk":"\u27E7","ropar":"\u2986","ropf":"\uD835\uDD63","Ropf":"\u211D","roplus":"\u2A2E","rotimes":"\u2A35","RoundImplies":"\u2970","rpar":")","rpargt":"\u2994","rppolint":"\u2A12","rrarr":"\u21C9","Rrightarrow":"\u21DB","rsaquo":"\u203A","rscr":"\uD835\uDCC7","Rscr":"\u211B","rsh":"\u21B1","Rsh":"\u21B1","rsqb":"]","rsquo":"\u2019","rsquor":"\u2019","rthree":"\u22CC","rtimes":"\u22CA","rtri":"\u25B9","rtrie":"\u22B5","rtrif":"\u25B8","rtriltri":"\u29CE","RuleDelayed":"\u29F4","ruluhar":"\u2968","rx":"\u211E","Sacute":"\u015A","sacute":"\u015B","sbquo":"\u201A","scap":"\u2AB8","Scaron":"\u0160","scaron":"\u0161","Sc":"\u2ABC","sc":"\u227B","sccue":"\u227D","sce":"\u2AB0","scE":"\u2AB4","Scedil":"\u015E","scedil":"\u015F","Scirc":"\u015C","scirc":"\u015D","scnap":"\u2ABA","scnE":"\u2AB6","scnsim":"\u22E9","scpolint":"\u2A13","scsim":"\u227F","Scy":"\u0421","scy":"\u0441","sdotb":"\u22A1","sdot":"\u22C5","sdote":"\u2A66","searhk":"\u2925","searr":"\u2198","seArr":"\u21D8","searrow":"\u2198","sect":"\u00A7","semi":";","seswar":"\u2929","setminus":"\u2216","setmn":"\u2216","sext":"\u2736","Sfr":"\uD835\uDD16","sfr":"\uD835\uDD30","sfrown":"\u2322","sharp":"\u266F","SHCHcy":"\u0429","shchcy":"\u0449","SHcy":"\u0428","shcy":"\u0448","ShortDownArrow":"\u2193","ShortLeftArrow":"\u2190","shortmid":"\u2223","shortparallel":"\u2225","ShortRightArrow":"\u2192","ShortUpArrow":"\u2191","shy":"\u00AD","Sigma":"\u03A3","sigma":"\u03C3","sigmaf":"\u03C2","sigmav":"\u03C2","sim":"\u223C","simdot":"\u2A6A","sime":"\u2243","simeq":"\u2243","simg":"\u2A9E","simgE":"\u2AA0","siml":"\u2A9D","simlE":"\u2A9F","simne":"\u2246","simplus":"\u2A24","simrarr":"\u2972","slarr":"\u2190","SmallCircle":"\u2218","smallsetminus":"\u2216","smashp":"\u2A33","smeparsl":"\u29E4","smid":"\u2223","smile":"\u2323","smt":"\u2AAA","smte":"\u2AAC","smtes":"\u2AAC\uFE00","SOFTcy":"\u042C","softcy":"\u044C","solbar":"\u233F","solb":"\u29C4","sol":"/","Sopf":"\uD835\uDD4A","sopf":"\uD835\uDD64","spades":"\u2660","spadesuit":"\u2660","spar":"\u2225","sqcap":"\u2293","sqcaps":"\u2293\uFE00","sqcup":"\u2294","sqcups":"\u2294\uFE00","Sqrt":"\u221A","sqsub":"\u228F","sqsube":"\u2291","sqsubset":"\u228F","sqsubseteq":"\u2291","sqsup":"\u2290","sqsupe":"\u2292","sqsupset":"\u2290","sqsupseteq":"\u2292","square":"\u25A1","Square":"\u25A1","SquareIntersection":"\u2293","SquareSubset":"\u228F","SquareSubsetEqual":"\u2291","SquareSuperset":"\u2290","SquareSupersetEqual":"\u2292","SquareUnion":"\u2294","squarf":"\u25AA","squ":"\u25A1","squf":"\u25AA","srarr":"\u2192","Sscr":"\uD835\uDCAE","sscr":"\uD835\uDCC8","ssetmn":"\u2216","ssmile":"\u2323","sstarf":"\u22C6","Star":"\u22C6","star":"\u2606","starf":"\u2605","straightepsilon":"\u03F5","straightphi":"\u03D5","strns":"\u00AF","sub":"\u2282","Sub":"\u22D0","subdot":"\u2ABD","subE":"\u2AC5","sube":"\u2286","subedot":"\u2AC3","submult":"\u2AC1","subnE":"\u2ACB","subne":"\u228A","subplus":"\u2ABF","subrarr":"\u2979","subset":"\u2282","Subset":"\u22D0","subseteq":"\u2286","subseteqq":"\u2AC5","SubsetEqual":"\u2286","subsetneq":"\u228A","subsetneqq":"\u2ACB","subsim":"\u2AC7","subsub":"\u2AD5","subsup":"\u2AD3","succapprox":"\u2AB8","succ":"\u227B","succcurlyeq":"\u227D","Succeeds":"\u227B","SucceedsEqual":"\u2AB0","SucceedsSlantEqual":"\u227D","SucceedsTilde":"\u227F","succeq":"\u2AB0","succnapprox":"\u2ABA","succneqq":"\u2AB6","succnsim":"\u22E9","succsim":"\u227F","SuchThat":"\u220B","sum":"\u2211","Sum":"\u2211","sung":"\u266A","sup1":"\u00B9","sup2":"\u00B2","sup3":"\u00B3","sup":"\u2283","Sup":"\u22D1","supdot":"\u2ABE","supdsub":"\u2AD8","supE":"\u2AC6","supe":"\u2287","supedot":"\u2AC4","Superset":"\u2283","SupersetEqual":"\u2287","suphsol":"\u27C9","suphsub":"\u2AD7","suplarr":"\u297B","supmult":"\u2AC2","supnE":"\u2ACC","supne":"\u228B","supplus":"\u2AC0","supset":"\u2283","Supset":"\u22D1","supseteq":"\u2287","supseteqq":"\u2AC6","supsetneq":"\u228B","supsetneqq":"\u2ACC","supsim":"\u2AC8","supsub":"\u2AD4","supsup":"\u2AD6","swarhk":"\u2926","swarr":"\u2199","swArr":"\u21D9","swarrow":"\u2199","swnwar":"\u292A","szlig":"\u00DF","Tab":"\t","target":"\u2316","Tau":"\u03A4","tau":"\u03C4","tbrk":"\u23B4","Tcaron":"\u0164","tcaron":"\u0165","Tcedil":"\u0162","tcedil":"\u0163","Tcy":"\u0422","tcy":"\u0442","tdot":"\u20DB","telrec":"\u2315","Tfr":"\uD835\uDD17","tfr":"\uD835\uDD31","there4":"\u2234","therefore":"\u2234","Therefore":"\u2234","Theta":"\u0398","theta":"\u03B8","thetasym":"\u03D1","thetav":"\u03D1","thickapprox":"\u2248","thicksim":"\u223C","ThickSpace":"\u205F\u200A","ThinSpace":"\u2009","thinsp":"\u2009","thkap":"\u2248","thksim":"\u223C","THORN":"\u00DE","thorn":"\u00FE","tilde":"\u02DC","Tilde":"\u223C","TildeEqual":"\u2243","TildeFullEqual":"\u2245","TildeTilde":"\u2248","timesbar":"\u2A31","timesb":"\u22A0","times":"\u00D7","timesd":"\u2A30","tint":"\u222D","toea":"\u2928","topbot":"\u2336","topcir":"\u2AF1","top":"\u22A4","Topf":"\uD835\uDD4B","topf":"\uD835\uDD65","topfork":"\u2ADA","tosa":"\u2929","tprime":"\u2034","trade":"\u2122","TRADE":"\u2122","triangle":"\u25B5","triangledown":"\u25BF","triangleleft":"\u25C3","trianglelefteq":"\u22B4","triangleq":"\u225C","triangleright":"\u25B9","trianglerighteq":"\u22B5","tridot":"\u25EC","trie":"\u225C","triminus":"\u2A3A","TripleDot":"\u20DB","triplus":"\u2A39","trisb":"\u29CD","tritime":"\u2A3B","trpezium":"\u23E2","Tscr":"\uD835\uDCAF","tscr":"\uD835\uDCC9","TScy":"\u0426","tscy":"\u0446","TSHcy":"\u040B","tshcy":"\u045B","Tstrok":"\u0166","tstrok":"\u0167","twixt":"\u226C","twoheadleftarrow":"\u219E","twoheadrightarrow":"\u21A0","Uacute":"\u00DA","uacute":"\u00FA","uarr":"\u2191","Uarr":"\u219F","uArr":"\u21D1","Uarrocir":"\u2949","Ubrcy":"\u040E","ubrcy":"\u045E","Ubreve":"\u016C","ubreve":"\u016D","Ucirc":"\u00DB","ucirc":"\u00FB","Ucy":"\u0423","ucy":"\u0443","udarr":"\u21C5","Udblac":"\u0170","udblac":"\u0171","udhar":"\u296E","ufisht":"\u297E","Ufr":"\uD835\uDD18","ufr":"\uD835\uDD32","Ugrave":"\u00D9","ugrave":"\u00F9","uHar":"\u2963","uharl":"\u21BF","uharr":"\u21BE","uhblk":"\u2580","ulcorn":"\u231C","ulcorner":"\u231C","ulcrop":"\u230F","ultri":"\u25F8","Umacr":"\u016A","umacr":"\u016B","uml":"\u00A8","UnderBar":"_","UnderBrace":"\u23DF","UnderBracket":"\u23B5","UnderParenthesis":"\u23DD","Union":"\u22C3","UnionPlus":"\u228E","Uogon":"\u0172","uogon":"\u0173","Uopf":"\uD835\uDD4C","uopf":"\uD835\uDD66","UpArrowBar":"\u2912","uparrow":"\u2191","UpArrow":"\u2191","Uparrow":"\u21D1","UpArrowDownArrow":"\u21C5","updownarrow":"\u2195","UpDownArrow":"\u2195","Updownarrow":"\u21D5","UpEquilibrium":"\u296E","upharpoonleft":"\u21BF","upharpoonright":"\u21BE","uplus":"\u228E","UpperLeftArrow":"\u2196","UpperRightArrow":"\u2197","upsi":"\u03C5","Upsi":"\u03D2","upsih":"\u03D2","Upsilon":"\u03A5","upsilon":"\u03C5","UpTeeArrow":"\u21A5","UpTee":"\u22A5","upuparrows":"\u21C8","urcorn":"\u231D","urcorner":"\u231D","urcrop":"\u230E","Uring":"\u016E","uring":"\u016F","urtri":"\u25F9","Uscr":"\uD835\uDCB0","uscr":"\uD835\uDCCA","utdot":"\u22F0","Utilde":"\u0168","utilde":"\u0169","utri":"\u25B5","utrif":"\u25B4","uuarr":"\u21C8","Uuml":"\u00DC","uuml":"\u00FC","uwangle":"\u29A7","vangrt":"\u299C","varepsilon":"\u03F5","varkappa":"\u03F0","varnothing":"\u2205","varphi":"\u03D5","varpi":"\u03D6","varpropto":"\u221D","varr":"\u2195","vArr":"\u21D5","varrho":"\u03F1","varsigma":"\u03C2","varsubsetneq":"\u228A\uFE00","varsubsetneqq":"\u2ACB\uFE00","varsupsetneq":"\u228B\uFE00","varsupsetneqq":"\u2ACC\uFE00","vartheta":"\u03D1","vartriangleleft":"\u22B2","vartriangleright":"\u22B3","vBar":"\u2AE8","Vbar":"\u2AEB","vBarv":"\u2AE9","Vcy":"\u0412","vcy":"\u0432","vdash":"\u22A2","vDash":"\u22A8","Vdash":"\u22A9","VDash":"\u22AB","Vdashl":"\u2AE6","veebar":"\u22BB","vee":"\u2228","Vee":"\u22C1","veeeq":"\u225A","vellip":"\u22EE","verbar":"|","Verbar":"\u2016","vert":"|","Vert":"\u2016","VerticalBar":"\u2223","VerticalLine":"|","VerticalSeparator":"\u2758","VerticalTilde":"\u2240","VeryThinSpace":"\u200A","Vfr":"\uD835\uDD19","vfr":"\uD835\uDD33","vltri":"\u22B2","vnsub":"\u2282\u20D2","vnsup":"\u2283\u20D2","Vopf":"\uD835\uDD4D","vopf":"\uD835\uDD67","vprop":"\u221D","vrtri":"\u22B3","Vscr":"\uD835\uDCB1","vscr":"\uD835\uDCCB","vsubnE":"\u2ACB\uFE00","vsubne":"\u228A\uFE00","vsupnE":"\u2ACC\uFE00","vsupne":"\u228B\uFE00","Vvdash":"\u22AA","vzigzag":"\u299A","Wcirc":"\u0174","wcirc":"\u0175","wedbar":"\u2A5F","wedge":"\u2227","Wedge":"\u22C0","wedgeq":"\u2259","weierp":"\u2118","Wfr":"\uD835\uDD1A","wfr":"\uD835\uDD34","Wopf":"\uD835\uDD4E","wopf":"\uD835\uDD68","wp":"\u2118","wr":"\u2240","wreath":"\u2240","Wscr":"\uD835\uDCB2","wscr":"\uD835\uDCCC","xcap":"\u22C2","xcirc":"\u25EF","xcup":"\u22C3","xdtri":"\u25BD","Xfr":"\uD835\uDD1B","xfr":"\uD835\uDD35","xharr":"\u27F7","xhArr":"\u27FA","Xi":"\u039E","xi":"\u03BE","xlarr":"\u27F5","xlArr":"\u27F8","xmap":"\u27FC","xnis":"\u22FB","xodot":"\u2A00","Xopf":"\uD835\uDD4F","xopf":"\uD835\uDD69","xoplus":"\u2A01","xotime":"\u2A02","xrarr":"\u27F6","xrArr":"\u27F9","Xscr":"\uD835\uDCB3","xscr":"\uD835\uDCCD","xsqcup":"\u2A06","xuplus":"\u2A04","xutri":"\u25B3","xvee":"\u22C1","xwedge":"\u22C0","Yacute":"\u00DD","yacute":"\u00FD","YAcy":"\u042F","yacy":"\u044F","Ycirc":"\u0176","ycirc":"\u0177","Ycy":"\u042B","ycy":"\u044B","yen":"\u00A5","Yfr":"\uD835\uDD1C","yfr":"\uD835\uDD36","YIcy":"\u0407","yicy":"\u0457","Yopf":"\uD835\uDD50","yopf":"\uD835\uDD6A","Yscr":"\uD835\uDCB4","yscr":"\uD835\uDCCE","YUcy":"\u042E","yucy":"\u044E","yuml":"\u00FF","Yuml":"\u0178","Zacute":"\u0179","zacute":"\u017A","Zcaron":"\u017D","zcaron":"\u017E","Zcy":"\u0417","zcy":"\u0437","Zdot":"\u017B","zdot":"\u017C","zeetrf":"\u2128","ZeroWidthSpace":"\u200B","Zeta":"\u0396","zeta":"\u03B6","zfr":"\uD835\uDD37","Zfr":"\u2128","ZHcy":"\u0416","zhcy":"\u0436","zigrarr":"\u21DD","zopf":"\uD835\uDD6B","Zopf":"\u2124","Zscr":"\uD835\uDCB5","zscr":"\uD835\uDCCF","zwj":"\u200D","zwnj":"\u200C"}
},{}],26:[function(require,module,exports){
module.exports={"Aacute":"\u00C1","aacute":"\u00E1","Acirc":"\u00C2","acirc":"\u00E2","acute":"\u00B4","AElig":"\u00C6","aelig":"\u00E6","Agrave":"\u00C0","agrave":"\u00E0","amp":"&","AMP":"&","Aring":"\u00C5","aring":"\u00E5","Atilde":"\u00C3","atilde":"\u00E3","Auml":"\u00C4","auml":"\u00E4","brvbar":"\u00A6","Ccedil":"\u00C7","ccedil":"\u00E7","cedil":"\u00B8","cent":"\u00A2","copy":"\u00A9","COPY":"\u00A9","curren":"\u00A4","deg":"\u00B0","divide":"\u00F7","Eacute":"\u00C9","eacute":"\u00E9","Ecirc":"\u00CA","ecirc":"\u00EA","Egrave":"\u00C8","egrave":"\u00E8","ETH":"\u00D0","eth":"\u00F0","Euml":"\u00CB","euml":"\u00EB","frac12":"\u00BD","frac14":"\u00BC","frac34":"\u00BE","gt":">","GT":">","Iacute":"\u00CD","iacute":"\u00ED","Icirc":"\u00CE","icirc":"\u00EE","iexcl":"\u00A1","Igrave":"\u00CC","igrave":"\u00EC","iquest":"\u00BF","Iuml":"\u00CF","iuml":"\u00EF","laquo":"\u00AB","lt":"<","LT":"<","macr":"\u00AF","micro":"\u00B5","middot":"\u00B7","nbsp":"\u00A0","not":"\u00AC","Ntilde":"\u00D1","ntilde":"\u00F1","Oacute":"\u00D3","oacute":"\u00F3","Ocirc":"\u00D4","ocirc":"\u00F4","Ograve":"\u00D2","ograve":"\u00F2","ordf":"\u00AA","ordm":"\u00BA","Oslash":"\u00D8","oslash":"\u00F8","Otilde":"\u00D5","otilde":"\u00F5","Ouml":"\u00D6","ouml":"\u00F6","para":"\u00B6","plusmn":"\u00B1","pound":"\u00A3","quot":"\"","QUOT":"\"","raquo":"\u00BB","reg":"\u00AE","REG":"\u00AE","sect":"\u00A7","shy":"\u00AD","sup1":"\u00B9","sup2":"\u00B2","sup3":"\u00B3","szlig":"\u00DF","THORN":"\u00DE","thorn":"\u00FE","times":"\u00D7","Uacute":"\u00DA","uacute":"\u00FA","Ucirc":"\u00DB","ucirc":"\u00FB","Ugrave":"\u00D9","ugrave":"\u00F9","uml":"\u00A8","Uuml":"\u00DC","uuml":"\u00FC","Yacute":"\u00DD","yacute":"\u00FD","yen":"\u00A5","yuml":"\u00FF"}
},{}],27:[function(require,module,exports){
module.exports={"amp":"&","apos":"'","gt":">","lt":"<","quot":"\""}

},{}],28:[function(require,module,exports){
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

function EventEmitter() {
  this._events = this._events || {};
  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
EventEmitter.defaultMaxListeners = 10;

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function(n) {
  if (!isNumber(n) || n < 0 || isNaN(n))
    throw TypeError('n must be a positive number');
  this._maxListeners = n;
  return this;
};

EventEmitter.prototype.emit = function(type) {
  var er, handler, len, args, i, listeners;

  if (!this._events)
    this._events = {};

  // If there is no 'error' event listener then throw.
  if (type === 'error') {
    if (!this._events.error ||
        (isObject(this._events.error) && !this._events.error.length)) {
      er = arguments[1];
      if (er instanceof Error) {
        throw er; // Unhandled 'error' event
      } else {
        // At least give some kind of context to the user
        var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
        err.context = er;
        throw err;
      }
    }
  }

  handler = this._events[type];

  if (isUndefined(handler))
    return false;

  if (isFunction(handler)) {
    switch (arguments.length) {
      // fast cases
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      // slower
      default:
        args = Array.prototype.slice.call(arguments, 1);
        handler.apply(this, args);
    }
  } else if (isObject(handler)) {
    args = Array.prototype.slice.call(arguments, 1);
    listeners = handler.slice();
    len = listeners.length;
    for (i = 0; i < len; i++)
      listeners[i].apply(this, args);
  }

  return true;
};

EventEmitter.prototype.addListener = function(type, listener) {
  var m;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events)
    this._events = {};

  // To avoid recursion in the case that type === "newListener"! Before
  // adding it to the listeners, first emit "newListener".
  if (this._events.newListener)
    this.emit('newListener', type,
              isFunction(listener.listener) ?
              listener.listener : listener);

  if (!this._events[type])
    // Optimize the case of one listener. Don't need the extra array object.
    this._events[type] = listener;
  else if (isObject(this._events[type]))
    // If we've already got an array, just append.
    this._events[type].push(listener);
  else
    // Adding the second element, need to change to array.
    this._events[type] = [this._events[type], listener];

  // Check for listener leak
  if (isObject(this._events[type]) && !this._events[type].warned) {
    if (!isUndefined(this._maxListeners)) {
      m = this._maxListeners;
    } else {
      m = EventEmitter.defaultMaxListeners;
    }

    if (m && m > 0 && this._events[type].length > m) {
      this._events[type].warned = true;
      console.error('(node) warning: possible EventEmitter memory ' +
                    'leak detected. %d listeners added. ' +
                    'Use emitter.setMaxListeners() to increase limit.',
                    this._events[type].length);
      if (typeof console.trace === 'function') {
        // not supported in IE 10
        console.trace();
      }
    }
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function(type, listener) {
  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  var fired = false;

  function g() {
    this.removeListener(type, g);

    if (!fired) {
      fired = true;
      listener.apply(this, arguments);
    }
  }

  g.listener = listener;
  this.on(type, g);

  return this;
};

// emits a 'removeListener' event iff the listener was removed
EventEmitter.prototype.removeListener = function(type, listener) {
  var list, position, length, i;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events || !this._events[type])
    return this;

  list = this._events[type];
  length = list.length;
  position = -1;

  if (list === listener ||
      (isFunction(list.listener) && list.listener === listener)) {
    delete this._events[type];
    if (this._events.removeListener)
      this.emit('removeListener', type, listener);

  } else if (isObject(list)) {
    for (i = length; i-- > 0;) {
      if (list[i] === listener ||
          (list[i].listener && list[i].listener === listener)) {
        position = i;
        break;
      }
    }

    if (position < 0)
      return this;

    if (list.length === 1) {
      list.length = 0;
      delete this._events[type];
    } else {
      list.splice(position, 1);
    }

    if (this._events.removeListener)
      this.emit('removeListener', type, listener);
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function(type) {
  var key, listeners;

  if (!this._events)
    return this;

  // not listening for removeListener, no need to emit
  if (!this._events.removeListener) {
    if (arguments.length === 0)
      this._events = {};
    else if (this._events[type])
      delete this._events[type];
    return this;
  }

  // emit removeListener for all listeners on all events
  if (arguments.length === 0) {
    for (key in this._events) {
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners('removeListener');
    this._events = {};
    return this;
  }

  listeners = this._events[type];

  if (isFunction(listeners)) {
    this.removeListener(type, listeners);
  } else if (listeners) {
    // LIFO order
    while (listeners.length)
      this.removeListener(type, listeners[listeners.length - 1]);
  }
  delete this._events[type];

  return this;
};

EventEmitter.prototype.listeners = function(type) {
  var ret;
  if (!this._events || !this._events[type])
    ret = [];
  else if (isFunction(this._events[type]))
    ret = [this._events[type]];
  else
    ret = this._events[type].slice();
  return ret;
};

EventEmitter.prototype.listenerCount = function(type) {
  if (this._events) {
    var evlistener = this._events[type];

    if (isFunction(evlistener))
      return 1;
    else if (evlistener)
      return evlistener.length;
  }
  return 0;
};

EventEmitter.listenerCount = function(emitter, type) {
  return emitter.listenerCount(type);
};

function isFunction(arg) {
  return typeof arg === 'function';
}

function isNumber(arg) {
  return typeof arg === 'number';
}

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

function isUndefined(arg) {
  return arg === void 0;
}

},{}],29:[function(require,module,exports){
"use strict";

module.exports = CollectingHandler;

function CollectingHandler(cbs) {
	this._cbs = cbs || {};
	this.events = [];
}

var EVENTS = require("./").EVENTS;
Object.keys(EVENTS).forEach(function (name) {
	if (EVENTS[name] === 0) {
		name = "on" + name;
		CollectingHandler.prototype[name] = function () {
			this.events.push([name]);
			if (this._cbs[name]) this._cbs[name]();
		};
	} else if (EVENTS[name] === 1) {
		name = "on" + name;
		CollectingHandler.prototype[name] = function (a) {
			this.events.push([name, a]);
			if (this._cbs[name]) this._cbs[name](a);
		};
	} else if (EVENTS[name] === 2) {
		name = "on" + name;
		CollectingHandler.prototype[name] = function (a, b) {
			this.events.push([name, a, b]);
			if (this._cbs[name]) this._cbs[name](a, b);
		};
	} else {
		throw Error("wrong number of arguments");
	}
});

CollectingHandler.prototype.onreset = function () {
	this.events = [];
	if (this._cbs.onreset) this._cbs.onreset();
};

CollectingHandler.prototype.restart = function () {
	if (this._cbs.onreset) this._cbs.onreset();

	for (var i = 0, len = this.events.length; i < len; i++) {
		if (this._cbs[this.events[i][0]]) {

			var num = this.events[i].length;

			if (num === 1) {
				this._cbs[this.events[i][0]]();
			} else if (num === 2) {
				this._cbs[this.events[i][0]](this.events[i][1]);
			} else {
				this._cbs[this.events[i][0]](this.events[i][1], this.events[i][2]);
			}
		}
	}
};

},{"./":36}],30:[function(require,module,exports){
"use strict";

var index = require("./index.js"),
    DomHandler = index.DomHandler,
    DomUtils = index.DomUtils;

//TODO: make this a streamable handler
function FeedHandler(callback, options) {
	this.init(callback, options);
}

require("inherits")(FeedHandler, DomHandler);

FeedHandler.prototype.init = DomHandler;

function getElements(what, where) {
	return DomUtils.getElementsByTagName(what, where, true);
}
function getOneElement(what, where) {
	return DomUtils.getElementsByTagName(what, where, true, 1)[0];
}
function fetch(what, where, recurse) {
	return DomUtils.getText(DomUtils.getElementsByTagName(what, where, recurse, 1)).trim();
}

function addConditionally(obj, prop, what, where, recurse) {
	var tmp = fetch(what, where, recurse);
	if (tmp) obj[prop] = tmp;
}

var isValidFeed = function isValidFeed(value) {
	return value === "rss" || value === "feed" || value === "rdf:RDF";
};

FeedHandler.prototype.onend = function () {
	var feed = {},
	    feedRoot = getOneElement(isValidFeed, this.dom),
	    tmp,
	    childs;

	if (feedRoot) {
		if (feedRoot.name === "feed") {
			childs = feedRoot.children;

			feed.type = "atom";
			addConditionally(feed, "id", "id", childs);
			addConditionally(feed, "title", "title", childs);
			if ((tmp = getOneElement("link", childs)) && (tmp = tmp.attribs) && (tmp = tmp.href)) feed.link = tmp;
			addConditionally(feed, "description", "subtitle", childs);
			if (tmp = fetch("updated", childs)) feed.updated = new Date(tmp);
			addConditionally(feed, "author", "email", childs, true);

			feed.items = getElements("entry", childs).map(function (item) {
				var entry = {},
				    tmp;

				item = item.children;

				addConditionally(entry, "id", "id", item);
				addConditionally(entry, "title", "title", item);
				if ((tmp = getOneElement("link", item)) && (tmp = tmp.attribs) && (tmp = tmp.href)) entry.link = tmp;
				if (tmp = fetch("summary", item) || fetch("content", item)) entry.description = tmp;
				if (tmp = fetch("updated", item)) entry.pubDate = new Date(tmp);
				return entry;
			});
		} else {
			childs = getOneElement("channel", feedRoot.children).children;

			feed.type = feedRoot.name.substr(0, 3);
			feed.id = "";
			addConditionally(feed, "title", "title", childs);
			addConditionally(feed, "link", "link", childs);
			addConditionally(feed, "description", "description", childs);
			if (tmp = fetch("lastBuildDate", childs)) feed.updated = new Date(tmp);
			addConditionally(feed, "author", "managingEditor", childs, true);

			feed.items = getElements("item", feedRoot.children).map(function (item) {
				var entry = {},
				    tmp;

				item = item.children;

				addConditionally(entry, "id", "guid", item);
				addConditionally(entry, "title", "title", item);
				addConditionally(entry, "link", "link", item);
				addConditionally(entry, "description", "description", item);
				if (tmp = fetch("pubDate", item)) entry.pubDate = new Date(tmp);
				return entry;
			});
		}
	}
	this.dom = feed;
	DomHandler.prototype._handleCallback.call(this, feedRoot ? null : Error("couldn't find root of feed"));
};

module.exports = FeedHandler;

},{"./index.js":36,"inherits":38}],31:[function(require,module,exports){
"use strict";

var Tokenizer = require("./Tokenizer.js");

/*
	Options:

	xmlMode: Disables the special behavior for script/style tags (false by default)
	lowerCaseAttributeNames: call .toLowerCase for each attribute name (true if xmlMode is `false`)
	lowerCaseTags: call .toLowerCase for each tag name (true if xmlMode is `false`)
*/

/*
	Callbacks:

	oncdataend,
	oncdatastart,
	onclosetag,
	oncomment,
	oncommentend,
	onerror,
	onopentag,
	onprocessinginstruction,
	onreset,
	ontext
*/

var formTags = {
	input: true,
	option: true,
	optgroup: true,
	select: true,
	button: true,
	datalist: true,
	textarea: true
};

var openImpliesClose = {
	tr: { tr: true, th: true, td: true },
	th: { th: true },
	td: { thead: true, th: true, td: true },
	body: { head: true, link: true, script: true },
	li: { li: true },
	p: { p: true },
	h1: { p: true },
	h2: { p: true },
	h3: { p: true },
	h4: { p: true },
	h5: { p: true },
	h6: { p: true },
	select: formTags,
	input: formTags,
	output: formTags,
	button: formTags,
	datalist: formTags,
	textarea: formTags,
	option: { option: true },
	optgroup: { optgroup: true }
};

var voidElements = {
	__proto__: null,
	area: true,
	base: true,
	basefont: true,
	br: true,
	col: true,
	command: true,
	embed: true,
	frame: true,
	hr: true,
	img: true,
	input: true,
	isindex: true,
	keygen: true,
	link: true,
	meta: true,
	param: true,
	source: true,
	track: true,
	wbr: true,

	//common self closing svg elements
	path: true,
	circle: true,
	ellipse: true,
	line: true,
	rect: true,
	use: true,
	stop: true,
	polyline: true,
	polygon: true
};

var re_nameEnd = /\s|\//;

function Parser(cbs, options) {
	this._options = options || {};
	this._cbs = cbs || {};

	this._tagname = "";
	this._attribname = "";
	this._attribvalue = "";
	this._attribs = null;
	this._stack = [];

	this.startIndex = 0;
	this.endIndex = null;

	this._lowerCaseTagNames = "lowerCaseTags" in this._options ? !!this._options.lowerCaseTags : !this._options.xmlMode;
	this._lowerCaseAttributeNames = "lowerCaseAttributeNames" in this._options ? !!this._options.lowerCaseAttributeNames : !this._options.xmlMode;

	if (this._options.Tokenizer) {
		Tokenizer = this._options.Tokenizer;
	}
	this._tokenizer = new Tokenizer(this._options, this);

	if (this._cbs.onparserinit) this._cbs.onparserinit(this);
}

require("inherits")(Parser, require("events").EventEmitter);

Parser.prototype._updatePosition = function (initialOffset) {
	if (this.endIndex === null) {
		if (this._tokenizer._sectionStart <= initialOffset) {
			this.startIndex = 0;
		} else {
			this.startIndex = this._tokenizer._sectionStart - initialOffset;
		}
	} else this.startIndex = this.endIndex + 1;
	this.endIndex = this._tokenizer.getAbsoluteIndex();
};

//Tokenizer event handlers
Parser.prototype.ontext = function (data) {
	this._updatePosition(1);
	this.endIndex--;

	if (this._cbs.ontext) this._cbs.ontext(data);
};

Parser.prototype.onopentagname = function (name) {
	if (this._lowerCaseTagNames) {
		name = name.toLowerCase();
	}

	this._tagname = name;

	if (!this._options.xmlMode && name in openImpliesClose) {
		for (var el; (el = this._stack[this._stack.length - 1]) in openImpliesClose[name]; this.onclosetag(el)) {}
	}

	if (this._options.xmlMode || !(name in voidElements)) {
		this._stack.push(name);
	}

	if (this._cbs.onopentagname) this._cbs.onopentagname(name);
	if (this._cbs.onopentag) this._attribs = {};
};

Parser.prototype.onopentagend = function () {
	this._updatePosition(1);

	if (this._attribs) {
		if (this._cbs.onopentag) this._cbs.onopentag(this._tagname, this._attribs);
		this._attribs = null;
	}

	if (!this._options.xmlMode && this._cbs.onclosetag && this._tagname in voidElements) {
		this._cbs.onclosetag(this._tagname);
	}

	this._tagname = "";
};

Parser.prototype.onclosetag = function (name) {
	this._updatePosition(1);

	if (this._lowerCaseTagNames) {
		name = name.toLowerCase();
	}

	if (this._stack.length && (!(name in voidElements) || this._options.xmlMode)) {
		var pos = this._stack.lastIndexOf(name);
		if (pos !== -1) {
			if (this._cbs.onclosetag) {
				pos = this._stack.length - pos;
				while (pos--) {
					this._cbs.onclosetag(this._stack.pop());
				}
			} else this._stack.length = pos;
		} else if (name === "p" && !this._options.xmlMode) {
			this.onopentagname(name);
			this._closeCurrentTag();
		}
	} else if (!this._options.xmlMode && (name === "br" || name === "p")) {
		this.onopentagname(name);
		this._closeCurrentTag();
	}
};

Parser.prototype.onselfclosingtag = function () {
	if (this._options.xmlMode || this._options.recognizeSelfClosing) {
		this._closeCurrentTag();
	} else {
		this.onopentagend();
	}
};

Parser.prototype._closeCurrentTag = function () {
	var name = this._tagname;

	this.onopentagend();

	//self-closing tags will be on the top of the stack
	//(cheaper check than in onclosetag)
	if (this._stack[this._stack.length - 1] === name) {
		if (this._cbs.onclosetag) {
			this._cbs.onclosetag(name);
		}
		this._stack.pop();
	}
};

Parser.prototype.onattribname = function (name) {
	if (this._lowerCaseAttributeNames) {
		name = name.toLowerCase();
	}
	this._attribname = name;
};

Parser.prototype.onattribdata = function (value) {
	this._attribvalue += value;
};

Parser.prototype.onattribend = function () {
	if (this._cbs.onattribute) this._cbs.onattribute(this._attribname, this._attribvalue);
	if (this._attribs && !Object.prototype.hasOwnProperty.call(this._attribs, this._attribname)) {
		this._attribs[this._attribname] = this._attribvalue;
	}
	this._attribname = "";
	this._attribvalue = "";
};

Parser.prototype._getInstructionName = function (value) {
	var idx = value.search(re_nameEnd),
	    name = idx < 0 ? value : value.substr(0, idx);

	if (this._lowerCaseTagNames) {
		name = name.toLowerCase();
	}

	return name;
};

Parser.prototype.ondeclaration = function (value) {
	if (this._cbs.onprocessinginstruction) {
		var name = this._getInstructionName(value);
		this._cbs.onprocessinginstruction("!" + name, "!" + value);
	}
};

Parser.prototype.onprocessinginstruction = function (value) {
	if (this._cbs.onprocessinginstruction) {
		var name = this._getInstructionName(value);
		this._cbs.onprocessinginstruction("?" + name, "?" + value);
	}
};

Parser.prototype.oncomment = function (value) {
	this._updatePosition(4);

	if (this._cbs.oncomment) this._cbs.oncomment(value);
	if (this._cbs.oncommentend) this._cbs.oncommentend();
};

Parser.prototype.oncdata = function (value) {
	this._updatePosition(1);

	if (this._options.xmlMode || this._options.recognizeCDATA) {
		if (this._cbs.oncdatastart) this._cbs.oncdatastart();
		if (this._cbs.ontext) this._cbs.ontext(value);
		if (this._cbs.oncdataend) this._cbs.oncdataend();
	} else {
		this.oncomment("[CDATA[" + value + "]]");
	}
};

Parser.prototype.onerror = function (err) {
	if (this._cbs.onerror) this._cbs.onerror(err);
};

Parser.prototype.onend = function () {
	if (this._cbs.onclosetag) {
		for (var i = this._stack.length; i > 0; this._cbs.onclosetag(this._stack[--i])) {}
	}
	if (this._cbs.onend) this._cbs.onend();
};

//Resets the parser to a blank state, ready to parse a new HTML document
Parser.prototype.reset = function () {
	if (this._cbs.onreset) this._cbs.onreset();
	this._tokenizer.reset();

	this._tagname = "";
	this._attribname = "";
	this._attribs = null;
	this._stack = [];

	if (this._cbs.onparserinit) this._cbs.onparserinit(this);
};

//Parses a complete HTML document and pushes it to the handler
Parser.prototype.parseComplete = function (data) {
	this.reset();
	this.end(data);
};

Parser.prototype.write = function (chunk) {
	this._tokenizer.write(chunk);
};

Parser.prototype.end = function (chunk) {
	this._tokenizer.end(chunk);
};

Parser.prototype.pause = function () {
	this._tokenizer.pause();
};

Parser.prototype.resume = function () {
	this._tokenizer.resume();
};

//alias for backwards compat
Parser.prototype.parseChunk = Parser.prototype.write;
Parser.prototype.done = Parser.prototype.end;

module.exports = Parser;

},{"./Tokenizer.js":34,"events":28,"inherits":38}],32:[function(require,module,exports){
"use strict";

module.exports = ProxyHandler;

function ProxyHandler(cbs) {
	this._cbs = cbs || {};
}

var EVENTS = require("./").EVENTS;
Object.keys(EVENTS).forEach(function (name) {
	if (EVENTS[name] === 0) {
		name = "on" + name;
		ProxyHandler.prototype[name] = function () {
			if (this._cbs[name]) this._cbs[name]();
		};
	} else if (EVENTS[name] === 1) {
		name = "on" + name;
		ProxyHandler.prototype[name] = function (a) {
			if (this._cbs[name]) this._cbs[name](a);
		};
	} else if (EVENTS[name] === 2) {
		name = "on" + name;
		ProxyHandler.prototype[name] = function (a, b) {
			if (this._cbs[name]) this._cbs[name](a, b);
		};
	} else {
		throw Error("wrong number of arguments");
	}
});

},{"./":36}],33:[function(require,module,exports){
"use strict";

module.exports = Stream;

var Parser = require("./WritableStream.js");

function Stream(options) {
	Parser.call(this, new Cbs(this), options);
}

require("inherits")(Stream, Parser);

Stream.prototype.readable = true;

function Cbs(scope) {
	this.scope = scope;
}

var EVENTS = require("../").EVENTS;

Object.keys(EVENTS).forEach(function (name) {
	if (EVENTS[name] === 0) {
		Cbs.prototype["on" + name] = function () {
			this.scope.emit(name);
		};
	} else if (EVENTS[name] === 1) {
		Cbs.prototype["on" + name] = function (a) {
			this.scope.emit(name, a);
		};
	} else if (EVENTS[name] === 2) {
		Cbs.prototype["on" + name] = function (a, b) {
			this.scope.emit(name, a, b);
		};
	} else {
		throw Error("wrong number of arguments!");
	}
});

},{"../":36,"./WritableStream.js":35,"inherits":38}],34:[function(require,module,exports){
"use strict";

module.exports = Tokenizer;

var decodeCodePoint = require("entities/lib/decode_codepoint.js"),
    entityMap = require("entities/maps/entities.json"),
    legacyMap = require("entities/maps/legacy.json"),
    xmlMap = require("entities/maps/xml.json"),
    i = 0,
    TEXT = i++,
    BEFORE_TAG_NAME = i++,
    //after <
IN_TAG_NAME = i++,
    IN_SELF_CLOSING_TAG = i++,
    BEFORE_CLOSING_TAG_NAME = i++,
    IN_CLOSING_TAG_NAME = i++,
    AFTER_CLOSING_TAG_NAME = i++,


//attributes
BEFORE_ATTRIBUTE_NAME = i++,
    IN_ATTRIBUTE_NAME = i++,
    AFTER_ATTRIBUTE_NAME = i++,
    BEFORE_ATTRIBUTE_VALUE = i++,
    IN_ATTRIBUTE_VALUE_DQ = i++,
    // "
IN_ATTRIBUTE_VALUE_SQ = i++,
    // '
IN_ATTRIBUTE_VALUE_NQ = i++,


//declarations
BEFORE_DECLARATION = i++,
    // !
IN_DECLARATION = i++,


//processing instructions
IN_PROCESSING_INSTRUCTION = i++,
    // ?

//comments
BEFORE_COMMENT = i++,
    IN_COMMENT = i++,
    AFTER_COMMENT_1 = i++,
    AFTER_COMMENT_2 = i++,


//cdata
BEFORE_CDATA_1 = i++,
    // [
BEFORE_CDATA_2 = i++,
    // C
BEFORE_CDATA_3 = i++,
    // D
BEFORE_CDATA_4 = i++,
    // A
BEFORE_CDATA_5 = i++,
    // T
BEFORE_CDATA_6 = i++,
    // A
IN_CDATA = i++,
    // [
AFTER_CDATA_1 = i++,
    // ]
AFTER_CDATA_2 = i++,
    // ]

//special tags
BEFORE_SPECIAL = i++,
    //S
BEFORE_SPECIAL_END = i++,
    //S

BEFORE_SCRIPT_1 = i++,
    //C
BEFORE_SCRIPT_2 = i++,
    //R
BEFORE_SCRIPT_3 = i++,
    //I
BEFORE_SCRIPT_4 = i++,
    //P
BEFORE_SCRIPT_5 = i++,
    //T
AFTER_SCRIPT_1 = i++,
    //C
AFTER_SCRIPT_2 = i++,
    //R
AFTER_SCRIPT_3 = i++,
    //I
AFTER_SCRIPT_4 = i++,
    //P
AFTER_SCRIPT_5 = i++,
    //T

BEFORE_STYLE_1 = i++,
    //T
BEFORE_STYLE_2 = i++,
    //Y
BEFORE_STYLE_3 = i++,
    //L
BEFORE_STYLE_4 = i++,
    //E
AFTER_STYLE_1 = i++,
    //T
AFTER_STYLE_2 = i++,
    //Y
AFTER_STYLE_3 = i++,
    //L
AFTER_STYLE_4 = i++,
    //E

BEFORE_ENTITY = i++,
    //&
BEFORE_NUMERIC_ENTITY = i++,
    //#
IN_NAMED_ENTITY = i++,
    IN_NUMERIC_ENTITY = i++,
    IN_HEX_ENTITY = i++,
    //X

j = 0,
    SPECIAL_NONE = j++,
    SPECIAL_SCRIPT = j++,
    SPECIAL_STYLE = j++;

function whitespace(c) {
	return c === " " || c === "\n" || c === "\t" || c === "\f" || c === "\r";
}

function characterState(char, SUCCESS) {
	return function (c) {
		if (c === char) this._state = SUCCESS;
	};
}

function ifElseState(upper, SUCCESS, FAILURE) {
	var lower = upper.toLowerCase();

	if (upper === lower) {
		return function (c) {
			if (c === lower) {
				this._state = SUCCESS;
			} else {
				this._state = FAILURE;
				this._index--;
			}
		};
	} else {
		return function (c) {
			if (c === lower || c === upper) {
				this._state = SUCCESS;
			} else {
				this._state = FAILURE;
				this._index--;
			}
		};
	}
}

function consumeSpecialNameChar(upper, NEXT_STATE) {
	var lower = upper.toLowerCase();

	return function (c) {
		if (c === lower || c === upper) {
			this._state = NEXT_STATE;
		} else {
			this._state = IN_TAG_NAME;
			this._index--; //consume the token again
		}
	};
}

function Tokenizer(options, cbs) {
	this._state = TEXT;
	this._buffer = "";
	this._sectionStart = 0;
	this._index = 0;
	this._bufferOffset = 0; //chars removed from _buffer
	this._baseState = TEXT;
	this._special = SPECIAL_NONE;
	this._cbs = cbs;
	this._running = true;
	this._ended = false;
	this._xmlMode = !!(options && options.xmlMode);
	this._decodeEntities = !!(options && options.decodeEntities);
}

Tokenizer.prototype._stateText = function (c) {
	if (c === "<") {
		if (this._index > this._sectionStart) {
			this._cbs.ontext(this._getSection());
		}
		this._state = BEFORE_TAG_NAME;
		this._sectionStart = this._index;
	} else if (this._decodeEntities && this._special === SPECIAL_NONE && c === "&") {
		if (this._index > this._sectionStart) {
			this._cbs.ontext(this._getSection());
		}
		this._baseState = TEXT;
		this._state = BEFORE_ENTITY;
		this._sectionStart = this._index;
	}
};

Tokenizer.prototype._stateBeforeTagName = function (c) {
	if (c === "/") {
		this._state = BEFORE_CLOSING_TAG_NAME;
	} else if (c === "<") {
		this._cbs.ontext(this._getSection());
		this._sectionStart = this._index;
	} else if (c === ">" || this._special !== SPECIAL_NONE || whitespace(c)) {
		this._state = TEXT;
	} else if (c === "!") {
		this._state = BEFORE_DECLARATION;
		this._sectionStart = this._index + 1;
	} else if (c === "?") {
		this._state = IN_PROCESSING_INSTRUCTION;
		this._sectionStart = this._index + 1;
	} else {
		this._state = !this._xmlMode && (c === "s" || c === "S") ? BEFORE_SPECIAL : IN_TAG_NAME;
		this._sectionStart = this._index;
	}
};

Tokenizer.prototype._stateInTagName = function (c) {
	if (c === "/" || c === ">" || whitespace(c)) {
		this._emitToken("onopentagname");
		this._state = BEFORE_ATTRIBUTE_NAME;
		this._index--;
	}
};

Tokenizer.prototype._stateBeforeCloseingTagName = function (c) {
	if (whitespace(c)) ;else if (c === ">") {
		this._state = TEXT;
	} else if (this._special !== SPECIAL_NONE) {
		if (c === "s" || c === "S") {
			this._state = BEFORE_SPECIAL_END;
		} else {
			this._state = TEXT;
			this._index--;
		}
	} else {
		this._state = IN_CLOSING_TAG_NAME;
		this._sectionStart = this._index;
	}
};

Tokenizer.prototype._stateInCloseingTagName = function (c) {
	if (c === ">" || whitespace(c)) {
		this._emitToken("onclosetag");
		this._state = AFTER_CLOSING_TAG_NAME;
		this._index--;
	}
};

Tokenizer.prototype._stateAfterCloseingTagName = function (c) {
	//skip everything until ">"
	if (c === ">") {
		this._state = TEXT;
		this._sectionStart = this._index + 1;
	}
};

Tokenizer.prototype._stateBeforeAttributeName = function (c) {
	if (c === ">") {
		this._cbs.onopentagend();
		this._state = TEXT;
		this._sectionStart = this._index + 1;
	} else if (c === "/") {
		this._state = IN_SELF_CLOSING_TAG;
	} else if (!whitespace(c)) {
		this._state = IN_ATTRIBUTE_NAME;
		this._sectionStart = this._index;
	}
};

Tokenizer.prototype._stateInSelfClosingTag = function (c) {
	if (c === ">") {
		this._cbs.onselfclosingtag();
		this._state = TEXT;
		this._sectionStart = this._index + 1;
	} else if (!whitespace(c)) {
		this._state = BEFORE_ATTRIBUTE_NAME;
		this._index--;
	}
};

Tokenizer.prototype._stateInAttributeName = function (c) {
	if (c === "=" || c === "/" || c === ">" || whitespace(c)) {
		this._cbs.onattribname(this._getSection());
		this._sectionStart = -1;
		this._state = AFTER_ATTRIBUTE_NAME;
		this._index--;
	}
};

Tokenizer.prototype._stateAfterAttributeName = function (c) {
	if (c === "=") {
		this._state = BEFORE_ATTRIBUTE_VALUE;
	} else if (c === "/" || c === ">") {
		this._cbs.onattribend();
		this._state = BEFORE_ATTRIBUTE_NAME;
		this._index--;
	} else if (!whitespace(c)) {
		this._cbs.onattribend();
		this._state = IN_ATTRIBUTE_NAME;
		this._sectionStart = this._index;
	}
};

Tokenizer.prototype._stateBeforeAttributeValue = function (c) {
	if (c === "\"") {
		this._state = IN_ATTRIBUTE_VALUE_DQ;
		this._sectionStart = this._index + 1;
	} else if (c === "'") {
		this._state = IN_ATTRIBUTE_VALUE_SQ;
		this._sectionStart = this._index + 1;
	} else if (!whitespace(c)) {
		this._state = IN_ATTRIBUTE_VALUE_NQ;
		this._sectionStart = this._index;
		this._index--; //reconsume token
	}
};

Tokenizer.prototype._stateInAttributeValueDoubleQuotes = function (c) {
	if (c === "\"") {
		this._emitToken("onattribdata");
		this._cbs.onattribend();
		this._state = BEFORE_ATTRIBUTE_NAME;
	} else if (this._decodeEntities && c === "&") {
		this._emitToken("onattribdata");
		this._baseState = this._state;
		this._state = BEFORE_ENTITY;
		this._sectionStart = this._index;
	}
};

Tokenizer.prototype._stateInAttributeValueSingleQuotes = function (c) {
	if (c === "'") {
		this._emitToken("onattribdata");
		this._cbs.onattribend();
		this._state = BEFORE_ATTRIBUTE_NAME;
	} else if (this._decodeEntities && c === "&") {
		this._emitToken("onattribdata");
		this._baseState = this._state;
		this._state = BEFORE_ENTITY;
		this._sectionStart = this._index;
	}
};

Tokenizer.prototype._stateInAttributeValueNoQuotes = function (c) {
	if (whitespace(c) || c === ">") {
		this._emitToken("onattribdata");
		this._cbs.onattribend();
		this._state = BEFORE_ATTRIBUTE_NAME;
		this._index--;
	} else if (this._decodeEntities && c === "&") {
		this._emitToken("onattribdata");
		this._baseState = this._state;
		this._state = BEFORE_ENTITY;
		this._sectionStart = this._index;
	}
};

Tokenizer.prototype._stateBeforeDeclaration = function (c) {
	this._state = c === "[" ? BEFORE_CDATA_1 : c === "-" ? BEFORE_COMMENT : IN_DECLARATION;
};

Tokenizer.prototype._stateInDeclaration = function (c) {
	if (c === ">") {
		this._cbs.ondeclaration(this._getSection());
		this._state = TEXT;
		this._sectionStart = this._index + 1;
	}
};

Tokenizer.prototype._stateInProcessingInstruction = function (c) {
	if (c === ">") {
		this._cbs.onprocessinginstruction(this._getSection());
		this._state = TEXT;
		this._sectionStart = this._index + 1;
	}
};

Tokenizer.prototype._stateBeforeComment = function (c) {
	if (c === "-") {
		this._state = IN_COMMENT;
		this._sectionStart = this._index + 1;
	} else {
		this._state = IN_DECLARATION;
	}
};

Tokenizer.prototype._stateInComment = function (c) {
	if (c === "-") this._state = AFTER_COMMENT_1;
};

Tokenizer.prototype._stateAfterComment1 = function (c) {
	if (c === "-") {
		this._state = AFTER_COMMENT_2;
	} else {
		this._state = IN_COMMENT;
	}
};

Tokenizer.prototype._stateAfterComment2 = function (c) {
	if (c === ">") {
		//remove 2 trailing chars
		this._cbs.oncomment(this._buffer.substring(this._sectionStart, this._index - 2));
		this._state = TEXT;
		this._sectionStart = this._index + 1;
	} else if (c !== "-") {
		this._state = IN_COMMENT;
	}
	// else: stay in AFTER_COMMENT_2 (`--->`)
};

Tokenizer.prototype._stateBeforeCdata1 = ifElseState("C", BEFORE_CDATA_2, IN_DECLARATION);
Tokenizer.prototype._stateBeforeCdata2 = ifElseState("D", BEFORE_CDATA_3, IN_DECLARATION);
Tokenizer.prototype._stateBeforeCdata3 = ifElseState("A", BEFORE_CDATA_4, IN_DECLARATION);
Tokenizer.prototype._stateBeforeCdata4 = ifElseState("T", BEFORE_CDATA_5, IN_DECLARATION);
Tokenizer.prototype._stateBeforeCdata5 = ifElseState("A", BEFORE_CDATA_6, IN_DECLARATION);

Tokenizer.prototype._stateBeforeCdata6 = function (c) {
	if (c === "[") {
		this._state = IN_CDATA;
		this._sectionStart = this._index + 1;
	} else {
		this._state = IN_DECLARATION;
		this._index--;
	}
};

Tokenizer.prototype._stateInCdata = function (c) {
	if (c === "]") this._state = AFTER_CDATA_1;
};

Tokenizer.prototype._stateAfterCdata1 = characterState("]", AFTER_CDATA_2);

Tokenizer.prototype._stateAfterCdata2 = function (c) {
	if (c === ">") {
		//remove 2 trailing chars
		this._cbs.oncdata(this._buffer.substring(this._sectionStart, this._index - 2));
		this._state = TEXT;
		this._sectionStart = this._index + 1;
	} else if (c !== "]") {
		this._state = IN_CDATA;
	}
	//else: stay in AFTER_CDATA_2 (`]]]>`)
};

Tokenizer.prototype._stateBeforeSpecial = function (c) {
	if (c === "c" || c === "C") {
		this._state = BEFORE_SCRIPT_1;
	} else if (c === "t" || c === "T") {
		this._state = BEFORE_STYLE_1;
	} else {
		this._state = IN_TAG_NAME;
		this._index--; //consume the token again
	}
};

Tokenizer.prototype._stateBeforeSpecialEnd = function (c) {
	if (this._special === SPECIAL_SCRIPT && (c === "c" || c === "C")) {
		this._state = AFTER_SCRIPT_1;
	} else if (this._special === SPECIAL_STYLE && (c === "t" || c === "T")) {
		this._state = AFTER_STYLE_1;
	} else this._state = TEXT;
};

Tokenizer.prototype._stateBeforeScript1 = consumeSpecialNameChar("R", BEFORE_SCRIPT_2);
Tokenizer.prototype._stateBeforeScript2 = consumeSpecialNameChar("I", BEFORE_SCRIPT_3);
Tokenizer.prototype._stateBeforeScript3 = consumeSpecialNameChar("P", BEFORE_SCRIPT_4);
Tokenizer.prototype._stateBeforeScript4 = consumeSpecialNameChar("T", BEFORE_SCRIPT_5);

Tokenizer.prototype._stateBeforeScript5 = function (c) {
	if (c === "/" || c === ">" || whitespace(c)) {
		this._special = SPECIAL_SCRIPT;
	}
	this._state = IN_TAG_NAME;
	this._index--; //consume the token again
};

Tokenizer.prototype._stateAfterScript1 = ifElseState("R", AFTER_SCRIPT_2, TEXT);
Tokenizer.prototype._stateAfterScript2 = ifElseState("I", AFTER_SCRIPT_3, TEXT);
Tokenizer.prototype._stateAfterScript3 = ifElseState("P", AFTER_SCRIPT_4, TEXT);
Tokenizer.prototype._stateAfterScript4 = ifElseState("T", AFTER_SCRIPT_5, TEXT);

Tokenizer.prototype._stateAfterScript5 = function (c) {
	if (c === ">" || whitespace(c)) {
		this._special = SPECIAL_NONE;
		this._state = IN_CLOSING_TAG_NAME;
		this._sectionStart = this._index - 6;
		this._index--; //reconsume the token
	} else this._state = TEXT;
};

Tokenizer.prototype._stateBeforeStyle1 = consumeSpecialNameChar("Y", BEFORE_STYLE_2);
Tokenizer.prototype._stateBeforeStyle2 = consumeSpecialNameChar("L", BEFORE_STYLE_3);
Tokenizer.prototype._stateBeforeStyle3 = consumeSpecialNameChar("E", BEFORE_STYLE_4);

Tokenizer.prototype._stateBeforeStyle4 = function (c) {
	if (c === "/" || c === ">" || whitespace(c)) {
		this._special = SPECIAL_STYLE;
	}
	this._state = IN_TAG_NAME;
	this._index--; //consume the token again
};

Tokenizer.prototype._stateAfterStyle1 = ifElseState("Y", AFTER_STYLE_2, TEXT);
Tokenizer.prototype._stateAfterStyle2 = ifElseState("L", AFTER_STYLE_3, TEXT);
Tokenizer.prototype._stateAfterStyle3 = ifElseState("E", AFTER_STYLE_4, TEXT);

Tokenizer.prototype._stateAfterStyle4 = function (c) {
	if (c === ">" || whitespace(c)) {
		this._special = SPECIAL_NONE;
		this._state = IN_CLOSING_TAG_NAME;
		this._sectionStart = this._index - 5;
		this._index--; //reconsume the token
	} else this._state = TEXT;
};

Tokenizer.prototype._stateBeforeEntity = ifElseState("#", BEFORE_NUMERIC_ENTITY, IN_NAMED_ENTITY);
Tokenizer.prototype._stateBeforeNumericEntity = ifElseState("X", IN_HEX_ENTITY, IN_NUMERIC_ENTITY);

//for entities terminated with a semicolon
Tokenizer.prototype._parseNamedEntityStrict = function () {
	//offset = 1
	if (this._sectionStart + 1 < this._index) {
		var entity = this._buffer.substring(this._sectionStart + 1, this._index),
		    map = this._xmlMode ? xmlMap : entityMap;

		if (map.hasOwnProperty(entity)) {
			this._emitPartial(map[entity]);
			this._sectionStart = this._index + 1;
		}
	}
};

//parses legacy entities (without trailing semicolon)
Tokenizer.prototype._parseLegacyEntity = function () {
	var start = this._sectionStart + 1,
	    limit = this._index - start;

	if (limit > 6) limit = 6; //the max length of legacy entities is 6

	while (limit >= 2) {
		//the min length of legacy entities is 2
		var entity = this._buffer.substr(start, limit);

		if (legacyMap.hasOwnProperty(entity)) {
			this._emitPartial(legacyMap[entity]);
			this._sectionStart += limit + 1;
			return;
		} else {
			limit--;
		}
	}
};

Tokenizer.prototype._stateInNamedEntity = function (c) {
	if (c === ";") {
		this._parseNamedEntityStrict();
		if (this._sectionStart + 1 < this._index && !this._xmlMode) {
			this._parseLegacyEntity();
		}
		this._state = this._baseState;
	} else if ((c < "a" || c > "z") && (c < "A" || c > "Z") && (c < "0" || c > "9")) {
		if (this._xmlMode) ;else if (this._sectionStart + 1 === this._index) ;else if (this._baseState !== TEXT) {
			if (c !== "=") {
				this._parseNamedEntityStrict();
			}
		} else {
			this._parseLegacyEntity();
		}

		this._state = this._baseState;
		this._index--;
	}
};

Tokenizer.prototype._decodeNumericEntity = function (offset, base) {
	var sectionStart = this._sectionStart + offset;

	if (sectionStart !== this._index) {
		//parse entity
		var entity = this._buffer.substring(sectionStart, this._index);
		var parsed = parseInt(entity, base);

		this._emitPartial(decodeCodePoint(parsed));
		this._sectionStart = this._index;
	} else {
		this._sectionStart--;
	}

	this._state = this._baseState;
};

Tokenizer.prototype._stateInNumericEntity = function (c) {
	if (c === ";") {
		this._decodeNumericEntity(2, 10);
		this._sectionStart++;
	} else if (c < "0" || c > "9") {
		if (!this._xmlMode) {
			this._decodeNumericEntity(2, 10);
		} else {
			this._state = this._baseState;
		}
		this._index--;
	}
};

Tokenizer.prototype._stateInHexEntity = function (c) {
	if (c === ";") {
		this._decodeNumericEntity(3, 16);
		this._sectionStart++;
	} else if ((c < "a" || c > "f") && (c < "A" || c > "F") && (c < "0" || c > "9")) {
		if (!this._xmlMode) {
			this._decodeNumericEntity(3, 16);
		} else {
			this._state = this._baseState;
		}
		this._index--;
	}
};

Tokenizer.prototype._cleanup = function () {
	if (this._sectionStart < 0) {
		this._buffer = "";
		this._bufferOffset += this._index;
		this._index = 0;
	} else if (this._running) {
		if (this._state === TEXT) {
			if (this._sectionStart !== this._index) {
				this._cbs.ontext(this._buffer.substr(this._sectionStart));
			}
			this._buffer = "";
			this._bufferOffset += this._index;
			this._index = 0;
		} else if (this._sectionStart === this._index) {
			//the section just started
			this._buffer = "";
			this._bufferOffset += this._index;
			this._index = 0;
		} else {
			//remove everything unnecessary
			this._buffer = this._buffer.substr(this._sectionStart);
			this._index -= this._sectionStart;
			this._bufferOffset += this._sectionStart;
		}

		this._sectionStart = 0;
	}
};

//TODO make events conditional
Tokenizer.prototype.write = function (chunk) {
	if (this._ended) this._cbs.onerror(Error(".write() after done!"));

	this._buffer += chunk;
	this._parse();
};

Tokenizer.prototype._parse = function () {
	while (this._index < this._buffer.length && this._running) {
		var c = this._buffer.charAt(this._index);
		if (this._state === TEXT) {
			this._stateText(c);
		} else if (this._state === BEFORE_TAG_NAME) {
			this._stateBeforeTagName(c);
		} else if (this._state === IN_TAG_NAME) {
			this._stateInTagName(c);
		} else if (this._state === BEFORE_CLOSING_TAG_NAME) {
			this._stateBeforeCloseingTagName(c);
		} else if (this._state === IN_CLOSING_TAG_NAME) {
			this._stateInCloseingTagName(c);
		} else if (this._state === AFTER_CLOSING_TAG_NAME) {
			this._stateAfterCloseingTagName(c);
		} else if (this._state === IN_SELF_CLOSING_TAG) {
			this._stateInSelfClosingTag(c);
		}

		/*
  *	attributes
  */
		else if (this._state === BEFORE_ATTRIBUTE_NAME) {
				this._stateBeforeAttributeName(c);
			} else if (this._state === IN_ATTRIBUTE_NAME) {
				this._stateInAttributeName(c);
			} else if (this._state === AFTER_ATTRIBUTE_NAME) {
				this._stateAfterAttributeName(c);
			} else if (this._state === BEFORE_ATTRIBUTE_VALUE) {
				this._stateBeforeAttributeValue(c);
			} else if (this._state === IN_ATTRIBUTE_VALUE_DQ) {
				this._stateInAttributeValueDoubleQuotes(c);
			} else if (this._state === IN_ATTRIBUTE_VALUE_SQ) {
				this._stateInAttributeValueSingleQuotes(c);
			} else if (this._state === IN_ATTRIBUTE_VALUE_NQ) {
				this._stateInAttributeValueNoQuotes(c);
			}

			/*
   *	declarations
   */
			else if (this._state === BEFORE_DECLARATION) {
					this._stateBeforeDeclaration(c);
				} else if (this._state === IN_DECLARATION) {
					this._stateInDeclaration(c);
				}

				/*
    *	processing instructions
    */
				else if (this._state === IN_PROCESSING_INSTRUCTION) {
						this._stateInProcessingInstruction(c);
					}

					/*
     *	comments
     */
					else if (this._state === BEFORE_COMMENT) {
							this._stateBeforeComment(c);
						} else if (this._state === IN_COMMENT) {
							this._stateInComment(c);
						} else if (this._state === AFTER_COMMENT_1) {
							this._stateAfterComment1(c);
						} else if (this._state === AFTER_COMMENT_2) {
							this._stateAfterComment2(c);
						}

						/*
      *	cdata
      */
						else if (this._state === BEFORE_CDATA_1) {
								this._stateBeforeCdata1(c);
							} else if (this._state === BEFORE_CDATA_2) {
								this._stateBeforeCdata2(c);
							} else if (this._state === BEFORE_CDATA_3) {
								this._stateBeforeCdata3(c);
							} else if (this._state === BEFORE_CDATA_4) {
								this._stateBeforeCdata4(c);
							} else if (this._state === BEFORE_CDATA_5) {
								this._stateBeforeCdata5(c);
							} else if (this._state === BEFORE_CDATA_6) {
								this._stateBeforeCdata6(c);
							} else if (this._state === IN_CDATA) {
								this._stateInCdata(c);
							} else if (this._state === AFTER_CDATA_1) {
								this._stateAfterCdata1(c);
							} else if (this._state === AFTER_CDATA_2) {
								this._stateAfterCdata2(c);
							}

							/*
       * special tags
       */
							else if (this._state === BEFORE_SPECIAL) {
									this._stateBeforeSpecial(c);
								} else if (this._state === BEFORE_SPECIAL_END) {
									this._stateBeforeSpecialEnd(c);
								}

								/*
        * script
        */
								else if (this._state === BEFORE_SCRIPT_1) {
										this._stateBeforeScript1(c);
									} else if (this._state === BEFORE_SCRIPT_2) {
										this._stateBeforeScript2(c);
									} else if (this._state === BEFORE_SCRIPT_3) {
										this._stateBeforeScript3(c);
									} else if (this._state === BEFORE_SCRIPT_4) {
										this._stateBeforeScript4(c);
									} else if (this._state === BEFORE_SCRIPT_5) {
										this._stateBeforeScript5(c);
									} else if (this._state === AFTER_SCRIPT_1) {
										this._stateAfterScript1(c);
									} else if (this._state === AFTER_SCRIPT_2) {
										this._stateAfterScript2(c);
									} else if (this._state === AFTER_SCRIPT_3) {
										this._stateAfterScript3(c);
									} else if (this._state === AFTER_SCRIPT_4) {
										this._stateAfterScript4(c);
									} else if (this._state === AFTER_SCRIPT_5) {
										this._stateAfterScript5(c);
									}

									/*
         * style
         */
									else if (this._state === BEFORE_STYLE_1) {
											this._stateBeforeStyle1(c);
										} else if (this._state === BEFORE_STYLE_2) {
											this._stateBeforeStyle2(c);
										} else if (this._state === BEFORE_STYLE_3) {
											this._stateBeforeStyle3(c);
										} else if (this._state === BEFORE_STYLE_4) {
											this._stateBeforeStyle4(c);
										} else if (this._state === AFTER_STYLE_1) {
											this._stateAfterStyle1(c);
										} else if (this._state === AFTER_STYLE_2) {
											this._stateAfterStyle2(c);
										} else if (this._state === AFTER_STYLE_3) {
											this._stateAfterStyle3(c);
										} else if (this._state === AFTER_STYLE_4) {
											this._stateAfterStyle4(c);
										}

										/*
          * entities
          */
										else if (this._state === BEFORE_ENTITY) {
												this._stateBeforeEntity(c);
											} else if (this._state === BEFORE_NUMERIC_ENTITY) {
												this._stateBeforeNumericEntity(c);
											} else if (this._state === IN_NAMED_ENTITY) {
												this._stateInNamedEntity(c);
											} else if (this._state === IN_NUMERIC_ENTITY) {
												this._stateInNumericEntity(c);
											} else if (this._state === IN_HEX_ENTITY) {
												this._stateInHexEntity(c);
											} else {
												this._cbs.onerror(Error("unknown _state"), this._state);
											}

		this._index++;
	}

	this._cleanup();
};

Tokenizer.prototype.pause = function () {
	this._running = false;
};
Tokenizer.prototype.resume = function () {
	this._running = true;

	if (this._index < this._buffer.length) {
		this._parse();
	}
	if (this._ended) {
		this._finish();
	}
};

Tokenizer.prototype.end = function (chunk) {
	if (this._ended) this._cbs.onerror(Error(".end() after done!"));
	if (chunk) this.write(chunk);

	this._ended = true;

	if (this._running) this._finish();
};

Tokenizer.prototype._finish = function () {
	//if there is remaining data, emit it in a reasonable way
	if (this._sectionStart < this._index) {
		this._handleTrailingData();
	}

	this._cbs.onend();
};

Tokenizer.prototype._handleTrailingData = function () {
	var data = this._buffer.substr(this._sectionStart);

	if (this._state === IN_CDATA || this._state === AFTER_CDATA_1 || this._state === AFTER_CDATA_2) {
		this._cbs.oncdata(data);
	} else if (this._state === IN_COMMENT || this._state === AFTER_COMMENT_1 || this._state === AFTER_COMMENT_2) {
		this._cbs.oncomment(data);
	} else if (this._state === IN_NAMED_ENTITY && !this._xmlMode) {
		this._parseLegacyEntity();
		if (this._sectionStart < this._index) {
			this._state = this._baseState;
			this._handleTrailingData();
		}
	} else if (this._state === IN_NUMERIC_ENTITY && !this._xmlMode) {
		this._decodeNumericEntity(2, 10);
		if (this._sectionStart < this._index) {
			this._state = this._baseState;
			this._handleTrailingData();
		}
	} else if (this._state === IN_HEX_ENTITY && !this._xmlMode) {
		this._decodeNumericEntity(3, 16);
		if (this._sectionStart < this._index) {
			this._state = this._baseState;
			this._handleTrailingData();
		}
	} else if (this._state !== IN_TAG_NAME && this._state !== BEFORE_ATTRIBUTE_NAME && this._state !== BEFORE_ATTRIBUTE_VALUE && this._state !== AFTER_ATTRIBUTE_NAME && this._state !== IN_ATTRIBUTE_NAME && this._state !== IN_ATTRIBUTE_VALUE_SQ && this._state !== IN_ATTRIBUTE_VALUE_DQ && this._state !== IN_ATTRIBUTE_VALUE_NQ && this._state !== IN_CLOSING_TAG_NAME) {
		this._cbs.ontext(data);
	}
	//else, ignore remaining data
	//TODO add a way to remove current tag
};

Tokenizer.prototype.reset = function () {
	Tokenizer.call(this, { xmlMode: this._xmlMode, decodeEntities: this._decodeEntities }, this._cbs);
};

Tokenizer.prototype.getAbsoluteIndex = function () {
	return this._bufferOffset + this._index;
};

Tokenizer.prototype._getSection = function () {
	return this._buffer.substring(this._sectionStart, this._index);
};

Tokenizer.prototype._emitToken = function (name) {
	this._cbs[name](this._getSection());
	this._sectionStart = -1;
};

Tokenizer.prototype._emitPartial = function (value) {
	if (this._baseState !== TEXT) {
		this._cbs.onattribdata(value); //TODO implement the new event
	} else {
		this._cbs.ontext(value);
	}
};

},{"entities/lib/decode_codepoint.js":22,"entities/maps/entities.json":25,"entities/maps/legacy.json":26,"entities/maps/xml.json":27}],35:[function(require,module,exports){
"use strict";

module.exports = Stream;

var Parser = require("./Parser.js"),
    WritableStream = require("stream").Writable || require("readable-stream").Writable,
    StringDecoder = require("string_decoder").StringDecoder,
    Buffer = require("buffer").Buffer;

function Stream(cbs, options) {
	var parser = this._parser = new Parser(cbs, options);
	var decoder = this._decoder = new StringDecoder();

	WritableStream.call(this, { decodeStrings: false });

	this.once("finish", function () {
		parser.end(decoder.end());
	});
}

require("inherits")(Stream, WritableStream);

WritableStream.prototype._write = function (chunk, encoding, cb) {
	if (chunk instanceof Buffer) chunk = this._decoder.write(chunk);
	this._parser.write(chunk);
	cb();
};

},{"./Parser.js":31,"buffer":5,"inherits":38,"readable-stream":2,"stream":57,"string_decoder":3}],36:[function(require,module,exports){
"use strict";

var Parser = require("./Parser.js"),
    DomHandler = require("domhandler");

function defineProp(name, value) {
	delete module.exports[name];
	module.exports[name] = value;
	return value;
}

module.exports = {
	Parser: Parser,
	Tokenizer: require("./Tokenizer.js"),
	ElementType: require("domelementtype"),
	DomHandler: DomHandler,
	get FeedHandler() {
		return defineProp("FeedHandler", require("./FeedHandler.js"));
	},
	get Stream() {
		return defineProp("Stream", require("./Stream.js"));
	},
	get WritableStream() {
		return defineProp("WritableStream", require("./WritableStream.js"));
	},
	get ProxyHandler() {
		return defineProp("ProxyHandler", require("./ProxyHandler.js"));
	},
	get DomUtils() {
		return defineProp("DomUtils", require("domutils"));
	},
	get CollectingHandler() {
		return defineProp("CollectingHandler", require("./CollectingHandler.js"));
	},
	// For legacy support
	DefaultHandler: DomHandler,
	get RssHandler() {
		return defineProp("RssHandler", this.FeedHandler);
	},
	//helper methods
	parseDOM: function parseDOM(data, options) {
		var handler = new DomHandler(options);
		new Parser(handler, options).end(data);
		return handler.dom;
	},
	parseFeed: function parseFeed(feed, options) {
		var handler = new module.exports.FeedHandler(options);
		new Parser(handler, options).end(feed);
		return handler.dom;
	},
	createDomStream: function createDomStream(cb, options, elementCb) {
		var handler = new DomHandler(cb, options, elementCb);
		return new Parser(handler, options);
	},
	// List of all events that the parser emits
	EVENTS: { /* Format: eventname: number of arguments */
		attribute: 2,
		cdatastart: 0,
		cdataend: 0,
		text: 1,
		processinginstruction: 2,
		comment: 1,
		commentend: 0,
		closetag: 1,
		opentag: 2,
		opentagname: 1,
		error: 1,
		end: 0
	}
};

},{"./CollectingHandler.js":29,"./FeedHandler.js":30,"./Parser.js":31,"./ProxyHandler.js":32,"./Stream.js":33,"./Tokenizer.js":34,"./WritableStream.js":35,"domelementtype":9,"domhandler":10,"domutils":13}],37:[function(require,module,exports){
"use strict";

exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m;
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var nBits = -7;
  var i = isLE ? nBytes - 1 : 0;
  var d = isLE ? -1 : 1;
  var s = buffer[offset + i];

  i += d;

  e = s & (1 << -nBits) - 1;
  s >>= -nBits;
  nBits += eLen;
  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & (1 << -nBits) - 1;
  e >>= -nBits;
  nBits += mLen;
  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias;
  } else if (e === eMax) {
    return m ? NaN : (s ? -1 : 1) * Infinity;
  } else {
    m = m + Math.pow(2, mLen);
    e = e - eBias;
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
};

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c;
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var rt = mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
  var i = isLE ? 0 : nBytes - 1;
  var d = isLE ? 1 : -1;
  var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;

  value = Math.abs(value);

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0;
    e = eMax;
  } else {
    e = Math.floor(Math.log(value) / Math.LN2);
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--;
      c *= 2;
    }
    if (e + eBias >= 1) {
      value += rt / c;
    } else {
      value += rt * Math.pow(2, 1 - eBias);
    }
    if (value * c >= 2) {
      e++;
      c /= 2;
    }

    if (e + eBias >= eMax) {
      m = 0;
      e = eMax;
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * Math.pow(2, mLen);
      e = e + eBias;
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
      e = 0;
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = e << mLen | m;
  eLen += mLen;
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128;
};

},{}],38:[function(require,module,exports){
'use strict';

if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor;
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
    ctor.super_ = superCtor;
    var TempCtor = function TempCtor() {};
    TempCtor.prototype = superCtor.prototype;
    ctor.prototype = new TempCtor();
    ctor.prototype.constructor = ctor;
  };
}

},{}],39:[function(require,module,exports){
'use strict';

/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */

// The _isBuffer check is for Safari 5-7 support, because it's missing
// Object.prototype.constructor. Remove this eventually
module.exports = function (obj) {
  return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer);
};

function isBuffer(obj) {
  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj);
}

// For Node v0.10 support. Remove this eventually.
function isSlowBuffer(obj) {
  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0));
}

},{}],40:[function(require,module,exports){
'use strict';

var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};

},{}],41:[function(require,module,exports){
(function (process){
'use strict';

if (!process.version || process.version.indexOf('v0.') === 0 || process.version.indexOf('v1.') === 0 && process.version.indexOf('v1.8.') !== 0) {
  module.exports = nextTick;
} else {
  module.exports = process.nextTick;
}

function nextTick(fn, arg1, arg2, arg3) {
  if (typeof fn !== 'function') {
    throw new TypeError('"callback" argument must be a function');
  }
  var len = arguments.length;
  var args, i;
  switch (len) {
    case 0:
    case 1:
      return process.nextTick(fn);
    case 2:
      return process.nextTick(function afterTickOne() {
        fn.call(null, arg1);
      });
    case 3:
      return process.nextTick(function afterTickTwo() {
        fn.call(null, arg1, arg2);
      });
    case 4:
      return process.nextTick(function afterTickThree() {
        fn.call(null, arg1, arg2, arg3);
      });
    default:
      args = new Array(len - 1);
      i = 0;
      while (i < args.length) {
        args[i++] = arguments[i];
      }
      return process.nextTick(function afterTick() {
        fn.apply(null, args);
      });
  }
}

}).call(this,require('_process'))

},{"_process":42}],42:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
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
    var timeout = runTimeout(cleanUpNextTick);
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
    runClearTimeout(timeout);
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
        runTimeout(drainQueue);
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

},{}],43:[function(require,module,exports){
'use strict';

module.exports = require('./lib/_stream_duplex.js');

},{"./lib/_stream_duplex.js":44}],44:[function(require,module,exports){
// a duplex stream is just a stream that is both readable and writable.
// Since JS doesn't have multiple prototypal inheritance, this class
// prototypally inherits from Readable, and then parasitically from
// Writable.

'use strict';

/*<replacement>*/

var objectKeys = Object.keys || function (obj) {
  var keys = [];
  for (var key in obj) {
    keys.push(key);
  }return keys;
};
/*</replacement>*/

module.exports = Duplex;

/*<replacement>*/
var processNextTick = require('process-nextick-args');
/*</replacement>*/

/*<replacement>*/
var util = require('core-util-is');
util.inherits = require('inherits');
/*</replacement>*/

var Readable = require('./_stream_readable');
var Writable = require('./_stream_writable');

util.inherits(Duplex, Readable);

var keys = objectKeys(Writable.prototype);
for (var v = 0; v < keys.length; v++) {
  var method = keys[v];
  if (!Duplex.prototype[method]) Duplex.prototype[method] = Writable.prototype[method];
}

function Duplex(options) {
  if (!(this instanceof Duplex)) return new Duplex(options);

  Readable.call(this, options);
  Writable.call(this, options);

  if (options && options.readable === false) this.readable = false;

  if (options && options.writable === false) this.writable = false;

  this.allowHalfOpen = true;
  if (options && options.allowHalfOpen === false) this.allowHalfOpen = false;

  this.once('end', onend);
}

// the no-half-open enforcer
function onend() {
  // if we allow half-open state, or if the writable side ended,
  // then we're ok.
  if (this.allowHalfOpen || this._writableState.ended) return;

  // no more data can be written.
  // But allow more writes to happen in this tick.
  processNextTick(onEndNT, this);
}

function onEndNT(self) {
  self.end();
}

function forEach(xs, f) {
  for (var i = 0, l = xs.length; i < l; i++) {
    f(xs[i], i);
  }
}

},{"./_stream_readable":46,"./_stream_writable":48,"core-util-is":6,"inherits":38,"process-nextick-args":41}],45:[function(require,module,exports){
// a passthrough stream.
// basically just the most minimal sort of Transform stream.
// Every written chunk gets output as-is.

'use strict';

module.exports = PassThrough;

var Transform = require('./_stream_transform');

/*<replacement>*/
var util = require('core-util-is');
util.inherits = require('inherits');
/*</replacement>*/

util.inherits(PassThrough, Transform);

function PassThrough(options) {
  if (!(this instanceof PassThrough)) return new PassThrough(options);

  Transform.call(this, options);
}

PassThrough.prototype._transform = function (chunk, encoding, cb) {
  cb(null, chunk);
};

},{"./_stream_transform":47,"core-util-is":6,"inherits":38}],46:[function(require,module,exports){
(function (process){
'use strict';

module.exports = Readable;

/*<replacement>*/
var processNextTick = require('process-nextick-args');
/*</replacement>*/

/*<replacement>*/
var isArray = require('isarray');
/*</replacement>*/

/*<replacement>*/
var Duplex;
/*</replacement>*/

Readable.ReadableState = ReadableState;

/*<replacement>*/
var EE = require('events').EventEmitter;

var EElistenerCount = function EElistenerCount(emitter, type) {
  return emitter.listeners(type).length;
};
/*</replacement>*/

/*<replacement>*/
var Stream = require('./internal/streams/stream');
/*</replacement>*/

var Buffer = require('buffer').Buffer;
/*<replacement>*/
var bufferShim = require('buffer-shims');
/*</replacement>*/

/*<replacement>*/
var util = require('core-util-is');
util.inherits = require('inherits');
/*</replacement>*/

/*<replacement>*/
var debugUtil = require('util');
var debug = void 0;
if (debugUtil && debugUtil.debuglog) {
  debug = debugUtil.debuglog('stream');
} else {
  debug = function debug() {};
}
/*</replacement>*/

var BufferList = require('./internal/streams/BufferList');
var StringDecoder;

util.inherits(Readable, Stream);

var kProxyEvents = ['error', 'close', 'destroy', 'pause', 'resume'];

function prependListener(emitter, event, fn) {
  // Sadly this is not cacheable as some libraries bundle their own
  // event emitter implementation with them.
  if (typeof emitter.prependListener === 'function') {
    return emitter.prependListener(event, fn);
  } else {
    // This is a hack to make sure that our error handler is attached before any
    // userland ones.  NEVER DO THIS. This is here only because this code needs
    // to continue to work with older versions of Node.js that do not include
    // the prependListener() method. The goal is to eventually remove this hack.
    if (!emitter._events || !emitter._events[event]) emitter.on(event, fn);else if (isArray(emitter._events[event])) emitter._events[event].unshift(fn);else emitter._events[event] = [fn, emitter._events[event]];
  }
}

function ReadableState(options, stream) {
  Duplex = Duplex || require('./_stream_duplex');

  options = options || {};

  // object stream flag. Used to make read(n) ignore n and to
  // make all the buffer merging and length checks go away
  this.objectMode = !!options.objectMode;

  if (stream instanceof Duplex) this.objectMode = this.objectMode || !!options.readableObjectMode;

  // the point at which it stops calling _read() to fill the buffer
  // Note: 0 is a valid value, means "don't call _read preemptively ever"
  var hwm = options.highWaterMark;
  var defaultHwm = this.objectMode ? 16 : 16 * 1024;
  this.highWaterMark = hwm || hwm === 0 ? hwm : defaultHwm;

  // cast to ints.
  this.highWaterMark = ~~this.highWaterMark;

  // A linked list is used to store data chunks instead of an array because the
  // linked list can remove elements from the beginning faster than
  // array.shift()
  this.buffer = new BufferList();
  this.length = 0;
  this.pipes = null;
  this.pipesCount = 0;
  this.flowing = null;
  this.ended = false;
  this.endEmitted = false;
  this.reading = false;

  // a flag to be able to tell if the onwrite cb is called immediately,
  // or on a later tick.  We set this to true at first, because any
  // actions that shouldn't happen until "later" should generally also
  // not happen before the first write call.
  this.sync = true;

  // whenever we return null, then we set a flag to say
  // that we're awaiting a 'readable' event emission.
  this.needReadable = false;
  this.emittedReadable = false;
  this.readableListening = false;
  this.resumeScheduled = false;

  // Crypto is kind of old and crusty.  Historically, its default string
  // encoding is 'binary' so we have to make this configurable.
  // Everything else in the universe uses 'utf8', though.
  this.defaultEncoding = options.defaultEncoding || 'utf8';

  // when piping, we only care about 'readable' events that happen
  // after read()ing all the bytes and not getting any pushback.
  this.ranOut = false;

  // the number of writers that are awaiting a drain event in .pipe()s
  this.awaitDrain = 0;

  // if true, a maybeReadMore has been scheduled
  this.readingMore = false;

  this.decoder = null;
  this.encoding = null;
  if (options.encoding) {
    if (!StringDecoder) StringDecoder = require('string_decoder/').StringDecoder;
    this.decoder = new StringDecoder(options.encoding);
    this.encoding = options.encoding;
  }
}

function Readable(options) {
  Duplex = Duplex || require('./_stream_duplex');

  if (!(this instanceof Readable)) return new Readable(options);

  this._readableState = new ReadableState(options, this);

  // legacy
  this.readable = true;

  if (options && typeof options.read === 'function') this._read = options.read;

  Stream.call(this);
}

// Manually shove something into the read() buffer.
// This returns true if the highWaterMark has not been hit yet,
// similar to how Writable.write() returns true if you should
// write() some more.
Readable.prototype.push = function (chunk, encoding) {
  var state = this._readableState;

  if (!state.objectMode && typeof chunk === 'string') {
    encoding = encoding || state.defaultEncoding;
    if (encoding !== state.encoding) {
      chunk = bufferShim.from(chunk, encoding);
      encoding = '';
    }
  }

  return readableAddChunk(this, state, chunk, encoding, false);
};

// Unshift should *always* be something directly out of read()
Readable.prototype.unshift = function (chunk) {
  var state = this._readableState;
  return readableAddChunk(this, state, chunk, '', true);
};

Readable.prototype.isPaused = function () {
  return this._readableState.flowing === false;
};

function readableAddChunk(stream, state, chunk, encoding, addToFront) {
  var er = chunkInvalid(state, chunk);
  if (er) {
    stream.emit('error', er);
  } else if (chunk === null) {
    state.reading = false;
    onEofChunk(stream, state);
  } else if (state.objectMode || chunk && chunk.length > 0) {
    if (state.ended && !addToFront) {
      var e = new Error('stream.push() after EOF');
      stream.emit('error', e);
    } else if (state.endEmitted && addToFront) {
      var _e = new Error('stream.unshift() after end event');
      stream.emit('error', _e);
    } else {
      var skipAdd;
      if (state.decoder && !addToFront && !encoding) {
        chunk = state.decoder.write(chunk);
        skipAdd = !state.objectMode && chunk.length === 0;
      }

      if (!addToFront) state.reading = false;

      // Don't add to the buffer if we've decoded to an empty string chunk and
      // we're not in object mode
      if (!skipAdd) {
        // if we want the data now, just emit it.
        if (state.flowing && state.length === 0 && !state.sync) {
          stream.emit('data', chunk);
          stream.read(0);
        } else {
          // update the buffer info.
          state.length += state.objectMode ? 1 : chunk.length;
          if (addToFront) state.buffer.unshift(chunk);else state.buffer.push(chunk);

          if (state.needReadable) emitReadable(stream);
        }
      }

      maybeReadMore(stream, state);
    }
  } else if (!addToFront) {
    state.reading = false;
  }

  return needMoreData(state);
}

// if it's past the high water mark, we can push in some more.
// Also, if we have no data yet, we can stand some
// more bytes.  This is to work around cases where hwm=0,
// such as the repl.  Also, if the push() triggered a
// readable event, and the user called read(largeNumber) such that
// needReadable was set, then we ought to push more, so that another
// 'readable' event will be triggered.
function needMoreData(state) {
  return !state.ended && (state.needReadable || state.length < state.highWaterMark || state.length === 0);
}

// backwards compatibility.
Readable.prototype.setEncoding = function (enc) {
  if (!StringDecoder) StringDecoder = require('string_decoder/').StringDecoder;
  this._readableState.decoder = new StringDecoder(enc);
  this._readableState.encoding = enc;
  return this;
};

// Don't raise the hwm > 8MB
var MAX_HWM = 0x800000;
function computeNewHighWaterMark(n) {
  if (n >= MAX_HWM) {
    n = MAX_HWM;
  } else {
    // Get the next highest power of 2 to prevent increasing hwm excessively in
    // tiny amounts
    n--;
    n |= n >>> 1;
    n |= n >>> 2;
    n |= n >>> 4;
    n |= n >>> 8;
    n |= n >>> 16;
    n++;
  }
  return n;
}

// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function howMuchToRead(n, state) {
  if (n <= 0 || state.length === 0 && state.ended) return 0;
  if (state.objectMode) return 1;
  if (n !== n) {
    // Only flow one buffer at a time
    if (state.flowing && state.length) return state.buffer.head.data.length;else return state.length;
  }
  // If we're asking for more than the current hwm, then raise the hwm.
  if (n > state.highWaterMark) state.highWaterMark = computeNewHighWaterMark(n);
  if (n <= state.length) return n;
  // Don't have enough
  if (!state.ended) {
    state.needReadable = true;
    return 0;
  }
  return state.length;
}

// you can override either this method, or the async _read(n) below.
Readable.prototype.read = function (n) {
  debug('read', n);
  n = parseInt(n, 10);
  var state = this._readableState;
  var nOrig = n;

  if (n !== 0) state.emittedReadable = false;

  // if we're doing read(0) to trigger a readable event, but we
  // already have a bunch of data in the buffer, then just trigger
  // the 'readable' event and move on.
  if (n === 0 && state.needReadable && (state.length >= state.highWaterMark || state.ended)) {
    debug('read: emitReadable', state.length, state.ended);
    if (state.length === 0 && state.ended) endReadable(this);else emitReadable(this);
    return null;
  }

  n = howMuchToRead(n, state);

  // if we've ended, and we're now clear, then finish it up.
  if (n === 0 && state.ended) {
    if (state.length === 0) endReadable(this);
    return null;
  }

  // All the actual chunk generation logic needs to be
  // *below* the call to _read.  The reason is that in certain
  // synthetic stream cases, such as passthrough streams, _read
  // may be a completely synchronous operation which may change
  // the state of the read buffer, providing enough data when
  // before there was *not* enough.
  //
  // So, the steps are:
  // 1. Figure out what the state of things will be after we do
  // a read from the buffer.
  //
  // 2. If that resulting state will trigger a _read, then call _read.
  // Note that this may be asynchronous, or synchronous.  Yes, it is
  // deeply ugly to write APIs this way, but that still doesn't mean
  // that the Readable class should behave improperly, as streams are
  // designed to be sync/async agnostic.
  // Take note if the _read call is sync or async (ie, if the read call
  // has returned yet), so that we know whether or not it's safe to emit
  // 'readable' etc.
  //
  // 3. Actually pull the requested chunks out of the buffer and return.

  // if we need a readable event, then we need to do some reading.
  var doRead = state.needReadable;
  debug('need readable', doRead);

  // if we currently have less than the highWaterMark, then also read some
  if (state.length === 0 || state.length - n < state.highWaterMark) {
    doRead = true;
    debug('length less than watermark', doRead);
  }

  // however, if we've ended, then there's no point, and if we're already
  // reading, then it's unnecessary.
  if (state.ended || state.reading) {
    doRead = false;
    debug('reading or ended', doRead);
  } else if (doRead) {
    debug('do read');
    state.reading = true;
    state.sync = true;
    // if the length is currently zero, then we *need* a readable event.
    if (state.length === 0) state.needReadable = true;
    // call internal read method
    this._read(state.highWaterMark);
    state.sync = false;
    // If _read pushed data synchronously, then `reading` will be false,
    // and we need to re-evaluate how much data we can return to the user.
    if (!state.reading) n = howMuchToRead(nOrig, state);
  }

  var ret;
  if (n > 0) ret = fromList(n, state);else ret = null;

  if (ret === null) {
    state.needReadable = true;
    n = 0;
  } else {
    state.length -= n;
  }

  if (state.length === 0) {
    // If we have nothing in the buffer, then we want to know
    // as soon as we *do* get something into the buffer.
    if (!state.ended) state.needReadable = true;

    // If we tried to read() past the EOF, then emit end on the next tick.
    if (nOrig !== n && state.ended) endReadable(this);
  }

  if (ret !== null) this.emit('data', ret);

  return ret;
};

function chunkInvalid(state, chunk) {
  var er = null;
  if (!Buffer.isBuffer(chunk) && typeof chunk !== 'string' && chunk !== null && chunk !== undefined && !state.objectMode) {
    er = new TypeError('Invalid non-string/buffer chunk');
  }
  return er;
}

function onEofChunk(stream, state) {
  if (state.ended) return;
  if (state.decoder) {
    var chunk = state.decoder.end();
    if (chunk && chunk.length) {
      state.buffer.push(chunk);
      state.length += state.objectMode ? 1 : chunk.length;
    }
  }
  state.ended = true;

  // emit 'readable' now to make sure it gets picked up.
  emitReadable(stream);
}

// Don't emit readable right away in sync mode, because this can trigger
// another read() call => stack overflow.  This way, it might trigger
// a nextTick recursion warning, but that's not so bad.
function emitReadable(stream) {
  var state = stream._readableState;
  state.needReadable = false;
  if (!state.emittedReadable) {
    debug('emitReadable', state.flowing);
    state.emittedReadable = true;
    if (state.sync) processNextTick(emitReadable_, stream);else emitReadable_(stream);
  }
}

function emitReadable_(stream) {
  debug('emit readable');
  stream.emit('readable');
  flow(stream);
}

// at this point, the user has presumably seen the 'readable' event,
// and called read() to consume some data.  that may have triggered
// in turn another _read(n) call, in which case reading = true if
// it's in progress.
// However, if we're not ended, or reading, and the length < hwm,
// then go ahead and try to read some more preemptively.
function maybeReadMore(stream, state) {
  if (!state.readingMore) {
    state.readingMore = true;
    processNextTick(maybeReadMore_, stream, state);
  }
}

function maybeReadMore_(stream, state) {
  var len = state.length;
  while (!state.reading && !state.flowing && !state.ended && state.length < state.highWaterMark) {
    debug('maybeReadMore read 0');
    stream.read(0);
    if (len === state.length)
      // didn't get any data, stop spinning.
      break;else len = state.length;
  }
  state.readingMore = false;
}

// abstract method.  to be overridden in specific implementation classes.
// call cb(er, data) where data is <= n in length.
// for virtual (non-string, non-buffer) streams, "length" is somewhat
// arbitrary, and perhaps not very meaningful.
Readable.prototype._read = function (n) {
  this.emit('error', new Error('_read() is not implemented'));
};

Readable.prototype.pipe = function (dest, pipeOpts) {
  var src = this;
  var state = this._readableState;

  switch (state.pipesCount) {
    case 0:
      state.pipes = dest;
      break;
    case 1:
      state.pipes = [state.pipes, dest];
      break;
    default:
      state.pipes.push(dest);
      break;
  }
  state.pipesCount += 1;
  debug('pipe count=%d opts=%j', state.pipesCount, pipeOpts);

  var doEnd = (!pipeOpts || pipeOpts.end !== false) && dest !== process.stdout && dest !== process.stderr;

  var endFn = doEnd ? onend : cleanup;
  if (state.endEmitted) processNextTick(endFn);else src.once('end', endFn);

  dest.on('unpipe', onunpipe);
  function onunpipe(readable) {
    debug('onunpipe');
    if (readable === src) {
      cleanup();
    }
  }

  function onend() {
    debug('onend');
    dest.end();
  }

  // when the dest drains, it reduces the awaitDrain counter
  // on the source.  This would be more elegant with a .once()
  // handler in flow(), but adding and removing repeatedly is
  // too slow.
  var ondrain = pipeOnDrain(src);
  dest.on('drain', ondrain);

  var cleanedUp = false;
  function cleanup() {
    debug('cleanup');
    // cleanup event handlers once the pipe is broken
    dest.removeListener('close', onclose);
    dest.removeListener('finish', onfinish);
    dest.removeListener('drain', ondrain);
    dest.removeListener('error', onerror);
    dest.removeListener('unpipe', onunpipe);
    src.removeListener('end', onend);
    src.removeListener('end', cleanup);
    src.removeListener('data', ondata);

    cleanedUp = true;

    // if the reader is waiting for a drain event from this
    // specific writer, then it would cause it to never start
    // flowing again.
    // So, if this is awaiting a drain, then we just call it now.
    // If we don't know, then assume that we are waiting for one.
    if (state.awaitDrain && (!dest._writableState || dest._writableState.needDrain)) ondrain();
  }

  // If the user pushes more data while we're writing to dest then we'll end up
  // in ondata again. However, we only want to increase awaitDrain once because
  // dest will only emit one 'drain' event for the multiple writes.
  // => Introduce a guard on increasing awaitDrain.
  var increasedAwaitDrain = false;
  src.on('data', ondata);
  function ondata(chunk) {
    debug('ondata');
    increasedAwaitDrain = false;
    var ret = dest.write(chunk);
    if (false === ret && !increasedAwaitDrain) {
      // If the user unpiped during `dest.write()`, it is possible
      // to get stuck in a permanently paused state if that write
      // also returned false.
      // => Check whether `dest` is still a piping destination.
      if ((state.pipesCount === 1 && state.pipes === dest || state.pipesCount > 1 && indexOf(state.pipes, dest) !== -1) && !cleanedUp) {
        debug('false write response, pause', src._readableState.awaitDrain);
        src._readableState.awaitDrain++;
        increasedAwaitDrain = true;
      }
      src.pause();
    }
  }

  // if the dest has an error, then stop piping into it.
  // however, don't suppress the throwing behavior for this.
  function onerror(er) {
    debug('onerror', er);
    unpipe();
    dest.removeListener('error', onerror);
    if (EElistenerCount(dest, 'error') === 0) dest.emit('error', er);
  }

  // Make sure our error handler is attached before userland ones.
  prependListener(dest, 'error', onerror);

  // Both close and finish should trigger unpipe, but only once.
  function onclose() {
    dest.removeListener('finish', onfinish);
    unpipe();
  }
  dest.once('close', onclose);
  function onfinish() {
    debug('onfinish');
    dest.removeListener('close', onclose);
    unpipe();
  }
  dest.once('finish', onfinish);

  function unpipe() {
    debug('unpipe');
    src.unpipe(dest);
  }

  // tell the dest that it's being piped to
  dest.emit('pipe', src);

  // start the flow if it hasn't been started already.
  if (!state.flowing) {
    debug('pipe resume');
    src.resume();
  }

  return dest;
};

function pipeOnDrain(src) {
  return function () {
    var state = src._readableState;
    debug('pipeOnDrain', state.awaitDrain);
    if (state.awaitDrain) state.awaitDrain--;
    if (state.awaitDrain === 0 && EElistenerCount(src, 'data')) {
      state.flowing = true;
      flow(src);
    }
  };
}

Readable.prototype.unpipe = function (dest) {
  var state = this._readableState;

  // if we're not piping anywhere, then do nothing.
  if (state.pipesCount === 0) return this;

  // just one destination.  most common case.
  if (state.pipesCount === 1) {
    // passed in one, but it's not the right one.
    if (dest && dest !== state.pipes) return this;

    if (!dest) dest = state.pipes;

    // got a match.
    state.pipes = null;
    state.pipesCount = 0;
    state.flowing = false;
    if (dest) dest.emit('unpipe', this);
    return this;
  }

  // slow case. multiple pipe destinations.

  if (!dest) {
    // remove all.
    var dests = state.pipes;
    var len = state.pipesCount;
    state.pipes = null;
    state.pipesCount = 0;
    state.flowing = false;

    for (var i = 0; i < len; i++) {
      dests[i].emit('unpipe', this);
    }return this;
  }

  // try to find the right one.
  var index = indexOf(state.pipes, dest);
  if (index === -1) return this;

  state.pipes.splice(index, 1);
  state.pipesCount -= 1;
  if (state.pipesCount === 1) state.pipes = state.pipes[0];

  dest.emit('unpipe', this);

  return this;
};

// set up data events if they are asked for
// Ensure readable listeners eventually get something
Readable.prototype.on = function (ev, fn) {
  var res = Stream.prototype.on.call(this, ev, fn);

  if (ev === 'data') {
    // Start flowing on next tick if stream isn't explicitly paused
    if (this._readableState.flowing !== false) this.resume();
  } else if (ev === 'readable') {
    var state = this._readableState;
    if (!state.endEmitted && !state.readableListening) {
      state.readableListening = state.needReadable = true;
      state.emittedReadable = false;
      if (!state.reading) {
        processNextTick(nReadingNextTick, this);
      } else if (state.length) {
        emitReadable(this, state);
      }
    }
  }

  return res;
};
Readable.prototype.addListener = Readable.prototype.on;

function nReadingNextTick(self) {
  debug('readable nexttick read 0');
  self.read(0);
}

// pause() and resume() are remnants of the legacy readable stream API
// If the user uses them, then switch into old mode.
Readable.prototype.resume = function () {
  var state = this._readableState;
  if (!state.flowing) {
    debug('resume');
    state.flowing = true;
    resume(this, state);
  }
  return this;
};

function resume(stream, state) {
  if (!state.resumeScheduled) {
    state.resumeScheduled = true;
    processNextTick(resume_, stream, state);
  }
}

function resume_(stream, state) {
  if (!state.reading) {
    debug('resume read 0');
    stream.read(0);
  }

  state.resumeScheduled = false;
  state.awaitDrain = 0;
  stream.emit('resume');
  flow(stream);
  if (state.flowing && !state.reading) stream.read(0);
}

Readable.prototype.pause = function () {
  debug('call pause flowing=%j', this._readableState.flowing);
  if (false !== this._readableState.flowing) {
    debug('pause');
    this._readableState.flowing = false;
    this.emit('pause');
  }
  return this;
};

function flow(stream) {
  var state = stream._readableState;
  debug('flow', state.flowing);
  while (state.flowing && stream.read() !== null) {}
}

// wrap an old-style stream as the async data source.
// This is *not* part of the readable stream interface.
// It is an ugly unfortunate mess of history.
Readable.prototype.wrap = function (stream) {
  var state = this._readableState;
  var paused = false;

  var self = this;
  stream.on('end', function () {
    debug('wrapped end');
    if (state.decoder && !state.ended) {
      var chunk = state.decoder.end();
      if (chunk && chunk.length) self.push(chunk);
    }

    self.push(null);
  });

  stream.on('data', function (chunk) {
    debug('wrapped data');
    if (state.decoder) chunk = state.decoder.write(chunk);

    // don't skip over falsy values in objectMode
    if (state.objectMode && (chunk === null || chunk === undefined)) return;else if (!state.objectMode && (!chunk || !chunk.length)) return;

    var ret = self.push(chunk);
    if (!ret) {
      paused = true;
      stream.pause();
    }
  });

  // proxy all the other methods.
  // important when wrapping filters and duplexes.
  for (var i in stream) {
    if (this[i] === undefined && typeof stream[i] === 'function') {
      this[i] = function (method) {
        return function () {
          return stream[method].apply(stream, arguments);
        };
      }(i);
    }
  }

  // proxy certain important events.
  for (var n = 0; n < kProxyEvents.length; n++) {
    stream.on(kProxyEvents[n], self.emit.bind(self, kProxyEvents[n]));
  }

  // when we try to consume some more bytes, simply unpause the
  // underlying stream.
  self._read = function (n) {
    debug('wrapped _read', n);
    if (paused) {
      paused = false;
      stream.resume();
    }
  };

  return self;
};

// exposed for testing purposes only.
Readable._fromList = fromList;

// Pluck off n bytes from an array of buffers.
// Length is the combined lengths of all the buffers in the list.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function fromList(n, state) {
  // nothing buffered
  if (state.length === 0) return null;

  var ret;
  if (state.objectMode) ret = state.buffer.shift();else if (!n || n >= state.length) {
    // read it all, truncate the list
    if (state.decoder) ret = state.buffer.join('');else if (state.buffer.length === 1) ret = state.buffer.head.data;else ret = state.buffer.concat(state.length);
    state.buffer.clear();
  } else {
    // read part of list
    ret = fromListPartial(n, state.buffer, state.decoder);
  }

  return ret;
}

// Extracts only enough buffered data to satisfy the amount requested.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function fromListPartial(n, list, hasStrings) {
  var ret;
  if (n < list.head.data.length) {
    // slice is the same for buffers and strings
    ret = list.head.data.slice(0, n);
    list.head.data = list.head.data.slice(n);
  } else if (n === list.head.data.length) {
    // first chunk is a perfect match
    ret = list.shift();
  } else {
    // result spans more than one buffer
    ret = hasStrings ? copyFromBufferString(n, list) : copyFromBuffer(n, list);
  }
  return ret;
}

// Copies a specified amount of characters from the list of buffered data
// chunks.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function copyFromBufferString(n, list) {
  var p = list.head;
  var c = 1;
  var ret = p.data;
  n -= ret.length;
  while (p = p.next) {
    var str = p.data;
    var nb = n > str.length ? str.length : n;
    if (nb === str.length) ret += str;else ret += str.slice(0, n);
    n -= nb;
    if (n === 0) {
      if (nb === str.length) {
        ++c;
        if (p.next) list.head = p.next;else list.head = list.tail = null;
      } else {
        list.head = p;
        p.data = str.slice(nb);
      }
      break;
    }
    ++c;
  }
  list.length -= c;
  return ret;
}

// Copies a specified amount of bytes from the list of buffered data chunks.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function copyFromBuffer(n, list) {
  var ret = bufferShim.allocUnsafe(n);
  var p = list.head;
  var c = 1;
  p.data.copy(ret);
  n -= p.data.length;
  while (p = p.next) {
    var buf = p.data;
    var nb = n > buf.length ? buf.length : n;
    buf.copy(ret, ret.length - n, 0, nb);
    n -= nb;
    if (n === 0) {
      if (nb === buf.length) {
        ++c;
        if (p.next) list.head = p.next;else list.head = list.tail = null;
      } else {
        list.head = p;
        p.data = buf.slice(nb);
      }
      break;
    }
    ++c;
  }
  list.length -= c;
  return ret;
}

function endReadable(stream) {
  var state = stream._readableState;

  // If we get here before consuming all the bytes, then that is a
  // bug in node.  Should never happen.
  if (state.length > 0) throw new Error('"endReadable()" called on non-empty stream');

  if (!state.endEmitted) {
    state.ended = true;
    processNextTick(endReadableNT, state, stream);
  }
}

function endReadableNT(state, stream) {
  // Check that we didn't get one last unshift.
  if (!state.endEmitted && state.length === 0) {
    state.endEmitted = true;
    stream.readable = false;
    stream.emit('end');
  }
}

function forEach(xs, f) {
  for (var i = 0, l = xs.length; i < l; i++) {
    f(xs[i], i);
  }
}

function indexOf(xs, x) {
  for (var i = 0, l = xs.length; i < l; i++) {
    if (xs[i] === x) return i;
  }
  return -1;
}

}).call(this,require('_process'))

},{"./_stream_duplex":44,"./internal/streams/BufferList":49,"./internal/streams/stream":50,"_process":42,"buffer":5,"buffer-shims":4,"core-util-is":6,"events":28,"inherits":38,"isarray":40,"process-nextick-args":41,"string_decoder/":58,"util":2}],47:[function(require,module,exports){
// a transform stream is a readable/writable stream where you do
// something with the data.  Sometimes it's called a "filter",
// but that's not a great name for it, since that implies a thing where
// some bits pass through, and others are simply ignored.  (That would
// be a valid example of a transform, of course.)
//
// While the output is causally related to the input, it's not a
// necessarily symmetric or synchronous transformation.  For example,
// a zlib stream might take multiple plain-text writes(), and then
// emit a single compressed chunk some time in the future.
//
// Here's how this works:
//
// The Transform stream has all the aspects of the readable and writable
// stream classes.  When you write(chunk), that calls _write(chunk,cb)
// internally, and returns false if there's a lot of pending writes
// buffered up.  When you call read(), that calls _read(n) until
// there's enough pending readable data buffered up.
//
// In a transform stream, the written data is placed in a buffer.  When
// _read(n) is called, it transforms the queued up data, calling the
// buffered _write cb's as it consumes chunks.  If consuming a single
// written chunk would result in multiple output chunks, then the first
// outputted bit calls the readcb, and subsequent chunks just go into
// the read buffer, and will cause it to emit 'readable' if necessary.
//
// This way, back-pressure is actually determined by the reading side,
// since _read has to be called to start processing a new chunk.  However,
// a pathological inflate type of transform can cause excessive buffering
// here.  For example, imagine a stream where every byte of input is
// interpreted as an integer from 0-255, and then results in that many
// bytes of output.  Writing the 4 bytes {ff,ff,ff,ff} would result in
// 1kb of data being output.  In this case, you could write a very small
// amount of input, and end up with a very large amount of output.  In
// such a pathological inflating mechanism, there'd be no way to tell
// the system to stop doing the transform.  A single 4MB write could
// cause the system to run out of memory.
//
// However, even in such a pathological case, only a single written chunk
// would be consumed, and then the rest would wait (un-transformed) until
// the results of the previous transformed chunk were consumed.

'use strict';

module.exports = Transform;

var Duplex = require('./_stream_duplex');

/*<replacement>*/
var util = require('core-util-is');
util.inherits = require('inherits');
/*</replacement>*/

util.inherits(Transform, Duplex);

function TransformState(stream) {
  this.afterTransform = function (er, data) {
    return afterTransform(stream, er, data);
  };

  this.needTransform = false;
  this.transforming = false;
  this.writecb = null;
  this.writechunk = null;
  this.writeencoding = null;
}

function afterTransform(stream, er, data) {
  var ts = stream._transformState;
  ts.transforming = false;

  var cb = ts.writecb;

  if (!cb) return stream.emit('error', new Error('no writecb in Transform class'));

  ts.writechunk = null;
  ts.writecb = null;

  if (data !== null && data !== undefined) stream.push(data);

  cb(er);

  var rs = stream._readableState;
  rs.reading = false;
  if (rs.needReadable || rs.length < rs.highWaterMark) {
    stream._read(rs.highWaterMark);
  }
}

function Transform(options) {
  if (!(this instanceof Transform)) return new Transform(options);

  Duplex.call(this, options);

  this._transformState = new TransformState(this);

  var stream = this;

  // start out asking for a readable event once data is transformed.
  this._readableState.needReadable = true;

  // we have implemented the _read method, and done the other things
  // that Readable wants before the first _read call, so unset the
  // sync guard flag.
  this._readableState.sync = false;

  if (options) {
    if (typeof options.transform === 'function') this._transform = options.transform;

    if (typeof options.flush === 'function') this._flush = options.flush;
  }

  // When the writable side finishes, then flush out anything remaining.
  this.once('prefinish', function () {
    if (typeof this._flush === 'function') this._flush(function (er, data) {
      done(stream, er, data);
    });else done(stream);
  });
}

Transform.prototype.push = function (chunk, encoding) {
  this._transformState.needTransform = false;
  return Duplex.prototype.push.call(this, chunk, encoding);
};

// This is the part where you do stuff!
// override this function in implementation classes.
// 'chunk' is an input chunk.
//
// Call `push(newChunk)` to pass along transformed output
// to the readable side.  You may call 'push' zero or more times.
//
// Call `cb(err)` when you are done with this chunk.  If you pass
// an error, then that'll put the hurt on the whole operation.  If you
// never call cb(), then you'll never get another chunk.
Transform.prototype._transform = function (chunk, encoding, cb) {
  throw new Error('_transform() is not implemented');
};

Transform.prototype._write = function (chunk, encoding, cb) {
  var ts = this._transformState;
  ts.writecb = cb;
  ts.writechunk = chunk;
  ts.writeencoding = encoding;
  if (!ts.transforming) {
    var rs = this._readableState;
    if (ts.needTransform || rs.needReadable || rs.length < rs.highWaterMark) this._read(rs.highWaterMark);
  }
};

// Doesn't matter what the args are here.
// _transform does all the work.
// That we got here means that the readable side wants more data.
Transform.prototype._read = function (n) {
  var ts = this._transformState;

  if (ts.writechunk !== null && ts.writecb && !ts.transforming) {
    ts.transforming = true;
    this._transform(ts.writechunk, ts.writeencoding, ts.afterTransform);
  } else {
    // mark that we need a transform, so that any data that comes in
    // will get processed, now that we've asked for it.
    ts.needTransform = true;
  }
};

function done(stream, er, data) {
  if (er) return stream.emit('error', er);

  if (data !== null && data !== undefined) stream.push(data);

  // if there's nothing in the write buffer, then that means
  // that nothing more will ever be provided
  var ws = stream._writableState;
  var ts = stream._transformState;

  if (ws.length) throw new Error('Calling transform done when ws.length != 0');

  if (ts.transforming) throw new Error('Calling transform done when still transforming');

  return stream.push(null);
}

},{"./_stream_duplex":44,"core-util-is":6,"inherits":38}],48:[function(require,module,exports){
(function (process){
// A bit simpler than readable streams.
// Implement an async ._write(chunk, encoding, cb), and it'll handle all
// the drain event emission and buffering.

'use strict';

module.exports = Writable;

/*<replacement>*/
var processNextTick = require('process-nextick-args');
/*</replacement>*/

/*<replacement>*/
var asyncWrite = !process.browser && ['v0.10', 'v0.9.'].indexOf(process.version.slice(0, 5)) > -1 ? setImmediate : processNextTick;
/*</replacement>*/

/*<replacement>*/
var Duplex;
/*</replacement>*/

Writable.WritableState = WritableState;

/*<replacement>*/
var util = require('core-util-is');
util.inherits = require('inherits');
/*</replacement>*/

/*<replacement>*/
var internalUtil = {
  deprecate: require('util-deprecate')
};
/*</replacement>*/

/*<replacement>*/
var Stream = require('./internal/streams/stream');
/*</replacement>*/

var Buffer = require('buffer').Buffer;
/*<replacement>*/
var bufferShim = require('buffer-shims');
/*</replacement>*/

util.inherits(Writable, Stream);

function nop() {}

function WriteReq(chunk, encoding, cb) {
  this.chunk = chunk;
  this.encoding = encoding;
  this.callback = cb;
  this.next = null;
}

function WritableState(options, stream) {
  Duplex = Duplex || require('./_stream_duplex');

  options = options || {};

  // object stream flag to indicate whether or not this stream
  // contains buffers or objects.
  this.objectMode = !!options.objectMode;

  if (stream instanceof Duplex) this.objectMode = this.objectMode || !!options.writableObjectMode;

  // the point at which write() starts returning false
  // Note: 0 is a valid value, means that we always return false if
  // the entire buffer is not flushed immediately on write()
  var hwm = options.highWaterMark;
  var defaultHwm = this.objectMode ? 16 : 16 * 1024;
  this.highWaterMark = hwm || hwm === 0 ? hwm : defaultHwm;

  // cast to ints.
  this.highWaterMark = ~~this.highWaterMark;

  // drain event flag.
  this.needDrain = false;
  // at the start of calling end()
  this.ending = false;
  // when end() has been called, and returned
  this.ended = false;
  // when 'finish' is emitted
  this.finished = false;

  // should we decode strings into buffers before passing to _write?
  // this is here so that some node-core streams can optimize string
  // handling at a lower level.
  var noDecode = options.decodeStrings === false;
  this.decodeStrings = !noDecode;

  // Crypto is kind of old and crusty.  Historically, its default string
  // encoding is 'binary' so we have to make this configurable.
  // Everything else in the universe uses 'utf8', though.
  this.defaultEncoding = options.defaultEncoding || 'utf8';

  // not an actual buffer we keep track of, but a measurement
  // of how much we're waiting to get pushed to some underlying
  // socket or file.
  this.length = 0;

  // a flag to see when we're in the middle of a write.
  this.writing = false;

  // when true all writes will be buffered until .uncork() call
  this.corked = 0;

  // a flag to be able to tell if the onwrite cb is called immediately,
  // or on a later tick.  We set this to true at first, because any
  // actions that shouldn't happen until "later" should generally also
  // not happen before the first write call.
  this.sync = true;

  // a flag to know if we're processing previously buffered items, which
  // may call the _write() callback in the same tick, so that we don't
  // end up in an overlapped onwrite situation.
  this.bufferProcessing = false;

  // the callback that's passed to _write(chunk,cb)
  this.onwrite = function (er) {
    onwrite(stream, er);
  };

  // the callback that the user supplies to write(chunk,encoding,cb)
  this.writecb = null;

  // the amount that is being written when _write is called.
  this.writelen = 0;

  this.bufferedRequest = null;
  this.lastBufferedRequest = null;

  // number of pending user-supplied write callbacks
  // this must be 0 before 'finish' can be emitted
  this.pendingcb = 0;

  // emit prefinish if the only thing we're waiting for is _write cbs
  // This is relevant for synchronous Transform streams
  this.prefinished = false;

  // True if the error was already emitted and should not be thrown again
  this.errorEmitted = false;

  // count buffered requests
  this.bufferedRequestCount = 0;

  // allocate the first CorkedRequest, there is always
  // one allocated and free to use, and we maintain at most two
  this.corkedRequestsFree = new CorkedRequest(this);
}

WritableState.prototype.getBuffer = function getBuffer() {
  var current = this.bufferedRequest;
  var out = [];
  while (current) {
    out.push(current);
    current = current.next;
  }
  return out;
};

(function () {
  try {
    Object.defineProperty(WritableState.prototype, 'buffer', {
      get: internalUtil.deprecate(function () {
        return this.getBuffer();
      }, '_writableState.buffer is deprecated. Use _writableState.getBuffer ' + 'instead.')
    });
  } catch (_) {}
})();

// Test _writableState for inheritance to account for Duplex streams,
// whose prototype chain only points to Readable.
var realHasInstance;
if (typeof Symbol === 'function' && Symbol.hasInstance && typeof Function.prototype[Symbol.hasInstance] === 'function') {
  realHasInstance = Function.prototype[Symbol.hasInstance];
  Object.defineProperty(Writable, Symbol.hasInstance, {
    value: function value(object) {
      if (realHasInstance.call(this, object)) return true;

      return object && object._writableState instanceof WritableState;
    }
  });
} else {
  realHasInstance = function realHasInstance(object) {
    return object instanceof this;
  };
}

function Writable(options) {
  Duplex = Duplex || require('./_stream_duplex');

  // Writable ctor is applied to Duplexes, too.
  // `realHasInstance` is necessary because using plain `instanceof`
  // would return false, as no `_writableState` property is attached.

  // Trying to use the custom `instanceof` for Writable here will also break the
  // Node.js LazyTransform implementation, which has a non-trivial getter for
  // `_writableState` that would lead to infinite recursion.
  if (!realHasInstance.call(Writable, this) && !(this instanceof Duplex)) {
    return new Writable(options);
  }

  this._writableState = new WritableState(options, this);

  // legacy.
  this.writable = true;

  if (options) {
    if (typeof options.write === 'function') this._write = options.write;

    if (typeof options.writev === 'function') this._writev = options.writev;
  }

  Stream.call(this);
}

// Otherwise people can pipe Writable streams, which is just wrong.
Writable.prototype.pipe = function () {
  this.emit('error', new Error('Cannot pipe, not readable'));
};

function writeAfterEnd(stream, cb) {
  var er = new Error('write after end');
  // TODO: defer error events consistently everywhere, not just the cb
  stream.emit('error', er);
  processNextTick(cb, er);
}

// Checks that a user-supplied chunk is valid, especially for the particular
// mode the stream is in. Currently this means that `null` is never accepted
// and undefined/non-string values are only allowed in object mode.
function validChunk(stream, state, chunk, cb) {
  var valid = true;
  var er = false;

  if (chunk === null) {
    er = new TypeError('May not write null values to stream');
  } else if (typeof chunk !== 'string' && chunk !== undefined && !state.objectMode) {
    er = new TypeError('Invalid non-string/buffer chunk');
  }
  if (er) {
    stream.emit('error', er);
    processNextTick(cb, er);
    valid = false;
  }
  return valid;
}

Writable.prototype.write = function (chunk, encoding, cb) {
  var state = this._writableState;
  var ret = false;
  var isBuf = Buffer.isBuffer(chunk);

  if (typeof encoding === 'function') {
    cb = encoding;
    encoding = null;
  }

  if (isBuf) encoding = 'buffer';else if (!encoding) encoding = state.defaultEncoding;

  if (typeof cb !== 'function') cb = nop;

  if (state.ended) writeAfterEnd(this, cb);else if (isBuf || validChunk(this, state, chunk, cb)) {
    state.pendingcb++;
    ret = writeOrBuffer(this, state, isBuf, chunk, encoding, cb);
  }

  return ret;
};

Writable.prototype.cork = function () {
  var state = this._writableState;

  state.corked++;
};

Writable.prototype.uncork = function () {
  var state = this._writableState;

  if (state.corked) {
    state.corked--;

    if (!state.writing && !state.corked && !state.finished && !state.bufferProcessing && state.bufferedRequest) clearBuffer(this, state);
  }
};

Writable.prototype.setDefaultEncoding = function setDefaultEncoding(encoding) {
  // node::ParseEncoding() requires lower case.
  if (typeof encoding === 'string') encoding = encoding.toLowerCase();
  if (!(['hex', 'utf8', 'utf-8', 'ascii', 'binary', 'base64', 'ucs2', 'ucs-2', 'utf16le', 'utf-16le', 'raw'].indexOf((encoding + '').toLowerCase()) > -1)) throw new TypeError('Unknown encoding: ' + encoding);
  this._writableState.defaultEncoding = encoding;
  return this;
};

function decodeChunk(state, chunk, encoding) {
  if (!state.objectMode && state.decodeStrings !== false && typeof chunk === 'string') {
    chunk = bufferShim.from(chunk, encoding);
  }
  return chunk;
}

// if we're already writing something, then just put this
// in the queue, and wait our turn.  Otherwise, call _write
// If we return false, then we need a drain event, so set that flag.
function writeOrBuffer(stream, state, isBuf, chunk, encoding, cb) {
  if (!isBuf) {
    chunk = decodeChunk(state, chunk, encoding);
    if (Buffer.isBuffer(chunk)) encoding = 'buffer';
  }
  var len = state.objectMode ? 1 : chunk.length;

  state.length += len;

  var ret = state.length < state.highWaterMark;
  // we must ensure that previous needDrain will not be reset to false.
  if (!ret) state.needDrain = true;

  if (state.writing || state.corked) {
    var last = state.lastBufferedRequest;
    state.lastBufferedRequest = new WriteReq(chunk, encoding, cb);
    if (last) {
      last.next = state.lastBufferedRequest;
    } else {
      state.bufferedRequest = state.lastBufferedRequest;
    }
    state.bufferedRequestCount += 1;
  } else {
    doWrite(stream, state, false, len, chunk, encoding, cb);
  }

  return ret;
}

function doWrite(stream, state, writev, len, chunk, encoding, cb) {
  state.writelen = len;
  state.writecb = cb;
  state.writing = true;
  state.sync = true;
  if (writev) stream._writev(chunk, state.onwrite);else stream._write(chunk, encoding, state.onwrite);
  state.sync = false;
}

function onwriteError(stream, state, sync, er, cb) {
  --state.pendingcb;
  if (sync) processNextTick(cb, er);else cb(er);

  stream._writableState.errorEmitted = true;
  stream.emit('error', er);
}

function onwriteStateUpdate(state) {
  state.writing = false;
  state.writecb = null;
  state.length -= state.writelen;
  state.writelen = 0;
}

function onwrite(stream, er) {
  var state = stream._writableState;
  var sync = state.sync;
  var cb = state.writecb;

  onwriteStateUpdate(state);

  if (er) onwriteError(stream, state, sync, er, cb);else {
    // Check if we're actually ready to finish, but don't emit yet
    var finished = needFinish(state);

    if (!finished && !state.corked && !state.bufferProcessing && state.bufferedRequest) {
      clearBuffer(stream, state);
    }

    if (sync) {
      /*<replacement>*/
      asyncWrite(afterWrite, stream, state, finished, cb);
      /*</replacement>*/
    } else {
      afterWrite(stream, state, finished, cb);
    }
  }
}

function afterWrite(stream, state, finished, cb) {
  if (!finished) onwriteDrain(stream, state);
  state.pendingcb--;
  cb();
  finishMaybe(stream, state);
}

// Must force callback to be called on nextTick, so that we don't
// emit 'drain' before the write() consumer gets the 'false' return
// value, and has a chance to attach a 'drain' listener.
function onwriteDrain(stream, state) {
  if (state.length === 0 && state.needDrain) {
    state.needDrain = false;
    stream.emit('drain');
  }
}

// if there's something in the buffer waiting, then process it
function clearBuffer(stream, state) {
  state.bufferProcessing = true;
  var entry = state.bufferedRequest;

  if (stream._writev && entry && entry.next) {
    // Fast case, write everything using _writev()
    var l = state.bufferedRequestCount;
    var buffer = new Array(l);
    var holder = state.corkedRequestsFree;
    holder.entry = entry;

    var count = 0;
    while (entry) {
      buffer[count] = entry;
      entry = entry.next;
      count += 1;
    }

    doWrite(stream, state, true, state.length, buffer, '', holder.finish);

    // doWrite is almost always async, defer these to save a bit of time
    // as the hot path ends with doWrite
    state.pendingcb++;
    state.lastBufferedRequest = null;
    if (holder.next) {
      state.corkedRequestsFree = holder.next;
      holder.next = null;
    } else {
      state.corkedRequestsFree = new CorkedRequest(state);
    }
  } else {
    // Slow case, write chunks one-by-one
    while (entry) {
      var chunk = entry.chunk;
      var encoding = entry.encoding;
      var cb = entry.callback;
      var len = state.objectMode ? 1 : chunk.length;

      doWrite(stream, state, false, len, chunk, encoding, cb);
      entry = entry.next;
      // if we didn't call the onwrite immediately, then
      // it means that we need to wait until it does.
      // also, that means that the chunk and cb are currently
      // being processed, so move the buffer counter past them.
      if (state.writing) {
        break;
      }
    }

    if (entry === null) state.lastBufferedRequest = null;
  }

  state.bufferedRequestCount = 0;
  state.bufferedRequest = entry;
  state.bufferProcessing = false;
}

Writable.prototype._write = function (chunk, encoding, cb) {
  cb(new Error('_write() is not implemented'));
};

Writable.prototype._writev = null;

Writable.prototype.end = function (chunk, encoding, cb) {
  var state = this._writableState;

  if (typeof chunk === 'function') {
    cb = chunk;
    chunk = null;
    encoding = null;
  } else if (typeof encoding === 'function') {
    cb = encoding;
    encoding = null;
  }

  if (chunk !== null && chunk !== undefined) this.write(chunk, encoding);

  // .end() fully uncorks
  if (state.corked) {
    state.corked = 1;
    this.uncork();
  }

  // ignore unnecessary end() calls.
  if (!state.ending && !state.finished) endWritable(this, state, cb);
};

function needFinish(state) {
  return state.ending && state.length === 0 && state.bufferedRequest === null && !state.finished && !state.writing;
}

function prefinish(stream, state) {
  if (!state.prefinished) {
    state.prefinished = true;
    stream.emit('prefinish');
  }
}

function finishMaybe(stream, state) {
  var need = needFinish(state);
  if (need) {
    if (state.pendingcb === 0) {
      prefinish(stream, state);
      state.finished = true;
      stream.emit('finish');
    } else {
      prefinish(stream, state);
    }
  }
  return need;
}

function endWritable(stream, state, cb) {
  state.ending = true;
  finishMaybe(stream, state);
  if (cb) {
    if (state.finished) processNextTick(cb);else stream.once('finish', cb);
  }
  state.ended = true;
  stream.writable = false;
}

// It seems a linked list but it is not
// there will be only 2 of these for each stream
function CorkedRequest(state) {
  var _this = this;

  this.next = null;
  this.entry = null;
  this.finish = function (err) {
    var entry = _this.entry;
    _this.entry = null;
    while (entry) {
      var cb = entry.callback;
      state.pendingcb--;
      cb(err);
      entry = entry.next;
    }
    if (state.corkedRequestsFree) {
      state.corkedRequestsFree.next = _this;
    } else {
      state.corkedRequestsFree = _this;
    }
  };
}

}).call(this,require('_process'))

},{"./_stream_duplex":44,"./internal/streams/stream":50,"_process":42,"buffer":5,"buffer-shims":4,"core-util-is":6,"inherits":38,"process-nextick-args":41,"util-deprecate":59}],49:[function(require,module,exports){
'use strict';

var Buffer = require('buffer').Buffer;
/*<replacement>*/
var bufferShim = require('buffer-shims');
/*</replacement>*/

module.exports = BufferList;

function BufferList() {
  this.head = null;
  this.tail = null;
  this.length = 0;
}

BufferList.prototype.push = function (v) {
  var entry = { data: v, next: null };
  if (this.length > 0) this.tail.next = entry;else this.head = entry;
  this.tail = entry;
  ++this.length;
};

BufferList.prototype.unshift = function (v) {
  var entry = { data: v, next: this.head };
  if (this.length === 0) this.tail = entry;
  this.head = entry;
  ++this.length;
};

BufferList.prototype.shift = function () {
  if (this.length === 0) return;
  var ret = this.head.data;
  if (this.length === 1) this.head = this.tail = null;else this.head = this.head.next;
  --this.length;
  return ret;
};

BufferList.prototype.clear = function () {
  this.head = this.tail = null;
  this.length = 0;
};

BufferList.prototype.join = function (s) {
  if (this.length === 0) return '';
  var p = this.head;
  var ret = '' + p.data;
  while (p = p.next) {
    ret += s + p.data;
  }return ret;
};

BufferList.prototype.concat = function (n) {
  if (this.length === 0) return bufferShim.alloc(0);
  if (this.length === 1) return this.head.data;
  var ret = bufferShim.allocUnsafe(n >>> 0);
  var p = this.head;
  var i = 0;
  while (p) {
    p.data.copy(ret, i);
    i += p.data.length;
    p = p.next;
  }
  return ret;
};

},{"buffer":5,"buffer-shims":4}],50:[function(require,module,exports){
'use strict';

module.exports = require('events').EventEmitter;

},{"events":28}],51:[function(require,module,exports){
'use strict';

module.exports = require('./readable').PassThrough;

},{"./readable":52}],52:[function(require,module,exports){
'use strict';

exports = module.exports = require('./lib/_stream_readable.js');
exports.Stream = exports;
exports.Readable = exports;
exports.Writable = require('./lib/_stream_writable.js');
exports.Duplex = require('./lib/_stream_duplex.js');
exports.Transform = require('./lib/_stream_transform.js');
exports.PassThrough = require('./lib/_stream_passthrough.js');

},{"./lib/_stream_duplex.js":44,"./lib/_stream_passthrough.js":45,"./lib/_stream_readable.js":46,"./lib/_stream_transform.js":47,"./lib/_stream_writable.js":48}],53:[function(require,module,exports){
'use strict';

module.exports = require('./readable').Transform;

},{"./readable":52}],54:[function(require,module,exports){
'use strict';

module.exports = require('./lib/_stream_writable.js');

},{"./lib/_stream_writable.js":48}],55:[function(require,module,exports){
"use strict";

module.exports = function (string) {
  return string.replace(/[-\\^$*+?.()|[\]{}]/g, "\\$&");
};

},{}],56:[function(require,module,exports){
'use strict';

var htmlparser = require('htmlparser2');
var extend = require('xtend');
var quoteRegexp = require('regexp-quote');

function each(obj, cb) {
  if (obj) Object.keys(obj).forEach(function (key) {
    cb(obj[key], key);
  });
}

// Avoid false positives with .__proto__, .hasOwnProperty, etc.
function has(obj, key) {
  return {}.hasOwnProperty.call(obj, key);
}

module.exports = sanitizeHtml;

// Ignore the _recursing flag; it's there for recursive
// invocation as a guard against this exploit:
// https://github.com/fb55/htmlparser2/issues/105

function sanitizeHtml(html, options, _recursing) {
  var result = '';

  function Frame(tag, attribs) {
    var that = this;
    this.tag = tag;
    this.attribs = attribs || {};
    this.tagPosition = result.length;
    this.text = ''; // Node inner text

    this.updateParentNodeText = function () {
      if (stack.length) {
        var parentFrame = stack[stack.length - 1];
        parentFrame.text += that.text;
      }
    };
  }

  if (!options) {
    options = sanitizeHtml.defaults;
    options.parser = htmlParserDefaults;
  } else {
    options = extend(sanitizeHtml.defaults, options);
    if (options.parser) {
      options.parser = extend(htmlParserDefaults, options.parser);
    } else {
      options.parser = htmlParserDefaults;
    }
  }

  // Tags that contain something other than HTML, or where discarding
  // the text when the tag is disallowed makes sense for other reasons.
  // If we are not allowing these tags, we should drop their content too.
  // For other tags you would drop the tag but keep its content.
  var nonTextTagsArray = options.nonTextTags || ['script', 'style', 'textarea'];
  var allowedAttributesMap;
  var allowedAttributesGlobMap;
  if (options.allowedAttributes) {
    allowedAttributesMap = {};
    allowedAttributesGlobMap = {};
    each(options.allowedAttributes, function (attributes, tag) {
      allowedAttributesMap[tag] = [];
      var globRegex = [];
      attributes.forEach(function (name) {
        if (name.indexOf('*') >= 0) {
          globRegex.push(quoteRegexp(name).replace(/\\\*/g, '.*'));
        } else {
          allowedAttributesMap[tag].push(name);
        }
      });
      allowedAttributesGlobMap[tag] = new RegExp('^(' + globRegex.join('|') + ')$');
    });
  }
  var allowedClassesMap = {};
  each(options.allowedClasses, function (classes, tag) {
    // Implicitly allows the class attribute
    if (allowedAttributesMap) {
      if (!has(allowedAttributesMap, tag)) {
        allowedAttributesMap[tag] = [];
      }
      allowedAttributesMap[tag].push('class');
    }

    allowedClassesMap[tag] = classes;
  });

  var transformTagsMap = {};
  var transformTagsAll;
  each(options.transformTags, function (transform, tag) {
    var transFun;
    if (typeof transform === 'function') {
      transFun = transform;
    } else if (typeof transform === "string") {
      transFun = sanitizeHtml.simpleTransform(transform);
    }
    if (tag === '*') {
      transformTagsAll = transFun;
    } else {
      transformTagsMap[tag] = transFun;
    }
  });

  var depth = 0;
  var stack = [];
  var skipMap = {};
  var transformMap = {};
  var skipText = false;
  var skipTextDepth = 0;

  var parser = new htmlparser.Parser({
    onopentag: function onopentag(name, attribs) {
      if (skipText) {
        skipTextDepth++;
        return;
      }
      var frame = new Frame(name, attribs);
      stack.push(frame);

      var skip = false;
      var hasText = frame.text ? true : false;
      var transformedTag;
      if (has(transformTagsMap, name)) {
        transformedTag = transformTagsMap[name](name, attribs);

        frame.attribs = attribs = transformedTag.attribs;

        if (transformedTag.text !== undefined) {
          frame.innerText = transformedTag.text;
        }

        if (name !== transformedTag.tagName) {
          frame.name = name = transformedTag.tagName;
          transformMap[depth] = transformedTag.tagName;
        }
      }
      if (transformTagsAll) {
        transformedTag = transformTagsAll(name, attribs);

        frame.attribs = attribs = transformedTag.attribs;
        if (name !== transformedTag.tagName) {
          frame.name = name = transformedTag.tagName;
          transformMap[depth] = transformedTag.tagName;
        }
      }

      if (options.allowedTags && options.allowedTags.indexOf(name) === -1) {
        skip = true;
        if (nonTextTagsArray.indexOf(name) !== -1) {
          skipText = true;
          skipTextDepth = 1;
        }
        skipMap[depth] = true;
      }
      depth++;
      if (skip) {
        // We want the contents but not this tag
        return;
      }
      result += '<' + name;
      if (!allowedAttributesMap || has(allowedAttributesMap, name) || allowedAttributesMap['*']) {
        each(attribs, function (value, a) {
          if (!allowedAttributesMap || has(allowedAttributesMap, name) && allowedAttributesMap[name].indexOf(a) !== -1 || allowedAttributesMap['*'] && allowedAttributesMap['*'].indexOf(a) !== -1 || has(allowedAttributesGlobMap, name) && allowedAttributesGlobMap[name].test(a) || allowedAttributesGlobMap['*'] && allowedAttributesGlobMap['*'].test(a)) {
            if (a === 'href' || a === 'src') {
              if (naughtyHref(name, value)) {
                delete frame.attribs[a];
                return;
              }
            }
            if (a === 'class') {
              value = filterClasses(value, allowedClassesMap[name]);
              if (!value.length) {
                delete frame.attribs[a];
                return;
              }
            }
            result += ' ' + a;
            if (value.length) {
              result += '="' + escapeHtml(value) + '"';
            }
          } else {
            delete frame.attribs[a];
          }
        });
      }
      if (options.selfClosing.indexOf(name) !== -1) {
        result += " />";
      } else {
        result += ">";
        if (frame.innerText && !hasText && !options.textFilter) {
          result += frame.innerText;
        }
      }
    },
    ontext: function ontext(text) {
      if (skipText) {
        return;
      }
      var lastFrame = stack[stack.length - 1];
      var tag;

      if (lastFrame) {
        tag = lastFrame.tag;
        // If inner text was set by transform function then let's use it
        text = lastFrame.innerText !== undefined ? lastFrame.innerText : text;
      }

      if (tag === 'script' || tag === 'style') {
        // htmlparser2 gives us these as-is. Escaping them ruins the content. Allowing
        // script tags is, by definition, game over for XSS protection, so if that's
        // your concern, don't allow them. The same is essentially true for style tags
        // which have their own collection of XSS vectors.
        result += text;
      } else {
        var escaped = escapeHtml(text);
        if (options.textFilter) {
          result += options.textFilter(escaped);
        } else {
          result += escaped;
        }
      }
      if (stack.length) {
        var frame = stack[stack.length - 1];
        frame.text += text;
      }
    },
    onclosetag: function onclosetag(name) {

      if (skipText) {
        skipTextDepth--;
        if (!skipTextDepth) {
          skipText = false;
        } else {
          return;
        }
      }

      var frame = stack.pop();
      if (!frame) {
        // Do not crash on bad markup
        return;
      }
      skipText = false;
      depth--;
      if (skipMap[depth]) {
        delete skipMap[depth];
        frame.updateParentNodeText();
        return;
      }

      if (transformMap[depth]) {
        name = transformMap[depth];
        delete transformMap[depth];
      }

      if (options.exclusiveFilter && options.exclusiveFilter(frame)) {
        result = result.substr(0, frame.tagPosition);
        return;
      }

      frame.updateParentNodeText();

      if (options.selfClosing.indexOf(name) !== -1) {
        // Already output />
        return;
      }

      result += "</" + name + ">";
    }
  }, options.parser);
  parser.write(html);
  parser.end();

  return result;

  function escapeHtml(s) {
    if (typeof s !== 'string') {
      s = s + '';
    }
    return s.replace(/\&/g, '&amp;').replace(/</g, '&lt;').replace(/\>/g, '&gt;').replace(/\"/g, '&quot;');
  }

  function naughtyHref(name, href) {
    // Browsers ignore character codes of 32 (space) and below in a surprising
    // number of situations. Start reading here:
    // https://www.owasp.org/index.php/XSS_Filter_Evasion_Cheat_Sheet#Embedded_tab
    href = href.replace(/[\x00-\x20]+/g, '');
    // Clobber any comments in URLs, which the browser might
    // interpret inside an XML data island, allowing
    // a javascript: URL to be snuck through
    href = href.replace(/<\!\-\-.*?\-\-\>/g, '');
    // Case insensitive so we don't get faked out by JAVASCRIPT #1
    var matches = href.match(/^([a-zA-Z]+)\:/);
    if (!matches) {
      // Protocol-relative URL: "//some.evil.com/nasty"
      if (href.match(/^\/\//)) {
        return !options.allowProtocolRelative;
      }

      // No scheme
      return false;
    }
    var scheme = matches[1].toLowerCase();

    if (has(options.allowedSchemesByTag, name)) {
      return options.allowedSchemesByTag[name].indexOf(scheme) === -1;
    }

    return !options.allowedSchemes || options.allowedSchemes.indexOf(scheme) === -1;
  }

  function filterClasses(classes, allowed) {
    if (!allowed) {
      // The class attribute is allowed without filtering on this tag
      return classes;
    }
    classes = classes.split(/\s+/);
    return classes.filter(function (clss) {
      return allowed.indexOf(clss) !== -1;
    }).join(' ');
  }
}

// Defaults are accessible to you so that you can use them as a starting point
// programmatically if you wish

var htmlParserDefaults = {
  decodeEntities: true
};
sanitizeHtml.defaults = {
  allowedTags: ['h3', 'h4', 'h5', 'h6', 'blockquote', 'p', 'a', 'ul', 'ol', 'nl', 'li', 'b', 'i', 'strong', 'em', 'strike', 'code', 'hr', 'br', 'div', 'table', 'thead', 'caption', 'tbody', 'tr', 'th', 'td', 'pre'],
  allowedAttributes: {
    a: ['href', 'name', 'target'],
    // We don't currently allow img itself by default, but this
    // would make sense if we did
    img: ['src']
  },
  // Lots of these won't come up by default because we don't allow them
  selfClosing: ['img', 'br', 'hr', 'area', 'base', 'basefont', 'input', 'link', 'meta'],
  // URL schemes we permit
  allowedSchemes: ['http', 'https', 'ftp', 'mailto'],
  allowedSchemesByTag: {},
  allowProtocolRelative: true
};

sanitizeHtml.simpleTransform = function (newTagName, newAttribs, merge) {
  merge = merge === undefined ? true : merge;
  newAttribs = newAttribs || {};

  return function (tagName, attribs) {
    var attrib;
    if (merge) {
      for (attrib in newAttribs) {
        attribs[attrib] = newAttribs[attrib];
      }
    } else {
      attribs = newAttribs;
    }

    return {
      tagName: newTagName,
      attribs: attribs
    };
  };
};

},{"htmlparser2":36,"regexp-quote":55,"xtend":60}],57:[function(require,module,exports){
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

module.exports = Stream;

var EE = require('events').EventEmitter;
var inherits = require('inherits');

inherits(Stream, EE);
Stream.Readable = require('readable-stream/readable.js');
Stream.Writable = require('readable-stream/writable.js');
Stream.Duplex = require('readable-stream/duplex.js');
Stream.Transform = require('readable-stream/transform.js');
Stream.PassThrough = require('readable-stream/passthrough.js');

// Backwards-compat with node 0.4.x
Stream.Stream = Stream;



// old-style streams.  Note that the pipe method (the only relevant
// part of this class) is overridden in the Readable class.

function Stream() {
  EE.call(this);
}

Stream.prototype.pipe = function(dest, options) {
  var source = this;

  function ondata(chunk) {
    if (dest.writable) {
      if (false === dest.write(chunk) && source.pause) {
        source.pause();
      }
    }
  }

  source.on('data', ondata);

  function ondrain() {
    if (source.readable && source.resume) {
      source.resume();
    }
  }

  dest.on('drain', ondrain);

  // If the 'end' option is not supplied, dest.end() will be called when
  // source gets the 'end' or 'close' events.  Only dest.end() once.
  if (!dest._isStdio && (!options || options.end !== false)) {
    source.on('end', onend);
    source.on('close', onclose);
  }

  var didOnEnd = false;
  function onend() {
    if (didOnEnd) return;
    didOnEnd = true;

    dest.end();
  }


  function onclose() {
    if (didOnEnd) return;
    didOnEnd = true;

    if (typeof dest.destroy === 'function') dest.destroy();
  }

  // don't leave dangling pipes when there are errors.
  function onerror(er) {
    cleanup();
    if (EE.listenerCount(this, 'error') === 0) {
      throw er; // Unhandled stream error in pipe.
    }
  }

  source.on('error', onerror);
  dest.on('error', onerror);

  // remove all the event listeners that were added.
  function cleanup() {
    source.removeListener('data', ondata);
    dest.removeListener('drain', ondrain);

    source.removeListener('end', onend);
    source.removeListener('close', onclose);

    source.removeListener('error', onerror);
    dest.removeListener('error', onerror);

    source.removeListener('end', cleanup);
    source.removeListener('close', cleanup);

    dest.removeListener('close', cleanup);
  }

  source.on('end', cleanup);
  source.on('close', cleanup);

  dest.on('close', cleanup);

  dest.emit('pipe', source);

  // Allow for unix-like usage: A.pipe(B).pipe(C)
  return dest;
};

},{"events":28,"inherits":38,"readable-stream/duplex.js":43,"readable-stream/passthrough.js":51,"readable-stream/readable.js":52,"readable-stream/transform.js":53,"readable-stream/writable.js":54}],58:[function(require,module,exports){
'use strict';

var Buffer = require('buffer').Buffer;
var bufferShim = require('buffer-shims');

var isEncoding = Buffer.isEncoding || function (encoding) {
  encoding = '' + encoding;
  switch (encoding && encoding.toLowerCase()) {
    case 'hex':case 'utf8':case 'utf-8':case 'ascii':case 'binary':case 'base64':case 'ucs2':case 'ucs-2':case 'utf16le':case 'utf-16le':case 'raw':
      return true;
    default:
      return false;
  }
};

function _normalizeEncoding(enc) {
  if (!enc) return 'utf8';
  var retried;
  while (true) {
    switch (enc) {
      case 'utf8':
      case 'utf-8':
        return 'utf8';
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return 'utf16le';
      case 'latin1':
      case 'binary':
        return 'latin1';
      case 'base64':
      case 'ascii':
      case 'hex':
        return enc;
      default:
        if (retried) return; // undefined
        enc = ('' + enc).toLowerCase();
        retried = true;
    }
  }
};

// Do not cache `Buffer.isEncoding` when checking encoding names as some
// modules monkey-patch it to support additional encodings
function normalizeEncoding(enc) {
  var nenc = _normalizeEncoding(enc);
  if (typeof nenc !== 'string' && (Buffer.isEncoding === isEncoding || !isEncoding(enc))) throw new Error('Unknown encoding: ' + enc);
  return nenc || enc;
}

// StringDecoder provides an interface for efficiently splitting a series of
// buffers into a series of JS strings without breaking apart multi-byte
// characters.
exports.StringDecoder = StringDecoder;
function StringDecoder(encoding) {
  this.encoding = normalizeEncoding(encoding);
  var nb;
  switch (this.encoding) {
    case 'utf16le':
      this.text = utf16Text;
      this.end = utf16End;
      nb = 4;
      break;
    case 'utf8':
      this.fillLast = utf8FillLast;
      nb = 4;
      break;
    case 'base64':
      this.text = base64Text;
      this.end = base64End;
      nb = 3;
      break;
    default:
      this.write = simpleWrite;
      this.end = simpleEnd;
      return;
  }
  this.lastNeed = 0;
  this.lastTotal = 0;
  this.lastChar = bufferShim.allocUnsafe(nb);
}

StringDecoder.prototype.write = function (buf) {
  if (buf.length === 0) return '';
  var r;
  var i;
  if (this.lastNeed) {
    r = this.fillLast(buf);
    if (r === undefined) return '';
    i = this.lastNeed;
    this.lastNeed = 0;
  } else {
    i = 0;
  }
  if (i < buf.length) return r ? r + this.text(buf, i) : this.text(buf, i);
  return r || '';
};

StringDecoder.prototype.end = utf8End;

// Returns only complete characters in a Buffer
StringDecoder.prototype.text = utf8Text;

// Attempts to complete a partial non-UTF-8 character using bytes from a Buffer
StringDecoder.prototype.fillLast = function (buf) {
  if (this.lastNeed <= buf.length) {
    buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed);
    return this.lastChar.toString(this.encoding, 0, this.lastTotal);
  }
  buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, buf.length);
  this.lastNeed -= buf.length;
};

// Checks the type of a UTF-8 byte, whether it's ASCII, a leading byte, or a
// continuation byte.
function utf8CheckByte(byte) {
  if (byte <= 0x7F) return 0;else if (byte >> 5 === 0x06) return 2;else if (byte >> 4 === 0x0E) return 3;else if (byte >> 3 === 0x1E) return 4;
  return -1;
}

// Checks at most 3 bytes at the end of a Buffer in order to detect an
// incomplete multi-byte UTF-8 character. The total number of bytes (2, 3, or 4)
// needed to complete the UTF-8 character (if applicable) are returned.
function utf8CheckIncomplete(self, buf, i) {
  var j = buf.length - 1;
  if (j < i) return 0;
  var nb = utf8CheckByte(buf[j]);
  if (nb >= 0) {
    if (nb > 0) self.lastNeed = nb - 1;
    return nb;
  }
  if (--j < i) return 0;
  nb = utf8CheckByte(buf[j]);
  if (nb >= 0) {
    if (nb > 0) self.lastNeed = nb - 2;
    return nb;
  }
  if (--j < i) return 0;
  nb = utf8CheckByte(buf[j]);
  if (nb >= 0) {
    if (nb > 0) {
      if (nb === 2) nb = 0;else self.lastNeed = nb - 3;
    }
    return nb;
  }
  return 0;
}

// Validates as many continuation bytes for a multi-byte UTF-8 character as
// needed or are available. If we see a non-continuation byte where we expect
// one, we "replace" the validated continuation bytes we've seen so far with
// UTF-8 replacement characters ('\ufffd'), to match v8's UTF-8 decoding
// behavior. The continuation byte check is included three times in the case
// where all of the continuation bytes for a character exist in the same buffer.
// It is also done this way as a slight performance increase instead of using a
// loop.
function utf8CheckExtraBytes(self, buf, p) {
  if ((buf[0] & 0xC0) !== 0x80) {
    self.lastNeed = 0;
    return '\uFFFD'.repeat(p);
  }
  if (self.lastNeed > 1 && buf.length > 1) {
    if ((buf[1] & 0xC0) !== 0x80) {
      self.lastNeed = 1;
      return '\uFFFD'.repeat(p + 1);
    }
    if (self.lastNeed > 2 && buf.length > 2) {
      if ((buf[2] & 0xC0) !== 0x80) {
        self.lastNeed = 2;
        return '\uFFFD'.repeat(p + 2);
      }
    }
  }
}

// Attempts to complete a multi-byte UTF-8 character using bytes from a Buffer.
function utf8FillLast(buf) {
  var p = this.lastTotal - this.lastNeed;
  var r = utf8CheckExtraBytes(this, buf, p);
  if (r !== undefined) return r;
  if (this.lastNeed <= buf.length) {
    buf.copy(this.lastChar, p, 0, this.lastNeed);
    return this.lastChar.toString(this.encoding, 0, this.lastTotal);
  }
  buf.copy(this.lastChar, p, 0, buf.length);
  this.lastNeed -= buf.length;
}

// Returns all complete UTF-8 characters in a Buffer. If the Buffer ended on a
// partial character, the character's bytes are buffered until the required
// number of bytes are available.
function utf8Text(buf, i) {
  var total = utf8CheckIncomplete(this, buf, i);
  if (!this.lastNeed) return buf.toString('utf8', i);
  this.lastTotal = total;
  var end = buf.length - (total - this.lastNeed);
  buf.copy(this.lastChar, 0, end);
  return buf.toString('utf8', i, end);
}

// For UTF-8, a replacement character for each buffered byte of a (partial)
// character needs to be added to the output.
function utf8End(buf) {
  var r = buf && buf.length ? this.write(buf) : '';
  if (this.lastNeed) return r + '\uFFFD'.repeat(this.lastTotal - this.lastNeed);
  return r;
}

// UTF-16LE typically needs two bytes per character, but even if we have an even
// number of bytes available, we need to check if we end on a leading/high
// surrogate. In that case, we need to wait for the next two bytes in order to
// decode the last character properly.
function utf16Text(buf, i) {
  if ((buf.length - i) % 2 === 0) {
    var r = buf.toString('utf16le', i);
    if (r) {
      var c = r.charCodeAt(r.length - 1);
      if (c >= 0xD800 && c <= 0xDBFF) {
        this.lastNeed = 2;
        this.lastTotal = 4;
        this.lastChar[0] = buf[buf.length - 2];
        this.lastChar[1] = buf[buf.length - 1];
        return r.slice(0, -1);
      }
    }
    return r;
  }
  this.lastNeed = 1;
  this.lastTotal = 2;
  this.lastChar[0] = buf[buf.length - 1];
  return buf.toString('utf16le', i, buf.length - 1);
}

// For UTF-16LE we do not explicitly append special replacement characters if we
// end on a partial character, we simply let v8 handle that.
function utf16End(buf) {
  var r = buf && buf.length ? this.write(buf) : '';
  if (this.lastNeed) {
    var end = this.lastTotal - this.lastNeed;
    return r + this.lastChar.toString('utf16le', 0, end);
  }
  return r;
}

function base64Text(buf, i) {
  var n = (buf.length - i) % 3;
  if (n === 0) return buf.toString('base64', i);
  this.lastNeed = 3 - n;
  this.lastTotal = 3;
  if (n === 1) {
    this.lastChar[0] = buf[buf.length - 1];
  } else {
    this.lastChar[0] = buf[buf.length - 2];
    this.lastChar[1] = buf[buf.length - 1];
  }
  return buf.toString('base64', i, buf.length - n);
}

function base64End(buf) {
  var r = buf && buf.length ? this.write(buf) : '';
  if (this.lastNeed) return r + this.lastChar.toString('base64', 0, 3 - this.lastNeed);
  return r;
}

// Pass bytes on through for single-byte encodings (e.g. ascii, latin1, hex)
function simpleWrite(buf) {
  return buf.toString(this.encoding);
}

function simpleEnd(buf) {
  return buf && buf.length ? this.write(buf) : '';
}

},{"buffer":5,"buffer-shims":4}],59:[function(require,module,exports){
(function (global){
'use strict';

/**
 * Module exports.
 */

module.exports = deprecate;

/**
 * Mark that a method should not be used.
 * Returns a modified function which warns once by default.
 *
 * If `localStorage.noDeprecation = true` is set, then it is a no-op.
 *
 * If `localStorage.throwDeprecation = true` is set, then deprecated functions
 * will throw an Error when invoked.
 *
 * If `localStorage.traceDeprecation = true` is set, then deprecated functions
 * will invoke `console.trace()` instead of `console.error()`.
 *
 * @param {Function} fn - the function to deprecate
 * @param {String} msg - the string to print to the console when `fn` is invoked
 * @returns {Function} a new "deprecated" version of `fn`
 * @api public
 */

function deprecate(fn, msg) {
  if (config('noDeprecation')) {
    return fn;
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (config('throwDeprecation')) {
        throw new Error(msg);
      } else if (config('traceDeprecation')) {
        console.trace(msg);
      } else {
        console.warn(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
}

/**
 * Checks `localStorage` for boolean values for the given `name`.
 *
 * @param {String} name
 * @returns {Boolean}
 * @api private
 */

function config(name) {
  // accessing global.localStorage can trigger a DOMException in sandboxed iframes
  try {
    if (!global.localStorage) return false;
  } catch (_) {
    return false;
  }
  var val = global.localStorage[name];
  if (null == val) return false;
  return String(val).toLowerCase() === 'true';
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],60:[function(require,module,exports){
"use strict";

module.exports = extend;

var hasOwnProperty = Object.prototype.hasOwnProperty;

function extend() {
    var target = {};

    for (var i = 0; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
            if (hasOwnProperty.call(source, key)) {
                target[key] = source[key];
            }
        }
    }

    return target;
}

},{}]},{},[56])(56)
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvYmFzZTY0LWpzL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2Jyb3dzZXItcmVzb2x2ZS9lbXB0eS5qcyIsIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9zdHJpbmdfZGVjb2Rlci9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9idWZmZXItc2hpbXMvaW5kZXguanMiLCJub2RlX21vZHVsZXMvYnVmZmVyL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtdXRpbC1pcy9saWIvdXRpbC5qcyIsIm5vZGVfbW9kdWxlcy9kb20tc2VyaWFsaXplci9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9kb20tc2VyaWFsaXplci9ub2RlX21vZHVsZXMvZG9tZWxlbWVudHR5cGUvaW5kZXguanMiLCJub2RlX21vZHVsZXMvZG9tZWxlbWVudHR5cGUvaW5kZXguanMiLCJub2RlX21vZHVsZXMvZG9taGFuZGxlci9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9kb21oYW5kbGVyL2xpYi9lbGVtZW50LmpzIiwibm9kZV9tb2R1bGVzL2RvbWhhbmRsZXIvbGliL25vZGUuanMiLCJub2RlX21vZHVsZXMvZG9tdXRpbHMvaW5kZXguanMiLCJub2RlX21vZHVsZXMvZG9tdXRpbHMvbGliL2hlbHBlcnMuanMiLCJub2RlX21vZHVsZXMvZG9tdXRpbHMvbGliL2xlZ2FjeS5qcyIsIm5vZGVfbW9kdWxlcy9kb211dGlscy9saWIvbWFuaXB1bGF0aW9uLmpzIiwibm9kZV9tb2R1bGVzL2RvbXV0aWxzL2xpYi9xdWVyeWluZy5qcyIsIm5vZGVfbW9kdWxlcy9kb211dGlscy9saWIvc3RyaW5naWZ5LmpzIiwibm9kZV9tb2R1bGVzL2RvbXV0aWxzL2xpYi90cmF2ZXJzYWwuanMiLCJub2RlX21vZHVsZXMvZW50aXRpZXMvaW5kZXguanMiLCJub2RlX21vZHVsZXMvZW50aXRpZXMvbGliL2RlY29kZS5qcyIsIm5vZGVfbW9kdWxlcy9lbnRpdGllcy9saWIvZGVjb2RlX2NvZGVwb2ludC5qcyIsIm5vZGVfbW9kdWxlcy9lbnRpdGllcy9saWIvZW5jb2RlLmpzIiwibm9kZV9tb2R1bGVzL2VudGl0aWVzL21hcHMvZGVjb2RlLmpzb24iLCJub2RlX21vZHVsZXMvZW50aXRpZXMvbWFwcy9lbnRpdGllcy5qc29uIiwibm9kZV9tb2R1bGVzL2VudGl0aWVzL21hcHMvbGVnYWN5Lmpzb24iLCJub2RlX21vZHVsZXMvZW50aXRpZXMvbWFwcy94bWwuanNvbiIsIm5vZGVfbW9kdWxlcy9ldmVudHMvZXZlbnRzLmpzIiwibm9kZV9tb2R1bGVzL2h0bWxwYXJzZXIyL2xpYi9Db2xsZWN0aW5nSGFuZGxlci5qcyIsIm5vZGVfbW9kdWxlcy9odG1scGFyc2VyMi9saWIvRmVlZEhhbmRsZXIuanMiLCJub2RlX21vZHVsZXMvaHRtbHBhcnNlcjIvbGliL1BhcnNlci5qcyIsIm5vZGVfbW9kdWxlcy9odG1scGFyc2VyMi9saWIvUHJveHlIYW5kbGVyLmpzIiwibm9kZV9tb2R1bGVzL2h0bWxwYXJzZXIyL2xpYi9TdHJlYW0uanMiLCJub2RlX21vZHVsZXMvaHRtbHBhcnNlcjIvbGliL1Rva2VuaXplci5qcyIsIm5vZGVfbW9kdWxlcy9odG1scGFyc2VyMi9saWIvV3JpdGFibGVTdHJlYW0uanMiLCJub2RlX21vZHVsZXMvaHRtbHBhcnNlcjIvbGliL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2llZWU3NTQvaW5kZXguanMiLCJub2RlX21vZHVsZXMvaW5oZXJpdHMvaW5oZXJpdHNfYnJvd3Nlci5qcyIsIm5vZGVfbW9kdWxlcy9pcy1idWZmZXIvaW5kZXguanMiLCJub2RlX21vZHVsZXMvaXNhcnJheS9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9wcm9jZXNzLW5leHRpY2stYXJncy9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9wcm9jZXNzL2Jyb3dzZXIuanMiLCJub2RlX21vZHVsZXMvcmVhZGFibGUtc3RyZWFtL2R1cGxleC1icm93c2VyLmpzIiwibm9kZV9tb2R1bGVzL3JlYWRhYmxlLXN0cmVhbS9saWIvX3N0cmVhbV9kdXBsZXguanMiLCJub2RlX21vZHVsZXMvcmVhZGFibGUtc3RyZWFtL2xpYi9fc3RyZWFtX3Bhc3N0aHJvdWdoLmpzIiwibm9kZV9tb2R1bGVzL3JlYWRhYmxlLXN0cmVhbS9saWIvX3N0cmVhbV9yZWFkYWJsZS5qcyIsIm5vZGVfbW9kdWxlcy9yZWFkYWJsZS1zdHJlYW0vbGliL19zdHJlYW1fdHJhbnNmb3JtLmpzIiwibm9kZV9tb2R1bGVzL3JlYWRhYmxlLXN0cmVhbS9saWIvX3N0cmVhbV93cml0YWJsZS5qcyIsIm5vZGVfbW9kdWxlcy9yZWFkYWJsZS1zdHJlYW0vbGliL2ludGVybmFsL3N0cmVhbXMvQnVmZmVyTGlzdC5qcyIsIm5vZGVfbW9kdWxlcy9yZWFkYWJsZS1zdHJlYW0vbGliL2ludGVybmFsL3N0cmVhbXMvc3RyZWFtLWJyb3dzZXIuanMiLCJub2RlX21vZHVsZXMvcmVhZGFibGUtc3RyZWFtL3Bhc3N0aHJvdWdoLmpzIiwibm9kZV9tb2R1bGVzL3JlYWRhYmxlLXN0cmVhbS9yZWFkYWJsZS1icm93c2VyLmpzIiwibm9kZV9tb2R1bGVzL3JlYWRhYmxlLXN0cmVhbS90cmFuc2Zvcm0uanMiLCJub2RlX21vZHVsZXMvcmVhZGFibGUtc3RyZWFtL3dyaXRhYmxlLWJyb3dzZXIuanMiLCJub2RlX21vZHVsZXMvcmVnZXhwLXF1b3RlL3JlZ2V4cC1xdW90ZS5qcyIsIm5vZGVfbW9kdWxlcy9zYW5pdGl6ZS1odG1sL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL3N0cmVhbS1icm93c2VyaWZ5L2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL3N0cmluZ19kZWNvZGVyL2xpYi9zdHJpbmdfZGVjb2Rlci5qcyIsIm5vZGVfbW9kdWxlcy91dGlsLWRlcHJlY2F0ZS9icm93c2VyLmpzIiwibm9kZV9tb2R1bGVzL3h0ZW5kL2ltbXV0YWJsZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBp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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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QUFDRixRQUFJLENBQUMsT0FBTyxZQUFaLEVBQTBCLE9BQU8sS0FBUDtBQUMzQixHQUZELENBRUUsT0FBTyxDQUFQLEVBQVU7QUFDVixXQUFPLEtBQVA7QUFDRDtBQUNELE1BQUksTUFBTSxPQUFPLFlBQVAsQ0FBb0IsSUFBcEIsQ0FBVjtBQUNBLE1BQUksUUFBUSxHQUFaLEVBQWlCLE9BQU8sS0FBUDtBQUNqQixTQUFPLE9BQU8sR0FBUCxFQUFZLFdBQVosT0FBOEIsTUFBckM7QUFDRDs7Ozs7OztBQ2xFRCxPQUFPLE9BQVAsR0FBaUIsTUFBakI7O0FBRUEsSUFBSSxpQkFBaUIsT0FBTyxTQUFQLENBQWlCLGNBQXRDOztBQUVBLFNBQVMsTUFBVCxHQUFrQjtBQUNkLFFBQUksU0FBUyxFQUFiOztBQUVBLFNBQUssSUFBSSxJQUFJLENBQWIsRUFBZ0IsSUFBSSxVQUFVLE1BQTlCLEVBQXNDLEdBQXRDLEVBQTJDO0FBQ3ZDLFlBQUksU0FBUyxVQUFVLENBQVYsQ0FBYjs7QUFFQSxhQUFLLElBQUksR0FBVCxJQUFnQixNQUFoQixFQUF3QjtBQUNwQixnQkFBSSxlQUFlLElBQWYsQ0FBb0IsTUFBcEIsRUFBNEIsR0FBNUIsQ0FBSixFQUFzQztBQUNsQyx1QkFBTyxHQUFQLElBQWMsT0FBTyxHQUFQLENBQWQ7QUFDSDtBQUNKO0FBQ0o7O0FBRUQsV0FBTyxNQUFQO0FBQ0giLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiJ3VzZSBzdHJpY3QnXG5cbmV4cG9ydHMuYnl0ZUxlbmd0aCA9IGJ5dGVMZW5ndGhcbmV4cG9ydHMudG9CeXRlQXJyYXkgPSB0b0J5dGVBcnJheVxuZXhwb3J0cy5mcm9tQnl0ZUFycmF5ID0gZnJvbUJ5dGVBcnJheVxuXG52YXIgbG9va3VwID0gW11cbnZhciByZXZMb29rdXAgPSBbXVxudmFyIEFyciA9IHR5cGVvZiBVaW50OEFycmF5ICE9PSAndW5kZWZpbmVkJyA/IFVpbnQ4QXJyYXkgOiBBcnJheVxuXG52YXIgY29kZSA9ICdBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OSsvJ1xuZm9yICh2YXIgaSA9IDAsIGxlbiA9IGNvZGUubGVuZ3RoOyBpIDwgbGVuOyArK2kpIHtcbiAgbG9va3VwW2ldID0gY29kZVtpXVxuICByZXZMb29rdXBbY29kZS5jaGFyQ29kZUF0KGkpXSA9IGlcbn1cblxucmV2TG9va3VwWyctJy5jaGFyQ29kZUF0KDApXSA9IDYyXG5yZXZMb29rdXBbJ18nLmNoYXJDb2RlQXQoMCldID0gNjNcblxuZnVuY3Rpb24gcGxhY2VIb2xkZXJzQ291bnQgKGI2NCkge1xuICB2YXIgbGVuID0gYjY0Lmxlbmd0aFxuICBpZiAobGVuICUgNCA+IDApIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgc3RyaW5nLiBMZW5ndGggbXVzdCBiZSBhIG11bHRpcGxlIG9mIDQnKVxuICB9XG5cbiAgLy8gdGhlIG51bWJlciBvZiBlcXVhbCBzaWducyAocGxhY2UgaG9sZGVycylcbiAgLy8gaWYgdGhlcmUgYXJlIHR3byBwbGFjZWhvbGRlcnMsIHRoYW4gdGhlIHR3byBjaGFyYWN0ZXJzIGJlZm9yZSBpdFxuICAvLyByZXByZXNlbnQgb25lIGJ5dGVcbiAgLy8gaWYgdGhlcmUgaXMgb25seSBvbmUsIHRoZW4gdGhlIHRocmVlIGNoYXJhY3RlcnMgYmVmb3JlIGl0IHJlcHJlc2VudCAyIGJ5dGVzXG4gIC8vIHRoaXMgaXMganVzdCBhIGNoZWFwIGhhY2sgdG8gbm90IGRvIGluZGV4T2YgdHdpY2VcbiAgcmV0dXJuIGI2NFtsZW4gLSAyXSA9PT0gJz0nID8gMiA6IGI2NFtsZW4gLSAxXSA9PT0gJz0nID8gMSA6IDBcbn1cblxuZnVuY3Rpb24gYnl0ZUxlbmd0aCAoYjY0KSB7XG4gIC8vIGJhc2U2NCBpcyA0LzMgKyB1cCB0byB0d28gY2hhcmFjdGVycyBvZiB0aGUgb3JpZ2luYWwgZGF0YVxuICByZXR1cm4gYjY0Lmxlbmd0aCAqIDMgLyA0IC0gcGxhY2VIb2xkZXJzQ291bnQoYjY0KVxufVxuXG5mdW5jdGlvbiB0b0J5dGVBcnJheSAoYjY0KSB7XG4gIHZhciBpLCBqLCBsLCB0bXAsIHBsYWNlSG9sZGVycywgYXJyXG4gIHZhciBsZW4gPSBiNjQubGVuZ3RoXG4gIHBsYWNlSG9sZGVycyA9IHBsYWNlSG9sZGVyc0NvdW50KGI2NClcblxuICBhcnIgPSBuZXcgQXJyKGxlbiAqIDMgLyA0IC0gcGxhY2VIb2xkZXJzKVxuXG4gIC8vIGlmIHRoZXJlIGFyZSBwbGFjZWhvbGRlcnMsIG9ubHkgZ2V0IHVwIHRvIHRoZSBsYXN0IGNvbXBsZXRlIDQgY2hhcnNcbiAgbCA9IHBsYWNlSG9sZGVycyA+IDAgPyBsZW4gLSA0IDogbGVuXG5cbiAgdmFyIEwgPSAwXG5cbiAgZm9yIChpID0gMCwgaiA9IDA7IGkgPCBsOyBpICs9IDQsIGogKz0gMykge1xuICAgIHRtcCA9IChyZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSldIDw8IDE4KSB8IChyZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSArIDEpXSA8PCAxMikgfCAocmV2TG9va3VwW2I2NC5jaGFyQ29kZUF0KGkgKyAyKV0gPDwgNikgfCByZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSArIDMpXVxuICAgIGFycltMKytdID0gKHRtcCA+PiAxNikgJiAweEZGXG4gICAgYXJyW0wrK10gPSAodG1wID4+IDgpICYgMHhGRlxuICAgIGFycltMKytdID0gdG1wICYgMHhGRlxuICB9XG5cbiAgaWYgKHBsYWNlSG9sZGVycyA9PT0gMikge1xuICAgIHRtcCA9IChyZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSldIDw8IDIpIHwgKHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpICsgMSldID4+IDQpXG4gICAgYXJyW0wrK10gPSB0bXAgJiAweEZGXG4gIH0gZWxzZSBpZiAocGxhY2VIb2xkZXJzID09PSAxKSB7XG4gICAgdG1wID0gKHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpKV0gPDwgMTApIHwgKHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpICsgMSldIDw8IDQpIHwgKHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpICsgMildID4+IDIpXG4gICAgYXJyW0wrK10gPSAodG1wID4+IDgpICYgMHhGRlxuICAgIGFycltMKytdID0gdG1wICYgMHhGRlxuICB9XG5cbiAgcmV0dXJuIGFyclxufVxuXG5mdW5jdGlvbiB0cmlwbGV0VG9CYXNlNjQgKG51bSkge1xuICByZXR1cm4gbG9va3VwW251bSA+PiAxOCAmIDB4M0ZdICsgbG9va3VwW251bSA+PiAxMiAmIDB4M0ZdICsgbG9va3VwW251bSA+PiA2ICYgMHgzRl0gKyBsb29rdXBbbnVtICYgMHgzRl1cbn1cblxuZnVuY3Rpb24gZW5jb2RlQ2h1bmsgKHVpbnQ4LCBzdGFydCwgZW5kKSB7XG4gIHZhciB0bXBcbiAgdmFyIG91dHB1dCA9IFtdXG4gIGZvciAodmFyIGkgPSBzdGFydDsgaSA8IGVuZDsgaSArPSAzKSB7XG4gICAgdG1wID0gKHVpbnQ4W2ldIDw8IDE2KSArICh1aW50OFtpICsgMV0gPDwgOCkgKyAodWludDhbaSArIDJdKVxuICAgIG91dHB1dC5wdXNoKHRyaXBsZXRUb0Jhc2U2NCh0bXApKVxuICB9XG4gIHJldHVybiBvdXRwdXQuam9pbignJylcbn1cblxuZnVuY3Rpb24gZnJvbUJ5dGVBcnJheSAodWludDgpIHtcbiAgdmFyIHRtcFxuICB2YXIgbGVuID0gdWludDgubGVuZ3RoXG4gIHZhciBleHRyYUJ5dGVzID0gbGVuICUgMyAvLyBpZiB3ZSBoYXZlIDEgYnl0ZSBsZWZ0LCBwYWQgMiBieXRlc1xuICB2YXIgb3V0cHV0ID0gJydcbiAgdmFyIHBhcnRzID0gW11cbiAgdmFyIG1heENodW5rTGVuZ3RoID0gMTYzODMgLy8gbXVzdCBiZSBtdWx0aXBsZSBvZiAzXG5cbiAgLy8gZ28gdGhyb3VnaCB0aGUgYXJyYXkgZXZlcnkgdGhyZWUgYnl0ZXMsIHdlJ2xsIGRlYWwgd2l0aCB0cmFpbGluZyBzdHVmZiBsYXRlclxuICBmb3IgKHZhciBpID0gMCwgbGVuMiA9IGxlbiAtIGV4dHJhQnl0ZXM7IGkgPCBsZW4yOyBpICs9IG1heENodW5rTGVuZ3RoKSB7XG4gICAgcGFydHMucHVzaChlbmNvZGVDaHVuayh1aW50OCwgaSwgKGkgKyBtYXhDaHVua0xlbmd0aCkgPiBsZW4yID8gbGVuMiA6IChpICsgbWF4Q2h1bmtMZW5ndGgpKSlcbiAgfVxuXG4gIC8vIHBhZCB0aGUgZW5kIHdpdGggemVyb3MsIGJ1dCBtYWtlIHN1cmUgdG8gbm90IGZvcmdldCB0aGUgZXh0cmEgYnl0ZXNcbiAgaWYgKGV4dHJhQnl0ZXMgPT09IDEpIHtcbiAgICB0bXAgPSB1aW50OFtsZW4gLSAxXVxuICAgIG91dHB1dCArPSBsb29rdXBbdG1wID4+IDJdXG4gICAgb3V0cHV0ICs9IGxvb2t1cFsodG1wIDw8IDQpICYgMHgzRl1cbiAgICBvdXRwdXQgKz0gJz09J1xuICB9IGVsc2UgaWYgKGV4dHJhQnl0ZXMgPT09IDIpIHtcbiAgICB0bXAgPSAodWludDhbbGVuIC0gMl0gPDwgOCkgKyAodWludDhbbGVuIC0gMV0pXG4gICAgb3V0cHV0ICs9IGxvb2t1cFt0bXAgPj4gMTBdXG4gICAgb3V0cHV0ICs9IGxvb2t1cFsodG1wID4+IDQpICYgMHgzRl1cbiAgICBvdXRwdXQgKz0gbG9va3VwWyh0bXAgPDwgMikgJiAweDNGXVxuICAgIG91dHB1dCArPSAnPSdcbiAgfVxuXG4gIHBhcnRzLnB1c2gob3V0cHV0KVxuXG4gIHJldHVybiBwYXJ0cy5qb2luKCcnKVxufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSnpiM1Z5WTJWeklqcGJYU3dpYm1GdFpYTWlPbHRkTENKdFlYQndhVzVuY3lJNklpSXNJbVpwYkdVaU9pSmxiWEIwZVM1cWN5SXNJbk52ZFhKalpYTkRiMjUwWlc1MElqcGJYWDA9IiwiLy8gQ29weXJpZ2h0IEpveWVudCwgSW5jLiBhbmQgb3RoZXIgTm9kZSBjb250cmlidXRvcnMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGFcbi8vIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGVcbi8vIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZ1xuLy8gd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLFxuLy8gZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdFxuLy8gcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlXG4vLyBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZFxuLy8gaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTU1xuLy8gT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRlxuLy8gTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTlxuLy8gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sXG4vLyBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1Jcbi8vIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEVcbi8vIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG5cbnZhciBCdWZmZXIgPSByZXF1aXJlKCdidWZmZXInKS5CdWZmZXI7XG5cbnZhciBpc0J1ZmZlckVuY29kaW5nID0gQnVmZmVyLmlzRW5jb2RpbmdcbiAgfHwgZnVuY3Rpb24oZW5jb2RpbmcpIHtcbiAgICAgICBzd2l0Y2ggKGVuY29kaW5nICYmIGVuY29kaW5nLnRvTG93ZXJDYXNlKCkpIHtcbiAgICAgICAgIGNhc2UgJ2hleCc6IGNhc2UgJ3V0ZjgnOiBjYXNlICd1dGYtOCc6IGNhc2UgJ2FzY2lpJzogY2FzZSAnYmluYXJ5JzogY2FzZSAnYmFzZTY0JzogY2FzZSAndWNzMic6IGNhc2UgJ3Vjcy0yJzogY2FzZSAndXRmMTZsZSc6IGNhc2UgJ3V0Zi0xNmxlJzogY2FzZSAncmF3JzogcmV0dXJuIHRydWU7XG4gICAgICAgICBkZWZhdWx0OiByZXR1cm4gZmFsc2U7XG4gICAgICAgfVxuICAgICB9XG5cblxuZnVuY3Rpb24gYXNzZXJ0RW5jb2RpbmcoZW5jb2RpbmcpIHtcbiAgaWYgKGVuY29kaW5nICYmICFpc0J1ZmZlckVuY29kaW5nKGVuY29kaW5nKSkge1xuICAgIHRocm93IG5ldyBFcnJvcignVW5rbm93biBlbmNvZGluZzogJyArIGVuY29kaW5nKTtcbiAgfVxufVxuXG4vLyBTdHJpbmdEZWNvZGVyIHByb3ZpZGVzIGFuIGludGVyZmFjZSBmb3IgZWZmaWNpZW50bHkgc3BsaXR0aW5nIGEgc2VyaWVzIG9mXG4vLyBidWZmZXJzIGludG8gYSBzZXJpZXMgb2YgSlMgc3RyaW5ncyB3aXRob3V0IGJyZWFraW5nIGFwYXJ0IG11bHRpLWJ5dGVcbi8vIGNoYXJhY3RlcnMuIENFU1UtOCBpcyBoYW5kbGVkIGFzIHBhcnQgb2YgdGhlIFVURi04IGVuY29kaW5nLlxuLy9cbi8vIEBUT0RPIEhhbmRsaW5nIGFsbCBlbmNvZGluZ3MgaW5zaWRlIGEgc2luZ2xlIG9iamVjdCBtYWtlcyBpdCB2ZXJ5IGRpZmZpY3VsdFxuLy8gdG8gcmVhc29uIGFib3V0IHRoaXMgY29kZSwgc28gaXQgc2hvdWxkIGJlIHNwbGl0IHVwIGluIHRoZSBmdXR1cmUuXG4vLyBAVE9ETyBUaGVyZSBzaG91bGQgYmUgYSB1dGY4LXN0cmljdCBlbmNvZGluZyB0aGF0IHJlamVjdHMgaW52YWxpZCBVVEYtOCBjb2RlXG4vLyBwb2ludHMgYXMgdXNlZCBieSBDRVNVLTguXG52YXIgU3RyaW5nRGVjb2RlciA9IGV4cG9ydHMuU3RyaW5nRGVjb2RlciA9IGZ1bmN0aW9uKGVuY29kaW5nKSB7XG4gIHRoaXMuZW5jb2RpbmcgPSAoZW5jb2RpbmcgfHwgJ3V0ZjgnKS50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoL1stX10vLCAnJyk7XG4gIGFzc2VydEVuY29kaW5nKGVuY29kaW5nKTtcbiAgc3dpdGNoICh0aGlzLmVuY29kaW5nKSB7XG4gICAgY2FzZSAndXRmOCc6XG4gICAgICAvLyBDRVNVLTggcmVwcmVzZW50cyBlYWNoIG9mIFN1cnJvZ2F0ZSBQYWlyIGJ5IDMtYnl0ZXNcbiAgICAgIHRoaXMuc3Vycm9nYXRlU2l6ZSA9IDM7XG4gICAgICBicmVhaztcbiAgICBjYXNlICd1Y3MyJzpcbiAgICBjYXNlICd1dGYxNmxlJzpcbiAgICAgIC8vIFVURi0xNiByZXByZXNlbnRzIGVhY2ggb2YgU3Vycm9nYXRlIFBhaXIgYnkgMi1ieXRlc1xuICAgICAgdGhpcy5zdXJyb2dhdGVTaXplID0gMjtcbiAgICAgIHRoaXMuZGV0ZWN0SW5jb21wbGV0ZUNoYXIgPSB1dGYxNkRldGVjdEluY29tcGxldGVDaGFyO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnYmFzZTY0JzpcbiAgICAgIC8vIEJhc2UtNjQgc3RvcmVzIDMgYnl0ZXMgaW4gNCBjaGFycywgYW5kIHBhZHMgdGhlIHJlbWFpbmRlci5cbiAgICAgIHRoaXMuc3Vycm9nYXRlU2l6ZSA9IDM7XG4gICAgICB0aGlzLmRldGVjdEluY29tcGxldGVDaGFyID0gYmFzZTY0RGV0ZWN0SW5jb21wbGV0ZUNoYXI7XG4gICAgICBicmVhaztcbiAgICBkZWZhdWx0OlxuICAgICAgdGhpcy53cml0ZSA9IHBhc3NUaHJvdWdoV3JpdGU7XG4gICAgICByZXR1cm47XG4gIH1cblxuICAvLyBFbm91Z2ggc3BhY2UgdG8gc3RvcmUgYWxsIGJ5dGVzIG9mIGEgc2luZ2xlIGNoYXJhY3Rlci4gVVRGLTggbmVlZHMgNFxuICAvLyBieXRlcywgYnV0IENFU1UtOCBtYXkgcmVxdWlyZSB1cCB0byA2ICgzIGJ5dGVzIHBlciBzdXJyb2dhdGUpLlxuICB0aGlzLmNoYXJCdWZmZXIgPSBuZXcgQnVmZmVyKDYpO1xuICAvLyBOdW1iZXIgb2YgYnl0ZXMgcmVjZWl2ZWQgZm9yIHRoZSBjdXJyZW50IGluY29tcGxldGUgbXVsdGktYnl0ZSBjaGFyYWN0ZXIuXG4gIHRoaXMuY2hhclJlY2VpdmVkID0gMDtcbiAgLy8gTnVtYmVyIG9mIGJ5dGVzIGV4cGVjdGVkIGZvciB0aGUgY3VycmVudCBpbmNvbXBsZXRlIG11bHRpLWJ5dGUgY2hhcmFjdGVyLlxuICB0aGlzLmNoYXJMZW5ndGggPSAwO1xufTtcblxuXG4vLyB3cml0ZSBkZWNvZGVzIHRoZSBnaXZlbiBidWZmZXIgYW5kIHJldHVybnMgaXQgYXMgSlMgc3RyaW5nIHRoYXQgaXNcbi8vIGd1YXJhbnRlZWQgdG8gbm90IGNvbnRhaW4gYW55IHBhcnRpYWwgbXVsdGktYnl0ZSBjaGFyYWN0ZXJzLiBBbnkgcGFydGlhbFxuLy8gY2hhcmFjdGVyIGZvdW5kIGF0IHRoZSBlbmQgb2YgdGhlIGJ1ZmZlciBpcyBidWZmZXJlZCB1cCwgYW5kIHdpbGwgYmVcbi8vIHJldHVybmVkIHdoZW4gY2FsbGluZyB3cml0ZSBhZ2FpbiB3aXRoIHRoZSByZW1haW5pbmcgYnl0ZXMuXG4vL1xuLy8gTm90ZTogQ29udmVydGluZyBhIEJ1ZmZlciBjb250YWluaW5nIGFuIG9ycGhhbiBzdXJyb2dhdGUgdG8gYSBTdHJpbmdcbi8vIGN1cnJlbnRseSB3b3JrcywgYnV0IGNvbnZlcnRpbmcgYSBTdHJpbmcgdG8gYSBCdWZmZXIgKHZpYSBgbmV3IEJ1ZmZlcmAsIG9yXG4vLyBCdWZmZXIjd3JpdGUpIHdpbGwgcmVwbGFjZSBpbmNvbXBsZXRlIHN1cnJvZ2F0ZXMgd2l0aCB0aGUgdW5pY29kZVxuLy8gcmVwbGFjZW1lbnQgY2hhcmFjdGVyLiBTZWUgaHR0cHM6Ly9jb2RlcmV2aWV3LmNocm9taXVtLm9yZy8xMjExNzMwMDkvIC5cblN0cmluZ0RlY29kZXIucHJvdG90eXBlLndyaXRlID0gZnVuY3Rpb24oYnVmZmVyKSB7XG4gIHZhciBjaGFyU3RyID0gJyc7XG4gIC8vIGlmIG91ciBsYXN0IHdyaXRlIGVuZGVkIHdpdGggYW4gaW5jb21wbGV0ZSBtdWx0aWJ5dGUgY2hhcmFjdGVyXG4gIHdoaWxlICh0aGlzLmNoYXJMZW5ndGgpIHtcbiAgICAvLyBkZXRlcm1pbmUgaG93IG1hbnkgcmVtYWluaW5nIGJ5dGVzIHRoaXMgYnVmZmVyIGhhcyB0byBvZmZlciBmb3IgdGhpcyBjaGFyXG4gICAgdmFyIGF2YWlsYWJsZSA9IChidWZmZXIubGVuZ3RoID49IHRoaXMuY2hhckxlbmd0aCAtIHRoaXMuY2hhclJlY2VpdmVkKSA/XG4gICAgICAgIHRoaXMuY2hhckxlbmd0aCAtIHRoaXMuY2hhclJlY2VpdmVkIDpcbiAgICAgICAgYnVmZmVyLmxlbmd0aDtcblxuICAgIC8vIGFkZCB0aGUgbmV3IGJ5dGVzIHRvIHRoZSBjaGFyIGJ1ZmZlclxuICAgIGJ1ZmZlci5jb3B5KHRoaXMuY2hhckJ1ZmZlciwgdGhpcy5jaGFyUmVjZWl2ZWQsIDAsIGF2YWlsYWJsZSk7XG4gICAgdGhpcy5jaGFyUmVjZWl2ZWQgKz0gYXZhaWxhYmxlO1xuXG4gICAgaWYgKHRoaXMuY2hhclJlY2VpdmVkIDwgdGhpcy5jaGFyTGVuZ3RoKSB7XG4gICAgICAvLyBzdGlsbCBub3QgZW5vdWdoIGNoYXJzIGluIHRoaXMgYnVmZmVyPyB3YWl0IGZvciBtb3JlIC4uLlxuICAgICAgcmV0dXJuICcnO1xuICAgIH1cblxuICAgIC8vIHJlbW92ZSBieXRlcyBiZWxvbmdpbmcgdG8gdGhlIGN1cnJlbnQgY2hhcmFjdGVyIGZyb20gdGhlIGJ1ZmZlclxuICAgIGJ1ZmZlciA9IGJ1ZmZlci5zbGljZShhdmFpbGFibGUsIGJ1ZmZlci5sZW5ndGgpO1xuXG4gICAgLy8gZ2V0IHRoZSBjaGFyYWN0ZXIgdGhhdCB3YXMgc3BsaXRcbiAgICBjaGFyU3RyID0gdGhpcy5jaGFyQnVmZmVyLnNsaWNlKDAsIHRoaXMuY2hhckxlbmd0aCkudG9TdHJpbmcodGhpcy5lbmNvZGluZyk7XG5cbiAgICAvLyBDRVNVLTg6IGxlYWQgc3Vycm9nYXRlIChEODAwLURCRkYpIGlzIGFsc28gdGhlIGluY29tcGxldGUgY2hhcmFjdGVyXG4gICAgdmFyIGNoYXJDb2RlID0gY2hhclN0ci5jaGFyQ29kZUF0KGNoYXJTdHIubGVuZ3RoIC0gMSk7XG4gICAgaWYgKGNoYXJDb2RlID49IDB4RDgwMCAmJiBjaGFyQ29kZSA8PSAweERCRkYpIHtcbiAgICAgIHRoaXMuY2hhckxlbmd0aCArPSB0aGlzLnN1cnJvZ2F0ZVNpemU7XG4gICAgICBjaGFyU3RyID0gJyc7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG4gICAgdGhpcy5jaGFyUmVjZWl2ZWQgPSB0aGlzLmNoYXJMZW5ndGggPSAwO1xuXG4gICAgLy8gaWYgdGhlcmUgYXJlIG5vIG1vcmUgYnl0ZXMgaW4gdGhpcyBidWZmZXIsIGp1c3QgZW1pdCBvdXIgY2hhclxuICAgIGlmIChidWZmZXIubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gY2hhclN0cjtcbiAgICB9XG4gICAgYnJlYWs7XG4gIH1cblxuICAvLyBkZXRlcm1pbmUgYW5kIHNldCBjaGFyTGVuZ3RoIC8gY2hhclJlY2VpdmVkXG4gIHRoaXMuZGV0ZWN0SW5jb21wbGV0ZUNoYXIoYnVmZmVyKTtcblxuICB2YXIgZW5kID0gYnVmZmVyLmxlbmd0aDtcbiAgaWYgKHRoaXMuY2hhckxlbmd0aCkge1xuICAgIC8vIGJ1ZmZlciB0aGUgaW5jb21wbGV0ZSBjaGFyYWN0ZXIgYnl0ZXMgd2UgZ290XG4gICAgYnVmZmVyLmNvcHkodGhpcy5jaGFyQnVmZmVyLCAwLCBidWZmZXIubGVuZ3RoIC0gdGhpcy5jaGFyUmVjZWl2ZWQsIGVuZCk7XG4gICAgZW5kIC09IHRoaXMuY2hhclJlY2VpdmVkO1xuICB9XG5cbiAgY2hhclN0ciArPSBidWZmZXIudG9TdHJpbmcodGhpcy5lbmNvZGluZywgMCwgZW5kKTtcblxuICB2YXIgZW5kID0gY2hhclN0ci5sZW5ndGggLSAxO1xuICB2YXIgY2hhckNvZGUgPSBjaGFyU3RyLmNoYXJDb2RlQXQoZW5kKTtcbiAgLy8gQ0VTVS04OiBsZWFkIHN1cnJvZ2F0ZSAoRDgwMC1EQkZGKSBpcyBhbHNvIHRoZSBpbmNvbXBsZXRlIGNoYXJhY3RlclxuICBpZiAoY2hhckNvZGUgPj0gMHhEODAwICYmIGNoYXJDb2RlIDw9IDB4REJGRikge1xuICAgIHZhciBzaXplID0gdGhpcy5zdXJyb2dhdGVTaXplO1xuICAgIHRoaXMuY2hhckxlbmd0aCArPSBzaXplO1xuICAgIHRoaXMuY2hhclJlY2VpdmVkICs9IHNpemU7XG4gICAgdGhpcy5jaGFyQnVmZmVyLmNvcHkodGhpcy5jaGFyQnVmZmVyLCBzaXplLCAwLCBzaXplKTtcbiAgICBidWZmZXIuY29weSh0aGlzLmNoYXJCdWZmZXIsIDAsIDAsIHNpemUpO1xuICAgIHJldHVybiBjaGFyU3RyLnN1YnN0cmluZygwLCBlbmQpO1xuICB9XG5cbiAgLy8gb3IganVzdCBlbWl0IHRoZSBjaGFyU3RyXG4gIHJldHVybiBjaGFyU3RyO1xufTtcblxuLy8gZGV0ZWN0SW5jb21wbGV0ZUNoYXIgZGV0ZXJtaW5lcyBpZiB0aGVyZSBpcyBhbiBpbmNvbXBsZXRlIFVURi04IGNoYXJhY3RlciBhdFxuLy8gdGhlIGVuZCBvZiB0aGUgZ2l2ZW4gYnVmZmVyLiBJZiBzbywgaXQgc2V0cyB0aGlzLmNoYXJMZW5ndGggdG8gdGhlIGJ5dGVcbi8vIGxlbmd0aCB0aGF0IGNoYXJhY3RlciwgYW5kIHNldHMgdGhpcy5jaGFyUmVjZWl2ZWQgdG8gdGhlIG51bWJlciBvZiBieXRlc1xuLy8gdGhhdCBhcmUgYXZhaWxhYmxlIGZvciB0aGlzIGNoYXJhY3Rlci5cblN0cmluZ0RlY29kZXIucHJvdG90eXBlLmRldGVjdEluY29tcGxldGVDaGFyID0gZnVuY3Rpb24oYnVmZmVyKSB7XG4gIC8vIGRldGVybWluZSBob3cgbWFueSBieXRlcyB3ZSBoYXZlIHRvIGNoZWNrIGF0IHRoZSBlbmQgb2YgdGhpcyBidWZmZXJcbiAgdmFyIGkgPSAoYnVmZmVyLmxlbmd0aCA+PSAzKSA/IDMgOiBidWZmZXIubGVuZ3RoO1xuXG4gIC8vIEZpZ3VyZSBvdXQgaWYgb25lIG9mIHRoZSBsYXN0IGkgYnl0ZXMgb2Ygb3VyIGJ1ZmZlciBhbm5vdW5jZXMgYW5cbiAgLy8gaW5jb21wbGV0ZSBjaGFyLlxuICBmb3IgKDsgaSA+IDA7IGktLSkge1xuICAgIHZhciBjID0gYnVmZmVyW2J1ZmZlci5sZW5ndGggLSBpXTtcblxuICAgIC8vIFNlZSBodHRwOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL1VURi04I0Rlc2NyaXB0aW9uXG5cbiAgICAvLyAxMTBYWFhYWFxuICAgIGlmIChpID09IDEgJiYgYyA+PiA1ID09IDB4MDYpIHtcbiAgICAgIHRoaXMuY2hhckxlbmd0aCA9IDI7XG4gICAgICBicmVhaztcbiAgICB9XG5cbiAgICAvLyAxMTEwWFhYWFxuICAgIGlmIChpIDw9IDIgJiYgYyA+PiA0ID09IDB4MEUpIHtcbiAgICAgIHRoaXMuY2hhckxlbmd0aCA9IDM7XG4gICAgICBicmVhaztcbiAgICB9XG5cbiAgICAvLyAxMTExMFhYWFxuICAgIGlmIChpIDw9IDMgJiYgYyA+PiAzID09IDB4MUUpIHtcbiAgICAgIHRoaXMuY2hhckxlbmd0aCA9IDQ7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgdGhpcy5jaGFyUmVjZWl2ZWQgPSBpO1xufTtcblxuU3RyaW5nRGVjb2Rlci5wcm90b3R5cGUuZW5kID0gZnVuY3Rpb24oYnVmZmVyKSB7XG4gIHZhciByZXMgPSAnJztcbiAgaWYgKGJ1ZmZlciAmJiBidWZmZXIubGVuZ3RoKVxuICAgIHJlcyA9IHRoaXMud3JpdGUoYnVmZmVyKTtcblxuICBpZiAodGhpcy5jaGFyUmVjZWl2ZWQpIHtcbiAgICB2YXIgY3IgPSB0aGlzLmNoYXJSZWNlaXZlZDtcbiAgICB2YXIgYnVmID0gdGhpcy5jaGFyQnVmZmVyO1xuICAgIHZhciBlbmMgPSB0aGlzLmVuY29kaW5nO1xuICAgIHJlcyArPSBidWYuc2xpY2UoMCwgY3IpLnRvU3RyaW5nKGVuYyk7XG4gIH1cblxuICByZXR1cm4gcmVzO1xufTtcblxuZnVuY3Rpb24gcGFzc1Rocm91Z2hXcml0ZShidWZmZXIpIHtcbiAgcmV0dXJuIGJ1ZmZlci50b1N0cmluZyh0aGlzLmVuY29kaW5nKTtcbn1cblxuZnVuY3Rpb24gdXRmMTZEZXRlY3RJbmNvbXBsZXRlQ2hhcihidWZmZXIpIHtcbiAgdGhpcy5jaGFyUmVjZWl2ZWQgPSBidWZmZXIubGVuZ3RoICUgMjtcbiAgdGhpcy5jaGFyTGVuZ3RoID0gdGhpcy5jaGFyUmVjZWl2ZWQgPyAyIDogMDtcbn1cblxuZnVuY3Rpb24gYmFzZTY0RGV0ZWN0SW5jb21wbGV0ZUNoYXIoYnVmZmVyKSB7XG4gIHRoaXMuY2hhclJlY2VpdmVkID0gYnVmZmVyLmxlbmd0aCAlIDM7XG4gIHRoaXMuY2hhckxlbmd0aCA9IHRoaXMuY2hhclJlY2VpdmVkID8gMyA6IDA7XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBidWZmZXIgPSByZXF1aXJlKCdidWZmZXInKTtcbnZhciBCdWZmZXIgPSBidWZmZXIuQnVmZmVyO1xudmFyIFNsb3dCdWZmZXIgPSBidWZmZXIuU2xvd0J1ZmZlcjtcbnZhciBNQVhfTEVOID0gYnVmZmVyLmtNYXhMZW5ndGggfHwgMjE0NzQ4MzY0NztcbmV4cG9ydHMuYWxsb2MgPSBmdW5jdGlvbiBhbGxvYyhzaXplLCBmaWxsLCBlbmNvZGluZykge1xuICBpZiAodHlwZW9mIEJ1ZmZlci5hbGxvYyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybiBCdWZmZXIuYWxsb2Moc2l6ZSwgZmlsbCwgZW5jb2RpbmcpO1xuICB9XG4gIGlmICh0eXBlb2YgZW5jb2RpbmcgPT09ICdudW1iZXInKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignZW5jb2RpbmcgbXVzdCBub3QgYmUgbnVtYmVyJyk7XG4gIH1cbiAgaWYgKHR5cGVvZiBzaXplICE9PSAnbnVtYmVyJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ3NpemUgbXVzdCBiZSBhIG51bWJlcicpO1xuICB9XG4gIGlmIChzaXplID4gTUFYX0xFTikge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdzaXplIGlzIHRvbyBsYXJnZScpO1xuICB9XG4gIHZhciBlbmMgPSBlbmNvZGluZztcbiAgdmFyIF9maWxsID0gZmlsbDtcbiAgaWYgKF9maWxsID09PSB1bmRlZmluZWQpIHtcbiAgICBlbmMgPSB1bmRlZmluZWQ7XG4gICAgX2ZpbGwgPSAwO1xuICB9XG4gIHZhciBidWYgPSBuZXcgQnVmZmVyKHNpemUpO1xuICBpZiAodHlwZW9mIF9maWxsID09PSAnc3RyaW5nJykge1xuICAgIHZhciBmaWxsQnVmID0gbmV3IEJ1ZmZlcihfZmlsbCwgZW5jKTtcbiAgICB2YXIgZmxlbiA9IGZpbGxCdWYubGVuZ3RoO1xuICAgIHZhciBpID0gLTE7XG4gICAgd2hpbGUgKCsraSA8IHNpemUpIHtcbiAgICAgIGJ1ZltpXSA9IGZpbGxCdWZbaSAlIGZsZW5dO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBidWYuZmlsbChfZmlsbCk7XG4gIH1cbiAgcmV0dXJuIGJ1Zjtcbn1cbmV4cG9ydHMuYWxsb2NVbnNhZmUgPSBmdW5jdGlvbiBhbGxvY1Vuc2FmZShzaXplKSB7XG4gIGlmICh0eXBlb2YgQnVmZmVyLmFsbG9jVW5zYWZlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuIEJ1ZmZlci5hbGxvY1Vuc2FmZShzaXplKTtcbiAgfVxuICBpZiAodHlwZW9mIHNpemUgIT09ICdudW1iZXInKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignc2l6ZSBtdXN0IGJlIGEgbnVtYmVyJyk7XG4gIH1cbiAgaWYgKHNpemUgPiBNQVhfTEVOKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ3NpemUgaXMgdG9vIGxhcmdlJyk7XG4gIH1cbiAgcmV0dXJuIG5ldyBCdWZmZXIoc2l6ZSk7XG59XG5leHBvcnRzLmZyb20gPSBmdW5jdGlvbiBmcm9tKHZhbHVlLCBlbmNvZGluZ09yT2Zmc2V0LCBsZW5ndGgpIHtcbiAgaWYgKHR5cGVvZiBCdWZmZXIuZnJvbSA9PT0gJ2Z1bmN0aW9uJyAmJiAoIWdsb2JhbC5VaW50OEFycmF5IHx8IFVpbnQ4QXJyYXkuZnJvbSAhPT0gQnVmZmVyLmZyb20pKSB7XG4gICAgcmV0dXJuIEJ1ZmZlci5mcm9tKHZhbHVlLCBlbmNvZGluZ09yT2Zmc2V0LCBsZW5ndGgpO1xuICB9XG4gIGlmICh0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignXCJ2YWx1ZVwiIGFyZ3VtZW50IG11c3Qgbm90IGJlIGEgbnVtYmVyJyk7XG4gIH1cbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gbmV3IEJ1ZmZlcih2YWx1ZSwgZW5jb2RpbmdPck9mZnNldCk7XG4gIH1cbiAgaWYgKHR5cGVvZiBBcnJheUJ1ZmZlciAhPT0gJ3VuZGVmaW5lZCcgJiYgdmFsdWUgaW5zdGFuY2VvZiBBcnJheUJ1ZmZlcikge1xuICAgIHZhciBvZmZzZXQgPSBlbmNvZGluZ09yT2Zmc2V0O1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAxKSB7XG4gICAgICByZXR1cm4gbmV3IEJ1ZmZlcih2YWx1ZSk7XG4gICAgfVxuICAgIGlmICh0eXBlb2Ygb2Zmc2V0ID09PSAndW5kZWZpbmVkJykge1xuICAgICAgb2Zmc2V0ID0gMDtcbiAgICB9XG4gICAgdmFyIGxlbiA9IGxlbmd0aDtcbiAgICBpZiAodHlwZW9mIGxlbiA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGxlbiA9IHZhbHVlLmJ5dGVMZW5ndGggLSBvZmZzZXQ7XG4gICAgfVxuICAgIGlmIChvZmZzZXQgPj0gdmFsdWUuYnl0ZUxlbmd0aCkge1xuICAgICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ1xcJ29mZnNldFxcJyBpcyBvdXQgb2YgYm91bmRzJyk7XG4gICAgfVxuICAgIGlmIChsZW4gPiB2YWx1ZS5ieXRlTGVuZ3RoIC0gb2Zmc2V0KSB7XG4gICAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignXFwnbGVuZ3RoXFwnIGlzIG91dCBvZiBib3VuZHMnKTtcbiAgICB9XG4gICAgcmV0dXJuIG5ldyBCdWZmZXIodmFsdWUuc2xpY2Uob2Zmc2V0LCBvZmZzZXQgKyBsZW4pKTtcbiAgfVxuICBpZiAoQnVmZmVyLmlzQnVmZmVyKHZhbHVlKSkge1xuICAgIHZhciBvdXQgPSBuZXcgQnVmZmVyKHZhbHVlLmxlbmd0aCk7XG4gICAgdmFsdWUuY29weShvdXQsIDAsIDAsIHZhbHVlLmxlbmd0aCk7XG4gICAgcmV0dXJuIG91dDtcbiAgfVxuICBpZiAodmFsdWUpIHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkgfHwgKHR5cGVvZiBBcnJheUJ1ZmZlciAhPT0gJ3VuZGVmaW5lZCcgJiYgdmFsdWUuYnVmZmVyIGluc3RhbmNlb2YgQXJyYXlCdWZmZXIpIHx8ICdsZW5ndGgnIGluIHZhbHVlKSB7XG4gICAgICByZXR1cm4gbmV3IEJ1ZmZlcih2YWx1ZSk7XG4gICAgfVxuICAgIGlmICh2YWx1ZS50eXBlID09PSAnQnVmZmVyJyAmJiBBcnJheS5pc0FycmF5KHZhbHVlLmRhdGEpKSB7XG4gICAgICByZXR1cm4gbmV3IEJ1ZmZlcih2YWx1ZS5kYXRhKTtcbiAgICB9XG4gIH1cblxuICB0aHJvdyBuZXcgVHlwZUVycm9yKCdGaXJzdCBhcmd1bWVudCBtdXN0IGJlIGEgc3RyaW5nLCBCdWZmZXIsICcgKyAnQXJyYXlCdWZmZXIsIEFycmF5LCBvciBhcnJheS1saWtlIG9iamVjdC4nKTtcbn1cbmV4cG9ydHMuYWxsb2NVbnNhZmVTbG93ID0gZnVuY3Rpb24gYWxsb2NVbnNhZmVTbG93KHNpemUpIHtcbiAgaWYgKHR5cGVvZiBCdWZmZXIuYWxsb2NVbnNhZmVTbG93ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuIEJ1ZmZlci5hbGxvY1Vuc2FmZVNsb3coc2l6ZSk7XG4gIH1cbiAgaWYgKHR5cGVvZiBzaXplICE9PSAnbnVtYmVyJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ3NpemUgbXVzdCBiZSBhIG51bWJlcicpO1xuICB9XG4gIGlmIChzaXplID49IE1BWF9MRU4pIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignc2l6ZSBpcyB0b28gbGFyZ2UnKTtcbiAgfVxuICByZXR1cm4gbmV3IFNsb3dCdWZmZXIoc2l6ZSk7XG59XG4iLCIvKiFcbiAqIFRoZSBidWZmZXIgbW9kdWxlIGZyb20gbm9kZS5qcywgZm9yIHRoZSBicm93c2VyLlxuICpcbiAqIEBhdXRob3IgICBGZXJvc3MgQWJvdWtoYWRpamVoIDxmZXJvc3NAZmVyb3NzLm9yZz4gPGh0dHA6Ly9mZXJvc3Mub3JnPlxuICogQGxpY2Vuc2UgIE1JVFxuICovXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1wcm90byAqL1xuXG4ndXNlIHN0cmljdCdcblxudmFyIGJhc2U2NCA9IHJlcXVpcmUoJ2Jhc2U2NC1qcycpXG52YXIgaWVlZTc1NCA9IHJlcXVpcmUoJ2llZWU3NTQnKVxudmFyIGlzQXJyYXkgPSByZXF1aXJlKCdpc2FycmF5JylcblxuZXhwb3J0cy5CdWZmZXIgPSBCdWZmZXJcbmV4cG9ydHMuU2xvd0J1ZmZlciA9IFNsb3dCdWZmZXJcbmV4cG9ydHMuSU5TUEVDVF9NQVhfQllURVMgPSA1MFxuXG4vKipcbiAqIElmIGBCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVGA6XG4gKiAgID09PSB0cnVlICAgIFVzZSBVaW50OEFycmF5IGltcGxlbWVudGF0aW9uIChmYXN0ZXN0KVxuICogICA9PT0gZmFsc2UgICBVc2UgT2JqZWN0IGltcGxlbWVudGF0aW9uIChtb3N0IGNvbXBhdGlibGUsIGV2ZW4gSUU2KVxuICpcbiAqIEJyb3dzZXJzIHRoYXQgc3VwcG9ydCB0eXBlZCBhcnJheXMgYXJlIElFIDEwKywgRmlyZWZveCA0KywgQ2hyb21lIDcrLCBTYWZhcmkgNS4xKyxcbiAqIE9wZXJhIDExLjYrLCBpT1MgNC4yKy5cbiAqXG4gKiBEdWUgdG8gdmFyaW91cyBicm93c2VyIGJ1Z3MsIHNvbWV0aW1lcyB0aGUgT2JqZWN0IGltcGxlbWVudGF0aW9uIHdpbGwgYmUgdXNlZCBldmVuXG4gKiB3aGVuIHRoZSBicm93c2VyIHN1cHBvcnRzIHR5cGVkIGFycmF5cy5cbiAqXG4gKiBOb3RlOlxuICpcbiAqICAgLSBGaXJlZm94IDQtMjkgbGFja3Mgc3VwcG9ydCBmb3IgYWRkaW5nIG5ldyBwcm9wZXJ0aWVzIHRvIGBVaW50OEFycmF5YCBpbnN0YW5jZXMsXG4gKiAgICAgU2VlOiBodHRwczovL2J1Z3ppbGxhLm1vemlsbGEub3JnL3Nob3dfYnVnLmNnaT9pZD02OTU0MzguXG4gKlxuICogICAtIENocm9tZSA5LTEwIGlzIG1pc3NpbmcgdGhlIGBUeXBlZEFycmF5LnByb3RvdHlwZS5zdWJhcnJheWAgZnVuY3Rpb24uXG4gKlxuICogICAtIElFMTAgaGFzIGEgYnJva2VuIGBUeXBlZEFycmF5LnByb3RvdHlwZS5zdWJhcnJheWAgZnVuY3Rpb24gd2hpY2ggcmV0dXJucyBhcnJheXMgb2ZcbiAqICAgICBpbmNvcnJlY3QgbGVuZ3RoIGluIHNvbWUgc2l0dWF0aW9ucy5cblxuICogV2UgZGV0ZWN0IHRoZXNlIGJ1Z2d5IGJyb3dzZXJzIGFuZCBzZXQgYEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUYCB0byBgZmFsc2VgIHNvIHRoZXlcbiAqIGdldCB0aGUgT2JqZWN0IGltcGxlbWVudGF0aW9uLCB3aGljaCBpcyBzbG93ZXIgYnV0IGJlaGF2ZXMgY29ycmVjdGx5LlxuICovXG5CdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCA9IGdsb2JhbC5UWVBFRF9BUlJBWV9TVVBQT1JUICE9PSB1bmRlZmluZWRcbiAgPyBnbG9iYWwuVFlQRURfQVJSQVlfU1VQUE9SVFxuICA6IHR5cGVkQXJyYXlTdXBwb3J0KClcblxuLypcbiAqIEV4cG9ydCBrTWF4TGVuZ3RoIGFmdGVyIHR5cGVkIGFycmF5IHN1cHBvcnQgaXMgZGV0ZXJtaW5lZC5cbiAqL1xuZXhwb3J0cy5rTWF4TGVuZ3RoID0ga01heExlbmd0aCgpXG5cbmZ1bmN0aW9uIHR5cGVkQXJyYXlTdXBwb3J0ICgpIHtcbiAgdHJ5IHtcbiAgICB2YXIgYXJyID0gbmV3IFVpbnQ4QXJyYXkoMSlcbiAgICBhcnIuX19wcm90b19fID0ge19fcHJvdG9fXzogVWludDhBcnJheS5wcm90b3R5cGUsIGZvbzogZnVuY3Rpb24gKCkgeyByZXR1cm4gNDIgfX1cbiAgICByZXR1cm4gYXJyLmZvbygpID09PSA0MiAmJiAvLyB0eXBlZCBhcnJheSBpbnN0YW5jZXMgY2FuIGJlIGF1Z21lbnRlZFxuICAgICAgICB0eXBlb2YgYXJyLnN1YmFycmF5ID09PSAnZnVuY3Rpb24nICYmIC8vIGNocm9tZSA5LTEwIGxhY2sgYHN1YmFycmF5YFxuICAgICAgICBhcnIuc3ViYXJyYXkoMSwgMSkuYnl0ZUxlbmd0aCA9PT0gMCAvLyBpZTEwIGhhcyBicm9rZW4gYHN1YmFycmF5YFxuICB9IGNhdGNoIChlKSB7XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cbn1cblxuZnVuY3Rpb24ga01heExlbmd0aCAoKSB7XG4gIHJldHVybiBCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVFxuICAgID8gMHg3ZmZmZmZmZlxuICAgIDogMHgzZmZmZmZmZlxufVxuXG5mdW5jdGlvbiBjcmVhdGVCdWZmZXIgKHRoYXQsIGxlbmd0aCkge1xuICBpZiAoa01heExlbmd0aCgpIDwgbGVuZ3RoKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0ludmFsaWQgdHlwZWQgYXJyYXkgbGVuZ3RoJylcbiAgfVxuICBpZiAoQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHtcbiAgICAvLyBSZXR1cm4gYW4gYXVnbWVudGVkIGBVaW50OEFycmF5YCBpbnN0YW5jZSwgZm9yIGJlc3QgcGVyZm9ybWFuY2VcbiAgICB0aGF0ID0gbmV3IFVpbnQ4QXJyYXkobGVuZ3RoKVxuICAgIHRoYXQuX19wcm90b19fID0gQnVmZmVyLnByb3RvdHlwZVxuICB9IGVsc2Uge1xuICAgIC8vIEZhbGxiYWNrOiBSZXR1cm4gYW4gb2JqZWN0IGluc3RhbmNlIG9mIHRoZSBCdWZmZXIgY2xhc3NcbiAgICBpZiAodGhhdCA9PT0gbnVsbCkge1xuICAgICAgdGhhdCA9IG5ldyBCdWZmZXIobGVuZ3RoKVxuICAgIH1cbiAgICB0aGF0Lmxlbmd0aCA9IGxlbmd0aFxuICB9XG5cbiAgcmV0dXJuIHRoYXRcbn1cblxuLyoqXG4gKiBUaGUgQnVmZmVyIGNvbnN0cnVjdG9yIHJldHVybnMgaW5zdGFuY2VzIG9mIGBVaW50OEFycmF5YCB0aGF0IGhhdmUgdGhlaXJcbiAqIHByb3RvdHlwZSBjaGFuZ2VkIHRvIGBCdWZmZXIucHJvdG90eXBlYC4gRnVydGhlcm1vcmUsIGBCdWZmZXJgIGlzIGEgc3ViY2xhc3Mgb2ZcbiAqIGBVaW50OEFycmF5YCwgc28gdGhlIHJldHVybmVkIGluc3RhbmNlcyB3aWxsIGhhdmUgYWxsIHRoZSBub2RlIGBCdWZmZXJgIG1ldGhvZHNcbiAqIGFuZCB0aGUgYFVpbnQ4QXJyYXlgIG1ldGhvZHMuIFNxdWFyZSBicmFja2V0IG5vdGF0aW9uIHdvcmtzIGFzIGV4cGVjdGVkIC0tIGl0XG4gKiByZXR1cm5zIGEgc2luZ2xlIG9jdGV0LlxuICpcbiAqIFRoZSBgVWludDhBcnJheWAgcHJvdG90eXBlIHJlbWFpbnMgdW5tb2RpZmllZC5cbiAqL1xuXG5mdW5jdGlvbiBCdWZmZXIgKGFyZywgZW5jb2RpbmdPck9mZnNldCwgbGVuZ3RoKSB7XG4gIGlmICghQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQgJiYgISh0aGlzIGluc3RhbmNlb2YgQnVmZmVyKSkge1xuICAgIHJldHVybiBuZXcgQnVmZmVyKGFyZywgZW5jb2RpbmdPck9mZnNldCwgbGVuZ3RoKVxuICB9XG5cbiAgLy8gQ29tbW9uIGNhc2UuXG4gIGlmICh0eXBlb2YgYXJnID09PSAnbnVtYmVyJykge1xuICAgIGlmICh0eXBlb2YgZW5jb2RpbmdPck9mZnNldCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgJ0lmIGVuY29kaW5nIGlzIHNwZWNpZmllZCB0aGVuIHRoZSBmaXJzdCBhcmd1bWVudCBtdXN0IGJlIGEgc3RyaW5nJ1xuICAgICAgKVxuICAgIH1cbiAgICByZXR1cm4gYWxsb2NVbnNhZmUodGhpcywgYXJnKVxuICB9XG4gIHJldHVybiBmcm9tKHRoaXMsIGFyZywgZW5jb2RpbmdPck9mZnNldCwgbGVuZ3RoKVxufVxuXG5CdWZmZXIucG9vbFNpemUgPSA4MTkyIC8vIG5vdCB1c2VkIGJ5IHRoaXMgaW1wbGVtZW50YXRpb25cblxuLy8gVE9ETzogTGVnYWN5LCBub3QgbmVlZGVkIGFueW1vcmUuIFJlbW92ZSBpbiBuZXh0IG1ham9yIHZlcnNpb24uXG5CdWZmZXIuX2F1Z21lbnQgPSBmdW5jdGlvbiAoYXJyKSB7XG4gIGFyci5fX3Byb3RvX18gPSBCdWZmZXIucHJvdG90eXBlXG4gIHJldHVybiBhcnJcbn1cblxuZnVuY3Rpb24gZnJvbSAodGhhdCwgdmFsdWUsIGVuY29kaW5nT3JPZmZzZXQsIGxlbmd0aCkge1xuICBpZiAodHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1widmFsdWVcIiBhcmd1bWVudCBtdXN0IG5vdCBiZSBhIG51bWJlcicpXG4gIH1cblxuICBpZiAodHlwZW9mIEFycmF5QnVmZmVyICE9PSAndW5kZWZpbmVkJyAmJiB2YWx1ZSBpbnN0YW5jZW9mIEFycmF5QnVmZmVyKSB7XG4gICAgcmV0dXJuIGZyb21BcnJheUJ1ZmZlcih0aGF0LCB2YWx1ZSwgZW5jb2RpbmdPck9mZnNldCwgbGVuZ3RoKVxuICB9XG5cbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gZnJvbVN0cmluZyh0aGF0LCB2YWx1ZSwgZW5jb2RpbmdPck9mZnNldClcbiAgfVxuXG4gIHJldHVybiBmcm9tT2JqZWN0KHRoYXQsIHZhbHVlKVxufVxuXG4vKipcbiAqIEZ1bmN0aW9uYWxseSBlcXVpdmFsZW50IHRvIEJ1ZmZlcihhcmcsIGVuY29kaW5nKSBidXQgdGhyb3dzIGEgVHlwZUVycm9yXG4gKiBpZiB2YWx1ZSBpcyBhIG51bWJlci5cbiAqIEJ1ZmZlci5mcm9tKHN0clssIGVuY29kaW5nXSlcbiAqIEJ1ZmZlci5mcm9tKGFycmF5KVxuICogQnVmZmVyLmZyb20oYnVmZmVyKVxuICogQnVmZmVyLmZyb20oYXJyYXlCdWZmZXJbLCBieXRlT2Zmc2V0WywgbGVuZ3RoXV0pXG4gKiovXG5CdWZmZXIuZnJvbSA9IGZ1bmN0aW9uICh2YWx1ZSwgZW5jb2RpbmdPck9mZnNldCwgbGVuZ3RoKSB7XG4gIHJldHVybiBmcm9tKG51bGwsIHZhbHVlLCBlbmNvZGluZ09yT2Zmc2V0LCBsZW5ndGgpXG59XG5cbmlmIChCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkge1xuICBCdWZmZXIucHJvdG90eXBlLl9fcHJvdG9fXyA9IFVpbnQ4QXJyYXkucHJvdG90eXBlXG4gIEJ1ZmZlci5fX3Byb3RvX18gPSBVaW50OEFycmF5XG4gIGlmICh0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wuc3BlY2llcyAmJlxuICAgICAgQnVmZmVyW1N5bWJvbC5zcGVjaWVzXSA9PT0gQnVmZmVyKSB7XG4gICAgLy8gRml4IHN1YmFycmF5KCkgaW4gRVMyMDE2LiBTZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9mZXJvc3MvYnVmZmVyL3B1bGwvOTdcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQnVmZmVyLCBTeW1ib2wuc3BlY2llcywge1xuICAgICAgdmFsdWU6IG51bGwsXG4gICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KVxuICB9XG59XG5cbmZ1bmN0aW9uIGFzc2VydFNpemUgKHNpemUpIHtcbiAgaWYgKHR5cGVvZiBzaXplICE9PSAnbnVtYmVyJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1wic2l6ZVwiIGFyZ3VtZW50IG11c3QgYmUgYSBudW1iZXInKVxuICB9IGVsc2UgaWYgKHNpemUgPCAwKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ1wic2l6ZVwiIGFyZ3VtZW50IG11c3Qgbm90IGJlIG5lZ2F0aXZlJylcbiAgfVxufVxuXG5mdW5jdGlvbiBhbGxvYyAodGhhdCwgc2l6ZSwgZmlsbCwgZW5jb2RpbmcpIHtcbiAgYXNzZXJ0U2l6ZShzaXplKVxuICBpZiAoc2l6ZSA8PSAwKSB7XG4gICAgcmV0dXJuIGNyZWF0ZUJ1ZmZlcih0aGF0LCBzaXplKVxuICB9XG4gIGlmIChmaWxsICE9PSB1bmRlZmluZWQpIHtcbiAgICAvLyBPbmx5IHBheSBhdHRlbnRpb24gdG8gZW5jb2RpbmcgaWYgaXQncyBhIHN0cmluZy4gVGhpc1xuICAgIC8vIHByZXZlbnRzIGFjY2lkZW50YWxseSBzZW5kaW5nIGluIGEgbnVtYmVyIHRoYXQgd291bGRcbiAgICAvLyBiZSBpbnRlcnByZXR0ZWQgYXMgYSBzdGFydCBvZmZzZXQuXG4gICAgcmV0dXJuIHR5cGVvZiBlbmNvZGluZyA9PT0gJ3N0cmluZydcbiAgICAgID8gY3JlYXRlQnVmZmVyKHRoYXQsIHNpemUpLmZpbGwoZmlsbCwgZW5jb2RpbmcpXG4gICAgICA6IGNyZWF0ZUJ1ZmZlcih0aGF0LCBzaXplKS5maWxsKGZpbGwpXG4gIH1cbiAgcmV0dXJuIGNyZWF0ZUJ1ZmZlcih0aGF0LCBzaXplKVxufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgZmlsbGVkIEJ1ZmZlciBpbnN0YW5jZS5cbiAqIGFsbG9jKHNpemVbLCBmaWxsWywgZW5jb2RpbmddXSlcbiAqKi9cbkJ1ZmZlci5hbGxvYyA9IGZ1bmN0aW9uIChzaXplLCBmaWxsLCBlbmNvZGluZykge1xuICByZXR1cm4gYWxsb2MobnVsbCwgc2l6ZSwgZmlsbCwgZW5jb2RpbmcpXG59XG5cbmZ1bmN0aW9uIGFsbG9jVW5zYWZlICh0aGF0LCBzaXplKSB7XG4gIGFzc2VydFNpemUoc2l6ZSlcbiAgdGhhdCA9IGNyZWF0ZUJ1ZmZlcih0aGF0LCBzaXplIDwgMCA/IDAgOiBjaGVja2VkKHNpemUpIHwgMClcbiAgaWYgKCFCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2l6ZTsgKytpKSB7XG4gICAgICB0aGF0W2ldID0gMFxuICAgIH1cbiAgfVxuICByZXR1cm4gdGhhdFxufVxuXG4vKipcbiAqIEVxdWl2YWxlbnQgdG8gQnVmZmVyKG51bSksIGJ5IGRlZmF1bHQgY3JlYXRlcyBhIG5vbi16ZXJvLWZpbGxlZCBCdWZmZXIgaW5zdGFuY2UuXG4gKiAqL1xuQnVmZmVyLmFsbG9jVW5zYWZlID0gZnVuY3Rpb24gKHNpemUpIHtcbiAgcmV0dXJuIGFsbG9jVW5zYWZlKG51bGwsIHNpemUpXG59XG4vKipcbiAqIEVxdWl2YWxlbnQgdG8gU2xvd0J1ZmZlcihudW0pLCBieSBkZWZhdWx0IGNyZWF0ZXMgYSBub24temVyby1maWxsZWQgQnVmZmVyIGluc3RhbmNlLlxuICovXG5CdWZmZXIuYWxsb2NVbnNhZmVTbG93ID0gZnVuY3Rpb24gKHNpemUpIHtcbiAgcmV0dXJuIGFsbG9jVW5zYWZlKG51bGwsIHNpemUpXG59XG5cbmZ1bmN0aW9uIGZyb21TdHJpbmcgKHRoYXQsIHN0cmluZywgZW5jb2RpbmcpIHtcbiAgaWYgKHR5cGVvZiBlbmNvZGluZyAhPT0gJ3N0cmluZycgfHwgZW5jb2RpbmcgPT09ICcnKSB7XG4gICAgZW5jb2RpbmcgPSAndXRmOCdcbiAgfVxuXG4gIGlmICghQnVmZmVyLmlzRW5jb2RpbmcoZW5jb2RpbmcpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignXCJlbmNvZGluZ1wiIG11c3QgYmUgYSB2YWxpZCBzdHJpbmcgZW5jb2RpbmcnKVxuICB9XG5cbiAgdmFyIGxlbmd0aCA9IGJ5dGVMZW5ndGgoc3RyaW5nLCBlbmNvZGluZykgfCAwXG4gIHRoYXQgPSBjcmVhdGVCdWZmZXIodGhhdCwgbGVuZ3RoKVxuXG4gIHZhciBhY3R1YWwgPSB0aGF0LndyaXRlKHN0cmluZywgZW5jb2RpbmcpXG5cbiAgaWYgKGFjdHVhbCAhPT0gbGVuZ3RoKSB7XG4gICAgLy8gV3JpdGluZyBhIGhleCBzdHJpbmcsIGZvciBleGFtcGxlLCB0aGF0IGNvbnRhaW5zIGludmFsaWQgY2hhcmFjdGVycyB3aWxsXG4gICAgLy8gY2F1c2UgZXZlcnl0aGluZyBhZnRlciB0aGUgZmlyc3QgaW52YWxpZCBjaGFyYWN0ZXIgdG8gYmUgaWdub3JlZC4gKGUuZy5cbiAgICAvLyAnYWJ4eGNkJyB3aWxsIGJlIHRyZWF0ZWQgYXMgJ2FiJylcbiAgICB0aGF0ID0gdGhhdC5zbGljZSgwLCBhY3R1YWwpXG4gIH1cblxuICByZXR1cm4gdGhhdFxufVxuXG5mdW5jdGlvbiBmcm9tQXJyYXlMaWtlICh0aGF0LCBhcnJheSkge1xuICB2YXIgbGVuZ3RoID0gYXJyYXkubGVuZ3RoIDwgMCA/IDAgOiBjaGVja2VkKGFycmF5Lmxlbmd0aCkgfCAwXG4gIHRoYXQgPSBjcmVhdGVCdWZmZXIodGhhdCwgbGVuZ3RoKVxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgaSArPSAxKSB7XG4gICAgdGhhdFtpXSA9IGFycmF5W2ldICYgMjU1XG4gIH1cbiAgcmV0dXJuIHRoYXRcbn1cblxuZnVuY3Rpb24gZnJvbUFycmF5QnVmZmVyICh0aGF0LCBhcnJheSwgYnl0ZU9mZnNldCwgbGVuZ3RoKSB7XG4gIGFycmF5LmJ5dGVMZW5ndGggLy8gdGhpcyB0aHJvd3MgaWYgYGFycmF5YCBpcyBub3QgYSB2YWxpZCBBcnJheUJ1ZmZlclxuXG4gIGlmIChieXRlT2Zmc2V0IDwgMCB8fCBhcnJheS5ieXRlTGVuZ3RoIDwgYnl0ZU9mZnNldCkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdcXCdvZmZzZXRcXCcgaXMgb3V0IG9mIGJvdW5kcycpXG4gIH1cblxuICBpZiAoYXJyYXkuYnl0ZUxlbmd0aCA8IGJ5dGVPZmZzZXQgKyAobGVuZ3RoIHx8IDApKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ1xcJ2xlbmd0aFxcJyBpcyBvdXQgb2YgYm91bmRzJylcbiAgfVxuXG4gIGlmIChieXRlT2Zmc2V0ID09PSB1bmRlZmluZWQgJiYgbGVuZ3RoID09PSB1bmRlZmluZWQpIHtcbiAgICBhcnJheSA9IG5ldyBVaW50OEFycmF5KGFycmF5KVxuICB9IGVsc2UgaWYgKGxlbmd0aCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgYXJyYXkgPSBuZXcgVWludDhBcnJheShhcnJheSwgYnl0ZU9mZnNldClcbiAgfSBlbHNlIHtcbiAgICBhcnJheSA9IG5ldyBVaW50OEFycmF5KGFycmF5LCBieXRlT2Zmc2V0LCBsZW5ndGgpXG4gIH1cblxuICBpZiAoQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHtcbiAgICAvLyBSZXR1cm4gYW4gYXVnbWVudGVkIGBVaW50OEFycmF5YCBpbnN0YW5jZSwgZm9yIGJlc3QgcGVyZm9ybWFuY2VcbiAgICB0aGF0ID0gYXJyYXlcbiAgICB0aGF0Ll9fcHJvdG9fXyA9IEJ1ZmZlci5wcm90b3R5cGVcbiAgfSBlbHNlIHtcbiAgICAvLyBGYWxsYmFjazogUmV0dXJuIGFuIG9iamVjdCBpbnN0YW5jZSBvZiB0aGUgQnVmZmVyIGNsYXNzXG4gICAgdGhhdCA9IGZyb21BcnJheUxpa2UodGhhdCwgYXJyYXkpXG4gIH1cbiAgcmV0dXJuIHRoYXRcbn1cblxuZnVuY3Rpb24gZnJvbU9iamVjdCAodGhhdCwgb2JqKSB7XG4gIGlmIChCdWZmZXIuaXNCdWZmZXIob2JqKSkge1xuICAgIHZhciBsZW4gPSBjaGVja2VkKG9iai5sZW5ndGgpIHwgMFxuICAgIHRoYXQgPSBjcmVhdGVCdWZmZXIodGhhdCwgbGVuKVxuXG4gICAgaWYgKHRoYXQubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gdGhhdFxuICAgIH1cblxuICAgIG9iai5jb3B5KHRoYXQsIDAsIDAsIGxlbilcbiAgICByZXR1cm4gdGhhdFxuICB9XG5cbiAgaWYgKG9iaikge1xuICAgIGlmICgodHlwZW9mIEFycmF5QnVmZmVyICE9PSAndW5kZWZpbmVkJyAmJlxuICAgICAgICBvYmouYnVmZmVyIGluc3RhbmNlb2YgQXJyYXlCdWZmZXIpIHx8ICdsZW5ndGgnIGluIG9iaikge1xuICAgICAgaWYgKHR5cGVvZiBvYmoubGVuZ3RoICE9PSAnbnVtYmVyJyB8fCBpc25hbihvYmoubGVuZ3RoKSkge1xuICAgICAgICByZXR1cm4gY3JlYXRlQnVmZmVyKHRoYXQsIDApXG4gICAgICB9XG4gICAgICByZXR1cm4gZnJvbUFycmF5TGlrZSh0aGF0LCBvYmopXG4gICAgfVxuXG4gICAgaWYgKG9iai50eXBlID09PSAnQnVmZmVyJyAmJiBpc0FycmF5KG9iai5kYXRhKSkge1xuICAgICAgcmV0dXJuIGZyb21BcnJheUxpa2UodGhhdCwgb2JqLmRhdGEpXG4gICAgfVxuICB9XG5cbiAgdGhyb3cgbmV3IFR5cGVFcnJvcignRmlyc3QgYXJndW1lbnQgbXVzdCBiZSBhIHN0cmluZywgQnVmZmVyLCBBcnJheUJ1ZmZlciwgQXJyYXksIG9yIGFycmF5LWxpa2Ugb2JqZWN0LicpXG59XG5cbmZ1bmN0aW9uIGNoZWNrZWQgKGxlbmd0aCkge1xuICAvLyBOb3RlOiBjYW5ub3QgdXNlIGBsZW5ndGggPCBrTWF4TGVuZ3RoKClgIGhlcmUgYmVjYXVzZSB0aGF0IGZhaWxzIHdoZW5cbiAgLy8gbGVuZ3RoIGlzIE5hTiAod2hpY2ggaXMgb3RoZXJ3aXNlIGNvZXJjZWQgdG8gemVyby4pXG4gIGlmIChsZW5ndGggPj0ga01heExlbmd0aCgpKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0F0dGVtcHQgdG8gYWxsb2NhdGUgQnVmZmVyIGxhcmdlciB0aGFuIG1heGltdW0gJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgJ3NpemU6IDB4JyArIGtNYXhMZW5ndGgoKS50b1N0cmluZygxNikgKyAnIGJ5dGVzJylcbiAgfVxuICByZXR1cm4gbGVuZ3RoIHwgMFxufVxuXG5mdW5jdGlvbiBTbG93QnVmZmVyIChsZW5ndGgpIHtcbiAgaWYgKCtsZW5ndGggIT0gbGVuZ3RoKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgZXFlcWVxXG4gICAgbGVuZ3RoID0gMFxuICB9XG4gIHJldHVybiBCdWZmZXIuYWxsb2MoK2xlbmd0aClcbn1cblxuQnVmZmVyLmlzQnVmZmVyID0gZnVuY3Rpb24gaXNCdWZmZXIgKGIpIHtcbiAgcmV0dXJuICEhKGIgIT0gbnVsbCAmJiBiLl9pc0J1ZmZlcilcbn1cblxuQnVmZmVyLmNvbXBhcmUgPSBmdW5jdGlvbiBjb21wYXJlIChhLCBiKSB7XG4gIGlmICghQnVmZmVyLmlzQnVmZmVyKGEpIHx8ICFCdWZmZXIuaXNCdWZmZXIoYikpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdBcmd1bWVudHMgbXVzdCBiZSBCdWZmZXJzJylcbiAgfVxuXG4gIGlmIChhID09PSBiKSByZXR1cm4gMFxuXG4gIHZhciB4ID0gYS5sZW5ndGhcbiAgdmFyIHkgPSBiLmxlbmd0aFxuXG4gIGZvciAodmFyIGkgPSAwLCBsZW4gPSBNYXRoLm1pbih4LCB5KTsgaSA8IGxlbjsgKytpKSB7XG4gICAgaWYgKGFbaV0gIT09IGJbaV0pIHtcbiAgICAgIHggPSBhW2ldXG4gICAgICB5ID0gYltpXVxuICAgICAgYnJlYWtcbiAgICB9XG4gIH1cblxuICBpZiAoeCA8IHkpIHJldHVybiAtMVxuICBpZiAoeSA8IHgpIHJldHVybiAxXG4gIHJldHVybiAwXG59XG5cbkJ1ZmZlci5pc0VuY29kaW5nID0gZnVuY3Rpb24gaXNFbmNvZGluZyAoZW5jb2RpbmcpIHtcbiAgc3dpdGNoIChTdHJpbmcoZW5jb2RpbmcpLnRvTG93ZXJDYXNlKCkpIHtcbiAgICBjYXNlICdoZXgnOlxuICAgIGNhc2UgJ3V0ZjgnOlxuICAgIGNhc2UgJ3V0Zi04JzpcbiAgICBjYXNlICdhc2NpaSc6XG4gICAgY2FzZSAnbGF0aW4xJzpcbiAgICBjYXNlICdiaW5hcnknOlxuICAgIGNhc2UgJ2Jhc2U2NCc6XG4gICAgY2FzZSAndWNzMic6XG4gICAgY2FzZSAndWNzLTInOlxuICAgIGNhc2UgJ3V0ZjE2bGUnOlxuICAgIGNhc2UgJ3V0Zi0xNmxlJzpcbiAgICAgIHJldHVybiB0cnVlXG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBmYWxzZVxuICB9XG59XG5cbkJ1ZmZlci5jb25jYXQgPSBmdW5jdGlvbiBjb25jYXQgKGxpc3QsIGxlbmd0aCkge1xuICBpZiAoIWlzQXJyYXkobGlzdCkpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdcImxpc3RcIiBhcmd1bWVudCBtdXN0IGJlIGFuIEFycmF5IG9mIEJ1ZmZlcnMnKVxuICB9XG5cbiAgaWYgKGxpc3QubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIEJ1ZmZlci5hbGxvYygwKVxuICB9XG5cbiAgdmFyIGlcbiAgaWYgKGxlbmd0aCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgbGVuZ3RoID0gMFxuICAgIGZvciAoaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgKytpKSB7XG4gICAgICBsZW5ndGggKz0gbGlzdFtpXS5sZW5ndGhcbiAgICB9XG4gIH1cblxuICB2YXIgYnVmZmVyID0gQnVmZmVyLmFsbG9jVW5zYWZlKGxlbmd0aClcbiAgdmFyIHBvcyA9IDBcbiAgZm9yIChpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyArK2kpIHtcbiAgICB2YXIgYnVmID0gbGlzdFtpXVxuICAgIGlmICghQnVmZmVyLmlzQnVmZmVyKGJ1ZikpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1wibGlzdFwiIGFyZ3VtZW50IG11c3QgYmUgYW4gQXJyYXkgb2YgQnVmZmVycycpXG4gICAgfVxuICAgIGJ1Zi5jb3B5KGJ1ZmZlciwgcG9zKVxuICAgIHBvcyArPSBidWYubGVuZ3RoXG4gIH1cbiAgcmV0dXJuIGJ1ZmZlclxufVxuXG5mdW5jdGlvbiBieXRlTGVuZ3RoIChzdHJpbmcsIGVuY29kaW5nKSB7XG4gIGlmIChCdWZmZXIuaXNCdWZmZXIoc3RyaW5nKSkge1xuICAgIHJldHVybiBzdHJpbmcubGVuZ3RoXG4gIH1cbiAgaWYgKHR5cGVvZiBBcnJheUJ1ZmZlciAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIEFycmF5QnVmZmVyLmlzVmlldyA9PT0gJ2Z1bmN0aW9uJyAmJlxuICAgICAgKEFycmF5QnVmZmVyLmlzVmlldyhzdHJpbmcpIHx8IHN0cmluZyBpbnN0YW5jZW9mIEFycmF5QnVmZmVyKSkge1xuICAgIHJldHVybiBzdHJpbmcuYnl0ZUxlbmd0aFxuICB9XG4gIGlmICh0eXBlb2Ygc3RyaW5nICE9PSAnc3RyaW5nJykge1xuICAgIHN0cmluZyA9ICcnICsgc3RyaW5nXG4gIH1cblxuICB2YXIgbGVuID0gc3RyaW5nLmxlbmd0aFxuICBpZiAobGVuID09PSAwKSByZXR1cm4gMFxuXG4gIC8vIFVzZSBhIGZvciBsb29wIHRvIGF2b2lkIHJlY3Vyc2lvblxuICB2YXIgbG93ZXJlZENhc2UgPSBmYWxzZVxuICBmb3IgKDs7KSB7XG4gICAgc3dpdGNoIChlbmNvZGluZykge1xuICAgICAgY2FzZSAnYXNjaWknOlxuICAgICAgY2FzZSAnbGF0aW4xJzpcbiAgICAgIGNhc2UgJ2JpbmFyeSc6XG4gICAgICAgIHJldHVybiBsZW5cbiAgICAgIGNhc2UgJ3V0ZjgnOlxuICAgICAgY2FzZSAndXRmLTgnOlxuICAgICAgY2FzZSB1bmRlZmluZWQ6XG4gICAgICAgIHJldHVybiB1dGY4VG9CeXRlcyhzdHJpbmcpLmxlbmd0aFxuICAgICAgY2FzZSAndWNzMic6XG4gICAgICBjYXNlICd1Y3MtMic6XG4gICAgICBjYXNlICd1dGYxNmxlJzpcbiAgICAgIGNhc2UgJ3V0Zi0xNmxlJzpcbiAgICAgICAgcmV0dXJuIGxlbiAqIDJcbiAgICAgIGNhc2UgJ2hleCc6XG4gICAgICAgIHJldHVybiBsZW4gPj4+IDFcbiAgICAgIGNhc2UgJ2Jhc2U2NCc6XG4gICAgICAgIHJldHVybiBiYXNlNjRUb0J5dGVzKHN0cmluZykubGVuZ3RoXG4gICAgICBkZWZhdWx0OlxuICAgICAgICBpZiAobG93ZXJlZENhc2UpIHJldHVybiB1dGY4VG9CeXRlcyhzdHJpbmcpLmxlbmd0aCAvLyBhc3N1bWUgdXRmOFxuICAgICAgICBlbmNvZGluZyA9ICgnJyArIGVuY29kaW5nKS50b0xvd2VyQ2FzZSgpXG4gICAgICAgIGxvd2VyZWRDYXNlID0gdHJ1ZVxuICAgIH1cbiAgfVxufVxuQnVmZmVyLmJ5dGVMZW5ndGggPSBieXRlTGVuZ3RoXG5cbmZ1bmN0aW9uIHNsb3dUb1N0cmluZyAoZW5jb2RpbmcsIHN0YXJ0LCBlbmQpIHtcbiAgdmFyIGxvd2VyZWRDYXNlID0gZmFsc2VcblxuICAvLyBObyBuZWVkIHRvIHZlcmlmeSB0aGF0IFwidGhpcy5sZW5ndGggPD0gTUFYX1VJTlQzMlwiIHNpbmNlIGl0J3MgYSByZWFkLW9ubHlcbiAgLy8gcHJvcGVydHkgb2YgYSB0eXBlZCBhcnJheS5cblxuICAvLyBUaGlzIGJlaGF2ZXMgbmVpdGhlciBsaWtlIFN0cmluZyBub3IgVWludDhBcnJheSBpbiB0aGF0IHdlIHNldCBzdGFydC9lbmRcbiAgLy8gdG8gdGhlaXIgdXBwZXIvbG93ZXIgYm91bmRzIGlmIHRoZSB2YWx1ZSBwYXNzZWQgaXMgb3V0IG9mIHJhbmdlLlxuICAvLyB1bmRlZmluZWQgaXMgaGFuZGxlZCBzcGVjaWFsbHkgYXMgcGVyIEVDTUEtMjYyIDZ0aCBFZGl0aW9uLFxuICAvLyBTZWN0aW9uIDEzLjMuMy43IFJ1bnRpbWUgU2VtYW50aWNzOiBLZXllZEJpbmRpbmdJbml0aWFsaXphdGlvbi5cbiAgaWYgKHN0YXJ0ID09PSB1bmRlZmluZWQgfHwgc3RhcnQgPCAwKSB7XG4gICAgc3RhcnQgPSAwXG4gIH1cbiAgLy8gUmV0dXJuIGVhcmx5IGlmIHN0YXJ0ID4gdGhpcy5sZW5ndGguIERvbmUgaGVyZSB0byBwcmV2ZW50IHBvdGVudGlhbCB1aW50MzJcbiAgLy8gY29lcmNpb24gZmFpbCBiZWxvdy5cbiAgaWYgKHN0YXJ0ID4gdGhpcy5sZW5ndGgpIHtcbiAgICByZXR1cm4gJydcbiAgfVxuXG4gIGlmIChlbmQgPT09IHVuZGVmaW5lZCB8fCBlbmQgPiB0aGlzLmxlbmd0aCkge1xuICAgIGVuZCA9IHRoaXMubGVuZ3RoXG4gIH1cblxuICBpZiAoZW5kIDw9IDApIHtcbiAgICByZXR1cm4gJydcbiAgfVxuXG4gIC8vIEZvcmNlIGNvZXJzaW9uIHRvIHVpbnQzMi4gVGhpcyB3aWxsIGFsc28gY29lcmNlIGZhbHNleS9OYU4gdmFsdWVzIHRvIDAuXG4gIGVuZCA+Pj49IDBcbiAgc3RhcnQgPj4+PSAwXG5cbiAgaWYgKGVuZCA8PSBzdGFydCkge1xuICAgIHJldHVybiAnJ1xuICB9XG5cbiAgaWYgKCFlbmNvZGluZykgZW5jb2RpbmcgPSAndXRmOCdcblxuICB3aGlsZSAodHJ1ZSkge1xuICAgIHN3aXRjaCAoZW5jb2RpbmcpIHtcbiAgICAgIGNhc2UgJ2hleCc6XG4gICAgICAgIHJldHVybiBoZXhTbGljZSh0aGlzLCBzdGFydCwgZW5kKVxuXG4gICAgICBjYXNlICd1dGY4JzpcbiAgICAgIGNhc2UgJ3V0Zi04JzpcbiAgICAgICAgcmV0dXJuIHV0ZjhTbGljZSh0aGlzLCBzdGFydCwgZW5kKVxuXG4gICAgICBjYXNlICdhc2NpaSc6XG4gICAgICAgIHJldHVybiBhc2NpaVNsaWNlKHRoaXMsIHN0YXJ0LCBlbmQpXG5cbiAgICAgIGNhc2UgJ2xhdGluMSc6XG4gICAgICBjYXNlICdiaW5hcnknOlxuICAgICAgICByZXR1cm4gbGF0aW4xU2xpY2UodGhpcywgc3RhcnQsIGVuZClcblxuICAgICAgY2FzZSAnYmFzZTY0JzpcbiAgICAgICAgcmV0dXJuIGJhc2U2NFNsaWNlKHRoaXMsIHN0YXJ0LCBlbmQpXG5cbiAgICAgIGNhc2UgJ3VjczInOlxuICAgICAgY2FzZSAndWNzLTInOlxuICAgICAgY2FzZSAndXRmMTZsZSc6XG4gICAgICBjYXNlICd1dGYtMTZsZSc6XG4gICAgICAgIHJldHVybiB1dGYxNmxlU2xpY2UodGhpcywgc3RhcnQsIGVuZClcblxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgaWYgKGxvd2VyZWRDYXNlKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdVbmtub3duIGVuY29kaW5nOiAnICsgZW5jb2RpbmcpXG4gICAgICAgIGVuY29kaW5nID0gKGVuY29kaW5nICsgJycpLnRvTG93ZXJDYXNlKClcbiAgICAgICAgbG93ZXJlZENhc2UgPSB0cnVlXG4gICAgfVxuICB9XG59XG5cbi8vIFRoZSBwcm9wZXJ0eSBpcyB1c2VkIGJ5IGBCdWZmZXIuaXNCdWZmZXJgIGFuZCBgaXMtYnVmZmVyYCAoaW4gU2FmYXJpIDUtNykgdG8gZGV0ZWN0XG4vLyBCdWZmZXIgaW5zdGFuY2VzLlxuQnVmZmVyLnByb3RvdHlwZS5faXNCdWZmZXIgPSB0cnVlXG5cbmZ1bmN0aW9uIHN3YXAgKGIsIG4sIG0pIHtcbiAgdmFyIGkgPSBiW25dXG4gIGJbbl0gPSBiW21dXG4gIGJbbV0gPSBpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUuc3dhcDE2ID0gZnVuY3Rpb24gc3dhcDE2ICgpIHtcbiAgdmFyIGxlbiA9IHRoaXMubGVuZ3RoXG4gIGlmIChsZW4gJSAyICE9PSAwKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0J1ZmZlciBzaXplIG11c3QgYmUgYSBtdWx0aXBsZSBvZiAxNi1iaXRzJylcbiAgfVxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSArPSAyKSB7XG4gICAgc3dhcCh0aGlzLCBpLCBpICsgMSlcbiAgfVxuICByZXR1cm4gdGhpc1xufVxuXG5CdWZmZXIucHJvdG90eXBlLnN3YXAzMiA9IGZ1bmN0aW9uIHN3YXAzMiAoKSB7XG4gIHZhciBsZW4gPSB0aGlzLmxlbmd0aFxuICBpZiAobGVuICUgNCAhPT0gMCkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdCdWZmZXIgc2l6ZSBtdXN0IGJlIGEgbXVsdGlwbGUgb2YgMzItYml0cycpXG4gIH1cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkgKz0gNCkge1xuICAgIHN3YXAodGhpcywgaSwgaSArIDMpXG4gICAgc3dhcCh0aGlzLCBpICsgMSwgaSArIDIpXG4gIH1cbiAgcmV0dXJuIHRoaXNcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5zd2FwNjQgPSBmdW5jdGlvbiBzd2FwNjQgKCkge1xuICB2YXIgbGVuID0gdGhpcy5sZW5ndGhcbiAgaWYgKGxlbiAlIDggIT09IDApIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignQnVmZmVyIHNpemUgbXVzdCBiZSBhIG11bHRpcGxlIG9mIDY0LWJpdHMnKVxuICB9XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpICs9IDgpIHtcbiAgICBzd2FwKHRoaXMsIGksIGkgKyA3KVxuICAgIHN3YXAodGhpcywgaSArIDEsIGkgKyA2KVxuICAgIHN3YXAodGhpcywgaSArIDIsIGkgKyA1KVxuICAgIHN3YXAodGhpcywgaSArIDMsIGkgKyA0KVxuICB9XG4gIHJldHVybiB0aGlzXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZyAoKSB7XG4gIHZhciBsZW5ndGggPSB0aGlzLmxlbmd0aCB8IDBcbiAgaWYgKGxlbmd0aCA9PT0gMCkgcmV0dXJuICcnXG4gIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKSByZXR1cm4gdXRmOFNsaWNlKHRoaXMsIDAsIGxlbmd0aClcbiAgcmV0dXJuIHNsb3dUb1N0cmluZy5hcHBseSh0aGlzLCBhcmd1bWVudHMpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUuZXF1YWxzID0gZnVuY3Rpb24gZXF1YWxzIChiKSB7XG4gIGlmICghQnVmZmVyLmlzQnVmZmVyKGIpKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdBcmd1bWVudCBtdXN0IGJlIGEgQnVmZmVyJylcbiAgaWYgKHRoaXMgPT09IGIpIHJldHVybiB0cnVlXG4gIHJldHVybiBCdWZmZXIuY29tcGFyZSh0aGlzLCBiKSA9PT0gMFxufVxuXG5CdWZmZXIucHJvdG90eXBlLmluc3BlY3QgPSBmdW5jdGlvbiBpbnNwZWN0ICgpIHtcbiAgdmFyIHN0ciA9ICcnXG4gIHZhciBtYXggPSBleHBvcnRzLklOU1BFQ1RfTUFYX0JZVEVTXG4gIGlmICh0aGlzLmxlbmd0aCA+IDApIHtcbiAgICBzdHIgPSB0aGlzLnRvU3RyaW5nKCdoZXgnLCAwLCBtYXgpLm1hdGNoKC8uezJ9L2cpLmpvaW4oJyAnKVxuICAgIGlmICh0aGlzLmxlbmd0aCA+IG1heCkgc3RyICs9ICcgLi4uICdcbiAgfVxuICByZXR1cm4gJzxCdWZmZXIgJyArIHN0ciArICc+J1xufVxuXG5CdWZmZXIucHJvdG90eXBlLmNvbXBhcmUgPSBmdW5jdGlvbiBjb21wYXJlICh0YXJnZXQsIHN0YXJ0LCBlbmQsIHRoaXNTdGFydCwgdGhpc0VuZCkge1xuICBpZiAoIUJ1ZmZlci5pc0J1ZmZlcih0YXJnZXQpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQXJndW1lbnQgbXVzdCBiZSBhIEJ1ZmZlcicpXG4gIH1cblxuICBpZiAoc3RhcnQgPT09IHVuZGVmaW5lZCkge1xuICAgIHN0YXJ0ID0gMFxuICB9XG4gIGlmIChlbmQgPT09IHVuZGVmaW5lZCkge1xuICAgIGVuZCA9IHRhcmdldCA/IHRhcmdldC5sZW5ndGggOiAwXG4gIH1cbiAgaWYgKHRoaXNTdGFydCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgdGhpc1N0YXJ0ID0gMFxuICB9XG4gIGlmICh0aGlzRW5kID09PSB1bmRlZmluZWQpIHtcbiAgICB0aGlzRW5kID0gdGhpcy5sZW5ndGhcbiAgfVxuXG4gIGlmIChzdGFydCA8IDAgfHwgZW5kID4gdGFyZ2V0Lmxlbmd0aCB8fCB0aGlzU3RhcnQgPCAwIHx8IHRoaXNFbmQgPiB0aGlzLmxlbmd0aCkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdvdXQgb2YgcmFuZ2UgaW5kZXgnKVxuICB9XG5cbiAgaWYgKHRoaXNTdGFydCA+PSB0aGlzRW5kICYmIHN0YXJ0ID49IGVuZCkge1xuICAgIHJldHVybiAwXG4gIH1cbiAgaWYgKHRoaXNTdGFydCA+PSB0aGlzRW5kKSB7XG4gICAgcmV0dXJuIC0xXG4gIH1cbiAgaWYgKHN0YXJ0ID49IGVuZCkge1xuICAgIHJldHVybiAxXG4gIH1cblxuICBzdGFydCA+Pj49IDBcbiAgZW5kID4+Pj0gMFxuICB0aGlzU3RhcnQgPj4+PSAwXG4gIHRoaXNFbmQgPj4+PSAwXG5cbiAgaWYgKHRoaXMgPT09IHRhcmdldCkgcmV0dXJuIDBcblxuICB2YXIgeCA9IHRoaXNFbmQgLSB0aGlzU3RhcnRcbiAgdmFyIHkgPSBlbmQgLSBzdGFydFxuICB2YXIgbGVuID0gTWF0aC5taW4oeCwgeSlcblxuICB2YXIgdGhpc0NvcHkgPSB0aGlzLnNsaWNlKHRoaXNTdGFydCwgdGhpc0VuZClcbiAgdmFyIHRhcmdldENvcHkgPSB0YXJnZXQuc2xpY2Uoc3RhcnQsIGVuZClcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgKytpKSB7XG4gICAgaWYgKHRoaXNDb3B5W2ldICE9PSB0YXJnZXRDb3B5W2ldKSB7XG4gICAgICB4ID0gdGhpc0NvcHlbaV1cbiAgICAgIHkgPSB0YXJnZXRDb3B5W2ldXG4gICAgICBicmVha1xuICAgIH1cbiAgfVxuXG4gIGlmICh4IDwgeSkgcmV0dXJuIC0xXG4gIGlmICh5IDwgeCkgcmV0dXJuIDFcbiAgcmV0dXJuIDBcbn1cblxuLy8gRmluZHMgZWl0aGVyIHRoZSBmaXJzdCBpbmRleCBvZiBgdmFsYCBpbiBgYnVmZmVyYCBhdCBvZmZzZXQgPj0gYGJ5dGVPZmZzZXRgLFxuLy8gT1IgdGhlIGxhc3QgaW5kZXggb2YgYHZhbGAgaW4gYGJ1ZmZlcmAgYXQgb2Zmc2V0IDw9IGBieXRlT2Zmc2V0YC5cbi8vXG4vLyBBcmd1bWVudHM6XG4vLyAtIGJ1ZmZlciAtIGEgQnVmZmVyIHRvIHNlYXJjaFxuLy8gLSB2YWwgLSBhIHN0cmluZywgQnVmZmVyLCBvciBudW1iZXJcbi8vIC0gYnl0ZU9mZnNldCAtIGFuIGluZGV4IGludG8gYGJ1ZmZlcmA7IHdpbGwgYmUgY2xhbXBlZCB0byBhbiBpbnQzMlxuLy8gLSBlbmNvZGluZyAtIGFuIG9wdGlvbmFsIGVuY29kaW5nLCByZWxldmFudCBpcyB2YWwgaXMgYSBzdHJpbmdcbi8vIC0gZGlyIC0gdHJ1ZSBmb3IgaW5kZXhPZiwgZmFsc2UgZm9yIGxhc3RJbmRleE9mXG5mdW5jdGlvbiBiaWRpcmVjdGlvbmFsSW5kZXhPZiAoYnVmZmVyLCB2YWwsIGJ5dGVPZmZzZXQsIGVuY29kaW5nLCBkaXIpIHtcbiAgLy8gRW1wdHkgYnVmZmVyIG1lYW5zIG5vIG1hdGNoXG4gIGlmIChidWZmZXIubGVuZ3RoID09PSAwKSByZXR1cm4gLTFcblxuICAvLyBOb3JtYWxpemUgYnl0ZU9mZnNldFxuICBpZiAodHlwZW9mIGJ5dGVPZmZzZXQgPT09ICdzdHJpbmcnKSB7XG4gICAgZW5jb2RpbmcgPSBieXRlT2Zmc2V0XG4gICAgYnl0ZU9mZnNldCA9IDBcbiAgfSBlbHNlIGlmIChieXRlT2Zmc2V0ID4gMHg3ZmZmZmZmZikge1xuICAgIGJ5dGVPZmZzZXQgPSAweDdmZmZmZmZmXG4gIH0gZWxzZSBpZiAoYnl0ZU9mZnNldCA8IC0weDgwMDAwMDAwKSB7XG4gICAgYnl0ZU9mZnNldCA9IC0weDgwMDAwMDAwXG4gIH1cbiAgYnl0ZU9mZnNldCA9ICtieXRlT2Zmc2V0ICAvLyBDb2VyY2UgdG8gTnVtYmVyLlxuICBpZiAoaXNOYU4oYnl0ZU9mZnNldCkpIHtcbiAgICAvLyBieXRlT2Zmc2V0OiBpdCBpdCdzIHVuZGVmaW5lZCwgbnVsbCwgTmFOLCBcImZvb1wiLCBldGMsIHNlYXJjaCB3aG9sZSBidWZmZXJcbiAgICBieXRlT2Zmc2V0ID0gZGlyID8gMCA6IChidWZmZXIubGVuZ3RoIC0gMSlcbiAgfVxuXG4gIC8vIE5vcm1hbGl6ZSBieXRlT2Zmc2V0OiBuZWdhdGl2ZSBvZmZzZXRzIHN0YXJ0IGZyb20gdGhlIGVuZCBvZiB0aGUgYnVmZmVyXG4gIGlmIChieXRlT2Zmc2V0IDwgMCkgYnl0ZU9mZnNldCA9IGJ1ZmZlci5sZW5ndGggKyBieXRlT2Zmc2V0XG4gIGlmIChieXRlT2Zmc2V0ID49IGJ1ZmZlci5sZW5ndGgpIHtcbiAgICBpZiAoZGlyKSByZXR1cm4gLTFcbiAgICBlbHNlIGJ5dGVPZmZzZXQgPSBidWZmZXIubGVuZ3RoIC0gMVxuICB9IGVsc2UgaWYgKGJ5dGVPZmZzZXQgPCAwKSB7XG4gICAgaWYgKGRpcikgYnl0ZU9mZnNldCA9IDBcbiAgICBlbHNlIHJldHVybiAtMVxuICB9XG5cbiAgLy8gTm9ybWFsaXplIHZhbFxuICBpZiAodHlwZW9mIHZhbCA9PT0gJ3N0cmluZycpIHtcbiAgICB2YWwgPSBCdWZmZXIuZnJvbSh2YWwsIGVuY29kaW5nKVxuICB9XG5cbiAgLy8gRmluYWxseSwgc2VhcmNoIGVpdGhlciBpbmRleE9mIChpZiBkaXIgaXMgdHJ1ZSkgb3IgbGFzdEluZGV4T2ZcbiAgaWYgKEJ1ZmZlci5pc0J1ZmZlcih2YWwpKSB7XG4gICAgLy8gU3BlY2lhbCBjYXNlOiBsb29raW5nIGZvciBlbXB0eSBzdHJpbmcvYnVmZmVyIGFsd2F5cyBmYWlsc1xuICAgIGlmICh2YWwubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gLTFcbiAgICB9XG4gICAgcmV0dXJuIGFycmF5SW5kZXhPZihidWZmZXIsIHZhbCwgYnl0ZU9mZnNldCwgZW5jb2RpbmcsIGRpcilcbiAgfSBlbHNlIGlmICh0eXBlb2YgdmFsID09PSAnbnVtYmVyJykge1xuICAgIHZhbCA9IHZhbCAmIDB4RkYgLy8gU2VhcmNoIGZvciBhIGJ5dGUgdmFsdWUgWzAtMjU1XVxuICAgIGlmIChCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCAmJlxuICAgICAgICB0eXBlb2YgVWludDhBcnJheS5wcm90b3R5cGUuaW5kZXhPZiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgaWYgKGRpcikge1xuICAgICAgICByZXR1cm4gVWludDhBcnJheS5wcm90b3R5cGUuaW5kZXhPZi5jYWxsKGJ1ZmZlciwgdmFsLCBieXRlT2Zmc2V0KVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIFVpbnQ4QXJyYXkucHJvdG90eXBlLmxhc3RJbmRleE9mLmNhbGwoYnVmZmVyLCB2YWwsIGJ5dGVPZmZzZXQpXG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBhcnJheUluZGV4T2YoYnVmZmVyLCBbIHZhbCBdLCBieXRlT2Zmc2V0LCBlbmNvZGluZywgZGlyKVxuICB9XG5cbiAgdGhyb3cgbmV3IFR5cGVFcnJvcigndmFsIG11c3QgYmUgc3RyaW5nLCBudW1iZXIgb3IgQnVmZmVyJylcbn1cblxuZnVuY3Rpb24gYXJyYXlJbmRleE9mIChhcnIsIHZhbCwgYnl0ZU9mZnNldCwgZW5jb2RpbmcsIGRpcikge1xuICB2YXIgaW5kZXhTaXplID0gMVxuICB2YXIgYXJyTGVuZ3RoID0gYXJyLmxlbmd0aFxuICB2YXIgdmFsTGVuZ3RoID0gdmFsLmxlbmd0aFxuXG4gIGlmIChlbmNvZGluZyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgZW5jb2RpbmcgPSBTdHJpbmcoZW5jb2RpbmcpLnRvTG93ZXJDYXNlKClcbiAgICBpZiAoZW5jb2RpbmcgPT09ICd1Y3MyJyB8fCBlbmNvZGluZyA9PT0gJ3Vjcy0yJyB8fFxuICAgICAgICBlbmNvZGluZyA9PT0gJ3V0ZjE2bGUnIHx8IGVuY29kaW5nID09PSAndXRmLTE2bGUnKSB7XG4gICAgICBpZiAoYXJyLmxlbmd0aCA8IDIgfHwgdmFsLmxlbmd0aCA8IDIpIHtcbiAgICAgICAgcmV0dXJuIC0xXG4gICAgICB9XG4gICAgICBpbmRleFNpemUgPSAyXG4gICAgICBhcnJMZW5ndGggLz0gMlxuICAgICAgdmFsTGVuZ3RoIC89IDJcbiAgICAgIGJ5dGVPZmZzZXQgLz0gMlxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHJlYWQgKGJ1ZiwgaSkge1xuICAgIGlmIChpbmRleFNpemUgPT09IDEpIHtcbiAgICAgIHJldHVybiBidWZbaV1cbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGJ1Zi5yZWFkVUludDE2QkUoaSAqIGluZGV4U2l6ZSlcbiAgICB9XG4gIH1cblxuICB2YXIgaVxuICBpZiAoZGlyKSB7XG4gICAgdmFyIGZvdW5kSW5kZXggPSAtMVxuICAgIGZvciAoaSA9IGJ5dGVPZmZzZXQ7IGkgPCBhcnJMZW5ndGg7IGkrKykge1xuICAgICAgaWYgKHJlYWQoYXJyLCBpKSA9PT0gcmVhZCh2YWwsIGZvdW5kSW5kZXggPT09IC0xID8gMCA6IGkgLSBmb3VuZEluZGV4KSkge1xuICAgICAgICBpZiAoZm91bmRJbmRleCA9PT0gLTEpIGZvdW5kSW5kZXggPSBpXG4gICAgICAgIGlmIChpIC0gZm91bmRJbmRleCArIDEgPT09IHZhbExlbmd0aCkgcmV0dXJuIGZvdW5kSW5kZXggKiBpbmRleFNpemVcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChmb3VuZEluZGV4ICE9PSAtMSkgaSAtPSBpIC0gZm91bmRJbmRleFxuICAgICAgICBmb3VuZEluZGV4ID0gLTFcbiAgICAgIH1cbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgaWYgKGJ5dGVPZmZzZXQgKyB2YWxMZW5ndGggPiBhcnJMZW5ndGgpIGJ5dGVPZmZzZXQgPSBhcnJMZW5ndGggLSB2YWxMZW5ndGhcbiAgICBmb3IgKGkgPSBieXRlT2Zmc2V0OyBpID49IDA7IGktLSkge1xuICAgICAgdmFyIGZvdW5kID0gdHJ1ZVxuICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCB2YWxMZW5ndGg7IGorKykge1xuICAgICAgICBpZiAocmVhZChhcnIsIGkgKyBqKSAhPT0gcmVhZCh2YWwsIGopKSB7XG4gICAgICAgICAgZm91bmQgPSBmYWxzZVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChmb3VuZCkgcmV0dXJuIGlcbiAgICB9XG4gIH1cblxuICByZXR1cm4gLTFcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5pbmNsdWRlcyA9IGZ1bmN0aW9uIGluY2x1ZGVzICh2YWwsIGJ5dGVPZmZzZXQsIGVuY29kaW5nKSB7XG4gIHJldHVybiB0aGlzLmluZGV4T2YodmFsLCBieXRlT2Zmc2V0LCBlbmNvZGluZykgIT09IC0xXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUuaW5kZXhPZiA9IGZ1bmN0aW9uIGluZGV4T2YgKHZhbCwgYnl0ZU9mZnNldCwgZW5jb2RpbmcpIHtcbiAgcmV0dXJuIGJpZGlyZWN0aW9uYWxJbmRleE9mKHRoaXMsIHZhbCwgYnl0ZU9mZnNldCwgZW5jb2RpbmcsIHRydWUpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUubGFzdEluZGV4T2YgPSBmdW5jdGlvbiBsYXN0SW5kZXhPZiAodmFsLCBieXRlT2Zmc2V0LCBlbmNvZGluZykge1xuICByZXR1cm4gYmlkaXJlY3Rpb25hbEluZGV4T2YodGhpcywgdmFsLCBieXRlT2Zmc2V0LCBlbmNvZGluZywgZmFsc2UpXG59XG5cbmZ1bmN0aW9uIGhleFdyaXRlIChidWYsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgb2Zmc2V0ID0gTnVtYmVyKG9mZnNldCkgfHwgMFxuICB2YXIgcmVtYWluaW5nID0gYnVmLmxlbmd0aCAtIG9mZnNldFxuICBpZiAoIWxlbmd0aCkge1xuICAgIGxlbmd0aCA9IHJlbWFpbmluZ1xuICB9IGVsc2Uge1xuICAgIGxlbmd0aCA9IE51bWJlcihsZW5ndGgpXG4gICAgaWYgKGxlbmd0aCA+IHJlbWFpbmluZykge1xuICAgICAgbGVuZ3RoID0gcmVtYWluaW5nXG4gICAgfVxuICB9XG5cbiAgLy8gbXVzdCBiZSBhbiBldmVuIG51bWJlciBvZiBkaWdpdHNcbiAgdmFyIHN0ckxlbiA9IHN0cmluZy5sZW5ndGhcbiAgaWYgKHN0ckxlbiAlIDIgIT09IDApIHRocm93IG5ldyBUeXBlRXJyb3IoJ0ludmFsaWQgaGV4IHN0cmluZycpXG5cbiAgaWYgKGxlbmd0aCA+IHN0ckxlbiAvIDIpIHtcbiAgICBsZW5ndGggPSBzdHJMZW4gLyAyXG4gIH1cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7ICsraSkge1xuICAgIHZhciBwYXJzZWQgPSBwYXJzZUludChzdHJpbmcuc3Vic3RyKGkgKiAyLCAyKSwgMTYpXG4gICAgaWYgKGlzTmFOKHBhcnNlZCkpIHJldHVybiBpXG4gICAgYnVmW29mZnNldCArIGldID0gcGFyc2VkXG4gIH1cbiAgcmV0dXJuIGlcbn1cblxuZnVuY3Rpb24gdXRmOFdyaXRlIChidWYsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgcmV0dXJuIGJsaXRCdWZmZXIodXRmOFRvQnl0ZXMoc3RyaW5nLCBidWYubGVuZ3RoIC0gb2Zmc2V0KSwgYnVmLCBvZmZzZXQsIGxlbmd0aClcbn1cblxuZnVuY3Rpb24gYXNjaWlXcml0ZSAoYnVmLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKSB7XG4gIHJldHVybiBibGl0QnVmZmVyKGFzY2lpVG9CeXRlcyhzdHJpbmcpLCBidWYsIG9mZnNldCwgbGVuZ3RoKVxufVxuXG5mdW5jdGlvbiBsYXRpbjFXcml0ZSAoYnVmLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKSB7XG4gIHJldHVybiBhc2NpaVdyaXRlKGJ1Ziwgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aClcbn1cblxuZnVuY3Rpb24gYmFzZTY0V3JpdGUgKGJ1Ziwgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCkge1xuICByZXR1cm4gYmxpdEJ1ZmZlcihiYXNlNjRUb0J5dGVzKHN0cmluZyksIGJ1Ziwgb2Zmc2V0LCBsZW5ndGgpXG59XG5cbmZ1bmN0aW9uIHVjczJXcml0ZSAoYnVmLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKSB7XG4gIHJldHVybiBibGl0QnVmZmVyKHV0ZjE2bGVUb0J5dGVzKHN0cmluZywgYnVmLmxlbmd0aCAtIG9mZnNldCksIGJ1Ziwgb2Zmc2V0LCBsZW5ndGgpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGUgPSBmdW5jdGlvbiB3cml0ZSAoc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCwgZW5jb2RpbmcpIHtcbiAgLy8gQnVmZmVyI3dyaXRlKHN0cmluZylcbiAgaWYgKG9mZnNldCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgZW5jb2RpbmcgPSAndXRmOCdcbiAgICBsZW5ndGggPSB0aGlzLmxlbmd0aFxuICAgIG9mZnNldCA9IDBcbiAgLy8gQnVmZmVyI3dyaXRlKHN0cmluZywgZW5jb2RpbmcpXG4gIH0gZWxzZSBpZiAobGVuZ3RoID09PSB1bmRlZmluZWQgJiYgdHlwZW9mIG9mZnNldCA9PT0gJ3N0cmluZycpIHtcbiAgICBlbmNvZGluZyA9IG9mZnNldFxuICAgIGxlbmd0aCA9IHRoaXMubGVuZ3RoXG4gICAgb2Zmc2V0ID0gMFxuICAvLyBCdWZmZXIjd3JpdGUoc3RyaW5nLCBvZmZzZXRbLCBsZW5ndGhdWywgZW5jb2RpbmddKVxuICB9IGVsc2UgaWYgKGlzRmluaXRlKG9mZnNldCkpIHtcbiAgICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gICAgaWYgKGlzRmluaXRlKGxlbmd0aCkpIHtcbiAgICAgIGxlbmd0aCA9IGxlbmd0aCB8IDBcbiAgICAgIGlmIChlbmNvZGluZyA9PT0gdW5kZWZpbmVkKSBlbmNvZGluZyA9ICd1dGY4J1xuICAgIH0gZWxzZSB7XG4gICAgICBlbmNvZGluZyA9IGxlbmd0aFxuICAgICAgbGVuZ3RoID0gdW5kZWZpbmVkXG4gICAgfVxuICAvLyBsZWdhY3kgd3JpdGUoc3RyaW5nLCBlbmNvZGluZywgb2Zmc2V0LCBsZW5ndGgpIC0gcmVtb3ZlIGluIHYwLjEzXG4gIH0gZWxzZSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgJ0J1ZmZlci53cml0ZShzdHJpbmcsIGVuY29kaW5nLCBvZmZzZXRbLCBsZW5ndGhdKSBpcyBubyBsb25nZXIgc3VwcG9ydGVkJ1xuICAgIClcbiAgfVxuXG4gIHZhciByZW1haW5pbmcgPSB0aGlzLmxlbmd0aCAtIG9mZnNldFxuICBpZiAobGVuZ3RoID09PSB1bmRlZmluZWQgfHwgbGVuZ3RoID4gcmVtYWluaW5nKSBsZW5ndGggPSByZW1haW5pbmdcblxuICBpZiAoKHN0cmluZy5sZW5ndGggPiAwICYmIChsZW5ndGggPCAwIHx8IG9mZnNldCA8IDApKSB8fCBvZmZzZXQgPiB0aGlzLmxlbmd0aCkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdBdHRlbXB0IHRvIHdyaXRlIG91dHNpZGUgYnVmZmVyIGJvdW5kcycpXG4gIH1cblxuICBpZiAoIWVuY29kaW5nKSBlbmNvZGluZyA9ICd1dGY4J1xuXG4gIHZhciBsb3dlcmVkQ2FzZSA9IGZhbHNlXG4gIGZvciAoOzspIHtcbiAgICBzd2l0Y2ggKGVuY29kaW5nKSB7XG4gICAgICBjYXNlICdoZXgnOlxuICAgICAgICByZXR1cm4gaGV4V3JpdGUodGhpcywgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aClcblxuICAgICAgY2FzZSAndXRmOCc6XG4gICAgICBjYXNlICd1dGYtOCc6XG4gICAgICAgIHJldHVybiB1dGY4V3JpdGUodGhpcywgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aClcblxuICAgICAgY2FzZSAnYXNjaWknOlxuICAgICAgICByZXR1cm4gYXNjaWlXcml0ZSh0aGlzLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKVxuXG4gICAgICBjYXNlICdsYXRpbjEnOlxuICAgICAgY2FzZSAnYmluYXJ5JzpcbiAgICAgICAgcmV0dXJuIGxhdGluMVdyaXRlKHRoaXMsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpXG5cbiAgICAgIGNhc2UgJ2Jhc2U2NCc6XG4gICAgICAgIC8vIFdhcm5pbmc6IG1heExlbmd0aCBub3QgdGFrZW4gaW50byBhY2NvdW50IGluIGJhc2U2NFdyaXRlXG4gICAgICAgIHJldHVybiBiYXNlNjRXcml0ZSh0aGlzLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKVxuXG4gICAgICBjYXNlICd1Y3MyJzpcbiAgICAgIGNhc2UgJ3Vjcy0yJzpcbiAgICAgIGNhc2UgJ3V0ZjE2bGUnOlxuICAgICAgY2FzZSAndXRmLTE2bGUnOlxuICAgICAgICByZXR1cm4gdWNzMldyaXRlKHRoaXMsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpXG5cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGlmIChsb3dlcmVkQ2FzZSkgdGhyb3cgbmV3IFR5cGVFcnJvcignVW5rbm93biBlbmNvZGluZzogJyArIGVuY29kaW5nKVxuICAgICAgICBlbmNvZGluZyA9ICgnJyArIGVuY29kaW5nKS50b0xvd2VyQ2FzZSgpXG4gICAgICAgIGxvd2VyZWRDYXNlID0gdHJ1ZVxuICAgIH1cbiAgfVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnRvSlNPTiA9IGZ1bmN0aW9uIHRvSlNPTiAoKSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogJ0J1ZmZlcicsXG4gICAgZGF0YTogQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwodGhpcy5fYXJyIHx8IHRoaXMsIDApXG4gIH1cbn1cblxuZnVuY3Rpb24gYmFzZTY0U2xpY2UgKGJ1Ziwgc3RhcnQsIGVuZCkge1xuICBpZiAoc3RhcnQgPT09IDAgJiYgZW5kID09PSBidWYubGVuZ3RoKSB7XG4gICAgcmV0dXJuIGJhc2U2NC5mcm9tQnl0ZUFycmF5KGJ1ZilcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gYmFzZTY0LmZyb21CeXRlQXJyYXkoYnVmLnNsaWNlKHN0YXJ0LCBlbmQpKVxuICB9XG59XG5cbmZ1bmN0aW9uIHV0ZjhTbGljZSAoYnVmLCBzdGFydCwgZW5kKSB7XG4gIGVuZCA9IE1hdGgubWluKGJ1Zi5sZW5ndGgsIGVuZClcbiAgdmFyIHJlcyA9IFtdXG5cbiAgdmFyIGkgPSBzdGFydFxuICB3aGlsZSAoaSA8IGVuZCkge1xuICAgIHZhciBmaXJzdEJ5dGUgPSBidWZbaV1cbiAgICB2YXIgY29kZVBvaW50ID0gbnVsbFxuICAgIHZhciBieXRlc1BlclNlcXVlbmNlID0gKGZpcnN0Qnl0ZSA+IDB4RUYpID8gNFxuICAgICAgOiAoZmlyc3RCeXRlID4gMHhERikgPyAzXG4gICAgICA6IChmaXJzdEJ5dGUgPiAweEJGKSA/IDJcbiAgICAgIDogMVxuXG4gICAgaWYgKGkgKyBieXRlc1BlclNlcXVlbmNlIDw9IGVuZCkge1xuICAgICAgdmFyIHNlY29uZEJ5dGUsIHRoaXJkQnl0ZSwgZm91cnRoQnl0ZSwgdGVtcENvZGVQb2ludFxuXG4gICAgICBzd2l0Y2ggKGJ5dGVzUGVyU2VxdWVuY2UpIHtcbiAgICAgICAgY2FzZSAxOlxuICAgICAgICAgIGlmIChmaXJzdEJ5dGUgPCAweDgwKSB7XG4gICAgICAgICAgICBjb2RlUG9pbnQgPSBmaXJzdEJ5dGVcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSAyOlxuICAgICAgICAgIHNlY29uZEJ5dGUgPSBidWZbaSArIDFdXG4gICAgICAgICAgaWYgKChzZWNvbmRCeXRlICYgMHhDMCkgPT09IDB4ODApIHtcbiAgICAgICAgICAgIHRlbXBDb2RlUG9pbnQgPSAoZmlyc3RCeXRlICYgMHgxRikgPDwgMHg2IHwgKHNlY29uZEJ5dGUgJiAweDNGKVxuICAgICAgICAgICAgaWYgKHRlbXBDb2RlUG9pbnQgPiAweDdGKSB7XG4gICAgICAgICAgICAgIGNvZGVQb2ludCA9IHRlbXBDb2RlUG9pbnRcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSAzOlxuICAgICAgICAgIHNlY29uZEJ5dGUgPSBidWZbaSArIDFdXG4gICAgICAgICAgdGhpcmRCeXRlID0gYnVmW2kgKyAyXVxuICAgICAgICAgIGlmICgoc2Vjb25kQnl0ZSAmIDB4QzApID09PSAweDgwICYmICh0aGlyZEJ5dGUgJiAweEMwKSA9PT0gMHg4MCkge1xuICAgICAgICAgICAgdGVtcENvZGVQb2ludCA9IChmaXJzdEJ5dGUgJiAweEYpIDw8IDB4QyB8IChzZWNvbmRCeXRlICYgMHgzRikgPDwgMHg2IHwgKHRoaXJkQnl0ZSAmIDB4M0YpXG4gICAgICAgICAgICBpZiAodGVtcENvZGVQb2ludCA+IDB4N0ZGICYmICh0ZW1wQ29kZVBvaW50IDwgMHhEODAwIHx8IHRlbXBDb2RlUG9pbnQgPiAweERGRkYpKSB7XG4gICAgICAgICAgICAgIGNvZGVQb2ludCA9IHRlbXBDb2RlUG9pbnRcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSA0OlxuICAgICAgICAgIHNlY29uZEJ5dGUgPSBidWZbaSArIDFdXG4gICAgICAgICAgdGhpcmRCeXRlID0gYnVmW2kgKyAyXVxuICAgICAgICAgIGZvdXJ0aEJ5dGUgPSBidWZbaSArIDNdXG4gICAgICAgICAgaWYgKChzZWNvbmRCeXRlICYgMHhDMCkgPT09IDB4ODAgJiYgKHRoaXJkQnl0ZSAmIDB4QzApID09PSAweDgwICYmIChmb3VydGhCeXRlICYgMHhDMCkgPT09IDB4ODApIHtcbiAgICAgICAgICAgIHRlbXBDb2RlUG9pbnQgPSAoZmlyc3RCeXRlICYgMHhGKSA8PCAweDEyIHwgKHNlY29uZEJ5dGUgJiAweDNGKSA8PCAweEMgfCAodGhpcmRCeXRlICYgMHgzRikgPDwgMHg2IHwgKGZvdXJ0aEJ5dGUgJiAweDNGKVxuICAgICAgICAgICAgaWYgKHRlbXBDb2RlUG9pbnQgPiAweEZGRkYgJiYgdGVtcENvZGVQb2ludCA8IDB4MTEwMDAwKSB7XG4gICAgICAgICAgICAgIGNvZGVQb2ludCA9IHRlbXBDb2RlUG9pbnRcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGNvZGVQb2ludCA9PT0gbnVsbCkge1xuICAgICAgLy8gd2UgZGlkIG5vdCBnZW5lcmF0ZSBhIHZhbGlkIGNvZGVQb2ludCBzbyBpbnNlcnQgYVxuICAgICAgLy8gcmVwbGFjZW1lbnQgY2hhciAoVStGRkZEKSBhbmQgYWR2YW5jZSBvbmx5IDEgYnl0ZVxuICAgICAgY29kZVBvaW50ID0gMHhGRkZEXG4gICAgICBieXRlc1BlclNlcXVlbmNlID0gMVxuICAgIH0gZWxzZSBpZiAoY29kZVBvaW50ID4gMHhGRkZGKSB7XG4gICAgICAvLyBlbmNvZGUgdG8gdXRmMTYgKHN1cnJvZ2F0ZSBwYWlyIGRhbmNlKVxuICAgICAgY29kZVBvaW50IC09IDB4MTAwMDBcbiAgICAgIHJlcy5wdXNoKGNvZGVQb2ludCA+Pj4gMTAgJiAweDNGRiB8IDB4RDgwMClcbiAgICAgIGNvZGVQb2ludCA9IDB4REMwMCB8IGNvZGVQb2ludCAmIDB4M0ZGXG4gICAgfVxuXG4gICAgcmVzLnB1c2goY29kZVBvaW50KVxuICAgIGkgKz0gYnl0ZXNQZXJTZXF1ZW5jZVxuICB9XG5cbiAgcmV0dXJuIGRlY29kZUNvZGVQb2ludHNBcnJheShyZXMpXG59XG5cbi8vIEJhc2VkIG9uIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzIyNzQ3MjcyLzY4MDc0MiwgdGhlIGJyb3dzZXIgd2l0aFxuLy8gdGhlIGxvd2VzdCBsaW1pdCBpcyBDaHJvbWUsIHdpdGggMHgxMDAwMCBhcmdzLlxuLy8gV2UgZ28gMSBtYWduaXR1ZGUgbGVzcywgZm9yIHNhZmV0eVxudmFyIE1BWF9BUkdVTUVOVFNfTEVOR1RIID0gMHgxMDAwXG5cbmZ1bmN0aW9uIGRlY29kZUNvZGVQb2ludHNBcnJheSAoY29kZVBvaW50cykge1xuICB2YXIgbGVuID0gY29kZVBvaW50cy5sZW5ndGhcbiAgaWYgKGxlbiA8PSBNQVhfQVJHVU1FTlRTX0xFTkdUSCkge1xuICAgIHJldHVybiBTdHJpbmcuZnJvbUNoYXJDb2RlLmFwcGx5KFN0cmluZywgY29kZVBvaW50cykgLy8gYXZvaWQgZXh0cmEgc2xpY2UoKVxuICB9XG5cbiAgLy8gRGVjb2RlIGluIGNodW5rcyB0byBhdm9pZCBcImNhbGwgc3RhY2sgc2l6ZSBleGNlZWRlZFwiLlxuICB2YXIgcmVzID0gJydcbiAgdmFyIGkgPSAwXG4gIHdoaWxlIChpIDwgbGVuKSB7XG4gICAgcmVzICs9IFN0cmluZy5mcm9tQ2hhckNvZGUuYXBwbHkoXG4gICAgICBTdHJpbmcsXG4gICAgICBjb2RlUG9pbnRzLnNsaWNlKGksIGkgKz0gTUFYX0FSR1VNRU5UU19MRU5HVEgpXG4gICAgKVxuICB9XG4gIHJldHVybiByZXNcbn1cblxuZnVuY3Rpb24gYXNjaWlTbGljZSAoYnVmLCBzdGFydCwgZW5kKSB7XG4gIHZhciByZXQgPSAnJ1xuICBlbmQgPSBNYXRoLm1pbihidWYubGVuZ3RoLCBlbmQpXG5cbiAgZm9yICh2YXIgaSA9IHN0YXJ0OyBpIDwgZW5kOyArK2kpIHtcbiAgICByZXQgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShidWZbaV0gJiAweDdGKVxuICB9XG4gIHJldHVybiByZXRcbn1cblxuZnVuY3Rpb24gbGF0aW4xU2xpY2UgKGJ1Ziwgc3RhcnQsIGVuZCkge1xuICB2YXIgcmV0ID0gJydcbiAgZW5kID0gTWF0aC5taW4oYnVmLmxlbmd0aCwgZW5kKVxuXG4gIGZvciAodmFyIGkgPSBzdGFydDsgaSA8IGVuZDsgKytpKSB7XG4gICAgcmV0ICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoYnVmW2ldKVxuICB9XG4gIHJldHVybiByZXRcbn1cblxuZnVuY3Rpb24gaGV4U2xpY2UgKGJ1Ziwgc3RhcnQsIGVuZCkge1xuICB2YXIgbGVuID0gYnVmLmxlbmd0aFxuXG4gIGlmICghc3RhcnQgfHwgc3RhcnQgPCAwKSBzdGFydCA9IDBcbiAgaWYgKCFlbmQgfHwgZW5kIDwgMCB8fCBlbmQgPiBsZW4pIGVuZCA9IGxlblxuXG4gIHZhciBvdXQgPSAnJ1xuICBmb3IgKHZhciBpID0gc3RhcnQ7IGkgPCBlbmQ7ICsraSkge1xuICAgIG91dCArPSB0b0hleChidWZbaV0pXG4gIH1cbiAgcmV0dXJuIG91dFxufVxuXG5mdW5jdGlvbiB1dGYxNmxlU2xpY2UgKGJ1Ziwgc3RhcnQsIGVuZCkge1xuICB2YXIgYnl0ZXMgPSBidWYuc2xpY2Uoc3RhcnQsIGVuZClcbiAgdmFyIHJlcyA9ICcnXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgYnl0ZXMubGVuZ3RoOyBpICs9IDIpIHtcbiAgICByZXMgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShieXRlc1tpXSArIGJ5dGVzW2kgKyAxXSAqIDI1NilcbiAgfVxuICByZXR1cm4gcmVzXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUuc2xpY2UgPSBmdW5jdGlvbiBzbGljZSAoc3RhcnQsIGVuZCkge1xuICB2YXIgbGVuID0gdGhpcy5sZW5ndGhcbiAgc3RhcnQgPSB+fnN0YXJ0XG4gIGVuZCA9IGVuZCA9PT0gdW5kZWZpbmVkID8gbGVuIDogfn5lbmRcblxuICBpZiAoc3RhcnQgPCAwKSB7XG4gICAgc3RhcnQgKz0gbGVuXG4gICAgaWYgKHN0YXJ0IDwgMCkgc3RhcnQgPSAwXG4gIH0gZWxzZSBpZiAoc3RhcnQgPiBsZW4pIHtcbiAgICBzdGFydCA9IGxlblxuICB9XG5cbiAgaWYgKGVuZCA8IDApIHtcbiAgICBlbmQgKz0gbGVuXG4gICAgaWYgKGVuZCA8IDApIGVuZCA9IDBcbiAgfSBlbHNlIGlmIChlbmQgPiBsZW4pIHtcbiAgICBlbmQgPSBsZW5cbiAgfVxuXG4gIGlmIChlbmQgPCBzdGFydCkgZW5kID0gc3RhcnRcblxuICB2YXIgbmV3QnVmXG4gIGlmIChCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkge1xuICAgIG5ld0J1ZiA9IHRoaXMuc3ViYXJyYXkoc3RhcnQsIGVuZClcbiAgICBuZXdCdWYuX19wcm90b19fID0gQnVmZmVyLnByb3RvdHlwZVxuICB9IGVsc2Uge1xuICAgIHZhciBzbGljZUxlbiA9IGVuZCAtIHN0YXJ0XG4gICAgbmV3QnVmID0gbmV3IEJ1ZmZlcihzbGljZUxlbiwgdW5kZWZpbmVkKVxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2xpY2VMZW47ICsraSkge1xuICAgICAgbmV3QnVmW2ldID0gdGhpc1tpICsgc3RhcnRdXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG5ld0J1ZlxufVxuXG4vKlxuICogTmVlZCB0byBtYWtlIHN1cmUgdGhhdCBidWZmZXIgaXNuJ3QgdHJ5aW5nIHRvIHdyaXRlIG91dCBvZiBib3VuZHMuXG4gKi9cbmZ1bmN0aW9uIGNoZWNrT2Zmc2V0IChvZmZzZXQsIGV4dCwgbGVuZ3RoKSB7XG4gIGlmICgob2Zmc2V0ICUgMSkgIT09IDAgfHwgb2Zmc2V0IDwgMCkgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ29mZnNldCBpcyBub3QgdWludCcpXG4gIGlmIChvZmZzZXQgKyBleHQgPiBsZW5ndGgpIHRocm93IG5ldyBSYW5nZUVycm9yKCdUcnlpbmcgdG8gYWNjZXNzIGJleW9uZCBidWZmZXIgbGVuZ3RoJylcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkVUludExFID0gZnVuY3Rpb24gcmVhZFVJbnRMRSAob2Zmc2V0LCBieXRlTGVuZ3RoLCBub0Fzc2VydCkge1xuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGJ5dGVMZW5ndGggPSBieXRlTGVuZ3RoIHwgMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIGJ5dGVMZW5ndGgsIHRoaXMubGVuZ3RoKVxuXG4gIHZhciB2YWwgPSB0aGlzW29mZnNldF1cbiAgdmFyIG11bCA9IDFcbiAgdmFyIGkgPSAwXG4gIHdoaWxlICgrK2kgPCBieXRlTGVuZ3RoICYmIChtdWwgKj0gMHgxMDApKSB7XG4gICAgdmFsICs9IHRoaXNbb2Zmc2V0ICsgaV0gKiBtdWxcbiAgfVxuXG4gIHJldHVybiB2YWxcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkVUludEJFID0gZnVuY3Rpb24gcmVhZFVJbnRCRSAob2Zmc2V0LCBieXRlTGVuZ3RoLCBub0Fzc2VydCkge1xuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGJ5dGVMZW5ndGggPSBieXRlTGVuZ3RoIHwgMFxuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgY2hlY2tPZmZzZXQob2Zmc2V0LCBieXRlTGVuZ3RoLCB0aGlzLmxlbmd0aClcbiAgfVxuXG4gIHZhciB2YWwgPSB0aGlzW29mZnNldCArIC0tYnl0ZUxlbmd0aF1cbiAgdmFyIG11bCA9IDFcbiAgd2hpbGUgKGJ5dGVMZW5ndGggPiAwICYmIChtdWwgKj0gMHgxMDApKSB7XG4gICAgdmFsICs9IHRoaXNbb2Zmc2V0ICsgLS1ieXRlTGVuZ3RoXSAqIG11bFxuICB9XG5cbiAgcmV0dXJuIHZhbFxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRVSW50OCA9IGZ1bmN0aW9uIHJlYWRVSW50OCAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDEsIHRoaXMubGVuZ3RoKVxuICByZXR1cm4gdGhpc1tvZmZzZXRdXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVJbnQxNkxFID0gZnVuY3Rpb24gcmVhZFVJbnQxNkxFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgMiwgdGhpcy5sZW5ndGgpXG4gIHJldHVybiB0aGlzW29mZnNldF0gfCAodGhpc1tvZmZzZXQgKyAxXSA8PCA4KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRVSW50MTZCRSA9IGZ1bmN0aW9uIHJlYWRVSW50MTZCRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDIsIHRoaXMubGVuZ3RoKVxuICByZXR1cm4gKHRoaXNbb2Zmc2V0XSA8PCA4KSB8IHRoaXNbb2Zmc2V0ICsgMV1cbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkVUludDMyTEUgPSBmdW5jdGlvbiByZWFkVUludDMyTEUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCA0LCB0aGlzLmxlbmd0aClcblxuICByZXR1cm4gKCh0aGlzW29mZnNldF0pIHxcbiAgICAgICh0aGlzW29mZnNldCArIDFdIDw8IDgpIHxcbiAgICAgICh0aGlzW29mZnNldCArIDJdIDw8IDE2KSkgK1xuICAgICAgKHRoaXNbb2Zmc2V0ICsgM10gKiAweDEwMDAwMDApXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVJbnQzMkJFID0gZnVuY3Rpb24gcmVhZFVJbnQzMkJFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgNCwgdGhpcy5sZW5ndGgpXG5cbiAgcmV0dXJuICh0aGlzW29mZnNldF0gKiAweDEwMDAwMDApICtcbiAgICAoKHRoaXNbb2Zmc2V0ICsgMV0gPDwgMTYpIHxcbiAgICAodGhpc1tvZmZzZXQgKyAyXSA8PCA4KSB8XG4gICAgdGhpc1tvZmZzZXQgKyAzXSlcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkSW50TEUgPSBmdW5jdGlvbiByZWFkSW50TEUgKG9mZnNldCwgYnl0ZUxlbmd0aCwgbm9Bc3NlcnQpIHtcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBieXRlTGVuZ3RoID0gYnl0ZUxlbmd0aCB8IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCBieXRlTGVuZ3RoLCB0aGlzLmxlbmd0aClcblxuICB2YXIgdmFsID0gdGhpc1tvZmZzZXRdXG4gIHZhciBtdWwgPSAxXG4gIHZhciBpID0gMFxuICB3aGlsZSAoKytpIDwgYnl0ZUxlbmd0aCAmJiAobXVsICo9IDB4MTAwKSkge1xuICAgIHZhbCArPSB0aGlzW29mZnNldCArIGldICogbXVsXG4gIH1cbiAgbXVsICo9IDB4ODBcblxuICBpZiAodmFsID49IG11bCkgdmFsIC09IE1hdGgucG93KDIsIDggKiBieXRlTGVuZ3RoKVxuXG4gIHJldHVybiB2YWxcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkSW50QkUgPSBmdW5jdGlvbiByZWFkSW50QkUgKG9mZnNldCwgYnl0ZUxlbmd0aCwgbm9Bc3NlcnQpIHtcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBieXRlTGVuZ3RoID0gYnl0ZUxlbmd0aCB8IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCBieXRlTGVuZ3RoLCB0aGlzLmxlbmd0aClcblxuICB2YXIgaSA9IGJ5dGVMZW5ndGhcbiAgdmFyIG11bCA9IDFcbiAgdmFyIHZhbCA9IHRoaXNbb2Zmc2V0ICsgLS1pXVxuICB3aGlsZSAoaSA+IDAgJiYgKG11bCAqPSAweDEwMCkpIHtcbiAgICB2YWwgKz0gdGhpc1tvZmZzZXQgKyAtLWldICogbXVsXG4gIH1cbiAgbXVsICo9IDB4ODBcblxuICBpZiAodmFsID49IG11bCkgdmFsIC09IE1hdGgucG93KDIsIDggKiBieXRlTGVuZ3RoKVxuXG4gIHJldHVybiB2YWxcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkSW50OCA9IGZ1bmN0aW9uIHJlYWRJbnQ4IChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgMSwgdGhpcy5sZW5ndGgpXG4gIGlmICghKHRoaXNbb2Zmc2V0XSAmIDB4ODApKSByZXR1cm4gKHRoaXNbb2Zmc2V0XSlcbiAgcmV0dXJuICgoMHhmZiAtIHRoaXNbb2Zmc2V0XSArIDEpICogLTEpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEludDE2TEUgPSBmdW5jdGlvbiByZWFkSW50MTZMRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDIsIHRoaXMubGVuZ3RoKVxuICB2YXIgdmFsID0gdGhpc1tvZmZzZXRdIHwgKHRoaXNbb2Zmc2V0ICsgMV0gPDwgOClcbiAgcmV0dXJuICh2YWwgJiAweDgwMDApID8gdmFsIHwgMHhGRkZGMDAwMCA6IHZhbFxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRJbnQxNkJFID0gZnVuY3Rpb24gcmVhZEludDE2QkUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCAyLCB0aGlzLmxlbmd0aClcbiAgdmFyIHZhbCA9IHRoaXNbb2Zmc2V0ICsgMV0gfCAodGhpc1tvZmZzZXRdIDw8IDgpXG4gIHJldHVybiAodmFsICYgMHg4MDAwKSA/IHZhbCB8IDB4RkZGRjAwMDAgOiB2YWxcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkSW50MzJMRSA9IGZ1bmN0aW9uIHJlYWRJbnQzMkxFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgNCwgdGhpcy5sZW5ndGgpXG5cbiAgcmV0dXJuICh0aGlzW29mZnNldF0pIHxcbiAgICAodGhpc1tvZmZzZXQgKyAxXSA8PCA4KSB8XG4gICAgKHRoaXNbb2Zmc2V0ICsgMl0gPDwgMTYpIHxcbiAgICAodGhpc1tvZmZzZXQgKyAzXSA8PCAyNClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkSW50MzJCRSA9IGZ1bmN0aW9uIHJlYWRJbnQzMkJFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgNCwgdGhpcy5sZW5ndGgpXG5cbiAgcmV0dXJuICh0aGlzW29mZnNldF0gPDwgMjQpIHxcbiAgICAodGhpc1tvZmZzZXQgKyAxXSA8PCAxNikgfFxuICAgICh0aGlzW29mZnNldCArIDJdIDw8IDgpIHxcbiAgICAodGhpc1tvZmZzZXQgKyAzXSlcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkRmxvYXRMRSA9IGZ1bmN0aW9uIHJlYWRGbG9hdExFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgNCwgdGhpcy5sZW5ndGgpXG4gIHJldHVybiBpZWVlNzU0LnJlYWQodGhpcywgb2Zmc2V0LCB0cnVlLCAyMywgNClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkRmxvYXRCRSA9IGZ1bmN0aW9uIHJlYWRGbG9hdEJFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgNCwgdGhpcy5sZW5ndGgpXG4gIHJldHVybiBpZWVlNzU0LnJlYWQodGhpcywgb2Zmc2V0LCBmYWxzZSwgMjMsIDQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZERvdWJsZUxFID0gZnVuY3Rpb24gcmVhZERvdWJsZUxFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgOCwgdGhpcy5sZW5ndGgpXG4gIHJldHVybiBpZWVlNzU0LnJlYWQodGhpcywgb2Zmc2V0LCB0cnVlLCA1MiwgOClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkRG91YmxlQkUgPSBmdW5jdGlvbiByZWFkRG91YmxlQkUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCA4LCB0aGlzLmxlbmd0aClcbiAgcmV0dXJuIGllZWU3NTQucmVhZCh0aGlzLCBvZmZzZXQsIGZhbHNlLCA1MiwgOClcbn1cblxuZnVuY3Rpb24gY2hlY2tJbnQgKGJ1ZiwgdmFsdWUsIG9mZnNldCwgZXh0LCBtYXgsIG1pbikge1xuICBpZiAoIUJ1ZmZlci5pc0J1ZmZlcihidWYpKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdcImJ1ZmZlclwiIGFyZ3VtZW50IG11c3QgYmUgYSBCdWZmZXIgaW5zdGFuY2UnKVxuICBpZiAodmFsdWUgPiBtYXggfHwgdmFsdWUgPCBtaW4pIHRocm93IG5ldyBSYW5nZUVycm9yKCdcInZhbHVlXCIgYXJndW1lbnQgaXMgb3V0IG9mIGJvdW5kcycpXG4gIGlmIChvZmZzZXQgKyBleHQgPiBidWYubGVuZ3RoKSB0aHJvdyBuZXcgUmFuZ2VFcnJvcignSW5kZXggb3V0IG9mIHJhbmdlJylcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnRMRSA9IGZ1bmN0aW9uIHdyaXRlVUludExFICh2YWx1ZSwgb2Zmc2V0LCBieXRlTGVuZ3RoLCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGJ5dGVMZW5ndGggPSBieXRlTGVuZ3RoIHwgMFxuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgdmFyIG1heEJ5dGVzID0gTWF0aC5wb3coMiwgOCAqIGJ5dGVMZW5ndGgpIC0gMVxuICAgIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIGJ5dGVMZW5ndGgsIG1heEJ5dGVzLCAwKVxuICB9XG5cbiAgdmFyIG11bCA9IDFcbiAgdmFyIGkgPSAwXG4gIHRoaXNbb2Zmc2V0XSA9IHZhbHVlICYgMHhGRlxuICB3aGlsZSAoKytpIDwgYnl0ZUxlbmd0aCAmJiAobXVsICo9IDB4MTAwKSkge1xuICAgIHRoaXNbb2Zmc2V0ICsgaV0gPSAodmFsdWUgLyBtdWwpICYgMHhGRlxuICB9XG5cbiAgcmV0dXJuIG9mZnNldCArIGJ5dGVMZW5ndGhcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnRCRSA9IGZ1bmN0aW9uIHdyaXRlVUludEJFICh2YWx1ZSwgb2Zmc2V0LCBieXRlTGVuZ3RoLCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGJ5dGVMZW5ndGggPSBieXRlTGVuZ3RoIHwgMFxuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgdmFyIG1heEJ5dGVzID0gTWF0aC5wb3coMiwgOCAqIGJ5dGVMZW5ndGgpIC0gMVxuICAgIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIGJ5dGVMZW5ndGgsIG1heEJ5dGVzLCAwKVxuICB9XG5cbiAgdmFyIGkgPSBieXRlTGVuZ3RoIC0gMVxuICB2YXIgbXVsID0gMVxuICB0aGlzW29mZnNldCArIGldID0gdmFsdWUgJiAweEZGXG4gIHdoaWxlICgtLWkgPj0gMCAmJiAobXVsICo9IDB4MTAwKSkge1xuICAgIHRoaXNbb2Zmc2V0ICsgaV0gPSAodmFsdWUgLyBtdWwpICYgMHhGRlxuICB9XG5cbiAgcmV0dXJuIG9mZnNldCArIGJ5dGVMZW5ndGhcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnQ4ID0gZnVuY3Rpb24gd3JpdGVVSW50OCAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCAxLCAweGZmLCAwKVxuICBpZiAoIUJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB2YWx1ZSA9IE1hdGguZmxvb3IodmFsdWUpXG4gIHRoaXNbb2Zmc2V0XSA9ICh2YWx1ZSAmIDB4ZmYpXG4gIHJldHVybiBvZmZzZXQgKyAxXG59XG5cbmZ1bmN0aW9uIG9iamVjdFdyaXRlVUludDE2IChidWYsIHZhbHVlLCBvZmZzZXQsIGxpdHRsZUVuZGlhbikge1xuICBpZiAodmFsdWUgPCAwKSB2YWx1ZSA9IDB4ZmZmZiArIHZhbHVlICsgMVxuICBmb3IgKHZhciBpID0gMCwgaiA9IE1hdGgubWluKGJ1Zi5sZW5ndGggLSBvZmZzZXQsIDIpOyBpIDwgajsgKytpKSB7XG4gICAgYnVmW29mZnNldCArIGldID0gKHZhbHVlICYgKDB4ZmYgPDwgKDggKiAobGl0dGxlRW5kaWFuID8gaSA6IDEgLSBpKSkpKSA+Pj5cbiAgICAgIChsaXR0bGVFbmRpYW4gPyBpIDogMSAtIGkpICogOFxuICB9XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVVSW50MTZMRSA9IGZ1bmN0aW9uIHdyaXRlVUludDE2TEUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgMiwgMHhmZmZmLCAwKVxuICBpZiAoQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHtcbiAgICB0aGlzW29mZnNldF0gPSAodmFsdWUgJiAweGZmKVxuICAgIHRoaXNbb2Zmc2V0ICsgMV0gPSAodmFsdWUgPj4+IDgpXG4gIH0gZWxzZSB7XG4gICAgb2JqZWN0V3JpdGVVSW50MTYodGhpcywgdmFsdWUsIG9mZnNldCwgdHJ1ZSlcbiAgfVxuICByZXR1cm4gb2Zmc2V0ICsgMlxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlVUludDE2QkUgPSBmdW5jdGlvbiB3cml0ZVVJbnQxNkJFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDIsIDB4ZmZmZiwgMClcbiAgaWYgKEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB7XG4gICAgdGhpc1tvZmZzZXRdID0gKHZhbHVlID4+PiA4KVxuICAgIHRoaXNbb2Zmc2V0ICsgMV0gPSAodmFsdWUgJiAweGZmKVxuICB9IGVsc2Uge1xuICAgIG9iamVjdFdyaXRlVUludDE2KHRoaXMsIHZhbHVlLCBvZmZzZXQsIGZhbHNlKVxuICB9XG4gIHJldHVybiBvZmZzZXQgKyAyXG59XG5cbmZ1bmN0aW9uIG9iamVjdFdyaXRlVUludDMyIChidWYsIHZhbHVlLCBvZmZzZXQsIGxpdHRsZUVuZGlhbikge1xuICBpZiAodmFsdWUgPCAwKSB2YWx1ZSA9IDB4ZmZmZmZmZmYgKyB2YWx1ZSArIDFcbiAgZm9yICh2YXIgaSA9IDAsIGogPSBNYXRoLm1pbihidWYubGVuZ3RoIC0gb2Zmc2V0LCA0KTsgaSA8IGo7ICsraSkge1xuICAgIGJ1ZltvZmZzZXQgKyBpXSA9ICh2YWx1ZSA+Pj4gKGxpdHRsZUVuZGlhbiA/IGkgOiAzIC0gaSkgKiA4KSAmIDB4ZmZcbiAgfVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlVUludDMyTEUgPSBmdW5jdGlvbiB3cml0ZVVJbnQzMkxFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDQsIDB4ZmZmZmZmZmYsIDApXG4gIGlmIChCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkge1xuICAgIHRoaXNbb2Zmc2V0ICsgM10gPSAodmFsdWUgPj4+IDI0KVxuICAgIHRoaXNbb2Zmc2V0ICsgMl0gPSAodmFsdWUgPj4+IDE2KVxuICAgIHRoaXNbb2Zmc2V0ICsgMV0gPSAodmFsdWUgPj4+IDgpXG4gICAgdGhpc1tvZmZzZXRdID0gKHZhbHVlICYgMHhmZilcbiAgfSBlbHNlIHtcbiAgICBvYmplY3RXcml0ZVVJbnQzMih0aGlzLCB2YWx1ZSwgb2Zmc2V0LCB0cnVlKVxuICB9XG4gIHJldHVybiBvZmZzZXQgKyA0XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVVSW50MzJCRSA9IGZ1bmN0aW9uIHdyaXRlVUludDMyQkUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgNCwgMHhmZmZmZmZmZiwgMClcbiAgaWYgKEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB7XG4gICAgdGhpc1tvZmZzZXRdID0gKHZhbHVlID4+PiAyNClcbiAgICB0aGlzW29mZnNldCArIDFdID0gKHZhbHVlID4+PiAxNilcbiAgICB0aGlzW29mZnNldCArIDJdID0gKHZhbHVlID4+PiA4KVxuICAgIHRoaXNbb2Zmc2V0ICsgM10gPSAodmFsdWUgJiAweGZmKVxuICB9IGVsc2Uge1xuICAgIG9iamVjdFdyaXRlVUludDMyKHRoaXMsIHZhbHVlLCBvZmZzZXQsIGZhbHNlKVxuICB9XG4gIHJldHVybiBvZmZzZXQgKyA0XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVJbnRMRSA9IGZ1bmN0aW9uIHdyaXRlSW50TEUgKHZhbHVlLCBvZmZzZXQsIGJ5dGVMZW5ndGgsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIHZhciBsaW1pdCA9IE1hdGgucG93KDIsIDggKiBieXRlTGVuZ3RoIC0gMSlcblxuICAgIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIGJ5dGVMZW5ndGgsIGxpbWl0IC0gMSwgLWxpbWl0KVxuICB9XG5cbiAgdmFyIGkgPSAwXG4gIHZhciBtdWwgPSAxXG4gIHZhciBzdWIgPSAwXG4gIHRoaXNbb2Zmc2V0XSA9IHZhbHVlICYgMHhGRlxuICB3aGlsZSAoKytpIDwgYnl0ZUxlbmd0aCAmJiAobXVsICo9IDB4MTAwKSkge1xuICAgIGlmICh2YWx1ZSA8IDAgJiYgc3ViID09PSAwICYmIHRoaXNbb2Zmc2V0ICsgaSAtIDFdICE9PSAwKSB7XG4gICAgICBzdWIgPSAxXG4gICAgfVxuICAgIHRoaXNbb2Zmc2V0ICsgaV0gPSAoKHZhbHVlIC8gbXVsKSA+PiAwKSAtIHN1YiAmIDB4RkZcbiAgfVxuXG4gIHJldHVybiBvZmZzZXQgKyBieXRlTGVuZ3RoXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVJbnRCRSA9IGZ1bmN0aW9uIHdyaXRlSW50QkUgKHZhbHVlLCBvZmZzZXQsIGJ5dGVMZW5ndGgsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIHZhciBsaW1pdCA9IE1hdGgucG93KDIsIDggKiBieXRlTGVuZ3RoIC0gMSlcblxuICAgIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIGJ5dGVMZW5ndGgsIGxpbWl0IC0gMSwgLWxpbWl0KVxuICB9XG5cbiAgdmFyIGkgPSBieXRlTGVuZ3RoIC0gMVxuICB2YXIgbXVsID0gMVxuICB2YXIgc3ViID0gMFxuICB0aGlzW29mZnNldCArIGldID0gdmFsdWUgJiAweEZGXG4gIHdoaWxlICgtLWkgPj0gMCAmJiAobXVsICo9IDB4MTAwKSkge1xuICAgIGlmICh2YWx1ZSA8IDAgJiYgc3ViID09PSAwICYmIHRoaXNbb2Zmc2V0ICsgaSArIDFdICE9PSAwKSB7XG4gICAgICBzdWIgPSAxXG4gICAgfVxuICAgIHRoaXNbb2Zmc2V0ICsgaV0gPSAoKHZhbHVlIC8gbXVsKSA+PiAwKSAtIHN1YiAmIDB4RkZcbiAgfVxuXG4gIHJldHVybiBvZmZzZXQgKyBieXRlTGVuZ3RoXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVJbnQ4ID0gZnVuY3Rpb24gd3JpdGVJbnQ4ICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDEsIDB4N2YsIC0weDgwKVxuICBpZiAoIUJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB2YWx1ZSA9IE1hdGguZmxvb3IodmFsdWUpXG4gIGlmICh2YWx1ZSA8IDApIHZhbHVlID0gMHhmZiArIHZhbHVlICsgMVxuICB0aGlzW29mZnNldF0gPSAodmFsdWUgJiAweGZmKVxuICByZXR1cm4gb2Zmc2V0ICsgMVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlSW50MTZMRSA9IGZ1bmN0aW9uIHdyaXRlSW50MTZMRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCAyLCAweDdmZmYsIC0weDgwMDApXG4gIGlmIChCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkge1xuICAgIHRoaXNbb2Zmc2V0XSA9ICh2YWx1ZSAmIDB4ZmYpXG4gICAgdGhpc1tvZmZzZXQgKyAxXSA9ICh2YWx1ZSA+Pj4gOClcbiAgfSBlbHNlIHtcbiAgICBvYmplY3RXcml0ZVVJbnQxNih0aGlzLCB2YWx1ZSwgb2Zmc2V0LCB0cnVlKVxuICB9XG4gIHJldHVybiBvZmZzZXQgKyAyXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVJbnQxNkJFID0gZnVuY3Rpb24gd3JpdGVJbnQxNkJFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDIsIDB4N2ZmZiwgLTB4ODAwMClcbiAgaWYgKEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB7XG4gICAgdGhpc1tvZmZzZXRdID0gKHZhbHVlID4+PiA4KVxuICAgIHRoaXNbb2Zmc2V0ICsgMV0gPSAodmFsdWUgJiAweGZmKVxuICB9IGVsc2Uge1xuICAgIG9iamVjdFdyaXRlVUludDE2KHRoaXMsIHZhbHVlLCBvZmZzZXQsIGZhbHNlKVxuICB9XG4gIHJldHVybiBvZmZzZXQgKyAyXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVJbnQzMkxFID0gZnVuY3Rpb24gd3JpdGVJbnQzMkxFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDQsIDB4N2ZmZmZmZmYsIC0weDgwMDAwMDAwKVxuICBpZiAoQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHtcbiAgICB0aGlzW29mZnNldF0gPSAodmFsdWUgJiAweGZmKVxuICAgIHRoaXNbb2Zmc2V0ICsgMV0gPSAodmFsdWUgPj4+IDgpXG4gICAgdGhpc1tvZmZzZXQgKyAyXSA9ICh2YWx1ZSA+Pj4gMTYpXG4gICAgdGhpc1tvZmZzZXQgKyAzXSA9ICh2YWx1ZSA+Pj4gMjQpXG4gIH0gZWxzZSB7XG4gICAgb2JqZWN0V3JpdGVVSW50MzIodGhpcywgdmFsdWUsIG9mZnNldCwgdHJ1ZSlcbiAgfVxuICByZXR1cm4gb2Zmc2V0ICsgNFxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlSW50MzJCRSA9IGZ1bmN0aW9uIHdyaXRlSW50MzJCRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCA0LCAweDdmZmZmZmZmLCAtMHg4MDAwMDAwMClcbiAgaWYgKHZhbHVlIDwgMCkgdmFsdWUgPSAweGZmZmZmZmZmICsgdmFsdWUgKyAxXG4gIGlmIChCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkge1xuICAgIHRoaXNbb2Zmc2V0XSA9ICh2YWx1ZSA+Pj4gMjQpXG4gICAgdGhpc1tvZmZzZXQgKyAxXSA9ICh2YWx1ZSA+Pj4gMTYpXG4gICAgdGhpc1tvZmZzZXQgKyAyXSA9ICh2YWx1ZSA+Pj4gOClcbiAgICB0aGlzW29mZnNldCArIDNdID0gKHZhbHVlICYgMHhmZilcbiAgfSBlbHNlIHtcbiAgICBvYmplY3RXcml0ZVVJbnQzMih0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBmYWxzZSlcbiAgfVxuICByZXR1cm4gb2Zmc2V0ICsgNFxufVxuXG5mdW5jdGlvbiBjaGVja0lFRUU3NTQgKGJ1ZiwgdmFsdWUsIG9mZnNldCwgZXh0LCBtYXgsIG1pbikge1xuICBpZiAob2Zmc2V0ICsgZXh0ID4gYnVmLmxlbmd0aCkgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0luZGV4IG91dCBvZiByYW5nZScpXG4gIGlmIChvZmZzZXQgPCAwKSB0aHJvdyBuZXcgUmFuZ2VFcnJvcignSW5kZXggb3V0IG9mIHJhbmdlJylcbn1cblxuZnVuY3Rpb24gd3JpdGVGbG9hdCAoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICBjaGVja0lFRUU3NTQoYnVmLCB2YWx1ZSwgb2Zmc2V0LCA0LCAzLjQwMjgyMzQ2NjM4NTI4ODZlKzM4LCAtMy40MDI4MjM0NjYzODUyODg2ZSszOClcbiAgfVxuICBpZWVlNzU0LndyaXRlKGJ1ZiwgdmFsdWUsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCAyMywgNClcbiAgcmV0dXJuIG9mZnNldCArIDRcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUZsb2F0TEUgPSBmdW5jdGlvbiB3cml0ZUZsb2F0TEUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHJldHVybiB3cml0ZUZsb2F0KHRoaXMsIHZhbHVlLCBvZmZzZXQsIHRydWUsIG5vQXNzZXJ0KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlRmxvYXRCRSA9IGZ1bmN0aW9uIHdyaXRlRmxvYXRCRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgcmV0dXJuIHdyaXRlRmxvYXQodGhpcywgdmFsdWUsIG9mZnNldCwgZmFsc2UsIG5vQXNzZXJ0KVxufVxuXG5mdW5jdGlvbiB3cml0ZURvdWJsZSAoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICBjaGVja0lFRUU3NTQoYnVmLCB2YWx1ZSwgb2Zmc2V0LCA4LCAxLjc5NzY5MzEzNDg2MjMxNTdFKzMwOCwgLTEuNzk3NjkzMTM0ODYyMzE1N0UrMzA4KVxuICB9XG4gIGllZWU3NTQud3JpdGUoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIDUyLCA4KVxuICByZXR1cm4gb2Zmc2V0ICsgOFxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlRG91YmxlTEUgPSBmdW5jdGlvbiB3cml0ZURvdWJsZUxFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICByZXR1cm4gd3JpdGVEb3VibGUodGhpcywgdmFsdWUsIG9mZnNldCwgdHJ1ZSwgbm9Bc3NlcnQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVEb3VibGVCRSA9IGZ1bmN0aW9uIHdyaXRlRG91YmxlQkUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHJldHVybiB3cml0ZURvdWJsZSh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBmYWxzZSwgbm9Bc3NlcnQpXG59XG5cbi8vIGNvcHkodGFyZ2V0QnVmZmVyLCB0YXJnZXRTdGFydD0wLCBzb3VyY2VTdGFydD0wLCBzb3VyY2VFbmQ9YnVmZmVyLmxlbmd0aClcbkJ1ZmZlci5wcm90b3R5cGUuY29weSA9IGZ1bmN0aW9uIGNvcHkgKHRhcmdldCwgdGFyZ2V0U3RhcnQsIHN0YXJ0LCBlbmQpIHtcbiAgaWYgKCFzdGFydCkgc3RhcnQgPSAwXG4gIGlmICghZW5kICYmIGVuZCAhPT0gMCkgZW5kID0gdGhpcy5sZW5ndGhcbiAgaWYgKHRhcmdldFN0YXJ0ID49IHRhcmdldC5sZW5ndGgpIHRhcmdldFN0YXJ0ID0gdGFyZ2V0Lmxlbmd0aFxuICBpZiAoIXRhcmdldFN0YXJ0KSB0YXJnZXRTdGFydCA9IDBcbiAgaWYgKGVuZCA+IDAgJiYgZW5kIDwgc3RhcnQpIGVuZCA9IHN0YXJ0XG5cbiAgLy8gQ29weSAwIGJ5dGVzOyB3ZSdyZSBkb25lXG4gIGlmIChlbmQgPT09IHN0YXJ0KSByZXR1cm4gMFxuICBpZiAodGFyZ2V0Lmxlbmd0aCA9PT0gMCB8fCB0aGlzLmxlbmd0aCA9PT0gMCkgcmV0dXJuIDBcblxuICAvLyBGYXRhbCBlcnJvciBjb25kaXRpb25zXG4gIGlmICh0YXJnZXRTdGFydCA8IDApIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcigndGFyZ2V0U3RhcnQgb3V0IG9mIGJvdW5kcycpXG4gIH1cbiAgaWYgKHN0YXJ0IDwgMCB8fCBzdGFydCA+PSB0aGlzLmxlbmd0aCkgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ3NvdXJjZVN0YXJ0IG91dCBvZiBib3VuZHMnKVxuICBpZiAoZW5kIDwgMCkgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ3NvdXJjZUVuZCBvdXQgb2YgYm91bmRzJylcblxuICAvLyBBcmUgd2Ugb29iP1xuICBpZiAoZW5kID4gdGhpcy5sZW5ndGgpIGVuZCA9IHRoaXMubGVuZ3RoXG4gIGlmICh0YXJnZXQubGVuZ3RoIC0gdGFyZ2V0U3RhcnQgPCBlbmQgLSBzdGFydCkge1xuICAgIGVuZCA9IHRhcmdldC5sZW5ndGggLSB0YXJnZXRTdGFydCArIHN0YXJ0XG4gIH1cblxuICB2YXIgbGVuID0gZW5kIC0gc3RhcnRcbiAgdmFyIGlcblxuICBpZiAodGhpcyA9PT0gdGFyZ2V0ICYmIHN0YXJ0IDwgdGFyZ2V0U3RhcnQgJiYgdGFyZ2V0U3RhcnQgPCBlbmQpIHtcbiAgICAvLyBkZXNjZW5kaW5nIGNvcHkgZnJvbSBlbmRcbiAgICBmb3IgKGkgPSBsZW4gLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgdGFyZ2V0W2kgKyB0YXJnZXRTdGFydF0gPSB0aGlzW2kgKyBzdGFydF1cbiAgICB9XG4gIH0gZWxzZSBpZiAobGVuIDwgMTAwMCB8fCAhQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHtcbiAgICAvLyBhc2NlbmRpbmcgY29weSBmcm9tIHN0YXJ0XG4gICAgZm9yIChpID0gMDsgaSA8IGxlbjsgKytpKSB7XG4gICAgICB0YXJnZXRbaSArIHRhcmdldFN0YXJ0XSA9IHRoaXNbaSArIHN0YXJ0XVxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBVaW50OEFycmF5LnByb3RvdHlwZS5zZXQuY2FsbChcbiAgICAgIHRhcmdldCxcbiAgICAgIHRoaXMuc3ViYXJyYXkoc3RhcnQsIHN0YXJ0ICsgbGVuKSxcbiAgICAgIHRhcmdldFN0YXJ0XG4gICAgKVxuICB9XG5cbiAgcmV0dXJuIGxlblxufVxuXG4vLyBVc2FnZTpcbi8vICAgIGJ1ZmZlci5maWxsKG51bWJlclssIG9mZnNldFssIGVuZF1dKVxuLy8gICAgYnVmZmVyLmZpbGwoYnVmZmVyWywgb2Zmc2V0WywgZW5kXV0pXG4vLyAgICBidWZmZXIuZmlsbChzdHJpbmdbLCBvZmZzZXRbLCBlbmRdXVssIGVuY29kaW5nXSlcbkJ1ZmZlci5wcm90b3R5cGUuZmlsbCA9IGZ1bmN0aW9uIGZpbGwgKHZhbCwgc3RhcnQsIGVuZCwgZW5jb2RpbmcpIHtcbiAgLy8gSGFuZGxlIHN0cmluZyBjYXNlczpcbiAgaWYgKHR5cGVvZiB2YWwgPT09ICdzdHJpbmcnKSB7XG4gICAgaWYgKHR5cGVvZiBzdGFydCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGVuY29kaW5nID0gc3RhcnRcbiAgICAgIHN0YXJ0ID0gMFxuICAgICAgZW5kID0gdGhpcy5sZW5ndGhcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBlbmQgPT09ICdzdHJpbmcnKSB7XG4gICAgICBlbmNvZGluZyA9IGVuZFxuICAgICAgZW5kID0gdGhpcy5sZW5ndGhcbiAgICB9XG4gICAgaWYgKHZhbC5sZW5ndGggPT09IDEpIHtcbiAgICAgIHZhciBjb2RlID0gdmFsLmNoYXJDb2RlQXQoMClcbiAgICAgIGlmIChjb2RlIDwgMjU2KSB7XG4gICAgICAgIHZhbCA9IGNvZGVcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGVuY29kaW5nICE9PSB1bmRlZmluZWQgJiYgdHlwZW9mIGVuY29kaW5nICE9PSAnc3RyaW5nJykge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignZW5jb2RpbmcgbXVzdCBiZSBhIHN0cmluZycpXG4gICAgfVxuICAgIGlmICh0eXBlb2YgZW5jb2RpbmcgPT09ICdzdHJpbmcnICYmICFCdWZmZXIuaXNFbmNvZGluZyhlbmNvZGluZykpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1Vua25vd24gZW5jb2Rpbmc6ICcgKyBlbmNvZGluZylcbiAgICB9XG4gIH0gZWxzZSBpZiAodHlwZW9mIHZhbCA9PT0gJ251bWJlcicpIHtcbiAgICB2YWwgPSB2YWwgJiAyNTVcbiAgfVxuXG4gIC8vIEludmFsaWQgcmFuZ2VzIGFyZSBub3Qgc2V0IHRvIGEgZGVmYXVsdCwgc28gY2FuIHJhbmdlIGNoZWNrIGVhcmx5LlxuICBpZiAoc3RhcnQgPCAwIHx8IHRoaXMubGVuZ3RoIDwgc3RhcnQgfHwgdGhpcy5sZW5ndGggPCBlbmQpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignT3V0IG9mIHJhbmdlIGluZGV4JylcbiAgfVxuXG4gIGlmIChlbmQgPD0gc3RhcnQpIHtcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgc3RhcnQgPSBzdGFydCA+Pj4gMFxuICBlbmQgPSBlbmQgPT09IHVuZGVmaW5lZCA/IHRoaXMubGVuZ3RoIDogZW5kID4+PiAwXG5cbiAgaWYgKCF2YWwpIHZhbCA9IDBcblxuICB2YXIgaVxuICBpZiAodHlwZW9mIHZhbCA9PT0gJ251bWJlcicpIHtcbiAgICBmb3IgKGkgPSBzdGFydDsgaSA8IGVuZDsgKytpKSB7XG4gICAgICB0aGlzW2ldID0gdmFsXG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHZhciBieXRlcyA9IEJ1ZmZlci5pc0J1ZmZlcih2YWwpXG4gICAgICA/IHZhbFxuICAgICAgOiB1dGY4VG9CeXRlcyhuZXcgQnVmZmVyKHZhbCwgZW5jb2RpbmcpLnRvU3RyaW5nKCkpXG4gICAgdmFyIGxlbiA9IGJ5dGVzLmxlbmd0aFxuICAgIGZvciAoaSA9IDA7IGkgPCBlbmQgLSBzdGFydDsgKytpKSB7XG4gICAgICB0aGlzW2kgKyBzdGFydF0gPSBieXRlc1tpICUgbGVuXVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0aGlzXG59XG5cbi8vIEhFTFBFUiBGVU5DVElPTlNcbi8vID09PT09PT09PT09PT09PT1cblxudmFyIElOVkFMSURfQkFTRTY0X1JFID0gL1teK1xcLzAtOUEtWmEtei1fXS9nXG5cbmZ1bmN0aW9uIGJhc2U2NGNsZWFuIChzdHIpIHtcbiAgLy8gTm9kZSBzdHJpcHMgb3V0IGludmFsaWQgY2hhcmFjdGVycyBsaWtlIFxcbiBhbmQgXFx0IGZyb20gdGhlIHN0cmluZywgYmFzZTY0LWpzIGRvZXMgbm90XG4gIHN0ciA9IHN0cmluZ3RyaW0oc3RyKS5yZXBsYWNlKElOVkFMSURfQkFTRTY0X1JFLCAnJylcbiAgLy8gTm9kZSBjb252ZXJ0cyBzdHJpbmdzIHdpdGggbGVuZ3RoIDwgMiB0byAnJ1xuICBpZiAoc3RyLmxlbmd0aCA8IDIpIHJldHVybiAnJ1xuICAvLyBOb2RlIGFsbG93cyBmb3Igbm9uLXBhZGRlZCBiYXNlNjQgc3RyaW5ncyAobWlzc2luZyB0cmFpbGluZyA9PT0pLCBiYXNlNjQtanMgZG9lcyBub3RcbiAgd2hpbGUgKHN0ci5sZW5ndGggJSA0ICE9PSAwKSB7XG4gICAgc3RyID0gc3RyICsgJz0nXG4gIH1cbiAgcmV0dXJuIHN0clxufVxuXG5mdW5jdGlvbiBzdHJpbmd0cmltIChzdHIpIHtcbiAgaWYgKHN0ci50cmltKSByZXR1cm4gc3RyLnRyaW0oKVxuICByZXR1cm4gc3RyLnJlcGxhY2UoL15cXHMrfFxccyskL2csICcnKVxufVxuXG5mdW5jdGlvbiB0b0hleCAobikge1xuICBpZiAobiA8IDE2KSByZXR1cm4gJzAnICsgbi50b1N0cmluZygxNilcbiAgcmV0dXJuIG4udG9TdHJpbmcoMTYpXG59XG5cbmZ1bmN0aW9uIHV0ZjhUb0J5dGVzIChzdHJpbmcsIHVuaXRzKSB7XG4gIHVuaXRzID0gdW5pdHMgfHwgSW5maW5pdHlcbiAgdmFyIGNvZGVQb2ludFxuICB2YXIgbGVuZ3RoID0gc3RyaW5nLmxlbmd0aFxuICB2YXIgbGVhZFN1cnJvZ2F0ZSA9IG51bGxcbiAgdmFyIGJ5dGVzID0gW11cblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgKytpKSB7XG4gICAgY29kZVBvaW50ID0gc3RyaW5nLmNoYXJDb2RlQXQoaSlcblxuICAgIC8vIGlzIHN1cnJvZ2F0ZSBjb21wb25lbnRcbiAgICBpZiAoY29kZVBvaW50ID4gMHhEN0ZGICYmIGNvZGVQb2ludCA8IDB4RTAwMCkge1xuICAgICAgLy8gbGFzdCBjaGFyIHdhcyBhIGxlYWRcbiAgICAgIGlmICghbGVhZFN1cnJvZ2F0ZSkge1xuICAgICAgICAvLyBubyBsZWFkIHlldFxuICAgICAgICBpZiAoY29kZVBvaW50ID4gMHhEQkZGKSB7XG4gICAgICAgICAgLy8gdW5leHBlY3RlZCB0cmFpbFxuICAgICAgICAgIGlmICgodW5pdHMgLT0gMykgPiAtMSkgYnl0ZXMucHVzaCgweEVGLCAweEJGLCAweEJEKVxuICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgIH0gZWxzZSBpZiAoaSArIDEgPT09IGxlbmd0aCkge1xuICAgICAgICAgIC8vIHVucGFpcmVkIGxlYWRcbiAgICAgICAgICBpZiAoKHVuaXRzIC09IDMpID4gLTEpIGJ5dGVzLnB1c2goMHhFRiwgMHhCRiwgMHhCRClcbiAgICAgICAgICBjb250aW51ZVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gdmFsaWQgbGVhZFxuICAgICAgICBsZWFkU3Vycm9nYXRlID0gY29kZVBvaW50XG5cbiAgICAgICAgY29udGludWVcbiAgICAgIH1cblxuICAgICAgLy8gMiBsZWFkcyBpbiBhIHJvd1xuICAgICAgaWYgKGNvZGVQb2ludCA8IDB4REMwMCkge1xuICAgICAgICBpZiAoKHVuaXRzIC09IDMpID4gLTEpIGJ5dGVzLnB1c2goMHhFRiwgMHhCRiwgMHhCRClcbiAgICAgICAgbGVhZFN1cnJvZ2F0ZSA9IGNvZGVQb2ludFxuICAgICAgICBjb250aW51ZVxuICAgICAgfVxuXG4gICAgICAvLyB2YWxpZCBzdXJyb2dhdGUgcGFpclxuICAgICAgY29kZVBvaW50ID0gKGxlYWRTdXJyb2dhdGUgLSAweEQ4MDAgPDwgMTAgfCBjb2RlUG9pbnQgLSAweERDMDApICsgMHgxMDAwMFxuICAgIH0gZWxzZSBpZiAobGVhZFN1cnJvZ2F0ZSkge1xuICAgICAgLy8gdmFsaWQgYm1wIGNoYXIsIGJ1dCBsYXN0IGNoYXIgd2FzIGEgbGVhZFxuICAgICAgaWYgKCh1bml0cyAtPSAzKSA+IC0xKSBieXRlcy5wdXNoKDB4RUYsIDB4QkYsIDB4QkQpXG4gICAgfVxuXG4gICAgbGVhZFN1cnJvZ2F0ZSA9IG51bGxcblxuICAgIC8vIGVuY29kZSB1dGY4XG4gICAgaWYgKGNvZGVQb2ludCA8IDB4ODApIHtcbiAgICAgIGlmICgodW5pdHMgLT0gMSkgPCAwKSBicmVha1xuICAgICAgYnl0ZXMucHVzaChjb2RlUG9pbnQpXG4gICAgfSBlbHNlIGlmIChjb2RlUG9pbnQgPCAweDgwMCkge1xuICAgICAgaWYgKCh1bml0cyAtPSAyKSA8IDApIGJyZWFrXG4gICAgICBieXRlcy5wdXNoKFxuICAgICAgICBjb2RlUG9pbnQgPj4gMHg2IHwgMHhDMCxcbiAgICAgICAgY29kZVBvaW50ICYgMHgzRiB8IDB4ODBcbiAgICAgIClcbiAgICB9IGVsc2UgaWYgKGNvZGVQb2ludCA8IDB4MTAwMDApIHtcbiAgICAgIGlmICgodW5pdHMgLT0gMykgPCAwKSBicmVha1xuICAgICAgYnl0ZXMucHVzaChcbiAgICAgICAgY29kZVBvaW50ID4+IDB4QyB8IDB4RTAsXG4gICAgICAgIGNvZGVQb2ludCA+PiAweDYgJiAweDNGIHwgMHg4MCxcbiAgICAgICAgY29kZVBvaW50ICYgMHgzRiB8IDB4ODBcbiAgICAgIClcbiAgICB9IGVsc2UgaWYgKGNvZGVQb2ludCA8IDB4MTEwMDAwKSB7XG4gICAgICBpZiAoKHVuaXRzIC09IDQpIDwgMCkgYnJlYWtcbiAgICAgIGJ5dGVzLnB1c2goXG4gICAgICAgIGNvZGVQb2ludCA+PiAweDEyIHwgMHhGMCxcbiAgICAgICAgY29kZVBvaW50ID4+IDB4QyAmIDB4M0YgfCAweDgwLFxuICAgICAgICBjb2RlUG9pbnQgPj4gMHg2ICYgMHgzRiB8IDB4ODAsXG4gICAgICAgIGNvZGVQb2ludCAmIDB4M0YgfCAweDgwXG4gICAgICApXG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBjb2RlIHBvaW50JylcbiAgICB9XG4gIH1cblxuICByZXR1cm4gYnl0ZXNcbn1cblxuZnVuY3Rpb24gYXNjaWlUb0J5dGVzIChzdHIpIHtcbiAgdmFyIGJ5dGVBcnJheSA9IFtdXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3RyLmxlbmd0aDsgKytpKSB7XG4gICAgLy8gTm9kZSdzIGNvZGUgc2VlbXMgdG8gYmUgZG9pbmcgdGhpcyBhbmQgbm90ICYgMHg3Ri4uXG4gICAgYnl0ZUFycmF5LnB1c2goc3RyLmNoYXJDb2RlQXQoaSkgJiAweEZGKVxuICB9XG4gIHJldHVybiBieXRlQXJyYXlcbn1cblxuZnVuY3Rpb24gdXRmMTZsZVRvQnl0ZXMgKHN0ciwgdW5pdHMpIHtcbiAgdmFyIGMsIGhpLCBsb1xuICB2YXIgYnl0ZUFycmF5ID0gW11cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHIubGVuZ3RoOyArK2kpIHtcbiAgICBpZiAoKHVuaXRzIC09IDIpIDwgMCkgYnJlYWtcblxuICAgIGMgPSBzdHIuY2hhckNvZGVBdChpKVxuICAgIGhpID0gYyA+PiA4XG4gICAgbG8gPSBjICUgMjU2XG4gICAgYnl0ZUFycmF5LnB1c2gobG8pXG4gICAgYnl0ZUFycmF5LnB1c2goaGkpXG4gIH1cblxuICByZXR1cm4gYnl0ZUFycmF5XG59XG5cbmZ1bmN0aW9uIGJhc2U2NFRvQnl0ZXMgKHN0cikge1xuICByZXR1cm4gYmFzZTY0LnRvQnl0ZUFycmF5KGJhc2U2NGNsZWFuKHN0cikpXG59XG5cbmZ1bmN0aW9uIGJsaXRCdWZmZXIgKHNyYywgZHN0LCBvZmZzZXQsIGxlbmd0aCkge1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgKytpKSB7XG4gICAgaWYgKChpICsgb2Zmc2V0ID49IGRzdC5sZW5ndGgpIHx8IChpID49IHNyYy5sZW5ndGgpKSBicmVha1xuICAgIGRzdFtpICsgb2Zmc2V0XSA9IHNyY1tpXVxuICB9XG4gIHJldHVybiBpXG59XG5cbmZ1bmN0aW9uIGlzbmFuICh2YWwpIHtcbiAgcmV0dXJuIHZhbCAhPT0gdmFsIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tc2VsZi1jb21wYXJlXG59XG4iLCIvLyBDb3B5cmlnaHQgSm95ZW50LCBJbmMuIGFuZCBvdGhlciBOb2RlIGNvbnRyaWJ1dG9ycy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYVxuLy8gY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZVxuLy8gXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nXG4vLyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsXG4vLyBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0XG4vLyBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGVcbi8vIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkXG4vLyBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTXG4vLyBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GXG4vLyBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOXG4vLyBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSxcbi8vIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUlxuLy8gT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRVxuLy8gVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cblxuLy8gTk9URTogVGhlc2UgdHlwZSBjaGVja2luZyBmdW5jdGlvbnMgaW50ZW50aW9uYWxseSBkb24ndCB1c2UgYGluc3RhbmNlb2ZgXG4vLyBiZWNhdXNlIGl0IGlzIGZyYWdpbGUgYW5kIGNhbiBiZSBlYXNpbHkgZmFrZWQgd2l0aCBgT2JqZWN0LmNyZWF0ZSgpYC5cblxuZnVuY3Rpb24gaXNBcnJheShhcmcpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkpIHtcbiAgICByZXR1cm4gQXJyYXkuaXNBcnJheShhcmcpO1xuICB9XG4gIHJldHVybiBvYmplY3RUb1N0cmluZyhhcmcpID09PSAnW29iamVjdCBBcnJheV0nO1xufVxuZXhwb3J0cy5pc0FycmF5ID0gaXNBcnJheTtcblxuZnVuY3Rpb24gaXNCb29sZWFuKGFyZykge1xuICByZXR1cm4gdHlwZW9mIGFyZyA9PT0gJ2Jvb2xlYW4nO1xufVxuZXhwb3J0cy5pc0Jvb2xlYW4gPSBpc0Jvb2xlYW47XG5cbmZ1bmN0aW9uIGlzTnVsbChhcmcpIHtcbiAgcmV0dXJuIGFyZyA9PT0gbnVsbDtcbn1cbmV4cG9ydHMuaXNOdWxsID0gaXNOdWxsO1xuXG5mdW5jdGlvbiBpc051bGxPclVuZGVmaW5lZChhcmcpIHtcbiAgcmV0dXJuIGFyZyA9PSBudWxsO1xufVxuZXhwb3J0cy5pc051bGxPclVuZGVmaW5lZCA9IGlzTnVsbE9yVW5kZWZpbmVkO1xuXG5mdW5jdGlvbiBpc051bWJlcihhcmcpIHtcbiAgcmV0dXJuIHR5cGVvZiBhcmcgPT09ICdudW1iZXInO1xufVxuZXhwb3J0cy5pc051bWJlciA9IGlzTnVtYmVyO1xuXG5mdW5jdGlvbiBpc1N0cmluZyhhcmcpIHtcbiAgcmV0dXJuIHR5cGVvZiBhcmcgPT09ICdzdHJpbmcnO1xufVxuZXhwb3J0cy5pc1N0cmluZyA9IGlzU3RyaW5nO1xuXG5mdW5jdGlvbiBpc1N5bWJvbChhcmcpIHtcbiAgcmV0dXJuIHR5cGVvZiBhcmcgPT09ICdzeW1ib2wnO1xufVxuZXhwb3J0cy5pc1N5bWJvbCA9IGlzU3ltYm9sO1xuXG5mdW5jdGlvbiBpc1VuZGVmaW5lZChhcmcpIHtcbiAgcmV0dXJuIGFyZyA9PT0gdm9pZCAwO1xufVxuZXhwb3J0cy5pc1VuZGVmaW5lZCA9IGlzVW5kZWZpbmVkO1xuXG5mdW5jdGlvbiBpc1JlZ0V4cChyZSkge1xuICByZXR1cm4gb2JqZWN0VG9TdHJpbmcocmUpID09PSAnW29iamVjdCBSZWdFeHBdJztcbn1cbmV4cG9ydHMuaXNSZWdFeHAgPSBpc1JlZ0V4cDtcblxuZnVuY3Rpb24gaXNPYmplY3QoYXJnKSB7XG4gIHJldHVybiB0eXBlb2YgYXJnID09PSAnb2JqZWN0JyAmJiBhcmcgIT09IG51bGw7XG59XG5leHBvcnRzLmlzT2JqZWN0ID0gaXNPYmplY3Q7XG5cbmZ1bmN0aW9uIGlzRGF0ZShkKSB7XG4gIHJldHVybiBvYmplY3RUb1N0cmluZyhkKSA9PT0gJ1tvYmplY3QgRGF0ZV0nO1xufVxuZXhwb3J0cy5pc0RhdGUgPSBpc0RhdGU7XG5cbmZ1bmN0aW9uIGlzRXJyb3IoZSkge1xuICByZXR1cm4gKG9iamVjdFRvU3RyaW5nKGUpID09PSAnW29iamVjdCBFcnJvcl0nIHx8IGUgaW5zdGFuY2VvZiBFcnJvcik7XG59XG5leHBvcnRzLmlzRXJyb3IgPSBpc0Vycm9yO1xuXG5mdW5jdGlvbiBpc0Z1bmN0aW9uKGFyZykge1xuICByZXR1cm4gdHlwZW9mIGFyZyA9PT0gJ2Z1bmN0aW9uJztcbn1cbmV4cG9ydHMuaXNGdW5jdGlvbiA9IGlzRnVuY3Rpb247XG5cbmZ1bmN0aW9uIGlzUHJpbWl0aXZlKGFyZykge1xuICByZXR1cm4gYXJnID09PSBudWxsIHx8XG4gICAgICAgICB0eXBlb2YgYXJnID09PSAnYm9vbGVhbicgfHxcbiAgICAgICAgIHR5cGVvZiBhcmcgPT09ICdudW1iZXInIHx8XG4gICAgICAgICB0eXBlb2YgYXJnID09PSAnc3RyaW5nJyB8fFxuICAgICAgICAgdHlwZW9mIGFyZyA9PT0gJ3N5bWJvbCcgfHwgIC8vIEVTNiBzeW1ib2xcbiAgICAgICAgIHR5cGVvZiBhcmcgPT09ICd1bmRlZmluZWQnO1xufVxuZXhwb3J0cy5pc1ByaW1pdGl2ZSA9IGlzUHJpbWl0aXZlO1xuXG5leHBvcnRzLmlzQnVmZmVyID0gQnVmZmVyLmlzQnVmZmVyO1xuXG5mdW5jdGlvbiBvYmplY3RUb1N0cmluZyhvKSB7XG4gIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobyk7XG59XG4iLCIvKlxuICBNb2R1bGUgZGVwZW5kZW5jaWVzXG4qL1xudmFyIEVsZW1lbnRUeXBlID0gcmVxdWlyZSgnZG9tZWxlbWVudHR5cGUnKTtcbnZhciBlbnRpdGllcyA9IHJlcXVpcmUoJ2VudGl0aWVzJyk7XG5cbi8qXG4gIEJvb2xlYW4gQXR0cmlidXRlc1xuKi9cbnZhciBib29sZWFuQXR0cmlidXRlcyA9IHtcbiAgX19wcm90b19fOiBudWxsLFxuICBhbGxvd2Z1bGxzY3JlZW46IHRydWUsXG4gIGFzeW5jOiB0cnVlLFxuICBhdXRvZm9jdXM6IHRydWUsXG4gIGF1dG9wbGF5OiB0cnVlLFxuICBjaGVja2VkOiB0cnVlLFxuICBjb250cm9sczogdHJ1ZSxcbiAgZGVmYXVsdDogdHJ1ZSxcbiAgZGVmZXI6IHRydWUsXG4gIGRpc2FibGVkOiB0cnVlLFxuICBoaWRkZW46IHRydWUsXG4gIGlzbWFwOiB0cnVlLFxuICBsb29wOiB0cnVlLFxuICBtdWx0aXBsZTogdHJ1ZSxcbiAgbXV0ZWQ6IHRydWUsXG4gIG9wZW46IHRydWUsXG4gIHJlYWRvbmx5OiB0cnVlLFxuICByZXF1aXJlZDogdHJ1ZSxcbiAgcmV2ZXJzZWQ6IHRydWUsXG4gIHNjb3BlZDogdHJ1ZSxcbiAgc2VhbWxlc3M6IHRydWUsXG4gIHNlbGVjdGVkOiB0cnVlLFxuICB0eXBlbXVzdG1hdGNoOiB0cnVlXG59O1xuXG52YXIgdW5lbmNvZGVkRWxlbWVudHMgPSB7XG4gIF9fcHJvdG9fXzogbnVsbCxcbiAgc3R5bGU6IHRydWUsXG4gIHNjcmlwdDogdHJ1ZSxcbiAgeG1wOiB0cnVlLFxuICBpZnJhbWU6IHRydWUsXG4gIG5vZW1iZWQ6IHRydWUsXG4gIG5vZnJhbWVzOiB0cnVlLFxuICBwbGFpbnRleHQ6IHRydWUsXG4gIG5vc2NyaXB0OiB0cnVlXG59O1xuXG4vKlxuICBGb3JtYXQgYXR0cmlidXRlc1xuKi9cbmZ1bmN0aW9uIGZvcm1hdEF0dHJzKGF0dHJpYnV0ZXMsIG9wdHMpIHtcbiAgaWYgKCFhdHRyaWJ1dGVzKSByZXR1cm47XG5cbiAgdmFyIG91dHB1dCA9ICcnLFxuICAgICAgdmFsdWU7XG5cbiAgLy8gTG9vcCB0aHJvdWdoIHRoZSBhdHRyaWJ1dGVzXG4gIGZvciAodmFyIGtleSBpbiBhdHRyaWJ1dGVzKSB7XG4gICAgdmFsdWUgPSBhdHRyaWJ1dGVzW2tleV07XG4gICAgaWYgKG91dHB1dCkge1xuICAgICAgb3V0cHV0ICs9ICcgJztcbiAgICB9XG5cbiAgICBpZiAoIXZhbHVlICYmIGJvb2xlYW5BdHRyaWJ1dGVzW2tleV0pIHtcbiAgICAgIG91dHB1dCArPSBrZXk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG91dHB1dCArPSBrZXkgKyAnPVwiJyArIChvcHRzLmRlY29kZUVudGl0aWVzID8gZW50aXRpZXMuZW5jb2RlWE1MKHZhbHVlKSA6IHZhbHVlKSArICdcIic7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG91dHB1dDtcbn1cblxuLypcbiAgU2VsZi1lbmNsb3NpbmcgdGFncyAoc3RvbGVuIGZyb20gbm9kZS1odG1scGFyc2VyKVxuKi9cbnZhciBzaW5nbGVUYWcgPSB7XG4gIF9fcHJvdG9fXzogbnVsbCxcbiAgYXJlYTogdHJ1ZSxcbiAgYmFzZTogdHJ1ZSxcbiAgYmFzZWZvbnQ6IHRydWUsXG4gIGJyOiB0cnVlLFxuICBjb2w6IHRydWUsXG4gIGNvbW1hbmQ6IHRydWUsXG4gIGVtYmVkOiB0cnVlLFxuICBmcmFtZTogdHJ1ZSxcbiAgaHI6IHRydWUsXG4gIGltZzogdHJ1ZSxcbiAgaW5wdXQ6IHRydWUsXG4gIGlzaW5kZXg6IHRydWUsXG4gIGtleWdlbjogdHJ1ZSxcbiAgbGluazogdHJ1ZSxcbiAgbWV0YTogdHJ1ZSxcbiAgcGFyYW06IHRydWUsXG4gIHNvdXJjZTogdHJ1ZSxcbiAgdHJhY2s6IHRydWUsXG4gIHdicjogdHJ1ZSxcbn07XG5cblxudmFyIHJlbmRlciA9IG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oZG9tLCBvcHRzKSB7XG4gIGlmICghQXJyYXkuaXNBcnJheShkb20pICYmICFkb20uY2hlZXJpbykgZG9tID0gW2RvbV07XG4gIG9wdHMgPSBvcHRzIHx8IHt9O1xuXG4gIHZhciBvdXRwdXQgPSAnJztcblxuICBmb3IodmFyIGkgPSAwOyBpIDwgZG9tLmxlbmd0aDsgaSsrKXtcbiAgICB2YXIgZWxlbSA9IGRvbVtpXTtcblxuICAgIGlmIChlbGVtLnR5cGUgPT09ICdyb290JylcbiAgICAgIG91dHB1dCArPSByZW5kZXIoZWxlbS5jaGlsZHJlbiwgb3B0cyk7XG4gICAgZWxzZSBpZiAoRWxlbWVudFR5cGUuaXNUYWcoZWxlbSkpXG4gICAgICBvdXRwdXQgKz0gcmVuZGVyVGFnKGVsZW0sIG9wdHMpO1xuICAgIGVsc2UgaWYgKGVsZW0udHlwZSA9PT0gRWxlbWVudFR5cGUuRGlyZWN0aXZlKVxuICAgICAgb3V0cHV0ICs9IHJlbmRlckRpcmVjdGl2ZShlbGVtKTtcbiAgICBlbHNlIGlmIChlbGVtLnR5cGUgPT09IEVsZW1lbnRUeXBlLkNvbW1lbnQpXG4gICAgICBvdXRwdXQgKz0gcmVuZGVyQ29tbWVudChlbGVtKTtcbiAgICBlbHNlIGlmIChlbGVtLnR5cGUgPT09IEVsZW1lbnRUeXBlLkNEQVRBKVxuICAgICAgb3V0cHV0ICs9IHJlbmRlckNkYXRhKGVsZW0pO1xuICAgIGVsc2VcbiAgICAgIG91dHB1dCArPSByZW5kZXJUZXh0KGVsZW0sIG9wdHMpO1xuICB9XG5cbiAgcmV0dXJuIG91dHB1dDtcbn07XG5cbmZ1bmN0aW9uIHJlbmRlclRhZyhlbGVtLCBvcHRzKSB7XG4gIC8vIEhhbmRsZSBTVkdcbiAgaWYgKGVsZW0ubmFtZSA9PT0gXCJzdmdcIikgb3B0cyA9IHtkZWNvZGVFbnRpdGllczogb3B0cy5kZWNvZGVFbnRpdGllcywgeG1sTW9kZTogdHJ1ZX07XG5cbiAgdmFyIHRhZyA9ICc8JyArIGVsZW0ubmFtZSxcbiAgICAgIGF0dHJpYnMgPSBmb3JtYXRBdHRycyhlbGVtLmF0dHJpYnMsIG9wdHMpO1xuXG4gIGlmIChhdHRyaWJzKSB7XG4gICAgdGFnICs9ICcgJyArIGF0dHJpYnM7XG4gIH1cblxuICBpZiAoXG4gICAgb3B0cy54bWxNb2RlXG4gICAgJiYgKCFlbGVtLmNoaWxkcmVuIHx8IGVsZW0uY2hpbGRyZW4ubGVuZ3RoID09PSAwKVxuICApIHtcbiAgICB0YWcgKz0gJy8+JztcbiAgfSBlbHNlIHtcbiAgICB0YWcgKz0gJz4nO1xuICAgIGlmIChlbGVtLmNoaWxkcmVuKSB7XG4gICAgICB0YWcgKz0gcmVuZGVyKGVsZW0uY2hpbGRyZW4sIG9wdHMpO1xuICAgIH1cblxuICAgIGlmICghc2luZ2xlVGFnW2VsZW0ubmFtZV0gfHwgb3B0cy54bWxNb2RlKSB7XG4gICAgICB0YWcgKz0gJzwvJyArIGVsZW0ubmFtZSArICc+JztcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdGFnO1xufVxuXG5mdW5jdGlvbiByZW5kZXJEaXJlY3RpdmUoZWxlbSkge1xuICByZXR1cm4gJzwnICsgZWxlbS5kYXRhICsgJz4nO1xufVxuXG5mdW5jdGlvbiByZW5kZXJUZXh0KGVsZW0sIG9wdHMpIHtcbiAgdmFyIGRhdGEgPSBlbGVtLmRhdGEgfHwgJyc7XG5cbiAgLy8gaWYgZW50aXRpZXMgd2VyZW4ndCBkZWNvZGVkLCBubyBuZWVkIHRvIGVuY29kZSB0aGVtIGJhY2tcbiAgaWYgKG9wdHMuZGVjb2RlRW50aXRpZXMgJiYgIShlbGVtLnBhcmVudCAmJiBlbGVtLnBhcmVudC5uYW1lIGluIHVuZW5jb2RlZEVsZW1lbnRzKSkge1xuICAgIGRhdGEgPSBlbnRpdGllcy5lbmNvZGVYTUwoZGF0YSk7XG4gIH1cblxuICByZXR1cm4gZGF0YTtcbn1cblxuZnVuY3Rpb24gcmVuZGVyQ2RhdGEoZWxlbSkge1xuICByZXR1cm4gJzwhW0NEQVRBWycgKyBlbGVtLmNoaWxkcmVuWzBdLmRhdGEgKyAnXV0+Jztcbn1cblxuZnVuY3Rpb24gcmVuZGVyQ29tbWVudChlbGVtKSB7XG4gIHJldHVybiAnPCEtLScgKyBlbGVtLmRhdGEgKyAnLS0+Jztcbn1cbiIsIi8vVHlwZXMgb2YgZWxlbWVudHMgZm91bmQgaW4gdGhlIERPTVxubW9kdWxlLmV4cG9ydHMgPSB7XG5cdFRleHQ6IFwidGV4dFwiLCAvL1RleHRcblx0RGlyZWN0aXZlOiBcImRpcmVjdGl2ZVwiLCAvLzw/IC4uLiA/PlxuXHRDb21tZW50OiBcImNvbW1lbnRcIiwgLy88IS0tIC4uLiAtLT5cblx0U2NyaXB0OiBcInNjcmlwdFwiLCAvLzxzY3JpcHQ+IHRhZ3Ncblx0U3R5bGU6IFwic3R5bGVcIiwgLy88c3R5bGU+IHRhZ3Ncblx0VGFnOiBcInRhZ1wiLCAvL0FueSB0YWdcblx0Q0RBVEE6IFwiY2RhdGFcIiwgLy88IVtDREFUQVsgLi4uIF1dPlxuXG5cdGlzVGFnOiBmdW5jdGlvbihlbGVtKXtcblx0XHRyZXR1cm4gZWxlbS50eXBlID09PSBcInRhZ1wiIHx8IGVsZW0udHlwZSA9PT0gXCJzY3JpcHRcIiB8fCBlbGVtLnR5cGUgPT09IFwic3R5bGVcIjtcblx0fVxufTsiLCIvL1R5cGVzIG9mIGVsZW1lbnRzIGZvdW5kIGluIHRoZSBET01cbm1vZHVsZS5leHBvcnRzID0ge1xuXHRUZXh0OiBcInRleHRcIiwgLy9UZXh0XG5cdERpcmVjdGl2ZTogXCJkaXJlY3RpdmVcIiwgLy88PyAuLi4gPz5cblx0Q29tbWVudDogXCJjb21tZW50XCIsIC8vPCEtLSAuLi4gLS0+XG5cdFNjcmlwdDogXCJzY3JpcHRcIiwgLy88c2NyaXB0PiB0YWdzXG5cdFN0eWxlOiBcInN0eWxlXCIsIC8vPHN0eWxlPiB0YWdzXG5cdFRhZzogXCJ0YWdcIiwgLy9BbnkgdGFnXG5cdENEQVRBOiBcImNkYXRhXCIsIC8vPCFbQ0RBVEFbIC4uLiBdXT5cblx0RG9jdHlwZTogXCJkb2N0eXBlXCIsXG5cblx0aXNUYWc6IGZ1bmN0aW9uKGVsZW0pe1xuXHRcdHJldHVybiBlbGVtLnR5cGUgPT09IFwidGFnXCIgfHwgZWxlbS50eXBlID09PSBcInNjcmlwdFwiIHx8IGVsZW0udHlwZSA9PT0gXCJzdHlsZVwiO1xuXHR9XG59O1xuIiwidmFyIEVsZW1lbnRUeXBlID0gcmVxdWlyZShcImRvbWVsZW1lbnR0eXBlXCIpO1xuXG52YXIgcmVfd2hpdGVzcGFjZSA9IC9cXHMrL2c7XG52YXIgTm9kZVByb3RvdHlwZSA9IHJlcXVpcmUoXCIuL2xpYi9ub2RlXCIpO1xudmFyIEVsZW1lbnRQcm90b3R5cGUgPSByZXF1aXJlKFwiLi9saWIvZWxlbWVudFwiKTtcblxuZnVuY3Rpb24gRG9tSGFuZGxlcihjYWxsYmFjaywgb3B0aW9ucywgZWxlbWVudENCKXtcblx0aWYodHlwZW9mIGNhbGxiYWNrID09PSBcIm9iamVjdFwiKXtcblx0XHRlbGVtZW50Q0IgPSBvcHRpb25zO1xuXHRcdG9wdGlvbnMgPSBjYWxsYmFjaztcblx0XHRjYWxsYmFjayA9IG51bGw7XG5cdH0gZWxzZSBpZih0eXBlb2Ygb3B0aW9ucyA9PT0gXCJmdW5jdGlvblwiKXtcblx0XHRlbGVtZW50Q0IgPSBvcHRpb25zO1xuXHRcdG9wdGlvbnMgPSBkZWZhdWx0T3B0cztcblx0fVxuXHR0aGlzLl9jYWxsYmFjayA9IGNhbGxiYWNrO1xuXHR0aGlzLl9vcHRpb25zID0gb3B0aW9ucyB8fCBkZWZhdWx0T3B0cztcblx0dGhpcy5fZWxlbWVudENCID0gZWxlbWVudENCO1xuXHR0aGlzLmRvbSA9IFtdO1xuXHR0aGlzLl9kb25lID0gZmFsc2U7XG5cdHRoaXMuX3RhZ1N0YWNrID0gW107XG5cdHRoaXMuX3BhcnNlciA9IHRoaXMuX3BhcnNlciB8fCBudWxsO1xufVxuXG4vL2RlZmF1bHQgb3B0aW9uc1xudmFyIGRlZmF1bHRPcHRzID0ge1xuXHRub3JtYWxpemVXaGl0ZXNwYWNlOiBmYWxzZSwgLy9SZXBsYWNlIGFsbCB3aGl0ZXNwYWNlIHdpdGggc2luZ2xlIHNwYWNlc1xuXHR3aXRoU3RhcnRJbmRpY2VzOiBmYWxzZSwgLy9BZGQgc3RhcnRJbmRleCBwcm9wZXJ0aWVzIHRvIG5vZGVzXG59O1xuXG5Eb21IYW5kbGVyLnByb3RvdHlwZS5vbnBhcnNlcmluaXQgPSBmdW5jdGlvbihwYXJzZXIpe1xuXHR0aGlzLl9wYXJzZXIgPSBwYXJzZXI7XG59O1xuXG4vL1Jlc2V0cyB0aGUgaGFuZGxlciBiYWNrIHRvIHN0YXJ0aW5nIHN0YXRlXG5Eb21IYW5kbGVyLnByb3RvdHlwZS5vbnJlc2V0ID0gZnVuY3Rpb24oKXtcblx0RG9tSGFuZGxlci5jYWxsKHRoaXMsIHRoaXMuX2NhbGxiYWNrLCB0aGlzLl9vcHRpb25zLCB0aGlzLl9lbGVtZW50Q0IpO1xufTtcblxuLy9TaWduYWxzIHRoZSBoYW5kbGVyIHRoYXQgcGFyc2luZyBpcyBkb25lXG5Eb21IYW5kbGVyLnByb3RvdHlwZS5vbmVuZCA9IGZ1bmN0aW9uKCl7XG5cdGlmKHRoaXMuX2RvbmUpIHJldHVybjtcblx0dGhpcy5fZG9uZSA9IHRydWU7XG5cdHRoaXMuX3BhcnNlciA9IG51bGw7XG5cdHRoaXMuX2hhbmRsZUNhbGxiYWNrKG51bGwpO1xufTtcblxuRG9tSGFuZGxlci5wcm90b3R5cGUuX2hhbmRsZUNhbGxiYWNrID1cbkRvbUhhbmRsZXIucHJvdG90eXBlLm9uZXJyb3IgPSBmdW5jdGlvbihlcnJvcil7XG5cdGlmKHR5cGVvZiB0aGlzLl9jYWxsYmFjayA9PT0gXCJmdW5jdGlvblwiKXtcblx0XHR0aGlzLl9jYWxsYmFjayhlcnJvciwgdGhpcy5kb20pO1xuXHR9IGVsc2Uge1xuXHRcdGlmKGVycm9yKSB0aHJvdyBlcnJvcjtcblx0fVxufTtcblxuRG9tSGFuZGxlci5wcm90b3R5cGUub25jbG9zZXRhZyA9IGZ1bmN0aW9uKCl7XG5cdC8vaWYodGhpcy5fdGFnU3RhY2sucG9wKCkubmFtZSAhPT0gbmFtZSkgdGhpcy5faGFuZGxlQ2FsbGJhY2soRXJyb3IoXCJUYWduYW1lIGRpZG4ndCBtYXRjaCFcIikpO1xuXHR2YXIgZWxlbSA9IHRoaXMuX3RhZ1N0YWNrLnBvcCgpO1xuXHRpZih0aGlzLl9lbGVtZW50Q0IpIHRoaXMuX2VsZW1lbnRDQihlbGVtKTtcbn07XG5cbkRvbUhhbmRsZXIucHJvdG90eXBlLl9hZGREb21FbGVtZW50ID0gZnVuY3Rpb24oZWxlbWVudCl7XG5cdHZhciBwYXJlbnQgPSB0aGlzLl90YWdTdGFja1t0aGlzLl90YWdTdGFjay5sZW5ndGggLSAxXTtcblx0dmFyIHNpYmxpbmdzID0gcGFyZW50ID8gcGFyZW50LmNoaWxkcmVuIDogdGhpcy5kb207XG5cdHZhciBwcmV2aW91c1NpYmxpbmcgPSBzaWJsaW5nc1tzaWJsaW5ncy5sZW5ndGggLSAxXTtcblxuXHRlbGVtZW50Lm5leHQgPSBudWxsO1xuXG5cdGlmKHRoaXMuX29wdGlvbnMud2l0aFN0YXJ0SW5kaWNlcyl7XG5cdFx0ZWxlbWVudC5zdGFydEluZGV4ID0gdGhpcy5fcGFyc2VyLnN0YXJ0SW5kZXg7XG5cdH1cblxuXHRpZiAodGhpcy5fb3B0aW9ucy53aXRoRG9tTHZsMSkge1xuXHRcdGVsZW1lbnQuX19wcm90b19fID0gZWxlbWVudC50eXBlID09PSBcInRhZ1wiID8gRWxlbWVudFByb3RvdHlwZSA6IE5vZGVQcm90b3R5cGU7XG5cdH1cblxuXHRpZihwcmV2aW91c1NpYmxpbmcpe1xuXHRcdGVsZW1lbnQucHJldiA9IHByZXZpb3VzU2libGluZztcblx0XHRwcmV2aW91c1NpYmxpbmcubmV4dCA9IGVsZW1lbnQ7XG5cdH0gZWxzZSB7XG5cdFx0ZWxlbWVudC5wcmV2ID0gbnVsbDtcblx0fVxuXG5cdHNpYmxpbmdzLnB1c2goZWxlbWVudCk7XG5cdGVsZW1lbnQucGFyZW50ID0gcGFyZW50IHx8IG51bGw7XG59O1xuXG5Eb21IYW5kbGVyLnByb3RvdHlwZS5vbm9wZW50YWcgPSBmdW5jdGlvbihuYW1lLCBhdHRyaWJzKXtcblx0dmFyIGVsZW1lbnQgPSB7XG5cdFx0dHlwZTogbmFtZSA9PT0gXCJzY3JpcHRcIiA/IEVsZW1lbnRUeXBlLlNjcmlwdCA6IG5hbWUgPT09IFwic3R5bGVcIiA/IEVsZW1lbnRUeXBlLlN0eWxlIDogRWxlbWVudFR5cGUuVGFnLFxuXHRcdG5hbWU6IG5hbWUsXG5cdFx0YXR0cmliczogYXR0cmlicyxcblx0XHRjaGlsZHJlbjogW11cblx0fTtcblxuXHR0aGlzLl9hZGREb21FbGVtZW50KGVsZW1lbnQpO1xuXG5cdHRoaXMuX3RhZ1N0YWNrLnB1c2goZWxlbWVudCk7XG59O1xuXG5Eb21IYW5kbGVyLnByb3RvdHlwZS5vbnRleHQgPSBmdW5jdGlvbihkYXRhKXtcblx0Ly90aGUgaWdub3JlV2hpdGVzcGFjZSBpcyBvZmZpY2lhbGx5IGRyb3BwZWQsIGJ1dCBmb3Igbm93LFxuXHQvL2l0J3MgYW4gYWxpYXMgZm9yIG5vcm1hbGl6ZVdoaXRlc3BhY2Vcblx0dmFyIG5vcm1hbGl6ZSA9IHRoaXMuX29wdGlvbnMubm9ybWFsaXplV2hpdGVzcGFjZSB8fCB0aGlzLl9vcHRpb25zLmlnbm9yZVdoaXRlc3BhY2U7XG5cblx0dmFyIGxhc3RUYWc7XG5cblx0aWYoIXRoaXMuX3RhZ1N0YWNrLmxlbmd0aCAmJiB0aGlzLmRvbS5sZW5ndGggJiYgKGxhc3RUYWcgPSB0aGlzLmRvbVt0aGlzLmRvbS5sZW5ndGgtMV0pLnR5cGUgPT09IEVsZW1lbnRUeXBlLlRleHQpe1xuXHRcdGlmKG5vcm1hbGl6ZSl7XG5cdFx0XHRsYXN0VGFnLmRhdGEgPSAobGFzdFRhZy5kYXRhICsgZGF0YSkucmVwbGFjZShyZV93aGl0ZXNwYWNlLCBcIiBcIik7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGxhc3RUYWcuZGF0YSArPSBkYXRhO1xuXHRcdH1cblx0fSBlbHNlIHtcblx0XHRpZihcblx0XHRcdHRoaXMuX3RhZ1N0YWNrLmxlbmd0aCAmJlxuXHRcdFx0KGxhc3RUYWcgPSB0aGlzLl90YWdTdGFja1t0aGlzLl90YWdTdGFjay5sZW5ndGggLSAxXSkgJiZcblx0XHRcdChsYXN0VGFnID0gbGFzdFRhZy5jaGlsZHJlbltsYXN0VGFnLmNoaWxkcmVuLmxlbmd0aCAtIDFdKSAmJlxuXHRcdFx0bGFzdFRhZy50eXBlID09PSBFbGVtZW50VHlwZS5UZXh0XG5cdFx0KXtcblx0XHRcdGlmKG5vcm1hbGl6ZSl7XG5cdFx0XHRcdGxhc3RUYWcuZGF0YSA9IChsYXN0VGFnLmRhdGEgKyBkYXRhKS5yZXBsYWNlKHJlX3doaXRlc3BhY2UsIFwiIFwiKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGxhc3RUYWcuZGF0YSArPSBkYXRhO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRpZihub3JtYWxpemUpe1xuXHRcdFx0XHRkYXRhID0gZGF0YS5yZXBsYWNlKHJlX3doaXRlc3BhY2UsIFwiIFwiKTtcblx0XHRcdH1cblxuXHRcdFx0dGhpcy5fYWRkRG9tRWxlbWVudCh7XG5cdFx0XHRcdGRhdGE6IGRhdGEsXG5cdFx0XHRcdHR5cGU6IEVsZW1lbnRUeXBlLlRleHRcblx0XHRcdH0pO1xuXHRcdH1cblx0fVxufTtcblxuRG9tSGFuZGxlci5wcm90b3R5cGUub25jb21tZW50ID0gZnVuY3Rpb24oZGF0YSl7XG5cdHZhciBsYXN0VGFnID0gdGhpcy5fdGFnU3RhY2tbdGhpcy5fdGFnU3RhY2subGVuZ3RoIC0gMV07XG5cblx0aWYobGFzdFRhZyAmJiBsYXN0VGFnLnR5cGUgPT09IEVsZW1lbnRUeXBlLkNvbW1lbnQpe1xuXHRcdGxhc3RUYWcuZGF0YSArPSBkYXRhO1xuXHRcdHJldHVybjtcblx0fVxuXG5cdHZhciBlbGVtZW50ID0ge1xuXHRcdGRhdGE6IGRhdGEsXG5cdFx0dHlwZTogRWxlbWVudFR5cGUuQ29tbWVudFxuXHR9O1xuXG5cdHRoaXMuX2FkZERvbUVsZW1lbnQoZWxlbWVudCk7XG5cdHRoaXMuX3RhZ1N0YWNrLnB1c2goZWxlbWVudCk7XG59O1xuXG5Eb21IYW5kbGVyLnByb3RvdHlwZS5vbmNkYXRhc3RhcnQgPSBmdW5jdGlvbigpe1xuXHR2YXIgZWxlbWVudCA9IHtcblx0XHRjaGlsZHJlbjogW3tcblx0XHRcdGRhdGE6IFwiXCIsXG5cdFx0XHR0eXBlOiBFbGVtZW50VHlwZS5UZXh0XG5cdFx0fV0sXG5cdFx0dHlwZTogRWxlbWVudFR5cGUuQ0RBVEFcblx0fTtcblxuXHR0aGlzLl9hZGREb21FbGVtZW50KGVsZW1lbnQpO1xuXHR0aGlzLl90YWdTdGFjay5wdXNoKGVsZW1lbnQpO1xufTtcblxuRG9tSGFuZGxlci5wcm90b3R5cGUub25jb21tZW50ZW5kID0gRG9tSGFuZGxlci5wcm90b3R5cGUub25jZGF0YWVuZCA9IGZ1bmN0aW9uKCl7XG5cdHRoaXMuX3RhZ1N0YWNrLnBvcCgpO1xufTtcblxuRG9tSGFuZGxlci5wcm90b3R5cGUub25wcm9jZXNzaW5naW5zdHJ1Y3Rpb24gPSBmdW5jdGlvbihuYW1lLCBkYXRhKXtcblx0dGhpcy5fYWRkRG9tRWxlbWVudCh7XG5cdFx0bmFtZTogbmFtZSxcblx0XHRkYXRhOiBkYXRhLFxuXHRcdHR5cGU6IEVsZW1lbnRUeXBlLkRpcmVjdGl2ZVxuXHR9KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gRG9tSGFuZGxlcjtcbiIsIi8vIERPTS1MZXZlbC0xLWNvbXBsaWFudCBzdHJ1Y3R1cmVcbnZhciBOb2RlUHJvdG90eXBlID0gcmVxdWlyZSgnLi9ub2RlJyk7XG52YXIgRWxlbWVudFByb3RvdHlwZSA9IG1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmNyZWF0ZShOb2RlUHJvdG90eXBlKTtcblxudmFyIGRvbUx2bDEgPSB7XG5cdHRhZ05hbWU6IFwibmFtZVwiXG59O1xuXG5PYmplY3Qua2V5cyhkb21MdmwxKS5mb3JFYWNoKGZ1bmN0aW9uKGtleSkge1xuXHR2YXIgc2hvcnRoYW5kID0gZG9tTHZsMVtrZXldO1xuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoRWxlbWVudFByb3RvdHlwZSwga2V5LCB7XG5cdFx0Z2V0OiBmdW5jdGlvbigpIHtcblx0XHRcdHJldHVybiB0aGlzW3Nob3J0aGFuZF0gfHwgbnVsbDtcblx0XHR9LFxuXHRcdHNldDogZnVuY3Rpb24odmFsKSB7XG5cdFx0XHR0aGlzW3Nob3J0aGFuZF0gPSB2YWw7XG5cdFx0XHRyZXR1cm4gdmFsO1xuXHRcdH1cblx0fSk7XG59KTtcbiIsIi8vIFRoaXMgb2JqZWN0IHdpbGwgYmUgdXNlZCBhcyB0aGUgcHJvdG90eXBlIGZvciBOb2RlcyB3aGVuIGNyZWF0aW5nIGFcbi8vIERPTS1MZXZlbC0xLWNvbXBsaWFudCBzdHJ1Y3R1cmUuXG52YXIgTm9kZVByb3RvdHlwZSA9IG1vZHVsZS5leHBvcnRzID0ge1xuXHRnZXQgZmlyc3RDaGlsZCgpIHtcblx0XHR2YXIgY2hpbGRyZW4gPSB0aGlzLmNoaWxkcmVuO1xuXHRcdHJldHVybiBjaGlsZHJlbiAmJiBjaGlsZHJlblswXSB8fCBudWxsO1xuXHR9LFxuXHRnZXQgbGFzdENoaWxkKCkge1xuXHRcdHZhciBjaGlsZHJlbiA9IHRoaXMuY2hpbGRyZW47XG5cdFx0cmV0dXJuIGNoaWxkcmVuICYmIGNoaWxkcmVuW2NoaWxkcmVuLmxlbmd0aCAtIDFdIHx8IG51bGw7XG5cdH0sXG5cdGdldCBub2RlVHlwZSgpIHtcblx0XHRyZXR1cm4gbm9kZVR5cGVzW3RoaXMudHlwZV0gfHwgbm9kZVR5cGVzLmVsZW1lbnQ7XG5cdH1cbn07XG5cbnZhciBkb21MdmwxID0ge1xuXHR0YWdOYW1lOiBcIm5hbWVcIixcblx0Y2hpbGROb2RlczogXCJjaGlsZHJlblwiLFxuXHRwYXJlbnROb2RlOiBcInBhcmVudFwiLFxuXHRwcmV2aW91c1NpYmxpbmc6IFwicHJldlwiLFxuXHRuZXh0U2libGluZzogXCJuZXh0XCIsXG5cdG5vZGVWYWx1ZTogXCJkYXRhXCJcbn07XG5cbnZhciBub2RlVHlwZXMgPSB7XG5cdGVsZW1lbnQ6IDEsXG5cdHRleHQ6IDMsXG5cdGNkYXRhOiA0LFxuXHRjb21tZW50OiA4XG59O1xuXG5PYmplY3Qua2V5cyhkb21MdmwxKS5mb3JFYWNoKGZ1bmN0aW9uKGtleSkge1xuXHR2YXIgc2hvcnRoYW5kID0gZG9tTHZsMVtrZXldO1xuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoTm9kZVByb3RvdHlwZSwga2V5LCB7XG5cdFx0Z2V0OiBmdW5jdGlvbigpIHtcblx0XHRcdHJldHVybiB0aGlzW3Nob3J0aGFuZF0gfHwgbnVsbDtcblx0XHR9LFxuXHRcdHNldDogZnVuY3Rpb24odmFsKSB7XG5cdFx0XHR0aGlzW3Nob3J0aGFuZF0gPSB2YWw7XG5cdFx0XHRyZXR1cm4gdmFsO1xuXHRcdH1cblx0fSk7XG59KTtcbiIsInZhciBEb21VdGlscyA9IG1vZHVsZS5leHBvcnRzO1xuXG5bXG5cdHJlcXVpcmUoXCIuL2xpYi9zdHJpbmdpZnlcIiksXG5cdHJlcXVpcmUoXCIuL2xpYi90cmF2ZXJzYWxcIiksXG5cdHJlcXVpcmUoXCIuL2xpYi9tYW5pcHVsYXRpb25cIiksXG5cdHJlcXVpcmUoXCIuL2xpYi9xdWVyeWluZ1wiKSxcblx0cmVxdWlyZShcIi4vbGliL2xlZ2FjeVwiKSxcblx0cmVxdWlyZShcIi4vbGliL2hlbHBlcnNcIilcbl0uZm9yRWFjaChmdW5jdGlvbihleHQpe1xuXHRPYmplY3Qua2V5cyhleHQpLmZvckVhY2goZnVuY3Rpb24oa2V5KXtcblx0XHREb21VdGlsc1trZXldID0gZXh0W2tleV0uYmluZChEb21VdGlscyk7XG5cdH0pO1xufSk7XG4iLCIvLyByZW1vdmVTdWJzZXRzXG4vLyBHaXZlbiBhbiBhcnJheSBvZiBub2RlcywgcmVtb3ZlIGFueSBtZW1iZXIgdGhhdCBpcyBjb250YWluZWQgYnkgYW5vdGhlci5cbmV4cG9ydHMucmVtb3ZlU3Vic2V0cyA9IGZ1bmN0aW9uKG5vZGVzKSB7XG5cdHZhciBpZHggPSBub2Rlcy5sZW5ndGgsIG5vZGUsIGFuY2VzdG9yLCByZXBsYWNlO1xuXG5cdC8vIENoZWNrIGlmIGVhY2ggbm9kZSAob3Igb25lIG9mIGl0cyBhbmNlc3RvcnMpIGlzIGFscmVhZHkgY29udGFpbmVkIGluIHRoZVxuXHQvLyBhcnJheS5cblx0d2hpbGUgKC0taWR4ID4gLTEpIHtcblx0XHRub2RlID0gYW5jZXN0b3IgPSBub2Rlc1tpZHhdO1xuXG5cdFx0Ly8gVGVtcG9yYXJpbHkgcmVtb3ZlIHRoZSBub2RlIHVuZGVyIGNvbnNpZGVyYXRpb25cblx0XHRub2Rlc1tpZHhdID0gbnVsbDtcblx0XHRyZXBsYWNlID0gdHJ1ZTtcblxuXHRcdHdoaWxlIChhbmNlc3Rvcikge1xuXHRcdFx0aWYgKG5vZGVzLmluZGV4T2YoYW5jZXN0b3IpID4gLTEpIHtcblx0XHRcdFx0cmVwbGFjZSA9IGZhbHNlO1xuXHRcdFx0XHRub2Rlcy5zcGxpY2UoaWR4LCAxKTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0XHRhbmNlc3RvciA9IGFuY2VzdG9yLnBhcmVudDtcblx0XHR9XG5cblx0XHQvLyBJZiB0aGUgbm9kZSBoYXMgYmVlbiBmb3VuZCB0byBiZSB1bmlxdWUsIHJlLWluc2VydCBpdC5cblx0XHRpZiAocmVwbGFjZSkge1xuXHRcdFx0bm9kZXNbaWR4XSA9IG5vZGU7XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIG5vZGVzO1xufTtcblxuLy8gU291cmNlOiBodHRwOi8vZG9tLnNwZWMud2hhdHdnLm9yZy8jZG9tLW5vZGUtY29tcGFyZWRvY3VtZW50cG9zaXRpb25cbnZhciBQT1NJVElPTiA9IHtcblx0RElTQ09OTkVDVEVEOiAxLFxuXHRQUkVDRURJTkc6IDIsXG5cdEZPTExPV0lORzogNCxcblx0Q09OVEFJTlM6IDgsXG5cdENPTlRBSU5FRF9CWTogMTZcbn07XG5cbi8vIENvbXBhcmUgdGhlIHBvc2l0aW9uIG9mIG9uZSBub2RlIGFnYWluc3QgYW5vdGhlciBub2RlIGluIGFueSBvdGhlciBkb2N1bWVudC5cbi8vIFRoZSByZXR1cm4gdmFsdWUgaXMgYSBiaXRtYXNrIHdpdGggdGhlIGZvbGxvd2luZyB2YWx1ZXM6XG4vL1xuLy8gZG9jdW1lbnQgb3JkZXI6XG4vLyA+IFRoZXJlIGlzIGFuIG9yZGVyaW5nLCBkb2N1bWVudCBvcmRlciwgZGVmaW5lZCBvbiBhbGwgdGhlIG5vZGVzIGluIHRoZVxuLy8gPiBkb2N1bWVudCBjb3JyZXNwb25kaW5nIHRvIHRoZSBvcmRlciBpbiB3aGljaCB0aGUgZmlyc3QgY2hhcmFjdGVyIG9mIHRoZVxuLy8gPiBYTUwgcmVwcmVzZW50YXRpb24gb2YgZWFjaCBub2RlIG9jY3VycyBpbiB0aGUgWE1MIHJlcHJlc2VudGF0aW9uIG9mIHRoZVxuLy8gPiBkb2N1bWVudCBhZnRlciBleHBhbnNpb24gb2YgZ2VuZXJhbCBlbnRpdGllcy4gVGh1cywgdGhlIGRvY3VtZW50IGVsZW1lbnRcbi8vID4gbm9kZSB3aWxsIGJlIHRoZSBmaXJzdCBub2RlLiBFbGVtZW50IG5vZGVzIG9jY3VyIGJlZm9yZSB0aGVpciBjaGlsZHJlbi5cbi8vID4gVGh1cywgZG9jdW1lbnQgb3JkZXIgb3JkZXJzIGVsZW1lbnQgbm9kZXMgaW4gb3JkZXIgb2YgdGhlIG9jY3VycmVuY2Ugb2Zcbi8vID4gdGhlaXIgc3RhcnQtdGFnIGluIHRoZSBYTUwgKGFmdGVyIGV4cGFuc2lvbiBvZiBlbnRpdGllcykuIFRoZSBhdHRyaWJ1dGVcbi8vID4gbm9kZXMgb2YgYW4gZWxlbWVudCBvY2N1ciBhZnRlciB0aGUgZWxlbWVudCBhbmQgYmVmb3JlIGl0cyBjaGlsZHJlbi4gVGhlXG4vLyA+IHJlbGF0aXZlIG9yZGVyIG9mIGF0dHJpYnV0ZSBub2RlcyBpcyBpbXBsZW1lbnRhdGlvbi1kZXBlbmRlbnQuL1xuLy8gU291cmNlOlxuLy8gaHR0cDovL3d3dy53My5vcmcvVFIvRE9NLUxldmVsLTMtQ29yZS9nbG9zc2FyeS5odG1sI2R0LWRvY3VtZW50LW9yZGVyXG4vL1xuLy8gQGFyZ3VtZW50IHtOb2RlfSBub2RhQSBUaGUgZmlyc3Qgbm9kZSB0byB1c2UgaW4gdGhlIGNvbXBhcmlzb25cbi8vIEBhcmd1bWVudCB7Tm9kZX0gbm9kZUIgVGhlIHNlY29uZCBub2RlIHRvIHVzZSBpbiB0aGUgY29tcGFyaXNvblxuLy9cbi8vIEByZXR1cm4ge051bWJlcn0gQSBiaXRtYXNrIGRlc2NyaWJpbmcgdGhlIGlucHV0IG5vZGVzJyByZWxhdGl2ZSBwb3NpdGlvbi5cbi8vICAgICAgICAgU2VlIGh0dHA6Ly9kb20uc3BlYy53aGF0d2cub3JnLyNkb20tbm9kZS1jb21wYXJlZG9jdW1lbnRwb3NpdGlvbiBmb3Jcbi8vICAgICAgICAgYSBkZXNjcmlwdGlvbiBvZiB0aGVzZSB2YWx1ZXMuXG52YXIgY29tcGFyZVBvcyA9IGV4cG9ydHMuY29tcGFyZURvY3VtZW50UG9zaXRpb24gPSBmdW5jdGlvbihub2RlQSwgbm9kZUIpIHtcblx0dmFyIGFQYXJlbnRzID0gW107XG5cdHZhciBiUGFyZW50cyA9IFtdO1xuXHR2YXIgY3VycmVudCwgc2hhcmVkUGFyZW50LCBzaWJsaW5ncywgYVNpYmxpbmcsIGJTaWJsaW5nLCBpZHg7XG5cblx0aWYgKG5vZGVBID09PSBub2RlQikge1xuXHRcdHJldHVybiAwO1xuXHR9XG5cblx0Y3VycmVudCA9IG5vZGVBO1xuXHR3aGlsZSAoY3VycmVudCkge1xuXHRcdGFQYXJlbnRzLnVuc2hpZnQoY3VycmVudCk7XG5cdFx0Y3VycmVudCA9IGN1cnJlbnQucGFyZW50O1xuXHR9XG5cdGN1cnJlbnQgPSBub2RlQjtcblx0d2hpbGUgKGN1cnJlbnQpIHtcblx0XHRiUGFyZW50cy51bnNoaWZ0KGN1cnJlbnQpO1xuXHRcdGN1cnJlbnQgPSBjdXJyZW50LnBhcmVudDtcblx0fVxuXG5cdGlkeCA9IDA7XG5cdHdoaWxlIChhUGFyZW50c1tpZHhdID09PSBiUGFyZW50c1tpZHhdKSB7XG5cdFx0aWR4Kys7XG5cdH1cblxuXHRpZiAoaWR4ID09PSAwKSB7XG5cdFx0cmV0dXJuIFBPU0lUSU9OLkRJU0NPTk5FQ1RFRDtcblx0fVxuXG5cdHNoYXJlZFBhcmVudCA9IGFQYXJlbnRzW2lkeCAtIDFdO1xuXHRzaWJsaW5ncyA9IHNoYXJlZFBhcmVudC5jaGlsZHJlbjtcblx0YVNpYmxpbmcgPSBhUGFyZW50c1tpZHhdO1xuXHRiU2libGluZyA9IGJQYXJlbnRzW2lkeF07XG5cblx0aWYgKHNpYmxpbmdzLmluZGV4T2YoYVNpYmxpbmcpID4gc2libGluZ3MuaW5kZXhPZihiU2libGluZykpIHtcblx0XHRpZiAoc2hhcmVkUGFyZW50ID09PSBub2RlQikge1xuXHRcdFx0cmV0dXJuIFBPU0lUSU9OLkZPTExPV0lORyB8IFBPU0lUSU9OLkNPTlRBSU5FRF9CWTtcblx0XHR9XG5cdFx0cmV0dXJuIFBPU0lUSU9OLkZPTExPV0lORztcblx0fSBlbHNlIHtcblx0XHRpZiAoc2hhcmVkUGFyZW50ID09PSBub2RlQSkge1xuXHRcdFx0cmV0dXJuIFBPU0lUSU9OLlBSRUNFRElORyB8IFBPU0lUSU9OLkNPTlRBSU5TO1xuXHRcdH1cblx0XHRyZXR1cm4gUE9TSVRJT04uUFJFQ0VESU5HO1xuXHR9XG59O1xuXG4vLyBTb3J0IGFuIGFycmF5IG9mIG5vZGVzIGJhc2VkIG9uIHRoZWlyIHJlbGF0aXZlIHBvc2l0aW9uIGluIHRoZSBkb2N1bWVudCBhbmRcbi8vIHJlbW92ZSBhbnkgZHVwbGljYXRlIG5vZGVzLiBJZiB0aGUgYXJyYXkgY29udGFpbnMgbm9kZXMgdGhhdCBkbyBub3QgYmVsb25nXG4vLyB0byB0aGUgc2FtZSBkb2N1bWVudCwgc29ydCBvcmRlciBpcyB1bnNwZWNpZmllZC5cbi8vXG4vLyBAYXJndW1lbnQge0FycmF5fSBub2RlcyBBcnJheSBvZiBET00gbm9kZXNcbi8vXG4vLyBAcmV0dXJucyB7QXJyYXl9IGNvbGxlY3Rpb24gb2YgdW5pcXVlIG5vZGVzLCBzb3J0ZWQgaW4gZG9jdW1lbnQgb3JkZXJcbmV4cG9ydHMudW5pcXVlU29ydCA9IGZ1bmN0aW9uKG5vZGVzKSB7XG5cdHZhciBpZHggPSBub2Rlcy5sZW5ndGgsIG5vZGUsIHBvc2l0aW9uO1xuXG5cdG5vZGVzID0gbm9kZXMuc2xpY2UoKTtcblxuXHR3aGlsZSAoLS1pZHggPiAtMSkge1xuXHRcdG5vZGUgPSBub2Rlc1tpZHhdO1xuXHRcdHBvc2l0aW9uID0gbm9kZXMuaW5kZXhPZihub2RlKTtcblx0XHRpZiAocG9zaXRpb24gPiAtMSAmJiBwb3NpdGlvbiA8IGlkeCkge1xuXHRcdFx0bm9kZXMuc3BsaWNlKGlkeCwgMSk7XG5cdFx0fVxuXHR9XG5cdG5vZGVzLnNvcnQoZnVuY3Rpb24oYSwgYikge1xuXHRcdHZhciByZWxhdGl2ZSA9IGNvbXBhcmVQb3MoYSwgYik7XG5cdFx0aWYgKHJlbGF0aXZlICYgUE9TSVRJT04uUFJFQ0VESU5HKSB7XG5cdFx0XHRyZXR1cm4gLTE7XG5cdFx0fSBlbHNlIGlmIChyZWxhdGl2ZSAmIFBPU0lUSU9OLkZPTExPV0lORykge1xuXHRcdFx0cmV0dXJuIDE7XG5cdFx0fVxuXHRcdHJldHVybiAwO1xuXHR9KTtcblxuXHRyZXR1cm4gbm9kZXM7XG59O1xuIiwidmFyIEVsZW1lbnRUeXBlID0gcmVxdWlyZShcImRvbWVsZW1lbnR0eXBlXCIpO1xudmFyIGlzVGFnID0gZXhwb3J0cy5pc1RhZyA9IEVsZW1lbnRUeXBlLmlzVGFnO1xuXG5leHBvcnRzLnRlc3RFbGVtZW50ID0gZnVuY3Rpb24ob3B0aW9ucywgZWxlbWVudCl7XG5cdGZvcih2YXIga2V5IGluIG9wdGlvbnMpe1xuXHRcdGlmKCFvcHRpb25zLmhhc093blByb3BlcnR5KGtleSkpO1xuXHRcdGVsc2UgaWYoa2V5ID09PSBcInRhZ19uYW1lXCIpe1xuXHRcdFx0aWYoIWlzVGFnKGVsZW1lbnQpIHx8ICFvcHRpb25zLnRhZ19uYW1lKGVsZW1lbnQubmFtZSkpe1xuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIGlmKGtleSA9PT0gXCJ0YWdfdHlwZVwiKXtcblx0XHRcdGlmKCFvcHRpb25zLnRhZ190eXBlKGVsZW1lbnQudHlwZSkpIHJldHVybiBmYWxzZTtcblx0XHR9IGVsc2UgaWYoa2V5ID09PSBcInRhZ19jb250YWluc1wiKXtcblx0XHRcdGlmKGlzVGFnKGVsZW1lbnQpIHx8ICFvcHRpb25zLnRhZ19jb250YWlucyhlbGVtZW50LmRhdGEpKXtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSBpZighZWxlbWVudC5hdHRyaWJzIHx8ICFvcHRpb25zW2tleV0oZWxlbWVudC5hdHRyaWJzW2tleV0pKXtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cdH1cblx0cmV0dXJuIHRydWU7XG59O1xuXG52YXIgQ2hlY2tzID0ge1xuXHR0YWdfbmFtZTogZnVuY3Rpb24obmFtZSl7XG5cdFx0aWYodHlwZW9mIG5hbWUgPT09IFwiZnVuY3Rpb25cIil7XG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24oZWxlbSl7IHJldHVybiBpc1RhZyhlbGVtKSAmJiBuYW1lKGVsZW0ubmFtZSk7IH07XG5cdFx0fSBlbHNlIGlmKG5hbWUgPT09IFwiKlwiKXtcblx0XHRcdHJldHVybiBpc1RhZztcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmV0dXJuIGZ1bmN0aW9uKGVsZW0peyByZXR1cm4gaXNUYWcoZWxlbSkgJiYgZWxlbS5uYW1lID09PSBuYW1lOyB9O1xuXHRcdH1cblx0fSxcblx0dGFnX3R5cGU6IGZ1bmN0aW9uKHR5cGUpe1xuXHRcdGlmKHR5cGVvZiB0eXBlID09PSBcImZ1bmN0aW9uXCIpe1xuXHRcdFx0cmV0dXJuIGZ1bmN0aW9uKGVsZW0peyByZXR1cm4gdHlwZShlbGVtLnR5cGUpOyB9O1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24oZWxlbSl7IHJldHVybiBlbGVtLnR5cGUgPT09IHR5cGU7IH07XG5cdFx0fVxuXHR9LFxuXHR0YWdfY29udGFpbnM6IGZ1bmN0aW9uKGRhdGEpe1xuXHRcdGlmKHR5cGVvZiBkYXRhID09PSBcImZ1bmN0aW9uXCIpe1xuXHRcdFx0cmV0dXJuIGZ1bmN0aW9uKGVsZW0peyByZXR1cm4gIWlzVGFnKGVsZW0pICYmIGRhdGEoZWxlbS5kYXRhKTsgfTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmV0dXJuIGZ1bmN0aW9uKGVsZW0peyByZXR1cm4gIWlzVGFnKGVsZW0pICYmIGVsZW0uZGF0YSA9PT0gZGF0YTsgfTtcblx0XHR9XG5cdH1cbn07XG5cbmZ1bmN0aW9uIGdldEF0dHJpYkNoZWNrKGF0dHJpYiwgdmFsdWUpe1xuXHRpZih0eXBlb2YgdmFsdWUgPT09IFwiZnVuY3Rpb25cIil7XG5cdFx0cmV0dXJuIGZ1bmN0aW9uKGVsZW0peyByZXR1cm4gZWxlbS5hdHRyaWJzICYmIHZhbHVlKGVsZW0uYXR0cmlic1thdHRyaWJdKTsgfTtcblx0fSBlbHNlIHtcblx0XHRyZXR1cm4gZnVuY3Rpb24oZWxlbSl7IHJldHVybiBlbGVtLmF0dHJpYnMgJiYgZWxlbS5hdHRyaWJzW2F0dHJpYl0gPT09IHZhbHVlOyB9O1xuXHR9XG59XG5cbmZ1bmN0aW9uIGNvbWJpbmVGdW5jcyhhLCBiKXtcblx0cmV0dXJuIGZ1bmN0aW9uKGVsZW0pe1xuXHRcdHJldHVybiBhKGVsZW0pIHx8IGIoZWxlbSk7XG5cdH07XG59XG5cbmV4cG9ydHMuZ2V0RWxlbWVudHMgPSBmdW5jdGlvbihvcHRpb25zLCBlbGVtZW50LCByZWN1cnNlLCBsaW1pdCl7XG5cdHZhciBmdW5jcyA9IE9iamVjdC5rZXlzKG9wdGlvbnMpLm1hcChmdW5jdGlvbihrZXkpe1xuXHRcdHZhciB2YWx1ZSA9IG9wdGlvbnNba2V5XTtcblx0XHRyZXR1cm4ga2V5IGluIENoZWNrcyA/IENoZWNrc1trZXldKHZhbHVlKSA6IGdldEF0dHJpYkNoZWNrKGtleSwgdmFsdWUpO1xuXHR9KTtcblxuXHRyZXR1cm4gZnVuY3MubGVuZ3RoID09PSAwID8gW10gOiB0aGlzLmZpbHRlcihcblx0XHRmdW5jcy5yZWR1Y2UoY29tYmluZUZ1bmNzKSxcblx0XHRlbGVtZW50LCByZWN1cnNlLCBsaW1pdFxuXHQpO1xufTtcblxuZXhwb3J0cy5nZXRFbGVtZW50QnlJZCA9IGZ1bmN0aW9uKGlkLCBlbGVtZW50LCByZWN1cnNlKXtcblx0aWYoIUFycmF5LmlzQXJyYXkoZWxlbWVudCkpIGVsZW1lbnQgPSBbZWxlbWVudF07XG5cdHJldHVybiB0aGlzLmZpbmRPbmUoZ2V0QXR0cmliQ2hlY2soXCJpZFwiLCBpZCksIGVsZW1lbnQsIHJlY3Vyc2UgIT09IGZhbHNlKTtcbn07XG5cbmV4cG9ydHMuZ2V0RWxlbWVudHNCeVRhZ05hbWUgPSBmdW5jdGlvbihuYW1lLCBlbGVtZW50LCByZWN1cnNlLCBsaW1pdCl7XG5cdHJldHVybiB0aGlzLmZpbHRlcihDaGVja3MudGFnX25hbWUobmFtZSksIGVsZW1lbnQsIHJlY3Vyc2UsIGxpbWl0KTtcbn07XG5cbmV4cG9ydHMuZ2V0RWxlbWVudHNCeVRhZ1R5cGUgPSBmdW5jdGlvbih0eXBlLCBlbGVtZW50LCByZWN1cnNlLCBsaW1pdCl7XG5cdHJldHVybiB0aGlzLmZpbHRlcihDaGVja3MudGFnX3R5cGUodHlwZSksIGVsZW1lbnQsIHJlY3Vyc2UsIGxpbWl0KTtcbn07XG4iLCJleHBvcnRzLnJlbW92ZUVsZW1lbnQgPSBmdW5jdGlvbihlbGVtKXtcblx0aWYoZWxlbS5wcmV2KSBlbGVtLnByZXYubmV4dCA9IGVsZW0ubmV4dDtcblx0aWYoZWxlbS5uZXh0KSBlbGVtLm5leHQucHJldiA9IGVsZW0ucHJldjtcblxuXHRpZihlbGVtLnBhcmVudCl7XG5cdFx0dmFyIGNoaWxkcyA9IGVsZW0ucGFyZW50LmNoaWxkcmVuO1xuXHRcdGNoaWxkcy5zcGxpY2UoY2hpbGRzLmxhc3RJbmRleE9mKGVsZW0pLCAxKTtcblx0fVxufTtcblxuZXhwb3J0cy5yZXBsYWNlRWxlbWVudCA9IGZ1bmN0aW9uKGVsZW0sIHJlcGxhY2VtZW50KXtcblx0dmFyIHByZXYgPSByZXBsYWNlbWVudC5wcmV2ID0gZWxlbS5wcmV2O1xuXHRpZihwcmV2KXtcblx0XHRwcmV2Lm5leHQgPSByZXBsYWNlbWVudDtcblx0fVxuXG5cdHZhciBuZXh0ID0gcmVwbGFjZW1lbnQubmV4dCA9IGVsZW0ubmV4dDtcblx0aWYobmV4dCl7XG5cdFx0bmV4dC5wcmV2ID0gcmVwbGFjZW1lbnQ7XG5cdH1cblxuXHR2YXIgcGFyZW50ID0gcmVwbGFjZW1lbnQucGFyZW50ID0gZWxlbS5wYXJlbnQ7XG5cdGlmKHBhcmVudCl7XG5cdFx0dmFyIGNoaWxkcyA9IHBhcmVudC5jaGlsZHJlbjtcblx0XHRjaGlsZHNbY2hpbGRzLmxhc3RJbmRleE9mKGVsZW0pXSA9IHJlcGxhY2VtZW50O1xuXHR9XG59O1xuXG5leHBvcnRzLmFwcGVuZENoaWxkID0gZnVuY3Rpb24oZWxlbSwgY2hpbGQpe1xuXHRjaGlsZC5wYXJlbnQgPSBlbGVtO1xuXG5cdGlmKGVsZW0uY2hpbGRyZW4ucHVzaChjaGlsZCkgIT09IDEpe1xuXHRcdHZhciBzaWJsaW5nID0gZWxlbS5jaGlsZHJlbltlbGVtLmNoaWxkcmVuLmxlbmd0aCAtIDJdO1xuXHRcdHNpYmxpbmcubmV4dCA9IGNoaWxkO1xuXHRcdGNoaWxkLnByZXYgPSBzaWJsaW5nO1xuXHRcdGNoaWxkLm5leHQgPSBudWxsO1xuXHR9XG59O1xuXG5leHBvcnRzLmFwcGVuZCA9IGZ1bmN0aW9uKGVsZW0sIG5leHQpe1xuXHR2YXIgcGFyZW50ID0gZWxlbS5wYXJlbnQsXG5cdFx0Y3Vyck5leHQgPSBlbGVtLm5leHQ7XG5cblx0bmV4dC5uZXh0ID0gY3Vyck5leHQ7XG5cdG5leHQucHJldiA9IGVsZW07XG5cdGVsZW0ubmV4dCA9IG5leHQ7XG5cdG5leHQucGFyZW50ID0gcGFyZW50O1xuXG5cdGlmKGN1cnJOZXh0KXtcblx0XHRjdXJyTmV4dC5wcmV2ID0gbmV4dDtcblx0XHRpZihwYXJlbnQpe1xuXHRcdFx0dmFyIGNoaWxkcyA9IHBhcmVudC5jaGlsZHJlbjtcblx0XHRcdGNoaWxkcy5zcGxpY2UoY2hpbGRzLmxhc3RJbmRleE9mKGN1cnJOZXh0KSwgMCwgbmV4dCk7XG5cdFx0fVxuXHR9IGVsc2UgaWYocGFyZW50KXtcblx0XHRwYXJlbnQuY2hpbGRyZW4ucHVzaChuZXh0KTtcblx0fVxufTtcblxuZXhwb3J0cy5wcmVwZW5kID0gZnVuY3Rpb24oZWxlbSwgcHJldil7XG5cdHZhciBwYXJlbnQgPSBlbGVtLnBhcmVudDtcblx0aWYocGFyZW50KXtcblx0XHR2YXIgY2hpbGRzID0gcGFyZW50LmNoaWxkcmVuO1xuXHRcdGNoaWxkcy5zcGxpY2UoY2hpbGRzLmxhc3RJbmRleE9mKGVsZW0pLCAwLCBwcmV2KTtcblx0fVxuXG5cdGlmKGVsZW0ucHJldil7XG5cdFx0ZWxlbS5wcmV2Lm5leHQgPSBwcmV2O1xuXHR9XG5cdFxuXHRwcmV2LnBhcmVudCA9IHBhcmVudDtcblx0cHJldi5wcmV2ID0gZWxlbS5wcmV2O1xuXHRwcmV2Lm5leHQgPSBlbGVtO1xuXHRlbGVtLnByZXYgPSBwcmV2O1xufTtcblxuXG4iLCJ2YXIgaXNUYWcgPSByZXF1aXJlKFwiZG9tZWxlbWVudHR5cGVcIikuaXNUYWc7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuXHRmaWx0ZXI6IGZpbHRlcixcblx0ZmluZDogZmluZCxcblx0ZmluZE9uZUNoaWxkOiBmaW5kT25lQ2hpbGQsXG5cdGZpbmRPbmU6IGZpbmRPbmUsXG5cdGV4aXN0c09uZTogZXhpc3RzT25lLFxuXHRmaW5kQWxsOiBmaW5kQWxsXG59O1xuXG5mdW5jdGlvbiBmaWx0ZXIodGVzdCwgZWxlbWVudCwgcmVjdXJzZSwgbGltaXQpe1xuXHRpZighQXJyYXkuaXNBcnJheShlbGVtZW50KSkgZWxlbWVudCA9IFtlbGVtZW50XTtcblxuXHRpZih0eXBlb2YgbGltaXQgIT09IFwibnVtYmVyXCIgfHwgIWlzRmluaXRlKGxpbWl0KSl7XG5cdFx0bGltaXQgPSBJbmZpbml0eTtcblx0fVxuXHRyZXR1cm4gZmluZCh0ZXN0LCBlbGVtZW50LCByZWN1cnNlICE9PSBmYWxzZSwgbGltaXQpO1xufVxuXG5mdW5jdGlvbiBmaW5kKHRlc3QsIGVsZW1zLCByZWN1cnNlLCBsaW1pdCl7XG5cdHZhciByZXN1bHQgPSBbXSwgY2hpbGRzO1xuXG5cdGZvcih2YXIgaSA9IDAsIGogPSBlbGVtcy5sZW5ndGg7IGkgPCBqOyBpKyspe1xuXHRcdGlmKHRlc3QoZWxlbXNbaV0pKXtcblx0XHRcdHJlc3VsdC5wdXNoKGVsZW1zW2ldKTtcblx0XHRcdGlmKC0tbGltaXQgPD0gMCkgYnJlYWs7XG5cdFx0fVxuXG5cdFx0Y2hpbGRzID0gZWxlbXNbaV0uY2hpbGRyZW47XG5cdFx0aWYocmVjdXJzZSAmJiBjaGlsZHMgJiYgY2hpbGRzLmxlbmd0aCA+IDApe1xuXHRcdFx0Y2hpbGRzID0gZmluZCh0ZXN0LCBjaGlsZHMsIHJlY3Vyc2UsIGxpbWl0KTtcblx0XHRcdHJlc3VsdCA9IHJlc3VsdC5jb25jYXQoY2hpbGRzKTtcblx0XHRcdGxpbWl0IC09IGNoaWxkcy5sZW5ndGg7XG5cdFx0XHRpZihsaW1pdCA8PSAwKSBicmVhaztcblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gcmVzdWx0O1xufVxuXG5mdW5jdGlvbiBmaW5kT25lQ2hpbGQodGVzdCwgZWxlbXMpe1xuXHRmb3IodmFyIGkgPSAwLCBsID0gZWxlbXMubGVuZ3RoOyBpIDwgbDsgaSsrKXtcblx0XHRpZih0ZXN0KGVsZW1zW2ldKSkgcmV0dXJuIGVsZW1zW2ldO1xuXHR9XG5cblx0cmV0dXJuIG51bGw7XG59XG5cbmZ1bmN0aW9uIGZpbmRPbmUodGVzdCwgZWxlbXMpe1xuXHR2YXIgZWxlbSA9IG51bGw7XG5cblx0Zm9yKHZhciBpID0gMCwgbCA9IGVsZW1zLmxlbmd0aDsgaSA8IGwgJiYgIWVsZW07IGkrKyl7XG5cdFx0aWYoIWlzVGFnKGVsZW1zW2ldKSl7XG5cdFx0XHRjb250aW51ZTtcblx0XHR9IGVsc2UgaWYodGVzdChlbGVtc1tpXSkpe1xuXHRcdFx0ZWxlbSA9IGVsZW1zW2ldO1xuXHRcdH0gZWxzZSBpZihlbGVtc1tpXS5jaGlsZHJlbi5sZW5ndGggPiAwKXtcblx0XHRcdGVsZW0gPSBmaW5kT25lKHRlc3QsIGVsZW1zW2ldLmNoaWxkcmVuKTtcblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gZWxlbTtcbn1cblxuZnVuY3Rpb24gZXhpc3RzT25lKHRlc3QsIGVsZW1zKXtcblx0Zm9yKHZhciBpID0gMCwgbCA9IGVsZW1zLmxlbmd0aDsgaSA8IGw7IGkrKyl7XG5cdFx0aWYoXG5cdFx0XHRpc1RhZyhlbGVtc1tpXSkgJiYgKFxuXHRcdFx0XHR0ZXN0KGVsZW1zW2ldKSB8fCAoXG5cdFx0XHRcdFx0ZWxlbXNbaV0uY2hpbGRyZW4ubGVuZ3RoID4gMCAmJlxuXHRcdFx0XHRcdGV4aXN0c09uZSh0ZXN0LCBlbGVtc1tpXS5jaGlsZHJlbilcblx0XHRcdFx0KVxuXHRcdFx0KVxuXHRcdCl7XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gZmFsc2U7XG59XG5cbmZ1bmN0aW9uIGZpbmRBbGwodGVzdCwgZWxlbXMpe1xuXHR2YXIgcmVzdWx0ID0gW107XG5cdGZvcih2YXIgaSA9IDAsIGogPSBlbGVtcy5sZW5ndGg7IGkgPCBqOyBpKyspe1xuXHRcdGlmKCFpc1RhZyhlbGVtc1tpXSkpIGNvbnRpbnVlO1xuXHRcdGlmKHRlc3QoZWxlbXNbaV0pKSByZXN1bHQucHVzaChlbGVtc1tpXSk7XG5cblx0XHRpZihlbGVtc1tpXS5jaGlsZHJlbi5sZW5ndGggPiAwKXtcblx0XHRcdHJlc3VsdCA9IHJlc3VsdC5jb25jYXQoZmluZEFsbCh0ZXN0LCBlbGVtc1tpXS5jaGlsZHJlbikpO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gcmVzdWx0O1xufVxuIiwidmFyIEVsZW1lbnRUeXBlID0gcmVxdWlyZShcImRvbWVsZW1lbnR0eXBlXCIpLFxuICAgIGdldE91dGVySFRNTCA9IHJlcXVpcmUoXCJkb20tc2VyaWFsaXplclwiKSxcbiAgICBpc1RhZyA9IEVsZW1lbnRUeXBlLmlzVGFnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcblx0Z2V0SW5uZXJIVE1MOiBnZXRJbm5lckhUTUwsXG5cdGdldE91dGVySFRNTDogZ2V0T3V0ZXJIVE1MLFxuXHRnZXRUZXh0OiBnZXRUZXh0XG59O1xuXG5mdW5jdGlvbiBnZXRJbm5lckhUTUwoZWxlbSwgb3B0cyl7XG5cdHJldHVybiBlbGVtLmNoaWxkcmVuID8gZWxlbS5jaGlsZHJlbi5tYXAoZnVuY3Rpb24oZWxlbSl7XG5cdFx0cmV0dXJuIGdldE91dGVySFRNTChlbGVtLCBvcHRzKTtcblx0fSkuam9pbihcIlwiKSA6IFwiXCI7XG59XG5cbmZ1bmN0aW9uIGdldFRleHQoZWxlbSl7XG5cdGlmKEFycmF5LmlzQXJyYXkoZWxlbSkpIHJldHVybiBlbGVtLm1hcChnZXRUZXh0KS5qb2luKFwiXCIpO1xuXHRpZihpc1RhZyhlbGVtKSB8fCBlbGVtLnR5cGUgPT09IEVsZW1lbnRUeXBlLkNEQVRBKSByZXR1cm4gZ2V0VGV4dChlbGVtLmNoaWxkcmVuKTtcblx0aWYoZWxlbS50eXBlID09PSBFbGVtZW50VHlwZS5UZXh0KSByZXR1cm4gZWxlbS5kYXRhO1xuXHRyZXR1cm4gXCJcIjtcbn1cbiIsInZhciBnZXRDaGlsZHJlbiA9IGV4cG9ydHMuZ2V0Q2hpbGRyZW4gPSBmdW5jdGlvbihlbGVtKXtcblx0cmV0dXJuIGVsZW0uY2hpbGRyZW47XG59O1xuXG52YXIgZ2V0UGFyZW50ID0gZXhwb3J0cy5nZXRQYXJlbnQgPSBmdW5jdGlvbihlbGVtKXtcblx0cmV0dXJuIGVsZW0ucGFyZW50O1xufTtcblxuZXhwb3J0cy5nZXRTaWJsaW5ncyA9IGZ1bmN0aW9uKGVsZW0pe1xuXHR2YXIgcGFyZW50ID0gZ2V0UGFyZW50KGVsZW0pO1xuXHRyZXR1cm4gcGFyZW50ID8gZ2V0Q2hpbGRyZW4ocGFyZW50KSA6IFtlbGVtXTtcbn07XG5cbmV4cG9ydHMuZ2V0QXR0cmlidXRlVmFsdWUgPSBmdW5jdGlvbihlbGVtLCBuYW1lKXtcblx0cmV0dXJuIGVsZW0uYXR0cmlicyAmJiBlbGVtLmF0dHJpYnNbbmFtZV07XG59O1xuXG5leHBvcnRzLmhhc0F0dHJpYiA9IGZ1bmN0aW9uKGVsZW0sIG5hbWUpe1xuXHRyZXR1cm4gISFlbGVtLmF0dHJpYnMgJiYgaGFzT3duUHJvcGVydHkuY2FsbChlbGVtLmF0dHJpYnMsIG5hbWUpO1xufTtcblxuZXhwb3J0cy5nZXROYW1lID0gZnVuY3Rpb24oZWxlbSl7XG5cdHJldHVybiBlbGVtLm5hbWU7XG59O1xuIiwidmFyIGVuY29kZSA9IHJlcXVpcmUoXCIuL2xpYi9lbmNvZGUuanNcIiksXG4gICAgZGVjb2RlID0gcmVxdWlyZShcIi4vbGliL2RlY29kZS5qc1wiKTtcblxuZXhwb3J0cy5kZWNvZGUgPSBmdW5jdGlvbihkYXRhLCBsZXZlbCl7XG5cdHJldHVybiAoIWxldmVsIHx8IGxldmVsIDw9IDAgPyBkZWNvZGUuWE1MIDogZGVjb2RlLkhUTUwpKGRhdGEpO1xufTtcblxuZXhwb3J0cy5kZWNvZGVTdHJpY3QgPSBmdW5jdGlvbihkYXRhLCBsZXZlbCl7XG5cdHJldHVybiAoIWxldmVsIHx8IGxldmVsIDw9IDAgPyBkZWNvZGUuWE1MIDogZGVjb2RlLkhUTUxTdHJpY3QpKGRhdGEpO1xufTtcblxuZXhwb3J0cy5lbmNvZGUgPSBmdW5jdGlvbihkYXRhLCBsZXZlbCl7XG5cdHJldHVybiAoIWxldmVsIHx8IGxldmVsIDw9IDAgPyBlbmNvZGUuWE1MIDogZW5jb2RlLkhUTUwpKGRhdGEpO1xufTtcblxuZXhwb3J0cy5lbmNvZGVYTUwgPSBlbmNvZGUuWE1MO1xuXG5leHBvcnRzLmVuY29kZUhUTUw0ID1cbmV4cG9ydHMuZW5jb2RlSFRNTDUgPVxuZXhwb3J0cy5lbmNvZGVIVE1MICA9IGVuY29kZS5IVE1MO1xuXG5leHBvcnRzLmRlY29kZVhNTCA9XG5leHBvcnRzLmRlY29kZVhNTFN0cmljdCA9IGRlY29kZS5YTUw7XG5cbmV4cG9ydHMuZGVjb2RlSFRNTDQgPVxuZXhwb3J0cy5kZWNvZGVIVE1MNSA9XG5leHBvcnRzLmRlY29kZUhUTUwgPSBkZWNvZGUuSFRNTDtcblxuZXhwb3J0cy5kZWNvZGVIVE1MNFN0cmljdCA9XG5leHBvcnRzLmRlY29kZUhUTUw1U3RyaWN0ID1cbmV4cG9ydHMuZGVjb2RlSFRNTFN0cmljdCA9IGRlY29kZS5IVE1MU3RyaWN0O1xuXG5leHBvcnRzLmVzY2FwZSA9IGVuY29kZS5lc2NhcGU7XG4iLCJ2YXIgZW50aXR5TWFwID0gcmVxdWlyZShcIi4uL21hcHMvZW50aXRpZXMuanNvblwiKSxcbiAgICBsZWdhY3lNYXAgPSByZXF1aXJlKFwiLi4vbWFwcy9sZWdhY3kuanNvblwiKSxcbiAgICB4bWxNYXAgICAgPSByZXF1aXJlKFwiLi4vbWFwcy94bWwuanNvblwiKSxcbiAgICBkZWNvZGVDb2RlUG9pbnQgPSByZXF1aXJlKFwiLi9kZWNvZGVfY29kZXBvaW50LmpzXCIpO1xuXG52YXIgZGVjb2RlWE1MU3RyaWN0ICA9IGdldFN0cmljdERlY29kZXIoeG1sTWFwKSxcbiAgICBkZWNvZGVIVE1MU3RyaWN0ID0gZ2V0U3RyaWN0RGVjb2RlcihlbnRpdHlNYXApO1xuXG5mdW5jdGlvbiBnZXRTdHJpY3REZWNvZGVyKG1hcCl7XG5cdHZhciBrZXlzID0gT2JqZWN0LmtleXMobWFwKS5qb2luKFwifFwiKSxcblx0ICAgIHJlcGxhY2UgPSBnZXRSZXBsYWNlcihtYXApO1xuXG5cdGtleXMgKz0gXCJ8I1t4WF1bXFxcXGRhLWZBLUZdK3wjXFxcXGQrXCI7XG5cblx0dmFyIHJlID0gbmV3IFJlZ0V4cChcIiYoPzpcIiArIGtleXMgKyBcIik7XCIsIFwiZ1wiKTtcblxuXHRyZXR1cm4gZnVuY3Rpb24oc3RyKXtcblx0XHRyZXR1cm4gU3RyaW5nKHN0cikucmVwbGFjZShyZSwgcmVwbGFjZSk7XG5cdH07XG59XG5cbnZhciBkZWNvZGVIVE1MID0gKGZ1bmN0aW9uKCl7XG5cdHZhciBsZWdhY3kgPSBPYmplY3Qua2V5cyhsZWdhY3lNYXApXG5cdFx0LnNvcnQoc29ydGVyKTtcblxuXHR2YXIga2V5cyA9IE9iamVjdC5rZXlzKGVudGl0eU1hcClcblx0XHQuc29ydChzb3J0ZXIpO1xuXG5cdGZvcih2YXIgaSA9IDAsIGogPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkrKyl7XG5cdFx0aWYobGVnYWN5W2pdID09PSBrZXlzW2ldKXtcblx0XHRcdGtleXNbaV0gKz0gXCI7P1wiO1xuXHRcdFx0aisrO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRrZXlzW2ldICs9IFwiO1wiO1xuXHRcdH1cblx0fVxuXG5cdHZhciByZSA9IG5ldyBSZWdFeHAoXCImKD86XCIgKyBrZXlzLmpvaW4oXCJ8XCIpICsgXCJ8I1t4WF1bXFxcXGRhLWZBLUZdKzs/fCNcXFxcZCs7PylcIiwgXCJnXCIpLFxuXHQgICAgcmVwbGFjZSA9IGdldFJlcGxhY2VyKGVudGl0eU1hcCk7XG5cblx0ZnVuY3Rpb24gcmVwbGFjZXIoc3RyKXtcblx0XHRpZihzdHIuc3Vic3RyKC0xKSAhPT0gXCI7XCIpIHN0ciArPSBcIjtcIjtcblx0XHRyZXR1cm4gcmVwbGFjZShzdHIpO1xuXHR9XG5cblx0Ly9UT0RPIGNvbnNpZGVyIGNyZWF0aW5nIGEgbWVyZ2VkIG1hcFxuXHRyZXR1cm4gZnVuY3Rpb24oc3RyKXtcblx0XHRyZXR1cm4gU3RyaW5nKHN0cikucmVwbGFjZShyZSwgcmVwbGFjZXIpO1xuXHR9O1xufSgpKTtcblxuZnVuY3Rpb24gc29ydGVyKGEsIGIpe1xuXHRyZXR1cm4gYSA8IGIgPyAxIDogLTE7XG59XG5cbmZ1bmN0aW9uIGdldFJlcGxhY2VyKG1hcCl7XG5cdHJldHVybiBmdW5jdGlvbiByZXBsYWNlKHN0cil7XG5cdFx0aWYoc3RyLmNoYXJBdCgxKSA9PT0gXCIjXCIpe1xuXHRcdFx0aWYoc3RyLmNoYXJBdCgyKSA9PT0gXCJYXCIgfHwgc3RyLmNoYXJBdCgyKSA9PT0gXCJ4XCIpe1xuXHRcdFx0XHRyZXR1cm4gZGVjb2RlQ29kZVBvaW50KHBhcnNlSW50KHN0ci5zdWJzdHIoMyksIDE2KSk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gZGVjb2RlQ29kZVBvaW50KHBhcnNlSW50KHN0ci5zdWJzdHIoMiksIDEwKSk7XG5cdFx0fVxuXHRcdHJldHVybiBtYXBbc3RyLnNsaWNlKDEsIC0xKV07XG5cdH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuXHRYTUw6IGRlY29kZVhNTFN0cmljdCxcblx0SFRNTDogZGVjb2RlSFRNTCxcblx0SFRNTFN0cmljdDogZGVjb2RlSFRNTFN0cmljdFxufTsiLCJ2YXIgZGVjb2RlTWFwID0gcmVxdWlyZShcIi4uL21hcHMvZGVjb2RlLmpzb25cIik7XG5cbm1vZHVsZS5leHBvcnRzID0gZGVjb2RlQ29kZVBvaW50O1xuXG4vLyBtb2RpZmllZCB2ZXJzaW9uIG9mIGh0dHBzOi8vZ2l0aHViLmNvbS9tYXRoaWFzYnluZW5zL2hlL2Jsb2IvbWFzdGVyL3NyYy9oZS5qcyNMOTQtTDExOVxuZnVuY3Rpb24gZGVjb2RlQ29kZVBvaW50KGNvZGVQb2ludCl7XG5cblx0aWYoKGNvZGVQb2ludCA+PSAweEQ4MDAgJiYgY29kZVBvaW50IDw9IDB4REZGRikgfHwgY29kZVBvaW50ID4gMHgxMEZGRkYpe1xuXHRcdHJldHVybiBcIlxcdUZGRkRcIjtcblx0fVxuXG5cdGlmKGNvZGVQb2ludCBpbiBkZWNvZGVNYXApe1xuXHRcdGNvZGVQb2ludCA9IGRlY29kZU1hcFtjb2RlUG9pbnRdO1xuXHR9XG5cblx0dmFyIG91dHB1dCA9IFwiXCI7XG5cblx0aWYoY29kZVBvaW50ID4gMHhGRkZGKXtcblx0XHRjb2RlUG9pbnQgLT0gMHgxMDAwMDtcblx0XHRvdXRwdXQgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShjb2RlUG9pbnQgPj4+IDEwICYgMHgzRkYgfCAweEQ4MDApO1xuXHRcdGNvZGVQb2ludCA9IDB4REMwMCB8IGNvZGVQb2ludCAmIDB4M0ZGO1xuXHR9XG5cblx0b3V0cHV0ICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoY29kZVBvaW50KTtcblx0cmV0dXJuIG91dHB1dDtcbn1cbiIsInZhciBpbnZlcnNlWE1MID0gZ2V0SW52ZXJzZU9iaihyZXF1aXJlKFwiLi4vbWFwcy94bWwuanNvblwiKSksXG4gICAgeG1sUmVwbGFjZXIgPSBnZXRJbnZlcnNlUmVwbGFjZXIoaW52ZXJzZVhNTCk7XG5cbmV4cG9ydHMuWE1MID0gZ2V0SW52ZXJzZShpbnZlcnNlWE1MLCB4bWxSZXBsYWNlcik7XG5cbnZhciBpbnZlcnNlSFRNTCA9IGdldEludmVyc2VPYmoocmVxdWlyZShcIi4uL21hcHMvZW50aXRpZXMuanNvblwiKSksXG4gICAgaHRtbFJlcGxhY2VyID0gZ2V0SW52ZXJzZVJlcGxhY2VyKGludmVyc2VIVE1MKTtcblxuZXhwb3J0cy5IVE1MID0gZ2V0SW52ZXJzZShpbnZlcnNlSFRNTCwgaHRtbFJlcGxhY2VyKTtcblxuZnVuY3Rpb24gZ2V0SW52ZXJzZU9iaihvYmope1xuXHRyZXR1cm4gT2JqZWN0LmtleXMob2JqKS5zb3J0KCkucmVkdWNlKGZ1bmN0aW9uKGludmVyc2UsIG5hbWUpe1xuXHRcdGludmVyc2Vbb2JqW25hbWVdXSA9IFwiJlwiICsgbmFtZSArIFwiO1wiO1xuXHRcdHJldHVybiBpbnZlcnNlO1xuXHR9LCB7fSk7XG59XG5cbmZ1bmN0aW9uIGdldEludmVyc2VSZXBsYWNlcihpbnZlcnNlKXtcblx0dmFyIHNpbmdsZSA9IFtdLFxuXHQgICAgbXVsdGlwbGUgPSBbXTtcblxuXHRPYmplY3Qua2V5cyhpbnZlcnNlKS5mb3JFYWNoKGZ1bmN0aW9uKGspe1xuXHRcdGlmKGsubGVuZ3RoID09PSAxKXtcblx0XHRcdHNpbmdsZS5wdXNoKFwiXFxcXFwiICsgayk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdG11bHRpcGxlLnB1c2goayk7XG5cdFx0fVxuXHR9KTtcblxuXHQvL1RPRE8gYWRkIHJhbmdlc1xuXHRtdWx0aXBsZS51bnNoaWZ0KFwiW1wiICsgc2luZ2xlLmpvaW4oXCJcIikgKyBcIl1cIik7XG5cblx0cmV0dXJuIG5ldyBSZWdFeHAobXVsdGlwbGUuam9pbihcInxcIiksIFwiZ1wiKTtcbn1cblxudmFyIHJlX25vbkFTQ0lJID0gL1teXFwwLVxceDdGXS9nLFxuICAgIHJlX2FzdHJhbFN5bWJvbHMgPSAvW1xcdUQ4MDAtXFx1REJGRl1bXFx1REMwMC1cXHVERkZGXS9nO1xuXG5mdW5jdGlvbiBzaW5nbGVDaGFyUmVwbGFjZXIoYyl7XG5cdHJldHVybiBcIiYjeFwiICsgYy5jaGFyQ29kZUF0KDApLnRvU3RyaW5nKDE2KS50b1VwcGVyQ2FzZSgpICsgXCI7XCI7XG59XG5cbmZ1bmN0aW9uIGFzdHJhbFJlcGxhY2VyKGMpe1xuXHQvLyBodHRwOi8vbWF0aGlhc2J5bmVucy5iZS9ub3Rlcy9qYXZhc2NyaXB0LWVuY29kaW5nI3N1cnJvZ2F0ZS1mb3JtdWxhZVxuXHR2YXIgaGlnaCA9IGMuY2hhckNvZGVBdCgwKTtcblx0dmFyIGxvdyAgPSBjLmNoYXJDb2RlQXQoMSk7XG5cdHZhciBjb2RlUG9pbnQgPSAoaGlnaCAtIDB4RDgwMCkgKiAweDQwMCArIGxvdyAtIDB4REMwMCArIDB4MTAwMDA7XG5cdHJldHVybiBcIiYjeFwiICsgY29kZVBvaW50LnRvU3RyaW5nKDE2KS50b1VwcGVyQ2FzZSgpICsgXCI7XCI7XG59XG5cbmZ1bmN0aW9uIGdldEludmVyc2UoaW52ZXJzZSwgcmUpe1xuXHRmdW5jdGlvbiBmdW5jKG5hbWUpe1xuXHRcdHJldHVybiBpbnZlcnNlW25hbWVdO1xuXHR9XG5cblx0cmV0dXJuIGZ1bmN0aW9uKGRhdGEpe1xuXHRcdHJldHVybiBkYXRhXG5cdFx0XHRcdC5yZXBsYWNlKHJlLCBmdW5jKVxuXHRcdFx0XHQucmVwbGFjZShyZV9hc3RyYWxTeW1ib2xzLCBhc3RyYWxSZXBsYWNlcilcblx0XHRcdFx0LnJlcGxhY2UocmVfbm9uQVNDSUksIHNpbmdsZUNoYXJSZXBsYWNlcik7XG5cdH07XG59XG5cbnZhciByZV94bWxDaGFycyA9IGdldEludmVyc2VSZXBsYWNlcihpbnZlcnNlWE1MKTtcblxuZnVuY3Rpb24gZXNjYXBlWE1MKGRhdGEpe1xuXHRyZXR1cm4gZGF0YVxuXHRcdFx0LnJlcGxhY2UocmVfeG1sQ2hhcnMsIHNpbmdsZUNoYXJSZXBsYWNlcilcblx0XHRcdC5yZXBsYWNlKHJlX2FzdHJhbFN5bWJvbHMsIGFzdHJhbFJlcGxhY2VyKVxuXHRcdFx0LnJlcGxhY2UocmVfbm9uQVNDSUksIHNpbmdsZUNoYXJSZXBsYWNlcik7XG59XG5cbmV4cG9ydHMuZXNjYXBlID0gZXNjYXBlWE1MO1xuIiwibW9kdWxlLmV4cG9ydHM9e1wiMFwiOjY1NTMzLFwiMTI4XCI6ODM2NCxcIjEzMFwiOjgyMTgsXCIxMzFcIjo0MDIsXCIxMzJcIjo4MjIyLFwiMTMzXCI6ODIzMCxcIjEzNFwiOjgyMjQsXCIxMzVcIjo4MjI1LFwiMTM2XCI6NzEwLFwiMTM3XCI6ODI0MCxcIjEzOFwiOjM1MixcIjEzOVwiOjgyNDksXCIxNDBcIjozMzgsXCIxNDJcIjozODEsXCIxNDVcIjo4MjE2LFwiMTQ2XCI6ODIxNyxcIjE0N1wiOjgyMjAsXCIxNDhcIjo4MjIxLFwiMTQ5XCI6ODIyNixcIjE1MFwiOjgyMTEsXCIxNTFcIjo4MjEyLFwiMTUyXCI6NzMyLFwiMTUzXCI6ODQ4MixcIjE1NFwiOjM1MyxcIjE1NVwiOjgyNTAsXCIxNTZcIjozMzksXCIxNThcIjozODIsXCIxNTlcIjozNzZ9IiwibW9kdWxlLmV4cG9ydHM9e1wiQWFjdXRlXCI6XCJcXHUwMEMxXCIsXCJhYWN1dGVcIjpcIlxcdTAwRTFcIixcIkFicmV2ZVwiOlwiXFx1MDEwMlwiLFwiYWJyZXZlXCI6XCJcXHUwMTAzXCIsXCJhY1wiOlwiXFx1MjIzRVwiLFwiYWNkXCI6XCJcXHUyMjNGXCIsXCJhY0VcIjpcIlxcdTIyM0VcXHUwMzMzXCIsXCJBY2lyY1wiOlwiXFx1MDBDMlwiLFwiYWNpcmNcIjpcIlxcdTAwRTJcIixcImFjdXRlXCI6XCJcXHUwMEI0XCIsXCJBY3lcIjpcIlxcdTA0MTBcIixcImFjeVwiOlwiXFx1MDQzMFwiLFwiQUVsaWdcIjpcIlxcdTAwQzZcIixcImFlbGlnXCI6XCJcXHUwMEU2XCIsXCJhZlwiOlwiXFx1MjA2MVwiLFwiQWZyXCI6XCJcXHVEODM1XFx1REQwNFwiLFwiYWZyXCI6XCJcXHVEODM1XFx1REQxRVwiLFwiQWdyYXZlXCI6XCJcXHUwMEMwXCIsXCJhZ3JhdmVcIjpcIlxcdTAwRTBcIixcImFsZWZzeW1cIjpcIlxcdTIxMzVcIixcImFsZXBoXCI6XCJcXHUyMTM1XCIsXCJBbHBoYVwiOlwiXFx1MDM5MVwiLFwiYWxwaGFcIjpcIlxcdTAzQjFcIixcIkFtYWNyXCI6XCJcXHUwMTAwXCIsXCJhbWFjclwiOlwiXFx1MDEwMVwiLFwiYW1hbGdcIjpcIlxcdTJBM0ZcIixcImFtcFwiOlwiJlwiLFwiQU1QXCI6XCImXCIsXCJhbmRhbmRcIjpcIlxcdTJBNTVcIixcIkFuZFwiOlwiXFx1MkE1M1wiLFwiYW5kXCI6XCJcXHUyMjI3XCIsXCJhbmRkXCI6XCJcXHUyQTVDXCIsXCJhbmRzbG9wZVwiOlwiXFx1MkE1OFwiLFwiYW5kdlwiOlwiXFx1MkE1QVwiLFwiYW5nXCI6XCJcXHUyMjIwXCIsXCJhbmdlXCI6XCJcXHUyOUE0XCIsXCJhbmdsZVwiOlwiXFx1MjIyMFwiLFwiYW5nbXNkYWFcIjpcIlxcdTI5QThcIixcImFuZ21zZGFiXCI6XCJcXHUyOUE5XCIsXCJhbmdtc2RhY1wiOlwiXFx1MjlBQVwiLFwiYW5nbXNkYWRcIjpcIlxcdTI5QUJcIixcImFuZ21zZGFlXCI6XCJcXHUyOUFDXCIsXCJhbmdtc2RhZlwiOlwiXFx1MjlBRFwiLFwiYW5nbXNkYWdcIjpcIlxcdTI5QUVcIixcImFuZ21zZGFoXCI6XCJcXHUyOUFGXCIsXCJhbmdtc2RcIjpcIlxcdTIyMjFcIixcImFuZ3J0XCI6XCJcXHUyMjFGXCIsXCJhbmdydHZiXCI6XCJcXHUyMkJFXCIsXCJhbmdydHZiZFwiOlwiXFx1Mjk5RFwiLFwiYW5nc3BoXCI6XCJcXHUyMjIyXCIsXCJhbmdzdFwiOlwiXFx1MDBDNVwiLFwiYW5nemFyclwiOlwiXFx1MjM3Q1wiLFwiQW9nb25cIjpcIlxcdTAxMDRcIixcImFvZ29uXCI6XCJcXHUwMTA1XCIsXCJBb3BmXCI6XCJcXHVEODM1XFx1REQzOFwiLFwiYW9wZlwiOlwiXFx1RDgzNVxcdURENTJcIixcImFwYWNpclwiOlwiXFx1MkE2RlwiLFwiYXBcIjpcIlxcdTIyNDhcIixcImFwRVwiOlwiXFx1MkE3MFwiLFwiYXBlXCI6XCJcXHUyMjRBXCIsXCJhcGlkXCI6XCJcXHUyMjRCXCIsXCJhcG9zXCI6XCInXCIsXCJBcHBseUZ1bmN0aW9uXCI6XCJcXHUyMDYxXCIsXCJhcHByb3hcIjpcIlxcdTIyNDhcIixcImFwcHJveGVxXCI6XCJcXHUyMjRBXCIsXCJBcmluZ1wiOlwiXFx1MDBDNVwiLFwiYXJpbmdcIjpcIlxcdTAwRTVcIixcIkFzY3JcIjpcIlxcdUQ4MzVcXHVEQzlDXCIsXCJhc2NyXCI6XCJcXHVEODM1XFx1RENCNlwiLFwiQXNzaWduXCI6XCJcXHUyMjU0XCIsXCJhc3RcIjpcIipcIixcImFzeW1wXCI6XCJcXHUyMjQ4XCIsXCJhc3ltcGVxXCI6XCJcXHUyMjREXCIsXCJBdGlsZGVcIjpcIlxcdTAwQzNcIixcImF0aWxkZVwiOlwiXFx1MDBFM1wiLFwiQXVtbFwiOlwiXFx1MDBDNFwiLFwiYXVtbFwiOlwiXFx1MDBFNFwiLFwiYXdjb25pbnRcIjpcIlxcdTIyMzNcIixcImF3aW50XCI6XCJcXHUyQTExXCIsXCJiYWNrY29uZ1wiOlwiXFx1MjI0Q1wiLFwiYmFja2Vwc2lsb25cIjpcIlxcdTAzRjZcIixcImJhY2twcmltZVwiOlwiXFx1MjAzNVwiLFwiYmFja3NpbVwiOlwiXFx1MjIzRFwiLFwiYmFja3NpbWVxXCI6XCJcXHUyMkNEXCIsXCJCYWNrc2xhc2hcIjpcIlxcdTIyMTZcIixcIkJhcnZcIjpcIlxcdTJBRTdcIixcImJhcnZlZVwiOlwiXFx1MjJCRFwiLFwiYmFyd2VkXCI6XCJcXHUyMzA1XCIsXCJCYXJ3ZWRcIjpcIlxcdTIzMDZcIixcImJhcndlZGdlXCI6XCJcXHUyMzA1XCIsXCJiYnJrXCI6XCJcXHUyM0I1XCIsXCJiYnJrdGJya1wiOlwiXFx1MjNCNlwiLFwiYmNvbmdcIjpcIlxcdTIyNENcIixcIkJjeVwiOlwiXFx1MDQxMVwiLFwiYmN5XCI6XCJcXHUwNDMxXCIsXCJiZHF1b1wiOlwiXFx1MjAxRVwiLFwiYmVjYXVzXCI6XCJcXHUyMjM1XCIsXCJiZWNhdXNlXCI6XCJcXHUyMjM1XCIsXCJCZWNhdXNlXCI6XCJcXHUyMjM1XCIsXCJiZW1wdHl2XCI6XCJcXHUyOUIwXCIsXCJiZXBzaVwiOlwiXFx1MDNGNlwiLFwiYmVybm91XCI6XCJcXHUyMTJDXCIsXCJCZXJub3VsbGlzXCI6XCJcXHUyMTJDXCIsXCJCZXRhXCI6XCJcXHUwMzkyXCIsXCJiZXRhXCI6XCJcXHUwM0IyXCIsXCJiZXRoXCI6XCJcXHUyMTM2XCIsXCJiZXR3ZWVuXCI6XCJcXHUyMjZDXCIsXCJCZnJcIjpcIlxcdUQ4MzVcXHVERDA1XCIsXCJiZnJcIjpcIlxcdUQ4MzVcXHVERDFGXCIsXCJiaWdjYXBcIjpcIlxcdTIyQzJcIixcImJpZ2NpcmNcIjpcIlxcdTI1RUZcIixcImJpZ2N1cFwiOlwiXFx1MjJDM1wiLFwiYmlnb2RvdFwiOlwiXFx1MkEwMFwiLFwiYmlnb3BsdXNcIjpcIlxcdTJBMDFcIixcImJpZ290aW1lc1wiOlwiXFx1MkEwMlwiLFwiYmlnc3FjdXBcIjpcIlxcdTJBMDZcIixcImJpZ3N0YXJcIjpcIlxcdTI2MDVcIixcImJpZ3RyaWFuZ2xlZG93blwiOlwiXFx1MjVCRFwiLFwiYmlndHJpYW5nbGV1cFwiOlwiXFx1MjVCM1wiLFwiYmlndXBsdXNcIjpcIlxcdTJBMDRcIixcImJpZ3ZlZVwiOlwiXFx1MjJDMVwiLFwiYmlnd2VkZ2VcIjpcIlxcdTIyQzBcIixcImJrYXJvd1wiOlwiXFx1MjkwRFwiLFwiYmxhY2tsb3plbmdlXCI6XCJcXHUyOUVCXCIsXCJibGFja3NxdWFyZVwiOlwiXFx1MjVBQVwiLFwiYmxhY2t0cmlhbmdsZVwiOlwiXFx1MjVCNFwiLFwiYmxhY2t0cmlhbmdsZWRvd25cIjpcIlxcdTI1QkVcIixcImJsYWNrdHJpYW5nbGVsZWZ0XCI6XCJcXHUyNUMyXCIsXCJibGFja3RyaWFuZ2xlcmlnaHRcIjpcIlxcdTI1QjhcIixcImJsYW5rXCI6XCJcXHUyNDIzXCIsXCJibGsxMlwiOlwiXFx1MjU5MlwiLFwiYmxrMTRcIjpcIlxcdTI1OTFcIixcImJsazM0XCI6XCJcXHUyNTkzXCIsXCJibG9ja1wiOlwiXFx1MjU4OFwiLFwiYm5lXCI6XCI9XFx1MjBFNVwiLFwiYm5lcXVpdlwiOlwiXFx1MjI2MVxcdTIwRTVcIixcImJOb3RcIjpcIlxcdTJBRURcIixcImJub3RcIjpcIlxcdTIzMTBcIixcIkJvcGZcIjpcIlxcdUQ4MzVcXHVERDM5XCIsXCJib3BmXCI6XCJcXHVEODM1XFx1REQ1M1wiLFwiYm90XCI6XCJcXHUyMkE1XCIsXCJib3R0b21cIjpcIlxcdTIyQTVcIixcImJvd3RpZVwiOlwiXFx1MjJDOFwiLFwiYm94Ym94XCI6XCJcXHUyOUM5XCIsXCJib3hkbFwiOlwiXFx1MjUxMFwiLFwiYm94ZExcIjpcIlxcdTI1NTVcIixcImJveERsXCI6XCJcXHUyNTU2XCIsXCJib3hETFwiOlwiXFx1MjU1N1wiLFwiYm94ZHJcIjpcIlxcdTI1MENcIixcImJveGRSXCI6XCJcXHUyNTUyXCIsXCJib3hEclwiOlwiXFx1MjU1M1wiLFwiYm94RFJcIjpcIlxcdTI1NTRcIixcImJveGhcIjpcIlxcdTI1MDBcIixcImJveEhcIjpcIlxcdTI1NTBcIixcImJveGhkXCI6XCJcXHUyNTJDXCIsXCJib3hIZFwiOlwiXFx1MjU2NFwiLFwiYm94aERcIjpcIlxcdTI1NjVcIixcImJveEhEXCI6XCJcXHUyNTY2XCIsXCJib3hodVwiOlwiXFx1MjUzNFwiLFwiYm94SHVcIjpcIlxcdTI1NjdcIixcImJveGhVXCI6XCJcXHUyNTY4XCIsXCJib3hIVVwiOlwiXFx1MjU2OVwiLFwiYm94bWludXNcIjpcIlxcdTIyOUZcIixcImJveHBsdXNcIjpcIlxcdTIyOUVcIixcImJveHRpbWVzXCI6XCJcXHUyMkEwXCIsXCJib3h1bFwiOlwiXFx1MjUxOFwiLFwiYm94dUxcIjpcIlxcdTI1NUJcIixcImJveFVsXCI6XCJcXHUyNTVDXCIsXCJib3hVTFwiOlwiXFx1MjU1RFwiLFwiYm94dXJcIjpcIlxcdTI1MTRcIixcImJveHVSXCI6XCJcXHUyNTU4XCIsXCJib3hVclwiOlwiXFx1MjU1OVwiLFwiYm94VVJcIjpcIlxcdTI1NUFcIixcImJveHZcIjpcIlxcdTI1MDJcIixcImJveFZcIjpcIlxcdTI1NTFcIixcImJveHZoXCI6XCJcXHUyNTNDXCIsXCJib3h2SFwiOlwiXFx1MjU2QVwiLFwiYm94VmhcIjpcIlxcdTI1NkJcIixcImJveFZIXCI6XCJcXHUyNTZDXCIsXCJib3h2bFwiOlwiXFx1MjUyNFwiLFwiYm94dkxcIjpcIlxcdTI1NjFcIixcImJveFZsXCI6XCJcXHUyNTYyXCIsXCJib3hWTFwiOlwiXFx1MjU2M1wiLFwiYm94dnJcIjpcIlxcdTI1MUNcIixcImJveHZSXCI6XCJcXHUyNTVFXCIsXCJib3hWclwiOlwiXFx1MjU1RlwiLFwiYm94VlJcIjpcIlxcdTI1NjBcIixcImJwcmltZVwiOlwiXFx1MjAzNVwiLFwiYnJldmVcIjpcIlxcdTAyRDhcIixcIkJyZXZlXCI6XCJcXHUwMkQ4XCIsXCJicnZiYXJcIjpcIlxcdTAwQTZcIixcImJzY3JcIjpcIlxcdUQ4MzVcXHVEQ0I3XCIsXCJCc2NyXCI6XCJcXHUyMTJDXCIsXCJic2VtaVwiOlwiXFx1MjA0RlwiLFwiYnNpbVwiOlwiXFx1MjIzRFwiLFwiYnNpbWVcIjpcIlxcdTIyQ0RcIixcImJzb2xiXCI6XCJcXHUyOUM1XCIsXCJic29sXCI6XCJcXFxcXCIsXCJic29saHN1YlwiOlwiXFx1MjdDOFwiLFwiYnVsbFwiOlwiXFx1MjAyMlwiLFwiYnVsbGV0XCI6XCJcXHUyMDIyXCIsXCJidW1wXCI6XCJcXHUyMjRFXCIsXCJidW1wRVwiOlwiXFx1MkFBRVwiLFwiYnVtcGVcIjpcIlxcdTIyNEZcIixcIkJ1bXBlcVwiOlwiXFx1MjI0RVwiLFwiYnVtcGVxXCI6XCJcXHUyMjRGXCIsXCJDYWN1dGVcIjpcIlxcdTAxMDZcIixcImNhY3V0ZVwiOlwiXFx1MDEwN1wiLFwiY2FwYW5kXCI6XCJcXHUyQTQ0XCIsXCJjYXBicmN1cFwiOlwiXFx1MkE0OVwiLFwiY2FwY2FwXCI6XCJcXHUyQTRCXCIsXCJjYXBcIjpcIlxcdTIyMjlcIixcIkNhcFwiOlwiXFx1MjJEMlwiLFwiY2FwY3VwXCI6XCJcXHUyQTQ3XCIsXCJjYXBkb3RcIjpcIlxcdTJBNDBcIixcIkNhcGl0YWxEaWZmZXJlbnRpYWxEXCI6XCJcXHUyMTQ1XCIsXCJjYXBzXCI6XCJcXHUyMjI5XFx1RkUwMFwiLFwiY2FyZXRcIjpcIlxcdTIwNDFcIixcImNhcm9uXCI6XCJcXHUwMkM3XCIsXCJDYXlsZXlzXCI6XCJcXHUyMTJEXCIsXCJjY2Fwc1wiOlwiXFx1MkE0RFwiLFwiQ2Nhcm9uXCI6XCJcXHUwMTBDXCIsXCJjY2Fyb25cIjpcIlxcdTAxMERcIixcIkNjZWRpbFwiOlwiXFx1MDBDN1wiLFwiY2NlZGlsXCI6XCJcXHUwMEU3XCIsXCJDY2lyY1wiOlwiXFx1MDEwOFwiLFwiY2NpcmNcIjpcIlxcdTAxMDlcIixcIkNjb25pbnRcIjpcIlxcdTIyMzBcIixcImNjdXBzXCI6XCJcXHUyQTRDXCIsXCJjY3Vwc3NtXCI6XCJcXHUyQTUwXCIsXCJDZG90XCI6XCJcXHUwMTBBXCIsXCJjZG90XCI6XCJcXHUwMTBCXCIsXCJjZWRpbFwiOlwiXFx1MDBCOFwiLFwiQ2VkaWxsYVwiOlwiXFx1MDBCOFwiLFwiY2VtcHR5dlwiOlwiXFx1MjlCMlwiLFwiY2VudFwiOlwiXFx1MDBBMlwiLFwiY2VudGVyZG90XCI6XCJcXHUwMEI3XCIsXCJDZW50ZXJEb3RcIjpcIlxcdTAwQjdcIixcImNmclwiOlwiXFx1RDgzNVxcdUREMjBcIixcIkNmclwiOlwiXFx1MjEyRFwiLFwiQ0hjeVwiOlwiXFx1MDQyN1wiLFwiY2hjeVwiOlwiXFx1MDQ0N1wiLFwiY2hlY2tcIjpcIlxcdTI3MTNcIixcImNoZWNrbWFya1wiOlwiXFx1MjcxM1wiLFwiQ2hpXCI6XCJcXHUwM0E3XCIsXCJjaGlcIjpcIlxcdTAzQzdcIixcImNpcmNcIjpcIlxcdTAyQzZcIixcImNpcmNlcVwiOlwiXFx1MjI1N1wiLFwiY2lyY2xlYXJyb3dsZWZ0XCI6XCJcXHUyMUJBXCIsXCJjaXJjbGVhcnJvd3JpZ2h0XCI6XCJcXHUyMUJCXCIsXCJjaXJjbGVkYXN0XCI6XCJcXHUyMjlCXCIsXCJjaXJjbGVkY2lyY1wiOlwiXFx1MjI5QVwiLFwiY2lyY2xlZGRhc2hcIjpcIlxcdTIyOURcIixcIkNpcmNsZURvdFwiOlwiXFx1MjI5OVwiLFwiY2lyY2xlZFJcIjpcIlxcdTAwQUVcIixcImNpcmNsZWRTXCI6XCJcXHUyNEM4XCIsXCJDaXJjbGVNaW51c1wiOlwiXFx1MjI5NlwiLFwiQ2lyY2xlUGx1c1wiOlwiXFx1MjI5NVwiLFwiQ2lyY2xlVGltZXNcIjpcIlxcdTIyOTdcIixcImNpclwiOlwiXFx1MjVDQlwiLFwiY2lyRVwiOlwiXFx1MjlDM1wiLFwiY2lyZVwiOlwiXFx1MjI1N1wiLFwiY2lyZm5pbnRcIjpcIlxcdTJBMTBcIixcImNpcm1pZFwiOlwiXFx1MkFFRlwiLFwiY2lyc2NpclwiOlwiXFx1MjlDMlwiLFwiQ2xvY2t3aXNlQ29udG91ckludGVncmFsXCI6XCJcXHUyMjMyXCIsXCJDbG9zZUN1cmx5RG91YmxlUXVvdGVcIjpcIlxcdTIwMURcIixcIkNsb3NlQ3VybHlRdW90ZVwiOlwiXFx1MjAxOVwiLFwiY2x1YnNcIjpcIlxcdTI2NjNcIixcImNsdWJzdWl0XCI6XCJcXHUyNjYzXCIsXCJjb2xvblwiOlwiOlwiLFwiQ29sb25cIjpcIlxcdTIyMzdcIixcIkNvbG9uZVwiOlwiXFx1MkE3NFwiLFwiY29sb25lXCI6XCJcXHUyMjU0XCIsXCJjb2xvbmVxXCI6XCJcXHUyMjU0XCIsXCJjb21tYVwiOlwiLFwiLFwiY29tbWF0XCI6XCJAXCIsXCJjb21wXCI6XCJcXHUyMjAxXCIsXCJjb21wZm5cIjpcIlxcdTIyMThcIixcImNvbXBsZW1lbnRcIjpcIlxcdTIyMDFcIixcImNvbXBsZXhlc1wiOlwiXFx1MjEwMlwiLFwiY29uZ1wiOlwiXFx1MjI0NVwiLFwiY29uZ2RvdFwiOlwiXFx1MkE2RFwiLFwiQ29uZ3J1ZW50XCI6XCJcXHUyMjYxXCIsXCJjb25pbnRcIjpcIlxcdTIyMkVcIixcIkNvbmludFwiOlwiXFx1MjIyRlwiLFwiQ29udG91ckludGVncmFsXCI6XCJcXHUyMjJFXCIsXCJjb3BmXCI6XCJcXHVEODM1XFx1REQ1NFwiLFwiQ29wZlwiOlwiXFx1MjEwMlwiLFwiY29wcm9kXCI6XCJcXHUyMjEwXCIsXCJDb3Byb2R1Y3RcIjpcIlxcdTIyMTBcIixcImNvcHlcIjpcIlxcdTAwQTlcIixcIkNPUFlcIjpcIlxcdTAwQTlcIixcImNvcHlzclwiOlwiXFx1MjExN1wiLFwiQ291bnRlckNsb2Nrd2lzZUNvbnRvdXJJbnRlZ3JhbFwiOlwiXFx1MjIzM1wiLFwiY3JhcnJcIjpcIlxcdTIxQjVcIixcImNyb3NzXCI6XCJcXHUyNzE3XCIsXCJDcm9zc1wiOlwiXFx1MkEyRlwiLFwiQ3NjclwiOlwiXFx1RDgzNVxcdURDOUVcIixcImNzY3JcIjpcIlxcdUQ4MzVcXHVEQ0I4XCIsXCJjc3ViXCI6XCJcXHUyQUNGXCIsXCJjc3ViZVwiOlwiXFx1MkFEMVwiLFwiY3N1cFwiOlwiXFx1MkFEMFwiLFwiY3N1cGVcIjpcIlxcdTJBRDJcIixcImN0ZG90XCI6XCJcXHUyMkVGXCIsXCJjdWRhcnJsXCI6XCJcXHUyOTM4XCIsXCJjdWRhcnJyXCI6XCJcXHUyOTM1XCIsXCJjdWVwclwiOlwiXFx1MjJERVwiLFwiY3Vlc2NcIjpcIlxcdTIyREZcIixcImN1bGFyclwiOlwiXFx1MjFCNlwiLFwiY3VsYXJycFwiOlwiXFx1MjkzRFwiLFwiY3VwYnJjYXBcIjpcIlxcdTJBNDhcIixcImN1cGNhcFwiOlwiXFx1MkE0NlwiLFwiQ3VwQ2FwXCI6XCJcXHUyMjREXCIsXCJjdXBcIjpcIlxcdTIyMkFcIixcIkN1cFwiOlwiXFx1MjJEM1wiLFwiY3VwY3VwXCI6XCJcXHUyQTRBXCIsXCJjdXBkb3RcIjpcIlxcdTIyOERcIixcImN1cG9yXCI6XCJcXHUyQTQ1XCIsXCJjdXBzXCI6XCJcXHUyMjJBXFx1RkUwMFwiLFwiY3VyYXJyXCI6XCJcXHUyMUI3XCIsXCJjdXJhcnJtXCI6XCJcXHUyOTNDXCIsXCJjdXJseWVxcHJlY1wiOlwiXFx1MjJERVwiLFwiY3VybHllcXN1Y2NcIjpcIlxcdTIyREZcIixcImN1cmx5dmVlXCI6XCJcXHUyMkNFXCIsXCJjdXJseXdlZGdlXCI6XCJcXHUyMkNGXCIsXCJjdXJyZW5cIjpcIlxcdTAwQTRcIixcImN1cnZlYXJyb3dsZWZ0XCI6XCJcXHUyMUI2XCIsXCJjdXJ2ZWFycm93cmlnaHRcIjpcIlxcdTIxQjdcIixcImN1dmVlXCI6XCJcXHUyMkNFXCIsXCJjdXdlZFwiOlwiXFx1MjJDRlwiLFwiY3djb25pbnRcIjpcIlxcdTIyMzJcIixcImN3aW50XCI6XCJcXHUyMjMxXCIsXCJjeWxjdHlcIjpcIlxcdTIzMkRcIixcImRhZ2dlclwiOlwiXFx1MjAyMFwiLFwiRGFnZ2VyXCI6XCJcXHUyMDIxXCIsXCJkYWxldGhcIjpcIlxcdTIxMzhcIixcImRhcnJcIjpcIlxcdTIxOTNcIixcIkRhcnJcIjpcIlxcdTIxQTFcIixcImRBcnJcIjpcIlxcdTIxRDNcIixcImRhc2hcIjpcIlxcdTIwMTBcIixcIkRhc2h2XCI6XCJcXHUyQUU0XCIsXCJkYXNodlwiOlwiXFx1MjJBM1wiLFwiZGJrYXJvd1wiOlwiXFx1MjkwRlwiLFwiZGJsYWNcIjpcIlxcdTAyRERcIixcIkRjYXJvblwiOlwiXFx1MDEwRVwiLFwiZGNhcm9uXCI6XCJcXHUwMTBGXCIsXCJEY3lcIjpcIlxcdTA0MTRcIixcImRjeVwiOlwiXFx1MDQzNFwiLFwiZGRhZ2dlclwiOlwiXFx1MjAyMVwiLFwiZGRhcnJcIjpcIlxcdTIxQ0FcIixcIkREXCI6XCJcXHUyMTQ1XCIsXCJkZFwiOlwiXFx1MjE0NlwiLFwiRERvdHJhaGRcIjpcIlxcdTI5MTFcIixcImRkb3RzZXFcIjpcIlxcdTJBNzdcIixcImRlZ1wiOlwiXFx1MDBCMFwiLFwiRGVsXCI6XCJcXHUyMjA3XCIsXCJEZWx0YVwiOlwiXFx1MDM5NFwiLFwiZGVsdGFcIjpcIlxcdTAzQjRcIixcImRlbXB0eXZcIjpcIlxcdTI5QjFcIixcImRmaXNodFwiOlwiXFx1Mjk3RlwiLFwiRGZyXCI6XCJcXHVEODM1XFx1REQwN1wiLFwiZGZyXCI6XCJcXHVEODM1XFx1REQyMVwiLFwiZEhhclwiOlwiXFx1Mjk2NVwiLFwiZGhhcmxcIjpcIlxcdTIxQzNcIixcImRoYXJyXCI6XCJcXHUyMUMyXCIsXCJEaWFjcml0aWNhbEFjdXRlXCI6XCJcXHUwMEI0XCIsXCJEaWFjcml0aWNhbERvdFwiOlwiXFx1MDJEOVwiLFwiRGlhY3JpdGljYWxEb3VibGVBY3V0ZVwiOlwiXFx1MDJERFwiLFwiRGlhY3JpdGljYWxHcmF2ZVwiOlwiYFwiLFwiRGlhY3JpdGljYWxUaWxkZVwiOlwiXFx1MDJEQ1wiLFwiZGlhbVwiOlwiXFx1MjJDNFwiLFwiZGlhbW9uZFwiOlwiXFx1MjJDNFwiLFwiRGlhbW9uZFwiOlwiXFx1MjJDNFwiLFwiZGlhbW9uZHN1aXRcIjpcIlxcdTI2NjZcIixcImRpYW1zXCI6XCJcXHUyNjY2XCIsXCJkaWVcIjpcIlxcdTAwQThcIixcIkRpZmZlcmVudGlhbERcIjpcIlxcdTIxNDZcIixcImRpZ2FtbWFcIjpcIlxcdTAzRERcIixcImRpc2luXCI6XCJcXHUyMkYyXCIsXCJkaXZcIjpcIlxcdTAwRjdcIixcImRpdmlkZVwiOlwiXFx1MDBGN1wiLFwiZGl2aWRlb250aW1lc1wiOlwiXFx1MjJDN1wiLFwiZGl2b254XCI6XCJcXHUyMkM3XCIsXCJESmN5XCI6XCJcXHUwNDAyXCIsXCJkamN5XCI6XCJcXHUwNDUyXCIsXCJkbGNvcm5cIjpcIlxcdTIzMUVcIixcImRsY3JvcFwiOlwiXFx1MjMwRFwiLFwiZG9sbGFyXCI6XCIkXCIsXCJEb3BmXCI6XCJcXHVEODM1XFx1REQzQlwiLFwiZG9wZlwiOlwiXFx1RDgzNVxcdURENTVcIixcIkRvdFwiOlwiXFx1MDBBOFwiLFwiZG90XCI6XCJcXHUwMkQ5XCIsXCJEb3REb3RcIjpcIlxcdTIwRENcIixcImRvdGVxXCI6XCJcXHUyMjUwXCIsXCJkb3RlcWRvdFwiOlwiXFx1MjI1MVwiLFwiRG90RXF1YWxcIjpcIlxcdTIyNTBcIixcImRvdG1pbnVzXCI6XCJcXHUyMjM4XCIsXCJkb3RwbHVzXCI6XCJcXHUyMjE0XCIsXCJkb3RzcXVhcmVcIjpcIlxcdTIyQTFcIixcImRvdWJsZWJhcndlZGdlXCI6XCJcXHUyMzA2XCIsXCJEb3VibGVDb250b3VySW50ZWdyYWxcIjpcIlxcdTIyMkZcIixcIkRvdWJsZURvdFwiOlwiXFx1MDBBOFwiLFwiRG91YmxlRG93bkFycm93XCI6XCJcXHUyMUQzXCIsXCJEb3VibGVMZWZ0QXJyb3dcIjpcIlxcdTIxRDBcIixcIkRvdWJsZUxlZnRSaWdodEFycm93XCI6XCJcXHUyMUQ0XCIsXCJEb3VibGVMZWZ0VGVlXCI6XCJcXHUyQUU0XCIsXCJEb3VibGVMb25nTGVmdEFycm93XCI6XCJcXHUyN0Y4XCIsXCJEb3VibGVMb25nTGVmdFJpZ2h0QXJyb3dcIjpcIlxcdTI3RkFcIixcIkRvdWJsZUxvbmdSaWdodEFycm93XCI6XCJcXHUyN0Y5XCIsXCJEb3VibGVSaWdodEFycm93XCI6XCJcXHUyMUQyXCIsXCJEb3VibGVSaWdodFRlZVwiOlwiXFx1MjJBOFwiLFwiRG91YmxlVXBBcnJvd1wiOlwiXFx1MjFEMVwiLFwiRG91YmxlVXBEb3duQXJyb3dcIjpcIlxcdTIxRDVcIixcIkRvdWJsZVZlcnRpY2FsQmFyXCI6XCJcXHUyMjI1XCIsXCJEb3duQXJyb3dCYXJcIjpcIlxcdTI5MTNcIixcImRvd25hcnJvd1wiOlwiXFx1MjE5M1wiLFwiRG93bkFycm93XCI6XCJcXHUyMTkzXCIsXCJEb3duYXJyb3dcIjpcIlxcdTIxRDNcIixcIkRvd25BcnJvd1VwQXJyb3dcIjpcIlxcdTIxRjVcIixcIkRvd25CcmV2ZVwiOlwiXFx1MDMxMVwiLFwiZG93bmRvd25hcnJvd3NcIjpcIlxcdTIxQ0FcIixcImRvd25oYXJwb29ubGVmdFwiOlwiXFx1MjFDM1wiLFwiZG93bmhhcnBvb25yaWdodFwiOlwiXFx1MjFDMlwiLFwiRG93bkxlZnRSaWdodFZlY3RvclwiOlwiXFx1Mjk1MFwiLFwiRG93bkxlZnRUZWVWZWN0b3JcIjpcIlxcdTI5NUVcIixcIkRvd25MZWZ0VmVjdG9yQmFyXCI6XCJcXHUyOTU2XCIsXCJEb3duTGVmdFZlY3RvclwiOlwiXFx1MjFCRFwiLFwiRG93blJpZ2h0VGVlVmVjdG9yXCI6XCJcXHUyOTVGXCIsXCJEb3duUmlnaHRWZWN0b3JCYXJcIjpcIlxcdTI5NTdcIixcIkRvd25SaWdodFZlY3RvclwiOlwiXFx1MjFDMVwiLFwiRG93blRlZUFycm93XCI6XCJcXHUyMUE3XCIsXCJEb3duVGVlXCI6XCJcXHUyMkE0XCIsXCJkcmJrYXJvd1wiOlwiXFx1MjkxMFwiLFwiZHJjb3JuXCI6XCJcXHUyMzFGXCIsXCJkcmNyb3BcIjpcIlxcdTIzMENcIixcIkRzY3JcIjpcIlxcdUQ4MzVcXHVEQzlGXCIsXCJkc2NyXCI6XCJcXHVEODM1XFx1RENCOVwiLFwiRFNjeVwiOlwiXFx1MDQwNVwiLFwiZHNjeVwiOlwiXFx1MDQ1NVwiLFwiZHNvbFwiOlwiXFx1MjlGNlwiLFwiRHN0cm9rXCI6XCJcXHUwMTEwXCIsXCJkc3Ryb2tcIjpcIlxcdTAxMTFcIixcImR0ZG90XCI6XCJcXHUyMkYxXCIsXCJkdHJpXCI6XCJcXHUyNUJGXCIsXCJkdHJpZlwiOlwiXFx1MjVCRVwiLFwiZHVhcnJcIjpcIlxcdTIxRjVcIixcImR1aGFyXCI6XCJcXHUyOTZGXCIsXCJkd2FuZ2xlXCI6XCJcXHUyOUE2XCIsXCJEWmN5XCI6XCJcXHUwNDBGXCIsXCJkemN5XCI6XCJcXHUwNDVGXCIsXCJkemlncmFyclwiOlwiXFx1MjdGRlwiLFwiRWFjdXRlXCI6XCJcXHUwMEM5XCIsXCJlYWN1dGVcIjpcIlxcdTAwRTlcIixcImVhc3RlclwiOlwiXFx1MkE2RVwiLFwiRWNhcm9uXCI6XCJcXHUwMTFBXCIsXCJlY2Fyb25cIjpcIlxcdTAxMUJcIixcIkVjaXJjXCI6XCJcXHUwMENBXCIsXCJlY2lyY1wiOlwiXFx1MDBFQVwiLFwiZWNpclwiOlwiXFx1MjI1NlwiLFwiZWNvbG9uXCI6XCJcXHUyMjU1XCIsXCJFY3lcIjpcIlxcdTA0MkRcIixcImVjeVwiOlwiXFx1MDQ0RFwiLFwiZUREb3RcIjpcIlxcdTJBNzdcIixcIkVkb3RcIjpcIlxcdTAxMTZcIixcImVkb3RcIjpcIlxcdTAxMTdcIixcImVEb3RcIjpcIlxcdTIyNTFcIixcImVlXCI6XCJcXHUyMTQ3XCIsXCJlZkRvdFwiOlwiXFx1MjI1MlwiLFwiRWZyXCI6XCJcXHVEODM1XFx1REQwOFwiLFwiZWZyXCI6XCJcXHVEODM1XFx1REQyMlwiLFwiZWdcIjpcIlxcdTJBOUFcIixcIkVncmF2ZVwiOlwiXFx1MDBDOFwiLFwiZWdyYXZlXCI6XCJcXHUwMEU4XCIsXCJlZ3NcIjpcIlxcdTJBOTZcIixcImVnc2RvdFwiOlwiXFx1MkE5OFwiLFwiZWxcIjpcIlxcdTJBOTlcIixcIkVsZW1lbnRcIjpcIlxcdTIyMDhcIixcImVsaW50ZXJzXCI6XCJcXHUyM0U3XCIsXCJlbGxcIjpcIlxcdTIxMTNcIixcImVsc1wiOlwiXFx1MkE5NVwiLFwiZWxzZG90XCI6XCJcXHUyQTk3XCIsXCJFbWFjclwiOlwiXFx1MDExMlwiLFwiZW1hY3JcIjpcIlxcdTAxMTNcIixcImVtcHR5XCI6XCJcXHUyMjA1XCIsXCJlbXB0eXNldFwiOlwiXFx1MjIwNVwiLFwiRW1wdHlTbWFsbFNxdWFyZVwiOlwiXFx1MjVGQlwiLFwiZW1wdHl2XCI6XCJcXHUyMjA1XCIsXCJFbXB0eVZlcnlTbWFsbFNxdWFyZVwiOlwiXFx1MjVBQlwiLFwiZW1zcDEzXCI6XCJcXHUyMDA0XCIsXCJlbXNwMTRcIjpcIlxcdTIwMDVcIixcImVtc3BcIjpcIlxcdTIwMDNcIixcIkVOR1wiOlwiXFx1MDE0QVwiLFwiZW5nXCI6XCJcXHUwMTRCXCIsXCJlbnNwXCI6XCJcXHUyMDAyXCIsXCJFb2dvblwiOlwiXFx1MDExOFwiLFwiZW9nb25cIjpcIlxcdTAxMTlcIixcIkVvcGZcIjpcIlxcdUQ4MzVcXHVERDNDXCIsXCJlb3BmXCI6XCJcXHVEODM1XFx1REQ1NlwiLFwiZXBhclwiOlwiXFx1MjJENVwiLFwiZXBhcnNsXCI6XCJcXHUyOUUzXCIsXCJlcGx1c1wiOlwiXFx1MkE3MVwiLFwiZXBzaVwiOlwiXFx1MDNCNVwiLFwiRXBzaWxvblwiOlwiXFx1MDM5NVwiLFwiZXBzaWxvblwiOlwiXFx1MDNCNVwiLFwiZXBzaXZcIjpcIlxcdTAzRjVcIixcImVxY2lyY1wiOlwiXFx1MjI1NlwiLFwiZXFjb2xvblwiOlwiXFx1MjI1NVwiLFwiZXFzaW1cIjpcIlxcdTIyNDJcIixcImVxc2xhbnRndHJcIjpcIlxcdTJBOTZcIixcImVxc2xhbnRsZXNzXCI6XCJcXHUyQTk1XCIsXCJFcXVhbFwiOlwiXFx1MkE3NVwiLFwiZXF1YWxzXCI6XCI9XCIsXCJFcXVhbFRpbGRlXCI6XCJcXHUyMjQyXCIsXCJlcXVlc3RcIjpcIlxcdTIyNUZcIixcIkVxdWlsaWJyaXVtXCI6XCJcXHUyMUNDXCIsXCJlcXVpdlwiOlwiXFx1MjI2MVwiLFwiZXF1aXZERFwiOlwiXFx1MkE3OFwiLFwiZXF2cGFyc2xcIjpcIlxcdTI5RTVcIixcImVyYXJyXCI6XCJcXHUyOTcxXCIsXCJlckRvdFwiOlwiXFx1MjI1M1wiLFwiZXNjclwiOlwiXFx1MjEyRlwiLFwiRXNjclwiOlwiXFx1MjEzMFwiLFwiZXNkb3RcIjpcIlxcdTIyNTBcIixcIkVzaW1cIjpcIlxcdTJBNzNcIixcImVzaW1cIjpcIlxcdTIyNDJcIixcIkV0YVwiOlwiXFx1MDM5N1wiLFwiZXRhXCI6XCJcXHUwM0I3XCIsXCJFVEhcIjpcIlxcdTAwRDBcIixcImV0aFwiOlwiXFx1MDBGMFwiLFwiRXVtbFwiOlwiXFx1MDBDQlwiLFwiZXVtbFwiOlwiXFx1MDBFQlwiLFwiZXVyb1wiOlwiXFx1MjBBQ1wiLFwiZXhjbFwiOlwiIVwiLFwiZXhpc3RcIjpcIlxcdTIyMDNcIixcIkV4aXN0c1wiOlwiXFx1MjIwM1wiLFwiZXhwZWN0YXRpb25cIjpcIlxcdTIxMzBcIixcImV4cG9uZW50aWFsZVwiOlwiXFx1MjE0N1wiLFwiRXhwb25lbnRpYWxFXCI6XCJcXHUyMTQ3XCIsXCJmYWxsaW5nZG90c2VxXCI6XCJcXHUyMjUyXCIsXCJGY3lcIjpcIlxcdTA0MjRcIixcImZjeVwiOlwiXFx1MDQ0NFwiLFwiZmVtYWxlXCI6XCJcXHUyNjQwXCIsXCJmZmlsaWdcIjpcIlxcdUZCMDNcIixcImZmbGlnXCI6XCJcXHVGQjAwXCIsXCJmZmxsaWdcIjpcIlxcdUZCMDRcIixcIkZmclwiOlwiXFx1RDgzNVxcdUREMDlcIixcImZmclwiOlwiXFx1RDgzNVxcdUREMjNcIixcImZpbGlnXCI6XCJcXHVGQjAxXCIsXCJGaWxsZWRTbWFsbFNxdWFyZVwiOlwiXFx1MjVGQ1wiLFwiRmlsbGVkVmVyeVNtYWxsU3F1YXJlXCI6XCJcXHUyNUFBXCIsXCJmamxpZ1wiOlwiZmpcIixcImZsYXRcIjpcIlxcdTI2NkRcIixcImZsbGlnXCI6XCJcXHVGQjAyXCIsXCJmbHRuc1wiOlwiXFx1MjVCMVwiLFwiZm5vZlwiOlwiXFx1MDE5MlwiLFwiRm9wZlwiOlwiXFx1RDgzNVxcdUREM0RcIixcImZvcGZcIjpcIlxcdUQ4MzVcXHVERDU3XCIsXCJmb3JhbGxcIjpcIlxcdTIyMDBcIixcIkZvckFsbFwiOlwiXFx1MjIwMFwiLFwiZm9ya1wiOlwiXFx1MjJENFwiLFwiZm9ya3ZcIjpcIlxcdTJBRDlcIixcIkZvdXJpZXJ0cmZcIjpcIlxcdTIxMzFcIixcImZwYXJ0aW50XCI6XCJcXHUyQTBEXCIsXCJmcmFjMTJcIjpcIlxcdTAwQkRcIixcImZyYWMxM1wiOlwiXFx1MjE1M1wiLFwiZnJhYzE0XCI6XCJcXHUwMEJDXCIsXCJmcmFjMTVcIjpcIlxcdTIxNTVcIixcImZyYWMxNlwiOlwiXFx1MjE1OVwiLFwiZnJhYzE4XCI6XCJcXHUyMTVCXCIsXCJmcmFjMjNcIjpcIlxcdTIxNTRcIixcImZyYWMyNVwiOlwiXFx1MjE1NlwiLFwiZnJhYzM0XCI6XCJcXHUwMEJFXCIsXCJmcmFjMzVcIjpcIlxcdTIxNTdcIixcImZyYWMzOFwiOlwiXFx1MjE1Q1wiLFwiZnJhYzQ1XCI6XCJcXHUyMTU4XCIsXCJmcmFjNTZcIjpcIlxcdTIxNUFcIixcImZyYWM1OFwiOlwiXFx1MjE1RFwiLFwiZnJhYzc4XCI6XCJcXHUyMTVFXCIsXCJmcmFzbFwiOlwiXFx1MjA0NFwiLFwiZnJvd25cIjpcIlxcdTIzMjJcIixcImZzY3JcIjpcIlxcdUQ4MzVcXHVEQ0JCXCIsXCJGc2NyXCI6XCJcXHUyMTMxXCIsXCJnYWN1dGVcIjpcIlxcdTAxRjVcIixcIkdhbW1hXCI6XCJcXHUwMzkzXCIsXCJnYW1tYVwiOlwiXFx1MDNCM1wiLFwiR2FtbWFkXCI6XCJcXHUwM0RDXCIsXCJnYW1tYWRcIjpcIlxcdTAzRERcIixcImdhcFwiOlwiXFx1MkE4NlwiLFwiR2JyZXZlXCI6XCJcXHUwMTFFXCIsXCJnYnJldmVcIjpcIlxcdTAxMUZcIixcIkdjZWRpbFwiOlwiXFx1MDEyMlwiLFwiR2NpcmNcIjpcIlxcdTAxMUNcIixcImdjaXJjXCI6XCJcXHUwMTFEXCIsXCJHY3lcIjpcIlxcdTA0MTNcIixcImdjeVwiOlwiXFx1MDQzM1wiLFwiR2RvdFwiOlwiXFx1MDEyMFwiLFwiZ2RvdFwiOlwiXFx1MDEyMVwiLFwiZ2VcIjpcIlxcdTIyNjVcIixcImdFXCI6XCJcXHUyMjY3XCIsXCJnRWxcIjpcIlxcdTJBOENcIixcImdlbFwiOlwiXFx1MjJEQlwiLFwiZ2VxXCI6XCJcXHUyMjY1XCIsXCJnZXFxXCI6XCJcXHUyMjY3XCIsXCJnZXFzbGFudFwiOlwiXFx1MkE3RVwiLFwiZ2VzY2NcIjpcIlxcdTJBQTlcIixcImdlc1wiOlwiXFx1MkE3RVwiLFwiZ2VzZG90XCI6XCJcXHUyQTgwXCIsXCJnZXNkb3RvXCI6XCJcXHUyQTgyXCIsXCJnZXNkb3RvbFwiOlwiXFx1MkE4NFwiLFwiZ2VzbFwiOlwiXFx1MjJEQlxcdUZFMDBcIixcImdlc2xlc1wiOlwiXFx1MkE5NFwiLFwiR2ZyXCI6XCJcXHVEODM1XFx1REQwQVwiLFwiZ2ZyXCI6XCJcXHVEODM1XFx1REQyNFwiLFwiZ2dcIjpcIlxcdTIyNkJcIixcIkdnXCI6XCJcXHUyMkQ5XCIsXCJnZ2dcIjpcIlxcdTIyRDlcIixcImdpbWVsXCI6XCJcXHUyMTM3XCIsXCJHSmN5XCI6XCJcXHUwNDAzXCIsXCJnamN5XCI6XCJcXHUwNDUzXCIsXCJnbGFcIjpcIlxcdTJBQTVcIixcImdsXCI6XCJcXHUyMjc3XCIsXCJnbEVcIjpcIlxcdTJBOTJcIixcImdsalwiOlwiXFx1MkFBNFwiLFwiZ25hcFwiOlwiXFx1MkE4QVwiLFwiZ25hcHByb3hcIjpcIlxcdTJBOEFcIixcImduZVwiOlwiXFx1MkE4OFwiLFwiZ25FXCI6XCJcXHUyMjY5XCIsXCJnbmVxXCI6XCJcXHUyQTg4XCIsXCJnbmVxcVwiOlwiXFx1MjI2OVwiLFwiZ25zaW1cIjpcIlxcdTIyRTdcIixcIkdvcGZcIjpcIlxcdUQ4MzVcXHVERDNFXCIsXCJnb3BmXCI6XCJcXHVEODM1XFx1REQ1OFwiLFwiZ3JhdmVcIjpcImBcIixcIkdyZWF0ZXJFcXVhbFwiOlwiXFx1MjI2NVwiLFwiR3JlYXRlckVxdWFsTGVzc1wiOlwiXFx1MjJEQlwiLFwiR3JlYXRlckZ1bGxFcXVhbFwiOlwiXFx1MjI2N1wiLFwiR3JlYXRlckdyZWF0ZXJcIjpcIlxcdTJBQTJcIixcIkdyZWF0ZXJMZXNzXCI6XCJcXHUyMjc3XCIsXCJHcmVhdGVyU2xhbnRFcXVhbFwiOlwiXFx1MkE3RVwiLFwiR3JlYXRlclRpbGRlXCI6XCJcXHUyMjczXCIsXCJHc2NyXCI6XCJcXHVEODM1XFx1RENBMlwiLFwiZ3NjclwiOlwiXFx1MjEwQVwiLFwiZ3NpbVwiOlwiXFx1MjI3M1wiLFwiZ3NpbWVcIjpcIlxcdTJBOEVcIixcImdzaW1sXCI6XCJcXHUyQTkwXCIsXCJndGNjXCI6XCJcXHUyQUE3XCIsXCJndGNpclwiOlwiXFx1MkE3QVwiLFwiZ3RcIjpcIj5cIixcIkdUXCI6XCI+XCIsXCJHdFwiOlwiXFx1MjI2QlwiLFwiZ3Rkb3RcIjpcIlxcdTIyRDdcIixcImd0bFBhclwiOlwiXFx1Mjk5NVwiLFwiZ3RxdWVzdFwiOlwiXFx1MkE3Q1wiLFwiZ3RyYXBwcm94XCI6XCJcXHUyQTg2XCIsXCJndHJhcnJcIjpcIlxcdTI5NzhcIixcImd0cmRvdFwiOlwiXFx1MjJEN1wiLFwiZ3RyZXFsZXNzXCI6XCJcXHUyMkRCXCIsXCJndHJlcXFsZXNzXCI6XCJcXHUyQThDXCIsXCJndHJsZXNzXCI6XCJcXHUyMjc3XCIsXCJndHJzaW1cIjpcIlxcdTIyNzNcIixcImd2ZXJ0bmVxcVwiOlwiXFx1MjI2OVxcdUZFMDBcIixcImd2bkVcIjpcIlxcdTIyNjlcXHVGRTAwXCIsXCJIYWNla1wiOlwiXFx1MDJDN1wiLFwiaGFpcnNwXCI6XCJcXHUyMDBBXCIsXCJoYWxmXCI6XCJcXHUwMEJEXCIsXCJoYW1pbHRcIjpcIlxcdTIxMEJcIixcIkhBUkRjeVwiOlwiXFx1MDQyQVwiLFwiaGFyZGN5XCI6XCJcXHUwNDRBXCIsXCJoYXJyY2lyXCI6XCJcXHUyOTQ4XCIsXCJoYXJyXCI6XCJcXHUyMTk0XCIsXCJoQXJyXCI6XCJcXHUyMUQ0XCIsXCJoYXJyd1wiOlwiXFx1MjFBRFwiLFwiSGF0XCI6XCJeXCIsXCJoYmFyXCI6XCJcXHUyMTBGXCIsXCJIY2lyY1wiOlwiXFx1MDEyNFwiLFwiaGNpcmNcIjpcIlxcdTAxMjVcIixcImhlYXJ0c1wiOlwiXFx1MjY2NVwiLFwiaGVhcnRzdWl0XCI6XCJcXHUyNjY1XCIsXCJoZWxsaXBcIjpcIlxcdTIwMjZcIixcImhlcmNvblwiOlwiXFx1MjJCOVwiLFwiaGZyXCI6XCJcXHVEODM1XFx1REQyNVwiLFwiSGZyXCI6XCJcXHUyMTBDXCIsXCJIaWxiZXJ0U3BhY2VcIjpcIlxcdTIxMEJcIixcImhrc2Vhcm93XCI6XCJcXHUyOTI1XCIsXCJoa3N3YXJvd1wiOlwiXFx1MjkyNlwiLFwiaG9hcnJcIjpcIlxcdTIxRkZcIixcImhvbXRodFwiOlwiXFx1MjIzQlwiLFwiaG9va2xlZnRhcnJvd1wiOlwiXFx1MjFBOVwiLFwiaG9va3JpZ2h0YXJyb3dcIjpcIlxcdTIxQUFcIixcImhvcGZcIjpcIlxcdUQ4MzVcXHVERDU5XCIsXCJIb3BmXCI6XCJcXHUyMTBEXCIsXCJob3JiYXJcIjpcIlxcdTIwMTVcIixcIkhvcml6b250YWxMaW5lXCI6XCJcXHUyNTAwXCIsXCJoc2NyXCI6XCJcXHVEODM1XFx1RENCRFwiLFwiSHNjclwiOlwiXFx1MjEwQlwiLFwiaHNsYXNoXCI6XCJcXHUyMTBGXCIsXCJIc3Ryb2tcIjpcIlxcdTAxMjZcIixcImhzdHJva1wiOlwiXFx1MDEyN1wiLFwiSHVtcERvd25IdW1wXCI6XCJcXHUyMjRFXCIsXCJIdW1wRXF1YWxcIjpcIlxcdTIyNEZcIixcImh5YnVsbFwiOlwiXFx1MjA0M1wiLFwiaHlwaGVuXCI6XCJcXHUyMDEwXCIsXCJJYWN1dGVcIjpcIlxcdTAwQ0RcIixcImlhY3V0ZVwiOlwiXFx1MDBFRFwiLFwiaWNcIjpcIlxcdTIwNjNcIixcIkljaXJjXCI6XCJcXHUwMENFXCIsXCJpY2lyY1wiOlwiXFx1MDBFRVwiLFwiSWN5XCI6XCJcXHUwNDE4XCIsXCJpY3lcIjpcIlxcdTA0MzhcIixcIklkb3RcIjpcIlxcdTAxMzBcIixcIklFY3lcIjpcIlxcdTA0MTVcIixcImllY3lcIjpcIlxcdTA0MzVcIixcImlleGNsXCI6XCJcXHUwMEExXCIsXCJpZmZcIjpcIlxcdTIxRDRcIixcImlmclwiOlwiXFx1RDgzNVxcdUREMjZcIixcIklmclwiOlwiXFx1MjExMVwiLFwiSWdyYXZlXCI6XCJcXHUwMENDXCIsXCJpZ3JhdmVcIjpcIlxcdTAwRUNcIixcImlpXCI6XCJcXHUyMTQ4XCIsXCJpaWlpbnRcIjpcIlxcdTJBMENcIixcImlpaW50XCI6XCJcXHUyMjJEXCIsXCJpaW5maW5cIjpcIlxcdTI5RENcIixcImlpb3RhXCI6XCJcXHUyMTI5XCIsXCJJSmxpZ1wiOlwiXFx1MDEzMlwiLFwiaWpsaWdcIjpcIlxcdTAxMzNcIixcIkltYWNyXCI6XCJcXHUwMTJBXCIsXCJpbWFjclwiOlwiXFx1MDEyQlwiLFwiaW1hZ2VcIjpcIlxcdTIxMTFcIixcIkltYWdpbmFyeUlcIjpcIlxcdTIxNDhcIixcImltYWdsaW5lXCI6XCJcXHUyMTEwXCIsXCJpbWFncGFydFwiOlwiXFx1MjExMVwiLFwiaW1hdGhcIjpcIlxcdTAxMzFcIixcIkltXCI6XCJcXHUyMTExXCIsXCJpbW9mXCI6XCJcXHUyMkI3XCIsXCJpbXBlZFwiOlwiXFx1MDFCNVwiLFwiSW1wbGllc1wiOlwiXFx1MjFEMlwiLFwiaW5jYXJlXCI6XCJcXHUyMTA1XCIsXCJpblwiOlwiXFx1MjIwOFwiLFwiaW5maW5cIjpcIlxcdTIyMUVcIixcImluZmludGllXCI6XCJcXHUyOUREXCIsXCJpbm9kb3RcIjpcIlxcdTAxMzFcIixcImludGNhbFwiOlwiXFx1MjJCQVwiLFwiaW50XCI6XCJcXHUyMjJCXCIsXCJJbnRcIjpcIlxcdTIyMkNcIixcImludGVnZXJzXCI6XCJcXHUyMTI0XCIsXCJJbnRlZ3JhbFwiOlwiXFx1MjIyQlwiLFwiaW50ZXJjYWxcIjpcIlxcdTIyQkFcIixcIkludGVyc2VjdGlvblwiOlwiXFx1MjJDMlwiLFwiaW50bGFyaGtcIjpcIlxcdTJBMTdcIixcImludHByb2RcIjpcIlxcdTJBM0NcIixcIkludmlzaWJsZUNvbW1hXCI6XCJcXHUyMDYzXCIsXCJJbnZpc2libGVUaW1lc1wiOlwiXFx1MjA2MlwiLFwiSU9jeVwiOlwiXFx1MDQwMVwiLFwiaW9jeVwiOlwiXFx1MDQ1MVwiLFwiSW9nb25cIjpcIlxcdTAxMkVcIixcImlvZ29uXCI6XCJcXHUwMTJGXCIsXCJJb3BmXCI6XCJcXHVEODM1XFx1REQ0MFwiLFwiaW9wZlwiOlwiXFx1RDgzNVxcdURENUFcIixcIklvdGFcIjpcIlxcdTAzOTlcIixcImlvdGFcIjpcIlxcdTAzQjlcIixcImlwcm9kXCI6XCJcXHUyQTNDXCIsXCJpcXVlc3RcIjpcIlxcdTAwQkZcIixcImlzY3JcIjpcIlxcdUQ4MzVcXHVEQ0JFXCIsXCJJc2NyXCI6XCJcXHUyMTEwXCIsXCJpc2luXCI6XCJcXHUyMjA4XCIsXCJpc2luZG90XCI6XCJcXHUyMkY1XCIsXCJpc2luRVwiOlwiXFx1MjJGOVwiLFwiaXNpbnNcIjpcIlxcdTIyRjRcIixcImlzaW5zdlwiOlwiXFx1MjJGM1wiLFwiaXNpbnZcIjpcIlxcdTIyMDhcIixcIml0XCI6XCJcXHUyMDYyXCIsXCJJdGlsZGVcIjpcIlxcdTAxMjhcIixcIml0aWxkZVwiOlwiXFx1MDEyOVwiLFwiSXVrY3lcIjpcIlxcdTA0MDZcIixcIml1a2N5XCI6XCJcXHUwNDU2XCIsXCJJdW1sXCI6XCJcXHUwMENGXCIsXCJpdW1sXCI6XCJcXHUwMEVGXCIsXCJKY2lyY1wiOlwiXFx1MDEzNFwiLFwiamNpcmNcIjpcIlxcdTAxMzVcIixcIkpjeVwiOlwiXFx1MDQxOVwiLFwiamN5XCI6XCJcXHUwNDM5XCIsXCJKZnJcIjpcIlxcdUQ4MzVcXHVERDBEXCIsXCJqZnJcIjpcIlxcdUQ4MzVcXHVERDI3XCIsXCJqbWF0aFwiOlwiXFx1MDIzN1wiLFwiSm9wZlwiOlwiXFx1RDgzNVxcdURENDFcIixcImpvcGZcIjpcIlxcdUQ4MzVcXHVERDVCXCIsXCJKc2NyXCI6XCJcXHVEODM1XFx1RENBNVwiLFwianNjclwiOlwiXFx1RDgzNVxcdURDQkZcIixcIkpzZXJjeVwiOlwiXFx1MDQwOFwiLFwianNlcmN5XCI6XCJcXHUwNDU4XCIsXCJKdWtjeVwiOlwiXFx1MDQwNFwiLFwianVrY3lcIjpcIlxcdTA0NTRcIixcIkthcHBhXCI6XCJcXHUwMzlBXCIsXCJrYXBwYVwiOlwiXFx1MDNCQVwiLFwia2FwcGF2XCI6XCJcXHUwM0YwXCIsXCJLY2VkaWxcIjpcIlxcdTAxMzZcIixcImtjZWRpbFwiOlwiXFx1MDEzN1wiLFwiS2N5XCI6XCJcXHUwNDFBXCIsXCJrY3lcIjpcIlxcdTA0M0FcIixcIktmclwiOlwiXFx1RDgzNVxcdUREMEVcIixcImtmclwiOlwiXFx1RDgzNVxcdUREMjhcIixcImtncmVlblwiOlwiXFx1MDEzOFwiLFwiS0hjeVwiOlwiXFx1MDQyNVwiLFwia2hjeVwiOlwiXFx1MDQ0NVwiLFwiS0pjeVwiOlwiXFx1MDQwQ1wiLFwia2pjeVwiOlwiXFx1MDQ1Q1wiLFwiS29wZlwiOlwiXFx1RDgzNVxcdURENDJcIixcImtvcGZcIjpcIlxcdUQ4MzVcXHVERDVDXCIsXCJLc2NyXCI6XCJcXHVEODM1XFx1RENBNlwiLFwia3NjclwiOlwiXFx1RDgzNVxcdURDQzBcIixcImxBYXJyXCI6XCJcXHUyMURBXCIsXCJMYWN1dGVcIjpcIlxcdTAxMzlcIixcImxhY3V0ZVwiOlwiXFx1MDEzQVwiLFwibGFlbXB0eXZcIjpcIlxcdTI5QjRcIixcImxhZ3JhblwiOlwiXFx1MjExMlwiLFwiTGFtYmRhXCI6XCJcXHUwMzlCXCIsXCJsYW1iZGFcIjpcIlxcdTAzQkJcIixcImxhbmdcIjpcIlxcdTI3RThcIixcIkxhbmdcIjpcIlxcdTI3RUFcIixcImxhbmdkXCI6XCJcXHUyOTkxXCIsXCJsYW5nbGVcIjpcIlxcdTI3RThcIixcImxhcFwiOlwiXFx1MkE4NVwiLFwiTGFwbGFjZXRyZlwiOlwiXFx1MjExMlwiLFwibGFxdW9cIjpcIlxcdTAwQUJcIixcImxhcnJiXCI6XCJcXHUyMUU0XCIsXCJsYXJyYmZzXCI6XCJcXHUyOTFGXCIsXCJsYXJyXCI6XCJcXHUyMTkwXCIsXCJMYXJyXCI6XCJcXHUyMTlFXCIsXCJsQXJyXCI6XCJcXHUyMUQwXCIsXCJsYXJyZnNcIjpcIlxcdTI5MURcIixcImxhcnJoa1wiOlwiXFx1MjFBOVwiLFwibGFycmxwXCI6XCJcXHUyMUFCXCIsXCJsYXJycGxcIjpcIlxcdTI5MzlcIixcImxhcnJzaW1cIjpcIlxcdTI5NzNcIixcImxhcnJ0bFwiOlwiXFx1MjFBMlwiLFwibGF0YWlsXCI6XCJcXHUyOTE5XCIsXCJsQXRhaWxcIjpcIlxcdTI5MUJcIixcImxhdFwiOlwiXFx1MkFBQlwiLFwibGF0ZVwiOlwiXFx1MkFBRFwiLFwibGF0ZXNcIjpcIlxcdTJBQURcXHVGRTAwXCIsXCJsYmFyclwiOlwiXFx1MjkwQ1wiLFwibEJhcnJcIjpcIlxcdTI5MEVcIixcImxiYnJrXCI6XCJcXHUyNzcyXCIsXCJsYnJhY2VcIjpcIntcIixcImxicmFja1wiOlwiW1wiLFwibGJya2VcIjpcIlxcdTI5OEJcIixcImxicmtzbGRcIjpcIlxcdTI5OEZcIixcImxicmtzbHVcIjpcIlxcdTI5OERcIixcIkxjYXJvblwiOlwiXFx1MDEzRFwiLFwibGNhcm9uXCI6XCJcXHUwMTNFXCIsXCJMY2VkaWxcIjpcIlxcdTAxM0JcIixcImxjZWRpbFwiOlwiXFx1MDEzQ1wiLFwibGNlaWxcIjpcIlxcdTIzMDhcIixcImxjdWJcIjpcIntcIixcIkxjeVwiOlwiXFx1MDQxQlwiLFwibGN5XCI6XCJcXHUwNDNCXCIsXCJsZGNhXCI6XCJcXHUyOTM2XCIsXCJsZHF1b1wiOlwiXFx1MjAxQ1wiLFwibGRxdW9yXCI6XCJcXHUyMDFFXCIsXCJsZHJkaGFyXCI6XCJcXHUyOTY3XCIsXCJsZHJ1c2hhclwiOlwiXFx1Mjk0QlwiLFwibGRzaFwiOlwiXFx1MjFCMlwiLFwibGVcIjpcIlxcdTIyNjRcIixcImxFXCI6XCJcXHUyMjY2XCIsXCJMZWZ0QW5nbGVCcmFja2V0XCI6XCJcXHUyN0U4XCIsXCJMZWZ0QXJyb3dCYXJcIjpcIlxcdTIxRTRcIixcImxlZnRhcnJvd1wiOlwiXFx1MjE5MFwiLFwiTGVmdEFycm93XCI6XCJcXHUyMTkwXCIsXCJMZWZ0YXJyb3dcIjpcIlxcdTIxRDBcIixcIkxlZnRBcnJvd1JpZ2h0QXJyb3dcIjpcIlxcdTIxQzZcIixcImxlZnRhcnJvd3RhaWxcIjpcIlxcdTIxQTJcIixcIkxlZnRDZWlsaW5nXCI6XCJcXHUyMzA4XCIsXCJMZWZ0RG91YmxlQnJhY2tldFwiOlwiXFx1MjdFNlwiLFwiTGVmdERvd25UZWVWZWN0b3JcIjpcIlxcdTI5NjFcIixcIkxlZnREb3duVmVjdG9yQmFyXCI6XCJcXHUyOTU5XCIsXCJMZWZ0RG93blZlY3RvclwiOlwiXFx1MjFDM1wiLFwiTGVmdEZsb29yXCI6XCJcXHUyMzBBXCIsXCJsZWZ0aGFycG9vbmRvd25cIjpcIlxcdTIxQkRcIixcImxlZnRoYXJwb29udXBcIjpcIlxcdTIxQkNcIixcImxlZnRsZWZ0YXJyb3dzXCI6XCJcXHUyMUM3XCIsXCJsZWZ0cmlnaHRhcnJvd1wiOlwiXFx1MjE5NFwiLFwiTGVmdFJpZ2h0QXJyb3dcIjpcIlxcdTIxOTRcIixcIkxlZnRyaWdodGFycm93XCI6XCJcXHUyMUQ0XCIsXCJsZWZ0cmlnaHRhcnJvd3NcIjpcIlxcdTIxQzZcIixcImxlZnRyaWdodGhhcnBvb25zXCI6XCJcXHUyMUNCXCIsXCJsZWZ0cmlnaHRzcXVpZ2Fycm93XCI6XCJcXHUyMUFEXCIsXCJMZWZ0UmlnaHRWZWN0b3JcIjpcIlxcdTI5NEVcIixcIkxlZnRUZWVBcnJvd1wiOlwiXFx1MjFBNFwiLFwiTGVmdFRlZVwiOlwiXFx1MjJBM1wiLFwiTGVmdFRlZVZlY3RvclwiOlwiXFx1Mjk1QVwiLFwibGVmdHRocmVldGltZXNcIjpcIlxcdTIyQ0JcIixcIkxlZnRUcmlhbmdsZUJhclwiOlwiXFx1MjlDRlwiLFwiTGVmdFRyaWFuZ2xlXCI6XCJcXHUyMkIyXCIsXCJMZWZ0VHJpYW5nbGVFcXVhbFwiOlwiXFx1MjJCNFwiLFwiTGVmdFVwRG93blZlY3RvclwiOlwiXFx1Mjk1MVwiLFwiTGVmdFVwVGVlVmVjdG9yXCI6XCJcXHUyOTYwXCIsXCJMZWZ0VXBWZWN0b3JCYXJcIjpcIlxcdTI5NThcIixcIkxlZnRVcFZlY3RvclwiOlwiXFx1MjFCRlwiLFwiTGVmdFZlY3RvckJhclwiOlwiXFx1Mjk1MlwiLFwiTGVmdFZlY3RvclwiOlwiXFx1MjFCQ1wiLFwibEVnXCI6XCJcXHUyQThCXCIsXCJsZWdcIjpcIlxcdTIyREFcIixcImxlcVwiOlwiXFx1MjI2NFwiLFwibGVxcVwiOlwiXFx1MjI2NlwiLFwibGVxc2xhbnRcIjpcIlxcdTJBN0RcIixcImxlc2NjXCI6XCJcXHUyQUE4XCIsXCJsZXNcIjpcIlxcdTJBN0RcIixcImxlc2RvdFwiOlwiXFx1MkE3RlwiLFwibGVzZG90b1wiOlwiXFx1MkE4MVwiLFwibGVzZG90b3JcIjpcIlxcdTJBODNcIixcImxlc2dcIjpcIlxcdTIyREFcXHVGRTAwXCIsXCJsZXNnZXNcIjpcIlxcdTJBOTNcIixcImxlc3NhcHByb3hcIjpcIlxcdTJBODVcIixcImxlc3Nkb3RcIjpcIlxcdTIyRDZcIixcImxlc3NlcWd0clwiOlwiXFx1MjJEQVwiLFwibGVzc2VxcWd0clwiOlwiXFx1MkE4QlwiLFwiTGVzc0VxdWFsR3JlYXRlclwiOlwiXFx1MjJEQVwiLFwiTGVzc0Z1bGxFcXVhbFwiOlwiXFx1MjI2NlwiLFwiTGVzc0dyZWF0ZXJcIjpcIlxcdTIyNzZcIixcImxlc3NndHJcIjpcIlxcdTIyNzZcIixcIkxlc3NMZXNzXCI6XCJcXHUyQUExXCIsXCJsZXNzc2ltXCI6XCJcXHUyMjcyXCIsXCJMZXNzU2xhbnRFcXVhbFwiOlwiXFx1MkE3RFwiLFwiTGVzc1RpbGRlXCI6XCJcXHUyMjcyXCIsXCJsZmlzaHRcIjpcIlxcdTI5N0NcIixcImxmbG9vclwiOlwiXFx1MjMwQVwiLFwiTGZyXCI6XCJcXHVEODM1XFx1REQwRlwiLFwibGZyXCI6XCJcXHVEODM1XFx1REQyOVwiLFwibGdcIjpcIlxcdTIyNzZcIixcImxnRVwiOlwiXFx1MkE5MVwiLFwibEhhclwiOlwiXFx1Mjk2MlwiLFwibGhhcmRcIjpcIlxcdTIxQkRcIixcImxoYXJ1XCI6XCJcXHUyMUJDXCIsXCJsaGFydWxcIjpcIlxcdTI5NkFcIixcImxoYmxrXCI6XCJcXHUyNTg0XCIsXCJMSmN5XCI6XCJcXHUwNDA5XCIsXCJsamN5XCI6XCJcXHUwNDU5XCIsXCJsbGFyclwiOlwiXFx1MjFDN1wiLFwibGxcIjpcIlxcdTIyNkFcIixcIkxsXCI6XCJcXHUyMkQ4XCIsXCJsbGNvcm5lclwiOlwiXFx1MjMxRVwiLFwiTGxlZnRhcnJvd1wiOlwiXFx1MjFEQVwiLFwibGxoYXJkXCI6XCJcXHUyOTZCXCIsXCJsbHRyaVwiOlwiXFx1MjVGQVwiLFwiTG1pZG90XCI6XCJcXHUwMTNGXCIsXCJsbWlkb3RcIjpcIlxcdTAxNDBcIixcImxtb3VzdGFjaGVcIjpcIlxcdTIzQjBcIixcImxtb3VzdFwiOlwiXFx1MjNCMFwiLFwibG5hcFwiOlwiXFx1MkE4OVwiLFwibG5hcHByb3hcIjpcIlxcdTJBODlcIixcImxuZVwiOlwiXFx1MkE4N1wiLFwibG5FXCI6XCJcXHUyMjY4XCIsXCJsbmVxXCI6XCJcXHUyQTg3XCIsXCJsbmVxcVwiOlwiXFx1MjI2OFwiLFwibG5zaW1cIjpcIlxcdTIyRTZcIixcImxvYW5nXCI6XCJcXHUyN0VDXCIsXCJsb2FyclwiOlwiXFx1MjFGRFwiLFwibG9icmtcIjpcIlxcdTI3RTZcIixcImxvbmdsZWZ0YXJyb3dcIjpcIlxcdTI3RjVcIixcIkxvbmdMZWZ0QXJyb3dcIjpcIlxcdTI3RjVcIixcIkxvbmdsZWZ0YXJyb3dcIjpcIlxcdTI3RjhcIixcImxvbmdsZWZ0cmlnaHRhcnJvd1wiOlwiXFx1MjdGN1wiLFwiTG9uZ0xlZnRSaWdodEFycm93XCI6XCJcXHUyN0Y3XCIsXCJMb25nbGVmdHJpZ2h0YXJyb3dcIjpcIlxcdTI3RkFcIixcImxvbmdtYXBzdG9cIjpcIlxcdTI3RkNcIixcImxvbmdyaWdodGFycm93XCI6XCJcXHUyN0Y2XCIsXCJMb25nUmlnaHRBcnJvd1wiOlwiXFx1MjdGNlwiLFwiTG9uZ3JpZ2h0YXJyb3dcIjpcIlxcdTI3RjlcIixcImxvb3BhcnJvd2xlZnRcIjpcIlxcdTIxQUJcIixcImxvb3BhcnJvd3JpZ2h0XCI6XCJcXHUyMUFDXCIsXCJsb3BhclwiOlwiXFx1Mjk4NVwiLFwiTG9wZlwiOlwiXFx1RDgzNVxcdURENDNcIixcImxvcGZcIjpcIlxcdUQ4MzVcXHVERDVEXCIsXCJsb3BsdXNcIjpcIlxcdTJBMkRcIixcImxvdGltZXNcIjpcIlxcdTJBMzRcIixcImxvd2FzdFwiOlwiXFx1MjIxN1wiLFwibG93YmFyXCI6XCJfXCIsXCJMb3dlckxlZnRBcnJvd1wiOlwiXFx1MjE5OVwiLFwiTG93ZXJSaWdodEFycm93XCI6XCJcXHUyMTk4XCIsXCJsb3pcIjpcIlxcdTI1Q0FcIixcImxvemVuZ2VcIjpcIlxcdTI1Q0FcIixcImxvemZcIjpcIlxcdTI5RUJcIixcImxwYXJcIjpcIihcIixcImxwYXJsdFwiOlwiXFx1Mjk5M1wiLFwibHJhcnJcIjpcIlxcdTIxQzZcIixcImxyY29ybmVyXCI6XCJcXHUyMzFGXCIsXCJscmhhclwiOlwiXFx1MjFDQlwiLFwibHJoYXJkXCI6XCJcXHUyOTZEXCIsXCJscm1cIjpcIlxcdTIwMEVcIixcImxydHJpXCI6XCJcXHUyMkJGXCIsXCJsc2FxdW9cIjpcIlxcdTIwMzlcIixcImxzY3JcIjpcIlxcdUQ4MzVcXHVEQ0MxXCIsXCJMc2NyXCI6XCJcXHUyMTEyXCIsXCJsc2hcIjpcIlxcdTIxQjBcIixcIkxzaFwiOlwiXFx1MjFCMFwiLFwibHNpbVwiOlwiXFx1MjI3MlwiLFwibHNpbWVcIjpcIlxcdTJBOERcIixcImxzaW1nXCI6XCJcXHUyQThGXCIsXCJsc3FiXCI6XCJbXCIsXCJsc3F1b1wiOlwiXFx1MjAxOFwiLFwibHNxdW9yXCI6XCJcXHUyMDFBXCIsXCJMc3Ryb2tcIjpcIlxcdTAxNDFcIixcImxzdHJva1wiOlwiXFx1MDE0MlwiLFwibHRjY1wiOlwiXFx1MkFBNlwiLFwibHRjaXJcIjpcIlxcdTJBNzlcIixcImx0XCI6XCI8XCIsXCJMVFwiOlwiPFwiLFwiTHRcIjpcIlxcdTIyNkFcIixcImx0ZG90XCI6XCJcXHUyMkQ2XCIsXCJsdGhyZWVcIjpcIlxcdTIyQ0JcIixcImx0aW1lc1wiOlwiXFx1MjJDOVwiLFwibHRsYXJyXCI6XCJcXHUyOTc2XCIsXCJsdHF1ZXN0XCI6XCJcXHUyQTdCXCIsXCJsdHJpXCI6XCJcXHUyNUMzXCIsXCJsdHJpZVwiOlwiXFx1MjJCNFwiLFwibHRyaWZcIjpcIlxcdTI1QzJcIixcImx0clBhclwiOlwiXFx1Mjk5NlwiLFwibHVyZHNoYXJcIjpcIlxcdTI5NEFcIixcImx1cnVoYXJcIjpcIlxcdTI5NjZcIixcImx2ZXJ0bmVxcVwiOlwiXFx1MjI2OFxcdUZFMDBcIixcImx2bkVcIjpcIlxcdTIyNjhcXHVGRTAwXCIsXCJtYWNyXCI6XCJcXHUwMEFGXCIsXCJtYWxlXCI6XCJcXHUyNjQyXCIsXCJtYWx0XCI6XCJcXHUyNzIwXCIsXCJtYWx0ZXNlXCI6XCJcXHUyNzIwXCIsXCJNYXBcIjpcIlxcdTI5MDVcIixcIm1hcFwiOlwiXFx1MjFBNlwiLFwibWFwc3RvXCI6XCJcXHUyMUE2XCIsXCJtYXBzdG9kb3duXCI6XCJcXHUyMUE3XCIsXCJtYXBzdG9sZWZ0XCI6XCJcXHUyMUE0XCIsXCJtYXBzdG91cFwiOlwiXFx1MjFBNVwiLFwibWFya2VyXCI6XCJcXHUyNUFFXCIsXCJtY29tbWFcIjpcIlxcdTJBMjlcIixcIk1jeVwiOlwiXFx1MDQxQ1wiLFwibWN5XCI6XCJcXHUwNDNDXCIsXCJtZGFzaFwiOlwiXFx1MjAxNFwiLFwibUREb3RcIjpcIlxcdTIyM0FcIixcIm1lYXN1cmVkYW5nbGVcIjpcIlxcdTIyMjFcIixcIk1lZGl1bVNwYWNlXCI6XCJcXHUyMDVGXCIsXCJNZWxsaW50cmZcIjpcIlxcdTIxMzNcIixcIk1mclwiOlwiXFx1RDgzNVxcdUREMTBcIixcIm1mclwiOlwiXFx1RDgzNVxcdUREMkFcIixcIm1ob1wiOlwiXFx1MjEyN1wiLFwibWljcm9cIjpcIlxcdTAwQjVcIixcIm1pZGFzdFwiOlwiKlwiLFwibWlkY2lyXCI6XCJcXHUyQUYwXCIsXCJtaWRcIjpcIlxcdTIyMjNcIixcIm1pZGRvdFwiOlwiXFx1MDBCN1wiLFwibWludXNiXCI6XCJcXHUyMjlGXCIsXCJtaW51c1wiOlwiXFx1MjIxMlwiLFwibWludXNkXCI6XCJcXHUyMjM4XCIsXCJtaW51c2R1XCI6XCJcXHUyQTJBXCIsXCJNaW51c1BsdXNcIjpcIlxcdTIyMTNcIixcIm1sY3BcIjpcIlxcdTJBREJcIixcIm1sZHJcIjpcIlxcdTIwMjZcIixcIm1ucGx1c1wiOlwiXFx1MjIxM1wiLFwibW9kZWxzXCI6XCJcXHUyMkE3XCIsXCJNb3BmXCI6XCJcXHVEODM1XFx1REQ0NFwiLFwibW9wZlwiOlwiXFx1RDgzNVxcdURENUVcIixcIm1wXCI6XCJcXHUyMjEzXCIsXCJtc2NyXCI6XCJcXHVEODM1XFx1RENDMlwiLFwiTXNjclwiOlwiXFx1MjEzM1wiLFwibXN0cG9zXCI6XCJcXHUyMjNFXCIsXCJNdVwiOlwiXFx1MDM5Q1wiLFwibXVcIjpcIlxcdTAzQkNcIixcIm11bHRpbWFwXCI6XCJcXHUyMkI4XCIsXCJtdW1hcFwiOlwiXFx1MjJCOFwiLFwibmFibGFcIjpcIlxcdTIyMDdcIixcIk5hY3V0ZVwiOlwiXFx1MDE0M1wiLFwibmFjdXRlXCI6XCJcXHUwMTQ0XCIsXCJuYW5nXCI6XCJcXHUyMjIwXFx1MjBEMlwiLFwibmFwXCI6XCJcXHUyMjQ5XCIsXCJuYXBFXCI6XCJcXHUyQTcwXFx1MDMzOFwiLFwibmFwaWRcIjpcIlxcdTIyNEJcXHUwMzM4XCIsXCJuYXBvc1wiOlwiXFx1MDE0OVwiLFwibmFwcHJveFwiOlwiXFx1MjI0OVwiLFwibmF0dXJhbFwiOlwiXFx1MjY2RVwiLFwibmF0dXJhbHNcIjpcIlxcdTIxMTVcIixcIm5hdHVyXCI6XCJcXHUyNjZFXCIsXCJuYnNwXCI6XCJcXHUwMEEwXCIsXCJuYnVtcFwiOlwiXFx1MjI0RVxcdTAzMzhcIixcIm5idW1wZVwiOlwiXFx1MjI0RlxcdTAzMzhcIixcIm5jYXBcIjpcIlxcdTJBNDNcIixcIk5jYXJvblwiOlwiXFx1MDE0N1wiLFwibmNhcm9uXCI6XCJcXHUwMTQ4XCIsXCJOY2VkaWxcIjpcIlxcdTAxNDVcIixcIm5jZWRpbFwiOlwiXFx1MDE0NlwiLFwibmNvbmdcIjpcIlxcdTIyNDdcIixcIm5jb25nZG90XCI6XCJcXHUyQTZEXFx1MDMzOFwiLFwibmN1cFwiOlwiXFx1MkE0MlwiLFwiTmN5XCI6XCJcXHUwNDFEXCIsXCJuY3lcIjpcIlxcdTA0M0RcIixcIm5kYXNoXCI6XCJcXHUyMDEzXCIsXCJuZWFyaGtcIjpcIlxcdTI5MjRcIixcIm5lYXJyXCI6XCJcXHUyMTk3XCIsXCJuZUFyclwiOlwiXFx1MjFEN1wiLFwibmVhcnJvd1wiOlwiXFx1MjE5N1wiLFwibmVcIjpcIlxcdTIyNjBcIixcIm5lZG90XCI6XCJcXHUyMjUwXFx1MDMzOFwiLFwiTmVnYXRpdmVNZWRpdW1TcGFjZVwiOlwiXFx1MjAwQlwiLFwiTmVnYXRpdmVUaGlja1NwYWNlXCI6XCJcXHUyMDBCXCIsXCJOZWdhdGl2ZVRoaW5TcGFjZVwiOlwiXFx1MjAwQlwiLFwiTmVnYXRpdmVWZXJ5VGhpblNwYWNlXCI6XCJcXHUyMDBCXCIsXCJuZXF1aXZcIjpcIlxcdTIyNjJcIixcIm5lc2VhclwiOlwiXFx1MjkyOFwiLFwibmVzaW1cIjpcIlxcdTIyNDJcXHUwMzM4XCIsXCJOZXN0ZWRHcmVhdGVyR3JlYXRlclwiOlwiXFx1MjI2QlwiLFwiTmVzdGVkTGVzc0xlc3NcIjpcIlxcdTIyNkFcIixcIk5ld0xpbmVcIjpcIlxcblwiLFwibmV4aXN0XCI6XCJcXHUyMjA0XCIsXCJuZXhpc3RzXCI6XCJcXHUyMjA0XCIsXCJOZnJcIjpcIlxcdUQ4MzVcXHVERDExXCIsXCJuZnJcIjpcIlxcdUQ4MzVcXHVERDJCXCIsXCJuZ0VcIjpcIlxcdTIyNjdcXHUwMzM4XCIsXCJuZ2VcIjpcIlxcdTIyNzFcIixcIm5nZXFcIjpcIlxcdTIyNzFcIixcIm5nZXFxXCI6XCJcXHUyMjY3XFx1MDMzOFwiLFwibmdlcXNsYW50XCI6XCJcXHUyQTdFXFx1MDMzOFwiLFwibmdlc1wiOlwiXFx1MkE3RVxcdTAzMzhcIixcIm5HZ1wiOlwiXFx1MjJEOVxcdTAzMzhcIixcIm5nc2ltXCI6XCJcXHUyMjc1XCIsXCJuR3RcIjpcIlxcdTIyNkJcXHUyMEQyXCIsXCJuZ3RcIjpcIlxcdTIyNkZcIixcIm5ndHJcIjpcIlxcdTIyNkZcIixcIm5HdHZcIjpcIlxcdTIyNkJcXHUwMzM4XCIsXCJuaGFyclwiOlwiXFx1MjFBRVwiLFwibmhBcnJcIjpcIlxcdTIxQ0VcIixcIm5ocGFyXCI6XCJcXHUyQUYyXCIsXCJuaVwiOlwiXFx1MjIwQlwiLFwibmlzXCI6XCJcXHUyMkZDXCIsXCJuaXNkXCI6XCJcXHUyMkZBXCIsXCJuaXZcIjpcIlxcdTIyMEJcIixcIk5KY3lcIjpcIlxcdTA0MEFcIixcIm5qY3lcIjpcIlxcdTA0NUFcIixcIm5sYXJyXCI6XCJcXHUyMTlBXCIsXCJubEFyclwiOlwiXFx1MjFDRFwiLFwibmxkclwiOlwiXFx1MjAyNVwiLFwibmxFXCI6XCJcXHUyMjY2XFx1MDMzOFwiLFwibmxlXCI6XCJcXHUyMjcwXCIsXCJubGVmdGFycm93XCI6XCJcXHUyMTlBXCIsXCJuTGVmdGFycm93XCI6XCJcXHUyMUNEXCIsXCJubGVmdHJpZ2h0YXJyb3dcIjpcIlxcdTIxQUVcIixcIm5MZWZ0cmlnaHRhcnJvd1wiOlwiXFx1MjFDRVwiLFwibmxlcVwiOlwiXFx1MjI3MFwiLFwibmxlcXFcIjpcIlxcdTIyNjZcXHUwMzM4XCIsXCJubGVxc2xhbnRcIjpcIlxcdTJBN0RcXHUwMzM4XCIsXCJubGVzXCI6XCJcXHUyQTdEXFx1MDMzOFwiLFwibmxlc3NcIjpcIlxcdTIyNkVcIixcIm5MbFwiOlwiXFx1MjJEOFxcdTAzMzhcIixcIm5sc2ltXCI6XCJcXHUyMjc0XCIsXCJuTHRcIjpcIlxcdTIyNkFcXHUyMEQyXCIsXCJubHRcIjpcIlxcdTIyNkVcIixcIm5sdHJpXCI6XCJcXHUyMkVBXCIsXCJubHRyaWVcIjpcIlxcdTIyRUNcIixcIm5MdHZcIjpcIlxcdTIyNkFcXHUwMzM4XCIsXCJubWlkXCI6XCJcXHUyMjI0XCIsXCJOb0JyZWFrXCI6XCJcXHUyMDYwXCIsXCJOb25CcmVha2luZ1NwYWNlXCI6XCJcXHUwMEEwXCIsXCJub3BmXCI6XCJcXHVEODM1XFx1REQ1RlwiLFwiTm9wZlwiOlwiXFx1MjExNVwiLFwiTm90XCI6XCJcXHUyQUVDXCIsXCJub3RcIjpcIlxcdTAwQUNcIixcIk5vdENvbmdydWVudFwiOlwiXFx1MjI2MlwiLFwiTm90Q3VwQ2FwXCI6XCJcXHUyMjZEXCIsXCJOb3REb3VibGVWZXJ0aWNhbEJhclwiOlwiXFx1MjIyNlwiLFwiTm90RWxlbWVudFwiOlwiXFx1MjIwOVwiLFwiTm90RXF1YWxcIjpcIlxcdTIyNjBcIixcIk5vdEVxdWFsVGlsZGVcIjpcIlxcdTIyNDJcXHUwMzM4XCIsXCJOb3RFeGlzdHNcIjpcIlxcdTIyMDRcIixcIk5vdEdyZWF0ZXJcIjpcIlxcdTIyNkZcIixcIk5vdEdyZWF0ZXJFcXVhbFwiOlwiXFx1MjI3MVwiLFwiTm90R3JlYXRlckZ1bGxFcXVhbFwiOlwiXFx1MjI2N1xcdTAzMzhcIixcIk5vdEdyZWF0ZXJHcmVhdGVyXCI6XCJcXHUyMjZCXFx1MDMzOFwiLFwiTm90R3JlYXRlckxlc3NcIjpcIlxcdTIyNzlcIixcIk5vdEdyZWF0ZXJTbGFudEVxdWFsXCI6XCJcXHUyQTdFXFx1MDMzOFwiLFwiTm90R3JlYXRlclRpbGRlXCI6XCJcXHUyMjc1XCIsXCJOb3RIdW1wRG93bkh1bXBcIjpcIlxcdTIyNEVcXHUwMzM4XCIsXCJOb3RIdW1wRXF1YWxcIjpcIlxcdTIyNEZcXHUwMzM4XCIsXCJub3RpblwiOlwiXFx1MjIwOVwiLFwibm90aW5kb3RcIjpcIlxcdTIyRjVcXHUwMzM4XCIsXCJub3RpbkVcIjpcIlxcdTIyRjlcXHUwMzM4XCIsXCJub3RpbnZhXCI6XCJcXHUyMjA5XCIsXCJub3RpbnZiXCI6XCJcXHUyMkY3XCIsXCJub3RpbnZjXCI6XCJcXHUyMkY2XCIsXCJOb3RMZWZ0VHJpYW5nbGVCYXJcIjpcIlxcdTI5Q0ZcXHUwMzM4XCIsXCJOb3RMZWZ0VHJpYW5nbGVcIjpcIlxcdTIyRUFcIixcIk5vdExlZnRUcmlhbmdsZUVxdWFsXCI6XCJcXHUyMkVDXCIsXCJOb3RMZXNzXCI6XCJcXHUyMjZFXCIsXCJOb3RMZXNzRXF1YWxcIjpcIlxcdTIyNzBcIixcIk5vdExlc3NHcmVhdGVyXCI6XCJcXHUyMjc4XCIsXCJOb3RMZXNzTGVzc1wiOlwiXFx1MjI2QVxcdTAzMzhcIixcIk5vdExlc3NTbGFudEVxdWFsXCI6XCJcXHUyQTdEXFx1MDMzOFwiLFwiTm90TGVzc1RpbGRlXCI6XCJcXHUyMjc0XCIsXCJOb3ROZXN0ZWRHcmVhdGVyR3JlYXRlclwiOlwiXFx1MkFBMlxcdTAzMzhcIixcIk5vdE5lc3RlZExlc3NMZXNzXCI6XCJcXHUyQUExXFx1MDMzOFwiLFwibm90bmlcIjpcIlxcdTIyMENcIixcIm5vdG5pdmFcIjpcIlxcdTIyMENcIixcIm5vdG5pdmJcIjpcIlxcdTIyRkVcIixcIm5vdG5pdmNcIjpcIlxcdTIyRkRcIixcIk5vdFByZWNlZGVzXCI6XCJcXHUyMjgwXCIsXCJOb3RQcmVjZWRlc0VxdWFsXCI6XCJcXHUyQUFGXFx1MDMzOFwiLFwiTm90UHJlY2VkZXNTbGFudEVxdWFsXCI6XCJcXHUyMkUwXCIsXCJOb3RSZXZlcnNlRWxlbWVudFwiOlwiXFx1MjIwQ1wiLFwiTm90UmlnaHRUcmlhbmdsZUJhclwiOlwiXFx1MjlEMFxcdTAzMzhcIixcIk5vdFJpZ2h0VHJpYW5nbGVcIjpcIlxcdTIyRUJcIixcIk5vdFJpZ2h0VHJpYW5nbGVFcXVhbFwiOlwiXFx1MjJFRFwiLFwiTm90U3F1YXJlU3Vic2V0XCI6XCJcXHUyMjhGXFx1MDMzOFwiLFwiTm90U3F1YXJlU3Vic2V0RXF1YWxcIjpcIlxcdTIyRTJcIixcIk5vdFNxdWFyZVN1cGVyc2V0XCI6XCJcXHUyMjkwXFx1MDMzOFwiLFwiTm90U3F1YXJlU3VwZXJzZXRFcXVhbFwiOlwiXFx1MjJFM1wiLFwiTm90U3Vic2V0XCI6XCJcXHUyMjgyXFx1MjBEMlwiLFwiTm90U3Vic2V0RXF1YWxcIjpcIlxcdTIyODhcIixcIk5vdFN1Y2NlZWRzXCI6XCJcXHUyMjgxXCIsXCJOb3RTdWNjZWVkc0VxdWFsXCI6XCJcXHUyQUIwXFx1MDMzOFwiLFwiTm90U3VjY2VlZHNTbGFudEVxdWFsXCI6XCJcXHUyMkUxXCIsXCJOb3RTdWNjZWVkc1RpbGRlXCI6XCJcXHUyMjdGXFx1MDMzOFwiLFwiTm90U3VwZXJzZXRcIjpcIlxcdTIyODNcXHUyMEQyXCIsXCJOb3RTdXBlcnNldEVxdWFsXCI6XCJcXHUyMjg5XCIsXCJOb3RUaWxkZVwiOlwiXFx1MjI0MVwiLFwiTm90VGlsZGVFcXVhbFwiOlwiXFx1MjI0NFwiLFwiTm90VGlsZGVGdWxsRXF1YWxcIjpcIlxcdTIyNDdcIixcIk5vdFRpbGRlVGlsZGVcIjpcIlxcdTIyNDlcIixcIk5vdFZlcnRpY2FsQmFyXCI6XCJcXHUyMjI0XCIsXCJucGFyYWxsZWxcIjpcIlxcdTIyMjZcIixcIm5wYXJcIjpcIlxcdTIyMjZcIixcIm5wYXJzbFwiOlwiXFx1MkFGRFxcdTIwRTVcIixcIm5wYXJ0XCI6XCJcXHUyMjAyXFx1MDMzOFwiLFwibnBvbGludFwiOlwiXFx1MkExNFwiLFwibnByXCI6XCJcXHUyMjgwXCIsXCJucHJjdWVcIjpcIlxcdTIyRTBcIixcIm5wcmVjXCI6XCJcXHUyMjgwXCIsXCJucHJlY2VxXCI6XCJcXHUyQUFGXFx1MDMzOFwiLFwibnByZVwiOlwiXFx1MkFBRlxcdTAzMzhcIixcIm5yYXJyY1wiOlwiXFx1MjkzM1xcdTAzMzhcIixcIm5yYXJyXCI6XCJcXHUyMTlCXCIsXCJuckFyclwiOlwiXFx1MjFDRlwiLFwibnJhcnJ3XCI6XCJcXHUyMTlEXFx1MDMzOFwiLFwibnJpZ2h0YXJyb3dcIjpcIlxcdTIxOUJcIixcIm5SaWdodGFycm93XCI6XCJcXHUyMUNGXCIsXCJucnRyaVwiOlwiXFx1MjJFQlwiLFwibnJ0cmllXCI6XCJcXHUyMkVEXCIsXCJuc2NcIjpcIlxcdTIyODFcIixcIm5zY2N1ZVwiOlwiXFx1MjJFMVwiLFwibnNjZVwiOlwiXFx1MkFCMFxcdTAzMzhcIixcIk5zY3JcIjpcIlxcdUQ4MzVcXHVEQ0E5XCIsXCJuc2NyXCI6XCJcXHVEODM1XFx1RENDM1wiLFwibnNob3J0bWlkXCI6XCJcXHUyMjI0XCIsXCJuc2hvcnRwYXJhbGxlbFwiOlwiXFx1MjIyNlwiLFwibnNpbVwiOlwiXFx1MjI0MVwiLFwibnNpbWVcIjpcIlxcdTIyNDRcIixcIm5zaW1lcVwiOlwiXFx1MjI0NFwiLFwibnNtaWRcIjpcIlxcdTIyMjRcIixcIm5zcGFyXCI6XCJcXHUyMjI2XCIsXCJuc3FzdWJlXCI6XCJcXHUyMkUyXCIsXCJuc3FzdXBlXCI6XCJcXHUyMkUzXCIsXCJuc3ViXCI6XCJcXHUyMjg0XCIsXCJuc3ViRVwiOlwiXFx1MkFDNVxcdTAzMzhcIixcIm5zdWJlXCI6XCJcXHUyMjg4XCIsXCJuc3Vic2V0XCI6XCJcXHUyMjgyXFx1MjBEMlwiLFwibnN1YnNldGVxXCI6XCJcXHUyMjg4XCIsXCJuc3Vic2V0ZXFxXCI6XCJcXHUyQUM1XFx1MDMzOFwiLFwibnN1Y2NcIjpcIlxcdTIyODFcIixcIm5zdWNjZXFcIjpcIlxcdTJBQjBcXHUwMzM4XCIsXCJuc3VwXCI6XCJcXHUyMjg1XCIsXCJuc3VwRVwiOlwiXFx1MkFDNlxcdTAzMzhcIixcIm5zdXBlXCI6XCJcXHUyMjg5XCIsXCJuc3Vwc2V0XCI6XCJcXHUyMjgzXFx1MjBEMlwiLFwibnN1cHNldGVxXCI6XCJcXHUyMjg5XCIsXCJuc3Vwc2V0ZXFxXCI6XCJcXHUyQUM2XFx1MDMzOFwiLFwibnRnbFwiOlwiXFx1MjI3OVwiLFwiTnRpbGRlXCI6XCJcXHUwMEQxXCIsXCJudGlsZGVcIjpcIlxcdTAwRjFcIixcIm50bGdcIjpcIlxcdTIyNzhcIixcIm50cmlhbmdsZWxlZnRcIjpcIlxcdTIyRUFcIixcIm50cmlhbmdsZWxlZnRlcVwiOlwiXFx1MjJFQ1wiLFwibnRyaWFuZ2xlcmlnaHRcIjpcIlxcdTIyRUJcIixcIm50cmlhbmdsZXJpZ2h0ZXFcIjpcIlxcdTIyRURcIixcIk51XCI6XCJcXHUwMzlEXCIsXCJudVwiOlwiXFx1MDNCRFwiLFwibnVtXCI6XCIjXCIsXCJudW1lcm9cIjpcIlxcdTIxMTZcIixcIm51bXNwXCI6XCJcXHUyMDA3XCIsXCJudmFwXCI6XCJcXHUyMjREXFx1MjBEMlwiLFwibnZkYXNoXCI6XCJcXHUyMkFDXCIsXCJudkRhc2hcIjpcIlxcdTIyQURcIixcIm5WZGFzaFwiOlwiXFx1MjJBRVwiLFwiblZEYXNoXCI6XCJcXHUyMkFGXCIsXCJudmdlXCI6XCJcXHUyMjY1XFx1MjBEMlwiLFwibnZndFwiOlwiPlxcdTIwRDJcIixcIm52SGFyclwiOlwiXFx1MjkwNFwiLFwibnZpbmZpblwiOlwiXFx1MjlERVwiLFwibnZsQXJyXCI6XCJcXHUyOTAyXCIsXCJudmxlXCI6XCJcXHUyMjY0XFx1MjBEMlwiLFwibnZsdFwiOlwiPFxcdTIwRDJcIixcIm52bHRyaWVcIjpcIlxcdTIyQjRcXHUyMEQyXCIsXCJudnJBcnJcIjpcIlxcdTI5MDNcIixcIm52cnRyaWVcIjpcIlxcdTIyQjVcXHUyMEQyXCIsXCJudnNpbVwiOlwiXFx1MjIzQ1xcdTIwRDJcIixcIm53YXJoa1wiOlwiXFx1MjkyM1wiLFwibndhcnJcIjpcIlxcdTIxOTZcIixcIm53QXJyXCI6XCJcXHUyMUQ2XCIsXCJud2Fycm93XCI6XCJcXHUyMTk2XCIsXCJud25lYXJcIjpcIlxcdTI5MjdcIixcIk9hY3V0ZVwiOlwiXFx1MDBEM1wiLFwib2FjdXRlXCI6XCJcXHUwMEYzXCIsXCJvYXN0XCI6XCJcXHUyMjlCXCIsXCJPY2lyY1wiOlwiXFx1MDBENFwiLFwib2NpcmNcIjpcIlxcdTAwRjRcIixcIm9jaXJcIjpcIlxcdTIyOUFcIixcIk9jeVwiOlwiXFx1MDQxRVwiLFwib2N5XCI6XCJcXHUwNDNFXCIsXCJvZGFzaFwiOlwiXFx1MjI5RFwiLFwiT2RibGFjXCI6XCJcXHUwMTUwXCIsXCJvZGJsYWNcIjpcIlxcdTAxNTFcIixcIm9kaXZcIjpcIlxcdTJBMzhcIixcIm9kb3RcIjpcIlxcdTIyOTlcIixcIm9kc29sZFwiOlwiXFx1MjlCQ1wiLFwiT0VsaWdcIjpcIlxcdTAxNTJcIixcIm9lbGlnXCI6XCJcXHUwMTUzXCIsXCJvZmNpclwiOlwiXFx1MjlCRlwiLFwiT2ZyXCI6XCJcXHVEODM1XFx1REQxMlwiLFwib2ZyXCI6XCJcXHVEODM1XFx1REQyQ1wiLFwib2dvblwiOlwiXFx1MDJEQlwiLFwiT2dyYXZlXCI6XCJcXHUwMEQyXCIsXCJvZ3JhdmVcIjpcIlxcdTAwRjJcIixcIm9ndFwiOlwiXFx1MjlDMVwiLFwib2hiYXJcIjpcIlxcdTI5QjVcIixcIm9obVwiOlwiXFx1MDNBOVwiLFwib2ludFwiOlwiXFx1MjIyRVwiLFwib2xhcnJcIjpcIlxcdTIxQkFcIixcIm9sY2lyXCI6XCJcXHUyOUJFXCIsXCJvbGNyb3NzXCI6XCJcXHUyOUJCXCIsXCJvbGluZVwiOlwiXFx1MjAzRVwiLFwib2x0XCI6XCJcXHUyOUMwXCIsXCJPbWFjclwiOlwiXFx1MDE0Q1wiLFwib21hY3JcIjpcIlxcdTAxNERcIixcIk9tZWdhXCI6XCJcXHUwM0E5XCIsXCJvbWVnYVwiOlwiXFx1MDNDOVwiLFwiT21pY3JvblwiOlwiXFx1MDM5RlwiLFwib21pY3JvblwiOlwiXFx1MDNCRlwiLFwib21pZFwiOlwiXFx1MjlCNlwiLFwib21pbnVzXCI6XCJcXHUyMjk2XCIsXCJPb3BmXCI6XCJcXHVEODM1XFx1REQ0NlwiLFwib29wZlwiOlwiXFx1RDgzNVxcdURENjBcIixcIm9wYXJcIjpcIlxcdTI5QjdcIixcIk9wZW5DdXJseURvdWJsZVF1b3RlXCI6XCJcXHUyMDFDXCIsXCJPcGVuQ3VybHlRdW90ZVwiOlwiXFx1MjAxOFwiLFwib3BlcnBcIjpcIlxcdTI5QjlcIixcIm9wbHVzXCI6XCJcXHUyMjk1XCIsXCJvcmFyclwiOlwiXFx1MjFCQlwiLFwiT3JcIjpcIlxcdTJBNTRcIixcIm9yXCI6XCJcXHUyMjI4XCIsXCJvcmRcIjpcIlxcdTJBNURcIixcIm9yZGVyXCI6XCJcXHUyMTM0XCIsXCJvcmRlcm9mXCI6XCJcXHUyMTM0XCIsXCJvcmRmXCI6XCJcXHUwMEFBXCIsXCJvcmRtXCI6XCJcXHUwMEJBXCIsXCJvcmlnb2ZcIjpcIlxcdTIyQjZcIixcIm9yb3JcIjpcIlxcdTJBNTZcIixcIm9yc2xvcGVcIjpcIlxcdTJBNTdcIixcIm9ydlwiOlwiXFx1MkE1QlwiLFwib1NcIjpcIlxcdTI0QzhcIixcIk9zY3JcIjpcIlxcdUQ4MzVcXHVEQ0FBXCIsXCJvc2NyXCI6XCJcXHUyMTM0XCIsXCJPc2xhc2hcIjpcIlxcdTAwRDhcIixcIm9zbGFzaFwiOlwiXFx1MDBGOFwiLFwib3NvbFwiOlwiXFx1MjI5OFwiLFwiT3RpbGRlXCI6XCJcXHUwMEQ1XCIsXCJvdGlsZGVcIjpcIlxcdTAwRjVcIixcIm90aW1lc2FzXCI6XCJcXHUyQTM2XCIsXCJPdGltZXNcIjpcIlxcdTJBMzdcIixcIm90aW1lc1wiOlwiXFx1MjI5N1wiLFwiT3VtbFwiOlwiXFx1MDBENlwiLFwib3VtbFwiOlwiXFx1MDBGNlwiLFwib3ZiYXJcIjpcIlxcdTIzM0RcIixcIk92ZXJCYXJcIjpcIlxcdTIwM0VcIixcIk92ZXJCcmFjZVwiOlwiXFx1MjNERVwiLFwiT3ZlckJyYWNrZXRcIjpcIlxcdTIzQjRcIixcIk92ZXJQYXJlbnRoZXNpc1wiOlwiXFx1MjNEQ1wiLFwicGFyYVwiOlwiXFx1MDBCNlwiLFwicGFyYWxsZWxcIjpcIlxcdTIyMjVcIixcInBhclwiOlwiXFx1MjIyNVwiLFwicGFyc2ltXCI6XCJcXHUyQUYzXCIsXCJwYXJzbFwiOlwiXFx1MkFGRFwiLFwicGFydFwiOlwiXFx1MjIwMlwiLFwiUGFydGlhbERcIjpcIlxcdTIyMDJcIixcIlBjeVwiOlwiXFx1MDQxRlwiLFwicGN5XCI6XCJcXHUwNDNGXCIsXCJwZXJjbnRcIjpcIiVcIixcInBlcmlvZFwiOlwiLlwiLFwicGVybWlsXCI6XCJcXHUyMDMwXCIsXCJwZXJwXCI6XCJcXHUyMkE1XCIsXCJwZXJ0ZW5rXCI6XCJcXHUyMDMxXCIsXCJQZnJcIjpcIlxcdUQ4MzVcXHVERDEzXCIsXCJwZnJcIjpcIlxcdUQ4MzVcXHVERDJEXCIsXCJQaGlcIjpcIlxcdTAzQTZcIixcInBoaVwiOlwiXFx1MDNDNlwiLFwicGhpdlwiOlwiXFx1MDNENVwiLFwicGhtbWF0XCI6XCJcXHUyMTMzXCIsXCJwaG9uZVwiOlwiXFx1MjYwRVwiLFwiUGlcIjpcIlxcdTAzQTBcIixcInBpXCI6XCJcXHUwM0MwXCIsXCJwaXRjaGZvcmtcIjpcIlxcdTIyRDRcIixcInBpdlwiOlwiXFx1MDNENlwiLFwicGxhbmNrXCI6XCJcXHUyMTBGXCIsXCJwbGFuY2toXCI6XCJcXHUyMTBFXCIsXCJwbGFua3ZcIjpcIlxcdTIxMEZcIixcInBsdXNhY2lyXCI6XCJcXHUyQTIzXCIsXCJwbHVzYlwiOlwiXFx1MjI5RVwiLFwicGx1c2NpclwiOlwiXFx1MkEyMlwiLFwicGx1c1wiOlwiK1wiLFwicGx1c2RvXCI6XCJcXHUyMjE0XCIsXCJwbHVzZHVcIjpcIlxcdTJBMjVcIixcInBsdXNlXCI6XCJcXHUyQTcyXCIsXCJQbHVzTWludXNcIjpcIlxcdTAwQjFcIixcInBsdXNtblwiOlwiXFx1MDBCMVwiLFwicGx1c3NpbVwiOlwiXFx1MkEyNlwiLFwicGx1c3R3b1wiOlwiXFx1MkEyN1wiLFwicG1cIjpcIlxcdTAwQjFcIixcIlBvaW5jYXJlcGxhbmVcIjpcIlxcdTIxMENcIixcInBvaW50aW50XCI6XCJcXHUyQTE1XCIsXCJwb3BmXCI6XCJcXHVEODM1XFx1REQ2MVwiLFwiUG9wZlwiOlwiXFx1MjExOVwiLFwicG91bmRcIjpcIlxcdTAwQTNcIixcInByYXBcIjpcIlxcdTJBQjdcIixcIlByXCI6XCJcXHUyQUJCXCIsXCJwclwiOlwiXFx1MjI3QVwiLFwicHJjdWVcIjpcIlxcdTIyN0NcIixcInByZWNhcHByb3hcIjpcIlxcdTJBQjdcIixcInByZWNcIjpcIlxcdTIyN0FcIixcInByZWNjdXJseWVxXCI6XCJcXHUyMjdDXCIsXCJQcmVjZWRlc1wiOlwiXFx1MjI3QVwiLFwiUHJlY2VkZXNFcXVhbFwiOlwiXFx1MkFBRlwiLFwiUHJlY2VkZXNTbGFudEVxdWFsXCI6XCJcXHUyMjdDXCIsXCJQcmVjZWRlc1RpbGRlXCI6XCJcXHUyMjdFXCIsXCJwcmVjZXFcIjpcIlxcdTJBQUZcIixcInByZWNuYXBwcm94XCI6XCJcXHUyQUI5XCIsXCJwcmVjbmVxcVwiOlwiXFx1MkFCNVwiLFwicHJlY25zaW1cIjpcIlxcdTIyRThcIixcInByZVwiOlwiXFx1MkFBRlwiLFwicHJFXCI6XCJcXHUyQUIzXCIsXCJwcmVjc2ltXCI6XCJcXHUyMjdFXCIsXCJwcmltZVwiOlwiXFx1MjAzMlwiLFwiUHJpbWVcIjpcIlxcdTIwMzNcIixcInByaW1lc1wiOlwiXFx1MjExOVwiLFwicHJuYXBcIjpcIlxcdTJBQjlcIixcInBybkVcIjpcIlxcdTJBQjVcIixcInBybnNpbVwiOlwiXFx1MjJFOFwiLFwicHJvZFwiOlwiXFx1MjIwRlwiLFwiUHJvZHVjdFwiOlwiXFx1MjIwRlwiLFwicHJvZmFsYXJcIjpcIlxcdTIzMkVcIixcInByb2ZsaW5lXCI6XCJcXHUyMzEyXCIsXCJwcm9mc3VyZlwiOlwiXFx1MjMxM1wiLFwicHJvcFwiOlwiXFx1MjIxRFwiLFwiUHJvcG9ydGlvbmFsXCI6XCJcXHUyMjFEXCIsXCJQcm9wb3J0aW9uXCI6XCJcXHUyMjM3XCIsXCJwcm9wdG9cIjpcIlxcdTIyMURcIixcInByc2ltXCI6XCJcXHUyMjdFXCIsXCJwcnVyZWxcIjpcIlxcdTIyQjBcIixcIlBzY3JcIjpcIlxcdUQ4MzVcXHVEQ0FCXCIsXCJwc2NyXCI6XCJcXHVEODM1XFx1RENDNVwiLFwiUHNpXCI6XCJcXHUwM0E4XCIsXCJwc2lcIjpcIlxcdTAzQzhcIixcInB1bmNzcFwiOlwiXFx1MjAwOFwiLFwiUWZyXCI6XCJcXHVEODM1XFx1REQxNFwiLFwicWZyXCI6XCJcXHVEODM1XFx1REQyRVwiLFwicWludFwiOlwiXFx1MkEwQ1wiLFwicW9wZlwiOlwiXFx1RDgzNVxcdURENjJcIixcIlFvcGZcIjpcIlxcdTIxMUFcIixcInFwcmltZVwiOlwiXFx1MjA1N1wiLFwiUXNjclwiOlwiXFx1RDgzNVxcdURDQUNcIixcInFzY3JcIjpcIlxcdUQ4MzVcXHVEQ0M2XCIsXCJxdWF0ZXJuaW9uc1wiOlwiXFx1MjEwRFwiLFwicXVhdGludFwiOlwiXFx1MkExNlwiLFwicXVlc3RcIjpcIj9cIixcInF1ZXN0ZXFcIjpcIlxcdTIyNUZcIixcInF1b3RcIjpcIlxcXCJcIixcIlFVT1RcIjpcIlxcXCJcIixcInJBYXJyXCI6XCJcXHUyMURCXCIsXCJyYWNlXCI6XCJcXHUyMjNEXFx1MDMzMVwiLFwiUmFjdXRlXCI6XCJcXHUwMTU0XCIsXCJyYWN1dGVcIjpcIlxcdTAxNTVcIixcInJhZGljXCI6XCJcXHUyMjFBXCIsXCJyYWVtcHR5dlwiOlwiXFx1MjlCM1wiLFwicmFuZ1wiOlwiXFx1MjdFOVwiLFwiUmFuZ1wiOlwiXFx1MjdFQlwiLFwicmFuZ2RcIjpcIlxcdTI5OTJcIixcInJhbmdlXCI6XCJcXHUyOUE1XCIsXCJyYW5nbGVcIjpcIlxcdTI3RTlcIixcInJhcXVvXCI6XCJcXHUwMEJCXCIsXCJyYXJyYXBcIjpcIlxcdTI5NzVcIixcInJhcnJiXCI6XCJcXHUyMUU1XCIsXCJyYXJyYmZzXCI6XCJcXHUyOTIwXCIsXCJyYXJyY1wiOlwiXFx1MjkzM1wiLFwicmFyclwiOlwiXFx1MjE5MlwiLFwiUmFyclwiOlwiXFx1MjFBMFwiLFwickFyclwiOlwiXFx1MjFEMlwiLFwicmFycmZzXCI6XCJcXHUyOTFFXCIsXCJyYXJyaGtcIjpcIlxcdTIxQUFcIixcInJhcnJscFwiOlwiXFx1MjFBQ1wiLFwicmFycnBsXCI6XCJcXHUyOTQ1XCIsXCJyYXJyc2ltXCI6XCJcXHUyOTc0XCIsXCJSYXJydGxcIjpcIlxcdTI5MTZcIixcInJhcnJ0bFwiOlwiXFx1MjFBM1wiLFwicmFycndcIjpcIlxcdTIxOURcIixcInJhdGFpbFwiOlwiXFx1MjkxQVwiLFwickF0YWlsXCI6XCJcXHUyOTFDXCIsXCJyYXRpb1wiOlwiXFx1MjIzNlwiLFwicmF0aW9uYWxzXCI6XCJcXHUyMTFBXCIsXCJyYmFyclwiOlwiXFx1MjkwRFwiLFwickJhcnJcIjpcIlxcdTI5MEZcIixcIlJCYXJyXCI6XCJcXHUyOTEwXCIsXCJyYmJya1wiOlwiXFx1Mjc3M1wiLFwicmJyYWNlXCI6XCJ9XCIsXCJyYnJhY2tcIjpcIl1cIixcInJicmtlXCI6XCJcXHUyOThDXCIsXCJyYnJrc2xkXCI6XCJcXHUyOThFXCIsXCJyYnJrc2x1XCI6XCJcXHUyOTkwXCIsXCJSY2Fyb25cIjpcIlxcdTAxNThcIixcInJjYXJvblwiOlwiXFx1MDE1OVwiLFwiUmNlZGlsXCI6XCJcXHUwMTU2XCIsXCJyY2VkaWxcIjpcIlxcdTAxNTdcIixcInJjZWlsXCI6XCJcXHUyMzA5XCIsXCJyY3ViXCI6XCJ9XCIsXCJSY3lcIjpcIlxcdTA0MjBcIixcInJjeVwiOlwiXFx1MDQ0MFwiLFwicmRjYVwiOlwiXFx1MjkzN1wiLFwicmRsZGhhclwiOlwiXFx1Mjk2OVwiLFwicmRxdW9cIjpcIlxcdTIwMURcIixcInJkcXVvclwiOlwiXFx1MjAxRFwiLFwicmRzaFwiOlwiXFx1MjFCM1wiLFwicmVhbFwiOlwiXFx1MjExQ1wiLFwicmVhbGluZVwiOlwiXFx1MjExQlwiLFwicmVhbHBhcnRcIjpcIlxcdTIxMUNcIixcInJlYWxzXCI6XCJcXHUyMTFEXCIsXCJSZVwiOlwiXFx1MjExQ1wiLFwicmVjdFwiOlwiXFx1MjVBRFwiLFwicmVnXCI6XCJcXHUwMEFFXCIsXCJSRUdcIjpcIlxcdTAwQUVcIixcIlJldmVyc2VFbGVtZW50XCI6XCJcXHUyMjBCXCIsXCJSZXZlcnNlRXF1aWxpYnJpdW1cIjpcIlxcdTIxQ0JcIixcIlJldmVyc2VVcEVxdWlsaWJyaXVtXCI6XCJcXHUyOTZGXCIsXCJyZmlzaHRcIjpcIlxcdTI5N0RcIixcInJmbG9vclwiOlwiXFx1MjMwQlwiLFwicmZyXCI6XCJcXHVEODM1XFx1REQyRlwiLFwiUmZyXCI6XCJcXHUyMTFDXCIsXCJySGFyXCI6XCJcXHUyOTY0XCIsXCJyaGFyZFwiOlwiXFx1MjFDMVwiLFwicmhhcnVcIjpcIlxcdTIxQzBcIixcInJoYXJ1bFwiOlwiXFx1Mjk2Q1wiLFwiUmhvXCI6XCJcXHUwM0ExXCIsXCJyaG9cIjpcIlxcdTAzQzFcIixcInJob3ZcIjpcIlxcdTAzRjFcIixcIlJpZ2h0QW5nbGVCcmFja2V0XCI6XCJcXHUyN0U5XCIsXCJSaWdodEFycm93QmFyXCI6XCJcXHUyMUU1XCIsXCJyaWdodGFycm93XCI6XCJcXHUyMTkyXCIsXCJSaWdodEFycm93XCI6XCJcXHUyMTkyXCIsXCJSaWdodGFycm93XCI6XCJcXHUyMUQyXCIsXCJSaWdodEFycm93TGVmdEFycm93XCI6XCJcXHUyMUM0XCIsXCJyaWdodGFycm93dGFpbFwiOlwiXFx1MjFBM1wiLFwiUmlnaHRDZWlsaW5nXCI6XCJcXHUyMzA5XCIsXCJSaWdodERvdWJsZUJyYWNrZXRcIjpcIlxcdTI3RTdcIixcIlJpZ2h0RG93blRlZVZlY3RvclwiOlwiXFx1Mjk1RFwiLFwiUmlnaHREb3duVmVjdG9yQmFyXCI6XCJcXHUyOTU1XCIsXCJSaWdodERvd25WZWN0b3JcIjpcIlxcdTIxQzJcIixcIlJpZ2h0Rmxvb3JcIjpcIlxcdTIzMEJcIixcInJpZ2h0aGFycG9vbmRvd25cIjpcIlxcdTIxQzFcIixcInJpZ2h0aGFycG9vbnVwXCI6XCJcXHUyMUMwXCIsXCJyaWdodGxlZnRhcnJvd3NcIjpcIlxcdTIxQzRcIixcInJpZ2h0bGVmdGhhcnBvb25zXCI6XCJcXHUyMUNDXCIsXCJyaWdodHJpZ2h0YXJyb3dzXCI6XCJcXHUyMUM5XCIsXCJyaWdodHNxdWlnYXJyb3dcIjpcIlxcdTIxOURcIixcIlJpZ2h0VGVlQXJyb3dcIjpcIlxcdTIxQTZcIixcIlJpZ2h0VGVlXCI6XCJcXHUyMkEyXCIsXCJSaWdodFRlZVZlY3RvclwiOlwiXFx1Mjk1QlwiLFwicmlnaHR0aHJlZXRpbWVzXCI6XCJcXHUyMkNDXCIsXCJSaWdodFRyaWFuZ2xlQmFyXCI6XCJcXHUyOUQwXCIsXCJSaWdodFRyaWFuZ2xlXCI6XCJcXHUyMkIzXCIsXCJSaWdodFRyaWFuZ2xlRXF1YWxcIjpcIlxcdTIyQjVcIixcIlJpZ2h0VXBEb3duVmVjdG9yXCI6XCJcXHUyOTRGXCIsXCJSaWdodFVwVGVlVmVjdG9yXCI6XCJcXHUyOTVDXCIsXCJSaWdodFVwVmVjdG9yQmFyXCI6XCJcXHUyOTU0XCIsXCJSaWdodFVwVmVjdG9yXCI6XCJcXHUyMUJFXCIsXCJSaWdodFZlY3RvckJhclwiOlwiXFx1Mjk1M1wiLFwiUmlnaHRWZWN0b3JcIjpcIlxcdTIxQzBcIixcInJpbmdcIjpcIlxcdTAyREFcIixcInJpc2luZ2RvdHNlcVwiOlwiXFx1MjI1M1wiLFwicmxhcnJcIjpcIlxcdTIxQzRcIixcInJsaGFyXCI6XCJcXHUyMUNDXCIsXCJybG1cIjpcIlxcdTIwMEZcIixcInJtb3VzdGFjaGVcIjpcIlxcdTIzQjFcIixcInJtb3VzdFwiOlwiXFx1MjNCMVwiLFwicm5taWRcIjpcIlxcdTJBRUVcIixcInJvYW5nXCI6XCJcXHUyN0VEXCIsXCJyb2FyclwiOlwiXFx1MjFGRVwiLFwicm9icmtcIjpcIlxcdTI3RTdcIixcInJvcGFyXCI6XCJcXHUyOTg2XCIsXCJyb3BmXCI6XCJcXHVEODM1XFx1REQ2M1wiLFwiUm9wZlwiOlwiXFx1MjExRFwiLFwicm9wbHVzXCI6XCJcXHUyQTJFXCIsXCJyb3RpbWVzXCI6XCJcXHUyQTM1XCIsXCJSb3VuZEltcGxpZXNcIjpcIlxcdTI5NzBcIixcInJwYXJcIjpcIilcIixcInJwYXJndFwiOlwiXFx1Mjk5NFwiLFwicnBwb2xpbnRcIjpcIlxcdTJBMTJcIixcInJyYXJyXCI6XCJcXHUyMUM5XCIsXCJScmlnaHRhcnJvd1wiOlwiXFx1MjFEQlwiLFwicnNhcXVvXCI6XCJcXHUyMDNBXCIsXCJyc2NyXCI6XCJcXHVEODM1XFx1RENDN1wiLFwiUnNjclwiOlwiXFx1MjExQlwiLFwicnNoXCI6XCJcXHUyMUIxXCIsXCJSc2hcIjpcIlxcdTIxQjFcIixcInJzcWJcIjpcIl1cIixcInJzcXVvXCI6XCJcXHUyMDE5XCIsXCJyc3F1b3JcIjpcIlxcdTIwMTlcIixcInJ0aHJlZVwiOlwiXFx1MjJDQ1wiLFwicnRpbWVzXCI6XCJcXHUyMkNBXCIsXCJydHJpXCI6XCJcXHUyNUI5XCIsXCJydHJpZVwiOlwiXFx1MjJCNVwiLFwicnRyaWZcIjpcIlxcdTI1QjhcIixcInJ0cmlsdHJpXCI6XCJcXHUyOUNFXCIsXCJSdWxlRGVsYXllZFwiOlwiXFx1MjlGNFwiLFwicnVsdWhhclwiOlwiXFx1Mjk2OFwiLFwicnhcIjpcIlxcdTIxMUVcIixcIlNhY3V0ZVwiOlwiXFx1MDE1QVwiLFwic2FjdXRlXCI6XCJcXHUwMTVCXCIsXCJzYnF1b1wiOlwiXFx1MjAxQVwiLFwic2NhcFwiOlwiXFx1MkFCOFwiLFwiU2Nhcm9uXCI6XCJcXHUwMTYwXCIsXCJzY2Fyb25cIjpcIlxcdTAxNjFcIixcIlNjXCI6XCJcXHUyQUJDXCIsXCJzY1wiOlwiXFx1MjI3QlwiLFwic2NjdWVcIjpcIlxcdTIyN0RcIixcInNjZVwiOlwiXFx1MkFCMFwiLFwic2NFXCI6XCJcXHUyQUI0XCIsXCJTY2VkaWxcIjpcIlxcdTAxNUVcIixcInNjZWRpbFwiOlwiXFx1MDE1RlwiLFwiU2NpcmNcIjpcIlxcdTAxNUNcIixcInNjaXJjXCI6XCJcXHUwMTVEXCIsXCJzY25hcFwiOlwiXFx1MkFCQVwiLFwic2NuRVwiOlwiXFx1MkFCNlwiLFwic2Nuc2ltXCI6XCJcXHUyMkU5XCIsXCJzY3BvbGludFwiOlwiXFx1MkExM1wiLFwic2NzaW1cIjpcIlxcdTIyN0ZcIixcIlNjeVwiOlwiXFx1MDQyMVwiLFwic2N5XCI6XCJcXHUwNDQxXCIsXCJzZG90YlwiOlwiXFx1MjJBMVwiLFwic2RvdFwiOlwiXFx1MjJDNVwiLFwic2RvdGVcIjpcIlxcdTJBNjZcIixcInNlYXJoa1wiOlwiXFx1MjkyNVwiLFwic2VhcnJcIjpcIlxcdTIxOThcIixcInNlQXJyXCI6XCJcXHUyMUQ4XCIsXCJzZWFycm93XCI6XCJcXHUyMTk4XCIsXCJzZWN0XCI6XCJcXHUwMEE3XCIsXCJzZW1pXCI6XCI7XCIsXCJzZXN3YXJcIjpcIlxcdTI5MjlcIixcInNldG1pbnVzXCI6XCJcXHUyMjE2XCIsXCJzZXRtblwiOlwiXFx1MjIxNlwiLFwic2V4dFwiOlwiXFx1MjczNlwiLFwiU2ZyXCI6XCJcXHVEODM1XFx1REQxNlwiLFwic2ZyXCI6XCJcXHVEODM1XFx1REQzMFwiLFwic2Zyb3duXCI6XCJcXHUyMzIyXCIsXCJzaGFycFwiOlwiXFx1MjY2RlwiLFwiU0hDSGN5XCI6XCJcXHUwNDI5XCIsXCJzaGNoY3lcIjpcIlxcdTA0NDlcIixcIlNIY3lcIjpcIlxcdTA0MjhcIixcInNoY3lcIjpcIlxcdTA0NDhcIixcIlNob3J0RG93bkFycm93XCI6XCJcXHUyMTkzXCIsXCJTaG9ydExlZnRBcnJvd1wiOlwiXFx1MjE5MFwiLFwic2hvcnRtaWRcIjpcIlxcdTIyMjNcIixcInNob3J0cGFyYWxsZWxcIjpcIlxcdTIyMjVcIixcIlNob3J0UmlnaHRBcnJvd1wiOlwiXFx1MjE5MlwiLFwiU2hvcnRVcEFycm93XCI6XCJcXHUyMTkxXCIsXCJzaHlcIjpcIlxcdTAwQURcIixcIlNpZ21hXCI6XCJcXHUwM0EzXCIsXCJzaWdtYVwiOlwiXFx1MDNDM1wiLFwic2lnbWFmXCI6XCJcXHUwM0MyXCIsXCJzaWdtYXZcIjpcIlxcdTAzQzJcIixcInNpbVwiOlwiXFx1MjIzQ1wiLFwic2ltZG90XCI6XCJcXHUyQTZBXCIsXCJzaW1lXCI6XCJcXHUyMjQzXCIsXCJzaW1lcVwiOlwiXFx1MjI0M1wiLFwic2ltZ1wiOlwiXFx1MkE5RVwiLFwic2ltZ0VcIjpcIlxcdTJBQTBcIixcInNpbWxcIjpcIlxcdTJBOURcIixcInNpbWxFXCI6XCJcXHUyQTlGXCIsXCJzaW1uZVwiOlwiXFx1MjI0NlwiLFwic2ltcGx1c1wiOlwiXFx1MkEyNFwiLFwic2ltcmFyclwiOlwiXFx1Mjk3MlwiLFwic2xhcnJcIjpcIlxcdTIxOTBcIixcIlNtYWxsQ2lyY2xlXCI6XCJcXHUyMjE4XCIsXCJzbWFsbHNldG1pbnVzXCI6XCJcXHUyMjE2XCIsXCJzbWFzaHBcIjpcIlxcdTJBMzNcIixcInNtZXBhcnNsXCI6XCJcXHUyOUU0XCIsXCJzbWlkXCI6XCJcXHUyMjIzXCIsXCJzbWlsZVwiOlwiXFx1MjMyM1wiLFwic210XCI6XCJcXHUyQUFBXCIsXCJzbXRlXCI6XCJcXHUyQUFDXCIsXCJzbXRlc1wiOlwiXFx1MkFBQ1xcdUZFMDBcIixcIlNPRlRjeVwiOlwiXFx1MDQyQ1wiLFwic29mdGN5XCI6XCJcXHUwNDRDXCIsXCJzb2xiYXJcIjpcIlxcdTIzM0ZcIixcInNvbGJcIjpcIlxcdTI5QzRcIixcInNvbFwiOlwiL1wiLFwiU29wZlwiOlwiXFx1RDgzNVxcdURENEFcIixcInNvcGZcIjpcIlxcdUQ4MzVcXHVERDY0XCIsXCJzcGFkZXNcIjpcIlxcdTI2NjBcIixcInNwYWRlc3VpdFwiOlwiXFx1MjY2MFwiLFwic3BhclwiOlwiXFx1MjIyNVwiLFwic3FjYXBcIjpcIlxcdTIyOTNcIixcInNxY2Fwc1wiOlwiXFx1MjI5M1xcdUZFMDBcIixcInNxY3VwXCI6XCJcXHUyMjk0XCIsXCJzcWN1cHNcIjpcIlxcdTIyOTRcXHVGRTAwXCIsXCJTcXJ0XCI6XCJcXHUyMjFBXCIsXCJzcXN1YlwiOlwiXFx1MjI4RlwiLFwic3FzdWJlXCI6XCJcXHUyMjkxXCIsXCJzcXN1YnNldFwiOlwiXFx1MjI4RlwiLFwic3FzdWJzZXRlcVwiOlwiXFx1MjI5MVwiLFwic3FzdXBcIjpcIlxcdTIyOTBcIixcInNxc3VwZVwiOlwiXFx1MjI5MlwiLFwic3FzdXBzZXRcIjpcIlxcdTIyOTBcIixcInNxc3Vwc2V0ZXFcIjpcIlxcdTIyOTJcIixcInNxdWFyZVwiOlwiXFx1MjVBMVwiLFwiU3F1YXJlXCI6XCJcXHUyNUExXCIsXCJTcXVhcmVJbnRlcnNlY3Rpb25cIjpcIlxcdTIyOTNcIixcIlNxdWFyZVN1YnNldFwiOlwiXFx1MjI4RlwiLFwiU3F1YXJlU3Vic2V0RXF1YWxcIjpcIlxcdTIyOTFcIixcIlNxdWFyZVN1cGVyc2V0XCI6XCJcXHUyMjkwXCIsXCJTcXVhcmVTdXBlcnNldEVxdWFsXCI6XCJcXHUyMjkyXCIsXCJTcXVhcmVVbmlvblwiOlwiXFx1MjI5NFwiLFwic3F1YXJmXCI6XCJcXHUyNUFBXCIsXCJzcXVcIjpcIlxcdTI1QTFcIixcInNxdWZcIjpcIlxcdTI1QUFcIixcInNyYXJyXCI6XCJcXHUyMTkyXCIsXCJTc2NyXCI6XCJcXHVEODM1XFx1RENBRVwiLFwic3NjclwiOlwiXFx1RDgzNVxcdURDQzhcIixcInNzZXRtblwiOlwiXFx1MjIxNlwiLFwic3NtaWxlXCI6XCJcXHUyMzIzXCIsXCJzc3RhcmZcIjpcIlxcdTIyQzZcIixcIlN0YXJcIjpcIlxcdTIyQzZcIixcInN0YXJcIjpcIlxcdTI2MDZcIixcInN0YXJmXCI6XCJcXHUyNjA1XCIsXCJzdHJhaWdodGVwc2lsb25cIjpcIlxcdTAzRjVcIixcInN0cmFpZ2h0cGhpXCI6XCJcXHUwM0Q1XCIsXCJzdHJuc1wiOlwiXFx1MDBBRlwiLFwic3ViXCI6XCJcXHUyMjgyXCIsXCJTdWJcIjpcIlxcdTIyRDBcIixcInN1YmRvdFwiOlwiXFx1MkFCRFwiLFwic3ViRVwiOlwiXFx1MkFDNVwiLFwic3ViZVwiOlwiXFx1MjI4NlwiLFwic3ViZWRvdFwiOlwiXFx1MkFDM1wiLFwic3VibXVsdFwiOlwiXFx1MkFDMVwiLFwic3VibkVcIjpcIlxcdTJBQ0JcIixcInN1Ym5lXCI6XCJcXHUyMjhBXCIsXCJzdWJwbHVzXCI6XCJcXHUyQUJGXCIsXCJzdWJyYXJyXCI6XCJcXHUyOTc5XCIsXCJzdWJzZXRcIjpcIlxcdTIyODJcIixcIlN1YnNldFwiOlwiXFx1MjJEMFwiLFwic3Vic2V0ZXFcIjpcIlxcdTIyODZcIixcInN1YnNldGVxcVwiOlwiXFx1MkFDNVwiLFwiU3Vic2V0RXF1YWxcIjpcIlxcdTIyODZcIixcInN1YnNldG5lcVwiOlwiXFx1MjI4QVwiLFwic3Vic2V0bmVxcVwiOlwiXFx1MkFDQlwiLFwic3Vic2ltXCI6XCJcXHUyQUM3XCIsXCJzdWJzdWJcIjpcIlxcdTJBRDVcIixcInN1YnN1cFwiOlwiXFx1MkFEM1wiLFwic3VjY2FwcHJveFwiOlwiXFx1MkFCOFwiLFwic3VjY1wiOlwiXFx1MjI3QlwiLFwic3VjY2N1cmx5ZXFcIjpcIlxcdTIyN0RcIixcIlN1Y2NlZWRzXCI6XCJcXHUyMjdCXCIsXCJTdWNjZWVkc0VxdWFsXCI6XCJcXHUyQUIwXCIsXCJTdWNjZWVkc1NsYW50RXF1YWxcIjpcIlxcdTIyN0RcIixcIlN1Y2NlZWRzVGlsZGVcIjpcIlxcdTIyN0ZcIixcInN1Y2NlcVwiOlwiXFx1MkFCMFwiLFwic3VjY25hcHByb3hcIjpcIlxcdTJBQkFcIixcInN1Y2NuZXFxXCI6XCJcXHUyQUI2XCIsXCJzdWNjbnNpbVwiOlwiXFx1MjJFOVwiLFwic3VjY3NpbVwiOlwiXFx1MjI3RlwiLFwiU3VjaFRoYXRcIjpcIlxcdTIyMEJcIixcInN1bVwiOlwiXFx1MjIxMVwiLFwiU3VtXCI6XCJcXHUyMjExXCIsXCJzdW5nXCI6XCJcXHUyNjZBXCIsXCJzdXAxXCI6XCJcXHUwMEI5XCIsXCJzdXAyXCI6XCJcXHUwMEIyXCIsXCJzdXAzXCI6XCJcXHUwMEIzXCIsXCJzdXBcIjpcIlxcdTIyODNcIixcIlN1cFwiOlwiXFx1MjJEMVwiLFwic3VwZG90XCI6XCJcXHUyQUJFXCIsXCJzdXBkc3ViXCI6XCJcXHUyQUQ4XCIsXCJzdXBFXCI6XCJcXHUyQUM2XCIsXCJzdXBlXCI6XCJcXHUyMjg3XCIsXCJzdXBlZG90XCI6XCJcXHUyQUM0XCIsXCJTdXBlcnNldFwiOlwiXFx1MjI4M1wiLFwiU3VwZXJzZXRFcXVhbFwiOlwiXFx1MjI4N1wiLFwic3VwaHNvbFwiOlwiXFx1MjdDOVwiLFwic3VwaHN1YlwiOlwiXFx1MkFEN1wiLFwic3VwbGFyclwiOlwiXFx1Mjk3QlwiLFwic3VwbXVsdFwiOlwiXFx1MkFDMlwiLFwic3VwbkVcIjpcIlxcdTJBQ0NcIixcInN1cG5lXCI6XCJcXHUyMjhCXCIsXCJzdXBwbHVzXCI6XCJcXHUyQUMwXCIsXCJzdXBzZXRcIjpcIlxcdTIyODNcIixcIlN1cHNldFwiOlwiXFx1MjJEMVwiLFwic3Vwc2V0ZXFcIjpcIlxcdTIyODdcIixcInN1cHNldGVxcVwiOlwiXFx1MkFDNlwiLFwic3Vwc2V0bmVxXCI6XCJcXHUyMjhCXCIsXCJzdXBzZXRuZXFxXCI6XCJcXHUyQUNDXCIsXCJzdXBzaW1cIjpcIlxcdTJBQzhcIixcInN1cHN1YlwiOlwiXFx1MkFENFwiLFwic3Vwc3VwXCI6XCJcXHUyQUQ2XCIsXCJzd2FyaGtcIjpcIlxcdTI5MjZcIixcInN3YXJyXCI6XCJcXHUyMTk5XCIsXCJzd0FyclwiOlwiXFx1MjFEOVwiLFwic3dhcnJvd1wiOlwiXFx1MjE5OVwiLFwic3dud2FyXCI6XCJcXHUyOTJBXCIsXCJzemxpZ1wiOlwiXFx1MDBERlwiLFwiVGFiXCI6XCJcXHRcIixcInRhcmdldFwiOlwiXFx1MjMxNlwiLFwiVGF1XCI6XCJcXHUwM0E0XCIsXCJ0YXVcIjpcIlxcdTAzQzRcIixcInRicmtcIjpcIlxcdTIzQjRcIixcIlRjYXJvblwiOlwiXFx1MDE2NFwiLFwidGNhcm9uXCI6XCJcXHUwMTY1XCIsXCJUY2VkaWxcIjpcIlxcdTAxNjJcIixcInRjZWRpbFwiOlwiXFx1MDE2M1wiLFwiVGN5XCI6XCJcXHUwNDIyXCIsXCJ0Y3lcIjpcIlxcdTA0NDJcIixcInRkb3RcIjpcIlxcdTIwREJcIixcInRlbHJlY1wiOlwiXFx1MjMxNVwiLFwiVGZyXCI6XCJcXHVEODM1XFx1REQxN1wiLFwidGZyXCI6XCJcXHVEODM1XFx1REQzMVwiLFwidGhlcmU0XCI6XCJcXHUyMjM0XCIsXCJ0aGVyZWZvcmVcIjpcIlxcdTIyMzRcIixcIlRoZXJlZm9yZVwiOlwiXFx1MjIzNFwiLFwiVGhldGFcIjpcIlxcdTAzOThcIixcInRoZXRhXCI6XCJcXHUwM0I4XCIsXCJ0aGV0YXN5bVwiOlwiXFx1MDNEMVwiLFwidGhldGF2XCI6XCJcXHUwM0QxXCIsXCJ0aGlja2FwcHJveFwiOlwiXFx1MjI0OFwiLFwidGhpY2tzaW1cIjpcIlxcdTIyM0NcIixcIlRoaWNrU3BhY2VcIjpcIlxcdTIwNUZcXHUyMDBBXCIsXCJUaGluU3BhY2VcIjpcIlxcdTIwMDlcIixcInRoaW5zcFwiOlwiXFx1MjAwOVwiLFwidGhrYXBcIjpcIlxcdTIyNDhcIixcInRoa3NpbVwiOlwiXFx1MjIzQ1wiLFwiVEhPUk5cIjpcIlxcdTAwREVcIixcInRob3JuXCI6XCJcXHUwMEZFXCIsXCJ0aWxkZVwiOlwiXFx1MDJEQ1wiLFwiVGlsZGVcIjpcIlxcdTIyM0NcIixcIlRpbGRlRXF1YWxcIjpcIlxcdTIyNDNcIixcIlRpbGRlRnVsbEVxdWFsXCI6XCJcXHUyMjQ1XCIsXCJUaWxkZVRpbGRlXCI6XCJcXHUyMjQ4XCIsXCJ0aW1lc2JhclwiOlwiXFx1MkEzMVwiLFwidGltZXNiXCI6XCJcXHUyMkEwXCIsXCJ0aW1lc1wiOlwiXFx1MDBEN1wiLFwidGltZXNkXCI6XCJcXHUyQTMwXCIsXCJ0aW50XCI6XCJcXHUyMjJEXCIsXCJ0b2VhXCI6XCJcXHUyOTI4XCIsXCJ0b3Bib3RcIjpcIlxcdTIzMzZcIixcInRvcGNpclwiOlwiXFx1MkFGMVwiLFwidG9wXCI6XCJcXHUyMkE0XCIsXCJUb3BmXCI6XCJcXHVEODM1XFx1REQ0QlwiLFwidG9wZlwiOlwiXFx1RDgzNVxcdURENjVcIixcInRvcGZvcmtcIjpcIlxcdTJBREFcIixcInRvc2FcIjpcIlxcdTI5MjlcIixcInRwcmltZVwiOlwiXFx1MjAzNFwiLFwidHJhZGVcIjpcIlxcdTIxMjJcIixcIlRSQURFXCI6XCJcXHUyMTIyXCIsXCJ0cmlhbmdsZVwiOlwiXFx1MjVCNVwiLFwidHJpYW5nbGVkb3duXCI6XCJcXHUyNUJGXCIsXCJ0cmlhbmdsZWxlZnRcIjpcIlxcdTI1QzNcIixcInRyaWFuZ2xlbGVmdGVxXCI6XCJcXHUyMkI0XCIsXCJ0cmlhbmdsZXFcIjpcIlxcdTIyNUNcIixcInRyaWFuZ2xlcmlnaHRcIjpcIlxcdTI1QjlcIixcInRyaWFuZ2xlcmlnaHRlcVwiOlwiXFx1MjJCNVwiLFwidHJpZG90XCI6XCJcXHUyNUVDXCIsXCJ0cmllXCI6XCJcXHUyMjVDXCIsXCJ0cmltaW51c1wiOlwiXFx1MkEzQVwiLFwiVHJpcGxlRG90XCI6XCJcXHUyMERCXCIsXCJ0cmlwbHVzXCI6XCJcXHUyQTM5XCIsXCJ0cmlzYlwiOlwiXFx1MjlDRFwiLFwidHJpdGltZVwiOlwiXFx1MkEzQlwiLFwidHJwZXppdW1cIjpcIlxcdTIzRTJcIixcIlRzY3JcIjpcIlxcdUQ4MzVcXHVEQ0FGXCIsXCJ0c2NyXCI6XCJcXHVEODM1XFx1RENDOVwiLFwiVFNjeVwiOlwiXFx1MDQyNlwiLFwidHNjeVwiOlwiXFx1MDQ0NlwiLFwiVFNIY3lcIjpcIlxcdTA0MEJcIixcInRzaGN5XCI6XCJcXHUwNDVCXCIsXCJUc3Ryb2tcIjpcIlxcdTAxNjZcIixcInRzdHJva1wiOlwiXFx1MDE2N1wiLFwidHdpeHRcIjpcIlxcdTIyNkNcIixcInR3b2hlYWRsZWZ0YXJyb3dcIjpcIlxcdTIxOUVcIixcInR3b2hlYWRyaWdodGFycm93XCI6XCJcXHUyMUEwXCIsXCJVYWN1dGVcIjpcIlxcdTAwREFcIixcInVhY3V0ZVwiOlwiXFx1MDBGQVwiLFwidWFyclwiOlwiXFx1MjE5MVwiLFwiVWFyclwiOlwiXFx1MjE5RlwiLFwidUFyclwiOlwiXFx1MjFEMVwiLFwiVWFycm9jaXJcIjpcIlxcdTI5NDlcIixcIlVicmN5XCI6XCJcXHUwNDBFXCIsXCJ1YnJjeVwiOlwiXFx1MDQ1RVwiLFwiVWJyZXZlXCI6XCJcXHUwMTZDXCIsXCJ1YnJldmVcIjpcIlxcdTAxNkRcIixcIlVjaXJjXCI6XCJcXHUwMERCXCIsXCJ1Y2lyY1wiOlwiXFx1MDBGQlwiLFwiVWN5XCI6XCJcXHUwNDIzXCIsXCJ1Y3lcIjpcIlxcdTA0NDNcIixcInVkYXJyXCI6XCJcXHUyMUM1XCIsXCJVZGJsYWNcIjpcIlxcdTAxNzBcIixcInVkYmxhY1wiOlwiXFx1MDE3MVwiLFwidWRoYXJcIjpcIlxcdTI5NkVcIixcInVmaXNodFwiOlwiXFx1Mjk3RVwiLFwiVWZyXCI6XCJcXHVEODM1XFx1REQxOFwiLFwidWZyXCI6XCJcXHVEODM1XFx1REQzMlwiLFwiVWdyYXZlXCI6XCJcXHUwMEQ5XCIsXCJ1Z3JhdmVcIjpcIlxcdTAwRjlcIixcInVIYXJcIjpcIlxcdTI5NjNcIixcInVoYXJsXCI6XCJcXHUyMUJGXCIsXCJ1aGFyclwiOlwiXFx1MjFCRVwiLFwidWhibGtcIjpcIlxcdTI1ODBcIixcInVsY29yblwiOlwiXFx1MjMxQ1wiLFwidWxjb3JuZXJcIjpcIlxcdTIzMUNcIixcInVsY3JvcFwiOlwiXFx1MjMwRlwiLFwidWx0cmlcIjpcIlxcdTI1RjhcIixcIlVtYWNyXCI6XCJcXHUwMTZBXCIsXCJ1bWFjclwiOlwiXFx1MDE2QlwiLFwidW1sXCI6XCJcXHUwMEE4XCIsXCJVbmRlckJhclwiOlwiX1wiLFwiVW5kZXJCcmFjZVwiOlwiXFx1MjNERlwiLFwiVW5kZXJCcmFja2V0XCI6XCJcXHUyM0I1XCIsXCJVbmRlclBhcmVudGhlc2lzXCI6XCJcXHUyM0REXCIsXCJVbmlvblwiOlwiXFx1MjJDM1wiLFwiVW5pb25QbHVzXCI6XCJcXHUyMjhFXCIsXCJVb2dvblwiOlwiXFx1MDE3MlwiLFwidW9nb25cIjpcIlxcdTAxNzNcIixcIlVvcGZcIjpcIlxcdUQ4MzVcXHVERDRDXCIsXCJ1b3BmXCI6XCJcXHVEODM1XFx1REQ2NlwiLFwiVXBBcnJvd0JhclwiOlwiXFx1MjkxMlwiLFwidXBhcnJvd1wiOlwiXFx1MjE5MVwiLFwiVXBBcnJvd1wiOlwiXFx1MjE5MVwiLFwiVXBhcnJvd1wiOlwiXFx1MjFEMVwiLFwiVXBBcnJvd0Rvd25BcnJvd1wiOlwiXFx1MjFDNVwiLFwidXBkb3duYXJyb3dcIjpcIlxcdTIxOTVcIixcIlVwRG93bkFycm93XCI6XCJcXHUyMTk1XCIsXCJVcGRvd25hcnJvd1wiOlwiXFx1MjFENVwiLFwiVXBFcXVpbGlicml1bVwiOlwiXFx1Mjk2RVwiLFwidXBoYXJwb29ubGVmdFwiOlwiXFx1MjFCRlwiLFwidXBoYXJwb29ucmlnaHRcIjpcIlxcdTIxQkVcIixcInVwbHVzXCI6XCJcXHUyMjhFXCIsXCJVcHBlckxlZnRBcnJvd1wiOlwiXFx1MjE5NlwiLFwiVXBwZXJSaWdodEFycm93XCI6XCJcXHUyMTk3XCIsXCJ1cHNpXCI6XCJcXHUwM0M1XCIsXCJVcHNpXCI6XCJcXHUwM0QyXCIsXCJ1cHNpaFwiOlwiXFx1MDNEMlwiLFwiVXBzaWxvblwiOlwiXFx1MDNBNVwiLFwidXBzaWxvblwiOlwiXFx1MDNDNVwiLFwiVXBUZWVBcnJvd1wiOlwiXFx1MjFBNVwiLFwiVXBUZWVcIjpcIlxcdTIyQTVcIixcInVwdXBhcnJvd3NcIjpcIlxcdTIxQzhcIixcInVyY29yblwiOlwiXFx1MjMxRFwiLFwidXJjb3JuZXJcIjpcIlxcdTIzMURcIixcInVyY3JvcFwiOlwiXFx1MjMwRVwiLFwiVXJpbmdcIjpcIlxcdTAxNkVcIixcInVyaW5nXCI6XCJcXHUwMTZGXCIsXCJ1cnRyaVwiOlwiXFx1MjVGOVwiLFwiVXNjclwiOlwiXFx1RDgzNVxcdURDQjBcIixcInVzY3JcIjpcIlxcdUQ4MzVcXHVEQ0NBXCIsXCJ1dGRvdFwiOlwiXFx1MjJGMFwiLFwiVXRpbGRlXCI6XCJcXHUwMTY4XCIsXCJ1dGlsZGVcIjpcIlxcdTAxNjlcIixcInV0cmlcIjpcIlxcdTI1QjVcIixcInV0cmlmXCI6XCJcXHUyNUI0XCIsXCJ1dWFyclwiOlwiXFx1MjFDOFwiLFwiVXVtbFwiOlwiXFx1MDBEQ1wiLFwidXVtbFwiOlwiXFx1MDBGQ1wiLFwidXdhbmdsZVwiOlwiXFx1MjlBN1wiLFwidmFuZ3J0XCI6XCJcXHUyOTlDXCIsXCJ2YXJlcHNpbG9uXCI6XCJcXHUwM0Y1XCIsXCJ2YXJrYXBwYVwiOlwiXFx1MDNGMFwiLFwidmFybm90aGluZ1wiOlwiXFx1MjIwNVwiLFwidmFycGhpXCI6XCJcXHUwM0Q1XCIsXCJ2YXJwaVwiOlwiXFx1MDNENlwiLFwidmFycHJvcHRvXCI6XCJcXHUyMjFEXCIsXCJ2YXJyXCI6XCJcXHUyMTk1XCIsXCJ2QXJyXCI6XCJcXHUyMUQ1XCIsXCJ2YXJyaG9cIjpcIlxcdTAzRjFcIixcInZhcnNpZ21hXCI6XCJcXHUwM0MyXCIsXCJ2YXJzdWJzZXRuZXFcIjpcIlxcdTIyOEFcXHVGRTAwXCIsXCJ2YXJzdWJzZXRuZXFxXCI6XCJcXHUyQUNCXFx1RkUwMFwiLFwidmFyc3Vwc2V0bmVxXCI6XCJcXHUyMjhCXFx1RkUwMFwiLFwidmFyc3Vwc2V0bmVxcVwiOlwiXFx1MkFDQ1xcdUZFMDBcIixcInZhcnRoZXRhXCI6XCJcXHUwM0QxXCIsXCJ2YXJ0cmlhbmdsZWxlZnRcIjpcIlxcdTIyQjJcIixcInZhcnRyaWFuZ2xlcmlnaHRcIjpcIlxcdTIyQjNcIixcInZCYXJcIjpcIlxcdTJBRThcIixcIlZiYXJcIjpcIlxcdTJBRUJcIixcInZCYXJ2XCI6XCJcXHUyQUU5XCIsXCJWY3lcIjpcIlxcdTA0MTJcIixcInZjeVwiOlwiXFx1MDQzMlwiLFwidmRhc2hcIjpcIlxcdTIyQTJcIixcInZEYXNoXCI6XCJcXHUyMkE4XCIsXCJWZGFzaFwiOlwiXFx1MjJBOVwiLFwiVkRhc2hcIjpcIlxcdTIyQUJcIixcIlZkYXNobFwiOlwiXFx1MkFFNlwiLFwidmVlYmFyXCI6XCJcXHUyMkJCXCIsXCJ2ZWVcIjpcIlxcdTIyMjhcIixcIlZlZVwiOlwiXFx1MjJDMVwiLFwidmVlZXFcIjpcIlxcdTIyNUFcIixcInZlbGxpcFwiOlwiXFx1MjJFRVwiLFwidmVyYmFyXCI6XCJ8XCIsXCJWZXJiYXJcIjpcIlxcdTIwMTZcIixcInZlcnRcIjpcInxcIixcIlZlcnRcIjpcIlxcdTIwMTZcIixcIlZlcnRpY2FsQmFyXCI6XCJcXHUyMjIzXCIsXCJWZXJ0aWNhbExpbmVcIjpcInxcIixcIlZlcnRpY2FsU2VwYXJhdG9yXCI6XCJcXHUyNzU4XCIsXCJWZXJ0aWNhbFRpbGRlXCI6XCJcXHUyMjQwXCIsXCJWZXJ5VGhpblNwYWNlXCI6XCJcXHUyMDBBXCIsXCJWZnJcIjpcIlxcdUQ4MzVcXHVERDE5XCIsXCJ2ZnJcIjpcIlxcdUQ4MzVcXHVERDMzXCIsXCJ2bHRyaVwiOlwiXFx1MjJCMlwiLFwidm5zdWJcIjpcIlxcdTIyODJcXHUyMEQyXCIsXCJ2bnN1cFwiOlwiXFx1MjI4M1xcdTIwRDJcIixcIlZvcGZcIjpcIlxcdUQ4MzVcXHVERDREXCIsXCJ2b3BmXCI6XCJcXHVEODM1XFx1REQ2N1wiLFwidnByb3BcIjpcIlxcdTIyMURcIixcInZydHJpXCI6XCJcXHUyMkIzXCIsXCJWc2NyXCI6XCJcXHVEODM1XFx1RENCMVwiLFwidnNjclwiOlwiXFx1RDgzNVxcdURDQ0JcIixcInZzdWJuRVwiOlwiXFx1MkFDQlxcdUZFMDBcIixcInZzdWJuZVwiOlwiXFx1MjI4QVxcdUZFMDBcIixcInZzdXBuRVwiOlwiXFx1MkFDQ1xcdUZFMDBcIixcInZzdXBuZVwiOlwiXFx1MjI4QlxcdUZFMDBcIixcIlZ2ZGFzaFwiOlwiXFx1MjJBQVwiLFwidnppZ3phZ1wiOlwiXFx1Mjk5QVwiLFwiV2NpcmNcIjpcIlxcdTAxNzRcIixcIndjaXJjXCI6XCJcXHUwMTc1XCIsXCJ3ZWRiYXJcIjpcIlxcdTJBNUZcIixcIndlZGdlXCI6XCJcXHUyMjI3XCIsXCJXZWRnZVwiOlwiXFx1MjJDMFwiLFwid2VkZ2VxXCI6XCJcXHUyMjU5XCIsXCJ3ZWllcnBcIjpcIlxcdTIxMThcIixcIldmclwiOlwiXFx1RDgzNVxcdUREMUFcIixcIndmclwiOlwiXFx1RDgzNVxcdUREMzRcIixcIldvcGZcIjpcIlxcdUQ4MzVcXHVERDRFXCIsXCJ3b3BmXCI6XCJcXHVEODM1XFx1REQ2OFwiLFwid3BcIjpcIlxcdTIxMThcIixcIndyXCI6XCJcXHUyMjQwXCIsXCJ3cmVhdGhcIjpcIlxcdTIyNDBcIixcIldzY3JcIjpcIlxcdUQ4MzVcXHVEQ0IyXCIsXCJ3c2NyXCI6XCJcXHVEODM1XFx1RENDQ1wiLFwieGNhcFwiOlwiXFx1MjJDMlwiLFwieGNpcmNcIjpcIlxcdTI1RUZcIixcInhjdXBcIjpcIlxcdTIyQzNcIixcInhkdHJpXCI6XCJcXHUyNUJEXCIsXCJYZnJcIjpcIlxcdUQ4MzVcXHVERDFCXCIsXCJ4ZnJcIjpcIlxcdUQ4MzVcXHVERDM1XCIsXCJ4aGFyclwiOlwiXFx1MjdGN1wiLFwieGhBcnJcIjpcIlxcdTI3RkFcIixcIlhpXCI6XCJcXHUwMzlFXCIsXCJ4aVwiOlwiXFx1MDNCRVwiLFwieGxhcnJcIjpcIlxcdTI3RjVcIixcInhsQXJyXCI6XCJcXHUyN0Y4XCIsXCJ4bWFwXCI6XCJcXHUyN0ZDXCIsXCJ4bmlzXCI6XCJcXHUyMkZCXCIsXCJ4b2RvdFwiOlwiXFx1MkEwMFwiLFwiWG9wZlwiOlwiXFx1RDgzNVxcdURENEZcIixcInhvcGZcIjpcIlxcdUQ4MzVcXHVERDY5XCIsXCJ4b3BsdXNcIjpcIlxcdTJBMDFcIixcInhvdGltZVwiOlwiXFx1MkEwMlwiLFwieHJhcnJcIjpcIlxcdTI3RjZcIixcInhyQXJyXCI6XCJcXHUyN0Y5XCIsXCJYc2NyXCI6XCJcXHVEODM1XFx1RENCM1wiLFwieHNjclwiOlwiXFx1RDgzNVxcdURDQ0RcIixcInhzcWN1cFwiOlwiXFx1MkEwNlwiLFwieHVwbHVzXCI6XCJcXHUyQTA0XCIsXCJ4dXRyaVwiOlwiXFx1MjVCM1wiLFwieHZlZVwiOlwiXFx1MjJDMVwiLFwieHdlZGdlXCI6XCJcXHUyMkMwXCIsXCJZYWN1dGVcIjpcIlxcdTAwRERcIixcInlhY3V0ZVwiOlwiXFx1MDBGRFwiLFwiWUFjeVwiOlwiXFx1MDQyRlwiLFwieWFjeVwiOlwiXFx1MDQ0RlwiLFwiWWNpcmNcIjpcIlxcdTAxNzZcIixcInljaXJjXCI6XCJcXHUwMTc3XCIsXCJZY3lcIjpcIlxcdTA0MkJcIixcInljeVwiOlwiXFx1MDQ0QlwiLFwieWVuXCI6XCJcXHUwMEE1XCIsXCJZZnJcIjpcIlxcdUQ4MzVcXHVERDFDXCIsXCJ5ZnJcIjpcIlxcdUQ4MzVcXHVERDM2XCIsXCJZSWN5XCI6XCJcXHUwNDA3XCIsXCJ5aWN5XCI6XCJcXHUwNDU3XCIsXCJZb3BmXCI6XCJcXHVEODM1XFx1REQ1MFwiLFwieW9wZlwiOlwiXFx1RDgzNVxcdURENkFcIixcIllzY3JcIjpcIlxcdUQ4MzVcXHVEQ0I0XCIsXCJ5c2NyXCI6XCJcXHVEODM1XFx1RENDRVwiLFwiWVVjeVwiOlwiXFx1MDQyRVwiLFwieXVjeVwiOlwiXFx1MDQ0RVwiLFwieXVtbFwiOlwiXFx1MDBGRlwiLFwiWXVtbFwiOlwiXFx1MDE3OFwiLFwiWmFjdXRlXCI6XCJcXHUwMTc5XCIsXCJ6YWN1dGVcIjpcIlxcdTAxN0FcIixcIlpjYXJvblwiOlwiXFx1MDE3RFwiLFwiemNhcm9uXCI6XCJcXHUwMTdFXCIsXCJaY3lcIjpcIlxcdTA0MTdcIixcInpjeVwiOlwiXFx1MDQzN1wiLFwiWmRvdFwiOlwiXFx1MDE3QlwiLFwiemRvdFwiOlwiXFx1MDE3Q1wiLFwiemVldHJmXCI6XCJcXHUyMTI4XCIsXCJaZXJvV2lkdGhTcGFjZVwiOlwiXFx1MjAwQlwiLFwiWmV0YVwiOlwiXFx1MDM5NlwiLFwiemV0YVwiOlwiXFx1MDNCNlwiLFwiemZyXCI6XCJcXHVEODM1XFx1REQzN1wiLFwiWmZyXCI6XCJcXHUyMTI4XCIsXCJaSGN5XCI6XCJcXHUwNDE2XCIsXCJ6aGN5XCI6XCJcXHUwNDM2XCIsXCJ6aWdyYXJyXCI6XCJcXHUyMUREXCIsXCJ6b3BmXCI6XCJcXHVEODM1XFx1REQ2QlwiLFwiWm9wZlwiOlwiXFx1MjEyNFwiLFwiWnNjclwiOlwiXFx1RDgzNVxcdURDQjVcIixcInpzY3JcIjpcIlxcdUQ4MzVcXHVEQ0NGXCIsXCJ6d2pcIjpcIlxcdTIwMERcIixcInp3bmpcIjpcIlxcdTIwMENcIn0iLCJtb2R1bGUuZXhwb3J0cz17XCJBYWN1dGVcIjpcIlxcdTAwQzFcIixcImFhY3V0ZVwiOlwiXFx1MDBFMVwiLFwiQWNpcmNcIjpcIlxcdTAwQzJcIixcImFjaXJjXCI6XCJcXHUwMEUyXCIsXCJhY3V0ZVwiOlwiXFx1MDBCNFwiLFwiQUVsaWdcIjpcIlxcdTAwQzZcIixcImFlbGlnXCI6XCJcXHUwMEU2XCIsXCJBZ3JhdmVcIjpcIlxcdTAwQzBcIixcImFncmF2ZVwiOlwiXFx1MDBFMFwiLFwiYW1wXCI6XCImXCIsXCJBTVBcIjpcIiZcIixcIkFyaW5nXCI6XCJcXHUwMEM1XCIsXCJhcmluZ1wiOlwiXFx1MDBFNVwiLFwiQXRpbGRlXCI6XCJcXHUwMEMzXCIsXCJhdGlsZGVcIjpcIlxcdTAwRTNcIixcIkF1bWxcIjpcIlxcdTAwQzRcIixcImF1bWxcIjpcIlxcdTAwRTRcIixcImJydmJhclwiOlwiXFx1MDBBNlwiLFwiQ2NlZGlsXCI6XCJcXHUwMEM3XCIsXCJjY2VkaWxcIjpcIlxcdTAwRTdcIixcImNlZGlsXCI6XCJcXHUwMEI4XCIsXCJjZW50XCI6XCJcXHUwMEEyXCIsXCJjb3B5XCI6XCJcXHUwMEE5XCIsXCJDT1BZXCI6XCJcXHUwMEE5XCIsXCJjdXJyZW5cIjpcIlxcdTAwQTRcIixcImRlZ1wiOlwiXFx1MDBCMFwiLFwiZGl2aWRlXCI6XCJcXHUwMEY3XCIsXCJFYWN1dGVcIjpcIlxcdTAwQzlcIixcImVhY3V0ZVwiOlwiXFx1MDBFOVwiLFwiRWNpcmNcIjpcIlxcdTAwQ0FcIixcImVjaXJjXCI6XCJcXHUwMEVBXCIsXCJFZ3JhdmVcIjpcIlxcdTAwQzhcIixcImVncmF2ZVwiOlwiXFx1MDBFOFwiLFwiRVRIXCI6XCJcXHUwMEQwXCIsXCJldGhcIjpcIlxcdTAwRjBcIixcIkV1bWxcIjpcIlxcdTAwQ0JcIixcImV1bWxcIjpcIlxcdTAwRUJcIixcImZyYWMxMlwiOlwiXFx1MDBCRFwiLFwiZnJhYzE0XCI6XCJcXHUwMEJDXCIsXCJmcmFjMzRcIjpcIlxcdTAwQkVcIixcImd0XCI6XCI+XCIsXCJHVFwiOlwiPlwiLFwiSWFjdXRlXCI6XCJcXHUwMENEXCIsXCJpYWN1dGVcIjpcIlxcdTAwRURcIixcIkljaXJjXCI6XCJcXHUwMENFXCIsXCJpY2lyY1wiOlwiXFx1MDBFRVwiLFwiaWV4Y2xcIjpcIlxcdTAwQTFcIixcIklncmF2ZVwiOlwiXFx1MDBDQ1wiLFwiaWdyYXZlXCI6XCJcXHUwMEVDXCIsXCJpcXVlc3RcIjpcIlxcdTAwQkZcIixcIkl1bWxcIjpcIlxcdTAwQ0ZcIixcIml1bWxcIjpcIlxcdTAwRUZcIixcImxhcXVvXCI6XCJcXHUwMEFCXCIsXCJsdFwiOlwiPFwiLFwiTFRcIjpcIjxcIixcIm1hY3JcIjpcIlxcdTAwQUZcIixcIm1pY3JvXCI6XCJcXHUwMEI1XCIsXCJtaWRkb3RcIjpcIlxcdTAwQjdcIixcIm5ic3BcIjpcIlxcdTAwQTBcIixcIm5vdFwiOlwiXFx1MDBBQ1wiLFwiTnRpbGRlXCI6XCJcXHUwMEQxXCIsXCJudGlsZGVcIjpcIlxcdTAwRjFcIixcIk9hY3V0ZVwiOlwiXFx1MDBEM1wiLFwib2FjdXRlXCI6XCJcXHUwMEYzXCIsXCJPY2lyY1wiOlwiXFx1MDBENFwiLFwib2NpcmNcIjpcIlxcdTAwRjRcIixcIk9ncmF2ZVwiOlwiXFx1MDBEMlwiLFwib2dyYXZlXCI6XCJcXHUwMEYyXCIsXCJvcmRmXCI6XCJcXHUwMEFBXCIsXCJvcmRtXCI6XCJcXHUwMEJBXCIsXCJPc2xhc2hcIjpcIlxcdTAwRDhcIixcIm9zbGFzaFwiOlwiXFx1MDBGOFwiLFwiT3RpbGRlXCI6XCJcXHUwMEQ1XCIsXCJvdGlsZGVcIjpcIlxcdTAwRjVcIixcIk91bWxcIjpcIlxcdTAwRDZcIixcIm91bWxcIjpcIlxcdTAwRjZcIixcInBhcmFcIjpcIlxcdTAwQjZcIixcInBsdXNtblwiOlwiXFx1MDBCMVwiLFwicG91bmRcIjpcIlxcdTAwQTNcIixcInF1b3RcIjpcIlxcXCJcIixcIlFVT1RcIjpcIlxcXCJcIixcInJhcXVvXCI6XCJcXHUwMEJCXCIsXCJyZWdcIjpcIlxcdTAwQUVcIixcIlJFR1wiOlwiXFx1MDBBRVwiLFwic2VjdFwiOlwiXFx1MDBBN1wiLFwic2h5XCI6XCJcXHUwMEFEXCIsXCJzdXAxXCI6XCJcXHUwMEI5XCIsXCJzdXAyXCI6XCJcXHUwMEIyXCIsXCJzdXAzXCI6XCJcXHUwMEIzXCIsXCJzemxpZ1wiOlwiXFx1MDBERlwiLFwiVEhPUk5cIjpcIlxcdTAwREVcIixcInRob3JuXCI6XCJcXHUwMEZFXCIsXCJ0aW1lc1wiOlwiXFx1MDBEN1wiLFwiVWFjdXRlXCI6XCJcXHUwMERBXCIsXCJ1YWN1dGVcIjpcIlxcdTAwRkFcIixcIlVjaXJjXCI6XCJcXHUwMERCXCIsXCJ1Y2lyY1wiOlwiXFx1MDBGQlwiLFwiVWdyYXZlXCI6XCJcXHUwMEQ5XCIsXCJ1Z3JhdmVcIjpcIlxcdTAwRjlcIixcInVtbFwiOlwiXFx1MDBBOFwiLFwiVXVtbFwiOlwiXFx1MDBEQ1wiLFwidXVtbFwiOlwiXFx1MDBGQ1wiLFwiWWFjdXRlXCI6XCJcXHUwMEREXCIsXCJ5YWN1dGVcIjpcIlxcdTAwRkRcIixcInllblwiOlwiXFx1MDBBNVwiLFwieXVtbFwiOlwiXFx1MDBGRlwifSIsIm1vZHVsZS5leHBvcnRzPXtcImFtcFwiOlwiJlwiLFwiYXBvc1wiOlwiJ1wiLFwiZ3RcIjpcIj5cIixcImx0XCI6XCI8XCIsXCJxdW90XCI6XCJcXFwiXCJ9XG4iLCIvLyBDb3B5cmlnaHQgSm95ZW50LCBJbmMuIGFuZCBvdGhlciBOb2RlIGNvbnRyaWJ1dG9ycy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYVxuLy8gY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZVxuLy8gXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nXG4vLyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsXG4vLyBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0XG4vLyBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGVcbi8vIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkXG4vLyBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTXG4vLyBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GXG4vLyBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOXG4vLyBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSxcbi8vIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUlxuLy8gT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRVxuLy8gVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cblxuZnVuY3Rpb24gRXZlbnRFbWl0dGVyKCkge1xuICB0aGlzLl9ldmVudHMgPSB0aGlzLl9ldmVudHMgfHwge307XG4gIHRoaXMuX21heExpc3RlbmVycyA9IHRoaXMuX21heExpc3RlbmVycyB8fCB1bmRlZmluZWQ7XG59XG5tb2R1bGUuZXhwb3J0cyA9IEV2ZW50RW1pdHRlcjtcblxuLy8gQmFja3dhcmRzLWNvbXBhdCB3aXRoIG5vZGUgMC4xMC54XG5FdmVudEVtaXR0ZXIuRXZlbnRFbWl0dGVyID0gRXZlbnRFbWl0dGVyO1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLl9ldmVudHMgPSB1bmRlZmluZWQ7XG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLl9tYXhMaXN0ZW5lcnMgPSB1bmRlZmluZWQ7XG5cbi8vIEJ5IGRlZmF1bHQgRXZlbnRFbWl0dGVycyB3aWxsIHByaW50IGEgd2FybmluZyBpZiBtb3JlIHRoYW4gMTAgbGlzdGVuZXJzIGFyZVxuLy8gYWRkZWQgdG8gaXQuIFRoaXMgaXMgYSB1c2VmdWwgZGVmYXVsdCB3aGljaCBoZWxwcyBmaW5kaW5nIG1lbW9yeSBsZWFrcy5cbkV2ZW50RW1pdHRlci5kZWZhdWx0TWF4TGlzdGVuZXJzID0gMTA7XG5cbi8vIE9idmlvdXNseSBub3QgYWxsIEVtaXR0ZXJzIHNob3VsZCBiZSBsaW1pdGVkIHRvIDEwLiBUaGlzIGZ1bmN0aW9uIGFsbG93c1xuLy8gdGhhdCB0byBiZSBpbmNyZWFzZWQuIFNldCB0byB6ZXJvIGZvciB1bmxpbWl0ZWQuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnNldE1heExpc3RlbmVycyA9IGZ1bmN0aW9uKG4pIHtcbiAgaWYgKCFpc051bWJlcihuKSB8fCBuIDwgMCB8fCBpc05hTihuKSlcbiAgICB0aHJvdyBUeXBlRXJyb3IoJ24gbXVzdCBiZSBhIHBvc2l0aXZlIG51bWJlcicpO1xuICB0aGlzLl9tYXhMaXN0ZW5lcnMgPSBuO1xuICByZXR1cm4gdGhpcztcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuZW1pdCA9IGZ1bmN0aW9uKHR5cGUpIHtcbiAgdmFyIGVyLCBoYW5kbGVyLCBsZW4sIGFyZ3MsIGksIGxpc3RlbmVycztcblxuICBpZiAoIXRoaXMuX2V2ZW50cylcbiAgICB0aGlzLl9ldmVudHMgPSB7fTtcblxuICAvLyBJZiB0aGVyZSBpcyBubyAnZXJyb3InIGV2ZW50IGxpc3RlbmVyIHRoZW4gdGhyb3cuXG4gIGlmICh0eXBlID09PSAnZXJyb3InKSB7XG4gICAgaWYgKCF0aGlzLl9ldmVudHMuZXJyb3IgfHxcbiAgICAgICAgKGlzT2JqZWN0KHRoaXMuX2V2ZW50cy5lcnJvcikgJiYgIXRoaXMuX2V2ZW50cy5lcnJvci5sZW5ndGgpKSB7XG4gICAgICBlciA9IGFyZ3VtZW50c1sxXTtcbiAgICAgIGlmIChlciBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgIHRocm93IGVyOyAvLyBVbmhhbmRsZWQgJ2Vycm9yJyBldmVudFxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gQXQgbGVhc3QgZ2l2ZSBzb21lIGtpbmQgb2YgY29udGV4dCB0byB0aGUgdXNlclxuICAgICAgICB2YXIgZXJyID0gbmV3IEVycm9yKCdVbmNhdWdodCwgdW5zcGVjaWZpZWQgXCJlcnJvclwiIGV2ZW50LiAoJyArIGVyICsgJyknKTtcbiAgICAgICAgZXJyLmNvbnRleHQgPSBlcjtcbiAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGhhbmRsZXIgPSB0aGlzLl9ldmVudHNbdHlwZV07XG5cbiAgaWYgKGlzVW5kZWZpbmVkKGhhbmRsZXIpKVxuICAgIHJldHVybiBmYWxzZTtcblxuICBpZiAoaXNGdW5jdGlvbihoYW5kbGVyKSkge1xuICAgIHN3aXRjaCAoYXJndW1lbnRzLmxlbmd0aCkge1xuICAgICAgLy8gZmFzdCBjYXNlc1xuICAgICAgY2FzZSAxOlxuICAgICAgICBoYW5kbGVyLmNhbGwodGhpcyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAyOlxuICAgICAgICBoYW5kbGVyLmNhbGwodGhpcywgYXJndW1lbnRzWzFdKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDM6XG4gICAgICAgIGhhbmRsZXIuY2FsbCh0aGlzLCBhcmd1bWVudHNbMV0sIGFyZ3VtZW50c1syXSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgLy8gc2xvd2VyXG4gICAgICBkZWZhdWx0OlxuICAgICAgICBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKTtcbiAgICAgICAgaGFuZGxlci5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICB9XG4gIH0gZWxzZSBpZiAoaXNPYmplY3QoaGFuZGxlcikpIHtcbiAgICBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKTtcbiAgICBsaXN0ZW5lcnMgPSBoYW5kbGVyLnNsaWNlKCk7XG4gICAgbGVuID0gbGlzdGVuZXJzLmxlbmd0aDtcbiAgICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpKyspXG4gICAgICBsaXN0ZW5lcnNbaV0uYXBwbHkodGhpcywgYXJncyk7XG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuYWRkTGlzdGVuZXIgPSBmdW5jdGlvbih0eXBlLCBsaXN0ZW5lcikge1xuICB2YXIgbTtcblxuICBpZiAoIWlzRnVuY3Rpb24obGlzdGVuZXIpKVxuICAgIHRocm93IFR5cGVFcnJvcignbGlzdGVuZXIgbXVzdCBiZSBhIGZ1bmN0aW9uJyk7XG5cbiAgaWYgKCF0aGlzLl9ldmVudHMpXG4gICAgdGhpcy5fZXZlbnRzID0ge307XG5cbiAgLy8gVG8gYXZvaWQgcmVjdXJzaW9uIGluIHRoZSBjYXNlIHRoYXQgdHlwZSA9PT0gXCJuZXdMaXN0ZW5lclwiISBCZWZvcmVcbiAgLy8gYWRkaW5nIGl0IHRvIHRoZSBsaXN0ZW5lcnMsIGZpcnN0IGVtaXQgXCJuZXdMaXN0ZW5lclwiLlxuICBpZiAodGhpcy5fZXZlbnRzLm5ld0xpc3RlbmVyKVxuICAgIHRoaXMuZW1pdCgnbmV3TGlzdGVuZXInLCB0eXBlLFxuICAgICAgICAgICAgICBpc0Z1bmN0aW9uKGxpc3RlbmVyLmxpc3RlbmVyKSA/XG4gICAgICAgICAgICAgIGxpc3RlbmVyLmxpc3RlbmVyIDogbGlzdGVuZXIpO1xuXG4gIGlmICghdGhpcy5fZXZlbnRzW3R5cGVdKVxuICAgIC8vIE9wdGltaXplIHRoZSBjYXNlIG9mIG9uZSBsaXN0ZW5lci4gRG9uJ3QgbmVlZCB0aGUgZXh0cmEgYXJyYXkgb2JqZWN0LlxuICAgIHRoaXMuX2V2ZW50c1t0eXBlXSA9IGxpc3RlbmVyO1xuICBlbHNlIGlmIChpc09iamVjdCh0aGlzLl9ldmVudHNbdHlwZV0pKVxuICAgIC8vIElmIHdlJ3ZlIGFscmVhZHkgZ290IGFuIGFycmF5LCBqdXN0IGFwcGVuZC5cbiAgICB0aGlzLl9ldmVudHNbdHlwZV0ucHVzaChsaXN0ZW5lcik7XG4gIGVsc2VcbiAgICAvLyBBZGRpbmcgdGhlIHNlY29uZCBlbGVtZW50LCBuZWVkIHRvIGNoYW5nZSB0byBhcnJheS5cbiAgICB0aGlzLl9ldmVudHNbdHlwZV0gPSBbdGhpcy5fZXZlbnRzW3R5cGVdLCBsaXN0ZW5lcl07XG5cbiAgLy8gQ2hlY2sgZm9yIGxpc3RlbmVyIGxlYWtcbiAgaWYgKGlzT2JqZWN0KHRoaXMuX2V2ZW50c1t0eXBlXSkgJiYgIXRoaXMuX2V2ZW50c1t0eXBlXS53YXJuZWQpIHtcbiAgICBpZiAoIWlzVW5kZWZpbmVkKHRoaXMuX21heExpc3RlbmVycykpIHtcbiAgICAgIG0gPSB0aGlzLl9tYXhMaXN0ZW5lcnM7XG4gICAgfSBlbHNlIHtcbiAgICAgIG0gPSBFdmVudEVtaXR0ZXIuZGVmYXVsdE1heExpc3RlbmVycztcbiAgICB9XG5cbiAgICBpZiAobSAmJiBtID4gMCAmJiB0aGlzLl9ldmVudHNbdHlwZV0ubGVuZ3RoID4gbSkge1xuICAgICAgdGhpcy5fZXZlbnRzW3R5cGVdLndhcm5lZCA9IHRydWU7XG4gICAgICBjb25zb2xlLmVycm9yKCcobm9kZSkgd2FybmluZzogcG9zc2libGUgRXZlbnRFbWl0dGVyIG1lbW9yeSAnICtcbiAgICAgICAgICAgICAgICAgICAgJ2xlYWsgZGV0ZWN0ZWQuICVkIGxpc3RlbmVycyBhZGRlZC4gJyArXG4gICAgICAgICAgICAgICAgICAgICdVc2UgZW1pdHRlci5zZXRNYXhMaXN0ZW5lcnMoKSB0byBpbmNyZWFzZSBsaW1pdC4nLFxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9ldmVudHNbdHlwZV0ubGVuZ3RoKTtcbiAgICAgIGlmICh0eXBlb2YgY29uc29sZS50cmFjZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAvLyBub3Qgc3VwcG9ydGVkIGluIElFIDEwXG4gICAgICAgIGNvbnNvbGUudHJhY2UoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gdGhpcztcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUub24gPSBFdmVudEVtaXR0ZXIucHJvdG90eXBlLmFkZExpc3RlbmVyO1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uY2UgPSBmdW5jdGlvbih0eXBlLCBsaXN0ZW5lcikge1xuICBpZiAoIWlzRnVuY3Rpb24obGlzdGVuZXIpKVxuICAgIHRocm93IFR5cGVFcnJvcignbGlzdGVuZXIgbXVzdCBiZSBhIGZ1bmN0aW9uJyk7XG5cbiAgdmFyIGZpcmVkID0gZmFsc2U7XG5cbiAgZnVuY3Rpb24gZygpIHtcbiAgICB0aGlzLnJlbW92ZUxpc3RlbmVyKHR5cGUsIGcpO1xuXG4gICAgaWYgKCFmaXJlZCkge1xuICAgICAgZmlyZWQgPSB0cnVlO1xuICAgICAgbGlzdGVuZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9XG4gIH1cblxuICBnLmxpc3RlbmVyID0gbGlzdGVuZXI7XG4gIHRoaXMub24odHlwZSwgZyk7XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vLyBlbWl0cyBhICdyZW1vdmVMaXN0ZW5lcicgZXZlbnQgaWZmIHRoZSBsaXN0ZW5lciB3YXMgcmVtb3ZlZFxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVMaXN0ZW5lciA9IGZ1bmN0aW9uKHR5cGUsIGxpc3RlbmVyKSB7XG4gIHZhciBsaXN0LCBwb3NpdGlvbiwgbGVuZ3RoLCBpO1xuXG4gIGlmICghaXNGdW5jdGlvbihsaXN0ZW5lcikpXG4gICAgdGhyb3cgVHlwZUVycm9yKCdsaXN0ZW5lciBtdXN0IGJlIGEgZnVuY3Rpb24nKTtcblxuICBpZiAoIXRoaXMuX2V2ZW50cyB8fCAhdGhpcy5fZXZlbnRzW3R5cGVdKVxuICAgIHJldHVybiB0aGlzO1xuXG4gIGxpc3QgPSB0aGlzLl9ldmVudHNbdHlwZV07XG4gIGxlbmd0aCA9IGxpc3QubGVuZ3RoO1xuICBwb3NpdGlvbiA9IC0xO1xuXG4gIGlmIChsaXN0ID09PSBsaXN0ZW5lciB8fFxuICAgICAgKGlzRnVuY3Rpb24obGlzdC5saXN0ZW5lcikgJiYgbGlzdC5saXN0ZW5lciA9PT0gbGlzdGVuZXIpKSB7XG4gICAgZGVsZXRlIHRoaXMuX2V2ZW50c1t0eXBlXTtcbiAgICBpZiAodGhpcy5fZXZlbnRzLnJlbW92ZUxpc3RlbmVyKVxuICAgICAgdGhpcy5lbWl0KCdyZW1vdmVMaXN0ZW5lcicsIHR5cGUsIGxpc3RlbmVyKTtcblxuICB9IGVsc2UgaWYgKGlzT2JqZWN0KGxpc3QpKSB7XG4gICAgZm9yIChpID0gbGVuZ3RoOyBpLS0gPiAwOykge1xuICAgICAgaWYgKGxpc3RbaV0gPT09IGxpc3RlbmVyIHx8XG4gICAgICAgICAgKGxpc3RbaV0ubGlzdGVuZXIgJiYgbGlzdFtpXS5saXN0ZW5lciA9PT0gbGlzdGVuZXIpKSB7XG4gICAgICAgIHBvc2l0aW9uID0gaTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHBvc2l0aW9uIDwgMClcbiAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgaWYgKGxpc3QubGVuZ3RoID09PSAxKSB7XG4gICAgICBsaXN0Lmxlbmd0aCA9IDA7XG4gICAgICBkZWxldGUgdGhpcy5fZXZlbnRzW3R5cGVdO1xuICAgIH0gZWxzZSB7XG4gICAgICBsaXN0LnNwbGljZShwb3NpdGlvbiwgMSk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX2V2ZW50cy5yZW1vdmVMaXN0ZW5lcilcbiAgICAgIHRoaXMuZW1pdCgncmVtb3ZlTGlzdGVuZXInLCB0eXBlLCBsaXN0ZW5lcik7XG4gIH1cblxuICByZXR1cm4gdGhpcztcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucmVtb3ZlQWxsTGlzdGVuZXJzID0gZnVuY3Rpb24odHlwZSkge1xuICB2YXIga2V5LCBsaXN0ZW5lcnM7XG5cbiAgaWYgKCF0aGlzLl9ldmVudHMpXG4gICAgcmV0dXJuIHRoaXM7XG5cbiAgLy8gbm90IGxpc3RlbmluZyBmb3IgcmVtb3ZlTGlzdGVuZXIsIG5vIG5lZWQgdG8gZW1pdFxuICBpZiAoIXRoaXMuX2V2ZW50cy5yZW1vdmVMaXN0ZW5lcikge1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKVxuICAgICAgdGhpcy5fZXZlbnRzID0ge307XG4gICAgZWxzZSBpZiAodGhpcy5fZXZlbnRzW3R5cGVdKVxuICAgICAgZGVsZXRlIHRoaXMuX2V2ZW50c1t0eXBlXTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8vIGVtaXQgcmVtb3ZlTGlzdGVuZXIgZm9yIGFsbCBsaXN0ZW5lcnMgb24gYWxsIGV2ZW50c1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCkge1xuICAgIGZvciAoa2V5IGluIHRoaXMuX2V2ZW50cykge1xuICAgICAgaWYgKGtleSA9PT0gJ3JlbW92ZUxpc3RlbmVyJykgY29udGludWU7XG4gICAgICB0aGlzLnJlbW92ZUFsbExpc3RlbmVycyhrZXkpO1xuICAgIH1cbiAgICB0aGlzLnJlbW92ZUFsbExpc3RlbmVycygncmVtb3ZlTGlzdGVuZXInKTtcbiAgICB0aGlzLl9ldmVudHMgPSB7fTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGxpc3RlbmVycyA9IHRoaXMuX2V2ZW50c1t0eXBlXTtcblxuICBpZiAoaXNGdW5jdGlvbihsaXN0ZW5lcnMpKSB7XG4gICAgdGhpcy5yZW1vdmVMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcnMpO1xuICB9IGVsc2UgaWYgKGxpc3RlbmVycykge1xuICAgIC8vIExJRk8gb3JkZXJcbiAgICB3aGlsZSAobGlzdGVuZXJzLmxlbmd0aClcbiAgICAgIHRoaXMucmVtb3ZlTGlzdGVuZXIodHlwZSwgbGlzdGVuZXJzW2xpc3RlbmVycy5sZW5ndGggLSAxXSk7XG4gIH1cbiAgZGVsZXRlIHRoaXMuX2V2ZW50c1t0eXBlXTtcblxuICByZXR1cm4gdGhpcztcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUubGlzdGVuZXJzID0gZnVuY3Rpb24odHlwZSkge1xuICB2YXIgcmV0O1xuICBpZiAoIXRoaXMuX2V2ZW50cyB8fCAhdGhpcy5fZXZlbnRzW3R5cGVdKVxuICAgIHJldCA9IFtdO1xuICBlbHNlIGlmIChpc0Z1bmN0aW9uKHRoaXMuX2V2ZW50c1t0eXBlXSkpXG4gICAgcmV0ID0gW3RoaXMuX2V2ZW50c1t0eXBlXV07XG4gIGVsc2VcbiAgICByZXQgPSB0aGlzLl9ldmVudHNbdHlwZV0uc2xpY2UoKTtcbiAgcmV0dXJuIHJldDtcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUubGlzdGVuZXJDb3VudCA9IGZ1bmN0aW9uKHR5cGUpIHtcbiAgaWYgKHRoaXMuX2V2ZW50cykge1xuICAgIHZhciBldmxpc3RlbmVyID0gdGhpcy5fZXZlbnRzW3R5cGVdO1xuXG4gICAgaWYgKGlzRnVuY3Rpb24oZXZsaXN0ZW5lcikpXG4gICAgICByZXR1cm4gMTtcbiAgICBlbHNlIGlmIChldmxpc3RlbmVyKVxuICAgICAgcmV0dXJuIGV2bGlzdGVuZXIubGVuZ3RoO1xuICB9XG4gIHJldHVybiAwO1xufTtcblxuRXZlbnRFbWl0dGVyLmxpc3RlbmVyQ291bnQgPSBmdW5jdGlvbihlbWl0dGVyLCB0eXBlKSB7XG4gIHJldHVybiBlbWl0dGVyLmxpc3RlbmVyQ291bnQodHlwZSk7XG59O1xuXG5mdW5jdGlvbiBpc0Z1bmN0aW9uKGFyZykge1xuICByZXR1cm4gdHlwZW9mIGFyZyA9PT0gJ2Z1bmN0aW9uJztcbn1cblxuZnVuY3Rpb24gaXNOdW1iZXIoYXJnKSB7XG4gIHJldHVybiB0eXBlb2YgYXJnID09PSAnbnVtYmVyJztcbn1cblxuZnVuY3Rpb24gaXNPYmplY3QoYXJnKSB7XG4gIHJldHVybiB0eXBlb2YgYXJnID09PSAnb2JqZWN0JyAmJiBhcmcgIT09IG51bGw7XG59XG5cbmZ1bmN0aW9uIGlzVW5kZWZpbmVkKGFyZykge1xuICByZXR1cm4gYXJnID09PSB2b2lkIDA7XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IENvbGxlY3RpbmdIYW5kbGVyO1xuXG5mdW5jdGlvbiBDb2xsZWN0aW5nSGFuZGxlcihjYnMpe1xuXHR0aGlzLl9jYnMgPSBjYnMgfHwge307XG5cdHRoaXMuZXZlbnRzID0gW107XG59XG5cbnZhciBFVkVOVFMgPSByZXF1aXJlKFwiLi9cIikuRVZFTlRTO1xuT2JqZWN0LmtleXMoRVZFTlRTKS5mb3JFYWNoKGZ1bmN0aW9uKG5hbWUpe1xuXHRpZihFVkVOVFNbbmFtZV0gPT09IDApe1xuXHRcdG5hbWUgPSBcIm9uXCIgKyBuYW1lO1xuXHRcdENvbGxlY3RpbmdIYW5kbGVyLnByb3RvdHlwZVtuYW1lXSA9IGZ1bmN0aW9uKCl7XG5cdFx0XHR0aGlzLmV2ZW50cy5wdXNoKFtuYW1lXSk7XG5cdFx0XHRpZih0aGlzLl9jYnNbbmFtZV0pIHRoaXMuX2Nic1tuYW1lXSgpO1xuXHRcdH07XG5cdH0gZWxzZSBpZihFVkVOVFNbbmFtZV0gPT09IDEpe1xuXHRcdG5hbWUgPSBcIm9uXCIgKyBuYW1lO1xuXHRcdENvbGxlY3RpbmdIYW5kbGVyLnByb3RvdHlwZVtuYW1lXSA9IGZ1bmN0aW9uKGEpe1xuXHRcdFx0dGhpcy5ldmVudHMucHVzaChbbmFtZSwgYV0pO1xuXHRcdFx0aWYodGhpcy5fY2JzW25hbWVdKSB0aGlzLl9jYnNbbmFtZV0oYSk7XG5cdFx0fTtcblx0fSBlbHNlIGlmKEVWRU5UU1tuYW1lXSA9PT0gMil7XG5cdFx0bmFtZSA9IFwib25cIiArIG5hbWU7XG5cdFx0Q29sbGVjdGluZ0hhbmRsZXIucHJvdG90eXBlW25hbWVdID0gZnVuY3Rpb24oYSwgYil7XG5cdFx0XHR0aGlzLmV2ZW50cy5wdXNoKFtuYW1lLCBhLCBiXSk7XG5cdFx0XHRpZih0aGlzLl9jYnNbbmFtZV0pIHRoaXMuX2Nic1tuYW1lXShhLCBiKTtcblx0XHR9O1xuXHR9IGVsc2Uge1xuXHRcdHRocm93IEVycm9yKFwid3JvbmcgbnVtYmVyIG9mIGFyZ3VtZW50c1wiKTtcblx0fVxufSk7XG5cbkNvbGxlY3RpbmdIYW5kbGVyLnByb3RvdHlwZS5vbnJlc2V0ID0gZnVuY3Rpb24oKXtcblx0dGhpcy5ldmVudHMgPSBbXTtcblx0aWYodGhpcy5fY2JzLm9ucmVzZXQpIHRoaXMuX2Nicy5vbnJlc2V0KCk7XG59O1xuXG5Db2xsZWN0aW5nSGFuZGxlci5wcm90b3R5cGUucmVzdGFydCA9IGZ1bmN0aW9uKCl7XG5cdGlmKHRoaXMuX2Nicy5vbnJlc2V0KSB0aGlzLl9jYnMub25yZXNldCgpO1xuXG5cdGZvcih2YXIgaSA9IDAsIGxlbiA9IHRoaXMuZXZlbnRzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKXtcblx0XHRpZih0aGlzLl9jYnNbdGhpcy5ldmVudHNbaV1bMF1dKXtcblxuXHRcdFx0dmFyIG51bSA9IHRoaXMuZXZlbnRzW2ldLmxlbmd0aDtcblxuXHRcdFx0aWYobnVtID09PSAxKXtcblx0XHRcdFx0dGhpcy5fY2JzW3RoaXMuZXZlbnRzW2ldWzBdXSgpO1xuXHRcdFx0fSBlbHNlIGlmKG51bSA9PT0gMil7XG5cdFx0XHRcdHRoaXMuX2Nic1t0aGlzLmV2ZW50c1tpXVswXV0odGhpcy5ldmVudHNbaV1bMV0pO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dGhpcy5fY2JzW3RoaXMuZXZlbnRzW2ldWzBdXSh0aGlzLmV2ZW50c1tpXVsxXSwgdGhpcy5ldmVudHNbaV1bMl0pO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxufTtcbiIsInZhciBpbmRleCA9IHJlcXVpcmUoXCIuL2luZGV4LmpzXCIpLFxuICAgIERvbUhhbmRsZXIgPSBpbmRleC5Eb21IYW5kbGVyLFxuICAgIERvbVV0aWxzID0gaW5kZXguRG9tVXRpbHM7XG5cbi8vVE9ETzogbWFrZSB0aGlzIGEgc3RyZWFtYWJsZSBoYW5kbGVyXG5mdW5jdGlvbiBGZWVkSGFuZGxlcihjYWxsYmFjaywgb3B0aW9ucyl7XG5cdHRoaXMuaW5pdChjYWxsYmFjaywgb3B0aW9ucyk7XG59XG5cbnJlcXVpcmUoXCJpbmhlcml0c1wiKShGZWVkSGFuZGxlciwgRG9tSGFuZGxlcik7XG5cbkZlZWRIYW5kbGVyLnByb3RvdHlwZS5pbml0ID0gRG9tSGFuZGxlcjtcblxuZnVuY3Rpb24gZ2V0RWxlbWVudHMod2hhdCwgd2hlcmUpe1xuXHRyZXR1cm4gRG9tVXRpbHMuZ2V0RWxlbWVudHNCeVRhZ05hbWUod2hhdCwgd2hlcmUsIHRydWUpO1xufVxuZnVuY3Rpb24gZ2V0T25lRWxlbWVudCh3aGF0LCB3aGVyZSl7XG5cdHJldHVybiBEb21VdGlscy5nZXRFbGVtZW50c0J5VGFnTmFtZSh3aGF0LCB3aGVyZSwgdHJ1ZSwgMSlbMF07XG59XG5mdW5jdGlvbiBmZXRjaCh3aGF0LCB3aGVyZSwgcmVjdXJzZSl7XG5cdHJldHVybiBEb21VdGlscy5nZXRUZXh0KFxuXHRcdERvbVV0aWxzLmdldEVsZW1lbnRzQnlUYWdOYW1lKHdoYXQsIHdoZXJlLCByZWN1cnNlLCAxKVxuXHQpLnRyaW0oKTtcbn1cblxuZnVuY3Rpb24gYWRkQ29uZGl0aW9uYWxseShvYmosIHByb3AsIHdoYXQsIHdoZXJlLCByZWN1cnNlKXtcblx0dmFyIHRtcCA9IGZldGNoKHdoYXQsIHdoZXJlLCByZWN1cnNlKTtcblx0aWYodG1wKSBvYmpbcHJvcF0gPSB0bXA7XG59XG5cbnZhciBpc1ZhbGlkRmVlZCA9IGZ1bmN0aW9uKHZhbHVlKXtcblx0cmV0dXJuIHZhbHVlID09PSBcInJzc1wiIHx8IHZhbHVlID09PSBcImZlZWRcIiB8fCB2YWx1ZSA9PT0gXCJyZGY6UkRGXCI7XG59O1xuXG5GZWVkSGFuZGxlci5wcm90b3R5cGUub25lbmQgPSBmdW5jdGlvbigpe1xuXHR2YXIgZmVlZCA9IHt9LFxuXHQgICAgZmVlZFJvb3QgPSBnZXRPbmVFbGVtZW50KGlzVmFsaWRGZWVkLCB0aGlzLmRvbSksXG5cdCAgICB0bXAsIGNoaWxkcztcblxuXHRpZihmZWVkUm9vdCl7XG5cdFx0aWYoZmVlZFJvb3QubmFtZSA9PT0gXCJmZWVkXCIpe1xuXHRcdFx0Y2hpbGRzID0gZmVlZFJvb3QuY2hpbGRyZW47XG5cblx0XHRcdGZlZWQudHlwZSA9IFwiYXRvbVwiO1xuXHRcdFx0YWRkQ29uZGl0aW9uYWxseShmZWVkLCBcImlkXCIsIFwiaWRcIiwgY2hpbGRzKTtcblx0XHRcdGFkZENvbmRpdGlvbmFsbHkoZmVlZCwgXCJ0aXRsZVwiLCBcInRpdGxlXCIsIGNoaWxkcyk7XG5cdFx0XHRpZigodG1wID0gZ2V0T25lRWxlbWVudChcImxpbmtcIiwgY2hpbGRzKSkgJiYgKHRtcCA9IHRtcC5hdHRyaWJzKSAmJiAodG1wID0gdG1wLmhyZWYpKSBmZWVkLmxpbmsgPSB0bXA7XG5cdFx0XHRhZGRDb25kaXRpb25hbGx5KGZlZWQsIFwiZGVzY3JpcHRpb25cIiwgXCJzdWJ0aXRsZVwiLCBjaGlsZHMpO1xuXHRcdFx0aWYoKHRtcCA9IGZldGNoKFwidXBkYXRlZFwiLCBjaGlsZHMpKSkgZmVlZC51cGRhdGVkID0gbmV3IERhdGUodG1wKTtcblx0XHRcdGFkZENvbmRpdGlvbmFsbHkoZmVlZCwgXCJhdXRob3JcIiwgXCJlbWFpbFwiLCBjaGlsZHMsIHRydWUpO1xuXG5cdFx0XHRmZWVkLml0ZW1zID0gZ2V0RWxlbWVudHMoXCJlbnRyeVwiLCBjaGlsZHMpLm1hcChmdW5jdGlvbihpdGVtKXtcblx0XHRcdFx0dmFyIGVudHJ5ID0ge30sIHRtcDtcblxuXHRcdFx0XHRpdGVtID0gaXRlbS5jaGlsZHJlbjtcblxuXHRcdFx0XHRhZGRDb25kaXRpb25hbGx5KGVudHJ5LCBcImlkXCIsIFwiaWRcIiwgaXRlbSk7XG5cdFx0XHRcdGFkZENvbmRpdGlvbmFsbHkoZW50cnksIFwidGl0bGVcIiwgXCJ0aXRsZVwiLCBpdGVtKTtcblx0XHRcdFx0aWYoKHRtcCA9IGdldE9uZUVsZW1lbnQoXCJsaW5rXCIsIGl0ZW0pKSAmJiAodG1wID0gdG1wLmF0dHJpYnMpICYmICh0bXAgPSB0bXAuaHJlZikpIGVudHJ5LmxpbmsgPSB0bXA7XG5cdFx0XHRcdGlmKCh0bXAgPSBmZXRjaChcInN1bW1hcnlcIiwgaXRlbSkgfHwgZmV0Y2goXCJjb250ZW50XCIsIGl0ZW0pKSkgZW50cnkuZGVzY3JpcHRpb24gPSB0bXA7XG5cdFx0XHRcdGlmKCh0bXAgPSBmZXRjaChcInVwZGF0ZWRcIiwgaXRlbSkpKSBlbnRyeS5wdWJEYXRlID0gbmV3IERhdGUodG1wKTtcblx0XHRcdFx0cmV0dXJuIGVudHJ5O1xuXHRcdFx0fSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGNoaWxkcyA9IGdldE9uZUVsZW1lbnQoXCJjaGFubmVsXCIsIGZlZWRSb290LmNoaWxkcmVuKS5jaGlsZHJlbjtcblxuXHRcdFx0ZmVlZC50eXBlID0gZmVlZFJvb3QubmFtZS5zdWJzdHIoMCwgMyk7XG5cdFx0XHRmZWVkLmlkID0gXCJcIjtcblx0XHRcdGFkZENvbmRpdGlvbmFsbHkoZmVlZCwgXCJ0aXRsZVwiLCBcInRpdGxlXCIsIGNoaWxkcyk7XG5cdFx0XHRhZGRDb25kaXRpb25hbGx5KGZlZWQsIFwibGlua1wiLCBcImxpbmtcIiwgY2hpbGRzKTtcblx0XHRcdGFkZENvbmRpdGlvbmFsbHkoZmVlZCwgXCJkZXNjcmlwdGlvblwiLCBcImRlc2NyaXB0aW9uXCIsIGNoaWxkcyk7XG5cdFx0XHRpZigodG1wID0gZmV0Y2goXCJsYXN0QnVpbGREYXRlXCIsIGNoaWxkcykpKSBmZWVkLnVwZGF0ZWQgPSBuZXcgRGF0ZSh0bXApO1xuXHRcdFx0YWRkQ29uZGl0aW9uYWxseShmZWVkLCBcImF1dGhvclwiLCBcIm1hbmFnaW5nRWRpdG9yXCIsIGNoaWxkcywgdHJ1ZSk7XG5cblx0XHRcdGZlZWQuaXRlbXMgPSBnZXRFbGVtZW50cyhcIml0ZW1cIiwgZmVlZFJvb3QuY2hpbGRyZW4pLm1hcChmdW5jdGlvbihpdGVtKXtcblx0XHRcdFx0dmFyIGVudHJ5ID0ge30sIHRtcDtcblxuXHRcdFx0XHRpdGVtID0gaXRlbS5jaGlsZHJlbjtcblxuXHRcdFx0XHRhZGRDb25kaXRpb25hbGx5KGVudHJ5LCBcImlkXCIsIFwiZ3VpZFwiLCBpdGVtKTtcblx0XHRcdFx0YWRkQ29uZGl0aW9uYWxseShlbnRyeSwgXCJ0aXRsZVwiLCBcInRpdGxlXCIsIGl0ZW0pO1xuXHRcdFx0XHRhZGRDb25kaXRpb25hbGx5KGVudHJ5LCBcImxpbmtcIiwgXCJsaW5rXCIsIGl0ZW0pO1xuXHRcdFx0XHRhZGRDb25kaXRpb25hbGx5KGVudHJ5LCBcImRlc2NyaXB0aW9uXCIsIFwiZGVzY3JpcHRpb25cIiwgaXRlbSk7XG5cdFx0XHRcdGlmKCh0bXAgPSBmZXRjaChcInB1YkRhdGVcIiwgaXRlbSkpKSBlbnRyeS5wdWJEYXRlID0gbmV3IERhdGUodG1wKTtcblx0XHRcdFx0cmV0dXJuIGVudHJ5O1xuXHRcdFx0fSk7XG5cdFx0fVxuXHR9XG5cdHRoaXMuZG9tID0gZmVlZDtcblx0RG9tSGFuZGxlci5wcm90b3R5cGUuX2hhbmRsZUNhbGxiYWNrLmNhbGwoXG5cdFx0dGhpcywgZmVlZFJvb3QgPyBudWxsIDogRXJyb3IoXCJjb3VsZG4ndCBmaW5kIHJvb3Qgb2YgZmVlZFwiKVxuXHQpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBGZWVkSGFuZGxlcjtcbiIsInZhciBUb2tlbml6ZXIgPSByZXF1aXJlKFwiLi9Ub2tlbml6ZXIuanNcIik7XG5cbi8qXG5cdE9wdGlvbnM6XG5cblx0eG1sTW9kZTogRGlzYWJsZXMgdGhlIHNwZWNpYWwgYmVoYXZpb3IgZm9yIHNjcmlwdC9zdHlsZSB0YWdzIChmYWxzZSBieSBkZWZhdWx0KVxuXHRsb3dlckNhc2VBdHRyaWJ1dGVOYW1lczogY2FsbCAudG9Mb3dlckNhc2UgZm9yIGVhY2ggYXR0cmlidXRlIG5hbWUgKHRydWUgaWYgeG1sTW9kZSBpcyBgZmFsc2VgKVxuXHRsb3dlckNhc2VUYWdzOiBjYWxsIC50b0xvd2VyQ2FzZSBmb3IgZWFjaCB0YWcgbmFtZSAodHJ1ZSBpZiB4bWxNb2RlIGlzIGBmYWxzZWApXG4qL1xuXG4vKlxuXHRDYWxsYmFja3M6XG5cblx0b25jZGF0YWVuZCxcblx0b25jZGF0YXN0YXJ0LFxuXHRvbmNsb3NldGFnLFxuXHRvbmNvbW1lbnQsXG5cdG9uY29tbWVudGVuZCxcblx0b25lcnJvcixcblx0b25vcGVudGFnLFxuXHRvbnByb2Nlc3NpbmdpbnN0cnVjdGlvbixcblx0b25yZXNldCxcblx0b250ZXh0XG4qL1xuXG52YXIgZm9ybVRhZ3MgPSB7XG5cdGlucHV0OiB0cnVlLFxuXHRvcHRpb246IHRydWUsXG5cdG9wdGdyb3VwOiB0cnVlLFxuXHRzZWxlY3Q6IHRydWUsXG5cdGJ1dHRvbjogdHJ1ZSxcblx0ZGF0YWxpc3Q6IHRydWUsXG5cdHRleHRhcmVhOiB0cnVlXG59O1xuXG52YXIgb3BlbkltcGxpZXNDbG9zZSA9IHtcblx0dHIgICAgICA6IHsgdHI6dHJ1ZSwgdGg6dHJ1ZSwgdGQ6dHJ1ZSB9LFxuXHR0aCAgICAgIDogeyB0aDp0cnVlIH0sXG5cdHRkICAgICAgOiB7IHRoZWFkOnRydWUsIHRoOnRydWUsIHRkOnRydWUgfSxcblx0Ym9keSAgICA6IHsgaGVhZDp0cnVlLCBsaW5rOnRydWUsIHNjcmlwdDp0cnVlIH0sXG5cdGxpICAgICAgOiB7IGxpOnRydWUgfSxcblx0cCAgICAgICA6IHsgcDp0cnVlIH0sXG5cdGgxICAgICAgOiB7IHA6dHJ1ZSB9LFxuXHRoMiAgICAgIDogeyBwOnRydWUgfSxcblx0aDMgICAgICA6IHsgcDp0cnVlIH0sXG5cdGg0ICAgICAgOiB7IHA6dHJ1ZSB9LFxuXHRoNSAgICAgIDogeyBwOnRydWUgfSxcblx0aDYgICAgICA6IHsgcDp0cnVlIH0sXG5cdHNlbGVjdCAgOiBmb3JtVGFncyxcblx0aW5wdXQgICA6IGZvcm1UYWdzLFxuXHRvdXRwdXQgIDogZm9ybVRhZ3MsXG5cdGJ1dHRvbiAgOiBmb3JtVGFncyxcblx0ZGF0YWxpc3Q6IGZvcm1UYWdzLFxuXHR0ZXh0YXJlYTogZm9ybVRhZ3MsXG5cdG9wdGlvbiAgOiB7IG9wdGlvbjp0cnVlIH0sXG5cdG9wdGdyb3VwOiB7IG9wdGdyb3VwOnRydWUgfVxufTtcblxudmFyIHZvaWRFbGVtZW50cyA9IHtcblx0X19wcm90b19fOiBudWxsLFxuXHRhcmVhOiB0cnVlLFxuXHRiYXNlOiB0cnVlLFxuXHRiYXNlZm9udDogdHJ1ZSxcblx0YnI6IHRydWUsXG5cdGNvbDogdHJ1ZSxcblx0Y29tbWFuZDogdHJ1ZSxcblx0ZW1iZWQ6IHRydWUsXG5cdGZyYW1lOiB0cnVlLFxuXHRocjogdHJ1ZSxcblx0aW1nOiB0cnVlLFxuXHRpbnB1dDogdHJ1ZSxcblx0aXNpbmRleDogdHJ1ZSxcblx0a2V5Z2VuOiB0cnVlLFxuXHRsaW5rOiB0cnVlLFxuXHRtZXRhOiB0cnVlLFxuXHRwYXJhbTogdHJ1ZSxcblx0c291cmNlOiB0cnVlLFxuXHR0cmFjazogdHJ1ZSxcblx0d2JyOiB0cnVlLFxuXG5cdC8vY29tbW9uIHNlbGYgY2xvc2luZyBzdmcgZWxlbWVudHNcblx0cGF0aDogdHJ1ZSxcblx0Y2lyY2xlOiB0cnVlLFxuXHRlbGxpcHNlOiB0cnVlLFxuXHRsaW5lOiB0cnVlLFxuXHRyZWN0OiB0cnVlLFxuXHR1c2U6IHRydWUsXG5cdHN0b3A6IHRydWUsXG5cdHBvbHlsaW5lOiB0cnVlLFxuXHRwb2x5Z29uOiB0cnVlXG59O1xuXG52YXIgcmVfbmFtZUVuZCA9IC9cXHN8XFwvLztcblxuZnVuY3Rpb24gUGFyc2VyKGNicywgb3B0aW9ucyl7XG5cdHRoaXMuX29wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXHR0aGlzLl9jYnMgPSBjYnMgfHwge307XG5cblx0dGhpcy5fdGFnbmFtZSA9IFwiXCI7XG5cdHRoaXMuX2F0dHJpYm5hbWUgPSBcIlwiO1xuXHR0aGlzLl9hdHRyaWJ2YWx1ZSA9IFwiXCI7XG5cdHRoaXMuX2F0dHJpYnMgPSBudWxsO1xuXHR0aGlzLl9zdGFjayA9IFtdO1xuXG5cdHRoaXMuc3RhcnRJbmRleCA9IDA7XG5cdHRoaXMuZW5kSW5kZXggPSBudWxsO1xuXG5cdHRoaXMuX2xvd2VyQ2FzZVRhZ05hbWVzID0gXCJsb3dlckNhc2VUYWdzXCIgaW4gdGhpcy5fb3B0aW9ucyA/XG5cdFx0XHRcdFx0XHRcdFx0XHQhIXRoaXMuX29wdGlvbnMubG93ZXJDYXNlVGFncyA6XG5cdFx0XHRcdFx0XHRcdFx0XHQhdGhpcy5fb3B0aW9ucy54bWxNb2RlO1xuXHR0aGlzLl9sb3dlckNhc2VBdHRyaWJ1dGVOYW1lcyA9IFwibG93ZXJDYXNlQXR0cmlidXRlTmFtZXNcIiBpbiB0aGlzLl9vcHRpb25zID9cblx0XHRcdFx0XHRcdFx0XHRcdCEhdGhpcy5fb3B0aW9ucy5sb3dlckNhc2VBdHRyaWJ1dGVOYW1lcyA6XG5cdFx0XHRcdFx0XHRcdFx0XHQhdGhpcy5fb3B0aW9ucy54bWxNb2RlO1xuXG5cdGlmKHRoaXMuX29wdGlvbnMuVG9rZW5pemVyKSB7XG5cdFx0VG9rZW5pemVyID0gdGhpcy5fb3B0aW9ucy5Ub2tlbml6ZXI7XG5cdH1cblx0dGhpcy5fdG9rZW5pemVyID0gbmV3IFRva2VuaXplcih0aGlzLl9vcHRpb25zLCB0aGlzKTtcblxuXHRpZih0aGlzLl9jYnMub25wYXJzZXJpbml0KSB0aGlzLl9jYnMub25wYXJzZXJpbml0KHRoaXMpO1xufVxuXG5yZXF1aXJlKFwiaW5oZXJpdHNcIikoUGFyc2VyLCByZXF1aXJlKFwiZXZlbnRzXCIpLkV2ZW50RW1pdHRlcik7XG5cblBhcnNlci5wcm90b3R5cGUuX3VwZGF0ZVBvc2l0aW9uID0gZnVuY3Rpb24oaW5pdGlhbE9mZnNldCl7XG5cdGlmKHRoaXMuZW5kSW5kZXggPT09IG51bGwpe1xuXHRcdGlmKHRoaXMuX3Rva2VuaXplci5fc2VjdGlvblN0YXJ0IDw9IGluaXRpYWxPZmZzZXQpe1xuXHRcdFx0dGhpcy5zdGFydEluZGV4ID0gMDtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5zdGFydEluZGV4ID0gdGhpcy5fdG9rZW5pemVyLl9zZWN0aW9uU3RhcnQgLSBpbml0aWFsT2Zmc2V0O1xuXHRcdH1cblx0fVxuXHRlbHNlIHRoaXMuc3RhcnRJbmRleCA9IHRoaXMuZW5kSW5kZXggKyAxO1xuXHR0aGlzLmVuZEluZGV4ID0gdGhpcy5fdG9rZW5pemVyLmdldEFic29sdXRlSW5kZXgoKTtcbn07XG5cbi8vVG9rZW5pemVyIGV2ZW50IGhhbmRsZXJzXG5QYXJzZXIucHJvdG90eXBlLm9udGV4dCA9IGZ1bmN0aW9uKGRhdGEpe1xuXHR0aGlzLl91cGRhdGVQb3NpdGlvbigxKTtcblx0dGhpcy5lbmRJbmRleC0tO1xuXG5cdGlmKHRoaXMuX2Nicy5vbnRleHQpIHRoaXMuX2Nicy5vbnRleHQoZGF0YSk7XG59O1xuXG5QYXJzZXIucHJvdG90eXBlLm9ub3BlbnRhZ25hbWUgPSBmdW5jdGlvbihuYW1lKXtcblx0aWYodGhpcy5fbG93ZXJDYXNlVGFnTmFtZXMpe1xuXHRcdG5hbWUgPSBuYW1lLnRvTG93ZXJDYXNlKCk7XG5cdH1cblxuXHR0aGlzLl90YWduYW1lID0gbmFtZTtcblxuXHRpZighdGhpcy5fb3B0aW9ucy54bWxNb2RlICYmIG5hbWUgaW4gb3BlbkltcGxpZXNDbG9zZSkge1xuXHRcdGZvcihcblx0XHRcdHZhciBlbDtcblx0XHRcdChlbCA9IHRoaXMuX3N0YWNrW3RoaXMuX3N0YWNrLmxlbmd0aCAtIDFdKSBpbiBvcGVuSW1wbGllc0Nsb3NlW25hbWVdO1xuXHRcdFx0dGhpcy5vbmNsb3NldGFnKGVsKVxuXHRcdCk7XG5cdH1cblxuXHRpZih0aGlzLl9vcHRpb25zLnhtbE1vZGUgfHwgIShuYW1lIGluIHZvaWRFbGVtZW50cykpe1xuXHRcdHRoaXMuX3N0YWNrLnB1c2gobmFtZSk7XG5cdH1cblxuXHRpZih0aGlzLl9jYnMub25vcGVudGFnbmFtZSkgdGhpcy5fY2JzLm9ub3BlbnRhZ25hbWUobmFtZSk7XG5cdGlmKHRoaXMuX2Nicy5vbm9wZW50YWcpIHRoaXMuX2F0dHJpYnMgPSB7fTtcbn07XG5cblBhcnNlci5wcm90b3R5cGUub25vcGVudGFnZW5kID0gZnVuY3Rpb24oKXtcblx0dGhpcy5fdXBkYXRlUG9zaXRpb24oMSk7XG5cblx0aWYodGhpcy5fYXR0cmlicyl7XG5cdFx0aWYodGhpcy5fY2JzLm9ub3BlbnRhZykgdGhpcy5fY2JzLm9ub3BlbnRhZyh0aGlzLl90YWduYW1lLCB0aGlzLl9hdHRyaWJzKTtcblx0XHR0aGlzLl9hdHRyaWJzID0gbnVsbDtcblx0fVxuXG5cdGlmKCF0aGlzLl9vcHRpb25zLnhtbE1vZGUgJiYgdGhpcy5fY2JzLm9uY2xvc2V0YWcgJiYgdGhpcy5fdGFnbmFtZSBpbiB2b2lkRWxlbWVudHMpe1xuXHRcdHRoaXMuX2Nicy5vbmNsb3NldGFnKHRoaXMuX3RhZ25hbWUpO1xuXHR9XG5cblx0dGhpcy5fdGFnbmFtZSA9IFwiXCI7XG59O1xuXG5QYXJzZXIucHJvdG90eXBlLm9uY2xvc2V0YWcgPSBmdW5jdGlvbihuYW1lKXtcblx0dGhpcy5fdXBkYXRlUG9zaXRpb24oMSk7XG5cblx0aWYodGhpcy5fbG93ZXJDYXNlVGFnTmFtZXMpe1xuXHRcdG5hbWUgPSBuYW1lLnRvTG93ZXJDYXNlKCk7XG5cdH1cblxuXHRpZih0aGlzLl9zdGFjay5sZW5ndGggJiYgKCEobmFtZSBpbiB2b2lkRWxlbWVudHMpIHx8IHRoaXMuX29wdGlvbnMueG1sTW9kZSkpe1xuXHRcdHZhciBwb3MgPSB0aGlzLl9zdGFjay5sYXN0SW5kZXhPZihuYW1lKTtcblx0XHRpZihwb3MgIT09IC0xKXtcblx0XHRcdGlmKHRoaXMuX2Nicy5vbmNsb3NldGFnKXtcblx0XHRcdFx0cG9zID0gdGhpcy5fc3RhY2subGVuZ3RoIC0gcG9zO1xuXHRcdFx0XHR3aGlsZShwb3MtLSkgdGhpcy5fY2JzLm9uY2xvc2V0YWcodGhpcy5fc3RhY2sucG9wKCkpO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZSB0aGlzLl9zdGFjay5sZW5ndGggPSBwb3M7XG5cdFx0fSBlbHNlIGlmKG5hbWUgPT09IFwicFwiICYmICF0aGlzLl9vcHRpb25zLnhtbE1vZGUpe1xuXHRcdFx0dGhpcy5vbm9wZW50YWduYW1lKG5hbWUpO1xuXHRcdFx0dGhpcy5fY2xvc2VDdXJyZW50VGFnKCk7XG5cdFx0fVxuXHR9IGVsc2UgaWYoIXRoaXMuX29wdGlvbnMueG1sTW9kZSAmJiAobmFtZSA9PT0gXCJiclwiIHx8IG5hbWUgPT09IFwicFwiKSl7XG5cdFx0dGhpcy5vbm9wZW50YWduYW1lKG5hbWUpO1xuXHRcdHRoaXMuX2Nsb3NlQ3VycmVudFRhZygpO1xuXHR9XG59O1xuXG5QYXJzZXIucHJvdG90eXBlLm9uc2VsZmNsb3Npbmd0YWcgPSBmdW5jdGlvbigpe1xuXHRpZih0aGlzLl9vcHRpb25zLnhtbE1vZGUgfHwgdGhpcy5fb3B0aW9ucy5yZWNvZ25pemVTZWxmQ2xvc2luZyl7XG5cdFx0dGhpcy5fY2xvc2VDdXJyZW50VGFnKCk7XG5cdH0gZWxzZSB7XG5cdFx0dGhpcy5vbm9wZW50YWdlbmQoKTtcblx0fVxufTtcblxuUGFyc2VyLnByb3RvdHlwZS5fY2xvc2VDdXJyZW50VGFnID0gZnVuY3Rpb24oKXtcblx0dmFyIG5hbWUgPSB0aGlzLl90YWduYW1lO1xuXG5cdHRoaXMub25vcGVudGFnZW5kKCk7XG5cblx0Ly9zZWxmLWNsb3NpbmcgdGFncyB3aWxsIGJlIG9uIHRoZSB0b3Agb2YgdGhlIHN0YWNrXG5cdC8vKGNoZWFwZXIgY2hlY2sgdGhhbiBpbiBvbmNsb3NldGFnKVxuXHRpZih0aGlzLl9zdGFja1t0aGlzLl9zdGFjay5sZW5ndGggLSAxXSA9PT0gbmFtZSl7XG5cdFx0aWYodGhpcy5fY2JzLm9uY2xvc2V0YWcpe1xuXHRcdFx0dGhpcy5fY2JzLm9uY2xvc2V0YWcobmFtZSk7XG5cdFx0fVxuXHRcdHRoaXMuX3N0YWNrLnBvcCgpO1xuXHR9XG59O1xuXG5QYXJzZXIucHJvdG90eXBlLm9uYXR0cmlibmFtZSA9IGZ1bmN0aW9uKG5hbWUpe1xuXHRpZih0aGlzLl9sb3dlckNhc2VBdHRyaWJ1dGVOYW1lcyl7XG5cdFx0bmFtZSA9IG5hbWUudG9Mb3dlckNhc2UoKTtcblx0fVxuXHR0aGlzLl9hdHRyaWJuYW1lID0gbmFtZTtcbn07XG5cblBhcnNlci5wcm90b3R5cGUub25hdHRyaWJkYXRhID0gZnVuY3Rpb24odmFsdWUpe1xuXHR0aGlzLl9hdHRyaWJ2YWx1ZSArPSB2YWx1ZTtcbn07XG5cblBhcnNlci5wcm90b3R5cGUub25hdHRyaWJlbmQgPSBmdW5jdGlvbigpe1xuXHRpZih0aGlzLl9jYnMub25hdHRyaWJ1dGUpIHRoaXMuX2Nicy5vbmF0dHJpYnV0ZSh0aGlzLl9hdHRyaWJuYW1lLCB0aGlzLl9hdHRyaWJ2YWx1ZSk7XG5cdGlmKFxuXHRcdHRoaXMuX2F0dHJpYnMgJiZcblx0XHQhT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHRoaXMuX2F0dHJpYnMsIHRoaXMuX2F0dHJpYm5hbWUpXG5cdCl7XG5cdFx0dGhpcy5fYXR0cmlic1t0aGlzLl9hdHRyaWJuYW1lXSA9IHRoaXMuX2F0dHJpYnZhbHVlO1xuXHR9XG5cdHRoaXMuX2F0dHJpYm5hbWUgPSBcIlwiO1xuXHR0aGlzLl9hdHRyaWJ2YWx1ZSA9IFwiXCI7XG59O1xuXG5QYXJzZXIucHJvdG90eXBlLl9nZXRJbnN0cnVjdGlvbk5hbWUgPSBmdW5jdGlvbih2YWx1ZSl7XG5cdHZhciBpZHggPSB2YWx1ZS5zZWFyY2gocmVfbmFtZUVuZCksXG5cdCAgICBuYW1lID0gaWR4IDwgMCA/IHZhbHVlIDogdmFsdWUuc3Vic3RyKDAsIGlkeCk7XG5cblx0aWYodGhpcy5fbG93ZXJDYXNlVGFnTmFtZXMpe1xuXHRcdG5hbWUgPSBuYW1lLnRvTG93ZXJDYXNlKCk7XG5cdH1cblxuXHRyZXR1cm4gbmFtZTtcbn07XG5cblBhcnNlci5wcm90b3R5cGUub25kZWNsYXJhdGlvbiA9IGZ1bmN0aW9uKHZhbHVlKXtcblx0aWYodGhpcy5fY2JzLm9ucHJvY2Vzc2luZ2luc3RydWN0aW9uKXtcblx0XHR2YXIgbmFtZSA9IHRoaXMuX2dldEluc3RydWN0aW9uTmFtZSh2YWx1ZSk7XG5cdFx0dGhpcy5fY2JzLm9ucHJvY2Vzc2luZ2luc3RydWN0aW9uKFwiIVwiICsgbmFtZSwgXCIhXCIgKyB2YWx1ZSk7XG5cdH1cbn07XG5cblBhcnNlci5wcm90b3R5cGUub25wcm9jZXNzaW5naW5zdHJ1Y3Rpb24gPSBmdW5jdGlvbih2YWx1ZSl7XG5cdGlmKHRoaXMuX2Nicy5vbnByb2Nlc3NpbmdpbnN0cnVjdGlvbil7XG5cdFx0dmFyIG5hbWUgPSB0aGlzLl9nZXRJbnN0cnVjdGlvbk5hbWUodmFsdWUpO1xuXHRcdHRoaXMuX2Nicy5vbnByb2Nlc3NpbmdpbnN0cnVjdGlvbihcIj9cIiArIG5hbWUsIFwiP1wiICsgdmFsdWUpO1xuXHR9XG59O1xuXG5QYXJzZXIucHJvdG90eXBlLm9uY29tbWVudCA9IGZ1bmN0aW9uKHZhbHVlKXtcblx0dGhpcy5fdXBkYXRlUG9zaXRpb24oNCk7XG5cblx0aWYodGhpcy5fY2JzLm9uY29tbWVudCkgdGhpcy5fY2JzLm9uY29tbWVudCh2YWx1ZSk7XG5cdGlmKHRoaXMuX2Nicy5vbmNvbW1lbnRlbmQpIHRoaXMuX2Nicy5vbmNvbW1lbnRlbmQoKTtcbn07XG5cblBhcnNlci5wcm90b3R5cGUub25jZGF0YSA9IGZ1bmN0aW9uKHZhbHVlKXtcblx0dGhpcy5fdXBkYXRlUG9zaXRpb24oMSk7XG5cblx0aWYodGhpcy5fb3B0aW9ucy54bWxNb2RlIHx8IHRoaXMuX29wdGlvbnMucmVjb2duaXplQ0RBVEEpe1xuXHRcdGlmKHRoaXMuX2Nicy5vbmNkYXRhc3RhcnQpIHRoaXMuX2Nicy5vbmNkYXRhc3RhcnQoKTtcblx0XHRpZih0aGlzLl9jYnMub250ZXh0KSB0aGlzLl9jYnMub250ZXh0KHZhbHVlKTtcblx0XHRpZih0aGlzLl9jYnMub25jZGF0YWVuZCkgdGhpcy5fY2JzLm9uY2RhdGFlbmQoKTtcblx0fSBlbHNlIHtcblx0XHR0aGlzLm9uY29tbWVudChcIltDREFUQVtcIiArIHZhbHVlICsgXCJdXVwiKTtcblx0fVxufTtcblxuUGFyc2VyLnByb3RvdHlwZS5vbmVycm9yID0gZnVuY3Rpb24oZXJyKXtcblx0aWYodGhpcy5fY2JzLm9uZXJyb3IpIHRoaXMuX2Nicy5vbmVycm9yKGVycik7XG59O1xuXG5QYXJzZXIucHJvdG90eXBlLm9uZW5kID0gZnVuY3Rpb24oKXtcblx0aWYodGhpcy5fY2JzLm9uY2xvc2V0YWcpe1xuXHRcdGZvcihcblx0XHRcdHZhciBpID0gdGhpcy5fc3RhY2subGVuZ3RoO1xuXHRcdFx0aSA+IDA7XG5cdFx0XHR0aGlzLl9jYnMub25jbG9zZXRhZyh0aGlzLl9zdGFja1stLWldKVxuXHRcdCk7XG5cdH1cblx0aWYodGhpcy5fY2JzLm9uZW5kKSB0aGlzLl9jYnMub25lbmQoKTtcbn07XG5cblxuLy9SZXNldHMgdGhlIHBhcnNlciB0byBhIGJsYW5rIHN0YXRlLCByZWFkeSB0byBwYXJzZSBhIG5ldyBIVE1MIGRvY3VtZW50XG5QYXJzZXIucHJvdG90eXBlLnJlc2V0ID0gZnVuY3Rpb24oKXtcblx0aWYodGhpcy5fY2JzLm9ucmVzZXQpIHRoaXMuX2Nicy5vbnJlc2V0KCk7XG5cdHRoaXMuX3Rva2VuaXplci5yZXNldCgpO1xuXG5cdHRoaXMuX3RhZ25hbWUgPSBcIlwiO1xuXHR0aGlzLl9hdHRyaWJuYW1lID0gXCJcIjtcblx0dGhpcy5fYXR0cmlicyA9IG51bGw7XG5cdHRoaXMuX3N0YWNrID0gW107XG5cblx0aWYodGhpcy5fY2JzLm9ucGFyc2VyaW5pdCkgdGhpcy5fY2JzLm9ucGFyc2VyaW5pdCh0aGlzKTtcbn07XG5cbi8vUGFyc2VzIGEgY29tcGxldGUgSFRNTCBkb2N1bWVudCBhbmQgcHVzaGVzIGl0IHRvIHRoZSBoYW5kbGVyXG5QYXJzZXIucHJvdG90eXBlLnBhcnNlQ29tcGxldGUgPSBmdW5jdGlvbihkYXRhKXtcblx0dGhpcy5yZXNldCgpO1xuXHR0aGlzLmVuZChkYXRhKTtcbn07XG5cblBhcnNlci5wcm90b3R5cGUud3JpdGUgPSBmdW5jdGlvbihjaHVuayl7XG5cdHRoaXMuX3Rva2VuaXplci53cml0ZShjaHVuayk7XG59O1xuXG5QYXJzZXIucHJvdG90eXBlLmVuZCA9IGZ1bmN0aW9uKGNodW5rKXtcblx0dGhpcy5fdG9rZW5pemVyLmVuZChjaHVuayk7XG59O1xuXG5QYXJzZXIucHJvdG90eXBlLnBhdXNlID0gZnVuY3Rpb24oKXtcblx0dGhpcy5fdG9rZW5pemVyLnBhdXNlKCk7XG59O1xuXG5QYXJzZXIucHJvdG90eXBlLnJlc3VtZSA9IGZ1bmN0aW9uKCl7XG5cdHRoaXMuX3Rva2VuaXplci5yZXN1bWUoKTtcbn07XG5cbi8vYWxpYXMgZm9yIGJhY2t3YXJkcyBjb21wYXRcblBhcnNlci5wcm90b3R5cGUucGFyc2VDaHVuayA9IFBhcnNlci5wcm90b3R5cGUud3JpdGU7XG5QYXJzZXIucHJvdG90eXBlLmRvbmUgPSBQYXJzZXIucHJvdG90eXBlLmVuZDtcblxubW9kdWxlLmV4cG9ydHMgPSBQYXJzZXI7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IFByb3h5SGFuZGxlcjtcblxuZnVuY3Rpb24gUHJveHlIYW5kbGVyKGNicyl7XG5cdHRoaXMuX2NicyA9IGNicyB8fCB7fTtcbn1cblxudmFyIEVWRU5UUyA9IHJlcXVpcmUoXCIuL1wiKS5FVkVOVFM7XG5PYmplY3Qua2V5cyhFVkVOVFMpLmZvckVhY2goZnVuY3Rpb24obmFtZSl7XG5cdGlmKEVWRU5UU1tuYW1lXSA9PT0gMCl7XG5cdFx0bmFtZSA9IFwib25cIiArIG5hbWU7XG5cdFx0UHJveHlIYW5kbGVyLnByb3RvdHlwZVtuYW1lXSA9IGZ1bmN0aW9uKCl7XG5cdFx0XHRpZih0aGlzLl9jYnNbbmFtZV0pIHRoaXMuX2Nic1tuYW1lXSgpO1xuXHRcdH07XG5cdH0gZWxzZSBpZihFVkVOVFNbbmFtZV0gPT09IDEpe1xuXHRcdG5hbWUgPSBcIm9uXCIgKyBuYW1lO1xuXHRcdFByb3h5SGFuZGxlci5wcm90b3R5cGVbbmFtZV0gPSBmdW5jdGlvbihhKXtcblx0XHRcdGlmKHRoaXMuX2Nic1tuYW1lXSkgdGhpcy5fY2JzW25hbWVdKGEpO1xuXHRcdH07XG5cdH0gZWxzZSBpZihFVkVOVFNbbmFtZV0gPT09IDIpe1xuXHRcdG5hbWUgPSBcIm9uXCIgKyBuYW1lO1xuXHRcdFByb3h5SGFuZGxlci5wcm90b3R5cGVbbmFtZV0gPSBmdW5jdGlvbihhLCBiKXtcblx0XHRcdGlmKHRoaXMuX2Nic1tuYW1lXSkgdGhpcy5fY2JzW25hbWVdKGEsIGIpO1xuXHRcdH07XG5cdH0gZWxzZSB7XG5cdFx0dGhyb3cgRXJyb3IoXCJ3cm9uZyBudW1iZXIgb2YgYXJndW1lbnRzXCIpO1xuXHR9XG59KTsiLCJtb2R1bGUuZXhwb3J0cyA9IFN0cmVhbTtcblxudmFyIFBhcnNlciA9IHJlcXVpcmUoXCIuL1dyaXRhYmxlU3RyZWFtLmpzXCIpO1xuXG5mdW5jdGlvbiBTdHJlYW0ob3B0aW9ucyl7XG5cdFBhcnNlci5jYWxsKHRoaXMsIG5ldyBDYnModGhpcyksIG9wdGlvbnMpO1xufVxuXG5yZXF1aXJlKFwiaW5oZXJpdHNcIikoU3RyZWFtLCBQYXJzZXIpO1xuXG5TdHJlYW0ucHJvdG90eXBlLnJlYWRhYmxlID0gdHJ1ZTtcblxuZnVuY3Rpb24gQ2JzKHNjb3BlKXtcblx0dGhpcy5zY29wZSA9IHNjb3BlO1xufVxuXG52YXIgRVZFTlRTID0gcmVxdWlyZShcIi4uL1wiKS5FVkVOVFM7XG5cbk9iamVjdC5rZXlzKEVWRU5UUykuZm9yRWFjaChmdW5jdGlvbihuYW1lKXtcblx0aWYoRVZFTlRTW25hbWVdID09PSAwKXtcblx0XHRDYnMucHJvdG90eXBlW1wib25cIiArIG5hbWVdID0gZnVuY3Rpb24oKXtcblx0XHRcdHRoaXMuc2NvcGUuZW1pdChuYW1lKTtcblx0XHR9O1xuXHR9IGVsc2UgaWYoRVZFTlRTW25hbWVdID09PSAxKXtcblx0XHRDYnMucHJvdG90eXBlW1wib25cIiArIG5hbWVdID0gZnVuY3Rpb24oYSl7XG5cdFx0XHR0aGlzLnNjb3BlLmVtaXQobmFtZSwgYSk7XG5cdFx0fTtcblx0fSBlbHNlIGlmKEVWRU5UU1tuYW1lXSA9PT0gMil7XG5cdFx0Q2JzLnByb3RvdHlwZVtcIm9uXCIgKyBuYW1lXSA9IGZ1bmN0aW9uKGEsIGIpe1xuXHRcdFx0dGhpcy5zY29wZS5lbWl0KG5hbWUsIGEsIGIpO1xuXHRcdH07XG5cdH0gZWxzZSB7XG5cdFx0dGhyb3cgRXJyb3IoXCJ3cm9uZyBudW1iZXIgb2YgYXJndW1lbnRzIVwiKTtcblx0fVxufSk7IiwibW9kdWxlLmV4cG9ydHMgPSBUb2tlbml6ZXI7XG5cbnZhciBkZWNvZGVDb2RlUG9pbnQgPSByZXF1aXJlKFwiZW50aXRpZXMvbGliL2RlY29kZV9jb2RlcG9pbnQuanNcIiksXG4gICAgZW50aXR5TWFwID0gcmVxdWlyZShcImVudGl0aWVzL21hcHMvZW50aXRpZXMuanNvblwiKSxcbiAgICBsZWdhY3lNYXAgPSByZXF1aXJlKFwiZW50aXRpZXMvbWFwcy9sZWdhY3kuanNvblwiKSxcbiAgICB4bWxNYXAgICAgPSByZXF1aXJlKFwiZW50aXRpZXMvbWFwcy94bWwuanNvblwiKSxcblxuICAgIGkgPSAwLFxuXG4gICAgVEVYVCAgICAgICAgICAgICAgICAgICAgICA9IGkrKyxcbiAgICBCRUZPUkVfVEFHX05BTUUgICAgICAgICAgID0gaSsrLCAvL2FmdGVyIDxcbiAgICBJTl9UQUdfTkFNRSAgICAgICAgICAgICAgID0gaSsrLFxuICAgIElOX1NFTEZfQ0xPU0lOR19UQUcgICAgICAgPSBpKyssXG4gICAgQkVGT1JFX0NMT1NJTkdfVEFHX05BTUUgICA9IGkrKyxcbiAgICBJTl9DTE9TSU5HX1RBR19OQU1FICAgICAgID0gaSsrLFxuICAgIEFGVEVSX0NMT1NJTkdfVEFHX05BTUUgICAgPSBpKyssXG5cbiAgICAvL2F0dHJpYnV0ZXNcbiAgICBCRUZPUkVfQVRUUklCVVRFX05BTUUgICAgID0gaSsrLFxuICAgIElOX0FUVFJJQlVURV9OQU1FICAgICAgICAgPSBpKyssXG4gICAgQUZURVJfQVRUUklCVVRFX05BTUUgICAgICA9IGkrKyxcbiAgICBCRUZPUkVfQVRUUklCVVRFX1ZBTFVFICAgID0gaSsrLFxuICAgIElOX0FUVFJJQlVURV9WQUxVRV9EUSAgICAgPSBpKyssIC8vIFwiXG4gICAgSU5fQVRUUklCVVRFX1ZBTFVFX1NRICAgICA9IGkrKywgLy8gJ1xuICAgIElOX0FUVFJJQlVURV9WQUxVRV9OUSAgICAgPSBpKyssXG5cbiAgICAvL2RlY2xhcmF0aW9uc1xuICAgIEJFRk9SRV9ERUNMQVJBVElPTiAgICAgICAgPSBpKyssIC8vICFcbiAgICBJTl9ERUNMQVJBVElPTiAgICAgICAgICAgID0gaSsrLFxuXG4gICAgLy9wcm9jZXNzaW5nIGluc3RydWN0aW9uc1xuICAgIElOX1BST0NFU1NJTkdfSU5TVFJVQ1RJT04gPSBpKyssIC8vID9cblxuICAgIC8vY29tbWVudHNcbiAgICBCRUZPUkVfQ09NTUVOVCAgICAgICAgICAgID0gaSsrLFxuICAgIElOX0NPTU1FTlQgICAgICAgICAgICAgICAgPSBpKyssXG4gICAgQUZURVJfQ09NTUVOVF8xICAgICAgICAgICA9IGkrKyxcbiAgICBBRlRFUl9DT01NRU5UXzIgICAgICAgICAgID0gaSsrLFxuXG4gICAgLy9jZGF0YVxuICAgIEJFRk9SRV9DREFUQV8xICAgICAgICAgICAgPSBpKyssIC8vIFtcbiAgICBCRUZPUkVfQ0RBVEFfMiAgICAgICAgICAgID0gaSsrLCAvLyBDXG4gICAgQkVGT1JFX0NEQVRBXzMgICAgICAgICAgICA9IGkrKywgLy8gRFxuICAgIEJFRk9SRV9DREFUQV80ICAgICAgICAgICAgPSBpKyssIC8vIEFcbiAgICBCRUZPUkVfQ0RBVEFfNSAgICAgICAgICAgID0gaSsrLCAvLyBUXG4gICAgQkVGT1JFX0NEQVRBXzYgICAgICAgICAgICA9IGkrKywgLy8gQVxuICAgIElOX0NEQVRBICAgICAgICAgICAgICAgICAgPSBpKyssIC8vIFtcbiAgICBBRlRFUl9DREFUQV8xICAgICAgICAgICAgID0gaSsrLCAvLyBdXG4gICAgQUZURVJfQ0RBVEFfMiAgICAgICAgICAgICA9IGkrKywgLy8gXVxuXG4gICAgLy9zcGVjaWFsIHRhZ3NcbiAgICBCRUZPUkVfU1BFQ0lBTCAgICAgICAgICAgID0gaSsrLCAvL1NcbiAgICBCRUZPUkVfU1BFQ0lBTF9FTkQgICAgICAgID0gaSsrLCAgIC8vU1xuXG4gICAgQkVGT1JFX1NDUklQVF8xICAgICAgICAgICA9IGkrKywgLy9DXG4gICAgQkVGT1JFX1NDUklQVF8yICAgICAgICAgICA9IGkrKywgLy9SXG4gICAgQkVGT1JFX1NDUklQVF8zICAgICAgICAgICA9IGkrKywgLy9JXG4gICAgQkVGT1JFX1NDUklQVF80ICAgICAgICAgICA9IGkrKywgLy9QXG4gICAgQkVGT1JFX1NDUklQVF81ICAgICAgICAgICA9IGkrKywgLy9UXG4gICAgQUZURVJfU0NSSVBUXzEgICAgICAgICAgICA9IGkrKywgLy9DXG4gICAgQUZURVJfU0NSSVBUXzIgICAgICAgICAgICA9IGkrKywgLy9SXG4gICAgQUZURVJfU0NSSVBUXzMgICAgICAgICAgICA9IGkrKywgLy9JXG4gICAgQUZURVJfU0NSSVBUXzQgICAgICAgICAgICA9IGkrKywgLy9QXG4gICAgQUZURVJfU0NSSVBUXzUgICAgICAgICAgICA9IGkrKywgLy9UXG5cbiAgICBCRUZPUkVfU1RZTEVfMSAgICAgICAgICAgID0gaSsrLCAvL1RcbiAgICBCRUZPUkVfU1RZTEVfMiAgICAgICAgICAgID0gaSsrLCAvL1lcbiAgICBCRUZPUkVfU1RZTEVfMyAgICAgICAgICAgID0gaSsrLCAvL0xcbiAgICBCRUZPUkVfU1RZTEVfNCAgICAgICAgICAgID0gaSsrLCAvL0VcbiAgICBBRlRFUl9TVFlMRV8xICAgICAgICAgICAgID0gaSsrLCAvL1RcbiAgICBBRlRFUl9TVFlMRV8yICAgICAgICAgICAgID0gaSsrLCAvL1lcbiAgICBBRlRFUl9TVFlMRV8zICAgICAgICAgICAgID0gaSsrLCAvL0xcbiAgICBBRlRFUl9TVFlMRV80ICAgICAgICAgICAgID0gaSsrLCAvL0VcblxuICAgIEJFRk9SRV9FTlRJVFkgICAgICAgICAgICAgPSBpKyssIC8vJlxuICAgIEJFRk9SRV9OVU1FUklDX0VOVElUWSAgICAgPSBpKyssIC8vI1xuICAgIElOX05BTUVEX0VOVElUWSAgICAgICAgICAgPSBpKyssXG4gICAgSU5fTlVNRVJJQ19FTlRJVFkgICAgICAgICA9IGkrKyxcbiAgICBJTl9IRVhfRU5USVRZICAgICAgICAgICAgID0gaSsrLCAvL1hcblxuICAgIGogPSAwLFxuXG4gICAgU1BFQ0lBTF9OT05FICAgICAgICAgICAgICA9IGorKyxcbiAgICBTUEVDSUFMX1NDUklQVCAgICAgICAgICAgID0gaisrLFxuICAgIFNQRUNJQUxfU1RZTEUgICAgICAgICAgICAgPSBqKys7XG5cbmZ1bmN0aW9uIHdoaXRlc3BhY2UoYyl7XG5cdHJldHVybiBjID09PSBcIiBcIiB8fCBjID09PSBcIlxcblwiIHx8IGMgPT09IFwiXFx0XCIgfHwgYyA9PT0gXCJcXGZcIiB8fCBjID09PSBcIlxcclwiO1xufVxuXG5mdW5jdGlvbiBjaGFyYWN0ZXJTdGF0ZShjaGFyLCBTVUNDRVNTKXtcblx0cmV0dXJuIGZ1bmN0aW9uKGMpe1xuXHRcdGlmKGMgPT09IGNoYXIpIHRoaXMuX3N0YXRlID0gU1VDQ0VTUztcblx0fTtcbn1cblxuZnVuY3Rpb24gaWZFbHNlU3RhdGUodXBwZXIsIFNVQ0NFU1MsIEZBSUxVUkUpe1xuXHR2YXIgbG93ZXIgPSB1cHBlci50b0xvd2VyQ2FzZSgpO1xuXG5cdGlmKHVwcGVyID09PSBsb3dlcil7XG5cdFx0cmV0dXJuIGZ1bmN0aW9uKGMpe1xuXHRcdFx0aWYoYyA9PT0gbG93ZXIpe1xuXHRcdFx0XHR0aGlzLl9zdGF0ZSA9IFNVQ0NFU1M7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR0aGlzLl9zdGF0ZSA9IEZBSUxVUkU7XG5cdFx0XHRcdHRoaXMuX2luZGV4LS07XG5cdFx0XHR9XG5cdFx0fTtcblx0fSBlbHNlIHtcblx0XHRyZXR1cm4gZnVuY3Rpb24oYyl7XG5cdFx0XHRpZihjID09PSBsb3dlciB8fCBjID09PSB1cHBlcil7XG5cdFx0XHRcdHRoaXMuX3N0YXRlID0gU1VDQ0VTUztcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHRoaXMuX3N0YXRlID0gRkFJTFVSRTtcblx0XHRcdFx0dGhpcy5faW5kZXgtLTtcblx0XHRcdH1cblx0XHR9O1xuXHR9XG59XG5cbmZ1bmN0aW9uIGNvbnN1bWVTcGVjaWFsTmFtZUNoYXIodXBwZXIsIE5FWFRfU1RBVEUpe1xuXHR2YXIgbG93ZXIgPSB1cHBlci50b0xvd2VyQ2FzZSgpO1xuXG5cdHJldHVybiBmdW5jdGlvbihjKXtcblx0XHRpZihjID09PSBsb3dlciB8fCBjID09PSB1cHBlcil7XG5cdFx0XHR0aGlzLl9zdGF0ZSA9IE5FWFRfU1RBVEU7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMuX3N0YXRlID0gSU5fVEFHX05BTUU7XG5cdFx0XHR0aGlzLl9pbmRleC0tOyAvL2NvbnN1bWUgdGhlIHRva2VuIGFnYWluXG5cdFx0fVxuXHR9O1xufVxuXG5mdW5jdGlvbiBUb2tlbml6ZXIob3B0aW9ucywgY2JzKXtcblx0dGhpcy5fc3RhdGUgPSBURVhUO1xuXHR0aGlzLl9idWZmZXIgPSBcIlwiO1xuXHR0aGlzLl9zZWN0aW9uU3RhcnQgPSAwO1xuXHR0aGlzLl9pbmRleCA9IDA7XG5cdHRoaXMuX2J1ZmZlck9mZnNldCA9IDA7IC8vY2hhcnMgcmVtb3ZlZCBmcm9tIF9idWZmZXJcblx0dGhpcy5fYmFzZVN0YXRlID0gVEVYVDtcblx0dGhpcy5fc3BlY2lhbCA9IFNQRUNJQUxfTk9ORTtcblx0dGhpcy5fY2JzID0gY2JzO1xuXHR0aGlzLl9ydW5uaW5nID0gdHJ1ZTtcblx0dGhpcy5fZW5kZWQgPSBmYWxzZTtcblx0dGhpcy5feG1sTW9kZSA9ICEhKG9wdGlvbnMgJiYgb3B0aW9ucy54bWxNb2RlKTtcblx0dGhpcy5fZGVjb2RlRW50aXRpZXMgPSAhIShvcHRpb25zICYmIG9wdGlvbnMuZGVjb2RlRW50aXRpZXMpO1xufVxuXG5Ub2tlbml6ZXIucHJvdG90eXBlLl9zdGF0ZVRleHQgPSBmdW5jdGlvbihjKXtcblx0aWYoYyA9PT0gXCI8XCIpe1xuXHRcdGlmKHRoaXMuX2luZGV4ID4gdGhpcy5fc2VjdGlvblN0YXJ0KXtcblx0XHRcdHRoaXMuX2Nicy5vbnRleHQodGhpcy5fZ2V0U2VjdGlvbigpKTtcblx0XHR9XG5cdFx0dGhpcy5fc3RhdGUgPSBCRUZPUkVfVEFHX05BTUU7XG5cdFx0dGhpcy5fc2VjdGlvblN0YXJ0ID0gdGhpcy5faW5kZXg7XG5cdH0gZWxzZSBpZih0aGlzLl9kZWNvZGVFbnRpdGllcyAmJiB0aGlzLl9zcGVjaWFsID09PSBTUEVDSUFMX05PTkUgJiYgYyA9PT0gXCImXCIpe1xuXHRcdGlmKHRoaXMuX2luZGV4ID4gdGhpcy5fc2VjdGlvblN0YXJ0KXtcblx0XHRcdHRoaXMuX2Nicy5vbnRleHQodGhpcy5fZ2V0U2VjdGlvbigpKTtcblx0XHR9XG5cdFx0dGhpcy5fYmFzZVN0YXRlID0gVEVYVDtcblx0XHR0aGlzLl9zdGF0ZSA9IEJFRk9SRV9FTlRJVFk7XG5cdFx0dGhpcy5fc2VjdGlvblN0YXJ0ID0gdGhpcy5faW5kZXg7XG5cdH1cbn07XG5cblRva2VuaXplci5wcm90b3R5cGUuX3N0YXRlQmVmb3JlVGFnTmFtZSA9IGZ1bmN0aW9uKGMpe1xuXHRpZihjID09PSBcIi9cIil7XG5cdFx0dGhpcy5fc3RhdGUgPSBCRUZPUkVfQ0xPU0lOR19UQUdfTkFNRTtcblx0fSBlbHNlIGlmKGMgPT09IFwiPFwiKXtcblx0XHR0aGlzLl9jYnMub250ZXh0KHRoaXMuX2dldFNlY3Rpb24oKSk7XG5cdFx0dGhpcy5fc2VjdGlvblN0YXJ0ID0gdGhpcy5faW5kZXg7XG5cdH0gZWxzZSBpZihjID09PSBcIj5cIiB8fCB0aGlzLl9zcGVjaWFsICE9PSBTUEVDSUFMX05PTkUgfHwgd2hpdGVzcGFjZShjKSkge1xuXHRcdHRoaXMuX3N0YXRlID0gVEVYVDtcblx0fSBlbHNlIGlmKGMgPT09IFwiIVwiKXtcblx0XHR0aGlzLl9zdGF0ZSA9IEJFRk9SRV9ERUNMQVJBVElPTjtcblx0XHR0aGlzLl9zZWN0aW9uU3RhcnQgPSB0aGlzLl9pbmRleCArIDE7XG5cdH0gZWxzZSBpZihjID09PSBcIj9cIil7XG5cdFx0dGhpcy5fc3RhdGUgPSBJTl9QUk9DRVNTSU5HX0lOU1RSVUNUSU9OO1xuXHRcdHRoaXMuX3NlY3Rpb25TdGFydCA9IHRoaXMuX2luZGV4ICsgMTtcblx0fSBlbHNlIHtcblx0XHR0aGlzLl9zdGF0ZSA9ICghdGhpcy5feG1sTW9kZSAmJiAoYyA9PT0gXCJzXCIgfHwgYyA9PT0gXCJTXCIpKSA/XG5cdFx0XHRcdFx0XHRCRUZPUkVfU1BFQ0lBTCA6IElOX1RBR19OQU1FO1xuXHRcdHRoaXMuX3NlY3Rpb25TdGFydCA9IHRoaXMuX2luZGV4O1xuXHR9XG59O1xuXG5Ub2tlbml6ZXIucHJvdG90eXBlLl9zdGF0ZUluVGFnTmFtZSA9IGZ1bmN0aW9uKGMpe1xuXHRpZihjID09PSBcIi9cIiB8fCBjID09PSBcIj5cIiB8fCB3aGl0ZXNwYWNlKGMpKXtcblx0XHR0aGlzLl9lbWl0VG9rZW4oXCJvbm9wZW50YWduYW1lXCIpO1xuXHRcdHRoaXMuX3N0YXRlID0gQkVGT1JFX0FUVFJJQlVURV9OQU1FO1xuXHRcdHRoaXMuX2luZGV4LS07XG5cdH1cbn07XG5cblRva2VuaXplci5wcm90b3R5cGUuX3N0YXRlQmVmb3JlQ2xvc2VpbmdUYWdOYW1lID0gZnVuY3Rpb24oYyl7XG5cdGlmKHdoaXRlc3BhY2UoYykpO1xuXHRlbHNlIGlmKGMgPT09IFwiPlwiKXtcblx0XHR0aGlzLl9zdGF0ZSA9IFRFWFQ7XG5cdH0gZWxzZSBpZih0aGlzLl9zcGVjaWFsICE9PSBTUEVDSUFMX05PTkUpe1xuXHRcdGlmKGMgPT09IFwic1wiIHx8IGMgPT09IFwiU1wiKXtcblx0XHRcdHRoaXMuX3N0YXRlID0gQkVGT1JFX1NQRUNJQUxfRU5EO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLl9zdGF0ZSA9IFRFWFQ7XG5cdFx0XHR0aGlzLl9pbmRleC0tO1xuXHRcdH1cblx0fSBlbHNlIHtcblx0XHR0aGlzLl9zdGF0ZSA9IElOX0NMT1NJTkdfVEFHX05BTUU7XG5cdFx0dGhpcy5fc2VjdGlvblN0YXJ0ID0gdGhpcy5faW5kZXg7XG5cdH1cbn07XG5cblRva2VuaXplci5wcm90b3R5cGUuX3N0YXRlSW5DbG9zZWluZ1RhZ05hbWUgPSBmdW5jdGlvbihjKXtcblx0aWYoYyA9PT0gXCI+XCIgfHwgd2hpdGVzcGFjZShjKSl7XG5cdFx0dGhpcy5fZW1pdFRva2VuKFwib25jbG9zZXRhZ1wiKTtcblx0XHR0aGlzLl9zdGF0ZSA9IEFGVEVSX0NMT1NJTkdfVEFHX05BTUU7XG5cdFx0dGhpcy5faW5kZXgtLTtcblx0fVxufTtcblxuVG9rZW5pemVyLnByb3RvdHlwZS5fc3RhdGVBZnRlckNsb3NlaW5nVGFnTmFtZSA9IGZ1bmN0aW9uKGMpe1xuXHQvL3NraXAgZXZlcnl0aGluZyB1bnRpbCBcIj5cIlxuXHRpZihjID09PSBcIj5cIil7XG5cdFx0dGhpcy5fc3RhdGUgPSBURVhUO1xuXHRcdHRoaXMuX3NlY3Rpb25TdGFydCA9IHRoaXMuX2luZGV4ICsgMTtcblx0fVxufTtcblxuVG9rZW5pemVyLnByb3RvdHlwZS5fc3RhdGVCZWZvcmVBdHRyaWJ1dGVOYW1lID0gZnVuY3Rpb24oYyl7XG5cdGlmKGMgPT09IFwiPlwiKXtcblx0XHR0aGlzLl9jYnMub25vcGVudGFnZW5kKCk7XG5cdFx0dGhpcy5fc3RhdGUgPSBURVhUO1xuXHRcdHRoaXMuX3NlY3Rpb25TdGFydCA9IHRoaXMuX2luZGV4ICsgMTtcblx0fSBlbHNlIGlmKGMgPT09IFwiL1wiKXtcblx0XHR0aGlzLl9zdGF0ZSA9IElOX1NFTEZfQ0xPU0lOR19UQUc7XG5cdH0gZWxzZSBpZighd2hpdGVzcGFjZShjKSl7XG5cdFx0dGhpcy5fc3RhdGUgPSBJTl9BVFRSSUJVVEVfTkFNRTtcblx0XHR0aGlzLl9zZWN0aW9uU3RhcnQgPSB0aGlzLl9pbmRleDtcblx0fVxufTtcblxuVG9rZW5pemVyLnByb3RvdHlwZS5fc3RhdGVJblNlbGZDbG9zaW5nVGFnID0gZnVuY3Rpb24oYyl7XG5cdGlmKGMgPT09IFwiPlwiKXtcblx0XHR0aGlzLl9jYnMub25zZWxmY2xvc2luZ3RhZygpO1xuXHRcdHRoaXMuX3N0YXRlID0gVEVYVDtcblx0XHR0aGlzLl9zZWN0aW9uU3RhcnQgPSB0aGlzLl9pbmRleCArIDE7XG5cdH0gZWxzZSBpZighd2hpdGVzcGFjZShjKSl7XG5cdFx0dGhpcy5fc3RhdGUgPSBCRUZPUkVfQVRUUklCVVRFX05BTUU7XG5cdFx0dGhpcy5faW5kZXgtLTtcblx0fVxufTtcblxuVG9rZW5pemVyLnByb3RvdHlwZS5fc3RhdGVJbkF0dHJpYnV0ZU5hbWUgPSBmdW5jdGlvbihjKXtcblx0aWYoYyA9PT0gXCI9XCIgfHwgYyA9PT0gXCIvXCIgfHwgYyA9PT0gXCI+XCIgfHwgd2hpdGVzcGFjZShjKSl7XG5cdFx0dGhpcy5fY2JzLm9uYXR0cmlibmFtZSh0aGlzLl9nZXRTZWN0aW9uKCkpO1xuXHRcdHRoaXMuX3NlY3Rpb25TdGFydCA9IC0xO1xuXHRcdHRoaXMuX3N0YXRlID0gQUZURVJfQVRUUklCVVRFX05BTUU7XG5cdFx0dGhpcy5faW5kZXgtLTtcblx0fVxufTtcblxuVG9rZW5pemVyLnByb3RvdHlwZS5fc3RhdGVBZnRlckF0dHJpYnV0ZU5hbWUgPSBmdW5jdGlvbihjKXtcblx0aWYoYyA9PT0gXCI9XCIpe1xuXHRcdHRoaXMuX3N0YXRlID0gQkVGT1JFX0FUVFJJQlVURV9WQUxVRTtcblx0fSBlbHNlIGlmKGMgPT09IFwiL1wiIHx8IGMgPT09IFwiPlwiKXtcblx0XHR0aGlzLl9jYnMub25hdHRyaWJlbmQoKTtcblx0XHR0aGlzLl9zdGF0ZSA9IEJFRk9SRV9BVFRSSUJVVEVfTkFNRTtcblx0XHR0aGlzLl9pbmRleC0tO1xuXHR9IGVsc2UgaWYoIXdoaXRlc3BhY2UoYykpe1xuXHRcdHRoaXMuX2Nicy5vbmF0dHJpYmVuZCgpO1xuXHRcdHRoaXMuX3N0YXRlID0gSU5fQVRUUklCVVRFX05BTUU7XG5cdFx0dGhpcy5fc2VjdGlvblN0YXJ0ID0gdGhpcy5faW5kZXg7XG5cdH1cbn07XG5cblRva2VuaXplci5wcm90b3R5cGUuX3N0YXRlQmVmb3JlQXR0cmlidXRlVmFsdWUgPSBmdW5jdGlvbihjKXtcblx0aWYoYyA9PT0gXCJcXFwiXCIpe1xuXHRcdHRoaXMuX3N0YXRlID0gSU5fQVRUUklCVVRFX1ZBTFVFX0RRO1xuXHRcdHRoaXMuX3NlY3Rpb25TdGFydCA9IHRoaXMuX2luZGV4ICsgMTtcblx0fSBlbHNlIGlmKGMgPT09IFwiJ1wiKXtcblx0XHR0aGlzLl9zdGF0ZSA9IElOX0FUVFJJQlVURV9WQUxVRV9TUTtcblx0XHR0aGlzLl9zZWN0aW9uU3RhcnQgPSB0aGlzLl9pbmRleCArIDE7XG5cdH0gZWxzZSBpZighd2hpdGVzcGFjZShjKSl7XG5cdFx0dGhpcy5fc3RhdGUgPSBJTl9BVFRSSUJVVEVfVkFMVUVfTlE7XG5cdFx0dGhpcy5fc2VjdGlvblN0YXJ0ID0gdGhpcy5faW5kZXg7XG5cdFx0dGhpcy5faW5kZXgtLTsgLy9yZWNvbnN1bWUgdG9rZW5cblx0fVxufTtcblxuVG9rZW5pemVyLnByb3RvdHlwZS5fc3RhdGVJbkF0dHJpYnV0ZVZhbHVlRG91YmxlUXVvdGVzID0gZnVuY3Rpb24oYyl7XG5cdGlmKGMgPT09IFwiXFxcIlwiKXtcblx0XHR0aGlzLl9lbWl0VG9rZW4oXCJvbmF0dHJpYmRhdGFcIik7XG5cdFx0dGhpcy5fY2JzLm9uYXR0cmliZW5kKCk7XG5cdFx0dGhpcy5fc3RhdGUgPSBCRUZPUkVfQVRUUklCVVRFX05BTUU7XG5cdH0gZWxzZSBpZih0aGlzLl9kZWNvZGVFbnRpdGllcyAmJiBjID09PSBcIiZcIil7XG5cdFx0dGhpcy5fZW1pdFRva2VuKFwib25hdHRyaWJkYXRhXCIpO1xuXHRcdHRoaXMuX2Jhc2VTdGF0ZSA9IHRoaXMuX3N0YXRlO1xuXHRcdHRoaXMuX3N0YXRlID0gQkVGT1JFX0VOVElUWTtcblx0XHR0aGlzLl9zZWN0aW9uU3RhcnQgPSB0aGlzLl9pbmRleDtcblx0fVxufTtcblxuVG9rZW5pemVyLnByb3RvdHlwZS5fc3RhdGVJbkF0dHJpYnV0ZVZhbHVlU2luZ2xlUXVvdGVzID0gZnVuY3Rpb24oYyl7XG5cdGlmKGMgPT09IFwiJ1wiKXtcblx0XHR0aGlzLl9lbWl0VG9rZW4oXCJvbmF0dHJpYmRhdGFcIik7XG5cdFx0dGhpcy5fY2JzLm9uYXR0cmliZW5kKCk7XG5cdFx0dGhpcy5fc3RhdGUgPSBCRUZPUkVfQVRUUklCVVRFX05BTUU7XG5cdH0gZWxzZSBpZih0aGlzLl9kZWNvZGVFbnRpdGllcyAmJiBjID09PSBcIiZcIil7XG5cdFx0dGhpcy5fZW1pdFRva2VuKFwib25hdHRyaWJkYXRhXCIpO1xuXHRcdHRoaXMuX2Jhc2VTdGF0ZSA9IHRoaXMuX3N0YXRlO1xuXHRcdHRoaXMuX3N0YXRlID0gQkVGT1JFX0VOVElUWTtcblx0XHR0aGlzLl9zZWN0aW9uU3RhcnQgPSB0aGlzLl9pbmRleDtcblx0fVxufTtcblxuVG9rZW5pemVyLnByb3RvdHlwZS5fc3RhdGVJbkF0dHJpYnV0ZVZhbHVlTm9RdW90ZXMgPSBmdW5jdGlvbihjKXtcblx0aWYod2hpdGVzcGFjZShjKSB8fCBjID09PSBcIj5cIil7XG5cdFx0dGhpcy5fZW1pdFRva2VuKFwib25hdHRyaWJkYXRhXCIpO1xuXHRcdHRoaXMuX2Nicy5vbmF0dHJpYmVuZCgpO1xuXHRcdHRoaXMuX3N0YXRlID0gQkVGT1JFX0FUVFJJQlVURV9OQU1FO1xuXHRcdHRoaXMuX2luZGV4LS07XG5cdH0gZWxzZSBpZih0aGlzLl9kZWNvZGVFbnRpdGllcyAmJiBjID09PSBcIiZcIil7XG5cdFx0dGhpcy5fZW1pdFRva2VuKFwib25hdHRyaWJkYXRhXCIpO1xuXHRcdHRoaXMuX2Jhc2VTdGF0ZSA9IHRoaXMuX3N0YXRlO1xuXHRcdHRoaXMuX3N0YXRlID0gQkVGT1JFX0VOVElUWTtcblx0XHR0aGlzLl9zZWN0aW9uU3RhcnQgPSB0aGlzLl9pbmRleDtcblx0fVxufTtcblxuVG9rZW5pemVyLnByb3RvdHlwZS5fc3RhdGVCZWZvcmVEZWNsYXJhdGlvbiA9IGZ1bmN0aW9uKGMpe1xuXHR0aGlzLl9zdGF0ZSA9IGMgPT09IFwiW1wiID8gQkVGT1JFX0NEQVRBXzEgOlxuXHRcdFx0XHRcdGMgPT09IFwiLVwiID8gQkVGT1JFX0NPTU1FTlQgOlxuXHRcdFx0XHRcdFx0SU5fREVDTEFSQVRJT047XG59O1xuXG5Ub2tlbml6ZXIucHJvdG90eXBlLl9zdGF0ZUluRGVjbGFyYXRpb24gPSBmdW5jdGlvbihjKXtcblx0aWYoYyA9PT0gXCI+XCIpe1xuXHRcdHRoaXMuX2Nicy5vbmRlY2xhcmF0aW9uKHRoaXMuX2dldFNlY3Rpb24oKSk7XG5cdFx0dGhpcy5fc3RhdGUgPSBURVhUO1xuXHRcdHRoaXMuX3NlY3Rpb25TdGFydCA9IHRoaXMuX2luZGV4ICsgMTtcblx0fVxufTtcblxuVG9rZW5pemVyLnByb3RvdHlwZS5fc3RhdGVJblByb2Nlc3NpbmdJbnN0cnVjdGlvbiA9IGZ1bmN0aW9uKGMpe1xuXHRpZihjID09PSBcIj5cIil7XG5cdFx0dGhpcy5fY2JzLm9ucHJvY2Vzc2luZ2luc3RydWN0aW9uKHRoaXMuX2dldFNlY3Rpb24oKSk7XG5cdFx0dGhpcy5fc3RhdGUgPSBURVhUO1xuXHRcdHRoaXMuX3NlY3Rpb25TdGFydCA9IHRoaXMuX2luZGV4ICsgMTtcblx0fVxufTtcblxuVG9rZW5pemVyLnByb3RvdHlwZS5fc3RhdGVCZWZvcmVDb21tZW50ID0gZnVuY3Rpb24oYyl7XG5cdGlmKGMgPT09IFwiLVwiKXtcblx0XHR0aGlzLl9zdGF0ZSA9IElOX0NPTU1FTlQ7XG5cdFx0dGhpcy5fc2VjdGlvblN0YXJ0ID0gdGhpcy5faW5kZXggKyAxO1xuXHR9IGVsc2Uge1xuXHRcdHRoaXMuX3N0YXRlID0gSU5fREVDTEFSQVRJT047XG5cdH1cbn07XG5cblRva2VuaXplci5wcm90b3R5cGUuX3N0YXRlSW5Db21tZW50ID0gZnVuY3Rpb24oYyl7XG5cdGlmKGMgPT09IFwiLVwiKSB0aGlzLl9zdGF0ZSA9IEFGVEVSX0NPTU1FTlRfMTtcbn07XG5cblRva2VuaXplci5wcm90b3R5cGUuX3N0YXRlQWZ0ZXJDb21tZW50MSA9IGZ1bmN0aW9uKGMpe1xuXHRpZihjID09PSBcIi1cIil7XG5cdFx0dGhpcy5fc3RhdGUgPSBBRlRFUl9DT01NRU5UXzI7XG5cdH0gZWxzZSB7XG5cdFx0dGhpcy5fc3RhdGUgPSBJTl9DT01NRU5UO1xuXHR9XG59O1xuXG5Ub2tlbml6ZXIucHJvdG90eXBlLl9zdGF0ZUFmdGVyQ29tbWVudDIgPSBmdW5jdGlvbihjKXtcblx0aWYoYyA9PT0gXCI+XCIpe1xuXHRcdC8vcmVtb3ZlIDIgdHJhaWxpbmcgY2hhcnNcblx0XHR0aGlzLl9jYnMub25jb21tZW50KHRoaXMuX2J1ZmZlci5zdWJzdHJpbmcodGhpcy5fc2VjdGlvblN0YXJ0LCB0aGlzLl9pbmRleCAtIDIpKTtcblx0XHR0aGlzLl9zdGF0ZSA9IFRFWFQ7XG5cdFx0dGhpcy5fc2VjdGlvblN0YXJ0ID0gdGhpcy5faW5kZXggKyAxO1xuXHR9IGVsc2UgaWYoYyAhPT0gXCItXCIpe1xuXHRcdHRoaXMuX3N0YXRlID0gSU5fQ09NTUVOVDtcblx0fVxuXHQvLyBlbHNlOiBzdGF5IGluIEFGVEVSX0NPTU1FTlRfMiAoYC0tLT5gKVxufTtcblxuVG9rZW5pemVyLnByb3RvdHlwZS5fc3RhdGVCZWZvcmVDZGF0YTEgPSBpZkVsc2VTdGF0ZShcIkNcIiwgQkVGT1JFX0NEQVRBXzIsIElOX0RFQ0xBUkFUSU9OKTtcblRva2VuaXplci5wcm90b3R5cGUuX3N0YXRlQmVmb3JlQ2RhdGEyID0gaWZFbHNlU3RhdGUoXCJEXCIsIEJFRk9SRV9DREFUQV8zLCBJTl9ERUNMQVJBVElPTik7XG5Ub2tlbml6ZXIucHJvdG90eXBlLl9zdGF0ZUJlZm9yZUNkYXRhMyA9IGlmRWxzZVN0YXRlKFwiQVwiLCBCRUZPUkVfQ0RBVEFfNCwgSU5fREVDTEFSQVRJT04pO1xuVG9rZW5pemVyLnByb3RvdHlwZS5fc3RhdGVCZWZvcmVDZGF0YTQgPSBpZkVsc2VTdGF0ZShcIlRcIiwgQkVGT1JFX0NEQVRBXzUsIElOX0RFQ0xBUkFUSU9OKTtcblRva2VuaXplci5wcm90b3R5cGUuX3N0YXRlQmVmb3JlQ2RhdGE1ID0gaWZFbHNlU3RhdGUoXCJBXCIsIEJFRk9SRV9DREFUQV82LCBJTl9ERUNMQVJBVElPTik7XG5cblRva2VuaXplci5wcm90b3R5cGUuX3N0YXRlQmVmb3JlQ2RhdGE2ID0gZnVuY3Rpb24oYyl7XG5cdGlmKGMgPT09IFwiW1wiKXtcblx0XHR0aGlzLl9zdGF0ZSA9IElOX0NEQVRBO1xuXHRcdHRoaXMuX3NlY3Rpb25TdGFydCA9IHRoaXMuX2luZGV4ICsgMTtcblx0fSBlbHNlIHtcblx0XHR0aGlzLl9zdGF0ZSA9IElOX0RFQ0xBUkFUSU9OO1xuXHRcdHRoaXMuX2luZGV4LS07XG5cdH1cbn07XG5cblRva2VuaXplci5wcm90b3R5cGUuX3N0YXRlSW5DZGF0YSA9IGZ1bmN0aW9uKGMpe1xuXHRpZihjID09PSBcIl1cIikgdGhpcy5fc3RhdGUgPSBBRlRFUl9DREFUQV8xO1xufTtcblxuVG9rZW5pemVyLnByb3RvdHlwZS5fc3RhdGVBZnRlckNkYXRhMSA9IGNoYXJhY3RlclN0YXRlKFwiXVwiLCBBRlRFUl9DREFUQV8yKTtcblxuVG9rZW5pemVyLnByb3RvdHlwZS5fc3RhdGVBZnRlckNkYXRhMiA9IGZ1bmN0aW9uKGMpe1xuXHRpZihjID09PSBcIj5cIil7XG5cdFx0Ly9yZW1vdmUgMiB0cmFpbGluZyBjaGFyc1xuXHRcdHRoaXMuX2Nicy5vbmNkYXRhKHRoaXMuX2J1ZmZlci5zdWJzdHJpbmcodGhpcy5fc2VjdGlvblN0YXJ0LCB0aGlzLl9pbmRleCAtIDIpKTtcblx0XHR0aGlzLl9zdGF0ZSA9IFRFWFQ7XG5cdFx0dGhpcy5fc2VjdGlvblN0YXJ0ID0gdGhpcy5faW5kZXggKyAxO1xuXHR9IGVsc2UgaWYoYyAhPT0gXCJdXCIpIHtcblx0XHR0aGlzLl9zdGF0ZSA9IElOX0NEQVRBO1xuXHR9XG5cdC8vZWxzZTogc3RheSBpbiBBRlRFUl9DREFUQV8yIChgXV1dPmApXG59O1xuXG5Ub2tlbml6ZXIucHJvdG90eXBlLl9zdGF0ZUJlZm9yZVNwZWNpYWwgPSBmdW5jdGlvbihjKXtcblx0aWYoYyA9PT0gXCJjXCIgfHwgYyA9PT0gXCJDXCIpe1xuXHRcdHRoaXMuX3N0YXRlID0gQkVGT1JFX1NDUklQVF8xO1xuXHR9IGVsc2UgaWYoYyA9PT0gXCJ0XCIgfHwgYyA9PT0gXCJUXCIpe1xuXHRcdHRoaXMuX3N0YXRlID0gQkVGT1JFX1NUWUxFXzE7XG5cdH0gZWxzZSB7XG5cdFx0dGhpcy5fc3RhdGUgPSBJTl9UQUdfTkFNRTtcblx0XHR0aGlzLl9pbmRleC0tOyAvL2NvbnN1bWUgdGhlIHRva2VuIGFnYWluXG5cdH1cbn07XG5cblRva2VuaXplci5wcm90b3R5cGUuX3N0YXRlQmVmb3JlU3BlY2lhbEVuZCA9IGZ1bmN0aW9uKGMpe1xuXHRpZih0aGlzLl9zcGVjaWFsID09PSBTUEVDSUFMX1NDUklQVCAmJiAoYyA9PT0gXCJjXCIgfHwgYyA9PT0gXCJDXCIpKXtcblx0XHR0aGlzLl9zdGF0ZSA9IEFGVEVSX1NDUklQVF8xO1xuXHR9IGVsc2UgaWYodGhpcy5fc3BlY2lhbCA9PT0gU1BFQ0lBTF9TVFlMRSAmJiAoYyA9PT0gXCJ0XCIgfHwgYyA9PT0gXCJUXCIpKXtcblx0XHR0aGlzLl9zdGF0ZSA9IEFGVEVSX1NUWUxFXzE7XG5cdH1cblx0ZWxzZSB0aGlzLl9zdGF0ZSA9IFRFWFQ7XG59O1xuXG5Ub2tlbml6ZXIucHJvdG90eXBlLl9zdGF0ZUJlZm9yZVNjcmlwdDEgPSBjb25zdW1lU3BlY2lhbE5hbWVDaGFyKFwiUlwiLCBCRUZPUkVfU0NSSVBUXzIpO1xuVG9rZW5pemVyLnByb3RvdHlwZS5fc3RhdGVCZWZvcmVTY3JpcHQyID0gY29uc3VtZVNwZWNpYWxOYW1lQ2hhcihcIklcIiwgQkVGT1JFX1NDUklQVF8zKTtcblRva2VuaXplci5wcm90b3R5cGUuX3N0YXRlQmVmb3JlU2NyaXB0MyA9IGNvbnN1bWVTcGVjaWFsTmFtZUNoYXIoXCJQXCIsIEJFRk9SRV9TQ1JJUFRfNCk7XG5Ub2tlbml6ZXIucHJvdG90eXBlLl9zdGF0ZUJlZm9yZVNjcmlwdDQgPSBjb25zdW1lU3BlY2lhbE5hbWVDaGFyKFwiVFwiLCBCRUZPUkVfU0NSSVBUXzUpO1xuXG5Ub2tlbml6ZXIucHJvdG90eXBlLl9zdGF0ZUJlZm9yZVNjcmlwdDUgPSBmdW5jdGlvbihjKXtcblx0aWYoYyA9PT0gXCIvXCIgfHwgYyA9PT0gXCI+XCIgfHwgd2hpdGVzcGFjZShjKSl7XG5cdFx0dGhpcy5fc3BlY2lhbCA9IFNQRUNJQUxfU0NSSVBUO1xuXHR9XG5cdHRoaXMuX3N0YXRlID0gSU5fVEFHX05BTUU7XG5cdHRoaXMuX2luZGV4LS07IC8vY29uc3VtZSB0aGUgdG9rZW4gYWdhaW5cbn07XG5cblRva2VuaXplci5wcm90b3R5cGUuX3N0YXRlQWZ0ZXJTY3JpcHQxID0gaWZFbHNlU3RhdGUoXCJSXCIsIEFGVEVSX1NDUklQVF8yLCBURVhUKTtcblRva2VuaXplci5wcm90b3R5cGUuX3N0YXRlQWZ0ZXJTY3JpcHQyID0gaWZFbHNlU3RhdGUoXCJJXCIsIEFGVEVSX1NDUklQVF8zLCBURVhUKTtcblRva2VuaXplci5wcm90b3R5cGUuX3N0YXRlQWZ0ZXJTY3JpcHQzID0gaWZFbHNlU3RhdGUoXCJQXCIsIEFGVEVSX1NDUklQVF80LCBURVhUKTtcblRva2VuaXplci5wcm90b3R5cGUuX3N0YXRlQWZ0ZXJTY3JpcHQ0ID0gaWZFbHNlU3RhdGUoXCJUXCIsIEFGVEVSX1NDUklQVF81LCBURVhUKTtcblxuVG9rZW5pemVyLnByb3RvdHlwZS5fc3RhdGVBZnRlclNjcmlwdDUgPSBmdW5jdGlvbihjKXtcblx0aWYoYyA9PT0gXCI+XCIgfHwgd2hpdGVzcGFjZShjKSl7XG5cdFx0dGhpcy5fc3BlY2lhbCA9IFNQRUNJQUxfTk9ORTtcblx0XHR0aGlzLl9zdGF0ZSA9IElOX0NMT1NJTkdfVEFHX05BTUU7XG5cdFx0dGhpcy5fc2VjdGlvblN0YXJ0ID0gdGhpcy5faW5kZXggLSA2O1xuXHRcdHRoaXMuX2luZGV4LS07IC8vcmVjb25zdW1lIHRoZSB0b2tlblxuXHR9XG5cdGVsc2UgdGhpcy5fc3RhdGUgPSBURVhUO1xufTtcblxuVG9rZW5pemVyLnByb3RvdHlwZS5fc3RhdGVCZWZvcmVTdHlsZTEgPSBjb25zdW1lU3BlY2lhbE5hbWVDaGFyKFwiWVwiLCBCRUZPUkVfU1RZTEVfMik7XG5Ub2tlbml6ZXIucHJvdG90eXBlLl9zdGF0ZUJlZm9yZVN0eWxlMiA9IGNvbnN1bWVTcGVjaWFsTmFtZUNoYXIoXCJMXCIsIEJFRk9SRV9TVFlMRV8zKTtcblRva2VuaXplci5wcm90b3R5cGUuX3N0YXRlQmVmb3JlU3R5bGUzID0gY29uc3VtZVNwZWNpYWxOYW1lQ2hhcihcIkVcIiwgQkVGT1JFX1NUWUxFXzQpO1xuXG5Ub2tlbml6ZXIucHJvdG90eXBlLl9zdGF0ZUJlZm9yZVN0eWxlNCA9IGZ1bmN0aW9uKGMpe1xuXHRpZihjID09PSBcIi9cIiB8fCBjID09PSBcIj5cIiB8fCB3aGl0ZXNwYWNlKGMpKXtcblx0XHR0aGlzLl9zcGVjaWFsID0gU1BFQ0lBTF9TVFlMRTtcblx0fVxuXHR0aGlzLl9zdGF0ZSA9IElOX1RBR19OQU1FO1xuXHR0aGlzLl9pbmRleC0tOyAvL2NvbnN1bWUgdGhlIHRva2VuIGFnYWluXG59O1xuXG5Ub2tlbml6ZXIucHJvdG90eXBlLl9zdGF0ZUFmdGVyU3R5bGUxID0gaWZFbHNlU3RhdGUoXCJZXCIsIEFGVEVSX1NUWUxFXzIsIFRFWFQpO1xuVG9rZW5pemVyLnByb3RvdHlwZS5fc3RhdGVBZnRlclN0eWxlMiA9IGlmRWxzZVN0YXRlKFwiTFwiLCBBRlRFUl9TVFlMRV8zLCBURVhUKTtcblRva2VuaXplci5wcm90b3R5cGUuX3N0YXRlQWZ0ZXJTdHlsZTMgPSBpZkVsc2VTdGF0ZShcIkVcIiwgQUZURVJfU1RZTEVfNCwgVEVYVCk7XG5cblRva2VuaXplci5wcm90b3R5cGUuX3N0YXRlQWZ0ZXJTdHlsZTQgPSBmdW5jdGlvbihjKXtcblx0aWYoYyA9PT0gXCI+XCIgfHwgd2hpdGVzcGFjZShjKSl7XG5cdFx0dGhpcy5fc3BlY2lhbCA9IFNQRUNJQUxfTk9ORTtcblx0XHR0aGlzLl9zdGF0ZSA9IElOX0NMT1NJTkdfVEFHX05BTUU7XG5cdFx0dGhpcy5fc2VjdGlvblN0YXJ0ID0gdGhpcy5faW5kZXggLSA1O1xuXHRcdHRoaXMuX2luZGV4LS07IC8vcmVjb25zdW1lIHRoZSB0b2tlblxuXHR9XG5cdGVsc2UgdGhpcy5fc3RhdGUgPSBURVhUO1xufTtcblxuVG9rZW5pemVyLnByb3RvdHlwZS5fc3RhdGVCZWZvcmVFbnRpdHkgPSBpZkVsc2VTdGF0ZShcIiNcIiwgQkVGT1JFX05VTUVSSUNfRU5USVRZLCBJTl9OQU1FRF9FTlRJVFkpO1xuVG9rZW5pemVyLnByb3RvdHlwZS5fc3RhdGVCZWZvcmVOdW1lcmljRW50aXR5ID0gaWZFbHNlU3RhdGUoXCJYXCIsIElOX0hFWF9FTlRJVFksIElOX05VTUVSSUNfRU5USVRZKTtcblxuLy9mb3IgZW50aXRpZXMgdGVybWluYXRlZCB3aXRoIGEgc2VtaWNvbG9uXG5Ub2tlbml6ZXIucHJvdG90eXBlLl9wYXJzZU5hbWVkRW50aXR5U3RyaWN0ID0gZnVuY3Rpb24oKXtcblx0Ly9vZmZzZXQgPSAxXG5cdGlmKHRoaXMuX3NlY3Rpb25TdGFydCArIDEgPCB0aGlzLl9pbmRleCl7XG5cdFx0dmFyIGVudGl0eSA9IHRoaXMuX2J1ZmZlci5zdWJzdHJpbmcodGhpcy5fc2VjdGlvblN0YXJ0ICsgMSwgdGhpcy5faW5kZXgpLFxuXHRcdCAgICBtYXAgPSB0aGlzLl94bWxNb2RlID8geG1sTWFwIDogZW50aXR5TWFwO1xuXG5cdFx0aWYobWFwLmhhc093blByb3BlcnR5KGVudGl0eSkpe1xuXHRcdFx0dGhpcy5fZW1pdFBhcnRpYWwobWFwW2VudGl0eV0pO1xuXHRcdFx0dGhpcy5fc2VjdGlvblN0YXJ0ID0gdGhpcy5faW5kZXggKyAxO1xuXHRcdH1cblx0fVxufTtcblxuXG4vL3BhcnNlcyBsZWdhY3kgZW50aXRpZXMgKHdpdGhvdXQgdHJhaWxpbmcgc2VtaWNvbG9uKVxuVG9rZW5pemVyLnByb3RvdHlwZS5fcGFyc2VMZWdhY3lFbnRpdHkgPSBmdW5jdGlvbigpe1xuXHR2YXIgc3RhcnQgPSB0aGlzLl9zZWN0aW9uU3RhcnQgKyAxLFxuXHQgICAgbGltaXQgPSB0aGlzLl9pbmRleCAtIHN0YXJ0O1xuXG5cdGlmKGxpbWl0ID4gNikgbGltaXQgPSA2OyAvL3RoZSBtYXggbGVuZ3RoIG9mIGxlZ2FjeSBlbnRpdGllcyBpcyA2XG5cblx0d2hpbGUobGltaXQgPj0gMil7IC8vdGhlIG1pbiBsZW5ndGggb2YgbGVnYWN5IGVudGl0aWVzIGlzIDJcblx0XHR2YXIgZW50aXR5ID0gdGhpcy5fYnVmZmVyLnN1YnN0cihzdGFydCwgbGltaXQpO1xuXG5cdFx0aWYobGVnYWN5TWFwLmhhc093blByb3BlcnR5KGVudGl0eSkpe1xuXHRcdFx0dGhpcy5fZW1pdFBhcnRpYWwobGVnYWN5TWFwW2VudGl0eV0pO1xuXHRcdFx0dGhpcy5fc2VjdGlvblN0YXJ0ICs9IGxpbWl0ICsgMTtcblx0XHRcdHJldHVybjtcblx0XHR9IGVsc2Uge1xuXHRcdFx0bGltaXQtLTtcblx0XHR9XG5cdH1cbn07XG5cblRva2VuaXplci5wcm90b3R5cGUuX3N0YXRlSW5OYW1lZEVudGl0eSA9IGZ1bmN0aW9uKGMpe1xuXHRpZihjID09PSBcIjtcIil7XG5cdFx0dGhpcy5fcGFyc2VOYW1lZEVudGl0eVN0cmljdCgpO1xuXHRcdGlmKHRoaXMuX3NlY3Rpb25TdGFydCArIDEgPCB0aGlzLl9pbmRleCAmJiAhdGhpcy5feG1sTW9kZSl7XG5cdFx0XHR0aGlzLl9wYXJzZUxlZ2FjeUVudGl0eSgpO1xuXHRcdH1cblx0XHR0aGlzLl9zdGF0ZSA9IHRoaXMuX2Jhc2VTdGF0ZTtcblx0fSBlbHNlIGlmKChjIDwgXCJhXCIgfHwgYyA+IFwielwiKSAmJiAoYyA8IFwiQVwiIHx8IGMgPiBcIlpcIikgJiYgKGMgPCBcIjBcIiB8fCBjID4gXCI5XCIpKXtcblx0XHRpZih0aGlzLl94bWxNb2RlKTtcblx0XHRlbHNlIGlmKHRoaXMuX3NlY3Rpb25TdGFydCArIDEgPT09IHRoaXMuX2luZGV4KTtcblx0XHRlbHNlIGlmKHRoaXMuX2Jhc2VTdGF0ZSAhPT0gVEVYVCl7XG5cdFx0XHRpZihjICE9PSBcIj1cIil7XG5cdFx0XHRcdHRoaXMuX3BhcnNlTmFtZWRFbnRpdHlTdHJpY3QoKTtcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5fcGFyc2VMZWdhY3lFbnRpdHkoKTtcblx0XHR9XG5cblx0XHR0aGlzLl9zdGF0ZSA9IHRoaXMuX2Jhc2VTdGF0ZTtcblx0XHR0aGlzLl9pbmRleC0tO1xuXHR9XG59O1xuXG5Ub2tlbml6ZXIucHJvdG90eXBlLl9kZWNvZGVOdW1lcmljRW50aXR5ID0gZnVuY3Rpb24ob2Zmc2V0LCBiYXNlKXtcblx0dmFyIHNlY3Rpb25TdGFydCA9IHRoaXMuX3NlY3Rpb25TdGFydCArIG9mZnNldDtcblxuXHRpZihzZWN0aW9uU3RhcnQgIT09IHRoaXMuX2luZGV4KXtcblx0XHQvL3BhcnNlIGVudGl0eVxuXHRcdHZhciBlbnRpdHkgPSB0aGlzLl9idWZmZXIuc3Vic3RyaW5nKHNlY3Rpb25TdGFydCwgdGhpcy5faW5kZXgpO1xuXHRcdHZhciBwYXJzZWQgPSBwYXJzZUludChlbnRpdHksIGJhc2UpO1xuXG5cdFx0dGhpcy5fZW1pdFBhcnRpYWwoZGVjb2RlQ29kZVBvaW50KHBhcnNlZCkpO1xuXHRcdHRoaXMuX3NlY3Rpb25TdGFydCA9IHRoaXMuX2luZGV4O1xuXHR9IGVsc2Uge1xuXHRcdHRoaXMuX3NlY3Rpb25TdGFydC0tO1xuXHR9XG5cblx0dGhpcy5fc3RhdGUgPSB0aGlzLl9iYXNlU3RhdGU7XG59O1xuXG5Ub2tlbml6ZXIucHJvdG90eXBlLl9zdGF0ZUluTnVtZXJpY0VudGl0eSA9IGZ1bmN0aW9uKGMpe1xuXHRpZihjID09PSBcIjtcIil7XG5cdFx0dGhpcy5fZGVjb2RlTnVtZXJpY0VudGl0eSgyLCAxMCk7XG5cdFx0dGhpcy5fc2VjdGlvblN0YXJ0Kys7XG5cdH0gZWxzZSBpZihjIDwgXCIwXCIgfHwgYyA+IFwiOVwiKXtcblx0XHRpZighdGhpcy5feG1sTW9kZSl7XG5cdFx0XHR0aGlzLl9kZWNvZGVOdW1lcmljRW50aXR5KDIsIDEwKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5fc3RhdGUgPSB0aGlzLl9iYXNlU3RhdGU7XG5cdFx0fVxuXHRcdHRoaXMuX2luZGV4LS07XG5cdH1cbn07XG5cblRva2VuaXplci5wcm90b3R5cGUuX3N0YXRlSW5IZXhFbnRpdHkgPSBmdW5jdGlvbihjKXtcblx0aWYoYyA9PT0gXCI7XCIpe1xuXHRcdHRoaXMuX2RlY29kZU51bWVyaWNFbnRpdHkoMywgMTYpO1xuXHRcdHRoaXMuX3NlY3Rpb25TdGFydCsrO1xuXHR9IGVsc2UgaWYoKGMgPCBcImFcIiB8fCBjID4gXCJmXCIpICYmIChjIDwgXCJBXCIgfHwgYyA+IFwiRlwiKSAmJiAoYyA8IFwiMFwiIHx8IGMgPiBcIjlcIikpe1xuXHRcdGlmKCF0aGlzLl94bWxNb2RlKXtcblx0XHRcdHRoaXMuX2RlY29kZU51bWVyaWNFbnRpdHkoMywgMTYpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLl9zdGF0ZSA9IHRoaXMuX2Jhc2VTdGF0ZTtcblx0XHR9XG5cdFx0dGhpcy5faW5kZXgtLTtcblx0fVxufTtcblxuVG9rZW5pemVyLnByb3RvdHlwZS5fY2xlYW51cCA9IGZ1bmN0aW9uICgpe1xuXHRpZih0aGlzLl9zZWN0aW9uU3RhcnQgPCAwKXtcblx0XHR0aGlzLl9idWZmZXIgPSBcIlwiO1xuXHRcdHRoaXMuX2J1ZmZlck9mZnNldCArPSB0aGlzLl9pbmRleDtcblx0XHR0aGlzLl9pbmRleCA9IDA7XG5cdH0gZWxzZSBpZih0aGlzLl9ydW5uaW5nKXtcblx0XHRpZih0aGlzLl9zdGF0ZSA9PT0gVEVYVCl7XG5cdFx0XHRpZih0aGlzLl9zZWN0aW9uU3RhcnQgIT09IHRoaXMuX2luZGV4KXtcblx0XHRcdFx0dGhpcy5fY2JzLm9udGV4dCh0aGlzLl9idWZmZXIuc3Vic3RyKHRoaXMuX3NlY3Rpb25TdGFydCkpO1xuXHRcdFx0fVxuXHRcdFx0dGhpcy5fYnVmZmVyID0gXCJcIjtcblx0XHRcdHRoaXMuX2J1ZmZlck9mZnNldCArPSB0aGlzLl9pbmRleDtcblx0XHRcdHRoaXMuX2luZGV4ID0gMDtcblx0XHR9IGVsc2UgaWYodGhpcy5fc2VjdGlvblN0YXJ0ID09PSB0aGlzLl9pbmRleCl7XG5cdFx0XHQvL3RoZSBzZWN0aW9uIGp1c3Qgc3RhcnRlZFxuXHRcdFx0dGhpcy5fYnVmZmVyID0gXCJcIjtcblx0XHRcdHRoaXMuX2J1ZmZlck9mZnNldCArPSB0aGlzLl9pbmRleDtcblx0XHRcdHRoaXMuX2luZGV4ID0gMDtcblx0XHR9IGVsc2Uge1xuXHRcdFx0Ly9yZW1vdmUgZXZlcnl0aGluZyB1bm5lY2Vzc2FyeVxuXHRcdFx0dGhpcy5fYnVmZmVyID0gdGhpcy5fYnVmZmVyLnN1YnN0cih0aGlzLl9zZWN0aW9uU3RhcnQpO1xuXHRcdFx0dGhpcy5faW5kZXggLT0gdGhpcy5fc2VjdGlvblN0YXJ0O1xuXHRcdFx0dGhpcy5fYnVmZmVyT2Zmc2V0ICs9IHRoaXMuX3NlY3Rpb25TdGFydDtcblx0XHR9XG5cblx0XHR0aGlzLl9zZWN0aW9uU3RhcnQgPSAwO1xuXHR9XG59O1xuXG4vL1RPRE8gbWFrZSBldmVudHMgY29uZGl0aW9uYWxcblRva2VuaXplci5wcm90b3R5cGUud3JpdGUgPSBmdW5jdGlvbihjaHVuayl7XG5cdGlmKHRoaXMuX2VuZGVkKSB0aGlzLl9jYnMub25lcnJvcihFcnJvcihcIi53cml0ZSgpIGFmdGVyIGRvbmUhXCIpKTtcblxuXHR0aGlzLl9idWZmZXIgKz0gY2h1bms7XG5cdHRoaXMuX3BhcnNlKCk7XG59O1xuXG5Ub2tlbml6ZXIucHJvdG90eXBlLl9wYXJzZSA9IGZ1bmN0aW9uKCl7XG5cdHdoaWxlKHRoaXMuX2luZGV4IDwgdGhpcy5fYnVmZmVyLmxlbmd0aCAmJiB0aGlzLl9ydW5uaW5nKXtcblx0XHR2YXIgYyA9IHRoaXMuX2J1ZmZlci5jaGFyQXQodGhpcy5faW5kZXgpO1xuXHRcdGlmKHRoaXMuX3N0YXRlID09PSBURVhUKSB7XG5cdFx0XHR0aGlzLl9zdGF0ZVRleHQoYyk7XG5cdFx0fSBlbHNlIGlmKHRoaXMuX3N0YXRlID09PSBCRUZPUkVfVEFHX05BTUUpe1xuXHRcdFx0dGhpcy5fc3RhdGVCZWZvcmVUYWdOYW1lKGMpO1xuXHRcdH0gZWxzZSBpZih0aGlzLl9zdGF0ZSA9PT0gSU5fVEFHX05BTUUpIHtcblx0XHRcdHRoaXMuX3N0YXRlSW5UYWdOYW1lKGMpO1xuXHRcdH0gZWxzZSBpZih0aGlzLl9zdGF0ZSA9PT0gQkVGT1JFX0NMT1NJTkdfVEFHX05BTUUpe1xuXHRcdFx0dGhpcy5fc3RhdGVCZWZvcmVDbG9zZWluZ1RhZ05hbWUoYyk7XG5cdFx0fSBlbHNlIGlmKHRoaXMuX3N0YXRlID09PSBJTl9DTE9TSU5HX1RBR19OQU1FKXtcblx0XHRcdHRoaXMuX3N0YXRlSW5DbG9zZWluZ1RhZ05hbWUoYyk7XG5cdFx0fSBlbHNlIGlmKHRoaXMuX3N0YXRlID09PSBBRlRFUl9DTE9TSU5HX1RBR19OQU1FKXtcblx0XHRcdHRoaXMuX3N0YXRlQWZ0ZXJDbG9zZWluZ1RhZ05hbWUoYyk7XG5cdFx0fSBlbHNlIGlmKHRoaXMuX3N0YXRlID09PSBJTl9TRUxGX0NMT1NJTkdfVEFHKXtcblx0XHRcdHRoaXMuX3N0YXRlSW5TZWxmQ2xvc2luZ1RhZyhjKTtcblx0XHR9XG5cblx0XHQvKlxuXHRcdCpcdGF0dHJpYnV0ZXNcblx0XHQqL1xuXHRcdGVsc2UgaWYodGhpcy5fc3RhdGUgPT09IEJFRk9SRV9BVFRSSUJVVEVfTkFNRSl7XG5cdFx0XHR0aGlzLl9zdGF0ZUJlZm9yZUF0dHJpYnV0ZU5hbWUoYyk7XG5cdFx0fSBlbHNlIGlmKHRoaXMuX3N0YXRlID09PSBJTl9BVFRSSUJVVEVfTkFNRSl7XG5cdFx0XHR0aGlzLl9zdGF0ZUluQXR0cmlidXRlTmFtZShjKTtcblx0XHR9IGVsc2UgaWYodGhpcy5fc3RhdGUgPT09IEFGVEVSX0FUVFJJQlVURV9OQU1FKXtcblx0XHRcdHRoaXMuX3N0YXRlQWZ0ZXJBdHRyaWJ1dGVOYW1lKGMpO1xuXHRcdH0gZWxzZSBpZih0aGlzLl9zdGF0ZSA9PT0gQkVGT1JFX0FUVFJJQlVURV9WQUxVRSl7XG5cdFx0XHR0aGlzLl9zdGF0ZUJlZm9yZUF0dHJpYnV0ZVZhbHVlKGMpO1xuXHRcdH0gZWxzZSBpZih0aGlzLl9zdGF0ZSA9PT0gSU5fQVRUUklCVVRFX1ZBTFVFX0RRKXtcblx0XHRcdHRoaXMuX3N0YXRlSW5BdHRyaWJ1dGVWYWx1ZURvdWJsZVF1b3RlcyhjKTtcblx0XHR9IGVsc2UgaWYodGhpcy5fc3RhdGUgPT09IElOX0FUVFJJQlVURV9WQUxVRV9TUSl7XG5cdFx0XHR0aGlzLl9zdGF0ZUluQXR0cmlidXRlVmFsdWVTaW5nbGVRdW90ZXMoYyk7XG5cdFx0fSBlbHNlIGlmKHRoaXMuX3N0YXRlID09PSBJTl9BVFRSSUJVVEVfVkFMVUVfTlEpe1xuXHRcdFx0dGhpcy5fc3RhdGVJbkF0dHJpYnV0ZVZhbHVlTm9RdW90ZXMoYyk7XG5cdFx0fVxuXG5cdFx0Lypcblx0XHQqXHRkZWNsYXJhdGlvbnNcblx0XHQqL1xuXHRcdGVsc2UgaWYodGhpcy5fc3RhdGUgPT09IEJFRk9SRV9ERUNMQVJBVElPTil7XG5cdFx0XHR0aGlzLl9zdGF0ZUJlZm9yZURlY2xhcmF0aW9uKGMpO1xuXHRcdH0gZWxzZSBpZih0aGlzLl9zdGF0ZSA9PT0gSU5fREVDTEFSQVRJT04pe1xuXHRcdFx0dGhpcy5fc3RhdGVJbkRlY2xhcmF0aW9uKGMpO1xuXHRcdH1cblxuXHRcdC8qXG5cdFx0Klx0cHJvY2Vzc2luZyBpbnN0cnVjdGlvbnNcblx0XHQqL1xuXHRcdGVsc2UgaWYodGhpcy5fc3RhdGUgPT09IElOX1BST0NFU1NJTkdfSU5TVFJVQ1RJT04pe1xuXHRcdFx0dGhpcy5fc3RhdGVJblByb2Nlc3NpbmdJbnN0cnVjdGlvbihjKTtcblx0XHR9XG5cblx0XHQvKlxuXHRcdCpcdGNvbW1lbnRzXG5cdFx0Ki9cblx0XHRlbHNlIGlmKHRoaXMuX3N0YXRlID09PSBCRUZPUkVfQ09NTUVOVCl7XG5cdFx0XHR0aGlzLl9zdGF0ZUJlZm9yZUNvbW1lbnQoYyk7XG5cdFx0fSBlbHNlIGlmKHRoaXMuX3N0YXRlID09PSBJTl9DT01NRU5UKXtcblx0XHRcdHRoaXMuX3N0YXRlSW5Db21tZW50KGMpO1xuXHRcdH0gZWxzZSBpZih0aGlzLl9zdGF0ZSA9PT0gQUZURVJfQ09NTUVOVF8xKXtcblx0XHRcdHRoaXMuX3N0YXRlQWZ0ZXJDb21tZW50MShjKTtcblx0XHR9IGVsc2UgaWYodGhpcy5fc3RhdGUgPT09IEFGVEVSX0NPTU1FTlRfMil7XG5cdFx0XHR0aGlzLl9zdGF0ZUFmdGVyQ29tbWVudDIoYyk7XG5cdFx0fVxuXG5cdFx0Lypcblx0XHQqXHRjZGF0YVxuXHRcdCovXG5cdFx0ZWxzZSBpZih0aGlzLl9zdGF0ZSA9PT0gQkVGT1JFX0NEQVRBXzEpe1xuXHRcdFx0dGhpcy5fc3RhdGVCZWZvcmVDZGF0YTEoYyk7XG5cdFx0fSBlbHNlIGlmKHRoaXMuX3N0YXRlID09PSBCRUZPUkVfQ0RBVEFfMil7XG5cdFx0XHR0aGlzLl9zdGF0ZUJlZm9yZUNkYXRhMihjKTtcblx0XHR9IGVsc2UgaWYodGhpcy5fc3RhdGUgPT09IEJFRk9SRV9DREFUQV8zKXtcblx0XHRcdHRoaXMuX3N0YXRlQmVmb3JlQ2RhdGEzKGMpO1xuXHRcdH0gZWxzZSBpZih0aGlzLl9zdGF0ZSA9PT0gQkVGT1JFX0NEQVRBXzQpe1xuXHRcdFx0dGhpcy5fc3RhdGVCZWZvcmVDZGF0YTQoYyk7XG5cdFx0fSBlbHNlIGlmKHRoaXMuX3N0YXRlID09PSBCRUZPUkVfQ0RBVEFfNSl7XG5cdFx0XHR0aGlzLl9zdGF0ZUJlZm9yZUNkYXRhNShjKTtcblx0XHR9IGVsc2UgaWYodGhpcy5fc3RhdGUgPT09IEJFRk9SRV9DREFUQV82KXtcblx0XHRcdHRoaXMuX3N0YXRlQmVmb3JlQ2RhdGE2KGMpO1xuXHRcdH0gZWxzZSBpZih0aGlzLl9zdGF0ZSA9PT0gSU5fQ0RBVEEpe1xuXHRcdFx0dGhpcy5fc3RhdGVJbkNkYXRhKGMpO1xuXHRcdH0gZWxzZSBpZih0aGlzLl9zdGF0ZSA9PT0gQUZURVJfQ0RBVEFfMSl7XG5cdFx0XHR0aGlzLl9zdGF0ZUFmdGVyQ2RhdGExKGMpO1xuXHRcdH0gZWxzZSBpZih0aGlzLl9zdGF0ZSA9PT0gQUZURVJfQ0RBVEFfMil7XG5cdFx0XHR0aGlzLl9zdGF0ZUFmdGVyQ2RhdGEyKGMpO1xuXHRcdH1cblxuXHRcdC8qXG5cdFx0KiBzcGVjaWFsIHRhZ3Ncblx0XHQqL1xuXHRcdGVsc2UgaWYodGhpcy5fc3RhdGUgPT09IEJFRk9SRV9TUEVDSUFMKXtcblx0XHRcdHRoaXMuX3N0YXRlQmVmb3JlU3BlY2lhbChjKTtcblx0XHR9IGVsc2UgaWYodGhpcy5fc3RhdGUgPT09IEJFRk9SRV9TUEVDSUFMX0VORCl7XG5cdFx0XHR0aGlzLl9zdGF0ZUJlZm9yZVNwZWNpYWxFbmQoYyk7XG5cdFx0fVxuXG5cdFx0Lypcblx0XHQqIHNjcmlwdFxuXHRcdCovXG5cdFx0ZWxzZSBpZih0aGlzLl9zdGF0ZSA9PT0gQkVGT1JFX1NDUklQVF8xKXtcblx0XHRcdHRoaXMuX3N0YXRlQmVmb3JlU2NyaXB0MShjKTtcblx0XHR9IGVsc2UgaWYodGhpcy5fc3RhdGUgPT09IEJFRk9SRV9TQ1JJUFRfMil7XG5cdFx0XHR0aGlzLl9zdGF0ZUJlZm9yZVNjcmlwdDIoYyk7XG5cdFx0fSBlbHNlIGlmKHRoaXMuX3N0YXRlID09PSBCRUZPUkVfU0NSSVBUXzMpe1xuXHRcdFx0dGhpcy5fc3RhdGVCZWZvcmVTY3JpcHQzKGMpO1xuXHRcdH0gZWxzZSBpZih0aGlzLl9zdGF0ZSA9PT0gQkVGT1JFX1NDUklQVF80KXtcblx0XHRcdHRoaXMuX3N0YXRlQmVmb3JlU2NyaXB0NChjKTtcblx0XHR9IGVsc2UgaWYodGhpcy5fc3RhdGUgPT09IEJFRk9SRV9TQ1JJUFRfNSl7XG5cdFx0XHR0aGlzLl9zdGF0ZUJlZm9yZVNjcmlwdDUoYyk7XG5cdFx0fVxuXG5cdFx0ZWxzZSBpZih0aGlzLl9zdGF0ZSA9PT0gQUZURVJfU0NSSVBUXzEpe1xuXHRcdFx0dGhpcy5fc3RhdGVBZnRlclNjcmlwdDEoYyk7XG5cdFx0fSBlbHNlIGlmKHRoaXMuX3N0YXRlID09PSBBRlRFUl9TQ1JJUFRfMil7XG5cdFx0XHR0aGlzLl9zdGF0ZUFmdGVyU2NyaXB0MihjKTtcblx0XHR9IGVsc2UgaWYodGhpcy5fc3RhdGUgPT09IEFGVEVSX1NDUklQVF8zKXtcblx0XHRcdHRoaXMuX3N0YXRlQWZ0ZXJTY3JpcHQzKGMpO1xuXHRcdH0gZWxzZSBpZih0aGlzLl9zdGF0ZSA9PT0gQUZURVJfU0NSSVBUXzQpe1xuXHRcdFx0dGhpcy5fc3RhdGVBZnRlclNjcmlwdDQoYyk7XG5cdFx0fSBlbHNlIGlmKHRoaXMuX3N0YXRlID09PSBBRlRFUl9TQ1JJUFRfNSl7XG5cdFx0XHR0aGlzLl9zdGF0ZUFmdGVyU2NyaXB0NShjKTtcblx0XHR9XG5cblx0XHQvKlxuXHRcdCogc3R5bGVcblx0XHQqL1xuXHRcdGVsc2UgaWYodGhpcy5fc3RhdGUgPT09IEJFRk9SRV9TVFlMRV8xKXtcblx0XHRcdHRoaXMuX3N0YXRlQmVmb3JlU3R5bGUxKGMpO1xuXHRcdH0gZWxzZSBpZih0aGlzLl9zdGF0ZSA9PT0gQkVGT1JFX1NUWUxFXzIpe1xuXHRcdFx0dGhpcy5fc3RhdGVCZWZvcmVTdHlsZTIoYyk7XG5cdFx0fSBlbHNlIGlmKHRoaXMuX3N0YXRlID09PSBCRUZPUkVfU1RZTEVfMyl7XG5cdFx0XHR0aGlzLl9zdGF0ZUJlZm9yZVN0eWxlMyhjKTtcblx0XHR9IGVsc2UgaWYodGhpcy5fc3RhdGUgPT09IEJFRk9SRV9TVFlMRV80KXtcblx0XHRcdHRoaXMuX3N0YXRlQmVmb3JlU3R5bGU0KGMpO1xuXHRcdH1cblxuXHRcdGVsc2UgaWYodGhpcy5fc3RhdGUgPT09IEFGVEVSX1NUWUxFXzEpe1xuXHRcdFx0dGhpcy5fc3RhdGVBZnRlclN0eWxlMShjKTtcblx0XHR9IGVsc2UgaWYodGhpcy5fc3RhdGUgPT09IEFGVEVSX1NUWUxFXzIpe1xuXHRcdFx0dGhpcy5fc3RhdGVBZnRlclN0eWxlMihjKTtcblx0XHR9IGVsc2UgaWYodGhpcy5fc3RhdGUgPT09IEFGVEVSX1NUWUxFXzMpe1xuXHRcdFx0dGhpcy5fc3RhdGVBZnRlclN0eWxlMyhjKTtcblx0XHR9IGVsc2UgaWYodGhpcy5fc3RhdGUgPT09IEFGVEVSX1NUWUxFXzQpe1xuXHRcdFx0dGhpcy5fc3RhdGVBZnRlclN0eWxlNChjKTtcblx0XHR9XG5cblx0XHQvKlxuXHRcdCogZW50aXRpZXNcblx0XHQqL1xuXHRcdGVsc2UgaWYodGhpcy5fc3RhdGUgPT09IEJFRk9SRV9FTlRJVFkpe1xuXHRcdFx0dGhpcy5fc3RhdGVCZWZvcmVFbnRpdHkoYyk7XG5cdFx0fSBlbHNlIGlmKHRoaXMuX3N0YXRlID09PSBCRUZPUkVfTlVNRVJJQ19FTlRJVFkpe1xuXHRcdFx0dGhpcy5fc3RhdGVCZWZvcmVOdW1lcmljRW50aXR5KGMpO1xuXHRcdH0gZWxzZSBpZih0aGlzLl9zdGF0ZSA9PT0gSU5fTkFNRURfRU5USVRZKXtcblx0XHRcdHRoaXMuX3N0YXRlSW5OYW1lZEVudGl0eShjKTtcblx0XHR9IGVsc2UgaWYodGhpcy5fc3RhdGUgPT09IElOX05VTUVSSUNfRU5USVRZKXtcblx0XHRcdHRoaXMuX3N0YXRlSW5OdW1lcmljRW50aXR5KGMpO1xuXHRcdH0gZWxzZSBpZih0aGlzLl9zdGF0ZSA9PT0gSU5fSEVYX0VOVElUWSl7XG5cdFx0XHR0aGlzLl9zdGF0ZUluSGV4RW50aXR5KGMpO1xuXHRcdH1cblxuXHRcdGVsc2Uge1xuXHRcdFx0dGhpcy5fY2JzLm9uZXJyb3IoRXJyb3IoXCJ1bmtub3duIF9zdGF0ZVwiKSwgdGhpcy5fc3RhdGUpO1xuXHRcdH1cblxuXHRcdHRoaXMuX2luZGV4Kys7XG5cdH1cblxuXHR0aGlzLl9jbGVhbnVwKCk7XG59O1xuXG5Ub2tlbml6ZXIucHJvdG90eXBlLnBhdXNlID0gZnVuY3Rpb24oKXtcblx0dGhpcy5fcnVubmluZyA9IGZhbHNlO1xufTtcblRva2VuaXplci5wcm90b3R5cGUucmVzdW1lID0gZnVuY3Rpb24oKXtcblx0dGhpcy5fcnVubmluZyA9IHRydWU7XG5cblx0aWYodGhpcy5faW5kZXggPCB0aGlzLl9idWZmZXIubGVuZ3RoKXtcblx0XHR0aGlzLl9wYXJzZSgpO1xuXHR9XG5cdGlmKHRoaXMuX2VuZGVkKXtcblx0XHR0aGlzLl9maW5pc2goKTtcblx0fVxufTtcblxuVG9rZW5pemVyLnByb3RvdHlwZS5lbmQgPSBmdW5jdGlvbihjaHVuayl7XG5cdGlmKHRoaXMuX2VuZGVkKSB0aGlzLl9jYnMub25lcnJvcihFcnJvcihcIi5lbmQoKSBhZnRlciBkb25lIVwiKSk7XG5cdGlmKGNodW5rKSB0aGlzLndyaXRlKGNodW5rKTtcblxuXHR0aGlzLl9lbmRlZCA9IHRydWU7XG5cblx0aWYodGhpcy5fcnVubmluZykgdGhpcy5fZmluaXNoKCk7XG59O1xuXG5Ub2tlbml6ZXIucHJvdG90eXBlLl9maW5pc2ggPSBmdW5jdGlvbigpe1xuXHQvL2lmIHRoZXJlIGlzIHJlbWFpbmluZyBkYXRhLCBlbWl0IGl0IGluIGEgcmVhc29uYWJsZSB3YXlcblx0aWYodGhpcy5fc2VjdGlvblN0YXJ0IDwgdGhpcy5faW5kZXgpe1xuXHRcdHRoaXMuX2hhbmRsZVRyYWlsaW5nRGF0YSgpO1xuXHR9XG5cblx0dGhpcy5fY2JzLm9uZW5kKCk7XG59O1xuXG5Ub2tlbml6ZXIucHJvdG90eXBlLl9oYW5kbGVUcmFpbGluZ0RhdGEgPSBmdW5jdGlvbigpe1xuXHR2YXIgZGF0YSA9IHRoaXMuX2J1ZmZlci5zdWJzdHIodGhpcy5fc2VjdGlvblN0YXJ0KTtcblxuXHRpZih0aGlzLl9zdGF0ZSA9PT0gSU5fQ0RBVEEgfHwgdGhpcy5fc3RhdGUgPT09IEFGVEVSX0NEQVRBXzEgfHwgdGhpcy5fc3RhdGUgPT09IEFGVEVSX0NEQVRBXzIpe1xuXHRcdHRoaXMuX2Nicy5vbmNkYXRhKGRhdGEpO1xuXHR9IGVsc2UgaWYodGhpcy5fc3RhdGUgPT09IElOX0NPTU1FTlQgfHwgdGhpcy5fc3RhdGUgPT09IEFGVEVSX0NPTU1FTlRfMSB8fCB0aGlzLl9zdGF0ZSA9PT0gQUZURVJfQ09NTUVOVF8yKXtcblx0XHR0aGlzLl9jYnMub25jb21tZW50KGRhdGEpO1xuXHR9IGVsc2UgaWYodGhpcy5fc3RhdGUgPT09IElOX05BTUVEX0VOVElUWSAmJiAhdGhpcy5feG1sTW9kZSl7XG5cdFx0dGhpcy5fcGFyc2VMZWdhY3lFbnRpdHkoKTtcblx0XHRpZih0aGlzLl9zZWN0aW9uU3RhcnQgPCB0aGlzLl9pbmRleCl7XG5cdFx0XHR0aGlzLl9zdGF0ZSA9IHRoaXMuX2Jhc2VTdGF0ZTtcblx0XHRcdHRoaXMuX2hhbmRsZVRyYWlsaW5nRGF0YSgpO1xuXHRcdH1cblx0fSBlbHNlIGlmKHRoaXMuX3N0YXRlID09PSBJTl9OVU1FUklDX0VOVElUWSAmJiAhdGhpcy5feG1sTW9kZSl7XG5cdFx0dGhpcy5fZGVjb2RlTnVtZXJpY0VudGl0eSgyLCAxMCk7XG5cdFx0aWYodGhpcy5fc2VjdGlvblN0YXJ0IDwgdGhpcy5faW5kZXgpe1xuXHRcdFx0dGhpcy5fc3RhdGUgPSB0aGlzLl9iYXNlU3RhdGU7XG5cdFx0XHR0aGlzLl9oYW5kbGVUcmFpbGluZ0RhdGEoKTtcblx0XHR9XG5cdH0gZWxzZSBpZih0aGlzLl9zdGF0ZSA9PT0gSU5fSEVYX0VOVElUWSAmJiAhdGhpcy5feG1sTW9kZSl7XG5cdFx0dGhpcy5fZGVjb2RlTnVtZXJpY0VudGl0eSgzLCAxNik7XG5cdFx0aWYodGhpcy5fc2VjdGlvblN0YXJ0IDwgdGhpcy5faW5kZXgpe1xuXHRcdFx0dGhpcy5fc3RhdGUgPSB0aGlzLl9iYXNlU3RhdGU7XG5cdFx0XHR0aGlzLl9oYW5kbGVUcmFpbGluZ0RhdGEoKTtcblx0XHR9XG5cdH0gZWxzZSBpZihcblx0XHR0aGlzLl9zdGF0ZSAhPT0gSU5fVEFHX05BTUUgJiZcblx0XHR0aGlzLl9zdGF0ZSAhPT0gQkVGT1JFX0FUVFJJQlVURV9OQU1FICYmXG5cdFx0dGhpcy5fc3RhdGUgIT09IEJFRk9SRV9BVFRSSUJVVEVfVkFMVUUgJiZcblx0XHR0aGlzLl9zdGF0ZSAhPT0gQUZURVJfQVRUUklCVVRFX05BTUUgJiZcblx0XHR0aGlzLl9zdGF0ZSAhPT0gSU5fQVRUUklCVVRFX05BTUUgJiZcblx0XHR0aGlzLl9zdGF0ZSAhPT0gSU5fQVRUUklCVVRFX1ZBTFVFX1NRICYmXG5cdFx0dGhpcy5fc3RhdGUgIT09IElOX0FUVFJJQlVURV9WQUxVRV9EUSAmJlxuXHRcdHRoaXMuX3N0YXRlICE9PSBJTl9BVFRSSUJVVEVfVkFMVUVfTlEgJiZcblx0XHR0aGlzLl9zdGF0ZSAhPT0gSU5fQ0xPU0lOR19UQUdfTkFNRVxuXHQpe1xuXHRcdHRoaXMuX2Nicy5vbnRleHQoZGF0YSk7XG5cdH1cblx0Ly9lbHNlLCBpZ25vcmUgcmVtYWluaW5nIGRhdGFcblx0Ly9UT0RPIGFkZCBhIHdheSB0byByZW1vdmUgY3VycmVudCB0YWdcbn07XG5cblRva2VuaXplci5wcm90b3R5cGUucmVzZXQgPSBmdW5jdGlvbigpe1xuXHRUb2tlbml6ZXIuY2FsbCh0aGlzLCB7eG1sTW9kZTogdGhpcy5feG1sTW9kZSwgZGVjb2RlRW50aXRpZXM6IHRoaXMuX2RlY29kZUVudGl0aWVzfSwgdGhpcy5fY2JzKTtcbn07XG5cblRva2VuaXplci5wcm90b3R5cGUuZ2V0QWJzb2x1dGVJbmRleCA9IGZ1bmN0aW9uKCl7XG5cdHJldHVybiB0aGlzLl9idWZmZXJPZmZzZXQgKyB0aGlzLl9pbmRleDtcbn07XG5cblRva2VuaXplci5wcm90b3R5cGUuX2dldFNlY3Rpb24gPSBmdW5jdGlvbigpe1xuXHRyZXR1cm4gdGhpcy5fYnVmZmVyLnN1YnN0cmluZyh0aGlzLl9zZWN0aW9uU3RhcnQsIHRoaXMuX2luZGV4KTtcbn07XG5cblRva2VuaXplci5wcm90b3R5cGUuX2VtaXRUb2tlbiA9IGZ1bmN0aW9uKG5hbWUpe1xuXHR0aGlzLl9jYnNbbmFtZV0odGhpcy5fZ2V0U2VjdGlvbigpKTtcblx0dGhpcy5fc2VjdGlvblN0YXJ0ID0gLTE7XG59O1xuXG5Ub2tlbml6ZXIucHJvdG90eXBlLl9lbWl0UGFydGlhbCA9IGZ1bmN0aW9uKHZhbHVlKXtcblx0aWYodGhpcy5fYmFzZVN0YXRlICE9PSBURVhUKXtcblx0XHR0aGlzLl9jYnMub25hdHRyaWJkYXRhKHZhbHVlKTsgLy9UT0RPIGltcGxlbWVudCB0aGUgbmV3IGV2ZW50XG5cdH0gZWxzZSB7XG5cdFx0dGhpcy5fY2JzLm9udGV4dCh2YWx1ZSk7XG5cdH1cbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IFN0cmVhbTtcblxudmFyIFBhcnNlciA9IHJlcXVpcmUoXCIuL1BhcnNlci5qc1wiKSxcbiAgICBXcml0YWJsZVN0cmVhbSA9IHJlcXVpcmUoXCJzdHJlYW1cIikuV3JpdGFibGUgfHwgcmVxdWlyZShcInJlYWRhYmxlLXN0cmVhbVwiKS5Xcml0YWJsZSxcbiAgICBTdHJpbmdEZWNvZGVyID0gcmVxdWlyZShcInN0cmluZ19kZWNvZGVyXCIpLlN0cmluZ0RlY29kZXIsXG4gICAgQnVmZmVyID0gcmVxdWlyZShcImJ1ZmZlclwiKS5CdWZmZXI7XG5cbmZ1bmN0aW9uIFN0cmVhbShjYnMsIG9wdGlvbnMpe1xuXHR2YXIgcGFyc2VyID0gdGhpcy5fcGFyc2VyID0gbmV3IFBhcnNlcihjYnMsIG9wdGlvbnMpO1xuXHR2YXIgZGVjb2RlciA9IHRoaXMuX2RlY29kZXIgPSBuZXcgU3RyaW5nRGVjb2RlcigpO1xuXG5cdFdyaXRhYmxlU3RyZWFtLmNhbGwodGhpcywge2RlY29kZVN0cmluZ3M6IGZhbHNlfSk7XG5cblx0dGhpcy5vbmNlKFwiZmluaXNoXCIsIGZ1bmN0aW9uKCl7XG5cdFx0cGFyc2VyLmVuZChkZWNvZGVyLmVuZCgpKTtcblx0fSk7XG59XG5cbnJlcXVpcmUoXCJpbmhlcml0c1wiKShTdHJlYW0sIFdyaXRhYmxlU3RyZWFtKTtcblxuV3JpdGFibGVTdHJlYW0ucHJvdG90eXBlLl93cml0ZSA9IGZ1bmN0aW9uKGNodW5rLCBlbmNvZGluZywgY2Ipe1xuXHRpZihjaHVuayBpbnN0YW5jZW9mIEJ1ZmZlcikgY2h1bmsgPSB0aGlzLl9kZWNvZGVyLndyaXRlKGNodW5rKTtcblx0dGhpcy5fcGFyc2VyLndyaXRlKGNodW5rKTtcblx0Y2IoKTtcbn07IiwidmFyIFBhcnNlciA9IHJlcXVpcmUoXCIuL1BhcnNlci5qc1wiKSxcbiAgICBEb21IYW5kbGVyID0gcmVxdWlyZShcImRvbWhhbmRsZXJcIik7XG5cbmZ1bmN0aW9uIGRlZmluZVByb3AobmFtZSwgdmFsdWUpe1xuXHRkZWxldGUgbW9kdWxlLmV4cG9ydHNbbmFtZV07XG5cdG1vZHVsZS5leHBvcnRzW25hbWVdID0gdmFsdWU7XG5cdHJldHVybiB2YWx1ZTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG5cdFBhcnNlcjogUGFyc2VyLFxuXHRUb2tlbml6ZXI6IHJlcXVpcmUoXCIuL1Rva2VuaXplci5qc1wiKSxcblx0RWxlbWVudFR5cGU6IHJlcXVpcmUoXCJkb21lbGVtZW50dHlwZVwiKSxcblx0RG9tSGFuZGxlcjogRG9tSGFuZGxlcixcblx0Z2V0IEZlZWRIYW5kbGVyKCl7XG5cdFx0cmV0dXJuIGRlZmluZVByb3AoXCJGZWVkSGFuZGxlclwiLCByZXF1aXJlKFwiLi9GZWVkSGFuZGxlci5qc1wiKSk7XG5cdH0sXG5cdGdldCBTdHJlYW0oKXtcblx0XHRyZXR1cm4gZGVmaW5lUHJvcChcIlN0cmVhbVwiLCByZXF1aXJlKFwiLi9TdHJlYW0uanNcIikpO1xuXHR9LFxuXHRnZXQgV3JpdGFibGVTdHJlYW0oKXtcblx0XHRyZXR1cm4gZGVmaW5lUHJvcChcIldyaXRhYmxlU3RyZWFtXCIsIHJlcXVpcmUoXCIuL1dyaXRhYmxlU3RyZWFtLmpzXCIpKTtcblx0fSxcblx0Z2V0IFByb3h5SGFuZGxlcigpe1xuXHRcdHJldHVybiBkZWZpbmVQcm9wKFwiUHJveHlIYW5kbGVyXCIsIHJlcXVpcmUoXCIuL1Byb3h5SGFuZGxlci5qc1wiKSk7XG5cdH0sXG5cdGdldCBEb21VdGlscygpe1xuXHRcdHJldHVybiBkZWZpbmVQcm9wKFwiRG9tVXRpbHNcIiwgcmVxdWlyZShcImRvbXV0aWxzXCIpKTtcblx0fSxcblx0Z2V0IENvbGxlY3RpbmdIYW5kbGVyKCl7XG5cdFx0cmV0dXJuIGRlZmluZVByb3AoXCJDb2xsZWN0aW5nSGFuZGxlclwiLCByZXF1aXJlKFwiLi9Db2xsZWN0aW5nSGFuZGxlci5qc1wiKSk7XG5cdH0sXG5cdC8vIEZvciBsZWdhY3kgc3VwcG9ydFxuXHREZWZhdWx0SGFuZGxlcjogRG9tSGFuZGxlcixcblx0Z2V0IFJzc0hhbmRsZXIoKXtcblx0XHRyZXR1cm4gZGVmaW5lUHJvcChcIlJzc0hhbmRsZXJcIiwgdGhpcy5GZWVkSGFuZGxlcik7XG5cdH0sXG5cdC8vaGVscGVyIG1ldGhvZHNcblx0cGFyc2VET006IGZ1bmN0aW9uKGRhdGEsIG9wdGlvbnMpe1xuXHRcdHZhciBoYW5kbGVyID0gbmV3IERvbUhhbmRsZXIob3B0aW9ucyk7XG5cdFx0bmV3IFBhcnNlcihoYW5kbGVyLCBvcHRpb25zKS5lbmQoZGF0YSk7XG5cdFx0cmV0dXJuIGhhbmRsZXIuZG9tO1xuXHR9LFxuXHRwYXJzZUZlZWQ6IGZ1bmN0aW9uKGZlZWQsIG9wdGlvbnMpe1xuXHRcdHZhciBoYW5kbGVyID0gbmV3IG1vZHVsZS5leHBvcnRzLkZlZWRIYW5kbGVyKG9wdGlvbnMpO1xuXHRcdG5ldyBQYXJzZXIoaGFuZGxlciwgb3B0aW9ucykuZW5kKGZlZWQpO1xuXHRcdHJldHVybiBoYW5kbGVyLmRvbTtcblx0fSxcblx0Y3JlYXRlRG9tU3RyZWFtOiBmdW5jdGlvbihjYiwgb3B0aW9ucywgZWxlbWVudENiKXtcblx0XHR2YXIgaGFuZGxlciA9IG5ldyBEb21IYW5kbGVyKGNiLCBvcHRpb25zLCBlbGVtZW50Q2IpO1xuXHRcdHJldHVybiBuZXcgUGFyc2VyKGhhbmRsZXIsIG9wdGlvbnMpO1xuXHR9LFxuXHQvLyBMaXN0IG9mIGFsbCBldmVudHMgdGhhdCB0aGUgcGFyc2VyIGVtaXRzXG5cdEVWRU5UUzogeyAvKiBGb3JtYXQ6IGV2ZW50bmFtZTogbnVtYmVyIG9mIGFyZ3VtZW50cyAqL1xuXHRcdGF0dHJpYnV0ZTogMixcblx0XHRjZGF0YXN0YXJ0OiAwLFxuXHRcdGNkYXRhZW5kOiAwLFxuXHRcdHRleHQ6IDEsXG5cdFx0cHJvY2Vzc2luZ2luc3RydWN0aW9uOiAyLFxuXHRcdGNvbW1lbnQ6IDEsXG5cdFx0Y29tbWVudGVuZDogMCxcblx0XHRjbG9zZXRhZzogMSxcblx0XHRvcGVudGFnOiAyLFxuXHRcdG9wZW50YWduYW1lOiAxLFxuXHRcdGVycm9yOiAxLFxuXHRcdGVuZDogMFxuXHR9XG59O1xuIiwiZXhwb3J0cy5yZWFkID0gZnVuY3Rpb24gKGJ1ZmZlciwgb2Zmc2V0LCBpc0xFLCBtTGVuLCBuQnl0ZXMpIHtcbiAgdmFyIGUsIG1cbiAgdmFyIGVMZW4gPSBuQnl0ZXMgKiA4IC0gbUxlbiAtIDFcbiAgdmFyIGVNYXggPSAoMSA8PCBlTGVuKSAtIDFcbiAgdmFyIGVCaWFzID0gZU1heCA+PiAxXG4gIHZhciBuQml0cyA9IC03XG4gIHZhciBpID0gaXNMRSA/IChuQnl0ZXMgLSAxKSA6IDBcbiAgdmFyIGQgPSBpc0xFID8gLTEgOiAxXG4gIHZhciBzID0gYnVmZmVyW29mZnNldCArIGldXG5cbiAgaSArPSBkXG5cbiAgZSA9IHMgJiAoKDEgPDwgKC1uQml0cykpIC0gMSlcbiAgcyA+Pj0gKC1uQml0cylcbiAgbkJpdHMgKz0gZUxlblxuICBmb3IgKDsgbkJpdHMgPiAwOyBlID0gZSAqIDI1NiArIGJ1ZmZlcltvZmZzZXQgKyBpXSwgaSArPSBkLCBuQml0cyAtPSA4KSB7fVxuXG4gIG0gPSBlICYgKCgxIDw8ICgtbkJpdHMpKSAtIDEpXG4gIGUgPj49ICgtbkJpdHMpXG4gIG5CaXRzICs9IG1MZW5cbiAgZm9yICg7IG5CaXRzID4gMDsgbSA9IG0gKiAyNTYgKyBidWZmZXJbb2Zmc2V0ICsgaV0sIGkgKz0gZCwgbkJpdHMgLT0gOCkge31cblxuICBpZiAoZSA9PT0gMCkge1xuICAgIGUgPSAxIC0gZUJpYXNcbiAgfSBlbHNlIGlmIChlID09PSBlTWF4KSB7XG4gICAgcmV0dXJuIG0gPyBOYU4gOiAoKHMgPyAtMSA6IDEpICogSW5maW5pdHkpXG4gIH0gZWxzZSB7XG4gICAgbSA9IG0gKyBNYXRoLnBvdygyLCBtTGVuKVxuICAgIGUgPSBlIC0gZUJpYXNcbiAgfVxuICByZXR1cm4gKHMgPyAtMSA6IDEpICogbSAqIE1hdGgucG93KDIsIGUgLSBtTGVuKVxufVxuXG5leHBvcnRzLndyaXRlID0gZnVuY3Rpb24gKGJ1ZmZlciwgdmFsdWUsIG9mZnNldCwgaXNMRSwgbUxlbiwgbkJ5dGVzKSB7XG4gIHZhciBlLCBtLCBjXG4gIHZhciBlTGVuID0gbkJ5dGVzICogOCAtIG1MZW4gLSAxXG4gIHZhciBlTWF4ID0gKDEgPDwgZUxlbikgLSAxXG4gIHZhciBlQmlhcyA9IGVNYXggPj4gMVxuICB2YXIgcnQgPSAobUxlbiA9PT0gMjMgPyBNYXRoLnBvdygyLCAtMjQpIC0gTWF0aC5wb3coMiwgLTc3KSA6IDApXG4gIHZhciBpID0gaXNMRSA/IDAgOiAobkJ5dGVzIC0gMSlcbiAgdmFyIGQgPSBpc0xFID8gMSA6IC0xXG4gIHZhciBzID0gdmFsdWUgPCAwIHx8ICh2YWx1ZSA9PT0gMCAmJiAxIC8gdmFsdWUgPCAwKSA/IDEgOiAwXG5cbiAgdmFsdWUgPSBNYXRoLmFicyh2YWx1ZSlcblxuICBpZiAoaXNOYU4odmFsdWUpIHx8IHZhbHVlID09PSBJbmZpbml0eSkge1xuICAgIG0gPSBpc05hTih2YWx1ZSkgPyAxIDogMFxuICAgIGUgPSBlTWF4XG4gIH0gZWxzZSB7XG4gICAgZSA9IE1hdGguZmxvb3IoTWF0aC5sb2codmFsdWUpIC8gTWF0aC5MTjIpXG4gICAgaWYgKHZhbHVlICogKGMgPSBNYXRoLnBvdygyLCAtZSkpIDwgMSkge1xuICAgICAgZS0tXG4gICAgICBjICo9IDJcbiAgICB9XG4gICAgaWYgKGUgKyBlQmlhcyA+PSAxKSB7XG4gICAgICB2YWx1ZSArPSBydCAvIGNcbiAgICB9IGVsc2Uge1xuICAgICAgdmFsdWUgKz0gcnQgKiBNYXRoLnBvdygyLCAxIC0gZUJpYXMpXG4gICAgfVxuICAgIGlmICh2YWx1ZSAqIGMgPj0gMikge1xuICAgICAgZSsrXG4gICAgICBjIC89IDJcbiAgICB9XG5cbiAgICBpZiAoZSArIGVCaWFzID49IGVNYXgpIHtcbiAgICAgIG0gPSAwXG4gICAgICBlID0gZU1heFxuICAgIH0gZWxzZSBpZiAoZSArIGVCaWFzID49IDEpIHtcbiAgICAgIG0gPSAodmFsdWUgKiBjIC0gMSkgKiBNYXRoLnBvdygyLCBtTGVuKVxuICAgICAgZSA9IGUgKyBlQmlhc1xuICAgIH0gZWxzZSB7XG4gICAgICBtID0gdmFsdWUgKiBNYXRoLnBvdygyLCBlQmlhcyAtIDEpICogTWF0aC5wb3coMiwgbUxlbilcbiAgICAgIGUgPSAwXG4gICAgfVxuICB9XG5cbiAgZm9yICg7IG1MZW4gPj0gODsgYnVmZmVyW29mZnNldCArIGldID0gbSAmIDB4ZmYsIGkgKz0gZCwgbSAvPSAyNTYsIG1MZW4gLT0gOCkge31cblxuICBlID0gKGUgPDwgbUxlbikgfCBtXG4gIGVMZW4gKz0gbUxlblxuICBmb3IgKDsgZUxlbiA+IDA7IGJ1ZmZlcltvZmZzZXQgKyBpXSA9IGUgJiAweGZmLCBpICs9IGQsIGUgLz0gMjU2LCBlTGVuIC09IDgpIHt9XG5cbiAgYnVmZmVyW29mZnNldCArIGkgLSBkXSB8PSBzICogMTI4XG59XG4iLCJpZiAodHlwZW9mIE9iamVjdC5jcmVhdGUgPT09ICdmdW5jdGlvbicpIHtcbiAgLy8gaW1wbGVtZW50YXRpb24gZnJvbSBzdGFuZGFyZCBub2RlLmpzICd1dGlsJyBtb2R1bGVcbiAgbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpbmhlcml0cyhjdG9yLCBzdXBlckN0b3IpIHtcbiAgICBjdG9yLnN1cGVyXyA9IHN1cGVyQ3RvclxuICAgIGN0b3IucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckN0b3IucHJvdG90eXBlLCB7XG4gICAgICBjb25zdHJ1Y3Rvcjoge1xuICAgICAgICB2YWx1ZTogY3RvcixcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICAgIH1cbiAgICB9KTtcbiAgfTtcbn0gZWxzZSB7XG4gIC8vIG9sZCBzY2hvb2wgc2hpbSBmb3Igb2xkIGJyb3dzZXJzXG4gIG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaW5oZXJpdHMoY3Rvciwgc3VwZXJDdG9yKSB7XG4gICAgY3Rvci5zdXBlcl8gPSBzdXBlckN0b3JcbiAgICB2YXIgVGVtcEN0b3IgPSBmdW5jdGlvbiAoKSB7fVxuICAgIFRlbXBDdG9yLnByb3RvdHlwZSA9IHN1cGVyQ3Rvci5wcm90b3R5cGVcbiAgICBjdG9yLnByb3RvdHlwZSA9IG5ldyBUZW1wQ3RvcigpXG4gICAgY3Rvci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBjdG9yXG4gIH1cbn1cbiIsIi8qIVxuICogRGV0ZXJtaW5lIGlmIGFuIG9iamVjdCBpcyBhIEJ1ZmZlclxuICpcbiAqIEBhdXRob3IgICBGZXJvc3MgQWJvdWtoYWRpamVoIDxmZXJvc3NAZmVyb3NzLm9yZz4gPGh0dHA6Ly9mZXJvc3Mub3JnPlxuICogQGxpY2Vuc2UgIE1JVFxuICovXG5cbi8vIFRoZSBfaXNCdWZmZXIgY2hlY2sgaXMgZm9yIFNhZmFyaSA1LTcgc3VwcG9ydCwgYmVjYXVzZSBpdCdzIG1pc3Npbmdcbi8vIE9iamVjdC5wcm90b3R5cGUuY29uc3RydWN0b3IuIFJlbW92ZSB0aGlzIGV2ZW50dWFsbHlcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG9iaikge1xuICByZXR1cm4gb2JqICE9IG51bGwgJiYgKGlzQnVmZmVyKG9iaikgfHwgaXNTbG93QnVmZmVyKG9iaikgfHwgISFvYmouX2lzQnVmZmVyKVxufVxuXG5mdW5jdGlvbiBpc0J1ZmZlciAob2JqKSB7XG4gIHJldHVybiAhIW9iai5jb25zdHJ1Y3RvciAmJiB0eXBlb2Ygb2JqLmNvbnN0cnVjdG9yLmlzQnVmZmVyID09PSAnZnVuY3Rpb24nICYmIG9iai5jb25zdHJ1Y3Rvci5pc0J1ZmZlcihvYmopXG59XG5cbi8vIEZvciBOb2RlIHYwLjEwIHN1cHBvcnQuIFJlbW92ZSB0aGlzIGV2ZW50dWFsbHkuXG5mdW5jdGlvbiBpc1Nsb3dCdWZmZXIgKG9iaikge1xuICByZXR1cm4gdHlwZW9mIG9iai5yZWFkRmxvYXRMRSA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2Ygb2JqLnNsaWNlID09PSAnZnVuY3Rpb24nICYmIGlzQnVmZmVyKG9iai5zbGljZSgwLCAwKSlcbn1cbiIsInZhciB0b1N0cmluZyA9IHt9LnRvU3RyaW5nO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEFycmF5LmlzQXJyYXkgfHwgZnVuY3Rpb24gKGFycikge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbChhcnIpID09ICdbb2JqZWN0IEFycmF5XSc7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pZiAoIXByb2Nlc3MudmVyc2lvbiB8fFxuICAgIHByb2Nlc3MudmVyc2lvbi5pbmRleE9mKCd2MC4nKSA9PT0gMCB8fFxuICAgIHByb2Nlc3MudmVyc2lvbi5pbmRleE9mKCd2MS4nKSA9PT0gMCAmJiBwcm9jZXNzLnZlcnNpb24uaW5kZXhPZigndjEuOC4nKSAhPT0gMCkge1xuICBtb2R1bGUuZXhwb3J0cyA9IG5leHRUaWNrO1xufSBlbHNlIHtcbiAgbW9kdWxlLmV4cG9ydHMgPSBwcm9jZXNzLm5leHRUaWNrO1xufVxuXG5mdW5jdGlvbiBuZXh0VGljayhmbiwgYXJnMSwgYXJnMiwgYXJnMykge1xuICBpZiAodHlwZW9mIGZuICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignXCJjYWxsYmFja1wiIGFyZ3VtZW50IG11c3QgYmUgYSBmdW5jdGlvbicpO1xuICB9XG4gIHZhciBsZW4gPSBhcmd1bWVudHMubGVuZ3RoO1xuICB2YXIgYXJncywgaTtcbiAgc3dpdGNoIChsZW4pIHtcbiAgY2FzZSAwOlxuICBjYXNlIDE6XG4gICAgcmV0dXJuIHByb2Nlc3MubmV4dFRpY2soZm4pO1xuICBjYXNlIDI6XG4gICAgcmV0dXJuIHByb2Nlc3MubmV4dFRpY2soZnVuY3Rpb24gYWZ0ZXJUaWNrT25lKCkge1xuICAgICAgZm4uY2FsbChudWxsLCBhcmcxKTtcbiAgICB9KTtcbiAgY2FzZSAzOlxuICAgIHJldHVybiBwcm9jZXNzLm5leHRUaWNrKGZ1bmN0aW9uIGFmdGVyVGlja1R3bygpIHtcbiAgICAgIGZuLmNhbGwobnVsbCwgYXJnMSwgYXJnMik7XG4gICAgfSk7XG4gIGNhc2UgNDpcbiAgICByZXR1cm4gcHJvY2Vzcy5uZXh0VGljayhmdW5jdGlvbiBhZnRlclRpY2tUaHJlZSgpIHtcbiAgICAgIGZuLmNhbGwobnVsbCwgYXJnMSwgYXJnMiwgYXJnMyk7XG4gICAgfSk7XG4gIGRlZmF1bHQ6XG4gICAgYXJncyA9IG5ldyBBcnJheShsZW4gLSAxKTtcbiAgICBpID0gMDtcbiAgICB3aGlsZSAoaSA8IGFyZ3MubGVuZ3RoKSB7XG4gICAgICBhcmdzW2krK10gPSBhcmd1bWVudHNbaV07XG4gICAgfVxuICAgIHJldHVybiBwcm9jZXNzLm5leHRUaWNrKGZ1bmN0aW9uIGFmdGVyVGljaygpIHtcbiAgICAgIGZuLmFwcGx5KG51bGwsIGFyZ3MpO1xuICAgIH0pO1xuICB9XG59XG4iLCIvLyBzaGltIGZvciB1c2luZyBwcm9jZXNzIGluIGJyb3dzZXJcbnZhciBwcm9jZXNzID0gbW9kdWxlLmV4cG9ydHMgPSB7fTtcblxuLy8gY2FjaGVkIGZyb20gd2hhdGV2ZXIgZ2xvYmFsIGlzIHByZXNlbnQgc28gdGhhdCB0ZXN0IHJ1bm5lcnMgdGhhdCBzdHViIGl0XG4vLyBkb24ndCBicmVhayB0aGluZ3MuICBCdXQgd2UgbmVlZCB0byB3cmFwIGl0IGluIGEgdHJ5IGNhdGNoIGluIGNhc2UgaXQgaXNcbi8vIHdyYXBwZWQgaW4gc3RyaWN0IG1vZGUgY29kZSB3aGljaCBkb2Vzbid0IGRlZmluZSBhbnkgZ2xvYmFscy4gIEl0J3MgaW5zaWRlIGFcbi8vIGZ1bmN0aW9uIGJlY2F1c2UgdHJ5L2NhdGNoZXMgZGVvcHRpbWl6ZSBpbiBjZXJ0YWluIGVuZ2luZXMuXG5cbnZhciBjYWNoZWRTZXRUaW1lb3V0O1xudmFyIGNhY2hlZENsZWFyVGltZW91dDtcblxuZnVuY3Rpb24gZGVmYXVsdFNldFRpbW91dCgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3NldFRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbmZ1bmN0aW9uIGRlZmF1bHRDbGVhclRpbWVvdXQgKCkge1xuICAgIHRocm93IG5ldyBFcnJvcignY2xlYXJUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG4oZnVuY3Rpb24gKCkge1xuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2Ygc2V0VGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2YgY2xlYXJUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICAgIH1cbn0gKCkpXG5mdW5jdGlvbiBydW5UaW1lb3V0KGZ1bikge1xuICAgIGlmIChjYWNoZWRTZXRUaW1lb3V0ID09PSBzZXRUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICAvLyBpZiBzZXRUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuICAgIGlmICgoY2FjaGVkU2V0VGltZW91dCA9PT0gZGVmYXVsdFNldFRpbW91dCB8fCAhY2FjaGVkU2V0VGltZW91dCkgJiYgc2V0VGltZW91dCkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dChmdW4sIDApO1xuICAgIH0gY2F0Y2goZSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwobnVsbCwgZnVuLCAwKTtcbiAgICAgICAgfSBjYXRjaChlKXtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yXG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKHRoaXMsIGZ1biwgMCk7XG4gICAgICAgIH1cbiAgICB9XG5cblxufVxuZnVuY3Rpb24gcnVuQ2xlYXJUaW1lb3V0KG1hcmtlcikge1xuICAgIGlmIChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGNsZWFyVGltZW91dCkge1xuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH1cbiAgICAvLyBpZiBjbGVhclRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGRlZmF1bHRDbGVhclRpbWVvdXQgfHwgIWNhY2hlZENsZWFyVGltZW91dCkgJiYgY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCAgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbChudWxsLCBtYXJrZXIpO1xuICAgICAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yLlxuICAgICAgICAgICAgLy8gU29tZSB2ZXJzaW9ucyBvZiBJLkUuIGhhdmUgZGlmZmVyZW50IHJ1bGVzIGZvciBjbGVhclRpbWVvdXQgdnMgc2V0VGltZW91dFxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKHRoaXMsIG1hcmtlcik7XG4gICAgICAgIH1cbiAgICB9XG5cblxuXG59XG52YXIgcXVldWUgPSBbXTtcbnZhciBkcmFpbmluZyA9IGZhbHNlO1xudmFyIGN1cnJlbnRRdWV1ZTtcbnZhciBxdWV1ZUluZGV4ID0gLTE7XG5cbmZ1bmN0aW9uIGNsZWFuVXBOZXh0VGljaygpIHtcbiAgICBpZiAoIWRyYWluaW5nIHx8ICFjdXJyZW50UXVldWUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIGlmIChjdXJyZW50UXVldWUubGVuZ3RoKSB7XG4gICAgICAgIHF1ZXVlID0gY3VycmVudFF1ZXVlLmNvbmNhdChxdWV1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgIH1cbiAgICBpZiAocXVldWUubGVuZ3RoKSB7XG4gICAgICAgIGRyYWluUXVldWUoKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGRyYWluUXVldWUoKSB7XG4gICAgaWYgKGRyYWluaW5nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIHRpbWVvdXQgPSBydW5UaW1lb3V0KGNsZWFuVXBOZXh0VGljayk7XG4gICAgZHJhaW5pbmcgPSB0cnVlO1xuXG4gICAgdmFyIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB3aGlsZShsZW4pIHtcbiAgICAgICAgY3VycmVudFF1ZXVlID0gcXVldWU7XG4gICAgICAgIHF1ZXVlID0gW107XG4gICAgICAgIHdoaWxlICgrK3F1ZXVlSW5kZXggPCBsZW4pIHtcbiAgICAgICAgICAgIGlmIChjdXJyZW50UXVldWUpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50UXVldWVbcXVldWVJbmRleF0ucnVuKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgICAgICBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgfVxuICAgIGN1cnJlbnRRdWV1ZSA9IG51bGw7XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBydW5DbGVhclRpbWVvdXQodGltZW91dCk7XG59XG5cbnByb2Nlc3MubmV4dFRpY2sgPSBmdW5jdGlvbiAoZnVuKSB7XG4gICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCAtIDEpO1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgYXJnc1tpIC0gMV0gPSBhcmd1bWVudHNbaV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcXVldWUucHVzaChuZXcgSXRlbShmdW4sIGFyZ3MpKTtcbiAgICBpZiAocXVldWUubGVuZ3RoID09PSAxICYmICFkcmFpbmluZykge1xuICAgICAgICBydW5UaW1lb3V0KGRyYWluUXVldWUpO1xuICAgIH1cbn07XG5cbi8vIHY4IGxpa2VzIHByZWRpY3RpYmxlIG9iamVjdHNcbmZ1bmN0aW9uIEl0ZW0oZnVuLCBhcnJheSkge1xuICAgIHRoaXMuZnVuID0gZnVuO1xuICAgIHRoaXMuYXJyYXkgPSBhcnJheTtcbn1cbkl0ZW0ucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmZ1bi5hcHBseShudWxsLCB0aGlzLmFycmF5KTtcbn07XG5wcm9jZXNzLnRpdGxlID0gJ2Jyb3dzZXInO1xucHJvY2Vzcy5icm93c2VyID0gdHJ1ZTtcbnByb2Nlc3MuZW52ID0ge307XG5wcm9jZXNzLmFyZ3YgPSBbXTtcbnByb2Nlc3MudmVyc2lvbiA9ICcnOyAvLyBlbXB0eSBzdHJpbmcgdG8gYXZvaWQgcmVnZXhwIGlzc3Vlc1xucHJvY2Vzcy52ZXJzaW9ucyA9IHt9O1xuXG5mdW5jdGlvbiBub29wKCkge31cblxucHJvY2Vzcy5vbiA9IG5vb3A7XG5wcm9jZXNzLmFkZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3Mub25jZSA9IG5vb3A7XG5wcm9jZXNzLm9mZiA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUxpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlQWxsTGlzdGVuZXJzID0gbm9vcDtcbnByb2Nlc3MuZW1pdCA9IG5vb3A7XG5cbnByb2Nlc3MuYmluZGluZyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmJpbmRpbmcgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcblxucHJvY2Vzcy5jd2QgPSBmdW5jdGlvbiAoKSB7IHJldHVybiAnLycgfTtcbnByb2Nlc3MuY2hkaXIgPSBmdW5jdGlvbiAoZGlyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmNoZGlyIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5wcm9jZXNzLnVtYXNrID0gZnVuY3Rpb24oKSB7IHJldHVybiAwOyB9O1xuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2xpYi9fc3RyZWFtX2R1cGxleC5qcycpO1xuIiwiLy8gYSBkdXBsZXggc3RyZWFtIGlzIGp1c3QgYSBzdHJlYW0gdGhhdCBpcyBib3RoIHJlYWRhYmxlIGFuZCB3cml0YWJsZS5cbi8vIFNpbmNlIEpTIGRvZXNuJ3QgaGF2ZSBtdWx0aXBsZSBwcm90b3R5cGFsIGluaGVyaXRhbmNlLCB0aGlzIGNsYXNzXG4vLyBwcm90b3R5cGFsbHkgaW5oZXJpdHMgZnJvbSBSZWFkYWJsZSwgYW5kIHRoZW4gcGFyYXNpdGljYWxseSBmcm9tXG4vLyBXcml0YWJsZS5cblxuJ3VzZSBzdHJpY3QnO1xuXG4vKjxyZXBsYWNlbWVudD4qL1xuXG52YXIgb2JqZWN0S2V5cyA9IE9iamVjdC5rZXlzIHx8IGZ1bmN0aW9uIChvYmopIHtcbiAgdmFyIGtleXMgPSBbXTtcbiAgZm9yICh2YXIga2V5IGluIG9iaikge1xuICAgIGtleXMucHVzaChrZXkpO1xuICB9cmV0dXJuIGtleXM7XG59O1xuLyo8L3JlcGxhY2VtZW50PiovXG5cbm1vZHVsZS5leHBvcnRzID0gRHVwbGV4O1xuXG4vKjxyZXBsYWNlbWVudD4qL1xudmFyIHByb2Nlc3NOZXh0VGljayA9IHJlcXVpcmUoJ3Byb2Nlc3MtbmV4dGljay1hcmdzJyk7XG4vKjwvcmVwbGFjZW1lbnQ+Ki9cblxuLyo8cmVwbGFjZW1lbnQ+Ki9cbnZhciB1dGlsID0gcmVxdWlyZSgnY29yZS11dGlsLWlzJyk7XG51dGlsLmluaGVyaXRzID0gcmVxdWlyZSgnaW5oZXJpdHMnKTtcbi8qPC9yZXBsYWNlbWVudD4qL1xuXG52YXIgUmVhZGFibGUgPSByZXF1aXJlKCcuL19zdHJlYW1fcmVhZGFibGUnKTtcbnZhciBXcml0YWJsZSA9IHJlcXVpcmUoJy4vX3N0cmVhbV93cml0YWJsZScpO1xuXG51dGlsLmluaGVyaXRzKER1cGxleCwgUmVhZGFibGUpO1xuXG52YXIga2V5cyA9IG9iamVjdEtleXMoV3JpdGFibGUucHJvdG90eXBlKTtcbmZvciAodmFyIHYgPSAwOyB2IDwga2V5cy5sZW5ndGg7IHYrKykge1xuICB2YXIgbWV0aG9kID0ga2V5c1t2XTtcbiAgaWYgKCFEdXBsZXgucHJvdG90eXBlW21ldGhvZF0pIER1cGxleC5wcm90b3R5cGVbbWV0aG9kXSA9IFdyaXRhYmxlLnByb3RvdHlwZVttZXRob2RdO1xufVxuXG5mdW5jdGlvbiBEdXBsZXgob3B0aW9ucykge1xuICBpZiAoISh0aGlzIGluc3RhbmNlb2YgRHVwbGV4KSkgcmV0dXJuIG5ldyBEdXBsZXgob3B0aW9ucyk7XG5cbiAgUmVhZGFibGUuY2FsbCh0aGlzLCBvcHRpb25zKTtcbiAgV3JpdGFibGUuY2FsbCh0aGlzLCBvcHRpb25zKTtcblxuICBpZiAob3B0aW9ucyAmJiBvcHRpb25zLnJlYWRhYmxlID09PSBmYWxzZSkgdGhpcy5yZWFkYWJsZSA9IGZhbHNlO1xuXG4gIGlmIChvcHRpb25zICYmIG9wdGlvbnMud3JpdGFibGUgPT09IGZhbHNlKSB0aGlzLndyaXRhYmxlID0gZmFsc2U7XG5cbiAgdGhpcy5hbGxvd0hhbGZPcGVuID0gdHJ1ZTtcbiAgaWYgKG9wdGlvbnMgJiYgb3B0aW9ucy5hbGxvd0hhbGZPcGVuID09PSBmYWxzZSkgdGhpcy5hbGxvd0hhbGZPcGVuID0gZmFsc2U7XG5cbiAgdGhpcy5vbmNlKCdlbmQnLCBvbmVuZCk7XG59XG5cbi8vIHRoZSBuby1oYWxmLW9wZW4gZW5mb3JjZXJcbmZ1bmN0aW9uIG9uZW5kKCkge1xuICAvLyBpZiB3ZSBhbGxvdyBoYWxmLW9wZW4gc3RhdGUsIG9yIGlmIHRoZSB3cml0YWJsZSBzaWRlIGVuZGVkLFxuICAvLyB0aGVuIHdlJ3JlIG9rLlxuICBpZiAodGhpcy5hbGxvd0hhbGZPcGVuIHx8IHRoaXMuX3dyaXRhYmxlU3RhdGUuZW5kZWQpIHJldHVybjtcblxuICAvLyBubyBtb3JlIGRhdGEgY2FuIGJlIHdyaXR0ZW4uXG4gIC8vIEJ1dCBhbGxvdyBtb3JlIHdyaXRlcyB0byBoYXBwZW4gaW4gdGhpcyB0aWNrLlxuICBwcm9jZXNzTmV4dFRpY2sob25FbmROVCwgdGhpcyk7XG59XG5cbmZ1bmN0aW9uIG9uRW5kTlQoc2VsZikge1xuICBzZWxmLmVuZCgpO1xufVxuXG5mdW5jdGlvbiBmb3JFYWNoKHhzLCBmKSB7XG4gIGZvciAodmFyIGkgPSAwLCBsID0geHMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgZih4c1tpXSwgaSk7XG4gIH1cbn0iLCIvLyBhIHBhc3N0aHJvdWdoIHN0cmVhbS5cbi8vIGJhc2ljYWxseSBqdXN0IHRoZSBtb3N0IG1pbmltYWwgc29ydCBvZiBUcmFuc2Zvcm0gc3RyZWFtLlxuLy8gRXZlcnkgd3JpdHRlbiBjaHVuayBnZXRzIG91dHB1dCBhcy1pcy5cblxuJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFBhc3NUaHJvdWdoO1xuXG52YXIgVHJhbnNmb3JtID0gcmVxdWlyZSgnLi9fc3RyZWFtX3RyYW5zZm9ybScpO1xuXG4vKjxyZXBsYWNlbWVudD4qL1xudmFyIHV0aWwgPSByZXF1aXJlKCdjb3JlLXV0aWwtaXMnKTtcbnV0aWwuaW5oZXJpdHMgPSByZXF1aXJlKCdpbmhlcml0cycpO1xuLyo8L3JlcGxhY2VtZW50PiovXG5cbnV0aWwuaW5oZXJpdHMoUGFzc1Rocm91Z2gsIFRyYW5zZm9ybSk7XG5cbmZ1bmN0aW9uIFBhc3NUaHJvdWdoKG9wdGlvbnMpIHtcbiAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIFBhc3NUaHJvdWdoKSkgcmV0dXJuIG5ldyBQYXNzVGhyb3VnaChvcHRpb25zKTtcblxuICBUcmFuc2Zvcm0uY2FsbCh0aGlzLCBvcHRpb25zKTtcbn1cblxuUGFzc1Rocm91Z2gucHJvdG90eXBlLl90cmFuc2Zvcm0gPSBmdW5jdGlvbiAoY2h1bmssIGVuY29kaW5nLCBjYikge1xuICBjYihudWxsLCBjaHVuayk7XG59OyIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBSZWFkYWJsZTtcblxuLyo8cmVwbGFjZW1lbnQ+Ki9cbnZhciBwcm9jZXNzTmV4dFRpY2sgPSByZXF1aXJlKCdwcm9jZXNzLW5leHRpY2stYXJncycpO1xuLyo8L3JlcGxhY2VtZW50PiovXG5cbi8qPHJlcGxhY2VtZW50PiovXG52YXIgaXNBcnJheSA9IHJlcXVpcmUoJ2lzYXJyYXknKTtcbi8qPC9yZXBsYWNlbWVudD4qL1xuXG4vKjxyZXBsYWNlbWVudD4qL1xudmFyIER1cGxleDtcbi8qPC9yZXBsYWNlbWVudD4qL1xuXG5SZWFkYWJsZS5SZWFkYWJsZVN0YXRlID0gUmVhZGFibGVTdGF0ZTtcblxuLyo8cmVwbGFjZW1lbnQ+Ki9cbnZhciBFRSA9IHJlcXVpcmUoJ2V2ZW50cycpLkV2ZW50RW1pdHRlcjtcblxudmFyIEVFbGlzdGVuZXJDb3VudCA9IGZ1bmN0aW9uIChlbWl0dGVyLCB0eXBlKSB7XG4gIHJldHVybiBlbWl0dGVyLmxpc3RlbmVycyh0eXBlKS5sZW5ndGg7XG59O1xuLyo8L3JlcGxhY2VtZW50PiovXG5cbi8qPHJlcGxhY2VtZW50PiovXG52YXIgU3RyZWFtID0gcmVxdWlyZSgnLi9pbnRlcm5hbC9zdHJlYW1zL3N0cmVhbScpO1xuLyo8L3JlcGxhY2VtZW50PiovXG5cbnZhciBCdWZmZXIgPSByZXF1aXJlKCdidWZmZXInKS5CdWZmZXI7XG4vKjxyZXBsYWNlbWVudD4qL1xudmFyIGJ1ZmZlclNoaW0gPSByZXF1aXJlKCdidWZmZXItc2hpbXMnKTtcbi8qPC9yZXBsYWNlbWVudD4qL1xuXG4vKjxyZXBsYWNlbWVudD4qL1xudmFyIHV0aWwgPSByZXF1aXJlKCdjb3JlLXV0aWwtaXMnKTtcbnV0aWwuaW5oZXJpdHMgPSByZXF1aXJlKCdpbmhlcml0cycpO1xuLyo8L3JlcGxhY2VtZW50PiovXG5cbi8qPHJlcGxhY2VtZW50PiovXG52YXIgZGVidWdVdGlsID0gcmVxdWlyZSgndXRpbCcpO1xudmFyIGRlYnVnID0gdm9pZCAwO1xuaWYgKGRlYnVnVXRpbCAmJiBkZWJ1Z1V0aWwuZGVidWdsb2cpIHtcbiAgZGVidWcgPSBkZWJ1Z1V0aWwuZGVidWdsb2coJ3N0cmVhbScpO1xufSBlbHNlIHtcbiAgZGVidWcgPSBmdW5jdGlvbiAoKSB7fTtcbn1cbi8qPC9yZXBsYWNlbWVudD4qL1xuXG52YXIgQnVmZmVyTGlzdCA9IHJlcXVpcmUoJy4vaW50ZXJuYWwvc3RyZWFtcy9CdWZmZXJMaXN0Jyk7XG52YXIgU3RyaW5nRGVjb2RlcjtcblxudXRpbC5pbmhlcml0cyhSZWFkYWJsZSwgU3RyZWFtKTtcblxudmFyIGtQcm94eUV2ZW50cyA9IFsnZXJyb3InLCAnY2xvc2UnLCAnZGVzdHJveScsICdwYXVzZScsICdyZXN1bWUnXTtcblxuZnVuY3Rpb24gcHJlcGVuZExpc3RlbmVyKGVtaXR0ZXIsIGV2ZW50LCBmbikge1xuICAvLyBTYWRseSB0aGlzIGlzIG5vdCBjYWNoZWFibGUgYXMgc29tZSBsaWJyYXJpZXMgYnVuZGxlIHRoZWlyIG93blxuICAvLyBldmVudCBlbWl0dGVyIGltcGxlbWVudGF0aW9uIHdpdGggdGhlbS5cbiAgaWYgKHR5cGVvZiBlbWl0dGVyLnByZXBlbmRMaXN0ZW5lciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybiBlbWl0dGVyLnByZXBlbmRMaXN0ZW5lcihldmVudCwgZm4pO1xuICB9IGVsc2Uge1xuICAgIC8vIFRoaXMgaXMgYSBoYWNrIHRvIG1ha2Ugc3VyZSB0aGF0IG91ciBlcnJvciBoYW5kbGVyIGlzIGF0dGFjaGVkIGJlZm9yZSBhbnlcbiAgICAvLyB1c2VybGFuZCBvbmVzLiAgTkVWRVIgRE8gVEhJUy4gVGhpcyBpcyBoZXJlIG9ubHkgYmVjYXVzZSB0aGlzIGNvZGUgbmVlZHNcbiAgICAvLyB0byBjb250aW51ZSB0byB3b3JrIHdpdGggb2xkZXIgdmVyc2lvbnMgb2YgTm9kZS5qcyB0aGF0IGRvIG5vdCBpbmNsdWRlXG4gICAgLy8gdGhlIHByZXBlbmRMaXN0ZW5lcigpIG1ldGhvZC4gVGhlIGdvYWwgaXMgdG8gZXZlbnR1YWxseSByZW1vdmUgdGhpcyBoYWNrLlxuICAgIGlmICghZW1pdHRlci5fZXZlbnRzIHx8ICFlbWl0dGVyLl9ldmVudHNbZXZlbnRdKSBlbWl0dGVyLm9uKGV2ZW50LCBmbik7ZWxzZSBpZiAoaXNBcnJheShlbWl0dGVyLl9ldmVudHNbZXZlbnRdKSkgZW1pdHRlci5fZXZlbnRzW2V2ZW50XS51bnNoaWZ0KGZuKTtlbHNlIGVtaXR0ZXIuX2V2ZW50c1tldmVudF0gPSBbZm4sIGVtaXR0ZXIuX2V2ZW50c1tldmVudF1dO1xuICB9XG59XG5cbmZ1bmN0aW9uIFJlYWRhYmxlU3RhdGUob3B0aW9ucywgc3RyZWFtKSB7XG4gIER1cGxleCA9IER1cGxleCB8fCByZXF1aXJlKCcuL19zdHJlYW1fZHVwbGV4Jyk7XG5cbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbiAgLy8gb2JqZWN0IHN0cmVhbSBmbGFnLiBVc2VkIHRvIG1ha2UgcmVhZChuKSBpZ25vcmUgbiBhbmQgdG9cbiAgLy8gbWFrZSBhbGwgdGhlIGJ1ZmZlciBtZXJnaW5nIGFuZCBsZW5ndGggY2hlY2tzIGdvIGF3YXlcbiAgdGhpcy5vYmplY3RNb2RlID0gISFvcHRpb25zLm9iamVjdE1vZGU7XG5cbiAgaWYgKHN0cmVhbSBpbnN0YW5jZW9mIER1cGxleCkgdGhpcy5vYmplY3RNb2RlID0gdGhpcy5vYmplY3RNb2RlIHx8ICEhb3B0aW9ucy5yZWFkYWJsZU9iamVjdE1vZGU7XG5cbiAgLy8gdGhlIHBvaW50IGF0IHdoaWNoIGl0IHN0b3BzIGNhbGxpbmcgX3JlYWQoKSB0byBmaWxsIHRoZSBidWZmZXJcbiAgLy8gTm90ZTogMCBpcyBhIHZhbGlkIHZhbHVlLCBtZWFucyBcImRvbid0IGNhbGwgX3JlYWQgcHJlZW1wdGl2ZWx5IGV2ZXJcIlxuICB2YXIgaHdtID0gb3B0aW9ucy5oaWdoV2F0ZXJNYXJrO1xuICB2YXIgZGVmYXVsdEh3bSA9IHRoaXMub2JqZWN0TW9kZSA/IDE2IDogMTYgKiAxMDI0O1xuICB0aGlzLmhpZ2hXYXRlck1hcmsgPSBod20gfHwgaHdtID09PSAwID8gaHdtIDogZGVmYXVsdEh3bTtcblxuICAvLyBjYXN0IHRvIGludHMuXG4gIHRoaXMuaGlnaFdhdGVyTWFyayA9IH5+dGhpcy5oaWdoV2F0ZXJNYXJrO1xuXG4gIC8vIEEgbGlua2VkIGxpc3QgaXMgdXNlZCB0byBzdG9yZSBkYXRhIGNodW5rcyBpbnN0ZWFkIG9mIGFuIGFycmF5IGJlY2F1c2UgdGhlXG4gIC8vIGxpbmtlZCBsaXN0IGNhbiByZW1vdmUgZWxlbWVudHMgZnJvbSB0aGUgYmVnaW5uaW5nIGZhc3RlciB0aGFuXG4gIC8vIGFycmF5LnNoaWZ0KClcbiAgdGhpcy5idWZmZXIgPSBuZXcgQnVmZmVyTGlzdCgpO1xuICB0aGlzLmxlbmd0aCA9IDA7XG4gIHRoaXMucGlwZXMgPSBudWxsO1xuICB0aGlzLnBpcGVzQ291bnQgPSAwO1xuICB0aGlzLmZsb3dpbmcgPSBudWxsO1xuICB0aGlzLmVuZGVkID0gZmFsc2U7XG4gIHRoaXMuZW5kRW1pdHRlZCA9IGZhbHNlO1xuICB0aGlzLnJlYWRpbmcgPSBmYWxzZTtcblxuICAvLyBhIGZsYWcgdG8gYmUgYWJsZSB0byB0ZWxsIGlmIHRoZSBvbndyaXRlIGNiIGlzIGNhbGxlZCBpbW1lZGlhdGVseSxcbiAgLy8gb3Igb24gYSBsYXRlciB0aWNrLiAgV2Ugc2V0IHRoaXMgdG8gdHJ1ZSBhdCBmaXJzdCwgYmVjYXVzZSBhbnlcbiAgLy8gYWN0aW9ucyB0aGF0IHNob3VsZG4ndCBoYXBwZW4gdW50aWwgXCJsYXRlclwiIHNob3VsZCBnZW5lcmFsbHkgYWxzb1xuICAvLyBub3QgaGFwcGVuIGJlZm9yZSB0aGUgZmlyc3Qgd3JpdGUgY2FsbC5cbiAgdGhpcy5zeW5jID0gdHJ1ZTtcblxuICAvLyB3aGVuZXZlciB3ZSByZXR1cm4gbnVsbCwgdGhlbiB3ZSBzZXQgYSBmbGFnIHRvIHNheVxuICAvLyB0aGF0IHdlJ3JlIGF3YWl0aW5nIGEgJ3JlYWRhYmxlJyBldmVudCBlbWlzc2lvbi5cbiAgdGhpcy5uZWVkUmVhZGFibGUgPSBmYWxzZTtcbiAgdGhpcy5lbWl0dGVkUmVhZGFibGUgPSBmYWxzZTtcbiAgdGhpcy5yZWFkYWJsZUxpc3RlbmluZyA9IGZhbHNlO1xuICB0aGlzLnJlc3VtZVNjaGVkdWxlZCA9IGZhbHNlO1xuXG4gIC8vIENyeXB0byBpcyBraW5kIG9mIG9sZCBhbmQgY3J1c3R5LiAgSGlzdG9yaWNhbGx5LCBpdHMgZGVmYXVsdCBzdHJpbmdcbiAgLy8gZW5jb2RpbmcgaXMgJ2JpbmFyeScgc28gd2UgaGF2ZSB0byBtYWtlIHRoaXMgY29uZmlndXJhYmxlLlxuICAvLyBFdmVyeXRoaW5nIGVsc2UgaW4gdGhlIHVuaXZlcnNlIHVzZXMgJ3V0ZjgnLCB0aG91Z2guXG4gIHRoaXMuZGVmYXVsdEVuY29kaW5nID0gb3B0aW9ucy5kZWZhdWx0RW5jb2RpbmcgfHwgJ3V0ZjgnO1xuXG4gIC8vIHdoZW4gcGlwaW5nLCB3ZSBvbmx5IGNhcmUgYWJvdXQgJ3JlYWRhYmxlJyBldmVudHMgdGhhdCBoYXBwZW5cbiAgLy8gYWZ0ZXIgcmVhZCgpaW5nIGFsbCB0aGUgYnl0ZXMgYW5kIG5vdCBnZXR0aW5nIGFueSBwdXNoYmFjay5cbiAgdGhpcy5yYW5PdXQgPSBmYWxzZTtcblxuICAvLyB0aGUgbnVtYmVyIG9mIHdyaXRlcnMgdGhhdCBhcmUgYXdhaXRpbmcgYSBkcmFpbiBldmVudCBpbiAucGlwZSgpc1xuICB0aGlzLmF3YWl0RHJhaW4gPSAwO1xuXG4gIC8vIGlmIHRydWUsIGEgbWF5YmVSZWFkTW9yZSBoYXMgYmVlbiBzY2hlZHVsZWRcbiAgdGhpcy5yZWFkaW5nTW9yZSA9IGZhbHNlO1xuXG4gIHRoaXMuZGVjb2RlciA9IG51bGw7XG4gIHRoaXMuZW5jb2RpbmcgPSBudWxsO1xuICBpZiAob3B0aW9ucy5lbmNvZGluZykge1xuICAgIGlmICghU3RyaW5nRGVjb2RlcikgU3RyaW5nRGVjb2RlciA9IHJlcXVpcmUoJ3N0cmluZ19kZWNvZGVyLycpLlN0cmluZ0RlY29kZXI7XG4gICAgdGhpcy5kZWNvZGVyID0gbmV3IFN0cmluZ0RlY29kZXIob3B0aW9ucy5lbmNvZGluZyk7XG4gICAgdGhpcy5lbmNvZGluZyA9IG9wdGlvbnMuZW5jb2Rpbmc7XG4gIH1cbn1cblxuZnVuY3Rpb24gUmVhZGFibGUob3B0aW9ucykge1xuICBEdXBsZXggPSBEdXBsZXggfHwgcmVxdWlyZSgnLi9fc3RyZWFtX2R1cGxleCcpO1xuXG4gIGlmICghKHRoaXMgaW5zdGFuY2VvZiBSZWFkYWJsZSkpIHJldHVybiBuZXcgUmVhZGFibGUob3B0aW9ucyk7XG5cbiAgdGhpcy5fcmVhZGFibGVTdGF0ZSA9IG5ldyBSZWFkYWJsZVN0YXRlKG9wdGlvbnMsIHRoaXMpO1xuXG4gIC8vIGxlZ2FjeVxuICB0aGlzLnJlYWRhYmxlID0gdHJ1ZTtcblxuICBpZiAob3B0aW9ucyAmJiB0eXBlb2Ygb3B0aW9ucy5yZWFkID09PSAnZnVuY3Rpb24nKSB0aGlzLl9yZWFkID0gb3B0aW9ucy5yZWFkO1xuXG4gIFN0cmVhbS5jYWxsKHRoaXMpO1xufVxuXG4vLyBNYW51YWxseSBzaG92ZSBzb21ldGhpbmcgaW50byB0aGUgcmVhZCgpIGJ1ZmZlci5cbi8vIFRoaXMgcmV0dXJucyB0cnVlIGlmIHRoZSBoaWdoV2F0ZXJNYXJrIGhhcyBub3QgYmVlbiBoaXQgeWV0LFxuLy8gc2ltaWxhciB0byBob3cgV3JpdGFibGUud3JpdGUoKSByZXR1cm5zIHRydWUgaWYgeW91IHNob3VsZFxuLy8gd3JpdGUoKSBzb21lIG1vcmUuXG5SZWFkYWJsZS5wcm90b3R5cGUucHVzaCA9IGZ1bmN0aW9uIChjaHVuaywgZW5jb2RpbmcpIHtcbiAgdmFyIHN0YXRlID0gdGhpcy5fcmVhZGFibGVTdGF0ZTtcblxuICBpZiAoIXN0YXRlLm9iamVjdE1vZGUgJiYgdHlwZW9mIGNodW5rID09PSAnc3RyaW5nJykge1xuICAgIGVuY29kaW5nID0gZW5jb2RpbmcgfHwgc3RhdGUuZGVmYXVsdEVuY29kaW5nO1xuICAgIGlmIChlbmNvZGluZyAhPT0gc3RhdGUuZW5jb2RpbmcpIHtcbiAgICAgIGNodW5rID0gYnVmZmVyU2hpbS5mcm9tKGNodW5rLCBlbmNvZGluZyk7XG4gICAgICBlbmNvZGluZyA9ICcnO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiByZWFkYWJsZUFkZENodW5rKHRoaXMsIHN0YXRlLCBjaHVuaywgZW5jb2RpbmcsIGZhbHNlKTtcbn07XG5cbi8vIFVuc2hpZnQgc2hvdWxkICphbHdheXMqIGJlIHNvbWV0aGluZyBkaXJlY3RseSBvdXQgb2YgcmVhZCgpXG5SZWFkYWJsZS5wcm90b3R5cGUudW5zaGlmdCA9IGZ1bmN0aW9uIChjaHVuaykge1xuICB2YXIgc3RhdGUgPSB0aGlzLl9yZWFkYWJsZVN0YXRlO1xuICByZXR1cm4gcmVhZGFibGVBZGRDaHVuayh0aGlzLCBzdGF0ZSwgY2h1bmssICcnLCB0cnVlKTtcbn07XG5cblJlYWRhYmxlLnByb3RvdHlwZS5pc1BhdXNlZCA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIHRoaXMuX3JlYWRhYmxlU3RhdGUuZmxvd2luZyA9PT0gZmFsc2U7XG59O1xuXG5mdW5jdGlvbiByZWFkYWJsZUFkZENodW5rKHN0cmVhbSwgc3RhdGUsIGNodW5rLCBlbmNvZGluZywgYWRkVG9Gcm9udCkge1xuICB2YXIgZXIgPSBjaHVua0ludmFsaWQoc3RhdGUsIGNodW5rKTtcbiAgaWYgKGVyKSB7XG4gICAgc3RyZWFtLmVtaXQoJ2Vycm9yJywgZXIpO1xuICB9IGVsc2UgaWYgKGNodW5rID09PSBudWxsKSB7XG4gICAgc3RhdGUucmVhZGluZyA9IGZhbHNlO1xuICAgIG9uRW9mQ2h1bmsoc3RyZWFtLCBzdGF0ZSk7XG4gIH0gZWxzZSBpZiAoc3RhdGUub2JqZWN0TW9kZSB8fCBjaHVuayAmJiBjaHVuay5sZW5ndGggPiAwKSB7XG4gICAgaWYgKHN0YXRlLmVuZGVkICYmICFhZGRUb0Zyb250KSB7XG4gICAgICB2YXIgZSA9IG5ldyBFcnJvcignc3RyZWFtLnB1c2goKSBhZnRlciBFT0YnKTtcbiAgICAgIHN0cmVhbS5lbWl0KCdlcnJvcicsIGUpO1xuICAgIH0gZWxzZSBpZiAoc3RhdGUuZW5kRW1pdHRlZCAmJiBhZGRUb0Zyb250KSB7XG4gICAgICB2YXIgX2UgPSBuZXcgRXJyb3IoJ3N0cmVhbS51bnNoaWZ0KCkgYWZ0ZXIgZW5kIGV2ZW50Jyk7XG4gICAgICBzdHJlYW0uZW1pdCgnZXJyb3InLCBfZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBza2lwQWRkO1xuICAgICAgaWYgKHN0YXRlLmRlY29kZXIgJiYgIWFkZFRvRnJvbnQgJiYgIWVuY29kaW5nKSB7XG4gICAgICAgIGNodW5rID0gc3RhdGUuZGVjb2Rlci53cml0ZShjaHVuayk7XG4gICAgICAgIHNraXBBZGQgPSAhc3RhdGUub2JqZWN0TW9kZSAmJiBjaHVuay5sZW5ndGggPT09IDA7XG4gICAgICB9XG5cbiAgICAgIGlmICghYWRkVG9Gcm9udCkgc3RhdGUucmVhZGluZyA9IGZhbHNlO1xuXG4gICAgICAvLyBEb24ndCBhZGQgdG8gdGhlIGJ1ZmZlciBpZiB3ZSd2ZSBkZWNvZGVkIHRvIGFuIGVtcHR5IHN0cmluZyBjaHVuayBhbmRcbiAgICAgIC8vIHdlJ3JlIG5vdCBpbiBvYmplY3QgbW9kZVxuICAgICAgaWYgKCFza2lwQWRkKSB7XG4gICAgICAgIC8vIGlmIHdlIHdhbnQgdGhlIGRhdGEgbm93LCBqdXN0IGVtaXQgaXQuXG4gICAgICAgIGlmIChzdGF0ZS5mbG93aW5nICYmIHN0YXRlLmxlbmd0aCA9PT0gMCAmJiAhc3RhdGUuc3luYykge1xuICAgICAgICAgIHN0cmVhbS5lbWl0KCdkYXRhJywgY2h1bmspO1xuICAgICAgICAgIHN0cmVhbS5yZWFkKDApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIHVwZGF0ZSB0aGUgYnVmZmVyIGluZm8uXG4gICAgICAgICAgc3RhdGUubGVuZ3RoICs9IHN0YXRlLm9iamVjdE1vZGUgPyAxIDogY2h1bmsubGVuZ3RoO1xuICAgICAgICAgIGlmIChhZGRUb0Zyb250KSBzdGF0ZS5idWZmZXIudW5zaGlmdChjaHVuayk7ZWxzZSBzdGF0ZS5idWZmZXIucHVzaChjaHVuayk7XG5cbiAgICAgICAgICBpZiAoc3RhdGUubmVlZFJlYWRhYmxlKSBlbWl0UmVhZGFibGUoc3RyZWFtKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBtYXliZVJlYWRNb3JlKHN0cmVhbSwgc3RhdGUpO1xuICAgIH1cbiAgfSBlbHNlIGlmICghYWRkVG9Gcm9udCkge1xuICAgIHN0YXRlLnJlYWRpbmcgPSBmYWxzZTtcbiAgfVxuXG4gIHJldHVybiBuZWVkTW9yZURhdGEoc3RhdGUpO1xufVxuXG4vLyBpZiBpdCdzIHBhc3QgdGhlIGhpZ2ggd2F0ZXIgbWFyaywgd2UgY2FuIHB1c2ggaW4gc29tZSBtb3JlLlxuLy8gQWxzbywgaWYgd2UgaGF2ZSBubyBkYXRhIHlldCwgd2UgY2FuIHN0YW5kIHNvbWVcbi8vIG1vcmUgYnl0ZXMuICBUaGlzIGlzIHRvIHdvcmsgYXJvdW5kIGNhc2VzIHdoZXJlIGh3bT0wLFxuLy8gc3VjaCBhcyB0aGUgcmVwbC4gIEFsc28sIGlmIHRoZSBwdXNoKCkgdHJpZ2dlcmVkIGFcbi8vIHJlYWRhYmxlIGV2ZW50LCBhbmQgdGhlIHVzZXIgY2FsbGVkIHJlYWQobGFyZ2VOdW1iZXIpIHN1Y2ggdGhhdFxuLy8gbmVlZFJlYWRhYmxlIHdhcyBzZXQsIHRoZW4gd2Ugb3VnaHQgdG8gcHVzaCBtb3JlLCBzbyB0aGF0IGFub3RoZXJcbi8vICdyZWFkYWJsZScgZXZlbnQgd2lsbCBiZSB0cmlnZ2VyZWQuXG5mdW5jdGlvbiBuZWVkTW9yZURhdGEoc3RhdGUpIHtcbiAgcmV0dXJuICFzdGF0ZS5lbmRlZCAmJiAoc3RhdGUubmVlZFJlYWRhYmxlIHx8IHN0YXRlLmxlbmd0aCA8IHN0YXRlLmhpZ2hXYXRlck1hcmsgfHwgc3RhdGUubGVuZ3RoID09PSAwKTtcbn1cblxuLy8gYmFja3dhcmRzIGNvbXBhdGliaWxpdHkuXG5SZWFkYWJsZS5wcm90b3R5cGUuc2V0RW5jb2RpbmcgPSBmdW5jdGlvbiAoZW5jKSB7XG4gIGlmICghU3RyaW5nRGVjb2RlcikgU3RyaW5nRGVjb2RlciA9IHJlcXVpcmUoJ3N0cmluZ19kZWNvZGVyLycpLlN0cmluZ0RlY29kZXI7XG4gIHRoaXMuX3JlYWRhYmxlU3RhdGUuZGVjb2RlciA9IG5ldyBTdHJpbmdEZWNvZGVyKGVuYyk7XG4gIHRoaXMuX3JlYWRhYmxlU3RhdGUuZW5jb2RpbmcgPSBlbmM7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLy8gRG9uJ3QgcmFpc2UgdGhlIGh3bSA+IDhNQlxudmFyIE1BWF9IV00gPSAweDgwMDAwMDtcbmZ1bmN0aW9uIGNvbXB1dGVOZXdIaWdoV2F0ZXJNYXJrKG4pIHtcbiAgaWYgKG4gPj0gTUFYX0hXTSkge1xuICAgIG4gPSBNQVhfSFdNO1xuICB9IGVsc2Uge1xuICAgIC8vIEdldCB0aGUgbmV4dCBoaWdoZXN0IHBvd2VyIG9mIDIgdG8gcHJldmVudCBpbmNyZWFzaW5nIGh3bSBleGNlc3NpdmVseSBpblxuICAgIC8vIHRpbnkgYW1vdW50c1xuICAgIG4tLTtcbiAgICBuIHw9IG4gPj4+IDE7XG4gICAgbiB8PSBuID4+PiAyO1xuICAgIG4gfD0gbiA+Pj4gNDtcbiAgICBuIHw9IG4gPj4+IDg7XG4gICAgbiB8PSBuID4+PiAxNjtcbiAgICBuKys7XG4gIH1cbiAgcmV0dXJuIG47XG59XG5cbi8vIFRoaXMgZnVuY3Rpb24gaXMgZGVzaWduZWQgdG8gYmUgaW5saW5hYmxlLCBzbyBwbGVhc2UgdGFrZSBjYXJlIHdoZW4gbWFraW5nXG4vLyBjaGFuZ2VzIHRvIHRoZSBmdW5jdGlvbiBib2R5LlxuZnVuY3Rpb24gaG93TXVjaFRvUmVhZChuLCBzdGF0ZSkge1xuICBpZiAobiA8PSAwIHx8IHN0YXRlLmxlbmd0aCA9PT0gMCAmJiBzdGF0ZS5lbmRlZCkgcmV0dXJuIDA7XG4gIGlmIChzdGF0ZS5vYmplY3RNb2RlKSByZXR1cm4gMTtcbiAgaWYgKG4gIT09IG4pIHtcbiAgICAvLyBPbmx5IGZsb3cgb25lIGJ1ZmZlciBhdCBhIHRpbWVcbiAgICBpZiAoc3RhdGUuZmxvd2luZyAmJiBzdGF0ZS5sZW5ndGgpIHJldHVybiBzdGF0ZS5idWZmZXIuaGVhZC5kYXRhLmxlbmd0aDtlbHNlIHJldHVybiBzdGF0ZS5sZW5ndGg7XG4gIH1cbiAgLy8gSWYgd2UncmUgYXNraW5nIGZvciBtb3JlIHRoYW4gdGhlIGN1cnJlbnQgaHdtLCB0aGVuIHJhaXNlIHRoZSBod20uXG4gIGlmIChuID4gc3RhdGUuaGlnaFdhdGVyTWFyaykgc3RhdGUuaGlnaFdhdGVyTWFyayA9IGNvbXB1dGVOZXdIaWdoV2F0ZXJNYXJrKG4pO1xuICBpZiAobiA8PSBzdGF0ZS5sZW5ndGgpIHJldHVybiBuO1xuICAvLyBEb24ndCBoYXZlIGVub3VnaFxuICBpZiAoIXN0YXRlLmVuZGVkKSB7XG4gICAgc3RhdGUubmVlZFJlYWRhYmxlID0gdHJ1ZTtcbiAgICByZXR1cm4gMDtcbiAgfVxuICByZXR1cm4gc3RhdGUubGVuZ3RoO1xufVxuXG4vLyB5b3UgY2FuIG92ZXJyaWRlIGVpdGhlciB0aGlzIG1ldGhvZCwgb3IgdGhlIGFzeW5jIF9yZWFkKG4pIGJlbG93LlxuUmVhZGFibGUucHJvdG90eXBlLnJlYWQgPSBmdW5jdGlvbiAobikge1xuICBkZWJ1ZygncmVhZCcsIG4pO1xuICBuID0gcGFyc2VJbnQobiwgMTApO1xuICB2YXIgc3RhdGUgPSB0aGlzLl9yZWFkYWJsZVN0YXRlO1xuICB2YXIgbk9yaWcgPSBuO1xuXG4gIGlmIChuICE9PSAwKSBzdGF0ZS5lbWl0dGVkUmVhZGFibGUgPSBmYWxzZTtcblxuICAvLyBpZiB3ZSdyZSBkb2luZyByZWFkKDApIHRvIHRyaWdnZXIgYSByZWFkYWJsZSBldmVudCwgYnV0IHdlXG4gIC8vIGFscmVhZHkgaGF2ZSBhIGJ1bmNoIG9mIGRhdGEgaW4gdGhlIGJ1ZmZlciwgdGhlbiBqdXN0IHRyaWdnZXJcbiAgLy8gdGhlICdyZWFkYWJsZScgZXZlbnQgYW5kIG1vdmUgb24uXG4gIGlmIChuID09PSAwICYmIHN0YXRlLm5lZWRSZWFkYWJsZSAmJiAoc3RhdGUubGVuZ3RoID49IHN0YXRlLmhpZ2hXYXRlck1hcmsgfHwgc3RhdGUuZW5kZWQpKSB7XG4gICAgZGVidWcoJ3JlYWQ6IGVtaXRSZWFkYWJsZScsIHN0YXRlLmxlbmd0aCwgc3RhdGUuZW5kZWQpO1xuICAgIGlmIChzdGF0ZS5sZW5ndGggPT09IDAgJiYgc3RhdGUuZW5kZWQpIGVuZFJlYWRhYmxlKHRoaXMpO2Vsc2UgZW1pdFJlYWRhYmxlKHRoaXMpO1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgbiA9IGhvd011Y2hUb1JlYWQobiwgc3RhdGUpO1xuXG4gIC8vIGlmIHdlJ3ZlIGVuZGVkLCBhbmQgd2UncmUgbm93IGNsZWFyLCB0aGVuIGZpbmlzaCBpdCB1cC5cbiAgaWYgKG4gPT09IDAgJiYgc3RhdGUuZW5kZWQpIHtcbiAgICBpZiAoc3RhdGUubGVuZ3RoID09PSAwKSBlbmRSZWFkYWJsZSh0aGlzKTtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIC8vIEFsbCB0aGUgYWN0dWFsIGNodW5rIGdlbmVyYXRpb24gbG9naWMgbmVlZHMgdG8gYmVcbiAgLy8gKmJlbG93KiB0aGUgY2FsbCB0byBfcmVhZC4gIFRoZSByZWFzb24gaXMgdGhhdCBpbiBjZXJ0YWluXG4gIC8vIHN5bnRoZXRpYyBzdHJlYW0gY2FzZXMsIHN1Y2ggYXMgcGFzc3Rocm91Z2ggc3RyZWFtcywgX3JlYWRcbiAgLy8gbWF5IGJlIGEgY29tcGxldGVseSBzeW5jaHJvbm91cyBvcGVyYXRpb24gd2hpY2ggbWF5IGNoYW5nZVxuICAvLyB0aGUgc3RhdGUgb2YgdGhlIHJlYWQgYnVmZmVyLCBwcm92aWRpbmcgZW5vdWdoIGRhdGEgd2hlblxuICAvLyBiZWZvcmUgdGhlcmUgd2FzICpub3QqIGVub3VnaC5cbiAgLy9cbiAgLy8gU28sIHRoZSBzdGVwcyBhcmU6XG4gIC8vIDEuIEZpZ3VyZSBvdXQgd2hhdCB0aGUgc3RhdGUgb2YgdGhpbmdzIHdpbGwgYmUgYWZ0ZXIgd2UgZG9cbiAgLy8gYSByZWFkIGZyb20gdGhlIGJ1ZmZlci5cbiAgLy9cbiAgLy8gMi4gSWYgdGhhdCByZXN1bHRpbmcgc3RhdGUgd2lsbCB0cmlnZ2VyIGEgX3JlYWQsIHRoZW4gY2FsbCBfcmVhZC5cbiAgLy8gTm90ZSB0aGF0IHRoaXMgbWF5IGJlIGFzeW5jaHJvbm91cywgb3Igc3luY2hyb25vdXMuICBZZXMsIGl0IGlzXG4gIC8vIGRlZXBseSB1Z2x5IHRvIHdyaXRlIEFQSXMgdGhpcyB3YXksIGJ1dCB0aGF0IHN0aWxsIGRvZXNuJ3QgbWVhblxuICAvLyB0aGF0IHRoZSBSZWFkYWJsZSBjbGFzcyBzaG91bGQgYmVoYXZlIGltcHJvcGVybHksIGFzIHN0cmVhbXMgYXJlXG4gIC8vIGRlc2lnbmVkIHRvIGJlIHN5bmMvYXN5bmMgYWdub3N0aWMuXG4gIC8vIFRha2Ugbm90ZSBpZiB0aGUgX3JlYWQgY2FsbCBpcyBzeW5jIG9yIGFzeW5jIChpZSwgaWYgdGhlIHJlYWQgY2FsbFxuICAvLyBoYXMgcmV0dXJuZWQgeWV0KSwgc28gdGhhdCB3ZSBrbm93IHdoZXRoZXIgb3Igbm90IGl0J3Mgc2FmZSB0byBlbWl0XG4gIC8vICdyZWFkYWJsZScgZXRjLlxuICAvL1xuICAvLyAzLiBBY3R1YWxseSBwdWxsIHRoZSByZXF1ZXN0ZWQgY2h1bmtzIG91dCBvZiB0aGUgYnVmZmVyIGFuZCByZXR1cm4uXG5cbiAgLy8gaWYgd2UgbmVlZCBhIHJlYWRhYmxlIGV2ZW50LCB0aGVuIHdlIG5lZWQgdG8gZG8gc29tZSByZWFkaW5nLlxuICB2YXIgZG9SZWFkID0gc3RhdGUubmVlZFJlYWRhYmxlO1xuICBkZWJ1ZygnbmVlZCByZWFkYWJsZScsIGRvUmVhZCk7XG5cbiAgLy8gaWYgd2UgY3VycmVudGx5IGhhdmUgbGVzcyB0aGFuIHRoZSBoaWdoV2F0ZXJNYXJrLCB0aGVuIGFsc28gcmVhZCBzb21lXG4gIGlmIChzdGF0ZS5sZW5ndGggPT09IDAgfHwgc3RhdGUubGVuZ3RoIC0gbiA8IHN0YXRlLmhpZ2hXYXRlck1hcmspIHtcbiAgICBkb1JlYWQgPSB0cnVlO1xuICAgIGRlYnVnKCdsZW5ndGggbGVzcyB0aGFuIHdhdGVybWFyaycsIGRvUmVhZCk7XG4gIH1cblxuICAvLyBob3dldmVyLCBpZiB3ZSd2ZSBlbmRlZCwgdGhlbiB0aGVyZSdzIG5vIHBvaW50LCBhbmQgaWYgd2UncmUgYWxyZWFkeVxuICAvLyByZWFkaW5nLCB0aGVuIGl0J3MgdW5uZWNlc3NhcnkuXG4gIGlmIChzdGF0ZS5lbmRlZCB8fCBzdGF0ZS5yZWFkaW5nKSB7XG4gICAgZG9SZWFkID0gZmFsc2U7XG4gICAgZGVidWcoJ3JlYWRpbmcgb3IgZW5kZWQnLCBkb1JlYWQpO1xuICB9IGVsc2UgaWYgKGRvUmVhZCkge1xuICAgIGRlYnVnKCdkbyByZWFkJyk7XG4gICAgc3RhdGUucmVhZGluZyA9IHRydWU7XG4gICAgc3RhdGUuc3luYyA9IHRydWU7XG4gICAgLy8gaWYgdGhlIGxlbmd0aCBpcyBjdXJyZW50bHkgemVybywgdGhlbiB3ZSAqbmVlZCogYSByZWFkYWJsZSBldmVudC5cbiAgICBpZiAoc3RhdGUubGVuZ3RoID09PSAwKSBzdGF0ZS5uZWVkUmVhZGFibGUgPSB0cnVlO1xuICAgIC8vIGNhbGwgaW50ZXJuYWwgcmVhZCBtZXRob2RcbiAgICB0aGlzLl9yZWFkKHN0YXRlLmhpZ2hXYXRlck1hcmspO1xuICAgIHN0YXRlLnN5bmMgPSBmYWxzZTtcbiAgICAvLyBJZiBfcmVhZCBwdXNoZWQgZGF0YSBzeW5jaHJvbm91c2x5LCB0aGVuIGByZWFkaW5nYCB3aWxsIGJlIGZhbHNlLFxuICAgIC8vIGFuZCB3ZSBuZWVkIHRvIHJlLWV2YWx1YXRlIGhvdyBtdWNoIGRhdGEgd2UgY2FuIHJldHVybiB0byB0aGUgdXNlci5cbiAgICBpZiAoIXN0YXRlLnJlYWRpbmcpIG4gPSBob3dNdWNoVG9SZWFkKG5PcmlnLCBzdGF0ZSk7XG4gIH1cblxuICB2YXIgcmV0O1xuICBpZiAobiA+IDApIHJldCA9IGZyb21MaXN0KG4sIHN0YXRlKTtlbHNlIHJldCA9IG51bGw7XG5cbiAgaWYgKHJldCA9PT0gbnVsbCkge1xuICAgIHN0YXRlLm5lZWRSZWFkYWJsZSA9IHRydWU7XG4gICAgbiA9IDA7XG4gIH0gZWxzZSB7XG4gICAgc3RhdGUubGVuZ3RoIC09IG47XG4gIH1cblxuICBpZiAoc3RhdGUubGVuZ3RoID09PSAwKSB7XG4gICAgLy8gSWYgd2UgaGF2ZSBub3RoaW5nIGluIHRoZSBidWZmZXIsIHRoZW4gd2Ugd2FudCB0byBrbm93XG4gICAgLy8gYXMgc29vbiBhcyB3ZSAqZG8qIGdldCBzb21ldGhpbmcgaW50byB0aGUgYnVmZmVyLlxuICAgIGlmICghc3RhdGUuZW5kZWQpIHN0YXRlLm5lZWRSZWFkYWJsZSA9IHRydWU7XG5cbiAgICAvLyBJZiB3ZSB0cmllZCB0byByZWFkKCkgcGFzdCB0aGUgRU9GLCB0aGVuIGVtaXQgZW5kIG9uIHRoZSBuZXh0IHRpY2suXG4gICAgaWYgKG5PcmlnICE9PSBuICYmIHN0YXRlLmVuZGVkKSBlbmRSZWFkYWJsZSh0aGlzKTtcbiAgfVxuXG4gIGlmIChyZXQgIT09IG51bGwpIHRoaXMuZW1pdCgnZGF0YScsIHJldCk7XG5cbiAgcmV0dXJuIHJldDtcbn07XG5cbmZ1bmN0aW9uIGNodW5rSW52YWxpZChzdGF0ZSwgY2h1bmspIHtcbiAgdmFyIGVyID0gbnVsbDtcbiAgaWYgKCFCdWZmZXIuaXNCdWZmZXIoY2h1bmspICYmIHR5cGVvZiBjaHVuayAhPT0gJ3N0cmluZycgJiYgY2h1bmsgIT09IG51bGwgJiYgY2h1bmsgIT09IHVuZGVmaW5lZCAmJiAhc3RhdGUub2JqZWN0TW9kZSkge1xuICAgIGVyID0gbmV3IFR5cGVFcnJvcignSW52YWxpZCBub24tc3RyaW5nL2J1ZmZlciBjaHVuaycpO1xuICB9XG4gIHJldHVybiBlcjtcbn1cblxuZnVuY3Rpb24gb25Fb2ZDaHVuayhzdHJlYW0sIHN0YXRlKSB7XG4gIGlmIChzdGF0ZS5lbmRlZCkgcmV0dXJuO1xuICBpZiAoc3RhdGUuZGVjb2Rlcikge1xuICAgIHZhciBjaHVuayA9IHN0YXRlLmRlY29kZXIuZW5kKCk7XG4gICAgaWYgKGNodW5rICYmIGNodW5rLmxlbmd0aCkge1xuICAgICAgc3RhdGUuYnVmZmVyLnB1c2goY2h1bmspO1xuICAgICAgc3RhdGUubGVuZ3RoICs9IHN0YXRlLm9iamVjdE1vZGUgPyAxIDogY2h1bmsubGVuZ3RoO1xuICAgIH1cbiAgfVxuICBzdGF0ZS5lbmRlZCA9IHRydWU7XG5cbiAgLy8gZW1pdCAncmVhZGFibGUnIG5vdyB0byBtYWtlIHN1cmUgaXQgZ2V0cyBwaWNrZWQgdXAuXG4gIGVtaXRSZWFkYWJsZShzdHJlYW0pO1xufVxuXG4vLyBEb24ndCBlbWl0IHJlYWRhYmxlIHJpZ2h0IGF3YXkgaW4gc3luYyBtb2RlLCBiZWNhdXNlIHRoaXMgY2FuIHRyaWdnZXJcbi8vIGFub3RoZXIgcmVhZCgpIGNhbGwgPT4gc3RhY2sgb3ZlcmZsb3cuICBUaGlzIHdheSwgaXQgbWlnaHQgdHJpZ2dlclxuLy8gYSBuZXh0VGljayByZWN1cnNpb24gd2FybmluZywgYnV0IHRoYXQncyBub3Qgc28gYmFkLlxuZnVuY3Rpb24gZW1pdFJlYWRhYmxlKHN0cmVhbSkge1xuICB2YXIgc3RhdGUgPSBzdHJlYW0uX3JlYWRhYmxlU3RhdGU7XG4gIHN0YXRlLm5lZWRSZWFkYWJsZSA9IGZhbHNlO1xuICBpZiAoIXN0YXRlLmVtaXR0ZWRSZWFkYWJsZSkge1xuICAgIGRlYnVnKCdlbWl0UmVhZGFibGUnLCBzdGF0ZS5mbG93aW5nKTtcbiAgICBzdGF0ZS5lbWl0dGVkUmVhZGFibGUgPSB0cnVlO1xuICAgIGlmIChzdGF0ZS5zeW5jKSBwcm9jZXNzTmV4dFRpY2soZW1pdFJlYWRhYmxlXywgc3RyZWFtKTtlbHNlIGVtaXRSZWFkYWJsZV8oc3RyZWFtKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBlbWl0UmVhZGFibGVfKHN0cmVhbSkge1xuICBkZWJ1ZygnZW1pdCByZWFkYWJsZScpO1xuICBzdHJlYW0uZW1pdCgncmVhZGFibGUnKTtcbiAgZmxvdyhzdHJlYW0pO1xufVxuXG4vLyBhdCB0aGlzIHBvaW50LCB0aGUgdXNlciBoYXMgcHJlc3VtYWJseSBzZWVuIHRoZSAncmVhZGFibGUnIGV2ZW50LFxuLy8gYW5kIGNhbGxlZCByZWFkKCkgdG8gY29uc3VtZSBzb21lIGRhdGEuICB0aGF0IG1heSBoYXZlIHRyaWdnZXJlZFxuLy8gaW4gdHVybiBhbm90aGVyIF9yZWFkKG4pIGNhbGwsIGluIHdoaWNoIGNhc2UgcmVhZGluZyA9IHRydWUgaWZcbi8vIGl0J3MgaW4gcHJvZ3Jlc3MuXG4vLyBIb3dldmVyLCBpZiB3ZSdyZSBub3QgZW5kZWQsIG9yIHJlYWRpbmcsIGFuZCB0aGUgbGVuZ3RoIDwgaHdtLFxuLy8gdGhlbiBnbyBhaGVhZCBhbmQgdHJ5IHRvIHJlYWQgc29tZSBtb3JlIHByZWVtcHRpdmVseS5cbmZ1bmN0aW9uIG1heWJlUmVhZE1vcmUoc3RyZWFtLCBzdGF0ZSkge1xuICBpZiAoIXN0YXRlLnJlYWRpbmdNb3JlKSB7XG4gICAgc3RhdGUucmVhZGluZ01vcmUgPSB0cnVlO1xuICAgIHByb2Nlc3NOZXh0VGljayhtYXliZVJlYWRNb3JlXywgc3RyZWFtLCBzdGF0ZSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gbWF5YmVSZWFkTW9yZV8oc3RyZWFtLCBzdGF0ZSkge1xuICB2YXIgbGVuID0gc3RhdGUubGVuZ3RoO1xuICB3aGlsZSAoIXN0YXRlLnJlYWRpbmcgJiYgIXN0YXRlLmZsb3dpbmcgJiYgIXN0YXRlLmVuZGVkICYmIHN0YXRlLmxlbmd0aCA8IHN0YXRlLmhpZ2hXYXRlck1hcmspIHtcbiAgICBkZWJ1ZygnbWF5YmVSZWFkTW9yZSByZWFkIDAnKTtcbiAgICBzdHJlYW0ucmVhZCgwKTtcbiAgICBpZiAobGVuID09PSBzdGF0ZS5sZW5ndGgpXG4gICAgICAvLyBkaWRuJ3QgZ2V0IGFueSBkYXRhLCBzdG9wIHNwaW5uaW5nLlxuICAgICAgYnJlYWs7ZWxzZSBsZW4gPSBzdGF0ZS5sZW5ndGg7XG4gIH1cbiAgc3RhdGUucmVhZGluZ01vcmUgPSBmYWxzZTtcbn1cblxuLy8gYWJzdHJhY3QgbWV0aG9kLiAgdG8gYmUgb3ZlcnJpZGRlbiBpbiBzcGVjaWZpYyBpbXBsZW1lbnRhdGlvbiBjbGFzc2VzLlxuLy8gY2FsbCBjYihlciwgZGF0YSkgd2hlcmUgZGF0YSBpcyA8PSBuIGluIGxlbmd0aC5cbi8vIGZvciB2aXJ0dWFsIChub24tc3RyaW5nLCBub24tYnVmZmVyKSBzdHJlYW1zLCBcImxlbmd0aFwiIGlzIHNvbWV3aGF0XG4vLyBhcmJpdHJhcnksIGFuZCBwZXJoYXBzIG5vdCB2ZXJ5IG1lYW5pbmdmdWwuXG5SZWFkYWJsZS5wcm90b3R5cGUuX3JlYWQgPSBmdW5jdGlvbiAobikge1xuICB0aGlzLmVtaXQoJ2Vycm9yJywgbmV3IEVycm9yKCdfcmVhZCgpIGlzIG5vdCBpbXBsZW1lbnRlZCcpKTtcbn07XG5cblJlYWRhYmxlLnByb3RvdHlwZS5waXBlID0gZnVuY3Rpb24gKGRlc3QsIHBpcGVPcHRzKSB7XG4gIHZhciBzcmMgPSB0aGlzO1xuICB2YXIgc3RhdGUgPSB0aGlzLl9yZWFkYWJsZVN0YXRlO1xuXG4gIHN3aXRjaCAoc3RhdGUucGlwZXNDb3VudCkge1xuICAgIGNhc2UgMDpcbiAgICAgIHN0YXRlLnBpcGVzID0gZGVzdDtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgMTpcbiAgICAgIHN0YXRlLnBpcGVzID0gW3N0YXRlLnBpcGVzLCBkZXN0XTtcbiAgICAgIGJyZWFrO1xuICAgIGRlZmF1bHQ6XG4gICAgICBzdGF0ZS5waXBlcy5wdXNoKGRlc3QpO1xuICAgICAgYnJlYWs7XG4gIH1cbiAgc3RhdGUucGlwZXNDb3VudCArPSAxO1xuICBkZWJ1ZygncGlwZSBjb3VudD0lZCBvcHRzPSVqJywgc3RhdGUucGlwZXNDb3VudCwgcGlwZU9wdHMpO1xuXG4gIHZhciBkb0VuZCA9ICghcGlwZU9wdHMgfHwgcGlwZU9wdHMuZW5kICE9PSBmYWxzZSkgJiYgZGVzdCAhPT0gcHJvY2Vzcy5zdGRvdXQgJiYgZGVzdCAhPT0gcHJvY2Vzcy5zdGRlcnI7XG5cbiAgdmFyIGVuZEZuID0gZG9FbmQgPyBvbmVuZCA6IGNsZWFudXA7XG4gIGlmIChzdGF0ZS5lbmRFbWl0dGVkKSBwcm9jZXNzTmV4dFRpY2soZW5kRm4pO2Vsc2Ugc3JjLm9uY2UoJ2VuZCcsIGVuZEZuKTtcblxuICBkZXN0Lm9uKCd1bnBpcGUnLCBvbnVucGlwZSk7XG4gIGZ1bmN0aW9uIG9udW5waXBlKHJlYWRhYmxlKSB7XG4gICAgZGVidWcoJ29udW5waXBlJyk7XG4gICAgaWYgKHJlYWRhYmxlID09PSBzcmMpIHtcbiAgICAgIGNsZWFudXAoKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBvbmVuZCgpIHtcbiAgICBkZWJ1Zygnb25lbmQnKTtcbiAgICBkZXN0LmVuZCgpO1xuICB9XG5cbiAgLy8gd2hlbiB0aGUgZGVzdCBkcmFpbnMsIGl0IHJlZHVjZXMgdGhlIGF3YWl0RHJhaW4gY291bnRlclxuICAvLyBvbiB0aGUgc291cmNlLiAgVGhpcyB3b3VsZCBiZSBtb3JlIGVsZWdhbnQgd2l0aCBhIC5vbmNlKClcbiAgLy8gaGFuZGxlciBpbiBmbG93KCksIGJ1dCBhZGRpbmcgYW5kIHJlbW92aW5nIHJlcGVhdGVkbHkgaXNcbiAgLy8gdG9vIHNsb3cuXG4gIHZhciBvbmRyYWluID0gcGlwZU9uRHJhaW4oc3JjKTtcbiAgZGVzdC5vbignZHJhaW4nLCBvbmRyYWluKTtcblxuICB2YXIgY2xlYW5lZFVwID0gZmFsc2U7XG4gIGZ1bmN0aW9uIGNsZWFudXAoKSB7XG4gICAgZGVidWcoJ2NsZWFudXAnKTtcbiAgICAvLyBjbGVhbnVwIGV2ZW50IGhhbmRsZXJzIG9uY2UgdGhlIHBpcGUgaXMgYnJva2VuXG4gICAgZGVzdC5yZW1vdmVMaXN0ZW5lcignY2xvc2UnLCBvbmNsb3NlKTtcbiAgICBkZXN0LnJlbW92ZUxpc3RlbmVyKCdmaW5pc2gnLCBvbmZpbmlzaCk7XG4gICAgZGVzdC5yZW1vdmVMaXN0ZW5lcignZHJhaW4nLCBvbmRyYWluKTtcbiAgICBkZXN0LnJlbW92ZUxpc3RlbmVyKCdlcnJvcicsIG9uZXJyb3IpO1xuICAgIGRlc3QucmVtb3ZlTGlzdGVuZXIoJ3VucGlwZScsIG9udW5waXBlKTtcbiAgICBzcmMucmVtb3ZlTGlzdGVuZXIoJ2VuZCcsIG9uZW5kKTtcbiAgICBzcmMucmVtb3ZlTGlzdGVuZXIoJ2VuZCcsIGNsZWFudXApO1xuICAgIHNyYy5yZW1vdmVMaXN0ZW5lcignZGF0YScsIG9uZGF0YSk7XG5cbiAgICBjbGVhbmVkVXAgPSB0cnVlO1xuXG4gICAgLy8gaWYgdGhlIHJlYWRlciBpcyB3YWl0aW5nIGZvciBhIGRyYWluIGV2ZW50IGZyb20gdGhpc1xuICAgIC8vIHNwZWNpZmljIHdyaXRlciwgdGhlbiBpdCB3b3VsZCBjYXVzZSBpdCB0byBuZXZlciBzdGFydFxuICAgIC8vIGZsb3dpbmcgYWdhaW4uXG4gICAgLy8gU28sIGlmIHRoaXMgaXMgYXdhaXRpbmcgYSBkcmFpbiwgdGhlbiB3ZSBqdXN0IGNhbGwgaXQgbm93LlxuICAgIC8vIElmIHdlIGRvbid0IGtub3csIHRoZW4gYXNzdW1lIHRoYXQgd2UgYXJlIHdhaXRpbmcgZm9yIG9uZS5cbiAgICBpZiAoc3RhdGUuYXdhaXREcmFpbiAmJiAoIWRlc3QuX3dyaXRhYmxlU3RhdGUgfHwgZGVzdC5fd3JpdGFibGVTdGF0ZS5uZWVkRHJhaW4pKSBvbmRyYWluKCk7XG4gIH1cblxuICAvLyBJZiB0aGUgdXNlciBwdXNoZXMgbW9yZSBkYXRhIHdoaWxlIHdlJ3JlIHdyaXRpbmcgdG8gZGVzdCB0aGVuIHdlJ2xsIGVuZCB1cFxuICAvLyBpbiBvbmRhdGEgYWdhaW4uIEhvd2V2ZXIsIHdlIG9ubHkgd2FudCB0byBpbmNyZWFzZSBhd2FpdERyYWluIG9uY2UgYmVjYXVzZVxuICAvLyBkZXN0IHdpbGwgb25seSBlbWl0IG9uZSAnZHJhaW4nIGV2ZW50IGZvciB0aGUgbXVsdGlwbGUgd3JpdGVzLlxuICAvLyA9PiBJbnRyb2R1Y2UgYSBndWFyZCBvbiBpbmNyZWFzaW5nIGF3YWl0RHJhaW4uXG4gIHZhciBpbmNyZWFzZWRBd2FpdERyYWluID0gZmFsc2U7XG4gIHNyYy5vbignZGF0YScsIG9uZGF0YSk7XG4gIGZ1bmN0aW9uIG9uZGF0YShjaHVuaykge1xuICAgIGRlYnVnKCdvbmRhdGEnKTtcbiAgICBpbmNyZWFzZWRBd2FpdERyYWluID0gZmFsc2U7XG4gICAgdmFyIHJldCA9IGRlc3Qud3JpdGUoY2h1bmspO1xuICAgIGlmIChmYWxzZSA9PT0gcmV0ICYmICFpbmNyZWFzZWRBd2FpdERyYWluKSB7XG4gICAgICAvLyBJZiB0aGUgdXNlciB1bnBpcGVkIGR1cmluZyBgZGVzdC53cml0ZSgpYCwgaXQgaXMgcG9zc2libGVcbiAgICAgIC8vIHRvIGdldCBzdHVjayBpbiBhIHBlcm1hbmVudGx5IHBhdXNlZCBzdGF0ZSBpZiB0aGF0IHdyaXRlXG4gICAgICAvLyBhbHNvIHJldHVybmVkIGZhbHNlLlxuICAgICAgLy8gPT4gQ2hlY2sgd2hldGhlciBgZGVzdGAgaXMgc3RpbGwgYSBwaXBpbmcgZGVzdGluYXRpb24uXG4gICAgICBpZiAoKHN0YXRlLnBpcGVzQ291bnQgPT09IDEgJiYgc3RhdGUucGlwZXMgPT09IGRlc3QgfHwgc3RhdGUucGlwZXNDb3VudCA+IDEgJiYgaW5kZXhPZihzdGF0ZS5waXBlcywgZGVzdCkgIT09IC0xKSAmJiAhY2xlYW5lZFVwKSB7XG4gICAgICAgIGRlYnVnKCdmYWxzZSB3cml0ZSByZXNwb25zZSwgcGF1c2UnLCBzcmMuX3JlYWRhYmxlU3RhdGUuYXdhaXREcmFpbik7XG4gICAgICAgIHNyYy5fcmVhZGFibGVTdGF0ZS5hd2FpdERyYWluKys7XG4gICAgICAgIGluY3JlYXNlZEF3YWl0RHJhaW4gPSB0cnVlO1xuICAgICAgfVxuICAgICAgc3JjLnBhdXNlKCk7XG4gICAgfVxuICB9XG5cbiAgLy8gaWYgdGhlIGRlc3QgaGFzIGFuIGVycm9yLCB0aGVuIHN0b3AgcGlwaW5nIGludG8gaXQuXG4gIC8vIGhvd2V2ZXIsIGRvbid0IHN1cHByZXNzIHRoZSB0aHJvd2luZyBiZWhhdmlvciBmb3IgdGhpcy5cbiAgZnVuY3Rpb24gb25lcnJvcihlcikge1xuICAgIGRlYnVnKCdvbmVycm9yJywgZXIpO1xuICAgIHVucGlwZSgpO1xuICAgIGRlc3QucmVtb3ZlTGlzdGVuZXIoJ2Vycm9yJywgb25lcnJvcik7XG4gICAgaWYgKEVFbGlzdGVuZXJDb3VudChkZXN0LCAnZXJyb3InKSA9PT0gMCkgZGVzdC5lbWl0KCdlcnJvcicsIGVyKTtcbiAgfVxuXG4gIC8vIE1ha2Ugc3VyZSBvdXIgZXJyb3IgaGFuZGxlciBpcyBhdHRhY2hlZCBiZWZvcmUgdXNlcmxhbmQgb25lcy5cbiAgcHJlcGVuZExpc3RlbmVyKGRlc3QsICdlcnJvcicsIG9uZXJyb3IpO1xuXG4gIC8vIEJvdGggY2xvc2UgYW5kIGZpbmlzaCBzaG91bGQgdHJpZ2dlciB1bnBpcGUsIGJ1dCBvbmx5IG9uY2UuXG4gIGZ1bmN0aW9uIG9uY2xvc2UoKSB7XG4gICAgZGVzdC5yZW1vdmVMaXN0ZW5lcignZmluaXNoJywgb25maW5pc2gpO1xuICAgIHVucGlwZSgpO1xuICB9XG4gIGRlc3Qub25jZSgnY2xvc2UnLCBvbmNsb3NlKTtcbiAgZnVuY3Rpb24gb25maW5pc2goKSB7XG4gICAgZGVidWcoJ29uZmluaXNoJyk7XG4gICAgZGVzdC5yZW1vdmVMaXN0ZW5lcignY2xvc2UnLCBvbmNsb3NlKTtcbiAgICB1bnBpcGUoKTtcbiAgfVxuICBkZXN0Lm9uY2UoJ2ZpbmlzaCcsIG9uZmluaXNoKTtcblxuICBmdW5jdGlvbiB1bnBpcGUoKSB7XG4gICAgZGVidWcoJ3VucGlwZScpO1xuICAgIHNyYy51bnBpcGUoZGVzdCk7XG4gIH1cblxuICAvLyB0ZWxsIHRoZSBkZXN0IHRoYXQgaXQncyBiZWluZyBwaXBlZCB0b1xuICBkZXN0LmVtaXQoJ3BpcGUnLCBzcmMpO1xuXG4gIC8vIHN0YXJ0IHRoZSBmbG93IGlmIGl0IGhhc24ndCBiZWVuIHN0YXJ0ZWQgYWxyZWFkeS5cbiAgaWYgKCFzdGF0ZS5mbG93aW5nKSB7XG4gICAgZGVidWcoJ3BpcGUgcmVzdW1lJyk7XG4gICAgc3JjLnJlc3VtZSgpO1xuICB9XG5cbiAgcmV0dXJuIGRlc3Q7XG59O1xuXG5mdW5jdGlvbiBwaXBlT25EcmFpbihzcmMpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgc3RhdGUgPSBzcmMuX3JlYWRhYmxlU3RhdGU7XG4gICAgZGVidWcoJ3BpcGVPbkRyYWluJywgc3RhdGUuYXdhaXREcmFpbik7XG4gICAgaWYgKHN0YXRlLmF3YWl0RHJhaW4pIHN0YXRlLmF3YWl0RHJhaW4tLTtcbiAgICBpZiAoc3RhdGUuYXdhaXREcmFpbiA9PT0gMCAmJiBFRWxpc3RlbmVyQ291bnQoc3JjLCAnZGF0YScpKSB7XG4gICAgICBzdGF0ZS5mbG93aW5nID0gdHJ1ZTtcbiAgICAgIGZsb3coc3JjKTtcbiAgICB9XG4gIH07XG59XG5cblJlYWRhYmxlLnByb3RvdHlwZS51bnBpcGUgPSBmdW5jdGlvbiAoZGVzdCkge1xuICB2YXIgc3RhdGUgPSB0aGlzLl9yZWFkYWJsZVN0YXRlO1xuXG4gIC8vIGlmIHdlJ3JlIG5vdCBwaXBpbmcgYW55d2hlcmUsIHRoZW4gZG8gbm90aGluZy5cbiAgaWYgKHN0YXRlLnBpcGVzQ291bnQgPT09IDApIHJldHVybiB0aGlzO1xuXG4gIC8vIGp1c3Qgb25lIGRlc3RpbmF0aW9uLiAgbW9zdCBjb21tb24gY2FzZS5cbiAgaWYgKHN0YXRlLnBpcGVzQ291bnQgPT09IDEpIHtcbiAgICAvLyBwYXNzZWQgaW4gb25lLCBidXQgaXQncyBub3QgdGhlIHJpZ2h0IG9uZS5cbiAgICBpZiAoZGVzdCAmJiBkZXN0ICE9PSBzdGF0ZS5waXBlcykgcmV0dXJuIHRoaXM7XG5cbiAgICBpZiAoIWRlc3QpIGRlc3QgPSBzdGF0ZS5waXBlcztcblxuICAgIC8vIGdvdCBhIG1hdGNoLlxuICAgIHN0YXRlLnBpcGVzID0gbnVsbDtcbiAgICBzdGF0ZS5waXBlc0NvdW50ID0gMDtcbiAgICBzdGF0ZS5mbG93aW5nID0gZmFsc2U7XG4gICAgaWYgKGRlc3QpIGRlc3QuZW1pdCgndW5waXBlJywgdGhpcyk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvLyBzbG93IGNhc2UuIG11bHRpcGxlIHBpcGUgZGVzdGluYXRpb25zLlxuXG4gIGlmICghZGVzdCkge1xuICAgIC8vIHJlbW92ZSBhbGwuXG4gICAgdmFyIGRlc3RzID0gc3RhdGUucGlwZXM7XG4gICAgdmFyIGxlbiA9IHN0YXRlLnBpcGVzQ291bnQ7XG4gICAgc3RhdGUucGlwZXMgPSBudWxsO1xuICAgIHN0YXRlLnBpcGVzQ291bnQgPSAwO1xuICAgIHN0YXRlLmZsb3dpbmcgPSBmYWxzZTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIGRlc3RzW2ldLmVtaXQoJ3VucGlwZScsIHRoaXMpO1xuICAgIH1yZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8vIHRyeSB0byBmaW5kIHRoZSByaWdodCBvbmUuXG4gIHZhciBpbmRleCA9IGluZGV4T2Yoc3RhdGUucGlwZXMsIGRlc3QpO1xuICBpZiAoaW5kZXggPT09IC0xKSByZXR1cm4gdGhpcztcblxuICBzdGF0ZS5waXBlcy5zcGxpY2UoaW5kZXgsIDEpO1xuICBzdGF0ZS5waXBlc0NvdW50IC09IDE7XG4gIGlmIChzdGF0ZS5waXBlc0NvdW50ID09PSAxKSBzdGF0ZS5waXBlcyA9IHN0YXRlLnBpcGVzWzBdO1xuXG4gIGRlc3QuZW1pdCgndW5waXBlJywgdGhpcyk7XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vLyBzZXQgdXAgZGF0YSBldmVudHMgaWYgdGhleSBhcmUgYXNrZWQgZm9yXG4vLyBFbnN1cmUgcmVhZGFibGUgbGlzdGVuZXJzIGV2ZW50dWFsbHkgZ2V0IHNvbWV0aGluZ1xuUmVhZGFibGUucHJvdG90eXBlLm9uID0gZnVuY3Rpb24gKGV2LCBmbikge1xuICB2YXIgcmVzID0gU3RyZWFtLnByb3RvdHlwZS5vbi5jYWxsKHRoaXMsIGV2LCBmbik7XG5cbiAgaWYgKGV2ID09PSAnZGF0YScpIHtcbiAgICAvLyBTdGFydCBmbG93aW5nIG9uIG5leHQgdGljayBpZiBzdHJlYW0gaXNuJ3QgZXhwbGljaXRseSBwYXVzZWRcbiAgICBpZiAodGhpcy5fcmVhZGFibGVTdGF0ZS5mbG93aW5nICE9PSBmYWxzZSkgdGhpcy5yZXN1bWUoKTtcbiAgfSBlbHNlIGlmIChldiA9PT0gJ3JlYWRhYmxlJykge1xuICAgIHZhciBzdGF0ZSA9IHRoaXMuX3JlYWRhYmxlU3RhdGU7XG4gICAgaWYgKCFzdGF0ZS5lbmRFbWl0dGVkICYmICFzdGF0ZS5yZWFkYWJsZUxpc3RlbmluZykge1xuICAgICAgc3RhdGUucmVhZGFibGVMaXN0ZW5pbmcgPSBzdGF0ZS5uZWVkUmVhZGFibGUgPSB0cnVlO1xuICAgICAgc3RhdGUuZW1pdHRlZFJlYWRhYmxlID0gZmFsc2U7XG4gICAgICBpZiAoIXN0YXRlLnJlYWRpbmcpIHtcbiAgICAgICAgcHJvY2Vzc05leHRUaWNrKG5SZWFkaW5nTmV4dFRpY2ssIHRoaXMpO1xuICAgICAgfSBlbHNlIGlmIChzdGF0ZS5sZW5ndGgpIHtcbiAgICAgICAgZW1pdFJlYWRhYmxlKHRoaXMsIHN0YXRlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmVzO1xufTtcblJlYWRhYmxlLnByb3RvdHlwZS5hZGRMaXN0ZW5lciA9IFJlYWRhYmxlLnByb3RvdHlwZS5vbjtcblxuZnVuY3Rpb24gblJlYWRpbmdOZXh0VGljayhzZWxmKSB7XG4gIGRlYnVnKCdyZWFkYWJsZSBuZXh0dGljayByZWFkIDAnKTtcbiAgc2VsZi5yZWFkKDApO1xufVxuXG4vLyBwYXVzZSgpIGFuZCByZXN1bWUoKSBhcmUgcmVtbmFudHMgb2YgdGhlIGxlZ2FjeSByZWFkYWJsZSBzdHJlYW0gQVBJXG4vLyBJZiB0aGUgdXNlciB1c2VzIHRoZW0sIHRoZW4gc3dpdGNoIGludG8gb2xkIG1vZGUuXG5SZWFkYWJsZS5wcm90b3R5cGUucmVzdW1lID0gZnVuY3Rpb24gKCkge1xuICB2YXIgc3RhdGUgPSB0aGlzLl9yZWFkYWJsZVN0YXRlO1xuICBpZiAoIXN0YXRlLmZsb3dpbmcpIHtcbiAgICBkZWJ1ZygncmVzdW1lJyk7XG4gICAgc3RhdGUuZmxvd2luZyA9IHRydWU7XG4gICAgcmVzdW1lKHRoaXMsIHN0YXRlKTtcbiAgfVxuICByZXR1cm4gdGhpcztcbn07XG5cbmZ1bmN0aW9uIHJlc3VtZShzdHJlYW0sIHN0YXRlKSB7XG4gIGlmICghc3RhdGUucmVzdW1lU2NoZWR1bGVkKSB7XG4gICAgc3RhdGUucmVzdW1lU2NoZWR1bGVkID0gdHJ1ZTtcbiAgICBwcm9jZXNzTmV4dFRpY2socmVzdW1lXywgc3RyZWFtLCBzdGF0ZSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gcmVzdW1lXyhzdHJlYW0sIHN0YXRlKSB7XG4gIGlmICghc3RhdGUucmVhZGluZykge1xuICAgIGRlYnVnKCdyZXN1bWUgcmVhZCAwJyk7XG4gICAgc3RyZWFtLnJlYWQoMCk7XG4gIH1cblxuICBzdGF0ZS5yZXN1bWVTY2hlZHVsZWQgPSBmYWxzZTtcbiAgc3RhdGUuYXdhaXREcmFpbiA9IDA7XG4gIHN0cmVhbS5lbWl0KCdyZXN1bWUnKTtcbiAgZmxvdyhzdHJlYW0pO1xuICBpZiAoc3RhdGUuZmxvd2luZyAmJiAhc3RhdGUucmVhZGluZykgc3RyZWFtLnJlYWQoMCk7XG59XG5cblJlYWRhYmxlLnByb3RvdHlwZS5wYXVzZSA9IGZ1bmN0aW9uICgpIHtcbiAgZGVidWcoJ2NhbGwgcGF1c2UgZmxvd2luZz0laicsIHRoaXMuX3JlYWRhYmxlU3RhdGUuZmxvd2luZyk7XG4gIGlmIChmYWxzZSAhPT0gdGhpcy5fcmVhZGFibGVTdGF0ZS5mbG93aW5nKSB7XG4gICAgZGVidWcoJ3BhdXNlJyk7XG4gICAgdGhpcy5fcmVhZGFibGVTdGF0ZS5mbG93aW5nID0gZmFsc2U7XG4gICAgdGhpcy5lbWl0KCdwYXVzZScpO1xuICB9XG4gIHJldHVybiB0aGlzO1xufTtcblxuZnVuY3Rpb24gZmxvdyhzdHJlYW0pIHtcbiAgdmFyIHN0YXRlID0gc3RyZWFtLl9yZWFkYWJsZVN0YXRlO1xuICBkZWJ1ZygnZmxvdycsIHN0YXRlLmZsb3dpbmcpO1xuICB3aGlsZSAoc3RhdGUuZmxvd2luZyAmJiBzdHJlYW0ucmVhZCgpICE9PSBudWxsKSB7fVxufVxuXG4vLyB3cmFwIGFuIG9sZC1zdHlsZSBzdHJlYW0gYXMgdGhlIGFzeW5jIGRhdGEgc291cmNlLlxuLy8gVGhpcyBpcyAqbm90KiBwYXJ0IG9mIHRoZSByZWFkYWJsZSBzdHJlYW0gaW50ZXJmYWNlLlxuLy8gSXQgaXMgYW4gdWdseSB1bmZvcnR1bmF0ZSBtZXNzIG9mIGhpc3RvcnkuXG5SZWFkYWJsZS5wcm90b3R5cGUud3JhcCA9IGZ1bmN0aW9uIChzdHJlYW0pIHtcbiAgdmFyIHN0YXRlID0gdGhpcy5fcmVhZGFibGVTdGF0ZTtcbiAgdmFyIHBhdXNlZCA9IGZhbHNlO1xuXG4gIHZhciBzZWxmID0gdGhpcztcbiAgc3RyZWFtLm9uKCdlbmQnLCBmdW5jdGlvbiAoKSB7XG4gICAgZGVidWcoJ3dyYXBwZWQgZW5kJyk7XG4gICAgaWYgKHN0YXRlLmRlY29kZXIgJiYgIXN0YXRlLmVuZGVkKSB7XG4gICAgICB2YXIgY2h1bmsgPSBzdGF0ZS5kZWNvZGVyLmVuZCgpO1xuICAgICAgaWYgKGNodW5rICYmIGNodW5rLmxlbmd0aCkgc2VsZi5wdXNoKGNodW5rKTtcbiAgICB9XG5cbiAgICBzZWxmLnB1c2gobnVsbCk7XG4gIH0pO1xuXG4gIHN0cmVhbS5vbignZGF0YScsIGZ1bmN0aW9uIChjaHVuaykge1xuICAgIGRlYnVnKCd3cmFwcGVkIGRhdGEnKTtcbiAgICBpZiAoc3RhdGUuZGVjb2RlcikgY2h1bmsgPSBzdGF0ZS5kZWNvZGVyLndyaXRlKGNodW5rKTtcblxuICAgIC8vIGRvbid0IHNraXAgb3ZlciBmYWxzeSB2YWx1ZXMgaW4gb2JqZWN0TW9kZVxuICAgIGlmIChzdGF0ZS5vYmplY3RNb2RlICYmIChjaHVuayA9PT0gbnVsbCB8fCBjaHVuayA9PT0gdW5kZWZpbmVkKSkgcmV0dXJuO2Vsc2UgaWYgKCFzdGF0ZS5vYmplY3RNb2RlICYmICghY2h1bmsgfHwgIWNodW5rLmxlbmd0aCkpIHJldHVybjtcblxuICAgIHZhciByZXQgPSBzZWxmLnB1c2goY2h1bmspO1xuICAgIGlmICghcmV0KSB7XG4gICAgICBwYXVzZWQgPSB0cnVlO1xuICAgICAgc3RyZWFtLnBhdXNlKCk7XG4gICAgfVxuICB9KTtcblxuICAvLyBwcm94eSBhbGwgdGhlIG90aGVyIG1ldGhvZHMuXG4gIC8vIGltcG9ydGFudCB3aGVuIHdyYXBwaW5nIGZpbHRlcnMgYW5kIGR1cGxleGVzLlxuICBmb3IgKHZhciBpIGluIHN0cmVhbSkge1xuICAgIGlmICh0aGlzW2ldID09PSB1bmRlZmluZWQgJiYgdHlwZW9mIHN0cmVhbVtpXSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdGhpc1tpXSA9IGZ1bmN0aW9uIChtZXRob2QpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICByZXR1cm4gc3RyZWFtW21ldGhvZF0uYXBwbHkoc3RyZWFtLCBhcmd1bWVudHMpO1xuICAgICAgICB9O1xuICAgICAgfShpKTtcbiAgICB9XG4gIH1cblxuICAvLyBwcm94eSBjZXJ0YWluIGltcG9ydGFudCBldmVudHMuXG4gIGZvciAodmFyIG4gPSAwOyBuIDwga1Byb3h5RXZlbnRzLmxlbmd0aDsgbisrKSB7XG4gICAgc3RyZWFtLm9uKGtQcm94eUV2ZW50c1tuXSwgc2VsZi5lbWl0LmJpbmQoc2VsZiwga1Byb3h5RXZlbnRzW25dKSk7XG4gIH1cblxuICAvLyB3aGVuIHdlIHRyeSB0byBjb25zdW1lIHNvbWUgbW9yZSBieXRlcywgc2ltcGx5IHVucGF1c2UgdGhlXG4gIC8vIHVuZGVybHlpbmcgc3RyZWFtLlxuICBzZWxmLl9yZWFkID0gZnVuY3Rpb24gKG4pIHtcbiAgICBkZWJ1Zygnd3JhcHBlZCBfcmVhZCcsIG4pO1xuICAgIGlmIChwYXVzZWQpIHtcbiAgICAgIHBhdXNlZCA9IGZhbHNlO1xuICAgICAgc3RyZWFtLnJlc3VtZSgpO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gc2VsZjtcbn07XG5cbi8vIGV4cG9zZWQgZm9yIHRlc3RpbmcgcHVycG9zZXMgb25seS5cblJlYWRhYmxlLl9mcm9tTGlzdCA9IGZyb21MaXN0O1xuXG4vLyBQbHVjayBvZmYgbiBieXRlcyBmcm9tIGFuIGFycmF5IG9mIGJ1ZmZlcnMuXG4vLyBMZW5ndGggaXMgdGhlIGNvbWJpbmVkIGxlbmd0aHMgb2YgYWxsIHRoZSBidWZmZXJzIGluIHRoZSBsaXN0LlxuLy8gVGhpcyBmdW5jdGlvbiBpcyBkZXNpZ25lZCB0byBiZSBpbmxpbmFibGUsIHNvIHBsZWFzZSB0YWtlIGNhcmUgd2hlbiBtYWtpbmdcbi8vIGNoYW5nZXMgdG8gdGhlIGZ1bmN0aW9uIGJvZHkuXG5mdW5jdGlvbiBmcm9tTGlzdChuLCBzdGF0ZSkge1xuICAvLyBub3RoaW5nIGJ1ZmZlcmVkXG4gIGlmIChzdGF0ZS5sZW5ndGggPT09IDApIHJldHVybiBudWxsO1xuXG4gIHZhciByZXQ7XG4gIGlmIChzdGF0ZS5vYmplY3RNb2RlKSByZXQgPSBzdGF0ZS5idWZmZXIuc2hpZnQoKTtlbHNlIGlmICghbiB8fCBuID49IHN0YXRlLmxlbmd0aCkge1xuICAgIC8vIHJlYWQgaXQgYWxsLCB0cnVuY2F0ZSB0aGUgbGlzdFxuICAgIGlmIChzdGF0ZS5kZWNvZGVyKSByZXQgPSBzdGF0ZS5idWZmZXIuam9pbignJyk7ZWxzZSBpZiAoc3RhdGUuYnVmZmVyLmxlbmd0aCA9PT0gMSkgcmV0ID0gc3RhdGUuYnVmZmVyLmhlYWQuZGF0YTtlbHNlIHJldCA9IHN0YXRlLmJ1ZmZlci5jb25jYXQoc3RhdGUubGVuZ3RoKTtcbiAgICBzdGF0ZS5idWZmZXIuY2xlYXIoKTtcbiAgfSBlbHNlIHtcbiAgICAvLyByZWFkIHBhcnQgb2YgbGlzdFxuICAgIHJldCA9IGZyb21MaXN0UGFydGlhbChuLCBzdGF0ZS5idWZmZXIsIHN0YXRlLmRlY29kZXIpO1xuICB9XG5cbiAgcmV0dXJuIHJldDtcbn1cblxuLy8gRXh0cmFjdHMgb25seSBlbm91Z2ggYnVmZmVyZWQgZGF0YSB0byBzYXRpc2Z5IHRoZSBhbW91bnQgcmVxdWVzdGVkLlxuLy8gVGhpcyBmdW5jdGlvbiBpcyBkZXNpZ25lZCB0byBiZSBpbmxpbmFibGUsIHNvIHBsZWFzZSB0YWtlIGNhcmUgd2hlbiBtYWtpbmdcbi8vIGNoYW5nZXMgdG8gdGhlIGZ1bmN0aW9uIGJvZHkuXG5mdW5jdGlvbiBmcm9tTGlzdFBhcnRpYWwobiwgbGlzdCwgaGFzU3RyaW5ncykge1xuICB2YXIgcmV0O1xuICBpZiAobiA8IGxpc3QuaGVhZC5kYXRhLmxlbmd0aCkge1xuICAgIC8vIHNsaWNlIGlzIHRoZSBzYW1lIGZvciBidWZmZXJzIGFuZCBzdHJpbmdzXG4gICAgcmV0ID0gbGlzdC5oZWFkLmRhdGEuc2xpY2UoMCwgbik7XG4gICAgbGlzdC5oZWFkLmRhdGEgPSBsaXN0LmhlYWQuZGF0YS5zbGljZShuKTtcbiAgfSBlbHNlIGlmIChuID09PSBsaXN0LmhlYWQuZGF0YS5sZW5ndGgpIHtcbiAgICAvLyBmaXJzdCBjaHVuayBpcyBhIHBlcmZlY3QgbWF0Y2hcbiAgICByZXQgPSBsaXN0LnNoaWZ0KCk7XG4gIH0gZWxzZSB7XG4gICAgLy8gcmVzdWx0IHNwYW5zIG1vcmUgdGhhbiBvbmUgYnVmZmVyXG4gICAgcmV0ID0gaGFzU3RyaW5ncyA/IGNvcHlGcm9tQnVmZmVyU3RyaW5nKG4sIGxpc3QpIDogY29weUZyb21CdWZmZXIobiwgbGlzdCk7XG4gIH1cbiAgcmV0dXJuIHJldDtcbn1cblxuLy8gQ29waWVzIGEgc3BlY2lmaWVkIGFtb3VudCBvZiBjaGFyYWN0ZXJzIGZyb20gdGhlIGxpc3Qgb2YgYnVmZmVyZWQgZGF0YVxuLy8gY2h1bmtzLlxuLy8gVGhpcyBmdW5jdGlvbiBpcyBkZXNpZ25lZCB0byBiZSBpbmxpbmFibGUsIHNvIHBsZWFzZSB0YWtlIGNhcmUgd2hlbiBtYWtpbmdcbi8vIGNoYW5nZXMgdG8gdGhlIGZ1bmN0aW9uIGJvZHkuXG5mdW5jdGlvbiBjb3B5RnJvbUJ1ZmZlclN0cmluZyhuLCBsaXN0KSB7XG4gIHZhciBwID0gbGlzdC5oZWFkO1xuICB2YXIgYyA9IDE7XG4gIHZhciByZXQgPSBwLmRhdGE7XG4gIG4gLT0gcmV0Lmxlbmd0aDtcbiAgd2hpbGUgKHAgPSBwLm5leHQpIHtcbiAgICB2YXIgc3RyID0gcC5kYXRhO1xuICAgIHZhciBuYiA9IG4gPiBzdHIubGVuZ3RoID8gc3RyLmxlbmd0aCA6IG47XG4gICAgaWYgKG5iID09PSBzdHIubGVuZ3RoKSByZXQgKz0gc3RyO2Vsc2UgcmV0ICs9IHN0ci5zbGljZSgwLCBuKTtcbiAgICBuIC09IG5iO1xuICAgIGlmIChuID09PSAwKSB7XG4gICAgICBpZiAobmIgPT09IHN0ci5sZW5ndGgpIHtcbiAgICAgICAgKytjO1xuICAgICAgICBpZiAocC5uZXh0KSBsaXN0LmhlYWQgPSBwLm5leHQ7ZWxzZSBsaXN0LmhlYWQgPSBsaXN0LnRhaWwgPSBudWxsO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbGlzdC5oZWFkID0gcDtcbiAgICAgICAgcC5kYXRhID0gc3RyLnNsaWNlKG5iKTtcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgICArK2M7XG4gIH1cbiAgbGlzdC5sZW5ndGggLT0gYztcbiAgcmV0dXJuIHJldDtcbn1cblxuLy8gQ29waWVzIGEgc3BlY2lmaWVkIGFtb3VudCBvZiBieXRlcyBmcm9tIHRoZSBsaXN0IG9mIGJ1ZmZlcmVkIGRhdGEgY2h1bmtzLlxuLy8gVGhpcyBmdW5jdGlvbiBpcyBkZXNpZ25lZCB0byBiZSBpbmxpbmFibGUsIHNvIHBsZWFzZSB0YWtlIGNhcmUgd2hlbiBtYWtpbmdcbi8vIGNoYW5nZXMgdG8gdGhlIGZ1bmN0aW9uIGJvZHkuXG5mdW5jdGlvbiBjb3B5RnJvbUJ1ZmZlcihuLCBsaXN0KSB7XG4gIHZhciByZXQgPSBidWZmZXJTaGltLmFsbG9jVW5zYWZlKG4pO1xuICB2YXIgcCA9IGxpc3QuaGVhZDtcbiAgdmFyIGMgPSAxO1xuICBwLmRhdGEuY29weShyZXQpO1xuICBuIC09IHAuZGF0YS5sZW5ndGg7XG4gIHdoaWxlIChwID0gcC5uZXh0KSB7XG4gICAgdmFyIGJ1ZiA9IHAuZGF0YTtcbiAgICB2YXIgbmIgPSBuID4gYnVmLmxlbmd0aCA/IGJ1Zi5sZW5ndGggOiBuO1xuICAgIGJ1Zi5jb3B5KHJldCwgcmV0Lmxlbmd0aCAtIG4sIDAsIG5iKTtcbiAgICBuIC09IG5iO1xuICAgIGlmIChuID09PSAwKSB7XG4gICAgICBpZiAobmIgPT09IGJ1Zi5sZW5ndGgpIHtcbiAgICAgICAgKytjO1xuICAgICAgICBpZiAocC5uZXh0KSBsaXN0LmhlYWQgPSBwLm5leHQ7ZWxzZSBsaXN0LmhlYWQgPSBsaXN0LnRhaWwgPSBudWxsO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbGlzdC5oZWFkID0gcDtcbiAgICAgICAgcC5kYXRhID0gYnVmLnNsaWNlKG5iKTtcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgICArK2M7XG4gIH1cbiAgbGlzdC5sZW5ndGggLT0gYztcbiAgcmV0dXJuIHJldDtcbn1cblxuZnVuY3Rpb24gZW5kUmVhZGFibGUoc3RyZWFtKSB7XG4gIHZhciBzdGF0ZSA9IHN0cmVhbS5fcmVhZGFibGVTdGF0ZTtcblxuICAvLyBJZiB3ZSBnZXQgaGVyZSBiZWZvcmUgY29uc3VtaW5nIGFsbCB0aGUgYnl0ZXMsIHRoZW4gdGhhdCBpcyBhXG4gIC8vIGJ1ZyBpbiBub2RlLiAgU2hvdWxkIG5ldmVyIGhhcHBlbi5cbiAgaWYgKHN0YXRlLmxlbmd0aCA+IDApIHRocm93IG5ldyBFcnJvcignXCJlbmRSZWFkYWJsZSgpXCIgY2FsbGVkIG9uIG5vbi1lbXB0eSBzdHJlYW0nKTtcblxuICBpZiAoIXN0YXRlLmVuZEVtaXR0ZWQpIHtcbiAgICBzdGF0ZS5lbmRlZCA9IHRydWU7XG4gICAgcHJvY2Vzc05leHRUaWNrKGVuZFJlYWRhYmxlTlQsIHN0YXRlLCBzdHJlYW0pO1xuICB9XG59XG5cbmZ1bmN0aW9uIGVuZFJlYWRhYmxlTlQoc3RhdGUsIHN0cmVhbSkge1xuICAvLyBDaGVjayB0aGF0IHdlIGRpZG4ndCBnZXQgb25lIGxhc3QgdW5zaGlmdC5cbiAgaWYgKCFzdGF0ZS5lbmRFbWl0dGVkICYmIHN0YXRlLmxlbmd0aCA9PT0gMCkge1xuICAgIHN0YXRlLmVuZEVtaXR0ZWQgPSB0cnVlO1xuICAgIHN0cmVhbS5yZWFkYWJsZSA9IGZhbHNlO1xuICAgIHN0cmVhbS5lbWl0KCdlbmQnKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBmb3JFYWNoKHhzLCBmKSB7XG4gIGZvciAodmFyIGkgPSAwLCBsID0geHMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgZih4c1tpXSwgaSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gaW5kZXhPZih4cywgeCkge1xuICBmb3IgKHZhciBpID0gMCwgbCA9IHhzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgIGlmICh4c1tpXSA9PT0geCkgcmV0dXJuIGk7XG4gIH1cbiAgcmV0dXJuIC0xO1xufSIsIi8vIGEgdHJhbnNmb3JtIHN0cmVhbSBpcyBhIHJlYWRhYmxlL3dyaXRhYmxlIHN0cmVhbSB3aGVyZSB5b3UgZG9cbi8vIHNvbWV0aGluZyB3aXRoIHRoZSBkYXRhLiAgU29tZXRpbWVzIGl0J3MgY2FsbGVkIGEgXCJmaWx0ZXJcIixcbi8vIGJ1dCB0aGF0J3Mgbm90IGEgZ3JlYXQgbmFtZSBmb3IgaXQsIHNpbmNlIHRoYXQgaW1wbGllcyBhIHRoaW5nIHdoZXJlXG4vLyBzb21lIGJpdHMgcGFzcyB0aHJvdWdoLCBhbmQgb3RoZXJzIGFyZSBzaW1wbHkgaWdub3JlZC4gIChUaGF0IHdvdWxkXG4vLyBiZSBhIHZhbGlkIGV4YW1wbGUgb2YgYSB0cmFuc2Zvcm0sIG9mIGNvdXJzZS4pXG4vL1xuLy8gV2hpbGUgdGhlIG91dHB1dCBpcyBjYXVzYWxseSByZWxhdGVkIHRvIHRoZSBpbnB1dCwgaXQncyBub3QgYVxuLy8gbmVjZXNzYXJpbHkgc3ltbWV0cmljIG9yIHN5bmNocm9ub3VzIHRyYW5zZm9ybWF0aW9uLiAgRm9yIGV4YW1wbGUsXG4vLyBhIHpsaWIgc3RyZWFtIG1pZ2h0IHRha2UgbXVsdGlwbGUgcGxhaW4tdGV4dCB3cml0ZXMoKSwgYW5kIHRoZW5cbi8vIGVtaXQgYSBzaW5nbGUgY29tcHJlc3NlZCBjaHVuayBzb21lIHRpbWUgaW4gdGhlIGZ1dHVyZS5cbi8vXG4vLyBIZXJlJ3MgaG93IHRoaXMgd29ya3M6XG4vL1xuLy8gVGhlIFRyYW5zZm9ybSBzdHJlYW0gaGFzIGFsbCB0aGUgYXNwZWN0cyBvZiB0aGUgcmVhZGFibGUgYW5kIHdyaXRhYmxlXG4vLyBzdHJlYW0gY2xhc3Nlcy4gIFdoZW4geW91IHdyaXRlKGNodW5rKSwgdGhhdCBjYWxscyBfd3JpdGUoY2h1bmssY2IpXG4vLyBpbnRlcm5hbGx5LCBhbmQgcmV0dXJucyBmYWxzZSBpZiB0aGVyZSdzIGEgbG90IG9mIHBlbmRpbmcgd3JpdGVzXG4vLyBidWZmZXJlZCB1cC4gIFdoZW4geW91IGNhbGwgcmVhZCgpLCB0aGF0IGNhbGxzIF9yZWFkKG4pIHVudGlsXG4vLyB0aGVyZSdzIGVub3VnaCBwZW5kaW5nIHJlYWRhYmxlIGRhdGEgYnVmZmVyZWQgdXAuXG4vL1xuLy8gSW4gYSB0cmFuc2Zvcm0gc3RyZWFtLCB0aGUgd3JpdHRlbiBkYXRhIGlzIHBsYWNlZCBpbiBhIGJ1ZmZlci4gIFdoZW5cbi8vIF9yZWFkKG4pIGlzIGNhbGxlZCwgaXQgdHJhbnNmb3JtcyB0aGUgcXVldWVkIHVwIGRhdGEsIGNhbGxpbmcgdGhlXG4vLyBidWZmZXJlZCBfd3JpdGUgY2IncyBhcyBpdCBjb25zdW1lcyBjaHVua3MuICBJZiBjb25zdW1pbmcgYSBzaW5nbGVcbi8vIHdyaXR0ZW4gY2h1bmsgd291bGQgcmVzdWx0IGluIG11bHRpcGxlIG91dHB1dCBjaHVua3MsIHRoZW4gdGhlIGZpcnN0XG4vLyBvdXRwdXR0ZWQgYml0IGNhbGxzIHRoZSByZWFkY2IsIGFuZCBzdWJzZXF1ZW50IGNodW5rcyBqdXN0IGdvIGludG9cbi8vIHRoZSByZWFkIGJ1ZmZlciwgYW5kIHdpbGwgY2F1c2UgaXQgdG8gZW1pdCAncmVhZGFibGUnIGlmIG5lY2Vzc2FyeS5cbi8vXG4vLyBUaGlzIHdheSwgYmFjay1wcmVzc3VyZSBpcyBhY3R1YWxseSBkZXRlcm1pbmVkIGJ5IHRoZSByZWFkaW5nIHNpZGUsXG4vLyBzaW5jZSBfcmVhZCBoYXMgdG8gYmUgY2FsbGVkIHRvIHN0YXJ0IHByb2Nlc3NpbmcgYSBuZXcgY2h1bmsuICBIb3dldmVyLFxuLy8gYSBwYXRob2xvZ2ljYWwgaW5mbGF0ZSB0eXBlIG9mIHRyYW5zZm9ybSBjYW4gY2F1c2UgZXhjZXNzaXZlIGJ1ZmZlcmluZ1xuLy8gaGVyZS4gIEZvciBleGFtcGxlLCBpbWFnaW5lIGEgc3RyZWFtIHdoZXJlIGV2ZXJ5IGJ5dGUgb2YgaW5wdXQgaXNcbi8vIGludGVycHJldGVkIGFzIGFuIGludGVnZXIgZnJvbSAwLTI1NSwgYW5kIHRoZW4gcmVzdWx0cyBpbiB0aGF0IG1hbnlcbi8vIGJ5dGVzIG9mIG91dHB1dC4gIFdyaXRpbmcgdGhlIDQgYnl0ZXMge2ZmLGZmLGZmLGZmfSB3b3VsZCByZXN1bHQgaW5cbi8vIDFrYiBvZiBkYXRhIGJlaW5nIG91dHB1dC4gIEluIHRoaXMgY2FzZSwgeW91IGNvdWxkIHdyaXRlIGEgdmVyeSBzbWFsbFxuLy8gYW1vdW50IG9mIGlucHV0LCBhbmQgZW5kIHVwIHdpdGggYSB2ZXJ5IGxhcmdlIGFtb3VudCBvZiBvdXRwdXQuICBJblxuLy8gc3VjaCBhIHBhdGhvbG9naWNhbCBpbmZsYXRpbmcgbWVjaGFuaXNtLCB0aGVyZSdkIGJlIG5vIHdheSB0byB0ZWxsXG4vLyB0aGUgc3lzdGVtIHRvIHN0b3AgZG9pbmcgdGhlIHRyYW5zZm9ybS4gIEEgc2luZ2xlIDRNQiB3cml0ZSBjb3VsZFxuLy8gY2F1c2UgdGhlIHN5c3RlbSB0byBydW4gb3V0IG9mIG1lbW9yeS5cbi8vXG4vLyBIb3dldmVyLCBldmVuIGluIHN1Y2ggYSBwYXRob2xvZ2ljYWwgY2FzZSwgb25seSBhIHNpbmdsZSB3cml0dGVuIGNodW5rXG4vLyB3b3VsZCBiZSBjb25zdW1lZCwgYW5kIHRoZW4gdGhlIHJlc3Qgd291bGQgd2FpdCAodW4tdHJhbnNmb3JtZWQpIHVudGlsXG4vLyB0aGUgcmVzdWx0cyBvZiB0aGUgcHJldmlvdXMgdHJhbnNmb3JtZWQgY2h1bmsgd2VyZSBjb25zdW1lZC5cblxuJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFRyYW5zZm9ybTtcblxudmFyIER1cGxleCA9IHJlcXVpcmUoJy4vX3N0cmVhbV9kdXBsZXgnKTtcblxuLyo8cmVwbGFjZW1lbnQ+Ki9cbnZhciB1dGlsID0gcmVxdWlyZSgnY29yZS11dGlsLWlzJyk7XG51dGlsLmluaGVyaXRzID0gcmVxdWlyZSgnaW5oZXJpdHMnKTtcbi8qPC9yZXBsYWNlbWVudD4qL1xuXG51dGlsLmluaGVyaXRzKFRyYW5zZm9ybSwgRHVwbGV4KTtcblxuZnVuY3Rpb24gVHJhbnNmb3JtU3RhdGUoc3RyZWFtKSB7XG4gIHRoaXMuYWZ0ZXJUcmFuc2Zvcm0gPSBmdW5jdGlvbiAoZXIsIGRhdGEpIHtcbiAgICByZXR1cm4gYWZ0ZXJUcmFuc2Zvcm0oc3RyZWFtLCBlciwgZGF0YSk7XG4gIH07XG5cbiAgdGhpcy5uZWVkVHJhbnNmb3JtID0gZmFsc2U7XG4gIHRoaXMudHJhbnNmb3JtaW5nID0gZmFsc2U7XG4gIHRoaXMud3JpdGVjYiA9IG51bGw7XG4gIHRoaXMud3JpdGVjaHVuayA9IG51bGw7XG4gIHRoaXMud3JpdGVlbmNvZGluZyA9IG51bGw7XG59XG5cbmZ1bmN0aW9uIGFmdGVyVHJhbnNmb3JtKHN0cmVhbSwgZXIsIGRhdGEpIHtcbiAgdmFyIHRzID0gc3RyZWFtLl90cmFuc2Zvcm1TdGF0ZTtcbiAgdHMudHJhbnNmb3JtaW5nID0gZmFsc2U7XG5cbiAgdmFyIGNiID0gdHMud3JpdGVjYjtcblxuICBpZiAoIWNiKSByZXR1cm4gc3RyZWFtLmVtaXQoJ2Vycm9yJywgbmV3IEVycm9yKCdubyB3cml0ZWNiIGluIFRyYW5zZm9ybSBjbGFzcycpKTtcblxuICB0cy53cml0ZWNodW5rID0gbnVsbDtcbiAgdHMud3JpdGVjYiA9IG51bGw7XG5cbiAgaWYgKGRhdGEgIT09IG51bGwgJiYgZGF0YSAhPT0gdW5kZWZpbmVkKSBzdHJlYW0ucHVzaChkYXRhKTtcblxuICBjYihlcik7XG5cbiAgdmFyIHJzID0gc3RyZWFtLl9yZWFkYWJsZVN0YXRlO1xuICBycy5yZWFkaW5nID0gZmFsc2U7XG4gIGlmIChycy5uZWVkUmVhZGFibGUgfHwgcnMubGVuZ3RoIDwgcnMuaGlnaFdhdGVyTWFyaykge1xuICAgIHN0cmVhbS5fcmVhZChycy5oaWdoV2F0ZXJNYXJrKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBUcmFuc2Zvcm0ob3B0aW9ucykge1xuICBpZiAoISh0aGlzIGluc3RhbmNlb2YgVHJhbnNmb3JtKSkgcmV0dXJuIG5ldyBUcmFuc2Zvcm0ob3B0aW9ucyk7XG5cbiAgRHVwbGV4LmNhbGwodGhpcywgb3B0aW9ucyk7XG5cbiAgdGhpcy5fdHJhbnNmb3JtU3RhdGUgPSBuZXcgVHJhbnNmb3JtU3RhdGUodGhpcyk7XG5cbiAgdmFyIHN0cmVhbSA9IHRoaXM7XG5cbiAgLy8gc3RhcnQgb3V0IGFza2luZyBmb3IgYSByZWFkYWJsZSBldmVudCBvbmNlIGRhdGEgaXMgdHJhbnNmb3JtZWQuXG4gIHRoaXMuX3JlYWRhYmxlU3RhdGUubmVlZFJlYWRhYmxlID0gdHJ1ZTtcblxuICAvLyB3ZSBoYXZlIGltcGxlbWVudGVkIHRoZSBfcmVhZCBtZXRob2QsIGFuZCBkb25lIHRoZSBvdGhlciB0aGluZ3NcbiAgLy8gdGhhdCBSZWFkYWJsZSB3YW50cyBiZWZvcmUgdGhlIGZpcnN0IF9yZWFkIGNhbGwsIHNvIHVuc2V0IHRoZVxuICAvLyBzeW5jIGd1YXJkIGZsYWcuXG4gIHRoaXMuX3JlYWRhYmxlU3RhdGUuc3luYyA9IGZhbHNlO1xuXG4gIGlmIChvcHRpb25zKSB7XG4gICAgaWYgKHR5cGVvZiBvcHRpb25zLnRyYW5zZm9ybSA9PT0gJ2Z1bmN0aW9uJykgdGhpcy5fdHJhbnNmb3JtID0gb3B0aW9ucy50cmFuc2Zvcm07XG5cbiAgICBpZiAodHlwZW9mIG9wdGlvbnMuZmx1c2ggPT09ICdmdW5jdGlvbicpIHRoaXMuX2ZsdXNoID0gb3B0aW9ucy5mbHVzaDtcbiAgfVxuXG4gIC8vIFdoZW4gdGhlIHdyaXRhYmxlIHNpZGUgZmluaXNoZXMsIHRoZW4gZmx1c2ggb3V0IGFueXRoaW5nIHJlbWFpbmluZy5cbiAgdGhpcy5vbmNlKCdwcmVmaW5pc2gnLCBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKHR5cGVvZiB0aGlzLl9mbHVzaCA9PT0gJ2Z1bmN0aW9uJykgdGhpcy5fZmx1c2goZnVuY3Rpb24gKGVyLCBkYXRhKSB7XG4gICAgICBkb25lKHN0cmVhbSwgZXIsIGRhdGEpO1xuICAgIH0pO2Vsc2UgZG9uZShzdHJlYW0pO1xuICB9KTtcbn1cblxuVHJhbnNmb3JtLnByb3RvdHlwZS5wdXNoID0gZnVuY3Rpb24gKGNodW5rLCBlbmNvZGluZykge1xuICB0aGlzLl90cmFuc2Zvcm1TdGF0ZS5uZWVkVHJhbnNmb3JtID0gZmFsc2U7XG4gIHJldHVybiBEdXBsZXgucHJvdG90eXBlLnB1c2guY2FsbCh0aGlzLCBjaHVuaywgZW5jb2RpbmcpO1xufTtcblxuLy8gVGhpcyBpcyB0aGUgcGFydCB3aGVyZSB5b3UgZG8gc3R1ZmYhXG4vLyBvdmVycmlkZSB0aGlzIGZ1bmN0aW9uIGluIGltcGxlbWVudGF0aW9uIGNsYXNzZXMuXG4vLyAnY2h1bmsnIGlzIGFuIGlucHV0IGNodW5rLlxuLy9cbi8vIENhbGwgYHB1c2gobmV3Q2h1bmspYCB0byBwYXNzIGFsb25nIHRyYW5zZm9ybWVkIG91dHB1dFxuLy8gdG8gdGhlIHJlYWRhYmxlIHNpZGUuICBZb3UgbWF5IGNhbGwgJ3B1c2gnIHplcm8gb3IgbW9yZSB0aW1lcy5cbi8vXG4vLyBDYWxsIGBjYihlcnIpYCB3aGVuIHlvdSBhcmUgZG9uZSB3aXRoIHRoaXMgY2h1bmsuICBJZiB5b3UgcGFzc1xuLy8gYW4gZXJyb3IsIHRoZW4gdGhhdCdsbCBwdXQgdGhlIGh1cnQgb24gdGhlIHdob2xlIG9wZXJhdGlvbi4gIElmIHlvdVxuLy8gbmV2ZXIgY2FsbCBjYigpLCB0aGVuIHlvdSdsbCBuZXZlciBnZXQgYW5vdGhlciBjaHVuay5cblRyYW5zZm9ybS5wcm90b3R5cGUuX3RyYW5zZm9ybSA9IGZ1bmN0aW9uIChjaHVuaywgZW5jb2RpbmcsIGNiKSB7XG4gIHRocm93IG5ldyBFcnJvcignX3RyYW5zZm9ybSgpIGlzIG5vdCBpbXBsZW1lbnRlZCcpO1xufTtcblxuVHJhbnNmb3JtLnByb3RvdHlwZS5fd3JpdGUgPSBmdW5jdGlvbiAoY2h1bmssIGVuY29kaW5nLCBjYikge1xuICB2YXIgdHMgPSB0aGlzLl90cmFuc2Zvcm1TdGF0ZTtcbiAgdHMud3JpdGVjYiA9IGNiO1xuICB0cy53cml0ZWNodW5rID0gY2h1bms7XG4gIHRzLndyaXRlZW5jb2RpbmcgPSBlbmNvZGluZztcbiAgaWYgKCF0cy50cmFuc2Zvcm1pbmcpIHtcbiAgICB2YXIgcnMgPSB0aGlzLl9yZWFkYWJsZVN0YXRlO1xuICAgIGlmICh0cy5uZWVkVHJhbnNmb3JtIHx8IHJzLm5lZWRSZWFkYWJsZSB8fCBycy5sZW5ndGggPCBycy5oaWdoV2F0ZXJNYXJrKSB0aGlzLl9yZWFkKHJzLmhpZ2hXYXRlck1hcmspO1xuICB9XG59O1xuXG4vLyBEb2Vzbid0IG1hdHRlciB3aGF0IHRoZSBhcmdzIGFyZSBoZXJlLlxuLy8gX3RyYW5zZm9ybSBkb2VzIGFsbCB0aGUgd29yay5cbi8vIFRoYXQgd2UgZ290IGhlcmUgbWVhbnMgdGhhdCB0aGUgcmVhZGFibGUgc2lkZSB3YW50cyBtb3JlIGRhdGEuXG5UcmFuc2Zvcm0ucHJvdG90eXBlLl9yZWFkID0gZnVuY3Rpb24gKG4pIHtcbiAgdmFyIHRzID0gdGhpcy5fdHJhbnNmb3JtU3RhdGU7XG5cbiAgaWYgKHRzLndyaXRlY2h1bmsgIT09IG51bGwgJiYgdHMud3JpdGVjYiAmJiAhdHMudHJhbnNmb3JtaW5nKSB7XG4gICAgdHMudHJhbnNmb3JtaW5nID0gdHJ1ZTtcbiAgICB0aGlzLl90cmFuc2Zvcm0odHMud3JpdGVjaHVuaywgdHMud3JpdGVlbmNvZGluZywgdHMuYWZ0ZXJUcmFuc2Zvcm0pO1xuICB9IGVsc2Uge1xuICAgIC8vIG1hcmsgdGhhdCB3ZSBuZWVkIGEgdHJhbnNmb3JtLCBzbyB0aGF0IGFueSBkYXRhIHRoYXQgY29tZXMgaW5cbiAgICAvLyB3aWxsIGdldCBwcm9jZXNzZWQsIG5vdyB0aGF0IHdlJ3ZlIGFza2VkIGZvciBpdC5cbiAgICB0cy5uZWVkVHJhbnNmb3JtID0gdHJ1ZTtcbiAgfVxufTtcblxuZnVuY3Rpb24gZG9uZShzdHJlYW0sIGVyLCBkYXRhKSB7XG4gIGlmIChlcikgcmV0dXJuIHN0cmVhbS5lbWl0KCdlcnJvcicsIGVyKTtcblxuICBpZiAoZGF0YSAhPT0gbnVsbCAmJiBkYXRhICE9PSB1bmRlZmluZWQpIHN0cmVhbS5wdXNoKGRhdGEpO1xuXG4gIC8vIGlmIHRoZXJlJ3Mgbm90aGluZyBpbiB0aGUgd3JpdGUgYnVmZmVyLCB0aGVuIHRoYXQgbWVhbnNcbiAgLy8gdGhhdCBub3RoaW5nIG1vcmUgd2lsbCBldmVyIGJlIHByb3ZpZGVkXG4gIHZhciB3cyA9IHN0cmVhbS5fd3JpdGFibGVTdGF0ZTtcbiAgdmFyIHRzID0gc3RyZWFtLl90cmFuc2Zvcm1TdGF0ZTtcblxuICBpZiAod3MubGVuZ3RoKSB0aHJvdyBuZXcgRXJyb3IoJ0NhbGxpbmcgdHJhbnNmb3JtIGRvbmUgd2hlbiB3cy5sZW5ndGggIT0gMCcpO1xuXG4gIGlmICh0cy50cmFuc2Zvcm1pbmcpIHRocm93IG5ldyBFcnJvcignQ2FsbGluZyB0cmFuc2Zvcm0gZG9uZSB3aGVuIHN0aWxsIHRyYW5zZm9ybWluZycpO1xuXG4gIHJldHVybiBzdHJlYW0ucHVzaChudWxsKTtcbn0iLCIvLyBBIGJpdCBzaW1wbGVyIHRoYW4gcmVhZGFibGUgc3RyZWFtcy5cbi8vIEltcGxlbWVudCBhbiBhc3luYyAuX3dyaXRlKGNodW5rLCBlbmNvZGluZywgY2IpLCBhbmQgaXQnbGwgaGFuZGxlIGFsbFxuLy8gdGhlIGRyYWluIGV2ZW50IGVtaXNzaW9uIGFuZCBidWZmZXJpbmcuXG5cbid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBXcml0YWJsZTtcblxuLyo8cmVwbGFjZW1lbnQ+Ki9cbnZhciBwcm9jZXNzTmV4dFRpY2sgPSByZXF1aXJlKCdwcm9jZXNzLW5leHRpY2stYXJncycpO1xuLyo8L3JlcGxhY2VtZW50PiovXG5cbi8qPHJlcGxhY2VtZW50PiovXG52YXIgYXN5bmNXcml0ZSA9ICFwcm9jZXNzLmJyb3dzZXIgJiYgWyd2MC4xMCcsICd2MC45LiddLmluZGV4T2YocHJvY2Vzcy52ZXJzaW9uLnNsaWNlKDAsIDUpKSA+IC0xID8gc2V0SW1tZWRpYXRlIDogcHJvY2Vzc05leHRUaWNrO1xuLyo8L3JlcGxhY2VtZW50PiovXG5cbi8qPHJlcGxhY2VtZW50PiovXG52YXIgRHVwbGV4O1xuLyo8L3JlcGxhY2VtZW50PiovXG5cbldyaXRhYmxlLldyaXRhYmxlU3RhdGUgPSBXcml0YWJsZVN0YXRlO1xuXG4vKjxyZXBsYWNlbWVudD4qL1xudmFyIHV0aWwgPSByZXF1aXJlKCdjb3JlLXV0aWwtaXMnKTtcbnV0aWwuaW5oZXJpdHMgPSByZXF1aXJlKCdpbmhlcml0cycpO1xuLyo8L3JlcGxhY2VtZW50PiovXG5cbi8qPHJlcGxhY2VtZW50PiovXG52YXIgaW50ZXJuYWxVdGlsID0ge1xuICBkZXByZWNhdGU6IHJlcXVpcmUoJ3V0aWwtZGVwcmVjYXRlJylcbn07XG4vKjwvcmVwbGFjZW1lbnQ+Ki9cblxuLyo8cmVwbGFjZW1lbnQ+Ki9cbnZhciBTdHJlYW0gPSByZXF1aXJlKCcuL2ludGVybmFsL3N0cmVhbXMvc3RyZWFtJyk7XG4vKjwvcmVwbGFjZW1lbnQ+Ki9cblxudmFyIEJ1ZmZlciA9IHJlcXVpcmUoJ2J1ZmZlcicpLkJ1ZmZlcjtcbi8qPHJlcGxhY2VtZW50PiovXG52YXIgYnVmZmVyU2hpbSA9IHJlcXVpcmUoJ2J1ZmZlci1zaGltcycpO1xuLyo8L3JlcGxhY2VtZW50PiovXG5cbnV0aWwuaW5oZXJpdHMoV3JpdGFibGUsIFN0cmVhbSk7XG5cbmZ1bmN0aW9uIG5vcCgpIHt9XG5cbmZ1bmN0aW9uIFdyaXRlUmVxKGNodW5rLCBlbmNvZGluZywgY2IpIHtcbiAgdGhpcy5jaHVuayA9IGNodW5rO1xuICB0aGlzLmVuY29kaW5nID0gZW5jb2Rpbmc7XG4gIHRoaXMuY2FsbGJhY2sgPSBjYjtcbiAgdGhpcy5uZXh0ID0gbnVsbDtcbn1cblxuZnVuY3Rpb24gV3JpdGFibGVTdGF0ZShvcHRpb25zLCBzdHJlYW0pIHtcbiAgRHVwbGV4ID0gRHVwbGV4IHx8IHJlcXVpcmUoJy4vX3N0cmVhbV9kdXBsZXgnKTtcblxuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuICAvLyBvYmplY3Qgc3RyZWFtIGZsYWcgdG8gaW5kaWNhdGUgd2hldGhlciBvciBub3QgdGhpcyBzdHJlYW1cbiAgLy8gY29udGFpbnMgYnVmZmVycyBvciBvYmplY3RzLlxuICB0aGlzLm9iamVjdE1vZGUgPSAhIW9wdGlvbnMub2JqZWN0TW9kZTtcblxuICBpZiAoc3RyZWFtIGluc3RhbmNlb2YgRHVwbGV4KSB0aGlzLm9iamVjdE1vZGUgPSB0aGlzLm9iamVjdE1vZGUgfHwgISFvcHRpb25zLndyaXRhYmxlT2JqZWN0TW9kZTtcblxuICAvLyB0aGUgcG9pbnQgYXQgd2hpY2ggd3JpdGUoKSBzdGFydHMgcmV0dXJuaW5nIGZhbHNlXG4gIC8vIE5vdGU6IDAgaXMgYSB2YWxpZCB2YWx1ZSwgbWVhbnMgdGhhdCB3ZSBhbHdheXMgcmV0dXJuIGZhbHNlIGlmXG4gIC8vIHRoZSBlbnRpcmUgYnVmZmVyIGlzIG5vdCBmbHVzaGVkIGltbWVkaWF0ZWx5IG9uIHdyaXRlKClcbiAgdmFyIGh3bSA9IG9wdGlvbnMuaGlnaFdhdGVyTWFyaztcbiAgdmFyIGRlZmF1bHRId20gPSB0aGlzLm9iamVjdE1vZGUgPyAxNiA6IDE2ICogMTAyNDtcbiAgdGhpcy5oaWdoV2F0ZXJNYXJrID0gaHdtIHx8IGh3bSA9PT0gMCA/IGh3bSA6IGRlZmF1bHRId207XG5cbiAgLy8gY2FzdCB0byBpbnRzLlxuICB0aGlzLmhpZ2hXYXRlck1hcmsgPSB+fnRoaXMuaGlnaFdhdGVyTWFyaztcblxuICAvLyBkcmFpbiBldmVudCBmbGFnLlxuICB0aGlzLm5lZWREcmFpbiA9IGZhbHNlO1xuICAvLyBhdCB0aGUgc3RhcnQgb2YgY2FsbGluZyBlbmQoKVxuICB0aGlzLmVuZGluZyA9IGZhbHNlO1xuICAvLyB3aGVuIGVuZCgpIGhhcyBiZWVuIGNhbGxlZCwgYW5kIHJldHVybmVkXG4gIHRoaXMuZW5kZWQgPSBmYWxzZTtcbiAgLy8gd2hlbiAnZmluaXNoJyBpcyBlbWl0dGVkXG4gIHRoaXMuZmluaXNoZWQgPSBmYWxzZTtcblxuICAvLyBzaG91bGQgd2UgZGVjb2RlIHN0cmluZ3MgaW50byBidWZmZXJzIGJlZm9yZSBwYXNzaW5nIHRvIF93cml0ZT9cbiAgLy8gdGhpcyBpcyBoZXJlIHNvIHRoYXQgc29tZSBub2RlLWNvcmUgc3RyZWFtcyBjYW4gb3B0aW1pemUgc3RyaW5nXG4gIC8vIGhhbmRsaW5nIGF0IGEgbG93ZXIgbGV2ZWwuXG4gIHZhciBub0RlY29kZSA9IG9wdGlvbnMuZGVjb2RlU3RyaW5ncyA9PT0gZmFsc2U7XG4gIHRoaXMuZGVjb2RlU3RyaW5ncyA9ICFub0RlY29kZTtcblxuICAvLyBDcnlwdG8gaXMga2luZCBvZiBvbGQgYW5kIGNydXN0eS4gIEhpc3RvcmljYWxseSwgaXRzIGRlZmF1bHQgc3RyaW5nXG4gIC8vIGVuY29kaW5nIGlzICdiaW5hcnknIHNvIHdlIGhhdmUgdG8gbWFrZSB0aGlzIGNvbmZpZ3VyYWJsZS5cbiAgLy8gRXZlcnl0aGluZyBlbHNlIGluIHRoZSB1bml2ZXJzZSB1c2VzICd1dGY4JywgdGhvdWdoLlxuICB0aGlzLmRlZmF1bHRFbmNvZGluZyA9IG9wdGlvbnMuZGVmYXVsdEVuY29kaW5nIHx8ICd1dGY4JztcblxuICAvLyBub3QgYW4gYWN0dWFsIGJ1ZmZlciB3ZSBrZWVwIHRyYWNrIG9mLCBidXQgYSBtZWFzdXJlbWVudFxuICAvLyBvZiBob3cgbXVjaCB3ZSdyZSB3YWl0aW5nIHRvIGdldCBwdXNoZWQgdG8gc29tZSB1bmRlcmx5aW5nXG4gIC8vIHNvY2tldCBvciBmaWxlLlxuICB0aGlzLmxlbmd0aCA9IDA7XG5cbiAgLy8gYSBmbGFnIHRvIHNlZSB3aGVuIHdlJ3JlIGluIHRoZSBtaWRkbGUgb2YgYSB3cml0ZS5cbiAgdGhpcy53cml0aW5nID0gZmFsc2U7XG5cbiAgLy8gd2hlbiB0cnVlIGFsbCB3cml0ZXMgd2lsbCBiZSBidWZmZXJlZCB1bnRpbCAudW5jb3JrKCkgY2FsbFxuICB0aGlzLmNvcmtlZCA9IDA7XG5cbiAgLy8gYSBmbGFnIHRvIGJlIGFibGUgdG8gdGVsbCBpZiB0aGUgb253cml0ZSBjYiBpcyBjYWxsZWQgaW1tZWRpYXRlbHksXG4gIC8vIG9yIG9uIGEgbGF0ZXIgdGljay4gIFdlIHNldCB0aGlzIHRvIHRydWUgYXQgZmlyc3QsIGJlY2F1c2UgYW55XG4gIC8vIGFjdGlvbnMgdGhhdCBzaG91bGRuJ3QgaGFwcGVuIHVudGlsIFwibGF0ZXJcIiBzaG91bGQgZ2VuZXJhbGx5IGFsc29cbiAgLy8gbm90IGhhcHBlbiBiZWZvcmUgdGhlIGZpcnN0IHdyaXRlIGNhbGwuXG4gIHRoaXMuc3luYyA9IHRydWU7XG5cbiAgLy8gYSBmbGFnIHRvIGtub3cgaWYgd2UncmUgcHJvY2Vzc2luZyBwcmV2aW91c2x5IGJ1ZmZlcmVkIGl0ZW1zLCB3aGljaFxuICAvLyBtYXkgY2FsbCB0aGUgX3dyaXRlKCkgY2FsbGJhY2sgaW4gdGhlIHNhbWUgdGljaywgc28gdGhhdCB3ZSBkb24ndFxuICAvLyBlbmQgdXAgaW4gYW4gb3ZlcmxhcHBlZCBvbndyaXRlIHNpdHVhdGlvbi5cbiAgdGhpcy5idWZmZXJQcm9jZXNzaW5nID0gZmFsc2U7XG5cbiAgLy8gdGhlIGNhbGxiYWNrIHRoYXQncyBwYXNzZWQgdG8gX3dyaXRlKGNodW5rLGNiKVxuICB0aGlzLm9ud3JpdGUgPSBmdW5jdGlvbiAoZXIpIHtcbiAgICBvbndyaXRlKHN0cmVhbSwgZXIpO1xuICB9O1xuXG4gIC8vIHRoZSBjYWxsYmFjayB0aGF0IHRoZSB1c2VyIHN1cHBsaWVzIHRvIHdyaXRlKGNodW5rLGVuY29kaW5nLGNiKVxuICB0aGlzLndyaXRlY2IgPSBudWxsO1xuXG4gIC8vIHRoZSBhbW91bnQgdGhhdCBpcyBiZWluZyB3cml0dGVuIHdoZW4gX3dyaXRlIGlzIGNhbGxlZC5cbiAgdGhpcy53cml0ZWxlbiA9IDA7XG5cbiAgdGhpcy5idWZmZXJlZFJlcXVlc3QgPSBudWxsO1xuICB0aGlzLmxhc3RCdWZmZXJlZFJlcXVlc3QgPSBudWxsO1xuXG4gIC8vIG51bWJlciBvZiBwZW5kaW5nIHVzZXItc3VwcGxpZWQgd3JpdGUgY2FsbGJhY2tzXG4gIC8vIHRoaXMgbXVzdCBiZSAwIGJlZm9yZSAnZmluaXNoJyBjYW4gYmUgZW1pdHRlZFxuICB0aGlzLnBlbmRpbmdjYiA9IDA7XG5cbiAgLy8gZW1pdCBwcmVmaW5pc2ggaWYgdGhlIG9ubHkgdGhpbmcgd2UncmUgd2FpdGluZyBmb3IgaXMgX3dyaXRlIGNic1xuICAvLyBUaGlzIGlzIHJlbGV2YW50IGZvciBzeW5jaHJvbm91cyBUcmFuc2Zvcm0gc3RyZWFtc1xuICB0aGlzLnByZWZpbmlzaGVkID0gZmFsc2U7XG5cbiAgLy8gVHJ1ZSBpZiB0aGUgZXJyb3Igd2FzIGFscmVhZHkgZW1pdHRlZCBhbmQgc2hvdWxkIG5vdCBiZSB0aHJvd24gYWdhaW5cbiAgdGhpcy5lcnJvckVtaXR0ZWQgPSBmYWxzZTtcblxuICAvLyBjb3VudCBidWZmZXJlZCByZXF1ZXN0c1xuICB0aGlzLmJ1ZmZlcmVkUmVxdWVzdENvdW50ID0gMDtcblxuICAvLyBhbGxvY2F0ZSB0aGUgZmlyc3QgQ29ya2VkUmVxdWVzdCwgdGhlcmUgaXMgYWx3YXlzXG4gIC8vIG9uZSBhbGxvY2F0ZWQgYW5kIGZyZWUgdG8gdXNlLCBhbmQgd2UgbWFpbnRhaW4gYXQgbW9zdCB0d29cbiAgdGhpcy5jb3JrZWRSZXF1ZXN0c0ZyZWUgPSBuZXcgQ29ya2VkUmVxdWVzdCh0aGlzKTtcbn1cblxuV3JpdGFibGVTdGF0ZS5wcm90b3R5cGUuZ2V0QnVmZmVyID0gZnVuY3Rpb24gZ2V0QnVmZmVyKCkge1xuICB2YXIgY3VycmVudCA9IHRoaXMuYnVmZmVyZWRSZXF1ZXN0O1xuICB2YXIgb3V0ID0gW107XG4gIHdoaWxlIChjdXJyZW50KSB7XG4gICAgb3V0LnB1c2goY3VycmVudCk7XG4gICAgY3VycmVudCA9IGN1cnJlbnQubmV4dDtcbiAgfVxuICByZXR1cm4gb3V0O1xufTtcblxuKGZ1bmN0aW9uICgpIHtcbiAgdHJ5IHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoV3JpdGFibGVTdGF0ZS5wcm90b3R5cGUsICdidWZmZXInLCB7XG4gICAgICBnZXQ6IGludGVybmFsVXRpbC5kZXByZWNhdGUoZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRCdWZmZXIoKTtcbiAgICAgIH0sICdfd3JpdGFibGVTdGF0ZS5idWZmZXIgaXMgZGVwcmVjYXRlZC4gVXNlIF93cml0YWJsZVN0YXRlLmdldEJ1ZmZlciAnICsgJ2luc3RlYWQuJylcbiAgICB9KTtcbiAgfSBjYXRjaCAoXykge31cbn0pKCk7XG5cbi8vIFRlc3QgX3dyaXRhYmxlU3RhdGUgZm9yIGluaGVyaXRhbmNlIHRvIGFjY291bnQgZm9yIER1cGxleCBzdHJlYW1zLFxuLy8gd2hvc2UgcHJvdG90eXBlIGNoYWluIG9ubHkgcG9pbnRzIHRvIFJlYWRhYmxlLlxudmFyIHJlYWxIYXNJbnN0YW5jZTtcbmlmICh0eXBlb2YgU3ltYm9sID09PSAnZnVuY3Rpb24nICYmIFN5bWJvbC5oYXNJbnN0YW5jZSAmJiB0eXBlb2YgRnVuY3Rpb24ucHJvdG90eXBlW1N5bWJvbC5oYXNJbnN0YW5jZV0gPT09ICdmdW5jdGlvbicpIHtcbiAgcmVhbEhhc0luc3RhbmNlID0gRnVuY3Rpb24ucHJvdG90eXBlW1N5bWJvbC5oYXNJbnN0YW5jZV07XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShXcml0YWJsZSwgU3ltYm9sLmhhc0luc3RhbmNlLCB7XG4gICAgdmFsdWU6IGZ1bmN0aW9uIChvYmplY3QpIHtcbiAgICAgIGlmIChyZWFsSGFzSW5zdGFuY2UuY2FsbCh0aGlzLCBvYmplY3QpKSByZXR1cm4gdHJ1ZTtcblxuICAgICAgcmV0dXJuIG9iamVjdCAmJiBvYmplY3QuX3dyaXRhYmxlU3RhdGUgaW5zdGFuY2VvZiBXcml0YWJsZVN0YXRlO1xuICAgIH1cbiAgfSk7XG59IGVsc2Uge1xuICByZWFsSGFzSW5zdGFuY2UgPSBmdW5jdGlvbiAob2JqZWN0KSB7XG4gICAgcmV0dXJuIG9iamVjdCBpbnN0YW5jZW9mIHRoaXM7XG4gIH07XG59XG5cbmZ1bmN0aW9uIFdyaXRhYmxlKG9wdGlvbnMpIHtcbiAgRHVwbGV4ID0gRHVwbGV4IHx8IHJlcXVpcmUoJy4vX3N0cmVhbV9kdXBsZXgnKTtcblxuICAvLyBXcml0YWJsZSBjdG9yIGlzIGFwcGxpZWQgdG8gRHVwbGV4ZXMsIHRvby5cbiAgLy8gYHJlYWxIYXNJbnN0YW5jZWAgaXMgbmVjZXNzYXJ5IGJlY2F1c2UgdXNpbmcgcGxhaW4gYGluc3RhbmNlb2ZgXG4gIC8vIHdvdWxkIHJldHVybiBmYWxzZSwgYXMgbm8gYF93cml0YWJsZVN0YXRlYCBwcm9wZXJ0eSBpcyBhdHRhY2hlZC5cblxuICAvLyBUcnlpbmcgdG8gdXNlIHRoZSBjdXN0b20gYGluc3RhbmNlb2ZgIGZvciBXcml0YWJsZSBoZXJlIHdpbGwgYWxzbyBicmVhayB0aGVcbiAgLy8gTm9kZS5qcyBMYXp5VHJhbnNmb3JtIGltcGxlbWVudGF0aW9uLCB3aGljaCBoYXMgYSBub24tdHJpdmlhbCBnZXR0ZXIgZm9yXG4gIC8vIGBfd3JpdGFibGVTdGF0ZWAgdGhhdCB3b3VsZCBsZWFkIHRvIGluZmluaXRlIHJlY3Vyc2lvbi5cbiAgaWYgKCFyZWFsSGFzSW5zdGFuY2UuY2FsbChXcml0YWJsZSwgdGhpcykgJiYgISh0aGlzIGluc3RhbmNlb2YgRHVwbGV4KSkge1xuICAgIHJldHVybiBuZXcgV3JpdGFibGUob3B0aW9ucyk7XG4gIH1cblxuICB0aGlzLl93cml0YWJsZVN0YXRlID0gbmV3IFdyaXRhYmxlU3RhdGUob3B0aW9ucywgdGhpcyk7XG5cbiAgLy8gbGVnYWN5LlxuICB0aGlzLndyaXRhYmxlID0gdHJ1ZTtcblxuICBpZiAob3B0aW9ucykge1xuICAgIGlmICh0eXBlb2Ygb3B0aW9ucy53cml0ZSA9PT0gJ2Z1bmN0aW9uJykgdGhpcy5fd3JpdGUgPSBvcHRpb25zLndyaXRlO1xuXG4gICAgaWYgKHR5cGVvZiBvcHRpb25zLndyaXRldiA9PT0gJ2Z1bmN0aW9uJykgdGhpcy5fd3JpdGV2ID0gb3B0aW9ucy53cml0ZXY7XG4gIH1cblxuICBTdHJlYW0uY2FsbCh0aGlzKTtcbn1cblxuLy8gT3RoZXJ3aXNlIHBlb3BsZSBjYW4gcGlwZSBXcml0YWJsZSBzdHJlYW1zLCB3aGljaCBpcyBqdXN0IHdyb25nLlxuV3JpdGFibGUucHJvdG90eXBlLnBpcGUgPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMuZW1pdCgnZXJyb3InLCBuZXcgRXJyb3IoJ0Nhbm5vdCBwaXBlLCBub3QgcmVhZGFibGUnKSk7XG59O1xuXG5mdW5jdGlvbiB3cml0ZUFmdGVyRW5kKHN0cmVhbSwgY2IpIHtcbiAgdmFyIGVyID0gbmV3IEVycm9yKCd3cml0ZSBhZnRlciBlbmQnKTtcbiAgLy8gVE9ETzogZGVmZXIgZXJyb3IgZXZlbnRzIGNvbnNpc3RlbnRseSBldmVyeXdoZXJlLCBub3QganVzdCB0aGUgY2JcbiAgc3RyZWFtLmVtaXQoJ2Vycm9yJywgZXIpO1xuICBwcm9jZXNzTmV4dFRpY2soY2IsIGVyKTtcbn1cblxuLy8gQ2hlY2tzIHRoYXQgYSB1c2VyLXN1cHBsaWVkIGNodW5rIGlzIHZhbGlkLCBlc3BlY2lhbGx5IGZvciB0aGUgcGFydGljdWxhclxuLy8gbW9kZSB0aGUgc3RyZWFtIGlzIGluLiBDdXJyZW50bHkgdGhpcyBtZWFucyB0aGF0IGBudWxsYCBpcyBuZXZlciBhY2NlcHRlZFxuLy8gYW5kIHVuZGVmaW5lZC9ub24tc3RyaW5nIHZhbHVlcyBhcmUgb25seSBhbGxvd2VkIGluIG9iamVjdCBtb2RlLlxuZnVuY3Rpb24gdmFsaWRDaHVuayhzdHJlYW0sIHN0YXRlLCBjaHVuaywgY2IpIHtcbiAgdmFyIHZhbGlkID0gdHJ1ZTtcbiAgdmFyIGVyID0gZmFsc2U7XG5cbiAgaWYgKGNodW5rID09PSBudWxsKSB7XG4gICAgZXIgPSBuZXcgVHlwZUVycm9yKCdNYXkgbm90IHdyaXRlIG51bGwgdmFsdWVzIHRvIHN0cmVhbScpO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBjaHVuayAhPT0gJ3N0cmluZycgJiYgY2h1bmsgIT09IHVuZGVmaW5lZCAmJiAhc3RhdGUub2JqZWN0TW9kZSkge1xuICAgIGVyID0gbmV3IFR5cGVFcnJvcignSW52YWxpZCBub24tc3RyaW5nL2J1ZmZlciBjaHVuaycpO1xuICB9XG4gIGlmIChlcikge1xuICAgIHN0cmVhbS5lbWl0KCdlcnJvcicsIGVyKTtcbiAgICBwcm9jZXNzTmV4dFRpY2soY2IsIGVyKTtcbiAgICB2YWxpZCA9IGZhbHNlO1xuICB9XG4gIHJldHVybiB2YWxpZDtcbn1cblxuV3JpdGFibGUucHJvdG90eXBlLndyaXRlID0gZnVuY3Rpb24gKGNodW5rLCBlbmNvZGluZywgY2IpIHtcbiAgdmFyIHN0YXRlID0gdGhpcy5fd3JpdGFibGVTdGF0ZTtcbiAgdmFyIHJldCA9IGZhbHNlO1xuICB2YXIgaXNCdWYgPSBCdWZmZXIuaXNCdWZmZXIoY2h1bmspO1xuXG4gIGlmICh0eXBlb2YgZW5jb2RpbmcgPT09ICdmdW5jdGlvbicpIHtcbiAgICBjYiA9IGVuY29kaW5nO1xuICAgIGVuY29kaW5nID0gbnVsbDtcbiAgfVxuXG4gIGlmIChpc0J1ZikgZW5jb2RpbmcgPSAnYnVmZmVyJztlbHNlIGlmICghZW5jb2RpbmcpIGVuY29kaW5nID0gc3RhdGUuZGVmYXVsdEVuY29kaW5nO1xuXG4gIGlmICh0eXBlb2YgY2IgIT09ICdmdW5jdGlvbicpIGNiID0gbm9wO1xuXG4gIGlmIChzdGF0ZS5lbmRlZCkgd3JpdGVBZnRlckVuZCh0aGlzLCBjYik7ZWxzZSBpZiAoaXNCdWYgfHwgdmFsaWRDaHVuayh0aGlzLCBzdGF0ZSwgY2h1bmssIGNiKSkge1xuICAgIHN0YXRlLnBlbmRpbmdjYisrO1xuICAgIHJldCA9IHdyaXRlT3JCdWZmZXIodGhpcywgc3RhdGUsIGlzQnVmLCBjaHVuaywgZW5jb2RpbmcsIGNiKTtcbiAgfVxuXG4gIHJldHVybiByZXQ7XG59O1xuXG5Xcml0YWJsZS5wcm90b3R5cGUuY29yayA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIHN0YXRlID0gdGhpcy5fd3JpdGFibGVTdGF0ZTtcblxuICBzdGF0ZS5jb3JrZWQrKztcbn07XG5cbldyaXRhYmxlLnByb3RvdHlwZS51bmNvcmsgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBzdGF0ZSA9IHRoaXMuX3dyaXRhYmxlU3RhdGU7XG5cbiAgaWYgKHN0YXRlLmNvcmtlZCkge1xuICAgIHN0YXRlLmNvcmtlZC0tO1xuXG4gICAgaWYgKCFzdGF0ZS53cml0aW5nICYmICFzdGF0ZS5jb3JrZWQgJiYgIXN0YXRlLmZpbmlzaGVkICYmICFzdGF0ZS5idWZmZXJQcm9jZXNzaW5nICYmIHN0YXRlLmJ1ZmZlcmVkUmVxdWVzdCkgY2xlYXJCdWZmZXIodGhpcywgc3RhdGUpO1xuICB9XG59O1xuXG5Xcml0YWJsZS5wcm90b3R5cGUuc2V0RGVmYXVsdEVuY29kaW5nID0gZnVuY3Rpb24gc2V0RGVmYXVsdEVuY29kaW5nKGVuY29kaW5nKSB7XG4gIC8vIG5vZGU6OlBhcnNlRW5jb2RpbmcoKSByZXF1aXJlcyBsb3dlciBjYXNlLlxuICBpZiAodHlwZW9mIGVuY29kaW5nID09PSAnc3RyaW5nJykgZW5jb2RpbmcgPSBlbmNvZGluZy50b0xvd2VyQ2FzZSgpO1xuICBpZiAoIShbJ2hleCcsICd1dGY4JywgJ3V0Zi04JywgJ2FzY2lpJywgJ2JpbmFyeScsICdiYXNlNjQnLCAndWNzMicsICd1Y3MtMicsICd1dGYxNmxlJywgJ3V0Zi0xNmxlJywgJ3JhdyddLmluZGV4T2YoKGVuY29kaW5nICsgJycpLnRvTG93ZXJDYXNlKCkpID4gLTEpKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdVbmtub3duIGVuY29kaW5nOiAnICsgZW5jb2RpbmcpO1xuICB0aGlzLl93cml0YWJsZVN0YXRlLmRlZmF1bHRFbmNvZGluZyA9IGVuY29kaW5nO1xuICByZXR1cm4gdGhpcztcbn07XG5cbmZ1bmN0aW9uIGRlY29kZUNodW5rKHN0YXRlLCBjaHVuaywgZW5jb2RpbmcpIHtcbiAgaWYgKCFzdGF0ZS5vYmplY3RNb2RlICYmIHN0YXRlLmRlY29kZVN0cmluZ3MgIT09IGZhbHNlICYmIHR5cGVvZiBjaHVuayA9PT0gJ3N0cmluZycpIHtcbiAgICBjaHVuayA9IGJ1ZmZlclNoaW0uZnJvbShjaHVuaywgZW5jb2RpbmcpO1xuICB9XG4gIHJldHVybiBjaHVuaztcbn1cblxuLy8gaWYgd2UncmUgYWxyZWFkeSB3cml0aW5nIHNvbWV0aGluZywgdGhlbiBqdXN0IHB1dCB0aGlzXG4vLyBpbiB0aGUgcXVldWUsIGFuZCB3YWl0IG91ciB0dXJuLiAgT3RoZXJ3aXNlLCBjYWxsIF93cml0ZVxuLy8gSWYgd2UgcmV0dXJuIGZhbHNlLCB0aGVuIHdlIG5lZWQgYSBkcmFpbiBldmVudCwgc28gc2V0IHRoYXQgZmxhZy5cbmZ1bmN0aW9uIHdyaXRlT3JCdWZmZXIoc3RyZWFtLCBzdGF0ZSwgaXNCdWYsIGNodW5rLCBlbmNvZGluZywgY2IpIHtcbiAgaWYgKCFpc0J1Zikge1xuICAgIGNodW5rID0gZGVjb2RlQ2h1bmsoc3RhdGUsIGNodW5rLCBlbmNvZGluZyk7XG4gICAgaWYgKEJ1ZmZlci5pc0J1ZmZlcihjaHVuaykpIGVuY29kaW5nID0gJ2J1ZmZlcic7XG4gIH1cbiAgdmFyIGxlbiA9IHN0YXRlLm9iamVjdE1vZGUgPyAxIDogY2h1bmsubGVuZ3RoO1xuXG4gIHN0YXRlLmxlbmd0aCArPSBsZW47XG5cbiAgdmFyIHJldCA9IHN0YXRlLmxlbmd0aCA8IHN0YXRlLmhpZ2hXYXRlck1hcms7XG4gIC8vIHdlIG11c3QgZW5zdXJlIHRoYXQgcHJldmlvdXMgbmVlZERyYWluIHdpbGwgbm90IGJlIHJlc2V0IHRvIGZhbHNlLlxuICBpZiAoIXJldCkgc3RhdGUubmVlZERyYWluID0gdHJ1ZTtcblxuICBpZiAoc3RhdGUud3JpdGluZyB8fCBzdGF0ZS5jb3JrZWQpIHtcbiAgICB2YXIgbGFzdCA9IHN0YXRlLmxhc3RCdWZmZXJlZFJlcXVlc3Q7XG4gICAgc3RhdGUubGFzdEJ1ZmZlcmVkUmVxdWVzdCA9IG5ldyBXcml0ZVJlcShjaHVuaywgZW5jb2RpbmcsIGNiKTtcbiAgICBpZiAobGFzdCkge1xuICAgICAgbGFzdC5uZXh0ID0gc3RhdGUubGFzdEJ1ZmZlcmVkUmVxdWVzdDtcbiAgICB9IGVsc2Uge1xuICAgICAgc3RhdGUuYnVmZmVyZWRSZXF1ZXN0ID0gc3RhdGUubGFzdEJ1ZmZlcmVkUmVxdWVzdDtcbiAgICB9XG4gICAgc3RhdGUuYnVmZmVyZWRSZXF1ZXN0Q291bnQgKz0gMTtcbiAgfSBlbHNlIHtcbiAgICBkb1dyaXRlKHN0cmVhbSwgc3RhdGUsIGZhbHNlLCBsZW4sIGNodW5rLCBlbmNvZGluZywgY2IpO1xuICB9XG5cbiAgcmV0dXJuIHJldDtcbn1cblxuZnVuY3Rpb24gZG9Xcml0ZShzdHJlYW0sIHN0YXRlLCB3cml0ZXYsIGxlbiwgY2h1bmssIGVuY29kaW5nLCBjYikge1xuICBzdGF0ZS53cml0ZWxlbiA9IGxlbjtcbiAgc3RhdGUud3JpdGVjYiA9IGNiO1xuICBzdGF0ZS53cml0aW5nID0gdHJ1ZTtcbiAgc3RhdGUuc3luYyA9IHRydWU7XG4gIGlmICh3cml0ZXYpIHN0cmVhbS5fd3JpdGV2KGNodW5rLCBzdGF0ZS5vbndyaXRlKTtlbHNlIHN0cmVhbS5fd3JpdGUoY2h1bmssIGVuY29kaW5nLCBzdGF0ZS5vbndyaXRlKTtcbiAgc3RhdGUuc3luYyA9IGZhbHNlO1xufVxuXG5mdW5jdGlvbiBvbndyaXRlRXJyb3Ioc3RyZWFtLCBzdGF0ZSwgc3luYywgZXIsIGNiKSB7XG4gIC0tc3RhdGUucGVuZGluZ2NiO1xuICBpZiAoc3luYykgcHJvY2Vzc05leHRUaWNrKGNiLCBlcik7ZWxzZSBjYihlcik7XG5cbiAgc3RyZWFtLl93cml0YWJsZVN0YXRlLmVycm9yRW1pdHRlZCA9IHRydWU7XG4gIHN0cmVhbS5lbWl0KCdlcnJvcicsIGVyKTtcbn1cblxuZnVuY3Rpb24gb253cml0ZVN0YXRlVXBkYXRlKHN0YXRlKSB7XG4gIHN0YXRlLndyaXRpbmcgPSBmYWxzZTtcbiAgc3RhdGUud3JpdGVjYiA9IG51bGw7XG4gIHN0YXRlLmxlbmd0aCAtPSBzdGF0ZS53cml0ZWxlbjtcbiAgc3RhdGUud3JpdGVsZW4gPSAwO1xufVxuXG5mdW5jdGlvbiBvbndyaXRlKHN0cmVhbSwgZXIpIHtcbiAgdmFyIHN0YXRlID0gc3RyZWFtLl93cml0YWJsZVN0YXRlO1xuICB2YXIgc3luYyA9IHN0YXRlLnN5bmM7XG4gIHZhciBjYiA9IHN0YXRlLndyaXRlY2I7XG5cbiAgb253cml0ZVN0YXRlVXBkYXRlKHN0YXRlKTtcblxuICBpZiAoZXIpIG9ud3JpdGVFcnJvcihzdHJlYW0sIHN0YXRlLCBzeW5jLCBlciwgY2IpO2Vsc2Uge1xuICAgIC8vIENoZWNrIGlmIHdlJ3JlIGFjdHVhbGx5IHJlYWR5IHRvIGZpbmlzaCwgYnV0IGRvbid0IGVtaXQgeWV0XG4gICAgdmFyIGZpbmlzaGVkID0gbmVlZEZpbmlzaChzdGF0ZSk7XG5cbiAgICBpZiAoIWZpbmlzaGVkICYmICFzdGF0ZS5jb3JrZWQgJiYgIXN0YXRlLmJ1ZmZlclByb2Nlc3NpbmcgJiYgc3RhdGUuYnVmZmVyZWRSZXF1ZXN0KSB7XG4gICAgICBjbGVhckJ1ZmZlcihzdHJlYW0sIHN0YXRlKTtcbiAgICB9XG5cbiAgICBpZiAoc3luYykge1xuICAgICAgLyo8cmVwbGFjZW1lbnQ+Ki9cbiAgICAgIGFzeW5jV3JpdGUoYWZ0ZXJXcml0ZSwgc3RyZWFtLCBzdGF0ZSwgZmluaXNoZWQsIGNiKTtcbiAgICAgIC8qPC9yZXBsYWNlbWVudD4qL1xuICAgIH0gZWxzZSB7XG4gICAgICBhZnRlcldyaXRlKHN0cmVhbSwgc3RhdGUsIGZpbmlzaGVkLCBjYik7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGFmdGVyV3JpdGUoc3RyZWFtLCBzdGF0ZSwgZmluaXNoZWQsIGNiKSB7XG4gIGlmICghZmluaXNoZWQpIG9ud3JpdGVEcmFpbihzdHJlYW0sIHN0YXRlKTtcbiAgc3RhdGUucGVuZGluZ2NiLS07XG4gIGNiKCk7XG4gIGZpbmlzaE1heWJlKHN0cmVhbSwgc3RhdGUpO1xufVxuXG4vLyBNdXN0IGZvcmNlIGNhbGxiYWNrIHRvIGJlIGNhbGxlZCBvbiBuZXh0VGljaywgc28gdGhhdCB3ZSBkb24ndFxuLy8gZW1pdCAnZHJhaW4nIGJlZm9yZSB0aGUgd3JpdGUoKSBjb25zdW1lciBnZXRzIHRoZSAnZmFsc2UnIHJldHVyblxuLy8gdmFsdWUsIGFuZCBoYXMgYSBjaGFuY2UgdG8gYXR0YWNoIGEgJ2RyYWluJyBsaXN0ZW5lci5cbmZ1bmN0aW9uIG9ud3JpdGVEcmFpbihzdHJlYW0sIHN0YXRlKSB7XG4gIGlmIChzdGF0ZS5sZW5ndGggPT09IDAgJiYgc3RhdGUubmVlZERyYWluKSB7XG4gICAgc3RhdGUubmVlZERyYWluID0gZmFsc2U7XG4gICAgc3RyZWFtLmVtaXQoJ2RyYWluJyk7XG4gIH1cbn1cblxuLy8gaWYgdGhlcmUncyBzb21ldGhpbmcgaW4gdGhlIGJ1ZmZlciB3YWl0aW5nLCB0aGVuIHByb2Nlc3MgaXRcbmZ1bmN0aW9uIGNsZWFyQnVmZmVyKHN0cmVhbSwgc3RhdGUpIHtcbiAgc3RhdGUuYnVmZmVyUHJvY2Vzc2luZyA9IHRydWU7XG4gIHZhciBlbnRyeSA9IHN0YXRlLmJ1ZmZlcmVkUmVxdWVzdDtcblxuICBpZiAoc3RyZWFtLl93cml0ZXYgJiYgZW50cnkgJiYgZW50cnkubmV4dCkge1xuICAgIC8vIEZhc3QgY2FzZSwgd3JpdGUgZXZlcnl0aGluZyB1c2luZyBfd3JpdGV2KClcbiAgICB2YXIgbCA9IHN0YXRlLmJ1ZmZlcmVkUmVxdWVzdENvdW50O1xuICAgIHZhciBidWZmZXIgPSBuZXcgQXJyYXkobCk7XG4gICAgdmFyIGhvbGRlciA9IHN0YXRlLmNvcmtlZFJlcXVlc3RzRnJlZTtcbiAgICBob2xkZXIuZW50cnkgPSBlbnRyeTtcblxuICAgIHZhciBjb3VudCA9IDA7XG4gICAgd2hpbGUgKGVudHJ5KSB7XG4gICAgICBidWZmZXJbY291bnRdID0gZW50cnk7XG4gICAgICBlbnRyeSA9IGVudHJ5Lm5leHQ7XG4gICAgICBjb3VudCArPSAxO1xuICAgIH1cblxuICAgIGRvV3JpdGUoc3RyZWFtLCBzdGF0ZSwgdHJ1ZSwgc3RhdGUubGVuZ3RoLCBidWZmZXIsICcnLCBob2xkZXIuZmluaXNoKTtcblxuICAgIC8vIGRvV3JpdGUgaXMgYWxtb3N0IGFsd2F5cyBhc3luYywgZGVmZXIgdGhlc2UgdG8gc2F2ZSBhIGJpdCBvZiB0aW1lXG4gICAgLy8gYXMgdGhlIGhvdCBwYXRoIGVuZHMgd2l0aCBkb1dyaXRlXG4gICAgc3RhdGUucGVuZGluZ2NiKys7XG4gICAgc3RhdGUubGFzdEJ1ZmZlcmVkUmVxdWVzdCA9IG51bGw7XG4gICAgaWYgKGhvbGRlci5uZXh0KSB7XG4gICAgICBzdGF0ZS5jb3JrZWRSZXF1ZXN0c0ZyZWUgPSBob2xkZXIubmV4dDtcbiAgICAgIGhvbGRlci5uZXh0ID0gbnVsbDtcbiAgICB9IGVsc2Uge1xuICAgICAgc3RhdGUuY29ya2VkUmVxdWVzdHNGcmVlID0gbmV3IENvcmtlZFJlcXVlc3Qoc3RhdGUpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICAvLyBTbG93IGNhc2UsIHdyaXRlIGNodW5rcyBvbmUtYnktb25lXG4gICAgd2hpbGUgKGVudHJ5KSB7XG4gICAgICB2YXIgY2h1bmsgPSBlbnRyeS5jaHVuaztcbiAgICAgIHZhciBlbmNvZGluZyA9IGVudHJ5LmVuY29kaW5nO1xuICAgICAgdmFyIGNiID0gZW50cnkuY2FsbGJhY2s7XG4gICAgICB2YXIgbGVuID0gc3RhdGUub2JqZWN0TW9kZSA/IDEgOiBjaHVuay5sZW5ndGg7XG5cbiAgICAgIGRvV3JpdGUoc3RyZWFtLCBzdGF0ZSwgZmFsc2UsIGxlbiwgY2h1bmssIGVuY29kaW5nLCBjYik7XG4gICAgICBlbnRyeSA9IGVudHJ5Lm5leHQ7XG4gICAgICAvLyBpZiB3ZSBkaWRuJ3QgY2FsbCB0aGUgb253cml0ZSBpbW1lZGlhdGVseSwgdGhlblxuICAgICAgLy8gaXQgbWVhbnMgdGhhdCB3ZSBuZWVkIHRvIHdhaXQgdW50aWwgaXQgZG9lcy5cbiAgICAgIC8vIGFsc28sIHRoYXQgbWVhbnMgdGhhdCB0aGUgY2h1bmsgYW5kIGNiIGFyZSBjdXJyZW50bHlcbiAgICAgIC8vIGJlaW5nIHByb2Nlc3NlZCwgc28gbW92ZSB0aGUgYnVmZmVyIGNvdW50ZXIgcGFzdCB0aGVtLlxuICAgICAgaWYgKHN0YXRlLndyaXRpbmcpIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGVudHJ5ID09PSBudWxsKSBzdGF0ZS5sYXN0QnVmZmVyZWRSZXF1ZXN0ID0gbnVsbDtcbiAgfVxuXG4gIHN0YXRlLmJ1ZmZlcmVkUmVxdWVzdENvdW50ID0gMDtcbiAgc3RhdGUuYnVmZmVyZWRSZXF1ZXN0ID0gZW50cnk7XG4gIHN0YXRlLmJ1ZmZlclByb2Nlc3NpbmcgPSBmYWxzZTtcbn1cblxuV3JpdGFibGUucHJvdG90eXBlLl93cml0ZSA9IGZ1bmN0aW9uIChjaHVuaywgZW5jb2RpbmcsIGNiKSB7XG4gIGNiKG5ldyBFcnJvcignX3dyaXRlKCkgaXMgbm90IGltcGxlbWVudGVkJykpO1xufTtcblxuV3JpdGFibGUucHJvdG90eXBlLl93cml0ZXYgPSBudWxsO1xuXG5Xcml0YWJsZS5wcm90b3R5cGUuZW5kID0gZnVuY3Rpb24gKGNodW5rLCBlbmNvZGluZywgY2IpIHtcbiAgdmFyIHN0YXRlID0gdGhpcy5fd3JpdGFibGVTdGF0ZTtcblxuICBpZiAodHlwZW9mIGNodW5rID09PSAnZnVuY3Rpb24nKSB7XG4gICAgY2IgPSBjaHVuaztcbiAgICBjaHVuayA9IG51bGw7XG4gICAgZW5jb2RpbmcgPSBudWxsO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBlbmNvZGluZyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGNiID0gZW5jb2Rpbmc7XG4gICAgZW5jb2RpbmcgPSBudWxsO1xuICB9XG5cbiAgaWYgKGNodW5rICE9PSBudWxsICYmIGNodW5rICE9PSB1bmRlZmluZWQpIHRoaXMud3JpdGUoY2h1bmssIGVuY29kaW5nKTtcblxuICAvLyAuZW5kKCkgZnVsbHkgdW5jb3Jrc1xuICBpZiAoc3RhdGUuY29ya2VkKSB7XG4gICAgc3RhdGUuY29ya2VkID0gMTtcbiAgICB0aGlzLnVuY29yaygpO1xuICB9XG5cbiAgLy8gaWdub3JlIHVubmVjZXNzYXJ5IGVuZCgpIGNhbGxzLlxuICBpZiAoIXN0YXRlLmVuZGluZyAmJiAhc3RhdGUuZmluaXNoZWQpIGVuZFdyaXRhYmxlKHRoaXMsIHN0YXRlLCBjYik7XG59O1xuXG5mdW5jdGlvbiBuZWVkRmluaXNoKHN0YXRlKSB7XG4gIHJldHVybiBzdGF0ZS5lbmRpbmcgJiYgc3RhdGUubGVuZ3RoID09PSAwICYmIHN0YXRlLmJ1ZmZlcmVkUmVxdWVzdCA9PT0gbnVsbCAmJiAhc3RhdGUuZmluaXNoZWQgJiYgIXN0YXRlLndyaXRpbmc7XG59XG5cbmZ1bmN0aW9uIHByZWZpbmlzaChzdHJlYW0sIHN0YXRlKSB7XG4gIGlmICghc3RhdGUucHJlZmluaXNoZWQpIHtcbiAgICBzdGF0ZS5wcmVmaW5pc2hlZCA9IHRydWU7XG4gICAgc3RyZWFtLmVtaXQoJ3ByZWZpbmlzaCcpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGZpbmlzaE1heWJlKHN0cmVhbSwgc3RhdGUpIHtcbiAgdmFyIG5lZWQgPSBuZWVkRmluaXNoKHN0YXRlKTtcbiAgaWYgKG5lZWQpIHtcbiAgICBpZiAoc3RhdGUucGVuZGluZ2NiID09PSAwKSB7XG4gICAgICBwcmVmaW5pc2goc3RyZWFtLCBzdGF0ZSk7XG4gICAgICBzdGF0ZS5maW5pc2hlZCA9IHRydWU7XG4gICAgICBzdHJlYW0uZW1pdCgnZmluaXNoJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHByZWZpbmlzaChzdHJlYW0sIHN0YXRlKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG5lZWQ7XG59XG5cbmZ1bmN0aW9uIGVuZFdyaXRhYmxlKHN0cmVhbSwgc3RhdGUsIGNiKSB7XG4gIHN0YXRlLmVuZGluZyA9IHRydWU7XG4gIGZpbmlzaE1heWJlKHN0cmVhbSwgc3RhdGUpO1xuICBpZiAoY2IpIHtcbiAgICBpZiAoc3RhdGUuZmluaXNoZWQpIHByb2Nlc3NOZXh0VGljayhjYik7ZWxzZSBzdHJlYW0ub25jZSgnZmluaXNoJywgY2IpO1xuICB9XG4gIHN0YXRlLmVuZGVkID0gdHJ1ZTtcbiAgc3RyZWFtLndyaXRhYmxlID0gZmFsc2U7XG59XG5cbi8vIEl0IHNlZW1zIGEgbGlua2VkIGxpc3QgYnV0IGl0IGlzIG5vdFxuLy8gdGhlcmUgd2lsbCBiZSBvbmx5IDIgb2YgdGhlc2UgZm9yIGVhY2ggc3RyZWFtXG5mdW5jdGlvbiBDb3JrZWRSZXF1ZXN0KHN0YXRlKSB7XG4gIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgdGhpcy5uZXh0ID0gbnVsbDtcbiAgdGhpcy5lbnRyeSA9IG51bGw7XG4gIHRoaXMuZmluaXNoID0gZnVuY3Rpb24gKGVycikge1xuICAgIHZhciBlbnRyeSA9IF90aGlzLmVudHJ5O1xuICAgIF90aGlzLmVudHJ5ID0gbnVsbDtcbiAgICB3aGlsZSAoZW50cnkpIHtcbiAgICAgIHZhciBjYiA9IGVudHJ5LmNhbGxiYWNrO1xuICAgICAgc3RhdGUucGVuZGluZ2NiLS07XG4gICAgICBjYihlcnIpO1xuICAgICAgZW50cnkgPSBlbnRyeS5uZXh0O1xuICAgIH1cbiAgICBpZiAoc3RhdGUuY29ya2VkUmVxdWVzdHNGcmVlKSB7XG4gICAgICBzdGF0ZS5jb3JrZWRSZXF1ZXN0c0ZyZWUubmV4dCA9IF90aGlzO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdGF0ZS5jb3JrZWRSZXF1ZXN0c0ZyZWUgPSBfdGhpcztcbiAgICB9XG4gIH07XG59IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgQnVmZmVyID0gcmVxdWlyZSgnYnVmZmVyJykuQnVmZmVyO1xuLyo8cmVwbGFjZW1lbnQ+Ki9cbnZhciBidWZmZXJTaGltID0gcmVxdWlyZSgnYnVmZmVyLXNoaW1zJyk7XG4vKjwvcmVwbGFjZW1lbnQ+Ki9cblxubW9kdWxlLmV4cG9ydHMgPSBCdWZmZXJMaXN0O1xuXG5mdW5jdGlvbiBCdWZmZXJMaXN0KCkge1xuICB0aGlzLmhlYWQgPSBudWxsO1xuICB0aGlzLnRhaWwgPSBudWxsO1xuICB0aGlzLmxlbmd0aCA9IDA7XG59XG5cbkJ1ZmZlckxpc3QucHJvdG90eXBlLnB1c2ggPSBmdW5jdGlvbiAodikge1xuICB2YXIgZW50cnkgPSB7IGRhdGE6IHYsIG5leHQ6IG51bGwgfTtcbiAgaWYgKHRoaXMubGVuZ3RoID4gMCkgdGhpcy50YWlsLm5leHQgPSBlbnRyeTtlbHNlIHRoaXMuaGVhZCA9IGVudHJ5O1xuICB0aGlzLnRhaWwgPSBlbnRyeTtcbiAgKyt0aGlzLmxlbmd0aDtcbn07XG5cbkJ1ZmZlckxpc3QucHJvdG90eXBlLnVuc2hpZnQgPSBmdW5jdGlvbiAodikge1xuICB2YXIgZW50cnkgPSB7IGRhdGE6IHYsIG5leHQ6IHRoaXMuaGVhZCB9O1xuICBpZiAodGhpcy5sZW5ndGggPT09IDApIHRoaXMudGFpbCA9IGVudHJ5O1xuICB0aGlzLmhlYWQgPSBlbnRyeTtcbiAgKyt0aGlzLmxlbmd0aDtcbn07XG5cbkJ1ZmZlckxpc3QucHJvdG90eXBlLnNoaWZ0ID0gZnVuY3Rpb24gKCkge1xuICBpZiAodGhpcy5sZW5ndGggPT09IDApIHJldHVybjtcbiAgdmFyIHJldCA9IHRoaXMuaGVhZC5kYXRhO1xuICBpZiAodGhpcy5sZW5ndGggPT09IDEpIHRoaXMuaGVhZCA9IHRoaXMudGFpbCA9IG51bGw7ZWxzZSB0aGlzLmhlYWQgPSB0aGlzLmhlYWQubmV4dDtcbiAgLS10aGlzLmxlbmd0aDtcbiAgcmV0dXJuIHJldDtcbn07XG5cbkJ1ZmZlckxpc3QucHJvdG90eXBlLmNsZWFyID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLmhlYWQgPSB0aGlzLnRhaWwgPSBudWxsO1xuICB0aGlzLmxlbmd0aCA9IDA7XG59O1xuXG5CdWZmZXJMaXN0LnByb3RvdHlwZS5qb2luID0gZnVuY3Rpb24gKHMpIHtcbiAgaWYgKHRoaXMubGVuZ3RoID09PSAwKSByZXR1cm4gJyc7XG4gIHZhciBwID0gdGhpcy5oZWFkO1xuICB2YXIgcmV0ID0gJycgKyBwLmRhdGE7XG4gIHdoaWxlIChwID0gcC5uZXh0KSB7XG4gICAgcmV0ICs9IHMgKyBwLmRhdGE7XG4gIH1yZXR1cm4gcmV0O1xufTtcblxuQnVmZmVyTGlzdC5wcm90b3R5cGUuY29uY2F0ID0gZnVuY3Rpb24gKG4pIHtcbiAgaWYgKHRoaXMubGVuZ3RoID09PSAwKSByZXR1cm4gYnVmZmVyU2hpbS5hbGxvYygwKTtcbiAgaWYgKHRoaXMubGVuZ3RoID09PSAxKSByZXR1cm4gdGhpcy5oZWFkLmRhdGE7XG4gIHZhciByZXQgPSBidWZmZXJTaGltLmFsbG9jVW5zYWZlKG4gPj4+IDApO1xuICB2YXIgcCA9IHRoaXMuaGVhZDtcbiAgdmFyIGkgPSAwO1xuICB3aGlsZSAocCkge1xuICAgIHAuZGF0YS5jb3B5KHJldCwgaSk7XG4gICAgaSArPSBwLmRhdGEubGVuZ3RoO1xuICAgIHAgPSBwLm5leHQ7XG4gIH1cbiAgcmV0dXJuIHJldDtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCdldmVudHMnKS5FdmVudEVtaXR0ZXI7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vcmVhZGFibGUnKS5QYXNzVGhyb3VnaFxuIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9saWIvX3N0cmVhbV9yZWFkYWJsZS5qcycpO1xuZXhwb3J0cy5TdHJlYW0gPSBleHBvcnRzO1xuZXhwb3J0cy5SZWFkYWJsZSA9IGV4cG9ydHM7XG5leHBvcnRzLldyaXRhYmxlID0gcmVxdWlyZSgnLi9saWIvX3N0cmVhbV93cml0YWJsZS5qcycpO1xuZXhwb3J0cy5EdXBsZXggPSByZXF1aXJlKCcuL2xpYi9fc3RyZWFtX2R1cGxleC5qcycpO1xuZXhwb3J0cy5UcmFuc2Zvcm0gPSByZXF1aXJlKCcuL2xpYi9fc3RyZWFtX3RyYW5zZm9ybS5qcycpO1xuZXhwb3J0cy5QYXNzVGhyb3VnaCA9IHJlcXVpcmUoJy4vbGliL19zdHJlYW1fcGFzc3Rocm91Z2guanMnKTtcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9yZWFkYWJsZScpLlRyYW5zZm9ybVxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2xpYi9fc3RyZWFtX3dyaXRhYmxlLmpzJyk7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChzdHJpbmcpIHtcbiAgcmV0dXJuIHN0cmluZy5yZXBsYWNlKC9bLVxcXFxeJCorPy4oKXxbXFxde31dL2csIFwiXFxcXCQmXCIpXG59XG4iLCJ2YXIgaHRtbHBhcnNlciA9IHJlcXVpcmUoJ2h0bWxwYXJzZXIyJyk7XG52YXIgZXh0ZW5kID0gcmVxdWlyZSgneHRlbmQnKTtcbnZhciBxdW90ZVJlZ2V4cCA9IHJlcXVpcmUoJ3JlZ2V4cC1xdW90ZScpO1xuXG5mdW5jdGlvbiBlYWNoKG9iaiwgY2IpIHtcbiAgaWYgKG9iaikgT2JqZWN0LmtleXMob2JqKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICBjYihvYmpba2V5XSwga2V5KTtcbiAgfSk7XG59XG5cbi8vIEF2b2lkIGZhbHNlIHBvc2l0aXZlcyB3aXRoIC5fX3Byb3RvX18sIC5oYXNPd25Qcm9wZXJ0eSwgZXRjLlxuZnVuY3Rpb24gaGFzKG9iaiwga2V5KSB7XG4gIHJldHVybiAoe30pLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBrZXkpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNhbml0aXplSHRtbDtcblxuLy8gSWdub3JlIHRoZSBfcmVjdXJzaW5nIGZsYWc7IGl0J3MgdGhlcmUgZm9yIHJlY3Vyc2l2ZVxuLy8gaW52b2NhdGlvbiBhcyBhIGd1YXJkIGFnYWluc3QgdGhpcyBleHBsb2l0OlxuLy8gaHR0cHM6Ly9naXRodWIuY29tL2ZiNTUvaHRtbHBhcnNlcjIvaXNzdWVzLzEwNVxuXG5mdW5jdGlvbiBzYW5pdGl6ZUh0bWwoaHRtbCwgb3B0aW9ucywgX3JlY3Vyc2luZykge1xuICB2YXIgcmVzdWx0ID0gJyc7XG5cbiAgZnVuY3Rpb24gRnJhbWUodGFnLCBhdHRyaWJzKSB7XG4gICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgIHRoaXMudGFnID0gdGFnO1xuICAgIHRoaXMuYXR0cmlicyA9IGF0dHJpYnMgfHwge307XG4gICAgdGhpcy50YWdQb3NpdGlvbiA9IHJlc3VsdC5sZW5ndGg7XG4gICAgdGhpcy50ZXh0ID0gJyc7IC8vIE5vZGUgaW5uZXIgdGV4dFxuXG4gICAgdGhpcy51cGRhdGVQYXJlbnROb2RlVGV4dCA9IGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKHN0YWNrLmxlbmd0aCkge1xuICAgICAgICAgIHZhciBwYXJlbnRGcmFtZSA9IHN0YWNrW3N0YWNrLmxlbmd0aCAtIDFdO1xuICAgICAgICAgIHBhcmVudEZyYW1lLnRleHQgKz0gdGhhdC50ZXh0O1xuICAgICAgfVxuICAgIH07XG4gIH1cblxuICBpZiAoIW9wdGlvbnMpIHtcbiAgICBvcHRpb25zID0gc2FuaXRpemVIdG1sLmRlZmF1bHRzO1xuICAgIG9wdGlvbnMucGFyc2VyID0gaHRtbFBhcnNlckRlZmF1bHRzO1xuICB9IGVsc2Uge1xuICAgIG9wdGlvbnMgPSBleHRlbmQoc2FuaXRpemVIdG1sLmRlZmF1bHRzLCBvcHRpb25zKTtcbiAgICBpZiAob3B0aW9ucy5wYXJzZXIpIHtcbiAgICAgIG9wdGlvbnMucGFyc2VyID0gZXh0ZW5kKGh0bWxQYXJzZXJEZWZhdWx0cywgb3B0aW9ucy5wYXJzZXIpO1xuICAgIH0gZWxzZSB7XG4gICAgICBvcHRpb25zLnBhcnNlciA9IGh0bWxQYXJzZXJEZWZhdWx0cztcbiAgICB9XG4gIH1cblxuICAvLyBUYWdzIHRoYXQgY29udGFpbiBzb21ldGhpbmcgb3RoZXIgdGhhbiBIVE1MLCBvciB3aGVyZSBkaXNjYXJkaW5nXG4gIC8vIHRoZSB0ZXh0IHdoZW4gdGhlIHRhZyBpcyBkaXNhbGxvd2VkIG1ha2VzIHNlbnNlIGZvciBvdGhlciByZWFzb25zLlxuICAvLyBJZiB3ZSBhcmUgbm90IGFsbG93aW5nIHRoZXNlIHRhZ3MsIHdlIHNob3VsZCBkcm9wIHRoZWlyIGNvbnRlbnQgdG9vLlxuICAvLyBGb3Igb3RoZXIgdGFncyB5b3Ugd291bGQgZHJvcCB0aGUgdGFnIGJ1dCBrZWVwIGl0cyBjb250ZW50LlxuICB2YXIgbm9uVGV4dFRhZ3NBcnJheSA9IG9wdGlvbnMubm9uVGV4dFRhZ3MgfHwgWyAnc2NyaXB0JywgJ3N0eWxlJywgJ3RleHRhcmVhJyBdO1xuICB2YXIgYWxsb3dlZEF0dHJpYnV0ZXNNYXA7XG4gIHZhciBhbGxvd2VkQXR0cmlidXRlc0dsb2JNYXA7XG4gIGlmKG9wdGlvbnMuYWxsb3dlZEF0dHJpYnV0ZXMpIHtcbiAgICBhbGxvd2VkQXR0cmlidXRlc01hcCA9IHt9O1xuICAgIGFsbG93ZWRBdHRyaWJ1dGVzR2xvYk1hcCA9IHt9O1xuICAgIGVhY2gob3B0aW9ucy5hbGxvd2VkQXR0cmlidXRlcywgZnVuY3Rpb24oYXR0cmlidXRlcywgdGFnKSB7XG4gICAgICBhbGxvd2VkQXR0cmlidXRlc01hcFt0YWddID0gW107XG4gICAgICB2YXIgZ2xvYlJlZ2V4ID0gW107XG4gICAgICBhdHRyaWJ1dGVzLmZvckVhY2goZnVuY3Rpb24obmFtZSkge1xuICAgICAgICBpZihuYW1lLmluZGV4T2YoJyonKSA+PSAwKSB7XG4gICAgICAgICAgZ2xvYlJlZ2V4LnB1c2gocXVvdGVSZWdleHAobmFtZSkucmVwbGFjZSgvXFxcXFxcKi9nLCAnLionKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgYWxsb3dlZEF0dHJpYnV0ZXNNYXBbdGFnXS5wdXNoKG5hbWUpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIGFsbG93ZWRBdHRyaWJ1dGVzR2xvYk1hcFt0YWddID0gbmV3IFJlZ0V4cCgnXignICsgZ2xvYlJlZ2V4LmpvaW4oJ3wnKSArICcpJCcpO1xuICAgIH0pO1xuICB9XG4gIHZhciBhbGxvd2VkQ2xhc3Nlc01hcCA9IHt9O1xuICBlYWNoKG9wdGlvbnMuYWxsb3dlZENsYXNzZXMsIGZ1bmN0aW9uKGNsYXNzZXMsIHRhZykge1xuICAgIC8vIEltcGxpY2l0bHkgYWxsb3dzIHRoZSBjbGFzcyBhdHRyaWJ1dGVcbiAgICBpZihhbGxvd2VkQXR0cmlidXRlc01hcCkge1xuICAgICAgaWYgKCFoYXMoYWxsb3dlZEF0dHJpYnV0ZXNNYXAsIHRhZykpIHtcbiAgICAgICAgYWxsb3dlZEF0dHJpYnV0ZXNNYXBbdGFnXSA9IFtdO1xuICAgICAgfVxuICAgICAgYWxsb3dlZEF0dHJpYnV0ZXNNYXBbdGFnXS5wdXNoKCdjbGFzcycpO1xuICAgIH1cblxuICAgIGFsbG93ZWRDbGFzc2VzTWFwW3RhZ10gPSBjbGFzc2VzO1xuICB9KTtcblxuICB2YXIgdHJhbnNmb3JtVGFnc01hcCA9IHt9O1xuICB2YXIgdHJhbnNmb3JtVGFnc0FsbDtcbiAgZWFjaChvcHRpb25zLnRyYW5zZm9ybVRhZ3MsIGZ1bmN0aW9uKHRyYW5zZm9ybSwgdGFnKSB7XG4gICAgdmFyIHRyYW5zRnVuO1xuICAgIGlmICh0eXBlb2YgdHJhbnNmb3JtID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICB0cmFuc0Z1biA9IHRyYW5zZm9ybTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiB0cmFuc2Zvcm0gPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIHRyYW5zRnVuID0gc2FuaXRpemVIdG1sLnNpbXBsZVRyYW5zZm9ybSh0cmFuc2Zvcm0pO1xuICAgIH1cbiAgICBpZiAodGFnID09PSAnKicpIHtcbiAgICAgIHRyYW5zZm9ybVRhZ3NBbGwgPSB0cmFuc0Z1bjtcbiAgICB9IGVsc2Uge1xuICAgICAgdHJhbnNmb3JtVGFnc01hcFt0YWddID0gdHJhbnNGdW47XG4gICAgfVxuICB9KTtcblxuICB2YXIgZGVwdGggPSAwO1xuICB2YXIgc3RhY2sgPSBbXTtcbiAgdmFyIHNraXBNYXAgPSB7fTtcbiAgdmFyIHRyYW5zZm9ybU1hcCA9IHt9O1xuICB2YXIgc2tpcFRleHQgPSBmYWxzZTtcbiAgdmFyIHNraXBUZXh0RGVwdGggPSAwO1xuXG4gIHZhciBwYXJzZXIgPSBuZXcgaHRtbHBhcnNlci5QYXJzZXIoe1xuICAgIG9ub3BlbnRhZzogZnVuY3Rpb24obmFtZSwgYXR0cmlicykge1xuICAgICAgaWYgKHNraXBUZXh0KSB7XG4gICAgICAgIHNraXBUZXh0RGVwdGgrKztcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgdmFyIGZyYW1lID0gbmV3IEZyYW1lKG5hbWUsIGF0dHJpYnMpO1xuICAgICAgc3RhY2sucHVzaChmcmFtZSk7XG5cbiAgICAgIHZhciBza2lwID0gZmFsc2U7XG4gICAgICB2YXIgaGFzVGV4dCA9IGZyYW1lLnRleHQgPyB0cnVlIDogZmFsc2U7XG4gICAgICB2YXIgdHJhbnNmb3JtZWRUYWc7XG4gICAgICBpZiAoaGFzKHRyYW5zZm9ybVRhZ3NNYXAsIG5hbWUpKSB7XG4gICAgICAgIHRyYW5zZm9ybWVkVGFnID0gdHJhbnNmb3JtVGFnc01hcFtuYW1lXShuYW1lLCBhdHRyaWJzKTtcblxuICAgICAgICBmcmFtZS5hdHRyaWJzID0gYXR0cmlicyA9IHRyYW5zZm9ybWVkVGFnLmF0dHJpYnM7XG5cbiAgICAgICAgaWYgKHRyYW5zZm9ybWVkVGFnLnRleHQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIGZyYW1lLmlubmVyVGV4dCA9IHRyYW5zZm9ybWVkVGFnLnRleHQ7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobmFtZSAhPT0gdHJhbnNmb3JtZWRUYWcudGFnTmFtZSkge1xuICAgICAgICAgIGZyYW1lLm5hbWUgPSBuYW1lID0gdHJhbnNmb3JtZWRUYWcudGFnTmFtZTtcbiAgICAgICAgICB0cmFuc2Zvcm1NYXBbZGVwdGhdID0gdHJhbnNmb3JtZWRUYWcudGFnTmFtZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHRyYW5zZm9ybVRhZ3NBbGwpIHtcbiAgICAgICAgdHJhbnNmb3JtZWRUYWcgPSB0cmFuc2Zvcm1UYWdzQWxsKG5hbWUsIGF0dHJpYnMpO1xuXG4gICAgICAgIGZyYW1lLmF0dHJpYnMgPSBhdHRyaWJzID0gdHJhbnNmb3JtZWRUYWcuYXR0cmlicztcbiAgICAgICAgaWYgKG5hbWUgIT09IHRyYW5zZm9ybWVkVGFnLnRhZ05hbWUpIHtcbiAgICAgICAgICBmcmFtZS5uYW1lID0gbmFtZSA9IHRyYW5zZm9ybWVkVGFnLnRhZ05hbWU7XG4gICAgICAgICAgdHJhbnNmb3JtTWFwW2RlcHRoXSA9IHRyYW5zZm9ybWVkVGFnLnRhZ05hbWU7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKG9wdGlvbnMuYWxsb3dlZFRhZ3MgJiYgb3B0aW9ucy5hbGxvd2VkVGFncy5pbmRleE9mKG5hbWUpID09PSAtMSkge1xuICAgICAgICBza2lwID0gdHJ1ZTtcbiAgICAgICAgaWYgKG5vblRleHRUYWdzQXJyYXkuaW5kZXhPZihuYW1lKSAhPT0gLTEpIHtcbiAgICAgICAgICBza2lwVGV4dCA9IHRydWU7XG4gICAgICAgICAgc2tpcFRleHREZXB0aCA9IDE7XG4gICAgICAgIH1cbiAgICAgICAgc2tpcE1hcFtkZXB0aF0gPSB0cnVlO1xuICAgICAgfVxuICAgICAgZGVwdGgrKztcbiAgICAgIGlmIChza2lwKSB7XG4gICAgICAgIC8vIFdlIHdhbnQgdGhlIGNvbnRlbnRzIGJ1dCBub3QgdGhpcyB0YWdcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgcmVzdWx0ICs9ICc8JyArIG5hbWU7XG4gICAgICBpZiAoIWFsbG93ZWRBdHRyaWJ1dGVzTWFwIHx8IGhhcyhhbGxvd2VkQXR0cmlidXRlc01hcCwgbmFtZSkgfHwgYWxsb3dlZEF0dHJpYnV0ZXNNYXBbJyonXSkge1xuICAgICAgICBlYWNoKGF0dHJpYnMsIGZ1bmN0aW9uKHZhbHVlLCBhKSB7XG4gICAgICAgICAgaWYgKCFhbGxvd2VkQXR0cmlidXRlc01hcCB8fFxuICAgICAgICAgICAgICAoaGFzKGFsbG93ZWRBdHRyaWJ1dGVzTWFwLCBuYW1lKSAmJiBhbGxvd2VkQXR0cmlidXRlc01hcFtuYW1lXS5pbmRleE9mKGEpICE9PSAtMSApIHx8XG4gICAgICAgICAgICAgIChhbGxvd2VkQXR0cmlidXRlc01hcFsnKiddICYmIGFsbG93ZWRBdHRyaWJ1dGVzTWFwWycqJ10uaW5kZXhPZihhKSAhPT0gLTEgKSB8fFxuICAgICAgICAgICAgICAoaGFzKGFsbG93ZWRBdHRyaWJ1dGVzR2xvYk1hcCwgbmFtZSkgJiYgYWxsb3dlZEF0dHJpYnV0ZXNHbG9iTWFwW25hbWVdLnRlc3QoYSkpIHx8XG4gICAgICAgICAgICAgIChhbGxvd2VkQXR0cmlidXRlc0dsb2JNYXBbJyonXSAmJiBhbGxvd2VkQXR0cmlidXRlc0dsb2JNYXBbJyonXS50ZXN0KGEpKSkge1xuICAgICAgICAgICAgaWYgKChhID09PSAnaHJlZicpIHx8IChhID09PSAnc3JjJykpIHtcbiAgICAgICAgICAgICAgaWYgKG5hdWdodHlIcmVmKG5hbWUsIHZhbHVlKSkge1xuICAgICAgICAgICAgICAgIGRlbGV0ZSBmcmFtZS5hdHRyaWJzW2FdO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGEgPT09ICdjbGFzcycpIHtcbiAgICAgICAgICAgICAgdmFsdWUgPSBmaWx0ZXJDbGFzc2VzKHZhbHVlLCBhbGxvd2VkQ2xhc3Nlc01hcFtuYW1lXSk7XG4gICAgICAgICAgICAgIGlmICghdmFsdWUubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgZGVsZXRlIGZyYW1lLmF0dHJpYnNbYV07XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXN1bHQgKz0gJyAnICsgYTtcbiAgICAgICAgICAgIGlmICh2YWx1ZS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgcmVzdWx0ICs9ICc9XCInICsgZXNjYXBlSHRtbCh2YWx1ZSkgKyAnXCInO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkZWxldGUgZnJhbWUuYXR0cmlic1thXTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgaWYgKG9wdGlvbnMuc2VsZkNsb3NpbmcuaW5kZXhPZihuYW1lKSAhPT0gLTEpIHtcbiAgICAgICAgcmVzdWx0ICs9IFwiIC8+XCI7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXN1bHQgKz0gXCI+XCI7XG4gICAgICAgIGlmIChmcmFtZS5pbm5lclRleHQgJiYgIWhhc1RleHQgJiYgIW9wdGlvbnMudGV4dEZpbHRlcikge1xuICAgICAgICAgIHJlc3VsdCArPSBmcmFtZS5pbm5lclRleHQ7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIG9udGV4dDogZnVuY3Rpb24odGV4dCkge1xuICAgICAgaWYgKHNraXBUZXh0KSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHZhciBsYXN0RnJhbWUgPSBzdGFja1tzdGFjay5sZW5ndGgtMV07XG4gICAgICB2YXIgdGFnO1xuXG4gICAgICBpZiAobGFzdEZyYW1lKSB7XG4gICAgICAgIHRhZyA9IGxhc3RGcmFtZS50YWc7XG4gICAgICAgIC8vIElmIGlubmVyIHRleHQgd2FzIHNldCBieSB0cmFuc2Zvcm0gZnVuY3Rpb24gdGhlbiBsZXQncyB1c2UgaXRcbiAgICAgICAgdGV4dCA9IGxhc3RGcmFtZS5pbm5lclRleHQgIT09IHVuZGVmaW5lZCA/IGxhc3RGcmFtZS5pbm5lclRleHQgOiB0ZXh0O1xuICAgICAgfVxuXG4gICAgICBpZiAoKHRhZyA9PT0gJ3NjcmlwdCcpIHx8ICh0YWcgPT09ICdzdHlsZScpKSB7XG4gICAgICAgIC8vIGh0bWxwYXJzZXIyIGdpdmVzIHVzIHRoZXNlIGFzLWlzLiBFc2NhcGluZyB0aGVtIHJ1aW5zIHRoZSBjb250ZW50LiBBbGxvd2luZ1xuICAgICAgICAvLyBzY3JpcHQgdGFncyBpcywgYnkgZGVmaW5pdGlvbiwgZ2FtZSBvdmVyIGZvciBYU1MgcHJvdGVjdGlvbiwgc28gaWYgdGhhdCdzXG4gICAgICAgIC8vIHlvdXIgY29uY2VybiwgZG9uJ3QgYWxsb3cgdGhlbS4gVGhlIHNhbWUgaXMgZXNzZW50aWFsbHkgdHJ1ZSBmb3Igc3R5bGUgdGFnc1xuICAgICAgICAvLyB3aGljaCBoYXZlIHRoZWlyIG93biBjb2xsZWN0aW9uIG9mIFhTUyB2ZWN0b3JzLlxuICAgICAgICByZXN1bHQgKz0gdGV4dDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciBlc2NhcGVkID0gZXNjYXBlSHRtbCh0ZXh0KTtcbiAgICAgICAgaWYgKG9wdGlvbnMudGV4dEZpbHRlcikge1xuICAgICAgICAgIHJlc3VsdCArPSBvcHRpb25zLnRleHRGaWx0ZXIoZXNjYXBlZCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmVzdWx0ICs9IGVzY2FwZWQ7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChzdGFjay5sZW5ndGgpIHtcbiAgICAgICAgICAgdmFyIGZyYW1lID0gc3RhY2tbc3RhY2subGVuZ3RoIC0gMV07XG4gICAgICAgICAgIGZyYW1lLnRleHQgKz0gdGV4dDtcbiAgICAgIH1cbiAgICB9LFxuICAgIG9uY2xvc2V0YWc6IGZ1bmN0aW9uKG5hbWUpIHtcblxuICAgICAgaWYgKHNraXBUZXh0KSB7XG4gICAgICAgIHNraXBUZXh0RGVwdGgtLTtcbiAgICAgICAgaWYgKCFza2lwVGV4dERlcHRoKSB7XG4gICAgICAgICAgc2tpcFRleHQgPSBmYWxzZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdmFyIGZyYW1lID0gc3RhY2sucG9wKCk7XG4gICAgICBpZiAoIWZyYW1lKSB7XG4gICAgICAgIC8vIERvIG5vdCBjcmFzaCBvbiBiYWQgbWFya3VwXG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHNraXBUZXh0ID0gZmFsc2U7XG4gICAgICBkZXB0aC0tO1xuICAgICAgaWYgKHNraXBNYXBbZGVwdGhdKSB7XG4gICAgICAgIGRlbGV0ZSBza2lwTWFwW2RlcHRoXTtcbiAgICAgICAgZnJhbWUudXBkYXRlUGFyZW50Tm9kZVRleHQoKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAodHJhbnNmb3JtTWFwW2RlcHRoXSkge1xuICAgICAgICBuYW1lID0gdHJhbnNmb3JtTWFwW2RlcHRoXTtcbiAgICAgICAgZGVsZXRlIHRyYW5zZm9ybU1hcFtkZXB0aF07XG4gICAgICB9XG5cbiAgICAgIGlmIChvcHRpb25zLmV4Y2x1c2l2ZUZpbHRlciAmJiBvcHRpb25zLmV4Y2x1c2l2ZUZpbHRlcihmcmFtZSkpIHtcbiAgICAgICAgIHJlc3VsdCA9IHJlc3VsdC5zdWJzdHIoMCwgZnJhbWUudGFnUG9zaXRpb24pO1xuICAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBmcmFtZS51cGRhdGVQYXJlbnROb2RlVGV4dCgpO1xuXG4gICAgICBpZiAob3B0aW9ucy5zZWxmQ2xvc2luZy5pbmRleE9mKG5hbWUpICE9PSAtMSkge1xuICAgICAgICAgLy8gQWxyZWFkeSBvdXRwdXQgLz5cbiAgICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgcmVzdWx0ICs9IFwiPC9cIiArIG5hbWUgKyBcIj5cIjtcbiAgICB9XG4gIH0sIG9wdGlvbnMucGFyc2VyKTtcbiAgcGFyc2VyLndyaXRlKGh0bWwpO1xuICBwYXJzZXIuZW5kKCk7XG5cbiAgcmV0dXJuIHJlc3VsdDtcblxuICBmdW5jdGlvbiBlc2NhcGVIdG1sKHMpIHtcbiAgICBpZiAodHlwZW9mKHMpICE9PSAnc3RyaW5nJykge1xuICAgICAgcyA9IHMgKyAnJztcbiAgICB9XG4gICAgcmV0dXJuIHMucmVwbGFjZSgvXFwmL2csICcmYW1wOycpLnJlcGxhY2UoLzwvZywgJyZsdDsnKS5yZXBsYWNlKC9cXD4vZywgJyZndDsnKS5yZXBsYWNlKC9cXFwiL2csICcmcXVvdDsnKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIG5hdWdodHlIcmVmKG5hbWUsIGhyZWYpIHtcbiAgICAvLyBCcm93c2VycyBpZ25vcmUgY2hhcmFjdGVyIGNvZGVzIG9mIDMyIChzcGFjZSkgYW5kIGJlbG93IGluIGEgc3VycHJpc2luZ1xuICAgIC8vIG51bWJlciBvZiBzaXR1YXRpb25zLiBTdGFydCByZWFkaW5nIGhlcmU6XG4gICAgLy8gaHR0cHM6Ly93d3cub3dhc3Aub3JnL2luZGV4LnBocC9YU1NfRmlsdGVyX0V2YXNpb25fQ2hlYXRfU2hlZXQjRW1iZWRkZWRfdGFiXG4gICAgaHJlZiA9IGhyZWYucmVwbGFjZSgvW1xceDAwLVxceDIwXSsvZywgJycpO1xuICAgIC8vIENsb2JiZXIgYW55IGNvbW1lbnRzIGluIFVSTHMsIHdoaWNoIHRoZSBicm93c2VyIG1pZ2h0XG4gICAgLy8gaW50ZXJwcmV0IGluc2lkZSBhbiBYTUwgZGF0YSBpc2xhbmQsIGFsbG93aW5nXG4gICAgLy8gYSBqYXZhc2NyaXB0OiBVUkwgdG8gYmUgc251Y2sgdGhyb3VnaFxuICAgIGhyZWYgPSBocmVmLnJlcGxhY2UoLzxcXCFcXC1cXC0uKj9cXC1cXC1cXD4vZywgJycpO1xuICAgIC8vIENhc2UgaW5zZW5zaXRpdmUgc28gd2UgZG9uJ3QgZ2V0IGZha2VkIG91dCBieSBKQVZBU0NSSVBUICMxXG4gICAgdmFyIG1hdGNoZXMgPSBocmVmLm1hdGNoKC9eKFthLXpBLVpdKylcXDovKTtcbiAgICBpZiAoIW1hdGNoZXMpIHtcbiAgICAgIC8vIFByb3RvY29sLXJlbGF0aXZlIFVSTDogXCIvL3NvbWUuZXZpbC5jb20vbmFzdHlcIlxuICAgICAgaWYgKGhyZWYubWF0Y2goL15cXC9cXC8vKSkge1xuICAgICAgICByZXR1cm4gIW9wdGlvbnMuYWxsb3dQcm90b2NvbFJlbGF0aXZlO1xuICAgICAgfVxuXG4gICAgICAvLyBObyBzY2hlbWVcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgdmFyIHNjaGVtZSA9IG1hdGNoZXNbMV0udG9Mb3dlckNhc2UoKTtcblxuICAgIGlmIChoYXMob3B0aW9ucy5hbGxvd2VkU2NoZW1lc0J5VGFnLCBuYW1lKSkge1xuICAgICAgcmV0dXJuIG9wdGlvbnMuYWxsb3dlZFNjaGVtZXNCeVRhZ1tuYW1lXS5pbmRleE9mKHNjaGVtZSkgPT09IC0xO1xuICAgIH1cblxuICAgIHJldHVybiAhb3B0aW9ucy5hbGxvd2VkU2NoZW1lcyB8fCBvcHRpb25zLmFsbG93ZWRTY2hlbWVzLmluZGV4T2Yoc2NoZW1lKSA9PT0gLTE7XG4gIH1cblxuICBmdW5jdGlvbiBmaWx0ZXJDbGFzc2VzKGNsYXNzZXMsIGFsbG93ZWQpIHtcbiAgICBpZiAoIWFsbG93ZWQpIHtcbiAgICAgIC8vIFRoZSBjbGFzcyBhdHRyaWJ1dGUgaXMgYWxsb3dlZCB3aXRob3V0IGZpbHRlcmluZyBvbiB0aGlzIHRhZ1xuICAgICAgcmV0dXJuIGNsYXNzZXM7XG4gICAgfVxuICAgIGNsYXNzZXMgPSBjbGFzc2VzLnNwbGl0KC9cXHMrLyk7XG4gICAgcmV0dXJuIGNsYXNzZXMuZmlsdGVyKGZ1bmN0aW9uKGNsc3MpIHtcbiAgICAgIHJldHVybiBhbGxvd2VkLmluZGV4T2YoY2xzcykgIT09IC0xO1xuICAgIH0pLmpvaW4oJyAnKTtcbiAgfVxufVxuXG4vLyBEZWZhdWx0cyBhcmUgYWNjZXNzaWJsZSB0byB5b3Ugc28gdGhhdCB5b3UgY2FuIHVzZSB0aGVtIGFzIGEgc3RhcnRpbmcgcG9pbnRcbi8vIHByb2dyYW1tYXRpY2FsbHkgaWYgeW91IHdpc2hcblxudmFyIGh0bWxQYXJzZXJEZWZhdWx0cyA9IHtcbiAgZGVjb2RlRW50aXRpZXM6IHRydWVcbn07XG5zYW5pdGl6ZUh0bWwuZGVmYXVsdHMgPSB7XG4gIGFsbG93ZWRUYWdzOiBbICdoMycsICdoNCcsICdoNScsICdoNicsICdibG9ja3F1b3RlJywgJ3AnLCAnYScsICd1bCcsICdvbCcsXG4gICAgJ25sJywgJ2xpJywgJ2InLCAnaScsICdzdHJvbmcnLCAnZW0nLCAnc3RyaWtlJywgJ2NvZGUnLCAnaHInLCAnYnInLCAnZGl2JyxcbiAgICAndGFibGUnLCAndGhlYWQnLCAnY2FwdGlvbicsICd0Ym9keScsICd0cicsICd0aCcsICd0ZCcsICdwcmUnIF0sXG4gIGFsbG93ZWRBdHRyaWJ1dGVzOiB7XG4gICAgYTogWyAnaHJlZicsICduYW1lJywgJ3RhcmdldCcgXSxcbiAgICAvLyBXZSBkb24ndCBjdXJyZW50bHkgYWxsb3cgaW1nIGl0c2VsZiBieSBkZWZhdWx0LCBidXQgdGhpc1xuICAgIC8vIHdvdWxkIG1ha2Ugc2Vuc2UgaWYgd2UgZGlkXG4gICAgaW1nOiBbICdzcmMnIF1cbiAgfSxcbiAgLy8gTG90cyBvZiB0aGVzZSB3b24ndCBjb21lIHVwIGJ5IGRlZmF1bHQgYmVjYXVzZSB3ZSBkb24ndCBhbGxvdyB0aGVtXG4gIHNlbGZDbG9zaW5nOiBbICdpbWcnLCAnYnInLCAnaHInLCAnYXJlYScsICdiYXNlJywgJ2Jhc2Vmb250JywgJ2lucHV0JywgJ2xpbmsnLCAnbWV0YScgXSxcbiAgLy8gVVJMIHNjaGVtZXMgd2UgcGVybWl0XG4gIGFsbG93ZWRTY2hlbWVzOiBbICdodHRwJywgJ2h0dHBzJywgJ2Z0cCcsICdtYWlsdG8nIF0sXG4gIGFsbG93ZWRTY2hlbWVzQnlUYWc6IHt9LFxuICBhbGxvd1Byb3RvY29sUmVsYXRpdmU6IHRydWVcbn07XG5cbnNhbml0aXplSHRtbC5zaW1wbGVUcmFuc2Zvcm0gPSBmdW5jdGlvbihuZXdUYWdOYW1lLCBuZXdBdHRyaWJzLCBtZXJnZSkge1xuICBtZXJnZSA9IChtZXJnZSA9PT0gdW5kZWZpbmVkKSA/IHRydWUgOiBtZXJnZTtcbiAgbmV3QXR0cmlicyA9IG5ld0F0dHJpYnMgfHwge307XG5cbiAgcmV0dXJuIGZ1bmN0aW9uKHRhZ05hbWUsIGF0dHJpYnMpIHtcbiAgICB2YXIgYXR0cmliO1xuICAgIGlmIChtZXJnZSkge1xuICAgICAgZm9yIChhdHRyaWIgaW4gbmV3QXR0cmlicykge1xuICAgICAgICBhdHRyaWJzW2F0dHJpYl0gPSBuZXdBdHRyaWJzW2F0dHJpYl07XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGF0dHJpYnMgPSBuZXdBdHRyaWJzO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICB0YWdOYW1lOiBuZXdUYWdOYW1lLFxuICAgICAgYXR0cmliczogYXR0cmlic1xuICAgIH07XG4gIH07XG59O1xuIiwiLy8gQ29weXJpZ2h0IEpveWVudCwgSW5jLiBhbmQgb3RoZXIgTm9kZSBjb250cmlidXRvcnMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGFcbi8vIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGVcbi8vIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZ1xuLy8gd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLFxuLy8gZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdFxuLy8gcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlXG4vLyBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZFxuLy8gaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTU1xuLy8gT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRlxuLy8gTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTlxuLy8gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sXG4vLyBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1Jcbi8vIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEVcbi8vIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG5cbm1vZHVsZS5leHBvcnRzID0gU3RyZWFtO1xuXG52YXIgRUUgPSByZXF1aXJlKCdldmVudHMnKS5FdmVudEVtaXR0ZXI7XG52YXIgaW5oZXJpdHMgPSByZXF1aXJlKCdpbmhlcml0cycpO1xuXG5pbmhlcml0cyhTdHJlYW0sIEVFKTtcblN0cmVhbS5SZWFkYWJsZSA9IHJlcXVpcmUoJ3JlYWRhYmxlLXN0cmVhbS9yZWFkYWJsZS5qcycpO1xuU3RyZWFtLldyaXRhYmxlID0gcmVxdWlyZSgncmVhZGFibGUtc3RyZWFtL3dyaXRhYmxlLmpzJyk7XG5TdHJlYW0uRHVwbGV4ID0gcmVxdWlyZSgncmVhZGFibGUtc3RyZWFtL2R1cGxleC5qcycpO1xuU3RyZWFtLlRyYW5zZm9ybSA9IHJlcXVpcmUoJ3JlYWRhYmxlLXN0cmVhbS90cmFuc2Zvcm0uanMnKTtcblN0cmVhbS5QYXNzVGhyb3VnaCA9IHJlcXVpcmUoJ3JlYWRhYmxlLXN0cmVhbS9wYXNzdGhyb3VnaC5qcycpO1xuXG4vLyBCYWNrd2FyZHMtY29tcGF0IHdpdGggbm9kZSAwLjQueFxuU3RyZWFtLlN0cmVhbSA9IFN0cmVhbTtcblxuXG5cbi8vIG9sZC1zdHlsZSBzdHJlYW1zLiAgTm90ZSB0aGF0IHRoZSBwaXBlIG1ldGhvZCAodGhlIG9ubHkgcmVsZXZhbnRcbi8vIHBhcnQgb2YgdGhpcyBjbGFzcykgaXMgb3ZlcnJpZGRlbiBpbiB0aGUgUmVhZGFibGUgY2xhc3MuXG5cbmZ1bmN0aW9uIFN0cmVhbSgpIHtcbiAgRUUuY2FsbCh0aGlzKTtcbn1cblxuU3RyZWFtLnByb3RvdHlwZS5waXBlID0gZnVuY3Rpb24oZGVzdCwgb3B0aW9ucykge1xuICB2YXIgc291cmNlID0gdGhpcztcblxuICBmdW5jdGlvbiBvbmRhdGEoY2h1bmspIHtcbiAgICBpZiAoZGVzdC53cml0YWJsZSkge1xuICAgICAgaWYgKGZhbHNlID09PSBkZXN0LndyaXRlKGNodW5rKSAmJiBzb3VyY2UucGF1c2UpIHtcbiAgICAgICAgc291cmNlLnBhdXNlKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgc291cmNlLm9uKCdkYXRhJywgb25kYXRhKTtcblxuICBmdW5jdGlvbiBvbmRyYWluKCkge1xuICAgIGlmIChzb3VyY2UucmVhZGFibGUgJiYgc291cmNlLnJlc3VtZSkge1xuICAgICAgc291cmNlLnJlc3VtZSgpO1xuICAgIH1cbiAgfVxuXG4gIGRlc3Qub24oJ2RyYWluJywgb25kcmFpbik7XG5cbiAgLy8gSWYgdGhlICdlbmQnIG9wdGlvbiBpcyBub3Qgc3VwcGxpZWQsIGRlc3QuZW5kKCkgd2lsbCBiZSBjYWxsZWQgd2hlblxuICAvLyBzb3VyY2UgZ2V0cyB0aGUgJ2VuZCcgb3IgJ2Nsb3NlJyBldmVudHMuICBPbmx5IGRlc3QuZW5kKCkgb25jZS5cbiAgaWYgKCFkZXN0Ll9pc1N0ZGlvICYmICghb3B0aW9ucyB8fCBvcHRpb25zLmVuZCAhPT0gZmFsc2UpKSB7XG4gICAgc291cmNlLm9uKCdlbmQnLCBvbmVuZCk7XG4gICAgc291cmNlLm9uKCdjbG9zZScsIG9uY2xvc2UpO1xuICB9XG5cbiAgdmFyIGRpZE9uRW5kID0gZmFsc2U7XG4gIGZ1bmN0aW9uIG9uZW5kKCkge1xuICAgIGlmIChkaWRPbkVuZCkgcmV0dXJuO1xuICAgIGRpZE9uRW5kID0gdHJ1ZTtcblxuICAgIGRlc3QuZW5kKCk7XG4gIH1cblxuXG4gIGZ1bmN0aW9uIG9uY2xvc2UoKSB7XG4gICAgaWYgKGRpZE9uRW5kKSByZXR1cm47XG4gICAgZGlkT25FbmQgPSB0cnVlO1xuXG4gICAgaWYgKHR5cGVvZiBkZXN0LmRlc3Ryb3kgPT09ICdmdW5jdGlvbicpIGRlc3QuZGVzdHJveSgpO1xuICB9XG5cbiAgLy8gZG9uJ3QgbGVhdmUgZGFuZ2xpbmcgcGlwZXMgd2hlbiB0aGVyZSBhcmUgZXJyb3JzLlxuICBmdW5jdGlvbiBvbmVycm9yKGVyKSB7XG4gICAgY2xlYW51cCgpO1xuICAgIGlmIChFRS5saXN0ZW5lckNvdW50KHRoaXMsICdlcnJvcicpID09PSAwKSB7XG4gICAgICB0aHJvdyBlcjsgLy8gVW5oYW5kbGVkIHN0cmVhbSBlcnJvciBpbiBwaXBlLlxuICAgIH1cbiAgfVxuXG4gIHNvdXJjZS5vbignZXJyb3InLCBvbmVycm9yKTtcbiAgZGVzdC5vbignZXJyb3InLCBvbmVycm9yKTtcblxuICAvLyByZW1vdmUgYWxsIHRoZSBldmVudCBsaXN0ZW5lcnMgdGhhdCB3ZXJlIGFkZGVkLlxuICBmdW5jdGlvbiBjbGVhbnVwKCkge1xuICAgIHNvdXJjZS5yZW1vdmVMaXN0ZW5lcignZGF0YScsIG9uZGF0YSk7XG4gICAgZGVzdC5yZW1vdmVMaXN0ZW5lcignZHJhaW4nLCBvbmRyYWluKTtcblxuICAgIHNvdXJjZS5yZW1vdmVMaXN0ZW5lcignZW5kJywgb25lbmQpO1xuICAgIHNvdXJjZS5yZW1vdmVMaXN0ZW5lcignY2xvc2UnLCBvbmNsb3NlKTtcblxuICAgIHNvdXJjZS5yZW1vdmVMaXN0ZW5lcignZXJyb3InLCBvbmVycm9yKTtcbiAgICBkZXN0LnJlbW92ZUxpc3RlbmVyKCdlcnJvcicsIG9uZXJyb3IpO1xuXG4gICAgc291cmNlLnJlbW92ZUxpc3RlbmVyKCdlbmQnLCBjbGVhbnVwKTtcbiAgICBzb3VyY2UucmVtb3ZlTGlzdGVuZXIoJ2Nsb3NlJywgY2xlYW51cCk7XG5cbiAgICBkZXN0LnJlbW92ZUxpc3RlbmVyKCdjbG9zZScsIGNsZWFudXApO1xuICB9XG5cbiAgc291cmNlLm9uKCdlbmQnLCBjbGVhbnVwKTtcbiAgc291cmNlLm9uKCdjbG9zZScsIGNsZWFudXApO1xuXG4gIGRlc3Qub24oJ2Nsb3NlJywgY2xlYW51cCk7XG5cbiAgZGVzdC5lbWl0KCdwaXBlJywgc291cmNlKTtcblxuICAvLyBBbGxvdyBmb3IgdW5peC1saWtlIHVzYWdlOiBBLnBpcGUoQikucGlwZShDKVxuICByZXR1cm4gZGVzdDtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBCdWZmZXIgPSByZXF1aXJlKCdidWZmZXInKS5CdWZmZXI7XG52YXIgYnVmZmVyU2hpbSA9IHJlcXVpcmUoJ2J1ZmZlci1zaGltcycpO1xuXG52YXIgaXNFbmNvZGluZyA9IEJ1ZmZlci5pc0VuY29kaW5nIHx8IGZ1bmN0aW9uIChlbmNvZGluZykge1xuICBlbmNvZGluZyA9ICcnICsgZW5jb2Rpbmc7XG4gIHN3aXRjaCAoZW5jb2RpbmcgJiYgZW5jb2RpbmcudG9Mb3dlckNhc2UoKSkge1xuICAgIGNhc2UgJ2hleCc6Y2FzZSAndXRmOCc6Y2FzZSAndXRmLTgnOmNhc2UgJ2FzY2lpJzpjYXNlICdiaW5hcnknOmNhc2UgJ2Jhc2U2NCc6Y2FzZSAndWNzMic6Y2FzZSAndWNzLTInOmNhc2UgJ3V0ZjE2bGUnOmNhc2UgJ3V0Zi0xNmxlJzpjYXNlICdyYXcnOlxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgfVxufTtcblxuZnVuY3Rpb24gX25vcm1hbGl6ZUVuY29kaW5nKGVuYykge1xuICBpZiAoIWVuYykgcmV0dXJuICd1dGY4JztcbiAgdmFyIHJldHJpZWQ7XG4gIHdoaWxlICh0cnVlKSB7XG4gICAgc3dpdGNoIChlbmMpIHtcbiAgICAgIGNhc2UgJ3V0ZjgnOlxuICAgICAgY2FzZSAndXRmLTgnOlxuICAgICAgICByZXR1cm4gJ3V0ZjgnO1xuICAgICAgY2FzZSAndWNzMic6XG4gICAgICBjYXNlICd1Y3MtMic6XG4gICAgICBjYXNlICd1dGYxNmxlJzpcbiAgICAgIGNhc2UgJ3V0Zi0xNmxlJzpcbiAgICAgICAgcmV0dXJuICd1dGYxNmxlJztcbiAgICAgIGNhc2UgJ2xhdGluMSc6XG4gICAgICBjYXNlICdiaW5hcnknOlxuICAgICAgICByZXR1cm4gJ2xhdGluMSc7XG4gICAgICBjYXNlICdiYXNlNjQnOlxuICAgICAgY2FzZSAnYXNjaWknOlxuICAgICAgY2FzZSAnaGV4JzpcbiAgICAgICAgcmV0dXJuIGVuYztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGlmIChyZXRyaWVkKSByZXR1cm47IC8vIHVuZGVmaW5lZFxuICAgICAgICBlbmMgPSAoJycgKyBlbmMpLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIHJldHJpZWQgPSB0cnVlO1xuICAgIH1cbiAgfVxufTtcblxuLy8gRG8gbm90IGNhY2hlIGBCdWZmZXIuaXNFbmNvZGluZ2Agd2hlbiBjaGVja2luZyBlbmNvZGluZyBuYW1lcyBhcyBzb21lXG4vLyBtb2R1bGVzIG1vbmtleS1wYXRjaCBpdCB0byBzdXBwb3J0IGFkZGl0aW9uYWwgZW5jb2RpbmdzXG5mdW5jdGlvbiBub3JtYWxpemVFbmNvZGluZyhlbmMpIHtcbiAgdmFyIG5lbmMgPSBfbm9ybWFsaXplRW5jb2RpbmcoZW5jKTtcbiAgaWYgKHR5cGVvZiBuZW5jICE9PSAnc3RyaW5nJyAmJiAoQnVmZmVyLmlzRW5jb2RpbmcgPT09IGlzRW5jb2RpbmcgfHwgIWlzRW5jb2RpbmcoZW5jKSkpIHRocm93IG5ldyBFcnJvcignVW5rbm93biBlbmNvZGluZzogJyArIGVuYyk7XG4gIHJldHVybiBuZW5jIHx8IGVuYztcbn1cblxuLy8gU3RyaW5nRGVjb2RlciBwcm92aWRlcyBhbiBpbnRlcmZhY2UgZm9yIGVmZmljaWVudGx5IHNwbGl0dGluZyBhIHNlcmllcyBvZlxuLy8gYnVmZmVycyBpbnRvIGEgc2VyaWVzIG9mIEpTIHN0cmluZ3Mgd2l0aG91dCBicmVha2luZyBhcGFydCBtdWx0aS1ieXRlXG4vLyBjaGFyYWN0ZXJzLlxuZXhwb3J0cy5TdHJpbmdEZWNvZGVyID0gU3RyaW5nRGVjb2RlcjtcbmZ1bmN0aW9uIFN0cmluZ0RlY29kZXIoZW5jb2RpbmcpIHtcbiAgdGhpcy5lbmNvZGluZyA9IG5vcm1hbGl6ZUVuY29kaW5nKGVuY29kaW5nKTtcbiAgdmFyIG5iO1xuICBzd2l0Y2ggKHRoaXMuZW5jb2RpbmcpIHtcbiAgICBjYXNlICd1dGYxNmxlJzpcbiAgICAgIHRoaXMudGV4dCA9IHV0ZjE2VGV4dDtcbiAgICAgIHRoaXMuZW5kID0gdXRmMTZFbmQ7XG4gICAgICBuYiA9IDQ7XG4gICAgICBicmVhaztcbiAgICBjYXNlICd1dGY4JzpcbiAgICAgIHRoaXMuZmlsbExhc3QgPSB1dGY4RmlsbExhc3Q7XG4gICAgICBuYiA9IDQ7XG4gICAgICBicmVhaztcbiAgICBjYXNlICdiYXNlNjQnOlxuICAgICAgdGhpcy50ZXh0ID0gYmFzZTY0VGV4dDtcbiAgICAgIHRoaXMuZW5kID0gYmFzZTY0RW5kO1xuICAgICAgbmIgPSAzO1xuICAgICAgYnJlYWs7XG4gICAgZGVmYXVsdDpcbiAgICAgIHRoaXMud3JpdGUgPSBzaW1wbGVXcml0ZTtcbiAgICAgIHRoaXMuZW5kID0gc2ltcGxlRW5kO1xuICAgICAgcmV0dXJuO1xuICB9XG4gIHRoaXMubGFzdE5lZWQgPSAwO1xuICB0aGlzLmxhc3RUb3RhbCA9IDA7XG4gIHRoaXMubGFzdENoYXIgPSBidWZmZXJTaGltLmFsbG9jVW5zYWZlKG5iKTtcbn1cblxuU3RyaW5nRGVjb2Rlci5wcm90b3R5cGUud3JpdGUgPSBmdW5jdGlvbiAoYnVmKSB7XG4gIGlmIChidWYubGVuZ3RoID09PSAwKSByZXR1cm4gJyc7XG4gIHZhciByO1xuICB2YXIgaTtcbiAgaWYgKHRoaXMubGFzdE5lZWQpIHtcbiAgICByID0gdGhpcy5maWxsTGFzdChidWYpO1xuICAgIGlmIChyID09PSB1bmRlZmluZWQpIHJldHVybiAnJztcbiAgICBpID0gdGhpcy5sYXN0TmVlZDtcbiAgICB0aGlzLmxhc3ROZWVkID0gMDtcbiAgfSBlbHNlIHtcbiAgICBpID0gMDtcbiAgfVxuICBpZiAoaSA8IGJ1Zi5sZW5ndGgpIHJldHVybiByID8gciArIHRoaXMudGV4dChidWYsIGkpIDogdGhpcy50ZXh0KGJ1ZiwgaSk7XG4gIHJldHVybiByIHx8ICcnO1xufTtcblxuU3RyaW5nRGVjb2Rlci5wcm90b3R5cGUuZW5kID0gdXRmOEVuZDtcblxuLy8gUmV0dXJucyBvbmx5IGNvbXBsZXRlIGNoYXJhY3RlcnMgaW4gYSBCdWZmZXJcblN0cmluZ0RlY29kZXIucHJvdG90eXBlLnRleHQgPSB1dGY4VGV4dDtcblxuLy8gQXR0ZW1wdHMgdG8gY29tcGxldGUgYSBwYXJ0aWFsIG5vbi1VVEYtOCBjaGFyYWN0ZXIgdXNpbmcgYnl0ZXMgZnJvbSBhIEJ1ZmZlclxuU3RyaW5nRGVjb2Rlci5wcm90b3R5cGUuZmlsbExhc3QgPSBmdW5jdGlvbiAoYnVmKSB7XG4gIGlmICh0aGlzLmxhc3ROZWVkIDw9IGJ1Zi5sZW5ndGgpIHtcbiAgICBidWYuY29weSh0aGlzLmxhc3RDaGFyLCB0aGlzLmxhc3RUb3RhbCAtIHRoaXMubGFzdE5lZWQsIDAsIHRoaXMubGFzdE5lZWQpO1xuICAgIHJldHVybiB0aGlzLmxhc3RDaGFyLnRvU3RyaW5nKHRoaXMuZW5jb2RpbmcsIDAsIHRoaXMubGFzdFRvdGFsKTtcbiAgfVxuICBidWYuY29weSh0aGlzLmxhc3RDaGFyLCB0aGlzLmxhc3RUb3RhbCAtIHRoaXMubGFzdE5lZWQsIDAsIGJ1Zi5sZW5ndGgpO1xuICB0aGlzLmxhc3ROZWVkIC09IGJ1Zi5sZW5ndGg7XG59O1xuXG4vLyBDaGVja3MgdGhlIHR5cGUgb2YgYSBVVEYtOCBieXRlLCB3aGV0aGVyIGl0J3MgQVNDSUksIGEgbGVhZGluZyBieXRlLCBvciBhXG4vLyBjb250aW51YXRpb24gYnl0ZS5cbmZ1bmN0aW9uIHV0ZjhDaGVja0J5dGUoYnl0ZSkge1xuICBpZiAoYnl0ZSA8PSAweDdGKSByZXR1cm4gMDtlbHNlIGlmIChieXRlID4+IDUgPT09IDB4MDYpIHJldHVybiAyO2Vsc2UgaWYgKGJ5dGUgPj4gNCA9PT0gMHgwRSkgcmV0dXJuIDM7ZWxzZSBpZiAoYnl0ZSA+PiAzID09PSAweDFFKSByZXR1cm4gNDtcbiAgcmV0dXJuIC0xO1xufVxuXG4vLyBDaGVja3MgYXQgbW9zdCAzIGJ5dGVzIGF0IHRoZSBlbmQgb2YgYSBCdWZmZXIgaW4gb3JkZXIgdG8gZGV0ZWN0IGFuXG4vLyBpbmNvbXBsZXRlIG11bHRpLWJ5dGUgVVRGLTggY2hhcmFjdGVyLiBUaGUgdG90YWwgbnVtYmVyIG9mIGJ5dGVzICgyLCAzLCBvciA0KVxuLy8gbmVlZGVkIHRvIGNvbXBsZXRlIHRoZSBVVEYtOCBjaGFyYWN0ZXIgKGlmIGFwcGxpY2FibGUpIGFyZSByZXR1cm5lZC5cbmZ1bmN0aW9uIHV0ZjhDaGVja0luY29tcGxldGUoc2VsZiwgYnVmLCBpKSB7XG4gIHZhciBqID0gYnVmLmxlbmd0aCAtIDE7XG4gIGlmIChqIDwgaSkgcmV0dXJuIDA7XG4gIHZhciBuYiA9IHV0ZjhDaGVja0J5dGUoYnVmW2pdKTtcbiAgaWYgKG5iID49IDApIHtcbiAgICBpZiAobmIgPiAwKSBzZWxmLmxhc3ROZWVkID0gbmIgLSAxO1xuICAgIHJldHVybiBuYjtcbiAgfVxuICBpZiAoLS1qIDwgaSkgcmV0dXJuIDA7XG4gIG5iID0gdXRmOENoZWNrQnl0ZShidWZbal0pO1xuICBpZiAobmIgPj0gMCkge1xuICAgIGlmIChuYiA+IDApIHNlbGYubGFzdE5lZWQgPSBuYiAtIDI7XG4gICAgcmV0dXJuIG5iO1xuICB9XG4gIGlmICgtLWogPCBpKSByZXR1cm4gMDtcbiAgbmIgPSB1dGY4Q2hlY2tCeXRlKGJ1ZltqXSk7XG4gIGlmIChuYiA+PSAwKSB7XG4gICAgaWYgKG5iID4gMCkge1xuICAgICAgaWYgKG5iID09PSAyKSBuYiA9IDA7ZWxzZSBzZWxmLmxhc3ROZWVkID0gbmIgLSAzO1xuICAgIH1cbiAgICByZXR1cm4gbmI7XG4gIH1cbiAgcmV0dXJuIDA7XG59XG5cbi8vIFZhbGlkYXRlcyBhcyBtYW55IGNvbnRpbnVhdGlvbiBieXRlcyBmb3IgYSBtdWx0aS1ieXRlIFVURi04IGNoYXJhY3RlciBhc1xuLy8gbmVlZGVkIG9yIGFyZSBhdmFpbGFibGUuIElmIHdlIHNlZSBhIG5vbi1jb250aW51YXRpb24gYnl0ZSB3aGVyZSB3ZSBleHBlY3Rcbi8vIG9uZSwgd2UgXCJyZXBsYWNlXCIgdGhlIHZhbGlkYXRlZCBjb250aW51YXRpb24gYnl0ZXMgd2UndmUgc2VlbiBzbyBmYXIgd2l0aFxuLy8gVVRGLTggcmVwbGFjZW1lbnQgY2hhcmFjdGVycyAoJ1xcdWZmZmQnKSwgdG8gbWF0Y2ggdjgncyBVVEYtOCBkZWNvZGluZ1xuLy8gYmVoYXZpb3IuIFRoZSBjb250aW51YXRpb24gYnl0ZSBjaGVjayBpcyBpbmNsdWRlZCB0aHJlZSB0aW1lcyBpbiB0aGUgY2FzZVxuLy8gd2hlcmUgYWxsIG9mIHRoZSBjb250aW51YXRpb24gYnl0ZXMgZm9yIGEgY2hhcmFjdGVyIGV4aXN0IGluIHRoZSBzYW1lIGJ1ZmZlci5cbi8vIEl0IGlzIGFsc28gZG9uZSB0aGlzIHdheSBhcyBhIHNsaWdodCBwZXJmb3JtYW5jZSBpbmNyZWFzZSBpbnN0ZWFkIG9mIHVzaW5nIGFcbi8vIGxvb3AuXG5mdW5jdGlvbiB1dGY4Q2hlY2tFeHRyYUJ5dGVzKHNlbGYsIGJ1ZiwgcCkge1xuICBpZiAoKGJ1ZlswXSAmIDB4QzApICE9PSAweDgwKSB7XG4gICAgc2VsZi5sYXN0TmVlZCA9IDA7XG4gICAgcmV0dXJuICdcXHVmZmZkJy5yZXBlYXQocCk7XG4gIH1cbiAgaWYgKHNlbGYubGFzdE5lZWQgPiAxICYmIGJ1Zi5sZW5ndGggPiAxKSB7XG4gICAgaWYgKChidWZbMV0gJiAweEMwKSAhPT0gMHg4MCkge1xuICAgICAgc2VsZi5sYXN0TmVlZCA9IDE7XG4gICAgICByZXR1cm4gJ1xcdWZmZmQnLnJlcGVhdChwICsgMSk7XG4gICAgfVxuICAgIGlmIChzZWxmLmxhc3ROZWVkID4gMiAmJiBidWYubGVuZ3RoID4gMikge1xuICAgICAgaWYgKChidWZbMl0gJiAweEMwKSAhPT0gMHg4MCkge1xuICAgICAgICBzZWxmLmxhc3ROZWVkID0gMjtcbiAgICAgICAgcmV0dXJuICdcXHVmZmZkJy5yZXBlYXQocCArIDIpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG4vLyBBdHRlbXB0cyB0byBjb21wbGV0ZSBhIG11bHRpLWJ5dGUgVVRGLTggY2hhcmFjdGVyIHVzaW5nIGJ5dGVzIGZyb20gYSBCdWZmZXIuXG5mdW5jdGlvbiB1dGY4RmlsbExhc3QoYnVmKSB7XG4gIHZhciBwID0gdGhpcy5sYXN0VG90YWwgLSB0aGlzLmxhc3ROZWVkO1xuICB2YXIgciA9IHV0ZjhDaGVja0V4dHJhQnl0ZXModGhpcywgYnVmLCBwKTtcbiAgaWYgKHIgIT09IHVuZGVmaW5lZCkgcmV0dXJuIHI7XG4gIGlmICh0aGlzLmxhc3ROZWVkIDw9IGJ1Zi5sZW5ndGgpIHtcbiAgICBidWYuY29weSh0aGlzLmxhc3RDaGFyLCBwLCAwLCB0aGlzLmxhc3ROZWVkKTtcbiAgICByZXR1cm4gdGhpcy5sYXN0Q2hhci50b1N0cmluZyh0aGlzLmVuY29kaW5nLCAwLCB0aGlzLmxhc3RUb3RhbCk7XG4gIH1cbiAgYnVmLmNvcHkodGhpcy5sYXN0Q2hhciwgcCwgMCwgYnVmLmxlbmd0aCk7XG4gIHRoaXMubGFzdE5lZWQgLT0gYnVmLmxlbmd0aDtcbn1cblxuLy8gUmV0dXJucyBhbGwgY29tcGxldGUgVVRGLTggY2hhcmFjdGVycyBpbiBhIEJ1ZmZlci4gSWYgdGhlIEJ1ZmZlciBlbmRlZCBvbiBhXG4vLyBwYXJ0aWFsIGNoYXJhY3RlciwgdGhlIGNoYXJhY3RlcidzIGJ5dGVzIGFyZSBidWZmZXJlZCB1bnRpbCB0aGUgcmVxdWlyZWRcbi8vIG51bWJlciBvZiBieXRlcyBhcmUgYXZhaWxhYmxlLlxuZnVuY3Rpb24gdXRmOFRleHQoYnVmLCBpKSB7XG4gIHZhciB0b3RhbCA9IHV0ZjhDaGVja0luY29tcGxldGUodGhpcywgYnVmLCBpKTtcbiAgaWYgKCF0aGlzLmxhc3ROZWVkKSByZXR1cm4gYnVmLnRvU3RyaW5nKCd1dGY4JywgaSk7XG4gIHRoaXMubGFzdFRvdGFsID0gdG90YWw7XG4gIHZhciBlbmQgPSBidWYubGVuZ3RoIC0gKHRvdGFsIC0gdGhpcy5sYXN0TmVlZCk7XG4gIGJ1Zi5jb3B5KHRoaXMubGFzdENoYXIsIDAsIGVuZCk7XG4gIHJldHVybiBidWYudG9TdHJpbmcoJ3V0ZjgnLCBpLCBlbmQpO1xufVxuXG4vLyBGb3IgVVRGLTgsIGEgcmVwbGFjZW1lbnQgY2hhcmFjdGVyIGZvciBlYWNoIGJ1ZmZlcmVkIGJ5dGUgb2YgYSAocGFydGlhbClcbi8vIGNoYXJhY3RlciBuZWVkcyB0byBiZSBhZGRlZCB0byB0aGUgb3V0cHV0LlxuZnVuY3Rpb24gdXRmOEVuZChidWYpIHtcbiAgdmFyIHIgPSBidWYgJiYgYnVmLmxlbmd0aCA/IHRoaXMud3JpdGUoYnVmKSA6ICcnO1xuICBpZiAodGhpcy5sYXN0TmVlZCkgcmV0dXJuIHIgKyAnXFx1ZmZmZCcucmVwZWF0KHRoaXMubGFzdFRvdGFsIC0gdGhpcy5sYXN0TmVlZCk7XG4gIHJldHVybiByO1xufVxuXG4vLyBVVEYtMTZMRSB0eXBpY2FsbHkgbmVlZHMgdHdvIGJ5dGVzIHBlciBjaGFyYWN0ZXIsIGJ1dCBldmVuIGlmIHdlIGhhdmUgYW4gZXZlblxuLy8gbnVtYmVyIG9mIGJ5dGVzIGF2YWlsYWJsZSwgd2UgbmVlZCB0byBjaGVjayBpZiB3ZSBlbmQgb24gYSBsZWFkaW5nL2hpZ2hcbi8vIHN1cnJvZ2F0ZS4gSW4gdGhhdCBjYXNlLCB3ZSBuZWVkIHRvIHdhaXQgZm9yIHRoZSBuZXh0IHR3byBieXRlcyBpbiBvcmRlciB0b1xuLy8gZGVjb2RlIHRoZSBsYXN0IGNoYXJhY3RlciBwcm9wZXJseS5cbmZ1bmN0aW9uIHV0ZjE2VGV4dChidWYsIGkpIHtcbiAgaWYgKChidWYubGVuZ3RoIC0gaSkgJSAyID09PSAwKSB7XG4gICAgdmFyIHIgPSBidWYudG9TdHJpbmcoJ3V0ZjE2bGUnLCBpKTtcbiAgICBpZiAocikge1xuICAgICAgdmFyIGMgPSByLmNoYXJDb2RlQXQoci5sZW5ndGggLSAxKTtcbiAgICAgIGlmIChjID49IDB4RDgwMCAmJiBjIDw9IDB4REJGRikge1xuICAgICAgICB0aGlzLmxhc3ROZWVkID0gMjtcbiAgICAgICAgdGhpcy5sYXN0VG90YWwgPSA0O1xuICAgICAgICB0aGlzLmxhc3RDaGFyWzBdID0gYnVmW2J1Zi5sZW5ndGggLSAyXTtcbiAgICAgICAgdGhpcy5sYXN0Q2hhclsxXSA9IGJ1ZltidWYubGVuZ3RoIC0gMV07XG4gICAgICAgIHJldHVybiByLnNsaWNlKDAsIC0xKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHI7XG4gIH1cbiAgdGhpcy5sYXN0TmVlZCA9IDE7XG4gIHRoaXMubGFzdFRvdGFsID0gMjtcbiAgdGhpcy5sYXN0Q2hhclswXSA9IGJ1ZltidWYubGVuZ3RoIC0gMV07XG4gIHJldHVybiBidWYudG9TdHJpbmcoJ3V0ZjE2bGUnLCBpLCBidWYubGVuZ3RoIC0gMSk7XG59XG5cbi8vIEZvciBVVEYtMTZMRSB3ZSBkbyBub3QgZXhwbGljaXRseSBhcHBlbmQgc3BlY2lhbCByZXBsYWNlbWVudCBjaGFyYWN0ZXJzIGlmIHdlXG4vLyBlbmQgb24gYSBwYXJ0aWFsIGNoYXJhY3Rlciwgd2Ugc2ltcGx5IGxldCB2OCBoYW5kbGUgdGhhdC5cbmZ1bmN0aW9uIHV0ZjE2RW5kKGJ1Zikge1xuICB2YXIgciA9IGJ1ZiAmJiBidWYubGVuZ3RoID8gdGhpcy53cml0ZShidWYpIDogJyc7XG4gIGlmICh0aGlzLmxhc3ROZWVkKSB7XG4gICAgdmFyIGVuZCA9IHRoaXMubGFzdFRvdGFsIC0gdGhpcy5sYXN0TmVlZDtcbiAgICByZXR1cm4gciArIHRoaXMubGFzdENoYXIudG9TdHJpbmcoJ3V0ZjE2bGUnLCAwLCBlbmQpO1xuICB9XG4gIHJldHVybiByO1xufVxuXG5mdW5jdGlvbiBiYXNlNjRUZXh0KGJ1ZiwgaSkge1xuICB2YXIgbiA9IChidWYubGVuZ3RoIC0gaSkgJSAzO1xuICBpZiAobiA9PT0gMCkgcmV0dXJuIGJ1Zi50b1N0cmluZygnYmFzZTY0JywgaSk7XG4gIHRoaXMubGFzdE5lZWQgPSAzIC0gbjtcbiAgdGhpcy5sYXN0VG90YWwgPSAzO1xuICBpZiAobiA9PT0gMSkge1xuICAgIHRoaXMubGFzdENoYXJbMF0gPSBidWZbYnVmLmxlbmd0aCAtIDFdO1xuICB9IGVsc2Uge1xuICAgIHRoaXMubGFzdENoYXJbMF0gPSBidWZbYnVmLmxlbmd0aCAtIDJdO1xuICAgIHRoaXMubGFzdENoYXJbMV0gPSBidWZbYnVmLmxlbmd0aCAtIDFdO1xuICB9XG4gIHJldHVybiBidWYudG9TdHJpbmcoJ2Jhc2U2NCcsIGksIGJ1Zi5sZW5ndGggLSBuKTtcbn1cblxuZnVuY3Rpb24gYmFzZTY0RW5kKGJ1Zikge1xuICB2YXIgciA9IGJ1ZiAmJiBidWYubGVuZ3RoID8gdGhpcy53cml0ZShidWYpIDogJyc7XG4gIGlmICh0aGlzLmxhc3ROZWVkKSByZXR1cm4gciArIHRoaXMubGFzdENoYXIudG9TdHJpbmcoJ2Jhc2U2NCcsIDAsIDMgLSB0aGlzLmxhc3ROZWVkKTtcbiAgcmV0dXJuIHI7XG59XG5cbi8vIFBhc3MgYnl0ZXMgb24gdGhyb3VnaCBmb3Igc2luZ2xlLWJ5dGUgZW5jb2RpbmdzIChlLmcuIGFzY2lpLCBsYXRpbjEsIGhleClcbmZ1bmN0aW9uIHNpbXBsZVdyaXRlKGJ1Zikge1xuICByZXR1cm4gYnVmLnRvU3RyaW5nKHRoaXMuZW5jb2RpbmcpO1xufVxuXG5mdW5jdGlvbiBzaW1wbGVFbmQoYnVmKSB7XG4gIHJldHVybiBidWYgJiYgYnVmLmxlbmd0aCA/IHRoaXMud3JpdGUoYnVmKSA6ICcnO1xufSIsIlxuLyoqXG4gKiBNb2R1bGUgZXhwb3J0cy5cbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGRlcHJlY2F0ZTtcblxuLyoqXG4gKiBNYXJrIHRoYXQgYSBtZXRob2Qgc2hvdWxkIG5vdCBiZSB1c2VkLlxuICogUmV0dXJucyBhIG1vZGlmaWVkIGZ1bmN0aW9uIHdoaWNoIHdhcm5zIG9uY2UgYnkgZGVmYXVsdC5cbiAqXG4gKiBJZiBgbG9jYWxTdG9yYWdlLm5vRGVwcmVjYXRpb24gPSB0cnVlYCBpcyBzZXQsIHRoZW4gaXQgaXMgYSBuby1vcC5cbiAqXG4gKiBJZiBgbG9jYWxTdG9yYWdlLnRocm93RGVwcmVjYXRpb24gPSB0cnVlYCBpcyBzZXQsIHRoZW4gZGVwcmVjYXRlZCBmdW5jdGlvbnNcbiAqIHdpbGwgdGhyb3cgYW4gRXJyb3Igd2hlbiBpbnZva2VkLlxuICpcbiAqIElmIGBsb2NhbFN0b3JhZ2UudHJhY2VEZXByZWNhdGlvbiA9IHRydWVgIGlzIHNldCwgdGhlbiBkZXByZWNhdGVkIGZ1bmN0aW9uc1xuICogd2lsbCBpbnZva2UgYGNvbnNvbGUudHJhY2UoKWAgaW5zdGVhZCBvZiBgY29uc29sZS5lcnJvcigpYC5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiAtIHRoZSBmdW5jdGlvbiB0byBkZXByZWNhdGVcbiAqIEBwYXJhbSB7U3RyaW5nfSBtc2cgLSB0aGUgc3RyaW5nIHRvIHByaW50IHRvIHRoZSBjb25zb2xlIHdoZW4gYGZuYCBpcyBpbnZva2VkXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IGEgbmV3IFwiZGVwcmVjYXRlZFwiIHZlcnNpb24gb2YgYGZuYFxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBkZXByZWNhdGUgKGZuLCBtc2cpIHtcbiAgaWYgKGNvbmZpZygnbm9EZXByZWNhdGlvbicpKSB7XG4gICAgcmV0dXJuIGZuO1xuICB9XG5cbiAgdmFyIHdhcm5lZCA9IGZhbHNlO1xuICBmdW5jdGlvbiBkZXByZWNhdGVkKCkge1xuICAgIGlmICghd2FybmVkKSB7XG4gICAgICBpZiAoY29uZmlnKCd0aHJvd0RlcHJlY2F0aW9uJykpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKG1zZyk7XG4gICAgICB9IGVsc2UgaWYgKGNvbmZpZygndHJhY2VEZXByZWNhdGlvbicpKSB7XG4gICAgICAgIGNvbnNvbGUudHJhY2UobXNnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnNvbGUud2Fybihtc2cpO1xuICAgICAgfVxuICAgICAgd2FybmVkID0gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gIH1cblxuICByZXR1cm4gZGVwcmVjYXRlZDtcbn1cblxuLyoqXG4gKiBDaGVja3MgYGxvY2FsU3RvcmFnZWAgZm9yIGJvb2xlYW4gdmFsdWVzIGZvciB0aGUgZ2l2ZW4gYG5hbWVgLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lXG4gKiBAcmV0dXJucyB7Qm9vbGVhbn1cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIGNvbmZpZyAobmFtZSkge1xuICAvLyBhY2Nlc3NpbmcgZ2xvYmFsLmxvY2FsU3RvcmFnZSBjYW4gdHJpZ2dlciBhIERPTUV4Y2VwdGlvbiBpbiBzYW5kYm94ZWQgaWZyYW1lc1xuICB0cnkge1xuICAgIGlmICghZ2xvYmFsLmxvY2FsU3RvcmFnZSkgcmV0dXJuIGZhbHNlO1xuICB9IGNhdGNoIChfKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHZhciB2YWwgPSBnbG9iYWwubG9jYWxTdG9yYWdlW25hbWVdO1xuICBpZiAobnVsbCA9PSB2YWwpIHJldHVybiBmYWxzZTtcbiAgcmV0dXJuIFN0cmluZyh2YWwpLnRvTG93ZXJDYXNlKCkgPT09ICd0cnVlJztcbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gZXh0ZW5kXG5cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG5cbmZ1bmN0aW9uIGV4dGVuZCgpIHtcbiAgICB2YXIgdGFyZ2V0ID0ge31cblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV1cblxuICAgICAgICBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7XG4gICAgICAgICAgICBpZiAoaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHtcbiAgICAgICAgICAgICAgICB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdGFyZ2V0XG59XG4iXX0=
