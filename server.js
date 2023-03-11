const express=require("express")
const parser=require("body-parser")
const mong=require("mongoose")
const app=new express();
const cors = require('cors');
const fs = require('fs');
// import * as dotenv from 'dotenv'
// dotenv.config();



app.use(express.static("public"))


app.use(cors());
app.options('*', cors());

app.use(parser.urlencoded({extended:false}));

app.use(parser.json()); 


mong.connect("mongodb+srv://kaushikji:ebY6914I37pP7fJo@cluster0.f6fro.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {useNewUrlParser: true},function(err){
    
    
    if(err){
        console.log(err);    }
});


require('dotenv').config();
app.listen(4000,(res,error)=>{

console.log("server is working");
});






const compartment=new mong.Schema({

name:String,
userid:String,
Temp:Number,
Humid:Number,
Notification:String,
status:String,

commodity:String

});



const memberschema=new mong.Schema({
    
    name:String,
    adress:String,
    email:String,
    mobile:Number,
    passward:String,
    compartments:[String],
    Balance:Number
    
})


const user=mong.model("user",memberschema);

const Compartment=mong.model("compartment",compartment);








const query = 'clientId=android-app&type=request&createdAt=1550493108338&action=setPowerState&value={"state": "On"}';
var request = require("request");
app.get("/on",(req,res)=>{
    var options = { method: 'GET',
    url: 'https://api.sinric.pro/api/v1/devices/63ecc2f01bb4e19c119cbab5/action?' + query,
    headers: 
     { Authorization: 'Bearer ',
      'Content-Type': 'application/x-www-form-urlencoded' 
     }
    };
    request(options, function (error, response, body) {
        console.log(response);
        if (error) throw new Error(error);
       console.log(body);
      })
})



app.post("/signin",function(req,res){
    console.log(req.body);
  
    user.find({email:req.body.email,passward:req.body.password},function(err,result){
        
        
        if(!err){
            console.log(result[0]);
            if(result.length>0){
            res.json(result[0]);
            
            // res.status(200).send(JSO(result[0]));
            
            }
            else{
                
                
             res.status(401).send("no");

                
                
            }
            
            
            
        }
    })
    
    
})
app.get("/",(req,res)=>{
console.log("the server is running"+req);


})


app.post("/api/getuserdata")

app.post('/temp',(req,res)=>{

 

console.log(req.params.temp);
fs.writeFile('./data.js',req.params.temp,err => {
    if (err) {
      console.error(err);
    }
    else{
        res.send("ok");
    }
    // file written successfully
  });

})


app.post("/updateddata",(req,res)=>{

    console.log(req.data);
    user.find({email:req.body.email,passward:req.body.password},function(err,result){
        
        
        if(!err){
            console.log(result[0]);
            if(result.length>0){
            res.json(result[0]);
            
            // res.status(200).send(JSO(result[0]));
            
            }
            else{
                
                
             res.status(401).send("no");

                
                
            }
            
            
            
        }
    })
    

  
})

app.post('/api/showallcompartment',(req,res)=>{
console.log(req.body)
// console.log("the backed request is"+req.body);
if(req.body.userid==null){

    res.send(["nothing"]);
}
else{
Compartment.find({userid:req.body.userid},function(err,result){
if(!err){

    res.send(result);
}
else{

    res.send("notok");
}

})
}
})