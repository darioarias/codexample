class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
} // this is the blue print for every element of the queue

exports.Queue = class Queue {
  constructor(item = null) {
    item = item ? new Node(item) : item;
    this.head = item;
    this.tail = item;
  } // this is the part that gets run everytime a new Queue is created, the user can start the queue empty or with a value.

  enqueue(value) {
    let newElement = new Node(value);
    if (!this.tail) {
      this.head = newElement;
      this.tail = newElement;
      return this;
    }

    this.tail.next = newElement;
    this.tail = newElement;
    return this;
  } // adds a value to the end of the queue

  dequeue() {
    let head = this.head;
    if (!head) return undefined;

    if (head && !head.next) {
      this.head = null;
      this.tail = null;
      return head.value;
    }

    this.head = this.head.next;
    return head.value;
  } // removes an item from the front of the queue and returns is

  peek() {
    return this.head ? this.head.value : undefined;
  } // sends the from value of the queue if exists.
};
