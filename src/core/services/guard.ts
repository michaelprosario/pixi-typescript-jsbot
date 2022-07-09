export class Guard {
    public static notNull(thing: any, message: string) {
        if (!thing) {
            throw new Error(message);
        }
    }
}