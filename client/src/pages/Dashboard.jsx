import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashSidebar from "../components/DashSidebar";
import DashProfile from "../components/DashProfile";
import DashPosts from "../components/DashPosts";
import DashAllPosts from "../components/DashAllPosts";
import { useSelector } from 'react-redux';
import DashUsers from "../components/DashUsers";

export function Dashboard() {
  const location = useLocation();
  const [tab, setTab] = useState('');
  const { currentUser } = useSelector((state) => state.user);
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFormUrl = urlParams.get('tab');
    if(tabFormUrl) {
      setTab(tabFormUrl);
    }
  }, [location.search]);

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className='md:w-56'>
        <DashSidebar />
      </div>
      {tab === 'profile' && <DashProfile />}
      {tab === 'posts' && <DashPosts/>}
      {currentUser.vip && tab === 'allposts' && <DashAllPosts/>}
      {currentUser.vip && tab === 'users' && <DashUsers/>}
    </div>
  );
}
