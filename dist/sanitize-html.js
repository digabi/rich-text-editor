(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.I = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{"htmlparser2":undefined,"regexp-quote":undefined,"xtend":undefined}]},{},[1])(1)
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvc2FuaXRpemUtaHRtbC9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUEsSUFBSSxhQUFhLFFBQVEsYUFBUixDQUFqQjtBQUNBLElBQUksU0FBUyxRQUFRLE9BQVIsQ0FBYjtBQUNBLElBQUksY0FBYyxRQUFRLGNBQVIsQ0FBbEI7O0FBRUEsU0FBUyxJQUFULENBQWMsR0FBZCxFQUFtQixFQUFuQixFQUF1QjtBQUNyQixNQUFJLEdBQUosRUFBUyxPQUFPLElBQVAsQ0FBWSxHQUFaLEVBQWlCLE9BQWpCLENBQXlCLFVBQVUsR0FBVixFQUFlO0FBQy9DLE9BQUcsSUFBSSxHQUFKLENBQUgsRUFBYSxHQUFiO0FBQ0QsR0FGUTtBQUdWOztBQUVEO0FBQ0EsU0FBUyxHQUFULENBQWEsR0FBYixFQUFrQixHQUFsQixFQUF1QjtBQUNyQixTQUFRLEVBQUQsQ0FBSyxjQUFMLENBQW9CLElBQXBCLENBQXlCLEdBQXpCLEVBQThCLEdBQTlCLENBQVA7QUFDRDs7QUFFRCxPQUFPLE9BQVAsR0FBaUIsWUFBakI7O0FBRUE7QUFDQTtBQUNBOztBQUVBLFNBQVMsWUFBVCxDQUFzQixJQUF0QixFQUE0QixPQUE1QixFQUFxQyxVQUFyQyxFQUFpRDtBQUMvQyxNQUFJLFNBQVMsRUFBYjs7QUFFQSxXQUFTLEtBQVQsQ0FBZSxHQUFmLEVBQW9CLE9BQXBCLEVBQTZCO0FBQzNCLFFBQUksT0FBTyxJQUFYO0FBQ0EsU0FBSyxHQUFMLEdBQVcsR0FBWDtBQUNBLFNBQUssT0FBTCxHQUFlLFdBQVcsRUFBMUI7QUFDQSxTQUFLLFdBQUwsR0FBbUIsT0FBTyxNQUExQjtBQUNBLFNBQUssSUFBTCxHQUFZLEVBQVosQ0FMMkIsQ0FLWDs7QUFFaEIsU0FBSyxvQkFBTCxHQUE0QixZQUFXO0FBQ3JDLFVBQUksTUFBTSxNQUFWLEVBQWtCO0FBQ2QsWUFBSSxjQUFjLE1BQU0sTUFBTSxNQUFOLEdBQWUsQ0FBckIsQ0FBbEI7QUFDQSxvQkFBWSxJQUFaLElBQW9CLEtBQUssSUFBekI7QUFDSDtBQUNGLEtBTEQ7QUFNRDs7QUFFRCxNQUFJLENBQUMsT0FBTCxFQUFjO0FBQ1osY0FBVSxhQUFhLFFBQXZCO0FBQ0EsWUFBUSxNQUFSLEdBQWlCLGtCQUFqQjtBQUNELEdBSEQsTUFHTztBQUNMLGNBQVUsT0FBTyxhQUFhLFFBQXBCLEVBQThCLE9BQTlCLENBQVY7QUFDQSxRQUFJLFFBQVEsTUFBWixFQUFvQjtBQUNsQixjQUFRLE1BQVIsR0FBaUIsT0FBTyxrQkFBUCxFQUEyQixRQUFRLE1BQW5DLENBQWpCO0FBQ0QsS0FGRCxNQUVPO0FBQ0wsY0FBUSxNQUFSLEdBQWlCLGtCQUFqQjtBQUNEO0FBQ0Y7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFJLG1CQUFtQixRQUFRLFdBQVIsSUFBdUIsQ0FBRSxRQUFGLEVBQVksT0FBWixFQUFxQixVQUFyQixDQUE5QztBQUNBLE1BQUksb0JBQUo7QUFDQSxNQUFJLHdCQUFKO0FBQ0EsTUFBRyxRQUFRLGlCQUFYLEVBQThCO0FBQzVCLDJCQUF1QixFQUF2QjtBQUNBLCtCQUEyQixFQUEzQjtBQUNBLFNBQUssUUFBUSxpQkFBYixFQUFnQyxVQUFTLFVBQVQsRUFBcUIsR0FBckIsRUFBMEI7QUFDeEQsMkJBQXFCLEdBQXJCLElBQTRCLEVBQTVCO0FBQ0EsVUFBSSxZQUFZLEVBQWhCO0FBQ0EsaUJBQVcsT0FBWCxDQUFtQixVQUFTLElBQVQsRUFBZTtBQUNoQyxZQUFHLEtBQUssT0FBTCxDQUFhLEdBQWIsS0FBcUIsQ0FBeEIsRUFBMkI7QUFDekIsb0JBQVUsSUFBVixDQUFlLFlBQVksSUFBWixFQUFrQixPQUFsQixDQUEwQixPQUExQixFQUFtQyxJQUFuQyxDQUFmO0FBQ0QsU0FGRCxNQUVPO0FBQ0wsK0JBQXFCLEdBQXJCLEVBQTBCLElBQTFCLENBQStCLElBQS9CO0FBQ0Q7QUFDRixPQU5EO0FBT0EsK0JBQXlCLEdBQXpCLElBQWdDLElBQUksTUFBSixDQUFXLE9BQU8sVUFBVSxJQUFWLENBQWUsR0FBZixDQUFQLEdBQTZCLElBQXhDLENBQWhDO0FBQ0QsS0FYRDtBQVlEO0FBQ0QsTUFBSSxvQkFBb0IsRUFBeEI7QUFDQSxPQUFLLFFBQVEsY0FBYixFQUE2QixVQUFTLE9BQVQsRUFBa0IsR0FBbEIsRUFBdUI7QUFDbEQ7QUFDQSxRQUFHLG9CQUFILEVBQXlCO0FBQ3ZCLFVBQUksQ0FBQyxJQUFJLG9CQUFKLEVBQTBCLEdBQTFCLENBQUwsRUFBcUM7QUFDbkMsNkJBQXFCLEdBQXJCLElBQTRCLEVBQTVCO0FBQ0Q7QUFDRCwyQkFBcUIsR0FBckIsRUFBMEIsSUFBMUIsQ0FBK0IsT0FBL0I7QUFDRDs7QUFFRCxzQkFBa0IsR0FBbEIsSUFBeUIsT0FBekI7QUFDRCxHQVZEOztBQVlBLE1BQUksbUJBQW1CLEVBQXZCO0FBQ0EsTUFBSSxnQkFBSjtBQUNBLE9BQUssUUFBUSxhQUFiLEVBQTRCLFVBQVMsU0FBVCxFQUFvQixHQUFwQixFQUF5QjtBQUNuRCxRQUFJLFFBQUo7QUFDQSxRQUFJLE9BQU8sU0FBUCxLQUFxQixVQUF6QixFQUFxQztBQUNuQyxpQkFBVyxTQUFYO0FBQ0QsS0FGRCxNQUVPLElBQUksT0FBTyxTQUFQLEtBQXFCLFFBQXpCLEVBQW1DO0FBQ3hDLGlCQUFXLGFBQWEsZUFBYixDQUE2QixTQUE3QixDQUFYO0FBQ0Q7QUFDRCxRQUFJLFFBQVEsR0FBWixFQUFpQjtBQUNmLHlCQUFtQixRQUFuQjtBQUNELEtBRkQsTUFFTztBQUNMLHVCQUFpQixHQUFqQixJQUF3QixRQUF4QjtBQUNEO0FBQ0YsR0FaRDs7QUFjQSxNQUFJLFFBQVEsQ0FBWjtBQUNBLE1BQUksUUFBUSxFQUFaO0FBQ0EsTUFBSSxVQUFVLEVBQWQ7QUFDQSxNQUFJLGVBQWUsRUFBbkI7QUFDQSxNQUFJLFdBQVcsS0FBZjtBQUNBLE1BQUksZ0JBQWdCLENBQXBCOztBQUVBLE1BQUksU0FBUyxJQUFJLFdBQVcsTUFBZixDQUFzQjtBQUNqQyxlQUFXLG1CQUFTLElBQVQsRUFBZSxPQUFmLEVBQXdCO0FBQ2pDLFVBQUksUUFBSixFQUFjO0FBQ1o7QUFDQTtBQUNEO0FBQ0QsVUFBSSxRQUFRLElBQUksS0FBSixDQUFVLElBQVYsRUFBZ0IsT0FBaEIsQ0FBWjtBQUNBLFlBQU0sSUFBTixDQUFXLEtBQVg7O0FBRUEsVUFBSSxPQUFPLEtBQVg7QUFDQSxVQUFJLFVBQVUsTUFBTSxJQUFOLEdBQWEsSUFBYixHQUFvQixLQUFsQztBQUNBLFVBQUksY0FBSjtBQUNBLFVBQUksSUFBSSxnQkFBSixFQUFzQixJQUF0QixDQUFKLEVBQWlDO0FBQy9CLHlCQUFpQixpQkFBaUIsSUFBakIsRUFBdUIsSUFBdkIsRUFBNkIsT0FBN0IsQ0FBakI7O0FBRUEsY0FBTSxPQUFOLEdBQWdCLFVBQVUsZUFBZSxPQUF6Qzs7QUFFQSxZQUFJLGVBQWUsSUFBZixLQUF3QixTQUE1QixFQUF1QztBQUNyQyxnQkFBTSxTQUFOLEdBQWtCLGVBQWUsSUFBakM7QUFDRDs7QUFFRCxZQUFJLFNBQVMsZUFBZSxPQUE1QixFQUFxQztBQUNuQyxnQkFBTSxJQUFOLEdBQWEsT0FBTyxlQUFlLE9BQW5DO0FBQ0EsdUJBQWEsS0FBYixJQUFzQixlQUFlLE9BQXJDO0FBQ0Q7QUFDRjtBQUNELFVBQUksZ0JBQUosRUFBc0I7QUFDcEIseUJBQWlCLGlCQUFpQixJQUFqQixFQUF1QixPQUF2QixDQUFqQjs7QUFFQSxjQUFNLE9BQU4sR0FBZ0IsVUFBVSxlQUFlLE9BQXpDO0FBQ0EsWUFBSSxTQUFTLGVBQWUsT0FBNUIsRUFBcUM7QUFDbkMsZ0JBQU0sSUFBTixHQUFhLE9BQU8sZUFBZSxPQUFuQztBQUNBLHVCQUFhLEtBQWIsSUFBc0IsZUFBZSxPQUFyQztBQUNEO0FBQ0Y7O0FBRUQsVUFBSSxRQUFRLFdBQVIsSUFBdUIsUUFBUSxXQUFSLENBQW9CLE9BQXBCLENBQTRCLElBQTVCLE1BQXNDLENBQUMsQ0FBbEUsRUFBcUU7QUFDbkUsZUFBTyxJQUFQO0FBQ0EsWUFBSSxpQkFBaUIsT0FBakIsQ0FBeUIsSUFBekIsTUFBbUMsQ0FBQyxDQUF4QyxFQUEyQztBQUN6QyxxQkFBVyxJQUFYO0FBQ0EsMEJBQWdCLENBQWhCO0FBQ0Q7QUFDRCxnQkFBUSxLQUFSLElBQWlCLElBQWpCO0FBQ0Q7QUFDRDtBQUNBLFVBQUksSUFBSixFQUFVO0FBQ1I7QUFDQTtBQUNEO0FBQ0QsZ0JBQVUsTUFBTSxJQUFoQjtBQUNBLFVBQUksQ0FBQyxvQkFBRCxJQUF5QixJQUFJLG9CQUFKLEVBQTBCLElBQTFCLENBQXpCLElBQTRELHFCQUFxQixHQUFyQixDQUFoRSxFQUEyRjtBQUN6RixhQUFLLE9BQUwsRUFBYyxVQUFTLEtBQVQsRUFBZ0IsQ0FBaEIsRUFBbUI7QUFDL0IsY0FBSSxDQUFDLG9CQUFELElBQ0MsSUFBSSxvQkFBSixFQUEwQixJQUExQixLQUFtQyxxQkFBcUIsSUFBckIsRUFBMkIsT0FBM0IsQ0FBbUMsQ0FBbkMsTUFBMEMsQ0FBQyxDQUQvRSxJQUVDLHFCQUFxQixHQUFyQixLQUE2QixxQkFBcUIsR0FBckIsRUFBMEIsT0FBMUIsQ0FBa0MsQ0FBbEMsTUFBeUMsQ0FBQyxDQUZ4RSxJQUdDLElBQUksd0JBQUosRUFBOEIsSUFBOUIsS0FBdUMseUJBQXlCLElBQXpCLEVBQStCLElBQS9CLENBQW9DLENBQXBDLENBSHhDLElBSUMseUJBQXlCLEdBQXpCLEtBQWlDLHlCQUF5QixHQUF6QixFQUE4QixJQUE5QixDQUFtQyxDQUFuQyxDQUp0QyxFQUk4RTtBQUM1RSxnQkFBSyxNQUFNLE1BQVAsSUFBbUIsTUFBTSxLQUE3QixFQUFxQztBQUNuQyxrQkFBSSxZQUFZLElBQVosRUFBa0IsS0FBbEIsQ0FBSixFQUE4QjtBQUM1Qix1QkFBTyxNQUFNLE9BQU4sQ0FBYyxDQUFkLENBQVA7QUFDQTtBQUNEO0FBQ0Y7QUFDRCxnQkFBSSxNQUFNLE9BQVYsRUFBbUI7QUFDakIsc0JBQVEsY0FBYyxLQUFkLEVBQXFCLGtCQUFrQixJQUFsQixDQUFyQixDQUFSO0FBQ0Esa0JBQUksQ0FBQyxNQUFNLE1BQVgsRUFBbUI7QUFDakIsdUJBQU8sTUFBTSxPQUFOLENBQWMsQ0FBZCxDQUFQO0FBQ0E7QUFDRDtBQUNGO0FBQ0Qsc0JBQVUsTUFBTSxDQUFoQjtBQUNBLGdCQUFJLE1BQU0sTUFBVixFQUFrQjtBQUNoQix3QkFBVSxPQUFPLFdBQVcsS0FBWCxDQUFQLEdBQTJCLEdBQXJDO0FBQ0Q7QUFDRixXQXRCRCxNQXNCTztBQUNMLG1CQUFPLE1BQU0sT0FBTixDQUFjLENBQWQsQ0FBUDtBQUNEO0FBQ0YsU0ExQkQ7QUEyQkQ7QUFDRCxVQUFJLFFBQVEsV0FBUixDQUFvQixPQUFwQixDQUE0QixJQUE1QixNQUFzQyxDQUFDLENBQTNDLEVBQThDO0FBQzVDLGtCQUFVLEtBQVY7QUFDRCxPQUZELE1BRU87QUFDTCxrQkFBVSxHQUFWO0FBQ0EsWUFBSSxNQUFNLFNBQU4sSUFBbUIsQ0FBQyxPQUFwQixJQUErQixDQUFDLFFBQVEsVUFBNUMsRUFBd0Q7QUFDdEQsb0JBQVUsTUFBTSxTQUFoQjtBQUNEO0FBQ0Y7QUFDRixLQXZGZ0M7QUF3RmpDLFlBQVEsZ0JBQVMsSUFBVCxFQUFlO0FBQ3JCLFVBQUksUUFBSixFQUFjO0FBQ1o7QUFDRDtBQUNELFVBQUksWUFBWSxNQUFNLE1BQU0sTUFBTixHQUFhLENBQW5CLENBQWhCO0FBQ0EsVUFBSSxHQUFKOztBQUVBLFVBQUksU0FBSixFQUFlO0FBQ2IsY0FBTSxVQUFVLEdBQWhCO0FBQ0E7QUFDQSxlQUFPLFVBQVUsU0FBVixLQUF3QixTQUF4QixHQUFvQyxVQUFVLFNBQTlDLEdBQTBELElBQWpFO0FBQ0Q7O0FBRUQsVUFBSyxRQUFRLFFBQVQsSUFBdUIsUUFBUSxPQUFuQyxFQUE2QztBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFVLElBQVY7QUFDRCxPQU5ELE1BTU87QUFDTCxZQUFJLFVBQVUsV0FBVyxJQUFYLENBQWQ7QUFDQSxZQUFJLFFBQVEsVUFBWixFQUF3QjtBQUN0QixvQkFBVSxRQUFRLFVBQVIsQ0FBbUIsT0FBbkIsQ0FBVjtBQUNELFNBRkQsTUFFTztBQUNMLG9CQUFVLE9BQVY7QUFDRDtBQUNGO0FBQ0QsVUFBSSxNQUFNLE1BQVYsRUFBa0I7QUFDYixZQUFJLFFBQVEsTUFBTSxNQUFNLE1BQU4sR0FBZSxDQUFyQixDQUFaO0FBQ0EsY0FBTSxJQUFOLElBQWMsSUFBZDtBQUNKO0FBQ0YsS0F2SGdDO0FBd0hqQyxnQkFBWSxvQkFBUyxJQUFULEVBQWU7O0FBRXpCLFVBQUksUUFBSixFQUFjO0FBQ1o7QUFDQSxZQUFJLENBQUMsYUFBTCxFQUFvQjtBQUNsQixxQkFBVyxLQUFYO0FBQ0QsU0FGRCxNQUVPO0FBQ0w7QUFDRDtBQUNGOztBQUVELFVBQUksUUFBUSxNQUFNLEdBQU4sRUFBWjtBQUNBLFVBQUksQ0FBQyxLQUFMLEVBQVk7QUFDVjtBQUNBO0FBQ0Q7QUFDRCxpQkFBVyxLQUFYO0FBQ0E7QUFDQSxVQUFJLFFBQVEsS0FBUixDQUFKLEVBQW9CO0FBQ2xCLGVBQU8sUUFBUSxLQUFSLENBQVA7QUFDQSxjQUFNLG9CQUFOO0FBQ0E7QUFDRDs7QUFFRCxVQUFJLGFBQWEsS0FBYixDQUFKLEVBQXlCO0FBQ3ZCLGVBQU8sYUFBYSxLQUFiLENBQVA7QUFDQSxlQUFPLGFBQWEsS0FBYixDQUFQO0FBQ0Q7O0FBRUQsVUFBSSxRQUFRLGVBQVIsSUFBMkIsUUFBUSxlQUFSLENBQXdCLEtBQXhCLENBQS9CLEVBQStEO0FBQzVELGlCQUFTLE9BQU8sTUFBUCxDQUFjLENBQWQsRUFBaUIsTUFBTSxXQUF2QixDQUFUO0FBQ0E7QUFDRjs7QUFFRCxZQUFNLG9CQUFOOztBQUVBLFVBQUksUUFBUSxXQUFSLENBQW9CLE9BQXBCLENBQTRCLElBQTVCLE1BQXNDLENBQUMsQ0FBM0MsRUFBOEM7QUFDM0M7QUFDQTtBQUNGOztBQUVELGdCQUFVLE9BQU8sSUFBUCxHQUFjLEdBQXhCO0FBQ0Q7QUFsS2dDLEdBQXRCLEVBbUtWLFFBQVEsTUFuS0UsQ0FBYjtBQW9LQSxTQUFPLEtBQVAsQ0FBYSxJQUFiO0FBQ0EsU0FBTyxHQUFQOztBQUVBLFNBQU8sTUFBUDs7QUFFQSxXQUFTLFVBQVQsQ0FBb0IsQ0FBcEIsRUFBdUI7QUFDckIsUUFBSSxPQUFPLENBQVAsS0FBYyxRQUFsQixFQUE0QjtBQUMxQixVQUFJLElBQUksRUFBUjtBQUNEO0FBQ0QsV0FBTyxFQUFFLE9BQUYsQ0FBVSxLQUFWLEVBQWlCLE9BQWpCLEVBQTBCLE9BQTFCLENBQWtDLElBQWxDLEVBQXdDLE1BQXhDLEVBQWdELE9BQWhELENBQXdELEtBQXhELEVBQStELE1BQS9ELEVBQXVFLE9BQXZFLENBQStFLEtBQS9FLEVBQXNGLFFBQXRGLENBQVA7QUFDRDs7QUFFRCxXQUFTLFdBQVQsQ0FBcUIsSUFBckIsRUFBMkIsSUFBM0IsRUFBaUM7QUFDL0I7QUFDQTtBQUNBO0FBQ0EsV0FBTyxLQUFLLE9BQUwsQ0FBYSxlQUFiLEVBQThCLEVBQTlCLENBQVA7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFPLEtBQUssT0FBTCxDQUFhLG1CQUFiLEVBQWtDLEVBQWxDLENBQVA7QUFDQTtBQUNBLFFBQUksVUFBVSxLQUFLLEtBQUwsQ0FBVyxnQkFBWCxDQUFkO0FBQ0EsUUFBSSxDQUFDLE9BQUwsRUFBYztBQUNaO0FBQ0EsVUFBSSxLQUFLLEtBQUwsQ0FBVyxPQUFYLENBQUosRUFBeUI7QUFDdkIsZUFBTyxDQUFDLFFBQVEscUJBQWhCO0FBQ0Q7O0FBRUQ7QUFDQSxhQUFPLEtBQVA7QUFDRDtBQUNELFFBQUksU0FBUyxRQUFRLENBQVIsRUFBVyxXQUFYLEVBQWI7O0FBRUEsUUFBSSxJQUFJLFFBQVEsbUJBQVosRUFBaUMsSUFBakMsQ0FBSixFQUE0QztBQUMxQyxhQUFPLFFBQVEsbUJBQVIsQ0FBNEIsSUFBNUIsRUFBa0MsT0FBbEMsQ0FBMEMsTUFBMUMsTUFBc0QsQ0FBQyxDQUE5RDtBQUNEOztBQUVELFdBQU8sQ0FBQyxRQUFRLGNBQVQsSUFBMkIsUUFBUSxjQUFSLENBQXVCLE9BQXZCLENBQStCLE1BQS9CLE1BQTJDLENBQUMsQ0FBOUU7QUFDRDs7QUFFRCxXQUFTLGFBQVQsQ0FBdUIsT0FBdkIsRUFBZ0MsT0FBaEMsRUFBeUM7QUFDdkMsUUFBSSxDQUFDLE9BQUwsRUFBYztBQUNaO0FBQ0EsYUFBTyxPQUFQO0FBQ0Q7QUFDRCxjQUFVLFFBQVEsS0FBUixDQUFjLEtBQWQsQ0FBVjtBQUNBLFdBQU8sUUFBUSxNQUFSLENBQWUsVUFBUyxJQUFULEVBQWU7QUFDbkMsYUFBTyxRQUFRLE9BQVIsQ0FBZ0IsSUFBaEIsTUFBMEIsQ0FBQyxDQUFsQztBQUNELEtBRk0sRUFFSixJQUZJLENBRUMsR0FGRCxDQUFQO0FBR0Q7QUFDRjs7QUFFRDtBQUNBOztBQUVBLElBQUkscUJBQXFCO0FBQ3ZCLGtCQUFnQjtBQURPLENBQXpCO0FBR0EsYUFBYSxRQUFiLEdBQXdCO0FBQ3RCLGVBQWEsQ0FBRSxJQUFGLEVBQVEsSUFBUixFQUFjLElBQWQsRUFBb0IsSUFBcEIsRUFBMEIsWUFBMUIsRUFBd0MsR0FBeEMsRUFBNkMsR0FBN0MsRUFBa0QsSUFBbEQsRUFBd0QsSUFBeEQsRUFDWCxJQURXLEVBQ0wsSUFESyxFQUNDLEdBREQsRUFDTSxHQUROLEVBQ1csUUFEWCxFQUNxQixJQURyQixFQUMyQixRQUQzQixFQUNxQyxNQURyQyxFQUM2QyxJQUQ3QyxFQUNtRCxJQURuRCxFQUN5RCxLQUR6RCxFQUVYLE9BRlcsRUFFRixPQUZFLEVBRU8sU0FGUCxFQUVrQixPQUZsQixFQUUyQixJQUYzQixFQUVpQyxJQUZqQyxFQUV1QyxJQUZ2QyxFQUU2QyxLQUY3QyxDQURTO0FBSXRCLHFCQUFtQjtBQUNqQixPQUFHLENBQUUsTUFBRixFQUFVLE1BQVYsRUFBa0IsUUFBbEIsQ0FEYztBQUVqQjtBQUNBO0FBQ0EsU0FBSyxDQUFFLEtBQUY7QUFKWSxHQUpHO0FBVXRCO0FBQ0EsZUFBYSxDQUFFLEtBQUYsRUFBUyxJQUFULEVBQWUsSUFBZixFQUFxQixNQUFyQixFQUE2QixNQUE3QixFQUFxQyxVQUFyQyxFQUFpRCxPQUFqRCxFQUEwRCxNQUExRCxFQUFrRSxNQUFsRSxDQVhTO0FBWXRCO0FBQ0Esa0JBQWdCLENBQUUsTUFBRixFQUFVLE9BQVYsRUFBbUIsS0FBbkIsRUFBMEIsUUFBMUIsQ0FiTTtBQWN0Qix1QkFBcUIsRUFkQztBQWV0Qix5QkFBdUI7QUFmRCxDQUF4Qjs7QUFrQkEsYUFBYSxlQUFiLEdBQStCLFVBQVMsVUFBVCxFQUFxQixVQUFyQixFQUFpQyxLQUFqQyxFQUF3QztBQUNyRSxVQUFTLFVBQVUsU0FBWCxHQUF3QixJQUF4QixHQUErQixLQUF2QztBQUNBLGVBQWEsY0FBYyxFQUEzQjs7QUFFQSxTQUFPLFVBQVMsT0FBVCxFQUFrQixPQUFsQixFQUEyQjtBQUNoQyxRQUFJLE1BQUo7QUFDQSxRQUFJLEtBQUosRUFBVztBQUNULFdBQUssTUFBTCxJQUFlLFVBQWYsRUFBMkI7QUFDekIsZ0JBQVEsTUFBUixJQUFrQixXQUFXLE1BQVgsQ0FBbEI7QUFDRDtBQUNGLEtBSkQsTUFJTztBQUNMLGdCQUFVLFVBQVY7QUFDRDs7QUFFRCxXQUFPO0FBQ0wsZUFBUyxVQURKO0FBRUwsZUFBUztBQUZKLEtBQVA7QUFJRCxHQWREO0FBZUQsQ0FuQkQiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwidmFyIGh0bWxwYXJzZXIgPSByZXF1aXJlKCdodG1scGFyc2VyMicpO1xudmFyIGV4dGVuZCA9IHJlcXVpcmUoJ3h0ZW5kJyk7XG52YXIgcXVvdGVSZWdleHAgPSByZXF1aXJlKCdyZWdleHAtcXVvdGUnKTtcblxuZnVuY3Rpb24gZWFjaChvYmosIGNiKSB7XG4gIGlmIChvYmopIE9iamVjdC5rZXlzKG9iaikuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgY2Iob2JqW2tleV0sIGtleSk7XG4gIH0pO1xufVxuXG4vLyBBdm9pZCBmYWxzZSBwb3NpdGl2ZXMgd2l0aCAuX19wcm90b19fLCAuaGFzT3duUHJvcGVydHksIGV0Yy5cbmZ1bmN0aW9uIGhhcyhvYmosIGtleSkge1xuICByZXR1cm4gKHt9KS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwga2V5KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzYW5pdGl6ZUh0bWw7XG5cbi8vIElnbm9yZSB0aGUgX3JlY3Vyc2luZyBmbGFnOyBpdCdzIHRoZXJlIGZvciByZWN1cnNpdmVcbi8vIGludm9jYXRpb24gYXMgYSBndWFyZCBhZ2FpbnN0IHRoaXMgZXhwbG9pdDpcbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9mYjU1L2h0bWxwYXJzZXIyL2lzc3Vlcy8xMDVcblxuZnVuY3Rpb24gc2FuaXRpemVIdG1sKGh0bWwsIG9wdGlvbnMsIF9yZWN1cnNpbmcpIHtcbiAgdmFyIHJlc3VsdCA9ICcnO1xuXG4gIGZ1bmN0aW9uIEZyYW1lKHRhZywgYXR0cmlicykge1xuICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICB0aGlzLnRhZyA9IHRhZztcbiAgICB0aGlzLmF0dHJpYnMgPSBhdHRyaWJzIHx8IHt9O1xuICAgIHRoaXMudGFnUG9zaXRpb24gPSByZXN1bHQubGVuZ3RoO1xuICAgIHRoaXMudGV4dCA9ICcnOyAvLyBOb2RlIGlubmVyIHRleHRcblxuICAgIHRoaXMudXBkYXRlUGFyZW50Tm9kZVRleHQgPSBmdW5jdGlvbigpIHtcbiAgICAgIGlmIChzdGFjay5sZW5ndGgpIHtcbiAgICAgICAgICB2YXIgcGFyZW50RnJhbWUgPSBzdGFja1tzdGFjay5sZW5ndGggLSAxXTtcbiAgICAgICAgICBwYXJlbnRGcmFtZS50ZXh0ICs9IHRoYXQudGV4dDtcbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgaWYgKCFvcHRpb25zKSB7XG4gICAgb3B0aW9ucyA9IHNhbml0aXplSHRtbC5kZWZhdWx0cztcbiAgICBvcHRpb25zLnBhcnNlciA9IGh0bWxQYXJzZXJEZWZhdWx0cztcbiAgfSBlbHNlIHtcbiAgICBvcHRpb25zID0gZXh0ZW5kKHNhbml0aXplSHRtbC5kZWZhdWx0cywgb3B0aW9ucyk7XG4gICAgaWYgKG9wdGlvbnMucGFyc2VyKSB7XG4gICAgICBvcHRpb25zLnBhcnNlciA9IGV4dGVuZChodG1sUGFyc2VyRGVmYXVsdHMsIG9wdGlvbnMucGFyc2VyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgb3B0aW9ucy5wYXJzZXIgPSBodG1sUGFyc2VyRGVmYXVsdHM7XG4gICAgfVxuICB9XG5cbiAgLy8gVGFncyB0aGF0IGNvbnRhaW4gc29tZXRoaW5nIG90aGVyIHRoYW4gSFRNTCwgb3Igd2hlcmUgZGlzY2FyZGluZ1xuICAvLyB0aGUgdGV4dCB3aGVuIHRoZSB0YWcgaXMgZGlzYWxsb3dlZCBtYWtlcyBzZW5zZSBmb3Igb3RoZXIgcmVhc29ucy5cbiAgLy8gSWYgd2UgYXJlIG5vdCBhbGxvd2luZyB0aGVzZSB0YWdzLCB3ZSBzaG91bGQgZHJvcCB0aGVpciBjb250ZW50IHRvby5cbiAgLy8gRm9yIG90aGVyIHRhZ3MgeW91IHdvdWxkIGRyb3AgdGhlIHRhZyBidXQga2VlcCBpdHMgY29udGVudC5cbiAgdmFyIG5vblRleHRUYWdzQXJyYXkgPSBvcHRpb25zLm5vblRleHRUYWdzIHx8IFsgJ3NjcmlwdCcsICdzdHlsZScsICd0ZXh0YXJlYScgXTtcbiAgdmFyIGFsbG93ZWRBdHRyaWJ1dGVzTWFwO1xuICB2YXIgYWxsb3dlZEF0dHJpYnV0ZXNHbG9iTWFwO1xuICBpZihvcHRpb25zLmFsbG93ZWRBdHRyaWJ1dGVzKSB7XG4gICAgYWxsb3dlZEF0dHJpYnV0ZXNNYXAgPSB7fTtcbiAgICBhbGxvd2VkQXR0cmlidXRlc0dsb2JNYXAgPSB7fTtcbiAgICBlYWNoKG9wdGlvbnMuYWxsb3dlZEF0dHJpYnV0ZXMsIGZ1bmN0aW9uKGF0dHJpYnV0ZXMsIHRhZykge1xuICAgICAgYWxsb3dlZEF0dHJpYnV0ZXNNYXBbdGFnXSA9IFtdO1xuICAgICAgdmFyIGdsb2JSZWdleCA9IFtdO1xuICAgICAgYXR0cmlidXRlcy5mb3JFYWNoKGZ1bmN0aW9uKG5hbWUpIHtcbiAgICAgICAgaWYobmFtZS5pbmRleE9mKCcqJykgPj0gMCkge1xuICAgICAgICAgIGdsb2JSZWdleC5wdXNoKHF1b3RlUmVnZXhwKG5hbWUpLnJlcGxhY2UoL1xcXFxcXCovZywgJy4qJykpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGFsbG93ZWRBdHRyaWJ1dGVzTWFwW3RhZ10ucHVzaChuYW1lKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBhbGxvd2VkQXR0cmlidXRlc0dsb2JNYXBbdGFnXSA9IG5ldyBSZWdFeHAoJ14oJyArIGdsb2JSZWdleC5qb2luKCd8JykgKyAnKSQnKTtcbiAgICB9KTtcbiAgfVxuICB2YXIgYWxsb3dlZENsYXNzZXNNYXAgPSB7fTtcbiAgZWFjaChvcHRpb25zLmFsbG93ZWRDbGFzc2VzLCBmdW5jdGlvbihjbGFzc2VzLCB0YWcpIHtcbiAgICAvLyBJbXBsaWNpdGx5IGFsbG93cyB0aGUgY2xhc3MgYXR0cmlidXRlXG4gICAgaWYoYWxsb3dlZEF0dHJpYnV0ZXNNYXApIHtcbiAgICAgIGlmICghaGFzKGFsbG93ZWRBdHRyaWJ1dGVzTWFwLCB0YWcpKSB7XG4gICAgICAgIGFsbG93ZWRBdHRyaWJ1dGVzTWFwW3RhZ10gPSBbXTtcbiAgICAgIH1cbiAgICAgIGFsbG93ZWRBdHRyaWJ1dGVzTWFwW3RhZ10ucHVzaCgnY2xhc3MnKTtcbiAgICB9XG5cbiAgICBhbGxvd2VkQ2xhc3Nlc01hcFt0YWddID0gY2xhc3NlcztcbiAgfSk7XG5cbiAgdmFyIHRyYW5zZm9ybVRhZ3NNYXAgPSB7fTtcbiAgdmFyIHRyYW5zZm9ybVRhZ3NBbGw7XG4gIGVhY2gob3B0aW9ucy50cmFuc2Zvcm1UYWdzLCBmdW5jdGlvbih0cmFuc2Zvcm0sIHRhZykge1xuICAgIHZhciB0cmFuc0Z1bjtcbiAgICBpZiAodHlwZW9mIHRyYW5zZm9ybSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdHJhbnNGdW4gPSB0cmFuc2Zvcm07XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgdHJhbnNmb3JtID09PSBcInN0cmluZ1wiKSB7XG4gICAgICB0cmFuc0Z1biA9IHNhbml0aXplSHRtbC5zaW1wbGVUcmFuc2Zvcm0odHJhbnNmb3JtKTtcbiAgICB9XG4gICAgaWYgKHRhZyA9PT0gJyonKSB7XG4gICAgICB0cmFuc2Zvcm1UYWdzQWxsID0gdHJhbnNGdW47XG4gICAgfSBlbHNlIHtcbiAgICAgIHRyYW5zZm9ybVRhZ3NNYXBbdGFnXSA9IHRyYW5zRnVuO1xuICAgIH1cbiAgfSk7XG5cbiAgdmFyIGRlcHRoID0gMDtcbiAgdmFyIHN0YWNrID0gW107XG4gIHZhciBza2lwTWFwID0ge307XG4gIHZhciB0cmFuc2Zvcm1NYXAgPSB7fTtcbiAgdmFyIHNraXBUZXh0ID0gZmFsc2U7XG4gIHZhciBza2lwVGV4dERlcHRoID0gMDtcblxuICB2YXIgcGFyc2VyID0gbmV3IGh0bWxwYXJzZXIuUGFyc2VyKHtcbiAgICBvbm9wZW50YWc6IGZ1bmN0aW9uKG5hbWUsIGF0dHJpYnMpIHtcbiAgICAgIGlmIChza2lwVGV4dCkge1xuICAgICAgICBza2lwVGV4dERlcHRoKys7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHZhciBmcmFtZSA9IG5ldyBGcmFtZShuYW1lLCBhdHRyaWJzKTtcbiAgICAgIHN0YWNrLnB1c2goZnJhbWUpO1xuXG4gICAgICB2YXIgc2tpcCA9IGZhbHNlO1xuICAgICAgdmFyIGhhc1RleHQgPSBmcmFtZS50ZXh0ID8gdHJ1ZSA6IGZhbHNlO1xuICAgICAgdmFyIHRyYW5zZm9ybWVkVGFnO1xuICAgICAgaWYgKGhhcyh0cmFuc2Zvcm1UYWdzTWFwLCBuYW1lKSkge1xuICAgICAgICB0cmFuc2Zvcm1lZFRhZyA9IHRyYW5zZm9ybVRhZ3NNYXBbbmFtZV0obmFtZSwgYXR0cmlicyk7XG5cbiAgICAgICAgZnJhbWUuYXR0cmlicyA9IGF0dHJpYnMgPSB0cmFuc2Zvcm1lZFRhZy5hdHRyaWJzO1xuXG4gICAgICAgIGlmICh0cmFuc2Zvcm1lZFRhZy50ZXh0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBmcmFtZS5pbm5lclRleHQgPSB0cmFuc2Zvcm1lZFRhZy50ZXh0O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG5hbWUgIT09IHRyYW5zZm9ybWVkVGFnLnRhZ05hbWUpIHtcbiAgICAgICAgICBmcmFtZS5uYW1lID0gbmFtZSA9IHRyYW5zZm9ybWVkVGFnLnRhZ05hbWU7XG4gICAgICAgICAgdHJhbnNmb3JtTWFwW2RlcHRoXSA9IHRyYW5zZm9ybWVkVGFnLnRhZ05hbWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmICh0cmFuc2Zvcm1UYWdzQWxsKSB7XG4gICAgICAgIHRyYW5zZm9ybWVkVGFnID0gdHJhbnNmb3JtVGFnc0FsbChuYW1lLCBhdHRyaWJzKTtcblxuICAgICAgICBmcmFtZS5hdHRyaWJzID0gYXR0cmlicyA9IHRyYW5zZm9ybWVkVGFnLmF0dHJpYnM7XG4gICAgICAgIGlmIChuYW1lICE9PSB0cmFuc2Zvcm1lZFRhZy50YWdOYW1lKSB7XG4gICAgICAgICAgZnJhbWUubmFtZSA9IG5hbWUgPSB0cmFuc2Zvcm1lZFRhZy50YWdOYW1lO1xuICAgICAgICAgIHRyYW5zZm9ybU1hcFtkZXB0aF0gPSB0cmFuc2Zvcm1lZFRhZy50YWdOYW1lO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChvcHRpb25zLmFsbG93ZWRUYWdzICYmIG9wdGlvbnMuYWxsb3dlZFRhZ3MuaW5kZXhPZihuYW1lKSA9PT0gLTEpIHtcbiAgICAgICAgc2tpcCA9IHRydWU7XG4gICAgICAgIGlmIChub25UZXh0VGFnc0FycmF5LmluZGV4T2YobmFtZSkgIT09IC0xKSB7XG4gICAgICAgICAgc2tpcFRleHQgPSB0cnVlO1xuICAgICAgICAgIHNraXBUZXh0RGVwdGggPSAxO1xuICAgICAgICB9XG4gICAgICAgIHNraXBNYXBbZGVwdGhdID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGRlcHRoKys7XG4gICAgICBpZiAoc2tpcCkge1xuICAgICAgICAvLyBXZSB3YW50IHRoZSBjb250ZW50cyBidXQgbm90IHRoaXMgdGFnXG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHJlc3VsdCArPSAnPCcgKyBuYW1lO1xuICAgICAgaWYgKCFhbGxvd2VkQXR0cmlidXRlc01hcCB8fCBoYXMoYWxsb3dlZEF0dHJpYnV0ZXNNYXAsIG5hbWUpIHx8IGFsbG93ZWRBdHRyaWJ1dGVzTWFwWycqJ10pIHtcbiAgICAgICAgZWFjaChhdHRyaWJzLCBmdW5jdGlvbih2YWx1ZSwgYSkge1xuICAgICAgICAgIGlmICghYWxsb3dlZEF0dHJpYnV0ZXNNYXAgfHxcbiAgICAgICAgICAgICAgKGhhcyhhbGxvd2VkQXR0cmlidXRlc01hcCwgbmFtZSkgJiYgYWxsb3dlZEF0dHJpYnV0ZXNNYXBbbmFtZV0uaW5kZXhPZihhKSAhPT0gLTEgKSB8fFxuICAgICAgICAgICAgICAoYWxsb3dlZEF0dHJpYnV0ZXNNYXBbJyonXSAmJiBhbGxvd2VkQXR0cmlidXRlc01hcFsnKiddLmluZGV4T2YoYSkgIT09IC0xICkgfHxcbiAgICAgICAgICAgICAgKGhhcyhhbGxvd2VkQXR0cmlidXRlc0dsb2JNYXAsIG5hbWUpICYmIGFsbG93ZWRBdHRyaWJ1dGVzR2xvYk1hcFtuYW1lXS50ZXN0KGEpKSB8fFxuICAgICAgICAgICAgICAoYWxsb3dlZEF0dHJpYnV0ZXNHbG9iTWFwWycqJ10gJiYgYWxsb3dlZEF0dHJpYnV0ZXNHbG9iTWFwWycqJ10udGVzdChhKSkpIHtcbiAgICAgICAgICAgIGlmICgoYSA9PT0gJ2hyZWYnKSB8fCAoYSA9PT0gJ3NyYycpKSB7XG4gICAgICAgICAgICAgIGlmIChuYXVnaHR5SHJlZihuYW1lLCB2YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICBkZWxldGUgZnJhbWUuYXR0cmlic1thXTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChhID09PSAnY2xhc3MnKSB7XG4gICAgICAgICAgICAgIHZhbHVlID0gZmlsdGVyQ2xhc3Nlcyh2YWx1ZSwgYWxsb3dlZENsYXNzZXNNYXBbbmFtZV0pO1xuICAgICAgICAgICAgICBpZiAoIXZhbHVlLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGRlbGV0ZSBmcmFtZS5hdHRyaWJzW2FdO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmVzdWx0ICs9ICcgJyArIGE7XG4gICAgICAgICAgICBpZiAodmFsdWUubGVuZ3RoKSB7XG4gICAgICAgICAgICAgIHJlc3VsdCArPSAnPVwiJyArIGVzY2FwZUh0bWwodmFsdWUpICsgJ1wiJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZGVsZXRlIGZyYW1lLmF0dHJpYnNbYV07XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIGlmIChvcHRpb25zLnNlbGZDbG9zaW5nLmluZGV4T2YobmFtZSkgIT09IC0xKSB7XG4gICAgICAgIHJlc3VsdCArPSBcIiAvPlwiO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVzdWx0ICs9IFwiPlwiO1xuICAgICAgICBpZiAoZnJhbWUuaW5uZXJUZXh0ICYmICFoYXNUZXh0ICYmICFvcHRpb25zLnRleHRGaWx0ZXIpIHtcbiAgICAgICAgICByZXN1bHQgKz0gZnJhbWUuaW5uZXJUZXh0O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICBvbnRleHQ6IGZ1bmN0aW9uKHRleHQpIHtcbiAgICAgIGlmIChza2lwVGV4dCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB2YXIgbGFzdEZyYW1lID0gc3RhY2tbc3RhY2subGVuZ3RoLTFdO1xuICAgICAgdmFyIHRhZztcblxuICAgICAgaWYgKGxhc3RGcmFtZSkge1xuICAgICAgICB0YWcgPSBsYXN0RnJhbWUudGFnO1xuICAgICAgICAvLyBJZiBpbm5lciB0ZXh0IHdhcyBzZXQgYnkgdHJhbnNmb3JtIGZ1bmN0aW9uIHRoZW4gbGV0J3MgdXNlIGl0XG4gICAgICAgIHRleHQgPSBsYXN0RnJhbWUuaW5uZXJUZXh0ICE9PSB1bmRlZmluZWQgPyBsYXN0RnJhbWUuaW5uZXJUZXh0IDogdGV4dDtcbiAgICAgIH1cblxuICAgICAgaWYgKCh0YWcgPT09ICdzY3JpcHQnKSB8fCAodGFnID09PSAnc3R5bGUnKSkge1xuICAgICAgICAvLyBodG1scGFyc2VyMiBnaXZlcyB1cyB0aGVzZSBhcy1pcy4gRXNjYXBpbmcgdGhlbSBydWlucyB0aGUgY29udGVudC4gQWxsb3dpbmdcbiAgICAgICAgLy8gc2NyaXB0IHRhZ3MgaXMsIGJ5IGRlZmluaXRpb24sIGdhbWUgb3ZlciBmb3IgWFNTIHByb3RlY3Rpb24sIHNvIGlmIHRoYXQnc1xuICAgICAgICAvLyB5b3VyIGNvbmNlcm4sIGRvbid0IGFsbG93IHRoZW0uIFRoZSBzYW1lIGlzIGVzc2VudGlhbGx5IHRydWUgZm9yIHN0eWxlIHRhZ3NcbiAgICAgICAgLy8gd2hpY2ggaGF2ZSB0aGVpciBvd24gY29sbGVjdGlvbiBvZiBYU1MgdmVjdG9ycy5cbiAgICAgICAgcmVzdWx0ICs9IHRleHQ7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgZXNjYXBlZCA9IGVzY2FwZUh0bWwodGV4dCk7XG4gICAgICAgIGlmIChvcHRpb25zLnRleHRGaWx0ZXIpIHtcbiAgICAgICAgICByZXN1bHQgKz0gb3B0aW9ucy50ZXh0RmlsdGVyKGVzY2FwZWQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlc3VsdCArPSBlc2NhcGVkO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoc3RhY2subGVuZ3RoKSB7XG4gICAgICAgICAgIHZhciBmcmFtZSA9IHN0YWNrW3N0YWNrLmxlbmd0aCAtIDFdO1xuICAgICAgICAgICBmcmFtZS50ZXh0ICs9IHRleHQ7XG4gICAgICB9XG4gICAgfSxcbiAgICBvbmNsb3NldGFnOiBmdW5jdGlvbihuYW1lKSB7XG5cbiAgICAgIGlmIChza2lwVGV4dCkge1xuICAgICAgICBza2lwVGV4dERlcHRoLS07XG4gICAgICAgIGlmICghc2tpcFRleHREZXB0aCkge1xuICAgICAgICAgIHNraXBUZXh0ID0gZmFsc2U7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHZhciBmcmFtZSA9IHN0YWNrLnBvcCgpO1xuICAgICAgaWYgKCFmcmFtZSkge1xuICAgICAgICAvLyBEbyBub3QgY3Jhc2ggb24gYmFkIG1hcmt1cFxuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBza2lwVGV4dCA9IGZhbHNlO1xuICAgICAgZGVwdGgtLTtcbiAgICAgIGlmIChza2lwTWFwW2RlcHRoXSkge1xuICAgICAgICBkZWxldGUgc2tpcE1hcFtkZXB0aF07XG4gICAgICAgIGZyYW1lLnVwZGF0ZVBhcmVudE5vZGVUZXh0KCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKHRyYW5zZm9ybU1hcFtkZXB0aF0pIHtcbiAgICAgICAgbmFtZSA9IHRyYW5zZm9ybU1hcFtkZXB0aF07XG4gICAgICAgIGRlbGV0ZSB0cmFuc2Zvcm1NYXBbZGVwdGhdO1xuICAgICAgfVxuXG4gICAgICBpZiAob3B0aW9ucy5leGNsdXNpdmVGaWx0ZXIgJiYgb3B0aW9ucy5leGNsdXNpdmVGaWx0ZXIoZnJhbWUpKSB7XG4gICAgICAgICByZXN1bHQgPSByZXN1bHQuc3Vic3RyKDAsIGZyYW1lLnRhZ1Bvc2l0aW9uKTtcbiAgICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgZnJhbWUudXBkYXRlUGFyZW50Tm9kZVRleHQoKTtcblxuICAgICAgaWYgKG9wdGlvbnMuc2VsZkNsb3NpbmcuaW5kZXhPZihuYW1lKSAhPT0gLTEpIHtcbiAgICAgICAgIC8vIEFscmVhZHkgb3V0cHV0IC8+XG4gICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHJlc3VsdCArPSBcIjwvXCIgKyBuYW1lICsgXCI+XCI7XG4gICAgfVxuICB9LCBvcHRpb25zLnBhcnNlcik7XG4gIHBhcnNlci53cml0ZShodG1sKTtcbiAgcGFyc2VyLmVuZCgpO1xuXG4gIHJldHVybiByZXN1bHQ7XG5cbiAgZnVuY3Rpb24gZXNjYXBlSHRtbChzKSB7XG4gICAgaWYgKHR5cGVvZihzKSAhPT0gJ3N0cmluZycpIHtcbiAgICAgIHMgPSBzICsgJyc7XG4gICAgfVxuICAgIHJldHVybiBzLnJlcGxhY2UoL1xcJi9nLCAnJmFtcDsnKS5yZXBsYWNlKC88L2csICcmbHQ7JykucmVwbGFjZSgvXFw+L2csICcmZ3Q7JykucmVwbGFjZSgvXFxcIi9nLCAnJnF1b3Q7Jyk7XG4gIH1cblxuICBmdW5jdGlvbiBuYXVnaHR5SHJlZihuYW1lLCBocmVmKSB7XG4gICAgLy8gQnJvd3NlcnMgaWdub3JlIGNoYXJhY3RlciBjb2RlcyBvZiAzMiAoc3BhY2UpIGFuZCBiZWxvdyBpbiBhIHN1cnByaXNpbmdcbiAgICAvLyBudW1iZXIgb2Ygc2l0dWF0aW9ucy4gU3RhcnQgcmVhZGluZyBoZXJlOlxuICAgIC8vIGh0dHBzOi8vd3d3Lm93YXNwLm9yZy9pbmRleC5waHAvWFNTX0ZpbHRlcl9FdmFzaW9uX0NoZWF0X1NoZWV0I0VtYmVkZGVkX3RhYlxuICAgIGhyZWYgPSBocmVmLnJlcGxhY2UoL1tcXHgwMC1cXHgyMF0rL2csICcnKTtcbiAgICAvLyBDbG9iYmVyIGFueSBjb21tZW50cyBpbiBVUkxzLCB3aGljaCB0aGUgYnJvd3NlciBtaWdodFxuICAgIC8vIGludGVycHJldCBpbnNpZGUgYW4gWE1MIGRhdGEgaXNsYW5kLCBhbGxvd2luZ1xuICAgIC8vIGEgamF2YXNjcmlwdDogVVJMIHRvIGJlIHNudWNrIHRocm91Z2hcbiAgICBocmVmID0gaHJlZi5yZXBsYWNlKC88XFwhXFwtXFwtLio/XFwtXFwtXFw+L2csICcnKTtcbiAgICAvLyBDYXNlIGluc2Vuc2l0aXZlIHNvIHdlIGRvbid0IGdldCBmYWtlZCBvdXQgYnkgSkFWQVNDUklQVCAjMVxuICAgIHZhciBtYXRjaGVzID0gaHJlZi5tYXRjaCgvXihbYS16QS1aXSspXFw6Lyk7XG4gICAgaWYgKCFtYXRjaGVzKSB7XG4gICAgICAvLyBQcm90b2NvbC1yZWxhdGl2ZSBVUkw6IFwiLy9zb21lLmV2aWwuY29tL25hc3R5XCJcbiAgICAgIGlmIChocmVmLm1hdGNoKC9eXFwvXFwvLykpIHtcbiAgICAgICAgcmV0dXJuICFvcHRpb25zLmFsbG93UHJvdG9jb2xSZWxhdGl2ZTtcbiAgICAgIH1cblxuICAgICAgLy8gTm8gc2NoZW1lXG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHZhciBzY2hlbWUgPSBtYXRjaGVzWzFdLnRvTG93ZXJDYXNlKCk7XG5cbiAgICBpZiAoaGFzKG9wdGlvbnMuYWxsb3dlZFNjaGVtZXNCeVRhZywgbmFtZSkpIHtcbiAgICAgIHJldHVybiBvcHRpb25zLmFsbG93ZWRTY2hlbWVzQnlUYWdbbmFtZV0uaW5kZXhPZihzY2hlbWUpID09PSAtMTtcbiAgICB9XG5cbiAgICByZXR1cm4gIW9wdGlvbnMuYWxsb3dlZFNjaGVtZXMgfHwgb3B0aW9ucy5hbGxvd2VkU2NoZW1lcy5pbmRleE9mKHNjaGVtZSkgPT09IC0xO1xuICB9XG5cbiAgZnVuY3Rpb24gZmlsdGVyQ2xhc3NlcyhjbGFzc2VzLCBhbGxvd2VkKSB7XG4gICAgaWYgKCFhbGxvd2VkKSB7XG4gICAgICAvLyBUaGUgY2xhc3MgYXR0cmlidXRlIGlzIGFsbG93ZWQgd2l0aG91dCBmaWx0ZXJpbmcgb24gdGhpcyB0YWdcbiAgICAgIHJldHVybiBjbGFzc2VzO1xuICAgIH1cbiAgICBjbGFzc2VzID0gY2xhc3Nlcy5zcGxpdCgvXFxzKy8pO1xuICAgIHJldHVybiBjbGFzc2VzLmZpbHRlcihmdW5jdGlvbihjbHNzKSB7XG4gICAgICByZXR1cm4gYWxsb3dlZC5pbmRleE9mKGNsc3MpICE9PSAtMTtcbiAgICB9KS5qb2luKCcgJyk7XG4gIH1cbn1cblxuLy8gRGVmYXVsdHMgYXJlIGFjY2Vzc2libGUgdG8geW91IHNvIHRoYXQgeW91IGNhbiB1c2UgdGhlbSBhcyBhIHN0YXJ0aW5nIHBvaW50XG4vLyBwcm9ncmFtbWF0aWNhbGx5IGlmIHlvdSB3aXNoXG5cbnZhciBodG1sUGFyc2VyRGVmYXVsdHMgPSB7XG4gIGRlY29kZUVudGl0aWVzOiB0cnVlXG59O1xuc2FuaXRpemVIdG1sLmRlZmF1bHRzID0ge1xuICBhbGxvd2VkVGFnczogWyAnaDMnLCAnaDQnLCAnaDUnLCAnaDYnLCAnYmxvY2txdW90ZScsICdwJywgJ2EnLCAndWwnLCAnb2wnLFxuICAgICdubCcsICdsaScsICdiJywgJ2knLCAnc3Ryb25nJywgJ2VtJywgJ3N0cmlrZScsICdjb2RlJywgJ2hyJywgJ2JyJywgJ2RpdicsXG4gICAgJ3RhYmxlJywgJ3RoZWFkJywgJ2NhcHRpb24nLCAndGJvZHknLCAndHInLCAndGgnLCAndGQnLCAncHJlJyBdLFxuICBhbGxvd2VkQXR0cmlidXRlczoge1xuICAgIGE6IFsgJ2hyZWYnLCAnbmFtZScsICd0YXJnZXQnIF0sXG4gICAgLy8gV2UgZG9uJ3QgY3VycmVudGx5IGFsbG93IGltZyBpdHNlbGYgYnkgZGVmYXVsdCwgYnV0IHRoaXNcbiAgICAvLyB3b3VsZCBtYWtlIHNlbnNlIGlmIHdlIGRpZFxuICAgIGltZzogWyAnc3JjJyBdXG4gIH0sXG4gIC8vIExvdHMgb2YgdGhlc2Ugd29uJ3QgY29tZSB1cCBieSBkZWZhdWx0IGJlY2F1c2Ugd2UgZG9uJ3QgYWxsb3cgdGhlbVxuICBzZWxmQ2xvc2luZzogWyAnaW1nJywgJ2JyJywgJ2hyJywgJ2FyZWEnLCAnYmFzZScsICdiYXNlZm9udCcsICdpbnB1dCcsICdsaW5rJywgJ21ldGEnIF0sXG4gIC8vIFVSTCBzY2hlbWVzIHdlIHBlcm1pdFxuICBhbGxvd2VkU2NoZW1lczogWyAnaHR0cCcsICdodHRwcycsICdmdHAnLCAnbWFpbHRvJyBdLFxuICBhbGxvd2VkU2NoZW1lc0J5VGFnOiB7fSxcbiAgYWxsb3dQcm90b2NvbFJlbGF0aXZlOiB0cnVlXG59O1xuXG5zYW5pdGl6ZUh0bWwuc2ltcGxlVHJhbnNmb3JtID0gZnVuY3Rpb24obmV3VGFnTmFtZSwgbmV3QXR0cmlicywgbWVyZ2UpIHtcbiAgbWVyZ2UgPSAobWVyZ2UgPT09IHVuZGVmaW5lZCkgPyB0cnVlIDogbWVyZ2U7XG4gIG5ld0F0dHJpYnMgPSBuZXdBdHRyaWJzIHx8IHt9O1xuXG4gIHJldHVybiBmdW5jdGlvbih0YWdOYW1lLCBhdHRyaWJzKSB7XG4gICAgdmFyIGF0dHJpYjtcbiAgICBpZiAobWVyZ2UpIHtcbiAgICAgIGZvciAoYXR0cmliIGluIG5ld0F0dHJpYnMpIHtcbiAgICAgICAgYXR0cmlic1thdHRyaWJdID0gbmV3QXR0cmlic1thdHRyaWJdO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBhdHRyaWJzID0gbmV3QXR0cmlicztcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgdGFnTmFtZTogbmV3VGFnTmFtZSxcbiAgICAgIGF0dHJpYnM6IGF0dHJpYnNcbiAgICB9O1xuICB9O1xufTtcbiJdfQ==
