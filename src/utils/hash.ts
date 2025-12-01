const bcrypt = require("bcrypt")

export const hashPassword = async (pwd: string) => {
  return await bcrypt.hash(pwd, 10);
};

export const comparePassword = async (pwd: string, hashed: string) => {
  return await bcrypt.compare(pwd, hashed);
};
