const monthList = ['01月', '02月', '03月', '04月', '05月', '06月', '07月', '08月', '09月', '10月', '11月', '12月'];
const getNewDate = (date) => {
    let year = date.getFullYear();
    let month = date.getMonth();
    let day = date.getDate();
    return {year, month, day};
}

const getDate = (year, month, day) => {
    return new Date(year, month, day);
}

const month = (month) => {
    let months;
    monthList.map(() => {
        months = monthList[month]
    });
    return months
}


const formatDate = (date) => {
    date = Number(date);
    return date < 10 ? `0${date}` : date;
}

export {
    getNewDate,
    getDate,
    month,
    formatDate,
}
