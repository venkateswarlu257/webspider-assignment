import jwt from "jsonwebtoken";
import dotenv from 'dotenv'

dotenv.config()

//Middleware function
const authMiddleware = async (request, response, next) => {
    let jwtToken;
    const authHeader = request.headers["authorization"];
    if (authHeader !== undefined) {
      jwtToken = authHeader.split(" ")[1];
    }
    if (!jwtToken) {
      response.status(401);
      response.send("Invalid JWT Token");
    } else {
      jwt.verify(jwtToken,process.env.SECRET_KEY, async (error) => {
        if (error) {
          response.status(401);
          response.send("Invalid JWT Token");
        } else {
          next();
        }
      });
    }
};

export default authMiddleware;