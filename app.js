const express = require("express")
const Middleware = require("./middleware/middleware");
const ErrorHandlinMiddleware = require("./middleware/error-handling");

const PORT = process.env.PORT || 3000;

const app = express();

const plansController = require("./controllers/plans-controller");
const subscriptionController = require("./controllers/subscription-controller");
Middleware(app);

app.use("/api/plans",plansController);
app.use("/api/subscription",subscriptionController);

// This should be declare at the end of all the routes declaration otherwise it can miss some routes
ErrorHandlinMiddleware(app);
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});