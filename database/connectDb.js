const mongoose = require('mongoose');
const mongoUri="mongodb+srv://arslan:Tiwana0111@cluster0.dlzbood.mongodb.net/?retryWrites=true&w=majority"

const connectToMongo = ()=>{
    mongoose.connect(mongoUri, ()=>{
        console.log("Connected to Mongo Successfully");
    })
}

module.exports = connectToMongo;