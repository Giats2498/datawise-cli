const program = require("commander");
const init = require("../src/commands/init");

program
  .action(() => init.set());

program.parse(process.argv);

// If no args, output help
if (!process.argv[1]) {
  program.outputHelp();
}