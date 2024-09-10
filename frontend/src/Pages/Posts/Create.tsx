import { useContext, useState } from 'react';
import { AppContext } from '../../Context/AppContext';
import { useNavigate } from 'react-router-dom';

export default function Create() {
  const navigate = useNavigate();
  const { token } = useContext(AppContext);
  const [formData, setFormData] = useState({
    title: '',
    body: '',
  });
  const [errors, setErrors] = useState({
    title: [],
    body: [],
    message: '',
  });

  async function handleCreatePost(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const res = await fetch('/api/posts', {
      method: 'post',
      body: JSON.stringify(formData),
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    if (data.errors) {
      setErrors(data.errors);
    } else {
      navigate('/');
    }
  }

  return (
    <>
      <h1 className='title'>Create a new post</h1>
      {errors.message && <span className='error'>{errors.message}</span>}
      <form onSubmit={handleCreatePost} className='w-1/2 mx-auto space-y-6'>
        <div>
          <input
            type='text'
            placeholder='Title'
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
          {errors.title && <span className='error'>{errors.title[0]}</span>}
        </div>

        <div>
          <textarea
            rows={6}
            placeholder='Write your body here'
            value={formData.body}
            onChange={(e) => setFormData({ ...formData, body: e.target.value })}
          />
          {errors.title && <span className='error'>{errors.title[0]}</span>}
        </div>

        <button className='primary-btn'>Create</button>
      </form>
    </>
  );
}
