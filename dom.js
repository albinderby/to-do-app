const leftSideBar=document.getElementById("left-sideBar");



function createNewProjectButton(projectName){
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

export function appendNewProjectOnLefSideBar(projectName){
    leftSideBar.appendChild(createNewProjectButton(projectName))
}
