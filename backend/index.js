import express from "express";
import "dotenv/config";

const PORT = process.env.PORT;
const URL_BACK = process.env.URL_BACK;

const app = express();

app.get("/", (req, res) => {
    res.send("Backend INICIADO");
});

app.listen(PORT, () => {
    console.log(`Backend pronto: ${URL_BACK}${PORT}/`);
});