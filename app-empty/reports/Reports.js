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
		makeRequest("GET", `/companies/${this.company_id}/projects`, {}, this.fillProjectsWithResponse()); 
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


		loadTimeEntries(); // required for B-Reports, leave at END of callback
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
		makeRequest("GET", "/reports", {}, this.fillUsersWithResponse()); 
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


		loadTimeEntries(); // required for B-Reports, leave at END of callback
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
			makeRequest("GET", "/reports", {}, this.fillTimeEntriesWithResponse()); 
		}
	}

	fillTimeEntriesWithResponse(xhr_response)
	{
		console.log('----- fillTimeEntriesWithResponse -----', xhr_response);
		// INSERT YOUR CODE BELOW THIS LINE
		let tbody = document.getElementsByTagName("tbody");

		// for(let key in xhr_response) {
		// 	tbody.
		// }
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
