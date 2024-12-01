import { Expense } from '../types.ts';
import ExpenseEntry from './ExpenseEntry.tsx';
import { useState } from 'react';

interface Props {
  data: Expense[];
}

const PurchasesTab = ({ data }: Props) => {
  return (
    <div className={'bg-gray-700y-600 w-full space-y-1'}>
      {data
        .sort((a, b) => {
          return -new Date(a.date).getTime() + new Date(b.date).getTime();
        })
        .map((entry) => (
          <ExpenseEntry expense={entry} />
        ))}
    </div>
  );
};

export default PurchasesTab;
