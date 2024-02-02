import modules from "../GroupMiss/groupMiss.module.css";
import {courses, link, surnames} from "../../../otherFile";
import {useEffect, useState} from "react";
import {Route, Routes, useNavigate} from "react-router-dom";
import CreateSubjectButtons from "../CreateSubjectButtons/CreateSubjectButtons";
import axios from "axios";
import uniqid from "uniqid";
import CreateMissed from "../Journal/CreteMissed/CreateMissed";

export default function GroupMiss() {
    const [student, setStudent] = useState('')
    const [choice, setChoice] = useState('')
    const [missingDates, setMissingDates] = useState([])
    const navigate = useNavigate()
    function chooseStudent(e) {setStudent(e.target.textContent.split(' ')[1])}

    function setSubject(e) {setChoice(e.target.textContent)}

    useEffect(() => {
        async function getDates(){
            let data = []
            switch (choice){
                case 'All':
                    let fullObject = []
                    for(let i = 1; i < courses.length + 1; i++){
                        await axios.get(`${link}/${i}`)
                            .then(res => data.push(res.data.data))
                    }
                    for (let i = 0; i < data.length; i++) {
                        let subject = courses[i];
                        let dates = [];
                        let element = data[i];
                        if(element !== undefined) {
                            for (let j = 0; j < element.length; j++) {
                                (element[j][student] === '0') && dates.push(element[j]['Дата'])
                            }
                        }
                        (dates.length !== 0) && fullObject.push([{'subject': subject}, {'dates':dates}])
                    }
                    setMissingDates(fullObject)
                    break
                default:
                    let dates =[]
                    let tempObj = []
                    await axios.get(`${link}/${courses.indexOf(choice)+1}`)
                        .then(res => data.push(res.data.data))
                    for(let element of data[0]){(element[student] === '0') && dates.push(element['Дата'])}
                    tempObj.push([{'subject': choice}, {'dates': dates}])
                    setMissingDates(tempObj)
                    break
            }
        }
        if(choice.length !== 0 ) {
            getDates()
            navigate('missed')
        }
    }, [choice]);

    useEffect(() => {navigate('')}, []);

    return(
        <section className={modules.groupMiss}>
            <Routes>
                {choice === '' ?
                    <Route path={'/'} element={(student === '') ? (
                        <div className={modules.buttons}>
                            {surnames.map((student, id) => (<button key={uniqid()} onClick={chooseStudent}
                                                                    className={modules.studentButt}>{id + 1}. {student}</button>))}
                        </div>
                    ): <CreateSubjectButtons setSubject={setSubject} mode={true}/>}/>:
                    <Route path={'missed'} element={<CreateMissed missedData={missingDates} student={student} mode={'group'}/>}/>
                }

            </Routes>

        </section>
    )
}