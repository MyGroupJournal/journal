import modules from './list.module.css'
export default function List({student, changeData, id}){
    return(
        <>
            <div className={modules.student} id={id}>
                <p>{id+1}. {student}</p>
                <input onChange={changeData} type="checkbox"/>
            </div>
        </>
    )
}