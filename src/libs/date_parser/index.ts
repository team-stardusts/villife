class StardustDateParser {
    public static deserialize(milliseconds: number): Date {
        return new Date(milliseconds * 1000);
    }

    public static serialize(date: Date): number {
        return date.getTime() / 1000;
    }
}

export default StardustDateParser;
