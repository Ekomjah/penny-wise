import { Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import Dollar from '../assets/dollar.png';

import { CircleUser, House, Menu } from 'lucide-react';

export default function NavBar() {
  return (
    <nav className='navbar fixed top-0 left-0 right-0 py-4 w-full px-6 flex items-center justify-between z-20 bg-[var(--nav-bg)] text-[var(--text)] border-b border-[var(--nav-border)] shadow-[var(--nav-shadow)] backdrop-blur-md backdrop-saturate-150 transition-all'>
      <Link to='/' className='relative'>
        <button className='w-9 h-9 flex items-center justify-center rounded-full transition-colors hover:bg-gray-100 dark:hover:bg-gray-800'>
          <House />
        </button>
      </Link>
      <Link
        to='/dashboard'
        className='text-xl font-bold justify-self-center relative'
      >
        <img src={Dollar} alt='$' className='w-10 h-10 inline-block' />
        <span className='ml-2'>Penny Wise</span>
      </Link>
      <div className='md:flex hidden gap-4 items-center justify-end relative'>
        <MenuElements />
      </div>
      <button
        aria-label='menu-btn'
        type='button'
        class='menu-btn inline-block md:hidden active:scale-90 transition'
      >
        <Menu />
      </button>
      <div class='mobile-menu absolute top-[70px] left-0 w-full bg-white p-6 hidden md:hidden'>
        <MenuElements />
      </div>
    </nav>
  );
}

function MenuElements() {
  return (
    <>
      <ThemeToggle />
      <Link to='/profile'>
        <CircleUser />
      </Link>
      <Link to='/signup'>
        <button className='px-4 py-2 bg-[var(--accent-bold)] text-white transition-colors hover:bg-gray-500 dark:hover:bg-gray-800'>
          Sign Up
        </button>
      </Link>
      <Link to='/login'>
        <button className='px-4 py-2 bg-[var(--accent-bg)] text-[var(--text)] transition-colors hover:bg-gray-100 dark:hover:bg-gray-800'>
          Log In
        </button>
      </Link>
    </>
  );
}
