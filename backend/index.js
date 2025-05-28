const express = require("express")
const cookieParser = require("cookie-parser");
const http = require("http");
const connectDB = require("./db/db");
const { profileRouter } = require("./routes/profileRoute");
const { authRouter } = require("./routes/authRoute");
const { requestRouter } = require("./routes/requestRoute");
const { userRouter } = require("./routes/userRoute");

require("dotenv").config();
const app = express();
const server = http.createServer(app)

app.use(express.json());
app.use(cookieParser());

app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return res.status(400).json({
            success: false,
            message: "Invalid JSON payload",
            error: err.message,
        });
    }
    next();
});



app.use("/api/v1/", authRouter)
app.use("/api/v1/", profileRouter)
app.use("/api/v1/", requestRouter)
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