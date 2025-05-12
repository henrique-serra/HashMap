import HashMap from "./HashMap.js";
import HashSet from "./HashSet.js";

const test = new HashMap();
const hashSet = new HashSet();

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

hashSet.set('apple');
hashSet.set('banana');
hashSet.set('carrot');
hashSet.set('dog');
hashSet.set('elephant');
hashSet.set('frog');
hashSet.set('grape');
hashSet.set('hat');
hashSet.set('ice cream');
hashSet.set('jacket');
hashSet.set('kite');
console.log(hashSet.set('lion'));