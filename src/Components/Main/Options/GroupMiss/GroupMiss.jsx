import modules from "../GroupMiss/groupMiss.module.css";
import {courses, surnames} from "../../../otherFile";
import {useEffect, useState} from "react";
import {Route, Routes, useNavigate} from "react-router-dom";
import CreateSubjectButtons from "../CreateSubjectButtons/CreateSubjectButtons";
import uniqid from "uniqid";
import CreateMissed from "../Journal/CreteMissed/CreateMissed";
import {useSelector} from "react-redux";

export default function GroupMiss() {
    const {data, status} = useSelector(state => state.data)
    const [student, setStudent] = useState('')
    const [choice, setChoice] = useState('')
    const [missingDates, setMissingDates] = useState([])
    const navigate = useNavigate()
    function chooseStudent(e) {setStudent(e.target.textContent.split(' ')[1])}

    function setSubject(e) {setChoice(e.target.textContent)}

    useEffect(() => {
        async function getDates(){
            switch (choice){
                case 'All':
                    let fullObject = []
                    let dataZero = data.map(month => month.filter(element => Number(element[student]) === 0))
                    // eslint-disable-next-line
                    dataZero.map(month => month.map(element => {
                        let subj = element['Subj']
                        fullObject[subj] ? fullObject[subj].push(element['Дата']) : (fullObject[subj] = [element['Дата']]);
                    }))
                    setMissingDates(fullObject)
                    break
                default:
                    let tempObj = []
                    let filteredData = data.map(month => month.filter(element => element['Subj'] === courses.indexOf(choice)))
                    // eslint-disable-next-line
                    filteredData.map(month => month.map(element => {
                        if (Number(element[student]) === 0) {
                            let subjIndex = element['Subj'];
                            tempObj[subjIndex] ? tempObj[subjIndex].push(element['Дата']) : (tempObj[subjIndex] = [element['Дата']]);
                        }
                    }))
                    setMissingDates(tempObj)
                    break
            }
        }
        if(choice.length !== 0 ) {
            getDates()
            navigate('missed')
        }
        // eslint-disable-next-line
    }, [choice]);

    useEffect(() => {
        navigate('')
        // eslint-disable-next-line
    }, []);

    return(
        <section className={modules.groupMiss}>
            <Routes>
                {choice === '' ?
                    <Route path={'/'} element={status ? (student === '') ? (
                        <div className={modules.buttons}>
                            {surnames.map((student, id) => (<button key={uniqid()} onClick={chooseStudent}
                                                                    className={modules.studentButt}>{id + 1}. {student}</button>))}
                        </div>
                    ): <CreateSubjectButtons setSubject={setSubject} mode={true}/>: <div className={modules.loader}></div>}/>:
                    <Route path={'missed'} element={<CreateMissed missedData={missingDates} student={student} mode={'group'}/>}/>
                }

            </Routes>

        </section>
    )
}