import { PensionPotController } from "./controller/PensionPotController"
import { SearchedPensionsController } from "./controller/SearchedPensionsController"

export const Routes = [{
    method: "get",
    route: "/pension-pots",
    controller: PensionPotController,
    action: "all"
}, {
    method: "get",
    route: "/pension-pots/:id",
    controller: PensionPotController,
    action: "one",
}, {
    method: "get",
    route: "/searched-pensions",
    controller: SearchedPensionsController,
    action: "all",
}]