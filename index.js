var express = require("express");
var app     = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded())
app.use(bodyParser.json())
// render HTML UI 
app.get('/', function (req, res) {
res.sendFile(__dirname + '/ui/ui.html');
});


app.get('/updatePeople',function(){
  console.log('update people requested');
});

//app.get('/addPeople',function(){
//  console.log("add people requested!");
//});

app.post('/addPeople',function(req, res, next){
   console.log(req.body)
  res.send(200, req.body);
 });   


app.delete('/deletePerson',function(req, res, next){
   console.log(req.body)
  res.send(200, req.body);
 });   

app.get('/getPeople',function(){
  console.log("get people requested");
});

app.listen(3000);

console.log("node task running..");
console.log("Running at Port 3000");
