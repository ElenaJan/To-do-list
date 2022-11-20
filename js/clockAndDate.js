const clockAndDate = document.querySelector('.clock-and-date');
export const clock = document.querySelector('.clock');
export const currentDate = document.querySelector('.date');


function getTime () {
    const date = new Date();
    const seconds = date.getSeconds();
    const minutes = date.getMinutes();
    const hours = date.getHours();

    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    function getWeekDay(date) {
        let dayNum = date.getDay();
        const weekDays = ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'];
        let weekDay = weekDays[dayNum];
        return weekDay;
      }
    

    clock.innerHTML = `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;

    currentDate.innerHTML = `${day < 10 ? `0${day}` : day}.${month < 10 ? `0${month}` : month}.${year}, ${getWeekDay(date)}`;

    
}

function init() {
    getTime();
    setInterval(getTime, 1000);
}

init();
