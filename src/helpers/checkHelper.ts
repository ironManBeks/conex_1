export const isColorHex = (value: string): boolean => {
    const reg = /^#([0-9a-f]{3}){1,2}$/i;
    return reg.test(value);
};
