import modules from './moderate.module.css'
import {useEffect, useState} from "react";
import CreateSubjectButtons from "../CreateSubjectButtons/CreateSubjectButtons";
import {Route, Routes, useNavigate} from "react-router-dom";
import CreateList from "./CreateList/CreateList";
import {courses} from "../../../otherFile";
import {useSelector} from "react-redux";
export default function Moderate(){
    const status = useSelector(state => state.data.status)
    const [nextPage, setNextPage] = useState('')
    const navigate = useNavigate()
    function setSubject(e) {
        let whatNow = courses.indexOf(e.target.textContent)
        setNextPage(`${whatNow}`)
        e.target.parentElement.style.padding = '15px 20px'
    }
    useEffect(() => {
        navigate(nextPage);
        // eslint-disable-next-line
    }, [nextPage]);
    return(
        <>
            <section className={modules.moderate}>
                <Routes>
                    <Route path={'/*'} element={status ?
                        <CreateSubjectButtons setSubject={setSubject}/>:
                        <div className={modules.loader}></div>}/>
                    {Boolean(nextPage) && <Route path={nextPage} element={<CreateList/>}/>}
                </Routes>
            </section>
        </>
    )
}