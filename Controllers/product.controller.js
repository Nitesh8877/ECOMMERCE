/***
 * This file will contain the logic for the product resource.
 * Everytime any CRUD request comes for the product, methods defined in the controller 
 * file will be executed.
 */

const db=require("../models");
const Product=db.product;
const Op = db.Sequelize.Op;
/**
 * Create and save a new product
 */

exports.Create=(req,res)=>{
    /**
     * Validation of the request body
     */
    
    //  if(!req.body.name) {
    //     res.status(400).send({
    //         message: "Name of the product can't be empty !"
    //     })
    //     return;
    // }

    // if(!req.body.cost){
    //     res.status(400).send({
    //         message:"Cost of the product can't be empty!"
    //     })
    //     return;
    // }

    const product={
        name:req.body.name,
        description:req.body.description,
        cost:req.body.cost,
        categoryId:req.body.categoryId
    }

    Product.create(product)
    .then(products=>{
        console.log(`product name: [${products.name}] got insertd in data base`);
        res.status(200).send(products);

    })
    .catch(err=>{
        console.log(`Issue in inserting product name: [${product.name}] Error`);
        res.status(500).send({
            message:"Some interanl error while storing the product"
        })
    })
}

/**
 * Get a list of all the products
 * 
 * Get a items for products by name
 * 
 */

 exports.findAll = (req, res) => {

    let productName = req.query.name;
    let minCost = req.query.minCost; //null
    let maxCost = req.query.maxCost; //null
    let promise;

    if(productName) {
        promise = Product.findAll({
            where: {
                name: productName
            }
        })
    }else if(minCost && maxCost) {
        promise = Product.findAll({
            where: {
                cost: {
                    [Op.gte] : minCost,
                    [Op.lte]: maxCost
                }
            }
        })
    }else if(minCost) {
        promise = Product.findAll({
            where: {
                cost: {
                    [Op.gte] : minCost
                }
            }
        })
    }else if(maxCost) {
        promise = Product.findAll({
            where: {
                cost: {
                    [Op.lte] : maxCost
                }
            }
        })
    }
    else{
        promise = Product.findAll();
    }
    promise
    .then(products => {
        res.status(200).send(products);
    })
    .catch(err => {
        res.status(500).send({
            message: "Some internal error while fetching all the products"
        })
    })
}

/**
 * Get a category based on the product  id
*/

exports.findOne = (req, res) => {
    const productId = req.params.id; //1

    Product.findByPk(productId)
    .then(product => {
        if(!product){
            return res.status(400).json({
                message:"Product not found"
            })
        }
        res.status(200).send(product);
    })
    .catch(err => {
        res.status(500).send({
            message: "Some internal error while fetching the category based on id"
        })
    })
}


/**
 * Update the product items by id
 */

exports.update=(req,res)=>{
    // if(!req.body.name){
    //     res.status(400).send({
    //         message:"Name of the product cannot be empty"
    //     })
    // }
    // if(!req.body.cost){
    //     res.status(400).send({
    //         message:"Cost of the product cannot be empty"
    //     })
    // }

    const product={
        name:req.body.name,
        description:req.body.description,
        cost:req.body.cost,
        categoryId:req.body.categoryId
    
    }

    const productId=req.params.id;

    Product.update(product,{
        where:{
            id:productId
        }
    })
    .then(updatesProduct=>{
        Product.findByPk(productId)
        .then(product=>{
            res.status(200).send(product);
        })
        .catch(err=>{
            res.status(500).send({
                message:"Updation happened successfully, but some internal error"
            })
        })
    })
    .catch(err=>{
        res.status(500).send({
            message:"Some internal error while updating details"
        })
    })
}


/**
 * Delete the product by id
 */

exports.delete=(req,res)=>{
    const productId=req.params.id;

    Product.destroy({
        where:{
            id:productId
        }
    })
    .then(result=>{
        res.status(200).send({
            message:"successfully deleted the product"
        })
    })
    .catch(err=>{
        res.status(500).send({
            message:"Some internal error while deleting the product"
        })
    })
}


/**
 * Get the list of all products under category.
 */

 exports.getProductsUnderCategory = (req, res) => {
    const categoryId = parseInt(req.params.categoryId);

    // select * from Product where categoryID = categoryId
    Product.findAll({
        where: {
            categoryId: categoryId
        }
    })
    .then(products => {
        res.status(200).send(products);
    })
    .catch(err => {
        res.status(500).send({
            message: "Some internal error while fetching products based on category id"
        })
    })
}
