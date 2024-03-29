import { Sidebar } from 'flowbite-react'
import { HiUser, HiArrowSmRight, HiDocumentText, HiOutlineUserGroup, HiDocumentDuplicate, HiAnnotation, HiChartPie } from 'react-icons/hi'
import { useEffect, useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import { useSelector } from 'react-redux';
import { signOutSuccess } from "../redux/user/userSlice";
import { useDispatch } from 'react-redux';

export default function DashSidebar() {
  const location = useLocation();
  const dispatch = useDispatch();
  const [tab, setTab] = useState('');
  const {currentUser} = useSelector((state) => state.user);

  useEffect(() => {
      const urlParams = new URLSearchParams(location.search);
      const tabFormUrl = urlParams.get('tab');
      if(tabFormUrl) {
      setTab(tabFormUrl);
      }
  }, [location.search]);

  const handleSignout = async () => {
    try{
      const res = await fetch('/api/user/signout', {method: 'POST'});

      const data = await res.json();

      if(!res.ok) {
          console.log(data.message);
      } else {
          dispatch(signOutSuccess());
      }
    } catch (error) {
      console.log(error);
    }
  }  
  return (
    <Sidebar className='w-full md:w-56'>
      <Sidebar.Items>
        <Sidebar.ItemGroup className='flex flex-col gap-1'>
          <Link to='/dashboard?tab=profile'>
            <Sidebar.Item
              active={tab === 'profile'}
              icon={HiUser}
              label={currentUser.vip ? 'Адмін' : 'Користувач'}
              labelColor='dark'
              as="button"
            >
              Профіль
            </Sidebar.Item>
          </Link>
          {currentUser && currentUser.vip && (
            <Link to='/dashboard?tab=dash'>
              <Sidebar.Item active={tab === "dash" || !tab} icon={HiChartPie} as="div">
                Адмін Панель
              </Sidebar.Item>
            </Link>
          )}
          <Link to='/dashboard?tab=posts'>
            <Sidebar.Item active={tab === 'posts'} icon={HiDocumentText} as="div">
              Мої Публікації
            </Sidebar.Item>
          </Link>
          {currentUser.vip && (
            <Link to='/dashboard?tab=allposts'>
              <Sidebar.Item active={tab === 'allposts'} icon={HiDocumentDuplicate} as="div">
                Усі публікації 
              </Sidebar.Item>
            </Link>
          )}
          {currentUser.vip && (
            <Link to='/dashboard?tab=users'>
              <Sidebar.Item active={tab === 'users'} icon={HiOutlineUserGroup} as="div">
                Користувачі
              </Sidebar.Item>
            </Link>
          )}
          {currentUser.vip && (
            <Link to='/dashboard?tab=comments'>
              <Sidebar.Item active={tab === 'comments'} icon={HiAnnotation} as="div">
                Коментарі
              </Sidebar.Item>
            </Link>
          )}
          <Sidebar.Item onClick={handleSignout} icon={HiArrowSmRight} className='cursor-pointer'>
            Вийти з Профілю
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
