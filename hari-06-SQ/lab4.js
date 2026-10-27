// Uji dengan enqueue tiga elemen, dequeue hingga kosong, dan dequeue pada queue kosong
import { Queue } from './structures.js';

const queue = new Queue();
queue.enqueue(1);
queue.enqueue(2);
queue.enqueue(3);
console.log("Front:", queue.front());
console.log("Dequeue:", queue.dequeue());
console.log("Dequeue:", queue.dequeue());
console.log("Dequeue:", queue.dequeue());
console.log("Dequeue pada Queue Kosong:", queue.dequeue());