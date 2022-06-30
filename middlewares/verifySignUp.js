const db=require("../models");
const ROLES=db.ROLES;
const User=db.user;

checkDuplicateUserNameOrEmail=(req,res,next)=>{

    console.log("Inside the checking if the duplicate username exists");

    console.log(req.body);
    console.log(req.body.username);
    //Username
    User.findOne({
        where:{
            username:req.body.username
        }
    })
    .then(user=>{
        //Check UserName
        if(user){
            res.status(400).send({
                message:"Failed! username is a already in use!"
            })
            return;
        }
        User.findOne({
            where:{
                email:req.body.email
            }
        })
        .then(email=>{
            //Check Email
            if(email){
                res.status(400).send({
                    message:"Failed! Email is already in use!"
                })
                return ;
            }
          next();
        });

    });


};

checkRolesExisted=(req,res,next)=>{

    if(req.body.roles){
        for(let i=0;i<req.body.roles.length;i++){
            if(!ROLES.includes(req.body.roles[i])){
                res.status(400).send({
                    message:"Failed! Role does not exist= "+req.body.roles[i]
                });
                return;
            }
        }
    }
    next();
};


const verifySignUp={
    checkDuplicateUserNameOrEmail:checkDuplicateUserNameOrEmail,
    checkRolesExisted:checkRolesExisted
};
module.exports=verifySignUp;