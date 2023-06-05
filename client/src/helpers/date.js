export const dateFormat = (date) => {
    const month = ["JAN" , "FEB" ,"MAR" , "APR" , "MAY" , "JUN" , "JUL" , "AUG" , "SEP" , "OCT" , "NOV" , "DEC"]
    return date.getDate() + ' ' + month[date.getMonth() ] + ' ' + date.getFullYear()
}