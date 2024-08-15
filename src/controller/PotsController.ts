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
      const pots = await this.pensionPotRepository.createQueryBuilder('pot')
        .leftJoinAndSelect('pot.pensionProvider', 'pensionProvider')
        .leftJoinAndSelect('pot.searchedPensions', 'searchedPensions')
        .getMany();

      const flattenedPots = pots.map((pensionPot) => {
        const { searchedPensions, ...rest } = pensionPot;
        return { ...rest, ...searchedPensions[0], id: pensionPot.id };
      });  

      return flattenedPots;
    } catch (error) {
      console.error('Error fetching pension pots:', error);

      return { message: 'An error occurred while fetching pension pots' };
    }
  }

  async searchPots(request: Request, response: Response) {
      try {
        const { potName } = request.query;
                
        const pot = await this.pensionPotRepository.findOne({
          where: { ...request.query },
          relations: ['pensionProvider'],
        });

        if (!pot) {
          return { message: 'Pension pot not found' };
        }

        return pot;
        
      } catch (error) {
        console.error('Error searching pension pots:', error);

        return { message: 'An error occurred while searching pension pots' };
      }
  }
}
