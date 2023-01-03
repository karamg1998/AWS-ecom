const controller=require('../controllers/orderController');
const express=require('express');


const router=express.Router();

router.get('/getCartOrder',controller.getCO);
router.post('/PostOrder',controller.PostOrder);
router.get('/getOrders',controller.getOrders);




module.exports=router;
