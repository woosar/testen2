import React, { useState } from 'react';
import MainFrame from './components/MainFrame.tsx';

const App: React.FC = () => {
  const [month, _] = useState<[number, number]>([
    new Date().getMonth() + 1,
    new Date().getFullYear(),
  ]);
  return (
    <div className={'w-full m-auto bg-gray-900 min-h-screen p-4'}>
      <MainFrame month={month} />
      {month}
    </div>
  );
};

export default App;
