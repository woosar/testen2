interface Props {
  task: string;
}

function ListEntry({ task }: Props) {
  return <div className={'w-full p-3 bg-cyan-900 mt-2 rounded'}>{task}</div>;
}

export default ListEntry;
