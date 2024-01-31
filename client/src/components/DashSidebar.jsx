import { Sidebar } from 'flowbite-react'
import { HiUser, HiArrowSmRight } from 'react-icons/hi'
import { useEffect, useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import { useSelector } from 'react-redux';

export default function DashSidebar() {
    const location = useLocation();
    const [tab, setTab] = useState('');
    const {currentUser} = useSelector((state) => state.user);

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const tabFormUrl = urlParams.get('tab');
        if(tabFormUrl) {
        setTab(tabFormUrl);
        }
    }, [location.search]);
    return (
        <Sidebar className='w-full md:w-56'>
          <Sidebar.Items>
            <Sidebar.ItemGroup>
              <Link to='/dashboard?tab=profile'>
                <Sidebar.Item
                  active={tab === 'profile'}
                  icon={HiUser}
                  label={currentUser.vip ? 'VIP' : 'Користувач'}
                  labelColor='dark'
                  as="button"
                >
                  Профіль
                </Sidebar.Item>
              </Link>
              <Sidebar.Item icon={HiArrowSmRight} className='cursor-pointer'>
                Вийти з Профілю
              </Sidebar.Item>
            </Sidebar.ItemGroup>
          </Sidebar.Items>
        </Sidebar>
      );
}
