#!/usr/bin/env node
const program = require("commander");
const pkg = require("../package.json");

program
    .version(pkg.version)
    .command("framework", "Manage framework in project")
    .command("lang", "Manage language in project")
    .command("path", "Manage path in project")
    .command("init", "Initialize the template")
    .command("ctrler", "Create or remove controller")
    .parse(process.argv);

 