const Configstore = require("configstore");
const pkg = require("../../package.json");
const colors = require('colors');

class PathManager {
  constructor() {
    this.conf = new Configstore(pkg.name);
  }

  setPath(path) {
    this.conf.set("path", path);
    return path;
  }

  getPath() {
    const path = this.conf.get("path");

    if (!path) {
      throw new Error("No path found - Set path with command datawise-cli path set");
    }

    return path;
  }

  deletePath() {
    const path = this.conf.get("path");

    if (!path) {
      throw new Error("No path found - Set path with command datawise-cli path set");
    }

    this.conf.delete("path");

    return;
  }
}

module.exports = PathManager;