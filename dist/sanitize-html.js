(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.I = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict'

exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function placeHoldersCount (b64) {
  var len = b64.length
  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // the number of equal signs (place holders)
  // if there are two placeholders, than the two characters before it
  // represent one byte
  // if there is only one, then the three characters before it represent 2 bytes
  // this is just a cheap hack to not do indexOf twice
  return b64[len - 2] === '=' ? 2 : b64[len - 1] === '=' ? 1 : 0
}

function byteLength (b64) {
  // base64 is 4/3 + up to two characters of the original data
  return (b64.length * 3 / 4) - placeHoldersCount(b64)
}

function toByteArray (b64) {
  var i, l, tmp, placeHolders, arr
  var len = b64.length
  placeHolders = placeHoldersCount(b64)

  arr = new Arr((len * 3 / 4) - placeHolders)

  // if there are placeholders, only get up to the last complete 4 chars
  l = placeHolders > 0 ? len - 4 : len

  var L = 0

  for (i = 0; i < l; i += 4) {
    tmp = (revLookup[b64.charCodeAt(i)] << 18) | (revLookup[b64.charCodeAt(i + 1)] << 12) | (revLookup[b64.charCodeAt(i + 2)] << 6) | revLookup[b64.charCodeAt(i + 3)]
    arr[L++] = (tmp >> 16) & 0xFF
    arr[L++] = (tmp >> 8) & 0xFF
    arr[L++] = tmp & 0xFF
  }

  if (placeHolders === 2) {
    tmp = (revLookup[b64.charCodeAt(i)] << 2) | (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[L++] = tmp & 0xFF
  } else if (placeHolders === 1) {
    tmp = (revLookup[b64.charCodeAt(i)] << 10) | (revLookup[b64.charCodeAt(i + 1)] << 4) | (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[L++] = (tmp >> 8) & 0xFF
    arr[L++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var output = ''
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    output += lookup[tmp >> 2]
    output += lookup[(tmp << 4) & 0x3F]
    output += '=='
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + (uint8[len - 1])
    output += lookup[tmp >> 10]
    output += lookup[(tmp >> 4) & 0x3F]
    output += lookup[(tmp << 2) & 0x3F]
    output += '='
  }

  parts.push(output)

  return parts.join('')
}

},{}],2:[function(require,module,exports){

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

},{"buffer":4}],4:[function(require,module,exports){
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

},{"base64-js":1,"ieee754":28,"isarray":31}],5:[function(require,module,exports){
(function (Buffer){
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
  return (objectToString(e) === '[object Error]' || e instanceof Error);
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

exports.isBuffer = Buffer.isBuffer;

function objectToString(o) {
  return Object.prototype.toString.call(o);
}

}).call(this,{"isBuffer":require("../../is-buffer/index.js")})

},{"../../is-buffer/index.js":30}],6:[function(require,module,exports){
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
  wbr: true,
};


var render = module.exports = function(dom, opts) {
  if (!Array.isArray(dom) && !dom.cheerio) dom = [dom];
  opts = opts || {};

  var output = '';

  for(var i = 0; i < dom.length; i++){
    var elem = dom[i];

    if (elem.type === 'root')
      output += render(elem.children, opts);
    else if (ElementType.isTag(elem))
      output += renderTag(elem, opts);
    else if (elem.type === ElementType.Directive)
      output += renderDirective(elem);
    else if (elem.type === ElementType.Comment)
      output += renderComment(elem);
    else if (elem.type === ElementType.CDATA)
      output += renderCdata(elem);
    else
      output += renderText(elem, opts);
  }

  return output;
};

function renderTag(elem, opts) {
  // Handle SVG
  if (elem.name === "svg") opts = {decodeEntities: opts.decodeEntities, xmlMode: true};

  var tag = '<' + elem.name,
      attribs = formatAttrs(elem.attribs, opts);

  if (attribs) {
    tag += ' ' + attribs;
  }

  if (
    opts.xmlMode
    && (!elem.children || elem.children.length === 0)
  ) {
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

},{"domelementtype":7,"entities":8}],7:[function(require,module,exports){
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
},{}],8:[function(require,module,exports){
var encode = require("./lib/encode.js"),
    decode = require("./lib/decode.js");

exports.decode = function(data, level){
	return (!level || level <= 0 ? decode.XML : decode.HTML)(data);
};

exports.decodeStrict = function(data, level){
	return (!level || level <= 0 ? decode.XML : decode.HTMLStrict)(data);
};

exports.encode = function(data, level){
	return (!level || level <= 0 ? encode.XML : encode.HTML)(data);
};

exports.encodeXML = encode.XML;

exports.encodeHTML4 =
exports.encodeHTML5 =
exports.encodeHTML  = encode.HTML;

exports.decodeXML =
exports.decodeXMLStrict = decode.XML;

exports.decodeHTML4 =
exports.decodeHTML5 =
exports.decodeHTML = decode.HTML;

exports.decodeHTML4Strict =
exports.decodeHTML5Strict =
exports.decodeHTMLStrict = decode.HTMLStrict;

exports.escape = encode.escape;

},{"./lib/decode.js":9,"./lib/encode.js":11}],9:[function(require,module,exports){
var entityMap = require("../maps/entities.json"),
    legacyMap = require("../maps/legacy.json"),
    xmlMap    = require("../maps/xml.json"),
    decodeCodePoint = require("./decode_codepoint.js");

var decodeXMLStrict  = getStrictDecoder(xmlMap),
    decodeHTMLStrict = getStrictDecoder(entityMap);

function getStrictDecoder(map){
	var keys = Object.keys(map).join("|"),
	    replace = getReplacer(map);

	keys += "|#[xX][\\da-fA-F]+|#\\d+";

	var re = new RegExp("&(?:" + keys + ");", "g");

	return function(str){
		return String(str).replace(re, replace);
	};
}

var decodeHTML = (function(){
	var legacy = Object.keys(legacyMap)
		.sort(sorter);

	var keys = Object.keys(entityMap)
		.sort(sorter);

	for(var i = 0, j = 0; i < keys.length; i++){
		if(legacy[j] === keys[i]){
			keys[i] += ";?";
			j++;
		} else {
			keys[i] += ";";
		}
	}

	var re = new RegExp("&(?:" + keys.join("|") + "|#[xX][\\da-fA-F]+;?|#\\d+;?)", "g"),
	    replace = getReplacer(entityMap);

	function replacer(str){
		if(str.substr(-1) !== ";") str += ";";
		return replace(str);
	}

	//TODO consider creating a merged map
	return function(str){
		return String(str).replace(re, replacer);
	};
}());

function sorter(a, b){
	return a < b ? 1 : -1;
}

function getReplacer(map){
	return function replace(str){
		if(str.charAt(1) === "#"){
			if(str.charAt(2) === "X" || str.charAt(2) === "x"){
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
},{"../maps/entities.json":13,"../maps/legacy.json":14,"../maps/xml.json":15,"./decode_codepoint.js":10}],10:[function(require,module,exports){
var decodeMap = require("../maps/decode.json");

module.exports = decodeCodePoint;

// modified version of https://github.com/mathiasbynens/he/blob/master/src/he.js#L94-L119
function decodeCodePoint(codePoint){

	if((codePoint >= 0xD800 && codePoint <= 0xDFFF) || codePoint > 0x10FFFF){
		return "\uFFFD";
	}

	if(codePoint in decodeMap){
		codePoint = decodeMap[codePoint];
	}

	var output = "";

	if(codePoint > 0xFFFF){
		codePoint -= 0x10000;
		output += String.fromCharCode(codePoint >>> 10 & 0x3FF | 0xD800);
		codePoint = 0xDC00 | codePoint & 0x3FF;
	}

	output += String.fromCharCode(codePoint);
	return output;
}

},{"../maps/decode.json":12}],11:[function(require,module,exports){
var inverseXML = getInverseObj(require("../maps/xml.json")),
    xmlReplacer = getInverseReplacer(inverseXML);

exports.XML = getInverse(inverseXML, xmlReplacer);

var inverseHTML = getInverseObj(require("../maps/entities.json")),
    htmlReplacer = getInverseReplacer(inverseHTML);

exports.HTML = getInverse(inverseHTML, htmlReplacer);

function getInverseObj(obj){
	return Object.keys(obj).sort().reduce(function(inverse, name){
		inverse[obj[name]] = "&" + name + ";";
		return inverse;
	}, {});
}

function getInverseReplacer(inverse){
	var single = [],
	    multiple = [];

	Object.keys(inverse).forEach(function(k){
		if(k.length === 1){
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

function singleCharReplacer(c){
	return "&#x" + c.charCodeAt(0).toString(16).toUpperCase() + ";";
}

function astralReplacer(c){
	// http://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
	var high = c.charCodeAt(0);
	var low  = c.charCodeAt(1);
	var codePoint = (high - 0xD800) * 0x400 + low - 0xDC00 + 0x10000;
	return "&#x" + codePoint.toString(16).toUpperCase() + ";";
}

function getInverse(inverse, re){
	function func(name){
		return inverse[name];
	}

	return function(data){
		return data
				.replace(re, func)
				.replace(re_astralSymbols, astralReplacer)
				.replace(re_nonASCII, singleCharReplacer);
	};
}

var re_xmlChars = getInverseReplacer(inverseXML);

function escapeXML(data){
	return data
			.replace(re_xmlChars, singleCharReplacer)
			.replace(re_astralSymbols, astralReplacer)
			.replace(re_nonASCII, singleCharReplacer);
}

exports.escape = escapeXML;

},{"../maps/entities.json":13,"../maps/xml.json":15}],12:[function(require,module,exports){
module.exports={"0":65533,"128":8364,"130":8218,"131":402,"132":8222,"133":8230,"134":8224,"135":8225,"136":710,"137":8240,"138":352,"139":8249,"140":338,"142":381,"145":8216,"146":8217,"147":8220,"148":8221,"149":8226,"150":8211,"151":8212,"152":732,"153":8482,"154":353,"155":8250,"156":339,"158":382,"159":376}
},{}],13:[function(require,module,exports){
module.exports={"Aacute":"\u00C1","aacute":"\u00E1","Abreve":"\u0102","abreve":"\u0103","ac":"\u223E","acd":"\u223F","acE":"\u223E\u0333","Acirc":"\u00C2","acirc":"\u00E2","acute":"\u00B4","Acy":"\u0410","acy":"\u0430","AElig":"\u00C6","aelig":"\u00E6","af":"\u2061","Afr":"\uD835\uDD04","afr":"\uD835\uDD1E","Agrave":"\u00C0","agrave":"\u00E0","alefsym":"\u2135","aleph":"\u2135","Alpha":"\u0391","alpha":"\u03B1","Amacr":"\u0100","amacr":"\u0101","amalg":"\u2A3F","amp":"&","AMP":"&","andand":"\u2A55","And":"\u2A53","and":"\u2227","andd":"\u2A5C","andslope":"\u2A58","andv":"\u2A5A","ang":"\u2220","ange":"\u29A4","angle":"\u2220","angmsdaa":"\u29A8","angmsdab":"\u29A9","angmsdac":"\u29AA","angmsdad":"\u29AB","angmsdae":"\u29AC","angmsdaf":"\u29AD","angmsdag":"\u29AE","angmsdah":"\u29AF","angmsd":"\u2221","angrt":"\u221F","angrtvb":"\u22BE","angrtvbd":"\u299D","angsph":"\u2222","angst":"\u00C5","angzarr":"\u237C","Aogon":"\u0104","aogon":"\u0105","Aopf":"\uD835\uDD38","aopf":"\uD835\uDD52","apacir":"\u2A6F","ap":"\u2248","apE":"\u2A70","ape":"\u224A","apid":"\u224B","apos":"'","ApplyFunction":"\u2061","approx":"\u2248","approxeq":"\u224A","Aring":"\u00C5","aring":"\u00E5","Ascr":"\uD835\uDC9C","ascr":"\uD835\uDCB6","Assign":"\u2254","ast":"*","asymp":"\u2248","asympeq":"\u224D","Atilde":"\u00C3","atilde":"\u00E3","Auml":"\u00C4","auml":"\u00E4","awconint":"\u2233","awint":"\u2A11","backcong":"\u224C","backepsilon":"\u03F6","backprime":"\u2035","backsim":"\u223D","backsimeq":"\u22CD","Backslash":"\u2216","Barv":"\u2AE7","barvee":"\u22BD","barwed":"\u2305","Barwed":"\u2306","barwedge":"\u2305","bbrk":"\u23B5","bbrktbrk":"\u23B6","bcong":"\u224C","Bcy":"\u0411","bcy":"\u0431","bdquo":"\u201E","becaus":"\u2235","because":"\u2235","Because":"\u2235","bemptyv":"\u29B0","bepsi":"\u03F6","bernou":"\u212C","Bernoullis":"\u212C","Beta":"\u0392","beta":"\u03B2","beth":"\u2136","between":"\u226C","Bfr":"\uD835\uDD05","bfr":"\uD835\uDD1F","bigcap":"\u22C2","bigcirc":"\u25EF","bigcup":"\u22C3","bigodot":"\u2A00","bigoplus":"\u2A01","bigotimes":"\u2A02","bigsqcup":"\u2A06","bigstar":"\u2605","bigtriangledown":"\u25BD","bigtriangleup":"\u25B3","biguplus":"\u2A04","bigvee":"\u22C1","bigwedge":"\u22C0","bkarow":"\u290D","blacklozenge":"\u29EB","blacksquare":"\u25AA","blacktriangle":"\u25B4","blacktriangledown":"\u25BE","blacktriangleleft":"\u25C2","blacktriangleright":"\u25B8","blank":"\u2423","blk12":"\u2592","blk14":"\u2591","blk34":"\u2593","block":"\u2588","bne":"=\u20E5","bnequiv":"\u2261\u20E5","bNot":"\u2AED","bnot":"\u2310","Bopf":"\uD835\uDD39","bopf":"\uD835\uDD53","bot":"\u22A5","bottom":"\u22A5","bowtie":"\u22C8","boxbox":"\u29C9","boxdl":"\u2510","boxdL":"\u2555","boxDl":"\u2556","boxDL":"\u2557","boxdr":"\u250C","boxdR":"\u2552","boxDr":"\u2553","boxDR":"\u2554","boxh":"\u2500","boxH":"\u2550","boxhd":"\u252C","boxHd":"\u2564","boxhD":"\u2565","boxHD":"\u2566","boxhu":"\u2534","boxHu":"\u2567","boxhU":"\u2568","boxHU":"\u2569","boxminus":"\u229F","boxplus":"\u229E","boxtimes":"\u22A0","boxul":"\u2518","boxuL":"\u255B","boxUl":"\u255C","boxUL":"\u255D","boxur":"\u2514","boxuR":"\u2558","boxUr":"\u2559","boxUR":"\u255A","boxv":"\u2502","boxV":"\u2551","boxvh":"\u253C","boxvH":"\u256A","boxVh":"\u256B","boxVH":"\u256C","boxvl":"\u2524","boxvL":"\u2561","boxVl":"\u2562","boxVL":"\u2563","boxvr":"\u251C","boxvR":"\u255E","boxVr":"\u255F","boxVR":"\u2560","bprime":"\u2035","breve":"\u02D8","Breve":"\u02D8","brvbar":"\u00A6","bscr":"\uD835\uDCB7","Bscr":"\u212C","bsemi":"\u204F","bsim":"\u223D","bsime":"\u22CD","bsolb":"\u29C5","bsol":"\\","bsolhsub":"\u27C8","bull":"\u2022","bullet":"\u2022","bump":"\u224E","bumpE":"\u2AAE","bumpe":"\u224F","Bumpeq":"\u224E","bumpeq":"\u224F","Cacute":"\u0106","cacute":"\u0107","capand":"\u2A44","capbrcup":"\u2A49","capcap":"\u2A4B","cap":"\u2229","Cap":"\u22D2","capcup":"\u2A47","capdot":"\u2A40","CapitalDifferentialD":"\u2145","caps":"\u2229\uFE00","caret":"\u2041","caron":"\u02C7","Cayleys":"\u212D","ccaps":"\u2A4D","Ccaron":"\u010C","ccaron":"\u010D","Ccedil":"\u00C7","ccedil":"\u00E7","Ccirc":"\u0108","ccirc":"\u0109","Cconint":"\u2230","ccups":"\u2A4C","ccupssm":"\u2A50","Cdot":"\u010A","cdot":"\u010B","cedil":"\u00B8","Cedilla":"\u00B8","cemptyv":"\u29B2","cent":"\u00A2","centerdot":"\u00B7","CenterDot":"\u00B7","cfr":"\uD835\uDD20","Cfr":"\u212D","CHcy":"\u0427","chcy":"\u0447","check":"\u2713","checkmark":"\u2713","Chi":"\u03A7","chi":"\u03C7","circ":"\u02C6","circeq":"\u2257","circlearrowleft":"\u21BA","circlearrowright":"\u21BB","circledast":"\u229B","circledcirc":"\u229A","circleddash":"\u229D","CircleDot":"\u2299","circledR":"\u00AE","circledS":"\u24C8","CircleMinus":"\u2296","CirclePlus":"\u2295","CircleTimes":"\u2297","cir":"\u25CB","cirE":"\u29C3","cire":"\u2257","cirfnint":"\u2A10","cirmid":"\u2AEF","cirscir":"\u29C2","ClockwiseContourIntegral":"\u2232","CloseCurlyDoubleQuote":"\u201D","CloseCurlyQuote":"\u2019","clubs":"\u2663","clubsuit":"\u2663","colon":":","Colon":"\u2237","Colone":"\u2A74","colone":"\u2254","coloneq":"\u2254","comma":",","commat":"@","comp":"\u2201","compfn":"\u2218","complement":"\u2201","complexes":"\u2102","cong":"\u2245","congdot":"\u2A6D","Congruent":"\u2261","conint":"\u222E","Conint":"\u222F","ContourIntegral":"\u222E","copf":"\uD835\uDD54","Copf":"\u2102","coprod":"\u2210","Coproduct":"\u2210","copy":"\u00A9","COPY":"\u00A9","copysr":"\u2117","CounterClockwiseContourIntegral":"\u2233","crarr":"\u21B5","cross":"\u2717","Cross":"\u2A2F","Cscr":"\uD835\uDC9E","cscr":"\uD835\uDCB8","csub":"\u2ACF","csube":"\u2AD1","csup":"\u2AD0","csupe":"\u2AD2","ctdot":"\u22EF","cudarrl":"\u2938","cudarrr":"\u2935","cuepr":"\u22DE","cuesc":"\u22DF","cularr":"\u21B6","cularrp":"\u293D","cupbrcap":"\u2A48","cupcap":"\u2A46","CupCap":"\u224D","cup":"\u222A","Cup":"\u22D3","cupcup":"\u2A4A","cupdot":"\u228D","cupor":"\u2A45","cups":"\u222A\uFE00","curarr":"\u21B7","curarrm":"\u293C","curlyeqprec":"\u22DE","curlyeqsucc":"\u22DF","curlyvee":"\u22CE","curlywedge":"\u22CF","curren":"\u00A4","curvearrowleft":"\u21B6","curvearrowright":"\u21B7","cuvee":"\u22CE","cuwed":"\u22CF","cwconint":"\u2232","cwint":"\u2231","cylcty":"\u232D","dagger":"\u2020","Dagger":"\u2021","daleth":"\u2138","darr":"\u2193","Darr":"\u21A1","dArr":"\u21D3","dash":"\u2010","Dashv":"\u2AE4","dashv":"\u22A3","dbkarow":"\u290F","dblac":"\u02DD","Dcaron":"\u010E","dcaron":"\u010F","Dcy":"\u0414","dcy":"\u0434","ddagger":"\u2021","ddarr":"\u21CA","DD":"\u2145","dd":"\u2146","DDotrahd":"\u2911","ddotseq":"\u2A77","deg":"\u00B0","Del":"\u2207","Delta":"\u0394","delta":"\u03B4","demptyv":"\u29B1","dfisht":"\u297F","Dfr":"\uD835\uDD07","dfr":"\uD835\uDD21","dHar":"\u2965","dharl":"\u21C3","dharr":"\u21C2","DiacriticalAcute":"\u00B4","DiacriticalDot":"\u02D9","DiacriticalDoubleAcute":"\u02DD","DiacriticalGrave":"`","DiacriticalTilde":"\u02DC","diam":"\u22C4","diamond":"\u22C4","Diamond":"\u22C4","diamondsuit":"\u2666","diams":"\u2666","die":"\u00A8","DifferentialD":"\u2146","digamma":"\u03DD","disin":"\u22F2","div":"\u00F7","divide":"\u00F7","divideontimes":"\u22C7","divonx":"\u22C7","DJcy":"\u0402","djcy":"\u0452","dlcorn":"\u231E","dlcrop":"\u230D","dollar":"$","Dopf":"\uD835\uDD3B","dopf":"\uD835\uDD55","Dot":"\u00A8","dot":"\u02D9","DotDot":"\u20DC","doteq":"\u2250","doteqdot":"\u2251","DotEqual":"\u2250","dotminus":"\u2238","dotplus":"\u2214","dotsquare":"\u22A1","doublebarwedge":"\u2306","DoubleContourIntegral":"\u222F","DoubleDot":"\u00A8","DoubleDownArrow":"\u21D3","DoubleLeftArrow":"\u21D0","DoubleLeftRightArrow":"\u21D4","DoubleLeftTee":"\u2AE4","DoubleLongLeftArrow":"\u27F8","DoubleLongLeftRightArrow":"\u27FA","DoubleLongRightArrow":"\u27F9","DoubleRightArrow":"\u21D2","DoubleRightTee":"\u22A8","DoubleUpArrow":"\u21D1","DoubleUpDownArrow":"\u21D5","DoubleVerticalBar":"\u2225","DownArrowBar":"\u2913","downarrow":"\u2193","DownArrow":"\u2193","Downarrow":"\u21D3","DownArrowUpArrow":"\u21F5","DownBreve":"\u0311","downdownarrows":"\u21CA","downharpoonleft":"\u21C3","downharpoonright":"\u21C2","DownLeftRightVector":"\u2950","DownLeftTeeVector":"\u295E","DownLeftVectorBar":"\u2956","DownLeftVector":"\u21BD","DownRightTeeVector":"\u295F","DownRightVectorBar":"\u2957","DownRightVector":"\u21C1","DownTeeArrow":"\u21A7","DownTee":"\u22A4","drbkarow":"\u2910","drcorn":"\u231F","drcrop":"\u230C","Dscr":"\uD835\uDC9F","dscr":"\uD835\uDCB9","DScy":"\u0405","dscy":"\u0455","dsol":"\u29F6","Dstrok":"\u0110","dstrok":"\u0111","dtdot":"\u22F1","dtri":"\u25BF","dtrif":"\u25BE","duarr":"\u21F5","duhar":"\u296F","dwangle":"\u29A6","DZcy":"\u040F","dzcy":"\u045F","dzigrarr":"\u27FF","Eacute":"\u00C9","eacute":"\u00E9","easter":"\u2A6E","Ecaron":"\u011A","ecaron":"\u011B","Ecirc":"\u00CA","ecirc":"\u00EA","ecir":"\u2256","ecolon":"\u2255","Ecy":"\u042D","ecy":"\u044D","eDDot":"\u2A77","Edot":"\u0116","edot":"\u0117","eDot":"\u2251","ee":"\u2147","efDot":"\u2252","Efr":"\uD835\uDD08","efr":"\uD835\uDD22","eg":"\u2A9A","Egrave":"\u00C8","egrave":"\u00E8","egs":"\u2A96","egsdot":"\u2A98","el":"\u2A99","Element":"\u2208","elinters":"\u23E7","ell":"\u2113","els":"\u2A95","elsdot":"\u2A97","Emacr":"\u0112","emacr":"\u0113","empty":"\u2205","emptyset":"\u2205","EmptySmallSquare":"\u25FB","emptyv":"\u2205","EmptyVerySmallSquare":"\u25AB","emsp13":"\u2004","emsp14":"\u2005","emsp":"\u2003","ENG":"\u014A","eng":"\u014B","ensp":"\u2002","Eogon":"\u0118","eogon":"\u0119","Eopf":"\uD835\uDD3C","eopf":"\uD835\uDD56","epar":"\u22D5","eparsl":"\u29E3","eplus":"\u2A71","epsi":"\u03B5","Epsilon":"\u0395","epsilon":"\u03B5","epsiv":"\u03F5","eqcirc":"\u2256","eqcolon":"\u2255","eqsim":"\u2242","eqslantgtr":"\u2A96","eqslantless":"\u2A95","Equal":"\u2A75","equals":"=","EqualTilde":"\u2242","equest":"\u225F","Equilibrium":"\u21CC","equiv":"\u2261","equivDD":"\u2A78","eqvparsl":"\u29E5","erarr":"\u2971","erDot":"\u2253","escr":"\u212F","Escr":"\u2130","esdot":"\u2250","Esim":"\u2A73","esim":"\u2242","Eta":"\u0397","eta":"\u03B7","ETH":"\u00D0","eth":"\u00F0","Euml":"\u00CB","euml":"\u00EB","euro":"\u20AC","excl":"!","exist":"\u2203","Exists":"\u2203","expectation":"\u2130","exponentiale":"\u2147","ExponentialE":"\u2147","fallingdotseq":"\u2252","Fcy":"\u0424","fcy":"\u0444","female":"\u2640","ffilig":"\uFB03","fflig":"\uFB00","ffllig":"\uFB04","Ffr":"\uD835\uDD09","ffr":"\uD835\uDD23","filig":"\uFB01","FilledSmallSquare":"\u25FC","FilledVerySmallSquare":"\u25AA","fjlig":"fj","flat":"\u266D","fllig":"\uFB02","fltns":"\u25B1","fnof":"\u0192","Fopf":"\uD835\uDD3D","fopf":"\uD835\uDD57","forall":"\u2200","ForAll":"\u2200","fork":"\u22D4","forkv":"\u2AD9","Fouriertrf":"\u2131","fpartint":"\u2A0D","frac12":"\u00BD","frac13":"\u2153","frac14":"\u00BC","frac15":"\u2155","frac16":"\u2159","frac18":"\u215B","frac23":"\u2154","frac25":"\u2156","frac34":"\u00BE","frac35":"\u2157","frac38":"\u215C","frac45":"\u2158","frac56":"\u215A","frac58":"\u215D","frac78":"\u215E","frasl":"\u2044","frown":"\u2322","fscr":"\uD835\uDCBB","Fscr":"\u2131","gacute":"\u01F5","Gamma":"\u0393","gamma":"\u03B3","Gammad":"\u03DC","gammad":"\u03DD","gap":"\u2A86","Gbreve":"\u011E","gbreve":"\u011F","Gcedil":"\u0122","Gcirc":"\u011C","gcirc":"\u011D","Gcy":"\u0413","gcy":"\u0433","Gdot":"\u0120","gdot":"\u0121","ge":"\u2265","gE":"\u2267","gEl":"\u2A8C","gel":"\u22DB","geq":"\u2265","geqq":"\u2267","geqslant":"\u2A7E","gescc":"\u2AA9","ges":"\u2A7E","gesdot":"\u2A80","gesdoto":"\u2A82","gesdotol":"\u2A84","gesl":"\u22DB\uFE00","gesles":"\u2A94","Gfr":"\uD835\uDD0A","gfr":"\uD835\uDD24","gg":"\u226B","Gg":"\u22D9","ggg":"\u22D9","gimel":"\u2137","GJcy":"\u0403","gjcy":"\u0453","gla":"\u2AA5","gl":"\u2277","glE":"\u2A92","glj":"\u2AA4","gnap":"\u2A8A","gnapprox":"\u2A8A","gne":"\u2A88","gnE":"\u2269","gneq":"\u2A88","gneqq":"\u2269","gnsim":"\u22E7","Gopf":"\uD835\uDD3E","gopf":"\uD835\uDD58","grave":"`","GreaterEqual":"\u2265","GreaterEqualLess":"\u22DB","GreaterFullEqual":"\u2267","GreaterGreater":"\u2AA2","GreaterLess":"\u2277","GreaterSlantEqual":"\u2A7E","GreaterTilde":"\u2273","Gscr":"\uD835\uDCA2","gscr":"\u210A","gsim":"\u2273","gsime":"\u2A8E","gsiml":"\u2A90","gtcc":"\u2AA7","gtcir":"\u2A7A","gt":">","GT":">","Gt":"\u226B","gtdot":"\u22D7","gtlPar":"\u2995","gtquest":"\u2A7C","gtrapprox":"\u2A86","gtrarr":"\u2978","gtrdot":"\u22D7","gtreqless":"\u22DB","gtreqqless":"\u2A8C","gtrless":"\u2277","gtrsim":"\u2273","gvertneqq":"\u2269\uFE00","gvnE":"\u2269\uFE00","Hacek":"\u02C7","hairsp":"\u200A","half":"\u00BD","hamilt":"\u210B","HARDcy":"\u042A","hardcy":"\u044A","harrcir":"\u2948","harr":"\u2194","hArr":"\u21D4","harrw":"\u21AD","Hat":"^","hbar":"\u210F","Hcirc":"\u0124","hcirc":"\u0125","hearts":"\u2665","heartsuit":"\u2665","hellip":"\u2026","hercon":"\u22B9","hfr":"\uD835\uDD25","Hfr":"\u210C","HilbertSpace":"\u210B","hksearow":"\u2925","hkswarow":"\u2926","hoarr":"\u21FF","homtht":"\u223B","hookleftarrow":"\u21A9","hookrightarrow":"\u21AA","hopf":"\uD835\uDD59","Hopf":"\u210D","horbar":"\u2015","HorizontalLine":"\u2500","hscr":"\uD835\uDCBD","Hscr":"\u210B","hslash":"\u210F","Hstrok":"\u0126","hstrok":"\u0127","HumpDownHump":"\u224E","HumpEqual":"\u224F","hybull":"\u2043","hyphen":"\u2010","Iacute":"\u00CD","iacute":"\u00ED","ic":"\u2063","Icirc":"\u00CE","icirc":"\u00EE","Icy":"\u0418","icy":"\u0438","Idot":"\u0130","IEcy":"\u0415","iecy":"\u0435","iexcl":"\u00A1","iff":"\u21D4","ifr":"\uD835\uDD26","Ifr":"\u2111","Igrave":"\u00CC","igrave":"\u00EC","ii":"\u2148","iiiint":"\u2A0C","iiint":"\u222D","iinfin":"\u29DC","iiota":"\u2129","IJlig":"\u0132","ijlig":"\u0133","Imacr":"\u012A","imacr":"\u012B","image":"\u2111","ImaginaryI":"\u2148","imagline":"\u2110","imagpart":"\u2111","imath":"\u0131","Im":"\u2111","imof":"\u22B7","imped":"\u01B5","Implies":"\u21D2","incare":"\u2105","in":"\u2208","infin":"\u221E","infintie":"\u29DD","inodot":"\u0131","intcal":"\u22BA","int":"\u222B","Int":"\u222C","integers":"\u2124","Integral":"\u222B","intercal":"\u22BA","Intersection":"\u22C2","intlarhk":"\u2A17","intprod":"\u2A3C","InvisibleComma":"\u2063","InvisibleTimes":"\u2062","IOcy":"\u0401","iocy":"\u0451","Iogon":"\u012E","iogon":"\u012F","Iopf":"\uD835\uDD40","iopf":"\uD835\uDD5A","Iota":"\u0399","iota":"\u03B9","iprod":"\u2A3C","iquest":"\u00BF","iscr":"\uD835\uDCBE","Iscr":"\u2110","isin":"\u2208","isindot":"\u22F5","isinE":"\u22F9","isins":"\u22F4","isinsv":"\u22F3","isinv":"\u2208","it":"\u2062","Itilde":"\u0128","itilde":"\u0129","Iukcy":"\u0406","iukcy":"\u0456","Iuml":"\u00CF","iuml":"\u00EF","Jcirc":"\u0134","jcirc":"\u0135","Jcy":"\u0419","jcy":"\u0439","Jfr":"\uD835\uDD0D","jfr":"\uD835\uDD27","jmath":"\u0237","Jopf":"\uD835\uDD41","jopf":"\uD835\uDD5B","Jscr":"\uD835\uDCA5","jscr":"\uD835\uDCBF","Jsercy":"\u0408","jsercy":"\u0458","Jukcy":"\u0404","jukcy":"\u0454","Kappa":"\u039A","kappa":"\u03BA","kappav":"\u03F0","Kcedil":"\u0136","kcedil":"\u0137","Kcy":"\u041A","kcy":"\u043A","Kfr":"\uD835\uDD0E","kfr":"\uD835\uDD28","kgreen":"\u0138","KHcy":"\u0425","khcy":"\u0445","KJcy":"\u040C","kjcy":"\u045C","Kopf":"\uD835\uDD42","kopf":"\uD835\uDD5C","Kscr":"\uD835\uDCA6","kscr":"\uD835\uDCC0","lAarr":"\u21DA","Lacute":"\u0139","lacute":"\u013A","laemptyv":"\u29B4","lagran":"\u2112","Lambda":"\u039B","lambda":"\u03BB","lang":"\u27E8","Lang":"\u27EA","langd":"\u2991","langle":"\u27E8","lap":"\u2A85","Laplacetrf":"\u2112","laquo":"\u00AB","larrb":"\u21E4","larrbfs":"\u291F","larr":"\u2190","Larr":"\u219E","lArr":"\u21D0","larrfs":"\u291D","larrhk":"\u21A9","larrlp":"\u21AB","larrpl":"\u2939","larrsim":"\u2973","larrtl":"\u21A2","latail":"\u2919","lAtail":"\u291B","lat":"\u2AAB","late":"\u2AAD","lates":"\u2AAD\uFE00","lbarr":"\u290C","lBarr":"\u290E","lbbrk":"\u2772","lbrace":"{","lbrack":"[","lbrke":"\u298B","lbrksld":"\u298F","lbrkslu":"\u298D","Lcaron":"\u013D","lcaron":"\u013E","Lcedil":"\u013B","lcedil":"\u013C","lceil":"\u2308","lcub":"{","Lcy":"\u041B","lcy":"\u043B","ldca":"\u2936","ldquo":"\u201C","ldquor":"\u201E","ldrdhar":"\u2967","ldrushar":"\u294B","ldsh":"\u21B2","le":"\u2264","lE":"\u2266","LeftAngleBracket":"\u27E8","LeftArrowBar":"\u21E4","leftarrow":"\u2190","LeftArrow":"\u2190","Leftarrow":"\u21D0","LeftArrowRightArrow":"\u21C6","leftarrowtail":"\u21A2","LeftCeiling":"\u2308","LeftDoubleBracket":"\u27E6","LeftDownTeeVector":"\u2961","LeftDownVectorBar":"\u2959","LeftDownVector":"\u21C3","LeftFloor":"\u230A","leftharpoondown":"\u21BD","leftharpoonup":"\u21BC","leftleftarrows":"\u21C7","leftrightarrow":"\u2194","LeftRightArrow":"\u2194","Leftrightarrow":"\u21D4","leftrightarrows":"\u21C6","leftrightharpoons":"\u21CB","leftrightsquigarrow":"\u21AD","LeftRightVector":"\u294E","LeftTeeArrow":"\u21A4","LeftTee":"\u22A3","LeftTeeVector":"\u295A","leftthreetimes":"\u22CB","LeftTriangleBar":"\u29CF","LeftTriangle":"\u22B2","LeftTriangleEqual":"\u22B4","LeftUpDownVector":"\u2951","LeftUpTeeVector":"\u2960","LeftUpVectorBar":"\u2958","LeftUpVector":"\u21BF","LeftVectorBar":"\u2952","LeftVector":"\u21BC","lEg":"\u2A8B","leg":"\u22DA","leq":"\u2264","leqq":"\u2266","leqslant":"\u2A7D","lescc":"\u2AA8","les":"\u2A7D","lesdot":"\u2A7F","lesdoto":"\u2A81","lesdotor":"\u2A83","lesg":"\u22DA\uFE00","lesges":"\u2A93","lessapprox":"\u2A85","lessdot":"\u22D6","lesseqgtr":"\u22DA","lesseqqgtr":"\u2A8B","LessEqualGreater":"\u22DA","LessFullEqual":"\u2266","LessGreater":"\u2276","lessgtr":"\u2276","LessLess":"\u2AA1","lesssim":"\u2272","LessSlantEqual":"\u2A7D","LessTilde":"\u2272","lfisht":"\u297C","lfloor":"\u230A","Lfr":"\uD835\uDD0F","lfr":"\uD835\uDD29","lg":"\u2276","lgE":"\u2A91","lHar":"\u2962","lhard":"\u21BD","lharu":"\u21BC","lharul":"\u296A","lhblk":"\u2584","LJcy":"\u0409","ljcy":"\u0459","llarr":"\u21C7","ll":"\u226A","Ll":"\u22D8","llcorner":"\u231E","Lleftarrow":"\u21DA","llhard":"\u296B","lltri":"\u25FA","Lmidot":"\u013F","lmidot":"\u0140","lmoustache":"\u23B0","lmoust":"\u23B0","lnap":"\u2A89","lnapprox":"\u2A89","lne":"\u2A87","lnE":"\u2268","lneq":"\u2A87","lneqq":"\u2268","lnsim":"\u22E6","loang":"\u27EC","loarr":"\u21FD","lobrk":"\u27E6","longleftarrow":"\u27F5","LongLeftArrow":"\u27F5","Longleftarrow":"\u27F8","longleftrightarrow":"\u27F7","LongLeftRightArrow":"\u27F7","Longleftrightarrow":"\u27FA","longmapsto":"\u27FC","longrightarrow":"\u27F6","LongRightArrow":"\u27F6","Longrightarrow":"\u27F9","looparrowleft":"\u21AB","looparrowright":"\u21AC","lopar":"\u2985","Lopf":"\uD835\uDD43","lopf":"\uD835\uDD5D","loplus":"\u2A2D","lotimes":"\u2A34","lowast":"\u2217","lowbar":"_","LowerLeftArrow":"\u2199","LowerRightArrow":"\u2198","loz":"\u25CA","lozenge":"\u25CA","lozf":"\u29EB","lpar":"(","lparlt":"\u2993","lrarr":"\u21C6","lrcorner":"\u231F","lrhar":"\u21CB","lrhard":"\u296D","lrm":"\u200E","lrtri":"\u22BF","lsaquo":"\u2039","lscr":"\uD835\uDCC1","Lscr":"\u2112","lsh":"\u21B0","Lsh":"\u21B0","lsim":"\u2272","lsime":"\u2A8D","lsimg":"\u2A8F","lsqb":"[","lsquo":"\u2018","lsquor":"\u201A","Lstrok":"\u0141","lstrok":"\u0142","ltcc":"\u2AA6","ltcir":"\u2A79","lt":"<","LT":"<","Lt":"\u226A","ltdot":"\u22D6","lthree":"\u22CB","ltimes":"\u22C9","ltlarr":"\u2976","ltquest":"\u2A7B","ltri":"\u25C3","ltrie":"\u22B4","ltrif":"\u25C2","ltrPar":"\u2996","lurdshar":"\u294A","luruhar":"\u2966","lvertneqq":"\u2268\uFE00","lvnE":"\u2268\uFE00","macr":"\u00AF","male":"\u2642","malt":"\u2720","maltese":"\u2720","Map":"\u2905","map":"\u21A6","mapsto":"\u21A6","mapstodown":"\u21A7","mapstoleft":"\u21A4","mapstoup":"\u21A5","marker":"\u25AE","mcomma":"\u2A29","Mcy":"\u041C","mcy":"\u043C","mdash":"\u2014","mDDot":"\u223A","measuredangle":"\u2221","MediumSpace":"\u205F","Mellintrf":"\u2133","Mfr":"\uD835\uDD10","mfr":"\uD835\uDD2A","mho":"\u2127","micro":"\u00B5","midast":"*","midcir":"\u2AF0","mid":"\u2223","middot":"\u00B7","minusb":"\u229F","minus":"\u2212","minusd":"\u2238","minusdu":"\u2A2A","MinusPlus":"\u2213","mlcp":"\u2ADB","mldr":"\u2026","mnplus":"\u2213","models":"\u22A7","Mopf":"\uD835\uDD44","mopf":"\uD835\uDD5E","mp":"\u2213","mscr":"\uD835\uDCC2","Mscr":"\u2133","mstpos":"\u223E","Mu":"\u039C","mu":"\u03BC","multimap":"\u22B8","mumap":"\u22B8","nabla":"\u2207","Nacute":"\u0143","nacute":"\u0144","nang":"\u2220\u20D2","nap":"\u2249","napE":"\u2A70\u0338","napid":"\u224B\u0338","napos":"\u0149","napprox":"\u2249","natural":"\u266E","naturals":"\u2115","natur":"\u266E","nbsp":"\u00A0","nbump":"\u224E\u0338","nbumpe":"\u224F\u0338","ncap":"\u2A43","Ncaron":"\u0147","ncaron":"\u0148","Ncedil":"\u0145","ncedil":"\u0146","ncong":"\u2247","ncongdot":"\u2A6D\u0338","ncup":"\u2A42","Ncy":"\u041D","ncy":"\u043D","ndash":"\u2013","nearhk":"\u2924","nearr":"\u2197","neArr":"\u21D7","nearrow":"\u2197","ne":"\u2260","nedot":"\u2250\u0338","NegativeMediumSpace":"\u200B","NegativeThickSpace":"\u200B","NegativeThinSpace":"\u200B","NegativeVeryThinSpace":"\u200B","nequiv":"\u2262","nesear":"\u2928","nesim":"\u2242\u0338","NestedGreaterGreater":"\u226B","NestedLessLess":"\u226A","NewLine":"\n","nexist":"\u2204","nexists":"\u2204","Nfr":"\uD835\uDD11","nfr":"\uD835\uDD2B","ngE":"\u2267\u0338","nge":"\u2271","ngeq":"\u2271","ngeqq":"\u2267\u0338","ngeqslant":"\u2A7E\u0338","nges":"\u2A7E\u0338","nGg":"\u22D9\u0338","ngsim":"\u2275","nGt":"\u226B\u20D2","ngt":"\u226F","ngtr":"\u226F","nGtv":"\u226B\u0338","nharr":"\u21AE","nhArr":"\u21CE","nhpar":"\u2AF2","ni":"\u220B","nis":"\u22FC","nisd":"\u22FA","niv":"\u220B","NJcy":"\u040A","njcy":"\u045A","nlarr":"\u219A","nlArr":"\u21CD","nldr":"\u2025","nlE":"\u2266\u0338","nle":"\u2270","nleftarrow":"\u219A","nLeftarrow":"\u21CD","nleftrightarrow":"\u21AE","nLeftrightarrow":"\u21CE","nleq":"\u2270","nleqq":"\u2266\u0338","nleqslant":"\u2A7D\u0338","nles":"\u2A7D\u0338","nless":"\u226E","nLl":"\u22D8\u0338","nlsim":"\u2274","nLt":"\u226A\u20D2","nlt":"\u226E","nltri":"\u22EA","nltrie":"\u22EC","nLtv":"\u226A\u0338","nmid":"\u2224","NoBreak":"\u2060","NonBreakingSpace":"\u00A0","nopf":"\uD835\uDD5F","Nopf":"\u2115","Not":"\u2AEC","not":"\u00AC","NotCongruent":"\u2262","NotCupCap":"\u226D","NotDoubleVerticalBar":"\u2226","NotElement":"\u2209","NotEqual":"\u2260","NotEqualTilde":"\u2242\u0338","NotExists":"\u2204","NotGreater":"\u226F","NotGreaterEqual":"\u2271","NotGreaterFullEqual":"\u2267\u0338","NotGreaterGreater":"\u226B\u0338","NotGreaterLess":"\u2279","NotGreaterSlantEqual":"\u2A7E\u0338","NotGreaterTilde":"\u2275","NotHumpDownHump":"\u224E\u0338","NotHumpEqual":"\u224F\u0338","notin":"\u2209","notindot":"\u22F5\u0338","notinE":"\u22F9\u0338","notinva":"\u2209","notinvb":"\u22F7","notinvc":"\u22F6","NotLeftTriangleBar":"\u29CF\u0338","NotLeftTriangle":"\u22EA","NotLeftTriangleEqual":"\u22EC","NotLess":"\u226E","NotLessEqual":"\u2270","NotLessGreater":"\u2278","NotLessLess":"\u226A\u0338","NotLessSlantEqual":"\u2A7D\u0338","NotLessTilde":"\u2274","NotNestedGreaterGreater":"\u2AA2\u0338","NotNestedLessLess":"\u2AA1\u0338","notni":"\u220C","notniva":"\u220C","notnivb":"\u22FE","notnivc":"\u22FD","NotPrecedes":"\u2280","NotPrecedesEqual":"\u2AAF\u0338","NotPrecedesSlantEqual":"\u22E0","NotReverseElement":"\u220C","NotRightTriangleBar":"\u29D0\u0338","NotRightTriangle":"\u22EB","NotRightTriangleEqual":"\u22ED","NotSquareSubset":"\u228F\u0338","NotSquareSubsetEqual":"\u22E2","NotSquareSuperset":"\u2290\u0338","NotSquareSupersetEqual":"\u22E3","NotSubset":"\u2282\u20D2","NotSubsetEqual":"\u2288","NotSucceeds":"\u2281","NotSucceedsEqual":"\u2AB0\u0338","NotSucceedsSlantEqual":"\u22E1","NotSucceedsTilde":"\u227F\u0338","NotSuperset":"\u2283\u20D2","NotSupersetEqual":"\u2289","NotTilde":"\u2241","NotTildeEqual":"\u2244","NotTildeFullEqual":"\u2247","NotTildeTilde":"\u2249","NotVerticalBar":"\u2224","nparallel":"\u2226","npar":"\u2226","nparsl":"\u2AFD\u20E5","npart":"\u2202\u0338","npolint":"\u2A14","npr":"\u2280","nprcue":"\u22E0","nprec":"\u2280","npreceq":"\u2AAF\u0338","npre":"\u2AAF\u0338","nrarrc":"\u2933\u0338","nrarr":"\u219B","nrArr":"\u21CF","nrarrw":"\u219D\u0338","nrightarrow":"\u219B","nRightarrow":"\u21CF","nrtri":"\u22EB","nrtrie":"\u22ED","nsc":"\u2281","nsccue":"\u22E1","nsce":"\u2AB0\u0338","Nscr":"\uD835\uDCA9","nscr":"\uD835\uDCC3","nshortmid":"\u2224","nshortparallel":"\u2226","nsim":"\u2241","nsime":"\u2244","nsimeq":"\u2244","nsmid":"\u2224","nspar":"\u2226","nsqsube":"\u22E2","nsqsupe":"\u22E3","nsub":"\u2284","nsubE":"\u2AC5\u0338","nsube":"\u2288","nsubset":"\u2282\u20D2","nsubseteq":"\u2288","nsubseteqq":"\u2AC5\u0338","nsucc":"\u2281","nsucceq":"\u2AB0\u0338","nsup":"\u2285","nsupE":"\u2AC6\u0338","nsupe":"\u2289","nsupset":"\u2283\u20D2","nsupseteq":"\u2289","nsupseteqq":"\u2AC6\u0338","ntgl":"\u2279","Ntilde":"\u00D1","ntilde":"\u00F1","ntlg":"\u2278","ntriangleleft":"\u22EA","ntrianglelefteq":"\u22EC","ntriangleright":"\u22EB","ntrianglerighteq":"\u22ED","Nu":"\u039D","nu":"\u03BD","num":"#","numero":"\u2116","numsp":"\u2007","nvap":"\u224D\u20D2","nvdash":"\u22AC","nvDash":"\u22AD","nVdash":"\u22AE","nVDash":"\u22AF","nvge":"\u2265\u20D2","nvgt":">\u20D2","nvHarr":"\u2904","nvinfin":"\u29DE","nvlArr":"\u2902","nvle":"\u2264\u20D2","nvlt":"<\u20D2","nvltrie":"\u22B4\u20D2","nvrArr":"\u2903","nvrtrie":"\u22B5\u20D2","nvsim":"\u223C\u20D2","nwarhk":"\u2923","nwarr":"\u2196","nwArr":"\u21D6","nwarrow":"\u2196","nwnear":"\u2927","Oacute":"\u00D3","oacute":"\u00F3","oast":"\u229B","Ocirc":"\u00D4","ocirc":"\u00F4","ocir":"\u229A","Ocy":"\u041E","ocy":"\u043E","odash":"\u229D","Odblac":"\u0150","odblac":"\u0151","odiv":"\u2A38","odot":"\u2299","odsold":"\u29BC","OElig":"\u0152","oelig":"\u0153","ofcir":"\u29BF","Ofr":"\uD835\uDD12","ofr":"\uD835\uDD2C","ogon":"\u02DB","Ograve":"\u00D2","ograve":"\u00F2","ogt":"\u29C1","ohbar":"\u29B5","ohm":"\u03A9","oint":"\u222E","olarr":"\u21BA","olcir":"\u29BE","olcross":"\u29BB","oline":"\u203E","olt":"\u29C0","Omacr":"\u014C","omacr":"\u014D","Omega":"\u03A9","omega":"\u03C9","Omicron":"\u039F","omicron":"\u03BF","omid":"\u29B6","ominus":"\u2296","Oopf":"\uD835\uDD46","oopf":"\uD835\uDD60","opar":"\u29B7","OpenCurlyDoubleQuote":"\u201C","OpenCurlyQuote":"\u2018","operp":"\u29B9","oplus":"\u2295","orarr":"\u21BB","Or":"\u2A54","or":"\u2228","ord":"\u2A5D","order":"\u2134","orderof":"\u2134","ordf":"\u00AA","ordm":"\u00BA","origof":"\u22B6","oror":"\u2A56","orslope":"\u2A57","orv":"\u2A5B","oS":"\u24C8","Oscr":"\uD835\uDCAA","oscr":"\u2134","Oslash":"\u00D8","oslash":"\u00F8","osol":"\u2298","Otilde":"\u00D5","otilde":"\u00F5","otimesas":"\u2A36","Otimes":"\u2A37","otimes":"\u2297","Ouml":"\u00D6","ouml":"\u00F6","ovbar":"\u233D","OverBar":"\u203E","OverBrace":"\u23DE","OverBracket":"\u23B4","OverParenthesis":"\u23DC","para":"\u00B6","parallel":"\u2225","par":"\u2225","parsim":"\u2AF3","parsl":"\u2AFD","part":"\u2202","PartialD":"\u2202","Pcy":"\u041F","pcy":"\u043F","percnt":"%","period":".","permil":"\u2030","perp":"\u22A5","pertenk":"\u2031","Pfr":"\uD835\uDD13","pfr":"\uD835\uDD2D","Phi":"\u03A6","phi":"\u03C6","phiv":"\u03D5","phmmat":"\u2133","phone":"\u260E","Pi":"\u03A0","pi":"\u03C0","pitchfork":"\u22D4","piv":"\u03D6","planck":"\u210F","planckh":"\u210E","plankv":"\u210F","plusacir":"\u2A23","plusb":"\u229E","pluscir":"\u2A22","plus":"+","plusdo":"\u2214","plusdu":"\u2A25","pluse":"\u2A72","PlusMinus":"\u00B1","plusmn":"\u00B1","plussim":"\u2A26","plustwo":"\u2A27","pm":"\u00B1","Poincareplane":"\u210C","pointint":"\u2A15","popf":"\uD835\uDD61","Popf":"\u2119","pound":"\u00A3","prap":"\u2AB7","Pr":"\u2ABB","pr":"\u227A","prcue":"\u227C","precapprox":"\u2AB7","prec":"\u227A","preccurlyeq":"\u227C","Precedes":"\u227A","PrecedesEqual":"\u2AAF","PrecedesSlantEqual":"\u227C","PrecedesTilde":"\u227E","preceq":"\u2AAF","precnapprox":"\u2AB9","precneqq":"\u2AB5","precnsim":"\u22E8","pre":"\u2AAF","prE":"\u2AB3","precsim":"\u227E","prime":"\u2032","Prime":"\u2033","primes":"\u2119","prnap":"\u2AB9","prnE":"\u2AB5","prnsim":"\u22E8","prod":"\u220F","Product":"\u220F","profalar":"\u232E","profline":"\u2312","profsurf":"\u2313","prop":"\u221D","Proportional":"\u221D","Proportion":"\u2237","propto":"\u221D","prsim":"\u227E","prurel":"\u22B0","Pscr":"\uD835\uDCAB","pscr":"\uD835\uDCC5","Psi":"\u03A8","psi":"\u03C8","puncsp":"\u2008","Qfr":"\uD835\uDD14","qfr":"\uD835\uDD2E","qint":"\u2A0C","qopf":"\uD835\uDD62","Qopf":"\u211A","qprime":"\u2057","Qscr":"\uD835\uDCAC","qscr":"\uD835\uDCC6","quaternions":"\u210D","quatint":"\u2A16","quest":"?","questeq":"\u225F","quot":"\"","QUOT":"\"","rAarr":"\u21DB","race":"\u223D\u0331","Racute":"\u0154","racute":"\u0155","radic":"\u221A","raemptyv":"\u29B3","rang":"\u27E9","Rang":"\u27EB","rangd":"\u2992","range":"\u29A5","rangle":"\u27E9","raquo":"\u00BB","rarrap":"\u2975","rarrb":"\u21E5","rarrbfs":"\u2920","rarrc":"\u2933","rarr":"\u2192","Rarr":"\u21A0","rArr":"\u21D2","rarrfs":"\u291E","rarrhk":"\u21AA","rarrlp":"\u21AC","rarrpl":"\u2945","rarrsim":"\u2974","Rarrtl":"\u2916","rarrtl":"\u21A3","rarrw":"\u219D","ratail":"\u291A","rAtail":"\u291C","ratio":"\u2236","rationals":"\u211A","rbarr":"\u290D","rBarr":"\u290F","RBarr":"\u2910","rbbrk":"\u2773","rbrace":"}","rbrack":"]","rbrke":"\u298C","rbrksld":"\u298E","rbrkslu":"\u2990","Rcaron":"\u0158","rcaron":"\u0159","Rcedil":"\u0156","rcedil":"\u0157","rceil":"\u2309","rcub":"}","Rcy":"\u0420","rcy":"\u0440","rdca":"\u2937","rdldhar":"\u2969","rdquo":"\u201D","rdquor":"\u201D","rdsh":"\u21B3","real":"\u211C","realine":"\u211B","realpart":"\u211C","reals":"\u211D","Re":"\u211C","rect":"\u25AD","reg":"\u00AE","REG":"\u00AE","ReverseElement":"\u220B","ReverseEquilibrium":"\u21CB","ReverseUpEquilibrium":"\u296F","rfisht":"\u297D","rfloor":"\u230B","rfr":"\uD835\uDD2F","Rfr":"\u211C","rHar":"\u2964","rhard":"\u21C1","rharu":"\u21C0","rharul":"\u296C","Rho":"\u03A1","rho":"\u03C1","rhov":"\u03F1","RightAngleBracket":"\u27E9","RightArrowBar":"\u21E5","rightarrow":"\u2192","RightArrow":"\u2192","Rightarrow":"\u21D2","RightArrowLeftArrow":"\u21C4","rightarrowtail":"\u21A3","RightCeiling":"\u2309","RightDoubleBracket":"\u27E7","RightDownTeeVector":"\u295D","RightDownVectorBar":"\u2955","RightDownVector":"\u21C2","RightFloor":"\u230B","rightharpoondown":"\u21C1","rightharpoonup":"\u21C0","rightleftarrows":"\u21C4","rightleftharpoons":"\u21CC","rightrightarrows":"\u21C9","rightsquigarrow":"\u219D","RightTeeArrow":"\u21A6","RightTee":"\u22A2","RightTeeVector":"\u295B","rightthreetimes":"\u22CC","RightTriangleBar":"\u29D0","RightTriangle":"\u22B3","RightTriangleEqual":"\u22B5","RightUpDownVector":"\u294F","RightUpTeeVector":"\u295C","RightUpVectorBar":"\u2954","RightUpVector":"\u21BE","RightVectorBar":"\u2953","RightVector":"\u21C0","ring":"\u02DA","risingdotseq":"\u2253","rlarr":"\u21C4","rlhar":"\u21CC","rlm":"\u200F","rmoustache":"\u23B1","rmoust":"\u23B1","rnmid":"\u2AEE","roang":"\u27ED","roarr":"\u21FE","robrk":"\u27E7","ropar":"\u2986","ropf":"\uD835\uDD63","Ropf":"\u211D","roplus":"\u2A2E","rotimes":"\u2A35","RoundImplies":"\u2970","rpar":")","rpargt":"\u2994","rppolint":"\u2A12","rrarr":"\u21C9","Rrightarrow":"\u21DB","rsaquo":"\u203A","rscr":"\uD835\uDCC7","Rscr":"\u211B","rsh":"\u21B1","Rsh":"\u21B1","rsqb":"]","rsquo":"\u2019","rsquor":"\u2019","rthree":"\u22CC","rtimes":"\u22CA","rtri":"\u25B9","rtrie":"\u22B5","rtrif":"\u25B8","rtriltri":"\u29CE","RuleDelayed":"\u29F4","ruluhar":"\u2968","rx":"\u211E","Sacute":"\u015A","sacute":"\u015B","sbquo":"\u201A","scap":"\u2AB8","Scaron":"\u0160","scaron":"\u0161","Sc":"\u2ABC","sc":"\u227B","sccue":"\u227D","sce":"\u2AB0","scE":"\u2AB4","Scedil":"\u015E","scedil":"\u015F","Scirc":"\u015C","scirc":"\u015D","scnap":"\u2ABA","scnE":"\u2AB6","scnsim":"\u22E9","scpolint":"\u2A13","scsim":"\u227F","Scy":"\u0421","scy":"\u0441","sdotb":"\u22A1","sdot":"\u22C5","sdote":"\u2A66","searhk":"\u2925","searr":"\u2198","seArr":"\u21D8","searrow":"\u2198","sect":"\u00A7","semi":";","seswar":"\u2929","setminus":"\u2216","setmn":"\u2216","sext":"\u2736","Sfr":"\uD835\uDD16","sfr":"\uD835\uDD30","sfrown":"\u2322","sharp":"\u266F","SHCHcy":"\u0429","shchcy":"\u0449","SHcy":"\u0428","shcy":"\u0448","ShortDownArrow":"\u2193","ShortLeftArrow":"\u2190","shortmid":"\u2223","shortparallel":"\u2225","ShortRightArrow":"\u2192","ShortUpArrow":"\u2191","shy":"\u00AD","Sigma":"\u03A3","sigma":"\u03C3","sigmaf":"\u03C2","sigmav":"\u03C2","sim":"\u223C","simdot":"\u2A6A","sime":"\u2243","simeq":"\u2243","simg":"\u2A9E","simgE":"\u2AA0","siml":"\u2A9D","simlE":"\u2A9F","simne":"\u2246","simplus":"\u2A24","simrarr":"\u2972","slarr":"\u2190","SmallCircle":"\u2218","smallsetminus":"\u2216","smashp":"\u2A33","smeparsl":"\u29E4","smid":"\u2223","smile":"\u2323","smt":"\u2AAA","smte":"\u2AAC","smtes":"\u2AAC\uFE00","SOFTcy":"\u042C","softcy":"\u044C","solbar":"\u233F","solb":"\u29C4","sol":"/","Sopf":"\uD835\uDD4A","sopf":"\uD835\uDD64","spades":"\u2660","spadesuit":"\u2660","spar":"\u2225","sqcap":"\u2293","sqcaps":"\u2293\uFE00","sqcup":"\u2294","sqcups":"\u2294\uFE00","Sqrt":"\u221A","sqsub":"\u228F","sqsube":"\u2291","sqsubset":"\u228F","sqsubseteq":"\u2291","sqsup":"\u2290","sqsupe":"\u2292","sqsupset":"\u2290","sqsupseteq":"\u2292","square":"\u25A1","Square":"\u25A1","SquareIntersection":"\u2293","SquareSubset":"\u228F","SquareSubsetEqual":"\u2291","SquareSuperset":"\u2290","SquareSupersetEqual":"\u2292","SquareUnion":"\u2294","squarf":"\u25AA","squ":"\u25A1","squf":"\u25AA","srarr":"\u2192","Sscr":"\uD835\uDCAE","sscr":"\uD835\uDCC8","ssetmn":"\u2216","ssmile":"\u2323","sstarf":"\u22C6","Star":"\u22C6","star":"\u2606","starf":"\u2605","straightepsilon":"\u03F5","straightphi":"\u03D5","strns":"\u00AF","sub":"\u2282","Sub":"\u22D0","subdot":"\u2ABD","subE":"\u2AC5","sube":"\u2286","subedot":"\u2AC3","submult":"\u2AC1","subnE":"\u2ACB","subne":"\u228A","subplus":"\u2ABF","subrarr":"\u2979","subset":"\u2282","Subset":"\u22D0","subseteq":"\u2286","subseteqq":"\u2AC5","SubsetEqual":"\u2286","subsetneq":"\u228A","subsetneqq":"\u2ACB","subsim":"\u2AC7","subsub":"\u2AD5","subsup":"\u2AD3","succapprox":"\u2AB8","succ":"\u227B","succcurlyeq":"\u227D","Succeeds":"\u227B","SucceedsEqual":"\u2AB0","SucceedsSlantEqual":"\u227D","SucceedsTilde":"\u227F","succeq":"\u2AB0","succnapprox":"\u2ABA","succneqq":"\u2AB6","succnsim":"\u22E9","succsim":"\u227F","SuchThat":"\u220B","sum":"\u2211","Sum":"\u2211","sung":"\u266A","sup1":"\u00B9","sup2":"\u00B2","sup3":"\u00B3","sup":"\u2283","Sup":"\u22D1","supdot":"\u2ABE","supdsub":"\u2AD8","supE":"\u2AC6","supe":"\u2287","supedot":"\u2AC4","Superset":"\u2283","SupersetEqual":"\u2287","suphsol":"\u27C9","suphsub":"\u2AD7","suplarr":"\u297B","supmult":"\u2AC2","supnE":"\u2ACC","supne":"\u228B","supplus":"\u2AC0","supset":"\u2283","Supset":"\u22D1","supseteq":"\u2287","supseteqq":"\u2AC6","supsetneq":"\u228B","supsetneqq":"\u2ACC","supsim":"\u2AC8","supsub":"\u2AD4","supsup":"\u2AD6","swarhk":"\u2926","swarr":"\u2199","swArr":"\u21D9","swarrow":"\u2199","swnwar":"\u292A","szlig":"\u00DF","Tab":"\t","target":"\u2316","Tau":"\u03A4","tau":"\u03C4","tbrk":"\u23B4","Tcaron":"\u0164","tcaron":"\u0165","Tcedil":"\u0162","tcedil":"\u0163","Tcy":"\u0422","tcy":"\u0442","tdot":"\u20DB","telrec":"\u2315","Tfr":"\uD835\uDD17","tfr":"\uD835\uDD31","there4":"\u2234","therefore":"\u2234","Therefore":"\u2234","Theta":"\u0398","theta":"\u03B8","thetasym":"\u03D1","thetav":"\u03D1","thickapprox":"\u2248","thicksim":"\u223C","ThickSpace":"\u205F\u200A","ThinSpace":"\u2009","thinsp":"\u2009","thkap":"\u2248","thksim":"\u223C","THORN":"\u00DE","thorn":"\u00FE","tilde":"\u02DC","Tilde":"\u223C","TildeEqual":"\u2243","TildeFullEqual":"\u2245","TildeTilde":"\u2248","timesbar":"\u2A31","timesb":"\u22A0","times":"\u00D7","timesd":"\u2A30","tint":"\u222D","toea":"\u2928","topbot":"\u2336","topcir":"\u2AF1","top":"\u22A4","Topf":"\uD835\uDD4B","topf":"\uD835\uDD65","topfork":"\u2ADA","tosa":"\u2929","tprime":"\u2034","trade":"\u2122","TRADE":"\u2122","triangle":"\u25B5","triangledown":"\u25BF","triangleleft":"\u25C3","trianglelefteq":"\u22B4","triangleq":"\u225C","triangleright":"\u25B9","trianglerighteq":"\u22B5","tridot":"\u25EC","trie":"\u225C","triminus":"\u2A3A","TripleDot":"\u20DB","triplus":"\u2A39","trisb":"\u29CD","tritime":"\u2A3B","trpezium":"\u23E2","Tscr":"\uD835\uDCAF","tscr":"\uD835\uDCC9","TScy":"\u0426","tscy":"\u0446","TSHcy":"\u040B","tshcy":"\u045B","Tstrok":"\u0166","tstrok":"\u0167","twixt":"\u226C","twoheadleftarrow":"\u219E","twoheadrightarrow":"\u21A0","Uacute":"\u00DA","uacute":"\u00FA","uarr":"\u2191","Uarr":"\u219F","uArr":"\u21D1","Uarrocir":"\u2949","Ubrcy":"\u040E","ubrcy":"\u045E","Ubreve":"\u016C","ubreve":"\u016D","Ucirc":"\u00DB","ucirc":"\u00FB","Ucy":"\u0423","ucy":"\u0443","udarr":"\u21C5","Udblac":"\u0170","udblac":"\u0171","udhar":"\u296E","ufisht":"\u297E","Ufr":"\uD835\uDD18","ufr":"\uD835\uDD32","Ugrave":"\u00D9","ugrave":"\u00F9","uHar":"\u2963","uharl":"\u21BF","uharr":"\u21BE","uhblk":"\u2580","ulcorn":"\u231C","ulcorner":"\u231C","ulcrop":"\u230F","ultri":"\u25F8","Umacr":"\u016A","umacr":"\u016B","uml":"\u00A8","UnderBar":"_","UnderBrace":"\u23DF","UnderBracket":"\u23B5","UnderParenthesis":"\u23DD","Union":"\u22C3","UnionPlus":"\u228E","Uogon":"\u0172","uogon":"\u0173","Uopf":"\uD835\uDD4C","uopf":"\uD835\uDD66","UpArrowBar":"\u2912","uparrow":"\u2191","UpArrow":"\u2191","Uparrow":"\u21D1","UpArrowDownArrow":"\u21C5","updownarrow":"\u2195","UpDownArrow":"\u2195","Updownarrow":"\u21D5","UpEquilibrium":"\u296E","upharpoonleft":"\u21BF","upharpoonright":"\u21BE","uplus":"\u228E","UpperLeftArrow":"\u2196","UpperRightArrow":"\u2197","upsi":"\u03C5","Upsi":"\u03D2","upsih":"\u03D2","Upsilon":"\u03A5","upsilon":"\u03C5","UpTeeArrow":"\u21A5","UpTee":"\u22A5","upuparrows":"\u21C8","urcorn":"\u231D","urcorner":"\u231D","urcrop":"\u230E","Uring":"\u016E","uring":"\u016F","urtri":"\u25F9","Uscr":"\uD835\uDCB0","uscr":"\uD835\uDCCA","utdot":"\u22F0","Utilde":"\u0168","utilde":"\u0169","utri":"\u25B5","utrif":"\u25B4","uuarr":"\u21C8","Uuml":"\u00DC","uuml":"\u00FC","uwangle":"\u29A7","vangrt":"\u299C","varepsilon":"\u03F5","varkappa":"\u03F0","varnothing":"\u2205","varphi":"\u03D5","varpi":"\u03D6","varpropto":"\u221D","varr":"\u2195","vArr":"\u21D5","varrho":"\u03F1","varsigma":"\u03C2","varsubsetneq":"\u228A\uFE00","varsubsetneqq":"\u2ACB\uFE00","varsupsetneq":"\u228B\uFE00","varsupsetneqq":"\u2ACC\uFE00","vartheta":"\u03D1","vartriangleleft":"\u22B2","vartriangleright":"\u22B3","vBar":"\u2AE8","Vbar":"\u2AEB","vBarv":"\u2AE9","Vcy":"\u0412","vcy":"\u0432","vdash":"\u22A2","vDash":"\u22A8","Vdash":"\u22A9","VDash":"\u22AB","Vdashl":"\u2AE6","veebar":"\u22BB","vee":"\u2228","Vee":"\u22C1","veeeq":"\u225A","vellip":"\u22EE","verbar":"|","Verbar":"\u2016","vert":"|","Vert":"\u2016","VerticalBar":"\u2223","VerticalLine":"|","VerticalSeparator":"\u2758","VerticalTilde":"\u2240","VeryThinSpace":"\u200A","Vfr":"\uD835\uDD19","vfr":"\uD835\uDD33","vltri":"\u22B2","vnsub":"\u2282\u20D2","vnsup":"\u2283\u20D2","Vopf":"\uD835\uDD4D","vopf":"\uD835\uDD67","vprop":"\u221D","vrtri":"\u22B3","Vscr":"\uD835\uDCB1","vscr":"\uD835\uDCCB","vsubnE":"\u2ACB\uFE00","vsubne":"\u228A\uFE00","vsupnE":"\u2ACC\uFE00","vsupne":"\u228B\uFE00","Vvdash":"\u22AA","vzigzag":"\u299A","Wcirc":"\u0174","wcirc":"\u0175","wedbar":"\u2A5F","wedge":"\u2227","Wedge":"\u22C0","wedgeq":"\u2259","weierp":"\u2118","Wfr":"\uD835\uDD1A","wfr":"\uD835\uDD34","Wopf":"\uD835\uDD4E","wopf":"\uD835\uDD68","wp":"\u2118","wr":"\u2240","wreath":"\u2240","Wscr":"\uD835\uDCB2","wscr":"\uD835\uDCCC","xcap":"\u22C2","xcirc":"\u25EF","xcup":"\u22C3","xdtri":"\u25BD","Xfr":"\uD835\uDD1B","xfr":"\uD835\uDD35","xharr":"\u27F7","xhArr":"\u27FA","Xi":"\u039E","xi":"\u03BE","xlarr":"\u27F5","xlArr":"\u27F8","xmap":"\u27FC","xnis":"\u22FB","xodot":"\u2A00","Xopf":"\uD835\uDD4F","xopf":"\uD835\uDD69","xoplus":"\u2A01","xotime":"\u2A02","xrarr":"\u27F6","xrArr":"\u27F9","Xscr":"\uD835\uDCB3","xscr":"\uD835\uDCCD","xsqcup":"\u2A06","xuplus":"\u2A04","xutri":"\u25B3","xvee":"\u22C1","xwedge":"\u22C0","Yacute":"\u00DD","yacute":"\u00FD","YAcy":"\u042F","yacy":"\u044F","Ycirc":"\u0176","ycirc":"\u0177","Ycy":"\u042B","ycy":"\u044B","yen":"\u00A5","Yfr":"\uD835\uDD1C","yfr":"\uD835\uDD36","YIcy":"\u0407","yicy":"\u0457","Yopf":"\uD835\uDD50","yopf":"\uD835\uDD6A","Yscr":"\uD835\uDCB4","yscr":"\uD835\uDCCE","YUcy":"\u042E","yucy":"\u044E","yuml":"\u00FF","Yuml":"\u0178","Zacute":"\u0179","zacute":"\u017A","Zcaron":"\u017D","zcaron":"\u017E","Zcy":"\u0417","zcy":"\u0437","Zdot":"\u017B","zdot":"\u017C","zeetrf":"\u2128","ZeroWidthSpace":"\u200B","Zeta":"\u0396","zeta":"\u03B6","zfr":"\uD835\uDD37","Zfr":"\u2128","ZHcy":"\u0416","zhcy":"\u0436","zigrarr":"\u21DD","zopf":"\uD835\uDD6B","Zopf":"\u2124","Zscr":"\uD835\uDCB5","zscr":"\uD835\uDCCF","zwj":"\u200D","zwnj":"\u200C"}
},{}],14:[function(require,module,exports){
module.exports={"Aacute":"\u00C1","aacute":"\u00E1","Acirc":"\u00C2","acirc":"\u00E2","acute":"\u00B4","AElig":"\u00C6","aelig":"\u00E6","Agrave":"\u00C0","agrave":"\u00E0","amp":"&","AMP":"&","Aring":"\u00C5","aring":"\u00E5","Atilde":"\u00C3","atilde":"\u00E3","Auml":"\u00C4","auml":"\u00E4","brvbar":"\u00A6","Ccedil":"\u00C7","ccedil":"\u00E7","cedil":"\u00B8","cent":"\u00A2","copy":"\u00A9","COPY":"\u00A9","curren":"\u00A4","deg":"\u00B0","divide":"\u00F7","Eacute":"\u00C9","eacute":"\u00E9","Ecirc":"\u00CA","ecirc":"\u00EA","Egrave":"\u00C8","egrave":"\u00E8","ETH":"\u00D0","eth":"\u00F0","Euml":"\u00CB","euml":"\u00EB","frac12":"\u00BD","frac14":"\u00BC","frac34":"\u00BE","gt":">","GT":">","Iacute":"\u00CD","iacute":"\u00ED","Icirc":"\u00CE","icirc":"\u00EE","iexcl":"\u00A1","Igrave":"\u00CC","igrave":"\u00EC","iquest":"\u00BF","Iuml":"\u00CF","iuml":"\u00EF","laquo":"\u00AB","lt":"<","LT":"<","macr":"\u00AF","micro":"\u00B5","middot":"\u00B7","nbsp":"\u00A0","not":"\u00AC","Ntilde":"\u00D1","ntilde":"\u00F1","Oacute":"\u00D3","oacute":"\u00F3","Ocirc":"\u00D4","ocirc":"\u00F4","Ograve":"\u00D2","ograve":"\u00F2","ordf":"\u00AA","ordm":"\u00BA","Oslash":"\u00D8","oslash":"\u00F8","Otilde":"\u00D5","otilde":"\u00F5","Ouml":"\u00D6","ouml":"\u00F6","para":"\u00B6","plusmn":"\u00B1","pound":"\u00A3","quot":"\"","QUOT":"\"","raquo":"\u00BB","reg":"\u00AE","REG":"\u00AE","sect":"\u00A7","shy":"\u00AD","sup1":"\u00B9","sup2":"\u00B2","sup3":"\u00B3","szlig":"\u00DF","THORN":"\u00DE","thorn":"\u00FE","times":"\u00D7","Uacute":"\u00DA","uacute":"\u00FA","Ucirc":"\u00DB","ucirc":"\u00FB","Ugrave":"\u00D9","ugrave":"\u00F9","uml":"\u00A8","Uuml":"\u00DC","uuml":"\u00FC","Yacute":"\u00DD","yacute":"\u00FD","yen":"\u00A5","yuml":"\u00FF"}
},{}],15:[function(require,module,exports){
module.exports={"amp":"&","apos":"'","gt":">","lt":"<","quot":"\""}

},{}],16:[function(require,module,exports){
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

	isTag: function(elem){
		return elem.type === "tag" || elem.type === "script" || elem.type === "style";
	}
};

},{}],17:[function(require,module,exports){
var ElementType = require("domelementtype");

var re_whitespace = /\s+/g;
var NodePrototype = require("./lib/node");
var ElementPrototype = require("./lib/element");

function DomHandler(callback, options, elementCB){
	if(typeof callback === "object"){
		elementCB = options;
		options = callback;
		callback = null;
	} else if(typeof options === "function"){
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
	withStartIndices: false, //Add startIndex properties to nodes
};

DomHandler.prototype.onparserinit = function(parser){
	this._parser = parser;
};

//Resets the handler back to starting state
DomHandler.prototype.onreset = function(){
	DomHandler.call(this, this._callback, this._options, this._elementCB);
};

//Signals the handler that parsing is done
DomHandler.prototype.onend = function(){
	if(this._done) return;
	this._done = true;
	this._parser = null;
	this._handleCallback(null);
};

DomHandler.prototype._handleCallback =
DomHandler.prototype.onerror = function(error){
	if(typeof this._callback === "function"){
		this._callback(error, this.dom);
	} else {
		if(error) throw error;
	}
};

DomHandler.prototype.onclosetag = function(){
	//if(this._tagStack.pop().name !== name) this._handleCallback(Error("Tagname didn't match!"));
	var elem = this._tagStack.pop();
	if(this._elementCB) this._elementCB(elem);
};

DomHandler.prototype._addDomElement = function(element){
	var parent = this._tagStack[this._tagStack.length - 1];
	var siblings = parent ? parent.children : this.dom;
	var previousSibling = siblings[siblings.length - 1];

	element.next = null;

	if(this._options.withStartIndices){
		element.startIndex = this._parser.startIndex;
	}

	if (this._options.withDomLvl1) {
		element.__proto__ = element.type === "tag" ? ElementPrototype : NodePrototype;
	}

	if(previousSibling){
		element.prev = previousSibling;
		previousSibling.next = element;
	} else {
		element.prev = null;
	}

	siblings.push(element);
	element.parent = parent || null;
};

DomHandler.prototype.onopentag = function(name, attribs){
	var element = {
		type: name === "script" ? ElementType.Script : name === "style" ? ElementType.Style : ElementType.Tag,
		name: name,
		attribs: attribs,
		children: []
	};

	this._addDomElement(element);

	this._tagStack.push(element);
};

DomHandler.prototype.ontext = function(data){
	//the ignoreWhitespace is officially dropped, but for now,
	//it's an alias for normalizeWhitespace
	var normalize = this._options.normalizeWhitespace || this._options.ignoreWhitespace;

	var lastTag;

	if(!this._tagStack.length && this.dom.length && (lastTag = this.dom[this.dom.length-1]).type === ElementType.Text){
		if(normalize){
			lastTag.data = (lastTag.data + data).replace(re_whitespace, " ");
		} else {
			lastTag.data += data;
		}
	} else {
		if(
			this._tagStack.length &&
			(lastTag = this._tagStack[this._tagStack.length - 1]) &&
			(lastTag = lastTag.children[lastTag.children.length - 1]) &&
			lastTag.type === ElementType.Text
		){
			if(normalize){
				lastTag.data = (lastTag.data + data).replace(re_whitespace, " ");
			} else {
				lastTag.data += data;
			}
		} else {
			if(normalize){
				data = data.replace(re_whitespace, " ");
			}

			this._addDomElement({
				data: data,
				type: ElementType.Text
			});
		}
	}
};

DomHandler.prototype.oncomment = function(data){
	var lastTag = this._tagStack[this._tagStack.length - 1];

	if(lastTag && lastTag.type === ElementType.Comment){
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

DomHandler.prototype.oncdatastart = function(){
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

DomHandler.prototype.oncommentend = DomHandler.prototype.oncdataend = function(){
	this._tagStack.pop();
};

DomHandler.prototype.onprocessinginstruction = function(name, data){
	this._addDomElement({
		name: name,
		data: data,
		type: ElementType.Directive
	});
};

module.exports = DomHandler;

},{"./lib/element":18,"./lib/node":19,"domelementtype":16}],18:[function(require,module,exports){
// DOM-Level-1-compliant structure
var NodePrototype = require('./node');
var ElementPrototype = module.exports = Object.create(NodePrototype);

var domLvl1 = {
	tagName: "name"
};

Object.keys(domLvl1).forEach(function(key) {
	var shorthand = domLvl1[key];
	Object.defineProperty(ElementPrototype, key, {
		get: function() {
			return this[shorthand] || null;
		},
		set: function(val) {
			this[shorthand] = val;
			return val;
		}
	});
});

},{"./node":19}],19:[function(require,module,exports){
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

Object.keys(domLvl1).forEach(function(key) {
	var shorthand = domLvl1[key];
	Object.defineProperty(NodePrototype, key, {
		get: function() {
			return this[shorthand] || null;
		},
		set: function(val) {
			this[shorthand] = val;
			return val;
		}
	});
});

},{}],20:[function(require,module,exports){
var DomUtils = module.exports;

[
	require("./lib/stringify"),
	require("./lib/traversal"),
	require("./lib/manipulation"),
	require("./lib/querying"),
	require("./lib/legacy"),
	require("./lib/helpers")
].forEach(function(ext){
	Object.keys(ext).forEach(function(key){
		DomUtils[key] = ext[key].bind(DomUtils);
	});
});

},{"./lib/helpers":21,"./lib/legacy":22,"./lib/manipulation":23,"./lib/querying":24,"./lib/stringify":25,"./lib/traversal":26}],21:[function(require,module,exports){
// removeSubsets
// Given an array of nodes, remove any member that is contained by another.
exports.removeSubsets = function(nodes) {
	var idx = nodes.length, node, ancestor, replace;

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
var comparePos = exports.compareDocumentPosition = function(nodeA, nodeB) {
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
exports.uniqueSort = function(nodes) {
	var idx = nodes.length, node, position;

	nodes = nodes.slice();

	while (--idx > -1) {
		node = nodes[idx];
		position = nodes.indexOf(node);
		if (position > -1 && position < idx) {
			nodes.splice(idx, 1);
		}
	}
	nodes.sort(function(a, b) {
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

},{}],22:[function(require,module,exports){
var ElementType = require("domelementtype");
var isTag = exports.isTag = ElementType.isTag;

exports.testElement = function(options, element){
	for(var key in options){
		if(!options.hasOwnProperty(key));
		else if(key === "tag_name"){
			if(!isTag(element) || !options.tag_name(element.name)){
				return false;
			}
		} else if(key === "tag_type"){
			if(!options.tag_type(element.type)) return false;
		} else if(key === "tag_contains"){
			if(isTag(element) || !options.tag_contains(element.data)){
				return false;
			}
		} else if(!element.attribs || !options[key](element.attribs[key])){
			return false;
		}
	}
	return true;
};

var Checks = {
	tag_name: function(name){
		if(typeof name === "function"){
			return function(elem){ return isTag(elem) && name(elem.name); };
		} else if(name === "*"){
			return isTag;
		} else {
			return function(elem){ return isTag(elem) && elem.name === name; };
		}
	},
	tag_type: function(type){
		if(typeof type === "function"){
			return function(elem){ return type(elem.type); };
		} else {
			return function(elem){ return elem.type === type; };
		}
	},
	tag_contains: function(data){
		if(typeof data === "function"){
			return function(elem){ return !isTag(elem) && data(elem.data); };
		} else {
			return function(elem){ return !isTag(elem) && elem.data === data; };
		}
	}
};

function getAttribCheck(attrib, value){
	if(typeof value === "function"){
		return function(elem){ return elem.attribs && value(elem.attribs[attrib]); };
	} else {
		return function(elem){ return elem.attribs && elem.attribs[attrib] === value; };
	}
}

function combineFuncs(a, b){
	return function(elem){
		return a(elem) || b(elem);
	};
}

exports.getElements = function(options, element, recurse, limit){
	var funcs = Object.keys(options).map(function(key){
		var value = options[key];
		return key in Checks ? Checks[key](value) : getAttribCheck(key, value);
	});

	return funcs.length === 0 ? [] : this.filter(
		funcs.reduce(combineFuncs),
		element, recurse, limit
	);
};

exports.getElementById = function(id, element, recurse){
	if(!Array.isArray(element)) element = [element];
	return this.findOne(getAttribCheck("id", id), element, recurse !== false);
};

exports.getElementsByTagName = function(name, element, recurse, limit){
	return this.filter(Checks.tag_name(name), element, recurse, limit);
};

exports.getElementsByTagType = function(type, element, recurse, limit){
	return this.filter(Checks.tag_type(type), element, recurse, limit);
};

},{"domelementtype":16}],23:[function(require,module,exports){
exports.removeElement = function(elem){
	if(elem.prev) elem.prev.next = elem.next;
	if(elem.next) elem.next.prev = elem.prev;

	if(elem.parent){
		var childs = elem.parent.children;
		childs.splice(childs.lastIndexOf(elem), 1);
	}
};

exports.replaceElement = function(elem, replacement){
	var prev = replacement.prev = elem.prev;
	if(prev){
		prev.next = replacement;
	}

	var next = replacement.next = elem.next;
	if(next){
		next.prev = replacement;
	}

	var parent = replacement.parent = elem.parent;
	if(parent){
		var childs = parent.children;
		childs[childs.lastIndexOf(elem)] = replacement;
	}
};

exports.appendChild = function(elem, child){
	child.parent = elem;

	if(elem.children.push(child) !== 1){
		var sibling = elem.children[elem.children.length - 2];
		sibling.next = child;
		child.prev = sibling;
		child.next = null;
	}
};

exports.append = function(elem, next){
	var parent = elem.parent,
		currNext = elem.next;

	next.next = currNext;
	next.prev = elem;
	elem.next = next;
	next.parent = parent;

	if(currNext){
		currNext.prev = next;
		if(parent){
			var childs = parent.children;
			childs.splice(childs.lastIndexOf(currNext), 0, next);
		}
	} else if(parent){
		parent.children.push(next);
	}
};

exports.prepend = function(elem, prev){
	var parent = elem.parent;
	if(parent){
		var childs = parent.children;
		childs.splice(childs.lastIndexOf(elem), 0, prev);
	}

	if(elem.prev){
		elem.prev.next = prev;
	}
	
	prev.parent = parent;
	prev.prev = elem.prev;
	prev.next = elem;
	elem.prev = prev;
};



},{}],24:[function(require,module,exports){
var isTag = require("domelementtype").isTag;

module.exports = {
	filter: filter,
	find: find,
	findOneChild: findOneChild,
	findOne: findOne,
	existsOne: existsOne,
	findAll: findAll
};

function filter(test, element, recurse, limit){
	if(!Array.isArray(element)) element = [element];

	if(typeof limit !== "number" || !isFinite(limit)){
		limit = Infinity;
	}
	return find(test, element, recurse !== false, limit);
}

function find(test, elems, recurse, limit){
	var result = [], childs;

	for(var i = 0, j = elems.length; i < j; i++){
		if(test(elems[i])){
			result.push(elems[i]);
			if(--limit <= 0) break;
		}

		childs = elems[i].children;
		if(recurse && childs && childs.length > 0){
			childs = find(test, childs, recurse, limit);
			result = result.concat(childs);
			limit -= childs.length;
			if(limit <= 0) break;
		}
	}

	return result;
}

function findOneChild(test, elems){
	for(var i = 0, l = elems.length; i < l; i++){
		if(test(elems[i])) return elems[i];
	}

	return null;
}

function findOne(test, elems){
	var elem = null;

	for(var i = 0, l = elems.length; i < l && !elem; i++){
		if(!isTag(elems[i])){
			continue;
		} else if(test(elems[i])){
			elem = elems[i];
		} else if(elems[i].children.length > 0){
			elem = findOne(test, elems[i].children);
		}
	}

	return elem;
}

function existsOne(test, elems){
	for(var i = 0, l = elems.length; i < l; i++){
		if(
			isTag(elems[i]) && (
				test(elems[i]) || (
					elems[i].children.length > 0 &&
					existsOne(test, elems[i].children)
				)
			)
		){
			return true;
		}
	}

	return false;
}

function findAll(test, elems){
	var result = [];
	for(var i = 0, j = elems.length; i < j; i++){
		if(!isTag(elems[i])) continue;
		if(test(elems[i])) result.push(elems[i]);

		if(elems[i].children.length > 0){
			result = result.concat(findAll(test, elems[i].children));
		}
	}
	return result;
}

},{"domelementtype":16}],25:[function(require,module,exports){
var ElementType = require("domelementtype"),
    getOuterHTML = require("dom-serializer"),
    isTag = ElementType.isTag;

module.exports = {
	getInnerHTML: getInnerHTML,
	getOuterHTML: getOuterHTML,
	getText: getText
};

function getInnerHTML(elem, opts){
	return elem.children ? elem.children.map(function(elem){
		return getOuterHTML(elem, opts);
	}).join("") : "";
}

function getText(elem){
	if(Array.isArray(elem)) return elem.map(getText).join("");
	if(isTag(elem) || elem.type === ElementType.CDATA) return getText(elem.children);
	if(elem.type === ElementType.Text) return elem.data;
	return "";
}

},{"dom-serializer":6,"domelementtype":16}],26:[function(require,module,exports){
var getChildren = exports.getChildren = function(elem){
	return elem.children;
};

var getParent = exports.getParent = function(elem){
	return elem.parent;
};

exports.getSiblings = function(elem){
	var parent = getParent(elem);
	return parent ? getChildren(parent) : [elem];
};

exports.getAttributeValue = function(elem, name){
	return elem.attribs && elem.attribs[name];
};

exports.hasAttrib = function(elem, name){
	return !!elem.attribs && hasOwnProperty.call(elem.attribs, name);
};

exports.getName = function(elem){
	return elem.name;
};

},{}],27:[function(require,module,exports){
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

},{}],28:[function(require,module,exports){
exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = nBytes * 8 - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = nBytes * 8 - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}

},{}],29:[function(require,module,exports){
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

},{}],30:[function(require,module,exports){
/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */

// The _isBuffer check is for Safari 5-7 support, because it's missing
// Object.prototype.constructor. Remove this eventually
module.exports = function (obj) {
  return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer)
}

function isBuffer (obj) {
  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
}

// For Node v0.10 support. Remove this eventually.
function isSlowBuffer (obj) {
  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0))
}

},{}],31:[function(require,module,exports){
var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};

},{}],32:[function(require,module,exports){
(function (process){
'use strict';

if (!process.version ||
    process.version.indexOf('v0.') === 0 ||
    process.version.indexOf('v1.') === 0 && process.version.indexOf('v1.8.') !== 0) {
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

},{"_process":33}],33:[function(require,module,exports){
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
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],34:[function(require,module,exports){
module.exports = require('./lib/_stream_duplex.js');

},{"./lib/_stream_duplex.js":35}],35:[function(require,module,exports){
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

// a duplex stream is just a stream that is both readable and writable.
// Since JS doesn't have multiple prototypal inheritance, this class
// prototypally inherits from Readable, and then parasitically from
// Writable.

'use strict';

/*<replacement>*/

var processNextTick = require('process-nextick-args');
/*</replacement>*/

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

Object.defineProperty(Duplex.prototype, 'destroyed', {
  get: function () {
    if (this._readableState === undefined || this._writableState === undefined) {
      return false;
    }
    return this._readableState.destroyed && this._writableState.destroyed;
  },
  set: function (value) {
    // we ignore the value if the stream
    // has not been initialized yet
    if (this._readableState === undefined || this._writableState === undefined) {
      return;
    }

    // backward compatibility, the user is explicitly
    // managing destroyed
    this._readableState.destroyed = value;
    this._writableState.destroyed = value;
  }
});

Duplex.prototype._destroy = function (err, cb) {
  this.push(null);
  this.end();

  processNextTick(cb, err);
};

function forEach(xs, f) {
  for (var i = 0, l = xs.length; i < l; i++) {
    f(xs[i], i);
  }
}
},{"./_stream_readable":37,"./_stream_writable":39,"core-util-is":5,"inherits":29,"process-nextick-args":32}],36:[function(require,module,exports){
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
},{"./_stream_transform":38,"core-util-is":5,"inherits":29}],37:[function(require,module,exports){
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

'use strict';

/*<replacement>*/

var processNextTick = require('process-nextick-args');
/*</replacement>*/

module.exports = Readable;

/*<replacement>*/
var isArray = require('isarray');
/*</replacement>*/

/*<replacement>*/
var Duplex;
/*</replacement>*/

Readable.ReadableState = ReadableState;

/*<replacement>*/
var EE = require('events').EventEmitter;

var EElistenerCount = function (emitter, type) {
  return emitter.listeners(type).length;
};
/*</replacement>*/

/*<replacement>*/
var Stream = require('./internal/streams/stream');
/*</replacement>*/

// TODO(bmeurer): Change this back to const once hole checks are
// properly optimized away early in Ignition+TurboFan.
/*<replacement>*/
var Buffer = require('safe-buffer').Buffer;
var OurUint8Array = global.Uint8Array || function () {};
function _uint8ArrayToBuffer(chunk) {
  return Buffer.from(chunk);
}
function _isUint8Array(obj) {
  return Buffer.isBuffer(obj) || obj instanceof OurUint8Array;
}
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
  debug = function () {};
}
/*</replacement>*/

var BufferList = require('./internal/streams/BufferList');
var destroyImpl = require('./internal/streams/destroy');
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
  this.highWaterMark = Math.floor(this.highWaterMark);

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

  // a flag to be able to tell if the event 'readable'/'data' is emitted
  // immediately, or on a later tick.  We set this to true at first, because
  // any actions that shouldn't happen until "later" should generally also
  // not happen before the first read call.
  this.sync = true;

  // whenever we return null, then we set a flag to say
  // that we're awaiting a 'readable' event emission.
  this.needReadable = false;
  this.emittedReadable = false;
  this.readableListening = false;
  this.resumeScheduled = false;

  // has it been destroyed
  this.destroyed = false;

  // Crypto is kind of old and crusty.  Historically, its default string
  // encoding is 'binary' so we have to make this configurable.
  // Everything else in the universe uses 'utf8', though.
  this.defaultEncoding = options.defaultEncoding || 'utf8';

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

  if (options) {
    if (typeof options.read === 'function') this._read = options.read;

    if (typeof options.destroy === 'function') this._destroy = options.destroy;
  }

  Stream.call(this);
}

Object.defineProperty(Readable.prototype, 'destroyed', {
  get: function () {
    if (this._readableState === undefined) {
      return false;
    }
    return this._readableState.destroyed;
  },
  set: function (value) {
    // we ignore the value if the stream
    // has not been initialized yet
    if (!this._readableState) {
      return;
    }

    // backward compatibility, the user is explicitly
    // managing destroyed
    this._readableState.destroyed = value;
  }
});

Readable.prototype.destroy = destroyImpl.destroy;
Readable.prototype._undestroy = destroyImpl.undestroy;
Readable.prototype._destroy = function (err, cb) {
  this.push(null);
  cb(err);
};

// Manually shove something into the read() buffer.
// This returns true if the highWaterMark has not been hit yet,
// similar to how Writable.write() returns true if you should
// write() some more.
Readable.prototype.push = function (chunk, encoding) {
  var state = this._readableState;
  var skipChunkCheck;

  if (!state.objectMode) {
    if (typeof chunk === 'string') {
      encoding = encoding || state.defaultEncoding;
      if (encoding !== state.encoding) {
        chunk = Buffer.from(chunk, encoding);
        encoding = '';
      }
      skipChunkCheck = true;
    }
  } else {
    skipChunkCheck = true;
  }

  return readableAddChunk(this, chunk, encoding, false, skipChunkCheck);
};

// Unshift should *always* be something directly out of read()
Readable.prototype.unshift = function (chunk) {
  return readableAddChunk(this, chunk, null, true, false);
};

function readableAddChunk(stream, chunk, encoding, addToFront, skipChunkCheck) {
  var state = stream._readableState;
  if (chunk === null) {
    state.reading = false;
    onEofChunk(stream, state);
  } else {
    var er;
    if (!skipChunkCheck) er = chunkInvalid(state, chunk);
    if (er) {
      stream.emit('error', er);
    } else if (state.objectMode || chunk && chunk.length > 0) {
      if (typeof chunk !== 'string' && !state.objectMode && Object.getPrototypeOf(chunk) !== Buffer.prototype) {
        chunk = _uint8ArrayToBuffer(chunk);
      }

      if (addToFront) {
        if (state.endEmitted) stream.emit('error', new Error('stream.unshift() after end event'));else addChunk(stream, state, chunk, true);
      } else if (state.ended) {
        stream.emit('error', new Error('stream.push() after EOF'));
      } else {
        state.reading = false;
        if (state.decoder && !encoding) {
          chunk = state.decoder.write(chunk);
          if (state.objectMode || chunk.length !== 0) addChunk(stream, state, chunk, false);else maybeReadMore(stream, state);
        } else {
          addChunk(stream, state, chunk, false);
        }
      }
    } else if (!addToFront) {
      state.reading = false;
    }
  }

  return needMoreData(state);
}

function addChunk(stream, state, chunk, addToFront) {
  if (state.flowing && state.length === 0 && !state.sync) {
    stream.emit('data', chunk);
    stream.read(0);
  } else {
    // update the buffer info.
    state.length += state.objectMode ? 1 : chunk.length;
    if (addToFront) state.buffer.unshift(chunk);else state.buffer.push(chunk);

    if (state.needReadable) emitReadable(stream);
  }
  maybeReadMore(stream, state);
}

function chunkInvalid(state, chunk) {
  var er;
  if (!_isUint8Array(chunk) && typeof chunk !== 'string' && chunk !== undefined && !state.objectMode) {
    er = new TypeError('Invalid non-string/buffer chunk');
  }
  return er;
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

Readable.prototype.isPaused = function () {
  return this._readableState.flowing === false;
};

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

  var endFn = doEnd ? onend : unpipe;
  if (state.endEmitted) processNextTick(endFn);else src.once('end', endFn);

  dest.on('unpipe', onunpipe);
  function onunpipe(readable, unpipeInfo) {
    debug('onunpipe');
    if (readable === src) {
      if (unpipeInfo && unpipeInfo.hasUnpiped === false) {
        unpipeInfo.hasUnpiped = true;
        cleanup();
      }
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
    src.removeListener('end', unpipe);
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
  var unpipeInfo = { hasUnpiped: false };

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
    if (dest) dest.emit('unpipe', this, unpipeInfo);
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
      dests[i].emit('unpipe', this, unpipeInfo);
    }return this;
  }

  // try to find the right one.
  var index = indexOf(state.pipes, dest);
  if (index === -1) return this;

  state.pipes.splice(index, 1);
  state.pipesCount -= 1;
  if (state.pipesCount === 1) state.pipes = state.pipes[0];

  dest.emit('unpipe', this, unpipeInfo);

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
        emitReadable(this);
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
  var ret = Buffer.allocUnsafe(n);
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
}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./_stream_duplex":35,"./internal/streams/BufferList":40,"./internal/streams/destroy":41,"./internal/streams/stream":42,"_process":33,"core-util-is":5,"events":27,"inherits":29,"isarray":31,"process-nextick-args":32,"safe-buffer":48,"string_decoder/":64,"util":2}],38:[function(require,module,exports){
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

  if (!cb) {
    return stream.emit('error', new Error('write callback called multiple times'));
  }

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

Transform.prototype._destroy = function (err, cb) {
  var _this = this;

  Duplex.prototype._destroy.call(this, err, function (err2) {
    cb(err2);
    _this.emit('close');
  });
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
},{"./_stream_duplex":35,"core-util-is":5,"inherits":29}],39:[function(require,module,exports){
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

// A bit simpler than readable streams.
// Implement an async ._write(chunk, encoding, cb), and it'll handle all
// the drain event emission and buffering.

'use strict';

/*<replacement>*/

var processNextTick = require('process-nextick-args');
/*</replacement>*/

module.exports = Writable;

/* <replacement> */
function WriteReq(chunk, encoding, cb) {
  this.chunk = chunk;
  this.encoding = encoding;
  this.callback = cb;
  this.next = null;
}

// It seems a linked list but it is not
// there will be only 2 of these for each stream
function CorkedRequest(state) {
  var _this = this;

  this.next = null;
  this.entry = null;
  this.finish = function () {
    onCorkedFinish(_this, state);
  };
}
/* </replacement> */

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

/*<replacement>*/
var Buffer = require('safe-buffer').Buffer;
var OurUint8Array = global.Uint8Array || function () {};
function _uint8ArrayToBuffer(chunk) {
  return Buffer.from(chunk);
}
function _isUint8Array(obj) {
  return Buffer.isBuffer(obj) || obj instanceof OurUint8Array;
}
/*</replacement>*/

var destroyImpl = require('./internal/streams/destroy');

util.inherits(Writable, Stream);

function nop() {}

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
  this.highWaterMark = Math.floor(this.highWaterMark);

  // if _final has been called
  this.finalCalled = false;

  // drain event flag.
  this.needDrain = false;
  // at the start of calling end()
  this.ending = false;
  // when end() has been called, and returned
  this.ended = false;
  // when 'finish' is emitted
  this.finished = false;

  // has it been destroyed
  this.destroyed = false;

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
      }, '_writableState.buffer is deprecated. Use _writableState.getBuffer ' + 'instead.', 'DEP0003')
    });
  } catch (_) {}
})();

// Test _writableState for inheritance to account for Duplex streams,
// whose prototype chain only points to Readable.
var realHasInstance;
if (typeof Symbol === 'function' && Symbol.hasInstance && typeof Function.prototype[Symbol.hasInstance] === 'function') {
  realHasInstance = Function.prototype[Symbol.hasInstance];
  Object.defineProperty(Writable, Symbol.hasInstance, {
    value: function (object) {
      if (realHasInstance.call(this, object)) return true;

      return object && object._writableState instanceof WritableState;
    }
  });
} else {
  realHasInstance = function (object) {
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

    if (typeof options.destroy === 'function') this._destroy = options.destroy;

    if (typeof options.final === 'function') this._final = options.final;
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
  var isBuf = _isUint8Array(chunk) && !state.objectMode;

  if (isBuf && !Buffer.isBuffer(chunk)) {
    chunk = _uint8ArrayToBuffer(chunk);
  }

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
    chunk = Buffer.from(chunk, encoding);
  }
  return chunk;
}

// if we're already writing something, then just put this
// in the queue, and wait our turn.  Otherwise, call _write
// If we return false, then we need a drain event, so set that flag.
function writeOrBuffer(stream, state, isBuf, chunk, encoding, cb) {
  if (!isBuf) {
    var newChunk = decodeChunk(state, chunk, encoding);
    if (chunk !== newChunk) {
      isBuf = true;
      encoding = 'buffer';
      chunk = newChunk;
    }
  }
  var len = state.objectMode ? 1 : chunk.length;

  state.length += len;

  var ret = state.length < state.highWaterMark;
  // we must ensure that previous needDrain will not be reset to false.
  if (!ret) state.needDrain = true;

  if (state.writing || state.corked) {
    var last = state.lastBufferedRequest;
    state.lastBufferedRequest = {
      chunk: chunk,
      encoding: encoding,
      isBuf: isBuf,
      callback: cb,
      next: null
    };
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

  if (sync) {
    // defer the callback if we are being called synchronously
    // to avoid piling up things on the stack
    processNextTick(cb, er);
    // this can emit finish, and it will always happen
    // after error
    processNextTick(finishMaybe, stream, state);
    stream._writableState.errorEmitted = true;
    stream.emit('error', er);
  } else {
    // the caller expect this to happen before if
    // it is async
    cb(er);
    stream._writableState.errorEmitted = true;
    stream.emit('error', er);
    // this can emit finish, but finish must
    // always follow error
    finishMaybe(stream, state);
  }
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
    var allBuffers = true;
    while (entry) {
      buffer[count] = entry;
      if (!entry.isBuf) allBuffers = false;
      entry = entry.next;
      count += 1;
    }
    buffer.allBuffers = allBuffers;

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
function callFinal(stream, state) {
  stream._final(function (err) {
    state.pendingcb--;
    if (err) {
      stream.emit('error', err);
    }
    state.prefinished = true;
    stream.emit('prefinish');
    finishMaybe(stream, state);
  });
}
function prefinish(stream, state) {
  if (!state.prefinished && !state.finalCalled) {
    if (typeof stream._final === 'function') {
      state.pendingcb++;
      state.finalCalled = true;
      processNextTick(callFinal, stream, state);
    } else {
      state.prefinished = true;
      stream.emit('prefinish');
    }
  }
}

function finishMaybe(stream, state) {
  var need = needFinish(state);
  if (need) {
    prefinish(stream, state);
    if (state.pendingcb === 0) {
      state.finished = true;
      stream.emit('finish');
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

function onCorkedFinish(corkReq, state, err) {
  var entry = corkReq.entry;
  corkReq.entry = null;
  while (entry) {
    var cb = entry.callback;
    state.pendingcb--;
    cb(err);
    entry = entry.next;
  }
  if (state.corkedRequestsFree) {
    state.corkedRequestsFree.next = corkReq;
  } else {
    state.corkedRequestsFree = corkReq;
  }
}

Object.defineProperty(Writable.prototype, 'destroyed', {
  get: function () {
    if (this._writableState === undefined) {
      return false;
    }
    return this._writableState.destroyed;
  },
  set: function (value) {
    // we ignore the value if the stream
    // has not been initialized yet
    if (!this._writableState) {
      return;
    }

    // backward compatibility, the user is explicitly
    // managing destroyed
    this._writableState.destroyed = value;
  }
});

Writable.prototype.destroy = destroyImpl.destroy;
Writable.prototype._undestroy = destroyImpl.undestroy;
Writable.prototype._destroy = function (err, cb) {
  this.end();
  cb(err);
};
}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./_stream_duplex":35,"./internal/streams/destroy":41,"./internal/streams/stream":42,"_process":33,"core-util-is":5,"inherits":29,"process-nextick-args":32,"safe-buffer":48,"util-deprecate":65}],40:[function(require,module,exports){
'use strict';

/*<replacement>*/

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Buffer = require('safe-buffer').Buffer;
/*</replacement>*/

function copyBuffer(src, target, offset) {
  src.copy(target, offset);
}

module.exports = function () {
  function BufferList() {
    _classCallCheck(this, BufferList);

    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  BufferList.prototype.push = function push(v) {
    var entry = { data: v, next: null };
    if (this.length > 0) this.tail.next = entry;else this.head = entry;
    this.tail = entry;
    ++this.length;
  };

  BufferList.prototype.unshift = function unshift(v) {
    var entry = { data: v, next: this.head };
    if (this.length === 0) this.tail = entry;
    this.head = entry;
    ++this.length;
  };

  BufferList.prototype.shift = function shift() {
    if (this.length === 0) return;
    var ret = this.head.data;
    if (this.length === 1) this.head = this.tail = null;else this.head = this.head.next;
    --this.length;
    return ret;
  };

  BufferList.prototype.clear = function clear() {
    this.head = this.tail = null;
    this.length = 0;
  };

  BufferList.prototype.join = function join(s) {
    if (this.length === 0) return '';
    var p = this.head;
    var ret = '' + p.data;
    while (p = p.next) {
      ret += s + p.data;
    }return ret;
  };

  BufferList.prototype.concat = function concat(n) {
    if (this.length === 0) return Buffer.alloc(0);
    if (this.length === 1) return this.head.data;
    var ret = Buffer.allocUnsafe(n >>> 0);
    var p = this.head;
    var i = 0;
    while (p) {
      copyBuffer(p.data, ret, i);
      i += p.data.length;
      p = p.next;
    }
    return ret;
  };

  return BufferList;
}();
},{"safe-buffer":48}],41:[function(require,module,exports){
'use strict';

/*<replacement>*/

var processNextTick = require('process-nextick-args');
/*</replacement>*/

// undocumented cb() API, needed for core, not for public API
function destroy(err, cb) {
  var _this = this;

  var readableDestroyed = this._readableState && this._readableState.destroyed;
  var writableDestroyed = this._writableState && this._writableState.destroyed;

  if (readableDestroyed || writableDestroyed) {
    if (cb) {
      cb(err);
    } else if (err && (!this._writableState || !this._writableState.errorEmitted)) {
      processNextTick(emitErrorNT, this, err);
    }
    return;
  }

  // we set destroyed to true before firing error callbacks in order
  // to make it re-entrance safe in case destroy() is called within callbacks

  if (this._readableState) {
    this._readableState.destroyed = true;
  }

  // if this is a duplex stream mark the writable part as destroyed as well
  if (this._writableState) {
    this._writableState.destroyed = true;
  }

  this._destroy(err || null, function (err) {
    if (!cb && err) {
      processNextTick(emitErrorNT, _this, err);
      if (_this._writableState) {
        _this._writableState.errorEmitted = true;
      }
    } else if (cb) {
      cb(err);
    }
  });
}

function undestroy() {
  if (this._readableState) {
    this._readableState.destroyed = false;
    this._readableState.reading = false;
    this._readableState.ended = false;
    this._readableState.endEmitted = false;
  }

  if (this._writableState) {
    this._writableState.destroyed = false;
    this._writableState.ended = false;
    this._writableState.ending = false;
    this._writableState.finished = false;
    this._writableState.errorEmitted = false;
  }
}

function emitErrorNT(self, err) {
  self.emit('error', err);
}

module.exports = {
  destroy: destroy,
  undestroy: undestroy
};
},{"process-nextick-args":32}],42:[function(require,module,exports){
module.exports = require('events').EventEmitter;

},{"events":27}],43:[function(require,module,exports){
module.exports = require('./readable').PassThrough

},{"./readable":44}],44:[function(require,module,exports){
exports = module.exports = require('./lib/_stream_readable.js');
exports.Stream = exports;
exports.Readable = exports;
exports.Writable = require('./lib/_stream_writable.js');
exports.Duplex = require('./lib/_stream_duplex.js');
exports.Transform = require('./lib/_stream_transform.js');
exports.PassThrough = require('./lib/_stream_passthrough.js');

},{"./lib/_stream_duplex.js":35,"./lib/_stream_passthrough.js":36,"./lib/_stream_readable.js":37,"./lib/_stream_transform.js":38,"./lib/_stream_writable.js":39}],45:[function(require,module,exports){
module.exports = require('./readable').Transform

},{"./readable":44}],46:[function(require,module,exports){
module.exports = require('./lib/_stream_writable.js');

},{"./lib/_stream_writable.js":39}],47:[function(require,module,exports){
"use strict";

module.exports = function (string) {
  return string.replace(/[-\\^$*+?.()|[\]{}]/g, "\\$&");
};

},{}],48:[function(require,module,exports){
/* eslint-disable node/no-deprecated-api */
var buffer = require('buffer')
var Buffer = buffer.Buffer

// alternative to using Object.keys for old browsers
function copyProps (src, dst) {
  for (var key in src) {
    dst[key] = src[key]
  }
}
if (Buffer.from && Buffer.alloc && Buffer.allocUnsafe && Buffer.allocUnsafeSlow) {
  module.exports = buffer
} else {
  // Copy properties from require('buffer')
  copyProps(buffer, exports)
  exports.Buffer = SafeBuffer
}

function SafeBuffer (arg, encodingOrOffset, length) {
  return Buffer(arg, encodingOrOffset, length)
}

// Copy static methods from Buffer
copyProps(Buffer, SafeBuffer)

SafeBuffer.from = function (arg, encodingOrOffset, length) {
  if (typeof arg === 'number') {
    throw new TypeError('Argument must not be a number')
  }
  return Buffer(arg, encodingOrOffset, length)
}

SafeBuffer.alloc = function (size, fill, encoding) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  var buf = Buffer(size)
  if (fill !== undefined) {
    if (typeof encoding === 'string') {
      buf.fill(fill, encoding)
    } else {
      buf.fill(fill)
    }
  } else {
    buf.fill(0)
  }
  return buf
}

SafeBuffer.allocUnsafe = function (size) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  return Buffer(size)
}

SafeBuffer.allocUnsafeSlow = function (size) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  return buffer.SlowBuffer(size)
}

},{"buffer":4}],49:[function(require,module,exports){
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

},{"htmlparser2":62,"regexp-quote":47,"xtend":66}],50:[function(require,module,exports){
arguments[4][10][0].apply(exports,arguments)
},{"../maps/decode.json":51,"dup":10}],51:[function(require,module,exports){
arguments[4][12][0].apply(exports,arguments)
},{"dup":12}],52:[function(require,module,exports){
arguments[4][13][0].apply(exports,arguments)
},{"dup":13}],53:[function(require,module,exports){
arguments[4][14][0].apply(exports,arguments)
},{"dup":14}],54:[function(require,module,exports){
arguments[4][15][0].apply(exports,arguments)
},{"dup":15}],55:[function(require,module,exports){
module.exports = CollectingHandler;

function CollectingHandler(cbs){
	this._cbs = cbs || {};
	this.events = [];
}

var EVENTS = require("./").EVENTS;
Object.keys(EVENTS).forEach(function(name){
	if(EVENTS[name] === 0){
		name = "on" + name;
		CollectingHandler.prototype[name] = function(){
			this.events.push([name]);
			if(this._cbs[name]) this._cbs[name]();
		};
	} else if(EVENTS[name] === 1){
		name = "on" + name;
		CollectingHandler.prototype[name] = function(a){
			this.events.push([name, a]);
			if(this._cbs[name]) this._cbs[name](a);
		};
	} else if(EVENTS[name] === 2){
		name = "on" + name;
		CollectingHandler.prototype[name] = function(a, b){
			this.events.push([name, a, b]);
			if(this._cbs[name]) this._cbs[name](a, b);
		};
	} else {
		throw Error("wrong number of arguments");
	}
});

CollectingHandler.prototype.onreset = function(){
	this.events = [];
	if(this._cbs.onreset) this._cbs.onreset();
};

CollectingHandler.prototype.restart = function(){
	if(this._cbs.onreset) this._cbs.onreset();

	for(var i = 0, len = this.events.length; i < len; i++){
		if(this._cbs[this.events[i][0]]){

			var num = this.events[i].length;

			if(num === 1){
				this._cbs[this.events[i][0]]();
			} else if(num === 2){
				this._cbs[this.events[i][0]](this.events[i][1]);
			} else {
				this._cbs[this.events[i][0]](this.events[i][1], this.events[i][2]);
			}
		}
	}
};

},{"./":62}],56:[function(require,module,exports){
var index = require("./index.js"),
    DomHandler = index.DomHandler,
    DomUtils = index.DomUtils;

//TODO: make this a streamable handler
function FeedHandler(callback, options){
	this.init(callback, options);
}

require("inherits")(FeedHandler, DomHandler);

FeedHandler.prototype.init = DomHandler;

function getElements(what, where){
	return DomUtils.getElementsByTagName(what, where, true);
}
function getOneElement(what, where){
	return DomUtils.getElementsByTagName(what, where, true, 1)[0];
}
function fetch(what, where, recurse){
	return DomUtils.getText(
		DomUtils.getElementsByTagName(what, where, recurse, 1)
	).trim();
}

function addConditionally(obj, prop, what, where, recurse){
	var tmp = fetch(what, where, recurse);
	if(tmp) obj[prop] = tmp;
}

var isValidFeed = function(value){
	return value === "rss" || value === "feed" || value === "rdf:RDF";
};

FeedHandler.prototype.onend = function(){
	var feed = {},
	    feedRoot = getOneElement(isValidFeed, this.dom),
	    tmp, childs;

	if(feedRoot){
		if(feedRoot.name === "feed"){
			childs = feedRoot.children;

			feed.type = "atom";
			addConditionally(feed, "id", "id", childs);
			addConditionally(feed, "title", "title", childs);
			if((tmp = getOneElement("link", childs)) && (tmp = tmp.attribs) && (tmp = tmp.href)) feed.link = tmp;
			addConditionally(feed, "description", "subtitle", childs);
			if((tmp = fetch("updated", childs))) feed.updated = new Date(tmp);
			addConditionally(feed, "author", "email", childs, true);

			feed.items = getElements("entry", childs).map(function(item){
				var entry = {}, tmp;

				item = item.children;

				addConditionally(entry, "id", "id", item);
				addConditionally(entry, "title", "title", item);
				if((tmp = getOneElement("link", item)) && (tmp = tmp.attribs) && (tmp = tmp.href)) entry.link = tmp;
				if((tmp = fetch("summary", item) || fetch("content", item))) entry.description = tmp;
				if((tmp = fetch("updated", item))) entry.pubDate = new Date(tmp);
				return entry;
			});
		} else {
			childs = getOneElement("channel", feedRoot.children).children;

			feed.type = feedRoot.name.substr(0, 3);
			feed.id = "";
			addConditionally(feed, "title", "title", childs);
			addConditionally(feed, "link", "link", childs);
			addConditionally(feed, "description", "description", childs);
			if((tmp = fetch("lastBuildDate", childs))) feed.updated = new Date(tmp);
			addConditionally(feed, "author", "managingEditor", childs, true);

			feed.items = getElements("item", feedRoot.children).map(function(item){
				var entry = {}, tmp;

				item = item.children;

				addConditionally(entry, "id", "guid", item);
				addConditionally(entry, "title", "title", item);
				addConditionally(entry, "link", "link", item);
				addConditionally(entry, "description", "description", item);
				if((tmp = fetch("pubDate", item))) entry.pubDate = new Date(tmp);
				return entry;
			});
		}
	}
	this.dom = feed;
	DomHandler.prototype._handleCallback.call(
		this, feedRoot ? null : Error("couldn't find root of feed")
	);
};

module.exports = FeedHandler;

},{"./index.js":62,"inherits":29}],57:[function(require,module,exports){
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
	tr      : { tr:true, th:true, td:true },
	th      : { th:true },
	td      : { thead:true, th:true, td:true },
	body    : { head:true, link:true, script:true },
	li      : { li:true },
	p       : { p:true },
	h1      : { p:true },
	h2      : { p:true },
	h3      : { p:true },
	h4      : { p:true },
	h5      : { p:true },
	h6      : { p:true },
	select  : formTags,
	input   : formTags,
	output  : formTags,
	button  : formTags,
	datalist: formTags,
	textarea: formTags,
	option  : { option:true },
	optgroup: { optgroup:true }
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

function Parser(cbs, options){
	this._options = options || {};
	this._cbs = cbs || {};

	this._tagname = "";
	this._attribname = "";
	this._attribvalue = "";
	this._attribs = null;
	this._stack = [];

	this.startIndex = 0;
	this.endIndex = null;

	this._lowerCaseTagNames = "lowerCaseTags" in this._options ?
									!!this._options.lowerCaseTags :
									!this._options.xmlMode;
	this._lowerCaseAttributeNames = "lowerCaseAttributeNames" in this._options ?
									!!this._options.lowerCaseAttributeNames :
									!this._options.xmlMode;

	if(this._options.Tokenizer) {
		Tokenizer = this._options.Tokenizer;
	}
	this._tokenizer = new Tokenizer(this._options, this);

	if(this._cbs.onparserinit) this._cbs.onparserinit(this);
}

require("inherits")(Parser, require("events").EventEmitter);

Parser.prototype._updatePosition = function(initialOffset){
	if(this.endIndex === null){
		if(this._tokenizer._sectionStart <= initialOffset){
			this.startIndex = 0;
		} else {
			this.startIndex = this._tokenizer._sectionStart - initialOffset;
		}
	}
	else this.startIndex = this.endIndex + 1;
	this.endIndex = this._tokenizer.getAbsoluteIndex();
};

//Tokenizer event handlers
Parser.prototype.ontext = function(data){
	this._updatePosition(1);
	this.endIndex--;

	if(this._cbs.ontext) this._cbs.ontext(data);
};

Parser.prototype.onopentagname = function(name){
	if(this._lowerCaseTagNames){
		name = name.toLowerCase();
	}

	this._tagname = name;

	if(!this._options.xmlMode && name in openImpliesClose) {
		for(
			var el;
			(el = this._stack[this._stack.length - 1]) in openImpliesClose[name];
			this.onclosetag(el)
		);
	}

	if(this._options.xmlMode || !(name in voidElements)){
		this._stack.push(name);
	}

	if(this._cbs.onopentagname) this._cbs.onopentagname(name);
	if(this._cbs.onopentag) this._attribs = {};
};

Parser.prototype.onopentagend = function(){
	this._updatePosition(1);

	if(this._attribs){
		if(this._cbs.onopentag) this._cbs.onopentag(this._tagname, this._attribs);
		this._attribs = null;
	}

	if(!this._options.xmlMode && this._cbs.onclosetag && this._tagname in voidElements){
		this._cbs.onclosetag(this._tagname);
	}

	this._tagname = "";
};

Parser.prototype.onclosetag = function(name){
	this._updatePosition(1);

	if(this._lowerCaseTagNames){
		name = name.toLowerCase();
	}

	if(this._stack.length && (!(name in voidElements) || this._options.xmlMode)){
		var pos = this._stack.lastIndexOf(name);
		if(pos !== -1){
			if(this._cbs.onclosetag){
				pos = this._stack.length - pos;
				while(pos--) this._cbs.onclosetag(this._stack.pop());
			}
			else this._stack.length = pos;
		} else if(name === "p" && !this._options.xmlMode){
			this.onopentagname(name);
			this._closeCurrentTag();
		}
	} else if(!this._options.xmlMode && (name === "br" || name === "p")){
		this.onopentagname(name);
		this._closeCurrentTag();
	}
};

Parser.prototype.onselfclosingtag = function(){
	if(this._options.xmlMode || this._options.recognizeSelfClosing){
		this._closeCurrentTag();
	} else {
		this.onopentagend();
	}
};

Parser.prototype._closeCurrentTag = function(){
	var name = this._tagname;

	this.onopentagend();

	//self-closing tags will be on the top of the stack
	//(cheaper check than in onclosetag)
	if(this._stack[this._stack.length - 1] === name){
		if(this._cbs.onclosetag){
			this._cbs.onclosetag(name);
		}
		this._stack.pop();
	}
};

Parser.prototype.onattribname = function(name){
	if(this._lowerCaseAttributeNames){
		name = name.toLowerCase();
	}
	this._attribname = name;
};

Parser.prototype.onattribdata = function(value){
	this._attribvalue += value;
};

Parser.prototype.onattribend = function(){
	if(this._cbs.onattribute) this._cbs.onattribute(this._attribname, this._attribvalue);
	if(
		this._attribs &&
		!Object.prototype.hasOwnProperty.call(this._attribs, this._attribname)
	){
		this._attribs[this._attribname] = this._attribvalue;
	}
	this._attribname = "";
	this._attribvalue = "";
};

Parser.prototype._getInstructionName = function(value){
	var idx = value.search(re_nameEnd),
	    name = idx < 0 ? value : value.substr(0, idx);

	if(this._lowerCaseTagNames){
		name = name.toLowerCase();
	}

	return name;
};

Parser.prototype.ondeclaration = function(value){
	if(this._cbs.onprocessinginstruction){
		var name = this._getInstructionName(value);
		this._cbs.onprocessinginstruction("!" + name, "!" + value);
	}
};

Parser.prototype.onprocessinginstruction = function(value){
	if(this._cbs.onprocessinginstruction){
		var name = this._getInstructionName(value);
		this._cbs.onprocessinginstruction("?" + name, "?" + value);
	}
};

Parser.prototype.oncomment = function(value){
	this._updatePosition(4);

	if(this._cbs.oncomment) this._cbs.oncomment(value);
	if(this._cbs.oncommentend) this._cbs.oncommentend();
};

Parser.prototype.oncdata = function(value){
	this._updatePosition(1);

	if(this._options.xmlMode || this._options.recognizeCDATA){
		if(this._cbs.oncdatastart) this._cbs.oncdatastart();
		if(this._cbs.ontext) this._cbs.ontext(value);
		if(this._cbs.oncdataend) this._cbs.oncdataend();
	} else {
		this.oncomment("[CDATA[" + value + "]]");
	}
};

Parser.prototype.onerror = function(err){
	if(this._cbs.onerror) this._cbs.onerror(err);
};

Parser.prototype.onend = function(){
	if(this._cbs.onclosetag){
		for(
			var i = this._stack.length;
			i > 0;
			this._cbs.onclosetag(this._stack[--i])
		);
	}
	if(this._cbs.onend) this._cbs.onend();
};


//Resets the parser to a blank state, ready to parse a new HTML document
Parser.prototype.reset = function(){
	if(this._cbs.onreset) this._cbs.onreset();
	this._tokenizer.reset();

	this._tagname = "";
	this._attribname = "";
	this._attribs = null;
	this._stack = [];

	if(this._cbs.onparserinit) this._cbs.onparserinit(this);
};

//Parses a complete HTML document and pushes it to the handler
Parser.prototype.parseComplete = function(data){
	this.reset();
	this.end(data);
};

Parser.prototype.write = function(chunk){
	this._tokenizer.write(chunk);
};

Parser.prototype.end = function(chunk){
	this._tokenizer.end(chunk);
};

Parser.prototype.pause = function(){
	this._tokenizer.pause();
};

Parser.prototype.resume = function(){
	this._tokenizer.resume();
};

//alias for backwards compat
Parser.prototype.parseChunk = Parser.prototype.write;
Parser.prototype.done = Parser.prototype.end;

module.exports = Parser;

},{"./Tokenizer.js":60,"events":27,"inherits":29}],58:[function(require,module,exports){
module.exports = ProxyHandler;

function ProxyHandler(cbs){
	this._cbs = cbs || {};
}

var EVENTS = require("./").EVENTS;
Object.keys(EVENTS).forEach(function(name){
	if(EVENTS[name] === 0){
		name = "on" + name;
		ProxyHandler.prototype[name] = function(){
			if(this._cbs[name]) this._cbs[name]();
		};
	} else if(EVENTS[name] === 1){
		name = "on" + name;
		ProxyHandler.prototype[name] = function(a){
			if(this._cbs[name]) this._cbs[name](a);
		};
	} else if(EVENTS[name] === 2){
		name = "on" + name;
		ProxyHandler.prototype[name] = function(a, b){
			if(this._cbs[name]) this._cbs[name](a, b);
		};
	} else {
		throw Error("wrong number of arguments");
	}
});
},{"./":62}],59:[function(require,module,exports){
module.exports = Stream;

var Parser = require("./WritableStream.js");

function Stream(options){
	Parser.call(this, new Cbs(this), options);
}

require("inherits")(Stream, Parser);

Stream.prototype.readable = true;

function Cbs(scope){
	this.scope = scope;
}

var EVENTS = require("../").EVENTS;

Object.keys(EVENTS).forEach(function(name){
	if(EVENTS[name] === 0){
		Cbs.prototype["on" + name] = function(){
			this.scope.emit(name);
		};
	} else if(EVENTS[name] === 1){
		Cbs.prototype["on" + name] = function(a){
			this.scope.emit(name, a);
		};
	} else if(EVENTS[name] === 2){
		Cbs.prototype["on" + name] = function(a, b){
			this.scope.emit(name, a, b);
		};
	} else {
		throw Error("wrong number of arguments!");
	}
});
},{"../":62,"./WritableStream.js":61,"inherits":29}],60:[function(require,module,exports){
module.exports = Tokenizer;

var decodeCodePoint = require("entities/lib/decode_codepoint.js"),
    entityMap = require("entities/maps/entities.json"),
    legacyMap = require("entities/maps/legacy.json"),
    xmlMap    = require("entities/maps/xml.json"),

    i = 0,

    TEXT                      = i++,
    BEFORE_TAG_NAME           = i++, //after <
    IN_TAG_NAME               = i++,
    IN_SELF_CLOSING_TAG       = i++,
    BEFORE_CLOSING_TAG_NAME   = i++,
    IN_CLOSING_TAG_NAME       = i++,
    AFTER_CLOSING_TAG_NAME    = i++,

    //attributes
    BEFORE_ATTRIBUTE_NAME     = i++,
    IN_ATTRIBUTE_NAME         = i++,
    AFTER_ATTRIBUTE_NAME      = i++,
    BEFORE_ATTRIBUTE_VALUE    = i++,
    IN_ATTRIBUTE_VALUE_DQ     = i++, // "
    IN_ATTRIBUTE_VALUE_SQ     = i++, // '
    IN_ATTRIBUTE_VALUE_NQ     = i++,

    //declarations
    BEFORE_DECLARATION        = i++, // !
    IN_DECLARATION            = i++,

    //processing instructions
    IN_PROCESSING_INSTRUCTION = i++, // ?

    //comments
    BEFORE_COMMENT            = i++,
    IN_COMMENT                = i++,
    AFTER_COMMENT_1           = i++,
    AFTER_COMMENT_2           = i++,

    //cdata
    BEFORE_CDATA_1            = i++, // [
    BEFORE_CDATA_2            = i++, // C
    BEFORE_CDATA_3            = i++, // D
    BEFORE_CDATA_4            = i++, // A
    BEFORE_CDATA_5            = i++, // T
    BEFORE_CDATA_6            = i++, // A
    IN_CDATA                  = i++, // [
    AFTER_CDATA_1             = i++, // ]
    AFTER_CDATA_2             = i++, // ]

    //special tags
    BEFORE_SPECIAL            = i++, //S
    BEFORE_SPECIAL_END        = i++,   //S

    BEFORE_SCRIPT_1           = i++, //C
    BEFORE_SCRIPT_2           = i++, //R
    BEFORE_SCRIPT_3           = i++, //I
    BEFORE_SCRIPT_4           = i++, //P
    BEFORE_SCRIPT_5           = i++, //T
    AFTER_SCRIPT_1            = i++, //C
    AFTER_SCRIPT_2            = i++, //R
    AFTER_SCRIPT_3            = i++, //I
    AFTER_SCRIPT_4            = i++, //P
    AFTER_SCRIPT_5            = i++, //T

    BEFORE_STYLE_1            = i++, //T
    BEFORE_STYLE_2            = i++, //Y
    BEFORE_STYLE_3            = i++, //L
    BEFORE_STYLE_4            = i++, //E
    AFTER_STYLE_1             = i++, //T
    AFTER_STYLE_2             = i++, //Y
    AFTER_STYLE_3             = i++, //L
    AFTER_STYLE_4             = i++, //E

    BEFORE_ENTITY             = i++, //&
    BEFORE_NUMERIC_ENTITY     = i++, //#
    IN_NAMED_ENTITY           = i++,
    IN_NUMERIC_ENTITY         = i++,
    IN_HEX_ENTITY             = i++, //X

    j = 0,

    SPECIAL_NONE              = j++,
    SPECIAL_SCRIPT            = j++,
    SPECIAL_STYLE             = j++;

function whitespace(c){
	return c === " " || c === "\n" || c === "\t" || c === "\f" || c === "\r";
}

function characterState(char, SUCCESS){
	return function(c){
		if(c === char) this._state = SUCCESS;
	};
}

function ifElseState(upper, SUCCESS, FAILURE){
	var lower = upper.toLowerCase();

	if(upper === lower){
		return function(c){
			if(c === lower){
				this._state = SUCCESS;
			} else {
				this._state = FAILURE;
				this._index--;
			}
		};
	} else {
		return function(c){
			if(c === lower || c === upper){
				this._state = SUCCESS;
			} else {
				this._state = FAILURE;
				this._index--;
			}
		};
	}
}

function consumeSpecialNameChar(upper, NEXT_STATE){
	var lower = upper.toLowerCase();

	return function(c){
		if(c === lower || c === upper){
			this._state = NEXT_STATE;
		} else {
			this._state = IN_TAG_NAME;
			this._index--; //consume the token again
		}
	};
}

function Tokenizer(options, cbs){
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

Tokenizer.prototype._stateText = function(c){
	if(c === "<"){
		if(this._index > this._sectionStart){
			this._cbs.ontext(this._getSection());
		}
		this._state = BEFORE_TAG_NAME;
		this._sectionStart = this._index;
	} else if(this._decodeEntities && this._special === SPECIAL_NONE && c === "&"){
		if(this._index > this._sectionStart){
			this._cbs.ontext(this._getSection());
		}
		this._baseState = TEXT;
		this._state = BEFORE_ENTITY;
		this._sectionStart = this._index;
	}
};

Tokenizer.prototype._stateBeforeTagName = function(c){
	if(c === "/"){
		this._state = BEFORE_CLOSING_TAG_NAME;
	} else if(c === "<"){
		this._cbs.ontext(this._getSection());
		this._sectionStart = this._index;
	} else if(c === ">" || this._special !== SPECIAL_NONE || whitespace(c)) {
		this._state = TEXT;
	} else if(c === "!"){
		this._state = BEFORE_DECLARATION;
		this._sectionStart = this._index + 1;
	} else if(c === "?"){
		this._state = IN_PROCESSING_INSTRUCTION;
		this._sectionStart = this._index + 1;
	} else {
		this._state = (!this._xmlMode && (c === "s" || c === "S")) ?
						BEFORE_SPECIAL : IN_TAG_NAME;
		this._sectionStart = this._index;
	}
};

Tokenizer.prototype._stateInTagName = function(c){
	if(c === "/" || c === ">" || whitespace(c)){
		this._emitToken("onopentagname");
		this._state = BEFORE_ATTRIBUTE_NAME;
		this._index--;
	}
};

Tokenizer.prototype._stateBeforeCloseingTagName = function(c){
	if(whitespace(c));
	else if(c === ">"){
		this._state = TEXT;
	} else if(this._special !== SPECIAL_NONE){
		if(c === "s" || c === "S"){
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

Tokenizer.prototype._stateInCloseingTagName = function(c){
	if(c === ">" || whitespace(c)){
		this._emitToken("onclosetag");
		this._state = AFTER_CLOSING_TAG_NAME;
		this._index--;
	}
};

Tokenizer.prototype._stateAfterCloseingTagName = function(c){
	//skip everything until ">"
	if(c === ">"){
		this._state = TEXT;
		this._sectionStart = this._index + 1;
	}
};

Tokenizer.prototype._stateBeforeAttributeName = function(c){
	if(c === ">"){
		this._cbs.onopentagend();
		this._state = TEXT;
		this._sectionStart = this._index + 1;
	} else if(c === "/"){
		this._state = IN_SELF_CLOSING_TAG;
	} else if(!whitespace(c)){
		this._state = IN_ATTRIBUTE_NAME;
		this._sectionStart = this._index;
	}
};

Tokenizer.prototype._stateInSelfClosingTag = function(c){
	if(c === ">"){
		this._cbs.onselfclosingtag();
		this._state = TEXT;
		this._sectionStart = this._index + 1;
	} else if(!whitespace(c)){
		this._state = BEFORE_ATTRIBUTE_NAME;
		this._index--;
	}
};

Tokenizer.prototype._stateInAttributeName = function(c){
	if(c === "=" || c === "/" || c === ">" || whitespace(c)){
		this._cbs.onattribname(this._getSection());
		this._sectionStart = -1;
		this._state = AFTER_ATTRIBUTE_NAME;
		this._index--;
	}
};

Tokenizer.prototype._stateAfterAttributeName = function(c){
	if(c === "="){
		this._state = BEFORE_ATTRIBUTE_VALUE;
	} else if(c === "/" || c === ">"){
		this._cbs.onattribend();
		this._state = BEFORE_ATTRIBUTE_NAME;
		this._index--;
	} else if(!whitespace(c)){
		this._cbs.onattribend();
		this._state = IN_ATTRIBUTE_NAME;
		this._sectionStart = this._index;
	}
};

Tokenizer.prototype._stateBeforeAttributeValue = function(c){
	if(c === "\""){
		this._state = IN_ATTRIBUTE_VALUE_DQ;
		this._sectionStart = this._index + 1;
	} else if(c === "'"){
		this._state = IN_ATTRIBUTE_VALUE_SQ;
		this._sectionStart = this._index + 1;
	} else if(!whitespace(c)){
		this._state = IN_ATTRIBUTE_VALUE_NQ;
		this._sectionStart = this._index;
		this._index--; //reconsume token
	}
};

Tokenizer.prototype._stateInAttributeValueDoubleQuotes = function(c){
	if(c === "\""){
		this._emitToken("onattribdata");
		this._cbs.onattribend();
		this._state = BEFORE_ATTRIBUTE_NAME;
	} else if(this._decodeEntities && c === "&"){
		this._emitToken("onattribdata");
		this._baseState = this._state;
		this._state = BEFORE_ENTITY;
		this._sectionStart = this._index;
	}
};

Tokenizer.prototype._stateInAttributeValueSingleQuotes = function(c){
	if(c === "'"){
		this._emitToken("onattribdata");
		this._cbs.onattribend();
		this._state = BEFORE_ATTRIBUTE_NAME;
	} else if(this._decodeEntities && c === "&"){
		this._emitToken("onattribdata");
		this._baseState = this._state;
		this._state = BEFORE_ENTITY;
		this._sectionStart = this._index;
	}
};

Tokenizer.prototype._stateInAttributeValueNoQuotes = function(c){
	if(whitespace(c) || c === ">"){
		this._emitToken("onattribdata");
		this._cbs.onattribend();
		this._state = BEFORE_ATTRIBUTE_NAME;
		this._index--;
	} else if(this._decodeEntities && c === "&"){
		this._emitToken("onattribdata");
		this._baseState = this._state;
		this._state = BEFORE_ENTITY;
		this._sectionStart = this._index;
	}
};

Tokenizer.prototype._stateBeforeDeclaration = function(c){
	this._state = c === "[" ? BEFORE_CDATA_1 :
					c === "-" ? BEFORE_COMMENT :
						IN_DECLARATION;
};

Tokenizer.prototype._stateInDeclaration = function(c){
	if(c === ">"){
		this._cbs.ondeclaration(this._getSection());
		this._state = TEXT;
		this._sectionStart = this._index + 1;
	}
};

Tokenizer.prototype._stateInProcessingInstruction = function(c){
	if(c === ">"){
		this._cbs.onprocessinginstruction(this._getSection());
		this._state = TEXT;
		this._sectionStart = this._index + 1;
	}
};

Tokenizer.prototype._stateBeforeComment = function(c){
	if(c === "-"){
		this._state = IN_COMMENT;
		this._sectionStart = this._index + 1;
	} else {
		this._state = IN_DECLARATION;
	}
};

Tokenizer.prototype._stateInComment = function(c){
	if(c === "-") this._state = AFTER_COMMENT_1;
};

Tokenizer.prototype._stateAfterComment1 = function(c){
	if(c === "-"){
		this._state = AFTER_COMMENT_2;
	} else {
		this._state = IN_COMMENT;
	}
};

Tokenizer.prototype._stateAfterComment2 = function(c){
	if(c === ">"){
		//remove 2 trailing chars
		this._cbs.oncomment(this._buffer.substring(this._sectionStart, this._index - 2));
		this._state = TEXT;
		this._sectionStart = this._index + 1;
	} else if(c !== "-"){
		this._state = IN_COMMENT;
	}
	// else: stay in AFTER_COMMENT_2 (`--->`)
};

Tokenizer.prototype._stateBeforeCdata1 = ifElseState("C", BEFORE_CDATA_2, IN_DECLARATION);
Tokenizer.prototype._stateBeforeCdata2 = ifElseState("D", BEFORE_CDATA_3, IN_DECLARATION);
Tokenizer.prototype._stateBeforeCdata3 = ifElseState("A", BEFORE_CDATA_4, IN_DECLARATION);
Tokenizer.prototype._stateBeforeCdata4 = ifElseState("T", BEFORE_CDATA_5, IN_DECLARATION);
Tokenizer.prototype._stateBeforeCdata5 = ifElseState("A", BEFORE_CDATA_6, IN_DECLARATION);

Tokenizer.prototype._stateBeforeCdata6 = function(c){
	if(c === "["){
		this._state = IN_CDATA;
		this._sectionStart = this._index + 1;
	} else {
		this._state = IN_DECLARATION;
		this._index--;
	}
};

Tokenizer.prototype._stateInCdata = function(c){
	if(c === "]") this._state = AFTER_CDATA_1;
};

Tokenizer.prototype._stateAfterCdata1 = characterState("]", AFTER_CDATA_2);

Tokenizer.prototype._stateAfterCdata2 = function(c){
	if(c === ">"){
		//remove 2 trailing chars
		this._cbs.oncdata(this._buffer.substring(this._sectionStart, this._index - 2));
		this._state = TEXT;
		this._sectionStart = this._index + 1;
	} else if(c !== "]") {
		this._state = IN_CDATA;
	}
	//else: stay in AFTER_CDATA_2 (`]]]>`)
};

Tokenizer.prototype._stateBeforeSpecial = function(c){
	if(c === "c" || c === "C"){
		this._state = BEFORE_SCRIPT_1;
	} else if(c === "t" || c === "T"){
		this._state = BEFORE_STYLE_1;
	} else {
		this._state = IN_TAG_NAME;
		this._index--; //consume the token again
	}
};

Tokenizer.prototype._stateBeforeSpecialEnd = function(c){
	if(this._special === SPECIAL_SCRIPT && (c === "c" || c === "C")){
		this._state = AFTER_SCRIPT_1;
	} else if(this._special === SPECIAL_STYLE && (c === "t" || c === "T")){
		this._state = AFTER_STYLE_1;
	}
	else this._state = TEXT;
};

Tokenizer.prototype._stateBeforeScript1 = consumeSpecialNameChar("R", BEFORE_SCRIPT_2);
Tokenizer.prototype._stateBeforeScript2 = consumeSpecialNameChar("I", BEFORE_SCRIPT_3);
Tokenizer.prototype._stateBeforeScript3 = consumeSpecialNameChar("P", BEFORE_SCRIPT_4);
Tokenizer.prototype._stateBeforeScript4 = consumeSpecialNameChar("T", BEFORE_SCRIPT_5);

Tokenizer.prototype._stateBeforeScript5 = function(c){
	if(c === "/" || c === ">" || whitespace(c)){
		this._special = SPECIAL_SCRIPT;
	}
	this._state = IN_TAG_NAME;
	this._index--; //consume the token again
};

Tokenizer.prototype._stateAfterScript1 = ifElseState("R", AFTER_SCRIPT_2, TEXT);
Tokenizer.prototype._stateAfterScript2 = ifElseState("I", AFTER_SCRIPT_3, TEXT);
Tokenizer.prototype._stateAfterScript3 = ifElseState("P", AFTER_SCRIPT_4, TEXT);
Tokenizer.prototype._stateAfterScript4 = ifElseState("T", AFTER_SCRIPT_5, TEXT);

Tokenizer.prototype._stateAfterScript5 = function(c){
	if(c === ">" || whitespace(c)){
		this._special = SPECIAL_NONE;
		this._state = IN_CLOSING_TAG_NAME;
		this._sectionStart = this._index - 6;
		this._index--; //reconsume the token
	}
	else this._state = TEXT;
};

Tokenizer.prototype._stateBeforeStyle1 = consumeSpecialNameChar("Y", BEFORE_STYLE_2);
Tokenizer.prototype._stateBeforeStyle2 = consumeSpecialNameChar("L", BEFORE_STYLE_3);
Tokenizer.prototype._stateBeforeStyle3 = consumeSpecialNameChar("E", BEFORE_STYLE_4);

Tokenizer.prototype._stateBeforeStyle4 = function(c){
	if(c === "/" || c === ">" || whitespace(c)){
		this._special = SPECIAL_STYLE;
	}
	this._state = IN_TAG_NAME;
	this._index--; //consume the token again
};

Tokenizer.prototype._stateAfterStyle1 = ifElseState("Y", AFTER_STYLE_2, TEXT);
Tokenizer.prototype._stateAfterStyle2 = ifElseState("L", AFTER_STYLE_3, TEXT);
Tokenizer.prototype._stateAfterStyle3 = ifElseState("E", AFTER_STYLE_4, TEXT);

Tokenizer.prototype._stateAfterStyle4 = function(c){
	if(c === ">" || whitespace(c)){
		this._special = SPECIAL_NONE;
		this._state = IN_CLOSING_TAG_NAME;
		this._sectionStart = this._index - 5;
		this._index--; //reconsume the token
	}
	else this._state = TEXT;
};

Tokenizer.prototype._stateBeforeEntity = ifElseState("#", BEFORE_NUMERIC_ENTITY, IN_NAMED_ENTITY);
Tokenizer.prototype._stateBeforeNumericEntity = ifElseState("X", IN_HEX_ENTITY, IN_NUMERIC_ENTITY);

//for entities terminated with a semicolon
Tokenizer.prototype._parseNamedEntityStrict = function(){
	//offset = 1
	if(this._sectionStart + 1 < this._index){
		var entity = this._buffer.substring(this._sectionStart + 1, this._index),
		    map = this._xmlMode ? xmlMap : entityMap;

		if(map.hasOwnProperty(entity)){
			this._emitPartial(map[entity]);
			this._sectionStart = this._index + 1;
		}
	}
};


//parses legacy entities (without trailing semicolon)
Tokenizer.prototype._parseLegacyEntity = function(){
	var start = this._sectionStart + 1,
	    limit = this._index - start;

	if(limit > 6) limit = 6; //the max length of legacy entities is 6

	while(limit >= 2){ //the min length of legacy entities is 2
		var entity = this._buffer.substr(start, limit);

		if(legacyMap.hasOwnProperty(entity)){
			this._emitPartial(legacyMap[entity]);
			this._sectionStart += limit + 1;
			return;
		} else {
			limit--;
		}
	}
};

Tokenizer.prototype._stateInNamedEntity = function(c){
	if(c === ";"){
		this._parseNamedEntityStrict();
		if(this._sectionStart + 1 < this._index && !this._xmlMode){
			this._parseLegacyEntity();
		}
		this._state = this._baseState;
	} else if((c < "a" || c > "z") && (c < "A" || c > "Z") && (c < "0" || c > "9")){
		if(this._xmlMode);
		else if(this._sectionStart + 1 === this._index);
		else if(this._baseState !== TEXT){
			if(c !== "="){
				this._parseNamedEntityStrict();
			}
		} else {
			this._parseLegacyEntity();
		}

		this._state = this._baseState;
		this._index--;
	}
};

Tokenizer.prototype._decodeNumericEntity = function(offset, base){
	var sectionStart = this._sectionStart + offset;

	if(sectionStart !== this._index){
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

Tokenizer.prototype._stateInNumericEntity = function(c){
	if(c === ";"){
		this._decodeNumericEntity(2, 10);
		this._sectionStart++;
	} else if(c < "0" || c > "9"){
		if(!this._xmlMode){
			this._decodeNumericEntity(2, 10);
		} else {
			this._state = this._baseState;
		}
		this._index--;
	}
};

Tokenizer.prototype._stateInHexEntity = function(c){
	if(c === ";"){
		this._decodeNumericEntity(3, 16);
		this._sectionStart++;
	} else if((c < "a" || c > "f") && (c < "A" || c > "F") && (c < "0" || c > "9")){
		if(!this._xmlMode){
			this._decodeNumericEntity(3, 16);
		} else {
			this._state = this._baseState;
		}
		this._index--;
	}
};

Tokenizer.prototype._cleanup = function (){
	if(this._sectionStart < 0){
		this._buffer = "";
		this._bufferOffset += this._index;
		this._index = 0;
	} else if(this._running){
		if(this._state === TEXT){
			if(this._sectionStart !== this._index){
				this._cbs.ontext(this._buffer.substr(this._sectionStart));
			}
			this._buffer = "";
			this._bufferOffset += this._index;
			this._index = 0;
		} else if(this._sectionStart === this._index){
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
Tokenizer.prototype.write = function(chunk){
	if(this._ended) this._cbs.onerror(Error(".write() after done!"));

	this._buffer += chunk;
	this._parse();
};

Tokenizer.prototype._parse = function(){
	while(this._index < this._buffer.length && this._running){
		var c = this._buffer.charAt(this._index);
		if(this._state === TEXT) {
			this._stateText(c);
		} else if(this._state === BEFORE_TAG_NAME){
			this._stateBeforeTagName(c);
		} else if(this._state === IN_TAG_NAME) {
			this._stateInTagName(c);
		} else if(this._state === BEFORE_CLOSING_TAG_NAME){
			this._stateBeforeCloseingTagName(c);
		} else if(this._state === IN_CLOSING_TAG_NAME){
			this._stateInCloseingTagName(c);
		} else if(this._state === AFTER_CLOSING_TAG_NAME){
			this._stateAfterCloseingTagName(c);
		} else if(this._state === IN_SELF_CLOSING_TAG){
			this._stateInSelfClosingTag(c);
		}

		/*
		*	attributes
		*/
		else if(this._state === BEFORE_ATTRIBUTE_NAME){
			this._stateBeforeAttributeName(c);
		} else if(this._state === IN_ATTRIBUTE_NAME){
			this._stateInAttributeName(c);
		} else if(this._state === AFTER_ATTRIBUTE_NAME){
			this._stateAfterAttributeName(c);
		} else if(this._state === BEFORE_ATTRIBUTE_VALUE){
			this._stateBeforeAttributeValue(c);
		} else if(this._state === IN_ATTRIBUTE_VALUE_DQ){
			this._stateInAttributeValueDoubleQuotes(c);
		} else if(this._state === IN_ATTRIBUTE_VALUE_SQ){
			this._stateInAttributeValueSingleQuotes(c);
		} else if(this._state === IN_ATTRIBUTE_VALUE_NQ){
			this._stateInAttributeValueNoQuotes(c);
		}

		/*
		*	declarations
		*/
		else if(this._state === BEFORE_DECLARATION){
			this._stateBeforeDeclaration(c);
		} else if(this._state === IN_DECLARATION){
			this._stateInDeclaration(c);
		}

		/*
		*	processing instructions
		*/
		else if(this._state === IN_PROCESSING_INSTRUCTION){
			this._stateInProcessingInstruction(c);
		}

		/*
		*	comments
		*/
		else if(this._state === BEFORE_COMMENT){
			this._stateBeforeComment(c);
		} else if(this._state === IN_COMMENT){
			this._stateInComment(c);
		} else if(this._state === AFTER_COMMENT_1){
			this._stateAfterComment1(c);
		} else if(this._state === AFTER_COMMENT_2){
			this._stateAfterComment2(c);
		}

		/*
		*	cdata
		*/
		else if(this._state === BEFORE_CDATA_1){
			this._stateBeforeCdata1(c);
		} else if(this._state === BEFORE_CDATA_2){
			this._stateBeforeCdata2(c);
		} else if(this._state === BEFORE_CDATA_3){
			this._stateBeforeCdata3(c);
		} else if(this._state === BEFORE_CDATA_4){
			this._stateBeforeCdata4(c);
		} else if(this._state === BEFORE_CDATA_5){
			this._stateBeforeCdata5(c);
		} else if(this._state === BEFORE_CDATA_6){
			this._stateBeforeCdata6(c);
		} else if(this._state === IN_CDATA){
			this._stateInCdata(c);
		} else if(this._state === AFTER_CDATA_1){
			this._stateAfterCdata1(c);
		} else if(this._state === AFTER_CDATA_2){
			this._stateAfterCdata2(c);
		}

		/*
		* special tags
		*/
		else if(this._state === BEFORE_SPECIAL){
			this._stateBeforeSpecial(c);
		} else if(this._state === BEFORE_SPECIAL_END){
			this._stateBeforeSpecialEnd(c);
		}

		/*
		* script
		*/
		else if(this._state === BEFORE_SCRIPT_1){
			this._stateBeforeScript1(c);
		} else if(this._state === BEFORE_SCRIPT_2){
			this._stateBeforeScript2(c);
		} else if(this._state === BEFORE_SCRIPT_3){
			this._stateBeforeScript3(c);
		} else if(this._state === BEFORE_SCRIPT_4){
			this._stateBeforeScript4(c);
		} else if(this._state === BEFORE_SCRIPT_5){
			this._stateBeforeScript5(c);
		}

		else if(this._state === AFTER_SCRIPT_1){
			this._stateAfterScript1(c);
		} else if(this._state === AFTER_SCRIPT_2){
			this._stateAfterScript2(c);
		} else if(this._state === AFTER_SCRIPT_3){
			this._stateAfterScript3(c);
		} else if(this._state === AFTER_SCRIPT_4){
			this._stateAfterScript4(c);
		} else if(this._state === AFTER_SCRIPT_5){
			this._stateAfterScript5(c);
		}

		/*
		* style
		*/
		else if(this._state === BEFORE_STYLE_1){
			this._stateBeforeStyle1(c);
		} else if(this._state === BEFORE_STYLE_2){
			this._stateBeforeStyle2(c);
		} else if(this._state === BEFORE_STYLE_3){
			this._stateBeforeStyle3(c);
		} else if(this._state === BEFORE_STYLE_4){
			this._stateBeforeStyle4(c);
		}

		else if(this._state === AFTER_STYLE_1){
			this._stateAfterStyle1(c);
		} else if(this._state === AFTER_STYLE_2){
			this._stateAfterStyle2(c);
		} else if(this._state === AFTER_STYLE_3){
			this._stateAfterStyle3(c);
		} else if(this._state === AFTER_STYLE_4){
			this._stateAfterStyle4(c);
		}

		/*
		* entities
		*/
		else if(this._state === BEFORE_ENTITY){
			this._stateBeforeEntity(c);
		} else if(this._state === BEFORE_NUMERIC_ENTITY){
			this._stateBeforeNumericEntity(c);
		} else if(this._state === IN_NAMED_ENTITY){
			this._stateInNamedEntity(c);
		} else if(this._state === IN_NUMERIC_ENTITY){
			this._stateInNumericEntity(c);
		} else if(this._state === IN_HEX_ENTITY){
			this._stateInHexEntity(c);
		}

		else {
			this._cbs.onerror(Error("unknown _state"), this._state);
		}

		this._index++;
	}

	this._cleanup();
};

Tokenizer.prototype.pause = function(){
	this._running = false;
};
Tokenizer.prototype.resume = function(){
	this._running = true;

	if(this._index < this._buffer.length){
		this._parse();
	}
	if(this._ended){
		this._finish();
	}
};

Tokenizer.prototype.end = function(chunk){
	if(this._ended) this._cbs.onerror(Error(".end() after done!"));
	if(chunk) this.write(chunk);

	this._ended = true;

	if(this._running) this._finish();
};

Tokenizer.prototype._finish = function(){
	//if there is remaining data, emit it in a reasonable way
	if(this._sectionStart < this._index){
		this._handleTrailingData();
	}

	this._cbs.onend();
};

Tokenizer.prototype._handleTrailingData = function(){
	var data = this._buffer.substr(this._sectionStart);

	if(this._state === IN_CDATA || this._state === AFTER_CDATA_1 || this._state === AFTER_CDATA_2){
		this._cbs.oncdata(data);
	} else if(this._state === IN_COMMENT || this._state === AFTER_COMMENT_1 || this._state === AFTER_COMMENT_2){
		this._cbs.oncomment(data);
	} else if(this._state === IN_NAMED_ENTITY && !this._xmlMode){
		this._parseLegacyEntity();
		if(this._sectionStart < this._index){
			this._state = this._baseState;
			this._handleTrailingData();
		}
	} else if(this._state === IN_NUMERIC_ENTITY && !this._xmlMode){
		this._decodeNumericEntity(2, 10);
		if(this._sectionStart < this._index){
			this._state = this._baseState;
			this._handleTrailingData();
		}
	} else if(this._state === IN_HEX_ENTITY && !this._xmlMode){
		this._decodeNumericEntity(3, 16);
		if(this._sectionStart < this._index){
			this._state = this._baseState;
			this._handleTrailingData();
		}
	} else if(
		this._state !== IN_TAG_NAME &&
		this._state !== BEFORE_ATTRIBUTE_NAME &&
		this._state !== BEFORE_ATTRIBUTE_VALUE &&
		this._state !== AFTER_ATTRIBUTE_NAME &&
		this._state !== IN_ATTRIBUTE_NAME &&
		this._state !== IN_ATTRIBUTE_VALUE_SQ &&
		this._state !== IN_ATTRIBUTE_VALUE_DQ &&
		this._state !== IN_ATTRIBUTE_VALUE_NQ &&
		this._state !== IN_CLOSING_TAG_NAME
	){
		this._cbs.ontext(data);
	}
	//else, ignore remaining data
	//TODO add a way to remove current tag
};

Tokenizer.prototype.reset = function(){
	Tokenizer.call(this, {xmlMode: this._xmlMode, decodeEntities: this._decodeEntities}, this._cbs);
};

Tokenizer.prototype.getAbsoluteIndex = function(){
	return this._bufferOffset + this._index;
};

Tokenizer.prototype._getSection = function(){
	return this._buffer.substring(this._sectionStart, this._index);
};

Tokenizer.prototype._emitToken = function(name){
	this._cbs[name](this._getSection());
	this._sectionStart = -1;
};

Tokenizer.prototype._emitPartial = function(value){
	if(this._baseState !== TEXT){
		this._cbs.onattribdata(value); //TODO implement the new event
	} else {
		this._cbs.ontext(value);
	}
};

},{"entities/lib/decode_codepoint.js":50,"entities/maps/entities.json":52,"entities/maps/legacy.json":53,"entities/maps/xml.json":54}],61:[function(require,module,exports){
module.exports = Stream;

var Parser = require("./Parser.js"),
    WritableStream = require("stream").Writable || require("readable-stream").Writable,
    StringDecoder = require("string_decoder").StringDecoder,
    Buffer = require("buffer").Buffer;

function Stream(cbs, options){
	var parser = this._parser = new Parser(cbs, options);
	var decoder = this._decoder = new StringDecoder();

	WritableStream.call(this, {decodeStrings: false});

	this.once("finish", function(){
		parser.end(decoder.end());
	});
}

require("inherits")(Stream, WritableStream);

WritableStream.prototype._write = function(chunk, encoding, cb){
	if(chunk instanceof Buffer) chunk = this._decoder.write(chunk);
	this._parser.write(chunk);
	cb();
};
},{"./Parser.js":57,"buffer":4,"inherits":29,"readable-stream":2,"stream":63,"string_decoder":3}],62:[function(require,module,exports){
var Parser = require("./Parser.js"),
    DomHandler = require("domhandler");

function defineProp(name, value){
	delete module.exports[name];
	module.exports[name] = value;
	return value;
}

module.exports = {
	Parser: Parser,
	Tokenizer: require("./Tokenizer.js"),
	ElementType: require("domelementtype"),
	DomHandler: DomHandler,
	get FeedHandler(){
		return defineProp("FeedHandler", require("./FeedHandler.js"));
	},
	get Stream(){
		return defineProp("Stream", require("./Stream.js"));
	},
	get WritableStream(){
		return defineProp("WritableStream", require("./WritableStream.js"));
	},
	get ProxyHandler(){
		return defineProp("ProxyHandler", require("./ProxyHandler.js"));
	},
	get DomUtils(){
		return defineProp("DomUtils", require("domutils"));
	},
	get CollectingHandler(){
		return defineProp("CollectingHandler", require("./CollectingHandler.js"));
	},
	// For legacy support
	DefaultHandler: DomHandler,
	get RssHandler(){
		return defineProp("RssHandler", this.FeedHandler);
	},
	//helper methods
	parseDOM: function(data, options){
		var handler = new DomHandler(options);
		new Parser(handler, options).end(data);
		return handler.dom;
	},
	parseFeed: function(feed, options){
		var handler = new module.exports.FeedHandler(options);
		new Parser(handler, options).end(feed);
		return handler.dom;
	},
	createDomStream: function(cb, options, elementCb){
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

},{"./CollectingHandler.js":55,"./FeedHandler.js":56,"./Parser.js":57,"./ProxyHandler.js":58,"./Stream.js":59,"./Tokenizer.js":60,"./WritableStream.js":61,"domelementtype":16,"domhandler":17,"domutils":20}],63:[function(require,module,exports){
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

},{"events":27,"inherits":29,"readable-stream/duplex.js":34,"readable-stream/passthrough.js":43,"readable-stream/readable.js":44,"readable-stream/transform.js":45,"readable-stream/writable.js":46}],64:[function(require,module,exports){
'use strict';

var Buffer = require('safe-buffer').Buffer;

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
  this.lastChar = Buffer.allocUnsafe(nb);
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
    return '\ufffd'.repeat(p);
  }
  if (self.lastNeed > 1 && buf.length > 1) {
    if ((buf[1] & 0xC0) !== 0x80) {
      self.lastNeed = 1;
      return '\ufffd'.repeat(p + 1);
    }
    if (self.lastNeed > 2 && buf.length > 2) {
      if ((buf[2] & 0xC0) !== 0x80) {
        self.lastNeed = 2;
        return '\ufffd'.repeat(p + 2);
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
  if (this.lastNeed) return r + '\ufffd'.repeat(this.lastTotal - this.lastNeed);
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
},{"safe-buffer":48}],65:[function(require,module,exports){
(function (global){

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

function deprecate (fn, msg) {
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

function config (name) {
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

},{}],66:[function(require,module,exports){
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

},{}]},{},[49])(49)
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvYmFzZTY0LWpzL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2Jyb3dzZXItcmVzb2x2ZS9lbXB0eS5qcyIsIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9zdHJpbmdfZGVjb2Rlci9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9idWZmZXIvaW5kZXguanMiLCJub2RlX21vZHVsZXMvY29yZS11dGlsLWlzL2xpYi91dGlsLmpzIiwibm9kZV9tb2R1bGVzL2RvbS1zZXJpYWxpemVyL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2RvbS1zZXJpYWxpemVyL25vZGVfbW9kdWxlcy9kb21lbGVtZW50dHlwZS9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9kb20tc2VyaWFsaXplci9ub2RlX21vZHVsZXMvZW50aXRpZXMvaW5kZXguanMiLCJub2RlX21vZHVsZXMvZG9tLXNlcmlhbGl6ZXIvbm9kZV9tb2R1bGVzL2VudGl0aWVzL2xpYi9kZWNvZGUuanMiLCJub2RlX21vZHVsZXMvZG9tLXNlcmlhbGl6ZXIvbm9kZV9tb2R1bGVzL2VudGl0aWVzL2xpYi9kZWNvZGVfY29kZXBvaW50LmpzIiwibm9kZV9tb2R1bGVzL2RvbS1zZXJpYWxpemVyL25vZGVfbW9kdWxlcy9lbnRpdGllcy9saWIvZW5jb2RlLmpzIiwibm9kZV9tb2R1bGVzL2RvbS1zZXJpYWxpemVyL25vZGVfbW9kdWxlcy9lbnRpdGllcy9tYXBzL2RlY29kZS5qc29uIiwibm9kZV9tb2R1bGVzL2RvbS1zZXJpYWxpemVyL25vZGVfbW9kdWxlcy9lbnRpdGllcy9tYXBzL2VudGl0aWVzLmpzb24iLCJub2RlX21vZHVsZXMvZG9tLXNlcmlhbGl6ZXIvbm9kZV9tb2R1bGVzL2VudGl0aWVzL21hcHMvbGVnYWN5Lmpzb24iLCJub2RlX21vZHVsZXMvZG9tLXNlcmlhbGl6ZXIvbm9kZV9tb2R1bGVzL2VudGl0aWVzL21hcHMveG1sLmpzb24iLCJub2RlX21vZHVsZXMvZG9tZWxlbWVudHR5cGUvaW5kZXguanMiLCJub2RlX21vZHVsZXMvZG9taGFuZGxlci9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9kb21oYW5kbGVyL2xpYi9lbGVtZW50LmpzIiwibm9kZV9tb2R1bGVzL2RvbWhhbmRsZXIvbGliL25vZGUuanMiLCJub2RlX21vZHVsZXMvZG9tdXRpbHMvaW5kZXguanMiLCJub2RlX21vZHVsZXMvZG9tdXRpbHMvbGliL2hlbHBlcnMuanMiLCJub2RlX21vZHVsZXMvZG9tdXRpbHMvbGliL2xlZ2FjeS5qcyIsIm5vZGVfbW9kdWxlcy9kb211dGlscy9saWIvbWFuaXB1bGF0aW9uLmpzIiwibm9kZV9tb2R1bGVzL2RvbXV0aWxzL2xpYi9xdWVyeWluZy5qcyIsIm5vZGVfbW9kdWxlcy9kb211dGlscy9saWIvc3RyaW5naWZ5LmpzIiwibm9kZV9tb2R1bGVzL2RvbXV0aWxzL2xpYi90cmF2ZXJzYWwuanMiLCJub2RlX21vZHVsZXMvZXZlbnRzL2V2ZW50cy5qcyIsIm5vZGVfbW9kdWxlcy9pZWVlNzU0L2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2luaGVyaXRzL2luaGVyaXRzX2Jyb3dzZXIuanMiLCJub2RlX21vZHVsZXMvaXMtYnVmZmVyL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2lzYXJyYXkvaW5kZXguanMiLCJub2RlX21vZHVsZXMvcHJvY2Vzcy1uZXh0aWNrLWFyZ3MvaW5kZXguanMiLCJub2RlX21vZHVsZXMvcHJvY2Vzcy9icm93c2VyLmpzIiwibm9kZV9tb2R1bGVzL3JlYWRhYmxlLXN0cmVhbS9kdXBsZXgtYnJvd3Nlci5qcyIsIm5vZGVfbW9kdWxlcy9yZWFkYWJsZS1zdHJlYW0vbGliL19zdHJlYW1fZHVwbGV4LmpzIiwibm9kZV9tb2R1bGVzL3JlYWRhYmxlLXN0cmVhbS9saWIvX3N0cmVhbV9wYXNzdGhyb3VnaC5qcyIsIm5vZGVfbW9kdWxlcy9yZWFkYWJsZS1zdHJlYW0vbGliL19zdHJlYW1fcmVhZGFibGUuanMiLCJub2RlX21vZHVsZXMvcmVhZGFibGUtc3RyZWFtL2xpYi9fc3RyZWFtX3RyYW5zZm9ybS5qcyIsIm5vZGVfbW9kdWxlcy9yZWFkYWJsZS1zdHJlYW0vbGliL19zdHJlYW1fd3JpdGFibGUuanMiLCJub2RlX21vZHVsZXMvcmVhZGFibGUtc3RyZWFtL2xpYi9pbnRlcm5hbC9zdHJlYW1zL0J1ZmZlckxpc3QuanMiLCJub2RlX21vZHVsZXMvcmVhZGFibGUtc3RyZWFtL2xpYi9pbnRlcm5hbC9zdHJlYW1zL2Rlc3Ryb3kuanMiLCJub2RlX21vZHVsZXMvcmVhZGFibGUtc3RyZWFtL2xpYi9pbnRlcm5hbC9zdHJlYW1zL3N0cmVhbS1icm93c2VyLmpzIiwibm9kZV9tb2R1bGVzL3JlYWRhYmxlLXN0cmVhbS9wYXNzdGhyb3VnaC5qcyIsIm5vZGVfbW9kdWxlcy9yZWFkYWJsZS1zdHJlYW0vcmVhZGFibGUtYnJvd3Nlci5qcyIsIm5vZGVfbW9kdWxlcy9yZWFkYWJsZS1zdHJlYW0vdHJhbnNmb3JtLmpzIiwibm9kZV9tb2R1bGVzL3JlYWRhYmxlLXN0cmVhbS93cml0YWJsZS1icm93c2VyLmpzIiwibm9kZV9tb2R1bGVzL3JlZ2V4cC1xdW90ZS9yZWdleHAtcXVvdGUuanMiLCJub2RlX21vZHVsZXMvc2FmZS1idWZmZXIvaW5kZXguanMiLCJub2RlX21vZHVsZXMvc2FuaXRpemUtaHRtbC9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9zYW5pdGl6ZS1odG1sL25vZGVfbW9kdWxlcy9odG1scGFyc2VyMi9saWIvQ29sbGVjdGluZ0hhbmRsZXIuanMiLCJub2RlX21vZHVsZXMvc2FuaXRpemUtaHRtbC9ub2RlX21vZHVsZXMvaHRtbHBhcnNlcjIvbGliL0ZlZWRIYW5kbGVyLmpzIiwibm9kZV9tb2R1bGVzL3Nhbml0aXplLWh0bWwvbm9kZV9tb2R1bGVzL2h0bWxwYXJzZXIyL2xpYi9QYXJzZXIuanMiLCJub2RlX21vZHVsZXMvc2FuaXRpemUtaHRtbC9ub2RlX21vZHVsZXMvaHRtbHBhcnNlcjIvbGliL1Byb3h5SGFuZGxlci5qcyIsIm5vZGVfbW9kdWxlcy9zYW5pdGl6ZS1odG1sL25vZGVfbW9kdWxlcy9odG1scGFyc2VyMi9saWIvU3RyZWFtLmpzIiwibm9kZV9tb2R1bGVzL3Nhbml0aXplLWh0bWwvbm9kZV9tb2R1bGVzL2h0bWxwYXJzZXIyL2xpYi9Ub2tlbml6ZXIuanMiLCJub2RlX21vZHVsZXMvc2FuaXRpemUtaHRtbC9ub2RlX21vZHVsZXMvaHRtbHBhcnNlcjIvbGliL1dyaXRhYmxlU3RyZWFtLmpzIiwibm9kZV9tb2R1bGVzL3Nhbml0aXplLWh0bWwvbm9kZV9tb2R1bGVzL2h0bWxwYXJzZXIyL2xpYi9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9zdHJlYW0tYnJvd3NlcmlmeS9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9zdHJpbmdfZGVjb2Rlci9saWIvc3RyaW5nX2RlY29kZXIuanMiLCJub2RlX21vZHVsZXMvdXRpbC1kZXByZWNhdGUvYnJvd3Nlci5qcyIsIm5vZGVfbW9kdWxlcy94dGVuZC9pbW11dGFibGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsSEE7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUM3TkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUM3dkRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQzNHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6RUE7O0FDQUE7O0FDQUE7O0FDQUE7QUFDQTs7QUNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdExBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0lBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0VBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOVNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUMzQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4TEE7QUFDQTs7QUNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDOUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUM5K0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUNyTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUN2cEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2RUE7QUFDQTs7QUNEQTtBQUNBOztBQ0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTs7QUNEQTtBQUNBOzs7O0FDREEsT0FBTyxPQUFQLEdBQWlCLFVBQVUsTUFBVixFQUFrQjtBQUNqQyxTQUFPLE9BQU8sT0FBUCxDQUFlLHNCQUFmLEVBQXVDLE1BQXZDLENBQVA7QUFDRCxDQUZEOzs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUM5REEsSUFBSSxhQUFhLFFBQVEsYUFBUixDQUFqQjtBQUNBLElBQUksU0FBUyxRQUFRLE9BQVIsQ0FBYjtBQUNBLElBQUksY0FBYyxRQUFRLGNBQVIsQ0FBbEI7O0FBRUEsU0FBUyxJQUFULENBQWMsR0FBZCxFQUFtQixFQUFuQixFQUF1QjtBQUNyQixNQUFJLEdBQUosRUFBUyxPQUFPLElBQVAsQ0FBWSxHQUFaLEVBQWlCLE9BQWpCLENBQXlCLFVBQVUsR0FBVixFQUFlO0FBQy9DLE9BQUcsSUFBSSxHQUFKLENBQUgsRUFBYSxHQUFiO0FBQ0QsR0FGUTtBQUdWOztBQUVEO0FBQ0EsU0FBUyxHQUFULENBQWEsR0FBYixFQUFrQixHQUFsQixFQUF1QjtBQUNyQixTQUFRLEVBQUQsQ0FBSyxjQUFMLENBQW9CLElBQXBCLENBQXlCLEdBQXpCLEVBQThCLEdBQTlCLENBQVA7QUFDRDs7QUFFRCxPQUFPLE9BQVAsR0FBaUIsWUFBakI7O0FBRUE7QUFDQTtBQUNBOztBQUVBLFNBQVMsWUFBVCxDQUFzQixJQUF0QixFQUE0QixPQUE1QixFQUFxQyxVQUFyQyxFQUFpRDtBQUMvQyxNQUFJLFNBQVMsRUFBYjs7QUFFQSxXQUFTLEtBQVQsQ0FBZSxHQUFmLEVBQW9CLE9BQXBCLEVBQTZCO0FBQzNCLFFBQUksT0FBTyxJQUFYO0FBQ0EsU0FBSyxHQUFMLEdBQVcsR0FBWDtBQUNBLFNBQUssT0FBTCxHQUFlLFdBQVcsRUFBMUI7QUFDQSxTQUFLLFdBQUwsR0FBbUIsT0FBTyxNQUExQjtBQUNBLFNBQUssSUFBTCxHQUFZLEVBQVosQ0FMMkIsQ0FLWDs7QUFFaEIsU0FBSyxvQkFBTCxHQUE0QixZQUFXO0FBQ3JDLFVBQUksTUFBTSxNQUFWLEVBQWtCO0FBQ2QsWUFBSSxjQUFjLE1BQU0sTUFBTSxNQUFOLEdBQWUsQ0FBckIsQ0FBbEI7QUFDQSxvQkFBWSxJQUFaLElBQW9CLEtBQUssSUFBekI7QUFDSDtBQUNGLEtBTEQ7QUFNRDs7QUFFRCxNQUFJLENBQUMsT0FBTCxFQUFjO0FBQ1osY0FBVSxhQUFhLFFBQXZCO0FBQ0EsWUFBUSxNQUFSLEdBQWlCLGtCQUFqQjtBQUNELEdBSEQsTUFHTztBQUNMLGNBQVUsT0FBTyxhQUFhLFFBQXBCLEVBQThCLE9BQTlCLENBQVY7QUFDQSxRQUFJLFFBQVEsTUFBWixFQUFvQjtBQUNsQixjQUFRLE1BQVIsR0FBaUIsT0FBTyxrQkFBUCxFQUEyQixRQUFRLE1BQW5DLENBQWpCO0FBQ0QsS0FGRCxNQUVPO0FBQ0wsY0FBUSxNQUFSLEdBQWlCLGtCQUFqQjtBQUNEO0FBQ0Y7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFJLG1CQUFtQixRQUFRLFdBQVIsSUFBdUIsQ0FBRSxRQUFGLEVBQVksT0FBWixFQUFxQixVQUFyQixDQUE5QztBQUNBLE1BQUksb0JBQUo7QUFDQSxNQUFJLHdCQUFKO0FBQ0EsTUFBRyxRQUFRLGlCQUFYLEVBQThCO0FBQzVCLDJCQUF1QixFQUF2QjtBQUNBLCtCQUEyQixFQUEzQjtBQUNBLFNBQUssUUFBUSxpQkFBYixFQUFnQyxVQUFTLFVBQVQsRUFBcUIsR0FBckIsRUFBMEI7QUFDeEQsMkJBQXFCLEdBQXJCLElBQTRCLEVBQTVCO0FBQ0EsVUFBSSxZQUFZLEVBQWhCO0FBQ0EsaUJBQVcsT0FBWCxDQUFtQixVQUFTLElBQVQsRUFBZTtBQUNoQyxZQUFHLEtBQUssT0FBTCxDQUFhLEdBQWIsS0FBcUIsQ0FBeEIsRUFBMkI7QUFDekIsb0JBQVUsSUFBVixDQUFlLFlBQVksSUFBWixFQUFrQixPQUFsQixDQUEwQixPQUExQixFQUFtQyxJQUFuQyxDQUFmO0FBQ0QsU0FGRCxNQUVPO0FBQ0wsK0JBQXFCLEdBQXJCLEVBQTBCLElBQTFCLENBQStCLElBQS9CO0FBQ0Q7QUFDRixPQU5EO0FBT0EsK0JBQXlCLEdBQXpCLElBQWdDLElBQUksTUFBSixDQUFXLE9BQU8sVUFBVSxJQUFWLENBQWUsR0FBZixDQUFQLEdBQTZCLElBQXhDLENBQWhDO0FBQ0QsS0FYRDtBQVlEO0FBQ0QsTUFBSSxvQkFBb0IsRUFBeEI7QUFDQSxPQUFLLFFBQVEsY0FBYixFQUE2QixVQUFTLE9BQVQsRUFBa0IsR0FBbEIsRUFBdUI7QUFDbEQ7QUFDQSxRQUFHLG9CQUFILEVBQXlCO0FBQ3ZCLFVBQUksQ0FBQyxJQUFJLG9CQUFKLEVBQTBCLEdBQTFCLENBQUwsRUFBcUM7QUFDbkMsNkJBQXFCLEdBQXJCLElBQTRCLEVBQTVCO0FBQ0Q7QUFDRCwyQkFBcUIsR0FBckIsRUFBMEIsSUFBMUIsQ0FBK0IsT0FBL0I7QUFDRDs7QUFFRCxzQkFBa0IsR0FBbEIsSUFBeUIsT0FBekI7QUFDRCxHQVZEOztBQVlBLE1BQUksbUJBQW1CLEVBQXZCO0FBQ0EsTUFBSSxnQkFBSjtBQUNBLE9BQUssUUFBUSxhQUFiLEVBQTRCLFVBQVMsU0FBVCxFQUFvQixHQUFwQixFQUF5QjtBQUNuRCxRQUFJLFFBQUo7QUFDQSxRQUFJLE9BQU8sU0FBUCxLQUFxQixVQUF6QixFQUFxQztBQUNuQyxpQkFBVyxTQUFYO0FBQ0QsS0FGRCxNQUVPLElBQUksT0FBTyxTQUFQLEtBQXFCLFFBQXpCLEVBQW1DO0FBQ3hDLGlCQUFXLGFBQWEsZUFBYixDQUE2QixTQUE3QixDQUFYO0FBQ0Q7QUFDRCxRQUFJLFFBQVEsR0FBWixFQUFpQjtBQUNmLHlCQUFtQixRQUFuQjtBQUNELEtBRkQsTUFFTztBQUNMLHVCQUFpQixHQUFqQixJQUF3QixRQUF4QjtBQUNEO0FBQ0YsR0FaRDs7QUFjQSxNQUFJLFFBQVEsQ0FBWjtBQUNBLE1BQUksUUFBUSxFQUFaO0FBQ0EsTUFBSSxVQUFVLEVBQWQ7QUFDQSxNQUFJLGVBQWUsRUFBbkI7QUFDQSxNQUFJLFdBQVcsS0FBZjtBQUNBLE1BQUksZ0JBQWdCLENBQXBCOztBQUVBLE1BQUksU0FBUyxJQUFJLFdBQVcsTUFBZixDQUFzQjtBQUNqQyxlQUFXLG1CQUFTLElBQVQsRUFBZSxPQUFmLEVBQXdCO0FBQ2pDLFVBQUksUUFBSixFQUFjO0FBQ1o7QUFDQTtBQUNEO0FBQ0QsVUFBSSxRQUFRLElBQUksS0FBSixDQUFVLElBQVYsRUFBZ0IsT0FBaEIsQ0FBWjtBQUNBLFlBQU0sSUFBTixDQUFXLEtBQVg7O0FBRUEsVUFBSSxPQUFPLEtBQVg7QUFDQSxVQUFJLFVBQVUsTUFBTSxJQUFOLEdBQWEsSUFBYixHQUFvQixLQUFsQztBQUNBLFVBQUksY0FBSjtBQUNBLFVBQUksSUFBSSxnQkFBSixFQUFzQixJQUF0QixDQUFKLEVBQWlDO0FBQy9CLHlCQUFpQixpQkFBaUIsSUFBakIsRUFBdUIsSUFBdkIsRUFBNkIsT0FBN0IsQ0FBakI7O0FBRUEsY0FBTSxPQUFOLEdBQWdCLFVBQVUsZUFBZSxPQUF6Qzs7QUFFQSxZQUFJLGVBQWUsSUFBZixLQUF3QixTQUE1QixFQUF1QztBQUNyQyxnQkFBTSxTQUFOLEdBQWtCLGVBQWUsSUFBakM7QUFDRDs7QUFFRCxZQUFJLFNBQVMsZUFBZSxPQUE1QixFQUFxQztBQUNuQyxnQkFBTSxJQUFOLEdBQWEsT0FBTyxlQUFlLE9BQW5DO0FBQ0EsdUJBQWEsS0FBYixJQUFzQixlQUFlLE9BQXJDO0FBQ0Q7QUFDRjtBQUNELFVBQUksZ0JBQUosRUFBc0I7QUFDcEIseUJBQWlCLGlCQUFpQixJQUFqQixFQUF1QixPQUF2QixDQUFqQjs7QUFFQSxjQUFNLE9BQU4sR0FBZ0IsVUFBVSxlQUFlLE9BQXpDO0FBQ0EsWUFBSSxTQUFTLGVBQWUsT0FBNUIsRUFBcUM7QUFDbkMsZ0JBQU0sSUFBTixHQUFhLE9BQU8sZUFBZSxPQUFuQztBQUNBLHVCQUFhLEtBQWIsSUFBc0IsZUFBZSxPQUFyQztBQUNEO0FBQ0Y7O0FBRUQsVUFBSSxRQUFRLFdBQVIsSUFBdUIsUUFBUSxXQUFSLENBQW9CLE9BQXBCLENBQTRCLElBQTVCLE1BQXNDLENBQUMsQ0FBbEUsRUFBcUU7QUFDbkUsZUFBTyxJQUFQO0FBQ0EsWUFBSSxpQkFBaUIsT0FBakIsQ0FBeUIsSUFBekIsTUFBbUMsQ0FBQyxDQUF4QyxFQUEyQztBQUN6QyxxQkFBVyxJQUFYO0FBQ0EsMEJBQWdCLENBQWhCO0FBQ0Q7QUFDRCxnQkFBUSxLQUFSLElBQWlCLElBQWpCO0FBQ0Q7QUFDRDtBQUNBLFVBQUksSUFBSixFQUFVO0FBQ1I7QUFDQTtBQUNEO0FBQ0QsZ0JBQVUsTUFBTSxJQUFoQjtBQUNBLFVBQUksQ0FBQyxvQkFBRCxJQUF5QixJQUFJLG9CQUFKLEVBQTBCLElBQTFCLENBQXpCLElBQTRELHFCQUFxQixHQUFyQixDQUFoRSxFQUEyRjtBQUN6RixhQUFLLE9BQUwsRUFBYyxVQUFTLEtBQVQsRUFBZ0IsQ0FBaEIsRUFBbUI7QUFDL0IsY0FBSSxDQUFDLG9CQUFELElBQ0MsSUFBSSxvQkFBSixFQUEwQixJQUExQixLQUFtQyxxQkFBcUIsSUFBckIsRUFBMkIsT0FBM0IsQ0FBbUMsQ0FBbkMsTUFBMEMsQ0FBQyxDQUQvRSxJQUVDLHFCQUFxQixHQUFyQixLQUE2QixxQkFBcUIsR0FBckIsRUFBMEIsT0FBMUIsQ0FBa0MsQ0FBbEMsTUFBeUMsQ0FBQyxDQUZ4RSxJQUdDLElBQUksd0JBQUosRUFBOEIsSUFBOUIsS0FBdUMseUJBQXlCLElBQXpCLEVBQStCLElBQS9CLENBQW9DLENBQXBDLENBSHhDLElBSUMseUJBQXlCLEdBQXpCLEtBQWlDLHlCQUF5QixHQUF6QixFQUE4QixJQUE5QixDQUFtQyxDQUFuQyxDQUp0QyxFQUk4RTtBQUM1RSxnQkFBSyxNQUFNLE1BQVAsSUFBbUIsTUFBTSxLQUE3QixFQUFxQztBQUNuQyxrQkFBSSxZQUFZLElBQVosRUFBa0IsS0FBbEIsQ0FBSixFQUE4QjtBQUM1Qix1QkFBTyxNQUFNLE9BQU4sQ0FBYyxDQUFkLENBQVA7QUFDQTtBQUNEO0FBQ0Y7QUFDRCxnQkFBSSxNQUFNLE9BQVYsRUFBbUI7QUFDakIsc0JBQVEsY0FBYyxLQUFkLEVBQXFCLGtCQUFrQixJQUFsQixDQUFyQixDQUFSO0FBQ0Esa0JBQUksQ0FBQyxNQUFNLE1BQVgsRUFBbUI7QUFDakIsdUJBQU8sTUFBTSxPQUFOLENBQWMsQ0FBZCxDQUFQO0FBQ0E7QUFDRDtBQUNGO0FBQ0Qsc0JBQVUsTUFBTSxDQUFoQjtBQUNBLGdCQUFJLE1BQU0sTUFBVixFQUFrQjtBQUNoQix3QkFBVSxPQUFPLFdBQVcsS0FBWCxDQUFQLEdBQTJCLEdBQXJDO0FBQ0Q7QUFDRixXQXRCRCxNQXNCTztBQUNMLG1CQUFPLE1BQU0sT0FBTixDQUFjLENBQWQsQ0FBUDtBQUNEO0FBQ0YsU0ExQkQ7QUEyQkQ7QUFDRCxVQUFJLFFBQVEsV0FBUixDQUFvQixPQUFwQixDQUE0QixJQUE1QixNQUFzQyxDQUFDLENBQTNDLEVBQThDO0FBQzVDLGtCQUFVLEtBQVY7QUFDRCxPQUZELE1BRU87QUFDTCxrQkFBVSxHQUFWO0FBQ0EsWUFBSSxNQUFNLFNBQU4sSUFBbUIsQ0FBQyxPQUFwQixJQUErQixDQUFDLFFBQVEsVUFBNUMsRUFBd0Q7QUFDdEQsb0JBQVUsTUFBTSxTQUFoQjtBQUNEO0FBQ0Y7QUFDRixLQXZGZ0M7QUF3RmpDLFlBQVEsZ0JBQVMsSUFBVCxFQUFlO0FBQ3JCLFVBQUksUUFBSixFQUFjO0FBQ1o7QUFDRDtBQUNELFVBQUksWUFBWSxNQUFNLE1BQU0sTUFBTixHQUFhLENBQW5CLENBQWhCO0FBQ0EsVUFBSSxHQUFKOztBQUVBLFVBQUksU0FBSixFQUFlO0FBQ2IsY0FBTSxVQUFVLEdBQWhCO0FBQ0E7QUFDQSxlQUFPLFVBQVUsU0FBVixLQUF3QixTQUF4QixHQUFvQyxVQUFVLFNBQTlDLEdBQTBELElBQWpFO0FBQ0Q7O0FBRUQsVUFBSyxRQUFRLFFBQVQsSUFBdUIsUUFBUSxPQUFuQyxFQUE2QztBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFVLElBQVY7QUFDRCxPQU5ELE1BTU87QUFDTCxZQUFJLFVBQVUsV0FBVyxJQUFYLENBQWQ7QUFDQSxZQUFJLFFBQVEsVUFBWixFQUF3QjtBQUN0QixvQkFBVSxRQUFRLFVBQVIsQ0FBbUIsT0FBbkIsQ0FBVjtBQUNELFNBRkQsTUFFTztBQUNMLG9CQUFVLE9BQVY7QUFDRDtBQUNGO0FBQ0QsVUFBSSxNQUFNLE1BQVYsRUFBa0I7QUFDYixZQUFJLFFBQVEsTUFBTSxNQUFNLE1BQU4sR0FBZSxDQUFyQixDQUFaO0FBQ0EsY0FBTSxJQUFOLElBQWMsSUFBZDtBQUNKO0FBQ0YsS0F2SGdDO0FBd0hqQyxnQkFBWSxvQkFBUyxJQUFULEVBQWU7O0FBRXpCLFVBQUksUUFBSixFQUFjO0FBQ1o7QUFDQSxZQUFJLENBQUMsYUFBTCxFQUFvQjtBQUNsQixxQkFBVyxLQUFYO0FBQ0QsU0FGRCxNQUVPO0FBQ0w7QUFDRDtBQUNGOztBQUVELFVBQUksUUFBUSxNQUFNLEdBQU4sRUFBWjtBQUNBLFVBQUksQ0FBQyxLQUFMLEVBQVk7QUFDVjtBQUNBO0FBQ0Q7QUFDRCxpQkFBVyxLQUFYO0FBQ0E7QUFDQSxVQUFJLFFBQVEsS0FBUixDQUFKLEVBQW9CO0FBQ2xCLGVBQU8sUUFBUSxLQUFSLENBQVA7QUFDQSxjQUFNLG9CQUFOO0FBQ0E7QUFDRDs7QUFFRCxVQUFJLGFBQWEsS0FBYixDQUFKLEVBQXlCO0FBQ3ZCLGVBQU8sYUFBYSxLQUFiLENBQVA7QUFDQSxlQUFPLGFBQWEsS0FBYixDQUFQO0FBQ0Q7O0FBRUQsVUFBSSxRQUFRLGVBQVIsSUFBMkIsUUFBUSxlQUFSLENBQXdCLEtBQXhCLENBQS9CLEVBQStEO0FBQzVELGlCQUFTLE9BQU8sTUFBUCxDQUFjLENBQWQsRUFBaUIsTUFBTSxXQUF2QixDQUFUO0FBQ0E7QUFDRjs7QUFFRCxZQUFNLG9CQUFOOztBQUVBLFVBQUksUUFBUSxXQUFSLENBQW9CLE9BQXBCLENBQTRCLElBQTVCLE1BQXNDLENBQUMsQ0FBM0MsRUFBOEM7QUFDM0M7QUFDQTtBQUNGOztBQUVELGdCQUFVLE9BQU8sSUFBUCxHQUFjLEdBQXhCO0FBQ0Q7QUFsS2dDLEdBQXRCLEVBbUtWLFFBQVEsTUFuS0UsQ0FBYjtBQW9LQSxTQUFPLEtBQVAsQ0FBYSxJQUFiO0FBQ0EsU0FBTyxHQUFQOztBQUVBLFNBQU8sTUFBUDs7QUFFQSxXQUFTLFVBQVQsQ0FBb0IsQ0FBcEIsRUFBdUI7QUFDckIsUUFBSSxPQUFPLENBQVAsS0FBYyxRQUFsQixFQUE0QjtBQUMxQixVQUFJLElBQUksRUFBUjtBQUNEO0FBQ0QsV0FBTyxFQUFFLE9BQUYsQ0FBVSxLQUFWLEVBQWlCLE9BQWpCLEVBQTBCLE9BQTFCLENBQWtDLElBQWxDLEVBQXdDLE1BQXhDLEVBQWdELE9BQWhELENBQXdELEtBQXhELEVBQStELE1BQS9ELEVBQXVFLE9BQXZFLENBQStFLEtBQS9FLEVBQXNGLFFBQXRGLENBQVA7QUFDRDs7QUFFRCxXQUFTLFdBQVQsQ0FBcUIsSUFBckIsRUFBMkIsSUFBM0IsRUFBaUM7QUFDL0I7QUFDQTtBQUNBO0FBQ0EsV0FBTyxLQUFLLE9BQUwsQ0FBYSxlQUFiLEVBQThCLEVBQTlCLENBQVA7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFPLEtBQUssT0FBTCxDQUFhLG1CQUFiLEVBQWtDLEVBQWxDLENBQVA7QUFDQTtBQUNBLFFBQUksVUFBVSxLQUFLLEtBQUwsQ0FBVyxnQkFBWCxDQUFkO0FBQ0EsUUFBSSxDQUFDLE9BQUwsRUFBYztBQUNaO0FBQ0EsVUFBSSxLQUFLLEtBQUwsQ0FBVyxPQUFYLENBQUosRUFBeUI7QUFDdkIsZUFBTyxDQUFDLFFBQVEscUJBQWhCO0FBQ0Q7O0FBRUQ7QUFDQSxhQUFPLEtBQVA7QUFDRDtBQUNELFFBQUksU0FBUyxRQUFRLENBQVIsRUFBVyxXQUFYLEVBQWI7O0FBRUEsUUFBSSxJQUFJLFFBQVEsbUJBQVosRUFBaUMsSUFBakMsQ0FBSixFQUE0QztBQUMxQyxhQUFPLFFBQVEsbUJBQVIsQ0FBNEIsSUFBNUIsRUFBa0MsT0FBbEMsQ0FBMEMsTUFBMUMsTUFBc0QsQ0FBQyxDQUE5RDtBQUNEOztBQUVELFdBQU8sQ0FBQyxRQUFRLGNBQVQsSUFBMkIsUUFBUSxjQUFSLENBQXVCLE9BQXZCLENBQStCLE1BQS9CLE1BQTJDLENBQUMsQ0FBOUU7QUFDRDs7QUFFRCxXQUFTLGFBQVQsQ0FBdUIsT0FBdkIsRUFBZ0MsT0FBaEMsRUFBeUM7QUFDdkMsUUFBSSxDQUFDLE9BQUwsRUFBYztBQUNaO0FBQ0EsYUFBTyxPQUFQO0FBQ0Q7QUFDRCxjQUFVLFFBQVEsS0FBUixDQUFjLEtBQWQsQ0FBVjtBQUNBLFdBQU8sUUFBUSxNQUFSLENBQWUsVUFBUyxJQUFULEVBQWU7QUFDbkMsYUFBTyxRQUFRLE9BQVIsQ0FBZ0IsSUFBaEIsTUFBMEIsQ0FBQyxDQUFsQztBQUNELEtBRk0sRUFFSixJQUZJLENBRUMsR0FGRCxDQUFQO0FBR0Q7QUFDRjs7QUFFRDtBQUNBOztBQUVBLElBQUkscUJBQXFCO0FBQ3ZCLGtCQUFnQjtBQURPLENBQXpCO0FBR0EsYUFBYSxRQUFiLEdBQXdCO0FBQ3RCLGVBQWEsQ0FBRSxJQUFGLEVBQVEsSUFBUixFQUFjLElBQWQsRUFBb0IsSUFBcEIsRUFBMEIsWUFBMUIsRUFBd0MsR0FBeEMsRUFBNkMsR0FBN0MsRUFBa0QsSUFBbEQsRUFBd0QsSUFBeEQsRUFDWCxJQURXLEVBQ0wsSUFESyxFQUNDLEdBREQsRUFDTSxHQUROLEVBQ1csUUFEWCxFQUNxQixJQURyQixFQUMyQixRQUQzQixFQUNxQyxNQURyQyxFQUM2QyxJQUQ3QyxFQUNtRCxJQURuRCxFQUN5RCxLQUR6RCxFQUVYLE9BRlcsRUFFRixPQUZFLEVBRU8sU0FGUCxFQUVrQixPQUZsQixFQUUyQixJQUYzQixFQUVpQyxJQUZqQyxFQUV1QyxJQUZ2QyxFQUU2QyxLQUY3QyxDQURTO0FBSXRCLHFCQUFtQjtBQUNqQixPQUFHLENBQUUsTUFBRixFQUFVLE1BQVYsRUFBa0IsUUFBbEIsQ0FEYztBQUVqQjtBQUNBO0FBQ0EsU0FBSyxDQUFFLEtBQUY7QUFKWSxHQUpHO0FBVXRCO0FBQ0EsZUFBYSxDQUFFLEtBQUYsRUFBUyxJQUFULEVBQWUsSUFBZixFQUFxQixNQUFyQixFQUE2QixNQUE3QixFQUFxQyxVQUFyQyxFQUFpRCxPQUFqRCxFQUEwRCxNQUExRCxFQUFrRSxNQUFsRSxDQVhTO0FBWXRCO0FBQ0Esa0JBQWdCLENBQUUsTUFBRixFQUFVLE9BQVYsRUFBbUIsS0FBbkIsRUFBMEIsUUFBMUIsQ0FiTTtBQWN0Qix1QkFBcUIsRUFkQztBQWV0Qix5QkFBdUI7QUFmRCxDQUF4Qjs7QUFrQkEsYUFBYSxlQUFiLEdBQStCLFVBQVMsVUFBVCxFQUFxQixVQUFyQixFQUFpQyxLQUFqQyxFQUF3QztBQUNyRSxVQUFTLFVBQVUsU0FBWCxHQUF3QixJQUF4QixHQUErQixLQUF2QztBQUNBLGVBQWEsY0FBYyxFQUEzQjs7QUFFQSxTQUFPLFVBQVMsT0FBVCxFQUFrQixPQUFsQixFQUEyQjtBQUNoQyxRQUFJLE1BQUo7QUFDQSxRQUFJLEtBQUosRUFBVztBQUNULFdBQUssTUFBTCxJQUFlLFVBQWYsRUFBMkI7QUFDekIsZ0JBQVEsTUFBUixJQUFrQixXQUFXLE1BQVgsQ0FBbEI7QUFDRDtBQUNGLEtBSkQsTUFJTztBQUNMLGdCQUFVLFVBQVY7QUFDRDs7QUFFRCxXQUFPO0FBQ0wsZUFBUyxVQURKO0FBRUwsZUFBUztBQUZKLEtBQVA7QUFJRCxHQWREO0FBZUQsQ0FuQkQ7Ozs7Ozs7Ozs7Ozs7QUMvVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9GQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaldBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMTRCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9IQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUMvUUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDbkVBLE9BQU8sT0FBUCxHQUFpQixNQUFqQjs7QUFFQSxJQUFJLGlCQUFpQixPQUFPLFNBQVAsQ0FBaUIsY0FBdEM7O0FBRUEsU0FBUyxNQUFULEdBQWtCO0FBQ2QsUUFBSSxTQUFTLEVBQWI7O0FBRUEsU0FBSyxJQUFJLElBQUksQ0FBYixFQUFnQixJQUFJLFVBQVUsTUFBOUIsRUFBc0MsR0FBdEMsRUFBMkM7QUFDdkMsWUFBSSxTQUFTLFVBQVUsQ0FBVixDQUFiOztBQUVBLGFBQUssSUFBSSxHQUFULElBQWdCLE1BQWhCLEVBQXdCO0FBQ3BCLGdCQUFJLGVBQWUsSUFBZixDQUFvQixNQUFwQixFQUE0QixHQUE1QixDQUFKLEVBQXNDO0FBQ2xDLHVCQUFPLEdBQVAsSUFBYyxPQUFPLEdBQVAsQ0FBZDtBQUNIO0FBQ0o7QUFDSjs7QUFFRCxXQUFPLE1BQVA7QUFDSCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIndXNlIHN0cmljdCdcblxuZXhwb3J0cy5ieXRlTGVuZ3RoID0gYnl0ZUxlbmd0aFxuZXhwb3J0cy50b0J5dGVBcnJheSA9IHRvQnl0ZUFycmF5XG5leHBvcnRzLmZyb21CeXRlQXJyYXkgPSBmcm9tQnl0ZUFycmF5XG5cbnZhciBsb29rdXAgPSBbXVxudmFyIHJldkxvb2t1cCA9IFtdXG52YXIgQXJyID0gdHlwZW9mIFVpbnQ4QXJyYXkgIT09ICd1bmRlZmluZWQnID8gVWludDhBcnJheSA6IEFycmF5XG5cbnZhciBjb2RlID0gJ0FCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5Ky8nXG5mb3IgKHZhciBpID0gMCwgbGVuID0gY29kZS5sZW5ndGg7IGkgPCBsZW47ICsraSkge1xuICBsb29rdXBbaV0gPSBjb2RlW2ldXG4gIHJldkxvb2t1cFtjb2RlLmNoYXJDb2RlQXQoaSldID0gaVxufVxuXG5yZXZMb29rdXBbJy0nLmNoYXJDb2RlQXQoMCldID0gNjJcbnJldkxvb2t1cFsnXycuY2hhckNvZGVBdCgwKV0gPSA2M1xuXG5mdW5jdGlvbiBwbGFjZUhvbGRlcnNDb3VudCAoYjY0KSB7XG4gIHZhciBsZW4gPSBiNjQubGVuZ3RoXG4gIGlmIChsZW4gJSA0ID4gMCkge1xuICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBzdHJpbmcuIExlbmd0aCBtdXN0IGJlIGEgbXVsdGlwbGUgb2YgNCcpXG4gIH1cblxuICAvLyB0aGUgbnVtYmVyIG9mIGVxdWFsIHNpZ25zIChwbGFjZSBob2xkZXJzKVxuICAvLyBpZiB0aGVyZSBhcmUgdHdvIHBsYWNlaG9sZGVycywgdGhhbiB0aGUgdHdvIGNoYXJhY3RlcnMgYmVmb3JlIGl0XG4gIC8vIHJlcHJlc2VudCBvbmUgYnl0ZVxuICAvLyBpZiB0aGVyZSBpcyBvbmx5IG9uZSwgdGhlbiB0aGUgdGhyZWUgY2hhcmFjdGVycyBiZWZvcmUgaXQgcmVwcmVzZW50IDIgYnl0ZXNcbiAgLy8gdGhpcyBpcyBqdXN0IGEgY2hlYXAgaGFjayB0byBub3QgZG8gaW5kZXhPZiB0d2ljZVxuICByZXR1cm4gYjY0W2xlbiAtIDJdID09PSAnPScgPyAyIDogYjY0W2xlbiAtIDFdID09PSAnPScgPyAxIDogMFxufVxuXG5mdW5jdGlvbiBieXRlTGVuZ3RoIChiNjQpIHtcbiAgLy8gYmFzZTY0IGlzIDQvMyArIHVwIHRvIHR3byBjaGFyYWN0ZXJzIG9mIHRoZSBvcmlnaW5hbCBkYXRhXG4gIHJldHVybiAoYjY0Lmxlbmd0aCAqIDMgLyA0KSAtIHBsYWNlSG9sZGVyc0NvdW50KGI2NClcbn1cblxuZnVuY3Rpb24gdG9CeXRlQXJyYXkgKGI2NCkge1xuICB2YXIgaSwgbCwgdG1wLCBwbGFjZUhvbGRlcnMsIGFyclxuICB2YXIgbGVuID0gYjY0Lmxlbmd0aFxuICBwbGFjZUhvbGRlcnMgPSBwbGFjZUhvbGRlcnNDb3VudChiNjQpXG5cbiAgYXJyID0gbmV3IEFycigobGVuICogMyAvIDQpIC0gcGxhY2VIb2xkZXJzKVxuXG4gIC8vIGlmIHRoZXJlIGFyZSBwbGFjZWhvbGRlcnMsIG9ubHkgZ2V0IHVwIHRvIHRoZSBsYXN0IGNvbXBsZXRlIDQgY2hhcnNcbiAgbCA9IHBsYWNlSG9sZGVycyA+IDAgPyBsZW4gLSA0IDogbGVuXG5cbiAgdmFyIEwgPSAwXG5cbiAgZm9yIChpID0gMDsgaSA8IGw7IGkgKz0gNCkge1xuICAgIHRtcCA9IChyZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSldIDw8IDE4KSB8IChyZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSArIDEpXSA8PCAxMikgfCAocmV2TG9va3VwW2I2NC5jaGFyQ29kZUF0KGkgKyAyKV0gPDwgNikgfCByZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSArIDMpXVxuICAgIGFycltMKytdID0gKHRtcCA+PiAxNikgJiAweEZGXG4gICAgYXJyW0wrK10gPSAodG1wID4+IDgpICYgMHhGRlxuICAgIGFycltMKytdID0gdG1wICYgMHhGRlxuICB9XG5cbiAgaWYgKHBsYWNlSG9sZGVycyA9PT0gMikge1xuICAgIHRtcCA9IChyZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSldIDw8IDIpIHwgKHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpICsgMSldID4+IDQpXG4gICAgYXJyW0wrK10gPSB0bXAgJiAweEZGXG4gIH0gZWxzZSBpZiAocGxhY2VIb2xkZXJzID09PSAxKSB7XG4gICAgdG1wID0gKHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpKV0gPDwgMTApIHwgKHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpICsgMSldIDw8IDQpIHwgKHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpICsgMildID4+IDIpXG4gICAgYXJyW0wrK10gPSAodG1wID4+IDgpICYgMHhGRlxuICAgIGFycltMKytdID0gdG1wICYgMHhGRlxuICB9XG5cbiAgcmV0dXJuIGFyclxufVxuXG5mdW5jdGlvbiB0cmlwbGV0VG9CYXNlNjQgKG51bSkge1xuICByZXR1cm4gbG9va3VwW251bSA+PiAxOCAmIDB4M0ZdICsgbG9va3VwW251bSA+PiAxMiAmIDB4M0ZdICsgbG9va3VwW251bSA+PiA2ICYgMHgzRl0gKyBsb29rdXBbbnVtICYgMHgzRl1cbn1cblxuZnVuY3Rpb24gZW5jb2RlQ2h1bmsgKHVpbnQ4LCBzdGFydCwgZW5kKSB7XG4gIHZhciB0bXBcbiAgdmFyIG91dHB1dCA9IFtdXG4gIGZvciAodmFyIGkgPSBzdGFydDsgaSA8IGVuZDsgaSArPSAzKSB7XG4gICAgdG1wID0gKHVpbnQ4W2ldIDw8IDE2KSArICh1aW50OFtpICsgMV0gPDwgOCkgKyAodWludDhbaSArIDJdKVxuICAgIG91dHB1dC5wdXNoKHRyaXBsZXRUb0Jhc2U2NCh0bXApKVxuICB9XG4gIHJldHVybiBvdXRwdXQuam9pbignJylcbn1cblxuZnVuY3Rpb24gZnJvbUJ5dGVBcnJheSAodWludDgpIHtcbiAgdmFyIHRtcFxuICB2YXIgbGVuID0gdWludDgubGVuZ3RoXG4gIHZhciBleHRyYUJ5dGVzID0gbGVuICUgMyAvLyBpZiB3ZSBoYXZlIDEgYnl0ZSBsZWZ0LCBwYWQgMiBieXRlc1xuICB2YXIgb3V0cHV0ID0gJydcbiAgdmFyIHBhcnRzID0gW11cbiAgdmFyIG1heENodW5rTGVuZ3RoID0gMTYzODMgLy8gbXVzdCBiZSBtdWx0aXBsZSBvZiAzXG5cbiAgLy8gZ28gdGhyb3VnaCB0aGUgYXJyYXkgZXZlcnkgdGhyZWUgYnl0ZXMsIHdlJ2xsIGRlYWwgd2l0aCB0cmFpbGluZyBzdHVmZiBsYXRlclxuICBmb3IgKHZhciBpID0gMCwgbGVuMiA9IGxlbiAtIGV4dHJhQnl0ZXM7IGkgPCBsZW4yOyBpICs9IG1heENodW5rTGVuZ3RoKSB7XG4gICAgcGFydHMucHVzaChlbmNvZGVDaHVuayh1aW50OCwgaSwgKGkgKyBtYXhDaHVua0xlbmd0aCkgPiBsZW4yID8gbGVuMiA6IChpICsgbWF4Q2h1bmtMZW5ndGgpKSlcbiAgfVxuXG4gIC8vIHBhZCB0aGUgZW5kIHdpdGggemVyb3MsIGJ1dCBtYWtlIHN1cmUgdG8gbm90IGZvcmdldCB0aGUgZXh0cmEgYnl0ZXNcbiAgaWYgKGV4dHJhQnl0ZXMgPT09IDEpIHtcbiAgICB0bXAgPSB1aW50OFtsZW4gLSAxXVxuICAgIG91dHB1dCArPSBsb29rdXBbdG1wID4+IDJdXG4gICAgb3V0cHV0ICs9IGxvb2t1cFsodG1wIDw8IDQpICYgMHgzRl1cbiAgICBvdXRwdXQgKz0gJz09J1xuICB9IGVsc2UgaWYgKGV4dHJhQnl0ZXMgPT09IDIpIHtcbiAgICB0bXAgPSAodWludDhbbGVuIC0gMl0gPDwgOCkgKyAodWludDhbbGVuIC0gMV0pXG4gICAgb3V0cHV0ICs9IGxvb2t1cFt0bXAgPj4gMTBdXG4gICAgb3V0cHV0ICs9IGxvb2t1cFsodG1wID4+IDQpICYgMHgzRl1cbiAgICBvdXRwdXQgKz0gbG9va3VwWyh0bXAgPDwgMikgJiAweDNGXVxuICAgIG91dHB1dCArPSAnPSdcbiAgfVxuXG4gIHBhcnRzLnB1c2gob3V0cHV0KVxuXG4gIHJldHVybiBwYXJ0cy5qb2luKCcnKVxufVxuIiwiIiwiLy8gQ29weXJpZ2h0IEpveWVudCwgSW5jLiBhbmQgb3RoZXIgTm9kZSBjb250cmlidXRvcnMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGFcbi8vIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGVcbi8vIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZ1xuLy8gd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLFxuLy8gZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdFxuLy8gcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlXG4vLyBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZFxuLy8gaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTU1xuLy8gT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRlxuLy8gTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTlxuLy8gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sXG4vLyBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1Jcbi8vIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEVcbi8vIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG5cbnZhciBCdWZmZXIgPSByZXF1aXJlKCdidWZmZXInKS5CdWZmZXI7XG5cbnZhciBpc0J1ZmZlckVuY29kaW5nID0gQnVmZmVyLmlzRW5jb2RpbmdcbiAgfHwgZnVuY3Rpb24oZW5jb2RpbmcpIHtcbiAgICAgICBzd2l0Y2ggKGVuY29kaW5nICYmIGVuY29kaW5nLnRvTG93ZXJDYXNlKCkpIHtcbiAgICAgICAgIGNhc2UgJ2hleCc6IGNhc2UgJ3V0ZjgnOiBjYXNlICd1dGYtOCc6IGNhc2UgJ2FzY2lpJzogY2FzZSAnYmluYXJ5JzogY2FzZSAnYmFzZTY0JzogY2FzZSAndWNzMic6IGNhc2UgJ3Vjcy0yJzogY2FzZSAndXRmMTZsZSc6IGNhc2UgJ3V0Zi0xNmxlJzogY2FzZSAncmF3JzogcmV0dXJuIHRydWU7XG4gICAgICAgICBkZWZhdWx0OiByZXR1cm4gZmFsc2U7XG4gICAgICAgfVxuICAgICB9XG5cblxuZnVuY3Rpb24gYXNzZXJ0RW5jb2RpbmcoZW5jb2RpbmcpIHtcbiAgaWYgKGVuY29kaW5nICYmICFpc0J1ZmZlckVuY29kaW5nKGVuY29kaW5nKSkge1xuICAgIHRocm93IG5ldyBFcnJvcignVW5rbm93biBlbmNvZGluZzogJyArIGVuY29kaW5nKTtcbiAgfVxufVxuXG4vLyBTdHJpbmdEZWNvZGVyIHByb3ZpZGVzIGFuIGludGVyZmFjZSBmb3IgZWZmaWNpZW50bHkgc3BsaXR0aW5nIGEgc2VyaWVzIG9mXG4vLyBidWZmZXJzIGludG8gYSBzZXJpZXMgb2YgSlMgc3RyaW5ncyB3aXRob3V0IGJyZWFraW5nIGFwYXJ0IG11bHRpLWJ5dGVcbi8vIGNoYXJhY3RlcnMuIENFU1UtOCBpcyBoYW5kbGVkIGFzIHBhcnQgb2YgdGhlIFVURi04IGVuY29kaW5nLlxuLy9cbi8vIEBUT0RPIEhhbmRsaW5nIGFsbCBlbmNvZGluZ3MgaW5zaWRlIGEgc2luZ2xlIG9iamVjdCBtYWtlcyBpdCB2ZXJ5IGRpZmZpY3VsdFxuLy8gdG8gcmVhc29uIGFib3V0IHRoaXMgY29kZSwgc28gaXQgc2hvdWxkIGJlIHNwbGl0IHVwIGluIHRoZSBmdXR1cmUuXG4vLyBAVE9ETyBUaGVyZSBzaG91bGQgYmUgYSB1dGY4LXN0cmljdCBlbmNvZGluZyB0aGF0IHJlamVjdHMgaW52YWxpZCBVVEYtOCBjb2RlXG4vLyBwb2ludHMgYXMgdXNlZCBieSBDRVNVLTguXG52YXIgU3RyaW5nRGVjb2RlciA9IGV4cG9ydHMuU3RyaW5nRGVjb2RlciA9IGZ1bmN0aW9uKGVuY29kaW5nKSB7XG4gIHRoaXMuZW5jb2RpbmcgPSAoZW5jb2RpbmcgfHwgJ3V0ZjgnKS50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoL1stX10vLCAnJyk7XG4gIGFzc2VydEVuY29kaW5nKGVuY29kaW5nKTtcbiAgc3dpdGNoICh0aGlzLmVuY29kaW5nKSB7XG4gICAgY2FzZSAndXRmOCc6XG4gICAgICAvLyBDRVNVLTggcmVwcmVzZW50cyBlYWNoIG9mIFN1cnJvZ2F0ZSBQYWlyIGJ5IDMtYnl0ZXNcbiAgICAgIHRoaXMuc3Vycm9nYXRlU2l6ZSA9IDM7XG4gICAgICBicmVhaztcbiAgICBjYXNlICd1Y3MyJzpcbiAgICBjYXNlICd1dGYxNmxlJzpcbiAgICAgIC8vIFVURi0xNiByZXByZXNlbnRzIGVhY2ggb2YgU3Vycm9nYXRlIFBhaXIgYnkgMi1ieXRlc1xuICAgICAgdGhpcy5zdXJyb2dhdGVTaXplID0gMjtcbiAgICAgIHRoaXMuZGV0ZWN0SW5jb21wbGV0ZUNoYXIgPSB1dGYxNkRldGVjdEluY29tcGxldGVDaGFyO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnYmFzZTY0JzpcbiAgICAgIC8vIEJhc2UtNjQgc3RvcmVzIDMgYnl0ZXMgaW4gNCBjaGFycywgYW5kIHBhZHMgdGhlIHJlbWFpbmRlci5cbiAgICAgIHRoaXMuc3Vycm9nYXRlU2l6ZSA9IDM7XG4gICAgICB0aGlzLmRldGVjdEluY29tcGxldGVDaGFyID0gYmFzZTY0RGV0ZWN0SW5jb21wbGV0ZUNoYXI7XG4gICAgICBicmVhaztcbiAgICBkZWZhdWx0OlxuICAgICAgdGhpcy53cml0ZSA9IHBhc3NUaHJvdWdoV3JpdGU7XG4gICAgICByZXR1cm47XG4gIH1cblxuICAvLyBFbm91Z2ggc3BhY2UgdG8gc3RvcmUgYWxsIGJ5dGVzIG9mIGEgc2luZ2xlIGNoYXJhY3Rlci4gVVRGLTggbmVlZHMgNFxuICAvLyBieXRlcywgYnV0IENFU1UtOCBtYXkgcmVxdWlyZSB1cCB0byA2ICgzIGJ5dGVzIHBlciBzdXJyb2dhdGUpLlxuICB0aGlzLmNoYXJCdWZmZXIgPSBuZXcgQnVmZmVyKDYpO1xuICAvLyBOdW1iZXIgb2YgYnl0ZXMgcmVjZWl2ZWQgZm9yIHRoZSBjdXJyZW50IGluY29tcGxldGUgbXVsdGktYnl0ZSBjaGFyYWN0ZXIuXG4gIHRoaXMuY2hhclJlY2VpdmVkID0gMDtcbiAgLy8gTnVtYmVyIG9mIGJ5dGVzIGV4cGVjdGVkIGZvciB0aGUgY3VycmVudCBpbmNvbXBsZXRlIG11bHRpLWJ5dGUgY2hhcmFjdGVyLlxuICB0aGlzLmNoYXJMZW5ndGggPSAwO1xufTtcblxuXG4vLyB3cml0ZSBkZWNvZGVzIHRoZSBnaXZlbiBidWZmZXIgYW5kIHJldHVybnMgaXQgYXMgSlMgc3RyaW5nIHRoYXQgaXNcbi8vIGd1YXJhbnRlZWQgdG8gbm90IGNvbnRhaW4gYW55IHBhcnRpYWwgbXVsdGktYnl0ZSBjaGFyYWN0ZXJzLiBBbnkgcGFydGlhbFxuLy8gY2hhcmFjdGVyIGZvdW5kIGF0IHRoZSBlbmQgb2YgdGhlIGJ1ZmZlciBpcyBidWZmZXJlZCB1cCwgYW5kIHdpbGwgYmVcbi8vIHJldHVybmVkIHdoZW4gY2FsbGluZyB3cml0ZSBhZ2FpbiB3aXRoIHRoZSByZW1haW5pbmcgYnl0ZXMuXG4vL1xuLy8gTm90ZTogQ29udmVydGluZyBhIEJ1ZmZlciBjb250YWluaW5nIGFuIG9ycGhhbiBzdXJyb2dhdGUgdG8gYSBTdHJpbmdcbi8vIGN1cnJlbnRseSB3b3JrcywgYnV0IGNvbnZlcnRpbmcgYSBTdHJpbmcgdG8gYSBCdWZmZXIgKHZpYSBgbmV3IEJ1ZmZlcmAsIG9yXG4vLyBCdWZmZXIjd3JpdGUpIHdpbGwgcmVwbGFjZSBpbmNvbXBsZXRlIHN1cnJvZ2F0ZXMgd2l0aCB0aGUgdW5pY29kZVxuLy8gcmVwbGFjZW1lbnQgY2hhcmFjdGVyLiBTZWUgaHR0cHM6Ly9jb2RlcmV2aWV3LmNocm9taXVtLm9yZy8xMjExNzMwMDkvIC5cblN0cmluZ0RlY29kZXIucHJvdG90eXBlLndyaXRlID0gZnVuY3Rpb24oYnVmZmVyKSB7XG4gIHZhciBjaGFyU3RyID0gJyc7XG4gIC8vIGlmIG91ciBsYXN0IHdyaXRlIGVuZGVkIHdpdGggYW4gaW5jb21wbGV0ZSBtdWx0aWJ5dGUgY2hhcmFjdGVyXG4gIHdoaWxlICh0aGlzLmNoYXJMZW5ndGgpIHtcbiAgICAvLyBkZXRlcm1pbmUgaG93IG1hbnkgcmVtYWluaW5nIGJ5dGVzIHRoaXMgYnVmZmVyIGhhcyB0byBvZmZlciBmb3IgdGhpcyBjaGFyXG4gICAgdmFyIGF2YWlsYWJsZSA9IChidWZmZXIubGVuZ3RoID49IHRoaXMuY2hhckxlbmd0aCAtIHRoaXMuY2hhclJlY2VpdmVkKSA/XG4gICAgICAgIHRoaXMuY2hhckxlbmd0aCAtIHRoaXMuY2hhclJlY2VpdmVkIDpcbiAgICAgICAgYnVmZmVyLmxlbmd0aDtcblxuICAgIC8vIGFkZCB0aGUgbmV3IGJ5dGVzIHRvIHRoZSBjaGFyIGJ1ZmZlclxuICAgIGJ1ZmZlci5jb3B5KHRoaXMuY2hhckJ1ZmZlciwgdGhpcy5jaGFyUmVjZWl2ZWQsIDAsIGF2YWlsYWJsZSk7XG4gICAgdGhpcy5jaGFyUmVjZWl2ZWQgKz0gYXZhaWxhYmxlO1xuXG4gICAgaWYgKHRoaXMuY2hhclJlY2VpdmVkIDwgdGhpcy5jaGFyTGVuZ3RoKSB7XG4gICAgICAvLyBzdGlsbCBub3QgZW5vdWdoIGNoYXJzIGluIHRoaXMgYnVmZmVyPyB3YWl0IGZvciBtb3JlIC4uLlxuICAgICAgcmV0dXJuICcnO1xuICAgIH1cblxuICAgIC8vIHJlbW92ZSBieXRlcyBiZWxvbmdpbmcgdG8gdGhlIGN1cnJlbnQgY2hhcmFjdGVyIGZyb20gdGhlIGJ1ZmZlclxuICAgIGJ1ZmZlciA9IGJ1ZmZlci5zbGljZShhdmFpbGFibGUsIGJ1ZmZlci5sZW5ndGgpO1xuXG4gICAgLy8gZ2V0IHRoZSBjaGFyYWN0ZXIgdGhhdCB3YXMgc3BsaXRcbiAgICBjaGFyU3RyID0gdGhpcy5jaGFyQnVmZmVyLnNsaWNlKDAsIHRoaXMuY2hhckxlbmd0aCkudG9TdHJpbmcodGhpcy5lbmNvZGluZyk7XG5cbiAgICAvLyBDRVNVLTg6IGxlYWQgc3Vycm9nYXRlIChEODAwLURCRkYpIGlzIGFsc28gdGhlIGluY29tcGxldGUgY2hhcmFjdGVyXG4gICAgdmFyIGNoYXJDb2RlID0gY2hhclN0ci5jaGFyQ29kZUF0KGNoYXJTdHIubGVuZ3RoIC0gMSk7XG4gICAgaWYgKGNoYXJDb2RlID49IDB4RDgwMCAmJiBjaGFyQ29kZSA8PSAweERCRkYpIHtcbiAgICAgIHRoaXMuY2hhckxlbmd0aCArPSB0aGlzLnN1cnJvZ2F0ZVNpemU7XG4gICAgICBjaGFyU3RyID0gJyc7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG4gICAgdGhpcy5jaGFyUmVjZWl2ZWQgPSB0aGlzLmNoYXJMZW5ndGggPSAwO1xuXG4gICAgLy8gaWYgdGhlcmUgYXJlIG5vIG1vcmUgYnl0ZXMgaW4gdGhpcyBidWZmZXIsIGp1c3QgZW1pdCBvdXIgY2hhclxuICAgIGlmIChidWZmZXIubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gY2hhclN0cjtcbiAgICB9XG4gICAgYnJlYWs7XG4gIH1cblxuICAvLyBkZXRlcm1pbmUgYW5kIHNldCBjaGFyTGVuZ3RoIC8gY2hhclJlY2VpdmVkXG4gIHRoaXMuZGV0ZWN0SW5jb21wbGV0ZUNoYXIoYnVmZmVyKTtcblxuICB2YXIgZW5kID0gYnVmZmVyLmxlbmd0aDtcbiAgaWYgKHRoaXMuY2hhckxlbmd0aCkge1xuICAgIC8vIGJ1ZmZlciB0aGUgaW5jb21wbGV0ZSBjaGFyYWN0ZXIgYnl0ZXMgd2UgZ290XG4gICAgYnVmZmVyLmNvcHkodGhpcy5jaGFyQnVmZmVyLCAwLCBidWZmZXIubGVuZ3RoIC0gdGhpcy5jaGFyUmVjZWl2ZWQsIGVuZCk7XG4gICAgZW5kIC09IHRoaXMuY2hhclJlY2VpdmVkO1xuICB9XG5cbiAgY2hhclN0ciArPSBidWZmZXIudG9TdHJpbmcodGhpcy5lbmNvZGluZywgMCwgZW5kKTtcblxuICB2YXIgZW5kID0gY2hhclN0ci5sZW5ndGggLSAxO1xuICB2YXIgY2hhckNvZGUgPSBjaGFyU3RyLmNoYXJDb2RlQXQoZW5kKTtcbiAgLy8gQ0VTVS04OiBsZWFkIHN1cnJvZ2F0ZSAoRDgwMC1EQkZGKSBpcyBhbHNvIHRoZSBpbmNvbXBsZXRlIGNoYXJhY3RlclxuICBpZiAoY2hhckNvZGUgPj0gMHhEODAwICYmIGNoYXJDb2RlIDw9IDB4REJGRikge1xuICAgIHZhciBzaXplID0gdGhpcy5zdXJyb2dhdGVTaXplO1xuICAgIHRoaXMuY2hhckxlbmd0aCArPSBzaXplO1xuICAgIHRoaXMuY2hhclJlY2VpdmVkICs9IHNpemU7XG4gICAgdGhpcy5jaGFyQnVmZmVyLmNvcHkodGhpcy5jaGFyQnVmZmVyLCBzaXplLCAwLCBzaXplKTtcbiAgICBidWZmZXIuY29weSh0aGlzLmNoYXJCdWZmZXIsIDAsIDAsIHNpemUpO1xuICAgIHJldHVybiBjaGFyU3RyLnN1YnN0cmluZygwLCBlbmQpO1xuICB9XG5cbiAgLy8gb3IganVzdCBlbWl0IHRoZSBjaGFyU3RyXG4gIHJldHVybiBjaGFyU3RyO1xufTtcblxuLy8gZGV0ZWN0SW5jb21wbGV0ZUNoYXIgZGV0ZXJtaW5lcyBpZiB0aGVyZSBpcyBhbiBpbmNvbXBsZXRlIFVURi04IGNoYXJhY3RlciBhdFxuLy8gdGhlIGVuZCBvZiB0aGUgZ2l2ZW4gYnVmZmVyLiBJZiBzbywgaXQgc2V0cyB0aGlzLmNoYXJMZW5ndGggdG8gdGhlIGJ5dGVcbi8vIGxlbmd0aCB0aGF0IGNoYXJhY3RlciwgYW5kIHNldHMgdGhpcy5jaGFyUmVjZWl2ZWQgdG8gdGhlIG51bWJlciBvZiBieXRlc1xuLy8gdGhhdCBhcmUgYXZhaWxhYmxlIGZvciB0aGlzIGNoYXJhY3Rlci5cblN0cmluZ0RlY29kZXIucHJvdG90eXBlLmRldGVjdEluY29tcGxldGVDaGFyID0gZnVuY3Rpb24oYnVmZmVyKSB7XG4gIC8vIGRldGVybWluZSBob3cgbWFueSBieXRlcyB3ZSBoYXZlIHRvIGNoZWNrIGF0IHRoZSBlbmQgb2YgdGhpcyBidWZmZXJcbiAgdmFyIGkgPSAoYnVmZmVyLmxlbmd0aCA+PSAzKSA/IDMgOiBidWZmZXIubGVuZ3RoO1xuXG4gIC8vIEZpZ3VyZSBvdXQgaWYgb25lIG9mIHRoZSBsYXN0IGkgYnl0ZXMgb2Ygb3VyIGJ1ZmZlciBhbm5vdW5jZXMgYW5cbiAgLy8gaW5jb21wbGV0ZSBjaGFyLlxuICBmb3IgKDsgaSA+IDA7IGktLSkge1xuICAgIHZhciBjID0gYnVmZmVyW2J1ZmZlci5sZW5ndGggLSBpXTtcblxuICAgIC8vIFNlZSBodHRwOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL1VURi04I0Rlc2NyaXB0aW9uXG5cbiAgICAvLyAxMTBYWFhYWFxuICAgIGlmIChpID09IDEgJiYgYyA+PiA1ID09IDB4MDYpIHtcbiAgICAgIHRoaXMuY2hhckxlbmd0aCA9IDI7XG4gICAgICBicmVhaztcbiAgICB9XG5cbiAgICAvLyAxMTEwWFhYWFxuICAgIGlmIChpIDw9IDIgJiYgYyA+PiA0ID09IDB4MEUpIHtcbiAgICAgIHRoaXMuY2hhckxlbmd0aCA9IDM7XG4gICAgICBicmVhaztcbiAgICB9XG5cbiAgICAvLyAxMTExMFhYWFxuICAgIGlmIChpIDw9IDMgJiYgYyA+PiAzID09IDB4MUUpIHtcbiAgICAgIHRoaXMuY2hhckxlbmd0aCA9IDQ7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgdGhpcy5jaGFyUmVjZWl2ZWQgPSBpO1xufTtcblxuU3RyaW5nRGVjb2Rlci5wcm90b3R5cGUuZW5kID0gZnVuY3Rpb24oYnVmZmVyKSB7XG4gIHZhciByZXMgPSAnJztcbiAgaWYgKGJ1ZmZlciAmJiBidWZmZXIubGVuZ3RoKVxuICAgIHJlcyA9IHRoaXMud3JpdGUoYnVmZmVyKTtcblxuICBpZiAodGhpcy5jaGFyUmVjZWl2ZWQpIHtcbiAgICB2YXIgY3IgPSB0aGlzLmNoYXJSZWNlaXZlZDtcbiAgICB2YXIgYnVmID0gdGhpcy5jaGFyQnVmZmVyO1xuICAgIHZhciBlbmMgPSB0aGlzLmVuY29kaW5nO1xuICAgIHJlcyArPSBidWYuc2xpY2UoMCwgY3IpLnRvU3RyaW5nKGVuYyk7XG4gIH1cblxuICByZXR1cm4gcmVzO1xufTtcblxuZnVuY3Rpb24gcGFzc1Rocm91Z2hXcml0ZShidWZmZXIpIHtcbiAgcmV0dXJuIGJ1ZmZlci50b1N0cmluZyh0aGlzLmVuY29kaW5nKTtcbn1cblxuZnVuY3Rpb24gdXRmMTZEZXRlY3RJbmNvbXBsZXRlQ2hhcihidWZmZXIpIHtcbiAgdGhpcy5jaGFyUmVjZWl2ZWQgPSBidWZmZXIubGVuZ3RoICUgMjtcbiAgdGhpcy5jaGFyTGVuZ3RoID0gdGhpcy5jaGFyUmVjZWl2ZWQgPyAyIDogMDtcbn1cblxuZnVuY3Rpb24gYmFzZTY0RGV0ZWN0SW5jb21wbGV0ZUNoYXIoYnVmZmVyKSB7XG4gIHRoaXMuY2hhclJlY2VpdmVkID0gYnVmZmVyLmxlbmd0aCAlIDM7XG4gIHRoaXMuY2hhckxlbmd0aCA9IHRoaXMuY2hhclJlY2VpdmVkID8gMyA6IDA7XG59XG4iLCIvKiFcbiAqIFRoZSBidWZmZXIgbW9kdWxlIGZyb20gbm9kZS5qcywgZm9yIHRoZSBicm93c2VyLlxuICpcbiAqIEBhdXRob3IgICBGZXJvc3MgQWJvdWtoYWRpamVoIDxmZXJvc3NAZmVyb3NzLm9yZz4gPGh0dHA6Ly9mZXJvc3Mub3JnPlxuICogQGxpY2Vuc2UgIE1JVFxuICovXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1wcm90byAqL1xuXG4ndXNlIHN0cmljdCdcblxudmFyIGJhc2U2NCA9IHJlcXVpcmUoJ2Jhc2U2NC1qcycpXG52YXIgaWVlZTc1NCA9IHJlcXVpcmUoJ2llZWU3NTQnKVxudmFyIGlzQXJyYXkgPSByZXF1aXJlKCdpc2FycmF5JylcblxuZXhwb3J0cy5CdWZmZXIgPSBCdWZmZXJcbmV4cG9ydHMuU2xvd0J1ZmZlciA9IFNsb3dCdWZmZXJcbmV4cG9ydHMuSU5TUEVDVF9NQVhfQllURVMgPSA1MFxuXG4vKipcbiAqIElmIGBCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVGA6XG4gKiAgID09PSB0cnVlICAgIFVzZSBVaW50OEFycmF5IGltcGxlbWVudGF0aW9uIChmYXN0ZXN0KVxuICogICA9PT0gZmFsc2UgICBVc2UgT2JqZWN0IGltcGxlbWVudGF0aW9uIChtb3N0IGNvbXBhdGlibGUsIGV2ZW4gSUU2KVxuICpcbiAqIEJyb3dzZXJzIHRoYXQgc3VwcG9ydCB0eXBlZCBhcnJheXMgYXJlIElFIDEwKywgRmlyZWZveCA0KywgQ2hyb21lIDcrLCBTYWZhcmkgNS4xKyxcbiAqIE9wZXJhIDExLjYrLCBpT1MgNC4yKy5cbiAqXG4gKiBEdWUgdG8gdmFyaW91cyBicm93c2VyIGJ1Z3MsIHNvbWV0aW1lcyB0aGUgT2JqZWN0IGltcGxlbWVudGF0aW9uIHdpbGwgYmUgdXNlZCBldmVuXG4gKiB3aGVuIHRoZSBicm93c2VyIHN1cHBvcnRzIHR5cGVkIGFycmF5cy5cbiAqXG4gKiBOb3RlOlxuICpcbiAqICAgLSBGaXJlZm94IDQtMjkgbGFja3Mgc3VwcG9ydCBmb3IgYWRkaW5nIG5ldyBwcm9wZXJ0aWVzIHRvIGBVaW50OEFycmF5YCBpbnN0YW5jZXMsXG4gKiAgICAgU2VlOiBodHRwczovL2J1Z3ppbGxhLm1vemlsbGEub3JnL3Nob3dfYnVnLmNnaT9pZD02OTU0MzguXG4gKlxuICogICAtIENocm9tZSA5LTEwIGlzIG1pc3NpbmcgdGhlIGBUeXBlZEFycmF5LnByb3RvdHlwZS5zdWJhcnJheWAgZnVuY3Rpb24uXG4gKlxuICogICAtIElFMTAgaGFzIGEgYnJva2VuIGBUeXBlZEFycmF5LnByb3RvdHlwZS5zdWJhcnJheWAgZnVuY3Rpb24gd2hpY2ggcmV0dXJucyBhcnJheXMgb2ZcbiAqICAgICBpbmNvcnJlY3QgbGVuZ3RoIGluIHNvbWUgc2l0dWF0aW9ucy5cblxuICogV2UgZGV0ZWN0IHRoZXNlIGJ1Z2d5IGJyb3dzZXJzIGFuZCBzZXQgYEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUYCB0byBgZmFsc2VgIHNvIHRoZXlcbiAqIGdldCB0aGUgT2JqZWN0IGltcGxlbWVudGF0aW9uLCB3aGljaCBpcyBzbG93ZXIgYnV0IGJlaGF2ZXMgY29ycmVjdGx5LlxuICovXG5CdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCA9IGdsb2JhbC5UWVBFRF9BUlJBWV9TVVBQT1JUICE9PSB1bmRlZmluZWRcbiAgPyBnbG9iYWwuVFlQRURfQVJSQVlfU1VQUE9SVFxuICA6IHR5cGVkQXJyYXlTdXBwb3J0KClcblxuLypcbiAqIEV4cG9ydCBrTWF4TGVuZ3RoIGFmdGVyIHR5cGVkIGFycmF5IHN1cHBvcnQgaXMgZGV0ZXJtaW5lZC5cbiAqL1xuZXhwb3J0cy5rTWF4TGVuZ3RoID0ga01heExlbmd0aCgpXG5cbmZ1bmN0aW9uIHR5cGVkQXJyYXlTdXBwb3J0ICgpIHtcbiAgdHJ5IHtcbiAgICB2YXIgYXJyID0gbmV3IFVpbnQ4QXJyYXkoMSlcbiAgICBhcnIuX19wcm90b19fID0ge19fcHJvdG9fXzogVWludDhBcnJheS5wcm90b3R5cGUsIGZvbzogZnVuY3Rpb24gKCkgeyByZXR1cm4gNDIgfX1cbiAgICByZXR1cm4gYXJyLmZvbygpID09PSA0MiAmJiAvLyB0eXBlZCBhcnJheSBpbnN0YW5jZXMgY2FuIGJlIGF1Z21lbnRlZFxuICAgICAgICB0eXBlb2YgYXJyLnN1YmFycmF5ID09PSAnZnVuY3Rpb24nICYmIC8vIGNocm9tZSA5LTEwIGxhY2sgYHN1YmFycmF5YFxuICAgICAgICBhcnIuc3ViYXJyYXkoMSwgMSkuYnl0ZUxlbmd0aCA9PT0gMCAvLyBpZTEwIGhhcyBicm9rZW4gYHN1YmFycmF5YFxuICB9IGNhdGNoIChlKSB7XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cbn1cblxuZnVuY3Rpb24ga01heExlbmd0aCAoKSB7XG4gIHJldHVybiBCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVFxuICAgID8gMHg3ZmZmZmZmZlxuICAgIDogMHgzZmZmZmZmZlxufVxuXG5mdW5jdGlvbiBjcmVhdGVCdWZmZXIgKHRoYXQsIGxlbmd0aCkge1xuICBpZiAoa01heExlbmd0aCgpIDwgbGVuZ3RoKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0ludmFsaWQgdHlwZWQgYXJyYXkgbGVuZ3RoJylcbiAgfVxuICBpZiAoQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHtcbiAgICAvLyBSZXR1cm4gYW4gYXVnbWVudGVkIGBVaW50OEFycmF5YCBpbnN0YW5jZSwgZm9yIGJlc3QgcGVyZm9ybWFuY2VcbiAgICB0aGF0ID0gbmV3IFVpbnQ4QXJyYXkobGVuZ3RoKVxuICAgIHRoYXQuX19wcm90b19fID0gQnVmZmVyLnByb3RvdHlwZVxuICB9IGVsc2Uge1xuICAgIC8vIEZhbGxiYWNrOiBSZXR1cm4gYW4gb2JqZWN0IGluc3RhbmNlIG9mIHRoZSBCdWZmZXIgY2xhc3NcbiAgICBpZiAodGhhdCA9PT0gbnVsbCkge1xuICAgICAgdGhhdCA9IG5ldyBCdWZmZXIobGVuZ3RoKVxuICAgIH1cbiAgICB0aGF0Lmxlbmd0aCA9IGxlbmd0aFxuICB9XG5cbiAgcmV0dXJuIHRoYXRcbn1cblxuLyoqXG4gKiBUaGUgQnVmZmVyIGNvbnN0cnVjdG9yIHJldHVybnMgaW5zdGFuY2VzIG9mIGBVaW50OEFycmF5YCB0aGF0IGhhdmUgdGhlaXJcbiAqIHByb3RvdHlwZSBjaGFuZ2VkIHRvIGBCdWZmZXIucHJvdG90eXBlYC4gRnVydGhlcm1vcmUsIGBCdWZmZXJgIGlzIGEgc3ViY2xhc3Mgb2ZcbiAqIGBVaW50OEFycmF5YCwgc28gdGhlIHJldHVybmVkIGluc3RhbmNlcyB3aWxsIGhhdmUgYWxsIHRoZSBub2RlIGBCdWZmZXJgIG1ldGhvZHNcbiAqIGFuZCB0aGUgYFVpbnQ4QXJyYXlgIG1ldGhvZHMuIFNxdWFyZSBicmFja2V0IG5vdGF0aW9uIHdvcmtzIGFzIGV4cGVjdGVkIC0tIGl0XG4gKiByZXR1cm5zIGEgc2luZ2xlIG9jdGV0LlxuICpcbiAqIFRoZSBgVWludDhBcnJheWAgcHJvdG90eXBlIHJlbWFpbnMgdW5tb2RpZmllZC5cbiAqL1xuXG5mdW5jdGlvbiBCdWZmZXIgKGFyZywgZW5jb2RpbmdPck9mZnNldCwgbGVuZ3RoKSB7XG4gIGlmICghQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQgJiYgISh0aGlzIGluc3RhbmNlb2YgQnVmZmVyKSkge1xuICAgIHJldHVybiBuZXcgQnVmZmVyKGFyZywgZW5jb2RpbmdPck9mZnNldCwgbGVuZ3RoKVxuICB9XG5cbiAgLy8gQ29tbW9uIGNhc2UuXG4gIGlmICh0eXBlb2YgYXJnID09PSAnbnVtYmVyJykge1xuICAgIGlmICh0eXBlb2YgZW5jb2RpbmdPck9mZnNldCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgJ0lmIGVuY29kaW5nIGlzIHNwZWNpZmllZCB0aGVuIHRoZSBmaXJzdCBhcmd1bWVudCBtdXN0IGJlIGEgc3RyaW5nJ1xuICAgICAgKVxuICAgIH1cbiAgICByZXR1cm4gYWxsb2NVbnNhZmUodGhpcywgYXJnKVxuICB9XG4gIHJldHVybiBmcm9tKHRoaXMsIGFyZywgZW5jb2RpbmdPck9mZnNldCwgbGVuZ3RoKVxufVxuXG5CdWZmZXIucG9vbFNpemUgPSA4MTkyIC8vIG5vdCB1c2VkIGJ5IHRoaXMgaW1wbGVtZW50YXRpb25cblxuLy8gVE9ETzogTGVnYWN5LCBub3QgbmVlZGVkIGFueW1vcmUuIFJlbW92ZSBpbiBuZXh0IG1ham9yIHZlcnNpb24uXG5CdWZmZXIuX2F1Z21lbnQgPSBmdW5jdGlvbiAoYXJyKSB7XG4gIGFyci5fX3Byb3RvX18gPSBCdWZmZXIucHJvdG90eXBlXG4gIHJldHVybiBhcnJcbn1cblxuZnVuY3Rpb24gZnJvbSAodGhhdCwgdmFsdWUsIGVuY29kaW5nT3JPZmZzZXQsIGxlbmd0aCkge1xuICBpZiAodHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1widmFsdWVcIiBhcmd1bWVudCBtdXN0IG5vdCBiZSBhIG51bWJlcicpXG4gIH1cblxuICBpZiAodHlwZW9mIEFycmF5QnVmZmVyICE9PSAndW5kZWZpbmVkJyAmJiB2YWx1ZSBpbnN0YW5jZW9mIEFycmF5QnVmZmVyKSB7XG4gICAgcmV0dXJuIGZyb21BcnJheUJ1ZmZlcih0aGF0LCB2YWx1ZSwgZW5jb2RpbmdPck9mZnNldCwgbGVuZ3RoKVxuICB9XG5cbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gZnJvbVN0cmluZyh0aGF0LCB2YWx1ZSwgZW5jb2RpbmdPck9mZnNldClcbiAgfVxuXG4gIHJldHVybiBmcm9tT2JqZWN0KHRoYXQsIHZhbHVlKVxufVxuXG4vKipcbiAqIEZ1bmN0aW9uYWxseSBlcXVpdmFsZW50IHRvIEJ1ZmZlcihhcmcsIGVuY29kaW5nKSBidXQgdGhyb3dzIGEgVHlwZUVycm9yXG4gKiBpZiB2YWx1ZSBpcyBhIG51bWJlci5cbiAqIEJ1ZmZlci5mcm9tKHN0clssIGVuY29kaW5nXSlcbiAqIEJ1ZmZlci5mcm9tKGFycmF5KVxuICogQnVmZmVyLmZyb20oYnVmZmVyKVxuICogQnVmZmVyLmZyb20oYXJyYXlCdWZmZXJbLCBieXRlT2Zmc2V0WywgbGVuZ3RoXV0pXG4gKiovXG5CdWZmZXIuZnJvbSA9IGZ1bmN0aW9uICh2YWx1ZSwgZW5jb2RpbmdPck9mZnNldCwgbGVuZ3RoKSB7XG4gIHJldHVybiBmcm9tKG51bGwsIHZhbHVlLCBlbmNvZGluZ09yT2Zmc2V0LCBsZW5ndGgpXG59XG5cbmlmIChCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkge1xuICBCdWZmZXIucHJvdG90eXBlLl9fcHJvdG9fXyA9IFVpbnQ4QXJyYXkucHJvdG90eXBlXG4gIEJ1ZmZlci5fX3Byb3RvX18gPSBVaW50OEFycmF5XG4gIGlmICh0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wuc3BlY2llcyAmJlxuICAgICAgQnVmZmVyW1N5bWJvbC5zcGVjaWVzXSA9PT0gQnVmZmVyKSB7XG4gICAgLy8gRml4IHN1YmFycmF5KCkgaW4gRVMyMDE2LiBTZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9mZXJvc3MvYnVmZmVyL3B1bGwvOTdcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQnVmZmVyLCBTeW1ib2wuc3BlY2llcywge1xuICAgICAgdmFsdWU6IG51bGwsXG4gICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KVxuICB9XG59XG5cbmZ1bmN0aW9uIGFzc2VydFNpemUgKHNpemUpIHtcbiAgaWYgKHR5cGVvZiBzaXplICE9PSAnbnVtYmVyJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1wic2l6ZVwiIGFyZ3VtZW50IG11c3QgYmUgYSBudW1iZXInKVxuICB9IGVsc2UgaWYgKHNpemUgPCAwKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ1wic2l6ZVwiIGFyZ3VtZW50IG11c3Qgbm90IGJlIG5lZ2F0aXZlJylcbiAgfVxufVxuXG5mdW5jdGlvbiBhbGxvYyAodGhhdCwgc2l6ZSwgZmlsbCwgZW5jb2RpbmcpIHtcbiAgYXNzZXJ0U2l6ZShzaXplKVxuICBpZiAoc2l6ZSA8PSAwKSB7XG4gICAgcmV0dXJuIGNyZWF0ZUJ1ZmZlcih0aGF0LCBzaXplKVxuICB9XG4gIGlmIChmaWxsICE9PSB1bmRlZmluZWQpIHtcbiAgICAvLyBPbmx5IHBheSBhdHRlbnRpb24gdG8gZW5jb2RpbmcgaWYgaXQncyBhIHN0cmluZy4gVGhpc1xuICAgIC8vIHByZXZlbnRzIGFjY2lkZW50YWxseSBzZW5kaW5nIGluIGEgbnVtYmVyIHRoYXQgd291bGRcbiAgICAvLyBiZSBpbnRlcnByZXR0ZWQgYXMgYSBzdGFydCBvZmZzZXQuXG4gICAgcmV0dXJuIHR5cGVvZiBlbmNvZGluZyA9PT0gJ3N0cmluZydcbiAgICAgID8gY3JlYXRlQnVmZmVyKHRoYXQsIHNpemUpLmZpbGwoZmlsbCwgZW5jb2RpbmcpXG4gICAgICA6IGNyZWF0ZUJ1ZmZlcih0aGF0LCBzaXplKS5maWxsKGZpbGwpXG4gIH1cbiAgcmV0dXJuIGNyZWF0ZUJ1ZmZlcih0aGF0LCBzaXplKVxufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgZmlsbGVkIEJ1ZmZlciBpbnN0YW5jZS5cbiAqIGFsbG9jKHNpemVbLCBmaWxsWywgZW5jb2RpbmddXSlcbiAqKi9cbkJ1ZmZlci5hbGxvYyA9IGZ1bmN0aW9uIChzaXplLCBmaWxsLCBlbmNvZGluZykge1xuICByZXR1cm4gYWxsb2MobnVsbCwgc2l6ZSwgZmlsbCwgZW5jb2RpbmcpXG59XG5cbmZ1bmN0aW9uIGFsbG9jVW5zYWZlICh0aGF0LCBzaXplKSB7XG4gIGFzc2VydFNpemUoc2l6ZSlcbiAgdGhhdCA9IGNyZWF0ZUJ1ZmZlcih0aGF0LCBzaXplIDwgMCA/IDAgOiBjaGVja2VkKHNpemUpIHwgMClcbiAgaWYgKCFCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2l6ZTsgKytpKSB7XG4gICAgICB0aGF0W2ldID0gMFxuICAgIH1cbiAgfVxuICByZXR1cm4gdGhhdFxufVxuXG4vKipcbiAqIEVxdWl2YWxlbnQgdG8gQnVmZmVyKG51bSksIGJ5IGRlZmF1bHQgY3JlYXRlcyBhIG5vbi16ZXJvLWZpbGxlZCBCdWZmZXIgaW5zdGFuY2UuXG4gKiAqL1xuQnVmZmVyLmFsbG9jVW5zYWZlID0gZnVuY3Rpb24gKHNpemUpIHtcbiAgcmV0dXJuIGFsbG9jVW5zYWZlKG51bGwsIHNpemUpXG59XG4vKipcbiAqIEVxdWl2YWxlbnQgdG8gU2xvd0J1ZmZlcihudW0pLCBieSBkZWZhdWx0IGNyZWF0ZXMgYSBub24temVyby1maWxsZWQgQnVmZmVyIGluc3RhbmNlLlxuICovXG5CdWZmZXIuYWxsb2NVbnNhZmVTbG93ID0gZnVuY3Rpb24gKHNpemUpIHtcbiAgcmV0dXJuIGFsbG9jVW5zYWZlKG51bGwsIHNpemUpXG59XG5cbmZ1bmN0aW9uIGZyb21TdHJpbmcgKHRoYXQsIHN0cmluZywgZW5jb2RpbmcpIHtcbiAgaWYgKHR5cGVvZiBlbmNvZGluZyAhPT0gJ3N0cmluZycgfHwgZW5jb2RpbmcgPT09ICcnKSB7XG4gICAgZW5jb2RpbmcgPSAndXRmOCdcbiAgfVxuXG4gIGlmICghQnVmZmVyLmlzRW5jb2RpbmcoZW5jb2RpbmcpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignXCJlbmNvZGluZ1wiIG11c3QgYmUgYSB2YWxpZCBzdHJpbmcgZW5jb2RpbmcnKVxuICB9XG5cbiAgdmFyIGxlbmd0aCA9IGJ5dGVMZW5ndGgoc3RyaW5nLCBlbmNvZGluZykgfCAwXG4gIHRoYXQgPSBjcmVhdGVCdWZmZXIodGhhdCwgbGVuZ3RoKVxuXG4gIHZhciBhY3R1YWwgPSB0aGF0LndyaXRlKHN0cmluZywgZW5jb2RpbmcpXG5cbiAgaWYgKGFjdHVhbCAhPT0gbGVuZ3RoKSB7XG4gICAgLy8gV3JpdGluZyBhIGhleCBzdHJpbmcsIGZvciBleGFtcGxlLCB0aGF0IGNvbnRhaW5zIGludmFsaWQgY2hhcmFjdGVycyB3aWxsXG4gICAgLy8gY2F1c2UgZXZlcnl0aGluZyBhZnRlciB0aGUgZmlyc3QgaW52YWxpZCBjaGFyYWN0ZXIgdG8gYmUgaWdub3JlZC4gKGUuZy5cbiAgICAvLyAnYWJ4eGNkJyB3aWxsIGJlIHRyZWF0ZWQgYXMgJ2FiJylcbiAgICB0aGF0ID0gdGhhdC5zbGljZSgwLCBhY3R1YWwpXG4gIH1cblxuICByZXR1cm4gdGhhdFxufVxuXG5mdW5jdGlvbiBmcm9tQXJyYXlMaWtlICh0aGF0LCBhcnJheSkge1xuICB2YXIgbGVuZ3RoID0gYXJyYXkubGVuZ3RoIDwgMCA/IDAgOiBjaGVja2VkKGFycmF5Lmxlbmd0aCkgfCAwXG4gIHRoYXQgPSBjcmVhdGVCdWZmZXIodGhhdCwgbGVuZ3RoKVxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgaSArPSAxKSB7XG4gICAgdGhhdFtpXSA9IGFycmF5W2ldICYgMjU1XG4gIH1cbiAgcmV0dXJuIHRoYXRcbn1cblxuZnVuY3Rpb24gZnJvbUFycmF5QnVmZmVyICh0aGF0LCBhcnJheSwgYnl0ZU9mZnNldCwgbGVuZ3RoKSB7XG4gIGFycmF5LmJ5dGVMZW5ndGggLy8gdGhpcyB0aHJvd3MgaWYgYGFycmF5YCBpcyBub3QgYSB2YWxpZCBBcnJheUJ1ZmZlclxuXG4gIGlmIChieXRlT2Zmc2V0IDwgMCB8fCBhcnJheS5ieXRlTGVuZ3RoIDwgYnl0ZU9mZnNldCkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdcXCdvZmZzZXRcXCcgaXMgb3V0IG9mIGJvdW5kcycpXG4gIH1cblxuICBpZiAoYXJyYXkuYnl0ZUxlbmd0aCA8IGJ5dGVPZmZzZXQgKyAobGVuZ3RoIHx8IDApKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ1xcJ2xlbmd0aFxcJyBpcyBvdXQgb2YgYm91bmRzJylcbiAgfVxuXG4gIGlmIChieXRlT2Zmc2V0ID09PSB1bmRlZmluZWQgJiYgbGVuZ3RoID09PSB1bmRlZmluZWQpIHtcbiAgICBhcnJheSA9IG5ldyBVaW50OEFycmF5KGFycmF5KVxuICB9IGVsc2UgaWYgKGxlbmd0aCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgYXJyYXkgPSBuZXcgVWludDhBcnJheShhcnJheSwgYnl0ZU9mZnNldClcbiAgfSBlbHNlIHtcbiAgICBhcnJheSA9IG5ldyBVaW50OEFycmF5KGFycmF5LCBieXRlT2Zmc2V0LCBsZW5ndGgpXG4gIH1cblxuICBpZiAoQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHtcbiAgICAvLyBSZXR1cm4gYW4gYXVnbWVudGVkIGBVaW50OEFycmF5YCBpbnN0YW5jZSwgZm9yIGJlc3QgcGVyZm9ybWFuY2VcbiAgICB0aGF0ID0gYXJyYXlcbiAgICB0aGF0Ll9fcHJvdG9fXyA9IEJ1ZmZlci5wcm90b3R5cGVcbiAgfSBlbHNlIHtcbiAgICAvLyBGYWxsYmFjazogUmV0dXJuIGFuIG9iamVjdCBpbnN0YW5jZSBvZiB0aGUgQnVmZmVyIGNsYXNzXG4gICAgdGhhdCA9IGZyb21BcnJheUxpa2UodGhhdCwgYXJyYXkpXG4gIH1cbiAgcmV0dXJuIHRoYXRcbn1cblxuZnVuY3Rpb24gZnJvbU9iamVjdCAodGhhdCwgb2JqKSB7XG4gIGlmIChCdWZmZXIuaXNCdWZmZXIob2JqKSkge1xuICAgIHZhciBsZW4gPSBjaGVja2VkKG9iai5sZW5ndGgpIHwgMFxuICAgIHRoYXQgPSBjcmVhdGVCdWZmZXIodGhhdCwgbGVuKVxuXG4gICAgaWYgKHRoYXQubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gdGhhdFxuICAgIH1cblxuICAgIG9iai5jb3B5KHRoYXQsIDAsIDAsIGxlbilcbiAgICByZXR1cm4gdGhhdFxuICB9XG5cbiAgaWYgKG9iaikge1xuICAgIGlmICgodHlwZW9mIEFycmF5QnVmZmVyICE9PSAndW5kZWZpbmVkJyAmJlxuICAgICAgICBvYmouYnVmZmVyIGluc3RhbmNlb2YgQXJyYXlCdWZmZXIpIHx8ICdsZW5ndGgnIGluIG9iaikge1xuICAgICAgaWYgKHR5cGVvZiBvYmoubGVuZ3RoICE9PSAnbnVtYmVyJyB8fCBpc25hbihvYmoubGVuZ3RoKSkge1xuICAgICAgICByZXR1cm4gY3JlYXRlQnVmZmVyKHRoYXQsIDApXG4gICAgICB9XG4gICAgICByZXR1cm4gZnJvbUFycmF5TGlrZSh0aGF0LCBvYmopXG4gICAgfVxuXG4gICAgaWYgKG9iai50eXBlID09PSAnQnVmZmVyJyAmJiBpc0FycmF5KG9iai5kYXRhKSkge1xuICAgICAgcmV0dXJuIGZyb21BcnJheUxpa2UodGhhdCwgb2JqLmRhdGEpXG4gICAgfVxuICB9XG5cbiAgdGhyb3cgbmV3IFR5cGVFcnJvcignRmlyc3QgYXJndW1lbnQgbXVzdCBiZSBhIHN0cmluZywgQnVmZmVyLCBBcnJheUJ1ZmZlciwgQXJyYXksIG9yIGFycmF5LWxpa2Ugb2JqZWN0LicpXG59XG5cbmZ1bmN0aW9uIGNoZWNrZWQgKGxlbmd0aCkge1xuICAvLyBOb3RlOiBjYW5ub3QgdXNlIGBsZW5ndGggPCBrTWF4TGVuZ3RoKClgIGhlcmUgYmVjYXVzZSB0aGF0IGZhaWxzIHdoZW5cbiAgLy8gbGVuZ3RoIGlzIE5hTiAod2hpY2ggaXMgb3RoZXJ3aXNlIGNvZXJjZWQgdG8gemVyby4pXG4gIGlmIChsZW5ndGggPj0ga01heExlbmd0aCgpKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0F0dGVtcHQgdG8gYWxsb2NhdGUgQnVmZmVyIGxhcmdlciB0aGFuIG1heGltdW0gJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgJ3NpemU6IDB4JyArIGtNYXhMZW5ndGgoKS50b1N0cmluZygxNikgKyAnIGJ5dGVzJylcbiAgfVxuICByZXR1cm4gbGVuZ3RoIHwgMFxufVxuXG5mdW5jdGlvbiBTbG93QnVmZmVyIChsZW5ndGgpIHtcbiAgaWYgKCtsZW5ndGggIT0gbGVuZ3RoKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgZXFlcWVxXG4gICAgbGVuZ3RoID0gMFxuICB9XG4gIHJldHVybiBCdWZmZXIuYWxsb2MoK2xlbmd0aClcbn1cblxuQnVmZmVyLmlzQnVmZmVyID0gZnVuY3Rpb24gaXNCdWZmZXIgKGIpIHtcbiAgcmV0dXJuICEhKGIgIT0gbnVsbCAmJiBiLl9pc0J1ZmZlcilcbn1cblxuQnVmZmVyLmNvbXBhcmUgPSBmdW5jdGlvbiBjb21wYXJlIChhLCBiKSB7XG4gIGlmICghQnVmZmVyLmlzQnVmZmVyKGEpIHx8ICFCdWZmZXIuaXNCdWZmZXIoYikpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdBcmd1bWVudHMgbXVzdCBiZSBCdWZmZXJzJylcbiAgfVxuXG4gIGlmIChhID09PSBiKSByZXR1cm4gMFxuXG4gIHZhciB4ID0gYS5sZW5ndGhcbiAgdmFyIHkgPSBiLmxlbmd0aFxuXG4gIGZvciAodmFyIGkgPSAwLCBsZW4gPSBNYXRoLm1pbih4LCB5KTsgaSA8IGxlbjsgKytpKSB7XG4gICAgaWYgKGFbaV0gIT09IGJbaV0pIHtcbiAgICAgIHggPSBhW2ldXG4gICAgICB5ID0gYltpXVxuICAgICAgYnJlYWtcbiAgICB9XG4gIH1cblxuICBpZiAoeCA8IHkpIHJldHVybiAtMVxuICBpZiAoeSA8IHgpIHJldHVybiAxXG4gIHJldHVybiAwXG59XG5cbkJ1ZmZlci5pc0VuY29kaW5nID0gZnVuY3Rpb24gaXNFbmNvZGluZyAoZW5jb2RpbmcpIHtcbiAgc3dpdGNoIChTdHJpbmcoZW5jb2RpbmcpLnRvTG93ZXJDYXNlKCkpIHtcbiAgICBjYXNlICdoZXgnOlxuICAgIGNhc2UgJ3V0ZjgnOlxuICAgIGNhc2UgJ3V0Zi04JzpcbiAgICBjYXNlICdhc2NpaSc6XG4gICAgY2FzZSAnbGF0aW4xJzpcbiAgICBjYXNlICdiaW5hcnknOlxuICAgIGNhc2UgJ2Jhc2U2NCc6XG4gICAgY2FzZSAndWNzMic6XG4gICAgY2FzZSAndWNzLTInOlxuICAgIGNhc2UgJ3V0ZjE2bGUnOlxuICAgIGNhc2UgJ3V0Zi0xNmxlJzpcbiAgICAgIHJldHVybiB0cnVlXG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBmYWxzZVxuICB9XG59XG5cbkJ1ZmZlci5jb25jYXQgPSBmdW5jdGlvbiBjb25jYXQgKGxpc3QsIGxlbmd0aCkge1xuICBpZiAoIWlzQXJyYXkobGlzdCkpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdcImxpc3RcIiBhcmd1bWVudCBtdXN0IGJlIGFuIEFycmF5IG9mIEJ1ZmZlcnMnKVxuICB9XG5cbiAgaWYgKGxpc3QubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIEJ1ZmZlci5hbGxvYygwKVxuICB9XG5cbiAgdmFyIGlcbiAgaWYgKGxlbmd0aCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgbGVuZ3RoID0gMFxuICAgIGZvciAoaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgKytpKSB7XG4gICAgICBsZW5ndGggKz0gbGlzdFtpXS5sZW5ndGhcbiAgICB9XG4gIH1cblxuICB2YXIgYnVmZmVyID0gQnVmZmVyLmFsbG9jVW5zYWZlKGxlbmd0aClcbiAgdmFyIHBvcyA9IDBcbiAgZm9yIChpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyArK2kpIHtcbiAgICB2YXIgYnVmID0gbGlzdFtpXVxuICAgIGlmICghQnVmZmVyLmlzQnVmZmVyKGJ1ZikpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1wibGlzdFwiIGFyZ3VtZW50IG11c3QgYmUgYW4gQXJyYXkgb2YgQnVmZmVycycpXG4gICAgfVxuICAgIGJ1Zi5jb3B5KGJ1ZmZlciwgcG9zKVxuICAgIHBvcyArPSBidWYubGVuZ3RoXG4gIH1cbiAgcmV0dXJuIGJ1ZmZlclxufVxuXG5mdW5jdGlvbiBieXRlTGVuZ3RoIChzdHJpbmcsIGVuY29kaW5nKSB7XG4gIGlmIChCdWZmZXIuaXNCdWZmZXIoc3RyaW5nKSkge1xuICAgIHJldHVybiBzdHJpbmcubGVuZ3RoXG4gIH1cbiAgaWYgKHR5cGVvZiBBcnJheUJ1ZmZlciAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIEFycmF5QnVmZmVyLmlzVmlldyA9PT0gJ2Z1bmN0aW9uJyAmJlxuICAgICAgKEFycmF5QnVmZmVyLmlzVmlldyhzdHJpbmcpIHx8IHN0cmluZyBpbnN0YW5jZW9mIEFycmF5QnVmZmVyKSkge1xuICAgIHJldHVybiBzdHJpbmcuYnl0ZUxlbmd0aFxuICB9XG4gIGlmICh0eXBlb2Ygc3RyaW5nICE9PSAnc3RyaW5nJykge1xuICAgIHN0cmluZyA9ICcnICsgc3RyaW5nXG4gIH1cblxuICB2YXIgbGVuID0gc3RyaW5nLmxlbmd0aFxuICBpZiAobGVuID09PSAwKSByZXR1cm4gMFxuXG4gIC8vIFVzZSBhIGZvciBsb29wIHRvIGF2b2lkIHJlY3Vyc2lvblxuICB2YXIgbG93ZXJlZENhc2UgPSBmYWxzZVxuICBmb3IgKDs7KSB7XG4gICAgc3dpdGNoIChlbmNvZGluZykge1xuICAgICAgY2FzZSAnYXNjaWknOlxuICAgICAgY2FzZSAnbGF0aW4xJzpcbiAgICAgIGNhc2UgJ2JpbmFyeSc6XG4gICAgICAgIHJldHVybiBsZW5cbiAgICAgIGNhc2UgJ3V0ZjgnOlxuICAgICAgY2FzZSAndXRmLTgnOlxuICAgICAgY2FzZSB1bmRlZmluZWQ6XG4gICAgICAgIHJldHVybiB1dGY4VG9CeXRlcyhzdHJpbmcpLmxlbmd0aFxuICAgICAgY2FzZSAndWNzMic6XG4gICAgICBjYXNlICd1Y3MtMic6XG4gICAgICBjYXNlICd1dGYxNmxlJzpcbiAgICAgIGNhc2UgJ3V0Zi0xNmxlJzpcbiAgICAgICAgcmV0dXJuIGxlbiAqIDJcbiAgICAgIGNhc2UgJ2hleCc6XG4gICAgICAgIHJldHVybiBsZW4gPj4+IDFcbiAgICAgIGNhc2UgJ2Jhc2U2NCc6XG4gICAgICAgIHJldHVybiBiYXNlNjRUb0J5dGVzKHN0cmluZykubGVuZ3RoXG4gICAgICBkZWZhdWx0OlxuICAgICAgICBpZiAobG93ZXJlZENhc2UpIHJldHVybiB1dGY4VG9CeXRlcyhzdHJpbmcpLmxlbmd0aCAvLyBhc3N1bWUgdXRmOFxuICAgICAgICBlbmNvZGluZyA9ICgnJyArIGVuY29kaW5nKS50b0xvd2VyQ2FzZSgpXG4gICAgICAgIGxvd2VyZWRDYXNlID0gdHJ1ZVxuICAgIH1cbiAgfVxufVxuQnVmZmVyLmJ5dGVMZW5ndGggPSBieXRlTGVuZ3RoXG5cbmZ1bmN0aW9uIHNsb3dUb1N0cmluZyAoZW5jb2RpbmcsIHN0YXJ0LCBlbmQpIHtcbiAgdmFyIGxvd2VyZWRDYXNlID0gZmFsc2VcblxuICAvLyBObyBuZWVkIHRvIHZlcmlmeSB0aGF0IFwidGhpcy5sZW5ndGggPD0gTUFYX1VJTlQzMlwiIHNpbmNlIGl0J3MgYSByZWFkLW9ubHlcbiAgLy8gcHJvcGVydHkgb2YgYSB0eXBlZCBhcnJheS5cblxuICAvLyBUaGlzIGJlaGF2ZXMgbmVpdGhlciBsaWtlIFN0cmluZyBub3IgVWludDhBcnJheSBpbiB0aGF0IHdlIHNldCBzdGFydC9lbmRcbiAgLy8gdG8gdGhlaXIgdXBwZXIvbG93ZXIgYm91bmRzIGlmIHRoZSB2YWx1ZSBwYXNzZWQgaXMgb3V0IG9mIHJhbmdlLlxuICAvLyB1bmRlZmluZWQgaXMgaGFuZGxlZCBzcGVjaWFsbHkgYXMgcGVyIEVDTUEtMjYyIDZ0aCBFZGl0aW9uLFxuICAvLyBTZWN0aW9uIDEzLjMuMy43IFJ1bnRpbWUgU2VtYW50aWNzOiBLZXllZEJpbmRpbmdJbml0aWFsaXphdGlvbi5cbiAgaWYgKHN0YXJ0ID09PSB1bmRlZmluZWQgfHwgc3RhcnQgPCAwKSB7XG4gICAgc3RhcnQgPSAwXG4gIH1cbiAgLy8gUmV0dXJuIGVhcmx5IGlmIHN0YXJ0ID4gdGhpcy5sZW5ndGguIERvbmUgaGVyZSB0byBwcmV2ZW50IHBvdGVudGlhbCB1aW50MzJcbiAgLy8gY29lcmNpb24gZmFpbCBiZWxvdy5cbiAgaWYgKHN0YXJ0ID4gdGhpcy5sZW5ndGgpIHtcbiAgICByZXR1cm4gJydcbiAgfVxuXG4gIGlmIChlbmQgPT09IHVuZGVmaW5lZCB8fCBlbmQgPiB0aGlzLmxlbmd0aCkge1xuICAgIGVuZCA9IHRoaXMubGVuZ3RoXG4gIH1cblxuICBpZiAoZW5kIDw9IDApIHtcbiAgICByZXR1cm4gJydcbiAgfVxuXG4gIC8vIEZvcmNlIGNvZXJzaW9uIHRvIHVpbnQzMi4gVGhpcyB3aWxsIGFsc28gY29lcmNlIGZhbHNleS9OYU4gdmFsdWVzIHRvIDAuXG4gIGVuZCA+Pj49IDBcbiAgc3RhcnQgPj4+PSAwXG5cbiAgaWYgKGVuZCA8PSBzdGFydCkge1xuICAgIHJldHVybiAnJ1xuICB9XG5cbiAgaWYgKCFlbmNvZGluZykgZW5jb2RpbmcgPSAndXRmOCdcblxuICB3aGlsZSAodHJ1ZSkge1xuICAgIHN3aXRjaCAoZW5jb2RpbmcpIHtcbiAgICAgIGNhc2UgJ2hleCc6XG4gICAgICAgIHJldHVybiBoZXhTbGljZSh0aGlzLCBzdGFydCwgZW5kKVxuXG4gICAgICBjYXNlICd1dGY4JzpcbiAgICAgIGNhc2UgJ3V0Zi04JzpcbiAgICAgICAgcmV0dXJuIHV0ZjhTbGljZSh0aGlzLCBzdGFydCwgZW5kKVxuXG4gICAgICBjYXNlICdhc2NpaSc6XG4gICAgICAgIHJldHVybiBhc2NpaVNsaWNlKHRoaXMsIHN0YXJ0LCBlbmQpXG5cbiAgICAgIGNhc2UgJ2xhdGluMSc6XG4gICAgICBjYXNlICdiaW5hcnknOlxuICAgICAgICByZXR1cm4gbGF0aW4xU2xpY2UodGhpcywgc3RhcnQsIGVuZClcblxuICAgICAgY2FzZSAnYmFzZTY0JzpcbiAgICAgICAgcmV0dXJuIGJhc2U2NFNsaWNlKHRoaXMsIHN0YXJ0LCBlbmQpXG5cbiAgICAgIGNhc2UgJ3VjczInOlxuICAgICAgY2FzZSAndWNzLTInOlxuICAgICAgY2FzZSAndXRmMTZsZSc6XG4gICAgICBjYXNlICd1dGYtMTZsZSc6XG4gICAgICAgIHJldHVybiB1dGYxNmxlU2xpY2UodGhpcywgc3RhcnQsIGVuZClcblxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgaWYgKGxvd2VyZWRDYXNlKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdVbmtub3duIGVuY29kaW5nOiAnICsgZW5jb2RpbmcpXG4gICAgICAgIGVuY29kaW5nID0gKGVuY29kaW5nICsgJycpLnRvTG93ZXJDYXNlKClcbiAgICAgICAgbG93ZXJlZENhc2UgPSB0cnVlXG4gICAgfVxuICB9XG59XG5cbi8vIFRoZSBwcm9wZXJ0eSBpcyB1c2VkIGJ5IGBCdWZmZXIuaXNCdWZmZXJgIGFuZCBgaXMtYnVmZmVyYCAoaW4gU2FmYXJpIDUtNykgdG8gZGV0ZWN0XG4vLyBCdWZmZXIgaW5zdGFuY2VzLlxuQnVmZmVyLnByb3RvdHlwZS5faXNCdWZmZXIgPSB0cnVlXG5cbmZ1bmN0aW9uIHN3YXAgKGIsIG4sIG0pIHtcbiAgdmFyIGkgPSBiW25dXG4gIGJbbl0gPSBiW21dXG4gIGJbbV0gPSBpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUuc3dhcDE2ID0gZnVuY3Rpb24gc3dhcDE2ICgpIHtcbiAgdmFyIGxlbiA9IHRoaXMubGVuZ3RoXG4gIGlmIChsZW4gJSAyICE9PSAwKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0J1ZmZlciBzaXplIG11c3QgYmUgYSBtdWx0aXBsZSBvZiAxNi1iaXRzJylcbiAgfVxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSArPSAyKSB7XG4gICAgc3dhcCh0aGlzLCBpLCBpICsgMSlcbiAgfVxuICByZXR1cm4gdGhpc1xufVxuXG5CdWZmZXIucHJvdG90eXBlLnN3YXAzMiA9IGZ1bmN0aW9uIHN3YXAzMiAoKSB7XG4gIHZhciBsZW4gPSB0aGlzLmxlbmd0aFxuICBpZiAobGVuICUgNCAhPT0gMCkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdCdWZmZXIgc2l6ZSBtdXN0IGJlIGEgbXVsdGlwbGUgb2YgMzItYml0cycpXG4gIH1cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkgKz0gNCkge1xuICAgIHN3YXAodGhpcywgaSwgaSArIDMpXG4gICAgc3dhcCh0aGlzLCBpICsgMSwgaSArIDIpXG4gIH1cbiAgcmV0dXJuIHRoaXNcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5zd2FwNjQgPSBmdW5jdGlvbiBzd2FwNjQgKCkge1xuICB2YXIgbGVuID0gdGhpcy5sZW5ndGhcbiAgaWYgKGxlbiAlIDggIT09IDApIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignQnVmZmVyIHNpemUgbXVzdCBiZSBhIG11bHRpcGxlIG9mIDY0LWJpdHMnKVxuICB9XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpICs9IDgpIHtcbiAgICBzd2FwKHRoaXMsIGksIGkgKyA3KVxuICAgIHN3YXAodGhpcywgaSArIDEsIGkgKyA2KVxuICAgIHN3YXAodGhpcywgaSArIDIsIGkgKyA1KVxuICAgIHN3YXAodGhpcywgaSArIDMsIGkgKyA0KVxuICB9XG4gIHJldHVybiB0aGlzXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZyAoKSB7XG4gIHZhciBsZW5ndGggPSB0aGlzLmxlbmd0aCB8IDBcbiAgaWYgKGxlbmd0aCA9PT0gMCkgcmV0dXJuICcnXG4gIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKSByZXR1cm4gdXRmOFNsaWNlKHRoaXMsIDAsIGxlbmd0aClcbiAgcmV0dXJuIHNsb3dUb1N0cmluZy5hcHBseSh0aGlzLCBhcmd1bWVudHMpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUuZXF1YWxzID0gZnVuY3Rpb24gZXF1YWxzIChiKSB7XG4gIGlmICghQnVmZmVyLmlzQnVmZmVyKGIpKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdBcmd1bWVudCBtdXN0IGJlIGEgQnVmZmVyJylcbiAgaWYgKHRoaXMgPT09IGIpIHJldHVybiB0cnVlXG4gIHJldHVybiBCdWZmZXIuY29tcGFyZSh0aGlzLCBiKSA9PT0gMFxufVxuXG5CdWZmZXIucHJvdG90eXBlLmluc3BlY3QgPSBmdW5jdGlvbiBpbnNwZWN0ICgpIHtcbiAgdmFyIHN0ciA9ICcnXG4gIHZhciBtYXggPSBleHBvcnRzLklOU1BFQ1RfTUFYX0JZVEVTXG4gIGlmICh0aGlzLmxlbmd0aCA+IDApIHtcbiAgICBzdHIgPSB0aGlzLnRvU3RyaW5nKCdoZXgnLCAwLCBtYXgpLm1hdGNoKC8uezJ9L2cpLmpvaW4oJyAnKVxuICAgIGlmICh0aGlzLmxlbmd0aCA+IG1heCkgc3RyICs9ICcgLi4uICdcbiAgfVxuICByZXR1cm4gJzxCdWZmZXIgJyArIHN0ciArICc+J1xufVxuXG5CdWZmZXIucHJvdG90eXBlLmNvbXBhcmUgPSBmdW5jdGlvbiBjb21wYXJlICh0YXJnZXQsIHN0YXJ0LCBlbmQsIHRoaXNTdGFydCwgdGhpc0VuZCkge1xuICBpZiAoIUJ1ZmZlci5pc0J1ZmZlcih0YXJnZXQpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQXJndW1lbnQgbXVzdCBiZSBhIEJ1ZmZlcicpXG4gIH1cblxuICBpZiAoc3RhcnQgPT09IHVuZGVmaW5lZCkge1xuICAgIHN0YXJ0ID0gMFxuICB9XG4gIGlmIChlbmQgPT09IHVuZGVmaW5lZCkge1xuICAgIGVuZCA9IHRhcmdldCA/IHRhcmdldC5sZW5ndGggOiAwXG4gIH1cbiAgaWYgKHRoaXNTdGFydCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgdGhpc1N0YXJ0ID0gMFxuICB9XG4gIGlmICh0aGlzRW5kID09PSB1bmRlZmluZWQpIHtcbiAgICB0aGlzRW5kID0gdGhpcy5sZW5ndGhcbiAgfVxuXG4gIGlmIChzdGFydCA8IDAgfHwgZW5kID4gdGFyZ2V0Lmxlbmd0aCB8fCB0aGlzU3RhcnQgPCAwIHx8IHRoaXNFbmQgPiB0aGlzLmxlbmd0aCkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdvdXQgb2YgcmFuZ2UgaW5kZXgnKVxuICB9XG5cbiAgaWYgKHRoaXNTdGFydCA+PSB0aGlzRW5kICYmIHN0YXJ0ID49IGVuZCkge1xuICAgIHJldHVybiAwXG4gIH1cbiAgaWYgKHRoaXNTdGFydCA+PSB0aGlzRW5kKSB7XG4gICAgcmV0dXJuIC0xXG4gIH1cbiAgaWYgKHN0YXJ0ID49IGVuZCkge1xuICAgIHJldHVybiAxXG4gIH1cblxuICBzdGFydCA+Pj49IDBcbiAgZW5kID4+Pj0gMFxuICB0aGlzU3RhcnQgPj4+PSAwXG4gIHRoaXNFbmQgPj4+PSAwXG5cbiAgaWYgKHRoaXMgPT09IHRhcmdldCkgcmV0dXJuIDBcblxuICB2YXIgeCA9IHRoaXNFbmQgLSB0aGlzU3RhcnRcbiAgdmFyIHkgPSBlbmQgLSBzdGFydFxuICB2YXIgbGVuID0gTWF0aC5taW4oeCwgeSlcblxuICB2YXIgdGhpc0NvcHkgPSB0aGlzLnNsaWNlKHRoaXNTdGFydCwgdGhpc0VuZClcbiAgdmFyIHRhcmdldENvcHkgPSB0YXJnZXQuc2xpY2Uoc3RhcnQsIGVuZClcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgKytpKSB7XG4gICAgaWYgKHRoaXNDb3B5W2ldICE9PSB0YXJnZXRDb3B5W2ldKSB7XG4gICAgICB4ID0gdGhpc0NvcHlbaV1cbiAgICAgIHkgPSB0YXJnZXRDb3B5W2ldXG4gICAgICBicmVha1xuICAgIH1cbiAgfVxuXG4gIGlmICh4IDwgeSkgcmV0dXJuIC0xXG4gIGlmICh5IDwgeCkgcmV0dXJuIDFcbiAgcmV0dXJuIDBcbn1cblxuLy8gRmluZHMgZWl0aGVyIHRoZSBmaXJzdCBpbmRleCBvZiBgdmFsYCBpbiBgYnVmZmVyYCBhdCBvZmZzZXQgPj0gYGJ5dGVPZmZzZXRgLFxuLy8gT1IgdGhlIGxhc3QgaW5kZXggb2YgYHZhbGAgaW4gYGJ1ZmZlcmAgYXQgb2Zmc2V0IDw9IGBieXRlT2Zmc2V0YC5cbi8vXG4vLyBBcmd1bWVudHM6XG4vLyAtIGJ1ZmZlciAtIGEgQnVmZmVyIHRvIHNlYXJjaFxuLy8gLSB2YWwgLSBhIHN0cmluZywgQnVmZmVyLCBvciBudW1iZXJcbi8vIC0gYnl0ZU9mZnNldCAtIGFuIGluZGV4IGludG8gYGJ1ZmZlcmA7IHdpbGwgYmUgY2xhbXBlZCB0byBhbiBpbnQzMlxuLy8gLSBlbmNvZGluZyAtIGFuIG9wdGlvbmFsIGVuY29kaW5nLCByZWxldmFudCBpcyB2YWwgaXMgYSBzdHJpbmdcbi8vIC0gZGlyIC0gdHJ1ZSBmb3IgaW5kZXhPZiwgZmFsc2UgZm9yIGxhc3RJbmRleE9mXG5mdW5jdGlvbiBiaWRpcmVjdGlvbmFsSW5kZXhPZiAoYnVmZmVyLCB2YWwsIGJ5dGVPZmZzZXQsIGVuY29kaW5nLCBkaXIpIHtcbiAgLy8gRW1wdHkgYnVmZmVyIG1lYW5zIG5vIG1hdGNoXG4gIGlmIChidWZmZXIubGVuZ3RoID09PSAwKSByZXR1cm4gLTFcblxuICAvLyBOb3JtYWxpemUgYnl0ZU9mZnNldFxuICBpZiAodHlwZW9mIGJ5dGVPZmZzZXQgPT09ICdzdHJpbmcnKSB7XG4gICAgZW5jb2RpbmcgPSBieXRlT2Zmc2V0XG4gICAgYnl0ZU9mZnNldCA9IDBcbiAgfSBlbHNlIGlmIChieXRlT2Zmc2V0ID4gMHg3ZmZmZmZmZikge1xuICAgIGJ5dGVPZmZzZXQgPSAweDdmZmZmZmZmXG4gIH0gZWxzZSBpZiAoYnl0ZU9mZnNldCA8IC0weDgwMDAwMDAwKSB7XG4gICAgYnl0ZU9mZnNldCA9IC0weDgwMDAwMDAwXG4gIH1cbiAgYnl0ZU9mZnNldCA9ICtieXRlT2Zmc2V0ICAvLyBDb2VyY2UgdG8gTnVtYmVyLlxuICBpZiAoaXNOYU4oYnl0ZU9mZnNldCkpIHtcbiAgICAvLyBieXRlT2Zmc2V0OiBpdCBpdCdzIHVuZGVmaW5lZCwgbnVsbCwgTmFOLCBcImZvb1wiLCBldGMsIHNlYXJjaCB3aG9sZSBidWZmZXJcbiAgICBieXRlT2Zmc2V0ID0gZGlyID8gMCA6IChidWZmZXIubGVuZ3RoIC0gMSlcbiAgfVxuXG4gIC8vIE5vcm1hbGl6ZSBieXRlT2Zmc2V0OiBuZWdhdGl2ZSBvZmZzZXRzIHN0YXJ0IGZyb20gdGhlIGVuZCBvZiB0aGUgYnVmZmVyXG4gIGlmIChieXRlT2Zmc2V0IDwgMCkgYnl0ZU9mZnNldCA9IGJ1ZmZlci5sZW5ndGggKyBieXRlT2Zmc2V0XG4gIGlmIChieXRlT2Zmc2V0ID49IGJ1ZmZlci5sZW5ndGgpIHtcbiAgICBpZiAoZGlyKSByZXR1cm4gLTFcbiAgICBlbHNlIGJ5dGVPZmZzZXQgPSBidWZmZXIubGVuZ3RoIC0gMVxuICB9IGVsc2UgaWYgKGJ5dGVPZmZzZXQgPCAwKSB7XG4gICAgaWYgKGRpcikgYnl0ZU9mZnNldCA9IDBcbiAgICBlbHNlIHJldHVybiAtMVxuICB9XG5cbiAgLy8gTm9ybWFsaXplIHZhbFxuICBpZiAodHlwZW9mIHZhbCA9PT0gJ3N0cmluZycpIHtcbiAgICB2YWwgPSBCdWZmZXIuZnJvbSh2YWwsIGVuY29kaW5nKVxuICB9XG5cbiAgLy8gRmluYWxseSwgc2VhcmNoIGVpdGhlciBpbmRleE9mIChpZiBkaXIgaXMgdHJ1ZSkgb3IgbGFzdEluZGV4T2ZcbiAgaWYgKEJ1ZmZlci5pc0J1ZmZlcih2YWwpKSB7XG4gICAgLy8gU3BlY2lhbCBjYXNlOiBsb29raW5nIGZvciBlbXB0eSBzdHJpbmcvYnVmZmVyIGFsd2F5cyBmYWlsc1xuICAgIGlmICh2YWwubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gLTFcbiAgICB9XG4gICAgcmV0dXJuIGFycmF5SW5kZXhPZihidWZmZXIsIHZhbCwgYnl0ZU9mZnNldCwgZW5jb2RpbmcsIGRpcilcbiAgfSBlbHNlIGlmICh0eXBlb2YgdmFsID09PSAnbnVtYmVyJykge1xuICAgIHZhbCA9IHZhbCAmIDB4RkYgLy8gU2VhcmNoIGZvciBhIGJ5dGUgdmFsdWUgWzAtMjU1XVxuICAgIGlmIChCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCAmJlxuICAgICAgICB0eXBlb2YgVWludDhBcnJheS5wcm90b3R5cGUuaW5kZXhPZiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgaWYgKGRpcikge1xuICAgICAgICByZXR1cm4gVWludDhBcnJheS5wcm90b3R5cGUuaW5kZXhPZi5jYWxsKGJ1ZmZlciwgdmFsLCBieXRlT2Zmc2V0KVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIFVpbnQ4QXJyYXkucHJvdG90eXBlLmxhc3RJbmRleE9mLmNhbGwoYnVmZmVyLCB2YWwsIGJ5dGVPZmZzZXQpXG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBhcnJheUluZGV4T2YoYnVmZmVyLCBbIHZhbCBdLCBieXRlT2Zmc2V0LCBlbmNvZGluZywgZGlyKVxuICB9XG5cbiAgdGhyb3cgbmV3IFR5cGVFcnJvcigndmFsIG11c3QgYmUgc3RyaW5nLCBudW1iZXIgb3IgQnVmZmVyJylcbn1cblxuZnVuY3Rpb24gYXJyYXlJbmRleE9mIChhcnIsIHZhbCwgYnl0ZU9mZnNldCwgZW5jb2RpbmcsIGRpcikge1xuICB2YXIgaW5kZXhTaXplID0gMVxuICB2YXIgYXJyTGVuZ3RoID0gYXJyLmxlbmd0aFxuICB2YXIgdmFsTGVuZ3RoID0gdmFsLmxlbmd0aFxuXG4gIGlmIChlbmNvZGluZyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgZW5jb2RpbmcgPSBTdHJpbmcoZW5jb2RpbmcpLnRvTG93ZXJDYXNlKClcbiAgICBpZiAoZW5jb2RpbmcgPT09ICd1Y3MyJyB8fCBlbmNvZGluZyA9PT0gJ3Vjcy0yJyB8fFxuICAgICAgICBlbmNvZGluZyA9PT0gJ3V0ZjE2bGUnIHx8IGVuY29kaW5nID09PSAndXRmLTE2bGUnKSB7XG4gICAgICBpZiAoYXJyLmxlbmd0aCA8IDIgfHwgdmFsLmxlbmd0aCA8IDIpIHtcbiAgICAgICAgcmV0dXJuIC0xXG4gICAgICB9XG4gICAgICBpbmRleFNpemUgPSAyXG4gICAgICBhcnJMZW5ndGggLz0gMlxuICAgICAgdmFsTGVuZ3RoIC89IDJcbiAgICAgIGJ5dGVPZmZzZXQgLz0gMlxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHJlYWQgKGJ1ZiwgaSkge1xuICAgIGlmIChpbmRleFNpemUgPT09IDEpIHtcbiAgICAgIHJldHVybiBidWZbaV1cbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGJ1Zi5yZWFkVUludDE2QkUoaSAqIGluZGV4U2l6ZSlcbiAgICB9XG4gIH1cblxuICB2YXIgaVxuICBpZiAoZGlyKSB7XG4gICAgdmFyIGZvdW5kSW5kZXggPSAtMVxuICAgIGZvciAoaSA9IGJ5dGVPZmZzZXQ7IGkgPCBhcnJMZW5ndGg7IGkrKykge1xuICAgICAgaWYgKHJlYWQoYXJyLCBpKSA9PT0gcmVhZCh2YWwsIGZvdW5kSW5kZXggPT09IC0xID8gMCA6IGkgLSBmb3VuZEluZGV4KSkge1xuICAgICAgICBpZiAoZm91bmRJbmRleCA9PT0gLTEpIGZvdW5kSW5kZXggPSBpXG4gICAgICAgIGlmIChpIC0gZm91bmRJbmRleCArIDEgPT09IHZhbExlbmd0aCkgcmV0dXJuIGZvdW5kSW5kZXggKiBpbmRleFNpemVcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChmb3VuZEluZGV4ICE9PSAtMSkgaSAtPSBpIC0gZm91bmRJbmRleFxuICAgICAgICBmb3VuZEluZGV4ID0gLTFcbiAgICAgIH1cbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgaWYgKGJ5dGVPZmZzZXQgKyB2YWxMZW5ndGggPiBhcnJMZW5ndGgpIGJ5dGVPZmZzZXQgPSBhcnJMZW5ndGggLSB2YWxMZW5ndGhcbiAgICBmb3IgKGkgPSBieXRlT2Zmc2V0OyBpID49IDA7IGktLSkge1xuICAgICAgdmFyIGZvdW5kID0gdHJ1ZVxuICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCB2YWxMZW5ndGg7IGorKykge1xuICAgICAgICBpZiAocmVhZChhcnIsIGkgKyBqKSAhPT0gcmVhZCh2YWwsIGopKSB7XG4gICAgICAgICAgZm91bmQgPSBmYWxzZVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChmb3VuZCkgcmV0dXJuIGlcbiAgICB9XG4gIH1cblxuICByZXR1cm4gLTFcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5pbmNsdWRlcyA9IGZ1bmN0aW9uIGluY2x1ZGVzICh2YWwsIGJ5dGVPZmZzZXQsIGVuY29kaW5nKSB7XG4gIHJldHVybiB0aGlzLmluZGV4T2YodmFsLCBieXRlT2Zmc2V0LCBlbmNvZGluZykgIT09IC0xXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUuaW5kZXhPZiA9IGZ1bmN0aW9uIGluZGV4T2YgKHZhbCwgYnl0ZU9mZnNldCwgZW5jb2RpbmcpIHtcbiAgcmV0dXJuIGJpZGlyZWN0aW9uYWxJbmRleE9mKHRoaXMsIHZhbCwgYnl0ZU9mZnNldCwgZW5jb2RpbmcsIHRydWUpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUubGFzdEluZGV4T2YgPSBmdW5jdGlvbiBsYXN0SW5kZXhPZiAodmFsLCBieXRlT2Zmc2V0LCBlbmNvZGluZykge1xuICByZXR1cm4gYmlkaXJlY3Rpb25hbEluZGV4T2YodGhpcywgdmFsLCBieXRlT2Zmc2V0LCBlbmNvZGluZywgZmFsc2UpXG59XG5cbmZ1bmN0aW9uIGhleFdyaXRlIChidWYsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgb2Zmc2V0ID0gTnVtYmVyKG9mZnNldCkgfHwgMFxuICB2YXIgcmVtYWluaW5nID0gYnVmLmxlbmd0aCAtIG9mZnNldFxuICBpZiAoIWxlbmd0aCkge1xuICAgIGxlbmd0aCA9IHJlbWFpbmluZ1xuICB9IGVsc2Uge1xuICAgIGxlbmd0aCA9IE51bWJlcihsZW5ndGgpXG4gICAgaWYgKGxlbmd0aCA+IHJlbWFpbmluZykge1xuICAgICAgbGVuZ3RoID0gcmVtYWluaW5nXG4gICAgfVxuICB9XG5cbiAgLy8gbXVzdCBiZSBhbiBldmVuIG51bWJlciBvZiBkaWdpdHNcbiAgdmFyIHN0ckxlbiA9IHN0cmluZy5sZW5ndGhcbiAgaWYgKHN0ckxlbiAlIDIgIT09IDApIHRocm93IG5ldyBUeXBlRXJyb3IoJ0ludmFsaWQgaGV4IHN0cmluZycpXG5cbiAgaWYgKGxlbmd0aCA+IHN0ckxlbiAvIDIpIHtcbiAgICBsZW5ndGggPSBzdHJMZW4gLyAyXG4gIH1cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7ICsraSkge1xuICAgIHZhciBwYXJzZWQgPSBwYXJzZUludChzdHJpbmcuc3Vic3RyKGkgKiAyLCAyKSwgMTYpXG4gICAgaWYgKGlzTmFOKHBhcnNlZCkpIHJldHVybiBpXG4gICAgYnVmW29mZnNldCArIGldID0gcGFyc2VkXG4gIH1cbiAgcmV0dXJuIGlcbn1cblxuZnVuY3Rpb24gdXRmOFdyaXRlIChidWYsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgcmV0dXJuIGJsaXRCdWZmZXIodXRmOFRvQnl0ZXMoc3RyaW5nLCBidWYubGVuZ3RoIC0gb2Zmc2V0KSwgYnVmLCBvZmZzZXQsIGxlbmd0aClcbn1cblxuZnVuY3Rpb24gYXNjaWlXcml0ZSAoYnVmLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKSB7XG4gIHJldHVybiBibGl0QnVmZmVyKGFzY2lpVG9CeXRlcyhzdHJpbmcpLCBidWYsIG9mZnNldCwgbGVuZ3RoKVxufVxuXG5mdW5jdGlvbiBsYXRpbjFXcml0ZSAoYnVmLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKSB7XG4gIHJldHVybiBhc2NpaVdyaXRlKGJ1Ziwgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aClcbn1cblxuZnVuY3Rpb24gYmFzZTY0V3JpdGUgKGJ1Ziwgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCkge1xuICByZXR1cm4gYmxpdEJ1ZmZlcihiYXNlNjRUb0J5dGVzKHN0cmluZyksIGJ1Ziwgb2Zmc2V0LCBsZW5ndGgpXG59XG5cbmZ1bmN0aW9uIHVjczJXcml0ZSAoYnVmLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKSB7XG4gIHJldHVybiBibGl0QnVmZmVyKHV0ZjE2bGVUb0J5dGVzKHN0cmluZywgYnVmLmxlbmd0aCAtIG9mZnNldCksIGJ1Ziwgb2Zmc2V0LCBsZW5ndGgpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGUgPSBmdW5jdGlvbiB3cml0ZSAoc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCwgZW5jb2RpbmcpIHtcbiAgLy8gQnVmZmVyI3dyaXRlKHN0cmluZylcbiAgaWYgKG9mZnNldCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgZW5jb2RpbmcgPSAndXRmOCdcbiAgICBsZW5ndGggPSB0aGlzLmxlbmd0aFxuICAgIG9mZnNldCA9IDBcbiAgLy8gQnVmZmVyI3dyaXRlKHN0cmluZywgZW5jb2RpbmcpXG4gIH0gZWxzZSBpZiAobGVuZ3RoID09PSB1bmRlZmluZWQgJiYgdHlwZW9mIG9mZnNldCA9PT0gJ3N0cmluZycpIHtcbiAgICBlbmNvZGluZyA9IG9mZnNldFxuICAgIGxlbmd0aCA9IHRoaXMubGVuZ3RoXG4gICAgb2Zmc2V0ID0gMFxuICAvLyBCdWZmZXIjd3JpdGUoc3RyaW5nLCBvZmZzZXRbLCBsZW5ndGhdWywgZW5jb2RpbmddKVxuICB9IGVsc2UgaWYgKGlzRmluaXRlKG9mZnNldCkpIHtcbiAgICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gICAgaWYgKGlzRmluaXRlKGxlbmd0aCkpIHtcbiAgICAgIGxlbmd0aCA9IGxlbmd0aCB8IDBcbiAgICAgIGlmIChlbmNvZGluZyA9PT0gdW5kZWZpbmVkKSBlbmNvZGluZyA9ICd1dGY4J1xuICAgIH0gZWxzZSB7XG4gICAgICBlbmNvZGluZyA9IGxlbmd0aFxuICAgICAgbGVuZ3RoID0gdW5kZWZpbmVkXG4gICAgfVxuICAvLyBsZWdhY3kgd3JpdGUoc3RyaW5nLCBlbmNvZGluZywgb2Zmc2V0LCBsZW5ndGgpIC0gcmVtb3ZlIGluIHYwLjEzXG4gIH0gZWxzZSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgJ0J1ZmZlci53cml0ZShzdHJpbmcsIGVuY29kaW5nLCBvZmZzZXRbLCBsZW5ndGhdKSBpcyBubyBsb25nZXIgc3VwcG9ydGVkJ1xuICAgIClcbiAgfVxuXG4gIHZhciByZW1haW5pbmcgPSB0aGlzLmxlbmd0aCAtIG9mZnNldFxuICBpZiAobGVuZ3RoID09PSB1bmRlZmluZWQgfHwgbGVuZ3RoID4gcmVtYWluaW5nKSBsZW5ndGggPSByZW1haW5pbmdcblxuICBpZiAoKHN0cmluZy5sZW5ndGggPiAwICYmIChsZW5ndGggPCAwIHx8IG9mZnNldCA8IDApKSB8fCBvZmZzZXQgPiB0aGlzLmxlbmd0aCkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdBdHRlbXB0IHRvIHdyaXRlIG91dHNpZGUgYnVmZmVyIGJvdW5kcycpXG4gIH1cblxuICBpZiAoIWVuY29kaW5nKSBlbmNvZGluZyA9ICd1dGY4J1xuXG4gIHZhciBsb3dlcmVkQ2FzZSA9IGZhbHNlXG4gIGZvciAoOzspIHtcbiAgICBzd2l0Y2ggKGVuY29kaW5nKSB7XG4gICAgICBjYXNlICdoZXgnOlxuICAgICAgICByZXR1cm4gaGV4V3JpdGUodGhpcywgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aClcblxuICAgICAgY2FzZSAndXRmOCc6XG4gICAgICBjYXNlICd1dGYtOCc6XG4gICAgICAgIHJldHVybiB1dGY4V3JpdGUodGhpcywgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aClcblxuICAgICAgY2FzZSAnYXNjaWknOlxuICAgICAgICByZXR1cm4gYXNjaWlXcml0ZSh0aGlzLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKVxuXG4gICAgICBjYXNlICdsYXRpbjEnOlxuICAgICAgY2FzZSAnYmluYXJ5JzpcbiAgICAgICAgcmV0dXJuIGxhdGluMVdyaXRlKHRoaXMsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpXG5cbiAgICAgIGNhc2UgJ2Jhc2U2NCc6XG4gICAgICAgIC8vIFdhcm5pbmc6IG1heExlbmd0aCBub3QgdGFrZW4gaW50byBhY2NvdW50IGluIGJhc2U2NFdyaXRlXG4gICAgICAgIHJldHVybiBiYXNlNjRXcml0ZSh0aGlzLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKVxuXG4gICAgICBjYXNlICd1Y3MyJzpcbiAgICAgIGNhc2UgJ3Vjcy0yJzpcbiAgICAgIGNhc2UgJ3V0ZjE2bGUnOlxuICAgICAgY2FzZSAndXRmLTE2bGUnOlxuICAgICAgICByZXR1cm4gdWNzMldyaXRlKHRoaXMsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpXG5cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGlmIChsb3dlcmVkQ2FzZSkgdGhyb3cgbmV3IFR5cGVFcnJvcignVW5rbm93biBlbmNvZGluZzogJyArIGVuY29kaW5nKVxuICAgICAgICBlbmNvZGluZyA9ICgnJyArIGVuY29kaW5nKS50b0xvd2VyQ2FzZSgpXG4gICAgICAgIGxvd2VyZWRDYXNlID0gdHJ1ZVxuICAgIH1cbiAgfVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnRvSlNPTiA9IGZ1bmN0aW9uIHRvSlNPTiAoKSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogJ0J1ZmZlcicsXG4gICAgZGF0YTogQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwodGhpcy5fYXJyIHx8IHRoaXMsIDApXG4gIH1cbn1cblxuZnVuY3Rpb24gYmFzZTY0U2xpY2UgKGJ1Ziwgc3RhcnQsIGVuZCkge1xuICBpZiAoc3RhcnQgPT09IDAgJiYgZW5kID09PSBidWYubGVuZ3RoKSB7XG4gICAgcmV0dXJuIGJhc2U2NC5mcm9tQnl0ZUFycmF5KGJ1ZilcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gYmFzZTY0LmZyb21CeXRlQXJyYXkoYnVmLnNsaWNlKHN0YXJ0LCBlbmQpKVxuICB9XG59XG5cbmZ1bmN0aW9uIHV0ZjhTbGljZSAoYnVmLCBzdGFydCwgZW5kKSB7XG4gIGVuZCA9IE1hdGgubWluKGJ1Zi5sZW5ndGgsIGVuZClcbiAgdmFyIHJlcyA9IFtdXG5cbiAgdmFyIGkgPSBzdGFydFxuICB3aGlsZSAoaSA8IGVuZCkge1xuICAgIHZhciBmaXJzdEJ5dGUgPSBidWZbaV1cbiAgICB2YXIgY29kZVBvaW50ID0gbnVsbFxuICAgIHZhciBieXRlc1BlclNlcXVlbmNlID0gKGZpcnN0Qnl0ZSA+IDB4RUYpID8gNFxuICAgICAgOiAoZmlyc3RCeXRlID4gMHhERikgPyAzXG4gICAgICA6IChmaXJzdEJ5dGUgPiAweEJGKSA/IDJcbiAgICAgIDogMVxuXG4gICAgaWYgKGkgKyBieXRlc1BlclNlcXVlbmNlIDw9IGVuZCkge1xuICAgICAgdmFyIHNlY29uZEJ5dGUsIHRoaXJkQnl0ZSwgZm91cnRoQnl0ZSwgdGVtcENvZGVQb2ludFxuXG4gICAgICBzd2l0Y2ggKGJ5dGVzUGVyU2VxdWVuY2UpIHtcbiAgICAgICAgY2FzZSAxOlxuICAgICAgICAgIGlmIChmaXJzdEJ5dGUgPCAweDgwKSB7XG4gICAgICAgICAgICBjb2RlUG9pbnQgPSBmaXJzdEJ5dGVcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSAyOlxuICAgICAgICAgIHNlY29uZEJ5dGUgPSBidWZbaSArIDFdXG4gICAgICAgICAgaWYgKChzZWNvbmRCeXRlICYgMHhDMCkgPT09IDB4ODApIHtcbiAgICAgICAgICAgIHRlbXBDb2RlUG9pbnQgPSAoZmlyc3RCeXRlICYgMHgxRikgPDwgMHg2IHwgKHNlY29uZEJ5dGUgJiAweDNGKVxuICAgICAgICAgICAgaWYgKHRlbXBDb2RlUG9pbnQgPiAweDdGKSB7XG4gICAgICAgICAgICAgIGNvZGVQb2ludCA9IHRlbXBDb2RlUG9pbnRcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSAzOlxuICAgICAgICAgIHNlY29uZEJ5dGUgPSBidWZbaSArIDFdXG4gICAgICAgICAgdGhpcmRCeXRlID0gYnVmW2kgKyAyXVxuICAgICAgICAgIGlmICgoc2Vjb25kQnl0ZSAmIDB4QzApID09PSAweDgwICYmICh0aGlyZEJ5dGUgJiAweEMwKSA9PT0gMHg4MCkge1xuICAgICAgICAgICAgdGVtcENvZGVQb2ludCA9IChmaXJzdEJ5dGUgJiAweEYpIDw8IDB4QyB8IChzZWNvbmRCeXRlICYgMHgzRikgPDwgMHg2IHwgKHRoaXJkQnl0ZSAmIDB4M0YpXG4gICAgICAgICAgICBpZiAodGVtcENvZGVQb2ludCA+IDB4N0ZGICYmICh0ZW1wQ29kZVBvaW50IDwgMHhEODAwIHx8IHRlbXBDb2RlUG9pbnQgPiAweERGRkYpKSB7XG4gICAgICAgICAgICAgIGNvZGVQb2ludCA9IHRlbXBDb2RlUG9pbnRcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSA0OlxuICAgICAgICAgIHNlY29uZEJ5dGUgPSBidWZbaSArIDFdXG4gICAgICAgICAgdGhpcmRCeXRlID0gYnVmW2kgKyAyXVxuICAgICAgICAgIGZvdXJ0aEJ5dGUgPSBidWZbaSArIDNdXG4gICAgICAgICAgaWYgKChzZWNvbmRCeXRlICYgMHhDMCkgPT09IDB4ODAgJiYgKHRoaXJkQnl0ZSAmIDB4QzApID09PSAweDgwICYmIChmb3VydGhCeXRlICYgMHhDMCkgPT09IDB4ODApIHtcbiAgICAgICAgICAgIHRlbXBDb2RlUG9pbnQgPSAoZmlyc3RCeXRlICYgMHhGKSA8PCAweDEyIHwgKHNlY29uZEJ5dGUgJiAweDNGKSA8PCAweEMgfCAodGhpcmRCeXRlICYgMHgzRikgPDwgMHg2IHwgKGZvdXJ0aEJ5dGUgJiAweDNGKVxuICAgICAgICAgICAgaWYgKHRlbXBDb2RlUG9pbnQgPiAweEZGRkYgJiYgdGVtcENvZGVQb2ludCA8IDB4MTEwMDAwKSB7XG4gICAgICAgICAgICAgIGNvZGVQb2ludCA9IHRlbXBDb2RlUG9pbnRcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGNvZGVQb2ludCA9PT0gbnVsbCkge1xuICAgICAgLy8gd2UgZGlkIG5vdCBnZW5lcmF0ZSBhIHZhbGlkIGNvZGVQb2ludCBzbyBpbnNlcnQgYVxuICAgICAgLy8gcmVwbGFjZW1lbnQgY2hhciAoVStGRkZEKSBhbmQgYWR2YW5jZSBvbmx5IDEgYnl0ZVxuICAgICAgY29kZVBvaW50ID0gMHhGRkZEXG4gICAgICBieXRlc1BlclNlcXVlbmNlID0gMVxuICAgIH0gZWxzZSBpZiAoY29kZVBvaW50ID4gMHhGRkZGKSB7XG4gICAgICAvLyBlbmNvZGUgdG8gdXRmMTYgKHN1cnJvZ2F0ZSBwYWlyIGRhbmNlKVxuICAgICAgY29kZVBvaW50IC09IDB4MTAwMDBcbiAgICAgIHJlcy5wdXNoKGNvZGVQb2ludCA+Pj4gMTAgJiAweDNGRiB8IDB4RDgwMClcbiAgICAgIGNvZGVQb2ludCA9IDB4REMwMCB8IGNvZGVQb2ludCAmIDB4M0ZGXG4gICAgfVxuXG4gICAgcmVzLnB1c2goY29kZVBvaW50KVxuICAgIGkgKz0gYnl0ZXNQZXJTZXF1ZW5jZVxuICB9XG5cbiAgcmV0dXJuIGRlY29kZUNvZGVQb2ludHNBcnJheShyZXMpXG59XG5cbi8vIEJhc2VkIG9uIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzIyNzQ3MjcyLzY4MDc0MiwgdGhlIGJyb3dzZXIgd2l0aFxuLy8gdGhlIGxvd2VzdCBsaW1pdCBpcyBDaHJvbWUsIHdpdGggMHgxMDAwMCBhcmdzLlxuLy8gV2UgZ28gMSBtYWduaXR1ZGUgbGVzcywgZm9yIHNhZmV0eVxudmFyIE1BWF9BUkdVTUVOVFNfTEVOR1RIID0gMHgxMDAwXG5cbmZ1bmN0aW9uIGRlY29kZUNvZGVQb2ludHNBcnJheSAoY29kZVBvaW50cykge1xuICB2YXIgbGVuID0gY29kZVBvaW50cy5sZW5ndGhcbiAgaWYgKGxlbiA8PSBNQVhfQVJHVU1FTlRTX0xFTkdUSCkge1xuICAgIHJldHVybiBTdHJpbmcuZnJvbUNoYXJDb2RlLmFwcGx5KFN0cmluZywgY29kZVBvaW50cykgLy8gYXZvaWQgZXh0cmEgc2xpY2UoKVxuICB9XG5cbiAgLy8gRGVjb2RlIGluIGNodW5rcyB0byBhdm9pZCBcImNhbGwgc3RhY2sgc2l6ZSBleGNlZWRlZFwiLlxuICB2YXIgcmVzID0gJydcbiAgdmFyIGkgPSAwXG4gIHdoaWxlIChpIDwgbGVuKSB7XG4gICAgcmVzICs9IFN0cmluZy5mcm9tQ2hhckNvZGUuYXBwbHkoXG4gICAgICBTdHJpbmcsXG4gICAgICBjb2RlUG9pbnRzLnNsaWNlKGksIGkgKz0gTUFYX0FSR1VNRU5UU19MRU5HVEgpXG4gICAgKVxuICB9XG4gIHJldHVybiByZXNcbn1cblxuZnVuY3Rpb24gYXNjaWlTbGljZSAoYnVmLCBzdGFydCwgZW5kKSB7XG4gIHZhciByZXQgPSAnJ1xuICBlbmQgPSBNYXRoLm1pbihidWYubGVuZ3RoLCBlbmQpXG5cbiAgZm9yICh2YXIgaSA9IHN0YXJ0OyBpIDwgZW5kOyArK2kpIHtcbiAgICByZXQgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShidWZbaV0gJiAweDdGKVxuICB9XG4gIHJldHVybiByZXRcbn1cblxuZnVuY3Rpb24gbGF0aW4xU2xpY2UgKGJ1Ziwgc3RhcnQsIGVuZCkge1xuICB2YXIgcmV0ID0gJydcbiAgZW5kID0gTWF0aC5taW4oYnVmLmxlbmd0aCwgZW5kKVxuXG4gIGZvciAodmFyIGkgPSBzdGFydDsgaSA8IGVuZDsgKytpKSB7XG4gICAgcmV0ICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoYnVmW2ldKVxuICB9XG4gIHJldHVybiByZXRcbn1cblxuZnVuY3Rpb24gaGV4U2xpY2UgKGJ1Ziwgc3RhcnQsIGVuZCkge1xuICB2YXIgbGVuID0gYnVmLmxlbmd0aFxuXG4gIGlmICghc3RhcnQgfHwgc3RhcnQgPCAwKSBzdGFydCA9IDBcbiAgaWYgKCFlbmQgfHwgZW5kIDwgMCB8fCBlbmQgPiBsZW4pIGVuZCA9IGxlblxuXG4gIHZhciBvdXQgPSAnJ1xuICBmb3IgKHZhciBpID0gc3RhcnQ7IGkgPCBlbmQ7ICsraSkge1xuICAgIG91dCArPSB0b0hleChidWZbaV0pXG4gIH1cbiAgcmV0dXJuIG91dFxufVxuXG5mdW5jdGlvbiB1dGYxNmxlU2xpY2UgKGJ1Ziwgc3RhcnQsIGVuZCkge1xuICB2YXIgYnl0ZXMgPSBidWYuc2xpY2Uoc3RhcnQsIGVuZClcbiAgdmFyIHJlcyA9ICcnXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgYnl0ZXMubGVuZ3RoOyBpICs9IDIpIHtcbiAgICByZXMgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShieXRlc1tpXSArIGJ5dGVzW2kgKyAxXSAqIDI1NilcbiAgfVxuICByZXR1cm4gcmVzXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUuc2xpY2UgPSBmdW5jdGlvbiBzbGljZSAoc3RhcnQsIGVuZCkge1xuICB2YXIgbGVuID0gdGhpcy5sZW5ndGhcbiAgc3RhcnQgPSB+fnN0YXJ0XG4gIGVuZCA9IGVuZCA9PT0gdW5kZWZpbmVkID8gbGVuIDogfn5lbmRcblxuICBpZiAoc3RhcnQgPCAwKSB7XG4gICAgc3RhcnQgKz0gbGVuXG4gICAgaWYgKHN0YXJ0IDwgMCkgc3RhcnQgPSAwXG4gIH0gZWxzZSBpZiAoc3RhcnQgPiBsZW4pIHtcbiAgICBzdGFydCA9IGxlblxuICB9XG5cbiAgaWYgKGVuZCA8IDApIHtcbiAgICBlbmQgKz0gbGVuXG4gICAgaWYgKGVuZCA8IDApIGVuZCA9IDBcbiAgfSBlbHNlIGlmIChlbmQgPiBsZW4pIHtcbiAgICBlbmQgPSBsZW5cbiAgfVxuXG4gIGlmIChlbmQgPCBzdGFydCkgZW5kID0gc3RhcnRcblxuICB2YXIgbmV3QnVmXG4gIGlmIChCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkge1xuICAgIG5ld0J1ZiA9IHRoaXMuc3ViYXJyYXkoc3RhcnQsIGVuZClcbiAgICBuZXdCdWYuX19wcm90b19fID0gQnVmZmVyLnByb3RvdHlwZVxuICB9IGVsc2Uge1xuICAgIHZhciBzbGljZUxlbiA9IGVuZCAtIHN0YXJ0XG4gICAgbmV3QnVmID0gbmV3IEJ1ZmZlcihzbGljZUxlbiwgdW5kZWZpbmVkKVxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2xpY2VMZW47ICsraSkge1xuICAgICAgbmV3QnVmW2ldID0gdGhpc1tpICsgc3RhcnRdXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG5ld0J1ZlxufVxuXG4vKlxuICogTmVlZCB0byBtYWtlIHN1cmUgdGhhdCBidWZmZXIgaXNuJ3QgdHJ5aW5nIHRvIHdyaXRlIG91dCBvZiBib3VuZHMuXG4gKi9cbmZ1bmN0aW9uIGNoZWNrT2Zmc2V0IChvZmZzZXQsIGV4dCwgbGVuZ3RoKSB7XG4gIGlmICgob2Zmc2V0ICUgMSkgIT09IDAgfHwgb2Zmc2V0IDwgMCkgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ29mZnNldCBpcyBub3QgdWludCcpXG4gIGlmIChvZmZzZXQgKyBleHQgPiBsZW5ndGgpIHRocm93IG5ldyBSYW5nZUVycm9yKCdUcnlpbmcgdG8gYWNjZXNzIGJleW9uZCBidWZmZXIgbGVuZ3RoJylcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkVUludExFID0gZnVuY3Rpb24gcmVhZFVJbnRMRSAob2Zmc2V0LCBieXRlTGVuZ3RoLCBub0Fzc2VydCkge1xuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGJ5dGVMZW5ndGggPSBieXRlTGVuZ3RoIHwgMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIGJ5dGVMZW5ndGgsIHRoaXMubGVuZ3RoKVxuXG4gIHZhciB2YWwgPSB0aGlzW29mZnNldF1cbiAgdmFyIG11bCA9IDFcbiAgdmFyIGkgPSAwXG4gIHdoaWxlICgrK2kgPCBieXRlTGVuZ3RoICYmIChtdWwgKj0gMHgxMDApKSB7XG4gICAgdmFsICs9IHRoaXNbb2Zmc2V0ICsgaV0gKiBtdWxcbiAgfVxuXG4gIHJldHVybiB2YWxcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkVUludEJFID0gZnVuY3Rpb24gcmVhZFVJbnRCRSAob2Zmc2V0LCBieXRlTGVuZ3RoLCBub0Fzc2VydCkge1xuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGJ5dGVMZW5ndGggPSBieXRlTGVuZ3RoIHwgMFxuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgY2hlY2tPZmZzZXQob2Zmc2V0LCBieXRlTGVuZ3RoLCB0aGlzLmxlbmd0aClcbiAgfVxuXG4gIHZhciB2YWwgPSB0aGlzW29mZnNldCArIC0tYnl0ZUxlbmd0aF1cbiAgdmFyIG11bCA9IDFcbiAgd2hpbGUgKGJ5dGVMZW5ndGggPiAwICYmIChtdWwgKj0gMHgxMDApKSB7XG4gICAgdmFsICs9IHRoaXNbb2Zmc2V0ICsgLS1ieXRlTGVuZ3RoXSAqIG11bFxuICB9XG5cbiAgcmV0dXJuIHZhbFxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRVSW50OCA9IGZ1bmN0aW9uIHJlYWRVSW50OCAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDEsIHRoaXMubGVuZ3RoKVxuICByZXR1cm4gdGhpc1tvZmZzZXRdXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVJbnQxNkxFID0gZnVuY3Rpb24gcmVhZFVJbnQxNkxFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgMiwgdGhpcy5sZW5ndGgpXG4gIHJldHVybiB0aGlzW29mZnNldF0gfCAodGhpc1tvZmZzZXQgKyAxXSA8PCA4KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRVSW50MTZCRSA9IGZ1bmN0aW9uIHJlYWRVSW50MTZCRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDIsIHRoaXMubGVuZ3RoKVxuICByZXR1cm4gKHRoaXNbb2Zmc2V0XSA8PCA4KSB8IHRoaXNbb2Zmc2V0ICsgMV1cbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkVUludDMyTEUgPSBmdW5jdGlvbiByZWFkVUludDMyTEUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCA0LCB0aGlzLmxlbmd0aClcblxuICByZXR1cm4gKCh0aGlzW29mZnNldF0pIHxcbiAgICAgICh0aGlzW29mZnNldCArIDFdIDw8IDgpIHxcbiAgICAgICh0aGlzW29mZnNldCArIDJdIDw8IDE2KSkgK1xuICAgICAgKHRoaXNbb2Zmc2V0ICsgM10gKiAweDEwMDAwMDApXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVJbnQzMkJFID0gZnVuY3Rpb24gcmVhZFVJbnQzMkJFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgNCwgdGhpcy5sZW5ndGgpXG5cbiAgcmV0dXJuICh0aGlzW29mZnNldF0gKiAweDEwMDAwMDApICtcbiAgICAoKHRoaXNbb2Zmc2V0ICsgMV0gPDwgMTYpIHxcbiAgICAodGhpc1tvZmZzZXQgKyAyXSA8PCA4KSB8XG4gICAgdGhpc1tvZmZzZXQgKyAzXSlcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkSW50TEUgPSBmdW5jdGlvbiByZWFkSW50TEUgKG9mZnNldCwgYnl0ZUxlbmd0aCwgbm9Bc3NlcnQpIHtcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBieXRlTGVuZ3RoID0gYnl0ZUxlbmd0aCB8IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCBieXRlTGVuZ3RoLCB0aGlzLmxlbmd0aClcblxuICB2YXIgdmFsID0gdGhpc1tvZmZzZXRdXG4gIHZhciBtdWwgPSAxXG4gIHZhciBpID0gMFxuICB3aGlsZSAoKytpIDwgYnl0ZUxlbmd0aCAmJiAobXVsICo9IDB4MTAwKSkge1xuICAgIHZhbCArPSB0aGlzW29mZnNldCArIGldICogbXVsXG4gIH1cbiAgbXVsICo9IDB4ODBcblxuICBpZiAodmFsID49IG11bCkgdmFsIC09IE1hdGgucG93KDIsIDggKiBieXRlTGVuZ3RoKVxuXG4gIHJldHVybiB2YWxcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkSW50QkUgPSBmdW5jdGlvbiByZWFkSW50QkUgKG9mZnNldCwgYnl0ZUxlbmd0aCwgbm9Bc3NlcnQpIHtcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBieXRlTGVuZ3RoID0gYnl0ZUxlbmd0aCB8IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCBieXRlTGVuZ3RoLCB0aGlzLmxlbmd0aClcblxuICB2YXIgaSA9IGJ5dGVMZW5ndGhcbiAgdmFyIG11bCA9IDFcbiAgdmFyIHZhbCA9IHRoaXNbb2Zmc2V0ICsgLS1pXVxuICB3aGlsZSAoaSA+IDAgJiYgKG11bCAqPSAweDEwMCkpIHtcbiAgICB2YWwgKz0gdGhpc1tvZmZzZXQgKyAtLWldICogbXVsXG4gIH1cbiAgbXVsICo9IDB4ODBcblxuICBpZiAodmFsID49IG11bCkgdmFsIC09IE1hdGgucG93KDIsIDggKiBieXRlTGVuZ3RoKVxuXG4gIHJldHVybiB2YWxcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkSW50OCA9IGZ1bmN0aW9uIHJlYWRJbnQ4IChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgMSwgdGhpcy5sZW5ndGgpXG4gIGlmICghKHRoaXNbb2Zmc2V0XSAmIDB4ODApKSByZXR1cm4gKHRoaXNbb2Zmc2V0XSlcbiAgcmV0dXJuICgoMHhmZiAtIHRoaXNbb2Zmc2V0XSArIDEpICogLTEpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEludDE2TEUgPSBmdW5jdGlvbiByZWFkSW50MTZMRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDIsIHRoaXMubGVuZ3RoKVxuICB2YXIgdmFsID0gdGhpc1tvZmZzZXRdIHwgKHRoaXNbb2Zmc2V0ICsgMV0gPDwgOClcbiAgcmV0dXJuICh2YWwgJiAweDgwMDApID8gdmFsIHwgMHhGRkZGMDAwMCA6IHZhbFxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRJbnQxNkJFID0gZnVuY3Rpb24gcmVhZEludDE2QkUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCAyLCB0aGlzLmxlbmd0aClcbiAgdmFyIHZhbCA9IHRoaXNbb2Zmc2V0ICsgMV0gfCAodGhpc1tvZmZzZXRdIDw8IDgpXG4gIHJldHVybiAodmFsICYgMHg4MDAwKSA/IHZhbCB8IDB4RkZGRjAwMDAgOiB2YWxcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkSW50MzJMRSA9IGZ1bmN0aW9uIHJlYWRJbnQzMkxFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgNCwgdGhpcy5sZW5ndGgpXG5cbiAgcmV0dXJuICh0aGlzW29mZnNldF0pIHxcbiAgICAodGhpc1tvZmZzZXQgKyAxXSA8PCA4KSB8XG4gICAgKHRoaXNbb2Zmc2V0ICsgMl0gPDwgMTYpIHxcbiAgICAodGhpc1tvZmZzZXQgKyAzXSA8PCAyNClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkSW50MzJCRSA9IGZ1bmN0aW9uIHJlYWRJbnQzMkJFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgNCwgdGhpcy5sZW5ndGgpXG5cbiAgcmV0dXJuICh0aGlzW29mZnNldF0gPDwgMjQpIHxcbiAgICAodGhpc1tvZmZzZXQgKyAxXSA8PCAxNikgfFxuICAgICh0aGlzW29mZnNldCArIDJdIDw8IDgpIHxcbiAgICAodGhpc1tvZmZzZXQgKyAzXSlcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkRmxvYXRMRSA9IGZ1bmN0aW9uIHJlYWRGbG9hdExFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgNCwgdGhpcy5sZW5ndGgpXG4gIHJldHVybiBpZWVlNzU0LnJlYWQodGhpcywgb2Zmc2V0LCB0cnVlLCAyMywgNClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkRmxvYXRCRSA9IGZ1bmN0aW9uIHJlYWRGbG9hdEJFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgNCwgdGhpcy5sZW5ndGgpXG4gIHJldHVybiBpZWVlNzU0LnJlYWQodGhpcywgb2Zmc2V0LCBmYWxzZSwgMjMsIDQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZERvdWJsZUxFID0gZnVuY3Rpb24gcmVhZERvdWJsZUxFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgOCwgdGhpcy5sZW5ndGgpXG4gIHJldHVybiBpZWVlNzU0LnJlYWQodGhpcywgb2Zmc2V0LCB0cnVlLCA1MiwgOClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkRG91YmxlQkUgPSBmdW5jdGlvbiByZWFkRG91YmxlQkUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCA4LCB0aGlzLmxlbmd0aClcbiAgcmV0dXJuIGllZWU3NTQucmVhZCh0aGlzLCBvZmZzZXQsIGZhbHNlLCA1MiwgOClcbn1cblxuZnVuY3Rpb24gY2hlY2tJbnQgKGJ1ZiwgdmFsdWUsIG9mZnNldCwgZXh0LCBtYXgsIG1pbikge1xuICBpZiAoIUJ1ZmZlci5pc0J1ZmZlcihidWYpKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdcImJ1ZmZlclwiIGFyZ3VtZW50IG11c3QgYmUgYSBCdWZmZXIgaW5zdGFuY2UnKVxuICBpZiAodmFsdWUgPiBtYXggfHwgdmFsdWUgPCBtaW4pIHRocm93IG5ldyBSYW5nZUVycm9yKCdcInZhbHVlXCIgYXJndW1lbnQgaXMgb3V0IG9mIGJvdW5kcycpXG4gIGlmIChvZmZzZXQgKyBleHQgPiBidWYubGVuZ3RoKSB0aHJvdyBuZXcgUmFuZ2VFcnJvcignSW5kZXggb3V0IG9mIHJhbmdlJylcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnRMRSA9IGZ1bmN0aW9uIHdyaXRlVUludExFICh2YWx1ZSwgb2Zmc2V0LCBieXRlTGVuZ3RoLCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGJ5dGVMZW5ndGggPSBieXRlTGVuZ3RoIHwgMFxuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgdmFyIG1heEJ5dGVzID0gTWF0aC5wb3coMiwgOCAqIGJ5dGVMZW5ndGgpIC0gMVxuICAgIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIGJ5dGVMZW5ndGgsIG1heEJ5dGVzLCAwKVxuICB9XG5cbiAgdmFyIG11bCA9IDFcbiAgdmFyIGkgPSAwXG4gIHRoaXNbb2Zmc2V0XSA9IHZhbHVlICYgMHhGRlxuICB3aGlsZSAoKytpIDwgYnl0ZUxlbmd0aCAmJiAobXVsICo9IDB4MTAwKSkge1xuICAgIHRoaXNbb2Zmc2V0ICsgaV0gPSAodmFsdWUgLyBtdWwpICYgMHhGRlxuICB9XG5cbiAgcmV0dXJuIG9mZnNldCArIGJ5dGVMZW5ndGhcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnRCRSA9IGZ1bmN0aW9uIHdyaXRlVUludEJFICh2YWx1ZSwgb2Zmc2V0LCBieXRlTGVuZ3RoLCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGJ5dGVMZW5ndGggPSBieXRlTGVuZ3RoIHwgMFxuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgdmFyIG1heEJ5dGVzID0gTWF0aC5wb3coMiwgOCAqIGJ5dGVMZW5ndGgpIC0gMVxuICAgIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIGJ5dGVMZW5ndGgsIG1heEJ5dGVzLCAwKVxuICB9XG5cbiAgdmFyIGkgPSBieXRlTGVuZ3RoIC0gMVxuICB2YXIgbXVsID0gMVxuICB0aGlzW29mZnNldCArIGldID0gdmFsdWUgJiAweEZGXG4gIHdoaWxlICgtLWkgPj0gMCAmJiAobXVsICo9IDB4MTAwKSkge1xuICAgIHRoaXNbb2Zmc2V0ICsgaV0gPSAodmFsdWUgLyBtdWwpICYgMHhGRlxuICB9XG5cbiAgcmV0dXJuIG9mZnNldCArIGJ5dGVMZW5ndGhcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnQ4ID0gZnVuY3Rpb24gd3JpdGVVSW50OCAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCAxLCAweGZmLCAwKVxuICBpZiAoIUJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB2YWx1ZSA9IE1hdGguZmxvb3IodmFsdWUpXG4gIHRoaXNbb2Zmc2V0XSA9ICh2YWx1ZSAmIDB4ZmYpXG4gIHJldHVybiBvZmZzZXQgKyAxXG59XG5cbmZ1bmN0aW9uIG9iamVjdFdyaXRlVUludDE2IChidWYsIHZhbHVlLCBvZmZzZXQsIGxpdHRsZUVuZGlhbikge1xuICBpZiAodmFsdWUgPCAwKSB2YWx1ZSA9IDB4ZmZmZiArIHZhbHVlICsgMVxuICBmb3IgKHZhciBpID0gMCwgaiA9IE1hdGgubWluKGJ1Zi5sZW5ndGggLSBvZmZzZXQsIDIpOyBpIDwgajsgKytpKSB7XG4gICAgYnVmW29mZnNldCArIGldID0gKHZhbHVlICYgKDB4ZmYgPDwgKDggKiAobGl0dGxlRW5kaWFuID8gaSA6IDEgLSBpKSkpKSA+Pj5cbiAgICAgIChsaXR0bGVFbmRpYW4gPyBpIDogMSAtIGkpICogOFxuICB9XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVVSW50MTZMRSA9IGZ1bmN0aW9uIHdyaXRlVUludDE2TEUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgMiwgMHhmZmZmLCAwKVxuICBpZiAoQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHtcbiAgICB0aGlzW29mZnNldF0gPSAodmFsdWUgJiAweGZmKVxuICAgIHRoaXNbb2Zmc2V0ICsgMV0gPSAodmFsdWUgPj4+IDgpXG4gIH0gZWxzZSB7XG4gICAgb2JqZWN0V3JpdGVVSW50MTYodGhpcywgdmFsdWUsIG9mZnNldCwgdHJ1ZSlcbiAgfVxuICByZXR1cm4gb2Zmc2V0ICsgMlxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlVUludDE2QkUgPSBmdW5jdGlvbiB3cml0ZVVJbnQxNkJFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDIsIDB4ZmZmZiwgMClcbiAgaWYgKEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB7XG4gICAgdGhpc1tvZmZzZXRdID0gKHZhbHVlID4+PiA4KVxuICAgIHRoaXNbb2Zmc2V0ICsgMV0gPSAodmFsdWUgJiAweGZmKVxuICB9IGVsc2Uge1xuICAgIG9iamVjdFdyaXRlVUludDE2KHRoaXMsIHZhbHVlLCBvZmZzZXQsIGZhbHNlKVxuICB9XG4gIHJldHVybiBvZmZzZXQgKyAyXG59XG5cbmZ1bmN0aW9uIG9iamVjdFdyaXRlVUludDMyIChidWYsIHZhbHVlLCBvZmZzZXQsIGxpdHRsZUVuZGlhbikge1xuICBpZiAodmFsdWUgPCAwKSB2YWx1ZSA9IDB4ZmZmZmZmZmYgKyB2YWx1ZSArIDFcbiAgZm9yICh2YXIgaSA9IDAsIGogPSBNYXRoLm1pbihidWYubGVuZ3RoIC0gb2Zmc2V0LCA0KTsgaSA8IGo7ICsraSkge1xuICAgIGJ1ZltvZmZzZXQgKyBpXSA9ICh2YWx1ZSA+Pj4gKGxpdHRsZUVuZGlhbiA/IGkgOiAzIC0gaSkgKiA4KSAmIDB4ZmZcbiAgfVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlVUludDMyTEUgPSBmdW5jdGlvbiB3cml0ZVVJbnQzMkxFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDQsIDB4ZmZmZmZmZmYsIDApXG4gIGlmIChCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkge1xuICAgIHRoaXNbb2Zmc2V0ICsgM10gPSAodmFsdWUgPj4+IDI0KVxuICAgIHRoaXNbb2Zmc2V0ICsgMl0gPSAodmFsdWUgPj4+IDE2KVxuICAgIHRoaXNbb2Zmc2V0ICsgMV0gPSAodmFsdWUgPj4+IDgpXG4gICAgdGhpc1tvZmZzZXRdID0gKHZhbHVlICYgMHhmZilcbiAgfSBlbHNlIHtcbiAgICBvYmplY3RXcml0ZVVJbnQzMih0aGlzLCB2YWx1ZSwgb2Zmc2V0LCB0cnVlKVxuICB9XG4gIHJldHVybiBvZmZzZXQgKyA0XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVVSW50MzJCRSA9IGZ1bmN0aW9uIHdyaXRlVUludDMyQkUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgNCwgMHhmZmZmZmZmZiwgMClcbiAgaWYgKEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB7XG4gICAgdGhpc1tvZmZzZXRdID0gKHZhbHVlID4+PiAyNClcbiAgICB0aGlzW29mZnNldCArIDFdID0gKHZhbHVlID4+PiAxNilcbiAgICB0aGlzW29mZnNldCArIDJdID0gKHZhbHVlID4+PiA4KVxuICAgIHRoaXNbb2Zmc2V0ICsgM10gPSAodmFsdWUgJiAweGZmKVxuICB9IGVsc2Uge1xuICAgIG9iamVjdFdyaXRlVUludDMyKHRoaXMsIHZhbHVlLCBvZmZzZXQsIGZhbHNlKVxuICB9XG4gIHJldHVybiBvZmZzZXQgKyA0XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVJbnRMRSA9IGZ1bmN0aW9uIHdyaXRlSW50TEUgKHZhbHVlLCBvZmZzZXQsIGJ5dGVMZW5ndGgsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIHZhciBsaW1pdCA9IE1hdGgucG93KDIsIDggKiBieXRlTGVuZ3RoIC0gMSlcblxuICAgIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIGJ5dGVMZW5ndGgsIGxpbWl0IC0gMSwgLWxpbWl0KVxuICB9XG5cbiAgdmFyIGkgPSAwXG4gIHZhciBtdWwgPSAxXG4gIHZhciBzdWIgPSAwXG4gIHRoaXNbb2Zmc2V0XSA9IHZhbHVlICYgMHhGRlxuICB3aGlsZSAoKytpIDwgYnl0ZUxlbmd0aCAmJiAobXVsICo9IDB4MTAwKSkge1xuICAgIGlmICh2YWx1ZSA8IDAgJiYgc3ViID09PSAwICYmIHRoaXNbb2Zmc2V0ICsgaSAtIDFdICE9PSAwKSB7XG4gICAgICBzdWIgPSAxXG4gICAgfVxuICAgIHRoaXNbb2Zmc2V0ICsgaV0gPSAoKHZhbHVlIC8gbXVsKSA+PiAwKSAtIHN1YiAmIDB4RkZcbiAgfVxuXG4gIHJldHVybiBvZmZzZXQgKyBieXRlTGVuZ3RoXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVJbnRCRSA9IGZ1bmN0aW9uIHdyaXRlSW50QkUgKHZhbHVlLCBvZmZzZXQsIGJ5dGVMZW5ndGgsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIHZhciBsaW1pdCA9IE1hdGgucG93KDIsIDggKiBieXRlTGVuZ3RoIC0gMSlcblxuICAgIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIGJ5dGVMZW5ndGgsIGxpbWl0IC0gMSwgLWxpbWl0KVxuICB9XG5cbiAgdmFyIGkgPSBieXRlTGVuZ3RoIC0gMVxuICB2YXIgbXVsID0gMVxuICB2YXIgc3ViID0gMFxuICB0aGlzW29mZnNldCArIGldID0gdmFsdWUgJiAweEZGXG4gIHdoaWxlICgtLWkgPj0gMCAmJiAobXVsICo9IDB4MTAwKSkge1xuICAgIGlmICh2YWx1ZSA8IDAgJiYgc3ViID09PSAwICYmIHRoaXNbb2Zmc2V0ICsgaSArIDFdICE9PSAwKSB7XG4gICAgICBzdWIgPSAxXG4gICAgfVxuICAgIHRoaXNbb2Zmc2V0ICsgaV0gPSAoKHZhbHVlIC8gbXVsKSA+PiAwKSAtIHN1YiAmIDB4RkZcbiAgfVxuXG4gIHJldHVybiBvZmZzZXQgKyBieXRlTGVuZ3RoXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVJbnQ4ID0gZnVuY3Rpb24gd3JpdGVJbnQ4ICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDEsIDB4N2YsIC0weDgwKVxuICBpZiAoIUJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB2YWx1ZSA9IE1hdGguZmxvb3IodmFsdWUpXG4gIGlmICh2YWx1ZSA8IDApIHZhbHVlID0gMHhmZiArIHZhbHVlICsgMVxuICB0aGlzW29mZnNldF0gPSAodmFsdWUgJiAweGZmKVxuICByZXR1cm4gb2Zmc2V0ICsgMVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlSW50MTZMRSA9IGZ1bmN0aW9uIHdyaXRlSW50MTZMRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCAyLCAweDdmZmYsIC0weDgwMDApXG4gIGlmIChCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkge1xuICAgIHRoaXNbb2Zmc2V0XSA9ICh2YWx1ZSAmIDB4ZmYpXG4gICAgdGhpc1tvZmZzZXQgKyAxXSA9ICh2YWx1ZSA+Pj4gOClcbiAgfSBlbHNlIHtcbiAgICBvYmplY3RXcml0ZVVJbnQxNih0aGlzLCB2YWx1ZSwgb2Zmc2V0LCB0cnVlKVxuICB9XG4gIHJldHVybiBvZmZzZXQgKyAyXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVJbnQxNkJFID0gZnVuY3Rpb24gd3JpdGVJbnQxNkJFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDIsIDB4N2ZmZiwgLTB4ODAwMClcbiAgaWYgKEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB7XG4gICAgdGhpc1tvZmZzZXRdID0gKHZhbHVlID4+PiA4KVxuICAgIHRoaXNbb2Zmc2V0ICsgMV0gPSAodmFsdWUgJiAweGZmKVxuICB9IGVsc2Uge1xuICAgIG9iamVjdFdyaXRlVUludDE2KHRoaXMsIHZhbHVlLCBvZmZzZXQsIGZhbHNlKVxuICB9XG4gIHJldHVybiBvZmZzZXQgKyAyXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVJbnQzMkxFID0gZnVuY3Rpb24gd3JpdGVJbnQzMkxFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDQsIDB4N2ZmZmZmZmYsIC0weDgwMDAwMDAwKVxuICBpZiAoQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHtcbiAgICB0aGlzW29mZnNldF0gPSAodmFsdWUgJiAweGZmKVxuICAgIHRoaXNbb2Zmc2V0ICsgMV0gPSAodmFsdWUgPj4+IDgpXG4gICAgdGhpc1tvZmZzZXQgKyAyXSA9ICh2YWx1ZSA+Pj4gMTYpXG4gICAgdGhpc1tvZmZzZXQgKyAzXSA9ICh2YWx1ZSA+Pj4gMjQpXG4gIH0gZWxzZSB7XG4gICAgb2JqZWN0V3JpdGVVSW50MzIodGhpcywgdmFsdWUsIG9mZnNldCwgdHJ1ZSlcbiAgfVxuICByZXR1cm4gb2Zmc2V0ICsgNFxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlSW50MzJCRSA9IGZ1bmN0aW9uIHdyaXRlSW50MzJCRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCA0LCAweDdmZmZmZmZmLCAtMHg4MDAwMDAwMClcbiAgaWYgKHZhbHVlIDwgMCkgdmFsdWUgPSAweGZmZmZmZmZmICsgdmFsdWUgKyAxXG4gIGlmIChCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkge1xuICAgIHRoaXNbb2Zmc2V0XSA9ICh2YWx1ZSA+Pj4gMjQpXG4gICAgdGhpc1tvZmZzZXQgKyAxXSA9ICh2YWx1ZSA+Pj4gMTYpXG4gICAgdGhpc1tvZmZzZXQgKyAyXSA9ICh2YWx1ZSA+Pj4gOClcbiAgICB0aGlzW29mZnNldCArIDNdID0gKHZhbHVlICYgMHhmZilcbiAgfSBlbHNlIHtcbiAgICBvYmplY3RXcml0ZVVJbnQzMih0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBmYWxzZSlcbiAgfVxuICByZXR1cm4gb2Zmc2V0ICsgNFxufVxuXG5mdW5jdGlvbiBjaGVja0lFRUU3NTQgKGJ1ZiwgdmFsdWUsIG9mZnNldCwgZXh0LCBtYXgsIG1pbikge1xuICBpZiAob2Zmc2V0ICsgZXh0ID4gYnVmLmxlbmd0aCkgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0luZGV4IG91dCBvZiByYW5nZScpXG4gIGlmIChvZmZzZXQgPCAwKSB0aHJvdyBuZXcgUmFuZ2VFcnJvcignSW5kZXggb3V0IG9mIHJhbmdlJylcbn1cblxuZnVuY3Rpb24gd3JpdGVGbG9hdCAoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICBjaGVja0lFRUU3NTQoYnVmLCB2YWx1ZSwgb2Zmc2V0LCA0LCAzLjQwMjgyMzQ2NjM4NTI4ODZlKzM4LCAtMy40MDI4MjM0NjYzODUyODg2ZSszOClcbiAgfVxuICBpZWVlNzU0LndyaXRlKGJ1ZiwgdmFsdWUsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCAyMywgNClcbiAgcmV0dXJuIG9mZnNldCArIDRcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUZsb2F0TEUgPSBmdW5jdGlvbiB3cml0ZUZsb2F0TEUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHJldHVybiB3cml0ZUZsb2F0KHRoaXMsIHZhbHVlLCBvZmZzZXQsIHRydWUsIG5vQXNzZXJ0KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlRmxvYXRCRSA9IGZ1bmN0aW9uIHdyaXRlRmxvYXRCRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgcmV0dXJuIHdyaXRlRmxvYXQodGhpcywgdmFsdWUsIG9mZnNldCwgZmFsc2UsIG5vQXNzZXJ0KVxufVxuXG5mdW5jdGlvbiB3cml0ZURvdWJsZSAoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICBjaGVja0lFRUU3NTQoYnVmLCB2YWx1ZSwgb2Zmc2V0LCA4LCAxLjc5NzY5MzEzNDg2MjMxNTdFKzMwOCwgLTEuNzk3NjkzMTM0ODYyMzE1N0UrMzA4KVxuICB9XG4gIGllZWU3NTQud3JpdGUoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIDUyLCA4KVxuICByZXR1cm4gb2Zmc2V0ICsgOFxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlRG91YmxlTEUgPSBmdW5jdGlvbiB3cml0ZURvdWJsZUxFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICByZXR1cm4gd3JpdGVEb3VibGUodGhpcywgdmFsdWUsIG9mZnNldCwgdHJ1ZSwgbm9Bc3NlcnQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVEb3VibGVCRSA9IGZ1bmN0aW9uIHdyaXRlRG91YmxlQkUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHJldHVybiB3cml0ZURvdWJsZSh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBmYWxzZSwgbm9Bc3NlcnQpXG59XG5cbi8vIGNvcHkodGFyZ2V0QnVmZmVyLCB0YXJnZXRTdGFydD0wLCBzb3VyY2VTdGFydD0wLCBzb3VyY2VFbmQ9YnVmZmVyLmxlbmd0aClcbkJ1ZmZlci5wcm90b3R5cGUuY29weSA9IGZ1bmN0aW9uIGNvcHkgKHRhcmdldCwgdGFyZ2V0U3RhcnQsIHN0YXJ0LCBlbmQpIHtcbiAgaWYgKCFzdGFydCkgc3RhcnQgPSAwXG4gIGlmICghZW5kICYmIGVuZCAhPT0gMCkgZW5kID0gdGhpcy5sZW5ndGhcbiAgaWYgKHRhcmdldFN0YXJ0ID49IHRhcmdldC5sZW5ndGgpIHRhcmdldFN0YXJ0ID0gdGFyZ2V0Lmxlbmd0aFxuICBpZiAoIXRhcmdldFN0YXJ0KSB0YXJnZXRTdGFydCA9IDBcbiAgaWYgKGVuZCA+IDAgJiYgZW5kIDwgc3RhcnQpIGVuZCA9IHN0YXJ0XG5cbiAgLy8gQ29weSAwIGJ5dGVzOyB3ZSdyZSBkb25lXG4gIGlmIChlbmQgPT09IHN0YXJ0KSByZXR1cm4gMFxuICBpZiAodGFyZ2V0Lmxlbmd0aCA9PT0gMCB8fCB0aGlzLmxlbmd0aCA9PT0gMCkgcmV0dXJuIDBcblxuICAvLyBGYXRhbCBlcnJvciBjb25kaXRpb25zXG4gIGlmICh0YXJnZXRTdGFydCA8IDApIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcigndGFyZ2V0U3RhcnQgb3V0IG9mIGJvdW5kcycpXG4gIH1cbiAgaWYgKHN0YXJ0IDwgMCB8fCBzdGFydCA+PSB0aGlzLmxlbmd0aCkgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ3NvdXJjZVN0YXJ0IG91dCBvZiBib3VuZHMnKVxuICBpZiAoZW5kIDwgMCkgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ3NvdXJjZUVuZCBvdXQgb2YgYm91bmRzJylcblxuICAvLyBBcmUgd2Ugb29iP1xuICBpZiAoZW5kID4gdGhpcy5sZW5ndGgpIGVuZCA9IHRoaXMubGVuZ3RoXG4gIGlmICh0YXJnZXQubGVuZ3RoIC0gdGFyZ2V0U3RhcnQgPCBlbmQgLSBzdGFydCkge1xuICAgIGVuZCA9IHRhcmdldC5sZW5ndGggLSB0YXJnZXRTdGFydCArIHN0YXJ0XG4gIH1cblxuICB2YXIgbGVuID0gZW5kIC0gc3RhcnRcbiAgdmFyIGlcblxuICBpZiAodGhpcyA9PT0gdGFyZ2V0ICYmIHN0YXJ0IDwgdGFyZ2V0U3RhcnQgJiYgdGFyZ2V0U3RhcnQgPCBlbmQpIHtcbiAgICAvLyBkZXNjZW5kaW5nIGNvcHkgZnJvbSBlbmRcbiAgICBmb3IgKGkgPSBsZW4gLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgdGFyZ2V0W2kgKyB0YXJnZXRTdGFydF0gPSB0aGlzW2kgKyBzdGFydF1cbiAgICB9XG4gIH0gZWxzZSBpZiAobGVuIDwgMTAwMCB8fCAhQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHtcbiAgICAvLyBhc2NlbmRpbmcgY29weSBmcm9tIHN0YXJ0XG4gICAgZm9yIChpID0gMDsgaSA8IGxlbjsgKytpKSB7XG4gICAgICB0YXJnZXRbaSArIHRhcmdldFN0YXJ0XSA9IHRoaXNbaSArIHN0YXJ0XVxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBVaW50OEFycmF5LnByb3RvdHlwZS5zZXQuY2FsbChcbiAgICAgIHRhcmdldCxcbiAgICAgIHRoaXMuc3ViYXJyYXkoc3RhcnQsIHN0YXJ0ICsgbGVuKSxcbiAgICAgIHRhcmdldFN0YXJ0XG4gICAgKVxuICB9XG5cbiAgcmV0dXJuIGxlblxufVxuXG4vLyBVc2FnZTpcbi8vICAgIGJ1ZmZlci5maWxsKG51bWJlclssIG9mZnNldFssIGVuZF1dKVxuLy8gICAgYnVmZmVyLmZpbGwoYnVmZmVyWywgb2Zmc2V0WywgZW5kXV0pXG4vLyAgICBidWZmZXIuZmlsbChzdHJpbmdbLCBvZmZzZXRbLCBlbmRdXVssIGVuY29kaW5nXSlcbkJ1ZmZlci5wcm90b3R5cGUuZmlsbCA9IGZ1bmN0aW9uIGZpbGwgKHZhbCwgc3RhcnQsIGVuZCwgZW5jb2RpbmcpIHtcbiAgLy8gSGFuZGxlIHN0cmluZyBjYXNlczpcbiAgaWYgKHR5cGVvZiB2YWwgPT09ICdzdHJpbmcnKSB7XG4gICAgaWYgKHR5cGVvZiBzdGFydCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGVuY29kaW5nID0gc3RhcnRcbiAgICAgIHN0YXJ0ID0gMFxuICAgICAgZW5kID0gdGhpcy5sZW5ndGhcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBlbmQgPT09ICdzdHJpbmcnKSB7XG4gICAgICBlbmNvZGluZyA9IGVuZFxuICAgICAgZW5kID0gdGhpcy5sZW5ndGhcbiAgICB9XG4gICAgaWYgKHZhbC5sZW5ndGggPT09IDEpIHtcbiAgICAgIHZhciBjb2RlID0gdmFsLmNoYXJDb2RlQXQoMClcbiAgICAgIGlmIChjb2RlIDwgMjU2KSB7XG4gICAgICAgIHZhbCA9IGNvZGVcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGVuY29kaW5nICE9PSB1bmRlZmluZWQgJiYgdHlwZW9mIGVuY29kaW5nICE9PSAnc3RyaW5nJykge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignZW5jb2RpbmcgbXVzdCBiZSBhIHN0cmluZycpXG4gICAgfVxuICAgIGlmICh0eXBlb2YgZW5jb2RpbmcgPT09ICdzdHJpbmcnICYmICFCdWZmZXIuaXNFbmNvZGluZyhlbmNvZGluZykpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1Vua25vd24gZW5jb2Rpbmc6ICcgKyBlbmNvZGluZylcbiAgICB9XG4gIH0gZWxzZSBpZiAodHlwZW9mIHZhbCA9PT0gJ251bWJlcicpIHtcbiAgICB2YWwgPSB2YWwgJiAyNTVcbiAgfVxuXG4gIC8vIEludmFsaWQgcmFuZ2VzIGFyZSBub3Qgc2V0IHRvIGEgZGVmYXVsdCwgc28gY2FuIHJhbmdlIGNoZWNrIGVhcmx5LlxuICBpZiAoc3RhcnQgPCAwIHx8IHRoaXMubGVuZ3RoIDwgc3RhcnQgfHwgdGhpcy5sZW5ndGggPCBlbmQpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignT3V0IG9mIHJhbmdlIGluZGV4JylcbiAgfVxuXG4gIGlmIChlbmQgPD0gc3RhcnQpIHtcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgc3RhcnQgPSBzdGFydCA+Pj4gMFxuICBlbmQgPSBlbmQgPT09IHVuZGVmaW5lZCA/IHRoaXMubGVuZ3RoIDogZW5kID4+PiAwXG5cbiAgaWYgKCF2YWwpIHZhbCA9IDBcblxuICB2YXIgaVxuICBpZiAodHlwZW9mIHZhbCA9PT0gJ251bWJlcicpIHtcbiAgICBmb3IgKGkgPSBzdGFydDsgaSA8IGVuZDsgKytpKSB7XG4gICAgICB0aGlzW2ldID0gdmFsXG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHZhciBieXRlcyA9IEJ1ZmZlci5pc0J1ZmZlcih2YWwpXG4gICAgICA/IHZhbFxuICAgICAgOiB1dGY4VG9CeXRlcyhuZXcgQnVmZmVyKHZhbCwgZW5jb2RpbmcpLnRvU3RyaW5nKCkpXG4gICAgdmFyIGxlbiA9IGJ5dGVzLmxlbmd0aFxuICAgIGZvciAoaSA9IDA7IGkgPCBlbmQgLSBzdGFydDsgKytpKSB7XG4gICAgICB0aGlzW2kgKyBzdGFydF0gPSBieXRlc1tpICUgbGVuXVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0aGlzXG59XG5cbi8vIEhFTFBFUiBGVU5DVElPTlNcbi8vID09PT09PT09PT09PT09PT1cblxudmFyIElOVkFMSURfQkFTRTY0X1JFID0gL1teK1xcLzAtOUEtWmEtei1fXS9nXG5cbmZ1bmN0aW9uIGJhc2U2NGNsZWFuIChzdHIpIHtcbiAgLy8gTm9kZSBzdHJpcHMgb3V0IGludmFsaWQgY2hhcmFjdGVycyBsaWtlIFxcbiBhbmQgXFx0IGZyb20gdGhlIHN0cmluZywgYmFzZTY0LWpzIGRvZXMgbm90XG4gIHN0ciA9IHN0cmluZ3RyaW0oc3RyKS5yZXBsYWNlKElOVkFMSURfQkFTRTY0X1JFLCAnJylcbiAgLy8gTm9kZSBjb252ZXJ0cyBzdHJpbmdzIHdpdGggbGVuZ3RoIDwgMiB0byAnJ1xuICBpZiAoc3RyLmxlbmd0aCA8IDIpIHJldHVybiAnJ1xuICAvLyBOb2RlIGFsbG93cyBmb3Igbm9uLXBhZGRlZCBiYXNlNjQgc3RyaW5ncyAobWlzc2luZyB0cmFpbGluZyA9PT0pLCBiYXNlNjQtanMgZG9lcyBub3RcbiAgd2hpbGUgKHN0ci5sZW5ndGggJSA0ICE9PSAwKSB7XG4gICAgc3RyID0gc3RyICsgJz0nXG4gIH1cbiAgcmV0dXJuIHN0clxufVxuXG5mdW5jdGlvbiBzdHJpbmd0cmltIChzdHIpIHtcbiAgaWYgKHN0ci50cmltKSByZXR1cm4gc3RyLnRyaW0oKVxuICByZXR1cm4gc3RyLnJlcGxhY2UoL15cXHMrfFxccyskL2csICcnKVxufVxuXG5mdW5jdGlvbiB0b0hleCAobikge1xuICBpZiAobiA8IDE2KSByZXR1cm4gJzAnICsgbi50b1N0cmluZygxNilcbiAgcmV0dXJuIG4udG9TdHJpbmcoMTYpXG59XG5cbmZ1bmN0aW9uIHV0ZjhUb0J5dGVzIChzdHJpbmcsIHVuaXRzKSB7XG4gIHVuaXRzID0gdW5pdHMgfHwgSW5maW5pdHlcbiAgdmFyIGNvZGVQb2ludFxuICB2YXIgbGVuZ3RoID0gc3RyaW5nLmxlbmd0aFxuICB2YXIgbGVhZFN1cnJvZ2F0ZSA9IG51bGxcbiAgdmFyIGJ5dGVzID0gW11cblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgKytpKSB7XG4gICAgY29kZVBvaW50ID0gc3RyaW5nLmNoYXJDb2RlQXQoaSlcblxuICAgIC8vIGlzIHN1cnJvZ2F0ZSBjb21wb25lbnRcbiAgICBpZiAoY29kZVBvaW50ID4gMHhEN0ZGICYmIGNvZGVQb2ludCA8IDB4RTAwMCkge1xuICAgICAgLy8gbGFzdCBjaGFyIHdhcyBhIGxlYWRcbiAgICAgIGlmICghbGVhZFN1cnJvZ2F0ZSkge1xuICAgICAgICAvLyBubyBsZWFkIHlldFxuICAgICAgICBpZiAoY29kZVBvaW50ID4gMHhEQkZGKSB7XG4gICAgICAgICAgLy8gdW5leHBlY3RlZCB0cmFpbFxuICAgICAgICAgIGlmICgodW5pdHMgLT0gMykgPiAtMSkgYnl0ZXMucHVzaCgweEVGLCAweEJGLCAweEJEKVxuICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgIH0gZWxzZSBpZiAoaSArIDEgPT09IGxlbmd0aCkge1xuICAgICAgICAgIC8vIHVucGFpcmVkIGxlYWRcbiAgICAgICAgICBpZiAoKHVuaXRzIC09IDMpID4gLTEpIGJ5dGVzLnB1c2goMHhFRiwgMHhCRiwgMHhCRClcbiAgICAgICAgICBjb250aW51ZVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gdmFsaWQgbGVhZFxuICAgICAgICBsZWFkU3Vycm9nYXRlID0gY29kZVBvaW50XG5cbiAgICAgICAgY29udGludWVcbiAgICAgIH1cblxuICAgICAgLy8gMiBsZWFkcyBpbiBhIHJvd1xuICAgICAgaWYgKGNvZGVQb2ludCA8IDB4REMwMCkge1xuICAgICAgICBpZiAoKHVuaXRzIC09IDMpID4gLTEpIGJ5dGVzLnB1c2goMHhFRiwgMHhCRiwgMHhCRClcbiAgICAgICAgbGVhZFN1cnJvZ2F0ZSA9IGNvZGVQb2ludFxuICAgICAgICBjb250aW51ZVxuICAgICAgfVxuXG4gICAgICAvLyB2YWxpZCBzdXJyb2dhdGUgcGFpclxuICAgICAgY29kZVBvaW50ID0gKGxlYWRTdXJyb2dhdGUgLSAweEQ4MDAgPDwgMTAgfCBjb2RlUG9pbnQgLSAweERDMDApICsgMHgxMDAwMFxuICAgIH0gZWxzZSBpZiAobGVhZFN1cnJvZ2F0ZSkge1xuICAgICAgLy8gdmFsaWQgYm1wIGNoYXIsIGJ1dCBsYXN0IGNoYXIgd2FzIGEgbGVhZFxuICAgICAgaWYgKCh1bml0cyAtPSAzKSA+IC0xKSBieXRlcy5wdXNoKDB4RUYsIDB4QkYsIDB4QkQpXG4gICAgfVxuXG4gICAgbGVhZFN1cnJvZ2F0ZSA9IG51bGxcblxuICAgIC8vIGVuY29kZSB1dGY4XG4gICAgaWYgKGNvZGVQb2ludCA8IDB4ODApIHtcbiAgICAgIGlmICgodW5pdHMgLT0gMSkgPCAwKSBicmVha1xuICAgICAgYnl0ZXMucHVzaChjb2RlUG9pbnQpXG4gICAgfSBlbHNlIGlmIChjb2RlUG9pbnQgPCAweDgwMCkge1xuICAgICAgaWYgKCh1bml0cyAtPSAyKSA8IDApIGJyZWFrXG4gICAgICBieXRlcy5wdXNoKFxuICAgICAgICBjb2RlUG9pbnQgPj4gMHg2IHwgMHhDMCxcbiAgICAgICAgY29kZVBvaW50ICYgMHgzRiB8IDB4ODBcbiAgICAgIClcbiAgICB9IGVsc2UgaWYgKGNvZGVQb2ludCA8IDB4MTAwMDApIHtcbiAgICAgIGlmICgodW5pdHMgLT0gMykgPCAwKSBicmVha1xuICAgICAgYnl0ZXMucHVzaChcbiAgICAgICAgY29kZVBvaW50ID4+IDB4QyB8IDB4RTAsXG4gICAgICAgIGNvZGVQb2ludCA+PiAweDYgJiAweDNGIHwgMHg4MCxcbiAgICAgICAgY29kZVBvaW50ICYgMHgzRiB8IDB4ODBcbiAgICAgIClcbiAgICB9IGVsc2UgaWYgKGNvZGVQb2ludCA8IDB4MTEwMDAwKSB7XG4gICAgICBpZiAoKHVuaXRzIC09IDQpIDwgMCkgYnJlYWtcbiAgICAgIGJ5dGVzLnB1c2goXG4gICAgICAgIGNvZGVQb2ludCA+PiAweDEyIHwgMHhGMCxcbiAgICAgICAgY29kZVBvaW50ID4+IDB4QyAmIDB4M0YgfCAweDgwLFxuICAgICAgICBjb2RlUG9pbnQgPj4gMHg2ICYgMHgzRiB8IDB4ODAsXG4gICAgICAgIGNvZGVQb2ludCAmIDB4M0YgfCAweDgwXG4gICAgICApXG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBjb2RlIHBvaW50JylcbiAgICB9XG4gIH1cblxuICByZXR1cm4gYnl0ZXNcbn1cblxuZnVuY3Rpb24gYXNjaWlUb0J5dGVzIChzdHIpIHtcbiAgdmFyIGJ5dGVBcnJheSA9IFtdXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3RyLmxlbmd0aDsgKytpKSB7XG4gICAgLy8gTm9kZSdzIGNvZGUgc2VlbXMgdG8gYmUgZG9pbmcgdGhpcyBhbmQgbm90ICYgMHg3Ri4uXG4gICAgYnl0ZUFycmF5LnB1c2goc3RyLmNoYXJDb2RlQXQoaSkgJiAweEZGKVxuICB9XG4gIHJldHVybiBieXRlQXJyYXlcbn1cblxuZnVuY3Rpb24gdXRmMTZsZVRvQnl0ZXMgKHN0ciwgdW5pdHMpIHtcbiAgdmFyIGMsIGhpLCBsb1xuICB2YXIgYnl0ZUFycmF5ID0gW11cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHIubGVuZ3RoOyArK2kpIHtcbiAgICBpZiAoKHVuaXRzIC09IDIpIDwgMCkgYnJlYWtcblxuICAgIGMgPSBzdHIuY2hhckNvZGVBdChpKVxuICAgIGhpID0gYyA+PiA4XG4gICAgbG8gPSBjICUgMjU2XG4gICAgYnl0ZUFycmF5LnB1c2gobG8pXG4gICAgYnl0ZUFycmF5LnB1c2goaGkpXG4gIH1cblxuICByZXR1cm4gYnl0ZUFycmF5XG59XG5cbmZ1bmN0aW9uIGJhc2U2NFRvQnl0ZXMgKHN0cikge1xuICByZXR1cm4gYmFzZTY0LnRvQnl0ZUFycmF5KGJhc2U2NGNsZWFuKHN0cikpXG59XG5cbmZ1bmN0aW9uIGJsaXRCdWZmZXIgKHNyYywgZHN0LCBvZmZzZXQsIGxlbmd0aCkge1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgKytpKSB7XG4gICAgaWYgKChpICsgb2Zmc2V0ID49IGRzdC5sZW5ndGgpIHx8IChpID49IHNyYy5sZW5ndGgpKSBicmVha1xuICAgIGRzdFtpICsgb2Zmc2V0XSA9IHNyY1tpXVxuICB9XG4gIHJldHVybiBpXG59XG5cbmZ1bmN0aW9uIGlzbmFuICh2YWwpIHtcbiAgcmV0dXJuIHZhbCAhPT0gdmFsIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tc2VsZi1jb21wYXJlXG59XG4iLCIvLyBDb3B5cmlnaHQgSm95ZW50LCBJbmMuIGFuZCBvdGhlciBOb2RlIGNvbnRyaWJ1dG9ycy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYVxuLy8gY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZVxuLy8gXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nXG4vLyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsXG4vLyBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0XG4vLyBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGVcbi8vIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkXG4vLyBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTXG4vLyBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GXG4vLyBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOXG4vLyBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSxcbi8vIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUlxuLy8gT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRVxuLy8gVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cblxuLy8gTk9URTogVGhlc2UgdHlwZSBjaGVja2luZyBmdW5jdGlvbnMgaW50ZW50aW9uYWxseSBkb24ndCB1c2UgYGluc3RhbmNlb2ZgXG4vLyBiZWNhdXNlIGl0IGlzIGZyYWdpbGUgYW5kIGNhbiBiZSBlYXNpbHkgZmFrZWQgd2l0aCBgT2JqZWN0LmNyZWF0ZSgpYC5cblxuZnVuY3Rpb24gaXNBcnJheShhcmcpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkpIHtcbiAgICByZXR1cm4gQXJyYXkuaXNBcnJheShhcmcpO1xuICB9XG4gIHJldHVybiBvYmplY3RUb1N0cmluZyhhcmcpID09PSAnW29iamVjdCBBcnJheV0nO1xufVxuZXhwb3J0cy5pc0FycmF5ID0gaXNBcnJheTtcblxuZnVuY3Rpb24gaXNCb29sZWFuKGFyZykge1xuICByZXR1cm4gdHlwZW9mIGFyZyA9PT0gJ2Jvb2xlYW4nO1xufVxuZXhwb3J0cy5pc0Jvb2xlYW4gPSBpc0Jvb2xlYW47XG5cbmZ1bmN0aW9uIGlzTnVsbChhcmcpIHtcbiAgcmV0dXJuIGFyZyA9PT0gbnVsbDtcbn1cbmV4cG9ydHMuaXNOdWxsID0gaXNOdWxsO1xuXG5mdW5jdGlvbiBpc051bGxPclVuZGVmaW5lZChhcmcpIHtcbiAgcmV0dXJuIGFyZyA9PSBudWxsO1xufVxuZXhwb3J0cy5pc051bGxPclVuZGVmaW5lZCA9IGlzTnVsbE9yVW5kZWZpbmVkO1xuXG5mdW5jdGlvbiBpc051bWJlcihhcmcpIHtcbiAgcmV0dXJuIHR5cGVvZiBhcmcgPT09ICdudW1iZXInO1xufVxuZXhwb3J0cy5pc051bWJlciA9IGlzTnVtYmVyO1xuXG5mdW5jdGlvbiBpc1N0cmluZyhhcmcpIHtcbiAgcmV0dXJuIHR5cGVvZiBhcmcgPT09ICdzdHJpbmcnO1xufVxuZXhwb3J0cy5pc1N0cmluZyA9IGlzU3RyaW5nO1xuXG5mdW5jdGlvbiBpc1N5bWJvbChhcmcpIHtcbiAgcmV0dXJuIHR5cGVvZiBhcmcgPT09ICdzeW1ib2wnO1xufVxuZXhwb3J0cy5pc1N5bWJvbCA9IGlzU3ltYm9sO1xuXG5mdW5jdGlvbiBpc1VuZGVmaW5lZChhcmcpIHtcbiAgcmV0dXJuIGFyZyA9PT0gdm9pZCAwO1xufVxuZXhwb3J0cy5pc1VuZGVmaW5lZCA9IGlzVW5kZWZpbmVkO1xuXG5mdW5jdGlvbiBpc1JlZ0V4cChyZSkge1xuICByZXR1cm4gb2JqZWN0VG9TdHJpbmcocmUpID09PSAnW29iamVjdCBSZWdFeHBdJztcbn1cbmV4cG9ydHMuaXNSZWdFeHAgPSBpc1JlZ0V4cDtcblxuZnVuY3Rpb24gaXNPYmplY3QoYXJnKSB7XG4gIHJldHVybiB0eXBlb2YgYXJnID09PSAnb2JqZWN0JyAmJiBhcmcgIT09IG51bGw7XG59XG5leHBvcnRzLmlzT2JqZWN0ID0gaXNPYmplY3Q7XG5cbmZ1bmN0aW9uIGlzRGF0ZShkKSB7XG4gIHJldHVybiBvYmplY3RUb1N0cmluZyhkKSA9PT0gJ1tvYmplY3QgRGF0ZV0nO1xufVxuZXhwb3J0cy5pc0RhdGUgPSBpc0RhdGU7XG5cbmZ1bmN0aW9uIGlzRXJyb3IoZSkge1xuICByZXR1cm4gKG9iamVjdFRvU3RyaW5nKGUpID09PSAnW29iamVjdCBFcnJvcl0nIHx8IGUgaW5zdGFuY2VvZiBFcnJvcik7XG59XG5leHBvcnRzLmlzRXJyb3IgPSBpc0Vycm9yO1xuXG5mdW5jdGlvbiBpc0Z1bmN0aW9uKGFyZykge1xuICByZXR1cm4gdHlwZW9mIGFyZyA9PT0gJ2Z1bmN0aW9uJztcbn1cbmV4cG9ydHMuaXNGdW5jdGlvbiA9IGlzRnVuY3Rpb247XG5cbmZ1bmN0aW9uIGlzUHJpbWl0aXZlKGFyZykge1xuICByZXR1cm4gYXJnID09PSBudWxsIHx8XG4gICAgICAgICB0eXBlb2YgYXJnID09PSAnYm9vbGVhbicgfHxcbiAgICAgICAgIHR5cGVvZiBhcmcgPT09ICdudW1iZXInIHx8XG4gICAgICAgICB0eXBlb2YgYXJnID09PSAnc3RyaW5nJyB8fFxuICAgICAgICAgdHlwZW9mIGFyZyA9PT0gJ3N5bWJvbCcgfHwgIC8vIEVTNiBzeW1ib2xcbiAgICAgICAgIHR5cGVvZiBhcmcgPT09ICd1bmRlZmluZWQnO1xufVxuZXhwb3J0cy5pc1ByaW1pdGl2ZSA9IGlzUHJpbWl0aXZlO1xuXG5leHBvcnRzLmlzQnVmZmVyID0gQnVmZmVyLmlzQnVmZmVyO1xuXG5mdW5jdGlvbiBvYmplY3RUb1N0cmluZyhvKSB7XG4gIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobyk7XG59XG4iLCIvKlxuICBNb2R1bGUgZGVwZW5kZW5jaWVzXG4qL1xudmFyIEVsZW1lbnRUeXBlID0gcmVxdWlyZSgnZG9tZWxlbWVudHR5cGUnKTtcbnZhciBlbnRpdGllcyA9IHJlcXVpcmUoJ2VudGl0aWVzJyk7XG5cbi8qXG4gIEJvb2xlYW4gQXR0cmlidXRlc1xuKi9cbnZhciBib29sZWFuQXR0cmlidXRlcyA9IHtcbiAgX19wcm90b19fOiBudWxsLFxuICBhbGxvd2Z1bGxzY3JlZW46IHRydWUsXG4gIGFzeW5jOiB0cnVlLFxuICBhdXRvZm9jdXM6IHRydWUsXG4gIGF1dG9wbGF5OiB0cnVlLFxuICBjaGVja2VkOiB0cnVlLFxuICBjb250cm9sczogdHJ1ZSxcbiAgZGVmYXVsdDogdHJ1ZSxcbiAgZGVmZXI6IHRydWUsXG4gIGRpc2FibGVkOiB0cnVlLFxuICBoaWRkZW46IHRydWUsXG4gIGlzbWFwOiB0cnVlLFxuICBsb29wOiB0cnVlLFxuICBtdWx0aXBsZTogdHJ1ZSxcbiAgbXV0ZWQ6IHRydWUsXG4gIG9wZW46IHRydWUsXG4gIHJlYWRvbmx5OiB0cnVlLFxuICByZXF1aXJlZDogdHJ1ZSxcbiAgcmV2ZXJzZWQ6IHRydWUsXG4gIHNjb3BlZDogdHJ1ZSxcbiAgc2VhbWxlc3M6IHRydWUsXG4gIHNlbGVjdGVkOiB0cnVlLFxuICB0eXBlbXVzdG1hdGNoOiB0cnVlXG59O1xuXG52YXIgdW5lbmNvZGVkRWxlbWVudHMgPSB7XG4gIF9fcHJvdG9fXzogbnVsbCxcbiAgc3R5bGU6IHRydWUsXG4gIHNjcmlwdDogdHJ1ZSxcbiAgeG1wOiB0cnVlLFxuICBpZnJhbWU6IHRydWUsXG4gIG5vZW1iZWQ6IHRydWUsXG4gIG5vZnJhbWVzOiB0cnVlLFxuICBwbGFpbnRleHQ6IHRydWUsXG4gIG5vc2NyaXB0OiB0cnVlXG59O1xuXG4vKlxuICBGb3JtYXQgYXR0cmlidXRlc1xuKi9cbmZ1bmN0aW9uIGZvcm1hdEF0dHJzKGF0dHJpYnV0ZXMsIG9wdHMpIHtcbiAgaWYgKCFhdHRyaWJ1dGVzKSByZXR1cm47XG5cbiAgdmFyIG91dHB1dCA9ICcnLFxuICAgICAgdmFsdWU7XG5cbiAgLy8gTG9vcCB0aHJvdWdoIHRoZSBhdHRyaWJ1dGVzXG4gIGZvciAodmFyIGtleSBpbiBhdHRyaWJ1dGVzKSB7XG4gICAgdmFsdWUgPSBhdHRyaWJ1dGVzW2tleV07XG4gICAgaWYgKG91dHB1dCkge1xuICAgICAgb3V0cHV0ICs9ICcgJztcbiAgICB9XG5cbiAgICBpZiAoIXZhbHVlICYmIGJvb2xlYW5BdHRyaWJ1dGVzW2tleV0pIHtcbiAgICAgIG91dHB1dCArPSBrZXk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG91dHB1dCArPSBrZXkgKyAnPVwiJyArIChvcHRzLmRlY29kZUVudGl0aWVzID8gZW50aXRpZXMuZW5jb2RlWE1MKHZhbHVlKSA6IHZhbHVlKSArICdcIic7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG91dHB1dDtcbn1cblxuLypcbiAgU2VsZi1lbmNsb3NpbmcgdGFncyAoc3RvbGVuIGZyb20gbm9kZS1odG1scGFyc2VyKVxuKi9cbnZhciBzaW5nbGVUYWcgPSB7XG4gIF9fcHJvdG9fXzogbnVsbCxcbiAgYXJlYTogdHJ1ZSxcbiAgYmFzZTogdHJ1ZSxcbiAgYmFzZWZvbnQ6IHRydWUsXG4gIGJyOiB0cnVlLFxuICBjb2w6IHRydWUsXG4gIGNvbW1hbmQ6IHRydWUsXG4gIGVtYmVkOiB0cnVlLFxuICBmcmFtZTogdHJ1ZSxcbiAgaHI6IHRydWUsXG4gIGltZzogdHJ1ZSxcbiAgaW5wdXQ6IHRydWUsXG4gIGlzaW5kZXg6IHRydWUsXG4gIGtleWdlbjogdHJ1ZSxcbiAgbGluazogdHJ1ZSxcbiAgbWV0YTogdHJ1ZSxcbiAgcGFyYW06IHRydWUsXG4gIHNvdXJjZTogdHJ1ZSxcbiAgdHJhY2s6IHRydWUsXG4gIHdicjogdHJ1ZSxcbn07XG5cblxudmFyIHJlbmRlciA9IG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oZG9tLCBvcHRzKSB7XG4gIGlmICghQXJyYXkuaXNBcnJheShkb20pICYmICFkb20uY2hlZXJpbykgZG9tID0gW2RvbV07XG4gIG9wdHMgPSBvcHRzIHx8IHt9O1xuXG4gIHZhciBvdXRwdXQgPSAnJztcblxuICBmb3IodmFyIGkgPSAwOyBpIDwgZG9tLmxlbmd0aDsgaSsrKXtcbiAgICB2YXIgZWxlbSA9IGRvbVtpXTtcblxuICAgIGlmIChlbGVtLnR5cGUgPT09ICdyb290JylcbiAgICAgIG91dHB1dCArPSByZW5kZXIoZWxlbS5jaGlsZHJlbiwgb3B0cyk7XG4gICAgZWxzZSBpZiAoRWxlbWVudFR5cGUuaXNUYWcoZWxlbSkpXG4gICAgICBvdXRwdXQgKz0gcmVuZGVyVGFnKGVsZW0sIG9wdHMpO1xuICAgIGVsc2UgaWYgKGVsZW0udHlwZSA9PT0gRWxlbWVudFR5cGUuRGlyZWN0aXZlKVxuICAgICAgb3V0cHV0ICs9IHJlbmRlckRpcmVjdGl2ZShlbGVtKTtcbiAgICBlbHNlIGlmIChlbGVtLnR5cGUgPT09IEVsZW1lbnRUeXBlLkNvbW1lbnQpXG4gICAgICBvdXRwdXQgKz0gcmVuZGVyQ29tbWVudChlbGVtKTtcbiAgICBlbHNlIGlmIChlbGVtLnR5cGUgPT09IEVsZW1lbnRUeXBlLkNEQVRBKVxuICAgICAgb3V0cHV0ICs9IHJlbmRlckNkYXRhKGVsZW0pO1xuICAgIGVsc2VcbiAgICAgIG91dHB1dCArPSByZW5kZXJUZXh0KGVsZW0sIG9wdHMpO1xuICB9XG5cbiAgcmV0dXJuIG91dHB1dDtcbn07XG5cbmZ1bmN0aW9uIHJlbmRlclRhZyhlbGVtLCBvcHRzKSB7XG4gIC8vIEhhbmRsZSBTVkdcbiAgaWYgKGVsZW0ubmFtZSA9PT0gXCJzdmdcIikgb3B0cyA9IHtkZWNvZGVFbnRpdGllczogb3B0cy5kZWNvZGVFbnRpdGllcywgeG1sTW9kZTogdHJ1ZX07XG5cbiAgdmFyIHRhZyA9ICc8JyArIGVsZW0ubmFtZSxcbiAgICAgIGF0dHJpYnMgPSBmb3JtYXRBdHRycyhlbGVtLmF0dHJpYnMsIG9wdHMpO1xuXG4gIGlmIChhdHRyaWJzKSB7XG4gICAgdGFnICs9ICcgJyArIGF0dHJpYnM7XG4gIH1cblxuICBpZiAoXG4gICAgb3B0cy54bWxNb2RlXG4gICAgJiYgKCFlbGVtLmNoaWxkcmVuIHx8IGVsZW0uY2hpbGRyZW4ubGVuZ3RoID09PSAwKVxuICApIHtcbiAgICB0YWcgKz0gJy8+JztcbiAgfSBlbHNlIHtcbiAgICB0YWcgKz0gJz4nO1xuICAgIGlmIChlbGVtLmNoaWxkcmVuKSB7XG4gICAgICB0YWcgKz0gcmVuZGVyKGVsZW0uY2hpbGRyZW4sIG9wdHMpO1xuICAgIH1cblxuICAgIGlmICghc2luZ2xlVGFnW2VsZW0ubmFtZV0gfHwgb3B0cy54bWxNb2RlKSB7XG4gICAgICB0YWcgKz0gJzwvJyArIGVsZW0ubmFtZSArICc+JztcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdGFnO1xufVxuXG5mdW5jdGlvbiByZW5kZXJEaXJlY3RpdmUoZWxlbSkge1xuICByZXR1cm4gJzwnICsgZWxlbS5kYXRhICsgJz4nO1xufVxuXG5mdW5jdGlvbiByZW5kZXJUZXh0KGVsZW0sIG9wdHMpIHtcbiAgdmFyIGRhdGEgPSBlbGVtLmRhdGEgfHwgJyc7XG5cbiAgLy8gaWYgZW50aXRpZXMgd2VyZW4ndCBkZWNvZGVkLCBubyBuZWVkIHRvIGVuY29kZSB0aGVtIGJhY2tcbiAgaWYgKG9wdHMuZGVjb2RlRW50aXRpZXMgJiYgIShlbGVtLnBhcmVudCAmJiBlbGVtLnBhcmVudC5uYW1lIGluIHVuZW5jb2RlZEVsZW1lbnRzKSkge1xuICAgIGRhdGEgPSBlbnRpdGllcy5lbmNvZGVYTUwoZGF0YSk7XG4gIH1cblxuICByZXR1cm4gZGF0YTtcbn1cblxuZnVuY3Rpb24gcmVuZGVyQ2RhdGEoZWxlbSkge1xuICByZXR1cm4gJzwhW0NEQVRBWycgKyBlbGVtLmNoaWxkcmVuWzBdLmRhdGEgKyAnXV0+Jztcbn1cblxuZnVuY3Rpb24gcmVuZGVyQ29tbWVudChlbGVtKSB7XG4gIHJldHVybiAnPCEtLScgKyBlbGVtLmRhdGEgKyAnLS0+Jztcbn1cbiIsIi8vVHlwZXMgb2YgZWxlbWVudHMgZm91bmQgaW4gdGhlIERPTVxubW9kdWxlLmV4cG9ydHMgPSB7XG5cdFRleHQ6IFwidGV4dFwiLCAvL1RleHRcblx0RGlyZWN0aXZlOiBcImRpcmVjdGl2ZVwiLCAvLzw/IC4uLiA/PlxuXHRDb21tZW50OiBcImNvbW1lbnRcIiwgLy88IS0tIC4uLiAtLT5cblx0U2NyaXB0OiBcInNjcmlwdFwiLCAvLzxzY3JpcHQ+IHRhZ3Ncblx0U3R5bGU6IFwic3R5bGVcIiwgLy88c3R5bGU+IHRhZ3Ncblx0VGFnOiBcInRhZ1wiLCAvL0FueSB0YWdcblx0Q0RBVEE6IFwiY2RhdGFcIiwgLy88IVtDREFUQVsgLi4uIF1dPlxuXG5cdGlzVGFnOiBmdW5jdGlvbihlbGVtKXtcblx0XHRyZXR1cm4gZWxlbS50eXBlID09PSBcInRhZ1wiIHx8IGVsZW0udHlwZSA9PT0gXCJzY3JpcHRcIiB8fCBlbGVtLnR5cGUgPT09IFwic3R5bGVcIjtcblx0fVxufTsiLCJ2YXIgZW5jb2RlID0gcmVxdWlyZShcIi4vbGliL2VuY29kZS5qc1wiKSxcbiAgICBkZWNvZGUgPSByZXF1aXJlKFwiLi9saWIvZGVjb2RlLmpzXCIpO1xuXG5leHBvcnRzLmRlY29kZSA9IGZ1bmN0aW9uKGRhdGEsIGxldmVsKXtcblx0cmV0dXJuICghbGV2ZWwgfHwgbGV2ZWwgPD0gMCA/IGRlY29kZS5YTUwgOiBkZWNvZGUuSFRNTCkoZGF0YSk7XG59O1xuXG5leHBvcnRzLmRlY29kZVN0cmljdCA9IGZ1bmN0aW9uKGRhdGEsIGxldmVsKXtcblx0cmV0dXJuICghbGV2ZWwgfHwgbGV2ZWwgPD0gMCA/IGRlY29kZS5YTUwgOiBkZWNvZGUuSFRNTFN0cmljdCkoZGF0YSk7XG59O1xuXG5leHBvcnRzLmVuY29kZSA9IGZ1bmN0aW9uKGRhdGEsIGxldmVsKXtcblx0cmV0dXJuICghbGV2ZWwgfHwgbGV2ZWwgPD0gMCA/IGVuY29kZS5YTUwgOiBlbmNvZGUuSFRNTCkoZGF0YSk7XG59O1xuXG5leHBvcnRzLmVuY29kZVhNTCA9IGVuY29kZS5YTUw7XG5cbmV4cG9ydHMuZW5jb2RlSFRNTDQgPVxuZXhwb3J0cy5lbmNvZGVIVE1MNSA9XG5leHBvcnRzLmVuY29kZUhUTUwgID0gZW5jb2RlLkhUTUw7XG5cbmV4cG9ydHMuZGVjb2RlWE1MID1cbmV4cG9ydHMuZGVjb2RlWE1MU3RyaWN0ID0gZGVjb2RlLlhNTDtcblxuZXhwb3J0cy5kZWNvZGVIVE1MNCA9XG5leHBvcnRzLmRlY29kZUhUTUw1ID1cbmV4cG9ydHMuZGVjb2RlSFRNTCA9IGRlY29kZS5IVE1MO1xuXG5leHBvcnRzLmRlY29kZUhUTUw0U3RyaWN0ID1cbmV4cG9ydHMuZGVjb2RlSFRNTDVTdHJpY3QgPVxuZXhwb3J0cy5kZWNvZGVIVE1MU3RyaWN0ID0gZGVjb2RlLkhUTUxTdHJpY3Q7XG5cbmV4cG9ydHMuZXNjYXBlID0gZW5jb2RlLmVzY2FwZTtcbiIsInZhciBlbnRpdHlNYXAgPSByZXF1aXJlKFwiLi4vbWFwcy9lbnRpdGllcy5qc29uXCIpLFxuICAgIGxlZ2FjeU1hcCA9IHJlcXVpcmUoXCIuLi9tYXBzL2xlZ2FjeS5qc29uXCIpLFxuICAgIHhtbE1hcCAgICA9IHJlcXVpcmUoXCIuLi9tYXBzL3htbC5qc29uXCIpLFxuICAgIGRlY29kZUNvZGVQb2ludCA9IHJlcXVpcmUoXCIuL2RlY29kZV9jb2RlcG9pbnQuanNcIik7XG5cbnZhciBkZWNvZGVYTUxTdHJpY3QgID0gZ2V0U3RyaWN0RGVjb2Rlcih4bWxNYXApLFxuICAgIGRlY29kZUhUTUxTdHJpY3QgPSBnZXRTdHJpY3REZWNvZGVyKGVudGl0eU1hcCk7XG5cbmZ1bmN0aW9uIGdldFN0cmljdERlY29kZXIobWFwKXtcblx0dmFyIGtleXMgPSBPYmplY3Qua2V5cyhtYXApLmpvaW4oXCJ8XCIpLFxuXHQgICAgcmVwbGFjZSA9IGdldFJlcGxhY2VyKG1hcCk7XG5cblx0a2V5cyArPSBcInwjW3hYXVtcXFxcZGEtZkEtRl0rfCNcXFxcZCtcIjtcblxuXHR2YXIgcmUgPSBuZXcgUmVnRXhwKFwiJig/OlwiICsga2V5cyArIFwiKTtcIiwgXCJnXCIpO1xuXG5cdHJldHVybiBmdW5jdGlvbihzdHIpe1xuXHRcdHJldHVybiBTdHJpbmcoc3RyKS5yZXBsYWNlKHJlLCByZXBsYWNlKTtcblx0fTtcbn1cblxudmFyIGRlY29kZUhUTUwgPSAoZnVuY3Rpb24oKXtcblx0dmFyIGxlZ2FjeSA9IE9iamVjdC5rZXlzKGxlZ2FjeU1hcClcblx0XHQuc29ydChzb3J0ZXIpO1xuXG5cdHZhciBrZXlzID0gT2JqZWN0LmtleXMoZW50aXR5TWFwKVxuXHRcdC5zb3J0KHNvcnRlcik7XG5cblx0Zm9yKHZhciBpID0gMCwgaiA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgaSsrKXtcblx0XHRpZihsZWdhY3lbal0gPT09IGtleXNbaV0pe1xuXHRcdFx0a2V5c1tpXSArPSBcIjs/XCI7XG5cdFx0XHRqKys7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGtleXNbaV0gKz0gXCI7XCI7XG5cdFx0fVxuXHR9XG5cblx0dmFyIHJlID0gbmV3IFJlZ0V4cChcIiYoPzpcIiArIGtleXMuam9pbihcInxcIikgKyBcInwjW3hYXVtcXFxcZGEtZkEtRl0rOz98I1xcXFxkKzs/KVwiLCBcImdcIiksXG5cdCAgICByZXBsYWNlID0gZ2V0UmVwbGFjZXIoZW50aXR5TWFwKTtcblxuXHRmdW5jdGlvbiByZXBsYWNlcihzdHIpe1xuXHRcdGlmKHN0ci5zdWJzdHIoLTEpICE9PSBcIjtcIikgc3RyICs9IFwiO1wiO1xuXHRcdHJldHVybiByZXBsYWNlKHN0cik7XG5cdH1cblxuXHQvL1RPRE8gY29uc2lkZXIgY3JlYXRpbmcgYSBtZXJnZWQgbWFwXG5cdHJldHVybiBmdW5jdGlvbihzdHIpe1xuXHRcdHJldHVybiBTdHJpbmcoc3RyKS5yZXBsYWNlKHJlLCByZXBsYWNlcik7XG5cdH07XG59KCkpO1xuXG5mdW5jdGlvbiBzb3J0ZXIoYSwgYil7XG5cdHJldHVybiBhIDwgYiA/IDEgOiAtMTtcbn1cblxuZnVuY3Rpb24gZ2V0UmVwbGFjZXIobWFwKXtcblx0cmV0dXJuIGZ1bmN0aW9uIHJlcGxhY2Uoc3RyKXtcblx0XHRpZihzdHIuY2hhckF0KDEpID09PSBcIiNcIil7XG5cdFx0XHRpZihzdHIuY2hhckF0KDIpID09PSBcIlhcIiB8fCBzdHIuY2hhckF0KDIpID09PSBcInhcIil7XG5cdFx0XHRcdHJldHVybiBkZWNvZGVDb2RlUG9pbnQocGFyc2VJbnQoc3RyLnN1YnN0cigzKSwgMTYpKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBkZWNvZGVDb2RlUG9pbnQocGFyc2VJbnQoc3RyLnN1YnN0cigyKSwgMTApKTtcblx0XHR9XG5cdFx0cmV0dXJuIG1hcFtzdHIuc2xpY2UoMSwgLTEpXTtcblx0fTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG5cdFhNTDogZGVjb2RlWE1MU3RyaWN0LFxuXHRIVE1MOiBkZWNvZGVIVE1MLFxuXHRIVE1MU3RyaWN0OiBkZWNvZGVIVE1MU3RyaWN0XG59OyIsInZhciBkZWNvZGVNYXAgPSByZXF1aXJlKFwiLi4vbWFwcy9kZWNvZGUuanNvblwiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBkZWNvZGVDb2RlUG9pbnQ7XG5cbi8vIG1vZGlmaWVkIHZlcnNpb24gb2YgaHR0cHM6Ly9naXRodWIuY29tL21hdGhpYXNieW5lbnMvaGUvYmxvYi9tYXN0ZXIvc3JjL2hlLmpzI0w5NC1MMTE5XG5mdW5jdGlvbiBkZWNvZGVDb2RlUG9pbnQoY29kZVBvaW50KXtcblxuXHRpZigoY29kZVBvaW50ID49IDB4RDgwMCAmJiBjb2RlUG9pbnQgPD0gMHhERkZGKSB8fCBjb2RlUG9pbnQgPiAweDEwRkZGRil7XG5cdFx0cmV0dXJuIFwiXFx1RkZGRFwiO1xuXHR9XG5cblx0aWYoY29kZVBvaW50IGluIGRlY29kZU1hcCl7XG5cdFx0Y29kZVBvaW50ID0gZGVjb2RlTWFwW2NvZGVQb2ludF07XG5cdH1cblxuXHR2YXIgb3V0cHV0ID0gXCJcIjtcblxuXHRpZihjb2RlUG9pbnQgPiAweEZGRkYpe1xuXHRcdGNvZGVQb2ludCAtPSAweDEwMDAwO1xuXHRcdG91dHB1dCArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGNvZGVQb2ludCA+Pj4gMTAgJiAweDNGRiB8IDB4RDgwMCk7XG5cdFx0Y29kZVBvaW50ID0gMHhEQzAwIHwgY29kZVBvaW50ICYgMHgzRkY7XG5cdH1cblxuXHRvdXRwdXQgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShjb2RlUG9pbnQpO1xuXHRyZXR1cm4gb3V0cHV0O1xufVxuIiwidmFyIGludmVyc2VYTUwgPSBnZXRJbnZlcnNlT2JqKHJlcXVpcmUoXCIuLi9tYXBzL3htbC5qc29uXCIpKSxcbiAgICB4bWxSZXBsYWNlciA9IGdldEludmVyc2VSZXBsYWNlcihpbnZlcnNlWE1MKTtcblxuZXhwb3J0cy5YTUwgPSBnZXRJbnZlcnNlKGludmVyc2VYTUwsIHhtbFJlcGxhY2VyKTtcblxudmFyIGludmVyc2VIVE1MID0gZ2V0SW52ZXJzZU9iaihyZXF1aXJlKFwiLi4vbWFwcy9lbnRpdGllcy5qc29uXCIpKSxcbiAgICBodG1sUmVwbGFjZXIgPSBnZXRJbnZlcnNlUmVwbGFjZXIoaW52ZXJzZUhUTUwpO1xuXG5leHBvcnRzLkhUTUwgPSBnZXRJbnZlcnNlKGludmVyc2VIVE1MLCBodG1sUmVwbGFjZXIpO1xuXG5mdW5jdGlvbiBnZXRJbnZlcnNlT2JqKG9iail7XG5cdHJldHVybiBPYmplY3Qua2V5cyhvYmopLnNvcnQoKS5yZWR1Y2UoZnVuY3Rpb24oaW52ZXJzZSwgbmFtZSl7XG5cdFx0aW52ZXJzZVtvYmpbbmFtZV1dID0gXCImXCIgKyBuYW1lICsgXCI7XCI7XG5cdFx0cmV0dXJuIGludmVyc2U7XG5cdH0sIHt9KTtcbn1cblxuZnVuY3Rpb24gZ2V0SW52ZXJzZVJlcGxhY2VyKGludmVyc2Upe1xuXHR2YXIgc2luZ2xlID0gW10sXG5cdCAgICBtdWx0aXBsZSA9IFtdO1xuXG5cdE9iamVjdC5rZXlzKGludmVyc2UpLmZvckVhY2goZnVuY3Rpb24oayl7XG5cdFx0aWYoay5sZW5ndGggPT09IDEpe1xuXHRcdFx0c2luZ2xlLnB1c2goXCJcXFxcXCIgKyBrKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0bXVsdGlwbGUucHVzaChrKTtcblx0XHR9XG5cdH0pO1xuXG5cdC8vVE9ETyBhZGQgcmFuZ2VzXG5cdG11bHRpcGxlLnVuc2hpZnQoXCJbXCIgKyBzaW5nbGUuam9pbihcIlwiKSArIFwiXVwiKTtcblxuXHRyZXR1cm4gbmV3IFJlZ0V4cChtdWx0aXBsZS5qb2luKFwifFwiKSwgXCJnXCIpO1xufVxuXG52YXIgcmVfbm9uQVNDSUkgPSAvW15cXDAtXFx4N0ZdL2csXG4gICAgcmVfYXN0cmFsU3ltYm9scyA9IC9bXFx1RDgwMC1cXHVEQkZGXVtcXHVEQzAwLVxcdURGRkZdL2c7XG5cbmZ1bmN0aW9uIHNpbmdsZUNoYXJSZXBsYWNlcihjKXtcblx0cmV0dXJuIFwiJiN4XCIgKyBjLmNoYXJDb2RlQXQoMCkudG9TdHJpbmcoMTYpLnRvVXBwZXJDYXNlKCkgKyBcIjtcIjtcbn1cblxuZnVuY3Rpb24gYXN0cmFsUmVwbGFjZXIoYyl7XG5cdC8vIGh0dHA6Ly9tYXRoaWFzYnluZW5zLmJlL25vdGVzL2phdmFzY3JpcHQtZW5jb2Rpbmcjc3Vycm9nYXRlLWZvcm11bGFlXG5cdHZhciBoaWdoID0gYy5jaGFyQ29kZUF0KDApO1xuXHR2YXIgbG93ICA9IGMuY2hhckNvZGVBdCgxKTtcblx0dmFyIGNvZGVQb2ludCA9IChoaWdoIC0gMHhEODAwKSAqIDB4NDAwICsgbG93IC0gMHhEQzAwICsgMHgxMDAwMDtcblx0cmV0dXJuIFwiJiN4XCIgKyBjb2RlUG9pbnQudG9TdHJpbmcoMTYpLnRvVXBwZXJDYXNlKCkgKyBcIjtcIjtcbn1cblxuZnVuY3Rpb24gZ2V0SW52ZXJzZShpbnZlcnNlLCByZSl7XG5cdGZ1bmN0aW9uIGZ1bmMobmFtZSl7XG5cdFx0cmV0dXJuIGludmVyc2VbbmFtZV07XG5cdH1cblxuXHRyZXR1cm4gZnVuY3Rpb24oZGF0YSl7XG5cdFx0cmV0dXJuIGRhdGFcblx0XHRcdFx0LnJlcGxhY2UocmUsIGZ1bmMpXG5cdFx0XHRcdC5yZXBsYWNlKHJlX2FzdHJhbFN5bWJvbHMsIGFzdHJhbFJlcGxhY2VyKVxuXHRcdFx0XHQucmVwbGFjZShyZV9ub25BU0NJSSwgc2luZ2xlQ2hhclJlcGxhY2VyKTtcblx0fTtcbn1cblxudmFyIHJlX3htbENoYXJzID0gZ2V0SW52ZXJzZVJlcGxhY2VyKGludmVyc2VYTUwpO1xuXG5mdW5jdGlvbiBlc2NhcGVYTUwoZGF0YSl7XG5cdHJldHVybiBkYXRhXG5cdFx0XHQucmVwbGFjZShyZV94bWxDaGFycywgc2luZ2xlQ2hhclJlcGxhY2VyKVxuXHRcdFx0LnJlcGxhY2UocmVfYXN0cmFsU3ltYm9scywgYXN0cmFsUmVwbGFjZXIpXG5cdFx0XHQucmVwbGFjZShyZV9ub25BU0NJSSwgc2luZ2xlQ2hhclJlcGxhY2VyKTtcbn1cblxuZXhwb3J0cy5lc2NhcGUgPSBlc2NhcGVYTUw7XG4iLCJtb2R1bGUuZXhwb3J0cz17XCIwXCI6NjU1MzMsXCIxMjhcIjo4MzY0LFwiMTMwXCI6ODIxOCxcIjEzMVwiOjQwMixcIjEzMlwiOjgyMjIsXCIxMzNcIjo4MjMwLFwiMTM0XCI6ODIyNCxcIjEzNVwiOjgyMjUsXCIxMzZcIjo3MTAsXCIxMzdcIjo4MjQwLFwiMTM4XCI6MzUyLFwiMTM5XCI6ODI0OSxcIjE0MFwiOjMzOCxcIjE0MlwiOjM4MSxcIjE0NVwiOjgyMTYsXCIxNDZcIjo4MjE3LFwiMTQ3XCI6ODIyMCxcIjE0OFwiOjgyMjEsXCIxNDlcIjo4MjI2LFwiMTUwXCI6ODIxMSxcIjE1MVwiOjgyMTIsXCIxNTJcIjo3MzIsXCIxNTNcIjo4NDgyLFwiMTU0XCI6MzUzLFwiMTU1XCI6ODI1MCxcIjE1NlwiOjMzOSxcIjE1OFwiOjM4MixcIjE1OVwiOjM3Nn0iLCJtb2R1bGUuZXhwb3J0cz17XCJBYWN1dGVcIjpcIlxcdTAwQzFcIixcImFhY3V0ZVwiOlwiXFx1MDBFMVwiLFwiQWJyZXZlXCI6XCJcXHUwMTAyXCIsXCJhYnJldmVcIjpcIlxcdTAxMDNcIixcImFjXCI6XCJcXHUyMjNFXCIsXCJhY2RcIjpcIlxcdTIyM0ZcIixcImFjRVwiOlwiXFx1MjIzRVxcdTAzMzNcIixcIkFjaXJjXCI6XCJcXHUwMEMyXCIsXCJhY2lyY1wiOlwiXFx1MDBFMlwiLFwiYWN1dGVcIjpcIlxcdTAwQjRcIixcIkFjeVwiOlwiXFx1MDQxMFwiLFwiYWN5XCI6XCJcXHUwNDMwXCIsXCJBRWxpZ1wiOlwiXFx1MDBDNlwiLFwiYWVsaWdcIjpcIlxcdTAwRTZcIixcImFmXCI6XCJcXHUyMDYxXCIsXCJBZnJcIjpcIlxcdUQ4MzVcXHVERDA0XCIsXCJhZnJcIjpcIlxcdUQ4MzVcXHVERDFFXCIsXCJBZ3JhdmVcIjpcIlxcdTAwQzBcIixcImFncmF2ZVwiOlwiXFx1MDBFMFwiLFwiYWxlZnN5bVwiOlwiXFx1MjEzNVwiLFwiYWxlcGhcIjpcIlxcdTIxMzVcIixcIkFscGhhXCI6XCJcXHUwMzkxXCIsXCJhbHBoYVwiOlwiXFx1MDNCMVwiLFwiQW1hY3JcIjpcIlxcdTAxMDBcIixcImFtYWNyXCI6XCJcXHUwMTAxXCIsXCJhbWFsZ1wiOlwiXFx1MkEzRlwiLFwiYW1wXCI6XCImXCIsXCJBTVBcIjpcIiZcIixcImFuZGFuZFwiOlwiXFx1MkE1NVwiLFwiQW5kXCI6XCJcXHUyQTUzXCIsXCJhbmRcIjpcIlxcdTIyMjdcIixcImFuZGRcIjpcIlxcdTJBNUNcIixcImFuZHNsb3BlXCI6XCJcXHUyQTU4XCIsXCJhbmR2XCI6XCJcXHUyQTVBXCIsXCJhbmdcIjpcIlxcdTIyMjBcIixcImFuZ2VcIjpcIlxcdTI5QTRcIixcImFuZ2xlXCI6XCJcXHUyMjIwXCIsXCJhbmdtc2RhYVwiOlwiXFx1MjlBOFwiLFwiYW5nbXNkYWJcIjpcIlxcdTI5QTlcIixcImFuZ21zZGFjXCI6XCJcXHUyOUFBXCIsXCJhbmdtc2RhZFwiOlwiXFx1MjlBQlwiLFwiYW5nbXNkYWVcIjpcIlxcdTI5QUNcIixcImFuZ21zZGFmXCI6XCJcXHUyOUFEXCIsXCJhbmdtc2RhZ1wiOlwiXFx1MjlBRVwiLFwiYW5nbXNkYWhcIjpcIlxcdTI5QUZcIixcImFuZ21zZFwiOlwiXFx1MjIyMVwiLFwiYW5ncnRcIjpcIlxcdTIyMUZcIixcImFuZ3J0dmJcIjpcIlxcdTIyQkVcIixcImFuZ3J0dmJkXCI6XCJcXHUyOTlEXCIsXCJhbmdzcGhcIjpcIlxcdTIyMjJcIixcImFuZ3N0XCI6XCJcXHUwMEM1XCIsXCJhbmd6YXJyXCI6XCJcXHUyMzdDXCIsXCJBb2dvblwiOlwiXFx1MDEwNFwiLFwiYW9nb25cIjpcIlxcdTAxMDVcIixcIkFvcGZcIjpcIlxcdUQ4MzVcXHVERDM4XCIsXCJhb3BmXCI6XCJcXHVEODM1XFx1REQ1MlwiLFwiYXBhY2lyXCI6XCJcXHUyQTZGXCIsXCJhcFwiOlwiXFx1MjI0OFwiLFwiYXBFXCI6XCJcXHUyQTcwXCIsXCJhcGVcIjpcIlxcdTIyNEFcIixcImFwaWRcIjpcIlxcdTIyNEJcIixcImFwb3NcIjpcIidcIixcIkFwcGx5RnVuY3Rpb25cIjpcIlxcdTIwNjFcIixcImFwcHJveFwiOlwiXFx1MjI0OFwiLFwiYXBwcm94ZXFcIjpcIlxcdTIyNEFcIixcIkFyaW5nXCI6XCJcXHUwMEM1XCIsXCJhcmluZ1wiOlwiXFx1MDBFNVwiLFwiQXNjclwiOlwiXFx1RDgzNVxcdURDOUNcIixcImFzY3JcIjpcIlxcdUQ4MzVcXHVEQ0I2XCIsXCJBc3NpZ25cIjpcIlxcdTIyNTRcIixcImFzdFwiOlwiKlwiLFwiYXN5bXBcIjpcIlxcdTIyNDhcIixcImFzeW1wZXFcIjpcIlxcdTIyNERcIixcIkF0aWxkZVwiOlwiXFx1MDBDM1wiLFwiYXRpbGRlXCI6XCJcXHUwMEUzXCIsXCJBdW1sXCI6XCJcXHUwMEM0XCIsXCJhdW1sXCI6XCJcXHUwMEU0XCIsXCJhd2NvbmludFwiOlwiXFx1MjIzM1wiLFwiYXdpbnRcIjpcIlxcdTJBMTFcIixcImJhY2tjb25nXCI6XCJcXHUyMjRDXCIsXCJiYWNrZXBzaWxvblwiOlwiXFx1MDNGNlwiLFwiYmFja3ByaW1lXCI6XCJcXHUyMDM1XCIsXCJiYWNrc2ltXCI6XCJcXHUyMjNEXCIsXCJiYWNrc2ltZXFcIjpcIlxcdTIyQ0RcIixcIkJhY2tzbGFzaFwiOlwiXFx1MjIxNlwiLFwiQmFydlwiOlwiXFx1MkFFN1wiLFwiYmFydmVlXCI6XCJcXHUyMkJEXCIsXCJiYXJ3ZWRcIjpcIlxcdTIzMDVcIixcIkJhcndlZFwiOlwiXFx1MjMwNlwiLFwiYmFyd2VkZ2VcIjpcIlxcdTIzMDVcIixcImJicmtcIjpcIlxcdTIzQjVcIixcImJicmt0YnJrXCI6XCJcXHUyM0I2XCIsXCJiY29uZ1wiOlwiXFx1MjI0Q1wiLFwiQmN5XCI6XCJcXHUwNDExXCIsXCJiY3lcIjpcIlxcdTA0MzFcIixcImJkcXVvXCI6XCJcXHUyMDFFXCIsXCJiZWNhdXNcIjpcIlxcdTIyMzVcIixcImJlY2F1c2VcIjpcIlxcdTIyMzVcIixcIkJlY2F1c2VcIjpcIlxcdTIyMzVcIixcImJlbXB0eXZcIjpcIlxcdTI5QjBcIixcImJlcHNpXCI6XCJcXHUwM0Y2XCIsXCJiZXJub3VcIjpcIlxcdTIxMkNcIixcIkJlcm5vdWxsaXNcIjpcIlxcdTIxMkNcIixcIkJldGFcIjpcIlxcdTAzOTJcIixcImJldGFcIjpcIlxcdTAzQjJcIixcImJldGhcIjpcIlxcdTIxMzZcIixcImJldHdlZW5cIjpcIlxcdTIyNkNcIixcIkJmclwiOlwiXFx1RDgzNVxcdUREMDVcIixcImJmclwiOlwiXFx1RDgzNVxcdUREMUZcIixcImJpZ2NhcFwiOlwiXFx1MjJDMlwiLFwiYmlnY2lyY1wiOlwiXFx1MjVFRlwiLFwiYmlnY3VwXCI6XCJcXHUyMkMzXCIsXCJiaWdvZG90XCI6XCJcXHUyQTAwXCIsXCJiaWdvcGx1c1wiOlwiXFx1MkEwMVwiLFwiYmlnb3RpbWVzXCI6XCJcXHUyQTAyXCIsXCJiaWdzcWN1cFwiOlwiXFx1MkEwNlwiLFwiYmlnc3RhclwiOlwiXFx1MjYwNVwiLFwiYmlndHJpYW5nbGVkb3duXCI6XCJcXHUyNUJEXCIsXCJiaWd0cmlhbmdsZXVwXCI6XCJcXHUyNUIzXCIsXCJiaWd1cGx1c1wiOlwiXFx1MkEwNFwiLFwiYmlndmVlXCI6XCJcXHUyMkMxXCIsXCJiaWd3ZWRnZVwiOlwiXFx1MjJDMFwiLFwiYmthcm93XCI6XCJcXHUyOTBEXCIsXCJibGFja2xvemVuZ2VcIjpcIlxcdTI5RUJcIixcImJsYWNrc3F1YXJlXCI6XCJcXHUyNUFBXCIsXCJibGFja3RyaWFuZ2xlXCI6XCJcXHUyNUI0XCIsXCJibGFja3RyaWFuZ2xlZG93blwiOlwiXFx1MjVCRVwiLFwiYmxhY2t0cmlhbmdsZWxlZnRcIjpcIlxcdTI1QzJcIixcImJsYWNrdHJpYW5nbGVyaWdodFwiOlwiXFx1MjVCOFwiLFwiYmxhbmtcIjpcIlxcdTI0MjNcIixcImJsazEyXCI6XCJcXHUyNTkyXCIsXCJibGsxNFwiOlwiXFx1MjU5MVwiLFwiYmxrMzRcIjpcIlxcdTI1OTNcIixcImJsb2NrXCI6XCJcXHUyNTg4XCIsXCJibmVcIjpcIj1cXHUyMEU1XCIsXCJibmVxdWl2XCI6XCJcXHUyMjYxXFx1MjBFNVwiLFwiYk5vdFwiOlwiXFx1MkFFRFwiLFwiYm5vdFwiOlwiXFx1MjMxMFwiLFwiQm9wZlwiOlwiXFx1RDgzNVxcdUREMzlcIixcImJvcGZcIjpcIlxcdUQ4MzVcXHVERDUzXCIsXCJib3RcIjpcIlxcdTIyQTVcIixcImJvdHRvbVwiOlwiXFx1MjJBNVwiLFwiYm93dGllXCI6XCJcXHUyMkM4XCIsXCJib3hib3hcIjpcIlxcdTI5QzlcIixcImJveGRsXCI6XCJcXHUyNTEwXCIsXCJib3hkTFwiOlwiXFx1MjU1NVwiLFwiYm94RGxcIjpcIlxcdTI1NTZcIixcImJveERMXCI6XCJcXHUyNTU3XCIsXCJib3hkclwiOlwiXFx1MjUwQ1wiLFwiYm94ZFJcIjpcIlxcdTI1NTJcIixcImJveERyXCI6XCJcXHUyNTUzXCIsXCJib3hEUlwiOlwiXFx1MjU1NFwiLFwiYm94aFwiOlwiXFx1MjUwMFwiLFwiYm94SFwiOlwiXFx1MjU1MFwiLFwiYm94aGRcIjpcIlxcdTI1MkNcIixcImJveEhkXCI6XCJcXHUyNTY0XCIsXCJib3hoRFwiOlwiXFx1MjU2NVwiLFwiYm94SERcIjpcIlxcdTI1NjZcIixcImJveGh1XCI6XCJcXHUyNTM0XCIsXCJib3hIdVwiOlwiXFx1MjU2N1wiLFwiYm94aFVcIjpcIlxcdTI1NjhcIixcImJveEhVXCI6XCJcXHUyNTY5XCIsXCJib3htaW51c1wiOlwiXFx1MjI5RlwiLFwiYm94cGx1c1wiOlwiXFx1MjI5RVwiLFwiYm94dGltZXNcIjpcIlxcdTIyQTBcIixcImJveHVsXCI6XCJcXHUyNTE4XCIsXCJib3h1TFwiOlwiXFx1MjU1QlwiLFwiYm94VWxcIjpcIlxcdTI1NUNcIixcImJveFVMXCI6XCJcXHUyNTVEXCIsXCJib3h1clwiOlwiXFx1MjUxNFwiLFwiYm94dVJcIjpcIlxcdTI1NThcIixcImJveFVyXCI6XCJcXHUyNTU5XCIsXCJib3hVUlwiOlwiXFx1MjU1QVwiLFwiYm94dlwiOlwiXFx1MjUwMlwiLFwiYm94VlwiOlwiXFx1MjU1MVwiLFwiYm94dmhcIjpcIlxcdTI1M0NcIixcImJveHZIXCI6XCJcXHUyNTZBXCIsXCJib3hWaFwiOlwiXFx1MjU2QlwiLFwiYm94VkhcIjpcIlxcdTI1NkNcIixcImJveHZsXCI6XCJcXHUyNTI0XCIsXCJib3h2TFwiOlwiXFx1MjU2MVwiLFwiYm94VmxcIjpcIlxcdTI1NjJcIixcImJveFZMXCI6XCJcXHUyNTYzXCIsXCJib3h2clwiOlwiXFx1MjUxQ1wiLFwiYm94dlJcIjpcIlxcdTI1NUVcIixcImJveFZyXCI6XCJcXHUyNTVGXCIsXCJib3hWUlwiOlwiXFx1MjU2MFwiLFwiYnByaW1lXCI6XCJcXHUyMDM1XCIsXCJicmV2ZVwiOlwiXFx1MDJEOFwiLFwiQnJldmVcIjpcIlxcdTAyRDhcIixcImJydmJhclwiOlwiXFx1MDBBNlwiLFwiYnNjclwiOlwiXFx1RDgzNVxcdURDQjdcIixcIkJzY3JcIjpcIlxcdTIxMkNcIixcImJzZW1pXCI6XCJcXHUyMDRGXCIsXCJic2ltXCI6XCJcXHUyMjNEXCIsXCJic2ltZVwiOlwiXFx1MjJDRFwiLFwiYnNvbGJcIjpcIlxcdTI5QzVcIixcImJzb2xcIjpcIlxcXFxcIixcImJzb2xoc3ViXCI6XCJcXHUyN0M4XCIsXCJidWxsXCI6XCJcXHUyMDIyXCIsXCJidWxsZXRcIjpcIlxcdTIwMjJcIixcImJ1bXBcIjpcIlxcdTIyNEVcIixcImJ1bXBFXCI6XCJcXHUyQUFFXCIsXCJidW1wZVwiOlwiXFx1MjI0RlwiLFwiQnVtcGVxXCI6XCJcXHUyMjRFXCIsXCJidW1wZXFcIjpcIlxcdTIyNEZcIixcIkNhY3V0ZVwiOlwiXFx1MDEwNlwiLFwiY2FjdXRlXCI6XCJcXHUwMTA3XCIsXCJjYXBhbmRcIjpcIlxcdTJBNDRcIixcImNhcGJyY3VwXCI6XCJcXHUyQTQ5XCIsXCJjYXBjYXBcIjpcIlxcdTJBNEJcIixcImNhcFwiOlwiXFx1MjIyOVwiLFwiQ2FwXCI6XCJcXHUyMkQyXCIsXCJjYXBjdXBcIjpcIlxcdTJBNDdcIixcImNhcGRvdFwiOlwiXFx1MkE0MFwiLFwiQ2FwaXRhbERpZmZlcmVudGlhbERcIjpcIlxcdTIxNDVcIixcImNhcHNcIjpcIlxcdTIyMjlcXHVGRTAwXCIsXCJjYXJldFwiOlwiXFx1MjA0MVwiLFwiY2Fyb25cIjpcIlxcdTAyQzdcIixcIkNheWxleXNcIjpcIlxcdTIxMkRcIixcImNjYXBzXCI6XCJcXHUyQTREXCIsXCJDY2Fyb25cIjpcIlxcdTAxMENcIixcImNjYXJvblwiOlwiXFx1MDEwRFwiLFwiQ2NlZGlsXCI6XCJcXHUwMEM3XCIsXCJjY2VkaWxcIjpcIlxcdTAwRTdcIixcIkNjaXJjXCI6XCJcXHUwMTA4XCIsXCJjY2lyY1wiOlwiXFx1MDEwOVwiLFwiQ2NvbmludFwiOlwiXFx1MjIzMFwiLFwiY2N1cHNcIjpcIlxcdTJBNENcIixcImNjdXBzc21cIjpcIlxcdTJBNTBcIixcIkNkb3RcIjpcIlxcdTAxMEFcIixcImNkb3RcIjpcIlxcdTAxMEJcIixcImNlZGlsXCI6XCJcXHUwMEI4XCIsXCJDZWRpbGxhXCI6XCJcXHUwMEI4XCIsXCJjZW1wdHl2XCI6XCJcXHUyOUIyXCIsXCJjZW50XCI6XCJcXHUwMEEyXCIsXCJjZW50ZXJkb3RcIjpcIlxcdTAwQjdcIixcIkNlbnRlckRvdFwiOlwiXFx1MDBCN1wiLFwiY2ZyXCI6XCJcXHVEODM1XFx1REQyMFwiLFwiQ2ZyXCI6XCJcXHUyMTJEXCIsXCJDSGN5XCI6XCJcXHUwNDI3XCIsXCJjaGN5XCI6XCJcXHUwNDQ3XCIsXCJjaGVja1wiOlwiXFx1MjcxM1wiLFwiY2hlY2ttYXJrXCI6XCJcXHUyNzEzXCIsXCJDaGlcIjpcIlxcdTAzQTdcIixcImNoaVwiOlwiXFx1MDNDN1wiLFwiY2lyY1wiOlwiXFx1MDJDNlwiLFwiY2lyY2VxXCI6XCJcXHUyMjU3XCIsXCJjaXJjbGVhcnJvd2xlZnRcIjpcIlxcdTIxQkFcIixcImNpcmNsZWFycm93cmlnaHRcIjpcIlxcdTIxQkJcIixcImNpcmNsZWRhc3RcIjpcIlxcdTIyOUJcIixcImNpcmNsZWRjaXJjXCI6XCJcXHUyMjlBXCIsXCJjaXJjbGVkZGFzaFwiOlwiXFx1MjI5RFwiLFwiQ2lyY2xlRG90XCI6XCJcXHUyMjk5XCIsXCJjaXJjbGVkUlwiOlwiXFx1MDBBRVwiLFwiY2lyY2xlZFNcIjpcIlxcdTI0QzhcIixcIkNpcmNsZU1pbnVzXCI6XCJcXHUyMjk2XCIsXCJDaXJjbGVQbHVzXCI6XCJcXHUyMjk1XCIsXCJDaXJjbGVUaW1lc1wiOlwiXFx1MjI5N1wiLFwiY2lyXCI6XCJcXHUyNUNCXCIsXCJjaXJFXCI6XCJcXHUyOUMzXCIsXCJjaXJlXCI6XCJcXHUyMjU3XCIsXCJjaXJmbmludFwiOlwiXFx1MkExMFwiLFwiY2lybWlkXCI6XCJcXHUyQUVGXCIsXCJjaXJzY2lyXCI6XCJcXHUyOUMyXCIsXCJDbG9ja3dpc2VDb250b3VySW50ZWdyYWxcIjpcIlxcdTIyMzJcIixcIkNsb3NlQ3VybHlEb3VibGVRdW90ZVwiOlwiXFx1MjAxRFwiLFwiQ2xvc2VDdXJseVF1b3RlXCI6XCJcXHUyMDE5XCIsXCJjbHVic1wiOlwiXFx1MjY2M1wiLFwiY2x1YnN1aXRcIjpcIlxcdTI2NjNcIixcImNvbG9uXCI6XCI6XCIsXCJDb2xvblwiOlwiXFx1MjIzN1wiLFwiQ29sb25lXCI6XCJcXHUyQTc0XCIsXCJjb2xvbmVcIjpcIlxcdTIyNTRcIixcImNvbG9uZXFcIjpcIlxcdTIyNTRcIixcImNvbW1hXCI6XCIsXCIsXCJjb21tYXRcIjpcIkBcIixcImNvbXBcIjpcIlxcdTIyMDFcIixcImNvbXBmblwiOlwiXFx1MjIxOFwiLFwiY29tcGxlbWVudFwiOlwiXFx1MjIwMVwiLFwiY29tcGxleGVzXCI6XCJcXHUyMTAyXCIsXCJjb25nXCI6XCJcXHUyMjQ1XCIsXCJjb25nZG90XCI6XCJcXHUyQTZEXCIsXCJDb25ncnVlbnRcIjpcIlxcdTIyNjFcIixcImNvbmludFwiOlwiXFx1MjIyRVwiLFwiQ29uaW50XCI6XCJcXHUyMjJGXCIsXCJDb250b3VySW50ZWdyYWxcIjpcIlxcdTIyMkVcIixcImNvcGZcIjpcIlxcdUQ4MzVcXHVERDU0XCIsXCJDb3BmXCI6XCJcXHUyMTAyXCIsXCJjb3Byb2RcIjpcIlxcdTIyMTBcIixcIkNvcHJvZHVjdFwiOlwiXFx1MjIxMFwiLFwiY29weVwiOlwiXFx1MDBBOVwiLFwiQ09QWVwiOlwiXFx1MDBBOVwiLFwiY29weXNyXCI6XCJcXHUyMTE3XCIsXCJDb3VudGVyQ2xvY2t3aXNlQ29udG91ckludGVncmFsXCI6XCJcXHUyMjMzXCIsXCJjcmFyclwiOlwiXFx1MjFCNVwiLFwiY3Jvc3NcIjpcIlxcdTI3MTdcIixcIkNyb3NzXCI6XCJcXHUyQTJGXCIsXCJDc2NyXCI6XCJcXHVEODM1XFx1REM5RVwiLFwiY3NjclwiOlwiXFx1RDgzNVxcdURDQjhcIixcImNzdWJcIjpcIlxcdTJBQ0ZcIixcImNzdWJlXCI6XCJcXHUyQUQxXCIsXCJjc3VwXCI6XCJcXHUyQUQwXCIsXCJjc3VwZVwiOlwiXFx1MkFEMlwiLFwiY3Rkb3RcIjpcIlxcdTIyRUZcIixcImN1ZGFycmxcIjpcIlxcdTI5MzhcIixcImN1ZGFycnJcIjpcIlxcdTI5MzVcIixcImN1ZXByXCI6XCJcXHUyMkRFXCIsXCJjdWVzY1wiOlwiXFx1MjJERlwiLFwiY3VsYXJyXCI6XCJcXHUyMUI2XCIsXCJjdWxhcnJwXCI6XCJcXHUyOTNEXCIsXCJjdXBicmNhcFwiOlwiXFx1MkE0OFwiLFwiY3VwY2FwXCI6XCJcXHUyQTQ2XCIsXCJDdXBDYXBcIjpcIlxcdTIyNERcIixcImN1cFwiOlwiXFx1MjIyQVwiLFwiQ3VwXCI6XCJcXHUyMkQzXCIsXCJjdXBjdXBcIjpcIlxcdTJBNEFcIixcImN1cGRvdFwiOlwiXFx1MjI4RFwiLFwiY3Vwb3JcIjpcIlxcdTJBNDVcIixcImN1cHNcIjpcIlxcdTIyMkFcXHVGRTAwXCIsXCJjdXJhcnJcIjpcIlxcdTIxQjdcIixcImN1cmFycm1cIjpcIlxcdTI5M0NcIixcImN1cmx5ZXFwcmVjXCI6XCJcXHUyMkRFXCIsXCJjdXJseWVxc3VjY1wiOlwiXFx1MjJERlwiLFwiY3VybHl2ZWVcIjpcIlxcdTIyQ0VcIixcImN1cmx5d2VkZ2VcIjpcIlxcdTIyQ0ZcIixcImN1cnJlblwiOlwiXFx1MDBBNFwiLFwiY3VydmVhcnJvd2xlZnRcIjpcIlxcdTIxQjZcIixcImN1cnZlYXJyb3dyaWdodFwiOlwiXFx1MjFCN1wiLFwiY3V2ZWVcIjpcIlxcdTIyQ0VcIixcImN1d2VkXCI6XCJcXHUyMkNGXCIsXCJjd2NvbmludFwiOlwiXFx1MjIzMlwiLFwiY3dpbnRcIjpcIlxcdTIyMzFcIixcImN5bGN0eVwiOlwiXFx1MjMyRFwiLFwiZGFnZ2VyXCI6XCJcXHUyMDIwXCIsXCJEYWdnZXJcIjpcIlxcdTIwMjFcIixcImRhbGV0aFwiOlwiXFx1MjEzOFwiLFwiZGFyclwiOlwiXFx1MjE5M1wiLFwiRGFyclwiOlwiXFx1MjFBMVwiLFwiZEFyclwiOlwiXFx1MjFEM1wiLFwiZGFzaFwiOlwiXFx1MjAxMFwiLFwiRGFzaHZcIjpcIlxcdTJBRTRcIixcImRhc2h2XCI6XCJcXHUyMkEzXCIsXCJkYmthcm93XCI6XCJcXHUyOTBGXCIsXCJkYmxhY1wiOlwiXFx1MDJERFwiLFwiRGNhcm9uXCI6XCJcXHUwMTBFXCIsXCJkY2Fyb25cIjpcIlxcdTAxMEZcIixcIkRjeVwiOlwiXFx1MDQxNFwiLFwiZGN5XCI6XCJcXHUwNDM0XCIsXCJkZGFnZ2VyXCI6XCJcXHUyMDIxXCIsXCJkZGFyclwiOlwiXFx1MjFDQVwiLFwiRERcIjpcIlxcdTIxNDVcIixcImRkXCI6XCJcXHUyMTQ2XCIsXCJERG90cmFoZFwiOlwiXFx1MjkxMVwiLFwiZGRvdHNlcVwiOlwiXFx1MkE3N1wiLFwiZGVnXCI6XCJcXHUwMEIwXCIsXCJEZWxcIjpcIlxcdTIyMDdcIixcIkRlbHRhXCI6XCJcXHUwMzk0XCIsXCJkZWx0YVwiOlwiXFx1MDNCNFwiLFwiZGVtcHR5dlwiOlwiXFx1MjlCMVwiLFwiZGZpc2h0XCI6XCJcXHUyOTdGXCIsXCJEZnJcIjpcIlxcdUQ4MzVcXHVERDA3XCIsXCJkZnJcIjpcIlxcdUQ4MzVcXHVERDIxXCIsXCJkSGFyXCI6XCJcXHUyOTY1XCIsXCJkaGFybFwiOlwiXFx1MjFDM1wiLFwiZGhhcnJcIjpcIlxcdTIxQzJcIixcIkRpYWNyaXRpY2FsQWN1dGVcIjpcIlxcdTAwQjRcIixcIkRpYWNyaXRpY2FsRG90XCI6XCJcXHUwMkQ5XCIsXCJEaWFjcml0aWNhbERvdWJsZUFjdXRlXCI6XCJcXHUwMkREXCIsXCJEaWFjcml0aWNhbEdyYXZlXCI6XCJgXCIsXCJEaWFjcml0aWNhbFRpbGRlXCI6XCJcXHUwMkRDXCIsXCJkaWFtXCI6XCJcXHUyMkM0XCIsXCJkaWFtb25kXCI6XCJcXHUyMkM0XCIsXCJEaWFtb25kXCI6XCJcXHUyMkM0XCIsXCJkaWFtb25kc3VpdFwiOlwiXFx1MjY2NlwiLFwiZGlhbXNcIjpcIlxcdTI2NjZcIixcImRpZVwiOlwiXFx1MDBBOFwiLFwiRGlmZmVyZW50aWFsRFwiOlwiXFx1MjE0NlwiLFwiZGlnYW1tYVwiOlwiXFx1MDNERFwiLFwiZGlzaW5cIjpcIlxcdTIyRjJcIixcImRpdlwiOlwiXFx1MDBGN1wiLFwiZGl2aWRlXCI6XCJcXHUwMEY3XCIsXCJkaXZpZGVvbnRpbWVzXCI6XCJcXHUyMkM3XCIsXCJkaXZvbnhcIjpcIlxcdTIyQzdcIixcIkRKY3lcIjpcIlxcdTA0MDJcIixcImRqY3lcIjpcIlxcdTA0NTJcIixcImRsY29yblwiOlwiXFx1MjMxRVwiLFwiZGxjcm9wXCI6XCJcXHUyMzBEXCIsXCJkb2xsYXJcIjpcIiRcIixcIkRvcGZcIjpcIlxcdUQ4MzVcXHVERDNCXCIsXCJkb3BmXCI6XCJcXHVEODM1XFx1REQ1NVwiLFwiRG90XCI6XCJcXHUwMEE4XCIsXCJkb3RcIjpcIlxcdTAyRDlcIixcIkRvdERvdFwiOlwiXFx1MjBEQ1wiLFwiZG90ZXFcIjpcIlxcdTIyNTBcIixcImRvdGVxZG90XCI6XCJcXHUyMjUxXCIsXCJEb3RFcXVhbFwiOlwiXFx1MjI1MFwiLFwiZG90bWludXNcIjpcIlxcdTIyMzhcIixcImRvdHBsdXNcIjpcIlxcdTIyMTRcIixcImRvdHNxdWFyZVwiOlwiXFx1MjJBMVwiLFwiZG91YmxlYmFyd2VkZ2VcIjpcIlxcdTIzMDZcIixcIkRvdWJsZUNvbnRvdXJJbnRlZ3JhbFwiOlwiXFx1MjIyRlwiLFwiRG91YmxlRG90XCI6XCJcXHUwMEE4XCIsXCJEb3VibGVEb3duQXJyb3dcIjpcIlxcdTIxRDNcIixcIkRvdWJsZUxlZnRBcnJvd1wiOlwiXFx1MjFEMFwiLFwiRG91YmxlTGVmdFJpZ2h0QXJyb3dcIjpcIlxcdTIxRDRcIixcIkRvdWJsZUxlZnRUZWVcIjpcIlxcdTJBRTRcIixcIkRvdWJsZUxvbmdMZWZ0QXJyb3dcIjpcIlxcdTI3RjhcIixcIkRvdWJsZUxvbmdMZWZ0UmlnaHRBcnJvd1wiOlwiXFx1MjdGQVwiLFwiRG91YmxlTG9uZ1JpZ2h0QXJyb3dcIjpcIlxcdTI3RjlcIixcIkRvdWJsZVJpZ2h0QXJyb3dcIjpcIlxcdTIxRDJcIixcIkRvdWJsZVJpZ2h0VGVlXCI6XCJcXHUyMkE4XCIsXCJEb3VibGVVcEFycm93XCI6XCJcXHUyMUQxXCIsXCJEb3VibGVVcERvd25BcnJvd1wiOlwiXFx1MjFENVwiLFwiRG91YmxlVmVydGljYWxCYXJcIjpcIlxcdTIyMjVcIixcIkRvd25BcnJvd0JhclwiOlwiXFx1MjkxM1wiLFwiZG93bmFycm93XCI6XCJcXHUyMTkzXCIsXCJEb3duQXJyb3dcIjpcIlxcdTIxOTNcIixcIkRvd25hcnJvd1wiOlwiXFx1MjFEM1wiLFwiRG93bkFycm93VXBBcnJvd1wiOlwiXFx1MjFGNVwiLFwiRG93bkJyZXZlXCI6XCJcXHUwMzExXCIsXCJkb3duZG93bmFycm93c1wiOlwiXFx1MjFDQVwiLFwiZG93bmhhcnBvb25sZWZ0XCI6XCJcXHUyMUMzXCIsXCJkb3duaGFycG9vbnJpZ2h0XCI6XCJcXHUyMUMyXCIsXCJEb3duTGVmdFJpZ2h0VmVjdG9yXCI6XCJcXHUyOTUwXCIsXCJEb3duTGVmdFRlZVZlY3RvclwiOlwiXFx1Mjk1RVwiLFwiRG93bkxlZnRWZWN0b3JCYXJcIjpcIlxcdTI5NTZcIixcIkRvd25MZWZ0VmVjdG9yXCI6XCJcXHUyMUJEXCIsXCJEb3duUmlnaHRUZWVWZWN0b3JcIjpcIlxcdTI5NUZcIixcIkRvd25SaWdodFZlY3RvckJhclwiOlwiXFx1Mjk1N1wiLFwiRG93blJpZ2h0VmVjdG9yXCI6XCJcXHUyMUMxXCIsXCJEb3duVGVlQXJyb3dcIjpcIlxcdTIxQTdcIixcIkRvd25UZWVcIjpcIlxcdTIyQTRcIixcImRyYmthcm93XCI6XCJcXHUyOTEwXCIsXCJkcmNvcm5cIjpcIlxcdTIzMUZcIixcImRyY3JvcFwiOlwiXFx1MjMwQ1wiLFwiRHNjclwiOlwiXFx1RDgzNVxcdURDOUZcIixcImRzY3JcIjpcIlxcdUQ4MzVcXHVEQ0I5XCIsXCJEU2N5XCI6XCJcXHUwNDA1XCIsXCJkc2N5XCI6XCJcXHUwNDU1XCIsXCJkc29sXCI6XCJcXHUyOUY2XCIsXCJEc3Ryb2tcIjpcIlxcdTAxMTBcIixcImRzdHJva1wiOlwiXFx1MDExMVwiLFwiZHRkb3RcIjpcIlxcdTIyRjFcIixcImR0cmlcIjpcIlxcdTI1QkZcIixcImR0cmlmXCI6XCJcXHUyNUJFXCIsXCJkdWFyclwiOlwiXFx1MjFGNVwiLFwiZHVoYXJcIjpcIlxcdTI5NkZcIixcImR3YW5nbGVcIjpcIlxcdTI5QTZcIixcIkRaY3lcIjpcIlxcdTA0MEZcIixcImR6Y3lcIjpcIlxcdTA0NUZcIixcImR6aWdyYXJyXCI6XCJcXHUyN0ZGXCIsXCJFYWN1dGVcIjpcIlxcdTAwQzlcIixcImVhY3V0ZVwiOlwiXFx1MDBFOVwiLFwiZWFzdGVyXCI6XCJcXHUyQTZFXCIsXCJFY2Fyb25cIjpcIlxcdTAxMUFcIixcImVjYXJvblwiOlwiXFx1MDExQlwiLFwiRWNpcmNcIjpcIlxcdTAwQ0FcIixcImVjaXJjXCI6XCJcXHUwMEVBXCIsXCJlY2lyXCI6XCJcXHUyMjU2XCIsXCJlY29sb25cIjpcIlxcdTIyNTVcIixcIkVjeVwiOlwiXFx1MDQyRFwiLFwiZWN5XCI6XCJcXHUwNDREXCIsXCJlRERvdFwiOlwiXFx1MkE3N1wiLFwiRWRvdFwiOlwiXFx1MDExNlwiLFwiZWRvdFwiOlwiXFx1MDExN1wiLFwiZURvdFwiOlwiXFx1MjI1MVwiLFwiZWVcIjpcIlxcdTIxNDdcIixcImVmRG90XCI6XCJcXHUyMjUyXCIsXCJFZnJcIjpcIlxcdUQ4MzVcXHVERDA4XCIsXCJlZnJcIjpcIlxcdUQ4MzVcXHVERDIyXCIsXCJlZ1wiOlwiXFx1MkE5QVwiLFwiRWdyYXZlXCI6XCJcXHUwMEM4XCIsXCJlZ3JhdmVcIjpcIlxcdTAwRThcIixcImVnc1wiOlwiXFx1MkE5NlwiLFwiZWdzZG90XCI6XCJcXHUyQTk4XCIsXCJlbFwiOlwiXFx1MkE5OVwiLFwiRWxlbWVudFwiOlwiXFx1MjIwOFwiLFwiZWxpbnRlcnNcIjpcIlxcdTIzRTdcIixcImVsbFwiOlwiXFx1MjExM1wiLFwiZWxzXCI6XCJcXHUyQTk1XCIsXCJlbHNkb3RcIjpcIlxcdTJBOTdcIixcIkVtYWNyXCI6XCJcXHUwMTEyXCIsXCJlbWFjclwiOlwiXFx1MDExM1wiLFwiZW1wdHlcIjpcIlxcdTIyMDVcIixcImVtcHR5c2V0XCI6XCJcXHUyMjA1XCIsXCJFbXB0eVNtYWxsU3F1YXJlXCI6XCJcXHUyNUZCXCIsXCJlbXB0eXZcIjpcIlxcdTIyMDVcIixcIkVtcHR5VmVyeVNtYWxsU3F1YXJlXCI6XCJcXHUyNUFCXCIsXCJlbXNwMTNcIjpcIlxcdTIwMDRcIixcImVtc3AxNFwiOlwiXFx1MjAwNVwiLFwiZW1zcFwiOlwiXFx1MjAwM1wiLFwiRU5HXCI6XCJcXHUwMTRBXCIsXCJlbmdcIjpcIlxcdTAxNEJcIixcImVuc3BcIjpcIlxcdTIwMDJcIixcIkVvZ29uXCI6XCJcXHUwMTE4XCIsXCJlb2dvblwiOlwiXFx1MDExOVwiLFwiRW9wZlwiOlwiXFx1RDgzNVxcdUREM0NcIixcImVvcGZcIjpcIlxcdUQ4MzVcXHVERDU2XCIsXCJlcGFyXCI6XCJcXHUyMkQ1XCIsXCJlcGFyc2xcIjpcIlxcdTI5RTNcIixcImVwbHVzXCI6XCJcXHUyQTcxXCIsXCJlcHNpXCI6XCJcXHUwM0I1XCIsXCJFcHNpbG9uXCI6XCJcXHUwMzk1XCIsXCJlcHNpbG9uXCI6XCJcXHUwM0I1XCIsXCJlcHNpdlwiOlwiXFx1MDNGNVwiLFwiZXFjaXJjXCI6XCJcXHUyMjU2XCIsXCJlcWNvbG9uXCI6XCJcXHUyMjU1XCIsXCJlcXNpbVwiOlwiXFx1MjI0MlwiLFwiZXFzbGFudGd0clwiOlwiXFx1MkE5NlwiLFwiZXFzbGFudGxlc3NcIjpcIlxcdTJBOTVcIixcIkVxdWFsXCI6XCJcXHUyQTc1XCIsXCJlcXVhbHNcIjpcIj1cIixcIkVxdWFsVGlsZGVcIjpcIlxcdTIyNDJcIixcImVxdWVzdFwiOlwiXFx1MjI1RlwiLFwiRXF1aWxpYnJpdW1cIjpcIlxcdTIxQ0NcIixcImVxdWl2XCI6XCJcXHUyMjYxXCIsXCJlcXVpdkREXCI6XCJcXHUyQTc4XCIsXCJlcXZwYXJzbFwiOlwiXFx1MjlFNVwiLFwiZXJhcnJcIjpcIlxcdTI5NzFcIixcImVyRG90XCI6XCJcXHUyMjUzXCIsXCJlc2NyXCI6XCJcXHUyMTJGXCIsXCJFc2NyXCI6XCJcXHUyMTMwXCIsXCJlc2RvdFwiOlwiXFx1MjI1MFwiLFwiRXNpbVwiOlwiXFx1MkE3M1wiLFwiZXNpbVwiOlwiXFx1MjI0MlwiLFwiRXRhXCI6XCJcXHUwMzk3XCIsXCJldGFcIjpcIlxcdTAzQjdcIixcIkVUSFwiOlwiXFx1MDBEMFwiLFwiZXRoXCI6XCJcXHUwMEYwXCIsXCJFdW1sXCI6XCJcXHUwMENCXCIsXCJldW1sXCI6XCJcXHUwMEVCXCIsXCJldXJvXCI6XCJcXHUyMEFDXCIsXCJleGNsXCI6XCIhXCIsXCJleGlzdFwiOlwiXFx1MjIwM1wiLFwiRXhpc3RzXCI6XCJcXHUyMjAzXCIsXCJleHBlY3RhdGlvblwiOlwiXFx1MjEzMFwiLFwiZXhwb25lbnRpYWxlXCI6XCJcXHUyMTQ3XCIsXCJFeHBvbmVudGlhbEVcIjpcIlxcdTIxNDdcIixcImZhbGxpbmdkb3RzZXFcIjpcIlxcdTIyNTJcIixcIkZjeVwiOlwiXFx1MDQyNFwiLFwiZmN5XCI6XCJcXHUwNDQ0XCIsXCJmZW1hbGVcIjpcIlxcdTI2NDBcIixcImZmaWxpZ1wiOlwiXFx1RkIwM1wiLFwiZmZsaWdcIjpcIlxcdUZCMDBcIixcImZmbGxpZ1wiOlwiXFx1RkIwNFwiLFwiRmZyXCI6XCJcXHVEODM1XFx1REQwOVwiLFwiZmZyXCI6XCJcXHVEODM1XFx1REQyM1wiLFwiZmlsaWdcIjpcIlxcdUZCMDFcIixcIkZpbGxlZFNtYWxsU3F1YXJlXCI6XCJcXHUyNUZDXCIsXCJGaWxsZWRWZXJ5U21hbGxTcXVhcmVcIjpcIlxcdTI1QUFcIixcImZqbGlnXCI6XCJmalwiLFwiZmxhdFwiOlwiXFx1MjY2RFwiLFwiZmxsaWdcIjpcIlxcdUZCMDJcIixcImZsdG5zXCI6XCJcXHUyNUIxXCIsXCJmbm9mXCI6XCJcXHUwMTkyXCIsXCJGb3BmXCI6XCJcXHVEODM1XFx1REQzRFwiLFwiZm9wZlwiOlwiXFx1RDgzNVxcdURENTdcIixcImZvcmFsbFwiOlwiXFx1MjIwMFwiLFwiRm9yQWxsXCI6XCJcXHUyMjAwXCIsXCJmb3JrXCI6XCJcXHUyMkQ0XCIsXCJmb3JrdlwiOlwiXFx1MkFEOVwiLFwiRm91cmllcnRyZlwiOlwiXFx1MjEzMVwiLFwiZnBhcnRpbnRcIjpcIlxcdTJBMERcIixcImZyYWMxMlwiOlwiXFx1MDBCRFwiLFwiZnJhYzEzXCI6XCJcXHUyMTUzXCIsXCJmcmFjMTRcIjpcIlxcdTAwQkNcIixcImZyYWMxNVwiOlwiXFx1MjE1NVwiLFwiZnJhYzE2XCI6XCJcXHUyMTU5XCIsXCJmcmFjMThcIjpcIlxcdTIxNUJcIixcImZyYWMyM1wiOlwiXFx1MjE1NFwiLFwiZnJhYzI1XCI6XCJcXHUyMTU2XCIsXCJmcmFjMzRcIjpcIlxcdTAwQkVcIixcImZyYWMzNVwiOlwiXFx1MjE1N1wiLFwiZnJhYzM4XCI6XCJcXHUyMTVDXCIsXCJmcmFjNDVcIjpcIlxcdTIxNThcIixcImZyYWM1NlwiOlwiXFx1MjE1QVwiLFwiZnJhYzU4XCI6XCJcXHUyMTVEXCIsXCJmcmFjNzhcIjpcIlxcdTIxNUVcIixcImZyYXNsXCI6XCJcXHUyMDQ0XCIsXCJmcm93blwiOlwiXFx1MjMyMlwiLFwiZnNjclwiOlwiXFx1RDgzNVxcdURDQkJcIixcIkZzY3JcIjpcIlxcdTIxMzFcIixcImdhY3V0ZVwiOlwiXFx1MDFGNVwiLFwiR2FtbWFcIjpcIlxcdTAzOTNcIixcImdhbW1hXCI6XCJcXHUwM0IzXCIsXCJHYW1tYWRcIjpcIlxcdTAzRENcIixcImdhbW1hZFwiOlwiXFx1MDNERFwiLFwiZ2FwXCI6XCJcXHUyQTg2XCIsXCJHYnJldmVcIjpcIlxcdTAxMUVcIixcImdicmV2ZVwiOlwiXFx1MDExRlwiLFwiR2NlZGlsXCI6XCJcXHUwMTIyXCIsXCJHY2lyY1wiOlwiXFx1MDExQ1wiLFwiZ2NpcmNcIjpcIlxcdTAxMURcIixcIkdjeVwiOlwiXFx1MDQxM1wiLFwiZ2N5XCI6XCJcXHUwNDMzXCIsXCJHZG90XCI6XCJcXHUwMTIwXCIsXCJnZG90XCI6XCJcXHUwMTIxXCIsXCJnZVwiOlwiXFx1MjI2NVwiLFwiZ0VcIjpcIlxcdTIyNjdcIixcImdFbFwiOlwiXFx1MkE4Q1wiLFwiZ2VsXCI6XCJcXHUyMkRCXCIsXCJnZXFcIjpcIlxcdTIyNjVcIixcImdlcXFcIjpcIlxcdTIyNjdcIixcImdlcXNsYW50XCI6XCJcXHUyQTdFXCIsXCJnZXNjY1wiOlwiXFx1MkFBOVwiLFwiZ2VzXCI6XCJcXHUyQTdFXCIsXCJnZXNkb3RcIjpcIlxcdTJBODBcIixcImdlc2RvdG9cIjpcIlxcdTJBODJcIixcImdlc2RvdG9sXCI6XCJcXHUyQTg0XCIsXCJnZXNsXCI6XCJcXHUyMkRCXFx1RkUwMFwiLFwiZ2VzbGVzXCI6XCJcXHUyQTk0XCIsXCJHZnJcIjpcIlxcdUQ4MzVcXHVERDBBXCIsXCJnZnJcIjpcIlxcdUQ4MzVcXHVERDI0XCIsXCJnZ1wiOlwiXFx1MjI2QlwiLFwiR2dcIjpcIlxcdTIyRDlcIixcImdnZ1wiOlwiXFx1MjJEOVwiLFwiZ2ltZWxcIjpcIlxcdTIxMzdcIixcIkdKY3lcIjpcIlxcdTA0MDNcIixcImdqY3lcIjpcIlxcdTA0NTNcIixcImdsYVwiOlwiXFx1MkFBNVwiLFwiZ2xcIjpcIlxcdTIyNzdcIixcImdsRVwiOlwiXFx1MkE5MlwiLFwiZ2xqXCI6XCJcXHUyQUE0XCIsXCJnbmFwXCI6XCJcXHUyQThBXCIsXCJnbmFwcHJveFwiOlwiXFx1MkE4QVwiLFwiZ25lXCI6XCJcXHUyQTg4XCIsXCJnbkVcIjpcIlxcdTIyNjlcIixcImduZXFcIjpcIlxcdTJBODhcIixcImduZXFxXCI6XCJcXHUyMjY5XCIsXCJnbnNpbVwiOlwiXFx1MjJFN1wiLFwiR29wZlwiOlwiXFx1RDgzNVxcdUREM0VcIixcImdvcGZcIjpcIlxcdUQ4MzVcXHVERDU4XCIsXCJncmF2ZVwiOlwiYFwiLFwiR3JlYXRlckVxdWFsXCI6XCJcXHUyMjY1XCIsXCJHcmVhdGVyRXF1YWxMZXNzXCI6XCJcXHUyMkRCXCIsXCJHcmVhdGVyRnVsbEVxdWFsXCI6XCJcXHUyMjY3XCIsXCJHcmVhdGVyR3JlYXRlclwiOlwiXFx1MkFBMlwiLFwiR3JlYXRlckxlc3NcIjpcIlxcdTIyNzdcIixcIkdyZWF0ZXJTbGFudEVxdWFsXCI6XCJcXHUyQTdFXCIsXCJHcmVhdGVyVGlsZGVcIjpcIlxcdTIyNzNcIixcIkdzY3JcIjpcIlxcdUQ4MzVcXHVEQ0EyXCIsXCJnc2NyXCI6XCJcXHUyMTBBXCIsXCJnc2ltXCI6XCJcXHUyMjczXCIsXCJnc2ltZVwiOlwiXFx1MkE4RVwiLFwiZ3NpbWxcIjpcIlxcdTJBOTBcIixcImd0Y2NcIjpcIlxcdTJBQTdcIixcImd0Y2lyXCI6XCJcXHUyQTdBXCIsXCJndFwiOlwiPlwiLFwiR1RcIjpcIj5cIixcIkd0XCI6XCJcXHUyMjZCXCIsXCJndGRvdFwiOlwiXFx1MjJEN1wiLFwiZ3RsUGFyXCI6XCJcXHUyOTk1XCIsXCJndHF1ZXN0XCI6XCJcXHUyQTdDXCIsXCJndHJhcHByb3hcIjpcIlxcdTJBODZcIixcImd0cmFyclwiOlwiXFx1Mjk3OFwiLFwiZ3RyZG90XCI6XCJcXHUyMkQ3XCIsXCJndHJlcWxlc3NcIjpcIlxcdTIyREJcIixcImd0cmVxcWxlc3NcIjpcIlxcdTJBOENcIixcImd0cmxlc3NcIjpcIlxcdTIyNzdcIixcImd0cnNpbVwiOlwiXFx1MjI3M1wiLFwiZ3ZlcnRuZXFxXCI6XCJcXHUyMjY5XFx1RkUwMFwiLFwiZ3ZuRVwiOlwiXFx1MjI2OVxcdUZFMDBcIixcIkhhY2VrXCI6XCJcXHUwMkM3XCIsXCJoYWlyc3BcIjpcIlxcdTIwMEFcIixcImhhbGZcIjpcIlxcdTAwQkRcIixcImhhbWlsdFwiOlwiXFx1MjEwQlwiLFwiSEFSRGN5XCI6XCJcXHUwNDJBXCIsXCJoYXJkY3lcIjpcIlxcdTA0NEFcIixcImhhcnJjaXJcIjpcIlxcdTI5NDhcIixcImhhcnJcIjpcIlxcdTIxOTRcIixcImhBcnJcIjpcIlxcdTIxRDRcIixcImhhcnJ3XCI6XCJcXHUyMUFEXCIsXCJIYXRcIjpcIl5cIixcImhiYXJcIjpcIlxcdTIxMEZcIixcIkhjaXJjXCI6XCJcXHUwMTI0XCIsXCJoY2lyY1wiOlwiXFx1MDEyNVwiLFwiaGVhcnRzXCI6XCJcXHUyNjY1XCIsXCJoZWFydHN1aXRcIjpcIlxcdTI2NjVcIixcImhlbGxpcFwiOlwiXFx1MjAyNlwiLFwiaGVyY29uXCI6XCJcXHUyMkI5XCIsXCJoZnJcIjpcIlxcdUQ4MzVcXHVERDI1XCIsXCJIZnJcIjpcIlxcdTIxMENcIixcIkhpbGJlcnRTcGFjZVwiOlwiXFx1MjEwQlwiLFwiaGtzZWFyb3dcIjpcIlxcdTI5MjVcIixcImhrc3dhcm93XCI6XCJcXHUyOTI2XCIsXCJob2FyclwiOlwiXFx1MjFGRlwiLFwiaG9tdGh0XCI6XCJcXHUyMjNCXCIsXCJob29rbGVmdGFycm93XCI6XCJcXHUyMUE5XCIsXCJob29rcmlnaHRhcnJvd1wiOlwiXFx1MjFBQVwiLFwiaG9wZlwiOlwiXFx1RDgzNVxcdURENTlcIixcIkhvcGZcIjpcIlxcdTIxMERcIixcImhvcmJhclwiOlwiXFx1MjAxNVwiLFwiSG9yaXpvbnRhbExpbmVcIjpcIlxcdTI1MDBcIixcImhzY3JcIjpcIlxcdUQ4MzVcXHVEQ0JEXCIsXCJIc2NyXCI6XCJcXHUyMTBCXCIsXCJoc2xhc2hcIjpcIlxcdTIxMEZcIixcIkhzdHJva1wiOlwiXFx1MDEyNlwiLFwiaHN0cm9rXCI6XCJcXHUwMTI3XCIsXCJIdW1wRG93bkh1bXBcIjpcIlxcdTIyNEVcIixcIkh1bXBFcXVhbFwiOlwiXFx1MjI0RlwiLFwiaHlidWxsXCI6XCJcXHUyMDQzXCIsXCJoeXBoZW5cIjpcIlxcdTIwMTBcIixcIklhY3V0ZVwiOlwiXFx1MDBDRFwiLFwiaWFjdXRlXCI6XCJcXHUwMEVEXCIsXCJpY1wiOlwiXFx1MjA2M1wiLFwiSWNpcmNcIjpcIlxcdTAwQ0VcIixcImljaXJjXCI6XCJcXHUwMEVFXCIsXCJJY3lcIjpcIlxcdTA0MThcIixcImljeVwiOlwiXFx1MDQzOFwiLFwiSWRvdFwiOlwiXFx1MDEzMFwiLFwiSUVjeVwiOlwiXFx1MDQxNVwiLFwiaWVjeVwiOlwiXFx1MDQzNVwiLFwiaWV4Y2xcIjpcIlxcdTAwQTFcIixcImlmZlwiOlwiXFx1MjFENFwiLFwiaWZyXCI6XCJcXHVEODM1XFx1REQyNlwiLFwiSWZyXCI6XCJcXHUyMTExXCIsXCJJZ3JhdmVcIjpcIlxcdTAwQ0NcIixcImlncmF2ZVwiOlwiXFx1MDBFQ1wiLFwiaWlcIjpcIlxcdTIxNDhcIixcImlpaWludFwiOlwiXFx1MkEwQ1wiLFwiaWlpbnRcIjpcIlxcdTIyMkRcIixcImlpbmZpblwiOlwiXFx1MjlEQ1wiLFwiaWlvdGFcIjpcIlxcdTIxMjlcIixcIklKbGlnXCI6XCJcXHUwMTMyXCIsXCJpamxpZ1wiOlwiXFx1MDEzM1wiLFwiSW1hY3JcIjpcIlxcdTAxMkFcIixcImltYWNyXCI6XCJcXHUwMTJCXCIsXCJpbWFnZVwiOlwiXFx1MjExMVwiLFwiSW1hZ2luYXJ5SVwiOlwiXFx1MjE0OFwiLFwiaW1hZ2xpbmVcIjpcIlxcdTIxMTBcIixcImltYWdwYXJ0XCI6XCJcXHUyMTExXCIsXCJpbWF0aFwiOlwiXFx1MDEzMVwiLFwiSW1cIjpcIlxcdTIxMTFcIixcImltb2ZcIjpcIlxcdTIyQjdcIixcImltcGVkXCI6XCJcXHUwMUI1XCIsXCJJbXBsaWVzXCI6XCJcXHUyMUQyXCIsXCJpbmNhcmVcIjpcIlxcdTIxMDVcIixcImluXCI6XCJcXHUyMjA4XCIsXCJpbmZpblwiOlwiXFx1MjIxRVwiLFwiaW5maW50aWVcIjpcIlxcdTI5RERcIixcImlub2RvdFwiOlwiXFx1MDEzMVwiLFwiaW50Y2FsXCI6XCJcXHUyMkJBXCIsXCJpbnRcIjpcIlxcdTIyMkJcIixcIkludFwiOlwiXFx1MjIyQ1wiLFwiaW50ZWdlcnNcIjpcIlxcdTIxMjRcIixcIkludGVncmFsXCI6XCJcXHUyMjJCXCIsXCJpbnRlcmNhbFwiOlwiXFx1MjJCQVwiLFwiSW50ZXJzZWN0aW9uXCI6XCJcXHUyMkMyXCIsXCJpbnRsYXJoa1wiOlwiXFx1MkExN1wiLFwiaW50cHJvZFwiOlwiXFx1MkEzQ1wiLFwiSW52aXNpYmxlQ29tbWFcIjpcIlxcdTIwNjNcIixcIkludmlzaWJsZVRpbWVzXCI6XCJcXHUyMDYyXCIsXCJJT2N5XCI6XCJcXHUwNDAxXCIsXCJpb2N5XCI6XCJcXHUwNDUxXCIsXCJJb2dvblwiOlwiXFx1MDEyRVwiLFwiaW9nb25cIjpcIlxcdTAxMkZcIixcIklvcGZcIjpcIlxcdUQ4MzVcXHVERDQwXCIsXCJpb3BmXCI6XCJcXHVEODM1XFx1REQ1QVwiLFwiSW90YVwiOlwiXFx1MDM5OVwiLFwiaW90YVwiOlwiXFx1MDNCOVwiLFwiaXByb2RcIjpcIlxcdTJBM0NcIixcImlxdWVzdFwiOlwiXFx1MDBCRlwiLFwiaXNjclwiOlwiXFx1RDgzNVxcdURDQkVcIixcIklzY3JcIjpcIlxcdTIxMTBcIixcImlzaW5cIjpcIlxcdTIyMDhcIixcImlzaW5kb3RcIjpcIlxcdTIyRjVcIixcImlzaW5FXCI6XCJcXHUyMkY5XCIsXCJpc2luc1wiOlwiXFx1MjJGNFwiLFwiaXNpbnN2XCI6XCJcXHUyMkYzXCIsXCJpc2ludlwiOlwiXFx1MjIwOFwiLFwiaXRcIjpcIlxcdTIwNjJcIixcIkl0aWxkZVwiOlwiXFx1MDEyOFwiLFwiaXRpbGRlXCI6XCJcXHUwMTI5XCIsXCJJdWtjeVwiOlwiXFx1MDQwNlwiLFwiaXVrY3lcIjpcIlxcdTA0NTZcIixcIkl1bWxcIjpcIlxcdTAwQ0ZcIixcIml1bWxcIjpcIlxcdTAwRUZcIixcIkpjaXJjXCI6XCJcXHUwMTM0XCIsXCJqY2lyY1wiOlwiXFx1MDEzNVwiLFwiSmN5XCI6XCJcXHUwNDE5XCIsXCJqY3lcIjpcIlxcdTA0MzlcIixcIkpmclwiOlwiXFx1RDgzNVxcdUREMERcIixcImpmclwiOlwiXFx1RDgzNVxcdUREMjdcIixcImptYXRoXCI6XCJcXHUwMjM3XCIsXCJKb3BmXCI6XCJcXHVEODM1XFx1REQ0MVwiLFwiam9wZlwiOlwiXFx1RDgzNVxcdURENUJcIixcIkpzY3JcIjpcIlxcdUQ4MzVcXHVEQ0E1XCIsXCJqc2NyXCI6XCJcXHVEODM1XFx1RENCRlwiLFwiSnNlcmN5XCI6XCJcXHUwNDA4XCIsXCJqc2VyY3lcIjpcIlxcdTA0NThcIixcIkp1a2N5XCI6XCJcXHUwNDA0XCIsXCJqdWtjeVwiOlwiXFx1MDQ1NFwiLFwiS2FwcGFcIjpcIlxcdTAzOUFcIixcImthcHBhXCI6XCJcXHUwM0JBXCIsXCJrYXBwYXZcIjpcIlxcdTAzRjBcIixcIktjZWRpbFwiOlwiXFx1MDEzNlwiLFwia2NlZGlsXCI6XCJcXHUwMTM3XCIsXCJLY3lcIjpcIlxcdTA0MUFcIixcImtjeVwiOlwiXFx1MDQzQVwiLFwiS2ZyXCI6XCJcXHVEODM1XFx1REQwRVwiLFwia2ZyXCI6XCJcXHVEODM1XFx1REQyOFwiLFwia2dyZWVuXCI6XCJcXHUwMTM4XCIsXCJLSGN5XCI6XCJcXHUwNDI1XCIsXCJraGN5XCI6XCJcXHUwNDQ1XCIsXCJLSmN5XCI6XCJcXHUwNDBDXCIsXCJramN5XCI6XCJcXHUwNDVDXCIsXCJLb3BmXCI6XCJcXHVEODM1XFx1REQ0MlwiLFwia29wZlwiOlwiXFx1RDgzNVxcdURENUNcIixcIktzY3JcIjpcIlxcdUQ4MzVcXHVEQ0E2XCIsXCJrc2NyXCI6XCJcXHVEODM1XFx1RENDMFwiLFwibEFhcnJcIjpcIlxcdTIxREFcIixcIkxhY3V0ZVwiOlwiXFx1MDEzOVwiLFwibGFjdXRlXCI6XCJcXHUwMTNBXCIsXCJsYWVtcHR5dlwiOlwiXFx1MjlCNFwiLFwibGFncmFuXCI6XCJcXHUyMTEyXCIsXCJMYW1iZGFcIjpcIlxcdTAzOUJcIixcImxhbWJkYVwiOlwiXFx1MDNCQlwiLFwibGFuZ1wiOlwiXFx1MjdFOFwiLFwiTGFuZ1wiOlwiXFx1MjdFQVwiLFwibGFuZ2RcIjpcIlxcdTI5OTFcIixcImxhbmdsZVwiOlwiXFx1MjdFOFwiLFwibGFwXCI6XCJcXHUyQTg1XCIsXCJMYXBsYWNldHJmXCI6XCJcXHUyMTEyXCIsXCJsYXF1b1wiOlwiXFx1MDBBQlwiLFwibGFycmJcIjpcIlxcdTIxRTRcIixcImxhcnJiZnNcIjpcIlxcdTI5MUZcIixcImxhcnJcIjpcIlxcdTIxOTBcIixcIkxhcnJcIjpcIlxcdTIxOUVcIixcImxBcnJcIjpcIlxcdTIxRDBcIixcImxhcnJmc1wiOlwiXFx1MjkxRFwiLFwibGFycmhrXCI6XCJcXHUyMUE5XCIsXCJsYXJybHBcIjpcIlxcdTIxQUJcIixcImxhcnJwbFwiOlwiXFx1MjkzOVwiLFwibGFycnNpbVwiOlwiXFx1Mjk3M1wiLFwibGFycnRsXCI6XCJcXHUyMUEyXCIsXCJsYXRhaWxcIjpcIlxcdTI5MTlcIixcImxBdGFpbFwiOlwiXFx1MjkxQlwiLFwibGF0XCI6XCJcXHUyQUFCXCIsXCJsYXRlXCI6XCJcXHUyQUFEXCIsXCJsYXRlc1wiOlwiXFx1MkFBRFxcdUZFMDBcIixcImxiYXJyXCI6XCJcXHUyOTBDXCIsXCJsQmFyclwiOlwiXFx1MjkwRVwiLFwibGJicmtcIjpcIlxcdTI3NzJcIixcImxicmFjZVwiOlwie1wiLFwibGJyYWNrXCI6XCJbXCIsXCJsYnJrZVwiOlwiXFx1Mjk4QlwiLFwibGJya3NsZFwiOlwiXFx1Mjk4RlwiLFwibGJya3NsdVwiOlwiXFx1Mjk4RFwiLFwiTGNhcm9uXCI6XCJcXHUwMTNEXCIsXCJsY2Fyb25cIjpcIlxcdTAxM0VcIixcIkxjZWRpbFwiOlwiXFx1MDEzQlwiLFwibGNlZGlsXCI6XCJcXHUwMTNDXCIsXCJsY2VpbFwiOlwiXFx1MjMwOFwiLFwibGN1YlwiOlwie1wiLFwiTGN5XCI6XCJcXHUwNDFCXCIsXCJsY3lcIjpcIlxcdTA0M0JcIixcImxkY2FcIjpcIlxcdTI5MzZcIixcImxkcXVvXCI6XCJcXHUyMDFDXCIsXCJsZHF1b3JcIjpcIlxcdTIwMUVcIixcImxkcmRoYXJcIjpcIlxcdTI5NjdcIixcImxkcnVzaGFyXCI6XCJcXHUyOTRCXCIsXCJsZHNoXCI6XCJcXHUyMUIyXCIsXCJsZVwiOlwiXFx1MjI2NFwiLFwibEVcIjpcIlxcdTIyNjZcIixcIkxlZnRBbmdsZUJyYWNrZXRcIjpcIlxcdTI3RThcIixcIkxlZnRBcnJvd0JhclwiOlwiXFx1MjFFNFwiLFwibGVmdGFycm93XCI6XCJcXHUyMTkwXCIsXCJMZWZ0QXJyb3dcIjpcIlxcdTIxOTBcIixcIkxlZnRhcnJvd1wiOlwiXFx1MjFEMFwiLFwiTGVmdEFycm93UmlnaHRBcnJvd1wiOlwiXFx1MjFDNlwiLFwibGVmdGFycm93dGFpbFwiOlwiXFx1MjFBMlwiLFwiTGVmdENlaWxpbmdcIjpcIlxcdTIzMDhcIixcIkxlZnREb3VibGVCcmFja2V0XCI6XCJcXHUyN0U2XCIsXCJMZWZ0RG93blRlZVZlY3RvclwiOlwiXFx1Mjk2MVwiLFwiTGVmdERvd25WZWN0b3JCYXJcIjpcIlxcdTI5NTlcIixcIkxlZnREb3duVmVjdG9yXCI6XCJcXHUyMUMzXCIsXCJMZWZ0Rmxvb3JcIjpcIlxcdTIzMEFcIixcImxlZnRoYXJwb29uZG93blwiOlwiXFx1MjFCRFwiLFwibGVmdGhhcnBvb251cFwiOlwiXFx1MjFCQ1wiLFwibGVmdGxlZnRhcnJvd3NcIjpcIlxcdTIxQzdcIixcImxlZnRyaWdodGFycm93XCI6XCJcXHUyMTk0XCIsXCJMZWZ0UmlnaHRBcnJvd1wiOlwiXFx1MjE5NFwiLFwiTGVmdHJpZ2h0YXJyb3dcIjpcIlxcdTIxRDRcIixcImxlZnRyaWdodGFycm93c1wiOlwiXFx1MjFDNlwiLFwibGVmdHJpZ2h0aGFycG9vbnNcIjpcIlxcdTIxQ0JcIixcImxlZnRyaWdodHNxdWlnYXJyb3dcIjpcIlxcdTIxQURcIixcIkxlZnRSaWdodFZlY3RvclwiOlwiXFx1Mjk0RVwiLFwiTGVmdFRlZUFycm93XCI6XCJcXHUyMUE0XCIsXCJMZWZ0VGVlXCI6XCJcXHUyMkEzXCIsXCJMZWZ0VGVlVmVjdG9yXCI6XCJcXHUyOTVBXCIsXCJsZWZ0dGhyZWV0aW1lc1wiOlwiXFx1MjJDQlwiLFwiTGVmdFRyaWFuZ2xlQmFyXCI6XCJcXHUyOUNGXCIsXCJMZWZ0VHJpYW5nbGVcIjpcIlxcdTIyQjJcIixcIkxlZnRUcmlhbmdsZUVxdWFsXCI6XCJcXHUyMkI0XCIsXCJMZWZ0VXBEb3duVmVjdG9yXCI6XCJcXHUyOTUxXCIsXCJMZWZ0VXBUZWVWZWN0b3JcIjpcIlxcdTI5NjBcIixcIkxlZnRVcFZlY3RvckJhclwiOlwiXFx1Mjk1OFwiLFwiTGVmdFVwVmVjdG9yXCI6XCJcXHUyMUJGXCIsXCJMZWZ0VmVjdG9yQmFyXCI6XCJcXHUyOTUyXCIsXCJMZWZ0VmVjdG9yXCI6XCJcXHUyMUJDXCIsXCJsRWdcIjpcIlxcdTJBOEJcIixcImxlZ1wiOlwiXFx1MjJEQVwiLFwibGVxXCI6XCJcXHUyMjY0XCIsXCJsZXFxXCI6XCJcXHUyMjY2XCIsXCJsZXFzbGFudFwiOlwiXFx1MkE3RFwiLFwibGVzY2NcIjpcIlxcdTJBQThcIixcImxlc1wiOlwiXFx1MkE3RFwiLFwibGVzZG90XCI6XCJcXHUyQTdGXCIsXCJsZXNkb3RvXCI6XCJcXHUyQTgxXCIsXCJsZXNkb3RvclwiOlwiXFx1MkE4M1wiLFwibGVzZ1wiOlwiXFx1MjJEQVxcdUZFMDBcIixcImxlc2dlc1wiOlwiXFx1MkE5M1wiLFwibGVzc2FwcHJveFwiOlwiXFx1MkE4NVwiLFwibGVzc2RvdFwiOlwiXFx1MjJENlwiLFwibGVzc2VxZ3RyXCI6XCJcXHUyMkRBXCIsXCJsZXNzZXFxZ3RyXCI6XCJcXHUyQThCXCIsXCJMZXNzRXF1YWxHcmVhdGVyXCI6XCJcXHUyMkRBXCIsXCJMZXNzRnVsbEVxdWFsXCI6XCJcXHUyMjY2XCIsXCJMZXNzR3JlYXRlclwiOlwiXFx1MjI3NlwiLFwibGVzc2d0clwiOlwiXFx1MjI3NlwiLFwiTGVzc0xlc3NcIjpcIlxcdTJBQTFcIixcImxlc3NzaW1cIjpcIlxcdTIyNzJcIixcIkxlc3NTbGFudEVxdWFsXCI6XCJcXHUyQTdEXCIsXCJMZXNzVGlsZGVcIjpcIlxcdTIyNzJcIixcImxmaXNodFwiOlwiXFx1Mjk3Q1wiLFwibGZsb29yXCI6XCJcXHUyMzBBXCIsXCJMZnJcIjpcIlxcdUQ4MzVcXHVERDBGXCIsXCJsZnJcIjpcIlxcdUQ4MzVcXHVERDI5XCIsXCJsZ1wiOlwiXFx1MjI3NlwiLFwibGdFXCI6XCJcXHUyQTkxXCIsXCJsSGFyXCI6XCJcXHUyOTYyXCIsXCJsaGFyZFwiOlwiXFx1MjFCRFwiLFwibGhhcnVcIjpcIlxcdTIxQkNcIixcImxoYXJ1bFwiOlwiXFx1Mjk2QVwiLFwibGhibGtcIjpcIlxcdTI1ODRcIixcIkxKY3lcIjpcIlxcdTA0MDlcIixcImxqY3lcIjpcIlxcdTA0NTlcIixcImxsYXJyXCI6XCJcXHUyMUM3XCIsXCJsbFwiOlwiXFx1MjI2QVwiLFwiTGxcIjpcIlxcdTIyRDhcIixcImxsY29ybmVyXCI6XCJcXHUyMzFFXCIsXCJMbGVmdGFycm93XCI6XCJcXHUyMURBXCIsXCJsbGhhcmRcIjpcIlxcdTI5NkJcIixcImxsdHJpXCI6XCJcXHUyNUZBXCIsXCJMbWlkb3RcIjpcIlxcdTAxM0ZcIixcImxtaWRvdFwiOlwiXFx1MDE0MFwiLFwibG1vdXN0YWNoZVwiOlwiXFx1MjNCMFwiLFwibG1vdXN0XCI6XCJcXHUyM0IwXCIsXCJsbmFwXCI6XCJcXHUyQTg5XCIsXCJsbmFwcHJveFwiOlwiXFx1MkE4OVwiLFwibG5lXCI6XCJcXHUyQTg3XCIsXCJsbkVcIjpcIlxcdTIyNjhcIixcImxuZXFcIjpcIlxcdTJBODdcIixcImxuZXFxXCI6XCJcXHUyMjY4XCIsXCJsbnNpbVwiOlwiXFx1MjJFNlwiLFwibG9hbmdcIjpcIlxcdTI3RUNcIixcImxvYXJyXCI6XCJcXHUyMUZEXCIsXCJsb2Jya1wiOlwiXFx1MjdFNlwiLFwibG9uZ2xlZnRhcnJvd1wiOlwiXFx1MjdGNVwiLFwiTG9uZ0xlZnRBcnJvd1wiOlwiXFx1MjdGNVwiLFwiTG9uZ2xlZnRhcnJvd1wiOlwiXFx1MjdGOFwiLFwibG9uZ2xlZnRyaWdodGFycm93XCI6XCJcXHUyN0Y3XCIsXCJMb25nTGVmdFJpZ2h0QXJyb3dcIjpcIlxcdTI3RjdcIixcIkxvbmdsZWZ0cmlnaHRhcnJvd1wiOlwiXFx1MjdGQVwiLFwibG9uZ21hcHN0b1wiOlwiXFx1MjdGQ1wiLFwibG9uZ3JpZ2h0YXJyb3dcIjpcIlxcdTI3RjZcIixcIkxvbmdSaWdodEFycm93XCI6XCJcXHUyN0Y2XCIsXCJMb25ncmlnaHRhcnJvd1wiOlwiXFx1MjdGOVwiLFwibG9vcGFycm93bGVmdFwiOlwiXFx1MjFBQlwiLFwibG9vcGFycm93cmlnaHRcIjpcIlxcdTIxQUNcIixcImxvcGFyXCI6XCJcXHUyOTg1XCIsXCJMb3BmXCI6XCJcXHVEODM1XFx1REQ0M1wiLFwibG9wZlwiOlwiXFx1RDgzNVxcdURENURcIixcImxvcGx1c1wiOlwiXFx1MkEyRFwiLFwibG90aW1lc1wiOlwiXFx1MkEzNFwiLFwibG93YXN0XCI6XCJcXHUyMjE3XCIsXCJsb3diYXJcIjpcIl9cIixcIkxvd2VyTGVmdEFycm93XCI6XCJcXHUyMTk5XCIsXCJMb3dlclJpZ2h0QXJyb3dcIjpcIlxcdTIxOThcIixcImxvelwiOlwiXFx1MjVDQVwiLFwibG96ZW5nZVwiOlwiXFx1MjVDQVwiLFwibG96ZlwiOlwiXFx1MjlFQlwiLFwibHBhclwiOlwiKFwiLFwibHBhcmx0XCI6XCJcXHUyOTkzXCIsXCJscmFyclwiOlwiXFx1MjFDNlwiLFwibHJjb3JuZXJcIjpcIlxcdTIzMUZcIixcImxyaGFyXCI6XCJcXHUyMUNCXCIsXCJscmhhcmRcIjpcIlxcdTI5NkRcIixcImxybVwiOlwiXFx1MjAwRVwiLFwibHJ0cmlcIjpcIlxcdTIyQkZcIixcImxzYXF1b1wiOlwiXFx1MjAzOVwiLFwibHNjclwiOlwiXFx1RDgzNVxcdURDQzFcIixcIkxzY3JcIjpcIlxcdTIxMTJcIixcImxzaFwiOlwiXFx1MjFCMFwiLFwiTHNoXCI6XCJcXHUyMUIwXCIsXCJsc2ltXCI6XCJcXHUyMjcyXCIsXCJsc2ltZVwiOlwiXFx1MkE4RFwiLFwibHNpbWdcIjpcIlxcdTJBOEZcIixcImxzcWJcIjpcIltcIixcImxzcXVvXCI6XCJcXHUyMDE4XCIsXCJsc3F1b3JcIjpcIlxcdTIwMUFcIixcIkxzdHJva1wiOlwiXFx1MDE0MVwiLFwibHN0cm9rXCI6XCJcXHUwMTQyXCIsXCJsdGNjXCI6XCJcXHUyQUE2XCIsXCJsdGNpclwiOlwiXFx1MkE3OVwiLFwibHRcIjpcIjxcIixcIkxUXCI6XCI8XCIsXCJMdFwiOlwiXFx1MjI2QVwiLFwibHRkb3RcIjpcIlxcdTIyRDZcIixcImx0aHJlZVwiOlwiXFx1MjJDQlwiLFwibHRpbWVzXCI6XCJcXHUyMkM5XCIsXCJsdGxhcnJcIjpcIlxcdTI5NzZcIixcImx0cXVlc3RcIjpcIlxcdTJBN0JcIixcImx0cmlcIjpcIlxcdTI1QzNcIixcImx0cmllXCI6XCJcXHUyMkI0XCIsXCJsdHJpZlwiOlwiXFx1MjVDMlwiLFwibHRyUGFyXCI6XCJcXHUyOTk2XCIsXCJsdXJkc2hhclwiOlwiXFx1Mjk0QVwiLFwibHVydWhhclwiOlwiXFx1Mjk2NlwiLFwibHZlcnRuZXFxXCI6XCJcXHUyMjY4XFx1RkUwMFwiLFwibHZuRVwiOlwiXFx1MjI2OFxcdUZFMDBcIixcIm1hY3JcIjpcIlxcdTAwQUZcIixcIm1hbGVcIjpcIlxcdTI2NDJcIixcIm1hbHRcIjpcIlxcdTI3MjBcIixcIm1hbHRlc2VcIjpcIlxcdTI3MjBcIixcIk1hcFwiOlwiXFx1MjkwNVwiLFwibWFwXCI6XCJcXHUyMUE2XCIsXCJtYXBzdG9cIjpcIlxcdTIxQTZcIixcIm1hcHN0b2Rvd25cIjpcIlxcdTIxQTdcIixcIm1hcHN0b2xlZnRcIjpcIlxcdTIxQTRcIixcIm1hcHN0b3VwXCI6XCJcXHUyMUE1XCIsXCJtYXJrZXJcIjpcIlxcdTI1QUVcIixcIm1jb21tYVwiOlwiXFx1MkEyOVwiLFwiTWN5XCI6XCJcXHUwNDFDXCIsXCJtY3lcIjpcIlxcdTA0M0NcIixcIm1kYXNoXCI6XCJcXHUyMDE0XCIsXCJtRERvdFwiOlwiXFx1MjIzQVwiLFwibWVhc3VyZWRhbmdsZVwiOlwiXFx1MjIyMVwiLFwiTWVkaXVtU3BhY2VcIjpcIlxcdTIwNUZcIixcIk1lbGxpbnRyZlwiOlwiXFx1MjEzM1wiLFwiTWZyXCI6XCJcXHVEODM1XFx1REQxMFwiLFwibWZyXCI6XCJcXHVEODM1XFx1REQyQVwiLFwibWhvXCI6XCJcXHUyMTI3XCIsXCJtaWNyb1wiOlwiXFx1MDBCNVwiLFwibWlkYXN0XCI6XCIqXCIsXCJtaWRjaXJcIjpcIlxcdTJBRjBcIixcIm1pZFwiOlwiXFx1MjIyM1wiLFwibWlkZG90XCI6XCJcXHUwMEI3XCIsXCJtaW51c2JcIjpcIlxcdTIyOUZcIixcIm1pbnVzXCI6XCJcXHUyMjEyXCIsXCJtaW51c2RcIjpcIlxcdTIyMzhcIixcIm1pbnVzZHVcIjpcIlxcdTJBMkFcIixcIk1pbnVzUGx1c1wiOlwiXFx1MjIxM1wiLFwibWxjcFwiOlwiXFx1MkFEQlwiLFwibWxkclwiOlwiXFx1MjAyNlwiLFwibW5wbHVzXCI6XCJcXHUyMjEzXCIsXCJtb2RlbHNcIjpcIlxcdTIyQTdcIixcIk1vcGZcIjpcIlxcdUQ4MzVcXHVERDQ0XCIsXCJtb3BmXCI6XCJcXHVEODM1XFx1REQ1RVwiLFwibXBcIjpcIlxcdTIyMTNcIixcIm1zY3JcIjpcIlxcdUQ4MzVcXHVEQ0MyXCIsXCJNc2NyXCI6XCJcXHUyMTMzXCIsXCJtc3Rwb3NcIjpcIlxcdTIyM0VcIixcIk11XCI6XCJcXHUwMzlDXCIsXCJtdVwiOlwiXFx1MDNCQ1wiLFwibXVsdGltYXBcIjpcIlxcdTIyQjhcIixcIm11bWFwXCI6XCJcXHUyMkI4XCIsXCJuYWJsYVwiOlwiXFx1MjIwN1wiLFwiTmFjdXRlXCI6XCJcXHUwMTQzXCIsXCJuYWN1dGVcIjpcIlxcdTAxNDRcIixcIm5hbmdcIjpcIlxcdTIyMjBcXHUyMEQyXCIsXCJuYXBcIjpcIlxcdTIyNDlcIixcIm5hcEVcIjpcIlxcdTJBNzBcXHUwMzM4XCIsXCJuYXBpZFwiOlwiXFx1MjI0QlxcdTAzMzhcIixcIm5hcG9zXCI6XCJcXHUwMTQ5XCIsXCJuYXBwcm94XCI6XCJcXHUyMjQ5XCIsXCJuYXR1cmFsXCI6XCJcXHUyNjZFXCIsXCJuYXR1cmFsc1wiOlwiXFx1MjExNVwiLFwibmF0dXJcIjpcIlxcdTI2NkVcIixcIm5ic3BcIjpcIlxcdTAwQTBcIixcIm5idW1wXCI6XCJcXHUyMjRFXFx1MDMzOFwiLFwibmJ1bXBlXCI6XCJcXHUyMjRGXFx1MDMzOFwiLFwibmNhcFwiOlwiXFx1MkE0M1wiLFwiTmNhcm9uXCI6XCJcXHUwMTQ3XCIsXCJuY2Fyb25cIjpcIlxcdTAxNDhcIixcIk5jZWRpbFwiOlwiXFx1MDE0NVwiLFwibmNlZGlsXCI6XCJcXHUwMTQ2XCIsXCJuY29uZ1wiOlwiXFx1MjI0N1wiLFwibmNvbmdkb3RcIjpcIlxcdTJBNkRcXHUwMzM4XCIsXCJuY3VwXCI6XCJcXHUyQTQyXCIsXCJOY3lcIjpcIlxcdTA0MURcIixcIm5jeVwiOlwiXFx1MDQzRFwiLFwibmRhc2hcIjpcIlxcdTIwMTNcIixcIm5lYXJoa1wiOlwiXFx1MjkyNFwiLFwibmVhcnJcIjpcIlxcdTIxOTdcIixcIm5lQXJyXCI6XCJcXHUyMUQ3XCIsXCJuZWFycm93XCI6XCJcXHUyMTk3XCIsXCJuZVwiOlwiXFx1MjI2MFwiLFwibmVkb3RcIjpcIlxcdTIyNTBcXHUwMzM4XCIsXCJOZWdhdGl2ZU1lZGl1bVNwYWNlXCI6XCJcXHUyMDBCXCIsXCJOZWdhdGl2ZVRoaWNrU3BhY2VcIjpcIlxcdTIwMEJcIixcIk5lZ2F0aXZlVGhpblNwYWNlXCI6XCJcXHUyMDBCXCIsXCJOZWdhdGl2ZVZlcnlUaGluU3BhY2VcIjpcIlxcdTIwMEJcIixcIm5lcXVpdlwiOlwiXFx1MjI2MlwiLFwibmVzZWFyXCI6XCJcXHUyOTI4XCIsXCJuZXNpbVwiOlwiXFx1MjI0MlxcdTAzMzhcIixcIk5lc3RlZEdyZWF0ZXJHcmVhdGVyXCI6XCJcXHUyMjZCXCIsXCJOZXN0ZWRMZXNzTGVzc1wiOlwiXFx1MjI2QVwiLFwiTmV3TGluZVwiOlwiXFxuXCIsXCJuZXhpc3RcIjpcIlxcdTIyMDRcIixcIm5leGlzdHNcIjpcIlxcdTIyMDRcIixcIk5mclwiOlwiXFx1RDgzNVxcdUREMTFcIixcIm5mclwiOlwiXFx1RDgzNVxcdUREMkJcIixcIm5nRVwiOlwiXFx1MjI2N1xcdTAzMzhcIixcIm5nZVwiOlwiXFx1MjI3MVwiLFwibmdlcVwiOlwiXFx1MjI3MVwiLFwibmdlcXFcIjpcIlxcdTIyNjdcXHUwMzM4XCIsXCJuZ2Vxc2xhbnRcIjpcIlxcdTJBN0VcXHUwMzM4XCIsXCJuZ2VzXCI6XCJcXHUyQTdFXFx1MDMzOFwiLFwibkdnXCI6XCJcXHUyMkQ5XFx1MDMzOFwiLFwibmdzaW1cIjpcIlxcdTIyNzVcIixcIm5HdFwiOlwiXFx1MjI2QlxcdTIwRDJcIixcIm5ndFwiOlwiXFx1MjI2RlwiLFwibmd0clwiOlwiXFx1MjI2RlwiLFwibkd0dlwiOlwiXFx1MjI2QlxcdTAzMzhcIixcIm5oYXJyXCI6XCJcXHUyMUFFXCIsXCJuaEFyclwiOlwiXFx1MjFDRVwiLFwibmhwYXJcIjpcIlxcdTJBRjJcIixcIm5pXCI6XCJcXHUyMjBCXCIsXCJuaXNcIjpcIlxcdTIyRkNcIixcIm5pc2RcIjpcIlxcdTIyRkFcIixcIm5pdlwiOlwiXFx1MjIwQlwiLFwiTkpjeVwiOlwiXFx1MDQwQVwiLFwibmpjeVwiOlwiXFx1MDQ1QVwiLFwibmxhcnJcIjpcIlxcdTIxOUFcIixcIm5sQXJyXCI6XCJcXHUyMUNEXCIsXCJubGRyXCI6XCJcXHUyMDI1XCIsXCJubEVcIjpcIlxcdTIyNjZcXHUwMzM4XCIsXCJubGVcIjpcIlxcdTIyNzBcIixcIm5sZWZ0YXJyb3dcIjpcIlxcdTIxOUFcIixcIm5MZWZ0YXJyb3dcIjpcIlxcdTIxQ0RcIixcIm5sZWZ0cmlnaHRhcnJvd1wiOlwiXFx1MjFBRVwiLFwibkxlZnRyaWdodGFycm93XCI6XCJcXHUyMUNFXCIsXCJubGVxXCI6XCJcXHUyMjcwXCIsXCJubGVxcVwiOlwiXFx1MjI2NlxcdTAzMzhcIixcIm5sZXFzbGFudFwiOlwiXFx1MkE3RFxcdTAzMzhcIixcIm5sZXNcIjpcIlxcdTJBN0RcXHUwMzM4XCIsXCJubGVzc1wiOlwiXFx1MjI2RVwiLFwibkxsXCI6XCJcXHUyMkQ4XFx1MDMzOFwiLFwibmxzaW1cIjpcIlxcdTIyNzRcIixcIm5MdFwiOlwiXFx1MjI2QVxcdTIwRDJcIixcIm5sdFwiOlwiXFx1MjI2RVwiLFwibmx0cmlcIjpcIlxcdTIyRUFcIixcIm5sdHJpZVwiOlwiXFx1MjJFQ1wiLFwibkx0dlwiOlwiXFx1MjI2QVxcdTAzMzhcIixcIm5taWRcIjpcIlxcdTIyMjRcIixcIk5vQnJlYWtcIjpcIlxcdTIwNjBcIixcIk5vbkJyZWFraW5nU3BhY2VcIjpcIlxcdTAwQTBcIixcIm5vcGZcIjpcIlxcdUQ4MzVcXHVERDVGXCIsXCJOb3BmXCI6XCJcXHUyMTE1XCIsXCJOb3RcIjpcIlxcdTJBRUNcIixcIm5vdFwiOlwiXFx1MDBBQ1wiLFwiTm90Q29uZ3J1ZW50XCI6XCJcXHUyMjYyXCIsXCJOb3RDdXBDYXBcIjpcIlxcdTIyNkRcIixcIk5vdERvdWJsZVZlcnRpY2FsQmFyXCI6XCJcXHUyMjI2XCIsXCJOb3RFbGVtZW50XCI6XCJcXHUyMjA5XCIsXCJOb3RFcXVhbFwiOlwiXFx1MjI2MFwiLFwiTm90RXF1YWxUaWxkZVwiOlwiXFx1MjI0MlxcdTAzMzhcIixcIk5vdEV4aXN0c1wiOlwiXFx1MjIwNFwiLFwiTm90R3JlYXRlclwiOlwiXFx1MjI2RlwiLFwiTm90R3JlYXRlckVxdWFsXCI6XCJcXHUyMjcxXCIsXCJOb3RHcmVhdGVyRnVsbEVxdWFsXCI6XCJcXHUyMjY3XFx1MDMzOFwiLFwiTm90R3JlYXRlckdyZWF0ZXJcIjpcIlxcdTIyNkJcXHUwMzM4XCIsXCJOb3RHcmVhdGVyTGVzc1wiOlwiXFx1MjI3OVwiLFwiTm90R3JlYXRlclNsYW50RXF1YWxcIjpcIlxcdTJBN0VcXHUwMzM4XCIsXCJOb3RHcmVhdGVyVGlsZGVcIjpcIlxcdTIyNzVcIixcIk5vdEh1bXBEb3duSHVtcFwiOlwiXFx1MjI0RVxcdTAzMzhcIixcIk5vdEh1bXBFcXVhbFwiOlwiXFx1MjI0RlxcdTAzMzhcIixcIm5vdGluXCI6XCJcXHUyMjA5XCIsXCJub3RpbmRvdFwiOlwiXFx1MjJGNVxcdTAzMzhcIixcIm5vdGluRVwiOlwiXFx1MjJGOVxcdTAzMzhcIixcIm5vdGludmFcIjpcIlxcdTIyMDlcIixcIm5vdGludmJcIjpcIlxcdTIyRjdcIixcIm5vdGludmNcIjpcIlxcdTIyRjZcIixcIk5vdExlZnRUcmlhbmdsZUJhclwiOlwiXFx1MjlDRlxcdTAzMzhcIixcIk5vdExlZnRUcmlhbmdsZVwiOlwiXFx1MjJFQVwiLFwiTm90TGVmdFRyaWFuZ2xlRXF1YWxcIjpcIlxcdTIyRUNcIixcIk5vdExlc3NcIjpcIlxcdTIyNkVcIixcIk5vdExlc3NFcXVhbFwiOlwiXFx1MjI3MFwiLFwiTm90TGVzc0dyZWF0ZXJcIjpcIlxcdTIyNzhcIixcIk5vdExlc3NMZXNzXCI6XCJcXHUyMjZBXFx1MDMzOFwiLFwiTm90TGVzc1NsYW50RXF1YWxcIjpcIlxcdTJBN0RcXHUwMzM4XCIsXCJOb3RMZXNzVGlsZGVcIjpcIlxcdTIyNzRcIixcIk5vdE5lc3RlZEdyZWF0ZXJHcmVhdGVyXCI6XCJcXHUyQUEyXFx1MDMzOFwiLFwiTm90TmVzdGVkTGVzc0xlc3NcIjpcIlxcdTJBQTFcXHUwMzM4XCIsXCJub3RuaVwiOlwiXFx1MjIwQ1wiLFwibm90bml2YVwiOlwiXFx1MjIwQ1wiLFwibm90bml2YlwiOlwiXFx1MjJGRVwiLFwibm90bml2Y1wiOlwiXFx1MjJGRFwiLFwiTm90UHJlY2VkZXNcIjpcIlxcdTIyODBcIixcIk5vdFByZWNlZGVzRXF1YWxcIjpcIlxcdTJBQUZcXHUwMzM4XCIsXCJOb3RQcmVjZWRlc1NsYW50RXF1YWxcIjpcIlxcdTIyRTBcIixcIk5vdFJldmVyc2VFbGVtZW50XCI6XCJcXHUyMjBDXCIsXCJOb3RSaWdodFRyaWFuZ2xlQmFyXCI6XCJcXHUyOUQwXFx1MDMzOFwiLFwiTm90UmlnaHRUcmlhbmdsZVwiOlwiXFx1MjJFQlwiLFwiTm90UmlnaHRUcmlhbmdsZUVxdWFsXCI6XCJcXHUyMkVEXCIsXCJOb3RTcXVhcmVTdWJzZXRcIjpcIlxcdTIyOEZcXHUwMzM4XCIsXCJOb3RTcXVhcmVTdWJzZXRFcXVhbFwiOlwiXFx1MjJFMlwiLFwiTm90U3F1YXJlU3VwZXJzZXRcIjpcIlxcdTIyOTBcXHUwMzM4XCIsXCJOb3RTcXVhcmVTdXBlcnNldEVxdWFsXCI6XCJcXHUyMkUzXCIsXCJOb3RTdWJzZXRcIjpcIlxcdTIyODJcXHUyMEQyXCIsXCJOb3RTdWJzZXRFcXVhbFwiOlwiXFx1MjI4OFwiLFwiTm90U3VjY2VlZHNcIjpcIlxcdTIyODFcIixcIk5vdFN1Y2NlZWRzRXF1YWxcIjpcIlxcdTJBQjBcXHUwMzM4XCIsXCJOb3RTdWNjZWVkc1NsYW50RXF1YWxcIjpcIlxcdTIyRTFcIixcIk5vdFN1Y2NlZWRzVGlsZGVcIjpcIlxcdTIyN0ZcXHUwMzM4XCIsXCJOb3RTdXBlcnNldFwiOlwiXFx1MjI4M1xcdTIwRDJcIixcIk5vdFN1cGVyc2V0RXF1YWxcIjpcIlxcdTIyODlcIixcIk5vdFRpbGRlXCI6XCJcXHUyMjQxXCIsXCJOb3RUaWxkZUVxdWFsXCI6XCJcXHUyMjQ0XCIsXCJOb3RUaWxkZUZ1bGxFcXVhbFwiOlwiXFx1MjI0N1wiLFwiTm90VGlsZGVUaWxkZVwiOlwiXFx1MjI0OVwiLFwiTm90VmVydGljYWxCYXJcIjpcIlxcdTIyMjRcIixcIm5wYXJhbGxlbFwiOlwiXFx1MjIyNlwiLFwibnBhclwiOlwiXFx1MjIyNlwiLFwibnBhcnNsXCI6XCJcXHUyQUZEXFx1MjBFNVwiLFwibnBhcnRcIjpcIlxcdTIyMDJcXHUwMzM4XCIsXCJucG9saW50XCI6XCJcXHUyQTE0XCIsXCJucHJcIjpcIlxcdTIyODBcIixcIm5wcmN1ZVwiOlwiXFx1MjJFMFwiLFwibnByZWNcIjpcIlxcdTIyODBcIixcIm5wcmVjZXFcIjpcIlxcdTJBQUZcXHUwMzM4XCIsXCJucHJlXCI6XCJcXHUyQUFGXFx1MDMzOFwiLFwibnJhcnJjXCI6XCJcXHUyOTMzXFx1MDMzOFwiLFwibnJhcnJcIjpcIlxcdTIxOUJcIixcIm5yQXJyXCI6XCJcXHUyMUNGXCIsXCJucmFycndcIjpcIlxcdTIxOURcXHUwMzM4XCIsXCJucmlnaHRhcnJvd1wiOlwiXFx1MjE5QlwiLFwiblJpZ2h0YXJyb3dcIjpcIlxcdTIxQ0ZcIixcIm5ydHJpXCI6XCJcXHUyMkVCXCIsXCJucnRyaWVcIjpcIlxcdTIyRURcIixcIm5zY1wiOlwiXFx1MjI4MVwiLFwibnNjY3VlXCI6XCJcXHUyMkUxXCIsXCJuc2NlXCI6XCJcXHUyQUIwXFx1MDMzOFwiLFwiTnNjclwiOlwiXFx1RDgzNVxcdURDQTlcIixcIm5zY3JcIjpcIlxcdUQ4MzVcXHVEQ0MzXCIsXCJuc2hvcnRtaWRcIjpcIlxcdTIyMjRcIixcIm5zaG9ydHBhcmFsbGVsXCI6XCJcXHUyMjI2XCIsXCJuc2ltXCI6XCJcXHUyMjQxXCIsXCJuc2ltZVwiOlwiXFx1MjI0NFwiLFwibnNpbWVxXCI6XCJcXHUyMjQ0XCIsXCJuc21pZFwiOlwiXFx1MjIyNFwiLFwibnNwYXJcIjpcIlxcdTIyMjZcIixcIm5zcXN1YmVcIjpcIlxcdTIyRTJcIixcIm5zcXN1cGVcIjpcIlxcdTIyRTNcIixcIm5zdWJcIjpcIlxcdTIyODRcIixcIm5zdWJFXCI6XCJcXHUyQUM1XFx1MDMzOFwiLFwibnN1YmVcIjpcIlxcdTIyODhcIixcIm5zdWJzZXRcIjpcIlxcdTIyODJcXHUyMEQyXCIsXCJuc3Vic2V0ZXFcIjpcIlxcdTIyODhcIixcIm5zdWJzZXRlcXFcIjpcIlxcdTJBQzVcXHUwMzM4XCIsXCJuc3VjY1wiOlwiXFx1MjI4MVwiLFwibnN1Y2NlcVwiOlwiXFx1MkFCMFxcdTAzMzhcIixcIm5zdXBcIjpcIlxcdTIyODVcIixcIm5zdXBFXCI6XCJcXHUyQUM2XFx1MDMzOFwiLFwibnN1cGVcIjpcIlxcdTIyODlcIixcIm5zdXBzZXRcIjpcIlxcdTIyODNcXHUyMEQyXCIsXCJuc3Vwc2V0ZXFcIjpcIlxcdTIyODlcIixcIm5zdXBzZXRlcXFcIjpcIlxcdTJBQzZcXHUwMzM4XCIsXCJudGdsXCI6XCJcXHUyMjc5XCIsXCJOdGlsZGVcIjpcIlxcdTAwRDFcIixcIm50aWxkZVwiOlwiXFx1MDBGMVwiLFwibnRsZ1wiOlwiXFx1MjI3OFwiLFwibnRyaWFuZ2xlbGVmdFwiOlwiXFx1MjJFQVwiLFwibnRyaWFuZ2xlbGVmdGVxXCI6XCJcXHUyMkVDXCIsXCJudHJpYW5nbGVyaWdodFwiOlwiXFx1MjJFQlwiLFwibnRyaWFuZ2xlcmlnaHRlcVwiOlwiXFx1MjJFRFwiLFwiTnVcIjpcIlxcdTAzOURcIixcIm51XCI6XCJcXHUwM0JEXCIsXCJudW1cIjpcIiNcIixcIm51bWVyb1wiOlwiXFx1MjExNlwiLFwibnVtc3BcIjpcIlxcdTIwMDdcIixcIm52YXBcIjpcIlxcdTIyNERcXHUyMEQyXCIsXCJudmRhc2hcIjpcIlxcdTIyQUNcIixcIm52RGFzaFwiOlwiXFx1MjJBRFwiLFwiblZkYXNoXCI6XCJcXHUyMkFFXCIsXCJuVkRhc2hcIjpcIlxcdTIyQUZcIixcIm52Z2VcIjpcIlxcdTIyNjVcXHUyMEQyXCIsXCJudmd0XCI6XCI+XFx1MjBEMlwiLFwibnZIYXJyXCI6XCJcXHUyOTA0XCIsXCJudmluZmluXCI6XCJcXHUyOURFXCIsXCJudmxBcnJcIjpcIlxcdTI5MDJcIixcIm52bGVcIjpcIlxcdTIyNjRcXHUyMEQyXCIsXCJudmx0XCI6XCI8XFx1MjBEMlwiLFwibnZsdHJpZVwiOlwiXFx1MjJCNFxcdTIwRDJcIixcIm52ckFyclwiOlwiXFx1MjkwM1wiLFwibnZydHJpZVwiOlwiXFx1MjJCNVxcdTIwRDJcIixcIm52c2ltXCI6XCJcXHUyMjNDXFx1MjBEMlwiLFwibndhcmhrXCI6XCJcXHUyOTIzXCIsXCJud2FyclwiOlwiXFx1MjE5NlwiLFwibndBcnJcIjpcIlxcdTIxRDZcIixcIm53YXJyb3dcIjpcIlxcdTIxOTZcIixcIm53bmVhclwiOlwiXFx1MjkyN1wiLFwiT2FjdXRlXCI6XCJcXHUwMEQzXCIsXCJvYWN1dGVcIjpcIlxcdTAwRjNcIixcIm9hc3RcIjpcIlxcdTIyOUJcIixcIk9jaXJjXCI6XCJcXHUwMEQ0XCIsXCJvY2lyY1wiOlwiXFx1MDBGNFwiLFwib2NpclwiOlwiXFx1MjI5QVwiLFwiT2N5XCI6XCJcXHUwNDFFXCIsXCJvY3lcIjpcIlxcdTA0M0VcIixcIm9kYXNoXCI6XCJcXHUyMjlEXCIsXCJPZGJsYWNcIjpcIlxcdTAxNTBcIixcIm9kYmxhY1wiOlwiXFx1MDE1MVwiLFwib2RpdlwiOlwiXFx1MkEzOFwiLFwib2RvdFwiOlwiXFx1MjI5OVwiLFwib2Rzb2xkXCI6XCJcXHUyOUJDXCIsXCJPRWxpZ1wiOlwiXFx1MDE1MlwiLFwib2VsaWdcIjpcIlxcdTAxNTNcIixcIm9mY2lyXCI6XCJcXHUyOUJGXCIsXCJPZnJcIjpcIlxcdUQ4MzVcXHVERDEyXCIsXCJvZnJcIjpcIlxcdUQ4MzVcXHVERDJDXCIsXCJvZ29uXCI6XCJcXHUwMkRCXCIsXCJPZ3JhdmVcIjpcIlxcdTAwRDJcIixcIm9ncmF2ZVwiOlwiXFx1MDBGMlwiLFwib2d0XCI6XCJcXHUyOUMxXCIsXCJvaGJhclwiOlwiXFx1MjlCNVwiLFwib2htXCI6XCJcXHUwM0E5XCIsXCJvaW50XCI6XCJcXHUyMjJFXCIsXCJvbGFyclwiOlwiXFx1MjFCQVwiLFwib2xjaXJcIjpcIlxcdTI5QkVcIixcIm9sY3Jvc3NcIjpcIlxcdTI5QkJcIixcIm9saW5lXCI6XCJcXHUyMDNFXCIsXCJvbHRcIjpcIlxcdTI5QzBcIixcIk9tYWNyXCI6XCJcXHUwMTRDXCIsXCJvbWFjclwiOlwiXFx1MDE0RFwiLFwiT21lZ2FcIjpcIlxcdTAzQTlcIixcIm9tZWdhXCI6XCJcXHUwM0M5XCIsXCJPbWljcm9uXCI6XCJcXHUwMzlGXCIsXCJvbWljcm9uXCI6XCJcXHUwM0JGXCIsXCJvbWlkXCI6XCJcXHUyOUI2XCIsXCJvbWludXNcIjpcIlxcdTIyOTZcIixcIk9vcGZcIjpcIlxcdUQ4MzVcXHVERDQ2XCIsXCJvb3BmXCI6XCJcXHVEODM1XFx1REQ2MFwiLFwib3BhclwiOlwiXFx1MjlCN1wiLFwiT3BlbkN1cmx5RG91YmxlUXVvdGVcIjpcIlxcdTIwMUNcIixcIk9wZW5DdXJseVF1b3RlXCI6XCJcXHUyMDE4XCIsXCJvcGVycFwiOlwiXFx1MjlCOVwiLFwib3BsdXNcIjpcIlxcdTIyOTVcIixcIm9yYXJyXCI6XCJcXHUyMUJCXCIsXCJPclwiOlwiXFx1MkE1NFwiLFwib3JcIjpcIlxcdTIyMjhcIixcIm9yZFwiOlwiXFx1MkE1RFwiLFwib3JkZXJcIjpcIlxcdTIxMzRcIixcIm9yZGVyb2ZcIjpcIlxcdTIxMzRcIixcIm9yZGZcIjpcIlxcdTAwQUFcIixcIm9yZG1cIjpcIlxcdTAwQkFcIixcIm9yaWdvZlwiOlwiXFx1MjJCNlwiLFwib3JvclwiOlwiXFx1MkE1NlwiLFwib3JzbG9wZVwiOlwiXFx1MkE1N1wiLFwib3J2XCI6XCJcXHUyQTVCXCIsXCJvU1wiOlwiXFx1MjRDOFwiLFwiT3NjclwiOlwiXFx1RDgzNVxcdURDQUFcIixcIm9zY3JcIjpcIlxcdTIxMzRcIixcIk9zbGFzaFwiOlwiXFx1MDBEOFwiLFwib3NsYXNoXCI6XCJcXHUwMEY4XCIsXCJvc29sXCI6XCJcXHUyMjk4XCIsXCJPdGlsZGVcIjpcIlxcdTAwRDVcIixcIm90aWxkZVwiOlwiXFx1MDBGNVwiLFwib3RpbWVzYXNcIjpcIlxcdTJBMzZcIixcIk90aW1lc1wiOlwiXFx1MkEzN1wiLFwib3RpbWVzXCI6XCJcXHUyMjk3XCIsXCJPdW1sXCI6XCJcXHUwMEQ2XCIsXCJvdW1sXCI6XCJcXHUwMEY2XCIsXCJvdmJhclwiOlwiXFx1MjMzRFwiLFwiT3ZlckJhclwiOlwiXFx1MjAzRVwiLFwiT3ZlckJyYWNlXCI6XCJcXHUyM0RFXCIsXCJPdmVyQnJhY2tldFwiOlwiXFx1MjNCNFwiLFwiT3ZlclBhcmVudGhlc2lzXCI6XCJcXHUyM0RDXCIsXCJwYXJhXCI6XCJcXHUwMEI2XCIsXCJwYXJhbGxlbFwiOlwiXFx1MjIyNVwiLFwicGFyXCI6XCJcXHUyMjI1XCIsXCJwYXJzaW1cIjpcIlxcdTJBRjNcIixcInBhcnNsXCI6XCJcXHUyQUZEXCIsXCJwYXJ0XCI6XCJcXHUyMjAyXCIsXCJQYXJ0aWFsRFwiOlwiXFx1MjIwMlwiLFwiUGN5XCI6XCJcXHUwNDFGXCIsXCJwY3lcIjpcIlxcdTA0M0ZcIixcInBlcmNudFwiOlwiJVwiLFwicGVyaW9kXCI6XCIuXCIsXCJwZXJtaWxcIjpcIlxcdTIwMzBcIixcInBlcnBcIjpcIlxcdTIyQTVcIixcInBlcnRlbmtcIjpcIlxcdTIwMzFcIixcIlBmclwiOlwiXFx1RDgzNVxcdUREMTNcIixcInBmclwiOlwiXFx1RDgzNVxcdUREMkRcIixcIlBoaVwiOlwiXFx1MDNBNlwiLFwicGhpXCI6XCJcXHUwM0M2XCIsXCJwaGl2XCI6XCJcXHUwM0Q1XCIsXCJwaG1tYXRcIjpcIlxcdTIxMzNcIixcInBob25lXCI6XCJcXHUyNjBFXCIsXCJQaVwiOlwiXFx1MDNBMFwiLFwicGlcIjpcIlxcdTAzQzBcIixcInBpdGNoZm9ya1wiOlwiXFx1MjJENFwiLFwicGl2XCI6XCJcXHUwM0Q2XCIsXCJwbGFuY2tcIjpcIlxcdTIxMEZcIixcInBsYW5ja2hcIjpcIlxcdTIxMEVcIixcInBsYW5rdlwiOlwiXFx1MjEwRlwiLFwicGx1c2FjaXJcIjpcIlxcdTJBMjNcIixcInBsdXNiXCI6XCJcXHUyMjlFXCIsXCJwbHVzY2lyXCI6XCJcXHUyQTIyXCIsXCJwbHVzXCI6XCIrXCIsXCJwbHVzZG9cIjpcIlxcdTIyMTRcIixcInBsdXNkdVwiOlwiXFx1MkEyNVwiLFwicGx1c2VcIjpcIlxcdTJBNzJcIixcIlBsdXNNaW51c1wiOlwiXFx1MDBCMVwiLFwicGx1c21uXCI6XCJcXHUwMEIxXCIsXCJwbHVzc2ltXCI6XCJcXHUyQTI2XCIsXCJwbHVzdHdvXCI6XCJcXHUyQTI3XCIsXCJwbVwiOlwiXFx1MDBCMVwiLFwiUG9pbmNhcmVwbGFuZVwiOlwiXFx1MjEwQ1wiLFwicG9pbnRpbnRcIjpcIlxcdTJBMTVcIixcInBvcGZcIjpcIlxcdUQ4MzVcXHVERDYxXCIsXCJQb3BmXCI6XCJcXHUyMTE5XCIsXCJwb3VuZFwiOlwiXFx1MDBBM1wiLFwicHJhcFwiOlwiXFx1MkFCN1wiLFwiUHJcIjpcIlxcdTJBQkJcIixcInByXCI6XCJcXHUyMjdBXCIsXCJwcmN1ZVwiOlwiXFx1MjI3Q1wiLFwicHJlY2FwcHJveFwiOlwiXFx1MkFCN1wiLFwicHJlY1wiOlwiXFx1MjI3QVwiLFwicHJlY2N1cmx5ZXFcIjpcIlxcdTIyN0NcIixcIlByZWNlZGVzXCI6XCJcXHUyMjdBXCIsXCJQcmVjZWRlc0VxdWFsXCI6XCJcXHUyQUFGXCIsXCJQcmVjZWRlc1NsYW50RXF1YWxcIjpcIlxcdTIyN0NcIixcIlByZWNlZGVzVGlsZGVcIjpcIlxcdTIyN0VcIixcInByZWNlcVwiOlwiXFx1MkFBRlwiLFwicHJlY25hcHByb3hcIjpcIlxcdTJBQjlcIixcInByZWNuZXFxXCI6XCJcXHUyQUI1XCIsXCJwcmVjbnNpbVwiOlwiXFx1MjJFOFwiLFwicHJlXCI6XCJcXHUyQUFGXCIsXCJwckVcIjpcIlxcdTJBQjNcIixcInByZWNzaW1cIjpcIlxcdTIyN0VcIixcInByaW1lXCI6XCJcXHUyMDMyXCIsXCJQcmltZVwiOlwiXFx1MjAzM1wiLFwicHJpbWVzXCI6XCJcXHUyMTE5XCIsXCJwcm5hcFwiOlwiXFx1MkFCOVwiLFwicHJuRVwiOlwiXFx1MkFCNVwiLFwicHJuc2ltXCI6XCJcXHUyMkU4XCIsXCJwcm9kXCI6XCJcXHUyMjBGXCIsXCJQcm9kdWN0XCI6XCJcXHUyMjBGXCIsXCJwcm9mYWxhclwiOlwiXFx1MjMyRVwiLFwicHJvZmxpbmVcIjpcIlxcdTIzMTJcIixcInByb2ZzdXJmXCI6XCJcXHUyMzEzXCIsXCJwcm9wXCI6XCJcXHUyMjFEXCIsXCJQcm9wb3J0aW9uYWxcIjpcIlxcdTIyMURcIixcIlByb3BvcnRpb25cIjpcIlxcdTIyMzdcIixcInByb3B0b1wiOlwiXFx1MjIxRFwiLFwicHJzaW1cIjpcIlxcdTIyN0VcIixcInBydXJlbFwiOlwiXFx1MjJCMFwiLFwiUHNjclwiOlwiXFx1RDgzNVxcdURDQUJcIixcInBzY3JcIjpcIlxcdUQ4MzVcXHVEQ0M1XCIsXCJQc2lcIjpcIlxcdTAzQThcIixcInBzaVwiOlwiXFx1MDNDOFwiLFwicHVuY3NwXCI6XCJcXHUyMDA4XCIsXCJRZnJcIjpcIlxcdUQ4MzVcXHVERDE0XCIsXCJxZnJcIjpcIlxcdUQ4MzVcXHVERDJFXCIsXCJxaW50XCI6XCJcXHUyQTBDXCIsXCJxb3BmXCI6XCJcXHVEODM1XFx1REQ2MlwiLFwiUW9wZlwiOlwiXFx1MjExQVwiLFwicXByaW1lXCI6XCJcXHUyMDU3XCIsXCJRc2NyXCI6XCJcXHVEODM1XFx1RENBQ1wiLFwicXNjclwiOlwiXFx1RDgzNVxcdURDQzZcIixcInF1YXRlcm5pb25zXCI6XCJcXHUyMTBEXCIsXCJxdWF0aW50XCI6XCJcXHUyQTE2XCIsXCJxdWVzdFwiOlwiP1wiLFwicXVlc3RlcVwiOlwiXFx1MjI1RlwiLFwicXVvdFwiOlwiXFxcIlwiLFwiUVVPVFwiOlwiXFxcIlwiLFwickFhcnJcIjpcIlxcdTIxREJcIixcInJhY2VcIjpcIlxcdTIyM0RcXHUwMzMxXCIsXCJSYWN1dGVcIjpcIlxcdTAxNTRcIixcInJhY3V0ZVwiOlwiXFx1MDE1NVwiLFwicmFkaWNcIjpcIlxcdTIyMUFcIixcInJhZW1wdHl2XCI6XCJcXHUyOUIzXCIsXCJyYW5nXCI6XCJcXHUyN0U5XCIsXCJSYW5nXCI6XCJcXHUyN0VCXCIsXCJyYW5nZFwiOlwiXFx1Mjk5MlwiLFwicmFuZ2VcIjpcIlxcdTI5QTVcIixcInJhbmdsZVwiOlwiXFx1MjdFOVwiLFwicmFxdW9cIjpcIlxcdTAwQkJcIixcInJhcnJhcFwiOlwiXFx1Mjk3NVwiLFwicmFycmJcIjpcIlxcdTIxRTVcIixcInJhcnJiZnNcIjpcIlxcdTI5MjBcIixcInJhcnJjXCI6XCJcXHUyOTMzXCIsXCJyYXJyXCI6XCJcXHUyMTkyXCIsXCJSYXJyXCI6XCJcXHUyMUEwXCIsXCJyQXJyXCI6XCJcXHUyMUQyXCIsXCJyYXJyZnNcIjpcIlxcdTI5MUVcIixcInJhcnJoa1wiOlwiXFx1MjFBQVwiLFwicmFycmxwXCI6XCJcXHUyMUFDXCIsXCJyYXJycGxcIjpcIlxcdTI5NDVcIixcInJhcnJzaW1cIjpcIlxcdTI5NzRcIixcIlJhcnJ0bFwiOlwiXFx1MjkxNlwiLFwicmFycnRsXCI6XCJcXHUyMUEzXCIsXCJyYXJyd1wiOlwiXFx1MjE5RFwiLFwicmF0YWlsXCI6XCJcXHUyOTFBXCIsXCJyQXRhaWxcIjpcIlxcdTI5MUNcIixcInJhdGlvXCI6XCJcXHUyMjM2XCIsXCJyYXRpb25hbHNcIjpcIlxcdTIxMUFcIixcInJiYXJyXCI6XCJcXHUyOTBEXCIsXCJyQmFyclwiOlwiXFx1MjkwRlwiLFwiUkJhcnJcIjpcIlxcdTI5MTBcIixcInJiYnJrXCI6XCJcXHUyNzczXCIsXCJyYnJhY2VcIjpcIn1cIixcInJicmFja1wiOlwiXVwiLFwicmJya2VcIjpcIlxcdTI5OENcIixcInJicmtzbGRcIjpcIlxcdTI5OEVcIixcInJicmtzbHVcIjpcIlxcdTI5OTBcIixcIlJjYXJvblwiOlwiXFx1MDE1OFwiLFwicmNhcm9uXCI6XCJcXHUwMTU5XCIsXCJSY2VkaWxcIjpcIlxcdTAxNTZcIixcInJjZWRpbFwiOlwiXFx1MDE1N1wiLFwicmNlaWxcIjpcIlxcdTIzMDlcIixcInJjdWJcIjpcIn1cIixcIlJjeVwiOlwiXFx1MDQyMFwiLFwicmN5XCI6XCJcXHUwNDQwXCIsXCJyZGNhXCI6XCJcXHUyOTM3XCIsXCJyZGxkaGFyXCI6XCJcXHUyOTY5XCIsXCJyZHF1b1wiOlwiXFx1MjAxRFwiLFwicmRxdW9yXCI6XCJcXHUyMDFEXCIsXCJyZHNoXCI6XCJcXHUyMUIzXCIsXCJyZWFsXCI6XCJcXHUyMTFDXCIsXCJyZWFsaW5lXCI6XCJcXHUyMTFCXCIsXCJyZWFscGFydFwiOlwiXFx1MjExQ1wiLFwicmVhbHNcIjpcIlxcdTIxMURcIixcIlJlXCI6XCJcXHUyMTFDXCIsXCJyZWN0XCI6XCJcXHUyNUFEXCIsXCJyZWdcIjpcIlxcdTAwQUVcIixcIlJFR1wiOlwiXFx1MDBBRVwiLFwiUmV2ZXJzZUVsZW1lbnRcIjpcIlxcdTIyMEJcIixcIlJldmVyc2VFcXVpbGlicml1bVwiOlwiXFx1MjFDQlwiLFwiUmV2ZXJzZVVwRXF1aWxpYnJpdW1cIjpcIlxcdTI5NkZcIixcInJmaXNodFwiOlwiXFx1Mjk3RFwiLFwicmZsb29yXCI6XCJcXHUyMzBCXCIsXCJyZnJcIjpcIlxcdUQ4MzVcXHVERDJGXCIsXCJSZnJcIjpcIlxcdTIxMUNcIixcInJIYXJcIjpcIlxcdTI5NjRcIixcInJoYXJkXCI6XCJcXHUyMUMxXCIsXCJyaGFydVwiOlwiXFx1MjFDMFwiLFwicmhhcnVsXCI6XCJcXHUyOTZDXCIsXCJSaG9cIjpcIlxcdTAzQTFcIixcInJob1wiOlwiXFx1MDNDMVwiLFwicmhvdlwiOlwiXFx1MDNGMVwiLFwiUmlnaHRBbmdsZUJyYWNrZXRcIjpcIlxcdTI3RTlcIixcIlJpZ2h0QXJyb3dCYXJcIjpcIlxcdTIxRTVcIixcInJpZ2h0YXJyb3dcIjpcIlxcdTIxOTJcIixcIlJpZ2h0QXJyb3dcIjpcIlxcdTIxOTJcIixcIlJpZ2h0YXJyb3dcIjpcIlxcdTIxRDJcIixcIlJpZ2h0QXJyb3dMZWZ0QXJyb3dcIjpcIlxcdTIxQzRcIixcInJpZ2h0YXJyb3d0YWlsXCI6XCJcXHUyMUEzXCIsXCJSaWdodENlaWxpbmdcIjpcIlxcdTIzMDlcIixcIlJpZ2h0RG91YmxlQnJhY2tldFwiOlwiXFx1MjdFN1wiLFwiUmlnaHREb3duVGVlVmVjdG9yXCI6XCJcXHUyOTVEXCIsXCJSaWdodERvd25WZWN0b3JCYXJcIjpcIlxcdTI5NTVcIixcIlJpZ2h0RG93blZlY3RvclwiOlwiXFx1MjFDMlwiLFwiUmlnaHRGbG9vclwiOlwiXFx1MjMwQlwiLFwicmlnaHRoYXJwb29uZG93blwiOlwiXFx1MjFDMVwiLFwicmlnaHRoYXJwb29udXBcIjpcIlxcdTIxQzBcIixcInJpZ2h0bGVmdGFycm93c1wiOlwiXFx1MjFDNFwiLFwicmlnaHRsZWZ0aGFycG9vbnNcIjpcIlxcdTIxQ0NcIixcInJpZ2h0cmlnaHRhcnJvd3NcIjpcIlxcdTIxQzlcIixcInJpZ2h0c3F1aWdhcnJvd1wiOlwiXFx1MjE5RFwiLFwiUmlnaHRUZWVBcnJvd1wiOlwiXFx1MjFBNlwiLFwiUmlnaHRUZWVcIjpcIlxcdTIyQTJcIixcIlJpZ2h0VGVlVmVjdG9yXCI6XCJcXHUyOTVCXCIsXCJyaWdodHRocmVldGltZXNcIjpcIlxcdTIyQ0NcIixcIlJpZ2h0VHJpYW5nbGVCYXJcIjpcIlxcdTI5RDBcIixcIlJpZ2h0VHJpYW5nbGVcIjpcIlxcdTIyQjNcIixcIlJpZ2h0VHJpYW5nbGVFcXVhbFwiOlwiXFx1MjJCNVwiLFwiUmlnaHRVcERvd25WZWN0b3JcIjpcIlxcdTI5NEZcIixcIlJpZ2h0VXBUZWVWZWN0b3JcIjpcIlxcdTI5NUNcIixcIlJpZ2h0VXBWZWN0b3JCYXJcIjpcIlxcdTI5NTRcIixcIlJpZ2h0VXBWZWN0b3JcIjpcIlxcdTIxQkVcIixcIlJpZ2h0VmVjdG9yQmFyXCI6XCJcXHUyOTUzXCIsXCJSaWdodFZlY3RvclwiOlwiXFx1MjFDMFwiLFwicmluZ1wiOlwiXFx1MDJEQVwiLFwicmlzaW5nZG90c2VxXCI6XCJcXHUyMjUzXCIsXCJybGFyclwiOlwiXFx1MjFDNFwiLFwicmxoYXJcIjpcIlxcdTIxQ0NcIixcInJsbVwiOlwiXFx1MjAwRlwiLFwicm1vdXN0YWNoZVwiOlwiXFx1MjNCMVwiLFwicm1vdXN0XCI6XCJcXHUyM0IxXCIsXCJybm1pZFwiOlwiXFx1MkFFRVwiLFwicm9hbmdcIjpcIlxcdTI3RURcIixcInJvYXJyXCI6XCJcXHUyMUZFXCIsXCJyb2Jya1wiOlwiXFx1MjdFN1wiLFwicm9wYXJcIjpcIlxcdTI5ODZcIixcInJvcGZcIjpcIlxcdUQ4MzVcXHVERDYzXCIsXCJSb3BmXCI6XCJcXHUyMTFEXCIsXCJyb3BsdXNcIjpcIlxcdTJBMkVcIixcInJvdGltZXNcIjpcIlxcdTJBMzVcIixcIlJvdW5kSW1wbGllc1wiOlwiXFx1Mjk3MFwiLFwicnBhclwiOlwiKVwiLFwicnBhcmd0XCI6XCJcXHUyOTk0XCIsXCJycHBvbGludFwiOlwiXFx1MkExMlwiLFwicnJhcnJcIjpcIlxcdTIxQzlcIixcIlJyaWdodGFycm93XCI6XCJcXHUyMURCXCIsXCJyc2FxdW9cIjpcIlxcdTIwM0FcIixcInJzY3JcIjpcIlxcdUQ4MzVcXHVEQ0M3XCIsXCJSc2NyXCI6XCJcXHUyMTFCXCIsXCJyc2hcIjpcIlxcdTIxQjFcIixcIlJzaFwiOlwiXFx1MjFCMVwiLFwicnNxYlwiOlwiXVwiLFwicnNxdW9cIjpcIlxcdTIwMTlcIixcInJzcXVvclwiOlwiXFx1MjAxOVwiLFwicnRocmVlXCI6XCJcXHUyMkNDXCIsXCJydGltZXNcIjpcIlxcdTIyQ0FcIixcInJ0cmlcIjpcIlxcdTI1QjlcIixcInJ0cmllXCI6XCJcXHUyMkI1XCIsXCJydHJpZlwiOlwiXFx1MjVCOFwiLFwicnRyaWx0cmlcIjpcIlxcdTI5Q0VcIixcIlJ1bGVEZWxheWVkXCI6XCJcXHUyOUY0XCIsXCJydWx1aGFyXCI6XCJcXHUyOTY4XCIsXCJyeFwiOlwiXFx1MjExRVwiLFwiU2FjdXRlXCI6XCJcXHUwMTVBXCIsXCJzYWN1dGVcIjpcIlxcdTAxNUJcIixcInNicXVvXCI6XCJcXHUyMDFBXCIsXCJzY2FwXCI6XCJcXHUyQUI4XCIsXCJTY2Fyb25cIjpcIlxcdTAxNjBcIixcInNjYXJvblwiOlwiXFx1MDE2MVwiLFwiU2NcIjpcIlxcdTJBQkNcIixcInNjXCI6XCJcXHUyMjdCXCIsXCJzY2N1ZVwiOlwiXFx1MjI3RFwiLFwic2NlXCI6XCJcXHUyQUIwXCIsXCJzY0VcIjpcIlxcdTJBQjRcIixcIlNjZWRpbFwiOlwiXFx1MDE1RVwiLFwic2NlZGlsXCI6XCJcXHUwMTVGXCIsXCJTY2lyY1wiOlwiXFx1MDE1Q1wiLFwic2NpcmNcIjpcIlxcdTAxNURcIixcInNjbmFwXCI6XCJcXHUyQUJBXCIsXCJzY25FXCI6XCJcXHUyQUI2XCIsXCJzY25zaW1cIjpcIlxcdTIyRTlcIixcInNjcG9saW50XCI6XCJcXHUyQTEzXCIsXCJzY3NpbVwiOlwiXFx1MjI3RlwiLFwiU2N5XCI6XCJcXHUwNDIxXCIsXCJzY3lcIjpcIlxcdTA0NDFcIixcInNkb3RiXCI6XCJcXHUyMkExXCIsXCJzZG90XCI6XCJcXHUyMkM1XCIsXCJzZG90ZVwiOlwiXFx1MkE2NlwiLFwic2VhcmhrXCI6XCJcXHUyOTI1XCIsXCJzZWFyclwiOlwiXFx1MjE5OFwiLFwic2VBcnJcIjpcIlxcdTIxRDhcIixcInNlYXJyb3dcIjpcIlxcdTIxOThcIixcInNlY3RcIjpcIlxcdTAwQTdcIixcInNlbWlcIjpcIjtcIixcInNlc3dhclwiOlwiXFx1MjkyOVwiLFwic2V0bWludXNcIjpcIlxcdTIyMTZcIixcInNldG1uXCI6XCJcXHUyMjE2XCIsXCJzZXh0XCI6XCJcXHUyNzM2XCIsXCJTZnJcIjpcIlxcdUQ4MzVcXHVERDE2XCIsXCJzZnJcIjpcIlxcdUQ4MzVcXHVERDMwXCIsXCJzZnJvd25cIjpcIlxcdTIzMjJcIixcInNoYXJwXCI6XCJcXHUyNjZGXCIsXCJTSENIY3lcIjpcIlxcdTA0MjlcIixcInNoY2hjeVwiOlwiXFx1MDQ0OVwiLFwiU0hjeVwiOlwiXFx1MDQyOFwiLFwic2hjeVwiOlwiXFx1MDQ0OFwiLFwiU2hvcnREb3duQXJyb3dcIjpcIlxcdTIxOTNcIixcIlNob3J0TGVmdEFycm93XCI6XCJcXHUyMTkwXCIsXCJzaG9ydG1pZFwiOlwiXFx1MjIyM1wiLFwic2hvcnRwYXJhbGxlbFwiOlwiXFx1MjIyNVwiLFwiU2hvcnRSaWdodEFycm93XCI6XCJcXHUyMTkyXCIsXCJTaG9ydFVwQXJyb3dcIjpcIlxcdTIxOTFcIixcInNoeVwiOlwiXFx1MDBBRFwiLFwiU2lnbWFcIjpcIlxcdTAzQTNcIixcInNpZ21hXCI6XCJcXHUwM0MzXCIsXCJzaWdtYWZcIjpcIlxcdTAzQzJcIixcInNpZ21hdlwiOlwiXFx1MDNDMlwiLFwic2ltXCI6XCJcXHUyMjNDXCIsXCJzaW1kb3RcIjpcIlxcdTJBNkFcIixcInNpbWVcIjpcIlxcdTIyNDNcIixcInNpbWVxXCI6XCJcXHUyMjQzXCIsXCJzaW1nXCI6XCJcXHUyQTlFXCIsXCJzaW1nRVwiOlwiXFx1MkFBMFwiLFwic2ltbFwiOlwiXFx1MkE5RFwiLFwic2ltbEVcIjpcIlxcdTJBOUZcIixcInNpbW5lXCI6XCJcXHUyMjQ2XCIsXCJzaW1wbHVzXCI6XCJcXHUyQTI0XCIsXCJzaW1yYXJyXCI6XCJcXHUyOTcyXCIsXCJzbGFyclwiOlwiXFx1MjE5MFwiLFwiU21hbGxDaXJjbGVcIjpcIlxcdTIyMThcIixcInNtYWxsc2V0bWludXNcIjpcIlxcdTIyMTZcIixcInNtYXNocFwiOlwiXFx1MkEzM1wiLFwic21lcGFyc2xcIjpcIlxcdTI5RTRcIixcInNtaWRcIjpcIlxcdTIyMjNcIixcInNtaWxlXCI6XCJcXHUyMzIzXCIsXCJzbXRcIjpcIlxcdTJBQUFcIixcInNtdGVcIjpcIlxcdTJBQUNcIixcInNtdGVzXCI6XCJcXHUyQUFDXFx1RkUwMFwiLFwiU09GVGN5XCI6XCJcXHUwNDJDXCIsXCJzb2Z0Y3lcIjpcIlxcdTA0NENcIixcInNvbGJhclwiOlwiXFx1MjMzRlwiLFwic29sYlwiOlwiXFx1MjlDNFwiLFwic29sXCI6XCIvXCIsXCJTb3BmXCI6XCJcXHVEODM1XFx1REQ0QVwiLFwic29wZlwiOlwiXFx1RDgzNVxcdURENjRcIixcInNwYWRlc1wiOlwiXFx1MjY2MFwiLFwic3BhZGVzdWl0XCI6XCJcXHUyNjYwXCIsXCJzcGFyXCI6XCJcXHUyMjI1XCIsXCJzcWNhcFwiOlwiXFx1MjI5M1wiLFwic3FjYXBzXCI6XCJcXHUyMjkzXFx1RkUwMFwiLFwic3FjdXBcIjpcIlxcdTIyOTRcIixcInNxY3Vwc1wiOlwiXFx1MjI5NFxcdUZFMDBcIixcIlNxcnRcIjpcIlxcdTIyMUFcIixcInNxc3ViXCI6XCJcXHUyMjhGXCIsXCJzcXN1YmVcIjpcIlxcdTIyOTFcIixcInNxc3Vic2V0XCI6XCJcXHUyMjhGXCIsXCJzcXN1YnNldGVxXCI6XCJcXHUyMjkxXCIsXCJzcXN1cFwiOlwiXFx1MjI5MFwiLFwic3FzdXBlXCI6XCJcXHUyMjkyXCIsXCJzcXN1cHNldFwiOlwiXFx1MjI5MFwiLFwic3FzdXBzZXRlcVwiOlwiXFx1MjI5MlwiLFwic3F1YXJlXCI6XCJcXHUyNUExXCIsXCJTcXVhcmVcIjpcIlxcdTI1QTFcIixcIlNxdWFyZUludGVyc2VjdGlvblwiOlwiXFx1MjI5M1wiLFwiU3F1YXJlU3Vic2V0XCI6XCJcXHUyMjhGXCIsXCJTcXVhcmVTdWJzZXRFcXVhbFwiOlwiXFx1MjI5MVwiLFwiU3F1YXJlU3VwZXJzZXRcIjpcIlxcdTIyOTBcIixcIlNxdWFyZVN1cGVyc2V0RXF1YWxcIjpcIlxcdTIyOTJcIixcIlNxdWFyZVVuaW9uXCI6XCJcXHUyMjk0XCIsXCJzcXVhcmZcIjpcIlxcdTI1QUFcIixcInNxdVwiOlwiXFx1MjVBMVwiLFwic3F1ZlwiOlwiXFx1MjVBQVwiLFwic3JhcnJcIjpcIlxcdTIxOTJcIixcIlNzY3JcIjpcIlxcdUQ4MzVcXHVEQ0FFXCIsXCJzc2NyXCI6XCJcXHVEODM1XFx1RENDOFwiLFwic3NldG1uXCI6XCJcXHUyMjE2XCIsXCJzc21pbGVcIjpcIlxcdTIzMjNcIixcInNzdGFyZlwiOlwiXFx1MjJDNlwiLFwiU3RhclwiOlwiXFx1MjJDNlwiLFwic3RhclwiOlwiXFx1MjYwNlwiLFwic3RhcmZcIjpcIlxcdTI2MDVcIixcInN0cmFpZ2h0ZXBzaWxvblwiOlwiXFx1MDNGNVwiLFwic3RyYWlnaHRwaGlcIjpcIlxcdTAzRDVcIixcInN0cm5zXCI6XCJcXHUwMEFGXCIsXCJzdWJcIjpcIlxcdTIyODJcIixcIlN1YlwiOlwiXFx1MjJEMFwiLFwic3ViZG90XCI6XCJcXHUyQUJEXCIsXCJzdWJFXCI6XCJcXHUyQUM1XCIsXCJzdWJlXCI6XCJcXHUyMjg2XCIsXCJzdWJlZG90XCI6XCJcXHUyQUMzXCIsXCJzdWJtdWx0XCI6XCJcXHUyQUMxXCIsXCJzdWJuRVwiOlwiXFx1MkFDQlwiLFwic3VibmVcIjpcIlxcdTIyOEFcIixcInN1YnBsdXNcIjpcIlxcdTJBQkZcIixcInN1YnJhcnJcIjpcIlxcdTI5NzlcIixcInN1YnNldFwiOlwiXFx1MjI4MlwiLFwiU3Vic2V0XCI6XCJcXHUyMkQwXCIsXCJzdWJzZXRlcVwiOlwiXFx1MjI4NlwiLFwic3Vic2V0ZXFxXCI6XCJcXHUyQUM1XCIsXCJTdWJzZXRFcXVhbFwiOlwiXFx1MjI4NlwiLFwic3Vic2V0bmVxXCI6XCJcXHUyMjhBXCIsXCJzdWJzZXRuZXFxXCI6XCJcXHUyQUNCXCIsXCJzdWJzaW1cIjpcIlxcdTJBQzdcIixcInN1YnN1YlwiOlwiXFx1MkFENVwiLFwic3Vic3VwXCI6XCJcXHUyQUQzXCIsXCJzdWNjYXBwcm94XCI6XCJcXHUyQUI4XCIsXCJzdWNjXCI6XCJcXHUyMjdCXCIsXCJzdWNjY3VybHllcVwiOlwiXFx1MjI3RFwiLFwiU3VjY2VlZHNcIjpcIlxcdTIyN0JcIixcIlN1Y2NlZWRzRXF1YWxcIjpcIlxcdTJBQjBcIixcIlN1Y2NlZWRzU2xhbnRFcXVhbFwiOlwiXFx1MjI3RFwiLFwiU3VjY2VlZHNUaWxkZVwiOlwiXFx1MjI3RlwiLFwic3VjY2VxXCI6XCJcXHUyQUIwXCIsXCJzdWNjbmFwcHJveFwiOlwiXFx1MkFCQVwiLFwic3VjY25lcXFcIjpcIlxcdTJBQjZcIixcInN1Y2Nuc2ltXCI6XCJcXHUyMkU5XCIsXCJzdWNjc2ltXCI6XCJcXHUyMjdGXCIsXCJTdWNoVGhhdFwiOlwiXFx1MjIwQlwiLFwic3VtXCI6XCJcXHUyMjExXCIsXCJTdW1cIjpcIlxcdTIyMTFcIixcInN1bmdcIjpcIlxcdTI2NkFcIixcInN1cDFcIjpcIlxcdTAwQjlcIixcInN1cDJcIjpcIlxcdTAwQjJcIixcInN1cDNcIjpcIlxcdTAwQjNcIixcInN1cFwiOlwiXFx1MjI4M1wiLFwiU3VwXCI6XCJcXHUyMkQxXCIsXCJzdXBkb3RcIjpcIlxcdTJBQkVcIixcInN1cGRzdWJcIjpcIlxcdTJBRDhcIixcInN1cEVcIjpcIlxcdTJBQzZcIixcInN1cGVcIjpcIlxcdTIyODdcIixcInN1cGVkb3RcIjpcIlxcdTJBQzRcIixcIlN1cGVyc2V0XCI6XCJcXHUyMjgzXCIsXCJTdXBlcnNldEVxdWFsXCI6XCJcXHUyMjg3XCIsXCJzdXBoc29sXCI6XCJcXHUyN0M5XCIsXCJzdXBoc3ViXCI6XCJcXHUyQUQ3XCIsXCJzdXBsYXJyXCI6XCJcXHUyOTdCXCIsXCJzdXBtdWx0XCI6XCJcXHUyQUMyXCIsXCJzdXBuRVwiOlwiXFx1MkFDQ1wiLFwic3VwbmVcIjpcIlxcdTIyOEJcIixcInN1cHBsdXNcIjpcIlxcdTJBQzBcIixcInN1cHNldFwiOlwiXFx1MjI4M1wiLFwiU3Vwc2V0XCI6XCJcXHUyMkQxXCIsXCJzdXBzZXRlcVwiOlwiXFx1MjI4N1wiLFwic3Vwc2V0ZXFxXCI6XCJcXHUyQUM2XCIsXCJzdXBzZXRuZXFcIjpcIlxcdTIyOEJcIixcInN1cHNldG5lcXFcIjpcIlxcdTJBQ0NcIixcInN1cHNpbVwiOlwiXFx1MkFDOFwiLFwic3Vwc3ViXCI6XCJcXHUyQUQ0XCIsXCJzdXBzdXBcIjpcIlxcdTJBRDZcIixcInN3YXJoa1wiOlwiXFx1MjkyNlwiLFwic3dhcnJcIjpcIlxcdTIxOTlcIixcInN3QXJyXCI6XCJcXHUyMUQ5XCIsXCJzd2Fycm93XCI6XCJcXHUyMTk5XCIsXCJzd253YXJcIjpcIlxcdTI5MkFcIixcInN6bGlnXCI6XCJcXHUwMERGXCIsXCJUYWJcIjpcIlxcdFwiLFwidGFyZ2V0XCI6XCJcXHUyMzE2XCIsXCJUYXVcIjpcIlxcdTAzQTRcIixcInRhdVwiOlwiXFx1MDNDNFwiLFwidGJya1wiOlwiXFx1MjNCNFwiLFwiVGNhcm9uXCI6XCJcXHUwMTY0XCIsXCJ0Y2Fyb25cIjpcIlxcdTAxNjVcIixcIlRjZWRpbFwiOlwiXFx1MDE2MlwiLFwidGNlZGlsXCI6XCJcXHUwMTYzXCIsXCJUY3lcIjpcIlxcdTA0MjJcIixcInRjeVwiOlwiXFx1MDQ0MlwiLFwidGRvdFwiOlwiXFx1MjBEQlwiLFwidGVscmVjXCI6XCJcXHUyMzE1XCIsXCJUZnJcIjpcIlxcdUQ4MzVcXHVERDE3XCIsXCJ0ZnJcIjpcIlxcdUQ4MzVcXHVERDMxXCIsXCJ0aGVyZTRcIjpcIlxcdTIyMzRcIixcInRoZXJlZm9yZVwiOlwiXFx1MjIzNFwiLFwiVGhlcmVmb3JlXCI6XCJcXHUyMjM0XCIsXCJUaGV0YVwiOlwiXFx1MDM5OFwiLFwidGhldGFcIjpcIlxcdTAzQjhcIixcInRoZXRhc3ltXCI6XCJcXHUwM0QxXCIsXCJ0aGV0YXZcIjpcIlxcdTAzRDFcIixcInRoaWNrYXBwcm94XCI6XCJcXHUyMjQ4XCIsXCJ0aGlja3NpbVwiOlwiXFx1MjIzQ1wiLFwiVGhpY2tTcGFjZVwiOlwiXFx1MjA1RlxcdTIwMEFcIixcIlRoaW5TcGFjZVwiOlwiXFx1MjAwOVwiLFwidGhpbnNwXCI6XCJcXHUyMDA5XCIsXCJ0aGthcFwiOlwiXFx1MjI0OFwiLFwidGhrc2ltXCI6XCJcXHUyMjNDXCIsXCJUSE9STlwiOlwiXFx1MDBERVwiLFwidGhvcm5cIjpcIlxcdTAwRkVcIixcInRpbGRlXCI6XCJcXHUwMkRDXCIsXCJUaWxkZVwiOlwiXFx1MjIzQ1wiLFwiVGlsZGVFcXVhbFwiOlwiXFx1MjI0M1wiLFwiVGlsZGVGdWxsRXF1YWxcIjpcIlxcdTIyNDVcIixcIlRpbGRlVGlsZGVcIjpcIlxcdTIyNDhcIixcInRpbWVzYmFyXCI6XCJcXHUyQTMxXCIsXCJ0aW1lc2JcIjpcIlxcdTIyQTBcIixcInRpbWVzXCI6XCJcXHUwMEQ3XCIsXCJ0aW1lc2RcIjpcIlxcdTJBMzBcIixcInRpbnRcIjpcIlxcdTIyMkRcIixcInRvZWFcIjpcIlxcdTI5MjhcIixcInRvcGJvdFwiOlwiXFx1MjMzNlwiLFwidG9wY2lyXCI6XCJcXHUyQUYxXCIsXCJ0b3BcIjpcIlxcdTIyQTRcIixcIlRvcGZcIjpcIlxcdUQ4MzVcXHVERDRCXCIsXCJ0b3BmXCI6XCJcXHVEODM1XFx1REQ2NVwiLFwidG9wZm9ya1wiOlwiXFx1MkFEQVwiLFwidG9zYVwiOlwiXFx1MjkyOVwiLFwidHByaW1lXCI6XCJcXHUyMDM0XCIsXCJ0cmFkZVwiOlwiXFx1MjEyMlwiLFwiVFJBREVcIjpcIlxcdTIxMjJcIixcInRyaWFuZ2xlXCI6XCJcXHUyNUI1XCIsXCJ0cmlhbmdsZWRvd25cIjpcIlxcdTI1QkZcIixcInRyaWFuZ2xlbGVmdFwiOlwiXFx1MjVDM1wiLFwidHJpYW5nbGVsZWZ0ZXFcIjpcIlxcdTIyQjRcIixcInRyaWFuZ2xlcVwiOlwiXFx1MjI1Q1wiLFwidHJpYW5nbGVyaWdodFwiOlwiXFx1MjVCOVwiLFwidHJpYW5nbGVyaWdodGVxXCI6XCJcXHUyMkI1XCIsXCJ0cmlkb3RcIjpcIlxcdTI1RUNcIixcInRyaWVcIjpcIlxcdTIyNUNcIixcInRyaW1pbnVzXCI6XCJcXHUyQTNBXCIsXCJUcmlwbGVEb3RcIjpcIlxcdTIwREJcIixcInRyaXBsdXNcIjpcIlxcdTJBMzlcIixcInRyaXNiXCI6XCJcXHUyOUNEXCIsXCJ0cml0aW1lXCI6XCJcXHUyQTNCXCIsXCJ0cnBleml1bVwiOlwiXFx1MjNFMlwiLFwiVHNjclwiOlwiXFx1RDgzNVxcdURDQUZcIixcInRzY3JcIjpcIlxcdUQ4MzVcXHVEQ0M5XCIsXCJUU2N5XCI6XCJcXHUwNDI2XCIsXCJ0c2N5XCI6XCJcXHUwNDQ2XCIsXCJUU0hjeVwiOlwiXFx1MDQwQlwiLFwidHNoY3lcIjpcIlxcdTA0NUJcIixcIlRzdHJva1wiOlwiXFx1MDE2NlwiLFwidHN0cm9rXCI6XCJcXHUwMTY3XCIsXCJ0d2l4dFwiOlwiXFx1MjI2Q1wiLFwidHdvaGVhZGxlZnRhcnJvd1wiOlwiXFx1MjE5RVwiLFwidHdvaGVhZHJpZ2h0YXJyb3dcIjpcIlxcdTIxQTBcIixcIlVhY3V0ZVwiOlwiXFx1MDBEQVwiLFwidWFjdXRlXCI6XCJcXHUwMEZBXCIsXCJ1YXJyXCI6XCJcXHUyMTkxXCIsXCJVYXJyXCI6XCJcXHUyMTlGXCIsXCJ1QXJyXCI6XCJcXHUyMUQxXCIsXCJVYXJyb2NpclwiOlwiXFx1Mjk0OVwiLFwiVWJyY3lcIjpcIlxcdTA0MEVcIixcInVicmN5XCI6XCJcXHUwNDVFXCIsXCJVYnJldmVcIjpcIlxcdTAxNkNcIixcInVicmV2ZVwiOlwiXFx1MDE2RFwiLFwiVWNpcmNcIjpcIlxcdTAwREJcIixcInVjaXJjXCI6XCJcXHUwMEZCXCIsXCJVY3lcIjpcIlxcdTA0MjNcIixcInVjeVwiOlwiXFx1MDQ0M1wiLFwidWRhcnJcIjpcIlxcdTIxQzVcIixcIlVkYmxhY1wiOlwiXFx1MDE3MFwiLFwidWRibGFjXCI6XCJcXHUwMTcxXCIsXCJ1ZGhhclwiOlwiXFx1Mjk2RVwiLFwidWZpc2h0XCI6XCJcXHUyOTdFXCIsXCJVZnJcIjpcIlxcdUQ4MzVcXHVERDE4XCIsXCJ1ZnJcIjpcIlxcdUQ4MzVcXHVERDMyXCIsXCJVZ3JhdmVcIjpcIlxcdTAwRDlcIixcInVncmF2ZVwiOlwiXFx1MDBGOVwiLFwidUhhclwiOlwiXFx1Mjk2M1wiLFwidWhhcmxcIjpcIlxcdTIxQkZcIixcInVoYXJyXCI6XCJcXHUyMUJFXCIsXCJ1aGJsa1wiOlwiXFx1MjU4MFwiLFwidWxjb3JuXCI6XCJcXHUyMzFDXCIsXCJ1bGNvcm5lclwiOlwiXFx1MjMxQ1wiLFwidWxjcm9wXCI6XCJcXHUyMzBGXCIsXCJ1bHRyaVwiOlwiXFx1MjVGOFwiLFwiVW1hY3JcIjpcIlxcdTAxNkFcIixcInVtYWNyXCI6XCJcXHUwMTZCXCIsXCJ1bWxcIjpcIlxcdTAwQThcIixcIlVuZGVyQmFyXCI6XCJfXCIsXCJVbmRlckJyYWNlXCI6XCJcXHUyM0RGXCIsXCJVbmRlckJyYWNrZXRcIjpcIlxcdTIzQjVcIixcIlVuZGVyUGFyZW50aGVzaXNcIjpcIlxcdTIzRERcIixcIlVuaW9uXCI6XCJcXHUyMkMzXCIsXCJVbmlvblBsdXNcIjpcIlxcdTIyOEVcIixcIlVvZ29uXCI6XCJcXHUwMTcyXCIsXCJ1b2dvblwiOlwiXFx1MDE3M1wiLFwiVW9wZlwiOlwiXFx1RDgzNVxcdURENENcIixcInVvcGZcIjpcIlxcdUQ4MzVcXHVERDY2XCIsXCJVcEFycm93QmFyXCI6XCJcXHUyOTEyXCIsXCJ1cGFycm93XCI6XCJcXHUyMTkxXCIsXCJVcEFycm93XCI6XCJcXHUyMTkxXCIsXCJVcGFycm93XCI6XCJcXHUyMUQxXCIsXCJVcEFycm93RG93bkFycm93XCI6XCJcXHUyMUM1XCIsXCJ1cGRvd25hcnJvd1wiOlwiXFx1MjE5NVwiLFwiVXBEb3duQXJyb3dcIjpcIlxcdTIxOTVcIixcIlVwZG93bmFycm93XCI6XCJcXHUyMUQ1XCIsXCJVcEVxdWlsaWJyaXVtXCI6XCJcXHUyOTZFXCIsXCJ1cGhhcnBvb25sZWZ0XCI6XCJcXHUyMUJGXCIsXCJ1cGhhcnBvb25yaWdodFwiOlwiXFx1MjFCRVwiLFwidXBsdXNcIjpcIlxcdTIyOEVcIixcIlVwcGVyTGVmdEFycm93XCI6XCJcXHUyMTk2XCIsXCJVcHBlclJpZ2h0QXJyb3dcIjpcIlxcdTIxOTdcIixcInVwc2lcIjpcIlxcdTAzQzVcIixcIlVwc2lcIjpcIlxcdTAzRDJcIixcInVwc2loXCI6XCJcXHUwM0QyXCIsXCJVcHNpbG9uXCI6XCJcXHUwM0E1XCIsXCJ1cHNpbG9uXCI6XCJcXHUwM0M1XCIsXCJVcFRlZUFycm93XCI6XCJcXHUyMUE1XCIsXCJVcFRlZVwiOlwiXFx1MjJBNVwiLFwidXB1cGFycm93c1wiOlwiXFx1MjFDOFwiLFwidXJjb3JuXCI6XCJcXHUyMzFEXCIsXCJ1cmNvcm5lclwiOlwiXFx1MjMxRFwiLFwidXJjcm9wXCI6XCJcXHUyMzBFXCIsXCJVcmluZ1wiOlwiXFx1MDE2RVwiLFwidXJpbmdcIjpcIlxcdTAxNkZcIixcInVydHJpXCI6XCJcXHUyNUY5XCIsXCJVc2NyXCI6XCJcXHVEODM1XFx1RENCMFwiLFwidXNjclwiOlwiXFx1RDgzNVxcdURDQ0FcIixcInV0ZG90XCI6XCJcXHUyMkYwXCIsXCJVdGlsZGVcIjpcIlxcdTAxNjhcIixcInV0aWxkZVwiOlwiXFx1MDE2OVwiLFwidXRyaVwiOlwiXFx1MjVCNVwiLFwidXRyaWZcIjpcIlxcdTI1QjRcIixcInV1YXJyXCI6XCJcXHUyMUM4XCIsXCJVdW1sXCI6XCJcXHUwMERDXCIsXCJ1dW1sXCI6XCJcXHUwMEZDXCIsXCJ1d2FuZ2xlXCI6XCJcXHUyOUE3XCIsXCJ2YW5ncnRcIjpcIlxcdTI5OUNcIixcInZhcmVwc2lsb25cIjpcIlxcdTAzRjVcIixcInZhcmthcHBhXCI6XCJcXHUwM0YwXCIsXCJ2YXJub3RoaW5nXCI6XCJcXHUyMjA1XCIsXCJ2YXJwaGlcIjpcIlxcdTAzRDVcIixcInZhcnBpXCI6XCJcXHUwM0Q2XCIsXCJ2YXJwcm9wdG9cIjpcIlxcdTIyMURcIixcInZhcnJcIjpcIlxcdTIxOTVcIixcInZBcnJcIjpcIlxcdTIxRDVcIixcInZhcnJob1wiOlwiXFx1MDNGMVwiLFwidmFyc2lnbWFcIjpcIlxcdTAzQzJcIixcInZhcnN1YnNldG5lcVwiOlwiXFx1MjI4QVxcdUZFMDBcIixcInZhcnN1YnNldG5lcXFcIjpcIlxcdTJBQ0JcXHVGRTAwXCIsXCJ2YXJzdXBzZXRuZXFcIjpcIlxcdTIyOEJcXHVGRTAwXCIsXCJ2YXJzdXBzZXRuZXFxXCI6XCJcXHUyQUNDXFx1RkUwMFwiLFwidmFydGhldGFcIjpcIlxcdTAzRDFcIixcInZhcnRyaWFuZ2xlbGVmdFwiOlwiXFx1MjJCMlwiLFwidmFydHJpYW5nbGVyaWdodFwiOlwiXFx1MjJCM1wiLFwidkJhclwiOlwiXFx1MkFFOFwiLFwiVmJhclwiOlwiXFx1MkFFQlwiLFwidkJhcnZcIjpcIlxcdTJBRTlcIixcIlZjeVwiOlwiXFx1MDQxMlwiLFwidmN5XCI6XCJcXHUwNDMyXCIsXCJ2ZGFzaFwiOlwiXFx1MjJBMlwiLFwidkRhc2hcIjpcIlxcdTIyQThcIixcIlZkYXNoXCI6XCJcXHUyMkE5XCIsXCJWRGFzaFwiOlwiXFx1MjJBQlwiLFwiVmRhc2hsXCI6XCJcXHUyQUU2XCIsXCJ2ZWViYXJcIjpcIlxcdTIyQkJcIixcInZlZVwiOlwiXFx1MjIyOFwiLFwiVmVlXCI6XCJcXHUyMkMxXCIsXCJ2ZWVlcVwiOlwiXFx1MjI1QVwiLFwidmVsbGlwXCI6XCJcXHUyMkVFXCIsXCJ2ZXJiYXJcIjpcInxcIixcIlZlcmJhclwiOlwiXFx1MjAxNlwiLFwidmVydFwiOlwifFwiLFwiVmVydFwiOlwiXFx1MjAxNlwiLFwiVmVydGljYWxCYXJcIjpcIlxcdTIyMjNcIixcIlZlcnRpY2FsTGluZVwiOlwifFwiLFwiVmVydGljYWxTZXBhcmF0b3JcIjpcIlxcdTI3NThcIixcIlZlcnRpY2FsVGlsZGVcIjpcIlxcdTIyNDBcIixcIlZlcnlUaGluU3BhY2VcIjpcIlxcdTIwMEFcIixcIlZmclwiOlwiXFx1RDgzNVxcdUREMTlcIixcInZmclwiOlwiXFx1RDgzNVxcdUREMzNcIixcInZsdHJpXCI6XCJcXHUyMkIyXCIsXCJ2bnN1YlwiOlwiXFx1MjI4MlxcdTIwRDJcIixcInZuc3VwXCI6XCJcXHUyMjgzXFx1MjBEMlwiLFwiVm9wZlwiOlwiXFx1RDgzNVxcdURENERcIixcInZvcGZcIjpcIlxcdUQ4MzVcXHVERDY3XCIsXCJ2cHJvcFwiOlwiXFx1MjIxRFwiLFwidnJ0cmlcIjpcIlxcdTIyQjNcIixcIlZzY3JcIjpcIlxcdUQ4MzVcXHVEQ0IxXCIsXCJ2c2NyXCI6XCJcXHVEODM1XFx1RENDQlwiLFwidnN1Ym5FXCI6XCJcXHUyQUNCXFx1RkUwMFwiLFwidnN1Ym5lXCI6XCJcXHUyMjhBXFx1RkUwMFwiLFwidnN1cG5FXCI6XCJcXHUyQUNDXFx1RkUwMFwiLFwidnN1cG5lXCI6XCJcXHUyMjhCXFx1RkUwMFwiLFwiVnZkYXNoXCI6XCJcXHUyMkFBXCIsXCJ2emlnemFnXCI6XCJcXHUyOTlBXCIsXCJXY2lyY1wiOlwiXFx1MDE3NFwiLFwid2NpcmNcIjpcIlxcdTAxNzVcIixcIndlZGJhclwiOlwiXFx1MkE1RlwiLFwid2VkZ2VcIjpcIlxcdTIyMjdcIixcIldlZGdlXCI6XCJcXHUyMkMwXCIsXCJ3ZWRnZXFcIjpcIlxcdTIyNTlcIixcIndlaWVycFwiOlwiXFx1MjExOFwiLFwiV2ZyXCI6XCJcXHVEODM1XFx1REQxQVwiLFwid2ZyXCI6XCJcXHVEODM1XFx1REQzNFwiLFwiV29wZlwiOlwiXFx1RDgzNVxcdURENEVcIixcIndvcGZcIjpcIlxcdUQ4MzVcXHVERDY4XCIsXCJ3cFwiOlwiXFx1MjExOFwiLFwid3JcIjpcIlxcdTIyNDBcIixcIndyZWF0aFwiOlwiXFx1MjI0MFwiLFwiV3NjclwiOlwiXFx1RDgzNVxcdURDQjJcIixcIndzY3JcIjpcIlxcdUQ4MzVcXHVEQ0NDXCIsXCJ4Y2FwXCI6XCJcXHUyMkMyXCIsXCJ4Y2lyY1wiOlwiXFx1MjVFRlwiLFwieGN1cFwiOlwiXFx1MjJDM1wiLFwieGR0cmlcIjpcIlxcdTI1QkRcIixcIlhmclwiOlwiXFx1RDgzNVxcdUREMUJcIixcInhmclwiOlwiXFx1RDgzNVxcdUREMzVcIixcInhoYXJyXCI6XCJcXHUyN0Y3XCIsXCJ4aEFyclwiOlwiXFx1MjdGQVwiLFwiWGlcIjpcIlxcdTAzOUVcIixcInhpXCI6XCJcXHUwM0JFXCIsXCJ4bGFyclwiOlwiXFx1MjdGNVwiLFwieGxBcnJcIjpcIlxcdTI3RjhcIixcInhtYXBcIjpcIlxcdTI3RkNcIixcInhuaXNcIjpcIlxcdTIyRkJcIixcInhvZG90XCI6XCJcXHUyQTAwXCIsXCJYb3BmXCI6XCJcXHVEODM1XFx1REQ0RlwiLFwieG9wZlwiOlwiXFx1RDgzNVxcdURENjlcIixcInhvcGx1c1wiOlwiXFx1MkEwMVwiLFwieG90aW1lXCI6XCJcXHUyQTAyXCIsXCJ4cmFyclwiOlwiXFx1MjdGNlwiLFwieHJBcnJcIjpcIlxcdTI3RjlcIixcIlhzY3JcIjpcIlxcdUQ4MzVcXHVEQ0IzXCIsXCJ4c2NyXCI6XCJcXHVEODM1XFx1RENDRFwiLFwieHNxY3VwXCI6XCJcXHUyQTA2XCIsXCJ4dXBsdXNcIjpcIlxcdTJBMDRcIixcInh1dHJpXCI6XCJcXHUyNUIzXCIsXCJ4dmVlXCI6XCJcXHUyMkMxXCIsXCJ4d2VkZ2VcIjpcIlxcdTIyQzBcIixcIllhY3V0ZVwiOlwiXFx1MDBERFwiLFwieWFjdXRlXCI6XCJcXHUwMEZEXCIsXCJZQWN5XCI6XCJcXHUwNDJGXCIsXCJ5YWN5XCI6XCJcXHUwNDRGXCIsXCJZY2lyY1wiOlwiXFx1MDE3NlwiLFwieWNpcmNcIjpcIlxcdTAxNzdcIixcIlljeVwiOlwiXFx1MDQyQlwiLFwieWN5XCI6XCJcXHUwNDRCXCIsXCJ5ZW5cIjpcIlxcdTAwQTVcIixcIllmclwiOlwiXFx1RDgzNVxcdUREMUNcIixcInlmclwiOlwiXFx1RDgzNVxcdUREMzZcIixcIllJY3lcIjpcIlxcdTA0MDdcIixcInlpY3lcIjpcIlxcdTA0NTdcIixcIllvcGZcIjpcIlxcdUQ4MzVcXHVERDUwXCIsXCJ5b3BmXCI6XCJcXHVEODM1XFx1REQ2QVwiLFwiWXNjclwiOlwiXFx1RDgzNVxcdURDQjRcIixcInlzY3JcIjpcIlxcdUQ4MzVcXHVEQ0NFXCIsXCJZVWN5XCI6XCJcXHUwNDJFXCIsXCJ5dWN5XCI6XCJcXHUwNDRFXCIsXCJ5dW1sXCI6XCJcXHUwMEZGXCIsXCJZdW1sXCI6XCJcXHUwMTc4XCIsXCJaYWN1dGVcIjpcIlxcdTAxNzlcIixcInphY3V0ZVwiOlwiXFx1MDE3QVwiLFwiWmNhcm9uXCI6XCJcXHUwMTdEXCIsXCJ6Y2Fyb25cIjpcIlxcdTAxN0VcIixcIlpjeVwiOlwiXFx1MDQxN1wiLFwiemN5XCI6XCJcXHUwNDM3XCIsXCJaZG90XCI6XCJcXHUwMTdCXCIsXCJ6ZG90XCI6XCJcXHUwMTdDXCIsXCJ6ZWV0cmZcIjpcIlxcdTIxMjhcIixcIlplcm9XaWR0aFNwYWNlXCI6XCJcXHUyMDBCXCIsXCJaZXRhXCI6XCJcXHUwMzk2XCIsXCJ6ZXRhXCI6XCJcXHUwM0I2XCIsXCJ6ZnJcIjpcIlxcdUQ4MzVcXHVERDM3XCIsXCJaZnJcIjpcIlxcdTIxMjhcIixcIlpIY3lcIjpcIlxcdTA0MTZcIixcInpoY3lcIjpcIlxcdTA0MzZcIixcInppZ3JhcnJcIjpcIlxcdTIxRERcIixcInpvcGZcIjpcIlxcdUQ4MzVcXHVERDZCXCIsXCJab3BmXCI6XCJcXHUyMTI0XCIsXCJac2NyXCI6XCJcXHVEODM1XFx1RENCNVwiLFwienNjclwiOlwiXFx1RDgzNVxcdURDQ0ZcIixcInp3alwiOlwiXFx1MjAwRFwiLFwiendualwiOlwiXFx1MjAwQ1wifSIsIm1vZHVsZS5leHBvcnRzPXtcIkFhY3V0ZVwiOlwiXFx1MDBDMVwiLFwiYWFjdXRlXCI6XCJcXHUwMEUxXCIsXCJBY2lyY1wiOlwiXFx1MDBDMlwiLFwiYWNpcmNcIjpcIlxcdTAwRTJcIixcImFjdXRlXCI6XCJcXHUwMEI0XCIsXCJBRWxpZ1wiOlwiXFx1MDBDNlwiLFwiYWVsaWdcIjpcIlxcdTAwRTZcIixcIkFncmF2ZVwiOlwiXFx1MDBDMFwiLFwiYWdyYXZlXCI6XCJcXHUwMEUwXCIsXCJhbXBcIjpcIiZcIixcIkFNUFwiOlwiJlwiLFwiQXJpbmdcIjpcIlxcdTAwQzVcIixcImFyaW5nXCI6XCJcXHUwMEU1XCIsXCJBdGlsZGVcIjpcIlxcdTAwQzNcIixcImF0aWxkZVwiOlwiXFx1MDBFM1wiLFwiQXVtbFwiOlwiXFx1MDBDNFwiLFwiYXVtbFwiOlwiXFx1MDBFNFwiLFwiYnJ2YmFyXCI6XCJcXHUwMEE2XCIsXCJDY2VkaWxcIjpcIlxcdTAwQzdcIixcImNjZWRpbFwiOlwiXFx1MDBFN1wiLFwiY2VkaWxcIjpcIlxcdTAwQjhcIixcImNlbnRcIjpcIlxcdTAwQTJcIixcImNvcHlcIjpcIlxcdTAwQTlcIixcIkNPUFlcIjpcIlxcdTAwQTlcIixcImN1cnJlblwiOlwiXFx1MDBBNFwiLFwiZGVnXCI6XCJcXHUwMEIwXCIsXCJkaXZpZGVcIjpcIlxcdTAwRjdcIixcIkVhY3V0ZVwiOlwiXFx1MDBDOVwiLFwiZWFjdXRlXCI6XCJcXHUwMEU5XCIsXCJFY2lyY1wiOlwiXFx1MDBDQVwiLFwiZWNpcmNcIjpcIlxcdTAwRUFcIixcIkVncmF2ZVwiOlwiXFx1MDBDOFwiLFwiZWdyYXZlXCI6XCJcXHUwMEU4XCIsXCJFVEhcIjpcIlxcdTAwRDBcIixcImV0aFwiOlwiXFx1MDBGMFwiLFwiRXVtbFwiOlwiXFx1MDBDQlwiLFwiZXVtbFwiOlwiXFx1MDBFQlwiLFwiZnJhYzEyXCI6XCJcXHUwMEJEXCIsXCJmcmFjMTRcIjpcIlxcdTAwQkNcIixcImZyYWMzNFwiOlwiXFx1MDBCRVwiLFwiZ3RcIjpcIj5cIixcIkdUXCI6XCI+XCIsXCJJYWN1dGVcIjpcIlxcdTAwQ0RcIixcImlhY3V0ZVwiOlwiXFx1MDBFRFwiLFwiSWNpcmNcIjpcIlxcdTAwQ0VcIixcImljaXJjXCI6XCJcXHUwMEVFXCIsXCJpZXhjbFwiOlwiXFx1MDBBMVwiLFwiSWdyYXZlXCI6XCJcXHUwMENDXCIsXCJpZ3JhdmVcIjpcIlxcdTAwRUNcIixcImlxdWVzdFwiOlwiXFx1MDBCRlwiLFwiSXVtbFwiOlwiXFx1MDBDRlwiLFwiaXVtbFwiOlwiXFx1MDBFRlwiLFwibGFxdW9cIjpcIlxcdTAwQUJcIixcImx0XCI6XCI8XCIsXCJMVFwiOlwiPFwiLFwibWFjclwiOlwiXFx1MDBBRlwiLFwibWljcm9cIjpcIlxcdTAwQjVcIixcIm1pZGRvdFwiOlwiXFx1MDBCN1wiLFwibmJzcFwiOlwiXFx1MDBBMFwiLFwibm90XCI6XCJcXHUwMEFDXCIsXCJOdGlsZGVcIjpcIlxcdTAwRDFcIixcIm50aWxkZVwiOlwiXFx1MDBGMVwiLFwiT2FjdXRlXCI6XCJcXHUwMEQzXCIsXCJvYWN1dGVcIjpcIlxcdTAwRjNcIixcIk9jaXJjXCI6XCJcXHUwMEQ0XCIsXCJvY2lyY1wiOlwiXFx1MDBGNFwiLFwiT2dyYXZlXCI6XCJcXHUwMEQyXCIsXCJvZ3JhdmVcIjpcIlxcdTAwRjJcIixcIm9yZGZcIjpcIlxcdTAwQUFcIixcIm9yZG1cIjpcIlxcdTAwQkFcIixcIk9zbGFzaFwiOlwiXFx1MDBEOFwiLFwib3NsYXNoXCI6XCJcXHUwMEY4XCIsXCJPdGlsZGVcIjpcIlxcdTAwRDVcIixcIm90aWxkZVwiOlwiXFx1MDBGNVwiLFwiT3VtbFwiOlwiXFx1MDBENlwiLFwib3VtbFwiOlwiXFx1MDBGNlwiLFwicGFyYVwiOlwiXFx1MDBCNlwiLFwicGx1c21uXCI6XCJcXHUwMEIxXCIsXCJwb3VuZFwiOlwiXFx1MDBBM1wiLFwicXVvdFwiOlwiXFxcIlwiLFwiUVVPVFwiOlwiXFxcIlwiLFwicmFxdW9cIjpcIlxcdTAwQkJcIixcInJlZ1wiOlwiXFx1MDBBRVwiLFwiUkVHXCI6XCJcXHUwMEFFXCIsXCJzZWN0XCI6XCJcXHUwMEE3XCIsXCJzaHlcIjpcIlxcdTAwQURcIixcInN1cDFcIjpcIlxcdTAwQjlcIixcInN1cDJcIjpcIlxcdTAwQjJcIixcInN1cDNcIjpcIlxcdTAwQjNcIixcInN6bGlnXCI6XCJcXHUwMERGXCIsXCJUSE9STlwiOlwiXFx1MDBERVwiLFwidGhvcm5cIjpcIlxcdTAwRkVcIixcInRpbWVzXCI6XCJcXHUwMEQ3XCIsXCJVYWN1dGVcIjpcIlxcdTAwREFcIixcInVhY3V0ZVwiOlwiXFx1MDBGQVwiLFwiVWNpcmNcIjpcIlxcdTAwREJcIixcInVjaXJjXCI6XCJcXHUwMEZCXCIsXCJVZ3JhdmVcIjpcIlxcdTAwRDlcIixcInVncmF2ZVwiOlwiXFx1MDBGOVwiLFwidW1sXCI6XCJcXHUwMEE4XCIsXCJVdW1sXCI6XCJcXHUwMERDXCIsXCJ1dW1sXCI6XCJcXHUwMEZDXCIsXCJZYWN1dGVcIjpcIlxcdTAwRERcIixcInlhY3V0ZVwiOlwiXFx1MDBGRFwiLFwieWVuXCI6XCJcXHUwMEE1XCIsXCJ5dW1sXCI6XCJcXHUwMEZGXCJ9IiwibW9kdWxlLmV4cG9ydHM9e1wiYW1wXCI6XCImXCIsXCJhcG9zXCI6XCInXCIsXCJndFwiOlwiPlwiLFwibHRcIjpcIjxcIixcInF1b3RcIjpcIlxcXCJcIn1cbiIsIi8vVHlwZXMgb2YgZWxlbWVudHMgZm91bmQgaW4gdGhlIERPTVxubW9kdWxlLmV4cG9ydHMgPSB7XG5cdFRleHQ6IFwidGV4dFwiLCAvL1RleHRcblx0RGlyZWN0aXZlOiBcImRpcmVjdGl2ZVwiLCAvLzw/IC4uLiA/PlxuXHRDb21tZW50OiBcImNvbW1lbnRcIiwgLy88IS0tIC4uLiAtLT5cblx0U2NyaXB0OiBcInNjcmlwdFwiLCAvLzxzY3JpcHQ+IHRhZ3Ncblx0U3R5bGU6IFwic3R5bGVcIiwgLy88c3R5bGU+IHRhZ3Ncblx0VGFnOiBcInRhZ1wiLCAvL0FueSB0YWdcblx0Q0RBVEE6IFwiY2RhdGFcIiwgLy88IVtDREFUQVsgLi4uIF1dPlxuXHREb2N0eXBlOiBcImRvY3R5cGVcIixcblxuXHRpc1RhZzogZnVuY3Rpb24oZWxlbSl7XG5cdFx0cmV0dXJuIGVsZW0udHlwZSA9PT0gXCJ0YWdcIiB8fCBlbGVtLnR5cGUgPT09IFwic2NyaXB0XCIgfHwgZWxlbS50eXBlID09PSBcInN0eWxlXCI7XG5cdH1cbn07XG4iLCJ2YXIgRWxlbWVudFR5cGUgPSByZXF1aXJlKFwiZG9tZWxlbWVudHR5cGVcIik7XG5cbnZhciByZV93aGl0ZXNwYWNlID0gL1xccysvZztcbnZhciBOb2RlUHJvdG90eXBlID0gcmVxdWlyZShcIi4vbGliL25vZGVcIik7XG52YXIgRWxlbWVudFByb3RvdHlwZSA9IHJlcXVpcmUoXCIuL2xpYi9lbGVtZW50XCIpO1xuXG5mdW5jdGlvbiBEb21IYW5kbGVyKGNhbGxiYWNrLCBvcHRpb25zLCBlbGVtZW50Q0Ipe1xuXHRpZih0eXBlb2YgY2FsbGJhY2sgPT09IFwib2JqZWN0XCIpe1xuXHRcdGVsZW1lbnRDQiA9IG9wdGlvbnM7XG5cdFx0b3B0aW9ucyA9IGNhbGxiYWNrO1xuXHRcdGNhbGxiYWNrID0gbnVsbDtcblx0fSBlbHNlIGlmKHR5cGVvZiBvcHRpb25zID09PSBcImZ1bmN0aW9uXCIpe1xuXHRcdGVsZW1lbnRDQiA9IG9wdGlvbnM7XG5cdFx0b3B0aW9ucyA9IGRlZmF1bHRPcHRzO1xuXHR9XG5cdHRoaXMuX2NhbGxiYWNrID0gY2FsbGJhY2s7XG5cdHRoaXMuX29wdGlvbnMgPSBvcHRpb25zIHx8IGRlZmF1bHRPcHRzO1xuXHR0aGlzLl9lbGVtZW50Q0IgPSBlbGVtZW50Q0I7XG5cdHRoaXMuZG9tID0gW107XG5cdHRoaXMuX2RvbmUgPSBmYWxzZTtcblx0dGhpcy5fdGFnU3RhY2sgPSBbXTtcblx0dGhpcy5fcGFyc2VyID0gdGhpcy5fcGFyc2VyIHx8IG51bGw7XG59XG5cbi8vZGVmYXVsdCBvcHRpb25zXG52YXIgZGVmYXVsdE9wdHMgPSB7XG5cdG5vcm1hbGl6ZVdoaXRlc3BhY2U6IGZhbHNlLCAvL1JlcGxhY2UgYWxsIHdoaXRlc3BhY2Ugd2l0aCBzaW5nbGUgc3BhY2VzXG5cdHdpdGhTdGFydEluZGljZXM6IGZhbHNlLCAvL0FkZCBzdGFydEluZGV4IHByb3BlcnRpZXMgdG8gbm9kZXNcbn07XG5cbkRvbUhhbmRsZXIucHJvdG90eXBlLm9ucGFyc2VyaW5pdCA9IGZ1bmN0aW9uKHBhcnNlcil7XG5cdHRoaXMuX3BhcnNlciA9IHBhcnNlcjtcbn07XG5cbi8vUmVzZXRzIHRoZSBoYW5kbGVyIGJhY2sgdG8gc3RhcnRpbmcgc3RhdGVcbkRvbUhhbmRsZXIucHJvdG90eXBlLm9ucmVzZXQgPSBmdW5jdGlvbigpe1xuXHREb21IYW5kbGVyLmNhbGwodGhpcywgdGhpcy5fY2FsbGJhY2ssIHRoaXMuX29wdGlvbnMsIHRoaXMuX2VsZW1lbnRDQik7XG59O1xuXG4vL1NpZ25hbHMgdGhlIGhhbmRsZXIgdGhhdCBwYXJzaW5nIGlzIGRvbmVcbkRvbUhhbmRsZXIucHJvdG90eXBlLm9uZW5kID0gZnVuY3Rpb24oKXtcblx0aWYodGhpcy5fZG9uZSkgcmV0dXJuO1xuXHR0aGlzLl9kb25lID0gdHJ1ZTtcblx0dGhpcy5fcGFyc2VyID0gbnVsbDtcblx0dGhpcy5faGFuZGxlQ2FsbGJhY2sobnVsbCk7XG59O1xuXG5Eb21IYW5kbGVyLnByb3RvdHlwZS5faGFuZGxlQ2FsbGJhY2sgPVxuRG9tSGFuZGxlci5wcm90b3R5cGUub25lcnJvciA9IGZ1bmN0aW9uKGVycm9yKXtcblx0aWYodHlwZW9mIHRoaXMuX2NhbGxiYWNrID09PSBcImZ1bmN0aW9uXCIpe1xuXHRcdHRoaXMuX2NhbGxiYWNrKGVycm9yLCB0aGlzLmRvbSk7XG5cdH0gZWxzZSB7XG5cdFx0aWYoZXJyb3IpIHRocm93IGVycm9yO1xuXHR9XG59O1xuXG5Eb21IYW5kbGVyLnByb3RvdHlwZS5vbmNsb3NldGFnID0gZnVuY3Rpb24oKXtcblx0Ly9pZih0aGlzLl90YWdTdGFjay5wb3AoKS5uYW1lICE9PSBuYW1lKSB0aGlzLl9oYW5kbGVDYWxsYmFjayhFcnJvcihcIlRhZ25hbWUgZGlkbid0IG1hdGNoIVwiKSk7XG5cdHZhciBlbGVtID0gdGhpcy5fdGFnU3RhY2sucG9wKCk7XG5cdGlmKHRoaXMuX2VsZW1lbnRDQikgdGhpcy5fZWxlbWVudENCKGVsZW0pO1xufTtcblxuRG9tSGFuZGxlci5wcm90b3R5cGUuX2FkZERvbUVsZW1lbnQgPSBmdW5jdGlvbihlbGVtZW50KXtcblx0dmFyIHBhcmVudCA9IHRoaXMuX3RhZ1N0YWNrW3RoaXMuX3RhZ1N0YWNrLmxlbmd0aCAtIDFdO1xuXHR2YXIgc2libGluZ3MgPSBwYXJlbnQgPyBwYXJlbnQuY2hpbGRyZW4gOiB0aGlzLmRvbTtcblx0dmFyIHByZXZpb3VzU2libGluZyA9IHNpYmxpbmdzW3NpYmxpbmdzLmxlbmd0aCAtIDFdO1xuXG5cdGVsZW1lbnQubmV4dCA9IG51bGw7XG5cblx0aWYodGhpcy5fb3B0aW9ucy53aXRoU3RhcnRJbmRpY2VzKXtcblx0XHRlbGVtZW50LnN0YXJ0SW5kZXggPSB0aGlzLl9wYXJzZXIuc3RhcnRJbmRleDtcblx0fVxuXG5cdGlmICh0aGlzLl9vcHRpb25zLndpdGhEb21MdmwxKSB7XG5cdFx0ZWxlbWVudC5fX3Byb3RvX18gPSBlbGVtZW50LnR5cGUgPT09IFwidGFnXCIgPyBFbGVtZW50UHJvdG90eXBlIDogTm9kZVByb3RvdHlwZTtcblx0fVxuXG5cdGlmKHByZXZpb3VzU2libGluZyl7XG5cdFx0ZWxlbWVudC5wcmV2ID0gcHJldmlvdXNTaWJsaW5nO1xuXHRcdHByZXZpb3VzU2libGluZy5uZXh0ID0gZWxlbWVudDtcblx0fSBlbHNlIHtcblx0XHRlbGVtZW50LnByZXYgPSBudWxsO1xuXHR9XG5cblx0c2libGluZ3MucHVzaChlbGVtZW50KTtcblx0ZWxlbWVudC5wYXJlbnQgPSBwYXJlbnQgfHwgbnVsbDtcbn07XG5cbkRvbUhhbmRsZXIucHJvdG90eXBlLm9ub3BlbnRhZyA9IGZ1bmN0aW9uKG5hbWUsIGF0dHJpYnMpe1xuXHR2YXIgZWxlbWVudCA9IHtcblx0XHR0eXBlOiBuYW1lID09PSBcInNjcmlwdFwiID8gRWxlbWVudFR5cGUuU2NyaXB0IDogbmFtZSA9PT0gXCJzdHlsZVwiID8gRWxlbWVudFR5cGUuU3R5bGUgOiBFbGVtZW50VHlwZS5UYWcsXG5cdFx0bmFtZTogbmFtZSxcblx0XHRhdHRyaWJzOiBhdHRyaWJzLFxuXHRcdGNoaWxkcmVuOiBbXVxuXHR9O1xuXG5cdHRoaXMuX2FkZERvbUVsZW1lbnQoZWxlbWVudCk7XG5cblx0dGhpcy5fdGFnU3RhY2sucHVzaChlbGVtZW50KTtcbn07XG5cbkRvbUhhbmRsZXIucHJvdG90eXBlLm9udGV4dCA9IGZ1bmN0aW9uKGRhdGEpe1xuXHQvL3RoZSBpZ25vcmVXaGl0ZXNwYWNlIGlzIG9mZmljaWFsbHkgZHJvcHBlZCwgYnV0IGZvciBub3csXG5cdC8vaXQncyBhbiBhbGlhcyBmb3Igbm9ybWFsaXplV2hpdGVzcGFjZVxuXHR2YXIgbm9ybWFsaXplID0gdGhpcy5fb3B0aW9ucy5ub3JtYWxpemVXaGl0ZXNwYWNlIHx8IHRoaXMuX29wdGlvbnMuaWdub3JlV2hpdGVzcGFjZTtcblxuXHR2YXIgbGFzdFRhZztcblxuXHRpZighdGhpcy5fdGFnU3RhY2subGVuZ3RoICYmIHRoaXMuZG9tLmxlbmd0aCAmJiAobGFzdFRhZyA9IHRoaXMuZG9tW3RoaXMuZG9tLmxlbmd0aC0xXSkudHlwZSA9PT0gRWxlbWVudFR5cGUuVGV4dCl7XG5cdFx0aWYobm9ybWFsaXplKXtcblx0XHRcdGxhc3RUYWcuZGF0YSA9IChsYXN0VGFnLmRhdGEgKyBkYXRhKS5yZXBsYWNlKHJlX3doaXRlc3BhY2UsIFwiIFwiKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0bGFzdFRhZy5kYXRhICs9IGRhdGE7XG5cdFx0fVxuXHR9IGVsc2Uge1xuXHRcdGlmKFxuXHRcdFx0dGhpcy5fdGFnU3RhY2subGVuZ3RoICYmXG5cdFx0XHQobGFzdFRhZyA9IHRoaXMuX3RhZ1N0YWNrW3RoaXMuX3RhZ1N0YWNrLmxlbmd0aCAtIDFdKSAmJlxuXHRcdFx0KGxhc3RUYWcgPSBsYXN0VGFnLmNoaWxkcmVuW2xhc3RUYWcuY2hpbGRyZW4ubGVuZ3RoIC0gMV0pICYmXG5cdFx0XHRsYXN0VGFnLnR5cGUgPT09IEVsZW1lbnRUeXBlLlRleHRcblx0XHQpe1xuXHRcdFx0aWYobm9ybWFsaXplKXtcblx0XHRcdFx0bGFzdFRhZy5kYXRhID0gKGxhc3RUYWcuZGF0YSArIGRhdGEpLnJlcGxhY2UocmVfd2hpdGVzcGFjZSwgXCIgXCIpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0bGFzdFRhZy5kYXRhICs9IGRhdGE7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdGlmKG5vcm1hbGl6ZSl7XG5cdFx0XHRcdGRhdGEgPSBkYXRhLnJlcGxhY2UocmVfd2hpdGVzcGFjZSwgXCIgXCIpO1xuXHRcdFx0fVxuXG5cdFx0XHR0aGlzLl9hZGREb21FbGVtZW50KHtcblx0XHRcdFx0ZGF0YTogZGF0YSxcblx0XHRcdFx0dHlwZTogRWxlbWVudFR5cGUuVGV4dFxuXHRcdFx0fSk7XG5cdFx0fVxuXHR9XG59O1xuXG5Eb21IYW5kbGVyLnByb3RvdHlwZS5vbmNvbW1lbnQgPSBmdW5jdGlvbihkYXRhKXtcblx0dmFyIGxhc3RUYWcgPSB0aGlzLl90YWdTdGFja1t0aGlzLl90YWdTdGFjay5sZW5ndGggLSAxXTtcblxuXHRpZihsYXN0VGFnICYmIGxhc3RUYWcudHlwZSA9PT0gRWxlbWVudFR5cGUuQ29tbWVudCl7XG5cdFx0bGFzdFRhZy5kYXRhICs9IGRhdGE7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0dmFyIGVsZW1lbnQgPSB7XG5cdFx0ZGF0YTogZGF0YSxcblx0XHR0eXBlOiBFbGVtZW50VHlwZS5Db21tZW50XG5cdH07XG5cblx0dGhpcy5fYWRkRG9tRWxlbWVudChlbGVtZW50KTtcblx0dGhpcy5fdGFnU3RhY2sucHVzaChlbGVtZW50KTtcbn07XG5cbkRvbUhhbmRsZXIucHJvdG90eXBlLm9uY2RhdGFzdGFydCA9IGZ1bmN0aW9uKCl7XG5cdHZhciBlbGVtZW50ID0ge1xuXHRcdGNoaWxkcmVuOiBbe1xuXHRcdFx0ZGF0YTogXCJcIixcblx0XHRcdHR5cGU6IEVsZW1lbnRUeXBlLlRleHRcblx0XHR9XSxcblx0XHR0eXBlOiBFbGVtZW50VHlwZS5DREFUQVxuXHR9O1xuXG5cdHRoaXMuX2FkZERvbUVsZW1lbnQoZWxlbWVudCk7XG5cdHRoaXMuX3RhZ1N0YWNrLnB1c2goZWxlbWVudCk7XG59O1xuXG5Eb21IYW5kbGVyLnByb3RvdHlwZS5vbmNvbW1lbnRlbmQgPSBEb21IYW5kbGVyLnByb3RvdHlwZS5vbmNkYXRhZW5kID0gZnVuY3Rpb24oKXtcblx0dGhpcy5fdGFnU3RhY2sucG9wKCk7XG59O1xuXG5Eb21IYW5kbGVyLnByb3RvdHlwZS5vbnByb2Nlc3NpbmdpbnN0cnVjdGlvbiA9IGZ1bmN0aW9uKG5hbWUsIGRhdGEpe1xuXHR0aGlzLl9hZGREb21FbGVtZW50KHtcblx0XHRuYW1lOiBuYW1lLFxuXHRcdGRhdGE6IGRhdGEsXG5cdFx0dHlwZTogRWxlbWVudFR5cGUuRGlyZWN0aXZlXG5cdH0pO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBEb21IYW5kbGVyO1xuIiwiLy8gRE9NLUxldmVsLTEtY29tcGxpYW50IHN0cnVjdHVyZVxudmFyIE5vZGVQcm90b3R5cGUgPSByZXF1aXJlKCcuL25vZGUnKTtcbnZhciBFbGVtZW50UHJvdG90eXBlID0gbW9kdWxlLmV4cG9ydHMgPSBPYmplY3QuY3JlYXRlKE5vZGVQcm90b3R5cGUpO1xuXG52YXIgZG9tTHZsMSA9IHtcblx0dGFnTmFtZTogXCJuYW1lXCJcbn07XG5cbk9iamVjdC5rZXlzKGRvbUx2bDEpLmZvckVhY2goZnVuY3Rpb24oa2V5KSB7XG5cdHZhciBzaG9ydGhhbmQgPSBkb21MdmwxW2tleV07XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShFbGVtZW50UHJvdG90eXBlLCBrZXksIHtcblx0XHRnZXQ6IGZ1bmN0aW9uKCkge1xuXHRcdFx0cmV0dXJuIHRoaXNbc2hvcnRoYW5kXSB8fCBudWxsO1xuXHRcdH0sXG5cdFx0c2V0OiBmdW5jdGlvbih2YWwpIHtcblx0XHRcdHRoaXNbc2hvcnRoYW5kXSA9IHZhbDtcblx0XHRcdHJldHVybiB2YWw7XG5cdFx0fVxuXHR9KTtcbn0pO1xuIiwiLy8gVGhpcyBvYmplY3Qgd2lsbCBiZSB1c2VkIGFzIHRoZSBwcm90b3R5cGUgZm9yIE5vZGVzIHdoZW4gY3JlYXRpbmcgYVxuLy8gRE9NLUxldmVsLTEtY29tcGxpYW50IHN0cnVjdHVyZS5cbnZhciBOb2RlUHJvdG90eXBlID0gbW9kdWxlLmV4cG9ydHMgPSB7XG5cdGdldCBmaXJzdENoaWxkKCkge1xuXHRcdHZhciBjaGlsZHJlbiA9IHRoaXMuY2hpbGRyZW47XG5cdFx0cmV0dXJuIGNoaWxkcmVuICYmIGNoaWxkcmVuWzBdIHx8IG51bGw7XG5cdH0sXG5cdGdldCBsYXN0Q2hpbGQoKSB7XG5cdFx0dmFyIGNoaWxkcmVuID0gdGhpcy5jaGlsZHJlbjtcblx0XHRyZXR1cm4gY2hpbGRyZW4gJiYgY2hpbGRyZW5bY2hpbGRyZW4ubGVuZ3RoIC0gMV0gfHwgbnVsbDtcblx0fSxcblx0Z2V0IG5vZGVUeXBlKCkge1xuXHRcdHJldHVybiBub2RlVHlwZXNbdGhpcy50eXBlXSB8fCBub2RlVHlwZXMuZWxlbWVudDtcblx0fVxufTtcblxudmFyIGRvbUx2bDEgPSB7XG5cdHRhZ05hbWU6IFwibmFtZVwiLFxuXHRjaGlsZE5vZGVzOiBcImNoaWxkcmVuXCIsXG5cdHBhcmVudE5vZGU6IFwicGFyZW50XCIsXG5cdHByZXZpb3VzU2libGluZzogXCJwcmV2XCIsXG5cdG5leHRTaWJsaW5nOiBcIm5leHRcIixcblx0bm9kZVZhbHVlOiBcImRhdGFcIlxufTtcblxudmFyIG5vZGVUeXBlcyA9IHtcblx0ZWxlbWVudDogMSxcblx0dGV4dDogMyxcblx0Y2RhdGE6IDQsXG5cdGNvbW1lbnQ6IDhcbn07XG5cbk9iamVjdC5rZXlzKGRvbUx2bDEpLmZvckVhY2goZnVuY3Rpb24oa2V5KSB7XG5cdHZhciBzaG9ydGhhbmQgPSBkb21MdmwxW2tleV07XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShOb2RlUHJvdG90eXBlLCBrZXksIHtcblx0XHRnZXQ6IGZ1bmN0aW9uKCkge1xuXHRcdFx0cmV0dXJuIHRoaXNbc2hvcnRoYW5kXSB8fCBudWxsO1xuXHRcdH0sXG5cdFx0c2V0OiBmdW5jdGlvbih2YWwpIHtcblx0XHRcdHRoaXNbc2hvcnRoYW5kXSA9IHZhbDtcblx0XHRcdHJldHVybiB2YWw7XG5cdFx0fVxuXHR9KTtcbn0pO1xuIiwidmFyIERvbVV0aWxzID0gbW9kdWxlLmV4cG9ydHM7XG5cbltcblx0cmVxdWlyZShcIi4vbGliL3N0cmluZ2lmeVwiKSxcblx0cmVxdWlyZShcIi4vbGliL3RyYXZlcnNhbFwiKSxcblx0cmVxdWlyZShcIi4vbGliL21hbmlwdWxhdGlvblwiKSxcblx0cmVxdWlyZShcIi4vbGliL3F1ZXJ5aW5nXCIpLFxuXHRyZXF1aXJlKFwiLi9saWIvbGVnYWN5XCIpLFxuXHRyZXF1aXJlKFwiLi9saWIvaGVscGVyc1wiKVxuXS5mb3JFYWNoKGZ1bmN0aW9uKGV4dCl7XG5cdE9iamVjdC5rZXlzKGV4dCkuZm9yRWFjaChmdW5jdGlvbihrZXkpe1xuXHRcdERvbVV0aWxzW2tleV0gPSBleHRba2V5XS5iaW5kKERvbVV0aWxzKTtcblx0fSk7XG59KTtcbiIsIi8vIHJlbW92ZVN1YnNldHNcbi8vIEdpdmVuIGFuIGFycmF5IG9mIG5vZGVzLCByZW1vdmUgYW55IG1lbWJlciB0aGF0IGlzIGNvbnRhaW5lZCBieSBhbm90aGVyLlxuZXhwb3J0cy5yZW1vdmVTdWJzZXRzID0gZnVuY3Rpb24obm9kZXMpIHtcblx0dmFyIGlkeCA9IG5vZGVzLmxlbmd0aCwgbm9kZSwgYW5jZXN0b3IsIHJlcGxhY2U7XG5cblx0Ly8gQ2hlY2sgaWYgZWFjaCBub2RlIChvciBvbmUgb2YgaXRzIGFuY2VzdG9ycykgaXMgYWxyZWFkeSBjb250YWluZWQgaW4gdGhlXG5cdC8vIGFycmF5LlxuXHR3aGlsZSAoLS1pZHggPiAtMSkge1xuXHRcdG5vZGUgPSBhbmNlc3RvciA9IG5vZGVzW2lkeF07XG5cblx0XHQvLyBUZW1wb3JhcmlseSByZW1vdmUgdGhlIG5vZGUgdW5kZXIgY29uc2lkZXJhdGlvblxuXHRcdG5vZGVzW2lkeF0gPSBudWxsO1xuXHRcdHJlcGxhY2UgPSB0cnVlO1xuXG5cdFx0d2hpbGUgKGFuY2VzdG9yKSB7XG5cdFx0XHRpZiAobm9kZXMuaW5kZXhPZihhbmNlc3RvcikgPiAtMSkge1xuXHRcdFx0XHRyZXBsYWNlID0gZmFsc2U7XG5cdFx0XHRcdG5vZGVzLnNwbGljZShpZHgsIDEpO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHRcdGFuY2VzdG9yID0gYW5jZXN0b3IucGFyZW50O1xuXHRcdH1cblxuXHRcdC8vIElmIHRoZSBub2RlIGhhcyBiZWVuIGZvdW5kIHRvIGJlIHVuaXF1ZSwgcmUtaW5zZXJ0IGl0LlxuXHRcdGlmIChyZXBsYWNlKSB7XG5cdFx0XHRub2Rlc1tpZHhdID0gbm9kZTtcblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gbm9kZXM7XG59O1xuXG4vLyBTb3VyY2U6IGh0dHA6Ly9kb20uc3BlYy53aGF0d2cub3JnLyNkb20tbm9kZS1jb21wYXJlZG9jdW1lbnRwb3NpdGlvblxudmFyIFBPU0lUSU9OID0ge1xuXHRESVNDT05ORUNURUQ6IDEsXG5cdFBSRUNFRElORzogMixcblx0Rk9MTE9XSU5HOiA0LFxuXHRDT05UQUlOUzogOCxcblx0Q09OVEFJTkVEX0JZOiAxNlxufTtcblxuLy8gQ29tcGFyZSB0aGUgcG9zaXRpb24gb2Ygb25lIG5vZGUgYWdhaW5zdCBhbm90aGVyIG5vZGUgaW4gYW55IG90aGVyIGRvY3VtZW50LlxuLy8gVGhlIHJldHVybiB2YWx1ZSBpcyBhIGJpdG1hc2sgd2l0aCB0aGUgZm9sbG93aW5nIHZhbHVlczpcbi8vXG4vLyBkb2N1bWVudCBvcmRlcjpcbi8vID4gVGhlcmUgaXMgYW4gb3JkZXJpbmcsIGRvY3VtZW50IG9yZGVyLCBkZWZpbmVkIG9uIGFsbCB0aGUgbm9kZXMgaW4gdGhlXG4vLyA+IGRvY3VtZW50IGNvcnJlc3BvbmRpbmcgdG8gdGhlIG9yZGVyIGluIHdoaWNoIHRoZSBmaXJzdCBjaGFyYWN0ZXIgb2YgdGhlXG4vLyA+IFhNTCByZXByZXNlbnRhdGlvbiBvZiBlYWNoIG5vZGUgb2NjdXJzIGluIHRoZSBYTUwgcmVwcmVzZW50YXRpb24gb2YgdGhlXG4vLyA+IGRvY3VtZW50IGFmdGVyIGV4cGFuc2lvbiBvZiBnZW5lcmFsIGVudGl0aWVzLiBUaHVzLCB0aGUgZG9jdW1lbnQgZWxlbWVudFxuLy8gPiBub2RlIHdpbGwgYmUgdGhlIGZpcnN0IG5vZGUuIEVsZW1lbnQgbm9kZXMgb2NjdXIgYmVmb3JlIHRoZWlyIGNoaWxkcmVuLlxuLy8gPiBUaHVzLCBkb2N1bWVudCBvcmRlciBvcmRlcnMgZWxlbWVudCBub2RlcyBpbiBvcmRlciBvZiB0aGUgb2NjdXJyZW5jZSBvZlxuLy8gPiB0aGVpciBzdGFydC10YWcgaW4gdGhlIFhNTCAoYWZ0ZXIgZXhwYW5zaW9uIG9mIGVudGl0aWVzKS4gVGhlIGF0dHJpYnV0ZVxuLy8gPiBub2RlcyBvZiBhbiBlbGVtZW50IG9jY3VyIGFmdGVyIHRoZSBlbGVtZW50IGFuZCBiZWZvcmUgaXRzIGNoaWxkcmVuLiBUaGVcbi8vID4gcmVsYXRpdmUgb3JkZXIgb2YgYXR0cmlidXRlIG5vZGVzIGlzIGltcGxlbWVudGF0aW9uLWRlcGVuZGVudC4vXG4vLyBTb3VyY2U6XG4vLyBodHRwOi8vd3d3LnczLm9yZy9UUi9ET00tTGV2ZWwtMy1Db3JlL2dsb3NzYXJ5Lmh0bWwjZHQtZG9jdW1lbnQtb3JkZXJcbi8vXG4vLyBAYXJndW1lbnQge05vZGV9IG5vZGFBIFRoZSBmaXJzdCBub2RlIHRvIHVzZSBpbiB0aGUgY29tcGFyaXNvblxuLy8gQGFyZ3VtZW50IHtOb2RlfSBub2RlQiBUaGUgc2Vjb25kIG5vZGUgdG8gdXNlIGluIHRoZSBjb21wYXJpc29uXG4vL1xuLy8gQHJldHVybiB7TnVtYmVyfSBBIGJpdG1hc2sgZGVzY3JpYmluZyB0aGUgaW5wdXQgbm9kZXMnIHJlbGF0aXZlIHBvc2l0aW9uLlxuLy8gICAgICAgICBTZWUgaHR0cDovL2RvbS5zcGVjLndoYXR3Zy5vcmcvI2RvbS1ub2RlLWNvbXBhcmVkb2N1bWVudHBvc2l0aW9uIGZvclxuLy8gICAgICAgICBhIGRlc2NyaXB0aW9uIG9mIHRoZXNlIHZhbHVlcy5cbnZhciBjb21wYXJlUG9zID0gZXhwb3J0cy5jb21wYXJlRG9jdW1lbnRQb3NpdGlvbiA9IGZ1bmN0aW9uKG5vZGVBLCBub2RlQikge1xuXHR2YXIgYVBhcmVudHMgPSBbXTtcblx0dmFyIGJQYXJlbnRzID0gW107XG5cdHZhciBjdXJyZW50LCBzaGFyZWRQYXJlbnQsIHNpYmxpbmdzLCBhU2libGluZywgYlNpYmxpbmcsIGlkeDtcblxuXHRpZiAobm9kZUEgPT09IG5vZGVCKSB7XG5cdFx0cmV0dXJuIDA7XG5cdH1cblxuXHRjdXJyZW50ID0gbm9kZUE7XG5cdHdoaWxlIChjdXJyZW50KSB7XG5cdFx0YVBhcmVudHMudW5zaGlmdChjdXJyZW50KTtcblx0XHRjdXJyZW50ID0gY3VycmVudC5wYXJlbnQ7XG5cdH1cblx0Y3VycmVudCA9IG5vZGVCO1xuXHR3aGlsZSAoY3VycmVudCkge1xuXHRcdGJQYXJlbnRzLnVuc2hpZnQoY3VycmVudCk7XG5cdFx0Y3VycmVudCA9IGN1cnJlbnQucGFyZW50O1xuXHR9XG5cblx0aWR4ID0gMDtcblx0d2hpbGUgKGFQYXJlbnRzW2lkeF0gPT09IGJQYXJlbnRzW2lkeF0pIHtcblx0XHRpZHgrKztcblx0fVxuXG5cdGlmIChpZHggPT09IDApIHtcblx0XHRyZXR1cm4gUE9TSVRJT04uRElTQ09OTkVDVEVEO1xuXHR9XG5cblx0c2hhcmVkUGFyZW50ID0gYVBhcmVudHNbaWR4IC0gMV07XG5cdHNpYmxpbmdzID0gc2hhcmVkUGFyZW50LmNoaWxkcmVuO1xuXHRhU2libGluZyA9IGFQYXJlbnRzW2lkeF07XG5cdGJTaWJsaW5nID0gYlBhcmVudHNbaWR4XTtcblxuXHRpZiAoc2libGluZ3MuaW5kZXhPZihhU2libGluZykgPiBzaWJsaW5ncy5pbmRleE9mKGJTaWJsaW5nKSkge1xuXHRcdGlmIChzaGFyZWRQYXJlbnQgPT09IG5vZGVCKSB7XG5cdFx0XHRyZXR1cm4gUE9TSVRJT04uRk9MTE9XSU5HIHwgUE9TSVRJT04uQ09OVEFJTkVEX0JZO1xuXHRcdH1cblx0XHRyZXR1cm4gUE9TSVRJT04uRk9MTE9XSU5HO1xuXHR9IGVsc2Uge1xuXHRcdGlmIChzaGFyZWRQYXJlbnQgPT09IG5vZGVBKSB7XG5cdFx0XHRyZXR1cm4gUE9TSVRJT04uUFJFQ0VESU5HIHwgUE9TSVRJT04uQ09OVEFJTlM7XG5cdFx0fVxuXHRcdHJldHVybiBQT1NJVElPTi5QUkVDRURJTkc7XG5cdH1cbn07XG5cbi8vIFNvcnQgYW4gYXJyYXkgb2Ygbm9kZXMgYmFzZWQgb24gdGhlaXIgcmVsYXRpdmUgcG9zaXRpb24gaW4gdGhlIGRvY3VtZW50IGFuZFxuLy8gcmVtb3ZlIGFueSBkdXBsaWNhdGUgbm9kZXMuIElmIHRoZSBhcnJheSBjb250YWlucyBub2RlcyB0aGF0IGRvIG5vdCBiZWxvbmdcbi8vIHRvIHRoZSBzYW1lIGRvY3VtZW50LCBzb3J0IG9yZGVyIGlzIHVuc3BlY2lmaWVkLlxuLy9cbi8vIEBhcmd1bWVudCB7QXJyYXl9IG5vZGVzIEFycmF5IG9mIERPTSBub2Rlc1xuLy9cbi8vIEByZXR1cm5zIHtBcnJheX0gY29sbGVjdGlvbiBvZiB1bmlxdWUgbm9kZXMsIHNvcnRlZCBpbiBkb2N1bWVudCBvcmRlclxuZXhwb3J0cy51bmlxdWVTb3J0ID0gZnVuY3Rpb24obm9kZXMpIHtcblx0dmFyIGlkeCA9IG5vZGVzLmxlbmd0aCwgbm9kZSwgcG9zaXRpb247XG5cblx0bm9kZXMgPSBub2Rlcy5zbGljZSgpO1xuXG5cdHdoaWxlICgtLWlkeCA+IC0xKSB7XG5cdFx0bm9kZSA9IG5vZGVzW2lkeF07XG5cdFx0cG9zaXRpb24gPSBub2Rlcy5pbmRleE9mKG5vZGUpO1xuXHRcdGlmIChwb3NpdGlvbiA+IC0xICYmIHBvc2l0aW9uIDwgaWR4KSB7XG5cdFx0XHRub2Rlcy5zcGxpY2UoaWR4LCAxKTtcblx0XHR9XG5cdH1cblx0bm9kZXMuc29ydChmdW5jdGlvbihhLCBiKSB7XG5cdFx0dmFyIHJlbGF0aXZlID0gY29tcGFyZVBvcyhhLCBiKTtcblx0XHRpZiAocmVsYXRpdmUgJiBQT1NJVElPTi5QUkVDRURJTkcpIHtcblx0XHRcdHJldHVybiAtMTtcblx0XHR9IGVsc2UgaWYgKHJlbGF0aXZlICYgUE9TSVRJT04uRk9MTE9XSU5HKSB7XG5cdFx0XHRyZXR1cm4gMTtcblx0XHR9XG5cdFx0cmV0dXJuIDA7XG5cdH0pO1xuXG5cdHJldHVybiBub2Rlcztcbn07XG4iLCJ2YXIgRWxlbWVudFR5cGUgPSByZXF1aXJlKFwiZG9tZWxlbWVudHR5cGVcIik7XG52YXIgaXNUYWcgPSBleHBvcnRzLmlzVGFnID0gRWxlbWVudFR5cGUuaXNUYWc7XG5cbmV4cG9ydHMudGVzdEVsZW1lbnQgPSBmdW5jdGlvbihvcHRpb25zLCBlbGVtZW50KXtcblx0Zm9yKHZhciBrZXkgaW4gb3B0aW9ucyl7XG5cdFx0aWYoIW9wdGlvbnMuaGFzT3duUHJvcGVydHkoa2V5KSk7XG5cdFx0ZWxzZSBpZihrZXkgPT09IFwidGFnX25hbWVcIil7XG5cdFx0XHRpZighaXNUYWcoZWxlbWVudCkgfHwgIW9wdGlvbnMudGFnX25hbWUoZWxlbWVudC5uYW1lKSl7XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH1cblx0XHR9IGVsc2UgaWYoa2V5ID09PSBcInRhZ190eXBlXCIpe1xuXHRcdFx0aWYoIW9wdGlvbnMudGFnX3R5cGUoZWxlbWVudC50eXBlKSkgcmV0dXJuIGZhbHNlO1xuXHRcdH0gZWxzZSBpZihrZXkgPT09IFwidGFnX2NvbnRhaW5zXCIpe1xuXHRcdFx0aWYoaXNUYWcoZWxlbWVudCkgfHwgIW9wdGlvbnMudGFnX2NvbnRhaW5zKGVsZW1lbnQuZGF0YSkpe1xuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIGlmKCFlbGVtZW50LmF0dHJpYnMgfHwgIW9wdGlvbnNba2V5XShlbGVtZW50LmF0dHJpYnNba2V5XSkpe1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gdHJ1ZTtcbn07XG5cbnZhciBDaGVja3MgPSB7XG5cdHRhZ19uYW1lOiBmdW5jdGlvbihuYW1lKXtcblx0XHRpZih0eXBlb2YgbmFtZSA9PT0gXCJmdW5jdGlvblwiKXtcblx0XHRcdHJldHVybiBmdW5jdGlvbihlbGVtKXsgcmV0dXJuIGlzVGFnKGVsZW0pICYmIG5hbWUoZWxlbS5uYW1lKTsgfTtcblx0XHR9IGVsc2UgaWYobmFtZSA9PT0gXCIqXCIpe1xuXHRcdFx0cmV0dXJuIGlzVGFnO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24oZWxlbSl7IHJldHVybiBpc1RhZyhlbGVtKSAmJiBlbGVtLm5hbWUgPT09IG5hbWU7IH07XG5cdFx0fVxuXHR9LFxuXHR0YWdfdHlwZTogZnVuY3Rpb24odHlwZSl7XG5cdFx0aWYodHlwZW9mIHR5cGUgPT09IFwiZnVuY3Rpb25cIil7XG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24oZWxlbSl7IHJldHVybiB0eXBlKGVsZW0udHlwZSk7IH07XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJldHVybiBmdW5jdGlvbihlbGVtKXsgcmV0dXJuIGVsZW0udHlwZSA9PT0gdHlwZTsgfTtcblx0XHR9XG5cdH0sXG5cdHRhZ19jb250YWluczogZnVuY3Rpb24oZGF0YSl7XG5cdFx0aWYodHlwZW9mIGRhdGEgPT09IFwiZnVuY3Rpb25cIil7XG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24oZWxlbSl7IHJldHVybiAhaXNUYWcoZWxlbSkgJiYgZGF0YShlbGVtLmRhdGEpOyB9O1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24oZWxlbSl7IHJldHVybiAhaXNUYWcoZWxlbSkgJiYgZWxlbS5kYXRhID09PSBkYXRhOyB9O1xuXHRcdH1cblx0fVxufTtcblxuZnVuY3Rpb24gZ2V0QXR0cmliQ2hlY2soYXR0cmliLCB2YWx1ZSl7XG5cdGlmKHR5cGVvZiB2YWx1ZSA9PT0gXCJmdW5jdGlvblwiKXtcblx0XHRyZXR1cm4gZnVuY3Rpb24oZWxlbSl7IHJldHVybiBlbGVtLmF0dHJpYnMgJiYgdmFsdWUoZWxlbS5hdHRyaWJzW2F0dHJpYl0pOyB9O1xuXHR9IGVsc2Uge1xuXHRcdHJldHVybiBmdW5jdGlvbihlbGVtKXsgcmV0dXJuIGVsZW0uYXR0cmlicyAmJiBlbGVtLmF0dHJpYnNbYXR0cmliXSA9PT0gdmFsdWU7IH07XG5cdH1cbn1cblxuZnVuY3Rpb24gY29tYmluZUZ1bmNzKGEsIGIpe1xuXHRyZXR1cm4gZnVuY3Rpb24oZWxlbSl7XG5cdFx0cmV0dXJuIGEoZWxlbSkgfHwgYihlbGVtKTtcblx0fTtcbn1cblxuZXhwb3J0cy5nZXRFbGVtZW50cyA9IGZ1bmN0aW9uKG9wdGlvbnMsIGVsZW1lbnQsIHJlY3Vyc2UsIGxpbWl0KXtcblx0dmFyIGZ1bmNzID0gT2JqZWN0LmtleXMob3B0aW9ucykubWFwKGZ1bmN0aW9uKGtleSl7XG5cdFx0dmFyIHZhbHVlID0gb3B0aW9uc1trZXldO1xuXHRcdHJldHVybiBrZXkgaW4gQ2hlY2tzID8gQ2hlY2tzW2tleV0odmFsdWUpIDogZ2V0QXR0cmliQ2hlY2soa2V5LCB2YWx1ZSk7XG5cdH0pO1xuXG5cdHJldHVybiBmdW5jcy5sZW5ndGggPT09IDAgPyBbXSA6IHRoaXMuZmlsdGVyKFxuXHRcdGZ1bmNzLnJlZHVjZShjb21iaW5lRnVuY3MpLFxuXHRcdGVsZW1lbnQsIHJlY3Vyc2UsIGxpbWl0XG5cdCk7XG59O1xuXG5leHBvcnRzLmdldEVsZW1lbnRCeUlkID0gZnVuY3Rpb24oaWQsIGVsZW1lbnQsIHJlY3Vyc2Upe1xuXHRpZighQXJyYXkuaXNBcnJheShlbGVtZW50KSkgZWxlbWVudCA9IFtlbGVtZW50XTtcblx0cmV0dXJuIHRoaXMuZmluZE9uZShnZXRBdHRyaWJDaGVjayhcImlkXCIsIGlkKSwgZWxlbWVudCwgcmVjdXJzZSAhPT0gZmFsc2UpO1xufTtcblxuZXhwb3J0cy5nZXRFbGVtZW50c0J5VGFnTmFtZSA9IGZ1bmN0aW9uKG5hbWUsIGVsZW1lbnQsIHJlY3Vyc2UsIGxpbWl0KXtcblx0cmV0dXJuIHRoaXMuZmlsdGVyKENoZWNrcy50YWdfbmFtZShuYW1lKSwgZWxlbWVudCwgcmVjdXJzZSwgbGltaXQpO1xufTtcblxuZXhwb3J0cy5nZXRFbGVtZW50c0J5VGFnVHlwZSA9IGZ1bmN0aW9uKHR5cGUsIGVsZW1lbnQsIHJlY3Vyc2UsIGxpbWl0KXtcblx0cmV0dXJuIHRoaXMuZmlsdGVyKENoZWNrcy50YWdfdHlwZSh0eXBlKSwgZWxlbWVudCwgcmVjdXJzZSwgbGltaXQpO1xufTtcbiIsImV4cG9ydHMucmVtb3ZlRWxlbWVudCA9IGZ1bmN0aW9uKGVsZW0pe1xuXHRpZihlbGVtLnByZXYpIGVsZW0ucHJldi5uZXh0ID0gZWxlbS5uZXh0O1xuXHRpZihlbGVtLm5leHQpIGVsZW0ubmV4dC5wcmV2ID0gZWxlbS5wcmV2O1xuXG5cdGlmKGVsZW0ucGFyZW50KXtcblx0XHR2YXIgY2hpbGRzID0gZWxlbS5wYXJlbnQuY2hpbGRyZW47XG5cdFx0Y2hpbGRzLnNwbGljZShjaGlsZHMubGFzdEluZGV4T2YoZWxlbSksIDEpO1xuXHR9XG59O1xuXG5leHBvcnRzLnJlcGxhY2VFbGVtZW50ID0gZnVuY3Rpb24oZWxlbSwgcmVwbGFjZW1lbnQpe1xuXHR2YXIgcHJldiA9IHJlcGxhY2VtZW50LnByZXYgPSBlbGVtLnByZXY7XG5cdGlmKHByZXYpe1xuXHRcdHByZXYubmV4dCA9IHJlcGxhY2VtZW50O1xuXHR9XG5cblx0dmFyIG5leHQgPSByZXBsYWNlbWVudC5uZXh0ID0gZWxlbS5uZXh0O1xuXHRpZihuZXh0KXtcblx0XHRuZXh0LnByZXYgPSByZXBsYWNlbWVudDtcblx0fVxuXG5cdHZhciBwYXJlbnQgPSByZXBsYWNlbWVudC5wYXJlbnQgPSBlbGVtLnBhcmVudDtcblx0aWYocGFyZW50KXtcblx0XHR2YXIgY2hpbGRzID0gcGFyZW50LmNoaWxkcmVuO1xuXHRcdGNoaWxkc1tjaGlsZHMubGFzdEluZGV4T2YoZWxlbSldID0gcmVwbGFjZW1lbnQ7XG5cdH1cbn07XG5cbmV4cG9ydHMuYXBwZW5kQ2hpbGQgPSBmdW5jdGlvbihlbGVtLCBjaGlsZCl7XG5cdGNoaWxkLnBhcmVudCA9IGVsZW07XG5cblx0aWYoZWxlbS5jaGlsZHJlbi5wdXNoKGNoaWxkKSAhPT0gMSl7XG5cdFx0dmFyIHNpYmxpbmcgPSBlbGVtLmNoaWxkcmVuW2VsZW0uY2hpbGRyZW4ubGVuZ3RoIC0gMl07XG5cdFx0c2libGluZy5uZXh0ID0gY2hpbGQ7XG5cdFx0Y2hpbGQucHJldiA9IHNpYmxpbmc7XG5cdFx0Y2hpbGQubmV4dCA9IG51bGw7XG5cdH1cbn07XG5cbmV4cG9ydHMuYXBwZW5kID0gZnVuY3Rpb24oZWxlbSwgbmV4dCl7XG5cdHZhciBwYXJlbnQgPSBlbGVtLnBhcmVudCxcblx0XHRjdXJyTmV4dCA9IGVsZW0ubmV4dDtcblxuXHRuZXh0Lm5leHQgPSBjdXJyTmV4dDtcblx0bmV4dC5wcmV2ID0gZWxlbTtcblx0ZWxlbS5uZXh0ID0gbmV4dDtcblx0bmV4dC5wYXJlbnQgPSBwYXJlbnQ7XG5cblx0aWYoY3Vyck5leHQpe1xuXHRcdGN1cnJOZXh0LnByZXYgPSBuZXh0O1xuXHRcdGlmKHBhcmVudCl7XG5cdFx0XHR2YXIgY2hpbGRzID0gcGFyZW50LmNoaWxkcmVuO1xuXHRcdFx0Y2hpbGRzLnNwbGljZShjaGlsZHMubGFzdEluZGV4T2YoY3Vyck5leHQpLCAwLCBuZXh0KTtcblx0XHR9XG5cdH0gZWxzZSBpZihwYXJlbnQpe1xuXHRcdHBhcmVudC5jaGlsZHJlbi5wdXNoKG5leHQpO1xuXHR9XG59O1xuXG5leHBvcnRzLnByZXBlbmQgPSBmdW5jdGlvbihlbGVtLCBwcmV2KXtcblx0dmFyIHBhcmVudCA9IGVsZW0ucGFyZW50O1xuXHRpZihwYXJlbnQpe1xuXHRcdHZhciBjaGlsZHMgPSBwYXJlbnQuY2hpbGRyZW47XG5cdFx0Y2hpbGRzLnNwbGljZShjaGlsZHMubGFzdEluZGV4T2YoZWxlbSksIDAsIHByZXYpO1xuXHR9XG5cblx0aWYoZWxlbS5wcmV2KXtcblx0XHRlbGVtLnByZXYubmV4dCA9IHByZXY7XG5cdH1cblx0XG5cdHByZXYucGFyZW50ID0gcGFyZW50O1xuXHRwcmV2LnByZXYgPSBlbGVtLnByZXY7XG5cdHByZXYubmV4dCA9IGVsZW07XG5cdGVsZW0ucHJldiA9IHByZXY7XG59O1xuXG5cbiIsInZhciBpc1RhZyA9IHJlcXVpcmUoXCJkb21lbGVtZW50dHlwZVwiKS5pc1RhZztcblxubW9kdWxlLmV4cG9ydHMgPSB7XG5cdGZpbHRlcjogZmlsdGVyLFxuXHRmaW5kOiBmaW5kLFxuXHRmaW5kT25lQ2hpbGQ6IGZpbmRPbmVDaGlsZCxcblx0ZmluZE9uZTogZmluZE9uZSxcblx0ZXhpc3RzT25lOiBleGlzdHNPbmUsXG5cdGZpbmRBbGw6IGZpbmRBbGxcbn07XG5cbmZ1bmN0aW9uIGZpbHRlcih0ZXN0LCBlbGVtZW50LCByZWN1cnNlLCBsaW1pdCl7XG5cdGlmKCFBcnJheS5pc0FycmF5KGVsZW1lbnQpKSBlbGVtZW50ID0gW2VsZW1lbnRdO1xuXG5cdGlmKHR5cGVvZiBsaW1pdCAhPT0gXCJudW1iZXJcIiB8fCAhaXNGaW5pdGUobGltaXQpKXtcblx0XHRsaW1pdCA9IEluZmluaXR5O1xuXHR9XG5cdHJldHVybiBmaW5kKHRlc3QsIGVsZW1lbnQsIHJlY3Vyc2UgIT09IGZhbHNlLCBsaW1pdCk7XG59XG5cbmZ1bmN0aW9uIGZpbmQodGVzdCwgZWxlbXMsIHJlY3Vyc2UsIGxpbWl0KXtcblx0dmFyIHJlc3VsdCA9IFtdLCBjaGlsZHM7XG5cblx0Zm9yKHZhciBpID0gMCwgaiA9IGVsZW1zLmxlbmd0aDsgaSA8IGo7IGkrKyl7XG5cdFx0aWYodGVzdChlbGVtc1tpXSkpe1xuXHRcdFx0cmVzdWx0LnB1c2goZWxlbXNbaV0pO1xuXHRcdFx0aWYoLS1saW1pdCA8PSAwKSBicmVhaztcblx0XHR9XG5cblx0XHRjaGlsZHMgPSBlbGVtc1tpXS5jaGlsZHJlbjtcblx0XHRpZihyZWN1cnNlICYmIGNoaWxkcyAmJiBjaGlsZHMubGVuZ3RoID4gMCl7XG5cdFx0XHRjaGlsZHMgPSBmaW5kKHRlc3QsIGNoaWxkcywgcmVjdXJzZSwgbGltaXQpO1xuXHRcdFx0cmVzdWx0ID0gcmVzdWx0LmNvbmNhdChjaGlsZHMpO1xuXHRcdFx0bGltaXQgLT0gY2hpbGRzLmxlbmd0aDtcblx0XHRcdGlmKGxpbWl0IDw9IDApIGJyZWFrO1xuXHRcdH1cblx0fVxuXG5cdHJldHVybiByZXN1bHQ7XG59XG5cbmZ1bmN0aW9uIGZpbmRPbmVDaGlsZCh0ZXN0LCBlbGVtcyl7XG5cdGZvcih2YXIgaSA9IDAsIGwgPSBlbGVtcy5sZW5ndGg7IGkgPCBsOyBpKyspe1xuXHRcdGlmKHRlc3QoZWxlbXNbaV0pKSByZXR1cm4gZWxlbXNbaV07XG5cdH1cblxuXHRyZXR1cm4gbnVsbDtcbn1cblxuZnVuY3Rpb24gZmluZE9uZSh0ZXN0LCBlbGVtcyl7XG5cdHZhciBlbGVtID0gbnVsbDtcblxuXHRmb3IodmFyIGkgPSAwLCBsID0gZWxlbXMubGVuZ3RoOyBpIDwgbCAmJiAhZWxlbTsgaSsrKXtcblx0XHRpZighaXNUYWcoZWxlbXNbaV0pKXtcblx0XHRcdGNvbnRpbnVlO1xuXHRcdH0gZWxzZSBpZih0ZXN0KGVsZW1zW2ldKSl7XG5cdFx0XHRlbGVtID0gZWxlbXNbaV07XG5cdFx0fSBlbHNlIGlmKGVsZW1zW2ldLmNoaWxkcmVuLmxlbmd0aCA+IDApe1xuXHRcdFx0ZWxlbSA9IGZpbmRPbmUodGVzdCwgZWxlbXNbaV0uY2hpbGRyZW4pO1xuXHRcdH1cblx0fVxuXG5cdHJldHVybiBlbGVtO1xufVxuXG5mdW5jdGlvbiBleGlzdHNPbmUodGVzdCwgZWxlbXMpe1xuXHRmb3IodmFyIGkgPSAwLCBsID0gZWxlbXMubGVuZ3RoOyBpIDwgbDsgaSsrKXtcblx0XHRpZihcblx0XHRcdGlzVGFnKGVsZW1zW2ldKSAmJiAoXG5cdFx0XHRcdHRlc3QoZWxlbXNbaV0pIHx8IChcblx0XHRcdFx0XHRlbGVtc1tpXS5jaGlsZHJlbi5sZW5ndGggPiAwICYmXG5cdFx0XHRcdFx0ZXhpc3RzT25lKHRlc3QsIGVsZW1zW2ldLmNoaWxkcmVuKVxuXHRcdFx0XHQpXG5cdFx0XHQpXG5cdFx0KXtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH1cblx0fVxuXG5cdHJldHVybiBmYWxzZTtcbn1cblxuZnVuY3Rpb24gZmluZEFsbCh0ZXN0LCBlbGVtcyl7XG5cdHZhciByZXN1bHQgPSBbXTtcblx0Zm9yKHZhciBpID0gMCwgaiA9IGVsZW1zLmxlbmd0aDsgaSA8IGo7IGkrKyl7XG5cdFx0aWYoIWlzVGFnKGVsZW1zW2ldKSkgY29udGludWU7XG5cdFx0aWYodGVzdChlbGVtc1tpXSkpIHJlc3VsdC5wdXNoKGVsZW1zW2ldKTtcblxuXHRcdGlmKGVsZW1zW2ldLmNoaWxkcmVuLmxlbmd0aCA+IDApe1xuXHRcdFx0cmVzdWx0ID0gcmVzdWx0LmNvbmNhdChmaW5kQWxsKHRlc3QsIGVsZW1zW2ldLmNoaWxkcmVuKSk7XG5cdFx0fVxuXHR9XG5cdHJldHVybiByZXN1bHQ7XG59XG4iLCJ2YXIgRWxlbWVudFR5cGUgPSByZXF1aXJlKFwiZG9tZWxlbWVudHR5cGVcIiksXG4gICAgZ2V0T3V0ZXJIVE1MID0gcmVxdWlyZShcImRvbS1zZXJpYWxpemVyXCIpLFxuICAgIGlzVGFnID0gRWxlbWVudFR5cGUuaXNUYWc7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuXHRnZXRJbm5lckhUTUw6IGdldElubmVySFRNTCxcblx0Z2V0T3V0ZXJIVE1MOiBnZXRPdXRlckhUTUwsXG5cdGdldFRleHQ6IGdldFRleHRcbn07XG5cbmZ1bmN0aW9uIGdldElubmVySFRNTChlbGVtLCBvcHRzKXtcblx0cmV0dXJuIGVsZW0uY2hpbGRyZW4gPyBlbGVtLmNoaWxkcmVuLm1hcChmdW5jdGlvbihlbGVtKXtcblx0XHRyZXR1cm4gZ2V0T3V0ZXJIVE1MKGVsZW0sIG9wdHMpO1xuXHR9KS5qb2luKFwiXCIpIDogXCJcIjtcbn1cblxuZnVuY3Rpb24gZ2V0VGV4dChlbGVtKXtcblx0aWYoQXJyYXkuaXNBcnJheShlbGVtKSkgcmV0dXJuIGVsZW0ubWFwKGdldFRleHQpLmpvaW4oXCJcIik7XG5cdGlmKGlzVGFnKGVsZW0pIHx8IGVsZW0udHlwZSA9PT0gRWxlbWVudFR5cGUuQ0RBVEEpIHJldHVybiBnZXRUZXh0KGVsZW0uY2hpbGRyZW4pO1xuXHRpZihlbGVtLnR5cGUgPT09IEVsZW1lbnRUeXBlLlRleHQpIHJldHVybiBlbGVtLmRhdGE7XG5cdHJldHVybiBcIlwiO1xufVxuIiwidmFyIGdldENoaWxkcmVuID0gZXhwb3J0cy5nZXRDaGlsZHJlbiA9IGZ1bmN0aW9uKGVsZW0pe1xuXHRyZXR1cm4gZWxlbS5jaGlsZHJlbjtcbn07XG5cbnZhciBnZXRQYXJlbnQgPSBleHBvcnRzLmdldFBhcmVudCA9IGZ1bmN0aW9uKGVsZW0pe1xuXHRyZXR1cm4gZWxlbS5wYXJlbnQ7XG59O1xuXG5leHBvcnRzLmdldFNpYmxpbmdzID0gZnVuY3Rpb24oZWxlbSl7XG5cdHZhciBwYXJlbnQgPSBnZXRQYXJlbnQoZWxlbSk7XG5cdHJldHVybiBwYXJlbnQgPyBnZXRDaGlsZHJlbihwYXJlbnQpIDogW2VsZW1dO1xufTtcblxuZXhwb3J0cy5nZXRBdHRyaWJ1dGVWYWx1ZSA9IGZ1bmN0aW9uKGVsZW0sIG5hbWUpe1xuXHRyZXR1cm4gZWxlbS5hdHRyaWJzICYmIGVsZW0uYXR0cmlic1tuYW1lXTtcbn07XG5cbmV4cG9ydHMuaGFzQXR0cmliID0gZnVuY3Rpb24oZWxlbSwgbmFtZSl7XG5cdHJldHVybiAhIWVsZW0uYXR0cmlicyAmJiBoYXNPd25Qcm9wZXJ0eS5jYWxsKGVsZW0uYXR0cmlicywgbmFtZSk7XG59O1xuXG5leHBvcnRzLmdldE5hbWUgPSBmdW5jdGlvbihlbGVtKXtcblx0cmV0dXJuIGVsZW0ubmFtZTtcbn07XG4iLCIvLyBDb3B5cmlnaHQgSm95ZW50LCBJbmMuIGFuZCBvdGhlciBOb2RlIGNvbnRyaWJ1dG9ycy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYVxuLy8gY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZVxuLy8gXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nXG4vLyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsXG4vLyBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0XG4vLyBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGVcbi8vIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkXG4vLyBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTXG4vLyBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GXG4vLyBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOXG4vLyBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSxcbi8vIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUlxuLy8gT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRVxuLy8gVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cblxuZnVuY3Rpb24gRXZlbnRFbWl0dGVyKCkge1xuICB0aGlzLl9ldmVudHMgPSB0aGlzLl9ldmVudHMgfHwge307XG4gIHRoaXMuX21heExpc3RlbmVycyA9IHRoaXMuX21heExpc3RlbmVycyB8fCB1bmRlZmluZWQ7XG59XG5tb2R1bGUuZXhwb3J0cyA9IEV2ZW50RW1pdHRlcjtcblxuLy8gQmFja3dhcmRzLWNvbXBhdCB3aXRoIG5vZGUgMC4xMC54XG5FdmVudEVtaXR0ZXIuRXZlbnRFbWl0dGVyID0gRXZlbnRFbWl0dGVyO1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLl9ldmVudHMgPSB1bmRlZmluZWQ7XG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLl9tYXhMaXN0ZW5lcnMgPSB1bmRlZmluZWQ7XG5cbi8vIEJ5IGRlZmF1bHQgRXZlbnRFbWl0dGVycyB3aWxsIHByaW50IGEgd2FybmluZyBpZiBtb3JlIHRoYW4gMTAgbGlzdGVuZXJzIGFyZVxuLy8gYWRkZWQgdG8gaXQuIFRoaXMgaXMgYSB1c2VmdWwgZGVmYXVsdCB3aGljaCBoZWxwcyBmaW5kaW5nIG1lbW9yeSBsZWFrcy5cbkV2ZW50RW1pdHRlci5kZWZhdWx0TWF4TGlzdGVuZXJzID0gMTA7XG5cbi8vIE9idmlvdXNseSBub3QgYWxsIEVtaXR0ZXJzIHNob3VsZCBiZSBsaW1pdGVkIHRvIDEwLiBUaGlzIGZ1bmN0aW9uIGFsbG93c1xuLy8gdGhhdCB0byBiZSBpbmNyZWFzZWQuIFNldCB0byB6ZXJvIGZvciB1bmxpbWl0ZWQuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnNldE1heExpc3RlbmVycyA9IGZ1bmN0aW9uKG4pIHtcbiAgaWYgKCFpc051bWJlcihuKSB8fCBuIDwgMCB8fCBpc05hTihuKSlcbiAgICB0aHJvdyBUeXBlRXJyb3IoJ24gbXVzdCBiZSBhIHBvc2l0aXZlIG51bWJlcicpO1xuICB0aGlzLl9tYXhMaXN0ZW5lcnMgPSBuO1xuICByZXR1cm4gdGhpcztcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuZW1pdCA9IGZ1bmN0aW9uKHR5cGUpIHtcbiAgdmFyIGVyLCBoYW5kbGVyLCBsZW4sIGFyZ3MsIGksIGxpc3RlbmVycztcblxuICBpZiAoIXRoaXMuX2V2ZW50cylcbiAgICB0aGlzLl9ldmVudHMgPSB7fTtcblxuICAvLyBJZiB0aGVyZSBpcyBubyAnZXJyb3InIGV2ZW50IGxpc3RlbmVyIHRoZW4gdGhyb3cuXG4gIGlmICh0eXBlID09PSAnZXJyb3InKSB7XG4gICAgaWYgKCF0aGlzLl9ldmVudHMuZXJyb3IgfHxcbiAgICAgICAgKGlzT2JqZWN0KHRoaXMuX2V2ZW50cy5lcnJvcikgJiYgIXRoaXMuX2V2ZW50cy5lcnJvci5sZW5ndGgpKSB7XG4gICAgICBlciA9IGFyZ3VtZW50c1sxXTtcbiAgICAgIGlmIChlciBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgIHRocm93IGVyOyAvLyBVbmhhbmRsZWQgJ2Vycm9yJyBldmVudFxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gQXQgbGVhc3QgZ2l2ZSBzb21lIGtpbmQgb2YgY29udGV4dCB0byB0aGUgdXNlclxuICAgICAgICB2YXIgZXJyID0gbmV3IEVycm9yKCdVbmNhdWdodCwgdW5zcGVjaWZpZWQgXCJlcnJvclwiIGV2ZW50LiAoJyArIGVyICsgJyknKTtcbiAgICAgICAgZXJyLmNvbnRleHQgPSBlcjtcbiAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGhhbmRsZXIgPSB0aGlzLl9ldmVudHNbdHlwZV07XG5cbiAgaWYgKGlzVW5kZWZpbmVkKGhhbmRsZXIpKVxuICAgIHJldHVybiBmYWxzZTtcblxuICBpZiAoaXNGdW5jdGlvbihoYW5kbGVyKSkge1xuICAgIHN3aXRjaCAoYXJndW1lbnRzLmxlbmd0aCkge1xuICAgICAgLy8gZmFzdCBjYXNlc1xuICAgICAgY2FzZSAxOlxuICAgICAgICBoYW5kbGVyLmNhbGwodGhpcyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAyOlxuICAgICAgICBoYW5kbGVyLmNhbGwodGhpcywgYXJndW1lbnRzWzFdKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDM6XG4gICAgICAgIGhhbmRsZXIuY2FsbCh0aGlzLCBhcmd1bWVudHNbMV0sIGFyZ3VtZW50c1syXSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgLy8gc2xvd2VyXG4gICAgICBkZWZhdWx0OlxuICAgICAgICBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKTtcbiAgICAgICAgaGFuZGxlci5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICB9XG4gIH0gZWxzZSBpZiAoaXNPYmplY3QoaGFuZGxlcikpIHtcbiAgICBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKTtcbiAgICBsaXN0ZW5lcnMgPSBoYW5kbGVyLnNsaWNlKCk7XG4gICAgbGVuID0gbGlzdGVuZXJzLmxlbmd0aDtcbiAgICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpKyspXG4gICAgICBsaXN0ZW5lcnNbaV0uYXBwbHkodGhpcywgYXJncyk7XG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuYWRkTGlzdGVuZXIgPSBmdW5jdGlvbih0eXBlLCBsaXN0ZW5lcikge1xuICB2YXIgbTtcblxuICBpZiAoIWlzRnVuY3Rpb24obGlzdGVuZXIpKVxuICAgIHRocm93IFR5cGVFcnJvcignbGlzdGVuZXIgbXVzdCBiZSBhIGZ1bmN0aW9uJyk7XG5cbiAgaWYgKCF0aGlzLl9ldmVudHMpXG4gICAgdGhpcy5fZXZlbnRzID0ge307XG5cbiAgLy8gVG8gYXZvaWQgcmVjdXJzaW9uIGluIHRoZSBjYXNlIHRoYXQgdHlwZSA9PT0gXCJuZXdMaXN0ZW5lclwiISBCZWZvcmVcbiAgLy8gYWRkaW5nIGl0IHRvIHRoZSBsaXN0ZW5lcnMsIGZpcnN0IGVtaXQgXCJuZXdMaXN0ZW5lclwiLlxuICBpZiAodGhpcy5fZXZlbnRzLm5ld0xpc3RlbmVyKVxuICAgIHRoaXMuZW1pdCgnbmV3TGlzdGVuZXInLCB0eXBlLFxuICAgICAgICAgICAgICBpc0Z1bmN0aW9uKGxpc3RlbmVyLmxpc3RlbmVyKSA/XG4gICAgICAgICAgICAgIGxpc3RlbmVyLmxpc3RlbmVyIDogbGlzdGVuZXIpO1xuXG4gIGlmICghdGhpcy5fZXZlbnRzW3R5cGVdKVxuICAgIC8vIE9wdGltaXplIHRoZSBjYXNlIG9mIG9uZSBsaXN0ZW5lci4gRG9uJ3QgbmVlZCB0aGUgZXh0cmEgYXJyYXkgb2JqZWN0LlxuICAgIHRoaXMuX2V2ZW50c1t0eXBlXSA9IGxpc3RlbmVyO1xuICBlbHNlIGlmIChpc09iamVjdCh0aGlzLl9ldmVudHNbdHlwZV0pKVxuICAgIC8vIElmIHdlJ3ZlIGFscmVhZHkgZ290IGFuIGFycmF5LCBqdXN0IGFwcGVuZC5cbiAgICB0aGlzLl9ldmVudHNbdHlwZV0ucHVzaChsaXN0ZW5lcik7XG4gIGVsc2VcbiAgICAvLyBBZGRpbmcgdGhlIHNlY29uZCBlbGVtZW50LCBuZWVkIHRvIGNoYW5nZSB0byBhcnJheS5cbiAgICB0aGlzLl9ldmVudHNbdHlwZV0gPSBbdGhpcy5fZXZlbnRzW3R5cGVdLCBsaXN0ZW5lcl07XG5cbiAgLy8gQ2hlY2sgZm9yIGxpc3RlbmVyIGxlYWtcbiAgaWYgKGlzT2JqZWN0KHRoaXMuX2V2ZW50c1t0eXBlXSkgJiYgIXRoaXMuX2V2ZW50c1t0eXBlXS53YXJuZWQpIHtcbiAgICBpZiAoIWlzVW5kZWZpbmVkKHRoaXMuX21heExpc3RlbmVycykpIHtcbiAgICAgIG0gPSB0aGlzLl9tYXhMaXN0ZW5lcnM7XG4gICAgfSBlbHNlIHtcbiAgICAgIG0gPSBFdmVudEVtaXR0ZXIuZGVmYXVsdE1heExpc3RlbmVycztcbiAgICB9XG5cbiAgICBpZiAobSAmJiBtID4gMCAmJiB0aGlzLl9ldmVudHNbdHlwZV0ubGVuZ3RoID4gbSkge1xuICAgICAgdGhpcy5fZXZlbnRzW3R5cGVdLndhcm5lZCA9IHRydWU7XG4gICAgICBjb25zb2xlLmVycm9yKCcobm9kZSkgd2FybmluZzogcG9zc2libGUgRXZlbnRFbWl0dGVyIG1lbW9yeSAnICtcbiAgICAgICAgICAgICAgICAgICAgJ2xlYWsgZGV0ZWN0ZWQuICVkIGxpc3RlbmVycyBhZGRlZC4gJyArXG4gICAgICAgICAgICAgICAgICAgICdVc2UgZW1pdHRlci5zZXRNYXhMaXN0ZW5lcnMoKSB0byBpbmNyZWFzZSBsaW1pdC4nLFxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9ldmVudHNbdHlwZV0ubGVuZ3RoKTtcbiAgICAgIGlmICh0eXBlb2YgY29uc29sZS50cmFjZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAvLyBub3Qgc3VwcG9ydGVkIGluIElFIDEwXG4gICAgICAgIGNvbnNvbGUudHJhY2UoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gdGhpcztcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUub24gPSBFdmVudEVtaXR0ZXIucHJvdG90eXBlLmFkZExpc3RlbmVyO1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uY2UgPSBmdW5jdGlvbih0eXBlLCBsaXN0ZW5lcikge1xuICBpZiAoIWlzRnVuY3Rpb24obGlzdGVuZXIpKVxuICAgIHRocm93IFR5cGVFcnJvcignbGlzdGVuZXIgbXVzdCBiZSBhIGZ1bmN0aW9uJyk7XG5cbiAgdmFyIGZpcmVkID0gZmFsc2U7XG5cbiAgZnVuY3Rpb24gZygpIHtcbiAgICB0aGlzLnJlbW92ZUxpc3RlbmVyKHR5cGUsIGcpO1xuXG4gICAgaWYgKCFmaXJlZCkge1xuICAgICAgZmlyZWQgPSB0cnVlO1xuICAgICAgbGlzdGVuZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9XG4gIH1cblxuICBnLmxpc3RlbmVyID0gbGlzdGVuZXI7XG4gIHRoaXMub24odHlwZSwgZyk7XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vLyBlbWl0cyBhICdyZW1vdmVMaXN0ZW5lcicgZXZlbnQgaWZmIHRoZSBsaXN0ZW5lciB3YXMgcmVtb3ZlZFxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVMaXN0ZW5lciA9IGZ1bmN0aW9uKHR5cGUsIGxpc3RlbmVyKSB7XG4gIHZhciBsaXN0LCBwb3NpdGlvbiwgbGVuZ3RoLCBpO1xuXG4gIGlmICghaXNGdW5jdGlvbihsaXN0ZW5lcikpXG4gICAgdGhyb3cgVHlwZUVycm9yKCdsaXN0ZW5lciBtdXN0IGJlIGEgZnVuY3Rpb24nKTtcblxuICBpZiAoIXRoaXMuX2V2ZW50cyB8fCAhdGhpcy5fZXZlbnRzW3R5cGVdKVxuICAgIHJldHVybiB0aGlzO1xuXG4gIGxpc3QgPSB0aGlzLl9ldmVudHNbdHlwZV07XG4gIGxlbmd0aCA9IGxpc3QubGVuZ3RoO1xuICBwb3NpdGlvbiA9IC0xO1xuXG4gIGlmIChsaXN0ID09PSBsaXN0ZW5lciB8fFxuICAgICAgKGlzRnVuY3Rpb24obGlzdC5saXN0ZW5lcikgJiYgbGlzdC5saXN0ZW5lciA9PT0gbGlzdGVuZXIpKSB7XG4gICAgZGVsZXRlIHRoaXMuX2V2ZW50c1t0eXBlXTtcbiAgICBpZiAodGhpcy5fZXZlbnRzLnJlbW92ZUxpc3RlbmVyKVxuICAgICAgdGhpcy5lbWl0KCdyZW1vdmVMaXN0ZW5lcicsIHR5cGUsIGxpc3RlbmVyKTtcblxuICB9IGVsc2UgaWYgKGlzT2JqZWN0KGxpc3QpKSB7XG4gICAgZm9yIChpID0gbGVuZ3RoOyBpLS0gPiAwOykge1xuICAgICAgaWYgKGxpc3RbaV0gPT09IGxpc3RlbmVyIHx8XG4gICAgICAgICAgKGxpc3RbaV0ubGlzdGVuZXIgJiYgbGlzdFtpXS5saXN0ZW5lciA9PT0gbGlzdGVuZXIpKSB7XG4gICAgICAgIHBvc2l0aW9uID0gaTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHBvc2l0aW9uIDwgMClcbiAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgaWYgKGxpc3QubGVuZ3RoID09PSAxKSB7XG4gICAgICBsaXN0Lmxlbmd0aCA9IDA7XG4gICAgICBkZWxldGUgdGhpcy5fZXZlbnRzW3R5cGVdO1xuICAgIH0gZWxzZSB7XG4gICAgICBsaXN0LnNwbGljZShwb3NpdGlvbiwgMSk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX2V2ZW50cy5yZW1vdmVMaXN0ZW5lcilcbiAgICAgIHRoaXMuZW1pdCgncmVtb3ZlTGlzdGVuZXInLCB0eXBlLCBsaXN0ZW5lcik7XG4gIH1cblxuICByZXR1cm4gdGhpcztcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucmVtb3ZlQWxsTGlzdGVuZXJzID0gZnVuY3Rpb24odHlwZSkge1xuICB2YXIga2V5LCBsaXN0ZW5lcnM7XG5cbiAgaWYgKCF0aGlzLl9ldmVudHMpXG4gICAgcmV0dXJuIHRoaXM7XG5cbiAgLy8gbm90IGxpc3RlbmluZyBmb3IgcmVtb3ZlTGlzdGVuZXIsIG5vIG5lZWQgdG8gZW1pdFxuICBpZiAoIXRoaXMuX2V2ZW50cy5yZW1vdmVMaXN0ZW5lcikge1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKVxuICAgICAgdGhpcy5fZXZlbnRzID0ge307XG4gICAgZWxzZSBpZiAodGhpcy5fZXZlbnRzW3R5cGVdKVxuICAgICAgZGVsZXRlIHRoaXMuX2V2ZW50c1t0eXBlXTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8vIGVtaXQgcmVtb3ZlTGlzdGVuZXIgZm9yIGFsbCBsaXN0ZW5lcnMgb24gYWxsIGV2ZW50c1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCkge1xuICAgIGZvciAoa2V5IGluIHRoaXMuX2V2ZW50cykge1xuICAgICAgaWYgKGtleSA9PT0gJ3JlbW92ZUxpc3RlbmVyJykgY29udGludWU7XG4gICAgICB0aGlzLnJlbW92ZUFsbExpc3RlbmVycyhrZXkpO1xuICAgIH1cbiAgICB0aGlzLnJlbW92ZUFsbExpc3RlbmVycygncmVtb3ZlTGlzdGVuZXInKTtcbiAgICB0aGlzLl9ldmVudHMgPSB7fTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGxpc3RlbmVycyA9IHRoaXMuX2V2ZW50c1t0eXBlXTtcblxuICBpZiAoaXNGdW5jdGlvbihsaXN0ZW5lcnMpKSB7XG4gICAgdGhpcy5yZW1vdmVMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcnMpO1xuICB9IGVsc2UgaWYgKGxpc3RlbmVycykge1xuICAgIC8vIExJRk8gb3JkZXJcbiAgICB3aGlsZSAobGlzdGVuZXJzLmxlbmd0aClcbiAgICAgIHRoaXMucmVtb3ZlTGlzdGVuZXIodHlwZSwgbGlzdGVuZXJzW2xpc3RlbmVycy5sZW5ndGggLSAxXSk7XG4gIH1cbiAgZGVsZXRlIHRoaXMuX2V2ZW50c1t0eXBlXTtcblxuICByZXR1cm4gdGhpcztcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUubGlzdGVuZXJzID0gZnVuY3Rpb24odHlwZSkge1xuICB2YXIgcmV0O1xuICBpZiAoIXRoaXMuX2V2ZW50cyB8fCAhdGhpcy5fZXZlbnRzW3R5cGVdKVxuICAgIHJldCA9IFtdO1xuICBlbHNlIGlmIChpc0Z1bmN0aW9uKHRoaXMuX2V2ZW50c1t0eXBlXSkpXG4gICAgcmV0ID0gW3RoaXMuX2V2ZW50c1t0eXBlXV07XG4gIGVsc2VcbiAgICByZXQgPSB0aGlzLl9ldmVudHNbdHlwZV0uc2xpY2UoKTtcbiAgcmV0dXJuIHJldDtcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUubGlzdGVuZXJDb3VudCA9IGZ1bmN0aW9uKHR5cGUpIHtcbiAgaWYgKHRoaXMuX2V2ZW50cykge1xuICAgIHZhciBldmxpc3RlbmVyID0gdGhpcy5fZXZlbnRzW3R5cGVdO1xuXG4gICAgaWYgKGlzRnVuY3Rpb24oZXZsaXN0ZW5lcikpXG4gICAgICByZXR1cm4gMTtcbiAgICBlbHNlIGlmIChldmxpc3RlbmVyKVxuICAgICAgcmV0dXJuIGV2bGlzdGVuZXIubGVuZ3RoO1xuICB9XG4gIHJldHVybiAwO1xufTtcblxuRXZlbnRFbWl0dGVyLmxpc3RlbmVyQ291bnQgPSBmdW5jdGlvbihlbWl0dGVyLCB0eXBlKSB7XG4gIHJldHVybiBlbWl0dGVyLmxpc3RlbmVyQ291bnQodHlwZSk7XG59O1xuXG5mdW5jdGlvbiBpc0Z1bmN0aW9uKGFyZykge1xuICByZXR1cm4gdHlwZW9mIGFyZyA9PT0gJ2Z1bmN0aW9uJztcbn1cblxuZnVuY3Rpb24gaXNOdW1iZXIoYXJnKSB7XG4gIHJldHVybiB0eXBlb2YgYXJnID09PSAnbnVtYmVyJztcbn1cblxuZnVuY3Rpb24gaXNPYmplY3QoYXJnKSB7XG4gIHJldHVybiB0eXBlb2YgYXJnID09PSAnb2JqZWN0JyAmJiBhcmcgIT09IG51bGw7XG59XG5cbmZ1bmN0aW9uIGlzVW5kZWZpbmVkKGFyZykge1xuICByZXR1cm4gYXJnID09PSB2b2lkIDA7XG59XG4iLCJleHBvcnRzLnJlYWQgPSBmdW5jdGlvbiAoYnVmZmVyLCBvZmZzZXQsIGlzTEUsIG1MZW4sIG5CeXRlcykge1xuICB2YXIgZSwgbVxuICB2YXIgZUxlbiA9IG5CeXRlcyAqIDggLSBtTGVuIC0gMVxuICB2YXIgZU1heCA9ICgxIDw8IGVMZW4pIC0gMVxuICB2YXIgZUJpYXMgPSBlTWF4ID4+IDFcbiAgdmFyIG5CaXRzID0gLTdcbiAgdmFyIGkgPSBpc0xFID8gKG5CeXRlcyAtIDEpIDogMFxuICB2YXIgZCA9IGlzTEUgPyAtMSA6IDFcbiAgdmFyIHMgPSBidWZmZXJbb2Zmc2V0ICsgaV1cblxuICBpICs9IGRcblxuICBlID0gcyAmICgoMSA8PCAoLW5CaXRzKSkgLSAxKVxuICBzID4+PSAoLW5CaXRzKVxuICBuQml0cyArPSBlTGVuXG4gIGZvciAoOyBuQml0cyA+IDA7IGUgPSBlICogMjU2ICsgYnVmZmVyW29mZnNldCArIGldLCBpICs9IGQsIG5CaXRzIC09IDgpIHt9XG5cbiAgbSA9IGUgJiAoKDEgPDwgKC1uQml0cykpIC0gMSlcbiAgZSA+Pj0gKC1uQml0cylcbiAgbkJpdHMgKz0gbUxlblxuICBmb3IgKDsgbkJpdHMgPiAwOyBtID0gbSAqIDI1NiArIGJ1ZmZlcltvZmZzZXQgKyBpXSwgaSArPSBkLCBuQml0cyAtPSA4KSB7fVxuXG4gIGlmIChlID09PSAwKSB7XG4gICAgZSA9IDEgLSBlQmlhc1xuICB9IGVsc2UgaWYgKGUgPT09IGVNYXgpIHtcbiAgICByZXR1cm4gbSA/IE5hTiA6ICgocyA/IC0xIDogMSkgKiBJbmZpbml0eSlcbiAgfSBlbHNlIHtcbiAgICBtID0gbSArIE1hdGgucG93KDIsIG1MZW4pXG4gICAgZSA9IGUgLSBlQmlhc1xuICB9XG4gIHJldHVybiAocyA/IC0xIDogMSkgKiBtICogTWF0aC5wb3coMiwgZSAtIG1MZW4pXG59XG5cbmV4cG9ydHMud3JpdGUgPSBmdW5jdGlvbiAoYnVmZmVyLCB2YWx1ZSwgb2Zmc2V0LCBpc0xFLCBtTGVuLCBuQnl0ZXMpIHtcbiAgdmFyIGUsIG0sIGNcbiAgdmFyIGVMZW4gPSBuQnl0ZXMgKiA4IC0gbUxlbiAtIDFcbiAgdmFyIGVNYXggPSAoMSA8PCBlTGVuKSAtIDFcbiAgdmFyIGVCaWFzID0gZU1heCA+PiAxXG4gIHZhciBydCA9IChtTGVuID09PSAyMyA/IE1hdGgucG93KDIsIC0yNCkgLSBNYXRoLnBvdygyLCAtNzcpIDogMClcbiAgdmFyIGkgPSBpc0xFID8gMCA6IChuQnl0ZXMgLSAxKVxuICB2YXIgZCA9IGlzTEUgPyAxIDogLTFcbiAgdmFyIHMgPSB2YWx1ZSA8IDAgfHwgKHZhbHVlID09PSAwICYmIDEgLyB2YWx1ZSA8IDApID8gMSA6IDBcblxuICB2YWx1ZSA9IE1hdGguYWJzKHZhbHVlKVxuXG4gIGlmIChpc05hTih2YWx1ZSkgfHwgdmFsdWUgPT09IEluZmluaXR5KSB7XG4gICAgbSA9IGlzTmFOKHZhbHVlKSA/IDEgOiAwXG4gICAgZSA9IGVNYXhcbiAgfSBlbHNlIHtcbiAgICBlID0gTWF0aC5mbG9vcihNYXRoLmxvZyh2YWx1ZSkgLyBNYXRoLkxOMilcbiAgICBpZiAodmFsdWUgKiAoYyA9IE1hdGgucG93KDIsIC1lKSkgPCAxKSB7XG4gICAgICBlLS1cbiAgICAgIGMgKj0gMlxuICAgIH1cbiAgICBpZiAoZSArIGVCaWFzID49IDEpIHtcbiAgICAgIHZhbHVlICs9IHJ0IC8gY1xuICAgIH0gZWxzZSB7XG4gICAgICB2YWx1ZSArPSBydCAqIE1hdGgucG93KDIsIDEgLSBlQmlhcylcbiAgICB9XG4gICAgaWYgKHZhbHVlICogYyA+PSAyKSB7XG4gICAgICBlKytcbiAgICAgIGMgLz0gMlxuICAgIH1cblxuICAgIGlmIChlICsgZUJpYXMgPj0gZU1heCkge1xuICAgICAgbSA9IDBcbiAgICAgIGUgPSBlTWF4XG4gICAgfSBlbHNlIGlmIChlICsgZUJpYXMgPj0gMSkge1xuICAgICAgbSA9ICh2YWx1ZSAqIGMgLSAxKSAqIE1hdGgucG93KDIsIG1MZW4pXG4gICAgICBlID0gZSArIGVCaWFzXG4gICAgfSBlbHNlIHtcbiAgICAgIG0gPSB2YWx1ZSAqIE1hdGgucG93KDIsIGVCaWFzIC0gMSkgKiBNYXRoLnBvdygyLCBtTGVuKVxuICAgICAgZSA9IDBcbiAgICB9XG4gIH1cblxuICBmb3IgKDsgbUxlbiA+PSA4OyBidWZmZXJbb2Zmc2V0ICsgaV0gPSBtICYgMHhmZiwgaSArPSBkLCBtIC89IDI1NiwgbUxlbiAtPSA4KSB7fVxuXG4gIGUgPSAoZSA8PCBtTGVuKSB8IG1cbiAgZUxlbiArPSBtTGVuXG4gIGZvciAoOyBlTGVuID4gMDsgYnVmZmVyW29mZnNldCArIGldID0gZSAmIDB4ZmYsIGkgKz0gZCwgZSAvPSAyNTYsIGVMZW4gLT0gOCkge31cblxuICBidWZmZXJbb2Zmc2V0ICsgaSAtIGRdIHw9IHMgKiAxMjhcbn1cbiIsImlmICh0eXBlb2YgT2JqZWN0LmNyZWF0ZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAvLyBpbXBsZW1lbnRhdGlvbiBmcm9tIHN0YW5kYXJkIG5vZGUuanMgJ3V0aWwnIG1vZHVsZVxuICBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGluaGVyaXRzKGN0b3IsIHN1cGVyQ3Rvcikge1xuICAgIGN0b3Iuc3VwZXJfID0gc3VwZXJDdG9yXG4gICAgY3Rvci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ3Rvci5wcm90b3R5cGUsIHtcbiAgICAgIGNvbnN0cnVjdG9yOiB7XG4gICAgICAgIHZhbHVlOiBjdG9yLFxuICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgICAgfVxuICAgIH0pO1xuICB9O1xufSBlbHNlIHtcbiAgLy8gb2xkIHNjaG9vbCBzaGltIGZvciBvbGQgYnJvd3NlcnNcbiAgbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpbmhlcml0cyhjdG9yLCBzdXBlckN0b3IpIHtcbiAgICBjdG9yLnN1cGVyXyA9IHN1cGVyQ3RvclxuICAgIHZhciBUZW1wQ3RvciA9IGZ1bmN0aW9uICgpIHt9XG4gICAgVGVtcEN0b3IucHJvdG90eXBlID0gc3VwZXJDdG9yLnByb3RvdHlwZVxuICAgIGN0b3IucHJvdG90eXBlID0gbmV3IFRlbXBDdG9yKClcbiAgICBjdG9yLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IGN0b3JcbiAgfVxufVxuIiwiLyohXG4gKiBEZXRlcm1pbmUgaWYgYW4gb2JqZWN0IGlzIGEgQnVmZmVyXG4gKlxuICogQGF1dGhvciAgIEZlcm9zcyBBYm91a2hhZGlqZWggPGZlcm9zc0BmZXJvc3Mub3JnPiA8aHR0cDovL2Zlcm9zcy5vcmc+XG4gKiBAbGljZW5zZSAgTUlUXG4gKi9cblxuLy8gVGhlIF9pc0J1ZmZlciBjaGVjayBpcyBmb3IgU2FmYXJpIDUtNyBzdXBwb3J0LCBiZWNhdXNlIGl0J3MgbWlzc2luZ1xuLy8gT2JqZWN0LnByb3RvdHlwZS5jb25zdHJ1Y3Rvci4gUmVtb3ZlIHRoaXMgZXZlbnR1YWxseVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAob2JqKSB7XG4gIHJldHVybiBvYmogIT0gbnVsbCAmJiAoaXNCdWZmZXIob2JqKSB8fCBpc1Nsb3dCdWZmZXIob2JqKSB8fCAhIW9iai5faXNCdWZmZXIpXG59XG5cbmZ1bmN0aW9uIGlzQnVmZmVyIChvYmopIHtcbiAgcmV0dXJuICEhb2JqLmNvbnN0cnVjdG9yICYmIHR5cGVvZiBvYmouY29uc3RydWN0b3IuaXNCdWZmZXIgPT09ICdmdW5jdGlvbicgJiYgb2JqLmNvbnN0cnVjdG9yLmlzQnVmZmVyKG9iailcbn1cblxuLy8gRm9yIE5vZGUgdjAuMTAgc3VwcG9ydC4gUmVtb3ZlIHRoaXMgZXZlbnR1YWxseS5cbmZ1bmN0aW9uIGlzU2xvd0J1ZmZlciAob2JqKSB7XG4gIHJldHVybiB0eXBlb2Ygb2JqLnJlYWRGbG9hdExFID09PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBvYmouc2xpY2UgPT09ICdmdW5jdGlvbicgJiYgaXNCdWZmZXIob2JqLnNsaWNlKDAsIDApKVxufVxuIiwidmFyIHRvU3RyaW5nID0ge30udG9TdHJpbmc7XG5cbm1vZHVsZS5leHBvcnRzID0gQXJyYXkuaXNBcnJheSB8fCBmdW5jdGlvbiAoYXJyKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKGFycikgPT0gJ1tvYmplY3QgQXJyYXldJztcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbmlmICghcHJvY2Vzcy52ZXJzaW9uIHx8XG4gICAgcHJvY2Vzcy52ZXJzaW9uLmluZGV4T2YoJ3YwLicpID09PSAwIHx8XG4gICAgcHJvY2Vzcy52ZXJzaW9uLmluZGV4T2YoJ3YxLicpID09PSAwICYmIHByb2Nlc3MudmVyc2lvbi5pbmRleE9mKCd2MS44LicpICE9PSAwKSB7XG4gIG1vZHVsZS5leHBvcnRzID0gbmV4dFRpY2s7XG59IGVsc2Uge1xuICBtb2R1bGUuZXhwb3J0cyA9IHByb2Nlc3MubmV4dFRpY2s7XG59XG5cbmZ1bmN0aW9uIG5leHRUaWNrKGZuLCBhcmcxLCBhcmcyLCBhcmczKSB7XG4gIGlmICh0eXBlb2YgZm4gIT09ICdmdW5jdGlvbicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdcImNhbGxiYWNrXCIgYXJndW1lbnQgbXVzdCBiZSBhIGZ1bmN0aW9uJyk7XG4gIH1cbiAgdmFyIGxlbiA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gIHZhciBhcmdzLCBpO1xuICBzd2l0Y2ggKGxlbikge1xuICBjYXNlIDA6XG4gIGNhc2UgMTpcbiAgICByZXR1cm4gcHJvY2Vzcy5uZXh0VGljayhmbik7XG4gIGNhc2UgMjpcbiAgICByZXR1cm4gcHJvY2Vzcy5uZXh0VGljayhmdW5jdGlvbiBhZnRlclRpY2tPbmUoKSB7XG4gICAgICBmbi5jYWxsKG51bGwsIGFyZzEpO1xuICAgIH0pO1xuICBjYXNlIDM6XG4gICAgcmV0dXJuIHByb2Nlc3MubmV4dFRpY2soZnVuY3Rpb24gYWZ0ZXJUaWNrVHdvKCkge1xuICAgICAgZm4uY2FsbChudWxsLCBhcmcxLCBhcmcyKTtcbiAgICB9KTtcbiAgY2FzZSA0OlxuICAgIHJldHVybiBwcm9jZXNzLm5leHRUaWNrKGZ1bmN0aW9uIGFmdGVyVGlja1RocmVlKCkge1xuICAgICAgZm4uY2FsbChudWxsLCBhcmcxLCBhcmcyLCBhcmczKTtcbiAgICB9KTtcbiAgZGVmYXVsdDpcbiAgICBhcmdzID0gbmV3IEFycmF5KGxlbiAtIDEpO1xuICAgIGkgPSAwO1xuICAgIHdoaWxlIChpIDwgYXJncy5sZW5ndGgpIHtcbiAgICAgIGFyZ3NbaSsrXSA9IGFyZ3VtZW50c1tpXTtcbiAgICB9XG4gICAgcmV0dXJuIHByb2Nlc3MubmV4dFRpY2soZnVuY3Rpb24gYWZ0ZXJUaWNrKCkge1xuICAgICAgZm4uYXBwbHkobnVsbCwgYXJncyk7XG4gICAgfSk7XG4gIH1cbn1cbiIsIi8vIHNoaW0gZm9yIHVzaW5nIHByb2Nlc3MgaW4gYnJvd3NlclxudmFyIHByb2Nlc3MgPSBtb2R1bGUuZXhwb3J0cyA9IHt9O1xuXG4vLyBjYWNoZWQgZnJvbSB3aGF0ZXZlciBnbG9iYWwgaXMgcHJlc2VudCBzbyB0aGF0IHRlc3QgcnVubmVycyB0aGF0IHN0dWIgaXRcbi8vIGRvbid0IGJyZWFrIHRoaW5ncy4gIEJ1dCB3ZSBuZWVkIHRvIHdyYXAgaXQgaW4gYSB0cnkgY2F0Y2ggaW4gY2FzZSBpdCBpc1xuLy8gd3JhcHBlZCBpbiBzdHJpY3QgbW9kZSBjb2RlIHdoaWNoIGRvZXNuJ3QgZGVmaW5lIGFueSBnbG9iYWxzLiAgSXQncyBpbnNpZGUgYVxuLy8gZnVuY3Rpb24gYmVjYXVzZSB0cnkvY2F0Y2hlcyBkZW9wdGltaXplIGluIGNlcnRhaW4gZW5naW5lcy5cblxudmFyIGNhY2hlZFNldFRpbWVvdXQ7XG52YXIgY2FjaGVkQ2xlYXJUaW1lb3V0O1xuXG5mdW5jdGlvbiBkZWZhdWx0U2V0VGltb3V0KCkge1xuICAgIHRocm93IG5ldyBFcnJvcignc2V0VGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuZnVuY3Rpb24gZGVmYXVsdENsZWFyVGltZW91dCAoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdjbGVhclRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbihmdW5jdGlvbiAoKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBzZXRUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBjbGVhclRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgfVxufSAoKSlcbmZ1bmN0aW9uIHJ1blRpbWVvdXQoZnVuKSB7XG4gICAgaWYgKGNhY2hlZFNldFRpbWVvdXQgPT09IHNldFRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIC8vIGlmIHNldFRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRTZXRUaW1lb3V0ID09PSBkZWZhdWx0U2V0VGltb3V0IHx8ICFjYWNoZWRTZXRUaW1lb3V0KSAmJiBzZXRUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfSBjYXRjaChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbChudWxsLCBmdW4sIDApO1xuICAgICAgICB9IGNhdGNoKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3JcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwodGhpcywgZnVuLCAwKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG59XG5mdW5jdGlvbiBydW5DbGVhclRpbWVvdXQobWFya2VyKSB7XG4gICAgaWYgKGNhY2hlZENsZWFyVGltZW91dCA9PT0gY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIC8vIGlmIGNsZWFyVGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZENsZWFyVGltZW91dCA9PT0gZGVmYXVsdENsZWFyVGltZW91dCB8fCAhY2FjaGVkQ2xlYXJUaW1lb3V0KSAmJiBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0ICB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKG51bGwsIG1hcmtlcik7XG4gICAgICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3IuXG4gICAgICAgICAgICAvLyBTb21lIHZlcnNpb25zIG9mIEkuRS4gaGF2ZSBkaWZmZXJlbnQgcnVsZXMgZm9yIGNsZWFyVGltZW91dCB2cyBzZXRUaW1lb3V0XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwodGhpcywgbWFya2VyKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG5cbn1cbnZhciBxdWV1ZSA9IFtdO1xudmFyIGRyYWluaW5nID0gZmFsc2U7XG52YXIgY3VycmVudFF1ZXVlO1xudmFyIHF1ZXVlSW5kZXggPSAtMTtcblxuZnVuY3Rpb24gY2xlYW5VcE5leHRUaWNrKCkge1xuICAgIGlmICghZHJhaW5pbmcgfHwgIWN1cnJlbnRRdWV1ZSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgaWYgKGN1cnJlbnRRdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgcXVldWUgPSBjdXJyZW50UXVldWUuY29uY2F0KHF1ZXVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgfVxuICAgIGlmIChxdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgZHJhaW5RdWV1ZSgpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZHJhaW5RdWV1ZSgpIHtcbiAgICBpZiAoZHJhaW5pbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgdGltZW91dCA9IHJ1blRpbWVvdXQoY2xlYW5VcE5leHRUaWNrKTtcbiAgICBkcmFpbmluZyA9IHRydWU7XG5cbiAgICB2YXIgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIHdoaWxlKGxlbikge1xuICAgICAgICBjdXJyZW50UXVldWUgPSBxdWV1ZTtcbiAgICAgICAgcXVldWUgPSBbXTtcbiAgICAgICAgd2hpbGUgKCsrcXVldWVJbmRleCA8IGxlbikge1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRRdWV1ZSkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRRdWV1ZVtxdWV1ZUluZGV4XS5ydW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgICAgIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB9XG4gICAgY3VycmVudFF1ZXVlID0gbnVsbDtcbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIHJ1bkNsZWFyVGltZW91dCh0aW1lb3V0KTtcbn1cblxucHJvY2Vzcy5uZXh0VGljayA9IGZ1bmN0aW9uIChmdW4pIHtcbiAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoIC0gMSk7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBhcmdzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBxdWV1ZS5wdXNoKG5ldyBJdGVtKGZ1biwgYXJncykpO1xuICAgIGlmIChxdWV1ZS5sZW5ndGggPT09IDEgJiYgIWRyYWluaW5nKSB7XG4gICAgICAgIHJ1blRpbWVvdXQoZHJhaW5RdWV1ZSk7XG4gICAgfVxufTtcblxuLy8gdjggbGlrZXMgcHJlZGljdGlibGUgb2JqZWN0c1xuZnVuY3Rpb24gSXRlbShmdW4sIGFycmF5KSB7XG4gICAgdGhpcy5mdW4gPSBmdW47XG4gICAgdGhpcy5hcnJheSA9IGFycmF5O1xufVxuSXRlbS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZnVuLmFwcGx5KG51bGwsIHRoaXMuYXJyYXkpO1xufTtcbnByb2Nlc3MudGl0bGUgPSAnYnJvd3Nlcic7XG5wcm9jZXNzLmJyb3dzZXIgPSB0cnVlO1xucHJvY2Vzcy5lbnYgPSB7fTtcbnByb2Nlc3MuYXJndiA9IFtdO1xucHJvY2Vzcy52ZXJzaW9uID0gJyc7IC8vIGVtcHR5IHN0cmluZyB0byBhdm9pZCByZWdleHAgaXNzdWVzXG5wcm9jZXNzLnZlcnNpb25zID0ge307XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG5wcm9jZXNzLm9uID0gbm9vcDtcbnByb2Nlc3MuYWRkTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5vbmNlID0gbm9vcDtcbnByb2Nlc3Mub2ZmID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBub29wO1xucHJvY2Vzcy5lbWl0ID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZE9uY2VMaXN0ZW5lciA9IG5vb3A7XG5cbnByb2Nlc3MubGlzdGVuZXJzID0gZnVuY3Rpb24gKG5hbWUpIHsgcmV0dXJuIFtdIH1cblxucHJvY2Vzcy5iaW5kaW5nID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuYmluZGluZyBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xuXG5wcm9jZXNzLmN3ZCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuICcvJyB9O1xucHJvY2Vzcy5jaGRpciA9IGZ1bmN0aW9uIChkaXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuY2hkaXIgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcbnByb2Nlc3MudW1hc2sgPSBmdW5jdGlvbigpIHsgcmV0dXJuIDA7IH07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vbGliL19zdHJlYW1fZHVwbGV4LmpzJyk7XG4iLCIvLyBDb3B5cmlnaHQgSm95ZW50LCBJbmMuIGFuZCBvdGhlciBOb2RlIGNvbnRyaWJ1dG9ycy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYVxuLy8gY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZVxuLy8gXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nXG4vLyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsXG4vLyBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0XG4vLyBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGVcbi8vIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkXG4vLyBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTXG4vLyBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GXG4vLyBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOXG4vLyBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSxcbi8vIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUlxuLy8gT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRVxuLy8gVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cblxuLy8gYSBkdXBsZXggc3RyZWFtIGlzIGp1c3QgYSBzdHJlYW0gdGhhdCBpcyBib3RoIHJlYWRhYmxlIGFuZCB3cml0YWJsZS5cbi8vIFNpbmNlIEpTIGRvZXNuJ3QgaGF2ZSBtdWx0aXBsZSBwcm90b3R5cGFsIGluaGVyaXRhbmNlLCB0aGlzIGNsYXNzXG4vLyBwcm90b3R5cGFsbHkgaW5oZXJpdHMgZnJvbSBSZWFkYWJsZSwgYW5kIHRoZW4gcGFyYXNpdGljYWxseSBmcm9tXG4vLyBXcml0YWJsZS5cblxuJ3VzZSBzdHJpY3QnO1xuXG4vKjxyZXBsYWNlbWVudD4qL1xuXG52YXIgcHJvY2Vzc05leHRUaWNrID0gcmVxdWlyZSgncHJvY2Vzcy1uZXh0aWNrLWFyZ3MnKTtcbi8qPC9yZXBsYWNlbWVudD4qL1xuXG4vKjxyZXBsYWNlbWVudD4qL1xudmFyIG9iamVjdEtleXMgPSBPYmplY3Qua2V5cyB8fCBmdW5jdGlvbiAob2JqKSB7XG4gIHZhciBrZXlzID0gW107XG4gIGZvciAodmFyIGtleSBpbiBvYmopIHtcbiAgICBrZXlzLnB1c2goa2V5KTtcbiAgfXJldHVybiBrZXlzO1xufTtcbi8qPC9yZXBsYWNlbWVudD4qL1xuXG5tb2R1bGUuZXhwb3J0cyA9IER1cGxleDtcblxuLyo8cmVwbGFjZW1lbnQ+Ki9cbnZhciB1dGlsID0gcmVxdWlyZSgnY29yZS11dGlsLWlzJyk7XG51dGlsLmluaGVyaXRzID0gcmVxdWlyZSgnaW5oZXJpdHMnKTtcbi8qPC9yZXBsYWNlbWVudD4qL1xuXG52YXIgUmVhZGFibGUgPSByZXF1aXJlKCcuL19zdHJlYW1fcmVhZGFibGUnKTtcbnZhciBXcml0YWJsZSA9IHJlcXVpcmUoJy4vX3N0cmVhbV93cml0YWJsZScpO1xuXG51dGlsLmluaGVyaXRzKER1cGxleCwgUmVhZGFibGUpO1xuXG52YXIga2V5cyA9IG9iamVjdEtleXMoV3JpdGFibGUucHJvdG90eXBlKTtcbmZvciAodmFyIHYgPSAwOyB2IDwga2V5cy5sZW5ndGg7IHYrKykge1xuICB2YXIgbWV0aG9kID0ga2V5c1t2XTtcbiAgaWYgKCFEdXBsZXgucHJvdG90eXBlW21ldGhvZF0pIER1cGxleC5wcm90b3R5cGVbbWV0aG9kXSA9IFdyaXRhYmxlLnByb3RvdHlwZVttZXRob2RdO1xufVxuXG5mdW5jdGlvbiBEdXBsZXgob3B0aW9ucykge1xuICBpZiAoISh0aGlzIGluc3RhbmNlb2YgRHVwbGV4KSkgcmV0dXJuIG5ldyBEdXBsZXgob3B0aW9ucyk7XG5cbiAgUmVhZGFibGUuY2FsbCh0aGlzLCBvcHRpb25zKTtcbiAgV3JpdGFibGUuY2FsbCh0aGlzLCBvcHRpb25zKTtcblxuICBpZiAob3B0aW9ucyAmJiBvcHRpb25zLnJlYWRhYmxlID09PSBmYWxzZSkgdGhpcy5yZWFkYWJsZSA9IGZhbHNlO1xuXG4gIGlmIChvcHRpb25zICYmIG9wdGlvbnMud3JpdGFibGUgPT09IGZhbHNlKSB0aGlzLndyaXRhYmxlID0gZmFsc2U7XG5cbiAgdGhpcy5hbGxvd0hhbGZPcGVuID0gdHJ1ZTtcbiAgaWYgKG9wdGlvbnMgJiYgb3B0aW9ucy5hbGxvd0hhbGZPcGVuID09PSBmYWxzZSkgdGhpcy5hbGxvd0hhbGZPcGVuID0gZmFsc2U7XG5cbiAgdGhpcy5vbmNlKCdlbmQnLCBvbmVuZCk7XG59XG5cbi8vIHRoZSBuby1oYWxmLW9wZW4gZW5mb3JjZXJcbmZ1bmN0aW9uIG9uZW5kKCkge1xuICAvLyBpZiB3ZSBhbGxvdyBoYWxmLW9wZW4gc3RhdGUsIG9yIGlmIHRoZSB3cml0YWJsZSBzaWRlIGVuZGVkLFxuICAvLyB0aGVuIHdlJ3JlIG9rLlxuICBpZiAodGhpcy5hbGxvd0hhbGZPcGVuIHx8IHRoaXMuX3dyaXRhYmxlU3RhdGUuZW5kZWQpIHJldHVybjtcblxuICAvLyBubyBtb3JlIGRhdGEgY2FuIGJlIHdyaXR0ZW4uXG4gIC8vIEJ1dCBhbGxvdyBtb3JlIHdyaXRlcyB0byBoYXBwZW4gaW4gdGhpcyB0aWNrLlxuICBwcm9jZXNzTmV4dFRpY2sob25FbmROVCwgdGhpcyk7XG59XG5cbmZ1bmN0aW9uIG9uRW5kTlQoc2VsZikge1xuICBzZWxmLmVuZCgpO1xufVxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoRHVwbGV4LnByb3RvdHlwZSwgJ2Rlc3Ryb3llZCcsIHtcbiAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKHRoaXMuX3JlYWRhYmxlU3RhdGUgPT09IHVuZGVmaW5lZCB8fCB0aGlzLl93cml0YWJsZVN0YXRlID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX3JlYWRhYmxlU3RhdGUuZGVzdHJveWVkICYmIHRoaXMuX3dyaXRhYmxlU3RhdGUuZGVzdHJveWVkO1xuICB9LFxuICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgIC8vIHdlIGlnbm9yZSB0aGUgdmFsdWUgaWYgdGhlIHN0cmVhbVxuICAgIC8vIGhhcyBub3QgYmVlbiBpbml0aWFsaXplZCB5ZXRcbiAgICBpZiAodGhpcy5fcmVhZGFibGVTdGF0ZSA9PT0gdW5kZWZpbmVkIHx8IHRoaXMuX3dyaXRhYmxlU3RhdGUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIGJhY2t3YXJkIGNvbXBhdGliaWxpdHksIHRoZSB1c2VyIGlzIGV4cGxpY2l0bHlcbiAgICAvLyBtYW5hZ2luZyBkZXN0cm95ZWRcbiAgICB0aGlzLl9yZWFkYWJsZVN0YXRlLmRlc3Ryb3llZCA9IHZhbHVlO1xuICAgIHRoaXMuX3dyaXRhYmxlU3RhdGUuZGVzdHJveWVkID0gdmFsdWU7XG4gIH1cbn0pO1xuXG5EdXBsZXgucHJvdG90eXBlLl9kZXN0cm95ID0gZnVuY3Rpb24gKGVyciwgY2IpIHtcbiAgdGhpcy5wdXNoKG51bGwpO1xuICB0aGlzLmVuZCgpO1xuXG4gIHByb2Nlc3NOZXh0VGljayhjYiwgZXJyKTtcbn07XG5cbmZ1bmN0aW9uIGZvckVhY2goeHMsIGYpIHtcbiAgZm9yICh2YXIgaSA9IDAsIGwgPSB4cy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICBmKHhzW2ldLCBpKTtcbiAgfVxufSIsIi8vIENvcHlyaWdodCBKb3llbnQsIEluYy4gYW5kIG90aGVyIE5vZGUgY29udHJpYnV0b3JzLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhXG4vLyBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlXG4vLyBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmdcbi8vIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCxcbi8vIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXRcbi8vIHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZVxuLy8gZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWRcbi8vIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1Ncbi8vIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0Zcbi8vIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU5cbi8vIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLFxuLy8gREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SXG4vLyBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFXG4vLyBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuXG4vLyBhIHBhc3N0aHJvdWdoIHN0cmVhbS5cbi8vIGJhc2ljYWxseSBqdXN0IHRoZSBtb3N0IG1pbmltYWwgc29ydCBvZiBUcmFuc2Zvcm0gc3RyZWFtLlxuLy8gRXZlcnkgd3JpdHRlbiBjaHVuayBnZXRzIG91dHB1dCBhcy1pcy5cblxuJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFBhc3NUaHJvdWdoO1xuXG52YXIgVHJhbnNmb3JtID0gcmVxdWlyZSgnLi9fc3RyZWFtX3RyYW5zZm9ybScpO1xuXG4vKjxyZXBsYWNlbWVudD4qL1xudmFyIHV0aWwgPSByZXF1aXJlKCdjb3JlLXV0aWwtaXMnKTtcbnV0aWwuaW5oZXJpdHMgPSByZXF1aXJlKCdpbmhlcml0cycpO1xuLyo8L3JlcGxhY2VtZW50PiovXG5cbnV0aWwuaW5oZXJpdHMoUGFzc1Rocm91Z2gsIFRyYW5zZm9ybSk7XG5cbmZ1bmN0aW9uIFBhc3NUaHJvdWdoKG9wdGlvbnMpIHtcbiAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIFBhc3NUaHJvdWdoKSkgcmV0dXJuIG5ldyBQYXNzVGhyb3VnaChvcHRpb25zKTtcblxuICBUcmFuc2Zvcm0uY2FsbCh0aGlzLCBvcHRpb25zKTtcbn1cblxuUGFzc1Rocm91Z2gucHJvdG90eXBlLl90cmFuc2Zvcm0gPSBmdW5jdGlvbiAoY2h1bmssIGVuY29kaW5nLCBjYikge1xuICBjYihudWxsLCBjaHVuayk7XG59OyIsIi8vIENvcHlyaWdodCBKb3llbnQsIEluYy4gYW5kIG90aGVyIE5vZGUgY29udHJpYnV0b3JzLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhXG4vLyBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlXG4vLyBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmdcbi8vIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCxcbi8vIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXRcbi8vIHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZVxuLy8gZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWRcbi8vIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1Ncbi8vIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0Zcbi8vIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU5cbi8vIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLFxuLy8gREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SXG4vLyBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFXG4vLyBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuXG4ndXNlIHN0cmljdCc7XG5cbi8qPHJlcGxhY2VtZW50PiovXG5cbnZhciBwcm9jZXNzTmV4dFRpY2sgPSByZXF1aXJlKCdwcm9jZXNzLW5leHRpY2stYXJncycpO1xuLyo8L3JlcGxhY2VtZW50PiovXG5cbm1vZHVsZS5leHBvcnRzID0gUmVhZGFibGU7XG5cbi8qPHJlcGxhY2VtZW50PiovXG52YXIgaXNBcnJheSA9IHJlcXVpcmUoJ2lzYXJyYXknKTtcbi8qPC9yZXBsYWNlbWVudD4qL1xuXG4vKjxyZXBsYWNlbWVudD4qL1xudmFyIER1cGxleDtcbi8qPC9yZXBsYWNlbWVudD4qL1xuXG5SZWFkYWJsZS5SZWFkYWJsZVN0YXRlID0gUmVhZGFibGVTdGF0ZTtcblxuLyo8cmVwbGFjZW1lbnQ+Ki9cbnZhciBFRSA9IHJlcXVpcmUoJ2V2ZW50cycpLkV2ZW50RW1pdHRlcjtcblxudmFyIEVFbGlzdGVuZXJDb3VudCA9IGZ1bmN0aW9uIChlbWl0dGVyLCB0eXBlKSB7XG4gIHJldHVybiBlbWl0dGVyLmxpc3RlbmVycyh0eXBlKS5sZW5ndGg7XG59O1xuLyo8L3JlcGxhY2VtZW50PiovXG5cbi8qPHJlcGxhY2VtZW50PiovXG52YXIgU3RyZWFtID0gcmVxdWlyZSgnLi9pbnRlcm5hbC9zdHJlYW1zL3N0cmVhbScpO1xuLyo8L3JlcGxhY2VtZW50PiovXG5cbi8vIFRPRE8oYm1ldXJlcik6IENoYW5nZSB0aGlzIGJhY2sgdG8gY29uc3Qgb25jZSBob2xlIGNoZWNrcyBhcmVcbi8vIHByb3Blcmx5IG9wdGltaXplZCBhd2F5IGVhcmx5IGluIElnbml0aW9uK1R1cmJvRmFuLlxuLyo8cmVwbGFjZW1lbnQ+Ki9cbnZhciBCdWZmZXIgPSByZXF1aXJlKCdzYWZlLWJ1ZmZlcicpLkJ1ZmZlcjtcbnZhciBPdXJVaW50OEFycmF5ID0gZ2xvYmFsLlVpbnQ4QXJyYXkgfHwgZnVuY3Rpb24gKCkge307XG5mdW5jdGlvbiBfdWludDhBcnJheVRvQnVmZmVyKGNodW5rKSB7XG4gIHJldHVybiBCdWZmZXIuZnJvbShjaHVuayk7XG59XG5mdW5jdGlvbiBfaXNVaW50OEFycmF5KG9iaikge1xuICByZXR1cm4gQnVmZmVyLmlzQnVmZmVyKG9iaikgfHwgb2JqIGluc3RhbmNlb2YgT3VyVWludDhBcnJheTtcbn1cbi8qPC9yZXBsYWNlbWVudD4qL1xuXG4vKjxyZXBsYWNlbWVudD4qL1xudmFyIHV0aWwgPSByZXF1aXJlKCdjb3JlLXV0aWwtaXMnKTtcbnV0aWwuaW5oZXJpdHMgPSByZXF1aXJlKCdpbmhlcml0cycpO1xuLyo8L3JlcGxhY2VtZW50PiovXG5cbi8qPHJlcGxhY2VtZW50PiovXG52YXIgZGVidWdVdGlsID0gcmVxdWlyZSgndXRpbCcpO1xudmFyIGRlYnVnID0gdm9pZCAwO1xuaWYgKGRlYnVnVXRpbCAmJiBkZWJ1Z1V0aWwuZGVidWdsb2cpIHtcbiAgZGVidWcgPSBkZWJ1Z1V0aWwuZGVidWdsb2coJ3N0cmVhbScpO1xufSBlbHNlIHtcbiAgZGVidWcgPSBmdW5jdGlvbiAoKSB7fTtcbn1cbi8qPC9yZXBsYWNlbWVudD4qL1xuXG52YXIgQnVmZmVyTGlzdCA9IHJlcXVpcmUoJy4vaW50ZXJuYWwvc3RyZWFtcy9CdWZmZXJMaXN0Jyk7XG52YXIgZGVzdHJveUltcGwgPSByZXF1aXJlKCcuL2ludGVybmFsL3N0cmVhbXMvZGVzdHJveScpO1xudmFyIFN0cmluZ0RlY29kZXI7XG5cbnV0aWwuaW5oZXJpdHMoUmVhZGFibGUsIFN0cmVhbSk7XG5cbnZhciBrUHJveHlFdmVudHMgPSBbJ2Vycm9yJywgJ2Nsb3NlJywgJ2Rlc3Ryb3knLCAncGF1c2UnLCAncmVzdW1lJ107XG5cbmZ1bmN0aW9uIHByZXBlbmRMaXN0ZW5lcihlbWl0dGVyLCBldmVudCwgZm4pIHtcbiAgLy8gU2FkbHkgdGhpcyBpcyBub3QgY2FjaGVhYmxlIGFzIHNvbWUgbGlicmFyaWVzIGJ1bmRsZSB0aGVpciBvd25cbiAgLy8gZXZlbnQgZW1pdHRlciBpbXBsZW1lbnRhdGlvbiB3aXRoIHRoZW0uXG4gIGlmICh0eXBlb2YgZW1pdHRlci5wcmVwZW5kTGlzdGVuZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICByZXR1cm4gZW1pdHRlci5wcmVwZW5kTGlzdGVuZXIoZXZlbnQsIGZuKTtcbiAgfSBlbHNlIHtcbiAgICAvLyBUaGlzIGlzIGEgaGFjayB0byBtYWtlIHN1cmUgdGhhdCBvdXIgZXJyb3IgaGFuZGxlciBpcyBhdHRhY2hlZCBiZWZvcmUgYW55XG4gICAgLy8gdXNlcmxhbmQgb25lcy4gIE5FVkVSIERPIFRISVMuIFRoaXMgaXMgaGVyZSBvbmx5IGJlY2F1c2UgdGhpcyBjb2RlIG5lZWRzXG4gICAgLy8gdG8gY29udGludWUgdG8gd29yayB3aXRoIG9sZGVyIHZlcnNpb25zIG9mIE5vZGUuanMgdGhhdCBkbyBub3QgaW5jbHVkZVxuICAgIC8vIHRoZSBwcmVwZW5kTGlzdGVuZXIoKSBtZXRob2QuIFRoZSBnb2FsIGlzIHRvIGV2ZW50dWFsbHkgcmVtb3ZlIHRoaXMgaGFjay5cbiAgICBpZiAoIWVtaXR0ZXIuX2V2ZW50cyB8fCAhZW1pdHRlci5fZXZlbnRzW2V2ZW50XSkgZW1pdHRlci5vbihldmVudCwgZm4pO2Vsc2UgaWYgKGlzQXJyYXkoZW1pdHRlci5fZXZlbnRzW2V2ZW50XSkpIGVtaXR0ZXIuX2V2ZW50c1tldmVudF0udW5zaGlmdChmbik7ZWxzZSBlbWl0dGVyLl9ldmVudHNbZXZlbnRdID0gW2ZuLCBlbWl0dGVyLl9ldmVudHNbZXZlbnRdXTtcbiAgfVxufVxuXG5mdW5jdGlvbiBSZWFkYWJsZVN0YXRlKG9wdGlvbnMsIHN0cmVhbSkge1xuICBEdXBsZXggPSBEdXBsZXggfHwgcmVxdWlyZSgnLi9fc3RyZWFtX2R1cGxleCcpO1xuXG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG4gIC8vIG9iamVjdCBzdHJlYW0gZmxhZy4gVXNlZCB0byBtYWtlIHJlYWQobikgaWdub3JlIG4gYW5kIHRvXG4gIC8vIG1ha2UgYWxsIHRoZSBidWZmZXIgbWVyZ2luZyBhbmQgbGVuZ3RoIGNoZWNrcyBnbyBhd2F5XG4gIHRoaXMub2JqZWN0TW9kZSA9ICEhb3B0aW9ucy5vYmplY3RNb2RlO1xuXG4gIGlmIChzdHJlYW0gaW5zdGFuY2VvZiBEdXBsZXgpIHRoaXMub2JqZWN0TW9kZSA9IHRoaXMub2JqZWN0TW9kZSB8fCAhIW9wdGlvbnMucmVhZGFibGVPYmplY3RNb2RlO1xuXG4gIC8vIHRoZSBwb2ludCBhdCB3aGljaCBpdCBzdG9wcyBjYWxsaW5nIF9yZWFkKCkgdG8gZmlsbCB0aGUgYnVmZmVyXG4gIC8vIE5vdGU6IDAgaXMgYSB2YWxpZCB2YWx1ZSwgbWVhbnMgXCJkb24ndCBjYWxsIF9yZWFkIHByZWVtcHRpdmVseSBldmVyXCJcbiAgdmFyIGh3bSA9IG9wdGlvbnMuaGlnaFdhdGVyTWFyaztcbiAgdmFyIGRlZmF1bHRId20gPSB0aGlzLm9iamVjdE1vZGUgPyAxNiA6IDE2ICogMTAyNDtcbiAgdGhpcy5oaWdoV2F0ZXJNYXJrID0gaHdtIHx8IGh3bSA9PT0gMCA/IGh3bSA6IGRlZmF1bHRId207XG5cbiAgLy8gY2FzdCB0byBpbnRzLlxuICB0aGlzLmhpZ2hXYXRlck1hcmsgPSBNYXRoLmZsb29yKHRoaXMuaGlnaFdhdGVyTWFyayk7XG5cbiAgLy8gQSBsaW5rZWQgbGlzdCBpcyB1c2VkIHRvIHN0b3JlIGRhdGEgY2h1bmtzIGluc3RlYWQgb2YgYW4gYXJyYXkgYmVjYXVzZSB0aGVcbiAgLy8gbGlua2VkIGxpc3QgY2FuIHJlbW92ZSBlbGVtZW50cyBmcm9tIHRoZSBiZWdpbm5pbmcgZmFzdGVyIHRoYW5cbiAgLy8gYXJyYXkuc2hpZnQoKVxuICB0aGlzLmJ1ZmZlciA9IG5ldyBCdWZmZXJMaXN0KCk7XG4gIHRoaXMubGVuZ3RoID0gMDtcbiAgdGhpcy5waXBlcyA9IG51bGw7XG4gIHRoaXMucGlwZXNDb3VudCA9IDA7XG4gIHRoaXMuZmxvd2luZyA9IG51bGw7XG4gIHRoaXMuZW5kZWQgPSBmYWxzZTtcbiAgdGhpcy5lbmRFbWl0dGVkID0gZmFsc2U7XG4gIHRoaXMucmVhZGluZyA9IGZhbHNlO1xuXG4gIC8vIGEgZmxhZyB0byBiZSBhYmxlIHRvIHRlbGwgaWYgdGhlIGV2ZW50ICdyZWFkYWJsZScvJ2RhdGEnIGlzIGVtaXR0ZWRcbiAgLy8gaW1tZWRpYXRlbHksIG9yIG9uIGEgbGF0ZXIgdGljay4gIFdlIHNldCB0aGlzIHRvIHRydWUgYXQgZmlyc3QsIGJlY2F1c2VcbiAgLy8gYW55IGFjdGlvbnMgdGhhdCBzaG91bGRuJ3QgaGFwcGVuIHVudGlsIFwibGF0ZXJcIiBzaG91bGQgZ2VuZXJhbGx5IGFsc29cbiAgLy8gbm90IGhhcHBlbiBiZWZvcmUgdGhlIGZpcnN0IHJlYWQgY2FsbC5cbiAgdGhpcy5zeW5jID0gdHJ1ZTtcblxuICAvLyB3aGVuZXZlciB3ZSByZXR1cm4gbnVsbCwgdGhlbiB3ZSBzZXQgYSBmbGFnIHRvIHNheVxuICAvLyB0aGF0IHdlJ3JlIGF3YWl0aW5nIGEgJ3JlYWRhYmxlJyBldmVudCBlbWlzc2lvbi5cbiAgdGhpcy5uZWVkUmVhZGFibGUgPSBmYWxzZTtcbiAgdGhpcy5lbWl0dGVkUmVhZGFibGUgPSBmYWxzZTtcbiAgdGhpcy5yZWFkYWJsZUxpc3RlbmluZyA9IGZhbHNlO1xuICB0aGlzLnJlc3VtZVNjaGVkdWxlZCA9IGZhbHNlO1xuXG4gIC8vIGhhcyBpdCBiZWVuIGRlc3Ryb3llZFxuICB0aGlzLmRlc3Ryb3llZCA9IGZhbHNlO1xuXG4gIC8vIENyeXB0byBpcyBraW5kIG9mIG9sZCBhbmQgY3J1c3R5LiAgSGlzdG9yaWNhbGx5LCBpdHMgZGVmYXVsdCBzdHJpbmdcbiAgLy8gZW5jb2RpbmcgaXMgJ2JpbmFyeScgc28gd2UgaGF2ZSB0byBtYWtlIHRoaXMgY29uZmlndXJhYmxlLlxuICAvLyBFdmVyeXRoaW5nIGVsc2UgaW4gdGhlIHVuaXZlcnNlIHVzZXMgJ3V0ZjgnLCB0aG91Z2guXG4gIHRoaXMuZGVmYXVsdEVuY29kaW5nID0gb3B0aW9ucy5kZWZhdWx0RW5jb2RpbmcgfHwgJ3V0ZjgnO1xuXG4gIC8vIHRoZSBudW1iZXIgb2Ygd3JpdGVycyB0aGF0IGFyZSBhd2FpdGluZyBhIGRyYWluIGV2ZW50IGluIC5waXBlKClzXG4gIHRoaXMuYXdhaXREcmFpbiA9IDA7XG5cbiAgLy8gaWYgdHJ1ZSwgYSBtYXliZVJlYWRNb3JlIGhhcyBiZWVuIHNjaGVkdWxlZFxuICB0aGlzLnJlYWRpbmdNb3JlID0gZmFsc2U7XG5cbiAgdGhpcy5kZWNvZGVyID0gbnVsbDtcbiAgdGhpcy5lbmNvZGluZyA9IG51bGw7XG4gIGlmIChvcHRpb25zLmVuY29kaW5nKSB7XG4gICAgaWYgKCFTdHJpbmdEZWNvZGVyKSBTdHJpbmdEZWNvZGVyID0gcmVxdWlyZSgnc3RyaW5nX2RlY29kZXIvJykuU3RyaW5nRGVjb2RlcjtcbiAgICB0aGlzLmRlY29kZXIgPSBuZXcgU3RyaW5nRGVjb2RlcihvcHRpb25zLmVuY29kaW5nKTtcbiAgICB0aGlzLmVuY29kaW5nID0gb3B0aW9ucy5lbmNvZGluZztcbiAgfVxufVxuXG5mdW5jdGlvbiBSZWFkYWJsZShvcHRpb25zKSB7XG4gIER1cGxleCA9IER1cGxleCB8fCByZXF1aXJlKCcuL19zdHJlYW1fZHVwbGV4Jyk7XG5cbiAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIFJlYWRhYmxlKSkgcmV0dXJuIG5ldyBSZWFkYWJsZShvcHRpb25zKTtcblxuICB0aGlzLl9yZWFkYWJsZVN0YXRlID0gbmV3IFJlYWRhYmxlU3RhdGUob3B0aW9ucywgdGhpcyk7XG5cbiAgLy8gbGVnYWN5XG4gIHRoaXMucmVhZGFibGUgPSB0cnVlO1xuXG4gIGlmIChvcHRpb25zKSB7XG4gICAgaWYgKHR5cGVvZiBvcHRpb25zLnJlYWQgPT09ICdmdW5jdGlvbicpIHRoaXMuX3JlYWQgPSBvcHRpb25zLnJlYWQ7XG5cbiAgICBpZiAodHlwZW9mIG9wdGlvbnMuZGVzdHJveSA9PT0gJ2Z1bmN0aW9uJykgdGhpcy5fZGVzdHJveSA9IG9wdGlvbnMuZGVzdHJveTtcbiAgfVxuXG4gIFN0cmVhbS5jYWxsKHRoaXMpO1xufVxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoUmVhZGFibGUucHJvdG90eXBlLCAnZGVzdHJveWVkJywge1xuICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAodGhpcy5fcmVhZGFibGVTdGF0ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLl9yZWFkYWJsZVN0YXRlLmRlc3Ryb3llZDtcbiAgfSxcbiAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAvLyB3ZSBpZ25vcmUgdGhlIHZhbHVlIGlmIHRoZSBzdHJlYW1cbiAgICAvLyBoYXMgbm90IGJlZW4gaW5pdGlhbGl6ZWQgeWV0XG4gICAgaWYgKCF0aGlzLl9yZWFkYWJsZVN0YXRlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gYmFja3dhcmQgY29tcGF0aWJpbGl0eSwgdGhlIHVzZXIgaXMgZXhwbGljaXRseVxuICAgIC8vIG1hbmFnaW5nIGRlc3Ryb3llZFxuICAgIHRoaXMuX3JlYWRhYmxlU3RhdGUuZGVzdHJveWVkID0gdmFsdWU7XG4gIH1cbn0pO1xuXG5SZWFkYWJsZS5wcm90b3R5cGUuZGVzdHJveSA9IGRlc3Ryb3lJbXBsLmRlc3Ryb3k7XG5SZWFkYWJsZS5wcm90b3R5cGUuX3VuZGVzdHJveSA9IGRlc3Ryb3lJbXBsLnVuZGVzdHJveTtcblJlYWRhYmxlLnByb3RvdHlwZS5fZGVzdHJveSA9IGZ1bmN0aW9uIChlcnIsIGNiKSB7XG4gIHRoaXMucHVzaChudWxsKTtcbiAgY2IoZXJyKTtcbn07XG5cbi8vIE1hbnVhbGx5IHNob3ZlIHNvbWV0aGluZyBpbnRvIHRoZSByZWFkKCkgYnVmZmVyLlxuLy8gVGhpcyByZXR1cm5zIHRydWUgaWYgdGhlIGhpZ2hXYXRlck1hcmsgaGFzIG5vdCBiZWVuIGhpdCB5ZXQsXG4vLyBzaW1pbGFyIHRvIGhvdyBXcml0YWJsZS53cml0ZSgpIHJldHVybnMgdHJ1ZSBpZiB5b3Ugc2hvdWxkXG4vLyB3cml0ZSgpIHNvbWUgbW9yZS5cblJlYWRhYmxlLnByb3RvdHlwZS5wdXNoID0gZnVuY3Rpb24gKGNodW5rLCBlbmNvZGluZykge1xuICB2YXIgc3RhdGUgPSB0aGlzLl9yZWFkYWJsZVN0YXRlO1xuICB2YXIgc2tpcENodW5rQ2hlY2s7XG5cbiAgaWYgKCFzdGF0ZS5vYmplY3RNb2RlKSB7XG4gICAgaWYgKHR5cGVvZiBjaHVuayA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGVuY29kaW5nID0gZW5jb2RpbmcgfHwgc3RhdGUuZGVmYXVsdEVuY29kaW5nO1xuICAgICAgaWYgKGVuY29kaW5nICE9PSBzdGF0ZS5lbmNvZGluZykge1xuICAgICAgICBjaHVuayA9IEJ1ZmZlci5mcm9tKGNodW5rLCBlbmNvZGluZyk7XG4gICAgICAgIGVuY29kaW5nID0gJyc7XG4gICAgICB9XG4gICAgICBza2lwQ2h1bmtDaGVjayA9IHRydWU7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHNraXBDaHVua0NoZWNrID0gdHJ1ZTtcbiAgfVxuXG4gIHJldHVybiByZWFkYWJsZUFkZENodW5rKHRoaXMsIGNodW5rLCBlbmNvZGluZywgZmFsc2UsIHNraXBDaHVua0NoZWNrKTtcbn07XG5cbi8vIFVuc2hpZnQgc2hvdWxkICphbHdheXMqIGJlIHNvbWV0aGluZyBkaXJlY3RseSBvdXQgb2YgcmVhZCgpXG5SZWFkYWJsZS5wcm90b3R5cGUudW5zaGlmdCA9IGZ1bmN0aW9uIChjaHVuaykge1xuICByZXR1cm4gcmVhZGFibGVBZGRDaHVuayh0aGlzLCBjaHVuaywgbnVsbCwgdHJ1ZSwgZmFsc2UpO1xufTtcblxuZnVuY3Rpb24gcmVhZGFibGVBZGRDaHVuayhzdHJlYW0sIGNodW5rLCBlbmNvZGluZywgYWRkVG9Gcm9udCwgc2tpcENodW5rQ2hlY2spIHtcbiAgdmFyIHN0YXRlID0gc3RyZWFtLl9yZWFkYWJsZVN0YXRlO1xuICBpZiAoY2h1bmsgPT09IG51bGwpIHtcbiAgICBzdGF0ZS5yZWFkaW5nID0gZmFsc2U7XG4gICAgb25Fb2ZDaHVuayhzdHJlYW0sIHN0YXRlKTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgZXI7XG4gICAgaWYgKCFza2lwQ2h1bmtDaGVjaykgZXIgPSBjaHVua0ludmFsaWQoc3RhdGUsIGNodW5rKTtcbiAgICBpZiAoZXIpIHtcbiAgICAgIHN0cmVhbS5lbWl0KCdlcnJvcicsIGVyKTtcbiAgICB9IGVsc2UgaWYgKHN0YXRlLm9iamVjdE1vZGUgfHwgY2h1bmsgJiYgY2h1bmsubGVuZ3RoID4gMCkge1xuICAgICAgaWYgKHR5cGVvZiBjaHVuayAhPT0gJ3N0cmluZycgJiYgIXN0YXRlLm9iamVjdE1vZGUgJiYgT2JqZWN0LmdldFByb3RvdHlwZU9mKGNodW5rKSAhPT0gQnVmZmVyLnByb3RvdHlwZSkge1xuICAgICAgICBjaHVuayA9IF91aW50OEFycmF5VG9CdWZmZXIoY2h1bmspO1xuICAgICAgfVxuXG4gICAgICBpZiAoYWRkVG9Gcm9udCkge1xuICAgICAgICBpZiAoc3RhdGUuZW5kRW1pdHRlZCkgc3RyZWFtLmVtaXQoJ2Vycm9yJywgbmV3IEVycm9yKCdzdHJlYW0udW5zaGlmdCgpIGFmdGVyIGVuZCBldmVudCcpKTtlbHNlIGFkZENodW5rKHN0cmVhbSwgc3RhdGUsIGNodW5rLCB0cnVlKTtcbiAgICAgIH0gZWxzZSBpZiAoc3RhdGUuZW5kZWQpIHtcbiAgICAgICAgc3RyZWFtLmVtaXQoJ2Vycm9yJywgbmV3IEVycm9yKCdzdHJlYW0ucHVzaCgpIGFmdGVyIEVPRicpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHN0YXRlLnJlYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgaWYgKHN0YXRlLmRlY29kZXIgJiYgIWVuY29kaW5nKSB7XG4gICAgICAgICAgY2h1bmsgPSBzdGF0ZS5kZWNvZGVyLndyaXRlKGNodW5rKTtcbiAgICAgICAgICBpZiAoc3RhdGUub2JqZWN0TW9kZSB8fCBjaHVuay5sZW5ndGggIT09IDApIGFkZENodW5rKHN0cmVhbSwgc3RhdGUsIGNodW5rLCBmYWxzZSk7ZWxzZSBtYXliZVJlYWRNb3JlKHN0cmVhbSwgc3RhdGUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGFkZENodW5rKHN0cmVhbSwgc3RhdGUsIGNodW5rLCBmYWxzZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKCFhZGRUb0Zyb250KSB7XG4gICAgICBzdGF0ZS5yZWFkaW5nID0gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG5lZWRNb3JlRGF0YShzdGF0ZSk7XG59XG5cbmZ1bmN0aW9uIGFkZENodW5rKHN0cmVhbSwgc3RhdGUsIGNodW5rLCBhZGRUb0Zyb250KSB7XG4gIGlmIChzdGF0ZS5mbG93aW5nICYmIHN0YXRlLmxlbmd0aCA9PT0gMCAmJiAhc3RhdGUuc3luYykge1xuICAgIHN0cmVhbS5lbWl0KCdkYXRhJywgY2h1bmspO1xuICAgIHN0cmVhbS5yZWFkKDApO1xuICB9IGVsc2Uge1xuICAgIC8vIHVwZGF0ZSB0aGUgYnVmZmVyIGluZm8uXG4gICAgc3RhdGUubGVuZ3RoICs9IHN0YXRlLm9iamVjdE1vZGUgPyAxIDogY2h1bmsubGVuZ3RoO1xuICAgIGlmIChhZGRUb0Zyb250KSBzdGF0ZS5idWZmZXIudW5zaGlmdChjaHVuayk7ZWxzZSBzdGF0ZS5idWZmZXIucHVzaChjaHVuayk7XG5cbiAgICBpZiAoc3RhdGUubmVlZFJlYWRhYmxlKSBlbWl0UmVhZGFibGUoc3RyZWFtKTtcbiAgfVxuICBtYXliZVJlYWRNb3JlKHN0cmVhbSwgc3RhdGUpO1xufVxuXG5mdW5jdGlvbiBjaHVua0ludmFsaWQoc3RhdGUsIGNodW5rKSB7XG4gIHZhciBlcjtcbiAgaWYgKCFfaXNVaW50OEFycmF5KGNodW5rKSAmJiB0eXBlb2YgY2h1bmsgIT09ICdzdHJpbmcnICYmIGNodW5rICE9PSB1bmRlZmluZWQgJiYgIXN0YXRlLm9iamVjdE1vZGUpIHtcbiAgICBlciA9IG5ldyBUeXBlRXJyb3IoJ0ludmFsaWQgbm9uLXN0cmluZy9idWZmZXIgY2h1bmsnKTtcbiAgfVxuICByZXR1cm4gZXI7XG59XG5cbi8vIGlmIGl0J3MgcGFzdCB0aGUgaGlnaCB3YXRlciBtYXJrLCB3ZSBjYW4gcHVzaCBpbiBzb21lIG1vcmUuXG4vLyBBbHNvLCBpZiB3ZSBoYXZlIG5vIGRhdGEgeWV0LCB3ZSBjYW4gc3RhbmQgc29tZVxuLy8gbW9yZSBieXRlcy4gIFRoaXMgaXMgdG8gd29yayBhcm91bmQgY2FzZXMgd2hlcmUgaHdtPTAsXG4vLyBzdWNoIGFzIHRoZSByZXBsLiAgQWxzbywgaWYgdGhlIHB1c2goKSB0cmlnZ2VyZWQgYVxuLy8gcmVhZGFibGUgZXZlbnQsIGFuZCB0aGUgdXNlciBjYWxsZWQgcmVhZChsYXJnZU51bWJlcikgc3VjaCB0aGF0XG4vLyBuZWVkUmVhZGFibGUgd2FzIHNldCwgdGhlbiB3ZSBvdWdodCB0byBwdXNoIG1vcmUsIHNvIHRoYXQgYW5vdGhlclxuLy8gJ3JlYWRhYmxlJyBldmVudCB3aWxsIGJlIHRyaWdnZXJlZC5cbmZ1bmN0aW9uIG5lZWRNb3JlRGF0YShzdGF0ZSkge1xuICByZXR1cm4gIXN0YXRlLmVuZGVkICYmIChzdGF0ZS5uZWVkUmVhZGFibGUgfHwgc3RhdGUubGVuZ3RoIDwgc3RhdGUuaGlnaFdhdGVyTWFyayB8fCBzdGF0ZS5sZW5ndGggPT09IDApO1xufVxuXG5SZWFkYWJsZS5wcm90b3R5cGUuaXNQYXVzZWQgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiB0aGlzLl9yZWFkYWJsZVN0YXRlLmZsb3dpbmcgPT09IGZhbHNlO1xufTtcblxuLy8gYmFja3dhcmRzIGNvbXBhdGliaWxpdHkuXG5SZWFkYWJsZS5wcm90b3R5cGUuc2V0RW5jb2RpbmcgPSBmdW5jdGlvbiAoZW5jKSB7XG4gIGlmICghU3RyaW5nRGVjb2RlcikgU3RyaW5nRGVjb2RlciA9IHJlcXVpcmUoJ3N0cmluZ19kZWNvZGVyLycpLlN0cmluZ0RlY29kZXI7XG4gIHRoaXMuX3JlYWRhYmxlU3RhdGUuZGVjb2RlciA9IG5ldyBTdHJpbmdEZWNvZGVyKGVuYyk7XG4gIHRoaXMuX3JlYWRhYmxlU3RhdGUuZW5jb2RpbmcgPSBlbmM7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLy8gRG9uJ3QgcmFpc2UgdGhlIGh3bSA+IDhNQlxudmFyIE1BWF9IV00gPSAweDgwMDAwMDtcbmZ1bmN0aW9uIGNvbXB1dGVOZXdIaWdoV2F0ZXJNYXJrKG4pIHtcbiAgaWYgKG4gPj0gTUFYX0hXTSkge1xuICAgIG4gPSBNQVhfSFdNO1xuICB9IGVsc2Uge1xuICAgIC8vIEdldCB0aGUgbmV4dCBoaWdoZXN0IHBvd2VyIG9mIDIgdG8gcHJldmVudCBpbmNyZWFzaW5nIGh3bSBleGNlc3NpdmVseSBpblxuICAgIC8vIHRpbnkgYW1vdW50c1xuICAgIG4tLTtcbiAgICBuIHw9IG4gPj4+IDE7XG4gICAgbiB8PSBuID4+PiAyO1xuICAgIG4gfD0gbiA+Pj4gNDtcbiAgICBuIHw9IG4gPj4+IDg7XG4gICAgbiB8PSBuID4+PiAxNjtcbiAgICBuKys7XG4gIH1cbiAgcmV0dXJuIG47XG59XG5cbi8vIFRoaXMgZnVuY3Rpb24gaXMgZGVzaWduZWQgdG8gYmUgaW5saW5hYmxlLCBzbyBwbGVhc2UgdGFrZSBjYXJlIHdoZW4gbWFraW5nXG4vLyBjaGFuZ2VzIHRvIHRoZSBmdW5jdGlvbiBib2R5LlxuZnVuY3Rpb24gaG93TXVjaFRvUmVhZChuLCBzdGF0ZSkge1xuICBpZiAobiA8PSAwIHx8IHN0YXRlLmxlbmd0aCA9PT0gMCAmJiBzdGF0ZS5lbmRlZCkgcmV0dXJuIDA7XG4gIGlmIChzdGF0ZS5vYmplY3RNb2RlKSByZXR1cm4gMTtcbiAgaWYgKG4gIT09IG4pIHtcbiAgICAvLyBPbmx5IGZsb3cgb25lIGJ1ZmZlciBhdCBhIHRpbWVcbiAgICBpZiAoc3RhdGUuZmxvd2luZyAmJiBzdGF0ZS5sZW5ndGgpIHJldHVybiBzdGF0ZS5idWZmZXIuaGVhZC5kYXRhLmxlbmd0aDtlbHNlIHJldHVybiBzdGF0ZS5sZW5ndGg7XG4gIH1cbiAgLy8gSWYgd2UncmUgYXNraW5nIGZvciBtb3JlIHRoYW4gdGhlIGN1cnJlbnQgaHdtLCB0aGVuIHJhaXNlIHRoZSBod20uXG4gIGlmIChuID4gc3RhdGUuaGlnaFdhdGVyTWFyaykgc3RhdGUuaGlnaFdhdGVyTWFyayA9IGNvbXB1dGVOZXdIaWdoV2F0ZXJNYXJrKG4pO1xuICBpZiAobiA8PSBzdGF0ZS5sZW5ndGgpIHJldHVybiBuO1xuICAvLyBEb24ndCBoYXZlIGVub3VnaFxuICBpZiAoIXN0YXRlLmVuZGVkKSB7XG4gICAgc3RhdGUubmVlZFJlYWRhYmxlID0gdHJ1ZTtcbiAgICByZXR1cm4gMDtcbiAgfVxuICByZXR1cm4gc3RhdGUubGVuZ3RoO1xufVxuXG4vLyB5b3UgY2FuIG92ZXJyaWRlIGVpdGhlciB0aGlzIG1ldGhvZCwgb3IgdGhlIGFzeW5jIF9yZWFkKG4pIGJlbG93LlxuUmVhZGFibGUucHJvdG90eXBlLnJlYWQgPSBmdW5jdGlvbiAobikge1xuICBkZWJ1ZygncmVhZCcsIG4pO1xuICBuID0gcGFyc2VJbnQobiwgMTApO1xuICB2YXIgc3RhdGUgPSB0aGlzLl9yZWFkYWJsZVN0YXRlO1xuICB2YXIgbk9yaWcgPSBuO1xuXG4gIGlmIChuICE9PSAwKSBzdGF0ZS5lbWl0dGVkUmVhZGFibGUgPSBmYWxzZTtcblxuICAvLyBpZiB3ZSdyZSBkb2luZyByZWFkKDApIHRvIHRyaWdnZXIgYSByZWFkYWJsZSBldmVudCwgYnV0IHdlXG4gIC8vIGFscmVhZHkgaGF2ZSBhIGJ1bmNoIG9mIGRhdGEgaW4gdGhlIGJ1ZmZlciwgdGhlbiBqdXN0IHRyaWdnZXJcbiAgLy8gdGhlICdyZWFkYWJsZScgZXZlbnQgYW5kIG1vdmUgb24uXG4gIGlmIChuID09PSAwICYmIHN0YXRlLm5lZWRSZWFkYWJsZSAmJiAoc3RhdGUubGVuZ3RoID49IHN0YXRlLmhpZ2hXYXRlck1hcmsgfHwgc3RhdGUuZW5kZWQpKSB7XG4gICAgZGVidWcoJ3JlYWQ6IGVtaXRSZWFkYWJsZScsIHN0YXRlLmxlbmd0aCwgc3RhdGUuZW5kZWQpO1xuICAgIGlmIChzdGF0ZS5sZW5ndGggPT09IDAgJiYgc3RhdGUuZW5kZWQpIGVuZFJlYWRhYmxlKHRoaXMpO2Vsc2UgZW1pdFJlYWRhYmxlKHRoaXMpO1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgbiA9IGhvd011Y2hUb1JlYWQobiwgc3RhdGUpO1xuXG4gIC8vIGlmIHdlJ3ZlIGVuZGVkLCBhbmQgd2UncmUgbm93IGNsZWFyLCB0aGVuIGZpbmlzaCBpdCB1cC5cbiAgaWYgKG4gPT09IDAgJiYgc3RhdGUuZW5kZWQpIHtcbiAgICBpZiAoc3RhdGUubGVuZ3RoID09PSAwKSBlbmRSZWFkYWJsZSh0aGlzKTtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIC8vIEFsbCB0aGUgYWN0dWFsIGNodW5rIGdlbmVyYXRpb24gbG9naWMgbmVlZHMgdG8gYmVcbiAgLy8gKmJlbG93KiB0aGUgY2FsbCB0byBfcmVhZC4gIFRoZSByZWFzb24gaXMgdGhhdCBpbiBjZXJ0YWluXG4gIC8vIHN5bnRoZXRpYyBzdHJlYW0gY2FzZXMsIHN1Y2ggYXMgcGFzc3Rocm91Z2ggc3RyZWFtcywgX3JlYWRcbiAgLy8gbWF5IGJlIGEgY29tcGxldGVseSBzeW5jaHJvbm91cyBvcGVyYXRpb24gd2hpY2ggbWF5IGNoYW5nZVxuICAvLyB0aGUgc3RhdGUgb2YgdGhlIHJlYWQgYnVmZmVyLCBwcm92aWRpbmcgZW5vdWdoIGRhdGEgd2hlblxuICAvLyBiZWZvcmUgdGhlcmUgd2FzICpub3QqIGVub3VnaC5cbiAgLy9cbiAgLy8gU28sIHRoZSBzdGVwcyBhcmU6XG4gIC8vIDEuIEZpZ3VyZSBvdXQgd2hhdCB0aGUgc3RhdGUgb2YgdGhpbmdzIHdpbGwgYmUgYWZ0ZXIgd2UgZG9cbiAgLy8gYSByZWFkIGZyb20gdGhlIGJ1ZmZlci5cbiAgLy9cbiAgLy8gMi4gSWYgdGhhdCByZXN1bHRpbmcgc3RhdGUgd2lsbCB0cmlnZ2VyIGEgX3JlYWQsIHRoZW4gY2FsbCBfcmVhZC5cbiAgLy8gTm90ZSB0aGF0IHRoaXMgbWF5IGJlIGFzeW5jaHJvbm91cywgb3Igc3luY2hyb25vdXMuICBZZXMsIGl0IGlzXG4gIC8vIGRlZXBseSB1Z2x5IHRvIHdyaXRlIEFQSXMgdGhpcyB3YXksIGJ1dCB0aGF0IHN0aWxsIGRvZXNuJ3QgbWVhblxuICAvLyB0aGF0IHRoZSBSZWFkYWJsZSBjbGFzcyBzaG91bGQgYmVoYXZlIGltcHJvcGVybHksIGFzIHN0cmVhbXMgYXJlXG4gIC8vIGRlc2lnbmVkIHRvIGJlIHN5bmMvYXN5bmMgYWdub3N0aWMuXG4gIC8vIFRha2Ugbm90ZSBpZiB0aGUgX3JlYWQgY2FsbCBpcyBzeW5jIG9yIGFzeW5jIChpZSwgaWYgdGhlIHJlYWQgY2FsbFxuICAvLyBoYXMgcmV0dXJuZWQgeWV0KSwgc28gdGhhdCB3ZSBrbm93IHdoZXRoZXIgb3Igbm90IGl0J3Mgc2FmZSB0byBlbWl0XG4gIC8vICdyZWFkYWJsZScgZXRjLlxuICAvL1xuICAvLyAzLiBBY3R1YWxseSBwdWxsIHRoZSByZXF1ZXN0ZWQgY2h1bmtzIG91dCBvZiB0aGUgYnVmZmVyIGFuZCByZXR1cm4uXG5cbiAgLy8gaWYgd2UgbmVlZCBhIHJlYWRhYmxlIGV2ZW50LCB0aGVuIHdlIG5lZWQgdG8gZG8gc29tZSByZWFkaW5nLlxuICB2YXIgZG9SZWFkID0gc3RhdGUubmVlZFJlYWRhYmxlO1xuICBkZWJ1ZygnbmVlZCByZWFkYWJsZScsIGRvUmVhZCk7XG5cbiAgLy8gaWYgd2UgY3VycmVudGx5IGhhdmUgbGVzcyB0aGFuIHRoZSBoaWdoV2F0ZXJNYXJrLCB0aGVuIGFsc28gcmVhZCBzb21lXG4gIGlmIChzdGF0ZS5sZW5ndGggPT09IDAgfHwgc3RhdGUubGVuZ3RoIC0gbiA8IHN0YXRlLmhpZ2hXYXRlck1hcmspIHtcbiAgICBkb1JlYWQgPSB0cnVlO1xuICAgIGRlYnVnKCdsZW5ndGggbGVzcyB0aGFuIHdhdGVybWFyaycsIGRvUmVhZCk7XG4gIH1cblxuICAvLyBob3dldmVyLCBpZiB3ZSd2ZSBlbmRlZCwgdGhlbiB0aGVyZSdzIG5vIHBvaW50LCBhbmQgaWYgd2UncmUgYWxyZWFkeVxuICAvLyByZWFkaW5nLCB0aGVuIGl0J3MgdW5uZWNlc3NhcnkuXG4gIGlmIChzdGF0ZS5lbmRlZCB8fCBzdGF0ZS5yZWFkaW5nKSB7XG4gICAgZG9SZWFkID0gZmFsc2U7XG4gICAgZGVidWcoJ3JlYWRpbmcgb3IgZW5kZWQnLCBkb1JlYWQpO1xuICB9IGVsc2UgaWYgKGRvUmVhZCkge1xuICAgIGRlYnVnKCdkbyByZWFkJyk7XG4gICAgc3RhdGUucmVhZGluZyA9IHRydWU7XG4gICAgc3RhdGUuc3luYyA9IHRydWU7XG4gICAgLy8gaWYgdGhlIGxlbmd0aCBpcyBjdXJyZW50bHkgemVybywgdGhlbiB3ZSAqbmVlZCogYSByZWFkYWJsZSBldmVudC5cbiAgICBpZiAoc3RhdGUubGVuZ3RoID09PSAwKSBzdGF0ZS5uZWVkUmVhZGFibGUgPSB0cnVlO1xuICAgIC8vIGNhbGwgaW50ZXJuYWwgcmVhZCBtZXRob2RcbiAgICB0aGlzLl9yZWFkKHN0YXRlLmhpZ2hXYXRlck1hcmspO1xuICAgIHN0YXRlLnN5bmMgPSBmYWxzZTtcbiAgICAvLyBJZiBfcmVhZCBwdXNoZWQgZGF0YSBzeW5jaHJvbm91c2x5LCB0aGVuIGByZWFkaW5nYCB3aWxsIGJlIGZhbHNlLFxuICAgIC8vIGFuZCB3ZSBuZWVkIHRvIHJlLWV2YWx1YXRlIGhvdyBtdWNoIGRhdGEgd2UgY2FuIHJldHVybiB0byB0aGUgdXNlci5cbiAgICBpZiAoIXN0YXRlLnJlYWRpbmcpIG4gPSBob3dNdWNoVG9SZWFkKG5PcmlnLCBzdGF0ZSk7XG4gIH1cblxuICB2YXIgcmV0O1xuICBpZiAobiA+IDApIHJldCA9IGZyb21MaXN0KG4sIHN0YXRlKTtlbHNlIHJldCA9IG51bGw7XG5cbiAgaWYgKHJldCA9PT0gbnVsbCkge1xuICAgIHN0YXRlLm5lZWRSZWFkYWJsZSA9IHRydWU7XG4gICAgbiA9IDA7XG4gIH0gZWxzZSB7XG4gICAgc3RhdGUubGVuZ3RoIC09IG47XG4gIH1cblxuICBpZiAoc3RhdGUubGVuZ3RoID09PSAwKSB7XG4gICAgLy8gSWYgd2UgaGF2ZSBub3RoaW5nIGluIHRoZSBidWZmZXIsIHRoZW4gd2Ugd2FudCB0byBrbm93XG4gICAgLy8gYXMgc29vbiBhcyB3ZSAqZG8qIGdldCBzb21ldGhpbmcgaW50byB0aGUgYnVmZmVyLlxuICAgIGlmICghc3RhdGUuZW5kZWQpIHN0YXRlLm5lZWRSZWFkYWJsZSA9IHRydWU7XG5cbiAgICAvLyBJZiB3ZSB0cmllZCB0byByZWFkKCkgcGFzdCB0aGUgRU9GLCB0aGVuIGVtaXQgZW5kIG9uIHRoZSBuZXh0IHRpY2suXG4gICAgaWYgKG5PcmlnICE9PSBuICYmIHN0YXRlLmVuZGVkKSBlbmRSZWFkYWJsZSh0aGlzKTtcbiAgfVxuXG4gIGlmIChyZXQgIT09IG51bGwpIHRoaXMuZW1pdCgnZGF0YScsIHJldCk7XG5cbiAgcmV0dXJuIHJldDtcbn07XG5cbmZ1bmN0aW9uIG9uRW9mQ2h1bmsoc3RyZWFtLCBzdGF0ZSkge1xuICBpZiAoc3RhdGUuZW5kZWQpIHJldHVybjtcbiAgaWYgKHN0YXRlLmRlY29kZXIpIHtcbiAgICB2YXIgY2h1bmsgPSBzdGF0ZS5kZWNvZGVyLmVuZCgpO1xuICAgIGlmIChjaHVuayAmJiBjaHVuay5sZW5ndGgpIHtcbiAgICAgIHN0YXRlLmJ1ZmZlci5wdXNoKGNodW5rKTtcbiAgICAgIHN0YXRlLmxlbmd0aCArPSBzdGF0ZS5vYmplY3RNb2RlID8gMSA6IGNodW5rLmxlbmd0aDtcbiAgICB9XG4gIH1cbiAgc3RhdGUuZW5kZWQgPSB0cnVlO1xuXG4gIC8vIGVtaXQgJ3JlYWRhYmxlJyBub3cgdG8gbWFrZSBzdXJlIGl0IGdldHMgcGlja2VkIHVwLlxuICBlbWl0UmVhZGFibGUoc3RyZWFtKTtcbn1cblxuLy8gRG9uJ3QgZW1pdCByZWFkYWJsZSByaWdodCBhd2F5IGluIHN5bmMgbW9kZSwgYmVjYXVzZSB0aGlzIGNhbiB0cmlnZ2VyXG4vLyBhbm90aGVyIHJlYWQoKSBjYWxsID0+IHN0YWNrIG92ZXJmbG93LiAgVGhpcyB3YXksIGl0IG1pZ2h0IHRyaWdnZXJcbi8vIGEgbmV4dFRpY2sgcmVjdXJzaW9uIHdhcm5pbmcsIGJ1dCB0aGF0J3Mgbm90IHNvIGJhZC5cbmZ1bmN0aW9uIGVtaXRSZWFkYWJsZShzdHJlYW0pIHtcbiAgdmFyIHN0YXRlID0gc3RyZWFtLl9yZWFkYWJsZVN0YXRlO1xuICBzdGF0ZS5uZWVkUmVhZGFibGUgPSBmYWxzZTtcbiAgaWYgKCFzdGF0ZS5lbWl0dGVkUmVhZGFibGUpIHtcbiAgICBkZWJ1ZygnZW1pdFJlYWRhYmxlJywgc3RhdGUuZmxvd2luZyk7XG4gICAgc3RhdGUuZW1pdHRlZFJlYWRhYmxlID0gdHJ1ZTtcbiAgICBpZiAoc3RhdGUuc3luYykgcHJvY2Vzc05leHRUaWNrKGVtaXRSZWFkYWJsZV8sIHN0cmVhbSk7ZWxzZSBlbWl0UmVhZGFibGVfKHN0cmVhbSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gZW1pdFJlYWRhYmxlXyhzdHJlYW0pIHtcbiAgZGVidWcoJ2VtaXQgcmVhZGFibGUnKTtcbiAgc3RyZWFtLmVtaXQoJ3JlYWRhYmxlJyk7XG4gIGZsb3coc3RyZWFtKTtcbn1cblxuLy8gYXQgdGhpcyBwb2ludCwgdGhlIHVzZXIgaGFzIHByZXN1bWFibHkgc2VlbiB0aGUgJ3JlYWRhYmxlJyBldmVudCxcbi8vIGFuZCBjYWxsZWQgcmVhZCgpIHRvIGNvbnN1bWUgc29tZSBkYXRhLiAgdGhhdCBtYXkgaGF2ZSB0cmlnZ2VyZWRcbi8vIGluIHR1cm4gYW5vdGhlciBfcmVhZChuKSBjYWxsLCBpbiB3aGljaCBjYXNlIHJlYWRpbmcgPSB0cnVlIGlmXG4vLyBpdCdzIGluIHByb2dyZXNzLlxuLy8gSG93ZXZlciwgaWYgd2UncmUgbm90IGVuZGVkLCBvciByZWFkaW5nLCBhbmQgdGhlIGxlbmd0aCA8IGh3bSxcbi8vIHRoZW4gZ28gYWhlYWQgYW5kIHRyeSB0byByZWFkIHNvbWUgbW9yZSBwcmVlbXB0aXZlbHkuXG5mdW5jdGlvbiBtYXliZVJlYWRNb3JlKHN0cmVhbSwgc3RhdGUpIHtcbiAgaWYgKCFzdGF0ZS5yZWFkaW5nTW9yZSkge1xuICAgIHN0YXRlLnJlYWRpbmdNb3JlID0gdHJ1ZTtcbiAgICBwcm9jZXNzTmV4dFRpY2sobWF5YmVSZWFkTW9yZV8sIHN0cmVhbSwgc3RhdGUpO1xuICB9XG59XG5cbmZ1bmN0aW9uIG1heWJlUmVhZE1vcmVfKHN0cmVhbSwgc3RhdGUpIHtcbiAgdmFyIGxlbiA9IHN0YXRlLmxlbmd0aDtcbiAgd2hpbGUgKCFzdGF0ZS5yZWFkaW5nICYmICFzdGF0ZS5mbG93aW5nICYmICFzdGF0ZS5lbmRlZCAmJiBzdGF0ZS5sZW5ndGggPCBzdGF0ZS5oaWdoV2F0ZXJNYXJrKSB7XG4gICAgZGVidWcoJ21heWJlUmVhZE1vcmUgcmVhZCAwJyk7XG4gICAgc3RyZWFtLnJlYWQoMCk7XG4gICAgaWYgKGxlbiA9PT0gc3RhdGUubGVuZ3RoKVxuICAgICAgLy8gZGlkbid0IGdldCBhbnkgZGF0YSwgc3RvcCBzcGlubmluZy5cbiAgICAgIGJyZWFrO2Vsc2UgbGVuID0gc3RhdGUubGVuZ3RoO1xuICB9XG4gIHN0YXRlLnJlYWRpbmdNb3JlID0gZmFsc2U7XG59XG5cbi8vIGFic3RyYWN0IG1ldGhvZC4gIHRvIGJlIG92ZXJyaWRkZW4gaW4gc3BlY2lmaWMgaW1wbGVtZW50YXRpb24gY2xhc3Nlcy5cbi8vIGNhbGwgY2IoZXIsIGRhdGEpIHdoZXJlIGRhdGEgaXMgPD0gbiBpbiBsZW5ndGguXG4vLyBmb3IgdmlydHVhbCAobm9uLXN0cmluZywgbm9uLWJ1ZmZlcikgc3RyZWFtcywgXCJsZW5ndGhcIiBpcyBzb21ld2hhdFxuLy8gYXJiaXRyYXJ5LCBhbmQgcGVyaGFwcyBub3QgdmVyeSBtZWFuaW5nZnVsLlxuUmVhZGFibGUucHJvdG90eXBlLl9yZWFkID0gZnVuY3Rpb24gKG4pIHtcbiAgdGhpcy5lbWl0KCdlcnJvcicsIG5ldyBFcnJvcignX3JlYWQoKSBpcyBub3QgaW1wbGVtZW50ZWQnKSk7XG59O1xuXG5SZWFkYWJsZS5wcm90b3R5cGUucGlwZSA9IGZ1bmN0aW9uIChkZXN0LCBwaXBlT3B0cykge1xuICB2YXIgc3JjID0gdGhpcztcbiAgdmFyIHN0YXRlID0gdGhpcy5fcmVhZGFibGVTdGF0ZTtcblxuICBzd2l0Y2ggKHN0YXRlLnBpcGVzQ291bnQpIHtcbiAgICBjYXNlIDA6XG4gICAgICBzdGF0ZS5waXBlcyA9IGRlc3Q7XG4gICAgICBicmVhaztcbiAgICBjYXNlIDE6XG4gICAgICBzdGF0ZS5waXBlcyA9IFtzdGF0ZS5waXBlcywgZGVzdF07XG4gICAgICBicmVhaztcbiAgICBkZWZhdWx0OlxuICAgICAgc3RhdGUucGlwZXMucHVzaChkZXN0KTtcbiAgICAgIGJyZWFrO1xuICB9XG4gIHN0YXRlLnBpcGVzQ291bnQgKz0gMTtcbiAgZGVidWcoJ3BpcGUgY291bnQ9JWQgb3B0cz0laicsIHN0YXRlLnBpcGVzQ291bnQsIHBpcGVPcHRzKTtcblxuICB2YXIgZG9FbmQgPSAoIXBpcGVPcHRzIHx8IHBpcGVPcHRzLmVuZCAhPT0gZmFsc2UpICYmIGRlc3QgIT09IHByb2Nlc3Muc3Rkb3V0ICYmIGRlc3QgIT09IHByb2Nlc3Muc3RkZXJyO1xuXG4gIHZhciBlbmRGbiA9IGRvRW5kID8gb25lbmQgOiB1bnBpcGU7XG4gIGlmIChzdGF0ZS5lbmRFbWl0dGVkKSBwcm9jZXNzTmV4dFRpY2soZW5kRm4pO2Vsc2Ugc3JjLm9uY2UoJ2VuZCcsIGVuZEZuKTtcblxuICBkZXN0Lm9uKCd1bnBpcGUnLCBvbnVucGlwZSk7XG4gIGZ1bmN0aW9uIG9udW5waXBlKHJlYWRhYmxlLCB1bnBpcGVJbmZvKSB7XG4gICAgZGVidWcoJ29udW5waXBlJyk7XG4gICAgaWYgKHJlYWRhYmxlID09PSBzcmMpIHtcbiAgICAgIGlmICh1bnBpcGVJbmZvICYmIHVucGlwZUluZm8uaGFzVW5waXBlZCA9PT0gZmFsc2UpIHtcbiAgICAgICAgdW5waXBlSW5mby5oYXNVbnBpcGVkID0gdHJ1ZTtcbiAgICAgICAgY2xlYW51cCgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIG9uZW5kKCkge1xuICAgIGRlYnVnKCdvbmVuZCcpO1xuICAgIGRlc3QuZW5kKCk7XG4gIH1cblxuICAvLyB3aGVuIHRoZSBkZXN0IGRyYWlucywgaXQgcmVkdWNlcyB0aGUgYXdhaXREcmFpbiBjb3VudGVyXG4gIC8vIG9uIHRoZSBzb3VyY2UuICBUaGlzIHdvdWxkIGJlIG1vcmUgZWxlZ2FudCB3aXRoIGEgLm9uY2UoKVxuICAvLyBoYW5kbGVyIGluIGZsb3coKSwgYnV0IGFkZGluZyBhbmQgcmVtb3ZpbmcgcmVwZWF0ZWRseSBpc1xuICAvLyB0b28gc2xvdy5cbiAgdmFyIG9uZHJhaW4gPSBwaXBlT25EcmFpbihzcmMpO1xuICBkZXN0Lm9uKCdkcmFpbicsIG9uZHJhaW4pO1xuXG4gIHZhciBjbGVhbmVkVXAgPSBmYWxzZTtcbiAgZnVuY3Rpb24gY2xlYW51cCgpIHtcbiAgICBkZWJ1ZygnY2xlYW51cCcpO1xuICAgIC8vIGNsZWFudXAgZXZlbnQgaGFuZGxlcnMgb25jZSB0aGUgcGlwZSBpcyBicm9rZW5cbiAgICBkZXN0LnJlbW92ZUxpc3RlbmVyKCdjbG9zZScsIG9uY2xvc2UpO1xuICAgIGRlc3QucmVtb3ZlTGlzdGVuZXIoJ2ZpbmlzaCcsIG9uZmluaXNoKTtcbiAgICBkZXN0LnJlbW92ZUxpc3RlbmVyKCdkcmFpbicsIG9uZHJhaW4pO1xuICAgIGRlc3QucmVtb3ZlTGlzdGVuZXIoJ2Vycm9yJywgb25lcnJvcik7XG4gICAgZGVzdC5yZW1vdmVMaXN0ZW5lcigndW5waXBlJywgb251bnBpcGUpO1xuICAgIHNyYy5yZW1vdmVMaXN0ZW5lcignZW5kJywgb25lbmQpO1xuICAgIHNyYy5yZW1vdmVMaXN0ZW5lcignZW5kJywgdW5waXBlKTtcbiAgICBzcmMucmVtb3ZlTGlzdGVuZXIoJ2RhdGEnLCBvbmRhdGEpO1xuXG4gICAgY2xlYW5lZFVwID0gdHJ1ZTtcblxuICAgIC8vIGlmIHRoZSByZWFkZXIgaXMgd2FpdGluZyBmb3IgYSBkcmFpbiBldmVudCBmcm9tIHRoaXNcbiAgICAvLyBzcGVjaWZpYyB3cml0ZXIsIHRoZW4gaXQgd291bGQgY2F1c2UgaXQgdG8gbmV2ZXIgc3RhcnRcbiAgICAvLyBmbG93aW5nIGFnYWluLlxuICAgIC8vIFNvLCBpZiB0aGlzIGlzIGF3YWl0aW5nIGEgZHJhaW4sIHRoZW4gd2UganVzdCBjYWxsIGl0IG5vdy5cbiAgICAvLyBJZiB3ZSBkb24ndCBrbm93LCB0aGVuIGFzc3VtZSB0aGF0IHdlIGFyZSB3YWl0aW5nIGZvciBvbmUuXG4gICAgaWYgKHN0YXRlLmF3YWl0RHJhaW4gJiYgKCFkZXN0Ll93cml0YWJsZVN0YXRlIHx8IGRlc3QuX3dyaXRhYmxlU3RhdGUubmVlZERyYWluKSkgb25kcmFpbigpO1xuICB9XG5cbiAgLy8gSWYgdGhlIHVzZXIgcHVzaGVzIG1vcmUgZGF0YSB3aGlsZSB3ZSdyZSB3cml0aW5nIHRvIGRlc3QgdGhlbiB3ZSdsbCBlbmQgdXBcbiAgLy8gaW4gb25kYXRhIGFnYWluLiBIb3dldmVyLCB3ZSBvbmx5IHdhbnQgdG8gaW5jcmVhc2UgYXdhaXREcmFpbiBvbmNlIGJlY2F1c2VcbiAgLy8gZGVzdCB3aWxsIG9ubHkgZW1pdCBvbmUgJ2RyYWluJyBldmVudCBmb3IgdGhlIG11bHRpcGxlIHdyaXRlcy5cbiAgLy8gPT4gSW50cm9kdWNlIGEgZ3VhcmQgb24gaW5jcmVhc2luZyBhd2FpdERyYWluLlxuICB2YXIgaW5jcmVhc2VkQXdhaXREcmFpbiA9IGZhbHNlO1xuICBzcmMub24oJ2RhdGEnLCBvbmRhdGEpO1xuICBmdW5jdGlvbiBvbmRhdGEoY2h1bmspIHtcbiAgICBkZWJ1Zygnb25kYXRhJyk7XG4gICAgaW5jcmVhc2VkQXdhaXREcmFpbiA9IGZhbHNlO1xuICAgIHZhciByZXQgPSBkZXN0LndyaXRlKGNodW5rKTtcbiAgICBpZiAoZmFsc2UgPT09IHJldCAmJiAhaW5jcmVhc2VkQXdhaXREcmFpbikge1xuICAgICAgLy8gSWYgdGhlIHVzZXIgdW5waXBlZCBkdXJpbmcgYGRlc3Qud3JpdGUoKWAsIGl0IGlzIHBvc3NpYmxlXG4gICAgICAvLyB0byBnZXQgc3R1Y2sgaW4gYSBwZXJtYW5lbnRseSBwYXVzZWQgc3RhdGUgaWYgdGhhdCB3cml0ZVxuICAgICAgLy8gYWxzbyByZXR1cm5lZCBmYWxzZS5cbiAgICAgIC8vID0+IENoZWNrIHdoZXRoZXIgYGRlc3RgIGlzIHN0aWxsIGEgcGlwaW5nIGRlc3RpbmF0aW9uLlxuICAgICAgaWYgKChzdGF0ZS5waXBlc0NvdW50ID09PSAxICYmIHN0YXRlLnBpcGVzID09PSBkZXN0IHx8IHN0YXRlLnBpcGVzQ291bnQgPiAxICYmIGluZGV4T2Yoc3RhdGUucGlwZXMsIGRlc3QpICE9PSAtMSkgJiYgIWNsZWFuZWRVcCkge1xuICAgICAgICBkZWJ1ZygnZmFsc2Ugd3JpdGUgcmVzcG9uc2UsIHBhdXNlJywgc3JjLl9yZWFkYWJsZVN0YXRlLmF3YWl0RHJhaW4pO1xuICAgICAgICBzcmMuX3JlYWRhYmxlU3RhdGUuYXdhaXREcmFpbisrO1xuICAgICAgICBpbmNyZWFzZWRBd2FpdERyYWluID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIHNyYy5wYXVzZSgpO1xuICAgIH1cbiAgfVxuXG4gIC8vIGlmIHRoZSBkZXN0IGhhcyBhbiBlcnJvciwgdGhlbiBzdG9wIHBpcGluZyBpbnRvIGl0LlxuICAvLyBob3dldmVyLCBkb24ndCBzdXBwcmVzcyB0aGUgdGhyb3dpbmcgYmVoYXZpb3IgZm9yIHRoaXMuXG4gIGZ1bmN0aW9uIG9uZXJyb3IoZXIpIHtcbiAgICBkZWJ1Zygnb25lcnJvcicsIGVyKTtcbiAgICB1bnBpcGUoKTtcbiAgICBkZXN0LnJlbW92ZUxpc3RlbmVyKCdlcnJvcicsIG9uZXJyb3IpO1xuICAgIGlmIChFRWxpc3RlbmVyQ291bnQoZGVzdCwgJ2Vycm9yJykgPT09IDApIGRlc3QuZW1pdCgnZXJyb3InLCBlcik7XG4gIH1cblxuICAvLyBNYWtlIHN1cmUgb3VyIGVycm9yIGhhbmRsZXIgaXMgYXR0YWNoZWQgYmVmb3JlIHVzZXJsYW5kIG9uZXMuXG4gIHByZXBlbmRMaXN0ZW5lcihkZXN0LCAnZXJyb3InLCBvbmVycm9yKTtcblxuICAvLyBCb3RoIGNsb3NlIGFuZCBmaW5pc2ggc2hvdWxkIHRyaWdnZXIgdW5waXBlLCBidXQgb25seSBvbmNlLlxuICBmdW5jdGlvbiBvbmNsb3NlKCkge1xuICAgIGRlc3QucmVtb3ZlTGlzdGVuZXIoJ2ZpbmlzaCcsIG9uZmluaXNoKTtcbiAgICB1bnBpcGUoKTtcbiAgfVxuICBkZXN0Lm9uY2UoJ2Nsb3NlJywgb25jbG9zZSk7XG4gIGZ1bmN0aW9uIG9uZmluaXNoKCkge1xuICAgIGRlYnVnKCdvbmZpbmlzaCcpO1xuICAgIGRlc3QucmVtb3ZlTGlzdGVuZXIoJ2Nsb3NlJywgb25jbG9zZSk7XG4gICAgdW5waXBlKCk7XG4gIH1cbiAgZGVzdC5vbmNlKCdmaW5pc2gnLCBvbmZpbmlzaCk7XG5cbiAgZnVuY3Rpb24gdW5waXBlKCkge1xuICAgIGRlYnVnKCd1bnBpcGUnKTtcbiAgICBzcmMudW5waXBlKGRlc3QpO1xuICB9XG5cbiAgLy8gdGVsbCB0aGUgZGVzdCB0aGF0IGl0J3MgYmVpbmcgcGlwZWQgdG9cbiAgZGVzdC5lbWl0KCdwaXBlJywgc3JjKTtcblxuICAvLyBzdGFydCB0aGUgZmxvdyBpZiBpdCBoYXNuJ3QgYmVlbiBzdGFydGVkIGFscmVhZHkuXG4gIGlmICghc3RhdGUuZmxvd2luZykge1xuICAgIGRlYnVnKCdwaXBlIHJlc3VtZScpO1xuICAgIHNyYy5yZXN1bWUoKTtcbiAgfVxuXG4gIHJldHVybiBkZXN0O1xufTtcblxuZnVuY3Rpb24gcGlwZU9uRHJhaW4oc3JjKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHN0YXRlID0gc3JjLl9yZWFkYWJsZVN0YXRlO1xuICAgIGRlYnVnKCdwaXBlT25EcmFpbicsIHN0YXRlLmF3YWl0RHJhaW4pO1xuICAgIGlmIChzdGF0ZS5hd2FpdERyYWluKSBzdGF0ZS5hd2FpdERyYWluLS07XG4gICAgaWYgKHN0YXRlLmF3YWl0RHJhaW4gPT09IDAgJiYgRUVsaXN0ZW5lckNvdW50KHNyYywgJ2RhdGEnKSkge1xuICAgICAgc3RhdGUuZmxvd2luZyA9IHRydWU7XG4gICAgICBmbG93KHNyYyk7XG4gICAgfVxuICB9O1xufVxuXG5SZWFkYWJsZS5wcm90b3R5cGUudW5waXBlID0gZnVuY3Rpb24gKGRlc3QpIHtcbiAgdmFyIHN0YXRlID0gdGhpcy5fcmVhZGFibGVTdGF0ZTtcbiAgdmFyIHVucGlwZUluZm8gPSB7IGhhc1VucGlwZWQ6IGZhbHNlIH07XG5cbiAgLy8gaWYgd2UncmUgbm90IHBpcGluZyBhbnl3aGVyZSwgdGhlbiBkbyBub3RoaW5nLlxuICBpZiAoc3RhdGUucGlwZXNDb3VudCA9PT0gMCkgcmV0dXJuIHRoaXM7XG5cbiAgLy8ganVzdCBvbmUgZGVzdGluYXRpb24uICBtb3N0IGNvbW1vbiBjYXNlLlxuICBpZiAoc3RhdGUucGlwZXNDb3VudCA9PT0gMSkge1xuICAgIC8vIHBhc3NlZCBpbiBvbmUsIGJ1dCBpdCdzIG5vdCB0aGUgcmlnaHQgb25lLlxuICAgIGlmIChkZXN0ICYmIGRlc3QgIT09IHN0YXRlLnBpcGVzKSByZXR1cm4gdGhpcztcblxuICAgIGlmICghZGVzdCkgZGVzdCA9IHN0YXRlLnBpcGVzO1xuXG4gICAgLy8gZ290IGEgbWF0Y2guXG4gICAgc3RhdGUucGlwZXMgPSBudWxsO1xuICAgIHN0YXRlLnBpcGVzQ291bnQgPSAwO1xuICAgIHN0YXRlLmZsb3dpbmcgPSBmYWxzZTtcbiAgICBpZiAoZGVzdCkgZGVzdC5lbWl0KCd1bnBpcGUnLCB0aGlzLCB1bnBpcGVJbmZvKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8vIHNsb3cgY2FzZS4gbXVsdGlwbGUgcGlwZSBkZXN0aW5hdGlvbnMuXG5cbiAgaWYgKCFkZXN0KSB7XG4gICAgLy8gcmVtb3ZlIGFsbC5cbiAgICB2YXIgZGVzdHMgPSBzdGF0ZS5waXBlcztcbiAgICB2YXIgbGVuID0gc3RhdGUucGlwZXNDb3VudDtcbiAgICBzdGF0ZS5waXBlcyA9IG51bGw7XG4gICAgc3RhdGUucGlwZXNDb3VudCA9IDA7XG4gICAgc3RhdGUuZmxvd2luZyA9IGZhbHNlO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgZGVzdHNbaV0uZW1pdCgndW5waXBlJywgdGhpcywgdW5waXBlSW5mbyk7XG4gICAgfXJldHVybiB0aGlzO1xuICB9XG5cbiAgLy8gdHJ5IHRvIGZpbmQgdGhlIHJpZ2h0IG9uZS5cbiAgdmFyIGluZGV4ID0gaW5kZXhPZihzdGF0ZS5waXBlcywgZGVzdCk7XG4gIGlmIChpbmRleCA9PT0gLTEpIHJldHVybiB0aGlzO1xuXG4gIHN0YXRlLnBpcGVzLnNwbGljZShpbmRleCwgMSk7XG4gIHN0YXRlLnBpcGVzQ291bnQgLT0gMTtcbiAgaWYgKHN0YXRlLnBpcGVzQ291bnQgPT09IDEpIHN0YXRlLnBpcGVzID0gc3RhdGUucGlwZXNbMF07XG5cbiAgZGVzdC5lbWl0KCd1bnBpcGUnLCB0aGlzLCB1bnBpcGVJbmZvKTtcblxuICByZXR1cm4gdGhpcztcbn07XG5cbi8vIHNldCB1cCBkYXRhIGV2ZW50cyBpZiB0aGV5IGFyZSBhc2tlZCBmb3Jcbi8vIEVuc3VyZSByZWFkYWJsZSBsaXN0ZW5lcnMgZXZlbnR1YWxseSBnZXQgc29tZXRoaW5nXG5SZWFkYWJsZS5wcm90b3R5cGUub24gPSBmdW5jdGlvbiAoZXYsIGZuKSB7XG4gIHZhciByZXMgPSBTdHJlYW0ucHJvdG90eXBlLm9uLmNhbGwodGhpcywgZXYsIGZuKTtcblxuICBpZiAoZXYgPT09ICdkYXRhJykge1xuICAgIC8vIFN0YXJ0IGZsb3dpbmcgb24gbmV4dCB0aWNrIGlmIHN0cmVhbSBpc24ndCBleHBsaWNpdGx5IHBhdXNlZFxuICAgIGlmICh0aGlzLl9yZWFkYWJsZVN0YXRlLmZsb3dpbmcgIT09IGZhbHNlKSB0aGlzLnJlc3VtZSgpO1xuICB9IGVsc2UgaWYgKGV2ID09PSAncmVhZGFibGUnKSB7XG4gICAgdmFyIHN0YXRlID0gdGhpcy5fcmVhZGFibGVTdGF0ZTtcbiAgICBpZiAoIXN0YXRlLmVuZEVtaXR0ZWQgJiYgIXN0YXRlLnJlYWRhYmxlTGlzdGVuaW5nKSB7XG4gICAgICBzdGF0ZS5yZWFkYWJsZUxpc3RlbmluZyA9IHN0YXRlLm5lZWRSZWFkYWJsZSA9IHRydWU7XG4gICAgICBzdGF0ZS5lbWl0dGVkUmVhZGFibGUgPSBmYWxzZTtcbiAgICAgIGlmICghc3RhdGUucmVhZGluZykge1xuICAgICAgICBwcm9jZXNzTmV4dFRpY2soblJlYWRpbmdOZXh0VGljaywgdGhpcyk7XG4gICAgICB9IGVsc2UgaWYgKHN0YXRlLmxlbmd0aCkge1xuICAgICAgICBlbWl0UmVhZGFibGUodGhpcyk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJlcztcbn07XG5SZWFkYWJsZS5wcm90b3R5cGUuYWRkTGlzdGVuZXIgPSBSZWFkYWJsZS5wcm90b3R5cGUub247XG5cbmZ1bmN0aW9uIG5SZWFkaW5nTmV4dFRpY2soc2VsZikge1xuICBkZWJ1ZygncmVhZGFibGUgbmV4dHRpY2sgcmVhZCAwJyk7XG4gIHNlbGYucmVhZCgwKTtcbn1cblxuLy8gcGF1c2UoKSBhbmQgcmVzdW1lKCkgYXJlIHJlbW5hbnRzIG9mIHRoZSBsZWdhY3kgcmVhZGFibGUgc3RyZWFtIEFQSVxuLy8gSWYgdGhlIHVzZXIgdXNlcyB0aGVtLCB0aGVuIHN3aXRjaCBpbnRvIG9sZCBtb2RlLlxuUmVhZGFibGUucHJvdG90eXBlLnJlc3VtZSA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIHN0YXRlID0gdGhpcy5fcmVhZGFibGVTdGF0ZTtcbiAgaWYgKCFzdGF0ZS5mbG93aW5nKSB7XG4gICAgZGVidWcoJ3Jlc3VtZScpO1xuICAgIHN0YXRlLmZsb3dpbmcgPSB0cnVlO1xuICAgIHJlc3VtZSh0aGlzLCBzdGF0ZSk7XG4gIH1cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5mdW5jdGlvbiByZXN1bWUoc3RyZWFtLCBzdGF0ZSkge1xuICBpZiAoIXN0YXRlLnJlc3VtZVNjaGVkdWxlZCkge1xuICAgIHN0YXRlLnJlc3VtZVNjaGVkdWxlZCA9IHRydWU7XG4gICAgcHJvY2Vzc05leHRUaWNrKHJlc3VtZV8sIHN0cmVhbSwgc3RhdGUpO1xuICB9XG59XG5cbmZ1bmN0aW9uIHJlc3VtZV8oc3RyZWFtLCBzdGF0ZSkge1xuICBpZiAoIXN0YXRlLnJlYWRpbmcpIHtcbiAgICBkZWJ1ZygncmVzdW1lIHJlYWQgMCcpO1xuICAgIHN0cmVhbS5yZWFkKDApO1xuICB9XG5cbiAgc3RhdGUucmVzdW1lU2NoZWR1bGVkID0gZmFsc2U7XG4gIHN0YXRlLmF3YWl0RHJhaW4gPSAwO1xuICBzdHJlYW0uZW1pdCgncmVzdW1lJyk7XG4gIGZsb3coc3RyZWFtKTtcbiAgaWYgKHN0YXRlLmZsb3dpbmcgJiYgIXN0YXRlLnJlYWRpbmcpIHN0cmVhbS5yZWFkKDApO1xufVxuXG5SZWFkYWJsZS5wcm90b3R5cGUucGF1c2UgPSBmdW5jdGlvbiAoKSB7XG4gIGRlYnVnKCdjYWxsIHBhdXNlIGZsb3dpbmc9JWonLCB0aGlzLl9yZWFkYWJsZVN0YXRlLmZsb3dpbmcpO1xuICBpZiAoZmFsc2UgIT09IHRoaXMuX3JlYWRhYmxlU3RhdGUuZmxvd2luZykge1xuICAgIGRlYnVnKCdwYXVzZScpO1xuICAgIHRoaXMuX3JlYWRhYmxlU3RhdGUuZmxvd2luZyA9IGZhbHNlO1xuICAgIHRoaXMuZW1pdCgncGF1c2UnKTtcbiAgfVxuICByZXR1cm4gdGhpcztcbn07XG5cbmZ1bmN0aW9uIGZsb3coc3RyZWFtKSB7XG4gIHZhciBzdGF0ZSA9IHN0cmVhbS5fcmVhZGFibGVTdGF0ZTtcbiAgZGVidWcoJ2Zsb3cnLCBzdGF0ZS5mbG93aW5nKTtcbiAgd2hpbGUgKHN0YXRlLmZsb3dpbmcgJiYgc3RyZWFtLnJlYWQoKSAhPT0gbnVsbCkge31cbn1cblxuLy8gd3JhcCBhbiBvbGQtc3R5bGUgc3RyZWFtIGFzIHRoZSBhc3luYyBkYXRhIHNvdXJjZS5cbi8vIFRoaXMgaXMgKm5vdCogcGFydCBvZiB0aGUgcmVhZGFibGUgc3RyZWFtIGludGVyZmFjZS5cbi8vIEl0IGlzIGFuIHVnbHkgdW5mb3J0dW5hdGUgbWVzcyBvZiBoaXN0b3J5LlxuUmVhZGFibGUucHJvdG90eXBlLndyYXAgPSBmdW5jdGlvbiAoc3RyZWFtKSB7XG4gIHZhciBzdGF0ZSA9IHRoaXMuX3JlYWRhYmxlU3RhdGU7XG4gIHZhciBwYXVzZWQgPSBmYWxzZTtcblxuICB2YXIgc2VsZiA9IHRoaXM7XG4gIHN0cmVhbS5vbignZW5kJywgZnVuY3Rpb24gKCkge1xuICAgIGRlYnVnKCd3cmFwcGVkIGVuZCcpO1xuICAgIGlmIChzdGF0ZS5kZWNvZGVyICYmICFzdGF0ZS5lbmRlZCkge1xuICAgICAgdmFyIGNodW5rID0gc3RhdGUuZGVjb2Rlci5lbmQoKTtcbiAgICAgIGlmIChjaHVuayAmJiBjaHVuay5sZW5ndGgpIHNlbGYucHVzaChjaHVuayk7XG4gICAgfVxuXG4gICAgc2VsZi5wdXNoKG51bGwpO1xuICB9KTtcblxuICBzdHJlYW0ub24oJ2RhdGEnLCBmdW5jdGlvbiAoY2h1bmspIHtcbiAgICBkZWJ1Zygnd3JhcHBlZCBkYXRhJyk7XG4gICAgaWYgKHN0YXRlLmRlY29kZXIpIGNodW5rID0gc3RhdGUuZGVjb2Rlci53cml0ZShjaHVuayk7XG5cbiAgICAvLyBkb24ndCBza2lwIG92ZXIgZmFsc3kgdmFsdWVzIGluIG9iamVjdE1vZGVcbiAgICBpZiAoc3RhdGUub2JqZWN0TW9kZSAmJiAoY2h1bmsgPT09IG51bGwgfHwgY2h1bmsgPT09IHVuZGVmaW5lZCkpIHJldHVybjtlbHNlIGlmICghc3RhdGUub2JqZWN0TW9kZSAmJiAoIWNodW5rIHx8ICFjaHVuay5sZW5ndGgpKSByZXR1cm47XG5cbiAgICB2YXIgcmV0ID0gc2VsZi5wdXNoKGNodW5rKTtcbiAgICBpZiAoIXJldCkge1xuICAgICAgcGF1c2VkID0gdHJ1ZTtcbiAgICAgIHN0cmVhbS5wYXVzZSgpO1xuICAgIH1cbiAgfSk7XG5cbiAgLy8gcHJveHkgYWxsIHRoZSBvdGhlciBtZXRob2RzLlxuICAvLyBpbXBvcnRhbnQgd2hlbiB3cmFwcGluZyBmaWx0ZXJzIGFuZCBkdXBsZXhlcy5cbiAgZm9yICh2YXIgaSBpbiBzdHJlYW0pIHtcbiAgICBpZiAodGhpc1tpXSA9PT0gdW5kZWZpbmVkICYmIHR5cGVvZiBzdHJlYW1baV0gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHRoaXNbaV0gPSBmdW5jdGlvbiAobWV0aG9kKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcmV0dXJuIHN0cmVhbVttZXRob2RdLmFwcGx5KHN0cmVhbSwgYXJndW1lbnRzKTtcbiAgICAgICAgfTtcbiAgICAgIH0oaSk7XG4gICAgfVxuICB9XG5cbiAgLy8gcHJveHkgY2VydGFpbiBpbXBvcnRhbnQgZXZlbnRzLlxuICBmb3IgKHZhciBuID0gMDsgbiA8IGtQcm94eUV2ZW50cy5sZW5ndGg7IG4rKykge1xuICAgIHN0cmVhbS5vbihrUHJveHlFdmVudHNbbl0sIHNlbGYuZW1pdC5iaW5kKHNlbGYsIGtQcm94eUV2ZW50c1tuXSkpO1xuICB9XG5cbiAgLy8gd2hlbiB3ZSB0cnkgdG8gY29uc3VtZSBzb21lIG1vcmUgYnl0ZXMsIHNpbXBseSB1bnBhdXNlIHRoZVxuICAvLyB1bmRlcmx5aW5nIHN0cmVhbS5cbiAgc2VsZi5fcmVhZCA9IGZ1bmN0aW9uIChuKSB7XG4gICAgZGVidWcoJ3dyYXBwZWQgX3JlYWQnLCBuKTtcbiAgICBpZiAocGF1c2VkKSB7XG4gICAgICBwYXVzZWQgPSBmYWxzZTtcbiAgICAgIHN0cmVhbS5yZXN1bWUoKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIHNlbGY7XG59O1xuXG4vLyBleHBvc2VkIGZvciB0ZXN0aW5nIHB1cnBvc2VzIG9ubHkuXG5SZWFkYWJsZS5fZnJvbUxpc3QgPSBmcm9tTGlzdDtcblxuLy8gUGx1Y2sgb2ZmIG4gYnl0ZXMgZnJvbSBhbiBhcnJheSBvZiBidWZmZXJzLlxuLy8gTGVuZ3RoIGlzIHRoZSBjb21iaW5lZCBsZW5ndGhzIG9mIGFsbCB0aGUgYnVmZmVycyBpbiB0aGUgbGlzdC5cbi8vIFRoaXMgZnVuY3Rpb24gaXMgZGVzaWduZWQgdG8gYmUgaW5saW5hYmxlLCBzbyBwbGVhc2UgdGFrZSBjYXJlIHdoZW4gbWFraW5nXG4vLyBjaGFuZ2VzIHRvIHRoZSBmdW5jdGlvbiBib2R5LlxuZnVuY3Rpb24gZnJvbUxpc3Qobiwgc3RhdGUpIHtcbiAgLy8gbm90aGluZyBidWZmZXJlZFxuICBpZiAoc3RhdGUubGVuZ3RoID09PSAwKSByZXR1cm4gbnVsbDtcblxuICB2YXIgcmV0O1xuICBpZiAoc3RhdGUub2JqZWN0TW9kZSkgcmV0ID0gc3RhdGUuYnVmZmVyLnNoaWZ0KCk7ZWxzZSBpZiAoIW4gfHwgbiA+PSBzdGF0ZS5sZW5ndGgpIHtcbiAgICAvLyByZWFkIGl0IGFsbCwgdHJ1bmNhdGUgdGhlIGxpc3RcbiAgICBpZiAoc3RhdGUuZGVjb2RlcikgcmV0ID0gc3RhdGUuYnVmZmVyLmpvaW4oJycpO2Vsc2UgaWYgKHN0YXRlLmJ1ZmZlci5sZW5ndGggPT09IDEpIHJldCA9IHN0YXRlLmJ1ZmZlci5oZWFkLmRhdGE7ZWxzZSByZXQgPSBzdGF0ZS5idWZmZXIuY29uY2F0KHN0YXRlLmxlbmd0aCk7XG4gICAgc3RhdGUuYnVmZmVyLmNsZWFyKCk7XG4gIH0gZWxzZSB7XG4gICAgLy8gcmVhZCBwYXJ0IG9mIGxpc3RcbiAgICByZXQgPSBmcm9tTGlzdFBhcnRpYWwobiwgc3RhdGUuYnVmZmVyLCBzdGF0ZS5kZWNvZGVyKTtcbiAgfVxuXG4gIHJldHVybiByZXQ7XG59XG5cbi8vIEV4dHJhY3RzIG9ubHkgZW5vdWdoIGJ1ZmZlcmVkIGRhdGEgdG8gc2F0aXNmeSB0aGUgYW1vdW50IHJlcXVlc3RlZC5cbi8vIFRoaXMgZnVuY3Rpb24gaXMgZGVzaWduZWQgdG8gYmUgaW5saW5hYmxlLCBzbyBwbGVhc2UgdGFrZSBjYXJlIHdoZW4gbWFraW5nXG4vLyBjaGFuZ2VzIHRvIHRoZSBmdW5jdGlvbiBib2R5LlxuZnVuY3Rpb24gZnJvbUxpc3RQYXJ0aWFsKG4sIGxpc3QsIGhhc1N0cmluZ3MpIHtcbiAgdmFyIHJldDtcbiAgaWYgKG4gPCBsaXN0LmhlYWQuZGF0YS5sZW5ndGgpIHtcbiAgICAvLyBzbGljZSBpcyB0aGUgc2FtZSBmb3IgYnVmZmVycyBhbmQgc3RyaW5nc1xuICAgIHJldCA9IGxpc3QuaGVhZC5kYXRhLnNsaWNlKDAsIG4pO1xuICAgIGxpc3QuaGVhZC5kYXRhID0gbGlzdC5oZWFkLmRhdGEuc2xpY2Uobik7XG4gIH0gZWxzZSBpZiAobiA9PT0gbGlzdC5oZWFkLmRhdGEubGVuZ3RoKSB7XG4gICAgLy8gZmlyc3QgY2h1bmsgaXMgYSBwZXJmZWN0IG1hdGNoXG4gICAgcmV0ID0gbGlzdC5zaGlmdCgpO1xuICB9IGVsc2Uge1xuICAgIC8vIHJlc3VsdCBzcGFucyBtb3JlIHRoYW4gb25lIGJ1ZmZlclxuICAgIHJldCA9IGhhc1N0cmluZ3MgPyBjb3B5RnJvbUJ1ZmZlclN0cmluZyhuLCBsaXN0KSA6IGNvcHlGcm9tQnVmZmVyKG4sIGxpc3QpO1xuICB9XG4gIHJldHVybiByZXQ7XG59XG5cbi8vIENvcGllcyBhIHNwZWNpZmllZCBhbW91bnQgb2YgY2hhcmFjdGVycyBmcm9tIHRoZSBsaXN0IG9mIGJ1ZmZlcmVkIGRhdGFcbi8vIGNodW5rcy5cbi8vIFRoaXMgZnVuY3Rpb24gaXMgZGVzaWduZWQgdG8gYmUgaW5saW5hYmxlLCBzbyBwbGVhc2UgdGFrZSBjYXJlIHdoZW4gbWFraW5nXG4vLyBjaGFuZ2VzIHRvIHRoZSBmdW5jdGlvbiBib2R5LlxuZnVuY3Rpb24gY29weUZyb21CdWZmZXJTdHJpbmcobiwgbGlzdCkge1xuICB2YXIgcCA9IGxpc3QuaGVhZDtcbiAgdmFyIGMgPSAxO1xuICB2YXIgcmV0ID0gcC5kYXRhO1xuICBuIC09IHJldC5sZW5ndGg7XG4gIHdoaWxlIChwID0gcC5uZXh0KSB7XG4gICAgdmFyIHN0ciA9IHAuZGF0YTtcbiAgICB2YXIgbmIgPSBuID4gc3RyLmxlbmd0aCA/IHN0ci5sZW5ndGggOiBuO1xuICAgIGlmIChuYiA9PT0gc3RyLmxlbmd0aCkgcmV0ICs9IHN0cjtlbHNlIHJldCArPSBzdHIuc2xpY2UoMCwgbik7XG4gICAgbiAtPSBuYjtcbiAgICBpZiAobiA9PT0gMCkge1xuICAgICAgaWYgKG5iID09PSBzdHIubGVuZ3RoKSB7XG4gICAgICAgICsrYztcbiAgICAgICAgaWYgKHAubmV4dCkgbGlzdC5oZWFkID0gcC5uZXh0O2Vsc2UgbGlzdC5oZWFkID0gbGlzdC50YWlsID0gbnVsbDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxpc3QuaGVhZCA9IHA7XG4gICAgICAgIHAuZGF0YSA9IHN0ci5zbGljZShuYik7XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgICB9XG4gICAgKytjO1xuICB9XG4gIGxpc3QubGVuZ3RoIC09IGM7XG4gIHJldHVybiByZXQ7XG59XG5cbi8vIENvcGllcyBhIHNwZWNpZmllZCBhbW91bnQgb2YgYnl0ZXMgZnJvbSB0aGUgbGlzdCBvZiBidWZmZXJlZCBkYXRhIGNodW5rcy5cbi8vIFRoaXMgZnVuY3Rpb24gaXMgZGVzaWduZWQgdG8gYmUgaW5saW5hYmxlLCBzbyBwbGVhc2UgdGFrZSBjYXJlIHdoZW4gbWFraW5nXG4vLyBjaGFuZ2VzIHRvIHRoZSBmdW5jdGlvbiBib2R5LlxuZnVuY3Rpb24gY29weUZyb21CdWZmZXIobiwgbGlzdCkge1xuICB2YXIgcmV0ID0gQnVmZmVyLmFsbG9jVW5zYWZlKG4pO1xuICB2YXIgcCA9IGxpc3QuaGVhZDtcbiAgdmFyIGMgPSAxO1xuICBwLmRhdGEuY29weShyZXQpO1xuICBuIC09IHAuZGF0YS5sZW5ndGg7XG4gIHdoaWxlIChwID0gcC5uZXh0KSB7XG4gICAgdmFyIGJ1ZiA9IHAuZGF0YTtcbiAgICB2YXIgbmIgPSBuID4gYnVmLmxlbmd0aCA/IGJ1Zi5sZW5ndGggOiBuO1xuICAgIGJ1Zi5jb3B5KHJldCwgcmV0Lmxlbmd0aCAtIG4sIDAsIG5iKTtcbiAgICBuIC09IG5iO1xuICAgIGlmIChuID09PSAwKSB7XG4gICAgICBpZiAobmIgPT09IGJ1Zi5sZW5ndGgpIHtcbiAgICAgICAgKytjO1xuICAgICAgICBpZiAocC5uZXh0KSBsaXN0LmhlYWQgPSBwLm5leHQ7ZWxzZSBsaXN0LmhlYWQgPSBsaXN0LnRhaWwgPSBudWxsO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbGlzdC5oZWFkID0gcDtcbiAgICAgICAgcC5kYXRhID0gYnVmLnNsaWNlKG5iKTtcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgICArK2M7XG4gIH1cbiAgbGlzdC5sZW5ndGggLT0gYztcbiAgcmV0dXJuIHJldDtcbn1cblxuZnVuY3Rpb24gZW5kUmVhZGFibGUoc3RyZWFtKSB7XG4gIHZhciBzdGF0ZSA9IHN0cmVhbS5fcmVhZGFibGVTdGF0ZTtcblxuICAvLyBJZiB3ZSBnZXQgaGVyZSBiZWZvcmUgY29uc3VtaW5nIGFsbCB0aGUgYnl0ZXMsIHRoZW4gdGhhdCBpcyBhXG4gIC8vIGJ1ZyBpbiBub2RlLiAgU2hvdWxkIG5ldmVyIGhhcHBlbi5cbiAgaWYgKHN0YXRlLmxlbmd0aCA+IDApIHRocm93IG5ldyBFcnJvcignXCJlbmRSZWFkYWJsZSgpXCIgY2FsbGVkIG9uIG5vbi1lbXB0eSBzdHJlYW0nKTtcblxuICBpZiAoIXN0YXRlLmVuZEVtaXR0ZWQpIHtcbiAgICBzdGF0ZS5lbmRlZCA9IHRydWU7XG4gICAgcHJvY2Vzc05leHRUaWNrKGVuZFJlYWRhYmxlTlQsIHN0YXRlLCBzdHJlYW0pO1xuICB9XG59XG5cbmZ1bmN0aW9uIGVuZFJlYWRhYmxlTlQoc3RhdGUsIHN0cmVhbSkge1xuICAvLyBDaGVjayB0aGF0IHdlIGRpZG4ndCBnZXQgb25lIGxhc3QgdW5zaGlmdC5cbiAgaWYgKCFzdGF0ZS5lbmRFbWl0dGVkICYmIHN0YXRlLmxlbmd0aCA9PT0gMCkge1xuICAgIHN0YXRlLmVuZEVtaXR0ZWQgPSB0cnVlO1xuICAgIHN0cmVhbS5yZWFkYWJsZSA9IGZhbHNlO1xuICAgIHN0cmVhbS5lbWl0KCdlbmQnKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBmb3JFYWNoKHhzLCBmKSB7XG4gIGZvciAodmFyIGkgPSAwLCBsID0geHMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgZih4c1tpXSwgaSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gaW5kZXhPZih4cywgeCkge1xuICBmb3IgKHZhciBpID0gMCwgbCA9IHhzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgIGlmICh4c1tpXSA9PT0geCkgcmV0dXJuIGk7XG4gIH1cbiAgcmV0dXJuIC0xO1xufSIsIi8vIENvcHlyaWdodCBKb3llbnQsIEluYy4gYW5kIG90aGVyIE5vZGUgY29udHJpYnV0b3JzLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhXG4vLyBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlXG4vLyBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmdcbi8vIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCxcbi8vIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXRcbi8vIHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZVxuLy8gZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWRcbi8vIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1Ncbi8vIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0Zcbi8vIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU5cbi8vIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLFxuLy8gREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SXG4vLyBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFXG4vLyBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuXG4vLyBhIHRyYW5zZm9ybSBzdHJlYW0gaXMgYSByZWFkYWJsZS93cml0YWJsZSBzdHJlYW0gd2hlcmUgeW91IGRvXG4vLyBzb21ldGhpbmcgd2l0aCB0aGUgZGF0YS4gIFNvbWV0aW1lcyBpdCdzIGNhbGxlZCBhIFwiZmlsdGVyXCIsXG4vLyBidXQgdGhhdCdzIG5vdCBhIGdyZWF0IG5hbWUgZm9yIGl0LCBzaW5jZSB0aGF0IGltcGxpZXMgYSB0aGluZyB3aGVyZVxuLy8gc29tZSBiaXRzIHBhc3MgdGhyb3VnaCwgYW5kIG90aGVycyBhcmUgc2ltcGx5IGlnbm9yZWQuICAoVGhhdCB3b3VsZFxuLy8gYmUgYSB2YWxpZCBleGFtcGxlIG9mIGEgdHJhbnNmb3JtLCBvZiBjb3Vyc2UuKVxuLy9cbi8vIFdoaWxlIHRoZSBvdXRwdXQgaXMgY2F1c2FsbHkgcmVsYXRlZCB0byB0aGUgaW5wdXQsIGl0J3Mgbm90IGFcbi8vIG5lY2Vzc2FyaWx5IHN5bW1ldHJpYyBvciBzeW5jaHJvbm91cyB0cmFuc2Zvcm1hdGlvbi4gIEZvciBleGFtcGxlLFxuLy8gYSB6bGliIHN0cmVhbSBtaWdodCB0YWtlIG11bHRpcGxlIHBsYWluLXRleHQgd3JpdGVzKCksIGFuZCB0aGVuXG4vLyBlbWl0IGEgc2luZ2xlIGNvbXByZXNzZWQgY2h1bmsgc29tZSB0aW1lIGluIHRoZSBmdXR1cmUuXG4vL1xuLy8gSGVyZSdzIGhvdyB0aGlzIHdvcmtzOlxuLy9cbi8vIFRoZSBUcmFuc2Zvcm0gc3RyZWFtIGhhcyBhbGwgdGhlIGFzcGVjdHMgb2YgdGhlIHJlYWRhYmxlIGFuZCB3cml0YWJsZVxuLy8gc3RyZWFtIGNsYXNzZXMuICBXaGVuIHlvdSB3cml0ZShjaHVuayksIHRoYXQgY2FsbHMgX3dyaXRlKGNodW5rLGNiKVxuLy8gaW50ZXJuYWxseSwgYW5kIHJldHVybnMgZmFsc2UgaWYgdGhlcmUncyBhIGxvdCBvZiBwZW5kaW5nIHdyaXRlc1xuLy8gYnVmZmVyZWQgdXAuICBXaGVuIHlvdSBjYWxsIHJlYWQoKSwgdGhhdCBjYWxscyBfcmVhZChuKSB1bnRpbFxuLy8gdGhlcmUncyBlbm91Z2ggcGVuZGluZyByZWFkYWJsZSBkYXRhIGJ1ZmZlcmVkIHVwLlxuLy9cbi8vIEluIGEgdHJhbnNmb3JtIHN0cmVhbSwgdGhlIHdyaXR0ZW4gZGF0YSBpcyBwbGFjZWQgaW4gYSBidWZmZXIuICBXaGVuXG4vLyBfcmVhZChuKSBpcyBjYWxsZWQsIGl0IHRyYW5zZm9ybXMgdGhlIHF1ZXVlZCB1cCBkYXRhLCBjYWxsaW5nIHRoZVxuLy8gYnVmZmVyZWQgX3dyaXRlIGNiJ3MgYXMgaXQgY29uc3VtZXMgY2h1bmtzLiAgSWYgY29uc3VtaW5nIGEgc2luZ2xlXG4vLyB3cml0dGVuIGNodW5rIHdvdWxkIHJlc3VsdCBpbiBtdWx0aXBsZSBvdXRwdXQgY2h1bmtzLCB0aGVuIHRoZSBmaXJzdFxuLy8gb3V0cHV0dGVkIGJpdCBjYWxscyB0aGUgcmVhZGNiLCBhbmQgc3Vic2VxdWVudCBjaHVua3MganVzdCBnbyBpbnRvXG4vLyB0aGUgcmVhZCBidWZmZXIsIGFuZCB3aWxsIGNhdXNlIGl0IHRvIGVtaXQgJ3JlYWRhYmxlJyBpZiBuZWNlc3NhcnkuXG4vL1xuLy8gVGhpcyB3YXksIGJhY2stcHJlc3N1cmUgaXMgYWN0dWFsbHkgZGV0ZXJtaW5lZCBieSB0aGUgcmVhZGluZyBzaWRlLFxuLy8gc2luY2UgX3JlYWQgaGFzIHRvIGJlIGNhbGxlZCB0byBzdGFydCBwcm9jZXNzaW5nIGEgbmV3IGNodW5rLiAgSG93ZXZlcixcbi8vIGEgcGF0aG9sb2dpY2FsIGluZmxhdGUgdHlwZSBvZiB0cmFuc2Zvcm0gY2FuIGNhdXNlIGV4Y2Vzc2l2ZSBidWZmZXJpbmdcbi8vIGhlcmUuICBGb3IgZXhhbXBsZSwgaW1hZ2luZSBhIHN0cmVhbSB3aGVyZSBldmVyeSBieXRlIG9mIGlucHV0IGlzXG4vLyBpbnRlcnByZXRlZCBhcyBhbiBpbnRlZ2VyIGZyb20gMC0yNTUsIGFuZCB0aGVuIHJlc3VsdHMgaW4gdGhhdCBtYW55XG4vLyBieXRlcyBvZiBvdXRwdXQuICBXcml0aW5nIHRoZSA0IGJ5dGVzIHtmZixmZixmZixmZn0gd291bGQgcmVzdWx0IGluXG4vLyAxa2Igb2YgZGF0YSBiZWluZyBvdXRwdXQuICBJbiB0aGlzIGNhc2UsIHlvdSBjb3VsZCB3cml0ZSBhIHZlcnkgc21hbGxcbi8vIGFtb3VudCBvZiBpbnB1dCwgYW5kIGVuZCB1cCB3aXRoIGEgdmVyeSBsYXJnZSBhbW91bnQgb2Ygb3V0cHV0LiAgSW5cbi8vIHN1Y2ggYSBwYXRob2xvZ2ljYWwgaW5mbGF0aW5nIG1lY2hhbmlzbSwgdGhlcmUnZCBiZSBubyB3YXkgdG8gdGVsbFxuLy8gdGhlIHN5c3RlbSB0byBzdG9wIGRvaW5nIHRoZSB0cmFuc2Zvcm0uICBBIHNpbmdsZSA0TUIgd3JpdGUgY291bGRcbi8vIGNhdXNlIHRoZSBzeXN0ZW0gdG8gcnVuIG91dCBvZiBtZW1vcnkuXG4vL1xuLy8gSG93ZXZlciwgZXZlbiBpbiBzdWNoIGEgcGF0aG9sb2dpY2FsIGNhc2UsIG9ubHkgYSBzaW5nbGUgd3JpdHRlbiBjaHVua1xuLy8gd291bGQgYmUgY29uc3VtZWQsIGFuZCB0aGVuIHRoZSByZXN0IHdvdWxkIHdhaXQgKHVuLXRyYW5zZm9ybWVkKSB1bnRpbFxuLy8gdGhlIHJlc3VsdHMgb2YgdGhlIHByZXZpb3VzIHRyYW5zZm9ybWVkIGNodW5rIHdlcmUgY29uc3VtZWQuXG5cbid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBUcmFuc2Zvcm07XG5cbnZhciBEdXBsZXggPSByZXF1aXJlKCcuL19zdHJlYW1fZHVwbGV4Jyk7XG5cbi8qPHJlcGxhY2VtZW50PiovXG52YXIgdXRpbCA9IHJlcXVpcmUoJ2NvcmUtdXRpbC1pcycpO1xudXRpbC5pbmhlcml0cyA9IHJlcXVpcmUoJ2luaGVyaXRzJyk7XG4vKjwvcmVwbGFjZW1lbnQ+Ki9cblxudXRpbC5pbmhlcml0cyhUcmFuc2Zvcm0sIER1cGxleCk7XG5cbmZ1bmN0aW9uIFRyYW5zZm9ybVN0YXRlKHN0cmVhbSkge1xuICB0aGlzLmFmdGVyVHJhbnNmb3JtID0gZnVuY3Rpb24gKGVyLCBkYXRhKSB7XG4gICAgcmV0dXJuIGFmdGVyVHJhbnNmb3JtKHN0cmVhbSwgZXIsIGRhdGEpO1xuICB9O1xuXG4gIHRoaXMubmVlZFRyYW5zZm9ybSA9IGZhbHNlO1xuICB0aGlzLnRyYW5zZm9ybWluZyA9IGZhbHNlO1xuICB0aGlzLndyaXRlY2IgPSBudWxsO1xuICB0aGlzLndyaXRlY2h1bmsgPSBudWxsO1xuICB0aGlzLndyaXRlZW5jb2RpbmcgPSBudWxsO1xufVxuXG5mdW5jdGlvbiBhZnRlclRyYW5zZm9ybShzdHJlYW0sIGVyLCBkYXRhKSB7XG4gIHZhciB0cyA9IHN0cmVhbS5fdHJhbnNmb3JtU3RhdGU7XG4gIHRzLnRyYW5zZm9ybWluZyA9IGZhbHNlO1xuXG4gIHZhciBjYiA9IHRzLndyaXRlY2I7XG5cbiAgaWYgKCFjYikge1xuICAgIHJldHVybiBzdHJlYW0uZW1pdCgnZXJyb3InLCBuZXcgRXJyb3IoJ3dyaXRlIGNhbGxiYWNrIGNhbGxlZCBtdWx0aXBsZSB0aW1lcycpKTtcbiAgfVxuXG4gIHRzLndyaXRlY2h1bmsgPSBudWxsO1xuICB0cy53cml0ZWNiID0gbnVsbDtcblxuICBpZiAoZGF0YSAhPT0gbnVsbCAmJiBkYXRhICE9PSB1bmRlZmluZWQpIHN0cmVhbS5wdXNoKGRhdGEpO1xuXG4gIGNiKGVyKTtcblxuICB2YXIgcnMgPSBzdHJlYW0uX3JlYWRhYmxlU3RhdGU7XG4gIHJzLnJlYWRpbmcgPSBmYWxzZTtcbiAgaWYgKHJzLm5lZWRSZWFkYWJsZSB8fCBycy5sZW5ndGggPCBycy5oaWdoV2F0ZXJNYXJrKSB7XG4gICAgc3RyZWFtLl9yZWFkKHJzLmhpZ2hXYXRlck1hcmspO1xuICB9XG59XG5cbmZ1bmN0aW9uIFRyYW5zZm9ybShvcHRpb25zKSB7XG4gIGlmICghKHRoaXMgaW5zdGFuY2VvZiBUcmFuc2Zvcm0pKSByZXR1cm4gbmV3IFRyYW5zZm9ybShvcHRpb25zKTtcblxuICBEdXBsZXguY2FsbCh0aGlzLCBvcHRpb25zKTtcblxuICB0aGlzLl90cmFuc2Zvcm1TdGF0ZSA9IG5ldyBUcmFuc2Zvcm1TdGF0ZSh0aGlzKTtcblxuICB2YXIgc3RyZWFtID0gdGhpcztcblxuICAvLyBzdGFydCBvdXQgYXNraW5nIGZvciBhIHJlYWRhYmxlIGV2ZW50IG9uY2UgZGF0YSBpcyB0cmFuc2Zvcm1lZC5cbiAgdGhpcy5fcmVhZGFibGVTdGF0ZS5uZWVkUmVhZGFibGUgPSB0cnVlO1xuXG4gIC8vIHdlIGhhdmUgaW1wbGVtZW50ZWQgdGhlIF9yZWFkIG1ldGhvZCwgYW5kIGRvbmUgdGhlIG90aGVyIHRoaW5nc1xuICAvLyB0aGF0IFJlYWRhYmxlIHdhbnRzIGJlZm9yZSB0aGUgZmlyc3QgX3JlYWQgY2FsbCwgc28gdW5zZXQgdGhlXG4gIC8vIHN5bmMgZ3VhcmQgZmxhZy5cbiAgdGhpcy5fcmVhZGFibGVTdGF0ZS5zeW5jID0gZmFsc2U7XG5cbiAgaWYgKG9wdGlvbnMpIHtcbiAgICBpZiAodHlwZW9mIG9wdGlvbnMudHJhbnNmb3JtID09PSAnZnVuY3Rpb24nKSB0aGlzLl90cmFuc2Zvcm0gPSBvcHRpb25zLnRyYW5zZm9ybTtcblxuICAgIGlmICh0eXBlb2Ygb3B0aW9ucy5mbHVzaCA9PT0gJ2Z1bmN0aW9uJykgdGhpcy5fZmx1c2ggPSBvcHRpb25zLmZsdXNoO1xuICB9XG5cbiAgLy8gV2hlbiB0aGUgd3JpdGFibGUgc2lkZSBmaW5pc2hlcywgdGhlbiBmbHVzaCBvdXQgYW55dGhpbmcgcmVtYWluaW5nLlxuICB0aGlzLm9uY2UoJ3ByZWZpbmlzaCcsIGZ1bmN0aW9uICgpIHtcbiAgICBpZiAodHlwZW9mIHRoaXMuX2ZsdXNoID09PSAnZnVuY3Rpb24nKSB0aGlzLl9mbHVzaChmdW5jdGlvbiAoZXIsIGRhdGEpIHtcbiAgICAgIGRvbmUoc3RyZWFtLCBlciwgZGF0YSk7XG4gICAgfSk7ZWxzZSBkb25lKHN0cmVhbSk7XG4gIH0pO1xufVxuXG5UcmFuc2Zvcm0ucHJvdG90eXBlLnB1c2ggPSBmdW5jdGlvbiAoY2h1bmssIGVuY29kaW5nKSB7XG4gIHRoaXMuX3RyYW5zZm9ybVN0YXRlLm5lZWRUcmFuc2Zvcm0gPSBmYWxzZTtcbiAgcmV0dXJuIER1cGxleC5wcm90b3R5cGUucHVzaC5jYWxsKHRoaXMsIGNodW5rLCBlbmNvZGluZyk7XG59O1xuXG4vLyBUaGlzIGlzIHRoZSBwYXJ0IHdoZXJlIHlvdSBkbyBzdHVmZiFcbi8vIG92ZXJyaWRlIHRoaXMgZnVuY3Rpb24gaW4gaW1wbGVtZW50YXRpb24gY2xhc3Nlcy5cbi8vICdjaHVuaycgaXMgYW4gaW5wdXQgY2h1bmsuXG4vL1xuLy8gQ2FsbCBgcHVzaChuZXdDaHVuaylgIHRvIHBhc3MgYWxvbmcgdHJhbnNmb3JtZWQgb3V0cHV0XG4vLyB0byB0aGUgcmVhZGFibGUgc2lkZS4gIFlvdSBtYXkgY2FsbCAncHVzaCcgemVybyBvciBtb3JlIHRpbWVzLlxuLy9cbi8vIENhbGwgYGNiKGVycilgIHdoZW4geW91IGFyZSBkb25lIHdpdGggdGhpcyBjaHVuay4gIElmIHlvdSBwYXNzXG4vLyBhbiBlcnJvciwgdGhlbiB0aGF0J2xsIHB1dCB0aGUgaHVydCBvbiB0aGUgd2hvbGUgb3BlcmF0aW9uLiAgSWYgeW91XG4vLyBuZXZlciBjYWxsIGNiKCksIHRoZW4geW91J2xsIG5ldmVyIGdldCBhbm90aGVyIGNodW5rLlxuVHJhbnNmb3JtLnByb3RvdHlwZS5fdHJhbnNmb3JtID0gZnVuY3Rpb24gKGNodW5rLCBlbmNvZGluZywgY2IpIHtcbiAgdGhyb3cgbmV3IEVycm9yKCdfdHJhbnNmb3JtKCkgaXMgbm90IGltcGxlbWVudGVkJyk7XG59O1xuXG5UcmFuc2Zvcm0ucHJvdG90eXBlLl93cml0ZSA9IGZ1bmN0aW9uIChjaHVuaywgZW5jb2RpbmcsIGNiKSB7XG4gIHZhciB0cyA9IHRoaXMuX3RyYW5zZm9ybVN0YXRlO1xuICB0cy53cml0ZWNiID0gY2I7XG4gIHRzLndyaXRlY2h1bmsgPSBjaHVuaztcbiAgdHMud3JpdGVlbmNvZGluZyA9IGVuY29kaW5nO1xuICBpZiAoIXRzLnRyYW5zZm9ybWluZykge1xuICAgIHZhciBycyA9IHRoaXMuX3JlYWRhYmxlU3RhdGU7XG4gICAgaWYgKHRzLm5lZWRUcmFuc2Zvcm0gfHwgcnMubmVlZFJlYWRhYmxlIHx8IHJzLmxlbmd0aCA8IHJzLmhpZ2hXYXRlck1hcmspIHRoaXMuX3JlYWQocnMuaGlnaFdhdGVyTWFyayk7XG4gIH1cbn07XG5cbi8vIERvZXNuJ3QgbWF0dGVyIHdoYXQgdGhlIGFyZ3MgYXJlIGhlcmUuXG4vLyBfdHJhbnNmb3JtIGRvZXMgYWxsIHRoZSB3b3JrLlxuLy8gVGhhdCB3ZSBnb3QgaGVyZSBtZWFucyB0aGF0IHRoZSByZWFkYWJsZSBzaWRlIHdhbnRzIG1vcmUgZGF0YS5cblRyYW5zZm9ybS5wcm90b3R5cGUuX3JlYWQgPSBmdW5jdGlvbiAobikge1xuICB2YXIgdHMgPSB0aGlzLl90cmFuc2Zvcm1TdGF0ZTtcblxuICBpZiAodHMud3JpdGVjaHVuayAhPT0gbnVsbCAmJiB0cy53cml0ZWNiICYmICF0cy50cmFuc2Zvcm1pbmcpIHtcbiAgICB0cy50cmFuc2Zvcm1pbmcgPSB0cnVlO1xuICAgIHRoaXMuX3RyYW5zZm9ybSh0cy53cml0ZWNodW5rLCB0cy53cml0ZWVuY29kaW5nLCB0cy5hZnRlclRyYW5zZm9ybSk7XG4gIH0gZWxzZSB7XG4gICAgLy8gbWFyayB0aGF0IHdlIG5lZWQgYSB0cmFuc2Zvcm0sIHNvIHRoYXQgYW55IGRhdGEgdGhhdCBjb21lcyBpblxuICAgIC8vIHdpbGwgZ2V0IHByb2Nlc3NlZCwgbm93IHRoYXQgd2UndmUgYXNrZWQgZm9yIGl0LlxuICAgIHRzLm5lZWRUcmFuc2Zvcm0gPSB0cnVlO1xuICB9XG59O1xuXG5UcmFuc2Zvcm0ucHJvdG90eXBlLl9kZXN0cm95ID0gZnVuY3Rpb24gKGVyciwgY2IpIHtcbiAgdmFyIF90aGlzID0gdGhpcztcblxuICBEdXBsZXgucHJvdG90eXBlLl9kZXN0cm95LmNhbGwodGhpcywgZXJyLCBmdW5jdGlvbiAoZXJyMikge1xuICAgIGNiKGVycjIpO1xuICAgIF90aGlzLmVtaXQoJ2Nsb3NlJyk7XG4gIH0pO1xufTtcblxuZnVuY3Rpb24gZG9uZShzdHJlYW0sIGVyLCBkYXRhKSB7XG4gIGlmIChlcikgcmV0dXJuIHN0cmVhbS5lbWl0KCdlcnJvcicsIGVyKTtcblxuICBpZiAoZGF0YSAhPT0gbnVsbCAmJiBkYXRhICE9PSB1bmRlZmluZWQpIHN0cmVhbS5wdXNoKGRhdGEpO1xuXG4gIC8vIGlmIHRoZXJlJ3Mgbm90aGluZyBpbiB0aGUgd3JpdGUgYnVmZmVyLCB0aGVuIHRoYXQgbWVhbnNcbiAgLy8gdGhhdCBub3RoaW5nIG1vcmUgd2lsbCBldmVyIGJlIHByb3ZpZGVkXG4gIHZhciB3cyA9IHN0cmVhbS5fd3JpdGFibGVTdGF0ZTtcbiAgdmFyIHRzID0gc3RyZWFtLl90cmFuc2Zvcm1TdGF0ZTtcblxuICBpZiAod3MubGVuZ3RoKSB0aHJvdyBuZXcgRXJyb3IoJ0NhbGxpbmcgdHJhbnNmb3JtIGRvbmUgd2hlbiB3cy5sZW5ndGggIT0gMCcpO1xuXG4gIGlmICh0cy50cmFuc2Zvcm1pbmcpIHRocm93IG5ldyBFcnJvcignQ2FsbGluZyB0cmFuc2Zvcm0gZG9uZSB3aGVuIHN0aWxsIHRyYW5zZm9ybWluZycpO1xuXG4gIHJldHVybiBzdHJlYW0ucHVzaChudWxsKTtcbn0iLCIvLyBDb3B5cmlnaHQgSm95ZW50LCBJbmMuIGFuZCBvdGhlciBOb2RlIGNvbnRyaWJ1dG9ycy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYVxuLy8gY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZVxuLy8gXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nXG4vLyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsXG4vLyBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0XG4vLyBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGVcbi8vIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkXG4vLyBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTXG4vLyBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GXG4vLyBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOXG4vLyBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSxcbi8vIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUlxuLy8gT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRVxuLy8gVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cblxuLy8gQSBiaXQgc2ltcGxlciB0aGFuIHJlYWRhYmxlIHN0cmVhbXMuXG4vLyBJbXBsZW1lbnQgYW4gYXN5bmMgLl93cml0ZShjaHVuaywgZW5jb2RpbmcsIGNiKSwgYW5kIGl0J2xsIGhhbmRsZSBhbGxcbi8vIHRoZSBkcmFpbiBldmVudCBlbWlzc2lvbiBhbmQgYnVmZmVyaW5nLlxuXG4ndXNlIHN0cmljdCc7XG5cbi8qPHJlcGxhY2VtZW50PiovXG5cbnZhciBwcm9jZXNzTmV4dFRpY2sgPSByZXF1aXJlKCdwcm9jZXNzLW5leHRpY2stYXJncycpO1xuLyo8L3JlcGxhY2VtZW50PiovXG5cbm1vZHVsZS5leHBvcnRzID0gV3JpdGFibGU7XG5cbi8qIDxyZXBsYWNlbWVudD4gKi9cbmZ1bmN0aW9uIFdyaXRlUmVxKGNodW5rLCBlbmNvZGluZywgY2IpIHtcbiAgdGhpcy5jaHVuayA9IGNodW5rO1xuICB0aGlzLmVuY29kaW5nID0gZW5jb2Rpbmc7XG4gIHRoaXMuY2FsbGJhY2sgPSBjYjtcbiAgdGhpcy5uZXh0ID0gbnVsbDtcbn1cblxuLy8gSXQgc2VlbXMgYSBsaW5rZWQgbGlzdCBidXQgaXQgaXMgbm90XG4vLyB0aGVyZSB3aWxsIGJlIG9ubHkgMiBvZiB0aGVzZSBmb3IgZWFjaCBzdHJlYW1cbmZ1bmN0aW9uIENvcmtlZFJlcXVlc3Qoc3RhdGUpIHtcbiAgdmFyIF90aGlzID0gdGhpcztcblxuICB0aGlzLm5leHQgPSBudWxsO1xuICB0aGlzLmVudHJ5ID0gbnVsbDtcbiAgdGhpcy5maW5pc2ggPSBmdW5jdGlvbiAoKSB7XG4gICAgb25Db3JrZWRGaW5pc2goX3RoaXMsIHN0YXRlKTtcbiAgfTtcbn1cbi8qIDwvcmVwbGFjZW1lbnQ+ICovXG5cbi8qPHJlcGxhY2VtZW50PiovXG52YXIgYXN5bmNXcml0ZSA9ICFwcm9jZXNzLmJyb3dzZXIgJiYgWyd2MC4xMCcsICd2MC45LiddLmluZGV4T2YocHJvY2Vzcy52ZXJzaW9uLnNsaWNlKDAsIDUpKSA+IC0xID8gc2V0SW1tZWRpYXRlIDogcHJvY2Vzc05leHRUaWNrO1xuLyo8L3JlcGxhY2VtZW50PiovXG5cbi8qPHJlcGxhY2VtZW50PiovXG52YXIgRHVwbGV4O1xuLyo8L3JlcGxhY2VtZW50PiovXG5cbldyaXRhYmxlLldyaXRhYmxlU3RhdGUgPSBXcml0YWJsZVN0YXRlO1xuXG4vKjxyZXBsYWNlbWVudD4qL1xudmFyIHV0aWwgPSByZXF1aXJlKCdjb3JlLXV0aWwtaXMnKTtcbnV0aWwuaW5oZXJpdHMgPSByZXF1aXJlKCdpbmhlcml0cycpO1xuLyo8L3JlcGxhY2VtZW50PiovXG5cbi8qPHJlcGxhY2VtZW50PiovXG52YXIgaW50ZXJuYWxVdGlsID0ge1xuICBkZXByZWNhdGU6IHJlcXVpcmUoJ3V0aWwtZGVwcmVjYXRlJylcbn07XG4vKjwvcmVwbGFjZW1lbnQ+Ki9cblxuLyo8cmVwbGFjZW1lbnQ+Ki9cbnZhciBTdHJlYW0gPSByZXF1aXJlKCcuL2ludGVybmFsL3N0cmVhbXMvc3RyZWFtJyk7XG4vKjwvcmVwbGFjZW1lbnQ+Ki9cblxuLyo8cmVwbGFjZW1lbnQ+Ki9cbnZhciBCdWZmZXIgPSByZXF1aXJlKCdzYWZlLWJ1ZmZlcicpLkJ1ZmZlcjtcbnZhciBPdXJVaW50OEFycmF5ID0gZ2xvYmFsLlVpbnQ4QXJyYXkgfHwgZnVuY3Rpb24gKCkge307XG5mdW5jdGlvbiBfdWludDhBcnJheVRvQnVmZmVyKGNodW5rKSB7XG4gIHJldHVybiBCdWZmZXIuZnJvbShjaHVuayk7XG59XG5mdW5jdGlvbiBfaXNVaW50OEFycmF5KG9iaikge1xuICByZXR1cm4gQnVmZmVyLmlzQnVmZmVyKG9iaikgfHwgb2JqIGluc3RhbmNlb2YgT3VyVWludDhBcnJheTtcbn1cbi8qPC9yZXBsYWNlbWVudD4qL1xuXG52YXIgZGVzdHJveUltcGwgPSByZXF1aXJlKCcuL2ludGVybmFsL3N0cmVhbXMvZGVzdHJveScpO1xuXG51dGlsLmluaGVyaXRzKFdyaXRhYmxlLCBTdHJlYW0pO1xuXG5mdW5jdGlvbiBub3AoKSB7fVxuXG5mdW5jdGlvbiBXcml0YWJsZVN0YXRlKG9wdGlvbnMsIHN0cmVhbSkge1xuICBEdXBsZXggPSBEdXBsZXggfHwgcmVxdWlyZSgnLi9fc3RyZWFtX2R1cGxleCcpO1xuXG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG4gIC8vIG9iamVjdCBzdHJlYW0gZmxhZyB0byBpbmRpY2F0ZSB3aGV0aGVyIG9yIG5vdCB0aGlzIHN0cmVhbVxuICAvLyBjb250YWlucyBidWZmZXJzIG9yIG9iamVjdHMuXG4gIHRoaXMub2JqZWN0TW9kZSA9ICEhb3B0aW9ucy5vYmplY3RNb2RlO1xuXG4gIGlmIChzdHJlYW0gaW5zdGFuY2VvZiBEdXBsZXgpIHRoaXMub2JqZWN0TW9kZSA9IHRoaXMub2JqZWN0TW9kZSB8fCAhIW9wdGlvbnMud3JpdGFibGVPYmplY3RNb2RlO1xuXG4gIC8vIHRoZSBwb2ludCBhdCB3aGljaCB3cml0ZSgpIHN0YXJ0cyByZXR1cm5pbmcgZmFsc2VcbiAgLy8gTm90ZTogMCBpcyBhIHZhbGlkIHZhbHVlLCBtZWFucyB0aGF0IHdlIGFsd2F5cyByZXR1cm4gZmFsc2UgaWZcbiAgLy8gdGhlIGVudGlyZSBidWZmZXIgaXMgbm90IGZsdXNoZWQgaW1tZWRpYXRlbHkgb24gd3JpdGUoKVxuICB2YXIgaHdtID0gb3B0aW9ucy5oaWdoV2F0ZXJNYXJrO1xuICB2YXIgZGVmYXVsdEh3bSA9IHRoaXMub2JqZWN0TW9kZSA/IDE2IDogMTYgKiAxMDI0O1xuICB0aGlzLmhpZ2hXYXRlck1hcmsgPSBod20gfHwgaHdtID09PSAwID8gaHdtIDogZGVmYXVsdEh3bTtcblxuICAvLyBjYXN0IHRvIGludHMuXG4gIHRoaXMuaGlnaFdhdGVyTWFyayA9IE1hdGguZmxvb3IodGhpcy5oaWdoV2F0ZXJNYXJrKTtcblxuICAvLyBpZiBfZmluYWwgaGFzIGJlZW4gY2FsbGVkXG4gIHRoaXMuZmluYWxDYWxsZWQgPSBmYWxzZTtcblxuICAvLyBkcmFpbiBldmVudCBmbGFnLlxuICB0aGlzLm5lZWREcmFpbiA9IGZhbHNlO1xuICAvLyBhdCB0aGUgc3RhcnQgb2YgY2FsbGluZyBlbmQoKVxuICB0aGlzLmVuZGluZyA9IGZhbHNlO1xuICAvLyB3aGVuIGVuZCgpIGhhcyBiZWVuIGNhbGxlZCwgYW5kIHJldHVybmVkXG4gIHRoaXMuZW5kZWQgPSBmYWxzZTtcbiAgLy8gd2hlbiAnZmluaXNoJyBpcyBlbWl0dGVkXG4gIHRoaXMuZmluaXNoZWQgPSBmYWxzZTtcblxuICAvLyBoYXMgaXQgYmVlbiBkZXN0cm95ZWRcbiAgdGhpcy5kZXN0cm95ZWQgPSBmYWxzZTtcblxuICAvLyBzaG91bGQgd2UgZGVjb2RlIHN0cmluZ3MgaW50byBidWZmZXJzIGJlZm9yZSBwYXNzaW5nIHRvIF93cml0ZT9cbiAgLy8gdGhpcyBpcyBoZXJlIHNvIHRoYXQgc29tZSBub2RlLWNvcmUgc3RyZWFtcyBjYW4gb3B0aW1pemUgc3RyaW5nXG4gIC8vIGhhbmRsaW5nIGF0IGEgbG93ZXIgbGV2ZWwuXG4gIHZhciBub0RlY29kZSA9IG9wdGlvbnMuZGVjb2RlU3RyaW5ncyA9PT0gZmFsc2U7XG4gIHRoaXMuZGVjb2RlU3RyaW5ncyA9ICFub0RlY29kZTtcblxuICAvLyBDcnlwdG8gaXMga2luZCBvZiBvbGQgYW5kIGNydXN0eS4gIEhpc3RvcmljYWxseSwgaXRzIGRlZmF1bHQgc3RyaW5nXG4gIC8vIGVuY29kaW5nIGlzICdiaW5hcnknIHNvIHdlIGhhdmUgdG8gbWFrZSB0aGlzIGNvbmZpZ3VyYWJsZS5cbiAgLy8gRXZlcnl0aGluZyBlbHNlIGluIHRoZSB1bml2ZXJzZSB1c2VzICd1dGY4JywgdGhvdWdoLlxuICB0aGlzLmRlZmF1bHRFbmNvZGluZyA9IG9wdGlvbnMuZGVmYXVsdEVuY29kaW5nIHx8ICd1dGY4JztcblxuICAvLyBub3QgYW4gYWN0dWFsIGJ1ZmZlciB3ZSBrZWVwIHRyYWNrIG9mLCBidXQgYSBtZWFzdXJlbWVudFxuICAvLyBvZiBob3cgbXVjaCB3ZSdyZSB3YWl0aW5nIHRvIGdldCBwdXNoZWQgdG8gc29tZSB1bmRlcmx5aW5nXG4gIC8vIHNvY2tldCBvciBmaWxlLlxuICB0aGlzLmxlbmd0aCA9IDA7XG5cbiAgLy8gYSBmbGFnIHRvIHNlZSB3aGVuIHdlJ3JlIGluIHRoZSBtaWRkbGUgb2YgYSB3cml0ZS5cbiAgdGhpcy53cml0aW5nID0gZmFsc2U7XG5cbiAgLy8gd2hlbiB0cnVlIGFsbCB3cml0ZXMgd2lsbCBiZSBidWZmZXJlZCB1bnRpbCAudW5jb3JrKCkgY2FsbFxuICB0aGlzLmNvcmtlZCA9IDA7XG5cbiAgLy8gYSBmbGFnIHRvIGJlIGFibGUgdG8gdGVsbCBpZiB0aGUgb253cml0ZSBjYiBpcyBjYWxsZWQgaW1tZWRpYXRlbHksXG4gIC8vIG9yIG9uIGEgbGF0ZXIgdGljay4gIFdlIHNldCB0aGlzIHRvIHRydWUgYXQgZmlyc3QsIGJlY2F1c2UgYW55XG4gIC8vIGFjdGlvbnMgdGhhdCBzaG91bGRuJ3QgaGFwcGVuIHVudGlsIFwibGF0ZXJcIiBzaG91bGQgZ2VuZXJhbGx5IGFsc29cbiAgLy8gbm90IGhhcHBlbiBiZWZvcmUgdGhlIGZpcnN0IHdyaXRlIGNhbGwuXG4gIHRoaXMuc3luYyA9IHRydWU7XG5cbiAgLy8gYSBmbGFnIHRvIGtub3cgaWYgd2UncmUgcHJvY2Vzc2luZyBwcmV2aW91c2x5IGJ1ZmZlcmVkIGl0ZW1zLCB3aGljaFxuICAvLyBtYXkgY2FsbCB0aGUgX3dyaXRlKCkgY2FsbGJhY2sgaW4gdGhlIHNhbWUgdGljaywgc28gdGhhdCB3ZSBkb24ndFxuICAvLyBlbmQgdXAgaW4gYW4gb3ZlcmxhcHBlZCBvbndyaXRlIHNpdHVhdGlvbi5cbiAgdGhpcy5idWZmZXJQcm9jZXNzaW5nID0gZmFsc2U7XG5cbiAgLy8gdGhlIGNhbGxiYWNrIHRoYXQncyBwYXNzZWQgdG8gX3dyaXRlKGNodW5rLGNiKVxuICB0aGlzLm9ud3JpdGUgPSBmdW5jdGlvbiAoZXIpIHtcbiAgICBvbndyaXRlKHN0cmVhbSwgZXIpO1xuICB9O1xuXG4gIC8vIHRoZSBjYWxsYmFjayB0aGF0IHRoZSB1c2VyIHN1cHBsaWVzIHRvIHdyaXRlKGNodW5rLGVuY29kaW5nLGNiKVxuICB0aGlzLndyaXRlY2IgPSBudWxsO1xuXG4gIC8vIHRoZSBhbW91bnQgdGhhdCBpcyBiZWluZyB3cml0dGVuIHdoZW4gX3dyaXRlIGlzIGNhbGxlZC5cbiAgdGhpcy53cml0ZWxlbiA9IDA7XG5cbiAgdGhpcy5idWZmZXJlZFJlcXVlc3QgPSBudWxsO1xuICB0aGlzLmxhc3RCdWZmZXJlZFJlcXVlc3QgPSBudWxsO1xuXG4gIC8vIG51bWJlciBvZiBwZW5kaW5nIHVzZXItc3VwcGxpZWQgd3JpdGUgY2FsbGJhY2tzXG4gIC8vIHRoaXMgbXVzdCBiZSAwIGJlZm9yZSAnZmluaXNoJyBjYW4gYmUgZW1pdHRlZFxuICB0aGlzLnBlbmRpbmdjYiA9IDA7XG5cbiAgLy8gZW1pdCBwcmVmaW5pc2ggaWYgdGhlIG9ubHkgdGhpbmcgd2UncmUgd2FpdGluZyBmb3IgaXMgX3dyaXRlIGNic1xuICAvLyBUaGlzIGlzIHJlbGV2YW50IGZvciBzeW5jaHJvbm91cyBUcmFuc2Zvcm0gc3RyZWFtc1xuICB0aGlzLnByZWZpbmlzaGVkID0gZmFsc2U7XG5cbiAgLy8gVHJ1ZSBpZiB0aGUgZXJyb3Igd2FzIGFscmVhZHkgZW1pdHRlZCBhbmQgc2hvdWxkIG5vdCBiZSB0aHJvd24gYWdhaW5cbiAgdGhpcy5lcnJvckVtaXR0ZWQgPSBmYWxzZTtcblxuICAvLyBjb3VudCBidWZmZXJlZCByZXF1ZXN0c1xuICB0aGlzLmJ1ZmZlcmVkUmVxdWVzdENvdW50ID0gMDtcblxuICAvLyBhbGxvY2F0ZSB0aGUgZmlyc3QgQ29ya2VkUmVxdWVzdCwgdGhlcmUgaXMgYWx3YXlzXG4gIC8vIG9uZSBhbGxvY2F0ZWQgYW5kIGZyZWUgdG8gdXNlLCBhbmQgd2UgbWFpbnRhaW4gYXQgbW9zdCB0d29cbiAgdGhpcy5jb3JrZWRSZXF1ZXN0c0ZyZWUgPSBuZXcgQ29ya2VkUmVxdWVzdCh0aGlzKTtcbn1cblxuV3JpdGFibGVTdGF0ZS5wcm90b3R5cGUuZ2V0QnVmZmVyID0gZnVuY3Rpb24gZ2V0QnVmZmVyKCkge1xuICB2YXIgY3VycmVudCA9IHRoaXMuYnVmZmVyZWRSZXF1ZXN0O1xuICB2YXIgb3V0ID0gW107XG4gIHdoaWxlIChjdXJyZW50KSB7XG4gICAgb3V0LnB1c2goY3VycmVudCk7XG4gICAgY3VycmVudCA9IGN1cnJlbnQubmV4dDtcbiAgfVxuICByZXR1cm4gb3V0O1xufTtcblxuKGZ1bmN0aW9uICgpIHtcbiAgdHJ5IHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoV3JpdGFibGVTdGF0ZS5wcm90b3R5cGUsICdidWZmZXInLCB7XG4gICAgICBnZXQ6IGludGVybmFsVXRpbC5kZXByZWNhdGUoZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRCdWZmZXIoKTtcbiAgICAgIH0sICdfd3JpdGFibGVTdGF0ZS5idWZmZXIgaXMgZGVwcmVjYXRlZC4gVXNlIF93cml0YWJsZVN0YXRlLmdldEJ1ZmZlciAnICsgJ2luc3RlYWQuJywgJ0RFUDAwMDMnKVxuICAgIH0pO1xuICB9IGNhdGNoIChfKSB7fVxufSkoKTtcblxuLy8gVGVzdCBfd3JpdGFibGVTdGF0ZSBmb3IgaW5oZXJpdGFuY2UgdG8gYWNjb3VudCBmb3IgRHVwbGV4IHN0cmVhbXMsXG4vLyB3aG9zZSBwcm90b3R5cGUgY2hhaW4gb25seSBwb2ludHMgdG8gUmVhZGFibGUuXG52YXIgcmVhbEhhc0luc3RhbmNlO1xuaWYgKHR5cGVvZiBTeW1ib2wgPT09ICdmdW5jdGlvbicgJiYgU3ltYm9sLmhhc0luc3RhbmNlICYmIHR5cGVvZiBGdW5jdGlvbi5wcm90b3R5cGVbU3ltYm9sLmhhc0luc3RhbmNlXSA9PT0gJ2Z1bmN0aW9uJykge1xuICByZWFsSGFzSW5zdGFuY2UgPSBGdW5jdGlvbi5wcm90b3R5cGVbU3ltYm9sLmhhc0luc3RhbmNlXTtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFdyaXRhYmxlLCBTeW1ib2wuaGFzSW5zdGFuY2UsIHtcbiAgICB2YWx1ZTogZnVuY3Rpb24gKG9iamVjdCkge1xuICAgICAgaWYgKHJlYWxIYXNJbnN0YW5jZS5jYWxsKHRoaXMsIG9iamVjdCkpIHJldHVybiB0cnVlO1xuXG4gICAgICByZXR1cm4gb2JqZWN0ICYmIG9iamVjdC5fd3JpdGFibGVTdGF0ZSBpbnN0YW5jZW9mIFdyaXRhYmxlU3RhdGU7XG4gICAgfVxuICB9KTtcbn0gZWxzZSB7XG4gIHJlYWxIYXNJbnN0YW5jZSA9IGZ1bmN0aW9uIChvYmplY3QpIHtcbiAgICByZXR1cm4gb2JqZWN0IGluc3RhbmNlb2YgdGhpcztcbiAgfTtcbn1cblxuZnVuY3Rpb24gV3JpdGFibGUob3B0aW9ucykge1xuICBEdXBsZXggPSBEdXBsZXggfHwgcmVxdWlyZSgnLi9fc3RyZWFtX2R1cGxleCcpO1xuXG4gIC8vIFdyaXRhYmxlIGN0b3IgaXMgYXBwbGllZCB0byBEdXBsZXhlcywgdG9vLlxuICAvLyBgcmVhbEhhc0luc3RhbmNlYCBpcyBuZWNlc3NhcnkgYmVjYXVzZSB1c2luZyBwbGFpbiBgaW5zdGFuY2VvZmBcbiAgLy8gd291bGQgcmV0dXJuIGZhbHNlLCBhcyBubyBgX3dyaXRhYmxlU3RhdGVgIHByb3BlcnR5IGlzIGF0dGFjaGVkLlxuXG4gIC8vIFRyeWluZyB0byB1c2UgdGhlIGN1c3RvbSBgaW5zdGFuY2VvZmAgZm9yIFdyaXRhYmxlIGhlcmUgd2lsbCBhbHNvIGJyZWFrIHRoZVxuICAvLyBOb2RlLmpzIExhenlUcmFuc2Zvcm0gaW1wbGVtZW50YXRpb24sIHdoaWNoIGhhcyBhIG5vbi10cml2aWFsIGdldHRlciBmb3JcbiAgLy8gYF93cml0YWJsZVN0YXRlYCB0aGF0IHdvdWxkIGxlYWQgdG8gaW5maW5pdGUgcmVjdXJzaW9uLlxuICBpZiAoIXJlYWxIYXNJbnN0YW5jZS5jYWxsKFdyaXRhYmxlLCB0aGlzKSAmJiAhKHRoaXMgaW5zdGFuY2VvZiBEdXBsZXgpKSB7XG4gICAgcmV0dXJuIG5ldyBXcml0YWJsZShvcHRpb25zKTtcbiAgfVxuXG4gIHRoaXMuX3dyaXRhYmxlU3RhdGUgPSBuZXcgV3JpdGFibGVTdGF0ZShvcHRpb25zLCB0aGlzKTtcblxuICAvLyBsZWdhY3kuXG4gIHRoaXMud3JpdGFibGUgPSB0cnVlO1xuXG4gIGlmIChvcHRpb25zKSB7XG4gICAgaWYgKHR5cGVvZiBvcHRpb25zLndyaXRlID09PSAnZnVuY3Rpb24nKSB0aGlzLl93cml0ZSA9IG9wdGlvbnMud3JpdGU7XG5cbiAgICBpZiAodHlwZW9mIG9wdGlvbnMud3JpdGV2ID09PSAnZnVuY3Rpb24nKSB0aGlzLl93cml0ZXYgPSBvcHRpb25zLndyaXRldjtcblxuICAgIGlmICh0eXBlb2Ygb3B0aW9ucy5kZXN0cm95ID09PSAnZnVuY3Rpb24nKSB0aGlzLl9kZXN0cm95ID0gb3B0aW9ucy5kZXN0cm95O1xuXG4gICAgaWYgKHR5cGVvZiBvcHRpb25zLmZpbmFsID09PSAnZnVuY3Rpb24nKSB0aGlzLl9maW5hbCA9IG9wdGlvbnMuZmluYWw7XG4gIH1cblxuICBTdHJlYW0uY2FsbCh0aGlzKTtcbn1cblxuLy8gT3RoZXJ3aXNlIHBlb3BsZSBjYW4gcGlwZSBXcml0YWJsZSBzdHJlYW1zLCB3aGljaCBpcyBqdXN0IHdyb25nLlxuV3JpdGFibGUucHJvdG90eXBlLnBpcGUgPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMuZW1pdCgnZXJyb3InLCBuZXcgRXJyb3IoJ0Nhbm5vdCBwaXBlLCBub3QgcmVhZGFibGUnKSk7XG59O1xuXG5mdW5jdGlvbiB3cml0ZUFmdGVyRW5kKHN0cmVhbSwgY2IpIHtcbiAgdmFyIGVyID0gbmV3IEVycm9yKCd3cml0ZSBhZnRlciBlbmQnKTtcbiAgLy8gVE9ETzogZGVmZXIgZXJyb3IgZXZlbnRzIGNvbnNpc3RlbnRseSBldmVyeXdoZXJlLCBub3QganVzdCB0aGUgY2JcbiAgc3RyZWFtLmVtaXQoJ2Vycm9yJywgZXIpO1xuICBwcm9jZXNzTmV4dFRpY2soY2IsIGVyKTtcbn1cblxuLy8gQ2hlY2tzIHRoYXQgYSB1c2VyLXN1cHBsaWVkIGNodW5rIGlzIHZhbGlkLCBlc3BlY2lhbGx5IGZvciB0aGUgcGFydGljdWxhclxuLy8gbW9kZSB0aGUgc3RyZWFtIGlzIGluLiBDdXJyZW50bHkgdGhpcyBtZWFucyB0aGF0IGBudWxsYCBpcyBuZXZlciBhY2NlcHRlZFxuLy8gYW5kIHVuZGVmaW5lZC9ub24tc3RyaW5nIHZhbHVlcyBhcmUgb25seSBhbGxvd2VkIGluIG9iamVjdCBtb2RlLlxuZnVuY3Rpb24gdmFsaWRDaHVuayhzdHJlYW0sIHN0YXRlLCBjaHVuaywgY2IpIHtcbiAgdmFyIHZhbGlkID0gdHJ1ZTtcbiAgdmFyIGVyID0gZmFsc2U7XG5cbiAgaWYgKGNodW5rID09PSBudWxsKSB7XG4gICAgZXIgPSBuZXcgVHlwZUVycm9yKCdNYXkgbm90IHdyaXRlIG51bGwgdmFsdWVzIHRvIHN0cmVhbScpO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBjaHVuayAhPT0gJ3N0cmluZycgJiYgY2h1bmsgIT09IHVuZGVmaW5lZCAmJiAhc3RhdGUub2JqZWN0TW9kZSkge1xuICAgIGVyID0gbmV3IFR5cGVFcnJvcignSW52YWxpZCBub24tc3RyaW5nL2J1ZmZlciBjaHVuaycpO1xuICB9XG4gIGlmIChlcikge1xuICAgIHN0cmVhbS5lbWl0KCdlcnJvcicsIGVyKTtcbiAgICBwcm9jZXNzTmV4dFRpY2soY2IsIGVyKTtcbiAgICB2YWxpZCA9IGZhbHNlO1xuICB9XG4gIHJldHVybiB2YWxpZDtcbn1cblxuV3JpdGFibGUucHJvdG90eXBlLndyaXRlID0gZnVuY3Rpb24gKGNodW5rLCBlbmNvZGluZywgY2IpIHtcbiAgdmFyIHN0YXRlID0gdGhpcy5fd3JpdGFibGVTdGF0ZTtcbiAgdmFyIHJldCA9IGZhbHNlO1xuICB2YXIgaXNCdWYgPSBfaXNVaW50OEFycmF5KGNodW5rKSAmJiAhc3RhdGUub2JqZWN0TW9kZTtcblxuICBpZiAoaXNCdWYgJiYgIUJ1ZmZlci5pc0J1ZmZlcihjaHVuaykpIHtcbiAgICBjaHVuayA9IF91aW50OEFycmF5VG9CdWZmZXIoY2h1bmspO1xuICB9XG5cbiAgaWYgKHR5cGVvZiBlbmNvZGluZyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGNiID0gZW5jb2Rpbmc7XG4gICAgZW5jb2RpbmcgPSBudWxsO1xuICB9XG5cbiAgaWYgKGlzQnVmKSBlbmNvZGluZyA9ICdidWZmZXInO2Vsc2UgaWYgKCFlbmNvZGluZykgZW5jb2RpbmcgPSBzdGF0ZS5kZWZhdWx0RW5jb2Rpbmc7XG5cbiAgaWYgKHR5cGVvZiBjYiAhPT0gJ2Z1bmN0aW9uJykgY2IgPSBub3A7XG5cbiAgaWYgKHN0YXRlLmVuZGVkKSB3cml0ZUFmdGVyRW5kKHRoaXMsIGNiKTtlbHNlIGlmIChpc0J1ZiB8fCB2YWxpZENodW5rKHRoaXMsIHN0YXRlLCBjaHVuaywgY2IpKSB7XG4gICAgc3RhdGUucGVuZGluZ2NiKys7XG4gICAgcmV0ID0gd3JpdGVPckJ1ZmZlcih0aGlzLCBzdGF0ZSwgaXNCdWYsIGNodW5rLCBlbmNvZGluZywgY2IpO1xuICB9XG5cbiAgcmV0dXJuIHJldDtcbn07XG5cbldyaXRhYmxlLnByb3RvdHlwZS5jb3JrID0gZnVuY3Rpb24gKCkge1xuICB2YXIgc3RhdGUgPSB0aGlzLl93cml0YWJsZVN0YXRlO1xuXG4gIHN0YXRlLmNvcmtlZCsrO1xufTtcblxuV3JpdGFibGUucHJvdG90eXBlLnVuY29yayA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIHN0YXRlID0gdGhpcy5fd3JpdGFibGVTdGF0ZTtcblxuICBpZiAoc3RhdGUuY29ya2VkKSB7XG4gICAgc3RhdGUuY29ya2VkLS07XG5cbiAgICBpZiAoIXN0YXRlLndyaXRpbmcgJiYgIXN0YXRlLmNvcmtlZCAmJiAhc3RhdGUuZmluaXNoZWQgJiYgIXN0YXRlLmJ1ZmZlclByb2Nlc3NpbmcgJiYgc3RhdGUuYnVmZmVyZWRSZXF1ZXN0KSBjbGVhckJ1ZmZlcih0aGlzLCBzdGF0ZSk7XG4gIH1cbn07XG5cbldyaXRhYmxlLnByb3RvdHlwZS5zZXREZWZhdWx0RW5jb2RpbmcgPSBmdW5jdGlvbiBzZXREZWZhdWx0RW5jb2RpbmcoZW5jb2RpbmcpIHtcbiAgLy8gbm9kZTo6UGFyc2VFbmNvZGluZygpIHJlcXVpcmVzIGxvd2VyIGNhc2UuXG4gIGlmICh0eXBlb2YgZW5jb2RpbmcgPT09ICdzdHJpbmcnKSBlbmNvZGluZyA9IGVuY29kaW5nLnRvTG93ZXJDYXNlKCk7XG4gIGlmICghKFsnaGV4JywgJ3V0ZjgnLCAndXRmLTgnLCAnYXNjaWknLCAnYmluYXJ5JywgJ2Jhc2U2NCcsICd1Y3MyJywgJ3Vjcy0yJywgJ3V0ZjE2bGUnLCAndXRmLTE2bGUnLCAncmF3J10uaW5kZXhPZigoZW5jb2RpbmcgKyAnJykudG9Mb3dlckNhc2UoKSkgPiAtMSkpIHRocm93IG5ldyBUeXBlRXJyb3IoJ1Vua25vd24gZW5jb2Rpbmc6ICcgKyBlbmNvZGluZyk7XG4gIHRoaXMuX3dyaXRhYmxlU3RhdGUuZGVmYXVsdEVuY29kaW5nID0gZW5jb2Rpbmc7XG4gIHJldHVybiB0aGlzO1xufTtcblxuZnVuY3Rpb24gZGVjb2RlQ2h1bmsoc3RhdGUsIGNodW5rLCBlbmNvZGluZykge1xuICBpZiAoIXN0YXRlLm9iamVjdE1vZGUgJiYgc3RhdGUuZGVjb2RlU3RyaW5ncyAhPT0gZmFsc2UgJiYgdHlwZW9mIGNodW5rID09PSAnc3RyaW5nJykge1xuICAgIGNodW5rID0gQnVmZmVyLmZyb20oY2h1bmssIGVuY29kaW5nKTtcbiAgfVxuICByZXR1cm4gY2h1bms7XG59XG5cbi8vIGlmIHdlJ3JlIGFscmVhZHkgd3JpdGluZyBzb21ldGhpbmcsIHRoZW4ganVzdCBwdXQgdGhpc1xuLy8gaW4gdGhlIHF1ZXVlLCBhbmQgd2FpdCBvdXIgdHVybi4gIE90aGVyd2lzZSwgY2FsbCBfd3JpdGVcbi8vIElmIHdlIHJldHVybiBmYWxzZSwgdGhlbiB3ZSBuZWVkIGEgZHJhaW4gZXZlbnQsIHNvIHNldCB0aGF0IGZsYWcuXG5mdW5jdGlvbiB3cml0ZU9yQnVmZmVyKHN0cmVhbSwgc3RhdGUsIGlzQnVmLCBjaHVuaywgZW5jb2RpbmcsIGNiKSB7XG4gIGlmICghaXNCdWYpIHtcbiAgICB2YXIgbmV3Q2h1bmsgPSBkZWNvZGVDaHVuayhzdGF0ZSwgY2h1bmssIGVuY29kaW5nKTtcbiAgICBpZiAoY2h1bmsgIT09IG5ld0NodW5rKSB7XG4gICAgICBpc0J1ZiA9IHRydWU7XG4gICAgICBlbmNvZGluZyA9ICdidWZmZXInO1xuICAgICAgY2h1bmsgPSBuZXdDaHVuaztcbiAgICB9XG4gIH1cbiAgdmFyIGxlbiA9IHN0YXRlLm9iamVjdE1vZGUgPyAxIDogY2h1bmsubGVuZ3RoO1xuXG4gIHN0YXRlLmxlbmd0aCArPSBsZW47XG5cbiAgdmFyIHJldCA9IHN0YXRlLmxlbmd0aCA8IHN0YXRlLmhpZ2hXYXRlck1hcms7XG4gIC8vIHdlIG11c3QgZW5zdXJlIHRoYXQgcHJldmlvdXMgbmVlZERyYWluIHdpbGwgbm90IGJlIHJlc2V0IHRvIGZhbHNlLlxuICBpZiAoIXJldCkgc3RhdGUubmVlZERyYWluID0gdHJ1ZTtcblxuICBpZiAoc3RhdGUud3JpdGluZyB8fCBzdGF0ZS5jb3JrZWQpIHtcbiAgICB2YXIgbGFzdCA9IHN0YXRlLmxhc3RCdWZmZXJlZFJlcXVlc3Q7XG4gICAgc3RhdGUubGFzdEJ1ZmZlcmVkUmVxdWVzdCA9IHtcbiAgICAgIGNodW5rOiBjaHVuayxcbiAgICAgIGVuY29kaW5nOiBlbmNvZGluZyxcbiAgICAgIGlzQnVmOiBpc0J1ZixcbiAgICAgIGNhbGxiYWNrOiBjYixcbiAgICAgIG5leHQ6IG51bGxcbiAgICB9O1xuICAgIGlmIChsYXN0KSB7XG4gICAgICBsYXN0Lm5leHQgPSBzdGF0ZS5sYXN0QnVmZmVyZWRSZXF1ZXN0O1xuICAgIH0gZWxzZSB7XG4gICAgICBzdGF0ZS5idWZmZXJlZFJlcXVlc3QgPSBzdGF0ZS5sYXN0QnVmZmVyZWRSZXF1ZXN0O1xuICAgIH1cbiAgICBzdGF0ZS5idWZmZXJlZFJlcXVlc3RDb3VudCArPSAxO1xuICB9IGVsc2Uge1xuICAgIGRvV3JpdGUoc3RyZWFtLCBzdGF0ZSwgZmFsc2UsIGxlbiwgY2h1bmssIGVuY29kaW5nLCBjYik7XG4gIH1cblxuICByZXR1cm4gcmV0O1xufVxuXG5mdW5jdGlvbiBkb1dyaXRlKHN0cmVhbSwgc3RhdGUsIHdyaXRldiwgbGVuLCBjaHVuaywgZW5jb2RpbmcsIGNiKSB7XG4gIHN0YXRlLndyaXRlbGVuID0gbGVuO1xuICBzdGF0ZS53cml0ZWNiID0gY2I7XG4gIHN0YXRlLndyaXRpbmcgPSB0cnVlO1xuICBzdGF0ZS5zeW5jID0gdHJ1ZTtcbiAgaWYgKHdyaXRldikgc3RyZWFtLl93cml0ZXYoY2h1bmssIHN0YXRlLm9ud3JpdGUpO2Vsc2Ugc3RyZWFtLl93cml0ZShjaHVuaywgZW5jb2RpbmcsIHN0YXRlLm9ud3JpdGUpO1xuICBzdGF0ZS5zeW5jID0gZmFsc2U7XG59XG5cbmZ1bmN0aW9uIG9ud3JpdGVFcnJvcihzdHJlYW0sIHN0YXRlLCBzeW5jLCBlciwgY2IpIHtcbiAgLS1zdGF0ZS5wZW5kaW5nY2I7XG5cbiAgaWYgKHN5bmMpIHtcbiAgICAvLyBkZWZlciB0aGUgY2FsbGJhY2sgaWYgd2UgYXJlIGJlaW5nIGNhbGxlZCBzeW5jaHJvbm91c2x5XG4gICAgLy8gdG8gYXZvaWQgcGlsaW5nIHVwIHRoaW5ncyBvbiB0aGUgc3RhY2tcbiAgICBwcm9jZXNzTmV4dFRpY2soY2IsIGVyKTtcbiAgICAvLyB0aGlzIGNhbiBlbWl0IGZpbmlzaCwgYW5kIGl0IHdpbGwgYWx3YXlzIGhhcHBlblxuICAgIC8vIGFmdGVyIGVycm9yXG4gICAgcHJvY2Vzc05leHRUaWNrKGZpbmlzaE1heWJlLCBzdHJlYW0sIHN0YXRlKTtcbiAgICBzdHJlYW0uX3dyaXRhYmxlU3RhdGUuZXJyb3JFbWl0dGVkID0gdHJ1ZTtcbiAgICBzdHJlYW0uZW1pdCgnZXJyb3InLCBlcik7XG4gIH0gZWxzZSB7XG4gICAgLy8gdGhlIGNhbGxlciBleHBlY3QgdGhpcyB0byBoYXBwZW4gYmVmb3JlIGlmXG4gICAgLy8gaXQgaXMgYXN5bmNcbiAgICBjYihlcik7XG4gICAgc3RyZWFtLl93cml0YWJsZVN0YXRlLmVycm9yRW1pdHRlZCA9IHRydWU7XG4gICAgc3RyZWFtLmVtaXQoJ2Vycm9yJywgZXIpO1xuICAgIC8vIHRoaXMgY2FuIGVtaXQgZmluaXNoLCBidXQgZmluaXNoIG11c3RcbiAgICAvLyBhbHdheXMgZm9sbG93IGVycm9yXG4gICAgZmluaXNoTWF5YmUoc3RyZWFtLCBzdGF0ZSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gb253cml0ZVN0YXRlVXBkYXRlKHN0YXRlKSB7XG4gIHN0YXRlLndyaXRpbmcgPSBmYWxzZTtcbiAgc3RhdGUud3JpdGVjYiA9IG51bGw7XG4gIHN0YXRlLmxlbmd0aCAtPSBzdGF0ZS53cml0ZWxlbjtcbiAgc3RhdGUud3JpdGVsZW4gPSAwO1xufVxuXG5mdW5jdGlvbiBvbndyaXRlKHN0cmVhbSwgZXIpIHtcbiAgdmFyIHN0YXRlID0gc3RyZWFtLl93cml0YWJsZVN0YXRlO1xuICB2YXIgc3luYyA9IHN0YXRlLnN5bmM7XG4gIHZhciBjYiA9IHN0YXRlLndyaXRlY2I7XG5cbiAgb253cml0ZVN0YXRlVXBkYXRlKHN0YXRlKTtcblxuICBpZiAoZXIpIG9ud3JpdGVFcnJvcihzdHJlYW0sIHN0YXRlLCBzeW5jLCBlciwgY2IpO2Vsc2Uge1xuICAgIC8vIENoZWNrIGlmIHdlJ3JlIGFjdHVhbGx5IHJlYWR5IHRvIGZpbmlzaCwgYnV0IGRvbid0IGVtaXQgeWV0XG4gICAgdmFyIGZpbmlzaGVkID0gbmVlZEZpbmlzaChzdGF0ZSk7XG5cbiAgICBpZiAoIWZpbmlzaGVkICYmICFzdGF0ZS5jb3JrZWQgJiYgIXN0YXRlLmJ1ZmZlclByb2Nlc3NpbmcgJiYgc3RhdGUuYnVmZmVyZWRSZXF1ZXN0KSB7XG4gICAgICBjbGVhckJ1ZmZlcihzdHJlYW0sIHN0YXRlKTtcbiAgICB9XG5cbiAgICBpZiAoc3luYykge1xuICAgICAgLyo8cmVwbGFjZW1lbnQ+Ki9cbiAgICAgIGFzeW5jV3JpdGUoYWZ0ZXJXcml0ZSwgc3RyZWFtLCBzdGF0ZSwgZmluaXNoZWQsIGNiKTtcbiAgICAgIC8qPC9yZXBsYWNlbWVudD4qL1xuICAgIH0gZWxzZSB7XG4gICAgICBhZnRlcldyaXRlKHN0cmVhbSwgc3RhdGUsIGZpbmlzaGVkLCBjYik7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGFmdGVyV3JpdGUoc3RyZWFtLCBzdGF0ZSwgZmluaXNoZWQsIGNiKSB7XG4gIGlmICghZmluaXNoZWQpIG9ud3JpdGVEcmFpbihzdHJlYW0sIHN0YXRlKTtcbiAgc3RhdGUucGVuZGluZ2NiLS07XG4gIGNiKCk7XG4gIGZpbmlzaE1heWJlKHN0cmVhbSwgc3RhdGUpO1xufVxuXG4vLyBNdXN0IGZvcmNlIGNhbGxiYWNrIHRvIGJlIGNhbGxlZCBvbiBuZXh0VGljaywgc28gdGhhdCB3ZSBkb24ndFxuLy8gZW1pdCAnZHJhaW4nIGJlZm9yZSB0aGUgd3JpdGUoKSBjb25zdW1lciBnZXRzIHRoZSAnZmFsc2UnIHJldHVyblxuLy8gdmFsdWUsIGFuZCBoYXMgYSBjaGFuY2UgdG8gYXR0YWNoIGEgJ2RyYWluJyBsaXN0ZW5lci5cbmZ1bmN0aW9uIG9ud3JpdGVEcmFpbihzdHJlYW0sIHN0YXRlKSB7XG4gIGlmIChzdGF0ZS5sZW5ndGggPT09IDAgJiYgc3RhdGUubmVlZERyYWluKSB7XG4gICAgc3RhdGUubmVlZERyYWluID0gZmFsc2U7XG4gICAgc3RyZWFtLmVtaXQoJ2RyYWluJyk7XG4gIH1cbn1cblxuLy8gaWYgdGhlcmUncyBzb21ldGhpbmcgaW4gdGhlIGJ1ZmZlciB3YWl0aW5nLCB0aGVuIHByb2Nlc3MgaXRcbmZ1bmN0aW9uIGNsZWFyQnVmZmVyKHN0cmVhbSwgc3RhdGUpIHtcbiAgc3RhdGUuYnVmZmVyUHJvY2Vzc2luZyA9IHRydWU7XG4gIHZhciBlbnRyeSA9IHN0YXRlLmJ1ZmZlcmVkUmVxdWVzdDtcblxuICBpZiAoc3RyZWFtLl93cml0ZXYgJiYgZW50cnkgJiYgZW50cnkubmV4dCkge1xuICAgIC8vIEZhc3QgY2FzZSwgd3JpdGUgZXZlcnl0aGluZyB1c2luZyBfd3JpdGV2KClcbiAgICB2YXIgbCA9IHN0YXRlLmJ1ZmZlcmVkUmVxdWVzdENvdW50O1xuICAgIHZhciBidWZmZXIgPSBuZXcgQXJyYXkobCk7XG4gICAgdmFyIGhvbGRlciA9IHN0YXRlLmNvcmtlZFJlcXVlc3RzRnJlZTtcbiAgICBob2xkZXIuZW50cnkgPSBlbnRyeTtcblxuICAgIHZhciBjb3VudCA9IDA7XG4gICAgdmFyIGFsbEJ1ZmZlcnMgPSB0cnVlO1xuICAgIHdoaWxlIChlbnRyeSkge1xuICAgICAgYnVmZmVyW2NvdW50XSA9IGVudHJ5O1xuICAgICAgaWYgKCFlbnRyeS5pc0J1ZikgYWxsQnVmZmVycyA9IGZhbHNlO1xuICAgICAgZW50cnkgPSBlbnRyeS5uZXh0O1xuICAgICAgY291bnQgKz0gMTtcbiAgICB9XG4gICAgYnVmZmVyLmFsbEJ1ZmZlcnMgPSBhbGxCdWZmZXJzO1xuXG4gICAgZG9Xcml0ZShzdHJlYW0sIHN0YXRlLCB0cnVlLCBzdGF0ZS5sZW5ndGgsIGJ1ZmZlciwgJycsIGhvbGRlci5maW5pc2gpO1xuXG4gICAgLy8gZG9Xcml0ZSBpcyBhbG1vc3QgYWx3YXlzIGFzeW5jLCBkZWZlciB0aGVzZSB0byBzYXZlIGEgYml0IG9mIHRpbWVcbiAgICAvLyBhcyB0aGUgaG90IHBhdGggZW5kcyB3aXRoIGRvV3JpdGVcbiAgICBzdGF0ZS5wZW5kaW5nY2IrKztcbiAgICBzdGF0ZS5sYXN0QnVmZmVyZWRSZXF1ZXN0ID0gbnVsbDtcbiAgICBpZiAoaG9sZGVyLm5leHQpIHtcbiAgICAgIHN0YXRlLmNvcmtlZFJlcXVlc3RzRnJlZSA9IGhvbGRlci5uZXh0O1xuICAgICAgaG9sZGVyLm5leHQgPSBudWxsO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdGF0ZS5jb3JrZWRSZXF1ZXN0c0ZyZWUgPSBuZXcgQ29ya2VkUmVxdWVzdChzdGF0ZSk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIC8vIFNsb3cgY2FzZSwgd3JpdGUgY2h1bmtzIG9uZS1ieS1vbmVcbiAgICB3aGlsZSAoZW50cnkpIHtcbiAgICAgIHZhciBjaHVuayA9IGVudHJ5LmNodW5rO1xuICAgICAgdmFyIGVuY29kaW5nID0gZW50cnkuZW5jb2Rpbmc7XG4gICAgICB2YXIgY2IgPSBlbnRyeS5jYWxsYmFjaztcbiAgICAgIHZhciBsZW4gPSBzdGF0ZS5vYmplY3RNb2RlID8gMSA6IGNodW5rLmxlbmd0aDtcblxuICAgICAgZG9Xcml0ZShzdHJlYW0sIHN0YXRlLCBmYWxzZSwgbGVuLCBjaHVuaywgZW5jb2RpbmcsIGNiKTtcbiAgICAgIGVudHJ5ID0gZW50cnkubmV4dDtcbiAgICAgIC8vIGlmIHdlIGRpZG4ndCBjYWxsIHRoZSBvbndyaXRlIGltbWVkaWF0ZWx5LCB0aGVuXG4gICAgICAvLyBpdCBtZWFucyB0aGF0IHdlIG5lZWQgdG8gd2FpdCB1bnRpbCBpdCBkb2VzLlxuICAgICAgLy8gYWxzbywgdGhhdCBtZWFucyB0aGF0IHRoZSBjaHVuayBhbmQgY2IgYXJlIGN1cnJlbnRseVxuICAgICAgLy8gYmVpbmcgcHJvY2Vzc2VkLCBzbyBtb3ZlIHRoZSBidWZmZXIgY291bnRlciBwYXN0IHRoZW0uXG4gICAgICBpZiAoc3RhdGUud3JpdGluZykge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoZW50cnkgPT09IG51bGwpIHN0YXRlLmxhc3RCdWZmZXJlZFJlcXVlc3QgPSBudWxsO1xuICB9XG5cbiAgc3RhdGUuYnVmZmVyZWRSZXF1ZXN0Q291bnQgPSAwO1xuICBzdGF0ZS5idWZmZXJlZFJlcXVlc3QgPSBlbnRyeTtcbiAgc3RhdGUuYnVmZmVyUHJvY2Vzc2luZyA9IGZhbHNlO1xufVxuXG5Xcml0YWJsZS5wcm90b3R5cGUuX3dyaXRlID0gZnVuY3Rpb24gKGNodW5rLCBlbmNvZGluZywgY2IpIHtcbiAgY2IobmV3IEVycm9yKCdfd3JpdGUoKSBpcyBub3QgaW1wbGVtZW50ZWQnKSk7XG59O1xuXG5Xcml0YWJsZS5wcm90b3R5cGUuX3dyaXRldiA9IG51bGw7XG5cbldyaXRhYmxlLnByb3RvdHlwZS5lbmQgPSBmdW5jdGlvbiAoY2h1bmssIGVuY29kaW5nLCBjYikge1xuICB2YXIgc3RhdGUgPSB0aGlzLl93cml0YWJsZVN0YXRlO1xuXG4gIGlmICh0eXBlb2YgY2h1bmsgPT09ICdmdW5jdGlvbicpIHtcbiAgICBjYiA9IGNodW5rO1xuICAgIGNodW5rID0gbnVsbDtcbiAgICBlbmNvZGluZyA9IG51bGw7XG4gIH0gZWxzZSBpZiAodHlwZW9mIGVuY29kaW5nID09PSAnZnVuY3Rpb24nKSB7XG4gICAgY2IgPSBlbmNvZGluZztcbiAgICBlbmNvZGluZyA9IG51bGw7XG4gIH1cblxuICBpZiAoY2h1bmsgIT09IG51bGwgJiYgY2h1bmsgIT09IHVuZGVmaW5lZCkgdGhpcy53cml0ZShjaHVuaywgZW5jb2RpbmcpO1xuXG4gIC8vIC5lbmQoKSBmdWxseSB1bmNvcmtzXG4gIGlmIChzdGF0ZS5jb3JrZWQpIHtcbiAgICBzdGF0ZS5jb3JrZWQgPSAxO1xuICAgIHRoaXMudW5jb3JrKCk7XG4gIH1cblxuICAvLyBpZ25vcmUgdW5uZWNlc3NhcnkgZW5kKCkgY2FsbHMuXG4gIGlmICghc3RhdGUuZW5kaW5nICYmICFzdGF0ZS5maW5pc2hlZCkgZW5kV3JpdGFibGUodGhpcywgc3RhdGUsIGNiKTtcbn07XG5cbmZ1bmN0aW9uIG5lZWRGaW5pc2goc3RhdGUpIHtcbiAgcmV0dXJuIHN0YXRlLmVuZGluZyAmJiBzdGF0ZS5sZW5ndGggPT09IDAgJiYgc3RhdGUuYnVmZmVyZWRSZXF1ZXN0ID09PSBudWxsICYmICFzdGF0ZS5maW5pc2hlZCAmJiAhc3RhdGUud3JpdGluZztcbn1cbmZ1bmN0aW9uIGNhbGxGaW5hbChzdHJlYW0sIHN0YXRlKSB7XG4gIHN0cmVhbS5fZmluYWwoZnVuY3Rpb24gKGVycikge1xuICAgIHN0YXRlLnBlbmRpbmdjYi0tO1xuICAgIGlmIChlcnIpIHtcbiAgICAgIHN0cmVhbS5lbWl0KCdlcnJvcicsIGVycik7XG4gICAgfVxuICAgIHN0YXRlLnByZWZpbmlzaGVkID0gdHJ1ZTtcbiAgICBzdHJlYW0uZW1pdCgncHJlZmluaXNoJyk7XG4gICAgZmluaXNoTWF5YmUoc3RyZWFtLCBzdGF0ZSk7XG4gIH0pO1xufVxuZnVuY3Rpb24gcHJlZmluaXNoKHN0cmVhbSwgc3RhdGUpIHtcbiAgaWYgKCFzdGF0ZS5wcmVmaW5pc2hlZCAmJiAhc3RhdGUuZmluYWxDYWxsZWQpIHtcbiAgICBpZiAodHlwZW9mIHN0cmVhbS5fZmluYWwgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHN0YXRlLnBlbmRpbmdjYisrO1xuICAgICAgc3RhdGUuZmluYWxDYWxsZWQgPSB0cnVlO1xuICAgICAgcHJvY2Vzc05leHRUaWNrKGNhbGxGaW5hbCwgc3RyZWFtLCBzdGF0ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN0YXRlLnByZWZpbmlzaGVkID0gdHJ1ZTtcbiAgICAgIHN0cmVhbS5lbWl0KCdwcmVmaW5pc2gnKTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gZmluaXNoTWF5YmUoc3RyZWFtLCBzdGF0ZSkge1xuICB2YXIgbmVlZCA9IG5lZWRGaW5pc2goc3RhdGUpO1xuICBpZiAobmVlZCkge1xuICAgIHByZWZpbmlzaChzdHJlYW0sIHN0YXRlKTtcbiAgICBpZiAoc3RhdGUucGVuZGluZ2NiID09PSAwKSB7XG4gICAgICBzdGF0ZS5maW5pc2hlZCA9IHRydWU7XG4gICAgICBzdHJlYW0uZW1pdCgnZmluaXNoJyk7XG4gICAgfVxuICB9XG4gIHJldHVybiBuZWVkO1xufVxuXG5mdW5jdGlvbiBlbmRXcml0YWJsZShzdHJlYW0sIHN0YXRlLCBjYikge1xuICBzdGF0ZS5lbmRpbmcgPSB0cnVlO1xuICBmaW5pc2hNYXliZShzdHJlYW0sIHN0YXRlKTtcbiAgaWYgKGNiKSB7XG4gICAgaWYgKHN0YXRlLmZpbmlzaGVkKSBwcm9jZXNzTmV4dFRpY2soY2IpO2Vsc2Ugc3RyZWFtLm9uY2UoJ2ZpbmlzaCcsIGNiKTtcbiAgfVxuICBzdGF0ZS5lbmRlZCA9IHRydWU7XG4gIHN0cmVhbS53cml0YWJsZSA9IGZhbHNlO1xufVxuXG5mdW5jdGlvbiBvbkNvcmtlZEZpbmlzaChjb3JrUmVxLCBzdGF0ZSwgZXJyKSB7XG4gIHZhciBlbnRyeSA9IGNvcmtSZXEuZW50cnk7XG4gIGNvcmtSZXEuZW50cnkgPSBudWxsO1xuICB3aGlsZSAoZW50cnkpIHtcbiAgICB2YXIgY2IgPSBlbnRyeS5jYWxsYmFjaztcbiAgICBzdGF0ZS5wZW5kaW5nY2ItLTtcbiAgICBjYihlcnIpO1xuICAgIGVudHJ5ID0gZW50cnkubmV4dDtcbiAgfVxuICBpZiAoc3RhdGUuY29ya2VkUmVxdWVzdHNGcmVlKSB7XG4gICAgc3RhdGUuY29ya2VkUmVxdWVzdHNGcmVlLm5leHQgPSBjb3JrUmVxO1xuICB9IGVsc2Uge1xuICAgIHN0YXRlLmNvcmtlZFJlcXVlc3RzRnJlZSA9IGNvcmtSZXE7XG4gIH1cbn1cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KFdyaXRhYmxlLnByb3RvdHlwZSwgJ2Rlc3Ryb3llZCcsIHtcbiAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKHRoaXMuX3dyaXRhYmxlU3RhdGUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fd3JpdGFibGVTdGF0ZS5kZXN0cm95ZWQ7XG4gIH0sXG4gIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgLy8gd2UgaWdub3JlIHRoZSB2YWx1ZSBpZiB0aGUgc3RyZWFtXG4gICAgLy8gaGFzIG5vdCBiZWVuIGluaXRpYWxpemVkIHlldFxuICAgIGlmICghdGhpcy5fd3JpdGFibGVTdGF0ZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIGJhY2t3YXJkIGNvbXBhdGliaWxpdHksIHRoZSB1c2VyIGlzIGV4cGxpY2l0bHlcbiAgICAvLyBtYW5hZ2luZyBkZXN0cm95ZWRcbiAgICB0aGlzLl93cml0YWJsZVN0YXRlLmRlc3Ryb3llZCA9IHZhbHVlO1xuICB9XG59KTtcblxuV3JpdGFibGUucHJvdG90eXBlLmRlc3Ryb3kgPSBkZXN0cm95SW1wbC5kZXN0cm95O1xuV3JpdGFibGUucHJvdG90eXBlLl91bmRlc3Ryb3kgPSBkZXN0cm95SW1wbC51bmRlc3Ryb3k7XG5Xcml0YWJsZS5wcm90b3R5cGUuX2Rlc3Ryb3kgPSBmdW5jdGlvbiAoZXJyLCBjYikge1xuICB0aGlzLmVuZCgpO1xuICBjYihlcnIpO1xufTsiLCIndXNlIHN0cmljdCc7XG5cbi8qPHJlcGxhY2VtZW50PiovXG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbnZhciBCdWZmZXIgPSByZXF1aXJlKCdzYWZlLWJ1ZmZlcicpLkJ1ZmZlcjtcbi8qPC9yZXBsYWNlbWVudD4qL1xuXG5mdW5jdGlvbiBjb3B5QnVmZmVyKHNyYywgdGFyZ2V0LCBvZmZzZXQpIHtcbiAgc3JjLmNvcHkodGFyZ2V0LCBvZmZzZXQpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gQnVmZmVyTGlzdCgpIHtcbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgQnVmZmVyTGlzdCk7XG5cbiAgICB0aGlzLmhlYWQgPSBudWxsO1xuICAgIHRoaXMudGFpbCA9IG51bGw7XG4gICAgdGhpcy5sZW5ndGggPSAwO1xuICB9XG5cbiAgQnVmZmVyTGlzdC5wcm90b3R5cGUucHVzaCA9IGZ1bmN0aW9uIHB1c2godikge1xuICAgIHZhciBlbnRyeSA9IHsgZGF0YTogdiwgbmV4dDogbnVsbCB9O1xuICAgIGlmICh0aGlzLmxlbmd0aCA+IDApIHRoaXMudGFpbC5uZXh0ID0gZW50cnk7ZWxzZSB0aGlzLmhlYWQgPSBlbnRyeTtcbiAgICB0aGlzLnRhaWwgPSBlbnRyeTtcbiAgICArK3RoaXMubGVuZ3RoO1xuICB9O1xuXG4gIEJ1ZmZlckxpc3QucHJvdG90eXBlLnVuc2hpZnQgPSBmdW5jdGlvbiB1bnNoaWZ0KHYpIHtcbiAgICB2YXIgZW50cnkgPSB7IGRhdGE6IHYsIG5leHQ6IHRoaXMuaGVhZCB9O1xuICAgIGlmICh0aGlzLmxlbmd0aCA9PT0gMCkgdGhpcy50YWlsID0gZW50cnk7XG4gICAgdGhpcy5oZWFkID0gZW50cnk7XG4gICAgKyt0aGlzLmxlbmd0aDtcbiAgfTtcblxuICBCdWZmZXJMaXN0LnByb3RvdHlwZS5zaGlmdCA9IGZ1bmN0aW9uIHNoaWZ0KCkge1xuICAgIGlmICh0aGlzLmxlbmd0aCA9PT0gMCkgcmV0dXJuO1xuICAgIHZhciByZXQgPSB0aGlzLmhlYWQuZGF0YTtcbiAgICBpZiAodGhpcy5sZW5ndGggPT09IDEpIHRoaXMuaGVhZCA9IHRoaXMudGFpbCA9IG51bGw7ZWxzZSB0aGlzLmhlYWQgPSB0aGlzLmhlYWQubmV4dDtcbiAgICAtLXRoaXMubGVuZ3RoO1xuICAgIHJldHVybiByZXQ7XG4gIH07XG5cbiAgQnVmZmVyTGlzdC5wcm90b3R5cGUuY2xlYXIgPSBmdW5jdGlvbiBjbGVhcigpIHtcbiAgICB0aGlzLmhlYWQgPSB0aGlzLnRhaWwgPSBudWxsO1xuICAgIHRoaXMubGVuZ3RoID0gMDtcbiAgfTtcblxuICBCdWZmZXJMaXN0LnByb3RvdHlwZS5qb2luID0gZnVuY3Rpb24gam9pbihzKSB7XG4gICAgaWYgKHRoaXMubGVuZ3RoID09PSAwKSByZXR1cm4gJyc7XG4gICAgdmFyIHAgPSB0aGlzLmhlYWQ7XG4gICAgdmFyIHJldCA9ICcnICsgcC5kYXRhO1xuICAgIHdoaWxlIChwID0gcC5uZXh0KSB7XG4gICAgICByZXQgKz0gcyArIHAuZGF0YTtcbiAgICB9cmV0dXJuIHJldDtcbiAgfTtcblxuICBCdWZmZXJMaXN0LnByb3RvdHlwZS5jb25jYXQgPSBmdW5jdGlvbiBjb25jYXQobikge1xuICAgIGlmICh0aGlzLmxlbmd0aCA9PT0gMCkgcmV0dXJuIEJ1ZmZlci5hbGxvYygwKTtcbiAgICBpZiAodGhpcy5sZW5ndGggPT09IDEpIHJldHVybiB0aGlzLmhlYWQuZGF0YTtcbiAgICB2YXIgcmV0ID0gQnVmZmVyLmFsbG9jVW5zYWZlKG4gPj4+IDApO1xuICAgIHZhciBwID0gdGhpcy5oZWFkO1xuICAgIHZhciBpID0gMDtcbiAgICB3aGlsZSAocCkge1xuICAgICAgY29weUJ1ZmZlcihwLmRhdGEsIHJldCwgaSk7XG4gICAgICBpICs9IHAuZGF0YS5sZW5ndGg7XG4gICAgICBwID0gcC5uZXh0O1xuICAgIH1cbiAgICByZXR1cm4gcmV0O1xuICB9O1xuXG4gIHJldHVybiBCdWZmZXJMaXN0O1xufSgpOyIsIid1c2Ugc3RyaWN0JztcblxuLyo8cmVwbGFjZW1lbnQ+Ki9cblxudmFyIHByb2Nlc3NOZXh0VGljayA9IHJlcXVpcmUoJ3Byb2Nlc3MtbmV4dGljay1hcmdzJyk7XG4vKjwvcmVwbGFjZW1lbnQ+Ki9cblxuLy8gdW5kb2N1bWVudGVkIGNiKCkgQVBJLCBuZWVkZWQgZm9yIGNvcmUsIG5vdCBmb3IgcHVibGljIEFQSVxuZnVuY3Rpb24gZGVzdHJveShlcnIsIGNiKSB7XG4gIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgdmFyIHJlYWRhYmxlRGVzdHJveWVkID0gdGhpcy5fcmVhZGFibGVTdGF0ZSAmJiB0aGlzLl9yZWFkYWJsZVN0YXRlLmRlc3Ryb3llZDtcbiAgdmFyIHdyaXRhYmxlRGVzdHJveWVkID0gdGhpcy5fd3JpdGFibGVTdGF0ZSAmJiB0aGlzLl93cml0YWJsZVN0YXRlLmRlc3Ryb3llZDtcblxuICBpZiAocmVhZGFibGVEZXN0cm95ZWQgfHwgd3JpdGFibGVEZXN0cm95ZWQpIHtcbiAgICBpZiAoY2IpIHtcbiAgICAgIGNiKGVycik7XG4gICAgfSBlbHNlIGlmIChlcnIgJiYgKCF0aGlzLl93cml0YWJsZVN0YXRlIHx8ICF0aGlzLl93cml0YWJsZVN0YXRlLmVycm9yRW1pdHRlZCkpIHtcbiAgICAgIHByb2Nlc3NOZXh0VGljayhlbWl0RXJyb3JOVCwgdGhpcywgZXJyKTtcbiAgICB9XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLy8gd2Ugc2V0IGRlc3Ryb3llZCB0byB0cnVlIGJlZm9yZSBmaXJpbmcgZXJyb3IgY2FsbGJhY2tzIGluIG9yZGVyXG4gIC8vIHRvIG1ha2UgaXQgcmUtZW50cmFuY2Ugc2FmZSBpbiBjYXNlIGRlc3Ryb3koKSBpcyBjYWxsZWQgd2l0aGluIGNhbGxiYWNrc1xuXG4gIGlmICh0aGlzLl9yZWFkYWJsZVN0YXRlKSB7XG4gICAgdGhpcy5fcmVhZGFibGVTdGF0ZS5kZXN0cm95ZWQgPSB0cnVlO1xuICB9XG5cbiAgLy8gaWYgdGhpcyBpcyBhIGR1cGxleCBzdHJlYW0gbWFyayB0aGUgd3JpdGFibGUgcGFydCBhcyBkZXN0cm95ZWQgYXMgd2VsbFxuICBpZiAodGhpcy5fd3JpdGFibGVTdGF0ZSkge1xuICAgIHRoaXMuX3dyaXRhYmxlU3RhdGUuZGVzdHJveWVkID0gdHJ1ZTtcbiAgfVxuXG4gIHRoaXMuX2Rlc3Ryb3koZXJyIHx8IG51bGwsIGZ1bmN0aW9uIChlcnIpIHtcbiAgICBpZiAoIWNiICYmIGVycikge1xuICAgICAgcHJvY2Vzc05leHRUaWNrKGVtaXRFcnJvck5ULCBfdGhpcywgZXJyKTtcbiAgICAgIGlmIChfdGhpcy5fd3JpdGFibGVTdGF0ZSkge1xuICAgICAgICBfdGhpcy5fd3JpdGFibGVTdGF0ZS5lcnJvckVtaXR0ZWQgPSB0cnVlO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoY2IpIHtcbiAgICAgIGNiKGVycik7XG4gICAgfVxuICB9KTtcbn1cblxuZnVuY3Rpb24gdW5kZXN0cm95KCkge1xuICBpZiAodGhpcy5fcmVhZGFibGVTdGF0ZSkge1xuICAgIHRoaXMuX3JlYWRhYmxlU3RhdGUuZGVzdHJveWVkID0gZmFsc2U7XG4gICAgdGhpcy5fcmVhZGFibGVTdGF0ZS5yZWFkaW5nID0gZmFsc2U7XG4gICAgdGhpcy5fcmVhZGFibGVTdGF0ZS5lbmRlZCA9IGZhbHNlO1xuICAgIHRoaXMuX3JlYWRhYmxlU3RhdGUuZW5kRW1pdHRlZCA9IGZhbHNlO1xuICB9XG5cbiAgaWYgKHRoaXMuX3dyaXRhYmxlU3RhdGUpIHtcbiAgICB0aGlzLl93cml0YWJsZVN0YXRlLmRlc3Ryb3llZCA9IGZhbHNlO1xuICAgIHRoaXMuX3dyaXRhYmxlU3RhdGUuZW5kZWQgPSBmYWxzZTtcbiAgICB0aGlzLl93cml0YWJsZVN0YXRlLmVuZGluZyA9IGZhbHNlO1xuICAgIHRoaXMuX3dyaXRhYmxlU3RhdGUuZmluaXNoZWQgPSBmYWxzZTtcbiAgICB0aGlzLl93cml0YWJsZVN0YXRlLmVycm9yRW1pdHRlZCA9IGZhbHNlO1xuICB9XG59XG5cbmZ1bmN0aW9uIGVtaXRFcnJvck5UKHNlbGYsIGVycikge1xuICBzZWxmLmVtaXQoJ2Vycm9yJywgZXJyKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGRlc3Ryb3k6IGRlc3Ryb3ksXG4gIHVuZGVzdHJveTogdW5kZXN0cm95XG59OyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnZXZlbnRzJykuRXZlbnRFbWl0dGVyO1xuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL3JlYWRhYmxlJykuUGFzc1Rocm91Z2hcbiIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vbGliL19zdHJlYW1fcmVhZGFibGUuanMnKTtcbmV4cG9ydHMuU3RyZWFtID0gZXhwb3J0cztcbmV4cG9ydHMuUmVhZGFibGUgPSBleHBvcnRzO1xuZXhwb3J0cy5Xcml0YWJsZSA9IHJlcXVpcmUoJy4vbGliL19zdHJlYW1fd3JpdGFibGUuanMnKTtcbmV4cG9ydHMuRHVwbGV4ID0gcmVxdWlyZSgnLi9saWIvX3N0cmVhbV9kdXBsZXguanMnKTtcbmV4cG9ydHMuVHJhbnNmb3JtID0gcmVxdWlyZSgnLi9saWIvX3N0cmVhbV90cmFuc2Zvcm0uanMnKTtcbmV4cG9ydHMuUGFzc1Rocm91Z2ggPSByZXF1aXJlKCcuL2xpYi9fc3RyZWFtX3Bhc3N0aHJvdWdoLmpzJyk7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vcmVhZGFibGUnKS5UcmFuc2Zvcm1cbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9saWIvX3N0cmVhbV93cml0YWJsZS5qcycpO1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoc3RyaW5nKSB7XG4gIHJldHVybiBzdHJpbmcucmVwbGFjZSgvWy1cXFxcXiQqKz8uKCl8W1xcXXt9XS9nLCBcIlxcXFwkJlwiKVxufVxuIiwiLyogZXNsaW50LWRpc2FibGUgbm9kZS9uby1kZXByZWNhdGVkLWFwaSAqL1xudmFyIGJ1ZmZlciA9IHJlcXVpcmUoJ2J1ZmZlcicpXG52YXIgQnVmZmVyID0gYnVmZmVyLkJ1ZmZlclxuXG4vLyBhbHRlcm5hdGl2ZSB0byB1c2luZyBPYmplY3Qua2V5cyBmb3Igb2xkIGJyb3dzZXJzXG5mdW5jdGlvbiBjb3B5UHJvcHMgKHNyYywgZHN0KSB7XG4gIGZvciAodmFyIGtleSBpbiBzcmMpIHtcbiAgICBkc3Rba2V5XSA9IHNyY1trZXldXG4gIH1cbn1cbmlmIChCdWZmZXIuZnJvbSAmJiBCdWZmZXIuYWxsb2MgJiYgQnVmZmVyLmFsbG9jVW5zYWZlICYmIEJ1ZmZlci5hbGxvY1Vuc2FmZVNsb3cpIHtcbiAgbW9kdWxlLmV4cG9ydHMgPSBidWZmZXJcbn0gZWxzZSB7XG4gIC8vIENvcHkgcHJvcGVydGllcyBmcm9tIHJlcXVpcmUoJ2J1ZmZlcicpXG4gIGNvcHlQcm9wcyhidWZmZXIsIGV4cG9ydHMpXG4gIGV4cG9ydHMuQnVmZmVyID0gU2FmZUJ1ZmZlclxufVxuXG5mdW5jdGlvbiBTYWZlQnVmZmVyIChhcmcsIGVuY29kaW5nT3JPZmZzZXQsIGxlbmd0aCkge1xuICByZXR1cm4gQnVmZmVyKGFyZywgZW5jb2RpbmdPck9mZnNldCwgbGVuZ3RoKVxufVxuXG4vLyBDb3B5IHN0YXRpYyBtZXRob2RzIGZyb20gQnVmZmVyXG5jb3B5UHJvcHMoQnVmZmVyLCBTYWZlQnVmZmVyKVxuXG5TYWZlQnVmZmVyLmZyb20gPSBmdW5jdGlvbiAoYXJnLCBlbmNvZGluZ09yT2Zmc2V0LCBsZW5ndGgpIHtcbiAgaWYgKHR5cGVvZiBhcmcgPT09ICdudW1iZXInKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQXJndW1lbnQgbXVzdCBub3QgYmUgYSBudW1iZXInKVxuICB9XG4gIHJldHVybiBCdWZmZXIoYXJnLCBlbmNvZGluZ09yT2Zmc2V0LCBsZW5ndGgpXG59XG5cblNhZmVCdWZmZXIuYWxsb2MgPSBmdW5jdGlvbiAoc2l6ZSwgZmlsbCwgZW5jb2RpbmcpIHtcbiAgaWYgKHR5cGVvZiBzaXplICE9PSAnbnVtYmVyJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0FyZ3VtZW50IG11c3QgYmUgYSBudW1iZXInKVxuICB9XG4gIHZhciBidWYgPSBCdWZmZXIoc2l6ZSlcbiAgaWYgKGZpbGwgIT09IHVuZGVmaW5lZCkge1xuICAgIGlmICh0eXBlb2YgZW5jb2RpbmcgPT09ICdzdHJpbmcnKSB7XG4gICAgICBidWYuZmlsbChmaWxsLCBlbmNvZGluZylcbiAgICB9IGVsc2Uge1xuICAgICAgYnVmLmZpbGwoZmlsbClcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgYnVmLmZpbGwoMClcbiAgfVxuICByZXR1cm4gYnVmXG59XG5cblNhZmVCdWZmZXIuYWxsb2NVbnNhZmUgPSBmdW5jdGlvbiAoc2l6ZSkge1xuICBpZiAodHlwZW9mIHNpemUgIT09ICdudW1iZXInKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQXJndW1lbnQgbXVzdCBiZSBhIG51bWJlcicpXG4gIH1cbiAgcmV0dXJuIEJ1ZmZlcihzaXplKVxufVxuXG5TYWZlQnVmZmVyLmFsbG9jVW5zYWZlU2xvdyA9IGZ1bmN0aW9uIChzaXplKSB7XG4gIGlmICh0eXBlb2Ygc2l6ZSAhPT0gJ251bWJlcicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdBcmd1bWVudCBtdXN0IGJlIGEgbnVtYmVyJylcbiAgfVxuICByZXR1cm4gYnVmZmVyLlNsb3dCdWZmZXIoc2l6ZSlcbn1cbiIsInZhciBodG1scGFyc2VyID0gcmVxdWlyZSgnaHRtbHBhcnNlcjInKTtcbnZhciBleHRlbmQgPSByZXF1aXJlKCd4dGVuZCcpO1xudmFyIHF1b3RlUmVnZXhwID0gcmVxdWlyZSgncmVnZXhwLXF1b3RlJyk7XG5cbmZ1bmN0aW9uIGVhY2gob2JqLCBjYikge1xuICBpZiAob2JqKSBPYmplY3Qua2V5cyhvYmopLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgIGNiKG9ialtrZXldLCBrZXkpO1xuICB9KTtcbn1cblxuLy8gQXZvaWQgZmFsc2UgcG9zaXRpdmVzIHdpdGggLl9fcHJvdG9fXywgLmhhc093blByb3BlcnR5LCBldGMuXG5mdW5jdGlvbiBoYXMob2JqLCBrZXkpIHtcbiAgcmV0dXJuICh7fSkuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGtleSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2FuaXRpemVIdG1sO1xuXG4vLyBJZ25vcmUgdGhlIF9yZWN1cnNpbmcgZmxhZzsgaXQncyB0aGVyZSBmb3IgcmVjdXJzaXZlXG4vLyBpbnZvY2F0aW9uIGFzIGEgZ3VhcmQgYWdhaW5zdCB0aGlzIGV4cGxvaXQ6XG4vLyBodHRwczovL2dpdGh1Yi5jb20vZmI1NS9odG1scGFyc2VyMi9pc3N1ZXMvMTA1XG5cbmZ1bmN0aW9uIHNhbml0aXplSHRtbChodG1sLCBvcHRpb25zLCBfcmVjdXJzaW5nKSB7XG4gIHZhciByZXN1bHQgPSAnJztcblxuICBmdW5jdGlvbiBGcmFtZSh0YWcsIGF0dHJpYnMpIHtcbiAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgdGhpcy50YWcgPSB0YWc7XG4gICAgdGhpcy5hdHRyaWJzID0gYXR0cmlicyB8fCB7fTtcbiAgICB0aGlzLnRhZ1Bvc2l0aW9uID0gcmVzdWx0Lmxlbmd0aDtcbiAgICB0aGlzLnRleHQgPSAnJzsgLy8gTm9kZSBpbm5lciB0ZXh0XG5cbiAgICB0aGlzLnVwZGF0ZVBhcmVudE5vZGVUZXh0ID0gZnVuY3Rpb24oKSB7XG4gICAgICBpZiAoc3RhY2subGVuZ3RoKSB7XG4gICAgICAgICAgdmFyIHBhcmVudEZyYW1lID0gc3RhY2tbc3RhY2subGVuZ3RoIC0gMV07XG4gICAgICAgICAgcGFyZW50RnJhbWUudGV4dCArPSB0aGF0LnRleHQ7XG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIGlmICghb3B0aW9ucykge1xuICAgIG9wdGlvbnMgPSBzYW5pdGl6ZUh0bWwuZGVmYXVsdHM7XG4gICAgb3B0aW9ucy5wYXJzZXIgPSBodG1sUGFyc2VyRGVmYXVsdHM7XG4gIH0gZWxzZSB7XG4gICAgb3B0aW9ucyA9IGV4dGVuZChzYW5pdGl6ZUh0bWwuZGVmYXVsdHMsIG9wdGlvbnMpO1xuICAgIGlmIChvcHRpb25zLnBhcnNlcikge1xuICAgICAgb3B0aW9ucy5wYXJzZXIgPSBleHRlbmQoaHRtbFBhcnNlckRlZmF1bHRzLCBvcHRpb25zLnBhcnNlcik7XG4gICAgfSBlbHNlIHtcbiAgICAgIG9wdGlvbnMucGFyc2VyID0gaHRtbFBhcnNlckRlZmF1bHRzO1xuICAgIH1cbiAgfVxuXG4gIC8vIFRhZ3MgdGhhdCBjb250YWluIHNvbWV0aGluZyBvdGhlciB0aGFuIEhUTUwsIG9yIHdoZXJlIGRpc2NhcmRpbmdcbiAgLy8gdGhlIHRleHQgd2hlbiB0aGUgdGFnIGlzIGRpc2FsbG93ZWQgbWFrZXMgc2Vuc2UgZm9yIG90aGVyIHJlYXNvbnMuXG4gIC8vIElmIHdlIGFyZSBub3QgYWxsb3dpbmcgdGhlc2UgdGFncywgd2Ugc2hvdWxkIGRyb3AgdGhlaXIgY29udGVudCB0b28uXG4gIC8vIEZvciBvdGhlciB0YWdzIHlvdSB3b3VsZCBkcm9wIHRoZSB0YWcgYnV0IGtlZXAgaXRzIGNvbnRlbnQuXG4gIHZhciBub25UZXh0VGFnc0FycmF5ID0gb3B0aW9ucy5ub25UZXh0VGFncyB8fCBbICdzY3JpcHQnLCAnc3R5bGUnLCAndGV4dGFyZWEnIF07XG4gIHZhciBhbGxvd2VkQXR0cmlidXRlc01hcDtcbiAgdmFyIGFsbG93ZWRBdHRyaWJ1dGVzR2xvYk1hcDtcbiAgaWYob3B0aW9ucy5hbGxvd2VkQXR0cmlidXRlcykge1xuICAgIGFsbG93ZWRBdHRyaWJ1dGVzTWFwID0ge307XG4gICAgYWxsb3dlZEF0dHJpYnV0ZXNHbG9iTWFwID0ge307XG4gICAgZWFjaChvcHRpb25zLmFsbG93ZWRBdHRyaWJ1dGVzLCBmdW5jdGlvbihhdHRyaWJ1dGVzLCB0YWcpIHtcbiAgICAgIGFsbG93ZWRBdHRyaWJ1dGVzTWFwW3RhZ10gPSBbXTtcbiAgICAgIHZhciBnbG9iUmVnZXggPSBbXTtcbiAgICAgIGF0dHJpYnV0ZXMuZm9yRWFjaChmdW5jdGlvbihuYW1lKSB7XG4gICAgICAgIGlmKG5hbWUuaW5kZXhPZignKicpID49IDApIHtcbiAgICAgICAgICBnbG9iUmVnZXgucHVzaChxdW90ZVJlZ2V4cChuYW1lKS5yZXBsYWNlKC9cXFxcXFwqL2csICcuKicpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBhbGxvd2VkQXR0cmlidXRlc01hcFt0YWddLnB1c2gobmFtZSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgYWxsb3dlZEF0dHJpYnV0ZXNHbG9iTWFwW3RhZ10gPSBuZXcgUmVnRXhwKCdeKCcgKyBnbG9iUmVnZXguam9pbignfCcpICsgJykkJyk7XG4gICAgfSk7XG4gIH1cbiAgdmFyIGFsbG93ZWRDbGFzc2VzTWFwID0ge307XG4gIGVhY2gob3B0aW9ucy5hbGxvd2VkQ2xhc3NlcywgZnVuY3Rpb24oY2xhc3NlcywgdGFnKSB7XG4gICAgLy8gSW1wbGljaXRseSBhbGxvd3MgdGhlIGNsYXNzIGF0dHJpYnV0ZVxuICAgIGlmKGFsbG93ZWRBdHRyaWJ1dGVzTWFwKSB7XG4gICAgICBpZiAoIWhhcyhhbGxvd2VkQXR0cmlidXRlc01hcCwgdGFnKSkge1xuICAgICAgICBhbGxvd2VkQXR0cmlidXRlc01hcFt0YWddID0gW107XG4gICAgICB9XG4gICAgICBhbGxvd2VkQXR0cmlidXRlc01hcFt0YWddLnB1c2goJ2NsYXNzJyk7XG4gICAgfVxuXG4gICAgYWxsb3dlZENsYXNzZXNNYXBbdGFnXSA9IGNsYXNzZXM7XG4gIH0pO1xuXG4gIHZhciB0cmFuc2Zvcm1UYWdzTWFwID0ge307XG4gIHZhciB0cmFuc2Zvcm1UYWdzQWxsO1xuICBlYWNoKG9wdGlvbnMudHJhbnNmb3JtVGFncywgZnVuY3Rpb24odHJhbnNmb3JtLCB0YWcpIHtcbiAgICB2YXIgdHJhbnNGdW47XG4gICAgaWYgKHR5cGVvZiB0cmFuc2Zvcm0gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHRyYW5zRnVuID0gdHJhbnNmb3JtO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIHRyYW5zZm9ybSA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgdHJhbnNGdW4gPSBzYW5pdGl6ZUh0bWwuc2ltcGxlVHJhbnNmb3JtKHRyYW5zZm9ybSk7XG4gICAgfVxuICAgIGlmICh0YWcgPT09ICcqJykge1xuICAgICAgdHJhbnNmb3JtVGFnc0FsbCA9IHRyYW5zRnVuO1xuICAgIH0gZWxzZSB7XG4gICAgICB0cmFuc2Zvcm1UYWdzTWFwW3RhZ10gPSB0cmFuc0Z1bjtcbiAgICB9XG4gIH0pO1xuXG4gIHZhciBkZXB0aCA9IDA7XG4gIHZhciBzdGFjayA9IFtdO1xuICB2YXIgc2tpcE1hcCA9IHt9O1xuICB2YXIgdHJhbnNmb3JtTWFwID0ge307XG4gIHZhciBza2lwVGV4dCA9IGZhbHNlO1xuICB2YXIgc2tpcFRleHREZXB0aCA9IDA7XG5cbiAgdmFyIHBhcnNlciA9IG5ldyBodG1scGFyc2VyLlBhcnNlcih7XG4gICAgb25vcGVudGFnOiBmdW5jdGlvbihuYW1lLCBhdHRyaWJzKSB7XG4gICAgICBpZiAoc2tpcFRleHQpIHtcbiAgICAgICAgc2tpcFRleHREZXB0aCsrO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB2YXIgZnJhbWUgPSBuZXcgRnJhbWUobmFtZSwgYXR0cmlicyk7XG4gICAgICBzdGFjay5wdXNoKGZyYW1lKTtcblxuICAgICAgdmFyIHNraXAgPSBmYWxzZTtcbiAgICAgIHZhciBoYXNUZXh0ID0gZnJhbWUudGV4dCA/IHRydWUgOiBmYWxzZTtcbiAgICAgIHZhciB0cmFuc2Zvcm1lZFRhZztcbiAgICAgIGlmIChoYXModHJhbnNmb3JtVGFnc01hcCwgbmFtZSkpIHtcbiAgICAgICAgdHJhbnNmb3JtZWRUYWcgPSB0cmFuc2Zvcm1UYWdzTWFwW25hbWVdKG5hbWUsIGF0dHJpYnMpO1xuXG4gICAgICAgIGZyYW1lLmF0dHJpYnMgPSBhdHRyaWJzID0gdHJhbnNmb3JtZWRUYWcuYXR0cmlicztcblxuICAgICAgICBpZiAodHJhbnNmb3JtZWRUYWcudGV4dCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgZnJhbWUuaW5uZXJUZXh0ID0gdHJhbnNmb3JtZWRUYWcudGV4dDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChuYW1lICE9PSB0cmFuc2Zvcm1lZFRhZy50YWdOYW1lKSB7XG4gICAgICAgICAgZnJhbWUubmFtZSA9IG5hbWUgPSB0cmFuc2Zvcm1lZFRhZy50YWdOYW1lO1xuICAgICAgICAgIHRyYW5zZm9ybU1hcFtkZXB0aF0gPSB0cmFuc2Zvcm1lZFRhZy50YWdOYW1lO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAodHJhbnNmb3JtVGFnc0FsbCkge1xuICAgICAgICB0cmFuc2Zvcm1lZFRhZyA9IHRyYW5zZm9ybVRhZ3NBbGwobmFtZSwgYXR0cmlicyk7XG5cbiAgICAgICAgZnJhbWUuYXR0cmlicyA9IGF0dHJpYnMgPSB0cmFuc2Zvcm1lZFRhZy5hdHRyaWJzO1xuICAgICAgICBpZiAobmFtZSAhPT0gdHJhbnNmb3JtZWRUYWcudGFnTmFtZSkge1xuICAgICAgICAgIGZyYW1lLm5hbWUgPSBuYW1lID0gdHJhbnNmb3JtZWRUYWcudGFnTmFtZTtcbiAgICAgICAgICB0cmFuc2Zvcm1NYXBbZGVwdGhdID0gdHJhbnNmb3JtZWRUYWcudGFnTmFtZTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAob3B0aW9ucy5hbGxvd2VkVGFncyAmJiBvcHRpb25zLmFsbG93ZWRUYWdzLmluZGV4T2YobmFtZSkgPT09IC0xKSB7XG4gICAgICAgIHNraXAgPSB0cnVlO1xuICAgICAgICBpZiAobm9uVGV4dFRhZ3NBcnJheS5pbmRleE9mKG5hbWUpICE9PSAtMSkge1xuICAgICAgICAgIHNraXBUZXh0ID0gdHJ1ZTtcbiAgICAgICAgICBza2lwVGV4dERlcHRoID0gMTtcbiAgICAgICAgfVxuICAgICAgICBza2lwTWFwW2RlcHRoXSA9IHRydWU7XG4gICAgICB9XG4gICAgICBkZXB0aCsrO1xuICAgICAgaWYgKHNraXApIHtcbiAgICAgICAgLy8gV2Ugd2FudCB0aGUgY29udGVudHMgYnV0IG5vdCB0aGlzIHRhZ1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICByZXN1bHQgKz0gJzwnICsgbmFtZTtcbiAgICAgIGlmICghYWxsb3dlZEF0dHJpYnV0ZXNNYXAgfHwgaGFzKGFsbG93ZWRBdHRyaWJ1dGVzTWFwLCBuYW1lKSB8fCBhbGxvd2VkQXR0cmlidXRlc01hcFsnKiddKSB7XG4gICAgICAgIGVhY2goYXR0cmlicywgZnVuY3Rpb24odmFsdWUsIGEpIHtcbiAgICAgICAgICBpZiAoIWFsbG93ZWRBdHRyaWJ1dGVzTWFwIHx8XG4gICAgICAgICAgICAgIChoYXMoYWxsb3dlZEF0dHJpYnV0ZXNNYXAsIG5hbWUpICYmIGFsbG93ZWRBdHRyaWJ1dGVzTWFwW25hbWVdLmluZGV4T2YoYSkgIT09IC0xICkgfHxcbiAgICAgICAgICAgICAgKGFsbG93ZWRBdHRyaWJ1dGVzTWFwWycqJ10gJiYgYWxsb3dlZEF0dHJpYnV0ZXNNYXBbJyonXS5pbmRleE9mKGEpICE9PSAtMSApIHx8XG4gICAgICAgICAgICAgIChoYXMoYWxsb3dlZEF0dHJpYnV0ZXNHbG9iTWFwLCBuYW1lKSAmJiBhbGxvd2VkQXR0cmlidXRlc0dsb2JNYXBbbmFtZV0udGVzdChhKSkgfHxcbiAgICAgICAgICAgICAgKGFsbG93ZWRBdHRyaWJ1dGVzR2xvYk1hcFsnKiddICYmIGFsbG93ZWRBdHRyaWJ1dGVzR2xvYk1hcFsnKiddLnRlc3QoYSkpKSB7XG4gICAgICAgICAgICBpZiAoKGEgPT09ICdocmVmJykgfHwgKGEgPT09ICdzcmMnKSkge1xuICAgICAgICAgICAgICBpZiAobmF1Z2h0eUhyZWYobmFtZSwgdmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgZGVsZXRlIGZyYW1lLmF0dHJpYnNbYV07XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoYSA9PT0gJ2NsYXNzJykge1xuICAgICAgICAgICAgICB2YWx1ZSA9IGZpbHRlckNsYXNzZXModmFsdWUsIGFsbG93ZWRDbGFzc2VzTWFwW25hbWVdKTtcbiAgICAgICAgICAgICAgaWYgKCF2YWx1ZS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBkZWxldGUgZnJhbWUuYXR0cmlic1thXTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJlc3VsdCArPSAnICcgKyBhO1xuICAgICAgICAgICAgaWYgKHZhbHVlLmxlbmd0aCkge1xuICAgICAgICAgICAgICByZXN1bHQgKz0gJz1cIicgKyBlc2NhcGVIdG1sKHZhbHVlKSArICdcIic7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGRlbGV0ZSBmcmFtZS5hdHRyaWJzW2FdO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICBpZiAob3B0aW9ucy5zZWxmQ2xvc2luZy5pbmRleE9mKG5hbWUpICE9PSAtMSkge1xuICAgICAgICByZXN1bHQgKz0gXCIgLz5cIjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlc3VsdCArPSBcIj5cIjtcbiAgICAgICAgaWYgKGZyYW1lLmlubmVyVGV4dCAmJiAhaGFzVGV4dCAmJiAhb3B0aW9ucy50ZXh0RmlsdGVyKSB7XG4gICAgICAgICAgcmVzdWx0ICs9IGZyYW1lLmlubmVyVGV4dDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAgb250ZXh0OiBmdW5jdGlvbih0ZXh0KSB7XG4gICAgICBpZiAoc2tpcFRleHQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgdmFyIGxhc3RGcmFtZSA9IHN0YWNrW3N0YWNrLmxlbmd0aC0xXTtcbiAgICAgIHZhciB0YWc7XG5cbiAgICAgIGlmIChsYXN0RnJhbWUpIHtcbiAgICAgICAgdGFnID0gbGFzdEZyYW1lLnRhZztcbiAgICAgICAgLy8gSWYgaW5uZXIgdGV4dCB3YXMgc2V0IGJ5IHRyYW5zZm9ybSBmdW5jdGlvbiB0aGVuIGxldCdzIHVzZSBpdFxuICAgICAgICB0ZXh0ID0gbGFzdEZyYW1lLmlubmVyVGV4dCAhPT0gdW5kZWZpbmVkID8gbGFzdEZyYW1lLmlubmVyVGV4dCA6IHRleHQ7XG4gICAgICB9XG5cbiAgICAgIGlmICgodGFnID09PSAnc2NyaXB0JykgfHwgKHRhZyA9PT0gJ3N0eWxlJykpIHtcbiAgICAgICAgLy8gaHRtbHBhcnNlcjIgZ2l2ZXMgdXMgdGhlc2UgYXMtaXMuIEVzY2FwaW5nIHRoZW0gcnVpbnMgdGhlIGNvbnRlbnQuIEFsbG93aW5nXG4gICAgICAgIC8vIHNjcmlwdCB0YWdzIGlzLCBieSBkZWZpbml0aW9uLCBnYW1lIG92ZXIgZm9yIFhTUyBwcm90ZWN0aW9uLCBzbyBpZiB0aGF0J3NcbiAgICAgICAgLy8geW91ciBjb25jZXJuLCBkb24ndCBhbGxvdyB0aGVtLiBUaGUgc2FtZSBpcyBlc3NlbnRpYWxseSB0cnVlIGZvciBzdHlsZSB0YWdzXG4gICAgICAgIC8vIHdoaWNoIGhhdmUgdGhlaXIgb3duIGNvbGxlY3Rpb24gb2YgWFNTIHZlY3RvcnMuXG4gICAgICAgIHJlc3VsdCArPSB0ZXh0O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIGVzY2FwZWQgPSBlc2NhcGVIdG1sKHRleHQpO1xuICAgICAgICBpZiAob3B0aW9ucy50ZXh0RmlsdGVyKSB7XG4gICAgICAgICAgcmVzdWx0ICs9IG9wdGlvbnMudGV4dEZpbHRlcihlc2NhcGVkKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXN1bHQgKz0gZXNjYXBlZDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHN0YWNrLmxlbmd0aCkge1xuICAgICAgICAgICB2YXIgZnJhbWUgPSBzdGFja1tzdGFjay5sZW5ndGggLSAxXTtcbiAgICAgICAgICAgZnJhbWUudGV4dCArPSB0ZXh0O1xuICAgICAgfVxuICAgIH0sXG4gICAgb25jbG9zZXRhZzogZnVuY3Rpb24obmFtZSkge1xuXG4gICAgICBpZiAoc2tpcFRleHQpIHtcbiAgICAgICAgc2tpcFRleHREZXB0aC0tO1xuICAgICAgICBpZiAoIXNraXBUZXh0RGVwdGgpIHtcbiAgICAgICAgICBza2lwVGV4dCA9IGZhbHNlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB2YXIgZnJhbWUgPSBzdGFjay5wb3AoKTtcbiAgICAgIGlmICghZnJhbWUpIHtcbiAgICAgICAgLy8gRG8gbm90IGNyYXNoIG9uIGJhZCBtYXJrdXBcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgc2tpcFRleHQgPSBmYWxzZTtcbiAgICAgIGRlcHRoLS07XG4gICAgICBpZiAoc2tpcE1hcFtkZXB0aF0pIHtcbiAgICAgICAgZGVsZXRlIHNraXBNYXBbZGVwdGhdO1xuICAgICAgICBmcmFtZS51cGRhdGVQYXJlbnROb2RlVGV4dCgpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmICh0cmFuc2Zvcm1NYXBbZGVwdGhdKSB7XG4gICAgICAgIG5hbWUgPSB0cmFuc2Zvcm1NYXBbZGVwdGhdO1xuICAgICAgICBkZWxldGUgdHJhbnNmb3JtTWFwW2RlcHRoXTtcbiAgICAgIH1cblxuICAgICAgaWYgKG9wdGlvbnMuZXhjbHVzaXZlRmlsdGVyICYmIG9wdGlvbnMuZXhjbHVzaXZlRmlsdGVyKGZyYW1lKSkge1xuICAgICAgICAgcmVzdWx0ID0gcmVzdWx0LnN1YnN0cigwLCBmcmFtZS50YWdQb3NpdGlvbik7XG4gICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGZyYW1lLnVwZGF0ZVBhcmVudE5vZGVUZXh0KCk7XG5cbiAgICAgIGlmIChvcHRpb25zLnNlbGZDbG9zaW5nLmluZGV4T2YobmFtZSkgIT09IC0xKSB7XG4gICAgICAgICAvLyBBbHJlYWR5IG91dHB1dCAvPlxuICAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICByZXN1bHQgKz0gXCI8L1wiICsgbmFtZSArIFwiPlwiO1xuICAgIH1cbiAgfSwgb3B0aW9ucy5wYXJzZXIpO1xuICBwYXJzZXIud3JpdGUoaHRtbCk7XG4gIHBhcnNlci5lbmQoKTtcblxuICByZXR1cm4gcmVzdWx0O1xuXG4gIGZ1bmN0aW9uIGVzY2FwZUh0bWwocykge1xuICAgIGlmICh0eXBlb2YocykgIT09ICdzdHJpbmcnKSB7XG4gICAgICBzID0gcyArICcnO1xuICAgIH1cbiAgICByZXR1cm4gcy5yZXBsYWNlKC9cXCYvZywgJyZhbXA7JykucmVwbGFjZSgvPC9nLCAnJmx0OycpLnJlcGxhY2UoL1xcPi9nLCAnJmd0OycpLnJlcGxhY2UoL1xcXCIvZywgJyZxdW90OycpO1xuICB9XG5cbiAgZnVuY3Rpb24gbmF1Z2h0eUhyZWYobmFtZSwgaHJlZikge1xuICAgIC8vIEJyb3dzZXJzIGlnbm9yZSBjaGFyYWN0ZXIgY29kZXMgb2YgMzIgKHNwYWNlKSBhbmQgYmVsb3cgaW4gYSBzdXJwcmlzaW5nXG4gICAgLy8gbnVtYmVyIG9mIHNpdHVhdGlvbnMuIFN0YXJ0IHJlYWRpbmcgaGVyZTpcbiAgICAvLyBodHRwczovL3d3dy5vd2FzcC5vcmcvaW5kZXgucGhwL1hTU19GaWx0ZXJfRXZhc2lvbl9DaGVhdF9TaGVldCNFbWJlZGRlZF90YWJcbiAgICBocmVmID0gaHJlZi5yZXBsYWNlKC9bXFx4MDAtXFx4MjBdKy9nLCAnJyk7XG4gICAgLy8gQ2xvYmJlciBhbnkgY29tbWVudHMgaW4gVVJMcywgd2hpY2ggdGhlIGJyb3dzZXIgbWlnaHRcbiAgICAvLyBpbnRlcnByZXQgaW5zaWRlIGFuIFhNTCBkYXRhIGlzbGFuZCwgYWxsb3dpbmdcbiAgICAvLyBhIGphdmFzY3JpcHQ6IFVSTCB0byBiZSBzbnVjayB0aHJvdWdoXG4gICAgaHJlZiA9IGhyZWYucmVwbGFjZSgvPFxcIVxcLVxcLS4qP1xcLVxcLVxcPi9nLCAnJyk7XG4gICAgLy8gQ2FzZSBpbnNlbnNpdGl2ZSBzbyB3ZSBkb24ndCBnZXQgZmFrZWQgb3V0IGJ5IEpBVkFTQ1JJUFQgIzFcbiAgICB2YXIgbWF0Y2hlcyA9IGhyZWYubWF0Y2goL14oW2EtekEtWl0rKVxcOi8pO1xuICAgIGlmICghbWF0Y2hlcykge1xuICAgICAgLy8gUHJvdG9jb2wtcmVsYXRpdmUgVVJMOiBcIi8vc29tZS5ldmlsLmNvbS9uYXN0eVwiXG4gICAgICBpZiAoaHJlZi5tYXRjaCgvXlxcL1xcLy8pKSB7XG4gICAgICAgIHJldHVybiAhb3B0aW9ucy5hbGxvd1Byb3RvY29sUmVsYXRpdmU7XG4gICAgICB9XG5cbiAgICAgIC8vIE5vIHNjaGVtZVxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICB2YXIgc2NoZW1lID0gbWF0Y2hlc1sxXS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgaWYgKGhhcyhvcHRpb25zLmFsbG93ZWRTY2hlbWVzQnlUYWcsIG5hbWUpKSB7XG4gICAgICByZXR1cm4gb3B0aW9ucy5hbGxvd2VkU2NoZW1lc0J5VGFnW25hbWVdLmluZGV4T2Yoc2NoZW1lKSA9PT0gLTE7XG4gICAgfVxuXG4gICAgcmV0dXJuICFvcHRpb25zLmFsbG93ZWRTY2hlbWVzIHx8IG9wdGlvbnMuYWxsb3dlZFNjaGVtZXMuaW5kZXhPZihzY2hlbWUpID09PSAtMTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGZpbHRlckNsYXNzZXMoY2xhc3NlcywgYWxsb3dlZCkge1xuICAgIGlmICghYWxsb3dlZCkge1xuICAgICAgLy8gVGhlIGNsYXNzIGF0dHJpYnV0ZSBpcyBhbGxvd2VkIHdpdGhvdXQgZmlsdGVyaW5nIG9uIHRoaXMgdGFnXG4gICAgICByZXR1cm4gY2xhc3NlcztcbiAgICB9XG4gICAgY2xhc3NlcyA9IGNsYXNzZXMuc3BsaXQoL1xccysvKTtcbiAgICByZXR1cm4gY2xhc3Nlcy5maWx0ZXIoZnVuY3Rpb24oY2xzcykge1xuICAgICAgcmV0dXJuIGFsbG93ZWQuaW5kZXhPZihjbHNzKSAhPT0gLTE7XG4gICAgfSkuam9pbignICcpO1xuICB9XG59XG5cbi8vIERlZmF1bHRzIGFyZSBhY2Nlc3NpYmxlIHRvIHlvdSBzbyB0aGF0IHlvdSBjYW4gdXNlIHRoZW0gYXMgYSBzdGFydGluZyBwb2ludFxuLy8gcHJvZ3JhbW1hdGljYWxseSBpZiB5b3Ugd2lzaFxuXG52YXIgaHRtbFBhcnNlckRlZmF1bHRzID0ge1xuICBkZWNvZGVFbnRpdGllczogdHJ1ZVxufTtcbnNhbml0aXplSHRtbC5kZWZhdWx0cyA9IHtcbiAgYWxsb3dlZFRhZ3M6IFsgJ2gzJywgJ2g0JywgJ2g1JywgJ2g2JywgJ2Jsb2NrcXVvdGUnLCAncCcsICdhJywgJ3VsJywgJ29sJyxcbiAgICAnbmwnLCAnbGknLCAnYicsICdpJywgJ3N0cm9uZycsICdlbScsICdzdHJpa2UnLCAnY29kZScsICdocicsICdicicsICdkaXYnLFxuICAgICd0YWJsZScsICd0aGVhZCcsICdjYXB0aW9uJywgJ3Rib2R5JywgJ3RyJywgJ3RoJywgJ3RkJywgJ3ByZScgXSxcbiAgYWxsb3dlZEF0dHJpYnV0ZXM6IHtcbiAgICBhOiBbICdocmVmJywgJ25hbWUnLCAndGFyZ2V0JyBdLFxuICAgIC8vIFdlIGRvbid0IGN1cnJlbnRseSBhbGxvdyBpbWcgaXRzZWxmIGJ5IGRlZmF1bHQsIGJ1dCB0aGlzXG4gICAgLy8gd291bGQgbWFrZSBzZW5zZSBpZiB3ZSBkaWRcbiAgICBpbWc6IFsgJ3NyYycgXVxuICB9LFxuICAvLyBMb3RzIG9mIHRoZXNlIHdvbid0IGNvbWUgdXAgYnkgZGVmYXVsdCBiZWNhdXNlIHdlIGRvbid0IGFsbG93IHRoZW1cbiAgc2VsZkNsb3Npbmc6IFsgJ2ltZycsICdicicsICdocicsICdhcmVhJywgJ2Jhc2UnLCAnYmFzZWZvbnQnLCAnaW5wdXQnLCAnbGluaycsICdtZXRhJyBdLFxuICAvLyBVUkwgc2NoZW1lcyB3ZSBwZXJtaXRcbiAgYWxsb3dlZFNjaGVtZXM6IFsgJ2h0dHAnLCAnaHR0cHMnLCAnZnRwJywgJ21haWx0bycgXSxcbiAgYWxsb3dlZFNjaGVtZXNCeVRhZzoge30sXG4gIGFsbG93UHJvdG9jb2xSZWxhdGl2ZTogdHJ1ZVxufTtcblxuc2FuaXRpemVIdG1sLnNpbXBsZVRyYW5zZm9ybSA9IGZ1bmN0aW9uKG5ld1RhZ05hbWUsIG5ld0F0dHJpYnMsIG1lcmdlKSB7XG4gIG1lcmdlID0gKG1lcmdlID09PSB1bmRlZmluZWQpID8gdHJ1ZSA6IG1lcmdlO1xuICBuZXdBdHRyaWJzID0gbmV3QXR0cmlicyB8fCB7fTtcblxuICByZXR1cm4gZnVuY3Rpb24odGFnTmFtZSwgYXR0cmlicykge1xuICAgIHZhciBhdHRyaWI7XG4gICAgaWYgKG1lcmdlKSB7XG4gICAgICBmb3IgKGF0dHJpYiBpbiBuZXdBdHRyaWJzKSB7XG4gICAgICAgIGF0dHJpYnNbYXR0cmliXSA9IG5ld0F0dHJpYnNbYXR0cmliXTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgYXR0cmlicyA9IG5ld0F0dHJpYnM7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIHRhZ05hbWU6IG5ld1RhZ05hbWUsXG4gICAgICBhdHRyaWJzOiBhdHRyaWJzXG4gICAgfTtcbiAgfTtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IENvbGxlY3RpbmdIYW5kbGVyO1xuXG5mdW5jdGlvbiBDb2xsZWN0aW5nSGFuZGxlcihjYnMpe1xuXHR0aGlzLl9jYnMgPSBjYnMgfHwge307XG5cdHRoaXMuZXZlbnRzID0gW107XG59XG5cbnZhciBFVkVOVFMgPSByZXF1aXJlKFwiLi9cIikuRVZFTlRTO1xuT2JqZWN0LmtleXMoRVZFTlRTKS5mb3JFYWNoKGZ1bmN0aW9uKG5hbWUpe1xuXHRpZihFVkVOVFNbbmFtZV0gPT09IDApe1xuXHRcdG5hbWUgPSBcIm9uXCIgKyBuYW1lO1xuXHRcdENvbGxlY3RpbmdIYW5kbGVyLnByb3RvdHlwZVtuYW1lXSA9IGZ1bmN0aW9uKCl7XG5cdFx0XHR0aGlzLmV2ZW50cy5wdXNoKFtuYW1lXSk7XG5cdFx0XHRpZih0aGlzLl9jYnNbbmFtZV0pIHRoaXMuX2Nic1tuYW1lXSgpO1xuXHRcdH07XG5cdH0gZWxzZSBpZihFVkVOVFNbbmFtZV0gPT09IDEpe1xuXHRcdG5hbWUgPSBcIm9uXCIgKyBuYW1lO1xuXHRcdENvbGxlY3RpbmdIYW5kbGVyLnByb3RvdHlwZVtuYW1lXSA9IGZ1bmN0aW9uKGEpe1xuXHRcdFx0dGhpcy5ldmVudHMucHVzaChbbmFtZSwgYV0pO1xuXHRcdFx0aWYodGhpcy5fY2JzW25hbWVdKSB0aGlzLl9jYnNbbmFtZV0oYSk7XG5cdFx0fTtcblx0fSBlbHNlIGlmKEVWRU5UU1tuYW1lXSA9PT0gMil7XG5cdFx0bmFtZSA9IFwib25cIiArIG5hbWU7XG5cdFx0Q29sbGVjdGluZ0hhbmRsZXIucHJvdG90eXBlW25hbWVdID0gZnVuY3Rpb24oYSwgYil7XG5cdFx0XHR0aGlzLmV2ZW50cy5wdXNoKFtuYW1lLCBhLCBiXSk7XG5cdFx0XHRpZih0aGlzLl9jYnNbbmFtZV0pIHRoaXMuX2Nic1tuYW1lXShhLCBiKTtcblx0XHR9O1xuXHR9IGVsc2Uge1xuXHRcdHRocm93IEVycm9yKFwid3JvbmcgbnVtYmVyIG9mIGFyZ3VtZW50c1wiKTtcblx0fVxufSk7XG5cbkNvbGxlY3RpbmdIYW5kbGVyLnByb3RvdHlwZS5vbnJlc2V0ID0gZnVuY3Rpb24oKXtcblx0dGhpcy5ldmVudHMgPSBbXTtcblx0aWYodGhpcy5fY2JzLm9ucmVzZXQpIHRoaXMuX2Nicy5vbnJlc2V0KCk7XG59O1xuXG5Db2xsZWN0aW5nSGFuZGxlci5wcm90b3R5cGUucmVzdGFydCA9IGZ1bmN0aW9uKCl7XG5cdGlmKHRoaXMuX2Nicy5vbnJlc2V0KSB0aGlzLl9jYnMub25yZXNldCgpO1xuXG5cdGZvcih2YXIgaSA9IDAsIGxlbiA9IHRoaXMuZXZlbnRzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKXtcblx0XHRpZih0aGlzLl9jYnNbdGhpcy5ldmVudHNbaV1bMF1dKXtcblxuXHRcdFx0dmFyIG51bSA9IHRoaXMuZXZlbnRzW2ldLmxlbmd0aDtcblxuXHRcdFx0aWYobnVtID09PSAxKXtcblx0XHRcdFx0dGhpcy5fY2JzW3RoaXMuZXZlbnRzW2ldWzBdXSgpO1xuXHRcdFx0fSBlbHNlIGlmKG51bSA9PT0gMil7XG5cdFx0XHRcdHRoaXMuX2Nic1t0aGlzLmV2ZW50c1tpXVswXV0odGhpcy5ldmVudHNbaV1bMV0pO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dGhpcy5fY2JzW3RoaXMuZXZlbnRzW2ldWzBdXSh0aGlzLmV2ZW50c1tpXVsxXSwgdGhpcy5ldmVudHNbaV1bMl0pO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxufTtcbiIsInZhciBpbmRleCA9IHJlcXVpcmUoXCIuL2luZGV4LmpzXCIpLFxuICAgIERvbUhhbmRsZXIgPSBpbmRleC5Eb21IYW5kbGVyLFxuICAgIERvbVV0aWxzID0gaW5kZXguRG9tVXRpbHM7XG5cbi8vVE9ETzogbWFrZSB0aGlzIGEgc3RyZWFtYWJsZSBoYW5kbGVyXG5mdW5jdGlvbiBGZWVkSGFuZGxlcihjYWxsYmFjaywgb3B0aW9ucyl7XG5cdHRoaXMuaW5pdChjYWxsYmFjaywgb3B0aW9ucyk7XG59XG5cbnJlcXVpcmUoXCJpbmhlcml0c1wiKShGZWVkSGFuZGxlciwgRG9tSGFuZGxlcik7XG5cbkZlZWRIYW5kbGVyLnByb3RvdHlwZS5pbml0ID0gRG9tSGFuZGxlcjtcblxuZnVuY3Rpb24gZ2V0RWxlbWVudHMod2hhdCwgd2hlcmUpe1xuXHRyZXR1cm4gRG9tVXRpbHMuZ2V0RWxlbWVudHNCeVRhZ05hbWUod2hhdCwgd2hlcmUsIHRydWUpO1xufVxuZnVuY3Rpb24gZ2V0T25lRWxlbWVudCh3aGF0LCB3aGVyZSl7XG5cdHJldHVybiBEb21VdGlscy5nZXRFbGVtZW50c0J5VGFnTmFtZSh3aGF0LCB3aGVyZSwgdHJ1ZSwgMSlbMF07XG59XG5mdW5jdGlvbiBmZXRjaCh3aGF0LCB3aGVyZSwgcmVjdXJzZSl7XG5cdHJldHVybiBEb21VdGlscy5nZXRUZXh0KFxuXHRcdERvbVV0aWxzLmdldEVsZW1lbnRzQnlUYWdOYW1lKHdoYXQsIHdoZXJlLCByZWN1cnNlLCAxKVxuXHQpLnRyaW0oKTtcbn1cblxuZnVuY3Rpb24gYWRkQ29uZGl0aW9uYWxseShvYmosIHByb3AsIHdoYXQsIHdoZXJlLCByZWN1cnNlKXtcblx0dmFyIHRtcCA9IGZldGNoKHdoYXQsIHdoZXJlLCByZWN1cnNlKTtcblx0aWYodG1wKSBvYmpbcHJvcF0gPSB0bXA7XG59XG5cbnZhciBpc1ZhbGlkRmVlZCA9IGZ1bmN0aW9uKHZhbHVlKXtcblx0cmV0dXJuIHZhbHVlID09PSBcInJzc1wiIHx8IHZhbHVlID09PSBcImZlZWRcIiB8fCB2YWx1ZSA9PT0gXCJyZGY6UkRGXCI7XG59O1xuXG5GZWVkSGFuZGxlci5wcm90b3R5cGUub25lbmQgPSBmdW5jdGlvbigpe1xuXHR2YXIgZmVlZCA9IHt9LFxuXHQgICAgZmVlZFJvb3QgPSBnZXRPbmVFbGVtZW50KGlzVmFsaWRGZWVkLCB0aGlzLmRvbSksXG5cdCAgICB0bXAsIGNoaWxkcztcblxuXHRpZihmZWVkUm9vdCl7XG5cdFx0aWYoZmVlZFJvb3QubmFtZSA9PT0gXCJmZWVkXCIpe1xuXHRcdFx0Y2hpbGRzID0gZmVlZFJvb3QuY2hpbGRyZW47XG5cblx0XHRcdGZlZWQudHlwZSA9IFwiYXRvbVwiO1xuXHRcdFx0YWRkQ29uZGl0aW9uYWxseShmZWVkLCBcImlkXCIsIFwiaWRcIiwgY2hpbGRzKTtcblx0XHRcdGFkZENvbmRpdGlvbmFsbHkoZmVlZCwgXCJ0aXRsZVwiLCBcInRpdGxlXCIsIGNoaWxkcyk7XG5cdFx0XHRpZigodG1wID0gZ2V0T25lRWxlbWVudChcImxpbmtcIiwgY2hpbGRzKSkgJiYgKHRtcCA9IHRtcC5hdHRyaWJzKSAmJiAodG1wID0gdG1wLmhyZWYpKSBmZWVkLmxpbmsgPSB0bXA7XG5cdFx0XHRhZGRDb25kaXRpb25hbGx5KGZlZWQsIFwiZGVzY3JpcHRpb25cIiwgXCJzdWJ0aXRsZVwiLCBjaGlsZHMpO1xuXHRcdFx0aWYoKHRtcCA9IGZldGNoKFwidXBkYXRlZFwiLCBjaGlsZHMpKSkgZmVlZC51cGRhdGVkID0gbmV3IERhdGUodG1wKTtcblx0XHRcdGFkZENvbmRpdGlvbmFsbHkoZmVlZCwgXCJhdXRob3JcIiwgXCJlbWFpbFwiLCBjaGlsZHMsIHRydWUpO1xuXG5cdFx0XHRmZWVkLml0ZW1zID0gZ2V0RWxlbWVudHMoXCJlbnRyeVwiLCBjaGlsZHMpLm1hcChmdW5jdGlvbihpdGVtKXtcblx0XHRcdFx0dmFyIGVudHJ5ID0ge30sIHRtcDtcblxuXHRcdFx0XHRpdGVtID0gaXRlbS5jaGlsZHJlbjtcblxuXHRcdFx0XHRhZGRDb25kaXRpb25hbGx5KGVudHJ5LCBcImlkXCIsIFwiaWRcIiwgaXRlbSk7XG5cdFx0XHRcdGFkZENvbmRpdGlvbmFsbHkoZW50cnksIFwidGl0bGVcIiwgXCJ0aXRsZVwiLCBpdGVtKTtcblx0XHRcdFx0aWYoKHRtcCA9IGdldE9uZUVsZW1lbnQoXCJsaW5rXCIsIGl0ZW0pKSAmJiAodG1wID0gdG1wLmF0dHJpYnMpICYmICh0bXAgPSB0bXAuaHJlZikpIGVudHJ5LmxpbmsgPSB0bXA7XG5cdFx0XHRcdGlmKCh0bXAgPSBmZXRjaChcInN1bW1hcnlcIiwgaXRlbSkgfHwgZmV0Y2goXCJjb250ZW50XCIsIGl0ZW0pKSkgZW50cnkuZGVzY3JpcHRpb24gPSB0bXA7XG5cdFx0XHRcdGlmKCh0bXAgPSBmZXRjaChcInVwZGF0ZWRcIiwgaXRlbSkpKSBlbnRyeS5wdWJEYXRlID0gbmV3IERhdGUodG1wKTtcblx0XHRcdFx0cmV0dXJuIGVudHJ5O1xuXHRcdFx0fSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGNoaWxkcyA9IGdldE9uZUVsZW1lbnQoXCJjaGFubmVsXCIsIGZlZWRSb290LmNoaWxkcmVuKS5jaGlsZHJlbjtcblxuXHRcdFx0ZmVlZC50eXBlID0gZmVlZFJvb3QubmFtZS5zdWJzdHIoMCwgMyk7XG5cdFx0XHRmZWVkLmlkID0gXCJcIjtcblx0XHRcdGFkZENvbmRpdGlvbmFsbHkoZmVlZCwgXCJ0aXRsZVwiLCBcInRpdGxlXCIsIGNoaWxkcyk7XG5cdFx0XHRhZGRDb25kaXRpb25hbGx5KGZlZWQsIFwibGlua1wiLCBcImxpbmtcIiwgY2hpbGRzKTtcblx0XHRcdGFkZENvbmRpdGlvbmFsbHkoZmVlZCwgXCJkZXNjcmlwdGlvblwiLCBcImRlc2NyaXB0aW9uXCIsIGNoaWxkcyk7XG5cdFx0XHRpZigodG1wID0gZmV0Y2goXCJsYXN0QnVpbGREYXRlXCIsIGNoaWxkcykpKSBmZWVkLnVwZGF0ZWQgPSBuZXcgRGF0ZSh0bXApO1xuXHRcdFx0YWRkQ29uZGl0aW9uYWxseShmZWVkLCBcImF1dGhvclwiLCBcIm1hbmFnaW5nRWRpdG9yXCIsIGNoaWxkcywgdHJ1ZSk7XG5cblx0XHRcdGZlZWQuaXRlbXMgPSBnZXRFbGVtZW50cyhcIml0ZW1cIiwgZmVlZFJvb3QuY2hpbGRyZW4pLm1hcChmdW5jdGlvbihpdGVtKXtcblx0XHRcdFx0dmFyIGVudHJ5ID0ge30sIHRtcDtcblxuXHRcdFx0XHRpdGVtID0gaXRlbS5jaGlsZHJlbjtcblxuXHRcdFx0XHRhZGRDb25kaXRpb25hbGx5KGVudHJ5LCBcImlkXCIsIFwiZ3VpZFwiLCBpdGVtKTtcblx0XHRcdFx0YWRkQ29uZGl0aW9uYWxseShlbnRyeSwgXCJ0aXRsZVwiLCBcInRpdGxlXCIsIGl0ZW0pO1xuXHRcdFx0XHRhZGRDb25kaXRpb25hbGx5KGVudHJ5LCBcImxpbmtcIiwgXCJsaW5rXCIsIGl0ZW0pO1xuXHRcdFx0XHRhZGRDb25kaXRpb25hbGx5KGVudHJ5LCBcImRlc2NyaXB0aW9uXCIsIFwiZGVzY3JpcHRpb25cIiwgaXRlbSk7XG5cdFx0XHRcdGlmKCh0bXAgPSBmZXRjaChcInB1YkRhdGVcIiwgaXRlbSkpKSBlbnRyeS5wdWJEYXRlID0gbmV3IERhdGUodG1wKTtcblx0XHRcdFx0cmV0dXJuIGVudHJ5O1xuXHRcdFx0fSk7XG5cdFx0fVxuXHR9XG5cdHRoaXMuZG9tID0gZmVlZDtcblx0RG9tSGFuZGxlci5wcm90b3R5cGUuX2hhbmRsZUNhbGxiYWNrLmNhbGwoXG5cdFx0dGhpcywgZmVlZFJvb3QgPyBudWxsIDogRXJyb3IoXCJjb3VsZG4ndCBmaW5kIHJvb3Qgb2YgZmVlZFwiKVxuXHQpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBGZWVkSGFuZGxlcjtcbiIsInZhciBUb2tlbml6ZXIgPSByZXF1aXJlKFwiLi9Ub2tlbml6ZXIuanNcIik7XG5cbi8qXG5cdE9wdGlvbnM6XG5cblx0eG1sTW9kZTogRGlzYWJsZXMgdGhlIHNwZWNpYWwgYmVoYXZpb3IgZm9yIHNjcmlwdC9zdHlsZSB0YWdzIChmYWxzZSBieSBkZWZhdWx0KVxuXHRsb3dlckNhc2VBdHRyaWJ1dGVOYW1lczogY2FsbCAudG9Mb3dlckNhc2UgZm9yIGVhY2ggYXR0cmlidXRlIG5hbWUgKHRydWUgaWYgeG1sTW9kZSBpcyBgZmFsc2VgKVxuXHRsb3dlckNhc2VUYWdzOiBjYWxsIC50b0xvd2VyQ2FzZSBmb3IgZWFjaCB0YWcgbmFtZSAodHJ1ZSBpZiB4bWxNb2RlIGlzIGBmYWxzZWApXG4qL1xuXG4vKlxuXHRDYWxsYmFja3M6XG5cblx0b25jZGF0YWVuZCxcblx0b25jZGF0YXN0YXJ0LFxuXHRvbmNsb3NldGFnLFxuXHRvbmNvbW1lbnQsXG5cdG9uY29tbWVudGVuZCxcblx0b25lcnJvcixcblx0b25vcGVudGFnLFxuXHRvbnByb2Nlc3NpbmdpbnN0cnVjdGlvbixcblx0b25yZXNldCxcblx0b250ZXh0XG4qL1xuXG52YXIgZm9ybVRhZ3MgPSB7XG5cdGlucHV0OiB0cnVlLFxuXHRvcHRpb246IHRydWUsXG5cdG9wdGdyb3VwOiB0cnVlLFxuXHRzZWxlY3Q6IHRydWUsXG5cdGJ1dHRvbjogdHJ1ZSxcblx0ZGF0YWxpc3Q6IHRydWUsXG5cdHRleHRhcmVhOiB0cnVlXG59O1xuXG52YXIgb3BlbkltcGxpZXNDbG9zZSA9IHtcblx0dHIgICAgICA6IHsgdHI6dHJ1ZSwgdGg6dHJ1ZSwgdGQ6dHJ1ZSB9LFxuXHR0aCAgICAgIDogeyB0aDp0cnVlIH0sXG5cdHRkICAgICAgOiB7IHRoZWFkOnRydWUsIHRoOnRydWUsIHRkOnRydWUgfSxcblx0Ym9keSAgICA6IHsgaGVhZDp0cnVlLCBsaW5rOnRydWUsIHNjcmlwdDp0cnVlIH0sXG5cdGxpICAgICAgOiB7IGxpOnRydWUgfSxcblx0cCAgICAgICA6IHsgcDp0cnVlIH0sXG5cdGgxICAgICAgOiB7IHA6dHJ1ZSB9LFxuXHRoMiAgICAgIDogeyBwOnRydWUgfSxcblx0aDMgICAgICA6IHsgcDp0cnVlIH0sXG5cdGg0ICAgICAgOiB7IHA6dHJ1ZSB9LFxuXHRoNSAgICAgIDogeyBwOnRydWUgfSxcblx0aDYgICAgICA6IHsgcDp0cnVlIH0sXG5cdHNlbGVjdCAgOiBmb3JtVGFncyxcblx0aW5wdXQgICA6IGZvcm1UYWdzLFxuXHRvdXRwdXQgIDogZm9ybVRhZ3MsXG5cdGJ1dHRvbiAgOiBmb3JtVGFncyxcblx0ZGF0YWxpc3Q6IGZvcm1UYWdzLFxuXHR0ZXh0YXJlYTogZm9ybVRhZ3MsXG5cdG9wdGlvbiAgOiB7IG9wdGlvbjp0cnVlIH0sXG5cdG9wdGdyb3VwOiB7IG9wdGdyb3VwOnRydWUgfVxufTtcblxudmFyIHZvaWRFbGVtZW50cyA9IHtcblx0X19wcm90b19fOiBudWxsLFxuXHRhcmVhOiB0cnVlLFxuXHRiYXNlOiB0cnVlLFxuXHRiYXNlZm9udDogdHJ1ZSxcblx0YnI6IHRydWUsXG5cdGNvbDogdHJ1ZSxcblx0Y29tbWFuZDogdHJ1ZSxcblx0ZW1iZWQ6IHRydWUsXG5cdGZyYW1lOiB0cnVlLFxuXHRocjogdHJ1ZSxcblx0aW1nOiB0cnVlLFxuXHRpbnB1dDogdHJ1ZSxcblx0aXNpbmRleDogdHJ1ZSxcblx0a2V5Z2VuOiB0cnVlLFxuXHRsaW5rOiB0cnVlLFxuXHRtZXRhOiB0cnVlLFxuXHRwYXJhbTogdHJ1ZSxcblx0c291cmNlOiB0cnVlLFxuXHR0cmFjazogdHJ1ZSxcblx0d2JyOiB0cnVlLFxuXG5cdC8vY29tbW9uIHNlbGYgY2xvc2luZyBzdmcgZWxlbWVudHNcblx0cGF0aDogdHJ1ZSxcblx0Y2lyY2xlOiB0cnVlLFxuXHRlbGxpcHNlOiB0cnVlLFxuXHRsaW5lOiB0cnVlLFxuXHRyZWN0OiB0cnVlLFxuXHR1c2U6IHRydWUsXG5cdHN0b3A6IHRydWUsXG5cdHBvbHlsaW5lOiB0cnVlLFxuXHRwb2x5Z29uOiB0cnVlXG59O1xuXG52YXIgcmVfbmFtZUVuZCA9IC9cXHN8XFwvLztcblxuZnVuY3Rpb24gUGFyc2VyKGNicywgb3B0aW9ucyl7XG5cdHRoaXMuX29wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXHR0aGlzLl9jYnMgPSBjYnMgfHwge307XG5cblx0dGhpcy5fdGFnbmFtZSA9IFwiXCI7XG5cdHRoaXMuX2F0dHJpYm5hbWUgPSBcIlwiO1xuXHR0aGlzLl9hdHRyaWJ2YWx1ZSA9IFwiXCI7XG5cdHRoaXMuX2F0dHJpYnMgPSBudWxsO1xuXHR0aGlzLl9zdGFjayA9IFtdO1xuXG5cdHRoaXMuc3RhcnRJbmRleCA9IDA7XG5cdHRoaXMuZW5kSW5kZXggPSBudWxsO1xuXG5cdHRoaXMuX2xvd2VyQ2FzZVRhZ05hbWVzID0gXCJsb3dlckNhc2VUYWdzXCIgaW4gdGhpcy5fb3B0aW9ucyA/XG5cdFx0XHRcdFx0XHRcdFx0XHQhIXRoaXMuX29wdGlvbnMubG93ZXJDYXNlVGFncyA6XG5cdFx0XHRcdFx0XHRcdFx0XHQhdGhpcy5fb3B0aW9ucy54bWxNb2RlO1xuXHR0aGlzLl9sb3dlckNhc2VBdHRyaWJ1dGVOYW1lcyA9IFwibG93ZXJDYXNlQXR0cmlidXRlTmFtZXNcIiBpbiB0aGlzLl9vcHRpb25zID9cblx0XHRcdFx0XHRcdFx0XHRcdCEhdGhpcy5fb3B0aW9ucy5sb3dlckNhc2VBdHRyaWJ1dGVOYW1lcyA6XG5cdFx0XHRcdFx0XHRcdFx0XHQhdGhpcy5fb3B0aW9ucy54bWxNb2RlO1xuXG5cdGlmKHRoaXMuX29wdGlvbnMuVG9rZW5pemVyKSB7XG5cdFx0VG9rZW5pemVyID0gdGhpcy5fb3B0aW9ucy5Ub2tlbml6ZXI7XG5cdH1cblx0dGhpcy5fdG9rZW5pemVyID0gbmV3IFRva2VuaXplcih0aGlzLl9vcHRpb25zLCB0aGlzKTtcblxuXHRpZih0aGlzLl9jYnMub25wYXJzZXJpbml0KSB0aGlzLl9jYnMub25wYXJzZXJpbml0KHRoaXMpO1xufVxuXG5yZXF1aXJlKFwiaW5oZXJpdHNcIikoUGFyc2VyLCByZXF1aXJlKFwiZXZlbnRzXCIpLkV2ZW50RW1pdHRlcik7XG5cblBhcnNlci5wcm90b3R5cGUuX3VwZGF0ZVBvc2l0aW9uID0gZnVuY3Rpb24oaW5pdGlhbE9mZnNldCl7XG5cdGlmKHRoaXMuZW5kSW5kZXggPT09IG51bGwpe1xuXHRcdGlmKHRoaXMuX3Rva2VuaXplci5fc2VjdGlvblN0YXJ0IDw9IGluaXRpYWxPZmZzZXQpe1xuXHRcdFx0dGhpcy5zdGFydEluZGV4ID0gMDtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5zdGFydEluZGV4ID0gdGhpcy5fdG9rZW5pemVyLl9zZWN0aW9uU3RhcnQgLSBpbml0aWFsT2Zmc2V0O1xuXHRcdH1cblx0fVxuXHRlbHNlIHRoaXMuc3RhcnRJbmRleCA9IHRoaXMuZW5kSW5kZXggKyAxO1xuXHR0aGlzLmVuZEluZGV4ID0gdGhpcy5fdG9rZW5pemVyLmdldEFic29sdXRlSW5kZXgoKTtcbn07XG5cbi8vVG9rZW5pemVyIGV2ZW50IGhhbmRsZXJzXG5QYXJzZXIucHJvdG90eXBlLm9udGV4dCA9IGZ1bmN0aW9uKGRhdGEpe1xuXHR0aGlzLl91cGRhdGVQb3NpdGlvbigxKTtcblx0dGhpcy5lbmRJbmRleC0tO1xuXG5cdGlmKHRoaXMuX2Nicy5vbnRleHQpIHRoaXMuX2Nicy5vbnRleHQoZGF0YSk7XG59O1xuXG5QYXJzZXIucHJvdG90eXBlLm9ub3BlbnRhZ25hbWUgPSBmdW5jdGlvbihuYW1lKXtcblx0aWYodGhpcy5fbG93ZXJDYXNlVGFnTmFtZXMpe1xuXHRcdG5hbWUgPSBuYW1lLnRvTG93ZXJDYXNlKCk7XG5cdH1cblxuXHR0aGlzLl90YWduYW1lID0gbmFtZTtcblxuXHRpZighdGhpcy5fb3B0aW9ucy54bWxNb2RlICYmIG5hbWUgaW4gb3BlbkltcGxpZXNDbG9zZSkge1xuXHRcdGZvcihcblx0XHRcdHZhciBlbDtcblx0XHRcdChlbCA9IHRoaXMuX3N0YWNrW3RoaXMuX3N0YWNrLmxlbmd0aCAtIDFdKSBpbiBvcGVuSW1wbGllc0Nsb3NlW25hbWVdO1xuXHRcdFx0dGhpcy5vbmNsb3NldGFnKGVsKVxuXHRcdCk7XG5cdH1cblxuXHRpZih0aGlzLl9vcHRpb25zLnhtbE1vZGUgfHwgIShuYW1lIGluIHZvaWRFbGVtZW50cykpe1xuXHRcdHRoaXMuX3N0YWNrLnB1c2gobmFtZSk7XG5cdH1cblxuXHRpZih0aGlzLl9jYnMub25vcGVudGFnbmFtZSkgdGhpcy5fY2JzLm9ub3BlbnRhZ25hbWUobmFtZSk7XG5cdGlmKHRoaXMuX2Nicy5vbm9wZW50YWcpIHRoaXMuX2F0dHJpYnMgPSB7fTtcbn07XG5cblBhcnNlci5wcm90b3R5cGUub25vcGVudGFnZW5kID0gZnVuY3Rpb24oKXtcblx0dGhpcy5fdXBkYXRlUG9zaXRpb24oMSk7XG5cblx0aWYodGhpcy5fYXR0cmlicyl7XG5cdFx0aWYodGhpcy5fY2JzLm9ub3BlbnRhZykgdGhpcy5fY2JzLm9ub3BlbnRhZyh0aGlzLl90YWduYW1lLCB0aGlzLl9hdHRyaWJzKTtcblx0XHR0aGlzLl9hdHRyaWJzID0gbnVsbDtcblx0fVxuXG5cdGlmKCF0aGlzLl9vcHRpb25zLnhtbE1vZGUgJiYgdGhpcy5fY2JzLm9uY2xvc2V0YWcgJiYgdGhpcy5fdGFnbmFtZSBpbiB2b2lkRWxlbWVudHMpe1xuXHRcdHRoaXMuX2Nicy5vbmNsb3NldGFnKHRoaXMuX3RhZ25hbWUpO1xuXHR9XG5cblx0dGhpcy5fdGFnbmFtZSA9IFwiXCI7XG59O1xuXG5QYXJzZXIucHJvdG90eXBlLm9uY2xvc2V0YWcgPSBmdW5jdGlvbihuYW1lKXtcblx0dGhpcy5fdXBkYXRlUG9zaXRpb24oMSk7XG5cblx0aWYodGhpcy5fbG93ZXJDYXNlVGFnTmFtZXMpe1xuXHRcdG5hbWUgPSBuYW1lLnRvTG93ZXJDYXNlKCk7XG5cdH1cblxuXHRpZih0aGlzLl9zdGFjay5sZW5ndGggJiYgKCEobmFtZSBpbiB2b2lkRWxlbWVudHMpIHx8IHRoaXMuX29wdGlvbnMueG1sTW9kZSkpe1xuXHRcdHZhciBwb3MgPSB0aGlzLl9zdGFjay5sYXN0SW5kZXhPZihuYW1lKTtcblx0XHRpZihwb3MgIT09IC0xKXtcblx0XHRcdGlmKHRoaXMuX2Nicy5vbmNsb3NldGFnKXtcblx0XHRcdFx0cG9zID0gdGhpcy5fc3RhY2subGVuZ3RoIC0gcG9zO1xuXHRcdFx0XHR3aGlsZShwb3MtLSkgdGhpcy5fY2JzLm9uY2xvc2V0YWcodGhpcy5fc3RhY2sucG9wKCkpO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZSB0aGlzLl9zdGFjay5sZW5ndGggPSBwb3M7XG5cdFx0fSBlbHNlIGlmKG5hbWUgPT09IFwicFwiICYmICF0aGlzLl9vcHRpb25zLnhtbE1vZGUpe1xuXHRcdFx0dGhpcy5vbm9wZW50YWduYW1lKG5hbWUpO1xuXHRcdFx0dGhpcy5fY2xvc2VDdXJyZW50VGFnKCk7XG5cdFx0fVxuXHR9IGVsc2UgaWYoIXRoaXMuX29wdGlvbnMueG1sTW9kZSAmJiAobmFtZSA9PT0gXCJiclwiIHx8IG5hbWUgPT09IFwicFwiKSl7XG5cdFx0dGhpcy5vbm9wZW50YWduYW1lKG5hbWUpO1xuXHRcdHRoaXMuX2Nsb3NlQ3VycmVudFRhZygpO1xuXHR9XG59O1xuXG5QYXJzZXIucHJvdG90eXBlLm9uc2VsZmNsb3Npbmd0YWcgPSBmdW5jdGlvbigpe1xuXHRpZih0aGlzLl9vcHRpb25zLnhtbE1vZGUgfHwgdGhpcy5fb3B0aW9ucy5yZWNvZ25pemVTZWxmQ2xvc2luZyl7XG5cdFx0dGhpcy5fY2xvc2VDdXJyZW50VGFnKCk7XG5cdH0gZWxzZSB7XG5cdFx0dGhpcy5vbm9wZW50YWdlbmQoKTtcblx0fVxufTtcblxuUGFyc2VyLnByb3RvdHlwZS5fY2xvc2VDdXJyZW50VGFnID0gZnVuY3Rpb24oKXtcblx0dmFyIG5hbWUgPSB0aGlzLl90YWduYW1lO1xuXG5cdHRoaXMub25vcGVudGFnZW5kKCk7XG5cblx0Ly9zZWxmLWNsb3NpbmcgdGFncyB3aWxsIGJlIG9uIHRoZSB0b3Agb2YgdGhlIHN0YWNrXG5cdC8vKGNoZWFwZXIgY2hlY2sgdGhhbiBpbiBvbmNsb3NldGFnKVxuXHRpZih0aGlzLl9zdGFja1t0aGlzLl9zdGFjay5sZW5ndGggLSAxXSA9PT0gbmFtZSl7XG5cdFx0aWYodGhpcy5fY2JzLm9uY2xvc2V0YWcpe1xuXHRcdFx0dGhpcy5fY2JzLm9uY2xvc2V0YWcobmFtZSk7XG5cdFx0fVxuXHRcdHRoaXMuX3N0YWNrLnBvcCgpO1xuXHR9XG59O1xuXG5QYXJzZXIucHJvdG90eXBlLm9uYXR0cmlibmFtZSA9IGZ1bmN0aW9uKG5hbWUpe1xuXHRpZih0aGlzLl9sb3dlckNhc2VBdHRyaWJ1dGVOYW1lcyl7XG5cdFx0bmFtZSA9IG5hbWUudG9Mb3dlckNhc2UoKTtcblx0fVxuXHR0aGlzLl9hdHRyaWJuYW1lID0gbmFtZTtcbn07XG5cblBhcnNlci5wcm90b3R5cGUub25hdHRyaWJkYXRhID0gZnVuY3Rpb24odmFsdWUpe1xuXHR0aGlzLl9hdHRyaWJ2YWx1ZSArPSB2YWx1ZTtcbn07XG5cblBhcnNlci5wcm90b3R5cGUub25hdHRyaWJlbmQgPSBmdW5jdGlvbigpe1xuXHRpZih0aGlzLl9jYnMub25hdHRyaWJ1dGUpIHRoaXMuX2Nicy5vbmF0dHJpYnV0ZSh0aGlzLl9hdHRyaWJuYW1lLCB0aGlzLl9hdHRyaWJ2YWx1ZSk7XG5cdGlmKFxuXHRcdHRoaXMuX2F0dHJpYnMgJiZcblx0XHQhT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHRoaXMuX2F0dHJpYnMsIHRoaXMuX2F0dHJpYm5hbWUpXG5cdCl7XG5cdFx0dGhpcy5fYXR0cmlic1t0aGlzLl9hdHRyaWJuYW1lXSA9IHRoaXMuX2F0dHJpYnZhbHVlO1xuXHR9XG5cdHRoaXMuX2F0dHJpYm5hbWUgPSBcIlwiO1xuXHR0aGlzLl9hdHRyaWJ2YWx1ZSA9IFwiXCI7XG59O1xuXG5QYXJzZXIucHJvdG90eXBlLl9nZXRJbnN0cnVjdGlvbk5hbWUgPSBmdW5jdGlvbih2YWx1ZSl7XG5cdHZhciBpZHggPSB2YWx1ZS5zZWFyY2gocmVfbmFtZUVuZCksXG5cdCAgICBuYW1lID0gaWR4IDwgMCA/IHZhbHVlIDogdmFsdWUuc3Vic3RyKDAsIGlkeCk7XG5cblx0aWYodGhpcy5fbG93ZXJDYXNlVGFnTmFtZXMpe1xuXHRcdG5hbWUgPSBuYW1lLnRvTG93ZXJDYXNlKCk7XG5cdH1cblxuXHRyZXR1cm4gbmFtZTtcbn07XG5cblBhcnNlci5wcm90b3R5cGUub25kZWNsYXJhdGlvbiA9IGZ1bmN0aW9uKHZhbHVlKXtcblx0aWYodGhpcy5fY2JzLm9ucHJvY2Vzc2luZ2luc3RydWN0aW9uKXtcblx0XHR2YXIgbmFtZSA9IHRoaXMuX2dldEluc3RydWN0aW9uTmFtZSh2YWx1ZSk7XG5cdFx0dGhpcy5fY2JzLm9ucHJvY2Vzc2luZ2luc3RydWN0aW9uKFwiIVwiICsgbmFtZSwgXCIhXCIgKyB2YWx1ZSk7XG5cdH1cbn07XG5cblBhcnNlci5wcm90b3R5cGUub25wcm9jZXNzaW5naW5zdHJ1Y3Rpb24gPSBmdW5jdGlvbih2YWx1ZSl7XG5cdGlmKHRoaXMuX2Nicy5vbnByb2Nlc3NpbmdpbnN0cnVjdGlvbil7XG5cdFx0dmFyIG5hbWUgPSB0aGlzLl9nZXRJbnN0cnVjdGlvbk5hbWUodmFsdWUpO1xuXHRcdHRoaXMuX2Nicy5vbnByb2Nlc3NpbmdpbnN0cnVjdGlvbihcIj9cIiArIG5hbWUsIFwiP1wiICsgdmFsdWUpO1xuXHR9XG59O1xuXG5QYXJzZXIucHJvdG90eXBlLm9uY29tbWVudCA9IGZ1bmN0aW9uKHZhbHVlKXtcblx0dGhpcy5fdXBkYXRlUG9zaXRpb24oNCk7XG5cblx0aWYodGhpcy5fY2JzLm9uY29tbWVudCkgdGhpcy5fY2JzLm9uY29tbWVudCh2YWx1ZSk7XG5cdGlmKHRoaXMuX2Nicy5vbmNvbW1lbnRlbmQpIHRoaXMuX2Nicy5vbmNvbW1lbnRlbmQoKTtcbn07XG5cblBhcnNlci5wcm90b3R5cGUub25jZGF0YSA9IGZ1bmN0aW9uKHZhbHVlKXtcblx0dGhpcy5fdXBkYXRlUG9zaXRpb24oMSk7XG5cblx0aWYodGhpcy5fb3B0aW9ucy54bWxNb2RlIHx8IHRoaXMuX29wdGlvbnMucmVjb2duaXplQ0RBVEEpe1xuXHRcdGlmKHRoaXMuX2Nicy5vbmNkYXRhc3RhcnQpIHRoaXMuX2Nicy5vbmNkYXRhc3RhcnQoKTtcblx0XHRpZih0aGlzLl9jYnMub250ZXh0KSB0aGlzLl9jYnMub250ZXh0KHZhbHVlKTtcblx0XHRpZih0aGlzLl9jYnMub25jZGF0YWVuZCkgdGhpcy5fY2JzLm9uY2RhdGFlbmQoKTtcblx0fSBlbHNlIHtcblx0XHR0aGlzLm9uY29tbWVudChcIltDREFUQVtcIiArIHZhbHVlICsgXCJdXVwiKTtcblx0fVxufTtcblxuUGFyc2VyLnByb3RvdHlwZS5vbmVycm9yID0gZnVuY3Rpb24oZXJyKXtcblx0aWYodGhpcy5fY2JzLm9uZXJyb3IpIHRoaXMuX2Nicy5vbmVycm9yKGVycik7XG59O1xuXG5QYXJzZXIucHJvdG90eXBlLm9uZW5kID0gZnVuY3Rpb24oKXtcblx0aWYodGhpcy5fY2JzLm9uY2xvc2V0YWcpe1xuXHRcdGZvcihcblx0XHRcdHZhciBpID0gdGhpcy5fc3RhY2subGVuZ3RoO1xuXHRcdFx0aSA+IDA7XG5cdFx0XHR0aGlzLl9jYnMub25jbG9zZXRhZyh0aGlzLl9zdGFja1stLWldKVxuXHRcdCk7XG5cdH1cblx0aWYodGhpcy5fY2JzLm9uZW5kKSB0aGlzLl9jYnMub25lbmQoKTtcbn07XG5cblxuLy9SZXNldHMgdGhlIHBhcnNlciB0byBhIGJsYW5rIHN0YXRlLCByZWFkeSB0byBwYXJzZSBhIG5ldyBIVE1MIGRvY3VtZW50XG5QYXJzZXIucHJvdG90eXBlLnJlc2V0ID0gZnVuY3Rpb24oKXtcblx0aWYodGhpcy5fY2JzLm9ucmVzZXQpIHRoaXMuX2Nicy5vbnJlc2V0KCk7XG5cdHRoaXMuX3Rva2VuaXplci5yZXNldCgpO1xuXG5cdHRoaXMuX3RhZ25hbWUgPSBcIlwiO1xuXHR0aGlzLl9hdHRyaWJuYW1lID0gXCJcIjtcblx0dGhpcy5fYXR0cmlicyA9IG51bGw7XG5cdHRoaXMuX3N0YWNrID0gW107XG5cblx0aWYodGhpcy5fY2JzLm9ucGFyc2VyaW5pdCkgdGhpcy5fY2JzLm9ucGFyc2VyaW5pdCh0aGlzKTtcbn07XG5cbi8vUGFyc2VzIGEgY29tcGxldGUgSFRNTCBkb2N1bWVudCBhbmQgcHVzaGVzIGl0IHRvIHRoZSBoYW5kbGVyXG5QYXJzZXIucHJvdG90eXBlLnBhcnNlQ29tcGxldGUgPSBmdW5jdGlvbihkYXRhKXtcblx0dGhpcy5yZXNldCgpO1xuXHR0aGlzLmVuZChkYXRhKTtcbn07XG5cblBhcnNlci5wcm90b3R5cGUud3JpdGUgPSBmdW5jdGlvbihjaHVuayl7XG5cdHRoaXMuX3Rva2VuaXplci53cml0ZShjaHVuayk7XG59O1xuXG5QYXJzZXIucHJvdG90eXBlLmVuZCA9IGZ1bmN0aW9uKGNodW5rKXtcblx0dGhpcy5fdG9rZW5pemVyLmVuZChjaHVuayk7XG59O1xuXG5QYXJzZXIucHJvdG90eXBlLnBhdXNlID0gZnVuY3Rpb24oKXtcblx0dGhpcy5fdG9rZW5pemVyLnBhdXNlKCk7XG59O1xuXG5QYXJzZXIucHJvdG90eXBlLnJlc3VtZSA9IGZ1bmN0aW9uKCl7XG5cdHRoaXMuX3Rva2VuaXplci5yZXN1bWUoKTtcbn07XG5cbi8vYWxpYXMgZm9yIGJhY2t3YXJkcyBjb21wYXRcblBhcnNlci5wcm90b3R5cGUucGFyc2VDaHVuayA9IFBhcnNlci5wcm90b3R5cGUud3JpdGU7XG5QYXJzZXIucHJvdG90eXBlLmRvbmUgPSBQYXJzZXIucHJvdG90eXBlLmVuZDtcblxubW9kdWxlLmV4cG9ydHMgPSBQYXJzZXI7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IFByb3h5SGFuZGxlcjtcblxuZnVuY3Rpb24gUHJveHlIYW5kbGVyKGNicyl7XG5cdHRoaXMuX2NicyA9IGNicyB8fCB7fTtcbn1cblxudmFyIEVWRU5UUyA9IHJlcXVpcmUoXCIuL1wiKS5FVkVOVFM7XG5PYmplY3Qua2V5cyhFVkVOVFMpLmZvckVhY2goZnVuY3Rpb24obmFtZSl7XG5cdGlmKEVWRU5UU1tuYW1lXSA9PT0gMCl7XG5cdFx0bmFtZSA9IFwib25cIiArIG5hbWU7XG5cdFx0UHJveHlIYW5kbGVyLnByb3RvdHlwZVtuYW1lXSA9IGZ1bmN0aW9uKCl7XG5cdFx0XHRpZih0aGlzLl9jYnNbbmFtZV0pIHRoaXMuX2Nic1tuYW1lXSgpO1xuXHRcdH07XG5cdH0gZWxzZSBpZihFVkVOVFNbbmFtZV0gPT09IDEpe1xuXHRcdG5hbWUgPSBcIm9uXCIgKyBuYW1lO1xuXHRcdFByb3h5SGFuZGxlci5wcm90b3R5cGVbbmFtZV0gPSBmdW5jdGlvbihhKXtcblx0XHRcdGlmKHRoaXMuX2Nic1tuYW1lXSkgdGhpcy5fY2JzW25hbWVdKGEpO1xuXHRcdH07XG5cdH0gZWxzZSBpZihFVkVOVFNbbmFtZV0gPT09IDIpe1xuXHRcdG5hbWUgPSBcIm9uXCIgKyBuYW1lO1xuXHRcdFByb3h5SGFuZGxlci5wcm90b3R5cGVbbmFtZV0gPSBmdW5jdGlvbihhLCBiKXtcblx0XHRcdGlmKHRoaXMuX2Nic1tuYW1lXSkgdGhpcy5fY2JzW25hbWVdKGEsIGIpO1xuXHRcdH07XG5cdH0gZWxzZSB7XG5cdFx0dGhyb3cgRXJyb3IoXCJ3cm9uZyBudW1iZXIgb2YgYXJndW1lbnRzXCIpO1xuXHR9XG59KTsiLCJtb2R1bGUuZXhwb3J0cyA9IFN0cmVhbTtcblxudmFyIFBhcnNlciA9IHJlcXVpcmUoXCIuL1dyaXRhYmxlU3RyZWFtLmpzXCIpO1xuXG5mdW5jdGlvbiBTdHJlYW0ob3B0aW9ucyl7XG5cdFBhcnNlci5jYWxsKHRoaXMsIG5ldyBDYnModGhpcyksIG9wdGlvbnMpO1xufVxuXG5yZXF1aXJlKFwiaW5oZXJpdHNcIikoU3RyZWFtLCBQYXJzZXIpO1xuXG5TdHJlYW0ucHJvdG90eXBlLnJlYWRhYmxlID0gdHJ1ZTtcblxuZnVuY3Rpb24gQ2JzKHNjb3BlKXtcblx0dGhpcy5zY29wZSA9IHNjb3BlO1xufVxuXG52YXIgRVZFTlRTID0gcmVxdWlyZShcIi4uL1wiKS5FVkVOVFM7XG5cbk9iamVjdC5rZXlzKEVWRU5UUykuZm9yRWFjaChmdW5jdGlvbihuYW1lKXtcblx0aWYoRVZFTlRTW25hbWVdID09PSAwKXtcblx0XHRDYnMucHJvdG90eXBlW1wib25cIiArIG5hbWVdID0gZnVuY3Rpb24oKXtcblx0XHRcdHRoaXMuc2NvcGUuZW1pdChuYW1lKTtcblx0XHR9O1xuXHR9IGVsc2UgaWYoRVZFTlRTW25hbWVdID09PSAxKXtcblx0XHRDYnMucHJvdG90eXBlW1wib25cIiArIG5hbWVdID0gZnVuY3Rpb24oYSl7XG5cdFx0XHR0aGlzLnNjb3BlLmVtaXQobmFtZSwgYSk7XG5cdFx0fTtcblx0fSBlbHNlIGlmKEVWRU5UU1tuYW1lXSA9PT0gMil7XG5cdFx0Q2JzLnByb3RvdHlwZVtcIm9uXCIgKyBuYW1lXSA9IGZ1bmN0aW9uKGEsIGIpe1xuXHRcdFx0dGhpcy5zY29wZS5lbWl0KG5hbWUsIGEsIGIpO1xuXHRcdH07XG5cdH0gZWxzZSB7XG5cdFx0dGhyb3cgRXJyb3IoXCJ3cm9uZyBudW1iZXIgb2YgYXJndW1lbnRzIVwiKTtcblx0fVxufSk7IiwibW9kdWxlLmV4cG9ydHMgPSBUb2tlbml6ZXI7XG5cbnZhciBkZWNvZGVDb2RlUG9pbnQgPSByZXF1aXJlKFwiZW50aXRpZXMvbGliL2RlY29kZV9jb2RlcG9pbnQuanNcIiksXG4gICAgZW50aXR5TWFwID0gcmVxdWlyZShcImVudGl0aWVzL21hcHMvZW50aXRpZXMuanNvblwiKSxcbiAgICBsZWdhY3lNYXAgPSByZXF1aXJlKFwiZW50aXRpZXMvbWFwcy9sZWdhY3kuanNvblwiKSxcbiAgICB4bWxNYXAgICAgPSByZXF1aXJlKFwiZW50aXRpZXMvbWFwcy94bWwuanNvblwiKSxcblxuICAgIGkgPSAwLFxuXG4gICAgVEVYVCAgICAgICAgICAgICAgICAgICAgICA9IGkrKyxcbiAgICBCRUZPUkVfVEFHX05BTUUgICAgICAgICAgID0gaSsrLCAvL2FmdGVyIDxcbiAgICBJTl9UQUdfTkFNRSAgICAgICAgICAgICAgID0gaSsrLFxuICAgIElOX1NFTEZfQ0xPU0lOR19UQUcgICAgICAgPSBpKyssXG4gICAgQkVGT1JFX0NMT1NJTkdfVEFHX05BTUUgICA9IGkrKyxcbiAgICBJTl9DTE9TSU5HX1RBR19OQU1FICAgICAgID0gaSsrLFxuICAgIEFGVEVSX0NMT1NJTkdfVEFHX05BTUUgICAgPSBpKyssXG5cbiAgICAvL2F0dHJpYnV0ZXNcbiAgICBCRUZPUkVfQVRUUklCVVRFX05BTUUgICAgID0gaSsrLFxuICAgIElOX0FUVFJJQlVURV9OQU1FICAgICAgICAgPSBpKyssXG4gICAgQUZURVJfQVRUUklCVVRFX05BTUUgICAgICA9IGkrKyxcbiAgICBCRUZPUkVfQVRUUklCVVRFX1ZBTFVFICAgID0gaSsrLFxuICAgIElOX0FUVFJJQlVURV9WQUxVRV9EUSAgICAgPSBpKyssIC8vIFwiXG4gICAgSU5fQVRUUklCVVRFX1ZBTFVFX1NRICAgICA9IGkrKywgLy8gJ1xuICAgIElOX0FUVFJJQlVURV9WQUxVRV9OUSAgICAgPSBpKyssXG5cbiAgICAvL2RlY2xhcmF0aW9uc1xuICAgIEJFRk9SRV9ERUNMQVJBVElPTiAgICAgICAgPSBpKyssIC8vICFcbiAgICBJTl9ERUNMQVJBVElPTiAgICAgICAgICAgID0gaSsrLFxuXG4gICAgLy9wcm9jZXNzaW5nIGluc3RydWN0aW9uc1xuICAgIElOX1BST0NFU1NJTkdfSU5TVFJVQ1RJT04gPSBpKyssIC8vID9cblxuICAgIC8vY29tbWVudHNcbiAgICBCRUZPUkVfQ09NTUVOVCAgICAgICAgICAgID0gaSsrLFxuICAgIElOX0NPTU1FTlQgICAgICAgICAgICAgICAgPSBpKyssXG4gICAgQUZURVJfQ09NTUVOVF8xICAgICAgICAgICA9IGkrKyxcbiAgICBBRlRFUl9DT01NRU5UXzIgICAgICAgICAgID0gaSsrLFxuXG4gICAgLy9jZGF0YVxuICAgIEJFRk9SRV9DREFUQV8xICAgICAgICAgICAgPSBpKyssIC8vIFtcbiAgICBCRUZPUkVfQ0RBVEFfMiAgICAgICAgICAgID0gaSsrLCAvLyBDXG4gICAgQkVGT1JFX0NEQVRBXzMgICAgICAgICAgICA9IGkrKywgLy8gRFxuICAgIEJFRk9SRV9DREFUQV80ICAgICAgICAgICAgPSBpKyssIC8vIEFcbiAgICBCRUZPUkVfQ0RBVEFfNSAgICAgICAgICAgID0gaSsrLCAvLyBUXG4gICAgQkVGT1JFX0NEQVRBXzYgICAgICAgICAgICA9IGkrKywgLy8gQVxuICAgIElOX0NEQVRBICAgICAgICAgICAgICAgICAgPSBpKyssIC8vIFtcbiAgICBBRlRFUl9DREFUQV8xICAgICAgICAgICAgID0gaSsrLCAvLyBdXG4gICAgQUZURVJfQ0RBVEFfMiAgICAgICAgICAgICA9IGkrKywgLy8gXVxuXG4gICAgLy9zcGVjaWFsIHRhZ3NcbiAgICBCRUZPUkVfU1BFQ0lBTCAgICAgICAgICAgID0gaSsrLCAvL1NcbiAgICBCRUZPUkVfU1BFQ0lBTF9FTkQgICAgICAgID0gaSsrLCAgIC8vU1xuXG4gICAgQkVGT1JFX1NDUklQVF8xICAgICAgICAgICA9IGkrKywgLy9DXG4gICAgQkVGT1JFX1NDUklQVF8yICAgICAgICAgICA9IGkrKywgLy9SXG4gICAgQkVGT1JFX1NDUklQVF8zICAgICAgICAgICA9IGkrKywgLy9JXG4gICAgQkVGT1JFX1NDUklQVF80ICAgICAgICAgICA9IGkrKywgLy9QXG4gICAgQkVGT1JFX1NDUklQVF81ICAgICAgICAgICA9IGkrKywgLy9UXG4gICAgQUZURVJfU0NSSVBUXzEgICAgICAgICAgICA9IGkrKywgLy9DXG4gICAgQUZURVJfU0NSSVBUXzIgICAgICAgICAgICA9IGkrKywgLy9SXG4gICAgQUZURVJfU0NSSVBUXzMgICAgICAgICAgICA9IGkrKywgLy9JXG4gICAgQUZURVJfU0NSSVBUXzQgICAgICAgICAgICA9IGkrKywgLy9QXG4gICAgQUZURVJfU0NSSVBUXzUgICAgICAgICAgICA9IGkrKywgLy9UXG5cbiAgICBCRUZPUkVfU1RZTEVfMSAgICAgICAgICAgID0gaSsrLCAvL1RcbiAgICBCRUZPUkVfU1RZTEVfMiAgICAgICAgICAgID0gaSsrLCAvL1lcbiAgICBCRUZPUkVfU1RZTEVfMyAgICAgICAgICAgID0gaSsrLCAvL0xcbiAgICBCRUZPUkVfU1RZTEVfNCAgICAgICAgICAgID0gaSsrLCAvL0VcbiAgICBBRlRFUl9TVFlMRV8xICAgICAgICAgICAgID0gaSsrLCAvL1RcbiAgICBBRlRFUl9TVFlMRV8yICAgICAgICAgICAgID0gaSsrLCAvL1lcbiAgICBBRlRFUl9TVFlMRV8zICAgICAgICAgICAgID0gaSsrLCAvL0xcbiAgICBBRlRFUl9TVFlMRV80ICAgICAgICAgICAgID0gaSsrLCAvL0VcblxuICAgIEJFRk9SRV9FTlRJVFkgICAgICAgICAgICAgPSBpKyssIC8vJlxuICAgIEJFRk9SRV9OVU1FUklDX0VOVElUWSAgICAgPSBpKyssIC8vI1xuICAgIElOX05BTUVEX0VOVElUWSAgICAgICAgICAgPSBpKyssXG4gICAgSU5fTlVNRVJJQ19FTlRJVFkgICAgICAgICA9IGkrKyxcbiAgICBJTl9IRVhfRU5USVRZICAgICAgICAgICAgID0gaSsrLCAvL1hcblxuICAgIGogPSAwLFxuXG4gICAgU1BFQ0lBTF9OT05FICAgICAgICAgICAgICA9IGorKyxcbiAgICBTUEVDSUFMX1NDUklQVCAgICAgICAgICAgID0gaisrLFxuICAgIFNQRUNJQUxfU1RZTEUgICAgICAgICAgICAgPSBqKys7XG5cbmZ1bmN0aW9uIHdoaXRlc3BhY2UoYyl7XG5cdHJldHVybiBjID09PSBcIiBcIiB8fCBjID09PSBcIlxcblwiIHx8IGMgPT09IFwiXFx0XCIgfHwgYyA9PT0gXCJcXGZcIiB8fCBjID09PSBcIlxcclwiO1xufVxuXG5mdW5jdGlvbiBjaGFyYWN0ZXJTdGF0ZShjaGFyLCBTVUNDRVNTKXtcblx0cmV0dXJuIGZ1bmN0aW9uKGMpe1xuXHRcdGlmKGMgPT09IGNoYXIpIHRoaXMuX3N0YXRlID0gU1VDQ0VTUztcblx0fTtcbn1cblxuZnVuY3Rpb24gaWZFbHNlU3RhdGUodXBwZXIsIFNVQ0NFU1MsIEZBSUxVUkUpe1xuXHR2YXIgbG93ZXIgPSB1cHBlci50b0xvd2VyQ2FzZSgpO1xuXG5cdGlmKHVwcGVyID09PSBsb3dlcil7XG5cdFx0cmV0dXJuIGZ1bmN0aW9uKGMpe1xuXHRcdFx0aWYoYyA9PT0gbG93ZXIpe1xuXHRcdFx0XHR0aGlzLl9zdGF0ZSA9IFNVQ0NFU1M7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR0aGlzLl9zdGF0ZSA9IEZBSUxVUkU7XG5cdFx0XHRcdHRoaXMuX2luZGV4LS07XG5cdFx0XHR9XG5cdFx0fTtcblx0fSBlbHNlIHtcblx0XHRyZXR1cm4gZnVuY3Rpb24oYyl7XG5cdFx0XHRpZihjID09PSBsb3dlciB8fCBjID09PSB1cHBlcil7XG5cdFx0XHRcdHRoaXMuX3N0YXRlID0gU1VDQ0VTUztcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHRoaXMuX3N0YXRlID0gRkFJTFVSRTtcblx0XHRcdFx0dGhpcy5faW5kZXgtLTtcblx0XHRcdH1cblx0XHR9O1xuXHR9XG59XG5cbmZ1bmN0aW9uIGNvbnN1bWVTcGVjaWFsTmFtZUNoYXIodXBwZXIsIE5FWFRfU1RBVEUpe1xuXHR2YXIgbG93ZXIgPSB1cHBlci50b0xvd2VyQ2FzZSgpO1xuXG5cdHJldHVybiBmdW5jdGlvbihjKXtcblx0XHRpZihjID09PSBsb3dlciB8fCBjID09PSB1cHBlcil7XG5cdFx0XHR0aGlzLl9zdGF0ZSA9IE5FWFRfU1RBVEU7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMuX3N0YXRlID0gSU5fVEFHX05BTUU7XG5cdFx0XHR0aGlzLl9pbmRleC0tOyAvL2NvbnN1bWUgdGhlIHRva2VuIGFnYWluXG5cdFx0fVxuXHR9O1xufVxuXG5mdW5jdGlvbiBUb2tlbml6ZXIob3B0aW9ucywgY2JzKXtcblx0dGhpcy5fc3RhdGUgPSBURVhUO1xuXHR0aGlzLl9idWZmZXIgPSBcIlwiO1xuXHR0aGlzLl9zZWN0aW9uU3RhcnQgPSAwO1xuXHR0aGlzLl9pbmRleCA9IDA7XG5cdHRoaXMuX2J1ZmZlck9mZnNldCA9IDA7IC8vY2hhcnMgcmVtb3ZlZCBmcm9tIF9idWZmZXJcblx0dGhpcy5fYmFzZVN0YXRlID0gVEVYVDtcblx0dGhpcy5fc3BlY2lhbCA9IFNQRUNJQUxfTk9ORTtcblx0dGhpcy5fY2JzID0gY2JzO1xuXHR0aGlzLl9ydW5uaW5nID0gdHJ1ZTtcblx0dGhpcy5fZW5kZWQgPSBmYWxzZTtcblx0dGhpcy5feG1sTW9kZSA9ICEhKG9wdGlvbnMgJiYgb3B0aW9ucy54bWxNb2RlKTtcblx0dGhpcy5fZGVjb2RlRW50aXRpZXMgPSAhIShvcHRpb25zICYmIG9wdGlvbnMuZGVjb2RlRW50aXRpZXMpO1xufVxuXG5Ub2tlbml6ZXIucHJvdG90eXBlLl9zdGF0ZVRleHQgPSBmdW5jdGlvbihjKXtcblx0aWYoYyA9PT0gXCI8XCIpe1xuXHRcdGlmKHRoaXMuX2luZGV4ID4gdGhpcy5fc2VjdGlvblN0YXJ0KXtcblx0XHRcdHRoaXMuX2Nicy5vbnRleHQodGhpcy5fZ2V0U2VjdGlvbigpKTtcblx0XHR9XG5cdFx0dGhpcy5fc3RhdGUgPSBCRUZPUkVfVEFHX05BTUU7XG5cdFx0dGhpcy5fc2VjdGlvblN0YXJ0ID0gdGhpcy5faW5kZXg7XG5cdH0gZWxzZSBpZih0aGlzLl9kZWNvZGVFbnRpdGllcyAmJiB0aGlzLl9zcGVjaWFsID09PSBTUEVDSUFMX05PTkUgJiYgYyA9PT0gXCImXCIpe1xuXHRcdGlmKHRoaXMuX2luZGV4ID4gdGhpcy5fc2VjdGlvblN0YXJ0KXtcblx0XHRcdHRoaXMuX2Nicy5vbnRleHQodGhpcy5fZ2V0U2VjdGlvbigpKTtcblx0XHR9XG5cdFx0dGhpcy5fYmFzZVN0YXRlID0gVEVYVDtcblx0XHR0aGlzLl9zdGF0ZSA9IEJFRk9SRV9FTlRJVFk7XG5cdFx0dGhpcy5fc2VjdGlvblN0YXJ0ID0gdGhpcy5faW5kZXg7XG5cdH1cbn07XG5cblRva2VuaXplci5wcm90b3R5cGUuX3N0YXRlQmVmb3JlVGFnTmFtZSA9IGZ1bmN0aW9uKGMpe1xuXHRpZihjID09PSBcIi9cIil7XG5cdFx0dGhpcy5fc3RhdGUgPSBCRUZPUkVfQ0xPU0lOR19UQUdfTkFNRTtcblx0fSBlbHNlIGlmKGMgPT09IFwiPFwiKXtcblx0XHR0aGlzLl9jYnMub250ZXh0KHRoaXMuX2dldFNlY3Rpb24oKSk7XG5cdFx0dGhpcy5fc2VjdGlvblN0YXJ0ID0gdGhpcy5faW5kZXg7XG5cdH0gZWxzZSBpZihjID09PSBcIj5cIiB8fCB0aGlzLl9zcGVjaWFsICE9PSBTUEVDSUFMX05PTkUgfHwgd2hpdGVzcGFjZShjKSkge1xuXHRcdHRoaXMuX3N0YXRlID0gVEVYVDtcblx0fSBlbHNlIGlmKGMgPT09IFwiIVwiKXtcblx0XHR0aGlzLl9zdGF0ZSA9IEJFRk9SRV9ERUNMQVJBVElPTjtcblx0XHR0aGlzLl9zZWN0aW9uU3RhcnQgPSB0aGlzLl9pbmRleCArIDE7XG5cdH0gZWxzZSBpZihjID09PSBcIj9cIil7XG5cdFx0dGhpcy5fc3RhdGUgPSBJTl9QUk9DRVNTSU5HX0lOU1RSVUNUSU9OO1xuXHRcdHRoaXMuX3NlY3Rpb25TdGFydCA9IHRoaXMuX2luZGV4ICsgMTtcblx0fSBlbHNlIHtcblx0XHR0aGlzLl9zdGF0ZSA9ICghdGhpcy5feG1sTW9kZSAmJiAoYyA9PT0gXCJzXCIgfHwgYyA9PT0gXCJTXCIpKSA/XG5cdFx0XHRcdFx0XHRCRUZPUkVfU1BFQ0lBTCA6IElOX1RBR19OQU1FO1xuXHRcdHRoaXMuX3NlY3Rpb25TdGFydCA9IHRoaXMuX2luZGV4O1xuXHR9XG59O1xuXG5Ub2tlbml6ZXIucHJvdG90eXBlLl9zdGF0ZUluVGFnTmFtZSA9IGZ1bmN0aW9uKGMpe1xuXHRpZihjID09PSBcIi9cIiB8fCBjID09PSBcIj5cIiB8fCB3aGl0ZXNwYWNlKGMpKXtcblx0XHR0aGlzLl9lbWl0VG9rZW4oXCJvbm9wZW50YWduYW1lXCIpO1xuXHRcdHRoaXMuX3N0YXRlID0gQkVGT1JFX0FUVFJJQlVURV9OQU1FO1xuXHRcdHRoaXMuX2luZGV4LS07XG5cdH1cbn07XG5cblRva2VuaXplci5wcm90b3R5cGUuX3N0YXRlQmVmb3JlQ2xvc2VpbmdUYWdOYW1lID0gZnVuY3Rpb24oYyl7XG5cdGlmKHdoaXRlc3BhY2UoYykpO1xuXHRlbHNlIGlmKGMgPT09IFwiPlwiKXtcblx0XHR0aGlzLl9zdGF0ZSA9IFRFWFQ7XG5cdH0gZWxzZSBpZih0aGlzLl9zcGVjaWFsICE9PSBTUEVDSUFMX05PTkUpe1xuXHRcdGlmKGMgPT09IFwic1wiIHx8IGMgPT09IFwiU1wiKXtcblx0XHRcdHRoaXMuX3N0YXRlID0gQkVGT1JFX1NQRUNJQUxfRU5EO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLl9zdGF0ZSA9IFRFWFQ7XG5cdFx0XHR0aGlzLl9pbmRleC0tO1xuXHRcdH1cblx0fSBlbHNlIHtcblx0XHR0aGlzLl9zdGF0ZSA9IElOX0NMT1NJTkdfVEFHX05BTUU7XG5cdFx0dGhpcy5fc2VjdGlvblN0YXJ0ID0gdGhpcy5faW5kZXg7XG5cdH1cbn07XG5cblRva2VuaXplci5wcm90b3R5cGUuX3N0YXRlSW5DbG9zZWluZ1RhZ05hbWUgPSBmdW5jdGlvbihjKXtcblx0aWYoYyA9PT0gXCI+XCIgfHwgd2hpdGVzcGFjZShjKSl7XG5cdFx0dGhpcy5fZW1pdFRva2VuKFwib25jbG9zZXRhZ1wiKTtcblx0XHR0aGlzLl9zdGF0ZSA9IEFGVEVSX0NMT1NJTkdfVEFHX05BTUU7XG5cdFx0dGhpcy5faW5kZXgtLTtcblx0fVxufTtcblxuVG9rZW5pemVyLnByb3RvdHlwZS5fc3RhdGVBZnRlckNsb3NlaW5nVGFnTmFtZSA9IGZ1bmN0aW9uKGMpe1xuXHQvL3NraXAgZXZlcnl0aGluZyB1bnRpbCBcIj5cIlxuXHRpZihjID09PSBcIj5cIil7XG5cdFx0dGhpcy5fc3RhdGUgPSBURVhUO1xuXHRcdHRoaXMuX3NlY3Rpb25TdGFydCA9IHRoaXMuX2luZGV4ICsgMTtcblx0fVxufTtcblxuVG9rZW5pemVyLnByb3RvdHlwZS5fc3RhdGVCZWZvcmVBdHRyaWJ1dGVOYW1lID0gZnVuY3Rpb24oYyl7XG5cdGlmKGMgPT09IFwiPlwiKXtcblx0XHR0aGlzLl9jYnMub25vcGVudGFnZW5kKCk7XG5cdFx0dGhpcy5fc3RhdGUgPSBURVhUO1xuXHRcdHRoaXMuX3NlY3Rpb25TdGFydCA9IHRoaXMuX2luZGV4ICsgMTtcblx0fSBlbHNlIGlmKGMgPT09IFwiL1wiKXtcblx0XHR0aGlzLl9zdGF0ZSA9IElOX1NFTEZfQ0xPU0lOR19UQUc7XG5cdH0gZWxzZSBpZighd2hpdGVzcGFjZShjKSl7XG5cdFx0dGhpcy5fc3RhdGUgPSBJTl9BVFRSSUJVVEVfTkFNRTtcblx0XHR0aGlzLl9zZWN0aW9uU3RhcnQgPSB0aGlzLl9pbmRleDtcblx0fVxufTtcblxuVG9rZW5pemVyLnByb3RvdHlwZS5fc3RhdGVJblNlbGZDbG9zaW5nVGFnID0gZnVuY3Rpb24oYyl7XG5cdGlmKGMgPT09IFwiPlwiKXtcblx0XHR0aGlzLl9jYnMub25zZWxmY2xvc2luZ3RhZygpO1xuXHRcdHRoaXMuX3N0YXRlID0gVEVYVDtcblx0XHR0aGlzLl9zZWN0aW9uU3RhcnQgPSB0aGlzLl9pbmRleCArIDE7XG5cdH0gZWxzZSBpZighd2hpdGVzcGFjZShjKSl7XG5cdFx0dGhpcy5fc3RhdGUgPSBCRUZPUkVfQVRUUklCVVRFX05BTUU7XG5cdFx0dGhpcy5faW5kZXgtLTtcblx0fVxufTtcblxuVG9rZW5pemVyLnByb3RvdHlwZS5fc3RhdGVJbkF0dHJpYnV0ZU5hbWUgPSBmdW5jdGlvbihjKXtcblx0aWYoYyA9PT0gXCI9XCIgfHwgYyA9PT0gXCIvXCIgfHwgYyA9PT0gXCI+XCIgfHwgd2hpdGVzcGFjZShjKSl7XG5cdFx0dGhpcy5fY2JzLm9uYXR0cmlibmFtZSh0aGlzLl9nZXRTZWN0aW9uKCkpO1xuXHRcdHRoaXMuX3NlY3Rpb25TdGFydCA9IC0xO1xuXHRcdHRoaXMuX3N0YXRlID0gQUZURVJfQVRUUklCVVRFX05BTUU7XG5cdFx0dGhpcy5faW5kZXgtLTtcblx0fVxufTtcblxuVG9rZW5pemVyLnByb3RvdHlwZS5fc3RhdGVBZnRlckF0dHJpYnV0ZU5hbWUgPSBmdW5jdGlvbihjKXtcblx0aWYoYyA9PT0gXCI9XCIpe1xuXHRcdHRoaXMuX3N0YXRlID0gQkVGT1JFX0FUVFJJQlVURV9WQUxVRTtcblx0fSBlbHNlIGlmKGMgPT09IFwiL1wiIHx8IGMgPT09IFwiPlwiKXtcblx0XHR0aGlzLl9jYnMub25hdHRyaWJlbmQoKTtcblx0XHR0aGlzLl9zdGF0ZSA9IEJFRk9SRV9BVFRSSUJVVEVfTkFNRTtcblx0XHR0aGlzLl9pbmRleC0tO1xuXHR9IGVsc2UgaWYoIXdoaXRlc3BhY2UoYykpe1xuXHRcdHRoaXMuX2Nicy5vbmF0dHJpYmVuZCgpO1xuXHRcdHRoaXMuX3N0YXRlID0gSU5fQVRUUklCVVRFX05BTUU7XG5cdFx0dGhpcy5fc2VjdGlvblN0YXJ0ID0gdGhpcy5faW5kZXg7XG5cdH1cbn07XG5cblRva2VuaXplci5wcm90b3R5cGUuX3N0YXRlQmVmb3JlQXR0cmlidXRlVmFsdWUgPSBmdW5jdGlvbihjKXtcblx0aWYoYyA9PT0gXCJcXFwiXCIpe1xuXHRcdHRoaXMuX3N0YXRlID0gSU5fQVRUUklCVVRFX1ZBTFVFX0RRO1xuXHRcdHRoaXMuX3NlY3Rpb25TdGFydCA9IHRoaXMuX2luZGV4ICsgMTtcblx0fSBlbHNlIGlmKGMgPT09IFwiJ1wiKXtcblx0XHR0aGlzLl9zdGF0ZSA9IElOX0FUVFJJQlVURV9WQUxVRV9TUTtcblx0XHR0aGlzLl9zZWN0aW9uU3RhcnQgPSB0aGlzLl9pbmRleCArIDE7XG5cdH0gZWxzZSBpZighd2hpdGVzcGFjZShjKSl7XG5cdFx0dGhpcy5fc3RhdGUgPSBJTl9BVFRSSUJVVEVfVkFMVUVfTlE7XG5cdFx0dGhpcy5fc2VjdGlvblN0YXJ0ID0gdGhpcy5faW5kZXg7XG5cdFx0dGhpcy5faW5kZXgtLTsgLy9yZWNvbnN1bWUgdG9rZW5cblx0fVxufTtcblxuVG9rZW5pemVyLnByb3RvdHlwZS5fc3RhdGVJbkF0dHJpYnV0ZVZhbHVlRG91YmxlUXVvdGVzID0gZnVuY3Rpb24oYyl7XG5cdGlmKGMgPT09IFwiXFxcIlwiKXtcblx0XHR0aGlzLl9lbWl0VG9rZW4oXCJvbmF0dHJpYmRhdGFcIik7XG5cdFx0dGhpcy5fY2JzLm9uYXR0cmliZW5kKCk7XG5cdFx0dGhpcy5fc3RhdGUgPSBCRUZPUkVfQVRUUklCVVRFX05BTUU7XG5cdH0gZWxzZSBpZih0aGlzLl9kZWNvZGVFbnRpdGllcyAmJiBjID09PSBcIiZcIil7XG5cdFx0dGhpcy5fZW1pdFRva2VuKFwib25hdHRyaWJkYXRhXCIpO1xuXHRcdHRoaXMuX2Jhc2VTdGF0ZSA9IHRoaXMuX3N0YXRlO1xuXHRcdHRoaXMuX3N0YXRlID0gQkVGT1JFX0VOVElUWTtcblx0XHR0aGlzLl9zZWN0aW9uU3RhcnQgPSB0aGlzLl9pbmRleDtcblx0fVxufTtcblxuVG9rZW5pemVyLnByb3RvdHlwZS5fc3RhdGVJbkF0dHJpYnV0ZVZhbHVlU2luZ2xlUXVvdGVzID0gZnVuY3Rpb24oYyl7XG5cdGlmKGMgPT09IFwiJ1wiKXtcblx0XHR0aGlzLl9lbWl0VG9rZW4oXCJvbmF0dHJpYmRhdGFcIik7XG5cdFx0dGhpcy5fY2JzLm9uYXR0cmliZW5kKCk7XG5cdFx0dGhpcy5fc3RhdGUgPSBCRUZPUkVfQVRUUklCVVRFX05BTUU7XG5cdH0gZWxzZSBpZih0aGlzLl9kZWNvZGVFbnRpdGllcyAmJiBjID09PSBcIiZcIil7XG5cdFx0dGhpcy5fZW1pdFRva2VuKFwib25hdHRyaWJkYXRhXCIpO1xuXHRcdHRoaXMuX2Jhc2VTdGF0ZSA9IHRoaXMuX3N0YXRlO1xuXHRcdHRoaXMuX3N0YXRlID0gQkVGT1JFX0VOVElUWTtcblx0XHR0aGlzLl9zZWN0aW9uU3RhcnQgPSB0aGlzLl9pbmRleDtcblx0fVxufTtcblxuVG9rZW5pemVyLnByb3RvdHlwZS5fc3RhdGVJbkF0dHJpYnV0ZVZhbHVlTm9RdW90ZXMgPSBmdW5jdGlvbihjKXtcblx0aWYod2hpdGVzcGFjZShjKSB8fCBjID09PSBcIj5cIil7XG5cdFx0dGhpcy5fZW1pdFRva2VuKFwib25hdHRyaWJkYXRhXCIpO1xuXHRcdHRoaXMuX2Nicy5vbmF0dHJpYmVuZCgpO1xuXHRcdHRoaXMuX3N0YXRlID0gQkVGT1JFX0FUVFJJQlVURV9OQU1FO1xuXHRcdHRoaXMuX2luZGV4LS07XG5cdH0gZWxzZSBpZih0aGlzLl9kZWNvZGVFbnRpdGllcyAmJiBjID09PSBcIiZcIil7XG5cdFx0dGhpcy5fZW1pdFRva2VuKFwib25hdHRyaWJkYXRhXCIpO1xuXHRcdHRoaXMuX2Jhc2VTdGF0ZSA9IHRoaXMuX3N0YXRlO1xuXHRcdHRoaXMuX3N0YXRlID0gQkVGT1JFX0VOVElUWTtcblx0XHR0aGlzLl9zZWN0aW9uU3RhcnQgPSB0aGlzLl9pbmRleDtcblx0fVxufTtcblxuVG9rZW5pemVyLnByb3RvdHlwZS5fc3RhdGVCZWZvcmVEZWNsYXJhdGlvbiA9IGZ1bmN0aW9uKGMpe1xuXHR0aGlzLl9zdGF0ZSA9IGMgPT09IFwiW1wiID8gQkVGT1JFX0NEQVRBXzEgOlxuXHRcdFx0XHRcdGMgPT09IFwiLVwiID8gQkVGT1JFX0NPTU1FTlQgOlxuXHRcdFx0XHRcdFx0SU5fREVDTEFSQVRJT047XG59O1xuXG5Ub2tlbml6ZXIucHJvdG90eXBlLl9zdGF0ZUluRGVjbGFyYXRpb24gPSBmdW5jdGlvbihjKXtcblx0aWYoYyA9PT0gXCI+XCIpe1xuXHRcdHRoaXMuX2Nicy5vbmRlY2xhcmF0aW9uKHRoaXMuX2dldFNlY3Rpb24oKSk7XG5cdFx0dGhpcy5fc3RhdGUgPSBURVhUO1xuXHRcdHRoaXMuX3NlY3Rpb25TdGFydCA9IHRoaXMuX2luZGV4ICsgMTtcblx0fVxufTtcblxuVG9rZW5pemVyLnByb3RvdHlwZS5fc3RhdGVJblByb2Nlc3NpbmdJbnN0cnVjdGlvbiA9IGZ1bmN0aW9uKGMpe1xuXHRpZihjID09PSBcIj5cIil7XG5cdFx0dGhpcy5fY2JzLm9ucHJvY2Vzc2luZ2luc3RydWN0aW9uKHRoaXMuX2dldFNlY3Rpb24oKSk7XG5cdFx0dGhpcy5fc3RhdGUgPSBURVhUO1xuXHRcdHRoaXMuX3NlY3Rpb25TdGFydCA9IHRoaXMuX2luZGV4ICsgMTtcblx0fVxufTtcblxuVG9rZW5pemVyLnByb3RvdHlwZS5fc3RhdGVCZWZvcmVDb21tZW50ID0gZnVuY3Rpb24oYyl7XG5cdGlmKGMgPT09IFwiLVwiKXtcblx0XHR0aGlzLl9zdGF0ZSA9IElOX0NPTU1FTlQ7XG5cdFx0dGhpcy5fc2VjdGlvblN0YXJ0ID0gdGhpcy5faW5kZXggKyAxO1xuXHR9IGVsc2Uge1xuXHRcdHRoaXMuX3N0YXRlID0gSU5fREVDTEFSQVRJT047XG5cdH1cbn07XG5cblRva2VuaXplci5wcm90b3R5cGUuX3N0YXRlSW5Db21tZW50ID0gZnVuY3Rpb24oYyl7XG5cdGlmKGMgPT09IFwiLVwiKSB0aGlzLl9zdGF0ZSA9IEFGVEVSX0NPTU1FTlRfMTtcbn07XG5cblRva2VuaXplci5wcm90b3R5cGUuX3N0YXRlQWZ0ZXJDb21tZW50MSA9IGZ1bmN0aW9uKGMpe1xuXHRpZihjID09PSBcIi1cIil7XG5cdFx0dGhpcy5fc3RhdGUgPSBBRlRFUl9DT01NRU5UXzI7XG5cdH0gZWxzZSB7XG5cdFx0dGhpcy5fc3RhdGUgPSBJTl9DT01NRU5UO1xuXHR9XG59O1xuXG5Ub2tlbml6ZXIucHJvdG90eXBlLl9zdGF0ZUFmdGVyQ29tbWVudDIgPSBmdW5jdGlvbihjKXtcblx0aWYoYyA9PT0gXCI+XCIpe1xuXHRcdC8vcmVtb3ZlIDIgdHJhaWxpbmcgY2hhcnNcblx0XHR0aGlzLl9jYnMub25jb21tZW50KHRoaXMuX2J1ZmZlci5zdWJzdHJpbmcodGhpcy5fc2VjdGlvblN0YXJ0LCB0aGlzLl9pbmRleCAtIDIpKTtcblx0XHR0aGlzLl9zdGF0ZSA9IFRFWFQ7XG5cdFx0dGhpcy5fc2VjdGlvblN0YXJ0ID0gdGhpcy5faW5kZXggKyAxO1xuXHR9IGVsc2UgaWYoYyAhPT0gXCItXCIpe1xuXHRcdHRoaXMuX3N0YXRlID0gSU5fQ09NTUVOVDtcblx0fVxuXHQvLyBlbHNlOiBzdGF5IGluIEFGVEVSX0NPTU1FTlRfMiAoYC0tLT5gKVxufTtcblxuVG9rZW5pemVyLnByb3RvdHlwZS5fc3RhdGVCZWZvcmVDZGF0YTEgPSBpZkVsc2VTdGF0ZShcIkNcIiwgQkVGT1JFX0NEQVRBXzIsIElOX0RFQ0xBUkFUSU9OKTtcblRva2VuaXplci5wcm90b3R5cGUuX3N0YXRlQmVmb3JlQ2RhdGEyID0gaWZFbHNlU3RhdGUoXCJEXCIsIEJFRk9SRV9DREFUQV8zLCBJTl9ERUNMQVJBVElPTik7XG5Ub2tlbml6ZXIucHJvdG90eXBlLl9zdGF0ZUJlZm9yZUNkYXRhMyA9IGlmRWxzZVN0YXRlKFwiQVwiLCBCRUZPUkVfQ0RBVEFfNCwgSU5fREVDTEFSQVRJT04pO1xuVG9rZW5pemVyLnByb3RvdHlwZS5fc3RhdGVCZWZvcmVDZGF0YTQgPSBpZkVsc2VTdGF0ZShcIlRcIiwgQkVGT1JFX0NEQVRBXzUsIElOX0RFQ0xBUkFUSU9OKTtcblRva2VuaXplci5wcm90b3R5cGUuX3N0YXRlQmVmb3JlQ2RhdGE1ID0gaWZFbHNlU3RhdGUoXCJBXCIsIEJFRk9SRV9DREFUQV82LCBJTl9ERUNMQVJBVElPTik7XG5cblRva2VuaXplci5wcm90b3R5cGUuX3N0YXRlQmVmb3JlQ2RhdGE2ID0gZnVuY3Rpb24oYyl7XG5cdGlmKGMgPT09IFwiW1wiKXtcblx0XHR0aGlzLl9zdGF0ZSA9IElOX0NEQVRBO1xuXHRcdHRoaXMuX3NlY3Rpb25TdGFydCA9IHRoaXMuX2luZGV4ICsgMTtcblx0fSBlbHNlIHtcblx0XHR0aGlzLl9zdGF0ZSA9IElOX0RFQ0xBUkFUSU9OO1xuXHRcdHRoaXMuX2luZGV4LS07XG5cdH1cbn07XG5cblRva2VuaXplci5wcm90b3R5cGUuX3N0YXRlSW5DZGF0YSA9IGZ1bmN0aW9uKGMpe1xuXHRpZihjID09PSBcIl1cIikgdGhpcy5fc3RhdGUgPSBBRlRFUl9DREFUQV8xO1xufTtcblxuVG9rZW5pemVyLnByb3RvdHlwZS5fc3RhdGVBZnRlckNkYXRhMSA9IGNoYXJhY3RlclN0YXRlKFwiXVwiLCBBRlRFUl9DREFUQV8yKTtcblxuVG9rZW5pemVyLnByb3RvdHlwZS5fc3RhdGVBZnRlckNkYXRhMiA9IGZ1bmN0aW9uKGMpe1xuXHRpZihjID09PSBcIj5cIil7XG5cdFx0Ly9yZW1vdmUgMiB0cmFpbGluZyBjaGFyc1xuXHRcdHRoaXMuX2Nicy5vbmNkYXRhKHRoaXMuX2J1ZmZlci5zdWJzdHJpbmcodGhpcy5fc2VjdGlvblN0YXJ0LCB0aGlzLl9pbmRleCAtIDIpKTtcblx0XHR0aGlzLl9zdGF0ZSA9IFRFWFQ7XG5cdFx0dGhpcy5fc2VjdGlvblN0YXJ0ID0gdGhpcy5faW5kZXggKyAxO1xuXHR9IGVsc2UgaWYoYyAhPT0gXCJdXCIpIHtcblx0XHR0aGlzLl9zdGF0ZSA9IElOX0NEQVRBO1xuXHR9XG5cdC8vZWxzZTogc3RheSBpbiBBRlRFUl9DREFUQV8yIChgXV1dPmApXG59O1xuXG5Ub2tlbml6ZXIucHJvdG90eXBlLl9zdGF0ZUJlZm9yZVNwZWNpYWwgPSBmdW5jdGlvbihjKXtcblx0aWYoYyA9PT0gXCJjXCIgfHwgYyA9PT0gXCJDXCIpe1xuXHRcdHRoaXMuX3N0YXRlID0gQkVGT1JFX1NDUklQVF8xO1xuXHR9IGVsc2UgaWYoYyA9PT0gXCJ0XCIgfHwgYyA9PT0gXCJUXCIpe1xuXHRcdHRoaXMuX3N0YXRlID0gQkVGT1JFX1NUWUxFXzE7XG5cdH0gZWxzZSB7XG5cdFx0dGhpcy5fc3RhdGUgPSBJTl9UQUdfTkFNRTtcblx0XHR0aGlzLl9pbmRleC0tOyAvL2NvbnN1bWUgdGhlIHRva2VuIGFnYWluXG5cdH1cbn07XG5cblRva2VuaXplci5wcm90b3R5cGUuX3N0YXRlQmVmb3JlU3BlY2lhbEVuZCA9IGZ1bmN0aW9uKGMpe1xuXHRpZih0aGlzLl9zcGVjaWFsID09PSBTUEVDSUFMX1NDUklQVCAmJiAoYyA9PT0gXCJjXCIgfHwgYyA9PT0gXCJDXCIpKXtcblx0XHR0aGlzLl9zdGF0ZSA9IEFGVEVSX1NDUklQVF8xO1xuXHR9IGVsc2UgaWYodGhpcy5fc3BlY2lhbCA9PT0gU1BFQ0lBTF9TVFlMRSAmJiAoYyA9PT0gXCJ0XCIgfHwgYyA9PT0gXCJUXCIpKXtcblx0XHR0aGlzLl9zdGF0ZSA9IEFGVEVSX1NUWUxFXzE7XG5cdH1cblx0ZWxzZSB0aGlzLl9zdGF0ZSA9IFRFWFQ7XG59O1xuXG5Ub2tlbml6ZXIucHJvdG90eXBlLl9zdGF0ZUJlZm9yZVNjcmlwdDEgPSBjb25zdW1lU3BlY2lhbE5hbWVDaGFyKFwiUlwiLCBCRUZPUkVfU0NSSVBUXzIpO1xuVG9rZW5pemVyLnByb3RvdHlwZS5fc3RhdGVCZWZvcmVTY3JpcHQyID0gY29uc3VtZVNwZWNpYWxOYW1lQ2hhcihcIklcIiwgQkVGT1JFX1NDUklQVF8zKTtcblRva2VuaXplci5wcm90b3R5cGUuX3N0YXRlQmVmb3JlU2NyaXB0MyA9IGNvbnN1bWVTcGVjaWFsTmFtZUNoYXIoXCJQXCIsIEJFRk9SRV9TQ1JJUFRfNCk7XG5Ub2tlbml6ZXIucHJvdG90eXBlLl9zdGF0ZUJlZm9yZVNjcmlwdDQgPSBjb25zdW1lU3BlY2lhbE5hbWVDaGFyKFwiVFwiLCBCRUZPUkVfU0NSSVBUXzUpO1xuXG5Ub2tlbml6ZXIucHJvdG90eXBlLl9zdGF0ZUJlZm9yZVNjcmlwdDUgPSBmdW5jdGlvbihjKXtcblx0aWYoYyA9PT0gXCIvXCIgfHwgYyA9PT0gXCI+XCIgfHwgd2hpdGVzcGFjZShjKSl7XG5cdFx0dGhpcy5fc3BlY2lhbCA9IFNQRUNJQUxfU0NSSVBUO1xuXHR9XG5cdHRoaXMuX3N0YXRlID0gSU5fVEFHX05BTUU7XG5cdHRoaXMuX2luZGV4LS07IC8vY29uc3VtZSB0aGUgdG9rZW4gYWdhaW5cbn07XG5cblRva2VuaXplci5wcm90b3R5cGUuX3N0YXRlQWZ0ZXJTY3JpcHQxID0gaWZFbHNlU3RhdGUoXCJSXCIsIEFGVEVSX1NDUklQVF8yLCBURVhUKTtcblRva2VuaXplci5wcm90b3R5cGUuX3N0YXRlQWZ0ZXJTY3JpcHQyID0gaWZFbHNlU3RhdGUoXCJJXCIsIEFGVEVSX1NDUklQVF8zLCBURVhUKTtcblRva2VuaXplci5wcm90b3R5cGUuX3N0YXRlQWZ0ZXJTY3JpcHQzID0gaWZFbHNlU3RhdGUoXCJQXCIsIEFGVEVSX1NDUklQVF80LCBURVhUKTtcblRva2VuaXplci5wcm90b3R5cGUuX3N0YXRlQWZ0ZXJTY3JpcHQ0ID0gaWZFbHNlU3RhdGUoXCJUXCIsIEFGVEVSX1NDUklQVF81LCBURVhUKTtcblxuVG9rZW5pemVyLnByb3RvdHlwZS5fc3RhdGVBZnRlclNjcmlwdDUgPSBmdW5jdGlvbihjKXtcblx0aWYoYyA9PT0gXCI+XCIgfHwgd2hpdGVzcGFjZShjKSl7XG5cdFx0dGhpcy5fc3BlY2lhbCA9IFNQRUNJQUxfTk9ORTtcblx0XHR0aGlzLl9zdGF0ZSA9IElOX0NMT1NJTkdfVEFHX05BTUU7XG5cdFx0dGhpcy5fc2VjdGlvblN0YXJ0ID0gdGhpcy5faW5kZXggLSA2O1xuXHRcdHRoaXMuX2luZGV4LS07IC8vcmVjb25zdW1lIHRoZSB0b2tlblxuXHR9XG5cdGVsc2UgdGhpcy5fc3RhdGUgPSBURVhUO1xufTtcblxuVG9rZW5pemVyLnByb3RvdHlwZS5fc3RhdGVCZWZvcmVTdHlsZTEgPSBjb25zdW1lU3BlY2lhbE5hbWVDaGFyKFwiWVwiLCBCRUZPUkVfU1RZTEVfMik7XG5Ub2tlbml6ZXIucHJvdG90eXBlLl9zdGF0ZUJlZm9yZVN0eWxlMiA9IGNvbnN1bWVTcGVjaWFsTmFtZUNoYXIoXCJMXCIsIEJFRk9SRV9TVFlMRV8zKTtcblRva2VuaXplci5wcm90b3R5cGUuX3N0YXRlQmVmb3JlU3R5bGUzID0gY29uc3VtZVNwZWNpYWxOYW1lQ2hhcihcIkVcIiwgQkVGT1JFX1NUWUxFXzQpO1xuXG5Ub2tlbml6ZXIucHJvdG90eXBlLl9zdGF0ZUJlZm9yZVN0eWxlNCA9IGZ1bmN0aW9uKGMpe1xuXHRpZihjID09PSBcIi9cIiB8fCBjID09PSBcIj5cIiB8fCB3aGl0ZXNwYWNlKGMpKXtcblx0XHR0aGlzLl9zcGVjaWFsID0gU1BFQ0lBTF9TVFlMRTtcblx0fVxuXHR0aGlzLl9zdGF0ZSA9IElOX1RBR19OQU1FO1xuXHR0aGlzLl9pbmRleC0tOyAvL2NvbnN1bWUgdGhlIHRva2VuIGFnYWluXG59O1xuXG5Ub2tlbml6ZXIucHJvdG90eXBlLl9zdGF0ZUFmdGVyU3R5bGUxID0gaWZFbHNlU3RhdGUoXCJZXCIsIEFGVEVSX1NUWUxFXzIsIFRFWFQpO1xuVG9rZW5pemVyLnByb3RvdHlwZS5fc3RhdGVBZnRlclN0eWxlMiA9IGlmRWxzZVN0YXRlKFwiTFwiLCBBRlRFUl9TVFlMRV8zLCBURVhUKTtcblRva2VuaXplci5wcm90b3R5cGUuX3N0YXRlQWZ0ZXJTdHlsZTMgPSBpZkVsc2VTdGF0ZShcIkVcIiwgQUZURVJfU1RZTEVfNCwgVEVYVCk7XG5cblRva2VuaXplci5wcm90b3R5cGUuX3N0YXRlQWZ0ZXJTdHlsZTQgPSBmdW5jdGlvbihjKXtcblx0aWYoYyA9PT0gXCI+XCIgfHwgd2hpdGVzcGFjZShjKSl7XG5cdFx0dGhpcy5fc3BlY2lhbCA9IFNQRUNJQUxfTk9ORTtcblx0XHR0aGlzLl9zdGF0ZSA9IElOX0NMT1NJTkdfVEFHX05BTUU7XG5cdFx0dGhpcy5fc2VjdGlvblN0YXJ0ID0gdGhpcy5faW5kZXggLSA1O1xuXHRcdHRoaXMuX2luZGV4LS07IC8vcmVjb25zdW1lIHRoZSB0b2tlblxuXHR9XG5cdGVsc2UgdGhpcy5fc3RhdGUgPSBURVhUO1xufTtcblxuVG9rZW5pemVyLnByb3RvdHlwZS5fc3RhdGVCZWZvcmVFbnRpdHkgPSBpZkVsc2VTdGF0ZShcIiNcIiwgQkVGT1JFX05VTUVSSUNfRU5USVRZLCBJTl9OQU1FRF9FTlRJVFkpO1xuVG9rZW5pemVyLnByb3RvdHlwZS5fc3RhdGVCZWZvcmVOdW1lcmljRW50aXR5ID0gaWZFbHNlU3RhdGUoXCJYXCIsIElOX0hFWF9FTlRJVFksIElOX05VTUVSSUNfRU5USVRZKTtcblxuLy9mb3IgZW50aXRpZXMgdGVybWluYXRlZCB3aXRoIGEgc2VtaWNvbG9uXG5Ub2tlbml6ZXIucHJvdG90eXBlLl9wYXJzZU5hbWVkRW50aXR5U3RyaWN0ID0gZnVuY3Rpb24oKXtcblx0Ly9vZmZzZXQgPSAxXG5cdGlmKHRoaXMuX3NlY3Rpb25TdGFydCArIDEgPCB0aGlzLl9pbmRleCl7XG5cdFx0dmFyIGVudGl0eSA9IHRoaXMuX2J1ZmZlci5zdWJzdHJpbmcodGhpcy5fc2VjdGlvblN0YXJ0ICsgMSwgdGhpcy5faW5kZXgpLFxuXHRcdCAgICBtYXAgPSB0aGlzLl94bWxNb2RlID8geG1sTWFwIDogZW50aXR5TWFwO1xuXG5cdFx0aWYobWFwLmhhc093blByb3BlcnR5KGVudGl0eSkpe1xuXHRcdFx0dGhpcy5fZW1pdFBhcnRpYWwobWFwW2VudGl0eV0pO1xuXHRcdFx0dGhpcy5fc2VjdGlvblN0YXJ0ID0gdGhpcy5faW5kZXggKyAxO1xuXHRcdH1cblx0fVxufTtcblxuXG4vL3BhcnNlcyBsZWdhY3kgZW50aXRpZXMgKHdpdGhvdXQgdHJhaWxpbmcgc2VtaWNvbG9uKVxuVG9rZW5pemVyLnByb3RvdHlwZS5fcGFyc2VMZWdhY3lFbnRpdHkgPSBmdW5jdGlvbigpe1xuXHR2YXIgc3RhcnQgPSB0aGlzLl9zZWN0aW9uU3RhcnQgKyAxLFxuXHQgICAgbGltaXQgPSB0aGlzLl9pbmRleCAtIHN0YXJ0O1xuXG5cdGlmKGxpbWl0ID4gNikgbGltaXQgPSA2OyAvL3RoZSBtYXggbGVuZ3RoIG9mIGxlZ2FjeSBlbnRpdGllcyBpcyA2XG5cblx0d2hpbGUobGltaXQgPj0gMil7IC8vdGhlIG1pbiBsZW5ndGggb2YgbGVnYWN5IGVudGl0aWVzIGlzIDJcblx0XHR2YXIgZW50aXR5ID0gdGhpcy5fYnVmZmVyLnN1YnN0cihzdGFydCwgbGltaXQpO1xuXG5cdFx0aWYobGVnYWN5TWFwLmhhc093blByb3BlcnR5KGVudGl0eSkpe1xuXHRcdFx0dGhpcy5fZW1pdFBhcnRpYWwobGVnYWN5TWFwW2VudGl0eV0pO1xuXHRcdFx0dGhpcy5fc2VjdGlvblN0YXJ0ICs9IGxpbWl0ICsgMTtcblx0XHRcdHJldHVybjtcblx0XHR9IGVsc2Uge1xuXHRcdFx0bGltaXQtLTtcblx0XHR9XG5cdH1cbn07XG5cblRva2VuaXplci5wcm90b3R5cGUuX3N0YXRlSW5OYW1lZEVudGl0eSA9IGZ1bmN0aW9uKGMpe1xuXHRpZihjID09PSBcIjtcIil7XG5cdFx0dGhpcy5fcGFyc2VOYW1lZEVudGl0eVN0cmljdCgpO1xuXHRcdGlmKHRoaXMuX3NlY3Rpb25TdGFydCArIDEgPCB0aGlzLl9pbmRleCAmJiAhdGhpcy5feG1sTW9kZSl7XG5cdFx0XHR0aGlzLl9wYXJzZUxlZ2FjeUVudGl0eSgpO1xuXHRcdH1cblx0XHR0aGlzLl9zdGF0ZSA9IHRoaXMuX2Jhc2VTdGF0ZTtcblx0fSBlbHNlIGlmKChjIDwgXCJhXCIgfHwgYyA+IFwielwiKSAmJiAoYyA8IFwiQVwiIHx8IGMgPiBcIlpcIikgJiYgKGMgPCBcIjBcIiB8fCBjID4gXCI5XCIpKXtcblx0XHRpZih0aGlzLl94bWxNb2RlKTtcblx0XHRlbHNlIGlmKHRoaXMuX3NlY3Rpb25TdGFydCArIDEgPT09IHRoaXMuX2luZGV4KTtcblx0XHRlbHNlIGlmKHRoaXMuX2Jhc2VTdGF0ZSAhPT0gVEVYVCl7XG5cdFx0XHRpZihjICE9PSBcIj1cIil7XG5cdFx0XHRcdHRoaXMuX3BhcnNlTmFtZWRFbnRpdHlTdHJpY3QoKTtcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5fcGFyc2VMZWdhY3lFbnRpdHkoKTtcblx0XHR9XG5cblx0XHR0aGlzLl9zdGF0ZSA9IHRoaXMuX2Jhc2VTdGF0ZTtcblx0XHR0aGlzLl9pbmRleC0tO1xuXHR9XG59O1xuXG5Ub2tlbml6ZXIucHJvdG90eXBlLl9kZWNvZGVOdW1lcmljRW50aXR5ID0gZnVuY3Rpb24ob2Zmc2V0LCBiYXNlKXtcblx0dmFyIHNlY3Rpb25TdGFydCA9IHRoaXMuX3NlY3Rpb25TdGFydCArIG9mZnNldDtcblxuXHRpZihzZWN0aW9uU3RhcnQgIT09IHRoaXMuX2luZGV4KXtcblx0XHQvL3BhcnNlIGVudGl0eVxuXHRcdHZhciBlbnRpdHkgPSB0aGlzLl9idWZmZXIuc3Vic3RyaW5nKHNlY3Rpb25TdGFydCwgdGhpcy5faW5kZXgpO1xuXHRcdHZhciBwYXJzZWQgPSBwYXJzZUludChlbnRpdHksIGJhc2UpO1xuXG5cdFx0dGhpcy5fZW1pdFBhcnRpYWwoZGVjb2RlQ29kZVBvaW50KHBhcnNlZCkpO1xuXHRcdHRoaXMuX3NlY3Rpb25TdGFydCA9IHRoaXMuX2luZGV4O1xuXHR9IGVsc2Uge1xuXHRcdHRoaXMuX3NlY3Rpb25TdGFydC0tO1xuXHR9XG5cblx0dGhpcy5fc3RhdGUgPSB0aGlzLl9iYXNlU3RhdGU7XG59O1xuXG5Ub2tlbml6ZXIucHJvdG90eXBlLl9zdGF0ZUluTnVtZXJpY0VudGl0eSA9IGZ1bmN0aW9uKGMpe1xuXHRpZihjID09PSBcIjtcIil7XG5cdFx0dGhpcy5fZGVjb2RlTnVtZXJpY0VudGl0eSgyLCAxMCk7XG5cdFx0dGhpcy5fc2VjdGlvblN0YXJ0Kys7XG5cdH0gZWxzZSBpZihjIDwgXCIwXCIgfHwgYyA+IFwiOVwiKXtcblx0XHRpZighdGhpcy5feG1sTW9kZSl7XG5cdFx0XHR0aGlzLl9kZWNvZGVOdW1lcmljRW50aXR5KDIsIDEwKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5fc3RhdGUgPSB0aGlzLl9iYXNlU3RhdGU7XG5cdFx0fVxuXHRcdHRoaXMuX2luZGV4LS07XG5cdH1cbn07XG5cblRva2VuaXplci5wcm90b3R5cGUuX3N0YXRlSW5IZXhFbnRpdHkgPSBmdW5jdGlvbihjKXtcblx0aWYoYyA9PT0gXCI7XCIpe1xuXHRcdHRoaXMuX2RlY29kZU51bWVyaWNFbnRpdHkoMywgMTYpO1xuXHRcdHRoaXMuX3NlY3Rpb25TdGFydCsrO1xuXHR9IGVsc2UgaWYoKGMgPCBcImFcIiB8fCBjID4gXCJmXCIpICYmIChjIDwgXCJBXCIgfHwgYyA+IFwiRlwiKSAmJiAoYyA8IFwiMFwiIHx8IGMgPiBcIjlcIikpe1xuXHRcdGlmKCF0aGlzLl94bWxNb2RlKXtcblx0XHRcdHRoaXMuX2RlY29kZU51bWVyaWNFbnRpdHkoMywgMTYpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLl9zdGF0ZSA9IHRoaXMuX2Jhc2VTdGF0ZTtcblx0XHR9XG5cdFx0dGhpcy5faW5kZXgtLTtcblx0fVxufTtcblxuVG9rZW5pemVyLnByb3RvdHlwZS5fY2xlYW51cCA9IGZ1bmN0aW9uICgpe1xuXHRpZih0aGlzLl9zZWN0aW9uU3RhcnQgPCAwKXtcblx0XHR0aGlzLl9idWZmZXIgPSBcIlwiO1xuXHRcdHRoaXMuX2J1ZmZlck9mZnNldCArPSB0aGlzLl9pbmRleDtcblx0XHR0aGlzLl9pbmRleCA9IDA7XG5cdH0gZWxzZSBpZih0aGlzLl9ydW5uaW5nKXtcblx0XHRpZih0aGlzLl9zdGF0ZSA9PT0gVEVYVCl7XG5cdFx0XHRpZih0aGlzLl9zZWN0aW9uU3RhcnQgIT09IHRoaXMuX2luZGV4KXtcblx0XHRcdFx0dGhpcy5fY2JzLm9udGV4dCh0aGlzLl9idWZmZXIuc3Vic3RyKHRoaXMuX3NlY3Rpb25TdGFydCkpO1xuXHRcdFx0fVxuXHRcdFx0dGhpcy5fYnVmZmVyID0gXCJcIjtcblx0XHRcdHRoaXMuX2J1ZmZlck9mZnNldCArPSB0aGlzLl9pbmRleDtcblx0XHRcdHRoaXMuX2luZGV4ID0gMDtcblx0XHR9IGVsc2UgaWYodGhpcy5fc2VjdGlvblN0YXJ0ID09PSB0aGlzLl9pbmRleCl7XG5cdFx0XHQvL3RoZSBzZWN0aW9uIGp1c3Qgc3RhcnRlZFxuXHRcdFx0dGhpcy5fYnVmZmVyID0gXCJcIjtcblx0XHRcdHRoaXMuX2J1ZmZlck9mZnNldCArPSB0aGlzLl9pbmRleDtcblx0XHRcdHRoaXMuX2luZGV4ID0gMDtcblx0XHR9IGVsc2Uge1xuXHRcdFx0Ly9yZW1vdmUgZXZlcnl0aGluZyB1bm5lY2Vzc2FyeVxuXHRcdFx0dGhpcy5fYnVmZmVyID0gdGhpcy5fYnVmZmVyLnN1YnN0cih0aGlzLl9zZWN0aW9uU3RhcnQpO1xuXHRcdFx0dGhpcy5faW5kZXggLT0gdGhpcy5fc2VjdGlvblN0YXJ0O1xuXHRcdFx0dGhpcy5fYnVmZmVyT2Zmc2V0ICs9IHRoaXMuX3NlY3Rpb25TdGFydDtcblx0XHR9XG5cblx0XHR0aGlzLl9zZWN0aW9uU3RhcnQgPSAwO1xuXHR9XG59O1xuXG4vL1RPRE8gbWFrZSBldmVudHMgY29uZGl0aW9uYWxcblRva2VuaXplci5wcm90b3R5cGUud3JpdGUgPSBmdW5jdGlvbihjaHVuayl7XG5cdGlmKHRoaXMuX2VuZGVkKSB0aGlzLl9jYnMub25lcnJvcihFcnJvcihcIi53cml0ZSgpIGFmdGVyIGRvbmUhXCIpKTtcblxuXHR0aGlzLl9idWZmZXIgKz0gY2h1bms7XG5cdHRoaXMuX3BhcnNlKCk7XG59O1xuXG5Ub2tlbml6ZXIucHJvdG90eXBlLl9wYXJzZSA9IGZ1bmN0aW9uKCl7XG5cdHdoaWxlKHRoaXMuX2luZGV4IDwgdGhpcy5fYnVmZmVyLmxlbmd0aCAmJiB0aGlzLl9ydW5uaW5nKXtcblx0XHR2YXIgYyA9IHRoaXMuX2J1ZmZlci5jaGFyQXQodGhpcy5faW5kZXgpO1xuXHRcdGlmKHRoaXMuX3N0YXRlID09PSBURVhUKSB7XG5cdFx0XHR0aGlzLl9zdGF0ZVRleHQoYyk7XG5cdFx0fSBlbHNlIGlmKHRoaXMuX3N0YXRlID09PSBCRUZPUkVfVEFHX05BTUUpe1xuXHRcdFx0dGhpcy5fc3RhdGVCZWZvcmVUYWdOYW1lKGMpO1xuXHRcdH0gZWxzZSBpZih0aGlzLl9zdGF0ZSA9PT0gSU5fVEFHX05BTUUpIHtcblx0XHRcdHRoaXMuX3N0YXRlSW5UYWdOYW1lKGMpO1xuXHRcdH0gZWxzZSBpZih0aGlzLl9zdGF0ZSA9PT0gQkVGT1JFX0NMT1NJTkdfVEFHX05BTUUpe1xuXHRcdFx0dGhpcy5fc3RhdGVCZWZvcmVDbG9zZWluZ1RhZ05hbWUoYyk7XG5cdFx0fSBlbHNlIGlmKHRoaXMuX3N0YXRlID09PSBJTl9DTE9TSU5HX1RBR19OQU1FKXtcblx0XHRcdHRoaXMuX3N0YXRlSW5DbG9zZWluZ1RhZ05hbWUoYyk7XG5cdFx0fSBlbHNlIGlmKHRoaXMuX3N0YXRlID09PSBBRlRFUl9DTE9TSU5HX1RBR19OQU1FKXtcblx0XHRcdHRoaXMuX3N0YXRlQWZ0ZXJDbG9zZWluZ1RhZ05hbWUoYyk7XG5cdFx0fSBlbHNlIGlmKHRoaXMuX3N0YXRlID09PSBJTl9TRUxGX0NMT1NJTkdfVEFHKXtcblx0XHRcdHRoaXMuX3N0YXRlSW5TZWxmQ2xvc2luZ1RhZyhjKTtcblx0XHR9XG5cblx0XHQvKlxuXHRcdCpcdGF0dHJpYnV0ZXNcblx0XHQqL1xuXHRcdGVsc2UgaWYodGhpcy5fc3RhdGUgPT09IEJFRk9SRV9BVFRSSUJVVEVfTkFNRSl7XG5cdFx0XHR0aGlzLl9zdGF0ZUJlZm9yZUF0dHJpYnV0ZU5hbWUoYyk7XG5cdFx0fSBlbHNlIGlmKHRoaXMuX3N0YXRlID09PSBJTl9BVFRSSUJVVEVfTkFNRSl7XG5cdFx0XHR0aGlzLl9zdGF0ZUluQXR0cmlidXRlTmFtZShjKTtcblx0XHR9IGVsc2UgaWYodGhpcy5fc3RhdGUgPT09IEFGVEVSX0FUVFJJQlVURV9OQU1FKXtcblx0XHRcdHRoaXMuX3N0YXRlQWZ0ZXJBdHRyaWJ1dGVOYW1lKGMpO1xuXHRcdH0gZWxzZSBpZih0aGlzLl9zdGF0ZSA9PT0gQkVGT1JFX0FUVFJJQlVURV9WQUxVRSl7XG5cdFx0XHR0aGlzLl9zdGF0ZUJlZm9yZUF0dHJpYnV0ZVZhbHVlKGMpO1xuXHRcdH0gZWxzZSBpZih0aGlzLl9zdGF0ZSA9PT0gSU5fQVRUUklCVVRFX1ZBTFVFX0RRKXtcblx0XHRcdHRoaXMuX3N0YXRlSW5BdHRyaWJ1dGVWYWx1ZURvdWJsZVF1b3RlcyhjKTtcblx0XHR9IGVsc2UgaWYodGhpcy5fc3RhdGUgPT09IElOX0FUVFJJQlVURV9WQUxVRV9TUSl7XG5cdFx0XHR0aGlzLl9zdGF0ZUluQXR0cmlidXRlVmFsdWVTaW5nbGVRdW90ZXMoYyk7XG5cdFx0fSBlbHNlIGlmKHRoaXMuX3N0YXRlID09PSBJTl9BVFRSSUJVVEVfVkFMVUVfTlEpe1xuXHRcdFx0dGhpcy5fc3RhdGVJbkF0dHJpYnV0ZVZhbHVlTm9RdW90ZXMoYyk7XG5cdFx0fVxuXG5cdFx0Lypcblx0XHQqXHRkZWNsYXJhdGlvbnNcblx0XHQqL1xuXHRcdGVsc2UgaWYodGhpcy5fc3RhdGUgPT09IEJFRk9SRV9ERUNMQVJBVElPTil7XG5cdFx0XHR0aGlzLl9zdGF0ZUJlZm9yZURlY2xhcmF0aW9uKGMpO1xuXHRcdH0gZWxzZSBpZih0aGlzLl9zdGF0ZSA9PT0gSU5fREVDTEFSQVRJT04pe1xuXHRcdFx0dGhpcy5fc3RhdGVJbkRlY2xhcmF0aW9uKGMpO1xuXHRcdH1cblxuXHRcdC8qXG5cdFx0Klx0cHJvY2Vzc2luZyBpbnN0cnVjdGlvbnNcblx0XHQqL1xuXHRcdGVsc2UgaWYodGhpcy5fc3RhdGUgPT09IElOX1BST0NFU1NJTkdfSU5TVFJVQ1RJT04pe1xuXHRcdFx0dGhpcy5fc3RhdGVJblByb2Nlc3NpbmdJbnN0cnVjdGlvbihjKTtcblx0XHR9XG5cblx0XHQvKlxuXHRcdCpcdGNvbW1lbnRzXG5cdFx0Ki9cblx0XHRlbHNlIGlmKHRoaXMuX3N0YXRlID09PSBCRUZPUkVfQ09NTUVOVCl7XG5cdFx0XHR0aGlzLl9zdGF0ZUJlZm9yZUNvbW1lbnQoYyk7XG5cdFx0fSBlbHNlIGlmKHRoaXMuX3N0YXRlID09PSBJTl9DT01NRU5UKXtcblx0XHRcdHRoaXMuX3N0YXRlSW5Db21tZW50KGMpO1xuXHRcdH0gZWxzZSBpZih0aGlzLl9zdGF0ZSA9PT0gQUZURVJfQ09NTUVOVF8xKXtcblx0XHRcdHRoaXMuX3N0YXRlQWZ0ZXJDb21tZW50MShjKTtcblx0XHR9IGVsc2UgaWYodGhpcy5fc3RhdGUgPT09IEFGVEVSX0NPTU1FTlRfMil7XG5cdFx0XHR0aGlzLl9zdGF0ZUFmdGVyQ29tbWVudDIoYyk7XG5cdFx0fVxuXG5cdFx0Lypcblx0XHQqXHRjZGF0YVxuXHRcdCovXG5cdFx0ZWxzZSBpZih0aGlzLl9zdGF0ZSA9PT0gQkVGT1JFX0NEQVRBXzEpe1xuXHRcdFx0dGhpcy5fc3RhdGVCZWZvcmVDZGF0YTEoYyk7XG5cdFx0fSBlbHNlIGlmKHRoaXMuX3N0YXRlID09PSBCRUZPUkVfQ0RBVEFfMil7XG5cdFx0XHR0aGlzLl9zdGF0ZUJlZm9yZUNkYXRhMihjKTtcblx0XHR9IGVsc2UgaWYodGhpcy5fc3RhdGUgPT09IEJFRk9SRV9DREFUQV8zKXtcblx0XHRcdHRoaXMuX3N0YXRlQmVmb3JlQ2RhdGEzKGMpO1xuXHRcdH0gZWxzZSBpZih0aGlzLl9zdGF0ZSA9PT0gQkVGT1JFX0NEQVRBXzQpe1xuXHRcdFx0dGhpcy5fc3RhdGVCZWZvcmVDZGF0YTQoYyk7XG5cdFx0fSBlbHNlIGlmKHRoaXMuX3N0YXRlID09PSBCRUZPUkVfQ0RBVEFfNSl7XG5cdFx0XHR0aGlzLl9zdGF0ZUJlZm9yZUNkYXRhNShjKTtcblx0XHR9IGVsc2UgaWYodGhpcy5fc3RhdGUgPT09IEJFRk9SRV9DREFUQV82KXtcblx0XHRcdHRoaXMuX3N0YXRlQmVmb3JlQ2RhdGE2KGMpO1xuXHRcdH0gZWxzZSBpZih0aGlzLl9zdGF0ZSA9PT0gSU5fQ0RBVEEpe1xuXHRcdFx0dGhpcy5fc3RhdGVJbkNkYXRhKGMpO1xuXHRcdH0gZWxzZSBpZih0aGlzLl9zdGF0ZSA9PT0gQUZURVJfQ0RBVEFfMSl7XG5cdFx0XHR0aGlzLl9zdGF0ZUFmdGVyQ2RhdGExKGMpO1xuXHRcdH0gZWxzZSBpZih0aGlzLl9zdGF0ZSA9PT0gQUZURVJfQ0RBVEFfMil7XG5cdFx0XHR0aGlzLl9zdGF0ZUFmdGVyQ2RhdGEyKGMpO1xuXHRcdH1cblxuXHRcdC8qXG5cdFx0KiBzcGVjaWFsIHRhZ3Ncblx0XHQqL1xuXHRcdGVsc2UgaWYodGhpcy5fc3RhdGUgPT09IEJFRk9SRV9TUEVDSUFMKXtcblx0XHRcdHRoaXMuX3N0YXRlQmVmb3JlU3BlY2lhbChjKTtcblx0XHR9IGVsc2UgaWYodGhpcy5fc3RhdGUgPT09IEJFRk9SRV9TUEVDSUFMX0VORCl7XG5cdFx0XHR0aGlzLl9zdGF0ZUJlZm9yZVNwZWNpYWxFbmQoYyk7XG5cdFx0fVxuXG5cdFx0Lypcblx0XHQqIHNjcmlwdFxuXHRcdCovXG5cdFx0ZWxzZSBpZih0aGlzLl9zdGF0ZSA9PT0gQkVGT1JFX1NDUklQVF8xKXtcblx0XHRcdHRoaXMuX3N0YXRlQmVmb3JlU2NyaXB0MShjKTtcblx0XHR9IGVsc2UgaWYodGhpcy5fc3RhdGUgPT09IEJFRk9SRV9TQ1JJUFRfMil7XG5cdFx0XHR0aGlzLl9zdGF0ZUJlZm9yZVNjcmlwdDIoYyk7XG5cdFx0fSBlbHNlIGlmKHRoaXMuX3N0YXRlID09PSBCRUZPUkVfU0NSSVBUXzMpe1xuXHRcdFx0dGhpcy5fc3RhdGVCZWZvcmVTY3JpcHQzKGMpO1xuXHRcdH0gZWxzZSBpZih0aGlzLl9zdGF0ZSA9PT0gQkVGT1JFX1NDUklQVF80KXtcblx0XHRcdHRoaXMuX3N0YXRlQmVmb3JlU2NyaXB0NChjKTtcblx0XHR9IGVsc2UgaWYodGhpcy5fc3RhdGUgPT09IEJFRk9SRV9TQ1JJUFRfNSl7XG5cdFx0XHR0aGlzLl9zdGF0ZUJlZm9yZVNjcmlwdDUoYyk7XG5cdFx0fVxuXG5cdFx0ZWxzZSBpZih0aGlzLl9zdGF0ZSA9PT0gQUZURVJfU0NSSVBUXzEpe1xuXHRcdFx0dGhpcy5fc3RhdGVBZnRlclNjcmlwdDEoYyk7XG5cdFx0fSBlbHNlIGlmKHRoaXMuX3N0YXRlID09PSBBRlRFUl9TQ1JJUFRfMil7XG5cdFx0XHR0aGlzLl9zdGF0ZUFmdGVyU2NyaXB0MihjKTtcblx0XHR9IGVsc2UgaWYodGhpcy5fc3RhdGUgPT09IEFGVEVSX1NDUklQVF8zKXtcblx0XHRcdHRoaXMuX3N0YXRlQWZ0ZXJTY3JpcHQzKGMpO1xuXHRcdH0gZWxzZSBpZih0aGlzLl9zdGF0ZSA9PT0gQUZURVJfU0NSSVBUXzQpe1xuXHRcdFx0dGhpcy5fc3RhdGVBZnRlclNjcmlwdDQoYyk7XG5cdFx0fSBlbHNlIGlmKHRoaXMuX3N0YXRlID09PSBBRlRFUl9TQ1JJUFRfNSl7XG5cdFx0XHR0aGlzLl9zdGF0ZUFmdGVyU2NyaXB0NShjKTtcblx0XHR9XG5cblx0XHQvKlxuXHRcdCogc3R5bGVcblx0XHQqL1xuXHRcdGVsc2UgaWYodGhpcy5fc3RhdGUgPT09IEJFRk9SRV9TVFlMRV8xKXtcblx0XHRcdHRoaXMuX3N0YXRlQmVmb3JlU3R5bGUxKGMpO1xuXHRcdH0gZWxzZSBpZih0aGlzLl9zdGF0ZSA9PT0gQkVGT1JFX1NUWUxFXzIpe1xuXHRcdFx0dGhpcy5fc3RhdGVCZWZvcmVTdHlsZTIoYyk7XG5cdFx0fSBlbHNlIGlmKHRoaXMuX3N0YXRlID09PSBCRUZPUkVfU1RZTEVfMyl7XG5cdFx0XHR0aGlzLl9zdGF0ZUJlZm9yZVN0eWxlMyhjKTtcblx0XHR9IGVsc2UgaWYodGhpcy5fc3RhdGUgPT09IEJFRk9SRV9TVFlMRV80KXtcblx0XHRcdHRoaXMuX3N0YXRlQmVmb3JlU3R5bGU0KGMpO1xuXHRcdH1cblxuXHRcdGVsc2UgaWYodGhpcy5fc3RhdGUgPT09IEFGVEVSX1NUWUxFXzEpe1xuXHRcdFx0dGhpcy5fc3RhdGVBZnRlclN0eWxlMShjKTtcblx0XHR9IGVsc2UgaWYodGhpcy5fc3RhdGUgPT09IEFGVEVSX1NUWUxFXzIpe1xuXHRcdFx0dGhpcy5fc3RhdGVBZnRlclN0eWxlMihjKTtcblx0XHR9IGVsc2UgaWYodGhpcy5fc3RhdGUgPT09IEFGVEVSX1NUWUxFXzMpe1xuXHRcdFx0dGhpcy5fc3RhdGVBZnRlclN0eWxlMyhjKTtcblx0XHR9IGVsc2UgaWYodGhpcy5fc3RhdGUgPT09IEFGVEVSX1NUWUxFXzQpe1xuXHRcdFx0dGhpcy5fc3RhdGVBZnRlclN0eWxlNChjKTtcblx0XHR9XG5cblx0XHQvKlxuXHRcdCogZW50aXRpZXNcblx0XHQqL1xuXHRcdGVsc2UgaWYodGhpcy5fc3RhdGUgPT09IEJFRk9SRV9FTlRJVFkpe1xuXHRcdFx0dGhpcy5fc3RhdGVCZWZvcmVFbnRpdHkoYyk7XG5cdFx0fSBlbHNlIGlmKHRoaXMuX3N0YXRlID09PSBCRUZPUkVfTlVNRVJJQ19FTlRJVFkpe1xuXHRcdFx0dGhpcy5fc3RhdGVCZWZvcmVOdW1lcmljRW50aXR5KGMpO1xuXHRcdH0gZWxzZSBpZih0aGlzLl9zdGF0ZSA9PT0gSU5fTkFNRURfRU5USVRZKXtcblx0XHRcdHRoaXMuX3N0YXRlSW5OYW1lZEVudGl0eShjKTtcblx0XHR9IGVsc2UgaWYodGhpcy5fc3RhdGUgPT09IElOX05VTUVSSUNfRU5USVRZKXtcblx0XHRcdHRoaXMuX3N0YXRlSW5OdW1lcmljRW50aXR5KGMpO1xuXHRcdH0gZWxzZSBpZih0aGlzLl9zdGF0ZSA9PT0gSU5fSEVYX0VOVElUWSl7XG5cdFx0XHR0aGlzLl9zdGF0ZUluSGV4RW50aXR5KGMpO1xuXHRcdH1cblxuXHRcdGVsc2Uge1xuXHRcdFx0dGhpcy5fY2JzLm9uZXJyb3IoRXJyb3IoXCJ1bmtub3duIF9zdGF0ZVwiKSwgdGhpcy5fc3RhdGUpO1xuXHRcdH1cblxuXHRcdHRoaXMuX2luZGV4Kys7XG5cdH1cblxuXHR0aGlzLl9jbGVhbnVwKCk7XG59O1xuXG5Ub2tlbml6ZXIucHJvdG90eXBlLnBhdXNlID0gZnVuY3Rpb24oKXtcblx0dGhpcy5fcnVubmluZyA9IGZhbHNlO1xufTtcblRva2VuaXplci5wcm90b3R5cGUucmVzdW1lID0gZnVuY3Rpb24oKXtcblx0dGhpcy5fcnVubmluZyA9IHRydWU7XG5cblx0aWYodGhpcy5faW5kZXggPCB0aGlzLl9idWZmZXIubGVuZ3RoKXtcblx0XHR0aGlzLl9wYXJzZSgpO1xuXHR9XG5cdGlmKHRoaXMuX2VuZGVkKXtcblx0XHR0aGlzLl9maW5pc2goKTtcblx0fVxufTtcblxuVG9rZW5pemVyLnByb3RvdHlwZS5lbmQgPSBmdW5jdGlvbihjaHVuayl7XG5cdGlmKHRoaXMuX2VuZGVkKSB0aGlzLl9jYnMub25lcnJvcihFcnJvcihcIi5lbmQoKSBhZnRlciBkb25lIVwiKSk7XG5cdGlmKGNodW5rKSB0aGlzLndyaXRlKGNodW5rKTtcblxuXHR0aGlzLl9lbmRlZCA9IHRydWU7XG5cblx0aWYodGhpcy5fcnVubmluZykgdGhpcy5fZmluaXNoKCk7XG59O1xuXG5Ub2tlbml6ZXIucHJvdG90eXBlLl9maW5pc2ggPSBmdW5jdGlvbigpe1xuXHQvL2lmIHRoZXJlIGlzIHJlbWFpbmluZyBkYXRhLCBlbWl0IGl0IGluIGEgcmVhc29uYWJsZSB3YXlcblx0aWYodGhpcy5fc2VjdGlvblN0YXJ0IDwgdGhpcy5faW5kZXgpe1xuXHRcdHRoaXMuX2hhbmRsZVRyYWlsaW5nRGF0YSgpO1xuXHR9XG5cblx0dGhpcy5fY2JzLm9uZW5kKCk7XG59O1xuXG5Ub2tlbml6ZXIucHJvdG90eXBlLl9oYW5kbGVUcmFpbGluZ0RhdGEgPSBmdW5jdGlvbigpe1xuXHR2YXIgZGF0YSA9IHRoaXMuX2J1ZmZlci5zdWJzdHIodGhpcy5fc2VjdGlvblN0YXJ0KTtcblxuXHRpZih0aGlzLl9zdGF0ZSA9PT0gSU5fQ0RBVEEgfHwgdGhpcy5fc3RhdGUgPT09IEFGVEVSX0NEQVRBXzEgfHwgdGhpcy5fc3RhdGUgPT09IEFGVEVSX0NEQVRBXzIpe1xuXHRcdHRoaXMuX2Nicy5vbmNkYXRhKGRhdGEpO1xuXHR9IGVsc2UgaWYodGhpcy5fc3RhdGUgPT09IElOX0NPTU1FTlQgfHwgdGhpcy5fc3RhdGUgPT09IEFGVEVSX0NPTU1FTlRfMSB8fCB0aGlzLl9zdGF0ZSA9PT0gQUZURVJfQ09NTUVOVF8yKXtcblx0XHR0aGlzLl9jYnMub25jb21tZW50KGRhdGEpO1xuXHR9IGVsc2UgaWYodGhpcy5fc3RhdGUgPT09IElOX05BTUVEX0VOVElUWSAmJiAhdGhpcy5feG1sTW9kZSl7XG5cdFx0dGhpcy5fcGFyc2VMZWdhY3lFbnRpdHkoKTtcblx0XHRpZih0aGlzLl9zZWN0aW9uU3RhcnQgPCB0aGlzLl9pbmRleCl7XG5cdFx0XHR0aGlzLl9zdGF0ZSA9IHRoaXMuX2Jhc2VTdGF0ZTtcblx0XHRcdHRoaXMuX2hhbmRsZVRyYWlsaW5nRGF0YSgpO1xuXHRcdH1cblx0fSBlbHNlIGlmKHRoaXMuX3N0YXRlID09PSBJTl9OVU1FUklDX0VOVElUWSAmJiAhdGhpcy5feG1sTW9kZSl7XG5cdFx0dGhpcy5fZGVjb2RlTnVtZXJpY0VudGl0eSgyLCAxMCk7XG5cdFx0aWYodGhpcy5fc2VjdGlvblN0YXJ0IDwgdGhpcy5faW5kZXgpe1xuXHRcdFx0dGhpcy5fc3RhdGUgPSB0aGlzLl9iYXNlU3RhdGU7XG5cdFx0XHR0aGlzLl9oYW5kbGVUcmFpbGluZ0RhdGEoKTtcblx0XHR9XG5cdH0gZWxzZSBpZih0aGlzLl9zdGF0ZSA9PT0gSU5fSEVYX0VOVElUWSAmJiAhdGhpcy5feG1sTW9kZSl7XG5cdFx0dGhpcy5fZGVjb2RlTnVtZXJpY0VudGl0eSgzLCAxNik7XG5cdFx0aWYodGhpcy5fc2VjdGlvblN0YXJ0IDwgdGhpcy5faW5kZXgpe1xuXHRcdFx0dGhpcy5fc3RhdGUgPSB0aGlzLl9iYXNlU3RhdGU7XG5cdFx0XHR0aGlzLl9oYW5kbGVUcmFpbGluZ0RhdGEoKTtcblx0XHR9XG5cdH0gZWxzZSBpZihcblx0XHR0aGlzLl9zdGF0ZSAhPT0gSU5fVEFHX05BTUUgJiZcblx0XHR0aGlzLl9zdGF0ZSAhPT0gQkVGT1JFX0FUVFJJQlVURV9OQU1FICYmXG5cdFx0dGhpcy5fc3RhdGUgIT09IEJFRk9SRV9BVFRSSUJVVEVfVkFMVUUgJiZcblx0XHR0aGlzLl9zdGF0ZSAhPT0gQUZURVJfQVRUUklCVVRFX05BTUUgJiZcblx0XHR0aGlzLl9zdGF0ZSAhPT0gSU5fQVRUUklCVVRFX05BTUUgJiZcblx0XHR0aGlzLl9zdGF0ZSAhPT0gSU5fQVRUUklCVVRFX1ZBTFVFX1NRICYmXG5cdFx0dGhpcy5fc3RhdGUgIT09IElOX0FUVFJJQlVURV9WQUxVRV9EUSAmJlxuXHRcdHRoaXMuX3N0YXRlICE9PSBJTl9BVFRSSUJVVEVfVkFMVUVfTlEgJiZcblx0XHR0aGlzLl9zdGF0ZSAhPT0gSU5fQ0xPU0lOR19UQUdfTkFNRVxuXHQpe1xuXHRcdHRoaXMuX2Nicy5vbnRleHQoZGF0YSk7XG5cdH1cblx0Ly9lbHNlLCBpZ25vcmUgcmVtYWluaW5nIGRhdGFcblx0Ly9UT0RPIGFkZCBhIHdheSB0byByZW1vdmUgY3VycmVudCB0YWdcbn07XG5cblRva2VuaXplci5wcm90b3R5cGUucmVzZXQgPSBmdW5jdGlvbigpe1xuXHRUb2tlbml6ZXIuY2FsbCh0aGlzLCB7eG1sTW9kZTogdGhpcy5feG1sTW9kZSwgZGVjb2RlRW50aXRpZXM6IHRoaXMuX2RlY29kZUVudGl0aWVzfSwgdGhpcy5fY2JzKTtcbn07XG5cblRva2VuaXplci5wcm90b3R5cGUuZ2V0QWJzb2x1dGVJbmRleCA9IGZ1bmN0aW9uKCl7XG5cdHJldHVybiB0aGlzLl9idWZmZXJPZmZzZXQgKyB0aGlzLl9pbmRleDtcbn07XG5cblRva2VuaXplci5wcm90b3R5cGUuX2dldFNlY3Rpb24gPSBmdW5jdGlvbigpe1xuXHRyZXR1cm4gdGhpcy5fYnVmZmVyLnN1YnN0cmluZyh0aGlzLl9zZWN0aW9uU3RhcnQsIHRoaXMuX2luZGV4KTtcbn07XG5cblRva2VuaXplci5wcm90b3R5cGUuX2VtaXRUb2tlbiA9IGZ1bmN0aW9uKG5hbWUpe1xuXHR0aGlzLl9jYnNbbmFtZV0odGhpcy5fZ2V0U2VjdGlvbigpKTtcblx0dGhpcy5fc2VjdGlvblN0YXJ0ID0gLTE7XG59O1xuXG5Ub2tlbml6ZXIucHJvdG90eXBlLl9lbWl0UGFydGlhbCA9IGZ1bmN0aW9uKHZhbHVlKXtcblx0aWYodGhpcy5fYmFzZVN0YXRlICE9PSBURVhUKXtcblx0XHR0aGlzLl9jYnMub25hdHRyaWJkYXRhKHZhbHVlKTsgLy9UT0RPIGltcGxlbWVudCB0aGUgbmV3IGV2ZW50XG5cdH0gZWxzZSB7XG5cdFx0dGhpcy5fY2JzLm9udGV4dCh2YWx1ZSk7XG5cdH1cbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IFN0cmVhbTtcblxudmFyIFBhcnNlciA9IHJlcXVpcmUoXCIuL1BhcnNlci5qc1wiKSxcbiAgICBXcml0YWJsZVN0cmVhbSA9IHJlcXVpcmUoXCJzdHJlYW1cIikuV3JpdGFibGUgfHwgcmVxdWlyZShcInJlYWRhYmxlLXN0cmVhbVwiKS5Xcml0YWJsZSxcbiAgICBTdHJpbmdEZWNvZGVyID0gcmVxdWlyZShcInN0cmluZ19kZWNvZGVyXCIpLlN0cmluZ0RlY29kZXIsXG4gICAgQnVmZmVyID0gcmVxdWlyZShcImJ1ZmZlclwiKS5CdWZmZXI7XG5cbmZ1bmN0aW9uIFN0cmVhbShjYnMsIG9wdGlvbnMpe1xuXHR2YXIgcGFyc2VyID0gdGhpcy5fcGFyc2VyID0gbmV3IFBhcnNlcihjYnMsIG9wdGlvbnMpO1xuXHR2YXIgZGVjb2RlciA9IHRoaXMuX2RlY29kZXIgPSBuZXcgU3RyaW5nRGVjb2RlcigpO1xuXG5cdFdyaXRhYmxlU3RyZWFtLmNhbGwodGhpcywge2RlY29kZVN0cmluZ3M6IGZhbHNlfSk7XG5cblx0dGhpcy5vbmNlKFwiZmluaXNoXCIsIGZ1bmN0aW9uKCl7XG5cdFx0cGFyc2VyLmVuZChkZWNvZGVyLmVuZCgpKTtcblx0fSk7XG59XG5cbnJlcXVpcmUoXCJpbmhlcml0c1wiKShTdHJlYW0sIFdyaXRhYmxlU3RyZWFtKTtcblxuV3JpdGFibGVTdHJlYW0ucHJvdG90eXBlLl93cml0ZSA9IGZ1bmN0aW9uKGNodW5rLCBlbmNvZGluZywgY2Ipe1xuXHRpZihjaHVuayBpbnN0YW5jZW9mIEJ1ZmZlcikgY2h1bmsgPSB0aGlzLl9kZWNvZGVyLndyaXRlKGNodW5rKTtcblx0dGhpcy5fcGFyc2VyLndyaXRlKGNodW5rKTtcblx0Y2IoKTtcbn07IiwidmFyIFBhcnNlciA9IHJlcXVpcmUoXCIuL1BhcnNlci5qc1wiKSxcbiAgICBEb21IYW5kbGVyID0gcmVxdWlyZShcImRvbWhhbmRsZXJcIik7XG5cbmZ1bmN0aW9uIGRlZmluZVByb3AobmFtZSwgdmFsdWUpe1xuXHRkZWxldGUgbW9kdWxlLmV4cG9ydHNbbmFtZV07XG5cdG1vZHVsZS5leHBvcnRzW25hbWVdID0gdmFsdWU7XG5cdHJldHVybiB2YWx1ZTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG5cdFBhcnNlcjogUGFyc2VyLFxuXHRUb2tlbml6ZXI6IHJlcXVpcmUoXCIuL1Rva2VuaXplci5qc1wiKSxcblx0RWxlbWVudFR5cGU6IHJlcXVpcmUoXCJkb21lbGVtZW50dHlwZVwiKSxcblx0RG9tSGFuZGxlcjogRG9tSGFuZGxlcixcblx0Z2V0IEZlZWRIYW5kbGVyKCl7XG5cdFx0cmV0dXJuIGRlZmluZVByb3AoXCJGZWVkSGFuZGxlclwiLCByZXF1aXJlKFwiLi9GZWVkSGFuZGxlci5qc1wiKSk7XG5cdH0sXG5cdGdldCBTdHJlYW0oKXtcblx0XHRyZXR1cm4gZGVmaW5lUHJvcChcIlN0cmVhbVwiLCByZXF1aXJlKFwiLi9TdHJlYW0uanNcIikpO1xuXHR9LFxuXHRnZXQgV3JpdGFibGVTdHJlYW0oKXtcblx0XHRyZXR1cm4gZGVmaW5lUHJvcChcIldyaXRhYmxlU3RyZWFtXCIsIHJlcXVpcmUoXCIuL1dyaXRhYmxlU3RyZWFtLmpzXCIpKTtcblx0fSxcblx0Z2V0IFByb3h5SGFuZGxlcigpe1xuXHRcdHJldHVybiBkZWZpbmVQcm9wKFwiUHJveHlIYW5kbGVyXCIsIHJlcXVpcmUoXCIuL1Byb3h5SGFuZGxlci5qc1wiKSk7XG5cdH0sXG5cdGdldCBEb21VdGlscygpe1xuXHRcdHJldHVybiBkZWZpbmVQcm9wKFwiRG9tVXRpbHNcIiwgcmVxdWlyZShcImRvbXV0aWxzXCIpKTtcblx0fSxcblx0Z2V0IENvbGxlY3RpbmdIYW5kbGVyKCl7XG5cdFx0cmV0dXJuIGRlZmluZVByb3AoXCJDb2xsZWN0aW5nSGFuZGxlclwiLCByZXF1aXJlKFwiLi9Db2xsZWN0aW5nSGFuZGxlci5qc1wiKSk7XG5cdH0sXG5cdC8vIEZvciBsZWdhY3kgc3VwcG9ydFxuXHREZWZhdWx0SGFuZGxlcjogRG9tSGFuZGxlcixcblx0Z2V0IFJzc0hhbmRsZXIoKXtcblx0XHRyZXR1cm4gZGVmaW5lUHJvcChcIlJzc0hhbmRsZXJcIiwgdGhpcy5GZWVkSGFuZGxlcik7XG5cdH0sXG5cdC8vaGVscGVyIG1ldGhvZHNcblx0cGFyc2VET006IGZ1bmN0aW9uKGRhdGEsIG9wdGlvbnMpe1xuXHRcdHZhciBoYW5kbGVyID0gbmV3IERvbUhhbmRsZXIob3B0aW9ucyk7XG5cdFx0bmV3IFBhcnNlcihoYW5kbGVyLCBvcHRpb25zKS5lbmQoZGF0YSk7XG5cdFx0cmV0dXJuIGhhbmRsZXIuZG9tO1xuXHR9LFxuXHRwYXJzZUZlZWQ6IGZ1bmN0aW9uKGZlZWQsIG9wdGlvbnMpe1xuXHRcdHZhciBoYW5kbGVyID0gbmV3IG1vZHVsZS5leHBvcnRzLkZlZWRIYW5kbGVyKG9wdGlvbnMpO1xuXHRcdG5ldyBQYXJzZXIoaGFuZGxlciwgb3B0aW9ucykuZW5kKGZlZWQpO1xuXHRcdHJldHVybiBoYW5kbGVyLmRvbTtcblx0fSxcblx0Y3JlYXRlRG9tU3RyZWFtOiBmdW5jdGlvbihjYiwgb3B0aW9ucywgZWxlbWVudENiKXtcblx0XHR2YXIgaGFuZGxlciA9IG5ldyBEb21IYW5kbGVyKGNiLCBvcHRpb25zLCBlbGVtZW50Q2IpO1xuXHRcdHJldHVybiBuZXcgUGFyc2VyKGhhbmRsZXIsIG9wdGlvbnMpO1xuXHR9LFxuXHQvLyBMaXN0IG9mIGFsbCBldmVudHMgdGhhdCB0aGUgcGFyc2VyIGVtaXRzXG5cdEVWRU5UUzogeyAvKiBGb3JtYXQ6IGV2ZW50bmFtZTogbnVtYmVyIG9mIGFyZ3VtZW50cyAqL1xuXHRcdGF0dHJpYnV0ZTogMixcblx0XHRjZGF0YXN0YXJ0OiAwLFxuXHRcdGNkYXRhZW5kOiAwLFxuXHRcdHRleHQ6IDEsXG5cdFx0cHJvY2Vzc2luZ2luc3RydWN0aW9uOiAyLFxuXHRcdGNvbW1lbnQ6IDEsXG5cdFx0Y29tbWVudGVuZDogMCxcblx0XHRjbG9zZXRhZzogMSxcblx0XHRvcGVudGFnOiAyLFxuXHRcdG9wZW50YWduYW1lOiAxLFxuXHRcdGVycm9yOiAxLFxuXHRcdGVuZDogMFxuXHR9XG59O1xuIiwiLy8gQ29weXJpZ2h0IEpveWVudCwgSW5jLiBhbmQgb3RoZXIgTm9kZSBjb250cmlidXRvcnMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGFcbi8vIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGVcbi8vIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZ1xuLy8gd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLFxuLy8gZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdFxuLy8gcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlXG4vLyBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZFxuLy8gaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTU1xuLy8gT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRlxuLy8gTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTlxuLy8gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sXG4vLyBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1Jcbi8vIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEVcbi8vIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG5cbm1vZHVsZS5leHBvcnRzID0gU3RyZWFtO1xuXG52YXIgRUUgPSByZXF1aXJlKCdldmVudHMnKS5FdmVudEVtaXR0ZXI7XG52YXIgaW5oZXJpdHMgPSByZXF1aXJlKCdpbmhlcml0cycpO1xuXG5pbmhlcml0cyhTdHJlYW0sIEVFKTtcblN0cmVhbS5SZWFkYWJsZSA9IHJlcXVpcmUoJ3JlYWRhYmxlLXN0cmVhbS9yZWFkYWJsZS5qcycpO1xuU3RyZWFtLldyaXRhYmxlID0gcmVxdWlyZSgncmVhZGFibGUtc3RyZWFtL3dyaXRhYmxlLmpzJyk7XG5TdHJlYW0uRHVwbGV4ID0gcmVxdWlyZSgncmVhZGFibGUtc3RyZWFtL2R1cGxleC5qcycpO1xuU3RyZWFtLlRyYW5zZm9ybSA9IHJlcXVpcmUoJ3JlYWRhYmxlLXN0cmVhbS90cmFuc2Zvcm0uanMnKTtcblN0cmVhbS5QYXNzVGhyb3VnaCA9IHJlcXVpcmUoJ3JlYWRhYmxlLXN0cmVhbS9wYXNzdGhyb3VnaC5qcycpO1xuXG4vLyBCYWNrd2FyZHMtY29tcGF0IHdpdGggbm9kZSAwLjQueFxuU3RyZWFtLlN0cmVhbSA9IFN0cmVhbTtcblxuXG5cbi8vIG9sZC1zdHlsZSBzdHJlYW1zLiAgTm90ZSB0aGF0IHRoZSBwaXBlIG1ldGhvZCAodGhlIG9ubHkgcmVsZXZhbnRcbi8vIHBhcnQgb2YgdGhpcyBjbGFzcykgaXMgb3ZlcnJpZGRlbiBpbiB0aGUgUmVhZGFibGUgY2xhc3MuXG5cbmZ1bmN0aW9uIFN0cmVhbSgpIHtcbiAgRUUuY2FsbCh0aGlzKTtcbn1cblxuU3RyZWFtLnByb3RvdHlwZS5waXBlID0gZnVuY3Rpb24oZGVzdCwgb3B0aW9ucykge1xuICB2YXIgc291cmNlID0gdGhpcztcblxuICBmdW5jdGlvbiBvbmRhdGEoY2h1bmspIHtcbiAgICBpZiAoZGVzdC53cml0YWJsZSkge1xuICAgICAgaWYgKGZhbHNlID09PSBkZXN0LndyaXRlKGNodW5rKSAmJiBzb3VyY2UucGF1c2UpIHtcbiAgICAgICAgc291cmNlLnBhdXNlKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgc291cmNlLm9uKCdkYXRhJywgb25kYXRhKTtcblxuICBmdW5jdGlvbiBvbmRyYWluKCkge1xuICAgIGlmIChzb3VyY2UucmVhZGFibGUgJiYgc291cmNlLnJlc3VtZSkge1xuICAgICAgc291cmNlLnJlc3VtZSgpO1xuICAgIH1cbiAgfVxuXG4gIGRlc3Qub24oJ2RyYWluJywgb25kcmFpbik7XG5cbiAgLy8gSWYgdGhlICdlbmQnIG9wdGlvbiBpcyBub3Qgc3VwcGxpZWQsIGRlc3QuZW5kKCkgd2lsbCBiZSBjYWxsZWQgd2hlblxuICAvLyBzb3VyY2UgZ2V0cyB0aGUgJ2VuZCcgb3IgJ2Nsb3NlJyBldmVudHMuICBPbmx5IGRlc3QuZW5kKCkgb25jZS5cbiAgaWYgKCFkZXN0Ll9pc1N0ZGlvICYmICghb3B0aW9ucyB8fCBvcHRpb25zLmVuZCAhPT0gZmFsc2UpKSB7XG4gICAgc291cmNlLm9uKCdlbmQnLCBvbmVuZCk7XG4gICAgc291cmNlLm9uKCdjbG9zZScsIG9uY2xvc2UpO1xuICB9XG5cbiAgdmFyIGRpZE9uRW5kID0gZmFsc2U7XG4gIGZ1bmN0aW9uIG9uZW5kKCkge1xuICAgIGlmIChkaWRPbkVuZCkgcmV0dXJuO1xuICAgIGRpZE9uRW5kID0gdHJ1ZTtcblxuICAgIGRlc3QuZW5kKCk7XG4gIH1cblxuXG4gIGZ1bmN0aW9uIG9uY2xvc2UoKSB7XG4gICAgaWYgKGRpZE9uRW5kKSByZXR1cm47XG4gICAgZGlkT25FbmQgPSB0cnVlO1xuXG4gICAgaWYgKHR5cGVvZiBkZXN0LmRlc3Ryb3kgPT09ICdmdW5jdGlvbicpIGRlc3QuZGVzdHJveSgpO1xuICB9XG5cbiAgLy8gZG9uJ3QgbGVhdmUgZGFuZ2xpbmcgcGlwZXMgd2hlbiB0aGVyZSBhcmUgZXJyb3JzLlxuICBmdW5jdGlvbiBvbmVycm9yKGVyKSB7XG4gICAgY2xlYW51cCgpO1xuICAgIGlmIChFRS5saXN0ZW5lckNvdW50KHRoaXMsICdlcnJvcicpID09PSAwKSB7XG4gICAgICB0aHJvdyBlcjsgLy8gVW5oYW5kbGVkIHN0cmVhbSBlcnJvciBpbiBwaXBlLlxuICAgIH1cbiAgfVxuXG4gIHNvdXJjZS5vbignZXJyb3InLCBvbmVycm9yKTtcbiAgZGVzdC5vbignZXJyb3InLCBvbmVycm9yKTtcblxuICAvLyByZW1vdmUgYWxsIHRoZSBldmVudCBsaXN0ZW5lcnMgdGhhdCB3ZXJlIGFkZGVkLlxuICBmdW5jdGlvbiBjbGVhbnVwKCkge1xuICAgIHNvdXJjZS5yZW1vdmVMaXN0ZW5lcignZGF0YScsIG9uZGF0YSk7XG4gICAgZGVzdC5yZW1vdmVMaXN0ZW5lcignZHJhaW4nLCBvbmRyYWluKTtcblxuICAgIHNvdXJjZS5yZW1vdmVMaXN0ZW5lcignZW5kJywgb25lbmQpO1xuICAgIHNvdXJjZS5yZW1vdmVMaXN0ZW5lcignY2xvc2UnLCBvbmNsb3NlKTtcblxuICAgIHNvdXJjZS5yZW1vdmVMaXN0ZW5lcignZXJyb3InLCBvbmVycm9yKTtcbiAgICBkZXN0LnJlbW92ZUxpc3RlbmVyKCdlcnJvcicsIG9uZXJyb3IpO1xuXG4gICAgc291cmNlLnJlbW92ZUxpc3RlbmVyKCdlbmQnLCBjbGVhbnVwKTtcbiAgICBzb3VyY2UucmVtb3ZlTGlzdGVuZXIoJ2Nsb3NlJywgY2xlYW51cCk7XG5cbiAgICBkZXN0LnJlbW92ZUxpc3RlbmVyKCdjbG9zZScsIGNsZWFudXApO1xuICB9XG5cbiAgc291cmNlLm9uKCdlbmQnLCBjbGVhbnVwKTtcbiAgc291cmNlLm9uKCdjbG9zZScsIGNsZWFudXApO1xuXG4gIGRlc3Qub24oJ2Nsb3NlJywgY2xlYW51cCk7XG5cbiAgZGVzdC5lbWl0KCdwaXBlJywgc291cmNlKTtcblxuICAvLyBBbGxvdyBmb3IgdW5peC1saWtlIHVzYWdlOiBBLnBpcGUoQikucGlwZShDKVxuICByZXR1cm4gZGVzdDtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBCdWZmZXIgPSByZXF1aXJlKCdzYWZlLWJ1ZmZlcicpLkJ1ZmZlcjtcblxudmFyIGlzRW5jb2RpbmcgPSBCdWZmZXIuaXNFbmNvZGluZyB8fCBmdW5jdGlvbiAoZW5jb2RpbmcpIHtcbiAgZW5jb2RpbmcgPSAnJyArIGVuY29kaW5nO1xuICBzd2l0Y2ggKGVuY29kaW5nICYmIGVuY29kaW5nLnRvTG93ZXJDYXNlKCkpIHtcbiAgICBjYXNlICdoZXgnOmNhc2UgJ3V0ZjgnOmNhc2UgJ3V0Zi04JzpjYXNlICdhc2NpaSc6Y2FzZSAnYmluYXJ5JzpjYXNlICdiYXNlNjQnOmNhc2UgJ3VjczInOmNhc2UgJ3Vjcy0yJzpjYXNlICd1dGYxNmxlJzpjYXNlICd1dGYtMTZsZSc6Y2FzZSAncmF3JzpcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn07XG5cbmZ1bmN0aW9uIF9ub3JtYWxpemVFbmNvZGluZyhlbmMpIHtcbiAgaWYgKCFlbmMpIHJldHVybiAndXRmOCc7XG4gIHZhciByZXRyaWVkO1xuICB3aGlsZSAodHJ1ZSkge1xuICAgIHN3aXRjaCAoZW5jKSB7XG4gICAgICBjYXNlICd1dGY4JzpcbiAgICAgIGNhc2UgJ3V0Zi04JzpcbiAgICAgICAgcmV0dXJuICd1dGY4JztcbiAgICAgIGNhc2UgJ3VjczInOlxuICAgICAgY2FzZSAndWNzLTInOlxuICAgICAgY2FzZSAndXRmMTZsZSc6XG4gICAgICBjYXNlICd1dGYtMTZsZSc6XG4gICAgICAgIHJldHVybiAndXRmMTZsZSc7XG4gICAgICBjYXNlICdsYXRpbjEnOlxuICAgICAgY2FzZSAnYmluYXJ5JzpcbiAgICAgICAgcmV0dXJuICdsYXRpbjEnO1xuICAgICAgY2FzZSAnYmFzZTY0JzpcbiAgICAgIGNhc2UgJ2FzY2lpJzpcbiAgICAgIGNhc2UgJ2hleCc6XG4gICAgICAgIHJldHVybiBlbmM7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBpZiAocmV0cmllZCkgcmV0dXJuOyAvLyB1bmRlZmluZWRcbiAgICAgICAgZW5jID0gKCcnICsgZW5jKS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICByZXRyaWVkID0gdHJ1ZTtcbiAgICB9XG4gIH1cbn07XG5cbi8vIERvIG5vdCBjYWNoZSBgQnVmZmVyLmlzRW5jb2RpbmdgIHdoZW4gY2hlY2tpbmcgZW5jb2RpbmcgbmFtZXMgYXMgc29tZVxuLy8gbW9kdWxlcyBtb25rZXktcGF0Y2ggaXQgdG8gc3VwcG9ydCBhZGRpdGlvbmFsIGVuY29kaW5nc1xuZnVuY3Rpb24gbm9ybWFsaXplRW5jb2RpbmcoZW5jKSB7XG4gIHZhciBuZW5jID0gX25vcm1hbGl6ZUVuY29kaW5nKGVuYyk7XG4gIGlmICh0eXBlb2YgbmVuYyAhPT0gJ3N0cmluZycgJiYgKEJ1ZmZlci5pc0VuY29kaW5nID09PSBpc0VuY29kaW5nIHx8ICFpc0VuY29kaW5nKGVuYykpKSB0aHJvdyBuZXcgRXJyb3IoJ1Vua25vd24gZW5jb2Rpbmc6ICcgKyBlbmMpO1xuICByZXR1cm4gbmVuYyB8fCBlbmM7XG59XG5cbi8vIFN0cmluZ0RlY29kZXIgcHJvdmlkZXMgYW4gaW50ZXJmYWNlIGZvciBlZmZpY2llbnRseSBzcGxpdHRpbmcgYSBzZXJpZXMgb2Zcbi8vIGJ1ZmZlcnMgaW50byBhIHNlcmllcyBvZiBKUyBzdHJpbmdzIHdpdGhvdXQgYnJlYWtpbmcgYXBhcnQgbXVsdGktYnl0ZVxuLy8gY2hhcmFjdGVycy5cbmV4cG9ydHMuU3RyaW5nRGVjb2RlciA9IFN0cmluZ0RlY29kZXI7XG5mdW5jdGlvbiBTdHJpbmdEZWNvZGVyKGVuY29kaW5nKSB7XG4gIHRoaXMuZW5jb2RpbmcgPSBub3JtYWxpemVFbmNvZGluZyhlbmNvZGluZyk7XG4gIHZhciBuYjtcbiAgc3dpdGNoICh0aGlzLmVuY29kaW5nKSB7XG4gICAgY2FzZSAndXRmMTZsZSc6XG4gICAgICB0aGlzLnRleHQgPSB1dGYxNlRleHQ7XG4gICAgICB0aGlzLmVuZCA9IHV0ZjE2RW5kO1xuICAgICAgbmIgPSA0O1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAndXRmOCc6XG4gICAgICB0aGlzLmZpbGxMYXN0ID0gdXRmOEZpbGxMYXN0O1xuICAgICAgbmIgPSA0O1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnYmFzZTY0JzpcbiAgICAgIHRoaXMudGV4dCA9IGJhc2U2NFRleHQ7XG4gICAgICB0aGlzLmVuZCA9IGJhc2U2NEVuZDtcbiAgICAgIG5iID0gMztcbiAgICAgIGJyZWFrO1xuICAgIGRlZmF1bHQ6XG4gICAgICB0aGlzLndyaXRlID0gc2ltcGxlV3JpdGU7XG4gICAgICB0aGlzLmVuZCA9IHNpbXBsZUVuZDtcbiAgICAgIHJldHVybjtcbiAgfVxuICB0aGlzLmxhc3ROZWVkID0gMDtcbiAgdGhpcy5sYXN0VG90YWwgPSAwO1xuICB0aGlzLmxhc3RDaGFyID0gQnVmZmVyLmFsbG9jVW5zYWZlKG5iKTtcbn1cblxuU3RyaW5nRGVjb2Rlci5wcm90b3R5cGUud3JpdGUgPSBmdW5jdGlvbiAoYnVmKSB7XG4gIGlmIChidWYubGVuZ3RoID09PSAwKSByZXR1cm4gJyc7XG4gIHZhciByO1xuICB2YXIgaTtcbiAgaWYgKHRoaXMubGFzdE5lZWQpIHtcbiAgICByID0gdGhpcy5maWxsTGFzdChidWYpO1xuICAgIGlmIChyID09PSB1bmRlZmluZWQpIHJldHVybiAnJztcbiAgICBpID0gdGhpcy5sYXN0TmVlZDtcbiAgICB0aGlzLmxhc3ROZWVkID0gMDtcbiAgfSBlbHNlIHtcbiAgICBpID0gMDtcbiAgfVxuICBpZiAoaSA8IGJ1Zi5sZW5ndGgpIHJldHVybiByID8gciArIHRoaXMudGV4dChidWYsIGkpIDogdGhpcy50ZXh0KGJ1ZiwgaSk7XG4gIHJldHVybiByIHx8ICcnO1xufTtcblxuU3RyaW5nRGVjb2Rlci5wcm90b3R5cGUuZW5kID0gdXRmOEVuZDtcblxuLy8gUmV0dXJucyBvbmx5IGNvbXBsZXRlIGNoYXJhY3RlcnMgaW4gYSBCdWZmZXJcblN0cmluZ0RlY29kZXIucHJvdG90eXBlLnRleHQgPSB1dGY4VGV4dDtcblxuLy8gQXR0ZW1wdHMgdG8gY29tcGxldGUgYSBwYXJ0aWFsIG5vbi1VVEYtOCBjaGFyYWN0ZXIgdXNpbmcgYnl0ZXMgZnJvbSBhIEJ1ZmZlclxuU3RyaW5nRGVjb2Rlci5wcm90b3R5cGUuZmlsbExhc3QgPSBmdW5jdGlvbiAoYnVmKSB7XG4gIGlmICh0aGlzLmxhc3ROZWVkIDw9IGJ1Zi5sZW5ndGgpIHtcbiAgICBidWYuY29weSh0aGlzLmxhc3RDaGFyLCB0aGlzLmxhc3RUb3RhbCAtIHRoaXMubGFzdE5lZWQsIDAsIHRoaXMubGFzdE5lZWQpO1xuICAgIHJldHVybiB0aGlzLmxhc3RDaGFyLnRvU3RyaW5nKHRoaXMuZW5jb2RpbmcsIDAsIHRoaXMubGFzdFRvdGFsKTtcbiAgfVxuICBidWYuY29weSh0aGlzLmxhc3RDaGFyLCB0aGlzLmxhc3RUb3RhbCAtIHRoaXMubGFzdE5lZWQsIDAsIGJ1Zi5sZW5ndGgpO1xuICB0aGlzLmxhc3ROZWVkIC09IGJ1Zi5sZW5ndGg7XG59O1xuXG4vLyBDaGVja3MgdGhlIHR5cGUgb2YgYSBVVEYtOCBieXRlLCB3aGV0aGVyIGl0J3MgQVNDSUksIGEgbGVhZGluZyBieXRlLCBvciBhXG4vLyBjb250aW51YXRpb24gYnl0ZS5cbmZ1bmN0aW9uIHV0ZjhDaGVja0J5dGUoYnl0ZSkge1xuICBpZiAoYnl0ZSA8PSAweDdGKSByZXR1cm4gMDtlbHNlIGlmIChieXRlID4+IDUgPT09IDB4MDYpIHJldHVybiAyO2Vsc2UgaWYgKGJ5dGUgPj4gNCA9PT0gMHgwRSkgcmV0dXJuIDM7ZWxzZSBpZiAoYnl0ZSA+PiAzID09PSAweDFFKSByZXR1cm4gNDtcbiAgcmV0dXJuIC0xO1xufVxuXG4vLyBDaGVja3MgYXQgbW9zdCAzIGJ5dGVzIGF0IHRoZSBlbmQgb2YgYSBCdWZmZXIgaW4gb3JkZXIgdG8gZGV0ZWN0IGFuXG4vLyBpbmNvbXBsZXRlIG11bHRpLWJ5dGUgVVRGLTggY2hhcmFjdGVyLiBUaGUgdG90YWwgbnVtYmVyIG9mIGJ5dGVzICgyLCAzLCBvciA0KVxuLy8gbmVlZGVkIHRvIGNvbXBsZXRlIHRoZSBVVEYtOCBjaGFyYWN0ZXIgKGlmIGFwcGxpY2FibGUpIGFyZSByZXR1cm5lZC5cbmZ1bmN0aW9uIHV0ZjhDaGVja0luY29tcGxldGUoc2VsZiwgYnVmLCBpKSB7XG4gIHZhciBqID0gYnVmLmxlbmd0aCAtIDE7XG4gIGlmIChqIDwgaSkgcmV0dXJuIDA7XG4gIHZhciBuYiA9IHV0ZjhDaGVja0J5dGUoYnVmW2pdKTtcbiAgaWYgKG5iID49IDApIHtcbiAgICBpZiAobmIgPiAwKSBzZWxmLmxhc3ROZWVkID0gbmIgLSAxO1xuICAgIHJldHVybiBuYjtcbiAgfVxuICBpZiAoLS1qIDwgaSkgcmV0dXJuIDA7XG4gIG5iID0gdXRmOENoZWNrQnl0ZShidWZbal0pO1xuICBpZiAobmIgPj0gMCkge1xuICAgIGlmIChuYiA+IDApIHNlbGYubGFzdE5lZWQgPSBuYiAtIDI7XG4gICAgcmV0dXJuIG5iO1xuICB9XG4gIGlmICgtLWogPCBpKSByZXR1cm4gMDtcbiAgbmIgPSB1dGY4Q2hlY2tCeXRlKGJ1ZltqXSk7XG4gIGlmIChuYiA+PSAwKSB7XG4gICAgaWYgKG5iID4gMCkge1xuICAgICAgaWYgKG5iID09PSAyKSBuYiA9IDA7ZWxzZSBzZWxmLmxhc3ROZWVkID0gbmIgLSAzO1xuICAgIH1cbiAgICByZXR1cm4gbmI7XG4gIH1cbiAgcmV0dXJuIDA7XG59XG5cbi8vIFZhbGlkYXRlcyBhcyBtYW55IGNvbnRpbnVhdGlvbiBieXRlcyBmb3IgYSBtdWx0aS1ieXRlIFVURi04IGNoYXJhY3RlciBhc1xuLy8gbmVlZGVkIG9yIGFyZSBhdmFpbGFibGUuIElmIHdlIHNlZSBhIG5vbi1jb250aW51YXRpb24gYnl0ZSB3aGVyZSB3ZSBleHBlY3Rcbi8vIG9uZSwgd2UgXCJyZXBsYWNlXCIgdGhlIHZhbGlkYXRlZCBjb250aW51YXRpb24gYnl0ZXMgd2UndmUgc2VlbiBzbyBmYXIgd2l0aFxuLy8gVVRGLTggcmVwbGFjZW1lbnQgY2hhcmFjdGVycyAoJ1xcdWZmZmQnKSwgdG8gbWF0Y2ggdjgncyBVVEYtOCBkZWNvZGluZ1xuLy8gYmVoYXZpb3IuIFRoZSBjb250aW51YXRpb24gYnl0ZSBjaGVjayBpcyBpbmNsdWRlZCB0aHJlZSB0aW1lcyBpbiB0aGUgY2FzZVxuLy8gd2hlcmUgYWxsIG9mIHRoZSBjb250aW51YXRpb24gYnl0ZXMgZm9yIGEgY2hhcmFjdGVyIGV4aXN0IGluIHRoZSBzYW1lIGJ1ZmZlci5cbi8vIEl0IGlzIGFsc28gZG9uZSB0aGlzIHdheSBhcyBhIHNsaWdodCBwZXJmb3JtYW5jZSBpbmNyZWFzZSBpbnN0ZWFkIG9mIHVzaW5nIGFcbi8vIGxvb3AuXG5mdW5jdGlvbiB1dGY4Q2hlY2tFeHRyYUJ5dGVzKHNlbGYsIGJ1ZiwgcCkge1xuICBpZiAoKGJ1ZlswXSAmIDB4QzApICE9PSAweDgwKSB7XG4gICAgc2VsZi5sYXN0TmVlZCA9IDA7XG4gICAgcmV0dXJuICdcXHVmZmZkJy5yZXBlYXQocCk7XG4gIH1cbiAgaWYgKHNlbGYubGFzdE5lZWQgPiAxICYmIGJ1Zi5sZW5ndGggPiAxKSB7XG4gICAgaWYgKChidWZbMV0gJiAweEMwKSAhPT0gMHg4MCkge1xuICAgICAgc2VsZi5sYXN0TmVlZCA9IDE7XG4gICAgICByZXR1cm4gJ1xcdWZmZmQnLnJlcGVhdChwICsgMSk7XG4gICAgfVxuICAgIGlmIChzZWxmLmxhc3ROZWVkID4gMiAmJiBidWYubGVuZ3RoID4gMikge1xuICAgICAgaWYgKChidWZbMl0gJiAweEMwKSAhPT0gMHg4MCkge1xuICAgICAgICBzZWxmLmxhc3ROZWVkID0gMjtcbiAgICAgICAgcmV0dXJuICdcXHVmZmZkJy5yZXBlYXQocCArIDIpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG4vLyBBdHRlbXB0cyB0byBjb21wbGV0ZSBhIG11bHRpLWJ5dGUgVVRGLTggY2hhcmFjdGVyIHVzaW5nIGJ5dGVzIGZyb20gYSBCdWZmZXIuXG5mdW5jdGlvbiB1dGY4RmlsbExhc3QoYnVmKSB7XG4gIHZhciBwID0gdGhpcy5sYXN0VG90YWwgLSB0aGlzLmxhc3ROZWVkO1xuICB2YXIgciA9IHV0ZjhDaGVja0V4dHJhQnl0ZXModGhpcywgYnVmLCBwKTtcbiAgaWYgKHIgIT09IHVuZGVmaW5lZCkgcmV0dXJuIHI7XG4gIGlmICh0aGlzLmxhc3ROZWVkIDw9IGJ1Zi5sZW5ndGgpIHtcbiAgICBidWYuY29weSh0aGlzLmxhc3RDaGFyLCBwLCAwLCB0aGlzLmxhc3ROZWVkKTtcbiAgICByZXR1cm4gdGhpcy5sYXN0Q2hhci50b1N0cmluZyh0aGlzLmVuY29kaW5nLCAwLCB0aGlzLmxhc3RUb3RhbCk7XG4gIH1cbiAgYnVmLmNvcHkodGhpcy5sYXN0Q2hhciwgcCwgMCwgYnVmLmxlbmd0aCk7XG4gIHRoaXMubGFzdE5lZWQgLT0gYnVmLmxlbmd0aDtcbn1cblxuLy8gUmV0dXJucyBhbGwgY29tcGxldGUgVVRGLTggY2hhcmFjdGVycyBpbiBhIEJ1ZmZlci4gSWYgdGhlIEJ1ZmZlciBlbmRlZCBvbiBhXG4vLyBwYXJ0aWFsIGNoYXJhY3RlciwgdGhlIGNoYXJhY3RlcidzIGJ5dGVzIGFyZSBidWZmZXJlZCB1bnRpbCB0aGUgcmVxdWlyZWRcbi8vIG51bWJlciBvZiBieXRlcyBhcmUgYXZhaWxhYmxlLlxuZnVuY3Rpb24gdXRmOFRleHQoYnVmLCBpKSB7XG4gIHZhciB0b3RhbCA9IHV0ZjhDaGVja0luY29tcGxldGUodGhpcywgYnVmLCBpKTtcbiAgaWYgKCF0aGlzLmxhc3ROZWVkKSByZXR1cm4gYnVmLnRvU3RyaW5nKCd1dGY4JywgaSk7XG4gIHRoaXMubGFzdFRvdGFsID0gdG90YWw7XG4gIHZhciBlbmQgPSBidWYubGVuZ3RoIC0gKHRvdGFsIC0gdGhpcy5sYXN0TmVlZCk7XG4gIGJ1Zi5jb3B5KHRoaXMubGFzdENoYXIsIDAsIGVuZCk7XG4gIHJldHVybiBidWYudG9TdHJpbmcoJ3V0ZjgnLCBpLCBlbmQpO1xufVxuXG4vLyBGb3IgVVRGLTgsIGEgcmVwbGFjZW1lbnQgY2hhcmFjdGVyIGZvciBlYWNoIGJ1ZmZlcmVkIGJ5dGUgb2YgYSAocGFydGlhbClcbi8vIGNoYXJhY3RlciBuZWVkcyB0byBiZSBhZGRlZCB0byB0aGUgb3V0cHV0LlxuZnVuY3Rpb24gdXRmOEVuZChidWYpIHtcbiAgdmFyIHIgPSBidWYgJiYgYnVmLmxlbmd0aCA/IHRoaXMud3JpdGUoYnVmKSA6ICcnO1xuICBpZiAodGhpcy5sYXN0TmVlZCkgcmV0dXJuIHIgKyAnXFx1ZmZmZCcucmVwZWF0KHRoaXMubGFzdFRvdGFsIC0gdGhpcy5sYXN0TmVlZCk7XG4gIHJldHVybiByO1xufVxuXG4vLyBVVEYtMTZMRSB0eXBpY2FsbHkgbmVlZHMgdHdvIGJ5dGVzIHBlciBjaGFyYWN0ZXIsIGJ1dCBldmVuIGlmIHdlIGhhdmUgYW4gZXZlblxuLy8gbnVtYmVyIG9mIGJ5dGVzIGF2YWlsYWJsZSwgd2UgbmVlZCB0byBjaGVjayBpZiB3ZSBlbmQgb24gYSBsZWFkaW5nL2hpZ2hcbi8vIHN1cnJvZ2F0ZS4gSW4gdGhhdCBjYXNlLCB3ZSBuZWVkIHRvIHdhaXQgZm9yIHRoZSBuZXh0IHR3byBieXRlcyBpbiBvcmRlciB0b1xuLy8gZGVjb2RlIHRoZSBsYXN0IGNoYXJhY3RlciBwcm9wZXJseS5cbmZ1bmN0aW9uIHV0ZjE2VGV4dChidWYsIGkpIHtcbiAgaWYgKChidWYubGVuZ3RoIC0gaSkgJSAyID09PSAwKSB7XG4gICAgdmFyIHIgPSBidWYudG9TdHJpbmcoJ3V0ZjE2bGUnLCBpKTtcbiAgICBpZiAocikge1xuICAgICAgdmFyIGMgPSByLmNoYXJDb2RlQXQoci5sZW5ndGggLSAxKTtcbiAgICAgIGlmIChjID49IDB4RDgwMCAmJiBjIDw9IDB4REJGRikge1xuICAgICAgICB0aGlzLmxhc3ROZWVkID0gMjtcbiAgICAgICAgdGhpcy5sYXN0VG90YWwgPSA0O1xuICAgICAgICB0aGlzLmxhc3RDaGFyWzBdID0gYnVmW2J1Zi5sZW5ndGggLSAyXTtcbiAgICAgICAgdGhpcy5sYXN0Q2hhclsxXSA9IGJ1ZltidWYubGVuZ3RoIC0gMV07XG4gICAgICAgIHJldHVybiByLnNsaWNlKDAsIC0xKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHI7XG4gIH1cbiAgdGhpcy5sYXN0TmVlZCA9IDE7XG4gIHRoaXMubGFzdFRvdGFsID0gMjtcbiAgdGhpcy5sYXN0Q2hhclswXSA9IGJ1ZltidWYubGVuZ3RoIC0gMV07XG4gIHJldHVybiBidWYudG9TdHJpbmcoJ3V0ZjE2bGUnLCBpLCBidWYubGVuZ3RoIC0gMSk7XG59XG5cbi8vIEZvciBVVEYtMTZMRSB3ZSBkbyBub3QgZXhwbGljaXRseSBhcHBlbmQgc3BlY2lhbCByZXBsYWNlbWVudCBjaGFyYWN0ZXJzIGlmIHdlXG4vLyBlbmQgb24gYSBwYXJ0aWFsIGNoYXJhY3Rlciwgd2Ugc2ltcGx5IGxldCB2OCBoYW5kbGUgdGhhdC5cbmZ1bmN0aW9uIHV0ZjE2RW5kKGJ1Zikge1xuICB2YXIgciA9IGJ1ZiAmJiBidWYubGVuZ3RoID8gdGhpcy53cml0ZShidWYpIDogJyc7XG4gIGlmICh0aGlzLmxhc3ROZWVkKSB7XG4gICAgdmFyIGVuZCA9IHRoaXMubGFzdFRvdGFsIC0gdGhpcy5sYXN0TmVlZDtcbiAgICByZXR1cm4gciArIHRoaXMubGFzdENoYXIudG9TdHJpbmcoJ3V0ZjE2bGUnLCAwLCBlbmQpO1xuICB9XG4gIHJldHVybiByO1xufVxuXG5mdW5jdGlvbiBiYXNlNjRUZXh0KGJ1ZiwgaSkge1xuICB2YXIgbiA9IChidWYubGVuZ3RoIC0gaSkgJSAzO1xuICBpZiAobiA9PT0gMCkgcmV0dXJuIGJ1Zi50b1N0cmluZygnYmFzZTY0JywgaSk7XG4gIHRoaXMubGFzdE5lZWQgPSAzIC0gbjtcbiAgdGhpcy5sYXN0VG90YWwgPSAzO1xuICBpZiAobiA9PT0gMSkge1xuICAgIHRoaXMubGFzdENoYXJbMF0gPSBidWZbYnVmLmxlbmd0aCAtIDFdO1xuICB9IGVsc2Uge1xuICAgIHRoaXMubGFzdENoYXJbMF0gPSBidWZbYnVmLmxlbmd0aCAtIDJdO1xuICAgIHRoaXMubGFzdENoYXJbMV0gPSBidWZbYnVmLmxlbmd0aCAtIDFdO1xuICB9XG4gIHJldHVybiBidWYudG9TdHJpbmcoJ2Jhc2U2NCcsIGksIGJ1Zi5sZW5ndGggLSBuKTtcbn1cblxuZnVuY3Rpb24gYmFzZTY0RW5kKGJ1Zikge1xuICB2YXIgciA9IGJ1ZiAmJiBidWYubGVuZ3RoID8gdGhpcy53cml0ZShidWYpIDogJyc7XG4gIGlmICh0aGlzLmxhc3ROZWVkKSByZXR1cm4gciArIHRoaXMubGFzdENoYXIudG9TdHJpbmcoJ2Jhc2U2NCcsIDAsIDMgLSB0aGlzLmxhc3ROZWVkKTtcbiAgcmV0dXJuIHI7XG59XG5cbi8vIFBhc3MgYnl0ZXMgb24gdGhyb3VnaCBmb3Igc2luZ2xlLWJ5dGUgZW5jb2RpbmdzIChlLmcuIGFzY2lpLCBsYXRpbjEsIGhleClcbmZ1bmN0aW9uIHNpbXBsZVdyaXRlKGJ1Zikge1xuICByZXR1cm4gYnVmLnRvU3RyaW5nKHRoaXMuZW5jb2RpbmcpO1xufVxuXG5mdW5jdGlvbiBzaW1wbGVFbmQoYnVmKSB7XG4gIHJldHVybiBidWYgJiYgYnVmLmxlbmd0aCA/IHRoaXMud3JpdGUoYnVmKSA6ICcnO1xufSIsIlxuLyoqXG4gKiBNb2R1bGUgZXhwb3J0cy5cbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGRlcHJlY2F0ZTtcblxuLyoqXG4gKiBNYXJrIHRoYXQgYSBtZXRob2Qgc2hvdWxkIG5vdCBiZSB1c2VkLlxuICogUmV0dXJucyBhIG1vZGlmaWVkIGZ1bmN0aW9uIHdoaWNoIHdhcm5zIG9uY2UgYnkgZGVmYXVsdC5cbiAqXG4gKiBJZiBgbG9jYWxTdG9yYWdlLm5vRGVwcmVjYXRpb24gPSB0cnVlYCBpcyBzZXQsIHRoZW4gaXQgaXMgYSBuby1vcC5cbiAqXG4gKiBJZiBgbG9jYWxTdG9yYWdlLnRocm93RGVwcmVjYXRpb24gPSB0cnVlYCBpcyBzZXQsIHRoZW4gZGVwcmVjYXRlZCBmdW5jdGlvbnNcbiAqIHdpbGwgdGhyb3cgYW4gRXJyb3Igd2hlbiBpbnZva2VkLlxuICpcbiAqIElmIGBsb2NhbFN0b3JhZ2UudHJhY2VEZXByZWNhdGlvbiA9IHRydWVgIGlzIHNldCwgdGhlbiBkZXByZWNhdGVkIGZ1bmN0aW9uc1xuICogd2lsbCBpbnZva2UgYGNvbnNvbGUudHJhY2UoKWAgaW5zdGVhZCBvZiBgY29uc29sZS5lcnJvcigpYC5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiAtIHRoZSBmdW5jdGlvbiB0byBkZXByZWNhdGVcbiAqIEBwYXJhbSB7U3RyaW5nfSBtc2cgLSB0aGUgc3RyaW5nIHRvIHByaW50IHRvIHRoZSBjb25zb2xlIHdoZW4gYGZuYCBpcyBpbnZva2VkXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IGEgbmV3IFwiZGVwcmVjYXRlZFwiIHZlcnNpb24gb2YgYGZuYFxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBkZXByZWNhdGUgKGZuLCBtc2cpIHtcbiAgaWYgKGNvbmZpZygnbm9EZXByZWNhdGlvbicpKSB7XG4gICAgcmV0dXJuIGZuO1xuICB9XG5cbiAgdmFyIHdhcm5lZCA9IGZhbHNlO1xuICBmdW5jdGlvbiBkZXByZWNhdGVkKCkge1xuICAgIGlmICghd2FybmVkKSB7XG4gICAgICBpZiAoY29uZmlnKCd0aHJvd0RlcHJlY2F0aW9uJykpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKG1zZyk7XG4gICAgICB9IGVsc2UgaWYgKGNvbmZpZygndHJhY2VEZXByZWNhdGlvbicpKSB7XG4gICAgICAgIGNvbnNvbGUudHJhY2UobXNnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnNvbGUud2Fybihtc2cpO1xuICAgICAgfVxuICAgICAgd2FybmVkID0gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gIH1cblxuICByZXR1cm4gZGVwcmVjYXRlZDtcbn1cblxuLyoqXG4gKiBDaGVja3MgYGxvY2FsU3RvcmFnZWAgZm9yIGJvb2xlYW4gdmFsdWVzIGZvciB0aGUgZ2l2ZW4gYG5hbWVgLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lXG4gKiBAcmV0dXJucyB7Qm9vbGVhbn1cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIGNvbmZpZyAobmFtZSkge1xuICAvLyBhY2Nlc3NpbmcgZ2xvYmFsLmxvY2FsU3RvcmFnZSBjYW4gdHJpZ2dlciBhIERPTUV4Y2VwdGlvbiBpbiBzYW5kYm94ZWQgaWZyYW1lc1xuICB0cnkge1xuICAgIGlmICghZ2xvYmFsLmxvY2FsU3RvcmFnZSkgcmV0dXJuIGZhbHNlO1xuICB9IGNhdGNoIChfKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHZhciB2YWwgPSBnbG9iYWwubG9jYWxTdG9yYWdlW25hbWVdO1xuICBpZiAobnVsbCA9PSB2YWwpIHJldHVybiBmYWxzZTtcbiAgcmV0dXJuIFN0cmluZyh2YWwpLnRvTG93ZXJDYXNlKCkgPT09ICd0cnVlJztcbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gZXh0ZW5kXG5cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG5cbmZ1bmN0aW9uIGV4dGVuZCgpIHtcbiAgICB2YXIgdGFyZ2V0ID0ge31cblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV1cblxuICAgICAgICBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7XG4gICAgICAgICAgICBpZiAoaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHtcbiAgICAgICAgICAgICAgICB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdGFyZ2V0XG59XG4iXX0=
