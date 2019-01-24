const mongoose	= require('mongoose');
const Schema	= mongoose.Schema;

const rate	= new Schema({
		rateScore: { type: Number, required:true },
		rateText: { type:String },
		showId: { type:Number,required:true },
		id: {type:Number,required:true}
});

module.exports 	= rate;