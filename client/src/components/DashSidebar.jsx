import React, { useEffect, useState } from 'react';
import { Sidebar, SidebarItems, SidebarItemGroup, SidebarItem } from 'flowbite-react';
import { HiArrowSmRight, HiChartPie } from 'react-icons/hi';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

export default function DashSidebar() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const [tab, setTab] = useState('');
  
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  return (
     <Sidebar className='w-full md:w-56'>
        <SidebarItems>
             <SidebarItemGroup>
                {/* FIX: Replaced wrapper <Link> with as={Link} directly on SidebarItem */}
                <SidebarItem 
                  as={Link} 
                  to='/dashboard?tab=profile' 
                  active={tab === 'profile'} 
                  icon={HiChartPie} 
                  label={'User'} 
                  labelColor='dark'
                > 
                    Profile
                </SidebarItem>
                <SidebarItem icon={HiArrowSmRight} className='cursor-pointer'> 
                    Sign Out
                </SidebarItem>
             </SidebarItemGroup>
        </SidebarItems>
     </Sidebar>
  )
}