const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
 
    id: { type: String, },
    type: { type: String, },
    emplacement: { type: String, },
    isFavourite: { type: Boolean, },

    plat: { type: mongoose.Types.ObjectId , ref : "Plat" },

});


module.exports = mongoose.model("Order", orderSchema);
