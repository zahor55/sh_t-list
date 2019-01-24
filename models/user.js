const mongoose	= require('mongoose');
const rate	= require('./rate.js');
const schema   	= {
	 name: { type: String, required:true },
	 age: { type:Number,required:true },
	 rateList: [rate],						
	 email:{ type: String },						
	 id: { type:Number,required:true },
}
const user_schema = new mongoose.Schema(schema)
const users 	=mongoose.model('users',user_schema)
module.exports 	= users;