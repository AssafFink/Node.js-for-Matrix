const fs = require("fs");

// Callback HELL

// Write file: 
fs.writeFile("./data.txt", "Hello Node.js\nCool System\n", (err) => {

    if (err) {
        console.log(err.message);
        return;
    }
    console.log("Done Writing.");

    // Append file:
    fs.appendFile("./data.txt", "Bye Bye...", (err) => {
        if (err) {
            console.log(err.message);
            return;
        }
        console.log("Done Appending");

        // Read file: 
        fs.readFile("./data.txt", "utf-8", (err, content) => {
            if (err) {
                console.log(err.message);
                return;
            }
            console.log("Done Reading. Content: ");
            console.log(content);
        });

    });

});


console.log("End of app.js");




