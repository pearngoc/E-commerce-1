const ordersSchema = require("./ordersSchema");

exports.convertArray = (listOrders) => {
    let arr = []
    
    for(let item of listOrders){
        let totalPrice  = 0;
        for(let i of item.items){
            totalPrice += i.productID.price * i.qty;
        }
        arr.push({id: item._id, createdAt: item.createdAt, status: item.status, totalPrice: totalPrice })
    }
    return arr;
}
exports.totalPrice = (ords) => {
    let totalPrice  = 0;
    for(let item of ords){
        totalPrice += item.productID.price * item.qty;
    }
    return totalPrice
}
exports.totalItem = (orders) => {
    let totalItem  = 0;
    for(let item of orders){
        totalItem += item.qty;
    }
    return totalItem;
}
exports.convertArrayDetail = (listOrders, totalPrice, totalItem) =>{
    let arr = []
    let items = []
    for(let i of listOrders[0].items){
        items.push({title: i.productID.title, price: i.productID.price, qty: i.qty})
    }
    let detailPayment;
    let type;
    if(listOrders[0].paymentType === "Paypal"){
        detailPayment = listOrders[0].detailPayment;
        type = 1;
    }else{
        detailPayment = listOrders[0].detailPayment;
    }
    arr.push({id: listOrders[0]._id, createdAt: listOrders[0].createdAt, status: listOrders[0].status, phone: listOrders[0].phone, address: listOrders[0].address, items: items, totalItem: totalItem, totalPrice: totalPrice, username: listOrders[0].customerId.username, paymentType: listOrders[0].paymentType, detailPayment: detailPayment, type: type})
    return arr;
}

exports.show = async(skip, page_size, user) => {
    const orders = await ordersSchema.find({customerId: user.id}).skip(skip).limit(page_size).populate('items.productID').lean();
    for(let item of orders){
        let totalPrice = 0;
        for(let it of item.items){
            totalPrice += it.productID.price * it.qty;
        }
        item.totalPrice = totalPrice;
    }
    return orders
}

exports.countDocuments = (user) =>{
    return ordersSchema.countDocuments({customerId: user.id});
}