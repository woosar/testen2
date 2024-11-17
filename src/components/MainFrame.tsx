import Navbar from './Navbar.tsx';
import Content from './Content.tsx';
import { useEffect, useState } from 'react';
import Dashboard from './Dashboard.tsx';
import { sumTest } from '../services/evaluationService.ts';

interface Props {
  setDropDownVisible: (isVisible: boolean) => void;
  month: [number, number];
}

function MainFrame({ setDropDownVisible, month }: Props) {
  const listOfPages: string[] = ['purchases', 'categories', 'evaluation'];
  const [activePage, setActivePage] = useState<string>('home');
  const [remainingBudget, setRemainingBudget] = useState<number | null>(null);

  return (
    <div className={'w-1/2 m-auto bg-gray-800 rounded text-gray-300 flex p-2'}>
      <div className={'w-full flex-col'}>
        <div className={'w-full flex-shrink-0 p-2'}>
          <Dashboard
            budget={remainingBudget ? remainingBudget : 0}
            month={month[0]}
            year={month[1]}
            setDropDownVisible={setDropDownVisible}
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
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainFrame;