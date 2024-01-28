import modules from './moderate.module.css'
import {useEffect, useState} from "react";
import CreateSubjectButtons from "../CreateSubjectButtons/CreateSubjectButtons";
import {Route, Routes, useNavigate} from "react-router-dom";
import CreateList from "./CreateList/CreateList";
import {courses} from "../../../otherFile";
export default function Moderate(){
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
                    <Route path={'/*'} element={<CreateSubjectButtons setSubject={setSubject}/>}/>
                    {Boolean(nextPage) && <Route path={nextPage} element={<CreateList/>}/>}
                </Routes>
            </section>
        </>
    )
}