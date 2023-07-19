import { FC } from "react";
import cn from "classnames";

import { H3, H5, P } from "@components/Text";

import { TBuilderRightSide } from "../types";

const BuilderRightSide: FC<TBuilderRightSide> = ({ pageClassPrefix }) => {
    const classPrefix = `${pageClassPrefix}_right-side`;

    return (
        <div className={cn(`${classPrefix}__wrapper`)}>
            <div className={cn(`${classPrefix}__inner-wrapper`)}>
                <div className={cn(`${classPrefix}__content`)}>
                    <H3>Price Estimate</H3>
                </div>
                <div className={cn(`${classPrefix}__total _wrapper`)}>
                    <div className={cn(`${classPrefix}__total _charges`)}>
                        <H5>Additional charges</H5>
                        <P>$23.00</P>
                    </div>
                    <div className={cn(`${classPrefix}__total _grand`)}>
                        <H5>Grand Total</H5>
                        <P>$2,323.00</P>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BuilderRightSide;
