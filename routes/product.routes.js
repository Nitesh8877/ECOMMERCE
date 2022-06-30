
/**
 * This file will contain the routes logic for the Product resource
 */

const {requestValidator,authJwt}=require("../middlewares");

const productController=require("../Controllers/product.controller");

module.exports=function(app){

        //Route for the POST request to create a product
    app.post("/ecom/api/v1/products",[requestValidator.validatorProductRequest,authJwt.verifyToken,authJwt.isAdmin],productController.Create);

    //Route for the GET request to get the all the product by and without name
    app.get("/ecom/api/v1/products",productController.findAll);

    //Route  for the  GET request to the product by id [authJwt.verifyToken, authJwt.isAdmin],
    app.get("/ecom/api/v1/products/:id",productController.findOne);

    app.put("/ecom/api/v1/products/:id",[requestValidator.validatorProductRequest,authJwt.verifyToken,authJwt.isAdmin],productController.update);
    
    app.delete("/ecom/api/v1/products/:id",[authJwt.verifyToken,authJwt.isAdmin],productController.delete);
    
    app.get("/ecom/api/v1/categories/:id/products",productController.getProductsUnderCategory);

}


