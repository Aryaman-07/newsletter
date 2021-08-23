const express=require("express");
var bodyParser = require('body-parser');
const request=require("request");
const https=require("https");
const app=express();
//app.use(express.bodyParser());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"))
app.get("/",function(req,res){
  res.sendFile(__dirname+"/signup.html")
});
app.post("/",function(req,res){
  var firstname=req.body.fname;
  var lastname=req.body.lname;
  var email=req.body.email;
  console.log(firstname,lastname,email);

var data={
  members: [
    {
      email_address:email,
      status: "subscribed",
      merge_fields:{
        FNAME:firstname,
        LNAME:lastname
      }
    }
  ]
};
const jsondata=JSON.stringify(data);
const url="https://us5.api.mailchimp.com/3.0/lists/88fb7c8d06";
const option={
  method:"POST",
  auth: "aryaman1:dd66bed6cf5824d7cb22cbc7e5cd8ac1-us5"
}
const request=https.request(url,option,function(response){
  if(response.statusCode==200){

    res.sendFile(__dirname+"/success.html");

  }
  else {
res.sendFile(__dirname+"/failure.html");

  }
  response.on("data",function(data){
    console.log(JSON.parse(data));
  })
})
  request.write(jsondata);
  request.end();


});

app.post("/failure",function(req,res){
  res.redirect("/");
});

app.listen(process.env.PORT || 3000,function(){
  console.log("server is up and running");
});
//dd66bed6cf5824d7cb22cbc7e5cd8ac1-us5
//id
//88fb7c8d06
