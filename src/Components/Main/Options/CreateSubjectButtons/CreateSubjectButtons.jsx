import modules from './createSubButton.module.css'
import {courses} from "../../../otherFile";
import uniqid from 'uniqid';

export default function CreateSubjectButtons({setSubject, active, mode = false}) {
    return (
            <>
                {!Boolean(active) ? courses.map(subject => <button key={uniqid()} onClick={setSubject} className={modules.button}>{subject}</button>): courses.map(subject => {
                    return active === subject ? <button key={uniqid()} onClick={setSubject} className={modules.button + ' active'}>{subject}</button> : <button key={uniqid()} onClick={setSubject} className={modules.button}>{subject}</button>
                })}
                {mode && <button key={uniqid()} onClick={setSubject} className={modules.button}>All</button>}
            </>
    )

}