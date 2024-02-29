import { Footer } from "flowbite-react";
import { Link } from "react-router-dom";
import { BsFacebook, BsInstagram } from "react-icons/bs";
// import MonoBankBar from "./MonoBankBar";
function FooterCom() {
    return (
        <Footer container className="border border-t-8 border-teal-500">
            <div className="w-full max-w-7xl mx-auto">
                <div className="grid w-full justify-between sm:flex md:grid-cols-1">
                    <div className="mt-5">
                        <Link translate='no' to="/" className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white">
                            <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-sky-500 to-green-500 rounded-lg text-white">Optima</span>
                            Municipality
                        </Link>
                    </div>
                    <div className="grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6">
                        <div>
                            <Footer.Title title="Інформація"/>
                            <Footer.LinkGroup col>
                                <Footer.Link href="https://b.optima-osvita.org/login/index.php" target="_blank" rel="noopener noreferrer">Головна сторінка Optima</Footer.Link>
                                <Footer.Link href="/about" target="_blank" rel="noopener noreferrer" >Про нас</Footer.Link>
                            </Footer.LinkGroup>
                        </div>
                        <div>
                            <Footer.Title title="Слідкуй за нами"/>
                            <Footer.LinkGroup col>
                                <Footer.Link href="https://github.com/DovzhukTimofii/mern-blog" target="_blank" rel="noopener noreferrer">Код проекту на Github</Footer.Link>
                                {/* <Footer.Link href="https://send.monobank.ua/jar/3BuKHwxwgY" target="_blank" rel="noopener noreferrer"><MonoBankBar/></Footer.Link>   */}
                            </Footer.LinkGroup>
                        </div>
                    </div>
                </div>
                <Footer.Divider/>
                <div className="w-full sm:flex sm:items-center sm:justify-between">
                    <Footer.Copyright href="#" by="Optima Municipality" year={new Date().getFullYear()}/>
                    <div className="flex gap-6 sm:mt-0 mt-4 sm:justify-center">
                        <Footer.Icon href="https://www.facebook.com/groups/235413530722535?locale=uk_UA" icon={BsFacebook}/>
                        <Footer.Icon href="https://www.instagram.com/optima.school/" icon={BsInstagram}/>
                    </div>
                </div>  
            </div>
        </Footer>
    )
            
        
}

export default FooterCom;