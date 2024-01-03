import { Link } from 'react-router-dom';
import DarkModeSwitcher from './DarkModeSwitcher';
import DropdownMessage from './DropdownMessage';
import DropdownNotification from './DropdownNotification';
import DropdownUser from './DropdownUser';
import React from 'react';

import icons from '../../../ultils/icon'

const {PiList} = icons
// import Logo from "../image/GroupWhite.svg";

const Header = ({setSidebarOpen, sidebarOpen}) => {
  return (
    <header className=" top-0 z-999 flex w-full bg-white drop-shadow-md ">
      <div className="flex flex-grow items-center justify-between py-4 px-4 shadow-2 md:px-6 2xl:px-11">
        <div className={`flex items-center gap-2 sm:gap-4 `}>
          {/* <!-- Hamburger Toggle BTN --> */}
          <button
            aria-controls="sidebar ss"
            onClick={(e) => {
              e.stopPropagation();
              setSidebarOpen(!sidebarOpen);
            }}
            className={` block rounded-sm border border-stroke bg-white p-1.5 shadow-sm dark:border-strokedark dark:bg-boxdark ${sidebarOpen ? 'hidden': ''} `}
          >
            <PiList/>
          </button>

          <Link className="block flex-shrink-0 lg:hidden" to="/">
            {/* <img src={Logo} alt="Logo" /> */}
          </Link>
        </div>

        <div></div>

        <div className="flex items-center gap-3 2xsm:gap-7">
          <ul className="flex items-center gap-2 2xsm:gap-4">
            {/* <!-- Dark Mode Toggler --> */}
            <DarkModeSwitcher />
            {/* <!-- Dark Mode Toggler --> */}

            {/* <!-- Notification Menu Area --> */}
            <DropdownNotification />
            {/* <!-- Notification Menu Area --> */}

            {/* <!-- Chat Notification Area --> */}
            <DropdownMessage />
            {/* <!-- Chat Notification Area --> */}
          </ul>

          {/* <!-- User Area --> */}
          <DropdownUser />
          {/* <!-- User Area --> */}
        </div>
      </div>
    </header>
  );
};

export default Header;
