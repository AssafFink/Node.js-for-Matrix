console.log("Hello Node.js !");

// Custom Module:
const calc = require("./logic/calc");
console.log(calc.add(10, 20));
console.log(calc.sub(10, 20));

// Built-In Module:
const os = require("os");
console.log("Free Memory: " + os.freemem());
console.log("Home Dir: " + os.homedir());
console.log("Username: " + os.userInfo().username);

// NPM Module: 
const leet = require("leet");
const str = leet.convert("Hello, this is my first NPM module ever");
console.log(str);

