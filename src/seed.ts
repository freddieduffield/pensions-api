import { AppDataSource } from './data-source';
import { PensionPot } from './components/pension-pots/PensionPot';
import { PensionProvider } from './components/pension-providers/PensionProvider';
import { SearchedPensions } from './components/searched-pensions/SearchedPensions';

async function populateDatabase() {
  try {
    const pensionPotRepository = AppDataSource.getRepository(PensionPot);
    const pensionProviderRepository =
      AppDataSource.getRepository(PensionProvider);
    const searchedPensionsRepository =
      AppDataSource.getRepository(SearchedPensions);
      
    await searchedPensionsRepository.delete({});
    await pensionPotRepository.delete({});
    await pensionProviderRepository.delete({});

    const pensionProviders = [
      { name: 'Aviva', value: 'AVIVA' },
      { name: 'Scottish Widows', value: 'SCOTTISH_WIDOWS' },
    ];

    const pensionPots = [
      {
        potName: 'Google',
        annualInterestRate: 0.02,
        defaultAnnualInterestRate: 0.02,
        pensionProvider: pensionProviders[0],
        amount: 36700,
        employer: 'Google',
        monthlyPayment: 335.53,
        isWorkplacePension: true,
      },
      {
        potName: 'IBM',
        annualInterestRate: 0.04,
        defaultAnnualInterestRate: 0.02,
        pensionProvider: pensionProviders[1],
        amount: 20000,
        employer: 'IBM',
        monthlyPayment: 0,
        isWorkplacePension: false,
      },
      {
        potName: 'Mintago',
        annualInterestRate: null,
        defaultAnnualInterestRate: 0.02,
        pensionProvider: {
          name: null,
          value: null,
        },
        amount: 100,
        employer: 'Mintago',
        lastUpdatedAt: '2024-05-22T17:56:45.028Z',
        monthlyPayment: 0,
        isWorkplacePension: false,
      },
      {
        potName: 'Microsoft',
        annualInterestRate: 0.02,
        defaultAnnualInterestRate: 0.02,
        pensionProvider: {
          name: null,
          value: null,
        },
        amount: 123868,
        employer: 'Microsoft',
        lastUpdatedAt: '2024-05-23T13:42:22.780Z',
        monthlyPayment: 0,
        isWorkplacePension: false,
      },
      {
        potName: 'Pot 1',
        annualInterestRate: 0.035,
        defaultAnnualInterestRate: 0.02,
        pensionProvider: {
          name: null,
          value: null,
        },
        amount: 12345,
        employer: null,
        lastUpdatedAt: '2024-05-23T13:42:38.354Z',
        monthlyPayment: 300,
        isWorkplacePension: false,
      },
      {
        potName: 'Pot 2',
        annualInterestRate: 0.02,
        defaultAnnualInterestRate: 0.02,
        pensionProvider: {
          name: null,
          value: null,
        },
        amount: 1200,
        employer: null,
        lastUpdatedAt: '2024-05-23T13:43:12.606Z',
        monthlyPayment: 0,
        isWorkplacePension: false,
      },
      {
        potName: 'A company',
        annualInterestRate: 0.002,
        defaultAnnualInterestRate: 2,
        pensionProvider: {
          name: null,
          value: null,
        },
        amount: 40000,
        employer: null,
        lastUpdatedAt: '2024-08-05T14:31:26.067Z',
        monthlyPayment: 200,
        isWorkplacePension: false,
      },
      {
        potName: 'Searched Pension',
        annualInterestRate: 0.02,
        defaultAnnualInterestRate: 0.02,
        pensionProvider: {
          name: null,
          value: null,
        },
        amount: 0,
        employer: 'Homebase',
        lastUpdatedAt: '2022-05-21T17:32:03.376Z',
        monthlyPayment: 0,
      },
      {
        potName: 'Pension',
        annualInterestRate: 0.02,
        defaultAnnualInterestRate: 0.02,
        pensionProvider: {
          name: null,
          value: null,
        },
        amount: 40000,
        employer: 'Telegraph',
        lastUpdatedAt: '2024-06-11T10:52:33.819Z',
        monthlyPayment: 0,
      },
    ];
    

    const searchedPensions = [
      {
        policyNumber: null,
        annualFee: null,
        status: 'TO_HUNT',
        previousName: null,
        previousAddress: '12 Something St',
        foundOn: '2020-06-11T10:52:33.819Z',
        isDraft: true,
      },
      {
        policyNumber: null,
        annualFee: null,
        status: 'FOUND',
        previousName: null,
        previousAddress: '12 Something St',
        foundOn: '2024-08-11T10:52:33.819Z',
        isDraft: false,
      },
    ];

    // Save pension providers
    const savedPensionProviders = await pensionProviderRepository.save(
      pensionProviders
    );

    // Assign saved pension providers to pension pots
    pensionPots.forEach((pot) => {
      const providerIndex = pensionProviders.findIndex(
        (provider) => provider.name === pot.pensionProvider.name
      );
      pot.pensionProvider = savedPensionProviders[providerIndex];
    });

    // Save pension pots
    await pensionPotRepository.save(pensionPots);

    // Add pension pot ids to searched pensions
    const pensionPotsThatHaveBeenSearched = await pensionPotRepository.find({
      where: [
        { potName: 'Searched Pension' },
        { potName: 'Pension' },
      ]
    });

    const searchedPensionsWithPots = searchedPensions.map((searchedPension, index) => {
      return {
        ...searchedPension,
        pensionPotId: pensionPotsThatHaveBeenSearched[index].id,
      }
    });

    // Save searched pensions
    await searchedPensionsRepository.save(searchedPensionsWithPots);

    console.log('Database populated successfully');
  } catch (error) {
    console.error('Error populating database:', error);
  }
}

(async function () {
  await populateDatabase();
})();