const leftSideBar=document.getElementById("left-sideBar");



export function createNewProjectButton(projectName){
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
    
    const submit=document.createElement("button");
    submit.type="submit";
    submit.textContent="Submit";
    form.append(title,description,dueDate,submit);
    return form;
}