const program = require("commander");
const ctrler = require("../src/commands/ctrler");

program
  .command("crt")
  .description("Create controller in project")
  .option('-n, --name <name>', 'Set name')
  .option('-p, --path <path>', 'Set config path')
  .action((options) => {
    ctrler.create(options)
  });

program
  .command("rm")
  .description("Remove controller in project")
  .option('-n, --name <name>', 'Set name')
  .option('-p, --path <path>', 'Set config path')
  .action((options) => {
    ctrler.remove(options)
  });


program.parse(process.argv);

// If no args, output help
if (!process.argv[2]) {
  program.outputHelp();
}