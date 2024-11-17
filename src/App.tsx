import React, { useState } from 'react';
import MainFrame from './components/MainFrame.tsx';

const App: React.FC = () => {
  const [dropDownVisible, setDropDownVisible] = useState<boolean>(false);

  const [month, setMonth] = useState<[number, number]>([
    new Date().getMonth() + 1,
    new Date().getFullYear(),
  ]);
  return (
    <div className={'w-full m-auto bg-gray-900 min-h-screen p-4'}>
      <MainFrame setDropDownVisible={setDropDownVisible} month={month} />

      {dropDownVisible && (
        <div
          className={
            'absolute top-0 left-1/2 transform -translate-x-1/2 bg-yellow-500 w-1/2 rounded p-4 invisible'
          }
          // style={{ transform: 'translateY(-100%)' }} // This will move the menu above the reference point
        >
          <div className={'bg-blue-500 m-2 rounded visible'}>
            <p>Menu Item 1</p>
            <p>Menu Item 2</p>
            <p>Menu Item 3</p>
            <button onClick={() => setDropDownVisible(false)}>asd</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
