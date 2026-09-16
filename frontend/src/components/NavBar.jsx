import { Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import Dollar from '../assets/dollar.png';
import { cn } from '../utils/utils';
import { useState } from 'react';

import { CircleUser, House, Menu } from 'lucide-react';

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className='navbar fixed top-0 left-0 right-0 py-4 w-full px-6 flex items-center justify-between z-20 bg-[var(--nav-bg)] text-[var(--text)] border-b border-[var(--nav-border)] shadow-[var(--nav-shadow)] backdrop-blur-md backdrop-saturate-150 transition-all'>
      <Link to='/' className='relative'>
        <button className='w-9 h-9 flex items-center justify-center rounded-full transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 active:scale-90'>
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
        className='flex md:hidden w-9 h-9 items-center justify-center rounded-full transition-colors active:scale-90 hover:bg-gray-100 dark:hover:bg-gray-800'
        onClick={() => setIsOpen(!isOpen)}
      >
        <Menu />
      </button>
      <div
        className={cn(
          'absolute top-full left-0 right-0 md:hidden flex flex-col items-stretch gap-2 p-5 bg-[var(--bg)] border-b border-[var(--border)] shadow-[var(--nav-shadow)]',
          isOpen ? '' : 'hidden',
        )}
      >
        <MenuElements onNavigate={() => setIsOpen(false)} />
      </div>
    </nav>
  );
}

function MenuElements({ onNavigate }) {
  return (
    <>
      <ThemeToggle
        label='Change Theme'
        className='max-md:w-full max-md:justify-start max-md:gap-2 max-md:rounded-lg max-md:px-3 max-md:hover:bg-gray-100 max-md:dark:hover:bg-gray-800'
      />
      <Link
        to='/profile'
        onClick={onNavigate}
        className='flex items-center max-md:w-full max-md:gap-2 max-md:rounded-lg max-md:px-3 max-md:py-2 max-md:hover:bg-gray-100 max-md:dark:hover:bg-gray-800'
      >
        <span className='flex h-9 w-9 items-center justify-center'>
          <CircleUser />
        </span>
        <span className='hidden text-sm max-md:inline'>Profile</span>
      </Link>
      <Link to='/signup' className='max-md:w-full' onClick={onNavigate}>
        <button className='px-4 py-2 max-md:w-full max-md:rounded-lg bg-[var(--accent-bold)] text-white transition-colors hover:bg-gray-500 dark:hover:bg-gray-800'>
          Sign Up
        </button>
      </Link>
      <Link to='/login' className='max-md:w-full' onClick={onNavigate}>
        <button className='px-4 py-2 max-md:w-full max-md:rounded-lg bg-[var(--accent-bg)] text-[var(--text)] transition-colors hover:bg-gray-100 dark:hover:bg-gray-800'>
          Log In
        </button>
      </Link>
    </>
  );
}
