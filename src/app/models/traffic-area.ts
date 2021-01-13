export interface TrafficAreaResult {
    area: TrafficArea;
}

export interface TrafficAreasResult {
    areas: TrafficArea[];
    pagination: {
        page: number;
        size: number;
        totalhits: number;
        totalpages: number;
        nextpage: string;
        previouspage: string;
    };
}

export interface TrafficArea {
    name: string;
    zoom: number;
    radius: number;
    trafficdepartmentunitid: number;
}
