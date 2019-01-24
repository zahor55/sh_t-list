const express = require('express');
const show_ctl = require('./controllers/show_ctl');
const user_ctl=require('./controllers/user_ctl');
const app = express();
const port = process.env.PORT || 3000;
app.set('port',port);
// app.use('/', express.static('./public')); // for API
app.use(express.urlencoded({extended: true}));
app.use(
    (req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", 
            "Origin,X-Requested-With, Content-Type, Accept");
        res.set("Content-Type", "application/json");
        next();
 });
/*** All routes ***/
//read 
app.get('/show/getallshows', show_ctl.getAllShow);
app.get('/show/getnonRatedshows', show_ctl.getNonRated);
app.get('/show/getallRatedshows', show_ctl.getRated);
app.get('/user/getUserById/:userId', user_ctl.getUserById);
//create
app.post('/user/createRating', user_ctl.createRating);
app.post('/user/createUser', user_ctl.createUser);
//update
app.put('/user/updateRateing', user_ctl.updateRateing);
app.put('/user/updateUser', user_ctl.updateUser);
app.delete('/user/deleteUser', user_ctl.deleteUser);
app.delete('/user/deleteRating', user_ctl.deleteRating);
app.all('/api',(req,res)=>{
	res.redirect('https://documenter.getpostman.com/view/5712621/RzthPVrV');
	return;
})
app.listen(port, () => console.log(`listening on port ${port}`));