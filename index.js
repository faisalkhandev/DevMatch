const express = require("express")
const cookieParser = require("cookie-parser");
const http = require("http");
const connectDB = require("./db/db");
const { userRouter } = require("./routes/userRoute");

require("dotenv").config();
const app = express();
const server = http.createServer(app)

app.use(express.json());
app.use(cookieParser());


app.use("/api/v1/", userRouter)


connectDB()
    .then(() => {
        server.listen(process.env.PORT, () => {
            console.log(`Server is successfully listening on port ${process.env.PORT}...`);
        });
    })
    .catch((err) => {
        console.error("Database cannot be connected!!", err);
    });