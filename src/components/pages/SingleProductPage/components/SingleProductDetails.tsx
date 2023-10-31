import { FC } from "react";
import {
    FieldValues,
    FormProvider,
    SubmitHandler,
    useForm,
} from "react-hook-form";

import { H2, P } from "@components/Text";
import CopyText from "@components/globalComponents/CopyText";
import SingleProductOptions from "./SingleProductOptions";
import SingleProductPrice from "./SingleProductPrice";
import SingleProductHeader from "./SingleProductHeader";
import SingleProductOrderInfo from "./SingleProductOrderInfo";

import { notImplemented } from "@helpers/notImplemented";
import { TSingleProductDetailsProps } from "../types";
import { singleProductOptionsFormDefaultValues } from "../utils";

const SingleProductDetails: FC<TSingleProductDetailsProps> = ({
    pageClassPrefix,
    title,
    article,
    price,
    priceOld,
    priceDiscount,
    isAvailable,
    options,
    images,
    delivery,
    payment,
}) => {
    const classPrefix = `${pageClassPrefix}_details`;
    const methods = useForm({
        // resolver: singleProductOptionsFormResolver(),
        defaultValues: singleProductOptionsFormDefaultValues(options),
    });

    const { handleSubmit } = methods;

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        notImplemented(`value: ${JSON.stringify(data)}`);
    };

    return (
        <FormProvider {...methods}>
            <form
                className={`${classPrefix}__wrapper`}
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className={`${classPrefix}__head`}>
                    {article && (
                        <P>
                            {article}
                            <CopyText
                                text={article.toString()}
                                iconProps={{
                                    width: 16,
                                    height: 16,
                                    opacity: "0.36",
                                }}
                            />
                        </P>
                    )}
                    <H2>{title}</H2>
                </div>
                <SingleProductOptions
                    pageClassPrefix={pageClassPrefix}
                    options={options}
                />
                <SingleProductPrice
                    pageClassPrefix={pageClassPrefix}
                    price={price}
                    priceOld={priceOld}
                    priceDiscount={priceDiscount}
                    isAvailable={isAvailable}
                    changeHeaderVisible={true}
                />
                <SingleProductOrderInfo
                    pageClassPrefix={pageClassPrefix}
                    delivery={delivery}
                    payment={payment}
                />
                <SingleProductHeader
                    title={title}
                    price={price}
                    priceOld={priceOld}
                    priceDiscount={priceDiscount}
                    isAvailable={isAvailable}
                    pageClassPrefix={pageClassPrefix}
                    images={images}
                />
            </form>
        </FormProvider>
    );
};

export default SingleProductDetails;
