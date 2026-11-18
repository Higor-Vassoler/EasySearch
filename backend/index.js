import express from "express";
import "dotenv/config";

const PORT = process.env.PORT;

const app = express();

app.get("/", (req, res) => {
    res.send("Backend INICIADO");
});

app.listen(PORT, () => {
    console.log(`Backend na porta ${PORT}.`);
});