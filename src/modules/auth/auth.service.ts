import { pool } from "../../config/db";
import bcrypt from "bcryptjs";
import IUser from "./auth.interface";


const register = async (payload: IUser) => {
  const { name, email, password, role } = payload;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const result = await pool.query(
      `INSERT INTO users (name, email, password, role)
       VALUES ($1, $2, $3, $4)
       RETURNING id, name, email, role, created_at, updated_at`,
      [name, email, hashedPassword, role ?? "attendee"],
    );
    return result.rows[0];
  } catch (error: any) {
    if (error.code === "23505") {
      throw new error (409, "Email already registered");
    }
    throw error;
  }
};

export const authService = { register };