import { Button } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { HiOutlineLightBulb } from 'react-icons/hi';

export default function CallToAction() {
  return (
    <div className='flex border border-purple-500 p-6 justify-center items-center rounded-tl-3xl rounded-br-3xl flex-col sm:flex-row text-center gap-6'>
      
      <div className='flex-1 justify-center flex flex-col items-center sm:items-start sm:text-left'>
        
        <div className='flex items-center gap-2 mb-2'>
          <HiOutlineLightBulb className='text-3xl text-purple-500' />

          <h2 className='text-2xl font-semibold'>
            Have something valuable to share?
          </h2>
        </div>

        <p className='text-gray-500 my-2 max-w-xl'>
          Share your experiences, insights, resources, or lessons learned and
          help other students grow through your journey.
        </p>

        <Link to='/dashboard?tab=profile'>
          <Button
            className='mt-3 bg-gradient-to-r from-purple-500 via-purple-600 to-blue-500 text-white hover:bg-gradient-to-br focus:ring-4 focus:ring-purple-300 rounded-lg'
          >
            Share Your Experience
          </Button>
        </Link>

      </div>

      <div className='flex-1 flex justify-center'>
        <div className='text-7xl sm:text-8xl'>
          💡
        </div>
      </div>

    </div>
  );
}