import {useEffect, useState} from "react";
import {courses, surnames} from "../../../otherFile";
import modules from "../Journal/journal.module.css";
import {Route, Routes, useNavigate} from "react-router-dom";
import CreateMonths from "./CreateMonths/CreateMonths";
import CreateMissed from "./CreteMissed/CreateMissed";
import {useSelector} from "react-redux";

export default function Journal(){
    const {data, status} = useSelector(state => state.data)
    const [date, setDate] = useState([])
    const [complDate, setComplDate] = useState('')
    const [monthData, setMonthData] = useState([])
    const [missStudents, setMissStudents] = useState()
    const navigate = useNavigate()
    function setDateNext(e) {
        const newComplDate = e.target.textContent;
        setComplDate(newComplDate)

        let setMonth = Number(e.target.textContent.split('.')[1]) - 1

        const filteredData = data[setMonth].filter(element => element['Дата'] === newComplDate);
        setDate(filteredData)
    }

    useEffect(() => {
        function quickSort(arr) {
            if (arr.length <= 1) return arr;
            const pivot = arr[0];
            const left = [];
            const right = [];
            for (let i = 1; i < arr.length; i++) {
                if (arr[i] < pivot) left.push(arr[i]);
                else right.push(arr[i]);
            }
            return [...quickSort(left), pivot, ...quickSort(right)];
        }

        let tempArray = []
        // eslint-disable-next-line array-callback-return
        data.map(months => {
            // eslint-disable-next-line array-callback-return
            months.map(element => {
                let date = element['Дата']
                let month = element['Дата'].split('.')[1]
                if (!tempArray[month]) tempArray[month] = []
                tempArray[month].push(date);
            })
        })
        // eslint-disable-next-line array-callback-return
        let uniqArray = []
        for (let i = 0; i < Object.values(tempArray).length; i++){
            let month = Object.values(tempArray)[i]
            month = month.map(day => Number(day.split('.')[0]))
            if (month.length >= 1) {
                uniqArray.push(Array.from(new Set(month)));
            }
        }
        let sortedArr = uniqArray.map(element => quickSort(element))
        sortedArr = sortedArr.map((element, id) => element.map(day => `${day.toString().padStart(2, '0')}.${(id+1).toString().padStart(2, '0')}.2024`))
        // console.log(sortedArr)
        setMonthData(sortedArr)
        // eslint-disable-next-line
    }, [data]);
    useEffect(() => {
        async function axiosDate() {
            const tempMissStudent = date.map((element, id) => {
                    const missintgStudents = []
                    Object.values(element).filter((val, id) => (Number(val) === 0) && missintgStudents.push(surnames[id]))
                    const fullObject = {};

                    fullObject[id] = {students: missintgStudents, course: courses[element['Subj']]}
                    return fullObject
                })
            setMissStudents(tempMissStudent);
        }
        if(date.length > 0){
            axiosDate();
            navigate(complDate)
        }
        // eslint-disable-next-line
    }, [date]);

    return(
        <section className={modules.journal}>
            <Routes>
                {status ?
                    <Route path={'/'} element={<CreateMonths monthData={monthData} setData={setDateNext}/>}/>:
                    <Route path={'/'} element={<div className={modules.loader}></div>}/>
                }
                {date.length > 0 && <Route path={complDate} element={<CreateMissed missedData={missStudents} date={complDate}/>}/>}
            </Routes>
        </section>
    )
}