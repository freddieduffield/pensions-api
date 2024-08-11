import { AppDataSource } from "../data-source"
import { NextFunction, Request, Response } from "express"
import { PensionPot } from "../entity/PensionPot"

export class PensionPotController {

    private pensionPotsRepository = AppDataSource.getRepository(PensionPot)

    async all(request: Request, response: Response, next: NextFunction) {
        return this.pensionPotsRepository.find({ relations: ['pensionProvider'] })
    }

    async one(request: Request, response: Response, next: NextFunction) {
        const id = request.params.id


        const pensionPot = await this.pensionPotsRepository.findOne({
            where: { id },
            relations: ['pensionProvider']
        })

        if (!pensionPot) {
            return "unregistered pension pot"
        }
        return pensionPot
    }

    async save(request: Request, response: Response, next: NextFunction) {
        const { 
            potName,
            annualInterestRate,
            defaultAnnualInterestRate,
            pensionProvider,
            amount,
            employer,
            monthlyPayment,
            isWorkplacePension,
        } = request.body;

        const pensionPot = Object.assign(new PensionPot(), {
            potName,
            annualInterestRate,
            defaultAnnualInterestRate,
            pensionProvider,
            amount,
            employer,
            monthlyPayment,
            isWorkplacePension,
        })

        return this.pensionPotsRepository.save(pensionPot)
    }
}