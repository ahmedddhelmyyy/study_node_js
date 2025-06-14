const mongoose=require("mongoose");

const schema=mongoose.Schema;

//مخطط
const articleSchema=new schema({
    title:String,
    body:String,
    numberOfLikes:Number,


});

//model ("esm el collection" , mokhattat "schema")
const Artical=mongoose.model("Article",articleSchema);


//common js
module.exports=Artical;