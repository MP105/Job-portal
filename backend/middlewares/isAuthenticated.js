import jwt from "jsonwebtoken";

export const isAuthenticated = (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        message: "Unauthorized: No token provided",
        success: false,
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.SECRET_KEY
    );

    req.id = decoded.userId;

    next();
  } catch (error) {
    console.log(error);

    return res.status(401).json({
      message: "Invalid token",
      success: false,
    });
  }
};