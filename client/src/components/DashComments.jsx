import { useEffect, useState } from "react"
import { useSelector } from 'react-redux';
import { Table, TableBody, TableCell } from 'flowbite-react';
import { HiOutlineExclamationCircle } from 'react-icons/hi'
import { Modal, Button } from "flowbite-react";

export default function DashComments() {
    const {currentUser} = useSelector((state) => state.user);
    const [comments, setComments] = useState([]);
    const [showMore, setShowMore] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [commentIdToDelete , setCommentIdToDelete] = useState('');

    
    useEffect(() => {
        const fetchComments = async () => {
        try {
            const res = await fetch(`/api/comment/getcomments`);
            const data = await res.json();
            if(res.ok) {
                setComments(data.comments);
                if(data.comments.length < 9) {
                    setShowMore(false);
                }
            }
        } catch (error) {
            console.log(error);
        }
        }
        if(currentUser.vip) {
            fetchComments();
        }
    }, [currentUser._id, currentUser.vip]);

    const handleShowMore = async () => {
        const startIndex = comments.length;
        try {
            const res = await fetch(`/api/comment/getcomments?startIndex=${startIndex}`);
            const data = await res.json();
            if(res.ok) {
                setComments((prev) => [...prev, ...data.comments]);
                if(data.comments.length < 9) {
                    setShowMore(false)
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleDeleteComment = async () => {
        try {
            const res = await fetch(`/api/comment/deleteComment/${commentIdToDelete}`, {
                method: 'DELETE',
            });

            const data = await res.json();
            if(res.ok) {
                setComments((prev) => prev.filter((comment) => comment._id !==commentIdToDelete));
                setShowModal(false);
            } else {
                console.log(data.message);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
        {currentUser && comments.length > 0 ? (
            <>
            <Table hoverable className="shadow-md">
                <Table.Head>
                <Table.HeadCell>Дата оновлення</Table.HeadCell>
                <Table.HeadCell>Текст коментаря</Table.HeadCell>
                <Table.HeadCell>Кількість лайків</Table.HeadCell>
                <Table.HeadCell>ID посту</Table.HeadCell>
                <Table.HeadCell>ID користувача</Table.HeadCell>
                <Table.HeadCell>Видалити</Table.HeadCell>
                </Table.Head>
                {comments.map((comment) => (
                <TableBody className="divide-y" key={comment}>
                    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <TableCell>{new Date(comment.updatedAt).toLocaleDateString()}</TableCell>
                    <TableCell>
                        {comment.content}
                    </TableCell>
                    <TableCell>
                        {comment.numberOfLikes}
                    </TableCell>
                    <TableCell>{comment.postId}</TableCell>
                    <TableCell>{comment.userId}</TableCell>
                    <Table.Cell>
                        <span className="font-medium text-red-500 hover:underline cursor-pointer"
                            onClick={() => {
                                setShowModal(true)
                                setCommentIdToDelete(comment._id)
                            }}
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
            <p>Немає коментарів</p>
        )}
        <Modal show={showModal} onClose={() => setShowModal(false)} popup size='md'>
            <Modal.Header/>
            <Modal.Body>
            <div className='text-center'>
                <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto'/>
                <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>Чи бажаєте видалити цей коментар?</h3>
                <div className='flex justify-center gap-4'>
                <Button color='failure' onClick={handleDeleteComment}>Так, звісно!</Button>
                <Button color='gray' onClick={() => setShowModal(false)}>Ні, не бажаю.</Button>
                </div>  
            </div>
            </Modal.Body>
            </Modal>
        </div>
    )
}
