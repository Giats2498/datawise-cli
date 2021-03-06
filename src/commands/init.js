const inquirer = require("inquirer");
const colors = require('colors');
const gpath = require('path');
const FrameworkManager = require("../lib/FrameworkManager");
const LanguageManager = require("../lib/LanguageManager");
const PathManager = require("../lib/PathManager");
const {checkIfExists}  = require("../utils/common");
const {createDirectoryContents}  = require("../utils/common");
const  figlet = require('figlet');

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
    const currDir = gpath.resolve(__dirname, '..');
    const templatePath = `${currDir}\\templates\\${currentFramework}\\${currentLanguage}`
    const flag = checkIfExists(templatePath,currentPath);
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
        await figlet('DATAWISE', function(err, data) {
            if (err) {
                console.log('Something went wrong...');
                console.dir(err);
                return;
            }
            console.log(data)
            console.log("Created 7 files");
            createDirectoryContents(templatePath,currentPath,undefined)
            console.log("Template is initialized".yellow);
        });
        
      }
    }else{
      await figlet('DATAWISE', function(err, data) {
        if (err) {
            console.log('Something went wrong...');
            console.dir(err);
            return;
        }
        console.log(data)
        console.log("Created 7 files");
        createDirectoryContents(templatePath,currentPath,undefined)
        console.log("Template is initialized".yellow);
      });
    
    }
    
  
  }
};

module.exports = init;