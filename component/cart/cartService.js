const cartModel = require('./cartModel')
module.exports.findProduct = (id)=>{
    return Product.findById({_id: id});
}

exports.addItemToCart = async (user, productID)=>{

    const carts = await cartModel.findOne({customerID: user.id})
    let count = 0;
    if(carts){
        for(let item of carts.cart){
            if(item.productID.toString() === productID){
                count = item.qty + 1;
            }
        }
    }

    if(carts){
        if(count == 0){
            count = 1
            await cartModel.updateOne({customerID: user.id}, {$push:{cart: {productID: productID, qty: count}}})
        }else{
            
            await cartModel.updateOne({customerID: user.id, "cart.productID": productID}, {$set: {"cart.$.qty": count}})
        }
    }else{
        count = 1;
        const newCart = new cartModel({
            customerID: user.id,
            cart: [{productID: productID, qty: count}]
        })
        await newCart.save();
    }
    
   
}

exports.insertOneItem = async (user, productID) => {
    const carts = await cartModel.findOne({customerID: user.id, "cart.productID": productID})
    let count = 0;
    for(let item of carts.cart){
        if(item.productID.toString() === productID){
            count = item.qty + 1;
        }
    }
    await cartModel.updateOne({customerID: user.id, "cart.productID": productID}, {$set: {"cart.$.qty": count}})
}       

exports.deleteOneItem = async (user, productID)=>{
    const carts = await cartModel.findOne({customerID: user.id, "cart.productID": productID})
    let count = 0;
    for(let item of carts.cart){
        if(item.productID.toString() === productID){
            count = item.qty - 1;
        }
    }
    if(count == 0){
        await cartModel.update({ customerID: user.id }, { "$pull": { "cart": { "productID": productID } }}, { safe: true, multi:true });
    }else{
        await cartModel.updateOne({customerID: user.id, "cart.productID": productID}, {$set: {"cart.$.qty": count}})
    }
}       


exports.convertArray = (carts) => {
    let cart = [];

    let totalOfEachItem;
    for(item of carts.cart){
        totalOfEachItem = item.productID.price * item.qty;
        cart.push({thumbnail: item.productID.thumbnail, title: item.productID.title, price: item.productID.price, _id: item.productID._id, totalOfEachItem: totalOfEachItem, qty: item.qty})
    }

    return cart;
}

exports.convertCart = (carts) => {
    let cart = []
    for(item of carts.cart){
        cart.push({ productID: item.productID._id, qty: item.qty})
    }
    return JSON.stringify(cart);

}

exports.convertArrayForSessionCart = (cart) => {
    let arr = []
    for(let item in cart){
        arr.push({productID: item, qty: cart[item].qty})
    }
    return arr;
}

exports.findCustomer = async (id) => {
    return await cartModel.findOne({customerID: id})
}

exports.synchCart = async(carts, user, cartSessionTemp) => {
    for(let otherItem of cartSessionTemp){
        let bool = false;
        for(let item of carts.cart){
            if(otherItem.productID === item.productID.toString()){
                const toItem  = item.qty + otherItem.qty;
                await cartModel.updateOne({customerID: user.id, "cart.productID": item.productID}, {$set:{"cart.$.qty": toItem}})
                bool = true;
                break;
            }
        }
        if(!bool){
            await cartModel.updateOne({customerID: user.id}, {$push: {cart: {productID: otherItem.productID, qty: otherItem.qty}}})
        }
    }
}

exports.createCart = async (user, cartSession) => {
    const newCart = new cartModel({
        customerID: user.id,
        cart: cartSession
    })
    await newCart.save();
}

exports.totalPrice = (products) => {
    let totalPrice = 0;
    for(let item of products){
        totalPrice += item.totalOfEachItem;
    }
    return totalPrice;
}

exports.findCart = async (user) => {
    return await cartModel.findOne({customerID: user.id}).populate('cart.productID');
}