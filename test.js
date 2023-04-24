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

db.run("INSERT INTO verification(code,gültig) VALUES (?,?)", [2222,true]);
