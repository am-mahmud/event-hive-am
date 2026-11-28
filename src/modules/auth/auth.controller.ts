import { RequestHandler } from "express";
import { authService } from "./auth.service";

const register: RequestHandler = async (req, res) => {
  const user = await authService.register(req.body);
  res.status(201).json({
    success: true,
    message: "User registered successfully",
    data: user,
  });
};

export const authController = { register };