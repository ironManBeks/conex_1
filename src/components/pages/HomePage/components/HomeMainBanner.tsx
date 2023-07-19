import React, { FC } from "react";
import cn from "classnames";

import { H1, P } from "@components/Text";
import ButtonLink from "@components/buttons/ButtonLink";
import ImgWrapper from "@components/globalComponents/ImgWrapper";
import Container from "@components/globalComponents/Container";

import { PATH_BUILDER_PAGE } from "@consts/pathsConsts";
import { TSectionTypes } from "@globalTypes/sectionTypes";
import { EButtonColor } from "@components/buttons/types";

const HomeMainBanner: FC<TSectionTypes> = ({ pageClassPrefix }) => {
    const classPrefix = "main-banner";

    return (
        <div className={cn(`${pageClassPrefix}_${classPrefix}__wrapper`)}>
            <Container>
                <div
                    className={cn(`${pageClassPrefix}_${classPrefix}__content`)}
                >
                    <H1>Commercial Doors</H1>
                    <ImgWrapper
                        src="/images/svg/main-banner.svg"
                        alt="Commercial Doors"
                        width="640"
                        height="402"
                    />
                    <P>
                        leo et aliquam blandit. Pellentesque aliquet eget orci
                        ut iaculis. Praesent purus erat, varius et libero sed,
                        aliquet malesuada sapien. Etiam tempor posuere tortor a
                        pleo et aliquam blandit. Pellentesque aliquet eget orci
                        ut iaculis. Praesent purus erat, varius et libero sed,
                        aliquet malesuada sapien. Etiam tempor posuere tortor a
                        pleo et aliquam blandit. Pellentesque aliquet eget orci
                        ut iaculis. Praesent purus erat, varius et libero sed,
                        aliquet malesuada sapien. Etiam tempor posuere tortor a
                        p
                    </P>
                    <ButtonLink
                        href={PATH_BUILDER_PAGE}
                        color={EButtonColor.secondary}
                    >
                        Find your door
                    </ButtonLink>
                </div>
            </Container>
        </div>
    );
};

export default HomeMainBanner;
