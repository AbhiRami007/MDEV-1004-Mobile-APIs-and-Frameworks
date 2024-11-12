/* 
  File: auth.js
  Student's Name: Abhirami Pradeep Susi
  Student ID: 200589663
  Date: 12 Nov 2024
*/

const jwt = require('jsonwebtoken');

/**
 * Function to verify token.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Object} next - The next method to be called.
 * @returns {void} - Returns to controller on success or an error message.
 * @description - verify token using jwt
*/
const verifyToken = (req,res,next)=>{
    const token = req.body.token || req.query.token || req.headers['x-access-token'];

    if(!token){
        return res.status(403).send('Required token for authentication');
            }
            try{
                const decoded = jwt.verify(token,process.env.JWT_SECRET);
                req.user = decoded;
            } catch(err){
                return res.status(401).send('Invalid token');
            }
            return next();
}

module.exports = verifyToken;