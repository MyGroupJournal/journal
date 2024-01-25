import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import modules from './createList.module.css'
import {courses, link, surnames} from "../../../../otherFile";
import List from "./List";
import axios from "axios";

export default function CreateList(){
    const [dataSend, setDataSend] = useState([])

    const param = useParams()
    const navigate = useNavigate()
    const currentSubj = courses[param['*']]

    const date = new Date()
    const formatedDate = `${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()}-${param['*']}`

    let data =
        [
            true, true, true, true, true, true, true, true, true,
            true, true, true, true, true, true, true, true, true,
            true, true, true, true, true, true, true, true, true,
            true, true, true, true
        ]

    function changeData(current) {
        data[current.target.parentElement.id] = !data[current.target.parentElement.id]
    }
    function confirm() {
        if(window.confirm('Are u sure u want send data?')){
            let confirmedData = data.map(element => ({'data': element}))
            setDataSend(confirmedData)
        }
    }
    useEffect(() => {
        const axiosDataFirstRound = async () =>  {
            try {
                const response = await axios.get(link);
                const filteredData = Object.keys(response.data.data).filter(
                    key => response.data.data[key]['name'] === formatedDate
                );
                if (filteredData.length === 1) {
                    await axios.delete(link + '/' + formatedDate);
                }
            } catch (error) {
                console.error('Error executing requests:', error);
            }
        };
        const axiosDataSecondRound = async () => {
            try{
                await axios.post(link, { title: formatedDate })
            }
            catch (error){
                console.error('Error executing requests:', error);
            }
        }
        if (dataSend.length > 1) {
            axiosDataFirstRound().then(()=>axiosDataSecondRound().then(() =>
                axios.post(link + '/' + formatedDate, { data: dataSend })
                    .catch(error => console.error('Error executing requests:', error) )))
            navigate('/main')
        }
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
