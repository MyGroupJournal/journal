import './moderate.css'
import {useState} from "react";
import Loader from "../../../../Reusable/Loader/Loader";
import DontHaveData from "../../../../Reusable/DontHaveData/DontHaveData";
import {useSelector} from "react-redux";
import Buttons from "../../../../Reusable/Moderate&&Edit/Buttons/Buttons";
import CreateNotSelected from "../../../../Reusable/Moderate&&Edit/CreateNotSelected/CreateNotSelected";
import newSubject from "../../../../functions/newSubject";
import setMode from "../../../../functions/setMode";

export default function Moderate() {
    const [chosenSubj, setChosenSubj] = useState('subject')
    const [chosenMode, setChosenMode] = useState('Absent')

    const schedule = useSelector(state => state.schedules.schedulesList)[0]
    const groupName = useSelector(state => state.schedules.groupName)
    const statusSchedule = useSelector(state => state.schedules.status)
    const statusJournal = useSelector(state => state.journal.status)
    const errorSchedule = useSelector(state => state.schedules.error)
    const errorJournal = useSelector(state => state.journal.error)


    return (
        <>
            <div className={'moderate'}
                 style={{display: (!statusSchedule || !statusJournal) || (errorSchedule || errorJournal) ? 'flex' : 'block'}}>
                {!statusSchedule || !statusJournal ? <Loader/> :
                    errorSchedule || errorJournal ? <DontHaveData/> : (
                        <>
                            <div className={'button__div'}>
                                <Buttons chosenSubj={chosenSubj} chosenMode={chosenMode}
                                         newSubject={(e) => newSubject(e) && setChosenSubj(newSubject(e))}
                                         setMode={(e) => setMode(e) && setChosenMode(setMode(e))}
                                         list={groupName === 'group' || Object.keys(schedule[groupName]).length === 0 ? [] : schedule[groupName]['subjects']}
                                />
                            </div>
                            <CreateNotSelected chosenSubj={chosenSubj} chosenMode={chosenMode}/>
                        </>
                    )}
            </div>
        </>
    )
}