import { Expense } from '../types.ts';

interface Props {
  expense: Expense;
}

const ExpenseEntry = ({ expense }: Props) => {
  return (
    <div
      className={
        'flex justify-between w-full p-1 space-x-3 bg-gray-600 rounded'
      }
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
  );
};
export default ExpenseEntry;
