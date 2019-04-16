var express = require("express");
var router  = express.Router();
var food    = require("../models/food");
var comment = require("../models/comment");
router.get("/food", function(req,res){

        food.find().sort({created: -1}).exec(function(err, newFood) {
        if (err) { 
            console.log(err);
        }
        else  {
            res.render("sitefiles/index", {newFood:newFood, currentUser:req.user});
           
        }
    });
    });
 
router.get("/food/new", isAdm,function(req,res){
    res.render("sitefiles/new");
});

router.post("/food", function(req,res){
   food.create(req.body.foodForm, function(err, postFood){
       if(err){
           console.log("true error pred if")
       }else{
              res.redirect("/food");
       }
   }) 
});

router.get("/food/:id", function(req, res){
   food.findById(req.params.id).populate("comments").exec(function(err, newId){
       if(err){
           console.log(err)
       }else{
         res.render("sitefiles/show",{newId:newId})      
       }
   });
});

router.get("/food/:id/edit",isAdm, function(req, res){
    food.findById(req.params.id, function(err, newEdit){
        if(err){
            console.log(err)
        }else{
            res.render("sitefiles/edit",{newEdit:newEdit}); 
        }
    });
});

router.put("/food/:id/", isAdm,function(req, res){
   food.findByIdAndUpdate(req.params.id, req.body.foodForm, function(err, newUpdate){
      if(err){
          console.log(err)
      } else{
         
          res.redirect("/food/"+req.params.id);
      }
   });
});
router.delete("/food/:id",isAdm, function(req,res){
    food.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/food");
        }else{
            res.redirect("/food");
        }
    });
});
router.get("*", function(req, res){
    res.render("star")
})
function isAdm(req, res, next){
if(req.isAuthenticated()&& req.user.isAdmin==true){
         return next();
    }
     res.render("noadmin");
    }
    

module.exports= router;