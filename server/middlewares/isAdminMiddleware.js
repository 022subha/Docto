import jwt from "jsonwebtoken";

const isAdminMiddleware = async (req, res, next) => {
  try {
    const token = req.headers["authorization"].split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        return res
          .status(200)
          .json({ success: false, message: "Authentication Failed!!" });
      } else {
        if (decode.isAdmin) next();
        else
          return res
            .status(201)
            .json({ success: false, message: "Authentication Failed!!" });
      }
    });
  } catch (error) {
    console.log(error);
    return res
      .status(401)
      .json({ success: false, message: "Authentication Failed!!" });
  }
};

export default isAdminMiddleware;
