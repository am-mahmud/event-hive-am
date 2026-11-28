import bcrypt from "bcryptjs";
import brcypt from "bcryptjs";


const hassPassowrd = async (palinPassword: string) => {
    return await brcypt.hash(palinPassword, 8);
};

const compareHash = async (plainPassword: string, hassPassowrd: string) => {
    return await bcrypt.compare(plainPassword, hassPassowrd);
};


export const passwordHelpers = {
    hassPassowrd,
    compareHash
}