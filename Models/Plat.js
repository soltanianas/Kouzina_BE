const mongoose = require("mongoose");

const PlatSchema = mongoose.Schema({

    ref: { type: String },
    prix: { type: String },
    description: { type: String },
    composition: { type: String },
    image: { type: String, }

});
module.exports = mongoose.model("Plat", PlatSchema);
