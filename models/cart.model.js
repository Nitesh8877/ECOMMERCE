


module.exports=(sequelize,Sequelize)=>{

    const Cart=sequelize.define("cart",{
        id:{
            type:Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        cost:{
            type:Sequelize.INTEGER
        },
        status:{
            type:Sequelize.STRING,
            allowNull:false
        }
    });
    return Cart;
}