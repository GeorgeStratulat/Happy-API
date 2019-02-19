var mongoose = require("mongoose");
// const Bauturi = require ("../schema/bautura.js");
var OfertaSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    nume: String,
    locatie_id: String,
    numar_bauturi: String,
    bautura_id: String,
    tip_oferta: String,
    perioada: String
});
var Oferta = mongoose.model("Oferta", OfertaSchema);
module.exports = Oferta;