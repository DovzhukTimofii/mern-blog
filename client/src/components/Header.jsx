import { Avatar, Button, Dropdown, Navbar, TextInput } from 'flowbite-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaMoon, FaSun } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../redux/theme/themeSlice';
import { FaCrown } from "react-icons/fa";
import { signOutSuccess } from "../redux/user/userSlice";
import { useEffect, useState } from 'react';


export function Header() {
    const path = useLocation().pathname;
    const location = useLocation();
    const navigate = useNavigate();
    const { currentUser } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const { theme } = useSelector((state) => state.theme);
    const [searchTerm, setSearchTerm] = useState('');
   

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const searchTermFromUrl = urlParams.get('searchTerm');
        if (searchTermFromUrl) {
          setSearchTerm(searchTermFromUrl);
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

    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            const urlParams = new URLSearchParams(location.search);
            urlParams.set('searchTerm', searchTerm);
            const searchQuery = urlParams.toString();
            navigate(`/search?${searchQuery}`);
        } catch (error) {
            console.log(error.message);
        }
    }


    return (
        <Navbar className="border-b-2">
            <Link translate='no' to="/" className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white">
                <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-sky-500 to-green-500 rounded-lg text-white">Optima</span>
                Municipality
            </Link>
            <form onSubmit={handleSubmit}>
                <TextInput className="hidden lg:inline" type="text" placeholder="Пошук..." rightIcon={AiOutlineSearch} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
            </form>
            <Button className="w-12 h-10 lg:hidden" color="gray" pill>
                <AiOutlineSearch/>
            </Button>
            <div className=" flex justify-between items-center gap-2 md:order-2">
                <Button className="w-12 h-10 hidden sm:inline" color="gray" pill onClick={() => dispatch(toggleTheme())}>
                    {theme === "light" ? <FaSun/> : <FaMoon/>}
                </Button>
                
                {currentUser ? (
                        <div className='flex flex-col justify-center items-center'>
                            {currentUser.vip && (<div><FaCrown className="w-3 h-3"/></div>)}
                            <Dropdown
                                arrowIcon={false}
                                inline
                                label={
                                    <Avatar alt='user' img={currentUser.profilePicture} rounded />
                                }
                            >
                                <Dropdown.Header>
                                    <span className='block text-sm'>@{currentUser.username}</span>
                                    <span className='block text-sm font-medium truncate'>{currentUser.email}</span>
                                </Dropdown.Header>
                                <Link to={'/dashboard?tab=profile'}>
                                    <Dropdown.Item>Профіль</Dropdown.Item>
                                </Link>
                                <Dropdown.Divider />
                                <Dropdown.Item onClick={handleSignout}>Вийти з профілю</Dropdown.Item>
                            </Dropdown>
                        </div>
                        
                    ) : (
                    <Link to='/sign-in'>
                        <Button gradientDuoTone='purpleToBlue' outline>
                        Sign In
                        </Button>
                    </Link>
                    )}
                <Navbar.Toggle/>
            </div>
            <Navbar.Collapse>
                <Navbar.Link active={path === "/"} as={'div'}>
                    <Link to="/">
                        Головна
                    </Link>
                </Navbar.Link>
                <Navbar.Link active={path === "/about"} as={'div'}>
                    <Link to="/about">
                        Про нас
                    </Link>
                </Navbar.Link>
                {currentUser && (
                    <Navbar.Link active={path === "/create-post"} as={'div'}>
                        <Link to={"/create-post"}>
                            Створити ідею
                        </Link>
                    </Navbar.Link>
                )}
            </Navbar.Collapse>
        </Navbar>
    )
}
