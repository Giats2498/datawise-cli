const inquirer = require("inquirer");
const colors = require('colors');
const FrameworkManager = require("../lib/FrameworkManager");
const LanguageManager = require("../lib/LanguageManager");
const PathManager = require("../lib/PathManager");
const {checkIfExists}  = require("../utils/common");
const {createDirectoryContents}  = require("../utils/common");

const language = require("./language");
const framework = require("./framework");
const path = require("./path");
 
const init = {
  async set() {
   
    const frameworkManager = new FrameworkManager();
    const languageManager = new LanguageManager();
    const pathManager = new PathManager();
    let currentFramework = undefined;
    let currentLanguage = undefined;
    let currentPath = undefined;
    try{
      currentFramework = frameworkManager.getFramework();
      currentLanguage = languageManager.getLanguage();
      currentPath = pathManager.getPath();
    } catch (err) {
      if(!currentFramework){
        await framework.set({});
        currentFramework = frameworkManager.getFramework();
      }
      if(!currentLanguage){
        await language.set({});
        currentLanguage = languageManager.getLanguage();
      }
      if(!currentPath){
        await path.set({});
        currentPath = pathManager.getPath();
      }
    }
  
    const templatePath = `.\\src\\templates\\${currentFramework}\\${currentLanguage}`
    const flag = checkIfExists(templatePath,currentPath);
    console.log(flag);
    if(flag === 1 || flag === 2){
      const input = await inquirer.prompt([
        {
          type: "confirm",
          name: "flag",
          message: "Some Files already exists. Do you want to overwrite",
          default: true,
        }
      ]);
      if(input.flag){
        console.log("Created 7 files");
        createDirectoryContents(templatePath,currentPath)
        console.log("Template is initialized".yellow);
      }
    }else{
      console.log("Created 7 files");
      createDirectoryContents(templatePath,currentPath)
      console.log("Template is initialized".yellow);
    }
    
  
  }
};

module.exports = init;