var mongoose = require("mongoose");
const Bauturi = require ("../schema/bautura.js");
var VenueSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    nume: String,
    locatie: String,
    bauturi:[{type: String}],
    // bauturi: [{type:    mongoose.Schema.Types.ObjectId,
    //             ref: "Bauturi"}],
    imagine: String,
    detalii: String
});
var Venue = mongoose.model("Venue", VenueSchema);
module.exports = Venue;