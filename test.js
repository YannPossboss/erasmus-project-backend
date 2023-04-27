// Database imports
const sqlite3 = require("sqlite3").verbose();
let sql;

//connect to database
const db = new sqlite3.Database("database/mock.db", sqlite3.OPEN_READWRITE, (err) =>{
    if(err) return console.error(err.message);
});

//db.run("DROP TABLE users");

//db.run("INSERT INTO users(email,password,country,admin) VALUES (?,?,?,?)", ["markus@gmx.de","12345adsad8asvdf","spanien",false], (err) => {
//    if (err) return console.error(err.message);
//  })

//sql = "CREATE TABLE users(id INTEGER PRIMARY KEY,email,password,country,admin,username)";
//db.run(sql);

//db.run("UPDATE recipes SET country = (?) WHERE id = 2", ["Spain"])

//db.run("CREATE TABLE verification(id INTEGER PRIMARY KEY,code,gültig)");



//sql = "CREATE TABLE recipes(id INTEGER PRIMARY KEY,name,country,recipetime,describtion,veg,imagelink,username,task1,task2,task3,task4,task5,task6,task7,task8,task9,task10,ingredient1,ingredient2,ingredient3,ingredient4,ingredient5,ingredient6,ingredient7,ingredient8,ingredient9,ingredient10,ingredient11,ingredient12,ingredient13,ingredient14,ingredient15,ingredient16,ingredient17,ingredient18,ingredient19,ingredient20,alergene1,alergene2,alergene3,alergene4,alergene5,alergene6,alergene7,alergene8,alergene9,alergene10,alergene11,alergene12,alergene13)";
//db.run(sql);