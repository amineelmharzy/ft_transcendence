function formatYearDate(dateInput) {
    const date = new Date(dateInput);
    const day = date.toLocaleDateString('en-US', { weekday: 'short' });
    const month = date.toLocaleDateString('en-US', { month: 'short' });
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
}

function isToday(timestamp) {
    const today = new Date()
    const date = new Date(timestamp)

    return today.setHours(0, 0, 0, 0) == date.setHours(0, 0, 0, 0)
}

function normalizeDate(timestamp) {
    const date = new Date(timestamp)
    const today = new Date()

    if (!timestamp) {
        return ''
    }
    if (isToday(timestamp)) {
        return 'today'
    }
    const diffYears = today.getFullYear() - date.getFullYear()
    const diffMonths = today.getMonth() - date.getMonth()
    const diffDays = today.getDay() - date.getDay()

    if (diffYears) {
        return `$diffYears} years ago`
    } else if (diffMonths) {
        return `${Math.abs(diffMonths)} months ago`
    } else {
        if (diffDays == 1) {
            return 'yesterday'
        }
        return `${Math.abs(diffDays)} days ago`
    }
}

export { isToday, normalizeDate, formatYearDate }