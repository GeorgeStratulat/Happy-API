var mongoose = require('mongoose');
var abonamentSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    numar_bauturi: Number,
    numar_bauturi_zilnic: Number,
    numar_luni: Number,
    nume_abonament: String
}); 
mongoose.model("Abonamente", abonamentSchema);
module.exports = mongoose.model("Abonamente", abonamentSchema);
