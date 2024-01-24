import './App.css';
import Login from "./Components/Login/Login";
import {useEffect, useState} from "react";
import {Route, Routes, useNavigate} from "react-router-dom";
import Main from "./Components/Main/Main";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
export default function App() {
    const [loader, setLoader] = useState(true)
    //eslint-disable-next-line
    const [page, setPage] = useState('/')
    const [user, setUser] = useState('admin')
    const navigate = useNavigate()

    useEffect(() => {
        navigate(page.toLowerCase())
        // eslint-disable-next-line
    }, [page]);
    function userSet(item) {
        setUser(item)
    }
    function setLoading(status) {setLoader(status)}
    function pageSet(current) {setPage(current)}
    return (
        <>
            {!loader && <div className="loader"></div>}
            <Header/>
            <Routes>
                <Route path={'/'}  element={<Login setUser={(current) => userSet(current)} pageSet={(current) => pageSet(current)} setLoading={(current) => setLoading(current)} />}/>
                <Route path={'/main'} element={(page==='main') && <Main user={user}/>}/>
            </Routes>
            <Footer/>
        </>
    );
}







