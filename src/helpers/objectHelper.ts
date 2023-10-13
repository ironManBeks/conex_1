export const copyWithout = <T>(src: T, exclude: string) => {
    const result = {} as T;
    for (const key in src) {
        key !== exclude && (result[key] = src[key]);
    }
    return result;
};
