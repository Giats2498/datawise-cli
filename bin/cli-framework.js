const program = require("commander");
const framework = require("../src/commands/framework");

program
  .command("set")
  .description("Set framework in project")
  .option("-r,--react", "Set React as framework")
  .option("-n,--next", "Set Next as framework")
  .action((options) => {
    framework.set(options)
  });

program
  .command("show")
  .description("Show the saved framework")
  .action(framework.show);

program
  .command("remove")
  .description("Remove framework")
  .action(framework.remove);

program.parse(process.argv);

// If no args, output help
if (!process.argv[2]) {
  program.outputHelp();
}