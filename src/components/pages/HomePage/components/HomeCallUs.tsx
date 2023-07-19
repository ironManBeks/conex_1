import React, { FC } from "react";
import cn from "classnames";

import { H2 } from "@components/Text";
import ButtonLink from "@components/buttons/ButtonLink";
import Container from "@components/globalComponents/Container";

import { PATH_CONTACTS_US_PAGE } from "@consts/pathsConsts";
import { TSectionTypes } from "@globalTypes/sectionTypes";
import { EButtonColor } from "@components/buttons/types";

const HomeCallUs: FC<TSectionTypes> = ({ pageClassPrefix }) => {
    const classPrefix = "call-us";

    return (
        <div className={cn(`${pageClassPrefix}_${classPrefix}__wrapper`)}>
            <Container>
                <div
                    className={cn(`${pageClassPrefix}_${classPrefix}__content`)}
                >
                    <H2
                        className={cn(
                            `${pageClassPrefix}_${classPrefix}__title`,
                        )}
                    >
                        Don’t know what are you looking for?
                    </H2>
                    <ButtonLink
                        href={PATH_CONTACTS_US_PAGE}
                        color={EButtonColor.primary}
                    >
                        Call us
                    </ButtonLink>
                </div>
            </Container>
        </div>
    );
};

export default HomeCallUs;
