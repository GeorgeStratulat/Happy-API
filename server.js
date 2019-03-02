let express = require("express");

var cors = require("cors");
let bodyParser = require("body-parser");
const AbonamenteRoutes = require('./routes/abonamente');
const UserRoutes = require("./routes/users");
const BauturaRoutes = require("./routes/bautura");
const VenueRoutes = require("./routes/venue");
const Abonament_UserRoutes = require("./routes/abonament_user");
const Bautura_ComandataRoutes = require("./routes/bautura_comandata");
const OfertaRoutes = require("./routes/oferta");
const PerioadaRoutes = require("./routes/perioada");
const Imagine_VenueRoutes = require("./routes/imagine_venue");
const OrarRoutes = require("./routes/orar");
const Admin_VenueRoutes = require("./routes/admin_venue");

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


app.use((req, res, next) => {
  // const error = new Error('Route not found');
  // error.status = 404;

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8000');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  next();
});
app.use(bodyParser.json());



app.use('/abonamente', AbonamenteRoutes);
app.use("/users", UserRoutes);
app.use("/bautura", BauturaRoutes);
app.use("/venue", VenueRoutes);
app.use("/abonament_user", Abonament_UserRoutes);
app.use("/bautura_comandata", Bautura_ComandataRoutes);
app.use("/oferta", OfertaRoutes);
app.use("/perioada", PerioadaRoutes);
app.use("/imagine_venue", Imagine_VenueRoutes);
app.use("/orar", OrarRoutes);
app.use("/admin_venue", Admin_VenueRoutes);


//custom error handling for unknown routes
// app.use((error, req, res, next) => {
//   res.status(error.status || 500);
//   res.json({
//     error: {
//       message: error.message
//     }
//   });
// });





app.listen(process.env.PORT || 4000);
console.log("Running a GraphQL API server at localhost:4000/graphql");
