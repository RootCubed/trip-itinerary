export function getTimeStr(minutes) {
    return `${Math.floor(minutes / 60)}h\u2009${minutes % 60}m`;
}
