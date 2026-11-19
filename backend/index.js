import express from "express";
import cors from "cors";
import "dotenv/config";

import playerRoutes from "./src/routes/playerRoutes.js"

const PORT = process.env.PORT;
const URL_BACK = process.env.URL_BACK;

const app = express();

app.use(cors({
    origin: "http://localhost:5173"
}));

app.use("/api/player", playerRoutes);

app.listen(PORT, () => {
    console.log(`Backend pronto: ${URL_BACK}${PORT}/`);
});