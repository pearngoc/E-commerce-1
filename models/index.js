

const mongoose = require('mongoose')
require('dotenv').config()
const Product =require('./product')
const User = require('./user')
const ProductList = require('../database/data/product.json')
const UserList = require('../database/data/user.json')

const DB = {
    connectDB:() => {
        mongoose.connect(
            process.env.DB_CONNECTION_STRING,
            { useNewUrlParser: true, useUnifiedTopology: true },
            () => {
              console.log("Connect to MongoDB");
            }
          )
    },

    importDataProduct: async()=>{
        const n = ProductList.length
        for(let i = 0; n > i; i++){
            const pr = new Product(ProductList[i])
            try{
                await pr.save()
                console.log("Product added successfully!!!")
            }catch(err){
                console.log(err)
            }
        }
    },

    insertOneProduct: async(pro) =>{
        try{
            await Product.create(pro)
            console.log("Product added successfully!!!")
        }catch(err){
            console.log(err)
        }
    },

    importDataUser:async()=>{
        const n = UserList.length
        for(let i = 0; n > i; i++){
            const pr = new User(UserList[i])
            try{
                await pr.save()
                console.log("User added successfully!!")
            }catch(err){
                console.log(err)
            }
        }
    },

    insertOneUser: async(user) =>{
        try{
            await User.create(user)
            console.log("User added successfully!!")
        }catch(err){
            console.log(err)
        }
    },
}


module.exports = DB

