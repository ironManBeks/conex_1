import { FC, useCallback, useMemo } from "react";
import cn from "classnames";
import { inject, observer } from "mobx-react";
import { isEmpty } from "lodash";
import { useMediaQuery } from "react-responsive";

import AddedOptionsList from "@components/globalComponents/AddedOptionsList";
import AdditionalServices from "@components/globalComponents/AdditionalServices";
import { H3 } from "@components/Text";

import { TBuilderCompProps } from "../types";
import { IRoot } from "@store/store";
import {
    getTotalPriceByResultData,
    renderResultDataToOptionsList,
} from "@helpers/builderHelper";
import { mediaBreakpoints } from "@assets/theme/mediaBreakpointsTheme";
import DrawerBuilder from "@components/drawers/components/DrawerBuilder";
import { IconArrowSingle } from "@components/Icons";
import { EArrowDirection } from "@components/Icons/types";

const BuilderRightSide: FC<TBuilderCompProps> = inject("store")(
    observer(({ store, pageClassPrefix }) => {
        const { builderStore, commonStore } = store as IRoot;
        const {
            resultDoorData,
            stepHistory,
            updateCurrentStepData,
            currentStepData,
        } = builderStore;
        const { setBuilderDrawerVisible } = commonStore;
        const classPrefix = `${pageClassPrefix}_right-side`;

        const isMobile = useMediaQuery({
            minWidth: mediaBreakpoints.xsMedia,
            maxWidth: mediaBreakpoints.smMediaEnd,
        });

        const optionsList = useCallback(
            () =>
                renderResultDataToOptionsList(
                    resultDoorData,
                    updateCurrentStepData,
                    stepHistory,
                    currentStepData,
                ),
            [
                resultDoorData,
                updateCurrentStepData,
                stepHistory,
                currentStepData,
            ],
        );

        const totalPrice = useCallback(
            () => getTotalPriceByResultData(resultDoorData),
            [resultDoorData],
        );

        const content = useMemo(() => {
            return (
                <div
                    className={cn(`${classPrefix}__wrapper`)}
                    style={{
                        paddingTop: !isEmpty(currentStepData) ? "96px" : 0,
                    }}
                >
                    <div className={cn(`${classPrefix}__inner-wrapper`)}>
                        <div className={cn(`${classPrefix}__head`)}>
                            <H3 className={cn(`${classPrefix}__title`)}>
                                Price Estimate
                            </H3>
                        </div>
                        <AddedOptionsList optionsList={optionsList()} />
                        <AdditionalServices
                            options={[]}
                            totalOption={{
                                label: "Grand Total",
                                value: `$${totalPrice()}`,
                            }}
                        />
                    </div>
                </div>
            );
        }, [resultDoorData, stepHistory, currentStepData]);

        return isMobile ? (
            <>
                <div
                    className={cn(`${pageClassPrefix}_drawer-button__wrapper`)}
                    onClick={() => {
                        setBuilderDrawerVisible(true);
                    }}
                >
                    Price Estimate
                    <IconArrowSingle direction={EArrowDirection.top} />
                </div>
                <DrawerBuilder>{content}</DrawerBuilder>
            </>
        ) : (
            content
        );
    }),
);

export default BuilderRightSide;
