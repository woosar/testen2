import Button from './Button.tsx';

interface Props {
  title?: string;
}

function ToDoList({ title = 'Default Title' }: Props) {
  const handleReset = () => {
    console.log('hello reset');
  };
  const handleSort = () => {
    console.log('hello sort');
  };
  return (
    <div className={'w-1/3 bg-gray-900 m-auto p-4 rounded'}>
      <h1 className={'text-2xl m-auto text-cyan-100'}>{title}</h1>
      <Button onClick={handleReset}>Reset</Button>
      <Button onClick={handleSort}>Sort</Button>
    </div>
  );
}

export default ToDoList;
