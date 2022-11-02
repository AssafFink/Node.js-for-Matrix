import filesLogic from "./logic/files-logic";

async function main() {
    try {
        await filesLogic.saveFile();
        const result = await filesLogic.readFile();
        console.log(result);
    }
    catch(err: any) {
        console.log(err.message);
    }
}
main();








