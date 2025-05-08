import HashMap from "./HashMap.js";

// Use the following snippet whenever you access a bucket through an index. We want to throw an error if we try to access an out-of-bounds index:
// if (index < 0 || index >= buckets.length) {
//   throw new Error("Trying to access index out of bounds");
// }

let map = new HashMap();