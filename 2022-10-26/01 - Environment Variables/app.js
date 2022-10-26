const dotenv = require("dotenv");
dotenv.config(); // Read .env file

console.log(global.process.env);
console.log(global.process.env.PORT);
console.log(process.env.SUPPORT_PAGE);
console.log(process.env.SUPPORT_EMAIL);
