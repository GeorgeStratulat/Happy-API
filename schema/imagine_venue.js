var mongoose = require("mongoose");
var Imagine_VenueSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    venue: String,
    url: String,
    order: String

});
var Imagine_Venue = mongoose.model("Imagine_Venue", Imagine_VenueSchema);
module.exports = Imagine_Venue;