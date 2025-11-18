export const errorHandler = (err, req, res, next) => {
  console.error("Error:", err);
  
  // Mongoose validation error
  if (err.name === "ValidationError") {
    const messages = Object.values(err.errors).map(e => e.message);
    return res.status(400).json({ msg: messages.join(", ") });
  }
  
  // Mongoose duplicate key error
  if (err.code === 11000) {
    return res.status(400).json({ msg: "Duplicate entry" });
  }
  
  // JWT errors
  if (err.name === "JsonWebTokenError") {
    return res.status(401).json({ msg: "Invalid token" });
  }
  
  if (err.name === "TokenExpiredError") {
    return res.status(401).json({ msg: "Token expired" });
  }
  
  // Default error
  res.status(err.status || 500).json({
    msg: err.message || "Server error. Please try again.",
    ...(process.env.NODE_ENV === "development" && { stack: err.stack })
  });
};