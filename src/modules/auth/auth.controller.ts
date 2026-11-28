import { RequestHandler } from "express";
import { authService } from "./auth.service";

const register: RequestHandler = async (req, res) => {
  const result = await authService.register(req.body);

  try {
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: result,
    });
  } catch (error: unknown) {
    if (res.status(409)) {
      res.status(409).json({
        success: true,
        message: "Email already registered",
      });
    }else{
      res.status(400).json({
        success: true,
        message: "Validation failed",
      });
    }
  }
};

export const authController = { register };
