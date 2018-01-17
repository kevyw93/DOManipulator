import DOMNodeCollection from './dom_node_collection.js';
import Promise from 'promise/domains';

// const documentFunctions = [];
// let docReady;


const $k = (arg) => {
  if (arg instanceof HTMLElement) {
    return new DOMNodeCollection([arg]);
  }else if(typeof arg === "string"){
    const nodes = getNodesFromDom(arg);
    const newHtml = new DOMNodeCollection(nodes);
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
