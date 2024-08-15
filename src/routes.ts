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