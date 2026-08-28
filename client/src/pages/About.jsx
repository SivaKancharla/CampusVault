import React from 'react';
import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div className='min-h-screen'>
      <div className='max-w-4xl mx-auto px-3 py-12 flex flex-col gap-10'>
        
        {/* Heading */}
        <div className='text-center'>
          <h1 className='text-3xl sm:text-5xl font-bold mb-4'>
            About CampusVault
          </h1>

          <p className='text-gray-500 text-sm sm:text-base max-w-2xl mx-auto'>
            A platform built to bring together student knowledge, experiences,
            and valuable resources in one place.
          </p>
        </div>

        {/* What is CampusVault */}
        <div className='flex flex-col gap-3'>
          <h2 className='text-2xl font-semibold'>
            What is CampusVault?
          </h2>

          <p className='text-gray-500 leading-7'>
            CampusVault is a knowledge-sharing platform designed for students.
            It provides a space where users can discover useful information,
            learn from the experiences of others, and share their own knowledge
            with the community.
          </p>

          <p className='text-gray-500 leading-7'>
            From coding and academics to internships, placements, interview
            experiences, and online assessments, CampusVault aims to make
            valuable student experiences easier to discover and learn from.
          </p>
        </div>

        {/* Why CampusVault */}
        <div className='flex flex-col gap-3'>
          <h2 className='text-2xl font-semibold'>
            Why CampusVault?
          </h2>

          <p className='text-gray-500 leading-7'>
            Students often gain valuable knowledge through their personal
            experiences, but that information can be difficult for others to
            find. CampusVault helps bring those experiences together so that
            knowledge can be shared and benefit more students.
          </p>
        </div>

        {/* What You Can Explore */}
        <div>
          <h2 className='text-2xl font-semibold mb-5'>
            What can you explore?
          </h2>

          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
            
            <div className='border border-gray-300 dark:border-gray-600 rounded-lg p-5'>
              <h3 className='font-semibold text-lg mb-2'>
                Academics
              </h3>
              <p className='text-sm text-gray-500'>
                Study resources, learning tips, and academic experiences.
              </p>
            </div>

            <div className='border border-gray-300 dark:border-gray-600 rounded-lg p-5'>
              <h3 className='font-semibold text-lg mb-2'>
                Coding & Development
              </h3>
              <p className='text-sm text-gray-500'>
                Programming knowledge, development concepts, and technical
                experiences.
              </p>
            </div>

            <div className='border border-gray-300 dark:border-gray-600 rounded-lg p-5'>
              <h3 className='font-semibold text-lg mb-2'>
                Interview Experiences
              </h3>
              <p className='text-sm text-gray-500'>
                Learn from the interview journeys and experiences of other
                students.
              </p>
            </div>

            <div className='border border-gray-300 dark:border-gray-600 rounded-lg p-5'>
              <h3 className='font-semibold text-lg mb-2'>
                Online Assessments
              </h3>
              <p className='text-sm text-gray-500'>
                Discover OA experiences, preparation strategies, and useful
                insights.
              </p>
            </div>

          </div>
        </div>

        {/* Bottom Section */}
        <div className='text-center flex flex-col items-center gap-4 border-t border-gray-300 dark:border-gray-600 pt-10'>
          <h2 className='text-2xl font-semibold'>
            Explore and learn with CampusVault
          </h2>

          <p className='text-gray-500 max-w-xl'>
            Discover experiences, insights, and knowledge shared by students
            and explore everything CampusVault has to offer.
          </p>

          <Link
            to='/search'
            className='px-6 py-3 rounded-lg bg-purple-600 text-white font-semibold hover:bg-purple-700 transition'
          >
            Explore Posts
          </Link>
        </div>

      </div>
    </div>
  );
}