/**
 * A class that handles anything to do with the Projects view
 */
 class Projects {

    constructor(api, company_id) {
        this.project_form = undefined;

        this.api = api;
        this.company_id = company_id;
        this.createProjectRow = this.createProjectRow.bind(this);
        this.fillProjectsWithResponse = this.fillProjectsWithResponse.bind(this);
        this.loadProjects = this.loadProjects.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.updateFromDelete = this.updateFromDelete.bind(this);
        this.hideForm = this.hideForm.bind(this);
        this.showEditForm = this.showEditForm.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.createNewProject = this.createNewProject.bind(this);
        this.updateProject = this.updateProject.bind(this);

        let ele = document.getElementById("project_form");

        ele.addEventListener("submit", this.handleFormSubmit, false);

        let ele = document.getElementById("new_project_button");

        ele.addEventListener("click", this.showCreateForm, false);

        this.hideForm();

        this.loadProjects();

    }

   

    loadProjects() {
        console.log('----- loadProjects -----');
        console.log(this.api)
        this.api.makeRequest('GET', `companies/${this.company_id}/projects`, {}, this.fillProjectsWithResponse);
    }

    fillProjectsWithResponse(xhr_response) {
        console.log('----- fillProjectsWithResponse -----', xhr_response);
        
        for (const [key, value] of Object.entries(xhr_response)) {
            this.createProjectRow(value);
        }


    }

    createProjectRow(project) {
        console.log('----- createProjectRow -----', project);
        var myHtmlContent = `
        <td>${project.project_id}</td>
        <td class="edit_link"><a href="#">${project.title}</td>
        <td>${project.num_entries}</td>
        <td class="delete_link">Delete</td>`;
        let tableRef = document.getElementById('content_container').getElementsByTagName('tbody')[0];

        let newRow = tableRef.insertRow(tableRef.rows.length);
        newRow.innerHTML = myHtmlContent;
        newRow.id = `project_${project.project_id}`;

        document.querySelectorAll('.delete_link').forEach(item => {
            item.addEventListener('click', this.handleDelete, false);
        })

        document.querySelectorAll('.edit_link').forEach(item => {
            item.addEventListener('click', this.showEditForm, false);
        })

    }

    

    showCreateForm(event) {
        console.log('----- showCreateForm -----', event);
        
        let form_ele = document.getElementById("project_form");

        form_ele.classList.remove('hide_form');

        document.getElementById("form_project_id").value = 0;

        document.getElementById("title").value = "";

        document.getElementById("submit_button").value = "Create Project";

    }

    showEditForm(event) {
        console.log('----- showEditForm -----', event);
        
        let form_ele = document.getElementById("project_form");

        form_ele.classList.remove('hide_form')

        document.getElementById("form_project_id").value = event.target.parentNode.parentNode.id.replace("project_", "");


        document.getElementById("title").value = event.target.textContent;

        document.getElementById("submit_button").value = "Edit Project";
    }

    hideForm() {
        console.log('----- hideForm -----');
        
        let form_ele = document.getElementById("project_form");

        form_ele.classList.add('hide_form')
    }

    handleFormSubmit(event) {
        console.log('----- handleFormSubmit -----', event);
        
        event.preventDefault();
        let title = event.target.title.value;
        if (event.target.form_project_id.value == 0)
            this.api.makeRequest('POST', `projects/`, { title }, this.createNewProject);
        else
            this.api.makeRequest('PATCH', `projects/${parseInt(event.target.form_project_id.value)}`, { title }, this.updateProject);
    }

   
    createNewProject(xhr_response) {
        console.log('----- createNewProject -----', xhr_response);
        
        this.createProjectRow(xhr_response);
        this.hideForm();
    }

    updateProject(xhr_response) {
        console.log('----- updateProject -----', xhr_response);

        document.getElementById(`project_${xhr_response.project_id}`).children[1].children[0].innerText=xhr_response.title;

        this.hideForm();
    }

    

    handleDelete(event) {
        console.log('----- handleDelete -----', event);
        
        this.api.makeRequest('DELETE', `projects/${event.target.parentNode.id.replace("project_", "")}`, {}, this.updateFromDelete);
    }

    updateFromDelete(xhr_response) {
        console.log('----- updateFromDelete -----', xhr_response);
        document.getElementById(`project_${xhr_response.project_id}`).innerHTML = "";
    }



}
