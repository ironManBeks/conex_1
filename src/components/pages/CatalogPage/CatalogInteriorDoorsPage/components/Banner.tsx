import { H4 } from "@components/Text";
import ButtonPrimary from "@components/buttons/ButtonPrimary";
import { EButtonColor, EButtonSize } from "@components/buttons/types";
import Image from "next/image";
import { FC } from "react";

interface BannerProps {
    pageClassPrefix: string;
}

const Banner: FC<BannerProps> = ({ pageClassPrefix }) => {
    return (
        <div className={`${pageClassPrefix}__banner`}>
            <div className={`${pageClassPrefix}__banner-content`}>
                <H4 className={`${pageClassPrefix}__banner-header`}>
                    Door measuring and installation
                </H4>

                <div>
                    <ButtonPrimary
                        size={EButtonSize.sm}
                        color={EButtonColor.primary}
                        className={`${pageClassPrefix}__banner-btn priority`}
                        type="submit"
                    >
                        Door measuring and installation
                    </ButtonPrimary>
                </div>
            </div>
            <div className={`${pageClassPrefix}__banner-image`}>
                <Image
                    src="/images/png/interior-doors-banner.png"
                    alt="banner"
                    fill
                />
            </div>
        </div>
    );
};

export default Banner;
