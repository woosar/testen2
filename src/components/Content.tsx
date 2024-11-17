import Evaluations from './Evaluations.tsx';

interface Props {
  page: string;
  month: [number, number];
  setRemainingBudget: (value: number) => void;
}

const Content = ({ page, month, setRemainingBudget }: Props) => {
  const contentFrame = (page: string) => {
    if (page === 'evaluation') {
      return (
        <Evaluations month={month} setRemainingBudget={setRemainingBudget} />
      );
    }
    return <span>{page}</span>;
  };
  return (
    <div className={'bg-gray-700 w-full flex justify-center rounded p-2'}>
      {contentFrame(page)}
    </div>
  );
};

export default Content;
