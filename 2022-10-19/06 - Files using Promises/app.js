const fsPromises = require("fs/promises");

async function main() {

    try {

        await fsPromises.writeFile("./data.txt", "Hello Node.js\nCool System\n");
        console.log("Done Writing.");

        await fsPromises.appendFile("./data.txt", "Bye Bye...");
        console.log("Done Appending.");

        const content = await fsPromises.readFile("./data.txt", "utf-8");
        console.log("Done Reading. Content: ");
        console.log(content);
        
    }
    catch (err) {
        console.log(err.message);
    }

}

main();
