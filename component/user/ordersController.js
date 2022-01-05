const orderSchema = require('./ordersSchema')
const cartSchema = require('../cart/cartModel')
const ordersService = require('./ordersService');
const PAGE_SIZE = 4;
exports.getCart = async (req, res) =>{
    const phoneNumber = req.body.phoneNumber;
    const address = req.body.address;
    const cart = JSON.parse(req.body.cart);
    const idCart = req.body.idCart;

    if(!phoneNumber || !address){
        req.session.error = "Information can't empty"
        res.redirect('/cart')
    }


    const order = new orderSchema({
        customerId: req.user.id,
        items: cart,
        address: address,
        phone: phoneNumber,
    })
    req.user.totalItem = 0;
    const result =  await order.save();
    await cartSchema.findOneAndDelete({_id: idCart});

    // const result = await order.save();
    if(result){
        res.redirect('/me/orders')
    }else{
        res.redirect('/cart')
    }
}

exports.showOrders = async (req, res)=>{
    const listOrders = await orderSchema.find({customerId: req.user.id}).populate('items.productID');
    const listOrder = ordersService.convertArray(listOrders);
    res.render('user/views/ordersList', {listOrder});
}

exports.showDetail = async (req, res)=>{
    const billDetails = await orderSchema.find({_id: req.params.id}).populate('items.productID').populate('customerId');
    const totalPrice = ordersService.totalPrice(billDetails[0].items);
    const totalItem = ordersService.totalItem(billDetails[0].items)
    const billDetail = ordersService.convertArrayDetail(billDetails, totalPrice, totalItem)

    res.render('user/views/orderDetail', {billDetail});
}

exports.getOrdersPage = async(req, res)=>{
    
    let { page } = req.query;
    let orders;

    if (page) {
        page = parseInt(page);
        if (page < 1) page = 1;
        const skip = (page - 1) * PAGE_SIZE;
        orders = await ordersService.show(skip, PAGE_SIZE, req.user);
        var total = await ordersService.countDocuments(req.user);

        res.json({
            sumPage: total,
            orders: orders,
        });
    }
}