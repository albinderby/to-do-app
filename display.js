// databaseilnn data retrive cheyannam ennit athh button ayitt left project baril show cheyannam
import { fetchTodoFromProject, retrieveAll, retriveSpecificTodo, STORE_NAMES,saveFormData } from "./indexedDB.js";
import { createProjectButton,appendNewProjectOnLefSideBar, createDiv, createTodo,NewToDoForm } from "./dom.js";
import { currentProject } from "./main.js";
export async function showProjectButton(){
    const allProjcetNames=await retrieveAll(STORE_NAMES.PROJECT);
    for(let i=0;i<allProjcetNames.length;i++){
     const projectButton=createProjectButton(allProjcetNames[i].name);
     projectButton.addEventListener("click",(event)=>{
                   console.log("event listner is working ")
                 currentProject.name=projectButton.textContent;
                 console.log(currentProject);
                 showTodoList(currentProject.name);
                 })
    appendNewProjectOnLefSideBar(projectButton);
    }
}
showProjectButton();

export async function showTodoList(currentProject) {
    const rightSide=document.getElementById("right-side");
    rightSide.innerHTML=""
    const newToDoBtn=document.createElement("button");
    newToDoBtn.textContent="create New To-do";
    newToDoBtn.id="newToDoBtn";
    newToDoBtn.type="button";
    newToDoBtn.addEventListener("click",()=>eventHandlerForNewTodoBtn())
    rightSide.appendChild(newToDoBtn);
       const toDoList=await fetchTodoFromProject(currentProject);
        for(let i=0;i<toDoList.length;i++){
            const div=createDiv(toDoList[i].title);
             div.addEventListener("click",async (event)=>{
                const toDo=event.target;
                const listNo=toDo.dataset.listNo;
                const specificTodo=await retriveSpecificTodo(Number(listNo));
                console.log(specificTodo);
                displayTodo(specificTodo);
            })
            div.classList.add("list");
            div.dataset.listNo=toDoList[i].list_no;
            rightSide.appendChild(div);       
        }

}



function displayTodo(todo){
    const rightSide=document.getElementById("right-side");
    rightSide.innerHTML="";
    rightSide.append(createTodo(todo));
}

function eventHandlerForNewTodoBtn(){
  const todoForm=NewToDoForm()
  newTOdoBtn.after(todoForm);
  todoForm.addEventListener("submit", async(event)=>{
    event.preventDefault();
    todoForm.remove();
    const formData=new FormData(todoForm);
    let data={};
    for(const [key,value] of formData.entries()){
      data[key]=value;
    }
   data.projectId= await retrieveProjectId(currentProject.name);
saveFormData(data,STORE_NAMES.TO_DO);
  })
  }