export default function getMissingSummary(data, students) {
    const missing = students.map(() => 0)
    data.flat().forEach(day => Object.keys(day).forEach((key, id) => {
        if (key !== 'row_id' && key !== 'Subj' && key !== 'Дата') {
            if (!Number(day[key])) missing[id] += 1
        }
    }))

    let summary = 0
    data.flat().forEach(() => summary += 1 )
    return {
        missing:missing.map((value, id) => ({student: students[id], count: value})).sort((a, b) => b.count - a.count),
        summary: summary
    }
}