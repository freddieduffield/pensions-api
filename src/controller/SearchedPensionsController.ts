import { AppDataSource } from '../data-source';
import { NextFunction, Request, Response } from 'express';
import { SearchedPensions } from '../entity/SearchedPensions';

export class SearchedPensionsController {
  private searchedPensionsRepositiory =
    AppDataSource.getRepository(SearchedPensions);

  async all(request: Request, response: Response, next: NextFunction) {
    try {
      const searchedPensions = this.searchedPensionsRepositiory.find({
        relations: ['pensionProvider'],
      });
      
      return response.json(searchedPensions);
    } catch (error) {
      console.error('Error fetching pension pots:', error);
      
      return response
        .status(500)
        .json({ message: 'An error occurred while fetching pension pots' });
    }
  }
}
