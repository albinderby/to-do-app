// databaseilnn data retrive cheyannam ennit athh button ayitt left project baril show cheyannam
import { retrieveAllProjectName } from "./indexedDB.js";
import { createNewProjectButton,appendNewProjectOnLefSideBar } from "./dom.js";
export async function showProjectButton(){
    const allProjcetNames=await retrieveAllProjectName();
    for(let i=0;i<allProjcetNames.length;i++){
     const projectButton=createNewProjectButton(allProjcetNames[i].name);
    appendNewProjectOnLefSideBar(projectButton);
    }
}
showProjectButton();

