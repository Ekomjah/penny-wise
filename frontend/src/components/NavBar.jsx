import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BookOpen, CircleUser, House, LogOut, Menu } from 'lucide-react';
import Dollar from '../assets/dollar.png';
import ThemeToggle from './ThemeToggle';
import { useAuth } from '../lib/useAuth';
import { cn } from '../utils/utils';

function MenuElements({ onNavigate = () => {} }) {
  const { auth, signOut } = useAuth();
  const navigate = useNavigate();
  const closeMenu = () => onNavigate?.();
  const isLearner = auth?.user?.role === 'learner';

  return (
    <>
      <ThemeToggle
        label='Change Theme'
        className='max-md:w-full max-md:justify-start max-md:gap-2 max-md:rounded-lg max-md:px-3 max-md:hover:bg-gray-100 max-md:dark:hover:bg-gray-800'
      />
      <Link
        to='/courses'
        onClick={closeMenu}
        className='flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-[var(--text-h)] transition hover:bg-gray-100 dark:hover:bg-gray-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] max-md:w-full'
      >
        <BookOpen aria-hidden='true' size={18} />
        Courses
      </Link>
      {auth ? (
        <>
          {isLearner && (
            <Link
              to='/dashboard'
              onClick={closeMenu}
              className='flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-[var(--text-h)] transition hover:bg-gray-100 dark:hover:bg-gray-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] max-md:w-full'
            >
              <House aria-hidden='true' size={18} />
              Dashboard
            </Link>
          )}
          <Link
            to='/profile'
            onClick={closeMenu}
            className='flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-[var(--text-h)] transition hover:bg-gray-100 dark:hover:bg-gray-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] max-md:w-full'
          >
            <span className='flex h-7 w-7 items-center justify-center'>
              {auth.user?.avatar ? (
                <img
                  src={auth.user.avatar}
                  alt=''
                  className='h-6 w-6 rounded-full object-cover'
                />
              ) : (
                <CircleUser aria-hidden='true' size={20} />
              )}
            </span>
            Profile
          </Link>
          <button
            type='button'
            onClick={() => {
              signOut();
              navigate('/');
              closeMenu();
            }}
            className='flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-[var(--text-h)] transition hover:bg-gray-100 dark:hover:bg-gray-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] max-md:w-full'
          >
            <LogOut aria-hidden='true' size={18} />
            Log Out
          </button>
        </>
      ) : (
        <>
          <Link
            to='/signup'
            onClick={closeMenu}
            className='rounded-lg bg-[var(--accent-bold)] px-4 py-2 text-center text-sm font-semibold text-white transition hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] max-md:w-full'
          >
            Sign Up
          </Link>
          <Link
            to='/login'
            onClick={closeMenu}
            className='rounded-lg bg-[var(--accent-bg)] px-4 py-2 text-center text-sm font-semibold text-[var(--text-h)] transition hover:bg-gray-100 dark:hover:bg-gray-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] max-md:w-full'
          >
            Log In
          </Link>
        </>
      )}
    </>
  );
}

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [dollarLoaded, setDollarLoaded] = useState(false);
  const [dollarFailed, setDollarFailed] = useState(false);
  const { auth } = useAuth();

  return (
    <nav className='navbar fixed top-0 left-0 right-0 z-20 mx-auto flex w-full max-w-4xl items-center justify-between border-b border-[var(--nav-border)] bg-[var(--nav-bg)] px-6 py-4 shadow-[var(--nav-shadow)] backdrop-blur-md backdrop-saturate-150 md:mt-2 md:rounded-full'>
      <Link
        to='/'
        aria-label='Penny Wise home'
        className='relative flex h-9 w-9 items-center justify-center rounded-full transition hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] dark:hover:bg-gray-800'
      >
        <House aria-hidden='true' />
      </Link>
      <Link
        to={auth?.user?.role === 'learner' ? '/dashboard' : '/'}
        className='absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center gap-2 whitespace-nowrap text-xl font-bold focus-visible:rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]'
      >
        <span className='relative block h-10 w-10 shrink-0'>
          <span
            aria-hidden='true'
            className='absolute inset-0 flex items-center justify-center text-2xl font-black leading-none'
          >
            $
          </span>
          {!dollarFailed && (
            <img
              src={Dollar}
              alt=''
              width={40}
              height={40}
              decoding='async'
              onLoad={() => setDollarLoaded(true)}
              onError={() => setDollarFailed(true)}
              className={`absolute inset-0 h-full w-full object-contain transition-opacity duration-200 ${
                dollarLoaded ? 'opacity-100' : 'opacity-0'
              }`}
            />
          )}
        </span>
        <span className='leading-none'>Penny Wise</span>
      </Link>
      <div className='relative z-10 hidden items-center justify-end gap-4 md:flex'>
        <MenuElements />
      </div>
      <button
        aria-label='Toggle navigation menu'
        aria-expanded={isOpen}
        type='button'
        className='flex h-9 w-9 items-center justify-center rounded-full transition hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] dark:hover:bg-gray-800 md:hidden'
        onClick={() => setIsOpen((open) => !open)}
      >
        <Menu aria-hidden='true' />
      </button>
      <div
        className={cn(
          'absolute top-full left-0 right-0 flex flex-col items-stretch gap-2 border-b border-[var(--border)] bg-[var(--bg)] p-5 shadow-[var(--nav-shadow)] md:hidden',
          isOpen ? '' : 'hidden',
        )}
      >
        <MenuElements onNavigate={() => setIsOpen(false)} />
      </div>
    </nav>
  );
}
