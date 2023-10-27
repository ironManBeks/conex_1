import { TSingleProductOptions } from "@store/products/types";

export const singleProductOptionsFormDefaultValues = (
    options: TSingleProductOptions[],
): Record<string, string> | undefined => {
    if (!options.length) return undefined;
    const result: Record<string, string> = {};

    for (let i = 0; i < options.length; i++) {
        const item = options[i];
        if (item.list.length) {
            result[item.optionsName] = item.list[0].value;
        }
    }

    return result;
};
