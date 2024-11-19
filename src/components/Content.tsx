import Evaluations from './Evaluations.tsx';

interface Props {
  page: string;
  month: [number, number];
  setRemainingBudget: (value: number) => void;
  blocked: boolean;
  eom: boolean;
  rate: boolean;
  setSavingNecessary: (value: boolean) => void;
}

const Content = ({
  page,
  month,
  setRemainingBudget,
  blocked,
  eom,
  rate,
  setSavingNecessary,
}: Props) => {
  const contentFrame = (page: string) => {
    if (page === 'evaluation') {
      return (
        <Evaluations
          month={month}
          setRemainingBudget={setRemainingBudget}
          blocked={blocked}
          eom={eom}
          rate={rate}
          setSavingNecessary={setSavingNecessary}
        />
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
