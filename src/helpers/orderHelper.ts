import { TCreateDoorRequest } from "@store/order/types";
import { TCartItem } from "@store/builder/types";

export const convertDoorDataToCreateDoorRequest = (
    data: TCartItem,
): TCreateDoorRequest => {
    const fieldsWithValues: Record<string, unknown> = {};
    let price = 0;

    for (let i = 0; i < data.doorData.length; i++) {
        const step = data.doorData[i];
        for (let j = 0; j < step.fields.length; j++) {
            const field = step.fields[j];
            for (let k = 0; k < field.elements.length; k++) {
                const element = field.elements[k];
                if (field.fieldName) {
                    price = price + element.price;
                    fieldsWithValues[field.fieldName] = element.value;
                }
            }
        }
    }

    return {
        price: price,
        data: fieldsWithValues,
    };
};
