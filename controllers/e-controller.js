const Products=require('../models/product');
const path=require('path');
let itemsPerPage=2;

exports.getP=(req,res,next)=>{
    res.sendFile(path.join(__dirname,'../view','add-product.html'))
};

exports.postP=async (req,res,next)=>{
  try{
    if(req.body.name===null && req.body.image==null && req.body.price==null)
    {
      throw new Error('all the fields are mendatory');
    }
    
    await Products.create({
    name:req.body.name,
    image:req.body.image,
    price:req.body.price,
    userId:req.user.id
     }).then(result=>{
    console.log(result);
    console.log('product created');
    res.redirect('/products');
    });

    
  }
  catch(err){
        res.status(500).json({
      error:err
      });
      console.log('error in adding products');
  }
};

exports.getAp=async (req,res,next)=>{
  let page=req.query.page;
  let totalProds;
console.log(page);
  try{
    await Products.count()
  .then(count=>{
     totalProds=count;
     return Products.findAll({offset:(page-1)*itemsPerPage,limit:itemsPerPage});
  })
  .then(products=>{
    res.json({
      products:products,
      currentpage:page,
      hasNextPage:itemsPerPage*page<totalProds,
      previousPage:page>1,
      lastPage:Math.ceil(totalProds/itemsPerPage),
      totalProds:totalProds
    });
  })
  }
  catch(err){
    res.status(500).json({
      error:err
      });
    console.log(err);
  }
}



