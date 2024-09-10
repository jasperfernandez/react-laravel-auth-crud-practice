import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../Context/AppContext';

export default function Login() {
  const navigate = useNavigate();
  const { setToken, setUser } = useContext(AppContext);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({
    email: [],
    password: [],
    message: '',
  });

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const res = await fetch('/api/login', {
      method: 'post',
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (data.errors) {
      setErrors(data.errors);
    } else {
      localStorage.setItem('token', data.token);
      setToken(data.token); // Set the token in the AppContext
      setUser(data.user); // Set the user in the AppContext
      navigate('/');
    }
  }
  return (
    <>
      <h1 className='title'>Log in to your account</h1>{' '}
      <form onSubmit={handleLogin} className='w-1/2 mx-auto space-y-6'>
        <div>
          <input
            type='text'
            placeholder='Email'
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          {errors.email && <p className='error'>{errors.email[0]}</p>}
        </div>
        <div>
          <input
            type='password'
            placeholder='Password'
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
          {errors.password && <p className='error'>{errors.password[0]}</p>}
        </div>
        <button className='primary-btn'>Log In</button>
      </form>
    </>
  );
}
