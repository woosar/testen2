import { useEffect, useState } from 'react';
import { IEntries } from '../types.ts';
import { get_overview_interface } from '../services/evaluationService.ts';
import EvaluationEntry from './EvaluationEntry.tsx';
import LoadingSpinner from './LoadingSpinner.tsx';

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
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
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
      setTimeout(() => {
        setLoading(false);
      }, 0);
    };

    fetchData().then();
  }, [year, month, blocked, rate, eom]);

  useEffect(() => {
    if (entries?.monthly_rate) {
      setSavingNecessary(true);
    } else {
      setSavingNecessary(false);
    }
  }, [entries]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return entries ? (
    <div className={'w-full'}>
      <EvaluationEntry data={entries.income} />
      <EvaluationEntry data={entries.overhead} />
      <EvaluationEntry data={entries.necessary} />
      <EvaluationEntry data={entries.optional} />
      {entries.gas ? <EvaluationEntry data={entries.gas} /> : null}
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
