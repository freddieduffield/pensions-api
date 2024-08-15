import { PensionPotController } from "./controller/PensionPotController"
import { PotsController } from "./controller/PotsController"
import { SearchedPensionsController } from "./controller/SearchedPensionsController"

export const Routes = [{
    method: "get",
    route: "/pension-pots",
    controller: PensionPotController,
    action: "all"
}, {
    method: "get",
    route: "/searched-pensions",
    controller: SearchedPensionsController,
    action: "all",
} , {
    method: "get",
    route: "/pots",
    controller: PotsController,
    action: "all", 
}]