const express = require("express");
const cors = require("cors");
require("./db/mongoose");

const app = express();

// Give ability to read json
app.use(express.json());

// Import Routes
const contactRoute = require("./routes/contact");
const blogPostRoute = require("./routes/blogPostRoute");
const authRouteRegister = require("./routes/authRegister");
const authRouteLogin = require("./routes/authLogin");
const authRouteForgot = require("./routes/authForgot");
const authRouteReset = require("./routes/authReset");
const addBlogPost = require("./routes/addBlogPost");
const postRoute = require("./routes/posts");

//Cors
app.use(cors());

//Route middleware
app.use("/api/sendMail", contactRoute);
app.use("/api/BlogPosts", blogPostRoute);
app.use("/api/user", authRouteRegister);
app.use("/api/user", authRouteLogin);
app.use("/api/user", authRouteForgot);
app.use("/api/user", authRouteReset);
app.use("/blog/addpost", addBlogPost);
app.use("/api/posts", postRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server up and running on ${PORT}...`));
