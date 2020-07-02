const express = require("express");
const cors = require("cors");
require("./db/mongoose");

const app = express();

// Give ability to read json
app.use(express.json());

// Import Routes
const contactRoute = require("./routes/contact");
const blogPostRoute = require("./routes/blogPost");
const authRouteRegister = require("./routes/authRegister");
const authRouteLogin = require("./routes/authLogin");
const addBlogPost = require("./routes/addBlogPost");
const postRoute = require("./routes/posts");

//Cors
app.use(cors());

// //More cors avoidance
// Add headers
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader(
        "Access-Control-Allow-Origin",
        "https://pf-website-api.herokuapp.com/"
    );

    // Request methods you wish to allow
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );

    // Request headers you wish to allow
    res.setHeader(
        "Access-Control-Allow-Headers",
        "X-Requested-With,content-type"
    );

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader("Access-Control-Allow-Credentials", true);

    // Pass to next layer of middleware
    next();
});

//Route middleware
app.use("/api/sendMail", contactRoute);
app.use("/api/BlogPosts", blogPostRoute);
app.use("/api/user", authRouteRegister);
app.use("/api/user", authRouteLogin);
app.use("/blog/addpost", addBlogPost);
app.use("/api/posts", postRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server up and running on ${PORT}...`));
