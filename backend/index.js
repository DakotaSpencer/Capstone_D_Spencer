const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const multer = require("multer");
const userRoute = require("./routes/users.js");
const authRoute = require("./routes/auth.js");
const paletteRoute = require("./routes/palettes.js");
const router = express.Router();
const path = require("path");

dotenv.config();

try{
    mongoose.connect(
      process.env.MONGO_URL, 
        {useNewUrlParser: true, useUnifiedTopology: true}, 
        () => {
            console.log("Connected to MongoDB")
        }
    );
}catch(err){
    console.log(err);
}

app.use("/images", express.static(path.join(__dirname, "public/images")));

app.use(express.json());
app.use(helmet());
app.use(morgan("common"));


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "public/images");
    },
    filename: (req, file, cb) => {
      cb(null, req.body.name);
    },
  });
  
  const upload = multer({ storage: storage });
  app.post("/api/upload", upload.single("file"), (req, res) => {
    try {
      return res.status(200).json("File uploded successfully");
    } catch (error) {
      console.error(error);
    }
  });

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/palettes", paletteRoute);

app.listen(8800,() => {
    console.log("Backend is Online")
});
