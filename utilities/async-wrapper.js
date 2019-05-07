/** 
 * This methods helps in having centralized error handling in middleware
 * rather then handling it in controller
*/
module.exports.AsyncWrapper = function AsyncWrapper(fn){
    return (req,res,next) => {
        return fn(req, res).catch(next);
    }
}