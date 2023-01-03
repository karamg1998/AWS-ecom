const Order=require('../models/order');
const Cart=require('../models/cart');
let itemsPerPage=2;

exports.getCO=async (req,res,next)=>{
    try{
      Cart.findAll()
    .then(items=>{
      res.json(items);
    })
    }
    catch(err){
      res.status(500).json({
        error:err
        });
      console.log('error in getting product');
    }
  };
  
  exports.PostOrder=async (req,res,next)=>{
    try{
     await Order.create({
      quantity:req.body.quantity,
      name:req.body.name,
      image:req.body.image,
      price:req.body.price,
      userId:req.body.userId
    }).then(order=>{
      res.json(order);
      console.log('order created');
    })
    }
    catch(err){
      res.status(500).json({
        error:err
        });
       console.log('error in creating order');
    }
  };
  
  exports.getOrders=async (req,res,next)=>{
    let page=req.query.page;
    let items;
    try{
     await Order.count().then(count=>{
          items=count;
          return Order.findAll({offset:(page-1)*itemsPerPage,limit:itemsPerPage});
     }).then(products=>{
      res.json({
      products:products,
      currentpage:page,
      hasNextPage:itemsPerPage*page<items,
      previousPage:page>1,
      lastPage:Math.ceil(items/itemsPerPage),
      totalitems:items
      })
      console.log('order items sent');
    });
    }
    catch(err)
    {
      res.status(500).json({
        error:err
        });
      console.log('error in getting orders');
    }
  };