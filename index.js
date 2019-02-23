const express = require("express");
const path = require("path");
// const logger = require('./middleware/logger');
const members = require("./Members");

const exphbs = require("express-handlebars");

const app = express();

// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'index.html'))
// })

// Init Middleware
// app.use(logger)

// Handlebars middleware
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Bodyparser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Homepage route
app.get("/", (req, res) =>
  res.render("index", {
    title: "Member App",
    members
  })
);

// Static folder
app.use(express.static(path.join(__dirname, "public")));

// Members API route
app.use("/api/members", require("./routes/api/members"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
