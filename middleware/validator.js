const joi = require("joi");
const subscription = require("../models/subscription");
const plan = require("../models/plan");
const ValidationError  = require("../errors/errors").ValidationError;
let validators = {
    "Subscription": {
        scopes: {
            default: subscription.SubscriptionValidationSchema
        }
    },
    "Plan": {
        scopes: {
            default: plan.PlanValidationSchema
        }
    }
};

function scopeExists(validator,scope){
    return Object.keys(validator.scopes).find(key => key == scope) != undefined;
}

function getSchema(model,scope){
    let validator = validators[model];
    if(!validator){
        throw new Error("Validator does not exists!");
    }

    if(validator.scopes){
        if(scope){
            if(!scopeExists(validator,scope)){
                throw new Error(`Scope ${scope} does not exist in mode ${model} validator`);
            }else{
                return validator.scopes[scope];
            }
        }else{
            return validator.scopes.default;
        }
    }else{
        return validator;
    }
}

function validate(model,object,scope){
    return joi.validate(object,getSchema(model,scope),{
        allowUnknown:true
    });
}

module.exports = function ValidationMiddleware(model,scope){
    return (req,res,next) => {
        console.log(req.body);
        const validationResult = validate(model,req.body,scope);
        if(validationResult.error){
            throw new ValidationError(validationResult.error.message,model);
        }else{
            next();
        }
    }
}