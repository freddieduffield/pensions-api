import { afterAll, beforeEach, expect, test } from 'vitest';
import { initializeAppServer, stopAppServer } from '../server';
import { AppDataSource } from '../data-source';

let server;

beforeEach(async () => {
  AppDataSource.initialize().then(async () => {
    server = await initializeAppServer();
  }).catch(error => console.log(error))
});

afterAll(() => {
  stopAppServer();
});

test('/pension-pots returns a list of pension pots', async () => {
  const response = await fetch('http://localhost:3000/pension-pots');
  const data = await response.json();
  expect(data).toEqual([
    {
      id: 'e04ad6c4-95c7-405f-a13a-e6f7076050e4',
      potName: 'Google',
      annualInterestRate: 0.02,
      defaultAnnualInterestRate: 0.02,
      amount: 36700,
      employer: 'Google',
      lastUpdatedAt: '2024-08-12T17:01:11.029Z',
      monthlyPayment: 335.53,
      isWorkplacePension: true,
      pensionProvider: {
        name: 'Aviva',
        value: 'AVIVA',
      },
    },
    {
      id: 'b6ab6352-01f3-4aed-9fc0-0b839ac25a39',
      potName: 'IBM',
      annualInterestRate: 0.04,
      defaultAnnualInterestRate: 0.02,
      amount: 20000,
      employer: 'IBM',
      lastUpdatedAt: '2024-08-12T17:01:11.029Z',
      monthlyPayment: 0,
      isWorkplacePension: false,
      pensionProvider: {
        name: 'Scottish Widows',
        value: 'SCOTTISH_WIDOWS',
      },
    },
    {
      id: 'd18083cf-4990-4248-a3e8-37140706a8d7',
      potName: 'A company',
      annualInterestRate: 0.002,
      defaultAnnualInterestRate: 2,
      amount: 40000,
      employer: null,
      lastUpdatedAt: '2024-08-05T14:31:26.067Z',
      monthlyPayment: 200,
      isWorkplacePension: false,
      pensionProvider: null,
    },
    {
      id: '1bbb9dfc-eb62-4988-9fab-7e0a52844d8c',
      potName: 'Pot 2',
      annualInterestRate: 0.02,
      defaultAnnualInterestRate: 0.02,
      amount: 1200,
      employer: null,
      lastUpdatedAt: '2024-05-23T13:43:12.606Z',
      monthlyPayment: 0,
      isWorkplacePension: false,
      pensionProvider: null,
    },
    {
      id: '3e2bfea6-d7bb-4ef6-8dea-2a149b4ef24c',
      potName: 'Pot 1',
      annualInterestRate: 0.035,
      defaultAnnualInterestRate: 0.02,
      amount: 12345,
      employer: null,
      lastUpdatedAt: '2024-05-23T13:42:38.354Z',
      monthlyPayment: 300,
      isWorkplacePension: false,
      pensionProvider: null,
    },
    {
      id: 'c759b80a-558a-488d-aba9-f1ee9593020b',
      potName: 'Microsoft',
      annualInterestRate: 0.02,
      defaultAnnualInterestRate: 0.02,
      amount: 123868,
      employer: 'Microsoft',
      lastUpdatedAt: '2024-05-23T13:42:22.780Z',
      monthlyPayment: 0,
      isWorkplacePension: false,
      pensionProvider: null,
    },
    {
      id: '1509481e-565d-444a-8e24-d72d3244b663',
      potName: 'Mintago',
      annualInterestRate: null,
      defaultAnnualInterestRate: 0.02,
      amount: 100,
      employer: 'Mintago',
      lastUpdatedAt: '2024-05-22T17:56:45.028Z',
      monthlyPayment: 0,
      isWorkplacePension: false,
      pensionProvider: null,
    },
  ]);
});
