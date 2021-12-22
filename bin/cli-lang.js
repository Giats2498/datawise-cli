const program = require("commander");
const language = require("../src/commands/language");

program
  .command("set")
  .description("Set language in project")
  .option("-js,--javascript", "Set Javascript as language")
  .option("-ts,--typescript", "Set Typescript as language")
  .action((options) => {
    language.set(options)
  });

program
  .command("show")
  .description("Show the saved language")
  .action(language.show);

program
  .command("remove")
  .description("Remove language")
  .action(language.remove);

program.parse(process.argv);

// If no args, output help
if (!process.argv[2]) {
  program.outputHelp();
}