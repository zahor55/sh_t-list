const Shows = require('../models/show'); // access the MODEL
var unirest = require('unirest');
const fetch = require('node-fetch')
exports.getAllShow =  async(req, res,next) => {
    var Show;
     await Shows.find({})
     .then(async(docs) => {
      
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


// for(var i=1;i<=587;++i){
//     fetch(`https://www.episodate.com/api/most-popular?page=${i}`)
//     .then(response => response.json())
//     .then((response)=>{
//         response.tv_shows.map(show=>{
//             Show=new Shows({
//                 name: show.name,
//                 startDate: show.start_date,
//                 numOfUserRated: 0,
//                 avgRating: 0,
//                 status:show.status,
//                 userList: [],	
//                 img_url:show.image_thumbnail_path,					
//                 id: show.id
//             })
//             Show.save(
//                 (err)=>{
//                     console.log(`err with page number: ${i}`)
//                 }
//             )
//         })
//     })
// }