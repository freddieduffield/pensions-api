import express, { Request, Response }  from "express";
import type http from 'node:http';
import { Routes } from "./routes";
import { populateDatabase } from "./seed";

const PORT = 3000;  

let server: http.Server;

export async function initializeAppServer() {
	return new Promise(async (resolve) => {
       const app = express();
       app.use(express.json());
   
       Routes.forEach(route => {
           (app as any)[route.method](route.route, async (req: Request, res: Response, next: Function) => {
               try {
                   const result = await (new (route.controller as any))[route.action](req, res, next)
                   res.json(result)
               } catch (error) {
                   next(error)
               }
           })
       })

       server = app.listen(PORT, () => {
        console.log(
            `Express server has started on port ${PORT}. 
            1. http://localhost:${PORT}/pension-pots 
            2. http://localhost:${PORT}/searched-pensions
            3. http://localhost:${PORT}/pots
            4. http://localhost:${PORT}/pots/search?potName=Google
            5. http://localhost:${PORT}/pots/search?id=c3fb7d63-d9e1-4656-b4f8-bffbd8f4ba02
               (^^^ eg. ^^^ id generated automatically each time the db is populated) 
            6. http://localhost:${PORT}/pots/search/amount?greaterThan=101  
            7. http://localhost:${PORT}/pots/search/annualInterestRate?lessThan=0.01
            8. http://localhost:3000/searched-pensions/found
            9. http://localhost:3000/pots/search?employer=IBM`
        )
       })

       await populateDatabase();
  });
}

export function stopAppServer() {
	return server.close();
}