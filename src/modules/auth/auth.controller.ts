// import { RequestHandler } from "express";
// import { authService } from "./auth.service";

// const register: RequestHandler = async (req, res) => {
//   try {
//     const result = await authService.register(req.body);
//     res.status(201).json({
//       success: true,
//       message: "User registered successfully",
//       data: result,
//     });
//   } catch (error: unknown) {
//     if (res.status(409)) {
//       res.status(409).json({
//         success: true,
//         message: "Email already registered",
//       });
//     } else {
//       res.status(400).json({
//         success: true,
//         message: "Validation failed",
//       });
//     }
//   }
// };

// const login: RequestHandler = async (req, res, next) => {
//   try {
//     const { email, password } = req.body;

//     const { user, token } = await authService.login(email, password);

//     res.status(200).json({
//       success: true,
//       message: "User Loged In successfully",
//       data: {
//         user,
//         token,
//       },
//     });
//   } catch (error: unknown) {
//     if (res.status(409)) {
//       res.status(409).json({
//         success: true,
//         message: "Email already registered",
//       });
//     } else {
//       res.status(400).json({
//         success: true,
//         message: "Validation failed",
//       });
//     }
//   }
// };

// export const authController = { register, login };


import { RequestHandler } from "express";
import { authService } from "./auth.service";

const register: RequestHandler = async (req, res) => {
  try {
    const result = await authService.register(req.body);
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: result,
    });
  } catch (error: any) {
    if (error.code === "23505") {
      res.status(409).json({
        success: false,
        message: "Email already registered",
      });
      return;
    }
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const login: RequestHandler = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({
        success: false,
        message: "Validation Error",
        errors: [{ field: "email/password", message: "Email and password are required" }],
      });
      return;
    }

    const { user, token } = await authService.login(email, password);

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: { token, user },
    });
  } catch (error: any) {

    // console.log(error)
    if (error.message === "Invalid email or password") {
      res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
      return;
    }
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const authController = { register, login };
