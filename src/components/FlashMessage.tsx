import './FlashMessage.css';

interface Props {
  message: string;
  type?: 'success' | 'error' | 'info';
  fadeOut?: boolean;
}

function FlashMessage({ message, type = 'info', fadeOut = false }: Props) {
  const typeClasses = {
    success: 'bg-green-500 text-white',
    error: 'bg-red-500 text-white',
    info: 'bg-blue-500 text-white',
  };

  return (
    <div
      className={`${typeClasses[type]} p-3 rounded mt-2 ${fadeOut ? 'fade-out' : ''}`}
    >
      {message}
    </div>
  );
}

export default FlashMessage;
