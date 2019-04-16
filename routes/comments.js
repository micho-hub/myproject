var express = require("express");
var router  = express.Router();
var food    = require("../models/food");
var comment = require("../models/comment");
var middelwere =require("../middelwere/");
router.get("/food/:id/show", function(req, res){
    food.findById(req.params.id, function(err, newId){
        if(err){
            console.log(err)
        }else{
            res.render("comments/show",{newId:newId})  
        }
    });
});
router.post("/food/:id/",middelwere.isLogin,function(req,res){
    food.findById(req.params.id, function(err, commentId){
        if(err){
            console.log(err)
        }else{
            comment.create(req.body.comm, function(err, comm){
                if(err){
                    console.log(err)
                }else
                comm.userName.id = req.user._id;
                comm.userName.userx =req.user.username;
                comm.save();
                commentId.comments.push(comm);
                commentId.save();
                console.log(comm)
                res.redirect("/food/"+ commentId._id)
                
                
            });
        }
    });
});
router.get("/food/:id/:comment_id/edit",middelwere.checkOwner, function(req, res){
    comment.findById(req.params.comment_id, function(err, foundComment){
        if(err){
            res.redirect("back");
        }else{
             res.render("edit",{newId_id:req.params.id, comment:foundComment})
        }
    });
   
});
router.put("/food/:id/:comment_id",middelwere.checkOwner, function(req, res){
    comment.findByIdAndUpdate(req.params.comment_id, req.body.comm, function(err, updateComment){
        if(err){
            res.redirect("back");
        }else{
            res.redirect("/food/"+req.params.id)
        }
    });
});
router.delete("/food/:id/:comment_id",middelwere.checkOwner, function(req, res){
    comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            res.redirect("/food/"+req.params.id);
        }else{
            res.redirect("/food/"+req.params.id);
        }
    });
});





module.exports= router;