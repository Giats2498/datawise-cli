const inquirer = require("inquirer");
const colors = require("colors");
const PathManager = require("../lib/PathManager");

const path = {
  async set(options) {
    inquirer.registerPrompt("fuzzypath", require("inquirer-fuzzy-path"))
    const pathManager = new PathManager();

    if(options.path){
      pathManager.setPath(options.path.replace(/\//g, "\\"));
      console.log("Path is set".blue);
    }else{
      const input = await inquirer.prompt([
        {
          type: "fuzzypath",
          name: "path",
          excludePath: nodePath => nodePath.startsWith("node_modules"),
            // excludePath :: (String) -> Bool
            // excludePath to exclude some paths from the file-system scan
          excludeFilter: nodePath => nodePath == ".",
            // excludeFilter :: (String) -> Bool
            // excludeFilter to exclude some paths from the final list, e.g. "."
          itemType: "any",
            // itemType :: "any" | "directory" | "file"
            // specify the type of nodes to display
            // default value: "any"
            // example: itemType: "file" - hides directories from the item list
          rootPath: "./",
            // rootPath :: String
            // Root search directory
          message: "Select a target directory for your template:",
          default: ".\\src\\store",
          suggestOnly: false,
            // suggestOnly :: Bool
            // Restrict prompt answer to available choices or use them as suggestions
          depthLimit: 5,
            // depthLimit :: integer >= 0
            // Limit the depth of sub-folders to scan
            // Defaults to infinite depth if undefined
        }
      ]);
      const path = pathManager.setPath(input.path);

      if (path) {
          console.log("Path is set:".blue, input.path.yellow); 
      }else{
          console.error("Something went wrong".red);
      }
    }
    
   
  },

  show() {
    try {
      const pathManager = new PathManager();
      const path = pathManager.getPath();

      console.log("Current path:", path.yellow);

      return path;
    } catch (err) {
      console.error(err.message.red);
    }
  },


  remove() {
    try {
      const pathManager = new PathManager();
      pathManager.deletePath();

      console.log("Path Removed".blue);

      return;
    } catch (err) {
      console.error(err.message.red);
    }
  }
};

module.exports = path;