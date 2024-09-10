import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { Post } from '../Home';

export default function Show() {
  const { id } = useParams();
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
      <div className='border-slate-400 border p-4 rounded-md border-dashed mt-6 '>
        <div className='animate-pulse space-y-2'>
          <div className='h-10 bg-slate-200 rounded-md w-64'></div>
          <div className='h-6 bg-slate-200 rounded-md w-52'></div>
          <div className='h-20 bg-slate-200 rounded-md'></div>
        </div>
      </div>
    );
  }

  return (
    <>
      {post ? (
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
          <p>{post.body}</p>
        </div>
      ) : (
        <h1 className='title'>404 Page not found</h1>
      )}
    </>
  );
}
