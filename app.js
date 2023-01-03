const express=require('express');
const bodyParser=require('body-parser');
const path=require('path');
const app=express();
const dotenv=require('dotenv');
dotenv.config();

const sequelize=require('./database/database');

const routes=require('./routes/e-commerce');
const Cart=require('./routes/cart');
const order=require('./routes/order');

const user=require('./models/user');
const products=require('./models/product');
const cart=require('./models/cart');
const Order=require('./models/order');

const cors=require('cors');

app.use(express.static(path.join(__dirname,'css')));

app.use(cors());

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use((req,res,next)=>{
    user.findByPk(1)
    .then(user=>{
        req.user=user;
        next();
    }).catch(err=>{
        console.log(err);
    })
});
app.use(routes);
app.use(Cart);
app.use(order);


app.use((req,res)=>{
    console.log(req.url);
   res.sendFile(path.join(__dirname,`frontend/${req.url}`))
})
//app.use(notFound);
products.belongsTo(user);
user.hasMany(products);
user.hasOne(cart);
user.hasMany(Order);


sequelize
.sync()
.then(result=>{
    user.findByPk(1).then(User=>{
        if(!User)
        {
            user.create({name:'karamveer',email:'kg@xyz.com',phone:'58585858'});
        }
    });
}).then(res=>{
    app.listen(3000);
})
.catch(err=>console.log(err));