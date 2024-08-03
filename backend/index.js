import express from "express";
import cors from "cors"
import userRoutes from "./routes/userRoutes.js"
import connectMongoDB from "./config/DBConnection.js"

const app = express();
const PORT = process.env.PORT || 5000;


connectMongoDB()
app.use(express.urlencoded({ extended: true }))
app.use(cors({
    origin: ["http://localhost:5173", "https://kupafoods.vercel.app"], // Replace with your frontend's origin
    credentials: true, // Allow cookies to be sent
}))
app.use(express.json())



app.use("/api/users", userRoutes);
app.listen(PORT, () => console.log("SERVER RUNNING 😊"))