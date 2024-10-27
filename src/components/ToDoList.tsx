import Button from './Button.tsx';

interface Props {
  title?: string;
}

function ToDoList({ title = 'Default Title' }: Props) {
  const handleClick = () => {
    console.log('hello click');
  };
  return (
    <div className={'w-1/3 bg-gray-900 m-auto p-4 rounded'}>
      <h1 className={'text-2xl m-auto text-cyan-100'}>{title}</h1>
      <Button onClick={handleClick}>asd</Button>
    </div>
  );
}

export default ToDoList;
