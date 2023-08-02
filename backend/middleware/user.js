import Jwt from "jsonwebtoken";

export const verifyUser = async (req, res, next) => {
  try {
    const token = req.header("Authorization");

    if (!token) return res.status(401).json({ message: "No token provided" });

    const verifiedToken = Jwt.verify(token, process.env.JWT_SECRET_Key);

    if (!verifiedToken)
      return res.status(403).json({ message: "Invalid Token" });
    req.user = verifiedToken;
    next();
  } catch (error) {
    return res.status(404).json({ error });
  }
};
