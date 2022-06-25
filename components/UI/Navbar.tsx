import Link from "next/link";
import React from "react";
import { MdMenu, MdShoppingCart } from "react-icons/md";
import useCartContext from "../Context/cart-context";
import useUIContext from "../Context/ui-context";

export default function Navbar() {
    const { totalQuantity } = useCartContext();
    return(
        <header className='bg-black text-white h-16 p-4 fixed top-0 left-0 w-full z-10 grid grid-cols-2 lg:grid-cols-3 items-center'>
            <nav className="hidden w-full h-full lg:flex items-center">
                <ul className="flex items-center space-x-4 font-medium">
                    {
                        [
                            { display: 'Homepage', url: '/' },
                            { display: 'Shop', url: '/shop' },
                            { display: 'About', url: '/about' },
                        ].map((link) => (
                            <React.Fragment key={link.url}>
                                <li>
                                    <Link href={link.url} passHref>
                                        <a>{link.display}</a>
                                    </Link>
                                </li>
                            </React.Fragment>
                        ))
                    }
                </ul>
            </nav>
            <figure className="w-full flex items-center lg:justify-center">
                <Link href='/' passHref>
                    <a className="text-sm font-black uppercase"> Logo. </a>
                </Link>
            </figure>
            <div className="w-full flex items-center justify-end space-x-2 text-xl h-full">
                <Link href='/cart' passHref>
                    <a className="relative h-full flex items-center">
                        <div className="relative">
                            <MdShoppingCart className="relative"/>
                        </div>
                        {
                            totalQuantity > 0 && (
                                <div className="absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full text-[10px] font-bold font-mono z-[11] flex items-center justify-center translate-x-3 -translate-y-2">
                                    {totalQuantity}
                                </div>
                            )
                        }
                    </a>
                </Link>
                <MdMenu className="lg:hidden"/>
            </div>
        </header>
    );
};