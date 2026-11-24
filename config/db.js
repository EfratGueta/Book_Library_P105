import {connect}from "mongoose"

export const connectDB =acync()=>{
    try{
        const MOGODB_URI=process.env.MOGODB_URI
        await connect(`${MONGO_URI}/LibraryDB`)
        console.log('mongo connected successfuly');

    }catch(err){
        console.log(err.message)
        process.exit(1)
    }
}
