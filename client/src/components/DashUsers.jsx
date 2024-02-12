import { useEffect, useState } from "react"
import { useSelector } from 'react-redux';
import { Table, TableBody, TableCell } from 'flowbite-react';
import { HiOutlineExclamationCircle } from 'react-icons/hi'
import { Modal, Button } from "flowbite-react";
import { FaCheck, FaTimes } from "react-icons/fa"

export default function DashUsers() {
    const textOfUsername = "Ім'я"
    const {currentUser} = useSelector((state) => state.user);
    const [users, setUsers] = useState([]);
    const [showMore, setShowMore] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [userIdToDelete ,setUserIdToDelete] = useState('');

    
    useEffect(() => {
        const fetchUsers = async () => {
        try {
            const res = await fetch(`/api/user/getusers`);
            const data = await res.json();
            if(res.ok) {
                setUsers(data.users);
                if(data.users.length < 9) {
                    setShowMore(false);
                }
            }
        } catch (error) {
            console.log(error);
        }
        }
        if(currentUser.vip) {
            fetchUsers();
        }
    }, [currentUser._id, currentUser.vip]);

    const handleShowMore = async () => {
        const startIndex = users.length;
        try {
            const res = await fetch(`/api/user/getusers?startIndex=${startIndex}`);
            const data = await res.json();
            if(res.ok) {
                setUsers((prev) => [...prev, ...data.users]);
                if(data.users.length < 9) {
                    setShowMore(false)
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleDeleteUser = async () => {
        try {
            const res = await fetch(`/api/user/delete/${userIdToDelete}`, {
                method: 'DELETE',
            });

            const data = await res.json();
            if(res.ok) {
                setUsers((prev) => prev.filter((user) => user._id !== userIdToDelete));
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
        {currentUser && users.length > 0 ? (
            <>
            <Table hoverable className="shadow-md">
                <Table.Head>
                <Table.HeadCell>Дата створення</Table.HeadCell>
                <Table.HeadCell>Зображення користувача</Table.HeadCell>
                <Table.HeadCell>{textOfUsername}</Table.HeadCell>
                <Table.HeadCell>Пошта</Table.HeadCell>
                <Table.HeadCell>Адмін</Table.HeadCell>
                <Table.HeadCell>Видалити</Table.HeadCell>
                </Table.Head>
                {users.map((user) => (
                <TableBody className="divide-y" key={user}>
                    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell>
                        <img src={user.profilePicture} alt={user.username} className="w-10 h-10 object-cover rounded-full bg-gray-500"/>
                    </TableCell>
                    <TableCell>
                        {user.username}
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.vip ? (<FaCheck className="text-green-500"/>) : (<FaTimes className="text-red-500"/>)}</TableCell>
                    {user.vip ? (
                        <Table.Cell>
                            <span className="font-medium text-gray-500"
                            >Видалити</span>
                        </Table.Cell>
                    ) : (
                        <Table.Cell>
                            <span className="font-medium text-red-500 hover:underline cursor-pointer"
                                onClick={() => {
                                setShowModal(true)
                                setUserIdToDelete(user._id)}}
                            >Видалити</span>
                        </Table.Cell>
                    )}
                    
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
            <p>Немає користувачів</p>
        )}
        <Modal show={showModal} onClose={() => setShowModal(false)} popup size='md'>
            <Modal.Header/>
            <Modal.Body>
            <div className='text-center'>
                <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto'/>
                <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>Чи бажаєте видалити цього користувача ?</h3>
                <div className='flex justify-center gap-4'>
                <Button color='failure' onClick={handleDeleteUser}>Так, звісно!</Button>
                <Button color='gray' onClick={() => setShowModal(false)}>Ні, не бажаю.</Button>
                </div>  
            </div>
            </Modal.Body>
            </Modal>
        </div>
    )
}
