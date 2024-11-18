import { useEffect, useState } from 'react';
import { IEntries } from '../types.ts';
import { get_overview_interface } from '../services/evaluationService.ts';
import EvaluationEntry from './EvaluationEntry.tsx';

interface Props {
  month: [number, number];
  setRemainingBudget: (value: number) => void;
}

const Evaluations = ({ month: [month, year], setRemainingBudget }: Props) => {
  const [entries, setEntries] = useState<IEntries | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await get_overview_interface(year, month);
      if (data) {
        setEntries(data);
        setRemainingBudget(data.current_balance.current_value / 100);
      }
    };

    fetchData().then();
  }, [year, month]);

  return entries ? (
    <div className={'w-full'}>
      <EvaluationEntry data={entries.income} />
      <EvaluationEntry data={entries.overhead} />
      <EvaluationEntry data={entries.necessary} />
      <EvaluationEntry data={entries.optional} />
      <EvaluationEntry data={entries.gas} />
      <EvaluationEntry data={entries.current_budget} />
      <EvaluationEntry data={entries.current_balance} />
      <EvaluationEntry data={entries.current_savings} />
      <EvaluationEntry data={entries.savings_goal} />
    </div>
  ) : null;
};

export default Evaluations;
