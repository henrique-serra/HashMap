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
    if((this.primeCapacity + 1) < HashMap.primeCapacities.length) this.primeCapacity += 1;
    this.capacity = HashMap.primeCapacities[this.primeCapacity];
    
    // IMPLEMENT CODE FOR POPULATING THE BUCKETS AGAIN WHEN THE CAPACITY INCREASES

    return this.capacity;
  }

  set(key, value) {
    let bucket = this.buckets[this.hash(key)];

    for (const entry of bucket) {
      if(entry.key === key) {
        entry.value = value;
        return;
      }
    }

    // IF the added entry exceeds capacity, increase capacity before adding it. IMPLEMENT CODE...depends on the length() function to be created

    bucket.push({ key, value });
    return this.buckets;
  }
}