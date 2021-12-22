const inquirer = require("inquirer");
const colors = require('colors');
const gpath = require('path');
const {isValidName} = require("../utils/validation")
const FrameworkManager = require("../lib/FrameworkManager");
const LanguageManager = require("../lib/LanguageManager");
const PathManager = require("../lib/PathManager");
const {checkIfExists}  = require("../utils/common");
const {createDirectoryContents}  = require("../utils/common");

const language = require("./language");
const framework = require("./framework");
const path = require("./path");
const fs = require('fs');
const CURR_DIR = process.cwd();

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function  createController (controllerPath, name) {
  const oldPath = `${CURR_DIR}${controllerPath}\\test`;
  const newPath = `${CURR_DIR}${controllerPath}\\${name}`
  fs.renameSync(oldPath, newPath);
  fs.readdirSync(newPath).forEach(file => {
    fs.readFile(`${newPath}\\${file}`, 'utf8', function (err,data) {
      if (err) {
        return console.log(err);
      }
      var result = data.replace(/Test/g, capitalizeFirstLetter(name));
    
      fs.writeFile(`${newPath}\\${file}`, result, 'utf8', function (err) {
          if (err) return console.log(err);
      });
    });
  }); 
}  


function  removeLines (currentPath, name, currentLanguage) {
  let langFile = "js";
  if( currentLanguage === "Typescript"){
    langFile = "ts";
  } 

  let endpointLines = [];
  try{
    fs.readFileSync(`${currentPath}\\@core\\endpoint.${langFile}`, 'utf-8').split(/\r?\n/).forEach(function(line){
      endpointLines.push(line);
    });
    const endpointIndex = endpointLines.findIndex(element => element.includes(name));
    if(endpointIndex !== -1){
      endpointLines.splice(endpointIndex,1);
      fs.truncateSync(`${currentPath}\\@core\\endpoint.${langFile}`,0);
      endpointLines.forEach (line => {
        fs.appendFileSync(`${currentPath}\\@core\\endpoint.${langFile}`, line+"\n");
      });
      console.log("-".red,`${currentPath}\\@core\\endpoint.${langFile}`);
    }else{
      console.log(`Didn't remove controller from ${currentPath}\\@core\\endpoint.${langFile}`.red);
    }
  }catch(err){
    console.log(`Can't find file endpoint.${langFile} in ${currentPath}\\@core\\endpoint.${langFile}`.red);
  }
 

  let entityTypeLines = [];
  try{
    fs.readFileSync(`${currentPath}\\@core\\entityType.${langFile}`, 'utf-8').split(/\r?\n/).forEach(function(line){
      entityTypeLines.push(line);
    });
    const entityTypeIndex = entityTypeLines.findIndex(element => element.includes(capitalizeFirstLetter(name)));
    if(entityTypeIndex !== -1){
     
      entityTypeLines.splice(entityTypeIndex,1);
      fs.truncateSync(`${currentPath}\\@core\\entityType.${langFile}`,0);
      entityTypeLines.forEach (line => {
        fs.appendFileSync(`${currentPath}\\@core\\entityType.${langFile}`, line+"\n");
      });
      console.log("-".red,`${currentPath}\\@core\\entityType.${langFile}`);
    }else{
      console.log(`Didn't remove controller from ${currentPath}\\@core\\entityType.${langFile}`.red);
    }
  }catch(err){
    console.log(`Can't find file entityType.${langFile} in ${currentPath}\\@core\\entityType.${langFile}`.red);
  }
  

  let schemaLines = [];
  try{
    fs.readFileSync(`${currentPath}\\@core\\schema.${langFile}`, 'utf-8').split(/\r?\n/).forEach(function(line){
      schemaLines.push(line);
    });
    const schemaFirstIndex = schemaLines.findIndex(element => element.includes(capitalizeFirstLetter(name)));
    const schemaLastIndex = schemaLines.findIndex((element,index) => {return element.includes("}") && index > schemaFirstIndex});
    if(schemaFirstIndex !== -1 && schemaLastIndex !==-1){
      schemaLines.splice(schemaFirstIndex, schemaLastIndex-schemaFirstIndex+1)
      fs.truncateSync(`${currentPath}\\@core\\schema.${langFile}`,0);
      schemaLines.forEach (line => {
        fs.appendFileSync(`${currentPath}\\@core\\schema.${langFile}`, line+"\n");
      });
      console.log("-".red,`${currentPath}\\@core\\schema.${langFile}`);
    }else{
      console.log(`Didn't remove controller from ${currentPath}\\@core\\schema.${langFile}`.red);
    }
  }catch(err){
    console.log(`Can't find file schema.${langFile} in ${currentPath}\\@core\\schema.${langFile}`.red);
  }
  

  let reducersLines = [];
  try{
    fs.readFileSync(`${currentPath}\\reducers.${langFile}`, 'utf-8').split(/\r?\n/).forEach(function(line){
      reducersLines.push(line);
    });
    const reducersIndex = reducersLines.findIndex(element => element.includes(capitalizeFirstLetter(name)));
    if(reducersIndex !== -1){
      reducersLines.splice(reducersIndex,1);
      fs.truncateSync(`${currentPath}\\reducers.${langFile}`,0);
      reducersLines.forEach (line => {
        fs.appendFileSync(`${currentPath}\\reducers.${langFile}`, line+"\n");
      });
      console.log("-".red,`${currentPath}\\reducers.${langFile}`);
    }else{
      console.log(`Didn't remove controller from ${currentPath}\\reducers.${langFile}`.red);
    }
  }catch(err){
    console.log(`Can't find file reducers.${langFile} in ${currentPath}\\reducers.${langFile}`.red);
  }


  let sagasLines = [];
  try{
    fs.readFileSync(`${currentPath}\\sagas.${langFile}`, 'utf-8').split(/\r?\n/).forEach(function(line){
      sagasLines.push(line);
    });
    const sagasIndex = sagasLines.findIndex(element => element.includes(name));
    if(sagasIndex !== -1){
      sagasLines.splice(sagasIndex,1);
      fs.truncateSync(`${currentPath}\\sagas.${langFile}`,0);
      sagasLines.forEach (line => {
        fs.appendFileSync(`${currentPath}\\sagas.${langFile}`, line+"\n");
      });
      console.log("-".red,`${currentPath}\\sagas.${langFile}`);
    }else{
      console.log(`Didn't remove controller from ${currentPath}\\sagas.${langFile}`.red);
    }
  }catch(err){
    console.log(`Can't find file sagas.${langFile} in ${currentPath}\\sagas.${langFile}`.red);
  }
 

  let actionLines = [];
  try{
    fs.readFileSync(`${currentPath}\\actions.${langFile}`, 'utf-8').split(/\r?\n/).forEach(function(line){
      actionLines.push(line);
    });
    const actionIndex = actionLines.findIndex(element => element.includes(name));
    if(actionIndex !== -1){
      actionLines.splice(actionIndex,1);
      fs.truncateSync(`${currentPath}\\actions.${langFile}`,0);
      actionLines.forEach (line => {
        fs.appendFileSync(`${currentPath}\\actions.${langFile}`, line+"\n");
      });
      console.log("-".red,`${currentPath}\\actions.${langFile}`);
    }else{
      console.log(`Didn't remove controller from ${currentPath}\\actions.${langFile}`.red);
    }
  }catch(err){
    console.log(`Can't find file actions.${langFile} in ${currentPath}\\actions.${langFile}`.red);
  }  
  
}  


function  appendNewLines (currentPath, name,currentLanguage) {
  let langFile = "js";
  if( currentLanguage === "Typescript"){
    langFile = "ts";
  }
  let endpointLines = [];
  fs.readFileSync(`${CURR_DIR}${currentPath}\\@core\\endpoint.${langFile}`, 'utf-8').split(/\r?\n/).forEach(function(line){
    endpointLines.push(line);
  });
  const reversedEndpointLines = endpointLines.slice().reverse();
  const endpointIndex = reversedEndpointLines.findIndex(element => element.includes("}"));
  if(endpointIndex !== -1){
    endpointLines.splice((endpointLines.length - endpointIndex - 1),0,`[EntityType.${capitalizeFirstLetter(name)}]: API_URL + "/${name}s,"`)
    fs.truncateSync(`${CURR_DIR}${currentPath}\\@core\\endpoint.${langFile}`,0);
    endpointLines.forEach (line => {
      fs.appendFileSync(`${CURR_DIR}${currentPath}\\@core\\endpoint.${langFile}`, line+"\n");
    });
    console.log(`${currentPath}\\@core\\endpoint.${langFile}`);
  }else{
    console.log(`@core/endpoint.${langFile} must end with '}' or '};'`.red);
  }
  
  let entityTypeLines = [];
  fs.readFileSync(`${CURR_DIR}${currentPath}\\@core\\entityType.${langFile}`, 'utf-8').split(/\r?\n/).forEach(function(line){
    entityTypeLines.push(line);
  });
  const reversedEntityTypeLines = entityTypeLines.slice().reverse();
  const entityTypeIndex = reversedEntityTypeLines.findIndex(element => element.includes("}"));
  if(entityTypeIndex !== -1){
    entityTypeLines.splice((entityTypeLines.length - entityTypeIndex - 1),0,`${capitalizeFirstLetter(name)}: "${capitalizeFirstLetter(name)}",`)
    fs.truncateSync(`${CURR_DIR}${currentPath}\\@core\\entityType.${langFile}`,0);
    entityTypeLines.forEach (line => {
      fs.appendFileSync(`${CURR_DIR}${currentPath}\\@core\\entityType.${langFile}`, line+"\n");
    });
    console.log(`${currentPath}\\@core\\entityType.${langFile}`);
  }else{
    console.log(`@core/entityType.${langFile} must end with '}' or '};'`.red);
  }

  let schemaLines = [];
  fs.readFileSync(`${CURR_DIR}${currentPath}\\@core\\schema.${langFile}`, 'utf-8').split(/\r?\n/).forEach(function(line){
    schemaLines.push(line);
  });
  const reversedSchemaLines = schemaLines.slice().reverse();
  const schemaIndex = reversedSchemaLines.findIndex(element => element.includes("}"));
  if(schemaIndex !== -1){
    schemaLines.splice((schemaLines.length - schemaIndex - 1),0,`[EntityType.${capitalizeFirstLetter(name)}]: {\n\n},`)
    fs.truncateSync(`${CURR_DIR}${currentPath}\\@core\\schema.${langFile}`,0);
    schemaLines.forEach (line => {
      fs.appendFileSync(`${CURR_DIR}${currentPath}\\@core\\schema.${langFile}`, line+"\n");
    });
    console.log(`${currentPath}\\@core\\schema.${langFile}`);
  }else{
    console.log(`@core/schema.${langFile} must end with '}' or '};'`.red);
  }

  let reducersLines = [];
  fs.readFileSync(`${CURR_DIR}${currentPath}\\reducers.${langFile}`, 'utf-8').split(/\r?\n/).forEach(function(line){
    reducersLines.push(line);
  });
  reducersLines.splice(0,0,`import ${capitalizeFirstLetter(name)} from "./${name}/reducer";`);
  fs.truncateSync(`${CURR_DIR}${currentPath}\\reducers.${langFile}`,0);
  reducersLines.forEach (line => {
    fs.appendFileSync(`${CURR_DIR}${currentPath}\\reducers.${langFile}`, line+"\n");
  });
  console.log(`${currentPath}\\reducers.${langFile}`);

  let sagasLines = [];
  fs.readFileSync(`${CURR_DIR}${currentPath}\\sagas.${langFile}`, 'utf-8').split(/\r?\n/).forEach(function(line){
    sagasLines.push(line);
  });
  sagasLines.splice(0,0,`import ${capitalizeFirstLetter(name)}Saga from "./${name}/saga";`);
  fs.truncateSync(`${CURR_DIR}${currentPath}\\sagas.${langFile}`,0);
  sagasLines.forEach (line => {
    fs.appendFileSync(`${CURR_DIR}${currentPath}\\sagas.${langFile}`, line+"\n");
  });
  console.log(`${currentPath}\\sagas.${langFile}`);

  let actionLines = [];
  fs.readFileSync(`${CURR_DIR}${currentPath}\\actions.${langFile}`, 'utf-8').split(/\r?\n/).forEach(function(line){
    actionLines.push(line);
  });
  actionLines.splice(0,0,`export * from "./${name}/actions";`);
  fs.truncateSync(`${CURR_DIR}${currentPath}\\actions.${langFile}`,0);
  actionLines.forEach (line => {
    fs.appendFileSync(`${CURR_DIR}${currentPath}\\actions.${langFile}`, line+"\n");
  });
  console.log(`${currentPath}\\actions.${langFile}`);
}  


const ctrler = {
  async create(options) {
   
    const frameworkManager = new FrameworkManager();
    const languageManager = new LanguageManager();
    const pathManager = new PathManager();
    let currentFramework = undefined;
    let currentLanguage = undefined;
    let currentPath = options.path;
    try{
      currentFramework = frameworkManager.getFramework();
      currentLanguage = languageManager.getLanguage();
      if(!currentPath){
        currentPath = pathManager.getPath();
      } 
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
    let isValidFlag = false;
    let currentName = options.name;
    if(!options.name){
      const input = await inquirer.prompt([
        {
          type: "input",
          name: "name",
          message: "Give name for controller",
        }
      ]);
      isValidFlag = isValidName(input.name);
      currentName=input.name;
    }else{
      isValidFlag = isValidName(options.name);
    }
    if(isValidFlag){
      const currDir = gpath.resolve(__dirname, '..');
      const templatePath = `${currDir}\\templates\\${currentFramework}\\${currentLanguage}`
 
     
      if(checkIfExists(templatePath,currentPath) === 2){
        
        const controllerPath = `${currDir}\\controller\\${currentFramework}\\${currentLanguage}`
        let input = undefined;
        const flag = checkIfExists(`${controllerPath}\\test`,`${currentPath}\\${currentName}`);
        if(flag === 1 || flag === 2){
          input = await inquirer.prompt([
            {
              type: "confirm",
              name: "flag",
              message: "Some files of controller already exists. Do you want to overwrite",
              default: true,
            }
          ]);
        }
        if(input === undefined ||  input.flag === true  ){
          console.log("Removing controller");
          this.remove({ name: currentName, path: currentPath });
          console.log("\nCreated 4 files");
          createDirectoryContents(controllerPath,currentPath,currentName)
          createController(`\\${currentPath.replace(".","")}`,currentName);
          console.log("\nModified 6 files");
          appendNewLines(`\\${currentPath.replace(".","")}`,currentName,currentLanguage);
          console.log("\nController is initialized".yellow);
        }
       
      }else{
        console.log("Some files are missing".red, "- Use datawise-cli init".green);
      }
    }else{
      console.log("You must give a valid name".red);
    }

  
  },

  async remove(options) {
    const languageManager = new LanguageManager();
    const pathManager = new PathManager();
    let currentLanguage = undefined;
    let currentPath = options.path;
    try{
      currentLanguage = languageManager.getLanguage();
      if(!currentPath){
        currentPath = pathManager.getPath();
      }
    } catch (err) {
      if(!currentLanguage){
        await language.set({});
        currentLanguage = languageManager.getLanguage();
      }
      if(!currentPath){
        await path.set({});
        currentPath = pathManager.getPath();
      }
    }
    let isValidFlag = false;
    let currentName = options.name;
    if(!options.name){
      const input = await inquirer.prompt([
        {
          type: "input",
          name: "name",
          message: "Give name for controller",
        }
      ]);
      isValidFlag = isValidName(input.name);
      currentName=input.name;
    }else{
      isValidFlag = isValidName(options.name);
    }
    if(isValidFlag){
      const removePath = `${CURR_DIR}\\${currentPath.replace(".","")}`;
      fs.rmSync(`${removePath}\\${currentName}`, { recursive: true, force: true });
      removeLines(currentPath.replace(".",""),currentName,currentLanguage);

    }else{
      console.log("You must give a valid name".red);
    }

  
  }
};

module.exports = ctrler;