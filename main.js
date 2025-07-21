import { appendNewProjectOnLefSideBar,projectNameForm } from "./dom.js";
//temporly append the project name recieving form on the body only for developing time
const body=document.querySelector("body");



function addingNewProject(){
    const newProjectBtn=document.getElementById("newProjectBtn")
    newProjectBtn.addEventListener("click",()=>{
        const form=projectNameForm();
        body.appendChild(form);
        form.addEventListener("submit",(event)=>{
            event.preventDefault();
            const wrapper = document.getElementById("newProjectWrapper");
            let isFormVisible = false;
            let currentForm = null;

newProjectBtn.addEventListener("click", () => {
    if (!isFormVisible) {
      currentForm = projectNameForm();
      wrapper.appendChild(currentForm);
      isFormVisible = true;
    } else {
      currentForm.remove();
      isFormVisible = false;
    }
  });
            const formData=new FormData(form);
            const newprojectName=formData.get("name");    
            appendNewProjectOnLefSideBar(newprojectName);
            form.remove();
        })
      
    });
   
}
addingNewProject();