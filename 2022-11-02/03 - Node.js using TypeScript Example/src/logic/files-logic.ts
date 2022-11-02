import fsPromises from "fs/promises";

async function saveFile(): Promise<void> {
    await fsPromises.writeFile("./data.txt", "Amazing Programming");
}

async function readFile(): Promise<string> {
    const content: string = await fsPromises.readFile("./data.txt", "utf-8");
    return content;
}

export default {
    saveFile,
    readFile
};

