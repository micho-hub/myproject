var middelwereObj ={};
var comment = require("../models/comment")
middelwereObj.checkOwner = 
    function checkOwner(req, res, next){
    if(req.isAuthenticated()){
        comment.findById(req.params.comment_id, function(err, foundComment){
            if(err){
                req.flash("error")
            res.redirect("/food/"+req.params.id);
            }else{
                if(foundComment.userName.id.equals(req.user._id)){
                    next();
                }else{
                    res.redirect("/food/"+req.params.id)
                }
            }
        });
    }
}

middelwereObj.isLogin = function isLogin(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "Please Login First!");
    res.redirect("/login");
}

    
module.exports = middelwereObj 