/**
 * A class that handles anything to do with the Reports view
 */
class Reports {

	/**
	 * Constructs Reports page functionality.
	 * 
	 * @param {obj} api instance of the TimeTrackerApi class 
	 * @param {int} company_id our team's company id
	 */
	constructor(api, company_id)
	{
		// Must filled via the API calls
		this.projects = undefined;
		this.users = undefined;

		this.api = api;
		this.company_id = company_id;

		// INSERT YOUR CODE BELOW THIS LINE

		this.loadProjects(); // api request for list of projects
		this.loadUsers(); // api request for list of users

		let selectProj = document.getElementById("project_id"); // select element in filter form for projects
		selectProj.addEventListener("change", this.handleProjectChange); // occur when select element changes
		let selectUser = document.getElementById("user_id"); // select element in filter form for users
		selectUser.addEventListener("change", this.handleUserChange); // occur when select element changes
	}

	/////////////////////////////////////////////
	//
	// PROJECTS
	//
	/////////////////////////////////////////////

	/**
	 * Make api request to get list of projects of the company.
	 * 	- HTTP method = "GET"
	 * 	- path = /companies/company_id/projects
	 * 	- parameters obj = {}
	 * 	- handler = fillProjectsWithResponse
	 */
	loadProjects()
	{
		console.log('----- loadProjects -----');
		// INSERT YOUR CODE BELOW THIS LINE

		// assign to 
		// api call (HTTP method, URL path, parameters obj, success_method)
		api.makeRequest("GET", `/companies/${company_id}/projects`, {}, this.fillProjectsWithResponse); // makeRequest from TimeTrackerApi.js
	}

	/**
	 * Handler function to parse through xhr_response and build select element for project filtering.
	 * 
	 * @param {object} xhr_response object of project objects
	 */
	fillProjectsWithResponse(xhr_response)
	{
		console.log('----- fillProjectsWithResponse -----', xhr_response);
		// INSERT YOUR CODE BELOW THIS LINE
		
		Reports.projects = xhr_response; // assign to class variable for later use

		let selectProj = document.getElementById("project_id"); // the select element
		for(let key in xhr_response) { // iterate over each project object 
			let option = document.createElement("option"); // new option element for select
			option.value = `${xhr_response[key].project_id}`; // value = project id
			option.textContent = `${xhr_response[key].title}`; // seen value = project title
			selectProj.appendChild(option); // append to select
		}

		Reports.prototype.loadTimeEntries(); // required for B-Reports, leave at END of callback
	}

	/**
	 * Handler function to filter out entries in table according to selected options.
	 * 
	 * @param {object} event issued by eventListener once triggered containing all event information 
	 */
	handleProjectChange(event)
	{
		console.log('----- handleProjectChange -----', event);
		// INSERT YOUR CODE BELOW THIS LINE
		
		// returns HTML Collection of td elements so convert into array
		let projEntries = [...document.getElementsByClassName("filtered_in"), ...document.getElementsByClassName("filtered_out")]; // append all tr's that may have previously been hidden
		projEntries.forEach(key => { // iterate over each tr
			key.classList = []; // reset classes

			let keyChildren = [...key.children]; // get all td's of the tr as an array
			
			if(event.target.value === "") { // if selected "All Projects"
				key.classList.add("filtered_in") // give filtered_in class to all tr's
			} // td at index 1 has project_id as its id
			else if(keyChildren[1].id !== event.target.value) { // else if td's project_id not equal to select-option's project_id 
				key.classList.add("filtered_out") // give any tr's filtered out the filtered_out class
			} 
			else { // else if td's project_id is equal to select-options project_id
				key.classList.add("filtered_in") // give filtered_in class
			}
		});
	}


	/////////////////////////////////////////////
	//
	// USERS
	//
	/////////////////////////////////////////////

	/**
	 * Make api request to get list of users of the company.
	 * 	- HTTP method = "GET"
	 * 	- path = /companies/company_id/users
	 * 	- parameters obj = {}
	 * 	- handler = fillUsersWithResponse
	 */
	loadUsers()
	{
		console.log('----- loadUsers -----');
		// INSERT YOUR CODE BELOW THIS LINE

		// api call (HTTP method, URL path, parameters obj, success_method)
		api.makeRequest("GET", `/companies/${company_id}/users`, {}, this.fillUsersWithResponse); // makeRequest from TimeTrackerApi.js
	}

	/**
	 * Handler function to parse through xhr_response and build select element for user filtering.
	 * 
	 * @param {object} xhr_response object of user objects
	 */
	fillUsersWithResponse(xhr_response)
	{
		console.log('----- fillUsersWithResponse -----', xhr_response);
		// INSERT YOUR CODE BELOW THIS LINE

		Reports.users = xhr_response; // assign to class variable for later use

		let selectUsers = document.getElementById("user_id"); // the select element
		for(let key in xhr_response) { // iterate over each project object 
			let option = document.createElement("option"); // new option element for select
			option.value = `${xhr_response[key].user_id}`; // value = user id
			option.textContent = `${xhr_response[key].first_name} ${xhr_response[key].last_name}`; // seen value = user name
			selectUsers.appendChild(option); // append to select
		}
			
		Reports.prototype.loadTimeEntries(); // required for B-Reports, leave at END of callback
	}

	/**
	 * Handler function to filter out entries in table according to selected options.
	 * 
	 * @param {object} event issued by eventListener once triggered containing all event information 
	 */
	handleUserChange(event)
	{
		console.log('----- handleUserChange -----', event);
		// INSERT YOUR CODE BELOW THIS LINE

		// returns HTML Collection of td elements so convert into array
		let userEntries = [...document.getElementsByClassName("filtered_in"), ...document.getElementsByClassName("filtered_out")]; // append all tr's that may have previously been hidden
		userEntries.forEach(key => { // iterate over each tr
			key.classList = []; // reset classes

			let keyChildren = [...key.children]; // get all td's of the tr as array
			
			if(event.target.value === "") { // if selected "All Users"
				key.classList.add("filtered_in") // give filtered_in class to all tr's
			} // td at index 1 has user_id as its id
			else if(keyChildren[2].id !== event.target.value) { // else if td's user_id not equal to select-option's user_id 
				key.classList.add("filtered_out") // give any tr's filtered out the filtered_out class
			} 
			else { // else if td's user_id is equal to select-options user_id
				key.classList.add("filtered_in") // give filtered_in class
			}
		});
	}

	/////////////////////////////////////////////
	//
	// TIME ENTRIES
	//
	/////////////////////////////////////////////

	/**
	 * Make api request to get list of time entries of the company.
	 * 	- HTTP method = "GET"
	 * 	- path = /companies/company_id/entries
	 * 	- parameters obj = {}
	 * 	- handler = fillTimeEntriesWithResponse
	 */
	loadTimeEntries()
	{
		console.log('----- loadTimeEntries -----');
		// INSERT YOUR CODE BELOW THIS LINE
		
		if(Reports.users !== undefined && Reports.projects !== undefined) { // api call made only when these values are filled
			// api call (HTTP method, URL path, parameters obj, success_method)
			api.makeRequest("GET", `/companies/${company_id}/entries`, {}, this.fillTimeEntriesWithResponse); // makeRequest from TimeTrackerApi.js
		}
	}

	/**
	 * Handler function to parse through xhr_response and build table of time entries.
	 * 
	 * @param {object} xhr_response object of entry objects
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
		entries.sort((a, b) => { // defines natural ordering for array of entry objs with most recently started first
			let dateA = new Date(a.start_time);
			let dateB = new Date(b.start_time);
			
			return dateA - dateB; // <0 = more recent, 0 = started same time, >0 = more
		});

		Object.keys(entries).forEach(key => { // iterate over each entry
			let row = Reports.createTableElements(); // 
			let tableElems = row.children; // [taskCol, projCol, userCol, timeCol, dateCol]

			tableElems[0].textContent = `${entries[key].description}`; // contains entry description

			tableElems[1].textContent = `${Reports.projects[`${entries[key].project_id}`].title}`; // contains project title
			tableElems[1].id = `${entries[key].project_id}`; // set id to project_id for filtering

			tableElems[2].textContent = `${Reports.users[`${entries[key].user_id}`].first_name}`; // contains ID of user who created entry
			tableElems[2].id = `${entries[key].user_id}`; // set id to user_id for filtering

			let start = new Date(entries[key].start_time); // start_time Date obj
			let end = new Date(entries[key].end_time); // end_time Date obj
			
			let runningEnd = (end.getHours() * 3600) + (end.getMinutes() * 60) + end.getSeconds(); // total seconds for end time
			let runningStart = (start.getHours() * 3600) + (start.getMinutes() * 60) + start.getSeconds(); // total seconds for start time

			// to acommodate for when end time is past midnight and thus lesser in value than start time
			if(runningEnd < runningStart) {
				runningEnd += (24 * 3600) // add a full day (86400 seconds)
			}
			
			tableElems[3].textContent = `${convertSecondsToHoursMinutesSeconds(runningEnd - runningStart)}`; // contains how long timer ran in form
			tableElems[4].textContent = `${Reports.prototype.dateString(entries[key].start_time)} ${start.getHours()}:${start.getMinutes()}`; // contains start date in abbreviated form
			
			tbody[0].append(row); // add entire row to table
		});
	}

	/**
	 * Creates each row for the table containing td's for each column:
	 * 	Task	Project		User	Time	Date
	 * 
	 * @returns row element containg td's
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

	/**
	 * Reformats given date to an abbreviated form (e.g. Nov 1, 2020)
	 * 
	 * @param {String} date the date to be reformatted
	 * @returns reformatted String
	 */
	dateString(date)
	{
		var months = ['','Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
		var year = date.substr(0,4);
		var month = date.substr(5,2);
		var day = date.substr(8,2);

		return months[parseInt(month)] + ' ' + day + ', ' + year;

	}

}
