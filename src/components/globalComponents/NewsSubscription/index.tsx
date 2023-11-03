import React, { FC } from "react";
import cn from "classnames";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { inject, observer } from "mobx-react";

import Container from "@components/globalComponents/Container";
import { H3, P } from "@components/Text";
import FieldInputController from "@components/form/formControllers/FieldInputController";
import ButtonPrimary from "@components/buttons/ButtonPrimary";

import { TNewsSubscriptionProps } from "../types";
import {
    ENewsSubscriptionFormFieldsNames,
    newsSubscriptionFormDefaultValues,
    newsSubscriptionFormResolver,
    TNewsSubscriptionForm,
} from "./formAttrs";
import { IRoot } from "@store/store";
import { EButtonColor, EButtonSize } from "@components/buttons/types";

const NewsSubscription: FC<TNewsSubscriptionProps> = inject("store")(
    observer(({ store, wrapperClassName }) => {
        const classPrefix = "news-subscription";
        const { commonStore } = store as IRoot;
        const { newsSubscriptionRequest, newsSubscriptionFetching } =
            commonStore;

        const methods = useForm<TNewsSubscriptionForm>({
            resolver: newsSubscriptionFormResolver(),
            defaultValues: newsSubscriptionFormDefaultValues,
        });

        const { handleSubmit } = methods;

        const onSubmit: SubmitHandler<TNewsSubscriptionForm> = (data) => {
            newsSubscriptionRequest(
                data[ENewsSubscriptionFormFieldsNames.email],
            );
        };

        return (
            <div className={cn(`${classPrefix}_wrapper`, wrapperClassName)}>
                <Container flexJustifyContent="space-between">
                    <div className={`${classPrefix}_content`}>
                        <H3>Stay up to date with the news</H3>
                        <P>
                            By subscribing to the newsletter, I consent to the
                            processing of personal data and to receive
                            promotional messages and news about products and
                            services
                        </P>
                    </div>
                    <FormProvider {...methods}>
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className={`${classPrefix}_form`}
                        >
                            <div className={`${classPrefix}_form__field`}>
                                <FieldInputController
                                    name={
                                        ENewsSubscriptionFormFieldsNames.email
                                    }
                                    placeholder="Email"
                                    label="Email"
                                />
                                <div className={`${classPrefix}_form__actions`}>
                                    <ButtonPrimary
                                        type="submit"
                                        color={EButtonColor.primary}
                                        size={EButtonSize.lg}
                                        disabled={newsSubscriptionFetching}
                                        isLoading={newsSubscriptionFetching}
                                    >
                                        Send
                                    </ButtonPrimary>
                                </div>
                            </div>
                            <P>
                                This site is protected by reCAPTCHA and is
                                subject to Google's privacy policy and terms of
                                use.
                            </P>
                        </form>
                    </FormProvider>
                </Container>
            </div>
        );
    }),
);

export default NewsSubscription;
