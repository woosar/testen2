interface Props {
  children: string;
  onClick: (activePage: string) => void;
  activePage: string;
  name: string;
}

const NavbarItem = ({ children, onClick, activePage, name }: Props) => {
  const handleClick = () => {
    console.log(name);
    if (!isActive) onClick(name);
  };

  const isActive = name === activePage;

  const display = isActive
    ? 'bg-gray-300 text-gray-800'
    : 'bg-gray-600 hover:scale-105 active:scale-95 transition duration:150 cursor-pointer';
  return (
    <div
      onClick={handleClick}
      className={`${display} rounded p-2 m-2 flex justify-center`}
    >
      {children}
    </div>
  );
};
export default NavbarItem;
