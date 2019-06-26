function showGoals( JSONGoals ) {
	// JSONGoal => goalId(int), name(string), isCompleted(bool)

	JSONGoals.forEach(goal => {
		// create a set of HTML objects for each goal
		var goalDiv = document.createElement('div');
		goalDiv.className = 'goal';
		goalDiv.id = goal.goalId;

		var goalCompleted = document.createElement('input');
		goalCompleted.type = 'checkbox';
		goalCompleted.className = 'goal-completed';
		goalCompleted.checked = goal.isCompleted;

		var goalName = document.createElement('input');
		goalName.type = 'textfield';
		goalName.className = 'goal-name';
		goalName.value = goal.name;

		var goalDelete = document.createElement('button');
		goalDelete.type = 'button';
		goalDelete.className = 'goal-delete';
		goalDelete.textContent = 'X';

		goalDiv.appendChild(goalCompleted);
		goalDiv.appendChild(goalName);
		goalDiv.appendChild(goalDelete);

		section.appendChild(goalDiv)

	});
	
}

function addGoal() {
	// get info from the newGoalPanel input
	var newGoalName = document.getElementById('newGoalName').value;

	// create an object to POST via JSON
	var newGoal = { 'name': newGoalName, 'isCompleted': false };
	var stringGoal = JSON.stringify(newGoal);

	// store the url that will send us the JSON
	var postRequestURL = 'api/goal/';

	// create an XMLHttpRequest object
	var postRequest = new XMLHttpRequest();
	
	// use the request object to open the url using the HTTP GET method
	postRequest.open( 'POST', requestURL );

	// set the content-type to JSON
	postRequest.setRequestHeader('Content-Type', 'application/JSON');

	// set the response type
	//postRequest.responseType = 'json';

	// send the request
	postRequest.send(stringGoal);
}

function showNewGoalPanel() {
	
	$('#new-goal-panel').css( {'display': 'block'} );

}

// store a reference to the section element
var section = document.querySelector('section');

// store the url that will send us the JSON
var requestURL = 'api/goal/';

// create an XMLHttpRequest object
var request = new XMLHttpRequest();

// use the request object to open the url using the HTTP GET method
request.open( 'GET', requestURL );

// set the response type
request.responseType = 'json';

// send the request
request.send();

// when the response is received
request.onload = function() {
	// store the response
	var goals = request.response;

	console.log(goals[0])

	// do stuff with it...
	showGoals( goals );
}
