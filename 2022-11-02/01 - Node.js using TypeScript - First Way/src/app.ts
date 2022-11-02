// Running through TypeScript compiler
// Installation: npm i -g tsc

let age: number = 20;
age = 25;
// age = "Hi"; // Error
console.log("Age: " + age);


let numOfCats = 3;
numOfCats = 4;
// numOfCats = "Hi"; // Error
console.log("Num of cats: " + numOfCats);


let firstName; // Don't do it
firstName = "Moishe";
firstName = 123;
console.log("First name: " + firstName);


let lastName: any; // Don't do it
lastName = "Ufnik";
lastName = 456;
console.log("Last name: " + lastName);


let something: number | string | Date; // Union Type
something = 123;
something = "Hi";
something = new Date();
// something = true; // Error
console.log(something);


function getSomething() {
    return new Promise((resolve, reject) => {
        setTimeout(()=>{
            resolve("Cool")
        }, 1000);
    });
}

