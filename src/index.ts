import * as express from "express"
import { Request, Response } from "express"
import { AppDataSource } from "./data-source"
import { Routes } from "./routes"
import { populateDatabase} from "./seed"

AppDataSource.initialize().then(async () => {

    // create express app
    const app = express()
    app.use(express.json())

    // register express routes from defined application routes
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

    // setup express app here
    // ...

    // start express server
    app.listen(3000)

    // seed the database
    //  await seed()
    await populateDatabase();

    console.log("Express server has started on port 3000. Open http://localhost:3000/pension-pots to see results")

}).catch(error => console.log(error))
