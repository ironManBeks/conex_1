import React, { FC } from "react";
import cn from "classnames";

import { H2 } from "@components/Text";
import ButtonLink from "@components/buttons/ButtonLink";
import Container from "@components/globalComponents/Container";

import { PATH_BUILDER_PAGE } from "@consts/pathsConsts";
import { TSectionTypes } from "@globalTypes/sectionTypes";
import { EButtonColor, EButtonSize } from "@components/buttons/types";

const HomeCallUs: FC<TSectionTypes> = ({ pageClassPrefix }) => {
    const classPrefix = `${pageClassPrefix}_call-us`;

    return (
        <div className={cn(`${classPrefix}__wrapper`)}>
            <Container>
                <div className={cn(`${classPrefix}__content`)}>
                    <H2 className={cn(`${classPrefix}__title`)}>
                        Don’t know what are you looking for?
                    </H2>
                    <ButtonLink
                        href={PATH_BUILDER_PAGE}
                        color={EButtonColor.primary}
                        size={EButtonSize.lg}
                    >
                        Door builder{" "}
                    </ButtonLink>
                </div>
            </Container>
        </div>
    );
};

export default HomeCallUs;
