// require("dotenv").config({path: "./.env"});
import dotenv from "dotenv";
import app from "./app.js";

import connectDB from "./db/index.js";

dotenv.config(
    {path: "./.env"}
);


connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
    })
})
.catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
})


// import dotenv from "dotenv";
// import express from "express";

// dotenv.config();
// const app = express();


// // Connect to MongoDB and start the server
// ; (async () => {
//     try {
//         mongoose.connect(`${process.env.MONGODB_URI}/
//             ${DB_NAME}`)
//         app.on("error", (error) => {
//             console.error("Error connecting to MongoDB:", error)
//             throw error;
//         })
        
// // app listening on port

//         app.listen(process.env.PORT, () => {
//             console.log(`Server is running on port ${process.env.PORT}`)
//         })


//     }
// // Catch any errors during the connection process

//     catch (error) {
//         console.error("Error connecting to MongoDB:", error)
//         throw error;

//         }

//         }


// )();
