const express = require("express")
const cookieParser = require("cookie-parser");
const http = require("http");
const connectDB = require("./db/db");
const { profileRouter } = require("./routes/profileRoute");
const { authRouter } = require("./routes/authRoute");

require("dotenv").config();
const app = express();
const server = http.createServer(app)

app.use(express.json());
app.use(cookieParser());


app.use("/api/v1/", profileRouter)
app.use("/api/v1/", authRouter)


connectDB()
    .then(() => {
        server.listen(process.env.PORT, () => {
            console.log(`Server is successfully listening on port ${process.env.PORT}...`);
        });
    })
    .catch((err) => {
        console.error("Database cannot be connected!!", err);
    });