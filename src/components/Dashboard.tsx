import Switch from './Switch.tsx';

interface Props {
  month: number;
  year: number;
  budget: number;
  setDropDownVisible: (isVisible: boolean) => void;
  savingNecessary: boolean;
  setRate: (rate: boolean) => void;
  setEom: (eom: boolean) => void;
  setBlocked: (blocked: boolean) => void;
  blocked: boolean;
  eom: boolean;
  rate: boolean;
}

const Dashboard = ({
  month,
  year,
  setDropDownVisible,
  budget,
  setEom,
  setRate,
  setBlocked,
  savingNecessary,
  blocked,
  eom,
  rate,
}: Props) => {
  const handleBlocked = () => {
    setBlocked(!blocked);
  };
  const handleEom = () => {
    setEom(!eom);
  };
  const handleRate = () => {
    setRate(!rate);
  };
  const getMonthName = (monthNumber: number): string => {
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    return monthNames[monthNumber - 1];
  };

  return (
    <>
      <div
        className={
          'w-full bg-gray-700 rounded p-4 flex justify-between items-center'
        }
      >
        <span onClick={() => setDropDownVisible(true)}>
          {getMonthName(month)} {year}
        </span>
        <div className={'w-1/4 flex justify-center space-x-2'}>
          <Switch
            switchOn={blocked}
            handleSwitch={handleBlocked}
            title={'Blocked'}
          />
          <Switch
            switchOn={eom}
            handleSwitch={handleEom}
            title={'Ende des Monats'}
          />
          {savingNecessary ? (
            <Switch
              switchOn={rate}
              handleSwitch={handleRate}
              title={'Monatliche Rate'}
            />
          ) : null}
        </div>

        <div className={'w-[100px] text-right'}>{budget.toFixed(2)} €</div>
      </div>
    </>
  );
};

export default Dashboard;
