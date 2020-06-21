const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("./db/mongoose");

const app = express();

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Import Routes
const contactRoute = require("./routes/contact");
const blogPostRoute = require("./routes/blogPost");
const authRouteRegister = require("./routes/authRegister");
const authRouteLogin = require("./routes/authLogin");
const postRoute = require("./routes/posts");

//Cors
app.use(cors());

//Route middleware
app.use("/api/sendMail", contactRoute);
app.use("/api/addBlogPost", blogPostRoute);
app.use("/api/user", authRouteRegister);
app.use("/api/user", authRouteLogin);
app.use("/api/posts", postRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server up and running on ${PORT}...`));
