import {TLocation} from "@/core/trackingService/interfaces/TLocation";

export class StringLocationToLocation {
    public static fromStringLocationToLocation(location: string): TLocation {
        const latitudeLongitude: string[] = location.split('-');
        return {
            latitude: parseFloat(latitudeLongitude[0]),
            longitude: parseFloat(latitudeLongitude[1])
        };
    }
}
