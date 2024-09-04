export default function getTodayData(journal) {
    const date = `${new Date().getDate().toString().padStart(2, '0')}.${(new Date().getMonth() + 1).toString().padStart(2, '0')}.${new Date().getFullYear()}`
    console.log(date)
    return journal.flat().filter(day => day['Дата'] === date)
}