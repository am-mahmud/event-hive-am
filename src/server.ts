import "dotenv/config";
import app from "./app";
import { initDatabase } from "./config/initDB";

const port = process.env.PORT || 4000;

const startServer = async () => {
  try {
    await initDatabase();

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.log("Connection failed", error);
    process.exit(1);
  }
};

startServer();