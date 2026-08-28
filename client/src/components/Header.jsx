import React from 'react';
import { Button, Navbar ,TextInput,NavbarCollapse,NavbarLink,NavbarToggle,Dropdown,Avatar,DropdownHeader,DropdownDivider,DropdownItem  } from 'flowbite-react'
import {Link,useLocation,useNavigate } from 'react-router-dom'
import { AiOutlineSearch } from 'react-icons/ai';
import { FaMoon,FaSun } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../redux/theme/themeSlice';
import { signoutSuccess } from '../redux/user/userSlice';
import { useEffect, useState } from 'react';

export default function Header() {
  const dispatch = useDispatch();
  const path=useLocation().pathname;
  const location = useLocation();
  const navigate = useNavigate();
  const { theme } = useSelector((state) => state.theme);
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const handleSignout = async () => {
    try {
      const res = await fetch(
        `/api/user/signout`,
        {
          method: 'POST',
        }
      );
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <Navbar className='border-b-2'>
      <Link to="/" className='self-center whitespace-nowrap 
      text-sm sm:text-xl font-semibold dark:text-white'>
        <span className='px-2 py-1 bg-gradient-to-r from-indigo-500
        via-purple-500 to-pink-500 rounded-lg text-white'>CampusVault</span>
      </Link>
      <form onSubmit={handleSubmit}>
        <TextInput 
        type='text'
        placeholder='Search Here'
        rightIcon={AiOutlineSearch} 
        className='hidden lg:inline'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        />
      </form>
      <Button className='w-16 h-10 lg:hidden' color='gray' pill>
        <AiOutlineSearch/>
      </Button>
      <div className='flex gap-2 md:order-2'>
        <Button
          className="hidden sm:inline-flex w-10 h-10 p-0 items-center justify-center"
          color="gray"
          pill
          onClick={() => dispatch(toggleTheme())}
        >
          {theme === 'light' ? <FaMoon /> : <FaSun />}
        </Button>
        {/* <Link to="/sign-in"> */}
            {currentUser ? (
              <Dropdown
                arrowIcon={false}
                inline
                label={
                  <Avatar
                    alt="user"
                    img={currentUser.profilePicture}
                    rounded
                  />
                }
              >
                <DropdownHeader>
                  <span className="block text-sm">@{currentUser.username}</span>
                  <span className="block text-sm font-medium truncate">
                    {currentUser.email}
                  </span>
                </DropdownHeader>

                <Link to="/dashboard?tab=profile">
                  <DropdownItem>Profile</DropdownItem>
                </Link>

                <DropdownDivider />

                <DropdownItem onClick={handleSignout}>Sign out</DropdownItem>
              </Dropdown>
            ) : (
              <Link to="/sign-in">
                <Button className='bg-gradient-to-r from-purple-500 to-blue-500' outline>
                  Sign In
                </Button>
              </Link>
            )}
        {/* </Link> */}
        <NavbarToggle/>
      </div>
      
        <NavbarCollapse>
            <NavbarLink active={path==="/"} as={'div'}>
                <Link to='/'>
                    Home
                </Link>
            </NavbarLink>
            <NavbarLink active={path==="/about"} as={'div'}>
                <Link to='/about'>
                    About
                </Link>
            </NavbarLink>
            <NavbarLink active={path==="/projects"} as={'div'}>
                <Link to='/projects'>
                    Projects
                </Link>
            </NavbarLink>
        </NavbarCollapse>
    </Navbar>
  )
}
