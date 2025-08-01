import { appendNewProjectOnLefSideBar,projectNameForm } from "./dom.js";

function addingNewProject(){
    const newProjectBtn=document.getElementById("newProjectBtn");
    // const newProjectWrapper=document.getElementById("newProjectWrapper");

    newProjectBtn.addEventListener("click",()=>{
        const form=projectNameForm();
        newProjectBtn.after(form);
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