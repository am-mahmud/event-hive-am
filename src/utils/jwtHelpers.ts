import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config/env";

const generateToken = (payload: JwtPayload) => {
  return jwt.sign(payload, config.jwt_secret as string, {
    expiresIn: "1d",
  });
};

const verrifyTOken = (token: string) => {
  return jwt.verify(token, config.jwt_secret as string);
};

export const jwtHelpers = {
  generateToken,
  verrifyTOken
};