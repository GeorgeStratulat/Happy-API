var mongoose = require('mongoose');
var bauturaComandataSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    id_bautura: String,
    id_user:String,
    timp_comanda: {type:Date, default:Date.now},
}); 
var BauturaComandata = mongoose.model("BauturaComandata", bauturaComandataSchema);
module.exports = BauturaComandata;
