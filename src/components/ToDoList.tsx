import Button from './Button.tsx';
import ListEntry from './ListEntry.tsx';
import FlashMessage from './FlashMessage.tsx';
import React, { useState, useEffect } from 'react';

interface Props {
  title?: string;
}

interface FlashMessageState {
  message: string;
  type: 'success' | 'error' | 'info';
}

function ToDoList({ title = 'Default Title' }: Props) {
  const [listEntries, setListEntries] = useState<string[]>([
    'Doing homework',
    'walking the dog',
    'Cleaning the kitchen',
  ]);
  const [inputValue, setInputValue] = useState<string>('');
  const [flashMessage, setFlashMessage] = useState<FlashMessageState | null>(
    null
  );
  const [fadeOut, setFadeOut] = useState<boolean>(false);
  useEffect(() => {
    if (flashMessage) {
      const timer = setTimeout(() => {
        setFadeOut(true);
        setTimeout(() => {
          setFlashMessage(null);
          setFadeOut(false);
        }, 500);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [flashMessage]);
  const handleReset = () => {
    setListEntries([]);
    setFlashMessage({ message: 'List reset successfully', type: 'success' });
  };
  const handleSort = () => {
    console.log('hello sort');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.length === 0) {
      setFlashMessage({ message: 'Please enter a task.', type: 'error' });
    } else {
      setListEntries([...listEntries, inputValue]);
      setInputValue('');
      setFlashMessage({ message: 'Task added successfully', type: 'success' });
    }
  };

  const handleRemove = (index: number, message: string) => {
    setListEntries(listEntries.filter((_, i) => i !== index));
    setFlashMessage({
      message: `Task "${message}" removed successfully`,
      type: 'success',
    });
  };

  return (
    <div className={'w-1/3 bg-gray-900 m-auto p-4 rounded'}>
      <h1 className={'text-2xl m-auto text-cyan-100 pb-4'}>
        {title}: {inputValue}
      </h1>

      <form onSubmit={handleSubmit} className={'flex'}>
        <input
          type="text"
          className={'p-3 rounded w-full flex-grow'}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter a task"
        />
        <Button type="submit" margin="left">
          Add Task
        </Button>
      </form>
      {listEntries.map((entry, index) => (
        <ListEntry
          key={index}
          task={entry}
          onRemove={() => handleRemove(index, entry)}
        />
      ))}

      <div className={'p-1'}></div>
      <Button onClick={handleReset}>Reset</Button>
      <Button onClick={handleSort}>Sort</Button>
      {flashMessage && (
        <FlashMessage
          message={flashMessage.message}
          type={flashMessage.type}
          fadeOut={fadeOut}
        />
      )}
    </div>
  );
}

export default ToDoList;
