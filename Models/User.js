const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({

    nom: { type: String, required: true },
    email: { type: String, },
    password: { type: String, },
    image: { type: String, },
    role: { type: String }

});

module.exports = mongoose.model("User", UserSchema);