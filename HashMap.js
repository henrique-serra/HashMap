export default class HashMap {
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
    let entries = this.entries();
    this.buckets = Array(this.capacity).fill(null).map(() => []);

    entries.forEach((entry) => {
      const [key, value] = entry;
      this.set(key, value);
    });

    return this.buckets;
  }

  set(key, value) {
    let bucket = this.buckets[this.hash(key)];

    for (const entry of bucket) {
      if(entry.key === key) {
        entry.value = value;
        return;
      }
    }

    let maxCapacity = Math.floor(this.capacity * this.loadFactor);
    let bucketsLength = this.length();

    // IF the added entry exceeds capacity, increase capacity before adding it and populate buckets again
    if(bucketsLength === maxCapacity) {
      this.increaseCapacity();
      this.populateBuckets();
      bucket = this.buckets[this.hash(key)];
    }

    bucket.push({ key, value });
    return this.buckets;
  }

  get(key) {
    let bucket = this.buckets[this.hash(key)];

    for (const entry of bucket) {
      if(entry.key === key) return entry.value;
    }

    return false;
  }

  has(key) {
    let bucket = this.buckets[this.hash(key)];

    for (const entry of bucket) {
      if(entry.key === key) return true;
    }

    return false;
  }

  remove(key) {
    let bucket = this.buckets[this.hash(key)];

    bucket.forEach((entry, index) => {
      if(entry.key === key) {
        bucket.splice(index, 1);
        // IF, after removal, the length of buckets is equal to prior max capacity, reduce capacity and repopulate buckets
        let length = this.length();
        let priorMaxCapacity = Math.floor(HashMap.primeCapacities[this.primeCapacity - 1] * this.loadFactor);
        if(length === priorMaxCapacity) {
          this.reduceCapacity();
          this.populateBuckets();
        }
        return true;
      }
    });

    return false;
  }

  length() {
    return this.buckets.reduce((length, currentBucket) => length + currentBucket.length, 0);
  }

  clear() {
    this.buckets = Array(this.capacity).fill(null).map(() => []);
    return this.buckets;
  }

  keys() {
    return this.buckets.flatMap(bucket => bucket.map(entry => entry.key));
  }

  values() {
    return this.buckets.flatMap(bucket => bucket.map(entry => entry.value));
  }

  entries() {
    return this.buckets.flatMap(bucket => bucket.map(entry => [entry.key, entry.value]));
  }
}