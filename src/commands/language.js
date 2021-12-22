const inquirer = require("inquirer");
const colors = require('colors');
const LanguageManager = require("../lib/LanguageManager");
 
const language = {
  async set(options) {
    const languageManager = new LanguageManager();
    if(options.javascript){
        languageManager.setLanguage("Javascript");
        console.log("Language is set:".blue,"Javascript".yellow);
    }else if(options.typescript){
        languageManager.setLanguage("Typescript");
        console.log("Language is set:".blue,"Typescript".yellow);
    }else{
        const input = await inquirer.prompt([
            {
              type: "list",
              name: "language",
              message: "Select language",
              choices: ["Javascript","Typescript"]
            }
        ]);

        const language = languageManager.setLanguage(input.language);

        if (language) {
            console.log("Language is set:".blue, input.language.yellow);
        }else{
            console.error("Something went wrong".red);
        }
    }
   
  },

  show() {
    try {
      const languageManager = new LanguageManager();
      const language = languageManager.getLanguage();

      console.log("Current language:", language.yellow);

      return language;
    } catch (err) {
      console.error(err.message.red);
    }
  },


  remove() {
    try {
      const languageManager = new LanguageManager();
      languageManager.deleteLanguage();

      console.log("Language Removed".blue);

      return;
    } catch (err) {
      console.error(err.message.red);
    }
  }
};

module.exports = language;