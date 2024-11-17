import { FaTrashCan } from 'react-icons/fa6';

interface Props {
  task: string;
  onRemove: () => void;
}

function ListEntry({ task, onRemove }: Props) {
  return (
    <div className={'w-full p-2 bg-cyan-600 mt-2 rounded flex justify-between'}>
      <p className={'m-1'}>{task}</p>
      <FaTrashCan
        className={'m-2 cursor-pointer hover:scale-110 hover:text-blue-800'}
        onClick={onRemove}
      />
    </div>
  );
}

export default ListEntry;
