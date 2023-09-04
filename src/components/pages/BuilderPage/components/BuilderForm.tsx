import { FC } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { inject, observer } from "mobx-react";

import BuilderProgress from "./BuilderProgress";
import BuilderStepLayout from "./BuilderStepLayout";
import BuilderRightSide from "./BuilderRightSide";
import BuilderFormActions from "./BuilderStepActions";

import { TBuilderCompProps } from "../types";
import { IRoot } from "@store/store";
import { builderFormResolver } from "../utils";

const BuilderForm: FC<TBuilderCompProps> = inject("store")(
    observer(({ store, pageClassPrefix }) => {
        const { builderStore } = store as IRoot;
        const { currentStepId, currentStepData } = builderStore;

        const methods = useForm({
            resolver: builderFormResolver(
                currentStepId,
                currentStepData?.attributes,
            ),
            defaultValues: undefined,
        });

        return (
            <FormProvider {...methods}>
                <form action="">
                    <BuilderProgress pageClassPrefix={pageClassPrefix} />
                    <div className={`${pageClassPrefix}_content__wrapper`}>
                        <div
                            className={`${pageClassPrefix}_left-side__wrapper`}
                        >
                            <BuilderStepLayout
                                pageClassPrefix={pageClassPrefix}
                            />
                        </div>
                        <BuilderRightSide pageClassPrefix={pageClassPrefix} />
                    </div>
                    <BuilderFormActions pageClassPrefix={pageClassPrefix} />
                </form>
            </FormProvider>
        );
    }),
);

export default BuilderForm;
