import { pool } from "../../config/db";
import bcrypt from "bcryptjs";
import IUser from "./auth.interface";
import { passwordHelpers } from "../../utils/passwordHelper";

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

const login = async (email: string, password:string) =>{
  const isUserExist = await pool.query<IUser>(`SELECT * FROM user WHERE 
    email = $1`, [email]);

    const user = isUserExist.rows[0];

    if(!user || !passwordHelpers.compareHash(password, user.password)) {
      const error = new Error("Invalid Email")
      throw Error;
    }

    // const token = 


}

export const authService = { register };
