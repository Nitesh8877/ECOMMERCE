const express=require('express');
const serverConfig=require('./configs/server.config');
const bodyParser=require('body-parser');

//initialising express
const app=express();

/***
 * Using the body parser middleware
 * 
 * Used for parsing the request
 * Parsing the request of the type joson and convert that to object
 */

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());


/***
 * Initialising the database
 * 
 */

const db=require("./models");
const Category=db.category;
const Product=db.product;
const Role=db.role;

// One to Many Relationship
Category.hasMany(Product);//This will create a foreign column in Product table  categoryId 

db.sequelize.sync({force:true})
.then(()=>{
    console.log('tables dropped and created');
    Init();
})

function Init(){
    var categories=[
        {
        name:"Electronics",
        description:"This category will contain all the electronics product"

    },
    {
        name:"KitchenItems",
        description:"This category will conatin all the kitchen product"
    }];
    Category.bulkCreate(categories)
    .then(()=>{
        console.log('Category table iniitialised');
        
    })
    .catch(err=>{
        console.log("Error while initialising categories table")
    })

    /**
     * Adding Roles
     * 
     */
    Role.create({
        id:1,
        name:"user"
    })
    Role.create({
        id:2,
        name:"admin"
    })

}

require('./routes/category.routes')(app);
require("./routes/product.routes")(app);
require("./routes/auth.routes")(app);
require("./routes/cart.routes")(app);


app.listen(serverConfig.PORT,()=>{
    console.log(`Appliction started on the port no:${serverConfig.PORT}`);
})