import { AppDataSource } from "./data-source"
import { initializeAppServer } from "./server"

AppDataSource.initialize().then(async () => {
    await initializeAppServer();
}).catch(error => console.log(error))
