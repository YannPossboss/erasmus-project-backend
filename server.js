//All imports
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const fs = require("fs");
const { isBuffer } = require("util");
const dotenv = require("dotenv");
dotenv.config();
// Database imports
const sqlite3 = require("sqlite3").verbose()
// Hashimport
const bcrypt = require("bcryptjs");
//JSONWEBTOKEN
const jwt = require("jsonwebtoken");
const cors = require("cors");
app.use(cors()); 

//connect to database
const db = new sqlite3.Database("database/mock.db", sqlite3.OPEN_READWRITE, (err) =>{
    if(err) return console.error(err.message);
});

//db.run("CREATE TABLE users(id INTEGER PRIMARY KEY AUTOINCREMENT,email STRING,password STRING,country STRING,admin BOOLEAN)");


//some middleware

app.use(express.urlencoded({ extended: false}))
app.use(express.json());
app.use(bodyParser.json());
console.log("middleware was loaded");

//START OF API

//Register
app.post("/register", (req,res)=>{
    db.all("SELECT * FROM users", [], async (err,rows) => {
        if (err) return console.error(err.message);
        let emailIsInUse = false;
        let usernameIsInUse = false;
        for(let i = 0; i < rows.length; i++){
            if(rows.at(i).email === req.body.email){
                emailIsInUse = true;
            }
            if(rows.at(i).username === req.body.username){
                usernameIsInUse = true;
            }
        }
        
        if(emailIsInUse === false && usernameIsInUse === false){
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(req.body.password, salt)

            db.all("SELECT * FROM verification", [], async (err,rows) => {
                if (err) return console.error(err.message);
                let admincodeTrue = false; 
                for(let i = 0; i < rows.length; i++){
                    if(rows.at(i).code == req.body.admin && rows.at(i).gültig == true){
                        admincodeTrue = true;
                        db.run("UPDATE verification SET gültig = false WHERE id = ?", [rows.at(i).id]);
                    }
                }

                if(admincodeTrue){
                db.run("INSERT INTO users(email,password,country,admin,username) VALUES (?,?,?,?,?)", [req.body.email,hashPassword,req.body.country,true,req.body.username], (err) => {
                    if (err){
                        return console.error(err.message);
                    }else{
                        res.send("Registrierung war erfolgreich");
                        console.log("Debuginfo: Registrierung erfolgreich");
                    }
                });
                }else{
                    res.status(400).send("Verifizierungscode ist fehlerhaft.");
                }
            });

        }else{ res.status(400).send("Email oder Username wird bereits verwendet");}
    });
});

//Login
app.post("/login", (req,res) => {
    db.all("SELECT * FROM users", [], async (err,rows) => {
        let emailOrUsernameExist = false;
        let dataset;
        for(let i = 0; i < rows.length; i++){
            if(req.body.emailOrUsername == rows.at(i).email || req.body.emailOrUsername == rows.at(i).username){
                emailOrUsernameExist = true;
                dataset = rows.at(i);
            }
        }
        if(emailOrUsernameExist === false){ return res.status(400).send("Invalid Email or Username");  }
        const validPass = await bcrypt.compare(req.body.password, dataset.password);
        if(!validPass) {return res.status(400).send("Invalid Password"); }
        
        //Create and assign a token
        const token = jwt.sign({id: dataset.id, test: true}, process.env.TOKEN_SECRET)
        res.header("auth-token", token).send(token);
        console.log("Debuginfo  Eingelogt: " + token);
    });
});

//Recipe
app.post("/recipe", (req,res) =>{
    db.all("SELECT * FROM recipes WHERE name LIKE '%' || ? || '%'", [req.body.search], async (err,rows) => {
        let recipe = rows.at(req.body.recipeId - 1);
        let recipewithdata = {...recipe, "length": rows.length, "idNotPrimaryKey": req.body.recipeId}
        let recipewithdataReady = {...recipewithdata, test: false}
        if(rows.length > req.body.recipeId - 1){
            recipewithdataReady = {...recipewithdata, test: true}
        }
            
        
        res.header("recipe"+req.body.recipeId, recipewithdataReady).send(recipewithdataReady);
    });
});

//Middleware für Authentifizierung
app.use("/secured/*", (req,res,next) => {
    const m = jwt.verify(req.body.token, process.env.TOKEN_SECRET);
    if(m.test){
        next();
    }else{
        res.status(400).send("Invalid Token");
    }
});

//Hier können geschützte Routen hin >>>>>>>
app.post("/secured/user", (req,res) =>{
    const m = jwt.verify(req.body.token, process.env.TOKEN_SECRET);
    let user = null;
    db.all("SELECT * FROM users", [], async (err,rows) => {
        for(let i = 0; i < rows.length; i++){
            if (rows.at(i).id == m.id){
                user = rows.at(i);
                res.header("user", user).send(user);
            }
        }
        if(user == null){
            res.status(400).send("Your not loged in")   
        }
        
    })

})

app.post("/secured/create", (req,res) =>{
    db.all("SELECT * FROM recipes", [], async (err,rows) => {

        db.run("INSERT INTO recipes(name,country,recipetime,describtion,task1,task2,task3,task4,task5,task6,task7,task8,task9,task10,ingredient1,ingredient2,ingredient3,ingredient4,ingredient5,ingredient6,ingredient7,ingredient8,ingredient9,ingredient10,ingredient11,ingredient12,ingredient13,ingredient14,ingredient15,ingredient16,ingredient17,ingredient18,ingredient19,ingredient20) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", 
                [req.body.name,req.body.country,req.body.recipetime,req.body.describtion,req.body.task1,req.body.task2,req.body.task3,req.body.task4,req.body.task5,req.body.task6,req.body.task7,req.body.task8,req.body.task9,req.body.task10,req.body.ingredient1,req.body.ingredient2,req.body.ingredient3,req.body.ingredient4,req.body.ingredient5,req.body.ingredient6,req.body.ingredient7,req.body.ingredient8,req.body.ingredient9,req.body.ingredient10,req.body.ingredient11,req.body.ingredient12,req.body.ingredient13,req.body.ingredient14,req.body.ingredient15,req.body.ingredient16,req.body.ingredient17,req.body.ingredient18,req.body.ingredient19,req.body.ingredient20], 
                (err) => {
            if (err){
                res.status(400).send("Upload fehlgeschlagen")
                return console.error(err.message);
            }else{
                res.send("Upload war erfolgreich");
                console.log("Debuginfo: Rezept gespeichert");
            }
          });



    });
});
//Hier können geschützte Routen hin <<<<<<<



//END OF API

app.listen(5000), () => {
    console.log("Server listen");
};