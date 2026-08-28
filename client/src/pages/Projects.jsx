import React from 'react';
import { Link } from 'react-router-dom';

export default function Projects() {
  return (
    <div className='min-h-screen'>
      <div className='max-w-4xl mx-auto px-3 py-12 flex flex-col gap-8'>

        {/* Heading */}
        <div className='text-center'>
          <h1 className='text-3xl sm:text-5xl font-bold mb-4'>
            Explore CampusVault
          </h1>

          <p className='text-gray-500 text-sm sm:text-base max-w-2xl mx-auto'>
            Discover valuable knowledge, experiences, and insights shared by
            students. Explore content that can help you learn, prepare, and
            grow throughout your college journey.
          </p>
        </div>

        {/* Categories */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>

          <div className='border border-gray-300 dark:border-gray-600 rounded-lg p-5'>
            <h2 className='text-xl font-semibold mb-2'>
              Academics
            </h2>
            <p className='text-sm text-gray-500'>
              Notes, study tips, learning resources, and academic experiences.
            </p>
          </div>

          <div className='border border-gray-300 dark:border-gray-600 rounded-lg p-5'>
            <h2 className='text-xl font-semibold mb-2'>
              Coding & Development
            </h2>
            <p className='text-sm text-gray-500'>
              Programming, web development, projects, and technical knowledge.
            </p>
          </div>

          <div className='border border-gray-300 dark:border-gray-600 rounded-lg p-5'>
            <h2 className='text-xl font-semibold mb-2'>
              Interview Experiences
            </h2>
            <p className='text-sm text-gray-500'>
              Learn from interview experiences and preparation journeys.
            </p>
          </div>

          <div className='border border-gray-300 dark:border-gray-600 rounded-lg p-5'>
            <h2 className='text-xl font-semibold mb-2'>
              Online Assessments
            </h2>
            <p className='text-sm text-gray-500'>
              OA experiences, questions, preparation strategies, and insights.
            </p>
          </div>

          <div className='border border-gray-300 dark:border-gray-600 rounded-lg p-5'>
            <h2 className='text-xl font-semibold mb-2'>
              Internships & Placements
            </h2>
            <p className='text-sm text-gray-500'>
              Resources and experiences to help you prepare for your career.
            </p>
          </div>

          <div className='border border-gray-300 dark:border-gray-600 rounded-lg p-5'>
            <h2 className='text-xl font-semibold mb-2'>
              Campus Life
            </h2>
            <p className='text-sm text-gray-500'>
              Experiences, opportunities, events, and everything around college
              life.
            </p>
          </div>

        </div>

        {/* Explore Button */}
        <div className='flex justify-center'>
          <Link
            to='/search'
            className='px-6 py-3 rounded-lg bg-purple-600 text-white font-semibold hover:bg-purple-700 transition'
          >
            Explore All Posts
          </Link>
        </div>

      </div>
    </div>
  );
}