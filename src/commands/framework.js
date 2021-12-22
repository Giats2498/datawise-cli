const inquirer = require("inquirer");
const colors = require('colors');
const FrameworkManager = require("../lib/FrameworkManager");
 
const framework = {
  async set(options) {
    const frameworkManager = new FrameworkManager();
    if(options.react){
        frameworkManager.setFramework("React");
        console.log("Framework is set:".blue,"React".yellow);
    }else if(options.next){
        frameworkManager.setFramework("Next");
        console.log("Framework is set".blue,"Next".yellow);
    }else{
        const input = await inquirer.prompt([
            {
              type: "list",
              name: "framework",
              message: "Select framework",
              choices: ["React","Next"]
            }
        ]);

        const framework = frameworkManager.setFramework(input.framework);

        if (framework) {
            console.log("Framework is set:".blue, input.framework.yellow);
        }else{
            console.error("Something went wrong".red);
        }
    }
   
  },

  show() {
    try {
      const frameworkManager = new FrameworkManager();
      const framework = frameworkManager.getFramework();

      console.log("Current framework:", framework.yellow);

      return framework;
    } catch (err) {
      console.error(err.message.red);
    }
  },


  remove() {
    try {
      const frameworkManager = new FrameworkManager();
      frameworkManager.deleteFramework();

      console.log("Framework Removed".blue);

      return;
    } catch (err) {
      console.error(err.message.red);
    }
  }
};

module.exports = framework;