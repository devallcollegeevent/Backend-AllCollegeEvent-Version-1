const jwt = require("jsonwebtoken");

const SECRET = "YOUR_SECRET_KEY"; // put env

export const generateToken = (payload: any) => {
  return jwt.sign(payload, SECRET, { expiresIn: "7d" });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, SECRET);
};
