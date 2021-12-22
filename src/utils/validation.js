// Required fields
const {validVariable} = require("./regexp")
const isValidName = input => (validVariable.test(input));

module.exports = { isValidName };

 