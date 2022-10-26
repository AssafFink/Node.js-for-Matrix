
const reader = require("./reader");

async function main() {

    // // Callback hell:
    // reader.getUserValue("Enter your first name: ", firstName => {
    //     console.log("First name: " + firstName);
    //     reader.getUserValue("Enter your last name: ", lastName => {
    //         console.log("Last name: " + lastName);
    //     }, err => console.log(err.message));
    // }, err => console.log(err.message));

    try {
        const firstName = await reader.getUserValue("Enter your first name: ");
        const lastName = await reader.getUserValue("Enter your last name: ");
        console.log("Your full name: " + firstName + " " + lastName);
    }
    catch(err) {
        console.log(err.message);
    }

}
main();
