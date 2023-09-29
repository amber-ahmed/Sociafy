import express from "express";
import config from "config";
import "./connectDb.js"
import cors from 'cors';


//Importing Controllers
import userRouter from "./controllers/user.js";
import postRouter from "./controllers/post.js"
import { dirname } from "path"
import { fileURLToPath } from "url"
import path from "path"

const port = config.get("PORT");
console.log(port);

const app = express();
app.use(cors());

app.use(express.json());

app.use("/api/user", userRouter);

app.use("/api/post", postRouter);

// app.get("/", (req, res) => {
//     res.send("Welcome to Scheduler backend")
// })

const __dirname = dirname(fileURLToPath(import.meta.url))
app.use(express.static(path.join(__dirname, "build")));

app.use(express.static(path.join(__dirname, "build")));
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, "build", "index.html"));
});
app.listen(port, () => {
    console.log("Server started at Port ", port);
})