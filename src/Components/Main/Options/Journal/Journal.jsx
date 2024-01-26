import {useEffect, useState} from "react";
import axios from "axios";
import {courses, link} from "../../../otherFile";
import modules from "../Journal/journal.module.css";
import {Route, Routes, useNavigate} from "react-router-dom";
import CreateMonths from "./CreateMonths/CreateMonths";

export default function Journal(){
    const [date, setDate] = useState([])
    const [data, setData] = useState([])
    const [monthData, setSetMonthData] = useState([])
    const [missStudents, setMissStudents] = useState()
    const navigate = useNavigate()
    function setDateNext(e) {
        let formatedDate = `${Number(e.target.textContent.split('.')[0])}.${Number(e.target.textContent.split('.')[1])}.${e.target.textContent.split('.')[2]}`
        setDate(data.filter(element => element.startsWith(formatedDate)))
    }

    useEffect(() => {
        async function axiosData() {
            await axios.get(link)
                .then(res => Object.keys(res.data.data).map(key => res.data.data[key]['name']))
                .then(res => res.filter(element => element !== 'default'))
                .then(res => setData(res))
                .catch(error => console.log(error))
        }
        axiosData().catch(error => console.log(error))
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        let tempArray = []
        // eslint-disable-next-line array-callback-return
        data.map(element => {
            let fullDate = element.split('-')[0]
            let month = fullDate.split('.')[1] - 1
            if (!tempArray[month]) tempArray[month] = []
            tempArray[month].push(fullDate);
        })
        setSetMonthData(tempArray)
        // eslint-disable-next-line
    }, [data]);

    useEffect(() => {
        async function axiosDate(){
            let tempMissStudent = []
            await Promise.all(
                // eslint-disable-next-line array-callback-return
                    date.map(element => {
                    let missintgStudents =[]
                    let fullObject = []
                    axios.get(link + '/' + element)
                        .then(res => res.data.data.map(element => Object.values(element)[0] === 'FALSE'))
                        // eslint-disable-next-line array-callback-return
                        .then(res => res.map((num, id) =>  {if (num) missintgStudents.push(id)}))
                        .then(() => {
                            fullObject.push(missintgStudents)
                            fullObject.push(courses[element.split('-')[1]])
                            tempMissStudent.push(fullObject)
                        })
                })
            )
            setMissStudents(tempMissStudent)
        }

        date.length > 0 && axiosDate();

        navigate('')
        // eslint-disable-next-line
    }, [date]);
    useEffect(() => {
        console.log(missStudents)
    }, [missStudents]);
    return(
        <section className={modules.journal}>
            <Routes>
                {monthData.length > 1 ?
                    <Route path={'/*'} element={<CreateMonths monthData={monthData} setData={setDateNext} data={data}/>}/>:
                    <Route path={'/'} element={<div className={modules.loader}></div>}/>
                }
            </Routes>
        </section>
    )
}