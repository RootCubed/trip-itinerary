import { handler } from "./build/handler.js";
import express from "express";
import { fileURLToPath } from "url";
import path from "path";

const app = express();

const PORT = process.env.PORT || 3000;
const BASE_URL = process.env.BASE_URL || "/";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.get(BASE_URL + "/trip", (req, res) => {
    res.sendFile("trip.txt", { root: __dirname });
});

app.use(handler);

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
