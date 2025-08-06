import { appendNewProjectOnLefSideBar,createNewProjectButton,projectNameForm,NewToDoForm,} from "./dom.js";
import {openDatabase,saveFormData,getDatabaseVersion,checkObjectStoreExist}from "./indexedDB.js";
let currentProject="Default";

function addingNewProject(){
    const newProjectBtn=document.getElementById("newProjectBtn"); 
    newProjectBtn.addEventListener("click",()=>{
        const form=projectNameForm();
        newProjectBtn.after(form);
        form.addEventListener("submit",async (event)=>{
            event.preventDefault();
            const formData=new FormData(form);
            const newprojectName=formData.get("name");    
            currentProject=newprojectName;
            let DB_VERSION=await getDatabaseVersion("TO-DO DATABASE")
            console.log(DB_VERSION);
            if(!await checkObjectStoreExist(currentProject)){
            ++DB_VERSION;
            }
    const dbconnection= await openDatabase(currentProject,DB_VERSION);
        dbconnection.close();        
            const  newProjectBtn=createNewProjectButton(currentProject)
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
    todoForm.addEventListener("submit", (event)=>{
      event.preventDefault();
      const formData=new FormData(todoForm);
      // formData.getAll(name);
      let data={};
      for(const [key,value] of formData.entries()){
        data[key]=value;
      }
  saveFormData(data,currentProject);
    })
    })
}
addingNewToDo();