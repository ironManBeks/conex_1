import { Layout } from "@components/segments/Layout";

import HomeMainBanner from "@components/pages/HomePage/components/HomeMainBanner";
import HomeHowItWorks from "@components/pages/HomePage/components/HomeHowItWorks";
import HomeCallUs from "@components/pages/HomePage/components/HomeCallUs";

const HomePage = () => {
    const classPrefix = "home-page";

    return (
        <Layout pageClassPrefix={classPrefix}>
            <HomeMainBanner pageClassPrefix={classPrefix} />
            <HomeHowItWorks pageClassPrefix={classPrefix} />
            <HomeCallUs pageClassPrefix={classPrefix} />
        </Layout>
    );
};

export default HomePage;
