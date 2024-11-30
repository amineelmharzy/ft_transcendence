function limitText(text, maxLength) {
    if (!text) {
        return ''
    }
    if (text.length < maxLength) {
        return text
    }
    return text.slice(0, maxLength) + '...'
}

export { limitText }