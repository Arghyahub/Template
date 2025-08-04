import { NextFunction, Request, Response } from "express";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // Check if the request has an authorization header
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res.status(401).json({ message: "Unauthorized" });
  }

  // Extract the token from the header
  const token = authHeader.split(" ")[1];
  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
  }

  // Here you would typically verify the token (e.g., using JWT)
  // For simplicity, we will assume the token is valid

  // If valid, proceed to the next middleware or route handler
  next();
};

export default authMiddleware;
