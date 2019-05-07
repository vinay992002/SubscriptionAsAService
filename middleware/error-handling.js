const chalk = require("chalk");
const ValidationError = require("../errors/errors").ValidationError;
const AuthenticationError = require("../errors/errors").AuthenticationError;
const AccessDeniedError = require("../errors/errors").AccessDeniedError;

function errorLogger(err, req, res, next){
    if(err.message){
       console.log( chalk.default.red(err.message));
    }
    if(err.stack){
        console.log(Chalk.default.red(err.stack));
    }
    next(err);
}

function authenticationErrorHandler(err, req, res, next){
    if(err instanceof AuthenticationError){
        return res.status(401).send("Authentication failed!");
    }
    next(err);
}
function accessDeniedErrorHandled(err, req, res, next){
    if(err instanceof AccessDeniedError){
        return res.status(403).send("Access denied!!");
    }
    next(err);
}

function validationErrorHandler(err, req, res, next){
    if(err instanceof ValidationError){
        return res.status(401).send("Invalid request");
    }
    next(err);
}

function genericErrorHandler(err, req, res, next){
    res.status(500).send("Something went wrong!!");
    next();
}

module.exports = function ErrorHandlingMiddleware(app){
    app.use([
        errorLogger,
        authenticationErrorHandler,
        validationErrorHandler,
        accessDeniedErrorHandled,
        genericErrorHandler
    ]);
}