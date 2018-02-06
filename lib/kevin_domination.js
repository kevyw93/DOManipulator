/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__dom_node_collection_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__dom_node_collection_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__dom_node_collection_js__);


const $k = (arg) => {
  if (arg instanceof HTMLElement) {
    return new __WEBPACK_IMPORTED_MODULE_0__dom_node_collection_js___default.a([arg]);
  }else if(typeof arg === "string"){
    const nodes = getNodesFromDom(arg);
    const newHtml = new __WEBPACK_IMPORTED_MODULE_0__dom_node_collection_js___default.a(nodes);
    return newHtml;
  }else if (typeof arg === 'function'){
    document.addEventListener("DOMContentLoaded", arg);
  }
};

$k.extend = (obj1, ...otherObjs) => {
  otherObjs.forEach((obj) => {
    obj1[Object.keys(obj)[0]] = obj[Object.keys(obj)[0]];
  });
  return obj1;
};

$k.ajax = (newRequest) => {
  const request = new XMLHttpRequest();
  const defaults = {
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    method: "GET",
    url: "",
    success: () => {},
    error: () => {},
    data: {},
  };

  newRequest = $k.extend(defaults, newRequest);
  newRequest.method = newRequest.method.toUpperCase();

  if (newRequest.method === 'GET') {
    newRequest.url += `?${createParamQueryString(newRequest.data)}`;
  }

  const newPromise = new Promise((resolve,reject) => {
    request.open(newRequest.method, newRequest.url, true);
    request.onload = (e) => {
      if (request.status === 200) {
        newRequest.success(request.response);
      }else {
        newRequest.error(request.response);
      }
    };
    request.send(JSON.stringify(newRequest.data));
  }).then((success) => {
    success();
  }).fail((error) => error());

};

const createParamQueryString = (data) => {
  let result = "";
  for (const prop in data) {
    if (Object.prototype.hasOwnProperty.call(data, prop)) {
      result += `${prop}=${data[prop]}&`;
    }
  }
  return result.slice(0, result.length - 1);
};


const getNodesFromDom = (selector) => {
  const nodes = document.querySelectorAll(selector);
  const nodeArrays = Array.from(nodes);
  return nodeArrays;
};

window.$k = $k;

// module.exports = $k;


/***/ }),
/* 1 */
/***/ (function(module, exports) {

class DOMNodeCollection {
  constructor(nodes) {
    this.nodes = nodes;
  }

  on(event, callback) {
    this.nodes.forEach(node => {
      node.addEventListener(event, callback);
      const eventKey = `jqliteEvents-${event}`;
      if (!node[eventKey]) {
        node[eventKey] = [];
      }
      node[eventKey].push(callback);
    });
  }

  off(event){
    this.nodes.forEach(node => {
      const eventKey = `jqliteEvents-${event}`;
      if (node[eventKey]) {
        node[eventKey].forEach(nodeCallbacks =>
          node.removeEventListener(event, nodeCallbacks)
        );
      }
    });
  }

  nodeValues() {
    return this.nodes[0].value;
  }

  innerHTML() {
    return this.nodes[0].innerHTML;
  }

  html(arg) {
    if (typeof arg === 'string') {
      return this.nodes.forEach(node => {
        node.innerHTML = arg;
      });
    }else if(this.nodes.length > 0){
      return this.nodes[0].innerHTML;
    }
  }

  empty() {
    this.html('');
  }

  htmlValue(arg){
    if (typeof arg === 'string') {
      return this.nodes.forEach(node => {
        node.value = arg;
      });
    }
  }

  attr(name, value) {
    if (typeof value === 'string') {
      this.nodes.forEach(node => {
        node.setAttribute(name, value);
      });
    }else {
      return this.nodes[0].getAttribute(name);
    }
  }

  addClass(className) {
    this.nodes.forEach(node => node.classList.add(className));
  }

  removeClass(className){
    this.nodes.forEach(node => node.classList.remove(className));
  }

  append(arg) {
    if (typeof arg === 'string') {
      this.nodes.forEach(node => {
        node.innerHTML += arg;
      });
    }else if (arg instanceof DOMNodeCollection) {
      this.nodes.forEach(node => {
        arg.nodes.forEach(childNode => {
          node.appendChild(childNode);
        });
      });
      arg.remove();
    }
  }

  children() {
    const childrenNodes = [];
    this.nodes.forEach(node => {
      const child = node.children;
      childrenNodes.push(child);
    });
    return new DOMNodeCollection(childrenNodes);
  }

  parent() {
    const parentNodes = [];
    this.nodes.forEach(node => {
      const parent = node.parentNode;
      if (!parent.visited) {
        parentNodes.push(parent);
        parent.visited = true;
      }
    });
    return new DOMNodeCollection(parentNodes);
  }

  find(arg) {
    const allMatchingNodes = [];

    this.nodes.forEach((node,idx) => {
      allMatchingNodes.push(node.querySelector(arg));
    });
    return allMatchingNodes;
    // this.nodes.slice(firstMatchingIdx).forEach(node => {
    //   allMatchingNodes.push(node);
    // });
    // return new DOMNodeCollection(allMatchingNodes);
  }

  remove() {
    this.nodes.forEach(node => node.parentNode.removeChild(node));
  }
}

module.exports = DOMNodeCollection;


/***/ })
/******/ ]);