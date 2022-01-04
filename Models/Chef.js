const mongoose = require("mongoose");

const ChefSchema = mongoose.Schema({

    nom: { type: String },
    image: { type: String }
    
});
module.exports = mongoose.model("Chef", ChefSchema);
