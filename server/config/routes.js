var users = require('../controllers/users.js');
var wallposts = require('../controllers/wallposts.js');
var albums = require('../controllers/albums.js');
console.log("routes loaded")
module.exports = function(app) {
	app.post('/login', users.login);
	app.post('/register', users.register)
	app.get('/users', users.allusers);
	app.get('/wallposts', wallposts.index);
	app.post('/wallposts', wallposts.create);
	// app.post('/vote', users.vote);
	// app.post('/survey', users.getSurvey);
	// app.post('/delete', users.deleteSurvey);
	app.post('/logout', users.logout);
	app.get('/loggedinuser', users.loggedInUser);
	// app.get('/track', tracks.getTrack);
	// app.post('/track', tracks.changeTrack);
            app.get('/albums', albums.index);
            app.post('/albums', albums.create);
}
