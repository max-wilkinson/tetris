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

	$('#signup-view').show();
	$('#login-view').show();	
}

function showStart(){
	$('#signup-view').hide();
	$('#login-view').hide();

	$('#start-btn').show();
	$('#logout-btn').show();
}


//Log out current user
function logOut(){
	Parse.User.logOut();
	showLogIn();
}

//Sign up a new user
function signUp(){
	var username = $('#new-username').val();
	console.log(username);

	var password = $('#new-password').val();
	console.log(password);


	var user = new Parse.User();
	user.set('username', username);
	user.set('password', password);

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
	console.log(username);

	var password = $('#password').val();
	console.log(password);


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