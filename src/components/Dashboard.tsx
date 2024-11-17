interface Props {
  month: number;
  year: number;
  budget: number;
  setDropDownVisible: (isVisible: boolean) => void;
}

const Dashboard = ({ month, year, setDropDownVisible, budget }: Props) => {
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
      <div className={'w-full bg-gray-700 rounded p-4 flex'}>
        <span onClick={() => setDropDownVisible(true)}>
          {getMonthName(month)} {year}
        </span>
        <span className={'flex ml-auto'}>{budget.toFixed(2)} €</span>
      </div>
    </>
  );
};

export default Dashboard;
