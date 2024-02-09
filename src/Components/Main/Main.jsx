import {Route, Routes, useNavigate} from "react-router-dom";
import Category from "./Category/Category";
import React, {useEffect, useState} from "react";
import Login from "./Login/Login";
import {useDispatch} from "react-redux";
import {getData} from "../../redux/dataSlice";

export default function Main({setLoader}){
    let navigate = useNavigate()
    const [page, setPage] = useState('/')
    const [user, setUser] = useState('')
    const dispatch = useDispatch()
    function userSet(item) {setUser(item)}
    function pageSet(current) {setPage(current)}

    useEffect(() => {
        navigate(page.toLowerCase())
        // eslint-disable-next-line
    }, [page]);
    useEffect(() =>{
        dispatch(getData())
    }, [dispatch])
    return(
        <>
            <Routes>
                <Route path={'/'}  element={<Login setUser={(current) => userSet(current)} pageSet={(current) => pageSet(current)} setLoading={(current) => setLoader(current)} />}/>
                <Route path={'/main/*'} element={(page==='main') && <Category user={user}/>}/>
            </Routes>
        </>
    )
}