const Configstore = require("configstore");
const pkg = require("../../package.json");
const colors = require('colors');

class LanguageManager {
  constructor() {
    this.conf = new Configstore(pkg.name);
  }

  setLanguage(language) {
    this.conf.set("language", language);
    return language;
  }

  getLanguage() {
    const language = this.conf.get("language");

    if (!language) {
      throw new Error("No language found - Set language with command datawise-cli lang set");
    }

    return language;
  }

  deleteLanguage() {
    const language = this.conf.get("language");

    if (!language) {
      throw new Error("No language found - Set language with command datawise-cli lang set");
    }

    this.conf.delete("language");

    return;
  }
}

module.exports = LanguageManager;