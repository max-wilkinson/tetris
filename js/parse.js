Parse.initialize("XctRj8yjGvXLptN5MH6BdlBl2eE4bKVSDnYM8yVu", 
	"GzPkrCSUdURM3HTmtdtMjhKWJtiRvxWyMllWRifx");

//Check for cached user
$(document).ready(function(){
	var user = Parse.User.current();
	console.log(user);

	if(user){
		showStart();
	} else {
		showLogIn();
	}
});

function showLogIn(){
	$('#start-btn').hide();
	$('#logout-btn').hide();
	$('#profile-view').hide();

	$('#signup-view').show();
	$('#login-view').show();	
}

function showStart(){
	$('#signup-view').hide();
	$('#login-view').hide();

	$('#start-btn').show();
	$('#logout-btn').show();
	$('#profile-view').show();

	//Gather info for profile card
	updateProfile();
}

function updateProfile(){
	var user = Parse.User.current();

	//Initialize with cached values
	var level = Math.floor(user.attributes.totalScore/10);
	var highScore = user.attributes.highScore;

	//Update UI
	$('#level').text(level);
	$('#high-score').text(highScore);

	//Update with Parse values
	var query = new Parse.Query(Parse.User);
	query.equalTo("username", user.attributes.username);
	query.find({
		success: function(data){
			level = Math.floor(data[0].attributes.totalScore/10);
			highScore = data[0].attributes.highScore;

			//Update UI
			$('#level').text(level);
			$('#high-score').text(highScore);
		}
	})	
}


//Log out current user
function logOut(){
	Parse.User.logOut();
	showLogIn();
}

//Sign up a new user
function signUp(){
	var username = $('#new-username').val();
	var password = $('#new-password').val();

	var user = new Parse.User();
	user.set('username', username);
	user.set('password', password);
	user.set('totalScore', 0);
	user.set('highScore', 0);

	user.signUp(null, {
		success: function(data){
			console.log(data);
			showStart();
		},
		error: function(data, error){
			console.log(error);
		}
	});
	
}

//Log in an existing user
function logIn(){
	var username = $('#username').val();
	var password = $('#password').val();

	Parse.User.logIn(username, password, {
		success: function(user){
			console.log(user);
			showStart();
		},
		error: function(user, error){
			console.log(error);
		}
	})
	
}