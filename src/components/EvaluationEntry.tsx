import { IEntry } from '../types.ts';
import ProgressBar from './ProgressBar.tsx';

interface Props {
  data: IEntry;
}

const EvaluationEntry = ({ data }: Props) => {
  return (
    <div className={'w-full flex items-center'}>
      <div className={'w-1/3 mr-auto p-2 rounded bg-blue-700 flex m-1'}>
        <div className={'mr-auto'}> {data.name}</div>
        <div className={'ml-auto'}>
          {' '}
          {(data.current_value / 100).toFixed(2)}
        </div>
      </div>
      {data.max_value && data.rest_value ? (
        <div className={'w-2/3 flex bg-yellow-500 justify-end rounded ml-2'}>
          <ProgressBar
            max_value={data.max_value}
            current_value={data.current_value}
          />
        </div>
      ) : (
        <div className={'p-2 w-2/3 m-1 text-gray-700'}>asd</div>
      )}
    </div>
  );
};
export default EvaluationEntry;
