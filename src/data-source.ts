import { DataSource } from "typeorm"
import { PensionPot } from "./components/pension-pots/PensionPot"
import { PensionProvider } from "./components/pension-providers/PensionProvider"
import { SearchedPensions } from "./components/searched-pensions/SearchedPensions"

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
