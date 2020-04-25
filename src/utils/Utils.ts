export class Utils {

    public static isNullOrUndefined(value: unknown): boolean {
        return value == null;
    }

    public static buildDateString(separator: string): string {
        const date: Date = new Date();
        const year: string = date.getUTCFullYear().toString();
        const month: string = Utils.fixDateFragment(date.getUTCMonth() + 1);
        const day: string = Utils.fixDateFragment(date.getUTCDate());
        const hour: string = Utils.fixDateFragment(date.getUTCHours());
        const minute: string = Utils.fixDateFragment(date.getUTCMinutes());
        return `${year}${separator}${month}${separator}${day}${separator}${hour}:${minute}`;
    }

    public static fixDateFragment(dateFragment: number): string {
        return dateFragment < 10 ? `0${dateFragment}` : dateFragment.toString();
    }

    public static getLocalStorageData<T>(key: string, defaultValue: T): T {
        let storageDTO: string | null = window.localStorage.getItem(key);
        if (Utils.isNullOrUndefined(storageDTO)) {
            storageDTO = JSON.stringify(defaultValue);
            window.localStorage.setItem(key, storageDTO);
        }
        return JSON.parse(storageDTO ?? '');
    }
}
