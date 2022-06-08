const express = require("express");
const planRouter = express.Router();
const {protectRoute,isAuthorised} = require('../controller/userController.js');
const {getAllPlans,getPlan,createPlan,updatePlan,deletePlan,top3Plans} = require('../controller/planController.js');





planRouter
.route('/allPlans')
.get(getAllPlans)





planRouter.use(protectRoute)
planRouter
.route('/plan/:id')
.get(getPlan)




planRouter.use(isAuthorised(['admin','restaurantOwner']))
planRouter
.route('/crudPlan')
.post(createPlan)
.patch(updatePlan(id))
.delete(deletePlan(id))




planRouter
.route()
.get()
