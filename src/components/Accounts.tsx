// interface Props {}
import { accountBalance } from '../services/purchaseService.ts';
import { useEffect, useState } from 'react';
import { Account } from '../types.ts';

const Accounts = () => {
  const [a, b] = useState<Record<Account, number>>();

  useEffect(() => {
    const fetchData = async () => {
      const x = await accountBalance(2024, 12);
      b(x);
    };
    fetchData().then();
  }, []);

  return a ? (
    <div className={'flex justify-between text'}>
      {Object.entries(a)
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .filter(([_key, value], _) => value != 0)
        .map(([key, value], asd) => (
          <div key={asd} className={'bg-gray-700 p-2 pl-4 pr-4 rounded'}>
            {key}: {(value / 100).toFixed(2)}
          </div>
        ))}
    </div>
  ) : (
    <div>loading</div>
  );
};

export default Accounts;
