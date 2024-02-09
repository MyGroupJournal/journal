import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import modules from './createList.module.css'
import {courses, link, surnames} from "../../../../otherFile";
import List from "./List";
import axios from "axios";
import {useDispatch} from "react-redux";
import {addReducer, editStatus, updateReducer} from "../../../../../redux/dataSlice";

export default function CreateList(){
    const [dataSend, setDataSend] = useState({})
    const dispatch = useDispatch()

    const param = useParams()
    const navigate = useNavigate()
    const currentSubj = courses[param['*']]

    const date = new Date()
    const formatedDate = `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth()+1).toString().padStart(2, '0')}.${date.getFullYear()}`


    let data =
        [
            true, true, true, true, true, true, true, true, true,
            true, true, true, true, true, true, true, true, true,
            true, true, true, true, true, true, true, true, true,
            true, true, true, true
        ]

    function changeData(current) {data[current.target.parentElement.id] = !data[current.target.parentElement.id]}

    function confirm() {
        if(window.confirm('Are you sure you want to send the data?')){
            let confirmedData = {}
            for (let surname of surnames) {confirmedData[surname] = data[surnames.indexOf(surname)] ? 1: 0;}
            confirmedData['Дата'] = formatedDate
            setDataSend(confirmedData)
        }
    }

    useEffect(() => {
        const axiosDataFirstRound = async () =>  {
            navigate('/main')
            try{
                dispatch(editStatus())
                let id = Number(param['*'])+1
                let monthID = date.getMonth()
                const response = await axios.get(`${link}/${id}`);
                const filteredData = response.data.data.filter(element => element['Дата'] === formatedDate)
                if(filteredData.length === 1) {
                    await axios.put(`${link}/${id}/${filteredData[0]['row_id']}`, {data: dataSend})
                    dispatch(updateReducer({dataSend, id, monthID}));
                }
                else{
                    await axios.post(`${link}/${id}`, {data: dataSend});
                    dispatch(addReducer({dataSend, id, monthID}));
                }
            }
            catch (error){
                console.error('Error executing requests:', error);
            }
            setDataSend([])
        }
        (Object.keys(dataSend).length > 0) && axiosDataFirstRound()
        // eslint-disable-next-line
    }, [dataSend]);

    return(
        <div className={modules.match}>
            <h2 className={modules.subject}>{currentSubj}</h2>
            <div className={modules.students}>
                {surnames.map((student, id) => <List student={student} id={id} key={id} changeData={changeData}/>)}
            </div>
            <div className={modules.buttons}>
                <button onClick={confirm} className={modules.confirm}>Confirm</button>
            </div>
        </div>
    )
}
