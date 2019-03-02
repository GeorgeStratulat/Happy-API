var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Admin_VenueSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    venue_id: String,
    username:String,
    // data_nastere: Date,
    password: String
});
var Admin_Venues = mongoose.model("Admin_Venues", Admin_VenueSchema);

module.exports = Admin_Venues;