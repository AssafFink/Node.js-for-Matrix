const colors = require("colors");

function currTime() {
    const now = new Date();
    const time = now.toLocaleTimeString();
    console.log(colors.cyan(time));
}

module.exports = currTime;