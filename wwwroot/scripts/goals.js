function renderGoals( JSONGoals ) {
	// JSONGoal => goalId(int), name(string), isCompleted(bool)

	JSONGoals.forEach(goal => {
		// goalDiv is a 'row' that contains 3 'col's
		var goalDiv = document.createElement('div');
		goalDiv.className = 'row';
		goalDiv.id = goal.goalId;

		// gcDiv, gdDiv are each one 'col' wide, gnDiv is 10 'col' wide
		var gcDiv = document.createElement('div');
		gcDiv.className = 'col s1';

		var gdDiv = document.createElement('div');
		gdDiv.className = 'col s1';

		var gnDiv = document.createElement('div');
		gnDiv.className = 'col s10';

		// goalCompleted -> checkbox, goalName -> textfield, goalDelete -> button
		var goalCompleted = document.createElement('input');
		goalCompleted.type = 'checkbox';
		goalCompleted.id = 'gc' + goal.goalId;
		goalCompleted.checked = goal.isCompleted;

		var goalName = document.createElement('input');
		goalName.type = 'textfield';
		goalName.value = goal.name;

		var goalDelete = document.createElement('button');
		goalDelete.type = 'button';
		goalDelete.textContent = 'X';
		goalDelete.value = goal.goalId;
		goalDelete.setAttribute( 'onclick', 'deleteGoal(this.value)' );

		// add elements to respective 'col' divs
		gcDiv.appendChild(goalCompleted);
		gnDiv.appendChild(goalName);
		gdDiv.appendChild(goalDelete);

		// add 'col' divs to 'row' div
		goalDiv.appendChild(gcDiv);
		goalDiv.appendChild(gnDiv);
		goalDiv.appendChild(gdDiv);

		// add 'row' to section
		var section = document.querySelector('section');
		section.appendChild(goalDiv)

	});
	
}

function showNewGoalPanel() {

	var newGoalPanel = document.getElementById('new-goal-panel');
	var panelLink = document.getElementById('panel-link');

	if ( newGoalPanelIsOpen ) {
		panelLink.innerHTML = '+ add a new goal...';
		newGoalPanel.setAttribute('class', 'row hide deep-orange lighten-4');
		newGoalPanelIsOpen = false;
	} else {
		panelLink.innerHTML = '- add a new goal:';
		newGoalPanel.setAttribute('class', 'row deep-orange lighten-4');
		newGoalPanelIsOpen = true;
	}
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
	postRequest.open( 'POST', postRequestURL );

	// set the content-type to JSON
	postRequest.setRequestHeader('Content-Type', 'application/JSON');

	// set the response type
	//postRequest.responseType = 'json';

	// send the request
	postRequest.send(stringGoal);
	
	// when the response is received
	postRequest.onload = function() {
		
		showGoals();

	}
	
}

function showGoals() {	// store a reference to the section element
	var section = document.querySelector('#goalSection');

	// clear 'section'
	section.innerHTML = ' ';

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

		console.log(goals)

		// do stuff with it...
		renderGoals( goals );
	}
}

function deleteGoal( goalId ) {
	
	// store the url for the delete action
	var deleteRequestURL = 'api/goal/' + goalId;

	// create an XMLHttpRequest object
	var deleteRequest = new XMLHttpRequest();
	
	// use the request object to open the url using the HTTP GET method
	deleteRequest.open( 'DELETE', deleteRequestURL );

	// set the content-type to JSON
	deleteRequest.setRequestHeader('Content-Type', 'application/JSON');

	// send the request
	deleteRequest.send();

	deleteRequest.onload = function () {
	
		showGoals();
	
	}
}

function updateGoal( goalId ) {

	// get a reference to the goal 'row'
	var goal = document.querySelector('#' + goalId);

	// store the url that will send us the JSON
	var putRequestURL = 'api/goal/' + goalId;

	// create an XMLHttpRequest object
	var putRequest = new XMLHttpRequest();
	
	// use the request object to open the url using the HTTP GET method
	putRequest.open( 'PUT', postRequestURL );

	// set the content-type to JSON
	putRequest.setRequestHeader('Content-Type', 'application/JSON');

	// set the response type
	//postRequest.responseType = 'json';

	// send the request
	postRequest.send(stringGoal);
	
	// when the response is received
	postRequest.onload = function() {
		
		showGoals();
		
	}
}

showGoals();

var newGoalPanelIsOpen = false;
