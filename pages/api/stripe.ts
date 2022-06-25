import Cookies from "js-cookie";
import { NextApiRequest, NextApiResponse } from "next";
import { CartProduct } from "../../types";

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const userCart = JSON.parse(req.cookies.UserCart).map((product: CartProduct) => ({
            price_data: {
                currency: 'eur',
                product_data: {
                    name: product.title,
                    images: [product.image.url]
                },
                unit_amount: product.price * 100
            },
            quantity: product.quantity
        }));
        const params = {
            submit_type: 'pay',
            mode: 'payment',
            payment_method_types: ['card'],
            billing_address_collection: 'auto',
            // shipping_options: [
            //     {
            //         shipping_rate: ''
            //     }
            // ],
            line_items: userCart,
            success_url: req.headers.origin + '/success',
            cancel_url: req.headers.origin + '/cart'
        };
        try {
            const session = await stripe.checkout.sessions.create(params);
            res.redirect(303, session.url);
        } catch (err) {
            res.status((err as any).statusCode || 500).json((err as any).message);
        }
    } else {
        res.setHeader('Allow', 'POST');
        res.status(405).end('Method Not Allowed');
    }
};