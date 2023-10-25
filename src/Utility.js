export const convertToDateMonthYear = (date) =>{
    console.log(date)
    return(
        new Date(date).toISOString().split('T')[0]
        )
}