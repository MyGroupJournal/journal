import getTodayData from "./getTodayData";

export default function createDataList(journal, subject) {
    const correctData = getTodayData(journal).filter(element => Number(element['Subj']) === subject)
    const data = correctData.map(element => Object.keys(element).filter(value => value !== 'Дата' && value !== 'row_id' && value !== 'Subj').map(key => element[key]))
    return data.map(element => element.map(studentStatus => Number(studentStatus)))[0]
}