const program = require("commander");
const ctrler = require("../src/commands/ctrler");

program
  .command("crt")
  .option('-n, --name <name>', 'set name')
  .option('-p, --path <path>', 'set config path')
  .action((options) => {
    ctrler.create(options)
  });

program
  .command("rm")
  .option('-n, --name <name>', 'set name')
  .option('-p, --path <path>', 'set config path')
  .action((options) => {
    ctrler.remove(options)
  });


program.parse(process.argv);

// If no args, output help
if (!process.argv[2]) {
  program.outputHelp();
}