import {TLocation} from "@/core/trackingService/interfaces/TLocation";

export interface TServerResponse {
    foundCaseList: TServerCase[];
}

export interface TServerCase {
    location: TLocation;
    date: string;
    numberOfInfected: number;
}
