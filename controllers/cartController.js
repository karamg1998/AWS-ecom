const Cart=require('../models/cart');
let itemsPerPage=2;

exports.addPtC=async (req,res,next)=>{
    try{
      await Cart.create({
        quantity:req.body.prodQty,
        name:req.body.prodName,
        image:req.body. prodImage,
        price:req.body.prodPrice,
        userId:req.user.id
      }).then(cart=>{
        res.json(cart);
        console.log('item added to cart');
      });
    }
    catch(err){
        res.status(500).json({
          error:err
        });
        console.log('error in adding product to the cart');
    }
        
  };
  
  exports.getCartItems=async (req,res,next)=>{
    let page=req.query.page;
    let items;
    try{
     await Cart.count().then(count=>{
          items=count;
          return Cart.findAll({offset:(page-1)*itemsPerPage,limit:itemsPerPage});
     }).then(products=>{
      res.json({
      products:products,
      currentpage:page,
      hasNextPage:itemsPerPage*page<items,
      previousPage:page>1,
      lastPage:Math.ceil(items/itemsPerPage),
      totalitems:items
      })
      console.log('cart items sent');
    });
    }
    catch(err){
      res.status(500).json({
        error:err
        });
     console.log('error in getting cart items');
    }
  };
  
  exports.delCartItems=async (req,res,next)=>{
      let Id=req.params.Id;
    try{
      await Cart.findByPk(Id).then(item=>{
      res.json(item);
      item.destroy();
      console.log('item deleted');
      });
    }
    catch(err){
      res.status(500).json({
        error:err
        });
      console.log('error in deleting product');
    };
  };