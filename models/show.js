const mongoose	= require('mongoose');
const schema   	= {
	 name: { type: String, required:true },
	 startDate: { type:String },
	 numOfUserRated: { type:Number,required:true },
	 avgRating: { type:Number },
	 userList: [Number],
	 numOfSeasons:{ type: Number },						
	 id: { type:Number,required:true },
}
const show_schema = new mongoose.Schema(schema)
const shows 	=	mongoose.model('shows',show_schema)
module.exports 	= shows;