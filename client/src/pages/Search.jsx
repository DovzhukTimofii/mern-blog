import { Button, Select, TextInput } from "flowbite-react"
import { useEffect, useState } from "react"
import { useNavigate }  from 'react-router-dom';
import PostCard from "../components/PostCard"
export default function Search() {
    const navigate = useNavigate();
    const [sidebarData, setSidebarData] = useState({
        searchTerm: "",
        sort: "desc",
        category: "без категорії",
    });
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showMore, setShowMore] = useState(false);

    console.log(sidebarData)
    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const searchTermFromUrl = urlParams.get("searchTerm");
        const sortFromUrl = urlParams.get("sort");
        const categoryFromUrl = urlParams.get("category");
        if(searchTermFromUrl || sortFromUrl || categoryFromUrl) {
            setSidebarData({
                ...sidebarData,
                searchTerm: searchTermFromUrl,
                sort: sortFromUrl,
                category: categoryFromUrl,
            })
        }

        const fetchPosts = async () => {
            setLoading(true);
            const searchQuery = urlParams.toString();
            const res = await fetch(`/api/post/getposts?${searchQuery}`);
            if(!res.ok) {
                setLoading(false);
                return;
            }
            if(res.ok) {
                const data = await res.json();
                setPosts(data.posts);
                if(data.posts.length === 9) {
                    setShowMore(true);
                } else {
                    setShowMore(false);
                }
                setLoading(false);
            }
        }
        fetchPosts();
    }, [location.search]);

    const handleChange = (e) => {
        if(e.target.id === 'searchTerm') {
            setSidebarData({
                ...sidebarData,
                searchTerm: e.target.value
            })
        }

        if(e.target.id === 'sort') {
            const order = e.target.value || 'desc';
            setSidebarData({
                ...sidebarData,
                sort: order
            })
        }

        if(e.target.id === 'category') {
            const category = e.target.value || 'без категорії';
            setSidebarData({
                ...sidebarData,
                category
            })
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams(location.search);
        urlParams.set('searchTerm', sidebarData.searchTerm);
        urlParams.set('sort', sidebarData.sort);
        urlParams.set('category', sidebarData.category);
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`);
    };

    const handleShowMore = async () => {
        const numberOfPosts = posts.length;
        const startIndex = numberOfPosts;
        const urlParams = new URLSearchParams(location.search);
        urlParams.set('startIndex', startIndex);
        const searchQuery = urlParams.toString();
        const res = await fetch(`/api/post/getposts?${searchQuery}`);
        if (!res.ok) {
          return;
        }
        if (res.ok) {
          const data = await res.json();
          setPosts([...posts, ...data.posts]);
          if (data.posts.length === 9) {
            setShowMore(true);
          } else {
            setShowMore(false);
          }
        }
    };
    return (
        <div className="flex flex-col md:flex-row">
            <div className="p-7 border-b md:border-r md:min-h-screen border-gray-500">
                <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
                    <div className="flex items-center gap-2">
                        <label className="whitespace-nowrap font-semibold">Пошукові запити:</label>
                        <TextInput placeholder="Пошук..." id="searchTerm" type="text" value={sidebarData.searchTerm} onChange={handleChange}/>

                    </div>
                    <div className="flex items-center gap-2">
                        <label className="font-semibold">Сортування:</label>
                        <Select onChange={handleChange} value={sidebarData.sort} id="sort">
                            <option value="desc">Найновіші</option>
                            <option value="asc">Найдавніші</option>
                        </Select>
                    </div>
                    <div className="flex items-center gap-2">
                        <label className="font-semibold">Катеорія:</label>
                        <Select onChange={handleChange} value={sidebarData.category} id="category">
                            <option value='без категорії'>Без категорії</option>
                            <option value='ідея'>Ідея</option>
                            <option value='проблема'>Проблема</option>
                            <option value='волонтерство'>Волонтерство</option>
                            <option value='іншe'>Iнше</option>
                        </Select>
                    </div>
                    <Button type="submite" outline gradientDuoTone="purpleToBlue">
                        Застосувати зміни
                    </Button>
                </form>
            </div>
            <div className="w-full">
                <h1 className="text-3xl font-semibold sm:border-b border-gray-500 p-3 p-5">Резултати пошуку:</h1>
                <div className="p-7 flex flex-wrap  gap-4">
                    {!loading && posts.length === 0 && (
                        <p className="text-xl text-gray-500">
                            не знайдено жодних постів
                        </p>
                    )}
                    {loading && <p className="text-xl text-gray-500">Завантаження...</p>}
                    {!loading && posts && posts.map((post) => (
                        <PostCard key={post._id} post={post}/>
                    ))}
                    {showMore && (
                        <button onClick={handleShowMore} className="text-teal-500 text-lg hover:underline p-7 w-full">
                            Показати більше
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}
