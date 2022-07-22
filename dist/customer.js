/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./api/createAppearance.js":
/*!*********************************!*\
  !*** ./api/createAppearance.js ***!
  \*********************************/
/***/ ((module) => {


/***/ }),

/***/ "./src/FileSaver.js":
/*!**************************!*\
  !*** ./src/FileSaver.js ***!
  \**************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

eval("/*\n * FileSaver.js\n * A saveAs() FileSaver implementation.\n *\n * By Eli Grey, http://eligrey.com\n *\n * License : https://github.com/eligrey/FileSaver.js/blob/master/LICENSE.md (MIT)\n * source  : http://purl.eligrey.com/github/FileSaver.js\n */\n\n// The one and only way of getting global scope in all environments\n// https://stackoverflow.com/q/3277182/1008999\nvar _global =\n  typeof window === \"object\" && window.window === window\n    ? window\n    : typeof self === \"object\" && self.self === self\n    ? self\n    : typeof __webpack_require__.g === \"object\" && __webpack_require__.g.global === __webpack_require__.g\n    ? __webpack_require__.g\n    : this;\n\nfunction bom(blob, opts) {\n  if (typeof opts === \"undefined\") opts = { autoBom: false };\n  else if (typeof opts !== \"object\") {\n    console.warn(\"Deprecated: Expected third argument to be a object\");\n    opts = { autoBom: !opts };\n  }\n\n  // prepend BOM for UTF-8 XML and text/* types (including HTML)\n  // note: your browser will automatically convert UTF-16 U+FEFF to EF BB BF\n  if (\n    opts.autoBom &&\n    /^\\s*(?:text\\/\\S*|application\\/xml|\\S*\\/\\S*\\+xml)\\s*;.*charset\\s*=\\s*utf-8/i.test(\n      blob.type\n    )\n  ) {\n    return new Blob([String.fromCharCode(0xfeff), blob], { type: blob.type });\n  }\n  return blob;\n}\n\nfunction download(url, name, opts) {\n  var xhr = new XMLHttpRequest();\n  xhr.open(\"GET\", url);\n  xhr.responseType = \"blob\";\n  xhr.onload = function () {\n    saveAs(xhr.response, name, opts);\n  };\n  xhr.onerror = function () {\n    console.error(\"could not download file\");\n  };\n  xhr.send();\n}\n\nfunction corsEnabled(url) {\n  var xhr = new XMLHttpRequest();\n  // use sync to avoid popup blocker\n  xhr.open(\"HEAD\", url, false);\n  try {\n    xhr.send();\n  } catch (e) {}\n  return xhr.status >= 200 && xhr.status <= 299;\n}\n\n// `a.click()` doesn't work for all browsers (#465)\nfunction click(node) {\n  try {\n    node.dispatchEvent(new MouseEvent(\"click\"));\n  } catch (e) {\n    var evt = document.createEvent(\"MouseEvents\");\n    evt.initMouseEvent(\n      \"click\",\n      true,\n      true,\n      window,\n      0,\n      0,\n      0,\n      80,\n      20,\n      false,\n      false,\n      false,\n      false,\n      0,\n      null\n    );\n    node.dispatchEvent(evt);\n  }\n}\n\n// Detect WebView inside a native macOS app by ruling out all browsers\n// We just need to check for 'Safari' because all other browsers (besides Firefox) include that too\n// https://www.whatismybrowser.com/guides/the-latest-user-agent/macos\nvar isMacOSWebView =\n  _global.navigator &&\n  /Macintosh/.test(navigator.userAgent) &&\n  /AppleWebKit/.test(navigator.userAgent) &&\n  !/Safari/.test(navigator.userAgent);\n\nvar saveAs =\n  _global.saveAs ||\n  // probably in some web worker\n  (typeof window !== \"object\" || window !== _global\n    ? function saveAs() {\n        /* noop */\n      }\n    : // Use download attribute first if possible (#193 Lumia mobile) unless this is a macOS WebView\n    \"download\" in HTMLAnchorElement.prototype && !isMacOSWebView\n    ? function saveAs(blob, name, opts) {\n        var URL = _global.URL || _global.webkitURL;\n        var a = document.createElement(\"a\");\n        name = name || blob.name || \"download\";\n\n        a.download = name;\n        a.rel = \"noopener\"; // tabnabbing\n\n        // TODO: detect chrome extensions & packaged apps\n        // a.target = '_blank'\n\n        if (typeof blob === \"string\") {\n          // Support regular links\n          a.href = blob;\n          if (a.origin !== location.origin) {\n            corsEnabled(a.href)\n              ? download(blob, name, opts)\n              : click(a, (a.target = \"_blank\"));\n          } else {\n            click(a);\n          }\n        } else {\n          // Support blobs\n          a.href = URL.createObjectURL(blob);\n          setTimeout(function () {\n            URL.revokeObjectURL(a.href);\n          }, 4e4); // 40s\n          setTimeout(function () {\n            click(a);\n          }, 0);\n        }\n      }\n    : // Use msSaveOrOpenBlob as a second approach\n    \"msSaveOrOpenBlob\" in navigator\n    ? function saveAs(blob, name, opts) {\n        name = name || blob.name || \"download\";\n\n        if (typeof blob === \"string\") {\n          if (corsEnabled(blob)) {\n            download(blob, name, opts);\n          } else {\n            var a = document.createElement(\"a\");\n            a.href = blob;\n            a.target = \"_blank\";\n            setTimeout(function () {\n              click(a);\n            });\n          }\n        } else {\n          navigator.msSaveOrOpenBlob(bom(blob, opts), name);\n        }\n      }\n    : // Fallback to using FileReader and a popup\n      function saveAs(blob, name, opts, popup) {\n        // Open a popup immediately do go around popup blocker\n        // Mostly only available on user interaction and the fileReader is async so...\n        popup = popup || open(\"\", \"_blank\");\n        if (popup) {\n          popup.document.title = popup.document.body.innerText =\n            \"downloading...\";\n        }\n\n        if (typeof blob === \"string\") return download(blob, name, opts);\n\n        var force = blob.type === \"application/octet-stream\";\n        var isSafari =\n          /constructor/i.test(_global.HTMLElement) || _global.safari;\n        var isChromeIOS = /CriOS\\/[\\d]+/.test(navigator.userAgent);\n\n        if (\n          (isChromeIOS || (force && isSafari) || isMacOSWebView) &&\n          typeof FileReader !== \"undefined\"\n        ) {\n          // Safari doesn't allow downloading of blob URLs\n          var reader = new FileReader();\n          reader.onloadend = function () {\n            var url = reader.result;\n            url = isChromeIOS\n              ? url\n              : url.replace(/^data:[^;]*;/, \"data:attachment/file;\");\n            if (popup) popup.location.href = url;\n            else location = url;\n            popup = null; // reverse-tabnabbing #460\n          };\n          reader.readAsDataURL(blob);\n        } else {\n          var URL = _global.URL || _global.webkitURL;\n          var url = URL.createObjectURL(blob);\n          if (popup) popup.location = url;\n          else location.href = url;\n          popup = null; // reverse-tabnabbing #460\n          setTimeout(function () {\n            URL.revokeObjectURL(url);\n          }, 4e4); // 40s\n        }\n      });\n\n_global.saveAs = saveAs.saveAs = saveAs;\n\nif (true) {\n  module.exports = saveAs;\n}\n\n\n//# sourceURL=webpack:///./src/FileSaver.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _api_createAppearance__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../api/createAppearance */ \"./api/createAppearance.js\");\n/* harmony import */ var _api_createAppearance__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_api_createAppearance__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _FileSaver__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./FileSaver */ \"./src/FileSaver.js\");\n/* harmony import */ var _FileSaver__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_FileSaver__WEBPACK_IMPORTED_MODULE_1__);\n\n\n\nconst draw = (ctx) => {\n  // enter canvas methods here!\n};\n\n// createAppearance(draw).then((res) => {\n//   saveAs(res, \"appearance.pdf\", true);\n// });\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;