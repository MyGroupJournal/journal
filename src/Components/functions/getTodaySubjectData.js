import getTodayData from "./getTodayData";

export default function getTodaySubjectData(journal, subjects) {
    const data = getTodayData(journal)
    return subjects.length > 0 ? data.map(subject => subjects[subject['Subj']]): []
}