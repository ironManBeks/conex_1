import React, { FC } from "react";
import cn from "classnames";

import { H2, P } from "@components/Text";
import Container from "@components/globalComponents/Container";
import HowItWorksItem from "./HowItWorksItem";

import { TSectionTypes } from "@globalTypes/sectionTypes";

const HomeHowItWorks: FC<TSectionTypes> = ({ pageClassPrefix }) => {
    const classPrefix = "how-it-works";

    return (
        <div className={cn(`${pageClassPrefix}_${classPrefix}__wrapper`)}>
            <Container>
                <div className={`${pageClassPrefix}_${classPrefix}__content`}>
                    <H2 className={`${pageClassPrefix}_${classPrefix}__title`}>
                        How it works
                    </H2>
                    <div className={`${pageClassPrefix}_${classPrefix}__list`}>
                        <div
                            className={`${pageClassPrefix}_${classPrefix}__column`}
                        >
                            <HowItWorksItem
                                classPrefix={classPrefix}
                                title="1. Fill the survey"
                                description="loren ipdun ,lbhm,.mhhgy okty klploren ipdun ,lbhm,.mhhgy oloren ipdun ,lbhm,.mhhgy okty klp iol;gfddkty klp iol;gfdd iol;gfdd"
                                src="/images/svg/how-it-work-step-1.svg"
                                imgWidth={220}
                                imgHeight={174}
                            />
                        </div>
                        <div
                            className={`${pageClassPrefix}_${classPrefix}__column`}
                        >
                            <HowItWorksItem
                                classPrefix={classPrefix}
                                title="2. Add to cart doors that you liked"
                                description="loren ipdun ,lbhm,.mhhgy oloren ipdun ,lbhm,.mhhgy okty klp iol;gfddkty klp iol;gfdd"
                            />
                            <HowItWorksItem
                                classPrefix={classPrefix}
                                title="3. Make a payment"
                                src="/images/svg/how-it-work-step-3.svg"
                                imgWidth={212}
                                imgHeight={155}
                            />
                        </div>
                        <div
                            className={`${pageClassPrefix}_${classPrefix}__column`}
                        >
                            <HowItWorksItem
                                classPrefix={classPrefix}
                                title="4. Get your order delivered in 3 to 14 days"
                                description="loren ipdun ,lbhm,.mhhgy oloren ipdun ,lbhm,.mhhgy okty klp iol;gfddkty klp iol;gfdd"
                                src="/images/svg/how-it-work-step-4.svg"
                                imgWidth={256}
                                imgHeight={163}
                            />
                        </div>
                    </div>
                    <P
                        className={cn(
                            `${pageClassPrefix}_${classPrefix}__description`,
                        )}
                    >
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
                </div>
            </Container>
        </div>
    );
};

export default HomeHowItWorks;
