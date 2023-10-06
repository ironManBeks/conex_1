import { FC } from "react";
import { inject, observer } from "mobx-react";

import CheckoutSectionWrapper from "./CheckoutSectionWrapper";
import FieldInputController from "@components/form/formControllers/FieldInputController";
import FieldTextAreaController from "@components/form/formControllers/FieldTextAreaController";

import { TSectionTypes } from "@globalTypes/sectionTypes";
import {
    COMMENT_ORDER_MAX_MESSAGE_LENGTH,
    ECheckoutFormFieldsNames,
} from "@components/pages/CheckoutPage/formAttrs";
import FieldRadioButtonArrayController from "@components/form/formControllers/FieldRadioButtonArrayController";
import { H4, P } from "@components/Text";
import { IconBox } from "@components/Icons";
import dayjs from "dayjs";

type TPickupDTO = {
    id: string;
    title: string;
    description: string;
    deliveryDate: string;
    deliveryTimeFrom: string;
    deliveryTimeTo: string;
};

const PickupMockup: TPickupDTO[] = [
    {
        id: "1",
        title: "short 1",
        description: "Short 1023 Massachusetts Ave, Lexington, MA 02420",
        deliveryDate: "2023-08-30T09:34:14.281Z",
        deliveryTimeFrom: "10:00 am",
        deliveryTimeTo: "16:00 pm",
    },
    {
        id: "2",
        title: "1023 Massachusetts Ave",
        description: "1023 Massachusetts Ave, Lexington, MA 02420",
        deliveryDate: "2023-08-30T09:34:14.281Z",
        deliveryTimeFrom: "08:00 am",
        deliveryTimeTo: "16:00 pm",
    },
    {
        id: "3",
        title: "Long Place3Place3 Place3 Place3Place3 Place3 Place3Place3 Place3 Place3Place3 Place3 Place3Place3 Place3 ",
        description:
            "Long 1023 Massachusetts Ave, Lexington, MA 02420, 1023 Massachusetts Ave, Lexington, MA 02420 1023 Massachusetts Ave, Lexington, MA 02420",
        deliveryDate: "2023-08-30T09:34:14.281Z",
        deliveryTimeFrom: "13:00 pn",
        deliveryTimeTo: "16:00 pm",
    },
];

const CheckoutPickup: FC<TSectionTypes> = inject("store")(
    observer(({ pageClassPrefix }) => {
        const classPrefix = `${pageClassPrefix}_pickup`;

        return (
            <CheckoutSectionWrapper
                pageClassPrefix={pageClassPrefix}
                className={`${classPrefix}__wrapper`}
                title="Pickup point"
            >
                <div className="_row">
                    <FieldInputController
                        name={ECheckoutFormFieldsNames.state}
                        label="State"
                        placeholder="State"
                        className={""}
                    />
                    <FieldInputController
                        name={ECheckoutFormFieldsNames.city}
                        label="Town / City"
                        placeholder="Town / City"
                    />
                </div>
                <FieldRadioButtonArrayController
                    name={ECheckoutFormFieldsNames.pickupPoints}
                    options={PickupMockup.map((item) => ({
                        value: item.id,
                        label: (
                            <>
                                <div className="pickup_title">
                                    <H4>{item.title}</H4>
                                    {item.description && (
                                        <P>{item.description}</P>
                                    )}
                                </div>
                                <div className="pickup_info">
                                    <H4>
                                        <IconBox />{" "}
                                        {dayjs(item.deliveryDate).format(
                                            "MMMM D",
                                        )}
                                    </H4>
                                    <P>
                                        {item.deliveryTimeFrom} -{" "}
                                        {item.deliveryTimeTo}
                                    </P>
                                </div>
                            </>
                        ),
                    }))}
                />
                <FieldTextAreaController
                    name={ECheckoutFormFieldsNames.commentsOrder}
                    label="Comments on the order"
                    placeholder="Comments on the order"
                    minHeight={160}
                    maxSymbolLength={COMMENT_ORDER_MAX_MESSAGE_LENGTH}
                />
            </CheckoutSectionWrapper>
        );
    }),
);

export default CheckoutPickup;
