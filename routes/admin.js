var express = require("express");
var router  = express.Router();
var passport = require("passport");
var User = require("../models/user")
router.get("/register", function(req,res){
    res.render("register");
});

router.post("/register", function(req, res){
    
    var newUser = new User({username: req.body.username});
    
    if(req.body.adminCode==="stripesbird442"){
        newUser.isAdmin=true;
    }
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            req.flash("error", err.message);
            return res.render("register");
        }
      passport.authenticate("local")(req,res, function(){
            res.redirect("/food")
        });
    });
});
router.get("/adminlog", function(req,res){
    res.render("adminlog")
});

router.post("/adminlog", passport.authenticate("local",{
    successRedirect:"/food",
    failureRedirect:"/adminlog"
}), function(req, res){
});
function isLogin(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}
function isAdm(req, res, next){
if(req.isAuthenticated()&& req.user.isAdmin==true){
         return next();
    }
     res.render("noadmin");
    }
    
module.exports= router;