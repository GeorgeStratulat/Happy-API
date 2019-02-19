var mongoose = require("mongoose");
// const Bauturi = require ("../schema/bautura.js");
var PerioadaSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    zile:[{type: String}],
    ora_inceput: Date,
    ora_sfarsit: Date  
});
var Perioada = mongoose.model("Perioada", PerioadaSchema);
module.exports = Perioada;