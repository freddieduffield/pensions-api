import { AppDataSource } from './data-source';
import { PensionPot } from './entity/PensionPot';
import { PensionProvider } from './entity/PensionProvider';
import { SearchedPensions } from './entity/SearchedPensions';

export async function populateDatabase() {
  try {
    const pensionPotRepository = AppDataSource.getRepository(PensionPot);
    const pensionProviderRepository =
      AppDataSource.getRepository(PensionProvider);
    const searchedPensionsRepository = AppDataSource.getRepository(SearchedPensions);  

    await pensionPotRepository.delete({});
    await pensionProviderRepository.delete({});
    await searchedPensionsRepository.delete({});

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
        id: '1509481e-565d-444a-8e24-d72d3244b663',
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
        id: 'c759b80a-558a-488d-aba9-f1ee9593020b',
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
        id: '3e2bfea6-d7bb-4ef6-8dea-2a149b4ef24c',
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
        id: '1bbb9dfc-eb62-4988-9fab-7e0a52844d8c',
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
        id: 'd18083cf-4990-4248-a3e8-37140706a8d7',
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
    ];

    const searchedPensions = [
      {
        id: '0a4c2ed0-3b0c-4606-817e-e6f8d14dbfd2',
        potName: 'Searched Pension',
        policyNumber: null,
        annualFee: null,
        status: 'TO_HUNT',
        previousName: null,
        previousAddress: '12 Something St',
        annualInterestRate: 0.02,
        defaultAnnualInterestRate: 0.02,
        pensionProvider: {
          name: null,
          value: null,
        },
        amount: 0,
        employer: 'Homebase',
        foundOn: '2020-06-11T10:52:33.819Z',
        lastUpdatedAt: '2022-05-21T17:32:03.376Z',
        monthlyPayment: 0,
        isDraft: true,
      },
      {
        id: '4b6004d2-58f6-45c6-9a27-045b9571ae3e',
        potName: 'Pension',
        policyNumber: null,
        annualFee: null,
        status: 'FOUND',
        previousName: null,
        previousAddress: '12 Something St',
        annualInterestRate: 0.02,
        defaultAnnualInterestRate: 0.02,
        pensionProvider: {
          name: null,
          value: null,
        },
        amount: 40000,
        employer: 'Telegraph',
        foundOn: '2024-08-11T10:52:33.819Z',
        lastUpdatedAt: '2024-06-11T10:52:33.819Z',
        monthlyPayment: 0,
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


    // Assign saved pension providers to searched pensions 
    // searchedPensions.forEach((searchedPension) => {
    //   const providerIndex = pensionProviders.findIndex(
    //     (provider) => provider.name === searchedPension.pensionProvider.name
    //   );
    //   searchedPension.pensionProvider = savedPensionProviders[providerIndex];
    // });

    // Save pension pots
    await pensionPotRepository.save(pensionPots);

    // Save searched pensions
    await searchedPensionsRepository.save(searchedPensions);

    console.log('Database populated successfully');
  } catch (error) {
    console.error('Error populating database:', error);
  }
}
