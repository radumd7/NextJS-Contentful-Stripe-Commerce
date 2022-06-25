import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import contentfulClient from "../utils/contentful-client";
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import React from "react";
import ImageSlider from "../components/UI/ImageSlider";
import useCartContext from "../components/Context/cart-context";
import Link from "next/link";
import Head from "next/head";

const ProductPage = ({ product }: InferGetStaticPropsType<typeof getStaticProps>) => {
    const [ desiredSize, setDesiredSize ] = React.useState<string>('');
    const [ isItemAdded, setIsItemAdded ] = React.useState<boolean>(false);
    const { userCart, addItemToCart } = useCartContext();

    React.useEffect(() => {
        setIsItemAdded(userCart.filter(p => JSON.stringify({ id: p.id, size: p.size }) === JSON.stringify({ id: product.sys.id, size: desiredSize })).length > 0);
    }, [userCart, desiredSize]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(desiredSize && !isItemAdded){
            addItemToCart({
                id: product.sys.id,
                size: desiredSize,
                quantity: 1,
                price: product.fields.price,
                title: product.fields.title,
                image: {
                    url: 'https:'+ product.fields.images[0].fields.file.url,
                    alt: product.fields.title
                }
            });
        }
    };

    return(
        <>
            <Head>
                <title>{product.fields.title + ' | Hottest Shoes Deals'}</title>
                <meta name='description' content={product.fields.seoDescription}/>
            </Head>
            <article className="py-20 grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-10 lg:px-10">
                <section className="w-full">
                    <ImageSlider
                        images={product.fields.images.map((image: any) => ({ url: 'https:'+image.fields.file.url, alt: image.fields.title }))}
                    />
                </section>
                <div className="flex flex-col space-y-4 lg:space-y-10 p-4 lg:p-10">
                    <section
                        className="flex flex-col space-y-4 lg:space-y-10"
                    >
                        <h1
                            className="text-2xl lg:text-4xl font-black uppercase tracking-wide"
                        >{product.fields.title}</h1>
                        <p
                            className="lg:text-2xl font-bold"
                        >
                            {
                                product.fields.price.toLocaleString('de-DE', {
                                    style: 'currency',
                                    currency: 'EUR'
                                })
                            }
                        </p>
                        {
                            documentToReactComponents(product.fields.description)
                        }
                    </section>
                    <aside>
                        <form
                            className="flex flex-col space-y-4 lg:space-y-10"
                            onSubmit={handleSubmit}
                        >
                            <p className="lg:text-xl font-bold">Sizes: </p>
                            <ul className="grid grid-cols-4">
                                {product.fields.sizes.map((size: string) => (
                                    <li key={size} className="flex items-center">
                                        <input
                                            name={'size:'+size}
                                            type='radio'
                                            value={size}
                                            readOnly
                                            checked={desiredSize === size}
                                            onChange={(e) => setDesiredSize(e.target.value)}
                                            disabled={userCart.filter(p => p.size === size).length > 0}
                                        />
                                        <label htmlFor={'size:'+size} className="text-sm ml-2">{userCart.filter(p => p.size === size).length > 0 ? size+'(Added)' : size}</label>
                                    </li>
                                ))}
                            </ul>
                            {
                                isItemAdded ? (
                                    <Link href='/cart' passHref>
                                        <a className="bg-black text-white p-2.5 rounded-lg flex w-full items-center justify-center text-sm font-semibold">
                                            Proceed To Checkout
                                        </a>
                                    </Link>
                                ) : (
                                    <button
                                        type='submit'
                                        className="bg-black text-white p-2.5 rounded-lg text-sm font-semibold"
                                        disabled={!desiredSize || isItemAdded}
                                    >
                                        Add To Cart
                                    </button>
                                )
                            }
                        </form>
                    </aside>
                </div>
            </article>
        </>
    );
};
export default ProductPage;

export const getStaticPaths: GetStaticPaths = async () => {
    const products = await contentfulClient.getEntries({ content_type: 'podProducts' });
    const paths = products.items.map((product: any) => ({ params: { slug: product.fields.slug }}));
    return{
        paths,
        fallback: false
    };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const product = await contentfulClient.getEntries({
        content_type: 'podProducts',
        'fields.slug': params?.slug as string
    });
    return{
        props: {
            product: product.items[0],
        },
        revalidate: 60
    };
};