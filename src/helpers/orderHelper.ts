import { TCreateDoorRequest } from "@store/order/types";
import { TCartItem } from "@store/builder/types";

const convertDoorDataToCreateDoorRequest = (
    data: TCartItem,
): TCreateDoorRequest => {
    const result = {
        price: 123,
        data: { test: "123" },
    };
    return result;
};
