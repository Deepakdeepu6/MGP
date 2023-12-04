export const convertToDateMonthYear = (date) =>{
    console.log("date and time " + date)
    return(
        new Date(date).toISOString().split('T')[0]
        )
}