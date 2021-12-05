const mongoose = require("mongoose");

const userModel = new mongoose.Schema({




    nom: { type: String, required: true },
    email: { type: String, },
    password: { type: String, },
    image: { type: String, }

});

module.exports = mongoose.model("user", userModel);