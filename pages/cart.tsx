import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import React from "react";
import useCartContext from "../components/Context/cart-context";
import CartCard from "../components/UI/CartCard";
import { CartProduct } from "../types";

const CartPage = ({ products, serverCartPrice }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    const [ renderProducts, setRenderProducts ] = React.useState<Array<CartProduct>>(products);
    const [ cartPrice, setCartPrice ] = React.useState<number>(serverCartPrice);
    const { userCart, totalPrice } = useCartContext();

    React.useEffect(() => {
        if(JSON.stringify(userCart) !== JSON.stringify(renderProducts)){
            setRenderProducts(userCart);
        }
    }, [userCart]);

    React.useEffect(() => {
        setCartPrice(totalPrice);
    }, [totalPrice]);

    if(!renderProducts.length){
        return(
            <div className="py-20 min-h-screen flex items-center justify-center">
                No products in cart.
            </div>
        );
    }

    return(
        <div className="pt-20 pb-4 lg:pb-10 min-h-screen container mx-auto flex flex-col items-center justify-between gap-4 lg:gap-10">
            <section className="w-full">
                <ul className="grid grid-cols-1 lg:grid-cols-2 w-full gap-4 p-4">
                    {
                        renderProducts.map((product: CartProduct, index: number) => {
                            return(
                                <React.Fragment key={product.title + index.toString()}>
                                    <CartCard product={product}/>
                                </React.Fragment>
                            );
                        })
                    }
                </ul>
            </section>
            <aside className="grid grid-cols-1 w-full gap-4 px-4 lg:max-w-screen-md lg:mx-auto">
                <p><strong>Total price:</strong> {cartPrice.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}</p>
                <form method="post" action="/api/stripe" className='flex w-full flex-col'>
                    <button type='submit' className="bg-black text-white p-2.5 rounded-lg text-sm font-semibold">Complete Purchase</button>
                </form>
            </aside>
        </div>
    );
};
export default CartPage;

export const getServerSideProps: GetServerSideProps = async(context) => {
    const { req } = context;
    if(!req.cookies.UserCart){
        return{
            props: {
                products: [],
            }
        };
    };
    const userCart: Array<CartProduct> = JSON.parse(req.cookies.UserCart);
    let price: number = 0;
    userCart.forEach((product) => {
        price += product.price * product.quantity;
    });
    return{
        props: {
            products: userCart,
            serverCartPrice: price
        }
    };
};