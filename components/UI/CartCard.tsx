import Image from "next/image";
import Link from "next/link";
import React from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { CartProduct } from "../../types";
import useCartContext from "../Context/cart-context";

const CartCard = ({
    product,
}:{
    product: CartProduct,
}) => {
    const { removeItemFromCart, increaseProductQuantity, decreaseProductQuantity } = useCartContext();
    
    return(
        <>
            <li className="w-full flex space-x-4">
                <div className="w-52 h-52 lg:w-64 lg:h-64 relative shadow-md">
                    <Image
                        src={product.image.url}
                        alt={product.image.alt}
                        layout="fill"
                        objectFit="cover"
                    />
                </div>
                <div className="flex flex-col justify-between">
                    <div>
                        <h2 className="text-lg font-bold tracking-wide">{product.title}</h2>
                        <p>Price: {product.price.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}</p>
                        <p>Size: {product.size}</p>
                    </div>
                    <div className="flex flex-col justify-end space-y-4">
                        <p className="font-semibold">Quantity: </p>
                        <div
                            className="w-full flex items-center space-x-2 justify-between"
                        >
                            <button
                                onClick={() => decreaseProductQuantity({
                                    id: product.id,
                                    size: product.size
                                })}
                            >
                                <AiOutlineMinus/>
                            </button>
                            <p>{product.quantity}</p>
                            <button
                                onClick={() => increaseProductQuantity({
                                    id: product.id,
                                    size: product.size
                                })}
                            >
                                <AiOutlinePlus/>
                            </button>
                        </div>
                        <button
                            onClick={() => {
                                removeItemFromCart({
                                    id: product.id,
                                    size: product.size
                                });
                            }}
                            className="border border-black rounded-lg px-8 py-2 text-sm font-semibold"
                        >
                            Remove From Cart
                        </button>
                    </div>
                </div>
            </li>
        </>
    );
};

export default CartCard;