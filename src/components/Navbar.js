import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";

const Navbar = () => {
  const [hover, setHover] = useState(false);
  const { user } = useAuthContext();
  const { logout } = useLogout();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className='navbar container mx-auto h-24 flex flex-col justify-center lg:flex-row lg:h-20 lg:justify-between items-center border-b border-sky-900'>
      <Link to='/' className='logo text-2xl font-medium text-sky-400'>
        Proxima
      </Link>

      <nav className='flex gap-5'>
        {!user && (
          <div className='flex gap-5'>
            <Link to='/login' className='hover:text-sky-400 duration-300'>
              Login
            </Link>
            <Link to='/signup' className='hover:text-sky-400 duration-300'>
              Signup
            </Link>
          </div>
        )}
        {user && (
          <div className='flex gap-5 lg:w-auto justify-around items-center relative w-screen'>
            <h3>
              {user?.fullName && "Welcome,"}{" "}
              <span
                onMouseOver={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                className={`${
                  user?.fullName && "capitalize"
                } font-bold cursor-pointer text-sky-50 hover:text-sky-400 duration-300
                `}
              >
                {user?.fullName ? `${user?.fullName}` : user?.email}
              </span>
              {hover && user?.fullName ? (
                <p
                  onMouseOver={() => setHover(true)}
                  onMouseLeave={() => setHover(false)}
                  className='bg-sky-400 w-full h-full p-3 px-5 rounded-lg absolute -bottom-[100%] left-[50%] -translate-x-[50%] shadow-xl'
                >
                  <span className='block user-email w-full h-full truncate text-center font-bold text-sky-800'>
                    {user?.email}
                  </span>

                  <span className='w-5 h-5 rotate-45 bg-sky-400 absolute -top-[20%] left-[50%] -translate-x-[50%] z-[1]'></span>
                </p>
              ) : null}
            </h3>
            <button
              onClick={handleLogout}
              type='submit'
              className='bg-rose-500 text-white py-3 px-5 rounded-lg hover:bg-sky-50 hover:text-slate-900 duration-300'
            >
              Logout
            </button>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
