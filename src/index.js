const express=require('express');
const bodyParser=require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors");
const AppDataSource=require("./config/database");
const authRoutes=require("./routes/authRoutes")

dotenv.config();
const app=express();

app.use(express.json());

app.use(bodyParser.json())
app.use(cors());
app.get("/", (req, res) => {
    res.status(200).json({ message: "Hello World" });  
    console.log("Hello World");
});
app.use("/api/auth",authRoutes)
AppDataSource.initialize().
    then(()=>{
        console.log("Database is connected successfully");
        app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
    })
    .catch((error)=>{
        console.error("Error connecting to database:", error)
    })