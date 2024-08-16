import { PensionPotController } from "./components/pension-pots/PensionPotController"
import { PotsController } from "./components/pots/PotsController"
import { SearchedPensionsController } from "./components/searched-pensions/SearchedPensionsController"

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
}, {
    method: "get",
    route: "/pots/search",
    controller: PotsController,
    action: "searchPots",  
}, {
    method: "get",
    route: "/pots/search/:value",
    controller: PotsController,
    action: "searchValue",
}, {
    method: "get",
    route: "/searched-pensions/found",
    controller: SearchedPensionsController,
    action: "allFound",  
}]