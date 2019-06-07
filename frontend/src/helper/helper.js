export const capitalize = (str = '') => typeof str !== 'string' ? '' : str[0].toUpperCase() + str.slice(1)

export const formatDateTime = timestamp => new Date(timestamp).toDateString() + ' at '+ new Date(timestamp).toLocaleTimeString('en-US')
    






