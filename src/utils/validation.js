// API level Validation
const validator = require("validator");
const validationSignUpData = (req) => {
  const { firstName, lastName, emailID, password } = req.body;

  if (!firstName || !lastName) {
    throw new Error("Name is not valid");
  } else if (firstName.length < 4 || firstName > 50) {
    throw new error("this is not Valid");
  } else if (!validator.isEmail(emailID)) {
    throw new error("Email is not valid");
  } else if (!validator.isStrongPassword(password)) {
    throw new error("Please enter strong password");
  }
};
const validateEditProfileData = (req) => {
  const ALLOWED = ["about", "gender", "age", "skills", "photo"]; // match schema
  const keys = Object.keys(req.body || {});
  if (keys.length === 0) return false;
  return keys.every(k => ALLOWED.includes(k));
};

module.exports = {
  validationSignUpData,
  validateEditProfileData,
};
