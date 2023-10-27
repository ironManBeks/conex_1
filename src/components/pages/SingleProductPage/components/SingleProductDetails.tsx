import { FC } from "react";
import {
    FieldValues,
    FormProvider,
    SubmitHandler,
    useForm,
} from "react-hook-form";

import { H2, H4, P } from "@components/Text";
import CopyText from "@components/globalComponents/CopyText";
import ButtonPrimary from "@components/buttons/ButtonPrimary";
import SingleProductOptions from "@components/pages/SingleProductPage/components/SingleProductOptions";

import { notImplemented } from "@helpers/notImplemented";
import { TSingleProductDetailsProps } from "../types";
import { EButtonColor } from "@components/buttons/types";
import { singleProductOptionsFormDefaultValues } from "@components/pages/SingleProductPage/utils";

const SingleProductDetails: FC<TSingleProductDetailsProps> = ({
    pageClassPrefix,
    title,
    article,
    price,
    priceOld,
    priceDiscount,
    isAvailable,
    options,
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
                <div className={`${classPrefix}__total`}>
                    <H4>
                        ${price}
                        {priceOld && (
                            <>
                                {priceDiscount && (
                                    <span>
                                        <span className="discount">
                                            -{priceDiscount}%
                                        </span>
                                    </span>
                                )}
                                <span>
                                    <span className="old">${priceOld}</span>
                                </span>
                            </>
                        )}
                    </H4>
                    <ButtonPrimary
                        color={
                            isAvailable
                                ? EButtonColor.primary
                                : EButtonColor.secondary
                        }
                        type="submit"
                        disabled={!isAvailable}
                    >
                        {isAvailable ? "To cart" : "Notify us when it arrives"}
                    </ButtonPrimary>
                </div>
            </form>
        </FormProvider>
    );
};

export default SingleProductDetails;
