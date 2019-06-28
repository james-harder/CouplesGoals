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
		goalCompleted.setAttribute('style', 'opacity: 100');

		var goalName = document.createElement('input');
		goalName.type = 'textfield';
		goalName.value = goal.name;
		goalName.setAttribute('style', 'width: inherit');

		var goalDelete = document.createElement('button');
		goalDelete.type = 'button';
		goalDelete.textContent = 'X';

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

	showGoals();
}

function showNewGoalPanel() {
	
	var newGoalPanel = document.getElementById('new-goal-panel');
	newGoalPanel.setAttribute('class', 'row');

}

function showGoals() {	// store a reference to the section element
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
		renderGoals( goals );
	}
}

showGoals();
