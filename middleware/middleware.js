const commonMiddleware = require("./common");

module.exports = function MiddleWare(app){
    commonMiddleware(app);
}