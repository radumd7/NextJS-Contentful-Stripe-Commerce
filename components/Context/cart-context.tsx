import React from "react";
import Cookies from 'js-cookie';
import { CartProduct } from "../../types";

interface CartContextProps {
    addItemToCart: ({ id, size, quantity, image }: CartProduct) => void;
    removeItemFromCart: ({ id, size }: { id: string, size: string }) => void;
    increaseProductQuantity: ({ id, size }: { id: string; size: string; }) => void;
    decreaseProductQuantity: ({ id, size }: { id: string; size: string; }) => void;
    userCart: Array<CartProduct>;
    totalPrice: number;
    totalQuantity: number;
};

interface CartContextProviderProps {
    children: React.ReactNode;
};

const CartContext = React.createContext({} as CartContextProps);

export default function useCartContext() {
    return React.useContext(CartContext);
};

export const CartContextProvider: React.FC<CartContextProviderProps> = ({
    children
}) => {
    const [ userCart, setUserCart ] = React.useState<Array<CartProduct>>([]);
    const [ mounted, setMounted ] = React.useState<boolean>(false);
    const [ totalPrice, setTotalPrice ] = React.useState<number>(0);
    const [ totalQuantity, setTotalQuantity ] = React.useState<number>(0);

    const addItemToCart = ({ id, size, quantity, price, image, title }: CartProduct) => {
        setUserCart( s => [...s, { id, size, quantity, price, image, title }]);
    };

    const removeItemFromCart = ({ id, size }: { id: string, size: string}) => {
        setUserCart( s => s.filter(product => JSON.stringify({ id: product.id, size: product.size }) !== JSON.stringify({ id, size })));
    };

    const increaseProductQuantity = ({ id, size }: { id: string, size: string}) => {
        let newProduct = userCart.filter(product => product.id === id && product.size === size)[0];
        newProduct.quantity += 1;
        setUserCart(s => s.map((product) => {
            if(JSON.stringify({ id: product.id, size: product.size }) === JSON.stringify({ id, size })){
                return newProduct;
            };
            return product;
        }));
    };
    
    const decreaseProductQuantity = ({ id, size }: { id: string, size: string}) => {
        let newProduct = userCart.filter(product => product.id === id && product.size === size)[0];
        newProduct.quantity -= 1;
        if(newProduct.quantity === 0){
            return setUserCart(s => s.filter(product => JSON.stringify({ id: product.id, size: product.size }) !== JSON.stringify({ id, size })));
        };
        return setUserCart(s => s.map((product) => {
            if(JSON.stringify({ id: product.id, size: product.size }) === JSON.stringify({ id, size })){
                return newProduct;
            };
            return product;
        }));
    };

    React.useEffect(() => {
        if(typeof window !== 'undefined'){
            const cart = localStorage.getItem('DemoCart');
            if(cart){
                setUserCart(JSON.parse(cart));
            };
            setMounted(true);
        };
    }, []);

    React.useEffect(() => {
        if(typeof window !== 'undefined'){
            if(mounted){
                localStorage.setItem('DemoCart', JSON.stringify(userCart));
                Cookies.set('UserCart', JSON.stringify(userCart));
            };
            let price: number = 0;
            let quantity: number = 0;
            userCart.forEach((product) => {
                price += product.price * product.quantity;
                quantity += product.quantity;
            });
            setTotalPrice(() => price);
            setTotalQuantity(() => quantity);
        };
    }, [userCart, mounted]);

    const value = {
        userCart,
        totalPrice,
        totalQuantity,
        addItemToCart,
        removeItemFromCart,
        increaseProductQuantity,
        decreaseProductQuantity
    };

    return(
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    );
};