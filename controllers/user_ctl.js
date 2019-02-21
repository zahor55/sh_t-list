
const users = require('../models/user'); // access the MODEL
const show_ctl = require('./show_ctl');
var num=0;
function getNextNumberId(){
    return num++
}
exports.getUserById = async (req, res,next) => {
    const {userId=null}=req.params
    await users.find({id :userId})
        .then(docs => {
        console.log(docs);
        return res.json(docs);
    })
    .catch(err => console.log(`query error: ${err}`))
};
exports.createRating=async (req,res,next)=>{
    const {userId=null,rate_score=null,rate_text=null,show_id=null} = req.body;
   
    const userRate={
        rateScore: parseInt(rate_score),
        rateText: rate_text,
        showId: parseInt(show_id),
        id:getNextNumberId()
    };
    const quer={ "id": parseInt(userId)},
          upda= { $push:{"rateList":userRate}};
    await users.updateOne(quer,upda)
    show_ctl.createRate(userRate,userId)
    res.json("update was set")
    
};
exports.createUser=async (req,res,next)=>{
    var newUser=new users({
        name:req.body.name,
        age:req.body.age,
        email:req.body.email,
        id:req.body.id
    })
    newUser.save(
        (err)=>{
            if(err)
                console.log(`err:${err}`)
            else{
                console.log(`saved ducoment : ${JSON.stringify(newUser)}`)
            }
        }
    )
    res.json("update was set")
    
};

exports.updateRateing=async (req,res,next)=>{
    const condition={$and:[{"id": req.body.id},{"rateList":{$elemMatch :{"showId":req.body.showId}}}] },
          doc= { $set:{"rateList":{"rateScore":req.body.rateScore,"rateText":req.body.rateText,"showId":req.body.showId}}};
    await users.updateOne(condition,doc)
    res.json("update was set")
    
};
exports.updateUser=async (req,res,next)=>{
    const condition={"id":req.body.id},
          doc= {$set: {'name': req.body.name}};
    await users.updateOne(condition,doc)
    res.json("update was set")
    
};

exports.deleteUser=async (req,res,next)=>{      //get only id
    await users.deleteOne({"id":req.body.id})
    res.json("update was set")
    
};
exports.deleteRating=async (req,res,next)=>{//get showId and id(of the user)
    const condition={"id":req.body.id}
          doc= {$pull: {'rateList':{"showId":req.body.showId }}};
    await users.updateOne(condition,doc)
    res.json("update was set")
    
};

