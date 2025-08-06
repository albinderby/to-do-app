const DB_NAME="TO-DO DATABASE";
let db;

export async function getDatabaseVersion(dbName) {
    try {
      const databases = await indexedDB.databases();
      const dbInfo = databases.find(db => db.name === dbName);
        
      if (dbInfo) {
        console.log(`The current version of "${dbName}" is:`, dbInfo.version);
        return dbInfo.version;
      } else {
        console.log(`Database "${dbName}" does not exist yet.`);
        return 1; // Return 0 if the database doesn't exist
      }
    } catch (error) {
      console.error("Error getting database list:", error);
      return null;
    }
  }
export async function checkObjectStoreExist(objectStoreName){
    const request=indexedDB.open(DB_NAME,await getDatabaseVersion(DB_NAME));
    let temperoryConnection;
    return new Promise((resolve,reject)=>{
        request.onsuccess=(event)=>{
            temperoryConnection=event.target.result;
            if(temperoryConnection.objectStoreNames.contains(objectStoreName)){
                console.log("object store already exist");
                temperoryConnection.close();
                resolve(true);            
            }else{
                console.log("objectstore not exist")
                temperoryConnection.close();
                resolve(false);
            } 
            console.log("database Opened Succesfully");
        }
            
     request.onerror=(event)=>{
                console.log("error while open databse");
                reject(new Error("failed to opend database"))
            }
    })
    
    }
  
    
export async function openDatabase(STORE_NAME="Default",VERSION){
    if(!DB_VERSION){
        DB_VERSION=await getDatabaseVersion(DB_NAME)
    }
    console.log(DB_VERSION)
    return new Promise((resolve,reject)=>{
        //request to open the database
        const request=indexedDB.open(DB_NAME,DB_VERSION);

        request.onupgradeneeded =(event)=>{
            console.log('Database upgrade needed / creation started');
                   db=event.target.result;
                    
                    if(!db.objectStoreNames.contains(STORE_NAME)){
                       let objectStore= db.createObjectStore(STORE_NAME,{keyPath:"itemNo",autoIncrement:true}); 
                        objectStore.createIndex("titleIndex", "title", { unique: false });
                    }
                    
            console.log("Object store created");
        };
        request.onsuccess=(event) =>{
            db= event.target.result;//get database instance
            DB_VERSION=db.version;
            console.log("db version:"+DB_VERSION);
            console.log("Database opened successfully");
            resolve(db);//Resolve the promise with the db instance
        }
        request.onerror=(event)=>{
            console.error("Databas error:",event.target.errorCode);
            reject(new Error("Failed to open Database"));
        }
    })
}
openDatabase().then(()=>{
db.close();
});
export  async function saveFormData(data,STORE_NAME){
    if(!db){
        db= await openDatabase(STORE_NAME);
    }
    const transaction=db.transaction([STORE_NAME],'readwrite');
    const store=transaction.objectStore(STORE_NAME);
    console.log(data.title)
    const request=store.add(data)

    request.onsuccess=()=>{
        console.log("stock details saved in database succesfully");
    }
    request.onerror=(event)=>{
        console.error("error saving formdata", event.target.error);
    }
}


export function closeDatase(){
    let result=db.close();
    console.log(result);
}