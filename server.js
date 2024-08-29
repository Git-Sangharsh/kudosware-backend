import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import multer from "multer";
import cors from "cors";
import { config as dotenvConfig } from "dotenv";

dotenvConfig();
const envUserName = process.env.MONGODB_USERNAME;
const envPassWord = process.env.MONGODB_PASSWORD;

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose
  .connect(
    `mongodb+srv://${envUserName}:${envPassWord}@mainnikedb.jx4pwkk.mongodb.net/kudosware`
  )
  .then(() => console.log("mongodb connected"))
  .catch((error) => {
    console.log("mongodb error: ", error);
  });

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  resume: {
    data: Buffer,
    contentType: String,
  },
});

const User = mongoose.model("User", userSchema);
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Signup route
app.post("/signup", upload.single("resume"), async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const resumeFile = req.file;

    // Check if user already exists
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      return res.status(200).json({ userExist: true }); // Send response and return to end request
    }

    // Create a new user if not exists
    const newUser = new User({
      name,
      email,
      password,
      resume: {
        data: resumeFile.buffer,
        contentType: resumeFile.mimetype,
      },
    });

    await newUser.save();
    res
      .status(200)
      .send({ message: "User registered successfully!", status: true });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

// Get all users
app.get("/users", async (req, res) => {
  try {
    const users = await User.find({}, "name email _id");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
});

// Get resume by user ID
app.get("/users/:id/resume", async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);

    if (!user || !user.resume) {
      return res.status(404).json({ message: "User or resume not found" });
    }

    const filename = `${user.name.replace(/\s+/g, "").toLowerCase()}resume.pdf`;

    res.setHeader("Content-Disposition", `attachment; filename=${filename}`);
    res.setHeader("Content-Type", user.resume.contentType);
    res.send(user.resume.data);
  } catch (error) {
    res.status(500).json({ message: "Error fetching resume", error });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
