import { appendNewProjectOnLefSideBar,projectNameForm,NewToDoForm, createProjectButton,} from "./dom.js";
import {STORE_NAMES,saveFormData,retrieveProjectId}from "./indexedDB.js";
import{ showTodoList }from "./display.js";
export let currentProject={name:"Default"};

async function setUpDefaultProjectListener(){
  document.getElementById("default-Project")
  .addEventListener("click",()=>{
    currentProject.name="Default";
    console.log(currentProject.name);
  });
}
setUpDefaultProjectListener();
showTodoList(currentProject.name);

async function addingNewProject(){
  if(!await retrieveProjectId(currentProject.name)){
    await saveFormData({name:currentProject.name},STORE_NAMES.PROJECT);
  }
    const newProjectBtn=document.getElementById("newProjectBtn"); 
    newProjectBtn.addEventListener("click",()=>{
        const form=projectNameForm();
        newProjectBtn.after(form);
        form.addEventListener("submit",async (event)=>{
         
            event.preventDefault();
            const formData=new FormData(form);
            const newprojectName=formData.get("name");    
            currentProject.name=newprojectName;
            const  newlyCreatedButton=createProjectButton(currentProject.name);
            newlyCreatedButton.addEventListener("click",(event)=>{
              console.log("event listner is working ")
            currentProject.name=newlyCreatedButton.textContent;
            console.log(currentProject.name);
            showTodoList(currentProject.name);
            })
          await  saveFormData({name:newprojectName},STORE_NAMES.PROJECT);
            appendNewProjectOnLefSideBar(newlyCreatedButton);
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
     data.projectId= await retrieveProjectId(currentProject.name);
  saveFormData(data,STORE_NAMES.TO_DO);
    })
    })
}
addingNewToDo();
