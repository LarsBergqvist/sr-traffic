export function convertFromJSONstring(dateString: string): Date {
    if (dateString === '/Date(-62135596800000)/') {
        return null;
    } else {
        return new Date(JSON.parse(dateString.match(/\d+/)[0]));
    }
}

export function durationToTime(duration: number): Date {
    const t = new Date(1970, 0, 1);
    t.setSeconds(duration);
    return t;
}
