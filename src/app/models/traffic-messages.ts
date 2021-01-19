export interface TrafficMessage {
    id: number;
    description: string;
    longitude: number;
    latitude: number;
    createddate: string;
    title: string;
    category: number;
    subcategory: string;
    exactlocation: string;
    priority: number;
}
export interface TrafficMessagesResult {
    messages: TrafficMessage[];
    pagination: {
        page: number;
        size: number;
        totalhits: number;
        totalpages: number;
        nextpage: string;
        previouspage: string;
    };
}
