const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
]

const formateTime = (createdOn: string) => {
    const date = new Date(parseInt(createdOn));
    const formatedTime = date.toLocaleTimeString().replace(/:[0-9]{2}\s/, ' ');
    return formatedTime;
}

const formatDate = (createdOn: string) => {
    const threadDate = new Date(parseInt(createdOn));

    const date = threadDate.getDate();
    const month = months[threadDate.getMonth()]
    const year = threadDate.getFullYear();
    const time = formateTime(createdOn);

    const fomatedDate = `${date} ${month} ${year}, ${time}`;
    return fomatedDate;
}

export { formatDate, formateTime };
