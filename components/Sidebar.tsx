import React, { useState } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useGoogleLogin } from '@react-oauth/google';
import { AiFillHome, AiOutlineMenu } from 'react-icons/ai';
import { ImCancelCircle } from 'react-icons/im';

import Discover from './Discover';
import SuggestedAccounts from './SuggestedAccounts';
import Footer from './Footer';
import { createOrGetUser } from '../utils';
import useAuthStore from '../store/authStore';


const Sidebar = () => {

  const user = false;

  const { userProfile, addUser, removeUser } = useAuthStore();

  const [showSidebar, setShowSidebar] = useState(true);

  const normalLink = 'flex items-center gap-3 hover:bg-primary p-3 justify-center xl-justify-start cursor-pointer font-semibold text-[#F51997] rounded';

  const login = useGoogleLogin({
    onSuccess: response => createOrGetUser(response, addUser),
  });

  return (
    <div>
      <div className="block xl:hidden m-2 ml-4 mt-3 text-xl" 
        onClick={() => setShowSidebar((prev) => !prev)}
      >
        {showSidebar ? <ImCancelCircle /> : <AiOutlineMenu />}
      </div>
      {showSidebar && (
        <div className="xl:w-400 w-20 flex flex-col justify-start mb-10 border-r-2 border-gray-100 xl:border-0 p-3">
          <div className="xl:border-b-2 border-gray-200 xl:pb-4">
            <Link href="/">
              <div className={normalLink}>
                <p className="text-2xl">
                  <AiFillHome />
                </p>
                <span className="text-xl hidden xl:block">
                  For You
                </span>
              </div>
            </Link>
          </div>

          {!userProfile && (
            <div className='px-2 py-4 hidden xl:block'>
              <p className='text-gray-400'>Login to like and comment on videos</p>
              <div className="pr-4">
                <button className='cursor pointer bg-white text-lg text-[#F51997] border-[1px] border-[#F51997] font-semibold rounded-md px-6 py-3 outline-none w-full mt-3 hover:text-white hover:bg-[#F51997]' onClick={() => login()} >
                  Login
                </button>
              </div>
            </div>
          )}

          <Discover />
          <SuggestedAccounts />
          <Footer />
        </div>
      )}
    </div>
  )
}

export default Sidebar