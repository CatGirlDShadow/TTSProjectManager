import { Command } from "commander"; // add this line
import figlet from "figlet";
import { resolve } from "path";
import { build } from "./builder";
import { loadFile } from "./loader";
import { Watch } from "./watcher";

//add the following line
const program = new Command("ProjectManager")
  .version("1.0.0")
  .usage("command")
  .description("Project manager for Tabletop Simulator. Load & Build projects with ease!");
const buildCommand = program.command("build")
  .summary("Build project")
  .description("Builds project from directory with table settings & objects to .json savefile")
  .usage("[options]")
  .option("-i --input [input]", "Directory where project is located. Default is cwd", "./")
  .option("-o --output [output]", "Filename for output file. Default is Build.json", "Build.json")
  .option("-c --constants [constants]", "Directory where constants for project are located. Default is project/Constants", "./Constants")
  .option("-no --no-objects", "Supress objects missing warning.", true)
  .option("-ne --no-edit", "Do not update build time.", true)
  .action((options: {
    input: string,
    output: string,
    constants: string,
    objects: boolean,
    edit: boolean
  }) => {
    if (build(options)) {
      console.log(`Project builded successefully! Output file: ${resolve(options.output)}`);
    }
    else {
      console.error(`There was a problem building project ${resolve(options.input)}`);
    }
    //console.log(options);
  });
const loadCommand = program.command("load")
  .summary("Load project from savefile")
  .description("Loads project from .json file to directory with objects & main table settings.")
  .usage("[options] <input>")
  .argument("<input>", "Path to savefile.")
  .option("-o --output [output]", "Path for output directory. Default is Project", "Project")
  .option("-c --constants [constants]", "Directory where constants for project are located. Default is cwd/Constants", "./Constants")
  .action((input: string, options: { output: string, constants: string }) => {
    if (loadFile({ input: input, output: options.output, constants: options.constants })) {
      console.log(`Project loaded successefully to ${options.output}.`);
    }
    else {
      console.error(`There was a problem loading project ${resolve(input)}`);
    }
    // console.log(input);
    // console.log(options);
  });
const watchCommand = program.command("watch")
  .summary("Conntect to TTS to edit project's code easily")
  .description("Loads project from TTS to local directory. Constants are not supported")
  .usage("[options]")
  .option("-o --output [output]", "Path for output directory. Default is Watching", "Watching")
  .action((options: { output: string }) => {
    Watch(options);
  });

console.log(figlet.textSync("TTS Project Manager"));
program.parse(process.argv);