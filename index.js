const express = require("express")
const app = express()
const methodOverride = require("method-override")
const bodyparser = require("body-parser")
const mysql = require("mysql2")

app.use(express.static("public"))
app.set("view engine", "ejs")
app.use(bodyparser.json())
app.use(methodOverride("_method"))
app.use(bodyparser.urlencoded({extended:true}))

app.listen(3000, ()=>{
    console.log("App Is Listening 3000")
})

const conn = mysql.createConnection({
    user: "thiru",
    host: "172.18.0.2",
    password: "1234",   
    database: "TCE",
})

conn.connect(function(err){
    if(err)
        throw err
    console.log("Connected")
})


app.get("/", (req, res)=>{
    conn.query("CREATE TABLE IF NOT EXISTS STUDENT(STUDENT_ID INT PRIMARY KEY AUTO_INCREMENT, NAME VARCHAR(100), AGE INT, GENDER CHAR, DEPT VARCHAR(4), ADDRESS VARCHAR(255));")
    conn.query("SELECT * from STUDENT", function(err, result, fields){
        if(err) throw err
        console.log(result)
        res.render("index", {title:"Student Portal", data:result})
    })

})

app.post("/register", (req, res)=>{
    console.log(req.body)
    const user = {
        studid: parseInt(req.body.studid),
        studname: req.body.name,
        age: parseInt(req.body.age),
        gender: req.body.gender,
        dept: req.body.dept,
        address: req.body.address
    }
    conn.query("INSERT INTO STUDENT VALUES(?,?,?,?,?,?)",[user.studid, user.studname, user.age, user.gender, user.dept, user.address], function(err, result){
        if(err) throw err
        console.log("Successfully inserted")
    })
    res.redirect("/")
})

app.patch("/update", (req, res)=>{
    const studid = req.body.studid
    const name = req.body.name
    conn.query("UPDATE STUDENT SET NAME=? where STUDENT_ID=?",[name, studid], function(err, result){
        if(err)
            throw err
        console.log("Successfully Updated")
    })
    res.redirect("/")
})

app.delete("/delete", (req, res)=>{
    const studid = req.body.studid
    conn.query("DELETE FROM STUDENT WHERE STUDENT_ID=?",[studid], function(err, result){
        if(err)
            throw err
        console.log("Successfully Deleted")
    })
    res.redirect("/")
})