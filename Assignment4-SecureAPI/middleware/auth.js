/* 
	File: recipeModel.js
	Student's Name: Abhirami Pradeep Susi
	Student ID: 200589663
	Date: 11 Nov 2024
*/
const jwt = require("jsonwebtoken");

// Function to verify token.
// req - The request object param.
// res - The response object param.
// next - The function called to invoke next object
// Returns flow to next object on verification success or an error message.

const verifyToken = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send("Required token for authentication");
  }
  try {
    const decoded = jwt.verify(token, process.env.SECRET_TOKEN);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid token");
  }
  return next();
};

module.exports = verifyToken;
