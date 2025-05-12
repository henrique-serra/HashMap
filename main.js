import HashMap from "./HashMap.js";

// Use the following snippet whenever you access a bucket through an index. We want to throw an error if we try to access an out-of-bounds index:
// if (index < 0 || index >= buckets.length) {
//   throw new Error("Trying to access index out of bounds");
// }

const test = new HashMap();

test.set('apple', 'red');
test.set('banana', 'yellow');
test.set('carrot', 'orange');
test.set('dog', 'brown');
test.set('elephant', 'gray');
test.set('frog', 'green');
test.set('grape', 'purple');
test.set('hat', 'black');
test.set('ice cream', 'white');
test.set('jacket', 'blue');
test.set('kite', 'pink');
test.set('lion', 'golden');
test.set('parrot', 'blue');