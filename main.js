import { appendNewProjectOnLefSideBar,createNewProjectButton,projectNameForm,NewToDoForm,} from "./dom.js";
import {STORE_NAMES,saveFormData,retrieveProjectId}from "./indexedDB.js";
let currentProject="Default";

async function addingNewProject(){
  if(!await retrieveProjectId(currentProject)){
    await saveFormData({name:currentProject},STORE_NAMES.PROJECT);
  }
    const newProjectBtn=document.getElementById("newProjectBtn"); 
    newProjectBtn.addEventListener("click",()=>{
        const form=projectNameForm();
        newProjectBtn.after(form);
        form.addEventListener("submit",async (event)=>{
            event.preventDefault();
            const formData=new FormData(form);
            const newprojectName=formData.get("name");    
            currentProject=newprojectName;
            const  newProjectBtn=createNewProjectButton(currentProject)
          await  saveFormData({name:newprojectName},STORE_NAMES.PROJECT);
            newProjectBtn.addEventListener("click",(event)=>{
            currentProject=newProjectBtn.textContent;
            })
            appendNewProjectOnLefSideBar(newProjectBtn);
            form.remove();
        })
      
    });
   
}
addingNewProject();

 function addingNewToDo(){
  const newTOdoBtn=document.getElementById("newToDoBtn");
  newTOdoBtn.addEventListener("click",()=>{
    const todoForm=NewToDoForm()
    newTOdoBtn.after(todoForm);
    todoForm.addEventListener("submit", async(event)=>{
      event.preventDefault();
      const formData=new FormData(todoForm);
      // formData.getAll(name);
      let data={};
      for(const [key,value] of formData.entries()){
        data[key]=value;
      }
     data.projectId= await retrieveProjectId(currentProject);
  saveFormData(data,STORE_NAMES.TO_DO);
    })
    })
}
addingNewToDo();