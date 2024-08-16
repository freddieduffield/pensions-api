import { type Request, type Response } from 'express';
import { AppDataSource } from '../../data-source';
import { PensionPot } from '../pension-pots/PensionPot';
import { SearchedPensions } from '../searched-pensions/SearchedPensions';
import { calculateFutureValue } from './utils';

export class PotsController {
  private pensionPotRepository = AppDataSource.getRepository(PensionPot);
  private searchedPensionsRepositiory =
    AppDataSource.getRepository(SearchedPensions);

  async all(request: Request, response: Response) {
    try {
      const pots = await this.pensionPotRepository
        .createQueryBuilder('pot')
        .leftJoinAndSelect('pot.pensionProvider', 'pensionProvider')
        .leftJoinAndSelect('pot.searchedPensions', 'searchedPensions')
        .getMany();

      const flattenedPots = pots.map((pensionPot) => {
        const { searchedPensions, ...rest } = pensionPot;
        return { ...rest, ...searchedPensions[0], id: pensionPot.id };
      });

      if (request.query.forecast === 'true') {
        const { years } = request.query;
        if (!years) {
          return { message: 'Please provide the number of years' };
        }
        const futurePots = flattenedPots.map((pensionPot) => {
          const { amount, monthlyPayment, annualInterestRate } = pensionPot;

          const yearsAsInt = parseInt(years.toString());
          const futureValue = calculateFutureValue(
            amount,
            monthlyPayment,
            annualInterestRate,
            yearsAsInt
          );

          return { ...pensionPot, futureValue };
        });

        return futurePots;
      }

      return flattenedPots;
    } catch (error) {
      console.error('Error fetching pension pots:', error);

      return { message: 'An error occurred while fetching pension pots' };
    }
  }

  async searchPots(request: Request, response: Response) {
    try {
      if ('pensionProvider' in request.query) {
        const pots = await this.pensionPotRepository.find({
          where: {
            pensionProvider: { name: request.query.pensionProvider.toString() },
          },
          relations: ['pensionProvider', 'searchedPensions'],
        });

        return pots;
      }

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

  async searchValue(request: Request, response: Response) {
    try {
      const { value } = request.params;
      const { greaterThan, lessThan } = request.query;

      const queryBuilder = this.pensionPotRepository
        .createQueryBuilder('pot')
        .leftJoinAndSelect('pot.pensionProvider', 'pensionProvider');

      if (greaterThan) {
        queryBuilder.andWhere(`pot.${value} > :greaterThan`, { greaterThan });
      }

      if (lessThan) {
        queryBuilder.andWhere(`pot.${value} < :lessThan`, { lessThan, value });
      }

      return queryBuilder.getMany();
    } catch (error) {
      return { message: 'An error occurred while searching pension pots' };
    }
  }
}
