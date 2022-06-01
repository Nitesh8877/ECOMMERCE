/***
 * This file contains the controller logic for the category
 * resource.
 * Everytime a CRUD request come for the category, methods difine 
 * in the controller file will be executed.
 * 
 */



const { category } = require('../models');
const db=require('../models');
/*
db={
    Sequelize:
    sequelize:
    category:function (){}
}

*/

const Category=db.category;// pick up the category in db object

/**
 *POST: Create and save a new category
 */

exports.create=(req,res)=>{
    /**
     * Validation of request 
     */
    
    if(!req.body.name){
        res.status(400).send({
            message:"Name of the category can't be empty !"

        })
        return ;
    }

    /***
     * Creation of the categoryh object to be stored in the db.
     * 
     */

    const category={
        name:req.body.name,
        description:req.body.description
    }

    Category.create(category)
    .then((category)=>{
        console.log(`category name: [${category.name}] got inserted in the database`);
        res.status(201).send(category);
    })
    .catch((err)=>{
        console.log(`Issue in inserting category name: [${category.name}]`);
        console.log(`Error Message : ${err.message}`);
        res.status(501).send({
            message:"Some internal error while storing the category "
        })

    })
}



/***
 * Get a list at the all category
 */

exports.findAll=(req,res)=>{
    let categoryName=req.query.name;
    let promise;
    if(categoryName){
        promise=Category.findAll({
            where:{
                name:categoryName
            }
        });
    }else{
        promise=Category.findAll();
    }
    promise
    .then((categories)=>{
        res.status(200).send(categories);
    })
    .catch((ree)=>{
        res.status(500).send({
            message:"Some internal error while fetching the category"
        })
    })
}

/**
 * Get a category based on the category id
 */

exports.findOne=(req,res)=>{
    const categoryId=req.params.id;
    Category.findByPk(categoryId)
    .then(category=>{
        res.status(200).send(category);
    })
    .catch(err=>{
        res.status(500).send({
            message:"Some internal error while fetching the category id"
        });
    })
}


/***
 * Update the existing category
 */

exports.update=(req,res)=>{
    const category={
        name:req.body.name,
        description:req.body.description
    };
    const categoryId=req.params.id
    Category.update(category,{
        where:{id:categoryId}
    })

    .then(updatedCategory=>{
        /***
         * Where the updation happended successfuly.
         * You need to send the updated row to the table.
         * But while fetching that row and sending it to user
         * There can be a error.
         */

        Category.findByPk(categoryId)
        .then(category=>{
            res.status(200).send(category);
        })
        .catch(err=>{
            res.status(500).send({
                message:"some internal error while fetching the udated data"
            })
        })

    })
    .catch(err=>{
        res.status(500).sedn({
            message:"Some internal error while updating the category data based on the id"
        })
    })
}