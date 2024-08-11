import "reflect-metadata"
import { DataSource } from "typeorm"
import { PensionPot } from "./entity/PensionPot"
import { PensionProvider } from "./entity/PensionProvider"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "postgres",
    synchronize: true,
    logging: false,
    entities: [PensionPot, PensionProvider],
    migrations: [],
    subscribers: [],
})
