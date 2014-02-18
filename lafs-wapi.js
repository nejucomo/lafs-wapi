/* Copyright 2013 Nathan Wilcox
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
 * <http://www.gnu.org/licenses/> or packaged with this code in
 * gpl-3.0.txt.
 */

"use strict";


// Begin UMD boilerplate; see https://github.com/umdjs/umd/blob/master/amdWeb.js
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define([], factory);
    } else if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like enviroments that support module.exports,
        // like Node.
        module.exports = factory();
    } else {
        // Browser globals (root is window)
        root.lafswapi = factory();
    }

  // And now the actual UMD module definition:
}(this, function () {
  // Return the module:
  return {
    /* Return a new Client given a baseurl and an optional XMLHttpRequest
     * provider.
     */
    Client: function (baseurl) {

      // Client instance:
      return {
        url: baseurl,
        get: function (cap, callback) {
          var capurl = baseurl + '/uri/' + encodeURIComponent(cap);

          var xhr = new XMLHttpRequest();
          xhr.open(capurl);
          xhr.send();

          throw new Error('Not Implemented: Client.get(..., callback) callback.');
        },
      };
    },
  };
}));
