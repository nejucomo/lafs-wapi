/* Copyright 2009 Nathan Wilcox
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You may retrieve a copy of the GNU General Public License at
 * <http://www.gnu.org/licenses/>.
 */


/* tahoewapi.js assumes an AMD compliant module system.
 * See: http://requirejs.org/docs/whyamd.html
 */

if (! (typeof define === 'function' && define.amd !== undefined)) {
  throw new Error('tahoewapi.js requires an AMD module system.');
}

define('tahoewapi', [], function() {
  // Public Module Interface:
  var module = {
    retrieve: function(cap, callback, errback) {
      xhr_operation(
           '/uri/' + cap + '?t=json',
           function(body) {
             var metadata = eval(body); // FIXME! Use a safe JSON parser.
             var kind = metadata[0];
             var info = metadata[1];
             callback(Node(kind, info));
           },
           errback);
    }
  };

  // Private Module Closure:
  var Node = function(kind, info) {
    var node = {
      kind: kind,

      // FIXME: Copy interesting properties from info onto node.

      retrieve: function(callback, errback, suffix) {
          if (suffix == undefined) {
            suffix = '';
          }
          return xhr_operation('/uri/' + node.ro_uri + suffix,
                               callback,
                               errback);
      }
    };

    if (kind == 'dirnode') {
      return Directory(node);
    } else if (kind == 'filenode') {
      if (node.rw_uri == undefined) {
        return node;
      } else {
        return WritableFile(node);
      }
    } else {
      throw new Error('Unknown Node kind: ' + kind);
    }
  };

  var WritableFile = function(file) {
    throw new Error('not implemented.');
  };

  var Directory = function(node) {
    var directory = {

      // FIXME: Copy interesting properties from node onto directory.

      retrieve: function(callback, errback) {
        node.retrieve(
            function(jsontext) {
              // Parse the json and callback with a map { name -> childnode }.
              var json = eval(jsontext); // FIXME dangerous!

              if (json.length != 2) {
                errback(new Error('Unexpected tahoe wapi response: ' + jsontext.substring(0, 40)));
                return;
              }

              var typeflag = json[0];
              var metadata = json[1];
              if (typeflag != 'dirnode') {
                var errmsg = 'Unexpected tahoe wapi response type: ';
                errmsg += typeflag;
                errback(new Error(errmsg));
                return;
              }

              var children = metadata['children'];
              if (children == undefined) {
                var errmsg = 'Tahoe wapi directory children undefined: ';
                errmsg += metadata;
                errback(new Error(errmsg));
                return;
              }

              var childNodes = {};
              for (name in children) {
                var childmd = children[name];
                var kind = childmd[0];
                var info = childmd[1];
                childNodes[name] = Node(kind, info);
              }

              // Successful parse and wrap:
              callback(childNodes);
            },
            errback,
            '?t=json'); // The url suffix.
      }
    };
    return directory;
  };

  var xhr_operation = function(url, callback, errback) {
    var xhr = new XMLHttpRequest();

    xhr.open('GET', url, true);

    xhr.onreadystatechange = function(evt) {
      if (xhr.readyState == 1 /* OPENED */) {
        // FIXME: Do we need to send headers?

      } else if (xhr.readyState == 2 /* HEADERS_RECEIVED */) {
        // Ho hum...

      } else if (xhr.readyState == 3 /* LOADING */) {
        // Hi ho...

      } else if (xhr.readyState == 4 /* DONE */) {
        if (xhr.status == 200) {
          callback(xhr.responseText);
        } else {
          errback(xhr);
        }
      } else {
        throw new Error('Unexpected XHR readyState: ' + xhr.readyState);
      }
    };

    // Suggested by https://developer.mozilla.org/En/Using_XMLHttpRequest
    //xhr.overrideMimeType('text/plain; charset=x-user-defined');

    xhr.send(null);
  };

  return module;

});
