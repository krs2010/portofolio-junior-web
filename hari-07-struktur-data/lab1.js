//uji LinkedList: addFirst, addLast, removeFirst, peekFirst, find, size, isEmpty, toArray
//serta kasus kosong dan satu elemen
import { LinkedList, Queue, LinkedQueue } from "./structures.js";

const linkedList = new LinkedList();

//Uji Kasus Kosong
console.log("Uji Kasus Kosong");
console.log("size:", linkedList.size());
console.log("isEmpty:", linkedList.isEmpty());

//Uji addFirst dan addLast
linkedList.addFirst(1);
linkedList.addLast(2);
linkedList.addFirst(0);
console.log("\nSetelah addFirst dan addLast");
console.log("toArray:", linkedList.toArray());
console.log("size:", linkedList.size());
console.log("isEmpty:", linkedList.isEmpty());

//Uji removeFirst
const removed = linkedList.removeFirst();
console.log("\nSetelah removeFirst");
console.log("Removed:", removed);
console.log("toArray:", linkedList.toArray());
console.log("size:", linkedList.size());

//Uji Find
const found = linkedList.find((data) => data === 2);
console.log("\nHasil Find (mencari 2):", found);
console.log("Elemen ditemukan:", found !== undefined);

