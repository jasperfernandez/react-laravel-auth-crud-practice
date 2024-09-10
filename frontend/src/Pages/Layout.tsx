import { Link, Outlet, useNavigate } from 'react-router-dom';
import { AppContext } from '../Context/AppContext';
import { useContext } from 'react';

export default function Layout() {
  const navigate = useNavigate();
  const { user, token, setUser, setToken } = useContext(AppContext);

  async function handleLogout(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const res = await fetch('/api/logout', {
      method: 'post',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // const data = await res.json();
    // console.log(data);

    if (res.ok) {
      setUser(null);
      setToken(null);
      localStorage.removeItem('token');
      navigate('/');
    }
  }

  return (
    <>
      <header>
        <nav>
          <Link to='/' className='nav-link'>
            Home
          </Link>
          {user ? (
            <div className='space-x-4 text-slate-50 flex items-center'>
              <span>{user.name}</span>
              <Link to='/posts/create' className='nav-link'>
                New Post
              </Link>
              <form onSubmit={handleLogout}>
                <button className='nav-link'>Log Out</button>
              </form>
            </div>
          ) : (
            <div className='space-x-4'>
              <Link to='/register' className='nav-link'>
                Register
              </Link>
              <Link to='/login' className='nav-link'>
                Log In
              </Link>
            </div>
          )}
        </nav>
      </header>

      <main>
        <Outlet />
      </main>
    </>
  );
}
