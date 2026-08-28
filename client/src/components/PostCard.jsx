import { Link } from 'react-router-dom';

export default function PostCard({ post }) {
  return (
    <div className='group relative flex w-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:border-teal-400 hover:shadow-xl dark:border-gray-700 dark:bg-gray-800'>
      
      {post.image !== 'NA' && (
        <Link
          to={`/post/${post.slug}`}
          className='overflow-hidden'
        >
          <img
            src={post.image}
            alt={post.title}
            className='h-52 w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105'
          />
        </Link>
      )}

      <div className='flex flex-1 flex-col gap-3 p-5'>
        
        <p className='line-clamp-2 text-lg font-semibold text-gray-900 transition-colors duration-300 group-hover:text-teal-600 dark:text-white dark:group-hover:text-teal-400'>
          {post.title}
        </p>

        <span className='text-sm font-medium text-gray-500 dark:text-gray-400'>
          {post.category}
        </span>

        <Link
          to={`/post/${post.slug}`}
          className='mt-auto rounded-lg border border-teal-500 py-2 text-center text-sm font-medium text-teal-500 transition-all duration-300 hover:bg-teal-500 hover:text-white'
        >
          Read article →
        </Link>

      </div>
    </div>
  );
}