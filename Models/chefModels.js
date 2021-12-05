const mongoose = require("mongoose");

const newsModelSchema =  mongoose.Schema({

    ref: { type: String, required: true },
    nom: { type: String, required: true },
    composition: { type: String, required: true },
    


});
module.exports = mongoose.model("plat", newsModelSchema);
