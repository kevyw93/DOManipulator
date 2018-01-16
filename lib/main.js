import DOMNodeCollection from './dom_node_collection.js';
const documentFunctions = [];
let docReady;
const $l = (arg) => {
  if (arg instanceof HTMLElement) {
    return new DOMNodeCollection([arg]);
  }else if(typeof arg === "string"){
    const nodes = getNodesFromDom(arg);
    const newHtml = new DOMNodeCollection(nodes);
    return newHtml;
  }else if (typeof arg === 'function'){
    docReady ? arg() : documentFunctions.push(arg);
  }
  // return getNodesFomDom(selector);
};

$l.extend = (obj1, ...otherObjs) => {
  otherObjs.forEach((obj) => {
    obj1[Object.keys(obj)[0]] = obj[Object.keys(obj)[0]];
  });
  return obj1;
};

$l.ajax = () => {

};


const getNodesFromDom = (selector) => {
  const nodes = document.querySelectorAll(selector);
  const nodeArrays = Array.from(nodes);
  return nodeArrays;
};

document.addEventListener("DOMContentLoaded", () => {
  docReady = true;
  documentFunctions.forEach(funct => funct());
});
window.$l = $l;
