/**
 * A class that handles anything to do with the Reports view
 */
class Reports {

	constructor(api, company_id)
	{
		// Must filled via the API calls
		this.projects = undefined;
		this.users = undefined;

		this.api = api;
		this.company_id = company_id;

		// INSERT YOUR CODE BELOW THIS LINE

		this.loadProjects();
		this.loadUsers();

		let selectProj = document.getElementById("project_id");
		selectProj.addEventListener("change", this.handleProjectChange);
		let selectUser = document.getElementById("user_id");
		selectUser.addEventListener("change", this.handleUserChange);
	}

	/////////////////////////////////////////////
	//
	// PROJECTS
	//
	/////////////////////////////////////////////


	loadProjects()
	{
		console.log('----- loadProjects -----');
		// INSERT YOUR CODE BELOW THIS LINE

		// api call (HTTP method, URL path, parameters obj, success_method)
		this.projects = api.makeRequest("GET", `/companies/${company_id}/projects`, {}, this.fillProjectsWithResponse); 
	}

	/**
	 * 
	 * @param {*} xhr_response 
	 */
	fillProjectsWithResponse(xhr_response)
	{
		console.log('----- fillProjectsWithResponse -----', xhr_response);
		// INSERT YOUR CODE BELOW THIS LINE
		
		Reports.projects = xhr_response;
		let selectProj = document.getElementById("project_id");
		for(let key in xhr_response) {
			let option = document.createElement("option");
			option.value = `${xhr_response[key].project_id}`;
			option.textContent = `${xhr_response[key].title}`;
			selectProj.appendChild(option);
		}

		Reports.prototype.loadTimeEntries(); // required for B-Reports, leave at END of callback
	}

	handleProjectChange(event)
	{
		console.log('----- handleProjectChange -----', event);
		// INSERT YOUR CODE BELOW THIS LINE
		
		// returns HTML Collection of td elements so convert into array
		let projEntries = [...document.getElementsByClassName("filtered_in"), ...document.getElementsByClassName("filtered_out")]; // append all tr's that may have previously been hidden
		projEntries.forEach(key => {
			key.classList = []; // reset
			let keyChildren = [...key.children]; // get all td's of the tr as array
			// td at index 1 has project_id as its id
			if(event.target.value === "") {
				key.classList.add("filtered_in")
			}
			else if(keyChildren[1].id !== event.target.value) { // td's project_id not equal to select-option's project_id 
				key.classList.add("filtered_out")
			} else {
				key.classList.add("filtered_in")
			}
		});
	}


	/////////////////////////////////////////////
	//
	// USERS
	//
	/////////////////////////////////////////////

	/**
	 * 
	 */
	loadUsers()
	{
		console.log('----- loadUsers -----');
		// INSERT YOUR CODE BELOW THIS LINE

		// api call (HTTP method, URL path, parameters obj, success_method)
		api.makeRequest("GET", `/companies/${company_id}/users`, {}, this.fillUsersWithResponse);
	}

	/**
	 * 
	 * @param {*} xhr_response 
	 */
	fillUsersWithResponse(xhr_response)
	{
		console.log('----- fillUsersWithResponse -----', xhr_response);
		// INSERT YOUR CODE BELOW THIS LINE

		Reports.users = xhr_response;
		let selectUsers = document.getElementById("user_id");
		for(let key in xhr_response) {
			let option = document.createElement("option");
			option.value = `${xhr_response[key].user_id}`;
			option.textContent = `${xhr_response[key].first_name} ${xhr_response[key].last_name}`;
			selectUsers.appendChild(option);
		}
			
		Reports.prototype.loadTimeEntries(); // required for B-Reports, leave at END of callback
	}

	handleUserChange(event)
	{
		console.log('----- handleUserChange -----', event);
		// INSERT YOUR CODE BELOW THIS LINE

		// returns HTML Collection of td elements so convert into array
		let userEntries = [...document.getElementsByClassName("filtered_in"), ...document.getElementsByClassName("filtered_out")]; // append all tr's that may have previously been hidden
		userEntries.forEach(key => {
			key.classList = []; // reset
			let keyChildren = [...key.children]; // get all td's of the tr as array

			// td at index 1 has project_id as its id
			if(event.target.value === "") {
				key.classList.add("filtered_in")
			}
			else if(keyChildren[2].id !== event.target.value) { // td's project_id not equal to select-option's project_id 
				key.classList.add("filtered_out")
			} else {
				key.classList.add("filtered_in")
			}
		});
	}

	/////////////////////////////////////////////
	//
	// TIME ENTRIES
	//
	/////////////////////////////////////////////

	/**
	 * 
	 */
	loadTimeEntries()
	{
		console.log('----- loadTimeEntries -----');
		// INSERT YOUR CODE BELOW THIS LINE
		
		if(Reports.users !== undefined && Reports.projects !== undefined) { // api call made only when these values are filled
			// api call (HTTP method, URL path, parameters obj, success_method)
			api.makeRequest("GET", `/companies/${company_id}/entries`, {}, this.fillTimeEntriesWithResponse);
		}
	}

	/**
	 * 
	 * @param {*} xhr_response 
	 */
	fillTimeEntriesWithResponse(xhr_response)
	{
		console.log('----- fillTimeEntriesWithResponse -----', xhr_response);
		// INSERT YOUR CODE BELOW THIS LINE
		
		let tbody = document.getElementsByTagName("tbody"); // destination

		let entries = Object.keys(xhr_response).map(key => {
			return xhr_response[key];
		}); // convert obj of objs into array of objs

		// From: https://www.javascripttutorial.net/array/javascript-sort-an-array-of-objects/
		entries.sort((a, b) => { // orders array of entry objs by most recently started
			let dateA = new Date(a.start_time);
			let dateB = new Date(b.start_time);
			
			return dateA - dateB; // <0 = more recent, 0 = started same time, >0 = more
		});

		Object.keys(entries).forEach(key => {
			let row = Reports.createTableElements();
			let tableElems = row.children; // [taskCol, projCol, userCol, timeCol, dateCol]

			tableElems[0].textContent = `${entries[key].description}`; // contains entry description

			tableElems[1].textContent = `${Reports.projects[`${entries[key].project_id}`].title}`; // contains project title
			tableElems[1].id = `${entries[key].project_id}`;

			tableElems[2].textContent = `${Reports.users[`${entries[key].user_id}`].first_name}`; // contains ID of user who created entry
			tableElems[2].id = `${entries[key].user_id}`;

			let start = new Date(entries[key].start_time);
			let end = new Date(entries[key].end_time);
			
			if(start.getHours() > end.getHours()) {
				end.setHours((end.getHours() + 24), end.getMinutes(), end.getSeconds())
			}
			let endSeconds = (end.getHours() * 3600) + (end.getMinutes() * 60) + end.getSeconds();
			let startSeconds = (start.getHours() * 3600) + (start.getMinutes() * 60) + start.getSeconds();
			
			tableElems[3].textContent = `${convertSecondsToHoursMinutesSeconds(endSeconds - startSeconds)}`; // contains how long timer ran in form
			tableElems[4].textContent = `${Reports.prototype.dateString(entries[key].start_time)} ${start.getHours()}:${start.getMinutes()}`; // contains start date in abbreviated form
			
			tbody[0].append(row);
		});
	}

	/**
	 * 
	 * @returns 
	 */
	static createTableElements() {
		let taskCol = document.createElement("td"); // task column
		let projCol = document.createElement("td"); // project column
		let userCol = document.createElement("td"); // user column
		let timeCol = document.createElement("td"); // time column
		let dateCol = document.createElement("td"); // date column
		
		let row = document.createElement("tr"); // separate row for each entry
		row.classList.add("filtered_in"); // class for filtering out content 
		row.appendChild(taskCol); // append each entry to row
		row.appendChild(projCol);
		row.appendChild(userCol);
		row.appendChild(timeCol);
		row.appendChild(dateCol);
		
		return row;
	}

	dateString(date)
	{
		var months = ['','Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
		var year = date.substr(0,4);
		var month = date.substr(5,2);
		var day = date.substr(8,2);

		return months[parseInt(month)] + ' ' + day + ', ' + year;

	}

}
