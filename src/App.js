import React from "react";
import "./styles.css";

class Node {
  constructor(value) {
    this.left = null;
    this.right = null;
    this.value = value;
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;
  }
  insert(value) {
    const myNode = new Node(value);
    if (this.root === null) {
      this.root = myNode;
    } else {
      let currentNode = this.root;
      while (true) {
        if (value < currentNode.value) {
          if (!currentNode.left) {
            currentNode.left = myNode;
            return this;
          }
          currentNode = currentNode.left;
        } else {
          if (value > currentNode.value) {
            currentNode.right = myNode;
            return this;
          }
          currentNode = currentNode.right;
        }
      }
    }

    return this;
  }
  lookup(value) {
    if (!this.root) {
      console.log("Error no value");
      return false;
    }
    let currentNode = this.root;
    while (currentNode) {
      if (value < currentNode.value) {
        currentNode = currentNode.left;
        console.log("Value is less then root, moving left");
      } else if (value > currentNode.value) {
        currentNode = currentNode.right;
        console.log("Value is greater then root, moving right");
      } else if (currentNode.value === value) {
        console.log("found value");
        return currentNode;
      }
    }
  }

  remove(value) {
    if (!this.root) {
      return false;
    }

    let currentNode = this.root;
    let parentNode = null;

    while (currentNode) {
      if (value < currentNode.value) {
        parentNode = currentNode;
        currentNode = currentNode.left;
      } else if (value > currentNode.value) {
        parentNode = currentNode;
        currentNode = currentNode.right;
      } else if (currentNode.value === value) {
        //We have a match, get to work!

        //Option 1: No right child:
        if (currentNode.right === null) {
          if (parentNode === null) {
            this.root = currentNode.left;
          } else {
            //if parent > current value, make current left child a child of parent
            if (currentNode.value < parentNode.value) {
              parentNode.left = currentNode.left;

              //if parent < current value, make left child a right child of parent
            } else if (currentNode.value > parentNode.value) {
              parentNode.right = currentNode.left;
            }
          }

          //Option 2: Right child which doesnt have a left child
        } else if (currentNode.right.left === null) {
          currentNode.right.left = currentNode.left;
          if (parentNode === null) {
            this.root = currentNode.right;
          } else {
            //if parent > current, make right child of the left the parent
            if (currentNode.value < parentNode.value) {
              parentNode.left = currentNode.right;

              //if parent < current, make right child a right child of the parent
            } else if (currentNode.value > parentNode.value) {
              parentNode.right = currentNode.right;
            }
          }

          //Option 3: Right child that has a left child
        } else {
          //find the Right child's left most child
          let leftmost = currentNode.right.left;
          let leftmostParent = currentNode.right;
          while (leftmost.left !== null) {
            leftmostParent = leftmost;
            leftmost = leftmost.left;
          }

          //Parent's left subtree is now leftmost's right subtree
          leftmostParent.left = leftmost.right;
          leftmost.left = currentNode.left;
          leftmost.right = currentNode.right;

          if (parentNode === null) {
            this.root = leftmost;
          } else {
            if (currentNode.value < parentNode.value) {
              parentNode.left = leftmost;
            } else if (currentNode.value > parentNode.value) {
              parentNode.right = leftmost;
            }
          }
        }

        return true;
      }
    }
  }
}

const myBinarySearchTree = new BinarySearchTree();

myBinarySearchTree.insert(8);

myBinarySearchTree.insert(1);

myBinarySearchTree.insert(4);

myBinarySearchTree.insert(3);

myBinarySearchTree.insert(1);

myBinarySearchTree.remove(1);

myBinarySearchTree.lookup(1);

console.log(myBinarySearchTree);
export default function App() {
  return <div className="App" />;
}
