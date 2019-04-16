var express                 = require("express"),
    bodyParser              = require("body-parser"),
    mongoose                = require("mongoose"),
    methodOverride          = require("method-override"),
    food                    = require("./models/food"),
    seedDB                  = require("./seed"),
    comment                 = require("./models/comment"),
    User                    = require("./models/user"),
    passport                = require("passport"),
    passportLocal           = require("passport-local"),
    passportLocalMongoose   = require("passport-local-mongoose"),
    expressSession          = require("express-session"),
    flash                   = require("connect-flash");


var commentRoutes           = require("./routes/comments"),
    foodsiteRoutes          = require("./routes/foodsite"),
    indexsRoutes            = require("./routes/index"),
    adminRoutes             = require("./routes/admin");

    
var app = express();
// seedDB();

app.set("view engine", "ejs");

app.use(require("express-session")({
    secret:"ke vozam tocak i ke go digam na edno kur me boli ",
    resave:false,
    saveUninitialized:false
}));
app.use(express.static(__dirname + '/public'));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.use(flash());
app.use(function(req, res, next){
    res.locals.currentUser =req.user;
    res.locals.error=req.flash("error")
    res.locals.success=req.flash("success")
    next();
});

app.use(commentRoutes );
app.use(indexsRoutes);
app.use(adminRoutes );
app.use(foodsiteRoutes );

passport.use(new passportLocal(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

mongoose.connect("mongodb+srv://myfood:myfood@myfood-eiidb.mongodb.net/test?retryWrites=true",{ useNewUrlParser: true });

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server is started");
});
