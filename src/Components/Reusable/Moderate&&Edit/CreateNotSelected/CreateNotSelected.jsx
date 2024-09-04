import NotSelected from "../../NotSelected/NotSelected";
import CheckList from "../CheckList/CheckList";
import {useSelector} from "react-redux";
import './CreateNotSelected.css'

export default function CreateNotSelected({chosenSubj, chosenMode}) {
    const groupName = useSelector(state => state.schedules.groupName)

    return (
        <>
            {groupName === 'group' || chosenSubj === 'subject' ?
                <NotSelected text={`a subject ${groupName === 'group' ? 'and a group' : ''}`}/> : (
                    <div className={'list'}>
                        <h2 className={'list__title'}>{chosenSubj}</h2>
                        <CheckList subject={chosenSubj} {...(chosenMode && { mode: chosenMode })} />
                    </div>
                )}
        </>
    )
}