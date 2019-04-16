var mongoose = require("mongoose");

var commentSchema= new mongoose.Schema({
    
    content:String,
    userName:{
        id:{  type: mongoose.Schema.Types.ObjectId,
        ref:"User"
            
        },
        userx:String
    }
    

});

module.exports=  mongoose.model("comment", commentSchema);