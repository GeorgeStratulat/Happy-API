var mongoose = require("mongoose");
var OrarSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    venue: String,
    lungi: String,
    marti: String,
    miercuri: String,
    joi: String,
    vineri: String,
    sambata: String,
    duminica: String,
});
var Orar = mongoose.model("Orar", OrarSchema);
module.exports = Orar;