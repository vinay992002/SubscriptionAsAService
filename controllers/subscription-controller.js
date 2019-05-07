const router = require("express").Router();
const asyncWrapper = require("../utilities/async-wrapper").AsyncWrapper;
const SubscriptionsService = require("../services/subscription-service");

const subscriptionService = new SubscriptionsService();

router.get("/",  asyncWrapper(async (req,res) => {
    let userId = null;
    let subscription = await subscriptionService.findAll(userId);
    res.send(subscription);    
}));
router.get("/:id", asyncWrapper( async (req,res) => {
    let id = req.params.id;
    let userId = null;
    let subscription = await subscriptionService.findOne(id);
    res.send(subscription);
}));

router.post("/", asyncWrapper( async (req,res) => {
    let subscription = await subscriptionService.create(req.body);
    res.send(subscription);
}));

router.delete("/:id",  asyncWrapper( async (req,res) => {
    let id = req.params.id;
    await subscriptionService.deleteOne(id);
    res.status(200).send("Success");
}));

module.exports = router;