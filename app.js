require("dotenv").config();
const express = require("express");
const userRoutes = require("./routes/userRoutes");
const listRoutes = require('./routes/listRoutes');
//const cors = require("cors");
const reviewRoutes = require("./routes/reviewRoutes");
const commentRoutes = require("./routes/commentRoutes");
const movieRoutes = require("./routes/movieRoutes")
const noteRoutes = require("./routes/noteRoutes")
const cors = require('cors');
const swagger = require('./swagger/swagger');

const app = express();
app.use(cors({
    origin: '*', // Permite todas as origens
  }));

app.use(express.json());

app.use("/users", userRoutes);
app.use("/api",listRoutes)
app.use("/reviews", reviewRoutes);
app.use("/comment", commentRoutes)
app.use("/movies", movieRoutes)
app.use("/notes", noteRoutes);

// Documentação Swagger
swagger(app);

module.exports = app;