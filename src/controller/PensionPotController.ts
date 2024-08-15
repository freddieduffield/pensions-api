import { AppDataSource } from "../data-source"
import { NextFunction, Request, Response } from "express"
import { PensionPot } from "../entity/PensionPot"

export class PensionPotController {

    private pensionPotsRepository = AppDataSource.getRepository(PensionPot)

    async all(request: Request, response: Response, next: NextFunction) {
        try {
            const pensionPots = await this.pensionPotsRepository.find({ relations: ['pensionProvider'] });
            return response.json(pensionPots);
        } catch (error) {
            console.error('Error fetching pension pots:', error);
            return response.status(500).json({ message: 'An error occurred while fetching pension pots' });
        }
    }
}