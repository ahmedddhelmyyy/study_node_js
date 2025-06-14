//import
const article=require("./models/Article");
// const articles=require("./views/articles.ejs")

const express=require("express");//common js way

//use val
const app=express();

//add mongoose
//mongodb+srv://ahmeddashraffhelmyy:cZh1oCYv5aKwfVHh@cluster0.rvzldjs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
const mongoose=require("mongoose");
const Artical = require("./models/Article");


mongoose.connect("mongodb+srv://ahmeddashraffhelmyy:cZh1oCYv5aKwfVHh@cluster0.rvzldjs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(()=>{ //then heya el 3amlya elly haytem call awel ma connect ytem
console.log("connected db");
}).catch((error)=>{
console.log("error while connection to the database " , error);
})



//to read data from body 
app.use(express.json())





//get ("path" , function (request , response )=>{}) this called endpoint or controolers 
app.get("/hello",(req, res)=>{
res.send("Hello");
})


app.get("/findSum/:number1/:number2",(req,res)=>{
  const num1=req.params.number1;
  const num2=req.params.number2;
  const total =Number(num1)+Number(num2);

console.log(req.params);
res.send(`nums : ${num1} => ${num2} and the total is ${total}`);
});


app.get("/sayHello",(req,res)=>{
// //  const namee=req.body.name;
// console.log(req.body.name)
// console.log(req.query.age)
// res.send(`Hello ${req.body.name} Age is ${req.query.age}`);
res.json({
name:req.body.name,
age:req.query.age,
language : "arabic"
});
});



app.get("/numbers",(req,res)=>{
let numbers="";
for(let i=0 ; i<100 ; i++){
numbers+= i+ " "; 
}
// res.send(numbers);
// res.send("<h1> Hello </h1>");
// console.log(__dirname);
// res.sendFile(__dirname + "/views/numbers.html");

//bydeafualt by3rf in fe folder esmo "views" =============
res.render("numbers.ejs",{
  name:"helmyy",  
  numbers:numbers
});

});


app.get("/",(req,res)=>{
    res.send("Main PAge Please specify a path");
});

app.get("/hi",(req,res)=>{
res.send("Hi");
});

app.get("/yes",(req,res)=>{
res.send("yesss");
});


app.post("/addComment",(req,res)=>{
res.send("post request");
});


//=======articale end point
app.post("/articles", async (req,res)=>{
  //oop way 
  const newArticle=new Artical();
const artTitle=req.body.artTitle;
const artBody=req.body.artBody;
// res.send(`test data ${artTitle} and ${artBody}`);
// return;

  newArticle.title=artTitle;
  newArticle.body=artBody;
  newArticle.numberOfLikes=20;


   await newArticle.save();//async
  res.json(newArticle)
  // res.send("data saved in collection");
  
});


app.get("/articles",async(req,res)=>{
const viewArt=await Artical.find();
// console.log(`articles are : ${viewArt}`)

res.json(viewArt);


});

//with id ===============
app.get("/articles/:artId",async (req,res)=>{
  const id= req.params.artId;
  try{
  const artId=await Artical.findById(id);
  res.json(artId);
  }catch(error){
console.log("error is : ", error)
  }
});


app.delete("/articles/:Aid",async(req,res)=>{
const id=req.params.Aid;
  try{
const art=await Artical.findByIdAndDelete(id);
res.json(art);
}catch(e){
  res.send("error is : ", e)
}
});



app.get("/allArts" ,async (req , res)=>{
try{
    const arts= await Artical.find();
   
  res.render("articles.ejs",{
    allArts:arts
  });
  return;
  
  }catch(e){
    res.json(e);
   }

});












app.listen(4200,()=>{


  console.log("iam listinong from port 4200");
    
}
)