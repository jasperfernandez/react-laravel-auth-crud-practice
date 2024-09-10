import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export interface Post {
  id: number;
  title: string;
  body: string;
  user: {
    id: number;
    name: string;
    email: string;
  };

  created_at: string;
}
export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);

  async function getPosts() {
    const res = await fetch('/api/posts');
    const data = await res.json();

    if (res.ok) {
      setPosts(data);
    }
  }

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <>
      <h1 className='title'>Latest Posts</h1>
      <div className='space-y-6'>
        {posts.length !== 0 ? (
          posts.map((post) => (
            <div
              key={post.id}
              className='border-slate-400 border p-4 rounded-md border-dashed'
            >
              <div className='mb-2 flex justify-between'>
                <div>
                  <h2 className='font-bold text-2xl'>{post.title}</h2>
                  <small className='text-xs text-slate-600'>
                    Created by {post.user.name} on{' '}
                    {new Date(post.created_at).toLocaleTimeString()}
                  </small>
                </div>
                <Link
                  to={`/posts/${post.id}`}
                  className='text-white bg-slate-700 h-1/2 p-2 rounded-md'
                >
                  Read more
                </Link>
              </div>
              <p>{post.body}</p>
            </div>
          ))
        ) : (
          <p>No posts found</p>
        )}
      </div>
    </>
  );
}
