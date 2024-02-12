import { useEffect, useState } from "react"
import { useSelector } from 'react-redux';
import { Table, TableBody, TableCell } from 'flowbite-react';
import { Link } from "react-router-dom";
import { HiOutlineExclamationCircle } from 'react-icons/hi'
import { Modal, Button } from "flowbite-react";

export default function DashAllPosts() {
  const {currentUser} = useSelector((state) => state.user);
  const [userPosts, setUserPosts] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [postIdToDelete ,setPostIdToDelete] = useState('');

  
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`/api/post/getposts`);
        const data = await res.json();
        if(res.ok) {
          setUserPosts(data.posts);
          if(data.posts.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchPosts();
    if(currentUser) {
      fetchPosts();
    }
  }, [currentUser._id]);

  const handleShowMore = async () => {
    const startIndex = userPosts.length;
    try {
      const res = await fetch(`/api/post/getposts?userId=${currentUser._id}&startIndex=${startIndex}`);
      const data = await res.json();
      if(res.ok) {
        setUserPosts((prev) => [...prev, ...data.posts]);
        if(data.posts.length < 9) {
          setShowMore(false)
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleDeletePost = async () => {
    setShowModal(false); //
    try {
      const res = await fetch(`/api/post/deletepost/${postIdToDelete}/${currentUser._id}`, {
        method: 'DELETE',
      });

      const data = await res.json();

      if (!res.ok) {
        console.log(data.message);
      } else {
        setUserPosts((prev) => prev.filter((post) => post._id !== postIdToDelete));
      }
    } catch(error) {
      console.log(error.message);
    }
  }

  return (
    <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
      {currentUser && userPosts.length > 0 ? (
        <>
          <Table hoverable className="shadow-md">
            <Table.Head>
              <Table.HeadCell>Оновлені данні</Table.HeadCell>
              <Table.HeadCell>Зображення поста</Table.HeadCell>
              <Table.HeadCell>Назва поста</Table.HeadCell>
              <Table.HeadCell>Категорія</Table.HeadCell>
              <Table.HeadCell>Видалити</Table.HeadCell>
            </Table.Head>
            {userPosts.map((post) => (
              <TableBody className="divide-y" key={post}>
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <TableCell>{new Date(post.updatedAt).toLocaleDateString()}</TableCell>
                  <TableCell to={`/post/${post.slug}`}>
                    <img src={post.image} alt={post.title} className="w-20 h-10 object-cover bg-gray-500"/>
                  </TableCell>
                  <TableCell to={`/post/${post.slug}`}>
                    <Link className="font-medium text-gray-900 dark:text-white" to={`/post/${post.slug}`}>
                      {post.title}
                    </Link>
                  </TableCell>
                  <TableCell>{post.category}</TableCell>
                  <Table.Cell>
                      <span className="font-medium text-red-500 hover:underline cursor-pointer"
                        onClick={() => {
                        setShowModal(true)
                        setPostIdToDelete(post._id)}}
                      >Видалити</span>
                  </Table.Cell>
                </Table.Row>
              </TableBody>
            ))}
          </Table>
          {showMore && (
            <button onClick={handleShowMore} className="w-full text-teal-500 self-center text-sm p-7">
              Побачити більше
            </button>
          )}
        </>
      ) : (
        <p>Немає постів</p>
      )}
      <Modal show={showModal} onClose={() => setShowModal(false)} popup size='md'>
        <Modal.Header/>
        <Modal.Body>
          <div className='text-center'>
            <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto'/>
            <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>Чи бажаєте видалити цей пост ?</h3>
            <div className='flex justify-center gap-4'>
              <Button color='failure' onClick={handleDeletePost}>Так, звісно!</Button>
              <Button color='gray' onClick={() => setShowModal(false)}>Ні, не бажаю.</Button>
            </div>  
          </div>
        </Modal.Body>
        </Modal>
    </div>
  )
}
