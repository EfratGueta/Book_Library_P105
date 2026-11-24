import{model,Schema}from"mongoose"
const BookSchema=new Schema({
    name:String,
    price:Number,
    categoreis:[String],
    object:{nameAuthor:String,Phone:String,email:String}
})