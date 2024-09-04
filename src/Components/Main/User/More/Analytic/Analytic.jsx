import Loader from "../../../../Reusable/Loader/Loader";
import DontHaveData from "../../../../Reusable/DontHaveData/DontHaveData";
import {useSelector} from "react-redux";
import 'chart.js/auto';
import "./analytic.css";
import getMissingSummary from "../../../../functions/getMissingSummary";
import {useEffect, useState} from "react";
import {Divider} from "@mui/material";
import uniqid from "uniqid";
import BackArrow from "../../../../Reusable/BackArrow/BackArrow";

export default function Analytic() {
  const [missingList, setMissingList] = useState([])
  const [students, setStudents] = useState([])
  const schedule = useSelector(state => state.schedules.schedulesList)[0];
  const groupName = useSelector(state => state.schedules.groupName);

  const journal = useSelector(state => state.journal.journal)
  const statusSchedule = useSelector(state => state.schedules.status);
  const statusJournal = useSelector(state => state.journal.status);
  const errorSchedule = useSelector(state => state.schedules.error);
  const errorJournal = useSelector(state => state.journal.error);

  function getStudents() {
    const students = groupName === 'group' || Object.keys(schedule[groupName]).length === 0 ? [] : schedule[groupName]['students']
    setStudents(students)
    return students
  }

  function getPercentage(value) {
    const missed = Math.round((100 * value) / missingList.summary)
    return isNaN(missed) ? 0 : missed
  }

  useEffect(() => {
    ((statusSchedule && statusJournal) && (!errorSchedule || !errorJournal)) && setMissingList(getMissingSummary(journal, getStudents()))
  }, [statusSchedule, statusJournal, errorSchedule, errorJournal, journal, groupName]);

  return (
    <div className={'analytic'} style={{alignItems: (!statusSchedule || !statusJournal) ? 'center' : undefined}}>
      {!statusSchedule || !statusJournal ? <Loader/> :
        errorSchedule || errorJournal || students.length === 0 ? <DontHaveData/> : (
          <>
            <BackArrow/>
            <div className={'analytics__table'}>
              <div className={'analytics__table__num'}>
                <div className={'analytics__table-wrapper'}>
                  <p className={'analytics__table__num__header'}>№</p>
                  <Divider orientation="vertical" variant="inset"/>
                </div>
                {missingList.missing.map(element => (
                  <div key={uniqid()} className={'analytics__table-wrapper'}>
                    <p key={uniqid()}
                       className={'analytics__table__num__body'}>{students.indexOf(element.student) + 1}. </p>
                    <Divider key={uniqid()} orientation="vertical" variant="inset"/>
                  </div>
                ))}
              </div>
              <div className={'analytics__table__student'}>
                <div className={'analytics__table-wrapper'}>
                  <p className={'analytics__table__student__header'}>Student</p>
                  <Divider orientation="vertical" variant="inset"/>
                </div>
                {missingList.missing.map(element => (
                  <div key={uniqid()} className={'analytics__table-wrapper'}>
                    <p key={uniqid()}
                       className={'analytics__table__student__body'}>{element.student}</p>
                    <Divider key={uniqid()} orientation="vertical" variant="inset"/>
                  </div>
                ))}
              </div>
              <div className={'analytics__table__missing-num'}>
                <div className={'analytics__table-wrapper'}>
                  <p className={'analytics__table__missing-num__header'}>Missed</p>
                  <Divider orientation="vertical" variant="inset"/>
                </div>
                {missingList.missing.map(element => (
                  <div key={uniqid()} className={'analytics__table-wrapper'}>
                    <p key={uniqid()}
                       className={'analytics__table__missing-num__body'}>{element.count}</p>
                    <Divider key={uniqid()} orientation="vertical" variant="inset"/>
                  </div>
                ))}
              </div>
              <div className={'analytics__table__missing-pct'}>
                <div className={'analytics__table-wrapper'}>
                  <p className={'analytics__table__missing-per__header'}>Pct</p>
                </div>
                {missingList.missing.map(element => (
                  <div key={uniqid()} className={'analytics__table-wrapper'}>
                    <p key={uniqid()}
                       className={'analytics__table__missing-per__body'}>{getPercentage(element.count)} %</p>
                  </div>
                ))}
              </div>
            </div>
          </>
        )
      }
    </div>
  )
    ;
}
