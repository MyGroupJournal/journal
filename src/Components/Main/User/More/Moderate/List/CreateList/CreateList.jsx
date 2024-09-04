import './createList.css'

export default function CreateList({mode, student, changeData, id, check}) {
    return (
        <>
            <div className={'student'} id={id}>
                <p>{id + 1}. {student}</p>
                <input checked={!mode ? !check: mode === 'Present' ? check: !check}
                       onChange={() => changeData(id)} type="checkbox"/>
            </div>
        </>
    )
}