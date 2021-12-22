const Configstore = require("configstore");
const pkg = require("../../package.json");
const colors = require('colors');

class FrameworkManager {
  constructor() {
    this.conf = new Configstore(pkg.name);
  }

  setFramework(framework) {
    this.conf.set("framework", framework);
    return framework;
  }

  getFramework() {
    const framework = this.conf.get("framework");

    if (!framework) {
      throw new Error("No framework found - Set framework with command datawise-cli framework set");
    }

    return framework;
  }

  deleteFramework() {
    const framework = this.conf.get("framework");

    if (!framework) {
      throw new Error("No framework found - Set framework with command datawise-cli framework set");
    }

    this.conf.delete("framework");

    return;
  }
}

module.exports = FrameworkManager;