import express from "express";

const app = express();

app.get("/", (_req, res) => {
    res.status(200).json({
        message: "Server is up",
    });
});

app.listen(5555, () => {
    console.log("Server is running on port 5555");
})