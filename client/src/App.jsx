import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp";
import { Dashboard } from "./pages/Dashboard";
// import Footer from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";
import CreatePost from "./pages/CreatePost";
import UpdatePost from "./pages/UpdatePost";
import PostPage from './pages/PostPage'
import VipPrivateRoute from "./components/VipPrivateRoute";
import ScrollToTop from "./components/ScrollToTop";
import Search from "./pages/Search";
import MainChat from "./pages/MainChat";



export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop/>
      <Header/>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/about" element={<About />}/>
        <Route path="/sign-in" element={<SignIn />}/>
        <Route path="/sign-up" element={<SignUp />}/>
        <Route path="/search" element={<Search />}/>
        <Route element={<PrivateRoute/>}>
          <Route path="/dashboard" element={<Dashboard />}/>
          <Route path="/main-chat" element={<MainChat />}/>
        </Route>
        <Route element={<PrivateRoute/>}>
          <Route path="/create-post" element={<CreatePost />}/>
          <Route path="/update-post/:postId" element={<UpdatePost />}/>
        </Route>
        <Route element={<VipPrivateRoute/>}>
          <Route path="/dashboard?tab=allposts" element={<Dashboard />}/>
          <Route path="/dashboard?tab=users" element={<Dashboard />}/>
        </Route>
        <Route path='/post/:postSlug' element={<PostPage />} />
      </Routes>
      {/* <Footer/> */}
    </BrowserRouter>
  )
}
