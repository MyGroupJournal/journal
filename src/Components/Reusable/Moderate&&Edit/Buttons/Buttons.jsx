import SelectList from "../../SelectList/SelectList";
import {useSelector} from "react-redux";
import BackArrow from "../../BackArrow/BackArrow";

export default function Buttons({newSubject, chosenSubj, chosenMode, setMode, list}) {
  const groupName = useSelector(state => state.schedules.groupName)

  return (
    <>
      <BackArrow/>
      <SelectList isDisabled={groupName === 'group' && 1}
                  handleListClick={(e) => newSubject(e)}
                  list={list}
                  name={chosenSubj}/>
      {chosenMode && <SelectList isDisabled={groupName === 'group' && 1}
                                 handleListClick={(e) => setMode(e)}
                                 list={['Present', 'Absent']}
                                 name={chosenMode}/>}

    </>
  )
}