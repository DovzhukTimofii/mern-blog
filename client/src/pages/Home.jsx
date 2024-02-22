/* eslint-disable react/no-unknown-property */
import { Link } from 'react-router-dom';
import { useEffect, useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Stars } from '@react-three/drei';
import { StudentHat } from "../../public/StudentHat";
import CallToAction from '../components/CallToAction';
import PostCard from '../components/PostCard';

export function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch('/api/post/getPosts');
      const data = await res.json();
      setPosts(data.posts);
    }
    fetchPosts();
  }, [])
  return (
    <div>
      <div className='flex flex-row relative h-screen '>
        <div className='absolute h-full w-full  hidden  lg:block'>
          <Canvas>
            <OrbitControls autoRotate={true} enableRotate={false} enablePan={false} enableZoom={false}/>
            <Stars distance={450000} sunPosition={[0, 1, 0]} inclination={0} azimuth={0.25}  />
          </Canvas>
        </div>
        
        <div className=' flex flex-row items-center p-7'>
          <div className='z-10 flexa flex-col gap-6 p-28 px-3 max-w-6xl mx-auto '>
            <h1 className='text-3xl font-bold pb-5 lg:text-6xl'>Ласкаво просимо до Optima Municipality </h1>
            <p className='text-gray-500  text-xs sm:text-sm'>
              Тут ви можете залишати свої прoблеми та едеї для втілення у системі навчання коледжу Optima.
            </p>
            <Link
              to='/search'
              className='text-xs sm:text-sm text-teal-500 font-bold hover:underline'
            >
              Показати усі пости
            </Link>
          </div>
          
          <Canvas className='z-10 h-[100px] hidden  lg:block'>
            {/* <ambientLight intensity={1.5}/> */}
            
            <camera bias={2} />
            <OrbitControls autoRotate={true} enableRotate={false} enablePan={false} enableZoom={false}/>
            <Suspense fallback={null}>
              <StudentHat position={[-1, -1, -2]}/>
            </Suspense>
            
            <Environment preset='sunset'/>
          </Canvas>
        </div>
      </div>
      <div className='p-3 bg-amber-100 dark:bg-slate-700'>
        <CallToAction />
      </div>

      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 py-7'>
        {posts && posts.length > 0 && (
          <div className='flex flex-col gap-6'>
            <h2 className='text-2xl font-semibold text-center'>Останні пости</h2>
            <div className='flex justify-center flex-wrap gap-4'>
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
            <Link
              to={'/search'}
              className='text-lg text-teal-500 hover:underline text-center'
            >
              Показати усі пости
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
