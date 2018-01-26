var express = require("express");
var app     = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded())
app.use(bodyParser.json())

// connect to DB
const { Pool, Client } = require('pg')

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'users',
  password: '',
  port: 5433,
})

app.get('/',function(req,res,next){
  res.sendFile(__dirname + '/ui/ui.html');
});

app.get('/getPeople',function(req, res, next){


pool.query('SELECT * FROM user_table ORDER BY id ASC', (err, result) => {
   res.send(result.rows);
//  pool.end()
})

});


// end of db

app.put('/updatePerson',function(req, res, next){
  console.log("upadating user..")
  console.log(req.body)
// res.send(200, req.body);
// UPDATE Customers SET ContactName = 'Alfred Schmidt', City= 'Frankfurt' WHERE CustomerID = 1;
pool.query("UPDATE user_table SET name='"+req.body.name+"', age='"+req.body.age+"' WHERE id='"+req.body.id+"';", (err, result) => {})
});

app.post('/addPeople',function(req, res, next){
   console.log(req.body)
  res.send(200, req.body);
  pool.query("INSERT INTO user_table (name,age) VALUES ('"+req.body.name+"','"+req.body.age+"')", (err, result) => {
 })

});




app.delete('/deletePerson',function(req, res, next){

  console.log("deleteing user.." + req.body.name);
   pool.query("DELETE FROM user_table WHERE name='"+req.body.name+"' AND age='"+req.body.age+"';", (err, result) => {

   })
 });



app.listen(3000);

console.log("node task running..");
console.log("Running at Port 3000");
