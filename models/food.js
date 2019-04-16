
var mongoose= require("mongoose")
var foodSchema = new mongoose.Schema({
    title:String,
    image:String,
    text:String,
    video:String,
    created:{type: Date, default:Date.now},
    comments:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"comment"
        }
    ]
});

module.exports = mongoose.model("food", foodSchema);