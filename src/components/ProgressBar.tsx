interface Props {
  max_value: number;
  current_value: number;
}

const ProgressBar = ({ max_value, current_value }: Props) => {
  const percentage = (-current_value / max_value) * 100;

  return (
    <div className="w-full bg-gray-600 rounded">
      <div
        className="text-black bg-gray-500 p-2 rounded flex"
        style={{ width: `${percentage}%`, maxWidth: '100%' }}
      >
        <span className={'m-auto'}>{percentage.toFixed(2)} %</span>
        {/*{percentage.toFixed(2)}%<span className={'ml-auto'}>asd</span>*/}
      </div>
    </div>
  );
};

export default ProgressBar;
