import Image from "next/image";
import Link from "next/link";
import React from "react";
import { ProductInterface } from "../../types";

const ProductCard: React.FC<{ product: ProductInterface }> = ({
    product
}) => {
    return(
        <Link href={'/'+product.fields.slug} passHref>
            <a>
                <article className="flex flex-col">
                    <div className="w-full aspect-w-1 aspect-h-1 relative shadow-sm rounded-xl mb-2">
                        <Image
                            src={'https:'+product.fields.images[0].fields.file.url}            
                            alt={product.fields.images[0].fields.title}
                            layout="fill"
                            objectFit="cover"
                            className="rounded-xl"         
                        />
                    </div>
                    <h2 className="font-semibold">{product.fields.title}</h2>
                    <p>
                        {
                            product.fields.price.toLocaleString('de-DE', {
                                style: 'currency',
                                currency: 'EUR'
                            })
                        }
                    </p>
                </article>
            </a>
        </Link>
    );
};
export default ProductCard;