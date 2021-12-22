const CURR_DIR = process.cwd();
const fs = require('fs');

// return
// 0: All files are missing
// 1: Some files are missing
// 2: All files are not missing
module.exports.checkIfExists =  function checkIfExists (templatePath, newProjectPath){
    const filesToCreate = fs.readdirSync(templatePath);
    let countFiles = filesToCreate.length;

    for (let file of filesToCreate) {
      const origFilePath = `${templatePath}\\${file}`;
  
      // get stats about the current file
      const stats = fs.statSync(origFilePath);

     
      if (stats.isFile()) {
        
        const writePath = `${CURR_DIR}\\${newProjectPath}\\${file}`;
        if (fs.existsSync(writePath)) {
          countFiles--;
        }
  
      } else if (stats.isDirectory()){
        const writePath = `${CURR_DIR}\\${newProjectPath}`;
        if (fs.existsSync(writePath)) {
          countFiles--;
        }
        // recursive call
        const res = checkIfExists(`${templatePath}\\${file}`, `${newProjectPath}\\${file}`);
        if(res === 1 || res === 0){
          break;
        }
      }
    }
    if(countFiles === 0){
      return 2;
    }else if(countFiles === filesToCreate.length){
      return 0;
    }else{
      return 1;
    }    
}

module.exports.createDirectoryContents = function  createDirectoryContents (templatePath, newProjectPath) {
  try{
    fs.mkdirSync(`${CURR_DIR}\\${newProjectPath}`);
  }catch(error){
  
  }
  
  const filesToCreate = fs.readdirSync(templatePath);
  
  filesToCreate.forEach(file => {
    const origFilePath = `${templatePath}\\${file}`;
   
    // get stats about the current file
    const stats = fs.statSync(origFilePath);

    if (stats.isFile()) {
      const contents = fs.readFileSync(origFilePath, 'utf8');
      
      const writePath = `${CURR_DIR}\\${newProjectPath}\\${file}`;
      console.log("+".green,`${newProjectPath}\\${file}`);
      fs.writeFileSync(writePath, contents, 'utf8');
    } else if (stats.isDirectory()) {
      fs.mkdirSync(`${CURR_DIR}\\${newProjectPath}\\${file}`,{ recursive: true });
      
      // recursive call
      createDirectoryContents(`${templatePath}\\${file}`, `${newProjectPath}\\${file}`);
    }
  }); 
  
}