import { AppProps } from "next/dist/shared/lib/router/router";
import { UIContextProvider } from "../components/Context/ui-context";
import Layout from "../components/UI/Layout";
import '../styles/globals.css';
import 'keen-slider/keen-slider.min.css';
import { CartContextProvider } from "../components/Context/cart-context";

export default function MyApp({ Component, pageProps }: AppProps) {
    return(
        <CartContextProvider>
            <UIContextProvider>
                <Layout>
                    <Component {...pageProps}/>
                </Layout>
            </UIContextProvider>
        </CartContextProvider>
    );
};