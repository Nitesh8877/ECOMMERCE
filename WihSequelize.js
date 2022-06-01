const Sequelize=require("sequelize");
const sequelize=new Sequelize(
    'ecom_db',
    'root',
    'password',{
        HOST:"127.0.0.1",
        dialect:"mysql"
    }
);

const Category=sequelize.define("category",{
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        allowNull:false
    },
    name:{
        type:Sequelize.STRING,
    },
    description:{
        type:Sequelize.STRING,
    }
});

Category,findAll();

//get the entries in the table.


// INSERT

// .crete()

// Add one record

Category.create({name:'Elecronics',description:'Description here'});

// Add more record

Category.bulkCreate({
    name:'Elecronics',description:'Description here',
    name:'KtchenItems',description:'Kitchen Related products'
});


// SELECT

//find all the rocord of category table.


Category.findAll();

Model.findAll({attributes:['col1','col2']});

Category.findAll(attributes[[Sequelize.fn('COUNT',Sequelize('ID'),'num_category')]]);

SQL 
// select count(id) as num_category from Category
// select *from Category;

Sequelize=> 
Category.findAll(
    {
    attributes:[userid,name,age]
    }
);


// select userid,name,age from user;

User.findAll(
    {
    attributes:[userid,name,age]
    }
);


// => Insert query

// SQl=>Insert into Category values("1","electronics","elecronics item");

Sequelize=>

Category.create({
    id:'1',
    name:'Electronics',
    description:'Description here'
})

// Insert at one time more record

Category.bulkCreate({
    name:'Elecronics',description:'Description here',
    name:'KtchenItems',description:'Kitchen Related products'
});


// Select command


// select * from Category where category="footwear";

Category.findAll({
    where:{
        name:{[Op.eq]:'Footewear'}
    }
});

// select *from Category where id>20;

Category.findAll({
    where:{
        id:{[Op.gt]:20}
    }
});

// 1. select *from Category where price<20;

Category.findAll({
    where:{
        price:{[Op.lt]:20}
    }
});

// 2. select *from Category where price<20;

Category.findAll({
    where:{
        price:{[Op.nel]:20}
    }
});


// 3. select *from Category where price=20;

Category.findAll({
    where:{
        price:{[Op.el]:20}
    }
});


// 3. select * from Category where price between 10 and 20;

Category.findAll({
    where:{
        price:{[Op.between]:[10,20]}
    }
});


// 4. select * from Category where name like 'a%';


Category.findAll({
    where:{
        name:{[Op.like]:'a%'}
    }
});


Category.findAll({
    where:{
        name:{[Op.substring]:Relevel}
    }
});


Category.findAll({
    where:{
        name:{[Op.startsWith]:'Rah'}
    }
});

// OR Operation
Category.findAll({
    where:{
        [Op.or]:[
            {name:rahul},
            {id:2}
        ]
    }
});


// AND Operation
Category.findAll({
    where:{
        [Op.and]:[
            {name:rahul},
            {id:2}
        ]
    }
});

