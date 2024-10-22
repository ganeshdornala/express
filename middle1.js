function myMiddleWare2(req,res,next){
    console.log("I am second middleware");
    next();
}

module.exports=myMiddleWare2;