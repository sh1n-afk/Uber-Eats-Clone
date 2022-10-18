const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");

const encryptPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    console.log(
      "🚀 ~ file: methods.js ~ line 9 ~ encryptPassword ~ error",
      error
    );
  }
};

const comparePasswords = async (password, dbPassword) => {
  const passwordMatches = await bcrypt.compare(password, dbPassword);
  return passwordMatches;
};

const createId = () => {
  return uuidv4();
};

const createSuccessResult = (restData = {}) => {
  return { error: false, ...restData };
};

const createErrorResult = (message, restData = {}) => {
  return { error: true, message: message, ...restData };
};

const sendResponse = (result, response) => {
  if (result.error) {
    response.status(500).send(result);
  } else {
    response.status(200).send(result);
  }
};

module.exports = {
  encryptPassword,
  comparePasswords,
  createId,
  createSuccessResult,
  createErrorResult,
  sendResponse,
};
