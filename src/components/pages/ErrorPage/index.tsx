import { FC } from "react";
import dynamic from "next/dynamic";

import { Layout } from "@components/segments/Layout";
import { H2, P } from "@components/Text";
import ButtonLink from "@components/buttons/ButtonLink";
import Container from "@components/globalComponents/Container";
import ImgWrapper from "@components/globalComponents/ImgWrapper";

import { PATH_HOME_PAGE } from "@consts/pathsConsts";
import { EButtonColor } from "@components/buttons/types";
import { mediaBreakpoints } from "@common/theme/mediaBreakpointsTheme";

const MediaQuery = dynamic(() => import("react-responsive"), { ssr: false });
import { useMediaQuery } from "react-responsive";

const ErrorPage: FC = () => {
    const classPrefix = "error-page";

    const basicCloudImgProps = {
        src: "/images/svg/cloud-1.svg",
        width: 200,
        height: 70,
    };
    const cloudBasicClassName = `${classPrefix}_cloud`;

    const isMobile = useMediaQuery({
        minWidth: mediaBreakpoints.xsMedia,
        maxWidth: mediaBreakpoints.xsMediaEnd,
    });

    return (
        <Layout pageClassPrefix="error-page">
            <div className={`${classPrefix}_wrapper`}>
                <MediaQuery minWidth={mediaBreakpoints.mdMedia}>
                    <ImgWrapper
                        {...basicCloudImgProps}
                        objectFit="contain"
                        wrapperClassName={`${cloudBasicClassName} _1`}
                    />
                    <ImgWrapper
                        {...basicCloudImgProps}
                        objectFit="contain"
                        wrapperClassName={`${cloudBasicClassName} _2`}
                    />
                    <ImgWrapper
                        {...basicCloudImgProps}
                        objectFit="contain"
                        wrapperClassName={`${cloudBasicClassName} _3`}
                    />
                    <ImgWrapper
                        {...basicCloudImgProps}
                        objectFit="contain"
                        wrapperClassName={`${cloudBasicClassName} _4`}
                    />
                    <ImgWrapper
                        {...basicCloudImgProps}
                        objectFit="contain"
                        wrapperClassName={`${cloudBasicClassName} _5`}
                    />
                </MediaQuery>
                <div className={`${classPrefix}_inner-wrapper`}>
                    <Container flexJustifyContent="center">
                        <MediaQuery minWidth={mediaBreakpoints.mdMedia}>
                            <ImgWrapper
                                src="/images/svg/error-bg.png"
                                wrapperClassName={`${classPrefix}_bg`}
                            />
                        </MediaQuery>
                        <div className={`${classPrefix}_content__wrapper`}>
                            <MediaQuery maxWidth={mediaBreakpoints.smMediaEnd}>
                                <ImgWrapper
                                    src="/images/svg/error-404-mobile.svg"
                                    height={isMobile ? 230 : 300}
                                />
                            </MediaQuery>
                            <MediaQuery minWidth={mediaBreakpoints.mdMedia}>
                                <ImgWrapper
                                    src="/images/svg/error-404.svg"
                                    height={390}
                                />
                            </MediaQuery>
                            <H2>Error 404</H2>
                            <P>
                                There is no such page or it has never been
                                created
                            </P>
                            <div className={`${classPrefix}_content__actions`}>
                                <ButtonLink
                                    href={PATH_HOME_PAGE}
                                    color={EButtonColor.primary}
                                >
                                    Home page
                                </ButtonLink>
                            </div>
                        </div>
                    </Container>
                </div>
            </div>
        </Layout>
    );
};

export default ErrorPage;
