const program = require("commander");
const path = require("../src/commands/path");

program
  .command("set")
  .description("Set path in project")
  .option('-p, --path <path>', 'set config path')
  .action((options) => {
    path.set(options)
  });

program
  .command("show")
  .description("Show the saved path")
  .action(path.show);

program
  .command("remove")
  .description("Remove path")
  .action(path.remove);

program.parse(process.argv);

// If no args, output help
if (!process.argv[2]) {
  program.outputHelp();
}