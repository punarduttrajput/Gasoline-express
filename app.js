const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");


//configure exppress
const app = express();

//Configure ejs
app.set("view engine", "ejs");

//setting express to use public directry for static resources
app.use(express.static("public"));


//Configure body-parser
app.use(bodyParser.urlencoded({extended:true}));

//creating connection to database
mongoose.set("strictQuery", false);
// mongoose.connect(process.env.MONGO_URL);
mongoose.connect("mongodb://localhost:27017/gasoDB");

// creating schema for users

const projectSchema = new mongoose.Schema({
    name:[{
        fName:String,
        lName:String
    }],
    address:[{
        state:String,
        district:String,
        city:String,
        pinCode:Number
    }],
    vehicleInfo:[{
        vehicleNumber:Number,
        vehicleModel:String
    }],
    password:Number
});

const user = mongoose.model("user", projectSchema);


//Home get route
const d = new Date().getFullYear();


app.get("/", function(req, res){
    res.render("home");
})

//Signup get route

app.get("/signUp", function(req, res){
    res.render("signUp");
})

app.get("/login", function(req, res){
    res.render("login");
})


app.listen(3000,function(){
    console.log("Server is running on port 3000");
});