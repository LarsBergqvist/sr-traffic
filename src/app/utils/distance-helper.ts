function toRad(x: number): number {
    return (x * Math.PI) / 180;
}

export function calcDistanceKm(fromLat: number, fromLng: number, toLat: number, toLng: number): number {
    let R = 6371;
    let dLon = toRad(toLng - fromLng),
        lat1 = toRad(fromLat),
        lat2 = toRad(toLat),
        d = Math.acos(Math.sin(lat1) * Math.sin(lat2) + Math.cos(lat1) * Math.cos(lat2) * Math.cos(dLon)) * R;

    return Math.round(d);
}
