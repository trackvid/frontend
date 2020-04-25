import {Utils} from "@/utils/Utils";
import {TLocation} from "@/core/trackingService/interfaces/TLocation";

export class TrackingService {

    private readonly successCallback: (newPosition: TLocation) => void;
    private readonly options: PositionOptions;
    private error: string = '';


    constructor(successCallback: (newPosition: TLocation) => void, options: PositionOptions) {
        this.successCallback = successCallback;
        this.options = options;
    }

    public static isGeoLocationSupported(): boolean {
        return !Utils.isNullOrUndefined(navigator.geolocation);
    }

    public saveCurrentPosition(): void {
        navigator.geolocation.getCurrentPosition(this.geoSuccess.bind(this), this.geoError.bind(this), this.options);
    }

    private geoSuccess(position: Position): void {
        const newPosition: TLocation = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        };
        this.successCallback(newPosition);
    }

    private  geoError(error: PositionError): void {
        switch (error.code) {
            case error.PERMISSION_DENIED:
                this.error = 'No permission to use geolocation!';
                break;
            case error.POSITION_UNAVAILABLE:
                this.error = 'No network access';
                break;
            case error.TIMEOUT:
                this.error = 'Waiting time exceeded';
                break;
            default:
                throw new Error('Not supported error code');
        }
    }
}
