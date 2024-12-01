import {
  accountBalance,
  displayPurchases,
} from '../services/purchaseService.ts';
import { Account, Expense } from '../types.ts';
import PurchasesTab from './PurchasesTab.tsx';
import { useEffect, useState } from 'react';
import Tab from './Tab.tsx';

const Purchases = () => {
  const [expenses, setExpenses] = useState<Record<Account, Expense[]>>();
  const [balances, setBalances] = useState<Record<Account, number>>();
  const [activeTab, setActiveTab] = useState<Account>(Account.Giro);
  useEffect(() => {
    const fetchData = async () => {
      const localStuff = await displayPurchases(2024, 12);
      const localStuff2 = await accountBalance(2024, 12);
      setExpenses(localStuff);
      setBalances(localStuff2);
    };
    fetchData().then(() => {});
  }, []);

  const availableTabs = expenses
    ? (Object.entries(expenses) as [Account, Expense[]][]).filter(
        ([_, value]) => {
          return value.length > 0;
        }
      )
    : [];

  if (expenses) {
    return (
      <div className={'flex flex-col w-full'}>
        <div className={'flex space-x-2 w-full'}>
          {availableTabs.map((entry: [Account, Expense[]]) => {
            // console.log(balances[entry[0]]);
            return (
              <Tab
                name={entry[0]}
                active={entry[0] == activeTab}
                onClick={setActiveTab}
                value={balances ? balances[entry[0]] : 0}
              />
            );
          })}
        </div>
        <PurchasesTab data={expenses[activeTab]} />
      </div>
    );
  } else {
    return <p>asdck</p>;
  }
};

export default Purchases;
