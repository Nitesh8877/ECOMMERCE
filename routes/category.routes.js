/***
 * This file will contain the routing logic for the Category controller
 */

 const { requestValidator, authJwt} = require("../middlewares");

const categoryController=require("../Controllers/category.controller");
module.exports=function(app){
    

    //Route for the POST request to create a category
    app.post("/ecom/api/v1/categories",[requestValidator.validatorCategoryRequest,authJwt.verifyToken,authJwt.isAdmin],categoryController.create);

    //Route for the GET reqest to fetch all the categories
    app.get("/ecom/api/v1/categories",categoryController.findAll);

    //Route for the GET request to fetch a catefory based on category id
    app.get("/ecom/api/v1/categories/:id",categoryController.findOne);

    //Route for the PUT request to update a category based on id ,authJwt.verifyToken, authJwt.isAdmin
    app.put("/ecom/api/v1/categories/:id",[requestValidator.validatorCategoryRequest,authJwt.verifyToken,authJwt.isAdmin],categoryController.update);

    //Route for the DELETE request to delete a categroy based on the id
    app.delete("/ecom/api/v1/categories/:id",[authJwt.verifyToken,authJwt.isAdmin],categoryController.delete);
}