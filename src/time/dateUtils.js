/* @flow */

export function formatDate(isoDate: string) {
    const MONTHS = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
    ];
    const DAYS_OF_WEEK = [
        "Sun",
        "Mon",
        "Tue",
        "Wed",
        "Thur",
        "Fri",
        "Sat"
    ];

    const newDate = new Date(Date.parse(isoDate));

    const day = newDate.getDate();
    const month = MONTHS[newDate.getMonth()];
    const weekDay = DAYS_OF_WEEK[newDate.getDay()];

    return `${weekDay} ${month}. ${day}`;
}

export function hourLocalTime(isoDate: string) {
    const newDate = new Date(isoDate);
    const dateHour = newDate.toLocaleTimeString().slice(0, 1);
    const dateTimePeriod = newDate.toLocaleTimeString().slice(-2);
    return dateHour + dateTimePeriod;
}

export function fullLocalTime(isoDate: string) {
    const newDate = new Date(isoDate).toLocaleTimeString();
    const timeReg = new RegExp(/\d+[:]\d+/);
    const fullHour = timeReg.exec(newDate);

    return fullHour + newDate.slice(-2);
}
