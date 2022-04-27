const { NotImplementedError } = require('../extensions/index.js');

// const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/

class BinarySearchTree {
  constructor() {
    this._root = null
  }

  root() {
    return this._root
  }

  add(data) {
    function insert(data, node) {
      if (!node)
      return {
        data: data,
        left: null,
        right: null,
      }
      if (node.data === data)
        return node
      if (node.data > data) {
        node.left = insert(data, node.left)
      } else {
        node.right = insert(data, node.right)
      }
      return node
    }
    this._root = insert(data, this._root)
  }

  has(data) {
    return Boolean(this.find(data))
  }

  find(data) {
      const finder = (node, data) => {
      if (!node) return null;
      if (node.data === data) return node;
      return node.data > data ? finder(node.left, data) : finder(node.right, data)
    }
    return finder(this._root, data)
  }

  remove(data) {
    function remove(data, node) {
      if (!node) return null

      if (node.data > data) {
        node.left = remove(data, node.left)
        return node
      }
      if (node.data < data) {
        node.right = remove(data, node.right)
        return node
      }

      if (node.data === data) {
        if (!node.left && !node.right) {
          return null
        }
        if (!node.left) {
          return node.right
        }
        if (!node.right) {
          return node.left
        } else {
          let minRightNode = node.right
          while (minRightNode.left) {
            minRightNode = minRightNode.left
          }
          node.data = minRightNode.data
          node.right = remove(minRightNode.data, node.right)
          return node
        }
      }
    }
    this._root = remove(data, this._root)
  }

  min() {
    let node = this._root
    while (node.left) {
      node = node.left
    }
    return node ? node.data : null
  }

  max() {
    let node = this._root
    while (node.right) {
      node = node.right
    }
    return node ? node.data : null
  }
}

module.exports = {
  BinarySearchTree
};