import express from "express";
import "./db/mongoose.js";
import routes from "./routes/routes.js";
import path from "path";

const app = express();
const PORT = process.env.PORT || 4000;
let rootDirectory = path.resolve();

app.use("/uploads", express.static(path.join(rootDirectory, "/uploads")));
app.use(express.json());
app.use(express.urlencoded({
	extended: true,
	limit: '10mb'
}))

app.use(routes);

app.listen(PORT, () =>
	console.log(`Server is running on http://localhost:${PORT}`)
);