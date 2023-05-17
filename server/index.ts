import express from "express";
import mongoose from "mongoose";
import router from "./controller/artesian.controller";
import cors from 'cors'
const port = 9095;

const url = "mongodb://localhost/geospartialDB";

const app = express();
app.use(cors())

app.use(express.json());

mongoose.connect(url).then(() => {
	console.log("db connected");
});

app.use("/artesian", router);

const server = app.listen(port, () => {
	console.log("listening on port");
});
