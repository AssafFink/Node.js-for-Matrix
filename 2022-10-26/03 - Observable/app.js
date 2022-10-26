

const { filter, map, takeLast, take, reduce, tap, scan } = require("rxjs");
const randomNumbers = require("./random-numbers");


const observable = randomNumbers(20);

// Subscribe and get the pure reported data:
// const subscription = observable.subscribe(
//     num => console.log(num),
//     err => console.log(err.message),
//     () => console.log("Done"));

// const arr = [1, 2, 3, 4, 13, 46];
// const result = arr.filter(n => n % 2 === 0);
// console.log(result);

// // Subscribe and get only even numbers (on-the-fly): 
// const subscription = observable.pipe(filter(n => n % 2 === 0)).subscribe(
//     num => console.log(num),
//     err => console.log(err.message),
//     () => console.log("Done"));


// // Subscribe and get only even numbers (on-the-fly): 
// const subscription = observable.pipe(map(n => n ** 2)).subscribe(
//     num => console.log(num),
//     err => console.log(err.message),
//     () => console.log("Done"));

// // Subscribe and get only even numbers (on-complete): 
// const subscription = observable.pipe(takeLast(5)).subscribe(
//     num => console.log(num),
//     err => console.log(err.message),
//     () => console.log("Done"));

// // Subscribe and get only even numbers (on-complete): 
// const subscription = observable.pipe(take(5)).subscribe(
//     num => console.log(num),
//     err => console.log(err.message),
//     () => console.log("Done"));


// // Subscribe and get only even numbers (on-complete): 
// const subscription = observable.pipe(reduce((sum, n) => n + sum, 0)).subscribe(
//     num => console.log(num),
//     err => console.log(err.message),
//     () => console.log("Done"));

// // Subscribe and get only even numbers (on-complete): 
// const subscription = observable.pipe(tap(n => console.log(n)), reduce((sum, n) => n + sum, 0)).subscribe(
//     num => console.log(num),
//     err => console.log(err.message),
//     () => console.log("Done"));


// Subscribe and get only even numbers (on-the-fly): 
const subscription = observable.pipe(scan((sum, n) => n + sum, 0)).subscribe(
    num => console.log(num),
    err => console.log(err.message),
    () => console.log("Done"));

    

// Stop listening:
// subscription.unsubscribe();
