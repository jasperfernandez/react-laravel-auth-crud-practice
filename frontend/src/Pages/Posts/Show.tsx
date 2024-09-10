import { useEffect, useState, useCallback, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Post } from '../Home';
import { AppContext } from '../../Context/AppContext';

export default function Show() {
  const { id } = useParams();
  const { user } = useContext(AppContext);
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  const getPost = useCallback(async () => {
    setLoading(true);
    const res = await fetch(`/api/posts/${id}`);
    const data = await res.json();

    if (res.ok) {
      setPost(data);
    }
    setLoading(false);
  }, [id]);

  useEffect(() => {
    getPost();
  }, [getPost]);

  if (loading) {
    return (
      <>
        <h1 className='title'>Showing post</h1>
        <div className='border-slate-400 border p-4 rounded-md border-dashed mt-6 '>
          <div className='animate-pulse space-y-2'>
            <div className='h-10 bg-slate-200 rounded-md w-64'></div>
            <div className='h-6 bg-slate-200 rounded-md w-52'></div>
            <div className='h-20 bg-slate-200 rounded-md'></div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {post ? (
        <>
          <h1 className='title'>Showing post</h1>
          <div className='border-slate-400 border p-4 rounded-md border-dashed mt-6'>
            <div className='mb-2'>
              <div>
                <h2 className='font-bold text-2xl'>{post.title}</h2>
                <small className='text-xs text-slate-600'>
                  Created by {post.user.name} on{' '}
                  {new Date(post.created_at).toLocaleTimeString()}
                </small>
              </div>
            </div>
            <div className='flex justify-between items-center'>
              <p>{post.body}</p>
              {user?.id !== post.user.id ? (
                ''
              ) : (
                <Link
                  to={`/posts/${post.id}/edit`}
                  className='text-white bg-green-700 h-1/2 py-1 px-2 rounded-md'
                >
                  Update
                </Link>
              )}
            </div>
          </div>
        </>
      ) : (
        <h1 className='title'>404 Page not found</h1>
      )}
    </>
  );
}
