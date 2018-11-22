let express = require("express");

let bodyParser = require("body-parser");
const AbonamenteRoutes = require('./routes/abonamente');
const UserRoutes = require("./routes/users");
const BauturaRoutes = require("./routes/bautura");
const VenueRoutes = require("./routes/venue");
const Abonament_UserRoutes = require("./routes/abonament_user");

// create express app

//Connect to Mongoose
let mongoose = require("mongoose"); 
var connection = process.env.MONGODB_URI || "mongodb://admin:paipai123@ds111244.mlab.com:11244/happyapi";
mongoose.connect(connection);

//Test MongoDB Connection
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.on('connected', function () {
  console.log('MongoDB Connection Successful!');
});

let app = express();
app.use(bodyParser.json());


app.use('/abonamente', AbonamenteRoutes);
app.use("/users", UserRoutes);
app.use("/bautura", BauturaRoutes);
app.use("/venue", VenueRoutes);
app.use("/abonament_user", Abonament_UserRoutes);

app.use((req, res, next) => {
  const error = new Error('Route not found');
  error.status = 404;
  next(error);
});

//custom error handling for unknown routes
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});



app.listen(process.env.PORT || 4000);
console.log("Running a GraphQL API server at localhost:4000/graphql");
