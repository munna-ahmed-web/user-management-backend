const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const jwt = require("jsonwebtoken");

const generateHash = (pass, saltRound = 10) => {
  const salt = genSaltSync(saltRound);
  return hashSync(pass, salt);
};

const matchPassword = (password, hashPass) => {
  const result = compareSync(password, hashPass);
  return result;
};

const geneateJWTtoken = (
  payload,
  secretKey = process.env.ACCESSTOKENSECRET
) => {
  const token = jwt.sign(payload, secretKey, { algorithm: "HS256" });
  return token;
};

const decodeJWTtoken = (token) => {
  const decoded = jwt.decode(token);
  return decoded;
};

module.exports = {
  generateHash,
  matchPassword,
  geneateJWTtoken,
  decodeJWTtoken,
};
