import { showTodoList } from "./display.js";
import { currentProject } from "./main.js";
import { deleteTodo, editTodo, saveFormData, STORE_NAMES } from "./indexedDB.js";
const leftSideBar=document.getElementById("left-sideBar");



export function createProjectButton(projectName){
const button=document.createElement("button");
button.id=projectName;
button.classList.add("button");;
button.textContent=projectName;
return button;
}

export function projectNameForm(){
const form=document.createElement("form");
   form.id="projectNameForm";
   const label=document.createElement("label");
   label.textContent="Enter project name";
   label.htmlFor="projectNameInput";
   const input=document.createElement("input");
    input.id="projectNameInput";
   input.type="text";
   input.name="name";
const submitBtn=document.createElement("button");
submitBtn.type="submit";
submitBtn.style.display="block";

submitBtn.textContent="submit";
form.append(label,input,submitBtn);
return form;
}

export function appendNewProjectOnLefSideBar(newProjectBtn){
    leftSideBar.appendChild(newProjectBtn)
}


export function NewToDoForm(){
    const form=document.createElement("form");
    form.classList.add('todo-form');
    const titleLabel=document.createElement("label");
    titleLabel.textContent="title";
    titleLabel.htmlFor="titleId";
    const title=document.createElement("input");
    title.id="titleId";
    title.type="text";
    title.placeholder="title";
    title.name="title";

    const descriptionLabel=document.createElement("label");
    descriptionLabel.for="descriptionId";
    descriptionLabel.textContent="description";
    const description=document.createElement("input");
    description.type="textArea";
    description.id="descriptionId";
    description.name="description";

    const dueDateLabel=document.createElement("label");
    dueDateLabel.textContent="dueDate";
    dueDateLabel.for="dueDateId";
    const dueDate=document.createElement("input");
    dueDate.type="date";
    dueDate.id="dueDateId";
    dueDate.name="dueDate";
    
    const prioritySelect = document.createElement("select");
    prioritySelect.id = "priorityId";
    prioritySelect.name = "priority";

    const highOption = document.createElement("option");
    highOption.value = "High";
    highOption.textContent = "High";
    highOption.selected = true; // Set High as the default
    
    const mediumOption = document.createElement("option");
    mediumOption.value = "Medium";
    mediumOption.textContent = "Medium";
    
    const lowOption = document.createElement("option");
    lowOption.value = "Low";
    lowOption.textContent = "Low";

    // Append options to the select element
    prioritySelect.appendChild(highOption);
    prioritySelect.appendChild(mediumOption);
    prioritySelect.appendChild(lowOption);

    const submit=document.createElement("button");
    submit.type="submit";
    submit.textContent="Submit";
    form.append(titleLabel,title,
        descriptionLabel,description,
        dueDateLabel,dueDate,
        prioritySelect,
        submit);
    return form;
}

export function createDiv(param){
    const div=document.createElement("div");
    div.textContent=param;
    return div;
}

//gpt code
export  function createTodo(todo) {
    // Create container for the todo
    const todoContainer = document.createElement("div");
    todoContainer.className = "todo-item";

    // Title
    const titleHeading = document.createElement("h4");
    titleHeading.textContent = todo.title || "Untitled";
    titleHeading.contentEditable=false;
    // Description
    const description = document.createElement("p");
    description.textContent = todo.description || "";
    description.contentEditable=false;
    // Due Date
    const dueDate = document.createElement("input");
    dueDate.type="date";
    dueDate.value = todo.dueDate ? todo.dueDate : "";
    // Priority
    const priority = document.createElement("span");
    priority.textContent = todo.priority ? `Priority: ${todo.priority}` : "";

    // Append everything
    todoContainer.appendChild(titleHeading);
    todoContainer.appendChild(description);
    todoContainer.appendChild(dueDate);
    todoContainer.appendChild(priority);

    //creating a back button for going back to the first page.
    const backButton=document.createElement("button");
    backButton.type="button";
    backButton.id="back-button";
    backButton.textContent="BACK"
    todoContainer.appendChild(backButton)

    //creating a delete button .
    const deleteButton=document.createElement("button");
    deleteButton.type="button";
    deleteButton.id="delete-button";
    deleteButton.textContent="delete";
    todoContainer.appendChild(deleteButton);

    //edit button
    const editButton=document.createElement("button");
    editButton.type="button";
    editButton.id="edit-button";
    editButton.textContent="edit";
    todoContainer.appendChild(editButton);


    backButton.addEventListener("click",()=>showTodoList(currentProject.name))
    deleteButton.addEventListener("click",()=>{
        backButton.click();
        deleteTodo(todo.list_no);
    })
    editButton.addEventListener("click",()=>{
       
        titleHeading.setAttribute("contentEditable",true);
        description.setAttribute("contentEditable",true)
        saveButton.style.display="block"        
    })
    const saveButton=document.createElement("button");
    saveButton.textContent="save";
    saveButton.style.display="none";
    saveButton.addEventListener("click",async()=>{
        saveButton.style.display="none";
        titleHeading.setAttribute("contentEditable",false);
    description.setAttribute("contentEditable",false);

    function helperfunction(){
        const object={};
        object.pro
        object.title=titleHeading.textContent ;
        object.description=description.textContent;
        object.dueDate=dueDate.value;
        object.priority=todo.priority||"low";
        object.projectId=todo.projectId;
        object.list_no=todo.list_no;
        return object;
    }
   await editTodo(helperfunction(),STORE_NAMES.TO_DO);
    })
    todoContainer.appendChild(saveButton);

    return todoContainer; // return so caller can append it to DOM
}
