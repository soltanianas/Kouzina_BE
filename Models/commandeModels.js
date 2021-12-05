const mongoose = require("mongoose");



const articleModels = new mongoose.Schema({


   referencecmd: {type: String,
       
        
    },
    name: {
        type: String,
        required: true
    },
   
    date: {
        type: Date,
        required: true
    },
    


});


module.exports = mongoose.model("commande", articleModels);
