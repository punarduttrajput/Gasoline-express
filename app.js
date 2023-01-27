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
        area:String,
        pinCode:Number
    }],
    vehicleInfo:[{
        vehicleNumber:String,
        vehicleType:String
    }],
    mobile:Number,
    password:String,
    email:String
});

//creating model
const user = mongoose.model("user", projectSchema);


//Home get route

app.get("/", function(req, res){
    res.render("home");
})

//Signup get route

app.get("/signUp", function(req, res){
    res.render("signUp");
})


//Signup post route

app.post("/signUp", function(req, res){
    const Fname = req.body.firstName;
    const Lname = req.body.lastName;
    const Email = req.body.eMail;
    const State = req.body.cState;
    const District = req.body.cDistrict;
    const Area = req.body.cArea;
    const pincode = req.body.cPincode;
    const vehicleType = req.body.vehicleType;
    const vehicleNumber = req.body.cVehicleNumber;
    const password = req.body.Password;
    const conPassword = req.body.cPassword;
    const mobileNumber = req.body.mNumber;

    // console.log(conPassword);

    if(conPassword === password)
        {
            const newUser = new user({
                name:[{
                    fName:Fname,
                    lName:Lname
                }],
                address:[{
                    state:State,
                    district:District,
                    area:Area,
                    pinCode:pincode
                }],
                vehicleInfo:[{
                    vehicleNumber:vehicleNumber,
                    vehicleType:vehicleType
                }],
                password:password,
                mobile:mobileNumber,
                email:Email
            });

            newUser.save();
            res.render("response", {
                headingContent:"Congrats!",
                name:Fname,
                response:"You are succesfully registered."
            });
        }
    else
    {
        res.render("response", {
            headingContent:"Oops!",
            name:"Password",
            response:"Not matched"
        })
    }
});

//login get route

app.get("/login", function(req, res){
    res.render("login");
});

//login post route

app.post("/login", function(req, res){
    const mail = req.body.userEmail;
    const pass = req.body.userPass;

    user.findOne({email:mail}, function(err, foundItem){
        if(!err){
            if(foundItem){
                if(pass === foundItem.password)
                {
                    
                    res.render("response",{headingContent:"Welcome back!", name:foundItem.name[0].fName, response:"How are you?"})
                }
                else{
                    res.render("response",{headingContent:"Oops!", name:"Sorry", response:"You have entered wrong password"})
                }
            }
            else
            {
                res.render("response",{headingContent:"Seems like", name:"You", response:"are not registered"})
            }
        }
    })
})

app.listen(3000,function(){
    console.log("Server is running on port 3000");
});