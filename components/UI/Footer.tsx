import { MdFacebook } from "react-icons/md";
import { AiFillYoutube, AiOutlineInstagram } from "react-icons/ai";

export default function Footer() {
    return(
        <footer className="w-full bg-black text-white grid grid-cols-1 lg:grid-cols-4 p-4 lg:p-10 gap-6">
            <div className="flex flex-col">
                <p className="font-semibold mb-4">Store</p>
                <nav>
                    <ul className="flex flex-col text-sm space-y-2">
                        <li className="hover:underline hover:underline-offset-2 w-fit">
                            <a href='#'>
                                [ Category 1 ]
                            </a>
                        </li>
                        <li className="hover:underline hover:underline-offset-2 w-fit">
                            <a href='#'>
                                [ Category 2 ]
                            </a>
                        </li>
                        <li className="hover:underline hover:underline-offset-2 w-fit">
                            <a href='#'>
                                [ Category 3 ]
                            </a>
                        </li>
                        <li className="hover:underline hover:underline-offset-2 w-fit">
                            <a href='#'>
                                [ Category 4 ]
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
            <div className="flex flex-col">
                <p className="font-semibold mb-4">Company</p>
                <nav>
                    <ul className="flex flex-col text-sm space-y-2">
                        <li className="hover:underline hover:underline-offset-2 w-fit">
                            <a href='#'>
                                About
                            </a>
                        </li>
                        <li className="hover:underline hover:underline-offset-2 w-fit">
                            <a href='#'>
                                Contact
                            </a>
                        </li>
                        <li className="hover:underline hover:underline-offset-2 w-fit">
                            <a href='#'>
                            Privacy Policy
                            </a>
                        </li>
                        <li className="hover:underline hover:underline-offset-2 w-fit">
                            <a href='#'>
                            We use cookies
                            </a>
                        </li>
                        <li className="hover:underline hover:underline-offset-2 w-fit">
                            <a href='#'>
                            Terms of use
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
            <div className="lg:col-span-2">
                <p className="font-semibold mb-4">Follow Us</p>
                <nav>
                    <ul className="flex space-x-4 text-3xl">
                        <li><MdFacebook/></li>
                        <li><AiOutlineInstagram/></li>
                        <li><AiFillYoutube/></li>
                    </ul>
                </nav>
            </div>
            <div className="lg:col-span-4 font-semibold text-sm">
                <time>2022</time> ©. Company. All rights reserved.
            </div>
        </footer>
    );
};