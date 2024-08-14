import express from "express";
import connection from "./config/db.js"; // Note the .js extension
import dotenv from "dotenv";
import cors from "cors"
import userRouter from "./routes/user.route.js";
import noteRouter from "./routes/note.route.js";
import auth from "./middleware/auth.middleware.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors(
    {
    origin:"*"}
)
)

app.use(express.json());
app.use("/user", userRouter);
app.use("/note",auth, noteRouter)

app.get("/", (req, res) => {
    res.send("Server is running fine");
});

app.listen(PORT, async () => {
    try {
        await connection;
        console.log(`Server is running on port ${PORT} and DB is also connected`);
    } catch (error) {
        console.log(`Error in server: ${error}`);
    }
});
