import { navItems } from '@/lib/data';
import { Link, NavLink } from 'react-router-dom';
import { ModeToggle } from '../mode-toggle';
import { BookOpenCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

const Navbar = () => {
  return (
    <nav className=' shadow-lg pt-6 pb-6 bg-white dark:bg-gray-900'>
      <div className='flex items-center justify-between max-w-7xl mx-auto'>
        <Link to='/'>
          <BookOpenCheck className='w-12 h-12' />
        </Link>

        <div className='flex gap-6 font-semibold items-center justify-center'>
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                cn('nav-link', isActive && 'text-red-500')
              }
            >
              {item.label}
            </NavLink>
          ))}
          <div className=''>
            <ModeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
