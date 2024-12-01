import {
  getAccounts,
  getPurchases,
  getTransactions,
} from './databaseService.ts';
import { Account, Expense, ITransaction } from '../types.ts';
import { IPurchase } from '../models/Purchase.ts';

const getAccountMap = async (): Promise<{ [key: string]: Account }> => {
  const accounts = await getAccounts();
  const hashmap: { [key: string]: Account } = {};
  accounts.map((entry) => {
    switch (entry.handle) {
      case 'giro':
        hashmap[entry._id] = Account.Giro;
        break;
      case 'giro_old':
        hashmap[entry._id] = Account.GiroAlt;
        break;
      case 'visa':
        hashmap[entry._id] = Account.Visa;
        break;
      case 'mastercard':
        hashmap[entry._id] = Account.MasterCard;
        break;
      case 'reserves_01':
        hashmap[entry._id] = Account.Savings1;
        break;
      case 'reserves_02':
        hashmap[entry._id] = Account.Savings2;
        break;
      case 'reserves_03':
        hashmap[entry._id] = Account.Savings3;
        break;
      case 'cash':
        hashmap[entry._id] = Account.Cash;
        break;
      default:
        throw new Error('fuck you');
    }
  });
  return hashmap;
};

const transActionsToExpenses = async (
  transactions: ITransaction[]
): Promise<Expense[]> => {
  const hashmap: { [key: string]: ITransaction[] } = {};
  const accountMap = await getAccountMap();

  transactions.map((entry) => {
    if (!hashmap[entry.purchase]) {
      hashmap[entry.purchase] = [];
    }
    hashmap[entry.purchase].push(entry);
  });

  const expenses: Expense[] = await Promise.all(
    Object.entries(hashmap).map(async ([purchaseId, transactions]) => {
      const accountId = transactions[0].account;
      const totalValue = transactions.reduce(
        (sum, transaction) => sum + transaction.value,
        0
      );
      const purchase: IPurchase[] = await getPurchases({ _id: purchaseId });

      return {
        account: accountMap[accountId],
        purchaseId: purchaseId,
        value: totalValue,
        comment: purchase[0].comment,
        date: new Date(purchase[0].date),
      };
    })
  );
  // console.log(expenses[0]);
  expenses.sort((a, b) => {
    return a.date.getTime() - b.date.getTime();
  });
  return expenses;
};

const splitByAccount = (expenses: Expense[]): Record<Account, Expense[]> => {
  const hashmap: Record<Account, Expense[]> = {
    [Account.Giro]: [],
    [Account.GiroAlt]: [],
    [Account.Visa]: [],
    [Account.MasterCard]: [],
    [Account.Savings1]: [],
    [Account.Savings2]: [],
    [Account.Savings3]: [],
    [Account.Cash]: [],
  };

  expenses.map((entry) => {
    if (!hashmap[entry.account]) {
      hashmap[entry.account] = [];
    }
    hashmap[entry.account].push(entry);
  });

  return hashmap;
};

export const displayPurchases = async (
  year: number,
  month: number
): Promise<Record<Account, Expense[]>> => {
  const queryParams = {
    date: {
      $gte: new Date(Date.UTC(year, month - 1)),
      $lt: new Date(Date.UTC(year, month)),
    },
  };
  const monthlyTransactions = await getTransactions(queryParams);
  const monthlyExpenses = await transActionsToExpenses(monthlyTransactions);
  return splitByAccount(monthlyExpenses);
};

export const accountBalance = async (year: number, month: number) => {
  const queryParams = {
    date: {
      // $gte: new Date(Date.UTC(year, month - 1)),
      $lt: new Date(Date.UTC(year, month)),
    },
  };
  const accounts = await getAccounts();
  const accountMap = await getAccountMap();
  const allTransactions = await getTransactions(queryParams);
  const hashmap: Record<Account, number> = {
    [Account.Giro]: 0,
    [Account.GiroAlt]: 0,
    [Account.Visa]: 0,
    [Account.MasterCard]: 0,
    [Account.Savings1]: 0,
    [Account.Savings2]: 0,
    [Account.Savings3]: 0,
    [Account.Cash]: 0,
  };
  accounts.map((entry) => {
    hashmap[accountMap[entry._id]] = entry.initial_balance;
  });

  allTransactions.map((entry) => {
    hashmap[accountMap[entry.account]] += entry.value;
  });
  return hashmap;
};
