import pg, { Pool } from "pg"
import config from "./env"


export const pool = new Pool ({
    connectionString: config.connection_string,
})

