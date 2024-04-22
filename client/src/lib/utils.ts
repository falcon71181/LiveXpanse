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

const formatDate = (createdOn: string) => {
    const threadDate = new Date(parseInt(createdOn));

    const date = threadDate.getDate();
    const month = months[threadDate.getMonth()]
    const year = threadDate.getFullYear();
    const time = threadDate.toLocaleTimeString().replace(/:[0-9]{2}\s/, ' ');

    const fomatedDate = `${date} ${month} ${year}, ${time}`;
    return fomatedDate;
}

export { formatDate };
