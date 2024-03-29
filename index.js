import dotenv from "dotenv";
dotenv.config();
import { app } from "./src/app.js";
import { connectDatabase } from "./src/db/index.js";

app.get("/", async (req, res) => {
  res.json({ message: "Welcome" });
});

const PORT = process.env.PORT || 7000;

connectDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server listening: http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Index.js MONGODB Connection failed:-> ", err);
  });
