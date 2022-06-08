const planModel = require('../models/planModel.js');


module.exports.getAllPlans = async function getAllPlans(req, res) {
    try {
        let plans = await planModel.find();
        if (plans) {
            return res.json({
                message: "all plans retrieved",
                data: plans
            })
        }
        else {
            return res.json({
                message: "no plans found"
            })
        }
    } catch (error) {
        console.log("error while getting all plans");
    }
}




module.exports.getPlan = async function getPlan(req, res) {
    try {
        let id = req.id;
        let plans = await planModel.findById(id);
        if (plans) {
            return res.json({
                message: "all plans retrieved",
                data: plans
            })
        }
        else {
            return res.json({
                message: "no plans found"
            })
        }
    } catch (error) {
        console.log("error while getting individual plans");
    }
}





module.exports.createPlan = async function createPlan(req, res) {
    try {
        let planData = req.body;
        let createdPlan = await planModel.create(planData);
        return res.json({
            message: "plan created",
            data: createdPlan
        })
    } catch (error) {
        console.log("error while creating the plan");
    }
}





module.exports.deletePlan = async function deletePlan(req, res) {
    try {
        let id = req.params.id;
        let deletedPlan = await planModel.findByIdAndDelete(id);
        return res.json({
            message: "plan deleted",
            data: deletedPlan
        })
    } catch (error) {
        console.log("error while deleting the plan");
    }
}






module.exports.updatePlan = async function updatePlan(req, res) {
    try {
        let id = req.params.id;
        let dataToBeUpdated = req.body;
        let keys = [];
        for(let key in dataToBeUpdated){
            keys.push(key);
        }
        let plan = await planModel.findById(id);
        for(let key in keys){
            plan[key] = dataToBeUpdated[key];
        }
        await plan.save()
        return res.json({
            message: "plan updated",
            data: plan
        })
    } catch (error) {
        console.log("error while deleting the plan",error.message);
    }
}




module.exports.top3Plans = async function top3Plans(req,res){
    try {
        const top3Plans = await planModel.find().sort({
            ratingsAverage:-1
        }).limit(3);
        res.json({
            message:"top three plans retrieved",
            data:top3Plans
        })
    } catch (error) {
        console.log("error while getting top three plans");
    }
}