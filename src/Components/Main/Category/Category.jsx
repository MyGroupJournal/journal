import modules from "./category.module.css";
import CreateBlock from "./CreateBlock";
import {useEffect} from "react";
import {Route, Routes, useNavigate} from "react-router-dom";
import Moderate from "../Options/Moderate/Moderate";
import Journal from "../Options/Journal/Journal";
import GroupMiss from "../Options/GroupMiss/GroupMiss";

export default function Category({user}) {
    const navigate = useNavigate()
    function nextPage(e) {
        if (e){
            let nextPage = e.target.closest('.block_block__mw5ot').children[1].textContent.toLowerCase()
            navigate(nextPage)
        } else navigate('')
    }

    useEffect(() => {
        navigate('')
        // eslint-disable-next-line
    }, []);

    return (
        <Routes>
            <Route path={''} element={
                <div className={modules.variantsBlock}>
                <div className={modules.variants} style={{width: (user === 'helper' || user === 'admin') ? '100%' : ''}}>
                    <CreateBlock nextPage={nextPage}/>
                    {(user === 'helper' || user === 'admin') && <CreateBlock type={'first'} nextPage={nextPage} user={user}/>}
                    {(user === 'admin') && <CreateBlock type={'second'} nextPage={nextPage} user={user}/>}
                </div>
            </div>
            }/>
            <Route path={'moderate/*'} element={<Moderate/>}/>
            <Route path={'journal/*'} element={<Journal/>}/>
            <Route path={'group/*'} element={<GroupMiss/>}/>
        </Routes>
    )
}