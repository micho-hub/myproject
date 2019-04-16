var express = require("express");
var router  = express.Router();
var passport = require("passport");
var User = require("../models/user");
var middelwere =require("../middelwere/");
var food    = require("../models/food");


router.get("/", function(req,res){
    res.redirect("/food");
});

router.get("/register", function(req,res){
    res.render("register");
});

router.post("/register", function(req, res){
    
    var newUser = new User({username: req.body.username});

    User.register(newUser, req.body.password, function(err, user){
        if(err){
            req.flash("error", err.message);
            res.redirect("/register");
        }
      passport.authenticate("local")(req,res, function(){
            req.flash("success", "Welcome: "+ user.username )
            res.redirect("/food")
        });
    });
});

router.get("/login",function(req, res){
     
    res.render("login");
});

router.post("/login", passport.authenticate("local", {
  
  successRedirect: "/food",
  failureRedirect:"/login",
 
}),
function(req,res){

});
    

router.get("/logout", function(req,res){
    
    if(req.isAuthenticated()&&req.user.isAdmin==true){
        req.logout();
        res.redirect("/adminlog");
    }else{
        req.logout();
        req.flash("success", "Logged you out!")
    res.redirect("/login")
    }
});



module.exports = router;