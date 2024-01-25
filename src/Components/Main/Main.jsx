import {Route, Routes, useNavigate} from "react-router-dom";
import Category from "./Category/Category";
import React, {useEffect, useState} from "react";
import Login from "./Login/Login";

export default function Main({setLoader}){
    let navigate = useNavigate()
    const [page, setPage] = useState('/')
    const [user, setUser] = useState('')

    if (user === 'admin' && window.innerHeight <= 845) {
        const wrapperElement = document.querySelector('#wrapper');
        wrapperElement.style.height = '130vh';
    }

    function userSet(item) {setUser(item)}
    function pageSet(current) {setPage(current)}

    useEffect(() => {
        navigate(page.toLowerCase())
        // eslint-disable-next-line
    }, [page]);

    return(
        <>
            <Routes>
                <Route path={'/'}  element={<Login setUser={(current) => userSet(current)} pageSet={(current) => pageSet(current)} setLoading={(current) => setLoader(current)} />}/>
                <Route path={'/main/*'} element={(page==='main') && <Category user={user}/>}/>
            </Routes>
        </>
    )
}