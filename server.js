const express = require("express");
const bodyParser = require("body-parser");
const animalRouter = require("./routes/animals.js");

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
	res.send("Hello, World!");
});

app.use("/animals", animalRouter);

app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});
