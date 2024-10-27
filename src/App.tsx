import ToDoList from './components/ToDoList.tsx';

function App() {
  return (
    <div className={'bg-gray-950 min-h-screen p-4'}>
      <ToDoList title={'To Do List'} />
    </div>
  );
}

export default App;
