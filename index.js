const express = require("express");
const app = express();
const {typeError} = require("./middlewares/errors");
const {dbConnection} = require("./config/config");

require("dotenv").config();

const PORT = process.env.PORT;

app.use(express.json());

dbConnection();

app.use("/users", require("./routes/users"));
app.use("/posts", require("./routes/posts"));
app.use("/comments", require("./routes/comments"));

app.use(typeError);

app.listen(PORT, () => console.log(`Server started at port ${PORT}`));