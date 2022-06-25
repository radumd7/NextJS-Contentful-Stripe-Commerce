import { GetStaticProps, InferGetStaticPropsType } from "next";
import Head from "next/head";
import Image from "next/image";
import React from "react";
import ProductCard from "../components/UI/ProductCard";
import contentfulClient from "../utils/contentful-client";

export default function HomePage({ heroImage, products }: InferGetStaticPropsType<typeof getStaticProps>) {
    return(
        <>
            <Head>
                <title>Hottest Shoes Deals</title>
                <meta name='description' content='Hottest Shoes Deals Website. Shop Now!'/>
            </Head>
            <div>
                <section className="relative w-full h-screen">
                    <Image
                        src={heroImage.url}
                        alt={heroImage.alt}
                        layout='fill'
                        objectFit="cover"
                        priority
                    />
                    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center z-[1] bg-white/70">
                        <h1 className="text-7xl font-black uppercase text-center">{`It's time to buy stuff.`}</h1>
                    </div>
                </section>
                <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-10 p-4 lg:p-10">
                    {products.items.map((product: any) => (
                        <React.Fragment key={product.sys.id}>
                            <ProductCard
                                product={product}
                            />
                        </React.Fragment>
                    ))}
                </section>
            </div>
        </>
    );
};

export const getStaticProps: GetStaticProps = async () => {
    const homepageContent = await contentfulClient.getEntry('NZXRtTkyHsXKWkfODSbLW');
    const products = await contentfulClient.getEntries({
        content_type: 'podProducts'
    });
    const heroImage = {
        url: 'https:' + (homepageContent.fields as any).heroImage.fields.file.url,
        alt: (homepageContent.fields as any).heroImage.fields.title
    }
    return{
        props: {
            heroImage,
            products
        }
    };
};