const { PriorityQueue } = require(`${__dirname}/priorityQueue`);

let q = new PriorityQueue();

for (let i = 0; i < 10000; i += Math.floor(Math.random() * 5.531)) {
  console.log("adding");
  q.enqueue(`${i}`, i);
}

console.log(q.length);

while (q.peek()) {
  console.log(`removed: ${q.dequeue()}`);
}

// q.enqueue("10.1", 10);
// q.enqueue("10.2", 10);
// q.enqueue("10.3", 10);
// q.enqueue("10.4", 10);
// console.log(q.dequeue());
// console.log(q.dequeue());
// console.log(q.dequeue());
// console.log(q.dequeue());
// console.log(q.peek());
