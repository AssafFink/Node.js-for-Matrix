const readline = require("readline");

const terminal = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Old success/error callbacks: 
// function getUserValue(msg, successCallback, errorCallback) {
//     try {
//         terminal.question(msg, value => {
//             successCallback(value);
//         });
//     }
//     catch (err) {
//         errorCallback(err);
//     }
// }

// Promisify:
function getUserValue(msg) {
    return new Promise((resolve, reject) => {
        try {
            terminal.question(msg, value => {
                resolve(value);
            });
        }
        catch (err) {
            reject(err);
        }
    });
}

module.exports = {
    getUserValue
};
