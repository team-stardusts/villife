class StardustDateParser {
    private static ALIGN_WITH_SERVER = 1000;

    public static deserialize(milliseconds: number): Date {
        return new Date(milliseconds * this.ALIGN_WITH_SERVER);
    }

    public static serialize(date: Date): number {
        return Math.round(date.getTime() / this.ALIGN_WITH_SERVER);
    }

    public static changeGMT(date: Date, GMT: ByGmtType): Date {
        // GMT+{GMT}의 timezone offset(ms)로 변환
        //const gmt = date.getTime() + date.getTimezoneOffset() * 60 * 1000;
        const timezoneOffsetInMs = ByGMT[GMT] * 60 * 60 * 1000;
        //const targetTimestamp = gmt + timezoneOffsetInMs;

        date.setMilliseconds(timezoneOffsetInMs);

        return date;
    }

    public static changeTime(date: Date, time: Time, GMT?: ByGmtType | undefined): Date {
        const timezoneOffsetInMs = ByGMT[GMT || "uk"] * 60 * 60 * 1000;
        return new Date(date.setHours(time.hours, time.min || 0, time.sec || 0, time.ms || 0) + timezoneOffsetInMs);
    }
}

type Time = {
    hours: number;
    min?: number | undefined;
    sec?: number | undefined;
    ms?: number | undefined;
};

const ByGMT = {
    uk: 0,
    kr: 9,
} as const;

export type ByGmtType = keyof typeof ByGMT;

export default StardustDateParser;
