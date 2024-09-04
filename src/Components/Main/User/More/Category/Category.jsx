import {useNavigate} from "react-router-dom";
import React from "react";
import {useSelector} from "react-redux";
import CreateBlock from "./CreateBlock/CreateBlock";
import './category.css'

export default function Category() {
    const user = useSelector(state => state.user.user)
    const navigate = useNavigate()

    function nextPage(e) {
        if (e) {
            let nextPage = e.target.closest('.block').children[1].textContent.toLowerCase()
            navigate(nextPage)
        }
    }

    return (
        <div className={'variantsBlock'}>
            <div className={'variantsBlock__variants'}>
                <CreateBlock nextPage={nextPage}/>
                <CreateBlock ThirdLevelRender={1} nextPage={nextPage}/>
                {(user === 'helper' || user === 'admin') && <CreateBlock level={2} nextPage={nextPage}/>}
                {(user === 'admin') && (
                    <>
                        <CreateBlock level={1} nextPage={nextPage}/>
                        <CreateBlock level={1} FirstLevelRender={1} nextPage={nextPage}/>
                    </>
                )}
            </div>
        </div>
    )
}