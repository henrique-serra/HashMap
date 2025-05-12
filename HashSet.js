export default class HashSet {
  static primeCapacities = [17, 37, 79, 163, 331, 673, 1361, 2729, 5471, 10949, 21911, 43853, 87719, 175447, 350899, 701819, 1403641, 2807303, 5614657, 11229331];
  
  constructor(primeCapacity = 0, loadFactor = 0.75) {
    this.primeCapacity = primeCapacity;
    // IF user enters an invalid index, set capacity as minimum
    this.capacity = HashSet.primeCapacities[this.primeCapacity] ? HashSet.primeCapacities[this.primeCapacity] : 17;
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
    if((this.primeCapacity + 1) < HashSet.primeCapacities.length) this.primeCapacity += 1;
    this.capacity = HashSet.primeCapacities[this.primeCapacity];

    return this.capacity;
  }

  reduceCapacity() {
    this.primeCapacity -= 1;
    this.capacity = HashSet.primeCapacities[this.primeCapacity];
    return this.capacity;
  }

  populateBuckets() {
    let keys = this.keys();
    this.clear();

    keys.forEach(key => this.set(key));
    return this.buckets;
  }

  set(key) {
    let bucket = this.buckets[this.hash(key)];

    for (let i = 0; i < bucket.length; i++) {
      if(bucket[i] === key) {
        bucket[i] = key;
        return this.buckets;
      }
    }

    let length = this.length();
    let maxCapacity = Math.floor(this.capacity * this.loadFactor);

    if(length === maxCapacity) {
      this.increaseCapacity();
      this.populateBuckets();
      bucket = this.buckets[this.hash(key)];
    }

    bucket.push(key);
    return this.buckets;
  }

  has(key) {
    let bucket = this.buckets[this.hash(key)];
    return bucket.includes(key);
  }

  remove(key) {
    let bucket = this.buckets[this.hash(key)];
    let keyIndex = bucket.findIndex((key) => key);

    if(keyIndex === -1) return false;

    bucket.splice(keyIndex, 1);

    let length = this.length();
    let priorMaxCapacity = Math.floor(HashSet.primeCapacities[this.primeCapacity - 1] * this.loadFactor);

    if(length === priorMaxCapacity) {
      this.reduceCapacity();
      this.populateBuckets();
    }

    return true;
  }

  length() {
    return this.buckets.reduce((length, currentBucket) => length + currentBucket.length, 0)
  }

  clear() {
    this.buckets = Array(this.capacity).fill(null).map(() => []);
    return this.buckets;
  }

  keys() {
    return this.buckets.flatMap((bucket) => bucket.map((key) => key));
  }
}