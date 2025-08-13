// databaseilnn data retrive cheyannam ennit athh button ayitt left project baril show cheyannam
import { fetchTodoFromProject, retrieveAll, STORE_NAMES } from "./indexedDB.js";
import { createProjectButton,appendNewProjectOnLefSideBar, createDiv } from "./dom.js";
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
    const rightSide=document.getElementById("right-side")
       const toDoList=await fetchTodoFromProject(currentProject);
        for(let i=0;i<toDoList.length;i++){
            const div=createDiv(toDoList[i].title);
            div.classList.add("list");
            rightSide.appendChild(div);       
        }

}