import Cookies from "js-cookie";
import { GetServerSideProps } from "next";
import React from "react";

export default function SuccessPage() {
    React.useEffect(() => {
        if(typeof window !== undefined){
            localStorage.removeItem('DemoCart');
            Cookies.remove('UserCart');
        }
    }, []);
    return(
        <div className="py-20 min-h-screen">
            <h1>Payment successful!</h1>
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = async({ req }) => {
    // PROBLEM: We delete user cart if the user navigates directly to /success.
    // TOODO: Redirect user back to homepage unless the user just finished a purchase.
    // if(/* CONDITION */){
    //     return{
    //         redirect: {
    //             destination: '/',
    //             permanent: false
    //         }
    //     }
    // }
    return{
        props: {

        }
    };
};