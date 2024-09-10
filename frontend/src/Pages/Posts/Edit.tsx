import { useEffect, useState, useCallback, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Post } from '../Home';
import { AppContext } from '../../Context/AppContext';

export default function Show() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token, user } = useContext(AppContext);
  const [post, setPost] = useState<Post | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    body: '',
  });
  const [errors, setErrors] = useState({
    title: [],
    body: [],
    message: '',
  });
  const [loading, setLoading] = useState(true);

  const getPost = useCallback(async () => {
    setLoading(true);
    const res = await fetch(`/api/posts/${id}`);
    const data = await res.json();

    if (res.ok) {
      setPost(data);
      setFormData(data);
    }
    setLoading(false);
  }, [id]);

  async function handleEditPost(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const res = await fetch(`/api/posts/${id}`, {
      method: 'put',
      body: JSON.stringify(formData),
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    console.log(data);

    if (data.errors) {
      setErrors(data.errors);
    } else if (!res.ok) {
      // setErrors({ ...errors, message: data.message });
      navigate(`/posts/${post?.id}`);
    } else {
      navigate(`/posts/${post?.id}`);
    }
  }

  useEffect(() => {
    getPost();
  }, [getPost]);

  useEffect(() => {
    if (post && user && post.user.id !== user.id) {
      navigate(`/posts/${post.id}`);
    }
  }, [post, user, navigate]);

  if (loading) {
    return (
      <>
        <h1 className='title'>Edit post</h1>
        <div className='w-1/2 mx-auto mt-6 '>
          <div className='animate-pulse space-y-6'>
            <div className='h-10 bg-slate-200 rounded-md'></div>
            <div className='h-48 bg-slate-200 rounded-md'></div>
            <div className='h-10 bg-slate-200 rounded-md'></div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {post ? (
        <>
          <h1 className='title'>Edit post</h1>
          {errors.message && <span className='error'>{errors.message}</span>}
          <form onSubmit={handleEditPost} className='w-1/2 mx-auto space-y-6'>
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
                onChange={(e) =>
                  setFormData({ ...formData, body: e.target.value })
                }
              />
              {errors.body && <span className='error'>{errors.body[0]}</span>}
            </div>

            <button className='primary-btn'>Update</button>
          </form>
        </>
      ) : (
        <h1 className='title'>404 Page not found</h1>
      )}
    </>
  );
}
