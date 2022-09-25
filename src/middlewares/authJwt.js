import User from "../models/User.js";
import jwt_decode from "jwt-decode";

export const verifyToken = async (req, res, next) => {
  let token = req.headers["credential"];
  if (!token) return res.status(403).json({ message: "No token provided" });

  try {
    const decoded = jwt_decode(token)
    const email = decoded.email;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "No user found" });
    if (!user.isAdmin) return res.status(404).json({ message: "Require Admin Role!" });
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized!" });
  }
};

export const verifyUser = async (req, res, next) => {
  let token = req.headers["credential"];
  if (!token) return res.status(403).json({ message: "No token provided" });

  try {
    const decoded = jwt_decode(token)
    const email = decoded.email;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "No user found" });
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized!" });
  }
};
