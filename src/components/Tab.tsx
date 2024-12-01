import { Account } from '../types.ts';

interface Props {
  name: string;
  active: boolean;
  onClick: (account: Account) => void;
  value: number;
}

const Tab = ({ name, active, onClick, value }: Props) => {
  const handleClick = () => {
    onClick(name as Account);
  };

  const style = active
    ? 'bg-gray-600 '
    : 'bg-gray-700 border-t border-gray-500';
  return (
    <button
      onClick={handleClick}
      className={`p-2  w-full rounded-t ${style} flex justify-center`}
    >
      {name}
      {(value / 100).toFixed(2)}
    </button>
  );
};

export default Tab;
