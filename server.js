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





// const jobschema=new mong.Schema(
// {
   
//    name:String,
//   cropage:Number,
//   cropcost:Number,
//     city:String,
//     category:String,
//   weight:Number,
//     mobile:Number
    
    
// })

const compartment=new mong.Schema({

Content:String,
Notification:String,
temprature:Number,
Humidity:Number,
Balance:Number

});



const memberschema=new mong.Schema({
    
    name:String,
  adress:String,
    email:String,
    mobile:Number,
    passward:String,
    appliedto:[String]
    
})


const user=mong.model("user",memberschema);



const Compartment=mong.model("compartment",compartment);









// app.post('/fogetpassword',function(req,res){
// console.log("a request has been therein the system");
//     console.log(req.body);
// 	const transport = nodemailer.createTransport({
// 		service:"gmail",
// 		host: "smtp.gmail.com",
// 		port: 465,
// 		auth: {
// 			user: "automater420@gmail.com",
// 			pass: "hrszqqhjzejspvjx"
// 		}
// 	})
// 	console.log(transport)

// 	transport.sendMail({
// 		from: "dm29phase1@gmail.com",
// 		to: req.body.email,
// 		subject: "Meeting Nofication",
// 		html: `<div className="email" style="
//         border: 1px solid black;
//         padding: 20px;
//         font-family: sans-serif;
//         line-height: 2;
//         font-size: 20px; 
//         ">
//         <h2>Here is your metting link</h2>
// 		<h3>Hi your ${req.body.Company} Meeting has been schedule for ${req.body.Schedule} Please Join by Clicking on the Below Link</h3>
// 		<a href=${req.body.Link}>${req.body.Link}</a>
//         <br>
// 	    <span>Siddhant Kaushik<br>AllSafe<span>
//          </div>
//     `
// 	}).then((result)=>{
//      console.log(result);
// 		res.render("otp.ejs");



// });
// });


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
console.log("the server"+req);
res.send("hehrs");

})

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