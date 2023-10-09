export function minToHm(minutes) {
    return `${Math.floor(minutes / 60)}h\u2009${minutes % 60}m`;
}

export function hmToMin(hm) {
    let [h, m] = hm.split(":");
    return parseInt(h) * 60 + parseInt(m);
}
