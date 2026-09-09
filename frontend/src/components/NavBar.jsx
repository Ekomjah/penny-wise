import { Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import { CircleUser, House } from 'lucide-react';

export default function NavBar() {
  return (
    <nav className="navbar grid grid-cols-3 p-4">
      <Link to="/" className="col-span-1 text-left">
        <House/>
      </Link>
      <Link to="/dashboard" className="text-xl font-bold col-span-1">
        Penny Wise
      </Link>
      <div className="auth-links flex gap-4 col-span-1 justify-end">
        <Link to="/profile"><CircleUser/></Link>
        <Link to="/signup">Sign Up</Link>
        <Link to="/login">Log In</Link>
      </div>
      <ThemeToggle />
    </nav>
  );
}
