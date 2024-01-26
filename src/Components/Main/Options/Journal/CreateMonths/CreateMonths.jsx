import modules from './months.module.css'
import {months} from "../../../../otherFile";
import uniqid from 'uniqid';


export default function CreateMonths({setData, monthData}){
    function moreInfoSet(current) {
        let section = current.target.closest('section').children
        let currentDiv = current.target.parentElement
        Array.from(section).map(element => element !== currentDiv ? element.lastChild.style.display = 'none' : element.lastChild.style.display = 'block')
        Array.from(section).forEach(element => element !== currentDiv ? element.firstChild.lastChild["style"].transform = 'rotate(0deg)': element.firstChild.lastChild["style"].transform = 'rotate(180deg)')
    }

    return(
        <>
            {monthData.map((element, id) => {
                let monthName = months[id]
                return(
                    <div className={modules.month} key={id} id={id}>
                        <div onClick={moreInfoSet} className={modules.topDiv}>
                            <h2 className={modules.monthName}>{monthName}</h2>
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="16" viewBox="0 0 30 16"
                                 fill="none">
                                <path
                                    d="M28.6272 0.736372C28.1303 0.239414 27.3244 0.239329 26.8273 0.736456L15.0003 12.5637L3.17267 0.736372C2.67572 0.239414 1.86982 0.239329 1.37278 0.736456C0.875739 1.2335 0.875739 2.03931 1.37278 2.53635L14.1004 15.2636C14.3391 15.5023 14.6628 15.6364 15.0003 15.6364C15.3378 15.6364 15.6616 15.5022 15.9002 15.2635L28.6271 2.53626C29.1243 2.03931 29.1243 1.23341 28.6272 0.736372Z"
                                    fill="white" stroke="white" strokeWidth="0.606061"/>
                            </svg>
                        </div>
                        <div className={modules.dates}>
                            {element.map(element => {
                                let month = `${element.split('.')[0].toString().padStart(2, '0')}.${element.split('.')[1].toString().padStart(2, '0')}.${element.split('.')[2]}`
                                return (<button key={uniqid()} onClick={setData} className={modules.date}>{month}</button>)
                            })}
                        </div>
                    </div>
                )
            })}
        </>
    )
}