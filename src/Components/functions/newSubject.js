export default function newSubject(e) {
    let subj = e.target.textContent
    if (subj) return e.target.textContent
    else return ''
}