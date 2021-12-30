var Product = require('../products/productModel')
var userModel = require('../../component/authentication/userModel')
module.exports.findProduct = (id)=>{
    return Product.findById({_id: id});
}

exports.addItemToCart = async (userL, item, productId)=>{
    const user = await userModel.findOne({_id: userL.id}).lean();

    let totalItem = user.totalItem;
    let totalPrice = user.totalPrice;
    totalPrice += item.price;
    totalItem += 1;
    const element = {item: item, qty: 1, price: item.price, productId: productId};
    userL.cart.push(element);
    userL.totalPrice = totalPrice;
    userL.totalItem = totalItem;
    await userModel.updateMany({_id: userL.id}, {$push: {cart: element}, $set: {totalItem: totalItem, totalPrice: totalPrice}}, {multi: true});
}

exports.insertOneItem = async (user, productID) => {
    let qty, price, totalItem, totalPrice, index = 0;
    const userL = await userModel.findOne({_id: user.id});
    totalPrice = userL.totalPrice;
    totalItem = userL.totalItem;

    for (let element of userL.cart){
        if(element.productId === productID){
            qty = element.qty + 1;
            price = element.price + element.item.price;
            totalPrice += element.item.price;
            totalItem += 1;

            user.totalPrice = totalPrice;
            user.totalItem = totalItem;
            user.cart[index].qty = qty;
            user.cart[index].price = price;
            ++index;  
        }
    }
    if(qty && price){
        await userModel.updateMany({_id: user.id, "cart.productId": productID}, {$set: {"cart.$.price": price, "cart.$.qty": qty, totalItem: totalItem, totalPrice: totalPrice}})
    }
}       

exports.deleteOneItem = async (user, productID)=>{
    let qty, price, totalItem, totalPrice, index = 0;
    const userL = await userModel.findOne({_id: user.id});
    totalPrice = userL.totalPrice;
    totalItem = userL.totalItem;

    for (let element of userL.cart){
        if(element.productId === productID){
            qty = element.qty - 1;
            price = element.price - element.item.price;
            totalPrice = totalPrice - element.item.price;
            totalItem = totalItem - 1;

            if(qty <= 0){
                userL.cart.splice(index, 1);
                user.cart = userL.cart;
                await userModel.findOneAndUpdate({_id: user.id}, {cart: user.cart, totalPrice: totalPrice, totalItem: totalItem})
            }else{
                user.cart[index].qty = qty;
                user.cart[index].price = price;    
            }
            user.totalPrice = totalPrice;
            user.totalItem = totalItem;
            ++index;  
        }
    }
    if(qty && price){
        await userModel.updateMany({_id: user.id, "cart.productId": productID}, {$set: {"cart.$.price": price, "cart.$.qty": qty, totalItem: totalItem, totalPrice: totalPrice}})
    }
}