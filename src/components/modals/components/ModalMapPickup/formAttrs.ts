import { Resolver } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export enum EMapPickupFormFieldsNames {
    search = "search",
    pickupPoints = "pickupPoints",
}

export type TMapPickupForm = {
    [EMapPickupFormFieldsNames.pickupPoints]: string;
};

export const mapPickupFormDefaultValues: TMapPickupForm = {
    [EMapPickupFormFieldsNames.pickupPoints]: "",
};
export const mapPickupFormResolver = (): Resolver<TMapPickupForm> => {
    const requiredText = "This field is required";

    return yupResolver(
        yup.object().shape({
            [EMapPickupFormFieldsNames.pickupPoints]: yup
                .string()
                .required(requiredText),
        }),
    );
};
