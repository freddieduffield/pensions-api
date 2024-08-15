import { AppDataSource } from '../data-source';
import { NextFunction, Request, Response } from 'express';
import { PensionPot } from '../entity/PensionPot';
import { Not } from 'typeorm';


export class PensionPotController {
  private pensionPotsRepository = AppDataSource.getRepository(PensionPot);

  async all(request: Request, response: Response, next: NextFunction) {
    try {
        const pensionPots = await this.pensionPotsRepository
            .createQueryBuilder('pensionPot')
            .leftJoinAndSelect('pensionPot.pensionProvider', 'pensionProvider')
            .leftJoin('pensionPot.searchedPensions', 'searchedPensions')
            .where('searchedPensions.id IS NULL')
            .getMany();
      return pensionPots;
    } catch (error) {
      console.error('Error fetching pension pots:', error);
      return { message: 'An error occurred while fetching pension pots' };
    }
  }
}
