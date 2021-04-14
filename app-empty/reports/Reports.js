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

		loadProjects();
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
		api.makeRequest("GET", `/companies/${company_id}/projects`, {}, this.fillProjectsWithResponse()); 
	
		loadTimeEntries(); // required for B-Reports, leave at END of callback
	}

	fillProjectsWithResponse(xhr_response)
	{
		console.log('----- fillProjectsWithResponse -----', xhr_response);
		// INSERT YOUR CODE BELOW THIS LINE
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
		api.makeRequest("GET", "/companies/${company_id}/users", {}, this.fillUsersWithResponse());
		
		loadTimeEntries(); // required for B-Reports, leave at END of callback
	}

	fillUsersWithResponse(xhr_response)
	{
		console.log('----- fillUsersWithResponse -----', xhr_response);
		// INSERT YOUR CODE BELOW THIS LINE
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
		
		if(this.users !== null && this.projects !== null) { // api call made only when these values are filled
			// api call (HTTP method, URL path, parameters obj, success_method)
			makeRequest("GET", "/companies/${company_id}/entries", {}, this.fillTimeEntriesWithResponse()); 
		}
	}

	createTableElements() {
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

	fillTimeEntriesWithResponse(xhr_response)
	{
		console.log('----- fillTimeEntriesWithResponse -----', xhr_response);
		// INSERT YOUR CODE BELOW THIS LINE

		let tbody = document.getElementsByTagName("tbody"); // destination

		let row = this.createTableElements();
		let tableElems = row.children; // [taskCol, projCol, userCol, timeCol, dateCol]
		tableElems[0].textContent(`${xhr.response.description}`); // contains entry description

		// tableElems[1].textContent(`${}`); // contains project title

		tableElems[2].textContent(`${xhr.response.user_id}`); // contains ID of user who created entry

		let start = new Date(xhr.response.start_time);
		let end = new Date(xhr.response.end_time);

		tableElems[3].textContent(`${convertSecondsToHoursMinutesSeconds(end.getTime() - start.getTime())}`); // contains how long timer ran in form
	
		let endDate = xhr.response.end_time.split();
		tableElems[4].textContent(`${endDate[0]}`); // contains date
		
		tbody.appendChild(row);
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
