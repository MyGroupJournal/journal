import {useNavigate} from "react-router-dom";
import Category from "./Category/Category";
export default function Main({user}){
    let navigate = useNavigate()
    if (user === 'admin' && window.innerHeight <= 870) {
        const wrapperElement = document.querySelector('#wrapper');
        wrapperElement.style.height = '110vh';
    }
    function nextPage(e) {
        if (e){
            let nextPage = e.target.closest('.block_block__93tYJ').children[1].textContent.toLowerCase()
            navigate(nextPage)
        } else navigate('/main')
    }

    return(
        <>
            <Category user={user} nextPage={nextPage}/>
        </>
    )
}