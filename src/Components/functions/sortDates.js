export default function sortDates(data) {
  function quickSort(arr) {
    if (arr.length <= 1) return arr;
    const pivot = arr[0];
    const left = [];
    const right = [];
    for (let i = 1; i < arr.length; i++) {
      if (arr[i] < pivot) left.push(arr[i]);
      else right.push(arr[i]);
    }
    return [...quickSort(left), pivot, ...quickSort(right)];
  }

  let tempArray = []
  data.forEach(months => {
    months.forEach(element => {
      let date = element['Дата']
      let month = element['Дата'].split('.')[1]
      if (!tempArray[month]) tempArray[month] = []
      tempArray[month].push(date);
    })
  })
  let uniqDates = []
  let months = Object.keys(tempArray)
  for (let i = 0; i < Object.values(tempArray).length; i++) {
    let month = Object.values(tempArray)[i]
    month = month.map(day => Number(day.split('.')[0]))
    if (month.length >= 1) {
      uniqDates.push(Array.from(new Set(month)));
    }
  }
  let sortedArr = uniqDates.map(element => quickSort(element))
  return sortedArr.map((element, id) => element.map(day => `${day.toString().padStart(2, '0')}.${(Number(months[id])).toString().padStart(2, '0')}.${new Date().getFullYear()}`))
}