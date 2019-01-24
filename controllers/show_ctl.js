const Shows = require('../models/show'); // access the MODEL
exports.getAllShow =  (req, res,next) => {
     Shows.find({})
        .then(docs => {
        console.log(docs);
        return res.json(docs);
        
    })
    .catch(err => console.log(`query error: ${err}`))
};
exports.getNonRated =async (req,res,next)=>{
    await Shows.find({numOfUserRated: { $lte: 0 }})
        .then(docs => {
        console.log(docs);
        return res.json(docs);
        next()
    })
    .catch(err => console.log(`query error: ${err}`))
}
exports.getRated =async (req,res,next)=>{
    await Shows.find({numOfUserRated: { $gte: 1 }})
        .then(docs => {
        console.log(docs);
        return res.json(docs);
        next()
    })
    .catch(err => console.log(`query error: ${err}`))
}
exports.createRate=async (userRate,userId)=>{
    console.log(userRate.rateScore +" " + typeof(userRate.rateScore))
    console.log(userRate)
    const showid=parseInt(userRate.showId)
    var quer={ "id": showid},
          upda= { $inc:{numOfUserRated:1},$push:{userList:parseInt(userId)}};
    await Shows.updateOne(quer,upda)
    quer={ $and:[{"id": showid},{"avgRating": {$eq:0}}]  };
    //only if it the first rating
    upda={$set:{"avgRating":parseInt(userRate.rateScore)}}
    await Shows.updateOne(quer,upda)
    quer={$and:[{"id": showid},{"numOfUserRated": {$gte:1}}]};
    var x=(await Shows.find({"id": showid},{avgRating:1,numOfUserRated:1,_id: 0}))
    x[0].avgRating=(x[0].avgRating*(x[0].numOfUserRated-1)+userRate.rateScore)/x[0].numOfUserRated
    console.log(x[0].avgRating)
    upda={$set:{"avgRating":x[0].avgRating}}
    await Shows.updateOne(quer,upda)
     return;
};
