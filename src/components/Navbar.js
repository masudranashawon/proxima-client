import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className='navbar container mx-auto h-20 flex justify-between items-center border-b border-sky-900'>
      <Link to='/' className='logo text-2xl font-medium text-sky-400'>
        Proxima
      </Link>
    </nav>
  );
};

export default Navbar;
