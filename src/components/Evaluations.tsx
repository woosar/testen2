import { useEffect, useState } from 'react';
import { IEntries } from '../types.ts';
import { get_overview_interface } from '../services/evaluationService.ts';
import EvaluationEntry from './EvaluationEntry.tsx';

interface Props {
  month: [number, number];
  setRemainingBudget: (value: number) => void;
  blocked: boolean;
  eom: boolean;
  rate: boolean;
  setSavingNecessary: (value: boolean) => void;
}

const Evaluations = ({
  month: [month, year],
  setRemainingBudget,
  blocked,
  rate,
  eom,
  setSavingNecessary,
}: Props) => {
  const [entries, setEntries] = useState<IEntries | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await get_overview_interface(
        year,
        month,
        blocked,
        rate,
        eom
      );
      if (data) {
        setEntries(data);
        setRemainingBudget(data.current_balance.current_value / 100);
      }
    };

    fetchData().then();
  }, [year, month, blocked, rate, eom]);

  useEffect(() => {
    if (entries?.monthly_rate) {
      setSavingNecessary(true);
    } else {
      setSavingNecessary(false);
    }
  }, []);

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
      {entries.monthly_rate ? (
        <EvaluationEntry data={entries.monthly_rate} />
      ) : null}
    </div>
  ) : null;
};

export default Evaluations;
