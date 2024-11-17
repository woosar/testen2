import { useEffect, useState } from 'react';
import { IEntries } from '../types.ts';
import { get_overview_interface } from '../services/evaluationService.ts';

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

  return <p>{}</p>;
};

export default Evaluations;
