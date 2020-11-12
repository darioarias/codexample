const { Queue } = require(`${__dirname}/queue`); // brings in the queue we created on a different module

class Node {
  constructor(value, priority) {
    this.value = value;

    this.parent = null;
    this.left = null;
    this.right = null;
    this.priority = priority;
  }
} // the blue print for every element of my priority queue

exports.PriorityQueue = class PriorityQueue {
  constructor(item = null) {
    item = item ? new Node(item) : item;
    this.root = item;

    this.lowestPriority = null;
  } // the blue print for every priority quueue. Notice that I keep track of the lowest priority so I do not have to search the whole queue to remove (dequeue)

  _bubbleUp(node) {
    while (node.parent && node.priority < node.parent.priority) {
      if (node.priority < node.parent.priority) {
        let parent = node.parent,
          parentValue = node.parent.value,
          parentPriority = node.parent.priority;
        parent.value = node.value;
        parent.priority = node.priority;
        node.value = parentValue;
        node.priority = parentPriority;

        this._updateLowestPriority(node);
        node = parent;
      }
    }
  } // this is a helper method which is responsible for relocating a node according to its priority

  _updateLowestPriority(node) {
    let lowest = this.lowestPriority;
    if (!lowest) this.lowestPriority = node;
    else if (node.priority >= lowest.priority) this.lowestPriority = node;
  } // keeps track of the lowest priority so later when removing, we don't have to search the entire queue for the lowest priority element

  _swapDown(parent, child) {
    let parentValue = parent.value,
      parentPriority = parent.priority;

    parent.value = child.value;
    parent.priority = child.priority;
    child.value = parentValue;
    child.priority = parentPriority;
  } //switches a node with one of its children.

  _sinkDown() {
    let node = this.root;

    while (node.left || node.right) {
      let nodeLeft = node.left;
      let nodeRight = node.right;
      if (nodeLeft && nodeRight && nodeRight.priority <= nodeLeft.priority) {
        //swap with right child if needed
        if (node.priority > nodeRight.priority) {
          this._swapDown(node, nodeRight);
          node = nodeRight;
        } else if (
          node.priority == nodeLeft.priority &&
          node.priority == nodeRight.priority
        ) {
          //Both children have the same priority as the parent, just grab a random one and stop looping
          this._updateLowestPriority(node.right);
          break;
        }
      } else if (
        nodeLeft &&
        nodeRight &&
        nodeLeft.priority < nodeRight.priority
      ) {
        //swap with left child if needed
        if (node.priority > nodeLeft.priority) {
          this._swapDown(node, nodeLeft);
          node = nodeLeft;
        } else if (
          node.priority == nodeLeft.priority &&
          node.priority == nodeRight.priority
        ) {
          //same idea as before, both children have the same priority as the parent
          this._updateLowestPriority(node.right);
          break;
        }
      } else if (nodeLeft && !nodeRight) {
        //check if needs to switch with left while left is underfined
        if (node.priority > nodeLeft.priority) {
          this._swapDown(node, nodeLeft);
          node = nodeLeft;
        } else {
          //right is underfined but the right children has the same priority as the parent
          this._updateLowestPriority(node.left);
          break;
        }
      } else if (nodeRight && !nodeLeft) {
        //check if needs to switcg with right
        if (node.priority > nodeRight.priority) {
          this._swapDown(node, nodeRight);
          node = nodeRight;
        } else {
          // left is underfined but the right children has the same priority as the parent
          this._updateLowestPriority(node.right);
          break;
        }
      }
      this._updateLowestPriority(node);
    }
  } // a helper method which is responsible for relocating a node according to its priority, after the highest priority has been removed.

  enqueue(value, priority) {
    let newElement = new Node(value, priority);
    if (!this.root) {
      this.root = newElement;
      return this;
    }

    const queue = new Queue(this.root);
    while (queue.peek()) {
      // loop while there are not empty spaces | ensures that the queue is as compact as possible
      const node = queue.dequeue();
      if (node.left) queue.enqueue(node.left);
      else {
        // I can insert on the left
        newElement.parent = node;
        node.left = newElement;
        this._updateLowestPriority(newElement);
        this._bubbleUp(newElement);
        return this;
      }
      if (node.right) queue.enqueue(node.right);
      else {
        //I can insert on the right
        newElement.parent = node;
        node.right = newElement;
        this._updateLowestPriority(newElement);
        this._bubbleUp(newElement);
        return this;
      }
    }
  } // adds a value to the queue and position it where it belongs according to its priority

  dequeue() {
    if (!this.root) return undefined;

    let root = this.root,
      returnValue = this.root.value;

    if (this.root && !this.root.left && !this.root.right) {
      this.root = null;
      return root.value;
    } // check if there is only one thing in the queue

    this.root.value = this.lowestPriority.value;
    this.root.priority = this.lowestPriority.priority;
    if (this.lowestPriority.parent.left == this.lowestPriority) {
      this.lowestPriority.parent.left = null;
    } else if (this.lowestPriority.parent.right == this.lowestPriority) {
      this.lowestPriority.parent.right = null;
    }
    this.lowestPriority = null; // must be redefined!
    this._sinkDown(); // makes sure that everthing is in their correct position

    return returnValue;
  } //removes a node from the queue (it will eliminate the queue with the highest priority --lowest number)

  empty() {
    return !!this.root;
  }

  peek() {
    return this.root ? this.root.value : undefined;
  }
};
