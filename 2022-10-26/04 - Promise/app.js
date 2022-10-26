
// Before ES6:
// function main() {
//     console.log("Start");
//     getFirstRandomEvenNumberAfterDelay(
//         100,
//         n => console.log("Result: " + n),
//         err => console.log("Error: " + err.message));
//     console.log("End");
// }
// main();

// function getFirstRandomEvenNumberAfterDelay(limit, successCallback, errorCallback) {
//     setTimeout(() => {
//         const num = Math.floor(Math.random() * limit) + 1;
//         if(num % 2 === 0) { // success
//             successCallback(num);
//         }
//         else { // fail
//             errorCallback(new Error("Failed to generate even number. generated number: " + num));
//         }
//     }, 3000);
// }



// // After ES6:
// function main() {
//     console.log("Start");

//     getFirstRandomEvenNumberAfterDelay(100)
//         .then(n => console.log("Result: " + n))
//         .catch(err => console.log("Error: " + err.message));

//     console.log("End");
// }
// main();


// // After ES6 (but with callback-hell):
// function main() {

//     getFirstRandomEvenNumberAfterDelay(1000)
//         .then(n1 => {
//             console.log("Result 1: " + n1);
//             getFirstRandomEvenNumberAfterDelay(n1)
//                 .then(n2 => {
//                     console.log("Result 2: " + n2);
//                     getFirstRandomEvenNumberAfterDelay(n2)
//                         .then(n3 => {
//                             console.log("Result 3: " + n3);
//                         })
//                         .catch(err => console.log("Error: " + err.message));
//                 })
//                 .catch(err => console.log("Error: " + err.message));
//         })
//         .catch(err => console.log("Error: " + err.message));
// }
// main();

// After ES6 (but with callback-hell):
async function main() {
    try {
        const n1 = await getFirstRandomEvenNumberAfterDelay(1000);
        console.log("Result 1: " + n1);

        const n2 = await getFirstRandomEvenNumberAfterDelay(n1);
        console.log("Result 2: " + n2);

        const n3 = await getFirstRandomEvenNumberAfterDelay(n2);
        console.log("Result 3: " + n3);
    }
    catch (err) {
        console.log("Error: " + err.message)
    }
}
main();



function getFirstRandomEvenNumberAfterDelay(limit) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const num = Math.floor(Math.random() * limit) + 1;
            if (num % 2 === 0) { // success
                resolve(num);
            }
            else { // fail
                reject(new Error("Failed to generate even number. generated number: " + num));
            }
        }, 3000);
    });
}






