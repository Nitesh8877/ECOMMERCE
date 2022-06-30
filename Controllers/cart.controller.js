/**
 * This file contaions the controller logic for cart resources
 * Everytime any CRUD request come for the cart, method defined
 * in this controller file will be executed.
 */


const db=require("../models");
const Product=db.product;
const Cart=db.cart;
const Op=db.Sequelize.Op;
const { STATUS }=require("../configs/cart.status.config");

exports.create=(req,res)=>{

    const cart={
        userId:req.userId,//we are getting thid id from middleware
        status:STATUS.CREATION
    }

    Cart.create(cart)
    .then(cart=>{
        res.status(201).send(cart);
    })
    .catch(err=>{
        res.status(500).send({
            message:"Some internal server error happened!"
        });
    });
};

exports.update=(req,res)=>{

    const cartId=req.params.id;
    
    Cart.findByPk(cartId)

    .then(cart=>{

        Product.findAll({
            where:{
                id:req.body.productIds
            }
        })
        .then(items=>{
            if(!items){
                res.status(400).send({
                    message:"Items trying to add does not exist"
                })
            }

            cart.setProducts(items)
            .then(()=>{
                var cost=0;
                const ProductSelected=[];
                cart.getProducts()
                .then(products=>{
                    for(let i=0;i<products.length;i++){
                        cost=cost+products[i].cost;
                        ProductSelected.push({
                            id:products[i].id,
                            name:products[i].name,
                            cost:products[i].cost
                        });
                    }
                    res.status(200).send({
                        id:cart.id,
                        ProductSelected:ProductSelected,
                        cost:cost
                    })
                })
            })
        })
        .catch(err=>{
            res.status(500).send({
                message:"Some internal server error happened while fetching products details"
            })
        })
    })

    .catch(err=>{
        res.status(500).send({
            message:"Some internal server error happened while fetching cart details"
        })
    })

}

exports.getCart=(req,res)=>{

    Cart.findByPk(req.params.cartId)
    .then(cart=>{
        var cost=0;
        const ProductSelected=[];

        cart.getProducts()
        .then(products=>{
            for(let i=0;i<products.length;i++){
                cost=cost+products[i].cost;
                ProductSelected.push({
                    id:products[i].id,
                    name:products[i].name,
                    cost:products[i].cost
                })
            }
            res.status(200).send({
                id:cart.id,
                ProductSelected:ProductSelected,
                cost:cost
            });
        });
        
    });
   

}

/**
 * Delete the products in available cart table
 */

exports.delete=(req,res)=>{

    const CartId=req.params.CartId
    // Cart.findByPk(CartId);
    Cart.destroy({
        where:{
            id:CartId
        }
    })
    .then((result)=>{
        res.status(200).send({
            message:"Successfully deleted cart items"
        });
    })
    .catch((err)=>{
        res.status(500).send({
            message:"Some internal error can not delete this items"
        });
    });
    
};


exports.ChangeStatus=(req,res)=>{

}