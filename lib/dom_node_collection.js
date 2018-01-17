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
    debugger
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
    debugger
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
