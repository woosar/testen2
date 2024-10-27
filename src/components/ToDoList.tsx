import Button from './Button.tsx';

interface Props {
  title?: string;
}

function ToDoList({ title = 'Default Title' }: Props) {
  return (
    <div className={'w-1/2 bg-amber-300 m-auto p-4 rounded'}>
      <h1 className={'text-2xl m-auto'}>{title}</h1>
      <Button>asd</Button>
    </div>
  );
}

export default ToDoList;
