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

	fillProjectsWithResponse(xhr_response)
	{
		console.log('----- fillProjectsWithResponse -----', xhr_response);
		// INSERT YOUR CODE BELOW THIS LINE
		
		Reports.projects = xhr_response;


		Reports.prototype.loadTimeEntries(); // required for B-Reports, leave at END of callback
	}

	handleProjectChange(event)
	{
		console.log('----- handleProjectChange -----', event);
		// INSERT YOUR CODE BELOW THIS LINE
	}


	/////////////////////////////////////////////
	//
	// USERS
	//
	/////////////////////////////////////////////

	loadUsers()
	{
		console.log('----- loadUsers -----');
		// INSERT YOUR CODE BELOW THIS LINE

		// api call (HTTP method, URL path, parameters obj, success_method)
		api.makeRequest("GET", `/companies/${company_id}/users`, {}, this.fillUsersWithResponse);
	}

	fillUsersWithResponse(xhr_response)
	{
		console.log('----- fillUsersWithResponse -----', xhr_response);
		// INSERT YOUR CODE BELOW THIS LINE

		Reports.users = xhr_response;

		
		Reports.prototype.loadTimeEntries(); // required for B-Reports, leave at END of callback
	}

	handleUserChange(event)
	{
		console.log('----- handleUserChange -----', event);
		// INSERT YOUR CODE BELOW THIS LINE
	}

	/////////////////////////////////////////////
	//
	// TIME ENTRIES
	//
	/////////////////////////////////////////////

	loadTimeEntries()
	{
		console.log('----- loadTimeEntries -----');
		// INSERT YOUR CODE BELOW THIS LINE
		
		if(Reports.users !== undefined && Reports.projects !== undefined) { // api call made only when these values are filled
			// api call (HTTP method, URL path, parameters obj, success_method)
			api.makeRequest("GET", `/companies/${company_id}/entries`, {}, this.fillTimeEntriesWithResponse);
		}
	}

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
			
			return dateA - dateB;
		});

		Object.keys(entries).forEach(key => {
			let row = Reports.createTableElements();
			let tableElems = row.children; // [taskCol, projCol, userCol, timeCol, dateCol]

			tableElems[0].textContent = `${entries[key].description}`; // contains entry description

			tableElems[1].textContent = `${entries[key].entry_id}`; // contains project title

			tableElems[2].textContent = `${entries[key].user_id}`; // contains ID of user who created entry
			
			let start = new Date(entries[key].start_time);
			let end = new Date(entries[key].end_time);
			tableElems[3].textContent = `${convertSecondsToHoursMinutesSeconds(end.getTime() - start.getTime())}`; // contains how long timer ran in form
			tableElems[4].textContent = `${end.getMonth()} ${end.getDate()}, ${end.getFullYear()} ${end.getHours()}:${end.getMinutes()}`; // contains date
			
			tbody[0].append(row);
		});
	}

	static createTableElements() {
		let taskCol = document.createElement("td"); // task column
		let projCol = document.createElement("td"); // project column
		let userCol = document.createElement("td"); // user column
		let timeCol = document.createElement("td"); // time column
		let dateCol = document.createElement("td"); // date column
		
		let row = document.createElement("tr"); // separate row for each entry
		row.appendChild(taskCol);
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
