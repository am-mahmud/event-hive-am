import { pool } from "../../config/db";
import bcrypt from "bcryptjs";
import IUser from "./auth.interface";
import { passwordHelpers } from "../../utils/passwordHelper";
import { jwtHelpers } from "../../utils/jwtHelpers";

const register = async (payload: IUser) => {
  const { name, email, password, role } = payload;
  const hashedPassword = await bcrypt.hash(password, 10);

  const result = await pool.query(
    `INSERT INTO users (name, email, password, role)
       VALUES ($1, $2, $3, $4)
       RETURNING id, name, email, role, created_at, updated_at`,
    [name, email, hashedPassword, role ?? "attendee"],
  );
  return result.rows[0];
};

const login = async (email: string, password: string) => {
  const result = await pool.query<IUser>(
    `SELECT id, name, email, password, role FROM users WHERE email = $1`,
    [email],
  );

  const user = result.rows[0];

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isMatch = await passwordHelpers.compareHash(password, user.password);

  if (!isMatch) {
    throw new Error("Invalid email or password");
  }

  const token = jwtHelpers.generateToken({
    id: user.id,
    role: user.role,
  });

  const { password: _password, ...safeUser } = user;

  return { user: safeUser, token };
};

export const authService = { register, login };
