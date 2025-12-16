const bcrypt = require("bcrypt")

/**
 * Hash a plain text password
 * @param pwd - plain password string
 * @returns hashed password
 */
export const hashPassword = async (pwd: string): Promise<string> => {
  const saltRounds = 10;
  return bcrypt.hash(pwd, saltRounds);
};

/**
 * Compare plain password with hashed password
 * @param pwd - plain password string
 * @param hashed - hashed password from DB
 * @returns true if password matches, else false
 */
export const comparePassword = async (
  pwd: string,
  hashed: string
): Promise<boolean> => {
  return bcrypt.compare(pwd, hashed);
};
