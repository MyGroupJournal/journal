import {useEffect, useState} from "react";
import axios from "axios";
import {courses, link} from "../../../otherFile";
import modules from "../Journal/journal.module.css";
import {Route, Routes, useNavigate} from "react-router-dom";
import CreateMonths from "./CreateMonths/CreateMonths";
import CreateMissed from "./CreteMissed/CreateMissed";

export default function Journal(){
    const [date, setDate] = useState([])
    const [data, setData] = useState([])
    const [complDate, setComplDate] = useState('')
    const [monthData, setMonthData] = useState([])
    const [missStudents, setMissStudents] = useState()
    const navigate = useNavigate()
    function setDateNext(e) {
        setComplDate(e.target.textContent)
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

        navigate('');
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
        setMonthData(tempArray)
        // eslint-disable-next-line
    }, [data]);
    useEffect(() => {
        async function axiosDate() {
            const tempMissStudent = await Promise.all(
                date.map(async (element) => {
                    const missintgStudents = [];
                    const fullObject = {};
                    try {
                        const response = await axios.get(link + '/' + element);
                        response.data.data.forEach((item, id) => {
                            if (Object.values(item)[0] === 'FALSE') {
                                missintgStudents.push(id);
                            }
                        });
                    } catch (error) {
                        console.error('Error fetching missing students data:', error);
                    }

                    fullObject[element] = { students: missintgStudents, course: courses[element.split('-')[1]] };
                    return fullObject;
                })
            );

            setMissStudents(tempMissStudent);
        }

        if(date.length > 0){
            axiosDate();
            navigate(complDate)
        }
        // eslint-disable-next-line
    }, [date]);
    console.log(monthData)
    return(
        <section className={modules.journal}>
            <Routes>
                { monthData.length > 0 ?
                    <Route path={'/'} element={<CreateMonths missStudents={missStudents} monthData={monthData} setData={setDateNext} data={data}/>}/>:
                    <Route path={'/'} element={<div className={modules.loader}></div>}/>
                }
                {date.length > 0 && <Route path={complDate} element={<CreateMissed missedStudents={missStudents} date={complDate}/>}/>}
            </Routes>
        </section>
    )
}