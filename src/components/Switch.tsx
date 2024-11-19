interface Props {
  switchOn: boolean;
  handleSwitch: () => void;
  title?: string;
}

const Switch = ({ switchOn, handleSwitch, title }: Props) => {
  return (
    <div
      className={`${switchOn ? 'bg-green-600' : 'bg-gray-800'} rounded-full cursor-pointer w-[25px] h-[25px] hover:scale-110 transition duration-150 active:scale-90`}
      onClick={handleSwitch}
      title={title}
    ></div>
  );
};

export default Switch;
