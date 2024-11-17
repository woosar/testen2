import NavbarItem from './NavbarItem.tsx';

interface Props {
  activePage: string;
  listOfPages: string[];
  onClick: (activePage: string) => void;
}

const Navbar = ({ activePage, onClick, listOfPages }: Props) => {
  return (
    <div className={'bg-gray-700 w-full inline-flex flex-col rounded'}>
      {listOfPages.map((entry, index) => (
        <NavbarItem
          key={index}
          name={entry}
          activePage={activePage}
          onClick={onClick}
        >
          {entry.charAt(0).toUpperCase() + entry.slice(1)}
        </NavbarItem>
      ))}
    </div>
  );
};

export default Navbar;
