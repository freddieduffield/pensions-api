import { type Request, type Response } from 'express';
import { AppDataSource } from '../data-source';
import { PensionPot } from '../entity/PensionPot';
import { SearchedPensions } from '../entity/SearchedPensions';

export class PotsController {
  private pensionPotRepository = AppDataSource.getRepository(PensionPot);
  private searchedPensionsRepositiory =
    AppDataSource.getRepository(SearchedPensions);

  async all(request: Request, response: Response) {
    try {
      const pensionPots = await this.pensionPotRepository.find({
        relations: ['pensionProvider'],
      });
      const searchedPensionPots = await this.searchedPensionsRepositiory.find({
        relations: ['pensionProvider'],
      });

      return response.json([...pensionPots, ...searchedPensionPots]);
    } catch (error) {
      console.error('Error fetching pension pots:', error);

      return response
        .status(500)
        .json({ message: 'An error occurred while fetching pension pots' });
    }
  }
}
