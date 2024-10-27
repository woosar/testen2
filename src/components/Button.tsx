interface Props {
  children: string;
  onClick: () => void;
  style?: 'primary' | 'secondary' | 'tertiary';
}

function Button({ children, onClick, style = 'primary' }: Props) {
  const styleClasses = {
    primary: 'bg-blue-700 text-cyan-400 hover:bg-blue-800 hover:text-white',
    secondary: 'bg-green-700 text-cyan-400 hover:bg-green-800 hover:text-white',
    tertiary: 'bg-red-700 text-cyan-400 hover:bg-red-800 hover:text-white',
  };
  return (
    <button
      onClick={onClick}
      className={`${styleClasses[style]} p-4 pl-4 pr-4 rounded  
      transform hover:scale-105 hover:font-bold transition duration-100 active:scale-95`}
    >
      {children}
    </button>
  );
}

export default Button;
