import { PensionPotController } from "./controller/PensionPotController"

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
}]