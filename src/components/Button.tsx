interface Props {
  children?: string;
  onClick?: () => void;
  style?: 'primary' | 'secondary' | 'tertiary';
  type?: 'submit' | 'button';
  margin?: 'right' | 'left';
}

function Button({
  children = 'Button',
  onClick,
  style = 'primary',
  type = 'button',
  margin = 'right',
}: Props) {
  const styleClasses = {
    primary: 'bg-blue-700 text-cyan-400 hover:bg-blue-800 hover:text-white',
    secondary: 'bg-green-700 text-cyan-400 hover:bg-green-800 hover:text-white',
    tertiary: 'bg-red-700 text-cyan-400 hover:bg-red-800 hover:text-white',
  };

  const marginClasses = {
    left: 'ml-2',
    right: 'mr-2',
  };
  return (
    <button
      onClick={onClick}
      className={`${styleClasses[style]} ${marginClasses[margin]} p-3 pl-4 pr-4 rounded  min-w-[85px]
      transform hover:scale-105 hover:font-bold transition duration-150 active:scale-95 flex-shrink-0`}
      type={type}
    >
      {children}
    </button>
  );
}

export default Button;
