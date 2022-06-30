const controller=require("../Controllers/auth.controller");

const {verifySignUp}=require("../middlewares")

module.exports=function(app){

    app.post("/ecom/api/v1/auth/signup",[verifySignUp.checkDuplicateUserNameOrEmail,verifySignUp.checkRolesExisted],controller.singup);

    app.post("/ecom/api/v1/auth/signin",controller.signin);
}