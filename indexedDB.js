const DB_NAME="TO-DO DATABASE";
const DB_VERSION=1;
export const STORE_NAMES={PROJECT:"project",TO_DO:"To_Do"};

let db;
    
function openDatabase(){

    return new Promise((resolve,reject)=>{
        //request to open the database
        const request=indexedDB.open(DB_NAME,DB_VERSION);

        request.onupgradeneeded =(event)=>{
            console.log('Database upgrade needed / creation started');
                   db=event.target.result;
                    
                    if(!db.objectStoreNames.contains(STORE_NAMES.PROJECT)){
                        let objectStore =db.createObjectStore(STORE_NAMES.PROJECT,{keyPath:"id",autoIncrement:true}); 
                        objectStore.createIndex("nameIndex","name",{unique:true});
                    }
                    if(!db.objectStoreNames.contains(STORE_NAMES.TO_DO)){
                        let objectStore= db.createObjectStore(STORE_NAMES.TO_DO,{keyPath:"list_no",autoIncrement:true}); 
                         objectStore.createIndex("projectIdINdex", "projectId", { unique: false });
                     }
                    
            console.log("Object store created");
        };
        request.onsuccess=(event) =>{
            db= event.target.result;//get database instance
            console.log("Database opened successfully");
            resolve(db);//Resolve the promise with the db instance
        }
        request.onerror=(event)=>{
            console.error("Databas error:",event.target);
            reject(new Error("Failed to open Database"));
        }
    })
}
openDatabase();

export function saveFormData(data,STORE_NAME){
    return new Promise(async (resolve,reject)=>{
    if(!db){
        db= await openDatabase();
    }
    const transaction=db.transaction([STORE_NAME],'readwrite');
    const store=transaction.objectStore(STORE_NAME);
    const request=store.add(data)

    request.onsuccess=()=>{
        console.log("details saved in database succesfully");
       resolve('success');
    }
    request.onerror=(event)=>{
        console.error("error saving formdata", event.target.error);
        reject( new Error(event.error));
    }});
    
}


export async function retrieveProjectId(currentProject){
    if(!db){
        db=await openDatabase();
    }
    const transaction=db.transaction([STORE_NAMES.PROJECT],"readonly");
    const store=transaction.objectStore(STORE_NAMES.PROJECT);
    const index=store.index("nameIndex");
    console.log(index);
    return new Promise((resolve,reject)=>{
        const request=index.get(currentProject);
        
            request.onsuccess=(event)=>{
                console.log(event);
                const projectObject=event.target.result;
     
                    resolve(projectObject?.id);
            }
            request.onerror=(event)=>{
                console.error("cant get the project id");
                reject(new Error(event.error));
            }

    })
}


export function retrieveAll(storename){
return new Promise(async(resolve,reject)=>{
    if(!db){
        db=await openDatabase();
    }
    const transaction=db.transaction([storename],"readonly");
    const store=transaction.objectStore(storename);
    const request=store.getAll();

    request.addEventListener("success",(event)=>{
        console.log("all object got successfully!");
        resolve(event.target.result);
    })
    request.addEventListener("error",(event)=>{
        console.log("can't get objects");
        reject(new Error(event.target.error));})
})
  
}


export async function fetchTodoFromProject(projectName){
    const projectId=await retrieveProjectId(projectName);
    console.log(projectId);
    const toDoList=await retrieveAll(STORE_NAMES.TO_DO);
    const fileteredList=toDoList.filter((todo)=>todo.projectId==projectId);
    console.log(fileteredList);
    return fileteredList;
}