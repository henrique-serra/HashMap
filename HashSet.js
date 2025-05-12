export default class HashSet {
  static primeCapacities = [17, 37, 79, 163, 331, 673, 1361, 2729, 5471, 10949, 21911, 43853, 87719, 175447, 350899, 701819, 1403641, 2807303, 5614657, 11229331];
  
  constructor(primeCapacity = 0, loadFactor = 0.75) {
    this.primeCapacity = primeCapacity;
    // IF user enters an invalid index, set capacity as minimum
    this.capacity = HashMap.primeCapacities[this.primeCapacity] ? HashMap.primeCapacities[this.primeCapacity] : 17;
    this.loadFactor = loadFactor;
    this.buckets = Array(this.capacity).fill(null).map(() => []);
  }

  hash(key) {
    let hashCode = 0;
    const primeNumber = 31;

    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
    }

    return hashCode;
  }

  increaseCapacity() {
    // IF primeCapacity isn't the last primeCapacities already, make primeCapacity equals to the next prime number in primeCapacities
    if((this.primeCapacity + 1) < HashMap.primeCapacities.length) this.primeCapacity += 1;
    this.capacity = HashMap.primeCapacities[this.primeCapacity];

    return this.capacity;
  }

  reduceCapacity() {
    this.primeCapacity -= 1;
    this.capacity = HashMap.primeCapacities[this.primeCapacity];
    return this.capacity;
  }

  populateBuckets() {

  }

  set(key) {
    let bucket = this.hash(key);
  }

  get(key) {

  }

  has(key) {

  }

  remove(key) {

  }

  length() {

  }

  clear() {

  }

  keys() {

  }
}