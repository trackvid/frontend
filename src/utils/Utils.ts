export class Utils {

    public static isNullOrUndefined(value: unknown): boolean {
        return value == null;
    }

    public static buildDateString(separator: string): string {
        const date: Date = new Date();
        return `${date.getUTCFullYear()}${separator}${date.getUTCMonth() + 1}${separator}${date.getUTCDate()}${separator}${date.getUTCHours()}:${date.getUTCMinutes()}`;
    }
}
