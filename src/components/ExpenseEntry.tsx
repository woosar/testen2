import { Expense } from '../types.ts';
import { useState } from 'react';
import { set } from 'mongoose';

interface Props {
  expense: Expense;
}

const ExpenseEntry = ({ expense }: Props) => {
  const [expand, setExpand] = useState<boolean>(false);
  return (
    <div>
      <div
        className={
          'flex justify-between w-full p-1 space-x-3 bg-gray-600 rounded hover:bg-gray-500'
        }
        onClick={() => {
          setExpand(!expand);
        }}
      >
        <div className={'flex justify-between w-1/4'}>
          <div>
            {expense.date.toLocaleDateString('de-DE', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
            })}
          </div>
        </div>
        <div className={'flex justify-between w-3/4'}>
          <div>{expense.comment}</div>

          <div>{(expense.value / 100).toFixed(2)}</div>
        </div>
      </div>
      {expand ? expense.purchaseId : null}
    </div>
  );
};
export default ExpenseEntry;
