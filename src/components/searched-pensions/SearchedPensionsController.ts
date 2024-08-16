import { AppDataSource } from '../../data-source';
import { NextFunction, Request, Response } from 'express';
import { SearchedPensions } from './SearchedPensions';

export class SearchedPensionsController {
  private searchedPensionsRepositiory =
    AppDataSource.getRepository(SearchedPensions);

  async all(request: Request, response: Response, next: NextFunction) {
    try {
      const searchedPensions = await this.searchedPensionsRepositiory.find({
        relations: ['pensionPot'],
      });

      const flattenedSearchedPensions = searchedPensions.map((searchPension) => {
        const { pensionPot, ...rest } = searchPension;
        return { ...rest, ...pensionPot, id: pensionPot.id };
      });

      return flattenedSearchedPensions;
    } catch (error) {
      console.error('Error fetching pension pots:', error);
      
      return response
        .status(500)
        .json({ message: 'An error occurred while fetching pension pots' });
    }
  }

  async allFound(request: Request, response: Response, next: NextFunction) {
    try {
      const searchedPensions = await this.searchedPensionsRepositiory.find({
        where: { status: 'FOUND' },
        relations: ['pensionPot'],
      });

      const flattenedSearchedPensions = searchedPensions.map((searchPension) => {
        const { pensionPot, ...rest } = searchPension;
        return { ...rest, ...pensionPot, id: pensionPot.id };
      });

      return flattenedSearchedPensions;
    } catch (error) {
      console.error('Error fetching pension pots:', error);
      
      return { message: 'An error occurred while fetching pension pots' };
    }
  }
}
