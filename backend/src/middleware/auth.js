const { success } = require("zod");
const jwt = require("jsonwebtoken");

require("dotenv").config();

//authentication
exports.auth = async (req, res, next) => {
  try {
    const token =
      req.cookie.token || req.headers("Authorization")?.replace("Bearer ", "");

    //token missing
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No token found",
      });
    }

    //verify
    const decode = jwt.sign(token, process.env.JWT_SECRET);
    if (decode) {
      req.user = decode;
      next();
    } else
      res.status(401).json({
        success: false,
        msg: "Error in verifying jwt token",
      });
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      success: false,
      message: "Failed to validate user authentication",
    });
  }
};
