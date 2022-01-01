const orderSchema = require('./ordersSchema')
const randomString = require('randomstring')
exports.getCart = async (req, res) =>{
    let random = randomString.generate().substring(0, 8);
    let idTracking = await orderSchema.find({id: random});
    while(idTracking.length !== 0){
        random = randomString.generate().substring(0, 8);
        idTracking = await orderSchema.find({id: random});
    }

    const phoneNumber = req.body.phoneNumber;
    const address = req.body.address;
    if(!phoneNumber || !address){
        res.redirect('/cart')
    }

    const order = new orderSchema({
        id: random.toUpperCase(),
        username: req.user.username,
        customerId: req.user.id,
        items: req.user.cart,
        phone: phoneNumber,
        address: address,
        totalPrice: req.user.totalPrice,
        totalItem: req.user.totalItem
    })

    const result = await order.save();
    if(result){
        res.redirect('/me/orders')
    }else{
        res.redirect('/cart')
    }
}

exports.showOrders = async (req, res)=>{
    let listOrder = await orderSchema.find({customerId: req.user.id});
    res.render('user/views/ordersList', {listOrder});
}

exports.showDetail = async (req, res)=>{
    const billDetails = await orderSchema.find({_id: req.params.id});
    res.render('user/views/orderDetail', {billDetails});
}