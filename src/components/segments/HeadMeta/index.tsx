import React, { FC } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

interface IHeadMeta {
    title?: string;
    description?: string;
    url?: string;
    image?: string;
    type?: string;
    locale?: "en";
    keywords?: string[];
    article?: {
        type: string;
        title: string;
        description: string;
        social_image: string;
        tags: string[];
    };
}

const HeadMeta: FC<IHeadMeta> = ({
    title,
    url,
    article,
    description = article?.description ? article.description : undefined,
    type = article?.title ? "article" : "website",
    image = article?.social_image ? article.social_image : undefined,
    keywords = Array.isArray(article?.tags) ? article?.tags : undefined,
    locale = "en",
}) => {
    const { asPath } = useRouter();
    // ToDo переписать "siteName"
    const siteName = "WEBSITE";
    const pageTitle = title ? `${title} - ${siteName}` : siteName;
    const currentUrl = `${url || asPath}`;

    return (
        <Head>
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1"
            />
            <meta charSet="utf-8" />
            <title>{pageTitle}</title>
            {description && <meta name="description" content={description} />}
            {keywords && <meta name="keywords" content={keywords?.join(",")} />}

            {/* Open Graph */}
            {url && <meta property="og:url" content={currentUrl} key="url" />}
            {image && <meta property="og:image" content={image} key="image" />}
            {siteName && (
                <meta
                    property="og:site_name"
                    content={siteName}
                    key="siteName"
                />
            )}
            {title && <meta property="og:title" content={title} key="title" />}
            {description && (
                <meta
                    property="og:description"
                    content={description}
                    key="description"
                />
            )}
            {type && <meta property="og:type" content={type} />}
            {locale && <meta property="og:locale" content={locale} />}
        </Head>
    );
};

export default HeadMeta;
