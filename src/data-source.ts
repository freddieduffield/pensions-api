import { DataSource } from "typeorm"
import { PensionPot } from "./entity/PensionPot"
import { PensionProvider } from "./entity/PensionProvider"
import { SearchedPensions } from "./entity/SearchedPensions"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "postgres",
    synchronize: true,
    logging: false,
    entities: [PensionPot, PensionProvider, SearchedPensions],
    migrations: [],
    subscribers: [],
})
