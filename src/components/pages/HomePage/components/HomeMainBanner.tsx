import React, { FC } from "react";
import cn from "classnames";

import { H1, P } from "@components/Text";
import ButtonLink from "@components/buttons/ButtonLink";
import ImgWrapper from "@components/globalComponents/ImgWrapper";
import Container from "@components/globalComponents/Container";

import { PATH_BUILDER_PAGE } from "@consts/pathsConsts";
import { TSectionTypes } from "@globalTypes/sectionTypes";
import { EButtonColor, EButtonSize } from "@components/buttons/types";

const HomeMainBanner: FC<TSectionTypes> = ({ pageClassPrefix }) => {
    const classPrefix = `${pageClassPrefix}_main-banner`;

    return (
        <div className={cn(`${classPrefix}__wrapper`)}>
            <Container>
                <div className={cn(`${classPrefix}__image`)}>
                    <ImgWrapper
                        src="/images/svg/main-banner.svg"
                        alt="Commercial Doors"
                        objectFit={"contain"}
                    />
                </div>
                <div className={cn(`${classPrefix}__content`)}>
                    <H1>Commercial Doors</H1>
                    <P>
                        leo et aliquam blandit. Pellentesque aliquet eget orci
                        ut iaculis. Praesent purus erat, varius et libero sed,
                        aliquet malesuada sapien
                    </P>
                    <div className={cn(`${classPrefix}__actions`)}>
                        <ButtonLink
                            href={PATH_BUILDER_PAGE}
                            color={EButtonColor.primary}
                            size={EButtonSize.lg}
                        >
                            Door builder{" "}
                        </ButtonLink>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default HomeMainBanner;
