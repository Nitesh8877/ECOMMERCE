/**
* This file will be used for the following purpose: 
*
* 1. Create the DB connection with the help of sequelize
* 2. Export all the functionalities of the model through the file. 
* 
* One of the advantages of using index.js file is, other file
* trying to import this file, just need to provide the
* module name.
*
*/
const env=process.env.NODE_ENV || "development"; //env->Production, development
const config=require("../configs/db.config.js")[env];
const Sequelize=require('sequelize');

/*
 * Creating the db connection
*/

const sequelize=new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD,{
        host:config.HOST,
        dialect:config.dialect
    }
);

const db={
    
};

db.Sequelize=Sequelize;
db.sequelize=sequelize;
/**
 * Easy way to understand
 * 
 * const categoryFunction=require('./category.model.js');
 * const categroy=categoryFunction(sequelize,Sequelize);
 */
db.category=require('./category.model.js')(db.sequelize,Sequelize);
db.product=require('./product.model.js')(db.sequelize,Sequelize);
db.user=require("./user.model.js")(db.sequelize,Sequelize);
db.role=require("./role.model.js")(db.sequelize,Sequelize);
db.cart=require("./cart.model.js")(db.sequelize,Sequelize);

/**
 * Establish the relationship between Role and the User
 * 
 * Role and User is many to many relationship
 */

 db.role.belongsToMany(db.user, {
    through: "user_roles",
    foreignKey: "roleId",
})

db.user.belongsToMany(db.role, {
    through: "user_roles",
    foreignKey: "userId"
})

/**
 * Relationship between Cart and Products: Many to Many
 * 
 */

 db.product.belongsToMany(db.cart, {
    through: "cart_products",
    foreignkey: "productId"
});

db.cart.belongsToMany(db.product, {
    through: "cart_products",
    foreignKey: "cartId"
})
/**
 * Relationship between Cart and User: one to many
 */

 db.user.hasMany(db.cart);


 db.ROLES = ["user", "admin"]


/**
 * call the function in present the category model file 
 * (sequelize,Sequelize) 
 */
/*
db={
    Sequelize:
    sequelize:
    category:function (){

    }
    product:funtion(){
        
    }
    user:function(){

    }
    role:function(){
        
    }
    cart:function(){

    }

}

*/
module.exports=db;