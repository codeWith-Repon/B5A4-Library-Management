import { navItems } from '@/lib/data';
import { Link } from 'react-router-dom';
import { ModeToggle } from '../mode-toggle';
import { BookOpenCheck } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className=' shadow-lg pt-6 pb-6 bg-white dark:bg-gray-900'>
      <div className='flex items-center justify-between max-w-7xl mx-auto'>
        <Link to='/'>
          <BookOpenCheck className='w-12 h-12' />
        </Link>

        <div className='flex gap-6 font-semibold items-center justify-center'>
          {navItems.map((item) => (
            <Link key={item.path} to={item.path} className='nav-link'>
              {item.label}
            </Link>
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
