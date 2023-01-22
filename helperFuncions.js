class HelperFunctions{
    extractError(errObj){
        if (errObj.name == "CastError"){
            return `Id not found, please check the id value for which you are updating the data, received id value is ${errObj.value}`;
        }
    }
    
    validate(req, res, next){
        for (const key in req.body){
            if (req.body[key].trim().length == 0){
                res.status(400).json({message: `${key} field is empty`}).end();
                return;
            }
        }
        next();
    }
    
}

module.exports = HelperFunctions;