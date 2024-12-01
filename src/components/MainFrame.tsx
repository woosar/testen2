import Navbar from './Navbar.tsx';
import Content from './Content.tsx';
import { useEffect, useState } from 'react';
import Dashboard from './Dashboard.tsx';

interface Props {
  month: [number, number];
}

function MainFrame({ month }: Props) {
  const listOfPages: string[] = ['purchases', 'categories', 'evaluation'];
  const [activePage, setActivePage] = useState<string>('evaluation');
  const [remainingBudget, setRemainingBudget] = useState<number | null>(null);
  const [blocked, setBlocked] = useState<boolean>(true);
  const [eom, setEom] = useState<boolean>(false);
  const [rate, setRate] = useState<boolean>(true);
  const [savingNecessary, setSavingNecessary] = useState<boolean>(true);

  useEffect(() => {
    const currentDay = new Date().getDate();
    console.log('hennelooo');
    if (currentDay >= 25) {
      setEom(true);
    } else {
      setEom(false);
    }
  }, []);

  return (
    <div
      className={
        'max-w-[1300px] m-auto bg-gray-800 rounded text-gray-300 flex p-2 text-lg'
      }
    >
      <div className={'w-full flex-col'}>
        <div className={'w-full flex-shrink-0 p-2'}>
          <Dashboard
            budget={remainingBudget ? remainingBudget : 0}
            month={month[0]}
            year={month[1]}
            savingNecessary={savingNecessary}
            setRate={setRate}
            setEom={setEom}
            setBlocked={setBlocked}
            blocked={blocked}
            eom={eom}
            rate={rate}
          />
        </div>
        <div className={'w-full flex'}>
          <div className={'w-1/5 flex-shrink-0 p-2'}>
            <Navbar
              listOfPages={listOfPages}
              activePage={activePage}
              onClick={setActivePage}
            />
          </div>
          <div className={'w-4/5 flex-shrink-0 p-2'}>
            <Content
              page={activePage}
              month={month}
              setRemainingBudget={setRemainingBudget}
              blocked={blocked}
              eom={eom}
              rate={rate}
              setSavingNecessary={setSavingNecessary}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainFrame;
