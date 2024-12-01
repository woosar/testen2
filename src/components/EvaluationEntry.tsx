import { IEntry } from '../types.ts';
import ProgressBar from './ProgressBar.tsx';

interface Props {
  data: IEntry;
}

const EvaluationEntry = ({ data }: Props) => {
  const progress: boolean = data.max_value != null && data.rest_value != null;

  const percent =
    data.max_value != null && data.rest_value != null
      ? Math.round(100 - (100 * data.rest_value) / data.max_value)
      : 100;
  // const percent = 50;
  return (
    <div className={'w-full flex items-center'}>
      <div
        className={'w-full p-2 rounded bg-gray-600 flex m-1'}
        style={{
          background: `linear-gradient(to right, #4B5563 ${percent}%, #374151 ${percent}%, #374151 100%)`,
        }}
      >
        <div className={'mr-auto'}> {data.name}</div>
        <div className={'ml-auto'}>
          {' '}
          {(data.current_value / 100).toFixed(2)}
        </div>
      </div>
    </div>
  );
};
export default EvaluationEntry;
