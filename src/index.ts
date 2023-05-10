#!/usr/bin/env node
import { log } from "console";
import { copy, readFileSync, writeFileSync } from "fs-extra";
import inquirer from "inquirer";
import { join } from "path";
import { promisify } from "util";
export * from "colors";

const waitWriteFile = promisify(writeFileSync)

interface Answers {
    projectName: string
    djsVersion: "v14" | "v15",
}

async function main() {
    const { projectName, djsVersion } = await inquirer.prompt<Answers>([
        {
            name: "projectName",
            message: "Project Name",
            type: "input",
            default: "my-discord-bot",
            suffix: "...".gray,
            validate(projectName) {
                if (typeof projectName !== "string") {
                    return "Please, insert a string"
                }
                if (projectName.includes(" ")){
                    return "Please, don't use spaces in Project Name"
                }
                return true;
            },
        },
        {
            name: "djsVersion",
            message: "Discord.js Version",
            type: "list",
            suffix: "...".gray,
            choices: [
                {
                    name: "v14",
                    value: "v14",
                },
                {
                    name: "v15",
                    value: "v15",
                    disabled: "not released",
                }
            ]
        },
    ])
    const templatesPath = join(__dirname, "../templates")
    
    
    const build = {
        async v14(){
            log("wait...".yellow);

            const path = join(templatesPath, "v14");
            const destination = join(process.cwd(), projectName);

            await copy(join(path, "project"), destination, {overwrite: true});

            const packageJson = JSON.parse(readFileSync(join(destination, "package.json"), {encoding: "utf-8"}))
            packageJson.name = projectName;

            writeFileSync(join(destination, "package.json"), JSON.stringify(packageJson, null, 2));

            log([
                "Project successfully created!".green,
                "Install dependencies using npm install".blue,
                "cd name && npm install",
                "npm run dev",
                "",
                "see README.md".cyan
            ].join("\n"))


        },
        async v15(){
            log("wip");
        }
    }

    build[djsVersion]();
}
main();



